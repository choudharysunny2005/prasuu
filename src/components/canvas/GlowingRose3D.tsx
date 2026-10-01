"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GlowingRose3DProps {
  phase: string;
  pointer: { x: number; y: number };
}

// Procedural petal geometry generator
function createPetalGeometry(scaleX = 1, scaleY = 1.4, curve = 0.3) {
  const shape = new THREE.Shape();
  // Teardrop / petal curve
  shape.moveTo(0, 0);
  shape.bezierCurveTo(scaleX * 0.6, scaleY * 0.3, scaleX * 0.8, scaleY * 0.8, 0, scaleY);
  shape.bezierCurveTo(-scaleX * 0.8, scaleY * 0.8, -scaleX * 0.6, scaleY * 0.3, 0, 0);

  const extrudeSettings = {
    depth: 0.02,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015,
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  // Curve the petal vertices along Z for realistic organic flower cup
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const factor = Math.sin((y / scaleY) * Math.PI);
    pos.setZ(i, z + factor * curve - Math.abs(x) * 0.08);
  }
  geo.computeVertexNormals();
  return geo;
}

export function GlowingRose3D({ phase, pointer }: GlowingRose3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const isFinal = phase === "final" || phase === "final_transition";

  // Pre-generate petal geometries for inner, middle, and outer whorls
  const geometries = useMemo(() => {
    return {
      inner: createPetalGeometry(0.45, 0.75, 0.22),
      middle: createPetalGeometry(0.7, 1.1, 0.32),
      outer: createPetalGeometry(0.95, 1.45, 0.42),
    };
  }, []);

  const petalConfigs = useMemo(() => {
    const petals: Array<{
      key: number;
      type: "inner" | "middle" | "outer";
      rotation: [number, number, number];
      position: [number, number, number];
      scale: number;
      color: string;
    }> = [];

    // Center tight core bud petals (5 petals)
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 + 0.2;
      petals.push({
        key: i,
        type: "inner",
        rotation: [0.35, angle, 0.25],
        position: [Math.cos(angle) * 0.06, 0.05, Math.sin(angle) * 0.06],
        scale: 0.85,
        color: "#be123c", // deep velvety red
      });
    }

    // Middle blooming layer (7 petals)
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2 + 0.6;
      petals.push({
        key: 5 + i,
        type: "middle",
        rotation: [0.65, angle, 0.15],
        position: [Math.cos(angle) * 0.18, -0.05, Math.sin(angle) * 0.18],
        scale: 1.05,
        color: "#e11d48", // radiant rose
      });
    }

    // Outer blooming petals (9 petals)
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2 + 0.3;
      petals.push({
        key: 12 + i,
        type: "outer",
        rotation: [0.95, angle, 0.1],
        position: [Math.cos(angle) * 0.32, -0.18, Math.sin(angle) * 0.32],
        scale: 1.25,
        color: "#f43f5e", // soft outer glow rose
      });
    }

    return petals;
  }, []);

  const scaleRef = useRef(0.001);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    const targetScale = isFinal ? 1 : 0.0001;
    scaleRef.current = THREE.MathUtils.damp(scaleRef.current, targetScale, 2.5, delta);
    groupRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);

    if (isFinal) {
      // Gentle floating oscillation
      groupRef.current.position.y = 0.5 + Math.sin(time * 1.2) * 0.1;
      
      // Slow hypnotic rotation
      groupRef.current.rotation.y += delta * 0.25;
      
      // Responsive tilt to cursor
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        0.35 + pointer.y * 0.2,
        2.5,
        delta
      );
      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        pointer.x * 0.2,
        2.5,
        delta
      );

      // Core luminescence pulse
      if (coreRef.current) {
        const pulse = 1 + Math.sin(time * 2.5) * 0.15;
        coreRef.current.scale.set(pulse, pulse, pulse);
      }
    }
  });

  if (!isFinal && scaleRef.current < 0.005) return null;

  return (
    <group ref={groupRef} position={[0, 0.5, 0]} scale={0.001}>
      {/* Warm internal rose glow light */}
      <pointLight position={[0, 0.3, 0.2]} intensity={2.2} color="#f43f5e" distance={5} />
      <pointLight position={[0, -0.4, 0.5]} intensity={1.2} color="#fda4af" distance={4} />

      {/* Central Luminous Stardust Core */}
      <mesh ref={coreRef} position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="#ffedd5"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Layered Organic Rose Petals */}
      {petalConfigs.map((cfg) => (
        <mesh
          key={cfg.key}
          geometry={geometries[cfg.type]}
          position={cfg.position}
          rotation={cfg.rotation}
          scale={[cfg.scale, cfg.scale, cfg.scale]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color={cfg.color}
            roughness={0.35}
            metalness={0.08}
            clearcoat={0.4}
            clearcoatRoughness={0.25}
            reflectivity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Rose Calyx / Green Seep Base */}
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.22, 0.35, 6]} />
        <meshStandardMaterial color="#166534" roughness={0.5} />
      </mesh>

      {/* Curved Slender Stem */}
      <mesh position={[0, -0.9, -0.05]} rotation={[0.08, 0, -0.04]}>
        <cylinderGeometry args={[0.035, 0.04, 1.2, 12]} />
        <meshStandardMaterial color="#14532d" roughness={0.6} />
      </mesh>

      {/* Soft Halo Aura behind Rose */}
      <mesh position={[0, 0, -0.3]}>
        <circleGeometry args={[1.6, 32]} />
        <meshBasicMaterial
          color="#f43f5e"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
