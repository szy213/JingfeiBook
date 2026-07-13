import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Lock, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, signUp, signIn } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Auto-close when user becomes available after successful auth
  useEffect(() => {
    if (user) {
      onClose();
      setUsername("");
      setPassword("");
      setError("");
    }
  }, [user, onClose]);

  // Reset form on tab switch
  useEffect(() => {
    setError("");
  }, [tab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("请输入账号和密码");
      return;
    }
    if (password.length < 6) {
      setError("密码至少需要6位");
      return;
    }

    setSubmitting(true);
    const result = tab === "register" ? await signUp(username, password) : await signIn(username, password);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-sm bg-gradient-to-b from-[#140103] to-[#040001] border border-mystic-wine/40 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-mystic-wine/20 transition-colors cursor-pointer z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Decorative top corners */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-mystic-wine/30 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-mystic-wine/30 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-mystic-wine/30 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-mystic-wine/30 rounded-br-lg pointer-events-none" />

            <div className="p-8">
              {/* Title */}
              <h2 className="text-center text-lg font-serif-cn font-bold text-white tracking-widest mb-6">
                欢迎登录
              </h2>

              {/* Tab switcher */}
              <div className="flex justify-center gap-2 mb-6">
                <button
                  onClick={() => setTab("login")}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-serif-cn tracking-wider transition-all cursor-pointer ${
                    tab === "login"
                      ? "bg-mystic-crimson/40 border border-mystic-wine/60 text-white"
                      : "bg-transparent border border-stone-800 text-stone-500 hover:text-stone-300"
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  登录
                </button>
                <button
                  onClick={() => setTab("register")}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-serif-cn tracking-wider transition-all cursor-pointer ${
                    tab === "register"
                      ? "bg-mystic-crimson/40 border border-mystic-wine/60 text-white"
                      : "bg-transparent border border-stone-800 text-stone-500 hover:text-stone-300"
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  注册
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-mystic-wine/50">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="账号"
                    className="w-full bg-[#1a0104]/80 border border-mystic-wine/30 rounded-full pl-9 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-mystic-wine focus:ring-1 focus:ring-mystic-wine/20 transition-all font-serif-cn"
                    autoComplete="username"
                  />
                </div>

                {/* Password field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-mystic-wine/50">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="密码（至少6位）"
                    className="w-full bg-[#1a0104]/80 border border-mystic-wine/30 rounded-full pl-9 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-mystic-wine focus:ring-1 focus:ring-mystic-wine/20 transition-all font-serif-cn"
                    autoComplete={tab === "register" ? "new-password" : "current-password"}
                  />
                </div>

                {/* Error display */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="px-4 py-2.5 bg-mystic-crimson/20 border border-mystic-wine/30 rounded-lg text-xs text-mystic-wine-pale font-serif-cn text-center"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#5c0612] to-[#9c1228] border border-mystic-wine/60 text-mystic-wine-pale hover:text-white hover:border-mystic-wine transition-all duration-300 font-medium font-serif-cn tracking-[0.3em] text-sm overflow-hidden shadow-[0_5px_20px_rgba(156,18,40,0.35)] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                >
                  {/* Glowing button sheen */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-2">
                    {submitting
                      ? (tab === "register" ? "正在注册..." : "正在登录...")
                      : (tab === "register" ? "注册账号" : "登录")
                    }
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
