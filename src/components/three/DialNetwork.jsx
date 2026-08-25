import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#8b5cf6";
const TEAL = "#e05fe0";

// Points spread evenly over a sphere (Fibonacci sphere), which reads as a
// "network" of connection nodes — the dial/connection motif from the 2D hero.
function fibonacciSphere(count, radius) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return points;
}

function buildLinkGeometry(points, maxDist) {
  const positions = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (points[i].distanceTo(points[j]) < maxDist) {
        positions.push(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

export default function DialNetwork({ nodeCount = 46, radius = 2.4, reduced = false, scrollProgress }) {
  const groupRef = useRef(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  const points = useMemo(() => fibonacciSphere(nodeCount, radius), [nodeCount, radius]);
  const linkGeometry = useMemo(() => buildLinkGeometry(points, radius * 0.62), [points, radius]);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [points]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reduced) {
      groupRef.current.rotation.y += delta * 0.12;
      targetRotation.current.x = state.pointer.y * 0.35;
      targetRotation.current.y += (state.pointer.x * 0.55 - targetRotation.current.y) * 0.025;
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.04;

      const sp = scrollProgress?.get?.() ?? 0;
      const targetScale = 1 + sp * 0.6;
      groupRef.current.scale.setScalar(groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * 0.08);
      groupRef.current.rotation.z += (sp * 0.5 - groupRef.current.rotation.z) * 0.06;
      state.camera.position.z = 6.2 + sp * -1.5;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={linkGeometry}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.4} toneMapped={false} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={TEAL} size={0.06} sizeAttenuation transparent opacity={0.95} toneMapped={false} />
      </points>

      <mesh>
        <icosahedronGeometry args={[radius * 0.98, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.08} toneMapped={false} />
      </mesh>
    </group>
  );
}
