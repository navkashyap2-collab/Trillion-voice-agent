import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

const TARGET_FPS = 60;
const FRAME_MS = 1000 / TARGET_FPS;

/**
 * Caps a "demand" Canvas to ~60fps regardless of the display's native
 * refresh rate. On a 120Hz+ screen, an "always" frameloop renders twice as
 * often as needed for a decorative scene like this — this keeps the visual
 * result identical while roughly halving GPU/CPU work on those displays.
 */
export default function FrameLimiter() {
  const invalidate = useThree((state) => state.invalidate);
  const rafRef = useRef();
  const lastRef = useRef(0);

  useEffect(() => {
    function loop(t) {
      if (t - lastRef.current >= FRAME_MS) {
        lastRef.current = t;
        invalidate();
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [invalidate]);

  return null;
}
