"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface LandingScreenProps {
  onEnter: () => void;
  isLeaving: boolean;
}

export function LandingScreen({ onEnter, isLeaving }: LandingScreenProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked || isLeaving) return;
    setClicked(true);
    onEnter();
  };

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.div
          key="landing-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.96,
            filter: "blur(8px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="relative z-10 flex min-h-full w-full flex-col justify-between px-6 py-10 md:py-14 sm:px-10 max-w-2xl mx-auto"
        >
          {/* Top Subtle Brand / Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            className="flex items-center justify-center space-x-2 text-rose-200/50 text-xs tracking-[0.3em] uppercase font-light"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400/70 animate-pulse" />
            <span>A Special Note</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-400/70 animate-pulse" />
          </motion.div>

          {/* Center 3D Space reservation & Title Area */}
          <div className="flex flex-col items-center text-center my-auto pt-44 sm:pt-48 pb-10">
            {/* Small text: "Hey you..." */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-rose-300/80 font-serif-luxury italic text-xl sm:text-2xl tracking-wide mb-3"
            >
              Hey you...
            </motion.p>

            {/* Main heading: "I made something for you." */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-glow-heading bg-gradient-to-b from-white via-rose-50/95 to-rose-200/80 bg-clip-text text-transparent leading-[1.2] max-w-lg"
            >
              I made something for you.
            </motion.h1>

            {/* Subtext: "Just give me a minute. ❤️" */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-sm sm:text-base font-light text-slate-400 tracking-wide flex items-center justify-center gap-1.5"
            >
              Just give me a minute. <span className="text-rose-400 inline-block animate-pulse">❤️</span>
            </motion.p>
          </div>

          {/* Bottom CTA Area: "Enter →" */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center pb-4 sm:pb-8"
          >
            <motion.button
              id="cta-enter-btn"
              onClick={handleClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full glass-button text-sm sm:text-base font-medium text-rose-50 tracking-wider overflow-hidden cursor-pointer"
            >
              {/* Internal subtle light shine */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <span className="relative font-sans-modern tracking-widest text-xs uppercase sm:text-sm">
                Enter
              </span>
              <ArrowRight className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
