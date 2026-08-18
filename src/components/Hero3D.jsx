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
  const [ref, inView] = useInView();

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  if (webgl === false) {
    return <DialCanvas className={className} />;
  }

  return (
    <div ref={ref} className={className}>
      <Suspense fallback={<DialCanvas className="h-full w-full" />}>
        {webgl && <HeroScene reduced={reduced} paused={!inView} scrollProgress={scrollProgress} />}
      </Suspense>
    </div>
  );
}
