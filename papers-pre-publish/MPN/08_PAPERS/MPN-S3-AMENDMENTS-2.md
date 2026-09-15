| Field | Value |
|:---|:---|
| Designation | MPN-S3-AMENDMENTS-2 |
| Title | Four amendments to S3 revision 9: the rounding rule, $k_{\max}$, the bias layer's coordinates and devices, and what the layer is |
| Role | Amender. Not the author, not a reviewer, not a regulatory reviewer |
| Date | 14 September 2026 |
| Applies to | `08_PAPERS/S3-mapping-phi.md`, revision 9, sections 2.3, 2.5, 3, 4 and 5, the front-matter parameter table and the section 7 work queue |
| Authority | The two decisions of 14 September 2026 [1], and changes 2, 3, 7, 8, 9 and 11 of `ARBITRATION-DESIGN-R7.md` [3] |
| Scope | Theory and internal research on synthetic material, under the author's ruling of 13 September 2026: no people, no regulation |
| Supersedes nothing | `MPN-S3-AMENDMENTS` [8] stands unaltered; that note amends the register and the audit, this one amends S3 |
| Reproduces | `05_DATA/03_generators/s7_blocking_numbers.py` and its output [7] |

## 1. What this is

S3 revision 9 is published. Four things now amend it: two from the author's decisions of today, two from the drafting and arbitration those decisions govern. This note states each precisely enough that an editor can apply it without rereading the conversation that produced it, and states what each costs. It issues replacement claims rather than replacement paragraphs, on the model of the first amendment note [8], because three of the four change what a section asserts rather than how it is worded. Section 6 lists every figure that moves.

## 2. Amendment 1, section 2.3: $\Phi$ does not round

**The amendment.** $\Phi$ does not round. It emits the blended scale degree as a continuous value in cents, and the notated pitch is the rounded pre-image of that value, a property of the notation renderer and not of the mapping [1]. Section 2.3's closing sentence, that the rounding is what a score can print and S4 owes the rounding rule, is replaced: S4 owes no rounding rule, because there is none inside $\Phi$ to owe, and what a renderer does with 3.46 semitones above the tonic is a setting on that renderer.

**The jump set does not move, and that is the point.** It remains exactly what section 2.3 proves it to be: **the single surface $\tau = 0.6$**, arising from A4's second stage, **and nothing on the simplex**. Rounding inside $\Phi$ would have put a jump on every rounding boundary inside the margin, a set that grows with $\delta$ and that section 2.3 enumerates nowhere. The front-matter parameter table's mode row stands as printed, and this amendment is what keeps it standing.

**The argument is one precedent, already in the paper.** Section 2.1 settles the identical question for dynamics in one sentence, which reads in full: "The output of $\Phi$ is the marking, not the velocity: the velocity interval is the pre-image, as S2 section 6.1 sets out." Doing the same for mode makes the two channels consistent rather than introducing a new rule into either. That is the whole of the argument.

**The measured cost of the alternative.** Rounding inside $\Phi$ would leave a scale different from $\arg\max$ on 0.64 per cent of the whole simplex at $\delta = 0.05$ and on 3.05 per cent at $\delta = 0.20$ [2], [7]. Everywhere else it snaps every blended degree back onto the winning mode. So rounding inside $\Phi$ does not degrade the interpolation section 2.3 chose over hysteresis and a dead band and spent its longest passage defending. **It very nearly deletes it.**

**The rounding convention finding, which section 2.3 does not carry and now must.** At an exact tie the weights are one half each, so every degree on which the two modes differ lands on a half. On the live table's Real against Symbolic tie, Dorian against Lydian, the blend is 0, 2, 3.5, 5.5, 7, 9, 10.5. Round half up returns Lydian exactly, one of the two inputs; round half to even returns 0, 2, 4, 6, 7, 9, 10, which is none of the seven, and it is what a Python implementation gets by writing `round` [2], [7]. **The convention decides the scale precisely where interpolation exists**, and section 2.3's own count puts 21 of the 128 frames that reach the simplex exactly on a tie.

**Where the convention question goes.** It moves to the notation renderer and it does not disappear. A renderer printing a score from the continuous value still chooses between half up and half to even, faces the same two outcomes at the same states, and must declare which it chose on the face of the score. What the amendment buys is that the choice no longer gates S1 to S4, and that the audio path carries the exact value regardless, so the $\delta$ experiment runs on a synthesiser that takes cents.

**The consequence recorded as finding G2.** $\Phi$ now ceases to discretise mode at all [3, change 11]. Mode joins the channels with no stated discretisation in S3, in MPN-NOTE-05 or in MPN-DESIGN-01, and the consequence reaches past notation: **no perturbation budget can ever be written for that channel**, a budget being a bound stated against a quantum and this channel having none. Any later proposal writing a bias or an influence principle into mode must supply a discretisation or state its bound in cents.

**What this costs.** It costs the notation path its fidelity inside the margin, and the cost must be printed rather than implied: notation and audio disagree by up to a quarter tone, only inside the margin, on the share of the simplex section 2.3's own table gives, 9.8 per cent at $\delta = 0.05$ and 36.0 per cent at $\delta = 0.20$. Anyone reading a score while hearing the audio hears the difference there. It costs the mode channel any future perturbation budget, per G2. And it moves an unresolved convention to a renderer with no specification yet, which improves where the problem sits without solving it.

## 3. Amendment 2, section 2.5: $k_{\max} = 23$, and the absolute form

**The amendment.** $k_{\max} = 23$, and with it the harmonic parameter is re-expressed in the absolute form: chord position is $\operatorname{round}(23 \cdot f(\text{state}))$ around the $LR$ Hamiltonian cycle from a fixed origin, no longer a move of $\operatorname{round}(k_{\max}\delta)$ positions from the chord already sounding [1]. Section 2.5's proposal paragraph, opening "A state change of size $\delta$ in the trauma coordinate moves the chord", is replaced by the absolute statement; the paragraph beginning "Two words in that sentence are doing more than they look" is kept only as a record of what the relative form cost, its verbs in the past tense.

**The three reasons, and which is decisive.** First, 23 is the only value at which the absolute and relative forms have the same reachable set: the relative form reaches all 24 triads by accumulating moves at any $k_{\max}$, the absolute form reaches $\min(k_{\max}+1, 24)$ [2], [7]. Second, 23 is at the top of section 2.5's own defensible range of 13 to 23, so a character destroyed over a play can arrive at the far side of the harmonic space from every starting triad rather than from half. Third, 23 is the largest value that stays injective, since at 24 and above the map wraps by an artefact of the modulus, which section 2.5 rules out. **The first is decisive.** It is not a musical preference for 23 over 22; it is what makes the re-expression possible at all, because at any lower value the absolute form is a strictly smaller mapping than the one S3 published.

**What it fixes.** The harmonic parameter becomes a function on $\mathcal{P}$ alone, reading no previous state and no previous chord. That removes both dependencies section 2.3 uses to rule out hysteresis and a dead band for the mode selector, so section 2.5 no longer carries a rule the same paper disqualifies elsewhere. It rejoins A11's decomposability, which lets a frame's music be computed from that frame's state alone, for the one parameter of six that lacked it, and it loses the first-frame problem, which in a therapy session is the opening of every session. Item S3-11 is discharged and S3-9 closes at 23.

**What it does not fix.** Chain position and Cayley distance still do not rise together. Section 2.5 states this from three data points; the corrected table below, from C major, replaces them, because three points understate how badly the function behaves [2], [7].

| Positions | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|:---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Cayley distance | 1 | 2 | 3 | 4 | 3 | 2 | 3 | 2 | 3 | 4 | 3 | 4 |

| Positions | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 |
|:---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Cayley distance | 5 | 4 | 3 | 2 | 1 | 2 | 3 | 4 | 3 | 2 | 1 |

Read downward the column is not monotone and not close to it. The greatest distance any chain position buys is reached at 13 and the function falls away on both sides. **Position 17 and position 23 both give distance 1**, so at three quarters of the range and at the full sweep alike the character ends one generator from where they started. $k_{\max} = 23$ does not repair this and makes the worst case plainest.

**What section 2.5 leaves open is still open.** Section 2.5 asks whether the harmonic move carries a magnitude or an index, offering the metric and the chain definitions as the two repairs. **This amendment does not settle it**, because what it implements is about decomposability and not about magnitude [2]. Item S3-10 stands unchanged, and **Part C of the listening pack is the test**: ten triad pairs at five Cayley distances, listeners asked how far the second chord travelled. If rated distance does not track graph distance, the second repair is the honest one, the metric is decoration, and the parameter is a walk along a fixed cycle.

**One loose end, which is the author's.** $f(\text{state})$ is not specified: the decision fixes the form and the constant and leaves the function unnamed. **This amendment leaves $f$ open and flags it as the author's**, rather than adopting the one candidate the live implementation offers, the tension $0.9r + 0.1H$ that S3 section 3 enumerates as the only live linear reading of a register. Three facts stop it being adopted silently. It is a function of the Real register and entropy, not of trauma, so adopting it changes what the front-matter table says the harmonic position is a function of. At the library's dispersions its nominal 90 to 10 is effectively 94.9 to 5.1, so it is very nearly the Real alone. And on the 164 frames of 232 section 3 counts as carrying no Real keyword the Real is exactly zero, so tension reduces to $0.1H$ in $[0, 0.1]$, which under $\operatorname{round}(23 f)$ confines the chord to three of 24 triads on roughly seven frames in ten. An editor should add $f$ to section 7's list of what is not settled here.

**What this costs.** It costs the relative form's one genuine advantage, that small moves accumulate to any triad at any $k_{\max}$; under the absolute form this holds only at 23, so the constant is now load-bearing in a way it was not. It costs the paper a new open item, $f$, for closing two, S3-9 and S3-11. And it fixes nothing about monotonicity, the defect section 2.5 found against its own proposal.

## 4. Amendment 3, section 4: coordinates for the fourteen, and a device for CB-017

**BL-1, the fourteen inherited mappings.** S3 section 4.2 names, for each of sixteen drafted mappings, the state coordinate the device rides on; the fourteen entries inherited from the reference implementation name none. The table below supplies one for each, in section 4.2's six columns so the two read as one table of thirty, and is inserted after the sixteen [5]. A domain marked with a dagger is drafted in section 4.3 and strikeable separately. A row marked **undecided** carries the drafter's flagged alternative, the choice being genuinely open.

| Id | Bias | Domain | Musical device | Rides on | Why this device |
|:---|:---|:---|:---|:---|:---|
| CB-001 | Confirmation | PERC | Ostinato pattern, repeating | register: Symbolic, **undecided** against entropy inverted | the loop is the account defending itself against revision, so it modulates the register that holds the account rather than the disorder of it |
| CB-003 | Anchoring | PERC | Sustained pedal tone | entropy | an anchor is what a subject holds to when the symbolic organisation cannot supply a value |
| CB-005 | Availability | PERC | Sforzando, sudden loud accent | trauma | the vivid item is the one already carrying weight, and the accent perturbs a marking that is already a function of it |
| CB-006 | Sunk Cost | DEC | Forced motif development despite dissonance | trauma | trauma is the only coordinate that accumulates and cannot fall, so it is the one quantity that can stand for what has been spent |
| CB-008 | Present Bias | DEC | Short notes for the immediate, long for the future | entropy | a horizon is a structure and entropy is the disorder of structure |
| CB-009 | Overconfidence | DEC | Solo dominating over ensemble | register: Imaginary | the inflated estimate is an estimate of oneself, which is the Imaginary's content |
| CB-012 | Authority | SOC | Deep brass and organ pedal | register: Symbolic | deference is to the office and not to the person; the device's channel is set from DISC and from no state coordinate |
| CB-015 | Hindsight | MEM | Strong perfect cadence | register: Symbolic | the outcome is written back into the record as a necessity |
| CB-017 | Framing | PERC† | See the remap below | register: Imaginary, **undecided** against trauma | a frame is the image under which a datum appears, and the Imaginary is the register of the image |
| CB-018 | Status Quo | DEC† | No modulation, stays in the tonic | trauma, **undecided** against register: Symbolic | the refusal to modulate is risk aversion under load, which couples this row to CB-007 |
| CB-020 | Bandwagon | SOC† | Tutti crescendo | register: Symbolic | joining is joining the terms the others play on, which puts it on the declared groupthink signature |
| CB-021 | Blind Spot | MEM† | Mirror inversion, self-blind | register: Imaginary | the blind spot is a property of the image one holds of oneself |
| CB-026 | Recency | MEM† | Strong final note emphasis | entropy | the last item wins when the store has no order to rank it by |
| CB-030 | Fundamental Attribution | SOC† | Solo success, ensemble failure | register: Imaginary | the other appears as a character rather than as a situated agent |

No row rides on the Real, on fragmentation or on density, and section 4.2 should say so with the reasons the drafter gives [5]. Loading the fourteen takes the layer from twelve signatures and four collisions to eighteen and eight, four of the eight created by this drafting and so strikeable.

**BL-2, CB-017.** The inherited device for framing sets the mode, and no channel allocation is available on which setting the mode is admissible [3, change 2]. On the draft's Option A it is remapped to the same pitch classes restated in a different registral disposition and spacing, open and high against close and low, with mode, key, tempo, metre, dynamic marking and instrument all held [6]. Every $\Phi$ parameter is held, so the device writes to nothing section 2 determines.

The draft names two costs and both belong in section 4.2. **First, it costs the frame-local classification.** A restatement is audible only against the statement it restates, so CB-017 moves out of the frame-local class into the historical one, the per-turn score becomes a passage-pair score, and the partition moves from twenty-two and eight to twenty-one and nine. **Second, it rests on a sub-channel S3 has not specified.** Nothing in S3 specifies octave placement, spacing or voicing of the pitch set the leitmotif transformation produces, which makes the sub-channel free today and fragile tomorrow: a later revision specifying voicing takes it back and puts CB-017 one specification away from a collision with a parameter the theory owns.

**Change 7, applied to section 4.2's coordinate claim.** Section 4.2 says each of the sixteen names the state coordinate the device rides on, and section 4.4 repeats it as one of the three properties that make a strike local. Restate both as **fifteen of sixteen, with CB-004, survivorship, the named exception** [3, change 7]. S3's own words put that row on fragmentation rather than on a state coordinate, and fragmentation is a $\Phi$ output on the very channel the device writes to, so the row rides on the output it perturbs. Section 4.2's Survivorship paragraph already says so; the count above it is what moves.

**Change 8, applied to the negative claim.** The claim that no inherited entry names a state coordinate must name the class the enumeration covered [3, change 8]. As shipped, `s6_bias_layer.py` reads a five-field JSON projection and assigns `rides=None` to every inherited entry at the record-building line, never opening the reference implementation. The restated claim is narrower and stronger: a search of the checkout of 14 September 2026 for values rather than for function names finds a state coordinate attached to a cognitive bias in exactly three places, none of them a coordinate for any single entry, being a trauma gate suppressing the whole bias list above trauma 0.5 and distinguishing no member of it, a wiring of confirmation bias into the mode selector that overrides the register triple and misses on every frame, and a visualisation giving six named channels a common amplitude in trauma and a common spread in entropy while emitting no music [5]. The claim reaches source text and data committed as source, not a runtime dependence, an unshipped branch or a build artefact. Record also the `strength` in $[0.75, 0.95]$ the projection carries on all thirty entries and the script does not read, set aside rather than used, being a constant band with no stated derivation.

**What this costs.** It costs the layer its cleanest claim about itself: section 4 could say every drafted mapping names a state coordinate and the inherited ones name none, and now the first is fifteen of sixteen and the second a bounded finding about one checkout on one date. It costs CB-017 its place in the frame-local class, a real loss to the cheapest test the layer has. And it adds four collisions a reviewer must read, the price of supplying coordinates at all: they were always there and invisible only because half the table was blank.

## 5. Amendment 4, sections 4 and 5: what the layer now is

**The amendment.** The bias layer renders no music in version one. It is a Layer 3 detector whose output is a marked textual proposal beside the Layer 0 turn that prompted it [1]. This is a statement of what the layer is in the version being built, not a deferral of a device or a channel. Section 4 must carry it in its opening paragraph, before section 4.1's reconciliation, because every count in the section reads differently under it.

**What section 4's thirty devices therefore are.** They are **a specification with no renderer**, and those are the words the section should use. The alternatives mislead: not deferred, since nothing waits on a date; not proposals, since section 4.4 already uses that word for their evidential status; not struck, since the reconciliation invariant still accounts for all thirty. An editor should not soften the phrase.

**The reopening condition.** The permanence clause the option carried is replaced by a stated condition: **a detection rate from BL-5 and BL-6** [1]. If the detector is shown to find planted moves at a usable rate, the channel question reopens with evidence it has never had; and if it reopens the candidate is the fourth stave rather than articulation and voicing, that being the option a later revision of S3 is likeliest to reclaim for a parameter of its own.

**What this costs S3, in two places.** Section 3's identifiability analysis excludes the bias layer, and section 4.4 gives the reason as B4: the layer is carried between staves rather than on one. **That exclusion now holds for a different reason and the section must say which.** The layer renders nothing, so there is nothing for an identifiability count to include, on a stave or between two. The B4 reason is not wrong and is no longer what does the work; leaving it alone would leave a reader thinking the exclusion is a fact about staves when it is a fact about version one. Section 3's tuple and bit figures are unaffected either way.

And **assertion B1 stays untested, because nothing renders**. B1 asserts that the bias layer exists and is not predicted by the state; testing it needs a rendered bias an analyst or a listener can find in a score, and version one produces none. Section 4.4's sentence that no assertion depends on a particular bias mapping stands, but the register entry for B1 should record that its test is now gated on the same reopening condition as the channel.

**What this costs.** It defers for a second time a capability the author asked for twice, recorded rather than softened [1]. It removes half of MPN-DESIGN-01 section 6.2's framing sentence, which is that document's business, but S3 must not read as though a rendering exists that the design has withdrawn. And it leaves the whole of section 4, thirty devices, sixteen mappings, fourteen domains and fourteen coordinates, as a specification whose only route to evidence is a detection rate nobody has measured.

## 6. Every figure in revision 9 that these amendments change

An editor should expect to touch the following and nothing else. Rows carrying no numeral are claims rather than figures, included because they read as figures in the text.

| Where | Figure or claim | Revision 9 | Amended |
|:---|:---|:---|:---|
| Front matter, parameter table, Harmonic position row | Function of | trauma | $\mathcal{P}$, through $f(\text{state})$, with $f$ unfixed |
| Front matter, parameter table, Harmonic position row | Jump set | undetermined; $k_{\max}$ is not fixed | the 24 chain positions of $\operatorname{round}(23 f)$, a quantum of $1/23 = 0.0435$ in $f$ |
| Front matter, parameter table, Mode row | Jump set | the surface $\tau = 0.6$ and nothing on the simplex | unchanged, and this amendment is what preserves it |
| 2.3, closing paragraph | who owes the rounding rule | S4 owes it | nobody; $\Phi$ does not round and the renderer holds a convention |
| 2.3 | worst-case rounding error of a quarter tone | a property of the mapping | a property of the notation path only |
| 2.3 | rounding convention at a tie | not stated | half up returns Lydian, half to even returns none of the seven |
| 2.3 | cost of rounding inside $\Phi$ | bounded at a quarter tone | leaves a scale different from $\arg\max$ on 0.64 per cent of the simplex at $\delta = 0.05$ and 3.05 per cent at $\delta = 0.20$ |
| 2.5 | $k_{\max}$ | unfixed; defensible range 13 to 23 | 23 |
| 2.5 | form of the parameter | $\operatorname{round}(k_{\max}\delta)$ from the sounding chord | $\operatorname{round}(23 f(\text{state}))$ from a fixed origin |
| 2.5 | domain of the parameter | $\mathcal{P} \times \mathcal{P}$ and the chord already sounding | $\mathcal{P}$ |
| 2.5 | chain position against Cayley distance | three points: 4 costs 4, 5 costs 3, 23 costs 1 | the full table for positions 1 to 23, with 17 and 23 both at distance 1 |
| 2.5 | reachable chords at $k_{\max}$ | $k_{\max} + 1$ under a sweep | 24 exactly, the absolute and relative forms agreeing only at 23 |
| 3, fourth caution | why harmony is excluded from the counts | $k_{\max}$ unbounded, reachable triads unknown | $k_{\max}$ fixed and the codomain 24; the counts are not recomputed here |
| 3, tuple and bit figures | 270, 1,665, 126, 978; 8.08, 10.70, 6.98, 9.93 | as printed | unchanged |
| 4.2, opening claim | mappings naming a state coordinate | sixteen of sixteen | fifteen of sixteen, CB-004 the exception |
| 4.4, second property | each mapping names its coordinate | all sixteen | fifteen of sixteen, CB-004 the exception |
| 4.2, table size | sixteen rows | sixteen | sixteen drafted plus fourteen inherited, thirty in two tables |
| 4.2, CB-017 device | inherited: minor mode, negatively framed | sets the mode | restated pitch classes in a different registral disposition and spacing, every $\Phi$ parameter held |
| 4.2, detector partition | frame-local against historical | 22 and 8 | 21 and 9 |
| 4.1 and 4.3 counts | 30, 16, 14, 29, 14, 17, 15; PERC 8, DEC 10, SOC 6, MEM 6 | as printed | unchanged |
| 4, negative claim on inherited entries | names no coordinate | unqualified | qualified by class: one checkout, one date, source text and committed data, three found attachments, none per entry |
| 4, bias-layer projection | the `strength` field | not recorded | in $[0.75, 0.95]$ on all thirty, unread by the script, set aside with a reason |
| 4 and 5 | status of the layer | a layer with thirty devices | a Layer 3 detector emitting a marked textual proposal; the thirty devices are a specification with no renderer |
| 4.4 | why section 3 excludes the layer | B4, carriage between staves | nothing renders |
| 7, work queue, S3-9 | fix $k_{\max}$ | open | closed at 23 |
| 7, work queue, S3-11 | re-express as a function of the state | open | closed: it can be and is |
| 7, work queue, S3-10 | magnitude or index | open | open; Part C of the listening pack is the test |
| 7, not settled here | the rounding rule, S4's | open | closed for $\Phi$; a renderer convention remains |
| 7, not settled here | $k_{\max}$ bounded to 5 to 23 | open, and the range disagrees with section 2.5's 13 to 23 | closed at 23; the inconsistent range goes with it |
| 7, not settled here | $f(\text{state})$ | not raised | open, and the author's; the live $0.9r + 0.1H$ is not adopted |
| Register, B1 | not predicted by the state | untested | untested, gated on a detection rate from BL-5 and BL-6 |

## 7. References

[1] `DECISION-LOG-2026-09-14.md`, 14 September 2026. Decisions D-2026-09-14-A and D-2026-09-14-B.

[2] `MPN-NOTE-05-blocking-numbers.md`, 14 September 2026.

[3] `ARBITRATION-DESIGN-R7.md`, 14 September 2026. Rulings A to D and the forty-five required changes; changes 2, 3, 7, 8, 9 and 11 are applied here.

[4] J. McKenney, "The mapping," MPN-S3, `08_PAPERS/S3-mapping-phi.md`, revision 9.

[5] `MPN-S3-BL1-DRAFT.md`, 14 September 2026. The fourteen coordinates, the three flagged rows, and the search behind the negative claim.

[6] `MPN-S3-BL2-DRAFT.md`, 14 September 2026. Option A, the remap, and its two costs.

[7] `05_DATA/03_generators/s7_blocking_numbers.py` and `BLOCKING-NUMBERS-OUTPUT.txt`.

[8] `MPN-S3-AMENDMENTS.md`, 13 September 2026. Register and audit amendments arising from S3; unaltered by this note.
