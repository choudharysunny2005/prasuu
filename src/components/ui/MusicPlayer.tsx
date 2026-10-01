"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { BACKGROUND_MUSIC } from "@/lib/musicConfig";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(BACKGROUND_MUSIC.defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(BACKGROUND_MUSIC.src);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      // Graceful error handling if file is not yet copied into /public/music/
      setAudioError(true);
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, []);

  // Update volume when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Smooth Fade-In Playback
  const playWithSmoothFade = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setAudioError(false);
    audio.volume = 0;
    const targetVolume = isMuted ? 0 : volume;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasStartedOnce(true);

          // Smooth fade in over 500ms
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          let currentVol = 0;
          const step = targetVolume / 10;
          fadeIntervalRef.current = setInterval(() => {
            currentVol = Math.min(currentVol + step, targetVolume);
            if (audioRef.current) audioRef.current.volume = currentVol;
            if (currentVol >= targetVolume) {
              if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
          }, 50);
        })
        .catch((err) => {
          console.warn("Audio playback waiting for user action or file:", err.message);
          setIsPlaying(false);
        });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      setIsPlaying(false);
    } else {
      playWithSmoothFade();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (isMuted && newVol > 0) setIsMuted(false);
  };

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none"
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      <div className="relative flex items-center gap-2">
        {/* Desktop Volume Slider Slider Expand */}
        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full glass-luxury border border-white/15 bg-black/80 backdrop-blur-xl shadow-xl"
            >
              <button
                onClick={toggleMute}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-slate-300" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 accent-rose-400 bg-white/20 rounded-lg cursor-pointer appearance-none"
                aria-label="Volume slider"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Music Pill Button */}
        <motion.button
          id="music-player-toggle"
          onClick={togglePlay}
          whileTap={{ scale: 0.95 }}
          className={`relative group flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full transition-all duration-500 cursor-pointer ${
            isPlaying
              ? "glass-luxury border border-rose-400/50 bg-black/85 shadow-[0_0_25px_rgba(244,114,182,0.35),0_10px_30px_rgba(0,0,0,0.8)] text-white"
              : "glass-luxury border border-white/20 bg-black/70 hover:border-rose-400/40 hover:bg-black/85 shadow-lg text-slate-300 hover:text-white"
          }`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {/* Subtle Outer Glowing Pulse Ring when playing */}
          {isPlaying && (
            <span className="absolute -inset-[3px] rounded-full border border-rose-400/40 animate-ping pointer-events-none opacity-40" />
          )}

          {/* Icon or Animated Equalizer */}
          <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
            {isPlaying ? (
              <div className="flex items-end gap-[2px] h-3.5">
                {[1, 2, 3, 4].map((bar) => (
                  <motion.span
                    key={bar}
                    animate={{
                      height: ["25%", "100%", "45%", "85%", "30%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.8 + bar * 0.15,
                      ease: "easeInOut",
                    }}
                    className="w-[2.5px] rounded-full bg-gradient-to-t from-rose-500 to-amber-300"
                  />
                ))}
              </div>
            ) : (
              <Music className="w-4 h-4 text-rose-300/80 group-hover:text-rose-200 transition-colors" />
            )}
          </div>

          {/* Label: "♫ Our song" before playing, "♫ Tareefan" after playing */}
          <div className="flex flex-col text-left">
            <span className="font-serif-luxury text-xs sm:text-sm font-medium tracking-wide text-rose-100/90 whitespace-nowrap">
              {isPlaying || hasStartedOnce
                ? BACKGROUND_MUSIC.playingLabel
                : BACKGROUND_MUSIC.defaultLabel}
            </span>
            {isPlaying && (
              <span className="text-[9px] font-sans-modern tracking-wider text-rose-300/70 uppercase">
                {BACKGROUND_MUSIC.artist}
              </span>
            )}
          </div>

          {/* Tiny Play/Pause Status Indicator */}
          <div className="pl-0.5 text-slate-400 group-hover:text-white transition-colors">
            {isPlaying ? (
              <Pause className="w-3 h-3 fill-rose-300 text-rose-300" />
            ) : (
              <Play className="w-3 h-3 fill-slate-300 text-slate-300" />
            )}
          </div>
        </motion.button>
      </div>

      {/* Optional gentle hint if audio file is missing on local drive */}
      {audioError && !isPlaying && (
        <p className="absolute right-0 top-full mt-1.5 text-[10px] font-sans text-rose-300/70 whitespace-nowrap">
          Place tareefan.mp3 in public/music/
        </p>
      )}
    </div>
  );
}
