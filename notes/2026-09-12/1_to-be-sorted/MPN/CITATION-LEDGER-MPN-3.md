# Citation ledger: MPN-3 (Engine)

Paper: `/home/claude/mpn-drafts/MPN-3-engine.md`. Every `[n]` used in the paper is listed with the verification status copied from the research ledgers (`q2-sonification-science.md`, `q3-alarm-standards-human-factors.md`, `q4-psychometrics.md`, `q7-generative-music-ml.md`, `q9-legal-ethics-precedents.md`), from the corpus, or from the repo deconstruction (`/home/claude/mpn-analysis/repo-deconstruction.md`). Status vocabulary: VERIFIED (record or content confirmed on a fetched page), VERIFIED-LISTING (existence, title, venue and URL confirmed from a search listing; content not read), UNVERIFIED-canonical (standard work cited without page numbers, coefficients or quotations beyond what the ledger lists), corpus (Eigenia working paper or series paper), code (repo path:line, from the deconstruction). Where the paper quotes a figure or a sentence, the row says which ledger section supports it. Bibliographic details are transcribed from the ledgers' Sources lists and nothing beyond them was added.

Code citations (`mpn-conductor-standalone:path:line`) are not numbered references; every one in the paper is transcribed from the deconstruction and is listed in the second table below.

## Numbered references

| [n] | Short reference | Status | Ledger source | Notes on what the paper takes from it |
|:--|:---|:---|:---|:---|
| 1 | Bradner, RFC 2119 | corpus convention | Series brief; WG-05 exemplar | Normative keywords only |
| 2 | Creative Commons, CC BY 4.0 | corpus convention | WG-05 exemplar | Licence line only |
| 3 | McKenney, MPN-1 (Paper 1 of this series) | corpus (series) | `/home/claude/mpn-drafts/MPN-1-foundations.md` | F-1 to F-14; F-12 and F-13 cited by number; psychometric standing of the 57-D vector (MPN-1 §6.4); corrections row 10 (lead-time retraction) |
| 4 | McKenney, MPN-2 (Paper 2 of this series) | corpus (series) | `/home/claude/mpn-drafts/MPN-2-notation.md` | N-1 to N-27, including N-27 on `delta` and `p_sim`; state vector (§2, thirteen rows, two mode-restricted); indices and mapping table (§3); P/L/R definitions (§3.6); tension index and alert rule (§4); flood machine (§5); frame tables (§8); listener study (§9) |
| 5 | mpn-conductor-standalone repository | code | Deconstruction §1.1 (36 commits, 2026-01-01 to 2026-02-06, MIT, not shallow) | Repository as object of audit; URL given once in the metadata table per brief rule 7 |
| 6 | Eigenia, musical-psychometric-notation (MPN v1) | corpus | WG-03-ML-Musical-Psychometric-Notation.md; deconstruction §5.3 (RSCH-39 §5.2) | The 22-minute lead-time claim, cited only as retracted |
| 7 | Regulation (EU) 2024/1689, Art. 3(34), Art. 5(1)(f), Art. 113, Recitals 18, 44 | VERIFIED | q9 §1 and Sources | Prohibition; 2 Feb 2025 application; biometric definition |
| 8 | Commission Guidelines C(2025) 5053 final, paras 40-47 | VERIFIED | q9 Sources; q9 "legitimately say" and Gaps | Fixed human-authored rule set arguably not an AI system; the paper says "on the Commission's own reading" and states that no authority has tested the position (q9 Gaps) |
| 9 | Commission Guidelines C(2025) 5052 final, Section 7 | VERIFIED | q9 Sources; q9 "legitimately say" | Broad reading of "emotions" (stress-based anxiety, emotional arousal, burnout, team emotional tone) |
| 10 | GDPR 2016/679, Art. 4(15), Art. 9, Recital 35 | VERIFIED | q9 Sources | Physiological data as health data |
| 11 | Wet op de ondernemingsraden, Art. 27(1)(k), (l), 27(4) | VERIFIED | q9 Sources; "legitimately say" | Personnel-monitoring facility needs works-council consent; "no export to HR systems" design rule from q9 |
| 12 | Copet et al. 2023, MusicGen, NeurIPS 2023, arXiv 2306.05284 | VERIFIED | q7 §1 | Architecture (single-stage transformer, 4 codebooks at 50 Hz, cross-attention); 20,000 h training data; evaluation protocol (FAD, KL, CLAP; OVL/REL 1-100; at least 5 raters; CrowdMOS; loudness normalisation); 84.81 ± 0.95; chroma pathway bottlenecked; CLAP tested as conditioner; "extension, not a replication" is the ledger's own wording |
| 13 | Cideron et al. 2024, MusicRL, arXiv 2402.04229 | VERIFIED | q7 §4 | 300,000 pairwise preferences from deployed users; two reward models with selected raters; finding that adherence and quality account for only part of preference |
| 14 | Majumder et al. 2024, Tango 2, arXiv 2404.09956 | VERIFIED (abstract; author list not displayed by the fetch) | q7 §4, Gaps | Diffusion-DPO on synthetic preference pairs; gains over Tango and AudioLDM 2; no pair count quoted (q7 Gaps) |
| 15 | Hung et al. 2021, EMOPIA, ISMIR 2021 | VERIFIED (ISMIR PDF fetched) | q7 §6, §7 | 1,087 clips, 387 songs, ~11 h, four quadrants, four annotators, 2.5-month campaign; 25-participant listening test, 12 samples each, 5-point scales; the systems EMOPIA reviews condition on 2-4 dimensions (the paper hedges to those systems, per QA error 8) |
| 16 | ylacombe, musicgen-dreamboothing (GitHub README) | VERIFIED (fetched) | q7 §3 | 27-minute dataset; under 15 minutes on one accelerator (the README names the accelerator model; the paper does not); no metrics reported |
| 17 | Hu et al. 2021, LoRA, ICLR 2022, arXiv 2106.09685 | UNVERIFIED-canonical | q7 §3, Sources | Name of the adaptation method only |
| 18 | Rafailov et al. 2023, DPO, NeurIPS 2023, arXiv 2305.18290 | UNVERIFIED-canonical | q7 §4, Sources | Name of the method only |
| 19 | Wallace et al. 2023/2024, Diffusion-DPO, CVPR 2024, arXiv 2311.12908 | UNVERIFIED-canonical (its use by Tango 2 is VERIFIED on the Tango 2 abstract page) | q7 §4 | Name of the loss Tango 2 uses |
| 20 | Wu et al. 2023, LAION-CLAP, ICASSP 2023, arXiv 2211.06687 | UNVERIFIED-canonical | q7 §5, Sources | CLAP as joint text-audio embedding; cosine alignment definition per q7 §5 |
| 21 | Dash and Agres 2024, ACM Computing Surveys, DOI 10.1145/3672554 | VERIFIED-LISTING | q7 §8 | Survey of affective music generation; positioning only, no content quoted |
| 22 | Williams et al. 2015, Psychology of Music, DOI 10.1177/0305735614543282 | VERIFIED-LISTING (venue per DOI; volume/issue not verified, so none given) | q7 §8 | Survey of affect in algorithmic composition; positioning only |
| 23 | Williams et al. 2017, ACM TAP, DOI 10.1145/3059005 | VERIFIED-LISTING | q7 §8 | Calibration against 2-D affect targets; positioning only |
| 24 | Ferreira and Whitehead 2019, VGMIDI, ISMIR 2019 | UNVERIFIED (the 95-sample figure is VERIFIED via the EMOPIA paper's description) | q7 §6 | "Its predecessor used 95 clips" |
| 25 | Benchmarking music generation models and metrics via human preference studies, ICASSP 2025 | VERIFIED-LISTING | q7 §5 | Existence only; the paper states that it was not read and quotes no correlation figure |
| 26 | IEC 62682:2022 | VERIFIED (webstore record, foreword, contents) | q3 §1-2 | Alarm philosophy and lifecycle; management of change; no table contents quoted |
| 27 | ANSI/ISA-18.2-2016 | UNVERIFIED (not fetched) | q3 §1 | Cited alongside IEC 62682 as the aligned US standard; no benchmark figures quoted |
| 28 | HSE CHIS6, Better alarm handling, 2000 | VERIFIED | q3 §1, §3 | "no more than one every ten minutes"; "no more than ten displayed in the first ten minutes"; "275 alarms" in "the last 11 minutes" |
| 29 | EEMUA 191 edition 4, November 2024 | VERIFIED existence only | q3 §3 | Cited as the current edition; no content quoted |
| 30 | HSE COMAH case study, Milford Haven 1994 | VERIFIED | q3 §3 | "Excessive number of alarms in emergency situation reduced effectiveness of operator response" (paraphrased) |
| 31 | ISO 7731:2003 | VERIFIED (iso.org title) | q2 §4 | Audibility requirements for danger signals; the paper states that no numeric requirement is quoted because none was verified |
| 32 | IEC 60601-1-8 (2006; Amd 1 2012; Amd 2 2020) | VERIFIED existence; amendment content UNVERIFIED | q2 §4 | 2006 melodic signals; 2020 amendment introduced new alarm sounds (only as far as [34] supports) |
| 33 | Momtahan, Hétu, Tansley 1993, Ergonomics | UNVERIFIED-canonical | q2 §4 | Staff identified only a minority of alarms; masking; no percentages quoted |
| 34 | AAMI News, "Updated IEC 60601-1-8 breaks new ground in development of alarm sounds" | VERIFIED title (fetch 403) | q2 §4 | Only that the amendment introduced a new set of alarm sounds |
| 35 | Loeb and Fitch 2002, Anesth Analg 94(2) | VERIFIED (PubMed abstract fetched) | q2 §3, §6 | Six variables in two streams; fourteen residents; every event detected; 10.4 s combined, 12.8 s visual, 13.0 s auditory; 60% vs 88% identification |
| 36 | Watson and Sanderson 2004, Human Factors 46(3) | VERIFIED (record) | q2 §3 | Eyes-free respiratory monitoring and task time-sharing alongside the oximeter tone; no effect sizes quoted |
| 37 | Bregman 1990, Auditory Scene Analysis | UNVERIFIED-canonical | q2 §6 | Stream segregation by frequency, timbre, location, onset, regularity |
| 38 | Gilfix and Couch 2000, Peep, USENIX LISA | VERIFIED (fetched) | q2 §5 | Crickets stop when the server dies (paraphrase of the fetched quotation) |
| 39 | Vickers 2011, Sonification Handbook ch. 18 | VERIFIED (fetched) | q2 §5 | No controlled study of continuous sonification in an industrial control room; no capacity figure in the literature (q2 §6 "legitimately say") |
| 40 | Wickens 2002, Theoretical Issues in Ergonomics Science 3(2) | UNVERIFIED-canonical | q3 §7 | Reduced but non-zero cross-modal cost; interference with alarm sounds and speech (ledger's interpretation, cited as theory) |
| 41 | Endsley 1995, Human Factors 37(1) | UNVERIFIED-canonical | q3 §6 | Situation-awareness probes as validation method |
| 42 | Hart and Staveland 1988, NASA-TLX | UNVERIFIED-canonical | q3 §8 | Task load index as workload criterion |
| 43 | ISO 11064-7:2006 | VERIFIED existence only | q3 §4 | Control-centre evaluation framework |
| 44 | IEC 62443-2-1:2024 | VERIFIED existence only; contents UNVERIFIED | q3 §9 and Gaps | The paper cites no clause and says so; general asset-owner security-programme obligations only |
| 45 | Crans, Fiore, Satyendra 2009, Amer. Math. Monthly 116(6) | corpus (carried from MPN-2 [53], where it rests on q5) | MPN-2 §3.6 | Dihedral group of order 24; simple transitivity; L and R generate; P = RLRLRLR |
| 46 | Cohn 1997, Journal of Music Theory 41(1) | corpus (carried from MPN-2 [52]) | MPN-2 §3.6 | Parsimonious voice leading; involutions preserving two common tones |
| 47 | Barrett et al. 2019, PSPI 20(1) | VERIFIED | q4 §6 and Sources; q9 | Physiology indexes arousal and load, not emotion; no quotation used |
| 48 | Article 29 Working Party, Opinion 2/2017, WP 249 | VERIFIED | q9 Sources; "legitimately say" | Guidance on data processing at work; cited for the personnel-monitoring consequence of an HR export path |
| 49 | Gadalla, Nikoletseas, Amazonas 2026, Frontiers in Psychology | corpus (carried from MPN-1 [39] and MPN-2 [67]; MPN-1 ledger drew on q8) | MPN-1 §3.4 | Predecessor for any discourse scoring (F-13), cited in E-24 only |
| 50 | Sendelbach and Funk 2013, AACN Advanced Critical Care | UNVERIFIED-canonical | q2 §4 | Alarm fatigue as a documented clinical phenomenon; no figures quoted |

## Code citations transcribed from the deconstruction

Every `path:line` in the paper was transcribed from `/home/claude/mpn-analysis/repo-deconstruction.md` and was then opened at the cited line by the independent QA pass recorded in `/home/claude/mpn-drafts/QA-MPN-3.md` (73 citations: 55 confirmed as first written, 8 off by a few lines, 6 overstated in wording, 4 false as worded; every cited file exists). The paper now carries the corrected lines and wording listed after the table, and the writer re-checked each correction against the clone before applying it. The deconstruction section that carries each citation is given so the chain can be followed in both directions.

| Paper section | Path:line cited | Deconstruction section |
|:--|:---|:---|
| 1, 3.6 | `docs/MCKENNEY_LACAN_PHD_REVIEW_CRITIQUE.md:24, 24-29, 542-544` (a review of three theory documents, not of the code) | §0.10, §5.3, §9.2; corrected per QA rows 2-3 |
| 2.1 | `package.json:10-58`; `literary_data.ts:16, 24, 30`; `page.tsx:348-349`; `psychometric_calculus.ts:142-144, 236-250`; `route.ts:136-145, 251`; `score_orchestrator.ts:228-429, 274`; `GeniusComposer.ts:147-383, 351-362, 371`; `leitmotif_generator.ts:183-186`; `ConductorScoreVexFlow.tsx:131-134`; `playback_engine.ts`; `midi_writer.ts:112-160`; `audio_exporter.ts:94-150`; `score_exporter.ts:390-590` | §1.1, §2.4, §4.1 |
| 2.2 | `server_v2.py:104, 211-221, 233-259, 261-286, 305-314, 329-330, 380-414, 427-430`; `v2_endpoint.py:24-44, 80, 82-94, 101-134`; `export_endpoint.py:350-358, 452-462, 469-484, 490-499`; `generate_music.py:75-100` | §4.2 |
| 2.3 (table and text) | `mckenney_lacan_calculus.py:58-90, 103-162, 165-184, 191-200, 226-253, 290-384, 302-306, 411-416, 451-454`; `02_BORROMEAN_TOPOLOGY.md:80, 230`; `implementation-mapping/page.tsx:208`; `page.tsx:356, 360`; `10_CORE_EQUATIONS.md:285, 296-320`; `generate_synthetic_pairs.py:23-30`; `server_v2.py:223-227, 231`; `create_octuple_training_data.py:53`; `RSCH-39…md:143`; `tonnetz.py:98, 104-107, 150`; `test_tonnetz.py:74-80, 79`; `mpn_reference_lookup.ts:150-178`; `psychometric_calculus.test.ts:119-137`; `mpn_calculus.py:135-165` | §3.1-3.9 |
| 2.4 | `projector.py:82-150, 134`; `test_all_modules.py:544-552`; `musicgen_lora.py:124-141`; `mckenney_lacan_calculus.py:25-51` | §0.6, §2.1, §2.2 |
| 3.1 | `generate_synthetic_pairs.py`; `run_training_pipeline.py:153-161, 204-216`; `checkpoint-17250/trainer_state.json`; `PHASE_AUDIT_COMPLETE.md:92-94`; `.gitignore:44-49`; `emopia_loader.py:38-70`; `logs/emopia_download.log:636` | §0.2, §4.3 |
| 3.2 | `skeleton_dataset.jsonl`; `llm_labeler.py:49-50`; `silver_labels/*.json`; `train_planner.jsonl`; `train_dpo.jsonl`; `train_performance.jsonl`; `lora_planner/checkpoint-15/trainer_state.json`; `dpo_planner/checkpoint-15/trainer_state.json`; `create_dpo_dataset.py:37-45`; `output/cyborg_skeleton.txt` | §0.3, §0.4, §4.3 |
| 3.3 | `train_performance.py:138-141, 146`; `lora_performance/adapter_config.json`; `README.md:175-182`; `train/train_dpo.py:55-65`; `ml/psychoscore_v2/README.md:20` | §0.5, §4.3 |
| 3.4 | `wav2vec_encoder.py:57-64`; `personality_detector.py:71-86`; `fusion_module.py:97-114`; `psychometric_regressor.py:5, 57-58`; `group_gnn.py:210-215`; `download_high_fidelity.py:79-89, 208-225`; `README.md:74-77` | §0.7, §6 |
| 3.5 | `README.md:8, 328-336`; `PHASE_AUDIT_COMPLETE.md:117-139, 389-401, 552-561`; `test-reports/test-run-20260205-102328.log`; `test-results/.last-run.json`; `test_v2_endpoint.py:12-14`; `RSCH-39…md:485-494`; `ab-test/page.tsx:14, 22` | §0.8, §0.9, §1.4, §5.1, §5.3, §7.2 |
| 4.2, 4.4, 4.5, 5.2, 5.3, 5.5 | `mckenney_lacan_calculus.py:25-51`; `score_orchestrator.ts:228-429`; `psychometric_calculus.ts:203-217`; `server_v2.py:233-259`; `create_dpo_dataset.py:37-45`; `v2_endpoint.py:101-134`; `calculate_fad.py`; `ab-test/page.tsx:14` | §2.2, §3.4, §4.1, §4.2, §7.2 |
| 7.1, 7.3 | `docker-compose.yml:26, 68-71`; `ml/ace_step` gitlink (mode 160000, no `.gitmodules`); commits `144c909`, `b9a6a01`; `CLAUDE.md:1-40`; `.claude-flow/`; `claude-swarm/`; `tonnetz.py:150`; `README.md:175-182`; `mckenney_lacan_appliced_2025_11_19/README.md:9, 139`; `DATA_SOURCES.md:26`; `package.json:3, 18-21, 30, 32, 35, 41, 44, 45`; `export_endpoint.py:350-358, 452-484` | §0.12, §1.1, §1.3, §1.5, §7.3, §8 |
| 8.1, 8.2 | `mpn_reference_lookup.ts:150-178`; `tonnetz.py:104-107`; `test_tonnetz.py:74-80` | §3.1, §3.7 |

### Corrections applied after the QA pass

| QA error | Paper location | Correction applied |
|:--|:---|:---|
| 1 (HIGH) | §8.2 | The standalone engine's L is an involution; the paper now says so and states that it fails the common-tone and 24-element group tests |
| 2 (HIGH) | §2.3 table row and text; §8.1 | The TypeScript dynamics table is monotone; described as collapsing six tenths of the range to one value with jumps of 42 and 46; §8.1 now specifies coverage and continuity tests alongside monotonicity |
| 3 | §3.2 | Two of ten silver labels begin "The error message suggests"; all ten openers now quoted by count |
| 4 | §3.1 | EMOPIA log records 1,084 MIDI files extracted (`emopia_download.log:636`); "1,078" removed |
| 5 | §1, §3.6 | Critique file cited at line 24 and 24-29 (was 20 and 18-26), at 542-544 (was 540-545); the file is described as a review of three theory documents, not of the code |
| 6 | §4.2, §4.7 E-3 and E-4, diagram 2 | Operational input is the channels admissible in operational mode (excludes `delta`, `p_sim`); E-4 admits those two channels and binds N-27; N-1 through N-27 |
| 7 | §7.1, checklist row 3 | Commit `b9a6a01` described as a checkpoint-tokenizer and data dump |
| 8 | §5.1, budget table | EMOPIA generalisation hedged to the systems it reviews |
| 9 | §2.1 | MIDI writer and MP3 exporter described as implemented without a direct test |
| 10 | §2.3 table | Conductor page's `20 + 107 tau` (`page.tsx:359`) recorded as a fourth velocity rule |
| 11 | §2.2 | `/generate-v2/` attempts the adapter load (`v2_endpoint.py:82-94`) before serving stock weights |
| 12 | §7.1, checklist row 5 | `ml/ace_step` described as an orphaned submodule gitlink with no `.gitmodules` |
| 13 | §3.3, §7.1, budget table, checklist row 4 | "133-byte" replaced by "about 130 bytes"; sixteen weight files |
| 14 | checklist row 13 | `package.json` lines replaced by QA row 72's list |
| 15 | §2.1, §2.2, §2.3, §7.1 | `literary_data.ts:24, 30`; `server_v2.py:305-314, 329-330, 380-414, 427-430`; `create_octuple_training_data.py:53`; `docker-compose.yml:68-71` |
| 16 | §3.4 | RAVDESS table consumed by the download script whose records nothing else reads (`download_high_fidelity.py:79-89, 208-225`) |
| 17 | diagram 3 | Mute edges from all four states; unmute edges to ambient and flood; accDescr updated |
| 18 | this ledger | Judgement-call bullet on the DOI corrected; "none verified" replaced by the QA statement above |

The QA report's optional suggestion that `emopia_loader.py:40, 66` defines `'trauma'` twice in the Q1 mapping was checked against the clone and not adopted: line 40 is Q1's `trauma` key and line 66 is Q4's, one key per quadrant.

## Judgement calls recorded for the checker

- The non-resolving DOI in the theory folder's README is written as a Zenodo-prefixed DOI (`10.5281/...`) in section 7.1 and never reproduced in full, since its suffix contains a name the series does not print; the deconstruction (§5.3, §7.3) holds the full string for the remediation.
- The musicgen-dreamboothing README names the accelerator model; the paper writes "one accelerator" to avoid a vendor product name, and the figure is unchanged.
- "Two-dimensional conditioner" as the first milestone is the q7 ledger's own recommendation ("legitimately say"), not a fetched claim.
- The proposal to construct preference pairs from conforming versus reversed renderings of the same frame table is the working group's own design, labelled as such in section 5.2.
- The statement that a fixed rule set is a visualisation system rather than an AI system is presented as the Commission's reading, with q9's caveat that no authority has tested it.
