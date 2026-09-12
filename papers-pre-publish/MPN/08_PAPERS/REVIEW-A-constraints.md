# Review A — Constraint Guardian

**Subject:** Block A, assertions A1–A11, `/home/claude/ms-drafts/ASSERTIONS-REGISTER.md`, supported by `/home/claude/ms-drafts/S1-mckenney-lacan-theory.md`.
**Reviewer's mandate:** feasibility only. Nothing below is an opinion about whether an assertion is *good*, *interesting* or *true*. Every judgement is of the form: here is what it would take to find out, here is what that costs, and here is whether it can be done at all.
**Date:** 2026-09-12

---

## 0. Method, and the numbers this review is built on

Four constraint facts govern everything that follows. They are measured, not assumed.

**F1. The annotated corpus is 232 frames across 13 plays, and it is not 232 independent observations.**
`src/components/mpn-lab/literary_data.ts` (119 frames) + `additional_plays.ts` (113 frames) = 232 frames carrying a hand-authored `(trauma, entropy)` pair. Distribution by play: hamlet 50, macbeth 39, oedipus 30, othello 15, king_lear 13, medea 12, antigone 12, dolls_house 12, hedda_gabler 10, seagull 10, miss_julie 10, earnest 10, uncle_vanya 9. There are 83 distinct speakers; the median speaker has **2 frames**. Antigone the character has **2 frames** in the whole library. Mean 17.8 frames per play. At a within-play intraclass correlation of 0.3 — conservative for scenes from one drama rated by one person — the design effect is 6.1 and the **effective sample size is 38, not 232**. This single fact determines most of the verdicts below.

**F2. Trauma and entropy in the existing annotations correlate at r = 0.280** (n = 232). τ: mean 0.597, sd 0.250, range 0.10–1.00. H: mean 0.524, sd 0.193, range 0.10–1.00. This is favourable to A5 and fatal to A8, for reasons given under A8.

**F3. The implementation is not deterministic.** `GeniusComposer.ts` calls unseeded `Math.random()` at nine points in the composition path (`:351, :356, :361, :371, :403, :410, :413, :419, :539`), and `psychometric_calculus.ts:216` picks the instrument by `Math.random()`. One input state therefore produces a different score on each run. Every listening study in the programme is blocked until this is fixed, because two listeners cannot be given the same stimulus. A separate input path sets `entropy: Math.random()*0.3+0.2` outright (`src/app/api/analyze-character-psychometrics/route.ts:251`).

**F4. Several constants named in the register exist in three incompatible versions, or in none.** Detailed in §3. Most consequentially, A4's modal assignment (Real→Aeolian/Dorian, Symbolic→Mixolydian/Lydian, Imaginary→Locrian/Phrygian) matches **no shipped implementation**: the Python calculus and the theory document both say Real→Phrygian, Symbolic→Ionian, Imaginary→Lydian, and neither implements a trauma switch at all.

**Cost model used throughout.** Rater time at $40/h (graduate-level, trained, honorarium scale). Professional composer time at $120/h. Listener panel at $15 per 30-minute session. Annotation throughput, from the observed density of the material: 2.5 min per frame for a 3-item rating with context; 4 min per frame for a 5-item rating; 5 min per character for a stable 4-item DISC profile. Per-rater training and calibration overhead: 6 h (codebook 2 h, 30-frame calibration set 1.5 h, adjudication 1.5 h, re-calibration 1 h). These are order-of-magnitude figures with the arithmetic shown so they can be argued with.

---

## 1. The assertions

### A1. The state is nine-dimensional, and these are the nine

**What would have to be measured, by whom, with what instrument.** Nine numbers per character per frame. τ, H, r, s, i are frame-level; D, I, S, C are character-level (they are stipulated in S1 §3.1 as carrying disposition rather than situation, so they are constant within a play). The redundancy test the register proposes — "test whether any component is predicted by the rest" — is a set of nine leave-one-out regressions with eight predictors each. Raters: trained readers, minimum three for ICC(2,3). Instrument: **does not exist.** There is no codebook, no anchor set, no calibration corpus for any of the nine.

**Binding constraint: statistical power under play-level clustering (F1).** A regression with eight predictors needs 10–15 observations per predictor to be worth reporting, i.e. 80–120 *effective* observations. The current corpus supplies 38. The shortfall is not in raters or money; it is in plays. To reach an effective n of 100 at the same clustering you need roughly 610 raw frames, which at the current 17.8 frames per play means **about 35 plays**, not 13.

**Cost to satisfy.** Author ~380 new frames across 22 further plays (selection plus authoring, ~2 h per play = 44 h). Then annotate 612 frames × 5 frame-level items (41 h/rater) plus ~180 characters × 4 items (15 h/rater) plus 6 h training = 62 h per rater × 3 raters = **186 rater-hours ≈ $7,400**, plus 44 authoring hours. Calendar: 6–9 months, dominated by corpus authoring and rater scheduling.

**Also note, without arguing the merits:** the redundancy test can only find a component redundant *as the raters use it*. If the codebook tells raters that entropy is the disorder of symbolic organisation and trauma is unresolved weight, and they comply, the test partly measures the codebook. That is a design cost, not a fix: it means the codebook must be written before anyone sees the hypothesis, and the raters must be blind to A1.

**Verdict: FEASIBLE AFTER STATED WORK.** The stated work is corpus expansion to ~35 plays plus a nine-component annotation protocol. Not obtainable from the current library at any price.

---

### A2. The Lacanian registers admit magnitudes

**What would have to be measured, by whom, with what instrument.** Inter-rater reliability of r, s, i on the same passages. The statistic is ICC(2,k) — two-way random, absolute agreement — reported with a 95% confidence interval, not a point estimate. Raters: readers competent in Lacan, which is the scarce input. Instrument: **does not exist**, and this is the single most important absence in the programme (see §5).

**Binding constraint: no rating instrument.** Reliability cannot be estimated without an instrument to be reliable *at*. The instrument required is modest but real: three unconstrained 0–100 scales with written behavioural anchors at 0, 50 and 100 for each register; a 30-frame calibration set with adjudicated reference values; a written adjudication rule for disagreement; and a published reliability result.

**Cost to satisfy.** Instrument construction: ~40 h of authoring plus a 2-rater pilot on 30 frames (~5 h). Main pass on the existing 232 frames: 232 × 2.5 min = 9.7 h + 6 h training = 15.7 h per rater. Recruit 5, expect 3–4 usable: 5 × 15.7 = 79 h ≈ **$3,100, plus ~45 h of instrument authoring**. Calendar 8–12 weeks.

**Power is not the constraint here, and this is worth stating because it is unusually good news.** For the reliability statistic itself, each frame is a subject, and clustering does not bite the same way: with 3 raters, an n of about 45 frames suffices to put the lower bound of a 95% CI above 0.75 for a true ICC of 0.80. The 232 frames are over-sufficient. What the corpus cannot support is the *hypothesis tests* built on the ratings (A1, A3, A10), because those must respect play-level clustering.

**Verdict: FEASIBLE AFTER STATED WORK.** The work is ~125 hours and about $3,000. This is the cheapest instrument-building job in the set and it unblocks five other assertions.

---

### A3. The registers are competitive, and the state lives on a simplex

**What would have to be measured.** The 3×3 correlation matrix of r, s, i, rated **without** the sum-to-one constraint. Same instrument as A2, same pass, no extra rating cost.

**Binding constraint: effect size against clustered n.** The simplex makes a strong prediction. For a three-part composition the expected pairwise correlation is about −0.5; the cube predicts about 0. Fisher-z sample sizes at α = .05 two-tailed, 80% power: distinguishing ρ = −0.5 from 0 needs **n = 29**; distinguishing ρ = −0.3 from 0 needs **n = 85**. The current corpus supplies an effective n of 38 (F1). So the existing 232 frames can decide the strong version and cannot decide the weak version. That is an acceptable position, provided the paper states the strong version is what is being tested and does not report a null at ρ = −0.2 as support for the cube.

**Cost to satisfy.** Zero beyond A2 — it is the same annotation pass, analysed differently. Marginal cost: about 4 hours of analysis.

**One caution that is a cost, not a criticism.** The register says Antigone "is the interesting case." Antigone the character has 2 frames in the library and the play has 12. A single-play sub-analysis on 12 frames has no power at all. If Antigone is to carry argumentative weight, that play needs annotating at 40–60 frames, which is ~4 h of authoring and adds ~3 h per rater.

**Verdict: FEASIBLE AFTER STATED WORK** — and the shortest path in the set. Once A2's instrument exists, A3 costs one analysis afternoon.

---

### A4. The dominant register selects the mode, with trauma as the second switch

**What would have to be measured, by whom, with what instrument.** Whether listeners hear the assigned modes as carrying the assigned registers. Three instruments are needed and **none of them exists**:

1. *A settled modal table.* There are three incompatible ones. The shipped Python (`mckenney_lacan_calculus.py:189-199`) and the theory document (`10_CORE_EQUATIONS.md §4.1`) both give Real→Phrygian, Symbolic→Ionian, Imaginary→Lydian. The v1 training-data generator gives Real→Dorian/Aeolian, Symbolic→Lydian/Mixolydian, Imaginary→Phrygian/Locrian — which is the register's A4. A third path derives mode from trauma alone. **No implementation contains the trauma switch θ = 0.6 at all**; `rsi_to_mode` takes three arguments and τ is not one of them. You cannot run a listener study against an assignment that has not been chosen.
2. *A way of asking the question.* "Does this sound Symbolic?" is not answerable by a naive listener, and a Lacan-literate listener is not naive about the hypothesis. Some verbal anchor set must be built that operationalises Real/Symbolic/Imaginary in ordinary language, and then shown to track the concepts for expert raters before being put to a panel. This pre-study is the real cost of A4.
3. *Deterministic stimuli* (F3).

**Binding constraint: the question has no validated wording, and the answer has no settled referent.**

**Cost to satisfy.** Table selection: free, one decision. Determinism: 1–2 developer-days of seeding. Anchor development: ~20 Lacan-literate raters × 1 h on a paraphrase-matching task, plus 40 h of authoring ≈ $2,500. Main study: 6 modes × 4 stimuli, 3-alternative forced choice; detecting 0.50 correct against chance 0.333 at 80% power needs about 260 judgements, so ~40 listeners × 24 items ≈ $600 plus stimulus production. Total ≈ **$8,000–10,000 and 5–7 months**, of which the anchor pre-study is two thirds.

**On the claim, made in both the register and S1 §8, that this is "the single cheapest study in the programme": that is not correct on constraint grounds.** A4 requires stimulus generation, a settled table, a deterministic renderer, ethics approval for human listeners, and an instrument that does not exist. A3 requires text, an existing corpus and three readers. A3 is cheaper by roughly a factor of four and decides a sharper claim.

**Verdict: NOT FEASIBLE AS STATED.** It becomes feasible once (i) one modal table is chosen and the trauma switch is actually implemented, (ii) the renderer is seeded, and (iii) the anchor instrument is built and validated.

---

### A5. Trauma and entropy are separable, and act on different musical parameters

**What would have to be measured.** Two things, and they should not be conflated. *Separability of the variables*: the correlation of independently rated τ and H. *Separability of the effects*: whether dynamics tracks τ and coherence tracks H in the generated output — which is true by construction and therefore not a finding.

**Binding constraint: the existing evidence is single-rater and self-authored.** F2 gives r(τ, H) = 0.280 over 232 frames, which is a good number for A5, but every one of those pairs was set by the theory's author, who knows the hypothesis. It cannot be cited as evidence. It can be cited as a pre-registered prediction.

**Power is comfortable.** To distinguish an observed r = 0.28 from a "the distinction does no work" value of 0.70 at 80% power needs **n = 26 effective observations**. The corpus supplies 38. A5 is the one assertion whose empirical test the existing library can actually support.

**Cost to satisfy.** Two extra items on the A2 pass: 232 frames × 1.5 min extra = 5.8 h per rater, 3 raters = 17 h ≈ **$700**. Nothing else.

**Verdict: FEASIBLE AFTER STATED WORK** — the smallest increment in the set, riding on the A2 instrument.

---

### A6. The transformation typology is a function, not a repertoire

**What would have to be measured, by whom, with what instrument.** A criterion variable that does not exist: for each frame, whether a competent musician judges a transformation *obligatory*, and which. Then agreement between the system's transformation and that judgement. Raters: working composers or orchestrators, three minimum. Statistic: Krippendorff's α for the multi-label nominal decision, then agreement of the function against the adjudicated criterion.

**Binding constraint: the criterion variable must be shown reliable before it can be used, and it probably will not be.** This is a two-stage cost that is easy to overlook. If three composers agree only at α = 0.4 on where a transformation is obligatory, then the system cannot be scored against them at all, and the assertion becomes untestable rather than false. A pre-study establishing criterion reliability on ~60 frames is mandatory and may terminate the line.

**Second binding constraint: the criterion requires audio.** "Is a transformation obligatory here?" cannot be answered from a state vector. The rater must have heard the motif established and heard the preceding minutes. That means 13 continuous cues must be rendered, deterministically (F3), before any rating begins.

**Third: the corpus records no "the drama turns here" label.** It records τ, H, a chord name and an analysis string. The turns must be marked independently, ideally from Lacan's readings for Hamlet and Antigone as the register proposes, which is the one place the programme has an external criterion at no cost.

**Cost to satisfy.** Renderer seeding 2 dev-days; cue production for 13 plays ≈ 40 dev-hours; criterion pre-study 3 composers × 7 h = 21 h; main pass 3 composers × 232 frames at 4 min with listening context = 15.5 h each = 47 h. Composer time 68 h @ $120 = **$8,200**, plus ~55 developer-hours. Calendar 4–6 months. **Total ≈ $12,000.**

**Verdict: FEASIBLE AFTER STATED WORK**, conditional on the criterion pre-study clearing a reliability floor. If it does not clear, A6 is NOT FEASIBLE AS STATED and no amount of money changes that.

---

### A7. Fragmentation has ordered levels, selected by a scalar

**Stated constants.** `score = 0.6H + 0.4τ`, thresholds 0.25 / 0.5 / 0.75 / 0.9, five levels. Implemented at `src/lib/leitmotif_transformation_rules.ts:215-262`. This matches the register exactly, which is not true of most constants in the set.

**What would have to be measured.** Whether perceived disintegration is monotone in the scalar, and whether the thresholds fall where perceived category boundaries fall. Instrument: a perceived-disintegration rating scale on rendered audio, plus an ordinal model (cumulative-link) to estimate boundaries.

**Binding constraint: the corpus cannot supply the stimuli.** Running the shipped formula over the 232 frames gives level occupancies of **full 9, truncated 68, core_motif 129, interval_only 19, dissolution 7**. Two of the five levels are represented by fewer than ten frames, and one of those is the theoretically interesting end. A monotonicity test needs balanced cells. Stimuli must therefore be *synthesised* at target scores rather than sampled from the library, which means the study measures the renderer's behaviour at stipulated inputs, not the plays.

**Second constraint: the weights are not identifiable from these data.** With r(τ, H) = 0.28, the fragmentation scalar and the orchestration scalar are near-collinear (see A8), so an ordinal model fitted to perceived disintegration cannot separate the contribution of the 0.6/0.4 weighting from the 0.7/0.3 weighting. To identify the weights you need stimuli that break the collinearity — deliberately constructed high-τ/low-H and low-τ/high-H cases, which occur rarely in the library.

**Cost to satisfy.** 40 synthesised stimuli (8 per level, plus off-diagonal cases), ~60 developer-hours; 30 listeners × 40 min ≈ $450; analysis ~20 h. **≈ $5,000 and 3 months.**

**Verdict: FEASIBLE AFTER STATED WORK.** The work is stimulus synthesis, not annotation. Note that what is then tested is the mapping, not the plays.

---

### A8. Orchestration density has ordered levels, selected by a differently weighted scalar

**Stated constants.** `intensity = 0.7τ + 0.3H`, thresholds 0.2 / 0.4 / 0.6 / 0.85, five levels. Implemented at `leitmotif_transformation_rules.ts:121-133`. Matches the register.

**Binding constraint: none. The test is already runnable and I have run it.**

Over the 232 annotated frames:

| Quantity | Value |
|---|---|
| r(fragmentation scalar, orchestration scalar) | **0.915** |
| R² | **0.837** |
| Orchestration level predicted from fragmentation level, best mapping | **158 / 232 = 68%** (majority-class baseline 43%) |

The register's own failure condition for A8 is: "If the two scalars track each other closely enough in practice, then the theory has one intensity variable wearing two hats." At r = 0.915 that condition is met on the author's own data.

**And it is worse than an empirical result, because it is algebraic.** Both scalars are convex combinations of the same two variables. Their correlation is fixed by r(τ, H) and the observed standard deviations. Computing it across the range:

| r(τ, H) | resulting r(fragmentation, intensity) |
|---|---|
| +0.50 | 0.948 |
| +0.28 (observed) | 0.915 |
| 0.00 | **0.858** |
| −0.25 | 0.784 |
| −0.50 | 0.666 |
| −0.90 | 0.119 |

So **even if trauma and entropy were perfectly uncorrelated — A5's best possible outcome — the two scalars would still correlate at 0.86.** The only way to separate them is a strong *negative* correlation between trauma and entropy, which no reading of A5 proposes and which the theory explicitly denies by calling them independent. A5 succeeding therefore guarantees A8 failing. The two assertions are in algebraic conflict and no data can resolve it in both their favours.

**Cost to satisfy.** To *evaluate* A8: zero; it is done. To *rescue* A8 as a claim of two distinct variables: the weights must be changed so the two scalars are not both convex combinations of the same pair — for example by making fragmentation depend on a variable orchestration does not use. That is a change to the theory, which is outside my mandate to propose; I record only that no measurement will save the current form.

**Verdict: FEASIBLE NOW.** The only assertion in the set that can be evaluated today. It returns a negative.

---

### A9. Objet a is the divergence between internal model and observed state

**What would have to be measured.** A divergence requires two terms: an internal model and an observed state. **The system has no internal model.** `ScoreOrchestrator.processFrame` recomputes state per frame with no carried expectation; the only memory in the pipeline is a stave-activation decay of 0.1 per frame (`score_orchestrator.ts:274`). There is nothing for the observed state to diverge *from*.

**What exists under the name is a different quantity from different inputs.** `object_petit_a(system_coverage, threat_coverage) = max(0, min(1, (1 − (S + T − S·T)) · 2))` (`advanced_extensions.py:212-227`), fed from conscientiousness and a Dark-Triad composite (`:523-526`). It is a coverage complement, not a model-observation divergence. Its sole caller, `compute_extended_musical_parameters`, is itself never called. **A9's own formal failure condition — "computed but never reaches any musical parameter" — is already satisfied by the shipped code.**

**Binding constraint: the instrument does not exist and is not small.** To make A9 measurable you must build a per-character predictive model that maintains an expectation over the next frame's state and updates it — a filtering model over the nine-vector, with a defined transition, a defined observation model and a defined divergence (KL or prediction error). That is a research artefact in its own right, and it needs training data: state trajectories, which is precisely what A1's corpus expansion would produce. So A9 is downstream of A1, not parallel to it.

**Second constraint, of a different kind and noted because the register raises it.** The conceptual acceptability test ("rejected by readers who know the concept") is not a measurement. It is peer review. It has no sample size and no instrument, and it costs nothing but cannot be *passed* in the sense the other assertions can.

**Cost to satisfy.** Build the filtering model: 200–300 developer-hours. Requires A1's corpus first. Then wire the output to at least one musical parameter and show it moves: ~20 h. Calendar: 9–15 months from a standing start, and it cannot start before A1 delivers.

**Verdict: NOT FEASIBLE AS STATED.** There is no internal model in the system; the quantity bearing the name is a different formula on different inputs and is unreachable at runtime.

---

### A10. The audience is a term in the model

**What would have to be measured.** Two quite different things sit under this assertion and they have different costs.

*The model claim* — that the coefficient is exercised and that its register dependence holds. Grep finds no observation-weight term anywhere in the executable code; the only occurrences of "audience" outside the wiki are a reference-dictionary entry (`mpn_reference_data.ts:3766-3778`) and a stage direction in a play frame. **A10's own failure condition, "the coefficient is never exercised," is already satisfied.** Cost to make it exercisable: implement it, ~2 developer-days.

*The empirical claim* — that observation actually modulates state, more for Imaginary-dominant subjects. Within the plays, this is an interaction test: code each frame for whether the speaker is observed within the fiction (soliloquy vs. public address — cheap, ~3 h of coding for all 232 frames), then test whether rated state differs by observation status *and* whether that difference varies with dominant register. **Interactions need roughly four times the sample of the corresponding main effect.** Detecting a moderate interaction (f² ≈ 0.05) at 80% power needs about 160 effective observations; the corpus supplies 38. That is **about 960 raw frames**, i.e. roughly 55 plays.

*The performer-facing claim* — that a real audience changes a real performer's state — is not testable from text at all. It needs a theatre lab: actors performing the same material with and without an audience, with a state measure (behavioural coding or physiology), repeated enough to separate the effect from performance-to-performance variance. Venue, actors, two recruited audiences, ethics approval, physiological instrumentation.

**Binding constraint: the corpus is a quarter of the size the interaction test needs, and the strong reading needs a laboratory the programme does not have.**

**Cost to satisfy.** Text version: implement the coefficient (2 dev-days), code observation status (3 h), and expand the corpus to ~55 plays — which subsumes A1's expansion and adds to it, ≈ **$12,000 in annotation alone**. Theatre-lab version: 6 actors × 3 sessions, venue, two audiences of 30, physiological kit, ethics — **$30,000+ and 12–18 months**, and it is a different discipline's study.

**Verdict: NOT FEASIBLE AS STATED.** The coefficient does not exist to be exercised, the corpus cannot support the interaction, and the strong reading requires an apparatus outside the programme.

---

### A11. The whole composes: it is a calculus

**What would have to be measured.** A paired comparison: cues assembled by composing the parameter functions against cues with the same parameter values assembled by a composer, judged by musicians for coherence. This is the only form in which the assertion has content, and the register and S1 §8 both state it correctly.

**Binding constraint 1: determinism is claimed and not implemented (F3).** S1 §5 commits to determinism and says any stochastic element "must be seeded to preserve the property." Nine unseeded call sites say otherwise. Until this is fixed the system cannot produce a stimulus twice, and a paired-comparison study is impossible. Cost: 1–2 developer-days. This is the cheapest unmet prerequisite anywhere in the programme.

**Binding constraint 2: the comparison requires a composer to build the counterpart cues, and the confound requires more than one composer.** A single composer's cues confound "assembled by a human" with "assembled by *this* human." Three composers minimum.

**Binding constraint 3, and it is structural: Φ is total and deterministic but it is not continuous.** The tempo map is piecewise across stability bands: at H = 0.399 the tempo is 48 BPM; at H = 0.401 it is 88 BPM (`11_ENTROPY_CALCULUS.md §5.2, §6.1`). A 0.002 change in a rated quantity produces a 40 BPM jump. Similar step discontinuities sit at every threshold in A7, A8 and the dynamics table. A composition of piecewise-constant maps produces cues that lurch at stipulated boundaries, and a coherence comparison against a composer will find exactly that. This is not an argument that the assertion is wrong; it is a statement that the study will be measuring discontinuity artefacts unless the boundaries are smoothed or hysteresis is added first, and that is engineering work that must precede the study.

**Power.** Detecting a 65/35 preference against a 50/50 null at 80% power needs **78 independent binary judgements**. With within-listener clustering across 20 stimulus pairs, budget ~40 listeners × 20 pairs = 800 judgements. Obtainable. This matches the scale of the comparable literature: EMOPIA used 25 participants × 12 samples on 5-point Likert scales; MusicGen used ≥5 raters per sample on 1–100 scales with CrowdMOS outlier filtering and −14 LUFS loudness normalisation (`/home/claude/mpn-research/q7-generative-music-ml.md`, lines 28, 76, 88). The floor stated there — tens of listeners, fixed protocol, attention checks, a same-protocol baseline — is achievable; the composer-side cost is not standard in that literature and is what makes A11 expensive here.

**Cost to satisfy.** Seeding 2 dev-days. Boundary smoothing/hysteresis ~40 dev-hours. 20 cue pairs × 3 h × 3 composers = 180 composer-hours @ $120 = **$21,600**. Listener panel 40 × 30 min ≈ $600. Analysis and protocol ~40 h. **Total ≈ $25,000–30,000, calendar 9–12 months.**

**Verdict: FEASIBLE AFTER STATED WORK**, and it is the most expensive item in the set.

---

## 2. Verdict summary

| | Assertion | Binding constraint | Cost to satisfy | Verdict |
|---|---|---|---|---|
| A1 | Nine-dimensional state | Power: effective n = 38 vs 80–120 needed | ~$7,400 + 44 authoring h; 6–9 months; needs ~35 plays | FEASIBLE AFTER STATED WORK |
| A2 | Registers admit magnitudes | No rating instrument exists | ~$3,100 + ~45 authoring h; 8–12 weeks | FEASIBLE AFTER STATED WORK |
| A3 | Simplex / competitive registers | Rides on A2; n adequate only for the strong prediction | ~$0 marginal, 4 h analysis | FEASIBLE AFTER STATED WORK |
| A4 | Register selects mode | Table unsettled (3 versions, none with τ switch); no listener anchors | ~$8–10k; 5–7 months | NOT FEASIBLE AS STATED |
| A5 | Trauma/entropy separable | Existing evidence is self-rated; power adequate | ~$700 marginal | FEASIBLE AFTER STATED WORK |
| A6 | Transformation is a function | Criterion variable unbuilt and may not be reliable | ~$12,000; 4–6 months | FEASIBLE AFTER STATED WORK (conditional) |
| A7 | Fragmentation levels | Corpus cells 9 and 7 in two of five levels; weights unidentifiable | ~$5,000; 3 months | FEASIBLE AFTER STATED WORK |
| A8 | Orchestration levels | None — test already run; r = 0.915, algebraically forced | $0 | **FEASIBLE NOW** (returns a negative) |
| A9 | Objet a as divergence | No internal model exists in the system | 200–300 dev-h, downstream of A1; 9–15 months | NOT FEASIBLE AS STATED |
| A10 | Audience is a term | Coefficient absent from code; interaction needs ~960 frames | ~$12,000 (text) / $30,000+ (theatre lab) | NOT FEASIBLE AS STATED |
| A11 | The whole composes | Determinism unimplemented; Φ discontinuous at thresholds; composer-side cost | ~$25–30k; 9–12 months | FEASIBLE AFTER STATED WORK |

---

## 3. Constants stipulated without derivation, and what would fix each

Reproducibility requires that a second implementation, given the documents, produce the same numbers. It currently cannot, for two reasons: some constants have several published values, and one has none.

| Constant | Where stated | Status | What would fix it defensibly | Cost |
|---|---|---|---|---|
| θ = 0.6, trauma mode switch (A4) | Register A4 only | **Not implemented anywhere.** `rsi_to_mode(r,s,i)` and `rsiToMode(rsi)` take no τ | Implement it, then estimate the boundary as a point of subjective equality: 2AFC across a τ grid (7 levels × 4 stimuli), psychometric function fit | ~$2,000 on top of the A4 study |
| Modal assignment (A4) | Register A4; `10_CORE_EQUATIONS.md §4.1`; `generate_synthetic_pairs.py:23-30`; `server_v2.py:223-227` | **Three incompatible tables**; the register's version matches none of the shipped code | Choose one and delete the others from the corpus of documents. Then it is a stipulation to be tested, not a contradiction | Free, one decision |
| 0.6 / 0.4 fragmentation weights (A7) | `leitmotif_transformation_rules.ts:215`; wiki `features/leitmotif` | Stipulated; consistent across sources | Fit by cumulative-link ordinal regression on perceived-disintegration ratings — **but not identifiable** unless stimuli break the τ/H collinearity | Included in A7's $5,000 |
| Thresholds 0.25/0.5/0.75/0.9 (A7) | same | Stipulated; corpus occupancy 9/68/129/19/7 | Estimate as category boundaries from the same ordinal model | Included |
| 0.7 / 0.3 orchestration weights (A8) | `leitmotif_transformation_rules.ts:129` | Stipulated; **jointly non-identifiable with A7's weights** | No measurement fixes this while both are convex combinations of (τ, H) | Not fixable by data |
| Thresholds 0.2/0.4/0.6/0.85 (A8) | same | Stipulated; occupancy 9/45/61/100/17 | As A7 | Included |
| v = 20 + 107τ, 8 dynamic bands | `10_CORE_EQUATIONS.md §2.1-2.3` | Stipulated; **the shipped TypeScript does not use it** (uses a 30/72/118 table) | Defensible by convention if declared a stipulated linear rescaling onto conventional markings. v_min = 20 as "threshold of audibility" is synth-specific and should be cited as such | Free, a paragraph |
| Tempo bands 40–60 / 80–100 / 120–180, boundaries 0.4 / 0.7 | `11_ENTROPY_CALCULUS.md §5.2, §6.1` | Stipulated; **produces a 40 BPM discontinuity at H = 0.4** | Either derive the bands from a tempo-affect study, or replace the step with a continuous map and report the bands as labels | ~40 dev-h to smooth; a study to derive is ~$4,000 |
| λ = (τ + H − 0.5)/2 | `12_LYAPUNOV_STABILITY.md §2.1`; `10_CORE_EQUATIONS.md §7.2` | **Not a Lyapunov exponent.** No trajectory, no limit, no linearisation — it is an affine function of τ + H | Either rename it (free, and removes a claim the theory cannot support) or define a vector field on P and compute a finite-time exponent — which requires the dynamical model that does not exist (cf. A9) | Free, or 200+ dev-h |
| Zone boundaries −0.1 / 0 / 0.1 / 0.3 for λ | `12 §3.1, §3.2` | Stipulated on a quantity that is an affine map of τ + H, so they are τ + H thresholds wearing other clothes | State them as τ + H thresholds | Free |
| S_total = 0.6·BSI + 0.4·(1 − λ̂) | `12 §5.1` | Stipulated; the third independent appearance of a 0.6/0.4 split in the theory | Note that 0.6/0.4 appears three times with three different justifications; at minimum they should not be assumed to be the same number | Free |
| Crisis condition | `12 §6.1` (λ>0.2 ∧ BSI<0.3); `10 §7.3` (λ>0.1 ∧ BSI<0.3); `02_BORROMEAN_TOPOLOGY.md:230` (BSI<0.3 ∧ H>0.8) | **Three definitions** | Choose one | Free |
| BSI | four definitions across code, docs and wiki | **Four definitions** | Choose one | Free |
| Crisis severity denominator 0.85 | `12 §6.2` | Stipulated as 0.3 + 0.55 with no account of 0.55 | Show the derivation or declare it a normalisation | Free |

**Aggregate reproducibility finding:** of the constants the register's assertions depend on, **none is derived**; six are stipulated-and-consistent (defensible by declaring them stipulations), four are stipulated-and-contradictory (free to fix, but must be fixed before any study), and one — θ = 0.6 — does not exist in any implementation. The cheapest large gain in the whole programme is the free one: choose a single value for each contradictory constant and delete the alternatives. Until that is done, no result is reproducible by a second team and no paper can state what was tested.

---

## 4. Cross-cutting constraints

### 4.1 Annotation cost, consolidated

One annotation campaign serves A1 (partly), A2, A3, A5 and A10's coding. Doing it once is much cheaper than five times.

| Pass | Items | Frames | Min/frame | Hours/rater | Raters | Rater-hours | Cost |
|---|---|---|---|---|---|---|---|
| RSI only (A2, A3) | 3 | 232 | 2.5 | 9.7 + 6 training | 5 recruited | 79 | $3,100 |
| + τ, H (A5) | 5 | 232 | 4.0 | 15.5 + 6 | 5 | 108 | $4,300 |
| + DISC per character (A1 partial) | +4 | 83 chars | 5.0/char | 22.4 + 6 | 3 | 85 | $3,400 |
| Expanded corpus (A1 full) | 9 | 612 | 4.0 | 62 | 3 | 186 | $7,400 |

Reliability targets: ICC(2,3) with the lower bound of the 95% CI above 0.75 for the continuous ratings; Krippendorff's α ≥ 0.667 for any nominal decision. Recruit five raters to retain three; budget two dropouts or attention-check failures as normal.

**The recurring trap:** 232 frames is *ample* for estimating reliability and *thin* for testing hypotheses, because reliability treats each frame as a subject while hypothesis tests must respect play-level clustering (F1). Any paper reporting "n = 232" for a hypothesis test is overstating its evidence by a factor of six.

### 4.2 Computational tractability

Nothing in A1–A8 is computationally hard. Φ is table lookups and linear maps; per-frame evaluation is microseconds, and the whole 232-frame library evaluates in well under a second. **Tractability is not a binding constraint anywhere in Block A.**

What binds instead is *data the system does not collect*:

- **A6** needs a "the drama turns here" label. Not recorded. The corpus records τ, H, a chord name and an analysis string.
- **A9** needs a per-character expectation carried across frames. Not maintained; the pipeline recomputes per frame.
- **A10** needs an observed-within-the-fiction flag. Not recorded (3 h to add).
- **A11** needs reproducible audio. Not producible (F3).

### 4.3 Notation legibility

This bounds what can be *shown* regardless of what can be computed, and it is a hard bound because it is about readers, not engravers.

A trained reader tracks, per stave, about five channels at once: pitch (staff position and accidentals), rhythm (noteheads, beams, meter), one dynamics layer below the stave, one articulation layer above the notehead, and one expression-text layer. Two of the five are consumed by the notes themselves. **The practical budget for state is two to three channels per stave.**

Against that budget, the theory's own decomposition spends:

| State component | Musical channel | Per-stave or global? |
|---|---|---|
| τ | dynamics | per-stave (1 channel) |
| H | meter, tempo, syncopation | **global** |
| r, s, i | mode (accidentals) | per-stave (1 channel), argmax only |
| D, I, S, C | instrument + articulation | staff label (free) + 1 channel, argmax only |

Three consequences follow, and they are determinate:

1. **Nine numbers reduce to about 6.6 bits per character per frame.** What a reader can recover from a stave is τ to 8 dynamic levels, argmax(r,s,i) to 3 modes, argmax(DISC) to 4 articulations: log₂(8 × 3 × 4) ≈ 6.6 bits, plus a global meter (6 levels, 2.6 bits) shared across all characters. The state is nine continuous numbers. The notation is lossy by design, and the loss is structural — a better engraver cannot recover it. **A1 is measurable but not notatable at full resolution.**
2. **Entropy cannot be per-character in an ensemble scene.** Meter and tempo are global properties of a score. In a scene with three speaking characters there is one meter and one tempo, so at most one character's H is notatable. **A1 combined with A11 fails on legibility grounds for every ensemble scene**, which is most of both plays.
3. **Two of the nine components are read only through an argmax.** RSI contributes one of three modes; DISC contributes one of four families. The magnitudes A2 asserts exist are therefore not notated at all — only their ordering. A2 can be *measured* and cannot be *shown*.

A10 would need a fourth per-character channel and there is none free. B4's three simultaneous layers, raised in Block B, exceed the budget before the biases are added; that is outside this review's scope but the arithmetic above is the arithmetic that applies.

### 4.4 Statistical power, consolidated

Against the comparable literature (`q7-generative-music-ml.md`): EMOPIA, 1,087 clips, four annotators, 25-participant listening survey on 5-point Likert; MusicGen, ≥5 raters per sample on 1–100 OVL/REL with CrowdMOS filtering and −14 LUFS normalisation; VGMIDI, 95 clips. Listener-panel sizes in this literature are 25–40. **The programme's listener studies are all within reach of that norm. Its text studies are not, because its corpus is 232 frames in 13 plays where the literature's corpora are thousands of clips.**

| Test | Effect worth detecting | n needed (effective) | Available (effective) | Verdict |
|---|---|---|---|---|
| A3 simplex, strong | ρ = −0.5 vs 0 | 29 | 38 | adequate |
| A3 simplex, weak | ρ = −0.3 vs 0 | 85 | 38 | inadequate |
| A5 separability | r = 0.28 vs 0.70 | 26 | 38 | adequate |
| A1 redundancy, 8 predictors | — | 80–120 | 38 | inadequate (needs ~610 raw frames) |
| A10 register × observation interaction | f² ≈ 0.05 | 160 | 38 | inadequate (needs ~960 raw frames) |
| A4 forced choice | 0.50 vs chance 0.333 | 260 judgements | obtainable (~40 listeners) | adequate |
| A7 ordinal monotonicity | 5 levels, balanced | ~750 judgements | obtainable (~30 listeners) | adequate, stimuli must be synthesised |
| A11 preference | 65/35 vs 50/50 | 78 binary (budget 800) | obtainable (~40 listeners) | adequate |

### 4.5 Publication feasibility

**Defensible in a paper now, with no new data:**
- S1 as a theory statement — the architecture, the provenance accounting in §4 and §7, the falsification conditions in §8. This is publishable as it stands and is the paper's real contribution.
- **A8 as a negative result.** The collinearity is demonstrable analytically and on the existing 232 frames. A short methodological note ("two weighted scalars over the same two variables cannot be distinct: a worked case") is publishable immediately and costs nothing.
- **The constants audit** (§3) as a reproducibility note, if the programme is willing to publish its own inconsistencies.

**Needs data first (annotation campaign, no new instrument beyond the codebook):** A2, A3, A5, and A1 after corpus expansion. Timeline 3 months (A2/A3/A5) to 9 months (A1).

**Needs an instrument built first:** A4 (listener anchors + a settled table + a seeded renderer), A6 (a reliable obligatory-transformation criterion + rendered cues), A7 (a synthesised stimulus set), A11 (a seeded renderer + composer-made counterpart cues), A9 (a per-character predictive model), A10 (an implemented coefficient + a corpus four times the current size, or a theatre lab).

**One thing that must be said about the empirical position S1 §9 already concedes.** The 24-participant survey with a mean appropriateness of just over 4/5 cannot be cited in support of A4 even as an indication, because the stimuli were produced by a nondeterministic renderer (F3): the participants did not hear a fixed set, and the study cannot be repeated. S1 §9 calls it "an encouraging first indication." On constraint grounds it is not an indication of anything, and the honest description is that no evaluable listener data exists yet.

---

## 5. Closing

### The three most expensive assertions to evaluate

1. **A11 — the composition claim. ≈ $25,000–30,000, 9–12 months.** The cost is not the listener panel (40 listeners is ordinary) but the counterpart cues: 20 pairs from three independent composers, 180 professional hours, to avoid confounding "assembled by a human" with "assembled by *this* human." Prerequisites: a seeded renderer, and smoothing of the threshold discontinuities that would otherwise dominate the coherence judgements.
2. **A10 — the audience term. ≈ $12,000 for the text version, $30,000+ for the theatre-lab version, 12–18 months.** The text version needs a corpus roughly four times the current size because an interaction is being tested. The performer-facing version needs actors, a venue, two recruited audiences, physiological instrumentation and ethics approval, and is a different discipline's experiment.
3. **A6 — the transformation typology. ≈ $12,000, 4–6 months, with a real chance of termination.** Three composers' time, preceded by a mandatory criterion-reliability pre-study that may show composers do not agree on where a transformation is obligatory — in which case the assertion becomes untestable rather than false, and the money is spent finding that out.

(A9 would head this list on difficulty, but it does not belong on a cost ranking: it is blocked rather than expensive, because the object it asserts a divergence from does not exist in the system.)

### The single cheapest decisive test in the whole set

**A8's collinearity check, and it has already been run: cost zero, result r = 0.915 (R² = 0.837) over the 232 existing frames.** It is decisive because it meets A8's own stated failure condition, and because the result is algebraically forced rather than empirically contingent: two convex combinations of the same two variables correlate at 0.86 even when those variables are perfectly uncorrelated. No further data can change it.

**The cheapest decisive test requiring new data is A3's correlation matrix.** Three raters, the existing 232 frames, unconstrained 0–100 scales for Real, Symbolic and Imaginary, one analysis afternoon: about 50 rater-hours and $2,000 on top of the A2 instrument, with no stimulus generation, no rendering, no ethics beyond ordinary consent. It is decisive for the strong form of the claim — the simplex predicts pairwise correlations near −0.5, the cube predicts near 0, and an effective n of 38 detects that difference at better than 80% power. It is *not* decisive if the true coupling is weak (ρ ≈ −0.3 needs n = 85), and the paper must say in advance which version is on trial.

### The minimum instrument the programme needs that does not currently exist

**A validated RSI annotation protocol.**

Specifically: a written codebook defining Real, Symbolic and Imaginary operationally for a dramatic passage; three unconstrained 0–100 scales with behavioural anchors at 0, 50 and 100; a 30-frame calibration set with adjudicated reference values; a written adjudication rule; and a published ICC(2,3) with a 95% confidence interval.

It is the minimum for three reasons.

*It gates the most.* A1, A2, A3, A5 and A10 cannot be evaluated without it, and A6's criterion study depends on the same annotation discipline. That is six of eleven assertions behind one artefact.

*It is the cheapest instrument in the set.* Roughly 45 hours of authoring, a two-rater pilot on 30 frames, and about $3,100 of rater time — one academic term, under $5,000 all in. Every other missing instrument (listener anchors for register semantics, an obligatory-transformation criterion, a per-character predictive model, a theatre lab) costs between four and ten times as much.

*Nothing in the programme is measurable without it.* The central claim of the theory is that the Lacanian registers admit magnitudes. Until there exists a documented procedure by which two people can assign those magnitudes and be shown to agree, every downstream number in the calculus rests on one person's unexamined judgement, and no result the programme produces can be checked by anyone else.

**One prerequisite that is not an instrument but must be named with it: seed the renderer.** One to two developer-days removes the blocker on A4, A6, A7 and A11, and it makes the determinism that S1 §5 already claims actually true. It is the highest return per hour anywhere in this review.
