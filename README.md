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
| **Styling** | Tailwind CSS v3.4 | Custom design system with light (`#FAF8F5`) and dark (`#0B0C0E`) theme variables |
| **Typesetting** | KaTeX (called directly) | `MarkdownViewer.tsx` is a hand-written parser calling `katex.renderToString()`. There is no `remark`/`rehype` pipeline; those packages are not dependencies |
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
├── /theory                         [Standalone Route: Applied Physics Models Index]
├── /collaborate                    [Standalone Route: Proposal Intake & Board Briefings]
├── /unified-standard               [Standalone Route: DEXPI 2.0 + CycloneDX Unification]
├── /wiki                           [Standalone Route: Sovereign Research Wiki — 63 Treatises, 9 Working Groups]
│
├── /sitemap.xml                    [Generated: app/sitemap.ts]
├── /robots.txt                     [Generated: app/robots.ts]
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
1. **Client Intake (`/collaborate`):** Captures user inputs (Name, Institutional Email, Entity Name, Engagement Pathway, Target Track, and Technical Overview) via the shared `useContactForm` hook. `PretotypeExperimentModal` uses the same hook and is ready to go, but is **not currently imported by any page** — see [documentation/KNOWN_ISSUES.md](./documentation/KNOWN_ISSUES.md).
2. **Server-Side Intake Endpoint (`/api/contact`):** Next.js API route handler receives POST requests and dispatches real email via Hostinger SMTP (`web/src/lib/mailer.ts`) to `jim@eigenia.nl`.
3. **Mailto Fallback:** The client also dispatches a pre-filled mailto draft to `jim@eigenia.nl?subject=...&body=...` regardless of send outcome; if the SMTP send fails, a visible error banner shows so the failure isn't silent.

---

## Codebase Directory Structure

```
eigenia/
├── README.md                          # This file — project overview
├── CLAUDE.md                          # Agent rules — build artifacts, sourcing, style invariants
├── documentation/                     # Developer & support docs — see documentation/README.md
├── .gitignore                         # Git exclusion configuration
│
├── .github/workflows/ci.yml           # Audits, unit tests, types-and-build on every push
├── .githooks/pre-push                 # Local gate: tsc, quick audits, unit tests
│
├── references/                        # Working-group treatises & sourced external research (load-bearing — see documentation/ARCHITECTURE.md)
│   ├── WG-01-UI-Underwriter-insurance/
│   ├── WG-02-DT-Digital-Twin/
│   ├── WG-03-ML-Behaviorial_Modeling/
│   ├── WG-04-CF-Cascading-Failures/
│   ├── WG-05-CAD-DEXPI-2/
│   ├── WG-07-TM-Threat-Modeling/
│   ├── WG-08-MO-Monte-Carlo-Application/
│   ├── MP-Math-Physics-Formula/
│   ├── external-research/             # Sourced-but-not-WG-authored material, one file per source
│   └── ... (9 working groups, 63 treatises total)
│
├── scripts/                           # 20 compile_*.py build artifacts — each OVERWRITES a references/*.md
│                                      # Check ownership before editing any treatise: grep -rln "<file>" scripts/
├── papers-pre-publish/                # Source manuscripts; compile_r01/r03/r04 read from here at runtime
├── notes/<YYYY-MM-DD>/                # Dated session scratch: task_plan.md, findings.md, progress.md
├── reference_arches/                  # Reference facility architectures
├── assets/                            # Background art and generators
│
└── web/                               # Next.js 15 Web Application
    ├── Dockerfile                     # Local-only container build — NOT what Railway uses, see documentation/DEPLOYMENT.md
    ├── docker-compose.yml             # Docker compose service configuration (local-only)
    ├── package.json                   # Node dependencies and scripts (`npm run verify` runs everything)
    ├── next.config.ts                 # Next.js configuration
    │
    ├── scripts/                       # Build-time sync and the audit suite
    │   ├── run-audits.mjs             # Discovers audit-*.{js,mjs} by filename; CI, prebuild and pre-push all use it
    │   ├── known-failures.json        # The ratchet: frozen failures may shrink, never grow
    │   ├── ascii-art-keep.json        # Blocks deliberately left as drawn art, with reasons
    │   ├── audit-ascii-art.mjs        # Flags box-drawing art in published documents
    │   ├── audit-mermaid.mjs          # Parses every diagram; requires accTitle and accDescr
    │   ├── audit-citations.mjs        # Citation markers must resolve
    │   ├── audit-terminology.mjs      # One term, one meaning across the corpus
    │   ├── audit-featured.mjs         # Homepage featured-findings invariants
    │   ├── audit-publications.js      # Registry word counts match the files
    │   ├── audit-rendered-completeness.js # Source prose vs the rendered page (needs a dev server)
    │   ├── sync-publications.js       # references/*.md -> generatedReferencesContent.json
    │   └── stamp-build.mjs            # Rotates which featured finding leads the homepage
    │
    └── src/
        ├── app/                       # App Router page routes & API endpoints
        │   ├── api/contact/route.ts   # Intake API route, sends via Hostinger SMTP
        │   ├── collaborate/page.tsx   # Proposal intake page
        │   ├── mission/page.tsx       # Sovereign mission page
        │   ├── physics/page.tsx       # Applied physics catalogue
        │   ├── tracks/page.tsx        # Research tracks catalogue
        │   ├── theory/page.tsx        # Applied physics models index
        │   ├── unified-standard/page.tsx # DEXPI 2.0 + CycloneDX unification
        │   ├── wiki/page.tsx          # Sovereign Research Wiki dashboard
        │   ├── theory/[slug]/page.tsx # Applied physics deep dives
        │   ├── papers/[slug]/page.tsx # Long-form treatises viewer + ScholarlyArticle JSON-LD
        │   ├── sitemap.ts             # Generated /sitemap.xml
        │   └── robots.ts              # Generated /robots.txt
        │
        ├── components/                # React UI components & modals
        │   ├── SiteChrome.tsx         # Shared Navbar/Footer/Modal wrapper — see documentation/ARCHITECTURE.md
        │   ├── Navbar.tsx             # Title Case top navbar & light/dark toggle
        │   ├── Hero.tsx               # Homepage hero — scoped-dark background pattern
        │   ├── MarkdownViewer.tsx     # Full markdown & KaTeX formula renderer
        │   ├── MermaidDiagram.tsx     # Lazy-loaded mermaid renderer and its shared theme config
        │   ├── TheoryCatalogue.tsx    # Applied physics models registry
        │   ├── home/                  # FeaturedFindingsBand, WorkingGroupsStrip
        │   ├── theory-diagrams/       # Inline SVG diagram per physics model
        │   ├── PretotypeExperimentModal.tsx # Interactive audit & briefing modal
        │   ├── ImpressumModal.tsx     # EU statutory legal disclosure
        │   └── EuComplianceFooter.tsx # EU compliance footer with intake links
        │
        ├── lib/
        │   ├── papers.ts              # Slug → references/*.md path lookup for /papers
        │   ├── wiki.ts                # Slug → references/*.md content (pulls the 3.3 MB bundle — never import from the homepage)
        │   ├── wikiRegistry.ts        # Metadata only: titles, authors, dates, working groups, featured hooks
        │   ├── theoryModels.ts        # Applied physics model registry
        │   ├── site.ts                # Canonical SITE_URL
        │   ├── buildStamp.ts          # Generated by stamp-build.mjs — do not edit
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

## Testing

`cd web && npm run verify` runs everything: sync, typecheck, audit suite, unit
tests. See [documentation/TESTING.md](documentation/TESTING.md).
