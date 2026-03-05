"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy,
  Volume2,
  VolumeX,
  Languages,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Cpu,
  Leaf,
} from "lucide-react";

import { useSiteAudio } from "@/components/providers/site-audio-provider";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getCurrentClientLocaleLang,
  setClientLocaleLang,
} from "@/lib/client-locale";
import { appToast } from "@/lib/toast";
import { useLocale } from "@/lib/use-locale";

const DEFAULT_ACTIVE_VOLUME = 0.35;

async function copyToClipboard(value: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const temporaryTextArea = document.createElement("textarea");
  temporaryTextArea.value = value;
  temporaryTextArea.style.position = "fixed";
  temporaryTextArea.style.opacity = "0";
  document.body.appendChild(temporaryTextArea);
  temporaryTextArea.focus();
  temporaryTextArea.select();

  const successful = document.execCommand("copy");
  document.body.removeChild(temporaryTextArea);

  if (!successful) {
    throw new Error("Copy command failed.");
  }
}

export function Topbar() {
  const locale = useLocale();
  const { isMuted, setMuted, volume, setVolume, playBgm } = useSiteAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isCopyFeedbackVisible, setIsCopyFeedbackVisible] = useState(false);
  const pathname = usePathname();
  const copyFeedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        setIsScrolled(window.scrollY > 20);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (copyFeedbackTimeoutRef.current) {
        clearTimeout(copyFeedbackTimeoutRef.current);
      }
    };
  }, []);

  const volumePercent = Math.round(volume * 100);
  const isEffectivelyMuted = isMuted || volumePercent === 0;

  async function copyServerAddress() {
    try {
      await copyToClipboard(locale.brand.serverAddress);
      if (copyFeedbackTimeoutRef.current) {
        clearTimeout(copyFeedbackTimeoutRef.current);
      }
      setIsCopyFeedbackVisible(false);
      requestAnimationFrame(() => {
        setIsCopyFeedbackVisible(true);
      });
      copyFeedbackTimeoutRef.current = setTimeout(() => {
        setIsCopyFeedbackVisible(false);
      }, 1300);
      appToast.success(locale.topbar.serverCopied, { id: "server-copy-success" });
    } catch {
      appToast.error(locale.topbar.serverCopyError, { id: "server-copy-error" });
    }
  }

  async function toggleMuteState() {
    if (isEffectivelyMuted) {
      const nextVolume = volume > 0 ? volume : DEFAULT_ACTIVE_VOLUME;
      setVolume(nextVolume);
      setMuted(false);
      try {
        await playBgm();
      } catch { }
      return;
    }
    setMuted(true);
  }

  function handleVolumeChange(nextValue: number[]) {
    const normalized = (nextValue[0] ?? 0) / 100;
    const shouldMute = normalized <= 0.001;
    setVolume(normalized);
    setMuted(shouldMute);
    if (!shouldMute) {
      void playBgm().catch(() => undefined);
    }
  }

  const currentLang = getCurrentClientLocaleLang();
  const nextLang = currentLang === "pt" ? "en" : "pt";
  const languageBadge = currentLang === "pt" ? "PT-BR" : "EN-US";
  const switchLanguageLabel =
    nextLang === "pt"
      ? locale.topbar.switchToPortugueseLabel
      : locale.topbar.switchToEnglishLabel;

  function toggleLanguage() {
    setClientLocaleLang(nextLang);
  }

  const navLinks = [
    { href: "/features", label: locale.footer.links.features },
    { href: "/hub", label: locale.footer.links.hub },
    { href: "/discord-link", label: locale.footer.links.discordLink },
  ];
  const isDownloadRoute = pathname === "/download";
  const copyLabel = locale.lang === "pt" ? "Copiar" : "Copy";
  const copiedLabel = locale.lang === "pt" ? "Copiado" : "Copied";
  const downloadOptions = [
    { href: "/download?server=modded", label: locale.topbar.downloadModdedLabel, icon: Cpu },
    { href: "/download?server=vanilla", label: locale.topbar.downloadVanillaLabel, icon: Leaf },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] flex justify-center pt-4 transition-all duration-300 pointer-events-none">
        <motion.div
          className="w-full max-w-7xl px-4 pointer-events-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={`
              relative flex items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-500
              ${isScrolled
                ? "border-[var(--line)] bg-[var(--paper)]/80 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)] backdrop-blur-xl"
                : "border-transparent bg-transparent"}
            `}
          >

            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[var(--brand)] shadow-[0_10px_24px_-16px_rgba(241,80,37,0.95)]">
                  <Image
                    src="/assets/icons/logo_and_watermarks/Umacraft_Logo_Orange.png"
                    alt={locale.topbar.logoAlt}
                    width={32}
                    height={32}
                    className="brightness-0 invert"
                  />
                </div>
                <span className="hidden text-lg font-extrabold tracking-tight text-[var(--ink)] sm:block">
                  UMA<span className="text-[var(--brand)]">CRAFT</span>
                </span>
              </Link>


              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        relative px-4 py-2 text-sm font-semibold transition-all duration-300
                        ${isActive ? "text-[var(--ink)]" : "text-[var(--ink)]/50 hover:text-[var(--ink)]"}
                      `}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-lg bg-[var(--mist)]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  );
                })}

                <div
                  className="relative"
                  onMouseEnter={() => setIsDownloadMenuOpen(true)}
                  onMouseLeave={() => setIsDownloadMenuOpen(false)}
                  onFocusCapture={() => setIsDownloadMenuOpen(true)}
                  onBlurCapture={(event) => {
                    const nextFocusedElement = event.relatedTarget;
                    if (!(nextFocusedElement instanceof Node) || !event.currentTarget.contains(nextFocusedElement)) {
                      setIsDownloadMenuOpen(false);
                    }
                  }}
                >
                  <Link
                    href="/download"
                    className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-all duration-300 ${isDownloadRoute ? "text-[var(--ink)]" : "text-[var(--ink)]/50 hover:text-[var(--ink)]"
                      }`}
                  >
                    {locale.footer.links.download}
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${isDownloadMenuOpen ? "rotate-180 text-[var(--brand)]" : ""
                        }`}
                    />
                    {isDownloadRoute && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-lg bg-[var(--mist)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {isDownloadMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-[130] mt-2 w-56 -translate-x-1/2 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-2 shadow-[0_20px_34px_-20px_rgba(25,25,25,0.45)]"
                      >
                        {downloadOptions.map((option) => (
                          <Link
                            key={option.href}
                            href={option.href}
                            className="mt-1 flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold text-[var(--ink)]/78 transition-colors hover:bg-[var(--mist)] hover:text-[var(--ink)]"
                            onClick={() => setIsDownloadMenuOpen(false)}
                          >
                            <option.icon className="size-4 text-[var(--brand)]" />
                            {option.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </div>


            <div className="flex items-center gap-3">

              <motion.button
                onClick={copyServerAddress}
                whileTap={{ scale: 0.96 }}
                animate={
                  isCopyFeedbackVisible
                    ? {
                      y: [0, -1.5, 0],
                    }
                    : undefined
                }
                transition={{ duration: 0.36, ease: "easeOut" }}
                className="hidden md:flex items-center gap-4 rounded-2xl border border-white/40 bg-[color:rgba(255,255,255,0.44)] px-4 py-2.5 text-sm text-[var(--ink)] shadow-[0_10px_30px_-22px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all hover:border-white/60 hover:bg-[color:rgba(255,255,255,0.62)]"
              >
                <div className="flex min-w-0 flex-col text-left leading-tight">
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--ink)]/48">
                    {locale.topbar.serverChipLabel}
                  </span>
                  <span className="truncate text-sm font-semibold tabular-nums text-[var(--ink)]">
                    {locale.brand.serverAddress}
                  </span>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  {isCopyFeedbackVisible ? (
                    <motion.span
                      key="copied-state"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.14, ease: "easeOut" }}
                      className="inline-flex min-w-[3.6rem] items-center justify-center rounded-full border border-emerald-300/70 bg-emerald-50/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-700"
                    >
                      {copiedLabel}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy-state"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.14, ease: "easeOut" }}
                      className="inline-flex min-w-[3.6rem] items-center justify-center rounded-full border border-white/60 bg-white/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--ink)]/68"
                    >
                      {copyLabel}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="h-6 w-px bg-[var(--line)] hidden sm:block" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={toggleLanguage}
                    aria-label={switchLanguageLabel}
                    className="h-10 rounded-xl px-2.5 hover:bg-[var(--mist)] transition-colors"
                  >
                    <Languages className="size-4 text-[var(--ink)]/75" />
                    <span className="hidden text-[11px] font-black tracking-[0.05em] text-[var(--ink)] sm:inline">
                      {languageBadge}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {locale.topbar.languageLabel}: {switchLanguageLabel}
                </TooltipContent>
              </Tooltip>


              <div className="flex items-center gap-1 sm:gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMuteState}
                      className="h-10 w-10 rounded-xl hover:bg-[var(--mist)] transition-colors"
                    >
                      {isEffectivelyMuted ? (
                        <VolumeX className="size-5 text-[var(--brand)]" />
                      ) : (
                        <Volume2 className="size-5 text-[var(--ink)]" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isEffectivelyMuted ? locale.topbar.unmuteAriaLabel : locale.topbar.muteAriaLabel}
                  </TooltipContent>
                </Tooltip>

                <div className="hidden w-20 sm:block">
                  <Slider
                    value={[volumePercent]}
                    max={100}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>


              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>
        </motion.div>
      </header>


      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[110] h-full w-full max-w-xs border-l border-[var(--line)] bg-[var(--paper)] p-6 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xl font-black tracking-tighter text-[var(--ink)]">
                    UMA<span className="text-[var(--brand)]">CRAFT</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="size-5" />
                  </Button>
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-4 py-4 text-lg font-bold text-[var(--ink)] hover:bg-[var(--mist)] transition-colors"
                    >
                      {link.label}
                      <ChevronRight className="size-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </nav>

                <div className="mt-3 rounded-2xl border border-[var(--line)] bg-[var(--mist)] p-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--ink)]/45">
                    {locale.footer.links.download}
                  </p>
                  {downloadOptions.map((option) => (
                    <Link
                      key={option.href}
                      href={option.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--paper)]"
                    >
                      <span className="inline-flex items-center gap-2">
                        <option.icon className="size-4 text-[var(--brand)]" />
                        {option.label}
                      </span>
                      <ChevronRight className="size-4 text-[var(--ink)]/40" />
                    </Link>
                  ))}
                </div>

                <div className="mt-auto pt-10">
                  <button
                    onClick={() => {
                      void copyServerAddress();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl bg-[var(--ink)] p-5 text-[var(--paper)] transition-transform active:scale-95"
                  >
                    <div className="text-left">
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                        {locale.topbar.serverChipLabel}
                      </p>
                      <p className="text-sm font-black">{locale.brand.serverAddress}</p>
                    </div>
                    <Copy className="size-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

