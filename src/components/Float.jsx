import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

/**
 * Gentle continuous bob + tilt, for icon badges and small decorative
 * elements — the "floating with depth" treatment. Pauses under
 * prefers-reduced-motion.
 */
export default function Float({ children, className, delay = 0, range = 6, duration = 3.4 }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ transformStyle: "preserve-3d" }}
      animate={{ y: [0, -range, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
