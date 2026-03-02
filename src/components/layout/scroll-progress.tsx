"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] h-0.5 w-full origin-left bg-[var(--brand)]"
      style={{ scaleX }}
    />
  );
}
