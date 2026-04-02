"use client";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    name: "Игорь",
    city: "Самара",
    role: "Владелец сети стейк-хаусов",
    text: "Очистили вытяжку от 5-сантиметрового слоя жира за одну ночь. Акт для МЧС выдали сразу. Работают быстро и профессионально."
  },
  {
    name: "Анна",
    city: "Тольятти",
    role: "Управляющая БЦ",
    text: "Работают чисто, после себя не оставляют грязи. Вентиляция теперь работает как новая, исчез посторонний шум и запахи."
  },
  {
    name: "Виктор",
    city: "Чапаевск",
    role: "Директор пищевого цеха",
    text: "Профессиональное оборудование, быстро справились с цехом 1000 кв.м. Получили все акты для Роспотребнадзора без проблем."
  },
  {
    name: "Елена",
    city: "Жигулевск",
    role: "Завхоз школы",
    text: "Ребята молодцы, приехали вовремя, сделали дезинфекцию всех воздуховодов. Документы оформили в день обращения."
  },
  {
    name: "Михаил",
    city: "Новокуйбышевск",
    role: "Технический директор ТЦ",
    text: "Регулярно заказываем очистку. Прозрачные сметы и качественный результат. Рекомендую как надежного исполнителя."
  }
];

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(index === 0 ? reviews.length - 1 : index - 1);
  const next = () => setIndex(index === reviews.length - 1 ? 0 : index + 1);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-20 overflow-hidden">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold text-white">География наших <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">работ</span></h2>
        <div className="flex gap-4">
          <button onClick={prev} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-orange-500 hover:text-white transition-all bg-zinc-950/50">
            <ChevronLeft size={24} />
          </button>
          <button onClick={next} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-orange-500 hover:text-white transition-all bg-zinc-950/50">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative h-[450px] sm:h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="glass-card p-8 sm:p-12 h-full flex flex-col justify-between group">
              <div className="absolute top-8 right-10 text-orange-500/10 scale-[3] pointer-events-none group-hover:text-orange-500/20 transition-colors">
                <Quote size={40} />
              </div>
              
              <div>
                <div className="flex gap-1 text-orange-500 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
                </div>
                <p className="text-xl sm:text-2xl text-zinc-300 italic font-medium leading-relaxed mb-8">
                  "{reviews[index].text}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">{reviews[index].name}</span>
                  <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">{reviews[index].role}</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-600/10 px-4 py-2 rounded-full border border-orange-500/20">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-orange-400 font-black tracking-widest text-xs uppercase">{reviews[index].city}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-12">
        {reviews.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-12 bg-orange-600" : "w-4 bg-zinc-800"}`} />
        ))}
      </div>
    </div>
  );
}
