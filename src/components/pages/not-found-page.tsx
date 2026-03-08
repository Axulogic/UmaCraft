"use client";

import { Home, Search } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { HomeSmoothScroll } from "@/components/layout/home-smooth-scroll";
import { Topbar } from "@/components/layout/topbar";
import { LocalizedLink } from "@/components/routing/localized-link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/use-locale";

export function NotFoundPageContent() {
  const locale = useLocale();
  const copy = locale.pages.notFound;

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <HomeSmoothScroll>
        <main className="pt-28 pb-16">
          <div className="mx-auto w-full max-w-2xl px-6 text-center">
          <div className="page-enter space-y-6">
            <div>
              <h1 className="text-6xl font-bold text-[var(--brand)]">{copy.code}</h1>
              <h2 className="text-2xl font-semibold mt-4">{copy.title}</h2>
              <p className="text-[var(--ink)]/70 mt-2">
                {copy.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <LocalizedLink href="/">
                  <Home className="size-4 mr-2" />
                  {copy.homeCta}
                </LocalizedLink>
              </Button>
              <Button variant="outline" asChild>
                <LocalizedLink href="/features">
                  <Search className="size-4 mr-2" />
                  {copy.featuresCta}
                </LocalizedLink>
              </Button>
            </div>

            <div className="border-t border-[var(--line)] pt-6 mt-8">
              <p className="text-sm text-[var(--ink)]/60">
                {copy.supportPrefix}
                <LocalizedLink href="/discord-link" className="text-[var(--brand)] hover:underline">
                  {copy.supportLinkLabel}
                </LocalizedLink>
                {copy.supportSuffix}
              </p>
            </div>
          </div>
          </div>
        </main>
        <SiteFooter />
      </HomeSmoothScroll>
    </div>
  );
}
