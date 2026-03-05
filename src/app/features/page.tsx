import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Gamepad2, Sparkles, Pickaxe, Map, Crown, Hammer, Rocket } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { HomeSmoothScroll } from "@/components/layout/home-smooth-scroll";
import { PlayNowButton } from "@/components/play/play-now-button";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Recursos | UmaCraft — Minecraft Umamusume Server",
  description:
    "Veja todos os recursos do UmaCraft: servidor Minecraft temático de Umamusume Pretty Derby com sistemas exclusivos para fãs.",
};

const MAIN_ICON_MAP = [Globe, Gamepad2, Sparkles] as const;
const MAIN_COLOR_MAP = ["#fffc00", "#4facfe", "#fc00ff"] as const;
const SECTION_ICON_MAP = [Crown, Pickaxe, Map, Hammer] as const;
const SECTION_COLOR_MAP = ["var(--brand)", "#fffc00", "#fc00ff", "#4facfe"] as const;

export default function FeaturesPage() {
  const locale = getLocale();
  const copy = locale.pages.features;

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <HomeSmoothScroll>
        <main className="relative overflow-hidden pt-28 pb-20">
          <div className="relative mx-auto w-full max-w-6xl px-6">
          <section className="mt-8 mb-16 space-y-4 text-center">
            <h1 className="heading-font mx-auto max-w-4xl text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
              {copy.titleLineOne}
              <br className="hidden sm:block" />
              <span className="text-[var(--brand)]"> {copy.titleLineAccent}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink)]/75">{copy.intro}</p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {copy.mainFeatures.map((feature, index) => {
              const Icon = MAIN_ICON_MAP[index] ?? MAIN_ICON_MAP[0];
              const color = MAIN_COLOR_MAP[index] ?? MAIN_COLOR_MAP[0];
              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(25,25,25,0.4)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-[var(--line)]/30 opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative mb-5 flex items-center justify-between">
                    <div
                      className="flex size-14 items-center justify-center rounded-[1.2rem] shadow-sm backdrop-blur-sm"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                    >
                      <Icon className="size-7" />
                    </div>
                    <span className="rounded-full border border-[var(--line)] bg-[var(--mist)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]/70">
                      {feature.highlight}
                    </span>
                  </div>

                  <h3 className="heading-font relative text-xl font-semibold text-[var(--ink)]">{feature.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-[var(--ink)]/70">{feature.description}</p>
                </div>
              );
            })}
          </section>

          <section className="mt-16 sm:mt-24">
            <div className="mb-10 flex flex-col items-center text-center">
              <h2 className="heading-font text-3xl font-semibold text-[var(--ink)] sm:text-4xl">{copy.systemsTitle}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-[var(--ink)]/70">{copy.systemsIntro}</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {copy.systemSections.map((section, index) => {
                const Icon = SECTION_ICON_MAP[index] ?? SECTION_ICON_MAP[0];
                const color = SECTION_COLOR_MAP[index] ?? SECTION_COLOR_MAP[0];
                return (
                  <article
                    key={section.category}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(25,25,25,0.4)] sm:p-8"
                  >
                    <div className="mb-6 flex items-center gap-3 border-b border-[var(--line)] pb-4">
                      <div className="flex size-10 items-center justify-center rounded-xl" style={{ background: `${color}15`, color }}>
                        <Icon className="size-5" />
                      </div>
                      <h3 className="heading-font text-2xl font-semibold text-[var(--ink)]">{section.category}</h3>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      {section.items.map((item) => (
                        <div key={item.name} className="group flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <div className="size-1.5 rounded-full bg-[var(--brand)] transition-transform group-hover:scale-150" />
                            <h4 className="text-sm font-semibold text-[var(--ink)]">{item.name}</h4>
                          </div>
                          <p className="pl-3.5 text-xs leading-relaxed text-[var(--ink)]/65">
                            {item.description.includes("Agnes Tachyon") ? (
                              <>
                                {item.description.split("Agnes Tachyon")[0]}
                                <Link
                                  href="https://agnesbot.xyz"
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="font-semibold text-[var(--brand)] underline decoration-[var(--brand)]/45 underline-offset-2 hover:decoration-[var(--brand)]"
                                >
                                  Agnes Tachyon
                                </Link>
                                {item.description.split("Agnes Tachyon")[1]}
                              </>
                            ) : (
                              item.description
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="relative mt-16 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-gradient-to-br from-[var(--paper)] via-[var(--paper)] to-[var(--brand)]/10 p-8 shadow-lg sm:mt-24 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 size-[300px] rounded-full bg-[var(--brand)]/20 blur-3xl opacity-50" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 size-[300px] rounded-full bg-[#fffc00]/20 blur-3xl opacity-50" />

            <div className="relative z-10 flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
                  <Rocket className="size-4" />
                  {copy.roadmapBadge}
                </div>
                <h3 className="heading-font text-3xl font-semibold text-[var(--ink)] sm:text-4xl">{copy.roadmapTitle}</h3>
                <p className="mt-4 text-lg leading-relaxed text-[var(--ink)]/75">{copy.roadmapDescription}</p>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-4 sm:w-auto sm:flex-row">
                <PlayNowButton
                  size="lg"
                  label={copy.primaryCta}
                  className="h-12 rounded-full px-6 text-base shadow-[0_4px_14px_rgba(252,0,255,0.39)] hover:shadow-[0_6px_20px_rgba(252,0,255,0.5)]"
                />
                <Button variant="outline" size="lg" className="h-12 rounded-full bg-[var(--paper)] px-6 text-base" asChild>
                  <Link href="https://discord.gg/QyTvmTaC9G">{copy.communityCta}</Link>
                </Button>
              </div>
            </div>
          </section>
          </div>
        </main>
        <SiteFooter />
      </HomeSmoothScroll>
    </div>
  );
}
