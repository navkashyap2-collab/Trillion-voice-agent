import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#2f8cff";
const TEAL = "#38e8e0";

function useTilt(groupRef, reduced, speed = 0.15) {
  useFrame((state, delta) => {
    if (!groupRef.current || reduced) return;
    groupRef.current.rotation.y += delta * speed;
    groupRef.current.rotation.x += (state.pointer.y * 0.2 - groupRef.current.rotation.x) * 0.04;
  });
}

// Three small orbiting nodes — used for Pricing (three bundles orbiting a shared center).
export function OrbitCluster({ reduced = false }) {
  const groupRef = useRef(null);
  const orbitRefs = [useRef(null), useRef(null), useRef(null)];
  const radii = [1.3, 1.9, 2.5];
  const speeds = [0.6, -0.4, 0.3];

  useTilt(groupRef, reduced, 0.08);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    orbitRefs.forEach((ref, i) => {
      if (!ref.current) return;
      const angle = t * speeds[i];
      ref.current.position.set(Math.cos(angle) * radii[i], Math.sin(angle * 0.6) * 0.4, Math.sin(angle) * radii[i]);
    });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshBasicMaterial color={TEAL} wireframe toneMapped={false} />
      </mesh>
      {radii.map((r, i) => (
        <mesh key={r} ref={orbitRefs[i]}>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshBasicMaterial color={i === 1 ? TEAL : ACCENT} wireframe toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

// A ring of connected nodes — used for Who We Help (segments around a center).
export function NodeRing({ reduced = false, count = 8, radius = 1.8 }) {
  const groupRef = useRef(null);
  useTilt(groupRef, reduced, 0.1);

  const points = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle * 2) * 0.3, Math.sin(angle) * radius);
    });
  }, [count, radius]);

  const lineGeometry = useMemo(() => {
    const positions = [];
    points.forEach((p) => {
      positions.push(0, 0, 0, p.x, p.y, p.z);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.35} toneMapped={false} />
      </lineSegments>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshBasicMaterial color={TEAL} toneMapped={false} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} />
      </mesh>
    </group>
  );
}

// A rising helix of nodes — used for How It Works (a step-by-step process, visualised as a climb).
export function StepHelix({ reduced = false, count = 24 }) {
  const groupRef = useRef(null);
  useTilt(groupRef, reduced, 0.1);

  const points = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1);
      const angle = t * Math.PI * 4;
      const radius = 1.4;
      return new THREE.Vector3(Math.cos(angle) * radius, t * 3 - 1.5, Math.sin(angle) * radius);
    });
  }, [count]);

  const lineGeometry = useMemo(() => {
    const positions = [];
    for (let i = 0; i < points.length - 1; i++) {
      positions.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.4} toneMapped={false} />
      </lineSegments>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={i % 6 === 0 ? TEAL : ACCENT} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

// A rotating dial ring with a glowing center — used for Contact (the "dial" motif, literally).
export function DialRing({ reduced = false }) {
  const groupRef = useRef(null);
  const ringRef = useRef(null);
  useTilt(groupRef, reduced, 0.12);

  useFrame((state, delta) => {
    if (reduced || !ringRef.current) return;
    ringRef.current.rotation.z += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.6, 0.05, 16, 64]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 64]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color={TEAL} wireframe toneMapped={false} />
      </mesh>
    </group>
  );
}
