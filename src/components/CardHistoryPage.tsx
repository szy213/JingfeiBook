import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useCardHistory } from "../hooks/useCardHistory";

interface CardHistoryPageProps {
  onBack: () => void;
}

interface CollectedCard {
  card_id: string;
  card_name: string;
  is_secret: boolean;
}

function parseCardName(cardName: string): { number: string; word: string; english: string } {
  // "39 · 微光 (Shimmer)" → number: "39", word: "微光", english: "Shimmer"
  const parts = cardName.split("·");
  if (parts.length >= 2) {
    const number = parts[0].trim();
    const rest = parts[1].trim();
    const word = rest.split("(")[0].trim();
    const englishMatch = rest.match(/\(([^)]+)\)/);
    const english = englishMatch ? englishMatch[1].replace(/^The\s+/i, "") : "";
    return { number, word, english };
  }
  return { number: "", word: cardName, english: "" };
}

const CollectionCard: React.FC<{ card: CollectedCard }> = ({ card }) => {
  const { number, word, english } = parseCardName(card.card_name);
  const isSecret = card.is_secret;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full aspect-[3/4] rounded-xl overflow-hidden"
    >
      {/* Card background */}
      <div
        className={`absolute inset-0 border-2 ${
          isSecret
            ? "bg-gradient-to-b from-[#1c1303] via-[#0a0701] to-[#020100] border-amber-400/70"
            : "bg-gradient-to-b from-[#1c0205] to-[#080001] border-mystic-wine/60"
        }`}
        style={{
          backgroundImage: isSecret
            ? "radial-gradient(#1c1402 1px, transparent 1px)"
            : "radial-gradient(#120103 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Dust overlay */}
      <div className="absolute inset-0 bg-black/10 opacity-30 pointer-events-none" />

      {/* Corner ornaments */}
      <div className={`absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l rounded-tl-sm ${
        isSecret ? "border-amber-400/40" : "border-mystic-wine/40"
      }`} />
      <div className={`absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r rounded-tr-sm ${
        isSecret ? "border-amber-400/40" : "border-mystic-wine/40"
      }`} />
      <div className={`absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l rounded-bl-sm ${
        isSecret ? "border-amber-400/40" : "border-mystic-wine/40"
      }`} />
      <div className={`absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r rounded-br-sm ${
        isSecret ? "border-amber-400/40" : "border-mystic-wine/40"
      }`} />

      {/* Hidden badge */}
      {isSecret && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[7px] bg-amber-500/15 border border-amber-400/30 text-amber-400 px-1.5 py-0.5 rounded-full tracking-wider font-serif-cn">
            ✦ 隐藏
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-3">
        <span className={`text-lg sm:text-xl font-serif-cn font-bold tracking-widest ${
          isSecret ? "text-amber-400" : "text-mystic-wine"
        }`}>
          {number}
        </span>
        {english ? (
          <span className={`text-[10px] sm:text-xs font-serif-en tracking-[0.15em] uppercase font-semibold ${
            isSecret ? "text-amber-300/90" : "text-mystic-wine/80"
          }`}>
            {english}
          </span>
        ) : (
          <div className={`w-6 h-[0.5px] ${isSecret ? "bg-amber-400/40" : "bg-mystic-wine/40"}`} />
        )}
        <span className={`text-sm sm:text-base font-serif-cn font-medium tracking-wider ${
          isSecret ? "text-amber-200/90" : "text-mystic-wine-pale"
        }`}>
          {word}
        </span>
      </div>

      {/* Footer mark */}
      <div className={`absolute bottom-1.5 right-2 text-[6px] font-mono tracking-widest uppercase ${
        isSecret ? "text-amber-500/25" : "text-mystic-wine/20"
      }`}>
        No.{number}
      </div>
    </motion.div>
  );
};

export const CardHistoryPage: React.FC<CardHistoryPageProps> = ({ onBack }) => {
  const { fetchUserCards } = useCardHistory();
  const [cards, setCards] = useState<CollectedCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserCards().then((data) => {
      setCards(data);
      setLoading(false);
    });
  }, [fetchUserCards]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-50 bg-mystic-charcoal overflow-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-mystic-charcoal/95 backdrop-blur-sm border-b border-mystic-wine/15">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="p-2 text-stone-400 hover:text-mystic-wine rounded-full bg-black/30 border border-stone-800 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] text-stone-300 tracking-widest font-serif-cn">返回</span>
          </button>
          <h2 className="text-base font-serif-cn font-bold text-white tracking-widest">
            我的卡牌
          </h2>
          <div className="w-[60px]" />
        </div>
      </div>

      {/* Card Grid */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-sm text-stone-400 font-serif-cn tracking-wider animate-pulse">
              加载中...
            </span>
          </div>
        ) : cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-sm text-stone-500 font-serif-cn tracking-wider">
              还没有抽到任何卡牌
            </span>
            <button
              onClick={onBack}
              className="text-xs text-mystic-wine hover:text-mystic-wine-pale font-serif-cn tracking-wider transition-colors cursor-pointer"
            >
              去抽取第一张卡牌 →
            </button>
          </div>
        ) : (
          <>
            <p className="text-[10px] text-stone-500 text-center mb-5 tracking-wider font-serif-cn">
              已收集 {cards.length} 张卡牌
            </p>
            <div className="grid grid-cols-3 gap-3">
              {cards.map((card) => (
                <CollectionCard key={card.card_id} card={card} />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
