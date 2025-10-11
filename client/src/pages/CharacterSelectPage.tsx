import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { characters } from "../data/characters";

export default function CharacterSelectPage() {
  const [, setLocation] = useLocation();

  const handleSelectCharacter = (characterId: string) => {
    setLocation(`/character/${characterId}`);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/replay-loops/government-office-ambient.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/50 via-indigo-950/40 to-purple-950/50" />
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-md border-b border-white/20 p-6 flex items-center justify-between z-20">
        <button
          onClick={() => setLocation("/menu")}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Menu</span>
        </button>
        <div className="text-center flex-1">
          <h1 className="text-3xl font-black text-white">CHOOSE YOUR LEADER</h1>
          <p className="text-yellow-400 text-sm">SELECT YOUR POLITICAL AVATAR</p>
        </div>
        <div className="w-32" /> {/* Spacer for center alignment */}
      </div>

      {/* Character grid */}
      <div className="relative z-10 h-full pt-24 pb-8 px-8 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {characters.map((character, index) => (
            <motion.button
              key={character.id}
              onClick={() => handleSelectCharacter(character.id)}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.05, type: "spring" }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-950/60 backdrop-blur-lg border-2 border-white/20 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20"
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Character portrait */}
              <div className="absolute inset-0">
                {character.portraitUrl ? (
                  <img
                    src={character.portraitUrl}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <span className="text-6xl">🎭</span>
                  </div>
                )}
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Character info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                  {character.name.split(' ').slice(0, 2).join(' ')}...
                </h3>
                <p className="text-yellow-400 text-sm mb-2">{character.title}</p>
                
                {/* Stats preview */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/60">Pop:</span>
                    <span className="text-white font-bold">{character.startingStats.popularity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Sta:</span>
                    <span className="text-white font-bold">{character.startingStats.stability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Med:</span>
                    <span className="text-white font-bold">{character.startingStats.media}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Eco:</span>
                    <span className="text-white font-bold">{character.startingStats.economy}</span>
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
