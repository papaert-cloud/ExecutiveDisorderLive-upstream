import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Zap } from "lucide-react";
import { useGameState } from "../lib/stores/useGameState";
import { decisionCards } from "../data/cards";

export default function GamePage() {
  const [, setLocation] = useLocation();
  const { selectedCharacter, resources, turn, makeDecision } = useGameState();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const currentCard = decisionCards[currentCardIndex % decisionCards.length];

  const handleChoice = (choiceIndex: number) => {
    makeDecision(currentCard.id, choiceIndex);
    setCurrentCardIndex((prev) => prev + 1);
  };

  // Redirect if no character selected (post-render)
  useEffect(() => {
    if (!selectedCharacter) {
      setLocation("/character-select");
    }
  }, [selectedCharacter, setLocation]);

  if (!selectedCharacter) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white">Redirecting to character selection...</p>
      </div>
    );
  }

  const stats = [
    { label: "Popularity", value: resources.popularity, color: "bg-blue-500" },
    { label: "Stability", value: resources.stability, color: "bg-green-500" },
    { label: "Media", value: resources.media, color: "bg-purple-500" },
    { label: "Economy", value: resources.economy, color: "bg-yellow-500" },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background scene with parallax layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950" />
      
      {/* Animated background art */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0 bg-[url('/backgrounds/capitol.jpg')] bg-cover bg-center"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-md border-b border-white/20 p-4 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setLocation("/menu")}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Exit to Menu</span>
          </button>

          {/* Character info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400">
              {selectedCharacter.portraitUrl ? (
                <img src={selectedCharacter.portraitUrl} alt={selectedCharacter.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600" />
              )}
            </div>
            <div>
              <h3 className="text-white font-bold">{selectedCharacter.name}</h3>
              <p className="text-white/60 text-sm">Turn {turn}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-white/60 text-xs mb-1">{stat.label}</div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${stat.color} transition-all duration-500`}
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                  <span className="text-white font-bold text-sm">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main game area - Side by side layout */}
      <div className="relative z-10 h-full pt-20 pb-8 px-8">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Background scene / event visualization */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col justify-center"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
              {/* Placeholder for dynamic background/event art */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    <Zap className="w-32 h-32 text-yellow-400 opacity-50" />
                  </motion.div>
                </div>
              </div>
              
              {/* Event context overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Current Situation</h3>
                <p className="text-white/90">
                  The nation watches as you navigate through crisis after crisis. 
                  Every decision ripples through the political landscape.
                </p>
              </div>
            </div>

            {/* Effects/Audio indicators */}
            <div className="mt-4 flex gap-4">
              <div className="flex-1 bg-black/20 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎵</span>
                  <div className="flex-1">
                    <div className="text-white/60 text-xs">Background Music</div>
                    <div className="text-white text-sm">Political Tension Theme</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-black/20 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <div className="flex-1">
                    <div className="text-white/60 text-xs">Active Effect</div>
                    <div className="text-white text-sm">Normal Conditions</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Decision card */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-gradient-to-br from-slate-900/40 to-slate-950/60 backdrop-blur-xl rounded-3xl border-2 border-white/30 p-8 shadow-2xl">
              {/* Card header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">📋</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{currentCard.title}</h2>
                    <p className="text-purple-400 text-sm capitalize">{currentCard.category}</p>
                  </div>
                </div>
              </div>

              {/* Card description */}
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
                <p className="text-white/90 text-lg leading-relaxed">{currentCard.description}</p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {currentCard.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleChoice(index)}
                    className="group w-full text-left bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 backdrop-blur-sm border border-white/30 hover:border-yellow-400/60 rounded-2xl p-5 transition-all duration-300"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/40 transition-colors">
                        <span className="text-yellow-400 font-bold">{String.fromCharCode(65 + index)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-1">{option.text}</p>
                        <p className="text-white/60 text-sm">Click to decide</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
