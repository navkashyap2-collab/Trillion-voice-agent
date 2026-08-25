import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import DialNetwork from "./DialNetwork.jsx";
import FrameLimiter from "./FrameLimiter.jsx";

export default function HeroScene({ reduced = false, paused = false, scrollProgress }) {
  return (
    <Canvas
      dpr={[1, 1.3]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      frameloop="demand"
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#0b0710", 5, 9]} />
      <ambientLight intensity={0.6} />

      {!reduced && !paused && <FrameLimiter />}

      <Suspense fallback={null}>
        <DialNetwork reduced={reduced} scrollProgress={scrollProgress} />
        {!reduced && (
          <Sparkles count={30} scale={[7, 5, 4]} size={2} speed={0.25} color="#a78bfa" opacity={0.5} />
        )}
      </Suspense>
    </Canvas>
  );
}
