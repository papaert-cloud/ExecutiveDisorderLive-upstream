import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";

export default function TitlePage() {
  const [, setLocation] = useLocation();
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setHasStarted(true);
    
    // Start both video and audio with sound
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
    
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play();
    }
  };

  const handleEnter = () => {
    // Fade out audio before transitioning
    if (audioRef.current) {
      audioRef.current.volume = 0;
    }
    setLocation("/menu");
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
    }
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background cinematic video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key="title-cinematic"
          autoPlay
          loop
          muted={!hasStarted || isMuted}
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/opening-cinematics-final/grand-opening-cinematic.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="/audio/music/main_theme.mp3" type="audio/mpeg" />
      </audio>

      {/* Start overlay - appears before user interaction */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-xl"
          >
            <motion.button
              onClick={handleStart}
              className="group relative px-16 py-8 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-3xl font-display font-black text-3xl sm:text-4xl text-white transition-all duration-300 shadow-2xl shadow-orange-500/50 hover:shadow-orange-400/70 border-4 border-white/30"
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className="flex items-center gap-4">
                <Play className="w-8 h-8" fill="currentColor" />
                START EXPERIENCE
              </span>
              
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-white/30 blur-2xl -z-10"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>

            {/* Hint text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 text-white/70 text-sm sm:text-base flex items-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              Enable audio for the full experience
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute toggle - only shows after start */}
      {hasStarted && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          onClick={toggleMute}
          className="absolute top-6 right-6 z-50 p-3 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-all duration-300 border border-white/20 hover:border-white/40"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </motion.button>
      )}

      {/* Main content - only shows after start */}
      <AnimatePresence>
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center h-full px-4"
          >
            {/* Animated logo reveal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-8"
            >
              {/* Main title with modern gradient */}
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-2 tracking-tight">
                <motion.span
                  className="block text-gradient-animated"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ef4444 50%, #dc2626 75%, #991b1b 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  EXECUTIVE
                </motion.span>
                <motion.span
                  className="block text-gradient-animated"
                  style={{
                    background: "linear-gradient(135deg, #991b1b 0%, #dc2626 25%, #ef4444 50%, #f59e0b 75%, #fbbf24 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.3,
                  }}
                >
                  DISORDER
                </motion.span>
              </h1>
            </motion.div>

            {/* Concise tagline */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-12 text-center max-w-2xl"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white mb-4 leading-tight">
                Navigate Power. Create Chaos.
              </p>
              <p className="text-base sm:text-lg text-white/80 font-sans">
                A satirical political card game where every decision spawns disaster
              </p>
            </motion.div>

            {/* Call to action button */}
            <motion.button
              onClick={handleEnter}
              className="group relative px-10 py-5 sm:px-12 sm:py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-2xl font-display font-bold text-xl sm:text-2xl text-white transition-all duration-300 shadow-2xl shadow-orange-500/50 hover:shadow-orange-400/70 hover:scale-105 border-2 border-white/20"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="relative z-10 flex items-center gap-3"
                animate={{
                  opacity: [1, 0.9, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                BEGIN THE CHAOS
                <motion.span
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.span>
              
              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-white/20 blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>

            {/* Subtle tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute bottom-8 text-sm sm:text-base text-white/60 font-sans italic"
            >
              "Democracy dies in darkness. But first, it gets really weird."
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated corner accents */}
      {hasStarted && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.5 }}
            className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-amber-500/50"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-red-500/50"
          />
        </>
      )}
    </div>
  );
}
