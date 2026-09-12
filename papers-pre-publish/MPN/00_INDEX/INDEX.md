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
