"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ExperiencePhase } from "./Envelope3D";

interface ParticleBackgroundProps {
  phase: ExperiencePhase;
  pointer: { x: number; y: number };
}

export function ParticleBackground({ phase, pointer }: ParticleBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  // Generate particle positions, velocities, and colors
  const [positions, initialPositions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initialPos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const scs = new Float32Array(count);

    const palette = [
      new THREE.Color("#f472b6"), // soft rose
      new THREE.Color("#c084fc"), // violet
      new THREE.Color("#fb7185"), // blush
      new THREE.Color("#fef08a"), // warm gold
      new THREE.Color("#e0e7ff"), // soft starlight
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 60 - 10;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      initialPos[i3] = x;
      initialPos[i3 + 1] = y;
      initialPos[i3 + 2] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      cols[i3] = col.r;
      cols[i3 + 1] = col.g;
      cols[i3 + 2] = col.b;

      scs[i] = Math.random() * 0.8 + 0.4;
    }

    return [pos, initialPos, cols, scs];
  }, []);

  const particleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(255, 200, 230, 0.8)");
    gradient.addColorStop(0.6, "rgba(216, 70, 140, 0.25)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const speedRef = useRef(1);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    // Transition speed behavior
    const targetSpeed =
      phase === "transitioning" ||
      phase === "final_transition"
        ? 18.0
        : phase === "envelope"
        ? 1.5
        : phase === "opening" || phase === "letter" || phase === "final"
        ? 0.35
        : 0.8;

    speedRef.current = THREE.MathUtils.damp(speedRef.current, targetSpeed, 3, delta);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 2] += delta * speedRef.current * 2.5;

      // Gentle floating drift during story reading & final rose scenes
      if (
        phase === "letter" ||
        phase === "opening" ||
        phase === "timeline" ||
        phase === "bus_memories" ||
        phase === "childish_fights" ||
        phase === "nicknames" ||
        phase === "video_calls" ||
        phase === "her_smile" ||
        phase === "emotional_deep" ||
        phase === "final"
      ) {
        posArray[i3 + 1] += Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.003;
      }

      if (posArray[i3 + 2] > 20) {
        posArray[i3 + 2] = -40;
        posArray[i3] = (Math.random() - 0.5) * 35;
        posArray[i3 + 1] = (Math.random() - 0.5) * 35;
      }
    }
    posAttr.needsUpdate = true;

    // Camera parallax response
    pointsRef.current.rotation.x = THREE.MathUtils.damp(
      pointsRef.current.rotation.x,
      pointer.y * (phase === "letter" ? 0.05 : 0.15),
      2,
      delta
    );
    pointsRef.current.rotation.y = THREE.MathUtils.damp(
      pointsRef.current.rotation.y,
      pointer.x * (phase === "letter" ? 0.05 : 0.15),
      2,
      delta
    );
    pointsRef.current.rotation.z += delta * (phase === "letter" ? 0.005 : 0.02);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={phase === "transitioning" ? 0.35 : phase === "letter" ? 0.18 : 0.22}
        vertexColors
        map={particleTexture}
        transparent
        opacity={phase === "letter" ? 0.45 : phase === "transitioning" ? 0.95 : 0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
