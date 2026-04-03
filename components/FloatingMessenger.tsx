"use client";
import { X, MessageCircle, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MaxLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path 
      fill="currentColor" 
      d="M50 15c-19.3 0-35 15.7-35 35 0 11.2 5.3 21.2 13.5 27.6l-2.5 11.4c-.4 1.8 1.4 3.3 3 2.5l11.4-5.6C44.7 88.5 47.3 89 50 89c19.3 0 35-15.7 35-35S69.3 15 50 15zm0 50c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z" 
    />
  </svg>
);

export default function FloatingMessenger() {
  const [showEngineer, setShowEngineer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEngineer(true);
    }, 11000); // 11 second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* LEFT SIDE: Compact Duty Engineer Pill */}
      <AnimatePresence>
        {showEngineer && (
          <div className="fixed bottom-6 left-6 z-[95] pointer-events-none font-inter">
            <motion.a 
              href="https://web.max.ru/241672035" 
              target="_blank" 
              rel="noopener noreferrer" 
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900 backdrop-blur-xl border border-green-500/80 text-white shadow-[0_0_35px_rgba(34,197,94,0.6)] hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] transition-all pointer-events-auto hover:bg-zinc-800 group"
            >
              <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,1)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-green-400 uppercase tracking-[0.2em] leading-none mb-1">ОНЛАЙН</span>
                <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap text-white drop-shadow-md">Дежурный инженер</span>
              </div>
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      {/* RIGHT SIDE: Messengers Stack */}
      <div className="fixed bottom-6 right-6 z-[95] flex flex-col items-end gap-3 pointer-events-none font-inter">
        
        {/* MESSENGER ROW (WA + TG) */}
        <div className="flex items-center gap-3">
          <motion.a 
            href="https://wa.me/79023391617" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg border border-white/20 pointer-events-auto transition-transform overflow-hidden"
            title="WhatsApp"
          >
            <MessageCircle size={24} fill="currentColor" className="text-white" />
          </motion.a>

          <motion.a 
            href="https://t.me/79023391617" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0088cc] text-white shadow-lg border border-white/20 pointer-events-auto transition-transform overflow-hidden"
            title="Telegram"
          >
            <Send size={20} fill="currentColor" className="text-white -ml-0.5" />
          </motion.a>
        </div>

        {/* PRIMARY MAX BUTTON */}
        <motion.a 
          href="https://web.max.ru/241672035" 
          target="_blank" 
          rel="noopener noreferrer" 
          initial={{ scale: 0, x: 20 }}
          animate={{ scale: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          className="group flex items-center gap-3 px-5 py-3.5 rounded-full text-white font-bold transition-all shadow-[0_10px_40px_rgba(45,178,255,0.4)] hover:shadow-[0_10px_60px_rgba(45,178,255,0.6)] border border-white/20 pointer-events-auto overflow-hidden animate-shimmer"
          style={{ 
            background: 'linear-gradient(to top right, #2db2ff, #8b3cff)' 
          }}
        >
          <div className="flex items-center justify-center bg-white/30 backdrop-blur-md w-9 h-9 rounded-full border border-white/20">
            <MaxLogo className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-black tracking-tight whitespace-nowrap uppercase italic drop-shadow-md">Написать в MAX</span>
        </motion.a>
      </div>
    </>
  );
}
