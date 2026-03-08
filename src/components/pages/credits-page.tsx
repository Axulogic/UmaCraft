"use client";

import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Handshake, Library, Link2, Music4, Users } from "lucide-react";

import { HomeSmoothScroll } from "@/components/layout/home-smooth-scroll";
import { SiteFooter } from "@/components/layout/site-footer";
import { Topbar } from "@/components/layout/topbar";
import { LocalizedLink } from "@/components/routing/localized-link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/use-locale";

const thirdPartyIcons = [BadgeCheck, Library, Music4, Link2, Link2] as const;

export function CreditsPageContent() {
  const locale = useLocale();
  const copy = locale.pages.credits;

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <HomeSmoothScroll>
        <main className="relative overflow-hidden pt-28 pb-20">
          <div className="relative mx-auto w-full max-w-6xl px-6">
            <header className="page-enter mt-8 mb-12 flex flex-col items-center text-center">
              <h1 className="heading-font mt-5 max-w-3xl text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink)]/75">{copy.intro}</p>
            </header>

            <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
              <div className="space-y-8">
                <section className="page-enter page-enter-d1 rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm sm:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
                      <Handshake className="size-5" />
                    </div>
                    <h2 className="heading-font text-2xl font-semibold text-[var(--ink)]">{copy.partnersTitle}</h2>
                  </div>

                  <div className="space-y-5">
                    {copy.partners.map((partner) => (
                      <article
                        key={partner.serverId}
                        className="group rounded-[1.5rem] border border-[var(--line)] bg-[var(--mist)]/40 p-6 transition-all hover:border-[var(--brand)]/40 hover:bg-[var(--mist)]"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="heading-font text-xl font-semibold text-[var(--ink)]">{partner.name}</h3>
                            <p className="mt-1 flex items-center gap-2 text-xs font-medium text-[var(--ink)]/60">
                              <span className="rounded-full bg-[var(--line)]/50 px-2 py-0.5">
                                {copy.serverIdLabel}: {partner.serverId}
                              </span>
                            </p>
                          </div>

                          <Button asChild className="rounded-full shadow-sm sm:shrink-0">
                            <Link href={`/partner/${partner.slug}`}>
                              {copy.partnerCta}
                              <ArrowUpRight className="ml-1.5 size-4" />
                            </Link>
                          </Button>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-[var(--ink)]/80">{partner.summary}</p>

                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {partner.impact.map((point) => (
                            <li key={point} className="flex items-start gap-2 text-xs text-[var(--ink)]/70">
                              <BadgeCheck className="mt-[0.1rem] size-3.5 shrink-0 text-[var(--brand)]" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="page-enter page-enter-d2 rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm sm:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#fffc00]/15 text-[#d4d100]">
                      <Library className="size-5" />
                    </div>
                    <h2 className="heading-font text-2xl font-semibold text-[var(--ink)]">{copy.thirdPartyTitle}</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {copy.thirdParty.map((item, index) => {
                      const Icon = thirdPartyIcons[index] ?? thirdPartyIcons[thirdPartyIcons.length - 1];
                      return (
                        <article
                          key={item.title}
                          className="rounded-2xl border border-[var(--line)] bg-[var(--mist)]/40 p-5 transition-colors hover:border-[var(--line)] hover:bg-[var(--mist)]"
                        >
                          <div className="mb-4 inline-flex size-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--brand)] shadow-sm">
                            <Icon className="size-4" />
                          </div>
                          <h3 className="heading-font text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
                          <p className="mt-2 text-xs leading-relaxed text-[var(--ink)]/70">{item.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.references.map((reference) => (
                              <a
                                key={`${item.title}-${reference.label}`}
                                href={reference.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[10px] font-semibold text-[var(--ink)]/72 transition-colors hover:bg-[var(--mist)] hover:text-[var(--ink)]"
                              >
                                {reference.label}
                                <ArrowUpRight className="size-3" />
                              </a>
                            ))}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              </div>

              <aside className="page-enter page-enter-d3 space-y-6 lg:sticky lg:top-36 lg:self-start">
                <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-gradient-to-br from-[var(--paper)] to-[var(--mist)]/45 p-6 shadow-[0_10px_40px_-20px_rgba(25,25,25,0.3)]">
                  <div className="pointer-events-none absolute top-0 right-0 -m-8 size-24 rounded-full bg-[var(--brand)]/10 blur-xl" />

                  <div className="mb-4 flex size-12 items-center justify-center rounded-[1.2rem] bg-[var(--brand)] text-[white] shadow-md">
                    <Users className="size-6" />
                  </div>

                  <h3 className="heading-font mb-2 text-xl font-semibold text-[var(--ink)]">{copy.communityTitle}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-[var(--ink)]/75">{copy.communityDescription}</p>

                  <Button
                    asChild
                    className="w-full rounded-full text-white shadow-[0_8px_20px_-14px_rgba(241,80,37,0.7)] hover:shadow-[0_10px_24px_-12px_rgba(241,80,37,0.78)]"
                  >
                    <Link href="https://discord.gg/QyTvmTaC9G">
                      <Link2 className="mr-1.5 size-4" />
                      {copy.communityCta}
                    </Link>
                  </Button>
                </div>

                <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--paper)] p-4 text-center shadow-sm">
                  <p className="mb-3 text-xs text-[var(--ink)]/60">{copy.footerPrompt}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="h-9 w-full rounded-full border-[var(--line)] bg-[var(--mist)] text-xs text-[var(--ink)] hover:bg-[var(--line)]/50"
                  >
                    <LocalizedLink href="/">{copy.footerBackHome}</LocalizedLink>
                  </Button>
                </div>
              </aside>
            </div>
          </div>
        </main>
        <SiteFooter />
      </HomeSmoothScroll>
    </div>
  );
}
