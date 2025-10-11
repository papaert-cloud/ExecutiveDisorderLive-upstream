import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCw, Home, Share2, Star, TrendingUp } from 'lucide-react';
import { useGameState } from '../../lib/stores/useGameState';
import { useCharacters } from '../../lib/stores/useCharacters';
import { useResources } from '../../lib/stores/useResources';

export default function EnhancedGameEnding() {
  const { resetGame, setGamePhase, turn } = useGameState();
  const { selectedCharacter } = useCharacters();
  const { resources } = useResources();
  const [endingType, setEndingType] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [score, setScore] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Determine ending type based on resources
    const { popularity, stability, media, economy } = resources;
    
    let ending = '';
    if (popularity > 80 && stability > 80 && media > 80 && economy > 80) {
      ending = 'ending-victory-triumph';
      setScore(5000 + (turn * 100));
    } else if (popularity < 25 && stability < 25 && media < 25 && economy < 25) {
      ending = 'ending-nuclear-catastrophe';
      setScore(100);
    } else if (economy < 20) {
      ending = 'ending-economic-collapse';
      setScore(500 + (turn * 10));
    } else if (stability < 20) {
      ending = 'ending-revolution-uprising';
      setScore(300 + (turn * 10));
    } else if (media < 30 || popularity < 30) {
      ending = 'ending-scandal-impeachment';
      setScore(1000 + (turn * 20));
    } else {
      // Default ending
      ending = 'ending-scandal-impeachment';
      setScore(2000 + (turn * 30));
    }
    
    setEndingType(ending);
    
    // Show stats after video plays
    setTimeout(() => {
      setShowStats(true);
    }, 10000); // After 10 second video
  }, [resources, turn]);
  
  const handlePlayAgain = () => {
    resetGame();
    setGamePhase('character_selection');
  };
  
  const handleMainMenu = () => {
    resetGame();
    setGamePhase('menu');
  };
  
  const getEndingTitle = () => {
    switch(endingType) {
      case 'ending-victory-triumph':
        return '🎉 GLORIOUS VICTORY!';
      case 'ending-scandal-impeachment':
        return '📰 SCANDALOUS ENDING!';
      case 'ending-economic-collapse':
        return '💸 ECONOMIC DISASTER!';
      case 'ending-revolution-uprising':
        return '✊ REVOLUTIONARY CHAOS!';
      case 'ending-nuclear-catastrophe':
        return '☢️ TOTAL CATASTROPHE!';
      default:
        return '🎭 GAME OVER!';
    }
  };
  
  const getEndingMessage = () => {
    switch(endingType) {
      case 'ending-victory-triumph':
        return 'Against all odds, you actually succeeded! Your masterful political maneuvering has secured your place in history!';
      case 'ending-scandal-impeachment':
        return 'The media had a field day with your administration. Your political career ends in disgrace and late-night comedy sketches.';
      case 'ending-economic-collapse':
        return 'Your economic policies have bankrupted the nation. Citizens are now using currency as wallpaper. Congratulations?';
      case 'ending-revolution-uprising':
        return 'The people have spoken... with pitchforks. Your reign ends with a hasty exit via helicopter.';
      case 'ending-nuclear-catastrophe':
        return 'You somehow managed to fail at everything simultaneously. This is actually impressive in the worst possible way.';
      default:
        return 'Your political journey has come to an end. Was it worth it? Probably not.';
    }
  };
  
  const getRank = () => {
    if (score > 4000) return { rank: 'S', title: 'Political Genius', color: 'from-yellow-400 to-yellow-600' };
    if (score > 3000) return { rank: 'A', title: 'Master Manipulator', color: 'from-purple-400 to-purple-600' };
    if (score > 2000) return { rank: 'B', title: 'Competent Leader', color: 'from-blue-400 to-blue-600' };
    if (score > 1000) return { rank: 'C', title: 'Average Politician', color: 'from-green-400 to-green-600' };
    if (score > 500) return { rank: 'D', title: 'Political Amateur', color: 'from-orange-400 to-orange-600' };
    return { rank: 'F', title: 'Complete Disaster', color: 'from-red-400 to-red-600' };
  };
  
  const rank = getRank();
  
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Ending Video */}
      <AnimatePresence>
        {!showStats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <video
              ref={videoRef}
              src={`/videos/ending-cinematics/${endingType}.mp4`}
              autoPlay
              muted={false}
              onEnded={() => setShowStats(true)}
              className="w-full h-full object-cover"
            />
            
            {/* Ending Title Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.h1
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
                className="text-7xl md:text-9xl font-black text-white drop-shadow-2xl text-center"
                style={{ textShadow: '0 0 60px rgba(0,0,0,0.9)' }}
              >
                {getEndingTitle()}
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Stats Screen */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl w-full bg-black/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-2 border-white/10"
            >
              {/* Rank Display */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                className="flex justify-center mb-8"
              >
                <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${rank.color} flex items-center justify-center shadow-2xl`}>
                  <span className="text-7xl font-black text-white">{rank.rank}</span>
                </div>
              </motion.div>
              
              {/* Rank Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center mb-8"
              >
                <h2 className="text-4xl font-black text-white mb-2">{rank.title}</h2>
                <p className="text-xl text-gray-400">Final Score: {score.toLocaleString()}</p>
              </motion.div>
              
              {/* Ending Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 mb-8 border border-purple-500/30"
              >
                <p className="text-lg text-purple-200 text-center leading-relaxed">
                  {getEndingMessage()}
                </p>
              </motion.div>
              
              {/* Game Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm mb-1">Character</p>
                  <p className="text-white font-bold">{selectedCharacter?.name}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm mb-1">Turns Survived</p>
                  <p className="text-white font-bold text-2xl">{turn}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm mb-1">Final Popularity</p>
                  <p className="text-white font-bold text-2xl">{resources.popularity}%</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm mb-1">Final Economy</p>
                  <p className="text-white font-bold text-2xl">{resources.economy}%</p>
                </div>
              </motion.div>
              
              {/* Achievement Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex justify-center gap-4 mb-8"
              >
                {turn > 50 && (
                  <div className="bg-yellow-500/20 rounded-full p-3 border border-yellow-500/50">
                    <Star className="w-8 h-8 text-yellow-400" />
                  </div>
                )}
                {resources.popularity > 70 && (
                  <div className="bg-blue-500/20 rounded-full p-3 border border-blue-500/50">
                    <Trophy className="w-8 h-8 text-blue-400" />
                  </div>
                )}
                {endingType.includes('victory') && (
                  <div className="bg-green-500/20 rounded-full p-3 border border-green-500/50">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>
                )}
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex flex-col md:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayAgain}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-green-500/50 transition-all flex items-center justify-center gap-3"
                >
                  <RefreshCw className="w-6 h-6" />
                  PLAY AGAIN
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMainMenu}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3"
                >
                  <Home className="w-6 h-6" />
                  MAIN MENU
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-3"
                >
                  <Share2 className="w-6 h-6" />
                  SHARE
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}