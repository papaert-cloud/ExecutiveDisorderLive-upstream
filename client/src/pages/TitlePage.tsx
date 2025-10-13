import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function TitlePage() {
  const [, setLocation] = useLocation();
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Auto-play audio on mount
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {
        // Auto-play blocked, user will need to interact
      });
    }
  }, []);

  const handleEnter = () => {
    // Fade out audio before transitioning
    if (audioRef.current) {
      audioRef.current.volume = 0;
    }
    setLocation("/menu");
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background cinematic video */}
      <div className="absolute inset-0 z-0">
        <video
          key="title-cinematic"
          autoPlay
          loop
          muted
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

      {/* Mute toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMute}
        className="absolute top-6 right-6 z-50 p-3 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-all duration-300 border border-white/20 hover:border-white/40"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </motion.button>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
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
      </div>

      {/* Animated corner accents */}
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
    </div>
  );
}
