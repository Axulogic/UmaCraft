"use client";

import { useEffect, useRef } from "react";

type HomeSmoothScrollProps = {
  children: React.ReactNode;
};

export function HomeSmoothScroll({ children }: HomeSmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let isActive = true;
    let destroy: (() => void) | null = null;

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollSmoother } = await import("gsap/ScrollSmoother");

      if (!isActive) return;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: prefersReducedMotion ? 0.45 : 1.5,
        smoothTouch: prefersReducedMotion ? 0.05 : 0.6,
        effects: true,
        normalizeScroll: true,
      });

      destroy = () => {
        smoother.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    })();

    return () => {
      isActive = false;
      destroy?.();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
