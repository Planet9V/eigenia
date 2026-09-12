# The McKenney assertions: a register for examination

Every item below is asserted by J. McKenney. None of the sources assert any of them. The sources supply vocabulary, formalism or craft precedent; the assertion is the application, and the application is McKenney's. This register exists so that the assertions can be examined one at a time, confirmed, amended or withdrawn, and so that each of the four papers can be improved against a settled statement of what it is defending.

Block A was drafted as eleven assertions. A structured review (Skeptic, Constraint Guardian, User Advocate, Arbiter) disposed of them on 2026-09-12; the disposition is recorded in `BLOCK-A-ARBITRATION.md` and is carried into each entry below under **Disposition**. Nine stand, two are withdrawn, one is amended on evidence and one is held pending a decision by the author. Identifiers are kept stable across the revision, so A9 and A10 are absent from the live set rather than renumbered.

Block B is the extension: the dialogue, bias and act layer. It was re-drafted on 2026-09-12 against the author's own core chapters after a Skeptic review found that no Block B entry carried formal content, a failure condition or a test. The re-drafted set is below.

For each: the claim, its formal content, what it would take to be wrong, and what the Hamlet and Antigone runs would say about it.

---

## Block A: the established assertions

### A1. The state is nine-dimensional, and these are the nine

**Claim.** A psychological state sufficient for musical representation is carried by trauma, entropy, the three registers, and the four DISC dimensions, each bounded to the unit interval.

**Formal content.** p = (τ, H, r, s, i, D, I, S, C) ∈ [0,1]⁹.

**How it could be wrong.** A component proves redundant, predicted by the others across a real corpus. Or a needed component is missing, so that two states the theory calls identical demand different music from a competent composer.

**What the play runs would say.** Annotate both plays, then test whether any component is predicted by the rest. If entropy is recoverable from trauma across four hundred frames, the state has eight components and not nine.


**Disposition.** HOLD, with a disclosure. The corpus gives an effective sample well below what the assertion needs, and five of the nine components are scene-global rather than per-character in the shipped path, so trauma is the only component that audibly moves. Not refuted; untested. S1 section 11 states which components are exercised.

### A2. The Lacanian registers admit magnitudes

**Claim.** Real, Symbolic and Imaginary can each be assigned a number for a given subject at a given moment.

**Formal content.** r, s, i ∈ [0,1], each defined per character per frame.

**How it could be wrong.** Competent readers cannot assign the magnitudes with any agreement. If three trained readers rating the same scene produce uncorrelated values, the quantity is not there to be measured.

**What the play runs would say.** Inter-rater reliability on annotated scenes is the direct test, and Hamlet is the best case available because Lacan's own reading gives a fourth rater whose ratings are already published in prose.


**Disposition.** HOLD as a hypothesis. Measurement-circular as currently instrumented: the keyword count runs over the author's own analytical prose, which contains the register names literally. Gated on the annotation protocol.

### A3. The registers are competitive, and the state lives on a simplex

**Claim.** Investment in one register is bought at the cost of the others; the three magnitudes sum to one.

**Formal content.** r + s + i = 1. The state occupies a two-simplex, not a cube.

**How it could be wrong.** Independent rating shows no negative coupling. A character can be strongly Imaginary and strongly Symbolic at once, in which case normalising to one destroys information rather than encoding a relation.

**What the play runs would say.** This is the sharpest single test in the programme and it is cheap. Rate the three registers independently, without the constraint, and look at the correlation matrix. Antigone is the interesting case, because a reading in which she is simultaneously at the limit of the Symbolic and wholly in the Real would break the constraint if the ratings bear it out.


**Disposition.** HOLD as a hypothesis. The simplex is imposed by the normalisation step rather than observed, so the present data cannot speak against it, and no downstream function depends on the constraint. The unconstrained correlation matrix is the cheapest decisive new-data test in the set.

### A4. The dominant register selects the mode, with trauma as the second switch

**Claim.** The largest of r, s, i selects a modal pair, and trauma above threshold selects the darker member: Real to Aeolian or Dorian, Symbolic to Mixolydian or Lydian, Imaginary to Locrian or Phrygian.

**Formal content.** mode = f(argmax(r,s,i), τ > θ), θ = 0.6 in the current parameterisation.

**How it could be wrong.** Listeners do not hear the assigned modes as carrying the assigned registers, in any careful framing of the question. The assignment then remains a private code, internally consistent and communicating nothing.

**What the play runs would say.** Less than a listener study would. This assertion is the one that most needs its own experiment, and it is the cheapest experiment in the series.


**Disposition (updated 2026-09-12).** Table one, the assignment A4 states, is WITHDRAWN. A blind synthetic rater panel matched it on none of the three registers while table three matched on all three; the panel's reasons were structural and transferred intact to a scale family with no name. The normative assignment pending listeners is the one the running code uses: Real to the modes without a stable fifth, Symbolic to the unaltered reference, Imaginary to the single raised degree. The panel failed its own calibration against published listener data and gave a confident unanimous answer to a decoy register, so it is not evidence about what listeners hear and is not cited as such. The claim that the trauma switch is implemented nowhere is also withdrawn; it is live on the transformation path. A listening pack for professional musicians is built and is the instrument that settles this. See `A4-SIMULATION-REPORT.md` and S1 section 8.3.

**Open, from the panel.** Under maximum extremity six of eight raters moved the Symbolic to the semitone above the tonic rather than to a dimmer partner of the reference scale, which fits none of the four tables and suggests the trauma switch may be an inversion rather than a dimming. The Imaginary's dark partner has no consensus and the theory should not name one yet.

### A5. Trauma and entropy are separable, and act on different musical parameters

**Claim.** Trauma is accumulated unresolved weight; entropy is the disorder of symbolic organisation; they vary independently, and trauma acts predominantly on force while entropy acts predominantly on coherence.

**Formal content.** Two free components; dynamics is a function of τ; fragmentation is a function weighted toward H.

**How it could be wrong.** They correlate so highly in practice that the distinction does no work, or raters cannot hold them apart.

**What the play runs would say.** Both plays contain characters who are heavily loaded and perfectly ordered, and characters who are scattered without great burden. If the annotation cannot separate those cases, the assertion is in trouble.


**Disposition.** HOLD. The Skeptic's objection lands against the stability scalar that recombines the two variables, not against the assertion. The most likely of the set to be confirmed, and the one a composer would actually use.

### A6. The transformation typology is a function, not a repertoire

**Claim.** Modal recolouring, fragmentation, orchestration growth and harmonic recontextualisation, as practised by Williams and Shore, are triggered by stated conditions on the state rather than selected by taste.

**Formal content.** Each transformation is a total deterministic function of p.

**How it could be wrong.** The functions produce transformations at moments a musician judges wrong, or fail to produce them at moments a musician judges obligatory, often enough that the function is not a description of the practice.

**What the play runs would say.** This is where the play runs earn their place. Compare where the system transforms the motif with where the drama turns, in two plays whose turns are among the most closely argued in the literature.


**Disposition.** RECLASSIFY. Implementation-falsified, theory untested: orchestration level, instrument assignment and harmonic context are computed and written to a console log, and the motif inversion negates a field nothing reads. The transformations must reach the score before the hypothesis can be tested.

### A7. Fragmentation has ordered levels, selected by a scalar

**Claim.** A motif degrades through named stages: full statement, truncation, core motif, interval residue, dissolution; and a single scalar formed from entropy and trauma selects the stage.

**Formal content (selector amended with A8, 2026-09-12).** The five stages are unchanged. The selector is now fragmentation = max(0, 0.7H - 0.3τ) / 0.7, with stages at even fifths. Superseded: score = 0.6H + 0.4τ with thresholds 0.25, 0.5, 0.75, 0.9.

**How it could be wrong.** The ordering is not monotone in perceived disintegration, or the weights are wrong, or the stages are not the right stages.

**What the play runs would say.** Antigone is the strongest case in the repertoire for a theme that should dissolve rather than end, and the final scenes are where the stage boundaries will be visible or not.


**Disposition.** KEEP the five levels, which are musically sensible and match the Shore practice they come from. The selector is amended with A8.

### A8. Orchestration density has ordered levels, selected by a differently weighted scalar

**Claim.** Density grows through solo, chamber, section, full orchestra, tutti, selected by a weighted combination of the same two variables with a different weighting from fragmentation.

**Formal content (amended, adopted 2026-09-12).** The theory fixes one direction and the other follows. Density keeps its weighting; fragmentation is the orthogonal complement of density in the (H, τ) plane, clipped at zero and scaled to the unit interval:

    density       = 0.3H + 0.7τ
    fragmentation = max(0, 0.7H - 0.3τ) / 0.7

with both stage ladders declared a priori at even fifths, 0.2, 0.4, 0.6 and 0.8, confirmed by the author 2026-09-12. Declared in advance rather than fitted, so the mapping stays local and does not move when the corpus changes. Superseded: fragmentation = 0.6H + 0.4τ and density = 0.7τ + 0.3H, which correlated at r = 0.9150 and retained 4.2 per cent of their joint variance on the second principal direction. The adopted pair correlates at r = 0.0571 and retains 41.2 per cent. See `COMMENSURABILITY-NOTE.md` and S1 section 8.2.

**How it could be wrong.** If the two scalars track each other closely enough in practice, then the theory has one intensity variable wearing two hats, and the different weightings are decoration.

**What the play runs would say.** Plot the two scalars across both plays. If they are nearly collinear, simplify the theory.


**Disposition.** AMENDED on evidence, and this is the one theory-fatal finding. Over the seven scored plays (31,078 beats) the two scalars correlate at r = 0.9191, PC1 carries 95.96 per cent of the joint variance, and 11 of 25 level pairs are realised. The value is reproduced to four decimal places from the two marginal standard deviations and their correlation alone, and the minimum over all possible values of that correlation is 0.841, so no corpus rescues the construction. **A5 succeeding forces A8 to fail as drafted.** The amendment requires genuinely different functional forms meeting a stated criterion: pooled r below 0.65, no play above 0.65, at least 18 of 25 level pairs. Two candidates meet it; the choice between them is the author's, by ear. See `A8-DECISION-MEMO.md` and S1 section 8.2.

### A9. Objet a is the divergence between internal model and observed state

**Claim.** The object-cause of desire, which Lacan gave no magnitude, is operationalised as the gap between what a subject expects and what a subject meets, and that gap carries affective charge.

**Formal content.** ObjA intensity = divergence(internal model, observed state).

**How it could be wrong.** Two ways, and they are different in kind. Formally, if the divergence quantity is computed but never reaches any musical parameter, it is inert and should be removed. Conceptually, if the operationalisation is rejected by readers who know the concept, the theory has taken a name it is not using in its own sense, which costs it credibility it does not need to spend.

**What the play runs would say.** Hamlet is the test case Lacan himself supplies, since his reading turns on a deferral that is precisely a gap between expectation and encounter.


**Disposition.** WITHDRAWN from the calculus. No internal model exists for an observation to diverge from, so the assertion's own failure condition is already met; the shipped formula is a different formula on different inputs and its sole caller is never called. *Objet a* is retained as a conceptual frame in the theory and removed from the state calculus.

### A10. The audience is a term in the model

**Claim.** Observation is not passive reception. An audience's attention modulates the observed subject's state, and the sensitivity to it varies by dominant register, higher for Imaginary-dominant subjects, lower for Real-dominant ones.

**Formal content.** modulated state = base state × (1 + k · observation weight), k varying with the register profile.

**How it could be wrong.** The coefficient is never exercised, or the direction of the register dependence does not hold.

**What the play runs would say.** Both plays are explicit about being watched, Hamlet stages a play within the play and Antigone argues before a chorus, so the term has natural values to take in each.


**Disposition.** WITHDRAWN to future work on live performance. No implementation, and the stated form multiplies the state by a factor above one, breaking A1's unit bound and A3's simplex. Nothing depends on it.

### A11. The whole composes: it is a calculus

**Claim.** The separate functions compose, so that a character's musical treatment at a moment is computed rather than chosen.

**Formal content.** Φ: P → M, total, deterministic, decomposable by parameter.

**How it could be wrong.** The parts are individually reasonable and the composition is not: cues assembled by composing the parameter functions are judged incoherent by musicians where the same parameter values assembled by a composer are not.

**What the play runs would say.** Everything, eventually. This is the assertion the entire system exists to demonstrate, and it is judged by listening.


**Disposition.** HOLD the composition claim as a design commitment. The determinism claim is false as implemented: ten unseeded random calls mean the same state does not produce the same score. This blocks every listening study in the programme and is one to two days of work. Until it is done, S1 states that determinism is specified and not realised.

---

## Block B: the dialogue, bias and act extension

Re-drafted 2026-09-12 against the author's own core chapters, in the same shape as Block A: claim, formal content, how it could be wrong, what would test it. The apparatus is taken from `01_THEORY/01_core/08_POLYPHONY_AND_DISSONANCE_IN_DIALOGUE.md`, `09_ADVERSARIAL_COUNTERPOINT_ATTACK_DEFEND.md` and `03_TOPOLOGY_OF_DIAD_AND_TRIAD.md`, and the bias classification from `01_THEORY/03_unified/16_Vol_15_Cognitive_Bias_Atlas.md`.

**The bias count is settled at thirty, in four domains.** The classification of record is the Cognitive Bias Atlas: CB-001 to CB-030 across Perception (the filter), Decision (the calculator), Social (the tribe) and Memory (the story). The other counts reachable in the corpus (twelve in the dissertation, thirty-six in the projector, five in the TypeScript calculus, "100+" in the score types) are subsets or implementation artefacts and are superseded.

**One defect is recorded here rather than left to a reviewer.** The reference implementation also carries thirty bias-to-music entries, and they are not the Atlas's thirty. Fourteen names appear in both. Fifteen traits appear only in the implementation, five of which are influence principles rather than biases (scarcity, social proof, reciprocity, commitment, liking), explained by the implementation's source being a social-engineering research note. Sixteen Atlas entries have no musical mapping at all, including groupthink, loss aversion, in-group bias and the planning fallacy. The implementation's thirty entries cover twenty-nine distinct traits because framing appears twice. This is the same class of defect as A4 and is repaired the same way: the Atlas is authoritative, the extra traits are reclassified or moved to a separate influence layer, and the sixteen unmapped entries are the S3 work queue.

### B1. Bias is a layer with magnitude, carried alongside state

**Claim.** Each of the thirty Atlas biases takes a magnitude for a speaker at a turn, and the bias vector is carried alongside the state vector rather than absorbed into it.

**Formal content.** b = (b_1 ... b_30) in [0,1]^30, defined per speaker per turn, distinct from p, and indexed to CB-001 through CB-030.

**Settled 2026-09-12.** The count is thirty, in both places the theory uses biases. The wider personality space therefore carries the same thirty and becomes forty-two dimensional rather than twenty-four; the earlier twelve-bias selection is withdrawn. S2 owes a restatement of the factor reduction against the larger space.

**How it could be wrong.** Raters cannot assign magnitudes with usable agreement, so the layer is not measurable. Or b is largely predicted by p across a corpus, in which case it is a projection of the first layer and not a second one.

**Test.** Annotate turns for bias magnitude; report reliability; regress b on p and report the residual. If the residual is small, B1 fails.

### B2. A dialogue is a sequence with relations, not a set of independent turns

**Claim.** A scene's score is a function of the sequence of turns and of the relation each turn bears to the one before it, and cannot be recovered by scoring each turn independently.

**Formal content.** A dialogue is an ordered sequence of turns, each carrying a speaker, a state p, a bias vector b, and a relation to the preceding turn drawn from the author's own motion vocabulary: parallel motion (reinforcement), contrary motion (the dialectic), oblique motion (one voice holds a pedal point while the other moves). Dissonance between two speakers is the angle between their semantic vectors, unison at zero, consonance near a third or a sixth, opposition at the tritone. A dissonance resolves in one of three ways: one side concedes, both modulate to a new key, or the dissonance is suspended, which is the musical name for deferring the decision.

**How it could be wrong.** If the motion vocabulary cannot be applied to real dialogue with agreement, the formalism is empty. And, decisively, if a score computed from the sequence is indistinguishable to listeners from one computed turn by turn, the sequence adds nothing.

**Test.** The second failure mode is a clean experiment that can run as soon as the generator is seeded: generate both scores for the same scene and ask listeners to tell them apart.

### B3. Some biases are dyadic, and the partition is fixed in advance

**Claim.** A named subset of the thirty has a magnitude only relative to a specific interlocutor; the remainder are individual. The partition is declared before any annotation, and the Atlas's Social domain is where the dyadic members are expected to fall.

**Formal content.** For dyadic biases, b is indexed by speaker, other and turn. For individual biases, by speaker and turn. No multiplicative modulation of one speaker's state by another's, which is the construction that sank A10.

**Warrant.** The author's topology chapter: a diad has no mediator, so tension in a pair has nowhere to go and the pair breaks, while the triad is the minimal stable unit. A quantity that exists only within a pair is what that argument predicts.

**How it could be wrong.** Raters cannot agree the partition. Or the biases declared dyadic show no dependence on the identity of the interlocutor when the same speaker is rated against different partners.

**Test.** Rate the same speaker against two interlocutors in the same play. Hamlet is the natural case: one character with Gertrude, with Ophelia, with Horatio and with Claudius, in one text.

**Note on admissibility.** The Skeptic held that B3 is A10 in new vocabulary. The difference is that an interlocutor is an object the model already carries, with its own state and bias vector in the same frame, whereas an audience had no representation and no implementation. B3 is admitted on that ground and on the condition that it drops the modulation arithmetic.

### B4. The three layers are carried on channels that do not compete

**Claim.** Profile, state and bias are simultaneously legible because they are assigned to channels that do not compete: the stable profile takes timbre and register, set once per character; the moving state takes dynamics and mode; and bias, which lives between speakers, takes the harmonic relation between staves rather than any channel on a single stave.

**Formal content.** Channel assignment is fixed, declared, and counted against the per-stave budget. The bias channel is a between-stave quantity and therefore does not consume a within-stave channel.

**Constraint that forces it.** The programme's notation budget allows two to three independent state channels per stave and about 6.6 recoverable bits per character per frame. Three simultaneous layers on one stave exceed it. This is arithmetic, not taste, and the assertion yields to it.

**How it could be wrong.** Listeners cannot recover any layer above chance. Or the layers mask each other, so that recovering one degrades recovery of another. Or the between-stave channel turns out to be a within-stave channel in disguise, in which case the budget is exceeded after all.

**Test.** A recovery study, one layer at a time, then all three together, against the two-to-three channel bound.

### B5. A listener can identify a transformed motif as the same motif

**Claim.** Across acts the arc is carried by motif transformation, and the claim is falsifiable in exactly one way: a listener who has heard the original identifies a transformed statement as the same motif, and identification degrades with transformation distance rather than collapsing.

**Formal content.** A motif established in act one is transformed by the operations of A6. Legibility is the proportion of listeners correctly identifying a transformed statement, measured against transformation distance.

**How it could be wrong.** Identification is at chance. Or it collapses discontinuously rather than degrading, which would mean A7's fragmentation levels are not ordered in perception even if they are ordered in construction.

**Test.** A motif-identification task across transformation distances. This doubles as the test of A7's ordering.

**Blocked by.** A11. There is no stable original to learn while the generator is unseeded.

---

## On running Hamlet and Antigone through the application

This is the strongest move available and I would build the programme around it.

**One fact of the corpus first.** Antigone is not among the seven scored plays. The scored corpus is Hamlet, King Lear, Macbeth, Oedipus Rex, A Doll's House, The Cherry Orchard and Miss Julie, and Antigone carries twelve frames in the hand-annotated library, which is too few for an arc. Running Antigone is work to be done, not work already done, and Oedipus Rex is the Sophocles that currently exists in scored form.

The reason is that Lacan wrote extended readings of both plays and published them, so there exists a detailed, independent, non-musical account of where each drama turns and why. That is close to unobtainable in this field. Most affect-and-music work has to invent its own ground truth and then validate against it, which is circular. Here there is an external reading that was written for entirely other purposes and cannot have been tuned to the system.

Three sources of state become comparable for the same scenes. The hand-annotated frames already in the play library are your own reading. The text-derived values the application computes are the system's reading. Lacan's seminars are a third reading by an author with no stake in the outcome. Agreement among all three is evidence the state is recoverable. Disagreement between the first two is a measurement problem in the application. Disagreement between the first two and the third is theoretically interesting and is exactly the kind of finding that improves a theory rather than embarrassing it.

One detail from the research is worth keeping, because it is useful rather than awkward. Lacan gives two different accounts of Hamlet's prayer-scene deferral, one in Seminar VI built on the hour of the Other and one in Seminar VII built on the second death. The literature frequently collapses them. For your purposes that is a gift: a single scene with two authoritative and non-identical readings is a natural test of whether the state representation is fine enough to distinguish them. If MPN produces the same state under both readings, the representation is coarser than the criticism. If it can be made to produce different states, that is a demonstration of resolution.

What the runs will not do is validate the modal assignments, A4, or the composition claim, A11. Those need listeners, not plays. The play runs calibrate the state; the listener studies test the mapping. Keeping the two apart will save the programme from claiming more than it has.

## What I propose next

Work down Block A with me, one assertion at a time. For each: confirm, amend or withdraw; fix the constants where they are provisional; and decide whether it is settled theory, a working hypothesis, or an open question. I will carry the outcome into S1 and forward into S2, S3 and S4 so that all four defend the same statement.

Then Block B becomes the new chapter in S1 and the substance of the notation work in S3, since the dialogue, bias and act layer is where the theory is actually growing.
