"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { LandingScreen } from "@/components/ui/LandingScreen";
import { EnvelopeScreen } from "@/components/ui/EnvelopeScreen";
import { LetterScreen } from "@/components/ui/LetterScreen";
import { TimelineSection } from "@/components/story/TimelineSection";
import { BusMemoriesSection } from "@/components/story/BusMemoriesSection";
import { ChildishFightsSection } from "@/components/story/ChildishFightsSection";
import { NicknamesSection } from "@/components/story/NicknamesSection";
import { VideoCallsSection } from "@/components/story/VideoCallsSection";
import { HerSmileSection } from "@/components/story/HerSmileSection";
import { EmotionalDeepSection } from "@/components/story/EmotionalDeepSection";
import { HeartCatchGame } from "@/components/game/HeartCatchGame";
import { FinalSceneScreen } from "@/components/ui/FinalSceneScreen";
import { CinematicLightBurst } from "@/components/ui/CinematicLightBurst";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import {
  playWarpSound,
  playEnvelopeOpenSound,
} from "@/lib/audio";
import { ExperiencePhase } from "@/components/canvas/Envelope3D";

// Dynamic import for R3F Canvas to ensure clean client-side WebGL rendering without SSR mismatch
const ExperienceCanvas = dynamic(
  () =>
    import("@/components/canvas/ExperienceCanvas").then(
      (mod) => mod.ExperienceCanvas
    ),
  { ssr: false }
);

export default function Home() {
  const [phase, setPhase] = useState<ExperiencePhase>("landing");
  const [showLightBurst, setShowLightBurst] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  // Handle pointer/touch motion for subtle 3D parallax
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = -(clientY / innerHeight - 0.5) * 2;
    setPointer({ x, y });
  }, []);

  // Handle touch movement on mobile devices
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      const x = (touch.clientX / innerWidth - 0.5) * 2;
      const y = -(touch.clientY / innerHeight - 0.5) * 2;
      setPointer({ x, y });
    }
  }, []);

  // Transition sequence when "Enter →" is clicked
  const handleEnter = () => {
    if (phase !== "landing") return;

    playWarpSound();
    setPhase("transitioning");

    setTimeout(() => {
      setShowLightBurst(true);
    }, 700);

    setTimeout(() => {
      setPhase("envelope");
    }, 1500);

    setTimeout(() => {
      setShowLightBurst(false);
    }, 2400);
  };

  // Interaction when "Open it ❤️" is clicked
  const handleOpenEnvelope = () => {
    if (phase !== "envelope") return;

    playEnvelopeOpenSound();
    setPhase("opening");

    setTimeout(() => {
      setPhase("letter");
    }, 600);
  };

  // Transition to Timeline after Letter
  const handleStartStory = () => {
    playWarpSound();
    setShowLightBurst(true);
    setTimeout(() => {
      setPhase("timeline");
      setShowLightBurst(false);
    }, 600);
  };

  // Generic smooth transition helper between story chapters
  const transitionTo = (nextPhase: ExperiencePhase) => {
    playWarpSound();
    setShowLightBurst(true);
    setTimeout(() => {
      setPhase(nextPhase);
      setShowLightBurst(false);
    }, 500);
  };

  return (
    <main
      onPointerMove={handlePointerMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#030308] text-white select-none flex flex-col justify-between"
    >
      {/* Background Ambient Radial Glow Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className={`absolute -top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[650px] h-[550px] rounded-full bg-rose-600/10 blur-[130px] transition-opacity duration-1000 ${
            phase === "letter" || phase === "final" ? "opacity-25" : "opacity-100 animate-glow-pulse"
          }`}
        />
        <div
          className={`absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[100vw] max-w-[750px] h-[600px] rounded-full bg-purple-600/10 blur-[140px] transition-opacity duration-1000 ${
            phase === "letter" || phase === "final" ? "opacity-30" : "opacity-100"
          }`}
        />
        {/* Story nebula aura */}
        {phase !== "landing" && phase !== "envelope" && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[450px] rounded-full bg-indigo-600/15 blur-[150px] transition-opacity duration-1000" />
        )}
      </div>

      {/* Subtle Noise Texture for Film Grain Feel */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-noise opacity-30" />

      {/* Radial Vignette */}
      <div
        className={`pointer-events-none absolute inset-0 z-[2] transition-all duration-1000 ${
          phase === "letter" || phase === "opening" || phase === "final"
            ? "bg-[radial-gradient(ellipse_at_center,rgba(3,3,8,0.4)_0%,rgba(3,3,8,0.85)_60%,rgba(3,3,8,0.98)_100%)]"
            : "vignette-radial"
        }`}
      />

      {/* WebGL 3D Canvas */}
      <ExperienceCanvas
        phase={phase}
        selectedMemory={null}
        onSelectMemory={() => {}}
        selectedReason={null}
        onSelectReason={() => {}}
        pointer={pointer}
      />

      {/* Cinematic Light Burst Flash */}
      <CinematicLightBurst active={showLightBurst} />

      {/* 1. Landing Screen */}
      {phase === "landing" && (
        <LandingScreen onEnter={handleEnter} isLeaving={phase !== "landing"} />
      )}

      {/* 2. Envelope Screen */}
      {phase === "envelope" && (
        <EnvelopeScreen onOpenEnvelope={handleOpenEnvelope} />
      )}

      {/* 3. The Letter */}
      {(phase === "opening" || phase === "letter") && (
        <LetterScreen onKeepGoing={handleStartStory} />
      )}

      {/* 4. Timeline (5 July & 7 July 2025) */}
      {phase === "timeline" && (
        <TimelineSection
          onNextSection={() => transitionTo("bus_memories")}
          onPrevSection={() => setPhase("letter")}
        />
      )}

      {/* 5. Bus Memories (Sikar ⇄ Jhunjhunu ⇄ Rajgarh) */}
      {phase === "bus_memories" && (
        <BusMemoriesSection
          onNextSection={() => transitionTo("childish_fights")}
          onPrevSection={() => transitionTo("timeline")}
        />
      )}

      {/* 6. Childish Fights (Choti choti baatein...) */}
      {phase === "childish_fights" && (
        <ChildishFightsSection
          onNextSection={() => transitionTo("nicknames")}
          onPrevSection={() => transitionTo("bus_memories")}
        />
      )}

      {/* 7. Nicknames ("Prasuu ❤️" & "Panda 🐼") */}
      {phase === "nicknames" && (
        <NicknamesSection
          onNextSection={() => transitionTo("video_calls")}
          onPrevSection={() => transitionTo("childish_fights")}
        />
      )}

      {/* 8. Late Night Video Calls */}
      {phase === "video_calls" && (
        <VideoCallsSection
          onNextSection={() => transitionTo("her_smile")}
          onPrevSection={() => transitionTo("nicknames")}
        />
      )}

      {/* 9. Her Smile & Portrait Gallery */}
      {phase === "her_smile" && (
        <HerSmileSection
          onNextSection={() => transitionTo("emotional_deep")}
          onPrevSection={() => transitionTo("video_calls")}
        />
      )}

      {/* 10. Emotional Reflection & Deeper Feeling ("I miss us") */}
      {phase === "emotional_deep" && (
        <EmotionalDeepSection
          onNextSection={() => transitionTo("game")}
          onPrevSection={() => transitionTo("her_smile")}
        />
      )}

      {/* 11. One Tiny Challenge Mini-Game */}
      {(phase === "game" || phase === "game_victory") && (
        <HeartCatchGame
          onGameComplete={() => {
            setPhase("game_victory");
          }}
          onNextAfterVictory={() => {
            transitionTo("final");
          }}
        />
      )}

      {/* 12. Final Scene (Glowing 3D Rose & "Come talk to me ❤️") */}
      {phase === "final" && (
        <FinalSceneScreen onRestart={() => setPhase("landing")} />
      )}

      {/* Background Music Controller (Fixed Bottom-Right) */}
      <MusicPlayer />
    </main>
  );
}
