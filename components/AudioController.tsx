"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export interface AudioControllerHandle {
  play: () => Promise<void>;
  pause: () => void;
  toggleMute: () => void;
  isPlaying: boolean;
  isMuted: boolean;
}

interface AudioControllerProps {
  audioSrc?: string;
  autoStartOnInteraction?: boolean;
}

const AudioController = forwardRef<AudioControllerHandle, AudioControllerProps>(
  function AudioController(
    { audioSrc = "/audio/background.mp3" },
    ref
  ) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [hasStartedOnce, setHasStartedOnce] = useState<boolean>(false);

    // Play method for mobile and desktop media
    const handlePlay = useCallback(async () => {
      setHasStartedOnce(true);
      const audio = audioRef.current;
      if (audio) {
        try {
          audio.volume = 0.45; // Clear volume across mobile & desktop
          const promise = audio.play();
          if (promise !== undefined) {
            await promise;
          }
          setIsPlaying(true);
        } catch (err) {
          console.warn("Autoplay waiting for touch gesture:", err);
        }
      }
    }, []);

    const handlePause = useCallback(() => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
      }
      setIsPlaying(false);
    }, []);

    const handleToggleMute = useCallback(() => {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);

      const audio = audioRef.current;
      if (audio) {
        audio.muted = nextMuted;
      }
    }, [isMuted]);

    // Universal autoplay & mobile media query touch unlocker
    useEffect(() => {
      let unlocked = false;

      const unlockAndPlay = async () => {
        if (unlocked) return;
        const audio = audioRef.current;
        if (audio) {
          try {
            audio.volume = 0.45;
            await audio.play();
            setIsPlaying(true);
            setHasStartedOnce(true);
            unlocked = true;

            events.forEach((evt) => window.removeEventListener(evt, unlockAndPlay));
          } catch {
            // Waiting for first user touch
          }
        }
      };

      const events = [
        "touchstart",
        "touchend",
        "pointerdown",
        "click",
        "scroll",
        "focus",
      ];
      events.forEach((evt) => {
        window.addEventListener(evt, unlockAndPlay, { passive: true });
      });

      // Try playing immediately upon landing on the site
      unlockAndPlay();

      return () => {
        events.forEach((evt) => {
          window.removeEventListener(evt, unlockAndPlay);
        });
      };
    }, []);

    // Expose controls to ref
    useImperativeHandle(
      ref,
      () => ({
        play: handlePlay,
        pause: handlePause,
        toggleMute: handleToggleMute,
        isPlaying,
        isMuted,
      }),
      [handlePlay, handlePause, handleToggleMute, isPlaying, isMuted]
    );

    return (
      <>
        {/* Universal Audio Element for Desktop & Mobile Media Queries */}
        <audio
          ref={audioRef}
          src={audioSrc}
          loop
          preload="auto"
          playsInline
          // @ts-expect-error webkit attribute for mobile safari
          webkit-playsinline="true"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={audioSrc} type="audio/mpeg" />
          <source src={audioSrc} type="audio/mp3" />
        </audio>

        {/* Minimalist Floating Audio Controls for All Screen Sizes */}
        <div
          className={`fixed top-4 right-4 z-50 transition-all duration-700 ${
            hasStartedOnce
              ? "opacity-100 translate-y-0"
              : "opacity-90 hover:opacity-100"
          }`}
        >
          <button
            type="button"
            onClick={isPlaying ? handleToggleMute : handlePlay}
            aria-label={
              isMuted
                ? "Unmute background music"
                : isPlaying
                ? "Mute background music"
                : "Play background music"
            }
            className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#FFFDF8]/90 backdrop-blur-md border border-[#E8E0D8] text-[#795548] hover:text-[#2B1B17] hover:border-[#F3A79A] shadow-md hover:shadow-lg transition-all duration-300 touch-target focus:outline-none focus:ring-2 focus:ring-[#F3A79A]/50"
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#795548]" />
              ) : isPlaying ? (
                <Volume2 className="w-4 h-4 text-[#F3A79A]" />
              ) : (
                <Music className="w-4 h-4 text-[#795548] group-hover:text-[#F3A79A]" />
              )}
            </div>

            {isPlaying && !isMuted ? (
              <div className="flex items-end gap-[2px] h-3 w-4">
                <span className="w-[2.5px] bg-[#F3A79A] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5" />
                <span className="w-[2.5px] bg-[#F3A79A] rounded-full animate-[pulse_1.1s_ease-in-out_infinite] h-3" />
                <span className="w-[2.5px] bg-[#F3A79A] rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-1.5" />
              </div>
            ) : (
              <span className="text-[11px] font-serif uppercase tracking-widest text-[#795548]">
                {isMuted ? "Muted" : isPlaying ? "Music" : "Play"}
              </span>
            )}
          </button>
        </div>
      </>
    );
  }
);

export default AudioController;
