"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SharpWindOverlay() {
  const { scrollY } = useScroll();

  // Clear overlay (no blur) with very subtle dark tint that fades in
  const overlayOpacity = useTransform(scrollY, [0, 150, 400], [0, 0.1, 0.25]);

  // Wind lines accelerate downward on scroll
  const windY = useTransform(scrollY, [0, 600], [0, 300]);
  const windScaleY = useTransform(scrollY, [0, 600], [1, 3]);
  const windOpacity = useTransform(scrollY, [0, 80, 400, 600], [0, 0.7, 0.5, 0]);

  const lines = [
    { x: "8%",  w: 1.5, h: 120, delay: 0 },
    { x: "15%", w: 1,   h: 180, delay: 0.1 },
    { x: "22%", w: 2,   h: 90,  delay: 0.05 },
    { x: "30%", w: 1,   h: 200, delay: 0.15 },
    { x: "38%", w: 1.5, h: 140, delay: 0.08 },
    { x: "45%", w: 1,   h: 160, delay: 0.12 },
    { x: "52%", w: 2,   h: 100, delay: 0 },
    { x: "58%", w: 1,   h: 220, delay: 0.06 },
    { x: "65%", w: 1.5, h: 130, delay: 0.1 },
    { x: "72%", w: 1,   h: 170, delay: 0.14 },
    { x: "78%", w: 2,   h: 110, delay: 0.03 },
    { x: "85%", w: 1,   h: 190, delay: 0.09 },
    { x: "92%", w: 1.5, h: 150, delay: 0.07 },
  ];

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden hidden md:block">

      {/* ── Clear Sharp Layer ── */}
      <motion.div
        className="absolute inset-0 bg-[rgba(10,10,10,0.2)]"
        style={{
          opacity: overlayOpacity,
        }}
      />

      {/* ── Sharp Wind Flow SVG Lines ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: windY, scaleY: windScaleY, opacity: windOpacity }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {lines.map((line, i) => (
            <rect
              key={i}
              x={line.x}
              y={180 + i * 45}
              width={line.w}
              height={line.h}
              rx={line.w / 2}
              fill="white"
              opacity={0.2 + (i % 3) * 0.1} // Increased opacity for sharpness
            >
              <animate
                attributeName="y"
                from={100 + i * 40}
                to={900}
                dur={`${2.5 + line.delay * 10}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values={`${0.2 + (i % 3) * 0.06};0.4;0`}
                dur={`${2.5 + line.delay * 10}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}

          {/* Sharp curved wind streams */}
          {[0, 1, 2, 3, 4].map((j) => (
            <path
              key={`curve-${j}`}
              d={`M ${150 + j * 180} 0 Q ${200 + j * 180} 500, ${130 + j * 180} 1000`}
              stroke="white"
              strokeWidth="1" // slightly thicker for sharpness
              fill="none"
              opacity={0.12 + j * 0.03}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="2000"
                to="0"
                dur={`${3 + j * 0.4}s`}
                repeatCount="indefinite"
              />
              <set attributeName="stroke-dasharray" to="2000" />
            </path>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
