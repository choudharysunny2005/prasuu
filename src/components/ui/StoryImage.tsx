"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Sparkles } from "lucide-react";
import { PhotoConfig } from "@/lib/photos";

interface StoryImageProps {
  photo: PhotoConfig;
  className?: string;
  priority?: boolean;
}

export function StoryImage({ photo, className = "", priority = false }: StoryImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/40 via-purple-950/30 to-black/60 border border-white/10 ${className}`}
    >
      {/* Real Image */}
      {!hasError && (
        <Image
          src={photo.src}
          alt={photo.title || "Our Memory"}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover object-center transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {/* Elegant Fallback Placeholder when image is not yet uploaded */}
      {(hasError || !isLoaded) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1b0d2a] via-[#10071c] to-[#06020c]">
          {/* Subtle glowing radial background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.15)_0%,transparent_70%)]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-400/30 flex items-center justify-center mb-3 text-rose-300 shadow-[0_0_20px_rgba(244,114,182,0.2)]">
              <Camera className="w-5 h-5" />
            </div>

            <span className="font-serif-luxury text-base sm:text-lg text-rose-100 font-normal tracking-wide">
              {photo.title}
            </span>

            {photo.caption && (
              <span className="font-sans-modern text-xs text-rose-300/70 font-light mt-1 max-w-[200px] leading-snug">
                {photo.caption}
              </span>
            )}

            {photo.dateOrTag && (
              <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-200 text-[10px] font-mono tracking-wider uppercase border border-rose-400/30">
                <Sparkles className="w-2.5 h-2.5" />
                {photo.dateOrTag}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Subtle glass reflection overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5" />
    </div>
  );
}
