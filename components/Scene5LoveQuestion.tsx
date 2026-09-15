"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { storyConfig } from "@/data/storyConfig";
import confetti from "canvas-confetti";

interface Scene5LoveQuestionProps {
  onYes: () => void;
}

const playfulNoMessages = [
  "NO",
  "Nice try 😌",
  "You can't escape this one 🤭",
  "Are you sure? 🥺",
  "Oops, slipped away! 😜",
  "Try the left button 🤍",
  "Not an option, my love! 🥰",
];

export default function Scene5LoveQuestion({ onYes }: Scene5LoveQuestionProps) {
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [noClickCount, setNoClickCount] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [noShaking, setNoShaking] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const triggerLoveExplosion = () => {
    try {
      // Multiple bursts of pink, rose, gold, and white confetti
      const count = 50;
      confetti({
        particleCount: count,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#F3A79A", "#D9B6A9", "#FFFDF8", "#E5989B", "#D4AF37"],
        scalar: 1.2,
      });
      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#F3A79A", "#E5989B", "#FFFDF8"],
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#F3A79A", "#E5989B", "#FFFDF8"],
        });
      }, 250);
    } catch {
      // Fallback if confetti fails
    }
  };

  const handleYes = () => {
    if (isSuccess) return;
    setIsSuccess(true);
    triggerLoveExplosion();
    setTimeout(() => {
      onYes();
    }, 1900);
  };

  // Playfully move the NO button within strictly clamped container bounds
  const evadeNoButton = () => {
    setNoShaking(true);
    setTimeout(() => setNoShaking(false), 350);

    setNoClickCount((prev) => prev + 1);

    // Bounded coordinates so it never overflows screen or card
    // Max displacement is safely clamped
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxX = isMobile ? 65 : 120;
    const maxY = isMobile ? 45 : 70;

    let newX = (Math.random() * 2 - 1) * maxX;
    let newY = (Math.random() * 2 - 1) * maxY;

    // Ensure it noticeably shifts position each time
    if (Math.abs(newX - noButtonPos.x) < 30) {
      newX = newX >= 0 ? newX + 35 : newX - 35;
    }

    setNoButtonPos({ x: newX, y: newY });
  };

  const currentNoLabel =
    playfulNoMessages[noClickCount % playfulNoMessages.length];

  return (
    <motion.section
      key="scene-5-question"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(3px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 min-h-[92dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 select-none"
    >
      <div
        ref={containerRef}
        className="w-full max-w-lg mx-auto bg-[#FFFDF8] border border-[#E8E0D8] rounded-3xl p-7 sm:p-10 text-center shadow-[0_16px_45px_-12px_rgba(43,27,23,0.1)] relative overflow-hidden"
      >
        {/* Subtle notebook lines */}
        <div className="absolute inset-0 notebook-lines opacity-40 pointer-events-none" />

        {/* Small top pre-header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBF8F3] border border-[#E8E0D8] text-[11px] font-serif uppercase tracking-[0.25em] text-[#795548] mb-6 shadow-xs"
        >
          <Sparkles className="w-3 h-3 text-[#F3A79A]" />
          <span>Chapter III • The Final Question</span>
        </motion.div>

        {/* Question prompt */}
        <p className="font-serif text-sm sm:text-base uppercase tracking-[0.2em] text-[#795548] mb-2 font-medium">
          {storyConfig.finalQuestionPrompt}
        </p>

        {/* Big emotional question heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2B1B17] font-normal leading-tight mb-8">
          {storyConfig.finalQuestionHeading}
        </h2>

        {/* Success Announcement if YES was tapped */}
        <AnimatePresence>
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 flex flex-col items-center justify-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-[#F3A79A]/20 flex items-center justify-center text-[#F3A79A] animate-bounce">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2B1B17] font-medium">
                {storyConfig.finalQuestionSuccessMsg}
              </h3>
              <p className="font-serif text-xs uppercase tracking-widest text-[#795548]">
                Opening our forever chapter...
              </p>
            </motion.div>
          ) : (
            /* Interactive Buttons Playground */
            <div className="relative min-h-[160px] sm:min-h-[180px] flex items-center justify-center">
              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 w-full">
                {/* YES BUTTON (Always accessible, welcoming, slightly pulsing) */}
                <button
                  type="button"
                  onClick={handleYes}
                  aria-label="Yes, I love you"
                  className="group relative px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#F3A79A] to-[#E5989B] text-[#FFFDF8] font-serif text-sm sm:text-base font-medium tracking-[0.18em] shadow-[0_6px_20px_rgba(243,167,154,0.45)] hover:shadow-[0_8px_25px_rgba(243,167,154,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 touch-target flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#F3A79A]"
                >
                  <span>{storyConfig.finalQuestionYesText}</span>
                  <Heart className="w-4 h-4 fill-[#FFFDF8] group-hover:scale-125 transition-transform" />
                </button>

                {/* NO BUTTON (Playfully evades interaction, strictly inside card) */}
                <motion.div
                  animate={{
                    x: noButtonPos.x,
                    y: noButtonPos.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 24,
                  }}
                  className="relative z-10"
                >
                  <button
                    type="button"
                    onMouseEnter={evadeNoButton}
                    onClick={evadeNoButton}
                    onTouchStart={evadeNoButton}
                    aria-label="No button (playfully moves away)"
                    className={`px-6 sm:px-8 py-3.5 rounded-full border border-[#E8E0D8] bg-[#FBF8F3] text-[#795548] font-serif text-xs sm:text-sm tracking-[0.15em] hover:bg-[#FFFDF8] transition-colors duration-200 touch-target select-none shadow-xs ${
                      noShaking ? "animate-shake" : ""
                    }`}
                  >
                    {currentNoLabel}
                  </button>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Small warm footer hint */}
        {!isSuccess && (
          <p className="font-serif text-xs text-[#795548]/60 mt-4 tracking-wide">
            (P.S. There is only one real truth in this universe 🤍)
          </p>
        )}
      </div>
    </motion.section>
  );
}
