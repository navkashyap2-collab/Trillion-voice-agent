import { Link } from "react-router-dom";
import { SITE, NAV_LINKS } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="font-display text-lg font-extrabold tracking-tight text-ink">
              {SITE.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              Qualified commercial cleaning leads, booked straight into your calendar. No lock-in
              contracts, no cold-calling required on your end.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">Quick links</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-ink-muted transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li>
                <a href={SITE.phoneHref} className="transition-colors hover:text-ink">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} className="transition-colors hover:text-ink">
                  {SITE.email}
                </a>
              </li>
              <li className="pt-1">{SITE.serviceAreas.join(" · ")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-sm text-ink-faint md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
