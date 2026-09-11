import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal.jsx";
import Tilt3D from "../components/Tilt3D.jsx";
import Mini3D from "../components/Mini3D.jsx";
import { PILOT, QUALIFIES, DISQUALIFIES } from "../data/pricing.js";

const FAQS = [
  {
    q: "What exactly counts as a 'qualified opportunity'?",
    a: "A prospect that fits your service area and target profile, where we've reached a decision-maker (or a credible route to one), a genuine service need is confirmed, and they've agreed to a specific next commercial step — not just a form-fill or a maybe.",
  },
  {
    q: "How are opportunities delivered?",
    a: "On a rolling basis as they're qualified, straight into your CRM with full context on the prospect and the next step — not dumped as a spreadsheet all at once.",
  },
  {
    q: "What if an opportunity turns out to be a bad fit?",
    a: "Tell us. It's useful signal for tightening qualification for the rest of the pilot, and it's exactly the kind of thing we want to know about, not something you just have to absorb.",
  },
  {
    q: "Is there a contract after the pilot?",
    a: "No lock-in contract. The pilot runs for 30 days; after that, you decide separately whether to continue.",
  },
];

function PilotCard() {
  return (
    <Tilt3D className="h-full" maxTilt={7} scale={1.02}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full flex-col rounded-3xl border border-accent-strong/50 bg-gradient-to-b from-surface-2 to-surface p-8 shadow-[0_0_60px_-15px_rgba(139,92,246,0.45)] sm:p-10"
      >
        <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-accent to-teal px-4 py-1 text-xs font-bold text-base shadow-lg sm:left-10">
          {PILOT.badge}
        </span>

        <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">{PILOT.name}</h3>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="font-display text-5xl font-extrabold text-ink">{PILOT.price}</span>
        </div>
        <p className="mt-1 text-sm text-teal">{PILOT.subtext}</p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {PILOT.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-ink-muted">
              <svg className="h-4 w-4 shrink-0 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-white/[0.08] pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">What&rsquo;s included</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {PILOT.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink-muted">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/contact"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)] transition-all duration-300 hover:bg-accent-strong active:scale-[0.97]"
        >
          Apply for a Founding Pilot
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
        description="The SmartDial Appointment Engine: a 30-day Founding Client Pilot that turns targeted B2B prospects into qualified sales opportunities. $1,500 + GST."
      />

      <section className="relative overflow-hidden">
        <Mini3D variant="orbit" className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/40 via-base/60 to-base" />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:px-8">
        <Reveal>
          <p className="eyebrow">Pricing</p>
          <h1 className="text-balance font-display text-4xl font-extrabold text-ink sm:text-5xl">
            One clear offer, built to prove results
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
            A single Founding Client Pilot &mdash; a fully managed 30-day outbound campaign that
            turns cold prospects into qualified sales opportunities. No setup fee, no lock-in
            contract.
          </p>
        </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16 lg:px-8">
        <Reveal>
          <PilotCard />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-surface/60 p-6 text-center">
          <p className="font-display text-lg font-bold text-ink">
            Zero qualified opportunities in the first 30 days?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            We&rsquo;ll continue campaign management for up to another 30 days at no additional
            management fee, subject to the pilot terms.
          </p>
          <p className="mt-3 text-xs text-ink-faint">
            This is a service-extension assurance, not a guarantee of revenue, contracts, or a
            fixed number of appointments.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-white/[0.06] bg-surface/30 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Definitions</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
              What counts as a qualified opportunity?
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <RevealGroup className="panel p-8" stagger={0.08}>
              <p className="font-display text-sm font-bold uppercase tracking-[0.1em] text-teal">Counts</p>
              <ul className="mt-5 space-y-4">
                {QUALIFIES.map((item) => (
                  <RevealItem key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>

            <RevealGroup className="panel p-8" stagger={0.08}>
              <p className="font-display text-sm font-bold uppercase tracking-[0.1em] text-danger">Does not count</p>
              <ul className="mt-5 space-y-4">
                {DISQUALIFIES.map((item) => (
                  <RevealItem key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
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
      </section>

      <Reveal as="section" className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {PILOT.spotsAvailable} founding-client spots available
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Tell us your service area and target customer &mdash; we&rsquo;ll confirm if the pilot
            is a fit.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="btn-accent">
              Apply for a Founding Pilot
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
