"use client";

import type { CSSProperties } from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const TOAST_DURATION_MS = 4200;

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster umacraft-toaster"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--duration": `${TOAST_DURATION_MS}ms`,
          "--toast-expire-duration": `${TOAST_DURATION_MS}ms`,
        } as CSSProperties
      }
      toastOptions={{
        duration: TOAST_DURATION_MS,
        classNames: {
          toast:
            "umacraft-toast group pointer-events-auto relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] shadow-[0_16px_34px_-12px_rgba(25,25,25,0.26)]",
          title: "text-sm font-semibold tracking-tight text-[var(--ink)]",
          description: "text-xs text-[var(--ink)]/72",
          actionButton:
            "rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--mist)]",
          cancelButton:
            "rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--mist)]",
          success: "border-emerald-200/80",
          info: "border-sky-200/80",
          warning: "border-amber-200/80",
          error: "border-red-200/80",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
