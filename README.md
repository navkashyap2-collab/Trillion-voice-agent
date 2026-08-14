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

Next up: Tier 4 (memory that survives a restart), Tier 5 (proactive heartbeat), Tier 6 (safety
rails and config).
