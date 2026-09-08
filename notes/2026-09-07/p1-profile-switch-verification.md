---
tags: [eigenia, dexpi, verification, three-schema, p1]
---

# Verification: P1 switch from Standard Library to DEXPI Profile

**Verdict: PASS on information loss and requirement integrity. FAIL on corpus alignment.**
Nothing was lost in the paper. Zero of the twelve deleted lines are unaccounted for, and no
requirement changed substance without disclosure. But two statements in
`notes/2026-09-07/three-schema-cyber-digital-twin-design.md` still name the Standard Library
as the current mechanism, and one of them is a P1 deliverable description. The design spec
now contradicts itself and contradicts the paper.

Date: 2026-09-07
Verifier scope: `2031f63` to `8df3ac7`, `references/WG-05-CAD-DEXPI-2/WG-05-CAD-Three-Identity-Join.md`
Corpus and gate checks run against working tree at `HEAD` = `8df3ac7`.

Size: 370 lines / 5,502 words before, 386 lines / 6,416 words after. The word count is not
the evidence. Section 1 below is.

---

## 1. Every deleted line accounted for

Twelve lines deleted. Seven **Replaced**, five **Superseded**, **zero LOST**.

| # | Deleted text (abridged where marked) | Class | Evidence |
|:--|:---|:---|:---|
| 1 | `**DEXPI.** DEXPI e.V. is developing the Standard Library as "a curated set of templates intended to extend or restrict the DEXPI Specification to meet specific engineering requirements" [3]. That is a sanctioned extension point... The join is delivered as a template in that library. It adds attributes to existing classes; it introduces no class of its own.` | **Superseded** | Now line 86: `**DEXPI.** The DEXPI Specification Teams are developing the DEXPI Profile, "which extends the DEXPI specification with a mechanism for defining explicit constraints on classes and properties" [12]. That is a sanctioned extension point, in writing, from the body that owns the standard. The join is delivered as a Profile. It adds attributes to existing classes; it introduces no class of its own.` Sentences 2, 4 and 5 survive verbatim. Sentences 1 and 3 changed because the mechanism changed. The deleted quotation itself is not gone: it survives, de-quoted and correctly re-attributed to briefing material, at line 98. **Reader loses** a direct quotation. **Reader gains** a correct attribution — see Finding 3, the deleted line cited that quotation to `[3]`, the DEXPI 2.0 Specification, and the sentence is not in it. |
| 2 | `### 3.1 A note on the moving DEXPI extension mechanism` | **Superseded** | Now `### 3.1 The DEXPI extension mechanism, and what it leaves unsettled`. Section number and position unchanged. The heading stops describing the mechanism as "moving" because it stopped moving; it now names the residual open question, which is what the section is actually about. |
| 3 | `DEXPI e.V.'s August 2026 update describes work on DEXPI 2.0.1, which corrects and clarifies the Process Model and will replace DEXPI 2.0 as the recommended basis for implementations, and on the DEXPI Profile, "which extends..." forming the basis for a DEXPI Process Type Library [12].` | **Replaced** | Now line 96, expanded to three sentences. All four facts survive: 2.0.1 as an update to 2.0; Process Model corrections; replacement of 2.0 as recommended basis; the Profile quotation; the Process Type Library. One word changed for accuracy: `will replace` → `expected once released to become the recommended basis... replacing DEXPI 2.0`, which is what the page says. The old wording overstated. |
| 4 | `This specification is written against the Standard Library mechanism, because that is the mechanism DEXPI has published a description of. The join's content is... independent of which of the two mechanisms carries it. Section 9 records this as an open dependency...` | **Superseded** | The decision inverted, so the first sentence had to go, and it was false besides: DEXPI has published no Standard Library description (Job 3 confirms the term does not appear on the page). Its content survives inverted at line 98, `The Profile is the mechanism DEXPI e.V. currently describes, so the DEXPI leg is written against the Profile`. The carrier-independence claim survives at line 108, `None of it depends on which mechanism carries it`. The section 9 pointer survives at line 104, `repeated in section 9 as a limitation`, and section 9 now carries two dedicated bullets where it carried one clause. **Reader loses** the earlier ruling as current. **Reader gains** the earlier ruling as recorded history plus a named test for settling it. |
| 5 | `## 5. The DEXPI Standard Library extension` | **Replaced** | `## 5. The DEXPI Profile extension`. Same number, same position. |
| 6 | `The DEXPI leg is delivered as a template in the DEXPI Standard Library, adding attributes to existing DEXPI classes and introducing none of its own.` | **Replaced** | `The DEXPI leg is delivered as a DEXPI Profile, adding attributes to existing DEXPI classes and introducing none of its own.` The clause after the comma is byte-identical. A second sentence was added pointing at §3.1. |
| 7 | `R-16. The DEXPI leg MUST be expressed as a Standard Library template and MUST NOT declare a new DEXPI class.` | **Superseded** | `R-16. The DEXPI leg MUST be expressed as a DEXPI Profile and MUST NOT declare a new DEXPI class.` The second obligation is byte-identical. The first names a different artefact, so an implementer builds a different thing. This is the one substantive change and it is disclosed. See §2. |
| 8 | `R-17. The template MUST attach its attributes to the object that carries the TagName, and MUST NOT attach them to a drawing, a shape, a symbol or a presentation element. A join bound to a graphic does not survive a redraw.` | **Replaced** | Identical but for `The template` → `The Profile`. Diffed character by character; nothing else moved. |
| 9 | `R-19. A DEXPI file carrying the template MUST validate against the DEXPI 2.0 Specification.` | **Replaced** | Identical but for `the template` → `the Profile`. Normative target stays DEXPI 2.0. |
| 10 | `R-20. The template MUST NOT relax any constraint the base specification declares. It MAY restrict, which is a use the Standard Library mechanism explicitly contemplates.` | **Replaced** | `R-20. The Profile MUST NOT relax any constraint the base specification declares. It MAY restrict, which is the use the Profile mechanism is described as existing to serve [12].` The MUST NOT and the MAY are byte-identical after the rename. The trailing justification was reworded and gained a citation. See Finding 4 for a coherence nit on that clause. |
| 11 | `**The DEXPI serialization binding is provisional.** Section 5.2 states the attachment rule... Separately, DEXPI e.V. is developing both DEXPI 2.0.1 and the DEXPI Profile mechanism [12], and the extension point this specification targets may be the Profile rather than the Standard Library... The join's content is unaffected; its carrier may change.` | **Superseded** | Split into three. The first half survives byte-identical at line 360. The carrier question became its own limitation bullet (line 362, ~130 words). The 2.0.1 question became its own limitation bullet (line 364, ~110 words). Both `The join's content is unaffected` and `its carrier may change` survive in the new carrier bullet as `the join's content is unaffected either way; only its carrier is at stake`. One clause was cut and not replaced — `by the time a submission is considered` — which was a timing hedge that the switch made moot. **Reader gains** roughly 200 words where 60 stood. |
| 12 | `12. **DEXPI e.V.** *DEXPI August 2026 Update.* Announcement of work on DEXPI 2.0.1 and the DEXPI Profile mechanism, dexpi.org, August 2026.` | **Replaced** | Expanded to carry what the source states, plus `https://dexpi.org/dexpi-august-2026-update/ (accessed 7 September 2026)`. Strictly more resolvable than what it replaced. |

**Nothing is LOST.** The only text removed without a successor is the clause
`by the time a submission is considered`, which is a timing hedge, not content, and is
covered in row 11.

---

## 2. Requirements R-1 to R-35

All 35 present in both commits. `grep -cE '^R-[0-9]+\.'` returns 35 at `2031f63` and 35 at
`8df3ac7`. No gaps, no duplicates, no renumbering.

**Thirty-one are byte-identical**, verified by `comm -12` on the sorted requirement lines:
R-1 to R-15, R-18, R-21 to R-35.

**Four changed.** All four are R-16 to R-20, all in section 5, all disclosed:

| Req | Before | After | Does the implementer's obligation change? |
|:--|:---|:---|:---|
| R-16 | `MUST be expressed as a Standard Library template and MUST NOT declare a new DEXPI class` | `MUST be expressed as a DEXPI Profile and MUST NOT declare a new DEXPI class` | **Yes.** Different artefact. Claim verified. |
| R-17 | `The template MUST attach...` | `The Profile MUST attach...` | **No.** Rename only. Claim verified. |
| R-19 | `A DEXPI file carrying the template MUST validate...` | `A DEXPI file carrying the Profile MUST validate...` | **No.** Rename only. Claim verified. |
| R-20 | `...MAY restrict, which is a use the Standard Library mechanism explicitly contemplates.` | `...MAY restrict, which is the use the Profile mechanism is described as existing to serve [12].` | **No.** MUST NOT and MAY are unchanged. Claim verified, with a nit — the change is larger than "the mechanism name moved": `a use` → `the use` and `explicitly contemplates` → `is described as existing to serve`, plus a new citation. The obligation is untouched, so P3 conformance is safe, but the disclosure understated the edit. |

**No requirement changed without disclosure.** All four implementer claims independently
confirmed against the sorted requirement text of both commits.

One thing the requirement-line diff cannot see, so I checked separately: **rationale
paragraphs**. A rule can be reframed by the prose beside it without the `R-n.` line moving.
The only rationale added is the new paragraph after R-16 (`R-16 names the carrier and settles
nothing else...`), which narrows R-16's scope rather than widening it and is consistent with
§3.1. No rationale attached to any of the 31 identical requirements changed.

**Implication for P3.** A conformance suite built one rule per requirement can carry 31 rules
across unchanged. Exactly one rule, for R-16, tests a different artefact after the switch, and
the paper says so in the requirement's own rationale.

---

## 3. The quotation, verified against the source

Fetched `https://dexpi.org/dexpi-august-2026-update/` directly (HTTP GET, 106,956 bytes,
tags stripped locally rather than relying on a summarizer).

**The full sentence, as the page gives it:**

> In parallel, the Specification Teams are developing the DEXPI Profile, which extends the DEXPI specification with a mechanism for defining explicit constraints on classes and properties. This creates the basis for the DEXPI Process Type Library and opens new possibilities for more advanced modeling and implementation.

The quoted fragment is **verbatim and complete**. Character-for-character:

> "which extends the DEXPI specification with a mechanism for defining explicit constraints on classes and properties"

The cut is at a clause boundary. What precedes it is `In parallel, the Specification Teams are
developing the DEXPI Profile,` — and the paper supplies that as its own lead-in, `The DEXPI
Specification Teams are developing the DEXPI Profile,`. What follows is `This creates the basis
for the DEXPI Process Type Library...` — and the paper carries that at line 96, `and which
creates the basis for the DEXPI Process Type Library`. **Nothing on either side of the quotation
is suppressed, and nothing suppressed would change its sense.**

**Was keeping "which extends" correct? Yes.** The orchestrator's fragment, `mechanism for
defining explicit constraints on classes and properties`, standing alone reads as though the
Profile is purely a restriction facility. The full clause shows the grammar is
*extends X with Y*: the Profile extends the specification, and what it extends it with is a
constraint mechanism. Dropping `which extends` deletes the only word in the sentence that says
the Profile adds anything at all. The implementer was right to keep it.

**Is the paper now over-claiming in the other direction? No.** I looked for this specifically,
because "extends" is exactly the word a document would lean on to settle a question the source
leaves open. It does not. Line 86: `The verb in that sentence governs what the Profile does to
the specification, which is to add a mechanism, and the mechanism itself is described in the
language of constraints.` That is a correct parse and it claims nothing beyond it. §3.1 then
says outright: `Two readings are available on that sentence and the page does not choose
between them`, sets out both, and states `This specification assumes the first reading... The
assumption is stated here and repeated in section 9 as a limitation, because it is an assumption
and not a citation.` Section 9 line 362 repeats it as a limitation. The paper treats "extends"
as licensing a reading, not as settling the question. That is the honest position.

**DEXPI 2.0.1 statements, checked against the page.** All accurate.

| Paper | Page |
|:---|:---|
| `being prepared as an important update to the DEXPI 2.0 specification` | "DEXPI 2.0.1 is being prepared as an important update to the DEXPI 2.0 specification." |
| `addressing corrections and clarifications in the Process Model` | "The work particularly addresses corrections and clarifications in the Process Model..." |
| `expected once released to become the recommended basis for further work with the specification, replacing DEXPI 2.0` | "Once released, DEXPI 2.0.1 is expected to become the recommended basis for further work with the specification, replacing DEXPI 2.0." |
| §9: `the corrections are described as falling in the Process Model rather than in the P&ID plant model content` | Supported. The page scopes 2.0.1's corrections to the Process Model and says nothing about the P&ID plant model. |

**"Standard Library" on that page: zero occurrences.** Verified by string count on the
stripped page text, not by eye. The paper's claim at line 98, `the term does not appear on the
page`, is true.

---

## 4. The Standard Library trail

Two occurrences remain in the paper, and they are placed where a reader will hit them.

- **Line 98, §3.1 ¶2.** Names the Standard Library as the earlier carrier, reproduces what the
  briefing said about it (`a curated set of templates intended to extend or restrict the DEXPI
  Specification to meet specific engineering requirements`), says why it is not cited (`That
  briefing material is not publicly resolvable`), says why the carrier moved (`The August 2026
  update does not mention a Standard Library`), and states the purpose explicitly: `A reader
  holding the older briefing can then tell which of the two documents is current instead of
  guessing.`
- **Line 362, §9 limitations.** Repeats the fact of the move for a reader who reads only the
  limitations: `An earlier draft of this document named the DEXPI Standard Library as the
  carrier, and the August 2026 update does not mention that mechanism, which is why the carrier
  moved.`

**Is the trail thick enough to serve its purpose? Yes.** A reader holding Jim's briefing
material and this paper can answer all three questions the reconciliation requires — which is
current (the Profile), why (the term is absent from the body's own August 2026 update), and
what the briefing's description was (reproduced in full at line 98). The §3.1 paragraph is
placed in the body of the argument rather than buried in an appendix, which is the right place
for it. I have no criticism of the trail inside the paper.

---

## 5. Corpus alignment

### Two real misalignments, both in the design spec

`notes/2026-09-07/three-schema-cyber-digital-twin-design.md` was switched to the Profile at
commit `9307e19`, but that commit touched only two hunks. Two Standard Library statements
elsewhere in the same file were missed, and both read as current.

**Misalignment 1 — the P1 deliverable row, line 80.** The paper deliverables table still says:

> | P1 | The Three-Identity Join | upstream | The mapping between `TagName`, `purl`/`bom-ref` and `mRID`, delivered as a **DEXPI Standard Library extension**, a CycloneDX property taxonomy and a CIM profile reference. |

The paper's §5 heading is `## 5. The DEXPI Profile extension`. This row is the one-line
statement of what P1 delivers, and it names the wrong carrier. It is 47 lines below the
paragraph in the same file that says the carrier is the Profile. This is the worst of the two,
because a table row is what someone scans.

**Misalignment 2 — the upstream-submission decision record, lines 228-231.** Still reads:

> Jim's own source document confirms the mechanism: DEXPI e.V. **is developing** the Standard Library as "a curated set of templates intended to extend or restrict the DEXPI Specification to meet specific engineering requirements." That is a sanctioned extension point, in writing, from the body that owns the standard.

Present tense, framed as confirmation, with `in writing, from the body that owns the standard`.
This is the exact claim the paper retracted — the paper now says the sentence comes from
briefing material that is not publicly resolvable, and that the body's own update does not
mention the mechanism. The design spec asserts at line 229 what it denies at line 36.

`9307e19` did update the third occurrence in this file (line 245, `DEXPI e.V. for the Standard
Library extension` → `for the Profile extension`), which shows the sweep was attempted and was
incomplete rather than deliberate.

### What agrees

- **The plan** (`three-schema-implementation-plan.md`) is clean. Line 439 gives the outline
  heading as `5. The DEXPI Profile extension`, matching the paper exactly. Lines 454 and 456
  state the ruling, the verification date, the instruction to keep the history, and the open
  question — all consistent with the paper and with the design spec's lines 33-46.
- **The design spec's lines 33-46** agree with the paper on all three counts: which mechanism
  is current (the Profile), what the open question is (the join adds, the Profile constrains),
  and what was decided (write against the Profile, keep the history).
- **The paper** is internally consistent on the mechanism. All six Profile references and both
  Standard Library references are correctly scoped.

### Nothing else in `references/` was missed

`grep -rl 'Standard Library|DEXPI Profile|extension mechanism|Process Type Library' references/`
returns exactly one file: the paper itself. No other reference document mentions the DEXPI
extension mechanism, so there is nothing else in that tree to update.

### `papers-pre-publish/` — confirmed not modified

Out of scope as instructed, and confirmed untouched, not merely unreported.
`DEXPI2_Overview.md`, `DEXPI2_SPECS.md` and `DEXPI2_Study_guide.md` are **untracked**
(`??` in `git status`), so they are absent from every commit on this branch. Their mtimes are
13:09:52, 13:15:36 and 13:10:50 on 2026-09-07; the three commits under review are timestamped
18:37, 18:53 and 18:58 the same day. They were last written five hours before the work began.
Neither `8df3ac7` nor `9307e19` touched anything under `papers-pre-publish/`. They still say
Standard Library, which is correct, because that is what Jim's source said.

---

## 6. Gates

| Gate | Result |
|:---|:---|
| `node scripts/audit-terminology.mjs` | `TERMINOLOGY AUDIT PASSED: no variant or bare form found.` **TERM_EXIT=0** |
| `node scripts/audit-citations.mjs \| grep -c 'Three-Identity-Join'` | **0**. The paper is not among the failing documents. |
| `node scripts/audit-citations.mjs` overall | Exit **1**. Fails on `WG-02-DT-1.md` (markers 1-9) and `WG-02-DT-5.md` (markers 1, 2, 6), 12 unresolved markers across 2 documents. This is **exactly** the baseline recorded at commit `9cf311e` before this work started. Pre-existing, unrelated, not a regression from the switch. |
| `npx tsc --noEmit` | **TSC_EXIT=0** |
| `npm run build` | `Total Source Documents: 57` / `AUDIT PASSED: All 57 reference documents are present with 100% content fidelity.` No errors. |

**Citation markers in the paper.** Every `[n]` resolves and every entry is cited.

- Markers cited: `[1] [2] [3] [4] [5] [6] [7] [8] [9] [10] [11] [12] [13]`
- Entries present in §10: `1. 2. 3. 4. 5. 6. 7. 8. 9. 10. 11. 12. 13.`
- **No marker without an entry. No entry cited by nothing.**

I checked the one case where the switch could plausibly have orphaned a reference. `[3]`, the
DEXPI 2.0 Specification, dropped from four citations to three, because the deleted line 1 in §1
above cited it. It survives at lines 20, 58 and 259, all three of which are genuine DEXPI 2.0
Specification claims. `[12]` rose from two to six. No entry fell to zero.

---

## Findings

**Finding 1 — MISALIGNMENT, should fix.** `notes/2026-09-07/three-schema-cyber-digital-twin-design.md:80`
still describes P1's DEXPI deliverable as a "DEXPI Standard Library extension" in the paper
deliverables table, contradicting the paper's §5 heading and R-16, and contradicting line 36 of
the same file. Missed by `9307e19`.

**Finding 2 — MISALIGNMENT, should fix.** `notes/2026-09-07/three-schema-cyber-digital-twin-design.md:229`
still asserts in the present tense that "DEXPI e.V. is developing the Standard Library... That is
a sanctioned extension point, in writing, from the body that owns the standard." This is the
precise claim the paper retracted after the direct fetch. The design spec now contradicts itself
across 200 lines. Missed by `9307e19`.

**Finding 3 — a defect the switch silently fixed, worth recording.** The deleted §3 sentence
attributed the Standard Library quotation to `[3]`, the *DEXPI 2.0 Specification* on GitLab. That
sentence is not in the DEXPI 2.0 Specification. It is in Jim's briefing material —
`papers-pre-publish/DEXPI and CycloneDX/DEXPI2_Overview.md:55` and `DEXPI2_SPECS.md:55`,
verbatim. The pre-switch paper therefore carried a miscitation that would have failed a reviewer
check at DEXPI e.V. The new text explicitly declines to cite it (`That briefing material is not
publicly resolvable, so it is not cited here`). The implementer did not report this, and it is a
point in its favour, not against it.

**Finding 4 — coherence nit, R-20 versus §3.1.** R-20 now says restriction is "the use the
Profile mechanism is described as existing to serve [12]", which is the *narrow* reading of the
source sentence. §3.1 line 104 states that the specification "assumes the first reading" — the
*broad* one, under which constraints include declaring which properties a class may carry. The
two are in mild tension: R-20's justification leans on the reading the paper elsewhere declines
to adopt. R-20's obligation is unaffected either way, and it is arguably the safe framing for a
MUST NOT, but a DEXPI reviewer reading both could ask which reading the paper is on.

**Finding 5 — disclosure understated, minor.** R-20's change was reported as "mechanism name
moved but its obligation did not." The obligation genuinely did not move. But the edit also
changed `a use` to `the use`, `explicitly contemplates` to `is described as existing to serve`,
and added citation `[12]`. Reported as a rename, it was a rename plus a rewritten justification.
No conformance consequence.

**Finding 6 — source-fidelity nit.** The paper line 104 says the update "names Dr. Gregor
Tolksdorf as a contact for its question and answer sessions". The page describes one Q&A session
(8 September 2026, 10:00 CEST) and names Tolksdorf as the contact for members interested in the
review process. Plural "sessions" is a small overstatement of a single announced session.

**Finding 7 — stale tracked artefact, out of the switch's scope but flagged.**
`web/src/lib/generatedReferencesContent.json` is tracked, and the version at `HEAD` contains
**zero** occurrences of `Three-Identity-Join`. The regenerated working-tree version contains
eight. The paper has never been committed into the generated bundle. `npm run build` regenerates
it, so a build-from-source deploy is unaffected, but the committed artefact is stale against
`references/`. Not caused by this switch — the paper was new at `2031f63` — and I did not stage
it.

**On the strength of the negative finding for Jobs 1 and 2.** I did not find a lost line and I
did not find an undisclosed requirement change. What I actually checked, so the reader can judge
that: all 12 deleted lines individually traced to successor text in the post-switch file, by
locating the successor and comparing clause by clause rather than by trusting the diff's
adjacency; all 35 requirements extracted from both commits, sorted, and compared with `comm` and
`diff` so that a byte-identical claim means byte-identical; the rationale paragraphs beside the
requirements checked separately, because the requirement-line diff cannot see them; and the one
reference whose citation count fell checked for orphaning. The clean result on Jobs 1 and 2 is
real. Jobs 3 and 4 are also clean. Job 5 is not.

---

## What I could not verify, and why

1. **Whether the first reading of the Profile sentence is correct.** This is the load-bearing
   assumption under R-16 and it cannot be settled from public material. The published Profile
   text does not exist yet. The paper does not claim otherwise — it names the assumption, names
   both readings, and names what would settle it. I can confirm the paper is honest about the
   gap; I cannot close the gap.
2. **The DEXPI page as of any date but today.** I fetched it on 2026-09-07. The reference entry's
   access date matches. If the page is edited, the quotation needs rechecking.
3. **Whether the briefing quotation is genuinely absent from the DEXPI 2.0 Specification.**
   Finding 3 asserts the quotation is not in `[3]`. I verified it *is* in the briefing material,
   verbatim, and that the briefing presents it as its own prose about DEXPI e.V. I did not
   download and search the DEXPI 2.0 Specification from GitLab, so "not in `[3]`" rests on the
   quotation's presence in the briefing plus its absence from every DEXPI e.V. web text I
   fetched, not on a negative search of the specification itself.
4. **The DEXPI XML element spelling in §5.2.** Out of scope for this diff — §5.2 was unchanged
   by the switch — and the paper itself flags it as unconfirmed against the published schema in
   §9. I did not validate the example against a DEXPI 2.0 schema.
5. **Whether Jim intends the design spec's line 80 and line 229 to be corrected or left as a
   dated record.** I report them as misalignments because both read in the present tense and
   neither is marked as superseded, unlike the paper's §3.1 which is explicit that it is
   recording an earlier reading. If they were meant as a frozen record of the 18:37 state, they
   need the same "an earlier draft said" framing the paper uses. I did not edit them.
6. **Anything outside `references/`, the two notes files, and `papers-pre-publish/`.** The brief
   scoped the alignment check to those. I did not sweep `web/`, `scripts/` or the rest of
   `notes/` for Standard Library mentions.
