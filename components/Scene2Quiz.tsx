"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CheckCircle2, Sparkles } from "lucide-react";
import { storyConfig } from "@/data/storyConfig";
import confetti from "canvas-confetti";

interface Scene2QuizProps {
  onComplete: () => void;
}

export default function Scene2Quiz({ onComplete }: Scene2QuizProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);

  const currentQuestion = storyConfig.questions[currentIdx];
  const totalQuestions = storyConfig.questions.length;

  const triggerHeartConfetti = () => {
    try {
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#F3A79A", "#D9B6A9", "#FFFDF8", "#E5989B"],
        shapes: ["circle"],
        ticks: 160,
        gravity: 0.8,
        scalar: 1.1,
      });
    } catch {
      // Graceful fallback if confetti unavailable
    }
  };

  const handleSelectOption = (option: string) => {
    if (isCorrect === true || isFinishing) return; // Prevent spamming during transition

    const isAnswerCorrect = Array.isArray(currentQuestion.correctAnswer)
      ? currentQuestion.correctAnswer.includes(option)
      : option === currentQuestion.correctAnswer;

    if (isAnswerCorrect) {
      setIsCorrect(true);
      setFeedbackMessage(
        currentQuestion.successFeedback || "That's right, my love. 🤍"
      );
      triggerHeartConfetti();

      // After 1.4s, advance to next question or complete quiz
      setTimeout(() => {
        if (currentIdx + 1 < totalQuestions) {
          setCurrentIdx((prev) => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
          setFeedbackMessage("");
        } else {
          // Finished all questions!
          setIsFinishing(true);
          setFeedbackMessage("You remembered... 🥹🤍");
          setTimeout(() => {
            onComplete();
          }, 1800);
        }
      }, 1300);
    } else {
      // Incorrect answer
      setIsCorrect(false);
      setIsShaking(true);
      setFeedbackMessage(
        currentQuestion.wrongFeedback || "Not quite... try again, love 🤍"
      );

      // Reset shake after animation completes
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  const progressLabel = `0${currentIdx + 1} / 0${totalQuestions}`;

  return (
    <motion.section
      key="scene-2-quiz"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: "blur(3px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 min-h-[92dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 select-none"
    >
      <div className="w-full max-w-xl mx-auto">
        {/* Progress and Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF8] border border-[#E8E0D8] text-[11px] font-serif uppercase tracking-[0.25em] text-[#795548] mb-4 shadow-sm">
            <Heart className="w-3 h-3 text-[#F3A79A] fill-[#F3A79A]/40" />
            <span>{progressLabel}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B1B17] font-normal tracking-tight mb-2">
            Before I Tell You My Story...
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#795548] italic font-light">
            Let&apos;s see how well you remember us. 🤍
          </p>
        </div>

        {/* Card Container */}
        <div className="relative bg-[#FFFDF8] border border-[#E8E0D8] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_-15px_rgba(43,27,23,0.09)] backdrop-blur-sm">
          {/* Subtle notebook lines inside question card */}
          <div className="absolute inset-0 notebook-lines opacity-40 rounded-3xl pointer-events-none" />

          {/* Question Text */}
          <div className="relative z-10 mb-6 sm:mb-8 text-center min-h-[60px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="font-serif text-xl sm:text-2xl text-[#2B1B17] font-medium leading-snug px-2"
              >
                {currentQuestion.question}
              </motion.h3>
            </AnimatePresence>
          </div>

          {/* Options Grid */}
          <div
            className={`relative z-10 flex flex-col gap-3.5 ${
              isShaking ? "animate-shake" : ""
            }`}
          >
            {currentQuestion.options.map((option, idx) => {
              const isOptionSelected = selectedOption === option;
              const isOptionSuccess = isOptionSelected && isCorrect === true;
              const isOptionFailed = isOptionSelected && isCorrect === false;

              let optionStyles =
                "border-[#E8E0D8] bg-[#FBF8F3]/60 hover:bg-[#FFFDF8] hover:border-[#D9B6A9] text-[#2B1B17]";

              if (isOptionSuccess) {
                optionStyles =
                  "border-[#D4AF37] bg-[#FFFDF8] shadow-[0_0_20px_rgba(212,175,55,0.25)] text-[#2B1B17] ring-1 ring-[#D4AF37]";
              } else if (isOptionFailed) {
                optionStyles =
                  "border-[#F3A79A] bg-[#F3A79A]/10 text-[#2B1B17] ring-1 ring-[#F3A79A]";
              }

              return (
                <button
                  key={`${currentQuestion.id}-${idx}`}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  disabled={isCorrect === true || isFinishing}
                  className={`group relative w-full text-left px-5 py-4 rounded-2xl border transition-all duration-300 font-serif text-sm sm:text-base flex items-center justify-between gap-3 touch-target ${optionStyles} focus:outline-none focus:ring-2 focus:ring-[#F3A79A] active:scale-[0.99]`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[#D9B6A9]/70 flex items-center justify-center text-xs font-sans text-[#795548] group-hover:border-[#F3A79A] group-hover:text-[#2B1B17] transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {/* Feedback icon */}
                  {isOptionSuccess && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                    </motion.div>
                  )}
                  {isOptionFailed && (
                    <span className="text-[#F3A79A] text-sm flex-shrink-0">
                      🤍
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback message banner */}
          <div className="relative z-10 min-h-[36px] mt-6 flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {feedbackMessage && (
                <motion.p
                  key={feedbackMessage}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className={`font-serif text-sm sm:text-base italic flex items-center gap-2 ${
                    isCorrect
                      ? "text-[#795548] font-medium"
                      : "text-[#795548]/90"
                  }`}
                >
                  {isCorrect && <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
                  {feedbackMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Small subtle footer reassurance */}
        <p className="text-center font-serif text-xs text-[#795548]/70 mt-6 tracking-wide">
          Take your time... every moment with you is unforgettable.
        </p>
      </div>
    </motion.section>
  );
}
