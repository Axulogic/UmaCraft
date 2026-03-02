import Link from "next/link";
import { ArrowLeft, CalendarClock, FileText, Scale, ShieldCheck } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { getLocale } from "@/lib/locale";
import type { LegalSection } from "@/types/locale";

export function LegalShell({ section }: { section: LegalSection }) {
  const locale = getLocale();
  const badgeLabel = section.badge ?? locale.legal.defaultBadge;

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />

      <main className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute top-22 right-8 h-36 w-36 rounded-[2rem] bg-[var(--brand)]/12 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-10 left-4 h-28 w-28 rounded-[1.6rem] border border-[var(--line)] bg-[var(--paper)]/55"
        />

        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_14px_60px_rgba(25,25,25,0.08)] sm:p-8 lg:p-10">
          <div
            aria-hidden
            className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[var(--brand)] via-[var(--brand)]/65 to-transparent"
          />

          <header className="border-b border-[var(--line)] pb-6 sm:pb-8">
            <p className="inline-flex rounded-full border border-[var(--line)] bg-[var(--mist)] px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--ink)] uppercase">
              {badgeLabel}
            </p>
            <h1 className="mt-4 heading-font text-4xl leading-[0.95] text-[var(--ink)] sm:text-5xl">
              {section.title}
            </h1>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--ink)]/74 sm:text-base">
              {section.intro}
            </p>
          </header>

          <div className="mt-8 grid gap-6 lg:grid-cols-[16rem_1fr]">
            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
                <p className="mb-2 text-[11px] tracking-[0.1em] text-[var(--ink)]/56 uppercase">
                  {locale.legal.metaPanelTitle}
                </p>
                <div className="space-y-2.5 text-xs text-[var(--ink)]/74">
                  <p className="inline-flex items-center gap-1.5">
                    <FileText className="size-3.5 text-[var(--brand)]" />
                    {section.items.length} {locale.legal.clausesSuffix}
                  </p>
                  <p className="inline-flex items-center gap-1.5">
                    <CalendarClock className="size-3.5 text-[var(--brand)]" />
                    {locale.legal.updatedLabel}: {section.updatedAt}
                  </p>
                  <p className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-[var(--brand)]" />
                    {locale.legal.enforcementLabel}
                  </p>
                </div>
              </div>

              <nav
                aria-label={locale.legal.contentsTitle}
                className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4"
              >
                <p className="mb-2 text-[11px] tracking-[0.1em] text-[var(--ink)]/56 uppercase">
                  {locale.legal.contentsTitle}
                </p>
                <ul className="space-y-2">
                  {section.items.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group inline-flex items-start gap-2 text-xs text-[var(--ink)]/74 transition-colors hover:text-[var(--ink)]"
                      >
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--mist)] text-[10px] font-semibold text-[var(--ink)]">
                          {index + 1}
                        </span>
                        <span>{item.heading}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <article className="space-y-4">
              {section.items.map((item, index) => (
                <section
                  key={item.id}
                  id={item.id}
                  className="scroll-mt-28 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-6"
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-[var(--mist)] text-xs font-semibold text-[var(--ink)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-base font-semibold text-[var(--ink)] sm:text-lg">
                      {item.heading}
                    </h2>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--ink)]/76 sm:text-base">
                    {item.body}
                  </p>

                  {item.points && item.points.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-[var(--ink)]/74">
                          <span className="mt-[0.45rem] block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </article>
          </div>

          <footer className="mt-8 flex flex-col gap-4 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-2 text-xs text-[var(--ink)]/68">
              <Scale className="size-3.5 text-[var(--brand)]" />
              {locale.legal.revisionNotice}
            </p>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-[var(--line)] bg-[var(--paper)]"
            >
              <Link href="/" className="inline-flex items-center gap-2">
                <ArrowLeft className="size-4" />
                {locale.legal.backHome}
              </Link>
            </Button>
          </footer>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
