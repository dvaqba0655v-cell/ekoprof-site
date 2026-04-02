"use client";
import Link from "next/link";
import { useState } from "react";
import ContactModal from "./ContactModal";
import MagneticWrapper from "./MagneticWrapper";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.9)] border-b border-[rgba(255,102,0,0.2)] shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white tracking-tighter">
            ВентГарант<span className="text-orange-500 font-extrabold">+</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <Link href="#" className="hover:text-white transition-colors">Главная</Link>
            <Link href="#" className="hover:text-white transition-colors">Услуги</Link>
            <Link href="#" className="hover:text-white transition-colors">До и После</Link>
            <Link href="#" className="hover:text-white transition-colors">Контакты</Link>
          </div>
          <MagneticWrapper>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(234,88,12,0.4)] hover:shadow-[0_0_25px_rgba(234,88,12,0.8)] hover:-translate-y-0.5"
            >
              Связаться
            </button>
          </MagneticWrapper>
        </div>
      </nav>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
