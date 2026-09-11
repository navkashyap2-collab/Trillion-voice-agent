// Single source of truth for per-route SEO metadata.
// Used by <Seo /> at runtime (client-side title updates on navigation)
// AND by scripts/prerender.mjs at build time (real per-route static HTML
// so crawlers and link-preview bots see correct titles/descriptions
// without needing to execute JavaScript).
export const SEO_ROUTES = [
  {
    path: "/",
    title: "B2B Appointment Setting & Qualified Sales Opportunities",
    description:
      "Smartdial Solutions helps Australian B2B service companies identify prospects, reach decision-makers, follow up and generate qualified sales opportunities.",
  },
  {
    path: "/lead-generation",
    title: "B2B Appointment Setting",
    description:
      "See how Smartdial Solutions turns cold B2B prospects into qualified, booked sales opportunities — starting with commercial cleaning, Australia-wide.",
  },
  {
    path: "/how-it-works",
    title: "How It Works",
    description:
      "See how Smartdial Solutions turns cold B2B prospects into qualified, booked sales opportunities — from account research to the next commercial step.",
  },
  {
    path: "/pricing",
    title: "Pricing",
    description:
      "The SmartDial Appointment Engine: a 30-day Founding Client Pilot that turns targeted B2B prospects into qualified sales opportunities. $1,500 + GST.",
  },
  {
    path: "/who-we-help",
    title: "Who We Help",
    description:
      "Smartdial Solutions runs B2B outbound campaigns for commercial service companies — starting with commercial cleaning, across offices, medical, strata, retail and education.",
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
      "Apply for a Smartdial Solutions Founding Client Pilot — B2B appointment setting and qualified sales opportunities for service companies across Australia.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description: "How Smartdial Solutions collects, uses and protects the information you share with us.",
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description: "The terms that apply when you engage Smartdial Solutions for B2B appointment setting and lead generation.",
  },
];
