# Task 8 scope revision: the spec's word target is now obsolete

Date: 2026-09-06
Status: flagged for Jim, proceeding on the revised basis below

## The problem

The uplift spec, written 2026-09-06 before any work started, says:

> ### Document A: the research paper (~12,000 words)

and reconciles the budget as:

    words(Document A) + words(Document B) + words(deliberately cut) = 29,995

That was written when the paper was **29,995 words with a hollow financial
layer**. It is now **39,534 words**, because this session added roughly 9,500
words of sourced derivations, provenance labels, scope caveats, corrected
arithmetic, and in-paper records of what was cut and why.

Those additions ARE the uplift. Reaching a 12,000-word Document A now would
mean moving or deleting about 27,000 words, most of which is the sourced
material that replaced the placeholders. Following the number literally would
undo the work it was written to produce.

## What is actually operational

Measured, not estimated:

| Block | Words | Operational? |
|:---|---:|:---|
| Section 8 Recovery Procedures, incl. 8.3 Incident Response Playbooks | 518 | yes |
| Appendix J Attack Detection Signatures and IoCs | 1,874 | yes, Snort and Yara rules, detection signatures |
| Appendix K Recovery and Resilience Procedures | 876 | yes |
| Appendix L Stakeholder Communication and Coordination Protocols | 1,789 | yes |
| Section 9.6 Quick Wins | 1,134 | partly, it is a checklist |
| Section 9.7 Board-Level Recommendations | 2,536 | partly, contains a board reporting pack |

Genuinely operational, unambiguous: **5,057 words** (section 8 plus appendices
J, K, L).
Including the two partial section 9 blocks: up to **8,727 words**.

Everything else in the paper is argument, evidence, derivation or method. None
of it is operational paperwork, and none of it should move.

## Revised basis

The spec's stated INTENT is sound and unchanged:

> so the research argument stops competing with operational paperwork

Its word target is not. Recommendation, and the basis Task 8 proceeds on unless
Jim says otherwise:

- **Document B takes section 8 and appendices J, K and L**, about 5,057 words.
  These are self-contained operational artifacts: run-books, detection
  signatures, recovery procedures, notification matrices and communication
  protocols. A responder wants them without the physics; a reviewer wants the
  physics without them.
- **Section 9.6 and 9.7 STAY in Document A.** They are recommendations arising
  from the analysis, not incident-response paperwork, and 9.7 now carries the
  sourced cost-benefit basis and the board resolution that this session
  rebuilt. Splitting them would separate a recommendation from its evidence.
- **Document A ends near 34,500 words.** That is not the spec's 12,000 and the
  difference is not drift; it is the sourced content the uplift added.

## The budget reconciliation, restated honestly

The spec's rule stands and is the point of it: every word must land in one of
three buckets, itemised, never a remainder.

    Document A + Document B + deliberately cut = baseline + deliberately added

The original equation omitted the fourth term because nobody expected the
paper to grow. It grew by design. `notes/2026-09-06/uplift-cut-list.md` tracks
both directions and reconciles per task.

## Why this is flagged rather than silently done

A spec number that has been overtaken by the work should be changed openly, in
writing, with the measurement that overtook it. Quietly missing a target by
22,000 words and reporting the task complete is exactly the kind of thing this
project's gates exist to catch.
