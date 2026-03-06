"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

import { useSiteAudio } from "@/components/providers/site-audio-provider";
import { SPLASH_FINISHED_EVENT } from "@/lib/events";
import { useLocale } from "@/lib/use-locale";

type SplashState = "hidden" | "loading" | "blocked" | "playing" | "exiting";

const INTRO_FALLBACK_DURATION_MS = 2600;
const EXIT_ANIMATION_MS = 820;
const INTRO_TRACKS = [
  "/assets/songs/intro/Anna-su.mp3",
  "/assets/songs/intro/Hina.mp3",
  "/assets/songs/intro/Hyan.mp3",
  "/assets/songs/intro/Itsuki.mp3",
  "/assets/songs/intro/Kuon.mp3",
  "/assets/songs/intro/Sameno.mp3",
];

export function SplashGate() {
  const locale = useLocale();
  const { playBgm } = useSiteAudio();
  const selectedTrack = useMemo(
    () => INTRO_TRACKS[Math.floor(Math.random() * INTRO_TRACKS.length)],
    [],
  );

  const [splashState, setSplashState] = useState<SplashState>("loading");
  const [timelineDurationMs, setTimelineDurationMs] = useState(
    INTRO_FALLBACK_DURATION_MS,
  );
  const [exitReady, setExitReady] = useState(false);
  const [introAttempt, setIntroAttempt] = useState(0);

  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutIdsRef = useRef<number[]>([]);
  const isFinalizedRef = useRef(false);
  const isMountedRef = useRef(true);
  const playBgmRef = useRef(playBgm);

  useEffect(() => {
    playBgmRef.current = playBgm;
  }, [playBgm]);

  const clearScheduledTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutIdsRef.current = [];
  }, []);

  const cleanupIntroAudio = useCallback(() => {
    if (!introAudioRef.current) {
      return;
    }

    introAudioRef.current.onended = null;
    introAudioRef.current.onerror = null;
    introAudioRef.current.pause();
    introAudioRef.current.currentTime = 0;
    introAudioRef.current = null;
  }, []);

  const finalizeSplash = useCallback(async () => {
    if (isFinalizedRef.current || !isMountedRef.current) {
      return;
    }

    isFinalizedRef.current = true;
    clearScheduledTimeouts();
    cleanupIntroAudio();

    setSplashState("hidden");
    document.documentElement.dataset.splashDone = "true";
    window.dispatchEvent(new Event(SPLASH_FINISHED_EVENT));

    try {
      await playBgmRef.current();
    } catch {
      
    }
  }, [cleanupIntroAudio, clearScheduledTimeouts]);

  const beginExit = useCallback(() => {
    if (isFinalizedRef.current) {
      return;
    }

    setExitReady(true);
    setSplashState("exiting");
  }, []);

  const scheduleTimeline = useCallback(
    (durationMs: number) => {
      clearScheduledTimeouts();

      const safeDuration = Math.max(durationMs, INTRO_FALLBACK_DURATION_MS);
      const exitAt = Math.max(safeDuration - EXIT_ANIMATION_MS, 620);
      const hardFinalizeAt = safeDuration + EXIT_ANIMATION_MS + 280;

      timeoutIdsRef.current.push(
        window.setTimeout(() => {
          beginExit();
        }, exitAt),
      );

      timeoutIdsRef.current.push(
        window.setTimeout(() => {
          void finalizeSplash();
        }, hardFinalizeAt),
      );
    },
    [beginExit, clearScheduledTimeouts, finalizeSplash],
  );

  const resolveIntroDuration = useCallback(
    (audio: HTMLAudioElement): Promise<number> =>
      new Promise((resolve) => {
        let resolved = false;

        const complete = (value: number) => {
          if (resolved) {
            return;
          }

          resolved = true;
          resolve(Math.max(value, INTRO_FALLBACK_DURATION_MS));
        };

        if (Number.isFinite(audio.duration) && audio.duration > 0) {
          complete(audio.duration * 1000);
          return;
        }

        const onMetadata = () => {
          complete(audio.duration * 1000);
        };

        const fallbackTimeout = window.setTimeout(() => {
          complete(INTRO_FALLBACK_DURATION_MS);
        }, 1400);

        audio.addEventListener("loadedmetadata", onMetadata, { once: true });
        timeoutIdsRef.current.push(fallbackTimeout);
      }),
    [],
  );

  const tryStartIntro = useCallback(async () => {
    if (!isMountedRef.current) {
      return;
    }

    setIntroAttempt((current) => current + 1);
    isFinalizedRef.current = false;
    setExitReady(false);
    setSplashState("loading");
    clearScheduledTimeouts();

    if (!introAudioRef.current) {
      const introAudio = new Audio(selectedTrack);
      introAudio.preload = "auto";
      introAudio.onerror = () => {
        if (!isMountedRef.current || isFinalizedRef.current) {
          return;
        }
        setSplashState("blocked");
      };
      introAudio.onended = () => {
        beginExit();
      };
      introAudioRef.current = introAudio;
      introAudio.load();
    }

    const introAudio = introAudioRef.current;
    if (!introAudio) {
      return;
    }

    try {
      introAudio.currentTime = 0;
      await introAudio.play();
      setSplashState("playing");

      const durationMs = await resolveIntroDuration(introAudio);
      setTimelineDurationMs(durationMs);
      scheduleTimeline(durationMs);
    } catch {
      setSplashState("blocked");
    }
  }, [beginExit, clearScheduledTimeouts, resolveIntroDuration, scheduleTimeline, selectedTrack]);

  useEffect(() => {
    isMountedRef.current = true;
    document.documentElement.dataset.splashDone = "false";

    void tryStartIntro();

    return () => {
      isMountedRef.current = false;
      clearScheduledTimeouts();
      cleanupIntroAudio();
    };
  }, [cleanupIntroAudio, clearScheduledTimeouts, tryStartIntro]);

  useEffect(() => {
    if (splashState !== "blocked") {
      return;
    }

    const onUserInteraction = () => {
      void tryStartIntro();
    };

    window.addEventListener("pointerdown", onUserInteraction, { once: true });
    window.addEventListener("touchstart", onUserInteraction, { once: true });
    window.addEventListener("keydown", onUserInteraction, { once: true });
    window.addEventListener("pointermove", onUserInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
      window.removeEventListener("pointermove", onUserInteraction);
    };
  }, [splashState, tryStartIntro]);

  const brandLetters = useMemo(
    () => locale.splash.primaryBrandLabel.split(""),
    [locale.splash.primaryBrandLabel],
  );

  if (splashState === "hidden") {
    return null;
  }

  const isBlocked = splashState === "blocked";
  const progressDurationSeconds = Math.max(
    (timelineDurationMs - EXIT_ANIMATION_MS) / 1000,
    1.15,
  );

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-hidden bg-[var(--ink)]"
      initial={{ y: 0 }}
      animate={
        splashState === "exiting" && exitReady
          ? {
            y: "-105%",
            borderBottomLeftRadius: 88,
            borderBottomRightRadius: 88,
          }
          : { y: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
      }
      transition={{ duration: EXIT_ANIMATION_MS / 1000, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (splashState === "exiting") {
          void finalizeSplash();
        }
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-[2.8rem] bg-[var(--brand)]/30"
        animate={{ y: [0, 8, 0], x: [0, -6, 0] }}
        transition={{ duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-2rem] bottom-[-2rem] h-72 w-72 rounded-[3rem] border border-[color:rgba(255,255,255,0.15)] bg-[color:rgba(255,255,255,0.05)]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 pb-20">
        <div className="w-full max-w-xl text-center">
          <motion.p
            className="heading-font text-5xl tracking-tight text-[var(--paper)] sm:text-6xl"
            initial={{ opacity: 0.92, y: 0 }}
            animate={{ opacity: [0.92, 1, 0.92], y: [0, -1, 0] }}
            transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            {brandLetters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className="inline-block"
                initial={{ opacity: 0, y: 26, rotateX: -68 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: index * 0.055,
                  duration: 0.46,
                  ease: "easeOut",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.p>

          <div className="mx-auto mt-8 h-1.5 w-72 overflow-hidden rounded-full bg-[color:rgba(255,255,255,0.14)]">
            {isBlocked ? (
              <motion.div
                key={`blocked-${introAttempt}`}
                className="h-full w-24 bg-[var(--brand)]"
                initial={{ x: "-120%" }}
                animate={{ x: ["-120%", "310%"] }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ) : (
              <motion.div
                key={`progress-${introAttempt}`}
                className="h-full origin-left bg-[var(--brand)]"
                initial={{ scaleX: 0.05 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: progressDurationSeconds,
                  ease: "linear",
                }}
              />
            )}
          </div>

          <motion.div
            className="mx-auto mt-3 h-px w-36 bg-[var(--paper)]/38"
            animate={{ scaleX: [0.8, 1, 0.8], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 1.7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <p className="mt-3 text-[11px] tracking-[0.12em] text-[var(--paper)]/62 uppercase">
            {isBlocked ? locale.splash.tapToStart : locale.splash.loadingLabel}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 border-t border-[color:rgba(255,255,255,0.12)] px-6 py-4 text-center">
        <p className="text-[10px] tracking-[0.12em] text-[var(--paper)]/54 uppercase">
          {locale.splash.secondaryBrandPrefix}
        </p>
      </div>
    </motion.div>
  );
}
