"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { AUDIO_MUTED_KEY, AUDIO_VOLUME_KEY } from "@/lib/storage-keys";

const DEFAULT_VOLUME = 0.35;
const BGM_SOURCE = "/assets/songs/website/nomabeats.mp3";

function clampVolume(value: number): number {
  if (Number.isNaN(value)) {
    return DEFAULT_VOLUME;
  }

  return Math.max(0, Math.min(1, value));
}

function parseStoredBoolean(value: string | null): boolean {
  return value === "true";
}

function parseStoredVolume(value: string | null): number {
  if (!value) {
    return DEFAULT_VOLUME;
  }

  const parsedValue = Number(value);
  return clampVolume(parsedValue);
}

export interface SiteAudioController {
  isMuted: boolean;
  volume: number;
  pulseLevel: number;
  isPlaying: boolean;
  isReady: boolean;
  playBgm(): Promise<void>;
  pauseBgm(): void;
  setMuted(value: boolean): void;
  setVolume(value: number): void;
}

const SiteAudioContext = createContext<SiteAudioController | undefined>(
  undefined,
);

export function SiteAudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const meterFrameRef = useRef<number | null>(null);
  const meterBufferRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  const [isMuted, setIsMutedState] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [pulseLevel, setPulseLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [awaitingInteraction, setAwaitingInteraction] = useState(false);

  const stopPulseMeter = useCallback(() => {
    if (meterFrameRef.current !== null) {
      window.cancelAnimationFrame(meterFrameRef.current);
      meterFrameRef.current = null;
    }

    setPulseLevel(0);
  }, []);

  const startPulseMeter = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser || meterFrameRef.current !== null) {
      return;
    }

    const data =
      meterBufferRef.current ?? new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
    meterBufferRef.current = data;

    const updateMeter = () => {
      analyser.getByteFrequencyData(data);

      
      const from = 2;
      const to = Math.min(data.length, 38);
      let energySum = 0;

      for (let index = from; index < to; index += 1) {
        energySum += data[index] ?? 0;
      }

      const average = energySum / Math.max(to - from, 1);
      const normalized = average / 255;
      setPulseLevel((current) => current * 0.76 + normalized * 0.24);

      meterFrameRef.current = window.requestAnimationFrame(updateMeter);
    };

    meterFrameRef.current = window.requestAnimationFrame(updateMeter);
  }, []);

  const ensureAudioGraph = useCallback(async () => {
    const audioElement = audioRef.current;
    if (!audioElement || typeof window === "undefined") {
      return;
    }

    const AudioContextClass: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    const audioContext = audioContextRef.current;
    if (!audioContext) {
      return;
    }

    if (!analyserRef.current) {
      const analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 256;
      analyserNode.smoothingTimeConstant = 0.72;
      analyserRef.current = analyserNode;
    }

    if (!sourceNodeRef.current && analyserRef.current) {
      try {
        const sourceNode = audioContext.createMediaElementSource(audioElement);
        sourceNode.connect(analyserRef.current);
        analyserRef.current.connect(audioContext.destination);
        sourceNodeRef.current = sourceNode;
      } catch {
        
      }
    }

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setIsMutedState(parseStoredBoolean(window.localStorage.getItem(AUDIO_MUTED_KEY)));
    setVolumeState(parseStoredVolume(window.localStorage.getItem(AUDIO_VOLUME_KEY)));
  }, []);

  useEffect(() => {
    const bgmAudio = new Audio(BGM_SOURCE);
    bgmAudio.loop = true;
    bgmAudio.preload = "auto";

    const onCanPlay = () => setIsReady(true);
    const onPlay = () => {
      setIsPlaying(true);
      startPulseMeter();
    };
    const onPause = () => {
      setIsPlaying(false);
      stopPulseMeter();
    };
    const onError = () => {
      setIsReady(false);
      setIsPlaying(false);
      stopPulseMeter();
      setAwaitingInteraction(true);
    };

    bgmAudio.addEventListener("canplaythrough", onCanPlay);
    bgmAudio.addEventListener("play", onPlay);
    bgmAudio.addEventListener("pause", onPause);
    bgmAudio.addEventListener("ended", onPause);
    bgmAudio.addEventListener("error", onError);

    audioRef.current = bgmAudio;
    bgmAudio.load();

    return () => {
      bgmAudio.pause();
      bgmAudio.removeEventListener("canplaythrough", onCanPlay);
      bgmAudio.removeEventListener("play", onPlay);
      bgmAudio.removeEventListener("pause", onPause);
      bgmAudio.removeEventListener("ended", onPause);
      bgmAudio.removeEventListener("error", onError);
      audioRef.current = null;
      stopPulseMeter();
      meterBufferRef.current = null;

      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }

      if (analyserRef.current) {
        analyserRef.current.disconnect();
        analyserRef.current = null;
      }

      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        void audioContextRef.current.close();
      }
      audioContextRef.current = null;

      setIsPlaying(false);
      setIsReady(false);
    };
  }, [startPulseMeter, stopPulseMeter]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(AUDIO_MUTED_KEY, String(isMuted));
    window.localStorage.setItem(AUDIO_VOLUME_KEY, String(volume));

    if (!audioRef.current) {
      return;
    }

    audioRef.current.muted = isMuted;
    audioRef.current.volume = volume;
  }, [isMuted, volume]);

  const playBgm = useCallback(async () => {
    const bgmAudio = audioRef.current;
    if (!bgmAudio) {
      return;
    }

    if (bgmAudio.readyState === 0) {
      bgmAudio.load();
    }

    try {
      await ensureAudioGraph();
      await bgmAudio.play();
      setAwaitingInteraction(false);
    } catch {
      if (!isMuted && volume > 0.001) {
        setAwaitingInteraction(true);
      }
    }
  }, [ensureAudioGraph, isMuted, volume]);

  useEffect(() => {
    if (!awaitingInteraction || isMuted || volume <= 0.001) {
      return;
    }

    const retryPlayback = () => {
      void playBgm().catch(() => undefined);
    };

    window.addEventListener("pointerdown", retryPlayback, { passive: true });
    window.addEventListener("touchstart", retryPlayback, { passive: true });
    window.addEventListener("keydown", retryPlayback);

    return () => {
      window.removeEventListener("pointerdown", retryPlayback);
      window.removeEventListener("touchstart", retryPlayback);
      window.removeEventListener("keydown", retryPlayback);
    };
  }, [awaitingInteraction, isMuted, playBgm, volume]);

  useEffect(() => {
    if (isMuted || volume <= 0.001) {
      setAwaitingInteraction(false);
      setPulseLevel(0);
    }
  }, [isMuted, volume]);

  const pauseBgm = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const setMuted = useCallback((value: boolean) => {
    setIsMutedState(value);
  }, []);

  const setVolume = useCallback((value: number) => {
    setVolumeState(clampVolume(value));
  }, []);

  const value = useMemo<SiteAudioController>(
    () => ({
      isMuted,
      volume,
      pulseLevel,
      isPlaying,
      isReady,
      playBgm,
      pauseBgm,
      setMuted,
      setVolume,
    }),
    [
      isMuted,
      volume,
      pulseLevel,
      isPlaying,
      isReady,
      playBgm,
      pauseBgm,
      setMuted,
      setVolume,
    ],
  );

  return (
    <SiteAudioContext.Provider value={value}>{children}</SiteAudioContext.Provider>
  );
}

export function useSiteAudio(): SiteAudioController {
  const contextValue = useContext(SiteAudioContext);

  if (!contextValue) {
    throw new Error("useSiteAudio must be used inside SiteAudioProvider.");
  }

  return contextValue;
}
