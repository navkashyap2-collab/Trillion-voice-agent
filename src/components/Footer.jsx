import { Link } from "react-router-dom";
import { SITE, NAV_LINKS, SERVICES_MENU } from "../data/site.js";
import LogoLockup from "./LogoLockup.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" aria-label={SITE.name}>
              <LogoLockup />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              Qualified commercial cleaning leads, booked straight into your calendar, plus
              plug-and-play Virtual Assistants for cold calling and admin. No lock-in contracts.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">Services</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {SERVICES_MENU.map((service) => (
                <li key={service.to}>
                  <Link to={service.to} className="text-ink-muted transition-colors hover:text-ink">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
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
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-ink">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
