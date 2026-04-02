"use client";
import { X, User } from "lucide-react";
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
      {/* RIGHT SIDE: Sticky MAX Button */}
      <div className="fixed bottom-8 right-8 z-[95] pointer-events-none font-inter">
        <motion.a 
          href="https://web.max.ru/241672035" 
          target="_blank" 
          rel="noopener noreferrer" 
          initial={{ scale: 0, x: 20 }}
          animate={{ scale: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          className="group flex items-center gap-3 px-6 py-4 rounded-full text-white font-bold transition-all shadow-[0_10px_40px_rgba(45,178,255,0.3)] pointer-events-auto overflow-hidden animate-shimmer"
          style={{ 
            background: 'linear-gradient(to top right, #2db2ff, #8b3cff)' 
          }}
        >
          <div className="flex items-center justify-center bg-white/20 backdrop-blur-md w-10 h-10 rounded-full">
            <MaxLogo className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm tracking-tight whitespace-nowrap">Написать в MAX</span>
        </motion.a>
      </div>

      {/* LEFT SIDE: Live Engineer Chat status */}
      <AnimatePresence>
        {showEngineer && (
          <div className="fixed bottom-8 left-8 z-[95] pointer-events-none font-inter">
            <motion.a 
              href="https://web.max.ru/241672035" 
              target="_blank" 
              rel="noopener noreferrer" 
              initial={{ opacity: 0, y: 30, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white shadow-2xl pointer-events-auto hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center relative">
                <User size={18} className="text-zinc-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest leading-none mb-1">Онлайн</span>
                <span className="text-sm font-bold whitespace-nowrap tracking-tight">Дежурный инженер</span>
              </div>
            </motion.a>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
