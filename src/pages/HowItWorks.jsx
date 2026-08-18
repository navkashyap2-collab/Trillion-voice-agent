import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import StatCounter from "../components/StatCounter.jsx";
import { IconBadge } from "../components/Icon.jsx";
import Tilt3D from "../components/Tilt3D.jsx";
import Float from "../components/Float.jsx";
import Mini3D from "../components/Mini3D.jsx";
import Parallax from "../components/Parallax.jsx";
import { IMAGES } from "../data/images.js";

const STEPS = [
  {
    icon: "phone",
    title: "1. Discovery call",
    copy:
      "Before we dial a single number, we get specific: your service area, ideal contract size, current capacity, and what a 'qualified' lead actually looks like for your business. No generic scripts.",
    detail:
      "This is a real conversation, not a form to fill in. We want to know which jobs you actually want more of — and which ones aren't worth your crew's time — before we ever contact a prospect on your behalf.",
    image: IMAGES.discoveryCall,
  },
  {
    icon: "target",
    title: "2. Campaign launch",
    copy:
      "We reach commercial cleaning decision-makers across your patch consistently — office managers, facilities leads, strata managers — not a one-off blast that dries up after week one.",
    detail:
      "Outreach runs continuously in the background, targeted to the property types and suburbs from your discovery call. You're not paying for a burst of activity that tapers off — it's a standing pipeline.",
    image: IMAGES.officeBuildingExterior,
  },
  {
    icon: "check",
    title: "3. Qualify & book",
    copy:
      "Every prospect is screened for genuine interest, budget fit, and timing before they ever hit your calendar. You only see appointments worth turning up to.",
    detail:
      "We confirm the property type, rough budget expectations, and decision-making timeline before booking anything. If a prospect isn't a real fit, they don't make it onto your calendar.",
    image: IMAGES.bookingConfirmed,
  },
  {
    icon: "calendar",
    title: "4. You close the job",
    copy:
      "The appointment lands straight in your calendar with the context you need. You run the meeting, quote the job, and win the contract — we stay out of the way.",
    detail:
      "You get the prospect's details and what they're after ahead of time, so you walk in prepared. From there it's your quote, your relationship, your contract.",
    image: IMAGES.cleanerOfficeDusk,
  },
];

const FAQS = [
  {
    q: "Do you sell the same lead to multiple cleaning companies?",
    a: "No. Each lead is sourced and booked for one client per service area. We don't run the same prospect through multiple competitors.",
  },
  {
    q: "What happens if a booked appointment is a no-show?",
    a: "Tell us and we'll look into it — appointments are qualified before booking specifically to keep this rare, and a pattern of no-shows is something we want to know about and fix.",
  },
  {
    q: "Can I pause or stop at any time?",
    a: "Yes. There's no lock-in contract, so you're not stuck paying for a pipeline you don't need right now.",
  },
  {
    q: "Do you handle the quoting and the cleaning job itself?",
    a: "No — that stays entirely with you. We hand off a qualified, booked appointment; you run the meeting, quote the job, and deliver the clean.",
  },
];

const STATS = [
  { value: 1, suffix: " day", label: "Target response time" },
  { value: 20, suffix: "", label: "Leads in our largest bundle" },
  { value: 0, suffix: "", label: "Lock-in contracts" },
  { value: 2, suffix: "", label: "Cities covered (and growing)" },
];

export default function HowItWorks() {
  return (
    <>
      <Seo
        title="How It Works"
        description="How Smartdial Solutions turns commercial cleaning prospects into booked appointments on your calendar, step by step."
      />

      <section className="relative overflow-hidden">
        <Mini3D variant="helix" className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/40 via-base/60 to-base" />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:px-8">
          <Reveal>
            <p className="eyebrow">The process</p>
            <h1 className="mt-4 text-balance font-display text-4xl font-extrabold text-ink sm:text-5xl">
              Cleaning company appointment setting, done properly
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
              No mystery black box. Here&rsquo;s exactly how a prospect turns into an appointment on
              your calendar.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="space-y-24">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              direction={i % 2 === 0 ? "right" : "left"}
              className={`flex flex-col items-center gap-10 md:flex-row ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <Tilt3D maxTilt={5} className="w-full md:w-1/2">
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border">
                  <Parallax range={28} className="absolute inset-0">
                    <img
                      src={step.image.src}
                      alt={step.image.alt}
                      loading="lazy"
                      className="h-[130%] w-full -translate-y-[15%] object-cover"
                    />
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
                  <Float range={5} duration={3.2} className="absolute top-5 left-5">
                    <IconBadge name={step.icon} className="border-white/20 bg-base/70 backdrop-blur-sm" />
                  </Float>
                </div>
              </Tilt3D>

              <div className="w-full md:w-1/2">
                <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{step.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{step.copy}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-faint">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-surface/30 py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="eyebrow">Smartdial in numbers</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              What a steady pipeline looks like
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
            Before you get started
          </h2>
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

      <Reveal as="section" className="mx-auto max-w-3xl px-6 pb-24 text-center lg:px-8">
        <h2 className="text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Ready to see it running for your business?
        </h2>
        <div className="mt-8">
          <Link to="/pricing" className="btn-accent">
            View Pricing
          </Link>
        </div>
      </Reveal>
    </>
  );
}
