import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal, { RevealGroup, RevealItem } from "../components/Reveal.jsx";
import Tilt3D from "../components/Tilt3D.jsx";
import Float from "../components/Float.jsx";
import Mini3D from "../components/Mini3D.jsx";
import { SITE } from "../data/site.js";
import { BUNDLES, HYBRID_PACKAGE } from "../data/pricing.js";
import { VA_PLANS } from "../data/virtualAssistants.js";

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`;

const INTEREST_OPTIONS = [
  { value: "", label: "Not sure yet" },
  ...BUNDLES.map((b) => ({ value: b.id, label: `Lead Gen — ${b.name} (${b.leads} leads, $${b.total})` })),
  ...VA_PLANS.map((p) => ({ value: p.id, label: `Virtual Assistant — ${p.name}` })),
  { value: HYBRID_PACKAGE.id, label: `${HYBRID_PACKAGE.name} (Lead Gen + VA)` },
];

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
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-accent-strong focus:outline-none";

export default function Contact() {
  const [params] = useSearchParams();
  const initialInterest = params.get("bundle") ?? params.get("interest") ?? "";

  const [values, setValues] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    interest: INTEREST_OPTIONS.some((o) => o.value === initialInterest) ? initialInterest : "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.phone.trim()) next.phone = "Please enter a phone number.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "That doesn't look like a valid email.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const interestLabel = INTEREST_OPTIONS.find((o) => o.value === values.interest)?.label ?? "Not sure yet";
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          company: values.company,
          phone: values.phone,
          email: values.email,
          interested_in: interestLabel,
          message: values.message,
          _subject: "New lead from Smartdial Solutions website",
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
        title="Contact"
        description="Get in touch with Smartdial Solutions to start receiving qualified commercial cleaning leads in Melbourne, Sydney or Australia-wide."
      />

      <section className="relative overflow-hidden">
        <Mini3D variant="dial" className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/40 via-base/60 to-base" />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:px-8">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 text-balance font-display text-4xl font-extrabold text-ink sm:text-5xl">
              Let&rsquo;s fill your calendar
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
              Whether it's Lead Gen, a Dedicated Virtual Assistant, or both, tell us what you need
              and we&rsquo;ll get back to you within 1 business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3" direction="up">
            <div className="panel p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <motion.svg
                      viewBox="0 0 52 52"
                      className="h-16 w-16 text-teal"
                      initial="hidden"
                      animate="show"
                    >
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
                    <h2 className="mt-6 font-display text-2xl font-bold text-ink">Message sent</h2>
                    <p className="mt-2 max-w-sm text-sm text-ink-muted">
                      Thanks &mdash; we&rsquo;ll get back to you within 1 business day. In the
                      meantime, feel free to call us directly.
                    </p>
                    <a href={SITE.phoneHref} className="btn-ghost mt-6">
                      {SITE.phone}
                    </a>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    <RevealGroup className="space-y-6" stagger={0.06} once amount={0.1}>
                      <RevealItem className="grid gap-6 sm:grid-cols-2">
                        <Field label="Full name" error={errors.name}>
                          <input
                            type="text"
                            value={values.name}
                            onChange={(e) => update("name", e.target.value)}
                            autoComplete="name"
                            className={inputClasses}
                          />
                        </Field>
                        <Field label="Company">
                          <input
                            type="text"
                            value={values.company}
                            onChange={(e) => update("company", e.target.value)}
                            autoComplete="organization"
                            className={inputClasses}
                          />
                        </Field>
                      </RevealItem>

                      <RevealItem className="grid gap-6 sm:grid-cols-2">
                        <Field label="Phone" error={errors.phone}>
                          <input
                            type="tel"
                            value={values.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            autoComplete="tel"
                            className={inputClasses}
                          />
                        </Field>
                        <Field label="Email" error={errors.email}>
                          <input
                            type="email"
                            value={values.email}
                            onChange={(e) => update("email", e.target.value)}
                            autoComplete="email"
                            className={inputClasses}
                          />
                        </Field>
                      </RevealItem>

                      <RevealItem>
                        <Field label="I'm interested in">
                          <select
                            value={values.interest}
                            onChange={(e) => update("interest", e.target.value)}
                            className={inputClasses}
                          >
                            {INTEREST_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </RevealItem>

                      <RevealItem>
                        <Field label="Message" hint="Optional — service area, crew size, whatever's useful.">
                          <textarea
                            rows={4}
                            value={values.message}
                            onChange={(e) => update("message", e.target.value)}
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
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="btn-accent w-full disabled:opacity-60"
                        >
                          {status === "submitting" ? "Sending…" : "Send Message"}
                        </button>
                      </RevealItem>
                    </RevealGroup>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" direction="left">
            <Tilt3D maxTilt={6}>
            <div className="panel p-8">
              <h2 className="font-display text-lg font-bold text-ink">Direct contact</h2>
              <ul className="mt-6 space-y-6">
                <li className="flex items-start gap-4">
                  <Float range={4} duration={3}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-accent/15 to-teal/10 text-accent-strong">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path
                        d="M6.6 10.8c1.4 2.9 3.7 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1l-2.2 2.2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  </Float>
                  <div>
                    <p className="text-sm font-semibold text-ink">Call</p>
                    <a href={SITE.phoneHref} className="text-sm text-ink-muted transition-colors hover:text-accent-strong">
                      {SITE.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Float range={4} duration={3} delay={0.3}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-accent/15 to-teal/10 text-accent-strong">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M4 5h16v14H4zM4 6l8 7 8-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  </Float>
                  <div>
                    <p className="text-sm font-semibold text-ink">Email</p>
                    <a href={SITE.emailHref} className="text-sm text-ink-muted transition-colors hover:text-accent-strong">
                      {SITE.email}
                    </a>
                  </div>
                </li>
              </ul>
              <p className="mt-8 rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-xs text-ink-faint">
                We&rsquo;ll get back to you within 1 business day.
              </p>
            </div>
            </Tilt3D>
          </Reveal>
        </div>
      </section>
    </>
  );
}
