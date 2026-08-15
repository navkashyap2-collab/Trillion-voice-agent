import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SITE, NAV_LINKS } from "../data/site.js";

function NavItem({ to, label }) {
  return (
    <NavLink to={to} end={to === "/"} className="group relative px-1 py-2 text-sm font-medium">
      {({ isActive }) => (
        <>
          <span className={isActive ? "text-ink" : "text-ink-muted transition-colors group-hover:text-ink"}>
            {label}
          </span>
          <span
            className={`absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-teal transition-transform duration-300 group-hover:scale-x-100 ${
              isActive ? "scale-x-100" : ""
            }`}
            aria-hidden="true"
          />
        </>
      )}
    </NavLink>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-base/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight text-ink">
          Smartdial<span className="text-accent-strong">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={SITE.phoneHref} className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
            {SITE.phone}
          </a>
          <Link to="/pricing" className="btn-accent !px-5 !py-2.5 text-xs">
            Get Leads
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.06] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-base font-medium ${
                      isActive ? "bg-white/5 text-ink" : "text-ink-muted"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a href={SITE.phoneHref} className="rounded-lg px-3 py-3 text-base font-medium text-ink-muted">
                {SITE.phone}
              </a>
              <Link to="/pricing" className="btn-accent mt-2 justify-center">
                Get Leads
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
