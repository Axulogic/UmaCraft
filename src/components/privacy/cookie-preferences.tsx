"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { COOKIE_CONSENT_KEY } from "@/lib/storage-keys";
import { useLocale } from "@/lib/use-locale";

const COOKIE_ICON_DATA_URI =
  "data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAzMCAxNCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzAgMTQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZGRkZGRjt9Cgkuc3Qxe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzAwNjZGRjt9Cgkuc3Qye2ZpbGw6I0ZGRkZGRjt9Cgkuc3Qze2ZpbGw6IzAwNjZGRjt9Cjwvc3R5bGU+CgkJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyNzUgLTIwMCkiPgoJCQk8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjc1IDIwMCkiPgoJCQkJPHBhdGggY2xhc3M9InN0MCIgZD0ibTcuNCAxMi44aDYuOGwzLjEtMTEuNmgtOS45Yy0zLjIgMC01LjggMi42LTUuOCA1LjhzMi42IDUuOCA1LjggNS44eiIvPgoJCQk8L2c+CgkJPC9nPgoJCTxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjc1IC0yMDApIj4KCQkJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTI3NSAyMDApIj4KCQkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Im0yMi42IDBoLTE1LjJjLTMuOSAwLTcgMy4xLTcgN3MzLjEgNyA3IDdoMTUuMmMzLjkgMCA3LTMuMSA3LTdzLTMuMi03LTctN3ptLTIxIDdjMC0zLjIgMi42LTUuOCA1LjgtNS44aDkuOWwtMy4xIDExLjZoLTYuOGMtMy4yIDAtNS44LTIuNi01LjgtNS44eiIvPgoJCQkJPHBhdGggY2xhc3M9InN0MiIgZD0ibTI0LjYgNGMwLjIgMC4yIDAuMiAwLjYgMCAwLjhsLTIuMSAyLjIgMi4yIDIuMmMwLjIgMC4yIDAuMiAwLjYgMCAwLjhzLTAuNiAwLjItMC44IDBsLTIuMi0yLjItMi4yIDIuMmMtMC4yIDAuMi0wLjYgMC4yLTAuOCAwcy0wLjItMC42IDAtMC44bDIuMS0yLjItMi4yLTIuMmMtMC4yLTAuMi0wLjItMC42IDAtMC44czAuNi0wLjIgMC44IDBsMi4yIDIuMiAyLjItMi4yYzAuMi0wLjIgMC42LTAuMiAwLjggMHoiLz4KCQkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Im0xMi43IDQuMWMwLjIgMC4yIDAuMyAwLjYgMC4xIDAuOGwtNC4yIDQuOWMtMC4xIDAuMS0wLjIgMC4yLTAuMyAwLjItMC4yIDAuMS0wLjUgMC4xLTAuNy0wLjFsLTIuMi0yLjJjLTAuMi0wLjItMC4yLTAuNiAwLTAuOHMwLjYtMC4yIDAuOCAwbDEuOCAxLjcgMy44LTQuNWMwLjItMC4yIDAuNi0wLjIgMC45IDB6Ii8+CgkJCTwvZz4KCQk8L2c+Cjwvc3ZnPg==";

type CookieConsentState = {
  necessary: true;
  functional: boolean;
  performance: boolean;
  targeting: boolean;
};

const DEFAULT_CONSENT: CookieConsentState = {
  necessary: true,
  functional: true,
  performance: true,
  targeting: true,
};

export function CookiePreferences() {
  const locale = useLocale();
  const copy = locale.cookieConsent;
  const [isOpen, setIsOpen] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState>(DEFAULT_CONSENT);
  const [expandedKey, setExpandedKey] = useState<keyof CookieConsentState | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Partial<CookieConsentState>;
      setConsent({
        necessary: true,
        functional: Boolean(parsed.functional),
        performance: Boolean(parsed.performance),
        targeting: Boolean(parsed.targeting),
      });
    } catch {
      setConsent(DEFAULT_CONSENT);
    }
  }, []);

  const rows = useMemo(
    () => [
      {
        key: "necessary" as const,
        label: copy.strictlyNecessaryLabel,
        locked: true,
      },
      {
        key: "functional" as const,
        label: copy.functionalLabel,
        locked: false,
      },
      {
        key: "performance" as const,
        label: copy.performanceLabel,
        locked: false,
      },
      {
        key: "targeting" as const,
        label: copy.targetingLabel,
        locked: false,
      },
    ],
    [copy],
  );

  const rowDescription = (key: keyof CookieConsentState) => {
    const isPt = locale.lang === "pt";
    if (key === "necessary") {
      return isPt
        ? "Essenciais para segurança, sessão e funcionamento básico do site. Não podem ser desativados."
        : "Required for security, session integrity and core website operation. Cannot be disabled.";
    }
    if (key === "functional") {
      return isPt
        ? "Salvam preferências de interface e melhoram recursos de usabilidade."
        : "Stores interface preferences and improves usability-related features.";
    }
    if (key === "performance") {
      return isPt
        ? "Coletam métricas agregadas para entender desempenho e estabilidade das páginas."
        : "Collects aggregated metrics to understand performance and page stability.";
    }
    return isPt
      ? "Usados para personalização de conteúdo e campanhas, quando aplicável."
      : "Used for content and campaign personalization when applicable.";
  };

  const saveConsent = (value: CookieConsentState) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
    }
    setConsent(value);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 text-[var(--paper)]/80 transition-colors hover:text-[var(--paper)]"
      >
        <Image src={COOKIE_ICON_DATA_URI} alt="" width={34} height={14} unoptimized />
        <span>{locale.footer.cookiePreferencesLabel}</span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[220] bg-black/45 p-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.96 }}
              transition={{ 
                duration: 0.28, 
                ease: [0.16, 1, 0.3, 1]
              }}
              className="mx-auto w-full max-w-[680px] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] shadow-[0_34px_88px_-30px_rgba(0,0,0,0.55)] max-h-[90vh] overflow-y-auto"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-[var(--line)] px-6 py-5">
                <div className="max-w-[520px]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--ink)]/55">
                    Privacy Controls
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold leading-tight">{copy.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/72">{copy.description}</p>
                  <Link
                    href={copy.policyHref}
                    className="mt-2 inline-block text-sm font-medium text-[var(--brand)] underline decoration-[var(--brand)]/45 underline-offset-2"
                  >
                    {copy.policyCta}
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={copy.closeAriaLabel}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--mist)] text-[var(--ink)]/75 transition-all hover:bg-[var(--line)]/25 hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold">{copy.manageTitle}</h3>
                <div className="mt-4 overflow-hidden rounded-xl border border-[var(--line)]">
                  {rows.map((row, index) => (
                    <motion.div
                      key={row.key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, delay: index * 0.03 }}
                      className={`${index > 0 ? "border-t border-[var(--line)]" : ""} transition-colors hover:bg-[var(--mist)]/30`}
                    >
                      <div className="flex items-center justify-between gap-3 px-4 py-4">
                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedKey((current) => (current === row.key ? null : row.key))
                            }
                            className="group inline-flex items-center gap-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 rounded-lg -ml-1 pl-1 pr-2 py-1"
                            aria-expanded={expandedKey === row.key}
                            aria-label={row.label}
                          >
                            <Plus
                              className={`size-4 text-[var(--ink)]/65 transition-all duration-200 ease-out group-hover:text-[var(--brand)] ${expandedKey === row.key ? "rotate-45" : "rotate-0"
                                }`}
                            />
                            <p className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">{row.label}</p>
                          </button>
                        </div>

                        <div className="shrink-0">
                          {row.locked ? (
                            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
                              {copy.alwaysActiveLabel}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                setConsent((current) => ({
                                  ...current,
                                  [row.key]: !current[row.key],
                                }))
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 ${consent[row.key] ? "bg-[var(--brand)] hover:bg-[var(--brand)]/90" : "bg-[var(--ink)]/25 hover:bg-[var(--ink)]/35"
                                }`}
                              aria-pressed={consent[row.key]}
                              aria-label={row.label}
                            >
                              <span
                                className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${consent[row.key] ? "translate-x-[1.375rem] scale-100" : "translate-x-0.5 scale-95"
                                  }`}
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {expandedKey === row.key ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ 
                              height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.2, ease: "easeOut" }
                            }}
                            className="overflow-hidden border-t border-[var(--line)] bg-[var(--mist)]/40"
                          >
                            <motion.div
                              initial={{ y: -8 }}
                              animate={{ y: 0 }}
                              exit={{ y: -8 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="px-11 py-3"
                            >
                              <p className="text-sm leading-relaxed text-[var(--ink)]/72">
                                {rowDescription(row.key)}
                              </p>
                            </motion.div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] bg-[var(--mist)] px-6 py-4">
                <button
                  type="button"
                  onClick={() =>
                    saveConsent({
                      necessary: true,
                      functional: false,
                      performance: false,
                      targeting: false,
                    })
                  }
                  className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition-all hover:bg-[var(--line)]/30 hover:border-[var(--ink)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
                >
                  {copy.rejectAllCta}
                </button>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => saveConsent(DEFAULT_CONSENT)}
                    className="rounded-xl border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-5 py-2.5 text-sm font-semibold text-[var(--brand)] transition-all hover:bg-[var(--brand)]/20 hover:border-[var(--brand)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
                  >
                    {locale.lang === "pt" ? "Aceitar Todos" : "Accept All"}
                  </button>
                  <button
                    type="button"
                    onClick={() => saveConsent(consent)}
                    className="rounded-xl bg-[var(--brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[var(--brand)]/90 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
                  >
                    {copy.confirmChoicesCta}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
