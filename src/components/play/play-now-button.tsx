"use client";

import { useMemo, useState, type ComponentProps } from "react";
import { ChevronLeft, CircleHelp, Cpu, Gamepad2, Server, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/use-locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type PlayNowButtonProps = {
  label?: string;
  className?: string;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  showIcon?: boolean;
};

const SERVER_IP = "play.umacraft.xyz";
const BEDROCK_PORT = "19132";

export function PlayNowButton({
  label,
  className,
  variant = "default",
  size = "default",
  showIcon = true,
}: PlayNowButtonProps) {
  const locale = useLocale();
  const copy = locale.playNow;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<"java" | "bedrock" | null>(null);

  const slides = copy.slides;
  const activeSlide = slides[activeIndex] ?? slides[0];

  const accessibleIndices = useMemo(() => {
    if (selectedPlatform === "java") return [0, 1];
    if (selectedPlatform === "bedrock") return [0, 2];
    return [0, 1, 2];
  }, [selectedPlatform]);

  function resetFlow() {
    setActiveIndex(0);
    setSelectedPlatform(null);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          resetFlow();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={className}>
          {showIcon ? <Gamepad2 className="size-4.5" /> : null}
          {label ?? copy.defaultLabel}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="max-w-2xl rounded-[2rem] border-[var(--line)] bg-[var(--paper)] p-0 shadow-[0_35px_80px_-35px_rgba(0,0,0,0.64)]"
      >
        <div className="p-6 pt-12 sm:p-8 sm:pt-14">
          <DialogHeader className="text-left">
            <p className="inline-flex w-fit rounded-full border border-[var(--line)] bg-[var(--mist)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--ink)]/62">
              {activeSlide?.step}
            </p>
            <DialogTitle className="mt-2 text-3xl font-black tracking-tight text-[var(--ink)] sm:text-4xl">
              {activeSlide?.title}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-relaxed text-[var(--ink)]/72 sm:text-[15px]">
              {activeSlide?.description}
            </DialogDescription>
          </DialogHeader>

          {activeIndex === 0 ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedPlatform("java");
                  setActiveIndex(1);
                }}
                className="group rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-[0_16px_30px_-24px_rgba(25,25,25,0.7)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="inline-flex items-center gap-2 text-sm font-black text-[var(--ink)]">
                    <Cpu className="size-4 text-[var(--brand)]" />
                    {copy.javaCardLabel}
                  </p>
                  <span className="inline-flex items-center rounded-full border border-emerald-300/70 bg-emerald-100/80 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-emerald-700">
                    {copy.javaRecommendedTag}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[var(--ink)]/65">{copy.javaCardDescription}</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedPlatform("bedrock");
                  setActiveIndex(2);
                }}
                className="group rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-[0_16px_30px_-24px_rgba(25,25,25,0.7)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="inline-flex items-center gap-2 text-sm font-black text-[var(--ink)]">
                    <Smartphone className="size-4 text-[var(--brand)]" />
                    {copy.bedrockCardLabel}
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex cursor-help items-center gap-1 rounded-full border border-amber-300/70 bg-amber-100/85 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-amber-800">
                        {copy.bedrockNotRecommendedTag}
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
                      {copy.bedrockNotRecommendedTooltip}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="mt-2 text-xs text-[var(--ink)]/65">{copy.bedrockCardDescription}</p>
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-4 rounded-2xl border border-[var(--line)] bg-[linear-gradient(165deg,rgba(255,255,255,0.95),rgba(246,245,243,0.95))] p-5 shadow-[0_20px_30px_-24px_rgba(25,25,25,0.62)]">
              <div className="flex items-center justify-between gap-2">
                <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-[var(--ink)]/68">
                  <Server className="size-3.5 text-[var(--brand)]" />
                  {copy.connectionDataLabel}
                </p>
                <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.09em] text-[var(--ink)]/68">
                  {activeIndex === 1 ? copy.javaCardLabel : copy.bedrockCardLabel}
                </span>
              </div>

              <div className="grid gap-2.5">
                <div className="rounded-xl border border-[var(--line)] bg-[var(--mist)]/70 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--ink)]/56">{copy.ipLabel}</p>
                  <code className="mt-1 inline-flex text-xs font-semibold text-[var(--ink)]">{SERVER_IP}</code>
                </div>

                {activeIndex === 2 ? (
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--mist)]/70 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--ink)]/56">{copy.portLabel}</p>
                    <code className="mt-1 inline-flex text-xs font-semibold text-[var(--ink)]">{BEDROCK_PORT}</code>
                  </div>
                ) : null}
              </div>

              {activeIndex === 2 ? (
                <p className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-xs leading-relaxed text-[var(--ink)]/68">
                  {copy.bedrockCompatibilityHint}
                </p>
              ) : null}
            </div>
          )}

          <p className="mt-4 text-xs font-semibold text-[var(--ink)]/76">{activeSlide?.hint}</p>

          <div
            className={`mt-7 flex items-center gap-4 border-t border-[var(--line)]/70 pt-5 ${activeIndex !== 0 ? "justify-between" : "justify-center"
              }`}
          >
            {activeIndex !== 0 ? (
              <button
                type="button"
                onClick={() => {
                  setActiveIndex(0);
                  setSelectedPlatform(null);
                }}
                aria-label={copy.backToPlatformAriaLabel}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-colors hover:bg-[var(--mist)]"
              >
                <ChevronLeft className="size-4" />
              </button>
            ) : null}

            <div className="flex items-center gap-2">
              {accessibleIndices.map((index, dotPosition) => {
                const slide = slides[index];
                if (!slide) return null;
                return (
                  <button
                    key={`play-dot-${slide.step}-${index}`}
                    type="button"
                    onClick={() => {
                      if (index === 0) setSelectedPlatform(null);
                      if (index === 1) setSelectedPlatform("java");
                      if (index === 2) setSelectedPlatform("bedrock");
                      setActiveIndex(index);
                    }}
                    aria-label={`${copy.stepDotAriaPrefix} ${dotPosition + 1}`}
                    className={`h-2.5 rounded-full transition-all ${activeIndex === index ? "w-8 bg-[var(--brand)]" : "w-2.5 bg-[var(--line)]/85"
                      }`}
                  />
                );
              })}
            </div>

            {activeIndex !== 0 ? <span className="h-10 w-10" /> : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
