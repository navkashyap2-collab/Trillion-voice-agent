import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], summary, input, textarea, select';

export default function MagneticCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 200, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 200, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    const mql = window.matchMedia("(pointer: fine)");
    setEnabled(mql.matches);
    const handler = (e) => setEnabled(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    function handleMove(e) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    function handleOver(e) {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(true);
    }
    function handleOut(e) {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(false);
    }

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-999 h-1.5 w-1.5 rounded-full bg-teal"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-998 rounded-full border border-accent-strong/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
          opacity: hovering ? 0.9 : 0.45,
          backgroundColor: hovering ? "rgba(47,140,255,0.14)" : "rgba(47,140,255,0)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
