| Field | Value |
|:---|:---|
| Designation | CITATION-LEDGER-S6 |
| Document | MPN-S6, `S6-expression-aid.md`, revision 2 |
| Date | 15 September 2026 |
| Written because | Skeptic finding 25, upheld and narrowed as arbitration ruling 4.7, blocking on both use-case papers: neither carried a citation ledger, and four external quantitative claims had no source anywhere in the corpus [19] |
| References in the paper | 20, numbered [1] to [20], all defined and all cited. No gap, no orphan. References [18], [19] and [20] are new in revision 2 |
| Method | Every internal target was opened on the author's machine and its size recorded. Every claim a reference is cited *for* was checked against the target's own text. Every generator the paper cites was run. Every external figure was searched for independently |
| Result | 18 of 20 verified as draft 1 stated them. **Two were wrong and are corrected in revision 2.** One external figure carried through the design remains unsourced and is marked on the face of section 6 |

## 1. What a status here means

**VERIFIED**: the target was opened and the specific claim the paper cites it for was found in it. For a script, the script was run and the quantity is in its output.

**VERIFIED, CORRECTED**: the target was opened, and something about the citation as draft 1 stated it was wrong. The correction is stated in the row and is applied in revision 2.

**BROKEN IN DRAFT 1**: the path the paper named does not exist in this corpus. Two references were checked against the filesystem rather than against the paper's description of them, and one failed.

**UNSOURCED**: the paper states an external quantitative figure and no publication for it could be found. It is not a soft form of verified.

## 2. The two defects this ledger found

Neither was raised by any of the three reviewers, and both were found by opening the target rather than by reading about it.

**Reference [17] was broken.** Draft 1 cited `LISTENING-TEST-THERAPIST-SECTION.md` as the programme's own precedent for how a test pack addresses the people taking it. No such path exists. The file the paper means is `06_APPLICATIONS/06_listening_test/THERAPIST-SECTION.md`, 8,505 bytes, which does carry what the reference claims: the defects of the system stated before any question is asked. Corrected in revision 2. The citation was sound and the path was not, which is the failure mode a ledger exists to catch and which no amount of reading the paper would have caught.

**Reference [3] carried two filenames.** Arbitration ruling 4.7 directed both use-case papers to move the MPN-S3 reference from "revision 9, as amended by `MPN-S3-AMENDMENTS-2.md`" to `S3-mapping-phi-rev10.md`. Applied literally to this paper's reference line, that left both the old filename and the new one in the same entry. Corrected.

## 3. The external quantitative claim that is still unsourced

Arbitration ruling 4.7 found four external figures reaching both papers through design section 4.1, with no reference for any of them. Three of the four were traced while MPN-S5's ledger was being written, to a single published streaming diarisation benchmark on DIHARD III: pyannote API at 19.8 per cent DER, Deepgram Nova 3 at 39.1, AssemblyAI Universal Streaming v3 at 39.2, and, for the fourth clause, unattributed speech at 7.71 per cent for pyannote against 19.70 to 25.26 per cent for the others. That is reference [20] and it is new in revision 2.

The fourth, **meeting-benchmark word error of 35 to 46 per cent, could not be traced to any publication**, by the corpus or by independent search. The nearest published material describes multi-speaker meeting transcription scored as concatenated minimum-permutation word error rate and puts it "often in the 40 to 60 per cent range or higher" on AMI and ICSI, attributing it to no system, which is a different metric over a different range and cannot stand in. **It is UNSOURCED and no citation has been invented for it.**

This paper is the one that leans on it. Section 6 uses it to argue that class B inherits the recognition problem from class C unchanged, and section 10's falsifier one now uses it as the latency half of the class C composition. Revision 2 marks it on the face of section 6 and says so again in falsifier one. Tracing it at source is MPN-S5 item S5-12 and it belongs to the design.

## 4. The ledger

| Ref | Target | Cited for | Status | Evidence |
|:---|:---|:---|:---|:---|
| [1] | `S1-mckenney-lacan-theory.md`, revision 3, with `MPN-S4-AMENDMENTS.md` | Assertion B4 and its two-to-three channel budget | VERIFIED | Both files present, 61,243 and 9,492 bytes. B4 found in `ASSERTIONS-REGISTER.md` under its own heading. B4's channel clause is contradicted by BL-8 option (e) per [9], which this paper does not turn on and which is the arbitration's decision 9.1 |
| [2] | `S4-application.md`, revision 2, with `ARBITRATION-S4.md` | Section 2 for score-column provenance, 3.3 for the King Lear parse, and the keyword-counter finding this paper's section 4 rests on | VERIFIED | Both present, 80,383 and 40,418 bytes. The keyword-counter finding is the load-bearing citation in this paper after arbitration ruling 8.1, which struck the design sentence that had been standing beside it |
| [3] | `S3-mapping-phi-rev10.md`, revision 10 | $\Phi$'s domain and the fact that it does not run on this surface | VERIFIED, CORRECTED | Present, 185,147 bytes. Draft 1 cited revision 9 as amended; ruling 4.7 corrected it, and the first application of that correction left both filenames in the entry. Both corrected |
| [4] | `PRD-MPN-THERAPY.md`, draft 6, section 7.2 at `:261` | The major-happy and minor-sad association, the 92 per cent in adults, the 58 per cent figure | VERIFIED | Present, 68,730 bytes. This target's own gate disposition is STOP with 62 findings, which does not affect what is cited: the paper cites it for evidence it carries, not for its conclusions |
| [5] | `DESIGN-UNIFIED-FRAMEWORK-rev8.md`, revision 8 | D8, D26, D27, D28, D29, D30, D42, D53, D54, D64, D65, D69, D70, LS-1, LS-3; sections 3, 4.1, 4.2, 6.1, 6.2, 6.3, 6.4, 7.4, 10 | VERIFIED, CORRECTED | Present, 184,079 bytes. Two corrections. Its section 4.2 records variation in **gap length and overlap tolerance**, against a fixed threshold, and not in word lists: draft 1's section 4 used it as the warrant for a ruling about a word list, which ruling 8.1 struck. And its section 4.1 class C figures at `:76` and `:434` carry no reference at either site, which is section 3 above |
| [6] | `ARBITRATION-DESIGN-R7.md`, 14 September 2026, STOP | Rulings A to D, 45 required changes, 3 rejections; change 32 is finding U9 | VERIFIED | Present, 67,062 bytes |
| [7] | `REVIEW-DESIGN-R7-user.md`, disposition REVISE | Findings 8 and 9, the Expression findings; the cross-cutting paragraph on restorations | VERIFIED | Present, 25,316 bytes |
| [8] | `REVIEW-DESIGN-user.md`, reviewing revision 3 | Findings 2, 3, 4, 5 and 15, which become D27, D28, D29, D30 and section 6.4 | VERIFIED | Present, 3,495 bytes and 602 words, which is short for fifteen findings and is short because the findings are a table rather than prose. All fifteen are there, numbered, each with its disposition. Findings 2, 3, 4, 5 and 15 read as the paper describes them and map to the decisions the paper names |
| [9] | `DECISION-LOG-2026-09-14.md` | Decision A, BL-8 as option (e), with its reopening condition | VERIFIED | Present, 3,653 bytes |
| [10] | `05_DATA/03_generators/VERIFICATION-2026-09-14.txt` | Every design figure this paper carries, with the command that produced it | VERIFIED | Present, 52,752 bytes |
| [11] | `05_DATA/03_generators/s6_three_clef.py` | The exclusion assertion at 31,078 read, 3,425 excluded, 27,653 retained; the information budget defect | VERIFIED | Present, 22,776 bytes. Run: exits 0, 209 lines, all three counts print as the paper states. The information budget prints eighteen quantities with backchannel as a sixth, which is the defect. Under ruling 6.14 this paper no longer files it as EX-8 but as a reference to MPN-S5 item S5-8 |
| [12] | `05_DATA/03_generators/s6_bias_layer.py` against `s3_bias_reconciliation.json` | Thirty entries, thirty naming a coordinate, three flagged | VERIFIED | Both present, 35,563 and 15,489 bytes. Note for any future revision: this script prints a **channel** census and not a domain census, which is the attribution error arbitration ruling 4.4 found in the companion paper. This paper does not make that error |
| [13] | `THERAPY-AUTISM-ANALYSIS.md` | Six things and no others, including that music is the smallest-difference modality, and the epistemic-overwrite risk | VERIFIED, CORRECTED | Present at `06_APPLICATIONS/04_therapy_usecase/`, 16,845 bytes. The risk it states is a three-part conjunction. Draft 1's section 1 isolated the first part, narrowed it to a representation of a **state** in this programme's technical sense, and reported the conjunction closed. Ruling 8.7 struck that and revision 2 states the conjunction as the source states it |
| [14] | `05_DATA/03_generators/s6_floor_share_units.py` | Section 3's table in full | VERIFIED, CORRECTED | Present, 9,387 bytes. Run: exits 0, 112 lines. Every cell of section 3's table reproduces, being 64.6 and 71.0 on A Doll's House, 40.4 and 53.2 on Hamlet, 30.0 and 42.3 on Macbeth, the spreads at 6.4, 12.8 and 12.3 points, the substantial-speaker counts at 7, 18 and 22 and the rank-change counts at 4, 17 and 17. The script also prints "top speaker same under both units" per file and returns False on **two**, the Chekhov and the Strindberg anthologies. Draft 1 said one. Corrected under ruling 4.3, and EX-9 adds the assertion that would have caught it |
| [15] | "The major-minor mode dichotomy in music perception," bioRxiv, 2023 | The behavioural, physiological and clinical correlates, as carried by [4] | VERIFIED as carried | Verified as present in [4] at its own reference [13] and as saying what [4] says it says. This ledger did not re-verify the preprint itself against its publisher, so the status is verified as carried and not verified at source |
| [16] | `ASSERTIONS-REGISTER.md` and `CITATION-STATUS-ALL.md` | B4's claim, formal content, constraint and falsification clause; the citation pass over S1 to S4, the PRD and the design | VERIFIED | Both present, 26,858 and 12,001 bytes |
| [17] | `06_APPLICATIONS/06_listening_test/THERAPIST-SECTION.md` | The programme's own precedent for a test pack that states the system's defects before asking a question | **BROKEN IN DRAFT 1**, corrected | Draft 1 named `LISTENING-TEST-THERAPIST-SECTION.md`, which does not exist anywhere in this corpus. The file it means is present at the path above, 8,505 bytes, and carries what the reference claims. Section 2 above |
| [18] | `S5-dialogue-use-cases.md`, revision 2 | The four obligations and which survives the trip here; the named comparison; the backchannel lexicon as a producer's mitigation; the class C figures; the four "user and the question" subsections | VERIFIED, NEW IN REVISION 2 | Present, 130,426 bytes. Draft 1 of this paper cited MPN-S5 nowhere, which is how one paper came to hold a position about this one that this one had not answered |
| [19] | `ARBITRATION-S5-S6.md`, 14 to 15 September 2026 | Every replacement sentence in revision 2; the dispositions; the scope row; decisions 9.1 to 9.6 | VERIFIED, NEW IN REVISION 2 | Present, 195,744 bytes. 71 findings, all ruled; 57 rulings; 37 upheld, 14 narrowed, 6 rejected; 109 repair directives. Disposition on this paper: STOP, 20 blocking. Its section 10.4 corrects its own header, which stated counts written before three of its sections existed |
| [20] | Streaming diarisation benchmark on DIHARD III, pyannoteAI | Three of the four class C figures and the missed-speech finding | VERIFIED, NEW IN REVISION 2 | Retrieved 15 September 2026. Reports 19.8, 31.3, 39.1 and 39.2 per cent DER and unattributed speech at 7.71 against 19.70 to 25.26 per cent |
| UNSOURCED | Meeting-benchmark word error of 35 to 46 per cent | Design `:76` and `:434`, reaching this paper's section 6 and its falsifier one | **UNSOURCED** | No publication found. Marked on the face of section 6 under ruling 4.7. Tracing at source is MPN-S5 item S5-12 |

## 5. One arithmetic check this ledger ran, because a citation is not only a path

Arbitration ruling 8.12 turns on a quantitative claim the design states and no document verifies, so it was computed rather than cited, and the result is recorded here because it changes what reference [5] can be cited for.

The design says, at `:76`: "At a fifth of speech mis-attributed, a true 60/40 floor share is not distinguishable from an even one." Model a fraction $e$ of speech assigned to the wrong speaker, symmetrically, so the observed gap between two speakers is $(1-2e)$ times the true gap.

| True split | $e = 0.198$ | $e = 0.313$ | $e = 0.391$ |
|:---|:---|:---|:---|
| 60 / 40 | 56.04 / 43.96 | 53.74 / 46.26 | 52.18 / 47.82 |
| 70 / 30 | 62.08 / 37.92 | 57.48 / 42.52 | 54.36 / 45.64 |
| 80 / 20 | 68.12 / 31.88 | 61.22 / 38.78 | 56.54 / 43.46 |
| 90 / 10 | 74.16 / 25.84 | 64.96 / 35.04 | 58.72 / 41.28 |

At 19.8 per cent, the rate the design cites in the same sentence, a true 60/40 survives as a twelve-point gap, and no resolution floor in this programme is set that high. **The design's sentence is too strong at its own best-case figure** and comfortably true at the vendor rates of 39.1 and 39.2. Inverted: to read as 60/40 the true split must be 66.56/33.44 at $e=0.198$, 76.74/23.26 at $e=0.313$ and 95.87/4.13 at $e=0.391$.

So reference [5] is cited in revision 2's falsifier one for the design's position and for the correction to it, rather than for the claim as the design states it. The conclusion the design draws is not disturbed at the rates a deployment would meet.

## 6. What this ledger does not close

Twenty references verifying is a statement about provenance. It says the numbers came from where the paper says they came from and that the paths resolve. It says nothing about whether this surface works.

One external figure remains unsourced and this is the paper that depends on it most. One reference was broken and was found only because the filesystem was checked rather than the prose. And the caveat that governs the whole series is untouched by any of it: not one listener has been asked anything, and the shipping gate this paper spends its longest section specifying has not been run.
