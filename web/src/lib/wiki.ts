import { GENERATED_DOC_CONTENT } from "./generatedReferencesContent";

export interface WikiDocumentMeta {
  id: string;
  slug: string;
  title: string;
  titleNl?: string;
  subtitle?: string;
  subtitleNl?: string;
  workingGroupId: string;
  workingGroupName: string;
  workingGroupNameNl?: string;
  relativePath: string;
  author?: string;
  publicationDate?: string;
  badge?: string;
  badgeNl?: string;
}

export interface WikiDocumentData extends WikiDocumentMeta {
  content: string;
  contentNl?: string;
  charCount: number;
  lineCount: number;
  wordCount: number;
  filePath: string;
}

export interface WorkingGroupCategory {
  id: string;
  title: string;
  titleNl: string;
  number: string;
  badge: string;
  badgeNl: string;
  description: string;
  descriptionNl: string;
  documents: WikiDocumentMeta[];
}

export const RAW_DOC_CONTENT: Record<string, string> = {};
export const RAW_DOC_CONTENT_NL: Record<string, string> = {};

export const WORKING_GROUPS: WorkingGroupCategory[] = [
  {
    id: "WG-01-UI",
    title: "Actuarial & Underwriting Foundations for Industrial Property & Cyber Risk",
    titleNl: "Actuariële & Acceptatie Grondslagen voor Industriële Eigendom & Cyberrisico",
    number: "WG-01",
    badge: "ACTUARIAL 01–12",
    badgeNl: "ACTUARIEEL 01–12",
    description: "Eigenia’s Actuarial and Underwriting Working Group bridges the structural divide between physical asset risk and financial indemnification. By adapting the classic COPE framework to cyber-physical industrial assets, our research introduces dynamic premium calculations based on real-time operational telemetry. We rigorously quantify catastrophic tail-risk, non-linear business interruption, and systemic accumulation scenarios under Lloyd’s Y5381 war exclusions. This non-linear underwriting methodology transitions the insurance industry from static historical claims tables to forward-looking predictive risk pricing.",
    descriptionNl: "Eigenia's Actuariële en Acceptatiewerkgroep overbrugt de structurele kloof tussen fysiek vermogensrisico en financiële schadeloosstelling. Door het klassieke COPE-kader aan te passen voor cyber-fysieke industriële activa, introduceert ons onderzoek dynamische premieberekeningen op basis van realtime operationele telemetrie. We kwantificeren catastrofaal staartrisico, niet-lineaire bedrijfsonderbreking en systemische cumulatiescenario's onder Lloyd's Y5381 oorlogsuitsluitingen. Deze niet-lineaire acceptatiemethodologie transformeert de verzekeringssector van statische historische claimstabellen naar vooruitblikkende risicoprijsstelling.",
    documents: [
      {
        id: "WG-01-UI-1-Overview",
        slug: "1-underwriter-overview",
        title: "Actuarial & Underwriting Foundations for Industrial Property & Cyber Risk",
        titleNl: "Actuariële & Acceptatie Grondslagen voor Industriële Eigendom & Cyberrisico",
        subtitle: "Mathematical frameworks, equivalence principles, and key risk transfer stakeholders",
        subtitleNl: "Wiskundige kaders, equivalentieprincipes en belangrijke risico-overdrachtsbelanghebbenden",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Overview.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Overview",
        badgeNl: "Overzicht",
      },
      {
        id: "WG-01-UI-1-COPE_summary",
        slug: "2-underwriter-cope-summary",
        title: "The COPE Framework: Advanced Methodologies in Physical Risk Assessment",
        titleNl: "Het COPE-Kader: Geavanceerde Methodologieën in Fysieke Risicobeoordeling",
        subtitle: "Construction, Occupancy, Protection, and Exposure in property underwriting",
        subtitleNl: "Constructie, Bezetting, Bescherming en Blootstelling in eigendomsacceptatie",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-COPE_summary.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "COPE Summary",
        badgeNl: "COPE Samenvatting",
      },
      {
        id: "WG-01-UI-1-COPE_detail",
        slug: "3-underwriter-cope-detail",
        title: "The COPE Framework: Advanced Methodologies in Physical Risk Assessment and Commercial Property Underwriting",
        titleNl: "Het COPE-Kader: Geavanceerde Methodologieën in Fysieke Risicobeoordeling en Commerciële Eigendomsacceptatie",
        subtitle: "Detailed structural classifications, PML/MPL modeling, and industrial risk evaluation",
        subtitleNl: "Gedetailleerde structurele classificaties, PML/MPL-modellering en industriële risico-evaluatie",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-COPE_detail.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "COPE Detail",
        badgeNl: "COPE Detail",
      },
      {
        id: "WG-01-UI-1-Cyber_Risk_Underwriting",
        slug: "4-underwriter-cyber-risk-underwriting",
        title: "Advanced Cyber Risk Underwriting for Critical Infrastructure",
        titleNl: "Geavanceerde Cyberrisico-acceptatie voor Vitale Infrastructuur",
        subtitle: "Mathematical models, live telemetry, and dynamic premium development",
        subtitleNl: "Wiskundige modellen, live telemetrie en dynamische premieontwikkeling",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Cyber_Risk_Underwriting.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Actuarial Engine",
        badgeNl: "Actuariële Engine",
      },
      {
        id: "WG-01-UI-Cyber_Observations",
        slug: "101-underwriter-cyber-observations",
        title: "Empirical Cyber Insurance Market Observations & Underwriting Telemetry",
        titleNl: "Empirische Cyberverzekeringsmarkt Waarnemingen & Acceptatietelemetrie",
        subtitle: "Market dynamics, captive structures, and continuous telemetry integration",
        subtitleNl: "Marktdynamiek, captive-structuren en continue telemetrie-integratie",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-Cyber_Observations.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Market Intel",
        badgeNl: "Marktintelligentie",
      },
      {
        id: "WG-01-UI-1-Cyber_Method",
        slug: "102-cyber-method",
        title: "The Cyber Digital Twin Paradigm: Redefining Critical Infrastructure Risk Transfer",
        titleNl: "Het Cyber Digital Twin Paradigma: Herdefiniëring van Risico-overdracht voor Vitale Infrastructuur",
        subtitle: "Non-linear catastrophe risk transfer and real-time physical-to-financial telemetry",
        subtitleNl: "Niet-lineaire catastroferisico-overdracht en real-time fysiek-naar-financieel telemetrie",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Cyber_Method.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Methodology",
        badgeNl: "Methodologie",
      },
      {
        id: "WG-01-UI-1-7-Industry-Value-Prop",
        slug: "102-oxot-underwriter-value-prop",
        title: "Articulating the Value Proposition to Global Underwriters & Brokers",
        titleNl: "Het Waardeaanbod Verwoorden voor Wereldwijde Acceptanten & Makelaars",
        subtitle: "Dynamic premium reduction, loss control alignment, and broker partnerships",
        subtitleNl: "Dynamische meerkorting, afstemming van schadebeheersing en makelaarspartnerschappen",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-7-Industry-Value-Prop.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Value Prop",
        badgeNl: "Waardepropositie",
      },
      {
        id: "WG-01-UI-1-Competitive_Analysis",
        slug: "104-competitive-analysis",
        title: "Actuarial Engine Ecosystem Competitive Analysis & Market Positioning",
        titleNl: "Concurrentieanalyse van het Actuariële Engine-Ecosysteem & Marktpositionering",
        subtitle: "Comparing CyberCube, Moody's RMS, BitSight, SecurityScorecard, and DeNexus",
        subtitleNl: "Vergelijking van CyberCube, Moody's RMS, BitSight, SecurityScorecard en DeNexus",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Competitive_Analysis.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Competitive Intel",
        badgeNl: "Concurrentie-analyse",
      },
      {
        id: "WG-01-UI-1-Req-Improvements",
        slug: "oxot-cdt-underwriters-needed-improvements",
        title: "Reinsurance Layering & Lloyd’s Y5381 War Exclusion Compliance",
        titleNl: "Herverzekeringslaagvorming & Naleving van Lloyd's Y5381 Oorlogsuitstluiting",
        subtitle: "State-backed cyber warfare attributions, excess-of-loss layering, and war clause compliance",
        subtitleNl: "Door de staat ondersteunde cyberoorlogvoering-toeschrijvingen en naleving van oorlogsclausules",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-1-Req-Improvements.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Reinsurance",
        badgeNl: "Herverzekering",
      },
      {
        id: "WG-01-UI-Quantitative-Cyber-Physical-FMECA",
        slug: "quantitative-cyber-physical-fmeca",
        title: "Quantitative Cyber-Physical FMECA: Failure Mode Analysis for Underwriting",
        titleNl: "Kwantitatieve Cyber-Fysieke FMECA: Storingsmodusanalyse voor Acceptatie",
        subtitle: "Why cyber-induced failure modes carry risk priority numbers 3x to 13x higher than mechanical wear",
        subtitleNl: "Waarom cyber-geïnduceerde storingsmodi risicoprioriteitsgetallen dragen die 3x tot 13x hoger zijn dan mechanische slijtage",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-Quantitative-Cyber-Physical-FMECA.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Cyber FMECA",
        badgeNl: "Cyber FMECA",
      },
      {
        id: "WG-01-UI-ALE-ROSI-Decision-Framework",
        slug: "ale-rosi-decision-framework",
        title: "Annualised Loss Expectancy & Return on Security Investment for OT",
        titleNl: "Geannualiseerde Verliesverwachting & Rendement op Beveiligingsinvesteringen voor OT",
        subtitle: "Financial risk quantification, Gordon-Loeb ceilings, and fat-tailed loss corrections for datacenter infrastructure",
        subtitleNl: "Financiële risicokwantificering, Gordon-Loeb-plafonds en dikstaartige verliescorrecties voor datacenters",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-ALE-ROSI-Decision-Framework.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "ALE & ROSI",
        badgeNl: "ALE & ROSI",
      },
      {
        id: "WG-01-UI-RCIL-SCIL-Reinsurance",
        slug: "rcil-scil-reinsurance",
        title: "Reliability & Safety Critical Items Lists (RCIL / SCIL) for Reinsurance",
        titleNl: "Betrouwbaarheids- en Veiligheidskritieke Itemlijsten (RCIL / SCIL) voor Herverzekering",
        subtitle: "Quantifying lead-time exposure, single-source vulnerabilities, and cyber-physical spares optimization",
        subtitleNl: "Kwantificering van doorlooptijdrisico, single-source kwetsbaarheden en optimalisatie van reserveonderdelen",
        workingGroupId: "WG-01-UI",
        workingGroupName: "Actuarial & Underwriting",
        workingGroupNameNl: "Actariaat & Acceptatie",
        relativePath: "references/WG-01-UI-Underwriter-insurance/WG-01-UI-RCIL-SCIL-Reinsurance.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "RCIL & SCIL",
        badgeNl: "RCIL & SCIL",
      },
    ],
  },
  {
    id: "WG-02-DT",
    title: "Digital Twin & Taleb Series",
    titleNl: "Digitale Tweeling & Taleb-reeks",
    number: "WG-02",
    badge: "DIGITAL TWIN 01–10",
    badgeNl: "DIGITALE TWEELING 01–10",
    description: "The Digital Twin Working Group establishes the architectural and mathematical foundations for anti-fragile infrastructure networks. Drawing from Nassim Nicholas Taleb’s probabilistic epistemologies, our research demonstrates why traditional financial Value-at-Risk models fail when applied to physical industrial networks. We construct a 7-layer computational ontology that couples 3.2-million-node Graph Neural Networks with real-time psychometric threat tensors. This framework enables continuous spatial-temporal risk simulations across interconnected energy, water, and industrial control systems.",
    descriptionNl: "De Digitale Tweeling Werkgroep legt de architectonische en wiskundige grondslagen voor antifragiele infrastructuurnetwerken. Geïnspireerd door Nassim Nicholas Taleb's probabilistische epistemologieën, toont ons onderzoek aan waarom traditionele financiële Value-at-Risk modellen falen bij fysieke industriële netwerken. We bouwen een 7-laags computationele ontologie die 3,2 miljoen knooppunten van Graph Neural Networks koppelt aan psychometrische dreigingstensoren. Dit kader maakt continue ruimtelijk-temporele risicosimulaties mogelijk over onderling verbonden energie-, water- en industriële besturingssystemen.",
    documents: [
      {
        id: "WG-02-DT-1",
        slug: "taleb-fooled-by-randomness",
        title: "Fooled by Best Practice",
        titleNl: "Misleid door Best Practice",
        subtitle: "Nassim Taleb exposed Wall Street illusions; Digital Twin exposes OT illusions",
        subtitleNl: "Nassim Taleb onthulde Wall Street-illusies; Digital Twin onthult OT-illusies",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        workingGroupNameNl: "Digitale Tweeling & Taleb-reeks",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-1.md",
        badge: "Taleb I",
        badgeNl: "Taleb I",
      },
      {
        id: "WG-02-DT-2",
        slug: "cdt-series-background",
        title: "First Principles and Taleb's Fooled by Randomness",
        titleNl: "Eerste Principes en Taleb's Misleid door Toeval",
        subtitle: "Philosophical foundations and the epistemology of uncertainty in critical infrastructure",
        subtitleNl: "Filosofische grondslagen en de epistemologie van onzekerheid in vitale infrastructuur",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        workingGroupNameNl: "Digitale Tweeling & Taleb-reeks",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-2.md",
        badge: "Taleb II",
        badgeNl: "Taleb II",
      },
      {
        id: "WG-02-DT-3",
        slug: "cdt-series-1",
        title: "The Moment of Recognition",
        titleNl: "Het Moment van Herkenning",
        subtitle: "What Nassim Taleb saw in markets, we see every day in critical infrastructure",
        subtitleNl: "Wat Nassim Taleb zag in markten, zien we dagelijks in vitale infrastructuur",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        workingGroupNameNl: "Digitale Tweeling & Taleb-reeks",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-3.md",
        badge: "Taleb III",
        badgeNl: "Taleb III",
      },
      {
        id: "WG-02-DT-4",
        slug: "cdt-series-2",
        title: "McKenney-Lacan Calculus, and the Seven-Layer Graph",
        titleNl: "McKenney-Lacaniaanse Calculus en de Zevenlaagse Graaf",
        subtitle: "Physics engine for organizational risk and 7-layer directed multigraph",
        subtitleNl: "Fysica-engine voor organisatorisch risico en zevenlaagse gerichte multinetwerk",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        workingGroupNameNl: "Digitale Tweeling & Taleb-reeks",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-4.md",
        badge: "Taleb IV",
        badgeNl: "Taleb IV",
      },
      {
        id: "WG-02-DT-5",
        slug: "cdt-series-3",
        title: "Fooled by Randomness → Fooled by Cybersecurity",
        titleNl: "Misleid door Toeval → Misleid door Cyberbeveiliging",
        subtitle: "Why Taleb's view of markets is the missing lens for OT/ICS defense",
        subtitleNl: "Waarom Taleb's visie op markten de ontbrekende lens is voor OT/ICS-defensie",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        workingGroupNameNl: "Digitale Tweeling & Taleb-reeks",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-5.md",
        badge: "Taleb V",
        badgeNl: "Taleb V",
      },
      {
        id: "WG-02-DT-Applied-Physics",
        slug: "graph-universe-visualizer",
        title: "Physics Models — 6 Seldon Indicators",
        titleNl: "Fysica-modellen — 6 Seldon-indicatoren",
        subtitle: "3.2-million-node graph topology and psychometric threat indicators",
        subtitleNl: "3,2-miljoen knooppunten graaftopologie en psychometrische dreigingsindicatoren",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        workingGroupNameNl: "Digitale Tweeling & Taleb-reeks",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Applied-Physics.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Topology",
        badgeNl: "Topologie",
      },
      {
        id: "WG-02-DT-Paradigm-Library",
        slug: "paradigm-suite",
        title: "Engine: Paradigm Suite",
        titleNl: "Engine: Paradigma-suite",
        subtitle: "Modular simulation engines, risk metrics, and twin execution components",
        subtitleNl: "Modulaire simulatie-engines, risicostatistieken en twin-uitvoeringscomponenten",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        workingGroupNameNl: "Digitale Tweeling & Taleb-reeks",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Paradigm-Library.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Paradigm Suite",
        badgeNl: "Paradigm Suite",
      },
      {
        id: "WG-02-DT-High-Density-Liquid-Cooling",
        slug: "high-density-liquid-cooling",
        title: "High-Density Liquid Cooling Architecture & Thermal Catastrophe Dynamics",
        titleNl: "Hogedichtheidsvloeistofkoeling Architectuur & Thermische Catastrofedynamica",
        subtitle: "Navigating 120 kW/rack densities: direct-to-chip vs. immersion and the 45-second thermal trip cliff",
        subtitleNl: "Navigeren van 120 kW/rack-dichtheden: direct-to-chip vs. immersie en de 45-seconden thermische uitschakelklif",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        workingGroupNameNl: "Digitale Tweeling & Taleb-reeks",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-High-Density-Liquid-Cooling.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "DLC & Immersion",
        badgeNl: "DLC & Immersie",
      },
      {
        id: "WG-02-DT-Seven-Staff-Fugue",
        slug: "seven-staff-fugue",
        title: "The Seven-Staff Fugue: A Topological Score for Cyber-Physical State Evolution",
        titleNl: "De Zeven-Stafsfuga: Een Topologische Score voor Cyber-Fysieke Toestandsontwikkeling",
        subtitle: "Polyphonic counterpoint, Schenkerian Ursatz, barcodes, and Feynman path integrals",
        subtitleNl: "Polyfoon contrapunt, Schenkeriaanse Ursatz, barcodes en Feynman-padintegralen",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        workingGroupNameNl: "Digitale Tweeling & Taleb-reeks",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Seven-Staff-Fugue.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Seven-Staff Fugue",
        badgeNl: "Zeven-Stafsfuga",
      },
      {
        id: "WG-02-DT-Cognitive-Digital-Twin",
        slug: "cognitive-digital-twin",
        title: "Cognitive Digital Twin: Defender Simulation for Incident Response Optimization",
        titleNl: "Cognitieve Digitale Tweeling: Verdedigersimulatie voor Incidentrespons-Optimalisatie",
        subtitle: "Simulating human-in-the-loop performance, Yerkes-Dodson dynamics, and decision latency",
        subtitleNl: "Simulatie van menselijke prestaties in de lus, Yerkes-Dodson-dynamica en beslissingslatentie",
        workingGroupId: "WG-02-DT",
        workingGroupName: "Digital Twin & Taleb Series",
        workingGroupNameNl: "Digitale Tweeling & Taleb-reeks",
        relativePath: "references/WG-02-DT-Digital-Twin/WG-02-DT-Cognitive-Digital-Twin.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Cognitive Twin",
        badgeNl: "Cognitieve Tweeling",
      },
    ],
  },
  {
    id: "WG-03-ML",
    title: "Psychometrics & Behavioral Modeling",
    titleNl: "Psychometrie & Gedragsmodellering",
    number: "WG-03",
    badge: "PSYCHOMETRICS 01–07",
    badgeNl: "PSYCHOMETRIE 01–07",
    description: "The Behavioral Modeling Working Group applies Lacanian psychoanalytic theory and advanced psychometric tensor algebra to threat actor classification. By modeling the psychological structures, desire trajectories, and cognitive dissonance thresholds of human adversaries, we forecast attack campaigns before initial payload delivery. This framework maps adversary capability against ideological commitment to generate dynamic threat profiles across industrial control environments. The resulting psychohistory engine provides defensive teams with predictive intelligence on adversary behavior during high-stress operational escalations.",
    descriptionNl: "De Werkgroep Gedragsmodellering past Lacaniaanse psychoanalytische theorie en geavanceerde psychometrische tensoralgebra toe op de classificatie van dreigingsactoren. Door de psychologische structuren, verlangentrajecten en cognitieve dissonantiedrempels van menselijke tegenstanders te modelleren, voorspellen we aanvalscampagnes vóór de eerste payload-levering. Dit kader brengt de capaciteit van de tegenstander in kaart tegenover ideologische betrokkenheid om dynamische dreigingsprofielen te genereren. De psychohistorie-engine biedt defensieve teams voorspellende intelligentie over tegenstandersgedrag tijdens operationele escalaties.",
    documents: [
      {
        id: "WG-03-ML-Mckenney-Lacanian",
        slug: "lacanian-psychohistory-framework",
        title: "Mckenney-Lacanian Psychohistory Framework",
        titleNl: "Mckenney-Lacaniaans Psychohistorisch Kader",
        subtitle: "Behavioral classification, Lacanian Four Discourses, and predictive threat modeling",
        subtitleNl: "Gedragsclassificatie, Lacaniaanse Vier Discoursen en voorspellende dreigingsmodellering",
        workingGroupId: "WG-03-ML",
        workingGroupName: "Psychometrics & Behavioral Modeling",
        workingGroupNameNl: "Psychometrie & Gedragsmodellering",
        relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Mckenney-Lacanian.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Lacanian Framework",
        badgeNl: "Lacaniaans Kader",
      },
      {
        id: "WG-03-ML-Autonomous-OT-Trust-Boundary",
        slug: "autonomous-ot-trust-boundary",
        title: "Autonomous OT & AI-Driven Facility Control: The Write-Access Trust Boundary",
        titleNl: "Autonome OT & AI-Gestuurde Faciliteitscontrole: De Schrijftoegang Vertrouwensgrens",
        subtitle: "Why AI facility optimizers must never have autonomous write access to industrial control systems",
        subtitleNl: "Waarom AI-faciliteitsoptimaliseerders nooit autonome schrijftoegang mogen hebben tot industriële besturingssystemen",
        workingGroupId: "WG-03-ML",
        workingGroupName: "Psychometrics & Behavioral Modeling",
        workingGroupNameNl: "Psychometrie & Gedragsmodellering",
        relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Autonomous-OT-Trust-Boundary.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "AI TRUST BOUNDARY",
        badgeNl: "AI VERTROUWENSGRENS",
      },
      {
        id: "WG-03-ML-Calculus-of-the-Subject",
        slug: "calculus-of-the-subject",
        title: "The Calculus of the Subject: Topology, Infinitesimal Logic, and the Mirror Stage",
        titleNl: "De Calculus van het Subject: Topologie, Infinitesimale Logica en het Spiegelstadium",
        subtitle: "Formal mathematical psychoanalysis, Dedekind cuts, suture, and predictive behavioral tensors",
        subtitleNl: "Formele wiskundige psychoanalyse, Dedekind-sneden, hechtenis en voorspellende gedragstensoren",
        workingGroupId: "WG-03-ML",
        workingGroupName: "Psychometrics & Behavioral Modeling",
        workingGroupNameNl: "Psychometrie & Gedragsmodellering",
        relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Calculus-of-the-Subject.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Lacanian Calculus",
        badgeNl: "Lacaniaanse Calculus",
      },
      {
        id: "WG-03-ML-Loman-Operator-Topology-of-an-Act",
        slug: "loman-operator-topology-of-an-act",
        title: "The Loman Operator & Topology of an Act: Dynamic Phase Space Simulation of Psychodynamic Collapse",
        titleNl: "De Loman-Operator & Topologie van een Daad: Dynamische Faseruimtesimulatie van Psychodynamische Ineenstorting",
        subtitle: "Modeling operator denial, damped harmonic oscillations, and catastrophic failure in control rooms",
        subtitleNl: "Modellering van operator-ontkenning, gedempte harmonische oscillaties en catastrofale uitval in controlekamers",
        workingGroupId: "WG-03-ML",
        workingGroupName: "Psychometrics & Behavioral Modeling",
        workingGroupNameNl: "Psychometrie & Gedragsmodellering",
        relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Loman-Operator-Topology-of-an-Act.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Loman Operator",
        badgeNl: "Loman-Operator",
      },
      {
        id: "WG-03-ML-Morphogenesis-Signifying-Chain-gGNN",
        slug: "morphogenesis-signifying-chain-ggnn",
        title: "The Morphogenesis of the Signifying Chain via gGNN",
        titleNl: "De Morfogenese van de Betekenende Keten via gGNN",
        subtitle: "L-gGNN architecture, Cybernetic Big Five Theory, and psychodynamic graph convolutions",
        subtitleNl: "L-gGNN-architectuur, Cybernetische Big Five-theorie en psychodynamische graafconvoluties",
        workingGroupId: "WG-03-ML",
        workingGroupName: "Psychometrics & Behavioral Modeling",
        workingGroupNameNl: "Psychometrie & Gedragsmodellering",
        relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Morphogenesis-Signifying-Chain-gGNN.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "L-gGNN Engine",
        badgeNl: "L-gGNN-Engine",
      },
      {
        id: "WG-03-ML-Musical-Psychometric-Notation",
        slug: "musical-psychometric-notation",
        title: "Musical Psychometric Notation (MPN): Formal Specification for Security State Sonification",
        titleNl: "Muzikale Psychometrische Notatie (MPN): Formele Specificatie voor Beveiligingsstatus-Sonificatie",
        subtitle: "Auditory telemetry, harmonic dissonance metrics, and predictive Seldon Crisis detection",
        subtitleNl: "Auditieve telemetrie, harmonische dissonantiemetrieken en voorspellende Seldon-crisisdetectie",
        workingGroupId: "WG-03-ML",
        workingGroupName: "Psychometrics & Behavioral Modeling",
        workingGroupNameNl: "Psychometrie & Gedragsmodellering",
        relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Musical-Psychometric-Notation.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "MPN Sonification",
        badgeNl: "MPN-Sonificatie",
      },
      {
        id: "WG-03-ML-Cognitive-Bias-Catalog",
        slug: "cognitive-bias-catalog",
        title: "Cognitive Bias Catalog: Exploiting Human Heuristics in Security Decisions",
        titleNl: "Cognitieve Vooroordelen Catalogus: Exploitatie van Menselijke Heuristieken in Beveiligingsbeslissingen",
        subtitle: "Dual-process heuristics, Bias Susceptibility Scoring, and ICS adversary exploitation vectors",
        subtitleNl: "Duaal-procesheuristieken, Bias-gevoeligheidsscores en ICS-aanvalsexploitatievectoren",
        workingGroupId: "WG-03-ML",
        workingGroupName: "Psychometrics & Behavioral Modeling",
        workingGroupNameNl: "Psychometrie & Gedragsmodellering",
        relativePath: "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Cognitive-Bias-Catalog.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "Cognitive Bias",
        badgeNl: "Cognitieve Bias",
      },
    ],
  },
  {
    id: "WG-04-CF",
    title: "Cascading Failures",
    titleNl: "Ketenuitval & Instabiliteit",
    number: "WG-04",
    badge: "CASCADING FAILURES 01–03",
    badgeNl: "KETENUITVAL 01–03",
    description: "The Cascading Failures Working Group investigates systemic collapse mechanisms within large-scale interconnected energy grids and critical utilities. Our research models non-linear destabilization phenomena, including high-voltage grid 'death wobble,' battery energy storage system (BESS) thermal runaway, and synthetic inertia decay. By simulating targeted cyber-physical interdictions on transmission sub-stations, we quantify how localized equipment disruptions cascade into multi-state blackout events. These findings establish the mathematical boundaries for grid resilience and rapid islanding protocols.",
    descriptionNl: "De Werkgroep Ketenuitval onderzoekt systemische ineenstortingsmechanismen binnen grootschalige onderling verbonden energienetten en vitale voorzieningen. Ons onderzoek modelleert niet-lineaire destabilisatieverscheinsels, waaronder hoogspanningsnet 'death wobble,' thermische runaway van batterij-energieopslagsystemen (BESS) en synthetische traagheidsafname. Door gerichte cyber-fysieke ontregelingen op transmissie-onderstations te simuleren, kwantificeren we hoe gelokaliseerde apparatuuruitval escaleert tot multi-state blackout-gebeurtenissen.",
    documents: [
      {
        id: "WG-04-CF-Cascading-Failure-Hypothesis",
        slug: "cascading-failure-hypothesis",
        title: "Cascading Failure Hypothesis: Non-Linear Energy Grid Instability",
        titleNl: "Hypothese van Ketenuitval: Niet-lineaire Energienet Instabiliteit",
        subtitle: "Cyber-physical attack impact on NSW electricity network and energy infrastructure",
        subtitleNl: "Cyber-fysieke aanvalsimpact op het NSW-elektriciteitsnetwerk en energie-infrastructuur",
        workingGroupId: "WG-04-CF",
        workingGroupName: "Cascading Failures",
        workingGroupNameNl: "Ketenuitval & Instabiliteit",
        relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md",
        author: "J. McKenney",
        publicationDate: "March 12, 2026",
        badge: "Grid Impact",
        badgeNl: "Netwerkimpact",
      },
      {
        id: "WG-04-CF-Death-Wobble",
        slug: "death-wobble-frequency-instability",
        title: "The Grid’s Precarious Pulse: Death Wobble & Frequency Instability",
        titleNl: "De Wankele Puls van het Net: Death Wobble & Frequentie-instabiliteit",
        subtitle: "High-voltage grid resonance, battery thermal runaway, and synthetic inertia decay",
        subtitleNl: "Hoogspanningsnet-resonantie, thermische runaway van batterijen en synthetische traagheidsafname",
        workingGroupId: "WG-04-CF",
        workingGroupName: "Cascading Failures",
        workingGroupNameNl: "Ketenuitval & Instabiliteit",
        relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Death Wobble-The Grids Precarious Pulse Frequency Instability - jmckenney.md",
        author: "J. McKenney",
        publicationDate: "April 2024",
        badge: "Death Wobble",
        badgeNl: "Death Wobble",
      },
      {
        id: "WG-04-CF-Emerging-Power-Topologies",
        slug: "emerging-power-topologies",
        title: "Emerging Power Topologies: Cyber-Physical Resilience of BESS, SMRs, and Microgrids",
        titleNl: "Opkomende Energietopologieën: Cyber-Fysieke Veerkracht van BESS, SMR's en Microgrids",
        subtitle: "Substation cascades, synthetic inertia decay, and islanding interlocks in hyperscale generation",
        subtitleNl: "Onderstation-cascades, synthetische traagheidsafname en eilandvergrendelingen in hyperscale-opwekking",
        workingGroupId: "WG-04-CF",
        workingGroupName: "Cascading Failures",
        workingGroupNameNl: "Ketenuitval & Instabiliteit",
        relativePath: "references/WG-04-CF-Cascading-Failures/WG-04-CF-Emerging-Power-Topologies.md",
        author: "J. McKenney",
        publicationDate: "May 2024",
        badge: "BESS & SMRs",
        badgeNl: "BESS & SMR's",
      },
    ],
  },
  {
    id: "WG-05-CAD",
    title: "DEXPI 2.0 & CAD Interoperability",
    titleNl: "DEXPI 2.0 & CAD Interoperabiliteit",
    number: "WG-05",
    badge: "CAD STANDARDS 01–05",
    badgeNl: "CAD STANDAARDEN 01–05",
    description: "The CAD Interoperability Working Group unifies static industrial plant engineering schematics with live operational security attestations. By parsing DEXPI 2.0 P&ID XML topologies alongside CycloneDX 1.6 4-BOM specifications, we create a continuous digital chain of custody from physical piping to software firmware. This architecture maps component-level dependencies across hardware, software, operational technology, and chemical process safety layers. Industrial operators gain instant visibility into how a vulnerability in a single valve or PLC impacts the broader process safety envelope.",
    descriptionNl: "De Werkgroep CAD-Interoperabiliteit verenigt statische industriële installatieschema's met live operationele beveiligingsattesten. Door DEXPI 2.0 P&ID XML-topologieën te parsen samen met CycloneDX 1.6 4-BOM-specificaties, creëren we een continue digitale keten van bewijskracht van fysieke leidingen tot software-firmware. Deze architectuur brengt afhankelijkheden op componentniveau in kaart tussen hardware, software, operationele technologie en chemische procesveiligheidslagen. Installatiebeheerders krijgen direct inzicht in de impact van kwetsbaarheden.",
    documents: [
      {
        id: "WG-05-CAD-DEXPI-Introduction",
        slug: "dexpi-cyclonedx-standards",
        title: "DEXPI 2.0 P&ID Topology & CycloneDX 4-BOM Standards",
        titleNl: "DEXPI 2.0 P&ID-topologie & CycloneDX 4-BOM Standaarden",
        subtitle: "Integrating physical plant topology (ISO 15926) with software bill of materials (SBOM)",
        subtitleNl: "Integratie van fysieke fabriekstopologie (ISO 15926) met software-stuklijst (SBOM)",
        workingGroupId: "WG-05-CAD",
        workingGroupName: "DEXPI 2.0 & CAD Interoperability",
        workingGroupNameNl: "DEXPI 2.0 & CAD Interoperabiliteit",
        relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-DEXPI-Introduction.md",
        badge: "DEXPI 2.0",
        badgeNl: "DEXPI 2.0",
      },
      {
        id: "WG-05-CAD-Frontier-AI-Hardware-Security",
        slug: "frontier-ai-hardware-security",
        title: "Frontier AI Hardware Security & Platform Assurance Framework",
        titleNl: "Frontier AI Hardwarebeveiliging & Platformzekerheidskader",
        subtitle: "Zero Trust at silicon boundary, 4-point cryptographic envelope, and EN 50126 dual-pacing V-model",
        subtitleNl: "Zero Trust op siliciumgrens, 4-punts cryptografische envelop en EN 50126 dual-pacing V-model",
        workingGroupId: "WG-05-CAD",
        workingGroupName: "DEXPI 2.0 & CAD Interoperability",
        workingGroupNameNl: "DEXPI 2.0 & CAD Interoperabiliteit",
        relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Frontier-AI-Hardware-Security.md",
        badge: "HARDWARE ROT",
        badgeNl: "HARDWARE ROT",
      },
      {
        id: "WG-05-CAD-Unified-DEXPI-CycloneDX",
        slug: "unified-dexpi-cyclonedx-standards",
        title: "Unified DEXPI 2.0 & CycloneDX 1.6+ Semantic Bridge",
        titleNl: "Geünificeerde DEXPI 2.0 & CycloneDX 1.6+ Semantische Brug",
        subtitle: "Bridging physical plant hydronics (ISO 15926) and multi-tier cybersecurity architecture (ISO/IEC 5962)",
        subtitleNl: "Overbrugging van fysieke fabriekshydronica (ISO 15926) en meerlaagse cyberbeveiligingsarchitectuur (ISO/IEC 5962)",
        workingGroupId: "WG-05-CAD",
        workingGroupName: "DEXPI 2.0 & CAD Interoperability",
        workingGroupNameNl: "DEXPI 2.0 & CAD Interoperabiliteit",
        relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Unified-DEXPI-CycloneDX.md",
        badge: "MULTI-BOM",
        badgeNl: "MULTI-BOM",
      },
      {
        id: "WG-05-CAD-Supply-Chain-EU-CRA",
        slug: "supply-chain-eu-cra-standards",
        title: "Supply Chain Transparency & EU CRA Regulatory Enforcement",
        titleNl: "Transparantie van de Toeleveringsketen & EU CRA Handhaving",
        subtitle: "Implementing M2M Bills of Materials, 6-site HSM audits, and ALARP justification (Reg 2024/2847)",
        subtitleNl: "Implementatie van M2M stuklijsten, 6-locaties HSM-audits en ALARP-rechtvaardiging (Reg 2024/2847)",
        workingGroupId: "WG-05-CAD",
        workingGroupName: "DEXPI 2.0 & CAD Interoperability",
        workingGroupNameNl: "DEXPI 2.0 & CAD Interoperabiliteit",
        relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Supply-Chain-EU-CRA.md",
        badge: "EU CRA",
        badgeNl: "EU CRA",
      },
      {
        id: "WG-05-CAD-IEC62443-SFAIRP-SecRACS",
        slug: "iec62443-sfairp-secracs",
        title: "IEC 62443 in Practice: SFAIR, SecRACS, and Security Level Targets",
        titleNl: "IEC 62443 in de Praktijk: SFAIR, SecRACS en Beveiligingsniveaudoelen",
        subtitle: "Operationalizing SFAIRP and Security-Related Application Conditions (SecRAC) in industrial datacenters",
        subtitleNl: "Operationalisering van SFAIRP en beveiligingsgerelateerde toepassingsvoorwaarden (SecRAC) in industriële datacenters",
        workingGroupId: "WG-05-CAD",
        workingGroupName: "DEXPI 2.0 & CAD Interoperability",
        workingGroupNameNl: "DEXPI 2.0 & CAD Interoperabiliteit",
        relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-IEC62443-SFAIRP-SecRACS.md",
        badge: "SFAIR & SecRACS",
        badgeNl: "SFAIR & SecRACS",
      },
    ],
  },
  {
    id: "WG-07-TM",
    title: "Threat Modeling & TACAM Matrix",
    titleNl: "Dreigingsmodellering & TACAM Matrix",
    number: "WG-07",
    badge: "THREAT MODELING 01–04",
    badgeNl: "DREIGINGSMODELLERING 01–04",
    description: "The Threat Modeling Working Group develops quantitative frameworks for evaluating adversary capabilities and target selection dynamics. Anchored by the TACAM Matrix—built upon a spectral decomposition of 77,279 empirical threat data points—our research categorizes state-sponsored and criminal threat groups. We introduce the 12-factor Adversary Threat Quotient (ATQ) formula to score threat actor motivation, technical sophistication, and operational velocity in real time. This quantitative approach eliminates subjective risk scoring, replacing it with repeatable mathematical metrics.",
    descriptionNl: "De Werkgroep Dreigingsmodellering ontwikkelt kwantitatieve kaders voor de evaluatie van capaciteiten van tegenstanders en doelselectiedynamiek. Verankerd door de TACAM-matrix—gebouwd op een spectrale decompositie van 77.279 empirische dreigingsdatapunten—categoriseert ons onderzoek staatsondersteunde en criminele dreigingsgroepen. We introduceren de 12-factor Adversary Threat Quotient (ATQ) formule om de motivatie, technische verfijning en operationele snelheid van dreigingsactoren in realtime te scoren.",
    documents: [
      {
        id: "WG-07-TM-TACAM",
        slug: "tacam-deep-dive",
        title: "The TACAM Matrix",
        titleNl: "De TACAM-matrix",
        subtitle: "Threat Actor Capability and Motivation matrix for industrial control systems",
        subtitleNl: "Dreigingsactor Capaciteit en Motivatie-matrix voor industriële besturingssystemen",
        workingGroupId: "WG-07-TM",
        workingGroupName: "Threat Modeling & TACAM Matrix",
        workingGroupNameNl: "Dreigingsmodellering & TACAM Matrix",
        relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-TACAM.md",
        author: "Lab Sponsor Resident, j.mckenney",
        publicationDate: "April 28, 2025",
        badge: "TACAM Matrix",
        badgeNl: "TACAM Matrix",
      },
      {
        id: "WG-07-TM-ATQ",
        slug: "atq-deep-dive",
        title: "The Actor Threat Quotient (ATQ)",
        titleNl: "Het Actor Dreigingsquotient (ATQ)",
        subtitle: "12-factor scoring formula for threat actor prioritization and capability assessment",
        subtitleNl: "12-factor scoringsformule voor dreigingsactor-prioritering en capaciteitsbeoordeling",
        workingGroupId: "WG-07-TM",
        workingGroupName: "Threat Modeling & TACAM Matrix",
        workingGroupNameNl: "Dreigingsmodellering & TACAM Matrix",
        relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-ATQ.md",
        author: "Lab Sponsor Resident, j.mckenney",
        publicationDate: "April 28, 2025",
        badge: "ATQ Formula",
        badgeNl: "ATQ Formule",
      },
      {
        id: "WG-07-TM-CyHAZOP-Methodology",
        slug: "cyhazop-hyperscale-methodology",
        title: "CyHAZOP: Cyber-Physical Hazard Analysis for Hyperscale Infrastructure",
        titleNl: "CyHAZOP: Cyber-Fysieke Gevarenanalyse voor Hyperscale Infrastructuur",
        subtitle: "Bridging IEC 61882 process safety and IEC 62443 industrial cybersecurity for megawatt AI facilities",
        subtitleNl: "Overbrugging van IEC 61882 procesveiligheid en IEC 62443 industriële cyberbeveiliging voor megawatt AI-faciliteiten",
        workingGroupId: "WG-07-TM",
        workingGroupName: "Threat Modeling & TACAM Matrix",
        workingGroupNameNl: "Dreigingsmodellering & TACAM Matrix",
        relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-CyHAZOP-Methodology.md",
        badge: "CYHAZOP",
        badgeNl: "CYHAZOP",
      },
      {
        id: "WG-07-TM-CyHAZOP-Node-Registers",
        slug: "cyhazop-node-registers",
        title: "CyHAZOP System Drill-Down: Node Registers for Power, Cooling, and Safety",
        titleNl: "CyHAZOP Systeem Drill-Down: Knooppuntregisters voor Energie, Koeling en Veiligheid",
        subtitle: "Empirical register-level threat models for Modbus, BACnet, and Redfish operational conduits",
        subtitleNl: "Empirische register-niveau dreigingsmodellen voor Modbus, BACnet en Redfish operationele leidingen",
        workingGroupId: "WG-07-TM",
        workingGroupName: "Threat Modeling & TACAM Matrix",
        workingGroupNameNl: "Dreigingsmodellering & TACAM Matrix",
        relativePath: "references/WG-07-TM-Threat-Modeling/WG-07-TM-CyHAZOP-Node-Registers.md",
        badge: "REGISTERS",
        badgeNl: "REGISTERS",
      },
    ],
  },
  {
    id: "WG-08-MO",
    title: "Monte Carlo Engine Application",
    titleNl: "Monte Carlo-Engine Toepassingen",
    number: "WG-08",
    badge: "MONTE CARLO 01",
    badgeNl: "MONTE CARLO 01",
    description: "The Monte Carlo Application Working Group delivers high-throughput stochastic simulation engines for complex industrial networks. Utilizing 50,000-run importance sampling and graph random walk algorithms, our engine models physical degradation pathways and Annualized Loss Expectancy (ALE). The platform simulates rare-event tail risks that standard deterministic risk assessments fail to detect. Insurance underwriters and facility owners receive precise probabilistic distributions of physical destruction and business interruption financial loss.",
    descriptionNl: "De Werkgroep Monte Carlo-Toepassingen levert stochastische simulatie-engines met hoge doorvoer voor complexe industriële netwerken. Met behulp van 50.000-run importance sampling en graaf-random-walk-algoritmen modelleert onze engine fysieke degradatiepaden en Annualized Loss Expectancy (ALE). Het platform simuleert zeldzame staartrisico's die standaard deterministische risicobeoordelingen niet detecteren. Verzekeraars en installatie-eigenaren ontvangen nauwkeurige probabilistische verdelingen van fysieke vernietiging en bedrijfsonderbreking.",
    documents: [
      {
        id: "WG-08-MO-Monte-Carlo-Engine",
        slug: "monte-carlo-engine",
        title: "Eigenia CDT Monte Carlo Engine: Technical Investigation",
        titleNl: "Eigenia CDT Monte Carlo-engine: Technische Onderzoek",
        subtitle: "Importance sampling, Markov chain random walks, and financial loss distributions",
        subtitleNl: "Importance sampling, Markov-keten random walks en financiële verliesverdelingen",
        workingGroupId: "WG-08-MO",
        workingGroupName: "Monte Carlo Engine Application",
        workingGroupNameNl: "Monte Carlo-Engine Toepassingen",
        relativePath: "references/WG-08-MO-Monte-Carlo-Application/WG-08-MO-Monte Carlo Engine.md",
        badge: "Monte Carlo",
        badgeNl: "Monte Carlo",
      },
    ],
  },
  {
    id: "MP-MATH",
    title: "Mathematical Physics Models",
    titleNl: "Wiskundige Fysica Modellen",
    number: "MP-MATH",
    badge: "PHYSICS 01–02",
    badgeNl: "FYSICA 01–02",
    description: "The Mathematical Physics Working Group maintains the foundational mathematical ontology governing Eigenia’s Cyber Digital Twin ecosystem. This research codifies 40 fundamental governing equations spanning thermodynamic transport, electrical impedance, control loop stability, and topological risk escape. By applying Kramers escape rate theory to cyber-physical transition states, we calculate the exact probability of an operational asset crossing from stable equilibrium into catastrophic failure. This mathematical baseline ensures all higher-level simulations remain strictly bound to first-principles physics.",
    descriptionNl: "De Werkgroep Wiskundige Fysica beheert de fundamentele wiskundige ontologie van Eigenia's Cyber Digital Twin ecosysteem. Dit onderzoek codificeert 40 fundamentele sturende vergelijkingen over thermodynamisch transport, elektrische impedantie, regelkringstabiliteit en topologische risico-ontsnapping. Door Kramers escape rate-theorie toe te passen op cyber-fysieke overgangstoestanden, berekenen we de exacte waarschijnlijkheid dat een operationeel actief overgaat van een stabiel evenwicht naar een catastrofale storing.",
    documents: [
      {
        id: "MP_Mathematical_Models",
        slug: "cdt-mathematical-models",
        title: "CDT Mathematical Models — Complete Formula Reference",
        titleNl: "CDT Wiskundige Modellen — Volledige Formulereferentie",
        subtitle: "Comprehensive mathematical formulas across layers L0 through L7",
        subtitleNl: "Uitgebreide wiskundige formules over lagen L0 tot en met L7",
        workingGroupId: "MP-MATH",
        workingGroupName: "Mathematical Physics Models",
        workingGroupNameNl: "Wiskundige Fysica Modellen",
        relativePath: "references/MP-Math-Physics-Formula/MP_Mathematical_Models.md",
        author: "Lab Sponsor Resident, j.mckenney",
        badge: "40 Formulas",
        badgeNl: "40 Formules",
      },
      {
        id: "MP_Kramers_Escape_Model",
        slug: "kramers-escape-model",
        title: "Kramers Escape Model: Topological Risk Theory",
        titleNl: "Kramers Ontsnappingsmodel: Topologische Risicotheorie",
        subtitle: "Fokker-Planck potential barriers and stochastic escape rates in critical infrastructure",
        subtitleNl: "Fokker-Planck potentiaalbarrières en stochastische ontsnappingssnelheden in vitale infrastructuur",
        workingGroupId: "MP-MATH",
        workingGroupName: "Mathematical Physics Models",
        workingGroupNameNl: "Wiskundige Fysica Modellen",
        relativePath: "references/MP-Math-Physics-Formula/MP_Kramers_Escape_Model.md",
        author: "H. Mckenney",
        badge: "Kramers Model",
        badgeNl: "Kramers Model",
      },
    ],
  },
  {
    id: "GOV-RES",
    title: "Research Governance & Sourcing Methodology",
    titleNl: "Onderzoeksgovernance & Bronvermeldingsmethodologie",
    number: "GOV-01",
    badge: "GOVERNANCE",
    badgeNl: "GOVERNANCE",
    description: "Standard operating procedures and peer-attribution protocols for Eigenia Labs publications. All external claims, academic literature validations, and external empirical datasets (e.g. Clayton Copulas, Kramers escape models) are cross-referenced and catalogued via valyu searches into references/external-research.",
    descriptionNl: "Standaard operationele procedures en peer-attributieprotocollen voor publicaties van Eigenia Labs. Alle externe claims, academische literatuurvalidaties en externe empirische datasets worden gecatalogiseerd via valyu-onderzoek in references/external-research.",
    documents: [
      {
        id: "README",
        slug: "research-sourcing-governance",
        title: "External Research Sourcing & Attribution Protocol",
        titleNl: "Protocol voor Externe Onderzoeksbronnen & Attributie",
        subtitle: "Traceable claim sourcing, valyu integration, and working group attribution standards",
        subtitleNl: "Traceerbare claimbronvermelding, valyu-integratie en werkgroepattributiestandaarden",
        workingGroupId: "GOV-RES",
        workingGroupName: "Research Governance",
        workingGroupNameNl: "Onderzoeksgovernance",
        relativePath: "references/external-research/README.md",
        author: "Eigenia Labs Governance",
        badge: "Governance",
        badgeNl: "Governance",
      },
    ],
  },
];

export function getAllWorkingGroups(lang: "en" | "nl" = "en"): WorkingGroupCategory[] {
  if (lang === "nl") {
    return WORKING_GROUPS.map(wg => ({
      ...wg,
      title: wg.titleNl || wg.title,
      description: wg.descriptionNl || wg.description,
      badge: wg.badgeNl || wg.badge,
      documents: wg.documents.map(d => ({
        ...d,
        title: d.titleNl || d.title,
        subtitle: d.subtitleNl || d.subtitle,
        badge: d.badgeNl || d.badge,
        workingGroupName: d.workingGroupNameNl || d.workingGroupName
      }))
    }));
  }
  return WORKING_GROUPS;
}

export function getWorkingGroupById(id: string, lang: "en" | "nl" = "en"): WorkingGroupCategory | undefined {
  const wgs = getAllWorkingGroups(lang);
  return wgs.find((wg) => wg.id.toLowerCase() === id.toLowerCase());
}

export function getAllWikiDocuments(lang: "en" | "nl" = "en"): WikiDocumentMeta[] {
  return getAllWorkingGroups(lang).flatMap((wg) => wg.documents);
}

export function getWikiDocumentById(docId: string, lang: "en" | "nl" = "en"): WikiDocumentData | null {
  const allDocs = getAllWikiDocuments(lang);
  let docMeta = allDocs.find(
    (d) => d.id.toLowerCase() === docId.toLowerCase() || d.slug.toLowerCase() === docId.toLowerCase()
  );

  if (!docMeta) {
    docMeta = allDocs.find(
      (d) => d.workingGroupId.toLowerCase() === docId.toLowerCase()
    );
  }

  if (!docMeta) return null;

  // Authoritative content is ALWAYS resolved directly from GENERATED_DOC_CONTENT (compiled from eigenia/references/)
  // Treatises are published in whole; never clipped, never replaced with incomplete stubs.
  const authoritativeContent =
    GENERATED_DOC_CONTENT[docMeta.relativePath] ||
    GENERATED_DOC_CONTENT[docMeta.id] ||
    GENERATED_DOC_CONTENT[docMeta.slug] ||
    GENERATED_DOC_CONTENT[docMeta.workingGroupId] ||
    GENERATED_DOC_CONTENT[docId] ||
    "";

  if (!authoritativeContent) {
    console.error(`Wiki document content not found for ${docMeta.id}`);
    return null;
  }

  const lines = authoritativeContent.split(/\r?\n/);
  const words = authoritativeContent.split(/\s+/).filter(Boolean);

  return {
    ...docMeta,
    content: authoritativeContent,
    contentNl: authoritativeContent, // Always serve 100% complete content; NEVER truncate or clip!
    charCount: authoritativeContent.length,
    lineCount: lines.length,
    wordCount: words.length,
    filePath: docMeta.relativePath,
  };
}

export interface WikiSearchResult {
  doc: WikiDocumentMeta;
  snippet: string;
  matchScore: number;
}

export function searchWikiDocuments(query: string, lang: "en" | "nl" = "en"): WikiSearchResult[] {
  if (!query || !query.trim()) return [];

  const q = query.toLowerCase().trim();
  const results: WikiSearchResult[] = [];

  for (const wg of getAllWorkingGroups(lang)) {
    for (const docMeta of wg.documents) {
      const docData = getWikiDocumentById(docMeta.id, lang);
      if (!docData) continue;

      let score = 0;
      let matchSnippet = "";

      if (docMeta.title.toLowerCase().includes(q)) score += 10;
      if (docMeta.subtitle?.toLowerCase().includes(q)) score += 5;
      if (docMeta.workingGroupName.toLowerCase().includes(q)) score += 3;

      const contentLower = docData.content.toLowerCase();
      const contentIndex = contentLower.indexOf(q);

      if (contentIndex !== -1) {
        score += 2;
        const start = Math.max(0, contentIndex - 40);
        const end = Math.min(docData.content.length, contentIndex + q.length + 60);
        matchSnippet = "..." + docData.content.slice(start, end).replace(/\n/g, " ") + "...";
      }

      if (score > 0) {
        results.push({
          doc: docMeta,
          snippet: matchSnippet || docMeta.subtitle || docMeta.title,
          matchScore: score,
        });
      }
    }
  }

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
