# Eigenia — Agent Rules

Eigenia B.V. / Eigenia Labs — an applied-complexity-science think tank site.
Next.js 15 (App Router) + TypeScript 5 + Tailwind CSS v4, KaTeX for math
rendering, Framer Motion, bilingual EN/NL. Public repo: `Planet9V/eigenia`.

The core work here is two things, not one: publishing the think tank's
working-group output as a polished public site, and keeping that output
honest about what's sourced versus what's the working group's own synthesis.

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

## Sourcing — working-group output, not peer review, but still traceable

Content under `web/src/content/papers/` is **Eigenia Labs' working-group
synthesis** — not a claim of peer-reviewed publication. It's fine for it to
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

There is no draft → review → publish gate here (the empty
`papers-pre-publish/` folder implied one; it's unused — don't route through
it). What actually matters for a public-facing site is that it looks right:

- Match the existing design system — the Tailwind v4 tokens in
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
  | Document ID | Working Group | Normative Standards | Classification |
  | :--- | :--- | :--- | :--- |
  | EIGENIA-WG05-CAD-01 | WG-05-CAD | ISO 15926 / CycloneDX 1.6 | Open Technical Specification |
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
- **Zero prohibited AI filler words:** No `leverage`, `utilize`, `pivotal`, `testament to`, `foster`, `streamline`, `at its core`, `landscape`, `beacon`, `game-changing`, `harness`, `furthermore`, `robust`.
<!-- END academic-publication-formatting-rules (managed) -->
