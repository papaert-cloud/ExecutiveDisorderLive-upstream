import { useEffect } from 'react';
import { useGameState } from './lib/stores/useGameState';
import CharacterSelection2D from './components/Game/CharacterSelection2D';
import GameplayScene2D from './components/Game/GameplayScene2D';
import GameEnding from './components/Game/GameEnding';
import CharacterABTest from './components/CharacterABTest';
import AudioManager from './components/UI/AudioManager';

function App() {
  const gamePhase = useGameState((state) => state.gamePhase);

  useEffect(() => {
    console.log('Game phase changed to:', gamePhase);
  }, [gamePhase]);

  // Check if we're in A/B test mode via URL param
  const isABTestMode = window.location.search.includes('abtest');

  if (isABTestMode) {
    return <CharacterABTest />;
  }

  return (
    <>
      <AudioManager />
      {gamePhase === 'character_selection' && <CharacterSelection2D />}
      {gamePhase === 'playing' && <GameplayScene2D />}
      {gamePhase === 'game_ending' && <GameEnding />}
    </>
  );
}

export default App;