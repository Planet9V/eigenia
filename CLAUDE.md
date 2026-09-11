# Eigenia — Agent Rules

Eigenia B.V. / Eigenia Labs — an applied-complexity-science think tank site.
Next.js 15 (App Router) + TypeScript 5 + Tailwind CSS v3.4, KaTeX for math
rendering (called directly from `MarkdownViewer.tsx`, no remark/rehype
pipeline), Framer Motion, bilingual EN/NL. Public repo: `Planet9V/eigenia`.

The core work here is two things, not one: publishing the think tank's
working-group output as a polished public site, and keeping that output
honest about what's sourced versus what's the working group's own synthesis.

## Working memory — read this block first, every session

@TASKS.md

The task list above is imported from `TASKS.md` at the repo root; it is the
state of this project. Line 1 of that file is a machine-read stamp
(`<!-- verified: YYYY-MM-DD <sha> -->`). **Whichever session does work updates
`TASKS.md` before it ends and refreshes the stamp** — a `Stop` hook refuses
to end a session that changed tracked files or landed commits without
touching it, and `web/scripts/audit-tasks-stamp.mjs` fails CI when the stamp
is more than 7 days or 15 commits stale. The rules of engagement are in
`memory/context/working-agreement.md`; read it before a Stitch or content task.

**Me.** Jim McKenney, owner of Eigenia B.V. (board intake jim@eigenia.nl),
also Tetrel Security; Kansas City area (America/Chicago). Author of the
working-group output.

**Memory of record** (decided 2026-09-11): `TASKS.md`, `memory/` and this
block, in this repo. `notes/<YYYY-MM-DD>/` is per-session scratch and plans.
Everything else that looks like memory (`.taskmaster/`, `.remember/`,
`.claude/memory.db`, `.swarm/`, `ruvector.db`, the gateway's `memory_store`)
is a tool cache: never read it to learn state, never make it the only copy of
a decision. `memory/context/gateway-evaluation.md` has the evidence.

**Terms that trip new sessions** (full list: `memory/glossary.md`):

| Term | Meaning |
|------|---------|
| Research Track vs Working Group | settled 2026-09-09: **Research Track names the section and the route** (breadcrumb, page title); **Working Group names the entity** (registry prose, sidebar, navbar, paper hero cards). Two levels, not two taxonomies |
| Workstream | ENTSO-E's word only; `audit-terminology.mjs` forbids it for Eigenia output |
| WG-01 … WG-08, MP-MATH, GOV-RES | folders give 7 working groups, the registry gives 9 — counts come from `web/src/lib/wikiRegistry.ts`, never typed |
| treatise | a published working-group paper under `references/<WG>/`, rendered at /papers/[slug] and /wiki |
| p-series / r-series | `scripts/compile_*.py` that overwrite specific `references/*.md`; r-series read `papers-pre-publish/` |

**Decisions in force** (details and dates in `memory/`):

- Counts are derived, never typed; `audit-counts.mjs` checks written counts against the registry.
- Any new audit is checked in the Docker layout (`COPY web ./` puts `web/*` at `/app`) — two Railway builds broke on 2026-09-09 while CI stayed green.
- Done = `npm run verify` green, PR CI green, **and Jim signs off in the browser, light and dark, EN and NL**. No agent declares a page done.
- Stitch pass scope is **Home only** until one page has gone design → PR → production under the working agreement. A `.stitch/designs/*.html` is a spec, never code to paste.
- Every new UI string is a `t()` key with EN and NL in the same commit.

## PRODUCTION SITE — `references/*.md` paths are load-bearing, not just research material

This is a live, production site (Railway, built from the root `Dockerfile`,
which does `COPY references ./references` into the build). Every published
paper and wiki page is wired to an exact file path: `web/src/lib/papers.ts`
and `web/src/lib/wiki.ts` both hardcode `relativePath:
"references/WG-XX-.../exact-filename.md"` entries, resolved against
`process.cwd()` at build/runtime.

**Never rename, move, or delete an existing file under `references/`.**
Doing so breaks `getPaperBySlug()`/the wiki lookup — a failed Railway build
or a broken page in production, not a caught-locally error. Adding *new*
files (e.g. into `references/external-research/`, see below) is safe —
nothing existing changes path. If an existing reference genuinely needs to
move, that's a coordinated change: update every `relativePath` entry in
both `papers.ts` and `wiki.ts` in the same commit, then run `npm run build`
inside `web/` and confirm it succeeds locally before it ever reaches
Railway. Don't treat a passing `next build` as optional — it's the only
thing standing between a bad path and a broken production deploy.

## Some `references/*.md` files are BUILD ARTIFACTS — check before you edit

`scripts/compile_*.py` (23 scripts) each **overwrite** a specific file under
`references/`. Two families:

- **p-series** (`compile_p01`…`compile_p12`, `compile_atq_academic`) embed the
  entire paper as a Python string literal and write it out wholesale.
- **r-series** (`compile_r01`…`compile_r07`) read a source manuscript from
  `papers-pre-publish/Research_equations/`, run regex cleanup over it (em
  dashes, banned filler words, KaTeX normalisation) and write the result.

**Before editing anything under `references/`, check whether a compiler owns
it:** `grep -rln "<filename>" scripts/`. If one does, apply the fix to the
`.py` as well — otherwise the next compiler run silently reverts your work.
If nothing matches, the `.md` is hand-maintained and safe to edit directly.

`papers-pre-publish/` is **not** an unused draft gate — it holds 169 files and
is the live input to the r-series. Don't route new work through it, but don't
treat it as dead either.

## Sourcing — working-group output, not peer review, but still traceable

Published content lives in `references/<WG-code>-.../` and is **Eigenia Labs'
working-group synthesis** — not a claim of peer-reviewed publication.
(`web/src/content/` is a deprecated legacy archive; its own README says so.
Do not add or edit anything there.) It's fine for it to
present original framing and models. What it can't do is cite or invoke a
named external method, model, or dataset (Clayton Copulas, GGNNs, Kramers
escape models, etc.) without that reference existing somewhere traceable.

1. Before writing a claim that leans on external research, check
   `references/<WG-code>-.../` for existing working-group material on the
   topic first.
2. If nothing covers it, use `valyu` (`mcp__valyu__valyu_academic_search`,
   `valyu_financial_search`, `valyu_patents`, etc. — already registered
   globally, no setup needed) to find a real source. Don't publish a named
   method without one.
3. Store what you find in `references/external-research/`, one file per
   source, named `<WG-code>_<topic-slug>_<YYYYMMDD>.md` (e.g.
   `WG-07-TM_kramers-escape-rate_20260812.md`) — the WG-code prefix is what
   makes it interconnected: it ties the external source back to the working
   group folder it supports, the same way the existing `WG-##-XX-Name/`
   folders are already organized. Each file: title, the query you ran,
   source/URL/DOI, retrieval date, which paper or WG doc uses it, and a
   short summary. Mark the folder's purpose in a one-line header:
   *"External research — found via valyu, not the WG's own analysis."*
4. If a claim genuinely is the working group's own synthesis with no
   external analogue, say so in the paper rather than leaving it
   unattributed and ambiguous — "novel synthesis" is a legitimate label,
   "unsourced-but-sounds-established" is not.

## Scratch notes — one common, dated, predictable location

`/planning-with-files` files (`task_plan.md`/`findings.md`/`progress.md`,
plus `howto_wiki.md`) are useful and stay — but right now they're scattered
(repo root *and* duplicated under `web/`) with no date on them, so nothing
tells a later session which set is current. Fix:

- **One location**: `notes/<YYYY-MM-DD>/` at the repo root. Nowhere else —
  not `web/`, not root-level loose files.
- **Start of a work session**: check `notes/` for the most recent dated
  folder. If today's date doesn't have one yet, create `notes/<today>/`;
  otherwise keep using today's.
- **Standard filenames inside each dated folder**: `task_plan.md`,
  `findings.md`, `progress.md`, and `howto_wiki.md` when relevant — same
  names the `/planning-with-files` skill already expects, just inside a
  dated folder instead of loose at root.
- The date in the folder name *is* the freshness signal — a session
  picking up old context should look at how old the folder is before
  trusting it as current.
- The existing loose files at root and under `web/` haven't been migrated
  yet — do that the first time you touch this convention rather than
  leaving three copies of the truth lying around.

## Style, rendering, and polish — this is what gets enforced, not a pre-publish gate

There is no draft → review → publish gate here — don't invent one. (Note
`papers-pre-publish/` is not that gate despite the name; see the build-artifact
section above for what it actually feeds.) What matters for a public-facing
site is that it looks right:

- Match the existing design system — the Tailwind v3.4 tokens in
  `web/tailwind.config.ts`, the light (`#FAF8F5`) / dark (`#0B0C0E`) theme
  variables. Reuse existing components before inventing new ad hoc styles.
- Any new or edited math must actually render — verify KaTeX output, not
  just that the TSX compiles.
- **Before calling any content or UI change done, run the dev server and
  look at it in an actual browser — both light and dark mode.** A page
  that type-checks but renders wrong is not done. This is a portfolio-grade
  public site; sloppy rendering undermines the credibility the content is
  trying to establish.

## Also available: the super-intelligence-framework MCP gateway, and the full global toolset

> **Status 2026-09-11 — query tool, not memory.** The gateway's `graph_*` and
> `memory_search` calls stay available and are useful for impact analysis before
> touching a shared component. Its `memory_store` is **denied by a `PreToolUse`
> hook** (`.claude/settings.json`): decisions go in `memory/` and `TASKS.md`
> here, where every session reads them automatically. The graph covers `web/src`
> only, is a snapshot (run `graph_index(project="eigenia")` first if `stale`),
> and in 34 notes files had been queried zero times — see
> `memory/context/gateway-evaluation.md`. The rest of this section is the
> original contract and still describes the tools accurately.


Nothing here is scoped down. There is no project `.mcp.json` restricting
which servers are available, and it should stay that way — this agent has
the same global plugins, skills, and MCP servers as every other directory
on this machine (Claude Code's full registered set: `super-intelligence`,
`serena`, `valyu`, `MCP_DOCKER`, `Context7`, `github`, and the rest), plus
the full superpowers skill catalogue. Use them; don't assume a narrower
surface than what's actually registered.

A second toolkit — the `super-intelligence` MCP gateway — is registered at
user scope (available in every Claude Code session on this machine, not
just here). Use it **alongside** this project's own `notes/` files, not
instead of them — they solve different problems:

- **`notes/`** — this session's own task state, scratch notes, what you
  personally tried and why. Scoped to one working directory, one sitting.
- **The gateway** — cross-session recall and structural code search, scoped
  to `project="eigenia"`, available to *any* Claude Code session on this
  machine, including ones working here weeks from now.

| Need | Call |
|---|---|
| How does X work / what calls Y (structural, exact symbol name) | `graph_query(project="eigenia", question="...")` |
| You know roughly what you want but not the exact symbol name | `graph_semantic_query(project="eigenia", phrase="...")` — resolves a fuzzy phrase to the nearest symbol by meaning, then explains it structurally |
| Shortest dependency path between two symbols | `graph_path(project="eigenia", source, target)` |
| Explain one symbol + its neighbours | `graph_explain(project="eigenia", symbol)` |
| Recall a decision from a *different* past session | `memory_search(query, project="eigenia")` |
| Persist a decision so a *future* session can recall it | `memory_store(key, value, namespace="decisions", project="eigenia")` |

Skill lookup is deliberately **not** routed through the gateway —
`skills_search`/`suggest` would just be a second path to the same skill
catalogue superpowers already puts in front of you every turn. Use the
`Skill` tool directly for that.

**Always pass `project="eigenia"`** on every `memory_search`/`memory_store`
call (not a hand-typed `namespace="eigenia"` string — that was this
section's original guidance and still works, but `project=` is the
correct one now: it's validated against the gateway's own project
registry, so a typo raises `UnknownProject` instead of silently creating a
disconnected namespace nothing will ever search again). This is one
shared database across every project the gateway knows about (this repo,
super-intelligence-framework, podcast_notebookllm); `project=` is what
keeps them apart, structurally, not a convention you have to remember to
type correctly every time.

**Trust, but verify — this tool can be wrong or out of date:**

- The code graph is a **snapshot**, not live — it does not watch the
  filesystem. Every `graph_query`/`graph_path`/`graph_explain` result
  carries a `stale` field (plus `files_changed_since_index` and a `hint`).
  **If `stale: true`, call `graph_index(project="eigenia")` before trusting
  the structure it describes.**
- The graph only covers `web/src` — the Next.js app and the markdown papers
  it renders. It does not cover `references/`, `reference_arches/`, or
  anything else at the repo root; those aren't indexed and `graph_query`
  won't find them.
- For "where is this symbol defined right now" / "who calls this" when
  correctness on one specific symbol matters more than a broad structural
  overview, prefer Serena's `find_symbol`/`find_referencing_symbols` (live
  LSP, not a snapshot) over the graph.
- Memory entries carry `created_at`/`updated_at` — an old entry is a
  decision as of that date, not necessarily still true. Skim it, don't
  cite it blindly, especially for anything that could have changed since.

<!-- BEGIN academic-publication-formatting-rules (managed) -->
## Academic Publication Formatting & Front-Matter Invariants

### 1. Zero-Redundancy Front Matter Rule
- The Next.js web application renders an authoritative Hero Card containing the Working Group, Document ID, Title, Subtitle, Author, and Word Count.
- Markdown documents in `references/` MUST NOT duplicate the title as a leading `# H1` or the subtitle as a leading `## H2`.
- Loose administrative lines (e.g., `Lab Sponsor Resident j.mckenney`, `Working Group: WG-XX-...`) are strictly forbidden in Markdown bodies.
- Documents must transition cleanly from the UI header into numbered technical sections:
  ```markdown
  ## 1. Executive Summary & Scope
  ```
- If standalone normative metadata is required for offline export, it must be formatted as a compact Markdown table, never as loose unformatted text:
  ```markdown
  | Working group | Document type | Primary sources cited |
  | :--- | :--- | :--- |
  | WG-05-CAD DEXPI 2.0 and CAD Interoperability | Eigenia Labs working paper | ISO 15926-4, CycloneDX 1.6, IEC 61970-301 |
  ```

### 2. Heading and Body Decoupling Rule
- Headings (`#`, `##`, `###`, `####`) MUST be concise titles (strictly under 90 characters).
- NEVER place narrative sentences or multi-sentence body paragraphs on the same line as a heading.
- Any text following a colon in a section header must be placed on the next line as a standard body paragraph (`<p>`):
  * **INCORRECT:**
    ```markdown
    ### 1. Protection System Misoperation: This is perhaps the most insidious aspect...
    ```
  * **CORRECT:**
    ```markdown
    ### 1. Protection System Misoperation (The Domino Effect Trigger)

    This is perhaps the most insidious aspect...
    ```

### 3. IEEE/ISO Bracket Citation Standard
- Footnote references must NEVER be concatenated onto trailing punctuation or words (`decreases.5`, `conditions.46`, `collapse.21`).
- All citations must be formatted using clean brackets:
  * **INCORRECT:** `system inertia decreases.5 This isn't a minor adjustment...`
  * **CORRECT:** `system inertia decreases [5]. This is not a minor adjustment...`
  * **INCORRECT:** `fault conditions.46`
  * **CORRECT:** `fault conditions [46].`

### 4. Continuous Style Invariants
- **Zero em dashes:** Strictly replace all `—` and `--` with semicolons, colons, commas, or parentheses.
- **`landscape` is permitted.** `threat landscape` is standard domain usage in this field and reads as precise, not as filler. Do not flag it.
- **Zero prohibited AI filler words:** No `leverage`, `utilize`, `pivotal`, `testament to`, `foster`, `streamline`, `at its core`, `beacon`, `game-changing`, `harness`, `furthermore`, `robust`.
<!-- END academic-publication-formatting-rules (managed) -->

## Testing, and the one command that matters

`cd web && npm run verify` runs the sync, the typecheck, the audit suite and the
unit tests. Run it before you push. `documentation/TESTING.md` is the full picture.

Three things worth knowing before you change anything here:

- **Adding a check is one file.** Drop `audit-<name>.mjs` into `web/scripts/`, exit 0
  on success and non-zero on failure. `run-audits.mjs` discovers it by filename, so
  CI, `prebuild` and the pre-push hook all pick it up with no other edit.
- **`scripts/known-failures.json` is a ratchet.** Frozen failures may shrink, never
  grow. Never raise a count to make a build pass; if something new is broken, it is
  new, and it is yours.
- **Green gates are not the same as a correct page.** A stray `**` shipped to
  production with every audit passing, because the markdown was valid and only the
  renderer disagreed. For anything user-facing, still open a browser and look.

## The corpus system view, and how far to trust it

`notes/2026-09-08/corpus-system-view.md` is the map of the research corpus: a
directory index of all nine working groups, a per-group technical breakdown, and
a layered architecture of the Cyber Digital Twin. Read it before writing a new
paper or drafting anything that has to place work inside the corpus. It answers
"what already exists and which group owns it" faster than walking `references/`.

Deliberately **not published**. It is a map rather than research, it is in
neither registry, and in `references/` it inflated the audited corpus count while
being unreachable on the site.

Two cautions, both earned:

- **Its file index is hand-written and goes stale** the moment a paper is added.
  Trust it for orientation, verify against `references/` before relying on a
  count or a filename.
- **It arrived with three fabricated claims**: a figure lifted from one working
  group and relabelled as another's, invented specifics about an engine, and a
  named external method credited to a group that never used it. All three were
  removed and the corrective pass is recorded at the foot of the document. Treat
  any *number* in it as needing a check against the paper it describes; the
  structural map is reliable, the quantitative claims were not.
