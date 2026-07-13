import React from "react";

/**
 * Intricate, symmetrical wine-red vine-entwined pattern for the Tarot card back
 */
export const CardBackPattern: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full p-4 flex flex-col justify-between items-center bg-gradient-to-b from-[#5c0612] to-[#080203] rounded-2xl border-4 border-mystic-wine overflow-hidden">
      {/* Intricate Wine Grid / Filigree Background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
        backgroundImage: `radial-gradient(#9c1228 1px, transparent 1px)`,
        backgroundSize: "24px 24px"
      }} />

      {/* Outer Wine Border Filigree Lines */}
      <div className="absolute inset-2 border border-mystic-wine/40 rounded-xl pointer-events-none flex items-center justify-center">
        {/* Corner Accents */}
        <div className="absolute top-1 left-1 w-6 h-6 border-t border-l border-mystic-wine flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-mystic-wine rounded-full" />
        </div>
        <div className="absolute top-1 right-1 w-6 h-6 border-t border-r border-mystic-wine flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-mystic-wine rounded-full" />
        </div>
        <div className="absolute bottom-1 left-1 w-6 h-6 border-b border-l border-mystic-wine flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-mystic-wine rounded-full" />
        </div>
        <div className="absolute bottom-1 right-1 w-6 h-6 border-b border-r border-mystic-wine flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-mystic-wine rounded-full" />
        </div>
      </div>

      {/* Top Symmetrical Vine Ornaments */}
      <div className="w-full h-1/4 relative flex justify-center opacity-85 z-10">
        <svg viewBox="0 0 200 100" className="w-40 h-auto text-mystic-wine fill-none stroke-current" strokeWidth="1.5">
          {/* Symmetrical Left Vine */}
          <path d="M 100 10 Q 70 10 60 30 Q 50 50 70 50 Q 80 50 90 35" />
          <path d="M 75 20 Q 80 15 85 22" />
          <path d="M 62 40 Q 67 42 63 48" />
          <path d="M 52 45 Q 40 40 45 30 Q 50 20 60 25" />
          <circle cx="45" cy="30" r="2.5" className="fill-mystic-wine" />
          <circle cx="85" cy="22" r="1.5" className="fill-mystic-wine" />

          {/* Symmetrical Right Vine */}
          <path d="M 100 10 Q 130 10 140 30 Q 150 50 130 50 Q 120 50 110 35" />
          <path d="M 125 20 Q 120 15 115 22" />
          <path d="M 138 40 Q 133 42 137 48" />
          <path d="M 148 45 Q 160 40 155 30 Q 150 20 140 25" />
          <circle cx="155" cy="30" r="2.5" className="fill-mystic-wine" />
          <circle cx="115" cy="22" r="1.5" className="fill-mystic-wine" />

          {/* Central Hanging Star */}
          <line x1="100" y1="10" x2="100" y2="40" strokeDasharray="3,3" />
          <polygon points="100,45 102,41 106,40 102,39 100,35 98,39 94,40 98,41" className="fill-mystic-wine stroke-none" />
        </svg>
      </div>

      {/* Central Mystical Symbol: Moon Phases & Eye of Intuition */}
      <div className="relative w-28 h-28 flex items-center justify-center z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-mystic-wine fill-none stroke-current" strokeWidth="1.2">
          {/* Outer Sun / Star Rays Circle */}
          <circle cx="50" cy="50" r="32" strokeDasharray="1, 5" strokeWidth="2" />
          <circle cx="50" cy="50" r="28" className="opacity-40" />

          {/* Moon Phase: Left Crescent */}
          <path d="M 32 50 A 12 12 0 0 0 44 38 A 12 12 0 0 1 38 50 A 12 12 0 0 1 44 62 A 12 12 0 0 0 32 50" className="fill-mystic-wine/30" />
          
          {/* Moon Phase: Right Crescent */}
          <path d="M 68 50 A 12 12 0 0 1 56 38 A 12 12 0 0 0 62 50 A 12 12 0 0 0 56 62 A 12 12 0 0 1 68 50" className="fill-mystic-wine/30" />

          {/* Moon Phase: Center Full Moon with Star */}
          <circle cx="50" cy="50" r="12" className="fill-mystic-wine/20" strokeWidth="1.5" />
          {/* Concentric 8-pointed star in full moon */}
          <g transform="translate(50, 50) scale(0.6)">
            <polygon points="0,-18 4,-6 16,-6 6,2 10,14 0,7 -10,14 -6,2 -16,-6 -4,-6" className="fill-mystic-wine" />
            <polygon points="0,-12 3,-4 11,-4 4,1 7,9 0,5 -7,9 -4,1 -11,-4 -3,-4" className="fill-mystic-wine-pale stroke-none" />
          </g>

          {/* Surrounding Constellation Lines */}
          <line x1="50" y1="10" x2="50" y2="20" />
          <line x1="50" y1="80" x2="50" y2="90" />
          <line x1="10" y1="50" x2="20" y2="50" />
          <line x1="80" y1="50" x2="90" y2="50" />
          
          <circle cx="50" cy="10" r="1.5" className="fill-mystic-wine" />
          <circle cx="50" cy="90" r="1.5" className="fill-mystic-wine" />
          <circle cx="10" cy="50" r="1.5" className="fill-mystic-wine" />
          <circle cx="90" cy="50" r="1.5" className="fill-mystic-wine" />
        </svg>
      </div>

      {/* Bottom Symmetrical Vine Ornaments (Mirrored) */}
      <div className="w-full h-1/4 relative flex justify-center opacity-85 z-10 rotate-180">
        <svg viewBox="0 0 200 100" className="w-40 h-auto text-mystic-wine fill-none stroke-current" strokeWidth="1.5">
          <path d="M 100 10 Q 70 10 60 30 Q 50 50 70 50 Q 80 50 90 35" />
          <path d="M 75 20 Q 80 15 85 22" />
          <path d="M 62 40 Q 67 42 63 48" />
          <path d="M 52 45 Q 40 40 45 30 Q 50 20 60 25" />
          <circle cx="45" cy="30" r="2.5" className="fill-mystic-wine" />
          <circle cx="85" cy="22" r="1.5" className="fill-mystic-wine" />

          <path d="M 100 10 Q 130 10 140 30 Q 150 50 130 50 Q 120 50 110 35" />
          <path d="M 125 20 Q 120 15 115 22" />
          <path d="M 138 40 Q 133 42 137 48" />
          <path d="M 148 45 Q 160 40 155 30 Q 150 20 140 25" />
          <circle cx="155" cy="30" r="2.5" className="fill-mystic-wine" />
          <circle cx="115" cy="22" r="1.5" className="fill-mystic-wine" />

          <line x1="100" y1="10" x2="100" y2="40" strokeDasharray="3,3" />
          <polygon points="100,45 102,41 106,40 102,39 100,35 98,39 94,40 98,41" className="fill-mystic-wine stroke-none" />
        </svg>
      </div>

      {/* Symmetrical Corner Vines details */}
      <div className="absolute top-8 left-8 text-mystic-wine/25 font-serif-en text-[9px] select-none uppercase tracking-[0.2em] pointer-events-none">
        LA FORCE
      </div>
      <div className="absolute bottom-8 right-8 text-mystic-wine/25 font-serif-en text-[9px] select-none uppercase tracking-[0.2em] rotate-180 pointer-events-none">
        LA FORCE
      </div>
    </div>
  );
};

/**
 * Elegant wine-red border for the front of Tarot Cards (or Gold for Secret card)
 */
export const CardFrontBorder: React.FC<{ isSecret?: boolean }> = ({ isSecret }) => {
  return (
    <div className={`absolute inset-0 border-4 ${isSecret ? "border-amber-400/90" : "border-mystic-wine"} rounded-2xl p-3 pointer-events-none z-10`}>
      {/* Delicate Inner Frame */}
      <div className={`absolute inset-1 border ${isSecret ? "border-amber-400/35" : "border-mystic-wine/40"} rounded-xl`} />
      
      {/* Corner Ornaments */}
      <div className={`absolute top-1.5 left-1.5 w-6 h-6 border-t-2 border-l-2 ${isSecret ? "border-amber-400/90" : "border-mystic-wine"} rounded-tl-sm flex items-center justify-center`}>
        <div className={`absolute top-1 left-1 w-1.5 h-1.5 ${isSecret ? "bg-amber-400" : "bg-mystic-wine"} rotate-45`} />
      </div>
      <div className={`absolute top-1.5 right-1.5 w-6 h-6 border-t-2 border-r-2 ${isSecret ? "border-amber-400/90" : "border-mystic-wine"} rounded-tr-sm flex items-center justify-center`}>
        <div className={`absolute top-1 right-1 w-1.5 h-1.5 ${isSecret ? "bg-amber-400" : "bg-mystic-wine"} rotate-45`} />
      </div>
      <div className={`absolute bottom-1.5 left-1.5 w-6 h-6 border-b-2 border-l-2 ${isSecret ? "border-amber-400/90" : "border-mystic-wine"} rounded-bl-sm flex items-center justify-center`}>
        <div className={`absolute bottom-1 left-1 w-1.5 h-1.5 ${isSecret ? "bg-amber-400" : "bg-mystic-wine"} rotate-45`} />
      </div>
      <div className={`absolute bottom-1.5 right-1.5 w-6 h-6 border-b-2 border-r-2 ${isSecret ? "border-amber-400/90" : "border-mystic-wine"} rounded-br-sm flex items-center justify-center`}>
        <div className={`absolute bottom-1 right-1 w-1.5 h-1.5 ${isSecret ? "bg-amber-400" : "bg-mystic-wine"} rotate-45`} />
      </div>

      {/* Minimal Top & Bottom Accents */}
      <div className={`absolute top-2 left-1/2 -translate-x-1/2 ${isSecret ? "text-amber-400/70" : "text-mystic-wine/60"}`}>
        <svg viewBox="0 0 40 10" className="w-8 h-auto fill-current">
          <circle cx="20" cy="5" r="2" />
          <path d="M 0 5 L 14 5 M 26 5 L 40 5" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 ${isSecret ? "text-amber-400/70" : "text-mystic-wine/60"} rotate-180`}>
        <svg viewBox="0 0 40 10" className="w-8 h-auto fill-current">
          <circle cx="20" cy="5" r="2" />
          <path d="M 0 5 L 14 5 M 26 5 L 40 5" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
};

/**
 * Custom retro LP vinyl rotating music player component
 */
interface VinylPlayerProps {
  isPlaying: boolean;
  onClick: () => void;
  volume: number;
  onVolumeChange: (v: number) => void;
}

export const VinylRecordPlayer: React.FC<VinylPlayerProps> = ({
  isPlaying,
  onClick,
  volume,
  onVolumeChange
}) => {
  const [showSlider, setShowSlider] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing halo */}
        <div className={`absolute -inset-1 bg-mystic-wine/20 rounded-full blur-sm transition-all duration-700 ${isPlaying ? "opacity-100 scale-105" : "opacity-0 scale-95"}`} />

        {/* Vinyl Container */}
        <button
          id="vinyl-toggle-button"
          onClick={onClick}
          className="relative w-12 h-12 rounded-full bg-neutral-900 border border-mystic-wine/40 flex items-center justify-center cursor-pointer overflow-hidden active:scale-95 transition-transform shadow-lg z-20 group"
          title={isPlaying ? "暂停音乐" : "播放音乐"}
        >
          {/* Vinyl Record Lines */}
          <div 
            className={`absolute inset-0.5 rounded-full border border-neutral-800 flex items-center justify-center bg-radial from-neutral-800 via-neutral-950 to-neutral-900 ${isPlaying ? "animate-[spin_4s_linear_infinite]" : "rotate-12 transition-transform duration-1000"}`}
            style={{
              backgroundImage: "repeating-radial-gradient(circle, #1a1a1a, #1a1a1a 2px, #0f0f0f 3px, #0f0f0f 4px)"
            }}
          >
            {/* Center Label */}
            <div className="w-4.5 h-4.5 rounded-full bg-mystic-crimson border border-mystic-wine/40 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-mystic-wine rounded-full" />
            </div>
          </div>
          
          {/* Hover state needle guide */}
          <div className="absolute top-1 right-2 w-1.5 h-4 bg-mystic-wine/80 rounded-full origin-top rotate-12 group-hover:rotate-0 transition-transform pointer-events-none" />
        </button>

        {/* Volume adjust expand button */}
        <button
          id="volume-adjust-button"
          onClick={() => setShowSlider(!showSlider)}
          className="absolute -bottom-2 -right-2 bg-neutral-900 text-mystic-wine border border-mystic-wine/30 rounded-full w-5 h-5 flex items-center justify-center hover:bg-mystic-crimson transition-colors z-30 font-semibold"
        >
          <span className="text-[9px]">VOL</span>
        </button>
      </div>

      {/* Popover volume slider */}
      {showSlider && (
        <div className="absolute top-16 right-4 bg-[#1a0104]/90 border border-mystic-wine/40 rounded-lg p-2.5 flex items-center gap-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="text-[10px] text-mystic-wine font-mono">🔊</span>
          <input
            id="volume-slider-range"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 accent-mystic-wine cursor-pointer bg-neutral-800 rounded-lg appearance-none h-1"
          />
          <span className="text-[10px] text-mystic-wine font-mono w-6 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Twinkling magical stars backdrop effect in wine/charcoal
 */
export const MysticalBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient gradient layer */}
      <div className="absolute inset-0 bg-radial-at-t from-[#360309] via-[#0a0204] to-[#040102]" />

      {/* Glowing mystical wheel at the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-mystic-wine/10 opacity-20 animate-[spin_100s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-dashed border-mystic-wine/15 opacity-25 animate-[spin_60s_linear_infinite_reverse]" />
    </div>
  );
};

