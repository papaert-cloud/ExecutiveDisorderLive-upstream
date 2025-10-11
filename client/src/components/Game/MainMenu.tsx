import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Award, Trophy, Users, Zap } from 'lucide-react';
import { useGameState } from '../../lib/stores/useGameState';

export default function MainMenu() {
  const { setGamePhase } = useGameState();
  const [showCinematic, setShowCinematic] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCredits, setShowCredits] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handleStartGame = () => {
    setShowCinematic(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  
  const handleCinematicEnd = () => {
    setShowCinematic(false);
    setGamePhase('character_selection');
  };
  
  const handleSkipCinematic = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    handleCinematicEnd();
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video Loop */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/replay-loops/capitol-building-exterior.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>
      
      {/* Main Menu Content */}
      <AnimatePresence mode="wait">
        {!showCinematic && !showCredits && !showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center h-full px-4"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.2
              }}
              className="mb-8"
            >
              <h1 className="text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                EXECUTIVE
              </h1>
              <h2 className="text-7xl font-black bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl text-center -mt-4">
                DISORDER
              </h2>
              <p className="text-2xl text-gray-300 text-center mt-4 font-bold italic animate-pulse">
                "Where Democracy Meets Pandemonium!"
              </p>
            </motion.div>
            
            {/* Menu Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4 w-full max-w-md"
            >
              {/* Start Game Button */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartGame}
                className="relative group overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white text-2xl font-black py-6 px-12 rounded-2xl shadow-2xl transition-all hover:shadow-green-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  <Play className="w-8 h-8" />
                  START CHAOS
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-yellow-400/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </motion.button>
              
              {/* Instructions Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInstructions(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-3"
              >
                <Users className="w-6 h-6" />
                HOW TO RULE
              </motion.button>
              
              {/* High Scores Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-yellow-500/50 transition-all flex items-center justify-center gap-3"
              >
                <Trophy className="w-6 h-6" />
                HALL OF INFAMY
              </motion.button>
              
              {/* Credits Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCredits(true)}
                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-gray-600/50 transition-all flex items-center justify-center gap-3"
              >
                <Award className="w-6 h-6" />
                CREDITS
              </motion.button>
            </motion.div>
            
            {/* Sound Toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
            >
              {soundEnabled ? (
                <Volume2 className="w-6 h-6 text-white" />
              ) : (
                <VolumeX className="w-6 h-6 text-white" />
              )}
            </motion.button>
            
            {/* Satirical Taglines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 text-center"
            >
              <p className="text-gray-400 text-sm">
                A political satire game where your decisions actually matter... sort of.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                No actual politicians were harmed in the making of this game.
              </p>
            </motion.div>
          </motion.div>
        )}
        
        {/* Instructions Screen */}
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 flex items-center justify-center h-full px-8"
          >
            <div className="bg-black/90 backdrop-blur-2xl rounded-3xl p-12 max-w-4xl border-2 border-yellow-500/30">
              <h2 className="text-5xl font-black text-yellow-400 mb-8 text-center">HOW TO RULE (BADLY)</h2>
              
              <div className="space-y-6 text-white">
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Choose Your Chaos Agent</h3>
                    <p className="text-gray-300">
                      Select from 10 hilariously incompetent political characters, each with their own special "talent" for disaster.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Make "Brilliant" Decisions</h3>
                    <p className="text-gray-300">
                      Face 50+ satirical decision cards that affect your Popularity, Stability, Media, and Economy. Try not to destroy everything... or do!
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Watch the World Burn</h3>
                    <p className="text-gray-300">
                      Experience cascading consequences as your terrible decisions compound. Crisis events appear when chaos reaches critical levels!
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Achieve "Victory"</h3>
                    <p className="text-gray-300">
                      Survive 100 turns or trigger one of 5 dramatic endings: Victory, Scandal, Economic Collapse, Revolution, or Nuclear Catastrophe!
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/30">
                <p className="text-purple-300 text-center text-lg font-bold">
                  PRO TIP: Keep all resources balanced! Too low and you'll face disaster, too high and... well, that's suspicious!
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInstructions(false)}
                className="mt-8 w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-xl"
              >
                GOT IT, LET'S CAUSE CHAOS!
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {/* Credits Screen */}
        {showCredits && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 flex items-center justify-center h-full px-8"
          >
            <div className="bg-black/90 backdrop-blur-2xl rounded-3xl p-12 max-w-3xl border-2 border-purple-500/30">
              <h2 className="text-5xl font-black text-purple-400 mb-8 text-center">CREDITS</h2>
              
              <div className="space-y-6 text-white text-center">
                <div>
                  <p className="text-2xl font-bold text-yellow-400 mb-2">Executive Disorder</p>
                  <p className="text-lg text-gray-300">A Political Satire Experience</p>
                </div>
                
                <div>
                  <p className="text-xl font-bold text-blue-400 mb-2">Created with Replit</p>
                  <p className="text-gray-300">The power of AI-assisted development</p>
                </div>
                
                <div>
                  <p className="text-xl font-bold text-green-400 mb-2">Special Thanks</p>
                  <p className="text-gray-300">To democracy, for the endless material</p>
                  <p className="text-gray-300">To politicians, for being themselves</p>
                  <p className="text-gray-300">To satire, for keeping us sane</p>
                </div>
                
                <div className="pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    This is a work of fiction and satire. Any resemblance to actual politicians,
                    living or impeached, or actual events, past or apocalyptic, is purely coincidental.
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCredits(false)}
                className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-xl"
              >
                BACK TO MENU
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Opening Cinematic Overlay */}
      <AnimatePresence>
        {showCinematic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            <video
              ref={videoRef}
              src="/videos/opening-cinematics-final/grand-opening-cinematic.mp4"
              muted={!soundEnabled}
              onEnded={handleCinematicEnd}
              className="w-full h-full object-cover"
            />
            
            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSkipCinematic}
              className="absolute bottom-10 right-10 px-6 py-3 bg-white/20 backdrop-blur-md text-white font-bold rounded-full hover:bg-white/30 transition-all"
            >
              Skip Intro →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}