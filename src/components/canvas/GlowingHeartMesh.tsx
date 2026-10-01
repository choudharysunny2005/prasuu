"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ExperiencePhase } from "./Envelope3D";

interface GlowingHeartMeshProps {
  phase: ExperiencePhase;
  pointer: { x: number; y: number };
}

export function GlowingHeartMesh({ phase, pointer }: GlowingHeartMeshProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1800;

  // Parametric 3D heart particle generator
  const [positions, origPos, cols, scs] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const s = new Float32Array(count);

    const palette = [
      new THREE.Color("#fb7185"),
      new THREE.Color("#f43f5e"),
      new THREE.Color("#ec4899"),
      new THREE.Color("#f472b6"),
      new THREE.Color("#c084fc"),
      new THREE.Color("#fed7aa"),
    ];

    for (let i = 0; i < count; i++) {
      const t = Math.PI * 2 * Math.random();
      const u = Math.PI * (Math.random() - 0.5);

      const sinT = Math.sin(t);
      const cosT = Math.cos(t);
      const x = 16 * Math.pow(sinT, 3);
      const y = 13 * cosT - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

      const depthSpread = (Math.random() - 0.5) * 8 * Math.cos(u);
      const scaleFactor = 0.12 * (0.8 + 0.25 * Math.random());

      const finalX = x * scaleFactor;
      const finalY = y * scaleFactor + 0.2;
      const finalZ = depthSpread * scaleFactor;

      const i3 = i * 3;
      pos[i3] = finalX;
      pos[i3 + 1] = finalY;
      pos[i3 + 2] = finalZ;

      orig[i3] = finalX;
      orig[i3 + 1] = finalY;
      orig[i3 + 2] = finalZ;

      const col = palette[Math.floor(Math.random() * palette.length)];
      c[i3] = col.r;
      c[i3 + 1] = col.g;
      c[i3 + 2] = col.b;

      s[i] = Math.random() * 0.7 + 0.3;
    }

    return [pos, orig, c, s];
  }, []);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.25, "rgba(255, 180, 210, 0.9)");
    gradient.addColorStop(0.6, "rgba(244, 63, 94, 0.3)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const opacityRef = useRef(1);
  const scaleRef = useRef(1);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    const heartBeat = Math.sin(time * 2.2) * 0.05 + Math.sin(time * 4.4) * 0.02;
    const targetScale =
      phase === "landing"
        ? 1 + heartBeat
        : phase === "transitioning"
        ? 2.6
        : 0.001;
    const targetOpacity = phase === "landing" ? 0.95 : phase === "transitioning" ? 0.2 : 0;

    scaleRef.current = THREE.MathUtils.damp(scaleRef.current, targetScale, 3.5, delta);
    opacityRef.current = THREE.MathUtils.damp(opacityRef.current, targetOpacity, 3.5, delta);

    pointsRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    (pointsRef.current.material as THREE.PointsMaterial).opacity = opacityRef.current;

    pointsRef.current.rotation.y = THREE.MathUtils.damp(
      pointsRef.current.rotation.y,
      Math.sin(time * 0.8) * 0.2 + pointer.x * 0.35,
      2.5,
      delta
    );
    pointsRef.current.rotation.x = THREE.MathUtils.damp(
      pointsRef.current.rotation.x,
      pointer.y * 0.25,
      2.5,
      delta
    );
    pointsRef.current.rotation.z = Math.sin(time * 0.5) * 0.04;
  });

  if (phase !== "landing" && phase !== "transitioning" && opacityRef.current < 0.01) {
    return null;
  }

  return (
    <group position={[0, 0.2, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[cols, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          map={texture}
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
