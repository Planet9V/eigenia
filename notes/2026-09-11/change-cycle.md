# The change cycle

The runbook applied to **every change unit** in this programme. `task_plan.md`
says what to change; this says how, and refuses to let a stage be skipped.

A **change unit** is the smallest edit that has its own verification. One paper's
classification block is a unit. One registry field across 63 documents is a unit.
A unit is never "a phase" and never "a file" unless those happen to coincide.

Six stages, gated. Each stage produces an artifact, and the next stage may not
begin until that artifact exists. The artifacts land in `change-ledger.md`.

```
A assess  ──→ B change ──→ C validate ──→ D record ──→ E review ──→ F QA pass
   │                            │                          │            │
   └── fails: do not touch      └── fails: revert,          └── fails: ──┘
       anything, write up           do not "fix forward"        back to B
       what blocks it
```

---

## A. Assess

Nothing is edited in this stage. Output: the unit's row opened in the ledger with
A1 to A5 filled.

**A1. Snapshot.** `node notes/2026-09-11/census.mjs . > notes/2026-09-11/before-<unit>.json`
Record its sha256. If a prior unit's *after* snapshot exists, this must equal it;
a mismatch means something changed outside the cycle.

**A2. Ownership.** For every file the unit will touch, answer *who else writes
this*, and record the answer:

```bash
grep -rln "<basename>" scripts/                    # the compiler that owns it
grep -rn  "glob.glob\|iglob" scripts/*.py          # the sweeps that reach it anyway
```

The first command is the rule in `CLAUDE.md`. **It is not sufficient**: five
scripts write into `references/` through globs and never name a file, and
`sweep_all_frontmatter.py` rewrites the compilers themselves then re-runs all 20
(findings F11). If a compiler owns the file, the edit location is the `.py`, not
the `.md`. If a docstring names a `papers-pre-publish/` source, verify it is
actually opened: `r02`, `r05`, `r06`, `r07` claim a source they never read (F12).

**A3. Consumers.** Who reads what the unit changes:

```bash
grep -rn "<field-or-symbol>" web/src --include=*.ts --include=*.tsx
```

Registry ids reach URLs as `?wg=`; slugs reach `/papers/[slug]`. Either is a
public contract (F7).

**A4. Facts.** Every factual claim the unit introduces or edits needs a source
before the edit, not after. Primary text, not a summary of it. For EU law,
retrieve the authentic XHTML from `publications.europa.eu/resource/celex/…`; the
EUR-Lex UI blocks automated fetches, and widely-cited secondary sources get the
CRA annex split wrong (F15). File it in `references/external-research/` as
`<WG-code>_<topic-slug>_<YYYYMMDD>.md` or the citation audit blocks the build.

**A5. Allowlist.** Write the unit's permitted movement into `census-diff.mjs`
before making the change. Writing it afterwards is fitting the test to the result.

**Gate A.** A2 answered for every file, A4 sourced for every claim, A5 committed.
If any file has an owner you did not expect, stop and write it up.

---

## B. Change

One unit. At the authoritative location found in A2.

- Edit the compiler literal, never the generated `.md` (F5).
- **Run only the owning compiler.** No sweep, ever (see the standing prohibition
  in `task_plan.md`).
- Every new UI string is a `t()` key with EN **and** NL in the same commit.
- Nothing outside the unit. If you notice an adjacent defect, it goes in
  `findings.md` as a candidate, not into this diff.

**Gate B.** `git diff --stat` shows exactly the files the unit named. A second
file means a sweep ran, or the unit was mis-scoped.

---

## C. Validate

Output: four pieces of evidence, pasted into the ledger, not summarised.

**C1. Allowlist diff.**
```bash
node notes/2026-09-11/census.mjs . > notes/2026-09-11/after-<unit>.json
node notes/2026-09-11/census-diff.mjs \
     notes/2026-09-11/before-<unit>.json \
     notes/2026-09-11/after-<unit>.json <phase>
```
Exit 0, or stop. Paste the ALLOWED list; it should read like the unit's intent.

**C2. Idempotence**, for any unit touching a compiler.
```bash
python3 scripts/<compiler>.py && shasum -a 256 "<output>" \
  && python3 scripts/<compiler>.py && shasum -a 256 "<output>"
```
Both hashes identical. This is the `compile_r07` trap.

**C3. Suite.** `cd web && npm run verify` with a dev server running.
Expect `0 frozen` and **`0 skipped`**. A skipped audit is not a passing audit:
`audit-rendered-completeness.js` skips silently with no dev server.
Never raise a count in `known-failures.json` to pass.

**C4. Browser.** The changed page, light and dark, EN and NL, narrow viewport.
A page that type-checks can still render wrong; a stray `**` reached production
with every gate green.

**Gate C.** All four produced. C1 exit 0. On failure, `git revert` the unit and
return to B. Do not fix forward on top of a failed validation.

---

## D. Record

Same sitting as the change. Not batched, not at the end of the day.

- The unit's ledger row completed, with the diff output and both hashes.
- `findings.md` gains any fact learned, with what it was verified against.
- `progress.md` gains the timestamped line, including anything that failed.
- **Every error goes in.** A failure recorded once is a failure not repeated.
- `TASKS.md` updated and its line-1 stamp refreshed. The `Stop` hook refuses to
  end a session that changed tracked files without touching it.

**Gate D.** Someone else could reproduce the unit from the ledger row alone.

---

## E. Review

Mine, before anyone else's. A different question from validation: validation asks
*did it work*, review asks *did I do what was specified, and only that*.

1. **Spec compliance.** Re-read the unit's entry in `task_plan.md`. Point at the
   diff line implementing each requirement. List anything missing.
2. **Nothing extra.** Every hunk in the diff traces to a stated requirement. A
   hunk that improves something unasked is removed, and noted in `findings.md`.
3. **Corrections marked.** Where this unit contradicts something I wrote earlier,
   the earlier record is corrected *and marked as a correction*, not silently
   overwritten. Five of my own errors are marked that way in `findings.md`.
4. **Nothing fabricated.** Every number traces to a measurement, every claim to a
   source. No count typed from memory; counts derive from `wikiRegistry.ts`.

**Gate E.** Steps 1 to 4 answered in the ledger row. Any gap sends the unit to B.

---

## F. QA pass

Independent agents. **The independence rule: an agent gets the artifact and the
question, never my conclusion and never the expected value.** An agent asked to
confirm 63 confirms 63; an agent asked to count measures. This rule is why the
first pass caught errors in the artifact *and* in me.

Dispatch in parallel. Every one clears, or the unit returns to B.

| | Agent | When | Paste-ready prompt |
|---|---|---|---|
| QA-1 | Census replicator | any registry unit | "Measure the following in `<repo>`: group count, document count, per-group counts, slugs, ids, relativePaths, and any document whose `workingGroupId` differs from its enclosing group. Do NOT read `notes/2026-09-11/`. Derive everything by your own method; do not import the registry as a module. Report raw numbers. End with an ANOMALIES section for anything I did not ask about." |
| QA-2 | Byte integrity | every unit | "In `<repo>`, list every file that differs from `git HEAD`, and for each give the sha256 before and after and whether the first and last 80 characters changed. Do not use any script under `notes/`. Work from git and `shasum` only. Flag any file whose character count dropped." |
| QA-3 | Naming auditor | any unit touching titles | "Here is a map of intended group titles: `<map>`. In `<repo>`, check: does every group id still exist and resolve; does every intended title match exactly; did any title change that is NOT on the map; does every changed title have both an EN and an NL value; did any *document* title, slug, or badge change. Report mismatches only." |
| QA-4 | Adversarial fact-check | any unit touching a claim | "Establish `<question>` from primary sources FIRST, citing a URL for each answer, and say where sources disagree and which you trust. ONLY THEN read `<file>` and list every factual error with its line number, every defensible-but-misleading claim, everything you could not verify, and everything already correct that a careless editor might break. Be adversarial, including about the framing of my question." |
| QA-5 | Compiler guard | any unit touching a treatise | "READ-ONLY, execute nothing: several scripts overwrite published documents. In `<repo>`, map every `scripts/compile_*.py` to the paths it writes, name every file with two or more writers counting glob sweeps, say whether each script embeds its content or reads it at runtime, and flag any non-determinism that would make two runs differ." |
| QA-6 | Live reach | after every deploy | "For each slug in `<list>`, fetch `https://eigenia.nl/papers/<slug>` and report the status and the body length. Compare each length against `<baseline>` and flag any that dropped by more than 2 percent. A 200 with a short body is the failure being hunted." |

**Gate F.** Every dispatched agent clears. Then, and only then, **Jim signs off in
the browser.** No agent and no gate declares a page done.

---

## Stop rules

**Three strikes, then escalate.** Attempt 1: diagnose and fix the root cause.
Attempt 2: a *different* approach, never the same action again. Attempt 3:
question the assumption behind the unit. After three, stop and hand Jim what was
tried and the exact error.

**Stop immediately, do not improvise**, when: a file has an owner A2 did not
predict; the allowlist diff reports a violation you are tempted to add to the
allowlist; a factual claim cannot be sourced; an agent contradicts a measurement
and you cannot tell which is right; or a sweep script has run.

**An agent claim is evidence, not a verdict.** QA-1 reported the ERCOT content key
as breaking a lookup. One command showed `wiki.ts:42` tries `relativePath` first,
so it does not. Verify before acting, and record the overstatement (F14).
