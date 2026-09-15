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
    const [usingSynthFallback, setUsingSynthFallback] = useState<boolean>(false);

    // Web Audio Synthesizer Fallback refs
    const audioCtxRef = useRef<AudioContext | null>(null);
    const synthTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize Web Audio romantic ambient synthesizer fallback
    const startSynthMusic = useCallback(() => {
      try {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtxClass) return;

        if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
          audioCtxRef.current = new AudioCtxClass();
        }

        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Chords: Emaj9, C#m9, Aadd9, Bsus4
        const chords = [
          [164.81, 246.94, 329.63, 493.88, 622.25],
          [138.59, 207.65, 277.18, 415.3, 554.37],
          [110.0, 220.0, 277.18, 329.63, 440.0],
          [123.47, 185.0, 246.94, 370.0, 493.88],
        ];

        let chordIndex = 0;
        let noteIndex = 0;

        const playChime = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
          const currentChord = chords[chordIndex];
          const freq = currentChord[noteIndex % currentChord.length];

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const now = ctx.currentTime;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.06, now + 0.12);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(800, now);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 2.5);

          noteIndex++;
          if (noteIndex >= currentChord.length * 2) {
            noteIndex = 0;
            chordIndex = (chordIndex + 1) % chords.length;
          }

          const delays = [450, 480, 520, 420];
          const nextDelay = delays[Math.floor(Math.random() * delays.length)];
          synthTimerRef.current = setTimeout(playChime, nextDelay);
        };

        playChime();
        setUsingSynthFallback(true);
      } catch (err) {
        console.warn("Ambient synth initialization note:", err);
      }
    }, []);

    const stopSynthMusic = useCallback(() => {
      if (synthTimerRef.current) {
        clearTimeout(synthTimerRef.current);
        synthTimerRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      }
    }, []);

    // Play method exposed to parent/scenes
    const handlePlay = useCallback(async () => {
      setHasStartedOnce(true);

      const audio = audioRef.current;
      if (audio) {
        try {
          audio.volume = 0.35; // Ideal romantic background volume
          await audio.play();
          setIsPlaying(true);
          setUsingSynthFallback(false);
          return;
        } catch {
          // If HTML5 audio is blocked by autoplay or 404, fallback to synth
          startSynthMusic();
          setIsPlaying(true);
        }
      } else {
        startSynthMusic();
        setIsPlaying(true);
      }
    }, [startSynthMusic]);

    const handlePause = useCallback(() => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
      }
      stopSynthMusic();
      setIsPlaying(false);
    }, [stopSynthMusic]);

    const handleToggleMute = useCallback(() => {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);

      const audio = audioRef.current;
      if (audio) {
        audio.muted = nextMuted;
      }

      if (audioCtxRef.current) {
        if (nextMuted) {
          audioCtxRef.current.suspend();
        } else if (isPlaying) {
          audioCtxRef.current.resume();
        }
      }
    }, [isMuted, isPlaying]);

    // Autoplay upon entering website (or on first click/tap anywhere)
    useEffect(() => {
      let isMounted = true;

      const tryAutoplay = async () => {
        try {
          if (audioRef.current) {
            audioRef.current.volume = 0.35;
            await audioRef.current.play();
            if (isMounted) {
              setIsPlaying(true);
              setHasStartedOnce(true);
            }
          }
        } catch {
          // Autoplay blocked by browser policy; wait for first click/tap anywhere
          const handleFirstInteraction = async () => {
            if (!isMounted) return;
            try {
              if (audioRef.current) {
                audioRef.current.volume = 0.35;
                await audioRef.current.play();
                setIsPlaying(true);
                setHasStartedOnce(true);
              }
            } catch {
              startSynthMusic();
              setIsPlaying(true);
              setHasStartedOnce(true);
            }
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("touchstart", handleFirstInteraction);
            window.removeEventListener("keydown", handleFirstInteraction);
          };

          window.addEventListener("click", handleFirstInteraction, { once: true });
          window.addEventListener("touchstart", handleFirstInteraction, { once: true });
          window.addEventListener("keydown", handleFirstInteraction, { once: true });
        }
      };

      tryAutoplay();

      return () => {
        isMounted = false;
      };
    }, [startSynthMusic]);

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

    // Clean up
    useEffect(() => {
      return () => {
        stopSynthMusic();
        if (audioCtxRef.current) {
          audioCtxRef.current.close().catch(() => {});
        }
      };
    }, [stopSynthMusic]);

    return (
      <>
        {/* Hidden HTML5 Audio element */}
        <audio
          ref={audioRef}
          src={audioSrc}
          loop
          preload="auto"
          onError={() => {
            if (isPlaying) {
              startSynthMusic();
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => {
            if (!usingSynthFallback) setIsPlaying(false);
          }}
        />

        {/* Floating Minimalist Music Control Button */}
        <div
          className={`fixed top-4 right-4 z-50 transition-all duration-700 ${
            hasStartedOnce
              ? "opacity-100 translate-y-0"
              : "opacity-80 hover:opacity-100"
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
            className="group flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#FFFDF8]/90 backdrop-blur-md border border-[#E8E0D8] text-[#795548] hover:text-[#2B1B17] hover:border-[#F3A79A] shadow-sm hover:shadow transition-all duration-300 touch-target focus:outline-none focus:ring-2 focus:ring-[#F3A79A]/50"
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
                {isMuted ? "Muted" : isPlaying ? "Music" : "Music"}
              </span>
            )}
          </button>
        </div>
      </>
    );
  }
);

export default AudioController;
