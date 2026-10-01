"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleBackground } from "./ParticleBackground";
import { GlowingHeartMesh } from "./GlowingHeartMesh";
import { Envelope3D, ExperiencePhase } from "./Envelope3D";
import { FloatingMemoryCards3D } from "./FloatingMemoryCards3D";
import { FloatingReasonCards3D } from "./FloatingReasonCards3D";
import { GlowingRose3D } from "./GlowingRose3D";
import { MemoryItem } from "@/lib/memories";
import { ReasonItem } from "@/lib/reasons";

interface ExperienceCanvasProps {
  phase: ExperiencePhase;
  selectedMemory: MemoryItem | null;
  onSelectMemory: (memory: MemoryItem) => void;
  selectedReason: ReasonItem | null;
  onSelectReason: (reason: ReasonItem) => void;
  pointer: { x: number; y: number };
}

function CameraRig({
  phase,
  selectedMemory,
  selectedReason,
  pointer,
}: {
  phase: ExperiencePhase;
  selectedMemory: MemoryItem | null;
  selectedReason: ReasonItem | null;
  pointer: { x: number; y: number };
}) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 7.2));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (phase === "landing") {
      targetPos.current.set(pointer.x * 0.4, pointer.y * 0.4, 7.2);
      targetLook.current.set(pointer.x * 0.1, pointer.y * 0.1, 0);
    } else if (
      phase === "transitioning" ||
      phase === "final_transition"
    ) {
      targetPos.current.set(pointer.x * 0.2, pointer.y * 0.2, 1.2);
      targetLook.current.set(0, 0, -6);
    } else if (phase === "envelope") {
      targetPos.current.set(pointer.x * 0.4, 0.2 + pointer.y * 0.4, 6.2);
      targetLook.current.set(0, 0.2, 0);
    } else if (phase === "opening" || phase === "letter") {
      targetPos.current.set(pointer.x * 0.15, -0.1 + pointer.y * 0.15, 5.2);
      targetLook.current.set(0, 0.3, 0);
    } else if (phase === "timeline" || phase === "bus_memories" || phase === "childish_fights" || phase === "nicknames" || phase === "video_calls" || phase === "her_smile" || phase === "emotional_deep") {
      // Gentle floating background atmosphere with subtle parallax
      targetPos.current.set(pointer.x * 0.4, 0.3 + pointer.y * 0.4, 6.6);
      targetLook.current.set(0, 0, -1.0);
    } else if (phase === "game" || phase === "game_victory") {
      targetPos.current.set(pointer.x * 0.4, pointer.y * 0.4, 6.8);
      targetLook.current.set(0, 0, 0);
    } else if (phase === "final") {
      // Intimate, peaceful cinematic framing centered on the glowing rose
      targetPos.current.set(pointer.x * 0.3, 0.4 + pointer.y * 0.3, 5.6);
      targetLook.current.set(0, 0.4, 0);
    }

    const lerpSpeed =
      phase === "transitioning" || phase === "final_transition"
        ? 1.8
        : 2.2;

    state.camera.position.lerp(targetPos.current, delta * lerpSpeed);
    state.camera.lookAt(targetLook.current);
  });

  return null;
}

export function ExperienceCanvas({
  phase,
  selectedMemory,
  onSelectMemory,
  selectedReason,
  onSelectReason,
  pointer,
}: ExperienceCanvasProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <CameraRig
          phase={phase}
          selectedMemory={selectedMemory}
          selectedReason={selectedReason}
          pointer={pointer}
        />

        {/* Dynamic atmospheric lighting */}
        <ambientLight
          intensity={
            phase === "final"
              ? 0.45
              : phase === "letter" || phase === "opening"
              ? 0.35
              : 0.65
          }
          color="#e2e8f0"
        />
        <directionalLight
          position={[5, 8, 5]}
          intensity={phase === "final" ? 1.6 : 1.2}
          color="#fdf2f8"
        />
        <directionalLight
          position={[-5, -4, -2]}
          intensity={0.4}
          color="#c084fc"
        />

        {/* 3D Scene Elements */}
        <ParticleBackground phase={phase} pointer={pointer} />
        <GlowingHeartMesh phase={phase} pointer={pointer} />
        <Envelope3D phase={phase} pointer={pointer} />
        <FloatingMemoryCards3D
          phase={phase}
          selectedMemory={selectedMemory}
          onSelectMemory={onSelectMemory}
          pointer={pointer}
        />
        <FloatingReasonCards3D
          phase={phase}
          selectedReason={selectedReason}
          onSelectReason={onSelectReason}
          pointer={pointer}
        />
        <GlowingRose3D phase={phase} pointer={pointer} />
      </Canvas>
    </div>
  );
}
