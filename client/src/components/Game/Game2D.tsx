import React from "react";
import CharacterSelection2D from "./CharacterSelection2D.tsx";
import EnhancedGameplay from "./EnhancedGameplay";
import GameEnding from "./GameEnding.tsx";
import { useGameState } from "../../lib/stores/useGameState";

export default function Game2D() {
  const { gamePhase } = useGameState();

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800">
      {gamePhase === 'character_selection' && <CharacterSelection2D />}
      {gamePhase === 'playing' && <EnhancedGameplay />}
      {gamePhase === 'ended' && <GameEnding />}
    </div>
  );
}
