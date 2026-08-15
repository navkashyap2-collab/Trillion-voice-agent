import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

/**
 * Wraps its children in a pointer-tracked 3D tilt (CSS perspective +
 * rotateX/rotateY) with an optional light-sheen glare that follows the
 * pointer. Purely presentational — pass layout/visual classes on the
 * children themselves, not here.
 */
export default function Tilt3D({ children, className = "", maxTilt = 10, glare = true, scale = 1.02 }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), { stiffness: 260, damping: 24 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), { stiffness: 260, damping: 24 });
  const glareBackground = useTransform([px, py], ([gx, gy]) => {
    return `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.16), transparent 55%)`;
  });

  function handlePointerMove(e) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group ${className}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            style={{ background: glareBackground }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </motion.div>
    </div>
  );
}
