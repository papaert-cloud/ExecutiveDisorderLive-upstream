import React from "react";
import "@fontsource/inter";

import Game2D from "./components/Game/Game2D";
import GameUI from "./components/UI/GameUI";
import LoadingScreen from "./components/UI/LoadingScreen";
import AudioManager from "./lib/audio/AudioManager";
import { useGameState } from "./lib/stores/useGameState";

function App() {
  const { isLoading } = useGameState();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 2D Game Canvas */}
      <Game2D />
      
      {/* UI Overlay */}
      <GameUI />
      
      {/* Audio Manager */}
      <AudioManager />
    </div>
  );
}

export default App;
