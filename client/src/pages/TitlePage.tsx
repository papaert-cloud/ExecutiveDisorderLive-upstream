import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useMemo } from "react";

export default function TitlePage() {
  const [, setLocation] = useLocation();

  const handleEnter = () => {
    setLocation("/menu");
  };

  // Pre-compute particle positions once
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (i * 73) % 100, // Pseudo-random but deterministic
      y: (i * 127) % 100,
      duration: 2 + (i % 3),
    }));
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-30">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Title */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-7xl md:text-9xl font-black mb-4"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 25%, #ec4899 50%, #8b5cf6 75%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            EXECUTIVE
          </motion.h1>
          <motion.h1 
            className="text-7xl md:text-9xl font-black"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #ef4444 75%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DISORDER
          </motion.h1>
        </motion.div>

        {/* Subtitle box */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-6 max-w-2xl mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            <span className="text-yellow-400">Executive Disorder</span>
          </h2>
          <p className="text-white/90 text-center text-lg">
            A Satirical Political Card Game
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-4xl text-center mb-12 space-y-4"
        >
          <p className="text-white/80 text-lg md:text-xl">
            Welcome to the nation where every decision trends, crashes, and spawns a documentary
            within hours. Your approval rating swings like a caffeinated pendulum, the markets trade
            on memes, and the press has the collective memory of a goldfish with anxiety.
          </p>
          <p className="text-white/70 text-base md:text-lg">
            Navigate the four pillars of power: Popularity, Stability, Media Trust, and Economic Health.
            Watch as your tiniest choices cascade into constitutional crises and your grandest plans
            dissolve into Twitter feuds.
          </p>
          <p className="text-yellow-400 text-xl md:text-2xl font-bold italic">
            "Democracy dies in darkness. But first, it gets really, really weird."
          </p>
        </motion.div>

        {/* Click to start */}
        <motion.button
          onClick={handleEnter}
          className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl font-bold text-2xl text-white transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">CLICK TO ENTER</span>
          <motion.div
            className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.button>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 text-white/50 text-sm"
        >
          Democracy: <span className="text-yellow-400">Optional</span> • 
          Chaos: <span className="text-red-400">Guaranteed</span>
        </motion.p>
      </div>
    </div>
  );
}
