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

    // Play method exposed to parent/scenes & mobile interaction listeners
    const handlePlay = useCallback(async () => {
      setHasStartedOnce(true);
      const audio = audioRef.current;
      if (audio) {
        try {
          audio.volume = 0.4; // Clear background volume for all devices
          const promise = audio.play();
          if (promise !== undefined) {
            await promise;
          }
          setIsPlaying(true);
          return;
        } catch (err) {
          console.warn("HTML5 audio autoplay blocked or waiting for user gesture:", err);
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

    // Mobile-first universal touch unlock listener for iOS Safari & Android Chrome
    useEffect(() => {
      let unlocked = false;

      const unlockAudio = async () => {
        if (unlocked) return;
        const audio = audioRef.current;
        if (audio) {
          try {
            audio.volume = 0.4;
            await audio.play();
            setIsPlaying(true);
            setHasStartedOnce(true);
            unlocked = true;

            events.forEach((evt) => window.removeEventListener(evt, unlockAudio));
          } catch (e) {
            // Mobile browser waiting for direct tap
          }
        }
      };

      const events = ["touchstart", "touchend", "pointerdown", "click", "scroll"];
      events.forEach((evt) => {
        window.addEventListener(evt, unlockAudio, { passive: true });
      });

      // Try playing immediately if mobile browser policy allows
      unlockAudio();

      return () => {
        events.forEach((evt) => {
          window.removeEventListener(evt, unlockAudio);
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
        {/* Universal HTML5 Audio element for all media devices (iOS, Android, Mobile, Desktop) */}
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

        {/* Floating Minimalist Music Control Button */}
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
                ? "Unmute romantic background music"
                : isPlaying
                ? "Mute background music"
                : "Play romantic background music"
            }
            className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#FFFDF8]/90 backdrop-blur-md border border-[#E8E0D8] text-[#795548] hover:text-[#2B1B17] hover:border-[#F3A79A] shadow-md hover:shadow-lg transition-all duration-300 touch-target focus:outline-none focus:ring-2 focus:ring-[#F3A79A]/50"
          >
            {/* Music icon or Mute icon */}
            <div className="relative w-4 h-4 flex items-center justify-center">
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#795548]" />
              ) : isPlaying ? (
                <Volume2 className="w-4 h-4 text-[#F3A79A]" />
              ) : (
                <Music className="w-4 h-4 text-[#795548] group-hover:text-[#F3A79A]" />
              )}
            </div>

            {/* Audio Wave Visualizer Animation */}
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
