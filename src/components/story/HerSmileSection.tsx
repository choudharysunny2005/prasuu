"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Heart, Eye, Sun, Smile, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { STORY_DATA } from "@/lib/storyData";
import { STORY_PHOTOS } from "@/lib/photos";
import { StoryImage } from "@/components/ui/StoryImage";
import { playHeartPopSound } from "@/lib/audio";

interface HerSmileSectionProps {
  onNextSection?: () => void;
  onPrevSection?: () => void;
}

export function HerSmileSection({
  onNextSection,
  onPrevSection,
}: HerSmileSectionProps) {
  const { herSmile } = STORY_DATA;
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(2); // Default to her favorite smile
  const [fullscreenPhoto, setFullscreenPhoto] = useState<number | null>(null);

  const nextPhoto = () => {
    playHeartPopSound(1.2);
    setSelectedPhotoIdx((prev) => (prev + 1) % STORY_PHOTOS.herGallery.length);
  };

  const prevPhoto = () => {
    playHeartPopSound(1.0);
    setSelectedPhotoIdx((prev) => (prev - 1 + STORY_PHOTOS.herGallery.length) % STORY_PHOTOS.herGallery.length);
  };

  const currentPhoto = STORY_PHOTOS.herGallery[selectedPhotoIdx];

  return (
    <div className="relative z-20 flex min-h-full w-full flex-col justify-between items-center px-4 py-6 sm:px-8 sm:py-10 max-w-4xl mx-auto overflow-y-auto no-scrollbar">
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-2 text-rose-300/70 text-xs tracking-[0.3em] uppercase font-light mb-2"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        <span>{herSmile.badge}</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
      </motion.div>

      {/* Main Container */}
      <div className="w-full my-auto flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 max-w-4xl">
        {/* Left: Cinematic Portrait Gallery View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xs sm:max-w-sm rounded-3xl overflow-hidden glass-luxury border border-rose-300/30 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(244,114,182,0.25)] flex flex-col justify-between p-3.5 bg-black/75"
        >
          {/* Main Photo Frame */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPhotoIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full cursor-pointer"
                onClick={() => setFullscreenPhoto(selectedPhotoIdx)}
              >
                <StoryImage
                  photo={currentPhoto}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Left & Right Overlay Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white/90 hover:bg-black/90 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg z-10"
              aria-label="Previous portrait"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white/90 hover:bg-black/90 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg z-10"
              aria-label="Next portrait"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Tag / Badge Overlay */}
            {currentPhoto.dateOrTag && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-rose-300 z-10 flex items-center gap-1">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                <span>{currentPhoto.dateOrTag}</span>
              </div>
            )}

            {/* Expand Overlay Button */}
            <button
              onClick={() => setFullscreenPhoto(selectedPhotoIdx)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/90 transition-all z-10 cursor-pointer"
              title="Full screen view"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Photo Title & Caption Overlay */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-xl bg-black/75 backdrop-blur-md flex flex-col text-left text-white border border-white/10 z-10">
              <div className="flex items-center justify-between">
                <span className="font-serif-luxury text-sm text-rose-200 font-medium">
                  {currentPhoto.title}
                </span>
                <span className="text-[10px] font-mono text-slate-300">
                  {selectedPhotoIdx + 1} / {STORY_PHOTOS.herGallery.length}
                </span>
              </div>
              {currentPhoto.caption && (
                <p className="text-[11px] text-slate-300 font-light truncate mt-0.5">
                  {currentPhoto.caption}
                </p>
              )}
            </div>
          </div>

          {/* Photo Selector Thumbnails - 10 Portraits */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 pt-3 px-1 pb-1 w-full overflow-x-auto no-scrollbar">
            {STORY_PHOTOS.herGallery.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => {
                  playHeartPopSound(1.1);
                  setSelectedPhotoIdx(idx);
                }}
                className={`relative flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedPhotoIdx === idx
                    ? "border-rose-400 scale-105 shadow-[0_0_15px_rgba(244,63,94,0.4)] z-10"
                    : "border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                <StoryImage photo={photo} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right: Poetic Lines & Story */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="flex-1 text-left space-y-4 max-w-md"
        >
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center gap-2 text-rose-200/80 font-serif-luxury text-xl sm:text-2xl"
            >
              <Eye className="w-4 h-4 text-rose-300" />
              <span>&ldquo;{herSmile.lines[0]}&rdquo;</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-2 text-rose-200/80 font-serif-luxury text-xl sm:text-2xl"
            >
              <Sun className="w-4 h-4 text-amber-300" />
              <span>&ldquo;{herSmile.lines[1]}&rdquo;</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex items-center gap-2 text-rose-100 font-serif-luxury text-2xl sm:text-3xl font-medium pt-1"
            >
              <Smile className="w-5 h-5 text-rose-400" />
              <span>&ldquo;{herSmile.lines[2]}&rdquo;</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="p-5 rounded-2xl glass-luxury border border-rose-300/25 bg-gradient-to-br from-rose-950/20 to-purple-950/20"
          >
            <p className="font-serif-luxury italic text-xl sm:text-2xl text-rose-50 font-normal leading-snug text-glow-heading mb-2">
              &ldquo;{herSmile.highlightQuote}&rdquo;
            </p>
            <p className="font-sans-modern text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {herSmile.description}
            </p>
          </motion.div>
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
              <StoryImage photo={STORY_PHOTOS.herGallery[fullscreenPhoto]} priority />
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
        transition={{ delay: 1.6, duration: 0.8 }}
        className="flex items-center justify-between w-full max-w-xl mt-6 pt-2"
      >
        {onPrevSection ? (
          <button
            onClick={onPrevSection}
            className="text-xs text-rose-300/70 hover:text-rose-100 transition-colors cursor-pointer font-sans-modern"
          >
            ← Video Calls
          </button>
        ) : <div />}

        {onNextSection && (
          <button
            id="cta-smile-next-btn"
            onClick={onNextSection}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full glass-button text-xs sm:text-sm font-sans-modern tracking-wider uppercase text-rose-50 hover:text-white cursor-pointer shadow-[0_0_25px_rgba(244,114,182,0.3)]"
          >
            <span>From My Heart</span>
            <ArrowRight className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
