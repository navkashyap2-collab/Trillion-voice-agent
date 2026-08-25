import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal.jsx";
import Icon, { IconBadge } from "../components/Icon.jsx";
import Tilt3D from "../components/Tilt3D.jsx";
import Float from "../components/Float.jsx";
import Mini3D from "../components/Mini3D.jsx";
import Marquee from "../components/Marquee.jsx";
import Parallax from "../components/Parallax.jsx";
import { SITE } from "../data/site.js";
import { IMAGES } from "../data/images.js";
import {
  VA_SOCIAL_PROOF,
  WHAT_VAS_DO,
  COMPARISON,
  ONBOARDING_STEPS,
  VA_PLANS,
  NEED_OPTIONS,
} from "../data/virtualAssistants.js";

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`;

function Field({ label, error, children, hint }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink">{label}</label>
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
      <div className="mt-2">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs font-medium text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClasses =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-accent-strong focus:outline-none [color-scheme:dark]";

function PlanCard({ plan }) {
  return (
    <Tilt3D className="h-full" maxTilt={9} scale={1.03}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative flex h-full flex-col rounded-3xl border p-8 ${
          plan.featured
            ? "border-accent-strong/50 bg-gradient-to-b from-surface-2 to-surface shadow-[0_0_60px_-15px_rgba(139,92,246,0.45)]"
            : "border-border bg-surface/60"
        }`}
      >
        {plan.featured && (
          <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-accent to-teal px-4 py-1 text-xs font-bold text-base shadow-lg">
            Most popular
          </span>
        )}

        <h3 className="font-display text-xl font-bold text-ink">{plan.name}</h3>
        <p className="mt-1 text-sm text-ink-muted">{plan.tagline}</p>
        <p className="mt-6 text-sm font-semibold text-teal">{plan.hours}</p>

        <ul className="mt-8 flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-ink-muted">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href="#lead-form"
          className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 active:scale-[0.97] ${
            plan.featured
              ? "bg-accent text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)] group-hover:animate-pulse group-hover:bg-accent-strong"
              : "border border-border-strong bg-white/[0.02] text-ink group-hover:border-accent-strong group-hover:bg-white/[0.06]"
          }`}
        >
          Claim Your VA Today
        </a>
      </motion.div>
    </Tilt3D>
  );
}

export default function HireVirtualAssistant() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    need: "",
    startDate: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your business email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "That doesn't look like a valid email.";
    }
    if (!values.phone.trim()) next.phone = "Please enter a phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          primary_need: values.need || "Not specified",
          estimated_start_date: values.startDate || "Not specified",
          _subject: "New Virtual Assistant lead from Smartdial Solutions website",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Seo
        title="Hire a Virtual Assistant"
        description="Hire pre-vetted, fluent Virtual Assistants trained for cold calling, appointment setting, CRM management and support — plug-and-play for Australian businesses."
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 60% at 50% 0%, rgba(139,92,246,0.38), transparent 72%), radial-gradient(45% 45% at 88% 10%, rgba(224,95,224,0.22), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <Mini3D variant="orbit" className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/10 via-base/55 to-base" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-4xl flex-col justify-center px-6 pt-24 pb-10 text-center lg:px-8">
          <Reveal>
            <p className="eyebrow">Hire a Virtual Assistant</p>
            <h1 className="mt-6 text-balance font-display text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
              <span className="text-ink-muted">Stop Drowning in Admin.</span>
              <br />
              <span className="bg-gradient-to-r from-ink via-ink to-teal bg-clip-text text-transparent">
                Start Closing More Deals.
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl text-ink-muted">
              Hire pre-vetted, fluent Virtual Assistants trained specifically for cold calling,
              appointment setting, and lead management.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#lead-form" className="btn-accent !px-9 !py-4 !text-base">
                Claim Your VA Today
              </a>
              <a href="#plans" className="btn-ghost !px-9 !py-4 !text-base">
                View VA Plans
              </a>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-faint">
              <span aria-hidden="true">👋</span> Free 5-minute consultation — no obligation.
            </p>
          </Reveal>
        </div>
        <Reveal className="relative border-t border-white/[0.06]">
          <Marquee items={VA_SOCIAL_PROOF} />
        </Reveal>
      </section>

      {/* Meet your VA */}
      <section className="relative overflow-hidden border-y border-white/[0.06]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-5 lg:gap-14 lg:px-8 lg:py-28">
          <Reveal className="lg:col-span-2" direction="right">
            <p className="eyebrow">Dedicated to you</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Meet your new Virtual Assistant
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              Not a shared inbox, not a call centre queue — one dedicated person who learns your
              business, your calendar, and your pipeline, and shows up ready to work every day.
            </p>
            <ul className="mt-6 space-y-3">
              {["Fluent English, Australian market trained", "Your dedicated point of contact", "Backed by an account manager for quality"].map(
                (line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-ink-muted">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>{line}</span>
                  </li>
                ),
              )}
            </ul>
            <a href="#lead-form" className="btn-accent mt-8">
              Meet Your VA
            </a>
          </Reveal>

          <Reveal className="lg:col-span-3" direction="left">
            <Tilt3D maxTilt={4} className="w-full">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border sm:aspect-16/10">
                <Parallax range={24} className="absolute inset-0">
                  <img
                    src={IMAGES.vaAtDesk.src}
                    alt={IMAGES.vaAtDesk.alt}
                    loading="lazy"
                    className="h-[120%] w-full -translate-y-[8%] object-cover"
                  />
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-transparent" />
              </div>
            </Tilt3D>
          </Reveal>
        </div>
      </section>

      {/* What our VAs do */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What our VAs do</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Delegate the busywork. Keep the deals.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-6">
          <Reveal>
            <Tilt3D maxTilt={4}>
              <div className="panel flex flex-col items-start gap-6 border-accent-strong/30 bg-gradient-to-br from-surface-2 to-surface p-8 sm:flex-row sm:items-center sm:p-10">
                <Float range={4} duration={3.2}>
                  <IconBadge name={WHAT_VAS_DO[0].icon} className="h-16 w-16 shrink-0" />
                </Float>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">{WHAT_VAS_DO[0].title}</h3>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-muted">{WHAT_VAS_DO[0].copy}</p>
                </div>
              </div>
            </Tilt3D>
          </Reveal>

          <RevealGroup className="grid gap-6 sm:grid-cols-2" stagger={0.1}>
            {WHAT_VAS_DO.slice(1).map((item) => (
              <RevealItem key={item.title}>
                <Tilt3D maxTilt={6} className="h-full">
                  <div className="panel flex h-full items-start gap-5 p-7">
                    <Float range={4} duration={3.2}>
                      <IconBadge name={item.icon} />
                    </Float>
                    <div>
                      <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.copy}</p>
                    </div>
                  </div>
                </Tilt3D>
              </RevealItem>
            ))}
            <RevealItem>
              <Tilt3D maxTilt={6} className="h-full">
                <div className="relative h-full min-h-[180px] overflow-hidden rounded-3xl border border-border">
                  <img
                    src={IMAGES.vaTypingDetail.src}
                    alt={IMAGES.vaTypingDetail.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
                </div>
              </Tilt3D>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* SmartDial VA vs hiring in-house */}
      <section className="border-y border-white/[0.06] bg-surface/30 py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">The comparison</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
              SmartDial VA vs. hiring in-house
            </h2>
          </Reveal>

          <Reveal className="mt-14" direction="up">
            <div className="panel overflow-hidden">
              <div className="grid grid-cols-2 border-b border-border bg-white/[0.02] text-center">
                <div className="px-4 py-4 sm:px-6">
                  <span className="inline-flex items-center gap-2 font-display text-sm font-bold text-ink sm:text-base">
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-accent to-teal" aria-hidden="true" />
                    SmartDial VA
                  </span>
                </div>
                <div className="border-l border-border px-4 py-4 sm:px-6">
                  <span className="font-display text-sm font-bold text-ink-faint sm:text-base">Hiring In-House</span>
                </div>
              </div>
              {COMPARISON.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-2 ${i !== COMPARISON.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="flex items-start gap-2.5 px-4 py-4 sm:px-6">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span className="text-sm leading-snug text-ink-muted">{row.smartdial}</span>
                  </div>
                  <div className="flex items-start gap-2.5 border-l border-border px-4 py-4 sm:px-6">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm leading-snug text-ink-faint">{row.inHouse}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Onboarding steps */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Getting started</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Plug in a VA in three simple steps
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.15}>
          {ONBOARDING_STEPS.map((step, i) => (
            <RevealItem key={step.title} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-accent/15 to-teal/10 text-accent-strong">
                <span className="font-display text-xl font-extrabold">{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.copy}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Pricing tiers */}
      <section id="plans" className="border-y border-white/[0.06] bg-surface/30 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">VA Plans</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
              A plan for wherever you're at
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Every plan includes a dedicated account manager. Tell us your goals and we'll
              scope a rate that fits.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.15}>
            {VA_PLANS.map((plan) => (
              <RevealItem key={plan.id} className={plan.featured ? "md:-mt-4 md:mb-4" : ""}>
                <PlanCard plan={plan} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Lead capture form */}
      <section id="lead-form" className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">Get started</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Ready to Delegate & Scale?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted">
            Tell us what you need and we'll match you with a VA within 48 hours.
          </p>
        </Reveal>

        <Reveal className="mt-12" direction="up">
          <div className="panel p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <motion.svg viewBox="0 0 52 52" className="h-16 w-16 text-teal" initial="hidden" animate="show">
                    <motion.circle
                      cx="26"
                      cy="26"
                      r="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 27l7 7 15-15"
                      variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
                      transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                    />
                  </motion.svg>
                  <h3 className="mt-6 font-display text-2xl font-bold text-ink">Request received</h3>
                  <p className="mt-2 max-w-sm text-sm text-ink-muted">
                    Thanks — we'll be in touch within 1 business day to match you with a VA. In
                    the meantime, feel free to call us directly.
                  </p>
                  <a href={SITE.phoneHref} className="btn-ghost mt-6">
                    {SITE.phone}
                  </a>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }} noValidate>
                  <RevealGroup className="space-y-6" stagger={0.06} once amount={0.1}>
                    <RevealItem className="grid gap-6 sm:grid-cols-2">
                      <Field label="Name" error={errors.name}>
                        <input
                          type="text"
                          value={values.name}
                          onChange={(e) => update("name", e.target.value)}
                          autoComplete="name"
                          className={inputClasses}
                        />
                      </Field>
                      <Field label="Business email" error={errors.email}>
                        <input
                          type="email"
                          value={values.email}
                          onChange={(e) => update("email", e.target.value)}
                          autoComplete="email"
                          className={inputClasses}
                        />
                      </Field>
                    </RevealItem>

                    <RevealItem className="grid gap-6 sm:grid-cols-2">
                      <Field label="Phone number" error={errors.phone}>
                        <input
                          type="tel"
                          value={values.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          autoComplete="tel"
                          className={inputClasses}
                        />
                      </Field>
                      <Field label="Primary need">
                        <select
                          value={values.need}
                          onChange={(e) => update("need", e.target.value)}
                          className={inputClasses}
                        >
                          {NEED_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </RevealItem>

                    <RevealItem>
                      <Field label="Estimated start date" hint="Optional — a rough timeframe is fine.">
                        <input
                          type="date"
                          value={values.startDate}
                          onChange={(e) => update("startDate", e.target.value)}
                          className={inputClasses}
                        />
                      </Field>
                    </RevealItem>

                    {status === "error" && (
                      <RevealItem>
                        <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
                          Something went wrong sending that. Please try again, or call us directly
                          at {SITE.phone}.
                        </p>
                      </RevealItem>
                    )}

                    <RevealItem>
                      <button type="submit" disabled={status === "submitting"} className="btn-accent w-full disabled:opacity-60">
                        {status === "submitting" ? "Sending…" : "Claim Your VA Today"}
                      </button>
                    </RevealItem>
                  </RevealGroup>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>

      <Reveal as="section" className="mx-auto max-w-3xl px-6 pb-24 text-center lg:px-8">
        <h2 className="text-balance font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Still have questions?
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="btn-ghost">
            Talk to Us
          </Link>
          <a href={SITE.phoneHref} className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
            or call {SITE.phone}
          </a>
        </div>
      </Reveal>
    </>
  );
}
