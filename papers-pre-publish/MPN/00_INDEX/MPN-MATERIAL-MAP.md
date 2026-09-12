# MPN material map

Full inventory of `eigenia/papers-pre-publish/MPN`, built 2026-09-12. 304 files, 31 MB. Purpose: make everything in the folder findable and usable for the four-paper effort, and record what is readable from here and what is not.

## 1. The headline

**128 files are readable. 176 are Google Drive pointer stubs of 182 bytes containing only a document id.** Google-native documents never store content on disk, so the material is in your Drive and not in the folder. Every stub is catalogued with its id and a direct edit URL in `DRIVE-STUB-INDEX.csv`, written into the MPN folder alongside this map.

The entire bias corpus is in that unreadable set: all 45 files under `02_biases`, plus all 53 under `02.5_Personality_Frameworks`, 46 of 48 under `06_mckenney_lacan_unified_theory`, the whole `07_Lacanian_Reference_Library`, and the cyber use-case folders. The Google Drive connector in this session exposes only share, trash and update, with no read, so I cannot pull them. To bring them across: in Drive, select the folder and use Download, which converts Google Docs to .docx, or File then Download then Markdown for individual docs. Either lands real content in the folder and I can ingest it in one pass.

**The readable half contains something more valuable than I knew existed: seven fully generated scores for classic plays, 31,078 scored beats, with the source texts and the batch processor that made them.**

## 2. The corpus by function

### 2.1 The empirical asset: seven scored plays

`mckenney-lacan-calculus-2025-11-28/mckenney-lacan_music_10_scores_classics/`

| Play | Scored beats | Score file | Source text |
|:---|---:|:---|:---|
| Miss Julie | 6,897 | `MCKENNEY_LACAN_SCORE_MISS_JULIE.csv` | `miss_julie.txt` |
| The Cherry Orchard | 6,658 | `MCKENNEY_LACAN_SCORE_CHERRY_ORCHARD.csv` | `cherry_orchard.txt` |
| Oedipus Rex | 5,097 | `MCKENNEY_LACAN_SCORE_OEDIPUS_REX.csv` | `oedipus_rex.txt` |
| Hamlet | 3,969 | `MCKENNEY_LACAN_SCORE_HAMLET.csv` | `hamlet.txt` |
| King Lear | 3,425 | `MCKENNEY_LACAN_SCORE_KING_LEAR.csv` | `king_lear.txt` |
| A Doll's House | 2,535 | `MCKENNEY_LACAN_SCORE_A_DOLLS_HOUSE.csv` | `a_dolls_house.txt` |
| Macbeth | 2,497 | `MCKENNEY_LACAN_SCORE_MACBETH.csv` | `macbeth.txt` |
| Death of a Salesman | 32 | `GRAND_UNIFIED_SCORE_SALESMAN_COMPLETE.csv` plus beat CSVs | |

Every row carries: `BEAT, SPEAKER, TEXT, TRAUMA_R, ENTROPY_H, BASELINE_B, ARRHYTHMIA_α, NEO_RIEMANNIAN_OP, CLINICAL_HEALTH_SCORE`. The generator is `batch_process_classic_plays.py`, with `expand_salesman_score.py` and `generate_complete_salesman_score.py` beside it.

This is the dataset the assertions can be tested against. It replaces the 232 hand-annotated frames the earlier reviews were costed against, by two orders of magnitude.

### 2.2 Core theory: `mckenney-lacan-calculus-2025-11-28/05_mckenney-lacan_core/` (22 files)

The theorem and the calculus: `01_MCKENNEY_LACAN_THEOREM_UNIFIED`, `02_CALCULUS_OF_CRITICAL_SLOWING`, `05_PSYCHOMETRIC_TENSOR_DISC_BIG5`, `06_CRITICAL_SLOWING_DOWN_EARLY_WARNINGS`.

The dialogue and dialectic material, which is the Block B subject and which I had wrongly treated as unwritten: `03_TOPOLOGY_OF_DIAD_AND_TRIAD`, `04_LACANIAN_MIRROR_AND_GROUP_DYNAMICS`, `07_MUSICAL_SCORE_OF_INTERACTION`, `08_POLYPHONY_AND_DISSONANCE_IN_DIALOGUE`, `09_ADVERSARIAL_COUNTERPOINT_ATTACK_DEFEND`.

The dynamics: `03_ISING_DYNAMICS_FOR_OPINION_PROPAGATION`, `04_GRANOVETTER_THRESHOLDS_IN_ATTACK_CASCADES`, `05_BIFURCATION_THEORY_AND_CRISIS_DETECTION`, `06_SCHELLING_GRANOVETTER_TEAM_COMPOSITION`, `02_MATHEMATICAL_PHYSICS_OF_CYBER_EPIDEMICS`.

Implementation and roadmap: `07_NEO4J_IMPLEMENTATION_OF_PSYCHOHISTORY`, `08_NER11_GOLD_INTEGRATION_STRATEGY`, `09_AEON_DIGITAL_TWIN_SIMULATION_ENGINE`, `10_EXECUTIVE_SYNTHESIS_AND_ROADMAP`, `10_PRACTICAL_IMPLEMENTATION_CHEF_ORCHESTRATOR`, `00_MCKENNEY_LACAN_RESEARCH_PLAN`, `01_PSYCHOHISTORY_READINESS_MATRIX`, `05_PSYCHOHISTORY_DIAGRAMS_v3.0` (54 KB).

### 2.3 Mathematical primers: `01_Primer/` (10 files)

Multilinear algebra and tensors; topology and knot theory; Riemannian geometry and curvature; complex analysis and residues; abstract algebra and Galois; category theory and topoi; stochastic calculus and Ito; quantum mechanics and Hilbert space; statistical mechanics and entropy; number theory and modular forms. This is the S2 foundation, already written.

### 2.4 Applications and prediction

`02_Cycle Application/` (10 files): semantic web ontology, neural tensor PyTorch, quantum circuit Q#, biological encoding CRISPR, topological knot braiding, holographic AdS/CFT, game-theoretic Nash, thermodynamic phase space, category-theoretic schema, omega point.

`03_Predictive application/` (5 files): epidemic thresholds R0, Ising opinion dynamics, Granovetter cascades, bifurcation theory, critical slowing down as early warning.

### 2.5 Notation and engine

`mckenney-lacan_musical_notatoin/`: `musical_gnn_engine.py`, `symphonic_calculus_score.json` (57 KB), `SYMPHONIC_CALCULUS_SWOT_REPORT.md`. Also at the calculus root: `MUSICAL_CALCULUS_NOTATION_SYSTEM.md`.

`neo4j-schema/`: `01_MCKENNEY_LACAN_NEO4J_SCHEMA.cypher` (23 KB), `02_MCKENNEY_LACAN_CYPHER_LIBRARY.cypher` (26 KB), `03_MCKENNEY_LACAN_GAP_ANALYSIS.md`, `04_MCKENNEY_LACAN_UNIFIED_API.yaml` (36 KB).

`Music/`: `Musica_integrated_framework.mc` (17 KB), `Musica-psychometric-foundations_the_the_Clef`.

### 2.6 Background theory

`Background_theory/`: four documents at about 6 MB each in .docx, with markdown equivalents in the scores folder: *Calculus, Psychoanalysis, and Personality Theory* (28 KB md), *GNN Music Theory Dialogue Simulation* (41 KB md), *Lacan, Calculus, and Subject Formation* (38 KB md), *Simulating Calculus with GGNN* (32 KB md). Plus *The Loman Operator: A Topological Score of Act I* and `MCKENNEY_LACAN_SCORES_GLOSSARY_AND_BRIEFING.md` (13 KB).

### 2.7 In Drive only, not readable from here (176 files)

| Folder | Files | What it is |
|:---|---:|:---|
| `02.5_Personality_Frameworks` | 53 | Personality framework corpus |
| `06_mckenney_lacan_unified_theory` | 46 | Unified theory documents |
| `02_biases/Unfiied_Framework_Biases_Mckenney/Biases_individual` | 45 | The bias corpus |
| `01_Use_case_cyber` and subfolders | 16 | Corporate personality assessments, psychohistory demographics |
| `10_References_antigravity` | 7 | Web application references |
| `07_Lacanian_Reference_Library` | 6 | Lacanian reference library |
| `Music` | 3 | Music documents |

The bias filenames alone name 41 distinct biases, which is already more than any list in the code: availability heuristic, base rate fallacy, hindsight, in-group, anchoring, fundamental attribution error, sunk cost, framing effect, status quo, representativeness, confirmation, overconfidence, attentional, authority, bandwagon, change blindness, cocktail party effect, conjunction fallacy, cryptomnesia, false consensus, false memory, frequency illusion, gambler's fallacy, groupthink, hot hand fallacy, inattentional blindness, peak-end rule, pluralistic ignorance, regression to mean, rosy retrospection, sample size neglect, selective attention, shared information, just-world hypothesis, out-group homogeneity, self-serving, source confusion, system justification, plus behavioural economics, insider threat and social engineering treatments. The folder also holds an `EXECUTIVE_SUMMARY` and a `COMPLETION_REPORT`.

## 3. First result from the data

The two cheapest assertions in the register were tested directly on the seven score files, pooled n = 31,078.

**A5 holds.** Trauma and entropy are independent: pooled correlation −0.026, and per play between −0.20 for The Cherry Orchard and +0.14 for Miss Julie. The claim that these are separable state variables is confirmed on your own corpus, at a scale that settles it.

**A8 fails.** The fragmentation scalar and the orchestration scalar correlate at 0.919 pooled, ranging from 0.867 for The Cherry Orchard to 0.951 for Hamlet. They are one variable.

The two results are the same result. Because trauma and entropy are independent, two convex combinations of them with weights as close as 0.6/0.4 and 0.7/0.3 must be near-collinear; the independence is what forces the collinearity. The earlier finding predicted this and the data now demonstrates it rather than arguing it.

**A third observation, not previously flagged.** Entropy takes only 14 distinct values across 31,078 beats, with a standard deviation of 0.102 and a floor at 0.30, while trauma takes 93 distinct values with a standard deviation of 0.232. Entropy as currently generated is close to a categorical variable and carries much less information than trauma. That is a property of the generator rather than of the theory, and it bears on how much work H can do in any mapping that consumes it.

## 4. What this changes

The play-run programme is not a future exercise. It has been run, at 31,078 beats, and the output is on disk with its source texts and its generator.

The Block B dialogue material exists in your own core folder and I treated it as unwritten. `08_POLYPHONY_AND_DISSONANCE_IN_DIALOGUE`, `09_ADVERSARIAL_COUNTERPOINT_ATTACK_DEFEND` and `03_TOPOLOGY_OF_DIAD_AND_TRIAD` are the sources the re-drafted B1 to B5 should have been built from. That re-draft should be rebuilt on them.

The mathematics paper has its foundation in the ten primers rather than needing to be assembled from the code.

The bias classification cannot be settled until the 45 Drive documents are exported. The 41 names recoverable from the filenames are the starting inventory, and `DRIVE-STUB-INDEX.csv` carries the ids to reach the rest.

## 5. Index files written into your folder

`DRIVE-STUB-INDEX.csv` at the MPN root: 176 rows of relative path, folder, title, Google document id and a direct edit URL, so the unreadable material can be exported or opened without hunting for it.
