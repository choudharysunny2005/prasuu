"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { STORY_DATA } from "@/lib/storyData";

interface EmotionalDeepSectionProps {
  onNextSection?: () => void;
  onPrevSection?: () => void;
}

export function EmotionalDeepSection({
  onNextSection,
  onPrevSection,
}: EmotionalDeepSectionProps) {
  const { emotional, deeperFeeling } = STORY_DATA;
  const [tab, setTab] = useState<"miss" | "deeper">("miss");

  return (
    <div className="relative z-20 flex min-h-full w-full flex-col justify-between items-center px-4 py-6 sm:px-8 sm:py-10 max-w-3xl mx-auto overflow-y-auto no-scrollbar">
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-2 text-rose-300/70 text-xs tracking-[0.3em] uppercase font-light mb-2"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        <span>{tab === "miss" ? emotional.badge : deeperFeeling.badge}</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
      </motion.div>

      {/* Mode / Thought Tab Switcher */}
      <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
        <button
          onClick={() => setTab("miss")}
          className={`px-4 py-1.5 rounded-full text-xs font-serif-luxury tracking-wide transition-all cursor-pointer ${
            tab === "miss"
              ? "bg-rose-500/30 text-white border border-rose-400/50 shadow-md"
              : "text-rose-200/60 hover:text-white"
          }`}
        >
          What I Miss Most
        </button>
        <button
          onClick={() => setTab("deeper")}
          className={`px-4 py-1.5 rounded-full text-xs font-serif-luxury tracking-wide transition-all cursor-pointer ${
            tab === "deeper"
              ? "bg-rose-500/30 text-white border border-rose-400/50 shadow-md"
              : "text-rose-200/60 hover:text-white"
          }`}
        >
          In My Heart
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full my-auto">
        <AnimatePresence mode="wait">
          {tab === "miss" ? (
            <motion.div
              key="tab-miss"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-6 sm:p-10 glass-luxury border border-rose-300/25 bg-gradient-to-b from-[#1e0d2d]/90 via-[#10071c]/90 to-[#06020a]/95 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(244,114,182,0.2)]"
            >
              <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-rose-100 font-normal leading-tight mb-2">
                &ldquo;{emotional.title}&rdquo;
              </h2>

              <p className="font-serif-luxury italic text-xl sm:text-2xl text-rose-200/90 font-light mb-6 text-glow-subtle">
                {emotional.mainThought}
              </p>

              {/* The List of Little Things */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left mb-8">
                {emotional.missItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3 font-serif-luxury text-base sm:text-lg text-rose-100"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Emotional closing: "I miss us." */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-rose-50 font-medium tracking-wide text-glow-heading flex items-center justify-center gap-2"
              >
                <span>{emotional.closing}</span>
                <Heart className="w-6 h-6 fill-rose-500 text-rose-400 inline-block animate-pulse" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="tab-deeper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-6 sm:p-10 glass-luxury border border-purple-300/25 bg-gradient-to-b from-[#180929]/90 via-[#0e051a]/90 to-[#040108]/95 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(168,85,247,0.2)]"
            >
              {/* Minimalist, Sincere, Breathing Space Lines */}
              <div className="space-y-4 sm:space-y-5 font-serif-luxury text-lg sm:text-2xl text-rose-100/95 font-light leading-relaxed max-w-xl mx-auto">
                <p className="text-xl sm:text-2xl font-normal text-rose-50">
                  &ldquo;{deeperFeeling.thoughts[0]}&rdquo;
                </p>

                <p className="text-amber-200/90 italic">
                  {deeperFeeling.thoughts[1]}
                </p>

                <p className="text-rose-300/80">
                  {deeperFeeling.thoughts[2]}
                </p>

                <p className="text-purple-200/90 pt-2 font-normal">
                  &ldquo;{deeperFeeling.thoughts[3]}&rdquo;
                </p>

                <p className="text-slate-300 text-base sm:text-xl font-sans-modern font-light">
                  {deeperFeeling.thoughts[4]}
                </p>

                <p className="text-rose-100 font-medium text-xl sm:text-3xl text-glow-heading pt-2">
                  &ldquo;{deeperFeeling.thoughts[5]}&rdquo;
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="flex items-center justify-between w-full max-w-xl mt-6 pt-2"
      >
        {onPrevSection ? (
          <button
            onClick={onPrevSection}
            className="text-xs text-rose-300/70 hover:text-rose-100 transition-colors cursor-pointer font-sans-modern"
          >
            ← Her Smile
          </button>
        ) : <div />}

        {onNextSection && (
          <button
            id="cta-emotional-next-btn"
            onClick={onNextSection}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full glass-button text-xs sm:text-sm font-sans-modern tracking-wider uppercase text-rose-50 hover:text-white cursor-pointer shadow-[0_0_25px_rgba(244,114,182,0.3)]"
          >
            <span>One Tiny Challenge</span>
            <ArrowRight className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
