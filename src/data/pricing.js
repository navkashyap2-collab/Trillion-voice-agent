export const BUNDLES = [
  {
    id: "starter",
    name: "Starter",
    leads: 5,
    pricePerLead: 80,
    total: 400,
    tagline: "Test the water with a small, qualified batch.",
    features: [
      "5 qualified commercial cleaning leads",
      "Delivered on a rolling basis",
      "Melbourne or Sydney service area",
      "Email + phone support",
    ],
    featured: false,
  },
  {
    id: "growth",
    name: "Growth",
    leads: 10,
    pricePerLead: 70,
    total: 700,
    tagline: "A steady pipeline for an active sales month.",
    features: [
      "10 qualified commercial cleaning leads",
      "Delivered on a rolling basis",
      "Melbourne or Sydney service area",
      "Priority email + phone support",
    ],
    featured: false,
  },
  {
    id: "scale",
    name: "Scale",
    leads: 20,
    pricePerLead: 60,
    total: 1200,
    tagline: "Our best per-lead rate for teams ready to grow.",
    features: [
      "20 qualified commercial cleaning leads",
      "Delivered on a rolling basis",
      "Melbourne, Sydney, or both",
      "Dedicated account contact",
    ],
    featured: true,
  },
];

// Cross-sell tier combining a Lead Gen bundle with a Dedicated VA. No fixed
// price — a Lead Gen bundle (fixed $) plus a VA plan (custom-quoted, see
// data/virtualAssistants.js) can't honestly collapse into one number, so this
// tier is scoped and quoted on request instead.
export const HYBRID_PACKAGE = {
  id: "hybrid",
  name: "Hybrid Package",
  tagline: "A Lead Gen campaign plus 1 Dedicated VA, working as one team.",
  features: [
    "A Lead Gen bundle scoped to your service area",
    "1 Dedicated VA for follow-ups, CRM & scheduling",
    "Every booked lead followed up and chased, not just delivered",
    "Single account manager across both services",
  ],
};
