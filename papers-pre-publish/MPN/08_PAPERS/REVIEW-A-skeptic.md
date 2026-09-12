# Review A — Skeptic / Challenger

**Subject:** Block A, assertions A1–A11, `/home/claude/ms-drafts/ASSERTIONS-REGISTER.md`
**Operating question:** assume this theory fails. Why?
**Date:** 2026-09-12

**Mandate.** I attack. I do not rebuild. No fixes are proposed below, and where an amendment is implied it is named only to state what the assertion cannot survive without.

**Evidence base.** The theory paper S1; the primary theory documents (`10_CORE_EQUATIONS.md`, `11_ENTROPY_CALCULUS.md`, `12_LYAPUNOV_STABILITY.md`, `02_BORROMEAN_TOPOLOGY.md`, `MPN_ACADEMIC_DISSERTATION.md`); the repository deconstruction §2, §3, §9; the research findings q4 and q5. Where I make an empirical claim about the author's own annotated corpus I computed it directly from `src/components/mpn-lab/literary_data.ts` (119 frames) and `src/components/mpn-lab/additional_plays.ts` (113 frames), n = 232.

---

## Three findings that govern everything below

Before the assertion-by-assertion work, three facts from the implementation change the standing of most of Block A, and every reader of this register should have them first.

**Finding 1 — the registers are a constant on the primary path.** Zero of the 232 annotated frames carries an `r`, `s` or `i` value. `grep -c "real:"` over both play-data files returns 0. The conductor page therefore falls through to its default on every frame of every play:

```
src/app/mpn-conductor/page.tsx:366-370
const rsi = { real: currentFrame?.real ?? 0.33,
              symbolic: currentFrame?.symbolic ?? 0.33,
              imaginary: currentFrame?.imaginary ?? 0.34 };
```

`currentFrame.real` does not exist, so `rsi` is `(0.33, 0.33, 0.34)` for all 232 frames. The second path, `GeniusComposer`, does not read the frame at all; it hard-codes the same triple:

```
src/components/mpn-lab/GeniusComposer.ts:159
const rsi = { real: 0.33, symbolic: 0.33, imaginary: 0.34 }; // Default RSI
```

The Lacanian content of the system, the part that is McKenney's and not anyone else's, has never taken a value other than one arbitrary near-tie in any run the author has listened to. A2, A3 and A4 are asserted about a quantity the system does not vary.

**Finding 2 — entropy is pinned at 0.5 on the path a user hears.** `ScoreOrchestrator` calls the composer with five arguments:

```
src/components/mpn-lab/score_orchestrator.ts:302-307
notes = await this.composer.composeMelody(transformedMotif, globalParams, 4, 0, trauma);
```

The signature is `composeMelody(leitmotif, params, duration, startBeat, intensity, trauma = intensity, entropy = 0.5)` (`GeniusComposer.ts:148-154`). Entropy is never passed. So every transformation downstream — the fragmentation scalar of A7, the density scalar of A8 — runs on `H = 0.5` regardless of the annotated frame. The consequence is arithmetic: fragmentation score `0.6(0.5) + 0.4τ = 0.3 + 0.4τ ∈ [0.3, 0.7]`, which touches only two of the five named stages. On the shipped path the motif is **never stated in full and never dissolves**. Orchestration intensity `0.7τ + 0.15 ∈ [0.15, 0.85]` reaches tutti only at `τ = 1.0` exactly.

**Finding 3 — two of the four named transformations are computed and thrown away.** In `GeniusComposer.ts:179-190` the master call `applyProfessionalTransformations` returns `{mode, orchestrationLevel, instruments, fragmentation, harmonyContext}`. Grepping every use of `transformations.` in that file returns four lines: 186 (`.mode`), 190 (a `console.log`), 316 and 318 (`.fragmentation.level`). `orchestrationLevel`, `instruments` and `harmonyContext` appear **only inside the log string**. Orchestration growth and harmonic recontextualisation — two of the four transformations A6 is about — never reach a note.

---

## A1. The state is nine-dimensional, and these are the nine

**1. Strongest objection.** The assertion is about a *state of a subject*, and the implementation has no per-subject state. `ScoreOrchestrator.updateFrame` builds one state object per frame and hands the identical `trauma`, `entropy` and `rsi` to every actor on stage:

```
score_orchestrator.ts:240-247   const state: PsychometricState = { trauma, entropy, rsi, disc: speakerProfile?.disc, ... }
score_orchestrator.ts:286-289   actor.currentState = { trauma, entropy, rsi };   // inside the loop over ALL staves
```

Five of the nine components (τ, H, r, s, i) are scene-global. The remaining four (D, I, S, C) are a fixed profile that does not move within a play — S1 §3.1 says so explicitly ("they individuate a character's voice across scenes while trauma and entropy move within one"). Therefore **no component of the state distinguishes two characters within a frame except a constant**. Hamlet and Claudius in the same frame have identical τ, H, r, s, i and differ only by a per-play constant. The nine-dimensional state is, per moment, a one-to-five-dimensional scene descriptor with a per-character constant attached. That is not a psychological state; it is a mood track with instrument assignment. If the redundancy test A1 proposes were run on the implementation's own output it would return, correctly, that five of nine components have zero within-frame variance.

**2. Unfalsifiable residue.** "A psychological state **sufficient for musical representation**." Sufficient for *what* representation, judged by *whom*, at what tolerance? Any output whatever can be called a representation of the input that produced it. As written, no observation contradicts sufficiency — the system always emits music, and the music always corresponds to the state by construction (S1 §5: the function is total). The falsification clause offered ("two states the theory calls identical demand different music from a competent composer") is a different and much weaker claim about discrimination, and it is the one being tested, not the one being asserted.

**3. Ambiguity.** "**sufficient for musical representation**" — one reader operationalises this as "a rater can recover the state from the music above chance," another as "a composer does not object to the cue." These are different experiments with different outcomes. Secondarily, "**bounded to the unit interval**" is ambiguous between *scaled to* [0,1] (a convention, no content) and *intrinsically bounded* (a claim that trauma saturates). The theory uses the first and talks like the second.

**4. Does the quantity do work?** Partially, and unevenly. Of the nine, only τ, H and DISC reach any musical parameter on the shipped path. τ → velocity (`mckenney_lacan_calculus.py:58-72`; `page.tsx:359`); H → tempo/meter (`:103-162`; `page.tsx:361-363`); DISC → instrument family (`:226-253`). r, s, i reach `rsi_to_mode` (`:191-200`) but with constant inputs (Finding 1). Note also that the 9-vector is not the advertised input space: the projector defines 57 dimensions (`ml/psychoscore_v2/models/projector.py:82-150`) of which OCEAN, Dark Triad, the four "physics" slots and the 36 one-hot biases are **not inputs to `phi_transform`** (`mckenney_lacan_calculus.py:537-580`), and the projector's own output is discarded at inference (`musicgen_lora.py:124-141`).

**5. Severity: SERIOUS.** The count "nine" survives as a design choice. The claim that it is a *state of a subject* does not survive contact with the implementation, which has never run with per-character τ, H or registers.

---

## A2. The Lacanian registers admit magnitudes

**1. Strongest objection.** The assertion as written cannot fail, and the only operational assignment in the system is circular. Taking these in order.

The claim is that r, s, i "can each be assigned a number." Assignment is always possible; a number can be assigned to anything. The assertion has content only if it says the assignment is *reliable* or *recoverable*, and it does not say that. Its own falsification clause silently substitutes the stronger claim ("competent readers cannot assign the magnitudes with any agreement"), which is not what §A2 asserts.

Then the one path that actually produces varying register values does so by counting the author's own labels. `analyzeRSI` (`psychometric_calculus.ts:236-250`) counts keyword hits in a text and normalises. The text it is given is the frame's `analysis` field — the author's own hand-written critical prose (`score_orchestrator.ts:232`: `const rsi = analyzeRSI(frame.analysis)`). That prose contains the register names as literal strings: `literary_data.ts:22` "Rationality (Symbolic) attempting to deny the Real"; `:28` "The Real ruptures the screen of reality." The measurement recovers the register because the annotator wrote the register's name into the material being measured. This is not an estimate of a magnitude; it is a lookup of a label the author already assigned, dressed as an inference. If this is the evidence that the registers admit magnitudes, the evidence is that the author can write the word "Real."

The third-rater argument in the register ("Lacan's own reading gives a fourth rater whose ratings are already published in prose") compounds this rather than escaping it. Lacan's seminars are prose with no magnitudes in them. Converting them into r, s, i requires a rater, and that rater's output is then compared against the author's ratings of the same passages. That is two readings by people trained on the same texts, not an independent instrument.

**2. Unfalsifiable residue.** "**can each be assigned a number for a given subject at a given moment**." Nothing could contradict this. Numbers can be assigned. The residue is the whole assertion.

**3. Ambiguity.** "**for a given subject**" — Lacan's registers are not properties a subject *has* in the way a temperature is; they are orders in which a subject is situated. Two competent readers will divide immediately on whether "Hamlet's Symbolic is 0.6" names a quantity of the subject, a quantity of the scene, or a quantity of the reading. The theory needs one and states none. Also "**at a given moment**" — a moment is a frame in the implementation, a speech act to one reader, a scene to another; the 232 frames are of wildly different textual extent.

**4. Does the quantity do work?** Barely, and not as a magnitude. `rsi_to_mode` (`mckenney_lacan_calculus.py:191-200`) and `getModalTransformation` (`leitmotif_transformation_rules.ts:64-90`) both consume only `argmax(r,s,i)` — a three-way categorical, not a magnitude. `psychometric_calculus.ts:310` uses `r` as a magnitude (`tension = rsi.real*0.9 + entropy*0.1`) and `:347-352` uses thresholds on each. So the magnitude claim is exercised only in the TypeScript tension and key functions; everywhere else a ranking would serve identically. And on both primary paths the inputs are the constant `(0.33, 0.33, 0.34)`.

**5. Severity: FATAL.** Not because the registers certainly admit no magnitudes, but because the assertion as written asserts nothing that could fail, its own test tests a different claim, and its only running operationalisation is circular.

---

## A3. The registers are competitive, and the state lives on a simplex

**1. Strongest objection.** The constraint `r + s + i = 1` is imposed by the measurement procedure, not discovered in the data, so the substantive claim the theory says it is making is unobservable in every path that produces the numbers. `analyzeRSI` counts three keyword tallies and then divides each by their sum (`psychometric_calculus.ts:244-249`). The output sums to one *because it was divided by its own total*. There is no possible corpus for which this procedure returns a non-simplex point. S1 §4 insists the simplex "is a substantive claim about them, not a normalisation convenience"; the code is the normalisation convenience, exactly.

And the division is not even safe. `const total = attractors.real + attractors.symbolic + attractors.imaginary || 1;` — when no keyword matches, `total` becomes 1 and all three components are 0. The state then sums to **zero**, off the simplex entirely, and the two implementations disagree about what happens next: `rsi_to_mode(0,0,0)` returns `'ionian'` (the `s >= r ∧ s >= i` branch, `mckenney_lacan_calculus.py:194-197`) while `getModalTransformation` sorts and takes `'real'` first, returning Dorian or Aeolian (`leitmotif_transformation_rules.ts:68-77`). The degenerate state is reachable, unhandled, and produces contradictory music.

There is a second, structural objection. A3 says investment in one register is *bought at the cost of* the others. `02_BORROMEAN_TOPOLOGY.md:80` defines stability as balance: `BSI = min(r,s,i) / max(r,s,i)`, maximal at `(1/3, 1/3, 1/3)`. Combine the two and the theory says: any register investment whatever reduces the subject's stability, and the maximally stable subject is the one with no dominant register. But A4 requires a dominant register to select a mode. So on the theory's own terms, a stable subject has no determinate music, and the state the theory calls healthiest is the state at which the mode function is discontinuous in every direction. The system's default `(0.33, 0.33, 0.34)` sits at precisely that point: a perturbation of 0.01 flips the output across the entire modal set. That is not a robustness quibble; it is the operating point.

**2. Unfalsifiable residue.** "**encodes a competitive relation between the registers**." The word *encodes* does no falsifiable work. If independent ratings turn out uncorrelated, the theory can say the simplex *encodes* a relation the raters failed to express; if negatively correlated, confirmation. The register's own test (rate independently, inspect the correlation matrix) is the right test and it is testing a claim about raters, not about the encoding.

**3. Ambiguity.** "**competitive**" — one reader takes this as a within-subject trade-off over time (investing here now means less there now), another as a between-subject constraint (some subjects are simply more Symbolic than others), a third as logical exclusion. A negative correlation would follow from the first and not the second. The theory uses the word for all three.

**4. Does the quantity do work?** The constraint itself does no work anywhere. Nothing in the Python calculus checks or enforces `r+s+i=1`; `PsychometricVector` has no validator (`mckenney_lacan_calculus.py:25-51`), and the defaults `0.33/0.34/0.33` sum to 1.00 only by hand. Every consumer either takes an argmax (insensitive to the constraint) or thresholds a single component (`psychometric_calculus.ts:347-352`), which would work identically on a cube. **The simplex is the theory's flagship geometric claim and no function in the codebase depends on it.**

**5. Severity: FATAL.** The constraint is manufactured by the normalisation that produces the numbers, it is violated by the degenerate case, no downstream function uses it, and it contradicts A4 at the system's own default state.

---

## A4. The dominant register selects the mode, with trauma as the second switch

**1. Strongest objection.** There are three mutually incompatible register→mode tables in this project, and the one A4 states is not the one in the theory's own equation document, nor the one in either calculus module, nor the one in the served endpoint. It appears in exactly one file.

- A4 as asserted, and `leitmotif_transformation_rules.ts:76-89`: Real → Dorian/Aeolian, Symbolic → Lydian/Mixolydian, Imaginary → Phrygian/Locrian, switch at τ > 0.6.
- `10_CORE_EQUATIONS.md:170-178` — the document whose title is *Core Equations* — and `mckenney_lacan_calculus.py:191-200`, and `mpn_reference_lookup.ts:270-278`, and `README.md:125-127`: Real → **Phrygian**, Symbolic → **Ionian**, Imaginary → **Lydian**, and **no trauma switch at all**.
- `ml/psychoscore_v2/inference/server_v2.py:195-227`: mode from **trauma only**; the registers are not consulted.

Note the direction of the disagreement. It is not a detail: in the core-equations table the Real gets Phrygian, and in A4 Phrygian goes to the Imaginary. The two tables assign the same mode to opposite registers. A reader cannot know which assignment the theory is defending, and the listener study A4 asks for would have to pick one and would thereby fail to test the other two.

Compounding this: the "dominant register" is `(0.33, 0.33, 0.34)` on both primary paths (Finding 1). Imaginary wins by one hundredth, always. So the shipped system produces Phrygian below τ = 0.6 and Locrian above it, for every character in every play, and the modal variety A4 describes has never been exercised. Meanwhile the Python default is `(0.33, 0.34, 0.33)` — Symbolic wins — so the two implementations of the same theory disagree about the mode of the default state because of a 0.01 difference in a constant.

Finally, the rationale offered in S1 §4 is internally unstable: "the Symbolic is elevated and rule-governed, which the sharpened fourth and the lowered seventh respectively colour." The sharpened fourth (Lydian) and the lowered seventh (Mixolydian) are opposite in brightness, and they are here made to serve the *same* register, with trauma choosing between them. But trauma is asserted (A5) to act "predominantly on force," not on colour. A4 and A5 give trauma two jobs without saying how they share it.

**2. Unfalsifiable residue.** "**in any careful framing of the question**," in the falsification clause. This is a defeater for any negative result: a study that fails becomes a study that framed the question carelessly. As written, no listener study can disconfirm A4, because the standard of care is set after the outcome is known.

**3. Ambiguity.** "**selects the darker member**." Darker is not ordered in music theory. Lydian is brighter than Mixolydian by the standard brightness ordering (Lydian–Ionian–Mixolydian–Dorian–Aeolian–Phrygian–Locrian), so Symbolic's pair is ordered correctly; but the Real's pair puts Dorian (brighter) as the low-trauma member and Aeolian as the dark one, which is also correct, while the Imaginary's pair, Phrygian then Locrian, spans the two darkest modes in the system. So the "darker member" of the Imaginary at low trauma is darker than the "darker member" of the Real at high trauma. A listener asked to hear register-through-mode has to hear brightness and register simultaneously in a design where the two are confounded across pairs. Also "**θ = 0.6 in the current parameterisation**" — "current" is doing load-bearing work for a constant with no derivation anywhere in the corpus.

**4. Does the quantity do work?** The *mode* does work — `getModeScaleDegrees(targetMode)` supplies the scale offsets applied to every pitch at `GeniusComposer.ts:304-310`. The *register* does not, because its input is constant. The trauma switch does work, and is the only live input to mode selection on that path.

**5. Severity: FATAL.** Three incompatible tables, the asserted one confined to a single file, contradicted by the document called *Core Equations*, exercised only at a constant near-tie, and armoured with an unfalsifiable escape clause.

---

## A5. Trauma and entropy are separable, and act on different musical parameters

**1. Strongest objection.** This is the assertion that comes off best on its own data and worst on its own implementation. Across all 232 annotated frames, **corr(τ, H) = 0.28**. That is genuinely low and it is evidence that the author can hold the two apart when annotating. But three things undercut the assertion.

First, this is one rater rating his own construct; it shows the distinction is *writable*, not that it is *there*. The inter-rater evidence the assertion needs does not exist.

Second, the separation is destroyed immediately downstream. `lyapunov_exponent(τ, H) = (τ + H − 0.5)/2` (`mckenney_lacan_calculus.py:290-292`) collapses both into one scalar, and that scalar then drives chord type, rhythm class, crisis detection and stability zone (`:308-384`, consumed in `phi_transform` at `:562-575`). Over the author's own frames, **corr(λ, fragmentation score) = 0.989**. Having asserted that τ and H are separable and act on different parameters, the theory then routes harmony and rhythm through their sum. A5's second half — "trauma acts predominantly on force while entropy acts predominantly on coherence" — is false of the implementation it is supposed to describe.

Third, on the shipped path H is not a variable at all (Finding 2: pinned at 0.5), so entropy acts on nothing in the composer.

**2. Unfalsifiable residue.** "**act predominantly on**." Predominantly admits any degree of cross-loading. Any observed influence of entropy on dynamics is compatible with trauma acting *predominantly* on force. No measurement outcome is excluded.

**3. Ambiguity.** "**entropy is the disorder of symbolic organisation**." The theory's own documents give three non-equivalent operationalisations, and two competent readers will pick different ones. `11_ENTROPY_CALCULUS.md:80-90` defines `H_script = −Σ_speakers P(s) log₂ P(s)` — Shannon entropy over *turn-taking*, a property of a scene's speaker distribution, which cannot be a property of an individual subject at all. `mpn_engine/core/mpn_calculus.py:135-165` computes it from *punctuation counts*, despite a docstring claiming Shannon entropy. And `literary_data.ts` sets it by hand. A quantity whose three definitions are a scene statistic, a typographic count, and an intuition is not one quantity.

**4. Does the quantity do work?** τ: yes, heavily (velocity, dynamic marking, fragmentation, density, neo-Riemannian selection, clinical health). H: yes in the Python calculus (tempo, meter, syncopation, tempo variance) and on the conductor page; no in the composer (pinned). The named `shannon_entropy` and `normalized_entropy` helpers (`mckenney_lacan_calculus.py:165-184`) are **never called anywhere**. The theory's flagship information-theoretic quantity is dead code; H is always a hand-set number or a punctuation tally.

**5. Severity: SERIOUS.** The separability half is the best-supported claim in Block A on the author's own corpus. The "act on different parameters" half is contradicted by the implementation, which merges them into λ and then routes four musical decisions through the merge.

---

## A6. The transformation typology is a function, not a repertoire

**1. Strongest objection.** Two of the four named transformations are not functions of `p`, and the theory can be shown this from its own source.

*Harmonic recontextualisation* is `harmonicallyRecontextualize(chord, fromEmotion, toEmotion)` (`leitmotif_transformation_rules.ts:163-188`). Its emotion arguments are not derived from `p`; they are **string literals hard-coded at the call site**: `harmonicallyRecontextualize(chord, 'hope', 'despair')` and `(chord, 'innocence', 'corruption')` (`:352-356`). The transformation is a six-entry chord dictionary that returns its input unchanged for any chord not in the table (`:183`: `transformations[key]?.[chord] || chord`). The chord actually passed from the composer is the literal `'Cm'` (`GeniusComposer.ts:181`, with the comment "Default chord, could be passed from params"). `'Cm'` is not a key in `hope_to_despair`, whose keys are `Cmaj, Gmaj, Fmaj, Amaj, Dmaj, Emaj`. **Harmonic recontextualisation is provably the identity map on the shipped path**, and its output is then discarded anyway (Finding 3).

*Orchestration growth* is computed (`getOrchestrationLevel`, `:121-130`) and, per Finding 3, reaches only a `console.log`. The instrument actually chosen comes from a different function on a different basis — `selectInstrumentForActor` (`src/lib/psychometric_instrument_mapper.ts:89-149`), a weighted score over DISC cosine and register bonuses — with no reference to the density ladder A8 describes.

So of the four transformations A6 names, one (modal recolouring) is a function of a constant, one (fragmentation) is a function of τ and a pinned H, one is a discarded no-op, and one is discarded. "A function, not a repertoire" is not what the code implements; a repertoire is closer to it, minus the taste.

Against the determinism half: `discToInstrument` picks the instrument with `Math.random()` (`psychometric_calculus.ts:203-217`), and the character-analysis fallback sets `entropy: Math.random()*0.3+0.2` (`src/app/api/analyze-character-psychometrics/route.ts:251`). The same state does not produce the same output.

**2. Unfalsifiable residue.** "**triggered by stated conditions on the state rather than selected by taste**." The conditions were selected by taste; stating a condition does not remove the taste from it, it relocates it into a constant. Nothing observable distinguishes "a function whose thresholds were chosen by ear" from "taste with extra steps," and A6 offers no test that would. Its falsification clause ("often enough that the function is not a description of the practice") leaves "often enough" unquantified, so any rate of musician disagreement is survivable.

**3. Ambiguity.** "**total deterministic function of p**." A reader of S1 §5 takes `p` to be the nine-vector; a reader of the code finds that `harmonicallyRecontextualize` takes a chord and two enum literals, `getOrchestrationLevel` takes two scalars, `fragmentLeitmotif` takes a leitmotif plus two scalars plus a note array, and `selectInstrumentForActor` takes an actor object. There is no single argument `p` anywhere. Also "**as practised by Williams and Shore**" — the claim that these four *are* the practice is an unargued reduction of two composers' output to a four-item list, sourced in the code to a comment ("Williams fragments Luke's theme during Vader revelation", `:207`) rather than to analysis.

**4. Does the quantity do work?** Modal recolouring: yes (scale degrees). Fragmentation: yes, but see A7 — only the `.level` string survives, not the function's own note output. Orchestration growth: **no**. Harmonic recontextualisation: **no**, twice over (identity map, then discarded).

**5. Severity: FATAL.** As written, the assertion is that four named transformations are total deterministic functions of the state. Two are not functions of the state, one is stochastic in its sibling function, and the composition is non-deterministic. The assertion cannot stand in this form.

---

## A7. Fragmentation has ordered levels, selected by a scalar

**1. Strongest objection.** The scalar selects a label, the label is then thrown away, and a *different* rule is applied in its place. `fragmentLeitmotif` (`leitmotif_transformation_rules.ts:209-265`) computes the score, picks a level, and returns a `FragmentedTheme` containing a level, **a set of notes**, and a description. The consumer uses only the string:

```
GeniusComposer.ts:316-326
if (transformations.fragmentation.level !== 'full') {
    if (fragmentLevel === 'truncated')      pitches = pitches.slice(0, Math.ceil(pitches.length * 0.6));
    else if (fragmentLevel === 'core_motif') pitches = pitches.slice(0, Math.min(4, pitches.length));
    else if (fragmentLevel === 'interval_only') pitches = pitches.filter((_, i) => i % 2 === 0);
}
```

The carefully constructed note output of the fragmentation function never plays. A second, cruder slicing rule reimplements it at the call site. And `'dissolution'` — the terminal stage, the one A7 says Antigone is the strongest case for — **has no branch**: it falls through all three conditions and the pitches are returned unfragmented. The most disintegrated state in the theory produces the full motif.

That is on top of Finding 2. With H pinned at 0.5 the score is `0.3 + 0.4τ ∈ [0.3, 0.7]`, so across all 232 frames only `truncated` and `core_motif` are ever selected. `full` is unreachable (requires score < 0.25, i.e. H < 0.42 at τ = 0), and `interval_only` and `dissolution` are unreachable. A7's five ordered levels are, in the running system, two.

**2. Unfalsifiable residue.** "**named stages**" with the failure condition "or the stages are not the right stages." There is no stated criterion for a stage being right. Any proposed alternative stage list can be accommodated by renaming, and any perceptual result can be attributed to the stages being wrong rather than the ordering being wrong. The clause is a placeholder for a test, not a test.

**3. Ambiguity.** "**interval residue**" — two readers will operationalise this as (a) the characteristic interval of the motif sounded alone, (b) every second pitch retained, which is what the code does, or (c) an intervallic reduction preserving contour. These produce audibly different objects. Also "**monotone in perceived disintegration**" — perceived by whom, and on what scale? Nothing in q5 supports a measurable "disintegration" percept; the nearest supported construct is Farbood-style continuous tension, which is not the same thing.

**4. Does the quantity do work?** The scalar does work (it picks one of two reachable labels). The **function's output does not**: its `notes` field is computed and discarded at `GeniusComposer.ts:316`. The weights 0.6/0.4 have no derivation in any theory document; `10_CORE_EQUATIONS.md` does not contain the fragmentation equation at all, and `phi_transform` (`mckenney_lacan_calculus.py:537-580`) does not return a fragmentation level. A7 is not in the master transformation.

**5. Severity: SERIOUS.** The ordered-levels claim survives as a design, but only with the amendment that three of the five stages have never been produced, the terminal stage is a silent no-op, and the selecting function's output is discarded in favour of a different rule.

---

## A8. Orchestration density has ordered levels, selected by a differently weighted scalar

**1. Strongest objection.** A8 states its own falsification condition — "If they are nearly collinear, simplify the theory" — and the author's own annotated corpus meets it. Computing both scalars over all 232 frames:

| quantity | value |
|---|---|
| corr(0.6H + 0.4τ, 0.7τ + 0.3H) | **0.915** |
| first principal component's share of their joint variance | **95.8%** |
| distinct (fragmentation level, density level) pairs realised out of 25 | **10**, all within one step of the diagonal |
| corr(λ, fragmentation score) | 0.989 |

The two scalars are one variable. This is not an accident of the data; it is forced by the construction. Two convex combinations of the same two inputs with weights (0.6, 0.4) and (0.7, 0.3) have an inner-product angle of about 24 degrees, so their correlation is bounded near 0.84 even for *independent* uniform τ and H, and the author's mild positive corr(τ, H) = 0.28 pushes it to 0.915. **No choice of annotation could have made these two scalars separable, given these weights.** The theory has one intensity variable wearing two hats, and by its own stated rule it should be simplified. The different weightings are decoration, exactly as A8 feared.

Second objection: the density ladder does not reach the orchestra. Finding 3 — `orchestrationLevel` and `instruments` are computed and logged only. The instruments actually sounded are chosen by `selectInstrumentForActor` (`psychometric_instrument_mapper.ts:89-149`) on DISC cosine similarity plus register bonuses, which has no density concept. And with H pinned at 0.5, `TUTTI_FORTISSIMO` (intensity ≥ 0.85, i.e. τ ≥ 1.0) is reachable only at the exact endpoint.

**3. Unfalsifiable residue.** None worth naming; A8 is the most honestly stated assertion in Block A. Its condition is sharp, checkable, and cheap. That is why it fails.

**3. Ambiguity.** "**density**" — the level names conflate three separable things: number of players (solo/chamber/section), dynamic level (the name `TUTTI_FORTISSIMO` smuggles in a dynamic, which A5 assigns to trauma alone), and instrumental register/colour (the level tables at `:135-145` change families, not just counts). A reader asked to judge "density" will not know which of the three is being claimed.

**4. Does the quantity do work?** **No.** `getOrchestrationLevel` is called once (`leitmotif_transformation_rules.ts:345`), its result is placed in the returned object, and every consumer of that object ignores the field except a log line. `getInstrumentsForLevel` is called at `:346` and its result likewise never leaves the object. A8's quantity is computed and discarded in the strictest sense available.

**5. Severity: FATAL.** The assertion supplies a criterion for its own withdrawal, the criterion is met at r = 0.915 / PC1 = 95.8% on the author's own data, and the quantity is unconsumed.

---

## A9. Objet a is the divergence between internal model and observed state

**1. Strongest objection.** The implemented quantity is not a divergence, is not between a model and an observation, and is not the quantity the assertion names. The assertion and the dissertation both give:

```
MPN_ACADEMIC_DISSERTATION.md:235
ObjA_Intensity = VariationalFreeEnergy(InternalModel, ObservedState)
```

The code gives:

```
ml/psychoscore_v2/models/advanced_extensions.py:212-227
def object_petit_a(system_coverage, threat_coverage):
    union = system_coverage + threat_coverage - (system_coverage * threat_coverage)
    return max(0.0, min(1.0, (1.0 - union) * 2))
```

which reduces algebraically to `clamp(2·(1−S)(1−T))`. And the two arguments are not a model and an observation; they are two personality scores read off the same static profile:

```
advanced_extensions.py:523-526
object_a = object_petit_a(system_coverage=profile.conscientiousness,
                          threat_coverage=profile.dark_triad.composite)
```

So *objet a* is implemented as a product of conscientiousness-complement and dark-triad-complement — a trait interaction term. There is no internal model anywhere in the system, no prediction, no observation to compare it to, and therefore no divergence of any kind. The docstring is candid about the substitution: it derives the formula from "S ∪ T ≠ U (There is always a gap) … The Unpatchable Vulnerability," which is a security-coverage metaphor imported from a different document (RSCH-10) and has nothing to do with Friston or with Lacan.

This makes A9 fail on both the branches it names for itself, simultaneously. Formally: the quantity is inert. `compute_extended_musical_parameters` is the sole caller of `object_petit_a`, and grep finds no caller of `compute_extended_musical_parameters` anywhere in the repository. Its musical outputs — `deceptive_cadence_probability`, `suspension_preference`, `rest_insertion_probability`, `avoid_final_resolution` (`:230-244`) — reach no note in any pipeline. Conceptually: a reader who knows the concept will observe that the theory has named its quantity after Lacan's *objet a* while computing a trait product, and that is the precise failure mode A9's own text warns against — "the theory has taken a name it is not using in its own sense."

**2. Unfalsifiable residue.** "**that gap carries affective charge**." Unmeasured, unconsumed, and stated without a scale. No observation of the system could contradict it because nothing in the system reads the gap.

**3. Ambiguity.** "**divergence**" — in the free-energy literature this is a KL divergence between distributions; here there are no distributions, only point scalars, so the word can only mean "difference," and the two readings differ in everything that matters (asymmetry, units, whether precision weighting exists). S1 §6 already flags the related conflation between variational free energy and a potential well and defers it to S2; the same word is doing the same double duty here.

**4. Does the quantity do work?** **No.** Zero callers on any served path (`advanced_extensions.py:523`, itself uncalled). The repository deconstruction reaches the same conclusion independently (§9.2 item 6).

**5. Severity: FATAL.** A9 names its own fatal condition ("if the divergence quantity is computed but never reaches any musical parameter, it is inert and should be removed") and the condition holds. The conceptual branch fails as well, and for a reason worse than the one anticipated: the operationalisation in the code is not the operationalisation in the assertion.

---

## A10. The audience is a term in the model

**1. Strongest objection.** The stated formula is incompatible with A1 and A3, and the coefficient is circular.

```
MPN_ACADEMIC_DISSERTATION.md:263-264
ObservationWeight = Σ(AudienceAttention_i × Distance_i)
PsychometricModulation = BaseState × (1 + k × ObservationWeight)
```

A1 bounds every component to [0,1]. `(1 + k·w)` exceeds 1 for any positive `k` and `w`, so the modulated state leaves the unit cube for any state component above `1/(1+kw)`. A3 requires `r + s + i = 1`; multiplying the three registers by `(1 + k·w)` gives a sum of `(1 + k·w)`, off the simplex, and if `k` varies by register as A10 requires, the sum is off the simplex by a different amount in every direction. **A10 cannot be applied to the state A1 and A3 describe.** Either the modulation is renormalised — in which case, on the simplex, a uniform multiplicative factor is the identity and the audience term does nothing at all — or the state constraints are abandoned.

Then the coefficient. `k` is "higher for Imaginary-dominant states, lower for Real-dominant" (`:267`). But the thing `k` modulates is the state whose dominance determines `k`. Apply the modulation and the dominant register can change, which changes `k`, which changes the modulation. The specification is a fixed-point equation with no stated solution, no ordering, and no guarantee of uniqueness. Nothing in the theory says whether `k` is read before or after modulation, and the two give different answers.

Finally: `Distance_i` is undefined. Physical distance from stage? Attentional distance? Its units are unstated, it is multiplied by an attention weight whose units are also unstated, and the product is then summed over an unbounded number of audience members, so `ObservationWeight` grows without bound with house size. A full house does not merely modulate the state; it drives it to infinity.

**2. Unfalsifiable residue.** "**Observation is not passive reception.**" This is a thesis about theatre, not about the model, and no measurement of the model bears on it. The falsification clause offered — "the coefficient is never exercised" — is a statement about code coverage, not about the world, and it is already satisfied: the coefficient is never exercised.

**3. Ambiguity.** "**observation weight**" — undefined in units, in range and in aggregation. Two readers implementing `Σ(AudienceAttention_i × Distance_i)` from the text will not produce the same number for the same house, and will disagree about whether distance should be in the numerator (as written) or the denominator (as physical intuition about attention suggests). As written, a spectator further away contributes *more*.

**4. Does the quantity do work?** **No.** There is no `observation_weight`, `observer_effect` or `audience` variable in any Python, TypeScript or TSX source file. Grep over `src/`, `ml/` and `mpn_engine/` returns only a reference-dictionary row (`mpn_reference_data.ts:3766-3778`, "Audience-Aware Dynamics", prose), a wiki glossary entry, and a play's scene description. A10 is text.

**5. Severity: FATAL.** The formula is inconsistent with the state space the theory has already committed to, its coefficient is circularly specified, its inputs are dimensionless and unbounded, and it exists nowhere but in prose.

---

## A11. The whole composes: it is a calculus

**1. Strongest objection.** The three properties S1 §5 claims for Φ — total, deterministic, decomposable — are each contradicted by the implementation, and the composition additionally double-counts one variable across three parameters.

*Deterministic* is false. `discToInstrument` selects with `Math.random()` (`psychometric_calculus.ts:203-217`); the character-analysis fallback assigns `entropy: Math.random()*0.3+0.2` (`analyze-character-psychometrics/route.ts:251`). The same state does not yield the same musical parameters. S1 §5 anticipates this and rules it out: "Any stochastic element in a realisation sits downstream of the transformation, in performance rather than in composition." Instrument selection is not performance; it is composition, and S1 §5 lists timbre as one of the five outputs of Φ.

*Decomposable*, in the sense S1 gives it ("a cue is loud because trauma is high, and thin because entropy is high, and in Phrygian because the Imaginary dominates, and each of those sentences can be checked separately"), is false in the direction that matters. The three sentences are not independent: `lyapunov_exponent(τ, H)` (`mckenney_lacan_calculus.py:290-292`) feeds chord type, rhythm class, stability zone, crisis flag and crisis severity (`:308-384`, all returned by `phi_transform` at `:562-575`), so harmony and rhythm are both functions of `τ + H` and cannot be varied separately. And `r` alone drives mode (`:196`), tension (`psychometric_calculus.ts:310`: `0.9·real + 0.1·entropy`) and key (`:347-352`) — the same component determining three of the five outputs of Φ, so a change of register moves mode, chord quality and key together. The listener cannot attribute any of the three to the register independently, which is precisely the interrogability that Proposition 4 of S1 claims as the theory's practical motive.

*Two implementations of the same Φ disagree.* The Python gives `chord_type = lyapunov_to_harmony(λ) = f(τ, H)` (`:563`); the TypeScript gives `chordType = tensionToChordType(0.9r + 0.1H)` (`psychometric_calculus.ts:310, 275-281`) — a function of the register. Same asserted calculus, same state, different harmony. S1 §5 says determinism exists "so that two implementations agreeing on the equations agree on the output." The two implementations here do not agree on the equations, and the theory has no statement of which is Φ.

*Total* survives in the Python and fails on monotonicity in the TypeScript: the shipped `traumaToDynamics` table has uncovered ranges that fall to a default, so τ = 0.2 gives velocity 30, τ = 0.21 gives 72, τ = 0.8 gives 72 and τ = 0.81 gives 118 (`mpn_reference_lookup.ts:150-178`; `mpn_reference_data.ts:668-745`). S1 §5 describes "velocity running linearly from the threshold of audibility to the ceiling of the instrument." That is false of the code a user runs, and the tests pass only because they probe τ = 0.1, 0.5, 0.9.

**2. Unfalsifiable residue.** "**computed rather than chosen**." Every constant in the calculus was chosen; computation from chosen constants is choice at one remove. No observation distinguishes the two, and A11 offers none. The falsification clause ("judged incoherent by musicians") requires a comparison against "the same parameter values assembled by a composer," but a composer given nine numbers assembles a cue by choosing everything the calculus fixes, so the comparison does not isolate the composition property — it compares a nine-parameter cue against a free cue.

**3. Ambiguity.** "**decomposable by parameter**." One reader takes this as *separate definition* (each `f_x` is written independently — true), another as *separate variation* (each output can be moved without moving the others — false, as shown). S1 §5's own gloss uses the second sense while the formalism supports only the first. Also "**calculus**" — the word is used for a set of threshold tables and linear maps. There is no operator, no composition law, no algebra of transformations; nothing in the corpus composes Φ with anything.

**4. Does the quantity do work?** Φ itself is real and does work in the Python (`phi_transform`, `mckenney_lacan_calculus.py:537-580`, 17 fields, IMPL+TEST for its components). But `phi_transform` is not on the served path: the browser pipeline uses `psychometricToMusical` (`psychometric_calculus.ts:290`), a different function, and the Python module the tests cover is not called by the endpoint (`server_v2.py:195-231` recomputes mode and tempo from trauma alone). And `phi_transform` omits fragmentation and orchestration density entirely, so A6, A7 and A8 are not in the master transformation the theory says composes them.

**5. Severity: FATAL.** All three stated properties of Φ fail against the implementation; two implementations of the same Φ produce different harmony from the same state; and the transformations A6–A8 name are not members of Φ at all.

---

## 6. Contradictions between assertions

**C1. A3 and A4 cannot both hold at the theory's own default state.** A3 makes `(1/3, 1/3, 1/3)` the maximum-stability point (`02_BORROMEAN_TOPOLOGY.md:80`, BSI = min/max = 1). A4 selects mode by `argmax(r, s, i)`, which at that point is a tie broken by code order. The state the theory calls healthiest is the state at which its principal musical output is discontinuous in every direction. Both implementations sit at this point by default, and they break the tie differently: Python `(0.33, 0.34, 0.33)` → Symbolic; TypeScript `(0.33, 0.33, 0.34)` → Imaginary.

**C2. A3 and A10 cannot both hold at all.** A3 constrains `r + s + i = 1`; A10 multiplies the state by `(1 + k·w)` with `k` varying by register. Multiplication takes the register triple off the simplex, and register-dependent `k` takes it off in a direction that cannot be renormalised without discarding the audience term. If the state is renormalised after modulation, a uniform `k` is the identity on the simplex and the audience term does nothing. A1's [0,1] bound is broken by the same multiplication.

**C3. A7 and A8 double-count one variable.** `0.6H + 0.4τ` and `0.7τ + 0.3H` correlate at **0.915** over the author's own 232 frames, with **95.8%** of their joint variance on a single principal component and only 10 of 25 possible level-pairs realised, all near the diagonal. A8's own falsification clause names this outcome. The theory has one intensity scalar presented as two.

**C4. A5 and A7/A8 pull in opposite directions.** A5 asserts that τ and H are separable and act on *different* musical parameters. A7 and A8 then combine them into two scalars that each act on a *different* parameter — but both scalars are combinations of both variables, so neither parameter is attributable to either variable. A5's "trauma predominantly on force, entropy predominantly on coherence" is contradicted by A8, where trauma is the dominant term (0.7) in the *density* scalar, and by A7, where entropy is the dominant term (0.6) in *fragmentation* — which is a coherence parameter, so A7 is consistent with A5, while A8 assigns trauma to a texture parameter A5 gives to entropy. And λ = (τ+H−0.5)/2 (`mckenney_lacan_calculus.py:290`) discards the distinction entirely before harmony and rhythm are computed.

**C5. A4 contradicts the theory's own equations document.** A4 asserts Real → Aeolian/Dorian; `10_CORE_EQUATIONS.md:170-178` and `mckenney_lacan_calculus.py:191-200` assert Real → Phrygian, with Phrygian assigned in A4 to the Imaginary. Both cannot be the theory. Neither is the served endpoint's rule (`server_v2.py:223-227`, mode from trauma only).

**C6. A2 and A5 are in tension over what the state is predicated of.** A2 defines the registers "per character per frame." `11_ENTROPY_CALCULUS.md:80-90` defines entropy as a Shannon entropy over the *speaker distribution* — a property of a scene that cannot be predicated of a character. A1 puts both in the same nine-vector. The vector therefore mixes per-character and per-scene quantities without saying so, and the implementation resolves the mixture by making all five of τ, H, r, s, i per-scene (`score_orchestrator.ts:240-247, 286-289`).

**C7. A9 and A11 collide on totality.** A11 requires Φ total and decomposable "by parameter." A9's *objet a* is not a parameter of Φ — `phi_transform` does not return it, and the function that computes it has no caller. Either *objet a* is part of the calculus, in which case Φ is incomplete as implemented, or it is not, in which case A9 is asserting a quantity outside the theory's own master function.

---

## 7. The three weakest assertions, ranked

**1. A10 (the audience is a term in the model).** The stated modulation is arithmetically incompatible with both A1's unit bound and A3's simplex, its sensitivity coefficient depends on the state it modifies, its `Distance_i` term is undefined and makes distant spectators count more, and it appears in no line of executable code anywhere in the repository.

**2. A8 (orchestration density has a differently weighted scalar).** The assertion writes its own withdrawal condition and the author's own annotated corpus satisfies it — r = 0.915, PC1 = 95.8% — and the quantity is then computed and consumed by nothing but a `console.log`.

**3. A9 (objet a as divergence).** Both branches of its own failure test are satisfied at once: the quantity is never read by any musical parameter, and the thing the code computes — `2·(1−conscientiousness)·(1−darkTriadComposite)` — is not a divergence between a model and an observation and bears no relation to the concept whose name it carries.

*Dishonourable mention, and it is close.* A4 would rank second if the criterion were damage to the theory's public claims rather than internal weakness: the register→mode table it asserts is contradicted by the document titled *Core Equations*, and the only listener evidence in the corpus (`MPN_ACADEMIC_DISSERTATION.md:873`, n = 24, 4.2/5) does not name which of the three tables was rated.

---

## 8. What the author is most likely to be fooling himself about

That the system has ever run. Not in the trivial sense — it runs, it makes sound, it exports MIDI. In the sense that matters to a theory: the author believes he has been listening to his calculus, and he has been listening to a much smaller thing. The registers, which are the whole of what distinguishes this theory from a valence-arousal mapper with better vocabulary, have taken the value `(0.33, 0.33, 0.34)` in every frame of every play, because no frame in either play-data file carries a register value and both code paths fall through to the same default. Entropy is 0.5 in the composer on every call, because the orchestrator passes five arguments to a seven-argument function. So every cue the author has heard and judged good was produced by trauma alone, running through one live threshold at τ = 0.6 and one linear velocity map, with the Lacanian layer held flat and the informational layer pinned. The satisfying correspondence he hears between the music and the drama is real, and it is the correspondence between loudness and how bad things have got — which is the one mapping in the system that needed no theory at all, and which Juslin and Laukka would have predicted without any of this. Everything the theory adds on top has been either constant, discarded, or logged.

The second thing, and it follows from the first: he has mistaken statedness for testedness, and the register's own language encourages it. S1 §9 says the theory's distinction is that "it is stated completely enough to be wrong," and that is true and unusual and worth something. But three of the eleven assertions are armoured against the tests they name — A4's "in any careful framing of the question," A6's "often enough," A1's "sufficient for musical representation" — and two more (A9, A10) name conditions that are *already met* and have not been checked. A8 states a criterion so sharp that ten minutes with the author's own 232 frames decides it, and it decides against. The pattern is not that the assertions are unfalsifiable; it is that they were written as falsifiable and then not falsified, and the interval between those two states has been read as support. The single most useful thing available here costs nothing and has not been done: run the constants through the annotated corpus and look at what varies. The answer is that almost nothing does.

Third, and smallest but worth naming because it will be the first thing an examiner finds: `MPN_ACADEMIC_DISSERTATION.md:1127` reports "Blind listening tests (N=48) showed no statistical difference between MPN-generated and Williams-reference excerpts (p = 0.72, Cohen's d = 0.08)" as a validation result. A failure to reject the null is not evidence of equivalence, an underpowered test is not evidence of anything, and neither this study nor the n = 24 survey at `:873` has a single data artefact anywhere in the repository (repo-deconstruction §9.2 item 5: "no listening test, no participants, no statistics"). S1 §9 cites the n = 24 figure and omits the N = 48 one. Whichever way that omission happened, it is the kind of thing that ends a viva.
