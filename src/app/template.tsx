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
                ease: [0.76, 0, 0.24, 1],
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
                ease: [0.76, 0, 0.24, 1],
            },
        }),
    };

    return (
        <>
            {/* 
        INK LAYER (Dark)
        Pointer events none so it doesn't block interaction after animating out.
        z-[100] is high enough to cover layout but we drop it to 99 so brand is above.
      */}
            <div className="pointer-events-none fixed inset-0 z-[100] flex w-full h-full overflow-hidden">
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

            {/* 
        BRAND LAYER (Orange/Primary)
        On top of ink layer.
      */}
            <div className="pointer-events-none fixed inset-0 z-[101] flex w-full h-full overflow-hidden">
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

            {/* 
        PAGE CONTENT WRAPPER
        Subtle blur and translateY to make the content 'land' softly
        after the columns clear the viewport. 
      */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{
                    duration: 0.8,
                    delay: 0.35,
                    ease: [0.33, 1, 0.68, 1]
                }}
                className="will-change-transform"
            >
                {children}
            </motion.div>
        </>
    );
}
