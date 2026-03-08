"use client";

import Link from "next/link";
import { Clock3, Construction, Sparkles } from "lucide-react";

import { HomeSmoothScroll } from "@/components/layout/home-smooth-scroll";
import { SiteFooter } from "@/components/layout/site-footer";
import { Topbar } from "@/components/layout/topbar";
import { LocalizedLink } from "@/components/routing/localized-link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/use-locale";

export function ChangelogPageContent() {
  const locale = useLocale();
  const copy = locale.pages.changelog;

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <HomeSmoothScroll>
        <main className="pt-28 pb-16">
          <div className="mx-auto w-full max-w-4xl px-6">
            <div className="mt-8">
              <section className="page-enter relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-8 text-center shadow-[0_20px_55px_-35px_rgba(25,25,25,0.55)] sm:p-10">
                <div className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-[var(--brand)]/14 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 left-0 h-44 w-44 rounded-full bg-[#f08b36]/16 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#f08b36]/38 bg-[#f08b36]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#e2762a]">
                    <Construction className="size-3.5" />
                    {copy.badge}
                  </span>

                  <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{copy.title}</h1>

                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink)]/72">{copy.description}</p>

                  <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
                    <div className="rounded-xl border border-[var(--line)] bg-[var(--mist)]/65 px-4 py-3">
                      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)]/72">
                        <Clock3 className="size-3.5 text-[var(--brand)]" />
                        {copy.nextUpdateTitle}
                      </p>
                      <p className="mt-1 text-sm text-[var(--ink)]/72">{copy.nextUpdateDescription}</p>
                    </div>

                    <div className="rounded-xl border border-[var(--line)] bg-[var(--mist)]/65 px-4 py-3">
                      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)]/72">
                        <Sparkles className="size-3.5 text-[var(--brand)]" />
                        {copy.formatTitle}
                      </p>
                      <p className="mt-1 text-sm text-[var(--ink)]/72">{copy.formatDescription}</p>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Button asChild>
                      <Link href="https://discord.gg/QyTvmTaC9G">{copy.discordCta}</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <LocalizedLink href="/">{copy.homeCta}</LocalizedLink>
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        <SiteFooter />
      </HomeSmoothScroll>
    </div>
  );
}
