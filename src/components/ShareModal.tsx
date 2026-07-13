import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LyricCard } from "../types";
import { Copy, Check, X } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: LyricCard | null;
  isSecret: boolean;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  card,
  isSecret,
}) => {
  const [copied, setCopied] = useState(false);
  const [posterUrl, setPosterUrl] = useState("");

  // Process lyrics for display and copying
  const rawLyrics = card?.lyrics.trim() || "";
  const hasChinese = /[\u4e00-\u9fa5]/.test(rawLyrics);
  const lyricLines = hasChinese ? rawLyrics.split(/[\s\n]+/) : rawLyrics.split(/\n+/);

  // Generate poster image on mount / when card changes
  useEffect(() => {
    if (!isOpen || !card) return;

    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 960;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createRadialGradient(320, 480, 50, 320, 480, 500);
    if (isSecret) {
      grad.addColorStop(0, "#1c1303");
      grad.addColorStop(0.5, "#0a0701");
      grad.addColorStop(1, "#020100");
    } else {
      grad.addColorStop(0, "#1c0205");
      grad.addColorStop(1, "#080001");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 960);

    // Background radial dots texture
    ctx.fillStyle = isSecret ? "rgba(251, 191, 36, 0.08)" : "rgba(156, 18, 40, 0.08)";
    for (let x = 10; x < 640; x += 30) {
      for (let y = 10; y < 960; y += 30) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const themeColor = isSecret ? "#fbbf24" : "#9c1228";
    const themeColorDim = isSecret ? "rgba(251, 191, 36, 0.35)" : "rgba(156, 18, 40, 0.35)";

    // Outer double border
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 600, 920);
    ctx.strokeStyle = themeColorDim;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(30, 30, 580, 900);

    // Corner ornaments
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(45, 30); ctx.lineTo(30, 30); ctx.lineTo(30, 45); ctx.stroke();
    ctx.fillStyle = themeColor; ctx.beginPath(); ctx.arc(38, 38, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(595, 30); ctx.lineTo(610, 30); ctx.lineTo(610, 45); ctx.stroke();
    ctx.beginPath(); ctx.arc(602, 38, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(45, 930); ctx.lineTo(30, 930); ctx.lineTo(30, 915); ctx.stroke();
    ctx.beginPath(); ctx.arc(38, 922, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(595, 930); ctx.lineTo(610, 930); ctx.lineTo(610, 915); ctx.stroke();
    ctx.beginPath(); ctx.arc(602, 922, 3, 0, Math.PI * 2); ctx.fill();

    // Header graphics
    ctx.fillStyle = themeColorDim;
    ctx.beginPath(); ctx.arc(320, 48, 4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = themeColorDim;
    ctx.beginPath(); ctx.moveTo(180, 48); ctx.lineTo(290, 48); ctx.moveTo(350, 48); ctx.lineTo(460, 48); ctx.stroke();

    // Header titles
    ctx.textAlign = "center";
    if (isSecret) {
      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText("✦ 隐藏款 · SECRET ✦", 320, 95);
    }

    const engName = card.cardName.split(" (")[1]?.replace(")", "") || "THE ORACLE";
    ctx.fillStyle = isSecret ? "#fbbf24" : "#e8c5c8";
    ctx.font = "bold 17px Georgia, serif";
    ctx.fillText(engName.toUpperCase(), 320, isSecret ? 135 : 110);

    const cnName = card.cardName.split(" (")[0] || "宿命签章";
    ctx.fillStyle = isSecret ? "#fbbf24" : "#db2777";
    ctx.font = "bold 26px Georgia, serif";
    ctx.fillText(cnName, 320, isSecret ? 180 : 155);

    // Upper divider
    ctx.strokeStyle = themeColorDim;
    ctx.beginPath(); ctx.moveTo(220, 240); ctx.lineTo(420, 240); ctx.stroke();
    ctx.fillStyle = themeColor;
    ctx.font = "14px sans-serif";
    ctx.fillText(isSecret ? "★" : "✦", 320, 245);

    // Lyrics
    ctx.fillStyle = isSecret ? "#fef3c7" : "#fafaf9";
    const maxLineLen = Math.max(...lyricLines.map(line => line.length));
    if (maxLineLen > 22) ctx.font = "italic 16px Georgia, serif";
    else if (maxLineLen > 15) ctx.font = "italic 19px Georgia, serif";
    else ctx.font = "italic 22px Georgia, serif";

    const lyricsYCenter = 460;
    const lyricLineHeight = 46;
    const startY = lyricsYCenter - ((lyricLines.length - 1) * lyricLineHeight) / 2;
    lyricLines.forEach((line, index) => {
      ctx.fillText(line, 320, startY + index * lyricLineHeight);
    });

    // Lower divider
    ctx.strokeStyle = themeColorDim;
    ctx.beginPath(); ctx.moveTo(220, 680); ctx.lineTo(420, 680); ctx.stroke();
    ctx.fillStyle = themeColor;
    ctx.font = "14px sans-serif";
    ctx.fillText(isSecret ? "★" : "✦", 320, 685);

    // Song attribution box
    ctx.strokeStyle = isSecret ? "rgba(251, 191, 36, 0.45)" : "rgba(156, 18, 40, 0.35)";
    ctx.fillStyle = isSecret ? "rgba(251, 191, 36, 0.08)" : "rgba(45, 5, 10, 0.4)";
    const boxX = 170, boxY = 730, boxW = 300, boxH = 90, br = 8;
    ctx.beginPath();
    ctx.moveTo(boxX + br, boxY);
    ctx.lineTo(boxX + boxW - br, boxY);
    ctx.quadraticCurveTo(boxX + boxW, boxY, boxX + boxW, boxY + br);
    ctx.lineTo(boxX + boxW, boxY + boxH - br);
    ctx.quadraticCurveTo(boxX + boxW, boxY + boxH, boxX + boxW - br, boxY + boxH);
    ctx.lineTo(boxX + br, boxY + boxH);
    ctx.quadraticCurveTo(boxX, boxY + boxH, boxX, boxY + boxH - br);
    ctx.lineTo(boxX, boxY + br);
    ctx.quadraticCurveTo(boxX, boxY, boxX + br, boxY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isSecret ? "rgba(253, 230, 138, 0.85)" : "rgba(232, 197, 200, 0.85)";
    ctx.font = "bold 12px Georgia, serif";
    ctx.fillText(isSecret ? "SECRET" : "FROM", 320, 755);

    ctx.fillStyle = isSecret ? "#fbbf24" : "#fafaf9";
    ctx.font = "bold 20px Georgia, serif";
    ctx.fillText(isSecret ? card.songTitle : ` ${card.songTitle} `, 320, 795);

    // Footer
    ctx.fillStyle = isSecret ? "rgba(251, 191, 36, 0.35)" : "rgba(156, 18, 40, 0.25)";
    ctx.font = "10px monospace";
    ctx.textAlign = "left";
    ctx.fillText("CHEN JINGFEI", 50, 915);
    ctx.textAlign = "right";
    const numId = card.id.split("-")[1] || "01";
    ctx.fillText(`ARCANA No.${numId}${isSecret ? " · SPECIAL" : ""}`, 590, 915);

    setPosterUrl(canvas.toDataURL("image/png"));
  }, [isOpen, card, isSecret, lyricLines]);

  const handleCopyText = async () => {
    if (!card) return;
    const cardId = card.id.split("-")[1] || "01";
    const cleanName = card.cardName.replace(/ \(.+\)/g, "");
    const shareText = `✦ 陈婧霏 · 人间指南 ✦

No.${cardId} |  ${cleanName}
————————————————
${lyricLines.map(line => `「 ${line} 」`).join("\n")}
————————————————
${isSecret ? `隐藏答案：${card.songTitle}` : `歌词解答：${card.songTitle}`}
抽取妳的人间指南 ➔ ${window.location.origin}
`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  if (!card) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={`relative max-w-sm w-full rounded-2xl p-6 overflow-hidden flex flex-col gap-5 border shadow-2xl z-10 ${
              isSecret
                ? "bg-gradient-to-b from-[#160e02] to-[#040300] border-amber-500/40"
                : "bg-gradient-to-b from-[#140103] to-[#040001] border-mystic-wine/40"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title Header */}
            <div className="text-center space-y-1">
              <h3 className={`text-base font-serif-cn font-bold tracking-widest ${isSecret ? "text-amber-400" : "text-stone-100"}`}>
                分享我的人间指南
              </h3>
              <p className="text-[10px] text-stone-400 tracking-[0.1em]">
                长按图片即可保存到相册
              </p>
            </div>

            {/* Poster Image — long press to save */}
            {posterUrl && (
              <div className={`relative w-52 mx-auto rounded-xl overflow-hidden border shadow-lg ${
                isSecret ? "border-amber-500/50" : "border-mystic-wine/50"
              }`}>
                <img
                  src={posterUrl}
                  alt="卡牌海报"
                  className="w-full block"
                />
              </div>
            )}

            {/* 2. Interactive Controls Panel */}
            <div className="flex flex-col gap-2 mt-2">
              {/* Copy text button */}
              <button
                onClick={handleCopyText}
                className="w-full py-2.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-200 hover:text-white text-xs tracking-widest font-serif-cn flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500 animate-bounce" />
                    <span className="text-green-400">已复制到剪贴板！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-400" />
                    <span>复制文字</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
