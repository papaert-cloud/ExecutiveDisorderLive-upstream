import React, { useEffect, useRef, useState } from "react";
import { useGameState } from "../../lib/stores/useGameState";
import { useResources } from "../../lib/stores/useResources";

interface AudioSystemProps {
  muted?: boolean;
}

export default function AudioSystem({ muted = false }: AudioSystemProps) {
  const { turn } = useGameState();
  const { resources } = useResources();
  const { popularity, stability, media, economy } = resources;
  const [lastAudioPlayed, setLastAudioPlayed] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Play narration based on game state
  useEffect(() => {
    if (muted) return;
    
    const playAudio = async (audioPath: string) => {
      if (lastAudioPlayed === audioPath) return; // Don't repeat same audio
      
      try {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        
        const audio = new Audio(audioPath);
        audio.volume = 0.7;
        audioRef.current = audio;
        
        await audio.play();
        setLastAudioPlayed(audioPath);
      } catch (error) {
        console.log("Audio playback skipped:", error);
      }
    };
    
    // Check for critical states
    const minResource = Math.min(popularity, stability, media, economy);
    
    if (minResource <= 20) {
      playAudio("/audio/narration/low-resources-warning.mp3");
    } else if (turn === 1) {
      playAudio("/audio/narration/game-start.mp3");
    } else if (turn % 5 === 0 && turn > 0) {
      playAudio("/audio/narration/crisis-alert.mp3");
    } else if (popularity > 80) {
      playAudio("/audio/narration/popularity-boost.mp3");
    } else if (stability < 30) {
      playAudio("/audio/narration/stability-crisis.mp3");
    } else if (media < 30) {
      playAudio("/audio/narration/media-scandal.mp3");
    } else if (economy < 30) {
      playAudio("/audio/narration/economic-meltdown.mp3");
    }
  }, [turn, popularity, stability, media, economy, muted, lastAudioPlayed]);
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  return null; // This is a non-visual component
}

// Hook for playing specific audio files
export function usePlayAudio() {
  const playNarration = async (narrationName: string) => {
    try {
      const audio = new Audio(`/audio/narration/${narrationName}.mp3`);
      audio.volume = 0.7;
      await audio.play();
      return audio;
    } catch (error) {
      console.error("Failed to play narration:", error);
      return null;
    }
  };
  
  const playEffect = async (effectName: string) => {
    try {
      const audio = new Audio(`/audio/sfx/${effectName}.mp3`);
      audio.volume = 0.5;
      await audio.play();
      return audio;
    } catch (error) {
      console.error("Failed to play effect:", error);
      return null;
    }
  };
  
  return { playNarration, playEffect };
}