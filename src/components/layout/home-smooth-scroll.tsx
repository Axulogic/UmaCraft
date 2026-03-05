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
    let resizeObserver: ResizeObserver | null = null;
    let refreshFrame = 0;
    let delayedRefreshTimer = 0;
    let scrollTriggerRef: { refresh: () => void; config?: (vars: Record<string, unknown>) => void } | null = null;

    const requestRefresh = () => {
      if (refreshFrame) return;
      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = 0;
        scrollTriggerRef?.refresh();
      });
    };

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollSmoother } = await import("gsap/ScrollSmoother");

      if (!isActive) return;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      scrollTriggerRef = ScrollTrigger;
      ScrollTrigger.config?.({ ignoreMobileResize: true });

      // In App Router transitions, two pages can overlap briefly.
      // Ensure only one ScrollSmoother instance exists at a time.
      ScrollSmoother.get()?.kill();

      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: prefersReducedMotion ? 0.35 : 1.15,
        smoothTouch: prefersReducedMotion ? 0.01 : 0.08,
        effects: false,
        normalizeScroll: true,
      });

      resizeObserver = new ResizeObserver(() => {
        requestRefresh();
      });
      resizeObserver.observe(contentRef.current!);
      window.addEventListener("load", requestRefresh);
      window.addEventListener("pageshow", requestRefresh);
      requestRefresh();
      delayedRefreshTimer = window.setTimeout(requestRefresh, 900);

      destroy = () => {
        if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
        if (delayedRefreshTimer) window.clearTimeout(delayedRefreshTimer);
        resizeObserver?.disconnect();
        window.removeEventListener("load", requestRefresh);
        window.removeEventListener("pageshow", requestRefresh);
        if (ScrollSmoother.get() === smoother) {
          smoother.kill();
        }
      };
    })();

    return () => {
      isActive = false;
      destroy?.();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="min-h-full bg-inherit">
      <div ref={contentRef} className="min-h-full bg-inherit">
        {children}
      </div>
    </div>
  );
}
