"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { storyConfig } from "@/data/storyConfig";

interface Scene3LetterProps {
  onNext: () => void;
}

export default function Scene3Letter({ onNext }: Scene3LetterProps) {
  return (
    <motion.section
      key="scene-3-letter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, y: -24, filter: "blur(4px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-[92dvh] w-full flex flex-col items-center justify-start px-4 sm:px-6 py-8 sm:py-12 select-none overflow-y-auto scroll-smooth"
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
        {/* ========================================================================= */}
        {/* 1. HERO PHOTO ABOVE THE LOVE LETTER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: -1.5 }}
          whileHover={{ scale: 1.02, rotate: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xs sm:max-w-sm bg-[#FFFDF8] p-3.5 sm:p-4 rounded-2xl shadow-[0_15px_35px_-10px_rgba(43,27,23,0.2),0_0_1px_rgba(43,27,23,0.15)] border border-[#E8DFD5] cursor-pointer group"
        >
          {/* Vintage Washi Tape Top Center */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#F5EFE6]/90 border border-[#E8E0D8] rotate-1 rounded-xs shadow-xs pointer-events-none opacity-90 z-30 flex items-center justify-center">
            <span className="text-[10px] font-serif text-[#8E3B36]/70 uppercase tracking-widest font-semibold">Us 🤍</span>
          </div>

          {/* Photo Container */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-xl overflow-hidden border border-[#E8DFD5] bg-[#2B1B17]">
            <img
              src="/photos/letter-hero.jpg"
              alt="Ayn & Raga"
              className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Vignette & Warm Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Caption bar underneath photo inside frame */}
          <div className="mt-3 px-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F3A79A]" />
              <span className="font-handwriting text-lg sm:text-xl text-[#2B1B17] font-medium">
                My Whole Heart 🥹🤍
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#795548]/70 uppercase tracking-wider">
              <span>Chapter I</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. THE LOVE LETTER UNDER THE HERO PHOTO */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, rotateX: -25, scaleY: 0.8, y: 15 }}
          animate={{ opacity: 1, rotateX: 0, scaleY: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top center", perspective: 1200 }}
          className="relative w-full bg-[#FFFDF8] border border-[#E8DFD5] rounded-2xl sm:rounded-3xl p-7 sm:p-10 md:p-14 shadow-[0_20px_50px_-15px_rgba(43,27,23,0.15),0_0_1px_rgba(43,27,23,0.2)] letter-fold"
        >
          {/* Paper grain & faint notebook lines */}
          <div className="absolute inset-0 paper-grain rounded-2xl sm:rounded-3xl pointer-events-none" />
          <div className="absolute inset-0 notebook-lines opacity-35 rounded-2xl sm:rounded-3xl pointer-events-none" />

          {/* Paper fold line crease across center */}
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#2B1B17]/10 to-transparent pointer-events-none" />

          {/* Slight paper curl shadow along bottom */}
          <div className="absolute -bottom-2 left-6 right-6 h-4 bg-[#2B1B17]/10 blur-md rounded-full pointer-events-none" />

          {/* Header with Wax Seal */}
          <div className="relative z-10 flex items-start justify-between mb-8 pb-4 border-b border-[#E8E0D8]/60">
            <div>
              <p className="font-serif text-[11px] uppercase tracking-[0.25em] text-[#795548]/80 font-medium">
                Chapter I • The Letter
              </p>
              <h2 className="font-script text-4xl sm:text-5xl text-[#2B1B17] font-normal mt-1">
                {storyConfig.loveLetterTitle}
              </h2>
            </div>

            {/* Vintage Wax Seal Emblem */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#8E3B36] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_10px_rgba(43,27,23,0.25)] border border-[#752E2B] flex items-center justify-center transform -rotate-6">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-dashed border-[#D4AF37]/60 flex items-center justify-center">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFFDF8] fill-[#FFFDF8]" />
                </div>
              </div>
            </div>
          </div>

          {/* Love Letter Body Content */}
          <div className="relative z-10 space-y-4 sm:space-y-5 text-[#2B1B17] font-serif text-base sm:text-lg leading-[1.8] sm:leading-[1.85] font-light">
            {storyConfig.loveLetter.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + idx * 0.06 }}
                className="text-balance"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Handwritten Signature and Closing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative z-10 mt-8 pt-6 border-t border-[#E8E0D8]/60 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <p className="font-script text-3xl sm:text-4xl text-[#2B1B17] leading-tight">
                {storyConfig.loveLetterSignature}
              </p>
              <p className="font-handwriting text-xl sm:text-2xl text-[#8E3B36] font-medium mt-1">
                {storyConfig.loveLetterSignoff}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[#F3A79A]">
              <Heart className="w-4 h-4 fill-current animate-pulse" />
              <Heart className="w-3 h-3 fill-current" />
              <Heart className="w-2 h-2 fill-current" />
            </div>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3. TURN THE PAGE CTA BUTTON */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-2 mb-6 flex justify-center w-full"
        >
          <button
            type="button"
            onClick={onNext}
            aria-label="Turn the page to our memories"
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full border border-[#F3A79A] bg-[#FFFDF8]/90 hover:bg-[#FFFDF8] text-[#2B1B17] font-serif text-xs sm:text-sm uppercase tracking-[0.22em] shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(243,167,154,0.45)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-300 touch-target focus:outline-none focus:ring-2 focus:ring-[#F3A79A]"
          >
            <span>TURN THE PAGE</span>
            <ArrowRight className="w-4 h-4 text-[#F3A79A] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
