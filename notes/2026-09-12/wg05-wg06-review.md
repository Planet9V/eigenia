# Review: three new and three edited WG-05 / WG-06 treatises

Reviewed 2026-09-11 against the committed corpus at `/home/claude/eigenia`
(read-only) and the plan in `notes/2026-09-11/task_plan.md` and `findings.md`.
Staged files are under `/mnt/user-data/uploads/eigenia/`; `S/` below means
`/mnt/user-data/uploads/eigenia/references/` and `C/` means
`/home/claude/eigenia/references/`. Audits were run in a scratch copy at
`/home/claude/eigenia-scratch` with the staged files copied in. Nothing under
`/home/claude/eigenia` was modified.

---

## 0. Headline

1. **Every audit that runs on the markdown passes** (mermaid 97/97 with
   accTitle/accDescr, ASCII art clean, terminology clean, citations resolve,
   counts, featured, publications fidelity). The one red gate is the unit test:
   `papers.ts` now registers 66 slugs and `wikiRegistry.ts` still registers 63,
   so `npm run verify` fails at `registry.test.ts:84`.
2. **The new papers claim designations P4, P5 and P6, and all three are already
   taken** in the committed corpus (P4 Energy case, P5 Manufacturing case, P6
   Rail case, P7 Blast Radius, "final paper of the three-schema programme").
   `C/WG-05-CAD-DEXPI-2/WG-05-CAD-Energy-RefBESS-250MW.md:3`,
   `...Manufacturing-RefPharma-API-1.md:3`, `...Rail-RefDepot-EMU-12.md:3`,
   `...Blast-Radius-Three-Ontologies.md:3`.
3. **The Multigraph Engine paper's "closed vocabulary" contradicts P1 R-4** (it
   uses `IDENTITY, PART_OF, CONTROLS, SUPPLIES, MONITORS`; P1 defines
   `identity, partOf, controls, supplies, monitors`, with `identity` undirected)
   and then breaks its own closure with `:Vulnerability` and
   `:HAS_VULNERABILITY` in Q-1.
4. **The three edits to P1/P2/P3 insert diagrams that contradict the normative
   text they sit in**: P1's diagram names properties (`g_cpdt:asset_ref`,
   `dexpi:AssetRef`, `cim:AssetCyberLink`) that P1 sections 5.1 and 6.1 do not
   define and that R-27 / C-1 forbid; P3's diagram mislabels V-07..V-10 as UUID
   rules, names a relation `feeds` that does not exist, and misdescribes RT-1..3.
5. **Quantitative claims without a source are pervasive** in the Kinetic and
   WG-06 papers (180 bar, 120 bar/s, 8.4 s, $5.48M, $28.6M, 180,000 meters,
   300 to 800 components, 90.5%, 612 CVEs, six months, a full RDBMS/triplestore
   benchmark table). Several contradict the corpus's own reference asset
   (RefBESS is 500 MWh at 220 kV, one hundred tagged objects; Kinetic says
   1,000 MWh, 33/400 kV; Multigraph says 3,200 physical assets).
6. `CVE-2024-55321`, presented with an NVD URL as "a critical OpenSSL
   vulnerability", **does not exist** in MITRE or NVD (checked both APIs today).
7. Lloyd's Y5381 is misdescribed as an LMA 2021 bulletin on "Cyber Physical
   Damage Cover"; it is Lloyd's Market Bulletin Y5381, 16 August 2022,
   *State backed cyber-attack exclusions*, which is how five other corpus papers
   already describe it.
8. The WG-06 paper sits in a folder named `WG-06-CRA-Product-Assurance/`. The
   plan fixes the group id as `WG-06-SC` (F13) and INV-7 says a path under
   `references/` is never renamed once committed. **The folder name must be
   settled before the first commit, not after.**
9. The corrected CRA paper is compiler-owned. Running the committed
   `scripts/compile_p03_supply_chain_cra.py` in the scratch copy **reverted the
   staged correction byte-for-byte** (sha `ed062c3e…`, the committed wrong
   text). The staged upload does not include `scripts/`, so whether the
   compiler was also corrected cannot be verified from what was provided (F5).

Verdicts (section 5): Multigraph Engine **NEEDS REWRITE**; Kinetic Blast
Radius **OFF-PLAN / NEEDS REWRITE**; WG-06 CRA Product Assurance
**NEEDS REWRITE** (and a re-scope against the six-paper plan); the three P1/P2/P3
edits **should not ship in this form**.

---

## 1. Corpus conventions and the publication checklist

### 1.1 Sources read

`CLAUDE.md` (root, including the managed "Academic Publication Formatting"
block), `documentation/TESTING.md`, `documentation/CONTENT_GUIDE.md`,
`web/scripts/audit-{mermaid,ascii-art,terminology,citations,counts,featured}.mjs`,
`audit-publications.js`, `run-audits.mjs`, `sync-publications.js`,
`terminology-registry.json`, `known-failures.json`, `ascii-art-keep.json`,
`web/src/lib/wikiRegistry.ts`, `papers.ts`, `wiki.ts`,
`web/src/lib/__tests__/registry.test.ts`, `web/src/components/MarkdownViewer.tsx`,
`web/src/app/tracks/page.tsx`, `web/src/app/unified-standard/page.tsx`.

### 1.2 What a new paper must pass

| # | Gate | Where enforced | What it requires |
|---|---|---|---|
| 1 | File location | `CLAUDE.md` "PRODUCTION SITE" | `references/<WG-code>-.../file.md`; never renamed, moved or deleted afterwards (INV-7). Folder name follows `WG-##-XX-Name/`. |
| 2 | `papers.ts` entry | `registry.test.ts:82-93` | `PAPERS_REGISTRY[slug] = { title, relativePath }`. Slug set must equal the wiki slug set, count must match. |
| 3 | `wikiRegistry.ts` entry | `registry.test.ts`, `audit-counts.mjs`, `audit-featured.mjs`, INV-15 | Nested inside a `WORKING_GROUPS[i].documents[]` block: `id`, `slug`, `title`, `titleNl`, `subtitle`, `subtitleNl`, `workingGroupId` (must equal the enclosing group id, INV-10), `workingGroupName`, `workingGroupNameNl`, `relativePath`, `author`, `publicationDate`, `badge`, `badgeNl`. `featured`/`featuredRank`/`hook` only if the featured set is being changed (audit-featured pins it at exactly 13). |
| 4 | New group block | `wikiRegistry.ts:57-58` shape, `tracks/page.tsx:25` | `id`, `title`, `titleNl`, `number`, `badge`, `badgeNl`, `description`, `descriptionNl`, `documents`. Plus a `WG_ICON_MAP` entry or `/tracks` renders no icon. Group id becomes a live `?wg=` URL (F7) and can never be retired. |
| 5 | Generated bundle | `sync-publications.js` (runs in `predev`/`prebuild`/`verify`) | Regenerates `web/src/lib/generatedReferencesContent.json` and `.ts`; `audit-publications.js` then checks every `.md` under `references/` is in the bundle with identical word count. Nothing to hand-edit; just run the sync. |
| 6 | Zero-redundancy front matter | `CLAUDE.md` managed rule 1 | **No leading `# H1`**, no loose "Working Group:" lines; body starts at `## 1. …`. Metadata, if needed, is a compact table (`\| Field \| Value \|` is the programme's convention in all nine P-series and Ref* papers). The renderer suppresses a leading H1 on both routes (`MarkdownViewer.tsx:42`, `WikiDocumentViewer.tsx:192`), so an H1 is invisible but still a rule violation and can drift from the registry title. |
| 7 | Headings | managed rule 2 | Under 90 characters, no body sentence on a heading line. |
| 8 | Citations | managed rule 3, `audit-citations.mjs` | `[n]` markers only, never glued to punctuation; every `[n]` must resolve to an entry under a heading containing References/Bibliography/Works Cited/Citations, written as `n.` or `- [n]`. |
| 9 | Style | managed rule 4, `audit-featured.mjs` BANNED list | Zero em dashes and `--` in prose; no `leverage, utilize, pivotal, testament to, foster, streamline, at its core, beacon, game-changing, harness, furthermore, robust`. |
| 10 | Terminology | `audit-terminology.mjs`, `terminology-registry.json` | No `Component BOM`; never `CycloneDX (ISO/IEC 5962)`; `ISO 15926` always with a part number; no "Eigenia workstream". |
| 11 | Mermaid | `audit-mermaid.mjs` | Every ```` ```mermaid ```` block must parse in mermaid 11 and carry `accTitle:` and `accDescr:` / `accDescr {}`. |
| 12 | No ASCII art | `audit-ascii-art.mjs` | No box-cornered drawings, fenced or unfenced (external-research is exempt). |
| 13 | Math | `CLAUDE.md` "Style" | Must render in KaTeX; inline `$…$` is split by the regex at `MarkdownViewer.tsx:100`, so a bare `$` in prose (e.g. `$4.2M`) will open a math span. |
| 14 | Sourcing | `CLAUDE.md` "Sourcing" | Any named external method, dataset, benchmark or regulation needs a file in `references/external-research/` named `<WG-code>_<topic-slug>_<YYYYMMDD>.md` with title, query, URL/DOI, retrieval date, which paper uses it, summary. Own synthesis must be labelled as such. **Note: no script enforces this.** `audit-citations.mjs` only checks that `[n]` resolves to a bibliography line in the same file. `task_plan.md:191` ("The citation audit is the gate that catches a missing source file") overstates the tooling; the gate is policy, not code. |
| 15 | Compiler ownership | `CLAUDE.md` "BUILD ARTIFACTS", F5, F11 | `grep -rln <filename> scripts/` before editing; no sweep script may run. |
| 16 | Counts | `audit-counts.mjs` | Any literal "N Treatises / N Working Groups / N Research Tracks" in `web/src`, `documentation/`, `README.md` must equal the registry. Group badges such as `CAD STANDARDS 01–14` are not audited but F14 notes they are expected to match. |
| 17 | Verify | `TESTING.md` | `cd web && npm run verify` green (sync, `tsc`, audits, vitest), then a browser check light/dark/EN/NL/narrow. |

### 1.3 Audit runs on the staged files

Scratch: `cp -r /home/claude/eigenia /home/claude/eigenia-scratch`, staged
`.md` files and `papers.ts` copied in, `npm ci` in `web/`, Node 22.22.2.

| Audit | Result | Notes |
|---|---|---|
| `audit-mermaid.mjs` (committed refs, `REFERENCES_DIR=/home/claude/eigenia/references`) | PASS, 91 diagrams | Confirms INV-6 baseline. |
| `audit-mermaid.mjs` (staged) | **PASS, 97 diagrams** | +6: one in each of the six files. All parse, all carry accTitle/accDescr. |
| `audit-ascii-art.mjs` | PASS | 65 documents scanned. |
| `audit-terminology.mjs` | PASS | |
| `audit-citations.mjs --warn-orphan-entries` | PASS | No unresolved markers and no orphan entries in any of the six files. (Pre-existing orphans in WG-03/WG-04/WG-05 Frontier are unchanged.) |
| `sync-publications.js` | OK | 73 markdown files (69 + 3 papers + 1 source file). |
| `run-audits.mjs` (full) | **8 passing, 0 frozen, 1 skipped** | `audit-rendered-completeness.js` skipped, no dev server. |
| `vitest run` | **1 failed / 19 passed** | `papers and wiki agree › registers the same number of documents in both registries`: expected 66 to be 63. |
| KaTeX check (own script, every `$$` block and every inline span in the three new files) | 0 parse errors, **1 span capture defect** | `S/WG-05-CAD-DEXPI-2/WG-05-CAD-Kinetic-Blast-Radius.md:155`: the regex captures `$4.2M business interruption). Total $` as inline math and leaves `R_K = \$5.48\text{M}$.` as raw text. |
| Compiler guard (QA-5 method) | **FAIL for the CRA paper** | `python3 scripts/compile_p03_supply_chain_cra.py` in scratch rewrote the staged corrected file back to the committed sha `ed062c3ed8f3fc45` (32,947 chars, two "Annex IV" hits). The correction lives only in the `.md` unless the compiler was changed; `scripts/` was not staged. |

Per-file pass/fail on the mechanical gates:

| File | mermaid | ascii | terminology | citations | H1 rule | KaTeX |
|---|---|---|---|---|---|---|
| Multigraph-Engine | pass (1) | pass | pass | pass (9/9) | **fail** (line 1) | pass |
| Kinetic-Blast-Radius | pass (1) | pass | pass | pass (6/6) | **fail** (line 1) | **fail** (line 155) |
| WG-06-CRA-Product-Assurance | pass (1) | pass | pass | pass (6/6) | **fail** (line 1) | pass |
| Three-Identity-Join (edited) | pass (1 new) | pass | pass | pass | **fail** (line 1, new) | n/a |
| CIM-Profile (edited) | pass (1 new) | pass | pass | pass ([6],[7] resolve) | **fail** (line 1, new) | n/a |
| Conformance (edited) | pass (1 new) | pass | pass | pass | **fail** (line 1, new) | n/a |

---

## 2. The three new papers

### 2.1 `WG-05-CAD-Multigraph-Engine.md` ("Designation P4")

**(a) Plan fit.** Nominally WG-05 (instrument: G_CPDT). It is the closest thing
staged to the missing "G_CPDT specification" the plan says Phase 4 is blocked
on (`task_plan.md:284-287`, F3). But:

- It is an *engine* paper (LPG storage, Cypher catalogue, benchmark table) not a
  *schema* paper. The plan's decision of record is "Eigenia specifies the
  method, OXOT is never named" (`task_plan.md:11`, F9). A benchmark table
  claiming 0.04 ms one-hop lookups against PostgreSQL 16 and Apache Jena
  (`:206-215`) is a report on an implementation. OXOT is not named (grep clean),
  but the paper's evidence is the unnamed implementation's, not a synthetic
  reference product's, which is the pattern F9 requires.
- Its designation **P4 is already the Energy applied paper**
  (`C/…/WG-05-CAD-Energy-RefBESS-250MW.md:3`). P7 (`Blast-Radius-Three-Ontologies.md:3`)
  calls itself "final paper of the three-schema programme" and at `:37`
  records that Q-n and F-n sequences already collided once; this paper adds a
  third `Q-1..Q-3` sequence.
- It duplicates the ingestion pipeline of the two-schema bridge
  (`C/…/WG-05-CAD-Unified-DEXPI-CycloneDX.md:418-458`) without citing it, and
  the corpus-level definition of G_CPDT is placed in P1 instead (see section 3).
- Where it belongs: WG-05, but as a "G_CPDT schema" paper written against P1
  rather than around it, with a fresh designation (P8 or a new prefix), no
  benchmark, and the LPG projection stated as one non-normative realisation.

**(b) Structure and quality.**

- No abstract; opens on `# H1` then `## 1. Executive Summary & Scope`
  (`:1-3`). H1 violates managed rule 1; the H1 text also differs from the
  `papers.ts` title ("The G_CPDT Multigraph Engine: Dual-Representation Storage
  and Cypher Query Algebra", `papers.ts` staged `:111`).
- RFC 2119 boilerplate present (`:11`); requirements written as `Requirement
  E-n.` in prose. **Claims "E-1 through E-20"; only E-1..E-13 exist** (`:11` vs
  `:27-91`).
- Vocabulary: `:75-77` says "In strict adherence to P1 Requirement R-4, the edge
  set admits exactly five directed relation types
  {IDENTITY, PART_OF, CONTROLS, SUPPLIES, MONITORS}". P1 R-4
  (`C/…/Three-Identity-Join.md:122`) defines `identity, partOf, controls,
  supplies, monitors`, and the table at `:150` marks `identity` as **not**
  directed. Different spelling is a different vocabulary; V-04
  (`C/…/Conformance…md:95`) would reject `PART_OF` with `E-REL-UNKNOWN`.
- Closure broken by its own query: Q-1 (`:161`) matches
  `(vuln:Vulnerability)<-[:HAS_VULNERABILITY]-(c:Component)`; neither the label
  nor the relation is in $\mathcal{L}_V$ (`:55-62`) or $\mathcal{L}_E$ (`:77`).
  Q-1/Q-2 also return `c.name`, `c.version`, `host.name`, `breaker.name`,
  `consumer.name` (`:165-184`), properties E-5..E-7 never define.
- Graph model differs from P1's. P1 states every relation from the carrying
  object *toward the asset reference* (`:146`). E-10..E-12 and the queries put
  `CONTROLS`/`SUPPLIES` between native vertices (`Component -> PhysicalAsset`,
  `ConductingEquipment -> ConductingEquipment`). The ingestion diagram
  (`:135-137`) shows a third arrangement (`Component -PART_OF-> AssetReference`,
  `ConductingEquipment -SUPPLIES-> AssetReference`) that contradicts E-9 and
  E-11 and the Q-2 pattern (`:181`, CE joined by IDENTITY). Step 4 of the
  pipeline (`:148`) never says how an assertion's UUID endpoint is resolved to
  the native-vertex endpoint the queries need.
- Q-3 (`:193-202`) says it "verifies Requirement E-13" (direction) using an
  **undirected** pattern `(sensor)-[*1..6]-(actuator)`, so direction is exactly
  what it ignores. And `MATCH p = shortestPath(...)` followed by
  `CASE WHEN p IS NULL` can never yield `PROVEN_ISOLATED`: a MATCH with no path
  produces zero rows. Needs `OPTIONAL MATCH`.
- Cross-references to P3: `V-10` (`:145`), `V-13` (`:91`), `V-14` (`:149`)
  exist and are correctly used. **`V-16..V-20` (`:110`) does not: V-19 and
  V-20 do not exist** (R-19/R-20 are in P3 section 3.3 "no mechanical rule",
  `C/…/Conformance…md:150`). `V-28..V-30` (`:112`): V-30 is a claim check,
  not an adapter rule. `P1 Requirement R-1` for minting (`:19`) should be R-2
  and R-33.
- Mermaid: parses, accTitle/accDescr present (`:101-102`).
- Equations: $\mathcal{G}$ tuple (`:47-49`) is fine and renders. The
  $\mathcal{O}(k^d)$ vs $\mathcal{O}(1)$ argument (`:35`) is a folk claim
  ("index-free adjacency" is a Neo4j marketing term) with no source.
- Benchmarks (`:206-215`): every number is unsourced and the dataset is
  fabricated. "RefBESS-250MW dataset [9], comprising 12,450 components, 3,200
  physical assets, and 1,840 electrical conducting nodes" contradicts the
  reference asset itself: **one hundred tagged objects**
  (`C/…/RefBESS-250MW-Specification.md:99`), a representative component table
  with one entry per identity (`C/…/Energy-RefBESS-250MW.md:56`), and instance
  counts in the low tens (`…Specification.md:177`). "$300\times$" and
  "sub-millisecond … across 100,000 components" (`:35`, `:215`) likewise.
- References: [1] RFC 2119, [2] CC BY 4.0, [4] RFC 9562 (Davis, Peabody,
  Leach, May 2024), [5] DEXPI 2.0 (matches P1's own entry), [6] ECMA-424,
  [7] IEC 61970-301, [8] ISO 15926-4 are real. [7] lacks the edition/URL P2
  gives. [3] cites "Paper P5 … Kinetic Blast Radii in Industrial Systems", a
  third title for the Kinetic paper (the file's H1 and `papers.ts` each use a
  different one). [9] "RefBESS-250MW Reference Architecture and Cyber-Physical
  Topology" is not the registered title ("RefBESS-250MW: A Synthetic Reference
  Battery Storage Architecture", `wikiRegistry.ts:933`).
- Style: no em dashes, no banned words, OXOT absent, four trailing-space lines.

**(c) Fix list, by severity.**

1. Re-designate (P4 is taken; `:9`). Remove "Requirements … E-1 through E-20"
   or write E-14..E-20 (`:11`).
2. Adopt P1's vocabulary and directionality verbatim, or state explicitly that
   the LPG relation types are a *projection* of P1's and give the mapping table
   (`:75-91`, `:135-137`).
3. Remove `:Vulnerability` / `:HAS_VULNERABILITY` or admit them to the schema
   and reconcile with "exactly five" (`:77`, `:161`).
4. Fix Q-3: directed pattern, `OPTIONAL MATCH` (`:195-201`). Fix the
   ingestion diagram edges (`:135-137`) to match E-8..E-12.
5. Delete section 6 or replace with a reproducible synthetic measurement over
   the *actual* RefBESS corpus, with the query set and environment stated
   (`:204-215`). Remove "12,450 / 3,200 / 1,840" (`:206`).
6. Correct `V-16..V-20` → `V-16..V-18`; `V-28..V-30` → `V-28, V-29a/b`
   (`:110-112`). `R-1` → `R-2, R-33` (`:19`).
7. Drop the `# H1` (`:1`); add a metadata table in the programme's format or
   nothing. Align the title across H1 / `papers.ts` / other papers' reference
   entries.
8. Cite the two-schema bridge for the ingestion pipeline and blast radius
   lineage (`C/…/Unified-DEXPI-CycloneDX.md` §8 and §4.4).
9. Define the properties returned by queries (`name`, `version`) in E-5..E-7
   or return only defined ones (`:165-186`).
10. Trim trailing whitespace (`:9`, `:164`, `:182`, `:199`).

### 2.2 `WG-05-CAD-Kinetic-Blast-Radius.md` ("Designation P5")

**(a) Plan fit: off-plan.** Under instrument-and-outcome the paper straddles
three groups: sections 2-3 are mathematical physics (MP-MATH, "computational
foundations"), section 4 generalises a WG-05 metric, section 6 is ALE/ROSI
(WG-01, "a premium an underwriter will sign"). It is not one of the six WG-06
papers and not the G_CPDT schema paper WG-05 needs. Designation **P5 is the
Manufacturing case** (`C/…/Manufacturing-RefPharma-API-1.md:3`). Worse, the
programme has an explicit, repeated decision that it does not do what this
paper does: P7 `:29` "**It does not state a time or a cost.** The three
applied papers each refuse both, for the same reason: the reference assets
carry no coolant inventory, no thermal mass, no batch value and no commercial
model." This paper states both, in dollars and seconds, and never cites P7 or
the two-schema bridge whose §4.4-4.5 already define $\mathcal{B}$, $w(x,y)$,
$\mathcal{L}_{total}$ and ALE (`C/…/Unified-DEXPI-CycloneDX.md:311-336`). $R_K$
and $\kappa$ (`:131-146`) are a renamed restatement of that section.

**(b) Structure and quality.**

- `# H1` (`:1`), no abstract, `## 1. Executive Summary & Scope`. No RFC 2119
  clause and no MUST/SHOULD anywhere: consistent, but then "Designation P5 …
  of G_CPDT" (`:15`) attaches a non-normative essay to a normative programme.
- Mathematics: the saddle-node normal form, the runaway-time integral and its
  $\pi/(2\sqrt{\mu})$ limit (`:35-93`) are correct and render. The CSTR balances
  (`:103-105`) are standard. **Everything after that is asserted, not derived**:
  "$\mu = Q_{gen} - Q_{removal}$" (`:113`) is dimensionally not the $\mu$ of
  `:35`; "$> 120\,\text{bar/s}$" (`:115`) is a Clausius–Clapeyron slope with no
  parameter values; "typically 40 bar … under 8.4 seconds" (`:117`) is not
  computed from any stated $\mu$.
- Section 5 numbers are all invented and some contradict the corpus: `:154`
  3.2 s / 5.8 s / 11.4 s / 125 °C; `:155` $1.28M, $4.2M, $5.48M; `:160`
  "250 MW / 1,000 MWh … 33 kV / 400 kV" against RefBESS-250MW's **500 MWh,
  220 kV connection, 33 kV collection** (`C/…/RefBESS-250MW-Specification.md:12,45-47`);
  `:161` "pole-slipping … δ > 90°" is synchronous-machine physics applied to
  an inverter-coupled BESS; `:162` 180,000 meters, $28.6M. `:7` "180 bar",
  `:137` $w(e)=0.95$ likewise.
- KaTeX: `:155` breaks (section 1.3). Every other block renders.
- Mermaid stateDiagram parses, accTitle/accDescr present (`:39-65`).
- References: [1] CVSS v3.1 (FIRST, 2019) real. [3] CC BY real. [4] Strogatz
  2nd ed., Westview 2015, real. [5] Semenov 1935 real. **[2] is wrong on issuer,
  title, year and content**: Y5381 is a Lloyd's (not LMA) Market Bulletin dated
  16 August 2022, *State backed cyber-attack exclusions*
  (assets.lloyds.com/…/Y5381 Market Bulletin - Cyber-attack exclusions.pdf); it
  requires standalone cyber policies to exclude state-backed attacks and says
  nothing about "affirmative physical consequence aggregation" (`:15`, `:166`,
  `:193`). The corpus already describes it correctly at
  `C/WG-07-TM-Threat-Modeling/WG-07-TM-CyHAZOP-Methodology.md:341` and
  `C/WG-04-CF-Cascading-Failures/WG-04-CF-Emerging-Power-Topologies.md:258`.
  **[6] expands TACAM as "Threat Actor Capability and Attack Modeling"**; the
  registry says "Threat Actor Capability and Motivation" (`wikiRegistry.ts:1042`).
  "Paper P4" (`:121`) and "Invariant E-13" (`:129`) are used without a
  bibliography entry.
- "for submission to the IEEE Systems, Man, and Cybernetics Society, the
  Society for Risk Analysis, and the Lloyd's Market Association" (`:17`) is a
  claim about intent with no basis in the plan.

**(c) Fix list.**

1. Decide where it lives. If kept, re-designate, retitle consistently (H1 vs
   `papers.ts:115` vs Multigraph [3]), and place under MP-MATH or WG-01; it is
   not a WG-05 "one computable graph" paper.
2. Reconcile with P7 `:29` and the two-schema bridge §4.4-4.5: cite them, and
   either drop the cost/time numbers or derive them from stated, sourced
   parameters on a synthetic asset that publishes a cost model (none does).
3. Fix Y5381 ([2], `:15`, `:166`), TACAM expansion ([6]), and add entries for
   P4 and the bridge.
4. Delete or source: `:7` 180 bar; `:115-117` 120 bar/s, 40 bar, 8.4 s;
   `:137` 0.95; `:154-162` every figure; `:160` align with RefBESS.
5. Fix the inline-math capture at `:155` (`\$1.28M`, `\$4.2M`).
6. Rewrite `:161` for an inverter-based resource, or drop the case.
7. Remove `# H1` (`:1`) and `:17`.

### 2.3 `WG-06-CRA-Product-Assurance/WG-06-CRA-Product-Assurance.md` ("Designation P6")

**(a) Plan fit.** Phase 4 is six papers, one PR each, WG-06 created by the
first (`task_plan.md:268-287`). This file compresses four of them: §2 is
paper 1 (classification/routes, which the plan says *absorbs the corrected CRA
paper*), §3-4 is paper 4 (CycloneDX as Annex I Part II evidence) with VEX added,
§5 is paper 5 (Article 14 mechanics), §6 gestures at paper 3 (data model) and
6 (dossier). It is none of them fully, it is not the first one the plan
sequences, and it labels itself "P6 … of G_CPDT" while sitting in a WG-06
folder, so its programme identity is WG-05 and its registry identity would be
WG-06. Designation **P6 is the Rail case**
(`C/…/Rail-RefDepot-EMU-12.md:3`). §3.3 "working group's own measurements …
running the falsification engine … against 14 commercial industrial control
assemblies" (`:127-135`) is the unnamed implementation's field data, not a
synthetic RefProduct, and "reproducible from the stated inputs" is false because
no inputs are stated. That is the F9 rule broken while claiming to honour it.

Folder/id: `WG-06-CRA-Product-Assurance/` vs the plan's `WG-06-SC`
(`task_plan.md:98`, F13). INV-7 means the folder name is permanent once merged.
The existing convention is `WG-05-CAD-DEXPI-2/` for group `WG-05-CAD`, so the
folder should start `WG-06-SC-…` and the file `WG-06-SC-….md`.

**(b) Structure and quality.**

- `# H1` (`:1`), no abstract. RFC 2119 clause placed after the diagram (`:61`).
  **"numbered S-1 through S-25"; only S-1..S-5 exist** (`:79,81,139,182,188`).
  `:102` "four automated topological theorems", three follow (`:104-123`), and
  the accDescr says three (`:24`).
- CRA facts checked against `S/external-research/WG-05-CAD_eu-cra-product-classes_20260911.md`:

  | Line | Claim | Source | Verdict |
  |---|---|---|---|
  | 5 | adopted 23 Oct 2024, OJ 20 Nov 2024, in force 10 Dec 2024 | `:126-128` | correct |
  | 5 | €15m / 2.5 %, whichever is higher, Art. 64(2) | `:156` | correct |
  | 8-10 | 11 Jun 2026 Ch. IV (Arts 35-51); 11 Sep 2026 Art. 14; 11 Dec 2027 | `:122-124` | correct |
  | 9 | notify ENISA and the CSIRT within 24 h | `:134` | correct |
  | 69 | "three named designations" | `:36-39` "The Regulation names **two** designations" | **wrong**, and self-contradictory with the preceding sentence ("a residual the Regulation does not name"). The corrected CRA paper says two (`S/…/Supply-Chain-EU-CRA.md:24`). |
  | 73-76 | annexes, 19/4/3, Art. 32(1)-(4), Art. 8(1) fallback, HSM in Annex IV, module A "internal control" | `:62-109` | correct |
  | 173 | "Article 14(1) and (2)" for the three-stage timeline | Art. 14(3)-(4) cover severe incidents | incomplete |
  | 177 | early warning content "product identifier and initial blast radius" | Art. 14(2)(a): only "where applicable, the Member States … made available" | **invented statutory content** |
  | 179 | 14 days after a corrective measure / one month after the incident notification | `:134-136` | correct |
  | 186 | "EC-type examination (Module B)" | Annex VIII Part II is "EU-type examination" | wrong term |
  | 188-194 | "Technical Documentation Dossier mandated by CRA Annex VII, organized into five verifiable packages" including HBOM and CBOM | `:144-150` "The Regulation mandates a **software** bill of materials only … HBOM do not appear" | **misattributes the spec's five packages to Annex VII**; Annex VII's eight items are not these. Same defect F15-F3 just removed from the CRA paper. |
  | 96 | CRA does not mention VEX; Annex I Part II duty | consistent | correct and well put |
  | 89 | CycloneDX six `analysis.state` values; CISA four | CycloneDX 1.6 schema; CISA min. reqs. | correct |
  | 96 | "CycloneDX independently requires a justification or an impact statement alongside not_affected" | CycloneDX schema: `justification` optional; the requirement is CISA's | **wrong attribution** |

- Theorem logic: Theorem 1 (`:105-107`) says a path *containing* a diode
  implies `ShortestPath = ∅`; a path that contains an edge is not empty. The
  condition should be "no path with non-zero attenuation product". Justification
  mapping is off: an air gap/diode is `protected_at_perimeter`, not
  `code_not_reachable` (which means the code path is unreachable inside the
  product). Theorem 2's formula (`:114`) does not express the "intercepted by a
  SIL 3 interlock" branch. Theorem 3 (`:119-121`) uses a property `active` no
  schema defines and "configuration bill of materials", which is not a CycloneDX
  BOM type (OBOM is).
- Unsourced numbers: `:12` "300 to 800 discrete components … 40 to 90 CVEs";
  `:14` "four and eight engineer-hours"; `:16`, `:25` "over 90%"; `:129-135`
  14 / 4,820 / 612 / 554 / 42 / 16; `:196` "six months"; S-4 "within 60
  seconds" (`:182`).
- **`CVE-2024-55321` (`:152-154`) does not exist**: `cveawg.mitre.org/api/cve/CVE-2024-55321`
  returns `CVE_RECORD_DNE`; NVD API returns zero results. It is presented as "a
  critical OpenSSL vulnerability" with an NVD URL. Use a real OpenSSL CVE or a
  clearly synthetic id (`CVE-0000-00000` style, labelled).
- `:16` "the five directed relations of G_CPDT": P1 says `identity` is not
  directed (`C/…/Three-Identity-Join.md:150`).
- References: [1] CRA, [2] ECMA-424, [3] RFC 2119, [4] CC BY, [5] IR 2025/2392
  (matches the source file) real. **[6] is a mash-up**: body text cites "CISA
  VEX minimum requirements [6]" (`:89`) but [6] is titled "VEX Overview and Use
  Cases … 2023". CISA's *Use Cases* is April 2022; *Minimum Requirements for
  VEX* is April 2023 (cisa.gov/…/minimum-requirements-for-vex-508c.pdf). Cite
  the latter.
- Mermaid parses; `-- Yes -->` inside the fence is mermaid syntax, not prose,
  so the em-dash rule does not apply. OXOT absent. No banned words.
- The verified source file says `Supports: … Supply-Chain-EU-CRA.md` only
  (`:6-7`); it needs the WG-06 paper added, and its `WG-05-CAD_` prefix will
  not tie it to WG-06 under the README's convention.

**(c) Fix list.**

1. Re-scope to one of the six planned papers (paper 5, Article 14 mechanics,
   is the closest fit for §3-5), move classification (§2) into paper 1 which
   absorbs the corrected CRA paper, and drop the "P6 of G_CPDT" designation.
2. Rename folder/file to the `WG-06-SC` id before anything is committed.
3. Delete §3.3 or replace with a synthetic RefProduct run whose inputs are
   published (F9). Remove every unsourced figure listed above.
4. `:69` two designations; `:177` early-warning content per Art. 14(2)(a);
   `:186` EU-type; `:188-194` separate what Annex VII requires from what this
   specification adds, remove the HBOM implication; `:96` attribute the
   justification requirement to CISA; `:16` "four directed relations and one
   identity relation".
5. Replace `CVE-2024-55321` (`:152-154`).
6. Fix S-1..S-25 vs five (`:61`), "four theorems" (`:102`), Theorem 1 and 3
   formal statements (`:105-107`, `:119-121`), justification mapping.
7. Fix [6]; add a `WG-06-SC_cisa-vex-minimum-requirements_<date>.md` and a
   `…_cyclonedx-vex-analysis-enum_<date>.md` source file.
8. Remove `# H1` (`:1`); move the RFC 2119 clause above the diagram.

---

## 3. The three edited papers

Hunks are saved at
`/tmp/claude-0/-home-claude/3423f26f-f470-5c1e-be1e-4db2800d4a42/scratchpad/diffs/*.diff`.
Summary per file (committed → staged):

| File | chars | headings | mermaid | tail80 | sha | what changed |
|---|---|---|---|---|---|---|
| Three-Identity-Join (P1) | 40,563 → 42,149 (+1,586) | 29 → 30 | 0 → 1 | unchanged | changed | lines 1-8 metadata table deleted, `# H1` added; §1 heading renamed "Scope, and what this specification does not do" → "Executive Summary & Scope"; G_CPDT sentence + 38-line mermaid inserted after the scope paragraph; licence sentence reworded; new **G_CPDT** term at §1.2 (`S/…:68`) |
| CIM-Profile (P2) | 38,017 → 39,497 (+1,480) | 15 → 16 | 0 → 1 | unchanged | changed | metadata table deleted, `# H1` added; §1 heading renamed (loses "the IEC 61850 versus IEC 61970 distinction"); scope paragraph rewritten to cite [6],[7]; "CPAI throughout" sentence rewritten; 45-line classDiagram inserted; §4 heading renamed and a filler sentence added (`S/…:114-116`) |
| Conformance (P3) | 41,309 → 42,846 (+1,537) | 23 → 24 | 0 → 1 | unchanged | changed | metadata table deleted, `# H1` added; §1 heading renamed; 39-line flowchart inserted; "(CC BY 4.0)" added; §2 gains "under Schema G_CPDT (…)" (`S/…:65`) |
| Supply-Chain-EU-CRA (context) | 32,947 → 37,123 (+4,176) | 26 → 26 | 3 → 3 | unchanged | changed | Phase 1 correction; content matches the verified source file (spot-checked dates, annexes, routes, 64(2)-(5), Art. 2/3(2)) |

### 3.1 Is the G_CPDT definition consistent?

No, and it is not "the same definition text in all three".

- **P1 `S/…:68`** carries the only full definition: "The unified, traversable
  multigraph schema instantiated by binding physical process topology (DEXPI 2.0
  / ISO 15926-4), component supply-chain hierarchy (OWASP CycloneDX 1.6+ /
  ECMA-424), and electrical network topology (IEC 61970 CIM) via decoupled RFC
  9562 asset references without mutating or forking any underlying standard."
- P2 (`S/…:21`) and P3 (`S/…:65`) carry only the parenthetical expansion
  "Schema G_CPDT (Graph of Cyber-Physical Digital Twins)". Acceptable if P1 is
  the defining paper, but P1's definition says "CycloneDX **1.6+**" while P1
  §9 fixes its normative target at 1.6 exactly (`C/…:366`).
- The Multigraph paper (`S/…:45-49`) gives a *fourth* definition, as an LPG
  7-tuple with its own labels and uppercase relations; the Kinetic paper uses a
  fifth notation ($\mathcal{V}_{comp}$, $\mathcal{E}_{CONTROLS}$, `:99`).
- **The site's use is two-schema.** `web/src/app/unified-standard/page.tsx:705`
  "single computable graph schema G_CPDT, joining physical P&ID multigraphs with
  digital component dependency DAGs", attributed to "Unified DEXPI & CycloneDX
  Schema"; `:620` "ISO 15926-4 ⟷ CycloneDX 1.6+ Binding". The staged definition
  is three-schema. Either the page or the definition has to move; F3 asked for
  a defining paper, not two incompatible meanings.
- The inserted P1 diagram contradicts P1's own normative sections: it names
  `dexpi:AssetRef`, `g_cpdt:asset_ref` and `cim:AssetCyberLink` (`S/…:40,46,52`).
  P1 §5.1 names the DEXPI attribute `AssetReference` (`C/…:248`), §6.1 names the
  CycloneDX property `assetjoin:ref` (`C/…:281`), and R-27 (`C/…:298`) plus P2
  C-1/C-3 (`C/…CIM…:147,151`) forbid adding anything in the CIM namespace.
  "Class: EnergyConsumer / Motor" is not a CPAI class.
- The inserted P2 classDiagram (`S/…:23-67`) adds a class
  `AssetReferenceBinding` and an association "binds via AssetCyberLink": an
  invented extension in a paper whose C-1 says a CPAI document MUST NOT declare
  any class in the CIM namespace and whose C-3 says the binding is carried as
  properties outside it. The attributes shown for CIM classes (`inService`,
  `p`, `q`, `open`, `relayDelayTime`) are real CIM attributes but P2 §6
  deliberately excludes "the network's numbers".
- The inserted P3 flowchart (`S/…:21-59`) misstates P3: "RFC 9562 UUIDv4
  Validation (Rules V-07..V-10)" (V-07 is authority URI, V-08 basis, V-09
  foreign id, V-10 native schema; UUID form is V-01; and P1 R-1 does not require
  version 4); "Closed Relation Vocabulary Check (supplies, **feeds**, controls,
  monitors, partOf)" (`feeds` is not in R-4, `identity` is missing); "RT-1: P&ID
  to BOM, RT-2: BOM to CIM, RT-3: Trilateral" (P3 §5: RT-1 DEXPI round trip,
  RT-2 CycloneDX version bump, RT-3 CIM round trip, `C/…:422-438`); accDescr
  "single-file mechanical rules V-01 through V-13" (rules run to V-35).

### 3.2 F3 and the "outside its unit" rule

F3 says G_CPDT is "asserted on the site and defined in no paper" and the plan
blocks Phase 4 paper 3 on a WG-05 G_CPDT specification. Retrofitting the term
into P1 §1.2 does technically remove F3, but it does so by editing three
published, **featured** papers (ranks 12, 9, 13, `wikiRegistry.ts:887-928`)
outside any phase allowlist. `task_plan.md:20-22`: "A phase allowlist may
suspend a specific one for a specific file; nothing else may move." Phase 1's
allowlist is the CRA paper only (`:140-142`); Phases 2 and 3 forbid any
reference-file change (`:207-209`, `:230`). These edits therefore fail the
census diff in every phase as written. If the definition is to be inserted in
P1, it needs its own phase with its own allowlist (sha, chars, lines, headings,
fences, mermaid for that one file), and the diagram must agree with the text.

### 3.3 Invariants threatened

- INV-5 total characters: +4,603 from the three edits (plus +4,176 CRA, plus
  51,708 for the new papers). Any Phase 1 census diff run after these edits
  fails.
- INV-6 mermaid count 91 → 94 from the edits alone (→ 97 with the new papers).
- INV-11/12: sha, chars, lines, headings change for three unallowlisted files.
- INV-13 tail80: **unchanged** for all four (verified, table above), so nothing
  was truncated.
- INV-14 (registry title, slug, badge…): untouched; but the new `# H1` text in
  each file differs from the registered `title` (e.g. P1 H1 "…DEXPI 2.0,
  CycloneDX, and CIM" vs title "…DEXPI 2.0, CycloneDX 1.6, and IEC 61970 CIM"),
  a drift the renderer hides.
- INV-7/8: no path or slug moved.
- The deleted metadata tables carried `Status | Draft for submission` and, in
  P1, `Extends | The Unified DEXPI 2.0 and CycloneDX 1.6 Semantic Bridge`; that
  provenance is gone. Managed rule 1 explicitly permits the compact table and
  forbids the H1, so the edit moves the programme from the compliant form to
  the non-compliant one on all three files.
- CRA paper: the compiler guard fails as staged (section 0, item 9). Phase 1's
  own checklist (`task_plan.md:178-186`) requires the compiler edit and an
  idempotence run.

---

## 4. Registration

### 4.1 `papers.ts` (staged)

Three entries added after `blast-radius-three-ontologies` (`S/web/src/lib/papers.ts:110-121`):
`multigraph-engine`, `kinetic-blast-radius`, `cra-product-assurance`. Titles
there do not match the files' H1s (section 2). Nothing else changed.

### 4.2 `wikiRegistry.ts` (not staged; required)

For `multigraph-engine` and `kinetic-blast-radius`, append to
`WORKING_GROUPS[WG-05-CAD].documents` after
`WG-05-CAD-Blast-Radius-Three-Ontologies` (`wikiRegistry.ts:1007-1022`):

```
id: "WG-05-CAD-Multigraph-Engine", slug: "multigraph-engine",
title, titleNl, subtitle, subtitleNl,
workingGroupId: "WG-05-CAD",
workingGroupName: "DEXPI 2.0 & CAD Interoperability", workingGroupNameNl: "DEXPI 2.0 & CAD Interoperabiliteit",
relativePath: "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Multigraph-Engine.md",
author: "J. McKenney", publicationDate: "<date>", badge, badgeNl
```

and the same for the Kinetic file. Do **not** set `featured` (audit-featured
requires exactly 13). Update the group badge `CAD STANDARDS 01–14` /
`CAD STANDAARDEN 01–14` (`:769-770`) to `01–16` (F14 convention; not audited).
The plan's Phase 3 arithmetic table (`task_plan.md:86`, WG-05 stays 14) and
INV-1 (63) both move; that is fine only if these land as their own PRs after
Phase 3 with a re-baselined census, or the census allowlist names them.

For `cra-product-assurance`, a new group block is needed, and the plan fixes
its id:

```
id: "WG-06-SC", title: "<Statutory Conformance …>", titleNl, number: "WG-06",
badge: "CONFORMANCE 01–01", badgeNl, description, descriptionNl, documents: [ { …, workingGroupId: "WG-06-SC", relativePath: "references/WG-06-SC-…/WG-06-SC-….md", … } ]
```

plus `WG_ICON_MAP["WG-06-SC"]` in `web/src/app/tracks/page.tsx:25-35`, and
EN+NL for any new subtitle string that goes through `t()`
(`audit-translation-keys.mjs`). **Id conflict:** the staged folder and file say
`WG-06-CRA-Product-Assurance`; the plan says the id is `WG-06-SC` and explains
why not `WG-06-EC` (F13). The `relativePath` is permanent (INV-7) and the id is
a live `?wg=` parameter (INV-9), so both must be `WG-06-SC` on first commit.
The registry's `id` regex in `audit-counts.mjs:41` (`WG-\d{2}-[A-Z]+`) accepts
`WG-06-SC` and also `WG-06-CRA`, so the audit will not catch the wrong choice.

### 4.3 Generated files

`web/src/lib/generatedReferencesContent.json` and `.ts` are rewritten by
`sync-publications.js` on every `predev`/`prebuild`/`verify`; no hand edit.
Optionally add slug → baseName aliases in `sync-publications.js:106-131` (the
path-first lookup in `wiki.ts:42` makes them unnecessary; F14 notes the alias
layer is half-migrated). `notes/2026-09-08/corpus-system-view.md`'s hand-written
file index will go stale (CLAUDE.md warns of this).

### 4.4 External-research source files

The citation audit does not check them (section 1.2, row 14); CLAUDE.md policy
does. Required by that policy for the papers as written:

| Paper | Needed | Exists? |
|---|---|---|
| Multigraph | none new if section 6 is deleted; otherwise `WG-05-CAD_graph-db-traversal-benchmarks_<date>.md` for PostgreSQL/Jena/LPG figures | no |
| Kinetic | `MP-MATH_saddle-node-normal-form_<date>.md` (Strogatz), `…_semenov-thermal-explosion_<date>.md`, `WG-01-UI_lloyds-y5381_<date>.md` (corrected bulletin), plus one per numerical claim kept | none |
| WG-06 | CRA/IR 2025/2392: **exists** as `WG-05-CAD_eu-cra-product-classes_20260911.md` but its `Supports:` line names only the CRA paper and its prefix is WG-05-CAD; `WG-06-SC_cisa-vex-minimum-requirements_<date>.md`; `WG-06-SC_cyclonedx-1.6-vex-analysis_<date>.md`; a source for every §1 and §3.3 figure kept | only the CRA one |

Do not touch `references/external-research/README.md` while adding these
(F2; it is a published treatise).

---

## 5. Verdicts

| Paper | Verdict | Reasons |
|---|---|---|
| `WG-05-CAD-Multigraph-Engine.md` | **NEEDS REWRITE** | Designation collision (P4 taken); vocabulary contradicts P1 R-4 and its own closure; three mutually inconsistent edge models across text, diagram and queries; Q-3 cannot produce its "isolated" result and ignores direction; benchmark and RefBESS counts fabricated and contradicted by the reference asset; "E-1 through E-20" vs 13; phantom V-19/V-20; H1. The idea (LPG projection of the P1 join, Cypher catalogue) is on-plan for WG-05 and worth keeping. |
| `WG-05-CAD-Kinetic-Blast-Radius.md` | **OFF-PLAN, NEEDS REWRITE** | Not a WG-05 instrument paper, not one of the six WG-06 papers; P5 taken; contradicts P7's documented refusal to state time or cost; restates the two-schema bridge §4.4-4.5 uncited; Y5381 and TACAM misdescribed against the corpus; every case-study number invented, two contradict RefBESS; one KaTeX rendering break. The saddle-node section (§2) is correct and could stand alone as an MP-MATH note with sourced examples. |
| `WG-06-CRA-Product-Assurance.md` | **NEEDS REWRITE** (re-scope to the six-paper plan) | Compresses four planned papers into one, skips the plan's first paper, self-labels as a WG-05 "P6"; wrong folder/id (`WG-06-SC`); §3.3 benchmark violates F9 and is unreproducible; non-existent CVE; five CRA misstatements (two designations, early-warning content, EU-type, Annex VII/HBOM, justification attribution); S-1..S-25 vs five; "four theorems" vs three; Theorem 1 and 3 formal statements wrong; [6] mislabelled. The CRA timeline, classification table, and the VEX-state/CISA mapping paragraphs are correct and reusable. |
| P1 edit | **DO NOT SHIP AS-IS** | Diagram contradicts §5.1/§6.1/R-27; H1 replaces the compliant metadata table; outside every allowlist; definition says "1.6+" against §9. Keep the §1.2 term (with "1.6") if a dedicated phase is opened for it. |
| P2 edit | **DO NOT SHIP AS-IS** | Diagram invents `AssetReferenceBinding`/`AssetCyberLink` against C-1/C-3; §1 heading loses its 61850/61970 signpost; H1; filler sentence at `:116`; outside allowlist. |
| P3 edit | **DO NOT SHIP AS-IS** | Diagram misdescribes V-07..V-10, invents `feeds`, mislabels RT-1..3 and rule range; H1; outside allowlist. |
| CRA paper (context) | **PUBLISHABLE AFTER FIXES** | Text matches the verified source; the compiler must carry the same change and the idempotence check must be run (Phase 1 checklist). |

---

## Appendix: commands run

```
cp -r /home/claude/eigenia /home/claude/eigenia-scratch          # staged files copied over it
cd /home/claude/eigenia-scratch/web && npm ci --ignore-scripts
node scripts/audit-mermaid.mjs                                  # 97 pass
REFERENCES_DIR=/home/claude/eigenia/references node scripts/audit-mermaid.mjs   # 91 pass (baseline)
node scripts/audit-ascii-art.mjs; node scripts/audit-terminology.mjs
node scripts/audit-citations.mjs --warn-orphan-entries
node scripts/sync-publications.js && node scripts/run-audits.mjs  # 8 pass, 1 skipped
npx vitest run                                                   # 1 failed (66 vs 63)
node scripts/_mathtest.mjs <three new files>                     # KaTeX + inline-span check
python3 scripts/compile_p03_supply_chain_cra.py                  # reverts staged CRA .md to committed sha
curl https://cveawg.mitre.org/api/cve/CVE-2024-55321             # CVE_RECORD_DNE
curl "https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2024-55321"   # totalResults 0
```
