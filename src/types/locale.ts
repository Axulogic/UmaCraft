export interface LegalSectionItem {
  id: string;
  heading: string;
  body: string;
  points?: string[];
}

export interface LegalSection {
  title: string;
  intro: string;
  updatedAt: string;
  badge?: string;
  items: LegalSectionItem[];
}

export interface DiscordLinkStep {
  id: string;
  title: string;
  description: string;
  tip?: string;
}

export interface PlayNowSlide {
  step: string;
  title: string;
  description: string;
  hint: string;
}

export interface HeroPopupSlide {
  title: string;
  description: string;
  insight: string;
  highlights: string[];
}

export interface HeroGuideSlide {
  step: string;
  title: string;
  description: string;
  checklist: string[];
}

export interface LocaleLinkReference {
  label: string;
  href: string;
}

export interface HubNpcCopy {
  imageId: number;
  roleTitle: string;
  voiceLine: string;
  spotlight: string;
}

export interface LocaleSchema {
  lang: string;
  brand: {
    projectName: string;
    websiteDomain: string;
    serverAddress: string;
    paperVersion: string;
    primaryOrganization: string;
    secondaryOrganization: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
    openGraphTitle: string;
    openGraphDescription: string;
  };
  splash: {
    loadingLabel: string;
    tapToStart: string;
    primaryBrandLabel: string;
    secondaryBrandPrefix: string;
  };
  topbar: {
    serverChipLabel: string;
    downloadModdedLabel: string;
    downloadVanillaLabel: string;
    languageLabel: string;
    logoAlt: string;
    switchToEnglishLabel: string;
    switchToPortugueseLabel: string;
    musicLabel: string;
    volumeLabel: string;
    muteAriaLabel: string;
    unmuteAriaLabel: string;
    serverCopied: string;
    serverCopyError: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    leadLine: string;
    subtitle: string;
    wordmarkSupportLabel: string;
    wordmarkSupportValue: string;
    featureCards: Array<{
      id: string;
      title: string;
      description: string;
    }>;
    socialProofLabel: string;
    socialProofHighlight: string;
    seasonBadge: string;
    seasonStatus: string;
    syncPanelEyebrow: string;
    syncPanelTitle: string;
    syncPanelItems: string[];
    syncPanelStatus: string;
    scrollIndicatorLabel: string;
    featureChips: string[];
    versionBadge: string;
    primaryCta: string;
    officialDiscordCta: string;
    partnerHubCta: string;
    copySuccess: string;
    copyError: string;
    playDialogTitle: string;
    playDialogDescription: string;
    playStepsLabel: string;
    playSteps: Array<{
      id: string;
      title: string;
      description: string;
    }>;
    closeDialog: string;
    protocolOpenLabel: string;
    protocolCloseLabel: string;
    extendedGuideCta: string;
    extendedGuideDescription: string;
    panelHint: string;
    domainLabel: string;
    serverLabel: string;
    guideButtonLabel: string;
    popupSectionLabel: string;
    popupCloseAriaLabel: string;
    popupDotAriaPrefix: string;
    popupSlides: HeroPopupSlide[];
    guideSectionLabel: string;
    guideCloseAriaLabel: string;
    guideVisualLabel: string;
    guideVisualDescription: string;
    guideSlides: HeroGuideSlide[];
  };
  playNow: {
    defaultLabel: string;
    slides: PlayNowSlide[];
    javaCardLabel: string;
    javaCardDescription: string;
    javaRecommendedTag: string;
    bedrockCardLabel: string;
    bedrockCardDescription: string;
    bedrockNotRecommendedTag: string;
    bedrockNotRecommendedTooltip: string;
    connectionDataLabel: string;
    ipLabel: string;
    portLabel: string;
    backToPlatformAriaLabel: string;
    stepDotAriaPrefix: string;
    bedrockCompatibilityHint: string;
    closePopupAriaLabel: string;
  };
  discordLink: {
    title: string;
    intro: string;
    benefitsTitle: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
    requirementsTitle: string;
    requirements: Array<{
      text: string;
      url: string;
    }>;
    stepsTitle: string;
    steps: DiscordLinkStep[];
    warning: string;
    backHome: string;
  };
  pages: {
    loading: {
      label: string;
    };
    notFound: {
      code: string;
      title: string;
      description: string;
      homeCta: string;
      featuresCta: string;
      supportPrefix: string;
      supportLinkLabel: string;
      supportSuffix: string;
    };
    error: {
      title: string;
      description: string;
      retryCta: string;
      homeCta: string;
      supportPrefix: string;
      supportLinkLabel: string;
      supportSuffix: string;
      detailsLabel: string;
      digestLabel: string;
      unhandledEventPrefix: string;
    };
    about: {
      title: string;
      intro: string;
      cards: Array<{
        title: string;
        description: string;
      }>;
      missionTitle: string;
      missionPrefix: string;
      missionHighlight: string;
      missionSuffix: string;
      primaryCta: string;
      secondaryCta: string;
    };
    features: {
      titleLineOne: string;
      titleLineAccent: string;
      intro: string;
      mainFeatures: Array<{
        title: string;
        description: string;
        highlight: string;
      }>;
      systemsTitle: string;
      systemsIntro: string;
      systemSections: Array<{
        category: string;
        items: Array<{
          name: string;
          description: string;
        }>;
      }>;
      roadmapBadge: string;
      roadmapTitle: string;
      roadmapDescription: string;
      primaryCta: string;
      communityCta: string;
    };
    download: {
      warningTitle: string;
      warningDescription: string;
      backHome: string;
      chipLabel: string;
      title: string;
      intro: string;
      filesTitle: string;
      filesDescription: string;
      editionSuffix: string;
      channels: Array<{
        version: string;
        type: string;
        status: string;
        note: string;
      }>;
      installTitle: string;
      installDescription: string;
      installSteps: Array<{
        title: string;
        description: string;
      }>;
      requirementsTitle: string;
      requirements: Array<{
        category: string;
        specs: string[];
      }>;
      helpTitle: string;
      helpDescription: string;
      helpCta: string;
    };
    credits: {
      title: string;
      intro: string;
      serverIdLabel: string;
      partnersTitle: string;
      partnerCta: string;
      thirdPartyTitle: string;
      communityTitle: string;
      communityDescription: string;
      communityCta: string;
      footerPrompt: string;
      footerBackHome: string;
      partners: Array<{
        slug: string;
        name: string;
        serverId: string;
        summary: string;
        impact: string[];
      }>;
      thirdParty: Array<{
        title: string;
        description: string;
        references: LocaleLinkReference[];
      }>;
    };
    faq: {
      title: string;
      intro: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
      stillNeedHelpTitle: string;
      stillNeedHelpDescription: string;
      discordCta: string;
      aboutCta: string;
    };
    changelog: {
      badge: string;
      title: string;
      description: string;
      nextUpdateTitle: string;
      nextUpdateDescription: string;
      formatTitle: string;
      formatDescription: string;
      discordCta: string;
      homeCta: string;
    };
    hub: {
      title: string;
      intro: string;
      summaryTitle: string;
      summaryDescription: string;
      primaryCta: string;
      secondaryCta: string;
      idChipPrefix: string;
      flipToArtAriaPrefix: string;
      flipToSkinAriaPrefix: string;
      minecraftSkinAltPrefix: string;
      voiceVolumeAriaPrefix: string;
      npcCopy: HubNpcCopy[];
    };
  };
  footer: {
    tagline: string;
    joinPrompt: string;
    copyCta: string;
    creditsLine: string;
    links: {
      credits: string;
      terms: string;
      privacy: string;
      about: string;
      features: string;
      download: string;
      faq: string;
      changelog: string;
      hub: string;
      discordLink: string;
    };
    rightsPattern: string;
    rightsSecondaryPattern: string;
    poweredByLabel: string;
    infrastructureProvider: string;
  };
  legal: {
    backHome: string;
    contentsTitle: string;
    metaPanelTitle: string;
    clausesSuffix: string;
    updatedLabel: string;
    enforcementLabel: string;
    revisionNotice: string;
    defaultBadge: string;
    credits: LegalSection;
    terms: LegalSection;
    privacy: LegalSection;
  };
  audio: {
    tapToEnable: string;
    bgmNowPlaying: string;
    mutedState: string;
    unmutedState: string;
  };
}
