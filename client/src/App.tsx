import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import "@fontsource/inter";

import GameCanvas from "./components/Game/GameCanvas";
import GameUI from "./components/UI/GameUI";
import LoadingScreen from "./components/UI/LoadingScreen";
import AudioManager from "./lib/audio/AudioManager";
import { useGameState } from "./lib/stores/useGameState";

// Define control keys for the game
const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
  { name: "interact", keys: ["KeyE", "Space"] },
  { name: "escape", keys: ["Escape"] },
];

function App() {
  const { gamePhase, isLoading } = useGameState();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <KeyboardControls map={controls}>
        <Canvas
          shadows
          camera={{
            position: [0, 2, 8],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance"
          }}
          style={{ background: '#111827' }}
        >
          <Suspense fallback={null}>
            <GameCanvas />
          </Suspense>
        </Canvas>
        
        {/* UI Overlay */}
        <GameUI />
        
        {/* Audio Manager */}
        <AudioManager />
      </KeyboardControls>
    </div>
  );
}

export default App;
