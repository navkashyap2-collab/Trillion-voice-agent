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
  const [ref, inView] = useInView();

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  if (!webgl) return null;

  return (
    <div ref={ref} className={className}>
      <Suspense fallback={null}>
        <MiniScene variant={variant} reduced={reduced} paused={!inView} />
      </Suspense>
    </div>
  );
}
