"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Bot,
  MessageSquareText,
  ShieldAlert,
  Server,
  Gift,
  HeartHandshake,
  X,
  ExternalLink
} from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { HomeSmoothScroll } from "@/components/layout/home-smooth-scroll";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/use-locale";

function BotHighlight({ name, imagePath }: { name: string; imagePath: string }) {
  const [showPreview, setShowPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span
        className="relative inline-flex items-center cursor-pointer font-bold text-violet-500 hover:text-violet-600 transition-colors"
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        onClick={() => setShowModal(true)}
      >
        {name}
        <AnimatePresence>
          {showPreview && !showModal && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper)] p-1 shadow-xl pointer-events-none"
            >
              <Image
                src={imagePath}
                alt={`${name} preview`}
                width={200}
                height={200}
                className="w-full rounded-lg object-cover bg-black"
                unoptimized
              />
            </motion.div>
          )}
        </AnimatePresence>
      </span>

      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-2 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/20 text-white hover:bg-black/40"
              >
                <X className="size-5" />
              </Button>
              <Image
                src={imagePath}
                alt={`${name} full view`}
                width={800}
                height={600}
                className="w-full rounded-xl object-contain bg-[var(--mist)] max-h-[70vh]"
                unoptimized
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function DiscordLinkPage() {
  const locale = useLocale();
  const dsLoc = locale.discordLink;

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <HomeSmoothScroll>
        <main className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-16">
          <div
          aria-hidden
          className="pointer-events-none absolute top-24 -right-3 h-44 w-44 rounded-[2rem] bg-[var(--brand)]/10 blur-2xl"
        />

          <section className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_14px_60px_rgba(25,25,25,0.08)] sm:p-8 lg:p-10">
          <div
            aria-hidden
            className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/60 to-transparent"
          />

          <header className="border-b border-[var(--line)] pb-6 sm:pb-8 flex flex-col md:flex-row gap-6 md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--mist)] px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--ink)] uppercase">
                <Bot className="size-3.5 text-[var(--brand)]" />
                Discord Linking
              </p>
              <h1 className="mt-4 heading-font text-4xl leading-[0.95] text-[var(--ink)] sm:text-5xl">
                {dsLoc.title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink)]/74 sm:text-base">
                {dsLoc.intro}
              </p>
            </div>
          </header>

          <div className="mt-8 space-y-8">

            <div className="grid gap-4 md:grid-cols-2">
              {dsLoc.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4 rounded-2xl border border-[var(--line)] bg-[var(--mist)]/30 p-5">
                  <div className="mt-1 shrink-0 rounded-full bg-[var(--paper)] p-2.5 border border-[var(--line)] text-[var(--brand)] h-fit">
                    {idx === 0 ? <Gift className="size-5" /> : <HeartHandshake className="size-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--ink)]">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[var(--ink)]/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
              <article className="space-y-8">

                <section>
                  <h2 className="text-xl font-semibold text-[var(--ink)] mb-4">
                    {dsLoc.stepsTitle}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {dsLoc.steps.map((step, index) => (
                      <div key={step.id} className="flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 transition-colors hover:border-[var(--brand)]/30">
                        <div className="mb-3 flex flex-wrap items-center gap-2.5">
                          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--mist)] text-xs font-bold text-[var(--brand)]">
                            {index + 1}
                          </span>
                          <h3 className="text-sm font-semibold text-[var(--ink)] sm:text-base">
                            {step.title}
                          </h3>
                        </div>
                        <div className="text-sm leading-relaxed text-[var(--ink)]/75">
                          {step.description.split(/(UmaCraft|Agnes Tachyon)/g).map((part, i) => {
                            if (part === "UmaCraft") {
                              return <BotHighlight key={i} name="UmaCraft" imagePath="/assets/tutorial/linking/umacraft-bot.png" />;
                            }
                            if (part === "Agnes Tachyon") {
                              return <span key={i} className="font-bold text-amber-500">Agnes Tachyon</span>;
                            }
                            return part;
                          })}
                        </div>
                        {step.tip ? (
                          <div className="mt-auto pt-4">
                            <div className="inline-flex items-start gap-1.5 rounded-lg bg-[var(--mist)]/50 px-3 py-2 text-xs text-[var(--ink)]/65">
                              <span className="font-semibold text-[var(--ink)] shrink-0">Tip:</span> {step.tip}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-[var(--line)] bg-[var(--mist)]/20 p-5 sm:p-6">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
                    <Server className="size-5 text-[var(--brand)]" />
                    {dsLoc.requirementsTitle}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {dsLoc.requirements.map((req, idx) => (
                      <a
                        key={idx}
                        href={req.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm font-semibold text-[#5865F2] hover:bg-[#5865F2]/5 hover:border-[#5865F2]/20 transition-all"
                      >
                        {req.text}
                        <ExternalLink className="size-4" />
                      </a>
                    ))}
                  </div>
                </section>

              </article>

              <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5">
                  <p className="text-[11px] font-bold tracking-[0.1em] text-[var(--ink)]/56 uppercase">
                    Security Warning
                  </p>
                  <p className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-[var(--ink)]/75">
                    <ShieldAlert className="mt-0.5 size-4 shrink-0 text-red-500" />
                    {dsLoc.warning}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5">
                  <p className="flex items-start gap-2.5 text-sm text-[var(--ink)]/75">
                    <MessageSquareText className="mt-0.5 size-4 shrink-0 text-[var(--brand)]" />
                    Need manual support? Open a Discord ticket and mention your Minecraft username.
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-2xl border-[var(--line)] bg-[var(--paper)] py-6"
                >
                  <Link href="/" className="inline-flex items-center gap-2 font-bold hover:bg-[var(--mist)]">
                    <ArrowLeft className="size-4" />
                    {dsLoc.backHome}
                  </Link>
                </Button>
              </aside>
            </div>
          </div>
          </section>
        </main>
        <SiteFooter />
      </HomeSmoothScroll>
    </div>
  );
}
