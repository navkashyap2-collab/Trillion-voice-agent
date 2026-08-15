import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import DialNetwork from "./DialNetwork.jsx";

export default function HeroScene({ reduced = false, scrollProgress }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      frameloop={reduced ? "demand" : "always"}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#070b14", 5, 9]} />
      <ambientLight intensity={0.6} />

      <Suspense fallback={null}>
        <DialNetwork reduced={reduced} scrollProgress={scrollProgress} />
        {!reduced && (
          <Sparkles count={60} scale={[7, 5, 4]} size={2} speed={0.25} color="#5aa6ff" opacity={0.5} />
        )}
      </Suspense>

      {!reduced && (
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.4} mipmapBlur radius={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
