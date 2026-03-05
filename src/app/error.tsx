"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { HomeSmoothScroll } from "@/components/layout/home-smooth-scroll";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/use-locale";

function getSafeErrorMessage(error: unknown, unhandledEventPrefix: string): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "type" in error) {
    return `${unhandledEventPrefix}: ${(error as Event).type}`;
  }

  return String(error);
}

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: (Error & { digest?: string }) | unknown;
  reset: () => void;
}) {
  const digest =
    typeof error === "object" && error !== null && "digest" in error
      ? String((error as { digest?: string }).digest ?? "")
      : "";
  const locale = useLocale();
  const copy = locale.pages.error;

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <HomeSmoothScroll>
        <main className="pt-28 pb-16">
          <div className="mx-auto w-full max-w-2xl px-6 text-center">
          <div className="space-y-6">
            <div>
              <AlertTriangle className="size-16 text-[var(--brand)] mx-auto mb-4" />
              <h1 className="text-4xl font-bold">{copy.title}</h1>
              <p className="text-[var(--ink)]/70 mt-2">
                {copy.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset}>
                <RefreshCw className="size-4 mr-2" />
                {copy.retryCta}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <Home className="size-4 mr-2" />
                  {copy.homeCta}
                </Link>
              </Button>
            </div>

            <div className="border-t border-[var(--line)] pt-6 mt-8">
              <p className="text-sm text-[var(--ink)]/60">
                {copy.supportPrefix}
                <Link href="/discord-link" className="text-[var(--brand)] hover:underline">
                  {copy.supportLinkLabel}
                </Link>
                {copy.supportSuffix}
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-[var(--brand)] hover:underline">
                  {copy.detailsLabel}
                </summary>
                <pre className="mt-2 p-3 bg-[var(--paper)] border border-[var(--line)] rounded text-xs text-left overflow-auto">
                  {getSafeErrorMessage(error, copy.unhandledEventPrefix)}
                  {digest && `\n${copy.digestLabel}: ${digest}`}
                </pre>
              </details>
            </div>
          </div>
          </div>
        </main>
        <SiteFooter />
      </HomeSmoothScroll>
    </div>
  );
}
