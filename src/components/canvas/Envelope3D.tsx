"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type ExperiencePhase =
  | "landing"
  | "transitioning"
  | "envelope"
  | "opening"
  | "letter"
  | "timeline"
  | "bus_memories"
  | "childish_fights"
  | "nicknames"
  | "video_calls"
  | "her_smile"
  | "emotional_deep"
  | "game"
  | "game_victory"
  | "final_transition"
  | "final";

interface Envelope3DProps {
  phase: ExperiencePhase;
  pointer: { x: number; y: number };
}

export function Envelope3D({ phase, pointer }: Envelope3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flapPivotRef = useRef<THREE.Group>(null);
  const letterCardRef = useRef<THREE.Group>(null);

  // Procedural wax seal stamp canvas texture
  const waxTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Wax base
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, "#be123c"); // ruby rose
    grad.addColorStop(0.7, "#9f1239");
    grad.addColorStop(1, "#881337");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(128, 128, 115, 0, Math.PI * 2);
    ctx.fill();

    // Wax seal rim
    ctx.strokeStyle = "#fb7185";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(128, 128, 98, 0, Math.PI * 2);
    ctx.stroke();

    // Embossed heart symbol in center
    ctx.fillStyle = "#fecdd3";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    const cx = 128, cy = 122;
    ctx.moveTo(cx, cy + 25);
    ctx.bezierCurveTo(cx - 38, cy - 20, cx - 38, cy - 50, cx, cy - 30);
    ctx.bezierCurveTo(cx + 38, cy - 50, cx + 38, cy - 20, cx, cy + 25);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Flap geometry
  const flapGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 1.7;
    const h = 1.15;
    shape.moveTo(-w, 0);
    shape.lineTo(w, 0);
    shape.lineTo(0, -h);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.02,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  const scaleRef = useRef(0.001);
  const posZRef = useRef(-10);
  const flapAngleRef = useRef(0);
  const letterYRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    const isEnvelopeVisible = phase === "envelope" || phase === "opening" || phase === "letter";
    const isOpened = phase === "opening" || phase === "letter";

    const targetScale = isEnvelopeVisible ? 1 : 0.0001;
    // When opened, envelope moves slightly lower & closer
    const targetZ = !isEnvelopeVisible ? -8 : isOpened ? 0.8 : 0;
    const targetY = !isEnvelopeVisible ? 0.3 : isOpened ? -0.85 : 0.3;

    scaleRef.current = THREE.MathUtils.damp(scaleRef.current, targetScale, 3, delta);
    posZRef.current = THREE.MathUtils.damp(posZRef.current, targetZ, 2.5, delta);

    groupRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    groupRef.current.position.z = posZRef.current;

    // Flap unfolding rotation (rotates up and back over top hinge)
    const targetFlapAngle = isOpened ? -Math.PI * 0.92 : 0.08;
    flapAngleRef.current = THREE.MathUtils.damp(flapAngleRef.current, targetFlapAngle, 2.8, delta);
    if (flapPivotRef.current) {
      flapPivotRef.current.rotation.x = flapAngleRef.current;
    }

    // Letter extraction (slides up out of envelope pocket)
    const targetLetterY = isOpened ? 1.6 : 0;
    letterYRef.current = THREE.MathUtils.damp(letterYRef.current, targetLetterY, 2.4, delta);
    if (letterCardRef.current) {
      letterCardRef.current.position.y = letterYRef.current;
      letterCardRef.current.position.z = isOpened ? 0.2 : 0.02;
    }

    if (isEnvelopeVisible) {
      // Gentle floating hover & rotation
      const hoverAmp = isOpened ? 0.04 : 0.12;
      groupRef.current.position.y = targetY + Math.sin(time * 1.5) * hoverAmp;
      
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        Math.sin(time * 0.8) * 0.08 + pointer.x * (isOpened ? 0.15 : 0.35),
        2.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        (isOpened ? 0.15 : 0.08) + Math.cos(time * 1.2) * 0.04 + pointer.y * (isOpened ? 0.12 : 0.25),
        2.5,
        delta
      );
      groupRef.current.rotation.z = Math.sin(time * 0.7) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.3, -8]} scale={0.001}>
      {/* Soft warm point lights */}
      <pointLight position={[0, 1.8, 2.5]} intensity={1.6} color="#fed7aa" distance={8} />
      <pointLight position={[0, -1.5, 1.5]} intensity={0.8} color="#f472b6" distance={6} />

      {/* Main Envelope Body Back & Pocket */}
      <mesh castShadow receiveShadow position={[0, 0, -0.02]}>
        <boxGeometry args={[3.5, 2.3, 0.06]} />
        <meshPhysicalMaterial
          color="#fdfbf7"
          roughness={0.4}
          metalness={0.05}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
          reflectivity={0.5}
        />
      </mesh>

      {/* Gold Edge Border Accent */}
      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[3.54, 2.34, 0.05]} />
        <meshStandardMaterial
          color="#eab308"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* 3D Glowing Letter Card that slides out */}
      <group ref={letterCardRef} position={[0, 0, 0.02]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.1, 2.0, 0.02]} />
          <meshPhysicalMaterial
            color="#fffdfa"
            roughness={0.25}
            metalness={0.02}
            clearcoat={0.4}
            reflectivity={0.6}
          />
        </mesh>
        {/* Gold Trim on the Letter Card */}
        <mesh position={[0, 0, -0.005]}>
          <boxGeometry args={[3.14, 2.04, 0.015]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Soft luminous aura on the emerging card */}
        <pointLight position={[0, 0, 0.3]} intensity={0.6} color="#fed7aa" distance={3} />
      </group>

      {/* Envelope Front Pocket (holds letter before extraction) */}
      <mesh position={[0, -0.2, 0.06]} castShadow receiveShadow>
        <boxGeometry args={[3.48, 1.88, 0.04]} />
        <meshPhysicalMaterial
          color="#fbf5ee"
          roughness={0.42}
          metalness={0.04}
          clearcoat={0.2}
        />
      </mesh>

      {/* Flap Pivot Group (Hinged at top y = 1.15) */}
      <group ref={flapPivotRef} position={[0, 1.15, 0.05]}>
        {/* Triangular flap */}
        <mesh geometry={flapGeometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#f5ede3"
            roughness={0.45}
            metalness={0.05}
            clearcoat={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Gold Trim on Flap */}
        <mesh
          geometry={flapGeometry}
          position={[0, 0, -0.005]}
          scale={[1.015, 1.015, 0.9]}
        >
          <meshStandardMaterial
            color="#eab308"
            roughness={0.25}
            metalness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Crimson Wax Seal with Heart Emblem affixed to Flap Tip */}
        <mesh position={[0, -1.1, 0.035]} castShadow>
          <cylinderGeometry args={[0.36, 0.38, 0.04, 32]} />
          <meshStandardMaterial
            map={waxTexture}
            roughness={0.3}
            metalness={0.15}
          />
        </mesh>
      </group>

      {/* Subtle glowing aura behind envelope */}
      <mesh position={[0, 0, -0.25]}>
        <planeGeometry args={[4.4, 3.2]} />
        <meshBasicMaterial
          color="#f43f5e"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
