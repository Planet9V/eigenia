# Block B: halt, arbitration of the Skeptic finding, and re-draft

Orchestrator decision, 2026-09-12.

## 1. The halt

Three Block B reviews were registered. One was dispatched. The Skeptic returned a structural finding that makes the other two premature: **no Block B assertion carries formal content, a failure condition, or a test, though the register promises all three.** Block A was arbitrable only because it had them.

Dispatching a Constraint Guardian and a User Advocate against assertions in that state would return a third and fourth report saying the assertions are under-specified. The registry marks both tasks blocked rather than in progress, and they will be re-dispatched against the re-draft below.

The defect is in the drafting, not in the ideas. The ideas came from the author in a single message and were transcribed as candidates; they were never given the treatment Block A received. That is corrected here.

## 2. What survives the Skeptic's attack, and what does not

The Skeptic rated B2, B3 and B4 fatal and B1 and B5 serious. Separating drafting defects from substantive ones:

**Substantive, and they survive any re-draft.**

*The bias count is not settled.* Four incompatible counts exist in the corpus: twelve in the dissertation, thirty-six in the projector, five in the TypeScript calculus, and "100+" in the score types. The theory cannot carry a bias layer until one count is fixed. This is the same class of defect as A4's four modal tables.

*B4 fails the programme's own arithmetic.* The constraint review put the notation budget at two to three independent state channels per stave and about 6.6 recoverable bits per character per frame, and concluded that the existing state exceeds the budget before biases are added. Three simultaneous layers cannot be carried on one stave. This is a number, not an opinion, and the assertion must yield to it.

*B3 reproduces A10's structure.* Bias modulated by an interlocutor is the audience-modulation formula with the audience replaced. A10 was withdrawn this morning. B3 cannot be admitted in the same form.

**Drafting defects, correctable and corrected below.** B2's central verb names a formal operation and the entry contains no formalism. B5 is stated so that no observation could contradict it. B1 denies being an input to a personality reduction while the author's own chapter performs exactly that reduction.

**One dependency worth stating plainly.** B5 requires a stable original motif for a listener to learn, and A11's determinism is unimplemented, so there is currently no stable original. B5 is blocked behind a two-day fix.

## 3. Block B, re-drafted

Same treatment as Block A: claim, formal content, how it could be wrong, what would test it.

### B1. Bias is a layer with magnitude, carried alongside state

**Claim.** Each of twelve named biases takes a magnitude for a speaker at a turn, and the bias vector is carried alongside the state vector rather than absorbed into it.

**Formal content.** b = (b₁ … b₁₂) ∈ [0,1]¹², defined per speaker per turn, distinct from p. The count is twelve, per the dissertation, and the other three counts in the corpus are superseded.

**How it could be wrong.** Raters cannot assign magnitudes with usable agreement, so the layer is not measurable. Or b is largely predicted by p across a corpus, in which case it is not a second layer but a projection of the first.

**Test.** Annotate turns for bias magnitude; report reliability; regress b on p and report the residual. If the residual is small, B1 fails.

### B2. A dialogue is a sequence with relations, not a set of independent turns

**Claim.** A scene's score is a function of the sequence of turns and the relations between them, and cannot be recovered by scoring each turn independently.

**Formal content.** A dialogue is an ordered sequence of turns. Each turn carries a speaker, a state p, a bias vector b, and a relation to the preceding turn drawn from a closed vocabulary: accepts, deflects, escalates, concedes, ignores, reframes. The scene score is a function of the whole sequence.

**How it could be wrong.** Two ways, and the second is decisive. If the relation vocabulary cannot be applied to real dialogue with agreement, the formalism is empty. And if a score computed from the sequence is indistinguishable to listeners from one computed turn by turn, the sequence adds nothing and the assertion is false even if the annotation works.

**Test.** The second failure mode is a clean experiment that can be run as soon as the generator is seeded: generate both scores for the same scene, and ask listeners to tell them apart.

### B3. Some biases are dyadic, and the partition is fixed in advance

**Claim.** A named subset of the twelve biases has a magnitude only relative to a specific interlocutor; the remainder are individual. The partition is declared before any annotation.

**Formal content.** For dyadic biases, b is indexed by speaker, other and turn. For individual biases, by speaker and turn. No multiplicative modulation of one speaker's state by another's, which is what broke A10.

**How it could be wrong.** Raters cannot agree the partition. Or the biases declared dyadic show no dependence on the identity of the interlocutor when the same speaker is rated against different partners.

**Test.** Rate the same speaker against two interlocutors in the same play. Hamlet is the natural case: the same character with Gertrude, with Ophelia, with Horatio and with Claudius, in one text.

**Note on provenance.** This is the assertion the author is most invested in and it is the one the Skeptic hit hardest. The difference from A10 is real and it is worth stating: an audience had no representation in the model and no implementation, whereas an interlocutor is another speaker who already carries a state and a bias vector in the same frame. The relation is between two objects the theory already has. That makes it admissible where A10 was not, provided it drops the modulation arithmetic.

### B4. The three layers are carried on different channels, and one of them is between staves

**Claim.** Profile, state and bias are simultaneously legible because they are assigned to channels that do not compete: the stable profile takes timbre and register, set once per character; the moving state takes dynamics and mode; and bias, which lives between speakers, takes the harmonic relation between staves rather than any channel on a single stave.

**Formal content.** Channel assignment is fixed, declared, and counted against the per-stave budget. The bias channel is a between-stave quantity and therefore does not consume a within-stave channel.

**How it could be wrong.** Listeners cannot recover any layer above chance. Or the layers mask each other, so that recovering one degrades recovery of another. Or the between-stave channel turns out to be a within-stave channel in disguise, in which case the budget is exceeded after all.

**Test.** A recovery study, one layer at a time, then all three together, against the two-to-three channel bound the programme has already established.

**What changed.** The original claim was three layers on one stave, which the programme's own arithmetic forbids. Moving bias to the relation between voices is not a dodge: it follows from B3. If bias is dyadic, its natural musical home was never a single line.

### B5. A listener can identify a transformed motif as the same motif

**Claim.** Across acts, the arc is carried by motif transformation, and the claim is falsifiable in exactly one way: a listener who has heard the original can identify a transformed statement as the same motif, and identification degrades with transformation distance rather than collapsing.

**Formal content.** A motif established in act one is transformed by the operations of A6. Legibility is the proportion of listeners correctly identifying a transformed statement, measured against transformation distance.

**How it could be wrong.** Identification is at chance. Or it collapses discontinuously rather than degrading, which would mean the fragmentation levels of A7 are not ordered in perception even if they are ordered in construction.

**Test.** A motif-identification task across transformation distances. This also doubles as the test of A7's ordering, which is efficient.

**Blocked by.** A11. There is no stable original to learn while the generator is unseeded, and Antigone carries twelve frames in the current library, which is too few for an arc.

## 4. Registry updates

| Task | Was | Now | Reason |
|:---|:---|:---|:---|
| Block B Constraint Guardian review | in_progress | blocked | Input failed gate; re-dispatch against re-draft |
| Block B User Advocate review | in_progress | blocked | Same |
| Block B arbitration | pending | pending | Unchanged; awaits the two reviews |
| Settle the bias count at twelve | new | pending, JIM | Four counts in corpus; same class as A4 |
| Re-draft Block B with formal content | new | done | This document |

## 5. What the author decides

Three questions, and they fork the work.

**The bias count.** Twelve, per your dissertation, or another number. Four are live in the corpus and one must win before the layer can be built.

**B4's channel assignment.** The arithmetic says three layers do not fit on a stave. The re-draft moves bias to the harmonic relation between staves, which follows from B3 and costs nothing. If you intended all three layers on a single line, the theory has to argue against its own notation bound, and I do not think it can.

**B3 against A10.** I have admitted B3 on the grounds that an interlocutor is an object the model already carries while an audience never was, and on condition that it drops the modulation arithmetic. The Skeptic says it is the same assertion in new vocabulary. You should decide whether my distinction is real or whether I have let a withdrawn assertion back in through a side door.
