| Field | Value |
|:---|:---|
| Designation | MPN-S4-AMENDMENTS |
| Title | Corrections to S1 arising from S4 |
| Author of the theory | J. McKenney |
| Status | Issued with S4 revision 2, 13 September 2026. Each amendment carries the test that forced it and the replacement text, so the affected paper can be updated from this note rather than from a reading of S4's prose |
| Reproduces | `05_DATA/03_generators/s4_frame_provenance.py`, `s4_score_provenance.py`, `s4_score_laws.py` |
| Affects | S1 revision 3, section on what the corpus does not contain |

## 1. Why this note exists

The series practice, set by MPN-S2-DECISIONS and followed by MPN-S3-AMENDMENTS, is that a paper which moves a sibling's figure issues replacement text rather than leaving the sibling to be corrected from a reading of the new paper. S4 moves four of S1's figures and contradicts one of its statements. All five are set out here.

Nothing in this note touches an assertion of the calculus. Every item is a statement about the corpus or about the implementation, which is what S4 is for.

## 2. The provenance of the 232 frames

**S1 revision 3 currently says**, of the frame library: "Their prose descriptions and chord annotations are the author's, but the state values were produced by the application's own text analyser and calculus, run over that prose. The paper's second revision was wrong to describe them as hand annotations, and the error is not a small one."

**The correction is right about the registers and wrong about trauma and entropy.** `s4_frame_provenance.py` reads the two data files and the consumer:

| Component | What the data and the code show |
|:---|:---|
| trauma | 232 literals, one per frame, written out as numbers in `literary_data.ts` (119) and `additional_plays.ts` (113) |
| entropy | 232 literals, likewise |
| the three registers | computed by `analyzeRSI(frame.analysis)` at `score_orchestrator.ts:249`, a keyword count over the author's prose |
| the four DISC coordinates | not produced; `inferDISC` returns null under decision 9 |

Corroboration from the values themselves: trauma takes twelve distinct values across the library and entropy ten, all round to a tenth except 0.85 and 0.95. Corroboration from the consumer: `processFrame(frame: ScriptFrame, trauma: number, entropy: number)` receives them as parameters, and there is no assignment to any trauma-named or entropy-named variable in any of the four score-path modules.

**Replacement text for S1.**

> The second is the 232 frames. Their prose descriptions and chord annotations are the author's, and so are their trauma and entropy: each frame carries both as a literal number in the data file, 232 of each, and the orchestrator receives them unchanged. The register triple is not the author's. It is produced by the application's own analyser, which assigns the registers by counting the words "real", "symbolic" and "imaginary", among others, in the prose it is given, so the register values are the analyser's reading of the author's commentary rather than a reading of the plays. The paper's second revision was wrong to describe the whole frame as a hand annotation, and its third revision was wrong to extend that correction to the trauma and entropy; those two are the author's judgements and the registers are the analyser's. The correlation of +0.2802 between trauma and entropy on those frames is a fact about one person's judgements of scenes he selected and described.

**What does not change.** S1's governing sentence stands exactly as written, and S4 affirms it: the corpus contains no observation of trauma, entropy or the registers that the system did not itself produce. A number the author typed for a scene he wrote the description of is a judgement made without a codebook, without a second coder, and about his own selections. It is not an observation, and correcting who produced it does not make it one. S2's sentence also stands without change, because it is about the triples alone: no human produced any of the 232 triples.

### 2.1 The same error is in two further places in S1

The paragraph in section 2 is not the only place S1 carries the description. Two others do, and a revision that changed only the first would leave the paper inconsistent with itself.

**S1 section 11, the paragraph the paper marks as its most important.** It currently reads: "The same holds for the library itself. The 232 frames are the output of this analyser and this calculus, so the largest set of state values in the corpus is the system's reading of the author's prose about the plays, not a reading of the plays and not an independent assignment."

Replacement text:

> The same holds for the register values in the library. The 232 register triples are the output of this analyser, so the largest set of register values in the corpus is the system's reading of the author's prose about the plays, not a reading of the plays and not an independent assignment. The trauma and entropy beside them are not the analyser's: each frame carries both as a number the author typed, and they are neither a reading of the plays nor an independent assignment either, being one person's judgements of scenes he selected and described, made without a codebook and with no second coder. Every figure in section 8.2 that is drawn from the library is therefore a fact about two formulae and one person's judgement, which is why that section rests on the algebra and treats the frames as illustration. This is the single most important thing in this section, and it is why A2 and A3 are held as hypotheses rather than defended.

**S1's revision note, in the metadata table.** It currently reads "A8 amended on an algebraic finding confirmed on 232 hand-annotated frames". Replacement text: "A8 amended on an algebraic finding confirmed on the 232 frames of the library, whose trauma and entropy are the author's and whose register triples are the analyser's".

A revision 4 of S1 applying section 2 and this subsection is owed before S1 is next cited. It is not owed before S4 publishes, because a note that issues replacement text discharges the obligation to correct a sibling without performing the correction, which is the practice MPN-S2-DECISIONS set.

## 3. Four figures S4 moves

| S1's figure | S4's figure | Why |
|:---|:---|:---|
| the speaker parser assigns all 3,425 rows of *King Lear* to a single non-speaker | 3,424 rows carry `STAGE`; the 3,425th carries `FINIS` | `s4_score_provenance.py` counts the speaker column. The finding is unaffected: the parser extracted no dialogue |
| entropy reproduces from the text column with zero error | it reproduces on 31,077 of 31,078 rows | `s4_score_laws.py` applies the published formula to every row. The exception is one line of Chekhov ending "sail!!", whose stored entropy is the value the formula gives without its multi-punctuation term |
| trauma correlates with beat position at 0.995 to 0.999 in every file | unchanged; S4 adds the pooled figure of $+0.9969$ over all 31,078 rows | S1's per-file range is confirmed and needs no replacement text |
| 72.8 per cent of rows sit at the entropy floor | unchanged; S4 adds the per-file range of 53.2 to 88.8 per cent | confirmed exactly by `s4_score_laws.py`; no replacement text |

Two of those four rows need replacement text and two do not, so the two that do are given it here.

**S1's King Lear sentence.** It currently reads "the speaker parser assigns all 3,425 rows of *King Lear* to a single non-speaker". Replacement text: "the speaker parser assigns 3,424 of the 3,425 rows of *King Lear* to a single non-speaker, the remaining row carrying the word FINIS, so it extracted no dialogue from that file at all".

**S1's entropy sentence.** It currently reads "entropy reproduces from the text column with zero error". Replacement text: "entropy reproduces from the text column on 31,077 of its 31,078 rows, the exception being a line whose stored value is what the published formula gives without its multi-punctuation term, which is one of two signs that these files predate the code that is supposed to have produced them".

The second of those is the one that matters beyond arithmetic. Together with the first beat of every file carrying an arrhythmia the shipped calculus cannot return, it establishes that the seven score files were produced by an earlier version of `mpn_engine` than the one in the tree, and that no record of that version exists.

## 4. One description S4 supersedes outright

S1 describes the seven files as "a set of seven files described as scored plays, 31,078 beats". S4 section 3 establishes by counting them that they are seven Project Gutenberg files containing twenty works, six introductions and an author's preface, two licence blocks and one file with no dialogue. The figure 31,078 is a line count over seven text files.

**Replacement text for S1**, first sentence of that paragraph:

> The first is a set of seven files described as scored plays, 31,078 beats. They are neither: they are seven Project Gutenberg downloads containing twenty works between them, three of them anthologies, one of them yielding no dialogue at all, and two of them running past the end-of-book marker into the licence, which is scored as drama. S4 section 3 gives the counts.

## 5. What is not amended

S1's assertions are untouched. So are S2's theorems, S3's mapping, and every author decision. This note carries no new claim about the theory and proposes none.
