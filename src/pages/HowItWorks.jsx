import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import StatCounter from "../components/StatCounter.jsx";
import { IconBadge } from "../components/Icon.jsx";

const STEPS = [
  {
    icon: "phone",
    title: "1. Discovery call",
    copy:
      "Before we dial a single number, we get specific: your service area, ideal contract size, current capacity, and what a 'qualified' lead actually looks like for your business. No generic scripts.",
  },
  {
    icon: "target",
    title: "2. Campaign launch",
    copy:
      "We reach commercial cleaning decision-makers across your patch consistently — office managers, facilities leads, strata managers — not a one-off blast that dries up after week one.",
  },
  {
    icon: "check",
    title: "3. Qualify & book",
    copy:
      "Every prospect is screened for genuine interest, budget fit, and timing before they ever hit your calendar. You only see appointments worth turning up to.",
  },
  {
    icon: "calendar",
    title: "4. You close the job",
    copy:
      "The appointment lands straight in your calendar with the context you need. You run the meeting, quote the job, and win the contract — we stay out of the way.",
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

      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:px-8">
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
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-8">
        <div className="space-y-16">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              direction={i % 2 === 0 ? "right" : "left"}
              className={`flex flex-col items-start gap-8 md:flex-row md:items-center ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <IconBadge name={step.icon} className="h-16 w-16 shrink-0 [&>svg]:h-7 [&>svg]:w-7" />
              <div className="panel flex-1 p-8">
                <h2 className="font-display text-2xl font-bold text-ink">{step.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{step.copy}</p>
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

      <Reveal as="section" className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
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
