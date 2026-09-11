# Eigenia website

## What it is
Next.js 15 (App Router) + TypeScript 5 + Tailwind v3.4 + KaTeX + Framer Motion, bilingual EN/NL, Dockerised, deployed on Railway at https://eigenia.nl. Routes: / , /mission, /tracks, /physics, /collaborate, /wiki, /unified-standard, /theory/[slug] (nine physics models), /papers/[slug] (treatises). Intake forms post to /api/contact → Hostinger SMTP → jim@eigenia.nl, with a mailto fallback.

## Content model
- `references/<WG-code>-…/*.md` are the published treatises (63 registered treatises across 9 working groups, synced at build time; verified against `web/src/lib/wikiRegistry.ts`, not typed by hand).
- `references/external-research/` holds one file per external source, named `<WG-code>_<topic>_<YYYYMMDD>.md`.
- `papers-pre-publish/` (169 files) is the live input to the r-series compilers — not a draft gate.
- Root research files: WP00_Thesis.md (CyHAZOPs), WP01_systems_research.md, WP06_systems_research.md, WP01_WP06_WP07_cve_research.md, WP01_WP06_WP07_standards_research.md; DIGITAL_TWIN_SERIES.md; BUSINESS_CASE.md; LAUNCH_POST.md (EN/NL LinkedIn launch text).
- Brand assets: `assets/` (SVG banners, logos, light/dark), plus PNG banners at the root.

## Status (9 Sep 2026, late morning)
- Working tree clean, 0 uncommitted files. Nine PRs merged today: #10 through #18.
- **63 treatises, 9 working groups, 91 mermaid diagrams, 9 audits.**
- Taxonomy settled: **Research Track names the section and the route, Working Group names the entity.** Three competing taxonomies were deleted rather than corrected: `paper.category` (51 of 63 documents contradicted their group), `paper.number` (41 of 63), and a dead `nav_track1..7` block asserting a count of 7.
- Gates now in `web/scripts/`: ascii-art, citations, counts, featured, mermaid, publications, rendered-completeness, terminology, translation-keys. `known-failures.json` is empty; nothing frozen.
- Two Railway build failures today, both from a path assumption that passed CI and broke Docker. First fixed with `scripts/lib/references-dir.mjs`; second (`audit-counts.mjs`) fixed in #18. **Any new audit must be checked against the Docker layout, where `COPY web ./` puts `web/*` at `/app`.**
- Latest notes folder: `notes/2026-09-08/`.

## Open items (verified 2026-09-09, not inherited)
- **PR #19 open**: deletes six dead components and adds `audit-translation-keys.mjs`. The old note said "seven unreferenced components with ~26 missing keys"; measured, it was six, holding 20 keys defined in neither language. `Pillars` was listed as dead and looked live on a first grep, but those matches were comments, not imports.
- **`t` is typed `(key: string) => string`**, so the compiler never catches a missing translation key; a missing key renders as the raw key. Many calls were written `t("key" as any)`, a cast that suppresses nothing because the parameter is already `string`. Removed in #19 and gated.
- **`/tracks` header is hardcoded English** on a bilingual site: eyebrow, h1 and body do not use `t()`. Confirmed live in NL mode on production.
- **PretotypeExperimentModal** is correctly wired to `useContactForm` but imported by no page.
- **Dutch wiki pages serve English bodies by design**; translating 63 treatises is a content project.
- **No component tests.** Nothing renders React and asserts on output, so the browser check stays mandatory.
- `references/WG-07-TM-Threat-Modeling/atq-card-terminal.html` duplicates `web/public/terminals/atq-card-terminal.html`; currently byte-identical, nothing keeps them so.
- eigenia.com is named in the Impressum and referenced once in `site.ts`, but not wired.

## Decisions recorded in the repo
- One authoritative source per document (no NL translations of bodies).
- No draft → review → publish gate; polish and rendering are what is enforced.
- Scratch notes live only in `notes/<YYYY-MM-DD>/`.
- Metadata URLs derive from SITE_URL (eigenia.nl).
