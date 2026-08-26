// Single source of truth for per-route SEO metadata.
// Used by <Seo /> at runtime (client-side title updates on navigation)
// AND by scripts/prerender.mjs at build time (real per-route static HTML
// so crawlers and link-preview bots see correct titles/descriptions
// without needing to execute JavaScript).
export const SEO_ROUTES = [
  {
    path: "/",
    title: "Lead Generation & Virtual Assistants",
    description:
      "Smartdial Solutions: a growth platform combining commercial cleaning lead generation with dedicated Virtual Assistants for cold outreach and admin.",
  },
  {
    path: "/lead-generation",
    title: "Cold Calling & Lead Generation",
    description:
      "Smartdial Solutions generates qualified commercial cleaning leads Australia-wide, with dedicated coverage in Melbourne and Sydney, and books them straight into your calendar.",
  },
  {
    path: "/how-it-works",
    title: "How It Works",
    description:
      "How Smartdial Solutions turns commercial cleaning prospects into booked appointments on your calendar, step by step.",
  },
  {
    path: "/pricing",
    title: "Pricing",
    description:
      "Simple per-lead pricing for qualified commercial cleaning leads. Starter, Growth and Scale bundles, no lock-in contracts.",
  },
  {
    path: "/who-we-help",
    title: "Who We Help",
    description:
      "Smartdial Solutions generates commercial cleaning leads across office buildings, strata, medical clinics, retail and childcare centres, Australia-wide.",
  },
  {
    path: "/hire-virtual-assistant",
    title: "Hire a Sales & Admin Virtual Assistant",
    description:
      "Plug-and-play Virtual Assistants specialised in cold outreach, appointment setting, CRM management and lead triage — pre-vetted, sales-trained, and Australian market fluent.",
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Get in touch with Smartdial Solutions to start receiving qualified commercial cleaning leads Australia-wide, with dedicated coverage in Melbourne and Sydney.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description: "How Smartdial Solutions collects, uses and protects the information you share with us.",
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description: "The terms that apply when you engage Smartdial Solutions for commercial cleaning lead generation.",
  },
];
