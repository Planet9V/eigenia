| Field | Value |
|:---|:---|
| Designation | MPN-NOTE-05 |
| Title | The two blocking numbers that are not settled by listening: a recommendation with its arithmetic |
| Status | Estimate for the author's decision. Not a ruling. Every figure is reproducible from `05_DATA/03_generators/s7_blocking_numbers.py`, which verifies its own inputs against S3 before reasoning on them |
| Date | 14 September 2026 |
| Rests on | S2 [2], S3 [3], and MPN-DESIGN-01 revision 7 [4] |
| Scope | Theory and internal research on synthetic material, under the author's ruling of 13 September 2026 |

## 1. What this settles and what it does not

Three numbers have gated four documents since S3 revision 1: the interpolation margin $\delta$, the rounding rule, and $k_{\max}$. **$\delta$ is not one of them any more**, because the listening pack now carries the experiment S3 names, so this note is about the other two. Both are decided by argument rather than by ear, and an argument about a system should be made against the system's own arithmetic.

Neither recommendation is a musical judgement in disguise. Each rests on a property that can be computed and was, and each says plainly what it does not fix.

## 2. The rounding rule

### 2.1 The question, restated

S3 replaces $\arg\max$ with modal interpolation, which returns a blended scale degree that is generally not an integer number of semitones. Something has to decide what a renderer does with 3.46 semitones above the tonic. S3 bounds the worst case at a quarter tone and records the rule as S4's debt, unpaid.

### 2.2 What rounding actually costs, measured rather than bounded

Over a grid of 20,301 points on the simplex, with the live pitch table below the trauma switch:

| $\delta$ | Share of the simplex inside the margin | Where rounding leaves a scale different from $\arg\max$ | Mean absolute rounding error |
|---:|---:|---:|---:|
| 0.02 | 3.44 per cent | 14.74 per cent of the margin | 34.7 cents |
| 0.05 | 9.21 | 6.96 | 32.4 |
| 0.10 | 18.41 | 5.72 | 31.8 |
| 0.15 | 27.13 | 6.39 | 31.7 |
| 0.20 | 35.36 | 8.62 | 31.8 |
| 0.30 | 50.33 | 11.76 | 32.1 |

The margin shares agree with S2's closed form $2\delta - \delta^2$ to within 0.6 per cent of the area, so the grid is computing the margin the way S2 and S3 describe it.

**The third column is the finding and it is decisive.** Multiply it by the first: at $\delta = 0.05$, rounding leaves a scale different from the one $\arg\max$ would have chosen on **0.64 per cent of the whole simplex**, and at $\delta = 0.20$ on 3.05 per cent. Everywhere else the rounding snaps every blended degree back onto the winning mode.

So rounding inside $\Phi$ does not degrade the interpolation. It very nearly deletes it. The rule S3 chose over hysteresis and a dead band, and spent its longest section defending, would survive into a notated pitch on under one state in a hundred.

### 2.3 And the tie is exactly where the convention decides the scale

At a two-way tie the weights are one half each, so every degree on which the two modes differ by a semitone lands on a half. On the live table's Real against Symbolic tie, Dorian against Lydian:

| | Degrees, semitones above the tonic | Which scale |
|:---|:---|:---|
| Dorian | 0, 2, 3, 5, 7, 9, 10 | input |
| Lydian | 0, 2, 4, 6, 7, 9, 11 | input |
| blend at the tie | 0, 2, 3.5, 5.5, 7, 9, 10.5 | neither |
| rounded half up | 0, 2, 4, 6, 7, 9, 11 | Lydian exactly |
| rounded half to even | 0, 2, 4, 6, 7, 9, 10 | not one of the seven |

One convention returns one of the two inputs and the other returns a scale that is neither, and the second is what a Python implementation gets by writing `round`. This is not a detail to leave to a language. Whichever rule is adopted decides the scale at precisely the states interpolation exists for.

### 2.4 The recommendation

**Do not round inside $\Phi$ at all. $\Phi$ emits the blended degree as a continuous value in cents, and the notated pitch is its rounded pre-image, a property of the notation renderer rather than of the mapping.**

The precedent is in S3 already and it is exact. Section 2.1 settles the same question for dynamics: the output of $\Phi$ is the marking, not the velocity, and the velocity interval is the pre-image. Doing the same for mode makes the two channels consistent rather than making a new rule.

Four consequences, all of them upside:

**The jump set stays where S3 proves it is.** Under the pre-image rule the jump set of the mode parameter remains the single surface $\tau = 0.6$ and nothing on the simplex. Rounding inside $\Phi$ would put a jump on every rounding boundary in the margin.

**The $\delta$ experiment becomes runnable today.** S3 says the practical way to choose $\delta$ is to hear one blended pair on a synthesiser that takes cents, and that no microtonal notation renderer exists. Under this rule the audio path carries the exact value and needs no such renderer. The listening pack is built on exactly that and the stimuli exist.

**The rounding rule stops being a blocking number for the theory.** It becomes a setting on one renderer, and a renderer's setting does not gate S1 to S4.

**And the cost is bounded and stateable.** Notation and audio disagree by at most a quarter tone, only inside the margin, on the share of the simplex the first column gives. That is a sentence on the face of a score, not an open question.

### 2.5 What it does not fix

It does not decide $\delta$, which is the listening pack's business. It does not make the notation faithful inside the margin; it makes the infidelity bounded, local and declared. And a score and its audio will differ audibly on those states, which has to be said to anyone who reads one while hearing the other.

## 3. $k_{\max}$

### 3.1 What S3 already establishes, reproduced

The script rebuilds the neo-Riemannian graph from the three generators rather than citing it. The generators are involutions and fixed-point free, the action on the 24 triads is transitive, the Cayley diameter is 5, and the distance distribution over all 576 ordered pairs is 24, 72, 144, 192, 120, 24. Those are S3's figures exactly, so what follows is reasoning on S3's graph.

The $LR$ alternation visits all 24 triads once and closes, so chain position is an integer modulo 24.

S3's own constraints reproduce: no value below 11 lets any trauma trajectory reach a chord at the graph's full diameter, no value below 13 lets every trajectory do so, and 24 or more wraps. The defensible range is 13 to 23.

### 3.2 The question S3 raises in one sentence and does not compute

S3 records that the harmonic parameter is a function on $\mathcal{P} \times \mathcal{P}$ and on the chord already sounding, that these are exactly the dependencies it uses to rule out hysteresis and a dead band for the mode selector, and that it has the first-frame problem too. It then asks, without computing it, whether the parameter can be re-expressed as a function of the current state alone, as the other five are.

**It can, and the arithmetic says at what value.**

Write the **absolute** form: chord position equals $\operatorname{round}(k_{\max} \cdot f(\text{state}))$ around the $LR$ cycle from a fixed origin. That is a function on $\mathcal{P}$ alone. No previous chord, no previous state, no first frame problem, A11 intact. The **relative** form is the shipped proposal: a change of size $\delta$ moves the chord $\operatorname{round}(k_{\max}\delta)$ positions from wherever it is.

The two agree on the size of every move by construction. They part company on reach, and reach is computable. The relative form reaches all 24 chords by accumulating moves whatever $k_{\max}$ is. The absolute form reaches $\min(k_{\max} + 1, 24)$.

| $k_{\max}$ | Chords the absolute form can ever visit |
|---:|---:|
| 5 | 6 |
| 11 | 12 |
| 13 | 14 |
| 20 | 21 |
| **23** | **24** |
| 24 | 24, and wrapping |

**The two formulations have the same codomain at exactly one value.**

### 3.3 The recommendation

**$k_{\max} = 23$, and with it the absolute form.** Three independent reasons and none is a taste judgement.

**One.** It is the only value at which the state-only formulation has the same reachable set as the change-based one, so adopting it is what lets the harmonic parameter be re-expressed as a function of the current state. That restores A11's decomposability for the one parameter of the six that lacks it, and removes the first-frame problem, which in a therapy session is not an edge case but the opening of every session.

**Two.** It sits at the top of S3's own defensible range, so a character destroyed over a play can arrive at the far side of the harmonic space from every starting triad rather than from half of them.

**Three.** It is the largest value that stays injective. At 24 the map wraps by an artefact of the modulus rather than by any fibre of the theory.

### 3.4 What it does not fix, and this must be said with it

S3 finds that chain position and Cayley distance do not rise together, because a cycle of 24 is embedded in a graph of diameter 5 and folds back on itself. From C major:

| Positions moved | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|:---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Cayley distance | 1 | 2 | 3 | 4 | 3 | 2 | 3 | 2 | 3 | 4 | 3 | 4 |

| Positions moved | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 |
|:---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Cayley distance | 5 | 4 | 3 | 2 | 1 | 2 | 3 | 4 | 3 | 2 | 1 |

Read that downward. It is not monotone and it is not close to monotone. **$k_{\max} = 23$ does not repair it and makes the worst case plainest: at a sweep of 23 positions the character ends one generator from where they started, and at a sweep of 17 positions, three quarters of the range, they end one generator away as well.** The greatest distance a chain move ever buys is reached at 13 positions and the function falls away on both sides of it. Choosing $k_{\max}$ does not decide whether the harmonic move carries a magnitude or an index, which is S3's open repair and stays the author's. What $k_{\max} = 23$ does is make the parameter a function of the state, which is what A11 needs and what no other value delivers.

**And whether the metric is audible at all is a question the listening pack now asks.** Part C puts ten triad pairs at five Cayley distances to listeners and asks how far the second chord travelled. S3 names this as the falsification test for the whole harmonic channel and says it is worth running before either repair is chosen. If rated distance does not track graph distance, the honest repair is the second one, the metric is decoration, and the parameter is a walk along a fixed cycle. That result would not change the recommendation here, because the recommendation is about decomposability rather than about magnitude.

## 4. What both recommendations have in common

Each takes a number that was blocking the theory and moves it somewhere it stops blocking. The rounding rule becomes a renderer setting. $k_{\max}$ becomes the value that lets a parameter rejoin the assertion it was quietly violating. Neither buys a claim the programme did not already have, and both are reversible in an afternoon if the author disagrees, because nothing downstream is built yet.

## 5. References

[1] J. McKenney, "The McKenney-Lacan psychometric calculus," MPN-S1, `08_PAPERS/S1-mckenney-lacan-theory.md`. A11 is the composition and decomposability assertion.

[2] J. McKenney, "The formal apparatus," MPN-S2, `08_PAPERS/S2-mathematics.md`. The kite result $2\delta - \delta^2$ and the pre-image framing of section 6.1.

[3] J. McKenney, "The mapping," MPN-S3, `08_PAPERS/S3-mapping-phi.md`, revision 9. Section 2.1 the dynamics pre-image, 2.3 the interpolation and the rounding debt, 2.5 the harmonic operator and the $k_{\max}$ constraints.

[4] "One engine, several surfaces," MPN-DESIGN-01, `08_PAPERS/DESIGN-UNIFIED-FRAMEWORK.md`, revision 7.

[5] The arithmetic behind every figure here: `05_DATA/03_generators/s7_blocking_numbers.py`, whose output is kept beside it as `BLOCKING-NUMBERS-OUTPUT.txt`. It verifies the neo-Riemannian graph and the margin area against S2 and S3 before using either.

[6] The listening pack, `05_DATA/03_generators/s7_listening_stimuli.py` and its stimuli, which carries the $\delta$ experiment of [3] section 2.3 and the harmonic discrimination test of [3] section 2.5.
