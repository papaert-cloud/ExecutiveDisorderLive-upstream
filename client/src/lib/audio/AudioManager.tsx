import React, { useEffect, useRef } from "react";
import { useGameState } from "../stores/useGameState";
import { useAudio } from "../stores/useAudio";

export default function AudioManager() {
  const { gamePhase } = useGameState();
  const { backgroundMusic, isMuted, setBackgroundMusic, playHit, playSuccess } = useAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize background music
  useEffect(() => {
    if (!backgroundMusic && !audioRef.current) {
      const audio = new Audio('/sounds/background.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
      setBackgroundMusic(audio);
    }
  }, [backgroundMusic, setBackgroundMusic]);

  // Control music based on game phase
  useEffect(() => {
    if (audioRef.current && !isMuted) {
      if (gamePhase === 'playing' || gamePhase === 'character_selection') {
        audioRef.current.play().catch(e => {
          console.log('Audio play prevented:', e);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [gamePhase, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null; // This component doesn't render anything
}
