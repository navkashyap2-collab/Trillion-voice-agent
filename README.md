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

---

# Smartdial Solutions — Marketing Website

A React + Tailwind + Framer Motion marketing site for **Smartdial Solutions**, a lead generation
and appointment-setting service for commercial cleaning companies across Melbourne, Sydney and
Australia-wide.

## Stack

- **React 19** + **React Router 7** (client-side routing, 5 pages)
- **Tailwind CSS 4** (via `@tailwindcss/vite`, dark "premium agency" theme)
- **Framer Motion** for page transitions, scroll reveals, hover/tap micro-interactions
- **Vite** for dev/build

## Structure

```
index.html              SPA entry point
src/
  main.jsx               App bootstrap, router basename
  App.jsx                Routes + page-transition AnimatePresence
  index.css              Tailwind theme tokens (colors, type, base styles)
  components/
    Header.jsx, Footer.jsx     Shared nav/footer
    PageTransition.jsx         Route change fade/slide
    Reveal.jsx                 whileInView scroll-reveal helpers
    StatCounter.jsx            Count-up stat, triggers on scroll
    Marquee.jsx                Infinite scrolling trust-marker strip
    DialCanvas.jsx              Canvas "dial/connection" hero background
    Icon.jsx                    Hand-authored SVG icon set (no icon library)
    Seo.jsx                     Per-page <title>/meta description (client-side)
  data/
    site.js                     Phone/email/service areas, nav links
    pricing.js                  The 3 lead bundles (Starter/Growth/Scale)
    seoRoutes.js                 Per-route title/description, used by Seo.jsx AND prerender.mjs
  pages/
    Home.jsx, HowItWorks.jsx, Pricing.jsx, WhoWeHelp.jsx, Contact.jsx, NotFound.jsx
scripts/
  prerender.mjs           Post-build: writes a real dist/<route>/index.html per route with
                           correct title/description/OG tags baked in — GitHub Pages serves
                           static files, so crawlers that don't run JS need this (Seo.jsx's
                           useEffect alone isn't enough for them).
public/
  favicon.svg
  robots.txt, sitemap.xml
```

**Adding a new page?** Add the route in `src/App.jsx` and its metadata in `src/data/seoRoutes.js`
— `npm run build` prerenders it automatically. Also add it to `public/sitemap.xml`.

All animations respect `prefers-reduced-motion` (see `usePrefersReducedMotion` hook) — reduced
motion disables the canvas animation, marquee scroll, count-up, and scroll reveals in favor of
static, immediately-visible content.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

## Editing content

- **Copy**: edit directly in the relevant file under `src/pages/`.
- **Pricing**: `src/data/pricing.js` — the Home page teaser and the Pricing page both read from
  this file, so it only needs updating in one place.
- **Contact/phone/email**: `src/data/site.js`.
- **Colors/type**: `src/index.css` — the `@theme` block at the top defines every color and font
  token used across the site.

## Before you launch — things to update

- **Contact form destination**: the form on the Contact page posts to
  `https://formsubmit.co/ajax/hello@smartdialsolutions.com.au` (a free, no-signup form relay). The
  **first** submission after launch triggers a one-time activation email to that inbox — click the
  link to activate delivery. Change `SITE.email` in `src/data/site.js` if leads should go
  elsewhere.
- **ABN**: not currently shown anywhere in the footer — add it once you have one (common practice
  for AU businesses, not strictly required).
- **OG image**: `scripts/prerender.mjs` references `/og-image.png` for social share previews —
  that file doesn't exist yet, add one to `public/` before launch (1200×630px is standard).
- **Legal pages**: this build doesn't include Privacy Policy / Terms pages — add them if you need
  them (the previous static-site version had placeholder copy for both, worth reusing).

## Deploying

Deployed via GitHub Actions to GitHub Pages (`.github/workflows/deploy-pages.yml`) — pushes to
this branch trigger `npm ci && npm run build`, and the `dist/` output is published. The Vite
`base` and React Router `basename` are set for this repo's GitHub Pages path
(`/Trillion-voice-agent/`); update both in `vite.config.js` / `src/main.jsx` if you move to a
custom domain or a different repo name.
