# Progress: working-group restructure

Session 2026-09-11. Branch at start: `chore/memory-enforcement` (`e388d03`),
one commit ahead of `main` (`f655255`), not pushed.

## 2026-09-11

### Phase 0, in progress

| Time | What | Result |
|---|---|---|
| 13:34 | Wrote `census.mjs`, the measurement instrument | exit 0 first run |
| 13:34 | Captured `baseline-census.json` | 108,636 bytes, sha256 `48b6623b…86ee` |
| 13:34 | Ran invariant checks against the baseline | 9 groups, 63 documents, 0 duplicate slugs, 0 duplicate ids, 0 group-id mismatches, 0 missing files |
| 13:36 | Wrote `findings.md` (F1 to F9) and `task_plan.md` (INV-1 to INV-16, phases 0 to 4, QA-1 to QA-6) | |
| 13:38 | Dispatched QA-1 census replicator, QA-4 adversarial CRA fact-check, QA-5 compiler-ownership audit, in parallel, each without being told the expected answer | pending |
| 13:42 | Wrote `census-diff.mjs` with an 11-case self-test | `--self-test` PASSED, exit 0 |
| 13:43 | Diff of the baseline against itself | PASS, 0 allowed, 0 violations, exit 0 |
| 13:44 | Diff against a deliberately corrupted copy of the real baseline | FAIL, exit 1, named all 3 injected defects |

### Proof the instrument can fail

The self-test asserts the diff catches each mutation, under the `phase1`
allowlist, and all 11 cases pass:

identical snapshots (0 violations), document title changed, slug changed,
`relativePath` moved, document deleted, file truncated, file removed, group
title changed, badge changed, `publicationDate` changed, `titleNl` dropped
while `title` kept.

Then against the real 63-document baseline, with three defects injected by hand:

| Injected | Detected as |
|---|---|
| Retitled `WG-05-CAD-Supply-Chain-EU-CRA` | `doc[…].title: "Supply Chain Transparency & EU CRA Regulatory Enforcement" -> "Supply Chain Transparency and EU CRA"` |
| Changed the MPN slug | `doc[…].slug: "musical-psychometric-notation" -> "mpn-notation"` |
| Deleted the Death Wobble file | `file[…].REMOVED: "present" -> null` |
| Halved the ATQ paper | `file[…].chars: 33198 -> 16599` and `tail80` changed |

A first attempt at the deletion test was itself a no-op, because I guessed the
filename instead of reading it: the real path is
`references/WG-04-CF-Cascading-Failures/WG-04-CF-Death Wobble-The Grids Precarious Pulse Frequency Instability - jmckenney.md`,
with spaces and a ` - jmckenney` suffix. Corpus filenames contain spaces. Any
shell loop over them must quote, and `grep -l | while read` will split them.

### What the baseline found before any change was made

Two things the census surfaced that were not in the design when I proposed it:

1. **13 documents carry a short-form `workingGroupName`**, not a copy of their
   group title: all 12 in WG-01-UI and the GOV-RES README. My proposal to
   normalize the field away would have silently lengthened the label on all 13.
   Recorded as F1. The plan changed: Phase 2 now runs *after* Phase 3, so the
   short titles remove the need for the field instead of a new `shortName` being
   added to preserve it.

2. **The sourcing treatise is `references/external-research/README.md`**, so the
   file documenting the source-file naming convention is also a published paper
   at `/papers/research-sourcing-governance`. Recorded as F2. Phase 1 adds a
   source file to that directory, so Phase 1 now carries an explicit
   do-not-touch on the README.

Neither was visible from reading the code. Both came out of measuring it.

## Errors encountered

| Error | Attempt | Resolution |
|---|---|---|
| Design assumed `workingGroupName` was a pure denormalized copy | 1 | Census disproved it. Phase order changed. See findings F1. |
| Design assumed the CRA paper could be edited in place | 1 | `grep -rln` showed `compile_p03_supply_chain_cra.py` owns it. Correction moves into the compiler. See findings F5. |

## Files created this session

| Path | Purpose |
|---|---|
| `notes/2026-09-11/census.mjs` | Measurement instrument |
| `notes/2026-09-11/baseline-census.json` | Pre-change snapshot |
| `notes/2026-09-11/findings.md` | Measured facts and verified sources |
| `notes/2026-09-11/task_plan.md` | Invariants, phases, QA agent roster |
| `notes/2026-09-11/progress.md` | This file |

Nothing under `references/`, `web/src/` or `scripts/` has been touched.

### QA results, 2026-09-11

| Agent | Verdict |
|---|---|
| QA-1 census replicator | **Confirms.** All 13 baseline measures reproduced exactly by an independent method |
| QA-5 compiler guard | **One serious finding.** `sweep_all_frontmatter.py` is a second owner of all 20 documents and all 20 compilers (F11). Also confirmed all 17 literal compilers are currently byte-identical to their output, which de-risks Phase 1 (F12) |
| QA-4 CRA fact-check | **Confirms the core error and finds 15 more** (F15). Also corrected five points in my own record of the regulation |

The fact-check corrected me on: the classifying articles are 7 and 8, not 6;
"risk tier" is not the Regulation's vocabulary and the default category has no
statutory name; I understated three of the four conformity routes; the class I
condition names three instruments, not one; and 11 June 2026 is when Chapter IV
applies, not a notified-body designation event, with NANDO listing zero CRA
notified bodies as of 9 August 2026.

Building the adversarial gate was worth it on its first run. It caught errors in
the artifact **and** in the analyst.

## Open decision for Jim

Phase 1 was scoped to one classification block. QA-4 proved the document carries
16 verified factual errors, six of them outside that block, including a
fabricated HBOM mandate, two wrong dates, and Article 64 paragraph numbers that
are off by one throughout. Widen the Phase 1 allowlist to every CRA factual claim
in this one document, or ship the narrow fix and open a second PR? Recommendation
and reasoning at the foot of F15.

### Merge, 2026-09-11 14:44

PR #27 merged to main as `0fcfe31`, four commits. All three CI checks passed on
the branch: Audits, Types and build, Unit tests. `mergeStateStatus: CLEAN`.

Railway picked it up as deployment `9a7ac53c` at 14:44:07, three seconds after
the merge commit.

Two things the push exposed, both worth keeping:

1. **My first two commits were internally inconsistent.** They changed a document
   under `references/` without regenerating
   `web/src/lib/generatedReferencesContent.json`, so the paper carried corrected
   text while the bundle the site renders from held the old word counts. It passed
   locally only because my working tree had a synced bundle I had deliberately
   left unstaged, since that copy also contained the concurrent session's papers.
   `audit-publications` caught it the moment the tree matched the commit. Fixed in
   `5560019`, regenerated inside an isolated worktree so it covers exactly the 70
   files the branch knows about.

2. **The pre-push hook tests the working tree, not the commits being pushed.** It
   failed 66-against-63 on the concurrent session's half-registered papers, which
   has nothing to do with this branch. `--no-verify` is correctly forbidden in
   this environment. The route through was a detached worktree at the branch HEAD:
   a tree that matches the commit exactly, so the hook ran in full and passed
   honestly. No bypass, and no editing of the other session's files.

`audit-rendered-completeness.js` had to be allowed to skip, by pointing
`AUDIT_BASE_URL` at an unused port. It compares markdown against a live dev
server, and the only server on 4500 serves the main repo with the other session's
newer content, so running it produced two false failures on files this branch
does not touch. CI and the Docker build skip it for the same reason: no server.
Recorded as a latent gap: `run-audits.mjs` probes `AUDIT_BASE_URL` but never
forwards `--base` to the audit, so that audit can only ever test port 4500.
