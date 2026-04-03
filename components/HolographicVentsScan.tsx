"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   SVG duct network — a branching system of rectangular ducts
   ═══════════════════════════════════════════════════════════ */
const DUCT_PATHS = [
  // Main horizontal trunk
  "M40,200 H360",
  // Vertical risers
  "M100,200 V80",  "M180,200 V60",  "M260,200 V90",  "M320,200 V70",
  // Downward branches
  "M140,200 V300", "M220,200 V320", "M300,200 V290",
  // Horizontal sub-branches (top)
  "M100,80 H160",  "M180,60 H250",  "M260,90 H340",  "M320,70 H380",
  // Horizontal sub-branches (bottom)
  "M140,300 H210", "M220,320 H290", "M300,290 H370",
  // T-junctions
  "M160,80 V120",  "M250,60 V110",  "M340,90 V130",
  "M210,300 V340", "M290,320 V355",
  // Small outlet caps
  "M155,120 H165", "M245,110 H255", "M335,130 H345",
  "M205,340 H215", "M285,355 H295",
];

/* Dirt particle */
function DirtParticle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.circle
      cx={x} cy={y} r={size}
      fill="rgba(180,140,60,0.5)"
      animate={{
        cy: [y, y - 6, y + 3, y - 8, y],
        cx: [x, x + 4, x - 2, x + 5, x],
        opacity: [0.2, 0.6, 0.25, 0.5, 0.2],
      }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay: delay * 0.4 }}
    />
  );
}

export default function HolographicVentsScan() {
  const [sweep, setSweep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  /* ─── Sweep animation: 4s scan + 1.5s pause ─── */
  useEffect(() => {
    const duration = 4000;
    const pause = 1500;
    let start: number | null = null;
    let frameId: number;
    let timeout: ReturnType<typeof setTimeout>;

    function tick(ts: number) {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setSweep(e * 100);
      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => { start = null; setSweep(0); frameId = requestAnimationFrame(tick); }, pause);
      }
    }
    frameId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frameId); clearTimeout(timeout); };
  }, []);

  /* ─── 3D tilt on hover ─── */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: y * -10, ry: x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  /* ─── Stable dirt particles ─── */
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      x: 60 + ((i * 37) % 300),
      y: 50 + ((i * 23) % 300),
      size: 1.5 + (i % 3),
      delay: (i % 6) * 0.5,
    })), []);

  /* Sweep percent for SVG clipPath */
  const clipX = (sweep / 100) * 420;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[500px] h-[350px] md:h-[500px] hidden lg:block mx-auto mt-12 lg:mt-0"
      style={{ perspective: "900px" }}
    >
      {/* ═══ Main card ═══ */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-[rgba(10,10,10,0.9)] border border-[rgba(255,102,0,0.25)] rounded-2xl" />

        {/* Faint grid pattern (cyberpunk) */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* ═══ SVG Holographic Duct Network ═══ */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <svg viewBox="0 0 420 400" className="w-full h-full max-w-[420px] max-h-[380px]">
            <defs>
              {/* Dirty duct style */}
              <linearGradient id="dirtyDuct" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#92400e" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#78350f" stopOpacity="0.3" />
              </linearGradient>

              {/* Clean duct style — crystalline cyan */}
              <linearGradient id="cleanDuct" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.8" />
              </linearGradient>

              {/* Clean duct glow filter */}
              <filter id="cleanGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Dirty duct subtle shadow */}
              <filter id="dirtyShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Scan line clip mask */}
              <clipPath id="cleanClip">
                <rect x="0" y="0" width={clipX} height="400" />
              </clipPath>
            </defs>

            {/* ▸ DIRTY LAYER — always visible */}
            <g filter="url(#dirtyShadow)">
              {DUCT_PATHS.map((d, i) => (
                <path
                  key={`dirty-${i}`}
                  d={d}
                  fill="none"
                  stroke="url(#dirtyDuct)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.7"
                />
              ))}
              {/* Duct inner core (darker inside) */}
              {DUCT_PATHS.map((d, i) => (
                <path
                  key={`dirty-core-${i}`}
                  d={d}
                  fill="none"
                  stroke="rgba(60,40,10,0.3)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {/* Dirt particles */}
              {particles.map((p, i) => (
                <DirtParticle key={i} {...p} />
              ))}
            </g>

            {/* ▸ CLEAN LAYER — clipped by sweep */}
            <g clipPath="url(#cleanClip)" filter="url(#cleanGlow)">
              {/* Outer glow ring */}
              {DUCT_PATHS.map((d, i) => (
                <path
                  key={`glow-${i}`}
                  d={d}
                  fill="none"
                  stroke="rgba(34,211,238,0.15)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {/* Main duct line */}
              {DUCT_PATHS.map((d, i) => (
                <path
                  key={`clean-${i}`}
                  d={d}
                  fill="none"
                  stroke="url(#cleanDuct)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {/* Specular highlight */}
              {DUCT_PATHS.map((d, i) => (
                <path
                  key={`spec-${i}`}
                  d={d}
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </g>

            {/* ▸ SCAN LINE (inside SVG) */}
            <line
              x1={clipX} y1="0" x2={clipX} y2="400"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="1.5"
            />
            <line
              x1={clipX} y1="0" x2={clipX} y2="400"
              stroke="rgba(6,182,212,0.4)"
              strokeWidth="20"
              filter="url(#cleanGlow)"
            />
          </svg>
        </div>

        {/* ▸ External scan beam glow (on top of everything) */}
        <div
          className="absolute top-0 bottom-0 w-[2px] z-30 pointer-events-none"
          style={{ left: `${sweep}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-300/80 to-transparent" />
          <div className="absolute top-0 bottom-0 -left-[20px] w-[40px] bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent blur-md" />
          <div className="absolute top-1/2 -translate-y-1/2 -left-[30px] w-[60px] h-[100px] bg-cyan-400/10 rounded-full blur-2xl" />
        </div>

        {/* ▸ Dirty side label */}
        <AnimatePresence>
          {sweep < 70 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 flex items-center gap-2 bg-amber-950/30 backdrop-blur-sm border border-amber-700/20 px-3 py-1.5 rounded-full z-20"
            >
              <div className="w-1.5 h-1.5 bg-amber-600/70 rounded-full" />
              <span className="font-mono text-[9px] text-amber-500/70 uppercase tracking-[0.15em]">
                ЗАГРЯЗНЕНИЕ
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ▸ Clean side badge */}
        <AnimatePresence>
          {sweep > 20 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-4 left-4 flex items-center gap-2 bg-cyan-950/40 backdrop-blur-sm border border-cyan-500/30 px-3 py-1.5 rounded-full z-20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </div>
              <span className="font-mono text-[9px] text-cyan-300 uppercase tracking-[0.15em] font-medium">
                ОЧИЩЕННАЯ СИСТЕМА
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ▸ Brand badge (appears after scan passes center) */}
        <AnimatePresence>
          {sweep > 50 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-14 left-6 z-20"
            >
              <div className="text-xl font-bold font-mono tracking-tight leading-none uppercase">
                <span className="text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">ЭкоПроф</span>
                <span className="text-orange-500 font-extrabold drop-shadow-[0_0_8px_rgba(234,88,12,0.5)]">Сервис</span>
              </div>
              <div className="font-mono text-[8px] text-cyan-500/50 tracking-[0.3em] mt-1.5 uppercase">
                Соответствует ГОСТ Р 12.3.018
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ▸ Progress beam at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-800/60 z-20">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300"
            style={{ width: `${sweep}%`, boxShadow: "0 0 10px rgba(6,182,212,0.6)", transition: "none" }}
          />
        </div>

        {/* ▸ Bottom scanning label (fading in/out) */}
        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center pointer-events-none">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono text-[9px] text-cyan-500/60 uppercase tracking-[0.25em]"
          >
            ГОЛОГРАФИЧЕСКОЕ СКАНИРОВАНИЕ СИСТЕМЫ...
          </motion.span>
        </div>

        {/* ▸ Corner accents (cyberpunk brackets) */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-cyan-500/20 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-cyan-500/20 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-8 left-3 w-5 h-5 border-b border-l border-cyan-500/20 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-8 right-3 w-5 h-5 border-b border-r border-cyan-500/20 rounded-br-sm pointer-events-none" />
      </div>

      {/* ═══ Outer ambient glow ═══ */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-500/[0.06] pointer-events-none" />
    </div>
  );
}
