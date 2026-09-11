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
        description="The terms that apply when you engage Smartdial Solutions for B2B appointment setting and lead generation."
      />

      <section className="mx-auto max-w-3xl px-6 pt-24 pb-24 lg:px-8">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-5 text-sm text-ink-faint">Last updated: 22 August 2026</p>
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            These terms cover how Smartdial Solutions ("we", "us") provides B2B appointment-setting
            and lead-generation services to clients ("you", "your business"). By engaging the Founding
            Client Pilot or any other Smartdial Solutions service, you agree to these terms.
          </p>
        </Reveal>

        <Section title="The service">
          <p>
            We research target companies and decision-makers in your agreed service area, run
            personalised outbound outreach, follow up, and qualify genuine buying opportunities before
            handing them to you as a booked next commercial step. The current offer — the SmartDial
            Appointment Engine, a 30-day Founding Client Pilot — is listed on our{" "}
            <a href="/pricing" className="text-accent-strong underline underline-offset-2">
              Pricing
            </a>{" "}
            page, and the pricing, inclusions and service-extension assurance shown there form part of
            these terms for any pilot you engage.
          </p>
        </Section>

        <Section title="One client per territory">
          <p>
            Each campaign is scoped to your agreed service area and target customer profile, and run
            for one client only — we don't run the same prospect list for multiple competing
            businesses in the same territory.
          </p>
        </Section>

        <Section title="No lock-in contract">
          <p>
            There is no ongoing subscription or lock-in period. You engage a pilot, we manage the
            agreed campaign for its term, and the engagement ends there unless you choose to continue.
          </p>
        </Section>

        <Section title="What counts as a qualified opportunity">
          <p>
            A qualified opportunity is a prospect that fits your agreed service area and target
            profile, where we've reached a decision-maker (or a credible route to one), confirmed a
            genuine service need, and secured agreement to a specific next commercial step — a call,
            meeting, site inspection, quote discussion, or scheduled follow-up. It does not include
            someone who only asked why they were called, a wrong-fit prospect, a duplicate, a
            suppressed/do-not-contact contact, a generic reply with no buying signal, or a job seeker
            or supplier enquiry. If you believe a specific opportunity was clearly unqualified, contact
            us and we'll look into it.
          </p>
        </Section>

        <Section title="Service-extension assurance">
          <p>
            If a pilot produces zero qualified opportunities in its first 30 days, we'll continue
            campaign management for up to another 30 days at no additional management fee, subject to
            these terms. This is a commitment to continue executing the agreed campaign — it is not a
            guarantee of revenue, contracts, or a fixed number of appointments.
          </p>
        </Section>

        <Section title="Your control over quotes and jobs">
          <p>
            We hand off the qualified, booked opportunity; you run the sales conversation, quote the
            job, and decide whether to take it on. We don't quote prices or make commitments to
            prospects on your behalf.
          </p>
        </Section>

        <Section title="Payment">
          <p>
            The pilot fee is paid as agreed at the time of engagement. Invoices are issued for each
            engagement and are payable under the terms stated on the invoice.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            We take reasonable care in researching, qualifying and booking opportunities, but we don't
            guarantee that any individual opportunity will convert into a paying customer for your
            business — that depends on factors outside our control, including your pricing,
            availability, and service quality. To the extent permitted by Australian law, our liability
            for any claim relating to this service is limited to the amount you paid for the relevant
            engagement.
          </p>
        </Section>

        <Section title="Changes to these terms">
          <p>
            We may update these terms from time to time; the current version on this page applies to
            any engagement entered into after an update takes effect.
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
