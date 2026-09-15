"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Camera, RotateCcw } from "lucide-react";
import { storyConfig } from "@/data/storyConfig";

interface Scene6EndingProps {
  onReplay?: () => void;
}

export default function Scene6Ending({ onReplay }: Scene6EndingProps) {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <motion.section
      key="scene-6-ending"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-[95dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-14 sm:py-20 text-center select-none"
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Top small celebratory badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8] border border-[#E8E0D8] text-[11px] font-serif uppercase tracking-[0.3em] text-[#795548] mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F3A79A]" />
          <span>Our Forever Chapter</span>
          <Sparkles className="w-3.5 h-3.5 text-[#F3A79A]" />
        </motion.div>

        {/* Main Birthday Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2B1B17] font-normal tracking-wide uppercase mb-8 leading-tight"
          style={{ textShadow: "0 2px 25px rgba(243, 167, 154, 0.25)" }}
        >
          {storyConfig.finalBirthdayHeading}
        </motion.h1>

        {/* Hero Photo in Premium Editorial Polaroid Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-[#FFFDF8] border border-[#E8DFD5] p-4 sm:p-5 pb-8 sm:pb-10 rounded-2xl shadow-[0_20px_60px_-15px_rgba(43,27,23,0.18)] mb-10 transform -rotate-1 hover:rotate-0 transition-transform duration-700"
        >
          {/* Subtle tape accent */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-7 bg-[#F5EFE6]/90 border border-[#E8E0D8] rounded-sm -rotate-1 shadow-xs pointer-events-none" />

          {/* Photo container with slow Ken Burns effect */}
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#F5EFE6] border border-[#E8E0D8]/80">
            {!imageError ? (
              <img
                src={storyConfig.finalPhoto}
                alt="Birthday Portrait"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top ken-burns"
              />
            ) : (
              <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FFFDF8] to-[#F5EFE6]">
                <div className="w-14 h-14 rounded-full bg-[#FFFDF8] border border-[#D9B6A9] flex items-center justify-center mb-4 shadow-sm">
                  <Camera className="w-7 h-7 text-[#795548]" />
                </div>
                <p className="font-handwriting text-2xl text-[#2B1B17] font-medium">
                  {storyConfig.recipientName}
                </p>
                <p className="font-serif text-xs text-[#795548] mt-2 max-w-xs">
                  Place your favorite portrait photo at:
                  <br />
                  <code className="font-mono text-[11px] text-[#2B1B17] bg-[#FFFDF8] px-2 py-0.5 rounded border border-[#E8E0D8] mt-1 inline-block">
                    {storyConfig.finalPhoto}
                  </code>
                </p>
              </div>
            )}

            {/* Warm vintage light leak overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F3A79A]/10 to-transparent pointer-events-none" />
          </div>

          {/* Polaroid handwritten caption */}
          <div className="mt-4 text-center">
            <p className="font-handwriting text-2xl sm:text-3xl text-[#2B1B17]">
              Forever My Queen
            </p>
            <p className="font-serif text-[11px] uppercase tracking-[0.25em] text-[#795548]/80 mt-1">
              {storyConfig.relationshipDate} — Forever
            </p>
          </div>
        </motion.div>

        {/* The Final Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.9 }}
          className="max-w-xl mx-auto mb-8 px-4"
        >
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#2B1B17] italic font-light leading-snug sm:leading-tight">
            &ldquo;{storyConfig.finalQuote}&rdquo;
          </p>
        </motion.div>

        {/* Birthday Closing Note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="max-w-lg mx-auto mb-6 px-4"
        >
          <p className="font-serif text-base sm:text-lg text-[#795548] leading-relaxed font-light whitespace-pre-line">
            {storyConfig.finalClosingNote}
          </p>
        </motion.div>

        {/* Closing whisper */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="font-serif text-xs sm:text-sm uppercase tracking-[0.25em] text-[#795548]/70 mb-4"
        >
          {storyConfig.finalWhisper}
        </motion.p>

        {/* Centered Pulsing Heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 1.5 }}
          className="text-[#F3A79A] text-2xl mb-12"
        >
          <Heart className="w-6 h-6 fill-[#F3A79A] animate-pulse mx-auto" />
        </motion.div>

        {/* Optional Replay Button to relive the story */}
        {onReplay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            <button
              type="button"
              onClick={onReplay}
              aria-label="Relive the story from the beginning"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E8E0D8] bg-[#FFFDF8]/70 hover:bg-[#FFFDF8] text-[#795548] hover:text-[#2B1B17] text-xs font-serif uppercase tracking-widest transition-all duration-300 touch-target focus:outline-none focus:ring-2 focus:ring-[#F3A79A]"
            >
              <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform" />
              <span>Relive Our Story</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
