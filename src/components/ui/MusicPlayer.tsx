"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music, AlertCircle, X } from "lucide-react";
import { BACKGROUND_MUSIC } from "@/lib/musicConfig";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(BACKGROUND_MUSIC.defaultVolume || 0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio source path: Next.js serves files in /public at the root URL
  const audioSrc = BACKGROUND_MUSIC.src; // "/music/tareefan.mp3"

  // Setup Event Listeners and Audio Lifecycle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    console.log("Audio source:", audioSrc);

    const onLoadedMetadata = () => {
      console.log("Audio loaded: metadata loaded, duration:", audio.duration);
      setErrorMessage(null);
    };

    const onCanPlay = () => {
      console.log("Audio loaded: canplay ready");
      setErrorMessage(null);
    };

    const onPlay = () => {
      console.log("Playback started: audio is playing");
      setIsPlaying(true);
      setHasStartedOnce(true);
      setErrorMessage(null);
    };

    const onPause = () => {
      console.log("Audio paused");
      setIsPlaying(false);
    };

    const onEnded = () => {
      console.log("Audio ended");
      setIsPlaying(false);
    };

    const onError = (e: Event) => {
      const mediaError = audio.error;
      console.error("Audio error:", mediaError || e);
      setIsPlaying(false);
      setErrorMessage("Couldn't load our song 🥺\nPlease check the audio file.");
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    // Initial properties
    audio.volume = isMuted ? 0 : volume;
    audio.muted = isMuted;

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [audioSrc, volume, isMuted]);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Toggle Play / Pause on user click
  const handleTogglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.error("Playback failed: Audio element reference is null");
      return;
    }

    if (isPlaying) {
      console.log("User paused playback");
      audio.pause();
      setIsPlaying(false);
    } else {
      console.log("User initiated playback: calling audio.play() on", audioSrc);
      setErrorMessage(null);

      // Ensure audio properties are ready
      audio.volume = isMuted ? 0 : volume;
      audio.muted = isMuted;

      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log("Playback started: Promise resolved successfully");
          setIsPlaying(true);
          setHasStartedOnce(true);
          setErrorMessage(null);
        }
      } catch (err: any) {
        console.error("Playback failed:", err);
        setIsPlaying(false);
        setErrorMessage("Couldn't load our song 🥺\nPlease check the audio file.");
      }
    }
  }, [isPlaying, isMuted, volume, audioSrc]);

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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none flex flex-col items-end gap-2"
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />

      {/* Floating Error Notification if file is missing or failed to play */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="relative max-w-xs p-3 rounded-2xl glass-luxury border border-rose-400/40 bg-black/90 backdrop-blur-xl shadow-2xl text-left text-xs space-y-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 text-rose-300 font-medium">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>Audio Notice</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-slate-200 font-sans leading-relaxed whitespace-pre-line">
              {errorMessage}
            </p>
            <div className="pt-1 text-[11px] font-mono text-amber-200/90 bg-white/5 p-2 rounded-lg border border-white/10">
              📁 Place <span className="text-rose-300 font-bold">tareefan.mp3</span> inside:
              <br />
              <span className="text-slate-300">public/music/tareefan.mp3</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          onClick={handleTogglePlay}
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
    </div>
  );
}
