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
