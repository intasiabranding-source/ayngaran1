"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import BackgroundAmbience from "@/components/BackgroundAmbience";
import AudioController, { AudioControllerHandle } from "@/components/AudioController";
import Scene1Cover from "@/components/Scene1Cover";
import Scene2Quiz from "@/components/Scene2Quiz";
import Scene3Letter from "@/components/Scene3Letter";
import Scene4Photobooth from "@/components/Scene4Photobooth";
import Scene5LoveQuestion from "@/components/Scene5LoveQuestion";
import Scene6Ending from "@/components/Scene6Ending";
import { storyConfig } from "@/data/storyConfig";

export type StoryScene =
  | "cover"
  | "quiz"
  | "letter"
  | "memories"
  | "question"
  | "ending";

export default function LoveStoryApp() {
  const [currentScene, setCurrentScene] = useState<StoryScene>("cover");
  const audioControllerRef = useRef<AudioControllerHandle | null>(null);

  // Smoothly scroll to top on every scene transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentScene]);

  // Transition from Scene 1 to Scene 2 + Start Background Audio
  const handleBeginStory = async () => {
    if (audioControllerRef.current) {
      await audioControllerRef.current.play();
    }
    setCurrentScene("quiz");
  };

  // Transition from Scene 2 (Quiz complete) to Scene 3 (Love letter)
  const handleQuizComplete = () => {
    setCurrentScene("letter");
  };

  // Transition from Scene 3 (Love letter read) to Scene 4 (Memories)
  const handleLetterComplete = () => {
    setCurrentScene("memories");
  };

  // Transition from Scene 4 (Photobooth) to Scene 5 (Important question)
  const handleMemoriesComplete = () => {
    setCurrentScene("question");
  };

  // Transition from Scene 5 (YES clicked) to Scene 6 (Birthday ending)
  const handleQuestionYes = () => {
    setCurrentScene("ending");
  };

  // Optional: Relive story from the beginning
  const handleReplay = () => {
    setCurrentScene("cover");
  };

  return (
    <main className="relative min-h-screen min-h-[100dvh] w-full overflow-x-hidden flex flex-col justify-between">
      {/* Visual Ambiance: Grain, Notebook Lines, Dust Particles, Vignette */}
      <BackgroundAmbience />

      {/* Global Persistent Audio Controller */}
      <AudioController
        ref={audioControllerRef}
        audioSrc={storyConfig.backgroundMusic}
      />

      {/* Interactive Story Scenes with Cinematic Page Transitions */}
      <div className="relative z-10 flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentScene === "cover" && (
            <Scene1Cover key="cover" onBegin={handleBeginStory} />
          )}

          {currentScene === "quiz" && (
            <Scene2Quiz key="quiz" onComplete={handleQuizComplete} />
          )}

          {currentScene === "letter" && (
            <Scene3Letter key="letter" onNext={handleLetterComplete} />
          )}

          {currentScene === "memories" && (
            <Scene4Photobooth key="memories" onNext={handleMemoriesComplete} />
          )}

          {currentScene === "question" && (
            <Scene5LoveQuestion key="question" onYes={handleQuestionYes} />
          )}

          {currentScene === "ending" && (
            <Scene6Ending key="ending" onReplay={handleReplay} />
          )}
        </AnimatePresence>
      </div>

      {/* Very subtle editorial bottom imprint */}
      <footer className="relative z-10 py-4 text-center select-none pointer-events-none">
        <p className="font-serif text-[10px] tracking-[0.25em] uppercase text-[#795548]/40">
          Made with all my heart • {storyConfig.relationshipDate} — Forever
        </p>
      </footer>
    </main>
  );
}
