"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Righteous } from "next/font/google";
import { Volume2 } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { HomeSmoothScroll } from "@/components/layout/home-smooth-scroll";
import { Topbar } from "@/components/layout/topbar";
import { PlayNowButton } from "@/components/play/play-now-button";
import { LocalizedLink } from "@/components/routing/localized-link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/use-locale";
import { VOICE_AUDIO_VOLUME_KEY } from "@/lib/storage-keys";
import { renderMinecraftSkinBodyDataUrl } from "@/app/hub/minecraft-skin-render";
import { minecraftSkinsByImageId } from "@/app/hub/minecraft-skins";
import { umaVoiceByImageId } from "@/app/hub/uma-voice-index";

const coverFont = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});

const DEFAULT_VOICE_VOLUME = 0.38;

type SpawnNpcBase = {
  slot: number;
  name: string;
  functionName: string;
  imageId: number;
  imagePath: string;
  imageRenderHeight?: number;
  imageBottom?: number;
  imageMaxWidthPercent?: number;
  imageObjectPosition?: string;
  accent: string;
  glow: string;
};

type SpawnNpc = SpawnNpcBase & {
  roleTitle: string;
  voiceLine: string;
  spotlight: string;
};

const spawnNpcs: SpawnNpcBase[] = [
  {
    slot: 1,
    name: "Silence Suzuka",
    functionName: "Skills",
    imageId: 1002,
    imagePath: "/assets/uma/charas-full/1002__1759357117648.png",
    imageRenderHeight: 600,
    imageBottom: -100,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#29BD70",
    glow: "#FFCE48",
  },
  {
    slot: 2,
    name: "Tokai Teio",
    functionName: "Coinshop",
    imageId: 1003,
    imagePath: "/assets/uma/charas-full/1003__1759357117824.png",
    imageRenderHeight: 600,
    imageBottom: -40,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#3376D2",
    glow: "#FF99D0",
  },
  {
    slot: 3,
    name: "Gold Ship",
    functionName: "Shop",
    imageId: 1007,
    imagePath: "/assets/uma/charas-full/1007__1759357118368.png",
    imageRenderHeight: 600,
    imageBottom: -130,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#DA3C57",
    glow: "#E9DA36",
  },
  {
    slot: 4,
    name: "Vodka",
    functionName: "Toolskins",
    imageId: 1008,
    imagePath: "/assets/uma/charas-full/1008__1759357118488.png",
    imageRenderHeight: 600,
    imageBottom: -80,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#D4C200",
    glow: "#3DD1D7",
  },
  {
    slot: 5,
    name: "TM. Opera O",
    functionName: "Leaderboards",
    imageId: 1015,
    imagePath: "/assets/uma/charas-full/1015__1759357119831.png",
    imageRenderHeight: 600,
    imageBottom: -90,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#F271C4",
    glow: "#FBE415",
  },
  {
    slot: 6,
    name: "Symboli Rudolf",
    functionName: "Quests",
    imageId: 1017,
    imagePath: "/assets/uma/charas-full/1017__1759357120154.png",
    imageRenderHeight: 600,
    imageBottom: -110,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#1C7763",
    glow: "#C6314B",
  },
  {
    slot: 7,
    name: "Tamamo Cross",
    functionName: "Kits",
    imageId: 1021,
    imagePath: "/assets/uma/charas-full/1021__1759357120702.png",
    imageRenderHeight: 600,
    imageBottom: -50,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#3290D6",
    glow: "#C6DAE7",
  },
  {
    slot: 8,
    name: "Mayano Top Gun",
    functionName: "Jobs",
    imageId: 1024,
    imagePath: "/assets/uma/charas-full/1024__1759357121220.png",
    imageRenderHeight: 600,
    imageBottom: -50,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#F57D38",
    glow: "#FFC845",
  },
  {
    slot: 9,
    name: "Manhattan Cafe",
    functionName: "Levels",
    imageId: 1025,
    imagePath: "/assets/uma/charas-full/1025__1759357121320.png",
    imageRenderHeight: 600,
    imageBottom: -90,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#494541",
    glow: "#E8DD4C",
  },
  {
    slot: 10,
    name: "Mihono Bourbon",
    functionName: "Factories",
    imageId: 1026,
    imagePath: "/assets/uma/charas-full/1026__1759357121458.png",
    imageRenderHeight: 600,
    imageBottom: -100,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#EE60A1",
    glow: "#F0ED41",
  },
  {
    slot: 11,
    name: "Agnes Tachyon",
    functionName: "Help",
    imageId: 1032,
    imagePath: "/assets/uma/charas-full/1032__1759357122298.png",
    imageRenderHeight: 600,
    imageBottom: -100,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#35B2B6",
    glow: "#E2E868",
  },
  {
    slot: 12,
    name: "Curren Chan",
    functionName: "Lottery",
    imageId: 1038,
    imagePath: "/assets/uma/charas-full/1038__1759357123033.png",
    imageRenderHeight: 600,
    imageBottom: -90,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#F86669",
    glow: "#47423E",
  },
  {
    slot: 13,
    name: "Nakayama Festa",
    functionName: "Rewards",
    imageId: 1049,
    imagePath: "/assets/uma/charas-full/1049__1759357124357.png",
    imageRenderHeight: 600,
    imageBottom: -100,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#C0453F",
    glow: "#236192",
  },
  {
    slot: 14,
    name: "Haru Urara",
    functionName: "Player Warps",
    imageId: 1052,
    imagePath: "/assets/uma/charas-full/1052__1759357124746.png",
    imageRenderHeight: 600,
    imageBottom: -65,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#FA7395",
    glow: "#EDE04B",
  },
  {
    slot: 15,
    name: "Matikanetanhauser",
    functionName: "Warps",
    imageId: 1062,
    imagePath: "/assets/uma/charas-full/1062__1759357126023.png",
    imageRenderHeight: 600,
    imageBottom: -90,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#0f8dce",
    glow: "#ee5b56",
  },
  {
    slot: 16,
    name: "Daitaku Helios",
    functionName: "Cosmetics",
    imageId: 1065,
    imagePath: "/assets/uma/charas-full/1065__1759357126370.png",
    imageRenderHeight: 600,
    imageBottom: -90,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#5b64d5",
    glow: "#fbe247",
  },
  {
    slot: 17,
    name: "Still In Love",
    functionName: "Tags",
    imageId: 1097,
    imagePath: "/assets/uma/charas-full/1097__1759357130603.png",
    imageRenderHeight: 600,
    imageBottom: -75,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#d83a43",
    glow: "#6fbbf1",
  },
  {
    slot: 18,
    name: "Dream Journey",
    functionName: "Daily Quests",
    imageId: 1119,
    imagePath: "/assets/uma/charas-full/1119__1759357133107.png",
    imageRenderHeight: 600,
    imageBottom: -75,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#332d1f",
    glow: "#e6e08a",
  },
  {
    slot: 19,
    name: "Stay Gold",
    functionName: "Auction",
    imageId: 1135,
    imagePath: "/assets/uma/charas-full/1135__1759357134215.png",
    imageRenderHeight: 600,
    imageBottom: -65,
    imageMaxWidthPercent: 100,
    imageObjectPosition: "center bottom",
    accent: "#bfb33e",
    glow: "#49699c",
  },
];

export function HubPageContent() {
  const locale = useLocale();
  const copy = locale.pages.hub;
  const npcCopyByImageId = useMemo(
    () => new Map(copy.npcCopy.map((entry) => [entry.imageId, entry])),
    [copy.npcCopy],
  );

  const orderedSpawnNpcs = useMemo(
    () =>
      spawnNpcs
        .slice()
        .sort((a, b) => a.imageId - b.imageId)
        .map((npc, index) => {
          const localized = npcCopyByImageId.get(npc.imageId);
          return {
            ...npc,
            slot: index + 1,
            roleTitle: localized?.roleTitle ?? npc.functionName,
            voiceLine: localized?.voiceLine ?? "",
            spotlight: localized?.spotlight ?? "",
          };
        }),
    [npcCopyByImageId],
  );

  const [imageSizes, setImageSizes] = useState<
    Record<number, { card: number; render: number }>
  >({});
  const [flippedBySlot, setFlippedBySlot] = useState<Record<number, boolean>>({});
  const [minecraftBodyByImageId, setMinecraftBodyByImageId] = useState<Record<number, string>>({});
  const [voiceVolume, setVoiceVolume] = useState(DEFAULT_VOICE_VOLUME);
  const activeVoiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const activeVoiceSlotRef = useRef<number | null>(null);

  const stopActiveVoice = () => {
    const current = activeVoiceAudioRef.current;
    if (!current) return;

    current.pause();
    current.currentTime = 0;
    activeVoiceAudioRef.current = null;
    activeVoiceSlotRef.current = null;
  };

  const playNpcVoice = (npc: SpawnNpc) => {
    const voiceEntry = umaVoiceByImageId[npc.imageId];
    if (!voiceEntry?.localPath) return;

    if (activeVoiceSlotRef.current === npc.slot && activeVoiceAudioRef.current) {
      activeVoiceAudioRef.current.volume = voiceVolume;
      return;
    }

    stopActiveVoice();

    const voiceAudio = new Audio(voiceEntry.localPath);
    voiceAudio.preload = "auto";
    voiceAudio.volume = voiceVolume;
    voiceAudio.currentTime = 0;
    voiceAudio.onended = () => {
      if (activeVoiceAudioRef.current === voiceAudio) {
        activeVoiceAudioRef.current = null;
        activeVoiceSlotRef.current = null;
      }
    };

    activeVoiceAudioRef.current = voiceAudio;
    activeVoiceSlotRef.current = npc.slot;
    void voiceAudio.play().catch(() => {
      if (activeVoiceAudioRef.current === voiceAudio) {
        activeVoiceAudioRef.current = null;
        activeVoiceSlotRef.current = null;
      }
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(VOICE_AUDIO_VOLUME_KEY);
    const parsed = Number(stored);
    if (Number.isFinite(parsed)) {
      const normalized = Math.max(0, Math.min(1, parsed));
      setVoiceVolume(normalized);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(VOICE_AUDIO_VOLUME_KEY, String(voiceVolume));
    }

    if (activeVoiceAudioRef.current) {
      activeVoiceAudioRef.current.volume = voiceVolume;
    }
  }, [voiceVolume]);

  useEffect(
    () => () => {
      const current = activeVoiceAudioRef.current;
      if (!current) return;
      current.pause();
      current.currentTime = 0;
      activeVoiceAudioRef.current = null;
      activeVoiceSlotRef.current = null;
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    const loaders = orderedSpawnNpcs.map(
      (npc) =>
        new Promise<{ slot: number; card: number; render: number }>((resolve) => {
          const image = new window.Image();
          image.onload = () => {
            const naturalWidth = image.naturalWidth || 1;
            const naturalHeight = image.naturalHeight || 1;
            const ratio = naturalHeight / naturalWidth;
            const estimatedCardHeight = Math.round(230 + ratio * 120);
            const boundedCardHeight = Math.max(360, Math.min(445, estimatedCardHeight));
            const estimatedRenderHeight = Math.round(205 + ratio * 150);
            const boundedRenderHeight = Math.max(220, Math.min(360, estimatedRenderHeight));
            resolve({ slot: npc.slot, card: boundedCardHeight, render: boundedRenderHeight });
          };
          image.onerror = () => resolve({ slot: npc.slot, card: 390, render: 290 });
          image.src = npc.imagePath;
        }),
    );

    void Promise.all(loaders).then((results) => {
      if (cancelled) return;

      setImageSizes(
        results.reduce<Record<number, { card: number; render: number }>>((acc, entry) => {
          acc[entry.slot] = { card: entry.card, render: entry.render };
          return acc;
        }, {}),
      );
    });

    return () => {
      cancelled = true;
    };
  }, [orderedSpawnNpcs]);

  useEffect(() => {
    let cancelled = false;

    const uniqueSkins = Array.from(
      new Map(
        orderedSpawnNpcs
          .map((npc) => ({ imageId: npc.imageId, skin: minecraftSkinsByImageId[npc.imageId] }))
          .filter((entry) => Boolean(entry.skin))
          .map((entry) => [entry.imageId, entry.skin!]),
      ).entries(),
    );

    const tasks = uniqueSkins.map(async ([imageId, skin]) => {
      const dataUrl = await renderMinecraftSkinBodyDataUrl(skin.skinPath);
      return { imageId, dataUrl };
    });

    void Promise.all(tasks).then((results) => {
      if (cancelled) return;

      const resolved: Record<number, string> = {};
      for (const result of results) {
        if (result.dataUrl) resolved[result.imageId] = result.dataUrl;
      }
      setMinecraftBodyByImageId(resolved);
    });

    return () => {
      cancelled = true;
    };
  }, [orderedSpawnNpcs]);

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <HomeSmoothScroll>
        <main className="relative overflow-hidden pb-20 pt-24">
          <div className="relative mx-auto w-full max-w-7xl px-6">
          <section className="page-enter mt-4 space-y-4">

            <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[0_20px_60px_-40px_rgba(25,25,25,0.55)] sm:p-6">
              <h1 className="heading-font text-3xl font-semibold leading-tight sm:text-4xl">
                {copy.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--ink)]/74 sm:text-base">
                {copy.intro}
              </p>
            </div>
          </section>

          <section className="page-enter page-enter-d1 mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {orderedSpawnNpcs.map((npc) => {
              const coverBackground = npc.accent;
              const auraBackground = `radial-gradient(circle at 18% 18%, ${npc.glow}22 0%, transparent 58%)`;
              const minecraftSkin = minecraftSkinsByImageId[npc.imageId];
              const voiceEntry = umaVoiceByImageId[npc.imageId];
              const hasVoiceAudio = Boolean(voiceEntry?.localPath);
              const isFlipped = Boolean(flippedBySlot[npc.slot]);
              const roleTitleLength = npc.roleTitle.length;
              const nameLength = npc.name.length;
              const roleTitleFontRem = Math.max(0.5, 0.74 - roleTitleLength * 0.0085);
              const roleTitleSpacingEm = Math.max(0.04, 0.14 - roleTitleLength * 0.0035);
              const nameFontRem = Math.max(
                0.8,
                1.34 - nameLength * 0.03 - Math.max(0, roleTitleLength - 20) * 0.009,
              );

              return (
                <article
                  key={npc.slot}
                  className={`group relative mx-auto h-[430px] w-full max-w-[340px] overflow-hidden rounded-[1.15rem] border border-[var(--line)]/75 bg-[var(--paper)] shadow-[0_20px_70px_-35px_rgba(25,25,25,0.62)] ${npc.slot === orderedSpawnNpcs.length ? "xl:col-start-2" : ""}`}
                  style={{ height: `${imageSizes[npc.slot]?.card ?? 390}px` }}
                  onMouseEnter={() => {
                    playNpcVoice(npc);
                  }}
                  onMouseLeave={() => {
                    if (activeVoiceSlotRef.current === npc.slot) {
                      stopActiveVoice();
                    }
                  }}
                >
                  <div className="absolute inset-0 [perspective:1200px]">
                    <button
                      type="button"
                      onClick={() =>
                        setFlippedBySlot((prev) => ({
                          ...prev,
                          [npc.slot]: !prev[npc.slot],
                        }))
                      }
                      className="absolute inset-0 z-10 cursor-pointer bg-transparent"
                      aria-label={
                        isFlipped
                          ? `${copy.flipToArtAriaPrefix}${npc.name}`
                          : `${copy.flipToSkinAriaPrefix}${npc.name}`
                      }
                    />
                    <div className="absolute inset-0" style={{ background: auraBackground }} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.22)_100%)]" />
                    <div
                      className="relative z-[1] h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
                      style={{
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <div className="absolute inset-0 [backface-visibility:hidden]">
                        <div
                          className="absolute left-1/2 -translate-x-1/2 select-none"
                          style={{
                            bottom: `${npc.imageBottom ?? 12}px`,
                            height: `${npc.imageRenderHeight ?? imageSizes[npc.slot]?.render ?? 290}px`,
                            width: `${npc.imageMaxWidthPercent ?? 92}%`,
                          }}
                        >
                          <Image
                            src={npc.imagePath}
                            alt={npc.name}
                            fill
                            unoptimized
                            draggable={false}
                            sizes="(max-width: 768px) 90vw, 30vw"
                            className="object-contain drop-shadow-[0_16px_24px_rgba(25,25,25,0.22)]"
                            style={{
                              objectPosition: npc.imageObjectPosition ?? "center bottom",
                            }}
                          />
                        </div>
                      </div>

                      <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div
                          className="absolute left-1/2 -translate-x-1/2 select-none"
                          style={{
                            bottom: `${minecraftSkin?.bottom ?? -10}px`,
                            height: `${minecraftSkin?.renderHeight ?? 315}px`,
                            width: `${minecraftSkin?.maxWidthPercent ?? 66}%`,
                          }}
                        >
                          <Image
                            src={minecraftBodyByImageId[npc.imageId] ?? minecraftSkin?.skinPath ?? npc.imagePath}
                            alt={`${copy.minecraftSkinAltPrefix}${npc.name}`}
                            fill
                            unoptimized
                            draggable={false}
                            sizes="(max-width: 768px) 75vw, 24vw"
                            className="object-contain drop-shadow-[0_16px_24px_rgba(25,25,25,0.28)]"
                            style={{
                              objectPosition: minecraftSkin?.objectPosition ?? "center bottom",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 left-1/2 z-30 -translate-x-1/2">
                    <div className="inline-flex max-w-[88%] items-center justify-center rounded-2xl border border-[var(--line)]/70 bg-[var(--paper)]/90 px-4 py-2.5 text-center shadow-[0_14px_32px_-24px_rgba(25,25,25,0.6)] backdrop-blur-sm">
                      <p className="heading-font whitespace-nowrap text-base font-semibold leading-tight text-[var(--ink)] [filter:blur(4px)] opacity-70 transition-[filter,opacity] duration-300 ease-out group-hover:[filter:blur(0px)] group-hover:opacity-100 sm:text-lg">
                        {npc.name}
                      </p>
                    </div>
                  </div>

                  {hasVoiceAudio ? (
                    <div className="pointer-events-none absolute right-2 top-2 z-40 flex h-[9.8rem] w-9 origin-right scale-95 flex-col items-center justify-between rounded-lg px-1.5 py-2 opacity-0 shadow-[0_12px_22px_-18px_rgba(25,25,25,0.6)] transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100">
                      <Volume2 className="size-3 text-[var(--ink)]/64" />
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={Math.round(voiceVolume * 100)}
                        onChange={(event) => {
                          const next = Number(event.target.value);
                          if (!Number.isFinite(next)) return;
                          setVoiceVolume(Math.max(0, Math.min(1, next / 100)));
                        }}
                        className="h-[6.9rem] w-[7px] cursor-pointer appearance-none rounded-full bg-[var(--line)]/90 accent-[var(--brand)] [writing-mode:vertical-lr] [direction:rtl]"
                        aria-label={`${copy.voiceVolumeAriaPrefix}${npc.name}`}
                      />
                      <span className="text-[8px] font-semibold uppercase tracking-[0.06em] text-[var(--ink)]/62">
                        {Math.round(voiceVolume * 100)}
                      </span>
                    </div>
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 z-20 p-4">
                    <div className="rounded-2xl border border-[var(--line)]/80 bg-[var(--paper)]/92 p-4 text-[var(--ink)] shadow-[0_18px_38px_-28px_rgba(25,25,25,0.62)] backdrop-blur-md transition-all duration-500 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                      <div className="flex items-baseline gap-2 overflow-hidden whitespace-nowrap">
                        <p
                          className="shrink-0 truncate font-bold uppercase text-[var(--ink)]/58"
                          style={{
                            fontSize: `${roleTitleFontRem.toFixed(2)}rem`,
                            letterSpacing: `${roleTitleSpacingEm.toFixed(3)}em`,
                            maxWidth: "58%",
                          }}
                        >
                          {npc.roleTitle}
                        </p>
                        <h2
                          className="heading-font min-w-0 flex-1 truncate font-semibold leading-tight text-[var(--ink)]"
                          style={{
                            fontSize: `clamp(0.80rem, ${nameFontRem.toFixed(2)}rem, 1.34rem)`,
                          }}
                        >
                          {npc.name}
                        </h2>
                      </div>
                      <p className="mt-2 text-sm italic text-[var(--ink)]/86">
                        &ldquo;{npc.voiceLine}&rdquo;
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/74">{npc.spotlight}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-[var(--line)]/80 bg-[var(--mist)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ink)]/88">
                          {npc.functionName}
                        </span>
                        <span className="rounded-full border border-[var(--line)]/65 bg-[var(--paper)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)]/64">
                          {copy.idChipPrefix} {npc.imageId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-x-0 bottom-0 z-30 h-16 overflow-hidden rounded-b-[1.15rem] border-t border-[var(--line)]/65 transition-[top,height] duration-500 ease-out md:top-[20%] md:h-auto md:rounded-none md:rounded-t-[1rem] md:rounded-b-[1.15rem] md:group-hover:top-[calc(100%-4.35rem)]"
                    style={{ background: coverBackground }}
                  >
                    <div className="absolute inset-0 bg-black/12 transition-colors duration-500 md:group-hover:bg-black/22" />
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-45"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                      }}
                    />
                    <div aria-hidden className="absolute right-3 top-2 h-11 w-11 rounded-full border border-white/35" />
                    <div aria-hidden className="absolute left-4 bottom-2 h-2 w-10 rounded-full bg-white/32" />

                    <div className="relative flex h-full items-center justify-center text-white">
                      <div className="flex items-center justify-center gap-2 transition-all duration-300 md:group-hover:gap-1.5">
                        <p
                          className={`${coverFont.className} text-5xl leading-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition-all duration-500 md:text-[5.4rem] md:group-hover:text-[1.35rem]`}
                        >
                          {String(npc.slot).padStart(2, "0")}
                        </p>
                        <p
                          className={`${coverFont.className} max-w-0 overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-[0.12em] opacity-0 transition-all duration-300 md:group-hover:max-w-[11rem] md:group-hover:opacity-100`}
                        >
                          {npc.functionName}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="page-enter page-enter-d2 mt-12 rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-7 text-center shadow-[0_20px_60px_-36px_rgba(25,25,25,0.52)]">
            <h2 className="heading-font mt-4 text-3xl font-semibold">{copy.summaryTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--ink)]/75">
              {copy.summaryDescription}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <PlayNowButton label={copy.primaryCta} />
              <Button variant="outline" asChild>
                <LocalizedLink href="/features">{copy.secondaryCta}</LocalizedLink>
              </Button>
            </div>
          </section>
          </div>
        </main>
        <SiteFooter />
      </HomeSmoothScroll>
    </div>
  );
}



