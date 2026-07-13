import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LyricCard } from "../types";
import { CardBackPattern, CardFrontBorder } from "./MysticIcons";
import { mysticAudio } from "../utils/audio";
import { Sparkles, ArrowLeftRight, RefreshCw, ExternalLink, Share2 } from "lucide-react";
import { ShareModal } from "./ShareModal";
import { useCardHistory } from "../hooks/useCardHistory";
import { useAuth } from "../contexts/AuthContext";

interface CardDeckProps {
  cards: LyricCard[];
  onAuthRequired?: () => void;
}

export const CardDeck: React.FC<CardDeckProps> = ({ cards, onAuthRequired }) => {
  const { user } = useAuth();
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [drawnCard, setDrawnCard] = useState<LyricCard | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [lastTickOffset, setLastTickOffset] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { saveCardDraw } = useCardHistory();

  const isSecret = drawnCard?.songTitle === "隐藏";

  // Helper to determine lines and dynamic font styles for the lyrics
  const { lyricLines, lyricStyle } = (() => {
    if (!drawnCard?.lyrics) return { lyricLines: [], lyricStyle: {} };
    const raw = drawnCard.lyrics.trim();
    
    // Respect original line breaks without adding automated wraps or splitting words
    // Supports both standard newlines \n and HTML-style <br> / <br/> tags
    const lines = raw.split(/\n+|<br\s*\/?>/i);
    
    // Calculate visual character length
    const getVisualLength = (str: string) => {
      let len = 0;
      for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127) {
          len += 1.0; // Chinese character
        } else {
          len += 0.52; // Latin character / digit / punctuation / space
        }
      }
      return len;
    };
    
    const maxVisualLength = Math.max(...lines.map(line => getVisualLength(line)), 1);
    
    // We want maxVisualLength * fontSize * tracking <= availableWidth (~136px to fit safely in w-56)
    // Dynamic scaling based on the longest lyric line to ensure NO wrapping or overflow.
    const widthBasedSize = 136 / (maxVisualLength * 1.12);
    
    // We also want lines.length * fontSize * lineHeight <= availableHeight (~130px)
    const heightBasedSize = 130 / (lines.length * 1.45);
    
    // Cap font size dynamically - let it scale down further if the lyric is long to keep it readable and intact
    const calculatedSize = Math.max(6, Math.min(16, widthBasedSize, heightBasedSize));
    
    return {
      lyricLines: lines,
      lyricStyle: {
        fontSize: `${calculatedSize}px`,
        lineHeight: "1.45",
        textAlign: "center" as const,
        whiteSpace: "nowrap" as const,
      }
    };
  })();

  // Pick a random card
  const drawCard = () => {
    if (cards.length === 0) return;
    if (!user) {
      onAuthRequired?.();
      return;
    }
    setIsDrawing(true);
    setDragOffset(0);
    setLastTickOffset(0);

    // Play swipe sound + magic shimmer audio effect for deep tactile immersion
    mysticAudio.playSwipe();
    mysticAudio.playMagicShimmer();

    // Select random card
    const randomIndex = Math.floor(Math.random() * cards.length);
    const selectedCard = cards[randomIndex];
    setDrawnCard(selectedCard);
    setSubmittedQuestion(question);

    // Stagger flip sequence
    setTimeout(() => {
      setIsFlipped(true);
      mysticAudio.playFlip();
    }, 250);

    // Save card draw to history if user is logged in
    setTimeout(() => {
      saveCardDraw(question, selectedCard);
    }, 300);
  };

  // Reset the deck
  const handleReset = () => {
    // Play swipe sound when putting card back
    mysticAudio.playSwipe();
    setLastTickOffset(0);
    
    setIsFlipped(false);
    setTimeout(() => {
      setIsDrawing(false);
      setDrawnCard(null);
      setQuestion("");
      setSubmittedQuestion("");
    }, 600);
  };

  // Trigger draw by manual click as fallback or direct swipe trigger
  const handleDragEnd = (event: any, info: any) => {
    if (isDrawing) return;
    const thresh = 100;
    if (info.offset.x > thresh || info.offset.x < -thresh) {
       drawCard();
    } else {
      setDragOffset(0);
      setLastTickOffset(0);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center px-4 py-2 sm:py-4 h-full flex-1 justify-between relative z-10 select-none overflow-hidden">
      
      {/* 1. Header/Question input when not drawn */}
      <AnimatePresence mode="wait">
        {!isDrawing ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full text-center space-y-4 mb-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] text-mystic-wine uppercase tracking-[0.2em] font-serif-en block">
                Ask crimson witch a question
              </span>
              <h2 className="text-xl font-serif-cn font-bold text-white tracking-widest">
                向猩红女巫提问
              </h2>
            </div>

            {/* Elegant Vintage styled Question input */}
            <div className="relative w-full max-w-xs mx-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-mystic-wine/50">
                🔮
              </div>
              <input
                id="question-oracle-input"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="在此输入问题，或在心中默念..."
                className="w-full bg-[#1a0104]/80 border border-mystic-wine/30 rounded-full pl-9 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-mystic-wine focus:ring-1 focus:ring-mystic-wine/20 transition-all font-serif-cn text-center"
              />
            </div>
          </motion.div>
        ) : (
          /* Question Display in Result State */
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full text-center py-2"
          >
            {submittedQuestion ? (
              <div className="inline-block px-4 py-2 bg-mystic-crimson/10 border border-mystic-wine/15 rounded-full max-w-xs">
                
                <span className="text-xs text-mystic-wine-pale font-serif-cn font-medium tracking-wider">
                  “{submittedQuestion}”
                </span>
              </div>
            ) : (
              <span className="text-[10px] text-mystic-wine/60 uppercase tracking-[0.3em] font-serif-en">
                ORACLE DECREE · 结果
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Interactive Card Deck Area */}
      <div className="relative w-72 h-[340px] sm:h-[400px] md:h-[420px] flex items-center justify-center perspective-[1200px] my-1 sm:my-3">
        <motion.div
          key="unified-mystic-card"
          onPan={(event, info) => {
            if (isDrawing) return;
            const currentOffset = info.offset.x;
            setDragOffset(currentOffset);
            // Play soft tactile card rustle/tick sound every 25px of horizontal displacement
            if (Math.abs(currentOffset - lastTickOffset) > 25) {
              mysticAudio.playDragTick();
              setLastTickOffset(currentOffset);
            }
          }}
          onPanEnd={handleDragEnd}
          whileHover={!isDrawing ? { scale: 1.02 } : undefined}
          whileTap={!isDrawing ? { scale: 1.05 } : undefined}
          style={{ 
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
          }}
          className={`relative w-56 h-[310px] sm:w-64 sm:h-[380px] rounded-2xl z-40 transition-shadow ${
            !isDrawing ? "cursor-grab active:cursor-grabbing hover:shadow-[0_0_30px_rgba(156,18,40,0.35)]" : "cursor-default"
          }`}
          initial={{ opacity: 0, y: 50, scale: 0.9, rotateY: 0 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateY: isFlipped ? 180 : (dragOffset * 0.4),
            rotateZ: isFlipped ? 0 : (dragOffset * 0.04),
            boxShadow: isFlipped 
              ? (isSecret ? "0 0 50px rgba(245,158,11,0.5)" : "0 0 40px rgba(156,18,40,0.35)")
              : "0 0 20px rgba(92,6,18,0.3)"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 80, 
            damping: 18,
            rotateY: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* Back of Card (visible when not flipped) */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden transition-opacity duration-300"
            style={{ 
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              opacity: isFlipped ? 0 : 1,
              pointerEvents: isFlipped ? "none" : "auto"
            }}
          >
            <CardBackPattern />

            {/* Floating Swiping Indicators overlay on card back */}
            {!isDrawing && (
              <div className="absolute inset-0 flex flex-col justify-between items-center py-16 pointer-events-none select-none z-20">
                <motion.div 
                  animate={{ x: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-1 text-mystic-wine-pale/35"
                >
                  <ArrowLeftRight className="w-5 h-5 animate-pulse" />
                  <span className="text-[9px] tracking-[0.25em] font-serif-cn">
                    左右滑动抽牌
                  </span>
                </motion.div>
              </div>
            )}

            {/* Stack effect behind the card */}
            {!isDrawing && (
              <>
                <div className="absolute -inset-1.5 bg-mystic-wine/5 rounded-2xl border border-mystic-wine/10 -z-10 translate-y-2 translate-x-1 rotate-1 scale-[0.99] pointer-events-none" />
                <div className="absolute -inset-3 bg-mystic-crimson/5 rounded-2xl border border-mystic-crimson/10 -z-20 translate-y-4 -translate-x-1 -rotate-1 scale-[0.98] pointer-events-none" />
              </>
            )}
          </div>

          {/* Front of Card (visible when flipped) */}
          <div 
            className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden transition-opacity duration-300 border-4 ${
              isSecret 
                ? "bg-gradient-to-b from-[#1c1303] via-[#0a0701] to-[#020100] border-amber-400/90" 
                : "bg-gradient-to-b from-[#1c0205] to-[#080001] border-mystic-wine/80"
            }`}
            style={{ 
              backfaceVisibility: "hidden", 
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              WebkitTransform: "rotateY(180deg)",
              backgroundImage: isSecret 
                ? `radial-gradient(#1c1402 1.5px, transparent 1.5px)` 
                : `radial-gradient(#120103 1.5px, transparent 1.5px)`,
              backgroundSize: "20px 20px",
              opacity: isFlipped ? 1 : 0,
              pointerEvents: isFlipped ? "auto" : "none"
            }}
          >
            {/* Dust scratch overlay */}
            <div className="absolute inset-0 bg-black/15 opacity-40 pointer-events-none paper-texture" />

            {/* Card front outer borders */}
            <CardFrontBorder isSecret={isSecret} />

            {/* Internal layout */}
            <div className="absolute inset-4 flex flex-col justify-between items-center py-6 px-4 z-20 text-center">
              
              {/* Card Name / Symbol Header */}
              <div className="space-y-0.5">
                {isSecret && (
                  <span className="text-[8px] bg-amber-500/10 border border-amber-400/30 text-amber-400 px-1.5 py-0.5 rounded-full tracking-[0.15em] font-serif-cn font-bold animate-pulse inline-block mb-1">
                    ✦ 隐藏款 · SECRET ✦
                  </span>
                )}
                <span className={`text-[11px] sm:text-xs font-bold tracking-[0.2em] font-serif-en uppercase block ${isSecret ? "text-amber-300 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]" : "text-mystic-wine-pale"}`}>
                  {drawnCard?.cardName ? drawnCard.cardName.split(" (")[1]?.replace(")", "") : "THE ORACLE"}
                </span>
                <span className={`text-xs font-serif-cn font-bold tracking-widest block ${isSecret ? "text-amber-400" : "text-mystic-wine"}`}>
                  {drawnCard?.cardName ? drawnCard.cardName.split(" (")[0] : "宿命签章"}
                </span>
              </div>

              {/* Division line */}
              <div className={`w-16 flex items-center justify-center gap-1 ${isSecret ? "text-amber-400/40" : "text-mystic-wine/40"}`}>
                <div className="w-4 h-[0.5px] bg-current" />
                <span className="text-[8px]">{isSecret ? "★" : "✦"}</span>
                <div className="w-4 h-[0.5px] bg-current" />
              </div>

              {/* LYRICS CENTER DISPLAY (Fitted neatly with dynamic font sizing) */}
              <div className="flex-1 flex flex-col justify-center items-center px-2 py-1 max-h-[160px] overflow-hidden w-full">
                <div 
                  style={lyricStyle}
                  className={`font-serif-cn font-medium tracking-[0.12em] italic select-text flex flex-col items-center justify-center gap-1.5 w-full overflow-hidden ${
                    isSecret ? "text-amber-100/95 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]" : "text-stone-100"
                  }`}
                >
                  {lyricLines.map((line, idx) => {
                    return (
                      <span 
                        key={idx} 
                        className="block w-full text-center whitespace-nowrap overflow-visible"
                        title={line}
                      >
                        {line}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Division line (Lower) */}
              <div className={`w-16 flex items-center justify-center gap-1 ${isSecret ? "text-amber-400/40" : "text-mystic-wine/40"}`}>
                <div className="w-4 h-[0.5px] bg-current" />
                <span className="text-[8px]">{isSecret ? "★" : "✦"}</span>
                <div className="w-4 h-[0.5px] bg-current" />
              </div>

              {/* SONG TITLE BOX */}
              <div className={`mt-1.5 sm:mt-3 py-1 sm:py-1.5 px-3 sm:px-4 border rounded-md inline-block max-w-[180px] overflow-hidden truncate ${
                isSecret 
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-400" 
                  : "border-mystic-wine/30 bg-[#2d050a]/40 text-mystic-wine"
              }`}>
                <span className={`text-[10px] font-serif-cn block tracking-wider uppercase mb-0.5 scale-90 ${
                  isSecret ? "text-amber-200/60" : "text-mystic-wine-pale/55"
                }`}>
                  {isSecret ? "SECRET" : "FROM"}
                </span>
                <span className={`text-xs font-serif-cn font-bold tracking-widest block truncate ${
                  isSecret ? "text-amber-300" : "text-mystic-wine"
                }`}>
                  {isSecret ? drawnCard?.songTitle : `${drawnCard?.songTitle} `}
                </span>
              </div>

            </div>

            {/* Inner background signature markings */}
            <div className={`absolute bottom-2 left-4 text-[7px] font-mono select-none tracking-widest uppercase ${
              isSecret ? "text-amber-500/35" : "text-mystic-wine/25"
            }`}>
              CHEN JINGFEI
            </div>
            <div className={`absolute bottom-2 right-4 text-[7px] font-mono select-none tracking-widest uppercase ${
              isSecret ? "text-amber-500/35" : "text-mystic-wine/25"
            }`}>
              ARCANA No.{drawnCard?.id.split("-")[1] || "01"}{isSecret && " · SPECIAL"}
            </div>
          </div>

          {/* Outer Sparkle aura */}
          {isFlipped && (
            <div className={`absolute -inset-4 rounded-3xl blur-md -z-10 animate-pulse ${
              isSecret ? "bg-amber-500/20" : "bg-mystic-wine/10"
            }`} />
          )}
        </motion.div>
      </div>

      {/* 3. Action / Navigation Button Panel */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3 relative z-30">
        <AnimatePresence mode="wait">
          {!isDrawing ? (
            /* Interactive helper button if not drawing */
            <motion.button
              id="draw-trigger-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={drawCard}
              className="py-3 px-6 rounded-full bg-transparent border border-mystic-wine/40 hover:border-mystic-wine text-mystic-wine-pale hover:text-white text-xs tracking-[0.25em] font-serif-cn active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-mystic-wine animate-spin-slow" />
              直接抽取卡牌
            </motion.button>
          ) : (
            /* Result Action buttons: Music Jump + Retry */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col gap-2.5"
            >
              {/* Listen to the song button */}
              {drawnCard?.songLink && !isSecret && (
                <a
                  id="song-listening-link"
                  href={drawnCard.songLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#5c0612] to-[#9c1228] border border-mystic-wine/60 hover:border-mystic-wine text-white text-center font-serif-cn text-xs font-bold tracking-[0.2em] flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(156,18,40,0.45)] active:scale-[0.98] transition-all"
                >
                  <span>在网易云打开</span>
                  <ExternalLink className="w-3.5 h-3.5 text-mystic-wine-pale" />
                </a>
              )}

              {/* Share Card Poster Button */}
              <button
                id="share-oracle-button"
                onClick={() => setIsShareOpen(true)}
                className={`w-full py-3.5 rounded-full border text-center font-serif-cn text-xs font-bold tracking-[0.2em] flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer ${
                  isSecret
                    ? "bg-[#251804]/60 border-amber-500/40 hover:border-amber-400 text-amber-400 hover:text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    : "bg-[#1f0205]/60 border-mystic-wine/40 hover:border-mystic-wine text-mystic-wine-pale hover:text-white shadow-[0_0_15px_rgba(156,18,40,0.15)]"
                }`}
              >
                <span>分享我的人间指南</span>
                <Share2 className={`w-3.5 h-3.5 ${isSecret ? "text-amber-400" : "text-mystic-wine"}`} />
              </button>

              {/* Try Again / Redraw */}
              <button
                id="redraw-deck-button"
                onClick={handleReset}
                className="w-full py-3 rounded-full bg-black/60 border border-stone-800 hover:border-mystic-wine text-stone-300 hover:text-white text-center font-serif-cn text-xs tracking-[0.25em] flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-mystic-wine" />
                重新抽卡
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        card={drawnCard}
        isSecret={isSecret}
      />

    </div>
  );
};
