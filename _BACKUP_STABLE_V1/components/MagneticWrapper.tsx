"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function MagneticWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    
    // Calculate the center point of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center to mouse
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Subtle movement (max 20px as per requirement)
    // We scale it down significantly
    const moveX = distanceX * 0.3;
    const moveY = distanceY * 0.3;
    
    setPosition({ x: moveX, y: moveY });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
