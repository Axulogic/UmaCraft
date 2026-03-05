"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  // A modern, semantic multi-pillar wipe that fits the block/voxel theme of UmaCraft.
  // We use 5 columns that fall downwards. We use two layers for a premium effect:
  // Layer 1: dark/neutral, Layer 2: brand color.

  const columns = 5;

  // Layer 1: Base "Ink" layer to give contrast
  const inkLayerVariants = {
    initial: { top: 0 },
    enter: (i: number) => ({
      top: "100%",
      transition: {
        duration: 0.8,
        delay: 0.04 * i, // Stagger effect matching Minecraft falling blocks
        ease: [0.76, 0, 0.24, 1] as const,
      },
    }),
  };

  // Layer 2: Primary "Brand" layer sweeping shortly after
  const brandLayerVariants = {
    initial: { top: 0 },
    enter: (i: number) => ({
      top: "100%",
      transition: {
        duration: 0.8,
        delay: 0.04 * i + 0.1, // slightly delayed for trailing effect
        ease: [0.76, 0, 0.24, 1] as const,
      },
    }),
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[100] flex h-full w-full overflow-hidden">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={`ink-${i}`}
            custom={i}
            variants={inkLayerVariants}
            initial="initial"
            animate="enter"
            className="relative h-full w-full bg-[var(--ink)]"
          />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-[101] flex h-full w-full overflow-hidden">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={`brand-${i}`}
            custom={i}
            variants={brandLayerVariants}
            initial="initial"
            animate="enter"
            className="relative h-full w-full bg-primary"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.45,
          delay: 0.22,
          ease: [0.33, 1, 0.68, 1] as const,
        }}
        className="will-change-[opacity]"
      >
        {children}
      </motion.div>
    </>
  );
}
