"use client";
import { X, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [objectType, setObjectType] = useState("");
  const [cleaningType, setCleaningType] = useState("");
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setTimeout(() => { 
        setStatus("idle"); 
        setName(""); 
        setPhone(""); 
        setObjectType("");
        setCleaningType("");
        setFormError("");
      }, 300);
    }
  }, [isOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (!input) {
      setPhone("");
      return;
    }
    if (input[0] === '7' || input[0] === '8') {
      input = input.substring(1);
    }
    
    let formatted = '+7';
    if (input.length > 0) formatted += ` (${input.substring(0, 3)}`;
    if (input.length >= 4) formatted += `) ${input.substring(3, 6)}`;
    if (input.length >= 7) formatted += `-${input.substring(6, 8)}`;
    if (input.length >= 9) formatted += `-${input.substring(8, 10)}`;
    
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name || !phone || !objectType || !cleaningType || phone.length < 18) {
      setFormError("Пожалуйста, заполните все поля");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, objectType, cleaningType })
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[rgba(10,10,10,0.95)] border border-[rgba(255,102,0,0.3)] rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 transition-colors z-20">
              <X size={20} />
            </button>
            
            {status === "success" ? (
               <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="text-center py-6">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Заявка успешно отправлена!</h3>
                  <p className="text-zinc-400 leading-relaxed text-base">
                    Наш инженер свяжется с вами в течение 10 минут для уточнения деталей.
                  </p>
                  <button onClick={onClose} className="mt-8 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold px-6 py-4 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    Хорошо
                  </button>
               </motion.div>
            ) : (
               <>
                 <h3 className="text-2xl font-bold text-white mb-2">Быстрая <span className="text-orange-500">связь</span></h3>
                 <p className="text-sm text-zinc-400 mb-6">Заполните поля, и наш инженер позвонит в течение 10 минут.</p>
                 <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                       <label className="block text-xs font-medium text-zinc-400 mb-1">Ваше Имя</label>
                       <input value={name} onChange={e => setName(e.target.value)} type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:border-orange-500/50 focus:ring-orange-500 transition-all font-medium text-sm" placeholder="Иван" />
                    </div>
                    
                    <div>
                       <label className="block text-xs font-medium text-zinc-400 mb-1">Тип объекта</label>
                       <select value={objectType} onChange={e => setObjectType(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:border-orange-500/50 focus:ring-orange-500 transition-all font-medium text-sm appearance-none">
                         <option value="" disabled>Выберите объект</option>
                         <option value="Ресторан / Кафе">Ресторан / Кафе</option>
                         <option value="Пищевое производство">Пищевое производство</option>
                         <option value="Офис / Бизнес-центр">Офис / Бизнес-центр</option>
                         <option value="Многоквартирный дом">Многоквартирный дом</option>
                         <option value="Другое">Другое</option>
                       </select>
                    </div>

                    <div>
                       <label className="block text-xs font-medium text-zinc-400 mb-1">Что очищаем?</label>
                       <select value={cleaningType} onChange={e => setCleaningType(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:border-orange-500/50 focus:ring-orange-500 transition-all font-medium text-sm appearance-none">
                         <option value="" disabled>Тип загрязнения</option>
                         <option value="Жировые отложения (Кухня)">Жировые отложения (Кухня)</option>
                         <option value="Пыль и общие загрязнения">Пыль и общие загрязнения</option>
                         <option value="Дезинфекция (Вирусы/Грибок)">Дезинфекция (Вирусы/Грибок)</option>
                       </select>
                    </div>

                    <div>
                       <label className="block text-xs font-medium text-zinc-400 mb-1">Контактный телефон</label>
                       <input value={phone} onChange={handlePhoneChange} type="tel" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:border-orange-500/50 focus:ring-orange-500 transition-all font-medium text-sm" placeholder="+7 (999) 000-00-00" />
                    </div>
                    
                    {formError && <p className="text-orange-500 font-medium text-sm text-center">{formError}</p>}
                    
                    <button disabled={status === "loading"} type="submit" className="w-full mt-4 bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.8)] disabled:opacity-50 flex justify-center items-center">
                       {status === "loading" ? "Отправка..." : "Оставить заявку"}
                    </button>
                    {status === "error" && <p className="text-red-500 text-sm mt-2 text-center">Произошла ошибка соединения.</p>}
                 </form>
               </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
