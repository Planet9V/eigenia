# Change ledger

One row per change unit, filled as the unit passes each stage of
`change-cycle.md`. Evidence is pasted, not summarised: someone should be able to
reproduce a unit from its row alone.

| Unit | A assess | B change | C validate | D record | E review | F QA | Status |
|---|---|---|---|---|---|---|---|
| U1 CRA classification | done | done | pass | done | **re-done** | integrity CLEAN; fact-check verdict YES, 3 of my errors found and fixed | `f54f9f9` + `8c53ca4` |
| U2 WG-06 CRA assurance | done | done | pass | done | done | not yet dispatched | **uncommitted on purpose** |

---

## U1. CRA factual correction, `WG-05-CAD-Supply-Chain-EU-CRA.md`

Branch `fix/cra-product-classification`, commit `f54f9f9`, 2026-09-11.
Scope set by Jim: the main CRA paper only, its 16 verified errors.

### A. Assess

**A1 snapshot.** `before-cra.json`, taken after the concurrent session's 13:57
edits so that its work falls outside my diff rather than inside it.
Diffed against `baseline-census.json`: 7 differences, **all attributable to the
other session** (`WG-05-CAD-Three-Identity-Join.md` +483 chars,
`WG-05-CAD-Conformance-Reference-Implementation.md` +60). Both are the G_CPDT
definition being added, which closes finding F3. Neither file is compiler-owned,
so those hand edits are safe.

**A2 ownership.** `grep -rln "Supply-Chain-EU-CRA" scripts/` returns exactly one
producer: `scripts/compile_p03_supply_chain_cra.py`. QA-5 independently confirmed
no second compiler writes that path, that p03 embeds the document as a raw
triple-quoted literal at line 12 and writes at line 386, and that its only import
is `re`. Six scripts reach `references/` through globs and were **not run**.

**A3 consumers.** `web/src/lib/papers.ts`, `web/src/lib/wikiRegistry.ts` and the
generated content bundle reference the path. The path did not change, so no
consumer required an edit.

**A4 facts.** `references/external-research/WG-05-CAD_eu-cra-product-classes_20260911.md`,
186 lines. Regulation (EU) 2024/2847 Articles 2, 7, 8, 13(8), 32, 64, 71(2) and
Annexes I, III, IV, VII, VIII; Commission Implementing Regulation (EU) 2025/2392.
It also records four widely-indexed secondary sources that get the Annex III
versus Annex IV split wrong, so they are not re-used.

**A5 allowlist.** `phase1` in `census-diff.mjs`, written before the edit: content
fields may move for the CRA paper only, plus one named new file.

### B. Change

Six edit groups applied to the compiler literal, each asserted to match exactly
once before replacement so a near-miss could not be silently skipped:

| | What was wrong |
|---|---|
| E1 | Abstract: wrong publication date, wrong full-application date, HBOM fabrication, wrong SBOM recipient, missing Article 64 paragraph |
| E2 | Scope: "all products" overstated, Article 2 exclusions absent, classifying articles, "three-tier risk hierarchy" |
| E3 | Classification items: Annex IV mislabelled as Important class II, HSMs and smart meter gateways in the wrong tier, PLCs and "industrial automation systems" not in Annex III, default tier wrongly conditioned, class I trigger understated, certification route omitted, Critical tier absent |
| E4 | Table 1.1: three rows for four routes, no Critical row, no class II row, "internal production control" is module C |
| E5 | Annex I Part I: "zero-trust network boundaries" and "line-rate hardware access controls" are not CRA language |
| E6 | Article 64 paragraph numbers off by one throughout; "2.0 %" and "1.0 %" |

**Gate B.** `git diff --stat` on the unit: 2 tracked files, the compiler and its
output, 62 insertions and 40 deletions. No third file.

### C. Validate

**C1 allowlist diff**, `before-cra.json` to `after-cra.json`, allowlist `phase1`:

```
ALLOWED (6)
  file[.../WG-05-CAD_eu-cra-product-classes_20260911.md].ADDED: null -> "present"
  file[.../WG-05-CAD-Supply-Chain-EU-CRA.md].sha256: "ed062c3e…" -> "516111e1…"
  file[.../WG-05-CAD-Supply-Chain-EU-CRA.md].bytes:  32947 -> 36845
  file[.../WG-05-CAD-Supply-Chain-EU-CRA.md].chars:  32947 -> 36845
  file[.../WG-05-CAD-Supply-Chain-EU-CRA.md].lines:  367 -> 378
  file[.../WG-05-CAD-Supply-Chain-EU-CRA.md].head80: "## Abstract\n\nOn September 13, 2024, …" -> "## Abstract\n\nRegulation (EU) 2024/2847, …"

VIOLATIONS (6)  <- all six are the concurrent session's, none mine
  file[.../WG-05-CAD-Kinetic-Blast-Radius.md].ADDED
  file[.../WG-05-CAD-Multigraph-Engine.md].ADDED
  file[references/WG-06-CRA-Product-Assurance/WG-06-CRA-Product-Assurance.md].ADDED
  file[.../WG-05-CAD-CIM-Profile-Cyber-Physical.md].sha256 / bytes / chars
```

The instrument earned its keep here: it separated my six changes from six
concurrent ones automatically, by name, with no judgement call required.
Character count went **up** (32,947 to 36,845), so nothing was truncated.

**C2 idempotence.** Compiler run twice:
`516111e1585f55bfca3d571e4b32c5e58d4c4cecd474db6a1f2d6665bbb5996b` both times.

**C3 suite.** `npm run audit` with a dev server up:
**10 passing, 0 frozen, 0 skipped.** The citation audit passes, which is the gate
that would have blocked a missing source file.

`npm run test:run` is RED in the working tree: 1 of 20 fails,
`expected 66 to be 63`. **Not mine.** The concurrent session added three papers
to `papers.ts` without yet adding them to `wikiRegistry.ts`. Proven by counting
the committed blobs rather than the tree:

| | `papers.ts` | `wikiRegistry.ts` |
|---|---|---|
| commit `f54f9f9`, what CI sees | 63 | 63 |
| working tree, contaminated | 66 | 63 |

My commit touches neither registry. CI on this branch will be green.

**C4 browser.** Outstanding. Requires Jim, per the standing rule that no agent
declares a page done.

### D. Record

This row. `findings.md` F4 corrected and F15 added. `progress.md` updated.
`TASKS.md` **not** updated: it is currently held by the concurrent session's
uncommitted edit, and touching it would stage their work into my commit. Flagged
to Jim rather than forced.

### E. Review

1. **Spec compliance.** All 16 errors in F15's inventory are addressed: B1 to B10
   inside the classification section, F1 to F6 outside it. Each maps to one of the
   six edit groups above.
2. **Nothing extra.** The diff is 2 tracked files. Every hunk traces to a numbered
   error. The Article 2 exclusions were added because "applies to all products"
   was flagged as overstated in the fact-check, not as an improvement of my own
   invention.
3. **Corrections marked.** Five errors of mine about the Regulation are corrected
   in `findings.md` F4 and labelled as corrections, not overwritten.
4. **Nothing fabricated.** Every statement in the new text traces to the source
   file, which traces to the OJ. The claims the fact-check identified as already
   correct were left untouched on purpose, and that list is in the commit message
   so a later editor does not "fix" them into errors.

### F. QA pass

Two independent agents dispatched, neither shown my conclusion:

- **Re-verify the corrected text**, adversarially, establishing the Regulation
  from primary sources first and then judging the document as it now stands,
  including whether the edit introduced anything new.
- **Byte integrity of the commit**, from git and shasum only, checking for
  deletions, renames, character-count drops, changed file ends, lost fenced
  blocks, unbalanced emphasis, broken table rows and em dashes.

**QA byte integrity: CLEAN.** Derived from git and shasum only, against parent
`e388d03`.

| Check | Result |
|---|---|
| Files changed | 3: the paper (M), the compiler (M), the source file (A). +248 / -40 |
| Deletions or renames | **none.** `--no-renames` and `-B -M20%` both return only M, A, M |
| Character counts | paper 32,947 to 36,845; compiler 33,790 to 37,688. **Both grew.** No truncation signal |
| First / last 200 chars | paper's head changed as intended (the abstract date), tail byte-identical. Compiler's both ends unchanged |
| Headings | 26 to 26 in the paper, 28 to 28 in the compiler. No loss |
| Fenced blocks | 8 to 8 in both, balanced. **No lost diagram** |
| Under `web/src/` | none. `papers.ts` no, `wikiRegistry.ts` no |
| Outside `references/` and `scripts/` | none |
| Em dash added | **none.** The only em dash in the post-image is the compiler's own pre-existing sanitiser at line 392 |
| Broken table rows, unclosed fences, unbalanced emphasis | none. Table 1.1's deliberate widening to 4 columns carries matching pipes on every row |

It also corroborated the central claim independently: the `.md` diff and the
`.py` diff are **byte-identical in their added and removed lines**, hashing to the
same value, and `literal == md` holds in both the parent and the commit, 32,947
chars before and 36,845 after. The compiler and its output are in sync, so a
re-run cannot revert the edit.

Worth noting how it behaved: its first pass flagged around 50 apparent truncated
sentences and 10 unbalanced `**` spans. It re-checked at paragraph level, found
every one to be an 80-column hard-wrap artifact, and dismissed them rather than
reporting noise. An agent that verifies its own findings is worth more than one
that lists them.

Adversarial re-check of the corrected text: pending.

### Concurrent-session note

A second session worked this repo throughout the unit. Its activity, in order:
G_CPDT added to `WG-05-CAD-Three-Identity-Join.md` and referenced in the
conformance paper (13:57); `WG-05-CAD-CIM-Profile-Cyber-Physical.md` edited; two
new WG-05 papers created; **`references/WG-06-CRA-Product-Assurance/` created**;
three papers registered in `papers.ts`; `research/g-cpdt-unified-standard/` added.

Its new WG-06 CRA paper independently states the **correct** four-designation
taxonomy, with Annex III holding both important classes and Annex IV holding
Critical including HSMs, and cites IR 2025/2392. So the two sessions agree on the
substance. Two small drifts in its text, recorded for Jim rather than edited by
me: it places firewalls in class I at line 37 where they are class II, and calls
the Annex IV certificate mandatory under Art. 27(9) where Art. 8(1) is operative
and no delegated act yet exists.

`.git/index.lock` blocked staging mid-unit. It was 0 bytes, mtime two hours
stale, and `lsof` showed the only holders were read-only handles from
`com.apple.Virtualization.VirtualMachine`, a VM sharing this directory, with no
git process anywhere. Cleared, index confirmed readable, then staged. That VM is
the likely explanation for stale locks reappearing with odd mtimes.


---

## U2. CRA and CycloneDX corrections, `WG-06-CRA-Product-Assurance.md`

2026-09-11. Jim: "fix the other WG-06 file too".

**Deliberately not committed.** The file is the concurrent session's untracked new
paper. Committing it would claim their work on my branch, which is the
entanglement this cycle exists to avoid. The corrections sit in the working tree
for that session to commit with the rest of its WG-06 work.

### A. Assess

`mtime` 14:01, ten minutes stale at the time of the edit, so not being actively
written. `grep -rln "WG-06-CRA-Product-Assurance" scripts/` returns nothing:
hand-maintained, no compiler, so the `.md` is the authoritative location.
Registered in `papers.ts:118` only, not in `wikiRegistry.ts`, which is the cause
of the concurrent 66-versus-63 test failure and is theirs to finish.
Facts already sourced by U2's predecessor at
`references/external-research/WG-05-CAD_eu-cra-product-classes_20260911.md`. The
CycloneDX and CISA VEX vocabularies needed one further verification pass.

### B. Change

Nine corrections. Two of them were invisible to the earlier grep and only
surfaced by verifying the VEX vocabulary against its specification:

| | What was wrong |
|---|---|
| G1 | "On 10 October 2024 ... adopted" — the Regulation was adopted 23 October 2024, which **its own reference [1] already stated**, so the document contradicted itself. Publication and entry-into-force dates added; Article 64 given its paragraph and "whichever is higher" |
| G2 | Article 71(2) phasing omitted 11 June 2026, when Chapter IV applies |
| G3 | "three statutory tiers" stated immediately above a table listing four |
| G4 | "industrial IoT" is not an Annex III category, and **firewalls were listed under class I where they are class II** |
| G5 | "next-gen firewalls" is not CRA language, and **tamper-resistant microcontrollers were missing** from the four class II categories |
| G6 | The Annex IV route cited Art. 27(9) and called certification mandatory. Art. 8(1) governs, and no delegated act exists, so Annex IV falls back to Art. 32(3) |
| G7 | "one of three statuses: `affected`, `in_triage`, `not_affected`" is wrong for **both** vocabularies. CycloneDX `analysis.state` admits six values and **has no `affected`**; CISA defines four. The text also said the CRA mandates a VEX justification, when the CRA never mentions VEX; the obligation it actually discharges is Annex I Part II |
| G8 | Theorem 2 emitted justification `vulnerability_silent_due_to_boundary_isolation`, **which is not a member of the CycloneDX `analysis.justification` enumeration**. The document's own Requirement S-3 demands schema-conformant CycloneDX 1.6 output, so it contradicted itself and would have failed validation. Replaced with `protected_by_mitigating_control` |
| G9 | The Article 14 final-report deadline gave only the vulnerability track. A severe incident carries a separate one-month clock |

### C. Validate

Characters 13,937 to **16,299**, up, so nothing truncated. Headings 15, fenced
blocks 2 and even, table rows 19, em dashes 0. Every corrected string returns
zero occurrences.

`npm run audit` alone reported **1 failing**: the publications audit found word
counts down 331 on this paper and 101 on the other session's Three-Identity-Join.
Both were stale-bundle artifacts, because running `audit` directly skips the
`sync` that `verify` performs first. After `npm run sync`:
**10 passing, 0 frozen, 0 skipped.** Recorded because "run audit, see a failure,
freeze it" is exactly how a ratchet gets corrupted; the fix was to run the
pipeline in order, never to touch `known-failures.json`.

### E. Review

Stage E caught one of my own overreaches. The G8 replacement originally carried a
sentence narrating that an earlier draft had used the invalid value. A normative
specification should not contain its own editing history, and it was not
something anyone asked for. Removed, which is why the character count is 16,299
rather than 16,529.

### Not fixed, flagged to Jim instead

Lines 88 to 93 present a benchmark: 14 commercial industrial control assemblies,
4,820 dependencies, 612 NVD CVEs, 554 proven non-exploitable at 90.5 %. The
arithmetic is internally consistent, and there is **no source**. `CLAUDE.md`
forbids fabricated statistics and says "novel synthesis" is a legitimate label
where "unsourced-but-sounds-established" is not. Only Jim knows whether that
measurement was actually run, so relabelling it as modelled would be as wrong as
leaving it unsourced if the data is real. It needs either a source file under
`references/external-research/` or an explicit label.

---

## U1 addendum: the adversarial re-check, and three errors it found in my edit

**Verdict: yes.** The classification section is consistent with the Regulation.
Article 7 / Annex III important with 19 class I and 4 class II, Article 8 /
Annex IV critical with 3, the Article 32(1) to (4) route mapping, and
IR 2025/2392 with its Annex I for Annex III and Annex II for Annex IV, all
confirmed correct as stated, from the authentic OJ XHTML.

### Three defects were mine

Each was checked against the parent commit to establish authorship rather than
assumed. All three trace to the same cause: I took a framing from a secondary
source instead of the text, which is precisely what the source file I wrote warns
against. Fixed in `8c53ca4`.

| | Error | Why it was wrong |
|---|---|---|
| M1 | "where more than one category could apply the stricter one governs" | **Fabricated.** No such rule in either instrument. Overlaps resolve by core functionality under Art. 7(1); IR 2025/2392 separates class I from class II tamper-resistant parts by assurance level, not precedence |
| M2 | The open-source carve-out attributed to Article 2 | **Article 2 does not mention open-source software.** It arises from the Art. 3(2) definition of making available on the market |
| M3 | "three named designations" | The Regulation names **two**, important and critical; Art. 7(2) divides important into classes. Four routes, two designations |

M1 and M2 had also been propagated into my own source file, and are corrected
there with a note that the first version got it wrong, so the source cannot
quietly become the authority for an error it introduced.

### Pre-existing, confirmed by checking the parent commit

Not mine, and outside the scope Jim set for this unit. Logged, not fixed:

- `Articles 64 through 68` in the penalty heading. Penalties are Article 64 alone; 65 is representative actions and 66 to 68 are amendments to other instruments.
- Annex I Part II bullet misattributes four things: the five-year floor is Art. 13(8) not Annex I; Part II(6) requires a contact address, not "automated intake mechanisms"; machine-readability belongs to Art. 14(8); Part II(2) requires updates separate from functionality updates, which is not "without feature regressions"; and immediate notification is Article 14.
- The Annex I part titles are renamed rather than quoted. Part I is "Cybersecurity requirements relating to the properties of products with digital elements"; Part II is "Vulnerability handling requirements".
- "Non-negotiable requirements" overstates Annex I, which is expressly conditional on the Art. 13(2) risk assessment and admits justified non-application under Art. 13(4).
- The Article 64(2) formula computes the statutory **ceiling** and the prose then treats it as expected exposure. Art. 64(5) requires scaling within it, and Art. 64(10) derogates entirely for open-source stewards and partially for micro and small manufacturers.
- `vulnerable_code_cannot_be_controlled_by_adversary` in the flagship VEX example is CSAF vocabulary, not a CycloneDX `impactAnalysisJustification` value, so the document's own `$schema` declaration would reject it. `protected_at_perimeter` is the correct value for a diode argument.
- `"State: 'not_affected' or 'aff'"`. Truncated, and the affected state is spelled `exploitable`.
- Lloyd's Y5381 is a Corporation of Lloyd's market bulletin, not a Lloyd's Market Association one, and its mandate is narrower than stated: stand-alone cyber policies from 31 March 2023, for state-backed attacks that significantly impair a state's functioning or security capabilities. Revisited by Y5433.
- NIS2 is Directive (EU) 2022/2555 and covers essential **and important** entities. "Network and Information Security Directive" is the NIS1 title.
- Two physics defects: a 4.5 °C/s ramp, a 14.8 s time to trip and a 94 °C threshold cannot all hold, implying a 27.4 °C start for a 1,200 W package. And Dittus-Boelter is applied to derive a 78 % drop in the laminar regime, outside the correlation's turbulent domain.
- A fabricated CVE identifier with a live-looking NVD URL that resolves to nothing.
- Internal contradiction: a "24-Hour Vulnerability Escalation SLA" heading over body text specifying twelve hours.
- "Annex 7" for the working group's procurement covenant sits beside "Annex VII" for the CRA's technical documentation annex, one character apart, never disambiguated.

## U2 addendum: the benchmark

Jim confirmed the benchmark was actually run. It is therefore attributed, not
hedged: the paper now states the figures are the working group's own measurements
against a fixed corpus, that no comparable published benchmark exists, and that
they should be read as Eigenia Labs' reproducible result rather than an industry
norm. `CLAUDE.md` permits exactly this: "novel synthesis" is a legitimate label,
"unsourced-but-sounds-established" is not.

Also aligned one figure with U2's own G7 correction: the 16 genuine findings were
described as `affected`, which CycloneDX has no state for. Now `exploitable`. The
single remaining `affected` in the file is the explanatory sentence contrasting
the CISA vocabulary with CycloneDX, which is correct and deliberate.

---

## U3. The pre-existing CRA errors, `WG-05-CAD-Supply-Chain-EU-CRA.md`

Branch `fix/cra-remaining-errors`, commit `f167085`, PR #28. Built in the
isolated worktree from `origin/main` at `0fcfe31`, so nothing touched the shared
tree while the concurrent session remained uncommitted.

15 corrections. Every one was checked against the parent commit to confirm it was
pre-existing rather than introduced by my earlier passes.

### Regulation and citation

Nine fixes: the NIS2 title and scope; "non-negotiable" Annex I; both Annex I part
titles; four misattributions in the Part II bullet (the five-year floor is
Art. 13(8), Part II(6) is a contact address not "automated intake", machine
readability is Art. 14(8), Part II(2) is updates separate from functionality
updates); the "Articles 64 through 68" penalty heading; the turnover gloss; the
EUR 600M ceiling presented as expected exposure, now with Art. 64(5) scaling and
the Art. 64(10) derogations; and Lloyd's Y5381 attributed to the wrong body with
an overstated mandate.

### Schema conformance

The flagship VEX example used `vulnerable_code_cannot_be_controlled_by_adversary`,
CSAF vocabulary absent from the CycloneDX `impactAnalysisJustification` enum, so
it would fail validation against the schema the document declares. A diagram
carried a truncated state `'aff'`. And a fabricated CVE identifier carried an NVD
URL resolving to nothing.

### Architecture no longer presented as statutory

A six-point audit checklist including FIPS 140-3 Level 4 HSM validation was
introduced as satisfying Annex VII, which requires none of it. And Annex VII
conformity was described as mitigating fines, where Art. 64(5) is the mitigation
provision.

### Internal consistency

A 24-hour heading over twelve-hour body text, and the Annex 7 versus Annex VII
collision, now separated by a naming note.

### Validate

Compiler idempotent at
`1816d84d25b0f865da9f55b617f4b4cf197743da485ac25983283b1556e32002`.
Characters 36,845 to 39,780, up. Audit suite 10 passing, 0 frozen, 0 skipped.
The content bundle is in the commit this time, which U1 initially forgot.

`audit-rendered-completeness.js` reported 14 missing prose lines across three
documents. All 14 are artifacts of the worktree sharing port 4500 with the main
repo's dev server: the CRA paper's 11 are exactly my new Annex I text, absent
from that server, and the other three are the concurrent session's files where
the worktree holds the older version. Verified by reading the reported lines
rather than assuming. This is the second time the port-4500 limitation has cost a
verification cycle.

### Not fixed, and why

Correcting these means choosing replacement numbers, which is the working group's
call and not an editor's. Fabricating a plausible figure would be worse than
leaving a flagged one:

- **The thermal claim is arithmetically impossible.** A 4.5 °C/s ramp, 14.8 s to
  trip and a 94 °C threshold imply a 27.4 °C starting junction temperature for a
  1,200 W package. At a realistic 65 to 75 °C the stated ramp reaches 94 °C in
  four to six seconds. One of the three figures is wrong and only Jim knows which.
- **Dittus-Boelter is applied outside its domain.** The 78 % drop in convective
  coefficient is derived by evaluating a correlation valid for Re above roughly
  10,000 in the laminar regime the sentence invokes. Laminar Nusselt is
  approximately constant, giving a different number.
- **Cavitation is attributed to secondary-loop pressure**, where it is governed by
  suction-side NPSH margin.
- **"Irreversible package delamination" at a 94 °C junction trip**, and a 240 kW
  load shed tripping 2.5 MW transformers by "high-voltage inductive kickback".
- **Pr ≈ 18.5 at 35 °C for PG25**; an independent estimate from ASHRAE-range
  properties gives roughly 10, consistent with a colder or richer glycol mix.
- **Unsourced figures**: "over two hundred suppliers", the $10M to $50M deductible
  band, the eighteen-month OpenSIL and coreboot transition, and P_chain
  "asymptotically approaching 1.0 (100% certainty)", which is both not certainty
  and not derivable without θ, a parameter the paper never assigns.

---

## A note on the snapshots

`baseline-census.json` is committed: it is the single reference point, cited by
sha256 `48b6623b343849ed2d2d0c2defcd7fc7cee874d67bf69e24e5487580d97386ee`, and it
records the corpus as it stood before any change in this programme.

The per-unit snapshots (`before-cra.json`, `after-cra.json`) are deliberately not
committed. Their evidence is the diff output quoted in each unit's C1 section
above, which is the part that matters. Either file is regenerable at any commit
with `node notes/2026-09-11/census.mjs <repo-root>`, so committing roughly 4,400
lines of reproducible JSON would be repo weight without information.
