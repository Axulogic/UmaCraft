import type { LocaleSchema } from "@/types/locale";

export const ptBRLocale: LocaleSchema = {
  lang: "pt",
  brand: {
    projectName: "UmaCraft",
    websiteDomain: "umacraft.xyz",
    serverAddress: "play.umacraft.xyz",
    paperVersion: "Paper 1.21+",
    primaryOrganization: "Axulogic",
    secondaryOrganization: "Nomaryth",
  },
  meta: {
    title: "UmaCraft | Servidor Oficial de Minecraft (Paper 1.21+)",
    description:
      "Site oficial do UmaCraft com acesso direto ao servidor público Paper 1.21+ em play.umacraft.xyz.",
    keywords: [
      "UmaCraft",
      "servidor Minecraft",
      "Paper 1.21+",
      "play.umacraft.xyz",
      "umacraft.xyz",
    ],
    openGraphTitle: "UmaCraft | Servidor Oficial",
    openGraphDescription:
      "Entre no servidor oficial Paper 1.21+ do UmaCraft em play.umacraft.xyz e comece sua jornada com a comunidade.",
  },
  splash: {
    loadingLabel: "Inicializando",
    tapToStart: "Toque em qualquer lugar para continuar",
    primaryBrandLabel: "Axulogic",
    secondaryBrandPrefix: "© Nomaryth",
  },
  topbar: {
    serverChipLabel: "IP oficial",
    downloadModdedLabel: "Servidor Modded",
    downloadVanillaLabel: "Servidor Vanilla",
    languageLabel: "Idioma",
    logoAlt: "Logo do UmaCraft",
    switchToEnglishLabel: "Alternar para inglês",
    switchToPortugueseLabel: "Alternar para português",
    musicLabel: "Áudio de fundo",
    volumeLabel: "Volume",
    muteAriaLabel: "Silenciar música",
    unmuteAriaLabel: "Ativar música",
    serverCopied: "Endereço do servidor copiado.",
    serverCopyError: "Falha ao copiar. Tente novamente.",
  },
  hero: {
    eyebrow: "Favor, não deixar as arvores flutuando por ai.",
    title: "UmaCraft",
    leadLine:
      "Jogadores de todo lugar, de várias plataforma, com apenas um objetivo em comum",
    subtitle:
      "Aqui você não joga sozinho. Sempre tem alguém online, sempre tem papo rolando no chat e sempre tem alguma coisa nova pra explorar ou aprontar.",
    wordmarkSupportLabel: "Comunidade livre globalmente",
    wordmarkSupportValue: "Java + Bedrock crossplay",
    featureCards: [
      {
        id: "jukebox",
        title: "Vanilla+Plugins",
        description:
          "Crates, UI custom, economia, cosmetics, tags, quests, jobs, factories, lottery, arena com envoys, skills, rewards e muito mais.",
      },
      {
        id: "mascots",
        title: "Tachyon Lab Sync",
        description:
          "A economia é integrada à bot Agnes Tachyon: parte dos monies recebidos vira cash no servidor.",
      },
      {
        id: "modes",
        title: "Modded em aquecimento",
        description:
          "O Vanilla+Plugins já está aberto para todos. A versão Modded será lançada depois, com foco maior em Uma Musume.",
      },
    ],
    socialProofLabel: "Server novo, galera nova, problemas novos.",
    socialProofHighlight: "Oque pode dar errado?",
    seasonBadge: "Temporada 1 em andamento",
    seasonStatus: "1.21.x+ (1.21.4 recomendado)",
    syncPanelEyebrow: "Informações rápidas",
    syncPanelTitle: "Resumo direto para quem está chegando agora",
    syncPanelItems: [
      "Servidor 100% em inglês, com comunidade de vários idiomas",
      "Java e Bedrock jogam juntos no mesmo progresso",
      "Vanilla+Plugins online agora | Modded no roadmap",
    ],
    syncPanelStatus: "Online e estável",
    scrollIndicatorLabel: "Role para links oficiais",
    featureChips: [
      "Primeiro servidor público Uma Musume",
      "Crossplay Java + Bedrock",
      "1.21.x+ (1.21.4 recomendado)",
    ],
    versionBadge: "1.21.x+",
    primaryCta: "Comecar agora",
    officialDiscordCta: "Discord Oficial",
    partnerHubCta: "Hubs da comunidade",
    copySuccess: "IP copiado. Cole no Multiplayer para entrar no servidor.",
    copyError: "Falha ao copiar. Use play.umacraft.xyz manualmente.",
    playDialogTitle: "Entrada rápida",
    playDialogDescription: "Do launcher ao primeiro login em poucos passos.",
    playStepsLabel: "Passo a passo",
    playSteps: [
      {
        id: "launch",
        title: "Abrir o Minecraft",
        description:
          "Use 1.21.x ou superior. A versão 1.21.4 oferece a experiência mais estável.",
      },
      {
        id: "address",
        title: "Adicionar endereço do servidor",
        description:
          "No Multiplayer, crie uma entrada e use play.umacraft.xyz.",
      },
      {
        id: "join",
        title: "Entrar e verificar",
        description:
          "Conecte no servidor, conclua a verificação DiscordSRV quando solicitada e o acesso será liberado.",
      },
    ],
    closeDialog: "Fechar",
    protocolOpenLabel: "Mostrar passo a passo",
    protocolCloseLabel: "Ocultar passo a passo",
    extendedGuideCta: "Guia de verificação DiscordSRV",
    extendedGuideDescription:
      "No primeiro acesso, o vínculo entre Discord e Minecraft pode ser necessário para liberar o gameplay completo.",
    panelHint: "Tudo o que você precisa para entrar está nesta página.",
    domainLabel: "Domínio",
    serverLabel: "Servidor",
    guideButtonLabel: "Guia",
    popupSectionLabel: "Detalhes do servidor",
    popupCloseAriaLabel: "Fechar popup",
    popupDotAriaPrefix: "Ir para popup",
    popupSlides: [
      {
        title: "Oque voce encontrará?",
        description:
          "Este e o modo principal do servidor hoje: voce entra, evolui e participa de atividades sem precisar configurar nada complexo.",
        insight: "Comece por aqui para aprender o servidor no seu ritmo.",
        highlights: [
          "Missoes, trabalhos e sistema de economia para evoluir aos poucos",
          "Eventos, arena e recompensas frequentes para manter o progresso ativo",
          "Personalizacao com cosmetics, tags e outros extras de comunidade",
        ],
      },
      {
        title: "Tachyon Lab Sync",
        description:
          "A economia conectada entre plataformas: parte dos monies recebidos na Agnes Tachyon podem virar cash no servidor.",
        insight: "Seu progresso economico fica mais conectado entre Discord e Minecraft.",
        highlights: [
          "Parte do valor recebido na Agnes Tachyon é creditado no servidor",
          "Fluxo economico mais consistente e facil",
          "Melhor continuidade para quem participa dos eventos da comunidade",
        ],
      },
      {
        title: "Pistas em Breve",
        description:
          "Hoje o foco esta no Vanilla+Plugins para atender qualquer jogador. A versao Modded vira na sequencia com foco maior em Uma Musume.",
        insight: "Voce entra no vanilla agora e acompanha a evolucao para o modded depois.",
        highlights: [
          "Vanilla+Plugins segue como entrada principal",
          "Roadmap modded focado em experiencia tematica",
          "Evolucao por fases para manter estabilidade e continuidade",
        ],
      },
      {
        title: "Resumão rapido",
        description:
          "Antes de conectar, aqui estao os pontos principais para voce nao perder tempo com configuracao errada.",
        insight: "Checklist rapido para entrar e jogar.",
        highlights: [
          "Servidor 100% em ingles com comunidade multilingual",
          "Crossplay Java + Bedrock no mesmo ambiente",
          "Primeiro servidor publico aberto para a comunidade Uma Musume",
        ],
      },
    ],
    guideSectionLabel: "Guia de entrada",
    guideCloseAriaLabel: "Fechar guia",
    guideVisualLabel: "Demonstracao visual",
    guideVisualDescription:
      "Painel demonstrativo da etapa atual. Toque nos direcionais para ver as proximas instrucoes.",
    guideSlides: [
      {
        step: "Passo 1",
        title: "Escolha a versão correta",
        description:
          "Selecione uma versão compatível entre 1.21 e 1.21.10. Para melhor estabilidade e menos problemas de conexão/plugins, use preferencialmente uma versão recomendada entre 1.21.4 e 1.21.8.",
        checklist: [
          "Compatíveis: 1.21 até 1.21.10",
          "Recomendadas: 1.21.4 até 1.21.8 (mais estáveis)",
          "Evite snapshots/versões experimentais para não quebrar recursos",
        ],
      },
      {
        step: "Passo 2",
        title: "Abra o Multijogador",
        description:
          "Com o Minecraft aberto, entre no menu principal e selecione a opção Multijogador para acessar a lista de servidores.",
        checklist: [
          "Entre com a versão escolhida no Passo 1",
          "No menu principal, clique em Multijogador",
          "Aguarde a tela de servidores carregar completamente",
        ],
      },
      {
        step: "Passo 3",
        title: "Clique em Adicionar servidor",
        description:
          "Na tela de servidores, selecione a opção Adicionar para criar a entrada do UmaCraft manualmente.",
        checklist: [
          "Use o botão Adicionar servidor",
          "Isso abre o formulário com Nome, Endereço e Pacote de recursos",
          "Preencha os campos no próximo passo",
        ],
      },
      {
        step: "Passo 4",
        title: "Preencha os dados do servidor",
        description:
          "No campo Nome, você pode usar algo opcional como UmaCraft. No campo Endereço, use play.umacraft.xyz. Em Pacote de recursos, mantenha preferencialmente marcado como Yes para entrar com melhor experiência visual e de compatibilidade.",
        checklist: [
          "Nome do servidor: UmaCraft (opcional)",
          "Endereço do servidor: play.umacraft.xyz",
          "Pacote de recursos: Yes (recomendado)",
        ],
      },
      {
        step: "Passo Final",
        title: "Entrar e aproveitar",
        description:
          "Salve, selecione o servidor UmaCraft na lista e clique em Entrar no servidor para começar sua jornada.",
        checklist: [
          "Selecionar o servidor na lista",
          "Clicar em Entrar no servidor",
          "Aproveitar o UmaCraft",
        ],
      },
    ],
  },
  playNow: {
    defaultLabel: "Jogar agora",
    slides: [
      {
        step: "Passo 1",
        title: "Escolha sua plataforma",
        description: "Selecione como você joga para ver os dados certos de conexão.",
        hint: "Você pode voltar e trocar de plataforma quando quiser.",
      },
      {
        step: "Java",
        title: "Conectar no Java",
        description: "Abra o Multiplayer e adicione o servidor com os dados abaixo.",
        hint: "Versão recomendada: Java 1.21.4 ou superior.",
      },
      {
        step: "Bedrock",
        title: "Conectar no Bedrock",
        description: "Use o mesmo IP com a porta dedicada para entrar sem erro.",
        hint: "Use a última versão Bedrock disponível para melhor compatibilidade.",
      },
    ],
    javaCardLabel: "Java",
    javaCardDescription: "Ver dados de conexão para Java.",
    javaRecommendedTag: "Recomendado",
    bedrockCardLabel: "Bedrock",
    bedrockCardDescription: "Ver dados de conexão para Bedrock.",
    bedrockNotRecommendedTag: "Não recomendado",
    bedrockNotRecommendedTooltip: "Problema de incompatibilidade com UI.",
    connectionDataLabel: "Dados de conexão",
    ipLabel: "IP",
    portLabel: "Porta",
    backToPlatformAriaLabel: "Voltar para seleção de plataforma",
    stepDotAriaPrefix: "Ir para etapa",
    bedrockCompatibilityHint: "Use a última versão Bedrock disponível para melhor compatibilidade.",
    closePopupAriaLabel: "Fechar popup Play",
  },
  pages: {
    loading: {
      label: "Carregando...",
    },
    notFound: {
      code: "404",
      title: "Página não encontrada",
      description: "Desculpe, a página que você procura não existe ou foi movida.",
      homeCta: "Voltar para início",
      featuresCta: "Explorar features",
      supportPrefix: "Se você acredita que isso é um erro, ",
      supportLinkLabel: "fale com o suporte",
      supportSuffix: ".",
    },
    error: {
      title: "Algo deu errado",
      description: "Encontramos um erro inesperado. Nossa equipe já foi notificada.",
      retryCta: "Tentar novamente",
      homeCta: "Voltar para início",
      supportPrefix: "Se o problema continuar, ",
      supportLinkLabel: "entre em contato com o suporte",
      supportSuffix: " com os detalhes abaixo:",
      detailsLabel: "Detalhes do erro",
      digestLabel: "Digest",
      unhandledEventPrefix: "Evento de navegador não tratado",
    },
    about: {
      title: "Sobre o projeto UmaCraft",
      intro:
        "O UmaCraft nasceu com um propósito claro: criar o primeiro grande ponto de encontro no Minecraft para a comunidade de Umamusume. Combinamos a essência do survival que todos amam com sistemas, cosméticos e dinâmicas inspiradas nas nossas personagens favoritas.",
      cards: [
        {
          title: "Feito por Fãs, para Fãs",
          description:
            "Desenvolvido com carinho para oferecer uma experiência fiel, valorizando os pequenos detalhes que a comunidade de Umamusume mais gosta, sem perder a liberdade de um bom survival.",
        },
        {
          title: "Infraestrutura Robusta",
          description:
            "Servidor focado em estabilidade e performance. Jogabilidade lisa com Paper 1.21+, sistema seguro de contas via DiscordSRV e um ecossistema pronto para crescer.",
        },
        {
          title: "Comunidade Unida",
          description:
            "Não somos apenas sobre jogar juntos; é sobre construir conexões. Temos jogadores de várias partes do mundo, todos conectados pela mesma paixão. Você nunca vai se sentir sozinho.",
        },
      ],
      missionTitle: "Nossa Missão",
      missionPrefix:
        "Queremos ir além de um simples servidor de Minecraft. Nosso objetivo é proporcionar um ",
      missionHighlight: "refúgio divertido, imersivo e acolhedor",
      missionSuffix:
        ". Com sistemas de economia balanceados, integração de cosméticos, conquistas diárias e suporte crossplay (Java e Bedrock), o UmaCraft é melhorado semanalmente para orgulhar quem joga.",
      primaryCta: "Quero jogar agora",
      secondaryCta: "Conhecer os sistemas",
    },
    features: {
      titleLineOne: "Descubra tudo que você pode",
      titleLineAccent: "fazer no nosso universo",
      intro:
        "Um servidor que resgata o encanto do Minecraft Survival focado em exploração, melhorado com plugins sensacionais para quem quer economizar tempo e mostrar estilo.",
      mainFeatures: [
        {
          title: "Comunidade Global",
          description:
            "Servidor 100% focado em acolher jogadores do mundo todo. Brasileiros, hispanofalantes, americanos... todos correndo na mesma pista.",
          highlight: "Diversidade",
        },
        {
          title: "Java & Bedrock",
          description:
            "Jogue de onde estiver. Compatibilidade total para quem joga no PC (Java Edition), no console ou no celular (Bedrock).",
          highlight: "Crossplay",
        },
        {
          title: "Pioneirismo",
          description:
            "Somos o primeiro servidor estritamente público dedicado para a comunidade de Umamusume, criado por fãs para quem ama a franquia.",
          highlight: "Exclusivo",
        },
      ],
      systemsTitle: "Sistemas de Jogo",
      systemsIntro:
        "Trazemos mecânicas que respeitam seu tempo e recompensam seu carinho pelo que você constrói.",
      systemSections: [
        {
          category: "Economia e Conquistas",
          items: [
            {
              name: "Economia Integrada",
              description:
                "Ganhe e gaste moedas dentro e fora do servidor, com saldo totalmente interligado.",
            },
            {
              name: "Sync com Discord",
              description:
                "A grana que você junta na Agnes Tachyon pode virar dinheiro no servidor.",
            },
            {
              name: "Recompensas Diárias",
              description:
                "Entre todos os dias, fale com as Uma do spawn e resgate presentinhos consistentes.",
            },
            {
              name: "Loteria Gacha",
              description:
                "Teste a sorte e ganhe cosméticos e itens raros com prêmios rotativos.",
            },
          ],
        },
        {
          category: "Progressão de Vida",
          items: [
            {
              name: "Sistema de Skills",
              description:
                "Desbloqueie novas habilidades conforme caça, minera ou cultiva e molde sua build passiva.",
            },
            {
              name: "Jobs e Profissões",
              description:
                "Trabalhe de lenhador a caçador e escolha um rumo profissional para renda constante.",
            },
            {
              name: "Skins Sociais",
              description:
                "Personalize como as pessoas veem você no servidor com visuais exclusivos.",
            },
            {
              name: "Tags Especiais",
              description:
                "Exiba títulos acima do seu nome para marcar sua identidade e conquistas.",
            },
          ],
        },
        {
          category: "Exploração e Combate",
          items: [
            {
              name: "Quests Interativas",
              description:
                "Aceite missões, desbloqueie dungeons e avance em uma progressão com contexto real.",
            },
            {
              name: "Arena PvP",
              description:
                "Treine combate, desafie rivais e descubra novas estratégias com sua equipe.",
            },
            {
              name: "Eventos Envoy",
              description:
                "Caixas com loot especial caem em horários estratégicos da semana.",
            },
            {
              name: "Custom Crates",
              description:
                "Colete chaves, abra crates e tente rolar recompensas raras.",
            },
          ],
        },
        {
          category: "Ferramentas Úteis",
          items: [
            {
              name: "Interface (UI) Única",
              description:
                "Menus redesenhados para deixar a navegação mais clara e agradável.",
            },
            {
              name: "Factories e Máquinas",
              description:
                "Desbloqueie fábricas automáticas e escale produção sem microgerenciamento constante.",
            },
            {
              name: "Skins de Ferramentas",
              description:
                "Dê identidade visual às suas ferramentas sem depender só do visual vanilla.",
            },
            {
              name: "Leilões da Galera",
              description:
                "Venda itens e aproveite oportunidades de lucro no sistema de leilão.",
            },
          ],
        },
      ],
      roadmapBadge: "Desenvolvimento Contínuo",
      roadmapTitle: "A jornada mal começou",
      roadmapDescription:
        "Estamos só aquecendo. Além do servidor base, um modpack exclusivo inspirado em Umamusume está em desenvolvimento para fases futuras.",
      primaryCta: "Entrar no Servidor",
      communityCta: "Juntar-se à Comunidade",
    },
    download: {
      warningTitle: "Acesso Modded em preparação",
      warningDescription:
        "O servidor Modded ainda está temporariamente bloqueado enquanto concluímos ajustes técnicos e de balanceamento. Nossa prioridade agora é consolidar uma base sólida de jogadores no ambiente atual para abrir o Modded com estabilidade e progressão consistente desde o primeiro dia. Esta página de mods foi criada para automatizar e facilitar a instalação dos arquivos necessários quando a liberação oficial acontecer.",
      backHome: "Voltar para o início",
      chipLabel: "Download & Acesso",
      title: "Prepare-se para jogar",
      intro:
        "Preparamos os pacotes oficiais para aprimorar sua experiência no servidor. A distribuição está em revisão final.",
      filesTitle: "Arquivos Oficiais",
      filesDescription: "Os pacotes oficiais estão em revisão final e serão liberados em breve.",
      editionSuffix: "Edition",
      channels: [
        {
          version: "v1.0.0",
          type: "Forge",
          status: "Em construção",
          note: "Distribuição temporariamente pausada enquanto finalizamos ajustes.",
        },
        {
          version: "v1.0.0",
          type: "Fabric",
          status: "Em construção",
          note: "Voltaremos com o pacote oficial assim que o setup final for aprovado.",
        },
      ],
      installTitle: "Como Instalar?",
      installDescription: "Siga estes passos simples para entrar no servidor com tudo configurado.",
      installSteps: [
        {
          title: "Instale o Minecraft",
          description: "Garanta que você possui a versão Java Edition 1.20 ou superior no launcher.",
        },
        {
          title: "Prepare o Modloader",
          description: "Forge é recomendado para melhor compatibilidade global.",
        },
        {
          title: "Arraste para a pasta",
          description:
            "Coloque o arquivo .jar baixado na pasta .minecraft/mods do seu cliente.",
        },
        {
          title: "Divirta-se!",
          description:
            "Abra o jogo com o perfil Forge/Fabric, adicione o IP e entre no servidor.",
        },
      ],
      requirementsTitle: "Requisitos",
      requirements: [
        {
          category: "Requisitos Mínimos",
          specs: [
            "Minecraft Java Edition 1.20+",
            "Forge 47.1.0+ ou Fabric 0.14.21+",
            "Java 17 ou superior",
            "2GB de memória RAM disponível",
            "Conexão de internet estável",
          ],
        },
        {
          category: "Requisitos Recomendados",
          specs: [
            "Minecraft Java Edition 1.21+",
            "Forge 49.0.0+ ou Fabric 0.15.0+",
            "Java 21 ou superior",
            "4GB de memória RAM disponível",
            "Conexão de banda larga",
          ],
        },
      ],
      helpTitle: "Precisa de ajuda?",
      helpDescription:
        "Se algo não funcionar, nossa equipe e a comunidade estão no Discord para ajudar.",
      helpCta: "Buscar suporte no Discord",
    },
    credits: {
      title: "Nenhuma corrida se ganha sozinho",
      intro:
        "Esta página reconhece quem ajuda o UmaCraft a existir: comunidade parceira, ferramentas e projetos de terceiros.",
      serverIdLabel: "ID",
      partnersTitle: "Comunidades Parceiras",
      partnerCta: "Conhecer parceria",
      thirdPartyTitle: "Créditos a Terceiros",
      communityTitle: "Comunidade Principal",
      communityDescription:
        "Entre no Discord oficial para avisos, novidades e suporte em tempo real.",
      communityCta: "Acessar",
      footerPrompt: "Já viu tudo por aqui?",
      footerBackHome: "Voltar para o Início",
      partners: [
        {
          slug: "umabr",
          name: "Uma Musume BR!",
          serverId: "1425906852612538511",
          summary:
            "Parceira oficial para divulgação com a comunidade brasileira, com planejamento de eventos e crescimento conjunto.",
          impact: [
            "Divulgação ativa das temporadas em canais próprios.",
            "Onboarding amigável para novos jogadores.",
            "Planejamento de eventos integrados no Minecraft.",
          ],
        },
      ],
      thirdParty: [
        {
          title: "Cygames, Inc",
          description:
            "Universo, personagens e materiais oficiais de Umamusume Pretty Derby pertencem a Cygames, Inc.",
          references: [
            { label: "Cygames, Inc", href: "https://www.cygames.co.jp/en/" },
            { label: "Uma Musume Pretty Derby", href: "https://umamusume.jp/" },
          ],
        },
        {
          title: "Next.js, shadcn/ui e Tailwind CSS",
          description:
            "Base técnica utilizada para construir a interface web, componentes e sistema de estilos do projeto.",
          references: [
            { label: "Next.js", href: "https://nextjs.org/" },
            { label: "shadcn/ui", href: "https://ui.shadcn.com/" },
            { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
          ],
        },
        {
          title: "Pixabay (NomaBeats)",
          description:
            "Trilha de ambientação utilizada no site, com crédito ao artista NomaBeats.",
          references: [
            { label: "Pixabay", href: "https://pixabay.com/" },
            { label: "NomaBeats", href: "https://pixabay.com/users/nomabeats-17085827/" },
          ],
        },
        {
          title: "PlanetMinecraft",
          description:
            "Créditos de recursos e skins usados no projeto, com atribuição aos autores originais.",
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
            "Ferramenta usada como referência para acesso e leitura de assets de Umamusume durante o mapeamento visual.",
          references: [
            { label: "Repositório UmaViewer", href: "https://github.com/katboi01/UmaViewer" },
            { label: "katboi01", href: "https://github.com/katboi01" },
          ],
        },
      ],
    },
    faq: {
      title: "Perguntas frequentes",
      intro: "Respostas atualizadas para o escopo real do projeto.",
      items: [
        {
          question: "O que é o UmaCraft hoje?",
          answer:
            "O UmaCraft é um servidor temático de Minecraft inspirado em Umamusume, com foco em comunidade, progressão e sistemas de spawn com NPCs personalizados.",
        },
        {
          question: "Preciso instalar modpack para jogar?",
          answer:
            "Não. No escopo atual, a entrada principal não exige modpack obrigatório para acessar o servidor.",
        },
        {
          question: "Java e Bedrock podem jogar juntos?",
          answer:
            "Sim. O servidor é configurado para crossplay entre Java e Bedrock.",
        },
        {
          question: "Qual versão é recomendada?",
          answer:
            "Para Java, recomendamos Minecraft 1.21.4 ou superior. Para Bedrock, use a versão mais recente disponível.",
        },
        {
          question: "Minecraft original e não-original podem entrar?",
          answer:
            "Sim. Jogadores com launcher original e não-original conseguem acessar normalmente, respeitando as regras do servidor.",
        },
        {
          question: "Como entro no servidor rapidamente?",
          answer:
            "Clique em Play e escolha sua plataforma. O IP é play.umacraft.xyz. No Bedrock, use também a porta 19132.",
        },
        {
          question: "Os downloads já estão liberados?",
          answer:
            "Ainda não. A área de download está em construção e os pacotes oficiais serão publicados quando a validação final for concluída.",
        },
        {
          question: "Existe algum mod exclusivo de jukebox ativo agora?",
          answer:
            "Não no escopo atual de produção. Hoje o foco oficial está no servidor e nas features publicadas no site.",
        },
        {
          question: "Onde posso pedir suporte?",
          answer:
            "O canal principal é o Discord da comunidade. Se encontrar bug, envie contexto e passos para reproduzir.",
        },
      ],
      stillNeedHelpTitle: "Ainda ficou alguma dúvida?",
      stillNeedHelpDescription: "Nossa equipe e comunidade respondem rapidamente no Discord oficial.",
      discordCta: "Entrar no Discord",
      aboutCta: "Sobre o projeto",
    },
    changelog: {
      badge: "Em construção",
      title: "Changelog em preparação",
      description:
        "Estamos reorganizando o histórico de atualizações para publicar apenas informações reais e verificadas.",
      nextUpdateTitle: "Próximo update",
      nextUpdateDescription: "Linha do tempo pública com data e escopo.",
      formatTitle: "Formato novo",
      formatDescription: "Entradas curtas, objetivas e sem changelog fictício.",
      discordCta: "Acompanhar no Discord",
      homeCta: "Voltar para início",
    },
    hub: {
      title: "Uma's aqui e ali, mas o centro de tudo é aqui.",
      intro:
        "Algo curioso pode acontecer se você aproximar o mouse, ou até clicar nelas. Mas cuidado.",
      summaryTitle: "Todas as Umamusumes em um só lugar",
      summaryDescription:
        "Use os cards acima para descobrir rapidamente qual NPC atende cada necessidade no servidor.",
      primaryCta: "Entrar no servidor",
      secondaryCta: "Ver features",
      idChipPrefix: "ID",
      flipToArtAriaPrefix: "Voltar para arte de ",
      flipToSkinAriaPrefix: "Mostrar skin Minecraft de ",
      minecraftSkinAltPrefix: "Skin Minecraft de ",
      voiceVolumeAriaPrefix: "Volume da voz da personagem ",
      npcCopy: [
        {
          imageId: 1002,
          roleTitle: "Treinadora de habilidades",
          voiceLine:
            "Aprenda bem cada habilidade. Quem domina o próprio estilo não precisa olhar para trás.",
          spotlight:
            "Árvore de skills para moldar seu jeito de jogar e tirar o máximo de cada situação.",
        },
        {
          imageId: 1003,
          roleTitle: "Capitã da economia",
          voiceLine:
            "Ouça, ouça! Com as moedas certas, qualquer sonho fica mais perto. Eu sei disso melhor do que ninguém!",
          spotlight:
            "A Coinshop é onde você troca progresso por itens que fazem diferença de verdade na sua jornada.",
        },
        {
          imageId: 1007,
          roleTitle: "Comércio sem tédio",
          voiceLine: "Pode olhar, pode comprar, pode se arrepender. Eu tô aqui de qualquer jeito.",
          spotlight:
            "Loja principal do servidor. Tudo que você precisa pra montar sua build, testar estratégias e seguir em frente.",
        },
        {
          imageId: 1008,
          roleTitle: "Mecânica de toolskins",
          voiceLine:
            "Equipamento bom é essencial. Mas equipamento bom com estilo próprio? Isso sim é ser cool de verdade.",
          spotlight:
            "Toolskins pra personalizar suas ferramentas e deixar cada peça com a sua cara.",
        },
        {
          imageId: 1015,
          roleTitle: "Narradora dos rankings",
          voiceLine:
            "Todos os holofotes recaem sobre os que chegam ao topo. Venha, eu narro sua ascensão.",
          spotlight:
            "Leaderboards com destaque para os melhores em economia, combate e produção. Seu nome pode estar aqui.",
        },
        {
          imageId: 1017,
          roleTitle: "Condutora das quests",
          voiceLine:
            "Uma quest é mais do que uma tarefa. É o caminho que define quem você se torna.",
          spotlight:
            "Quests principais do servidor — narrativa, progressão e conquistas que constroem sua história aqui.",
        },
        {
          imageId: 1021,
          roleTitle: "Comandante dos kits",
          voiceLine:
            "Uchi nunca começa uma corrida sem tá preparada! Pega o kit certo e parte na frente!",
          spotlight:
            "Kits para entrar no ritmo rápido, testar estratégias e não desperdiçar tempo no começo.",
        },
        {
          imageId: 1024,
          roleTitle: "Recrutadora de jobs",
          voiceLine:
            "Todo trabalho tem estilo se você colocar energia nele! Vamos lá, não fica parado!",
          spotlight:
            "Escolha seu job, suba de carreira e garanta uma renda constante pra sustentar tudo que você quer fazer.",
        },
        {
          imageId: 1025,
          roleTitle: "Analista de nível",
          voiceLine:
            "...Você cresceu. Ela viu também. Continue avançando — para onde só você consegue chegar.",
          spotlight:
            "Painel de levels com seu progresso, metas e o caminho que ainda está à sua frente.",
        },
        {
          imageId: 1026,
          roleTitle: "Engenheira das linhas",
          voiceLine:
            "Processando requisição. Factories otimizadas para produção em escala. Aguardando comando.",
          spotlight:
            "Sistema de factories para automação, cadeia de produção e geração de recursos de forma eficiente.",
        },
        {
          imageId: 1032,
          roleTitle: "Suporte estratégico",
          voiceLine:
            "Dúvida? Excelente. Mente que questiona é mente que evolui. Vamos dissecar esse problema juntos.",
          spotlight:
            "Central de ajuda com dicas sobre sistemas, comandos e primeiros passos no servidor.",
        },
        {
          imageId: 1038,
          roleTitle: "Dama da loteria",
          voiceLine:
            "Hm. A sorte não escolhe quem é fofo... mas definitivamente ajuda. Tente sua chance.",
          spotlight:
            "Lottery com prêmios sazonais, recompensas especiais e aquele fator surpresa que ninguém esquece.",
        },
        {
          imageId: 1049,
          roleTitle: "Mestre das recompensas",
          voiceLine: "Cumpriu o objetivo? Então pegue sua recompensa. Sem cerimônia.",
          spotlight:
            "Resgate de rewards e acompanhamento de recompensas por progresso — simples e sem enrolação.",
        },
        {
          imageId: 1052,
          roleTitle: "Anfitriã dos destinos",
          voiceLine:
            "Quer conhecer lugares incríveis que outros players criaram? Eu te levo! A gente ainda não ganhou, mas vai com tudo!",
          spotlight:
            "Player warps para visitar bases, lojas e construções criadas pela galera do servidor.",
        },
        {
          imageId: 1062,
          roleTitle: "Guia dos atalhos",
          voiceLine:
            "Eu sei o caminho! Ou sei... quase. Mas desta vez eu não erro, pode confiar!",
          spotlight:
            "Warps para farm, cidade, eventos e pontos-chave do servidor. Chegue lá em segundos.",
        },
        {
          imageId: 1065,
          roleTitle: "Diretora de visual",
          voiceLine:
            "SEM GRAÇA É PROIBIDO aqui! Se vai aparecer no servidor, aparece com tudo! Vamos nessa!",
          spotlight:
            "Cosméticos para montar sua identidade visual, skins sociais e deixar sua presença marcada.",
        },
        {
          imageId: 1097,
          roleTitle: "Curadora de tags",
          voiceLine:
            "Uma tag revela mais do que você imagina... Escolha com cuidado o que quer que os outros vejam.",
          spotlight:
            "Tags para definir sua identidade pública no chat, no hub e entre os grupos do servidor.",
        },
        {
          imageId: 1119,
          roleTitle: "Guia das rotinas",
          voiceLine:
            "Toda grande jornada começa com um passo diário. Posso ajudá-la a se preparar corretamente?",
          spotlight:
            "Daily quests para manter consistência, acumular recursos e desbloquear bônus ao longo do tempo.",
        },
        {
          imageId: 1135,
          roleTitle: "Leiloeira oficial",
          voiceLine:
            "Todas as boas histórias começam com uma aposta. O que você vai colocar em jogo hoje?",
          spotlight:
            "Auction para vender raridades, disputar lotes e movimentar a economia do servidor.",
        },
      ],
    },
  },
  discordLink: {
    title: "Vinculação de Conta Discord",
    intro: "A vinculação do Discord deixou de ser obrigatória, mas fazer o link traz benefícios focados em economia e suporte melhorado para a sua conta.",
    benefitsTitle: "Por que vincular?",
    benefits: [
      {
        title: "Tachyon Lab Sync",
        description: "Os monies ganhos na bot Agnes Tachyon no Discord viram cash para você usar no servidor do Minecraft."
      },
      {
        title: "Suporte Imediato",
        description: "Permite melhor e mais rápido suporte em problemas relacionados à sua conta."
      }
    ],
    requirementsTitle: "Servidores Oficiais",
    requirements: [
      {
        text: "Tachyon Bistro - Official",
        url: "https://discord.gg/QyTvmTaC9G"
      },
      {
        text: "Uma Musume Br! (Parceiro)",
        url: "https://discord.gg/u6ddFNgQY3"
      }
    ],
    stepsTitle: "Como vincular (Passo a Passo)",
    steps: [
      {
        id: "step-1",
        title: "Gere o código no servidor",
        description: "Após entrar no servidor de Minecraft, utilize o comando /discordlink no chat."
      },
      {
        id: "step-2",
        title: "Copie o seu código",
        description: "Ao executar o comando, uma mensagem aparecerá no chat contendo o seu código de vinculação exclusivo."
      },
      {
        id: "step-3",
        title: "Envie na DM da bot",
        description: "Copie esse código e envie SOMENTE na DM (Mensagem Direta) da bot UmaCraft. Lembre-se, você precisa estar em um dos servidores oficiais aprovados listados acima!",
        tip: "Apenas a DM da bot UmaCraft aceita o código."
      },
      {
        id: "step-4",
        title: "Tudo pronto!",
        description: "Caso o código seja válido, aparecerá uma mensagem de conclusão tanto no servidor para você quanto na DM da bot."
      }
    ],
    warning: "Para sua segurança, nunca compartilhe o seu código em canais públicos ou para outras pessoas. Envie diretamente para a bot UmaCraft.",
    backHome: "Voltar para o início",
  },
  footer: {
    tagline: "Site oficial do UmaCraft.",
    joinPrompt: "Pronto para entrar?",
    copyCta: "Copiar IP do servidor",
    creditsLine: "Créditos comunitários e reconhecimentos de terceiros.",
    links: {
      credits: "Créditos",
      terms: "Termos",
      privacy: "Privacidade",
      about: "Sobre",
      features: "Recursos",
      download: "Download",
      faq: "FAQ",
      changelog: "Changelog",
      hub: "Hub",
      discordLink: "Linking",
    },
    rightsPattern: "{year} Axulogic. Todos os direitos reservados.",
    rightsSecondaryPattern: "Umamusume Pretty Derby e os assets oficiais pertencem à Cygames, Inc.",
    poweredByLabel: "Powered by",
    infrastructureProvider: "Cloudflare",
  },
  legal: {
    backHome: "Voltar ao início",
    contentsTitle: "Conteúdo do Documento",
    metaPanelTitle: "Metadados do Documento",
    clausesSuffix: "seções",
    updatedLabel: "Última atualização",
    enforcementLabel: "Escopo de aplicação",
    revisionNotice:
      "As políticas podem evoluir com gameplay, moderação, conformidade e mudanças de infraestrutura.",
    defaultBadge: "Documento de Política",
    credits: {
      title: "Recomendações Comunitárias & Créditos de Conteúdo",
      intro:
        "Esta seção destaca comunidades parceiras e dá crédito adequado aos recursos de terceiros que apoiam as operações e apresentação do UmaCraft.",
      updatedAt: "13 de fevereiro de 2026",
      badge: "Comunidade & Atribuições",
      items: [
        {
          id: "partner-communities",
          heading: "Comunidades parceiras",
          body: "Comunidades parceiras alinhadas com cultura saudável de multiplayer e moderação justa.",
          points: [
            "Servidores focados em sobrevivência com conjuntos de regras transparentes e moderação ativa.",
            "Comunidades de construtores e pacotes de recursos que publicam licenças de uso claras.",
            "Comunidades Discord com canais de integração para novos jogadores Java.",
          ],
        },
        {
          id: "third-party-assets",
          heading: "Ativos e mídia de terceiros",
          body: "Ativos externos usados no site ou canais de comunicação do jogo são creditados e revisados antes da publicação.",
          points: [
            "Faixas musicais usadas nas experiências de introdução e ambiente do site.",
            "Iconografia e elementos visuais abertos distribuídos sob licenças compatíveis.",
            "Tipografia e ferramentas de interface adquiridas de provedores licenciados.",
          ],
        },
      ],
    },
    terms: {
      title: "Termos de Serviço",
      intro:
        "Estes termos regulam toda a plataforma UmaCraft, incluindo site, servidores de Minecraft, comunidades Discord e canais de suporte. O site funciona como extensão operacional do serviço no Minecraft e segue a mesma governança.",
      updatedAt: "2 de março de 2026",
      badge: "Governança da Plataforma",
      items: [
        {
          id: "escopo-da-plataforma",
          heading: "Escopo da plataforma e aceite",
          body: "Ao usar o UmaCraft, você concorda com estes termos em todas as superfícies oficiais, incluindo páginas do site, gameplay no servidor, canais Discord e fluxo de suporte.",
          points: [
            "Ações no site que impactam conta, economia, vínculo ou suporte são tratadas como ações da plataforma.",
            "Espelhos não oficiais, comunidades falsas e domínios de impersonação não fazem parte do UmaCraft.",
            "Se você não concordar com estes termos, não utilize o serviço.",
          ],
        },
        {
          id: "contas-e-acesso",
          heading: "Contas, identidade e acesso",
          body: "Você é responsável por toda atividade realizada pelas suas identidades Minecraft e Discord quando elas interagem com os sistemas UmaCraft.",
          points: [
            "Mantenha credenciais seguras e não compartilhe ou venda contas.",
            "Impersonação de identidade, bypass de verificação ou vínculo forjado são proibidos.",
            "O suporte pode solicitar verificação de propriedade antes de alterações de conta, apelações ou recuperação.",
          ],
        },
        {
          id: "conduta-e-jogo-limpo",
          heading: "Conduta e jogo limpo",
          body: "Saúde da comunidade e progressão justa são obrigatórias no chat, gameplay, economia e canais sociais oficiais.",
          points: [
            "Respeite moderadores, jogadores e instruções de eventos.",
            "Assédio, discurso de ódio, ameaças, golpes e sabotagem direcionada são proibidos.",
            "Cheats, automação nociva, abuso de bugs, duplicação ou manipulação econômica podem gerar punição imediata.",
          ],
        },
        {
          id: "economia-virtual-e-itens",
          heading: "Economia, recompensas e itens virtuais",
          body: "Moedas, ranks, cosméticos, tags, recompensas e itens de progressão são licenças virtuais da plataforma e não propriedade real.",
          points: [
            "Saldos e recompensas podem ser ajustados para preservar justiça e integridade técnica.",
            "Recursos de sincronização entre plataformas podem ser pausados ou recalibrados durante incidentes, exploits ou manutenção.",
            "Reembolso ou compensação é analisado caso a caso dentro da política de prevenção de abuso e perda.",
          ],
        },
        {
          id: "integracoes-e-terceiros",
          heading: "Integrações e serviços de terceiros",
          body: "O UmaCraft pode depender de plataformas terceiras, como Discord, provedores de hospedagem e ferramentas de infraestrutura.",
          points: [
            "Falhas externas ou mudanças de política de terceiros podem impactar o serviço sem aviso prévio.",
            "Links externos e comunidades parceiras possuem seus próprios termos e regras de moderação.",
            "Use apenas links oficiais publicados em umacraft.xyz e no Discord oficial.",
          ],
        },
        {
          id: "moderacao-e-aplicacao",
          heading: "Moderação e aplicação",
          body: "Decisões de moderação são baseadas em logs, evidências contextuais e critérios de segurança do servidor.",
          points: [
            "As ações podem incluir aviso, mute, rollback, suspensão temporária ou banimento permanente.",
            "Infrações graves podem gerar aplicação imediata sem aviso progressivo.",
            "Apelações são aceitas pelos canais oficiais de suporte e podem exigir verificação adicional.",
          ],
        },
        {
          id: "disponibilidade-e-mudancas",
          heading: "Disponibilidade, atualizações e mudanças de política",
          body: "Funcionalidades, páginas, comandos, integrações e regras podem evoluir conforme o projeto expande.",
          points: [
            "Manutenção, balanceamento ou resposta a incidentes podem limitar o acesso temporariamente.",
            "Regras e sistemas podem mudar para manter gameplay estável, justo e seguro.",
            "A versão mais recente publicada substitui versões anteriores da política.",
          ],
        },
        {
          id: "propriedade-e-limitacao",
          heading: "Propriedade intelectual e limitação de responsabilidade",
          body: "Branding UmaCraft, sistemas autorais e conteúdo original do site são protegidos. Assets oficiais de franquia permanecem com seus titulares de direito.",
          points: [
            "Não reproduza ou comercialize identidade, sistemas ou mídia do UmaCraft sem autorização.",
            "O serviço é fornecido no estado atual e pode sofrer interrupções, bugs ou mudanças de balanceamento.",
            "No limite permitido por lei, a responsabilidade é restrita ao escopo operacional e de moderação da plataforma.",
          ],
        },
      ],
    },
    privacy: {
      title: "Política de Privacidade",
      intro:
        "Esta política explica como o UmaCraft coleta, usa e protege dados em toda a plataforma, incluindo interações no site, gameplay no Minecraft e recursos oficiais vinculados ao Discord.",
      updatedAt: "2 de março de 2026",
      badge: "Dados e Privacidade",
      items: [
        {
          id: "dados-coletados",
          heading: "Quais dados coletamos",
          body: "Coletamos apenas os dados necessários para operar a plataforma com segurança e fornecer funções de gameplay, conta e suporte.",
          points: [
            "Dados de conta e identidade: UUID Minecraft, histórico de nome e metadados de vínculo com Discord.",
            "Dados de gameplay e moderação: comandos, eventos econômicos, sinais de progressão e logs de incidentes.",
            "Dados técnicos e do site: diagnósticos de navegador/dispositivo, metadados de requisição e telemetria anti-abuso.",
          ],
        },
        {
          id: "fontes-de-coleta",
          heading: "Como os dados são coletados",
          body: "Os dados são coletados quando você acessa páginas oficiais, conecta no servidor, vincula contas ou solicita suporte.",
          points: [
            "Diretamente das ações do usuário no gameplay, no site e no atendimento.",
            "Automaticamente por logs da plataforma e mecanismos de segurança.",
            "Por integrações oficiais necessárias para vínculo de conta e continuidade de moderação.",
          ],
        },
        {
          id: "uso-dos-dados",
          heading: "Para que os dados são usados",
          body: "O tratamento é limitado a finalidades operacionais, de segurança e de gestão da comunidade.",
          points: [
            "Autenticar e proteger integridade de conta e sessão.",
            "Executar fluxos de economia, progressão, vínculo e suporte.",
            "Detectar fraude, abuso, evasão e instabilidade técnica.",
          ],
        },
        {
          id: "retencao-e-minimizacao",
          heading: "Retenção e minimização",
          body: "Mantemos dados pelo tempo necessário para operação, segurança, histórico de moderação e obrigações legais aplicáveis.",
          points: [
            "Logs operacionais e de moderação podem ser mantidos para análise de incidente e apelações.",
            "Dados sem necessidade operacional podem ser removidos, anonimizados ou agregados.",
            "O tempo de retenção pode variar conforme risco, prevenção de abuso e requisitos de infraestrutura.",
          ],
        },
        {
          id: "compartilhamento-e-processadores",
          heading: "Compartilhamento e prestadores de serviço",
          body: "Dados podem ser processados por provedores confiáveis de infraestrutura e serviços que suportam a operação da plataforma.",
          points: [
            "Não vendemos dados pessoais.",
            "O acesso é restrito a necessidade operacional, segurança, moderação e suporte.",
            "Provedores terceiros processam dados com salvaguardas técnicas e contratuais.",
          ],
        },
        {
          id: "praticas-de-seguranca",
          heading: "Práticas de segurança",
          body: "Aplicamos medidas técnicas e organizacionais razoáveis para reduzir acesso não autorizado, perda e abuso.",
          points: [
            "Usamos controles de acesso, logging, proteção de ambiente e procedimentos de resposta a incidentes.",
            "Nenhum serviço online é livre de risco; usuários também devem proteger suas contas e dispositivos.",
            "Incidentes de segurança são tratados com prioridade e podem exigir restrição temporária de recursos.",
          ],
        },
        {
          id: "direitos-e-solicitacoes",
          heading: "Direitos do usuário e contato",
          body: "Você pode solicitar acesso, correção ou análise de exclusão de dados pessoais elegíveis pelos canais oficiais de suporte.",
          points: [
            "Solicitações podem exigir verificação de identidade antes do atendimento.",
            "Alguns registros podem ser mantidos quando necessários para moderação, prevenção de abuso ou obrigação legal.",
            "Os canais oficiais listados no site são a via válida para solicitações de privacidade.",
          ],
        },
        {
          id: "menores-e-responsaveis",
          heading: "Menores de idade e responsáveis",
          body: "Se a lei local exigir autorização de responsável para uso de serviços online, ela deve ser obtida antes de usar o UmaCraft.",
          points: [
            "Responsáveis podem contatar o suporte sobre conta, privacidade ou segurança.",
            "Contas podem ser restritas se requisitos de elegibilidade ou consentimento não forem atendidos.",
            "Medidas de segurança da comunidade se aplicam igualmente a todos os jogadores.",
          ],
        },
      ],
    },
  },
  audio: {
    tapToEnable: "Toque para ativar áudio",
    bgmNowPlaying: "nomabeats.mp3",
    mutedState: "Mudo",
    unmutedState: "Som ligado",
  },
};
