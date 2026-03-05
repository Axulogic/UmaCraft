import type { LocaleSchema } from "@/types/locale";

export const enUSLocale: LocaleSchema = {
  lang: "en",
  brand: {
    projectName: "UmaCraft",
    websiteDomain: "umacraft.xyz",
    serverAddress: "play.umacraft.xyz",
    paperVersion: "Paper 1.21+",
    primaryOrganization: "Axulogic",
    secondaryOrganization: "Nomaryth",
  },
  meta: {
    title: "UmaCraft | Official Minecraft Server (Paper 1.21+)",
    description:
      "Official UmaCraft website with direct access to the public Paper 1.21+ server at play.umacraft.xyz.",
    keywords: ["UmaCraft", "Minecraft server", "Paper 1.21+", "play.umacraft.xyz", "umacraft.xyz"],
    openGraphTitle: "UmaCraft | Umamusume Minecraft Server",
    openGraphDescription:
      "Join the official UmaCraft Paper 1.21+ server at play.umacraft.xyz and start your journey with the community.",
  },
  splash: {
    loadingLabel: "Initializing",
    tapToStart: "Tap anywhere to continue",
    primaryBrandLabel: "Axulogic",
    secondaryBrandPrefix: "© Nomaryth",
  },
  topbar: {
    serverChipLabel: "Official IP",
    downloadModdedLabel: "Modded Server",
    downloadVanillaLabel: "Vanilla Server",
    languageLabel: "Language",
    logoAlt: "UmaCraft logo",
    switchToEnglishLabel: "Switch to English",
    switchToPortugueseLabel: "Switch to Portuguese",
    musicLabel: "Background audio",
    volumeLabel: "Volume",
    muteAriaLabel: "Mute music",
    unmuteAriaLabel: "Unmute music",
    serverCopied: "Server address copied.",
    serverCopyError: "Copy failed. Please try again.",
  },
  hero: {
    eyebrow: "Please do not leave floating trees behind.",
    title: "UmaCraft",
    leadLine: "Players from everywhere, across different platforms, with one shared goal",
    subtitle:
      "You are never alone here. There is always someone online, always conversation in chat, and always something new to explore.",
    wordmarkSupportLabel: "Community open worldwide",
    wordmarkSupportValue: "Java + Bedrock crossplay",
    featureCards: [
      {
        id: "jukebox",
        title: "Vanilla+Plugins",
        description:
          "Crates, custom UI, economy, cosmetics, tags, quests, jobs, factories, lottery, arena with envoys, skills, rewards and more.",
      },
      {
        id: "mascots",
        title: "Tachyon Lab Sync",
        description:
          "Economy is linked with the Agnes Tachyon bot: part of the monies earned becomes in-game cash.",
      },
      {
        id: "modes",
        title: "Modded warming up",
        description:
          "Vanilla+Plugins is already open to everyone. The Modded version comes later with stronger Umamusume focus.",
      },
    ],
    socialProofLabel: "New server, new people, new chaos.",
    socialProofHighlight: "What could go wrong?",
    seasonBadge: "Season 1 in progress",
    seasonStatus: "1.21.x+ (1.21.4 recommended)",
    syncPanelEyebrow: "Quick information",
    syncPanelTitle: "Direct summary for new arrivals",
    syncPanelItems: [
      "100% English server with multilingual community",
      "Java and Bedrock share the same progress",
      "Vanilla+Plugins online now | Modded on roadmap",
    ],
    syncPanelStatus: "Online and stable",
    scrollIndicatorLabel: "Scroll for official links",
    featureChips: [
      "First public Umamusume server",
      "Java + Bedrock crossplay",
      "1.21.x+ (1.21.4 recommended)",
    ],
    versionBadge: "1.21.x+",
    primaryCta: "Start now",
    officialDiscordCta: "Official Discord",
    partnerHubCta: "Community hubs",
    copySuccess: "IP copied. Paste it into Multiplayer to join.",
    copyError: "Copy failed. Use play.umacraft.xyz manually.",
    playDialogTitle: "Quick entry",
    playDialogDescription: "From launcher to first login in a few steps.",
    playStepsLabel: "Step by step",
    playSteps: [
      {
        id: "launch",
        title: "Open Minecraft",
        description: "Use version 1.21.x or newer. Version 1.21.4 is the most stable.",
      },
      {
        id: "address",
        title: "Add server address",
        description: "In Multiplayer, create an entry and use play.umacraft.xyz.",
      },
      {
        id: "join",
        title: "Join and verify",
        description:
          "Join the server, complete DiscordSRV verification when requested, and access will be granted.",
      },
    ],
    closeDialog: "Close",
    protocolOpenLabel: "Show walkthrough",
    protocolCloseLabel: "Hide walkthrough",
    extendedGuideCta: "DiscordSRV verification guide",
    extendedGuideDescription:
      "On first access, linking Discord and Minecraft may be required to unlock full gameplay.",
    panelHint: "Everything you need to join is on this page.",
    domainLabel: "Domain",
    serverLabel: "Server",
    guideButtonLabel: "Guide",
    popupSectionLabel: "Server details",
    popupCloseAriaLabel: "Close popup",
    popupDotAriaPrefix: "Go to popup",
    popupSlides: [
      {
        title: "What will you find?",
        description:
          "This is the main server mode today: join, progress, and take part in activities without complex setup.",
        insight: "Start here to learn the server at your own pace.",
        highlights: [
          "Quests, jobs and economy systems for steady progression",
          "Events, arena and recurring rewards to keep momentum high",
          "Customization with cosmetics, tags and community extras",
        ],
      },
      {
        title: "Tachyon Lab Sync",
        description:
          "Cross-platform economy link: part of monies earned in Agnes Tachyon can become server cash.",
        insight: "Your economic progress stays connected between Discord and Minecraft.",
        highlights: [
          "Part of values earned in Agnes Tachyon is credited in-game",
          "More consistent and practical economy flow",
          "Better continuity for players active in community events",
        ],
      },
      {
        title: "Tracks coming soon",
        description:
          "Current focus is Vanilla+Plugins for broad accessibility. Modded comes next with stronger Umamusume focus.",
        insight: "Play vanilla now and follow the evolution toward modded later.",
        highlights: [
          "Vanilla+Plugins remains the main entry point",
          "Modded roadmap focused on themed experience",
          "Phased rollout to preserve stability and continuity",
        ],
      },
      {
        title: "Quick summary",
        description:
          "Before connecting, here are the key points so you do not waste time on wrong setup.",
        insight: "Fast checklist to join and play.",
        highlights: [
          "100% English server with multilingual community",
          "Java + Bedrock crossplay in the same environment",
          "First public server open to the Umamusume community",
        ],
      },
    ],
    guideSectionLabel: "Quick start guide",
    guideCloseAriaLabel: "Close guide",
    guideVisualLabel: "Visual demo",
    guideVisualDescription:
      "Demonstration panel for the current step. Use the carousel to view the next instructions.",
    guideSlides: [
      {
        step: "Step 1",
        title: "Pick the correct version",
        description:
          "Choose a compatible version between 1.21 and 1.21.10. For better stability and fewer plugins/connection issues, we strongly recommend using a version between 1.21.4 and 1.21.8.",
        checklist: [
          "Compatible: 1.21 to 1.21.10",
          "Recommended: 1.21.4 to 1.21.8 (most stable)",
          "Avoid snapshots/experimental builds for this server",
        ],
      },
      {
        step: "Step 2",
        title: "Open Multiplayer",
        description:
          "With Minecraft open, go to the main menu and select Multiplayer to access the server list screen.",
        checklist: [
          "Launch the game with the version chosen in Step 1",
          "Click Multiplayer on the main menu",
          "Wait for the server list screen to fully load",
        ],
      },
      {
        step: "Step 3",
        title: "Click Add Server",
        description:
          "On the server list screen, select Add Server to create the UmaCraft server entry manually.",
        checklist: [
          "Use the Add Server button",
          "This opens Name, Address, and Resource Pack options",
          "Fill them in on the next step",
        ],
      },
      {
        step: "Step 4",
        title: "Fill in server details",
        description:
          "Server Name is optional (UmaCraft is fine). For Server Address, enter play.umacraft.xyz. For Resource Packs, keep it set to Yes for the best visual and compatibility experience.",
        checklist: [
          "Server Name: UmaCraft (optional)",
          "Server Address: play.umacraft.xyz",
          "Resource Packs: Yes (recommended)",
        ],
      },
      {
        step: "Final Step",
        title: "Join and enjoy",
        description:
          "Save the entry, select the UmaCraft server from your list, then click Join Server to start playing.",
        checklist: [
          "Select UmaCraft in your server list",
          "Click Join Server",
          "Enjoy your experience",
        ],
      },
    ],
  },
  playNow: {
    defaultLabel: "Play now",
    slides: [
      {
        step: "Step 1",
        title: "Choose your platform",
        description: "Select how you play to see the right connection details.",
        hint: "You can go back and switch platform anytime.",
      },
      {
        step: "Java",
        title: "Connect on Java",
        description: "Open Multiplayer and add the server with the details below.",
        hint: "Recommended version: Java 1.21.4 or newer.",
      },
      {
        step: "Bedrock",
        title: "Connect on Bedrock",
        description: "Use the same IP with the dedicated port.",
        hint: "The Bedrock platform may have compatibility issues.",
      },
    ],
    javaCardLabel: "Java",
    javaCardDescription: "Show Java connection details.",
    javaRecommendedTag: "Recommended",
    bedrockCardLabel: "Bedrock",
    bedrockCardDescription: "Show Bedrock connection details.",
    bedrockNotRecommendedTag: "Not recommended",
    bedrockNotRecommendedTooltip: "UI compatibility issue.",
    connectionDataLabel: "Connection details",
    ipLabel: "IP",
    portLabel: "Port",
    backToPlatformAriaLabel: "Back to platform selector",
    stepDotAriaPrefix: "Go to step",
    bedrockCompatibilityHint: "Use the latest Bedrock version for best compatibility.",
    closePopupAriaLabel: "Close Play popup",
  },
  pages: {
    loading: {
      label: "Loading...",
    },
    notFound: {
      code: "404",
      title: "Page not found",
      description: "Sorry, the page you are looking for does not exist or has been moved.",
      homeCta: "Go home",
      featuresCta: "Explore features",
      supportPrefix: "If you believe this is an error, ",
      supportLinkLabel: "contact support",
      supportSuffix: ".",
    },
    error: {
      title: "Something went wrong",
      description: "We encountered an unexpected error. Our team has been notified.",
      retryCta: "Try again",
      homeCta: "Go home",
      supportPrefix: "If this problem persists, please ",
      supportLinkLabel: "contact our support team",
      supportSuffix: " with the details below:",
      detailsLabel: "Error details",
      digestLabel: "Digest",
      unhandledEventPrefix: "Unhandled browser event",
    },
    about: {
      title: "About UmaCraft",
      intro:
        "UmaCraft was born with a clear mission: become the main Minecraft meeting point for the Umamusume community, combining survival roots with themed systems and progression.",
      cards: [
        {
          title: "Built by fans, for fans",
          description:
            "Crafted with care to deliver a faithful experience, preserving the details the Umamusume community loves.",
        },
        {
          title: "Solid infrastructure",
          description:
            "Server focused on stability and performance, with secure account flow and room to scale.",
        },
        {
          title: "United community",
          description:
            "It is not only about playing together, but about building connections with players from everywhere.",
        },
      ],
      missionTitle: "Our mission",
      missionPrefix: "We want to go beyond a simple Minecraft server and provide a ",
      missionHighlight: "fun, immersive and welcoming refuge",
      missionSuffix:
        ", with balanced economy, cosmetics integration, daily progression and Java/Bedrock crossplay.",
      primaryCta: "I want to play now",
      secondaryCta: "Explore the systems",
    },
    features: {
      titleLineOne: "Discover everything you can",
      titleLineAccent: "do in our world",
      intro:
        "A server that keeps survival charming, now enhanced with practical systems for progression, convenience and style.",
      mainFeatures: [
        {
          title: "Global community",
          description:
            "A welcoming server for players from many regions and languages, all sharing one race track.",
          highlight: "Diversity",
        },
        {
          title: "Java & Bedrock",
          description: "Full crossplay support for PC, console and mobile players.",
          highlight: "Crossplay",
        },
        {
          title: "Pioneering focus",
          description:
            "A strictly public server focused on Umamusume-inspired identity and community gameplay.",
          highlight: "Exclusive",
        },
      ],
      systemsTitle: "Gameplay systems",
      systemsIntro: "Mechanics designed to respect your time while rewarding consistency.",
      systemSections: [
        {
          category: "Economy and achievements",
          items: [
            { name: "Integrated economy", description: "Earn and spend with connected balance systems." },
            { name: "Discord sync", description: "Part of Agnes Tachyon bot earnings can become server cash." },
            { name: "Daily rewards", description: "Talk to spawn Uma and claim recurring rewards." },
            { name: "Gacha lottery", description: "Try your luck for cosmetics and rare items." },
          ],
        },
        {
          category: "Progression",
          items: [
            { name: "Skill system", description: "Unlock abilities while hunting, mining and farming." },
            { name: "Jobs and professions", description: "Choose a profession path for stable income." },
            { name: "Social skins", description: "Customize your presence with identity-focused visuals." },
            { name: "Special tags", description: "Show titles above your name to represent your profile." },
          ],
        },
        {
          category: "Exploration and combat",
          items: [
            { name: "Interactive quests", description: "Advance through missions with meaningful progression." },
            { name: "PvP arena", description: "Train combat and challenge rivals in organized fights." },
            { name: "Envoy events", description: "Timed drops with strong loot opportunities." },
            { name: "Custom crates", description: "Collect keys and roll for valuable rewards." },
          ],
        },
        {
          category: "Utility systems",
          items: [
            { name: "Unique UI", description: "Refined menus for clearer and smoother navigation." },
            { name: "Factories and machines", description: "Scale automated production with less micromanagement." },
            { name: "Tool skins", description: "Give your tools visual identity beyond vanilla style." },
            { name: "Player auctions", description: "Trade items with a dynamic auction system." },
          ],
        },
      ],
      roadmapBadge: "Continuous development",
      roadmapTitle: "The journey has just begun",
      roadmapDescription:
        "Vanilla+Plugins is already live, and a themed Modded phase is planned for future milestones.",
      primaryCta: "Join the server",
      communityCta: "Join community",
    },
    download: {
      warningTitle: "Modded access in preparation",
      warningDescription:
        "The Modded server is temporarily locked while we complete technical and balance adjustments. Our current priority is building a solid player base in the live environment so Modded can launch with stability and consistent progression from day one. This mods page exists to automate and simplify installing the required files once the official release is announced.",
      backHome: "Back to home",
      chipLabel: "Download & Access",
      title: "Get ready to play",
      intro:
        "Official packages are being finalized to improve your server experience. Distribution is under final review.",
      filesTitle: "Official files",
      filesDescription: "Official packages are in final review and will be released soon.",
      editionSuffix: "Edition",
      channels: [
        {
          version: "v1.0.0",
          type: "Forge",
          status: "Under construction",
          note: "Distribution is temporarily paused while we finalize setup adjustments.",
        },
        {
          version: "v1.0.0",
          type: "Fabric",
          status: "Under construction",
          note: "The official package returns as soon as final setup approval is complete.",
        },
      ],
      installTitle: "How to install",
      installDescription: "Follow these simple steps to join with everything configured.",
      installSteps: [
        { title: "Install Minecraft", description: "Use Java Edition 1.20 or newer." },
        { title: "Prepare modloader", description: "Forge is recommended for the best compatibility." },
        { title: "Move file to folder", description: "Place the downloaded .jar into .minecraft/mods." },
        { title: "Enjoy", description: "Launch with Forge/Fabric profile, add the IP and play." },
      ],
      requirementsTitle: "Requirements",
      requirements: [
        {
          category: "Minimum requirements",
          specs: [
            "Minecraft Java Edition 1.20+",
            "Forge 47.1.0+ or Fabric 0.14.21+",
            "Java 17 or newer",
            "2GB available RAM",
            "Stable internet connection",
          ],
        },
        {
          category: "Recommended requirements",
          specs: [
            "Minecraft Java Edition 1.21+",
            "Forge 49.0.0+ or Fabric 0.15.0+",
            "Java 21 or newer",
            "4GB available RAM",
            "Broadband connection",
          ],
        },
      ],
      helpTitle: "Need help?",
      helpDescription: "If anything fails, our staff and community are available on Discord.",
      helpCta: "Get support on Discord",
    },
    credits: {
      title: "No race is won alone",
      intro:
        "This page recognizes everyone helping UmaCraft exist: partner communities, tools and third-party projects.",
      serverIdLabel: "ID",
      partnersTitle: "Partner communities",
      partnerCta: "View partnership",
      thirdPartyTitle: "Third-party credits",
      communityTitle: "Main community",
      communityDescription: "Join the official Discord for announcements, updates and support.",
      communityCta: "Open",
      footerPrompt: "Done exploring this page?",
      footerBackHome: "Back to home",
      partners: [
        {
          slug: "umabr",
          name: "Umamusume BR!",
          serverId: "1425906852612538511",
          summary:
            "Official partner for community outreach, with collaborative events and coordinated growth.",
          impact: [
            "Active promotion of seasonal content in partner channels.",
            "Friendly onboarding support for new players.",
            "Joint Minecraft event planning.",
          ],
        },
      ],
      thirdParty: [
        {
          title: "Cygames, Inc",
          description:
            "Umamusume Pretty Derby universe, characters and official assets belong to Cygames, Inc.",
          references: [
            { label: "Cygames, Inc", href: "https://www.cygames.co.jp/en/" },
            { label: "Umamusume Pretty Derby", href: "https://umamusume.jp/" },
          ],
        },
        {
          title: "Next.js, shadcn/ui and Tailwind CSS",
          description:
            "Technical base used to build web interface, components and styling system.",
          references: [
            { label: "Next.js", href: "https://nextjs.org/" },
            { label: "shadcn/ui", href: "https://ui.shadcn.com/" },
            { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
          ],
        },
        {
          title: "Pixabay (NomaBeats)",
          description: "Ambient soundtrack used on the website with proper artist credit.",
          references: [
            { label: "Pixabay", href: "https://pixabay.com/" },
            { label: "NomaBeats", href: "https://pixabay.com/users/nomabeats-17085827/" },
          ],
        },
        {
          title: "PlanetMinecraft",
          description: "Credits for resources and skins used by the project.",
          references: [
            { label: "Taz", href: "https://www.planetminecraft.com/member/taz/" },
            { label: "Urben", href: "https://www.planetminecraft.com/member/urben/" },
            { label: "Phoenix_Furutaka", href: "https://www.planetminecraft.com/member/phoenix_furutaka/" },
            { label: "Skye_PC", href: "https://www.planetminecraft.com/member/skye_pc/" },
            { label: "_Zel_", href: "https://www.planetminecraft.com/member/_zel_/" },
            { label: "KakoytKit", href: "https://www.planetminecraft.com/member/kakoytkit/" },
            { label: "kewpie", href: "https://www.planetminecraft.com/member/kewpie/" },
            { label: "DrinkableTechyon", href: "https://www.planetminecraft.com/member/drinkabletechyon/" },
            { label: "occipitalfella", href: "https://www.planetminecraft.com/member/occipitalfella/" },
          ],
        },
        {
          title: "UmaViewer (katboi01)",
          description:
            "Reference project used for Umamusume asset access and inspection during visual mapping.",
          references: [
            { label: "UmaViewer repository", href: "https://github.com/katboi01/UmaViewer" },
            { label: "katboi01", href: "https://github.com/katboi01" },
          ],
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      intro: "Everything below reflects the current live environment and official support flow.",
      items: [
        {
          question: "What is UmaCraft today?",
          answer:
            "UmaCraft is a live Umamusume-themed Minecraft server focused on long-term progression, community events, and quality-of-life systems. The current production environment is Vanilla+Plugins, with crossplay and regular balancing updates.",
        },
        {
          question: "Do I need a modpack to play?",
          answer:
            "No for the current main server. You can join without a mandatory modpack. If optional packages are released later, they will be listed in the official Download page with full instructions.",
        },
        {
          question: "Can Java and Bedrock play together?",
          answer:
            "Yes. Java and Bedrock are configured for crossplay in the same public environment. Some UI features can differ by platform, but progression and core gameplay remain shared.",
        },
        {
          question: "What version is recommended?",
          answer:
            "For Java, use 1.21.4 or newer (1.21.4 to 1.21.8 is currently the most stable range). For Bedrock, keep your client updated to the latest available version.",
        },
        {
          question: "Can original and non-original launchers connect?",
          answer:
            "Yes. Both can connect as long as server rules and verification/security requirements are respected. Any abuse, impersonation or bypass attempts may result in moderation action.",
        },
        {
          question: "How do I connect quickly?",
          answer:
            "Use the Play flow on the home page, choose your platform, then add the server address `play.umacraft.xyz`. For Bedrock, include port `19132`.",
        },
        {
          question: "Are downloads available now?",
          answer:
            "Not fully yet. The Download area may show preparation status while packages go through final stability, integrity and compatibility validation before release.",
        },
        {
          question: "Is there an active exclusive jukebox mod right now?",
          answer:
            "Not in current production scope. The active priority is a stable live server with complete website/documentation flow. Any exclusive content rollout will be announced through official channels.",
        },
        {
          question: "Where do I get support?",
          answer:
            "Official Discord is the primary support channel. For faster handling, include your username, platform/version, what happened, and reproduction steps (plus screenshots if available).",
        },
      ],
      stillNeedHelpTitle: "Still have questions?",
      stillNeedHelpDescription:
        "Our staff and community respond through the official Discord. Open a support request with clear details so we can resolve it quickly.",
      discordCta: "Join Discord",
      aboutCta: "About project",
    },
    changelog: {
      badge: "Under construction",
      title: "Changelog in preparation",
      description:
        "We are reorganizing update history to publish only real and verified information.",
      nextUpdateTitle: "Next update",
      nextUpdateDescription: "Public timeline with date and scope.",
      formatTitle: "New format",
      formatDescription: "Short, objective entries with no fictional changelog.",
      discordCta: "Follow on Discord",
      homeCta: "Back to home",
    },
    hub: {
      title: "Uma everywhere, but the center of everything is here.",
      intro: "Something curious may happen if you hover, or even click them. Be careful.",
      summaryTitle: "All Umamusume in one place",
      summaryDescription: "Use the cards above to quickly find which NPC handles each server need.",
      primaryCta: "Join the server",
      secondaryCta: "View features",
      idChipPrefix: "ID",
      flipToArtAriaPrefix: "Return to artwork of ",
      flipToSkinAriaPrefix: "Show Minecraft skin of ",
      minecraftSkinAltPrefix: "Minecraft skin of ",
      voiceVolumeAriaPrefix: "Voice volume for character ",
      npcCopy: [
        {
          imageId: 1002,
          roleTitle: "Skill trainer",
          voiceLine: "Learn each skill well. When you master your own style, you never need to look back.",
          spotlight:
            "Skill tree to shape your playstyle and get the most out of every situation.",
        },
        {
          imageId: 1003,
          roleTitle: "Economy captain",
          voiceLine:
            "Listen up! With the right coins, every dream gets closer. I know that better than anyone.",
          spotlight:
            "Coinshop is where your progress turns into items that really matter on your journey.",
        },
        {
          imageId: 1007,
          roleTitle: "No-boring commerce",
          voiceLine: "Look around, buy things, regret things. I will still be here anyway.",
          spotlight:
            "Main server shop. Everything you need to build your setup, test strategies and keep moving.",
        },
        {
          imageId: 1008,
          roleTitle: "Toolskin mechanic",
          voiceLine:
            "Great gear is essential. Great gear with personal style? That is real cool.",
          spotlight:
            "Toolskins to customize your tools and give every piece your own identity.",
        },
        {
          imageId: 1015,
          roleTitle: "Ranking narrator",
          voiceLine:
            "All spotlights fall on those who reach the top. Come on, let me narrate your rise.",
          spotlight:
            "Leaderboards highlighting the best in economy, combat and production. Your name can be here.",
        },
        {
          imageId: 1017,
          roleTitle: "Quest conductor",
          voiceLine: "A quest is more than a task. It is the path that defines who you become.",
          spotlight:
            "Main server quests with narrative, progression and achievements that build your story.",
        },
        {
          imageId: 1021,
          roleTitle: "Kit commander",
          voiceLine: "I never start a race unprepared! Grab the right kit and get ahead.",
          spotlight:
            "Kits to jump into action fast, test strategies and avoid wasting time at the start.",
        },
        {
          imageId: 1024,
          roleTitle: "Job recruiter",
          voiceLine:
            "Every job has style if you put real energy into it! Come on, do not stand still.",
          spotlight:
            "Pick your job, level your career and secure steady income for everything you want to do.",
        },
        {
          imageId: 1025,
          roleTitle: "Level analyst",
          voiceLine:
            "...You have grown. She noticed too. Keep advancing, toward where only you can reach.",
          spotlight:
            "Levels panel with your progress, goals and the path still ahead.",
        },
        {
          imageId: 1026,
          roleTitle: "Line engineer",
          voiceLine:
            "Request processing. Factories optimized for scalable production. Awaiting command.",
          spotlight:
            "Factory system for automation, production chains and efficient resource generation.",
        },
        {
          imageId: 1032,
          roleTitle: "Strategic support",
          voiceLine:
            "Questions? Excellent. A mind that questions is a mind that evolves. Let us dissect this together.",
          spotlight:
            "Help center with guidance for systems, commands and first steps in the server.",
        },
        {
          imageId: 1038,
          roleTitle: "Lottery lady",
          voiceLine:
            "Hm. Luck does not pick who is cute... but it definitely helps. Take your chance.",
          spotlight:
            "Lottery with seasonal prizes, special rewards and that surprise factor nobody forgets.",
        },
        {
          imageId: 1049,
          roleTitle: "Reward master",
          voiceLine: "Objective completed? Then claim your reward. No ceremony needed.",
          spotlight:
            "Reward claims and progression tracking: simple, direct and no hassle.",
        },
        {
          imageId: 1052,
          roleTitle: "Destination host",
          voiceLine:
            "Want to visit amazing places built by other players? I can take you there!",
          spotlight:
            "Player warps to visit bases, shops and builds created by the community.",
        },
        {
          imageId: 1062,
          roleTitle: "Shortcut guide",
          voiceLine:
            "I know the way! Or... almost. But this time I will not miss, trust me!",
          spotlight:
            "Warps for farms, city, events and key server points. Arrive in seconds.",
        },
        {
          imageId: 1065,
          roleTitle: "Visual director",
          voiceLine:
            "Boring is forbidden here! If you show up on the server, show up with style!",
          spotlight:
            "Cosmetics to build your visual identity, social skins and a memorable presence.",
        },
        {
          imageId: 1097,
          roleTitle: "Tag curator",
          voiceLine:
            "A tag says more than you imagine... choose carefully what others should see.",
          spotlight:
            "Tags to define your public identity in chat, in the hub and across server groups.",
        },
        {
          imageId: 1119,
          roleTitle: "Routine guide",
          voiceLine:
            "Every great journey starts with a daily step. Shall I help you prepare?",
          spotlight:
            "Daily quests to maintain consistency, gather resources and unlock long-term bonuses.",
        },
        {
          imageId: 1135,
          roleTitle: "Official auctioneer",
          voiceLine:
            "Every good story starts with a bet. What are you putting on the line today?",
          spotlight:
            "Auction to sell rarities, bid on lots and keep the server economy moving.",
        },
      ],
    },
  },
  discordLink: {
    title: "Discord Account Linking",
    intro: "Discord linking is no longer mandatory, but opting in brings strong benefits focused on economy sync and account support.",
    benefitsTitle: "Why you should link",
    benefits: [
      {
        title: "Tachyon Lab Sync",
        description: "Monies earned on the Agnes Tachyon bot in Discord will become cash for your player balance in the Minecraft server."
      },
      {
        title: "Immediate Support",
        description: "Allows better and faster support for any account-related issues or requests."
      }
    ],
    requirementsTitle: "Official Servers",
    requirements: [
      {
        text: "Tachyon Bistro - Official",
        url: "https://discord.gg/QyTvmTaC9G"
      },
      {
        text: "Umamusume Br! (Partner)",
        url: "https://discord.gg/u6ddFNgQY3"
      }
    ],
    stepsTitle: "How to link (Step by Step)",
    steps: [
      {
        id: "step-1",
        title: "Generate the code in-game",
        description: "After joining the Minecraft server, type the command /discordlink in the chat."
      },
      {
        id: "step-2",
        title: "Copy your code",
        description: "When you run the command, a message will appear in your chat containing your unique linking code."
      },
      {
        id: "step-3",
        title: "Send it to the bot's DM",
        description: "Copy that code and send it ONLY to the UmaCraft bot's DM (Direct Message). Remember, you must be in one of the approved official servers listed above!",
        tip: "Only the UmaCraft bot DM accepts the code."
      },
      {
        id: "step-4",
        title: "All done!",
        description: "If the code is valid, a completion message will appear both in the server for you and in the bot's DM."
      }
    ],
    warning: "For your safety, never share your code in public channels or with other people. Send it strictly to the UmaCraft bot.",
    backHome: "Back to home",
  },
  footer: {
    tagline: "Official UmaCraft website.",
    joinPrompt: "Ready to join?",
    copyCta: "Copy server IP",
    creditsLine: "Community credits and third-party acknowledgements.",
    cookiePreferencesLabel: "Cookie Preferences",
    links: {
      credits: "Credits",
      terms: "Terms",
      privacy: "Privacy",
      about: "About",
      features: "Features",
      download: "Download",
      faq: "FAQ",
      changelog: "Changelog",
      hub: "Hub",
      discordLink: "Linking",
    },
    rightsPattern: "{year} Axulogic. All rights reserved.",
    rightsSecondaryPattern: "Umamusume Pretty Derby and official assets are owned by Cygames, Inc.",
    poweredByLabel: "Powered by",
    infrastructureProvider: "Cloudflare",
  },
  cookieConsent: {
    title: "Your Cookie Options",
    description:
      "We use cookie categories to keep the website secure, functional and continuously improved. You can choose which categories to allow.",
    policyCta: "Cookie and Privacy Policy",
    policyHref: "/privacy",
    manageTitle: "Manage Consent Preferences",
    strictlyNecessaryLabel: "Strictly Necessary Cookies",
    alwaysActiveLabel: "Always Active",
    functionalLabel: "Functional Cookies",
    performanceLabel: "Performance Cookies",
    targetingLabel: "Targeting Cookies",
    rejectAllCta: "Reject Optional",
    confirmChoicesCta: "Confirm My Choices",
    closeAriaLabel: "Close cookie preferences",
    poweredByLabel: "Powered by UmaCraft",
  },
  legal: {
    backHome: "Back to home",
    contentsTitle: "Document Contents",
    metaPanelTitle: "Document metadata",
    clausesSuffix: "sections",
    updatedLabel: "Last update",
    enforcementLabel: "Enforcement scope",
    revisionNotice:
      "Policies can evolve with gameplay, moderation, compliance and infrastructure changes.",
    defaultBadge: "Policy document",
    credits: {
      title: "Community Recommendations & Content Credits",
      intro:
        "This section highlights partner communities and gives proper credit to third-party resources that support UmaCraft presentation and operations.",
      updatedAt: "February 13, 2026",
      badge: "Community & Attribution",
      items: [
        {
          id: "partner-communities",
          heading: "Partner communities",
          body: "Partner communities aligned with healthy multiplayer culture and fair moderation.",
          points: [
            "Survival-focused servers with transparent rules and active moderation.",
            "Builder and resource-pack communities with clear usage licensing.",
            "Discord communities with onboarding channels for new Java players.",
          ],
        },
        {
          id: "third-party-assets",
          heading: "Third-party media and assets",
          body: "External assets used on website or communication channels are credited and reviewed before publishing.",
          points: [
            "Music tracks for onboarding and ambient website experience.",
            "Open iconography and visual elements with compatible licensing.",
            "Typography and interface tools obtained from licensed providers.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      intro:
        "These terms govern the full UmaCraft platform, including the website, Minecraft servers, Discord communities and support channels. The website is an operational extension of the Minecraft service and follows the same governance.",
      updatedAt: "March 2, 2026",
      badge: "Platform Governance",
      items: [
        {
          id: "platform-scope",
          heading: "Platform scope and acceptance",
          body: "By using UmaCraft, you agree to these terms across all official surfaces, including website pages, server gameplay, Discord channels and support flow.",
          points: [
            "Website actions that affect account, economy, linking or support are treated as platform actions.",
            "Unofficial mirrors, fake communities and impersonation domains are not part of UmaCraft.",
            "If you disagree with these terms, do not use the service.",
          ],
        },
        {
          id: "accounts-and-access",
          heading: "Accounts, identity and access",
          body: "You are responsible for activity under your Minecraft and Discord identities when they interact with UmaCraft systems.",
          points: [
            "Keep credentials secure and do not share or sell accounts.",
            "Identity spoofing, verification bypass or forged linking flow is prohibited.",
            "Support can request ownership verification before account changes, appeals or recovery.",
          ],
        },
        {
          id: "conduct-and-fair-play",
          heading: "Conduct and fair play",
          body: "Community health and fair progression are mandatory in chat, gameplay, economy and official social channels.",
          points: [
            "Respect moderators, players and event instructions.",
            "Harassment, hate speech, threats, scams and targeted disruption are prohibited.",
            "Cheats, harmful automation, bug abuse, dupes or economy manipulation can lead to immediate penalties.",
          ],
        },
        {
          id: "economy-and-virtual-items",
          heading: "Economy, rewards and virtual items",
          body: "In-game currency, ranks, cosmetics, tags, rewards and progression items are platform licenses, not real-world property.",
          points: [
            "Balances and rewards can be adjusted when needed to preserve fairness and technical integrity.",
            "Cross-platform sync features can be paused or recalibrated during incidents, exploits or maintenance.",
            "Refunds or compensation are evaluated case by case under abuse and loss-prevention policy.",
          ],
        },
        {
          id: "integrations-and-third-parties",
          heading: "Integrations and third-party services",
          body: "UmaCraft may depend on third-party platforms such as Discord, hosting providers and infrastructure tools.",
          points: [
            "Third-party outages or policy changes can impact service behavior without prior notice.",
            "External links and partner communities have their own terms and moderation policies.",
            "Use official links published on umacraft.xyz and official Discord only.",
          ],
        },
        {
          id: "moderation-and-enforcement",
          heading: "Moderation and enforcement",
          body: "Moderation decisions are based on logs, contextual evidence and server safety criteria.",
          points: [
            "Actions include warning, mute, rollback, temporary suspension or permanent ban.",
            "Serious violations can trigger immediate enforcement without progressive warnings.",
            "Appeals are accepted through official support and may require additional verification.",
          ],
        },
        {
          id: "availability-and-changes",
          heading: "Availability, updates and policy changes",
          body: "Features, pages, commands, integrations and server rules can evolve as the project expands.",
          points: [
            "Maintenance, balancing or emergency response may temporarily limit access.",
            "Rules and systems may change to keep gameplay stable, fair and secure.",
            "Latest published version supersedes previous policy text.",
          ],
        },
        {
          id: "intellectual-property-and-liability",
          heading: "Intellectual property and limitation of liability",
          body: "UmaCraft branding, custom systems and original website content are protected. Official franchise assets remain owned by their respective rights holders.",
          points: [
            "Do not reproduce or commercialize UmaCraft identity, systems or media without authorization.",
            "Service is provided as-is and may experience interruptions, bugs or balance changes.",
            "To the maximum extent allowed by law, liability is limited to operation and moderation scope of the platform.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        "This policy explains how UmaCraft collects, uses and protects data across the full platform, including website interactions, Minecraft gameplay and official Discord-linked features.",
      updatedAt: "March 2, 2026",
      badge: "Data & Privacy",
      items: [
        {
          id: "data-collected",
          heading: "Data we collect",
          body: "We collect only data required to operate the platform safely and provide gameplay, account and support functions.",
          points: [
            "Account and identity data: Minecraft UUID, username history and Discord link metadata.",
            "Gameplay and moderation data: commands, economy events, progression signals and incident logs.",
            "Website and technical data: browser/device diagnostics, request metadata and anti-abuse telemetry.",
          ],
        },
        {
          id: "collection-sources",
          heading: "How data is collected",
          body: "Data is collected when you access official pages, connect to the server, link accounts or request support.",
          points: [
            "Directly from user actions during gameplay, website usage and support requests.",
            "Automatically from platform logs and security instrumentation.",
            "From official integrations required for account linking and moderation continuity.",
          ],
        },
        {
          id: "data-usage",
          heading: "Why data is used",
          body: "Data processing is limited to operational, security and community-management purposes.",
          points: [
            "Authenticate and protect account/session integrity.",
            "Run economy, progression, linking and support workflows.",
            "Detect fraud, abuse, evasion and technical instability.",
          ],
        },
        {
          id: "retention-and-minimization",
          heading: "Retention and minimization",
          body: "We keep data only as long as needed for operation, security, moderation history and legal-compliance duties.",
          points: [
            "Operational and moderation logs may be retained for incident analysis and appeals.",
            "Data no longer required may be removed, anonymized or aggregated.",
            "Retention windows can vary by risk, abuse-prevention and infrastructure requirements.",
          ],
        },
        {
          id: "sharing-and-processors",
          heading: "Sharing and service providers",
          body: "Data can be processed by trusted infrastructure and service providers that support platform operation.",
          points: [
            "We do not sell personal data.",
            "Access is limited to operational, security, moderation and support needs.",
            "Third-party providers process data under contractual and technical safeguards.",
          ],
        },
        {
          id: "security-practices",
          heading: "Security practices",
          body: "We apply reasonable technical and organizational safeguards to reduce unauthorized access, loss and abuse.",
          points: [
            "Access control, logging, environment protections and incident response procedures are used.",
            "No internet service is risk-free; users should also secure their own accounts and devices.",
            "Security incidents are handled with priority and may require temporary feature restrictions.",
          ],
        },
        {
          id: "rights-and-requests",
          heading: "User rights and contact",
          body: "You can request access, correction or deletion review of eligible personal data through official support channels.",
          points: [
            "Requests may require identity verification before processing.",
            "Some records may be retained when required for moderation, abuse prevention or legal obligations.",
            "Official support channels listed on the website are the valid route for privacy requests.",
          ],
        },
        {
          id: "minors-and-guardian-notice",
          heading: "Minors and guardian notice",
          body: "If local law requires parental or guardian authorization for online services, users must obtain it before using UmaCraft.",
          points: [
            "Guardians can contact support about account, privacy or safety concerns.",
            "Accounts may be restricted if eligibility or consent requirements are not met.",
            "Community safety measures apply equally to all players regardless of age.",
          ],
        },
      ],
    },
  },
  audio: {
    tapToEnable: "Tap to enable audio",
    bgmNowPlaying: "nomabeats.mp3",
    mutedState: "Muted",
    unmutedState: "Sound on",
  },
};
