"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [fallbackVisible, setFallbackVisible] = useState(false);

  // Fallback: if section hasn't appeared after 2s, force it visible
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView) setFallbackVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isInView]);

  const shouldShow = isInView || fallbackVisible;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
