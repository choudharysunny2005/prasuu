"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight, Trophy } from "lucide-react";
import { playHeartPopSound, playVictoryFanfare } from "@/lib/audio";

interface FloatingHeart {
  id: number;
  x: number; // percentage 10% - 85%
  y: number; // percentage 15% - 75%
  size: number;
  color: string;
  speed: number;
  wobbleOffset: number;
}

interface ParticleBurst {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface HeartCatchGameProps {
  onGameComplete?: () => void;
  onNextAfterVictory?: () => void;
}

const HEART_COLORS = [
  "#f43f5e", // crimson rose
  "#fb7185", // soft rose
  "#ec4899", // vibrant magenta
  "#f472b6", // light pink
  "#c084fc", // purple sparkle
  "#fed7aa", // champagne gold
];

function generateRandomHeart(id: number): FloatingHeart {
  return {
    id,
    x: Math.floor(Math.random() * 70) + 15,
    y: Math.floor(Math.random() * 55) + 20,
    size: Math.floor(Math.random() * 14) + 40,
    color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    speed: Math.random() * 1.5 + 2.5,
    wobbleOffset: Math.random() * Math.PI * 2,
  };
}

export function HeartCatchGame({
  onGameComplete,
  onNextAfterVictory,
}: HeartCatchGameProps) {
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>(() => {
    // Spawn 5 hearts immediately on load so user can play instantly
    return Array.from({ length: 5 }, (_, i) => generateRandomHeart(i + 1));
  });
  const [bursts, setBursts] = useState<ParticleBurst[]>([]);
  const [screenShake, setScreenShake] = useState(false);
  const nextHeartId = useRef(6);
  const caughtHeartsSet = useRef<Set<number>>(new Set());

  // Keep 4-5 hearts active on screen at all times until 10 are caught
  useEffect(() => {
    if (isWon || score >= 10) {
      setHearts([]);
      return;
    }

    const interval = setInterval(() => {
      setHearts((current) => {
        if (current.length >= 5) return current;
        const newHeart = generateRandomHeart(nextHeartId.current++);
        return [...current, newHeart];
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isWon, score]);

  // Handle catching a heart with 0ms latency onPointerDown
  const handleCatchHeart = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, heart: FloatingHeart) => {
      e.preventDefault();
      e.stopPropagation();

      if (isWon || caughtHeartsSet.current.has(heart.id)) return;
      caughtHeartsSet.current.add(heart.id);

      // Coordinates for particle burst
      const clickX = e.clientX || window.innerWidth / 2;
      const clickY = e.clientY || window.innerHeight / 2;

      // 1. Remove heart immediately and spawn a replacement
      setHearts((prev) => {
        const filtered = prev.filter((h) => h.id !== heart.id);
        if (filtered.length < 4 && score + 1 < 10) {
          return [...filtered, generateRandomHeart(nextHeartId.current++)];
        }
        return filtered;
      });

      // 2. Play sound with pitch scaling
      const nextScore = score + 1;
      playHeartPopSound(1 + (nextScore / 10) * 0.4);

      // 3. Haptic vibration
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate?.(25);
        } catch {
          // ignore if vibration blocked
        }
      }

      // 4. Screen micro pulse
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 120);

      // 5. Add bursting stardust particles
      const burstId = Date.now() + Math.random();
      setBursts((prev) => [
        ...prev,
        { id: burstId, x: clickX, y: clickY, color: heart.color },
      ]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burstId));
      }, 700);

      // 6. Increment score
      setScore(nextScore);

      // 7. Victory handling
      if (nextScore >= 10) {
        setTimeout(() => {
          setIsWon(true);
          playVictoryFanfare();
          onGameComplete?.();
        }, 350);
      }
    },
    [isWon, score, onGameComplete]
  );

  return (
    <div
      className={`relative z-30 flex min-h-full w-full flex-col justify-between p-4 sm:p-6 md:p-8 select-none transition-transform duration-150 pointer-events-auto ${
        screenShake ? "scale-[0.995]" : "scale-100"
      }`}
    >
      {/* Top Header & Score Counter */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center max-w-lg mx-auto pt-2 z-30 pointer-events-auto"
      >
        {!isWon ? (
          <>
            <div className="flex items-center space-x-2 text-rose-300/70 text-xs tracking-[0.3em] uppercase font-light mb-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: "10s" }} />
              <span>Mini Challenge</span>
              <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: "10s" }} />
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-rose-100 font-normal tracking-wide text-glow-heading">
              One tiny challenge...
            </h2>

            <p className="font-sans-modern text-xs sm:text-sm text-rose-200/70 font-light mt-1 tracking-wide">
              Catch 10 hearts and I&apos;ll tell you something.
            </p>

            {/* Glowing Counter Badge */}
            <motion.div
              key={score}
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="mt-4 inline-flex items-center gap-2.5 px-6 py-2 rounded-full glass-luxury border border-rose-400/50 shadow-[0_0_25px_rgba(244,63,94,0.4)]"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-400 animate-pulse" />
              <span className="font-mono font-bold text-base sm:text-lg text-rose-50 tracking-wider">
                {score} / 10
              </span>
            </motion.div>

            {/* Smooth Progress Bar */}
            <div className="w-52 sm:w-64 h-2 rounded-full bg-white/10 mt-3 overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 shadow-[0_0_10px_rgba(244,63,94,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((score / 10) * 100, 100)}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </>
        ) : null}
      </motion.div>

      {/* Floating Hearts Arena with generous touch targets & 0ms latency */}
      {!isWon && (
        <div className="absolute inset-0 z-20 pointer-events-auto overflow-hidden">
          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.button
                key={heart.id}
                onPointerDown={(e) => handleCatchHeart(e, heart)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1],
                  scale: [0, 1.2, 1],
                  y: [0, -16, 0],
                  x: [0, 10, -10, 0],
                }}
                exit={{ opacity: 0, scale: 1.6 }}
                transition={{
                  duration: heart.speed,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                  width: `${heart.size + 24}px`,
                  height: `${heart.size + 24}px`,
                  color: heart.color,
                  touchAction: "manipulation",
                }}
                className="group flex items-center justify-center cursor-pointer p-3 rounded-full backdrop-blur-xs focus:outline-none -translate-x-1/2 -translate-y-1/2"
              >
                {/* Glowing Aura Ring */}
                <span
                  className="absolute inset-2 rounded-full blur-md opacity-70 group-hover:opacity-100 group-active:scale-125 transition-all"
                  style={{ backgroundColor: heart.color }}
                />
                <Heart
                  style={{ width: `${heart.size}px`, height: `${heart.size}px` }}
                  className="relative fill-current filter drop-shadow-[0_0_15px_currentColor] transition-transform duration-150 group-hover:scale-125 group-active:scale-135"
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Particle Burst Effects when hearts are caught */}
      <div className="pointer-events-none fixed inset-0 z-40">
        {bursts.map((burst) => (
          <div
            key={burst.id}
            style={{ left: burst.x, top: burst.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            {Array.from({ length: 10 }).map((_, i) => {
              const angle = (i / 10) * Math.PI * 2;
              const dist = 55;
              const tx = Math.cos(angle) * dist;
              const ty = Math.sin(angle) * dist;
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1.2 }}
                  animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: burst.color,
                    boxShadow: `0 0 12px ${burst.color}`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Victory Cinematic Reveal Modal / Overlay */}
      <AnimatePresence>
        {isWon && (
          <motion.div
            key="victory-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50 my-auto flex flex-col items-center text-center p-6 sm:p-10 rounded-3xl glass-luxury border border-rose-300/40 bg-gradient-to-b from-[#220e36]/95 via-[#12071f]/95 to-[#05020a]/98 max-w-lg mx-auto shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_60px_rgba(244,114,182,0.35)] pointer-events-auto"
          >
            {/* Top Trophy Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300 mb-5 shadow-[0_0_25px_rgba(244,63,94,0.4)]"
            >
              <Trophy className="w-8 h-8 text-amber-300 animate-bounce" />
            </motion.div>

            {/* First text: "Okay... you caught them all. 😂" */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-serif-luxury italic text-xl sm:text-2xl text-rose-200/90 mb-3"
            >
              Okay... you caught them all. 😂
            </motion.p>

            {/* Second text: "Can I get my smile back now? 🥺❤️" */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="font-serif-luxury text-3xl sm:text-4xl text-rose-50 font-normal leading-tight mb-8 text-glow-heading"
            >
              Can I get my smile back now? 🥺❤️
            </motion.h3>

            {/* CTA Button: "Maybe... →" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="w-full flex justify-center"
            >
              <motion.button
                id="cta-maybe-btn"
                onClick={onNextAfterVictory}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full glass-button text-sm sm:text-base font-medium text-rose-50 tracking-wider overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(244,63,94,0.35)] border border-rose-300/40"
              >
                {/* Shine animation */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                <span className="relative font-sans-modern tracking-widest text-xs uppercase sm:text-sm font-semibold">
                  Maybe...
                </span>
                <ArrowRight className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div />
    </div>
  );
}
