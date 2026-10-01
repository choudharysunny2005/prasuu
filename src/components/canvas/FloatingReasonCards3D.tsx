"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { REASONS_DATA, ReasonItem } from "@/lib/reasons";

interface FloatingReasonCards3DProps {
  phase: string;
  selectedReason: ReasonItem | null;
  onSelectReason: (reason: ReasonItem) => void;
  pointer: { x: number; y: number };
}

function ReasonCard3D({
  reason,
  index,
  isSelected,
  onSelect,
  pointer,
}: {
  reason: ReasonItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  pointer: { x: number; y: number };
}) {
  const cardGroupRef = useRef<THREE.Group>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Generate high-resolution procedural frosted glass card face texture
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d")!;

    const w = 480;
    const h = 280;
    const x = 16;
    const y = 20;
    const r = 28;

    // Dark luxury glass background
    const bgGrad = ctx.createLinearGradient(x, y, x + w, y + h);
    bgGrad.addColorStop(0, "rgba(26, 14, 40, 0.85)");
    bgGrad.addColorStop(1, "rgba(10, 6, 20, 0.9)");
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();

    // Metallic luxury border
    ctx.strokeStyle = reason.accentColor;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner subtle glow border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(x + 8, y + 8, w - 16, h - 16, r - 4);
    ctx.stroke();

    // Top reason badge
    ctx.fillStyle = reason.accentColor;
    ctx.beginPath();
    ctx.roundRect(x + 24, y + 24, 100, 30, 15);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`0${index + 1} • LOVE`, x + 38, y + 44);

    // Card Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30px 'Plus Jakarta Sans', sans-serif";
    ctx.shadowColor = reason.accentColor;
    ctx.shadowBlur = 12;
    ctx.fillText(reason.title, x + 24, y + 115);

    // Tagline
    ctx.fillStyle = "rgba(254, 205, 211, 0.85)";
    ctx.font = "italic 22px 'Cormorant Garamond', Georgia, serif";
    ctx.shadowBlur = 0;
    ctx.fillText(reason.tagline, x + 24, y + 165);

    // Hint
    ctx.fillStyle = reason.accentColor;
    ctx.font = "500 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("✨ Tap to reveal message", x + 24, y + 235);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [reason, index]);

  useFrame((state, delta) => {
    if (!cardGroupRef.current) return;
    const time = state.clock.getElapsedTime() + index * 1.8;

    // Floating sinusoidal animation
    const hoverAmp = isSelected ? 0.03 : 0.09;
    cardGroupRef.current.position.y = reason.position3D[1] + Math.sin(time * 1.3) * hoverAmp;

    // Dynamic 3D tilt responding to cursor / touch movement
    const targetRotX = (hovered || isSelected ? 0.02 : 0.08) + pointer.y * 0.25;
    const targetRotY = Math.sin(time * 0.7) * 0.05 + pointer.x * 0.3;

    cardGroupRef.current.rotation.x = THREE.MathUtils.damp(
      cardGroupRef.current.rotation.x,
      targetRotX,
      2.5,
      delta
    );
    cardGroupRef.current.rotation.y = THREE.MathUtils.damp(
      cardGroupRef.current.rotation.y,
      targetRotY,
      2.5,
      delta
    );

    // Scale damp for selected/hovered states
    const targetScale = isSelected ? 1.15 : hovered ? 1.06 : 1.0;
    cardGroupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 4
    );

    // Glow ring rotation
    if (glowRingRef.current) {
      glowRingRef.current.rotation.z += delta * 0.6;
    }
  });

  return (
    <group
      ref={cardGroupRef}
      position={reason.position3D}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") document.body.style.cursor = "default";
      }}
    >
      {/* Radiant Glow Halo Ring */}
      <mesh ref={glowRingRef} position={[0, 0, -0.06]}>
        <ringGeometry args={[1.45, 1.6, 32]} />
        <meshBasicMaterial
          color={reason.accentColor}
          transparent
          opacity={hovered || isSelected ? 0.8 : 0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point light for card glow */}
      <pointLight
        position={[0, 0, 0.5]}
        intensity={hovered || isSelected ? 1.8 : 0.7}
        color={reason.accentColor}
        distance={4.5}
      />

      {/* Main Glass Texture Face */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[2.7, 1.6]} />
        <meshStandardMaterial
          map={texture}
          transparent
          roughness={0.15}
          metalness={0.1}
          opacity={0.96}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Physical Frosted Glass Slab Backing */}
      <mesh position={[0, 0, -0.025]}>
        <boxGeometry args={[2.74, 1.64, 0.04]} />
        <meshPhysicalMaterial
          color="#120822"
          roughness={0.1}
          metalness={0.15}
          transmission={0.8}
          transparent
          opacity={0.75}
          reflectivity={0.7}
        />
      </mesh>
    </group>
  );
}

export function FloatingReasonCards3D({
  phase,
  selectedReason,
  onSelectReason,
  pointer,
}: FloatingReasonCards3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isReasons = phase === "reasons" || phase === "reasons_transition";

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetZ = isReasons ? 0 : -18;
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      targetZ,
      2.2,
      delta
    );
  });

  if (!isReasons) return null;

  return (
    <group ref={groupRef}>
      {REASONS_DATA.map((reason, index) => (
        <ReasonCard3D
          key={reason.id}
          reason={reason}
          index={index}
          isSelected={selectedReason?.id === reason.id}
          onSelect={() => onSelectReason(reason)}
          pointer={pointer}
        />
      ))}
    </group>
  );
}
