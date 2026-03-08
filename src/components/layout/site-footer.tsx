"use client";

import { motion } from "motion/react";
import {
  Cloud,
  Copyright,
  Copy,
  Info,
  Handshake,
  Scale,
  ShieldCheck,
  CircleHelp,
  History,
} from "lucide-react";

import { LocalizedLink } from "@/components/routing/localized-link";
import { Button } from "@/components/ui/button";
import { CookiePreferences } from "@/components/privacy/cookie-preferences";
import { appToast } from "@/lib/toast";
import { useLocale } from "@/lib/use-locale";

async function copyToClipboard(value: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const temporaryTextArea = document.createElement("textarea");
  temporaryTextArea.value = value;
  temporaryTextArea.style.position = "fixed";
  temporaryTextArea.style.opacity = "0";
  document.body.appendChild(temporaryTextArea);
  temporaryTextArea.focus();
  temporaryTextArea.select();

  const successful = document.execCommand("copy");
  document.body.removeChild(temporaryTextArea);

  if (!successful) {
    throw new Error("Copy command failed.");
  }
}

export function SiteFooter() {
  const locale = useLocale();
  const currentYear = String(new Date().getFullYear());
  const rightsText = locale.footer.rightsPattern.replace("{year}", currentYear);
  const rightsSecondaryText = locale.footer.rightsSecondaryPattern;
  const infrastructurePills = [
    {
      icon: Cloud,
      prefix: locale.footer.poweredByLabel,
      accent: locale.footer.infrastructureProvider,
    },
  ];

  async function handleCopyAddress() {
    try {
      await copyToClipboard(locale.brand.serverAddress);
      appToast.success(locale.hero.copySuccess, { id: "footer-copy-success" });
    } catch {
      appToast.error(locale.hero.copyError, { id: "footer-copy-error" });
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-56 w-56 rounded-full bg-[var(--brand)]/28 blur-3xl"
      />

      <motion.div
        className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.52, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col gap-4 rounded-[1.7rem] border border-[color:rgba(255,255,255,0.14)] bg-[color:rgba(255,255,255,0.05)] p-5 sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
        >
          <div>
            <p className="heading-font text-2xl">{locale.footer.joinPrompt}</p>
            <p className="mt-1.5 text-sm text-[var(--paper)]/76">{locale.footer.tagline}</p>
          </div>
          <Button
            type="button"
            size="lg"
            className="rounded-full bg-[var(--brand)] px-6 text-[var(--paper)] hover:bg-[var(--brand)]/90"
            onClick={() => {
              void handleCopyAddress();
            }}
          >
            <Copy className="size-4" />
            {locale.footer.copyCta}
          </Button>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <LocalizedLink
            href="/about"
            className="inline-flex items-center gap-1.5 text-[var(--paper)]/80 transition-colors hover:text-[var(--paper)]"
          >
            <Info className="size-3.5" />
            {locale.footer.links.about}
          </LocalizedLink>
          <LocalizedLink
            href="/credits"
            className="inline-flex items-center gap-1.5 text-[var(--paper)]/80 transition-colors hover:text-[var(--paper)]"
          >
            <Handshake className="size-3.5" />
            {locale.footer.links.credits}
          </LocalizedLink>
          <LocalizedLink
            href="/terms"
            className="inline-flex items-center gap-1.5 text-[var(--paper)]/80 transition-colors hover:text-[var(--paper)]"
          >
            <Scale className="size-3.5" />
            {locale.footer.links.terms}
          </LocalizedLink>
          <LocalizedLink
            href="/privacy"
            className="inline-flex items-center gap-1.5 text-[var(--paper)]/80 transition-colors hover:text-[var(--paper)]"
          >
            <ShieldCheck className="size-3.5" />
            {locale.footer.links.privacy}
          </LocalizedLink>
          <LocalizedLink
            href="/faq"
            className="inline-flex items-center gap-1.5 text-[var(--paper)]/80 transition-colors hover:text-[var(--paper)]"
          >
            <CircleHelp className="size-3.5" />
            {locale.footer.links.faq}
          </LocalizedLink>
          <LocalizedLink
            href="/changelog"
            className="inline-flex items-center gap-1.5 text-[var(--paper)]/80 transition-colors hover:text-[var(--paper)]"
          >
            <History className="size-3.5" />
            {locale.footer.links.changelog}
          </LocalizedLink>
          <CookiePreferences />
        </div>

        <div className="flex flex-col gap-2 border-t border-[color:rgba(255,255,255,0.14)] pt-4 text-xs text-[var(--paper)]/62 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="inline-flex items-center gap-1.5">
              <Copyright className="size-3.5" />
              {rightsText}
            </p>
            <p className="text-[10px] text-[var(--paper)]/52">{rightsSecondaryText}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {infrastructurePills.map((pill) => (
              <span
                key={`${pill.prefix}-${pill.accent}`}
                className="inline-flex items-center gap-1 rounded-full border border-[color:rgba(255,255,255,0.18)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)]/70"
              >
                <pill.icon className="size-3 text-[#e2762a]" />
                <span>{pill.prefix}</span>
                <span className="text-[#e2762a]">{pill.accent}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
