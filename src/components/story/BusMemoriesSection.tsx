"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Bus, MapPin, ChevronLeft, ChevronRight, Heart, Maximize2, X } from "lucide-react";
import { STORY_DATA } from "@/lib/storyData";
import { STORY_PHOTOS } from "@/lib/photos";
import { StoryImage } from "@/components/ui/StoryImage";
import { playHeartPopSound } from "@/lib/audio";

interface BusMemoriesSectionProps {
  onNextSection?: () => void;
  onPrevSection?: () => void;
}

export function BusMemoriesSection({
  onNextSection,
  onPrevSection,
}: BusMemoriesSectionProps) {
  const { busMemories } = STORY_DATA;
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<number | null>(null);

  const nextPhoto = () => {
    playHeartPopSound(1.2);
    setActivePhotoIdx((prev) => (prev + 1) % STORY_PHOTOS.bus.length);
  };

  const prevPhoto = () => {
    playHeartPopSound(1.0);
    setActivePhotoIdx((prev) => (prev - 1 + STORY_PHOTOS.bus.length) % STORY_PHOTOS.bus.length);
  };

  return (
    <div className="relative z-20 flex min-h-full w-full flex-col justify-between items-center px-4 py-6 sm:px-8 sm:py-10 max-w-4xl mx-auto overflow-y-auto no-scrollbar">
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-2 text-amber-300/70 text-xs tracking-[0.3em] uppercase font-light mb-2"
      >
        <Bus className="w-3.5 h-3.5 text-amber-400" />
        <span>{busMemories.badge}</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      </motion.div>

      {/* Main Bus Window Frame Container */}
      <div className="w-full my-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl overflow-hidden glass-luxury border border-amber-400/25 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_45px_rgba(245,158,11,0.2)] bg-black/85"
        >
          {/* Animated Night Road Window Top */}
          <div className="relative w-full h-48 sm:h-60 overflow-hidden bg-gradient-to-b from-[#06040d] via-[#0d0718] to-[#040208]">
            {/* Distant moving horizon & stars */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.25)_0%,transparent_70%)]" />

            {/* Fast moving night road light streaks */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{
                  x: ["120%", "-120%"],
                  opacity: [0, 0.85, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "linear",
                }}
                className="absolute top-[45%] w-48 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-amber-300/90 to-transparent blur-[1px]"
              />

              <motion.div
                animate={{
                  x: ["-120%", "120%"],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.0,
                  ease: "linear",
                  delay: 0.8,
                }}
                className="absolute top-[65%] w-60 sm:w-96 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent blur-[1px]"
              />

              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: ["130vw", "-20vw"],
                    y: [10, 55],
                    scale: [0.3, 1.2],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    delay: i * 1.1,
                    ease: "easeIn",
                  }}
                  className="absolute top-8 w-16 h-16 rounded-full bg-amber-400/20 blur-xl"
                />
              ))}
            </div>

            {/* Bus Window Glass Reflection Layer */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.08]" />

            {/* Window condensation & frame vignette */}
            <div className="absolute inset-0 pointer-events-none border-[10px] sm:border-[14px] border-[#10091c]/90 rounded-3xl shadow-inner" />

            {/* Content overlaid on window */}
            <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-7 text-left">
              {/* Route Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {busMemories.routes.map((r, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-200 border border-amber-300/30 text-xs font-medium shadow-md"
                  >
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{r.from} → {r.to}</span>
                  </span>
                ))}
              </div>

              {/* Poetic Quotes on Window */}
              <div className="space-y-1">
                <p className="font-serif-luxury text-lg sm:text-2xl text-rose-100 font-normal italic leading-snug">
                  &ldquo;{busMemories.quotes[0]}&rdquo;
                </p>
                <p className="font-serif-luxury text-sm sm:text-base text-amber-200/90 font-light">
                  {busMemories.quotes[1]}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Card Area: Interactive Photos & Gallery */}
          <div className="p-5 sm:p-7 bg-gradient-to-b from-black/80 via-[#0e071a]/95 to-[#06020c]/98 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Story Quotes (5 cols) */}
              <div className="md:col-span-5 space-y-3 text-left">
                <p className="font-serif-luxury text-base sm:text-lg text-rose-100 font-light leading-relaxed">
                  &ldquo;{busMemories.quotes[2]}&rdquo;
                </p>
                <p className="font-serif-luxury text-base sm:text-lg text-rose-200/90 italic font-light">
                  {busMemories.quotes[3]}
                </p>
                <p className="font-serif-luxury text-lg sm:text-xl text-amber-200 font-medium pt-1 text-glow-subtle">
                  &ldquo;{busMemories.quotes[4]}&rdquo;
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-200 text-xs font-mono border border-amber-400/30">
                    <Heart className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{STORY_PHOTOS.bus.length} Bus Journey Memories</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Bus Photo Showcase (7 cols) */}
              <div className="md:col-span-7 flex flex-col items-center">
                {/* Main Large Photo Frame */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden glass-luxury border border-amber-300/30 shadow-[0_15px_35px_rgba(0,0,0,0.7)] group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhotoIdx}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-full h-full cursor-pointer"
                      onClick={() => setFullscreenPhoto(activePhotoIdx)}
                    >
                      <StoryImage
                        photo={STORY_PHOTOS.bus[activePhotoIdx]}
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Left & Right Nav Overlay Buttons */}
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white/90 hover:bg-black/90 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg z-10"
                    aria-label="Previous bus photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={nextPhoto}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white/90 hover:bg-black/90 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg z-10"
                    aria-label="Next bus photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Photo Title Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-black/70 backdrop-blur-md flex items-center justify-between text-xs text-white border border-white/10 z-10">
                    <div className="flex flex-col text-left">
                      <span className="font-serif-luxury text-sm text-amber-200">
                        {STORY_PHOTOS.bus[activePhotoIdx].title}
                      </span>
                      {STORY_PHOTOS.bus[activePhotoIdx].caption && (
                        <span className="text-[11px] text-slate-300 font-light truncate max-w-[200px] sm:max-w-[280px]">
                          {STORY_PHOTOS.bus[activePhotoIdx].caption}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded-md bg-white/10">
                      {activePhotoIdx + 1} / {STORY_PHOTOS.bus.length}
                    </span>
                  </div>
                </div>

                {/* 10 Thumbnails Strip - smooth horizontal scroll */}
                <div className="flex items-center gap-1.5 mt-3 w-full overflow-x-auto pb-1 px-1 justify-start sm:justify-center no-scrollbar">
                  {STORY_PHOTOS.bus.map((photo, idx) => (
                    <button
                      key={photo.id}
                      onClick={() => {
                        playHeartPopSound(1.1);
                        setActivePhotoIdx(idx);
                      }}
                      className={`relative flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activePhotoIdx === idx
                          ? "border-amber-400 scale-105 shadow-[0_0_12px_rgba(245,158,11,0.5)] z-10"
                          : "border-white/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <StoryImage photo={photo} />
                    </button>
                  ))}
                </div>
              </div>
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
              className="relative max-w-sm w-full h-[75vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <StoryImage photo={STORY_PHOTOS.bus[fullscreenPhoto]} priority />
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
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex items-center justify-between w-full max-w-xl mt-6 pt-2"
      >
        {onPrevSection ? (
          <button
            onClick={onPrevSection}
            className="text-xs text-rose-300/70 hover:text-rose-100 transition-colors cursor-pointer font-sans-modern"
          >
            ← Timeline
          </button>
        ) : <div />}

        {onNextSection && (
          <button
            id="cta-bus-next-btn"
            onClick={onNextSection}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full glass-button text-xs sm:text-sm font-sans-modern tracking-wider uppercase text-rose-50 hover:text-white cursor-pointer shadow-[0_0_25px_rgba(244,114,182,0.3)]"
          >
            <span>Our Childish Fights</span>
            <ArrowRight className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
