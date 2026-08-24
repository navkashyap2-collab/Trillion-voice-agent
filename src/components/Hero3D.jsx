import { lazy, Suspense, useEffect, useState } from "react";
import DialCanvas from "./DialCanvas.jsx";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useInView } from "../hooks/useInView.js";

const HeroScene = lazy(() => import("./three/HeroScene.jsx"));

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export default function Hero3D({ className, scrollProgress }) {
  const reduced = usePrefersReducedMotion();
  const [webgl, setWebgl] = useState(null);
  const [ready, setReady] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  // The WebGL scene pulls in ~230KB (gzipped) of three.js/react-three-fiber.
  // Defer fetching/evaluating it until the browser is idle after first paint
  // so it doesn't compete with critical page load — the 2D canvas fallback
  // below covers the gap, so the upgrade is invisible in normal use.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.requestIdleCallback) {
      const timeout = setTimeout(() => setReady(true), 300);
      return () => clearTimeout(timeout);
    }
    const handle = window.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    return () => window.cancelIdleCallback(handle);
  }, []);

  if (webgl === false) {
    return <DialCanvas className={className} />;
  }

  return (
    <div ref={ref} className={className}>
      <Suspense fallback={<DialCanvas className="h-full w-full" />}>
        {webgl && ready && <HeroScene reduced={reduced} paused={!inView} scrollProgress={scrollProgress} />}
      </Suspense>
    </div>
  );
}
