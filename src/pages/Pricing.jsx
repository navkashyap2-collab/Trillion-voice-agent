import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal.jsx";
import Tilt3D from "../components/Tilt3D.jsx";
import Mini3D from "../components/Mini3D.jsx";
import { BUNDLES } from "../data/pricing.js";

const FAQS = [
  {
    q: "What exactly counts as a 'qualified' lead?",
    a: "A prospect who's confirmed a genuine interest in commercial cleaning, fits your service area and job-type preferences, and has agreed to a specific appointment time — not just someone who filled in a form.",
  },
  {
    q: "How are leads delivered?",
    a: "On a rolling basis as they're qualified, straight onto your calendar with the prospect's details — not dumped as a spreadsheet all at once.",
  },
  {
    q: "What if a lead turns out to be a bad fit?",
    a: "Tell us. It's useful signal for tightening future qualification, and it's the kind of thing we want to know about, not something you just have to absorb.",
  },
  {
    q: "Is there a contract?",
    a: "No lock-in contract on any bundle. Buy a bundle, use it, and decide separately whether to buy another.",
  },
];

function BundleCard({ bundle }) {
  return (
    <Tilt3D className="h-full" maxTilt={9} scale={1.03}>
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex h-full flex-col rounded-3xl border p-8 ${
        bundle.featured
          ? "border-accent-strong/50 bg-gradient-to-b from-surface-2 to-surface shadow-[0_0_60px_-15px_rgba(139,92,246,0.45)]"
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
            ? "bg-accent text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)] group-hover:animate-pulse group-hover:bg-accent-strong"
            : "border border-border-strong bg-white/[0.02] text-ink group-hover:border-accent-strong group-hover:bg-white/[0.06]"
        }`}
      >
        Choose {bundle.name}
      </Link>
    </motion.div>
    </Tilt3D>
  );
}

export default function Pricing() {
  return (
    <>
      <Seo
        title="Pricing"
        description="Simple per-lead pricing for qualified commercial cleaning leads. Starter, Growth and Scale bundles, no lock-in contracts."
      />

      <section className="relative overflow-hidden">
        <Mini3D variant="orbit" className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/40 via-base/60 to-base" />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:px-8">
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
        </div>
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

      <section className="border-t border-white/[0.06] bg-surface/30 py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="eyebrow">Questions</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">Pricing FAQ</h2>
          </Reveal>

          <div className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <Reveal key={faq.q}>
                <details className="group panel p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                    {faq.q}
                    <svg
                      className="h-5 w-5 shrink-0 text-ink-faint transition-transform duration-300 group-open:rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal as="section" className="py-24">
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
