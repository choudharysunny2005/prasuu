"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Heart, MessageCircle, Laugh, Star } from "lucide-react";
import { MEMORIES_DATA, MemoryItem } from "@/lib/memories";

interface UniverseScreenProps {
  selectedMemory: MemoryItem | null;
  onSelectMemory: (memory: MemoryItem | null) => void;
  onNextSection?: () => void;
}

export function UniverseScreen({
  selectedMemory,
  onSelectMemory,
  onNextSection,
}: UniverseScreenProps) {
  const getIcon = (type: string, className = "w-5 h-5") => {
    switch (type) {
      case "chat":
        return <MessageCircle className={className} />;
      case "laugh":
        return <Laugh className={className} />;
      case "heart":
        return <Heart className={className} />;
      case "star":
        return <Star className={className} />;
      case "sparkles":
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div className="relative z-20 flex min-h-full w-full flex-col justify-between p-4 sm:p-6 md:p-8 pointer-events-none">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex flex-col items-center text-center max-w-lg mx-auto pt-2"
      >
        <div className="flex items-center space-x-2 text-rose-300/70 text-xs tracking-[0.3em] uppercase font-light mb-1">
          <Sparkles className="w-3.5 h-3.5 text-rose-400/90 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Constellation of us</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-400/90 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-rose-100 font-normal tracking-wide text-glow-heading">
          Our Little Universe
        </h2>
        <p className="font-sans-modern text-xs sm:text-sm text-rose-200/60 font-light mt-1 tracking-wide">
          Tap each floating star or card below to explore our story ✨
        </p>
      </motion.div>

      {/* Bottom Area: Quick Nav Star Pills + Next Section Button */}
      <div className="flex flex-col items-center gap-3 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pointer-events-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-xl mx-auto"
        >
          {MEMORIES_DATA.map((mem, idx) => {
            const isSelected = selectedMemory?.id === mem.id;
            return (
              <button
                key={mem.id}
                onClick={() => onSelectMemory(isSelected ? null : mem)}
                className={`group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-md cursor-pointer ${
                  isSelected
                    ? "bg-rose-500/30 border border-rose-400/60 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] scale-105"
                    : "bg-white/[0.06] border border-white/10 text-rose-200/80 hover:bg-white/[0.12] hover:border-rose-300/40"
                }`}
              >
                <span style={{ color: mem.accentColor }}>{getIcon(mem.iconType, "w-3.5 h-3.5")}</span>
                <span className="hidden sm:inline font-serif-luxury tracking-wide">
                  {idx + 1}. {mem.title.length > 18 ? mem.title.slice(0, 18) + "..." : mem.title}
                </span>
                <span className="sm:hidden font-mono text-[10px]">#{idx + 1}</span>
              </button>
            );
          })}
        </motion.div>

        {onNextSection && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="pointer-events-auto"
          >
            <button
              onClick={onNextSection}
              className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full glass-button text-xs sm:text-sm font-sans-modern tracking-wider uppercase text-rose-100 hover:text-white cursor-pointer shadow-[0_0_20px_rgba(244,114,182,0.25)]"
            >
              <span>What I Love About You</span>
              <span className="text-rose-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Expanded Memory Modal / Card */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            key="memory-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
            onClick={() => onSelectMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 md:p-9 glass-luxury border border-rose-300/30 bg-gradient-to-b from-[#180e29]/95 via-[#0e071a]/95 to-[#05020a]/98 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(244,114,182,0.2)]"
            >
              {/* Close Button */}
              <button
                onClick={() => onSelectMemory(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-rose-200 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Tag & Icon */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="p-2.5 rounded-2xl bg-white/10 flex items-center justify-center shadow-inner"
                  style={{ color: selectedMemory.accentColor }}
                >
                  {getIcon(selectedMemory.iconType, "w-5 h-5")}
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-[11px] uppercase tracking-widest font-semibold"
                    style={{ color: selectedMemory.accentColor }}
                  >
                    {selectedMemory.dateTag}
                  </span>
                  <span className="text-xs text-rose-300/60 font-serif-luxury italic">
                    {selectedMemory.subtitle}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-rose-50 font-normal leading-tight mb-4 text-glow-subtle">
                {selectedMemory.title}
              </h3>

              {/* Story Content */}
              <div className="font-serif-luxury text-base sm:text-lg text-rose-100/90 leading-relaxed font-light space-y-3 mb-6">
                <p>{selectedMemory.content}</p>
              </div>

              {/* Action */}
              <div className="flex justify-end items-center pt-2 border-t border-white/10">
                <button
                  onClick={() => onSelectMemory(null)}
                  className="px-5 py-2 rounded-full glass-button text-xs font-sans-modern uppercase tracking-wider text-rose-200 hover:text-white cursor-pointer"
                >
                  Return to Universe ✨
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
