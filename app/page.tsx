"use client";

import { ArrowRight, ShieldCheck, Clock, Zap, Target, Search, SprayCan, CheckCircle, ChevronRight, ChevronDown, Settings, Star } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import ImmersiveDuctBG from "@/components/ImmersiveDuctBG";
import SharpWindOverlay from "@/components/SharpWindOverlay";
import OurTeam from "@/components/OurTeam";
import FadeInSection from "@/components/FadeInSection";
import MagneticWrapper from "@/components/MagneticWrapper";
import QuizModal from "@/components/QuizModal";
import ReviewsCarousel from "@/components/ReviewsCarousel";

export default function Home() {
  const { scrollY } = useScroll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
    <div className="bg-red-600 text-white text-center py-2 font-bold z-50 relative w-full text-lg">
      Проверка связи с новым ПК
    </div>
    <div className="flex flex-col w-full bg-zinc-950 text-white selection:bg-orange-600 selection:text-white pb-32">
      
      {/* IMPRESSIVE HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden px-4 sm:px-6">
        
        <ImmersiveDuctBG />
        
        {/* Frosted Wind Effect — between BG (z-0) and text (z-20) */}
        <SharpWindOverlay />
        
        <div className="max-w-7xl w-full mx-auto flex flex-col items-center text-center relative z-20">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-full border border-[rgba(255,102,0,0.2)] bg-[rgba(10,10,10,0.85)] text-orange-400 w-max text-xs sm:text-sm font-bold tracking-tight">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </div>
            <Zap size={14} className="opacity-80" /> <span>Мобильные бригады работают 24/7 в Самаре</span>
          </div>
          
          {/* SINGLE-LINE H1 WITH SCROLL ZOOM & GRADIENT */}
          <motion.h1 
            style={{
              scale: useTransform(scrollY, [0, 600], [1, 1.2]),
              opacity: useTransform(scrollY, [0, 400, 600], [1, 0.6, 0]),
            }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight text-white mb-6 uppercase italic text-balance"
          >
            Очистка вентиляции <br className="hidden md:block" /> <span className="text-orange-500">в Самаре</span>
          </motion.h1>
          
          <motion.h2
            style={{
              opacity: useTransform(scrollY, [0, 300, 500], [1, 0.7, 0]),
            }}
            className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-10"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 italic font-serif">ОТ ЖИРА И ПЫЛИ</span>
          </motion.h2>
          
          <motion.p 
            style={{ opacity: useTransform(scrollY, [0, 300], [1, 0]) }}
            className="text-lg sm:text-2xl text-zinc-300 leading-relaxed max-w-3xl font-medium mb-12"
          >
            Смывы на ОМЧ (общее микробное число). <br className="hidden sm:block"/>
            Официальный акт для Роспотребнадзора и полное соответствие нормам пожарной безопасности МЧС.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 relative z-20">
            <MagneticWrapper>
              <button data-magnetic onClick={() => setIsQuizOpen(true)} className="flex w-full sm:w-auto items-center justify-center gap-3 bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.6)] hover:shadow-[0_0_40px_rgba(234,88,12,0.9)] hover:-translate-y-1 relative overflow-hidden group">
                <span className="relative z-10 font-bold flex gap-2 items-center">Рассчитать стоимость <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></span>
              </button>
            </MagneticWrapper>
            <MagneticWrapper>
              <button data-magnetic onClick={() => setIsModalOpen(true)} className="flex w-full sm:w-auto items-center justify-center gap-3 bg-[rgba(30,30,30,0.9)] border border-[rgba(255,102,0,0.6)] hover:border-orange-500 hover:bg-zinc-800 text-white px-10 py-5 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(234,88,12,0.4)] hover:-translate-y-1">
                Оставить заявку
              </button>
            </MagneticWrapper>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400 animate-pulse z-20">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] opacity-80">Листайте вниз</span>
          <ChevronDown size={24} className="opacity-80" />
        </div>
      </section>

      {/* НАШИ МАСТЕРА */}
      <OurTeam />

      {/* РЕЙТИНГ (Социальное доказательство) */}
      <FadeInSection>
        <section className="w-full py-10 sm:py-12 bg-[rgba(10,10,10,0.85)] border-y border-[rgba(255,102,0,0.2)] flex justify-center relative z-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl w-full px-6 flex flex-wrap justify-center lg:justify-between items-center gap-6 sm:gap-8 relative z-10">
            {/* YANDEX CARD */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="flex items-center gap-6 px-8 py-5 rounded-3xl bg-white/95 backdrop-blur-md shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition-all duration-300 group cursor-default"
            >
              <div className="w-[120px] h-10 relative">
                <Image src="/yandex.png" alt="Яндекс Услуги" fill className="object-contain" />
              </div>
              <div className="flex flex-col border-l border-zinc-200 pl-6">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Рейтинг</span>
                <span className="text-2xl font-black text-zinc-900 flex items-center gap-2">
                  4.9 <Star className="text-orange-500 fill-orange-500 mb-0.5" size={20} />
                </span>
              </div>
            </motion.div>

            {/* AVITO CARD */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="flex items-center gap-6 px-8 py-5 rounded-3xl bg-white/95 backdrop-blur-md shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition-all duration-300 group cursor-default"
            >
              <div className="w-[120px] h-10 relative">
                <Image src="/avito.png" alt="Авито" fill className="object-contain" />
              </div>
              <div className="flex flex-col border-l border-zinc-200 pl-6">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Рейтинг</span>
                <span className="text-2xl font-black text-zinc-900 flex items-center gap-2">
                  5.0 <Star className="text-orange-500 fill-orange-500 mb-0.5" size={20} />
                </span>
              </div>
            </motion.div>

            {/* PROFI CARD */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="flex items-center gap-6 px-8 py-5 rounded-3xl bg-white/95 backdrop-blur-md shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition-all duration-300 group cursor-default"
            >
              <div className="w-[120px] h-10 relative">
                <Image src="/profi.png" alt="Профи.ру" fill className="object-contain" />
              </div>
              <div className="flex flex-col border-l border-zinc-200 pl-6">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Рейтинг</span>
                <span className="text-2xl font-black text-zinc-900 flex items-center gap-2">
                  4.8 <Star className="text-orange-500 fill-orange-500 mb-0.5" size={20} />
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </FadeInSection>

      {/* НАШИ УСЛУГИ */}
      <FadeInSection>
        <section id="services" className="w-full py-20 bg-zinc-950 px-4 sm:px-6 relative flex justify-center border-t border-zinc-900/40">
          <div className="max-w-7xl w-full">
             <div className="text-center mb-16 px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 text-balance">Наши <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">Услуги</span></h2>
                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">Инженерный подход к чистоте. Работаем по ГОСТ с выдачей актов для госорганов.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                <div className="glass-card p-6 sm:p-8 group">
                   <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6 border border-[rgba(255,102,0,0.3)] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(234,88,12,0.1)]">
                     <Zap size={28} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">Очистка от жира</h3>
                   <p className="text-zinc-400 text-sm leading-relaxed">Профессиональное удаление плотных жировых отложений в системах вытяжной вентиляции (рестораны, пищевые производства).</p>
                </div>

                <div className="glass-card p-6 sm:p-8 group">
                   <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6 border border-[rgba(255,102,0,0.3)] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(234,88,12,0.1)]">
                     <Settings size={28} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">Очистка от пыли</h3>
                   <p className="text-zinc-400 text-sm leading-relaxed">Механическая и вакуумная очистка воздуховодов от сухой пыли и строительной взвеси.</p>
                </div>

                <div className="glass-card p-6 sm:p-8 group">
                   <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6 border border-[rgba(255,102,0,0.3)] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(234,88,12,0.1)]">
                     <SprayCan size={28} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">Дезинфекция</h3>
                   <p className="text-zinc-400 text-sm leading-relaxed">Антибактериальная обработка холодным туманом для уничтожения грибков и патогенов.</p>
                </div>

                <div className="glass-card p-6 sm:p-8 group">
                   <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6 border border-[rgba(255,102,0,0.3)] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(234,88,12,0.1)]">
                     <ShieldCheck size={28} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">Смывы на ОМЧ</h3>
                   <p className="text-zinc-400 text-sm leading-relaxed">Лабораторный контроль качества очистки с выдачей официального протокола для Роспотребнадзора.</p>
                </div>
             </div>
          </div>
        </section>
      </FadeInSection>

      {/* ЭТАПЫ РАБОТЫ */}
      <FadeInSection>
        <section className="w-full py-20 bg-zinc-950 px-4 sm:px-6 relative flex justify-center border-t border-zinc-900/40">
          <div className="max-w-7xl w-full">
             <div className="text-center mb-16 px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 text-balance"><span className="text-orange-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">Этапы</span> работы</h2>
             </div>
             
             <div className="flex flex-col md:flex-row gap-12 md:gap-8 items-stretch justify-between relative">
                <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-zinc-800 via-orange-500/50 to-zinc-800 z-0" />
                
                <div className="flex-1 flex flex-col items-center text-center z-10 group px-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-950 border-2 border-zinc-700 group-hover:border-orange-500 group-hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] rounded-full flex items-center justify-center text-orange-500 mb-6 transition-all duration-300 relative group-hover:-translate-y-2">
                     <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.6)] text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base border-2 border-zinc-950">1</div>
                     <Search size={32} className="sm:w-[40px] sm:h-[40px]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Аудит системы</h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-[280px]">Бесплатный выезд инженера для телеинспекции, оценки отложений и составления точной сметы.</p>
                </div>

                <div className="flex-1 flex flex-col items-center text-center z-10 group px-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-950 border-2 border-zinc-700 group-hover:border-orange-500 group-hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] rounded-full flex items-center justify-center text-orange-500 mb-6 transition-all duration-300 relative group-hover:-translate-y-2">
                     <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.6)] text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base border-2 border-zinc-950">2</div>
                     <SprayCan size={32} className="sm:w-[40px] sm:h-[40px]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Очистка мощными установками</h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-[280px]">Нанесение активной пены и чистка щеточными машинами для полного растворения жира.</p>
                </div>

                <div className="flex-1 flex flex-col items-center text-center z-10 group px-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-950 border-2 border-zinc-700 group-hover:border-orange-500 group-hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] rounded-full flex items-center justify-center text-orange-500 mb-6 transition-all duration-300 relative group-hover:-translate-y-2">
                     <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.6)] text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base border-2 border-zinc-950">3</div>
                     <CheckCircle size={32} className="sm:w-[40px] sm:h-[40px]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Акт для Роспотребнадзора</h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-[280px]">Выдача журнала очистки, документации на ОМЧ и фото/видео фиксации чистоты.</p>
                </div>
             </div>
          </div>
        </section>
      </FadeInSection>

      {/* ДО И ПОСЛЕ */}
      <FadeInSection>
        <section id="results" className="w-full py-20 sm:py-32 bg-zinc-950 px-4 sm:px-6 flex justify-center border-t border-zinc-900/40">
          <div className="max-w-6xl w-full flex flex-col items-center">
             <div className="text-center mb-12 sm:mb-16 max-w-2xl px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 text-balance">Результат <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">До и После</span></h2>
                <p className="text-zinc-400 text-base sm:text-lg">Наглядный пример устранения 100% масляных и жировых отложений внутри индустриальной вытяжки.</p>
             </div>
             
             <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full max-w-5xl mx-auto">
                <div className="flex-1 w-full max-w-sm glass-card group relative">
                  <div className="absolute top-4 left-4 bg-zinc-950/80 px-4 py-1.5 rounded-full text-zinc-300 font-bold border border-[rgba(255,102,0,0.3)] z-10 text-xs shadow-black/50 shadow-md uppercase font-mono tracking-wider">ДО</div>
                  <div className="relative w-full aspect-square bg-zinc-900">
                      <Image src="/dirty_hood.png" alt="Грязная вытяжка" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75" />
                  </div>
                </div>
                
                <div className="flex-1 w-full max-w-sm glass-card border-[rgba(255,102,0,0.4)] group relative shadow-[0_0_40px_rgba(234,88,12,0.1)]">
                  <div className="absolute top-4 left-4 bg-orange-600 px-4 py-1.5 rounded-full text-white font-bold shadow-lg z-10 text-xs uppercase font-mono tracking-wider">ПОСЛЕ</div>
                  <div className="relative w-full aspect-square bg-zinc-900">
                      <Image src="/clean_hood.png" alt="Чистая вытяжка" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
             </div>
          </div>
        </section>
      </FadeInSection>

      {/* ПРЕИМУЩЕСТВА */}
      <FadeInSection>
        <section className="w-full py-20 sm:py-28 bg-zinc-950 px-4 sm:px-6 relative border-y border-zinc-900">
          <div className="max-w-7xl w-full mx-auto">
             <div className="text-center mb-16 sm:mb-20 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 text-balance">Наши <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">Преимущества</span></h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4">
                <div className="glass-card p-8 sm:p-10 group">
                  <motion.div 
                    animate={{ y: [0, -8, 0] }} 
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:text-orange-400">
                    <Target size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">Собственное оборудование</h3>
                  <p className="text-zinc-400 leading-relaxed text-base">
                    Используем современные финские щеточные машины и пеногенераторы для быстрого устранения жира.
                  </p>
                </div>

                <div className="glass-card p-8 sm:p-10 group">
                  <motion.div 
                    animate={{ y: [0, -8, 0] }} 
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:text-orange-400">
                    <ShieldCheck size={32} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-4">Акты для Роспотребнадзора</h3>
                  <p className="text-zinc-400 leading-relaxed text-base">
                    Оформляем все необходимые документы: договор, смывы на ОМЧ, акты ВДПО и скрытых работ для успешных проверок.
                  </p>
                </div>

                <div className="glass-card p-8 sm:p-10 group">
                  <motion.div 
                    animate={{ y: [0, -8, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:text-orange-400">
                    <Clock size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">Выезд в день обращения</h3>
                  <p className="text-zinc-400 leading-relaxed text-base">
                    Мобильные бригады. Работаем 24/7. Приедем строго после закрытия вашего ресторана или смены на заводе.
                  </p>
                </div>
             </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <ReviewsCarousel />
      </FadeInSection>

      {/* ФОРМА ЗАЯВКИ */}
      <FadeInSection>
        <section className="w-full pt-20 sm:pt-32 px-4 sm:px-6 relative flex justify-center mt-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] md:h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="relative max-w-5xl w-full glass-card p-8 sm:p-16 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center flex flex-col items-center justify-center z-10 mx-auto">
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance text-white">Заказать <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">расчет стоимости</span></h2>
             <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mb-8">
                Оставьте заявку, и дежурный инженер свяжется с вами за 10 минут для бесплатной телеинспекции.
             </p>
             <MagneticWrapper>
               <button data-magnetic onClick={() => setIsModalOpen(true)} className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-10 py-5 rounded-full text-lg sm:text-xl transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.5)] hover:shadow-[0_0_40px_rgba(234,88,12,0.8)] hover:-translate-y-1">
                  Оставить заявку прямо сейчас
               </button>
             </MagneticWrapper>
          </div>
        </section>
      </FadeInSection>

      {/* FAQ СЕКЦИЯ */}
      <FadeInSection>
        <section className="w-full py-20 sm:py-28 bg-zinc-950 px-4 sm:px-6 relative border-t border-zinc-900/40">
          <div className="max-w-4xl w-full mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-balance">Вопросы и <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">ответы</span></h2>
              <p className="text-zinc-400 text-base sm:text-lg">Отвечаем на самые частые вопросы наших клиентов</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Сколько стоит очистка вентиляции за погонный метр?",
                  a: "Стоимость зависит от степени загрязнения, диаметра воздуховода и сложности доступа. Средняя цена за погонный метр от 450 рублей. Для точного расчёта наш инженер бесплатно выезжает на объект с телеинспекцией и составляет прозрачную смету."
                },
                {
                  q: "Как часто нужно чистить вентиляцию по СанПиН?",
                  a: "Согласно СанПиН 2.3/2.4.3590-20 и ППБ 01-03, очистку вытяжной вентиляции в объектах общественного питания необходимо проводить не реже 1 раза в квартал. Для производственных объектов — не реже 2 раз в год. Мы напоминаем о плановой очистке заранее."
                },
                {
                  q: "Какие документы вы оформляете для Роспотребнадзора и МЧС?",
                  a: "Мы выдаём полный пакет: акт выполненных работ, журнал очистки, фото/видео-фиксацию до и после, результаты смывов на ОМЧ, акт ВДПО и акт скрытых работ. Этого достаточно для успешного прохождения любых проверок."
                },
                {
                  q: "Какое оборудование вы используете?",
                  a: "Мы работаем на профессиональных щёточных машинах финского производства (до 800 об/мин), пеногенераторах с активной горячей пеной и мощных вакуумных установках с HEPA-фильтрами. Всё оборудование собственное, не арендованное."
                },
                {
                  q: "Вы работаете в выходные и ночью? Есть ли аварийный выезд?",
                  a: "Да, мы работаем 24/7, включая праздники. Для ресторанов мы специально выезжаем после закрытия кухни, чтобы не мешать работе заведения. Аварийный выезд возможен в течение 2 часов по Самаре и области."
                },
              ].map((faq, i) => (
                <div key={i} className="bg-[rgba(10,10,10,0.6)] border border-[rgba(255,102,0,0.2)] rounded-2xl overflow-hidden transition-colors hover:border-orange-500/40">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left text-white font-semibold text-base sm:text-lg transition-colors hover:bg-white/5"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={20} className={`text-orange-500 flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="px-6 pb-5 text-zinc-400 text-sm sm:text-base leading-relaxed border-t border-white/5"
                    >
                      <p className="pt-4">{faq.a}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* SEO ТЕКСТОВЫЙ БЛОК */}
      <section className="w-full py-16 bg-zinc-950 px-4 sm:px-6 border-t border-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Очистка систем вентиляции <span className="text-orange-500">в Самаре</span></h2>
          <div className="text-zinc-500 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Компания ЭкоПрофСервис оказывает профессиональные услуги по очистке систем вентиляции от жировых отложений в Самаре и Самарской области. Мы специализируемся на комплексной очистке вытяжных зонтов в ресторанах, кафе и столовых, а также на дезинфекции воздуховодов и проверке пожарной безопасности вентиляционных систем на объектах общественного питания и промышленных предприятиях.
            </p>
            <p>
              Регулярная очистка вентиляции от жира и пыли является обязательным требованием СанПиН 2.3/2.4.3590-20 и ППБ 01-03. Накопление жировых отложений в воздуховодах создаёт прямую угрозу возгорания, снижает эффективность вентиляционной системы и ведёт к штрафам при проверках Роспотребнадзора и пожарных инспекций. Наши специалисты выполняют очистку зонтов в ресторанах, кафе, пекарнях, производственных цехах и торговых центрах.
            </p>
            <p>
              Мы используем современное оборудование: роторные щёточные машины со скоростью до 800 оборотов в минуту, промышленные пеногенераторы с активной щелочной пеной и вакуумные установки с HEPA-фильтрацией. Все работы выполняются строго по ГОСТ Р 12.3.018 с полным документальным сопровождением: акты ВДПО, смывы на ОМЧ, журнал очистки, фотофиксация. Дезинфекция воздуховодов проводится сертифицированными средствами с выдачей акта для Роспотребнадзора.
            </p>
            <p>
              Работаем по всей Самаре и Самарской области. Выезд инженера для бесплатной телеинспекции и составления сметы — в день обращения. Звоните круглосуточно: наши дежурные бригады готовы к выезду 24 часа в сутки, 7 дней в неделю, включая праздники. Очистка зонтов вытяжной вентиляции и проверка пожарной безопасности — доверьте это профессионалам из ЭкоПрофСервис.
            </p>
          </div>
        </div>
      </section>
    </div>
    <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}
