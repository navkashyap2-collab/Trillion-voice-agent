import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal.jsx";
import Icon from "../components/Icon.jsx";
import Tilt3D from "../components/Tilt3D.jsx";
import Float from "../components/Float.jsx";
import Mini3D from "../components/Mini3D.jsx";
import Parallax from "../components/Parallax.jsx";
import { SITE } from "../data/site.js";
import { IMAGES } from "../data/images.js";

const SEGMENTS = [
  {
    icon: "building",
    name: "Office buildings",
    summary: "Commercial towers and business parks with daily or nightly service needs.",
    detail: "From single-tenant offices to multi-storey towers, we target facilities and office managers who control the cleaning budget.",
    image: IMAGES.officeBuildingExterior,
    longCopy:
      "Office buildings run on schedules — daily bin runs, nightly floor care, weekly deep cleans of shared kitchens and bathrooms. We reach the facilities and office managers who own that budget, in towers and business parks across your service area.",
  },
  {
    icon: "home",
    name: "Strata & body corporate",
    summary: "Common areas, foyers, and shared facilities across residential strata.",
    detail: "We reach strata managers and committees looking to replace or supplement their current cleaning contractor.",
    image: IMAGES.strataLobby,
    longCopy:
      "Strata committees and managers are often unhappy with an existing contractor long before they act on it. We reach out at the right moment — when a lobby, foyer, or shared facility contract is genuinely up for review.",
  },
  {
    icon: "medical",
    name: "Medical & dental clinics",
    summary: "Practices needing hygiene-compliant, scheduled cleaning.",
    detail: "Healthcare cleaning has stricter standards — we qualify prospects who understand and budget for that before you quote.",
    image: IMAGES.medicalClinic,
    longCopy:
      "Clinics need more than a standard commercial clean — hygiene compliance, scheduled after-hours access, and consistency matter more here than almost anywhere else. We qualify for that understanding before a lead ever reaches you.",
  },
  {
    icon: "bag",
    name: "Retail",
    summary: "Shopfronts, showrooms and small retail chains.",
    detail: "Storefronts that need consistent presentation for customers, often with after-hours or early-morning service windows.",
    image: IMAGES.retailStorefront,
    longCopy:
      "A shopfront's presentation is part of the sale for every retailer — smudged glass and dusty floors cost them customers. We target stores and small chains that need consistent, scheduled service around trading hours.",
  },
  {
    icon: "child",
    name: "Childcare & education",
    summary: "Centres and campuses with strict cleanliness standards.",
    detail: "Childcare and education clients prioritise reliability and compliance — exactly the kind of long-term contract worth chasing.",
    image: IMAGES.childcareClassroom,
    longCopy:
      "Childcare centres and schools can't tolerate an unreliable cleaner — compliance and consistency come first. These are exactly the long-term, recurring contracts worth the extra qualification effort.",
  },
];

function SegmentCard({ segment }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Tilt3D maxTilt={5} glare={false} scale={1.01}>
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        className="group h-56 w-full [perspective:1200px]"
        aria-pressed={flipped}
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="panel absolute inset-0 flex flex-col items-start justify-center gap-4 p-6 text-left [backface-visibility:hidden]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-accent/15 to-teal/10 text-accent-strong">
              <Icon name={segment.icon} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-ink">{segment.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{segment.summary}</p>
            </div>
          </div>

          <div
            className="absolute inset-0 flex flex-col justify-center gap-2 rounded-3xl border border-accent-strong/40 bg-gradient-to-br from-surface-2 to-surface p-6 text-left [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal">{segment.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{segment.detail}</p>
          </div>
        </motion.div>
      </button>
    </Tilt3D>
  );
}

export default function WhoWeHelp() {
  return (
    <>
      <Seo
        title="Who We Help"
        description="Smartdial Solutions generates commercial cleaning leads across office buildings, strata, medical clinics, retail and childcare centres, Australia-wide."
      />

      <section className="relative overflow-hidden">
        <Mini3D variant="ring" className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/40 via-base/60 to-base" />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:px-8">
          <Reveal>
            <p className="eyebrow">Who we help</p>
            <h1 className="mt-4 text-balance font-display text-4xl font-extrabold text-ink sm:text-5xl">
              Built for commercial cleaning, across every segment
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
              We generate leads across the commercial property types that keep cleaning businesses
              busiest. Tap or hover a card for detail.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {SEGMENTS.map((segment) => (
            <RevealItem key={segment.name} direction="up">
              <SegmentCard segment={segment} />
            </RevealItem>
          ))}
          <RevealItem direction="up">
            <Link
              to="/contact"
              className="group flex h-56 w-full flex-col items-start justify-center gap-3 rounded-3xl border border-dashed border-border-strong/60 p-6 text-left transition-colors hover:border-accent-strong/60 hover:bg-white/[0.02]"
            >
              <h3 className="font-display text-base font-bold text-ink">Different segment?</h3>
              <p className="text-sm leading-relaxed text-ink-muted">
                We generate leads across other commercial property types too, Australia-wide.
                Tell us who you clean for.
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong">
                Get in touch
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>
          </RevealItem>
        </RevealGroup>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">A closer look</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            What we&rsquo;re actually targeting
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20">
          {SEGMENTS.map((segment, i) => (
            <Reveal
              key={segment.name}
              direction={i % 2 === 0 ? "right" : "left"}
              className={`flex flex-col items-center gap-10 md:flex-row ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <Tilt3D maxTilt={5} className="w-full md:w-1/2">
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border">
                  <Parallax range={28} className="absolute inset-0">
                    <img
                      src={segment.image.src}
                      alt={segment.image.alt}
                      loading="lazy"
                      className="h-[130%] w-full -translate-y-[15%] object-cover"
                    />
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
                  <Float range={5} duration={3.2} className="absolute top-5 left-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-base/70 text-accent-strong backdrop-blur-sm">
                      <Icon name={segment.icon} />
                    </div>
                  </Float>
                </div>
              </Tilt3D>

              <div className="w-full md:w-1/2">
                <h3 className="font-display text-2xl font-bold text-ink">{segment.name}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{segment.longCopy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-surface/30 py-20">
        <Reveal className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <p className="eyebrow">Service areas</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
            Australia-wide coverage
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            We run commercial cleaning lead gen campaigns Australia-wide, with dedicated,
            hands-on coverage in Melbourne and Sydney. Wherever your business operates, tell us
            your service area and we&rsquo;ll build you a campaign.
          </p>
        </Reveal>
      </section>

      <Reveal as="section" className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
        <h2 className="text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
          See pricing for your segment
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/pricing" className="btn-accent">
            View Pricing
          </Link>
          <a href={SITE.phoneHref} className="btn-ghost">
            Call Now &mdash; {SITE.phone}
          </a>
        </div>
      </Reveal>
    </>
  );
}
