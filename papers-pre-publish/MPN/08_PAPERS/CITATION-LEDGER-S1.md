# Citation ledger: MPN-S1, the McKenney-Lacan psychometric calculus

Paper: `08_PAPERS/S1-mckenney-lacan-theory.md`, revision 3 of 2026-09-12. Every `[n]` used in the paper is listed, numbered by first appearance, with its verification status. Statuses are carried forward from the ledgers built for the earlier series (`CITATION-LEDGER-MPN-1.md`, `CITATION-LEDGER-MPN-2.md`, which drew on research files q1, q4, q5 and q8 and were re-checked by an independent QA pass against Crossref and publisher pages), or established here.

Status vocabulary. **VERIFIED**: DOI or publisher record confirmed on a fetched page. **UNVERIFIED-canonical**: standard work cited without page numbers, coefficients or quotations. **corpus**: a document in the author's own corpus, cited by its path in this repository. **code**: reference implementation, cited by path and line. **data**: a figure computed from the scored corpus by a named script.

## References in the paper

| [n] | Short reference | Status | Source of status | What the paper takes from it |
|:--|:---|:---|:---|:---|
| 1 | Wagner, *Oper und Drama*, 1851 | UNVERIFIED-canonical | Cited for the dramatic warrant of the leitmotif only | That music should carry a character's psychological essence rather than accompany action. No pages, no quotation |
| 2 | Eerola and Vuoskoski 2013, *Music Perception* 30(3) | VERIFIED | MPN-2 ledger [37]; q5 §4 | The dimensional valence-arousal model is prevalent and reliable on its own terms. No coefficients quoted |
| 3 | Goldberg 1990, *JPSP* | UNVERIFIED-canonical | MPN-1 ledger [62]; q4 §1 | Big Five as the replicated lexical taxonomy |
| 4 | "DISC assessment", Wikipedia | VERIFIED (fetched; tertiary, labelled as such in the paper) | MPN-1 ledger [65]; q4 §2 | History of the instrument; reported absence of independent validity evidence; loading onto extraversion and agreeableness. Third-hand for the underlying studies and the paper says so |
| 5 | Paulhus and Williams 2002, *JRP* | UNVERIFIED-canonical | MPN-1 ledger [66]; q4 §3 | Dark Triad as a named construct |
| 6 | Paulhus, Buckels, Trapnell and Jones 2021, *EJPA* 37(3), 208-222 | VERIFIED (PDF fetched; QA confirmed Tables 4 and 6) | MPN-1 ledger [68]; q4 §3 | Research-instrument standing and contested factor structure. No reliabilities quoted here |
| 7 | Lacan, *Écrits*, Norton 2006 | UNVERIFIED-canonical | MPN-1 ledger [22]; q1 §7 | The three registers. No pages |
| 8 | Lacan, *Seminar XXII: R.S.I.* | UNVERIFIED-canonical | MPN-1 ledger [16]; q1 §3 | The Borromean figure only. No authorised English edition; §5 of the paper states this |
| 9 | Fink 1995, *The Lacanian Subject* | UNVERIFIED-canonical | MPN-1 ledger [10]; q1 §2 | Mathemes as ideograms rather than variables with values |
| 10 | Sokal and Bricmont 1998, *Fashionable Nonsense* | VERIFIED (summary confirmed; QA confirms the charges used) | MPN-1 ledger [27]; q1 §8 | The charge is against claiming mathematical authority for a metaphor. Used to state what the theory declines to do |
| 11 | McKenney, "Topology of the diad and triad" | corpus | `01_THEORY/01_core/03_TOPOLOGY_OF_DIAD_AND_TRIAD.md` | Diad has no mediator and breaks under dissonance; triad is the minimal stable unit; Borromean assignment of R, S and I to roles. Warrant for B3's dyadic quantities |
| 12 | Simmel, on the triad as the first stable social form | UNVERIFIED-canonical, cited through [11] | As attributed in [11] §2.1 | The sociological precedent only. No pages, no edition claimed |
| 13 | McKenney, *Cognitive Bias Atlas*, Unified Psychometric Field Theory vol. XV, v.8, 8 Dec 2025 | corpus | `01_THEORY/03_unified/16_Vol_15_Cognitive_Bias_Atlas.md` | Thirty biases CB-001 to CB-030 and four named domains. NOTE: the Atlas assigns a domain to only 16 of the 30; CB-017 to CB-030 sit in an expanded table with no domain and no activation rating. Activation ratings quoted in §9.2 (groupthink 9/10, loss aversion 8/10, in-group 8/10) are present; the planning fallacy carries none and is not cited for one |
| 14 | McKenney, "Polyphony and dissonance in dialogue" | corpus | `01_THEORY/01_core/08_POLYPHONY_AND_DISSONANCE_IN_DIALOGUE.md` | Semantic vector per speaker; interval as the angle between vectors; unison, consonance and tritone; parallel, contrary and oblique motion; resolution by concession, modulation or suspension |
| 15 | McKenney, "Adversarial counterpoint" | corpus | `01_THEORY/01_core/09_ADVERSARIAL_COUNTERPOINT_ATTACK_DEFEND.md` | Subject and countersubject; exposition, development and recapitulation as an act structure; tempo asymmetry |
| 16 | Hevner 1936, *AJP* 48(2) | UNVERIFIED-canonical | MPN-2 ledger [38]; q5 §4 | Mode and tempo as the strongest structural determinants of expressed affect |
| 17 | Gabrielsson and Lindström 2010, *Handbook of Music and Emotion* | UNVERIFIED-canonical | MPN-2 ledger [39]; q5 §4 | Structure-to-emotion review; tempo dominates mode |
| 18 | Juslin and Laukka 2003, *Psychological Bulletin* 129(5) | VERIFIED (DOI and PMID) | MPN-2 ledger [35]; q5 §3-4 | Tempo as the most consistent arousal cue. No accuracy percentages quoted |

## Code and data cited in the text without a bracket number

Revision 3 note. Revision 2 of the paper carried several code claims forward from `BLOCK-A-ARBITRATION.md` without checking them against the repository. A Skeptic review checked them and two were false. Both are corrected in the paper and in this table, and the arbitration document is the source that should be treated as unverified on these points, not the code.

| Locator | Status | What the paper takes from it |
|:---|:---|:---|
| `mpn-conductor-standalone:src/lib/leitmotif_transformation_rules.ts:63-90` | code | Register-to-mode table one, Real to Dorian or Aeolian, Symbolic to Lydian or Mixolydian, Imaginary to Phrygian or Locrian. **The function takes trauma and branches on `trauma > 0.6` at :79, :84 and :89.** Called at :342; the resulting mode is consumed at `GeniusComposer.ts:186` and applied to every pitch at :304-310. The arbitration's claim that the threshold is implemented nowhere is false and is withdrawn in §8.3 |
| `mpn-conductor-standalone:ml/psychoscore_v2/models/mckenney_lacan_calculus.py:189-199` | code | Table two, Real to Phrygian, Symbolic to Ionian, Imaginary to Lydian; `rsi_to_mode` takes three arguments and trauma is not one of them. Same table in the README and in `10_CORE_EQUATIONS.md §4.1` |
| `mpn-conductor-standalone:src/components/mpn-lab/psychometric_calculus.ts:108-112` | code | Table three, a pair table on table two's assignments, Imaginary to Lydian or a whole-tone scale, which is not one of the seven modes. This is the table live in the browser calculus that sets key and chord quality |
| `mpn-conductor-standalone:ml/psychoscore_v2/inference/server_v2.py:195-201, 222-227` | code | Table four, mode from trauma alone. Seven modes are defined with **overlapping** windows resolved in dict-insertion order, so six are reachable and Lydian is never returned |
| `mpn-conductor-standalone:ml/psychoscore/data/generate_synthetic_pairs.py:23-30` | code | Table one again, in the v1 training-data generator |
| `mpn-conductor-standalone:src/components/mpn-lab/psychometric_calculus.ts:141-143, 242-250` | code | `analyzeRSI` assigns the registers by counting keyword hits, and the keyword lists contain "real", "symbolic" and "imaginary"; the three counts are then divided by their own total, which is what manufactures A3's simplex constraint. This is the circularity reported in §11 |
| `mpn-conductor-standalone:src/components/mpn-lab/psychometric_calculus.ts:292-296, 308-314, 347-356` | code | Entropy sets tempo and time signature; the register triple sets the key; `tension = 0.9·real + 0.1·entropy` sets the chord type. Basis for §11's correction that the registers and entropy do move on the score path |
| `mpn-conductor-standalone:src/components/mpn-lab/GeniusComposer.ts:147-155` and `score_orchestrator.ts:299-305, 312-317` | code | `composeMelody(..., trauma = intensity, entropy = 0.5)` called with five arguments, so entropy is pinned inside the melody generator |
| `mpn-conductor-standalone:src/components/mpn-lab/GeniusComposer.ts:159` and `src/app/mpn-conductor/page.tsx:367-369` | code | The hard-coded register triple (0.33, 0.33, 0.34) on the two composer-direct paths |
| `Math.random()` in `GeniusComposer.ts` (9) and `psychometric_calculus.ts` (2) | code | **Eleven** unseeded calls, not ten; a twelfth at `src/app/api/analyze-character-psychometrics/route.ts:251` assigns `entropy: Math.random() * 0.3 + 0.2` |
| `mpn-conductor-standalone:src/lib/leitmotif_generator.ts:183-185` | code | Motif inversion negates `transformed.intervals`; no other file reads `.intervals`, so it is inaudible |
| `mpn-conductor-standalone:src/components/mpn-lab/GeniusComposer.ts:190` | code | `orchestrationLevel` reaches a console log and nothing else; `transformations.instruments` and `.harmonyContext` (`leitmotif_transformation_rules.ts:346, 352-356`) do not reach even the log |
| `mpn-conductor-standalone:src/components/mpn-lab/mpn_reference_data.ts:1755-2390` | code | Thirty bias entries, all `source: 'RSCH-34'`; twenty-nine distinct traits, framing appearing twice; the Cialdini six occupy the first two tiers |
| `mpn-conductor-standalone:ml/psychoscore_v2/models/mckenney_lacan_calculus.py:58-66, 69-88` | code | $v = 20 + 107\tau$ with eight dynamic markings. `src/app/mpn-conductor/page.tsx:359-360` discretises the same linear form to five labels; `mpn_reference_data.ts:666-735` replaces it with three fixed velocities and an `mf` fallback. Basis for §6's disclosure |
| `MPN_ACADEMIC_DISSERTATION.md:873` | corpus | n = 24, mean appropriateness 4.2 of 5, on the assignment Symbolic to Lydian, which is table one |
| `MPN_ACADEMIC_DISSERTATION.md:1127` | corpus | The null: n = 48, p = 0.72, Cohen's d = 0.08 |
| `05_DATA/01_scores/hand_annotated_frames.csv` | data, **not evidence** | 232 frames, thirteen works, extracted from `literary_data.ts` (119) and `additional_plays.ts` (113). The prose and chord annotations are the author's; **the trauma and entropy values were produced by the application's own text analyser and calculus**, run over that prose, as the author confirms. sd(H) = 0.1925, sd(τ) = 0.2496, corr = +0.2802, r(frag, dens) = 0.9150, PC1 95.75 per cent, 10 of 25 level pairs |
| `05_DATA/01_scores/MCKENNEY_LACAN_SCORE_*.csv` | data, **not evidence** | Seven files, 31,078 rows, produced by `03_generators/batch_process_classic_plays.py`: trauma = (beat/total)·0.8 + keyword count·0.1, entropy = 0.30 + punctuation tally. Trauma correlates with beat position at 0.995 to 0.999 per file; entropy reproduces from the TEXT column with zero error; 72.8 per cent of rows at the entropy floor; no register values; all 3,425 King Lear rows assigned to `STAGE` |
| `05_DATA/03_generators/a8_form_analysis.py` | data | Every figure in §8.2, on both sets, each labelled for what it is. The algebraic expression, the correlation a corpus would need for the shipped pair to fall below 0.65 (worse than −0.525), and the candidate results |
| `08_PAPERS/BLOCK-A-ARBITRATION.md` | corpus, **partly superseded** | The disposition of the eleven assertions and the decision log. Its claims that θ = 0.6 is implemented nowhere, that the registers are fixed on both primary paths, and that there are ten unseeded random calls, are each refuted above |
| `08_PAPERS/REVIEW-S1-skeptic.md` | corpus | The review that produced the corrections in this revision |

## Claims carried without a citation, on purpose

These are McKenney's assertions. They are not attributed to a source because no source asserts them, which is the point section 5 of the paper makes: that the registers admit magnitudes, that they sum to one, that the dominant register selects a mode, that fragmentation and density have ordered levels, and that the whole composes into a calculus.

## Not cited, though available

Lerdahl and Krumhansl 2007, Krumhansl and Kessler 1982, Cohn 1996, 1997 and 1998, Eerola, Ferrer and Alluri 2012, Barrett et al. 2019, Gadalla et al. 2026: all present in the earlier ledgers with their statuses, none needed by a theory paper. S2 and S3 will need most of them.
