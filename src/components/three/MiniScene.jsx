import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitCluster, NodeRing, DialRing, StepHelix } from "./MiniGeometries.jsx";
import FrameLimiter from "./FrameLimiter.jsx";

const VARIANTS = { orbit: OrbitCluster, ring: NodeRing, dial: DialRing, helix: StepHelix };

export default function MiniScene({ variant = "orbit", reduced = false, paused = false }) {
  const Geometry = VARIANTS[variant] ?? OrbitCluster;

  return (
    <Canvas
      dpr={[1, 1.3]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      frameloop="demand"
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#0b0710", 4, 7]} />

      {!reduced && !paused && <FrameLimiter />}

      <Suspense fallback={null}>
        <Geometry reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
