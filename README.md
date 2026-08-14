# Trillion-voice-agent

**Jeet** — a personal, playful, all-in-one AI collaborator. See `AGENT.md` for the full spec
(who it's for, what it does, and the safety rules it follows) and the tier-by-tier build plan
this project follows.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # then fill in your API keys
```

## Run it

**Text mode** (always available, needs only `ANTHROPIC_API_KEY`):

```bash
python -m jeet.main
```

**Voice mode** (push-to-talk — hold SPACE to talk, release to send; needs `ANTHROPIC_API_KEY`,
`DEEPGRAM_API_KEY`, `ELEVENLABS_API_KEY`, and `ELEVENLABS_VOICE_ID`; needs a real microphone and
speakers, so it won't run in a headless environment):

```bash
python -m jeet.voice
```

If voice mode can't start (missing PortAudio, no X server on Linux, no Accessibility permission
on macOS), it prints exactly what's missing and exits — text mode is unaffected either way.

## What's built so far

- **Tier 1 — the brain**: a streaming text conversation loop (`jeet/llm.py`, `jeet/main.py`).
- **Tier 2 — the hands**: a tool registry (`jeet/tools/`) — tasks/reminders, business memory,
  draft messages, and a daily briefing — wired into a full tool-use loop.
- **Tier 3 — the ears and mouth**: push-to-talk voice (`jeet/voice.py`, `jeet/audio.py`,
  `jeet/stt.py`, `jeet/tts.py`) wrapped around the exact same brain and tools as text mode.
- **Tier 4 — the memory**: long-term facts (`jeet/memory.py`, `data/memory.json`) that survive a
  restart. `build_system_prompt()` loads them fresh into every session automatically — Jeet
  already knows them before you ask. Edit `data/memory.json` by hand any time; it's plain,
  human-readable JSON, and the next session picks up your edit. Facts are always framed to the
  model as background information, never as instructions to obey.
- **Tier 5 — the heartbeat**: a background loop (`jeet/heartbeat/`), separate from the
  conversation loop, that runs proactive checks on their own schedule (configured in
  `config/heartbeat.yaml` — no code changes needed to tune). Quiet by default: most checks
  produce nothing, and what they do find sits in a dismissible notice inbox. Urgent notices get
  surfaced right at startup, outside quiet hours; everything else waits for you to ask ("what's
  up?"). Nothing is ever lost if you're away when a check fires — restarting the program resumes
  the schedule instead of resetting it or replaying every missed run.
- **Tier 6 — the rails**: a hard confirmation gate (`jeet/llm.py`) on any tool marked
  consequential (`jeet/tools/registry.py`'s `safe: False`, plus `config/settings.yaml`'s
  `extra_confirmation_required` for adding more without touching code) — Jeet states plainly what
  it's about to do and waits for an explicit yes, every time, in text or voice. Everything it does
  — tool calls, confirmations asked, heartbeat activity, a running token-usage tally — is written
  to `data/audit.log`, plain text, human-readable. `pause_heartbeat` is the kill switch: one
  frictionless way to stop all background activity without tearing anything down.

All six tiers of the baseline build are done. See `AGENT.md` for what's next (more tools,
sub-agents, a face, an always-on host) if you want to keep going.
# Smartdial Solution — Marketing Website

A static, multi-page marketing site for **Smartdial Solution**, a lead generation and appointment
setting service for cleaning businesses.

## Structure

```
index.html      Home
services.html   Services (lead gen + appointment setting)
pricing.html    Pricing tiers + FAQ
about.html      About / mission
contact.html    Contact form
privacy.html    Privacy policy (placeholder — have a lawyer review)
terms.html      Terms of service (placeholder — have a lawyer review)

assets/css/main.css   Compiled Tailwind CSS (generated, do not edit directly)
assets/js/main.js     Mobile nav toggle
assets/img/           Favicon / logo mark
src/input.css         Tailwind source (edit this, then rebuild)

design-system/smartdial-solution/MASTER.md   Design tokens & rationale (colors, type, patterns)
```

## Editing content

Each page is plain HTML — open it directly and edit the text/markup. There's no templating
step, so shared elements (nav, footer) are duplicated across pages; if you change one, update
the others to match.

## Editing styles

Styling is Tailwind CSS, compiled from `src/input.css` into `assets/css/main.css`.

```bash
npm install          # first time only
npm run build:css    # one-off build
npm run watch:css     # rebuild on save while you work
```

Don't hand-edit `assets/css/main.css` — it's generated and will be overwritten.

## Before you launch — things to update

- **Contact form destination**: the form on `contact.html` posts to
  `https://formsubmit.co/navkashyap2@gmail.com` (a free, no-signup form relay). The **first**
  submission after launch will land in that inbox as an activation email — click the link to
  activate delivery. Swap the email in the `action` attribute if leads should go elsewhere.
- **Displayed email/phone**: `hello@smartdialsolution.com` and `(555) 010-0100` are placeholders
  (marked with `<!-- TODO -->` comments in `contact.html` and the footer of every page) — replace
  with your real business email and phone number.
- **Pricing & legal copy**: `pricing.html` intentionally avoids published dollar amounts (custom
  quote model) — adjust if you want fixed pricing instead. `privacy.html` and `terms.html` are
  placeholder legal text, not legal advice — have them reviewed before publishing.
- **Domain**: copy assumes `smartdialsolution.com`; update if you register a different domain.

## Deploying

Any static host works as-is (no server-side code, no build step required at deploy time —
`assets/css/main.css` is already committed as compiled output): Vercel, Netlify, GitHub Pages,
Cloudflare Pages, or a plain file upload to any web host.
