// Single source of truth for per-route SEO metadata.
// Used by <Seo /> at runtime (client-side title updates on navigation)
// AND by scripts/prerender.mjs at build time (real per-route static HTML
// so crawlers and link-preview bots see correct titles/descriptions
// without needing to execute JavaScript).
export const SEO_ROUTES = [
  {
    path: "/",
    title: "Commercial Cleaning Leads & Appointment Setting",
    description:
      "Smartdial Solutions generates qualified commercial cleaning leads across Melbourne, Sydney and Australia-wide, and books them straight into your calendar.",
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
      "Smartdial Solutions generates commercial cleaning leads across office buildings, strata, medical clinics, retail and childcare centres in Melbourne, Sydney and Australia-wide.",
  },
  {
    path: "/hire-virtual-assistant",
    title: "Hire a Virtual Assistant",
    description:
      "Hire pre-vetted, fluent Virtual Assistants trained for cold calling, appointment setting, CRM management and support — plug-and-play for Australian businesses.",
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Get in touch with Smartdial Solutions to start receiving qualified commercial cleaning leads in Melbourne, Sydney or Australia-wide.",
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
