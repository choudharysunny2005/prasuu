"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight, Calendar, MapPin } from "lucide-react";
import { STORY_DATA } from "@/lib/storyData";
import { STORY_PHOTOS } from "@/lib/photos";
import { StoryImage } from "@/components/ui/StoryImage";

interface TimelineSectionProps {
  onNextSection?: () => void;
  onPrevSection?: () => void;
}

export function TimelineSection({ onNextSection, onPrevSection }: TimelineSectionProps) {
  const { timeline } = STORY_DATA;

  return (
    <div className="relative z-20 flex min-h-full w-full flex-col justify-between items-center px-4 py-6 sm:px-8 sm:py-10 max-w-4xl mx-auto overflow-y-auto no-scrollbar">
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-2 text-rose-300/70 text-xs tracking-[0.3em] uppercase font-light mb-2 sm:mb-4"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        <span>{timeline.badge}</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
      </motion.div>

      {/* Main Title & Separation Mention */}
      <div className="text-center mb-6 sm:mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif-luxury italic text-rose-300/80 text-base sm:text-lg mb-1"
        >
          {timeline.intro}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-serif-luxury text-2xl sm:text-3xl md:text-5xl text-rose-50 font-normal tracking-tight text-glow-heading"
        >
          How We Found Our Way Back
        </motion.h2>
      </div>

      {/* The Two Cinematic Date Milestones */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 my-auto">
        {/* Milestone 1: 5 JULY 2025 */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-5 sm:p-7 glass-luxury border border-rose-300/25 bg-gradient-to-b from-[#1a0c28]/90 via-[#0e0618]/90 to-[#05020c]/95 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(244,114,182,0.15)] flex flex-col justify-between"
        >
          <div>
            {/* Date Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/40 text-xs font-mono font-semibold tracking-wider mb-4 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>{timeline.date1.date}</span>
            </div>

            {/* Photo Placeholder / Image */}
            <div className="w-full h-44 sm:h-52 mb-4">
              <StoryImage photo={STORY_PHOTOS.timeline[0]} />
            </div>

            <h3 className="font-serif-luxury text-xl sm:text-2xl text-rose-100 font-normal mb-2 text-glow-subtle flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{timeline.date1.title}</span>
            </h3>

            <p className="font-serif-luxury italic text-rose-200/90 text-base sm:text-lg mb-3">
              &ldquo;{timeline.date1.quote}&rdquo;
            </p>

            <p className="font-sans-modern text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {timeline.date1.description}
            </p>
          </div>
        </motion.div>

        {/* Milestone 2: 7 JULY 2025 */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-5 sm:p-7 glass-luxury border border-rose-400/35 bg-gradient-to-b from-[#240e34]/90 via-[#12071d]/90 to-[#07020e]/95 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(244,63,94,0.25)] flex flex-col justify-between"
        >
          <div>
            {/* Date Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/25 text-pink-100 border border-pink-400/50 text-xs font-mono font-semibold tracking-wider mb-4 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400 animate-pulse" />
              <span>{timeline.date2.date}</span>
            </div>

            {/* Photo Placeholder / Image */}
            <div className="w-full h-44 sm:h-52 mb-4">
              <StoryImage photo={STORY_PHOTOS.timeline[1]} />
            </div>

            <h3 className="font-serif-luxury text-xl sm:text-2xl text-rose-50 font-normal mb-2 text-glow-subtle flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>{timeline.date2.title}</span>
            </h3>

            <p className="font-serif-luxury italic text-rose-100 text-base sm:text-lg mb-3">
              &ldquo;{timeline.date2.quote}&rdquo;
            </p>

            <p className="font-sans-modern text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {timeline.date2.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="flex items-center justify-between w-full max-w-xl mt-6 pt-2"
      >
        {onPrevSection ? (
          <button
            onClick={onPrevSection}
            className="text-xs text-rose-300/70 hover:text-rose-100 transition-colors cursor-pointer font-sans-modern"
          >
            ← Previous
          </button>
        ) : <div />}

        {onNextSection && (
          <button
            id="cta-timeline-next-btn"
            onClick={onNextSection}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full glass-button text-xs sm:text-sm font-sans-modern tracking-wider uppercase text-rose-50 hover:text-white cursor-pointer shadow-[0_0_25px_rgba(244,114,182,0.3)]"
          >
            <span>Our Bus Journeys</span>
            <ArrowRight className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
