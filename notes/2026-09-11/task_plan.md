# Task plan: working-group restructure

**Goal.** Correct a live regulatory error, then rename and re-cut the working
groups onto an instrument-and-outcome scheme and open a statutory-conformance
group, **without losing, moving, truncating, or mis-titling a single document.**

**Method.** Every phase is bracketed by a census. A phase passes only when the
census diff contains exactly the changes on that phase's allowlist and nothing
else. Independent agents re-derive the measurements rather than confirming mine.

Decisions of record, 2026-09-11: Eigenia specifies the method and OXOT is never
named; the classification correction ships first and alone; titles follow
instrument-and-outcome. Evidence in `findings.md`.

Read `findings.md` before starting any phase. Read this file before any decision.

---

## The invariants

These hold across the whole programme. A phase allowlist may suspend a specific
one for a specific file; nothing else may move.

### Nothing is lost

| | Invariant | Baseline |
|---|---|---|
| INV-1 | Document count | 63 |
| INV-2 | Every registry entry resolves to a file on disk (`missingFiles`) | empty |
| INV-3 | No duplicate slug, no duplicate document id | empty, empty |
| INV-4 | Markdown on disk with no registry entry may only ever contain `external-research/` files | 6 files |
| INV-5 | Total corpus characters | 2,080,789 |
| INV-6 | Mermaid diagram count | 91 |

### Nothing is misplaced

| | Invariant | Baseline |
|---|---|---|
| INV-7 | Every `relativePath` byte-identical. **No file under `references/` is ever renamed, moved or deleted** (`CLAUDE.md`) | 63 paths |
| INV-8 | Every `slug` byte-identical. Slugs are live URLs at `/papers/[slug]` and `/theory/[slug]` | 63 slugs |
| INV-9 | Group id set only ever grows. Ids are live `?wg=` URL parameters (F7) | 9 ids |
| INV-10 | Every document's `workingGroupId` equals the id of the group it is nested under (`groupIdMismatch`) | empty |

### Nothing is truncated

| | Invariant | Baseline |
|---|---|---|
| INV-11 | Every file's `sha256` unchanged unless allowlisted | 69 files |
| INV-12 | Every file's `chars`, `lines`, `headings`, `fences`, `mermaid` unchanged unless allowlisted | per file |
| INV-13 | Every file's `tail80` unchanged unless allowlisted. A truncated file keeps its head and loses its tail, so the tail is the detector | per file |

### Nothing is mis-titled

| | Invariant | Baseline |
|---|---|---|
| INV-14 | Every document's `title`, `titleNl`, `subtitleSha`, `subtitleNlSha`, `badge`, `badgeNl`, `author`, `publicationDate`, `hookSha` unchanged. **Only group titles change in this programme** | 63 × 9 fields |
| INV-15 | Every document has a `titleNl` and a `badge`. EN and NL move together or the phase fails | 0 missing, 0 missing |
| INV-16 | Featured set and ranks unchanged | 13 featured |

### Standing prohibition, added after QA-5 (findings F11)

**No sweep script may be run during any phase of this work.**
`scripts/sweep_all_frontmatter.py` rewrites the header of every
`scripts/compile_*.py`, re-runs all 20 compilers via subprocess, then post-edits
every `references/**/*.md`. One invocation replaces the whole corpus and the
compilers that build it. `sweep_academic_formatting.py`,
`fix_all_academic_issues.py`, `clean_academic_prose.py` and
`enhance_manuscript_math.py` also write into `references/` through globs;
`research_paper_orchestrator.py` writes whatever path is passed as `sys.argv[4]`.

The `grep -rln "<filename>" scripts/` rule in `CLAUDE.md` finds the compiler that
owns a file but **not** the sweeps, because they reach files through a glob. The
rule is necessary and not sufficient.

### Arithmetic that must reconcile

Per-group counts sum to INV-1 at every phase boundary. Phase 3 moves papers
between groups, so the per-group numbers change while the total does not:

| Group | Now | After phase 3 | Movement |
|---|---|---|---|
| WG-01-UI | 12 | 12 | |
| WG-02-DT | 14 | 12 | 2 out to WG-03 |
| WG-03-ML | 7 | 4 | 5 out to WG-09, 2 in from WG-02 |
| WG-04-CF | 8 | 8 | |
| WG-05-CAD | 14 | 14 | |
| WG-07-TM | 4 | 4 | |
| WG-08-MO | 1 | 0 | 1 out to MP-MATH, group retired |
| WG-09 (new) | 0 | 5 | 5 in from WG-03 |
| MP-MATH | 2 | 3 | 1 in from WG-08 |
| GOV-RES | 1 | 1 | |
| **Total** | **63** | **63** | |

Group count stays 9: WG-09 is added, WG-08 is retired. WG-06 is **not** created
as an empty shell; it arrives in the PR that lands its first paper, because
`/wiki` and `/tracks` have no empty-group state worth exercising.

The conformance group takes the id **`WG-06-SC`**, not `WG-06-EC`.
`papers-pre-publish/PAPER_PROPOSALS_MASTER_BACKLOG.md:21` already assigned
`WG-06-EC` to proposal P-08, which shipped into WG-01 as
`ale-rosi-decision-framework` instead. No document or route uses `WG-06-EC`, but
the intent is on record, so a distinct suffix avoids resurrecting it by accident
(findings F13).

---

## Phase 0: build the diff instrument

Status: **census, baseline and diff all built and proven.** Only the promotion of
the census into the audit suite is outstanding.

- [x] Write `census.mjs`. Parses `wikiRegistry.ts` as text, never imports it, so
      the 3.3 MB content bundle stays out.
- [x] Capture `baseline-census.json`, sha256 `48b6623b343849ed2d2d0c2defcd7fc7cee874d67bf69e24e5487580d97386ee`.
- [x] Write `census-diff.mjs`: takes two censuses plus a phase allowlist, exits
      non-zero on any unlisted change, and prints every moved field as
      `<entity>.<field>: "<before>" -> "<after>"`. The allowlist is a whitelist,
      so a change nobody thought to forbid is still a violation.
  - [x] Verify: baseline against itself. PASS, 0 allowed, 0 violations, exit 0.
  - [x] Verify: `--self-test`, 11 cases, all pass. Catches a changed document
        title, a changed slug, a moved `relativePath`, a deleted document, a
        truncated file, a removed file, an unlisted group retitle, a changed
        badge, a changed `publicationDate`, and a dropped `titleNl`.
  - [x] Verify against the real baseline with defects injected by hand: caught a
        retitled paper, a changed slug, a removed file and a halved file, exit 1.
        **A diff tool that has never failed is not a diff tool.** This one has.
- [ ] Promote `census.mjs` to `web/scripts/audit-registry-invariants.mjs` so
      `run-audits.mjs` picks it up by filename, checking the invariants that need
      no baseline (INV-2, 3, 10, 15) on every build.
  - Verify: check it against the Docker layout. `COPY web ./` puts `web/*` at
    `/app`, and `references/` is copied separately. Use
    `web/scripts/lib/references-dir.mjs`. Two Railway builds broke on this in
    September while CI stayed green.
  - Verify: `npm run audit` reports 12 passing, 0 frozen, **0 skipped**.

## Phase 1: the CRA classification correction

One paper. Ships alone. Branch `fix/cra-product-classification`.

**Allowlist.** `sha256`, `chars`, `lines`, `headings` and `tail80` may change for
`references/WG-05-CAD-DEXPI-2/WG-05-CAD-Supply-Chain-EU-CRA.md` only. One new
file may appear in `unregisteredMarkdown`. Every other invariant holds exactly.

- [ ] Write `references/external-research/WG-05-CAD_eu-cra-product-classes_20260911.md`
      in the README's format: title, the query that found it, source URL, retrieval
      date. Cites Regulation (EU) 2024/2847 Articles 7, 8, 32 and 71(2), and
      Annexes I, III, IV, VIII, plus Commission Implementing Regulation (EU)
      2025/2392. Retrieve the authentic OJ XHTML from
      `publications.europa.eu/resource/celex/…`; the EUR-Lex web UI blocks
      automated fetches, and several widely-cited secondary sources get the
      Annex III / Annex IV split wrong (F15).
  - **Do not touch `references/external-research/README.md`.** It is a published
    treatise at `/papers/research-sourcing-governance` (F2). Editing it while
    adding a source file silently edits the corpus.
- [ ] Correct the embedded literal in `scripts/compile_p03_supply_chain_cra.py`.
      Not the `.md` (F5).

      **Scope widened after QA-4 (findings F15), pending Jim's approval.** The
      error is not local to lines 18 to 32. Sixteen distinct factual errors were
      verified against the authentic OJ text, six of them at lines 3, 36 and 42
      to 47. Each one is enumerated in F15 with its line number. The PR body
      lists every change.

      The classification block: three named designations plus a four-route
      structure, both important classes in Annex III, Critical in Annex IV, 26
      named categories as 19 / 4 / 3, Articles 7, 8 and 32 (not 6), module A
      relabelled "internal control" rather than "internal production control".

      Also at line 3: the publication date, the "full enforcement" date, the
      fabricated HBOM mandate, and the market-surveillance-authority recipient.
      At lines 42 to 47: the Article 64 paragraph numbers, all off by one.

      **Do not "fix" these, they are already correct** (F15): HSMs and smart
      meter gateways stay in the Annex IV group; hypervisors, firewalls and
      tamper-resistant microprocessors stay in the higher important class; plain
      microprocessors with security functionality stay in class I; the module
      letters; the five-year support period; "whichever is higher" on the penalty.
- [ ] Run **only** `python3 scripts/compile_p03_supply_chain_cra.py`. No sweep
      script, ever (see the standing prohibition above).
      `git diff --stat` must show **one** changed file.
  - QA-5 measured that all 17 literal-embedding compilers are currently
    byte-identical to their published output (F12), so a bare run reproduces the
    file exactly apart from the intended change. If `git diff` shows a second
    file, or unrelated hunks in this one, **stop**: something ran a sweep.
  - Verify idempotence: run it twice, `shasum -a 256` the output both times,
    hashes identical. This is the `compile_r07` trap.
- [ ] `node census.mjs . > after-phase1.json && node census-diff.mjs baseline-census.json after-phase1.json phase1`
  - Expect: exactly one file's hash moved, one new unregistered file, exit 0.
- [ ] `cd web && npm run verify` with a dev server up.
  - Expect 12 audits passing, 0 frozen, **0 skipped**, tests green, `tsc` clean.
  - The citation audit is the gate that catches a missing source file.
- [ ] QA-2, QA-4, QA-5 (below). All three must clear before the PR opens.
- [ ] Browser: `/papers/supply-chain-eu-cra-standards`, light and dark, narrow
      viewport. Confirm the table renders and no diagram broke.
- [ ] PR, CI green, merge, watch `railway deployment list` to SUCCESS, then
      `curl` the live paper and grep for `Annex IV` to confirm it now appears
      only against Critical.

Deliberately **out of scope**: the compliance dates, even though they are
verified in F4. Adding them is a drive-by. They belong to Phase 4's
classification paper.

## Phase 2: make renaming safe

Branch `chore/registry-group-name`. Ships nothing a reader notices.

**Allowlist.** `workingGroupName` and `workingGroupNameNl` may be removed from
document entries. No other registry field moves. No file under `references/`
changes at all: all 69 hashes identical.

- [ ] Derive `workingGroupName` / `workingGroupNameNl` from the group rather than
      storing it per document, 65 and 63 occurrences respectively.
  - **F1 is the trap.** 13 documents carry a deliberate short form, not a copy:
    12 in WG-01 and the GOV-RES README. A naive derivation lengthens the label on
    all 13. Either add a group-level `shortName` carrying the existing strings
    verbatim, or land this phase *after* Phase 3, where the new short titles make
    the short form unnecessary. **Prefer after Phase 3**: fewer fields, and it
    deletes a concept instead of adding one.
- [ ] Add the check to `audit-registry-invariants.mjs`: a document carrying a
      literal group name fails the build. This is what stops `paper.category`
      from coming back a third time.
  - Verify with a canary: temporarily reintroduce one, confirm the audit fails,
    remove it, confirm it passes. Every audit in this repo carries one.
- [ ] Census diff, `npm run verify`, QA-1 and QA-3.
- [ ] Browser: one paper hero per group, EN and NL, confirming the label reads
      the same as before for all 63.

## Phase 3: rename and re-cut

Branch `feat/working-group-taxonomy`. Registry edits only. **No file moves** (F8).

**Allowlist.** Group `title` and `titleNl` for 9 groups. Two new group blocks.
`workingGroupId` and the group nesting for the 8 papers that move. `WG_ICON_MAP`
entries. Nothing else, and specifically not one document `title`, `slug`,
`relativePath` or `badge`.

- [ ] Retitle, ids unchanged:

| id | Title | Subtitle |
|---|---|---|
| WG-05-CAD | G_CPDT | The unified open standard: one computable graph |
| WG-07-TM | TACAM / ATQ | Adversary quantification: a scored adversary, not a persona |
| WG-01-UI | ALE / ROSI | Cyber-physical risk transfer: a premium an underwriter will sign |
| WG-09 (new) | MPN | The McKenney-Lacan notation: operator state made audible |
| MP-MATH | Kramers / Monte Carlo | Computational foundations: numbers others can reproduce |
| GOV-RES | Sourcing Protocol | Citations that hold |
| WG-02-DT | Digital Twin Foundations | outcome-only: owns no named instrument yet |
| WG-03-ML | Operator Decision | outcome-only: owns no named instrument yet |
| WG-04-CF | Grid Dynamics | outcome-only: owns no named instrument yet |

- [ ] Re-parent 8 papers, per the arithmetic table above:
  - To **WG-09**: `lacanian-psychohistory-framework`, `calculus-of-the-subject`,
    `loman-operator-topology-of-an-act`, `morphogenesis-signifying-chain-ggnn`,
    `musical-psychometric-notation`.
  - To **WG-03** from WG-02: `the-20-second-deficit`, `lacan-in-the-control-room`.
  - To **MP-MATH** from WG-08: `monte-carlo-engine`. Retire WG-08-MO.
- [ ] `WG_ICON_MAP` at `web/src/app/tracks/page.tsx:25`: add WG-09, remove WG-08.
- [ ] Decide the WG-08 URL question. `/wiki?wg=WG-08-MO` currently falls back to
      WG-01's first document rather than 404ing, so a saved link degrades quietly
      instead of breaking. Either accept that or add a three-line alias map.
      **Flag to Jim, do not decide silently.**
- [ ] Every new subtitle string goes through `t()` with EN **and** NL in the same
      commit, or `audit-translation-keys.mjs` fails the build.
- [ ] Census diff, `npm run verify`, QA-1 and QA-3.
- [ ] Browser: `/tracks` in both view modes, `/wiki` sidebar, one paper per
      re-parented group, EN and NL, light and dark.

## Phase 4: WG-06 Statutory Conformance

One PR per paper. WG-06 is created in the first of them, never empty.
Papers carry their own proof through synthetic reference products, because the
implementation is never named (F9).

1. [ ] Product classification and conformity routes. Absorbs the corrected paper
       by re-grouping, no file move. Carries the dates deferred from Phase 1.
2. [ ] Annex I to IEC 62443, clause by clause: the 13 essential requirements
       against 62443-4-1 practices and 4-2 CRs with SL targets.
3. [ ] The conformance data model on G_CPDT.
4. [ ] CycloneDX as Annex I Part II evidence.
5. [ ] Article 14 reporting mechanics.
6. [ ] The RefProduct set: four synthetic products, one per tier, each carried
       from classification to dossier.

Blocked on: **G_CPDT has no defining paper** (F3). Paper 3 cannot reference a
schema the corpus never defines, so WG-05 needs its G_CPDT specification either
before or alongside it.

---

## QA agents

**Independence rule.** An agent is given the artifact and the invariant, never my
conclusion and never the expected value. An agent asked "confirm the count is 63"
confirms 63. An agent asked "count the documents" measures them.

| | Agent | Runs | Method it must NOT use |
|---|---|---|---|
| QA-1 | **Census replicator** | phases 2, 3 | `census.mjs`. It must derive counts, slugs, paths and group membership by its own means, then report raw numbers. Protects against a bug in my instrument. |
| QA-2 | **Byte-integrity auditor** | every phase | Trusting the census. Works from `git diff`, `git stash` and `shasum` directly against `HEAD`. |
| QA-3 | **Naming auditor** | phases 2, 3 | Reading this plan's table as truth. Given the approved map separately, it checks ids unchanged, EN and NL both moved, and no document-level title touched. |
| QA-4 | **Regulatory fact-checker**, adversarial | phase 1, phase 4 | Being shown the corrected text first. Asked to establish the tier and annex structure from primary sources, then to try to refute the draft. |
| QA-5 | **Compiler guard** | any phase touching a treatise | Assuming one compiler owns one file. Must prove which compilers write the target, and that running the owner twice is byte-identical. |
| QA-6 | **Live reach verifier** | after every deploy | A 200 as proof. Must compare body length against the baseline per slug, because a 200 with a truncated body is the failure being hunted. |

### Gate procedure, every PR

1. Census before, census after, diff against the phase allowlist. Exit 0 or stop.
2. `cd web && npm run verify`, dev server up. 0 skipped or it did not run.
3. Dispatch the phase's QA agents in parallel. Every one clears or stop.
4. Browser sign-off by Jim: light and dark, EN and NL, narrow viewport.
   **No agent declares a page done.**
5. Merge, watch `railway deployment list` to SUCCESS, then QA-6.
6. Update `TASKS.md` and refresh its stamp. The `Stop` hook enforces this.

### Rollback

Every phase is one branch and one PR. Registry phases touch no files under
`references/`, so `git revert` is complete. Phase 1 touches a compiler and its
output, so a revert must be followed by one compiler run and a hash check to
confirm the `.md` returned to its pre-change sha256, which the baseline census
records.

---

## Progress

See `progress.md`.
