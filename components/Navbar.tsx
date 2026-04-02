"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import ContactModal from "./ContactModal";
import MagneticWrapper from "./MagneticWrapper";

const MaxLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path 
      fill="currentColor" 
      d="M50 15c-19.3 0-35 15.7-35 35 0 11.2 5.3 21.2 13.5 27.6l-2.5 11.4c-.4 1.8 1.4 3.3 3 2.5l11.4-5.6C44.7 88.5 47.3 89 50 89c19.3 0 35-15.7 35-35S69.3 15 50 15zm0 50c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z" 
    />
  </svg>
);

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.9)] border-b border-[rgba(255,102,0,0.2)] shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white tracking-tighter">
            ЭкоПроф<span className="text-orange-500 font-extrabold">Сервис</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <Link href="#services" className="hover:text-white transition-colors">Услуги</Link>
            <Link href="#results" className="hover:text-white transition-colors">До и После</Link>
            <Link href="#contacts" className="hover:text-white transition-colors">Контакты</Link>
          </div>
          <div className="relative">
            <MagneticWrapper>
              <button 
                onClick={() => setShowPhone(!showPhone)}
                className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(234,88,12,0.4)] hover:shadow-[0_0_25px_rgba(234,88,12,0.8)] hover:-translate-y-0.5"
              >
                Связаться
              </button>
            </MagneticWrapper>
            
            <AnimatePresence>
              {showPhone && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-64 bg-[rgba(15,15,15,0.95)] border border-[rgba(255,102,0,0.4)] rounded-2xl p-4 shadow-2xl z-50 text-center"
                >
                  <div className="flex flex-col gap-3">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Способы связи</div>
                    
                    <a href="tel:89023391617" className="flex items-center gap-3 p-3 rounded-xl bg-orange-600/5 border border-orange-500/20 hover:bg-orange-600/10 hover:border-orange-500/40 transition-all group">
                      <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                        <Phone size={20} />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Позвонить</div>
                        <div className="text-sm font-black text-white">8 (902) 339-16-17</div>
                      </div>
                    </a>

                    <a href="https://web.max.ru/241672035" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#8000FF]/40 transition-all group">
                      <div className="w-10 h-10 bg-gradient-to-tr from-[#00A3FF] to-[#8000FF] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(128,0,255,0.3)]">
                        <MaxLogo className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Мессенджер</div>
                        <div className="text-sm font-black text-white leading-none">Написать в MAX</div>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
