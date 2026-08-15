import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

export default function StatCounter({ value, suffix = "", prefix = "", label, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="font-display text-4xl font-extrabold tabular-nums text-ink sm:text-5xl">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-ink-muted">{label}</p>
    </motion.div>
  );
}
