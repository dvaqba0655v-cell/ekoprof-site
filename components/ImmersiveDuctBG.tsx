"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";

export default function ImmersiveDuctBG() {
  const [isMobile, setIsMobile] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const spring = { stiffness: 150, damping: 25, mass: 0.8 };

  // Layer 1 (Deep): 5% mouse shift
  const deepBaseX = isMobile ? 0 : mouse.x * -15;
  const deepBaseY = isMobile ? 0 : mouse.y * -15;
  const deepX = useSpring(deepBaseX, spring);
  const deepY = useSpring(deepBaseY, spring);

  // Layer 2 (Middle): 15% mouse shift
  const midBaseX = isMobile ? 0 : mouse.x * -45;
  const midBaseY = isMobile ? 0 : mouse.y * -45;
  const midX = useSpring(midBaseX, spring);
  const midY = useSpring(midBaseY, spring);

  // Layer 3 (Front): 30% mouse shift
  const frontBaseX = isMobile ? 0 : mouse.x * 90;
  const frontBaseY = isMobile ? 0 : mouse.y * 90;
  const frontX = useSpring(frontBaseX, spring);
  const frontY = useSpring(frontBaseY, spring);

  // Scroll-driven particle zoom
  const particleScale = useTransform(scrollY, [0, 800], [1, 2.5]);
  const particleOpacity = useTransform(scrollY, [0, 800], [0.4, 0.1]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* ──── LAYER 1: DEEP — Dark metallic gradient ──── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ x: deepX, y: deepY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black" />
        {/* Deep concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[900px] h-[900px] rounded-full border-[50px] border-zinc-800/30 opacity-40" />
          <div className="absolute w-[650px] h-[650px] rounded-full border-[35px] border-zinc-800/20 opacity-30" />
          <div className="absolute w-[400px] h-[400px] rounded-full border-[25px] border-zinc-900/40 opacity-25" />
        </div>
        {/* Subtle metallic sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01]" />
      </motion.div>

      {/* ──── LAYER 2: MIDDLE — Orange structural rings ──── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ x: midX, y: midY }}
      >
        {/* Main orange ring */}
        <div className="w-[1000px] h-[1000px] rounded-full border-[3px] border-orange-500/20 opacity-60" />
        <div className="absolute w-[750px] h-[750px] rounded-full border-[2px] border-orange-500/15 border-dashed opacity-50" />
        <div className="absolute w-[500px] h-[500px] rounded-full border-[2px] border-orange-600/10 opacity-40" />

        {/* Pulsating orange glow core */}
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[180px]"
        />

        {/* Accent flares */}
        <div className="absolute top-[20%] left-[15%] w-[250px] h-[250px] bg-orange-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-[25%] right-[20%] w-[200px] h-[200px] bg-orange-500/5 rounded-full blur-[100px]" />
      </motion.div>

      {/* ──── LAYER 3: FRONT — Floating dust & light flares ──── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ x: frontX, y: frontY }}
      >
        {/* SVG fractal noise dust — scales with scroll */}
        <motion.div
          className="absolute inset-0 mix-blend-screen pointer-events-none"
          style={{
            scale: particleScale,
            opacity: particleOpacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* Light flares */}
        <div className="absolute top-[10%] left-[8%] w-[150px] h-[150px] bg-white/[0.03] rounded-full blur-[60px]" />
        <div className="absolute bottom-[15%] right-[12%] w-[120px] h-[120px] bg-orange-400/[0.04] rounded-full blur-[50px]" />
        <div className="absolute top-[50%] right-[30%] w-[80px] h-[80px] bg-white/[0.02] rounded-full blur-[40px]" />
      </motion.div>

      {/* ──── VIGNETTE — Darkens edges for text contrast ──── */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/60" />
    </div>
  );
}
