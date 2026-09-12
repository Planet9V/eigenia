# Block A: arbitration and decision log

Structured design review, completed 2026-09-12. Primary design: the eleven assertions in `ASSERTIONS-REGISTER.md`. Reviewers invoked in order: Skeptic, then Constraint Guardian and User Advocate (run together, since their mandates are disjoint and neither may respond to the other). This document is the Arbiter's disposition and the mandatory decision log.

**Disposition: REVISE.** The architecture stands. Two assertions should be withdrawn, one must be amended on evidence already in hand, one requires a decision before it can appear in any paper, and the rest are untested rather than refuted.

## 1. The distinction the review turned on

The Skeptic rated eight of eleven assertions fatal. Most of those ratings are correct about what they observed and wrong about what it means, because they conflate five different kinds of failure. Separating them is the whole job of this arbitration.

**Theory-fatal.** The assertion cannot be true as stated, on evidence or on algebra. Only one assertion is in this class, and it is the review's most valuable finding.

**Implementation-falsified.** The code does not do what the theory says. This does not refute the theory. It means the theory has never been tested, which is a different and more hopeful position.

**Measurement-circular.** The current method of obtaining the numbers cannot evaluate the assertion, because the method presupposes the answer.

**Documentation-fatal.** Several mutually contradictory versions exist in the corpus, so there is no single claim to defend.

**Presentation.** The assertion is defensible and is expressed in a way that misleads its reader.

## 2. Decisions

### A8, the two intensity scalars. AMEND. Theory-fatal as stated.

Fragmentation is selected by 0.6H + 0.4τ and orchestration density by 0.7τ + 0.3H. Over the 232 annotated frames these correlate at r = 0.915, with the first principal component carrying 95.8 per cent of the joint variance, and only 10 of 25 possible level-pairs are realised.

The algebra is worse than the data. Two convex combinations of the same two variables with weights this close correlate at about 0.86 even if trauma and entropy are perfectly uncorrelated. The near-collinearity is not a property of the plays. It is a property of the construction, and no corpus will rescue it.

There is a consequence worth stating carefully, because it is the most elegant thing the review produced: **A5 succeeding forces A8 to fail.** If trauma and entropy really are separable, then two nearly identical weightings of them are nearly collinear by construction. The theory cannot have both assertions in their present form.

Two ways out, and they are not equivalent. Give fragmentation and orchestration genuinely different functional forms, so that one is not a reweighting of the other; for instance let coherence depend on entropy nonlinearly while density depends on trauma, so the two can dissociate. Or admit one intensity variable, accept that density and fragmentation are two views of it, and simplify the theory. The second is more honest, the first is more interesting, and only you can say which is true to what you hear.

Objection accepted in full. This finding is free, it comes from your own numbers, and it should go into S1 as a correction rather than be discovered by a reviewer.

### A9, objet a as divergence. WITHDRAW from the calculus.

The theory defines the quantity as the divergence between an internal model and an observed state. The system maintains no internal model, so there is nothing for an observation to diverge from; the assertion's own failure condition is already met. What ships under the name is a different formula on different inputs, and its sole caller is never called.

Retain *objet a* in the theory as a conceptual frame, which is legitimate and is how Lacan used it. Remove it from the state calculus until there is a predictive layer for it to measure against. Claiming a quantity the system does not compute is the precise failure the whole series exists to avoid, and this assertion costs credibility while buying nothing.

Objection accepted.

### A10, the audience as a term in the model. WITHDRAW to future work.

No implementation exists. The stated form, base state multiplied by one plus k times an observation weight, breaks A1's unit bound and A3's simplex constraint; k is defined in terms of the state it modifies; and the distance weighting as written makes distant spectators count for more.

The underlying idea, that being watched changes the watched subject and that the sensitivity varies by register, is genuinely interesting and genuinely Lacanian. It belongs in a section on live performance, not in the core calculus. Nothing currently depends on it, so removing it costs nothing.

Objection accepted.

### A4, the modal selection rule. DECIDE, then test. Documentation-fatal.

Four incompatible register-to-mode tables are reachable in the corpus, two of them exact inversions of each other: one assigns the Real to Aeolian and the Imaginary to Locrian, another assigns the Real to Phrygian and the Imaginary to Lydian. The version stated in the assertions register matches no shipped code. The trauma threshold of 0.6 is implemented nowhere, and the function that selects the mode does not take trauma as an argument.

No paper can defend this until one table is chosen. That is your decision and nobody else's, and it should be made by ear rather than by argument: sit with the seven modes and say which register each belongs to. Once chosen, the assignment needs the listener study, which the constraint review prices as the cheapest mapping test in the programme.

Objection accepted as to documentation. The assertion itself is untested, not refuted.

### A11, the calculus composes and is deterministic. HOLD, with an immediate implementation fix.

The composition claim is the theory's central commitment and it stands as a design commitment. The determinism claim is false as implemented: nine unseeded random calls in the composer and one in the calculus, so the same state does not produce the same score. A user tests this by pressing render twice.

This blocks every listening study in the programme and it means the existing twenty-four-participant survey cannot be cited as evidence about a stated mapping, because the stimuli were not reproducible. Seeding the generator is one to two days of work and is the highest return per hour available anywhere in this programme.

Until it is done, S1 must say that determinism is specified and not yet realised.

### A2 and A3, magnitudes and the simplex. HOLD as hypotheses. Measurement-circular.

Neither is refuted. Both are currently untestable with the instrument in hand.

A2's measurement counts keywords over the author's own analytical prose, and that prose contains the words Real and Symbolic literally. The instrument finds what the analyst wrote, which is circular.

A3's simplex is not observed. It is imposed by the normalisation step, which divides each register by the keyword total, so the constraint holds by construction and the data cannot speak against it. The degenerate branch produces a sum of zero, and no function downstream depends on the constraint at all.

The remedy for both is the same and it is the missing instrument the constraint review identified: a validated annotation protocol with a codebook, unconstrained anchored scales, a calibration set and a published reliability figure. It costs roughly five thousand dollars and one term, and it gates six of the eleven assertions. Until it exists, nothing in the register that depends on the registers can be examined at all.

A3's unconstrained correlation matrix remains the cheapest decisive test that needs new data, at about two thousand dollars, and it settles the question the theory most needs settled.

### A1, the nine components. HOLD, with a disclosure.

The corpus gives an effective sample of about thirty-eight rather than two hundred and thirty-two, against the eighty to a hundred and twenty the assertion would need. More pressingly, five of the nine components are scene-global rather than per-character, so two characters in the same frame differ only by a constant, and in the shipped path the registers are a fixed triple and entropy is pinned by an argument-count error, which leaves trauma as the only component that audibly moves.

The assertion is not refuted. The paper must say which components are currently exercised, because a reader who runs the system will find out in a minute.

### A5, trauma and entropy separable. HOLD. Most likely to be confirmed.

The Skeptic's objection is that the stability scalar recombines them before harmony and rhythm are computed, which is true and is a defect in that scalar rather than in the assertion. Both reviewers who costed it agree the separation is testable with the annotation instrument. It is the assertion most likely to survive, and the user review found it is also the one a composer would actually use, since force and coherence are language a director understands.

### A6, the typology is a function. RECLASSIFY. Implementation-falsified, theory untested.

The Skeptic rated this fatal on the grounds that the transformations fire at the wrong moments. That is an empirical claim and the experiment has not been run. What is demonstrably true is narrower: most of the transformations do not reach the output at all. Orchestration level, instrument assignment and harmonic context are computed and written to a console log; the motif inversion negates a field nothing reads, so it is inaudible.

The assertion stands as a hypothesis. The implementation must carry the transformations to the score before the hypothesis can be tested.

### A7, fragmentation levels. KEEP the levels, revisit the selector.

The five ordered stages are musically sensible, they match the Shore practice they come from, and the user review found them to be one of the two things in the whole register that a composer could take straight into a conversation with a director. The selector is the problem, and it is A8's problem.

## 3. The finding that is not about an assertion

The dissertation reports at line 1127 a result of p = 0.72 with an effect size of 0.08 on forty-eight participants. That is a null result, and it appears in a document that presents the system as validated. S1 section 9, drafted from the same source, cites only the other study, the twenty-four-participant appropriateness rating.

Neither study can currently support a claim about the mapping, because the stimuli were generated by an unseeded system. But the asymmetry matters more than the statistics. A null result that appears in your own document and not in the paper drawn from it is the kind of thing a hostile reviewer finds in an afternoon, and the cost of finding it yourself is nothing while the cost of having it found is the credibility of everything around it. The correct move is to report both studies, state that neither is citable as evidence for the reason given, and let the reproducibility fix put the programme in a position to run one that counts.

## 4. Where the theory stands after arbitration

Nine assertions rather than eleven, of which six are live hypotheses with defined tests, one needs a decision from you, one needs amendment on evidence already in hand, and one is a design commitment whose implementation must be repaired.

That is a stronger theory than eleven assertions of which two are inert. A9 and A10 were the two a critic would have gone for first, and removing them costs nothing that the theory uses.

The programme's critical path is not long. Seed the generator, which is days. Build the annotation protocol, which is a term and gates six assertions. Choose the modal table, which is an afternoon with a piano. Run the register correlation, which is two thousand dollars and settles A3. Then the theory is in a position to be tested rather than argued about.

## 5. Decision log

| Assertion | Objection | Resolution | Rationale |
|:---|:---|:---|:---|
| A1 | Underpowered corpus; five components scene-global; only trauma varies in practice | Accepted in part. Hold with disclosure | Not refuted; the paper must state what is exercised |
| A2 | Measurement circular over the author's own prose | Accepted. Hold pending instrument | The assertion is untested, not false |
| A3 | Simplex imposed by normalisation, not observed; no downstream dependency | Accepted. Hold as hypothesis; run the unconstrained correlation | Cheapest decisive new-data test in the set |
| A4 | Four incompatible tables; threshold unimplemented | Accepted. Decide, then test | Nothing publishable until one table is chosen |
| A5 | Stability scalar recombines the two variables | Accepted against that scalar, not against the assertion | Defect is in the scalar |
| A6 | Transformations do not reach output | Accepted as implementation finding; reclassified | Empirical claim not yet tested |
| A7 | Selector is collinear with A8's | Accepted as to selector; levels retained | Levels serve a named user |
| A8 | r = 0.915 on own data; 0.86 by algebra alone | Accepted in full. Amend | The one theory-fatal finding |
| A9 | No internal model exists; shipped formula unrelated; no caller | Accepted. Withdraw from calculus | Quantity claimed and not computed |
| A10 | No implementation; breaks A1 and A3 arithmetically | Accepted. Withdraw to future work | Nothing depends on it |
| A11 | Determinism false as implemented | Accepted as to implementation; composition claim holds | Seeding is days of work |
| Cross | Null result at dissertation line 1127 not carried into S1 | Accepted. Report both | Integrity, and cheaply fixed now |

Exit criteria met: understanding lock completed at attribution, all three reviewers invoked, every objection resolved or explicitly reclassified, decision log complete. Arbiter disposition: REVISE.
