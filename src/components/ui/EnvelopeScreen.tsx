"use client";

import React from "react";
import { motion } from "framer-motion";
import { MailOpen, Heart } from "lucide-react";

interface EnvelopeScreenProps {
  onOpenEnvelope?: () => void;
}

export function EnvelopeScreen({ onOpenEnvelope }: EnvelopeScreenProps) {
  return (
    <motion.div
      key="envelope-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex min-h-full w-full flex-col justify-between px-6 py-10 md:py-14 sm:px-10 max-w-2xl mx-auto"
    >
      {/* Top subtle hint */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex items-center justify-center space-x-2 text-rose-300/60 text-xs tracking-[0.3em] uppercase font-light"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
        <span>For You</span>
      </motion.div>

      {/* 3D Envelope Space Reservation */}
      <div className="flex-1 flex items-center justify-center pointer-events-none" />

      {/* Bottom Envelope Content */}
      <div className="flex flex-col items-center text-center pb-8 sm:pb-12">
        {/* Text: "I have something to say..." */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-rose-100/90 font-normal tracking-wide mb-6 text-glow-subtle"
        >
          I have something to say...
        </motion.p>

        {/* CTA: "Open it ❤️" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            id="cta-open-envelope-btn"
            onClick={onOpenEnvelope}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 sm:px-11 sm:py-4.5 rounded-full glass-button text-sm sm:text-base font-medium text-rose-50 tracking-wider overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(244,63,94,0.35)]"
          >
            {/* Shimmer light effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-rose-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <MailOpen className="w-4 h-4 text-rose-300 transition-transform duration-300 group-hover:-rotate-12" />
            <span className="relative font-sans-modern tracking-widest text-xs uppercase sm:text-sm font-semibold">
              Open it
            </span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-400 inline-block animate-pulse" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
