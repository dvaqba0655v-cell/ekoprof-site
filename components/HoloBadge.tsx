"use client";
import { useRef, useCallback, useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function HoloBadge() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  // SVG circular gauge parameters
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const purity = 99.9;
  const dashOffset = circumference - (circumference * purity) / 100;

  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => { handleMouseMove(e); setIsHovered(true); }}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[500px] h-[350px] md:h-[500px] hidden lg:block mx-auto mt-12 lg:mt-0"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden transition-all duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glassmorphism background */}
        <div className={`absolute inset-0 bg-[rgba(10,10,10,0.9)] border rounded-3xl transition-all duration-300 ${isHovered ? "border-orange-500/60 shadow-[0_0_40px_rgba(234,88,12,0.1)]" : "border-[rgba(255,102,0,0.3)]"}`} />

        {/* Scanner beam */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent animate-scan-beam pointer-events-none z-20" />

        {/* Content */}
        <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">

          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="font-mono text-sm tracking-widest text-zinc-400 uppercase">
              AIRCLEAN // <span className="text-orange-500">GOST APPROVED</span>
            </span>
            <ShieldCheck
              size={24}
              className={`flex-shrink-0 transition-all duration-300 ${isHovered ? "text-orange-400" : "text-orange-500/70"}`}
            />
          </div>

          {/* Status indicators */}
          <div className="space-y-5 my-4">
            {/* System Active */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-blink" />
                <div className="absolute w-2.5 h-2.5 bg-green-500/40 rounded-full scale-[2]" />
              </div>
              <span className="font-mono text-xs tracking-wider text-green-400 uppercase">System Active</span>
            </div>

            {/* Filtration status */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-blink" style={{ animationDelay: "0.7s" }} />
                <div className="absolute w-2.5 h-2.5 bg-orange-500/40 rounded-full scale-[2]" />
              </div>
              <span className="font-mono text-xs tracking-wider text-orange-400 uppercase">Filtration Nominal</span>
            </div>

            {/* Data stream lines (decorative) */}
            <div className="space-y-2 pt-2">
              <div className="h-[3px] bg-zinc-800/80 rounded-full w-3/4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full w-[92%] shadow-[0_0_10px_rgba(234,88,12,0.5)]" />
              </div>
              <div className="h-[3px] bg-zinc-800/80 rounded-full w-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-orange-300 rounded-full w-[100%] shadow-[0_0_10px_rgba(234,88,12,0.5)]" />
              </div>
              <div className="h-[3px] bg-zinc-800/80 rounded-full w-4/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full w-[78%] shadow-[0_0_10px_rgba(234,88,12,0.5)]" />
              </div>
            </div>
          </div>

          {/* Bottom section: Gauge + Title */}
          <div className="flex items-end justify-between">
            {/* Circular gauge */}
            <div className="relative w-[100px] h-[100px] flex-shrink-0">
              <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
                {/* Background ring */}
                <circle cx="50" cy="50" r={radius} fill="none" stroke="rgb(39,39,42)" strokeWidth="6" />
                {/* Value ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  className="animate-gauge"
                  style={{ filter: "drop-shadow(0 0 6px rgba(234,88,12,0.6))" }}
                />
                <defs>
                  <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-lg font-bold text-white leading-none">99.9%</span>
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mt-1">Purity</span>
              </div>
            </div>

            {/* Title */}
            <div className="text-right">
              <div className="text-4xl font-bold font-mono tracking-tighter text-zinc-200 leading-none">
                AIR<span className={`transition-all duration-300 ${isHovered ? "text-orange-400" : "text-orange-600"}`}>CLEAN</span>
              </div>
              <div className="font-mono text-[10px] text-zinc-600 tracking-[0.3em] mt-2 uppercase">
                Industrial Grade
              </div>
            </div>
          </div>
        </div>

        {/* Outer glow ring */}
        <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-300 ${isHovered ? "ring-1 ring-orange-500/40" : "ring-1 ring-white/5"}`} />
      </div>
    </div>
  );
}
