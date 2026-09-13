<!-- verified: 2026-09-13 bf7d4b9 -->
# Tasks

_Last brought current: 2026-09-13 verified against main at `bf7d4b9`. The HTML comment on line 1 is machine-read by `web/scripts/audit-tasks-stamp.mjs` and `scripts/hooks/`; update it every time this file is brought current._
_Counts here are checked against `web/src/lib/wikiRegistry.ts`, not typed from memory._
_Memory of record (decided 2026-09-11): this file and `memory/` at the repo root. `.taskmaster/`, `.remember/`, `.claude/memory.db`, `.swarm/` and the gateway's `memory_store` are tool caches, not sources. Rules: `memory/context/working-agreement.md`._

## Active

- [ ] **Master Scientific Corpus Expansion (Unconstrained Roadmap)** - Phased promotion of candidate monographs across Hyperscale (8 chapters), TACAM (3 chapters), Multi-BOM CRA (5 chapters), Research Equations (7 chapters), and OT Workbooks (3 chapters). Mandatory gates: 5 rounds of sequential thinking per paper, Valyu research for gaps, J. McKenney primary author, 0 ASCII art, 0 broken LaTeX, IMRAD long-form prose, bilingual metadata, and strict MPN quarantine.
  - [x] **Batch 1 (High-Impact Triad Promoted to 80 Treatises)**:
    - `WG-06-SC-02`: OT Hardware CRA Applicability & Cyber Resilience Act Compliance Architecture
    - `WG-07-TM-06`: Algorithmic Random Walks, Thermodynamic Boltzmann Shocks & Taleb Extremes in OT Graphs
    - `MP-MATH-03`: Cellular Sheaf Cohomology & Topological Fault Detection in Industrial Infrastructure
  - [x] **Batch 2 (OT Architecture & Human-Cyber Triad Promoted to 83 Treatises)**:
    - `WG-02-DT-Tier-Redundancy-Common-Mode-Failures`: Tier Classification, Redundancy Topologies & Common-Mode Failures
    - `WG-01-UI-Concept-of-Operations-Minimum-Operating-Requirements`: Concept of Operations (ConOps) & Minimum Operating Requirements (MoR)
    - `WG-03-ML-Organisational-Engineering-OT-Security`: Organisational Engineering for OT Security: Operational Authority & Cognitive Load
  - [x] **Batch 3 (Physics & Quantitative Rigor Triad Promoted to 86 Treatises)**:
    - `MP-MATH-04-Thermodynamic-Entropy-Production-Grid-Failures`: Thermodynamic Entropy Production & Irreversible Dissipation in Cascading Grid Failures
    - `WG-05-CAD-DEXPI-CycloneDX-Joint-Graph-Validation`: DEXPI 2.0 Extended Semantic Schema & CycloneDX 1.6 Hardware BOM Joint Graph Validation
    - `WG-03-ML-GNN-Process-Anomaly-Localization`: Gated Graph Neural Networks & Temporal Graph Attention for Real-Time Process Anomaly Localization
  - [x] **Batch 4 (Corpus Scaling Triad Promoted to 89 Treatises)**:
    - `WG-06-SC-03-Automated-CRA-Article-14-Reporting`: Automated CRA Article 14 Reporting: Machine-Verifiable 24-Hour CSIRT Notifications and VEX/VDR Pipelines
    - `WG-04-CF-Percolation-Thresholds`: Percolation Thresholds & Discontinuous Phase Transitions in Interdependent Utilities
    - `WG-07-TM-Epidemic-Threshold-OT-Conduits`: Epidemic Thresholds & Spectral Radius Dynamics in Industrial OT Conduits
  - [x] **Batch 5 (Advanced Theoretical & Topological Triad Promoted to 92 Treatises)**:
    - `MP-MATH-05-Gauge-Symmetries-Topological-Currents-OT-Microgrids`: Non-Abelian Gauge Symmetries & Conserved Topological Currents in Interconnected OT Microgrids
    - `WG-02-DT-Antifragile-Topologies-Convex-Response`: Antifragile OT Network Topologies: Convex Response to Adversarial Shock and Self-Stabilizing Microgrids
    - `WG-05-CAD-Category-Theoretic-Functors-DEXPI-CycloneDX`: Category-Theoretic Functors between DEXPI 2.0 P&ID Topologies and CycloneDX 1.6 5-BOM Schemas
  - [ ] **Batch 6 (Sovereign Infrastructure & Kinetic Assurance Triad to 95 Treatises)**:
    - `WG-01-UI-05`: Non-Linear Actuarial Damage Functions & Clayton Copula Tail Dependency in Interconnected Power Outages
    - `WG-04-CF-10`: NSW Transmission Network Frequency Instability & Synthetic Inertia Deficit under High-Penetration IBR
    - `WG-10-AN-07`: Cryptographic Root-of-Trust & Hardware Attestation in IEC 62443 Certified Substation Gateways
- [ ] **Wire PretotypeExperimentModal** - bound to `useContactForm`, imported by no page (re-verified 2026-09-11: 0 importers)
- [ ] **`feat/what-eigenia-does`** - branch cut from main, 0 commits, no local edits. State its intent here or delete it
- [ ] **Push `chore/memory-enforcement` and open the PR** - branch is prepared in the working tree (Cowork could not commit: `.git/index.lock` cannot be removed from its shell). Jim: `rm .git/index.lock`, `git checkout -b chore/memory-enforcement`, `git add -A -- TASKS.md memory CLAUDE.md .claude/settings.json .gitignore scripts/hooks web/scripts/audit-tasks-stamp.mjs .github/workflows/ci.yml documentation/TESTING.md`, commit, push, PR
- [ ] **Home page: Stitch delta note** - `notes/<date>/home-stitch-delta.md` from `.stitch/designs/b89d8258…_home_unified_engagement.html` against `web/src/app/page.tsx`, per working-agreement §3; then one PR per section, hero first

## Waiting On

- [ ] **Confirm production after the 2026-09-10 deploys** - main has moved four merges past #18 (#21 next 16 + postcss, #23 nodemailer 9.1.1, #24 contact-endpoint validation and rate limiting, #26 vitest 4.1.11). Check on eigenia.nl: `9 Research Tracks` on the homepage, `ISO 15926-4` on `/unified-standard`, the contact form still delivers to jim@eigenia.nl after #24

## Someday

- [ ] **Sync the duplicated atq-card-terminal.html** - two copies, currently byte-identical; nothing keeps them that way
- [ ] **Decide on eigenia.com** - named in the Impressum, still referenced once in `site.ts`, not wired
- [ ] **Dutch treatise bodies** - 63 documents; a content project, deliberately deferred
- [ ] **Component tests** - zero component test files; nothing renders React and asserts on output, so the browser check stays mandatory
- [ ] **Spelled-out counts** - `audit-counts.mjs` matches digits only, so "nine Research Tracks" would pass
- [ ] **Stale local branches** - 17 local branches, most merged (deps/*, fix/*, feat/ascii-to-mermaid, docs/readme-accuracy, chore/taskmaster-tracking, pr1-local, probe/next16). Prune after confirming each is merged

## Done

### 2026-09-13
- [x] **Batch 5 Publication: Advanced Theoretical & Topological Triad (92 Treatises)** - Promoted and integrated 3 foundational treatises (`MP-MATH-05-Gauge-Symmetries-Topological-Currents-OT-Microgrids`, `WG-02-DT-Antifragile-Topologies-Convex-Response`, `WG-05-CAD-Category-Theoretic-Functors-DEXPI-CycloneDX`) with 15 rounds of sequential thinking, Valyu citations, J. McKenney primary attribution, KaTeX math formulas, and 100% accessible Mermaid diagrams; expanded catalog to 92 treatises across 11 Working Groups; updated registry, papers hub, and translations; passed 11/11 audit gates, Vitest, and TypeScript.
- [x] **Batch 4 Publication: Corpus Scaling Triad (89 Treatises)** - Promoted and integrated 3 foundational treatises (`WG-06-SC-03-Automated-CRA-Article-14-Reporting`, `WG-04-CF-Percolation-Thresholds-Interdependent-Collapse`, `WG-07-TM-Epidemic-Threshold-OT-Conduits`) with 15 rounds of sequential thinking, Valyu citations, J. McKenney primary attribution, KaTeX math formulas, and 100% accessible Mermaid diagrams; expanded catalog to 89 treatises across 11 Working Groups; updated registry, papers hub, and translations; passed 11/11 audit gates, Vitest, and TypeScript.
- [x] **Batch 3 Publication: Physics & Quantitative Rigor Triad (86 Treatises)** - Promoted and integrated 3 foundational treatises (`MP-MATH-04-Thermodynamic-Entropy-Production-Grid-Failures`, `WG-05-CAD-DEXPI-CycloneDX-Joint-Graph-Validation`, `WG-03-ML-GNN-Process-Anomaly-Localization`) with 15 rounds of sequential thinking, Valyu citations, J. McKenney primary attribution, KaTeX math formulas, and 100% accessible Mermaid diagrams; expanded catalog to 86 treatises across 11 Working Groups; updated registry, papers hub, and translations; passed 11/11 audit gates, Vitest, and TypeScript.
- [x] **Batch 2 Publication: OT Architecture & Human-Cyber Triad (83 Treatises)** - Promoted and integrated 3 foundational treatises (`WG-02-DT-Tier-Redundancy-Common-Mode-Failures`, `WG-01-UI-Concept-of-Operations-Minimum-Operating-Requirements`, `WG-03-ML-Organisational-Engineering-OT-Security`) with 15 rounds of sequential thinking, Valyu citations, J. McKenney primary attribution, KaTeX math formulas, and 100% accessible Mermaid diagrams; expanded catalog to 83 treatises across 11 Working Groups; updated registry, papers hub, and translations; passed 11/11 audit gates, Vitest, and TypeScript.
- [x] **Canonical Treatises Hub (`/papers`) & Batch 1 Publication (80 Treatises)** - Delivered canonical research hub with filterable matrix, bento view, deep search, working group pills, and bilingual EN/NL support; drafted and promoted Batch 1 triad (`WG-06-SC-02`, `WG-07-TM-06`, `MP-MATH-03`) with 5 rounds of sequential thinking, Valyu citations, J. McKenney primary attribution, and 0 missing prose lines; updated catalog count to 80 treatises across 11 Working Groups; passed all 11 audit gates, Vitest, and TypeScript.

### 2026-09-12
- [x] **Workspace hygiene & untracked assets triage** - triaged and committed remaining untracked root assets: `.env.example`, `.stitch/designs/`, `assets/backgrounds/` extraction scripts, `data/jurisdictions/` (250 country statutory datasets), `database/migrations/`, `docs/superpowers/plans/`, `notes/` (session deconstructions), and `research/g-cpdt-unified-standard/` (6-part publication master plan); removed stale `_to_delete/`; restored all active editor draft paths in `papers-pre-publish/` (`TACAM-walks.md`, `TACAM-technical-walks.md`, `DEXPI2_SPECS.md`, `DEXPI2__spec_`).
- [x] **Pre-publish triage & core treatise publication** - triaged `papers-pre-publish/`, safely removed empty scraps and identical duplicates; promoted 4 foundational treatises into `references/` (`WG-02-DT-Seven-Layer-Architecture`, `WG-01-UI-Actor-Threat-Quotient-Production`, `WG-05-CAD-Substation-BESS-Graph-Topology`, `WG-07-TM-Black-Swan-Simulation`); expanded wiki catalog from 73 to 77 treatises across 11 Working Groups; synced `wikiRegistry.ts`, `papers.ts`, `translations.ts`, and documentation; verified all 11 audit gates, TypeScript, Vitest, and Turbopack static build.
- [x] **Tracks header bilingual support** - wired `t()` translation keys (`tracks_page_eyebrow`, `tracks_page_title`, `tracks_page_desc`, `tracks_open_wiki_btn`, etc.) into `web/src/app/tracks/page.tsx` and symmetrical keys in `web/src/locales/translations.ts`. Verified with Playwright visual snapshot tests across EN/NL and light/dark modes.

### 2026-09-10
- [x] **Dependency and hardening PRs** (#21, #23, #24, #26) - next ^16.3.4, nodemailer ^9.1.1, vitest ^4.1.11; `/api/contact` now validates and rate-limits (`0b92c11`)
- [x] **Dependabot sharp PR #1** - overtaken: `package.json` now carries sharp ^0.35.4 via `deps/next-sharp-security` (merged into main)

### 2026-09-09
- [x] **Merge PR #19** (`2ba29ab`) - six dead components deleted, `audit-translation-keys.mjs` added
- [x] **Railway deploy of #17 and #18** - superseded by the 2026-09-10 deploys; verification moved to Waiting On
- [x] **ASCII art to mermaid** (#12, #13) - 51 fenced diagrams converted or retired; 91 mermaid diagrams now, all carrying `accTitle`/`accDescr`; `audit-ascii-art.mjs` added with a keep-list for the four deliberate exceptions
- [x] **README corrected** (#14) - said 25 treatises across 8 working groups against a real 63 and 9; directory tree rebuilt; gates documented; `localhost:3000` corrected to 4500
- [x] **Taxonomy unified** (#15, #17) - `paper.category` (51 of 63 contradicting their group) and `paper.number` (41 of 63) deleted; `Track N //` labels removed; convention settled as **Research Track = the section and route, Working Group = the entity**
- [x] **Two new gates** (#17) - `audit-terminology.mjs` extended to `web/src`, `audit-counts.mjs` added; between them they found 7 bare `ISO 15926` mentions and 2 stale counts on first run
- [x] **Railway build fix** (#18) - `audit-counts.mjs` compared paths literally and broke the Docker build while CI stayed green
- [x] **Task Master registry committed** (#16) - `.taskmaster/` in the repo
- [x] **Decide the four memory systems** - decided 2026-09-11: memory of record moved **into the repo** (`TASKS.md`, `memory/`, working-memory block in `CLAUDE.md`) so Claude Code auto-loads it, hooks enforce the write, and CI checks the stamp; `projects-bundle/eigenia-website` is now a pointer
- [x] **Land the uncommitted work** - was clean on 2026-09-09; 23 new untracked files since, tracked above as "Triage the 23 untracked files"
