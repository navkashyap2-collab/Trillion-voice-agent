import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Hero3D from "../components/Hero3D.jsx";
import Marquee from "../components/Marquee.jsx";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal.jsx";
import { IconBadge } from "../components/Icon.jsx";
import Tilt3D from "../components/Tilt3D.jsx";
import Float from "../components/Float.jsx";
import Parallax from "../components/Parallax.jsx";
import Magnetic from "../components/Magnetic.jsx";
import { SITE } from "../data/site.js";
import { BUNDLES } from "../data/pricing.js";
import { IMAGES } from "../data/images.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

const HEADLINE_WORDS = ["Your", "calendar,", "filled", "with", "commercial", "cleaning", "jobs."];

const STEPS = [
  { title: "Discovery call", copy: "We map your ideal client, service area, and current booking capacity." },
  { title: "Campaign launch", copy: "We reach commercial cleaning prospects in your patch, consistently." },
  { title: "Qualify & book", copy: "Interested prospects are qualified and booked into your calendar." },
  { title: "You close the job", copy: "You run the appointment and win the contract." },
];

const TRUST_ITEMS = [
  { icon: "shield", label: "No lock-in contracts" },
  { icon: "target", label: "Qualified leads only" },
  { icon: "compass", label: "Australia-wide coverage" },
  { icon: "bolt", label: "Fast turnaround" },
];

const MARQUEE_ITEMS = ["No lock-in contracts", "Qualified leads only", "Australia-wide", "Fast turnaround", "Pay per lead"];

const SEGMENT_PREVIEW = [
  { name: "Office buildings", image: IMAGES.officeBuildingExterior },
  { name: "Medical & dental clinics", image: IMAGES.medicalClinic },
  { name: "Retail", image: IMAGES.retailStorefront },
  { name: "Strata & body corporate", image: IMAGES.strataLobby },
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

export default function LeadGeneration() {
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef(null);
  const stepsRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: stepsProgress } = useScroll({ target: stepsRef, offset: ["start 0.75", "end 0.35"] });

  return (
    <>
      <Seo
        title="Cold Calling & Lead Generation"
        description="Smartdial Solutions generates qualified commercial cleaning leads Australia-wide, with dedicated coverage in Melbourne and Sydney, and books them straight into your calendar."
      />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Hero3D
          className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
          scrollProgress={heroScroll}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/45 via-base/55 to-base" />

        <div className="relative mx-auto max-w-5xl px-6 pt-28 pb-20 text-center sm:pt-36 sm:pb-28 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="eyebrow"
          >
            Commercial Cleaning Lead Generation
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
            We find and qualify commercial cleaning prospects, then book them straight into your
            calendar &mdash; so you spend time cleaning, not cold-calling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <Link to="/pricing" className="btn-accent">
                Get Leads
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={SITE.phoneHref} className="btn-ghost">
                <Icon name="phone-inline" />
                Call Now &mdash; {SITE.phone}
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      <div className="border-y border-white/[0.06] bg-surface/30">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      {/* How it works, condensed */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            From first call to closed job in four steps
          </h2>
        </Reveal>

        <div ref={stepsRef} className="relative mt-16">
          <div className="absolute top-6 right-0 left-0 hidden h-px overflow-hidden bg-border-strong/25 lg:block" aria-hidden="true">
            {reduced ? (
              <div className="h-full bg-gradient-to-r from-transparent via-border-strong to-transparent" />
            ) : (
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-accent via-teal to-accent-strong"
                style={{ scaleX: stepsProgress }}
              />
            )}
          </div>
          <RevealGroup className="grid gap-8 lg:grid-cols-4" stagger={0.15}>
            {STEPS.map((step, i) => (
              <RevealItem key={step.title} className="relative">
                <Tilt3D maxTilt={7} className="h-full">
                  <div className="panel h-full p-6">
                    <span className="font-display text-sm font-bold text-accent-strong">0{i + 1}</span>
                    <h3 className="mt-3 text-lg font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.copy}</p>
                  </div>
                </Tilt3D>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-10 text-center">
          <Link to="/how-it-works" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-strong hover:underline">
            See the full process
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Built for professional results */}
      <section className="border-t border-white/[0.06] bg-surface/30 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <Reveal direction="right" className="w-full md:w-1/2">
              <Tilt3D maxTilt={5}>
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border">
                  <Parallax range={28} className="absolute inset-0">
                    <img
                      src={IMAGES.cleanerOfficeDusk.src}
                      alt={IMAGES.cleanerOfficeDusk.alt}
                      loading="lazy"
                      className="h-[130%] w-full -translate-y-[15%] object-cover"
                    />
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-transparent" />
                </div>
              </Tilt3D>
            </Reveal>

            <Reveal direction="left" className="w-full md:w-1/2">
              <p className="eyebrow">Why it works</p>
              <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
                We book the job. You still control the quality.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                We're not a generic lead marketplace reselling the same contact to five
                competitors. Every appointment is scoped to your service area and your ideal job
                type before it's ever booked, so you walk in already knowing it's worth your time.
              </p>
              <ul className="mt-6 space-y-3">
                {["One client per lead, per area", "Booked with your actual capacity in mind", "You keep full control of the quote and the job"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-muted">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {TRUST_ITEMS.map((item, i) => (
              <RevealItem key={item.label} className="flex items-center gap-4">
                <Float delay={i * 0.2}>
                  <IconBadge name={item.icon} />
                </Float>
                <p className="text-sm font-medium text-ink">{item.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Who we help teaser */}
      <section className="border-t border-white/[0.06] bg-surface/30 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Who we help</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Built for commercial cleaning, across every segment
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {SEGMENT_PREVIEW.map((segment) => (
              <RevealItem key={segment.name}>
                <Tilt3D maxTilt={7} glare={false}>
                  <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-border">
                    <img
                      src={segment.image.src}
                      alt={segment.image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base/85 via-base/10 to-transparent" />
                    <p className="absolute bottom-4 left-4 text-sm font-semibold text-white">{segment.name}</p>
                  </div>
                </Tilt3D>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 text-center">
            <Link to="/who-we-help" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-strong hover:underline">
              See every segment
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Pay per qualified lead, nothing else
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {BUNDLES.map((bundle) => (
            <RevealItem key={bundle.id}>
              <Tilt3D maxTilt={8} className="h-full">
                <div
                  className={`panel flex h-full flex-col p-6 ${
                    bundle.featured ? "border-accent-strong/60 shadow-[0_0_40px_-12px_rgba(139,92,246,0.35)]" : ""
                  }`}
                >
                  {bundle.featured && (
                    <span className="mb-3 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-accent to-teal px-3 py-1 text-xs font-semibold text-base">
                      Best value
                    </span>
                  )}
                  <h3 className="font-display text-lg font-bold text-ink">{bundle.name}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{bundle.leads} leads</p>
                  <p className="mt-4 font-display text-3xl font-extrabold text-ink">
                    ${bundle.total}
                    <span className="text-sm font-medium text-ink-faint"> total</span>
                  </p>
                  <p className="text-xs text-ink-faint">${bundle.pricePerLead}/lead</p>
                </div>
              </Tilt3D>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <Link to="/pricing" className="btn-ghost">
            View Full Pricing
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Final CTA */}
      <Reveal as="section" className="relative overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-teal/10" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2 className="text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Ready to fill your calendar?
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Tell us your service area and we&rsquo;ll show you what a full pipeline looks like.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link to="/pricing" className="btn-accent">
                Get Leads
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={SITE.phoneHref} className="btn-ghost">
                Call Now &mdash; {SITE.phone}
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </>
  );
}

function Icon({ name, className = "h-4 w-4" }) {
  if (name === "arrow") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.9 3.7 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1l-2.2 2.2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
