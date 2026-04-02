"use client";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ShieldCheck } from "lucide-react";

// Dust particle component
function DustParticle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-full bg-zinc-500/40"
      style={style}
      animate={{
        y: [0, -20, 10, -15, 0],
        x: [0, 8, -5, 12, 0],
        opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function PurificationVisual() {
  // Sweep position from 0 to 100
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 4000; // 4 seconds per sweep
    const pause = 1200; // pause at end before restart

    let animId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    function loop(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease in-out cubic
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setSweep(eased * 100);

      if (progress < 1) {
        animId = requestAnimationFrame(loop);
      } else {
        // Pause at end, then restart
        timeoutId = setTimeout(() => {
          start = null;
          setSweep(0);
          animId = requestAnimationFrame(loop);
        }, pause);
      }
    }

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timeoutId);
    };
  }, []);

  // Generate dust particles with stable positions
  const dustParticles = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      style: {
        width: `${2 + (i % 5) * 1.2}px`,
        height: `${2 + (i % 5) * 1.2}px`,
        left: `${50 + ((i * 37) % 50)}%`,
        top: `${10 + ((i * 23) % 80)}%`,
      } as React.CSSProperties,
    }));
  }, []);

  const showCertified = sweep > 30;

  return (
    <div className="relative w-full max-w-[500px] h-[350px] md:h-[500px] hidden lg:block mx-auto mt-12 lg:mt-0">
      {/* Main duct container */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden border border-zinc-800 shadow-[0_0_60px_rgba(0,0,0,0.8)]">

        {/* DIRTY SIDE (full background) */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
          {/* Grime texture overlay */}
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(120,100,60,0.3) 0%, transparent 50%),
                                radial-gradient(circle at 70% 60%, rgba(100,90,50,0.25) 0%, transparent 40%),
                                radial-gradient(circle at 40% 80%, rgba(110,95,55,0.2) 0%, transparent 45%)`,
            }}
          />
          {/* Dust particles */}
          {dustParticles.map((p) => (
            <DustParticle key={p.id} style={p.style} />
          ))}

          {/* Dirty side label */}
          <div className="absolute top-6 right-6 flex items-center gap-2 text-zinc-600 font-mono text-xs uppercase tracking-widest">
            <div className="w-2 h-2 bg-zinc-600 rounded-full" />
            Contaminated
          </div>
        </div>

        {/* CLEAN SIDE (clipped by sweep position) */}
        <div
          className="absolute inset-0 transition-none"
          style={{ clipPath: `inset(0 ${100 - sweep}% 0 0)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950/80 via-zinc-900 to-slate-900">
            {/* Fresh air shimmer */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 40%, rgba(56,189,248,0.2) 0%, transparent 50%),
                                  radial-gradient(circle at 60% 70%, rgba(14,165,233,0.15) 0%, transparent 40%)`,
              }}
            />
            {/* Subtle grid pattern for "clean" feel */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Certified clean badge */}
          <AnimatePresence>
            {showCertified && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-6 left-6 flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full"
              >
                <CheckCircle size={16} className="text-emerald-400" />
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-medium">
                  Certified Clean
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Clean side bottom info */}
          <AnimatePresence>
            {sweep > 50 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-8 left-8 right-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck size={20} className="text-orange-500" />
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">GOST Compliance</span>
                </div>
                <div className="text-3xl font-bold font-mono tracking-tight text-white leading-none">
                  AIR<span className="text-orange-500">CLEAN</span>
                </div>
                <div className="font-mono text-[10px] text-zinc-600 tracking-[0.3em] mt-2 uppercase">
                  Industrial Purification
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* THE CLEANING LINE — vertical sweeping beam */}
        <div
          className="absolute top-0 bottom-0 w-[3px] z-30 pointer-events-none"
          style={{ left: `${sweep}%` }}
        >
          {/* Core beam */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-400 to-transparent" />

          {/* Wide glow */}
          <div className="absolute top-0 bottom-0 -left-[20px] w-[40px] bg-gradient-to-b from-transparent via-orange-500/30 to-transparent blur-sm" />

          {/* Bright center flare */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-[30px] w-[60px] h-[120px] bg-orange-400/20 rounded-full blur-xl" />

          {/* White hot edge */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-transparent blur-[1px]" />
        </div>

        {/* Progress indicator at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-800 z-20">
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 shadow-[0_0_10px_rgba(234,88,12,0.6)] transition-none"
            style={{ width: `${sweep}%` }}
          />
        </div>

        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-700/50 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-700/50 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-zinc-700/50 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-zinc-700/50 rounded-br-sm pointer-events-none" />
      </div>

      {/* Outer ring */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/5 pointer-events-none" />
    </div>
  );
}
