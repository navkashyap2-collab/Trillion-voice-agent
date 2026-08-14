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

## Proactivity (Tier 5 heartbeat)

Jeet may reach out first — but **quiet by default**. It earns interruptions,
it doesn't assume them. Non-urgent notices accumulate in a calm log; only
something genuinely noteworthy triggers an actual interruption. Respects
quiet hours, never drops a notice the user wasn't there to see, and never
blocks indefinitely waiting on the user's approval.

## Build discipline

- One shared agent core; text, voice, and heartbeat-initiated turns all flow
  through the same brain and tool registry — never forked logic.
- Build and verify one tier at a time: Tier 1 (text brain) → Tier 2 (tools)
  → Tier 3 (voice) → Tier 4 (long-term memory) → Tier 5 (heartbeat) →
  Tier 6 (safety rails/config).
- Secrets (Anthropic, Deepgram, ElevenLabs API keys) live in a git-ignored
  local env file, never in source.
