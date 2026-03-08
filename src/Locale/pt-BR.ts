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
      "Entre no servidor Paper 1.21+ do UmaCraft em play.umacraft.xyz e comece sua jornada com a comunidade.",
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
    eyebrow: "Site oficial e guia de entrada",
    title: "UmaCraft",
    leadLine:
      "O UmaCraft é um servidor de Minecraft inspirado em Umamusume para jogadores de Java e Bedrock.",
    subtitle:
      "Entre no mundo Paper 1.21+ em play.umacraft.xyz, encontre a comunidade do UmaCraft e explore progressão, eventos e sistemas pensados para o universo do projeto.",
    wordmarkSupportLabel: "Servidor de Minecraft inspirado em Umamusume",
    wordmarkSupportValue: "play.umacraft.xyz  •  Java + Bedrock",
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
          "O Vanilla+Plugins já está aberto para todos. A versão Modded será lançada depois, com foco maior em Umamusume.",
      },
    ],
    socialProofLabel: "Server novo, galera nova, problemas novos.",
    socialProofHighlight: "Oque pode dar errado?",
    seasonBadge: "Temporada 1 em andamento",
    seasonStatus: "1.21.x+ (1.21.4 recomendado)",
    syncPanelEyebrow: "Informações rápidas",
    syncPanelTitle: "O que saber antes de entrar em play.umacraft.xyz",
    syncPanelItems: [
      "Servidor do UmaCraft com comunidade multilíngue",
      "Ambiente Paper 1.21+ com crossplay entre Java e Bedrock",
      "Vanilla+Plugins ao vivo agora, Modded temático depois",
    ],
    syncPanelStatus: "Online e estável",
    scrollIndicatorLabel: "Role para links oficiais",
    featureChips: [
      "Primeiro servidor público Umamusume",
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
          "Hoje o foco esta no Vanilla+Plugins para atender qualquer jogador. A versao Modded vira na sequencia com foco maior em Umamusume.",
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
          "Primeiro servidor publico aberto para a comunidade Umamusume",
        ],
      },
    ],
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
      title: "Sobre o UmaCraft, site oficial do projeto do servidor",
      intro:
        "O UmaCraft é o site oficial e a base pública de um servidor de Minecraft inspirado em Umamusume criado para se tornar um ponto de encontro de longo prazo para a comunidade, combinando survival, sistemas temáticos e progressão consistente.",
      cards: [
        {
          title: "Feito por fãs, para a comunidade de Umamusume",
          description:
            "Desenvolvido para conversar com quem gosta de Umamusume sem deixar de funcionar como um servidor de Minecraft forte, com onboarding claro, eventos e sistemas úteis.",
        },
        {
          title: "Infraestrutura Robusta",
          description:
            "Infraestrutura Paper 1.21+ focada em estabilidade, segurança de conta, suporte conectado ao Discord e espaço para crescer com consistência.",
        },
        {
          title: "Comunidade Unida",
          description:
            "Não é só sobre jogar junto; é sobre dar à comunidade de Umamusume um lugar dedicado para se encontrar, evoluir e permanecer conectada no Minecraft.",
        },
      ],
      missionTitle: "Nossa Missão",
      missionPrefix:
        "Queremos ir além de um servidor genérico de Minecraft. Nosso objetivo é proporcionar um ",
      missionHighlight: "lar reconhecível, acolhedor e duradouro",
      missionSuffix:
        " para quem se importa com Umamusume, economia balanceada, progressão diária, suporte de conta e crossplay entre Java e Bedrock.",
      primaryCta: "Quero jogar agora",
      secondaryCta: "Conhecer os sistemas",
    },
    features: {
      titleLineOne: "Veja o que faz do UmaCraft um",
      titleLineAccent: "servidor de Minecraft com temática Umamusume",
      intro:
        "O UmaCraft mantém o survival acessível e adiciona progressão, economia, qualidade de vida e uma identidade inspirada em Umamusume que dá contexto real ao servidor.",
      mainFeatures: [
        {
          title: "Comunidade Global",
          description:
            "Servidor preparado para receber jogadores de várias regiões e idiomas no mesmo espaço de progressão.",
          highlight: "Diversidade",
        },
        {
          title: "Java & Bedrock",
          description:
            "Crossplay entre Java e Bedrock no mesmo ambiente público e oficial do servidor.",
          highlight: "Crossplay",
        },
        {
          title: "Pioneirismo",
          description:
            "Um servidor público construído em torno da identidade de Umamusume, do convívio da comunidade e de progressão contínua.",
          highlight: "Exclusivo",
        },
      ],
      systemsTitle: "Sistemas de Jogo",
      systemsIntro:
        "Mecânicas pensadas para recompensar consistência, reforçar a identidade do servidor e deixar a progressão mais clara para quem está chegando.",
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
        "Vanilla+Plugins é o ambiente ao vivo hoje, enquanto uma fase Modded com identidade temática mais forte continua planejada para o futuro.",
      primaryCta: "Entrar no Servidor",
      communityCta: "Juntar-se à Comunidade",
    },
    download: {
      warningTitle: "Acesso Modded em preparação",
      warningDescription:
        "O servidor Modded continua bloqueado enquanto ajustes técnicos, de balanceamento e de setup são finalizados. Hoje, esta página funciona como um status oficial para informar se já existe pacote, fluxo de setup ou download real disponível.",
      backHome: "Voltar para o início",
      chipLabel: "Download & Acesso",
      title: "Status de download e orientação de setup",
      intro:
        "Esta página acompanha a disponibilidade dos pacotes oficiais. Se nenhum pacote estiver liberado ainda, use as orientações abaixo e o suporte no Discord em vez de arquivos de terceiros.",
      filesTitle: "Status dos pacotes oficiais",
      filesDescription: "Ainda não existe pacote público final liberado. As entradas abaixo servem para mostrar o estado atual da liberação.",
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
      installDescription: "Use estes passos como orientação de setup até existir um pacote oficial para download.",
      installSteps: [
        {
          title: "Verifique o status atual do servidor",
          description: "Use esta página para confirmar se o foco ao vivo continua em Vanilla+Plugins ou se algum pacote opcional já foi realmente liberado.",
        },
        {
          title: "Use o servidor ativo primeiro",
          description: "No ambiente público atual, entre pelo Java 1.21.x+ ou Bedrock usando play.umacraft.xyz.",
        },
        {
          title: "Ignore arquivos não oficiais",
          description:
            "Não instale pacotes de terceiros que se apresentem como release oficial do UmaCraft se eles não estiverem linkados nesta página.",
        },
        {
          title: "Peça suporte se houver dúvida",
          description:
            "Se você não tiver certeza sobre qual setup se aplica ao seu caso, use o suporte oficial no Discord antes de alterar o seu cliente.",
        },
      ],
      requirementsTitle: "Requisitos",
      requirements: [
        {
          category: "Acesso atual ao servidor",
          specs: [
            "Minecraft Java Edition 1.21.x+ ou Bedrock mais recente",
            "IP do servidor: play.umacraft.xyz",
            "Porta Bedrock: 19132",
            "Conexão de internet estável",
            "Discord oficial disponível para suporte",
          ],
        },
        {
          category: "Quando houver pacote oficial",
          specs: [
            "Baixe apenas pacotes linkados nesta página",
            "Siga exatamente o loader e a versão informados na release",
            "Mantenha o Java atualizado se algum pacote Java for anunciado",
            "Reserve memória RAM suficiente conforme as notas do pacote",
            "Leia as notas de release antes de instalar",
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
          name: "Umamusume BR!",
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
            { label: "Umamusume Pretty Derby", href: "https://umamusume.jp/" },
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
      title: "FAQ do UmaCraft",
      intro: "As respostas abaixo refletem o ambiente oficial do servidor, o fluxo atual de suporte e os requisitos reais para entrar em play.umacraft.xyz.",
      items: [
        {
          question: "O que é o UmaCraft hoje?",
          answer:
            "O UmaCraft é um servidor temático de Minecraft inspirado em Umamusume, com foco em progressão de longo prazo, eventos de comunidade e recursos de qualidade de vida. Hoje, o ambiente oficial em produção é Vanilla+Plugins.",
        },
        {
          question: "Preciso instalar modpack para jogar?",
          answer:
            "Não para o servidor principal atual. Você pode entrar sem modpack obrigatório. Quando houver pacote opcional/oficial, ele será publicado na página de Download com instruções completas.",
        },
        {
          question: "Java e Bedrock podem jogar juntos?",
          answer:
            "Sim. O servidor está configurado para crossplay entre Java e Bedrock no mesmo ambiente público. Algumas diferenças visuais de interface podem existir por plataforma, mas a base do gameplay é compartilhada.",
        },
        {
          question: "Qual versão é recomendada?",
          answer:
            "Para Java, recomendamos 1.21.4 ou superior (faixa 1.21.4 até 1.21.8 está mais estável no momento). Para Bedrock, mantenha sua versão na mais recente disponível.",
        },
        {
          question: "Minecraft original e não-original podem entrar?",
          answer:
            "Sim. Ambos conseguem acessar normalmente, desde que respeitem as regras, validações e requisitos de segurança da plataforma. Tentativas de abuso, impersonação ou bypass podem gerar ação de moderação.",
        },
        {
          question: "Como entro no servidor rapidamente?",
          answer:
            "Use o fluxo de Play na página inicial, escolha sua plataforma e adicione o servidor com IP `play.umacraft.xyz`. No Bedrock, inclua também a porta `19132`.",
        },
        {
          question: "Os downloads já estão liberados?",
          answer:
            "Ainda não totalmente. A área de Download pode aparecer em estado de preparação enquanto os pacotes passam por validação final de estabilidade, integridade e compatibilidade.",
        },
        {
          question: "Existe algum mod exclusivo de jukebox ativo agora?",
          answer:
            "Não no escopo atual de produção. A prioridade oficial no momento é manter o servidor estável e consolidar o fluxo completo de site/documentação. Novos conteúdos exclusivos serão anunciados pelos canais oficiais.",
        },
        {
          question: "Onde posso pedir suporte?",
          answer:
            "O canal principal é o Discord oficial. Para acelerar o atendimento, envie seu usuário, plataforma/versão, o que aconteceu e passos para reproduzir (com print, se possível).",
        },
      ],
      stillNeedHelpTitle: "Ainda ficou alguma dúvida?",
      stillNeedHelpDescription:
        "Nossa equipe e a comunidade atendem pelo Discord oficial. Abra seu pedido com contexto claro para receber suporte mais rápido.",
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
      title: "Guia oficial do hub do UmaCraft",
      intro:
        "O hub é onde jogadores novos e antigos entendem o servidor mais rápido. Passe o mouse ou clique nos NPCs para ver qual sistema cada personagem representa.",
      summaryTitle: "NPCs, sistemas e a estrutura do servidor",
      summaryDescription:
        "Use os cards acima para entender qual NPC cuida de cada sistema dentro do servidor UmaCraft.",
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
    title: "Guia oficial de vinculação com Discord",
    intro: "A vinculação com Discord é o fluxo oficial de conexão de conta para quem quer suporte mais forte, melhor tratamento de conta e sincronização de economia entre a comunidade e o servidor UmaCraft no Minecraft.",
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
        text: "Umamusume Br! (Parceiro)",
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
    tagline: "Site oficial do servidor UmaCraft no Minecraft.",
    joinPrompt: "Pronto para entrar?",
    copyCta: "Copiar IP do servidor",
    creditsLine: "Créditos comunitários e reconhecimentos de terceiros.",
    cookiePreferencesLabel: "Preferências de Cookies",
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
  cookieConsent: {
    title: "Suas opções de cookies",
    description:
      "Utilizamos categorias de cookies para manter o site seguro, funcional e em melhoria contínua. Você pode escolher quais categorias deseja permitir.",
    policyCta: "Política de Cookies e Privacidade",
    policyHref: "/privacy",
    manageTitle: "Gerenciar preferências de consentimento",
    strictlyNecessaryLabel: "Cookies estritamente necessários",
    alwaysActiveLabel: "Sempre ativo",
    functionalLabel: "Cookies funcionais",
    performanceLabel: "Cookies de performance",
    targetingLabel: "Cookies de segmentação",
    rejectAllCta: "Rejeitar opcionais",
    confirmChoicesCta: "Confirmar minhas escolhas",
    closeAriaLabel: "Fechar preferências de cookies",
    poweredByLabel: "Powered by UmaCraft",
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
      updatedAt: "5 de março de 2026",
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
          body: "Moedas, ranks, cosméticos, tags, recompensas, itens de progressão e moedas ficcionais da ambientação do projeto são licenças virtuais da plataforma e não propriedade real.",
          points: [
            "Nenhuma moeda, saldo, item ou vantagem do UmaCraft possui valor monetário fora da plataforma.",
            "Saldos e recompensas podem ser ajustados para preservar justiça e integridade técnica.",
            "Recursos de sincronização entre plataformas podem ser pausados ou recalibrados durante incidentes, exploits ou manutenção.",
            "Reembolso ou compensação é analisado caso a caso dentro da política de prevenção de abuso e perda.",
          ],
        },
        {
          id: "dinheiro-real-e-cambio",
          heading: "Dinheiro real, cash-out e câmbio",
          body: "É proibido comprar, vender, trocar, intermediar, anunciar ou aceitar qualquer ativo, vantagem ou serviço do UmaCraft em troca de dinheiro real ou equivalentes.",
          points: [
            "Isso inclui Pix, transferência bancária, espécie, gift cards, saldo de plataformas, criptomoedas e qualquer outra forma de pagamento externo.",
            "Também é proibido oferecer ou aceitar cash-out, tabela de conversão, corretagem, agenciamento ou intermediação entre moedas fictícias do projeto e valores reais.",
            "Tentativas de RMT, venda de contas, venda de moeda virtual ou monetização não autorizada podem resultar em remoção de ativos, rollback e banimento permanente.",
          ],
        },
        {
          id: "integracoes-e-terceiros",
          heading: "Integrações e serviços de terceiros",
          body: "O UmaCraft pode depender de plataformas terceiras, como Discord, provedores de hospedagem e ferramentas de infraestrutura.",
          points: [
            "Falhas externas ou mudanças de política de terceiros podem impactar o serviço sem aviso prévio.",
            "É proibido usar o projeto, seus ativos ou sua economia de forma que viole regras de terceiros, licenciadores ou detentores de direitos.",
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
