import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitCluster, NodeRing, DialRing, StepHelix } from "./MiniGeometries.jsx";

const VARIANTS = { orbit: OrbitCluster, ring: NodeRing, dial: DialRing, helix: StepHelix };

export default function MiniScene({ variant = "orbit", reduced = false, paused = false }) {
  const Geometry = VARIANTS[variant] ?? OrbitCluster;

  return (
    <Canvas
      dpr={[1, 1.3]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      frameloop={reduced || paused ? "demand" : "always"}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#070b14", 4, 7]} />

      <Suspense fallback={null}>
        <Geometry reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
