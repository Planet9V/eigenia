| Field | Value |
|:---|:---|
| Designation | REVIEW-PRD-skeptic |
| Document under review | MPN-PRD-01, `08_PAPERS/PRD-MPN-THERAPY.md`, draft 6 |
| Role | Skeptic. Not the author, not a copy editor, not a regulatory reviewer |
| Date | 14 September 2026 |
| Review history of this document | **None.** Drafts 1 to 3 were returned by the author with fifteen, six and four blocking findings; drafts 4, 5 and 6 have passed no gate, and no reviewer of any other document in the series has been asked to read this one. The arbitration of 14 September read sections 5.2, 6.2, 7.4 to 7.6 and 14 of draft 6 as context for ruling on a different document, and addressed none of its forty-five changes here [6] |
| Scope, non-negotiable | The author's ruling of 13 September 2026 governs: theory, internal private use, synthetic material, no people, no regulation. No finding below is made on a regulatory, legal, consent or compliance ground. Findings about users, use cases and an internal private market are in scope, because the ruling is about subjects and public deployment and not about whether the thing has users |
| Read in full | The document under review; `S3-mapping-phi.md` sections 2.1 to 2.6 and section 4 [3]; `MPN-S3-AMENDMENTS-2.md` [4]; `DESIGN-UNIFIED-FRAMEWORK-rev8.md` sections 4.4, 5a, 5b, 6.3, 10, 10a and 11 [5]; `ARBITRATION-DESIGN-R7.md` [6]; `DECISION-LOG-2026-09-14.md` [7]; `CITATION-LEDGER-PRD.md` [8] |
| Computed before writing | `gen6/s6_timbre_capacity.py` and `gen6/s6_bias_layer.py` both run to completion and reproduce every figure this review takes from them. Beyond them: an exhaustive enumeration of the 120 ordered corner pairs of the DISC cube under the S3 contrast map, to test the PRD's own characterisation of maximum separation; an audible-fraction census over four constructed pairs, to test what the check in section 7.6 can and cannot detect; a re-run of `s5_salvage.py`, which the front matter names as what this document reproduces; and a cross-reference audit of every `section n` token in the body against the document's own headings |
| Not reproduced, and reported as unreproduced | Reference [16] of the document, Koo and Li, which the citation ledger records as UNVERIFIED-OFFLINE [8] and which is the sole source of the number that decides whether Study 1 passes. Nothing in this review rests on it and finding 15 is about the fact that nothing in the document does either |
| Findings | 22, of which **18 BLOCKING** |
| Disposition | **STOP** |

## Preamble, and the two things this review is not about

This document has never been reviewed and it is the clinical document. It is also the one document in the programme that reaches outside the corpus for most of its warrant, and on that count it does well: eleven of its twelve external URLs were fetched by the ledger and ten support their claim in full, several word for word [8]. That is a better external record than any other document in the series and the findings below should be read against it.

What has never been checked is the inside. Draft 5 deleted most of two sections on the author's scope ruling, draft 6 added two more, and nobody has since read the document end to end against itself or against the three documents it depends on. The result is a document whose external citations are sound and whose internal wiring is not: nine live cross-references point into subsections that no longer exist, the first golden-output fixture asserts behaviour that three other documents contradict, two of the five ratings the therapist is required to set reach no musical parameter at all, and the two additions of draft 6 are both keyed to a revision of the design that a gate returned with STOP on the same day this draft's companion ledger was written.

Two things this review does not do. It does not raise a regulatory, legal, consent or compliance finding, and where the document's own history records that such findings were once made, that history is left alone. And it does not treat the existence of users, use cases or an internal private market as a defect: the author's ruling is about subjects and public deployment, and a document that specifies a tool somebody will operate is doing what a requirements document does. Findings 13, 16 and 20 are about the document naming three incompatible populations in one roadmap, which is a coherence problem and not a scope one.

## 1. Nine cross-references point into subsections the document deleted, and one of them is the only enforcement mechanism the naming rule has

**The claim attacked.** Section 5.2: "Section 8.4's golden-output test is what enforces this on the explanation, which is generated and therefore cannot be checked by reading the source." Section 7.4: "This is the first fixture in section 8.4's golden-output suite ... because section 10.6 requires it to be deliverable to a client or their advocate." Sections 3.3, 4.2, 6.4, 7.3 and 14 make five further appeals of the same kind.

**Section.** 3.3, 4.2, 5.2, 6.4, 7.3 (twice), 7.4 (twice) and 14, against sections 8 and 10.

**The evidence.** Draft 5 replaced the old section 8, which had subsections, with a single unsectioned section headed "What the instrument is careful about, now that nothing legal applies", and replaced the old section 10 the same way. The document's own headings, enumerated directly, run 8 and then 9.1; and 10 and then 11.1. There is no 8.2, no 8.3, no 8.4, no 8.5, no 10.2 and no 10.6. Every one of the following is therefore a reference to nothing: "Section 8.2 prohibits a named condition beside a claim of effect on any product surface" at 3.3; "which section 8.3 handles by never letting that component's output reach a user as an assertion" at 4.2; "Section 8.4's golden-output test is what enforces this" at 5.2; "per section 10.2" at 6.4; "carrying the standing disclosure of section 8.5" and "would breach section 8.2" at 7.3; "the first fixture in section 8.4's golden-output suite" and "section 10.6 requires it to be deliverable to a client or their advocate" at 7.4; and "Section 8.2 forbids naming a condition near a claim of effect" at 14. Two further defects of the same kind sit beside them. Section 11.4's entry condition reads "the only condition is that the generator of section 10a exists", and this document has no section 10a; section 10a is MPN-DESIGN-01's implementation order [5]. And the Contents list at the head of the document still names section 8 "The claims boundary, and how it is enforced" and section 10 "Safety", neither of which is the heading that follows.

**Why it is blocking rather than editorial.** Four of the nine are not decoration; they are the document's only statement of a mechanism. Section 5.2 asserts that the naming rule binds the generated explanation and names the golden-output test as what enforces it, and that test was deleted with the section that held it, so the rule that section 4.4 calls the removal of "the most dangerous artefact in either codebase" now has no stated enforcement anywhere in the document. Section 7.4 asserts that the explanation must be deliverable to a client or their advocate on the authority of a requirement that does not exist. Section 4.2 discharges the risk of shipping an unvalidated analyser by pointing at a subsection that does not exist. A requirements document is read by an implementer one section at a time, and an implementer who follows any of these four arrives at nothing.

**BLOCKING.**

## 2. The renaming rule reaches exactly the quantities S4 happened to name, and a quantity S3 documented at path and line survives it untouched

**The claim attacked.** Section 5.1: "**Every user-visible quantity is named for what it measures** ... No quantity carries a name borrowed from mathematics, psychoanalysis or medicine unless it is that thing." Section 4.4 makes this one of the four locked decisions and section 8 makes it the one discipline that survives the deletion of the claims boundary.

**Section.** 5.1, 5.3, 8, 9.2 and 9.3.

**The evidence.** Section 5.3's deletion table has seven rows and every one of them is a quantity S4 named: `CLINICAL_HEALTH_SCORE` from S4 section 4.2, `TRAUMA_R` from 4.3, `ENTROPY_H` from 4.4, `BASELINE_B` from 4.3, `ARRHYTHMIA_α` from 4.4, the OCEAN profile from 2.1 and 2.2, and the DISC profile from 2.1 and 4.5 [2]. The rule is stated as a universal and discharged as a transcription, and the transcription's source is one paper.

The quantity that shows what the rule then misses is in S3 rather than in S4. S3 section 2.3 establishes that the mode name printed on a rendered score comes from a three-way branch on a quantity the page component calls `lyapunov`, computed as $(\tau + H - 0.5)/2$, "a quantity the code names for an exponent it is not" [3]. That is precisely the defect section 5.1 exists to prevent, on precisely the surface section 5.2 binds hardest, since the printed mode name is on the face of the score a therapist reads. Searched for by name and by value, the document does not mention it: there is no occurrence of `lyapunov`, of `page.tsx` or of the page component anywhere in the body. It is in none of the four classes of section 9's nineteen-artefact manifest, which I ran and which tallies 4 ported, 7 repaired, 2 rewritten and 6 dropped. Section 9.2's row for `score_orchestrator.ts` names S3-1, the missing `mode` field and the `as any` cast, but S3 is explicit that the cast and the branch are in the page component and that "adding the field without removing the cast would change nothing" [3]. So the file that decides the mode name actually printed on a score is neither ported, repaired, rewritten nor dropped, and the quantity that decides it is neither renamed nor deleted.

**The general point, which is the answer to the question.** A rule stated as a universal reaches only the class its enumeration covers. Section 5.3 is an enumeration of one paper's findings and carries no test, no lint and, after finding 1, no golden-output suite. There is nothing in the document that would catch the next wrongly named quantity, and there is one in the corpus already.

**BLOCKING.**

## 3. The audible fraction is itself a quantity named for something it does not measure, and it cannot detect most of the deafness section 7.6 requires it to detect

**The claim attacked.** Section 7.6: "**The check is one line and it belongs in the build rather than in a reviewer's head**: take the difference of the two profiles, compare its magnitude component against its length, and if the ratio is near one the two are inaudible through timbre however far apart their scores look." And: "the instrument computes the audible fraction of every assigned pair and shows it, and an assignment that comes out near zero is declared on the therapist's screen". Gate G1 requires it "computed and shown".

**Section.** 7.6 and 13.

**The evidence.** The check is a ratio and therefore scale-free. I computed it under the S3 section 2.6 contrast basis on four pairs. The document's own diameter pair, $(1,1,0,0)$ against $(0,0,1,1)$, returns an audible fraction of 1.000 at a timbre distance of 2.0000. S3's flat pair, $(0.3,0.3,0.3,0.3)$ against $(0.7,0.7,0.7,0.7)$, returns 0.000 at a timbre distance of 0.0000, which is the case the check is designed for and which it catches. But $(0.52,0.52,0.48,0.48)$ against $(0.48,0.48,0.52,0.52)$ returns an audible fraction of **1.000** at a timbre distance of **0.0800**, and $(0.5,0.5,0.4,0.4)$ against $(0.4,0.4,0.5,0.5)$ returns **1.000** at **0.2000**. Both pass the document's check perfectly and both are four and ten per cent of the channel's diameter apart. The design's own inversion of the separation curve, which I reproduced, does not descend below a resolution of 0.40 even at fourteen characters [5], so a pair at 0.08 is inaudible by every figure either document carries.

So the check detects deafness in one direction, the magnitude null, and is blind to deafness from small separation, which is the other and much larger way two assigned profiles fail to be distinguishable. A quantity called the audible fraction that returns 1.000 on an inaudible pair is a quantity named for a perceptual property it does not measure, on a therapist-facing surface, which is the class of defect section 5.1 exists to prohibit and section 4.4 calls the single strongest argument for not shipping the proofs of concept. The document commits it in the same draft that restates the rule.

**And there is no threshold.** Section 7.6 says "near zero" and names no value. The arbitration found this and recorded it as finding U11, directing the threshold into the design's numeric inventory on the ground that "PRD section 7.6's 'near zero' has no value in either document" [6]. Revision 8 duly lists "the audible-fraction threshold of section 5b, which PRD section 7.6 leaves as 'near zero' with no value in either document" among the parameters it leaves unfixed [5]. Gate G1 nonetheless requires the check "computed and shown", which is a gate on a quantity with no pass mark, no unit and, per the paragraph above, the wrong definition.

**BLOCKING.**

## 4. Section 7.6's statement of what attains maximum separation is false, and is contradicted by its own worked example three clauses later

**The claim attacked.** Section 7.6: "Maximum separation in the timbre space is attained by **any pair of profiles differing in opposite senses on two coordinates**, so a paradigm client at $(1, 1, 0, 0)$ and a therapist voice at $(0, 0, 1, 1)$ sit at opposite ends of the channel's full diameter."

**Section.** 7.6, and the status block, which repeats it as "the two-node case reaches the channel's full diameter with no search".

**The evidence.** I enumerated all 120 unordered pairs of the sixteen DISC-cube corners under the S3 section 2.6 contrast map. Exactly three pairs attain the diameter 2.000000: $(0,0,1,1)$ with $(1,1,0,0)$, $(0,1,0,1)$ with $(1,0,1,0)$, and $(0,1,1,0)$ with $(1,0,0,1)$. **Every one of the three differs on all four coordinates**, being a complementary pair of far vertices. There are twenty-four corner pairs differing in opposite senses on exactly two coordinates, and every one of them returns 1.414214, which is 70.7 per cent of the diameter and not 100 per cent. Two worked cases: $(1,1,0,0)$ against $(0,1,1,0)$ gives 1.414214; $(1,0,0,0)$ against $(0,1,0,0)$ gives 1.414214.

The document's own example is one of the three that do attain the diameter, and it differs on four coordinates, not two. So the sentence's general rule and the sentence's instance contradict each other inside one sentence, and the rule is the half that is wrong.

**Why it matters beyond the arithmetic.** Section 7.6 is the section that tells an author how to assign the two profiles, and section 14 puts the assignment question to the author as a live decision. An author following the stated rule rather than the stated example, which is what a rule is for, lands at 70.7 per cent of the channel and believes they are at 100. That is a thirty per cent loss on the one claim the section makes about the two-node case, taken on the document's own instruction.

**BLOCKING.**

## 5. The two-node case does survive revision 8's narrowing, and the document does not; it cites the superseded revision and imports two claims revision 8 struck

**The claim attacked.** Section 7.6: "The design document's section 5b works out what that buys and **the whole of it applies here** [17], [18]." And: "Item TC-1 of the design, **six families keyed to the six canonical contrast directions, fixes both and is small** [17]." Reference [17] reads "MPN-DESIGN-01, `08_PAPERS/DESIGN-UNIFIED-FRAMEWORK.md`, **revision 7**".

**Section.** 7.6, 13 and 15.

**The evidence, first on the part that survives.** The narrowing the question asks about does not touch the two-node case. Revision 8 struck "six is the capacity" and replaced it with a conditional: six is the largest cast costing nothing a five-character cast does not already cost, conditional on the perceptual resolution lying in $(1.0898, 1.4142]$, a window whose lower edge is the seven-character value and which has narrowed at every harder search, from 1.0123 to 1.0360 to 1.053712 to 1.089845 [5]. I ran `s6_timbre_capacity.py` to completion and it reproduces all of it: the separation curve flat at 1.414214 from three to six and 1.089845 at seven, and the inversion table which holds two characters at resolutions of 1.60 and 2.00. **The two-node value is 2.000000, the channel's exact diameter, established by the exhaustive corner search that needs no seed at all.** It is the one cell in the table that no further search can move, because 2 is the diameter and nothing can exceed it. The two-node claim is therefore immune to the narrowing, and the document is right about that for a reason it does not give.

**The evidence, on the part that does not survive.** The document takes far more from section 5b than the two-node cell. It says "the whole of it applies here" and cites revision 7, which is the revision the arbitration returned with STOP on the ground that three of six restored capabilities lose their stated mechanism [6]. Revision 8's own status block records what it struck from that block: "the claim that six is the timbre channel's capacity, from this block and from D50, with 'falls 28 per cent at the seventh' deleted rather than corrected" [5]. So "the whole of it" now includes a struck claim and a deleted figure.

Worse, the document's remedy for the family label is the one revision 8 withdrew. Section 7.6 says TC-1, "six families keyed to the six canonical contrast directions, fixes both and is small". Revision 8 section 5b.4 says the opposite in terms: "D51 keyed the family to the six canonical contrast directions. A label that is a deterministic function of the three coordinates it labels carries no information those coordinates do not already carry ... The six-direction key solves the tie by deleting the channel. **The diagnosis stands and the remedy is withdrawn**: ... TC-1 is restated as an open problem and it is the author's, being a question about what the family parameter is for" [5]. The document calls "small" an item the design calls an open problem about the purpose of a parameter, and offers as a fix the thing that was found to delete the channel it is fixing. Revision 8's implementation order records the same withdrawal: item 5a reads "TC-1 is reopened rather than solved by D51" [5].

The citation ledger caught the revision number and stated the consequence precisely: "**Revision 7 is no longer current** ... section 7.6 should be re-read against revision 8 before the next draft" [8]. It was not. The ledger also records reference [18] as BROKEN, the path `05_DATA/03_generators/s6_timbre_capacity.py` not resolving; I confirm that directory holds one file and it is `a8_form_analysis.py`, and that the script runs and reproduces at `/home/claude/gen6/s6_timbre_capacity.py`, which is where revision 8 cites it.

**BLOCKING.**

## 6. Section 7.6 and gate G1 assert that the timbre channel is live and renders; revision 8 establishes at path and line that it is not and does not

**The claim attacked.** The status block: "Section 7.6 specifies the timbre channel, **which is live**". Section 7.6: "**A character has no DISC to measure either, so the author assigns it**, and the channel is live." Section 5.4: "**The timbre channel is live**, and S3 section 2.6 already specifies it". Gate G1: "DISC assigned per character so the timbre channel renders".

**Section.** Status block, 5.4, 7.6 and 13.

**The evidence.** Revision 8 section 5b.6 exists because revision 7 made this claim and a gate checked it against the code. Four things are missing and the section states that they are missing in sequence, so supplying any one alone changes nothing. The contrast map of S3 section 2.6 "does not exist in the code in any form", so "every figure in sections 5b.1 to 5b.4 is a property of a map the product does not contain". There is no input path for a profile: `inferDISC` returns null, which is decision 9 correctly implemented, and "nothing replaces it with an assignment", while the character pickers type a profile as a single letter, which cannot express four coordinates. The family selector is an argmax over the four coordinates, which is the conflict of finding 5 present in shipped code. And the default "puts every unnamed character at the centre of the reachable set", which is the one point the channel cannot carry [5]. Revision 8 states the conclusion twice, in 5b.6 and again in its section 10: "**The timbre channel is not live today, which revision 7 said it was.**" Its implementation order puts the channel after items 2 and 4, dependent on a rating store and an audio path, and deletes "revision 7's claim that the six canonical profiles need no further work" [5].

The document under review makes revision 7's claim, in a draft written after the gate that struck it, and then builds a shipping gate on it. G1 cannot be met by anything in section 9's manifest, because none of the four missing pieces is in it.

**What the section is right about.** That a character's profile is assigned rather than measured, that this is what decision 9 could not give a person, and that the channel was written off across two documents on a premise that does not hold for fiction. The difference between "buildable" and "live" is the whole of the finding, and section 7.6's closing sentence, "a channel that was written off across two documents and has been buildable the whole time", is the accurate one. The three sentences above it are not.

**BLOCKING.**

## 7. The five triples are not the only thing unfixed on the input side; two of the five ratings reach no state coordinate at all, and a therapist gets nothing in the meantime

**The claim attacked.** Section 6.3's mapping table, and section 14's first condition, "fix the five triples numerically". Section 6.2: "**The therapist's five gradients are the state.** They are sufficient on their own."

**Section.** 5.2, 5.4, 6.2, 6.3, 7.4 and 14.

**Is the mapping specifiable without the numbers?** No, and the document says why without drawing the conclusion. Section 14 records the design's condition: "Under interpolation the exact coordinates set the blend weights, and near the barycentre and at it produce measurably different music" [5]. Under S3's modal interpolation the weight of register $k$ is $\max(0, 1 - (m - x_k)/\delta)$ normalised, so the mode is a function of the triple and of the margin $\delta$ jointly [3]. Section 6.3 supplies neither. It supplies five English phrases, "Imaginary-weighted", "Imaginary to Symbolic", "Balanced, near the barycentre", "Symbolic-weighted", "Real-weighted", and the document nowhere states a value of $\delta$; searched for by value, the words interpolation, margin and delta do not occur in the body at all. So the mode channel is undefined for every one of the five gradients, not merely at Partner, and the primary rating of the primary user drives no music.

**What the therapist gets in the meantime, stated exactly.** Nothing on the mode channel, and less than the document implies on the others, because the gap is wider than the Autonomy row. Section 5.4's mapping table has five rows: trauma to session intensity, entropy to musical variability, the register triple to relational stance, DISC assigned, and the mode unchanged. **Arousal and valence appear in no row of it.** They are in section 5.2 as two of the five ratings, they consume two of the five taps section 6.4 budgets, they are required by gate G0's written anchors, and section 5.2 defends them on the ground that the AI music therapy literature uses the circumplex [1]. They reach no state coordinate, no musical parameter and no rule. Section 7.4's worked explanation confirms it from the other side: it names relational stance, musical variability and session intensity, and is silent about arousal and valence, while section 7.4's own requirement is that the explanation name "every rule that fired and every value it read". Either they fire no rules, in which case the interaction budget spends forty per cent of the therapist's five taps on nothing, or the document's first fixture is incomplete.

And session intensity has no stated map either. Section 5.4 says the therapist's rating "replaces the computed ramp entirely", which says what it replaces and not what it becomes. A five-point ordinal has to reach $\tau \in [0,1]$ before the eight-marking discretiser of S3 section 2.1 can read it, and no sentence in the document performs that step for any of the five gradients.

**And no gate requires any of it.** G0 requires written anchors. G1 requires the agreement log, the record, determinism and the timbre check. Neither requires the triples fixed, the margin chosen, or a map from a gradient to a state coordinate. The instrument can pass G0 and G1 with its entire input side unspecified.

**BLOCKING.**

## 8. The first golden-output fixture asserts three things the corpus contradicts

**The claim attacked.** Section 7.4's worked explanation, which section 7.4 designates "the first fixture in section 8.4's golden-output suite": "Partner sits between leading and following, so no single mode was clearly indicated and **the music blends the two nearest** rather than jumping between them. **Session intensity at 4 of 5 set the volume to the fourth of eight levels** and **widened the chord movement by one step.**"

**Section.** 7.4.

**The evidence, first claim.** Section 6.3 puts Partner at or near the barycentre. Under modal interpolation at the barycentre, S3 states the result exactly: "at the barycentre the weights are equal and the result is the mean of the three modes" [3]. Revision 8 section 11 repeats it: "the weights are equal there, the result is the mean of the three modes" [5]. The fixture says the two nearest. Three is not two, and the difference is not a rounding: it is the difference between a two-way and a three-way blend on the one gradient the section is about. If Partner is instead placed strictly near rather than at the barycentre, the count depends on the triple and the margin, neither of which is fixed, per finding 7, so the fixture asserts a determinate behaviour that no document in the corpus can produce.

**The evidence, second claim.** S3 section 2.1 gives the eight-marking boundaries at $\tau$ below 0.10, 0.20, 0.35, 0.50, 0.65, 0.80, 0.90 and 1.00 [3]. The fourth of eight is `mp`, which requires $\tau \in [0.35, 0.50)$. A rating of 4 of 5 reaches that band under no natural map: $\tau = (g-1)/4$ gives 0.75 and the sixth marking; $\tau = g/5$ gives 0.80 and the seventh; the midpoint of the fourth quintile gives 0.70 and the sixth. The fixture's number is unreachable from its own input under every map the corpus supplies, and the document supplies none of its own, per finding 7.

**The evidence, third claim.** "Widened the chord movement by one step", attributed to session intensity, encodes S3 revision 9's relative harmonic form, in which a change of size $\delta$ in the trauma coordinate moves the chord $\operatorname{round}(k_{\max}\delta)$ positions from the chord already sounding. The author's decision of 14 September replaced it: the harmonic parameter is now $\operatorname{round}(23 \cdot f(\text{state}))$ from a fixed origin, a function of the current state alone, and $f$ is explicitly left open and is explicitly **not** a function of trauma, the one live candidate being $0.9r + 0.1H$ on the Real register and entropy [4], [7]. So the fixture attributes a harmonic effect to a rating that, under the current ruling, does not drive the harmonic parameter at all.

**Why a wrong fixture is worse than a wrong sentence.** Section 7.4 designates this passage the first fixture of the golden-output suite. A golden test written from it would enforce all three errors in continuous integration, which is the mechanism revision 8 section 6.3 names as what pins the engine for this surface [5]. A fixture is the one kind of prose in a requirements document that becomes executable.

**BLOCKING.**

## 9. Section 6.3 and section 14 give opposite accounts of the selector, and section 6.3 mandates the superseded one into the code comments

**The claim attacked.** Section 6.3: Partner is "where **argmax** is a three-way tie rather than absent, on the tripod S2 shows it is discontinuous along", and "Partner therefore lands in a set with undefined neighbours all around it ... That is either an elegant correspondence or a sign that the mapping is being fitted to the geometry, and the author should decide which before it ships." Section 14: "The tripod worry was posed against **argmax, which S3 replaced**: under modal interpolation the barycentre is the **most stable** point on the simplex rather than the least."

**Section.** 6.3 and 14.

**The evidence.** Both sentences are in draft 6. Section 6.3 is draft-4 text arguing from a selector S3 replaced; section 14 is draft-6 text recording that the replacement dissolves the argument. They cannot both stand, and the document contains no sentence reconciling them. The substantive question is settled in the corpus and settled against section 6.3: S3 proves the weight map Lipschitz on the closed simplex and states that "the jump set of the mode parameter under interpolation is therefore the single surface $\tau = 0.6$ and nothing on the simplex" [3], and revision 8 section 11 draws the conclusion, that Partner "sits at the one point the interpolation was built to make well defined" [5]. Section 6.3's "set with undefined neighbours all around it" is false under the rule $\Phi$ uses.

**The aggravating clause.** Section 6.3 opens the paragraph with "**Two warnings attach to this table and both must survive into the code comments.**" The first warning, that the mapping has no empirical warrant, is true and survives into revision 8's fourth condition. The second is the argmax passage, and the document requires it to be written into the source. An implementer following section 6.3 puts a superseded objection to a replaced selector into the code, permanently, beside a mapping the design has ruled on.

**And section 6.3 asks a question section 14 answers.** "The author should decide which before it ships" is addressed to a decision recorded in the same document twenty-five sections later, by reference to a ruling the author already has [5].

**BLOCKING.**

## 10. Three of the four conditions in section 14 do not match the ruling the section cites, and two of the four appear in no gate

**The claim attacked.** Section 14: "Four conditions attach and they are the live work: fix the five triples numerically, run the collapse check before shipping, **keep Partner away from a diatonic renderer until the rounding rule exists**, and record that the mapping never acquires warrant by being used."

**Section.** 14, against 13.

**The evidence on the third condition.** That is revision 7's condition and revision 8 replaced it, in the same section 11 the sentence cites. Revision 8: "Revision 7 required Partner to stay away from a diatonic renderer until the rounding rule existed ... **Under D58 there is no rounding rule inside $\Phi$ to wait for**: $\Phi$ emits the blended degree in cents and the notation renderer rounds ... **What replaces the condition is a disclosure, in three parts.**" The three parts are that the renderer declares on the face of the score whether it rounded half up or half to even, because at an exact tie the two return different scales and half to even returns none of the seven modes; that notation and audio disagree by up to a quarter tone inside the margin and the disagreement is printed beside the score; and that the experiment fixing the margin now runs on a synthesiser and needs no microtonal renderer at all [5]. The amendment note carries the same ruling independently: "S4 owes no rounding rule, because there is none inside $\Phi$ to owe" [4]. So the document's third condition waits on a rule that the decision of 14 September abolished, and drops three disclosures that replaced it.

**The evidence on the second condition.** "Run the collapse check before shipping" is stated in section 14 and nowhere defined. Section 7.6 refers to "the rule of section 6.3's collapse check", and section 6.3 contains no collapse check; the word collapse occurs twice in the document, at 7.6 and at 14, and never in 6.3. The check is defined only in revision 8 section 11, where it is a five-triple enumeration against the chosen margin and the live table, counting distinct modal outputs and requiring a declaration on the therapist's screen if fewer than five [5]. None of that reaches this document.

**The evidence on the gates.** Section 13 has four gates. Neither the numerical triples nor the collapse check appears in any of them. G2's condition is "Study 1 passed at its threshold on every shipping gradient, the S3-1 and S3-2 repairs landed, the modal tables untouched pending question 5a". Nothing anywhere requires the four live conditions of section 14 to be discharged before anything ships.

**BLOCKING.**

## 11. The Layer 3 default is reconciled in the design and in the arbitration, and nowhere in this document

**The claim attacked.** Section 6.2: "**the product is fully usable with every optional input switched off, and ships with all of them off by default.** That is a requirement and not a preference, and **it binds each input separately rather than the analyser as a class**."

**Section.** 6.2, 6.1 and 6.4.

**The evidence.** Revision 8 has Layer 3 on: "Layer 3 is built, **it is on**, and it is where the author's ask about expressing bias and psychometric traits actually lives", and "Psychometric traits are a Layer 3 output and they are not gated" [5]. The User Advocate raised the conflict as finding U12, the arbitration upheld it narrowed, and change 34 reads: "Add one sentence to section 6.3 saying which default governs the Instrument. The design has Layer 3 on and routes it into the shared renderers; PRD section 6.2 requires every optional input off by default and binds each input separately. **The PRD's rule governs the Instrument**" [6]. Revision 8 applied it, in its section 6.3: "The PRD's rule governs the Instrument. Layer 3 is off by default there, each input is enabled separately by the clinician, and shared renderers are an implementation fact rather than a licence for one surface's defaults to reach another" [5]. Its implementation order repeats it at item 8 [5].

**So the reconciliation exists, in the other document and in the ruling, and this one carries no trace of it.** Searched by value rather than by name: the word Layer occurs once in the entire body of the document under review, at section 7.6, and it is "Layer 2 material", about the DISC profile. There is no mention of Layer 3, of the bias detector, of psychometric-trait proposals, or of the shared renderers. None of the arbitration's forty-five changes is addressed to this document; the arbitration read five of its sections as context and ruled on none of them [6].

**Why the silence is a defect and not merely an omission.** Section 6.2's rule "binds each input separately rather than the analyser as a class", which is a strong and correct formulation, and its force depends entirely on the enumeration of inputs it binds. This document enumerates exactly one: the text analyser, in the section 6.1 diagram and nowhere else. The design routes a much larger Layer 3 into the same renderers, holding the bias detector, rhetorical-move proposals and psychometric traits. A rule that binds each input separately over a class of one binds one input. The design's sentence does the work, and the design's section 10a then adds that "this design does not rule on" the Instrument and that "its own gates stand unchanged until the author says otherwise" [5], so the governing sentence sits in a document that disclaims authority over the thing it governs. Nothing in the document under review would tell an implementer that Layer 3 exists, let alone that it must be off.

**BLOCKING.**

## 12. Section 11's own description of its four studies is false for three of them

**The claim attacked.** Section 11's opening sentence: "Each study has an entry condition, a design, **a statistic with a threshold set in advance**, and a claim it licenses on success."

**Section.** 11, 11.1 to 11.4.

**The evidence, checked study by study.** Study 1 has a design, two statistics, a threshold of 0.75 on the lower bound of a 95 per cent confidence interval, a size and a licence; it has **no entry condition**, "Why first" being a rationale for ordering rather than a condition. Study 2 has an entry condition, a design and a licence; its statistic is "Discrimination against chance with the effect size and its interval. Registered before data collection", which names **no threshold and no sample size**, and the study whose null the section most expects is therefore the study with no stated power and no pre-set pass mark. Study 3 has a design, a statistic, a planned size of 1,000 proposal rows per gradient and a shipping rule; it has **no entry condition**. Study 4 has an entry condition, "none", and after that it has **no design, no statistic, no threshold, no size and no licence**: it is four paragraphs describing a corpus, and it is the only one of the four whose subsection contains no statistic of any kind.

**Why it is blocking.** The sentence is the document's own guarantee that the roadmap is registerable, and it is the sentence a reader checks the roadmap against. Three of four fail it, and one of the three, Study 2, is the study that gate G3 turns on.

**BLOCKING.**

## 13. Study 1 names three different rater populations in one subsection, and borrows its size from a study whose credential it waives

**The claim attacked.** Section 11.1. Question: "Do **two credentialed therapists** watching the same material set the same gradients?" Design: "Raters are whoever the author can put in front of the material; **no credential is required** for a study nobody is going to publish". Size: "The planned design is 12 excerpts rated by **34 therapists**". Licence: "That the instrument's inputs are reliable between raters."

**Section.** 11.1.

**The evidence.** The question asks about credentialed therapists, the design waives the credential, and the size reverts to therapists. Those are three populations and the study can be run on at most one of them. The question as posed cannot be answered by the design as specified, and the licence as written, reliability between raters, is the only one of the three the design supports.

**The borrowed size compounds it.** "The Nordoff-Robbins study's 34 raters on 10 excerpts is the reference the design is set against ... it is matched here because a study of a new instrument in this field should not be smaller than the one it is measured against." Mahoney's 34 are **certified music therapists**, of whom 21 were Nordoff-Robbins trained and 13 were not, and the study's headline results are reported separately for those two groups, 82 per cent against 74 per cent within one point of the group mean [8]. The document's own section 3.3 quotes exactly that breakdown. So the comparability argument for the number 34 rests on a credentialed and partly specially trained panel, and the design that uses the number waives the credential. A study of uncredentialed raters is not "not smaller than the one it is measured against"; it is a different study at the same n.

**And the statistic does not survive 34 raters as written.** Quadratic-weighted kappa is a two-rater statistic. Thirty-four raters yield 561 rater pairs per gradient, and the document states no aggregation rule, no generalisation to multiple raters, and no definition of which 95 per cent confidence interval the 0.75 boundary is the lower bound of. The secondary statistic is specified precisely, "two-way random effects, absolute agreement, single-measures", and the primary one is not specified at all beyond its name.

**BLOCKING.**

## 14. The studies are designed so that a null is informative in two places and uninformative in two, and Study 1's failure rule makes gate G2 vacuously satisfiable

**The claim attacked.** Section 11.1: "A gradient ships as a rating item only if the lower bound of its 95 per cent confidence interval reaches 0.75 on both statistics." Section 13, gate G2: "**Study 1 passed at its threshold on every shipping gradient.**"

**Section.** 11.1, 11.2, 11.3, 11.4 and 13.

**Where a null is informative.** Study 1 and Study 3 are designed correctly on this axis, and it is worth saying so before the defect. Study 1's rule is a pass mark with a stated consequence for failure, which is that the gradient does not ship, so a null about a gradient removes it from the instrument rather than being absorbed. Study 3's rule is stronger still: "A gradient whose analyser proposal is overridden more often than chance would predict has its proposal disabled, which is a shipping rule and not a research finding", and the unresolved rate is reported separately rather than folded into agreement, which is the thing section 6.4 exists to protect. Both are rules where a negative result changes the product.

**Where it is not.** Study 2 has no threshold and no sample size, per finding 12, so a null from it is uninterpretable: the section says "This study is designed on the assumption that it may return a null too" and then specifies nothing that would distinguish a null from an underpowered study. The corpus already contains the cautionary case, which the section itself cites: a null at 48 participants, $p = 0.72$, effect size 0.08, which S1 reports and which cannot be cited [1]. Study 4 has no statistic at all and therefore no null to return.

**The gate defect, which is the sharper half.** G2 requires Study 1 passed "on every **shipping** gradient", and Study 1's rule is that a gradient that fails its threshold is not a shipping gradient. The two sentences together are satisfied by any outcome whatever, including the outcome where all five gradients fail, since the set of shipping gradients is then empty and the condition holds vacuously over it. The gate is written so that Study 1 cannot fail it. A gate that no result can fail is not a gate, and this is the gate that governs whether a claim may be made to a reader.

**A textual defect in the same paragraph, which is the most consequential paragraph in the roadmap.** The threshold sentence reads, in full: "On weighted kappa it is a house threshold, set at the same value for comparability and **not taken from, whose guideline addresses continuous data**; it is recorded as a choice so that a later reviewer can disagree with it rather than assume it was inherited." A clause is missing after "not taken from". The sentence's purpose is to record that the kappa threshold is not inherited from Koo and Li, and as printed it does not say so.

**And the source of the other threshold is unread.** Reference [16], Koo and Li, is the sole authority for the 0.75 boundary on the ICC. The citation ledger records it UNVERIFIED-OFFLINE: the PubMed URL "was fetched twice and returned only page metadata ... This is a fetch failure rather than a block, and it was not routed around", and the ledger calls it "the most consequential unverified reference in the document" [8]. I did not reproduce it either. The document's acceptance boundary is therefore a number whose record nobody in this programme has read, and this review reports it as unverified rather than assuming it.

**BLOCKING.**

## 15. Study 3 cannot accumulate from the first session, because section 6.2 ships the thing that writes its rows switched off

**The claim attacked.** Section 11.3: "**No separate recruitment is needed: the agreement log accumulates from the first session**, indexed to a clinical moment by construction." Section 6.5: "**Every moment where the analyser proposed writes one row**, whatever happened next."

**Section.** 6.2, 6.5 and 11.3.

**The evidence.** Section 6.5 conditions every row of the log on the analyser having proposed. Section 6.2 requires the analyser off by default and defends the requirement at length: "It means the product's core value never depends on an unvalidated component, and it means a therapist who distrusts the analyser is not a therapist who cannot use the tool." Section 6.1's diagram labels the analyser "optional, off by default". A therapist who takes the document at its word and never enables it produces a log with zero rows, indefinitely. Study 3's design assumes the opposite and gives it as the reason no recruitment is needed.

**Why this is structural rather than a wording slip.** Section 4.2 locks dual input as one of four decisions on the ground that "It is the only one of the three options that generates the data the programme has never had", and section 11.4 makes the same log the replacement for the corpus route section 4.3 gave up. Two of the four locked decisions and two of the four studies rest on a data stream that the product's own default switches off, and the document nowhere states how many sessions with the analyser enabled the roadmap needs, who enables it, or what happens if nobody does. Study 3's planned size of 1,000 proposal rows per gradient is stated with no account of where the rows come from.

**BLOCKING.**

## 16. Study 4 contradicts itself in four paragraphs about what its corpus is

**The claim attacked.** Section 11.4: "What replaces it is narrower and better: **session-derived data from real use, indexed to a real clinical moment, rated by a credentialed human**, with an agreement pair attached ... A thousand rated clinical moments is a different kind of object." Against, two paragraphs later: "**The corpus here is generated dialogue and rated scenes**, so the only condition is that the generator of section 10a exists and the rating anchors are written."

**Section.** 11.4.

**The evidence.** Those are two different corpora and the subsection asserts both. The first is the draft-4 corpus, written when the document specified a tool for real clients; the second is the draft-5 replacement under the scope ruling. The revision deleted the entry condition and left the description. The consequence is not cosmetic: "a real clinical moment" and "rated by a credentialed human" are the two properties the paragraph offers as what makes the replacement "narrower and better" than the twenty-five plays it gave up, and the entry condition withdraws both of them. On the corpus the entry condition describes, the comparison in the paragraph's last sentence does not hold, because generated dialogue rated by whoever the author can find is not obviously a different kind of object from twenty-five plays at line resolution; it is the same kind of object with a rating attached.

The dangling reference to "section 10a" compounds it, per finding 1: the generator that is the sole entry condition is specified in another document, and this one does not say which.

**BLOCKING.**

## 17. The determinism claim is true of a codebase section 4.3 replaces, is written in the present tense about one that does not exist, and is false for one of six parameters under the revision it cites

**The claim attacked.** Section 7.5: "The keyed generator ports unchanged. S4 establishes that the score path already has zero unseeded draws and that eleven keyed draws run against eleven key constructions [4]. **Every rendered passage is a pure function of the state, the configuration and the seed**, and the seed is in the session record." Section 7.4's fixture: "setting the same five ratings again produces the same music."

**Section.** 7.4, 7.5 and 13.

**What holds.** The S4 facts are exact and I confirm them at source. S4 section 7: `src/lib/deterministic.ts` supplies a keyed generator with a `SEED_ALGORITHM_VERSION`; "Four files import it, and the three on the score path make 11 keyed draws and 11 key constructions between them"; and "Fifty-four unseeded draws remain in the source, in sixteen files. **None is reachable from a rendered score**" [2]. Section 7.5's derived requirement, that the record carry the version quartet and the rendered audio where a passage matters, is correct and is S4's own condition applied.

**What does not.** Three things, and the first is the one the section's tense conceals.

S4's finding is about the MPN Conductor. Section 4.3 of this document decides "**A new codebase**" and section 9 specifies which nineteen artefacts reach it, of which `deterministic.ts` is one of four ported and two of the three score-path files that make the eleven draws, `score_orchestrator.ts` and `GeniusComposer.ts`, are in the repaired set with their defects named. Determinism on a rebuilt score path with two repaired call sites is a property nobody has established, and the paragraph asserts it in the present tense with a citation to a measurement of the thing being replaced. "Every rendered passage is a pure function" is a forward statement. Gate G1 requires "determinism reproducing a passage from its seed and versions", which is the right gate; section 7.5 states the gate's outcome as a fact before the gate.

Second, the claim is false for one parameter of six under the revision the document cites. Reference [3] is S3 revision 9, and in revision 9 the harmonic parameter "is not a function on $\mathcal{P}$ at all: it is a function on $\mathcal{P} \times \mathcal{P}$ and on the chord already sounding", with a first-frame problem S3 records and does not resolve [3]. A passage whose chords depend on the previous chord is not a pure function of the state, the configuration and the seed. This is repaired, but only by the author's decision of 14 September and the amendment that carries it, which re-express the parameter as $\operatorname{round}(23 \cdot f(\text{state}))$ from a fixed origin and which the document does not cite anywhere [4], [7]. The citation ledger flagged the gap on the day: "`MPN-S3-AMENDMENTS-2.md` of 14 September now amends sections 2.3, 2.5, 3, 4 and 5, which is after this draft and is not reflected in it" [8].

Third, the configuration the claim quantifies over is incomplete. The interpolation margin $\delta$ and the harmonic function $f$ are both unfixed, per finding 7 and per revision 8's implementation order, which lists them as the two things the design still owes the Instrument, "the interpolation margin and, new today, the function $f$ inside the harmonic parameter, which the author's decision left unnamed" [5]. Neither appears in the version quartet section 7.5 specifies, which is the seed, `SEED_ALGORITHM_VERSION`, the ruleset version and the build. A record that does not name the margin cannot reproduce a passage rendered at a different margin, and "ruleset version" is not stated to include it.

**What survives, and it is the good half of the section.** "The seed alone does not achieve that, and S4 says why", and the conclusion that "a version quartet is a promise and a waveform is a record", are correct, are S4's own condition, and are the strongest sentences in section 7. The finding is against the sentence above them.

**BLOCKING.**

## 18. Section 11.2 widens S1's negative claim past the class S1 enumerated, and the document's own section 9.2 supplies the counterexample

**The claim attacked.** Section 11.2: "The first gave 24 participants a mean appropriateness of 4.2 on a five-point scale, and **it tested a Symbolic-to-Lydian assignment that matches no shipped module**: the only positive listener evidence in the corpus was collected on a table the programme never adopted."

**Section.** 11.2, against 9.2.

**The evidence.** S1 says it narrower: "the assignment it tested was Symbolic to Lydian, the first of the four tables in section 8.3, **which matches no shipped calculus module**" [1]. The word calculus is doing the work and the document drops it. S1 section 8.3 describes that first table as "the version in the assertions register, in the transformation rules of the reference implementation and in the training-data generator" [1], and S3 section 2.3 tabulates it by file: "the live pitch table, `leitmotif_transformation_rules.ts` ... Symbolic: Lydian, Mixolydian" [3]. That is a shipped module, it is on the pitch path, and section 9.2 of the document under review lists it by name in the repaired set.

So the sentence is false as written, and the counterexample is two sections earlier in the same document. What S1 established is that the tested assignment matches no shipped **calculus** module, which is a claim about the Python and browser calculus modules of S1 section 8.3, and which is true. The widened form asserts something about every shipped module, a class the enumeration behind it never covered.

**Why it matters for the study rather than only for the sentence.** The point the paragraph is making is that the corpus's only positive listener evidence was collected on a table the programme never adopted, and that point is weaker than stated: the table is in the live pitch path, which section 9.2 repairs rather than drops, and which the entry condition of the same study leaves untouched pending question 5a. The evidence is not orphaned; it is attached to the table the rebuild will read.

**BLOCKING.**

## 19. Section 5.2's binding on the session record is contradicted by section 7.3's own schema table

**The claim attacked.** Section 5.2: "**The naming rule binds every surface a client or a non-specialist reader can reach**: the rating interface, **the session record**, the exported documents and the section 7.4 explanation. **None of them uses trauma, entropy, Real, Symbolic, Imaginary, curvature or health.**"

**Section.** 5.2 and 7.3.

**The evidence.** Section 7.3's RG-MBI table, component 3a, reads "Music selection | **The state and the rules that acted on it**, captured automatically". The state is the nine-component state of S2, whose named coordinates include trauma, entropy and the register triple [1], [3]. A record that captures the state and the rules that acted on it, automatically, is a record that carries those names unless something strips them, and nothing in the document does. Section 7.3's component 2 is handled carefully, with a rule that any system-supplied text is the section 7.4 rule chain and cites nothing; component 3a gets no such treatment.

**Not blocking**, because the repair is a sentence in 7.3 specifying that 3a is captured in the section 5.2 vocabulary, and because section 5.2's rule is right and section 7.3 is the surface that has to comply with it rather than the other way round. It is recorded because it is the second place, after finding 3, where the document's own new material breaches its own naming rule, and two is a pattern.

**Not blocking.**

## 20. The roadmap names three incompatible populations and the design reads the document as specifying a fourth

**The claim attacked.** The scope line: "Theory and internal research on synthetic characters and generated or scripted dialogue. **Nobody is assessed, nothing is deployed, no claim is made to anyone.**" Against section 11.4, "session-derived data from real use, indexed to a real clinical moment"; section 11.1's question, "two credentialed therapists"; section 11.1's design, "no credential is required"; and section 3.1, "The primary user. A board-certified music therapist."

**Section.** Front matter, 3.1, 11.1, 11.3 and 11.4.

**The evidence, kept strictly to coherence.** This is not a scope finding and no regulatory claim is made in it. The point is that four sections describe four different sets of people and the document never says which is the one. Section 3.1 makes the primary user an MT-BC and derives two product requirements from the credential's own definition. Section 11.1 asks its question about credentialed therapists and then waives the credential in the next paragraph, per finding 13. Section 11.3 says the log's ratings "are judgements about characters in generated or scripted material". Section 11.4 says the corpus is "session-derived data from real use", per finding 16. The scope line says nobody is assessed and nothing is deployed.

**And the design reads it a fifth way.** Revision 8's implementation order states: "**MPN-PRD-01 specifies a tool for real therapists and real clients**, which is not what the scope ruling covers, so its own gates stand unchanged until the author says otherwise" [5]. That is revision 8, written on 14 September, reading draft 6, whose draft 5 status note says the real-client premise "is withdrawn". A companion document written the same day, by a process that read five sections of this one, took the opposite view of what this document is about. Whichever reading is right, one of the two documents is wrong about the other, and the interface between them is where the Instrument's gates live.

**Not blocking** on its own, because it is a coherence defect with an obvious repair, which is one sentence in section 11 saying who rates and who is rated, and because findings 13, 15 and 16 already block on the specific consequences. It is recorded because the reconciliation in finding 11 also runs across this interface and a second disagreement there is worth the author's attention.

**Not blocking.**

## 21. The seed corpus for the rating anchors cannot carry the judgements the anchors need

**The claim attacked.** Section 11.1: "**The frame library's 232 author judgements seed the anchor descriptors** and are not rating data." Section 9.1 ports the library "for a specific and limited purpose. It is **the only set of human judgements the programme has**".

**Section.** 9.1 and 11.1.

**The evidence.** The 232 author judgements are trauma and entropy literals. S4 section 4.5 establishes it and the document's own section 9.1 quotes it in both rows of the ported table: "the trauma and entropy are the author's judgements". The registers in the library are the analyser's output, not the author's, which the same S4 section establishes and which section 4.2 of the document restates. The anchors being seeded are for five gradients, of which relational stance is the IAP Autonomy gradient and musical variability is the IAP Variability gradient. The library carries no Autonomy judgement and no Variability judgement, so it can seed anchors for at most one of the five, session intensity, by way of trauma, and even that requires the gradient-to-trauma map finding 7 shows is missing.

**A second and smaller fact belongs with it.** S3 section 2.3 records that seven of the 232 annotations contain an escaped apostrophe that every reader of the library truncated, and that on three of the seven the truncation removed the only register keyword the annotation carried [3]. That is a correction to the library's derived figures rather than to the author's literals, so it does not change the count of 232, and it is recorded here so that a reader who seeds anchors from annotation text knows seven of them were read short until 14 September.

**Not blocking**, because the anchors have to be written by hand in any case and the library is a starting point rather than a derivation. It is recorded because section 11.1 offers the library as what makes the anchors cheap, and it does not.

**Not blocking.**

## 22. Reproduction and citation hygiene, reported together

**The claims attacked.** The front matter: "**Reproduces** | `05_DATA/03_generators/s5_salvage.py`, which prints the carry-over manifest of section 9 and asserts that every artefact it names exists at the path it gives". And: "**Length** | About 7,500 words of body text, counting alphabetic tokens outside tables and code fences". And reference [18].

**Section.** Front matter, 9 and 15.

**What reproduces.** I ran `s5_salvage.py` and it prints the manifest and tallies 4 ported, 7 repaired, 2 rewritten, 6 dropped, nineteen artefacts, which is exactly section 9's arithmetic. The assertion that every artefact exists at its path passes. Section 9's substance is sound and this finding is not against it.

**What does not.** The path in the front matter does not resolve: `05_DATA/03_generators/` holds one file and it is `a8_form_analysis.py`. The script is at `/home/claude/gen4/s5_salvage.py`. Reference [18] carries the identical defect for `s6_timbre_capacity.py`, which the citation ledger records as the document's one BROKEN reference and which revision 8 has already corrected at its own [10] [5], [8]. Two of the document's two reproducibility pointers therefore point at nothing, in a programme whose whole argument for scripts over prose is that a reader can re-run them.

**And the length figure does not reproduce.** Counting alphabetic tokens outside tables and code fences by the document's own stated method returns **8,705**, against "about 7,500". That is sixteen per cent over. It is a small thing and it is a stated figure in a document whose discipline is that stated figures reproduce.

**Not blocking.**

## Disposition

**STOP. Eighteen blocking findings of twenty-two.**

STOP rather than REVISE for three reasons, stated so the author can disagree with each separately.

**The document's internal wiring is broken in a way that a pass over the findings will not repair.** Nine cross-references point into deleted subsections, and four of those nine are the document's only statement of a mechanism, including the enforcement of the rule section 4.4 calls the removal of the most dangerous artefact in either codebase. The first golden-output fixture asserts three things the corpus contradicts. Two of the five ratings the therapist is required to set reach no musical parameter, and the map from the other three to the state is nowhere stated. Sections 6.3 and 14 give opposite accounts of the mode selector. A gate governing claims to a reader is satisfied by every possible outcome. These are not findings against sentences; they are findings against the joints, and the joints were made by two rounds of deletion that nobody has since read across.

**Both of draft 6's two additions are keyed to a superseded revision.** Section 7.6 cites revision 7 of the design, imports "the whole of" a section whose headline claim revision 8 struck, offers as its remedy an item revision 8 withdrew and calls "small" what revision 8 calls an open problem, and asserts that a channel is live which revision 8 establishes at path and line is not. Section 14's ruling is taken from the same revision and its third condition is the one revision 8 replaced. The ledger of 14 September flagged the revision problem and said section 7.6 should be re-read against revision 8 before the next draft [8]. Draft 6 is that next draft.

**And the one question this review was asked that the document answers well is the one that shows the pattern.** The two-node timbre case does survive revision 8's narrowing, exactly and permanently, because 2.000000 is the channel's diameter and the exhaustive corner search needs no seed. The document is right about it. It is right about it while its stated rule for attaining that separation is false, while the check it requires in the build cannot detect most of the deafness it is for, while the channel it calls live is not, and while the remedy it calls small is withdrawn. A true conclusion carried by three false premises and one withdrawn citation is the specific failure mode four papers of audit were written to stop, and it is the reason this document should go back rather than forward.

**What would change the disposition.** Findings 1, 7, 8, 9, 10, 11 and 14 are repairs internal to the document and are, individually, small. Findings 5, 6 and 17 require re-reading three sections against revision 8, the amendment note and the decision log, all of which are dated 14 September and all of which the document predates by a day. Findings 12, 13, 15 and 16 require section 11 to decide who rates, who is rated, where the log's rows come from and what each study's threshold is, which is authorial work and not drafting. Finding 3 requires a definition and a number that neither this document nor the design currently has. None of it is large. All of it is upstream of anything shipping.

## References

[1] J. McKenney, "The McKenney-Lacan psychometric calculus," MPN-S1, `S1-mckenney-lacan-theory.md`, revision 3, with `MPN-S4-AMENDMENTS.md`. Section 8.3 on the four register-to-mode tables; the two listener studies at its empirical position.

[2] J. McKenney, "The application," MPN-S4, `S4-application.md`, revision 2. Section 7 on determinism and the fifty-four unseeded draws; sections 2.1, 4.2 to 4.5 on the deleted quantities.

[3] J. McKenney, "The mapping: from psychological state to musical material," MPN-S3, `S3-mapping-phi.md`, revision 9. Sections 2.1 to 2.6 and 4, read in full for this review.

[4] `MPN-S3-AMENDMENTS-2.md`, 14 September 2026. Amendment 1, $\Phi$ does not round; amendment 2, $k_{\max} = 23$ and the absolute form; amendments 3 and 4 on the bias layer.

[5] MPN-DESIGN-01, `DESIGN-UNIFIED-FRAMEWORK-rev8.md`, revision 8, 14 September 2026. Sections 4.4, 5a, 5b, 6.3, 10, 10a and 11.

[6] `ARBITRATION-DESIGN-R7.md`, 14 September 2026. Forty-five findings ruled, disposition STOP; changes 34 and 35 and findings U11 and U12 are the ones this review turns on.

[7] `DECISION-LOG-2026-09-14.md`, 14 September 2026. Decisions D-2026-09-14-A and D-2026-09-14-B.

[8] `CITATION-LEDGER-PRD.md`, 14 September 2026. Eighteen references, VERIFIED 10, VERIFIED-NARROWED 1, UNVERIFIED-OFFLINE 1, BROKEN 1, SELF 5.

[9] `05_DATA/03_generators/s6_timbre_capacity.py`, run at `/home/claude/gen6/s6_timbre_capacity.py` for this review. The separation table, the corner search, the audible-fraction worked pairs and the capacity inversion all reproduce.

[10] `05_DATA/03_generators/s6_bias_layer.py`, run at `/home/claude/gen6/s6_bias_layer.py` for this review. Thirty entries, eighteen signatures, eight collisions, twenty of thirty entries involved, fifteen of sixteen drafted mappings naming a coordinate.

[11] `s5_salvage.py`, run at `/home/claude/gen4/s5_salvage.py` for this review. Tally 4, 7, 2, 6; nineteen artefacts; every path asserted and present.

[12] Computed for this review and not previously in the corpus: an exhaustive enumeration of all 120 unordered pairs of the sixteen DISC-cube corners under the S3 section 2.6 contrast basis, establishing that exactly three pairs attain the diameter 2.000000 and that all three differ on four coordinates, while every pair differing in opposite senses on exactly two coordinates returns 1.414214; and an audible-fraction census over four pairs, establishing that a pure-shape difference of DISC distance 0.0800 returns an audible fraction of 1.000 at a timbre distance of 0.0800.
