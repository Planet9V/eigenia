# Known Issues

Things that are flagged and understood but not yet fixed. Check here
before assuming something you just noticed is a fresh bug.

## [RESOLVED] `eigenia.com` in site metadata

All metadata URLs (metadataBase, canonicals, OpenGraph, sitemap, robots,
JSON-LD) now derive from `SITE_URL` in `web/src/lib/site.ts`, which defaults
to `https://eigenia.nl` — the domain actually configured on Railway. If
`eigenia.com` is registered and wired up later, set `NEXT_PUBLIC_SITE_URL`
rather than editing call sites.

`ImpressumModal.tsx` still names both domains, deliberately: that is a
statutory ownership statement, not a link.

## [RESOLVED] `papers-pre-publish/` is empty and unused

It was never empty — it holds 169 files and is the live input to the seven
`scripts/compile_r*.py` compilers. See the build-artifact section in the root
`CLAUDE.md`: some files under `references/` are generated, and editing them
directly gets reverted on the next compiler run.

## Seven components are unreferenced, and their translation keys do not exist

None of these is imported anywhere: `Pillars`, `Subsidiaries`,
`SystemSimulator`, `DexpiCycloneSection`, `LabsShowcase`,
`TalebPapersSection`, `JoinResearchCTA`. Each calls `t()` on keys that exist
in **neither** `en` nor `nl` — `pil_*`, `sim_*`, `dexpi_*`, `labs_*`,
`taleb_*`, `join_*` (roughly 26 keys total).

`LanguageContext`'s `t()` is typed `(key: string) => string` with no
build-time checking and falls back to printing the raw key, so wiring any of
these in renders literal text like `join_title`. Three of them (`Pillars`,
`Subsidiaries`, `SystemSimulator`) also still use the pre-token hardcoded
`bg-black`/`zinc` styling instead of the theme variables.

`PretotypeExperimentModal` is a separate case: also unimported, but correctly
wired to the real `useContactForm` hook, and the root README describes it as a
live intake path. It needs wiring, not deletion.

Kept rather than deleted by explicit decision. The fix is either to delete
them or to add the missing keys in both languages before importing one.

Aside from these, `en` and `nl` are exactly in sync: 211 keys each, zero drift.

## Dutch wiki pages serve English bodies

`getWikiDocumentById()` in `web/src/lib/wiki.ts` sets
`contentNl = authoritativeContent` deliberately, so switching to NL
translates titles, subtitles, badges and working-group names but leaves the
treatise body in English. By design (one authoritative source per document),
not a bug — translating 46 treatises is a content project.

## No test framework

**RESOLVED 2026-09-08.** Vitest for unit tests, an auto-discovering audit suite
with a ratchet for pre-existing failures, GitHub Actions CI, and a pre-push hook.
`cd web && npm run verify` runs the lot. See `documentation/TESTING.md`.

Two limits survive and are worth keeping in view. Nothing renders React and asserts
on the output, so there are no component tests. And no layer catches a renderer
disagreeing with valid markdown, which is how a stray `**` reached production with
every gate green; for anything user-facing, open a browser and look.

## `references/WG-07-TM-Threat-Modeling/atq-card-terminal.html` is a duplicate

Byte-identical copy of `web/public/terminals/atq-card-terminal.html`. Only the
`web/public/` one is served; `sync-publications.js` ignores it (globs `.md`
only), but the root `Dockerfile`'s `COPY references ./references` does ship
it. Harmless, but the two must be kept in sync or one goes stale.

## [RESOLVED] Stale wiki embedded copy

Resolved via `scripts/sync-publications.js` and lifecycle hooks (`npm run prebuild`,
`npm run predev`). All 26 markdown publications in `references/` are automatically
synchronized into `web/src/lib/generatedReferencesContent.ts` at build time and dev time.
The audit agent `scripts/audit-publications.js` verifies 100% word-for-word fidelity on
every build, preventing any drift between `references/`, `/papers/[slug]`, and `/wiki`.

## `web/Dockerfile` / `web/docker-compose.yml` can't build `references/`

Covered in [DEPLOYMENT.md](./DEPLOYMENT.md#webdockerfile--webdocker-composeyml--local-only-not-what-railway-uses).
Its build context is `web/` only, so it can never reach `../references/`.
Not a bug to fix so much as a footgun to not use — the root `Dockerfile`
(what Railway actually builds from) is the one with the correct context.

## `papers-pre-publish/` is empty and unused

Implies a draft → review → publish gate that doesn't actually exist in
this workflow (there's no pre-publish routing — see root `CLAUDE.md`).
Harmless as-is; flagged rather than deleted since nobody's confirmed it's
safe to remove.

## Dependabot: 5 vulnerabilities (3 high, 2 moderate)

Reported by GitHub on push, transitive dependencies of `next@15.1.7`, not
introduced by any specific recent change. Not triaged yet — check
`https://github.com/Planet9V/eigenia/security/dependabot` for current
detail before assuming they're still the same 5.

## `JoinResearchCTA` references translation keys that don't exist

`web/src/components/JoinResearchCTA.tsx` calls `t("join_tag" as any)`,
`t("join_title" as any)`, `t("join_desc" as any)`, and
`t("join_btn_apply" as any)` — none of those keys exist anywhere in
`web/src/locales/translations.ts` (`en` or `nl`). `LanguageContext`'s
`t()` has no build-time key checking (it's typed `(key: string) =>
string`) and falls back to printing the raw key string when a lookup
misses in both languages, so if this component were ever rendered it
would show literal text like "join_title" instead of real copy. As of
this writing, `JoinResearchCTA` is also not imported by any other file in
the codebase — it's dead code, not a live bug, but it's a landmine for
whoever imports it next expecting it to just work. Found while auditing
`/collaborate` (2026-08-12); left unfixed since wiring it in was outside
that task's scope. Fix is either: delete the component if it's genuinely
unused, or add the missing `join_*` keys (both languages) and hook it up
somewhere.

## Mobile-viewport visual testing is unreliable in this dev environment

The browser-automation tooling used in Claude Code sessions here
(`resize_window`, Chrome's native device-toolbar shortcut) does not
reliably change the real rendered viewport — `window.innerWidth` stays
fixed at the actual window size regardless of the requested resize. When a
session says a layout is "verified at desktop width" but not "verified on
an actual narrow viewport," that's why — it's a tooling gap, not a skipped
step. Real mobile/tablet testing needs an actual device or a browser
outside this automation path.

## Bold cannot span inline math in `MarkdownViewer`

**Status:** renderer limitation, documented rather than fixed. Sources corrected.

`renderInlineMarkdown` splits each line on `mathRegex` first, then applies
`tokenRegex` (which handles `**bold**`, `*italic*`, links and code) to each
non-math segment independently. A bold span that crosses a math boundary
therefore never pairs up:

```markdown
**$\mathcal{E}_{\text{intra}}$, edges inside one ontology.**
```

splits into `**`, then the math, then `, edges inside one ontology.**`. Neither
`**` finds its partner, and the trailing pair renders literally on the page as
two asterisks. This shipped to production in
`WG-05-CAD-Blast-Radius-Three-Ontologies.md` and was caught by looking at the
deployed page in a browser; every automated gate passed, because the markdown
is valid and only the renderer disagrees.

**Rule for authors:** do not open or close a bold span with inline math. Put the
math outside the emphasis.

```markdown
$\mathcal{E}_{\text{intra}}$, **edges inside one ontology.**
```

**Why the renderer was not changed:** the fix means restructuring
split-then-tokenize so emphasis can span segment boundaries, which alters inline
rendering for all 65 reference documents. Six lines in one document did not
justify that regression risk. If a third document hits this, fix the renderer
instead of the sources.

Detect with: `grep -rnE '^\*\*\$|\$\*\*$' references/`
