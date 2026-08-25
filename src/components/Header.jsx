import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SITE, NAV_LINKS, SERVICES_MENU } from "../data/site.js";
import LogoLockup from "./LogoLockup.jsx";
import Magnetic from "./Magnetic.jsx";

function NavItem({ to, label }) {
  return (
    <NavLink to={to} end={to === "/"} className="group relative shrink-0 whitespace-nowrap px-1 py-2 text-sm font-medium">
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

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    function handlePointer(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative shrink-0" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-1 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Services
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 z-50 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-border bg-surface/95 p-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-lg"
          >
            {SERVICES_MENU.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-white/[0.06] hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-base/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" aria-label={SITE.name}>
          <LogoLockup />
        </Link>

        <nav className="hidden items-center gap-4 lg:gap-6 xl:flex" aria-label="Primary">
          <NavItem to="/" label="Home" />
          <ServicesDropdown />
          {NAV_LINKS.filter((link) => link.to !== "/").map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <a
            href={SITE.phoneHref}
            className="whitespace-nowrap text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            {SITE.phone}
          </a>
          <Magnetic strength={0.25}>
            <Link to="/pricing" className="btn-accent !px-5 !py-2.5 text-xs whitespace-nowrap">
              Get Leads
            </Link>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-ink xl:hidden"
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
            className="overflow-hidden border-t border-white/[0.06] xl:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-base font-medium ${isActive ? "bg-white/5 text-ink" : "text-ink-muted"}`
                }
              >
                Home
              </NavLink>

              <details className="group rounded-lg">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink-muted">
                  Services
                  <svg
                    className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="flex flex-col gap-1 py-1 pl-4">
                  {SERVICES_MENU.map((item) => (
                    <Link key={item.to} to={item.to} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-faint">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>

              {NAV_LINKS.filter((link) => link.to !== "/").map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-base font-medium ${isActive ? "bg-white/5 text-ink" : "text-ink-muted"}`
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
