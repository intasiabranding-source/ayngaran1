"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Camera, X, Sparkles } from "lucide-react";
import { storyConfig, MemoryItem } from "@/data/storyConfig";

interface Scene4PhotoboothProps {
  onNext: () => void;
}

export default function Scene4Photobooth({ onNext }: Scene4PhotoboothProps) {
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <motion.section
      key="scene-4-photobooth"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24, filter: "blur(3px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 min-h-[92dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-10 select-none"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF8] border border-[#E8E0D8] text-[11px] font-serif uppercase tracking-[0.25em] text-[#795548] mb-3 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#F3A79A]" />
            <span>Chapter II • Our Memories</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2B1B17] font-normal tracking-tight mb-2">
            {storyConfig.memoriesTitle}
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#795548] italic font-light max-w-md mx-auto">
            {storyConfig.memoriesSubtitle}
          </p>
        </div>

        {/* 16 Blank Photo Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-5 w-full mb-10">
          {storyConfig.memories.map((memory) => {
            const hasError = imageErrors[memory.id];
            const rotation = memory.rotation ?? 0;

            return (
              <motion.div
                key={memory.id}
                whileHover={{
                  scale: 1.04,
                  rotate: 0,
                  y: -4,
                  transition: { duration: 0.25 },
                }}
                whileTap={{ scale: 0.97 }}
                style={{ transform: `rotate(${rotation}deg)` }}
                onClick={() => setActiveMemory(memory)}
                className="group relative cursor-pointer bg-[#FFFDF8] border border-[#E8E0D8] p-2.5 sm:p-3 rounded-2xl shadow-polaroid hover:shadow-[0_12px_28px_-6px_rgba(43,27,23,0.18)] transition-all duration-300"
              >
                {/* Minimal Washi Tape Accent */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-4 sm:h-5 bg-[#F5EFE6]/90 border border-[#E8E0D8]/80 backdrop-blur-sm -rotate-2 rounded-xs shadow-xs pointer-events-none opacity-80 z-10" />

                {/* Blank Photo Frame Area - NO text/detail content below */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F5EFE6] border border-[#E8E0D8]/60 flex items-center justify-center">
                  {!hasError ? (
                    <img
                      src={memory.image}
                      alt={`Photo ${memory.id}`}
                      onError={() => handleImageError(memory.id)}
                      style={{ objectPosition: memory.objectPosition || "center top" }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    /* Minimal Blank Photo Placeholder */
                    <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FBF8F3] to-[#F5EFE6]">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF8] border border-[#D9B6A9] flex items-center justify-center mb-1.5 shadow-xs group-hover:border-[#F3A79A] transition-colors">
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[#795548] group-hover:text-[#F3A79A] transition-colors" />
                      </div>
                      <span className="font-serif text-xs text-[#795548]/80 font-medium">
                        Photo #{memory.id}
                      </span>
                    </div>
                  )}

                  {/* Soft light hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F3A79A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal preview when clicking a photo */}
        <AnimatePresence>
          {activeMemory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveMemory(null)}
                className="absolute inset-0 bg-[#2B1B17]/40 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative z-10 w-full max-w-sm sm:max-w-md bg-[#FFFDF8] border border-[#E8E0D8] p-4 sm:p-5 rounded-2xl shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setActiveMemory(null)}
                  aria-label="Close photo preview"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFFDF8] border border-[#E8E0D8] text-[#795548] hover:text-[#2B1B17] flex items-center justify-center transition-colors shadow-xs z-20"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F5EFE6] border border-[#E8E0D8]">
                  {!imageErrors[activeMemory.id] ? (
                    <img
                      src={activeMemory.image}
                      alt={`Photo ${activeMemory.id}`}
                      style={{ objectPosition: activeMemory.objectPosition || "center top" }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-[#FBF8F3]">
                      <Camera className="w-10 h-10 text-[#795548] mb-3" />
                      <p className="font-serif text-lg text-[#2B1B17] font-medium">
                        Photo #{activeMemory.id}
                      </p>
                      <p className="font-mono text-xs text-[#795548]/70 mt-2 bg-[#FFFDF8] px-2.5 py-1 rounded border border-[#E8E0D8]">
                        {activeMemory.image}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* CTA to Next Scene */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            type="button"
            onClick={onNext}
            aria-label="Proceed to the final question"
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full border border-[#F3A79A] bg-[#FFFDF8]/90 hover:bg-[#FFFDF8] text-[#2B1B17] font-serif text-xs sm:text-sm uppercase tracking-[0.22em] shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(243,167,154,0.45)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-300 touch-target focus:outline-none focus:ring-2 focus:ring-[#F3A79A]"
          >
            <span>ONE LAST QUESTION</span>
            <ArrowRight className="w-4 h-4 text-[#F3A79A] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
