import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import DialNetwork from "./DialNetwork.jsx";

export default function HeroScene({ reduced = false, paused = false, scrollProgress }) {
  return (
    <Canvas
      dpr={[1, 1.3]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      frameloop={reduced || paused ? "demand" : "always"}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#070b14", 5, 9]} />
      <ambientLight intensity={0.6} />

      <Suspense fallback={null}>
        <DialNetwork reduced={reduced} scrollProgress={scrollProgress} />
        {!reduced && (
          <Sparkles count={30} scale={[7, 5, 4]} size={2} speed={0.25} color="#5aa6ff" opacity={0.5} />
        )}
      </Suspense>
    </Canvas>
  );
}
