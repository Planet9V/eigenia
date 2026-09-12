# Review S1 — Skeptic

**Subject:** `/home/claude/ms-drafts/S1-mckenney-lacan-theory.md`, revision 2
**Operating question:** what is wrong with this paper *now*, after Block A arbitration?
**Date:** 2026-09-12
**Evidence base:** the reference implementation at `/home/claude/mpn-conductor-standalone/` (cited `path:line`); the author's corpus on the Mac under `MPN/` (cited by corpus-relative path); every figure in §8.2 re-derived by running `05_DATA/03_generators/a8_form_analysis.py` and by independent recomputation from the CSVs and from `literary_data.ts` / `additional_plays.ts`; `REVIEW-A-skeptic.md`, `BLOCK-A-ARBITRATION.md`, `A8-DECISION-MEMO.md`, `CITATION-LEDGER-S1.md`, `01_THEORY/03_unified/16_Vol_15_Cognitive_Bias_Atlas.md`, `01_THEORY/01_core/03_*` and `08_*`.

---

## Verdict

The paper is better than its predecessors and it is not yet publishable, for one reason that runs through everything: its empirical section rests on a dataset that is not data. The seven "scored plays" and their 31,078 beats are the output of a twenty-line generator in which trauma is the beat index times 0.8 plus a keyword tally and entropy is a punctuation count plus a floor of 0.30; trauma correlates with beat position at 0.995 to 0.999 in every play, 72.8 per cent of all beats sit at the entropy floor, and one of the seven plays has no identified speaker at all. The paper calls this "the author's own scored corpus," leads its executive summary with the claim that the fatal finding "came from the author's own scored corpus … rather than from argument," and then in §8.2 correctly says the finding is algebra — a contradiction between §1 and §8.2 that the reader is left to resolve. Around that centre sit a set of smaller but checkable failures: the four-decimal reproduction claim is false as printed (the three rounded numbers the paper gives yield 0.9192, not 0.9191) and is in any case an identity rather than a confirmation; the two candidate-form coverage figures are taken from two different metrics in consecutive sentences without disclosure, and C3's figure on the implementation's own ladder is 18, not 20; §8.3 asserts that the trauma threshold θ = 0.6 "exists in prose and nowhere else" when it is implemented three times in one file and is live on the melody path; §11, the integrity section, overstates the system's degeneracy and in doing so loses the circularity finding the prior review rated fatal; and the Atlas is credited with a four-domain classification it applies to only sixteen of its thirty entries and with an activation rating for the planning fallacy that it does not contain. The bias comparison in §9.2 is the strongest part of the paper: every count in it — 14, 15, 16, 29 — reproduces exactly. As a genre the paper is now a paper and not a description; where it lapses is §7 and §9.3, and the lapse is narrower than the author's standing complaint.

---

## Findings

| id | §  | severity | claim |
|:---|:---|:---|:---|
| F1 | 1, 4.1, 8.2, 10 | FATAL | The "scored corpus" is machine-generated; trauma is the beat index and entropy is a punctuation tally, and the paper gives it evidential standing it cannot have |
| F2 | 8.2 | SERIOUS | "Those three numbers give 0.9191 … to four decimal places" is false as printed (they give 0.9192) and describes an algebraic identity as an empirical reproduction |
| F3 | 8.2 | SERIOUS | The candidate coverage figures (24 of 25, 20 of 25) come from two different cell metrics; on the implementation's own ladder C3 reaches 18, exactly at the stated bar |
| F4 | 8.2 | SERIOUS | "No corpus rescues the construction" generalises a result computed with the corpus's variances held fixed; the correlation is unbounded below over all corpora |
| F5 | 8.3 | SERIOUS | "The threshold θ = 0.6 exists in prose and nowhere else" is refuted by `leitmotif_transformation_rules.ts:79,84,89`, live on the melody path |
| F6 | 11 | SERIOUS | "The registers are a fixed triple on both primary paths … trauma the only component that audibly moves" is false; entropy sets tempo and metre and the registers set key and chord quality |
| F7 | 9.1, 9.2 | SERIOUS | The Atlas assigns domains to 16 of its 30 entries, not 30, and gives the planning fallacy no activation rating, yet is cited for both |
| F8 | 4.3 vs 9.1/B1 | SERIOUS | The paper uses twelve biases in §4.3 and thirty in §9, and never reconciles them while declaring the count settled |
| F9 | 11 | MINOR | "Ten unseeded calls" is eleven |
| F10 | 8.3 | MINOR | The trauma-only table is six reachable steps, not a "seven-step brightness ramp"; Lydian is unreachable and the windows overlap |
| F11 | 8.3 | MINOR | "Four … tables" is enumerated as three; the fourth exists but in a file the paper and its ledger never cite; "exact inversions" mis-describes the relation |
| F12 | 6 | MINOR | Three different discretisations of the dynamics equation exist; the paper's own documentation-defect diagnosis is not applied to its own worked example |
| F13 | 8.2 | MINOR | The amendment criterion's constants (0.65, eighteen) are stipulated after the candidates were computed and are not flagged as stipulations |
| F14 | 11 | MINOR | The n = 24 study's modal assignment is omitted, and it is the one fact that connects it to §8.3 |
| F15 | refs | MINOR | Reference [8] promises an edition note the text does not contain |
| F16 | 4.3 | MINOR | A specific psychometric loading claim and an absence-of-evidence claim about a literature are sourced to Wikipedia |

---

## 1. FATAL — The "scored corpus" is generated, not scored, and the paper gives it evidential standing

**Class: the paper claims evidential status for data that cannot carry it.** Not "the theory is wrong."

`MPN/05_DATA/03_generators/batch_process_classic_plays.py` defines both variables in closed form:

```
calculate_trauma_R(beat, total_beats, speaker, text):
    progress = beat / total_beats
    trauma_count = sum(1 for word in ['death','kill','murder','blood',
                       'revenge','mad','cursed','despair'] if word in text.lower())
    R = progress * 0.8 + trauma_count * 0.1        # then clipped to [0,1]

calculate_entropy_H(text):
    H = text.count('?')*0.2 + text.count('!')*0.15
        + (text.count('--') + text.count('...'))*0.1
    return min(1.0, max(0.0, H + 0.3))             # baseline 0.3
```

I reproduced `ENTROPY_H` exactly from the `TEXT` column of `MCKENNEY_LACAN_SCORE_HAMLET.csv` (max absolute difference 1.1e-16) and `TRAUMA_R` to within 0.005 (the residual is a total-beats bookkeeping difference, not a different formula). Consequences, measured across all seven files:

| quantity | value |
|:---|---:|
| corr(TRAUMA_R, BEAT), A Doll's House | 0.9988 |
| … Cherry Orchard | 0.9980 |
| … Hamlet | 0.9954 |
| … King Lear | 0.9966 |
| … Macbeth | 0.9955 |
| … Miss Julie | 0.9969 |
| … Oedipus Rex | 0.9965 |
| fraction of all 31,078 beats with ENTROPY_H exactly 0.30 | **0.7276** |
| King Lear rows with SPEAKER = "STAGE" | **3424 of 3425** |

Four things follow, each of which the paper asserts.

**(a) §1.** "A structured review … returned one finding that is fatal to an assertion as it was stated, and that finding came from the author's own scored corpus of 31,078 beats rather than from argument." The corpus is a formula. Whatever came from it came from argument, restated as a table of numbers. And §8.2 says so itself two pages later — "The finding is not about the plays. The correlation can be computed from three numbers alone" — which makes this an outright internal contradiction, not merely an overstatement.

**(b) §4.1.** "Across the seven scored plays, trauma rises through the text and does not recover, which means that any musical parameter that is monotone in trauma behaves as a ramp across an act. If the theory wants a parameter that can fall as well as rise, trauma needs a resolution term, and it currently has none." The ratchet is `progress * 0.8`. It is the generator's definition of the variable, presented as a property of the quantity discovered in the corpus. The design conclusion (trauma needs a resolution term) may well be right; the evidence offered for it is circular and the paper should say the ratchet is stipulated.

**(c) §10 and §8.1.** "Section 8.2 has already shown the reverse failure, where the separation holds and forces a different assertion to fail," and A5's register status, "Hold; most likely to be confirmed." The separation in question is corr(τ, H) = −0.0256 pooled. That is the correlation between a beat counter and a punctuation tally. It is not evidence that anything separable exists in a subject, in a text, or in a rater's judgement. The genuinely hand-annotated set gives corr(τ, H) = 0.2802 over 232 frames (recomputed from `src/components/mpn-lab/literary_data.ts` and `additional_plays.ts`), which is the number that bears on A5, and the paper does not report it.

**(d) §8.2's limitation paragraph** discloses resolution ("fourteen distinct values with a floor at 0.30") and not provenance. Resolution is a consequence; provenance is the cause. A reader told only the first will assume the fourteen values are a coarse rating scale rather than the range of a punctuation count, and will assume that a finer instrument on the same plays would produce better data, when in fact no instrument was used at all.

**What survives.** The algebraic core of §8.2 is untouched by this, because it does not depend on the corpus. What does not survive is the paper's framing — the repeated "the author's own scored corpus," "evidence already in hand," "reported the evidence against itself." The honest form is: the collinearity is a theorem about two convex combinations; the seven-play file is a worked illustration generated by a script; the only annotated data in the programme is the 232-frame set, and on it the same theorem gives 0.9150.

---

## 2. SERIOUS — The four-decimal reproduction claim is false as printed, and it is an identity

**Class: a numerical claim stated with more precision than it has, and mis-described.**

§8.2: "The correlation can be computed from three numbers alone: the standard deviation of entropy in the corpus, 0.1023; the standard deviation of trauma, 0.2317; and the correlation between them, −0.0256. Substituted into the exact expression for the correlation of two linear combinations, those three numbers give 0.9191, which is the empirical value to four decimal places, obtained without consulting a single beat."

Three defects.

**(a) The literal claim is false.** Substituting the three numbers *as printed* into the paper's own expression (`algebraic_bound` in `a8_form_analysis.py:224-233`):

```
bound(0.6, 0.3, rho=-0.0256, sH=0.1023, sT=0.2317) = 0.919156  ->  0.9192
```

Not 0.9191. The three printed numbers do not give the stated result to four decimal places; they give it to three. The script prints 0.9191 because it passes the unrounded `H.std()`, `T.std()` and `np.corrcoef` values, not the four-decimal figures the paper hands the reader.

**(b) It is not a four-decimal agreement; it is exact.** With full precision:

```
empirical  r = 0.919105283721502
algebraic  r = 0.919105283721502
difference   = 2.2e-16
```

Neither combination clips on this data (`frag ∈ [0.18, 0.992]`, `dens ∈ [0.09, 0.986]`, against `clip01`), so the two quantities are equal by algebra to machine precision. "To four decimal places" understates by eleven orders of magnitude, which is a strange way to be wrong and suggests the figure was read off a print format rather than computed.

**(c) It is not a reproduction.** Given two *exact linear combinations* of two variables, their correlation is a function of the two variances and the covariance and nothing else. There is no world in which the substitution fails to match. Presenting the match as something obtained "without consulting a single beat," and therefore as a demonstration that the collinearity is a property of the formulae, gets the right conclusion by a route that is a tautology dressed as a check. The correct sentence is shorter and stronger: *the correlation of two convex combinations of the same pair of variables is determined by their second moments alone; here it is 0.9191 and no corpus with these moments can make it anything else.*

**Related.** "On the smaller hand-annotated frame set the figure is r = 0.915, so the two sources agree." I recomputed it: n = 232, r = 0.9150, PC1 = 95.75 per cent, 10 of 25 cells, corr(τ, H) = 0.2802. The figure is correct. But "the two sources agree" invites the reader to treat this as replication. It is the same identity applied twice: the two sets have very different corr(τ, H) (0.28 against −0.026) and different variances, and both land near 0.92 *because* the construction forces it. Agreement here is evidence of nothing except that arithmetic is stable.

---

## 3. SERIOUS — The two candidate coverage figures come from two different metrics

**Class: a numerical claim that mixes two incompatible measurements without disclosure.**

`a8_form_analysis.py` reports two cell counts per form. `cells_fixed` cuts at `FRAG_T = [0.25, 0.50, 0.75, 0.90]` and `DENS_T = [0.20, 0.40, 0.60, 0.85]`; `cells_quintile` cuts each variable at its own quintiles. I checked the fixed thresholds against the implementation and they match it exactly:

- fragmentation: `src/lib/leitmotif_transformation_rules.ts:217` (`< 0.25` full), `:225` (`< 0.5` truncated), `:235` (`< 0.75` core_motif), `:245` (`< 0.9` interval_only), else dissolution.
- density: `src/lib/leitmotif_transformation_rules.ts:127-131` (0.2 / 0.4 / 0.6 / 0.85).

So the fixed metric is the implementation's own level grid and is the meaningful one. Running the script:

| form | r pooled | cells fixed | cells quintile |
|:---|---:|---:|---:|
| shipped 0.6H+0.4τ / 0.7τ+0.3H | +0.9191 | **11** | 17 |
| C1 pure separation (H, τ) | −0.0256 | 18 | 10 |
| C2 knee-shift + concave | +0.4853 | **24** | 19 |
| C3 opposed cross-terms | +0.4039 | **18** | **20** |

§8.2 says C2 "reaches twenty-four of the twenty-five level pairs at a pooled correlation of 0.485" (fixed column) and C3 "reaches twenty of twenty-five at a pooled correlation of 0.404" (quintile column), in consecutive sentences, with no indication that the two counts are measured differently. Both figures are individually present in `A8-DECISION-MEMO.md §3`, where the table shows both columns and bolds the better cell in each row; the paper has taken the bolded cells and dropped the table.

On the ladder that produces the paper's own 11-of-25 baseline, and against which its own "at least eighteen of the twenty-five" criterion is set, **C3 reaches 18 — exactly the bar, not two above it.** A reader choosing between the two forms by ear, as §8.2 invites, is entitled to know that one of them only just clears the threshold on the metric that matters to the implementation.

Second, smaller: "Two candidate families meet it." Under the fixed metric, three do — C1 also reaches 18 with a pooled r of −0.0256 and no play above 0.143. The memo excludes C1 by fiat ("the floor case, not a proposal"), which is a defensible editorial judgement, but the paper states the criterion and then reports a count of qualifiers that does not follow from it. Under the quintile metric C1 fails (10) — which is a further reason the paper must say which metric it is using.

---

## 4. SERIOUS — "No corpus rescues the construction" generalises a conditional result

**Class: a claim that outruns the computation offered for it.**

§8.2: "Holding the two standard deviations fixed and sweeping the correlation between trauma and entropy across its entire range, the lowest value the pair can take is 0.841. No corpus rescues the construction."

The first sentence is correct: I reproduced `min = 0.8409 at ρ = −0.7569` with `sH = 0.1023`, `sT = 0.2317`. The second does not follow, because a different corpus has different variances as well as a different correlation. Sweeping both:

- at ρ = 0, the floor over all variance ratios is **0.8315**, attained at `sd(τ)/sd(H) = 0.802`;
- over all ρ and all variance ratios, the correlation is **unbounded below**, reaching −1 as ρ → −1 for any ratio `c = sd(τ)/sd(H)` in (0.429, 1.5), because `frag → (0.6 − 0.4c)·H` and `dens → (0.3 − 0.7c)·H` change sign at different values of c.

So the true statement is the one the A5 argument actually needs and which the paper elsewhere makes correctly: *no corpus in which trauma and entropy are close to independent rescues the construction, and the floor for independent variables is about 0.83 whatever their variances.* As written, "no corpus" is false, and it is false in a way a referee with numpy will find in five minutes. The fix costs one clause.

---

## 5. SERIOUS — "θ = 0.6 exists in prose and nowhere else" is refuted by the repository

**Class: the implementation does not do what the paper says — in the paper's disfavour.**

§8.3: "The mode-selection function in the shipped path does not take trauma as an argument, so the threshold $\theta = 0.6$ exists in prose and nowhere else."

```
src/lib/leitmotif_transformation_rules.ts:63-90
export function getModalTransformation(rsi: RSIState, trauma: number): MusicalMode {
    ... const dominant = registers[0].name;
    if (dominant === 'real')      return trauma > 0.6 ? 'Aeolian'    : 'Dorian';
    else if (dominant === 'symbolic') return trauma > 0.6 ? 'Mixolydian' : 'Lydian';
    else                          return trauma > 0.6 ? 'Locrian'    : 'Phrygian';
}
```

It takes trauma. It branches on `trauma > 0.6` three times, at `:79`, `:84`, `:89`. It is called at `src/lib/leitmotif_transformation_rules.ts:342` inside `applyProfessionalTransformations`, whose `.mode` is consumed at `src/components/mpn-lab/GeniusComposer.ts:186` and applied to every pitch at `:304-310` through `getModeScaleDegrees`. The switch is live, and on that path it is the *only* live input to mode selection, since the register triple beside it is the hard-coded `(0.33, 0.33, 0.34)` at `:159`.

The prior Skeptic report says exactly this (`REVIEW-A-skeptic.md`, A4 item 4: "The trauma switch does work, and is the only live input to mode selection on that path"). The false sentence comes from `BLOCK-A-ARBITRATION.md §2` ("The trauma threshold of 0.6 is implemented nowhere, and the function that selects the mode does not take trauma as an argument"), which the paper has carried over verbatim in substance without checking it against the code. A paper whose central methodological offer is "we report the evidence against ourselves" cannot afford to repeat an unverified claim from its own arbitration, and the direction of the error — understating what the system does — does not make it safer, it makes the disclosure section unreliable in both directions.

---

## 6. SERIOUS — §11 misdescribes what moves, and loses the finding that mattered

**Class: the implementation does not do what the paper says, and the paper's integrity section is the place it happens.**

§11: "the registers are a fixed triple on both primary paths, and entropy is pinned by an argument-count error, which leaves trauma as the only component that audibly moves."

The entropy argument-count error is real and I confirm it: `composeMelody(leitmotif, params, duration, startBeat, intensity, trauma = intensity, entropy = 0.5)` at `GeniusComposer.ts:147-155`, called with five arguments at `score_orchestrator.ts:299-305` and again at `:312-317`. But the conclusion does not hold, because that pins entropy only inside the melody generator. On the score path:

- `score_orchestrator.ts:232` — `const rsi = analyzeRSI(frame.analysis);` produces a **varying** triple (`psychometric_calculus.ts:236-250`), not a fixed one.
- `score_orchestrator.ts:250` — that state goes to `psychometricToMusical`, where entropy sets tempo and time signature (`psychometric_calculus.ts:294`, via `entropyToRhythm` at `:169-186`), the register triple sets the key by thresholds (`:349-355`), and `tension = 0.9·real + 0.1·entropy` (`:310`) sets the chord type (`:313`).
- `score_orchestrator.ts:251-252` — `this.globalKey = globalParams.key; this.globalTempo = globalParams.tempo;` and the same object is passed to harmony generation at `:260-262` and stamped onto every stave at `:332` and `:348`.

So entropy audibly moves (tempo, metre) and the registers audibly move (key, chord quality). What is fixed is `GeniusComposer`'s internal modal transformation and its entropy default. The paper has generalised a fact about one function into a fact about the system.

This matters beyond accuracy. By flattening the registers to "a fixed triple," §11 discards the finding the prior review rated FATAL under A2 and A3: that where the registers *do* vary, they vary because `analyzeRSI` counts the literal strings "Real", "Symbolic" and "Imaginary" in the author's own critical prose (`KEYWORDS_REAL`/`_SYMBOLIC`/`_IMAGINARY` at `psychometric_calculus.ts:141-143`, normalised by their own total at `:244-249`), and that the normalisation is what manufactures the simplex constraint A3 calls substantive. §11 has replaced a circularity with a constant. The constant is the more comfortable disclosure and it is the wrong one.

---

## 7. SERIOUS — The Atlas does not support the two things it is cited for

**Class: citation integrity — a source cited for more than it contains.**

`01_THEORY/03_unified/16_Vol_15_Cognitive_Bias_Atlas.md` is 224 lines. Its structure:

- §3.1 Category A: PERCEPTION — CB-001 to CB-005 (lines 38-85)
- §3.2 Category B: DECISION — CB-006 to CB-010 (lines 87-132)
- §3.3 Category C: SOCIAL — CB-011 to CB-014 (lines 134-167)
- §3.4 Category D: MEMORY — CB-015 to CB-016 (lines 170-187)
- **§3.5 Expanded Reference (Nodes 17-30)** — lines 189-207, a four-column table (ID / Bias / Definition / Business-Cyber Risk) with **no domain and no activation rating** for any of CB-017 to CB-030.

**(a)** §9.1: "The classification of record is the author's Cognitive Bias Atlas, which catalogues thirty biases, CB-001 to CB-030, in four domains of distortion." `CITATION-LEDGER-S1.md` entry 13 repeats it: "four domains Perception, Decision, Social, Memory." The Atlas assigns a domain to **16 of its 30 entries**. Fourteen — nearly half, including framing, status quo, bandwagon, recency, planning fallacy and fundamental attribution, four of which the paper's §9.2 names — are in an undifferentiated appendix table. The §9.1 argument that the four domains map onto the theory's own distinctions (Perception and Memory to entropy, Decision to trauma, Social to the dialogue extension) therefore covers only 16 of 30, and the paper presents it as covering all thirty.

**(b)** §9.2: "Sixteen of the Atlas's thirty have no musical mapping at all, including groupthink, loss aversion, in-group bias and **the planning fallacy**, which are among the highest-impact entries in the Atlas's own activation ratings." The first three carry ratings — CB-011 Groupthink "CRITICAL (9/10)" (line 139), CB-007 Loss Aversion "HIGH (8/10)" (line 100), CB-014 In-Group Bias "HIGH (8/10)" (line 163). **CB-027 Planning Fallacy carries no activation rating at all** (line 205, table row). Attributing a rating to a source that does not give one is the precise citation failure a hostile reviewer looks for, and it is one word's worth of damage for no gain: dropping "the planning fallacy" from the list leaves the sentence true.

**(c) A weaker point, but it undercuts the argument of §9.2.** The paper discredits the implementation's fifteen extra traits by their provenance: "the implementation's source, which is a social-engineering research note rather than the Atlas." I confirm the source field: all thirty entries in `src/components/mpn-lab/mpn_reference_data.ts:1755-2390` carry `source: 'RSCH-34'`. But RSCH-34 is titled *Cognitive Bias Catalog* and is indexed to Kahneman-Tversky (`src/components/mpn-lab/mpn_canon.md:8`; `public/theory/00_RESEARCH_INDEX.md:93`), and the Atlas itself opens by cataloguing biases "that systematically distort decision-making in Investment, Management, Security, and Strategy," treats them "through the lens of Behavioral Economics (Kahneman/Tversky)," and carries a "Business/Cyber Risk" column. The two sources are the same genre. The real ground for preferring the Atlas is that it is the author's and is the classification the theory will be held to; provenance does not separate them, and saying it does invites the obvious rejoinder.

---

## 8. SERIOUS — The paper uses two bias counts and settles one of them without noticing the other

**Class: internal inconsistency.**

§4.3: "Behind them the theory defines a wider personality space of twenty-four dimensions, formed from the four DISC dimensions, the five Big Five dimensions, the three Dark Triad dimensions and **twelve named cognitive biases**." (4 + 5 + 3 + 12 = 24; the arithmetic is right.)

§9.1: "The corpus contains several bias counts, and the count has to be settled before a bias layer can be built … The four domains are the classification the theory uses, and **thirty is the count**."

B1: "$\vec{b} \in [0,1]^{30}$ defined per speaker per turn and distinct from $\vec{p}$."

§9.1 announces that it is settling a disagreement about the bias count, and settles it at thirty, while §4.3 has already committed the theory's wider vector to twelve. Nothing in the paper says whether the twelve are a subset of the thirty (and if so which twelve), whether the 24-dimensional space becomes 42-dimensional, or whether the two layers are simply different objects — which is what B1's "distinct from $\vec{p}$" suggests but does not state, since the twelve are inside the wider vector that reduces to $\vec{p}$'s neighbours, not inside $\vec{p}$. This is the same defect class as A4 and §9.2 and the paper does not catch it in itself.

---

## 9. MINOR — "Ten unseeded calls" is eleven

§11: "Ten unseeded calls to the platform random number generator remain in the composer and the calculus."

```
src/components/mpn-lab/GeniusComposer.ts       : 351, 356, 361, 371, 403, 410, 413, 419, 539   (9)
src/components/mpn-lab/psychometric_calculus.ts: 216, 411                                       (2)
```

Eleven. `:216` is `discToInstrument` choosing the instrument at random; `:411` puts a random component into `forceVector`. Twelve if `src/app/api/analyze-character-psychometrics/route.ts:251` is counted, which assigns `entropy: Math.random() * 0.3 + 0.2` and is arguably the worst of them. The figure is inherited from `BLOCK-A-ARBITRATION.md §2` ("nine unseeded random calls in the composer and one in the calculus"). Since the paper elsewhere cites its code claims to the line, this one should be counted rather than quoted.

---

## 10. MINOR — The trauma-only table is six steps, not a seven-step brightness ramp

§8.3: "A third derives the mode from trauma alone on a seven-step brightness ramp and does not consult the registers." `CITATION-LEDGER-S1.md` repeats "seven-step brightness ramp" for `server_v2.py:223-227`.

`ml/psychoscore_v2/inference/server_v2.py:195-201` defines seven modes with **overlapping** trauma windows, and `:222-227` returns the first match in dict-insertion order:

```
ionian (0.0,0.2) dorian (0.2,0.4) mixolydian (0.3,0.5) lydian (0.1,0.3)
aeolian (0.5,0.7) phrygian (0.6,0.8) locrian (0.8,1.0)
```

Simulating trauma from 0.000 to 1.000 in steps of 0.001, the reachable set is **six** modes:

```
ionian [0, 0.201)  dorian [0.201, 0.401)  mixolydian [0.401, 0.501)
aeolian [0.501, 0.701)  phrygian [0.701, 0.801)  locrian [0.801, 1.0]
```

**Lydian is never returned** — its window (0.1, 0.3) is entirely shadowed by ionian and dorian, which precede it in the dict. It is also not a brightness ramp by the table's own `brightness` field, which runs 1.0, 0.7, 0.8, 0.9, 0.4, 0.3, 0.1 in insertion order. This matters a little more than a wording quibble, because §8.3's argument is that the four tables disagree about *which register* gets which mode; the third table's actual defect is different in kind — it is a lookup whose author appears not to have noticed that overlapping windows in a Python dict make one entry dead.

---

## 11. MINOR — "Four tables" is enumerated as three, and the fourth is uncited

§8.3 says "the corpus contains four mutually incompatible register-to-mode tables" and then enumerates three ("One assignment gives…", "A second gives…", "A third derives…"). `CITATION-LEDGER-S1.md` lists three code locators for tables. The count is nevertheless correct — there is a fourth, and it is arguably the most consequential, because it sits in the browser calculus that produces the key and the chord quality:

```
src/components/mpn-lab/psychometric_calculus.ts:108-112
const MODES = {
    real:      ['phrygian', 'locrian'],
    symbolic:  ['ionian', 'mixolydian'],
    imaginary: ['lydian', 'whole-tone']
};
```

A pair table like table one, carrying table two's register assignments, and offering a whole-tone scale that is not one of the seven modes at all. Neither the paper nor the ledger cites it. (`src/components/mpn-lab/mpn_reference_lookup.ts:270-278` gives a single mode per register on table two's assignment, so depending on how one individuates a "table" the count is four or five.)

Second: "two of which are exact inversions of each other on the Real and the Imaginary." Between table one (`leitmotif_transformation_rules.ts:76-89`) and table two (`mckenney_lacan_calculus.py:191-200`, `10_CORE_EQUATIONS.md:175-177`), Phrygian moves from the Imaginary to the Real — but the Real's modes, Dorian and Aeolian, do not move to the Imaginary; they disappear, and Lydian moves from the Symbolic to the Imaginary. It is a partial permutation, not an inversion. The point the paper wants — that the same mode is assigned to opposite registers, so these are not near misses — survives without the word "exact."

---

## 12. MINOR — Three discretisations of the dynamics equation, and the paper's own diagnosis is not applied

§6: "velocity running linearly from the threshold of audibility to the ceiling of the instrument, which in the theory's standard parameterisation gives $v(\tau) = 20 + 107\tau$, discretised to the eight conventional dynamic markings at stated boundaries."

The linear form and the eight markings exist together only in the Python module (`ml/psychoscore_v2/models/mckenney_lacan_calculus.py:58-66` for `v = 20 + 107τ`, `:69-88` for `trauma_to_dynamic` → ppp/pp/p/mp/mf/f/ff/fff). Elsewhere:

- `src/app/mpn-conductor/page.tsx:359-360` — implements the linear velocity, then discretises to **five** labels (pp/mp/mf/f/ff).
- `src/components/mpn-lab/psychometric_calculus.ts:162-164` → `mpn_reference_lookup.ts:150-178` → `mpn_reference_data.ts:666-735` — **three** trauma-dynamics entries ('Very Soft', 'Medium', 'Very Loud') with fixed `defaultValue` velocities, and a hard fallback of `{ velocity: 72, label: 'mf' }` when no entry matches. Not linear and not eight.

This is precisely the defect class §8.3 diagnoses for the modal table and §9.2 for the bias list — several mutually inconsistent versions, no normative one — and it is sitting in the paper's own worked example of decomposability. The paper is entitled to state the theory's form as the Python form; what it cannot do is name the disease twice and not notice the third case in its own §6.

---

## 13. MINOR — The amendment criterion's constants are stipulated after the fact

§8.2: "The criterion the replacement must meet is stated so that it can be checked: pooled correlation below 0.65, no single play above 0.65, and at least eighteen of the twenty-five level pairs realised."

Neither 0.65 nor eighteen is derived anywhere in the corpus. Eighteen is exactly the cell count C3 attains on the implementation's ladder, and 0.65 sits in the gap between C2's worst play (0.6021) and the shipped pair's best (0.9512) — it would also have admitted C2 at 0.602 and excluded it at 0.60. A criterion set where the surviving candidates already sit describes them rather than testing them. The paper is right that a stated criterion beats an unstated one, and it should say the constants were chosen rather than implying they were derived; otherwise a reader who notices will suspect worse than is true.

---

## 14. MINOR — The n = 24 study's modal assignment is omitted, and it is the fact that connects it to §8.3

§11 reports "twenty-four participants giving a mean appropriateness rating of just over four on a five-point scale for the modal mapping." The source reads:

```
public/theory/MPN_ACADEMIC_DISSERTATION.md:873
Modal mapping produces genre-appropriate results: Lydian mode for symbolic-dominant
states produces "magical" qualities comparable to Williams' Harry Potter scores,
validated via listener surveys (n=24, mean appropriateness rating 4.2/5).
```

Symbolic → Lydian is **table one** (`leitmotif_transformation_rules.ts:84`; `ml/psychoscore/data/generate_synthetic_pairs.py:23-30`), one of the four competing assignments §8.3 says cannot be defended until one is chosen. The paper's §8.3 asserts "No listener study can be run against an assignment that has not been chosen"; one apparently was, on a specific assignment, and §11 reports its number without its assignment. Naming it strengthens §8.3 rather than weakening it — the only positive listener evidence in the corpus was collected on the table that the arbitration says matches no shipped code — and omitting it looks like selectivity in a section whose whole argument is against selectivity. (The n = 48 null at `:1127` is quoted exactly: p = 0.72, Cohen's d = 0.08, N = 48. Correct.)

---

## 15. MINOR — Reference [8] promises a note the text does not contain

Reference list: "[8] J. Lacan, *Seminar XXII: R.S.I.* Cited for the Borromean figure; **edition status noted in the text**." `CITATION-LEDGER-S1.md` repeats: "The Borromean figure; edition status stated in the paper's own text."

§5 is the only place [8] appears — "figured as a Borromean link in which cutting any one ring frees all three, so that no two of them hold together without the third [8]" — and says nothing about the edition. The fact the note was meant to carry (Seminar XXII has no authorised English edition and circulates in unofficial transcriptions) is exactly the kind of thing the paper is otherwise scrupulous about, and both the reference and the ledger currently assert that it is there.

---

## 16. MINOR — A psychometric loading and an absence-of-evidence claim are sourced to Wikipedia

§4.3: "DISC is a widely used commercial vocabulary with, as far as the independent literature goes, no peer-reviewed validity evidence of its own, and its dimensions load substantially onto Big Five extraversion and agreeableness [4]." [4] is "DISC assessment", Wikipedia, labelled tertiary in the reference list and in the ledger.

The labelling is honest and is more than most papers do. But two distinct claims are being carried: a specific psychometric result (substantial loading on two named Big Five factors), and a claim about the state of an entire independent literature (that no peer-reviewed validity evidence exists). The second is the harder of the two to establish and the easier to be wrong about, and a tertiary source cannot establish it — it can only report that its own editors did not find any. The paper's standard elsewhere is stricter than this: it declines to cite its own n = 24 listener study because the stimuli were not reproducible. Either cite the primary loading study, or weaken the sentence to what the source supports ("the instrument is reported to lack independent published validity evidence").

---

## 17. The bias comparison in §9.2 — redone, and where I would match differently

I reconstructed both sets independently.

**Implementation** — `src/components/mpn-lab/mpn_reference_data.ts:1755-2390`, 30 entries `bias-001` to `bias-030`, all with `source: 'RSCH-34'`. Traits in order: Authority, Scarcity, SocialProof, Anchoring, Confirmation, Availability, Reciprocity, Commitment, Liking, Framing (positive), Framing (negative), Optimism, DunningKruger, StatusQuo, SunkCost, HyperbolicDiscounting, Affect, IllusionOfControl, Ambiguity, Bandwagon, ChoiceOverload, CognitiveDissonance, DecisionFatigue, BiasBlindSpot, CompassionFade, ActionBias, Hindsight, FundamentalAttribution, Primacy, Recency.

**Atlas** — CB-001 Confirmation, CB-002 Normalcy, CB-003 Anchoring, CB-004 Survivorship, CB-005 Availability, CB-006 Sunk Cost, CB-007 Loss Aversion, CB-008 Present Bias, CB-009 Overconfidence, CB-010 Gambler's Fallacy, CB-011 Groupthink, CB-012 Authority, CB-013 Halo, CB-014 In-Group, CB-015 Hindsight, CB-016 Peak-End, CB-017 Framing, CB-018 Status Quo, CB-019 Negativity, CB-020 Bandwagon, CB-021 Blind Spot, CB-022 Choice-Supportive, CB-023 Ostrich, CB-024 Outcome, CB-025 Zero-Risk, CB-026 Recency, CB-027 Planning Fallacy, CB-028 Representativeness, CB-029 Information, CB-030 Fundamental Attribution.

**Every count in §9.2 reproduces exactly.** Shared by name: 14 (confirmation, anchoring, availability, sunk cost, present bias / hyperbolic discounting, overconfidence / Dunning-Kruger, authority, hindsight, framing, status quo, bandwagon, blind spot, recency, fundamental attribution). Implementation-only distinct traits: 15 (scarcity, social proof, reciprocity, commitment, liking, optimism, affect, illusion of control, ambiguity, choice overload, cognitive dissonance, decision fatigue, compassion fade, action bias, primacy). Atlas-only: 16. Distinct traits in the implementation's thirty entries: 29, because `bias-010` "Framing Effect (Positive)" and `bias-011` "Framing Effect (Negative)" are two framings of CB-017.

**Where I would match differently.** Three judgement calls, all of which would tighten the gap the paper reports:

1. **Optimism ↔ CB-027 Planning Fallacy.** The planning fallacy is standardly explained as optimism bias applied to schedules. A referee who matched these would remove the paper's most striking Atlas-only example.
2. **Liking ↔ CB-013 Halo Effect.** The halo effect is the generalisation from liking to unrelated judgements; the implementation's `bias-009` maps "Liking" to warm consonant harmony, which is halo-shaped. I would keep them apart, but not confidently.
3. **CognitiveDissonance ↔ CB-022 Choice-Supportive.** Choice-supportive bias is the canonical dissonance-reduction bias.

If all three were matched, the counts become 17 shared, 12 implementation-only, 13 Atlas-only. If none are, the paper's numbers stand. The defect is not the matching — the paper's is the stricter and more defensible of the two readings — but that §9.2 presents four counts as facts when they are the output of name-matching that moves by three under reasonable disagreement. One sentence saying so would cost nothing and would pre-empt the objection.

**One observation the paper misses and should make.** The five traits it identifies as "influence principles" — scarcity, social proof, reciprocity, commitment, liking — plus authority, which is `bias-001` and is counted among the shared fourteen, are exactly Cialdini's six weapons of influence, in his order, occupying the implementation's Tier 1 and Tier 2. Naming the source makes the paper's point instantly legible to a reader who knows the literature, and turns "fifteen extra traits, five of them not biases" from an observation into a diagnosis: a persuasion taxonomy was merged into a bias taxonomy.

---

## 18. Genre

Asked plainly: yes, this now reads as a paper, and the author's standing complaint has largely been answered. Sections 2, 3, 5, 8 and 10 are argument. §5 in particular does something papers in this area almost never do — it separates the borrowed vocabulary from the asserted content, item by item, and then declines the authority of the borrowing. §10 is a real falsification section with six named ways to be wrong, four of which have stated protocols. A composer reading §6 would understand what the system claims to do; a researcher reading §10 would know what to run.

Where it lapses back into description, and the list is short:

- **§7** is a catalogue. Hamiltonian mechanics, Lyapunov exponents, Ising, Granovetter, simplicial topology, each given a paragraph asserting what it "supplies." Nothing in §7 is used anywhere else in the paper: no assertion in §8 depends on a Lyapunov exponent, no proposition in §3 requires an Ising model, no test in §10 would distinguish a theory with these from a theory without them. The two cautions at the end are the best paragraphs in the section and they are about what the apparatus does *not* license. §7 is the one place a hostile reader will say "decorative," and the paper anticipates the charge without defeating it, because anticipating a charge is not the same as answering it. Either each item earns a line in §8 or §10, or the section becomes two sentences pointing at S2.

- **§9.3** is five assertions stated in the register's format, but four of the five are untestable on stated grounds within the paper (B1 needs the annotation instrument, B2 needs a listener study, B3 needs an annotated dyadic corpus, B5 is explicitly "blocked behind A11"). Stating them is legitimate; calling them "candidate assertions" is honest. But the section reads as a promissory note in a paper whose case is that promissory notes are what the field has too many of.

- **B4's justification is not a justification.** "The constraint that forces this is arithmetical rather than aesthetic: the programme's own notation budget allows two to three independent state channels per stave." The budget is asserted with no source, no ledger entry, and no derivation. It is the only number in §9 with no locator, in a paper that gives locators for everything else.

- One tonal note. The paper twice congratulates itself for reporting against its own interest ("a theory that reports the evidence against itself is in a better position than one that waits to have it reported"; "the cost of finding it oneself is nothing"). Once is candour. Twice begins to read as a rhetorical position rather than a practice, and it raises the cost of the places where the reporting is inaccurate — §11 in particular, per finding 6.

A music therapist is the audience least served. The word appears twice in the paper (§1 scope, §3 Proposition 4) and nothing in the body addresses clinical use, the disclaimer in §1 notwithstanding. Either the audience claim should be narrowed to composers and researchers, or S1 needs a paragraph saying what a therapist would do with this and under what supervision.

---

## What I checked and found correct

These survive, and the Arbiter should know it:

- **Every pooled figure in §8.2 for the shipped pair**, reproduced by running `05_DATA/03_generators/a8_form_analysis.py`: 31,078 beats across seven files; r = 0.9191 pooled; per-play range 0.8667 (Cherry Orchard, the minimum) to 0.9512 (Hamlet, the maximum); PC1 = 0.9596 → "95.96 per cent"; 11 of 25 level pairs on the implementation's own thresholds.
- **The 0.841 minimum**, as a conditional result: 0.8409 at ρ = −0.7569 with the corpus's two standard deviations held fixed. Correct as computed; see finding 4 for the generalisation.
- **The input-variable figures**: trauma 93 distinct values, sd 0.2317; entropy 14 distinct values, floor 0.30, sd 0.1023; corr(τ, H) = −0.0256 pooled. All exact.
- **The hand-annotated cross-check**: n = 232, r = 0.9150 → "r = 0.915". Exact.
- **The candidate correlations**: C2 at 0.4853 → "0.485"; C3 at 0.4039 → "0.404". Exact. C2's 24-of-25 is correct on the fixed metric; see finding 3 for C3.
- **A5-forces-A8.** The argument is sound and is the best thing in the paper. Two convex combinations of the same pair with weights this close cannot dissociate when the inputs are close to independent, and the floor for independent inputs is about 0.83 whatever their variances.
- **The whole of §9.2's arithmetic**: 14 shared, 15 implementation-only, 16 Atlas-only, 29 distinct traits, framing twice. Reproduced exactly; see finding 17 for the judgement-call sensitivity.
- **The thirty bias entries and their source field**: 30 entries at `mpn_reference_data.ts:1755-2390`, all carrying `source: 'RSCH-34'`, none carrying the Atlas. Confirmed.
- **The five influence principles**: scarcity, social proof, reciprocity, commitment, liking are all present and are not biases in the Atlas's sense. Confirmed.
- **The four modal tables.** The count is right even though the enumeration is short by one; see finding 11 for the fourth.
- **The entropy argument-count error**: `composeMelody(…, entropy = 0.5)` at `GeniusComposer.ts:154`, called with five arguments at `score_orchestrator.ts:299-305` and `:312-317`. Confirmed exactly as described.
- **The fixed register triple** on the two paths the paper means: `src/app/mpn-conductor/page.tsx:367-369` and `src/components/mpn-lab/GeniusComposer.ts:159`, both `(0.33, 0.33, 0.34)`, and zero `real:` keys across the 232 annotated frames. Confirmed; see finding 6 for the path the paper omits.
- **The motif inversion is inaudible**: `leitmotif_generator.ts:183-185` negates `transformed.intervals`, and `grep -rn "\.intervals" src/` outside that file returns **nothing**. The claim is exactly right.
- **Orchestration level reaches only a log**: `transformations.orchestrationLevel` appears at `GeniusComposer.ts:190` and nowhere else. Confirmed — and it is worse than the paper says: `transformations.instruments` and `transformations.harmonyContext` are computed at `leitmotif_transformation_rules.ts:346` and `:352-356` and are not even in the log string, so "computed and written to a console log" is generous to two of the three.
- **The n = 48 null**: `MPN_ACADEMIC_DISSERTATION.md:1127`, p = 0.72, Cohen's d = 0.08, N = 48. Quoted exactly, and reporting it is the right call.
- **Citations [2], [3], [5], [6], [16], [17], [18]** match the ledger's stated scope; [6] has the correct volume, issue and page range; nothing in the paper quotes a coefficient, a page or a passage from an UNVERIFIED-canonical work. No invented DOI, page number or quotation found anywhere.
- **[11], [12], [14]** check out against the corpus chapters. `01_THEORY/01_core/03_TOPOLOGY_OF_DIAD_AND_TRIAD.md:23` ("In a Diad, there is no mediator") and §2.1 ("The Stability of the Triad (Simmel's Law) — Georg Simmel argued that the Triad is the first stable social form") support §7 and B3, and the Simmel attribution through [11] is exactly as the ledger describes it. `08_POLYPHONY_AND_DISSONANCE_IN_DIALOGUE.md:41-52, 60-76` supports every element of B2's vocabulary — the angle between semantic vectors, unison at 0°, third/sixth at ≈60°, tritone at ≈180°, resolution by concession, modulation or suspension, and parallel/contrary/oblique motion. The one thing worth noting is that the source's semantic vector is dimensioned "Technicality, Urgency, Risk, Cost" and its application is a cyber-incident meeting; transplanting it to drama is the author's prerogative but the paper does not mention that it is a transplant.
- **§4.3's arithmetic**: 4 + 5 + 3 + 12 = 24. Correct; see finding 8 for what it collides with.
