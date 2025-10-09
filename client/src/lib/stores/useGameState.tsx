import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "menu" | "character_selection" | "playing" | "ended";
export type TimeOfDay = "morning" | "afternoon" | "night";

interface GameState {
  gamePhase: GamePhase;
  timeOfDay: TimeOfDay;
  turn: number;
  isLoading: boolean;
  
  // Actions
  setGamePhase: (phase: GamePhase) => void;
  setTimeOfDay: (time: TimeOfDay) => void;
  nextTurn: () => void;
  resetGame: () => void;
  endGame: () => void;
  setLoading: (loading: boolean) => void;
}

export const useGameState = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    gamePhase: "menu",
    timeOfDay: "morning",
    turn: 1,
    isLoading: false,
    
    setGamePhase: (phase) => {
      console.log('Game phase changed to:', phase);
      set({ gamePhase: phase });
    },
    
    setTimeOfDay: (time) => {
      console.log('Time of day changed to:', time);
      set({ timeOfDay: time });
    },
    
    nextTurn: () => {
      const { turn, timeOfDay } = get();
      const newTurn = turn + 1;
      
      // Change time of day every few turns
      let newTimeOfDay = timeOfDay;
      if (newTurn % 10 === 0) {
        if (timeOfDay === "morning") newTimeOfDay = "afternoon";
        else if (timeOfDay === "afternoon") newTimeOfDay = "night";
        else newTimeOfDay = "morning";
      }
      
      set({ turn: newTurn, timeOfDay: newTimeOfDay });
      console.log(`Turn ${newTurn}, Time: ${newTimeOfDay}`);
    },
    
    resetGame: () => {
      set({
        gamePhase: "menu",
        timeOfDay: "morning",
        turn: 1,
        isLoading: false
      });
      console.log('Game reset');
    },
    
    endGame: () => {
      set({ gamePhase: "ended" });
      console.log('Game ended');
    },
    
    setLoading: (loading) => {
      set({ isLoading: loading });
    }
  }))
);

// Auto-advance turns during gameplay
useGameState.subscribe(
  (state) => state.gamePhase,
  (gamePhase) => {
    if (gamePhase === "playing") {
      // This could be extended to auto-advance turns or trigger events
      console.log('Entered gameplay phase');
    }
  }
);
