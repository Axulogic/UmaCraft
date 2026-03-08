"use client";

import { useEffect, type ReactNode } from "react";

import { ScrollProgress } from "@/components/layout/scroll-progress";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { SplashGate } from "@/components/splash/splash-gate";
import { SiteAudioProvider } from "@/components/providers/site-audio-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { AppLocaleCode } from "@/lib/locale";

export function SiteProviders({
  children,
  localeCode,
}: {
  children: ReactNode;
  localeCode: AppLocaleCode;
}) {
  useEffect(() => {
    const blockImageContextMenu = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest("img")) {
        event.preventDefault();
      }
    };

    const blockImageDrag = (event: DragEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest("img")) {
        event.preventDefault();
      }
    };

    window.addEventListener("contextmenu", blockImageContextMenu);
    window.addEventListener("dragstart", blockImageDrag);

    return () => {
      window.removeEventListener("contextmenu", blockImageContextMenu);
      window.removeEventListener("dragstart", blockImageDrag);
    };
  }, []);

  return (
    <LocaleProvider localeCode={localeCode}>
      <TooltipProvider delayDuration={160}>
        <SiteAudioProvider>
          <ScrollProgress />
          <SplashGate />
          {children}
          <Toaster position="bottom-right" offset={20} />
        </SiteAudioProvider>
      </TooltipProvider>
    </LocaleProvider>
  );
}
