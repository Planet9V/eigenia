# MPN: table of contents

The McKenney-Lacan Musical Psychometric Notation programme. 304 files in the working tree. Everything here is readable and ready to use; nothing is a placeholder or a cloud pointer.

Reorganised 2026-09-12 with every file hashed before and after. Zero content was lost. Superseded duplicates sit in `_attic` and contain nothing unique; the December 2025 archive sits whole in `09_SNAPSHOTS` as the dated record.

## How to use this folder

Start at `01_THEORY/03_unified` for the theory as a whole, or at `01_THEORY/01_core` for the calculus itself. If you want the empirical material, go straight to `05_DATA`. If you want to know where a specific subject lives, use `00_INDEX/SUBJECT-INDEX.md` in this folder. If you want to find a specific file, use `00_INDEX/FILE-INDEX.md`, which lists all 304 by folder.

## Contents

| Folder | Files | What it is | Start here |
|:---|---:|:---|:---|
| `00_INDEX` | 5 | This index, the subject index, the file index, the manifests, the Drive stub index | `00_INDEX/SUBJECT-INDEX.md` |
| `01_THEORY/01_core` | 22 | The calculus: the unified theorem, critical slowing, the psychometric tensor, dyad and triad topology, polyphony and dissonance in dialogue, adversarial counterpoint, the musical score of interaction | `01_THEORY/01_core/01_MCKENNEY_LACAN_THEOREM_UNIFIED.md` |
| `01_THEORY/02_primers` | 10 | The mathematical foundations: tensors, knot theory, Riemannian geometry, complex analysis, Galois, category theory, Ito calculus, Hilbert space, statistical mechanics, modular forms | `01_THEORY/02_primers/Primer_01_MULTILINEAR_ALGEBRA_TENSORS.md` |
| `01_THEORY/03_unified` | 65 | The Unified Psychometric Field Theory volumes, the working chapters, the critical review | `01_THEORY/03_unified/00_Unified_Theory_Master_Index.md` |
| `01_THEORY/04_background` | 9 | The four long background works in markdown and docx, and the Loman Operator score | `01_THEORY/04_background/Lacan, Calculus, and Subject Formation.md` |
| `02_BIASES` | 45 | The NER-annotated bias corpus: 28 distinct biases in 658 tagged occurrences, plus 122 personality traits, 43 insider indicators, 25 social engineering techniques | `02_BIASES/EXECUTIVE_SUMMARY.md` |
| `03_PERSONALITY` | 53 | The personality framework corpus: attachment, emotionality, cognitive functions, corporate psychopathy, trust and betrayal dynamics | `03_PERSONALITY/README.md` |
| `04_NOTATION_ENGINE` | 14 | The notation system, the GNN engine, the symphonic score JSON, the Neo4j schema and Cypher library, the unified API spec, the psychometrics API, the Musica framework | `04_NOTATION_ENGINE/MUSICAL_CALCULUS_NOTATION_SYSTEM.md` |
| `05_DATA/01_scores` | 11 | Seven generated play scores, 31,078 beats, plus the Death of a Salesman beats | `05_DATA/01_scores/MCKENNEY_LACAN_SCORE_HAMLET.csv` |
| `05_DATA/02_source_texts` | 7 | The play texts those scores were generated from | |
| `05_DATA/03_generators` | 3 | The scripts that produced the scores | `05_DATA/03_generators/batch_process_classic_plays.py` |
| `06_APPLICATIONS/01_cycle` | 10 | Ten cycle applications from semantic web to omega point |  |
| `06_APPLICATIONS/02_predictive` | 5 | Epidemic thresholds, Ising opinion dynamics, Granovetter cascades, bifurcation, critical slowing |  |
| `06_APPLICATIONS/03_use_case_cyber` | 17 | Corporate personality assessments, psychohistory demographics, the unified personality matrix |  |
| `07_LACANIAN_REFERENCE` | 6 | Glossary, library of works, mathemes and topology, the calculus 4.0, use cases | `07_LACANIAN_REFERENCE/01_Lacanian_Glossary.md` |
| `08_PAPERS` | 22 | The paper series drafted from this material, with citation ledgers and QA reports | `08_PAPERS/MPN-SERIES-PLAN.md` |

Not in the working tree but kept: `09_SNAPSHOTS` holds the December 2025 archive whole and unmodified. `_attic` holds 369 superseded copies, verified to contain nothing unique, and is safe to delete.

## The score data, in brief

`05_DATA/01_scores` is the programme's empirical asset. Seven plays, 31,078 scored beats. Each row carries `BEAT, SPEAKER, TEXT, TRAUMA_R, ENTROPY_H, BASELINE_B, ARRHYTHMIA_α, NEO_RIEMANNIAN_OP, CLINICAL_HEALTH_SCORE`.

| Play | Beats |
|:---|---:|
| Miss Julie | 6,897 |
| The Cherry Orchard | 6,658 |
| Oedipus Rex | 5,097 |
| Hamlet | 3,969 |
| King Lear | 3,425 |
| A Doll's House | 2,535 |
| Macbeth | 2,497 |

Two results already established on this data: trauma and entropy are independent, pooled correlation minus 0.026, so they are genuinely separable state variables. The fragmentation and orchestration scalars correlate at 0.919, so they are one variable rather than two.

## The bias classification

`01_THEORY/03_unified/16_Vol_15_Cognitive_Bias_Atlas.md` is canonical: four domains of distortion, thirty nodes, CB-001 to CB-030. Category A Perception the Filter, Category B Decision the Calculator, Category C Social the Tribe, Category D Memory the Story. Those thirty correspond one to one with the thirty bias-to-music mappings in the application's reference data.

## Related

OT engineering material that used to live inside this archive is now at `../OT`, with its own index.

## S3, added 13 September 2026

- `08_PAPERS/S3-mapping-phi.md` MPN-S3, the mapping from psychological state to musical material
- `08_PAPERS/ARBITRATION-S3.md` The S3 gate ruling: accept with eleven conditions, plus a length addendum
- `08_PAPERS/MPN-S3-AMENDMENTS.md` Replacement text for A4, A8 and B4 and two commensurability-audit corrections
- `08_PAPERS/MPN-NOTE-03-implementation-audit.md` The chains and the search method behind S3 sections 2.1, 2.3 and 2.4
- `05_DATA/03_generators/s3_frames.py` The single correct reader of the 232-frame library; six other scripts call it
- `05_DATA/03_generators/S3-GENERATORS-README.md` How to run the S3 generators and what each establishes

## S4, added 13 September 2026

- `08_PAPERS/S4-application.md` MPN-S4, the application: what it implements, what it stubs, what is dead, and what the seven score files actually are
- `08_PAPERS/ARBITRATION-S4.md` The S4 gate ruling: accept with six conditions, and the ruling that closes the four-paper series
- `08_PAPERS/MPN-S4-AMENDMENTS.md` Corrections to S1 arising from S4, with replacement text for the frame-provenance passages and the four moved figures
- `05_DATA/03_generators/s4_score_provenance.py` What text the seven score files contain: the contents-block test, the anthology spans and the licence blocks
- `05_DATA/03_generators/s4_frame_provenance.py` Which frame-library state values are the author's literals and which the analyser computes
- `05_DATA/03_generators/s4_dead_paths.py` Every public definition in `mpn_engine` and its use sites, from the parse tree
- `05_DATA/03_generators/s4_leitmotif.py` The leitmotif transformations, run under node, and the selector's reachable outputs
- `05_DATA/03_generators/s4_score_laws.py` The six computed columns reconstructed from the engine's own formulae
- `05_DATA/03_generators/s4_two_engines.py` The Conductor and `mpn_engine` compared, with the corrections S4 revision 2 forced
- `05_DATA/03_generators/s4_determinism.py` The keyed generator, and where the 54 unseeded draws are
- `05_DATA/03_generators/s4_claims_check.py` The eleven deconstruction findings rechecked against the pinned tree
- `05_DATA/03_generators/s4_scores.py` The column census over the seven score files

S2 carries a post-acceptance correction of 13 September 2026 in its metadata, applying the S3 amendments' section 3 to its section 4.4 figures.

One obligation is open across papers: S1 has not yet been revised to revision 4 from `MPN-S4-AMENDMENTS.md`, and should be before it is next cited. The full list of cross-paper obligations is section 6 of `08_PAPERS/ARBITRATION-S4.md`.

## The PRD, added 13 September 2026

The four papers audited a theory and two proofs of concept. This is the first document in the programme that specifies what to build.

- `08_PAPERS/PRD-MPN-THERAPY.md` MPN-PRD-01, the instrument: the two-node case of the MPN framework, rated rather than inferred. Draft 6, under the scope ruling of 13 September 2026. Section 7.6 is the timbre channel, live because a synthetic character's DISC profile is assigned; section 14's first open question is answered by MPN-DESIGN-01 section 11
- `05_DATA/03_generators/s5_salvage.py` The carry-over manifest of PRD section 9: nineteen artefacts, four ported, seven repaired, two rewritten, six dropped, each with its warrant, asserting that every path it names exists

The PRD locks four decisions of the author's: a non-device practitioner tool, dual input with therapist override, a rebuild with the proofs of concept as reference, and every quantity renamed to what it measures. It puts `mpn_engine` outside the programme, which resolves S4-2 on its second branch, and it inherits ARBITRATION-S3's bar on implementing any modal table until question 5a returns.

## The unified framework design, added 13 September 2026

The PRD specified one surface. This specifies the framework all of them sit on, and it went through the same four-reviewer gate the papers did.

- `08_PAPERS/DESIGN-UNIFIED-FRAMEWORK.md` MPN-DESIGN-01, one engine and four surfaces: dialogue decomposed into an interaction network and expressed as graph, score and sound. Revision 7, 56 decisions and 4 rejections logged. Revision 6 removed the regulatory apparatus built on a false premise; revision 7 specifies the six capabilities that premise had cut: the bias layer (section 5a), the DISC timbre channel (5b), the three-clef live score (6.2), participant mode (7.4), live capture (7.6) and an ungated Layer 3 (4.4)
- `05_DATA/03_generators/s6_bias_layer.py` The bias layer computed from the Atlas reconciliation: fourteen of thirty mappings naming no state coordinate, one writing to the mode channel A4 depends on, four collisions, the per-channel perturbation budgets, and the twenty-two by eight partition into frame-local and historical biases
- `05_DATA/03_generators/s6_timbre_capacity.py` The timbre channel's geometry and capacity: the reachable set is a rhombic dodecahedron of volume 2 and diameter 2, the mean fibre is 0.5 and the longest is the full diameter of DISC space, six is the channel's natural capacity, and the optimal six profiles are the six with two coordinates high and two low. Seeded
- `05_DATA/03_generators/s6_three_clef.py` The three-clef score's legibility measured on the 31,078 beats: dynamics changes on 4.5 per cent of beats, tempo on 32.2 and metre on 25.7; two staves cover between 8 and 69 per cent of a work; dyad churn runs 8.8 to 44.1 per cent while the busiest speaker sits in up to 87 per cent of active pairs
- `08_PAPERS/REVIEW-DESIGN-skeptic.md` STOP, 25 findings
- `08_PAPERS/REVIEW-DESIGN-constraints.md` REJECT, 16 findings, six of them blocking, each with its source
- `08_PAPERS/REVIEW-DESIGN-user.md` REVISE, 15 findings

Section 11 rules on the open question the PRD left: the human-rated Autonomy-to-register mapping survives, and Partner takes no dead band. Section 10a carries the implementation order, which builds the shared spine and the security programme first and ships nothing with a musical output until Ψ is specified and listener-tested.

## The author's five decisions of 15 September 2026

`08_PAPERS/DECISION-LOG-2026-09-15.md` records five decisions, all the author's, answering arbitration decisions 9.1, 9.2 and 9.6 and the two questions those opened.

**A.** Assertion B4 is amended. The between-stave clause is struck, so B4 is a per-stave channel capacity claim with no escape from its own budget. It is now easier to falsify, which is the point of it. Applied in `08_PAPERS/ASSERTIONS-REGISTER.md` and `08_PAPERS/S1-mckenney-lacan-theory.md`.

**B.** A named per-person comparison is permitted on a stave, on every surface. A persona may be an actor, a character in a play, a speaker in a podcast or any persona a score carries, and a score carries several, added and removed as the material requires.

**C.** Backchannel is a sixth Layer 1 measure, exercising the authority D64 reserved to the author. Two items that called a generator defective are withdrawn rather than completed, because the generator was right: MPN-S5's S5-8 and MPN-S6's EX-8, and S5-21 with them.

**D.** A backchannel is lexical on class A and timing-derived on classes B and C. One measure with two definitions carries two settings, so Layer 1 is six measures and six settings, and an output must declare which definition produced the number.

**E.** Expression is an N-persona surface. EX-R1 is restated: one interaction stave per persona, no state staves. The one-stave reading was an artefact of the design's two-speaker reference layout rather than a consequence of D70.

`08_PAPERS/MPN-NOTE-06-persona-scaling.md` computes what decision B costs, with `05_DATA/03_generators/s9_persona_scaling.py` and its output at `05_DATA/03_generators/S9-PERSONA-SCALING-OUTPUT.txt`. The per-stave oversubscription rises from 2.7x at two personas to 3.7x at fourteen and then flattens, so scaling makes the legibility problem wider rather than worse. The pair count is quadratic and reaches 91 at fourteen. And a score can grow one persona at a time without ever re-voicing anyone already on the page, at a cost of at most 13.4 per cent of timbre separation and nothing at all at casts of 2, 5, 6 and 14.
