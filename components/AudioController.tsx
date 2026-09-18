"use client";

import { forwardRef, useImperativeHandle } from "react";

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
  function AudioController(_props, ref) {
    useImperativeHandle(ref, () => ({
      play: async () => {},
      pause: () => {},
      toggleMute: () => {},
      isPlaying: false,
      isMuted: true,
    }));

    return null;
  }
);

export default AudioController;
