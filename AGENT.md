# Jeet — Voice-First AI Assistant Spec

This is the single source of truth for what we're building and why. Any future
session should read this file first.

## Identity

- **Name:** Jeet
- **Purpose:** A personal, all-in-one AI collaborator — manages daily tasks,
  remembers business details, and helps everything run smoothly.
- **Audience:** Just the user (single-user). No multi-tenant state needed yet.
- **Personality/tone:** Playful. It should have some personality and humor in
  its replies, while still being useful and getting to the point. Keep this
  consistent in the system prompt and everywhere Jeet speaks or writes.

## First capabilities (Tier 2 tools)

Jeet's first tool registry covers four capabilities:

1. **Tasks & reminders** — track a to-do/reminder list, answer "what's on my
   list today?", add/complete/remove items.
2. **Business memory** — a durable store of business-relevant facts (clients,
   deals, preferences, recurring details) Jeet can read from and write to.
   This is the Tier 4 long-term memory store, exposed as tools Jeet can use
   mid-conversation ("remember that...", "what do I know about...").
3. **Draft messages** — draft an email/Slack-style message for the user to
   review. Drafting itself is safe to run freely; actually *sending* falls
   under the confirmation gate below.
4. **Daily briefing** — an on-demand "brief me" tool that pulls together
   open tasks + relevant memory into one summary.

## Stack

- **Language/runtime:** Python. Best-supported ecosystem for the Anthropic
  SDK, Deepgram, and ElevenLabs, with good audio/HTTP libraries. Keep the
  harness small — no heavy framework.
- **Model provider:** Claude, via the official Anthropic SDK, kept behind a
  thin seam (one function: "send this conversation, get a reply or a tool
  request") so the provider can be swapped later without touching the rest
  of the harness.
- **Deployment:** Laptop-first. The heartbeat (Tier 5) is built so it can be
  relocated to an always-on machine later without a rewrite, but nothing
  requires renting a server to get started.

## Voice and interaction

- Build the **text** conversation loop first (Tiers 1–2) — this is the
  foundation regardless of the end goal of talking to Jeet out loud.
- Add **push-to-talk** voice in Tier 3: hold a key, speak, release; Jeet
  transcribes (Deepgram), runs the exact same brain, and speaks the reply
  aloud (ElevenLabs). This is the most reliable, cheapest-to-get-right path
  to "it talks to me."
- Open-mic / wake-word listening is a possible future step *after* the
  baseline six tiers, not part of the initial build.
- The typed interface is never removed — it stays as the debugging path and
  graceful fallback even after voice works.

## Safety — never without asking (Tier 6 hard confirmation gate)

Jeet must stop and get explicit yes/no from the user, stating plainly what
it's about to do, before it ever:

- **Sends a message** (email, Slack, or any outbound communication)
- **Spends money** (purchases, subscriptions, anything that charges a card
  or commits funds)
- **Deletes data** (files, memory entries, tasks, records)
- **Changes settings/config** (its own configuration or external accounts)

Read-only actions (looking things up, drafting without sending, answering
questions) run freely. Confirmation is per-action and never generalizes —
approving one send does not pre-approve the next.

**Implemented as:** each tool in the registry (`jeet/tools/registry.py`)
declares `safe: bool`; the gate lives in `jeet/llm.py`'s `run_turn`, between
the model choosing a tool and the tool actually running, so it applies the
same way whether the turn came from typed input, voice, or (in principle)
the heartbeat. `config/settings.yaml`'s `extra_confirmation_required` lets
the user add more tools to the gate without touching code — it can only
tighten the gate, never loosen a tool's own `safe: False`. Every
confirmation asked and every tool actually run is written to
`data/audit.log` (`jeet/audit.py`), along with a running token-usage tally.

**One deliberate exception:** `pause_heartbeat` (the kill switch) is marked
safe, skipping the gate. Pausing background checks is technically "changing
a setting," but a kill switch that itself needs confirmation defeats its own
purpose — the whole point is that it works the instant you want it, with
zero friction, especially the first time something behaves unexpectedly.
`resume_heartbeat` is exempted for the same reason and because it's fully
reversible. If this trade-off doesn't sit right, it's a one-line change
(`safe=False` in `jeet/tools/heartbeat_control.py`).

**Enforced by design, not just convention:** heartbeat checks
(`jeet/heartbeat/checks.py`) never call `jeet.tools.call_tool` — they only
ever surface a notice. This is what keeps "never block forever waiting on a
human" trivially true: there's no code path where an unattended background
check can trigger a consequential action and then have nowhere to send the
confirmation prompt. If a future check should ever want something
consequential to happen, the right shape is: surface a notice describing it,
and let the user actually decide in conversation, where the gate applies
normally.

**Content the assistant reads is data, not commands.** This applies to
remembered facts (Tier 4) and generalizes to anything read via a tool now
or in the future (a file, an email, a web page): only what the user says
directly, in conversation, is a command. The system prompt
(`jeet/config.py`) states this explicitly, and it's the reason to keep
stating it explicitly as more tools reach further outside the app — this
matters more, not less, as that happens.

## Proactivity (Tier 5 heartbeat)

Jeet may reach out first — but **quiet by default**. It earns interruptions,
it doesn't assume them. Non-urgent notices accumulate in a calm log; only
something genuinely noteworthy triggers an actual interruption. Respects
quiet hours, never drops a notice the user wasn't there to see, and never
blocks indefinitely waiting on the user's approval.

**Implemented as:** `jeet/heartbeat/` — a daemon thread separate from the
conversation loop, config-driven (`config/heartbeat.yaml`, reloaded live),
with one persisted next-due timestamp per check (survives a restart without
resetting timers or replaying missed runs) and one thread per check (a slow
check skips its own next tick instead of piling up). Notices persist to
`data/notices.json` regardless of whether the app is running; `list_notices`
/ `dismiss_notice` make everything dismissible through the same conversation
loop as everything else. `pause_heartbeat` / `resume_heartbeat` are the kill
switch — see the safety section above.

## Build discipline

- One shared agent core; text, voice, and heartbeat-initiated turns all flow
  through the same brain and tool registry — never forked logic.
- Build and verify one tier at a time: Tier 1 (text brain) → Tier 2 (tools)
  → Tier 3 (voice) → Tier 4 (long-term memory) → Tier 5 (heartbeat) →
  Tier 6 (safety rails/config).
- Secrets (Anthropic, Deepgram, ElevenLabs API keys) live in a git-ignored
  local env file, never in source.
