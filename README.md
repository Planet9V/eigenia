# Eigenia B.V. & Eigenia Labs

> **Applied Complexity Science Think Tank & Cyber-Physical Risk Actuarial Engine**  
> *Amsterdam, The Netherlands • KvK Registered Private Limited Company*

---

## Executive Summary & Sovereign Mission

**Eigenia B.V.** and **Eigenia Labs** exist to safeguard vital societal infrastructure—**Clean Water, Healthy Food, and Sustainable Energy**—by replacing fragile compliance checklists with reproducible mathematical physics, open standards, and catastrophe-calibrated risk models.

Conventional cybersecurity frameworks rely on independent Bernoulli trial assumptions. In physical industrial plants (power plants, drinking water facilities, agricultural logistics hubs), operational failures exhibit strong lower tail dependence (\(\lambda_L > 0\)). When a SCADA PLC controller or turbine trips under stress, adjacent control loops experience immediate cascading failure.

Eigenia's digital twin platform combines **Gated Graph Neural Networks (GGNN)**, **Lacanian Psychometric Tensors**, **Clayton Copulas**, and **Kramers Barrier Escape Models** to compute real-time physical risk trajectories and enforce state-backed cyber war exclusions.

---

## Documentation

Developer and support documentation lives in [`documentation/`](./documentation/README.md) — architecture, deployment, content-authoring guide, and known issues. Start there for anything beyond this overview.

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
├── /wiki                           [Standalone Route: Sovereign Research Wiki — 25 Treatises, 8 Working Groups]
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
1. **Client Intake (`/collaborate` & `PretotypeExperimentModal`):** Captures user inputs (Name, Institutional Email, Entity Name, Engagement Pathway, Target Track, and Technical Overview) via the shared `useContactForm` hook.
2. **Server-Side Intake Endpoint (`/api/contact`):** Next.js API route handler receives POST requests and dispatches real email via Hostinger SMTP (`web/src/lib/mailer.ts`) to `jim@eigenia.nl`.
3. **Mailto Fallback:** The client also dispatches a pre-filled mailto draft to `jim@eigenia.nl?subject=...&body=...` regardless of send outcome; if the SMTP send fails, a visible error banner shows so the failure isn't silent.

---

## Codebase Directory Structure

```
eigenia/
├── README.md                          # This file — project overview
├── documentation/                     # Developer & support docs — see documentation/README.md
├── .gitignore                         # Git exclusion configuration
│
├── references/                        # Working-group treatises & sourced external research (load-bearing — see documentation/ARCHITECTURE.md)
│   ├── WG-01-UI-Underwriter-insurance/
│   ├── WG-02-DT-.../
│   ├── external-research/             # Sourced-but-not-WG-authored material, one file per source
│   └── ... (8 working groups, 25 treatises total)
│
└── web/                               # Next.js 15 Web Application
    ├── Dockerfile                     # Local-only container build — NOT what Railway uses, see documentation/DEPLOYMENT.md
    ├── docker-compose.yml             # Docker compose service configuration (local-only)
    ├── package.json                   # Node dependencies and scripts
    ├── next.config.ts                 # Next.js configuration
    │
    └── src/
        ├── app/                       # App Router page routes & API endpoints
        │   ├── api/contact/route.ts   # Intake API route, sends via Hostinger SMTP
        │   ├── collaborate/page.tsx   # Proposal intake page
        │   ├── mission/page.tsx       # Sovereign mission page
        │   ├── physics/page.tsx       # Applied physics catalogue
        │   ├── tracks/page.tsx        # Research tracks catalogue
        │   ├── wiki/page.tsx          # Sovereign Research Wiki dashboard
        │   ├── theory/[slug]/page.tsx # Applied physics deep dives
        │   └── papers/[slug]/page.tsx # Long-form treatises viewer
        │
        ├── components/                # React UI components & modals
        │   ├── SiteChrome.tsx         # Shared Navbar/Footer/Modal wrapper — see documentation/ARCHITECTURE.md
        │   ├── Navbar.tsx             # Title Case top navbar & light/dark toggle
        │   ├── Hero.tsx               # Homepage hero — scoped-dark background pattern
        │   ├── MarkdownViewer.tsx     # Full markdown & KaTeX formula renderer
        │   ├── TheoryCatalogue.tsx    # Applied physics models registry
        │   ├── theory-diagrams/       # Inline SVG diagram per physics model
        │   ├── PretotypeExperimentModal.tsx # Interactive audit & briefing modal
        │   ├── ImpressumModal.tsx     # EU statutory legal disclosure
        │   └── EuComplianceFooter.tsx # EU compliance footer with intake links
        │
        ├── lib/
        │   ├── papers.ts              # Slug → references/*.md path lookup for /papers
        │   ├── wiki.ts                # Slug → references/*.md path lookup for /wiki
        │   ├── mailer.ts              # Hostinger SMTP transporter
        │   └── useContactForm.ts      # Shared contact-form submit/error-state hook
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
git clone https://github.com/Planet9V/eigenia.git
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

For step-by-step instructions on local Docker setup, required environment variables, and how production deploys on Railway, see [documentation/DEPLOYMENT.md](./documentation/DEPLOYMENT.md).

---

## Contact & Statutory Legal Notice

**Eigenia B.V.**  
Herengracht 450, 1017 CA Amsterdam, The Netherlands  
**Direct Board Intake:** [jim@eigenia.nl](mailto:jim@eigenia.nl)  
**KvK Registered B.V. (Amsterdam, NL)** • BTW/VAT ID: `NL865421908B01`
