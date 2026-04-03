"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const team = [
  {
    name: "Алексей П.",
    role: "Старший инженер",
    exp: "Опыт: 8 лет",
    img: "/master_alexey.png"
  },
  {
    name: "Дмитрий С.",
    role: "Эксперт по HoReCa",
    exp: "Опыт: 12 лет",
    img: "/master_dmitry.png"
  },
  {
    name: "Иван К.",
    role: "Аварийный выезд 24/7",
    exp: "Опыт: 6 лет",
    img: "/master_ivan.png"
  }
];

export default function OurTeam() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [fallbackVisible, setFallbackVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView) setFallbackVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isInView]);

  const shouldShow = isInView || fallbackVisible;

  return (
    <section ref={ref} className="w-full py-12 bg-zinc-950 px-4 sm:px-6 relative border-t border-zinc-900/40">
      <div className="max-w-5xl w-full mx-auto">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white uppercase italic">Наши <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">мастера</span></h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">Сертифицированные специалисты с допусками к высотным и пожароопасным работам</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-[rgba(10,10,10,0.85)] border border-[rgba(255,102,0,0.15)] rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group max-w-[320px] mx-auto w-full"
            >
              <div className="relative w-full h-56 bg-zinc-800">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>
              <div className="p-5 -mt-10 relative z-10">
                <div className="inline-block px-2.5 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase rounded-full mb-2 tracking-widest">
                  {member.exp}
                </div>
                <h3 className="text-lg font-black text-white mb-0.5">{member.name}</h3>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-tight">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
