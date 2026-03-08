"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  Sparkles,
  Users,
  ArrowRight,
  Boxes,
  Star,
  Play,
  Link2,
  Rocket,
  RefreshCw,
  Clock3,
  BarChart3,
  ChevronLeft,
  X,
  BookOpen,
  CheckCircle2,
  Gamepad2,
  Server,
  Cpu,
  Smartphone,
  CircleHelp,
  Search
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { LocalizedLink } from "@/components/routing/localized-link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocale } from "@/lib/use-locale";
import { HeroPixelRunner } from "@/components/layout/hero-pixel-runner";

const COMMUNITY_AVATARS = [
  "/assets/uma/avatar/1001_100101__Special_Dreamer_.png",
  "/assets/uma/avatar/1002_100201__Silent_Innocence_.png",
  "/assets/uma/avatar/1003_100301__Top_of_Joyful_.png",
];

const FEATURE_ICONS = {
  jukebox: Boxes,
  mascots: Link2,
  modes: Rocket,
};

const SYNC_ITEM_ICONS = [Users, Clock3, BarChart3];

const POPUP_SLIDE_ASSETS = [
  "/assets/hero/chara-pop/tokai_teio.png",
  "/assets/hero/chara-pop/agnes_tachyon.png",
  "/assets/hero/chara-pop/tamamo_cross.png",
  "/assets/hero/chara-pop/gold_ship.png",
];
const POPUP_BACKGROUND_BY_INDEX = ["#3376D2", "#35B2B6", "#3290D6", "#DA3C57"] as const;
const GUIDE_SLIDE_ASSETS = [
  "/assets/tutorial/java/step1.png",
  "/assets/tutorial/java/step2.png",
  "/assets/tutorial/java/step3.png",
  "/assets/tutorial/java/step4.png",
  "/assets/tutorial/java/stepfinal.png",
];
const POPUP_ENTRY_BY_FEATURE: Record<string, number> = {
  jukebox: 0,
  mascots: 1,
  modes: 2,
};

const BEDROCK_PORT = "19132";

export function HeroSection() {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const locale = useLocale();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [runnerStarted, setRunnerStarted] = useState(false);
  const [guideEnabled, setGuideEnabled] = useState(false);
  const [activePopupIndex, setActivePopupIndex] = useState(0);
  const [popupDirection, setPopupDirection] = useState<1 | -1>(1);
  const [isGuidePopupOpen, setIsGuidePopupOpen] = useState(false);
  const [activeGuideIndex, setActiveGuideIndex] = useState(0);
  const [guideDirection, setGuideDirection] = useState<1 | -1>(1);
  const [isGuideImageOpen, setIsGuideImageOpen] = useState(false);
  const [guideImageZoom, setGuideImageZoom] = useState(1);
  const [isPlayPopupOpen, setIsPlayPopupOpen] = useState(false);
  const [activePlayIndex, setActivePlayIndex] = useState(0);
  const [playDirection, setPlayDirection] = useState<1 | -1>(1);
  const [selectedPlayPlatform, setSelectedPlayPlatform] = useState<"java" | "bedrock" | null>(null);
  const heroCopy = locale.hero;
  const playCopy = locale.playNow;
  const serverAddress = locale.brand.serverAddress;
  const popupSlides = heroCopy.popupSlides;
  const guideSlides = heroCopy.guideSlides;
  const playSlides = playCopy.slides;
  const quickLinks = [
    { href: "/about", label: locale.footer.links.about },
    { href: "/features", label: locale.footer.links.features },
    { href: "/faq", label: locale.footer.links.faq },
    { href: "/discord-link", label: locale.footer.links.discordLink },
  ];
  const activePopup = popupSlides[activePopupIndex] ?? popupSlides[0];
  const activePopupImage =
    POPUP_SLIDE_ASSETS[activePopupIndex] ?? POPUP_SLIDE_ASSETS[0] ?? "";
  const activePopupAccent =
    POPUP_BACKGROUND_BY_INDEX[activePopupIndex] ?? POPUP_BACKGROUND_BY_INDEX[0];
  const activeGuide = guideSlides[activeGuideIndex] ?? guideSlides[0];
  const activeGuideImage =
    GUIDE_SLIDE_ASSETS[activeGuideIndex] ?? GUIDE_SLIDE_ASSETS[0] ?? "";
  const activePlay = playSlides[activePlayIndex] ?? playSlides[0];
  const accessiblePlayIndices = useMemo(() => {
    if (selectedPlayPlatform === "java") return [0, 1];
    if (selectedPlayPlatform === "bedrock") return [0, 2];
    return [0, 1, 2];
  }, [selectedPlayPlatform]);
  const canGoPlayBack = activePlayIndex !== 0;

  function openPopupAt(index: number) {
    const safeIndex =
      ((index % popupSlides.length) + popupSlides.length) % popupSlides.length;
    setPopupDirection(1);
    setActivePopupIndex(safeIndex);
    setIsPopupOpen(true);
  }

  function openPopupFromFeature(featureId: string) {
    openPopupAt(POPUP_ENTRY_BY_FEATURE[featureId] ?? 0);
  }

  function openGuidePopupAt(index: number) {
    const safeIndex =
      ((index % guideSlides.length) + guideSlides.length) % guideSlides.length;
    setGuideDirection(1);
    setActiveGuideIndex(safeIndex);
    setIsGuideImageOpen(false);
    setGuideImageZoom(1);
    setIsGuidePopupOpen(true);
  }

  function openPlayPopupAtStart() {
    setPlayDirection(1);
    setActivePlayIndex(0);
    setSelectedPlayPlatform(null);
    setIsPlayPopupOpen(true);
  }

  function handleRunnerGuideButtonClick() {
    if (!runnerStarted) {
      setRunnerStarted(true);
      setGuideEnabled(false);
      return;
    }
    setGuideEnabled((current) => !current);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isPopupOpen && !isGuidePopupOpen && !isPlayPopupOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isGuideImageOpen) {
          setIsGuideImageOpen(false);
          setGuideImageZoom(1);
          return;
        }
        setIsPopupOpen(false);
        setIsGuidePopupOpen(false);
        setIsPlayPopupOpen(false);
        setIsGuideImageOpen(false);
        setGuideImageZoom(1);
        setSelectedPlayPlatform(null);
      }
      if (event.key === "ArrowRight" && isPopupOpen) {
        setPopupDirection(1);
        setActivePopupIndex((current) => (current + 1) % popupSlides.length);
      }
      if (event.key === "ArrowLeft" && isPopupOpen) {
        setPopupDirection(-1);
        setActivePopupIndex((current) => (current - 1 + popupSlides.length) % popupSlides.length);
      }
      if (event.key === "ArrowRight" && isGuidePopupOpen) {
        setGuideDirection(1);
        setActiveGuideIndex((current) => (current + 1) % guideSlides.length);
      }
      if (event.key === "ArrowLeft" && isGuidePopupOpen) {
        setGuideDirection(-1);
        setActiveGuideIndex((current) => (current - 1 + guideSlides.length) % guideSlides.length);
      }
      if (event.key === "ArrowLeft" && isPlayPopupOpen) {
        if (canGoPlayBack) {
          setPlayDirection(-1);
          setActivePlayIndex(0);
          setSelectedPlayPlatform(null);
        }
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [
    guideSlides.length,
    isGuideImageOpen,
    isGuidePopupOpen,
    isPlayPopupOpen,
    isPopupOpen,
    canGoPlayBack,
    playSlides.length,
    popupSlides.length,
  ]);

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-[90vh] w-full overflow-hidden bg-[var(--paper)] pt-32 pb-4"
      
    >

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[var(--brand)]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-[var(--ink)]/5 blur-[100px]" />


        <div className="absolute top-1/4 right-10 w-24 h-24 border-2 border-[var(--line)] rounded-2xl rotate-12 opacity-40" />
        <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-[var(--brand)]/10 rounded-full opacity-50" />
        <div className="absolute top-1/3 left-1/4 w-2 h-24 bg-[var(--line)] rounded-full opacity-30" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">


          <div className="flex-1 space-y-10 -translate-x-[7%]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--mist)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--ink)]/60">
                <Sparkles className="size-3.5 text-[var(--brand)]" />
                {locale.hero.eyebrow}
              </div>
              <div className="space-y-5">
                <h1 className="heading-font text-7xl font-black leading-[0.85] tracking-tighter text-[var(--ink)] sm:text-8xl lg:text-[9rem]">
                  <span className="block text-[var(--ink)]">UMA</span>
                  <span className="relative block text-[var(--brand)]">
                    CRAFT
                    <span
                      aria-hidden
                      className="absolute left-0 top-full mt-2 h-1.5 w-24 rounded-full bg-[var(--brand)]/35"
                    />
                  </span>
                </h1>
                <p className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--ink)]/55">
                  <span>{locale.hero.wordmarkSupportLabel}</span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--brand)]/80" />
                  <span className="text-[var(--ink)]">{locale.hero.wordmarkSupportValue}</span>
                </p>
              </div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {locale.hero.featureCards.map((item, index) => {
                const Icon = FEATURE_ICONS[item.id as keyof typeof FEATURE_ICONS] ?? Star;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => openPopupFromFeature(item.id)}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className="group relative w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 text-left transition-all hover:border-[var(--brand)] hover:shadow-[0_18px_36px_-24px_rgba(25,25,25,0.55)]"
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-xl transition-all duration-500 group-hover:scale-125 ${index % 2 === 0 ? "bg-[var(--brand)]/16" : "bg-[var(--ink)]/8"
                        }`}
                    />
                    <div className="relative z-10">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mist)] text-[var(--brand)] transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:bg-[var(--brand)]/12">
                        <Icon className="size-5" />
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-[var(--ink)]">{item.title}</h3>
                        <ArrowRight className="mt-0.5 size-4 text-[var(--brand)]/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand)]" />
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink)]/60 transition-colors duration-300 group-hover:text-[var(--ink)]/75">
                        {item.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>


          <div className="flex-1 lg:max-w-md space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative rounded-[2.5rem] border-2 border-[var(--ink)] p-8 shadow-[12px_12px_0px_0px_var(--line)]"
            >
              <button
                type="button"
                aria-label={
                  !runnerStarted
                    ? "Start pixel runner"
                    : guideEnabled
                      ? "Disable guide"
                      : "Enable guide"
                }
                onClick={handleRunnerGuideButtonClick}
                className={`absolute -top-4 -left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-[var(--paper)] shadow-lg transition-transform hover:scale-[1.04] active:scale-[0.96] ${
                  guideEnabled ? "bg-[var(--ink)]" : "bg-[var(--brand)]"
                }`}
              >
                {runnerStarted ? (
                  <Search className="size-5" />
                ) : (
                  <Play className="size-5 fill-current" />
                )}
              </button>

              <p className="text-xl font-bold leading-tight text-[var(--ink)] sm:text-2xl">
                {locale.hero.leadLine}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[var(--ink)]/70">
                {locale.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  type="button"
                  size="lg"
                  onClick={openPlayPopupAtStart}
                  className="h-14 rounded-2xl bg-[var(--brand)] text-lg font-black text-[var(--paper)] hover:bg-[var(--brand)]/90 active:scale-[0.98] transition-all"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Gamepad2 className="size-5" />
                    {playCopy.defaultLabel}
                  </span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => openGuidePopupAt(0)}
                  className="h-14 rounded-2xl border-2 border-[var(--line)] bg-transparent text-lg font-bold text-[var(--ink)] hover:bg-[var(--mist)] active:scale-[0.98] transition-all"
                >
                  <span className="flex items-center justify-center gap-3">
                    {heroCopy.guideButtonLabel}
                    <ArrowRight className="size-5" />
                  </span>
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-[var(--line)]">
                <div className="flex -space-x-2.5">
                  {COMMUNITY_AVATARS.map((avatarSrc) => (
                    <div
                      key={avatarSrc}
                      className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[var(--paper)] bg-[var(--mist)] shadow-sm"
                    >
                      <Image src={avatarSrc} alt="" fill sizes="36px" className="object-cover object-top" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/40">
                  {locale.hero.socialProofLabel}{" "}
                  <span className="text-[var(--ink)]">{locale.hero.socialProofHighlight}</span>
                </p>
              </div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-2xl border border-[var(--line)] bg-[var(--mist)] p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--ink)]/65">
                  <RefreshCw className="size-3.5 text-[var(--brand)]" />
                  {locale.hero.syncPanelEyebrow}
                </span>
                <span className="text-[10px] font-bold text-[var(--ink)]/50 uppercase">
                  {locale.hero.syncPanelStatus}
                </span>
              </div>
              <p className="mt-2.5 text-sm font-bold text-[var(--ink)]">{locale.hero.syncPanelTitle}</p>
              <div className="mt-3 grid gap-2">
                {locale.hero.syncPanelItems.map((item, index) => {
                  const Icon = SYNC_ITEM_ICONS[index] ?? BarChart3;
                  return (
                    <p key={item} className="inline-flex items-center gap-2 text-xs text-[var(--ink)]/72">
                      <Icon className="size-3.5 text-[var(--brand)]" />
                      {item}
                    </p>
                  );
                })}
              </div>

            </motion.div>
          </div>

        </div>


        <motion.div
          data-hero-platform="scroll-divider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-11 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-[var(--line)]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/30">
            {locale.hero.scrollIndicatorLabel}
          </span>
          <div className="h-1 w-12 rounded-full bg-[var(--brand)]" />
        </motion.div>

        <HeroPixelRunner
          hostRef={heroSectionRef}
          paused={isPopupOpen || isGuidePopupOpen || isPlayPopupOpen}
          enabled={runnerStarted}
          guideEnabled={guideEnabled}
        />
      </div>

      {isMounted
        ? createPortal(
            <AnimatePresence>
              {isPlayPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[520]"
          >
            <motion.button
              type="button"
              aria-label={playCopy.closePopupAriaLabel}
              onClick={() => {
                setIsPlayPopupOpen(false);
                setSelectedPlayPlatform(null);
              }}
              className="absolute inset-0 bg-[color:rgba(25,25,25,0.58)] backdrop-blur-[3px]"
            />

            <div
              className="relative z-10 flex h-full items-center justify-center px-4 py-8 md:px-8"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  setIsPlayPopupOpen(false);
                  setSelectedPlayPlatform(null);
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 22, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[var(--line)]/80 bg-[var(--paper)]/95 shadow-[0_35px_80px_-35px_rgba(0,0,0,0.64)]"
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsPlayPopupOpen(false);
                    setSelectedPlayPlatform(null);
                  }}
                  className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)]/80 text-[var(--ink)] transition-colors hover:bg-[var(--mist)]"
                >
                  <X className="size-4" />
                </button>

                <div className="relative p-6 pt-14 sm:p-8 sm:pt-14">
                  <AnimatePresence mode="wait" custom={playDirection}>
                    <motion.div
                      key={`play-slide-${activePlayIndex}`}
                      custom={playDirection}
                      variants={{
                        enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 24 : -24 }),
                        center: { opacity: 1, x: 0 },
                        exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -20 : 20 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.26, ease: "easeOut" }}
                    >
                      <p className="inline-flex items-center rounded-full border border-[var(--line)]/70 bg-[var(--mist)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--ink)]/62">
                        {activePlay.step}
                      </p>
                      <h3 className="mt-4 text-3xl font-black tracking-tight text-[var(--ink)] sm:text-4xl">
                        {activePlay.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/72 sm:text-[15px]">
                        {activePlay.description}
                      </p>

                      {activePlayIndex === 0 ? (
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPlayPlatform("java");
                              setPlayDirection(1);
                              setActivePlayIndex(1);
                            }}
                            className="group rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-[0_16px_30px_-24px_rgba(25,25,25,0.7)]"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="inline-flex items-center gap-2 text-sm font-black text-[var(--ink)]">
                                <Cpu className="size-4 text-[var(--brand)]" />
                                {playCopy.javaCardLabel}
                              </p>
                              <span className="inline-flex items-center rounded-full border border-emerald-300/70 bg-emerald-100/80 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-emerald-700">
                                {playCopy.javaRecommendedTag}
                              </span>
                            </div>
                            <p className="mt-2 text-xs text-[var(--ink)]/65">
                              {playCopy.javaCardDescription}
                            </p>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPlayPlatform("bedrock");
                              setPlayDirection(1);
                              setActivePlayIndex(2);
                            }}
                            className="group rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-[0_16px_30px_-24px_rgba(25,25,25,0.7)]"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="inline-flex items-center gap-2 text-sm font-black text-[var(--ink)]">
                                <Smartphone className="size-4 text-[var(--brand)]" />
                                {playCopy.bedrockCardLabel}
                              </p>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="inline-flex cursor-help items-center gap-1 rounded-full border border-amber-300/70 bg-amber-100/85 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-amber-800">
                                    {playCopy.bedrockNotRecommendedTag}
                                    <span
                                      className="inline-flex size-3 items-center justify-center rounded-full text-amber-700/90 outline-none"
                                    >
                                      <CircleHelp className="size-3" />
                                    </span>
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent
                                  sideOffset={8}
                                  className="max-w-[220px] rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[11px] font-medium text-amber-900 shadow-[0_12px_25px_-16px_rgba(120,53,15,0.6)]"
                                >
                                  {playCopy.bedrockNotRecommendedTooltip}
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <p className="mt-2 text-xs text-[var(--ink)]/65">
                              {playCopy.bedrockCardDescription}
                            </p>
                          </button>
                        </div>
                      ) : (
                        <div className="mt-6 space-y-4 rounded-2xl border border-[var(--line)] bg-[linear-gradient(165deg,rgba(255,255,255,0.95),rgba(246,245,243,0.95))] p-5 shadow-[0_20px_30px_-24px_rgba(25,25,25,0.62)]">
                          <div className="flex items-center justify-between gap-2">
                            <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-[var(--ink)]/68">
                              <Server className="size-3.5 text-[var(--brand)]" />
                              {playCopy.connectionDataLabel}
                            </p>
                            <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.09em] text-[var(--ink)]/68">
                              {activePlayIndex === 1 ? playCopy.javaCardLabel : playCopy.bedrockCardLabel}
                            </span>
                          </div>
                          <div className="grid gap-2.5">
                            <div className="rounded-xl border border-[var(--line)] bg-[var(--mist)]/70 px-3 py-2">
                              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--ink)]/56">{playCopy.ipLabel}</p>
                              <code className="mt-1 inline-flex text-xs font-semibold text-[var(--ink)]">{serverAddress}</code>
                            </div>
                            {activePlayIndex === 2 ? (
                              <div className="rounded-xl border border-[var(--line)] bg-[var(--mist)]/70 px-3 py-2">
                                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--ink)]/56">
                                  {playCopy.portLabel}
                                </p>
                                <code className="mt-1 inline-flex text-xs font-semibold text-[var(--ink)]">{BEDROCK_PORT}</code>
                              </div>
                            ) : null}
                          </div>
                          {activePlayIndex === 2 ? (
                            <p className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-xs leading-relaxed text-[var(--ink)]/68">
                              {playCopy.bedrockCompatibilityHint}
                            </p>
                          ) : null}
                        </div>
                      )}

                      <p className="mt-4 text-xs font-semibold text-[var(--ink)]/76">{activePlay.hint}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className={`mt-7 flex items-center gap-4 border-t border-[var(--line)]/70 pt-5 ${canGoPlayBack ? "justify-between" : "justify-center"}`}>
                    {canGoPlayBack ? (
                      <button
                        type="button"
                        onClick={() => {
                          setPlayDirection(-1);
                          setActivePlayIndex(0);
                          setSelectedPlayPlatform(null);
                        }}
                        aria-label={playCopy.backToPlatformAriaLabel}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-colors hover:bg-[var(--mist)]"
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                    ) : null}
                    <div className="flex items-center gap-2">
                      {accessiblePlayIndices.map((index, dotPosition) => {
                        const slide = playSlides[index];
                        if (!slide) return null;
                        return (
                          <button
                            key={`play-dot-${slide.step}-${index}`}
                            type="button"
                            onClick={() => {
                              if (index === 0) {
                                setSelectedPlayPlatform(null);
                              } else if (index === 1) {
                                setSelectedPlayPlatform("java");
                              } else if (index === 2) {
                                setSelectedPlayPlatform("bedrock");
                              }
                              setPlayDirection(index > activePlayIndex ? 1 : -1);
                              setActivePlayIndex(index);
                            }}
                            aria-label={
                              `${playCopy.stepDotAriaPrefix} ${dotPosition + 1}`
                            }
                            className={`h-2.5 rounded-full transition-all ${activePlayIndex === index ? "w-8 bg-[var(--brand)]" : "w-2.5 bg-[var(--line)]/85"
                              }`}
                          />
                        );
                      })}
                    </div>
                    {canGoPlayBack ? <span className="h-10 w-10" /> : null}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        {isGuidePopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-[520]"
          >
            <motion.button
              type="button"
              aria-label={heroCopy.guideCloseAriaLabel}
              onClick={() => {
                setIsGuideImageOpen(false);
                setGuideImageZoom(1);
                setIsGuidePopupOpen(false);
              }}
              className="absolute inset-0 bg-[color:rgba(25,25,25,0.56)] backdrop-blur-[3px]"
            />
            <div
              className="relative z-10 flex h-full items-center justify-center px-4 py-8 md:px-8"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  setIsGuideImageOpen(false);
                  setGuideImageZoom(1);
                  setIsGuidePopupOpen(false);
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 42, scale: 0.92, rotateX: -8 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: 28, scale: 0.94, rotateX: 6 }}
                transition={{ type: "spring", stiffness: 240, damping: 24, mass: 0.82 }}
                style={{ transformPerspective: 1200 }}
                className="relative w-full max-w-6xl overflow-hidden rounded-[2.6rem] border border-[var(--line)]/85 bg-[var(--paper)]/95 shadow-[0_45px_100px_-38px_rgba(0,0,0,0.62)]"
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsGuideImageOpen(false);
                    setGuideImageZoom(1);
                    setIsGuidePopupOpen(false);
                  }}
                  className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)]/80 text-[var(--ink)] backdrop-blur-sm transition-colors hover:bg-[var(--mist)]"
                >
                  <X className="size-5" />
                </button>

                <div className="relative grid min-h-[34rem] md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative flex flex-col border-r border-[var(--line)]/70 bg-[linear-gradient(165deg,rgba(255,255,255,0.92),rgba(246,245,243,0.94))] p-6 pt-16 sm:p-8 sm:pt-16">
                    <AnimatePresence mode="wait" custom={guideDirection}>
                      <motion.div
                        key={`guide-copy-${activeGuideIndex}`}
                        custom={guideDirection}
                        variants={{
                          enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 36 : -36 }),
                          center: { opacity: 1, x: 0 },
                          exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -24 : 24 }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[var(--brand)]">
                          {activeGuide.step}
                        </p>
                        <h3 className="mt-2 text-3xl font-black tracking-tight text-[var(--ink)] sm:text-[2.55rem]">
                          {activeGuide.title}
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--ink)]/75 sm:text-[15px]">
                          {activeGuide.description}
                        </p>
                        <div className="mt-5 grid gap-2">
                          {activeGuide.checklist.map((item) => (
                            <p key={item} className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink)]/82">
                              <CheckCircle2 className="size-4 text-[var(--brand)]" />
                              {item}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                      <button
                        type="button"
                        onClick={() => {
                          setGuideDirection(-1);
                          setGuideImageZoom(1);
                          setActiveGuideIndex((current) => (current - 1 + guideSlides.length) % guideSlides.length);
                        }}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-colors hover:bg-[var(--mist)]"
                      >
                        <ChevronLeft className="size-5" />
                      </button>
                      <div className="flex items-center gap-2">
                        {guideSlides.map((slide, index) => (
                          <button
                            key={`guide-dot-${slide.step}`}
                            type="button"
                            onClick={() => {
                              setGuideDirection(index > activeGuideIndex ? 1 : -1);
                              setGuideImageZoom(1);
                              setActiveGuideIndex(index);
                            }}
                            className={`h-2.5 rounded-full transition-all ${activeGuideIndex === index
                                ? "w-8 bg-[var(--brand)] shadow-[0_0_0_2px_rgba(241,80,37,0.15)]"
                                : "w-2.5 bg-[var(--line)]/85"
                              }`}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setGuideDirection(1);
                          setGuideImageZoom(1);
                          setActiveGuideIndex((current) => (current + 1) % guideSlides.length);
                        }}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-colors hover:bg-[var(--mist)]"
                      >
                        <ChevronLeft className="size-5 rotate-180" />
                      </button>
                    </div>
                  </div>

                  <div className="relative flex flex-col justify-center p-5 sm:p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--ink)]/45">
                      {heroCopy.guideVisualLabel}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setGuideImageZoom(1);
                        setIsGuideImageOpen(true);
                      }}
                      className="relative mt-3 block w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--mist)] p-2 text-left"
                    >
                      <AnimatePresence mode="wait" custom={guideDirection}>
                        <motion.div
                          key={`guide-image-${activeGuideIndex}`}
                          custom={guideDirection}
                          variants={{
                            enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 24 : -24 }),
                            center: { opacity: 1, x: 0 },
                            exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -18 : 18 }),
                          }}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl"
                        >
                          <Image
                            src={activeGuideImage}
                            alt={activeGuide.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 42vw"
                            quality={100}
                            className="object-contain"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </button>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--ink)]/68">
                      {heroCopy.guideVisualDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            {isGuideImageOpen && (
              <div
                className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-8"
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    setIsGuideImageOpen(false);
                    setGuideImageZoom(1);
                  }
                }}
              >
                <button
                  type="button"
                  aria-label={heroCopy.guideCloseAriaLabel}
                  className="absolute inset-0 bg-[color:rgba(15,15,15,0.86)] backdrop-blur-sm"
                  onClick={() => {
                    setIsGuideImageOpen(false);
                    setGuideImageZoom(1);
                  }}
                />
                <div className="relative z-10 w-full max-w-6xl rounded-2xl border border-[var(--line)] bg-[var(--paper)]/95 p-3 shadow-2xl sm:p-4">
                  <div className="mb-3 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setGuideImageZoom((current) => Math.max(1, Number((current - 0.25).toFixed(2))))
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] text-lg font-black text-[var(--ink)] transition-colors hover:bg-[var(--mist)]"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setGuideImageZoom((current) => Math.min(3, Number((current + 0.25).toFixed(2))))
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] text-lg font-black text-[var(--ink)] transition-colors hover:bg-[var(--mist)]"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsGuideImageOpen(false);
                        setGuideImageZoom(1);
                      }}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] transition-colors hover:bg-[var(--mist)]"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="relative h-[75vh] w-full overflow-auto rounded-xl bg-[var(--mist)]">
                    <div
                      className="relative h-full w-full origin-center transition-transform duration-150 ease-out"
                      style={{ transform: `scale(${guideImageZoom})` }}
                    >
                      <Image
                        src={activeGuideImage}
                        alt={activeGuide.title}
                        fill
                        sizes="100vw"
                        quality={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-[520]"
          >
            <motion.button
              type="button"
              aria-label={heroCopy.popupCloseAriaLabel}
              onClick={() => setIsPopupOpen(false)}
              className="absolute inset-0 bg-[color:rgba(25,25,25,0.52)] backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            />

            <div
              className="relative z-10 flex h-full items-center justify-center px-4 py-8 md:px-8"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  setIsPopupOpen(false);
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 42, scale: 0.92, rotateX: -8 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: 28, scale: 0.94, rotateX: 6 }}
                transition={{ type: "spring", stiffness: 240, damping: 24, mass: 0.82 }}
                style={{ transformPerspective: 1200 }}
                className="relative w-full max-w-6xl overflow-hidden rounded-[2.6rem] border border-[var(--line)]/85 bg-[var(--paper)]/95 shadow-[0_45px_100px_-38px_rgba(0,0,0,0.62)]"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  <div className="absolute -left-12 top-8 h-48 w-48 rounded-full bg-[var(--brand)]/14 blur-3xl" />
                  <div className="absolute right-6 top-14 h-40 w-40 rounded-full bg-[var(--ink)]/8 blur-3xl" />
                  <div className="absolute right-8 bottom-2 h-56 w-56 rounded-full bg-[var(--brand)]/12 blur-[92px]" />
                </div>

                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)]/80 text-[var(--ink)] backdrop-blur-sm transition-colors hover:bg-[var(--mist)]"
                >
                  <X className="size-5" />
                </button>

                <div className="relative grid min-h-[32rem] md:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative flex flex-col border-r border-[var(--line)]/70 bg-[linear-gradient(165deg,rgba(255,255,255,0.92),rgba(246,245,243,0.94))] p-6 pt-16 sm:p-8 sm:pt-16">
                    <AnimatePresence mode="wait" custom={popupDirection}>
                      <motion.div
                        key={`popup-copy-${activePopupIndex}`}
                        custom={popupDirection}
                        variants={{
                          enter: (direction: number) => ({
                            opacity: 0,
                            x: direction > 0 ? 36 : -36,
                          }),
                          center: { opacity: 1, x: 0 },
                          exit: (direction: number) => ({
                            opacity: 0,
                            x: direction > 0 ? -24 : 24,
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <p className="inline-flex rounded-full border border-[var(--line)]/70 bg-[var(--paper)]/65 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ink)]/58">
                          {heroCopy.popupSectionLabel}
                        </p>
                        <h3 className="mt-4 text-3xl font-black tracking-tight text-[var(--ink)] sm:text-[2.8rem]">
                          {activePopup.title}
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--ink)]/72 sm:text-[15px]">
                          {activePopup.description}
                        </p>
                        <p className="mt-4 text-xs font-semibold text-[var(--ink)]/78">
                          {activePopup.insight}
                        </p>
                        <div className="mt-4 grid gap-2">
                          {activePopup.highlights.map((item) => (
                            <p key={item} className="inline-flex items-center gap-2 text-xs text-[var(--ink)]/78">
                              <CheckCircle2 className="size-3.5 text-[var(--brand)]" />
                              {item.includes("Agnes Tachyon") ? (
                                <>
                                  {item.split("Agnes Tachyon")[0]}
                                  <Link
                                    href="https://agnesbot.xyz"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="font-bold text-[var(--brand)] underline decoration-[var(--brand)]/45 underline-offset-2 hover:decoration-[var(--brand)]"
                                  >
                                    Agnes Tachyon
                                  </Link>
                                  {item.split("Agnes Tachyon")[1]}
                                </>
                              ) : (
                                item
                              )}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                      <button
                        type="button"
                        onClick={() => {
                          setPopupDirection(-1);
                          setActivePopupIndex(
                            (current) => (current - 1 + popupSlides.length) % popupSlides.length,
                          );
                        }}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-colors hover:bg-[var(--mist)]"
                      >
                        <ChevronLeft className="size-5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {popupSlides.map((slide, index) => (
                          <button
                            key={`popup-dot-${slide.title}`}
                            type="button"
                            onClick={() => {
                              setPopupDirection(index > activePopupIndex ? 1 : -1);
                              setActivePopupIndex(index);
                            }}
                            aria-label={
                              `${heroCopy.popupDotAriaPrefix} ${index + 1}`
                            }
                            className={`h-2.5 rounded-full transition-all ${activePopupIndex === index
                                ? "w-8 bg-[var(--brand)] shadow-[0_0_0_2px_rgba(241,80,37,0.15)]"
                                : "w-2.5 bg-[var(--line)]/85"
                              }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPopupDirection(1);
                          setActivePopupIndex((current) => (current + 1) % popupSlides.length);
                        }}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-colors hover:bg-[var(--mist)]"
                      >
                        <ChevronLeft className="size-5 rotate-180" />
                      </button>
                    </div>
                  </div>

                  <div className="relative flex items-end justify-center px-3 pb-4 pt-2 sm:px-8 sm:pb-8 sm:pt-6">
                    <AnimatePresence mode="wait" custom={popupDirection}>
                      <motion.div
                        key={`popup-image-${activePopupIndex}`}
                        custom={popupDirection}
                        variants={{
                          enter: (direction: number) => ({
                            opacity: 0,
                            x: direction > 0 ? 30 : -30,
                          }),
                          center: { opacity: 1, x: 0 },
                          exit: (direction: number) => ({
                            opacity: 0,
                            x: direction > 0 ? -22 : 22,
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative h-full min-h-[24rem] w-full max-w-[31rem]"
                      >
                        <div
                          aria-hidden
                          className="absolute inset-x-8 bottom-8 top-10 rounded-full blur-3xl"
                          style={{ backgroundColor: `${activePopupAccent}33` }}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-6 rounded-[2rem] border border-[var(--line)]/60"
                          style={{
                            background: `radial-gradient(circle at 25% 25%, ${activePopupAccent}4D, rgba(255,255,255,0.02) 60%)`,
                          }}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-8 rounded-[2rem] opacity-70"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, rgba(25,25,25,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(25,25,25,0.06) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                          }}
                        />
                        <div
                          aria-hidden
                          className="absolute left-8 right-8 bottom-4 h-10 rounded-full blur-xl"
                          style={{ backgroundColor: `${activePopupAccent}40` }}
                        />
                        <div
                          aria-hidden
                          className="absolute left-10 right-10 bottom-10 h-6 rounded-full border border-[var(--line)]/60 bg-[var(--paper)]/55 backdrop-blur-sm"
                        />
                        <div
                          aria-hidden
                          className="absolute -left-1 bottom-20 h-24 w-24 rounded-full border border-[var(--line)]/60 bg-[var(--paper)]/25 blur-[1px]"
                        />
                        <div
                          aria-hidden
                          className="absolute right-8 top-8 h-16 w-16 rotate-12 rounded-2xl border border-[var(--line)]/55"
                          style={{ backgroundColor: `${activePopupAccent}2A` }}
                        />
                        <div
                          aria-hidden
                          className="absolute left-10 top-10 h-8 w-8 -rotate-12 rounded-lg border border-[var(--line)]/60"
                          style={{ backgroundColor: `${activePopupAccent}26` }}
                        />
                        <div
                          aria-hidden
                          className="absolute right-14 bottom-24 h-2 w-14 rounded-full"
                          style={{ backgroundColor: `${activePopupAccent}66` }}
                        />
                        <div
                          aria-hidden
                          className="absolute left-14 top-1/2 h-12 w-[3px] rounded-full bg-[var(--line)]/55"
                        />
                        <div aria-hidden className="absolute left-10 right-10 top-20 h-28">
                          {activePopupIndex === 0 && (
                            <>
                              <div
                                className="absolute left-2 top-1 h-2 w-2 rounded-full"
                                style={{ backgroundColor: `${activePopupAccent}B3` }}
                              />
                              <div
                                className="absolute left-8 top-8 h-2 w-2 rounded-full"
                                style={{ backgroundColor: `${activePopupAccent}9C` }}
                              />
                              <div
                                className="absolute left-14 top-[3.2rem] h-2 w-2 rounded-full"
                                style={{ backgroundColor: `${activePopupAccent}85` }}
                              />
                              <div
                                className="absolute left-[4.6rem] top-[4.2rem] h-[3px] w-20 rounded-full"
                                style={{ backgroundColor: `${activePopupAccent}63` }}
                              />
                            </>
                          )}
                          {activePopupIndex === 1 && (
                            <>
                              <div
                                className="absolute left-1 top-1 h-24 w-24 rounded-full border"
                                style={{ borderColor: `${activePopupAccent}70` }}
                              />
                              <div
                                className="absolute left-5 top-5 h-16 w-16 rounded-full border"
                                style={{ borderColor: `${activePopupAccent}55` }}
                              />
                              <div
                                className="absolute left-[6.1rem] top-8 h-3 w-3 rounded-full"
                                style={{ backgroundColor: `${activePopupAccent}8C` }}
                              />
                            </>
                          )}
                          {activePopupIndex === 2 && (
                            <>
                              <div
                                className="absolute right-1 top-2 h-1.5 w-20 -rotate-12 rounded-full"
                                style={{ backgroundColor: `${activePopupAccent}A6` }}
                              />
                              <div
                                className="absolute right-6 top-9 h-1.5 w-14 -rotate-12 rounded-full"
                                style={{ backgroundColor: `${activePopupAccent}8F` }}
                              />
                              <div
                                className="absolute right-10 top-[3.3rem] h-1.5 w-10 -rotate-12 rounded-full"
                                style={{ backgroundColor: `${activePopupAccent}73` }}
                              />
                            </>
                          )}
                          {activePopupIndex === 3 && (
                            <>
                              <div
                                className="absolute left-1 top-3 h-10 w-10 rotate-12 rounded-xl border"
                                style={{
                                  borderColor: `${activePopupAccent}75`,
                                  backgroundColor: `${activePopupAccent}24`,
                                }}
                              />
                              <div
                                className="absolute right-1 top-0 h-8 w-8 -rotate-12 rounded-lg border"
                                style={{
                                  borderColor: `${activePopupAccent}70`,
                                  backgroundColor: `${activePopupAccent}1F`,
                                }}
                              />
                              <div
                                className="absolute left-12 top-12 h-1.5 w-14 rotate-6 rounded-full"
                                style={{ backgroundColor: `${activePopupAccent}66` }}
                              />
                            </>
                          )}
                        </div>
                        <Image
                          src={activePopupImage}
                          alt={activePopup.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 45vw"
                          className="object-contain object-bottom drop-shadow-[0_34px_34px_rgba(25,25,25,0.3)]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
