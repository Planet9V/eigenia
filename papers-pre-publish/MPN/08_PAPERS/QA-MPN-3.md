# QA report: MPN-3 (Engine and evidence)

Reviewer: independent adversarial pass, 2026-09-12. Paper: `/home/claude/mpn-drafts/MPN-3-engine.md` (419 lines). Ledger: `/home/claude/mpn-drafts/CITATION-LEDGER-MPN-3.md`. Repository: `/home/claude/mpn-conductor-standalone` (read-only; one trivial Python import executed to test the L operation, everything else static reading, `git log`, `ls`, `grep`, `wc`).

Method: every `path:line` in the paper was opened at the cited line. Counts (commits, tests, wiki pages, frames, plays, jsonl lines, LFS pointers) were recomputed from the clone. Seven external facts were established from primary sources (arXiv, ISMIR archive, GitHub, IEC webstore listing, Commission document) before comparing with the paper. Requirements were cross-read against MPN-2 section 7 and MPN-1 section 7.

## 1. Code citation table

Status vocabulary: CONFIRMED (claim true at the cited line), WRONG LINE (claim true, line off; correct line given), CLAIM FALSE (claim not supported by the file), OVERSTATED (true in substance, wording goes beyond the file), FILE MISSING.

| # | Paper line | Citation | Claim | Status | Note |
|:--|:--|:---|:---|:---|:---|
| 1 | 9, 373 | repository metadata | 36 commits, 2026-01-01 to 2026-02-06 | CONFIRMED | `git log` gives 36; first c055474 2026-01-01, last 28c04ec 2026-02-06; not shallow |
| 2 | 15, 112 | `docs/MCKENNEY_LACAN_PHD_REVIEW_CRITIQUE.md:20` and `:18-26` | records "Zero empirical validation"; findings list | WRONG LINE | The quote is at line 24; the six findings occupy lines 24-29. Line 20 is the executive-summary opener. Same wrong line is carried in MPN-1 line 330. Also note: the file is a review of three theory documents ("The Calculus of the Subject", the GNN paper, the Codex), dated February 4, 2026 (line 5); it does not review the repository code, so "the audit above agrees on every point" needs "of the theory documents it reviewed" |
| 3 | 112 | `...CRITIQUE.md:540-545` | ML reviewers will reject the unimplemented model: no code, benchmarks, baselines | CONFIRMED | Lines 542-544 |
| 4 | 29 | `package.json:10-58` | Next 16, React 19, TS 5, Tailwind 4, Tone 15, VexFlow 5 | CONFIRMED | next 16.1.1, react 19.2.3, tone ^15.1.22, vexflow ^5.0.0, tailwindcss ^4, typescript ^5 (devDeps run to line 78) |
| 5 | 29 | `literary_data.ts:16`; `page.tsx:348-349` | trauma and entropy hand-set per frame | CONFIRMED | 13 plays (3 in literary_data.ts, 10 in additional_plays.ts); 232 frames (119 + 113); exact, not "roughly" |
| 6 | 29 | `literary_data.ts:22, 28` | analysis strings contain "Real" and "Symbolic" literally | WRONG LINE | Lines 22 and 28 are `description` fields; the `analysis` strings that `analyzeRSI(frame.analysis)` reads are at lines 24 ("Rationality (Symbolic) attempting to deny the Real.") and 30 ("The Real ruptures...") |
| 7 | 29 | `psychometric_calculus.ts:142-144, 236-250` | keyword lists and keyword counting | CONFIRMED | Lists at 142-144; `analyzeRSI` at 236-251 |
| 8 | 29 | `route.ts:136-145, 251` | external LLM call; fallback entropy random | CONFIRMED | fetch to openrouter at 136; `entropy: Math.random() * 0.3 + 0.2` at 251 |
| 9 | 31, 158 | `score_orchestrator.ts:228-429, 274` | per-frame recompute; activation decay only state | CONFIRMED | `processFrame` 228-429; `stave.activation = ... - 0.1` at 274 |
| 10 | 31 | `GeniusComposer.ts:147-383, 351-362, 371` | composeMelody; random octave jumps; velocity jitter | CONFIRMED | `Math.random()` at 351, 356, 361; `velocity: params.dynamic * (0.8 + Math.random() * 0.2)` at 371 |
| 11 | 31 | `leitmotif_generator.ts:183-186` | inversion negates an array nothing reads | CONFIRMED | `transformed.intervals = motif.intervals.map(i => -i)`; no reader of `.intervals` outside the file |
| 12 | 31 | `ConductorScoreVexFlow.tsx:131-134`; `playback_engine.ts`; `midi_writer.ts:112-160`; `audio_exporter.ts:94-150` | implemented and tested | OVERSTATED | Files and lines exist. Tests exist for VexFlow (`vexflow_score.test.ts`) and playback (`playback_engine.test.ts`). No test imports `midi_writer`; the only test importing `audio_exporter` mocks it (`ExportButton.test.tsx:12`). "Tested" holds for two of the four |
| 13 | 31 | `score_exporter.ts:390-590` | PDF is a text report | CONFIRMED | `exportToPDF` from 390, jsPDF `doc.text` calls |
| 14 | 35 | `server_v2.py:211-221, 233-259, 261-286` | temperature formula, `random.choice` instruments, eight-step plan | CONFIRMED | `calculate_dynamic_temperature` 211-221; `select_orchestral_instruments` 233-259 with six `random.choice`; `chain_of_thought_planning` 261-286 returns steps 1-8 |
| 15 | 35 | `server_v2.py:309-314, 330-331, 378-414, 427` | tries to load v1 model, catches, falls back to random scale notes | WRONG LINE (minor) | Load 305-314; `except Exception` at 329-330; `_generate_rule_based` 380-414 with `random.choice(mode_ints)` at 402, 403, 406, 409; startup 427-430. `checkpoints/psychoscore/final/` holds tokenizer files and `adapter_config.json`, no weights |
| 16 | 35 | `server_v2.py:104` | health reports `"rule-based"` | CONFIRMED | `"v1_engine": "rule-based"` |
| 17 | 35 | `v2_endpoint.py:24-44, 80, 101-134` | five scalars in; three-adjective prompt; stock MusicGen-small | OVERSTATED | Request model 24-44; `get_pretrained('facebook/musicgen-small')` at 80; prompt builder 101-134. But lines 82-94 try to apply a LoRA adapter from `checkpoints/lora_performance` and fall through on failure. With the LFS blob absent it is stock; the paper should say the adapter load is attempted |
| 18 | 35 | `export_endpoint.py:490-499, 452-462, 469-484, 350-358` | `/export/midi` echo; `/export/wav` 440 Hz sine or triad; `/export/pdf` placeholder | CONFIRMED | Router prefix `/export` (line 27); `/wav` at 508; sine 440 at 456 inside the fluidsynth branch; C-major sine triad 476-477 in the ImportError branch; placeholder strings 357, 359 |
| 19 | 35 | `generate_music.py:75-100` | AudioLDM 2 prompt from two scalars, planner output ignored | CONFIRMED | `render_audio` uses only trauma and entropy |
| 20 | 43 | `mckenney_lacan_calculus.py:451-454` | BSI = 1 minus largest pairwise difference | CONFIRMED | Line 451 docstring `BSI = 1 - max(|r-s|, |s-i|, |i-r|)`; code 453-454 |
| 21 | 43 | `02_BORROMEAN_TOPOLOGY.md:80` | BSI = min/max | CONFIRMED | Lines 78-80: `\text{BSI} = \frac{\min(r, s, i)}{\max(r, s, i)}`; also line 294 in a code block |
| 22 | 43 | `implementation-mapping/page.tsx:208` | BSI = 1 minus largest weight | CONFIRMED | `equation="BSI = 1 - max(r,s,i)"` |
| 23 | 43 | `mpn-conductor/page.tsx:356` | `max(0.3, 1 - abs(lambda))` | CONFIRMED | `Math.max(0.3, 1 - Math.abs(lyapunov))`. Repo-wide grep finds no fifth definition |
| 24 | 44 | `mckenney_lacan_calculus.py:302-306` | crisis: lambda above 0.2 and BSI below 0.3 | CONFIRMED | `return lam > 0.2 and bsi < 0.3` |
| 25 | 44 | `10_CORE_EQUATIONS.md:285` | lambda above 0.1 and BSI below 0.3 | CONFIRMED | `(\lambda > 0.1) \land (\text{BSI} < 0.3)` |
| 26 | 44 | `02_BORROMEAN_TOPOLOGY.md:230` | BSI below 0.3 and H above 0.8 | CONFIRMED | Block 228-232 |
| 27 | 45 | `mckenney_lacan_calculus.py:191-200`; README | Real Phrygian, Symbolic Ionian, Imaginary Lydian | CONFIRMED | `rsi_to_mode` 191-201; README line 125 |
| 28 | 45 | `generate_synthetic_pairs.py:23-30` | Dorian/Aeolian, Lydian/Mixolydian, Phrygian/Locrian | CONFIRMED | `MODE_RULES` 24-31 |
| 29 | 45 | `server_v2.py:223-227` | mode from trauma alone | CONFIRMED | `select_mode_from_trauma` |
| 30 | 46 | `mckenney_lacan_calculus.py:103-162`; `server_v2.py:231`; `create_octuple_training_data.py:52` | tempo from entropy; minus 30 per unit trauma; plus 80 per unit trauma | CONFIRMED (last off by one) | `TEMPO_RANGES` 103-107; `base - 30*trauma` at 231; `80 + int(trauma * 80)` at line 53 (52 is the comment) |
| 31 | 47 | `mckenney_lacan_calculus.py:226-253`; `RSCH-39...md:143` | C to keyboard vs C to percussion | CONFIRMED | `'C': 'keyboard'` at 238; RSCH-39 line 143 "C (Conscientiousness) | Percussion" |
| 32 | 48, 52, 303 | `mckenney_lacan_calculus.py:411-416`; `tonnetz.py:98, 104-107, 150`; `test_tonnetz.py:74-80, 79` | calculus L correct; engine L gives B minor; docstring contradiction; "But wait, let me recalculate"; test asserts root 11 | CONFIRMED | `apply_L` 411-416 gives root+4 minor (E minor). `transform_L` 104-107 gives root-1 minor (B minor). Docstring line 98 "C Major → e minor (root C→B)". Line 150 comment verbatim. Test line 79 `assert result.root == 11  # B` |
| 33 | 49 | `mckenney_lacan_calculus.py:58-90`; `mpn_reference_lookup.ts:150-178`; `page.tsx:360` | eight bands; three with default gaps, not monotone; five | CLAIM FALSE on "not monotone" | Eight bands 71-90 confirmed; five labels at page.tsx:360 confirmed. The TS table (`mpn_reference_data.ts:668-740`, conditions `0.0-0.2`, `0.4-0.6`, `> 0.8`, defaults 30, 72, 118; fallback 72 at lookup line 176) gives 30 on [0, 0.2], 72 on (0.2, 0.8], 118 above 0.8. That is monotone non-decreasing. The defect is coarse steps and two default gaps, not non-monotonicity. See error 2 |
| 34 | 50 | `10_CORE_EQUATIONS.md:296-320` | theory doc claims TS uses `20 + 107 tau`, false for the shipped module | OVERSTATED | The doc's `traumaToDynamics` at 296-320 is as quoted, and shipped `psychometric_calculus.ts:162-164` delegates to the lookup. But the shipped conductor page does compute `Math.round(20 + 107 * trauma)` (`mpn-conductor/page.tsx:359`), and the wiki repeats the formula (`implementation-mapping/page.tsx:117, 166`). The TS side has both |
| 35 | 52 | `psychometric_calculus.test.ts:119-137` | tests probe only 0.1, 0.5, 0.9 | CONFIRMED | Lines 121, 127, 133 |
| 36 | 52 | `mckenney_lacan_calculus.py:290-384, 165-184`; `mpn_calculus.py:135-165` | Lyapunov is `(tau + H - 0.5)/2`; entropy is punctuation count; Shannon helpers never called | CONFIRMED | Line 301 `return (tau + H - 0.5) / 2`; `calculate_entropy_H` counts `?`, `!`, `--`, `...` at 148-162; `shannon_entropy` is called only by `normalized_entropy` (182), which no production code calls |
| 37 | 56 | `projector.py:82-150, 134`; `test_all_modules.py:544-552`; `musicgen_lora.py:124-141`; `mckenney_lacan_calculus.py:25-51` | 57-D layout; "placeholder" comment; shape-only test; embedding discarded; nine-scalar vector | CONFIRMED | Indices 0-56 as listed (93-149); line 134 "This is a placeholder"; test asserts `output.shape == (4, 1, 768)` at 553; `condition = self.projector(profile)` at 125, then `generate_with_chroma(descriptions=[""] * ...)` at 136-141 with `condition` unused; `PsychometricVector` nine fields 32-40 |
| 38 | 92 | `generate_synthetic_pairs.py`; `run_training_pipeline.py:204-216, 153-161` | 46,000 pairs; random target tokens with labels = inputs; only the synthetic file is tokenised | CONFIRMED | `synthetic_pairs.jsonl` has 46,000 lines; lines 207-208 `target_tokens = [random.randint(0, tokenizer.vocab_size - 1) ...]`; 211 `input_ids = prefix_tokens + target_tokens`; 217 `"labels": input_ids`; loader reads only `synthetic/synthetic_pairs.jsonl` (153-161) |
| 39 | 92 | `checkpoint-17250/trainer_state.json` | 15 epochs, 17,250 steps, loss 40.7 to 25.08 | CONFIRMED | epoch 15.0, global_step 17250, first loss 40.6885, last 25.0801 |
| 40 | 92 | `docs/PHASE_AUDIT_COMPLETE.md:92-94` | loss reported as success | CONFIRMED | Table rows 92-94 (Total Steps 17,250; Train Loss 25.08; Eval Loss 6.17) |
| 41 | 92 | `.gitignore:44-49` | weight files git-ignored | CONFIRMED | `*.safetensors`, `*.pt`, `*.pth`, `*.bin`, `*.ckpt`, `*.h5` |
| 42 | 92 | `emopia_loader.py:38-70`; "download log shows 1,078 clips fetched"; EMOPIA directory absent | CLAIM FALSE on the count | Loader mapping at 38-70 confirmed (and it has a duplicate `'trauma'` key at 40 and 66, a bug the paper could cite). `ml/psychoscore/logs/emopia_download.log:636` says "Extracted 1084 MIDI files"; the quadrant counts it prints sum to 1,071. No file in the repository says 1,078. `ml/psychoscore/data/raw/` absent, confirmed |
| 43 | 96 | `skeleton_dataset.jsonl` (10); `train_planner.jsonl` (10); `train_dpo.jsonl` (8); `train_performance.jsonl` (10) | line counts | CONFIRMED | `wc -l`: 10, 10, 8, 10 |
| 44 | 96 | `llm_labeler.py:49-50` | returns "Error extracting features: ..." | CONFIRMED | Line 50 `return f"Error extracting features: {e}"`; model `gpt-4o` at line 76 |
| 45 | 96 | `data/silver_labels/*.json` | all ten begin "The error message suggests" | CLAIM FALSE as worded | Ten files. Two begin "The error message suggests"; two begin "The error message indicates"; the others begin "The error indicates", "The error suggests", "The error and language suggest", "The reference to an error suggests", "The error in feature extraction suggests". All ten open by reasoning about an error string, which is the point; the quoted phrase is not universal |
| 46 | 96 | `lora_planner/checkpoint-15/trainer_state.json`; adapter config | distilgpt2, rank 8, 15 steps, batch 2, loss 3.63 | CONFIRMED | global_step 15, train_batch_size 2, only logged loss 3.6254 at step 10; adapter_config base `distilgpt2`, r 8 |
| 47 | 96 | `dpo_planner/checkpoint-15/trainer_state.json`; `create_dpo_dataset.py:37-45` | accuracies 0.40, margins minus 0.287, grad norm 0; rejected is a random other clip | CONFIRMED | `rewards/accuracies` 0.4000, `rewards/margins` -0.2873, `grad_norm` 0.0 at step 10; `rejected_stem = random.choice(others)` at 44 |
| 48 | 96 | `output/cyborg_skeleton.txt` | repeated prose about voices in a room | CONFIRMED | Opens "I can hear the voices of the man we were talking about in that room" and repeats |
| 49 | 100 | `train_performance.py:138-141, 146` | `pass`, "Mock training loop", placeholder loss, save commented out | CONFIRMED | Line 138 `pass # Simplified flow: Mock training loop for Phase 12 completion`; 141 `total_loss += 0.1 # Placeholder`; 146 `# model.lm.save_pretrained(OUTPUT_DIR)` |
| 50 | 100 | `checkpoints/lora_performance/adapter_config.json`; `README.md:175-182` | 66 MB adapter, different modules and rank; external training repo | CONFIRMED | Pointer `size 66113496`; config r 16, targets `out_proj, linear2, linear1`, `base_model_name_or_path` null; script uses r 8, targets `out_proj, in_proj_weight` (86-88); README 174-176 clones `Planet9V/psychoscore-v2-training` |
| 51 | 100, 286, 299 | "Every weight file is a 133-byte Git LFS pointer" | | OVERSTATED (minor) | All 16 weight files are LFS pointers with no blob in the clone; sizes run 129 to 134 bytes. The 66 MB adapter's pointer is 133. `git lfs ls-files` marks every LFS object `-` (absent). Remote availability of the blobs was not tested |
| 52 | 100 | `train/train_dpo.py:55-65`; `ml/psychoscore_v2/README.md:20` | expects `pair_*` directories that do not exist; names `train/train_lora.py`, absent | CONFIRMED | Glob at 58; `train/` contains only `train_dpo.py`; README line 20 `python train/train_lora.py` |
| 53 | 104 | `wav2vec_encoder.py:57-64`; `personality_detector.py:71-86`; `fusion_module.py:97-114`; `psychometric_regressor.py:5, 57-58`; `group_gnn.py:210-215` | random-init heads; docstring claims training; no `load_state_dict` | CONFIRMED | Heads as cited; regressor docstring line 4 "Trained on labeled music-psychometric pairs."; the only `load_state_dict` calls in v2 are for the octuple model and the projector, none for these heads |
| 54 | 104 | `download_high_fidelity.py:78-89` | RAVDESS table consumed by nothing | OVERSTATED (minor) | `EMOTION_MAP` at 79-89 is consumed by the same script (lines 208-225) to write records; the records are consumed by nothing else. Say "whose output nothing consumes" |
| 55 | 104, 306 | `README.md:74-77` | heads presented as working capabilities | CONFIRMED | Bullets Wav2Vec2 XLSR, Whisper V3, XLM-RoBERTa, Fusion Module |
| 56 | 108, 307 | `README.md:7-8, 328-336`; `PHASE_AUDIT_COMPLETE.md:26, 552-561` | 84 badge; rows sum to 74; phase audit breakdown reaches 84; "84 passed, 4 skipped" | CONFIRMED | Badge lines 7-8; table rows 10+7+6+5+5+19+13+9 = 74; audit files 19+13+9+5+38 = 84; line 561 quote |
| 57 | 108 | test counts: named files 79; 108 under v2; 157 all Python; 639 Vitest; 658 logged; 167 Playwright; 88 failed | | CONFIRMED | Named files: 19+15+9+5+31 = 79. `def test_` under `ml/psychoscore_v2`: 108. All Python: 157 (158 if `mpn_engine/tests/verify_ner.py`, not a pytest file, is counted). `it(`/`test(` in `src/**/*.test.*`: 639 across 38 files. Log line 441 "658 passed (658)". `tests/*.spec.ts`: 167. `.last-run.json`: status failed, 88 ids |
| 58 | 108 | `test_v2_endpoint.py:12-14` | mocks model deps at import | CONFIRMED | `sys.modules["audiocraft"] = MagicMock()` etc. |
| 59 | 108 | `src/app/wiki/`; `README.md:8` | 57 page files vs "34 wiki pages" | CONFIRMED | `find src/app/wiki -name page.tsx`: 57 |
| 60 | 108 | `PHASE_AUDIT_COMPLETE.md:117-139, 389-401` | human evaluation and FAD pending | CONFIRMED | "6.4 Human evaluation ← PENDING" and "FAD Score calculation" unchecked |
| 61 | 108, 310 | `RSCH-39...md:485-494` | 15 events, 22-minute lead time, no data | CONFIRMED | Lines 485-491 |
| 62 | 108, 258 | `ab-test/page.tsx:14, 22` | ratings in React state, never persisted | CONFIRMED | `useState` ratings at 14; random assignment at 22; no fetch or storage call |
| 63 | 124 | `mckenney_lacan_calculus.py:25-51` | nine-component vector | CONFIRMED | |
| 64 | 191, 304 | `psychometric_calculus.ts:203-217`; `server_v2.py:233-259, 378-414`; `GeniusComposer.ts:351-362`; `route.ts:251` | randomness on rendering path | CONFIRMED | `discToInstrument` 203-218 with `Math.random()` at 217 |
| 65 | 240, 244 | `create_dpo_dataset.py:37-45`; `v2_endpoint.py:101-134` | | CONFIRMED | |
| 66 | 257 | `scripts/calculate_fad.py` | FAD script with no output | CONFIRMED | Script exists; no result file anywhere under `ml/psychoscore_v2` |
| 67 | 286, 296 | `docker-compose.yml:26` | live-looking ElevenLabs key hard-coded | CONFIRMED | Line 26 `- ELEVENLABS_API_KEY=sk_...` followed by a 50-character token; not a placeholder pattern. Not printed here |
| 68 | 286, 298 | commits `144c909`, `b9a6a01` | 3,097 files / 631,901 lines; 453 files / 1,941,914 lines; the latter an audio and data dump | OVERSTATED on "audio and data dump" | `git log --shortstat`: 144c909 (2026-01-22 09:02 +1100) 3097 files, 631901 insertions; b9a6a01 (09:34 +1100) 453 files, 1941914 insertions. The 1.94 M lines are dominated by six copies of a 250,306-line `tokenizer.json` under `checkpoints/psychoscore/*` (1.5 M lines), the 46,000-line synthetic pairs file and `.claude/` scaffolding. Audio files are one-line LFS pointers. Say "a checkpoint-tokenizer and data dump" |
| 69 | 286, 301 | `CLAUDE.md:1-40`; `.claude-flow/`; `claude-swarm/`; `tonnetz.py:150` | agent scaffolding checked in | CONFIRMED | `CLAUDE.md` 726 lines; `.claude-flow/`, `claude-flow/`, `claude-swarm/` present |
| 70 | 286, 300 | `docker-compose.yml:67-69`; `ml/ace_step/` empty | default stack builds from an empty context | WRONG LINE and incomplete | Service block is 68-71 (`ace-step:` 68, `context: ./ml/ace_step` 70). The directory is empty in the clone because `ml/ace_step` is a gitlink (`git ls-files -s` mode 160000, commit 6ae0852) with no `.gitmodules`, an orphaned submodule pointer. That is a stronger finding than "empty" |
| 71 | 286, 297 | `mckenney_lacan_appliced_2025_11_19/README.md:9, 139`; `DATA_SOURCES.md:26` | non-resolving Zenodo-prefixed DOI; placeholder `10.1037/0000000-000` | CONFIRMED | Line 9 `**DOI**: 10.5281/...` and 139 `https://doi.org/10.5281/...` (string withheld here per the corpus rule); DATA_SOURCES line 26 carries `https://doi.org/10.1037/0000000-000` |
| 72 | 308 | `package.json:3, 16, 25` | unused dependencies and version mismatch | WRONG LINE | Line 3 `"version": "1.0.0"` against README v3.7, confirmed. Line 16 is `},` (end of scripts). Line 25 `@types/three` is used (`three` imported in 11 source files). Unused dependencies, by import grep, are at 18 `@gsap/react`, 19-20 `@nivo/bar`, `@nivo/radar`, 21 `@qdrant/js-client-rest`, 30 `d3-tooltip`, 32 `gsap`, 35 `neo4j-driver`, 41 `react-globe.gl`, 44 `react-scroll`, 45 `react-simple-maps` |
| 73 | 309 | `ml/`, `mpn_engine/` no Python project files or pytest artefacts | | CONFIRMED | No `pyproject.toml`, `setup.py`, `pytest.ini`, `.pytest_cache` or junit output under either tree |

Files missing: none. Every cited file exists.

## 2. Independent facts

| Fact | Established from | Paper says | Match |
|:---|:---|:---|:---|
| MusicGen model sizes | arXiv 2306.05284v3, section 3.1: 300M, 1.5B, 3.3B parameters | Not stated (calls the served one "MusicGen-small") | Consistent; the paper could name 300M for "small" |
| MusicGen training data | "20K hours of licensed music" (section 3.2) | 20,000 hours | Match |
| MusicGen codec | four codebooks of 2048 at 50 Hz | four-codebook EnCodec at 50 Hz | Match |
| MusicGen evaluation | OVL/REL on 1 to 100; at least 5 raters per sample; CrowdMOS filtering; samples normalised at -14 dB LUFS; 3.3B OVL 84.81 plus or minus 0.95 (Table 1) | Same figures | Match |
| Chroma conditioning | trained jointly, information bottleneck by dominant time-frequency bin | "trained jointly on the whole corpus and deliberately bottlenecked" | Match |
| EMOPIA | ISMIR 2021 paper 000039: 1,087 clips from 387 songs, about 11 hours, four annotators, 2.5-month campaign, four Russell quadrants; 25 subjects, 12 samples each, five-point Likert; VGMIDI predecessor 95 pieces | Same | Match |
| MusicRL | arXiv 2402.04229 abstract: "300,000 pairwise preferences" from deployed MusicLM users; reward functions with selected raters; "text adherence and quality only account for a part of it" | Same | Match |
| Tango 2 | arXiv 2404.09956 abstract: synthetic preference set, diffusion-DPO, gains over Tango and AudioLDM2; pair count not in abstract | Same; declines to quote a pair count | Match (the count, about 15,000 pairs in the paper's Audio-alpaca set, could be added if the ledger fetches the PDF) |
| musicgen-dreamboothing | README: "27 minutes of Punk music"; "under 15 minutes on an A100 GPU"; no metric, advises listening | Same | Match |
| LoRA | arXiv 2106.09685, ICLR 2022 | Same | Match |
| DPO | arXiv 2305.18290, NeurIPS 2023 | Same | Match |
| CLAP | Wu et al., arXiv 2211.06687, ICASSP 2023 (IEEE Xplore 10095969) | Same | Match |
| IEC 62443-2-1 | Edition 2.0, 2024-08, IEC webstore publication 62883; ANSI/ISA-62443-2-1-2024 | ":2024 edition exists as an IEC and ISA standard", webstore 62883 | Match |
| Commission AI-system guidelines | C(2025) 5053 final, Brussels 29.7.2025 (ai-act-service-desk PDF) | Same | Match |
| Gadalla et al. | Frontiers in Psychology, DOI 10.3389/fpsyg.2026.1526215 resolves | Same | Match |

No external figure in the paper is wrong. The one internal figure that is wrong is the EMOPIA download count (row 42 above).

## 3. Errors, severity-ordered, with fixes

1. HIGH, line 322 (section 8.2). "A test asserting that L carries C major to B minor, as the standalone engine's does, fails the involution test on its own terms, because that module's L on a minor triad does not invert its L on a major one." False. `transform_L` subtracts one semitone on a major triad and adds one on a minor triad; L(L(C major)) = L(B minor) = C major. Executed: `L(C)= 11 MINOR, LL(C)= 0 MAJOR`. The module's L is an involution; what it fails is the common-tone test (C major {0, 4, 7} and B minor {11, 2, 6} share no pitch class, where L must preserve two) and the group test (with P and R it does not generate the dihedral group of order 24). Fix: replace the sentence with "passes the involution test, which is why an involution test alone would not have caught it; it fails the common-tone test, since C major and B minor share no pitch class, and the 24-element group test." This also strengthens the paper's own point that a test can enshrine an error.

2. HIGH, line 49 (table row "Dynamics bands": "three with default gaps, not monotone") and line 318 (section 8.1: "That one test would have failed the reference implementation's dynamics table at trauma 0.2 against 0.21 and 0.8 against 0.81"). The TypeScript table gives 30 at 0.2, 72 at 0.21, 72 at 0.8, 118 at 0.81: every pair increases. A property test asserting "no mapping decreases" passes this table. The defect is coverage and continuity: two of the five intervals fall to a hard-coded default (`mpn_reference_lookup.ts:176`), and the map jumps 42 velocity points across one hundredth of trauma. Fix: in the table write "three bands with default gaps; discontinuous"; in 8.1 add a coverage test (every input in the unit interval matches a declared band, never the fallback) and a continuity bound (no step larger than a declared value across adjacent inputs), and say those, not monotonicity, would have failed the table. MPN-2 line 200 carries the same "is not monotone" wording and needs the same fix.

3. MEDIUM, line 96. "all ten label files contain reasoning that begins 'The error message suggests'". Two of ten begin with that phrase. Fix: "all ten label files open by reasoning about the error string" and quote two openers.

4. MEDIUM, line 92. "a download log shows 1,078 clips fetched". The log says "Extracted 1084 MIDI files" and its quadrant counts sum to 1,071; 1,078 appears nowhere. Fix: "a download log records 1,084 MIDI files extracted". The paragraph could add that `emopia_loader.py:40, 66` defines `'trauma'` twice in the Q1 mapping, so even the mapping is broken.

5. MEDIUM, lines 15, 112, and the ledger. "Zero empirical validation" is at line 24, not 20; the findings run 24-29, not 18-26. MPN-1 line 330 carries the same wrong line. Also the file reviews three theory documents, not the code; line 112 should say "of the theory documents it reviews" rather than implying the reviewer audited the repository.

6. MEDIUM, E-3 and E-4 (lines 205-206) against MPN-2 N-1 and the state-vector table. The table has twelve rows, but `delta` is marked "Adversary, simulation" and `p_sim` "Simulation". E-3 says the engine in operational mode "MUST accept only the twelve channels" (two of which N-1 forbids in that mode), and E-4 then "additionally" admits the nine-component scenario vector, which is already row twelve. Fix: E-3 "only the channels of Paper 2 section 2 admissible in operational mode"; E-4 "MAY additionally accept the simulation vector `p_sim` and the discourse estimate `delta` of that table". Section 4.2 line 124 and the diagram at 139 ("twelve channels only") need the same edit.

7. MEDIUM, line 286 and checklist row 3. "the latter an audio and data dump": the 1.94 M lines of b9a6a01 are six duplicated tokenizer files, the synthetic pairs and `.claude/` scaffolding; audio is LFS pointers. Fix wording as in table row 68; the remedy ("fetch script and checksums") then applies to the checkpoint directories too.

8. MEDIUM, line 236. "Nobody in that literature conditions on more than two continuous dimensions or four classes [15]". EMOPIA cannot support a universal claim about a literature; the ledger row 15 says the same. Fix: "The systems EMOPIA reviews condition on two dimensions or four classes" or drop the sentence; the budget table row "no published conditioner above two to four dimensions" needs the same hedge.

9. LOW, line 31. "the MIDI writer and the MP3 exporter are implemented and tested": no test imports `midi_writer`; the one test importing `audio_exporter` mocks it. Fix: "the notation renderer and playback engine are implemented and tested; the MIDI writer and MP3 exporter are implemented without a direct test".

10. LOW, line 50 table row. The theory document's formula is "false for the shipped module" `psychometric_calculus.ts` but the conductor page (`page.tsx:359`) and two wiki lines implement it. Fix: "false for the lookup module the composer uses; the conductor page implements it separately, a fourth velocity rule".

11. LOW, line 35. `/generate-v2/` attempts a LoRA load from `checkpoints/lora_performance` (`v2_endpoint.py:82-94`) before falling back to stock weights. Fix: "attempts to apply the 66 MB adapter of section 3.3 and, that being a pointer, serves stock MusicGen-small".

12. LOW, line 286 and row 5. `ml/ace_step` is an orphaned submodule gitlink (no `.gitmodules`), not merely an empty directory. Fix wording; the remedy becomes "restore `.gitmodules` with a pinned commit or vendor the code".

13. LOW, lines 100, 262, 299. "133-byte" pointers: 129 to 134 bytes. Fix: "Git LFS pointers of about 130 bytes".

14. LOW, checklist row 13. `package.json:16` is a brace; `:25` is a used dependency. Replace with lines from table row 72.

15. LOW, minor line slips: `literary_data.ts:22, 28` should be 24, 30; `docker-compose.yml:67-69` should be 68-71; `server_v2.py:330-331` should be 329-330; `create_octuple_training_data.py:52` should be 53.

16. LOW, line 104. "consumed by nothing" for the RAVDESS table: the script consumes it to write records that nothing consumes.

17. LOW, section 4.4 diagram (lines 180-182). The accDescr says the muted state is "entered from any state by the operator", but edges exist only from AMBIENT and FLOOD, and unmute returns only to AMBIENT. Add ATTENTION and ALERT to MUTED edges, or state that the diagram shows one representative edge.

18. LOW, ledger. Judgement-call bullet one says the non-resolving DOI string "is reproduced verbatim once (section 7.1)"; the paper writes `10.5281/...`. The paper is right under the corpus rule; the ledger is stale. Also the ledger's code table says "None was verified against the repository by this writer"; after this pass, it can record that all 73 citations were opened and the corrections above applied.

## 4. Requirements audit

Contiguity and count: E-1 through E-24 are listed once each, in order, with no gap (grep of `- **E-n.**`). Line 13 ("E-1 through E-24"), line 201 and the conclusion ("twenty-four requirements") agree. Every E-n is referenced at least once in the body or checklist.

Testability: 21 of 24 state a checkable condition (a fixture size, a threshold, a presence or absence, a byte comparison). Three need a declared quantity to become testable: E-13 depends on the frame length declared in the header (fine, since N-4 requires it); E-17's "retention period MUST be declared per site" is testable only as presence of a field; E-23's CI gate depends on a claim classifier the paper calls "crude by design", so its test is the gate's own fixture set, which should be named (a list of phrases and a list of documents that must fail).

Internal consistency: E-3/E-4 double-count `p_sim` and admit `delta` in operational mode (error 6). E-8, E-9, E-10, E-11, E-12, E-19, E-20, E-21 restate N-18/N-22, N-14, N-15, N-24, N-23, N-20, N-21 and N-19/N-25 respectively without conflict; restating is acceptable since Paper 4 binds to E-n.

Cross-references to MPN-2, each opened at its line:

| Cited | MPN-2 line | Says what the paper says | Note |
|:--|:--|:--|:--|
| N-1 to N-26 exist | 319-344 | Yes | 26 requirements, contiguous |
| N-2 (voice is a biometric, line 104) | 320 | Yes | "no channel MAY be a biometric of a member of staff" |
| N-3 (console-level aggregation, line 197) | 321 | Yes | |
| N-9 (L must give E minor, line 52) | 327 | Yes | |
| N-12 (timbre set fixed per site because roughness depends on spectrum, line 128) | 330 and section 3.7 line 196 | Yes | |
| N-14 (timbre, register, pan per stream, line 128) | 332 | Yes | also rhythmic figure |
| N-20 (non-alarm declaration, line 197) | 338 | Yes | |
| N-23 (no alarm-like motif, line 128) | 341 | Yes | |
| N-24 (no attributed mute, line 197) | 342 | Yes | |
| N-26 (frame tables bit for bit, lines 120, 204) | 344 | Yes | |
| Section 2 twelve channels (lines 124, 205) | 28-41 | Twelve rows; two are mode-restricted | Error 6 |
| Section 3.3 mapping table endpoints (line 318) | 134-140 | tempo band endpoints, `k = round(12 x_p)`, `v = round(30 + 90 l)`, metre lookup with fallback | Yes; "twelve at unit deviation" and "120 at unit load" follow |
| Section 3.6 P, L, R (lines 303, 322) | 156-193 | Yes | |
| Section 3.8 six monotone bands (line 318) | 200 | Yes | MPN-2 line 200 also carries the wrong "not monotone" claim |
| Section 4.2 alert rule 0.7 / below 0.5 two frames / 0.4 (diagram lines 164-175) | 243 | Yes | |
| Section 5 flood at 10, exit below 5, tonic drone pp (lines 158, 272) | 255, 261-279 | Yes | MPN-2 adds a two-bar ramp on exit that MPN-3 omits; harmless |
| Section 8 frame tables, 8.2 declared translation (lines 124, 206) | 346-402 | Yes | translation rule at 392 |
| Section 9 listener study, four parts (line 334) | 403 | Yes | |
| MPN-1 F-12 (lines 15, 56, 104) | MPN-1 line 148 | Yes | |
| MPN-1 F-13 (E-24) | MPN-1 line 149 | Yes | |

## 5. Reference spot-check (12)

| [n] | Check | Result |
|:--|:---|:---|
| [7] Regulation (EU) 2024/1689 | Art. 5(1)(f) prohibition applies from 2 Feb 2025 (Art. 113) | Correct |
| [8] C(2025) 5053 final, 29 July 2025 | Document header confirmed on the Commission's AI Act service desk PDF | Correct |
| [12] Copet et al. | NeurIPS 2023; arXiv 2306.05284 v3 dated 30 Jan 2024 | Correct, all figures match |
| [13] Cideron et al. | arXiv 2402.04229, 2024 | Correct |
| [14] Majumder et al., Tango 2 | arXiv 2404.09956, 2024 | Correct; "et al." acceptable, full list is Majumder, Hung, Ghosal, Hsu, Mihalcea, Poria |
| [15] Hung et al., EMOPIA | ISMIR 2021, archive paper 000039 | Correct; the author list omits none |
| [16] ylacombe | GitHub README content as quoted | Correct |
| [17] Hu et al., LoRA | arXiv 2106.09685, ICLR 2022 | Correct |
| [18] Rafailov et al., DPO | arXiv 2305.18290, NeurIPS 2023 | Correct |
| [20] Wu et al., CLAP | ICASSP 2023, arXiv 2211.06687 | Correct |
| [44] IEC 62443-2-1:2024 | Edition 2.0, 2024-08, webstore 62883 | Correct |
| [49] Gadalla et al. | Frontiers in Psychology, DOI 10.3389/fpsyg.2026.1526215 resolves; arXiv preprint 2410.22895 | Correct; the volume "17" was not checked |

Not checked beyond plausibility: [21] to [25], [33], [36], [40] to [43], [45] to [48], [50]. [25] is cited as unread by the paper itself, which is honest but unusual; consider moving it to a footnote-style "not consulted" note or dropping it.

## 6. Style

No em dash or en dash. None of the banned words. No H1. Longest heading 58 characters. All 34 in-sentence citations follow `word [n].` with the period after the bracket; no `. [n]` occurrences. Four mermaid blocks, each with `accTitle` and `accDescr`. No "OXOT" (the theory folder path `OXOT_BUSINESS_CASE` is not quoted; the DATA_SOURCES path is abbreviated to avoid it). No `$` in any table cell; no LaTeX anywhere. All 50 references are cited and no citation exceeds 50. Metadata table, RFC 2119 and CC BY lines present.

Two style-adjacent notes. Line 236 opens "The emotion-conditioned generation literature sets the scale of what 'conditioned' has meant", then generalises from one dataset (error 8). Line 244 and line 278 both say a source "was not read" or "none was verified"; that candour is consistent with the series but three such admissions in one paper (lines 240, 244, 274) read as unfinished research rather than scoped claims. Consider collecting them in one "not verified" sentence in section 1.1.

## 7. Weakest paragraphs

1. Line 322 (section 8.2). The paragraph's closing sentence is false (error 1), and it is the paper's only worked demonstration that a property test beats an example test, so the falsity undercuts the section's argument. Rewrite around the common-tone and group tests.

2. Line 318 (section 8.1). The last two sentences claim a monotonicity test would have caught the TypeScript table; it would not (error 2). The rest of the paragraph is sound and the fix is local, but as written the paragraph teaches the wrong test.

3. Line 290 (section 7.2). Every sentence hedges: the clause text "was not verified", "no clause" is cited, "general secure-development expectations apply without a standard to name them". The paragraph makes no checkable statement beyond a list of good practices anyone would write. Either cite the IEC 62443-2-1 clause structure at the level the webstore preview shows (the standard's zone-and-conduit and security-program element headings are public) or cut the paragraph to two sentences and move the practices into E-22.

Runner-up: line 244 (section 5.3), whose second half cites a benchmarking paper it says was not read.

## 8. Verdict

The audit half of the paper is largely accurate: of 73 code citations, 55 are confirmed as stated, 8 are off by a few lines, 6 are overstated in wording, and 4 are false as worded (the "not monotone" table row, the "begins 'The error message suggests'" claim, the 1,078 count, and the involution reasoning in 8.2). All external figures check against primary sources. The four false claims are all fixable in a sentence each, but two of them (errors 1 and 2) sit in section 8, where the paper argues that its proposed tests are better than the repository's, and in both cases the proposed test would not have caught the defect the paper says it would. That should be corrected before working-group review, and the same "not monotone" wording in MPN-2 line 200 and the "line 20" citation in MPN-1 line 330 should be corrected with it. The requirements are contiguous, counted correctly and consistent with MPN-2 except for the twelve-channel wording of E-3/E-4. Style is clean. Recommendation: revise and re-check sections 2.3 (row 7), 3.1, 3.2, 4.2, 4.7 (E-3, E-4), 7.1 and 8.1 to 8.2; the ledger's code table should be updated from "none verified" to the table above.
