import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal.jsx";
import { BUNDLES } from "../data/pricing.js";

function BundleCard({ bundle }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex h-full flex-col rounded-3xl border p-8 ${
        bundle.featured
          ? "border-accent-strong/50 bg-gradient-to-b from-surface-2 to-surface shadow-[0_0_60px_-15px_rgba(47,140,255,0.45)]"
          : "border-border bg-surface/60"
      }`}
    >
      {bundle.featured && (
        <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-accent to-teal px-4 py-1 text-xs font-bold text-base shadow-lg">
          Best value
        </span>
      )}

      <h3 className="font-display text-xl font-bold text-ink">{bundle.name}</h3>
      <p className="mt-1 text-sm text-ink-muted">{bundle.tagline}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-5xl font-extrabold text-ink">${bundle.total}</span>
        <span className="text-sm font-medium text-ink-faint">total</span>
      </div>
      <p className="mt-1 text-sm text-teal">
        ${bundle.pricePerLead} per lead &middot; {bundle.leads} leads
      </p>

      <ul className="mt-8 flex-1 space-y-3">
        {bundle.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-ink-muted">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/contact?bundle=${bundle.id}`}
        className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 active:scale-[0.97] ${
          bundle.featured
            ? "bg-accent text-white shadow-[0_8px_24px_-8px_rgba(47,140,255,0.6)] group-hover:animate-pulse group-hover:bg-accent-strong"
            : "border border-border-strong bg-white/[0.02] text-ink group-hover:border-accent-strong group-hover:bg-white/[0.06]"
        }`}
      >
        Choose {bundle.name}
      </Link>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <>
      <Seo
        title="Pricing"
        description="Simple per-lead pricing for qualified commercial cleaning leads. Starter, Growth and Scale bundles, no lock-in contracts."
      />

      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:px-8">
        <Reveal>
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Pay per qualified lead. That&rsquo;s it.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
            Three bundles, one straightforward rate card. Bigger bundles cost less per lead. No
            setup fees, no lock-in contracts.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
        <RevealGroup className="grid gap-8 md:grid-cols-3" stagger={0.15}>
          {BUNDLES.map((bundle) => (
            <RevealItem key={bundle.id} className={bundle.featured ? "md:-mt-4 md:mb-4" : ""}>
              <BundleCard bundle={bundle} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-14 max-w-2xl text-center text-sm text-ink-faint">
          Leads are qualified commercial cleaning prospects, delivered on a rolling basis as they
          come in &mdash; not dumped all at once. Need a larger volume? Get in touch and we&rsquo;ll
          scope a custom rate.
        </Reveal>
      </section>

      <Reveal as="section" className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Not sure which bundle fits?
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Tell us your service area and monthly booking capacity &mdash; we&rsquo;ll recommend a
            starting point.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="btn-accent">
              Talk to Us
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
