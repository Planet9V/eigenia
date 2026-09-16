| Field | Value |
|:---|:---|
| Designation | MPN-NOTE-06 |
| Subject | What it costs to put several personas on one score, and what it costs to add one to a score that already has some |
| Date | 15 September 2026 |
| Written because | The author's decisions of 15 September 2026 permit a named per-person comparison on a stave and state that a score will carry several personas, added and removed as needed. No document in this programme had asked what that costs |
| Method | Computed, not estimated. `05_DATA/03_generators/s9_persona_scaling.py`, exit 0, output at `S9-PERSONA-SCALING-OUTPUT.txt`. Section 3 calls `s6_timbre_capacity.py`'s own optimiser rather than reimplementing it, so the timbre figures are that script's figures |
| Standing caveat | Not one listener has been asked anything. Every legibility claim below is arithmetic about a budget nobody has measured, and the budget itself is assertion B4's estimate |

## 1. The three decisions this note answers to

**Decision one, B4 amended.** The between-stave clause is struck. B4 is a per-stave channel capacity claim alone, two to three independent quantities per stave, and nothing in it is exempt from that budget. Applied in `ASSERTIONS-REGISTER.md` and in MPN-S1 section 9.3.

**Decision two, a named per-person comparison is permitted on a stave.** A persona may be an actor, a character in a play, a speaker in a podcast, a voice in a book, or any persona a score carries. A score carries several, and personas are added and removed as the material requires.

**Decision three, backchannel is a sixth Layer 1 measure.** D64 reserved the naming of a sixth to the author and the author has named it. Layer 1 now has six measures and five settings.

## 2. The stave budget does not get worse as the cast grows

A score of $N$ personas has $N$ state staves and one interaction stave. Each state stave wants six moving quantities, being mode, dynamics, tempo, metre, texture and timbre. Under decision two each of the six Layer 1 measures is nameable per person, so the interaction stave wants six per persona rather than six in total.

| $N$ | staves | $\Phi$ wants | $\Psi$ wants | total | budget | over by |
|---:|---:|---:|---:|---:|:---|:---|
| 2 | 3 | 12 | 12 | 24 | 6 to 9 | 2.7x to 4.0x |
| 3 | 4 | 18 | 18 | 36 | 8 to 12 | 3.0x to 4.5x |
| 4 | 5 | 24 | 24 | 48 | 10 to 15 | 3.2x to 4.8x |
| 5 | 6 | 30 | 30 | 60 | 12 to 18 | 3.3x to 5.0x |
| 6 | 7 | 36 | 36 | 72 | 14 to 21 | 3.4x to 5.1x |
| 7 | 8 | 42 | 42 | 84 | 16 to 24 | 3.5x to 5.2x |
| 8 | 9 | 48 | 48 | 96 | 18 to 27 | 3.6x to 5.3x |
| 10 | 11 | 60 | 60 | 120 | 22 to 33 | 3.6x to 5.5x |
| 12 | 13 | 72 | 72 | 144 | 26 to 39 | 3.7x to 5.5x |
| 14 | 15 | 84 | 84 | 168 | 30 to 45 | 3.7x to 5.6x |

**The finding is the shape of the last column and not its size.** The oversubscription runs from 2.7x at two personas to 3.7x at fourteen, against the generous end of the budget. It rises and then flattens. It does not diverge.

So **scaling the cast does not make the per-stave legibility problem worse. It makes it wider.** The problem at fourteen personas is the problem at two, fourteen times over, and a surface that has solved it at two has solved it at fourteen. That is the useful half of this note, because it means the author's requirement does not introduce a new legibility problem; it multiplies an existing one that both use-case papers already record.

The oversubscription itself is not new and is not a consequence of any decision of 15 September. MPN-S5 records it for the live surface and MPN-S6 for Expression, and D53's rule that a surface must choose is the design's answer to it. What decision two changes is that the interaction stave's want now scales with $N$ rather than being fixed at six, which is why the ratio rises at all.

## 3. The relation is what scales badly

D10 makes the reduction to an active dyad a user act and supplies no ordering over the pairs. The number of pairs the user chooses among is $N(N-1)/2$.

| $N$ | pairs | pairs through one moderator |
|---:|---:|---:|
| 2 | 1 | 1 |
| 4 | 6 | 3 |
| 6 | 15 | 5 |
| 8 | 28 | 7 |
| 10 | 45 | 9 |
| 12 | 66 | 11 |
| 14 | 91 | 13 |

Two personas give one pair and fourteen give ninety-one. This is the one place in the arithmetic where a bigger cast is categorically harder rather than proportionally harder, because the growth is quadratic while everything else in this note is linear or flat.

A moderated structure collapses it to $N-1$, which is linear. That is a reason to **record whether a score has a moderator** rather than treating every cast as a free graph, and it gives the panel use case a structural property worth declaring rather than discovering.

MPN-S5 item S5-16, the selection aid that gives the dyad reduction an informed form, was opened by the arbitration as a convenience. Under decision two it is load-bearing: at ninety-one pairs, a user act with no ordering is not a user act anybody performs.

## 4. Adding a persona without re-voicing anyone already on the page

The cast ceiling is not the stave budget. It is the timbre channel, whose capacity at a perceptual resolution $\epsilon$ is the largest $N$ whose best minimum separation is still at or above $\epsilon$.

**The question decision two forces, and which no document in this programme had asked, is the append-only question.** An optimal packing for $N+1$ personas is not in general an optimal packing for $N$ plus one more point. So re-packing can move the timbre of a persona already on the page, and that is a mid-score re-voicing, which is the same object D36 refuses as a mid-session relabel. A score that grows cannot use the re-packed curve.

The append-only curve is the honest one: seed with the optimal pair, then place each new persona at the point farthest from every persona already placed, and never move one.

| $N$ | append-only | re-packed | loss | DISC profile added |
|---:|---:|---:|:---|:---|
| 2 | 2.000000 | 2.000000 | 0.0 % | |
| 3 | 1.414214 | 1.512776 | 6.5 % | (0, 0, 1, 1) |
| 4 | 1.414214 | 1.424955 | 0.8 % | (0, 1, 1, 0) |
| 5 | 1.414214 | 1.414214 | 0.0 % | (1, 0, 0, 1) |
| 6 | 1.414214 | 1.414214 | 0.0 % | (1, 1, 0, 0) |
| 7 | 1.000000 | 1.089845 | 8.2 % | (0, 0, 0, 0) |
| 8 | 0.866025 | 1.000000 | 13.4 % | (0, 0, 0, 1) |
| 9 | 0.866025 | 0.976561 | 11.3 % | (0, 0, 1, 0) |
| 10 | 0.866025 | 0.927764 | 6.7 % | (0, 1, 0, 0) |
| 11 | 0.866025 | 0.898979 | 3.7 % | (0, 1, 1, 1) |
| 12 | 0.866025 | 0.898979 | 3.7 % | (1, 0, 0, 0) |
| 13 | 0.866025 | 0.866598 | 0.1 % | (1, 0, 1, 1) |
| 14 | 0.866025 | 0.866025 | 0.0 % | (1, 1, 0, 1) |
| **15** | **0.866025** | | | the last distinct corner image |
| **16** | **0.559017** | | **the cliff, 35.4 %** | the corner set is exhausted; the interior begins |

**The author's requirement is met, and the guarantee is cheap.** A score can grow one persona at a time, nobody already on the page ever changes voice, and the whole cost of that guarantee over the range from two personas to fourteen is at most **13.4 per cent** of separation, at $N = 8$. At $N = 2, 5, 6$ and $14$ it costs nothing at all.

Three things in that table are worth naming.

**The seventh persona is the flat profile.** Held against a fixed optimal six, the best available point is DISC $(0,0,0,0)$, the centre of the reachable set, at separation exactly 1.0. So the seventh voice in a six-voice score is the neutral one. That is a fact about the geometry and not a design choice, and it is the kind of fact that should be told to a user rather than discovered by one.

**Every other persona lands on a cube corner, and there are fifteen of them rather than sixteen.** Positions three through fifteen are all vertices of the DISC cube. **The sixteen DISC corners give only fifteen distinct timbre images**, because $(0,0,0,0)$ and $(1,1,1,1)$ map to the same point, the timbre origin: the map has nullity one and the null direction is overall profile magnitude, so the flat-low and flat-high profiles are the same voice. The interior is used once, for the seventh, which is the flat profile at the centre of the reachable set. Note that the flat profile is a corner in DISC and the centre in timbre; the two descriptions are of different spaces.

**Removal is free and does not repack.** Taking a persona off the page leaves the remaining set exactly where it was, so the separation of what remains can only improve. Removal has no cost in this channel at all, which means the asymmetry between adding and removing is real and worth stating: adding is bounded-cost, removing is free, and neither moves an existing voice.

## 5. The cast ceiling, and the one number that decides it

Read the append-only column against a candidate perceptual resolution and it gives the ceiling for a score that grows.

| $\epsilon$ | personas a growing score holds |
|:---|---:|
| $\sqrt{3}/2 \approx 0.866$ | **15** |
| $1.0$ | 7 |
| $\sqrt{2} \approx 1.414$ | 6 |
| $2.0$ | 2 |

Those four values are the plateaus of the curve, so the cast sizes worth designing for are **2, 6, 7 and 15**. Between the plateaus, growth is free. Across six to seven it costs 8.2 per cent and across seven to eight 13.4.

**And there is a cliff at sixteen that an earlier version of this note did not record.** The append-only separation holds at $\sqrt{3}/2 = 0.866025$ from eight through **fifteen**, and at sixteen it falls to **0.559017**, a drop of **35.4 per cent in one step**. That is nearly three times the 13.4 per cent this note calls its worst cost, and the cause is structural rather than numerical: the fifteen distinct corner images are exhausted exactly at $N = 15$, so the sixteenth persona has nowhere to go but the interior. **Fifteen is therefore a hard ceiling on distinguishable voices in a growing score, and it is the number a team-sized cast runs into.**

**$\epsilon$ has never been measured.** It is the discrimination experiment of design section 5b.5, it is TC-1, and until it is run the honest statement about cast size is a range from two to fourteen rather than a number. This note does not narrow it and no amount of arithmetic will: it is a question about ears.

That is the sharpest consequence of the author's requirement. "Several personas, added and removed as needed" is supported by the geometry and is bounded in cost, and **how many "several" is remains the one unmeasured number in the channel.** It was already the most valuable single measurement in the programme before this decision; it is now also the one that decides how large a score can be.

## 6. What this changes in the documents

| Item | Where | What |
|:---|:---|:---|
| **SC-1** | MPN-S5, MPN-S6 | State the append-only rule: a persona added to a score takes the farthest available point and no persona already on the page changes voice. Record the bounded cost, worst case 13.4 per cent at $N = 8$ |
| **SC-2** | MPN-S5 section 8, MPN-S6 section 11 | Declare whether a score has a moderator, because it collapses the pair count from $N(N-1)/2$ to $N-1$ |
| **SC-3** | MPN-S5 item S5-16 | Re-status from convenience to blocking. At ninety-one pairs a user act with no ordering is not performable |
| **SC-4** | Design section 5b, TC-1 | Restate the discrimination experiment as the measurement that fixes the cast ceiling, not only the audio renderer's voice count |
| **SC-5** | MPN-S6, EX-R1 | **CLOSED 15 September 2026.** The author restated EX-R1 for $N$ personas: one interaction stave per persona, no state staves. The one-stave reading was an artefact of the design's two-speaker reference layout rather than a consequence of D70. Applied in MPN-S6 sections 9, 10 and 11 and in design D70 |
| **SC-6** | Design, D36 and D53 | Adding or removing a persona mid-score is a speaker-set discontinuity. The append-only rule means it never re-voices anyone, so the seam marks an addition rather than a relabel, and D36's refusal does not bite |

SC-5 is the one that needs an answer. Everything else in this note is a sentence or a status change.

## 7. What the two follow-on decisions changed, 15 September 2026

**SC-5 is closed.** Expression is an $N$-persona surface: one interaction stave per persona, no state staves. The consequence for this note's arithmetic is that section 2's table, which counts $N$ state staves plus one interaction stave, describes MPN-S5's surfaces and not Expression. Expression's own shape is $N$ interaction staves and no state staves, so its budget is $2N$ to $3N$ against a want of six per stave, which is a flat 2x to 3x oversubscription independent of $N$ and is the same shape section 2 finds elsewhere.

**And it reversed a finding in MPN-S6.** Falsifier one held that at two speakers the surface has almost nothing. That was true of one interaction stave carrying the relation and false of per-persona staves: at two personas, with overlap and backchannel withheld under EX-R3 and degree and reciprocity constant, each persona's stave carries **floor share and latency**, which is two quantities inside a budget of two to three and fits exactly. The arbitration's decision 9.4 is thereby settled at two personas and remains open above two.

**SC-7 now has a rule.** The author ruled that a backchannel is **lexical on class A** and **timing-derived on classes B and C**, so the sixty-five derived counts can be re-derived rather than guessed. On class A the available set goes from three of six to four of six.

That rule adds a count of its own. One measure with two definitions carries **two settings**, so Layer 1 is six measures and **six settings**, not five, and design section 6.1's class A header moves a second time. And a class A backchannel count and a class C one are not comparable, so the output has to declare which definition produced the number, exactly as D9 and D30 make the floor-share unit a declared setting shown on every output. That is MPN-S6 item EX-18.

**SC-7 restated.** Recount every derived Layer 1 count against **six measures and six settings**, using the per-class rule: class A lexical, classes B and C timing-derived. Sixty-five sites: 33 in MPN-S5, 12 in MPN-S6, 17 in the design, 3 in the PRD. Each re-derived rather than incremented. A global substitution would produce exactly the class of count error this programme keeps finding. Status: open.

**One thing to watch, and it belongs to the author rather than to this note.** The lexical definition puts a keyword counter on class A, which the scope ruling makes the primary material. MPN-S6 section 4 withholds the overlap-derived measures precisely because a backchannel lexicon is a keyword counter and S4 found one read as a measurement through three revisions of a paper. The paper that argues hardest against keyword counters is now the paper that has to carry one on its primary class.
