"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MEMORIES_DATA, MemoryItem } from "@/lib/memories";

interface FloatingMemoryCards3DProps {
  phase: string;
  selectedMemory: MemoryItem | null;
  onSelectMemory: (memory: MemoryItem) => void;
  pointer: { x: number; y: number };
}

function MemoryNode({
  memory,
  index,
  isSelected,
  onSelect,
  pointer,
}: {
  memory: MemoryItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  pointer: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Generate memory node texture with title & icon symbol
  const canvasTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Card background with rounded rect and glass gradient
    const r = 24;
    const w = 480;
    const h = 220;
    const x = 16;
    const y = 18;

    // Outer glow / stroke
    ctx.fillStyle = "rgba(18, 12, 32, 0.75)";
    ctx.strokeStyle = memory.accentColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
    ctx.stroke();

    // Top pill badge
    ctx.fillStyle = memory.accentColor;
    ctx.beginPath();
    ctx.roundRect(x + 24, y + 20, 110, 32, 16);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`MEM ${index + 1}`, x + 44, y + 42);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px 'Plus Jakarta Sans', sans-serif";
    ctx.shadowColor = memory.accentColor;
    ctx.shadowBlur = 10;
    ctx.fillText(memory.title, x + 24, y + 95);

    // Subtitle
    ctx.fillStyle = "rgba(240, 230, 255, 0.75)";
    ctx.font = "italic 20px 'Cormorant Garamond', Georgia, serif";
    ctx.shadowBlur = 0;
    ctx.fillText(memory.subtitle, x + 24, y + 135);

    // Tap to open hint
    ctx.fillStyle = memory.accentColor;
    ctx.font = "500 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("✨ Tap to relive memory", x + 24, y + 180);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [memory, index]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() + index * 1.5;

    // Hover floating oscillation
    const hoverOffset = Math.sin(time * 1.4) * 0.08;
    meshRef.current.position.y = memory.position3D[1] + hoverOffset;

    // Gentle look towards camera with subtle parallax
    meshRef.current.rotation.y = THREE.MathUtils.damp(
      meshRef.current.rotation.y,
      Math.sin(time * 0.8) * 0.05 + pointer.x * 0.15,
      2.5,
      delta
    );
    meshRef.current.rotation.x = THREE.MathUtils.damp(
      meshRef.current.rotation.x,
      Math.cos(time * 0.9) * 0.04 + pointer.y * 0.1,
      2.5,
      delta
    );

    // Pulse ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.8;
      const ringScale = (hovered ? 1.25 : 1.0) + Math.sin(time * 3) * 0.06;
      ringRef.current.scale.set(ringScale, ringScale, 1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={memory.position3D}
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
      {/* Halo Glow Ring */}
      <mesh ref={ringRef} position={[0, 0, -0.05]}>
        <ringGeometry args={[1.3, 1.45, 32]} />
        <meshBasicMaterial
          color={memory.accentColor}
          transparent
          opacity={hovered ? 0.85 : 0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point light for node glow */}
      <pointLight
        position={[0, 0, 0.4]}
        intensity={hovered || isSelected ? 1.6 : 0.6}
        color={memory.accentColor}
        distance={4}
      />

      {/* Main Glass Card Plate */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[2.5, 1.25]} />
        <meshStandardMaterial
          map={canvasTexture}
          transparent
          roughness={0.2}
          metalness={0.1}
          opacity={0.95}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glass Backing with Bevel */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[2.54, 1.29, 0.03]} />
        <meshPhysicalMaterial
          color="#0f091c"
          roughness={0.1}
          metalness={0.2}
          transmission={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

export function FloatingMemoryCards3D({
  phase,
  selectedMemory,
  onSelectMemory,
  pointer,
}: FloatingMemoryCards3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(0);

  // Constellation connecting line geometry
  const linePoints = useMemo(() => {
    return MEMORIES_DATA.map((m) => new THREE.Vector3(...m.position3D));
  }, []);

  const lineObject = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(linePoints);
    const points = curve.getPoints(80);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: "#e0aaff",
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Line(geometry, material);
  }, [linePoints]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const isUniverse = phase === "universe" || phase === "universe_transition";
    const targetOpacity = isUniverse ? 1 : 0;
    opacityRef.current = THREE.MathUtils.damp(opacityRef.current, targetOpacity, 2.5, delta);

    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      isUniverse ? 0 : -15,
      2,
      delta
    );
  });

  if (phase !== "universe" && phase !== "universe_transition") {
    return null;
  }

  return (
    <group ref={groupRef}>
      {/* Constellation Starlight Line connecting memories */}
      <primitive object={lineObject} />

      {/* 5 Floating Memory Cards */}
      {MEMORIES_DATA.map((memory, index) => (
        <MemoryNode
          key={memory.id}
          memory={memory}
          index={index}
          isSelected={selectedMemory?.id === memory.id}
          onSelect={() => onSelectMemory(memory)}
          pointer={pointer}
        />
      ))}
    </group>
  );
}
