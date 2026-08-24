import { lazy, Suspense, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useInView } from "../hooks/useInView.js";

const MiniScene = lazy(() => import("./three/MiniScene.jsx"));

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export default function Mini3D({ variant, className }) {
  const reduced = usePrefersReducedMotion();
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  // Same rationale as Hero3D: defer the shared ~230KB (gzipped) three.js
  // chunk until the browser is idle so it doesn't block initial page load.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.requestIdleCallback) {
      const timeout = setTimeout(() => setReady(true), 300);
      return () => clearTimeout(timeout);
    }
    const handle = window.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    return () => window.cancelIdleCallback(handle);
  }, []);

  if (!webgl || !ready) return null;

  return (
    <div ref={ref} className={className}>
      <Suspense fallback={null}>
        <MiniScene variant={variant} reduced={reduced} paused={!inView} />
      </Suspense>
    </div>
  );
}
