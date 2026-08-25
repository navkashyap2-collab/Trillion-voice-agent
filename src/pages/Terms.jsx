import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { SITE } from "../data/site.js";

function Section({ title, children }) {
  return (
    <Reveal as="section" className="mt-10">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-ink-muted">{children}</div>
    </Reveal>
  );
}

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="The terms that apply when you engage Smartdial Solutions for commercial cleaning lead generation."
      />

      <section className="mx-auto max-w-3xl px-6 pt-24 pb-24 lg:px-8">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-5 text-sm text-ink-faint">Last updated: 22 August 2026</p>
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            These terms cover how Smartdial Solutions ("we", "us") provides commercial cleaning lead
            generation and appointment-setting services to clients ("you", "your business"). By
            purchasing a lead bundle or engaging our services, you agree to these terms.
          </p>
        </Reveal>

        <Section title="The service">
          <p>
            We identify and qualify commercial cleaning prospects in your service area, then book
            appointments directly into your calendar. Leads are sold in bundles (Starter, Growth,
            Scale) as listed on our{" "}
            <a href="/pricing" className="text-accent-strong underline underline-offset-2">
              Pricing
            </a>{" "}
            page — pricing, lead counts and features shown there form part of these terms for any
            bundle you purchase.
          </p>
        </Section>

        <Section title="One client per lead">
          <p>
            Each lead is scoped to your service area and job type before it's booked, and sold to one
            client only — we don't resell the same contact to multiple competing businesses.
          </p>
        </Section>

        <Section title="No lock-in contracts">
          <p>
            There are no ongoing subscriptions or lock-in periods. You purchase a bundle, we deliver
            the agreed number of leads on a rolling basis, and the engagement ends there unless you
            choose to purchase another bundle.
          </p>
        </Section>

        <Section title="What counts as a qualified lead">
          <p>
            A lead is a business or property manager who has expressed genuine interest in commercial
            cleaning services within your stated service area and has been contacted and screened by
            us before the appointment is booked. We aim to deliver leads that are worth your time —
            if you believe a specific lead was clearly unqualified or outside your agreed service
            area, contact us and we'll look into it.
          </p>
        </Section>

        <Section title="Your control over quotes and jobs">
          <p>
            We book the appointment; you run the sales conversation, quote the job, and decide whether
            to take it on. We don't quote prices or make commitments to prospects on your behalf.
          </p>
        </Section>

        <Section title="Payment">
          <p>
            Bundles are paid for as agreed at the time of purchase. Invoices are issued for each
            engagement and are payable under the terms stated on the invoice.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            We take reasonable care in qualifying and booking leads, but we don't guarantee that any
            individual lead will convert into a paying customer for your business — that depends on
            factors outside our control, including your pricing, availability, and service quality.
            To the extent permitted by Australian law, our liability for any claim relating to this
            service is limited to the amount you paid for the relevant bundle.
          </p>
        </Section>

        <Section title="Changes to these terms">
          <p>
            We may update these terms from time to time; the current version on this page applies to
            any bundle purchased after an update takes effect.
          </p>
        </Section>

        <Section title="Governing law">
          <p>These terms are governed by the laws of Victoria, Australia.</p>
        </Section>

        <Section title="Contact us">
          <p>
            Questions about these terms can be sent to{" "}
            <a href={SITE.emailHref} className="text-accent-strong underline underline-offset-2">
              {SITE.email}
            </a>{" "}
            or by phone at{" "}
            <a href={SITE.phoneHref} className="text-accent-strong underline underline-offset-2">
              {SITE.phone}
            </a>
            .
          </p>
        </Section>
      </section>

      <Reveal as="section" className="border-t border-white/[0.06] py-20">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h2 className="text-balance font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Ready to fill your calendar?
          </h2>
          <p className="mt-3 text-base text-ink-muted">
            See our pricing, or get in touch with any questions.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/pricing" className="btn-accent">
              View Pricing
            </Link>
            <Link to="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
