"use client";

import { useEffect, useState } from "react";

import { HeroSection } from "@/components/layout/hero-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { Topbar } from "@/components/layout/topbar";
import { SPLASH_FINISHED_EVENT } from "@/lib/events";

export default function Home() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.splashDone === "true") {
      setIsSplashFinished(true);
    }

    const onSplashFinished = () => {
      setIsSplashFinished(true);
    };

    window.addEventListener(SPLASH_FINISHED_EVENT, onSplashFinished);
    return () => {
      window.removeEventListener(SPLASH_FINISHED_EVENT, onSplashFinished);
    };
  }, []);

  if (!isSplashFinished) {
    return <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]" />;
  }

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <main>
        <HeroSection />
      </main>
      <SiteFooter />
    </div>
  );
}
