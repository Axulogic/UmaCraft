"use client";

import { toast, type ExternalToast } from "sonner";

const BURST_WINDOW_MS = 2200;
const MAX_BURST_TOASTS = 4;
const DUPLICATE_BLOCK_MS = 1200;

const recentEmissionTimestamps: number[] = [];
const lastShownByKey = new Map<string, number>();

function cleanupRecent(now: number) {
  while (recentEmissionTimestamps.length > 0 && now - recentEmissionTimestamps[0] > BURST_WINDOW_MS) {
    recentEmissionTimestamps.shift();
  }
}

function canEmitToast(key: string, now: number): boolean {
  cleanupRecent(now);
  const previousAt = lastShownByKey.get(key);
  if (typeof previousAt === "number" && now - previousAt < DUPLICATE_BLOCK_MS) {
    return false;
  }
  if (recentEmissionTimestamps.length >= MAX_BURST_TOASTS) {
    return false;
  }
  recentEmissionTimestamps.push(now);
  lastShownByKey.set(key, now);
  return true;
}

function emit(
  kind: "success" | "error" | "info" | "warning",
  message: string,
  options?: ExternalToast,
) {
  const uniqueKey = `${kind}:${options?.id ?? message}`;
  const now = Date.now();
  if (!canEmitToast(uniqueKey, now)) {
    return null;
  }
  if (kind === "success") return toast.success(message, options);
  if (kind === "error") return toast.error(message, options);
  if (kind === "warning") return toast.warning(message, options);
  return toast.info(message, options);
}

export const appToast = {
  success: (message: string, options?: ExternalToast) => emit("success", message, options),
  error: (message: string, options?: ExternalToast) => emit("error", message, options),
  info: (message: string, options?: ExternalToast) => emit("info", message, options),
  warning: (message: string, options?: ExternalToast) => emit("warning", message, options),
};
