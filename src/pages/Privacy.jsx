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

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Smartdial Solutions collects, uses and protects the information you share with us."
      />

      <section className="mx-auto max-w-3xl px-6 pt-24 pb-24 lg:px-8">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-sm text-ink-faint">Last updated: 22 August 2026</p>
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            Smartdial Solutions ("we", "us", "our") respects your privacy. This policy explains what
            information we collect through this website, why we collect it, and how it's handled. It's
            written to reflect what this site actually does — not a generic template.
          </p>
        </Reveal>

        <Section title="What we collect">
          <p>When you submit a form on this site — whether the contact form or the virtual assistant enquiry form — we collect:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Your name and the company you work for, where asked</li>
            <li>Your phone number and email address</li>
            <li>Which pricing bundle or virtual assistant plan you're interested in, if selected</li>
            <li>Any message, primary need, or estimated start date you choose to include</li>
          </ul>
          <p>
            We don't use tracking cookies, analytics scripts, or ad pixels on this site. The only data
            we receive is what you actively type into one of these forms and submit.
          </p>
        </Section>

        <Section title="How we use it">
          <p>
            Submitted enquiries are used solely to respond to you about our lead-generation service —
            to follow up, answer questions, and, if you become a client, to deliver and manage the
            leads we generate on your behalf. We don't sell or rent your contact details to third
            parties, and we don't use them for unrelated marketing.
          </p>
        </Section>

        <Section title="Where it goes">
          <p>
            The contact form is processed by{" "}
            <a
              href="https://formsubmit.co"
              target="_blank"
              rel="noreferrer"
              className="text-accent-strong underline underline-offset-2"
            >
              FormSubmit
            </a>
            , a third-party form-relay service that forwards your submission directly to our inbox at{" "}
            {SITE.email}. FormSubmit does not store your data beyond what's needed to deliver that
            email — see their own privacy policy for details on how they handle form submissions in
            transit.
          </p>
        </Section>

        <Section title="If you become a client">
          <p>
            If you engage Smartdial Solutions, we'll also hold the business details needed to deliver
            and invoice leads — your service area, job preferences, and billing contact. This is kept
            only as long as needed for the business relationship and any tax/record-keeping
            obligations under Australian law.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Under the Australian Privacy Principles, you can ask us what personal information we hold
            about you, request a correction, or ask us to delete it (where we're not required to keep
            it for legal or accounting reasons). Contact us using the details below and we'll respond
            within a reasonable time.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If how we handle data changes, we'll update this page and the "last updated" date above.
          </p>
        </Section>

        <Section title="Contact us">
          <p>
            Questions about this policy or your data can be sent to{" "}
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
