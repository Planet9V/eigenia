| Field | Value |
|:---|:---|
| Designation | REVIEW-DESIGN-R7-skeptic |
| Document under review | MPN-DESIGN-01, `DESIGN-UNIFIED-FRAMEWORK.md`, revision 7 |
| Role | Skeptic. Not the author, not a copy editor, not a regulatory reviewer |
| Date | 14 September 2026 |
| Scope of attack | Sections 4.4, 5a, 5b, 6.2, 7.4, 7.6; decisions D45 to D56; rejection R4. Pre-revision-6 material raised only where a new section contradicts it |
| Read in full | `DESIGN-UNIFIED-FRAMEWORK.md`; `S3-mapping-phi.md` sections 2.1 to 2.6 and section 4 [3]; `ASSERTIONS-REGISTER.md` entry B4; `S4-application.md` sections 3.1 to 3.5 and 4 [4]; `gen6/sections/*.md`; `REVIEW-DESIGN-skeptic.md` finding 18 [8] |
| Generators run | `s6_bias_layer.py` [9], reproduces in full. `s6_timbre_capacity.py` [10], reproduces in full, plus four independent re-seeded searches. `s6_three_clef.py` [11], **reproduces in full** |
| Correction to the review brief | The brief instructed that `s6_three_clef.py` be treated as unverified because the score CSVs are absent from this container. They are present, at `/mnt/user-data/uploads/eigenia/papers-pre-publish/MPN/05_DATA/01_scores/`. The script was run against them with `MPN_SCORES` set and every figure in section 6.2 reproduces to the printed precision. Nothing in this review is marked unreproduced |
| Independent computation | Re-seeded timbre searches, a 1,200-restart search at N = 5, 6 and 7, an exhaustive search over the sixteen DISC-cube corners, per-speaker and Lear-excluded recomputation of the event-density table, a within-speaker monotonicity test on the dynamic marking, and a value-frequency census of `TRAUMA_R` and `ENTROPY_H` [12] |
| Findings | 20, of which 11 BLOCKING |
| Disposition | **STOP** |

## Preamble on method

Every quantitative claim below was reproduced or refuted by running the cited generator, not by reading the prose beside it. Where I searched, I searched for the values a claim is about rather than for the names of the functions that might produce them. Where a negative claim appears, I name the class the enumeration behind it covered. Two of the three claims the brief nominated survive partially and one does not survive at all; the document's largest problem is none of the three, and it is finding 5.

## 1. The bias layer falsifies B4 in section 5a and then spends B4 as a budget in section 6.2. BLOCKING

Attacks section 5a.3, section 6.2, D45 and D53.

Assertion B4 in the register does not merely put two to three independent quantities on a stave. Its claim, in full, is that profile, state and bias are simultaneously legible **because** they occupy channels that do not compete, and it says where bias goes: "bias, which lives between speakers, takes the harmonic relation between staves rather than any channel on a single stave." Its formal content adds that "the bias channel is a between-stave quantity and therefore does not consume a within-stave channel." S3 section 4.4 relies on exactly this when it exempts the layer from its identifiability count, "because the layer is carried between staves rather than on one, per B4 in the register" [3]. B4's own falsification clause names this failure by name: "the between-stave channel turns out to be a within-stave channel in disguise, in which case the budget is exceeded after all."

Section 5a.3 puts the bias layer on eight within-stave channels of a single voice: texture, harmony, melody, rhythm, dynamics, timbre, mode and intervals. All eight are channels of one character's own stave. The layer is therefore the within-stave channel in disguise that B4 names, and revision 7 falsifies B4 in section 5a.

Section 6.2 then quotes B4 as a live budget, derives six to nine quantities across three staves from it, and makes D53 binding on that arithmetic. The document cannot both break an assertion and spend it. Worse, the two sections disagree about where the layer physically is: section 6.2 states that the third stave "is where the tension and the bias layer land, because both are properties of the exchange rather than of either speaker," which is B4's position and is incompatible with section 5a.3's table. The engine diagram sides with 5a.3, its accessible description reading "the bias layer modulates the parameters Phi has already set."

The consequence is not cosmetic. If section 6.2 is right, the layer never contends with Φ, and section 5a.3, section 5a.4, D45's modulation rule, D47 and D48 are the answer to a problem that does not exist. If section 5a.3 is right, B4 is falsified, the eighteen-against-six-to-nine arithmetic omits every bias quantity, and D53 is computed on the wrong total. The design must choose, and either choice deletes a section.

## 2. The perturbation budget sets the joint bound at exactly the value the same paragraph defines as assignment. BLOCKING

Attacks section 5a.4 and D48. This is the brief's first nominated claim and it does not survive.

Section 5a.4's stated principle is that "a perturbation wider than a band moves the marking by itself, which is assignment wearing a hat." Four sentences later it fixes the budget by the rule that the three dynamics biases "if all three fire at once and together may move the marking by at most one step." Moving the marking by one step is moving the marking. The section permits, as its budget, precisely the outcome it has just defined as assignment.

The arithmetic reproduces: `s6_bias_layer.py` prints a narrowest band of 0.10 in trauma, three biases, a per-bias budget of 0.0333, and 3.6 MIDI velocity units on the law v = 20 + 107τ [9], [12]. The arithmetic is not the problem. The problem is that S3 section 2.1 states in terms that **the output of Φ is the marking, not the velocity**, that the parameter is piecewise constant, and that "nothing about it is continuous and nothing should be claimed to be" [3]. On a piecewise-constant output there is no perturbation magnitude greater than zero that cannot move the marking. A sub-band perturbation is not a small effect; it is a full-step assignment that fires some of the time. S3 computes the rate in the same subsection: for a character at a uniformly random point inside a band, a step of 0.05 in trauma moves the marking one time in two at the extremes and one in three in the middle, and in the topmost band it cannot move it at all [3]. A 0.0333 step in a 0.10 band is therefore a one-in-three chance of a categorical change, and a certainty of nothing otherwise.

So the layer as specified is not a modulation of dynamics. It is a stochastic reassignment of the dynamic marking with probability near a third, plus a silent no-op, plus a dead zone at fff. The design's answer to the reviewer's question, whether modulation collapses the first time two biases and Φ want the same parameter in one bar, is that it collapses before the second bias arrives. It collapses on the first.

Section 5a.3 asserts that the collapse is confined to one channel, "on a categorical channel, mode above all." That is false by S3's own text. Dynamics is piecewise constant on eight markings; metre is a four-condition lookup; tempo is rounded to an integer beat count; fragmentation and density are five-stage ladders declared in advance; harmony is 24 discrete triads under a Cayley metric; the instrument family is categorical by construction [3]. Every channel the layer writes to is categorical in output. BL-2 is one entry of thirty only because the design counted the categorical channels as one.

## 3. The budget is denominated in trauma, so a dynamics bias can flip the mode, and D47 does not close the hole it was written for. BLOCKING

Attacks section 5a.3, section 5a.4, D47 and D48.

Section 5a.4 states the budget "in trauma," 0.0333, and converts it to velocity through Φ's own law. That places the perturbation on the state coordinate upstream of Φ, not on the rendered parameter downstream of it. Trauma is not a private input to the dynamics channel. Density is 0.3H + 0.7τ and fragmentation is max(0, 0.7H - 0.3τ)/0.7, so a trauma perturbation moves the texture ladders as well [3]. More sharply, S3 section 2.3 establishes that the jump set of the mode parameter under modal interpolation is "the single surface τ = 0.6 and nothing on the simplex," because A4's second stage switches the candidate mode table at that value of trauma [3].

A character whose trauma sits within 0.0333 of 0.6 therefore has the mode flipped by a dynamics bias. D47 strikes CB-017 because an entry that sets the mode overwrites A4; the budget mechanism reintroduces the identical overwrite through the trauma coordinate, for every bias on every trauma-riding channel, and section 5a nowhere notices. On the live table that switch moves a degree by a full semitone [3]. The listening-study contamination D47 exists to prevent is therefore not prevented.

The alternative reading, that the perturbation applies downstream at the renderer, is what the engine diagram shows, the arrow running from Layer 3 to the shared renderers and not to Φ. Under that reading the budget in trauma has no referent at all, and section 5a.4's only two computed numbers are meaningless. The design owes one reading or the other and currently asserts both.

## 4. The Layer 3 marking discipline and the modulation rendering are mutually exclusive. BLOCKING

Attacks section 4.4, section 5a and D45.

Section 4.4 states the whole of Layer 3's discipline: a model's judgement "is marked as a proposal wherever it appears, it never renders without the Layer 0 material that prompted it, and it is never the only thing on screen," and grounds that rule in S4's finding that a keyword counter's output was read as a measurement through three revisions of a paper [4].

A modulation cannot satisfy any of the three. A shift of 3.6 velocity units inside a rendered note carries no mark, is inseparable by construction from the value Φ computed, and has no Layer 0 material attached to it, because the artefact it modifies is a note and not a screen element. On the Live surface it is a sound. The design has taken the one layer whose entire discipline is visible attribution and given it a rendering mechanism that is unattributable by design. If the bias contribution were separable enough to mark, it would be a second writer with its own channel, which is assignment; if it is inseparable enough to be a modulation, it is unmarked, which violates 4.4.

This is the same failure S4 recorded, in a new place: an inference rendered indistinguishably from a measurement. Section 4.4 cites that finding and section 5a reproduces it.

## 5. Every figure in section 6.2 is computed on the artefact S4 forbids citing this way, and S4 forbids it in these words. BLOCKING

Attacks section 6.2, reference [11], D53, D54, LS-1, LS-2 and R4. This is the document's largest problem.

`s6_three_clef.py` runs over the seven CSVs under `05_DATA/01_scores/` and asserts a total of 31,078 rows [11], [12]. S4 section 3.5 rules on that figure directly: "The figure 31,078 is right as a row count and wrong as a description... It is not a number of dramatic beats, the files are not seven plays, and no paper in this series should cite it as either. Where a later section needs to refer to the artefact it is called the seven score files or the 31,078 rows, and the word beat is reserved for the engine's own column name" [4]. The design's status block, section 6.2 and reference [11] all call them beats, three times, and the script's own header calls them "seven scored plays, 31,078 beats."

The substance is worse than the nomenclature. S4 section 3.2 establishes that three of the seven files are anthologies: the Cherry Orchard file is the Chekhov *Second Series* and holds eight plays, the Miss Julie file is the Strindberg *Second Series* and holds five, and the Oedipus file is the whole Theban trilogy [4]. Section 6.2's coverage table presents six rows as six works and concludes that "two staves render between 8 and 69 per cent of a work, and on four of the six less than half." Recomputed with S4's finding applied [12], the three genuine single plays give top-two coverage of 69.2, 50.1 and 39.0 per cent. The range over works is 39 to 69 per cent, not 8 to 69, and one of three falls below half, not four of six. The 8.2 per cent that anchors the headline is the top-two share of an eight-play anthology with eight disjoint casts, and the 82 speakers beside it are eight casts counted as one. LS-2's argument, that the third clef "is not an elegance, it is the only place the other half of the material can go," is carried almost entirely by that artefact.

The event-density table has a second contamination. The aggregate includes all 3,425 rows of the King Lear file, which S4 section 3.3 and the design's own section 4.1 both record as a total parse failure, 3,424 rows assigned to the non-speaker `STAGE` [4]. Excluding it moves the tempo figure from 32.2 to 33.9 per cent and the metre figure from 25.7 to 26.6 [12]. The magnitude is small; the principle is not. Section 4.1 mandates that the product refuse to render below a parse-confidence threshold, and section 8 mandates that non-dialogue spans be marked and excluded, "which S4's Gutenberg licence finding makes non-optional." Section 6.2 then measures its legibility budgets on a file the product would refuse and on several hundred rows of Project Gutenberg licence that S4 found the engine scoring as a catastrophe, trauma rising to 0.80 over 268 and 269 consecutive rows [4]. The script's `assert TOTAL == 31078` makes this mandatory rather than accidental: applying the design's own exclusion rule would fail the script. Reference [11] presents that assertion as a reproducibility guard. It is a guard that enforces the contamination.

Third, S4 section 2 establishes that these columns were produced by `mpn_engine`, a program that "implements no psychology at all" on the path that produced the scores, computing trauma as a row-position ramp plus keyword hits and entropy as a punctuation tally, and that shares no code with the Conductor the theory papers describe. S4 states the consequence in a sentence written for exactly this case: "A reader who takes the 31,078 rows as evidence about the mapping S3 specifies is taking the output of one implementation as evidence about another, and the two do not agree about what music is a function of" [4]. Section 6.2 applies S3's normative laws to those columns, and the script says so explicitly in its own comment.

Finally, section 6.1 forbids this move in its own words. It withdraws the corpus-generator claim because "a corpus of Studio outputs is a corpus of system outputs, and S1's governing sentence would apply to it verbatim" [1]. The 31,078 rows are system outputs. Section 6.2 measures three budgets on them and converts two into binding decisions in the next page.

## 6. The mechanism section 6.2 offers for its own headline figure is refuted by the corpus that figure comes from. BLOCKING

Attacks section 6.2 and D54.

Section 6.2 explains the 4.5 per cent dynamics figure thus: "S3 establishes that dynamics is a function of trauma alone and that trauma ratchets, so the marking cannot fall across an act."

Tested on the same rows [12], restricted to within-speaker consecutive beats and excluding the Lear file, the dynamic marking falls on 597 of 27,416 transitions, 2.18 per cent, against 827 rises. Raw `TRAUMA_R` decreases on 822 of the same 27,416 steps, 3.00 per cent. Of the beats on which the marking changes at all, roughly two in five are falls. The marking demonstrably does fall, repeatedly, in the corpus offered as evidence for the claim that it cannot.

The explanation is not merely unsupported, it is unsupportable from this artefact, because the column is not the theory's trauma. S4 records that `TRAUMA_R` is 0.8 times the row index over the file total plus a weighted keyword count, and S1 reports it correlating with beat position at 0.995 to 0.999 in every file [1], [4]. The ratchet is a property of S1's definition of trauma. This column is a ramp with keyword bumps, and the bumps are what make it fall. The design asserts a theoretical mechanism for a number produced by a program that does not implement the theory.

## 7. "Exactly synchronous" describes precomputation, which is a different product, and section 7.4 requires the case section 6.2 excludes. BLOCKING

Attacks section 6.2, D52, D13 as narrowed, and section 7.4. This is the brief's third nominated claim and it does not survive.

Section 6.2's argument is that generated material "is known in full before a single note is rendered," so "the score is computed ahead and played against the dialogue, which is what a film score is." That sentence is the refutation of the claim it is offered to support. A film score is not a caption. The author's framing, quoted verbatim two paragraphs earlier, is "like we do for close captioning but the music score is there instead of words." A caption is produced from material the reader has not yet received and the captioner has not yet finished receiving. A precomputed score played against a known recording is a synchronisation problem, and synchronising a known artefact to a known timeline is trivially solvable and was never what was withdrawn.

The design has therefore not restored the author's framing. It has substituted an easier product and kept the word. Two concrete consequences follow. First, section 7.1 establishes that Ψ is history-dependent with a declared window; under whole-work precomputation there is no principled bar on a measure shown at turn ten being a function of turn five hundred, and the design states no rule confining the precomputation window to the causal past. Second, D13 as narrowed by D52 now permits the surface to be described as captioning on classes A and B, which licenses calling a film score a caption on the very surface whose honesty rules are the document's stated pride.

The contradiction with section 7.4 is flat. Participant mode is defined as "the same three-clef surface of section 6.2, rendered **while the exchange is running**." Material that is running is not material known in full before the first note. Participant mode is therefore the one consumer of the three-clef score for which the synchrony argument of section 6.2 cannot hold, and section 7.4 cites section 6.2 as its basis.

## 8. PM-1, the observer-effect experiment, returns zero by construction. BLOCKING

Attacks section 7.4 and D55.

Section 7.4 calls this "the most interesting thing the restoration makes possible": "run the same generated dialogue through the same engine with and without the display in the loop, and the difference is the effect with everything else held fixed."

An observer effect is a change in the behaviour of participants who can see the display. Generated dialogue is a fixed artefact. Nothing in the loop reads the display and then speaks differently, because the thing that speaks is a text file that was written before the display existed. Running it twice with and without the display returns bit-identical output, and the measured effect is exactly zero for reasons that have nothing to do with whether an observer effect exists. The design's own justification for the experiment, "no real conversation can be run twice," identifies the property that makes the experiment impossible rather than the one that makes it possible: reproducibility is precisely the absence of the participants whose behaviour is under study.

The experiment becomes available only if the participants are people improvising in front of the display, which is the case the scope ruling excludes and which section 7.4's opening sentence says has fallen away. D55's headline claim is not unvalidated. It is incoherent under the ruling that produced it.

## 9. Section 7.6 schedules the capture of people under a ruling that says nobody is captured. BLOCKING

Attacks section 7.6, D56 and section 10a item 6a.

Section 0 states that "no human subjects, no personal data, no recording of real conversations" is the scope, and section 7.6 repeats it: "the material is synthetic, nobody is recorded." In the same section, class B is defined as "a microphone per speaker" and named "the first class on which the full measure set is trustworthy live," class C as "a single room microphone through a diarising speech API," and item 6a of the implementation order schedules class B for build.

A microphone per speaker records speakers. If the speakers are synthetic there is no microphone, no diarisation step and no ingest class B or C, because those classes are defined by the properties of audio capture. The document therefore schedules a build item that its own scope ruling says cannot exist, and it removes the entire apparatus that applies to that item on the ground that the item does not exist. Section 4.1 carries the hedge that classes B and C are "future work, if real audio is ever used"; section 7.6, D56 and item 6a do not, and they are the sections an implementer will read when building 6a. At minimum the design owes an explicit sentence that the scope ruling ceases to cover the programme at item 6a. It currently reads as though the ruling travels with it.

## 10. "Six is the channel's capacity" is conditional on an unmeasured number, and the search that produced the curve is demonstrably below convergence at the stated restart count. BLOCKING

Attacks section 5b.3, section 5b.5, D50 and reference [10]. This is the brief's second nominated claim; it survives in substance and not in the form the document states it.

The convergence question first. `s6_timbre_capacity.py` optimises with 60 restarts of 1,500 steps at seed 20260913 + N [10]. Re-running the identical procedure at three other seeds and at 300 restarts of 3,000 steps [12] gives:

| N | paper, seed 20260913+N | seed 11111+N | seed 999983+N | 300 restarts |
|---:|---:|---:|---:|---:|
| 3 | 1.5126 | 1.5127 | 1.5126 | 1.5128 |
| 4 | 1.4231 | 1.4225 | 1.4226 | **1.4247** |
| 5 | 1.4142 | **1.4057** | 1.4142 | 1.4142 |
| 6 | 1.4142 | 1.4142 | 1.4142 | 1.4142 |
| 7 | 1.0123 | **0.9556** | **0.9590** | **1.0360** |

The N = 5 cell at seed 11111 returns 1.4057, which is **below** the N = 6 value. That is impossible for the true optimum: any optimal six-set contains a five-set, so the max-min curve is non-increasing in N by construction. The search returned a value the problem forbids, which proves that 60 restarts of 1,500 steps is below convergence at the sizes the design's table is built from. The published table is not a set of optima. It is a set of lower bounds whose tightness varies with the seed.

The substance nevertheless survives. A 1,200-restart search at 4,000 steps returns 1.414214 at both N = 5 and N = 6, attained at the six axis images, and an exhaustive search over the sixteen DISC-cube corners confirms 1.414214 at N = 4, 5 and 6 and exactly 1.0 at N = 7 and 8 [12]. So the flat at the square root of two from five to six is real, and the six far vertices are the optimal six. Two printed figures are not: the N = 4 entry rises from 1.4231 to at least 1.4247 under more restarts, so the curve is not flat from four, and the N = 7 entry spans 0.9556 to 1.0360 across configurations, which moves the headline "28 per cent" drop between 26.7 and 32.4 per cent. D50 cites "falls 28 per cent at the seventh" as a settled figure. It is not one.

The larger objection is the word capacity. Section 5b.5 concedes that the perceptual resolution ε "is not ours to invent" and is unmeasured. The script's own inversion table then shows that six is the answer only for ε in (1.0123, 1.4142], a window of width 0.40 in a space of diameter 2. At ε = 1.0 the channel holds seven; at ε = 1.45 it holds three; at ε = 1.6 it holds two. So what was found is that the max-min separation curve has its only sharp kink between six and seven. That is a fact about packing in a rhombic dodecahedron. It is not a capacity, and it becomes one only if an unmeasured quantity happens to fall in a one-fifth-width window. The status block asserts that [10] "finds the timbre channel's capacity to be exactly six characters," and D50 states it as a decision. Both overstate what the script computed, and section 5b.5 contradicts them four paragraphs later.

The geometry itself I reproduced and it is sound: volume 2, diameter 2, fifteen distinct vertex images in a one-plus-eight-plus-six arrangement, fourteen vertices of a rhombic dodecahedron, mean fibre length 0.5, longest fibre 2 in the flat direction, and both of S3's worked pairs at an audible fraction of exactly zero [10], [12]. Sections 5b.1 and 5b.2 are the strongest new material in the document and I have no objection to them.

## 11. D51 deletes the categorical residue that S3's timbre space exists to carry, and the bias layer writes to the same channel with no budget. BLOCKING

Attacks section 5b.4, D51 and section 5a.3.

S3 section 2.6 defines the timbre space as T = F × [0,1]³, where F is a finite set of instrument families "carrying the specificities," and is explicit about why F is there: the scaling literature finds three shared dimensions **plus** instrument-specific specificities, "attributes of a particular instrument that lie on no shared dimension at all," and "the specificities matter for what follows, because they are categorical and are what an instrument-family label carries" [3].

D51 rekeys F to "the six canonical contrast directions," and section 5b.4 recommends this because the six families "agree with the continuous coordinates by construction." That agreement is the defect, not the fix. The six canonical contrast directions are ±h₁, ±h₂, ±h₃, which are the three continuous timbre axes with sign. A label that is a deterministic function of the three coordinates it labels carries no information those coordinates do not already carry. T ceases to be a product and becomes a three-dimensional space with a redundant tag, and the categorical residue that S3 put F there to hold is deleted. The argmax tie problem is real and section 5b.4 diagnoses it correctly; the remedy solves it by removing the channel.

Compounding this, section 5a.3 records that one bias writes to the timbre channel. `s6_bias_layer.py` identifies it as CB-012, Authority, at implementation strength 0.95 [9], [12], and section 5a.4 states that timbre is one of the six channels that "cannot be budgeted today" because S3 supplies no band widths for it. So sections 5a and 5b specify, without either acknowledging the other, an unbounded second writer on a channel whose entire capacity argument rests on a minimum separation of exactly 1.4142 with no headroom above the floor. D50's claim that "a six-character cast costs nothing a five-character cast does not already cost" holds only while Φ is the sole writer. A separate oddity travels with it: CB-012 Authority is one of Cialdini's six influence principles, which decision 8 ruled a different kind of object from a bias [3], so the sole contender for the timbre channel is not a cognitive bias at all.

## 12. The negative claim behind BL-1 reaches five JSON fields, not the reference implementation, and one of those fields is a magnitude the design overrides in silence

Attacks section 5a.2, section 5a.4, D46 and D48. Not blocking, but it is the kind of overreach this programme's method clause exists to catch.

Section 5a.2 states that "nothing in the corpus says what any of them is a function of." `s6_bias_layer.py` does not establish that. It never opens the reference implementation. It loads `s3_bias_reconciliation.json`, a projection produced by a different script that is not in this container, and then assigns `rides=None` to every inherited entry by construction, at the line that builds the record [9]. The fourteen-name-none result is therefore not a discovery; it is the shape of the loader, and it is warranted only as far as the five fields the JSON carries: `id`, `trait`, `category`, `element`, `strength`. S4 states this programme's own rule, that "every negative claim is warranted by an enumeration whose class is named" [4]. The class here is a JSON projection, and the design reports it as a fact about the implementation.

The fifth field matters on its own. Every one of the thirty implementation entries carries a `strength` in [0.75, 0.95], and the fourteen inherited ones run 0.80 to 0.95 [12]. The script never reads it. Section 5a.4 then constructs a uniform per-bias budget by dividing a band width by a bias count, which silently overrides a non-uniform magnitude that already exists in the record the devices were inherited from. Whether the implementation's strengths are worth anything is an authorial question; suppressing them while asserting that the corpus says nothing about these devices is not.

## 13. BL-3's conclusion is a function of BL-1's outcome, and D48 prints it as settled

Attacks section 5a.4, BL-3 and D48. Not blocking.

The rhythm result, 2.2 discrimination thresholds divided by three biases giving 0.73 per bias and therefore "below one," depends on the divisor. The three rhythm biases are CB-002, CB-027 and CB-008 [9], [12]. CB-008 is one of the fourteen inherited entries that names no state coordinate, so it has no firing rule at all and BL-1 may strike it. With two rhythm biases the per-bias budget is 1.10 thresholds, above one, and BL-3 evaporates. The same dependence runs through dynamics: CB-005 is inherited and coordinate-free, so the divisor of three that yields 0.0333 and 3.6 velocity units is provisional in exactly the same way.

The design does sequence BL-1 ahead in section 10a item 5. D48 nevertheless states "Dynamics gives 0.0333 in trauma per bias; the three rhythm biases together do not clear one discrimination threshold" as a finished result, and section 5a.4 calls the rhythm constraint "a constraint, not a tuning note." Both are functions of a decision nobody has made.

## 14. The collision the design keeps as a prediction has the same defect as the one it raises as BL-7

Attacks section 5a.5 and BL-4. Not blocking.

BL-7 is correct and well found: CB-025 and CB-029 both ride on entropy, S3's prose predicts a contradiction between them, and the table puts them on harmony and texture respectively, so the contradiction cannot arise [3], [9]. The section is right that this was invisible from the prose.

The same test applied to the collision the section keeps fails in the same way. Section 5a.5 keeps normalcy against the planning fallacy as "a prediction worth keeping," both off entropy and "in opposite directions." The devices are "metre held through a metric disturbance" and "phrase begun at a tempo it cannot finish in" [9]. Metre and tempo are two different parameters of the rhythm channel with two different jump sets, 0.3, 0.5, 0.6 and 0.8 for metre against 0.4 and 0.7 for tempo, which S3 section 2.2 records as not coinciding at any boundary [3]. So the character high in both does not sound self-contradictory; one voice holds a metre while another rushes a phrase, and these do not meet. Nor are they opposite directions on any axis. The collision signature groups them because the script's signature key is the channel name, and the channel name is coarser than the parameter. The design applied the parameter-level test to one pair and the channel-level test to the other.

## 15. One of the sixteen does not name a state coordinate either, and it rides on its own output

Attacks section 5a.2. Not blocking.

Section 5a.2 states that "each of the sixteen drafted mappings names the state coordinate its device rides on." CB-004, survivorship, rides on **fragmentation**, which is not a state coordinate but a Φ output, being max(0, 0.7H - 0.3τ)/0.7 [3], [12]. S3 section 4.2 says so in its own words: "Survivorship is the only mapping that rides on fragmentation rather than on a state coordinate." The correct count is fifteen of sixteen. Since CB-004's channel is texture, which is the channel Φ renders fragmentation on, the entry is a modulation of a parameter as a function of that same parameter, which is the one structural case the section's discipline sentence does not cover.

## 16. Layer 1 has five tabulated measures and six counted ones, and the sixth is one eighteenth of D53's budget

Attacks section 4.2, section 6.2 and D53. Not blocking.

Section 4.2 opens with "Four of the six require a decision," tabulates five rows, and closes with "those five settings." Section 6.3 says "five of the six Layer 1 measures," section 7.2 says "Four of six measures are unavailable," and section 6.2's information budget counts six Ψ quantities, listing backchannel as the sixth. Backchannel appears in section 4.2 only as a sub-decision of the overlap row, "whether backchannels count," and never as a measure in its own right. The document therefore counts a measure it has not defined, and that measure is one of the eighteen quantities D53's arithmetic turns on. Either backchannel is a sixth measure and section 4.2's table is one row short, or it is a parameter of overlap and the budget total is seventeen.

## 17. The eighteen counts rendered parameters, which is the conflation S3 refused to make when it declined to discharge B4

Attacks section 6.2 and D53. Not blocking.

B4 counts "independent state channels per stave." Section 6.2 counts six per voice: mode, dynamics, tempo, metre, texture and timbre. Those six are not six independent quantities. Dynamics is a function of trauma alone; tempo and metre are both functions of entropy alone and S3 gives their laws from the same scalar [3]. Three of the six rendered parameters therefore carry two independent quantities between them. S3 section 2.6 refuses to discharge B4 for precisely this reason, warning that B4 "counts independent state quantities carried by a stave" while the timbre literature "counts perceptual dimensions within the timbre channel," and that "the agreement between two to three and three is a coincidence of numbers" [3]. Section 6.2 makes the parallel conflation and states the result as arithmetic that "is not close."

The oversubscription conclusion probably survives a correct count. The figure eighteen does not, and D53 is built on the figure.

## 18. R4's corroboration reaches seven Gutenberg files, none of which is a moderated panel, and quotes a range at its maximum

Attacks R4 and D10. Not blocking.

R4 is right on history: `REVIEW-DESIGN-skeptic.md` finding 18 reads "The active-dyad reduction selects the moderator and discards the interesting edges," so D10 was argued on dominance and not on churn [8], and the rejection is correctly reasoned. What it may not say is "which the corpus confirms."

The dominance figure runs from 10.2 to 87.0 per cent across the six files with a speaker set [11], [12], and R4 quotes only "up to 87 per cent." The 87.0 is A Doll's House, whose busiest speaker holds 45.2 per cent of the lines; the 10.2 is the Cherry Orchard file, where eight plays with disjoint casts guarantee that no speaker appears in many pairs. Neither is a moderated exchange, and no moderated panel appears anywhere in the corpus. The measurement therefore confirms that a dominant speaker in a play sits in most adjacent pairs, which nobody disputed, and says nothing about the moderator case D10 is about. The churn range 8.8 to 44.1 has the same problem at its top end: 44.1 is the eight-play anthology, where the pair changes whenever the corpus changes play.

## 19. D54 damps a channel that is a constant with spikes, and the damping deletes the spikes

Attacks section 6.2, LS-1 and D54. Not blocking, but it changes what D54 should say.

`ENTROPY_H` takes fourteen distinct values across the 31,078 rows and equals exactly 0.3 on 22,611 of them, 72.8 per cent [12], which is the entropy floor S1 records [1]. Of the 10,020 tempo-band changes that give the 32.2 per cent figure, 9,482, or 94.6 per cent, have 0.3 on one side; of the 7,988 metre changes, 73.0 per cent do. So the channel is not churning in any musical sense. It sits at its floor for three quarters of the corpus and makes brief excursions away and back, and the change rate measures the excursion count.

Two consequences for D54. A damping constant applied to a signal that is constant most of the time and spikes occasionally removes the spikes, which are the entire content of the channel, so the decision as written may delete what it is meant to make readable. And the metre channel reaches four of its five labels but never reaches m1, common time, in any of the 31,078 rows, because no row carries entropy below 0.3. Section 6.2 offers "reaches four" as evidence of a channel with range; the four exclude the ordered end of the scale entirely.

A smaller error travels with this paragraph. Section 6.2 says entropy "crosses three tempo cuts and four metre cuts." Tempo has two cuts, at 0.4 and 0.7, giving three bands [3].

## 20. D49 and D50 disagree about whether a DISC profile is a judgement or a slot

Attacks section 4.4, section 5b.3, D49 and D50. Not blocking, but the design owes one sentence.

D49 holds that the DISC profile is Layer 2 "because it is assigned rather than inferred," and section 4.4 calls it "a human's judgement recorded as such." D50 then makes the six canonical profiles "the canonical assignment table" and section 5b.3 adds that "any five-character cast should use five of the six rather than a set invented for the occasion." Every one of the six has two coordinates at 1.0 and two at 0.0 [10], [12]. If the table is binding, a writer cannot express a moderately dominant character, the profile stops describing anyone and becomes an index of which of six timbres the character is allocated, and the Layer 2 framing of D49 is void. If the table is advisory, then section 5b.2's free-assignment rule is the operative one, the capacity result has no force over any cast anyone actually writes, and D50 should say so.

Section 4.3 defines Layer 2 as a judgement that "can be tested for inter-rater agreement." A stipulated profile for a fictional character cannot be: the writer's stipulation is the ground truth, so there is nothing to agree with. Calling assignment Layer 2 imports a property it does not have, and the output mark D26 requires, "this renders a state a person rated," becomes true and empty. The design also does not say what happens when a Layer 2 assigned profile and a Layer 3 proposed trait exist for the same character on the same coordinate, which section 4.4 makes possible in the same paragraph by naming "high in dominance" as a Layer 3 proposal.

## Disposition

**STOP. 11 blocking findings.**

The blocking findings are 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 and 11.

The document is not one revision from implementable. Three of the six restored capabilities have a load-bearing defect at the level of their central mechanism rather than at the level of their numbers. The bias layer specifies a modulation that its own channel arithmetic makes impossible, that its own layer discipline makes unmarkable, and that falsifies the assertion the neighbouring section spends as a budget. The three-clef score restores the author's framing by substituting a different product for it, and measures every one of its three legibility budgets on an artefact that a completed paper in this same series forbids citing this way, in words written for this exact use. Participant mode's headline justification returns zero by construction.

What should survive intact and should not be reopened: sections 5b.1 and 5b.2, which I reproduced and which are correct and useful; the six-vertex optimal assignment at N = 6, which survives an exhaustive corner search and a 1,200-restart continuous search; BL-7, which is a genuine finding that reading could not have produced; the dyad-churn measurement, which is sound as a measurement even though R4 overstates what it confirms; and the diagnosis in section 5b.4 of the argmax tie, which is right even though D51's remedy is not.

The single most useful next step is not a revision of section 5a. It is to decide whether the bias layer is a within-stave modulation or a between-stave quantity, because B4, S3 section 4.4, section 5a.3, section 6.2 and the engine diagram currently give two incompatible answers, and roughly half the new material follows from whichever answer is chosen.

## References

[1] J. McKenney, "The McKenney-Lacan psychometric calculus," MPN-S1, revision 3; assertion B4 as recorded in `ASSERTIONS-REGISTER.md`.

[2] J. McKenney, "The formal apparatus," MPN-S2, revision 4.

[3] J. McKenney, "The mapping," MPN-S3, `S3-mapping-phi.md`, revision 9. Sections 2.1 to 2.6 and section 4.

[4] J. McKenney, "The application," MPN-S4, `S4-application.md`, revision 2. Sections 2, 3.1 to 3.5 and 4.

[5] "The instrument," MPN-PRD-01, draft 6.

[8] `REVIEW-DESIGN-skeptic.md`, finding 18.

[9] `gen6/s6_bias_layer.py`, run 14 September 2026 against `s3_bias_reconciliation.json`. Reproduces in full.

[10] `gen6/s6_timbre_capacity.py`, run 14 September 2026. Reproduces in full.

[11] `gen6/s6_three_clef.py`, run 14 September 2026 with `MPN_SCORES` set to `/mnt/user-data/uploads/eigenia/papers-pre-publish/MPN/05_DATA/01_scores`. Reproduces in full.

[12] This review's own computations, 14 September 2026: re-seeded and extended timbre searches, an exhaustive search over the sixteen DISC-cube corners, a per-speaker and Lear-excluded recomputation of the event-density table, a within-speaker monotonicity test on the dynamic marking and on raw `TRAUMA_R`, a value-frequency census of `TRAUMA_R` and `ENTROPY_H`, a single-play against anthology split of the coverage table, and a field census of `s3_bias_reconciliation.json`.
