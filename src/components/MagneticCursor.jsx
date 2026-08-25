import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], summary, input, textarea, select';
const OFFSCREEN = "translate3d(-100px, -100px, 0) translate(-50%, -50%)";

export default function MagneticCursor() {
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;

    const mql = window.matchMedia("(pointer: fine)");

    function setEnabled(matches) {
      enabledRef.current = matches;
      document.documentElement.classList.toggle("custom-cursor-active", matches);
      if (dotRef.current) dotRef.current.style.display = matches ? "block" : "none";
      if (ringRef.current) ringRef.current.style.display = matches ? "block" : "none";
    }
    function handleMqlChange(e) {
      setEnabled(e.matches);
    }
    setEnabled(mql.matches);
    mql.addEventListener("change", handleMqlChange);

    // Written straight to the DOM on every event, bypassing React state and
    // Framer Motion's scheduler entirely — the fastest path from input to
    // paint a JS-driven cursor can take.
    function handleMove(e) {
      if (!enabledRef.current) return;
      const transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = transform;
      if (ringRef.current) ringRef.current.style.transform = transform;
    }
    function handleOver(e) {
      if (enabledRef.current && e.target.closest?.(INTERACTIVE_SELECTOR)) {
        ringRef.current?.classList.add("cursor-ring--active");
      }
    }
    function handleOut(e) {
      if (enabledRef.current && e.target.closest?.(INTERACTIVE_SELECTOR)) {
        ringRef.current?.classList.remove("cursor-ring--active");
      }
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      mql.removeEventListener("change", handleMqlChange);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-999 h-1.5 w-1.5 rounded-full bg-teal"
        style={{ display: "none", transform: OFFSCREEN }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-998 rounded-full border border-accent-strong/70"
        style={{ display: "none", transform: OFFSCREEN }}
      />
    </>
  );
}
