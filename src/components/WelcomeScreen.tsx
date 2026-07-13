import React from "react";
import { motion } from "motion/react";
import { Sparkles, Music } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="relative w-full h-screen flex flex-col justify-between items-center px-6 py-12 overflow-hidden bg-radial-at-t from-[#3c0610] via-[#080203] to-[#020101] select-none">
      {/* Decorative Wine Corner Accents on the entire viewport */}
      <div className="absolute inset-4 border border-mystic-wine/15 rounded-2xl pointer-events-none flex items-center justify-center">
        <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-mystic-wine/40" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-mystic-wine/40" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-mystic-wine/40" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-mystic-wine/40" />
      </div>

      {/* Top section: Theme Introduction */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-center mt-6 z-10"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-mystic-wine-pale/60 font-serif-en block mb-2">
          THE LYRIC TAROT ORACLE
        </span>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-mystic-wine/45 to-transparent mx-auto" />
      </motion.div>

      {/* Middle Section: Main Title Layout */}
      <div className="flex flex-col items-center gap-6 max-w-sm text-center z-10">
        {/* Mystic Hexagram (六芒星) Icon - Elegant, Gorgeous & Vintage */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-32 h-32 flex items-center justify-center text-mystic-wine"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="1">
            <defs>
              <radialGradient id="mysticGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="70%" stopColor="#9c1228" stopOpacity="0.05" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="goldVintage" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ca8a04" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Glowing background circle */}
            <circle cx="50" cy="50" r="45" fill="url(#mysticGlow)" stroke="none" />

            {/* Outer Astrolabe/Celestial Frame */}
            <circle cx="50" cy="50" r="46" className="stroke-mystic-wine/30" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="44" strokeDasharray="1, 4" className="stroke-mystic-wine-pale/50" strokeWidth="1" />
            <circle cx="50" cy="50" r="41" className="stroke-mystic-wine/15" strokeWidth="0.5" />
            
            {/* Celestial Coordinates / Radiating Rays */}
            <g className="stroke-mystic-wine/20" strokeWidth="0.5" strokeDasharray="3, 3">
              <line x1="50" y1="4" x2="50" y2="96" />
              <line x1="4" y1="50" x2="96" y2="50" />
              <line x1="17.5" y1="17.5" x2="82.5" y2="82.5" />
              <line x1="17.5" y1="82.5" x2="82.5" y2="17.5" />
            </g>

            {/* Outer Astrolabe Hour Markings / Ticks around the rim */}
            <g className="stroke-mystic-wine/40" strokeWidth="0.8">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x1 = 50 + 41 * Math.cos(angle);
                const y1 = 50 + 41 * Math.sin(angle);
                const x2 = 50 + 44 * Math.cos(angle);
                const y2 = 50 + 44 * Math.sin(angle);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
              })}
            </g>

            {/* Outer Hexagram Star (Triangle 1 - pointing up) */}
            <path d="M 50 18 L 77.7 66 L 22.3 66 Z" className="stroke-mystic-wine/80" strokeWidth="1" fill="rgba(156, 18, 40, 0.04)" />
            {/* Outer Hexagram Star (Triangle 2 - pointing down) */}
            <path d="M 50 82 L 77.7 34 L 22.3 34 Z" className="stroke-mystic-wine/80" strokeWidth="1" fill="rgba(156, 18, 40, 0.04)" />

            {/* Inner detailed Hexagram for 3D/layered retro look */}
            <path d="M 50 22 L 74.25 64 L 25.75 64 Z" stroke="url(#goldVintage)" strokeWidth="1.2" fill="none" />
            <path d="M 50 78 L 74.25 36 L 25.75 36 Z" stroke="url(#goldVintage)" strokeWidth="1.2" fill="none" />

            {/* Micro star lines connecting the vertices to create a central mandorla/hexagonal structure */}
            <g className="stroke-mystic-wine/25" strokeWidth="0.5">
              <line x1="50" y1="22" x2="50" y2="78" />
              <line x1="25.75" y1="36" x2="74.25" y2="64" />
              <line x1="25.75" y1="64" x2="74.25" y2="36" />
            </g>

            {/* Decorative Central Astrological Circle */}
            <circle cx="50" cy="50" r="14" className="stroke-mystic-wine/60" strokeWidth="0.8" fill="rgba(8, 2, 3, 0.6)" />
            <circle cx="50" cy="50" r="11" strokeDasharray="1, 2" className="stroke-amber-400/40" strokeWidth="0.8" />

            {/* Central Mystical Symbol (An elegant 8-pointed gold star in the center of the hexagram) */}
            <path d="M 50 42 L 52 48 L 58 50 L 52 52 L 50 58 L 48 52 L 42 50 L 48 48 Z" fill="url(#goldVintage)" className="animate-pulse" />
            <path d="M 50 45 L 51.5 48.5 L 55 50 L 51.5 51.5 L 50 55 L 48.5 51.5 L 45 50 L 48.5 48.5 Z" fill="#ffffff" />
            
            {/* Elegant circles & diamond ornaments at the 6 main vertices */}
            {/* Point 1: Top (50, 22) */}
            <circle cx="50" cy="22" r="2.5" className="fill-amber-400 stroke-mystic-wine" strokeWidth="0.8" />
            <circle cx="50" cy="22" r="5" className="stroke-amber-400/50" strokeWidth="0.5" />
            
            {/* Point 2: Top-Right (74.25, 36) */}
            <circle cx="74.25" cy="36" r="2.5" className="fill-amber-400 stroke-mystic-wine" strokeWidth="0.8" />
            <circle cx="74.25" cy="36" r="5" className="stroke-amber-400/50" strokeWidth="0.5" />

            {/* Point 3: Bottom-Right (74.25, 64) */}
            <circle cx="74.25" cy="64" r="2.5" className="fill-amber-400 stroke-mystic-wine" strokeWidth="0.8" />
            <circle cx="74.25" cy="64" r="5" className="stroke-amber-400/50" strokeWidth="0.5" />

            {/* Point 4: Bottom (50, 78) */}
            <circle cx="50" cy="78" r="2.5" className="fill-amber-400 stroke-mystic-wine" strokeWidth="0.8" />
            <circle cx="50" cy="78" r="5" className="stroke-amber-400/50" strokeWidth="0.5" />

            {/* Point 5: Bottom-Left (25.75, 64) */}
            <circle cx="25.75" cy="64" r="2.5" className="fill-amber-400 stroke-mystic-wine" strokeWidth="0.8" />
            <circle cx="25.75" cy="64" r="5" className="stroke-amber-400/50" strokeWidth="0.5" />

            {/* Point 6: Top-Left (25.75, 36) */}
            <circle cx="25.75" cy="36" r="2.5" className="fill-amber-400 stroke-mystic-wine" strokeWidth="0.8" />
            <circle cx="25.75" cy="36" r="5" className="stroke-amber-400/50" strokeWidth="0.5" />

            {/* Vintage decorative flourishes inside the outer triangles */}
            <path d="M 50 18 Q 43 28, 50 34" className="stroke-mystic-wine/40" strokeWidth="0.5" />
            <path d="M 50 18 Q 57 28, 50 34" className="stroke-mystic-wine/40" strokeWidth="0.5" />
            
            <path d="M 50 82 Q 43 72, 50 66" className="stroke-mystic-wine/40" strokeWidth="0.5" />
            <path d="M 50 82 Q 57 72, 50 66" className="stroke-mystic-wine/40" strokeWidth="0.5" />

            {/* Four-pointed vintage stars at extreme corners */}
            <g fill="url(#goldVintage)">
              <polygon points="50,6 51.5,10 50,14 48.5,10" />
              <polygon points="50,86 51.5,90 50,94 48.5,90" />
              <polygon points="10,50 14,51.5 10,53 6,51.5" />
              <polygon points="90,50 94,51.5 90,53 86,51.5" />
            </g>

            {/* Soft celestial sparkles */}
            <g className="fill-amber-400/80">
              <circle cx="28" cy="22" r="0.8" />
              <circle cx="72" cy="22" r="0.8" />
              <circle cx="16" cy="38" r="0.8" />
              <circle cx="84" cy="38" r="0.8" />
              <circle cx="16" cy="62" r="0.8" />
              <circle cx="84" cy="62" r="0.8" />
              <circle cx="28" cy="78" r="0.8" />
              <circle cx="72" cy="78" r="0.8" />
            </g>
          </svg>
          <div className="absolute w-24 h-24 bg-mystic-wine/10 rounded-full blur-2xl" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="space-y-3"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-[0.15em] text-white font-serif-cn leading-snug drop-shadow-[0_2px_10px_rgba(92,6,18,0.8)]">
            陈婧霏
            <span className="block text-xl md:text-2xl mt-1 font-semibold text-mystic-wine-pale tracking-[0.25em]">
              歌词答案之书
            </span>
          </h1>
          <p className="text-xs text-stone-300 font-light tracking-widest leading-relaxed max-w-[280px] mx-auto">
            所谓世界模样<br />
            不过是妳授权的幻象
          </p>
        </motion.div>
      </div>

      {/* Bottom Section: Enter Button & Sound Tip */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="flex flex-col items-center gap-6 w-full max-w-xs z-10"
      >
        {/* Elegant button wrapper */}
        <button
          id="start-oracle-button"
          onClick={onStart}
          className="relative w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#5c0612] to-[#9c1228] border border-mystic-wine/60 text-mystic-wine-pale hover:text-white hover:border-mystic-wine transition-all duration-300 font-medium font-serif-cn tracking-[0.3em] text-sm overflow-hidden shadow-[0_5px_20px_rgba(156,18,40,0.35)] active:scale-[0.98] group cursor-pointer"
        >
          {/* Glowing button sheen */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <span className="flex items-center justify-center gap-2 pl-3">
            开启答案之书
            <Sparkles className="w-4 h-4 text-mystic-wine-pale group-hover:scale-125 transition-transform" />
          </span>
        </button>
      </motion.div>
    </div>
  );
};

