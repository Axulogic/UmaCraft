import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { HomeSmoothScroll } from "@/components/layout/home-smooth-scroll";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "FAQ | UmaCraft - Servidor Minecraft de Umamusume Pretty Derby",
  description:
    "Perguntas frequentes sobre o UmaCraft, servidor Minecraft temático de Umamusume. Saiba como jogar, recursos e comunidade do Minecraft server.",
};

export default function FAQPage() {
  const locale = getLocale();
  const copy = locale.pages.faq;

  return (
    <div className="min-h-screen bg-[var(--mist)] text-[var(--ink)]">
      <Topbar />
      <HomeSmoothScroll>
        <main className="pt-28 pb-16">
          <div className="mx-auto w-full max-w-4xl px-6">
          <div className="mt-8 space-y-8">
            <div className="page-enter text-center">
              <h1 className="text-3xl font-bold tracking-tight">{copy.title}</h1>
              <p className="mt-2 text-lg text-[var(--ink)]/78">{copy.intro}</p>
            </div>

            <div className="page-enter page-enter-d1 space-y-4">
              {copy.items.map((faq, index) => (
                <Collapsible
                  key={faq.question}
                  className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] shadow-[0_8px_22px_-18px_rgba(25,25,25,0.35)] transition-all duration-300 hover:border-[var(--brand)]/28 hover:bg-[var(--mist)]/38 data-[state=open]:border-[var(--brand)]/35 data-[state=open]:bg-[var(--mist)]/32 data-[state=open]:shadow-[0_14px_30px_-20px_rgba(25,25,25,0.45)]"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-5 text-left [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] px-2 text-[11px] font-black tabular-nums tracking-[0.08em] text-[var(--brand)] transition-colors duration-300 group-data-[state=open]:border-[var(--brand)]/35 group-data-[state=open]:bg-[var(--brand)]/10">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-medium">{faq.question}</h3>
                    </div>
                    <ChevronDown className="size-4 text-[var(--ink)]/60 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="border-t border-[var(--line)]/60 px-6 pb-5 text-sm">
                    <p className="pt-3 leading-relaxed text-[var(--ink)]/72">{faq.answer}</p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            <div className="page-enter page-enter-d2 border-t border-[var(--line)] pt-8 text-center">
              <h2 className="mb-4 text-xl font-semibold">{copy.stillNeedHelpTitle}</h2>
              <p className="mx-auto mb-6 max-w-md text-[var(--ink)]/70">{copy.stillNeedHelpDescription}</p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link href="https://discord.gg/QyTvmTaC9G">{copy.discordCta}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/about">{copy.aboutCta}</Link>
                </Button>
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
