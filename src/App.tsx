import { useState, useEffect } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { CardDeck } from "./components/CardDeck";
import { DEFAULT_CARDS } from "./data/defaultCards";
import { mysticAudio } from "./utils/audio";
import { MysticalBackdrop } from "./components/MysticIcons";
import { Volume2, VolumeX, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AuthProvider, useAuth, usernameFromEmail } from "./contexts/AuthContext";
import { AuthModal } from "./components/AuthModal";
import { CardHistoryPage } from "./components/CardHistoryPage";

function AppContent() {
  const { user, signOut } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Audio bindings
  useEffect(() => {
    if (isMusicPlaying) {
      mysticAudio.start();
    } else {
      mysticAudio.stop();
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    mysticAudio.setVolume(volume);
  }, [volume]);

  const handleStartApp = () => {
    setShowWelcome(false);
    setIsMusicPlaying(true);
  };

  const toggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  return (
    <div className="relative h-screen h-[100dvh] w-full flex flex-col items-center bg-mystic-charcoal overflow-hidden font-serif-cn selection:bg-mystic-wine/30">

      {/* Mystical Stars Background */}
      <MysticalBackdrop />

      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full z-50 absolute inset-0"
          >
            <WelcomeScreen onStart={handleStartApp} />
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full h-full flex flex-col justify-between relative z-10 overflow-hidden"
          >
            {/* Top Bar Layout */}
            <header className="w-full max-w-lg mx-auto flex items-center justify-between px-5 pt-3 pb-1 z-40">
              {/* Simple background music play/pause toggle button in the top-left */}
              <button
                id="music-toggle-header"
                onClick={toggleMusic}
                className="p-2 text-stone-400 hover:text-mystic-wine rounded-full bg-black/30 border border-stone-900 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                title={isMusicPlaying ? "暂停背景音乐" : "播放背景音乐"}
              >
                {isMusicPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 text-mystic-wine animate-pulse" />
                    <span className="text-[10px] text-stone-300 tracking-widest font-serif-cn">背景音乐</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-stone-500" />
                    <span className="text-[10px] text-stone-500 tracking-widest font-serif-cn">音乐已静音</span>
                  </>
                )}
              </button>

              {/* Profile / Auth button in the top-right */}
              {user ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowHistory(true)}
                    className="p-2 text-stone-400 hover:text-mystic-wine rounded-full bg-black/30 border border-stone-900 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                    title="我的卡牌"
                  >
                    <span className="text-[10px] text-stone-300 tracking-widest font-serif-cn">我的卡牌</span>
                  </button>
                  <button
                    onClick={signOut}
                    className="p-2 text-stone-400 hover:text-mystic-wine rounded-full bg-black/30 border border-stone-900 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 max-w-[180px]"
                    title="退出登录"
                  >
                    <span className="text-[10px] text-stone-300 tracking-widest font-serif-cn truncate max-w-[120px]">
                      {user.user_metadata?.username || usernameFromEmail(user.email || "")}
                    </span>
                    <LogOut className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="p-2 text-stone-400 hover:text-mystic-wine rounded-full bg-black/30 border border-stone-900 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  title="登录 / 注册"
                >
                  <User className="w-4 h-4" />
                  <span className="text-[10px] text-stone-300 tracking-widest font-serif-cn">登录</span>
                </button>
              )}
            </header>

            {/* Main Interactive Deck view */}
            <main className="flex-1 w-full flex items-center justify-center overflow-hidden">
              <CardDeck cards={DEFAULT_CARDS} onAuthRequired={() => setAuthModalOpen(true)} />
            </main>

            {/* Subtle Footer watermark */}
            <footer className="w-full text-center py-2 z-10">
              <p className="text-[9px] text-stone-600 font-serif-en tracking-[0.3em] uppercase">
                MADE FOR JINGFEI  · © 2026
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Card History Page - only accessible after welcome screen */}
      {!showWelcome && (
        <AnimatePresence>
          {showHistory && <CardHistoryPage onBack={() => setShowHistory(false)} />}
        </AnimatePresence>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
