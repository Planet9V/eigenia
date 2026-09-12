# MPN folder index

Reorganised 2026-09-12. 303 files in the live tree, 32 MB. Nothing was deleted and nothing was edited; every operation was a copy or a move, verified by hashing every file before and after. Zero content hashes were lost.

## Where things are

| Folder | What it holds |
|:---|:---|
| `00_INDEX` | This file, the before and after manifests, `DRIVE-STUB-INDEX.csv` |
| `01_THEORY/01_core` | The 22 core calculus documents, including the unified theorem, the dyad and triad topology, polyphony and dissonance in dialogue, adversarial counterpoint |
| `01_THEORY/02_primers` | The 10 mathematical primers: tensors, knot theory, Riemannian geometry, complex analysis, Galois, category theory, Ito, Hilbert, statistical mechanics, modular forms |
| `01_THEORY/03_unified` | The Unified Psychometric Field Theory volumes, including Volume XV, the Cognitive Bias Atlas, plus the working chapters and the critical review |
| `01_THEORY/04_background` | The four background works, markdown and docx, and the Loman Operator score |
| `02_BIASES` | The 45 NER-annotated bias documents, the executive summary and the completion report |
| `03_PERSONALITY` | The 53 personality framework documents |
| `04_NOTATION_ENGINE` | Notation system, GNN engine, symphonic score JSON, Neo4j schema and Cypher library, unified API spec, psychometrics API, the Music framework documents |
| `05_DATA/01_scores` | The seven generated play scores and the Salesman beats |
| `05_DATA/02_source_texts` | The play texts those scores were generated from |
| `05_DATA/03_generators` | `batch_process_classic_plays.py` and the Salesman scripts |
| `06_APPLICATIONS` | Cycle applications, predictive applications, the cyber use cases |
| `07_LACANIAN_REFERENCE` | Glossary, library of works, mathemes and topology, calculus 4.0, use cases |
| `08_PAPERS` | The MPN paper series, S1, citation ledgers, QA reports and reviews |
| `09_SNAPSHOTS` | `mckenney_lacan_dec_12_2025_Archive`, kept whole and unmodified as the dated record |
| `_attic` | Superseded duplicate copies. Delete when satisfied; nothing here is unique |

## The bias classification, as settled by your own documents

`01_THEORY/03_unified/16_Vol_15_Cognitive_Bias_Atlas.md` is canonical. Four domains of distortion, thirty nodes, CB-001 to CB-030.

Category A, Perception, the Filter. Category B, Decision, the Calculator. Category C, Social, the Tribe. Category D, Memory, the Story.

Those thirty nodes correspond one to one with the thirty bias-to-music mappings `bias-001` to `bias-030` in the application's reference data. The other counts in circulation are subsets or implementation artefacts: 28 is what the NER corpus has annotated so far, 17 is the three security tiers of RSCH-34, 12 is the dissertation's list.

The NER corpus in `02_BIASES` carries four tag types: 28 distinct cognitive biases in 658 occurrences, 122 personality traits, 43 insider indicators, 25 social engineering techniques.

## Two things needing your attention

**A secrets file.** `09_SNAPSHOTS/mckenney_lacan_dec_12_2025_Archive/api-keys.txt`. I did not open it or move it. If those keys are live, rotate them, and keep the file out of anything that reaches a repository.

**Eight filenames carry different content in different places.** These were deliberately not touched. Three are worth resolving: `00_Unified_Theory_Master_Index.md`, `02_Vol_II_Kinematics.md` and `91_Archive_Master_Syllabus.md`, each differing between `06_mckenney_lacan_unified_theory` and its `copy` variant inside the snapshot. The others are benign, such as `README.md` appearing in unrelated folders.

**Not MPN material** remains inside the snapshot: the IEC 62443 and TS 50701 work, the CRL workshop days, the CSET reference data, and a Blender training pack of 15 blend, 14 obj, 14 mtl and 14 fbx files. Around 106 distinct files. It is safe where it is, and it belongs with your OT security work when you want to move it.
