"use client";
import { useState } from "react";
import Image from "next/image";
import ContactModal from "./ContactModal";

export default function FloatingChatWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 group flex items-center justify-center">
        <span className="absolute right-full mr-4 bg-zinc-800 text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg outline outline-1 outline-white/10">
          Консультация онлайн
        </span>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-[64px] h-[64px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,102,0,0.4)] hover:shadow-[0_0_35px_rgba(255,102,0,0.6)] transition-all duration-300 outline outline-2 outline-[rgba(255,102,0,0.5)] bg-[rgba(10,10,10,0.9)] flex items-center justify-center relative animate-pulse cursor-pointer"
          aria-label="Консультация онлайн"
          title="Консультация онлайн"
        >
          <Image src="/max-logo.png" alt="Чат онлайн-поддержки" width={64} height={64} className="object-contain" />
        </button>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
