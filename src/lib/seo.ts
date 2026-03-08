import type { Metadata } from "next";

import { getLocaleDefinition, getOpenGraphLocale, localizePath, type AppLocaleCode } from "@/lib/locale";
import { PUBLIC_SITE_PAGE_KEYS, SITE_PAGE_PATHS, type SitePageKey } from "@/lib/site-routes";
import { buildAbsoluteUrl, SITE_URL } from "@/lib/site-url";

const SOCIAL_IMAGE_PATH = "/assets/icons/logo_and_watermarks/Umacraft_Logo_Orange.png";

// The page currently does not provide direct assets or a final setup destination,
// so it should stay informational and out of the index until that changes.
export const DOWNLOAD_PAGE_IS_READY_FOR_INDEXING = false;

type PageSeoEntry = {
  title: string;
  description: string;
  keywords: string[];
};

const PAGE_SEO: Record<SitePageKey, Record<AppLocaleCode, PageSeoEntry>> = {
  home: {
    "en-US": {
      title: "UmaCraft | Official Website for the UmaCraft Minecraft Server",
      description:
        "Official UmaCraft website for a Minecraft server inspired by Umamusume. Join with Java or Bedrock at play.umacraft.xyz and explore the project hub.",
      keywords: [
        "UmaCraft",
        "play.umacraft.xyz",
        "UmaCraft Minecraft server",
        "Umamusume Minecraft",
        "Umamusume Minecraft server",
        "Minecraft server Java Bedrock",
      ],
    },
    "pt-BR": {
      title: "UmaCraft | Servidor Oficial de Minecraft com temática Umamusume",
      description:
        "Site oficial do UmaCraft, um servidor de Minecraft inspirado em Umamusume. Entre via Java ou Bedrock em play.umacraft.xyz e veja os links oficiais do projeto.",
      keywords: [
        "UmaCraft",
        "play.umacraft.xyz",
        "servidor UmaCraft",
        "servidor Minecraft Umamusume",
        "Umamusume Minecraft",
        "Minecraft Java e Bedrock",
      ],
    },
  },
  about: {
    "en-US": {
      title: "About UmaCraft | Official Website for the UmaCraft Server",
      description:
        "Learn what UmaCraft is, why the server exists, and how this Minecraft project inspired by Umamusume is being built around long-term progression and community play.",
      keywords: [
        "About UmaCraft",
        "UmaCraft project",
        "official UmaCraft website",
        "Umamusume Minecraft server",
      ],
    },
    "pt-BR": {
      title: "Sobre o UmaCraft | Servidor Oficial de Minecraft com temática Umamusume",
      description:
        "Entenda o que é o UmaCraft, por que o projeto existe e como esse servidor de Minecraft inspirado em Umamusume está sendo construído.",
      keywords: [
        "sobre UmaCraft",
        "projeto UmaCraft",
        "site oficial UmaCraft",
        "servidor Minecraft Umamusume",
      ],
    },
  },
  changelog: {
    "en-US": {
      title: "UmaCraft Changelog | Update History",
      description:
        "Track verified UmaCraft update notes, release scope and production changes as soon as the public changelog is ready.",
      keywords: ["UmaCraft changelog", "UmaCraft updates", "Minecraft server updates"],
    },
    "pt-BR": {
      title: "Changelog do UmaCraft | Histórico de Atualizações",
      description:
        "Acompanhe notas de atualização verificadas, escopo de releases e mudanças do UmaCraft assim que o changelog público estiver pronto.",
      keywords: ["changelog UmaCraft", "updates UmaCraft", "atualizações do servidor Minecraft"],
    },
  },
  credits: {
    "en-US": {
      title: "Credits | UmaCraft",
      description:
        "Community acknowledgements, partner references and third-party credits related to UmaCraft website and project operations.",
      keywords: ["UmaCraft credits", "UmaCraft acknowledgements", "UmaCraft partners"],
    },
    "pt-BR": {
      title: "Créditos | UmaCraft",
      description:
        "Reconhecimentos da comunidade, referências parceiras e créditos de terceiros ligados ao site e à operação do UmaCraft.",
      keywords: ["créditos UmaCraft", "agradecimentos UmaCraft", "parceiros UmaCraft"],
    },
  },
  "discord-link": {
    "en-US": {
      title: "Discord Linking Guide | UmaCraft Minecraft Server",
      description:
        "Official guide to link your Discord account with the UmaCraft Minecraft server for support, account sync and community access.",
      keywords: [
        "UmaCraft discord link",
        "UmaCraft discord linking",
        "Minecraft Discord linking guide",
        "UmaCraft support",
      ],
    },
    "pt-BR": {
      title: "Guia de Vinculação com Discord | Servidor UmaCraft",
      description:
        "Guia oficial para vincular sua conta do Discord ao servidor UmaCraft no Minecraft para suporte, sincronização e acesso à comunidade.",
      keywords: [
        "vincular discord UmaCraft",
        "linking UmaCraft",
        "guia discord Minecraft",
        "suporte UmaCraft",
      ],
    },
  },
  download: {
    "en-US": {
      title: "Download Status and Setup | UmaCraft Minecraft Server",
      description:
        "Check UmaCraft download availability, package status and current setup guidance for the official Minecraft server experience.",
      keywords: ["UmaCraft download", "UmaCraft setup", "Minecraft server download status"],
    },
    "pt-BR": {
      title: "Status de Download e Setup | Servidor UmaCraft",
      description:
        "Veja a disponibilidade dos downloads do UmaCraft, o status dos pacotes e as orientações atuais de setup para o servidor.",
      keywords: ["download UmaCraft", "setup UmaCraft", "status de download do servidor Minecraft"],
    },
  },
  faq: {
    "en-US": {
      title: "FAQ | UmaCraft Minecraft Server Help",
      description:
        "Frequently asked questions about UmaCraft, including versions, Java and Bedrock crossplay, account support, Discord linking and how to join play.umacraft.xyz.",
      keywords: [
        "UmaCraft FAQ",
        "play.umacraft.xyz help",
        "UmaCraft crossplay",
        "UmaCraft Java Bedrock",
      ],
    },
    "pt-BR": {
      title: "FAQ | Ajuda Oficial do Servidor UmaCraft",
      description:
        "Perguntas frequentes sobre o UmaCraft, incluindo versão, crossplay Java e Bedrock, suporte, linking com Discord e como entrar em play.umacraft.xyz.",
      keywords: [
        "FAQ UmaCraft",
        "ajuda play.umacraft.xyz",
        "crossplay UmaCraft",
        "UmaCraft Java Bedrock",
      ],
    },
  },
  features: {
    "en-US": {
      title: "Features | UmaCraft Umamusume Minecraft Server",
      description:
        "Explore UmaCraft features, progression systems, economy, quests, hub structure and the Umamusume-inspired elements that define the server.",
      keywords: [
        "UmaCraft features",
        "Umamusume Minecraft server",
        "UmaCraft systems",
        "UmaCraft economy",
      ],
    },
    "pt-BR": {
      title: "Recursos | Servidor UmaCraft de Minecraft com temática Umamusume",
      description:
        "Conheça os recursos do UmaCraft, seus sistemas de progressão, economia, quests, estrutura de hub e os elementos inspirados em Umamusume.",
      keywords: [
        "recursos UmaCraft",
        "servidor Minecraft Umamusume",
        "sistemas UmaCraft",
        "economia UmaCraft",
      ],
    },
  },
  hub: {
    "en-US": {
      title: "Hub Guide | UmaCraft NPCs and Server Systems",
      description:
        "Official UmaCraft hub guide with NPC roles, system highlights and a clearer view of how the Minecraft server is organized around its themed hub.",
      keywords: ["UmaCraft hub", "UmaCraft NPC guide", "Minecraft server hub", "UmaCraft systems"],
    },
    "pt-BR": {
      title: "Guia do Hub | NPCs e Sistemas do UmaCraft",
      description:
        "Guia oficial do hub do UmaCraft com funções dos NPCs, destaques dos sistemas e uma visão clara de como o servidor de Minecraft está organizado.",
      keywords: ["hub UmaCraft", "guia de NPCs UmaCraft", "hub do servidor Minecraft", "sistemas UmaCraft"],
    },
  },
  privacy: {
    "en-US": {
      title: "Privacy Policy | UmaCraft",
      description:
        "Read the UmaCraft privacy policy for website usage, support, cookies and platform data handling across the project platform.",
      keywords: ["UmaCraft privacy", "UmaCraft cookie policy", "UmaCraft data policy"],
    },
    "pt-BR": {
      title: "Política de Privacidade | UmaCraft",
      description:
        "Leia a política de privacidade do UmaCraft para uso do site, suporte, cookies e tratamento de dados na plataforma oficial.",
      keywords: ["privacidade UmaCraft", "política de cookies UmaCraft", "dados UmaCraft"],
    },
  },
  terms: {
    "en-US": {
      title: "Terms of Service | UmaCraft",
      description:
        "Review the UmaCraft terms of service for website usage, server access, support flow, moderation and platform governance.",
      keywords: ["UmaCraft terms", "UmaCraft rules", "UmaCraft service terms"],
    },
    "pt-BR": {
      title: "Termos de Serviço | UmaCraft",
      description:
        "Consulte os termos de serviço do UmaCraft para uso do site, acesso ao servidor, suporte, moderação e governança da plataforma.",
      keywords: ["termos UmaCraft", "regras UmaCraft", "termos de serviço UmaCraft"],
    },
  },
};

function getCanonicalPath(pageKey: SitePageKey, localeCode: AppLocaleCode) {
  return localizePath(SITE_PAGE_PATHS[pageKey], localeCode);
}

function getRobotsDirective(pageKey: SitePageKey): Metadata["robots"] | undefined {
  if (pageKey === "changelog") {
    return {
      index: false,
      follow: true,
    };
  }

  if (pageKey === "download" && !DOWNLOAD_PAGE_IS_READY_FOR_INDEXING) {
    return {
      index: false,
      follow: true,
    };
  }

  return undefined;
}

export function buildPageMetadata(pageKey: SitePageKey, localeCode: AppLocaleCode): Metadata {
  const pageSeo = PAGE_SEO[pageKey][localeCode];
  const locale = getLocaleDefinition(localeCode);
  const canonicalPath = getCanonicalPath(pageKey, localeCode);
  const englishPath = getCanonicalPath(pageKey, "en-US");
  const portuguesePath = getCanonicalPath(pageKey, "pt-BR");
  const absoluteCanonicalUrl = buildAbsoluteUrl(canonicalPath);
  const robots = getRobotsDirective(pageKey);

  return {
    title: pageSeo.title,
    description: pageSeo.description,
    keywords: pageSeo.keywords,
    robots,
    alternates: {
      canonical: absoluteCanonicalUrl,
      languages: {
        "en-US": buildAbsoluteUrl(englishPath),
        "pt-BR": buildAbsoluteUrl(portuguesePath),
        "x-default": buildAbsoluteUrl(englishPath),
      },
    },
    openGraph: {
      title: pageSeo.title,
      description: pageSeo.description,
      url: absoluteCanonicalUrl,
      siteName: locale.brand.projectName,
      locale: getOpenGraphLocale(localeCode),
      type: "website",
      images: [
        {
          url: SOCIAL_IMAGE_PATH,
          alt: `${locale.brand.projectName} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageSeo.title,
      description: pageSeo.description,
      images: [SOCIAL_IMAGE_PATH],
    },
  };
}

function buildWebPageSchema(pageKey: SitePageKey, localeCode: AppLocaleCode) {
  const pageSeo = PAGE_SEO[pageKey][localeCode];
  const canonicalUrl = buildAbsoluteUrl(getCanonicalPath(pageKey, localeCode));

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: pageSeo.title,
    description: pageSeo.description,
    inLanguage: localeCode,
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
    about: {
      "@id": `${SITE_URL}#organization`,
    },
  };
}

function buildOrganizationSchema(localeCode: AppLocaleCode) {
  const locale = getLocaleDefinition(localeCode);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: locale.brand.projectName,
    url: SITE_URL,
    logo: buildAbsoluteUrl(SOCIAL_IMAGE_PATH),
  };
}

function buildWebsiteSchema(localeCode: AppLocaleCode) {
  const locale = getLocaleDefinition(localeCode);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: locale.brand.projectName,
    inLanguage: ["en-US", "pt-BR"],
  };
}

function buildFaqSchema(localeCode: AppLocaleCode) {
  const locale = getLocaleDefinition(localeCode);
  const faqUrl = buildAbsoluteUrl(getCanonicalPath("faq", localeCode));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${faqUrl}#faq`,
    url: faqUrl,
    inLanguage: localeCode,
    mainEntity: locale.pages.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildStructuredData(pageKey: SitePageKey, localeCode: AppLocaleCode) {
  if (pageKey === "home") {
    return [
      buildOrganizationSchema(localeCode),
      buildWebsiteSchema(localeCode),
      buildWebPageSchema(pageKey, localeCode),
    ];
  }

  if (pageKey === "faq") {
    return [buildWebPageSchema(pageKey, localeCode), buildFaqSchema(localeCode)];
  }

  return [buildWebPageSchema(pageKey, localeCode)];
}

export function buildSitemapEntries() {
  const lastModified = new Date();

  return PUBLIC_SITE_PAGE_KEYS.flatMap((pageKey) => {
    const englishPath = getCanonicalPath(pageKey, "en-US");
    const portuguesePath = getCanonicalPath(pageKey, "pt-BR");

    return [
      {
        url: buildAbsoluteUrl(englishPath),
        lastModified,
        alternates: {
          languages: {
            "en-US": buildAbsoluteUrl(englishPath),
            "pt-BR": buildAbsoluteUrl(portuguesePath),
          },
        },
      },
      {
        url: buildAbsoluteUrl(portuguesePath),
        lastModified,
        alternates: {
          languages: {
            "en-US": buildAbsoluteUrl(englishPath),
            "pt-BR": buildAbsoluteUrl(portuguesePath),
          },
        },
      },
    ];
  });
}
