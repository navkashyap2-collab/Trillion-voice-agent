import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal.jsx";
import StatCounter from "../components/StatCounter.jsx";
import { IconBadge } from "../components/Icon.jsx";
import Tilt3D from "../components/Tilt3D.jsx";
import Mini3D from "../components/Mini3D.jsx";

const STEPS = [
  {
    icon: "target",
    title: "Define your target market",
    copy: "We map your ideal customer profile, service area, and the accounts worth chasing.",
  },
  {
    icon: "building",
    title: "Research companies",
    copy: "We build a list of researched target accounts that actually fit your profile.",
  },
  {
    icon: "users",
    title: "Find the right decision-makers",
    copy: "We identify the decision-maker, or a credible route to one, at every account.",
  },
  {
    icon: "mail",
    title: "Launch personalised outreach",
    copy: "Outreach is written for the account, not a mail-merge template.",
  },
  {
    icon: "clock",
    title: "Follow up",
    copy: "Consistent follow-up on every contact — not a one-off message that goes quiet.",
  },
  {
    icon: "check",
    title: "Qualify genuine opportunities",
    copy: "Every reply is screened for a real service need and a credible next step.",
  },
  {
    icon: "calendar",
    title: "Book the next sales step",
    copy: "A call, meeting, site inspection, or quote discussion — scheduled and confirmed.",
  },
  {
    icon: "chart",
    title: "Track everything in CRM",
    copy: "Every account, contact and opportunity is logged, with weekly reporting on progress.",
  },
];

const FAQS = [
  {
    q: "Do you run the same campaign for competitors in my area?",
    a: "No. Each campaign is scoped to one client per territory. We don't run the same prospect list through multiple competitors.",
  },
  {
    q: "What happens if a booked opportunity falls through?",
    a: "Tell us and we'll look into it — opportunities are qualified before booking specifically to keep this rare, and a pattern of drop-offs is something we want to know about and fix.",
  },
  {
    q: "Can I pause or stop at any time?",
    a: "Yes. There's no lock-in contract. The pilot runs for 30 days, and you decide separately whether to continue.",
  },
  {
    q: "Do you handle the quoting and the job itself?",
    a: "No — that stays entirely with you. We hand off a qualified, booked opportunity; you run the meeting, quote the job, and close the contract.",
  },
];

const STATS = [
  { value: 1, suffix: " day", label: "Target response time" },
  { value: 150, suffix: "", label: "Target accounts researched" },
  { value: 0, suffix: "", label: "Lock-in contracts" },
  { value: 3, suffix: "", label: "Founding-client pilot spots" },
];

export default function HowItWorks() {
  return (
    <>
      <Seo
        title="How It Works"
        description="See how Smartdial Solutions turns cold B2B prospects into qualified, booked sales opportunities — from account research to the next commercial step."
      />

      <section className="relative overflow-hidden">
        <Mini3D variant="helix" className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/40 via-base/60 to-base" />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:px-8">
          <Reveal>
            <p className="eyebrow">The process</p>
            <h1 className="mt-4 text-balance font-display text-4xl font-extrabold text-ink sm:text-5xl">
              B2B appointment setting, done properly
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
              No mystery black box. Here&rsquo;s exactly how a cold prospect turns into a qualified
              sales opportunity.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {STEPS.map((step, i) => (
            <RevealItem key={step.title}>
              <Tilt3D maxTilt={7} className="h-full">
                <div className="panel flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <IconBadge name={step.icon} />
                    <span className="font-display text-sm font-bold text-accent-strong">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.copy}</p>
                  </div>
                </div>
              </Tilt3D>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="border-y border-white/[0.06] bg-surface/30 py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="eyebrow">Smartdial in numbers</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              What a managed pilot looks like
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
