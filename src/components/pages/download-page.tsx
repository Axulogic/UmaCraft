"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, CircleDot, Coffee, Download, MonitorPlay, Zap } from "lucide-react";

import { HomeSmoothScroll } from "@/components/layout/home-smooth-scroll";
import { SiteFooter } from "@/components/layout/site-footer";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/use-locale";

const requirementIcons = [CircleDot, Zap] as const;

export function DownloadPageContent() {
  const locale = useLocale();
  const copy = locale.pages.download;

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <HomeSmoothScroll>
        <main className="relative overflow-hidden pt-20 pb-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(180deg,rgba(244,240,235,0.82)_0%,rgba(244,240,235,0.82)_100%)] backdrop-blur-[22px]"
          />
          <div className="relative z-20 mx-auto w-full max-w-5xl px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)]/60 transition-colors hover:text-[var(--ink)]"
            >
              <ArrowLeft className="size-4" />
              {copy.backHome}
            </Link>

            <section className="page-enter mt-4 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]/70 shadow-sm">
                <Download className="size-4 text-[var(--brand)]" />
                {copy.chipLabel}
              </div>

              <div className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[0_16px_40px_-34px_rgba(25,25,25,0.6)] sm:p-7">
                <h1 className="heading-font text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
                  {copy.title}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--ink)]/75">
                  {copy.intro}
                </p>
              </div>
            </section>

            <section className="page-enter page-enter-d1 mt-5">
              <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                <div className="space-y-4">
                  <div className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-3 border-b border-[var(--line)] pb-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
                        <Download className="size-5" />
                      </div>
                      <div>
                        <h2 className="heading-font text-xl font-semibold text-[var(--ink)]">{copy.filesTitle}</h2>
                        <p className="text-sm text-[var(--ink)]/60">{copy.filesDescription}</p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {copy.channels.map((entry) => (
                        <article
                          key={`${entry.version}-${entry.type}`}
                          className="group flex flex-col justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--mist)]/40 p-3.5 transition-colors hover:border-[var(--brand)]/50 hover:bg-[var(--mist)] sm:flex-row sm:items-center"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-[var(--ink)]">
                                {entry.type} {copy.editionSuffix}
                              </h3>
                              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">
                                {entry.version}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-[var(--ink)]/62">{entry.note}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                            <span className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.11em] text-[var(--ink)]/68">
                              {entry.status}
                            </span>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-3 border-b border-[var(--line)] pb-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-[#fc00ff]/10 text-[#fc00ff]">
                        <MonitorPlay className="size-5" />
                      </div>
                      <div>
                        <h2 className="heading-font text-xl font-semibold text-[var(--ink)]">{copy.installTitle}</h2>
                        <p className="text-sm text-[var(--ink)]/60">{copy.installDescription}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="relative pl-6 before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-[var(--line)]">
                        {copy.installSteps.map((step, index) => (
                          <div key={step.title} className={`${index < copy.installSteps.length - 1 ? "mb-4" : ""} relative`}>
                            <div className="absolute -left-[30px] top-0.5 flex size-6 items-center justify-center rounded-full border-[3px] border-[var(--paper)] bg-[var(--brand)] text-[10px] font-bold text-white shadow-sm">
                              {index + 1}
                            </div>
                            <h3 className="font-semibold text-[var(--ink)]">{step.title}</h3>
                            <p className="mt-1 text-sm text-[var(--ink)]/70">{step.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="space-y-4">
                  <div className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
                    <h3 className="heading-font mb-3 text-lg font-semibold text-[var(--ink)]">
                      {copy.requirementsTitle}
                    </h3>

                    <div className="space-y-4">
                      {copy.requirements.map((req, index) => {
                        const Icon = requirementIcons[index] ?? requirementIcons[0];
                        return (
                          <div key={req.category}>
                            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                              <Icon className="size-4 text-[var(--brand)]" />
                              {req.category}
                            </h4>
                            <ul className="space-y-1.5">
                              {req.specs.map((spec) => (
                                <li key={spec} className="flex items-start gap-2 text-xs text-[var(--ink)]/70">
                                  <span className="mt-[0.25rem] block size-1 shrink-0 rounded-full bg-[var(--line)]" />
                                  <span className="leading-snug">{spec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-[1.4rem] border border-[var(--brand)]/30 bg-gradient-to-br from-[var(--brand)]/10 to-[var(--paper)] p-5 shadow-sm">
                    <h3 className="heading-font mb-2 flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
                      <Coffee className="size-5 text-[var(--brand)]" />
                      {copy.helpTitle}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-[var(--ink)]/75">{copy.helpDescription}</p>
                    <Button className="w-full rounded-full shadow-md" asChild>
                      <Link href="/discord-link">{copy.helpCta}</Link>
                    </Button>
                  </div>
                </aside>
              </div>
            </section>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[18.5rem] z-40 w-full max-w-3xl -translate-x-1/2 px-6">
            <div className="rounded-[1rem] border border-[var(--brand)]/45 bg-[linear-gradient(90deg,rgba(241,80,37,0.16),rgba(255,255,255,0.98),rgba(241,80,37,0.16))] px-4 py-3 shadow-[0_14px_26px_-22px_rgba(25,25,25,0.55)] sm:px-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/14 text-[var(--brand)]">
                  <AlertTriangle className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-[0.13em] text-[var(--brand)] sm:text-xs">
                    {copy.warningTitle}
                  </p>
                  <p className="mt-0.5 text-sm font-medium leading-relaxed text-[var(--ink)]/78">
                    {copy.warningDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </HomeSmoothScroll>
    </div>
  );
}
