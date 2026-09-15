| Field | Value |
|:---|:---|
| Designation | CITATION-STATUS-ALL |
| Title | Citation status across the six principal documents, rolled up |
| Date | 14 September 2026 |
| Documents covered | S1, S2, S3, S4, the PRD and the design, revision 8 |
| Bracket references | 107 in total, of which 89 are established in this pass and 18 are carried forward from the S1 ledger |
| Verified fraction | 27 of 107 |
| Ledgers | `CITATION-LEDGER-S1.md`, `-S2.md`, `-S3.md`, `-S4.md`, `-PRD.md`, `-DESIGN.md` |

This file rolls up the six ledgers. It carries three things: the counts per document against the five statuses, every BROKEN reference in one list with what is actually at the path, and a plain statement of the verified fraction. It carries no new verification; every figure here is taken from a ledger row that establishes it.

## What the five statuses mean, and one boundary worth stating

**VERIFIED** means the source was opened from this session and says what the citing document says it says. **VERIFIED-NARROWED** means it was opened, it exists, and it supports part of the claim, with the unsupported part named in the row. **UNVERIFIED-OFFLINE** means a published source that could not be opened from here, with the row saying what would be needed. **BROKEN** means the path, line or URL does not resolve, with the row giving what is there instead. **SELF** means a document in this series, with its revision named and its currency stated.

The boundary between SELF and the others is the one that could hide a failure, so it is drawn explicitly in every ledger and repeated here. A series document whose revision resolves and whose content carries the claim is recorded as SELF, which describes the kind of warrant rather than grading it. Where a series document was opened and does not carry what is attributed to it, the sharper status is given instead, and the row still names the source as a series document. Four references in this pass are graded that way: S2 [22], S4 [8], and the design's [1] and [5]. Without that rule each would have been a SELF row and each conceals a real defect.

## Counts per document

| Document | VERIFIED | VERIFIED-NARROWED | UNVERIFIED-OFFLINE | BROKEN | SELF | Total |
|:---|---:|---:|---:|---:|---:|---:|
| S1, revision 3 (carried forward) | 5 | 0 | 9 | 0 | 4 | 18 |
| S2, revision 4 | 4 | 3 | 6 | 0 | 14 | 27 |
| S3, revision 9 | 3 | 1 | 2 | 0 | 9 | 15 |
| S4, revision 2 | 1 | 2 | 0 | 0 | 5 | 8 |
| PRD, draft 6 | 10 | 1 | 1 | 1 | 5 | 18 |
| Design, revision 8 | 4 | 5 | 0 | 1 | 11 | 21 |
| **All six** | **27** | **12** | **18** | **2** | **48** | **107** |

Two notes on the table. The S1 row is carried forward from `CITATION-LEDGER-S1.md` rather than re-established here, and its own vocabulary is mapped onto this one: its five VERIFIED rows map to VERIFIED, its nine UNVERIFIED-canonical rows to UNVERIFIED-OFFLINE, and its four corpus rows to SELF. Those eighteen sources were not reopened in this pass, and any statement about them is S1's ledger speaking, not this one. And the programme's plan anticipated 112 distinct bracket references across the five documents newly ledgered here; the count from the reference lists as they stand is 89, in the per-document shares the task set, 27, 15, 8, 18 and 21. The shortfall against 112 is in the estimate rather than in the documents, and nothing in the five reference lists is missing a number.

## Every BROKEN reference

Two numbered references resolve to nothing at the location they give. Both are listed here in full. Beneath them is a second list of unnumbered locators that fail the same way, which are not bracket references and are therefore not in the counts above, but which a reader following a citation would hit just as hard.

### Numbered

**PRD [18], `05_DATA/03_generators/s6_timbre_capacity.py`.** The claim is that the timbre channel's capacity and assignment table are computed by that script, and that it is "seeded, so it reproduces", which the PRD's section 7.6 relies on when it requires the instrument to compute and show the audible fraction of every assigned pair. **What is there instead:** the corpus directory `05_DATA/03_generators/` exists, at `/mnt/user-data/uploads/eigenia/papers-pre-publish/MPN/05_DATA/03_generators/`, and holds exactly one file, `a8_form_analysis.py`, which is S1's form-analysis generator and not this one. The cited script resolves at `/home/claude/gen6/s6_timbre_capacity.py`, which is where the design document's revision 8 now cites it, having corrected the identical prefix at its own [10]. At that location the seeding claim holds: `random.seed(20260913)` at line 58, with a `--reseed` flag documented at line 42 that repeats the whole table at three seeds and asserts the cells do not move.

**Design [21], `src/components/mpn-lab/psychometric_calculus.ts:204`, cited for the null return of `inferDISC`.** The reference carries eight anchors and this is the one that fails outright. **What is there instead:** line 204 of that file opens `discToInstrument`, a different function, whose own null handling is `if (!disc) return 'piano';` at line 208. There is no function named `inferDISC` anywhere in `psychometric_calculus.ts`. It is in `src/lib/play_parser.ts`, opening at line 254 and returning null at line 261, under a comment recording that the previous implementation "banded four values off average trauma and filled the band with `Math.random()`". The design document already corrects two of the Constraint Guardian's citations for giving this file's directory as `src/lib`; this anchor is the same class of error made one line further on, and the ironic part is that `src/lib` is where the cited symbol actually lives. The same reference carries a second range failure short of BROKEN, `:326-340` cited for the argmax family selector, which is at `:364-373`; that is graded VERIFIED-NARROWED in the design ledger because the lines resolve and carry code, just not the code named.

### Unnumbered locators that fail the same way

These are cited in prose or in metadata tables rather than as `[n]`, so they carry no bracket number and are not counted above. Every one of them is a path a reader is invited to follow and cannot.

| Document | Locator as cited | What is there instead |
|:---|:---|:---|
| S2 | `05_DATA/03_generators/s2_verify.py` | Directory holds only `a8_form_analysis.py`. The file is at `/home/claude/s2-verify.py`, hyphenated rather than underscored |
| S2 | `05_DATA/03_generators/s2_verify2.py` | As above; `/home/claude/s2-verify2.py`, with a copy in `deliver/` |
| S2 | `05_DATA/03_generators/s2_verify3.py` | As above; `/home/claude/s2-verify3.py`, no copy in `deliver/` |
| S2 | `05_DATA/03_generators/s2_rsi.py` | As above; `/home/claude/s2-rsi.py`, with a copy in `deliver/` |
| S2, and MPN-NOTE-02 | `05_DATA/03_generators/s2_census.py` | **Nothing at all.** No file of that name and no file matching `s2*census*` exists in any tree reachable from this session. The corpus counts of S2 section 2 and the clip counts of section 5.3 are attributed to a script that cannot be run, and MPN-NOTE-02 names the same script as its own reproducer |
| S3 | `05_DATA/03_generators/`, for the eleven scripts of the closing table plus `s3_bias_reconcile.py` | Directory holds only `a8_form_analysis.py`. All twelve scripts resolve at `/home/claude/`, and again at `/home/claude/gen/` and `/home/claude/deliver/`, under exactly the names the paper gives |
| S3 | `S3-GENERATORS-README.md` | Resolves only at `/home/claude/deliver/S3-GENERATORS-README.md`, not beside the paper and not in the corpus |
| S4 | `05_DATA/03_generators/`, for the ten scripts of the metadata table | Directory holds only `a8_form_analysis.py`. All ten resolve at `/home/claude/gen4/`, including the uncited `s4_hand_vs_engine.py` the metadata table says is retained |
| Design, through [16] | `05_DATA/03_generators/s7_blocking_numbers.py`, named inside MPN-NOTE-05 as its reproducer | Resolves at `/home/claude/gen7/s7_blocking_numbers.py`. MPN-NOTE-05 itself is at `/home/claude/gen7/MPN-NOTE-05-blocking-numbers.md` and is not in the drafts directory, though the design cites it by bare filename and so breaks nothing as written |
| Design [7] | `s5_salvage.py`, recorded by the document as having no verified path | Resolves at `/home/claude/gen4/s5_salvage.py`. This is the inverse of the other rows: the document declined to give a path it could not confirm, which was the right call, and the path exists. Its nineteen artefacts and their four counts check exactly |

The pattern is one prefix. `05_DATA/03_generators/` is cited by four of the five documents and by two of the companion notes, it resolves to a real corpus directory, and that directory holds one file which is none of the twenty-eight scripts cited into it. The scripts are real, they run, and they are spread across `/home/claude/`, `/home/claude/gen/`, `/home/claude/gen4/`, `/home/claude/gen6/` and `/home/claude/gen7/`. What has not happened is the copy into the corpus that every one of those citations presumes. That is a single act of housekeeping and it would clear ten of the eleven rows above; the eleventh, `s2_census.py`, needs the script written or the claim withdrawn.

One further note on reach, because it bears on what this pass could and could not do. The corpus as uploaded holds `01_THEORY`, `05_DATA` and an `08_PAPERS` of four files: the A8 memo, the assertions register, the commensurability note and S1. A second partial mirror at `/home/claude/mpn-theory/08_PAPERS/` holds forty-four files including MPN-1, MPN-2, MPN-3 and the earlier ledgers. The live drafts, which are what the citations of the form `08_PAPERS/X.md` actually mean, are at `/home/claude/ms-drafts/`. No tree reachable from this session holds all three sets, and the author's own machine, as connected to this session, exposes no MPN corpus at all. Every `08_PAPERS/` citation in the five documents was resolved against the drafts directory and each is recorded in its ledger as found there, which is honest but is not the same as finding it in the corpus.

## The verified fraction

**Twenty-seven of one hundred and seven bracket references across the six documents are VERIFIED**, which is a quarter of them, and the other eighty are not. Of the eighty, forty-eight are SELF, twelve are VERIFIED-NARROWED, eighteen are UNVERIFIED-OFFLINE and two are BROKEN.

Restricted to the eighty-nine references established in this pass, rather than carried forward from S1, the figure is **twenty-two of eighty-nine**, which is close to the same quarter. The distribution is not even across the documents and the unevenness is the more useful number. The PRD, which reaches outside the corpus for most of its warrant, is VERIFIED on ten of eighteen, and every one of its twelve external URLs was attempted, eleven of them returning content that was read. S2, whose external sources are the mathematical and dynamical literature, is VERIFIED on four of twenty-seven and UNVERIFIED-OFFLINE on six, because six of its published sources sit behind paywalls, robots exclusions or HTTP 403 responses that were not routed around. S4 is VERIFIED on one of eight and SELF on five, because it cites almost nothing but the series and its own scripts.

What the quarter does and does not say is worth one sentence. A SELF row is not a weak row; it means the warrant is internal and its currency has been checked, and forty-four of the forty-eight are current revisions cited correctly. An UNVERIFIED-OFFLINE row is not a failure either; it is a published source that a reader with library access can settle in an afternoon, and the row says which one. The rows that should move are the two BROKEN references, the eleven broken unnumbered locators, and the twelve VERIFIED-NARROWED rows, each of which names a specific sentence that overstates what its source carries. Those twenty-five items are the whole of the remedial work this pass generates, and none of them touches a result.
