"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

/* ── Fan blade SVG path ─────────────────────────────────── */
function FanBlade({ index, total }: { index: number; total: number }) {
  const angle = (360 / total) * index;
  return (
    <g transform={`rotate(${angle} 200 200)`}>
      {/* Blade shape — elongated rounded trapezoid */}
      <path
        d="M200,200 L180,80 Q200,40 220,80 Z"
        fill="url(#bladeGrad)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="0.5"
      />
      {/* Blade highlight edge */}
      <path
        d="M200,200 L185,90 Q200,55 215,90 Z"
        fill="url(#bladeHighlight)"
        opacity="0.3"
      />
    </g>
  );
}

export default function DuctCleaningVisual() {
  const [sweep, setSweep] = useState(0);

  /* Cleaning sweep: 2s slide + 0.8s pause */
  useEffect(() => {
    const duration = 2000;
    const pause = 800;
    let start: number | null = null;
    let frameId: number;
    let timeout: ReturnType<typeof setTimeout>;

    function tick(ts: number) {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setSweep(e * 100);
      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => {
          start = null;
          setSweep(0);
          frameId = requestAnimationFrame(tick);
        }, pause);
      }
    }
    frameId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frameId); clearTimeout(timeout); };
  }, []);

  const bladeCount = 5;

  return (
    <div className="relative w-full max-w-[500px] h-[350px] md:h-[500px] hidden lg:block mx-auto mt-12 lg:mt-0">
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-zinc-700/60 shadow-[0_8px_60px_rgba(0,0,0,0.9)]">

        {/* ▸ DIRTY LAYER (full fan, always underneath) */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-stone-800 to-zinc-900" />
          {/* Grease texture */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 30% 25%, rgba(90,75,40,0.5) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 60%, rgba(80,65,35,0.4) 0%, transparent 45%),
                radial-gradient(ellipse at 50% 85%, rgba(100,85,50,0.35) 0%, transparent 50%)
              `,
            }}
          />
          {/* Grain noise */}
          <div
            className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Dirty fan blades */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 400 400"
              className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] animate-spin"
              style={{ animationDuration: "8s" }}
            >
              <defs>
                <linearGradient id="bladeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#44403c" />
                  <stop offset="50%" stopColor="#57534e" />
                  <stop offset="100%" stopColor="#78716c" />
                </linearGradient>
                <linearGradient id="bladeHighlight" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              {Array.from({ length: bladeCount }, (_, i) => (
                <FanBlade key={i} index={i} total={bladeCount} />
              ))}
              {/* Center hub */}
              <circle cx="200" cy="200" r="30" fill="#3f3f46" stroke="#52525b" strokeWidth="2" />
              <circle cx="200" cy="200" r="12" fill="#27272a" stroke="#52525b" strokeWidth="1" />
            </svg>
          </div>

          {/* Floating dust particles */}
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-amber-800/30"
              style={{
                width: 2 + (i % 3) * 1.5,
                height: 2 + (i % 3) * 1.5,
                left: `${55 + ((i * 29) % 40)}%`,
                top: `${10 + ((i * 19) % 80)}%`,
              }}
              animate={{
                y: [0, -10, 5, -14, 0],
                x: [0, 5, -3, 8, 0],
                opacity: [0.2, 0.5, 0.25, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Dirty label */}
          <div className="absolute top-5 right-5 flex items-center gap-2 text-zinc-600 font-mono text-[10px] uppercase tracking-[0.2em]">
            <div className="w-1.5 h-1.5 bg-amber-700/60 rounded-full" />
            ЗАГРЯЗНЕНИЕ
          </div>
        </div>

        {/* ▸ CLEAN LAYER (clipped by sweep) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sweep}% 0 0)` }}
        >
          {/* Polished steel background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-400 via-zinc-300 to-zinc-400" />
          {/* Brushed metal texture */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 3px)`,
            }}
          />
          {/* Specular highlights */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `
                linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 45%, transparent 55%),
                radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)
              `,
            }}
          />

          {/* Clean fan blades */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 400 400"
              className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] animate-spin"
              style={{ animationDuration: "8s" }}
            >
              <defs>
                <linearGradient id="bladeCleanGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#a1a1aa" />
                  <stop offset="40%" stopColor="#d4d4d8" />
                  <stop offset="100%" stopColor="#e4e4e7" />
                </linearGradient>
                <linearGradient id="bladeCleanHighlight" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              {Array.from({ length: bladeCount }, (_, i) => {
                const angle = (360 / bladeCount) * i;
                return (
                  <g key={i} transform={`rotate(${angle} 200 200)`}>
                    <path
                      d="M200,200 L180,80 Q200,40 220,80 Z"
                      fill="url(#bladeCleanGrad)"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M200,200 L185,90 Q200,55 215,90 Z"
                      fill="url(#bladeCleanHighlight)"
                      opacity="0.5"
                    />
                  </g>
                );
              })}
              {/* Clean center hub */}
              <circle cx="200" cy="200" r="30" fill="#a1a1aa" stroke="#d4d4d8" strokeWidth="2" />
              <circle cx="200" cy="200" r="12" fill="#71717a" stroke="#a1a1aa" strokeWidth="1" />
            </svg>
          </div>

          {/* Certified clean badge */}
          {sweep > 25 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-5 left-5 flex items-center gap-2 bg-emerald-900/60 backdrop-blur-sm border border-emerald-500/40 px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <CheckCircle size={14} className="text-emerald-400" />
              <span className="font-mono text-[10px] text-emerald-300 uppercase tracking-[0.15em] font-semibold">
                ОЧИЩЕННАЯ СТАЛЬ
              </span>
            </motion.div>
          )}

          {/* Brand badge */}
          {sweep > 45 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-14 left-6 right-6"
            >
              <div className="text-2xl font-bold font-mono tracking-tight leading-none uppercase">
                <span className="text-zinc-800">ЭкоПроф</span>
                <span className="text-orange-600 font-extrabold drop-shadow-[0_0_8px_rgba(234,88,12,0.5)]">Сервис</span>
              </div>
              <div className="font-mono text-[9px] text-zinc-500 tracking-[0.25em] mt-1.5 uppercase">
                Соответствует ГОСТ Р 12.3.018
              </div>
            </motion.div>
          )}
        </div>

        {/* ▸ SCANNING BEAM */}
        <div
          className="absolute top-0 bottom-0 w-[2px] z-30 pointer-events-none"
          style={{ left: `${sweep}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/90 to-transparent" />
          <div className="absolute top-0 bottom-0 -left-[16px] w-[32px] bg-gradient-to-b from-transparent via-orange-400/35 to-transparent blur-[3px]" />
          <div className="absolute top-0 bottom-0 -left-[30px] w-[60px] bg-gradient-to-b from-transparent via-orange-500/15 to-transparent blur-lg" />
          <div className="absolute top-1/2 -translate-y-1/2 -left-[20px] w-[40px] h-[80px] bg-white/10 rounded-full blur-xl" />
        </div>

        {/* ▸ Progress track */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-800/80 z-20">
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
            style={{ width: `${sweep}%`, boxShadow: "0 0 8px rgba(234,88,12,0.6)", transition: "none" }}
          />
        </div>

        {/* ▸ Bottom label */}
        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center pointer-events-none">
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.3em]">
            ОЧИСТКА В РЕАЛЬНОМ ВРЕМЕНИ
          </span>
        </div>

        {/* Duct edges */}
        <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-zinc-700/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-zinc-700/40 to-transparent pointer-events-none" />

        {/* Corner rivets */}
        {["top-3 left-3", "top-3 right-3", "bottom-8 left-3", "bottom-8 right-3"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-2 h-2 rounded-full bg-zinc-600 border border-zinc-500/50 shadow-inner pointer-events-none`} />
        ))}
      </div>

      {/* Outer rim */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.04] pointer-events-none" />
    </div>
  );
}
