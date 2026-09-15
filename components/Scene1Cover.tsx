"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { storyConfig } from "@/data/storyConfig";

interface Scene1CoverProps {
  onBegin: () => void;
}

export default function Scene1Cover({ onBegin }: Scene1CoverProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.section
      key="scene-1-cover"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24, filter: "blur(4px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 min-h-[92dvh] flex flex-col items-center justify-center px-6 py-12 text-center select-none"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Top small spaced editorial subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-[1px] bg-[#D9B6A9]/60" />
          <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#795548]/90 font-medium">
            {storyConfig.introSubtitle}
          </p>
          <span className="w-8 h-[1px] bg-[#D9B6A9]/60" />
        </motion.div>

        {/* Large romantic cursive script heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#2B1B17] font-normal leading-[1.18] tracking-wide mb-6 px-2 text-balance"
          style={{ textShadow: "0 2px 20px rgba(243, 167, 154, 0.2)" }}
        >
          {storyConfig.introTitle}
        </motion.h1>

        {/* Delicate decorative botanical ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center justify-center gap-2 mb-6 text-[#F3A79A]/80"
        >
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D9B6A9]" />
          <Heart className="w-3.5 h-3.5 fill-[#F3A79A]/40 text-[#F3A79A] animate-pulse" />
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D9B6A9]" />
        </motion.div>

        {/* Relationship Date Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="font-serif text-sm sm:text-base uppercase tracking-[0.25em] text-[#795548] font-light mb-12 sm:mb-16"
        >
          {storyConfig.relationshipDate} — FOREVER
        </motion.p>

        {/* Centered CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
        >
          <motion.button
            ref={buttonRef}
            type="button"
            onClick={onBegin}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            aria-label="Begin our romantic love story"
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full border border-[#F3A79A] bg-[#FFFDF8]/80 hover:bg-[#FFFDF8] backdrop-blur-sm text-[#2B1B17] font-serif text-xs sm:text-sm uppercase tracking-[0.22em] shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(243,167,154,0.45)] focus:outline-none focus:ring-2 focus:ring-[#F3A79A]"
          >
            <span>{storyConfig.introCta}</span>
            <span className="text-[#F3A79A] transition-transform duration-300 group-hover:scale-125">
              ♥
            </span>
            {/* Subtle gentle highlight glow behind button */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F3A79A]/10 via-[#FFFDF8]/30 to-[#F3A79A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
