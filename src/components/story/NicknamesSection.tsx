"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Heart, MessageSquare, Smile, Star, Laugh, Flame } from "lucide-react";
import { STORY_DATA } from "@/lib/storyData";
import { playHeartPopSound } from "@/lib/audio";

interface NicknamesSectionProps {
  onNextSection?: () => void;
  onPrevSection?: () => void;
}

export function NicknamesSection({
  onNextSection,
  onPrevSection,
}: NicknamesSectionProps) {
  const { nicknames } = STORY_DATA;
  const [selectedNickname, setSelectedNickname] = useState<string | null>("suar");
  const [activeCategory, setActiveCategory] = useState<"her_for_me" | "me_for_her">("her_for_me");

  const handleCardClick = (id: string, soundPitch = 1.1) => {
    playHeartPopSound(soundPitch);
    setSelectedNickname(selectedNickname === id ? null : id);
  };

  return (
    <div className="relative z-20 flex min-h-full w-full flex-col justify-between items-center px-4 py-6 sm:px-8 sm:py-10 max-w-4xl mx-auto overflow-y-auto no-scrollbar">
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-2 text-rose-300/70 text-xs tracking-[0.3em] uppercase font-light mb-2"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        <span>{nicknames.badge}</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
      </motion.div>

      {/* Main Opening Title */}
      <div className="text-center mb-5 sm:mb-7">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-serif-luxury text-2xl sm:text-3xl md:text-5xl text-rose-50 font-normal tracking-tight text-glow-heading mb-2"
        >
          &ldquo;{nicknames.opening}&rdquo;
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif-luxury italic text-rose-300/80 text-base sm:text-lg max-w-lg mx-auto"
        >
          {nicknames.subOpening}
        </motion.p>
      </div>

      {/* Category Toggle Pills */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
      >
        <button
          onClick={() => setActiveCategory("her_for_me")}
          className={`px-4 py-1.5 rounded-full text-xs font-serif-luxury tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
            activeCategory === "her_for_me"
              ? "bg-rose-500/30 text-white border border-rose-400/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              : "text-rose-200/60 hover:text-white"
          }`}
        >
          <Smile className="w-3.5 h-3.5 text-amber-300" />
          <span>What you called me</span>
        </button>

        <button
          onClick={() => setActiveCategory("me_for_her")}
          className={`px-4 py-1.5 rounded-full text-xs font-serif-luxury tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
            activeCategory === "me_for_her"
              ? "bg-purple-500/30 text-white border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              : "text-rose-200/60 hover:text-white"
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400" />
          <span>What I called you</span>
        </button>
      </motion.div>

      {/* Interactive Nickname Cards Grid */}
      <div className="w-full my-auto max-w-3xl">
        <AnimatePresence mode="wait">
          {activeCategory === "her_for_me" ? (
            <motion.div
              key="category-her-for-me"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            >
              {nicknames.herNicknamesForMe.map((item, idx) => {
                const isSelected = selectedNickname === item.id;
                
                // Specific animation styles per nickname
                let customAnimation = {};
                if (item.animType === "bounce") {
                  customAnimation = { y: [0, -6, 0, -3, 0] };
                } else if (item.animType === "soft") {
                  customAnimation = { scale: [1, 1.04, 1] };
                } else if (item.animType === "rotate") {
                  customAnimation = { rotate: [0, -3, 3, -1, 0] };
                } else if (item.animType === "glow") {
                  customAnimation = { opacity: [0.85, 1, 0.85] };
                }

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.6 }}
                    onClick={() => handleCardClick(item.id, 1 + idx * 0.1)}
                    className={`relative rounded-3xl p-6 glass-luxury cursor-pointer transition-all duration-300 border flex flex-col justify-between overflow-hidden group ${
                      isSelected
                        ? "bg-gradient-to-b from-[#220d30]/90 to-[#0e0618]/95 border-rose-400/50 shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(244,114,182,0.25)] scale-[1.02]"
                        : "bg-white/[0.04] border-white/10 hover:border-rose-300/30 hover:bg-white/[0.08]"
                    }`}
                  >
                    {/* Glowing Accent Radial */}
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none transition-opacity group-hover:opacity-30"
                      style={{
                        background: `radial-gradient(circle at center, ${item.accent} 0%, transparent 70%)`,
                      }}
                    />

                    <div>
                      {/* Top Label */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold border"
                          style={{
                            color: item.accent,
                            backgroundColor: `${item.accent}15`,
                            borderColor: `${item.accent}40`,
                          }}
                        >
                          You called me
                        </span>
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {/* Nickname Title with Unique Personality Animation */}
                      <motion.h3
                        animate={customAnimation}
                        transition={{
                          repeat: Infinity,
                          repeatDelay: 2.5,
                          duration: 1.2,
                          ease: "easeInOut",
                        }}
                        className="font-serif-luxury text-3xl sm:text-4xl text-rose-50 font-normal mb-2 text-glow-heading"
                      >
                        {item.name}
                      </motion.h3>

                      {/* Inside Joke / Context */}
                      <p className="font-sans-modern text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {item.context}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-rose-300/60 font-sans-modern">
                      <span>{isSelected ? "Our inside joke ✨" : "Tap for memory"}</span>
                      <span style={{ color: item.accent }}>❤️</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="category-me-for-her"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {nicknames.myNicknamesForHer.map((item, idx) => {
                const isSelected = selectedNickname === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * idx, duration: 0.6 }}
                    onClick={() => handleCardClick(item.id, 1.2 + idx * 0.1)}
                    className={`relative rounded-3xl p-7 glass-luxury cursor-pointer transition-all duration-300 border flex flex-col justify-between overflow-hidden group ${
                      isSelected
                        ? "bg-gradient-to-b from-[#240e34]/95 to-[#0b0414]/98 border-rose-400/50 shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(244,114,182,0.3)] scale-[1.02]"
                        : "bg-white/[0.04] border-white/10 hover:border-rose-300/30 hover:bg-white/[0.08]"
                    }`}
                  >
                    {/* Glowing Accent Radial */}
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
                      style={{
                        background: `radial-gradient(circle at center, ${item.accent} 0%, transparent 70%)`,
                      }}
                    />

                    <div>
                      {/* Top Label */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold border"
                          style={{
                            color: item.accent,
                            backgroundColor: `${item.accent}15`,
                            borderColor: `${item.accent}40`,
                          }}
                        >
                          I called you
                        </span>
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400" />
                      </div>

                      {/* Handwritten or Floating Animation */}
                      {item.animType === "handwritten" ? (
                        <motion.h3
                          initial={{ letterSpacing: "0.15em", filter: "blur(2px)" }}
                          animate={{ letterSpacing: "0.02em", filter: "blur(0px)" }}
                          transition={{ duration: 1.2 }}
                          className="font-serif-luxury text-4xl sm:text-5xl text-rose-50 font-normal mb-3 text-glow-heading"
                        >
                          {item.name}
                        </motion.h3>
                      ) : (
                        <motion.h3
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                          className="font-serif-luxury text-4xl sm:text-5xl text-purple-100 font-normal mb-3 text-glow-heading"
                        >
                          {item.name}
                        </motion.h3>
                      )}

                      <p className="font-sans-modern text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {item.context}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-rose-300/70 font-sans-modern">
                      <span>{isSelected ? "My only one ✨" : "Tap to relive"}</span>
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Emotional Sequenced Closing Narrative */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="w-full max-w-2xl text-center mt-6 p-5 sm:p-6 rounded-3xl glass-luxury border border-white/10 bg-gradient-to-b from-black/40 to-[#0e0618]/60 space-y-2"
      >
        <p className="font-serif-luxury italic text-rose-200/80 text-base sm:text-lg">
          &ldquo;{nicknames.closing.line1}&rdquo;
        </p>
        <p className="font-serif-luxury text-lg sm:text-xl text-rose-100 font-normal">
          &ldquo;{nicknames.closing.line2}&rdquo;
        </p>
        <p className="font-serif-luxury text-lg sm:text-2xl text-rose-50 font-medium text-glow-heading pt-1">
          &ldquo;{nicknames.closing.line3}&rdquo;
        </p>
      </motion.div>

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
            ← Childish Fights
          </button>
        ) : <div />}

        {onNextSection && (
          <button
            id="cta-nicknames-next-btn"
            onClick={onNextSection}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full glass-button text-xs sm:text-sm font-sans-modern tracking-wider uppercase text-rose-50 hover:text-white cursor-pointer shadow-[0_0_25px_rgba(244,114,182,0.3)]"
          >
            <span>Late Night Calls</span>
            <ArrowRight className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
