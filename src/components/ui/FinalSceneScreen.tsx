"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Sparkles, Phone, Compass } from "lucide-react";
import { playVictoryFanfare, playChimeTone } from "@/lib/audio";
import { STORY_DATA } from "@/lib/storyData";

interface FinalSceneScreenProps {
  onRestart?: () => void;
}

export function FinalSceneScreen({ onRestart }: FinalSceneScreenProps) {
  const [responseModal, setResponseModal] = useState<"yes" | "talk" | null>(null);
  const { finalMessage } = STORY_DATA;

  const handleYes = () => {
    playVictoryFanfare();
    setResponseModal("yes");
  };

  const handleTalk = () => {
    playChimeTone();
    setResponseModal("talk");
  };

  return (
    <div className="relative z-20 flex min-h-full w-full flex-col justify-between items-center px-4 py-6 sm:px-8 sm:py-10 max-w-xl mx-auto overflow-y-auto no-scrollbar pointer-events-none select-none">
      {/* Top Ambient Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="flex items-center space-x-2 text-rose-300/60 text-xs tracking-[0.3em] uppercase font-light"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        <span>From My Heart</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
      </motion.div>

      {/* 3D Rose Space Reservation & Narrative */}
      <div className="my-auto pt-36 sm:pt-44 pb-4 flex flex-col items-center text-center w-full">
        {/* Line 1 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-luxury text-xl sm:text-2xl text-rose-200/85 font-light tracking-wide mb-2"
        >
          {finalMessage.lines[0]}
        </motion.p>

        {/* Line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-luxury text-xl sm:text-2xl text-rose-200/85 font-light tracking-wide mb-2"
        >
          {finalMessage.lines[1]}
        </motion.p>

        {/* Line 3 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-luxury text-xl sm:text-2xl text-rose-100 font-normal tracking-wide mb-2"
        >
          {finalMessage.lines[2]}
        </motion.p>

        {/* Line 4 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.0, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-luxury text-2xl sm:text-3xl text-rose-50 font-normal tracking-wide text-glow-subtle mt-1 mb-4"
        >
          {finalMessage.lines[3]}
        </motion.p>

        {/* The 4 "I miss..." lines sequenced */}
        <div className="space-y-1.5 font-serif-luxury text-lg sm:text-xl text-rose-200/80 italic mb-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 6.2, duration: 0.8 }}
          >
            &ldquo;{finalMessage.lines[4]}&rdquo;
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 7.2, duration: 0.8 }}
          >
            &ldquo;{finalMessage.lines[5]}&rdquo;
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 8.2, duration: 0.8 }}
          >
            &ldquo;{finalMessage.lines[6]}&rdquo;
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 9.2, duration: 0.8 }}
          >
            &ldquo;{finalMessage.lines[7]}&rdquo;
          </motion.p>
        </div>

        {/* Closing: "I miss us." */}
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 10.4, duration: 1.0 }}
          className="font-serif-luxury text-3xl sm:text-4xl text-rose-100 font-medium text-glow-heading mb-6"
        >
          {finalMessage.lines[8]}
        </motion.p>

        {/* Final Question: "Can we find our way back to the little things?" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 11.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2"
        >
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight text-glow-heading mb-6 leading-snug">
            {finalMessage.question}
          </h2>
        </motion.div>

        {/* Dual Functional Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 13.0, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md pt-2"
        >
          {/* Button 1: "Come talk to me ❤️" */}
          <motion.button
            id="cta-final-talk-btn"
            onClick={handleTalk}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full glass-button text-sm sm:text-base font-medium text-rose-50 tracking-wider overflow-hidden cursor-pointer shadow-[0_0_35px_rgba(244,63,94,0.4)] border border-rose-300/40"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <Heart className="w-4 h-4 fill-rose-500 text-rose-400 group-hover:scale-125 transition-transform" />
            <span className="relative font-sans-modern tracking-widest text-xs uppercase sm:text-sm font-semibold">
              {finalMessage.cta}
            </span>
          </motion.button>

          {/* Button 2: "Yes ❤️" */}
          <motion.button
            id="cta-final-yes-btn"
            onClick={handleYes}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full glass-luxury text-sm sm:text-base font-medium text-rose-100 tracking-wider overflow-hidden cursor-pointer hover:border-rose-300/50 hover:bg-white/[0.08] transition-all"
          >
            <Compass className="w-4 h-4 text-rose-300 group-hover:rotate-45 transition-transform" />
            <span className="relative font-sans-modern tracking-widest text-xs uppercase sm:text-sm font-semibold">
              Yes ❤️
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Response Modals */}
      <AnimatePresence>
        {responseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg"
            onClick={() => setResponseModal(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl p-7 sm:p-9 glass-luxury border border-rose-300/40 bg-gradient-to-b from-[#220d36]/95 via-[#12071f]/95 to-[#05020a]/98 text-center shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_60px_rgba(244,63,94,0.35)]"
            >
              {responseModal === "talk" ? (
                <>
                  <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-400/50 flex items-center justify-center mx-auto mb-4 text-rose-300 shadow-[0_0_30px_rgba(244,63,94,0.4)]">
                    <MessageCircle className="w-7 h-7 text-rose-300 animate-pulse" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-rose-50 font-normal mb-3 text-glow-heading">
                    I&apos;m right here, Prasuu ❤️
                  </h3>
                  <p className="font-serif-luxury text-base sm:text-lg text-rose-100/90 leading-relaxed font-light mb-6">
                    I will always listen to you. Whatever you feel, whatever made you quiet, we can talk through it together. I love you so much.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() => setResponseModal(null)}
                      className="w-full py-3.5 rounded-full glass-button text-xs font-sans-modern uppercase tracking-widest text-rose-100 font-semibold cursor-pointer"
                    >
                      I&apos;m ready to talk ❤️
                    </button>
                    {onRestart && (
                      <button
                        onClick={onRestart}
                        className="text-xs text-rose-300/60 hover:text-rose-200 transition-colors pt-2 cursor-pointer font-sans-modern"
                      >
                        Replay our story ↺
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-400/50 flex items-center justify-center mx-auto mb-4 text-pink-300 shadow-[0_0_30px_rgba(236,72,153,0.4)]">
                    <Heart className="w-7 h-7 fill-rose-500 text-rose-400 animate-bounce" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-rose-50 font-normal mb-3 text-glow-heading">
                    Let&apos;s make new memories ❤️
                  </h3>
                  <p className="font-serif-luxury text-base sm:text-lg text-rose-100/90 leading-relaxed font-light mb-6">
                    Back to the bus rides, the silly laughs, the late night calls, and us being happy together again.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() => setResponseModal(null)}
                      className="w-full py-3.5 rounded-full glass-button text-xs font-sans-modern uppercase tracking-widest text-rose-100 font-semibold cursor-pointer"
                    >
                      Our Story Continues ✨
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div />
    </div>
  );
}
