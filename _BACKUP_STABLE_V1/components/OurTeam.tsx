"use client";
import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <section className="w-full py-20 bg-zinc-950 px-4 sm:px-6 relative border-t border-zinc-900/40">
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">Наши <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">мастера</span></h2>
          <p className="text-zinc-400 text-base sm:text-lg">Сертифицированные специалисты с допусками к высотным и пожароопасным работам</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[rgba(10,10,10,0.85)] border border-[rgba(255,102,0,0.2)] rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all group"
            >
              <div className="relative w-full h-80 bg-zinc-800">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent mix-blend-multiply" />
              </div>
              <div className="p-8 -mt-16 relative z-10">
                <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold rounded-full mb-3 shadow-[0_0_10px_rgba(234,88,12,0.15)]">
                  {member.exp}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-zinc-400 font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
