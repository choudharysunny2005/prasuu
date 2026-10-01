"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Laugh, Smile, MessageCircle } from "lucide-react";
import { STORY_DATA } from "@/lib/storyData";
import { STORY_PHOTOS } from "@/lib/photos";
import { StoryImage } from "@/components/ui/StoryImage";
import { playHeartPopSound } from "@/lib/audio";

interface ChildishFightsSectionProps {
  onNextSection?: () => void;
  onPrevSection?: () => void;
}

export function ChildishFightsSection({
  onNextSection,
  onPrevSection,
}: ChildishFightsSectionProps) {
  const { childishFights } = STORY_DATA;
  const [activeCard, setActiveCard] = useState<string | null>("fight-1");

  const handleCardClick = (id: string) => {
    playHeartPopSound(1.2);
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div className="relative z-20 flex min-h-full w-full flex-col justify-between items-center px-4 py-6 sm:px-8 sm:py-10 max-w-4xl mx-auto overflow-y-auto no-scrollbar">
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-2 text-amber-300/70 text-xs tracking-[0.3em] uppercase font-light mb-2"
      >
        <Laugh className="w-3.5 h-3.5 text-amber-400" />
        <span>{childishFights.badge}</span>
        <Laugh className="w-3.5 h-3.5 text-amber-400" />
      </motion.div>

      {/* Main Title */}
      <div className="text-center mb-6 sm:mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-serif-luxury text-2xl sm:text-3xl md:text-5xl text-rose-50 font-normal tracking-tight text-glow-heading mb-2"
        >
          {childishFights.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center gap-3 text-rose-300/80 font-serif-luxury italic text-base sm:text-lg flex-wrap"
        >
          <span>&ldquo;{childishFights.subtitle}&rdquo;</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
          <span>&ldquo;{childishFights.subtext}&rdquo;</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-serif-luxury text-rose-100 font-medium text-lg sm:text-xl mt-2"
        >
          {childishFights.quote}
        </motion.p>
      </div>

      {/* Interactive Playful Memory Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 my-auto">
        {childishFights.fights.map((fight, idx) => {
          const isExpanded = activeCard === fight.id;
          return (
            <motion.div
              key={fight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + idx * 0.2, duration: 0.8 }}
              onClick={() => handleCardClick(fight.id)}
              className={`rounded-3xl p-5 sm:p-6 glass-luxury cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                isExpanded
                  ? "bg-rose-500/15 border-rose-400/50 shadow-[0_0_30px_rgba(244,63,94,0.3)] scale-[1.02]"
                  : "bg-white/[0.04] border-white/10 hover:border-rose-300/30 hover:bg-white/[0.08]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 uppercase">
                    Memory #{idx + 1}
                  </span>
                  <Smile className="w-4 h-4 text-amber-300" />
                </div>

                <h3 className="font-serif-luxury text-lg sm:text-xl text-rose-50 font-normal mb-2">
                  {fight.title}
                </h3>

                <p className="font-sans-modern text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {fight.detail}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-rose-300/70 font-sans-modern">
                <span>{isExpanded ? "Tapped ✨" : "Tap to relive"}</span>
                <span className="text-amber-300 text-xs">😂</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cute pout photo preview */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="w-full max-w-sm mt-5 rounded-2xl overflow-hidden shadow-lg h-32 glass-luxury border border-rose-400/20"
      >
        <StoryImage photo={STORY_PHOTOS.specialMoments[0]} />
      </motion.div>

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex items-center justify-between w-full max-w-xl mt-6 pt-2"
      >
        {onPrevSection ? (
          <button
            onClick={onPrevSection}
            className="text-xs text-rose-300/70 hover:text-rose-100 transition-colors cursor-pointer font-sans-modern"
          >
            ← Bus Memories
          </button>
        ) : <div />}

        {onNextSection && (
          <button
            id="cta-fights-next-btn"
            onClick={onNextSection}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full glass-button text-xs sm:text-sm font-sans-modern tracking-wider uppercase text-rose-50 hover:text-white cursor-pointer shadow-[0_0_25px_rgba(244,114,182,0.3)]"
          >
            <span>Her Nicknames</span>
            <ArrowRight className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
