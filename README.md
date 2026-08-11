# Eigenia B.V. & Eigenia Labs

> **Applied Complexity Science Think Tank & Cyber-Physical Risk Actuarial Engine**  
> *Amsterdam, The Netherlands • KvK Registered Private Limited Company*

---

## Executive Summary & Sovereign Mission

**Eigenia B.V.** and **Eigenia Labs** exist to safeguard vital societal infrastructure—**Clean Water, Healthy Food, and Sustainable Energy**—by replacing fragile compliance checklists with reproducible mathematical physics, open standards, and catastrophe-calibrated risk models.

Conventional cybersecurity frameworks rely on independent Bernoulli trial assumptions. In physical industrial plants (power plants, drinking water facilities, agricultural logistics hubs), operational failures exhibit strong lower tail dependence (\(\lambda_L > 0\)). When a SCADA PLC controller or turbine trips under stress, adjacent control loops experience immediate cascading failure.

Eigenia's digital twin platform combines **Gated Graph Neural Networks (GGNN)**, **Lacanian Psychometric Tensors**, **Clayton Copulas**, and **Kramers Barrier Escape Models** to compute real-time physical risk trajectories and enforce state-backed cyber war exclusions.

---

## Tech Stack & Architecture

The application is engineered for ultra-high performance, dark/light theme flexibility, KaTeX mathematical rendering, and containerized deployment:

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) | React 19 Server & Client Components with Standalone Build output |
| **Language** | TypeScript 5 | Strict type checking across components, routes, and translations |
| **Styling** | Tailwind CSS v4 | Custom design system with light (`#FAF8F5`) and dark (`#0B0C0E`) theme variables |
| **Typesetting** | KaTeX (`remark-math`, `rehype-katex`) | Native LaTeX mathematical formula rendering for equations |
| **Animations** | Framer Motion & Lucide Icons | Smooth micro-interactions, layout transitions, and icon UI |
| **Intake API** | Next.js App Router (`/api/contact`) | Direct JSON intake & mailto dispatching to `jim@eigenia.nl` |
| **Localization** | Custom Context (`LanguageContext`) | Full English (EN) and Dutch (NL) bilingual support |
| **Containerization** | Docker & Docker Compose | Multi-stage Alpine containerization for standalone production |
| **Cloud Hosting** | Railway & Docker | Production-ready edge deployment |

---

## Site Map & Route Hierarchy

```
/ (Home)
├── /mission                        [Standalone Route: Sovereign Mission & Skin-in-the-Game]
├── /tracks                         [Standalone Route: 7 Research Tracks Catalogue]
├── /physics                        [Standalone Route: 9 Applied Physics Models Catalogue]
├── /collaborate                    [Standalone Route: Proposal Intake & Board Briefings]
│
├── /theory/[slug]                  [Dynamic Route: Applied Physics Deep Dives]
│   ├── /theory/aeon-ggnn-gated-graph
│   ├── /theory/l0-l1-gap-calculus
│   ├── /theory/mckenney-lacan-psychometric-tensor
│   ├── /theory/interaction-hamiltonian
│   ├── /theory/kramers-barrier-escape
│   ├── /theory/sir-compartmental-model
│   ├── /theory/clayton-copula-actuarial
│   ├── /theory/hawkes-self-exciting-process
│   └── /theory/pareto-pot-evt-model
│
└── /papers/[slug]                  [Dynamic Route: Long-Form Treatises & Research Papers]
    ├── /papers/taleb-fooled-by-randomness (Treatise I - V Series)
    ├── /papers/dexpi-cyclonedx-standards
    ├── /papers/4-underwriter-cyber-risk-underwriting
    ├── /papers/tacam-deep-dive
    ├── /papers/atq-deep-dive
    ├── /papers/monte-carlo-engine
    └── /papers/death-wobble-frequency-instability
```

---

## Intake & Administration Architecture

All contact forms, pretotype modals (S-Curve Audit, Telemetry Sandbox, Executive Briefings), and CTA buttons route directly to **`jim@eigenia.nl`**.

### Submission Flow:
1. **Client Intake (`/collaborate` & `PretotypeExperimentModal`):** Captures user inputs (Name, Institutional Email, Entity Name, Engagement Pathway, Target Track, and Technical Overview).
2. **Server-Side Intake Endpoint (`/api/contact`):** Next.js API route handler receives POST requests, validates fields, and records log entries targeted for `jim@eigenia.nl`.
3. **Mailto Dispatching & Fallback:** Client automatically dispatches a pre-filled mailto draft to `jim@eigenia.nl?subject=...&body=...` and displays a direct backup intake link to `jim@eigenia.nl`.

---

## Codebase Directory Structure

```
eigenia/
├── README.md                          # Master project documentation
├── DEPLOYMENT.md                      # Step-by-step Docker & Railway deployment guide
├── .gitignore                         # Git exclusion configuration
│
├── papers/                            # Raw scientific treatises and research papers
│   ├── Cascading Failure Hypothesis.md
│   ├── Death Wobble-The Grids Precarious Pulse Frequency Instability.md
│   ├── 12_Monte Carlo Engine.md
│   └── OXOT Cyber Digital Twin Series - *.md
│
├── references/                        # Insurance, underwriter, and mathematical models
│   ├── 1_underwriter_insurance/
│   ├── Kramers_Escape_Model.md
│   ├── Lacanian_Psychohistory_Framework.md
│   └── Paradigm_Suite.md
│
└── web/                               # Next.js 15 Web Application
    ├── Dockerfile                     # Multi-stage production build container
    ├── docker-compose.yml             # Docker compose service configuration
    ├── package.json                   # Node dependencies and scripts
    ├── next.config.ts                 # Next.js configuration
    │
    └── src/
        ├── app/                       # App Router page routes & API endpoints
        │   ├── api/contact/route.ts   # Intake API route for jim@eigenia.nl
        │   ├── collaborate/page.tsx   # Proposal intake page
        │   ├── mission/page.tsx       # Sovereign mission page
        │   ├── physics/page.tsx       # Applied physics catalogue
        │   ├── tracks/page.tsx        # Research tracks catalogue
        │   ├── theory/[slug]/page.tsx # Applied physics deep dives
        │   └── papers/[slug]/page.tsx # Long-form treatises viewer
        │
        ├── components/                # React UI components & modals
        │   ├── Navbar.tsx             # Title Case top navbar & light/dark toggle
        │   ├── MarkdownViewer.tsx     # Full markdown & KaTeX formula renderer
        │   ├── TheoryCatalogue.tsx    # Applied physics models registry
        │   ├── LabsShowcase.tsx       # R&D showcase component
        │   ├── PretotypeExperimentModal.tsx # Interactive audit & briefing modal
        │   ├── ImpressumModal.tsx     # EU statutory legal disclosure
        │   └── EuComplianceFooter.tsx # EU compliance footer with intake links
        │
        ├── context/                   # Global React state context
        │   ├── ThemeContext.tsx       # Light & Dark mode switcher
        │   └── LanguageContext.tsx    # English (EN) & Dutch (NL) translation provider
        │
        └── locales/
            └── translations.ts        # Comprehensive bilingual dictionary
```

---

## Developer Guide & Local Setup

### Prerequisites
- **Node.js**: v20.0.0 or higher
- **npm**: v10.0.0 or higher
- **Docker**: (Optional) v24.0.0 or higher

### Local Installation & Running

```bash
# 1. Clone repository
git clone https://github.com/planet9v/eigenia.git
cd eigenia/web

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:3000
```

### Building for Production

```bash
# Compile TypeScript and build Next.js production bundle
npm run build

# Start production server locally
npm run start
```

---

## Deployment Guides

For step-by-step instructions on deploying with **Docker Containerization** or **Railway Edge Deployment**, please see [DEPLOYMENT.md](file:///Users/jimmcknney/jim_private/eigenia/DEPLOYMENT.md).

---

## Contact & Statutory Legal Notice

**Eigenia B.V.**  
Herengracht 450, 1017 CA Amsterdam, The Netherlands  
**Direct Board Intake:** [jim@eigenia.nl](mailto:jim@eigenia.nl)  
**KvK Registered B.V. (Amsterdam, NL)** • BTW/VAT ID: `NL865421908B01`
