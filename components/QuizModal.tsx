"use client";
import { X, CheckCircle, ChevronRight, Calculator, Ruler, Hash, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    shape: "",
    diameter: "",
    length: "",
    name: "",
    phone: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStep(1);
      setStatus("idle");
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const nextStep = () => setStep(step + 1);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (!input) { setFormData({ ...formData, phone: "" }); return; }
    if (input[0] === '7' || input[0] === '8') { input = input.substring(1); }
    let formatted = '+7';
    if (input.length > 0) formatted += ` (${input.substring(0, 3)}`;
    if (input.length >= 4) formatted += `) ${input.substring(3, 6)}`;
    if (input.length >= 7) formatted += `-${input.substring(6, 8)}`;
    if (input.length >= 9) formatted += `-${input.substring(8, 10)}`;
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name, 
          phone: formData.phone, 
          objectType: `HVAC QUIZ: ${formData.shape}, ${formData.diameter}`, 
          cleaningType: `${formData.service} (${formData.length})` 
        })
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-2xl bg-[rgba(10,10,10,0.98)] border border-[rgba(255,102,0,0.4)] rounded-[40px] p-8 sm:p-12 shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden">
            
            <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>

            {status === "success" ? (
              <div className="text-center py-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                  <CheckCircle size={48} />
                </motion.div>
                <h3 className="text-4xl font-bold text-white mb-4">Расчет принят!</h3>
                <p className="text-xl text-zinc-400 font-medium">Инженер выполняет калькуляцию сметы. <br/>Перезвоним вам в течение 10 минут.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-2xl flex items-center justify-center text-orange-500 border border-orange-500/30">
                    <Calculator size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">HVAC Калькулятор</h3>
                    <div className="flex gap-1.5 mt-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i <= step ? "bg-orange-600 w-12" : "bg-zinc-800"}`} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-h-[300px]">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="flex items-center gap-2 text-orange-500 mb-6 font-bold uppercase tracking-widest text-xs">
                          <Activity size={14} /> Шаг 1: Тип необходимой услуги
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { title: "Очистка от жира", desc: "Пищепром / HoReCa / Рестораны" },
                            { title: "Очистка от пыли", desc: "БЦ / ТРЦ / Склады / Производство" },
                            { title: "Комплекс: Max Protect", desc: "Очистка + Дезинфекция + Смывы ОМЧ" }
                          ].map(opt => (
                            <button key={opt.title} onClick={() => { setFormData({ ...formData, service: opt.title }); nextStep(); }} className="p-5 text-left border border-zinc-800 hover:border-orange-500/50 hover:bg-orange-600/5 rounded-2xl transition-all group">
                              <div className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">{opt.title}</div>
                              <div className="text-xs text-zinc-500 mt-1">{opt.desc}</div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="flex items-center gap-2 text-orange-500 mb-6 font-bold uppercase tracking-widest text-xs">
                          <Ruler size={14} /> Шаг 2: Форма сечения воздуховодов
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            "Круглое сечение", 
                            "Прямоугольное сечение", 
                            "Смешанный тип"
                          ].map(shape => (
                            <button key={shape} onClick={() => { setFormData({ ...formData, shape }); nextStep(); }} className="p-6 text-center border border-zinc-800 hover:border-orange-500/50 hover:bg-orange-600/5 rounded-2xl transition-all font-bold text-sm text-zinc-300 hover:text-white">
                              {shape}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="flex items-center gap-2 text-orange-500 mb-6 font-bold uppercase tracking-widest text-xs">
                          <Hash size={14} /> Шаг 3: Эквивалентный диаметр / Габариты
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { val: "Малое сечение", desc: "до Ø250 мм / 250х250 мм" },
                            { val: "Среднее сечение", desc: "Ø315 – 500 мм / 500x500 мм" },
                            { val: "Крупное сечение", desc: "свыше Ø600 мм / Магистрали" }
                          ].map(dia => (
                            <button key={dia.val} onClick={() => { setFormData({ ...formData, diameter: dia.val }); nextStep(); }} className="p-5 text-left border border-zinc-800 hover:border-orange-500/50 hover:bg-orange-600/5 rounded-2xl transition-all group">
                              <span className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">{dia.val}</span>
                              <span className="text-xs text-zinc-500 ml-4 font-mono">{dia.desc}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="flex items-center gap-2 text-orange-500 mb-6 font-bold uppercase tracking-widest text-xs">
                          <Activity size={14} /> Шаг 4: Протяженность трассы
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            "Локальная вытяжка (до 10 п.м.)", 
                            "Средняя магистраль (10 – 50 п.м.)", 
                            "Крупная система (более 50 п.м.)"
                          ].map(len => (
                            <button key={len} onClick={() => { setFormData({ ...formData, length: len }); nextStep(); }} className="p-5 text-left border border-zinc-800 hover:border-orange-500/50 hover:bg-orange-600/5 rounded-2xl transition-all font-bold text-white">
                              {len}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 5 && (
                      <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="flex items-center gap-2 text-orange-500 mb-6 font-bold uppercase tracking-widest text-xs">
                          <CheckCircle size={14} /> Шаг 5: Контакты для получения сметы
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none font-bold" placeholder="Ваше Имя" required />
                          <input value={formData.phone} onChange={handlePhoneChange} type="tel" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none font-bold" placeholder="+7 (___) ___-__-__" required />
                          <button disabled={status === "loading"} type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-6 rounded-2xl text-xl flex items-center justify-center gap-3 transition-all shadow-[0_0_40px_rgba(234,88,12,0.5)] uppercase tracking-tight">
                            {status === "loading" ? "Выполняем расчет..." : "Получить расчет инженера"} <ChevronRight size={24} />
                          </button>
                        </form>
                        <p className="text-[10px] text-zinc-600 mt-4 text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
