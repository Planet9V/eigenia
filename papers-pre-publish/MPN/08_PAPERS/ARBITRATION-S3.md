| Field | Value |
|:---|:---|
| Designation | MPN-S3-ARB |
| Subject | `08_PAPERS/S3-mapping-phi.md`, revision 6, with `MPN-NOTE-03-implementation-audit.md` |
| Reviewers | Skeptic (three rounds: revision 2 REJECT with eight blocking, revision 3 REVISE major with four, revision 4 REVISE minor with two), Constraint Guardian (REVISE, four blocking), User Advocate (REVISE major, five blocking) |
| Date | 2026-09-13 |
| Disposition | **ACCEPT WITH CONDITIONS.** Eleven conditions, all local, none requiring new research, measurement or a further four-reviewer round |
| Body length verified | 8,241 words on an independent count of alphabetic tokens outside tables, display maths, inline maths and code spans, against the paper's disclosed 8,448. The disclosure is honest and conservative |
| Re-review | Conditions C1 to C6 verified by the Skeptic in a pass limited to those conditions. Conditions C7 to C9 confirmed by the Constraint Guardian. The User Advocate is not reconvened |

## 1. Disposition

**ACCEPT WITH CONDITIONS.**

Nineteen blocking findings were raised against this paper across four reviews and three revisions. Seventeen are discharged, most of them at the root rather than at the sentence. Every figure in the paper has been recomputed by a reviewer working in code that imports none of the paper's own, twice, and twice the recomputation corrected itself in the paper's favour. One verification instrument was found unsound, deleted, and its failure mechanism written up in the artefact it was meant to support. That is a stronger evidential record than either S1 or S2 carried at its gate.

Two blocking findings are not discharged, and the revision that fixed a third introduced two new errors of the same class the paper has now failed on four times. Those, with the length overrun and six constraint residues, are the conditions below. All are single-sentence or single-table edits against evidence already in hand, and all are mechanically checkable. That is what distinguishes accept-with-conditions from revise, and the programme cannot afford to reconvene four reviewers on a paper whose arithmetic now reproduces exactly.

## 2. Decision log

### 1. Length and structure: accept the overrun, cut, or split

**The question.** 8,241 body words on my count against a series convention of 4,500 to 7,000 and the 7,500 ceiling the S2 gate set. Revisions 5 and 6 added, at reviewer insistence, a strike procedure, a Why column for sixteen mappings, a table of A4's four candidate tables, an eight-item work queue, a worked frame, a three-term glossary and the commensurability figures. Each of those additions was correct and each made the paper longer.

**The positions.** The Constraint Guardian would not accept the overrun and would not pay it out of substance, holding that roughly 590 words of acknowledged three-pass duplication covers it, and that granting S3 a higher ceiling than S2 was given, for a paper carrying less that is irreducible, sets the wrong precedent. The User Advocate holds that the overrun is implementation audit which `MPN-NOTE-03` already duplicates verbatim, and would move the modal chains out. The Skeptic, asked for a ruling, says the audit is the paper's only empirical content, is load-bearing for section 3's ceiling and section 6's ordering constraint, and must stay; he would pay the overrun out of the paper's narration of its own drafts and its non-load-bearing commentary, and would grant only the uniform move of chains to the note.

**Ruling. No split. No exemption. A ceiling of 7,500 words, the same ceiling S2 was given, and the overrun paid by six named cuts totalling about 810 words, none of which removes a finding, a figure, a proof or a drafted row.** The cuts are condition C7.

**Reason.** The split is refused on the Skeptic's second and fourth grounds, which the Guardian's own section 3.9 independently confirms. Section 3's identifiability ceiling is a statement about which parameters read which coordinates, and section 6's ordering constraint, that the section 2.3 repair precedes any modal study, is the single most consequential sentence in the paper for the programme's schedule. Both are conclusions of the audit, not inputs to S4. A claim of the form "A4 is untested and untestable on the current build" cannot be carried by a sentence of consequence with its warrant in another document, and this paper's own revision history is the proof: every substantive error found across three rounds was an audit conclusion asserted while its evidence sat elsewhere or had not been gathered, and each was caught because the chain was walkable at the place the claim was made. A second designated paper would also need its own four-reviewer gate, which delays S4 for material that already has an evidence artefact.

The exemption is refused on the Guardian's precedent ground, which I accept in full. S2 carried four proofs, a register instrument audit and an identifiability bound, and was held to 7,500 with its residual 16 per cent left open as a condition on the author rather than granted. S3 may not clear a higher bar. The overrun is recoverable without cutting anything adjudicated, and where the Guardian and the Skeptic nominate the same material for cutting, as they do for the revision narration and for section 2.4's restatement of Theorem 1, that material goes.

One fence, because the paper's own counting rule excludes tables. Two of the ordered cuts convert running prose into tables, which serves the author and shortens the body at once. That is permitted here only because the material is genuinely tabular, being options against consequences. It is not a general payment device, and a subsequent revision that moves argumentative prose into table cells to buy headroom will be treated as having failed this condition rather than met it.

### 2. Whether every blocking finding is discharged

**Ruling.** Seventeen of nineteen discharged, two not, and one discharged in two of the three places it was raised.

| Review | Finding | Status |
|:---|:---|:---|
| Skeptic rev 2 | B1, hard-coded register triple | Discharged at root, section 2.3 and the note |
| Skeptic rev 2 | B2, Ionian reachable, `lookupMode` and the Lyapunov branch | Discharged, five decision points now enumerated |
| Skeptic rev 2 | B3, false novelty against S2 sections 6.4 and 6.5 | Discharged, section 3 opens by crediting S2 |
| Skeptic rev 2 | B4, timbre literature misread | Discharged, three agreed dimensions with a disputed third correlate |
| Skeptic rev 2 | B5, B4 debt equivocation | Discharged, the discharge is withdrawn and a narrower result put in its place |
| Skeptic rev 2 | B6, "as the implementation emits" mislabelled | Discharged, four labelled rows, specified against shipped |
| Skeptic rev 2 | B7, six rhythmic cells where there are seven | Discharged |
| Skeptic rev 2 | B8, the tie remedy is not a decision | Discharged, closed form, four properties, margin declared free |
| Skeptic rev 3 | BL-1, "the registers reach nothing" | Discharged, section 3 now states the three consumers they do reach |
| Skeptic rev 3 | BL-2, register freedoms reach the output "everywhere" | Discharged, the $2\delta-\delta^2$ measure is enumerated against its closed form |
| Skeptic rev 3 | BL-3, jump set wrong in both halves | Discharged, the $\tau = 0.6$ surface restored, the boundary non-jump demonstrated |
| Skeptic rev 3 | BL-4, `s3_callgraph.py` unsound and certified sound | Discharged, script deleted, withdrawal written up with the mechanism named |
| Skeptic rev 4 | BL-A, "every live register reading is a threshold at 0.6" | **Discharged in sections 1 and 3, not in section 6.** See entry 5, condition C3 |
| Skeptic rev 4 | BL-B, retracted claim standing above its own retraction | Discharged, and the retraction narration correctly removed to the revision note |
| Guardian | BL-1, decision 4 claimed implemented and absent | **Half discharged.** The conflict is now reported; the operative half is not. See entry 7, conditions C1 and C2 |
| Guardian | BL-2, D3 taken rather than drafted | Discharged in the body; the metadata still over-claims. See entry 8, condition C1 |
| Guardian | BL-3, shipped A8 pair without effective contributions | Discharged. Section 3's caution is generic rather than specific; condition C8 |
| Guardian | BL-4, tension term without effective contribution or path qualification | Discharged in substance, with a new figure that departs from the audit unannounced. See entry 10, condition C9 |
| Advocate | U-B1, the sixteen mappings cannot be struck | **Discharged in four of five parts. Part (d) is not.** See entry 6, condition C4 |
| Advocate | U-B2, the two author decisions are not decidable | Discharged for A4. Discharged in substance for $\delta$; condition C7 orders the table |
| Advocate | U-B3, no work queue | Discharged, section 7's eight-row table with paths, owners, blocks and an order |
| Advocate | U-B4, three sections closed to a composer, no worked example | Discharged. The demand for four bars of notation is declined; see entry 11 |
| Advocate | U-B5, no-evidence statement misplaced, section 5 without status | Discharged but for one sentence; condition C10 |

### 3. The headline claim is still stronger than the section that establishes it

**The question.** Not raised as blocking by anyone. The Skeptic raised it at revision 4 as NB-4 and the Guardian as NB-5, each non-blocking, each against a different sentence.

**Ruling. Elevated to a condition.** Three sentences assert that no mode decision point reads a register, and the paper's own section 2.3 disproves all three four paragraphs later.

Section 1: "Five places decide a mode and none of them is the register-reading one." Section 2.3: "**no mode anywhere in the running application is a function of the registers**." Section 6: "at present none of the five decision points in the source reads a register." Against those, section 2.3 line 101: "`lookupMode` is the only selector that reads the frame's actual triple, and its answer is written to every stave and read by nothing." `lookupMode` is one of the five, it is a function of the registers, it produces a mode, and it runs on every frame. What is true, and what the section actually proves, is that **no mode that reaches a score is a function of the registers**.

**Reason for elevating what two reviewers marked minor.** This is the paper's headline finding, it is the sentence a reader will quote, and it is the fourth instance of the one error class this paper has failed on in every round: a universal negative about the code, asserted at a width the evidence does not reach. Two reviewers treating it as cosmetic is itself evidence that the class is hard to see. It is a four-word repair in three places and it costs nothing.

### 4. Section 3 miscounts the register readings, in the passage written to fix BL-A

**The question.** Not raised by any reviewer. Found at arbitration.

**Ruling. Blocking-grade, and a condition.** Section 3 reads: "Four are thresholds at 0.6, two in `selectTransformation` and three in the key branch, and on the simplex at most one component can exceed 0.6 so they are well defined; the fifth is linear."

Two plus three is five. The Skeptic's revision 4 evidence gives the same arithmetic: two register thresholds in `selectTransformation` and three in the key branch, plus the tension term, which is six readings, five of them thresholds. The sentence should read "Five are thresholds at 0.6 ... the sixth is linear."

**Reason.** It is an off-by-one of exactly the kind the Skeptic found at B7 in revision 2 and which the paper corrected there, sitting inside the paragraph written to discharge BL-A. It is cheap, it is checkable against `s3_register_reach.py`, and a paper whose case rests on its counts cannot publish one that fails on inspection.

### 5. Section 6 still carries the claim the Skeptic's BL-A retracted

**Ruling. Not discharged, and a condition.** Section 6: "A study on the registers more broadly is in a different position: they do reach the score, but only through thresholds at 0.6 on single components, so what such a study could test is the threshold and not the ordering A3 asserts."

That is verbatim the proposition BL-A found false. Sections 1 and 3 were corrected; section 6 was not, and section 6 is the section that governs study design, which is where the error does the most damage. The true picture is more favourable to the theory than the sentence states: the tension term reads the Real linearly, reaches the harmony readout as a continuous number and drives a five-way chord-type choice, so a register study has more to work with than a single threshold.

**Reason.** Overstating a defect is the same failure as overstating a result, and here it would narrow a study the programme is about to pay five professionals to run.

### 6. The author cannot strike a mapping without failing the paper's own check

**The question.** The User Advocate's U-B1(d). Decision 7 assigns exactly one task to the author: strike out what is wrong in sixteen mappings.

**Ruling. Not discharged, and a condition.** Section 4.1 asserts that the script "asserts that the drafted content covers exactly the gaps". Section 4.2 instructs: delete the row, delete the entry from `DRAFT_MAPPINGS`, record it in `08_PAPERS/MPN-S3-STRIKES.md`, and adds "a strike without the deletion makes it fail, which is the intended behaviour".

The implication is that a strike *with* the deletion passes. It does not. The gaps are derived from the Atlas and the implementation, neither of which changes when the author strikes. After one strike the drafted set covers fifteen of sixteen gaps and the exact-cover assertion fails. The paper names a strike register and never says the script reads it.

**Reason.** Naming the artefact and adding the Why column, which revision 6 did well, fixes four fifths of U-B1. The fifth is the part where the author performs the task and the paper breaks. The repair is the one the Advocate specified: `s3_bias_reconcile.py` reads `MPN-S3-STRIKES.md`, and an entry recorded there as struck with a reason counts as covering its gap, so that the invariant becomes "every gap is covered by a drafted mapping or by a recorded strike". One sentence in section 4.1, one in the script.

### 7. Decision 4: report and refuse, or take a position

**The question.** The shipped pitch table gives the Imaginary a trauma partner. Decision 4 of the governing log rules that the Imaginary has no partner. Section 2.3 reports the conflict, declines to resolve it, and points at question 5a in the listening pack under decision 5.

**The positions.** The Constraint Guardian's BL-1 held that decision 4 was claimed as implemented and was absent from the paper entirely, and required either its restoration with the "reassign freely" sentence amended, or its removal from the metadata. Revision 6 restored the paragraph. Nobody has ruled on whether reporting without resolving is enough.

**Ruling. Reporting without resolving is acceptable, and it is the only correct handling. Two consequential edits attach.**

**Reason.** Three grounds, each sufficient. First, decision 5 of the same log is explicit that the trauma switch "is not a deferral" but a live question put to five professionals, and its note records that six of eight synthetic raters produced a reading that "fits none of the four tables in the corpus". If the raters are right, the second stage is a jump to a crisis mode per register rather than a dim within a pair, which changes A4's mechanism and not merely its table, and takes the question of whether the Imaginary has a partner off the board in its present form. A paper that resolved the conflict now would pre-empt question 5a, which decision 5 forbids. Second, decision 4 is the theory's position, carried into S1 section 8.3 and register entry A4; the code disagreeing with the theory is an implementation defect, and S3's standing discipline, applied consistently to seven other defects, is to report and assign rather than repair. Item S3-8 assigns it to the author rather than to S4, correctly, because it is the one item on the queue where the decision may be what is wrong. Third, the Guardian's own model for this situation is section 2.1's handling of decision 6: state the norm, report the shipped departure, assign the repair outward, and let the norm stand. Section 2.3 now follows it.

The two edits. The metadata claims decision 4 as implemented; the paper does not implement it, it reports a conflict with it and assigns it. And the sentence the author will act on at a keyboard, "A4 may reassign the modes freely; it may not mix cardinalities", still names one constraint on A4's admissible space and declares the rest free, which implicitly overturns the other. Decision 4 is a second standing constraint and must be named in that sentence. This half of the Guardian's BL-1 is the operative half and it is not discharged.

### 8. D3: is the paper consistent, and is defining what D3 assigns to S3

**The question.** Section 2.3 now says it defines option (c) rather than selecting it. Section 7's "Decided here" still lists the definition among what is decided.

**Ruling. Consistent, correct, and exactly what D3 assigns. One metadata line must change and one clause must be added.**

**Reason.** D3 reads: "(c) preserves decomposability and is the only one determinate on a tie; **S3 must define an interpolation per modal pair**." The obligation placed on S3 is the definition. The selection among (a), (b) and (c) sits with the author under the governing rule that the five S2 decisions are his. Section 7 lists the definition as decided and says in the same sentence that "the choice of (c) over (a) and (b) remains the author's", which is the distinction the Guardian's BL-2 asked for, made on the page. There is no inconsistency: what is decided is the thing D3 assigns, and what is open is the thing D3 reserves.

Two residues. The metadata's "Decisions implemented: 4, 6, 7 and 8 ... ; D3 of the S2 decision list" flattens the distinction the body now draws, and over-claims on both 4 and D3. And D3's words are "per modal pair", while the paper supplies a general per-degree rule over the whole simplex. The general rule is strictly stronger, covering every pair and the three-way case that a per-pair enumeration would miss, but the paper never says so, and a literal reading of D3 against the paper leaves the obligation looking unmet. One clause closes it.

### 9. The self-correction record: revision note or body, and is the method now sound

**The question.** Revision 1 described a modal table no rendered score has used. Revision 3 drew a false global negative about the registers from a mode-name search. Revision 4 generalised over four of its own script's five register readings. The narration of those errors has been moved to a Revision note metadata field.

**The positions.** The Skeptic's revision 4 ruling nominated exactly this move, worth 400 to 600 words, observing that it is what S2 does, and that it removes the BL-B problem by construction. The Advocate would shorten the field further.

**Ruling on disposal. The Revision note field is the right place and the move is upheld.** Precedent is dispositive: S2's metadata carries a Revision note of the same kind, narrating a false lemma, a circular proof and four withdrawn priority claims, and the S2 gate accepted that disposal for that material.

**Reason.** Errors of drafting method corrected before publication are not results. A body that narrates them invites the reader to treat a corrected claim as still contested, and in this paper it did precisely that: the Skeptic's BL-B found a retracted claim standing thirty lines above its own retraction, in the section where a reader looks for what the section establishes. The disposal is upheld with one carve-out, which the paper already satisfies: where an error's cause is a method the paper still relies on, the method must stay at the point of use. `MPN-NOTE-03` section 4 states the rule and names both failures, and the paper's closing paragraph records that `s3_modes.py` now enumerates lines rather than checking a list of names, "and is the reason this paper carries a revision 3". That is the correct split and it is done.

**Ruling on soundness. The method is sound and the remaining empirical claims can be trusted. The discipline of scoping a universal claim to the search that supports it is not yet reliable, and that gets a condition rather than a caveat.**

**Reason.** On the positive side: all eight revision 2 findings fixed at the root; all four revision 3 findings fixed at the root; both revision 4 findings fixed in the places named. Every figure recomputed by a reviewer importing none of the paper's code, with two corrections in the paper's favour, one turning on JavaScript's half-up rounding deciding three tuples of 555. An unsound instrument found, deleted, and its mechanism written up. Provenance checked line by line and found unusually good. Nothing in the paper now rests on a number that has not been reproduced independently.

On the negative side: all four errors, plus the two I have found at entries 3 and 4, are one error. A negative is asserted over the whole implementation on the strength of a search narrower than the claim. It has now recurred at four widths, and it recurred again in the revision written to eliminate it. No amount of further reviewing fixes a failure mode that survives being named three times; a structural safeguard does. Condition C5 is that safeguard.

### 10. The paper corrects the commensurability audit without saying so

**The question.** Not raised as blocking. Found at arbitration, under the Guardian's BL-4.

**Ruling. A condition.** Section 3 states that "on the 164 frames of 232 where the analysis text carries no Real keyword the Real is exactly zero". The commensurability audit, a governing document, gives 104 at rows 4 and 15 and at its section 6 item five, and action T10 corrects the degenerate frame count to 107. The paper's 164 is a different and probably better quantity, being frames where the Real specifically is zero rather than frames where the whole triple is, and the paper's closing paragraph says `s3_commensurability.py` "corrects two figures the audit reports" without naming either.

**Reason.** Correcting a governing document is legitimate and this correction is probably right. Doing it in prose, unnamed, against a document that other papers cite, is not. S2 emitted `MPN-S2-DECISIONS` with an explicit replacement table so the register could be updated from a document rather than from a reading of prose, and the Guardian's NB-1 asked S3 for the same mechanism on three register entries. The two are one condition: S3 owes a short amendment artefact carrying the three register amendments and the two audit corrections, each stated as a replacement.

### 11. Findings declined, and findings wrongly raised

**Declined: the Advocate's four bars of notation** (U-B4(d), second half). The worked frame is delivered and it is the right thing; the notation is not. No renderer exists for the interpolated codomain, decision 11 leaves the generator written but unapplied, and the S1 arbitration established that the four DISC coordinates on the ingest path are generated by `Math.random()`. Printing four bars would manufacture a concrete artefact of exactly the kind this paper's evidential position forbids, and would be the most quotable thing in it. The two-column frame, real library values, specified against shipped, is the honest version and is better than notation would be. One clause is owed saying why the timbre point is absent from that frame, which is condition C10.

**Declined: the Advocate's recommended default for $\delta$** (U-B2). A default that no renderer can sound is a number the author would inherit without hearing. The paper's alternative, to hear the two extremes of one blended pair at $\delta = 0.05$ and $\delta = 0.20$ on a synthesiser that takes cents, needs no notation and is a better instruction. The table of consequences is ordered under C7; the default is not.

**Declined: the Guardian's NB-3**, that the influence layer must not carry `bias-00N` identifiers. Decision 8's requirement is that the influence principles "do not share an index with the biases", which means the Atlas CB index, and the Guardian concedes the substance is met. The implementation ids are provenance, and renaming them in the paper would sever the trace to the source they are read out of. One clause of disclosure instead, folded into C10.

**Wrongly raised, and retracted by the raiser:** the Skeptic's revision 2 B6 recount of 536 / 1,608 / 10.65 bits, which came from substituting two of three shipped laws and keeping the Python module's eight markings; and the revision 2 confirmation of `getMusicalParameters`, a function that does not exist, which both the paper and the reviewer were repeating from a superseded script. Both are recorded here so that neither returns.

**Superseded rather than wrong:** the Skeptic's revision 2 N2, that the nullity is two on the robust reading, which dissolved once the timbre literature was read correctly and the rank became three.

**Over-reached:** the Guardian's BL-3 in its third part. Section 3's shipped rows are labelled as shipped and the first caution says they count emission over the whole state square. The labelling requirement is met. The underlying point, that on the composer path entropy is pinned and fragmentation is a function of trauma alone, is true and is stated nowhere near those rows, so the clause is still ordered at C8, but as a completion rather than as a breach.

### 12. What must happen before S4 begins

**Ruling. Four things, all small, and two ordering constraints that bind S4 without blocking its start.**

Before S4 begins: the eleven conditions applied and verified as set out in the metadata table; the register amendment artefact of condition C9 in existence, because S4's account of what it must build reads the assertions register and three entries have acquired content that is not in it; a commit pin in both S3 and `MPN-NOTE-03`, because S4's work queue is eight defects located at path and line and the scripts abort "if the lines of the implementation it transcribes have changed", which is a guarantee relative to nothing citable until a commit is named; and `MPN-NOTE-03` cleaned of its superseded duplicate extractions, because it is the document an S4 engineer will actually work from and it currently carries three versions of the same two passages under headings that differ only by a revision number.

Binding S4 once it starts, and stated in S3 so that S4 inherits them: items S3-1 and S3-2 may be implemented immediately and are correct under every candidate answer to question 5a, because they are plumbing rather than table content, but **no modal table may be implemented under A4 until question 5a returns**, since 5a may change the mechanism and not merely the assignment; and **no drafted bias mapping may be implemented before the author's strike pass**, since decision 7 exists to remove some of them and sixteen of the thirty are proposals by a reader of the Atlas.

What does not block S4: the margin $\delta$, the rounding rule, $k_{\max}$, the instrument-family set $F$ and the timbre partition are all correctly assigned and correctly recorded as open, and S4 can be written around each. The DISC instrument of decision 9 and the elicitation protocol of D2 block the programme's ability to measure anything, which is a standing condition of the whole series and not a gate on S4.

## 3. Conditions

Each is actionable, specific, and checkable without reconvening the panel.

**C1. Correct the metadata's decisions line.** Replace "Decisions implemented: 4, 6, 7 and 8 of the decision log of 12 September 2026; D3 of the S2 decision list" with a line that claims 6, 7 and 8 as implemented, states that decision 4 is reported as conflicting with the shipped table and assigned at item S3-8, and states that D3's drafting obligation is discharged while the selection among (a), (b) and (c) remains open.

**C2. Name decision 4 as the second standing constraint on A4.** In section 2.3, amend "A4 may reassign the modes freely; it may not mix cardinalities" to carry both constraints: cardinalities may not be mixed, and under decision 4 the Imaginary takes no trauma partner, so any table that gives it one is outside A4's admissible space as the decision log stands.

**C3. Re-scope four over-general negatives.**
Section 1, "Five places decide a mode and none of them is the register-reading one", becomes "Five places decide a mode and none of the ones that reach a score reads a register."
Section 2.3, "no mode anywhere in the running application is a function of the registers", becomes "no mode that reaches a score is a function of the registers."
Section 6, "at present none of the five decision points in the source reads a register", takes the same correction.
Section 6, "they do reach the score, but only through thresholds at 0.6 on single components", is replaced by the corrected statement section 3 already carries: the register readings that reach the mode-adjacent parameters are thresholds at 0.6 on single components, and the tension term is the exception, reading the Real linearly, reaching the harmony readout as a continuous number and the chord type through cuts at 0.2, 0.4, 0.6 and 0.8.

**C4. Correct the register-reading count in section 3.** "Four are thresholds at 0.6, two in `selectTransformation` and three in the key branch ... the fifth is linear" becomes "Five are thresholds at 0.6, two in `selectTransformation` and three in the key branch ... the sixth is linear." Verify the count against `s3_register_reach.py` section 2 and make the script print the count so that the sentence and the enumeration cannot drift again.

**C5. Scope every universal negative to its search.** For each remaining claim in S3 or `MPN-NOTE-03` of the form no, none, never or every, applied to the implementation, either narrow the claim to what the search establishes or name, in the same sentence or in the closing paragraph, the script whose enumeration is its warrant and the class of object that script enumerates. This is the structural safeguard for the one error class that has survived being named three times, and it is the condition the Skeptic should check first.

**C6. Make a strike survivable.** In section 4.1, state that `s3_bias_reconcile.py` reads `08_PAPERS/MPN-S3-STRIKES.md` and that the invariant is "every Atlas entry with no musical mapping is covered by a drafted mapping or by a recorded strike", so that a strike recorded with its reason keeps the check green. Amend section 4.2's strike procedure to match. Amend the script.

**C7. Bring the body to 7,500 words or below, by these cuts and no others.**

| Cut | Where | Approximate saving |
|:---|:---|---:|
| Compress section 1's four bolded findings to the headline sentence plus a section pointer, dropping the restated detail | §1 | 180 |
| Move the chain narration of "Where the modes actually come from" to `MPN-NOTE-03`, keeping the finding, the 36.0 per cent figure and the three-line repair, so that §2.3 matches the treatment §2.1 and §2.4 already give | §2.3 | 200 |
| Convert the $\delta$ consequences from running prose to a four-row table, $\delta$ against blended area, Lipschitz constant and worst-case rounding error, keeping the sentence about hearing the two extremes on a synthesiser that takes cents. This also completes U-B2 | §2.3 | 160 |
| Reduce the restatement of S2's Theorem 1 to a citation plus the two realised figures | §2.4 | 120 |
| Compress the three influence-layer differentiators to one sentence each, decision 8 having already been cited for the reasoning | §5 | 150 |
| Compress the "choice-supportive as pilot" paragraph to a clause, the Why column now carrying its content | §4.2 | 60 |

Total about 870 words against a required 741. No finding, figure, proof, drafted row or caution is cut. Tabulation is permitted here because the material is options against consequences; it is not available as a general device for buying headroom.

**C8. Complete the commensurability qualification at the point of use.** Add one clause to section 3's first caution recording that the shipped rows are computed over the $(\tau, H)$ square, and that on the composer path entropy is pinned at 0.5, so the shipped fragmentation stage there is a function of trauma alone.

**C9. Emit a register and audit amendment artefact.** A short document, on the model of `MPN-S2-DECISIONS`, carrying replacement text for three register entries and two audit rows: A4 gains the cardinality precondition and, under C2, decision 4 as a constraint on its admissible space; B4 gains the narrower measured result, an upper bound of three on the timbre channel alone, with the estimate and the recovery study left standing; A8 gains the off-clip conditional figure of $+0.2072$ with the reason it is not a property of the pair; and the commensurability audit's rows 4 and 15 are corrected by naming the two figures `s3_commensurability.py` recomputes, including the distinction between the 107 frames that produce no state at all and the 164 on which the Real specifically is zero.

**C10. Four disclosures, one clause each.** Under section 2.1, replace "Stated as a discrimination" with "As a property of the band widths", since the present wording borrows section 6's listening-test vocabulary for a fact about a ladder. Under the worked frame in section 3, state why no timbre point appears: the DISC coordinates are not measured, decision 9 leaves them unset, and the ingest path generates all four with `Math.random()`. Under section 5's table, record that the six are carried under the implementation's own `bias-` identifiers as provenance and that decision 8's separation is from the Atlas CB index. Under section 4.4, say that social proof is in section 5 and is not one of the sixteen, so the declared coupling crosses into the influence layer and is not a strike operation.

**C11. Pin and clean.** Name the implementation commit in the metadata of both S3 and `MPN-NOTE-03`, on the model of S2's "Implementation claims pinned to". Delete the three superseded extraction blocks from `MPN-NOTE-03` section 2, leaving one version of each passage. Correct "A sixth script" to "An eighth script" in section 3 of the note, and bring its Reproduces field into line with the scripts it describes.

## 4. Exit criteria

All four reviewers invoked, with the Skeptic's three rounds treated as a sequence whose operative disposition is revision 4's REVISE minor. Every blocking finding accepted, discharged, declined or elevated with a reason. Two findings raised at arbitration that no reviewer raised. Disposition ACCEPT WITH CONDITIONS, binding and final.

On application of C1 to C11, verified as set out in the metadata table, S3 clears the gate and S4 may begin under the two ordering constraints of entry 12.

## 5. Addendum of 13 September 2026: supplementary ruling on condition C7

Entered on the coordinator's report that conditions C1 to C6 and C8 to C11 are applied in revision 7, that every cut C7 prescribes has been made, and that the residual against the 7,500 ceiling is 918 words on the paper's counter. Verified independently: revision 7 measures 8,220 alphabetic tokens outside tables, display maths, inline maths and code spans, against 8,241 for revision 6, so about 330 words were cut and about 310 of mandated disclosure added. Section 1's four findings are now headline plus pointer, the $\delta$ consequences are a four-row table, section 2.3's chain narration is a finding plus a note reference, and Theorem 1 is a citation. The report is accurate.

### 13. The C7 estimate was wrong, and the error is the Arbiter's

**Ruling. C7's figure of 870 words is withdrawn. Four of its six cuts had already been taken in revisions 5 and 6 before I read the paper, and I ordered them again without checking. The two genuinely available cuts yielded about 160 words, which is what they were worth.**

**Reason.** I read revision 6 and costed the cuts against what I supposed revision 4 had contained, not against what was in front of me. That is an estimate asserted at a width the evidence did not reach, which is the error class this paper has been rejected for three times and which condition C5 exists to prevent. It belongs on the record as the Arbiter's, not as a shortfall in the revision. The coordinator was right to stop at the authorised cuts and ask rather than go looking for 883 more words in adjudicated content.

### 14. The precedent, read correctly, disposes of the residual

**The question.** Entry 1 held that S3 may not clear a higher bar than S2. The coordinator's three options are to raise the ceiling for this paper, to move section 3's worked frame and section 2.3's candidate tables into the note, or to split.

**Ruling. The ceiling stands at 7,500 words for the series. It is not raised for this paper and no per-paper ceiling is created. S3's residual is recorded as an open condition on the author rather than paid by cuts the editor is not entitled to take, and on that footing S3 clears the gate.**

**Reason.** Entry 1 stated the S2 precedent correctly and then drew the wrong consequence from it. What the S2 gate actually did was hold S2 to 7,500, direct that the overrun be paid out of the decision list, the corpus inventory and the paper's litigation of its own revisions, and then, when the residual proved to consist of adjudicated content, leave it open: "Closing that gap means cutting adjudicated content, so it is put to the author as an open condition rather than taken by the editor." S2 cleared its gate at 8,732 words with the ceiling as its twelfth and only unapplied condition. The precedent is therefore not "reach 7,500" but "be held to 7,500, pay what is payable, and carry the irreducible residual as an open condition".

S3 is in better standing than S2 was at that point, on the same measure:

| Paper | Body words | Over the 7,500 ceiling | Composition of the residual |
|:---|---:|---:|:---|
| S2, revision 4, cleared | 8,732 | 1,232, or 16.4 per cent | four proofs, the register instrument audit, the identifiability bound, the attachment table |
| S3, revision 7, on the paper's counter | 8,418 | 918, or 12.2 per cent | the implementation audit, four reviewer-mandated apparatus additions, three condition texts |
| S3, revision 7, on the Arbiter's counter | 8,220 | 720, or 9.6 per cent | as above |

A paper that is shorter than its predecessor in absolute words, and a third less over the ceiling in proportion, cannot be refused the disposition its predecessor was given.

**The two alternatives are refused, on their merits and not only on the precedent.** Moving the worked frame and the candidate-table list into `MPN-NOTE-03` would relocate the two remedies the User Advocate identified as the paper's largest deficits, U-B4 and U-B2, into an artefact with no designation and no gate, and would reopen both findings. Buying headroom by demoting reviewer-mandated remedies is compliance in form and its opposite in substance. The split is refused on the grounds of entry 1, which are unchanged and which the coordinator's own description strengthens: the material named for extraction, section 2.1's shipped path, section 2.3's five decision points, section 2.4's shipped pair, section 3's register-reach enumeration and section 7's work queue, is the audit entire, and what would remain is one sentence of consequence per parameter, which is a specification with nothing in it that can be checked against anything outside the author's intentions. Two papers in this series have been rejected for exactly that condition.

### 15. Two further cuts are authorised, and no others

**Ruling. About 75 words are still genuinely available and are authorised. They are not required, and no further cut is authorised at all.**

The first: section 2.3 states twice why D3's options (a) and (b) fail, once under "The tie" and again under "Defined, per D3 option (c)", both times as the gap that does not release at zero and the first frame with no previous register to hold. The doubling was created by the reframing condition C2 and BL-2 required, and one statement is enough. About 45 words.

The second: the "One precondition" paragraph re-narrates the whole-tone cardinality clash that the candidate-table list four paragraphs above already displays. Tighten to the constraint and the two standing limits on A4. About 30 words.

**Everything else in the body is adjudicated.** The coordinator is directed not to go looking for more. If a subsequent reading finds further duplication, it is reported to the Arbiter and not cut, because at this point every remaining paragraph is either a finding, a figure, a proof, a drafted row, a caution, or the text of a condition this gate imposed, and an editor trimming among those is deciding what the reviewers decided.

### 16. A finding for the series, directed at S4's gate

**Ruling, recorded for the S4 arbiter and not binding on S3.** This gate imposed on S3 a strike procedure, a Why column for sixteen mappings, a table of A4's four candidate tables, an eight-item work queue, a worked frame, a three-term glossary, commensurability figures at four points, and then conditions C5, C9 and C10. Every one of them was correct and every one made the paper longer. A ceiling set before the conditions are known, and enforced after they are applied, asks a paper to choose between two forms of compliance.

S4's arbiter should therefore cost the conditions against the ceiling at the time the conditions are set, and either fund them out of a stated allowance or name what the paper is to drop to pay for them. The failure here was not the paper's and it was not the ceiling's; it was that the two were settled in the wrong order.

## 6. Revised exit criteria

Conditions C1 to C6 and C8 to C11 are applied and verified. C7 is discharged as follows: every cut it authorised has been made; its 870-word estimate is withdrawn as the Arbiter's error; the two cuts of entry 15 are authorised; and the residual, 918 words on the paper's counter and 720 on the Arbiter's, is closed as an open condition on the author on the footing S2 was given, to be paid only by cutting content this gate adjudicated and therefore only by the author's own decision.

**S3 clears the gate.** S4 may begin, under the two ordering constraints of entry 12: items S3-1 and S3-2 may be implemented at once, no modal table may be implemented under A4 until question 5a returns, and no drafted bias mapping may be implemented before the author's strike pass.

One edit closes the file. The Length field of S3's metadata must state the disposition rather than the appeal: that the ceiling is 7,500, that every authorised cut has been taken, that the residual consists of adjudicated content, and that it stands as an open condition on the author under ARBITRATION-S3 addendum entry 14, on the same footing as S2's. That is condition C12, and it is the last one.

---

## Author's ruling, 13 September 2026, superseding entries 1 and 13 to 16

The author, on being shown the length accounting, set the ceiling aside: *"Up to 12000 words or more is fine, there is no hard ceiling."*

That disposes of the question the addendum was written to answer, and it disposes of it in a direction neither the Guardian nor I had available. The Guardian's position was that a convention should bind; mine was that the convention should bind at 7,500 because S2's precedent put it there. Both of us were reasoning about a constraint that belongs to the author of the series and that neither reviewer had standing to set. The ruling is recorded here rather than argued with.

**What follows, and what does not.**

Entry 1's substantive holding stands and is strengthened. The audit belongs in S3 because section 3's ceiling and section 6's ordering constraint are conclusions drawn from it, because every error in this paper's history was caught by having the chain next to the claim, and because a companion note carries no designation and no gate. What entry 1 could not do, having ruled the audit load-bearing, was pay for it; the ruling removes that difficulty. Revision 8 accordingly folds the chains back into section 2.3 and the shipped dynamics path back into section 2.1.

Entry 14's authorisation of "about 75 further words, no more" is withdrawn as moot, along with the direction not to look for more.

The eleven conditions stand and are applied. C7's cut list is withdrawn as spent: four of its six cuts had already been taken before I read the paper, which is the error entry 13 records against me, and the remaining two are now reversed along with the rest.

**One consequence worth recording for the series.** The cuts C7 prescribed were made, and then reversed. Nothing was lost, because a paper is a file and reversal is cheap. But three reviewers spent effort specifying which paragraphs to remove, and a coordinator spent a revision removing them, over a constraint the author had not been asked about. Entry 16's finding is therefore widened: a reviewer should not enforce a numerical convention against a paper whose author is reachable, without first establishing that the author still wants it enforced. S4's gate should ask before it rules.

**What revision 8 adds beyond restoration, and its standing.** Revision 8 is not only a restoration. Section 2.5, which had been thin since revision 1 and which the Skeptic flagged twice as breaking section 2's own template, is now computed: the Cayley graph is built from the generators and its diameter of 5 confirmed independently of MPN-2, the $LR$ alternation is shown to be Hamiltonian so that "position along the chain" is well defined, $k_{\max}$ is bounded to 5 through 23 with the reason at each end, and the proposed move is shown to be **non-monotone in the very metric it cites**, which is a defect in the proposal rather than in the implementation and is new. Section 2.2 now compares the within-band tempo spans against published discrimination thresholds and reverses an earlier hedge: the spans are very likely audible, and what makes tempo categorical in effect is the proportion between step and span rather than any inaudibility. Section 3 carries a second worked frame. Two new items, S3-9 and S3-10, are added to the work queue as author decisions.

That new material has not been through a gate. It is accepted here on the same footing as the rest of revision 8, subject to one condition.

**C13.** The new material in sections 2.2, 2.5 and 3, and the two new queue items, go to the Skeptic for a limited pass before S4 begins. The pass covers the harmony computation, the tempo-discrimination comparison, the second worked frame, and nothing else. If it returns blocking findings they are applied to S3 and the paper does not re-enter a full gate, because no earlier finding is reopened by them.

---

## Addendum 2: the C13 pass, and a correction older than this paper

The limited pass condition C13 required returned four blocking findings on revision 8's new material. All four were verified against the code and the sources, all four were correct, and all four are applied in revision 9.

**C13-1.** Section 2.5's lower bound on $k_{\max}$ was unsupported and its stated reason was false. "A full sweep spans the graph's diameter" at $k_{\max} = 5$ is wrong, and the table's own column said so: five chain positions cost three generator steps and the greatest distance reachable at $k_{\max} = 5$ is 4. Computed properly, the antipode sits at chain offset 11 from twelve triads and 13 from the other twelve, so the diameter is unreachable below 11 and unreachable from every triad below 13. Revision 9 states those bounds and names the false one as false.

**C13-2.** Section 2.5's proposal reads a state *change* and the *realised* chord, so it is a function on $\mathcal{P} \times \mathcal{P}$ and on the previous bar, which is precisely the dependence section 2.3 uses to rule out hysteresis and the dead band, and it has the same first-frame problem. A11's decomposability is therefore asserted for a mapping one of whose parameters does not have it. Revision 9 states this in section 2.5 and adds it as work-queue item S3-11.

**C13-3.** "The ingest path generates all four with `Math.random()`" was false in the pinned tree and self-contradictory as written. `inferDISC` returns `null` under decision 9 and names the `Math.random()` banding as the previous implementation. Corrected in both places it appeared.

**C13-4.** The second worked frame's selection criterion was false over the library, and this is the finding that matters most. The script's regex required a multi-line record layout, matched none of `additional_plays.ts`, and so drew a superlative over 109 of the 232 frames while claiming the library.

That fourth finding opened something larger, and it is recorded here because it reaches back past S3.

**A parser defect common to every script in this programme.** Investigating C13-4 showed that the annotation field was being read everywhere by a non-greedy pattern that stops at the first quote character and does not honour backslash escapes. Seven of the 232 annotations contain an escaped apostrophe; on those seven the pattern returned a truncated string, and on three of them the truncation removed the only register keyword, which the shipped analyser then read as no register at all.

The consequence is that **the degenerate-frame count this programme has reported since S2, 107 of 232, is wrong. It is 104.** The on-simplex count is 128 and not 125, and the vertex count 101 and not 98. The tie count of 21 and the single interior point are unchanged, so decision D3, S3's tie analysis and every property of the interpolation rule stand. What moves is every proportion computed against the wrong denominators, S2 sections 6.4 and 6.5, and the register simplex figure, which has been regenerated.

Three observations about this, for the series rather than for this paper.

It vindicates the commensurability audit twice. The audit's figures of 104 frames and an sd of the Real of 0.3993 were both right; S3 revision 7 issued corrections against both, and both corrections are withdrawn. Where the audit and a later script disagreed, the audit was right each time, and what was wrong with the audit was a label and not a number.

It was not found by reading. It was found because a script was made to assert that the number of records it parsed equalled the number of annotation fields present, and the assertion failed. Before that assertion existed, a parser seeing 47 per cent of the library had been producing figures that looked entirely ordinary. That is the argument for a count assertion in every parser that reads a corpus, and it is now in `s3_frames.py`, which is the single reader the other scripts call.

And it is the same error class this paper has been correcting in itself since revision 1, at a different scale. Revisions 1, 3 and 4 each drew a conclusion from a search narrower than the claim. This one drew figures from a parser narrower than the corpus. The rule section 7 states, that a negative claim reaches no further than the class its script enumerates, now has a companion: a quantitative claim reaches no further than the records its parser actually read, and the only way to know that is to make the parser count.

**Disposition.** Revision 9 is accepted. No further gate is required: C13's findings are applied, the parser correction is issued against S2 and the figure through MPN-S3-AMENDMENTS, and nothing in the correction reopens a finding already discharged. S4 may begin under the ordering constraints already set, with one addition: S4 must use `s3_frames.py` rather than parsing the library itself.
