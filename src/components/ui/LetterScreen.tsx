"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

interface LetterScreenProps {
  onKeepGoing?: () => void;
}

export function LetterScreen({ onKeepGoing }: LetterScreenProps) {
  return (
    <motion.div
      key="letter-screen"
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 flex min-h-full w-full flex-col justify-between items-center px-4 py-6 sm:px-6 sm:py-8 md:py-10 max-w-xl mx-auto overflow-y-auto no-scrollbar"
    >
      {/* Top Header Label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex items-center space-x-2 text-rose-300/70 text-xs tracking-[0.25em] uppercase font-light mb-4 sm:mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-400/80 animate-pulse" />
        <span>From My Heart</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-400/80 animate-pulse" />
      </motion.div>

      {/* Main Luxury Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 my-auto glass-luxury shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(244,114,182,0.12)] border border-rose-200/20 bg-gradient-to-b from-white/[0.08] via-rose-950/[0.05] to-black/40 backdrop-blur-2xl"
      >
        {/* Subtle Decorative Golden Border Accent */}
        <div className="pointer-events-none absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border border-rose-300/15" />

        {/* Letter Text Content */}
        <div className="relative font-serif-luxury text-rose-50/95 leading-relaxed space-y-4 sm:space-y-5 text-base sm:text-lg md:text-xl font-light">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl sm:text-2xl font-normal text-rose-200/90 italic"
          >
            Hey...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            I know you&apos;re upset with me.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            And honestly, I don&apos;t want to make excuses.
            <br className="hidden sm:block" />
            {" "}I just want you to know that I&apos;m genuinely sorry.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            You mean a lot to me.
            <br />
            And sometimes I may not express it properly,
            <br className="hidden sm:block" />
            {" "}but I never want to be the reason for your sadness.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8 }}
          >
            I&apos;m not asking you to forget everything instantly.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.9 }}
            className="text-rose-100 font-normal pt-1"
          >
            I just want one chance to make things right.{" "}
            <span className="text-rose-400 inline-block animate-pulse">❤️</span>
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom Footer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center mt-6 sm:mt-8 pb-2"
      >
        <p className="font-serif-luxury italic text-rose-300/75 text-sm sm:text-base tracking-wide mb-3">
          There&apos;s more...
        </p>

        <motion.button
          id="cta-keep-going-btn"
          onClick={onKeepGoing}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full glass-button text-sm sm:text-base font-medium text-rose-50 tracking-wider overflow-hidden cursor-pointer shadow-[0_0_25px_rgba(244,114,182,0.3)]"
        >
          {/* Internal shimmer */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          <span className="relative font-sans-modern tracking-widest text-xs uppercase sm:text-sm">
            Begin our story
          </span>
          <ArrowRight className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
