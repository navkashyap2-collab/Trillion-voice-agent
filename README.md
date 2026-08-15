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
