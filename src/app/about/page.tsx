"use client";

import Link from "next/link";
import { Server, Users, Heart, Star } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { PlayNowButton } from "@/components/play/play-now-button";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/use-locale";

export default function AboutPage() {
  const locale = useLocale();
  const copy = locale.pages.about;

  const iconByIndex = [Users, Server, Heart] as const;

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />

      <main className="relative overflow-hidden pt-28 pb-20">
        <div className="relative mx-auto w-full max-w-5xl px-6">
          <section className="mt-8 space-y-6">
            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_20px_60px_-40px_rgba(25,25,25,0.55)] sm:p-10">
              <h1 className="heading-font text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--ink)]/75">{copy.intro}</p>
            </div>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {copy.cards.map((card, index) => {
              const Icon = iconByIndex[index] ?? Users;
              const iconClassByIndex = [
                "bg-[var(--brand)]/10 text-[var(--brand)]",
                "bg-[#fffc00]/10 text-[#d4d100]",
                "bg-[#fc00ff]/10 text-[#fc00ff]",
              ] as const;

              return (
                <article
                  key={card.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_10px_40px_-20px_rgba(25,25,25,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(25,25,25,0.4)]"
                >
                  <div
                    className={`mb-4 inline-flex size-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${
                      iconClassByIndex[index] ?? iconClassByIndex[0]
                    }`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <h2 className="heading-font text-xl font-semibold text-[var(--ink)]">{card.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/70">{card.description}</p>
                </article>
              );
            })}
          </section>

          <section className="relative mt-12 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-8 text-center shadow-[0_20px_60px_-40px_rgba(25,25,25,0.55)] md:p-12">
            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mx-auto mb-6 inline-flex size-16 items-center justify-center rounded-[1.5rem] border border-[var(--line)] bg-[var(--mist)] shadow-sm">
                <Star className="size-8 fill-[var(--brand)]/20 text-[var(--brand)]" />
              </div>
              <h2 className="heading-font text-3xl font-semibold text-[var(--ink)] sm:text-4xl">{copy.missionTitle}</h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--ink)]/75 md:text-lg">
                {copy.missionPrefix}
                <strong>{copy.missionHighlight}</strong>
                {copy.missionSuffix}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <PlayNowButton size="lg" label={copy.primaryCta} className="rounded-full shadow-lg" />
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <Link href="/features">{copy.secondaryCta}</Link>
                </Button>
              </div>
            </div>

            <div className="pointer-events-none absolute top-0 right-0 -m-20 size-64 rounded-full bg-[var(--brand)]/5 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 -m-20 size-64 rounded-full bg-[#fffc00]/5 blur-3xl" />
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
