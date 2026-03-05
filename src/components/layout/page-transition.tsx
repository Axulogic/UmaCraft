"use client";

import { motion } from "motion/react";

export function PageTransition({ children }: { children: React.ReactNode }) {
    // We can create a 5-column wipe effect that fits the blocky/Minecraft theme
    // while still looking very modern and sleek.
    const columns = 5;

    const expandVariants = {
        initial: { top: 0 },
        enter: (i: number) => ({
            top: "100%",
            transition: {
                duration: 0.5,
                delay: 0.05 * i,
                ease: [0.76, 0, 0.24, 1] as const,
            },
        }),
    };

    return (
        <div className="relative w-full overflow-hidden">
            {/* 
        We use an absolute overlay for the columns. 
        When unmounted, the columns are at top: 0, height: 100vh.
        On enter, they slide to top: 100%. 
      */}
            <div
                className="pointer-events-none fixed inset-0 z-[9999] flex h-screen w-full"
            >
                {[...Array(columns)].map((_, i) => (
                    <motion.div
                        key={i}
                        custom={columns - i} // or i for left-to-right
                        variants={expandVariants}
                        initial="initial"
                        animate="enter"
                        className="relative h-full w-full bg-primary"
                    />
                ))}
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] as const }}
                className="relative"
            >
                {children}
            </motion.div>
        </div>
    );
}
