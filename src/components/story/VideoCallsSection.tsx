"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Video, Mic, PhoneOff, Volume2, Wifi, Battery, ChevronLeft, ChevronRight, X, Heart } from "lucide-react";
import { STORY_DATA } from "@/lib/storyData";
import { STORY_PHOTOS } from "@/lib/photos";
import { StoryImage } from "@/components/ui/StoryImage";
import { playHeartPopSound } from "@/lib/audio";

interface VideoCallsSectionProps {
  onNextSection?: () => void;
  onPrevSection?: () => void;
}

export function VideoCallsSection({
  onNextSection,
  onPrevSection,
}: VideoCallsSectionProps) {
  const { videoCalls } = STORY_DATA;
  const [activeCallIdx, setActiveCallIdx] = useState(0);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<number | null>(null);

  const nextCall = () => {
    playHeartPopSound(1.2);
    setActiveCallIdx((prev) => (prev + 1) % STORY_PHOTOS.videoCalls.length);
  };

  const prevCall = () => {
    playHeartPopSound(1.0);
    setActiveCallIdx((prev) => (prev - 1 + STORY_PHOTOS.videoCalls.length) % STORY_PHOTOS.videoCalls.length);
  };

  const currentCall = STORY_PHOTOS.videoCalls[activeCallIdx];

  return (
    <div className="relative z-20 flex min-h-full w-full flex-col justify-between items-center px-4 py-6 sm:px-8 sm:py-10 max-w-4xl mx-auto overflow-y-auto no-scrollbar">
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-2 text-indigo-300/70 text-xs tracking-[0.3em] uppercase font-light mb-2"
      >
        <Video className="w-3.5 h-3.5 text-indigo-400" />
        <span>{videoCalls.badge}</span>
        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
      </motion.div>

      {/* Main Container */}
      <div className="w-full my-auto flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 max-w-3xl">
        {/* Left: Realistic Phone Video Call Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-64 sm:w-72 h-[440px] sm:h-[490px] rounded-[38px] p-3 glass-luxury border-2 border-indigo-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(99,102,241,0.25)] bg-[#0c0617]/95 flex flex-col justify-between overflow-hidden"
        >
          {/* Dynamic Island / Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black/90 border border-white/10 z-30 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>

          {/* Status Bar */}
          <div className="relative z-20 flex items-center justify-between px-4 pt-2 text-[10px] font-mono text-slate-300">
            <span>{currentCall.dateOrTag || "02:14 AM"}</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-emerald-400" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Main Video Screen Photo Container */}
          <div className="relative z-10 w-full flex-1 my-2 rounded-2xl overflow-hidden bg-black/60 shadow-inner group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCallIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full cursor-pointer"
                onClick={() => setFullscreenPhoto(activeCallIdx)}
              >
                <StoryImage photo={currentCall} priority />
              </motion.div>
            </AnimatePresence>

            {/* Left & Right Overlay Buttons */}
            <button
              onClick={prevCall}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg z-20"
              aria-label="Previous call screenshot"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={nextCall}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg z-20"
              aria-label="Next call screenshot"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* In-Call Header Pill */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between p-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs border border-white/10 z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-serif-luxury font-medium text-xs sm:text-sm">Prasuu ❤️</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400">Connected</span>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-black/75 backdrop-blur-md text-white border border-white/10 z-10 text-left">
              <p className="font-serif-luxury text-xs text-rose-200 font-medium leading-tight">
                {currentCall.title}
              </p>
              {currentCall.caption && (
                <p className="text-[10px] text-slate-300 font-light truncate mt-0.5">
                  {currentCall.caption}
                </p>
              )}
            </div>
          </div>

          {/* Video Call Controls Bar */}
          <div className="relative z-20 flex items-center justify-around py-2 px-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
            <button
              onClick={prevCall}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              title="Previous Screenshot"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playHeartPopSound(1.3);
                setFullscreenPhoto(activeCallIdx);
              }}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              title="Expand Photo"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={nextCall}
              className="p-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.6)] transition-all cursor-pointer"
              title="Next Screenshot"
            >
              <Heart className="w-4 h-4 fill-white" />
            </button>
          </div>
        </motion.div>

        {/* Right: Narrative Story Text */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="flex-1 text-left space-y-4 max-w-sm"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-mono border border-indigo-400/30">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>{STORY_PHOTOS.videoCalls.length} Real Video Call Memories</span>
          </div>

          <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-rose-50 font-normal leading-tight text-glow-heading">
            {videoCalls.title}
          </h3>

          <div className="space-y-2 text-rose-100/90 font-serif-luxury text-lg sm:text-xl font-light italic leading-relaxed">
            <p>&ldquo;{videoCalls.quotes[0]}&rdquo;</p>
            <p className="text-rose-200 font-normal">&ldquo;{videoCalls.quotes[1]}&rdquo;</p>
            <p>&ldquo;{videoCalls.quotes[2]}&rdquo;</p>
            <p className="text-amber-200 font-normal">&ldquo;{videoCalls.quotes[3]}&rdquo;</p>
          </div>

          <p className="font-sans-modern text-xs sm:text-sm text-slate-300 font-light leading-relaxed pt-1">
            {videoCalls.subtext}
          </p>

          {/* Screenshot Switcher / Thumbnails */}
          <div className="pt-2">
            <span className="text-xs text-rose-300/70 font-sans-modern block mb-2">Our Video Call Moments ({STORY_PHOTOS.videoCalls.length}):</span>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
              {STORY_PHOTOS.videoCalls.map((call, idx) => (
                <button
                  key={call.id}
                  onClick={() => {
                    playHeartPopSound(1.1);
                    setActiveCallIdx(idx);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs font-sans-modern transition-all cursor-pointer border ${
                    activeCallIdx === idx
                      ? "bg-indigo-600/30 border-indigo-400/80 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 border border-white/20">
                    <StoryImage photo={call} />
                  </div>
                  <span className="truncate text-[11px] font-medium">{call.title}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {fullscreenPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setFullscreenPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-sm w-full h-[80vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <StoryImage photo={STORY_PHOTOS.videoCalls[fullscreenPhoto]} priority />
              <button
                onClick={() => setFullscreenPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="flex items-center justify-between w-full max-w-xl mt-6 pt-2"
      >
        {onPrevSection ? (
          <button
            onClick={onPrevSection}
            className="text-xs text-rose-300/70 hover:text-rose-100 transition-colors cursor-pointer font-sans-modern"
          >
            ← Nicknames
          </button>
        ) : <div />}

        {onNextSection && (
          <button
            id="cta-calls-next-btn"
            onClick={onNextSection}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full glass-button text-xs sm:text-sm font-sans-modern tracking-wider uppercase text-rose-50 hover:text-white cursor-pointer shadow-[0_0_25px_rgba(244,114,182,0.3)]"
          >
            <span>Her Smile</span>
            <ArrowRight className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
