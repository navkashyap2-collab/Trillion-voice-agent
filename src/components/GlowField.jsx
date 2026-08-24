import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

// Static blur + transform-only drift: each blob is painted once and moved
// on the compositor thread, so this never triggers a repaint on scroll.
const BLOBS = [
  { color: "rgba(47,140,255,0.20)", size: 560, top: "-12%", left: "-10%", duration: 26 },
  { color: "rgba(56,232,224,0.14)", size: 480, top: "48%", left: "82%", duration: 32 },
  { color: "rgba(90,166,255,0.13)", size: 440, top: "85%", left: "8%", duration: 22 },
];

export default function GlowField({ className = "" }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
            filter: "blur(60px)",
            willChange: "transform",
          }}
          animate={reduced ? undefined : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
