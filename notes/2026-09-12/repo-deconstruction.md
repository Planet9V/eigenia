# MPN Conductor v3.7 — Repository Deconstruction

**Repository:** `/home/claude/mpn-conductor-standalone` (github.com/Planet9V/mpn-conductor-standalone)
**Analysis date:** 2026-09-11
**Method:** static reading of source, tests, checkpoints, datasets, logs and docs. No code was executed or modified. Every claim carries a `path:line` reference relative to the repository root. Agent scaffolding (`.claude/`, `.claude-flow/`, `.swarm/`, `claude-flow/`, `claude-swarm/`, `CLAUDE.md` — a generic claude-flow swarm config, `CLAUDE.md:1-40`) and `node_modules` were ignored.

**Status vocabulary used throughout:**

- **IMPL+TEST** — code exists and a test in the repo exercises it.
- **IMPL–NOTEST** — code exists, no test exercises it.
- **STUB** — code exists but is a placeholder (returns constants, `pass`, random data, or ignores its input).
- **CLAIMED ONLY** — README/wiki/docs assert it; no corresponding code was found.

---

## 0. Executive findings (read this first)

1. **The "psychology → music" mapping that actually runs is a small set of hand-written threshold tables and linear maps** (`ml/psychoscore_v2/models/mckenney_lacan_calculus.py`, `src/components/mpn-lab/psychometric_calculus.ts`). There is no learned or empirically fitted mapping anywhere in the repo.
2. **The PSYCHOSCORE v1 "trained model" was trained on uniformly random target tokens.** `ml/psychoscore/scripts/run_training_pipeline.py:204-207` builds every training sequence as `prefix + [random.randint(0, vocab_size-1) ...]`. The 17,250-step GPT-2 LoRA run (`ml/psychoscore/checkpoints/psychoscore/checkpoint-17250/trainer_state.json`, final train loss 25.08) therefore learned nothing about music. The adapter weights are not in the repo (only tokenizer/config files; `*.safetensors`/`*.bin` are git-ignored, `.gitignore:44-49`).
3. **The PSYCHOSCORE v2 "silver labels" are GPT-4o's reaction to an error string, not to music.** `ml/psychoscore_v2/data/llm_labeler.py:49-50` returns `"Error extracting features: ..."` when MIDI parsing fails; all 10 label files in `ml/psychoscore_v2/data/silver_labels/*.json` contain reasoning that begins "The error message suggests…". These 10 labels are the entire v2 planner/DPO/performance training set (`ml/psychoscore_v2/data/train_planner.jsonl` = 10 lines, `train_dpo.jsonl` = 8 lines, `train_performance.jsonl` = 10 lines).
4. **The v2 planner is distilgpt2 with LoRA r=8 trained for 15 steps on those 10 examples** (`ml/psychoscore_v2/models/lora_planner/checkpoint-15/trainer_state.json`: `global_step: 15`, `train_batch_size: 2`, loss 3.63). The DPO stage ran 15 steps with `rewards/accuracies: 0.40` and `grad_norm: 0.0` (`ml/psychoscore_v2/models/dpo_planner/checkpoint-15/trainer_state.json`). Its only saved output, `ml/psychoscore_v2/output/cyborg_skeleton.txt`, is English prose ("I can hear the voices of the man we were talking about in that room…" repeated), not a musical skeleton.
5. **The performance-LoRA training loop is a `pass` placeholder** (`ml/psychoscore_v2/scripts/train_performance.py:138-141`: `pass # Simplified flow: Mock training loop`, `total_loss += 0.1 # Placeholder`). The 66 MB `lora_performance/adapter_model.safetensors` is an LFS pointer with no bytes in the clone.
6. **The 57D→768D projector is dead code at inference.** `MusicGenLoRA.generate` computes `condition = self.projector(profile)` and then calls MusicGen with `descriptions=[""]` (`ml/psychoscore_v2/models/musicgen_lora.py:124-141`). The served v2 endpoint uses a 3-descriptor text prompt into stock `facebook/musicgen-small` (`ml/psychoscore_v2/audio_analysis/v2_endpoint.py:80,101-134`).
7. **All voice/music/group "analysis" heads are randomly-initialised MLPs with no training script and no saved weights** (`ml/psychoscore_v2/speech/wav2vec_encoder.py:57-64`, `speech/personality_detector.py:71-86`, `speech/fusion_module.py:97-114`, `audio_analysis/psychometric_regressor.py`, `models/group_gnn.py:210-215`; no `load_state_dict` anywhere in `speech/` or `audio_analysis/`). Backbones (Wav2Vec2-XLSR, Whisper, XLM-R, CLAP) are real pretrained models but their outputs are fed into untrained heads.
8. **README's "84 passing tests"**: the README table sums to 74, not 84 (`README.md:328-336`). The repo contains 108 `def test_` in `ml/psychoscore_v2/tests/`, 157 across all Python, 639 `it()` in Vitest (658 passed in the last logged run, `test-reports/test-run-20260205-102328.log`), and 167 Playwright `test()`s whose last run has 88 failures (`test-results/.last-run.json`). No pytest run log exists in the repo; the "84 passed, 4 skipped" figure appears only as prose in `docs/PHASE_AUDIT_COMPLETE.md:26,561`.
9. **Wiki: 57 `page.tsx` files exist under `src/app/wiki/`, not 34** (README.md:8).
10. **No dataset, listening test, metric, benchmark or validation of the psychology→music mapping exists in the repo.** The only "evaluation" artefacts are three JSON token dumps from the random-target v1 model (`ml/psychoscore/eval_samples/`), an A/B page whose ratings live only in React state (`src/app/mpn-lab/ab-test/page.tsx:14`), and an internal self-critique that says "Zero empirical validation – Not a single data point collected" (`docs/MCKENNEY_LACAN_PHD_REVIEW_CRITIQUE.md:20`).
11. **The mathematics is internally inconsistent across files** (three different BSI formulas, two crisis thresholds, three incompatible RSI→mode tables, two opposite trauma→tempo signs, a wrong neo-Riemannian L operator enshrined by a test) — detailed in §3.9.
12. **Security note:** a live-looking ElevenLabs API key is hard-coded in `docker-compose.yml:26`.

---

## 1. Inventory

### 1.1 Languages, frameworks, size

| Item | Evidence |
|---|---|
| Total tracked-ish files (excl. node_modules/.git) | 4,268 (`find` count); of which 2,891 `.wav`, 387 `.md`, 146 `.tsx`, 123 `.ts`, 108 `.py`, 13 `.sql` |
| Front-end | Next.js 16.1.1 / React 19.2.3 / TypeScript 5 / Tailwind 4 (`package.json:10-58`) |
| Audio in browser | Tone.js 15 (`package.json:51`), VexFlow 5 (`:52`), lamejs MP3 encoder (`:33`), jsPDF (`:32`) |
| Back-end (ML) | Python, FastAPI, PyTorch, HF transformers/peft/trl, audiocraft (MusicGen), laion_clap (`ml/psychoscore_v2/requirements_v2.txt`) |
| Databases | PostgreSQL 16 + pgvector via Docker (`docker-compose.yml:44`); `pg` client in `src/lib/db.ts`. `neo4j-driver` and `@qdrant/js-client-rest` are declared (`package.json:16,25`) but **never imported in `src/`** (grep empty) — CLAIMED ONLY. |
| Test runners | Vitest 4 (`vitest.config.ts`), Playwright 1.57 (`playwright.config.ts`), pytest (no `pytest.ini`/`conftest.py` in `ml/psychoscore_v2/`) |
| Git | 36 commits, 2026-01-01 → 2026-02-06, two author identities (`Planet9V` 27, `Jim M` 9); clone is **not** shallow (`git rev-parse --is-shallow-repository` = false) |
| Licence | MIT (`LICENSE`) |

### 1.2 Directory map of real source (agent scaffolding omitted)

```
src/
  app/                      Next.js routes (pages + API)
    api/                    ~30 route handlers (auth, plays, personas, psychoscore proxy, tts, styles…)
    mpn-conductor/page.tsx  Main interactive conductor (hand-annotated play scenarios → orchestration)
    mpn-lab/, mpn-reference/, play-library/, theory/, wiki/ (57 wiki pages)
  components/mpn-lab/       Core TS engine: psychometric_calculus.ts, score_orchestrator.ts,
                            GeniusComposer.ts, leitmotif_generator.ts, mpn_reference_data.ts (169 entries),
                            mpn_reference_lookup.ts, literary_data.ts + additional_plays.ts (13 plays, ~232 frames),
                            score_exporter.ts, MPNSynthesizer.ts, 15 MPNExperiment_* visualisations
  components/mpn-lab/wizard/ Processing wizard UI (ScoreRenderer, PlaybackControls…)
  lib/                      playback_engine.ts (Tone.js), midi_writer.ts, audio_exporter.ts (MP3),
                            psychometric_instrument_mapper.ts, psychoscore_client.ts, text2midi_client.ts,
                            ai_music_client.ts (OpenRouter/LM-Studio), voice_client.ts, emotional_tts_renderer.ts
  __tests__/                Vitest suites (38 files incl. lib/__tests__ and components/__tests__)
tests/                      Playwright e2e specs (8 spec files)
ml/
  psychoscore/              v1: GPT-2 + LoRA tokenizer/training pipeline, synthetic data (46k pairs), checkpoints (config only)
  psychoscore_v2/           v2: models/ (calculus, projector, musicgen_lora, clap_ranker, group_gnn, compound_transformer),
                            speech/ (wav2vec, whisper, xlm-r, fusion), audio_analysis/ (endpoints), scripts/ (train_*),
                            data/ (10 MAESTRO MIDI, 10 silver labels, 1,440 RAVDESS wav, 500 synthetic octuple), tests/ (9 files)
  ace_step/                 EMPTY directory (docker-compose builds from it: docker-compose.yml:67-69)
mpn_engine/                 Standalone Python text→score engine (mpn_calculus.py, tonnetz.py, dynamics_mapper.py,
                            midi/musicxml/csv generators), 33 pytest tests
scripts/                    13 SQL schema/seed files, start.sh, smoke_test.sh
public/theory/              ~58 theory markdown docs (RSCH-01..43, mckenney_lacan_appliced_2025_11_19/ with 55 files)
docs/                       26 md + plans/, research/, standards/ (planning, audits, self-critique)
```

### 1.3 Package manifests

- `package.json` (root): version `1.0.0` despite README "v3.7"; scripts `test: vitest`, `test:e2e: playwright test` (`package.json:3,16-17`).
- `ml/psychoscore/requirements.txt`, `requirements-mac.txt`; `ml/psychoscore_v2/requirements_v2.txt`; `mpn_engine/requirements.txt`.
- No `pyproject.toml`/`setup.py` for either Python package.

### 1.4 Tests actually present vs README

| Suite | Files | Cases (static count) | Evidence of a run |
|---|---|---|---|
| Vitest (`src/**/*.{test,spec}.*`) | 38 | 639 `it()`/`test()` | 5 logs in `test-reports/`; last: **658 passed / 0 failed** (37 files) `test-reports/test-run-20260205-102328.log` |
| Playwright (`tests/*.spec.ts`) | 8 | 167 `test()` | `test-results/.last-run.json`: `"status": "failed"`, 88 failed test IDs |
| pytest `ml/psychoscore_v2/tests/` | 9 | 108 `def test_` (test_all_modules 31, test_v3_features 20, test_mckenney_lacan 19, test_api_integration 15, test_export_endpoint 9, test_group_gnn 5, test_v2_endpoint 5, test_music_analysis 3, test_voice_endpoint 1) | **none** in repo |
| pytest `ml/psychoscore/tests/test_server.py` | 1 | 16 (whole module `skipif` server not running, `:31`) | none |
| pytest `mpn_engine/tests/` | 2 | 33 (16 calculus + 17 tonnetz) | none |

README claims (`README.md:7,313,328-336,353,388`): "84 passing"; table rows Speech 10 + Audio 7 + OctupleMIDI 6 + Group GNN 5 + v2 Endpoint 5 + McKenney-Lacan 19 + API Integration 13 + Export 9 = **74**, not 84. `docs/PHASE_AUDIT_COMPLETE.md:552-561` gives a different breakdown (test_all_modules 38, api 13, export 9, v2 5, mckenney 19 = 84) and quotes "84 passed, 4 skipped in 1.33s" with no log. Actual static counts in those files are 31/15/9/5/19 = 79. Many Python tests mock the heavy dependencies at import (`tests/test_v2_endpoint.py:12-14`, `tests/test_voice_endpoint.py:6-9`, `tests/test_music_analysis.py:9-10`) so they test routing/shape, not model behaviour.

### 1.5 Docker / deploy

- `Dockerfile`: 3-stage Node 20 alpine build of the Next.js app (`Dockerfile:1-45`).
- `docker-compose.yml`: services `mpn-app` (port 3001→3000), `mpn-postgres` (`pgvector/pgvector:pg16`, init from `scripts/init_db.sql`, `:44-49`), `ace-step` (build context `./ml/ace_step`, `Dockerfile.mps`, `:67-69`) and `ace-step-gpu` profile. **`ml/ace_step/` is empty in the repo**, so the default compose stack cannot build. `.dockerignore:5` excludes `ml` from the app image.
- Hard-coded secret: `docker-compose.yml:26` `ELEVENLABS_API_KEY=sk_b7544b2…`.
- `.env.example` references `PSYCHOSCORE_SERVER_URL=http://localhost:8001` and `TEXT2MIDI_ENDPOINT` (`.env.example:7-8`).
- ML Dockerfiles: `ml/psychoscore/Dockerfile`, `Dockerfile.mac`; `ml/psychoscore_v2/Dockerfile{,.ace,.gpu,.mps}`.

### 1.6 Database schema files (`scripts/*.sql`)

| File | Content |
|---|---|
| `init_db.sql:10-160` | `users`, `scores`, `actor_profiles`, `presets`, `sessions`, `leitmotifs`, `plays` |
| `auth_schema.sql:12-60` | `users`, `user_projects`, `access_requests`, `user_activity_log`, `system_config` |
| `setup_pgvector.sql:5-59` | `CREATE EXTENSION vector`; `embeddings vector(1536)`, `psychometric_clusters`, `ai_generations`; ivfflat indexes |
| `enhanced_character_schema.sql:9-11,18-130` | `uuid-ossp`, `vector`, `pg_trgm`; `character_personas` with `personality_embedding vector(768)` (`:79`); `character_backstory`, `character_arcs`, `character_relationships`, `ai_expert_agents`, `processing_audit_log`; PL/pgSQL `compute_psychometric_vector()` (`:392`) |
| `setup_musical_styles.sql:8-75` | `musical_styles`, `style_psychometric_mappings` |
| `complete_psychometric_mappings_part{1,2}.sql` | 61 `INSERT`s of style↔psychometric mapping rows |
| `deep_postgres_optimization.sql`, `phase5_database_optimization.sql`, `enhance_schema_glossary.sql`, `ssml_reference_schema.sql` (vector(384)) | indexes, FTS, glossary, SSML tables |
| `mpn_backup_20260103_234338.dump` (17 KB), `vectors.db` (4.2 MB binary) | opaque dumps |

Note: the wiki says `ADD COLUMN psy_embedding vector(57)` (`src/app/wiki/database/pgvector/page.tsx:79`) — no SQL file defines a 57-dim column; schema uses 768/1536/384.

---

## 2. The psychometric input model

### 2.1 Where "57 dimensions" is defined (IMPL–NOTEST at inference; unit-tested for shape only)

The only executable definition of the 57-vector is `PsychometricProjector.from_psychometric_state` (`ml/psychoscore_v2/models/projector.py:82-150`):

| Index | Block | Names (in code order) | Source lines |
|---|---|---|---|
| 0–3 | DISC (4) | `D`, `I`, `S`, `C` (default 0.5) | `:96-100` |
| 4–8 | OCEAN (5) | `O`, `C`, `E`, `A`, `N` (default 0.5) | `:103-108` |
| 9–11 | RSI (3) | `real` 0.33, `symbolic` 0.34, `imaginary` 0.33 | `:111-114` |
| 12–13 | Core (2) | `trauma` 0.3, `entropy` 0.3 | `:117-118` |
| 14–16 | Dark Triad (3) | `machiavellianism`, `narcissism`, `psychopathy` (default 0.1) | `:121-124` |
| 17–20 | Physics (4) | `hamiltonian_energy`, `ising_spin` (+→1.0/−→0.0), `granovetter_threshold`, `lyapunov_exponent + 0.5` | `:127-131` |
| 21–56 | Cognitive biases (36, one-hot) | `confirmation, anchoring, availability, dunning_kruger, sunk_cost, bandwagon, halo, projection, hindsight, self_serving, negativity, optimism, framing, status_quo, authority, in_group, out_group, attribution, actor_observer, fundamental_attribution, just_world, spotlight, illusion_control, planning_fallacy, normalcy, recency, primacy, peak_end, representativeness, gambler, hot_hand, conjunction, base_rate, regression, survivorship, texas_sharpshooter` | `:136-148` |

The comment at `projector.py:134` says: "This is a placeholder - in production, use learned bias embeddings". `test_all_modules.py:544-552` only checks the forward shape `(2,57)→(2,1,768)`.

**No Dark Tetrad (sadism) anywhere in code** (grep for "sadism" in code: none). "Dark Tetrad" is not mentioned in README either.

### 2.2 The 9-D vector actually used by the calculus

`ml/psychoscore_v2/models/mckenney_lacan_calculus.py:25-51` (IMPL+TEST via `tests/test_mckenney_lacan.py:34-49`):

```python
@dataclass
class PsychometricVector:
    """p = (τ, H, r, s, i, D, I, S, C) ∈ [0,1]^9"""
    tau: float = 0.3; H: float = 0.3
    r: float = 0.33; s: float = 0.34; i: float = 0.33
    D: float = 0.5; I_d: float = 0.5; S_d: float = 0.5; C: float = 0.5
```

The theory doc agrees it is 9-D (`public/theory/mckenney_lacan_appliced_2025_11_19/10_CORE_EQUATIONS.md:44-62`, "∈ [0,1]^9"). OCEAN, Dark Triad, biases and physics are **not inputs to `phi_transform`** (`:537-580`).

### 2.3 TypeScript state (browser pipeline)

`src/components/mpn-lab/psychometric_calculus.ts:26-46` (IMPL+TEST, `src/__tests__/psychometric_calculus.test.ts`):

```ts
export interface PsychometricState {
    trauma: number; entropy: number;
    rsi: { real: number; symbolic: number; imaginary: number };
    disc?: { D: number; I: number; S: number; C: number };
    darkTriad?: { machiavellianism: number; narcissism: number; psychopathy: number };
    biases?: string[];
}
```

`ActorProfile` adds `bigFive?: {O,C,E,A,N}` and `archetype` (`src/components/mpn-lab/leitmotif_generator.ts:10-18`).

### 2.4 Where the input values come from (critical for a paper)

| Path | Mechanism | Status |
|---|---|---|
| Interactive conductor | `trauma`/`entropy` are **hand-authored per frame** in `src/components/mpn-lab/literary_data.ts` (e.g. `:16 trauma: 0.1, entropy: 0.2`) for 13 plays (`hamlet, oedipus, macbeth, medea, antigone, othello, king_lear, dolls_house, hedda_gabler, seagull, uncle_vanya, miss_julie, earnest`), ~232 frames; read at `src/app/mpn-conductor/page.tsx:348-349`. | IMPL (data) |
| RSI from text | keyword counting: `analyzeRSI()` `psychometric_calculus.ts:236-250` over word lists `KEYWORDS_REAL/SYMBOLIC/IMAGINARY` (`:142-144`); the hand-written "analysis" strings contain the words "Real"/"Symbolic" literally (`literary_data.ts:22,28`). | IMPL+TEST |
| Character profile from script (LLM) | `src/app/api/analyze-character-psychometrics/route.ts:136-145` calls OpenRouter `anthropic/claude-3.5-sonnet` with a prompt asking for DISC/OCEAN/DT/RSI/trauma/entropy (`:71-83`). | IMPL–NOTEST (external) |
| Character profile fallback | regex word counts, `normalize = min(1, count/(totalWords*0.02)+0.3)` (`:206-216`); **`entropy: Math.random()*0.3+0.2`** (`:251`). | IMPL–NOTEST |
| `mpn_engine` text scoring | `MPNCalculus.calculate_trauma_R` = narrative-progress ramp + weighted keyword hits + NER-service hits (`mpn_engine/core/mpn_calculus.py:98-133`); `calculate_entropy_H` = punctuation counts (`:135-165`) — **not** Shannon entropy despite the docstring. | IMPL+TEST (`mpn_engine/tests/test_mpn_calculus.py`) |
| Voice | see §6 — untrained heads. | STUB |

### 2.5 Lacanian variables present in code

| Concept | Code | Status |
|---|---|---|
| Real / Symbolic / Imaginary (RSI) | `PsychometricVector.r/s/i`; `rsi_to_mode` (`mckenney_lacan_calculus.py:191-200`); TS `rsiToMode` (`psychometric_calculus.ts:191-198`) | IMPL+TEST |
| Borromean stability (BSI) | `borromean_stability_index` (`mckenney_lacan_calculus.py:445-454`) | IMPL–NOTEST (not covered by `test_mckenney_lacan.py`) |
| objet petit a | `object_petit_a(system_coverage, threat_coverage)` = `max(0,min(1,(1-(S+T-S·T))·2))` (`advanced_extensions.py:212-227`) — inputs are conscientiousness and Dark-Triad composite (`:523-526`); mapped to deceptive-cadence probability etc. (`:230-244`) | IMPL–NOTEST (only imported by no test; `grep` shows sole caller is `compute_extended_musical_parameters`, itself uncalled) |
| Four discourses, jouissance, suture, sinthome, Name-of-the-Father | **no code**; appear only in theory docs (jouissance in 17 doc files, 0 code files) | CLAIMED ONLY |
| Mirror stage, big Other | reference-dictionary prose only (`mpn_reference_data.ts:3734,3756`) | CLAIMED ONLY |

---

## 3. The mathematics as implemented

Two independent implementations exist (Python `mckenney_lacan_calculus.py`, TypeScript `psychometric_calculus.ts` + reference tables) plus a third in `mpn_engine/` and several ad-hoc formulas in server/UI code. They do not agree. Each is transcribed verbatim below.

### 3.1 Trauma τ → dynamics

**Python (IMPL+TEST `test_mckenney_lacan.py:55-77,156-163`)** `mckenney_lacan_calculus.py:58-90`:
```python
def trauma_to_velocity(tau):            # v(τ) = 20 + 107τ
    v_min, v_max = 20, 127
    return int(v_min + tau * (v_max - v_min))
def trauma_to_dynamic(tau):
    if tau < 0.1: 'ppp'; < 0.2: 'pp'; < 0.35: 'p'; < 0.5: 'mp'; < 0.65: 'mf'; < 0.8: 'f'; < 0.9: 'ff'; else 'fff'
```

**TypeScript (IMPL+TEST `psychometric_calculus.test.ts:119-137`)** — `traumaToDynamics` delegates to a table lookup (`psychometric_calculus.ts:162-164` → `mpn_reference_lookup.ts:150-178`). Table rows with `dimension: TRAUMA` in subcategory `volume_level` (`mpn_reference_data.ts:668-745`): `'0.0-0.2' → pp, defaultValue 30`; `'0.4-0.6' → mf, 72`; `'> 0.8' → fff, 118`. Anything else falls to `{velocity: 72, label: 'mf'}` (`mpn_reference_lookup.ts:177`). Consequences: τ∈(0.2,0.4)∪(0.6,0.8] → mf/72; τ=0.2→30, τ=0.21→72; τ=0.8→72, τ=0.81→118. **Non-monotonic and discontinuous.** The tests pass because they only probe τ=0.1, 0.5, 0.9.

**Conductor page (IMPL–NOTEST)** `src/app/mpn-conductor/page.tsx:359-360`: `velocity = round(20 + 107·trauma)`; label thresholds `<0.2 pp, <0.4 mp, <0.6 mf, <0.8 f, else ff` (5 bands, different from the Python 8 bands).

**Synthetic-data generator (v1 training)** `ml/psychoscore/data/generate_synthetic_pairs.py:57-70`: dynamics from **DISC-D**, trauma only overrides at `>0.8 → 'ff'`.

**mpn_engine** `mpn_engine/core/dynamics_mapper.py:157-160`: `velocity = min(127, int(E·100+27) + int(trauma·20))` — dynamics driven by Extraversion; dynamic marking from Extraversion thresholds (`:106-114`).

README "Core Equation" `dynamics = map(τ,[0,1],[pp,fff])` (`README.md:119`) matches only the Python/page formula.

### 3.2 Entropy H → tempo, meter, syncopation

**Python (IMPL+TEST)** `mckenney_lacan_calculus.py:103-162`:
```python
TEMPO_RANGES = {STRATEGIC:(40,60), OPERATIONAL:(80,100), CRISIS:(120,180)}
def entropy_to_stability(H): H<0.4→STRATEGIC; H<0.7→OPERATIONAL; else CRISIS
def entropy_to_tempo(H, sigma=None): t_min,t_max = TEMPO_RANGES[sigma]; return int(t_min + H*(t_max-t_min))
def entropy_to_time_signature(H): H<0.3 '4/4'; <0.5 '3/4'; <0.6 '6/8'; <0.7 '5/4'; <0.85 '7/8'; else 'free'
def entropy_to_syncopation(H): return int(4*H)
def tempo_variance(H, sigma_base=2.0): return sigma_base*(1+2*H)
```
Because the band is chosen by H and the position within the band is also H, tempo jumps discontinuously at H=0.4 (48→88) and H=0.7 (94→162).

**TypeScript (IMPL+TEST `psychometric_calculus.test.ts:139-156`)** `psychometric_calculus.ts:169-186`: same three bands but thresholds `entropy > 0.4 → operational`, `> 0.7 → crisis`; range from table `rhythm-005/006/007` (`mpn_reference_data.ts:335-395`); meter from table `rhythm-001..004` with conditions `< 0.3, 0.3-0.5, 0.6-0.8, > 0.8` (`:255,276,297,318`) → H∈(0.5,0.6) and H>… default `'4/4'` (`mpn_reference_lookup.ts:119`).

**Conductor page** `page.tsx:361-363`: `tempo = H<0.4 ? 40+H·50 : H<0.7 ? 80+(H−0.4)·67 : 120+(H−0.7)·200` (a third, piecewise-continuous variant).

**Inference server (IMPL–NOTEST)** `ml/psychoscore_v2/inference/server_v2.py:229-231`: `tempo = clamp(40,180, int(90 − 30·trauma + 20·entropy + 15·D))` — **trauma lowers tempo**.

**Octuple synthetic data** `ml/psychoscore_v2/scripts/create_octuple_training_data.py:52-53`: `base_tempo = 80 + int(trauma·80)` — **trauma raises tempo**.

**v1 synthetic data** `generate_synthetic_pairs.py:42-55`: `base = 60 + int(entropy·80)`, `+20 if D>0.7`, `+15 if E>0.7`.

README says `rhythm_complexity = H × polyrhythm_coefficient` (`README.md:122`) — **no `polyrhythm_coefficient` exists in code** (grep: none). CLAIMED ONLY.

### 3.3 RSI → mode/key

**Python (IMPL+TEST `test_mckenney_lacan.py:116-130`)** `mckenney_lacan_calculus.py:191-200`:
```python
def rsi_to_mode(r,s,i):
    if r > s and r > i: return 'phrygian'
    elif s >= r and s >= i: return 'ionian'
    else: return 'lydian'
```
**TypeScript** `mpn_reference_lookup.ts:270-278`: `{real:'phrygian', symbolic:'ionian', imaginary:'lydian'}`; `lookupMode` (`:220-243`) instead searches the dictionary for a MODE entry with `trait` matching the dominant register and falls back to `'major'`. Key selection `psychometric_calculus.ts:347-352`: `real>0.6 → 'C# minor'; imaginary>0.6 → 'E Major'; symbolic>0.6 → 'G Major'; entropy>0.8 → 'F# Locrian'; else 'C Major'`.

**Server** `server_v2.py:195-203,223-227`: mode chosen **from trauma only** via `trauma_range` (ionian 0–0.2, lydian 0.1–0.3, dorian 0.2–0.4, mixolydian 0.3–0.5, aeolian 0.5–0.7, phrygian 0.6–0.8, locrian 0.8–1.0; first match in dict order wins) and `key = 'Cm' if trauma > 0.5 else 'C'` (`:267`).

**v1 synthetic training data** `generate_synthetic_pairs.py:23-30`:
```python
MODE_RULES = {('real','low_trauma'):'Dorian', ('real','high_trauma'):'Aeolian',
              ('symbolic','low_trauma'):'Lydian', ('symbolic','high_trauma'):'Mixolydian',
              ('imaginary','low_trauma'):'Phrygian', ('imaginary','high_trauma'):'Locrian'}
```
This **contradicts** README (`README.md:125-127`: Real→Phrygian, Symbolic→Ionian, Imaginary→Lydian) and both calculus modules: the training data maps *Imaginary* to Phrygian/Locrian and never produces Ionian. Key from Openness via `KEY_MAP` (`:34-38`).

### 3.4 DISC → instrument / articulation

**Python (IMPL+TEST)** `mckenney_lacan_calculus.py:226-253`: `argmax(D,I,S,C) → {'D':'brass','I':'woodwind','S':'strings','C':'keyboard'}`; articulation `{'D':'staccato','I':'legato','S':'tenuto','C':'precise'}`.

**TypeScript** `discToInstrument` (`psychometric_calculus.ts:203-217`): argmax then **`Math.random()` pick** from `lookupInstrument(trait)` (orchestration-preset voice lists, `mpn_reference_lookup.ts:284-302`). `selectInstrumentForActor` (`src/lib/psychometric_instrument_mapper.ts:89-149`, IMPL+TEST `src/lib/__tests__/psychometric_instrument_mapper.test.ts`): score = 0.4·DISC-cosine + 0.2 if τ>0.7 & register='real' (+0.15 if τ<0.3 & 'imaginary') + 0.15 if H>0.6 & woodwind + 0.2 if dominant RSI = instrument register, over a 20-instrument table (`:32-60`).

**Theory doc disagrees**: RSCH-39 maps C→Percussion (`public/theory/RSCH-39-MUSICAL_PSYCHOMETRIC_NOTATION.md:143`); code maps C→keyboard.

### 3.5 Tension, dissonance, arrhythmia, clinical health, relationship→interval

`mckenney_lacan_calculus.py` (all IMPL–NOTEST except where noted):
```python
def tension_score(tau,H,bsi): return 0.4*tau + 0.3*H + 0.3*(1-bsi)          # :281-287
def relationship_to_interval(rho): rho>0.7 'P5'; >0.3 'M3'; >-0.3 'unison'; >-0.7 'm2'; else 'tritone'  # :260-274
def dissonance_to_interval(D): D<0.2 'consonant_P5'; <0.4 'mild_M7'; <0.6 'dissonant_m2'; <0.8 'harsh_tritone'; else 'cluster_noise'  # :461-474
def arrhythmia(same_actor): return 0.2 if same_actor else 0.7                 # :481-485
def clinical_health(trauma): return int((1.0 - trauma) * 10)                  # :492-497
```
The continuous dissonance function of RSCH-39 §2.8, `D_ij(t)=||B_i−B_j||² + γ d/dt(B_i·B_j)` (`RSCH-39…md:227-235`), is **not implemented**; only the 5-bin lookup is. TS `chordToTension` (`psychometric_calculus.ts:222-231`, IMPL+TEST) is a substring lookup: `Major 0.1, Minor 0.4, Dim 0.8, Aug 0.7, Tritone 0.9, Cluster 1.0, … +0.1 if '7', +0.15 if '9'/'11'`. TS global tension `tension = rsi.real·0.9 + entropy·0.1` (`:310`) then `tensionToChordType` bins `<0.2 major7, <0.4 minor7, <0.6 dominant7, <0.8 diminished, else augmented` (`:275-281`). `advanced_extensions.py:354-369` has yet another chord→tension map (`major 0.1, minor 0.3, dominant7 0.4, diminished 0.6, augmented 0.65, suspended 0.5, tritone 0.9, cluster 1.0`). `mpn_engine` arrhythmia adds `0.5` for the first beat (`mpn_calculus.py:199-204`) and health returns the string `"n/10"` (`:246-247`).

### 3.6 Lyapunov, BSI, crisis / alert score

`mckenney_lacan_calculus.py:290-384,445-454` (IMPL–NOTEST — none of these are imported by `test_mckenney_lacan.py:15-28`):
```python
def lyapunov_exponent(tau,H): return (tau + H - 0.5) / 2            # range [-0.25, 0.75]
def crisis_detection(lam,bsi): return lam > 0.2 and bsi < 0.3
def lyapunov_to_zone(lam): <0 converging; <0.1 edge; <0.3 chaotic; else hyperchaotic
def lyapunov_to_harmony(lam): <-0.1 major; <0 minor; <0.15 dominant7; <0.3 diminished; else tritone_cluster
def lyapunov_to_rhythm(lam): <0 steady_4_4; <0.1 3_4_or_6_8; <0.2 5_4_or_7_8; <0.3 polyrhythm; else aleatory
def crisis_severity(bsi,lam): 0 unless crisis; else clamp(((0.3-bsi)+(lam-0.2))/0.85, 0,1)
def total_stability(bsi,lam): lam_hat=clamp(lam+0.25,0,1); return 0.6*bsi + 0.4*(1-lam_hat)
def borromean_stability_index(r,s,i): return 1.0 - max(|r-s|,|s-i|,|i-r|)
```
The "Lyapunov exponent" is a **linear function of two hand-set scalars**, not a trajectory-divergence estimate; the theory doc admits it is a "simplified formula" with the justification "The factor of 2 normalizes to reasonable range" (`12_LYAPUNOV_STABILITY.md:52-67`). Conductor page uses `lyapunov = (τ+H−0.5)·0.5` and `borromeanStability = max(0.3, 1−|λ|)` (`page.tsx:353-356`) — a fourth BSI definition. RSCH-39's `detect_seldon_crisis` weighted score (`RSCH-39…md:449-483`) is not implemented in any code file.

### 3.7 Neo-Riemannian P/L/R

**`mckenney_lacan_calculus.py:391-438`** (IMPL–NOTEST): `apply_P` toggles quality; `apply_R`: major → root−3 minor, minor → root+3 major; `apply_L`: major → root+4 minor, minor → root−4 major (correct: C→Em); `apply_PLP = P(L(P(c)))` documented as "Tritone shift" — for C major it yields **A♭ minor** (C→Cm→A♭→A♭m), a hexatonic pole, not a tritone. Selection `select_neo_riemannian_operation(trauma, rsi)`: τ≥0.8 'PLP'; τ≥0.6 'P'; real→'P'; symbolic→'R'; imaginary→'L' (`:424-438`); `rsi_to_neo_riemannian` (`:210-219`, IMPL+TEST `test_mckenney_lacan.py:132-135`) is the RSI-only variant.

**`mpn_engine/core/tonnetz.py:73-133`** (IMPL+TEST): `transform_L` for a major chord returns `Chord((root−1)%12, MINOR)` (`:104-107`), i.e. **C major → B minor**, which is not the neo-Riemannian L (should be E minor). The test `mpn_engine/tests/test_tonnetz.py:74-80` asserts `result.root == 11`, enshrining the error. The docstring itself is confused (`:98`: "C Major → e minor (root C→B)"). `transform_PLP` (`:135-158`) contains "But wait, let me recalculate…" and gives D♭ minor for C major. Trauma→operation: `<0.3 R, <0.6 L, <0.8 P, else PLP` (`mpn_calculus.py:222-229`).

**TypeScript**: no P/L/R application code; only dictionary entries `harmony-…` (`mpn_reference_data.ts:573-660`) and a Three.js torus visualisation (`MPNExperiment_TonnetzGrid.tsx`). README §"Neo-Riemannian Operations" (`README.md:143-147`) is therefore implemented only in Python modules that the served pipeline never calls.

### 3.8 Other "physics"

- Shannon entropy helpers `shannon_entropy`, `normalized_entropy` (`mckenney_lacan_calculus.py:165-184`) — IMPL–NOTEST and **never called** (H is always a hand-set or punctuation-derived scalar).
- Ising Hamiltonian `H = −Σ J_ij σ_i σ_j − μ Σ h_i σ_i` (`advanced_extensions.py:251-282`), psychometric Euclidean distance→interval (`:285-316`), Dark-Triad ADSR table (`:53-102`), bias-susceptibility score `BSS = Σ w_b S_b` (`:135-179`), bias audio effects (`:183-205`) — IMPL–NOTEST, no caller outside the module.
- TS Dark Triad timbre: `DARK_TRIAD_MODULATION = {mach:{detune −10, attack .3, cutoff 2000}, narc:{0,.05,8000}, psych:{0,.01,4000}}`, `detuning = mod.detuning·intensity` (`psychometric_calculus.ts:128-132,255-270`) — IMPL–NOTEST (not asserted in tests).
- Kramers escape rate, catastrophe/cusp, Kuramoto/oscillator synchrony: **no code** (grep hits only Tone.js `oscillator: {type:'sine'}` settings and a scenario title). CLAIMED ONLY (catastrophe theory appears in 18 doc files, e.g. `docs/MCKENNEY_LACAN_PHD_REVIEW_CRITIQUE.md`).
- Lorenz attractor, Turing patterns, percolation, epidemic phase etc. (`src/components/mpn-lab/MPNExperiment_*.tsx`) are decorative visualisations parameterised by τ/H; they do not feed the music.

### 3.9 Consolidated inconsistency table (code vs code vs docs)

| Quantity | Definition A | Definition B | Definition C |
|---|---|---|---|
| BSI | `1 − max pairwise |diff|` (`mckenney_lacan_calculus.py:451-454`) | `min(r,s,i)/max(r,s,i)` (`02_BORROMEAN_TOPOLOGY.md:80`) | `1 − max(r,s,i)` (wiki `implementation-mapping/page.tsx:208`); `max(0.3,1−|λ|)` (`page.tsx:356`) |
| Crisis | `λ>0.2 ∧ BSI<0.3` (code `:302-306`; `12_LYAPUNOV…md:177`) | `λ>0.1 ∧ BSI<0.3` (`10_CORE_EQUATIONS.md:285`) | `BSI<0.3 ∧ H>0.8` (`02_BORROMEAN_TOPOLOGY.md:230`) |
| RSI→mode | Real→Phrygian, Sym→Ionian, Imag→Lydian (code, README) | Real→Dorian/Aeolian, Sym→Lydian/Mixolydian, Imag→Phrygian/Locrian (v1 training data `generate_synthetic_pairs.py:23-30`) | mode from trauma only (`server_v2.py:223-227`) |
| trauma→tempo | none (tempo from H) (calculus) | `−30·τ` (`server_v2.py:231`) | `+80·τ` (`create_octuple_training_data.py:52`) |
| C (DISC)→family | keyboard (code) | percussion (`RSCH-39…md:143`) | — |
| L operator | C→Em (`mckenney_lacan_calculus.py:411-416`) | C→Bm (`tonnetz.py:104-107`, test `:79`) | — |
| dynamics bands | 8 (Python) | 3 + default gaps (TS table) | 5 (`page.tsx:360`) |
| Trauma velocity in TS | table (30/72/118) | theory doc claims TS uses `20+107τ` (`10_CORE_EQUATIONS.md:296-320`) — **false** for the shipped `psychometric_calculus.ts` | — |

---

## 4. The pipeline: input → state → score → MIDI → audio → export

### 4.1 Browser/Next.js pipeline (what a user actually hears)

1. **Input**: scenario frame (hand-authored τ, H, chord, analysis text) `literary_data.ts`; or wizard sliders (`ProcessingWizard.tsx:987-988`); or LLM/regex profile (§2.4). — IMPL.
2. **State**: `ScoreOrchestrator.processFrame(frame, trauma, entropy)` (`score_orchestrator.ts:228-429`, IMPL+TEST `src/__tests__/score_orchestrator.test.ts`): RSI via keywords → `psychometricToMusical` → global tempo/key/mode/dynamics/chord; speaker stave activation decays by 0.1/frame (`:274`). There is **no state machine** beyond this per-frame recomputation and `selectTransformation` thresholds (`leitmotif_generator.ts:243-266`).
3. **Composition**: `GeniusComposer.composeMelody` (`GeniusComposer.ts:147-383`, IMPL+TEST `genius_composer.test.ts`): leitmotif from archetype interval table + DISC root pitch + neuroticism rhythm (`leitmotif_generator.ts:56-100,103-172`); algorithmic path applies "modal transformation" by adding scale-degree offsets index-wise to the motif pitches (`:298-305`, musically dubious), fragmentation, random octave jumps and passing tones (`:351-362`), velocity jitter `dynamic·(0.8+0.2·rand)` (`:371`). Optional AI paths: PSYCHOSCORE server (`:192-224`), HF text2midi (`:229-259`), OpenRouter LLM melody (`:263-293`) — all external, IMPL–NOTEST beyond mocked client tests. Bug: `transformLeitmotif('inverted')` negates `intervals` (`leitmotif_generator.ts:183-186`) but the composer only reads `pitchClasses`; no other file reads `.intervals` (grep) → inversion is inaudible.
4. **Notation**: VexFlow SVG (`ConductorScoreVexFlow.tsx:131-134`), wizard `ScoreRenderer.tsx`. IMPL+TEST.
5. **Playback**: Tone.js `playback_engine.ts` (IMPL+TEST `src/lib/__tests__/playback_engine.test.ts`), `MPNSynthesizer.ts` (synth presets), VSCO-2 samples in `public/audio/samples/` (26 files, 7 instruments).
6. **Export**: MIDI writer (`src/lib/midi_writer.ts:112-160`, hand-rolled MThd/MTrk) IMPL+TEST (`ExportButton.test.tsx`); MP3 via `Tone.OfflineContext` + lamejs (`src/lib/audio_exporter.ts:94-150`) IMPL+TEST; **PDF via jsPDF is a text report** (title, statistics, dramatis personae, per-frame table — `score_exporter.ts:390-590`), not engraved notation; MusicXML `exportToMusicXML` (`:348`) IMPL–NOTEST.

### 4.2 Python inference server (`ml/psychoscore_v2/inference/server_v2.py`)

- `/generate`: `chain_of_thought_planning` (`:261-286`) = the threshold rules in §3.2–3.3 plus `calculate_dynamic_temperature = clamp(0.4,1.5, 0.7 + 0.5H − 0.3τ ± rsi)` (`:211-221`) and `random.choice` instrument picks (`:233-259`). Then `PsychoscoreInference.generate` tries the v1 model and **falls back to `_generate_rule_based`** (`:378-414`), which emits `random.choice(mode_ints)` notes per bar. Because `MODEL_PATH` defaults to `ml/psychoscore/checkpoints/psychoscore/final` (`:427`) which contains no weights, and `AutoModelForCausalLM.from_pretrained` on that directory will fail (`:309-314`, caught at `:330-331`), the served engine is **`"rule-based"` random notes in a scale** unless weights are supplied out-of-band. The `/health` endpoint literally reports `"v1_engine": "rule-based"` (`:104`). IMPL, tested via TestClient in `tests/test_api_integration.py`.
- `/generate-v2/`: stock `facebook/musicgen-small` + optional LoRA + text prompt built from three thresholds (`v2_endpoint.py:101-134`, e.g. "intense dramatic, complex layered, grounded earthy orchestral music"). No projector, no 57-D input; request model accepts only τ, H and RSI (`:24-44`). Tested only with `audiocraft` mocked (`test_v2_endpoint.py:12-14`).
- `/export/midi` returns the bytes it was given (`export_endpoint.py:490-499`); `/export/wav` returns a **5-second 440 Hz sine** (or C-major sine triad) regardless of input (`:452-462,469-484`) — STUB; `/export/pdf` prints "[Music notation rendering requires LilyPond integration]" (`:350-358`) — STUB.
- ACE-Step wrapper `ml/psychoscore_v2/psychoscore_api.py`: converts DISC/OCEAN/DT/RSI/τ/H into text tags by thresholds (`:132-216`) for an external ACE-Step model whose code directory `ml/ace_step/` is empty. IMPL–NOTEST (prompt builder is unit-tested in `test_v3_features.py:499-545`).
- `scripts/generate_music.py`: DPO planner → "skeleton" → **AudioLDM2** text prompt built only from τ and H (`:75-100`: "A melancholic and introspective piano composition that is complex and chaotic…"); the skeleton is not used in the prompt. Output `output/cyborg_composition.wav` is an LFS pointer.

### 4.3 What PSYCHOSCORE training actually consists of

| Stage | Script | Data | What happens | Checkpoint in repo |
|---|---|---|---|---|
| v1 synthetic pairs | `ml/psychoscore/data/generate_synthetic_pairs.py` | 46,000 random Beta-distributed profiles → rule-based `music_params` (`data/synthetic/stats.json`, `synthetic_pairs.jsonl` 46,000 lines) | rules in §3.1–3.3 (no MIDI) | — |
| v1 tokenise | `scripts/run_training_pipeline.py:133-244` | above | `prefix_tokens + [random.randint(0, vocab_size-1)]*rand(100..256)`; `labels = input_ids` (`:204-216`) | `data/tokenized/{train,val,test}` (arrow files LFS) |
| v1 train | `train/train_psychoscore.py`, config `train/config.yaml` (GPT-2, LoRA r=32 α=64 on c_attn/c_proj/c_fc/lm_head, QLoRA nf4) | 46k sequences of random targets | 15 epochs, 17,250 steps, batch 8, loss 40.7→25.08 (`checkpoint-17250/trainer_state.json`); `docs/PHASE_AUDIT_COMPLETE.md:92-94` reports "Train loss 25.08, Eval loss 6.17" as success | tokenizer + `adapter_config.json` only; **no adapter weights** |
| v1 EMOPIA | `data/emopia_loader.py:38-70` maps Russell quadrants Q1–Q4 to τ/H/RSI ranges by hand; download log shows 1,078 clips fetched (`logs/emopia_download.log`) | — | `run_training_pipeline.py` only tokenises `synthetic_pairs.jsonl` (`:153-161`); `data/emopia/` absent | not used |
| v1 "evaluation" | `run_training_pipeline.py:264-323` | 3 profiles | dumps generated token IDs to JSON | `eval_samples/sample_{0,1,2}_trauma_*.json` |
| v2 data | `data/sampler.py`, `scripts/extract_skeletons.py` | 10 MAESTRO MIDI files (`data/processed_midi/`, cached `roszcz___maestro-v1`) | skeleton token strings (`data/skeleton_dataset.jsonl`, 10 lines) | — |
| v2 silver labels | `data/llm_labeler.py` (GPT-4o) | the 10 MIDI | feature extraction failed → error string labelled (§0.3) | `data/silver_labels/*.json` (10) |
| v2 planner LoRA | `scripts/train_planner.py` (distilgpt2, LoRA r=8 α=32, lr 3e-4, 3 epochs, bs 2) | `train_planner.jsonl` (10) | 15 optimizer steps, loss 3.63 | `models/lora_planner/` adapter (LFS pointer, 591 KB) |
| v2 DPO | `scripts/train_dpo.py` (trl `DPOTrainer`, lr 1e-5, `ref_model=None`) | `train_dpo_symbolic.jsonl` (10; rejected = skeleton of a random other clip, `scripts/create_dpo_dataset.py:37-45`) | 15 steps; `rewards/accuracies 0.40`, `rewards/margins −0.287`, `grad_norm 0.0` | `models/dpo_planner/model.safetensors` (LFS pointer 327 MB, full distilgpt2) |
| v2 performance LoRA | `scripts/train_performance.py` | `train_performance.jsonl` (10 wav paths) | loop body is `pass`; loss placeholder `+0.1` (`:138-141`); `save_pretrained` commented out (`:146`) | `checkpoints/lora_performance/adapter_model.safetensors` (LFS pointer 66 MB; `adapter_config.json` targets `out_proj/linear1/linear2` on `audiocraft.models.lm.LMModel`, r=16 — produced by some script not in the repo; README points to an external repo `Planet9V/psychoscore-v2-training`, `README.md:175-182`, `docs/V2_TRAINING_GUIDE.md:73`) |
| v2 CLAP-DPO (audio) | `train/train_dpo.py` | expects `data/preferences/pair_*/{profile.pt,winner.wav,loser.wav}` (`:55-65`) — directory absent | `DPOTrainer(model=musicgen.lm, train_dataset=dataset)` with a comment "simplified version - production would need adaptation" (`:157-163`) | none |
| Octuple transformer | `scripts/train_octuple.py`, `models/compound_transformer.py` | 500 fully synthetic random sequences (`create_octuple_training_data.py:21-43,99-150`) | standard CE training | `checkpoints/octuple/{best,final}_model.pt` (LFS pointers) |
| Speech head | — | 1,440 RAVDESS wav (`data/speech_training/audio_32k/`) labelled by a hand table emotion→(τ,H,"rsi") (`scripts/download_high_fidelity.py:78-89`, e.g. angry → τ 0.6, H 0.9, rsi 0.9) | **no training script exists** for `Wav2Vec2ForPsychometrics` (`models/speech_emotion.py`) or the `speech/` heads | none |

`config/config_v2.yaml` describes `facebook/musicgen-medium`, LoRA r=32 on q/k/v/out_proj, `laion/larger_clap_music`, 3 epochs — none of which matches the shipped adapters (small model in endpoint, r=16 on linear1/linear2). `README.md` in `ml/psychoscore_v2` references `train/train_lora.py` (`:20`), which does not exist. The `wandb/` directory holds one offline run from 2026-01-20 with only debug logs.

**Is there a trained checkpoint?** No usable one: every weight file is a Git-LFS pointer (133 bytes) and the v1 final directory has no adapter at all. Even if fetched, the provenance above shows: v1 = random targets; v2 planner/DPO = 10 error-derived examples, 15 steps; performance LoRA = unknown external script.

---

## 5. Wiki and theory documents

### 5.1 Wiki pages (57 `page.tsx` under `src/app/wiki/`; README says 34)

| Path (`src/app/wiki/…`) | One line |
|---|---|
| `page.tsx` | Wiki landing; lists sections |
| `index/`, `navigation/`, `sitemap/`, `use-cases/` | navigation/index pages |
| `architecture/overview/` | Next.js + FastAPI + Postgres diagram; asserts "57D → 768D" (`:239`) |
| `architecture/components/`, `data-flow/`, `production-audio/` | component matrix, data flow, ACE-Step/ElevenLabs audio plan |
| `ai/psychoscore/` (+ `api/`, `architecture/`, `dimensions/`, `input-specification/`, `training/`) | PSYCHOSCORE description; "57D Input Space"; training pipeline narrative |
| `ai/audio-models/`, `ai/audio-alternatives/`, `ai/elevenlabs-api/`, `ai/voice/` | MusicGen/AudioLDM/ACE-Step notes; ElevenLabs TTS |
| `api/wizard/` | wizard REST description |
| `database/schema/`, `optimization/`, `jsonb-optimization/`, `pgvector/` | schema & pgvector notes (incl. unimplemented `vector(57)` column) |
| `deployment/docker/`, `env-config/`, `quickstart/` | deployment |
| `development/phase-audit/`, `implementation-timeline/`, `tasks-history/` | ICE audit ("84 passed, 4 skipped", `phase-audit/page.tsx:157`), timeline |
| `features/psychometric/`, `physics/`, `frameworks/`, `leitmotif/`, `orchestration/`, `export/` | feature descriptions ("40+ Theoretical Frameworks") |
| `features/wizard/` (+ `genre-selection/`, `instrument-assignment/`, `playback-controls/`, `wizard-process/`) | wizard UI docs |
| `getting-started/keyboard-shortcuts/`, `wizard-quickstart/`, `tutorials/create-first-score/` | how-to |
| `reference/glossary/` | glossary |
| `testing/`, `testing/prerequisites/`, `run-history/`, `lessons-learned/` | test docs (run-history is prose, no artefacts) |
| `theory/implementation-mapping/` | "Rosetta Stone" equations table (see 5.2) |
| `theory/mckenney-lacan/` (+ `calculus-of-subject/`, `ggnn-simulation/`, `unified-codex/`) | theory essays rendered as pages |
| `troubleshooting/audio/`, `common-issues/`, `performance/` | troubleshooting |

### 5.2 "Theory → Implementation" mapping page, key table (`src/app/wiki/theory/implementation-mapping/page.tsx:164-212`)

| Input | Equation (as printed) | Output | Function |
|---|---|---|---|
| trauma (τ) | `v(τ) = 20 + 107τ` | MIDI velocity 20–127 | `trauma_to_velocity()` |
| trauma (τ) | `δ(τ) → dynamics` | ppp → fff | `trauma_to_dynamic()` |
| entropy (H) | `T(H,σ) = T_min + H×ΔT` | 40–180 BPM | `entropy_to_tempo()` |
| entropy (H) | `μ(H) → time sig` | 4/4, 5/4, 7/8, free | `entropy_to_time_signature()` |
| RSI (r,s,i) | `M(r,s,i) → mode` | Ionian/Phrygian/Lydian | `rsi_to_mode()` |
| DISC | `I(DISC) → family` | Brass/Strings/Keys | `disc_to_instrument_family()` |
| τ, H | `λ = (τ+H−0.5)/2` | Lyapunov exponent | `lyapunov_exponent()` |
| RSI balance | `BSI = 1 − max(r,s,i)` | Borromean stability | `borromean_stability_index()` (**code differs**, §3.9) |

Page also claims "900+ lines … Theory integration is 95% complete" (`:96-98`) — the two modules exist but are not on the served path (§4.2).

### 5.3 Core theory docs a paper author can cite (all under `public/theory/`)

- `RSCH-39-MUSICAL_PSYCHOMETRIC_NOTATION.md` (559 lines, dated 2025-12-29, "AEON CORE INTERNAL // TIER 1", authors "Multi-Agent Panel"). Origin is **security-operations sonification** (SOC, SIEM, Neo4j): §2.2 clefs = War Room/Boardroom/Ops Floor tempo bands 120–180/40–60/80–100 (`:60-81`) — the same numbers reused as "stability bands" in the calculus; §2.5 DISC→instrument (C→Percussion, `:134-172`); §2.6 OCEAN→dynamics `volume = int(E·80+40)` (`:175-199`); §2.7 register→P/L/R and `select_neo_riemannian(trauma_R, baseline_B)` (`:201-225`); §2.8 dissonance `D_ij(t)` (`:227-245`); §2.9 arrhythmia 0.2/0.7 (`:247-260`); §2.10 health `⌊(1−R)·10⌋` (`:262-277`); §5.2 asserts "retrospective analysis of 15 Seldon Crisis events: average lead time 22 minutes" with **no data, method or source** (`:485-494`).
- `mckenney_lacan_appliced_2025_11_19/10_CORE_EQUATIONS.md` — Φ: P→M, 9-D vector, §2–§7 equations (transcribed in §3 above; `:44-62,78-118,140-186,196-232,242-265,315-347`).
- `11_ENTROPY_CALCULUS.md` — Shannon `H = −Σ p log₂ p`, normalised `Ĥ = H/log₂ n` (`:31-49`); `μ(Ĥ)` meter table (`:101-107`); `σ_T = σ_base(1+2Ĥ)` (`:127`); syncopation `⌊4Ĥ⌋` (`:160`); stability bands (`:214-217`).
- `12_LYAPUNOV_STABILITY.md` — classical definition quoted (`:31-33`), then `λ_MPN=(τ+H−0.5)/2` "approximation" (`:60`), zones (`:88-92`), harmony/rhythm maps (`:113-130`), `S_total = 0.6·BSI + 0.4·(1−λ̂)` (`:148-158`), crisis and severity (`:177-187`).
- `13_NEO_RIEMANNIAN_MATH.md`, `02_BORROMEAN_TOPOLOGY.md` (BSI = min/max, `:80`; crisis `BSI<0.3 ∧ H>0.8`, `:230`), `04_MATHEMATICAL_FOUNDATIONS.md`, `17_ACADEMIC_REFERENCES.md`, `50_BIBLIOGRAPHY.md`.
- `README.md` of that folder cites a **non-resolving DOI** `10.5281/oxot.mpn.2025.3.0` (`:9,139`).
- Long-form essays: `mckenney-lacan_calculus of the Subject.md`, `mckenney_lacan_simulating_calculus_via_gGNN.md`, `mckenney_lacan_Omega_Grand_Sythesis_United_Codex.md`, `MPN_ACADEMIC_DISSERTATION.md` (1,177 lines).
- The repo's own reviewer document `docs/MCKENNEY_LACAN_PHD_REVIEW_CRITIQUE.md` (2026-02-04): "Zero empirical validation", "Mathematical errors – False claims about isomorphisms", "Category confusion", "No Methods, Results, Limitations" (`:18-26`); "ML researchers will reject the unimplemented model: No code, no benchmarks, no baselines" (`:540-545`).

---

## 6. Voice / speech analysis: real or stub?

| Component | Backbone | Head | Weights for head | Training script | Verdict |
|---|---|---|---|---|---|
| `speech/wav2vec_encoder.py` | `facebook/wav2vec2-large-xlsr-53` via HF (`:40,72-77`) — real | `Linear(768,128)→ReLU→Dropout→Linear(128,3)→Sigmoid` for arousal/valence/dominance (`:57-64`) | none (`grep load_state_dict speech/` → none) | none | backbone real, AVD output = random-init MLP → **STUB** |
| `speech/whisper_transcriber.py` | Whisper via `WhisperForConditionalGeneration` (`:62-63`) | — | n/a | n/a | transcription real (IMPL–NOTEST with real model; tests use `load_pretrained=False`) |
| `speech/personality_detector.py` | `xlm-roberta-base` (`:55,98-99`) | Big-Five head 768→256→5, Dark-Triad head 768→128→3 (`:71-86`) | none | none | **STUB** |
| `speech/fusion_module.py` | — | MLP 1536→512→256→17 + confidence head (`:97-114`); trauma override `arousal·0.9`, entropy `|0.5−valence|·2` (`:198-200`) | none | none | **STUB** |
| `models/speech_emotion.py` | `wav2vec2-base-960h` | 768→256→3 (τ,H,"rsi" scalar) | none | none; RAVDESS labels exist (`download_high_fidelity.py:78-89`) but nothing consumes them | **STUB** |
| `audio_analysis/clap_embedder.py` + `psychometric_regressor.py` | CLAP (`laion_clap`) | 512→256→128→5 (`psychometric_regressor.py:57-58,73-83`); docstring "Trained on labeled music-psychometric pairs" (`:5`) | none | none | **STUB / CLAIMED ONLY** |
| `models/group_gnn.py` | GAT layers (`:79-168`) | six 1-D heads (`:210-215`) | none | none | **STUB** (tests check shapes, `tests/test_group_gnn.py`) |
| Endpoints `speech/voice_endpoint.py`, `audio_analysis/{voice,music,group}_endpoint.py` | wire the above | | | | routing real; outputs meaningless |

README's "Wav2Vec2 XLSR — Multilingual emotion detection / XLM-RoBERTa — Personality from text / Fusion Module" (`README.md:74-77`) is therefore **CLAIMED ONLY** as a working capability.

---

## 7. Evidence quality

### 7.1 Datasets present

- 46,000 synthetic rule-generated profile→param pairs (`ml/psychoscore/data/synthetic/`), no audio/MIDI.
- 10 MAESTRO v1 MIDI clips (`ml/psychoscore_v2/data/processed_midi/`) + 10 rendered wavs (`data/audio_renders/`, LFS pointers).
- 1,440 RAVDESS speech wavs (`data/speech_training/audio_32k/`, LFS) + hand emotion→(τ,H) table.
- 500 synthetic Octuple sequences (`data/octuple_training/train_octuple.jsonl`).
- EMOPIA downloaded per log (`ml/psychoscore/logs/emopia_download.log`) but not present and not consumed.
- 13 hand-annotated plays (`literary_data.ts`, `additional_plays.ts`) — annotation by the author, single rater, no codebook.

### 7.2 Evaluation results, listening tests, metrics, benchmarks

- **None.** Searches for listening test / MOS / inter-rater / participants / FAD results / p-values return only plans and checklists (`docs/plans/mpn_master_implementation_plan.md:682-786`, `docs/plans/psychoscore_training_plan.md:587-610`, `docs/PHASE_AUDIT_COMPLETE.md:117-139,389-401`: "6.4 Human evaluation ← PENDING", "FAD Score calculation" unchecked).
- `ml/psychoscore_v2/scripts/calculate_fad.py` exists; no output.
- `scripts/evaluate_v1.py` computes perplexity/token accuracy of the random-target model; no result file.
- `src/app/mpn-lab/ab-test/page.tsx`: two hard-coded samples, ratings in `useState`, never persisted (`:14,22`).
- `src/components/mpn-lab/MPNEvaluationSection.tsx:9-41` shows numeric "scores" for visualisations (e.g. Tonnetz total 50, Borromean 59) with no provenance — presentational.
- `docs/plans/score_critique.md` is an internal critique of the algorithmic composer ("all notes get identical durations", `:21-30`).

### 7.3 Literature references inside the repo

In **code** (docstrings): Hung et al. 2021 EMOPIA (`ml/psychoscore/data/emopia_loader.py:14-15`); Livingstone & Russo 2018 RAVDESS, Zenodo 1188976 (`ml/psychoscore_v2/scripts/download_speech_datasets.py:142,212`); Riemann 1880 (`mpn_engine/core/tonnetz.py:8`); HF model IDs (`facebook/wav2vec2-large-xlsr-53`, `xlm-roberta-base`, `facebook/musicgen-small/medium`, `laion/larger_clap_music`, `amaai-lab/text2midi` `src/lib/text2midi_client.ts:52-53`, `openai-community/gpt2`, `distilgpt2`).

In **theory docs** (`17_ACADEMIC_REFERENCES.md`, `50_BIBLIOGRAPHY.md`, `RSCH-39…md:551-559`): Marston 1928; Costa & McCrae 1992; Goldberg 1990; Paulhus & Williams 2002; Jones & Paulhus 2014; Lacan *Écrits* 1977, Seminar XI, Seminar XXI; Wagner 1851; Grey 1995; Riemann 1880; Cohn 1998 *JMT* 42(2); Lewin 1987; Juslin & Sloboda 2010; Gabrielsson & Juslin 1996; Hevner 1935; Lyapunov 1892; Strogatz 2015; Bak, Tang & Wiesenfeld 1987; Shannon 1948; Kahneman 2011; Tversky & Kahneman 1974 (DOI 10.1126/science.185.4157.1124); Asimov 1951/1952 (explicitly "fictional concept adapted"); Kramer 1994; Hermann, Hunt & Neuhoff 2011; Milnor 1957; Festinger 1957.

DOIs found in the tree (37 unique, all inside `public/theory/OXOT_BUSINESS_CASE/…` and `mckenney_lacan_appliced_2025_11_19/`; **zero in code**): e.g. 10.1002/per.1874, 10.1002/per.544, 10.1007/BF02310555, 10.1016/0191-8869(93)90068-V, 10.1016/S0092-6566(02)00505-6, 10.1016/j.paid.2007.02.024, 10.1016/j.paid.2016.04.045, 10.1037/0003-066X.51.5.469, 10.1037/0003-066X.60.2.161, 10.1037/0022-3514.59.6.1216, 10.1037/0022-3514.83.2.340, 10.1037/a0012981, 10.1037/a0015934, 10.1057/palgrave.sj.8350008, 10.1057/sj.2015.12, 10.1080/00223890701468568, 10.1080/00223891.2012.728541, 10.1080/09546550802073367, 10.1080/1478601X.2010.480025, 10.1111/j.1559-1816.2010.00589.x, 10.1111/j.1745-6916.2007.00047.x, 10.1126/science.185.4157.1124, 10.1126/science.211.4481.453, 10.1145/1290865.1290895, 10.1145/2835375, 10.1146/annurev.ps.41.020190.002221, 10.1207/s15327663jcp1503_8, 10.1287/orsc.2014.0929, 10.3389/frobt.2019.00079, 10.5465/amr.2005.17293321; plus two placeholders/fabrications: `10.1037/0000000-000` (`Enhancement_04_Psychometric_Integration/DATA_SOURCES.md:26`) and `10.5281/oxot.mpn.2025.3.0` (`mckenney_lacan_appliced_2025_11_19/README.md:9`). None of these papers concern music generation or music–personality mapping; the music-psychology citations (Hevner, Gabrielsson & Juslin, Juslin & Sloboda) are cited but no threshold in the code is traced to them.

---

## 8. Git history

- 36 commits, 2026-01-01 ("Initial commit from Create Next App") → 2026-02-06; full history (not shallow).
- Authors: `Planet9V` (27), `Jim M` (9).
- Two mega-commits carry most of the tree: `144c909` (2026-01-22, 3,097 files, +631,901 lines) and `b9a6a01` (same day, 453 files, +1,941,914 lines — the audio/data dump), both titled "feat: v3.7 - Wiki 100%, PSYCHOSCORE v2, dual-platform".
- Themes by date: Jan 1–4 scaffolding, VexFlow, PDF, style presets, "Complete All 152 Psychometric → Style Mappings"; Jan 5 PSYCHOSCORE v1 + wiki; Jan 10 Docker, auth, "Dark Triad emotion mapping"; Jan 22 v2 + wiki; Feb 4–6 Tone.js playback engine, VSCO samples, ElevenLabs SFX, Git LFS.
- The entire system — theory docs, two ML pipelines, 57 wiki pages, ~640 unit tests — was produced in 5 weeks, with claude-flow agent scaffolding checked in (`CLAUDE.md`, `.claude-flow/`, `claude-swarm/`), and test/doc text bearing agent-style phrasing ("But wait, let me recalculate…" in `tonnetz.py:150`).

---

## 9. What a scientific paper can honestly claim from this codebase — and what it cannot

### 9.1 Can claim (with the cited files)

1. **A deterministic, rule-based mapping from a 9-scalar psychometric state (τ, H, r, s, i, D, I, S, C) to symbolic musical parameters** exists, is specified in prose/LaTeX (`10_CORE_EQUATIONS.md`) and implemented twice (Python `mckenney_lacan_calculus.py`, TS `psychometric_calculus.ts`), with unit tests checking ranges and monotone endpoints. The exact functions are those transcribed in §3.
2. **An interactive Next.js application** renders those parameters as multi-stave notation (VexFlow) and plays them (Tone.js) for 13 hand-annotated dramatic scenarios, with MIDI and MP3 export (browser side) — IMPL+TEST.
3. **Neo-Riemannian P/L/R operators are implemented in Python** (`mckenney_lacan_calculus.py:397-421`) with a trauma/RSI-based selector; a stand-alone text→CSV/MIDI engine (`mpn_engine/`) applies them to dialogue beats. (Caveat: `mpn_engine`'s L is wrong and its PLP is not a tritone; state which implementation you use.)
4. **Infrastructure exists** for a FastAPI inference service, Postgres+pgvector schemas, and LoRA/DPO training scripts around MusicGen/distilgpt2 — as engineering scaffolding, not as trained systems.
5. **A design proposal** for a 57-dimensional input (DISC 4 + OCEAN 5 + RSI 3 + τ/H 2 + Dark Triad 3 + physics 4 + 36 one-hot biases) is specified in code (`projector.py:82-150`) — as a proposal only.

### 9.2 Cannot claim yet (blunt)

1. **Any learned psychology→music model.** v1 was trained on random tokens; v2 planner/DPO on 10 error-derived labels for 15 steps; performance LoRA training loop is `pass`; no weights ship. Do not cite "PSYCHOSCORE" as a trained model.
2. **The 57-D vector as an input to anything that generates music.** It is projected and then discarded (`musicgen_lora.py:124-141`); the live endpoint accepts 5 scalars and builds a three-adjective text prompt.
3. **Voice/personality extraction.** Heads are untrained; outputs are noise around 0.5.
4. **"CLAP-based DPO alignment", "Chain-of-Thought musical reasoning", "hierarchical LoRA".** CoT is eight threshold rules (`server_v2.py:261-286`); CLAP-DPO dataset directory does not exist; hierarchy is two unrelated tiny runs.
5. **Any validity of the mapping** (that τ→loudness, H→tempo, Real→Phrygian, D→brass reflect perception or personality science). No listening test, no inter-rater reliability, no participants, no statistics; the repo's own reviewer file says so (`docs/MCKENNEY_LACAN_PHD_REVIEW_CRITIQUE.md:20,534`).
6. **"Lyapunov exponent", "Shannon entropy", "Borromean stability", "Ising Hamiltonian", "objet petit a" as computed quantities.** λ is `(τ+H−0.5)/2` of two hand-set numbers; H is hand-set or punctuation counts; BSI has 3–4 mutually inconsistent formulas; Ising/objet-a functions are never called on the served path.
7. **"84 passing tests" / "34 wiki pages" / "22 phases complete".** Counts are wrong (see §1.4, §5.1) and the phase audit's own table lists human evaluation and FAD as pending.
8. **Any early-warning or clinical claim** ("15–30 minute early warning", "22-minute lead time", "therapists can track a client's state") — RSCH-39 §5.2 has no data; the clinical health score is `int((1−τ)·10)`.
9. **Consistency of the theory itself**: before publication the authors must choose one BSI, one crisis rule, one RSI→mode table, one trauma→tempo sign, and fix the `mpn_engine` L operator and its test.
10. **Reproducibility of the ML stack**: `ml/ace_step/` empty, external training repo required, LFS blobs absent, hard-coded API key, no pytest run artefacts.

**Honest framing for a paper:** "a rule-based sonification design and prototype for dramatic text, with a proposed (unvalidated) psychometric input space and untrained ML scaffolding," not "an AI system that generates music from a 57-dimensional psychometric vector."
