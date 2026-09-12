# Block B: skeptical review

**Reviewer mandate:** Skeptic / Challenger. Attack only. No alternatives, no redesign, no proposals.
**Scope:** `ASSERTIONS-REGISTER.md:125-163`, assertions B1–B5. Block A is closed and is referenced only for inherited dependency.
**Operating question:** assume this extension fails. Why?

---

## 0. The structural objection that applies to all five

The register states its own schema at `ASSERTIONS-REGISTER.md:7`: "For each: the claim, its formal content, what it would take to be wrong, and what the Hamlet and Antigone runs would say about it."

Every Block A assertion carries all four fields. **No Block B assertion carries any of the last three.** B1–B5 each have a **Claim** and a **Why it matters**; B1, B3 and B4 add a **What to settle first**. There is no **Formal content** anywhere in `:125-163`, no **How it could be wrong** anywhere in `:125-163`, and no **What the play runs would say** anywhere in `:125-163`.

The consequence is not stylistic. Block A earned its arbitration because each assertion named the observation that would refute it — that is how A8 was caught by the author's own numbers (`BLOCK-A-ARBITRATION.md:23-33`) and how A9's own failure condition was found already met (`BLOCK-A-ARBITRATION.md:35-41`). Block B has removed the mechanism that produced every useful finding in Block A. As written, **no Block B assertion can be wrong**, and the register calls them "candidate assertions" (`:125`) while supplying none of what makes a candidate examinable.

A second structural note: `:127` says Block B is "the material for the next revision of S1 and for S3". Five claims with no formal content and no failure conditions are being scheduled into two papers.

---

## B1. Biases are representable alongside state

**Claim under attack** (`:131`): "The twelve named cognitive biases are not merely inputs to a personality reduction. They are identifiable in a text and representable in their own right, distinct from affective state."

### Strongest single objection

B1 is a repudiation of the author's own dissertation chapter, stated as though it were an extension of it.

`MPN_ACADEMIC_DISSERTATION.md:484-497` takes the twelve biases, concatenates them into a 24-dimensional vector ("The raw 24-dimensional vector (4 + 5 + 3 + 12 = 24)"), and applies "PCA/ICA reduction to 8 factors" in which the twelve biases survive as "Factors 6-8: Bias susceptibility clusters" (`:497`). That is precisely "inputs to a personality reduction" — the thing B1 says biases are "not merely". The theory currently in the corpus does the reduction B1 denies, and B1 does not say the chapter is withdrawn. Two incompatible treatments of the same twelve objects are now live in the same body of work. This is the condition that earned A4 the ruling that "No paper can defend this until one table is chosen" (`BLOCK-A-ARBITRATION.md:53`).

Worse, the twelve are not twelve. Four mutually incompatible counts ship today:

| Count | Location |
|---|---|
| 12 | `MPN_ACADEMIC_DISSERTATION.md:467-480`; "Cognitive Bias Framework (12 biases)" `:669` |
| 36 | `ml/psychoscore_v2/models/projector.py:136-148` (one-hot, indices 21–56), per `repo-deconstruction.md:136` |
| 5 | `src/components/mpn-lab/psychometric_calculus.ts:134-139` (`BIAS_ARTICULATIONS`) |
| "100+" | `src/components/mpn-lab/score_types.ts:41` — "// Active Biases (from 100+ list)" |

B1 says "the twelve named". Nothing in the corpus agrees on which twelve, or that there are twelve.

### The measurement instrument contradicts the claim

`MPN_ACADEMIC_DISSERTATION.md:467`: the twelve biases are "measured via behavioral tasks or self-report". Antigone cannot sit a behavioural task and Hamlet will not return a self-report. B1 asserts they are "identifiable in a text" and supplies no instrument for doing so, while the only instrument the theory has named is inapplicable to the only corpus the programme has.

### Does the thing exist today?

Partially, and in a form that refutes the claim's second half.

- Biases are carried as `biases?: string[]` on the **actor profile** (`repo-deconstruction.md:166-167`; `score_orchestrator.ts:246` reads `speakerProfile?.biases`). An unordered list of strings: no magnitude, no ordering, no per-frame variation. There is no quantity to be "representable in its own right".
- The single place a bias reaches sound is `lookupArticulation` (`src/components/mpn-lab/mpn_reference_lookup.ts:183-214`), called at `psychometric_calculus.ts:333-338`. Its first two lines are:
  ```
  if (trauma > 0.7) return 'sforzando';
  if (trauma > 0.5) return 'marcato';
  ```
  (`mpn_reference_lookup.ts:188-190`). **Affective state pre-empts bias on the only channel bias owns.** Above τ = 0.5, no bias is audible. B1 asserts bias is "distinct from affective state"; in the shipped implementation, state overwrites it.
- Below that threshold, the loop at `:192-212` returns on the **first** bias in the array that matches. With three biases listed, two are silent, and which one sounds depends on array order.
- `BIAS_ARTICULATIONS` (`psychometric_calculus.ts:134-139`) is dead code: `grep` across `src/` returns the declaration and no reference.
- The Python bias-susceptibility score `BSS = Σ w_b S_b` and bias audio effects (`advanced_extensions.py:135-205`) are "IMPL–NOTEST, no caller outside the module" (`repo-deconstruction.md:313`), and that module's only entry point is "itself uncalled" (`:190`).
- `projector.py:134` says of the 36-bias block: "This is a placeholder - in production, use learned bias embeddings" (`repo-deconstruction.md:138`).

### Unfalsifiable residue

"identifiable in a text" — no codebook, no rater count, no agreement criterion. A reader who finds confirmation bias in any speech cannot be shown wrong, because every dramatic utterance responds to a prior one. The corpus has one annotator and no codebook (`repo-deconstruction.md:455`), and the arbitration has already ruled that the annotation instrument does not exist (`BLOCK-A-ARBITRATION.md:75`).

### Ambiguous terms, quoted exactly

"the twelve named cognitive biases"; "not merely inputs to a personality reduction"; "identifiable in a text"; "representable in their own right"; "distinct from affective state"; "a property of a speaker, of a turn, or of an exchange"; "The theory needs one answer."

### Block A dependencies inherited

- **A1** (`BLOCK-A-ARBITRATION.md:79-83`): "distinct from affective state" presupposes that affective state is itself well-individuated. A1 holds only with the disclosure that five of nine components are scene-global and "trauma [is] the only component that audibly moves" (`:81`). A bias asserted to be distinct from a state whose other eight components do not move is distinct from almost nothing.
- **A2** (`:67-75`): if biases are extracted from the frame's `analysis` string the way RSI is (`psychometric_calculus.ts:236-250` over the author's own prose), B1 inherits A2's measurement circularity intact.

### Severity: **SERIOUS**

Not fatal in principle — a bias could be given a magnitude and an instrument. Fatal to publication as written: the count is undecided across four sources, the claim contradicts a live chapter of the author's own dissertation without withdrawing it, and the stated measurement method cannot be applied to the only corpus.

---

## B2. A dialogue decomposes mathematically, turn by turn

**Claim under attack** (`:139`): "An exchange is not a sequence of independent states. It is a structure, and it can be decomposed: each turn carries a speaker's state, the biases operating in it, and its relation to the turn before."

### Strongest single objection

B2's load-bearing term is "its relation to the turn before". A relation to the previous turn is a quantity carried across frames — an internal model. **A9 was withdrawn nine days of argument ago for the precise reason that no such thing exists:** "The system maintains no internal model, so there is nothing for an observation to diverge from; the assertion's own failure condition is already met" (`BLOCK-A-ARBITRATION.md:37`). The constraint review says the same in code terms: "`ScoreOrchestrator.processFrame` recomputes state per frame with no carried expectation; the only memory in the pipeline is a stave-activation decay of 0.1 per frame (`score_orchestrator.ts:274`)" (`REVIEW-A-constraints.md:171`).

B2 is A9's requirement re-asserted under a different name, in the same register, in the block written after A9's withdrawal. The stave-activation decay is not a relation between turns; it is a fade.

### The word "mathematically" does no work

B2 says the exchange "decomposes mathematically" and supplies no decomposition — no operator, no basis, no formal content field at all. "It is a structure" is true of any ordered sequence of anything and therefore names no property that could be absent. Strip the two clauses that cannot fail and B2 reduces to: a turn has a speaker, the speaker has a state, and turns come after other turns. That is the definition of a transcript.

### Does the thing exist today?

The turn-level relation exists in exactly one place in the entire codebase, and it is three constants:

```python
if prev_speaker is None:  return 0.5
elif speaker.upper() == prev_speaker.upper(): return 0.2
else: return 0.7
```
(`mpn_engine/core/mpn_calculus.py:199-203`). A binary "did the speaker change" flag. Its output is read by one consumer, `mpn_engine/output/csv_generator.py:42`, which writes it to a spreadsheet column `ARRHYTHMIA_α`. `grep` for `arrhythmia` across the Python tree returns that writer, its CSV reader, and three tests. **It reaches no MIDI, no notation and no audio.**

The corpus itself has no turn pairs. Each frame carries one `speaker` and one line (`literary_data.ts:16-19`), states are hand-authored per frame (`repo-deconstruction.md:177`), and the only structure between frames is array order.

### Unfalsifiable residue

"It is a structure"; "decomposes mathematically" with no decomposition given; "what a scene is about" (`:141`) — offered as the thing the current theory cannot express, with no statement of what would count as expressing it.

### Ambiguous terms, quoted exactly

"decomposes mathematically"; "It is a structure"; "the biases operating in it"; "its relation to the turn before"; "what a scene is about"; "what passes between people".

### Block A dependencies inherited

- **A9, withdrawn** (`BLOCK-A-ARBITRATION.md:35-41`). B2 requires the carried expectation whose absence caused the withdrawal. This is the single most important dependency in Block B.
- **A2 and A3, untestable with the current instrument** (`:67-77`). "Each turn carries a speaker's state" is per-turn RSI, which is keyword-counted over the author's own analysis prose for that turn. Per-turn decomposition multiplies the circularity by the number of turns rather than escaping it.
- **A11 determinism, unimplemented** (`:59-66`). A turn-to-turn relation is unobservable in output that is not reproducible between renders.
- **A1** (`:79-83`). Five of nine components are scene-global; two turns inside one scene differ only by a constant, so the "structure" B2 wants to decompose is, for most of the state, flat by construction.

### Severity: **FATAL**

Fatal on two independent grounds: it asserts a mathematical decomposition and contains no mathematics, and its one substantive requirement is the withdrawn A9 restated. It cannot be examined, and the thing it needs has already been ruled not to exist.

---

## B3. Bias operates dialectically

**Claim under attack** (`:145`): "Bias is most visible in the exchange rather than in the speaker. Confirmation bias is a relation to what has just been said; attribution error is a relation to another speaker; the natural unit is the pair, not the person."

### Strongest single objection

B3 contradicts itself within its own entry. The claim states flatly that "the natural unit is the pair, not the person" (`:145`). Three lines later, **What to settle first** reads: "Which biases are dyadic and which are individual. They will not all be the same" (`:149`). The assertion asserts a universal and then withdraws it in its own supporting text.

It also contradicts B1 across the block. B1's **What to settle first** demands: "Whether a bias is a property of a speaker, of a turn, or of an exchange. The theory needs one answer" (`:135`). B3 gives the answer as "the pair" and then says there will not be one answer. B1 requires one, B3 supplies two, and the register commits to both without noticing.

### B3 is the withdrawn A10 under a new name

A10 asserted that a second party's attention modulates a subject's state, with a sensitivity coefficient varying by register (`ASSERTIONS-REGISTER.md:105-107`). It was withdrawn: "No implementation exists. The stated form … breaks A1's unit bound and A3's simplex constraint; k is defined in terms of the state it modifies" (`BLOCK-A-ARBITRATION.md:45`). B3 is the same structural move — a property of a subject relocated into the relation between that subject and another party — with the audience replaced by the interlocutor. Nothing in B3 addresses the arithmetic that killed A10. If bias-as-relation modulates a bounded state, it breaks the same bound; if it does not modulate the state, B3 has not said what it does instead.

The dissertation's own formulation of this move is `ObservationWeight = Σ(AudienceAttention_i × Distance_i)`, `PsychometricModulation = BaseState × (1 + k × ObservationWeight)` (`MPN_ACADEMIC_DISSERTATION.md:262-266`) — the exact expression the arbitration rejected, still standing unamended in the source B3 draws from.

### "Most visible" is a comparative with no metric

"Bias is most visible in the exchange rather than in the speaker" asserts a difference in degree between two quantities neither of which is measured anywhere. There is no visibility metric, no rater, no comparison.

### Does the thing exist today?

No. There is no dyadic quantity anywhere. The candidates:

- `calculate_arrhythmia_alpha` (`mpn_engine/core/mpn_calculus.py:183-203`): three constants on a same-speaker test, CSV-only (above).
- The continuous inter-character dissonance `D_ij(t) = ||B_i − B_j||² + γ d/dt(B_i·B_j)` specified at `RSCH-39-MUSICAL_PSYCHOMETRIC_NOTATION.md:227-235` is **"not implemented"** (`repo-deconstruction.md:285`).
- `character_relationships` exists as a SQL table (`scripts/enhanced_character_schema.sql`, per `repo-deconstruction.md:112`) with no computation over it.
- `ScoreOrchestrator` holds per-actor staves but computes each from that actor's own profile and the global state (`score_orchestrator.ts:268-285`); no term takes two actors as arguments.

B3's stated musical home is "counterpoint and in harmonic relation" (`:147`). Harmony in the shipped pipeline is **global** — one chord per frame from `globalParams.chordRoot`, orchestrated once (`score_orchestrator.ts:258-264`). A global chord cannot express a relation between speaker A and speaker B while a different relation holds between A and C in the same frame.

### Unfalsifiable residue

"most visible"; "the natural unit"; "a natural musical home". None names an observation. The whole assertion can be held under any outcome.

### Ambiguous terms, quoted exactly

"operates dialectically"; "most visible in the exchange"; "a relation to what has just been said"; "a relation to another speaker"; "the natural unit is the pair, not the person"; "It gives the second musical voice something to do"; "a natural musical home in counterpoint and in harmonic relation"; "They will not all be the same."

### Block A dependencies inherited

- **A10, withdrawn** (`BLOCK-A-ARBITRATION.md:43-49`): same structure, same unresolved arithmetic.
- **A9, withdrawn** (`:35-41`): "a relation to what has just been said" requires the carried prior utterance the system does not keep.
- **A3, untestable** (`:67-77`): a dyadic modulation of a simplex-constrained triple is exactly the arithmetic the arbitration flagged.
- **B1's unresolved bias count** propagates: B3 cannot sort biases into dyadic and individual until it is settled how many there are.

### Severity: **FATAL**

Self-contradictory in its own entry, contradicts B1 across the block, structurally identical to a just-withdrawn assertion whose defect it does not address, and stated in comparatives with no metric.

---

## B4. Three layers are separable and simultaneously notatable

**Claim under attack** (`:153`): "The stable profile, DISC and the wider personality vector; the moving state, trauma, entropy and the registers; and the biases in play, can be carried at once in a single notated score without collapsing into one another."

### Strongest single objection — the arithmetic, as instructed

`REVIEW-A-constraints.md:296` establishes the bound: "**The practical budget for state is two to three channels per stave.**" `:309` establishes the throughput: "Nine numbers reduce to about 6.6 bits per character per frame" — τ to 8 dynamic levels, argmax(r,s,i) to 3 modes, argmax(DISC) to 4 articulations, log₂(8 × 3 × 4) ≈ 6.6 bits, with meter global.

That budget is **already fully spent by the moving state and one argmax of the stable profile**. Three channels: dynamics, mode, articulation. B4 adds a third layer to a budget with nothing left in it, and the constraint review says so in its own words: "B4's three simultaneous layers, raised in Block B, exceed the budget before the biases are added" (`REVIEW-A-constraints.md:313`).

The overrun is worse than one channel, because B4 does not say "DISC". It says "DISC **and the wider personality vector**" (`:153`). In this corpus the wider vector is OCEAN (5) plus Dark Triad (3) — eight more numbers competing for a channel allocation that is already at capacity with DISC reduced to a single argmax over four values. B4's layer one, at full statement, is twelve numbers reaching two bits.

And the 6.6 bits is not per layer. It is per character per frame, total, for everything. Three layers do not each get 6.6 bits; they share them.

### The layers already collapse, in the only implementation that exists

B4's **What to settle first** proposes the allocation: "a profile that is stable across a play should probably own timbre and register" (`:157`). In shipped code the stable layer does not own timbre, and timbre is not stable:

- `selectInstrumentForActor` scores instruments at **40% DISC** (`src/lib/psychometric_instrument_mapper.ts:100-102`), **20% trauma** (`:107-124`) and **20% entropy** (`:126-129`). The moving state owns 40% of the channel B4 assigns to the stable profile.
- Worse, it is called **inside the per-frame loop**: `stave.instrument = selectInstrumentForActor(actor)` at `score_orchestrator.ts:281`, immediately after `actor.currentState = { trauma, entropy, rsi }` at `:280`. The "stable profile" layer's instrument is recomputed every frame from the moving state. It can change between two consecutive lines of the same speaker.
- The articulation channel is contested three ways and resolved by pre-emption: trauma first (`mpn_reference_lookup.ts:188-190`), bias second (`:192-212`), DISC not at all in that function. The constraints table assigns articulation to DISC (`REVIEW-A-constraints.md:305`); the code assigns it to trauma-then-bias. Two of B4's three layers are already fighting over one channel and the state layer wins.

B4 asserts the three can be carried "without collapsing into one another". In the only running system, they have collapsed already, and no notation question has been reached yet.

### The author's own formalism has already merged layers one and three

`MPN_ACADEMIC_DISSERTATION.md:484-499` takes DISC + OCEAN + Dark Triad + 12 biases into one 24-vector, reduces it by PCA/ICA to eight factors, L2-normalises to `u ∈ ℝ⁸`, and calls the result "personality input to the musical mapping functions" (`:499`). B4's layer one and layer three are, in the author's published chapter, **one vector**. `:452-463` further states that DISC and OCEAN overlap at r ≈ 0.4–0.6 and higher — so layer one is not internally separable either, by the author's own table.

### "Three" is a quantity that does no work

Nothing in `:151-157` argues for three rather than two or four. The three named layers are not shown to be independent — the dissertation merges two of them — and no fourth candidate is excluded. The number is asserted, used as a headline ("Three layers on one stave is a reading problem", `:155`), and never exercised.

### The multi-layer precedent does not support the claim

`RSCH-41-SEVEN_STAFF_FUGUE.md` is the corpus's only multi-layer notation document and it is not about characters or psychology. Its seven staves are **architectural layers of a security stack** — "L0 - Catalog", "L1 - Equipment", "L2 - SBOM", "L3 - Threats", "L4 - Psychology", "L5 - Info Streams", "L6 - Predictions" (`RSCH-41:§2 table`). Exactly one of the seven is psychological. Nothing in it stacks a profile, a state and a bias for one subject.

Its conclusion concedes B4's objection outright: "the AI becomes the **Conductor**, the only entity capable of perceiving all 7 staves simultaneously and recognizing the emergent Fugue" (`RSCH-41:145`). The author's own multi-layer paper states that simultaneous perception of the layers requires a machine. B4 asserts a human reader can do three.

What ships from RSCH-41 is one decorative component whose data is fabricated: "// Generate simulated persistence bars based on trauma", `birthLayer = Math.floor(Math.random() * 5)` (`src/components/mpn-lab/MPNExperiment_PersistenceBarcode.tsx:23-31`), rendered under the caption "RSCH-41 // Topological Feature Lifespans" (`:51`). The frame field that selects a layer, `focusLayer` (`literary_data.ts:17`), feeds only three visualisation components (`MPNExperiment_PersistenceBarcode.tsx`, `MPNExperiment_StateEvolution7D.tsx`, `MPNExperiment_SevenBandWaveform.tsx`) and no audio or notation path.

### Unfalsifiable residue

"without collapsing into one another" — no collapse criterion, no legibility test, no reader study. The word "probably" appears inside a channel assignment (`:157`: "should probably own timbre and register"), which is a formal allocation stated as a guess.

### Ambiguous terms, quoted exactly

"the wider personality vector"; "the biases in play"; "carried at once in a single notated score"; "without collapsing into one another"; "the strongest form of the notation claim"; "should probably own timbre and register"; "a bias that operates between turns should own harmonic relation".

### Block A dependencies inherited

- **A1, hold with disclosure** (`BLOCK-A-ARBITRATION.md:79-83`): the state layer's contents are five scene-global components and one that moves.
- **A2, untestable** (`:67-75`) plus `REVIEW-A-constraints.md:309`, point 3: "The magnitudes A2 asserts exist are therefore not notated at all — only their ordering. A2 can be *measured* and cannot be *shown*." B4's middle layer is, at the notation, an argmax.
- **A4, documentation-fatal, undecided** (`:51-57`): B4 gives mode to the moving state, and there are four incompatible register-to-mode tables, two of them exact inversions. The layer cannot be notated until the table is chosen.
- **A8, amended** (`:23-33`): orchestration density, a timbre-channel quantity B4's stable layer would have to share, is selected by a scalar collinear at r = 0.915 with the fragmentation scalar.
- **A3, untestable** (`:67-77`); **A10, withdrawn** (`:43-49`) — A10 "would need a fourth per-character channel and there is none free" (`REVIEW-A-constraints.md:313`); B4 needs one too, for the same reason, and is not exempted.

### Severity: **FATAL**

It fails the programme's own published channel arithmetic before the biases are counted; the layers have already collapsed in the one running implementation; the author's own dissertation merges two of the three into a single normalised vector; and the only multi-layer precedent in the corpus concedes that simultaneous perception of its layers is a machine capability, not a reader's.

---

## B5. The leitmotif is the carrier of the long arc across acts

**Claim under attack** (`:161`): "Across multiple acts, what makes the representation legible is not the moment-by-moment state but the transformation of a motif that the listener has learned. The arc is the object; the frames are its samples."

### Strongest single objection

B5 requires a listener to have learned an original statement. **There is no stable original to learn.** A11's determinism is false as implemented: "nine unseeded random calls in the composer and one in the calculus, so the same state does not produce the same score. A user tests this by pressing render twice" (`BLOCK-A-ARBITRATION.md:61`). A motif that differs between renders cannot be the thing a listener learned in act one and recognises in act five. B5 is not merely untested; under the current implementation its precondition cannot be satisfied.

The second precondition also fails. B5 says the carrier is "the transformation of a motif". The arbitration on A6: "most of the transformations do not reach the output at all. Orchestration level, instrument assignment and harmonic context are computed and written to a console log; the motif inversion negates a field nothing reads, so it is inaudible" (`BLOCK-A-ARBITRATION.md:91`; `repo-deconstruction.md:339`). The carrier is silent.

### Nothing in the system has memory, so nothing accumulates an arc

`selectTransformation(trauma, entropy, rsi)` (`src/components/mpn-lab/leitmotif_generator.ts:243-266`) is a pure function of the current frame's state. A motif fragmented at frame 12 is re-derived from the unmodified original at frame 13 if the state falls back. There is no transformation history, no accumulated degradation, no state machine — "There is **no state machine** beyond this per-frame recomputation" (`repo-deconstruction.md:338`).

This makes B5's own second sentence false of the system: "The arc is the object; the frames are its samples." In the implementation the frames are the object; there is no arc object, and each frame is computed as if the play had just begun.

### "Across acts" — the corpus has no acts

There is no `act` field in the frame type (`src/components/mpn-lab/types.ts`). Act boundaries exist as **source comments only**: `// ACT I`, `// ACT II - The Spy Game`, `// ACT III - The Crisis` at `literary_data.ts:13, 110, 159` — three comments in the Hamlet block and none elsewhere. `additional_plays.ts`, which holds Antigone, contains no act marker of any kind.

The sample count is the harder problem. The corpus is ~232 frames across 13 plays (`repo-deconstruction.md:177`), about 18 per play. **Antigone is 12 frames** (`additional_plays.ts`, antigone block). B5 asserts a long arc across acts and proposes to demonstrate it on twelve samples of a five-episode tragedy, with a corpus the constraints review already prices at an effective n of 38 for the whole programme (`REVIEW-A-constraints.md:4.4 table`).

### A competing formulation of the arc is already live and contradicts A8

`MPN_ACADEMIC_DISSERTATION.md:111-112` states `OrchestrationalDensity = f(CharacterArc, NarrativeIntensity)` where `CharacterArc ∈ {introduction, development, crisis, resolution}`, and `:186` maps "Harmonic Context" to "Character arc phase". A8 states orchestration density is `0.7τ + 0.3H` (`ASSERTIONS-REGISTER.md:87`) and takes no arc argument. Two incompatible definitions of what drives orchestration are both in the corpus, and B5 asserts the arc is primary without withdrawing either.

### Unfalsifiable residue

"what makes the representation legible" — legible to whom, measured how; no listener, no task, no criterion. And the core sentence is close to analytic: a listener who has learned a motif recognises its transformation. Stated at this level it cannot fail, which is why it feels secure. The programme has run no listening test of any kind: "Searches for listening test / MOS / inter-rater / participants / FAD results / p-values return only plans and checklists" (`repo-deconstruction.md:459`), and the one result that exists in the dissertation is null — p = 0.72, effect size 0.08, n = 48 (`BLOCK-A-ARBITRATION.md:101`).

### Ambiguous terms, quoted exactly

"the long arc"; "what makes the representation legible"; "a motif that the listener has learned"; "The arc is the object; the frames are its samples"; "meaningful because the listener has heard the original"; "a functional requirement and not a stylistic choice".

### Block A dependencies inherited

- **A11 determinism, unimplemented** (`BLOCK-A-ARBITRATION.md:59-66`). Fatal to the precondition. The arbitration adds that this "blocks every listening study in the programme" (`:63`) — and B5 is testable only by listening.
- **A6, implementation-falsified** (`:89-94`). The transformations B5 makes the carrier do not reach the output.
- **A7 levels kept, selector broken** (`:95-97`) and **A8 amended** (`:23-33`). The two scalars that drive the motif's degradation and growth across an arc correlate at r = 0.915 and, by the arbitration's algebra, "no corpus will rescue it" (`:27`). An arc built on two near-identical scalars traces one curve, not two.
- **A1** (`:79-83`): with trauma the only component that audibly moves, the "arc" is a plot of one hand-authored variable.

### Severity: **SERIOUS**

The craft intuition behind B5 is the least wrong thing in Block B. But as an assertion it is unfalsifiable as stated, every one of its four preconditions is unimplemented or amended, and the corpus it names — twelve Antigone frames, acts present only as comments — cannot show a long arc.

---

## Across the set

### Contradictions between B assertions

1. **B1 vs B3, direct.** B1: "Whether a bias is a property of a speaker, of a turn, or of an exchange. The theory needs one answer" (`:135`). B3: "the natural unit is the pair, not the person" (`:145`), then "Which biases are dyadic and which are individual. They will not all be the same" (`:149`). B1 demands one answer; B3 gives one and then says there is not one. The register holds all three positions simultaneously.
2. **B3 contradicts itself inside its own entry** — `:145` against `:149`, above.
3. **B1 vs B4 on where bias lives.** B1 asserts bias is a property representable per speaker; B4 assigns bias to "harmonic relation" (`:157`), which in the shipped pipeline is a single global chord per frame (`score_orchestrator.ts:258-264`). A per-speaker property cannot be carried on a global channel.
4. **B2 vs B5 on what the object is.** B2: the turn is the unit and "a scene is about what passes between people" (`:141`). B5: "The arc is the object; the frames are its samples" (`:161`). One says the meaning is in the exchange, the other says the exchange is a sample of something else. Both are asserted; neither is reconciled.
5. **B4 vs B5 on channel ownership.** B4 gives timbre and register to the stable profile (`:157`). B5 makes the motif's transformation the carrier, and the transformation typology is modal recolouring, fragmentation, **orchestration growth** and harmonic recontextualisation (`ASSERTIONS-REGISTER.md:65`). Orchestration growth is a timbre-channel operation. B4 has already spent the channel B5 needs.

### Contradictions between Block B and the arbitrated Block A

1. **B2 requires the internal model A9 was withdrawn for lacking** (`BLOCK-A-ARBITRATION.md:35-41`). The register asserts the requirement in the block written immediately after the withdrawal.
2. **B3 is A10's structure after A10's withdrawal** (`:43-49`), and does not address the unit-bound and simplex arithmetic that killed it.
3. **B4 exceeds a bound the programme's own constraint review states in the same folder** (`REVIEW-A-constraints.md:296, 309, 313`), and depends on A4's mode table, which is undecided and documentation-fatal (`BLOCK-A-ARBITRATION.md:51-57`).
4. **B5 requires determinism that A11 does not have** (`:59-66`) and transformations that A6 does not deliver (`:89-94`).
5. **B1 contradicts `MPN_ACADEMIC_DISSERTATION.md:484-497`**, which performs the personality reduction B1 denies, and disagrees with four separate bias counts in the corpus — the same condition that earned A4 "nothing publishable until one table is chosen".
6. **Block B abandons the register's own schema** (`ASSERTIONS-REGISTER.md:7`): no formal content, no failure condition, no play-run test for any of the five. Block A was arbitrable because it had these. Block B is not.

### The weakest assertion

**B2.** It is the only assertion in the register whose central verb names a formal operation — "decomposes mathematically" — while containing no mathematics at all, and the one substantive thing it does require, a carried relation to the previous turn, is the internal model whose absence caused A9 to be withdrawn a day earlier in the same review cycle.

### What the author is most likely fooling himself about

That Block B is an extension. It is mostly the return of what was just removed. A9 was withdrawn because the system carries no expectation from one moment to the next; B2 asserts that every turn carries "its relation to the turn before". A10 was withdrawn because relocating a subject's state into a relation with another party broke the unit bound and had no implementation; B3 relocates bias into the relation between speakers and says nothing about the bound. The two assertions the arbitration identified as "the two a critic would have gone for first" (`BLOCK-A-ARBITRATION.md:109`) have reappeared within ten lines of each other, wearing the vocabulary of dialogue and dialectic rather than of gaze and desire, and the register presents this as the theory's "growth area" (`:5`, "Block B is the extension"). The deeper self-deception is procedural: Block A produced real findings — A8's collinearity, A9's uncomputed quantity, A4's four tables — because every assertion was required to name what would refute it. Block B has dropped that requirement for all five assertions while keeping the word "assertions", and so has produced a set of claims that read as more ambitious than Block A precisely because none of them can be shown to be wrong. The growth is in scope, not in content: three layers instead of one, the pair instead of the person, the arc instead of the frame — each a larger claim resting on a smaller implementation, in a system where the only component that audibly moves is a hand-authored trauma scalar.
