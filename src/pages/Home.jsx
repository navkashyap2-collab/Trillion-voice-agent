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
import Parallax from "../components/Parallax.jsx";
import Magnetic from "../components/Magnetic.jsx";
import { SITE } from "../data/site.js";
import { BUNDLES, HYBRID_PACKAGE } from "../data/pricing.js";
import { IMAGES } from "../data/images.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

const HEADLINE_WORDS = [
  "Scale",
  "Your",
  "Pipeline",
  "with",
  "Lead",
  "Gen",
  "&",
  "Dedicated",
  "Virtual",
  "Assistants",
];

const MARQUEE_ITEMS = ["Lead Generation", "Dedicated Virtual Assistants", "No Lock-In Contracts", "Australia-Wide", "One Account Manager"];

const ECOSYSTEM_STEPS = [
  {
    icon: "target",
    title: "Lead Gen captures the prospect",
    copy: "Our team finds and qualifies commercial cleaning prospects, then books them straight into your calendar.",
    bullets: ["Consistent, ongoing outreach", "Every prospect qualified before booking", "One client per lead, per area"],
  },
  {
    icon: "headset",
    title: "Your VA manages what happens next",
    copy: "A dedicated Virtual Assistant handles the follow-up so no booked lead goes cold — CRM, scheduling, and inbox included.",
    bullets: ["CRM & pipeline kept up to date", "Reschedules and no-shows chased", "Inbox and confirmations handled"],
  },
];

const SERVICE_TEASERS = [
  {
    to: "/lead-generation",
    eyebrow: "Service 01",
    title: "Cold Calling & Lead Gen",
    copy: "Qualified commercial cleaning leads, sourced and booked straight into your calendar. No lock-in contracts.",
    image: IMAGES.cleanerOfficeDusk,
    cta: "Explore Lead Gen",
  },
  {
    to: "/hire-virtual-assistant",
    eyebrow: "Service 02",
    title: "Dedicated Virtual Assistants",
    copy: "A pre-vetted, fluent VA trained for cold outreach, appointment setting, CRM management, and admin.",
    image: IMAGES.vaAtDesk,
    cta: "Hire a VA",
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
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.02, delayChildren: 0.05 } } }}
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
        title="Lead Generation & Virtual Assistants"
        description="Smartdial Solutions: a growth platform combining commercial cleaning lead generation with dedicated Virtual Assistants for cold outreach and admin."
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
            The complete growth platform
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
            We find and qualify your prospects, then hand them to a dedicated Virtual Assistant who
            books, follows up, and keeps your CRM moving — one team, two services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <Link to="/lead-generation" className="btn-accent">
                Explore Lead Gen
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/hire-virtual-assistant" className="btn-ghost">
                Hire a VA
              </Link>
            </Magnetic>
          </motion.div>
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
            Lead Gen fills the top of your pipeline. Your VA makes sure nothing that comes in ever
            falls through the cracks.
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

      {/* Service teasers */}
      <section className="border-t border-white/[0.06] bg-surface/30 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Two services, one team</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Pick a service, or run both together
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-8 lg:grid-cols-2" stagger={0.15}>
            {SERVICE_TEASERS.map((service) => (
              <RevealItem key={service.to}>
                <Tilt3D maxTilt={5} className="h-full">
                  <Link to={service.to} className="panel group flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Parallax range={20} className="absolute inset-0">
                        <img
                          src={service.image.src}
                          alt={service.image.alt}
                          loading="lazy"
                          className="h-[120%] w-full -translate-y-[8%] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Parallax>
                      <div className="absolute inset-0 bg-gradient-to-t from-base/85 via-base/10 to-transparent" />
                      <p className="absolute top-4 left-5 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                        {service.eyebrow}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-display text-xl font-bold text-ink">{service.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{service.copy}</p>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong">
                        {service.cta}
                        <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Tilt3D>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Packages</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Lead Gen, a Dedicated VA, or both together
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {BUNDLES.map((bundle) => (
            <RevealItem key={bundle.id}>
              <Tilt3D maxTilt={8} className="h-full">
                <div className="panel flex h-full flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-ink">{bundle.name}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{bundle.leads} leads</p>
                  <p className="mt-4 font-display text-3xl font-extrabold text-ink">
                    ${bundle.total}
                    <span className="text-sm font-medium text-ink-faint"> total</span>
                  </p>
                  <p className="text-xs text-ink-faint">${bundle.pricePerLead}/lead</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {bundle.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
                        <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?bundle=${bundle.id}`}
                    className="mt-5 inline-flex items-center justify-center rounded-full border border-border-strong bg-white/[0.02] px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-accent-strong hover:bg-white/[0.06] active:scale-[0.97]"
                  >
                    Choose {bundle.name}
                  </Link>
                </div>
              </Tilt3D>
            </RevealItem>
          ))}

          <RevealItem>
            <Tilt3D maxTilt={8} className="h-full">
              <div className="group relative flex h-full flex-col border-accent-strong/50 bg-gradient-to-b from-surface-2 to-surface p-6 shadow-[0_0_50px_-12px_rgba(139,92,246,0.4)] rounded-3xl border">
                <span className="mb-3 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-accent to-teal px-3 py-1 text-xs font-semibold text-base">
                  New
                </span>
                <h3 className="font-display text-lg font-bold text-ink">{HYBRID_PACKAGE.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{HYBRID_PACKAGE.tagline}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {HYBRID_PACKAGE.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-strong active:scale-[0.97]"
                >
                  Get a Custom Quote
                </Link>
              </div>
            </Tilt3D>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <Link to="/pricing" className="btn-ghost">
            View Full Lead Gen Pricing
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Final CTA */}
      <Reveal as="section" className="relative overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-teal/10" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2 className="text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Ready to scale your pipeline?
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Start with Lead Gen, add a Dedicated VA, or launch both together.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link to="/lead-generation" className="btn-accent">
                Explore Lead Gen
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/hire-virtual-assistant" className="btn-ghost">
                Hire a VA
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
