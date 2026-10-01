"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicLightBurstProps {
  active: boolean;
}

export function CinematicLightBurst({ active }: CinematicLightBurstProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.85, 0.4, 0],
            scale: [0.8, 1.3, 1.8, 2.2],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.8,
            times: [0, 0.35, 0.7, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden"
        >
          {/* Central soft warm white & pink burst */}
          <div className="w-[120vw] h-[120vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,240,245,0.7)_0%,rgba(244,114,182,0.35)_40%,rgba(168,85,247,0.15)_70%,transparent_100%)] blur-2xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
