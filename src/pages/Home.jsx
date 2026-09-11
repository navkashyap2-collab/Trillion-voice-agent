import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Hero3D from "../components/Hero3D.jsx";
import Marquee from "../components/Marquee.jsx";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal.jsx";
import Icon, { IconBadge } from "../components/Icon.jsx";
import Tilt3D from "../components/Tilt3D.jsx";
import Float from "../components/Float.jsx";
import Magnetic from "../components/Magnetic.jsx";
import { SITE } from "../data/site.js";
import { PILOT } from "../data/pricing.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

const HEADLINE_WORDS = ["Turn", "cold", "prospects", "into", "qualified", "sales", "opportunities."];

const MARQUEE_ITEMS = ["No lock-in contract", "Qualified opportunities only", "Australia-wide", "Weekly reporting", "Founding client pilot"];

const ECOSYSTEM_STEPS = [
  {
    icon: "target",
    title: "We build the pipeline",
    copy: "Our team researches the right companies, reaches the right decision-makers, and qualifies genuine buying interest before it ever reaches you.",
    bullets: ["Consistent, ongoing outreach", "Every opportunity qualified before booking", "One opportunity per client, per territory"],
  },
  {
    icon: "headset",
    title: "Your VA manages what happens next",
    copy: "If you want extra hands, a dedicated Virtual Assistant handles the follow-up so nothing booked goes cold — CRM, scheduling, and inbox included.",
    bullets: ["CRM & pipeline kept up to date", "Reschedules and no-shows chased", "Inbox and confirmations handled"],
  },
];

function Headline() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <h1 className="text-balance font-display text-5xl font-extrabold leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
        {HEADLINE_WORDS.join(" ")}
      </h1>
    );
  }

  return (
    <motion.h1
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } } }}
      className="text-balance font-display text-5xl font-extrabold leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
    >
      {HEADLINE_WORDS.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.25em] inline-block"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  return (
    <>
      <Seo
        title="B2B Appointment Setting & Qualified Sales Opportunities"
        description="Smartdial Solutions helps Australian B2B service companies identify prospects, reach decision-makers, follow up and generate qualified sales opportunities."
      />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Hero3D
          className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
          scrollProgress={heroScroll}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/45 via-base/55 to-base" />

        <div className="relative mx-auto max-w-5xl px-6 pt-28 pb-20 text-center sm:pt-36 sm:pb-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-strong/60 bg-white/[0.02] px-3 py-1 text-xs font-semibold text-ink-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Now booking Australia-wide
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="eyebrow"
          >
            B2B Appointment Setting
          </motion.p>

          <div className="mt-6">
            <Headline />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted"
          >
            We research the right companies, reach the right decision-makers, follow up, qualify
            genuine buying opportunities, and help move them into your sales pipeline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <Link to="/pricing" className="btn-accent">
                Start a Founding Pilot
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/how-it-works" className="btn-ghost">
                See How It Works
              </Link>
            </Magnetic>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mx-auto mt-8 max-w-xl text-sm text-ink-faint"
          >
            Built for B2B service companies that want more commercial opportunities without
            building a full in-house sales team.
          </motion.p>
        </div>
      </section>

      <div className="border-y border-white/[0.06] bg-surface/30">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      {/* Complete Sales Ecosystem */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How the platform works</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            A complete sales ecosystem
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            The Appointment Engine fills the top of your pipeline. A Virtual Assistant is
            available if you want extra hands to make sure nothing that comes in falls through
            the cracks.
          </p>
        </Reveal>

        <div className="relative mt-16">
          <RevealGroup className="grid items-stretch gap-8 lg:grid-cols-2" stagger={0.15}>
            {ECOSYSTEM_STEPS.map((step, i) => (
              <RevealItem key={step.title} className="relative">
                <Tilt3D maxTilt={5} className="h-full">
                  <div className="panel flex h-full flex-col gap-4 p-8">
                    <div className="flex items-center gap-4">
                      <Float range={4} duration={3.2}>
                        <IconBadge name={step.icon} />
                      </Float>
                      <span className="font-display text-sm font-bold text-accent-strong">Step 0{i + 1}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{step.copy}</p>
                    <ul className="mt-2 space-y-2.5">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-sm text-ink-muted">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tilt3D>
                {i === 0 && (
                  <div
                    className="absolute top-1/2 -right-4 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-accent-strong lg:flex"
                    aria-hidden="true"
                  >
                    <Icon name="arrow" className="h-4 w-4" />
                  </div>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Service teaser */}
      <section className="border-t border-white/[0.06] bg-surface/30 py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <Tilt3D maxTilt={5}>
              <Link to="/lead-generation" className="panel group flex flex-col gap-4 p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">The core offer</p>
                <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">B2B Appointment Setting</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
                  Qualified B2B sales opportunities, researched and booked into your pipeline. No
                  lock-in contract.
                </p>
                <span className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-semibold text-accent-strong">
                  Explore the Appointment Engine
                  <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Tilt3D>
          </Reveal>

          <Reveal className="mt-8 text-center">
            <p className="text-sm text-ink-muted">
              Need extra human support too?{" "}
              <Link to="/hire-virtual-assistant" className="font-semibold text-accent-strong hover:underline">
                Ask about a Dedicated Virtual Assistant
              </Link>{" "}
              for CRM updates, follow-ups, scheduling and admin.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="packages" className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            One clear offer, built to prove results
          </h2>
        </Reveal>

        <Reveal className="mt-14">
          <Tilt3D maxTilt={6}>
            <div className="panel relative flex flex-col items-center p-8 text-center sm:p-10">
              <span className="rounded-full bg-gradient-to-r from-accent to-teal px-4 py-1 text-xs font-bold text-base shadow-lg">
                {PILOT.badge}
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">{PILOT.name}</h3>
              <p className="mt-4 font-display text-4xl font-extrabold text-ink">{PILOT.price}</p>
              <p className="mt-1 text-sm text-teal">{PILOT.subtext}</p>
              <p className="mt-4 max-w-md text-sm text-ink-muted">
                No setup fee. No long-term contract. Limited to {PILOT.spotsAvailable}{" "}
                founding-client businesses.
              </p>
            </div>
          </Tilt3D>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <Link to="/pricing" className="btn-ghost">
            See Full Offer Details
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Final CTA */}
      <Reveal as="section" className="relative overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-teal/10" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2 className="text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Ready to build your pipeline?
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Tell us your service area and target customer &mdash; we&rsquo;ll show you what a full
            pipeline looks like.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link to="/pricing" className="btn-accent">
                Start a Founding Pilot
              </Link>
            </Magnetic>
            <a href={SITE.phoneHref} className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
              or call {SITE.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </>
  );
}
