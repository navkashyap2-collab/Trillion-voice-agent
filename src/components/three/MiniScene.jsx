import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { OrbitCluster, NodeRing, DialRing, StepHelix } from "./MiniGeometries.jsx";

const VARIANTS = { orbit: OrbitCluster, ring: NodeRing, dial: DialRing, helix: StepHelix };

export default function MiniScene({ variant = "orbit", reduced = false }) {
  const Geometry = VARIANTS[variant] ?? OrbitCluster;

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      frameloop={reduced ? "demand" : "always"}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#070b14", 4, 7]} />

      <Suspense fallback={null}>
        <Geometry reduced={reduced} />
      </Suspense>

      {!reduced && (
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.2} mipmapBlur radius={0.6} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
