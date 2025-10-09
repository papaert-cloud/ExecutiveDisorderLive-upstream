import React, { useEffect } from 'react';
import { useGameState } from './lib/stores/useGameState';
import CharacterSelection2D from './components/Game/CharacterSelection2D';
import GameplayScene2D from './components/Game/GameplayScene2D';
import GameEnding from './components/Game/GameEnding';
import CharacterABTest from './components/CharacterABTest';
import AudioManager from './lib/audio/AudioManager';

function App() {
  const gamePhase = useGameState((state) => state.gamePhase);

  useEffect(() => {
    console.log('Game phase changed to:', gamePhase);
  }, [gamePhase]);

  // Check URL params for special modes
  const urlParams = new URLSearchParams(window.location.search);
  const isABTestMode = urlParams.has('abtest');
  const isAssetGallery = urlParams.has('assets');
  const isShowcase = urlParams.has('showcase');

  if (isABTestMode) {
    return <CharacterABTest />;
  }
  
  if (isAssetGallery) {
    const AssetGallery = React.lazy(() => import('./components/AssetGallery'));
    return (
      <React.Suspense fallback={<div className="text-white text-2xl flex items-center justify-center h-screen">Loading Asset Gallery...</div>}>
        <AssetGallery />
      </React.Suspense>
    );
  }
  
  if (isShowcase) {
    const GameAssetShowcase = React.lazy(() => import('./components/GameAssetShowcase'));
    return (
      <React.Suspense fallback={<div className="text-white text-2xl flex items-center justify-center h-screen">Loading Showcase...</div>}>
        <GameAssetShowcase />
      </React.Suspense>
    );
  }

  return (
    <>
      <AudioManager />
      {(gamePhase === 'menu' || gamePhase === 'character_selection') && <CharacterSelection2D />}
      {gamePhase === 'playing' && <GameplayScene2D />}
      {gamePhase === 'ended' && <GameEnding />}
    </>
  );
}

export default App;