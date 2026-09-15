| Field | Value |
|:---|:---|
| Designation | REVIEW-S5-S6-skeptic |
| Reviews | MPN-S5, `S5-dialogue-use-cases.md`, draft revision 1 [1]; MPN-S6, `S6-expression-aid.md`, draft 1 [2] |
| Role | Skeptic. Mandate: attack the claims, verify every figure against the record, find the contradiction. Not the author, not a copy editor, not a regulatory reviewer |
| Scope taken as given | The author's ruling of 13 September 2026: theory, internal private use, synthetic material, no people, no regulation. There is a private internal market defined by the author's own use cases. No finding below is legal, regulatory, consent-based or compliance-based, and none turns on the status of a real person under any instrument |
| Governing document | MPN-DESIGN-01 revision 8 [3]. Both papers are use-case papers against it and it governs wherever either could be read as disagreeing |
| Figures permitted | `VERIFICATION-2026-09-14.txt` [12] only, plus what a named generator prints when run |
| Scripts run for this review | `s6_bias_layer.py` [14], exit 0, 330 lines of output; `s6_three_clef.py` [13], exit 0, 209 lines; `s6_floor_share_units.py` [15], exit 0, 112 lines. All three run from the container corpus with no environment variable and no argument |
| Script not run | `s6_timbre_capacity.py` [16]. Its converged table is taken from [12] section E.7b. Its inversion rule was read from source at `:550` to `:558` and applied to that table by hand; the volume, mean fibre length, diameter and vertex count were recomputed independently from the contrast matrix. Every timbre statement below says which of those it rests on |
| Findings | 28, of which 18 are blocking. 13 tagged S5, 10 tagged S6, 5 tagged BOTH |
| Disposition, MPN-S5 | **REVISE**, 9 blocking |
| Disposition, MPN-S6 | **STOP**, 9 blocking |
| Date | 14 September 2026 |

## What was verified, and what reproduced

Before the attack, the ledger of what held. This matters because the two papers are unusually well sourced for first drafts and a reader of the findings below should not take them for a general verdict on the arithmetic.

Every corpus figure both papers take from `s6_three_clef.py` reproduced exactly on the re-run. The exclusion counts of 31,078 rows read, 3,425 excluded and 27,653 retained assert and print. The event densities print at 4.4952, 33.8963 and 26.6491 per cent with King Lear excluded and at 4.5500, 32.2425 and 25.7039 per cent on all seven, which is both sets to the precision the arbitration states each at [9], [12]. The entropy census prints fourteen distinct values, 22,611 rows at exactly 0.3 for 72.8 per cent, and 9,482 of 10,020 tempo-band changes with 0.3 on one side for 94.6 per cent. The metre labels print m1 0, m2 23,086, m3 3,229, m4 1,182 and m5 156, and the tempo bands print three and therefore two cuts. The coverage split prints 69.231, 50.113 and 39.007 per cent on the three single plays and 8.2, 26.2 and 48.1 per cent on the three anthologies under a heading that calls the second block not coverage figures. The dyad-churn table prints row for row as both papers give it. Change 19's limit, that none of the seven files is a moderated exchange, is printed by the script itself and is not an editorial addition.

`s6_bias_layer.py` reproduced thirty entries with thirty naming a coordinate and zero naming none, eighteen distinct signatures, eight collisions, twenty of thirty entries involved, the channel census at TEXTURE 8, HARMONY 7, MELODY 6, RHYTHM 3, DYNAMICS 3, TIMBRE 1, MODE 1 and INTERVALS 1 totalling thirty, and the locality partition at twenty-two frame-local against eight historical with the eight named exactly as MPN-S5 section 4.6 names them.

`s6_floor_share_units.py` reproduced every cell of MPN-S6's section 3 table: the top-two pairs, the coverage columns at 64.6, 40.4 and 30.0 by turns and 71.0, 53.2 and 42.3 by words, the substantial-speaker counts at 7, 18 and 22, the rank-change counts at 4, 17 and 17, and the spreads at 6.4, 12.8 and 12.3 points.

From the contrast matrix directly: volume of the reachable set 2.0, mean fibre length 0.5, maximum fibre length 2.0, diameter 2.0, and fifteen distinct images of the sixteen cube vertices, one of which the script's section 1 identifies as interior, giving fourteen vertices in a six plus eight arrangement. Every figure MPN-S5 reference [12] attributes to the timbre script on those points is correct.

The inversion of the converged table at resolutions 0.80 and 0.90 gives fourteen and ten, which is what MPN-S5 section 3.6 says. The inversion at 1.45 and 1.60 gives three and two, which is what MPN-S5 section 6.5 says. The inversion at 1.00 does not give what MPN-S5 section 6.5 says, and that is finding 3.

## Findings, MPN-S5

### 1. The four obligations narrow the interface of $\Psi$ and leave the open problem where it was. BLOCKING

**Claim attacked.** Section 2 says the paper turns "specify $\Psi$" from an open job into "a bounded one", and section 7.3 says the four obligations plus one acceptance criterion are "the most useful thing this paper produces" [1].

**Evidence.** Test each obligation against the question an implementer would ask, which is whether they could know they were done.

Partiality is closeable in its first two clauses and not in its third. An implementer can declare a sub-domain and can print which sub-domain an output used. The third clause, that an absent measure render distinguishably from a zero one, has no acceptance criterion anywhere in the corpus, and the companion paper says so in terms: MPN-S6 falsifier five puts it that if $\Psi$ cannot make a below-floor difference audibly distinct from an even exchange, then D28 holds in the visual and textual channels only and the musical renderer is not self-sufficient, and adds "The test must ask. Nobody has" [2]. So obligation one is closed on two clauses and open on the one that carries the honesty claim, and MPN-S5 does not carry that qualification into section 7.3.

Arity is the one obligation that is genuinely closeable. Defined at arbitrary speaker count, reduction outside the mapping, whole-work normalisers labelled, resolution floor as a parameter: an implementer can verify all four structurally.

Non-degeneracy at two is not an obligation at all. It is a disjunction between two unmade decisions, and the paper's own section 8 files it as item S5-5 with the status "Open, the author's or the designer's" [1]. An implementer reading section 7.3 cannot know when they are done because the choice that would let them know has not been made, and the paper is explicit elsewhere that it has not.

Causality and incrementality is closeable in its first clause, which is D66 restated, and not in its second. "Expressible in two or three quantities on one stave" is B4's estimate, and MPN-S5 section 6.5 itself records that B4 "survives its gate only because the mechanism that would have falsified it was struck, so revision 8 produces no evidence about B4 and leaves it an unmeasured estimate carrying more weight than before" [1], [3]. An obligation whose bound is an unmeasured estimate the paper elsewhere calls weakly held is not a criterion an implementer can meet.

The single acceptance criterion is the sharper problem. Section 7.3 says the generator of item 1 gives the question "does $\Psi$ recover the structure the generator put in" an answer, and that setting the target accuracy is ordinary work. Three things are missing and the paper names all three in other places without collecting them here. The generator does not exist. The target is not set. And "the structure" is undefined, because $\Psi$ has no codomain: MPN-S6 section 8 states the position without hedging, that there is "no function, no acceptance criterion, no stated codomain, no channel count, no jump set and no discretisation" [2], [3]. None of the four obligations touches a codomain, a channel count, a jump set or a discretisation, which is to say that none of them touches the part of the specification that is actually the open problem. What musical material carries what relational quantity is untouched by all four.

The four are real necessary conditions and they are worth having. They are not jointly sufficient, they are not individually closeable in three of four cases, and the word for what has happened to the open problem is that it has been given a boundary condition, not a boundary. Section 8's own item S5-4, "Write the $\Psi$ acceptance criterion as four sub-criteria", concedes that the acceptance criterion section 7.3 announces does not exist yet, which makes the announcement a description of work rather than a result.

**Fix.** Section 2 and section 7.3 stop claiming boundedness. The honest form is already in section 2's own sentence, that the four "narrow the specification problem", and the narrowing should be stated as what it is: four constraints on the interface, none on the codomain, with the codomain named as the part that remains open and the acceptance criterion named as owed rather than supplied.

### 2. "The author's picture is deliverable now" is false while $\Psi$ does not exist, and the paper says the opposite two sections earlier. BLOCKING

**Claim attacked.** Section 6.3: "Generated material and recorded material are known in full before a note renders, so the score is computed ahead and played against the dialogue, and the author's picture is deliverable now on exactly the material the scope ruling makes primary" [1].

**Evidence.** The author's picture is the three-clef running score. Two of the three staves are $\Phi$ staves and require a Layer 2 rating, and the third is the $\Psi$ stave. $\Psi$ does not exist. The paper's own section 2 opens with "Every use case in this paper describes a surface whose interaction mapping does not exist", and its own section 6.6 lists what the surface cannot do without ever repeating it. Section 4.2 gets the sentence right for the same material two sections earlier: "the running score is available on recorded material today in principle, and what blocks it is $\Psi$ and nothing about the recording" [1]. Section 6.3 drops "in principle" and drops the blocker. The companion paper gets it right too: MPN-S6 section 6 says "the author's picture of a score running with the dialogue is deliverable as soon as $\Psi$ exists" [2].

The sentence is inherited from design section 6.2, which carries the same defect [3]. That is a reason to correct it in both, not a reason to keep it in the use-case paper, because a use-case paper is where a reader goes to find out what they can have.

**Fix.** Section 6.3 takes section 4.2's wording or MPN-S6's. The claim that survives is about the partition, that the known-in-advance material removes the latency objection, and it is a different claim from deliverability.

### 3. The timbre inversion at a resolution of 1.0 gives eight characters and the paper says seven. BLOCKING

**Claim attacked.** Section 6.5: the window for six is $(1.0898, 1.4142]$ and "outside it the answer changes rather than degrades, holding seven at a resolution of 1.0, three at 1.45 and two at 1.6" [1].

**Evidence.** The converged continuous table in [12] section E.7b, identical at three seeds at 600 polished starts, is 2.000000, 1.512776, 1.424955, 1.414214, 1.414214, 1.089845, 1.000000, 0.976561, 0.927764, 0.898979, 0.898979, 0.866743, 0.866025 for $N$ from 2 to 14. The inversion rule is in `s6_timbre_capacity.py` at `:554`, `holds = max([n for n, (v, _) in curve if v >= eps] or [1])`, so the convention is separation at or above the resolution, which is the same convention that makes the window for six closed at its upper edge at 1.4142 and which the paper therefore already assumes. At $\epsilon = 1.0$ the largest $N$ with separation at or above 1.0 is $N = 8$, whose value is exactly 1.000000. The answer at 1.0 is eight.

Applied to the same table and the same rule, 1.45 gives three and 1.6 gives two, so the other two entries in the same sentence are right. Section 3.6's fourteen at 0.80 and ten at 0.90 are right by the same computation. This is one cell and it is the only one in either paper that is wrong.

I did not run `s6_timbre_capacity.py`, so I report this as computed rather than as printed. The computation uses only the table [12] confirms and the rule the script's source states, and both are in the record.

**Fix.** Seven becomes eight. If the author prefers the strict convention, separation strictly above the resolution, then the window for six also has to change and so does the claim at 1.4142, so the closed convention is the one to keep and the number to move is the seven.

### 4. The coverage range LS-2 puts in front of a user is computed in a unit the product does not offer, and "one of three below half" fails under a unit it does. BLOCKING

**Claim attacked.** Section 3.5: "Two staves render between 39.0 and 69.2 per cent of a single play, and on one of the three less than half", carried into the section 7.2 comparison table and named as the figure LS-2 shows a director while the choice is open [1].

**Evidence.** The verified 69.231, 50.113 and 39.007 per cent are shares of rows, and a row in these files is a line of text. [12] section C states the denominator as rows with a non-empty SPEAKER; the excluding-STAGE variant at 69.340, 50.818 and 39.951 is the same unit with the non-speaker token dropped. The design's own settings list at section 4.2 offers the floor-share unit as seconds, words or turns [3]. Lines are not on that list.

Recomputing the top-two share on the same three files under the three available treatments, using the same tally the paper's companion generator uses, which drops the non-speaker token and merges consecutive rows carrying the same speaker into a turn:

| Work | By lines | By turns | By words |
|:---|---:|---:|---:|
| A Doll's House | 69.3 | 64.6 | 71.0 |
| Hamlet | 50.8 | 40.4 | 53.2 |
| Macbeth | 40.0 | 30.0 | 42.3 |

The turns column is not new and is not mine. It is printed by `s6_floor_share_units.py` and it is in MPN-S6 section 3's own table [2], [15]. Two consequences follow and neither paper draws either.

The headline range moves by ten points. A director reducing Macbeth is told two staves carry 39 per cent, and the same reduction under the turn unit carries 30 per cent. The paper's own item S5-1 says the choice between lines, words and turns "is choosing the answer", which is exactly right and is exactly the reason the sorting figure cannot be quoted without its unit.

And "one of three below half" is a property of the line unit only. Under turns, Hamlet at 40.4 per cent is below half as well as Macbeth, so it is two of three. Under words it is one of three, as under lines. The clause is therefore true in two of the three units the product offers and false in the third, and the third is the one the design's own D30 discussion treats as a live alternative.

**Fix.** Every occurrence of the range names its unit. LS-2 gains the requirement that the coverage figure it shows is computed in whatever unit the user's floor-share setting currently is, since showing a figure in one unit at the point where a different unit is selected is the same defect LS-2 was created to prevent. The "one of three below half" clause is either dropped or scoped to the unit.

### 5. After the moderator limit is applied, the panel section has no measured content about panels, and the comparison table carries the range as though it had. BLOCKING

**Claim attacked.** Section 4.5 bolds "The busiest speaker sits in 10.2 to 87.0 per cent of all active pairs", calls it "the number this use case turns on", and section 7.2's comparison table puts it in the podcast-and-panel column under the heading of what a two-stave coverage would be [1].

**Evidence.** The paper's own paragraph in the same section says that none of the seven files is a moderated exchange, that the range "does not corroborate a claim about moderated panels", and that the figure the panel producer most wants is the one this corpus cannot supply. That is correct and it is printed by the script rather than asserted [13]. What follows from it is stronger than the paper allows.

Trace what remains in the panel section once that limit is applied. The dyad-churn range of 8.8 to 44.1 per cent is measured on six Gutenberg play files, three of which are anthologies, and its low end is the five-work Strindberg file and its high end the eight-work Chekhov file. The busiest-speaker range of 10.2 to 87.0 per cent has the eight-work anthology at one end and A Doll's House, a two-hander, at the other. Neither endpoint is a panel and neither is a conversation. The class C error figures are literature figures about multi-party recordings and are not measurements this programme made. D10, D17, D28 and D29 are design decisions. So the measured content specific to a panel in the panel section is zero, and the section's quantitative weight rests entirely on numbers that characterise drama files.

That is a legitimate position for a use-case paper to be in, and the paper is a third of the way to stating it. What it does instead is bold the range, carry it into the comparison table without the limit, and re-use it in section 6.5 on the live surface. A reader who meets 10.2 to 87.0 in a table row headed by the panel use case will take it as a fact about panels, which is precisely the reading the paper's own paragraph forbids.

**Fix.** The comparison table row carries the limit, not only the range. Section 4.5 states plainly that on the moderator question the section is an argument and not a measurement, and that item S5-3 is what would make it one. The range stays where it belongs, which is as corroboration of the general shape of the objection D10 was withdrawn on, and it stops being called the number the use case turns on.

### 6. "No informative Layer 1 measure at all" contradicts the paper's own section 3 and its own table. BLOCKING

**Claim attacked.** Section 5.4, described in the paper as "the sharpest fact in this paper": "So a scripted interview, or an untimed transcript of one, yields no informative Layer 1 measure at all. Floor share reduces to a line count and its complement, adjacency is alternation, reciprocity is 1, and the two measures that would have carried the asymmetry are absent" [1].

**Evidence.** The paper's own table two paragraphs above grades floor share at two speakers as "One degree of freedom", not as no information, and says why: "One number and its complement, so it is a scalar rather than a distribution" [1]. A scalar that can take any value in the unit interval is not uninformative; a 90/10 interview and a 50/50 interview differ in it, and the difference is exactly the asymmetry the section says is the reader's question.

The same paper makes a line-count floor share load-bearing elsewhere. Section 3.5 renders the play-script graph with "Node weight is the line-count floor share", and the whole of the play-script use case ships on it. A quantity that carries the node weight of the leading renderer in section 3 cannot be no information in section 5.

The companion paper gets the arithmetic right and disagrees with MPN-S5 on it. MPN-S6 falsifier one, on the same arity and with overlap additionally withheld, says "That leaves latency, plus floor share as a single number" and builds its sharpest falsifier on there being one measure and one ratio rather than nothing [2].

The root of it is in the design, which counts floor share among the three measures that "carry no information" at two speakers while describing it as one number and its complement [3]. MPN-S5 inherits the loose sentence and then presses it harder than the design does, into an absolute.

**Fix.** Section 5.4 says what its own table says: at two speakers and without timings, adjacency and reciprocity carry nothing, floor share carries one degree of freedom in a changed unit, and the two measures that would have carried the asymmetry are absent. The conclusion the section wants, that this is a Layer 2 and Layer 3 reading rather than a Layer 1 one, survives that correction intact.

### 7. The backchannel lexicon is a working mitigation in MPN-S5 and an unavailable branch in MPN-S6, on an argument that reaches both. BLOCKING

**Claim attacked.** Section 4.4: "The backchannel lexicon matters more here than anywhere else in this paper. A panel is full of supportive listening and a raw overlap detector scores the most supportive listener as the most aggressive interrupter. The design makes the lexicon a declared and editable setting, which is an expert act, and the producer is one of the few users in this series who can plausibly perform it" [1].

**Evidence.** MPN-S6 section 4 rules the first branch of the same question unavailable, and its argument is general rather than surface-specific: design section 4.2 records that gap length and overlap tolerance vary by language **and by speech community**, so "a word list cannot be right for a language, because a language is not the unit the variation is defined over" [2], [3]. It then withholds the overlap-derived measures by default, not computed at all, and gives a second reason that reaches every surface: S4's finding that a keyword counter's output was read as a measurement through three revisions of a paper, and a backchannel lexicon is a keyword counter [2], [7].

If that argument is sound, the producer's edited list is right for one community inside one language and no more, which is a smaller thing than MPN-S5 claims for it, and the keyword-counter precedent applies to the panel exactly as it applies to Expression. If it is not sound, MPN-S6's EX-R3 loses its stated ground. The two papers cannot both be right about the same object, and neither notices the other.

This is not a case where the surfaces differ. MPN-S6's stated distinction is that Expression's audience cannot perform the expert act; but its actual argument in section 4 is that the act does not produce a correct list for anybody, which is a claim about the object rather than about the user.

**Fix.** One of the two positions moves. Either MPN-S6 restricts its argument to the audience claim, which was section 6.4's original ground, and leaves the object alone; or MPN-S5 carries MPN-S6's finding and scopes the producer's mitigation to one community, with the keyword-counter precedent named. The second is the stronger paper and it is what the evidence supports.

### 8. "Immune" is the wrong word for the interview's timbre case, and the paper's own next paragraph says why. NOT BLOCKING

**Claim attacked.** Section 5.5: "So the interview is the only cast size in this paper immune to the unmeasured resolution of section 5b.5, because any resolution finer than the diameter of the whole space suffices for two. That is an exact result and it is the strongest positive thing this paper can say about the timbre channel on any use case" [1]. Repeated in the section 7.2 table as "2.000000, the full diameter, immune to the unmeasured resolution".

**Evidence.** The arithmetic is right and I reproduced it directly. The profiles $(1,1,0,0)$ and $(0,0,1,1)$ map to $(1,0,0)$ and $(-1,0,0)$ under the three contrasts, a separation of exactly 2, and the reachable set has diameter exactly 2. So two characters are separable at any resolution the channel is not wholly useless at.

The word is wrong for two reasons, one narrow and one that matters. The narrow one is that the immunity is degenerate: two is the smallest cast, the resolution only ever bound casts above two, and saying the smallest case is immune to a size constraint is not a result about this use case so much as an observation about the constraint. The one that matters is that the paper's very next paragraph names a failure at two speakers that no resolution touches: "never assign two characters profiles that differ by a constant, because the null direction of the map is overall profile magnitude and a pair differing only in magnitude renders identically however far apart their DISC scores look on paper" [1], [6]. Two characters at $(0.3,0.3,0.3,0.3)$ and $(0.7,0.7,0.7,0.7)$ render identically at every resolution. The interview is not immune to timbre failure at two speakers; it is immune to one particular bound, and it is exposed to a different one that is live today.

There is also a mitigation available that the paper does not name. The PRD requires the instrument to compute and show the audible fraction of every assigned pair so that a deaf assignment cannot pass as a similar one, and that requirement was written for the same two-node case [8].

**Fix.** "Immune" becomes something like "the one cast size at which the resolution does not bind", with the null-direction exposure stated in the same sentence rather than the next paragraph, and the PRD's audible-fraction requirement named as the existing answer to it.

### 9. The 6.1 against 7.2 discrepancy is named at two of its three sites, and the site the paper misses is the one that settles it. NOT BLOCKING

**Claim attacked.** Section 3.4: "The design counts this two ways and this paper names the discrepancy rather than choosing. Section 6.1 says a play script yields two of the five measures, one of them a line count; section 7.2 says two of the five are unavailable outright, which leaves three. The two sentences differ on whether reciprocity measured over a turn-count window is the same measure as reciprocity over a duration. Both readings are defensible" [1]. Section 1 says the design counts differently in two places, "which happens twice".

**Evidence.** There is a third site and it is normative. Design section 4.2, in the paragraph that settles the measure count at five, restates every dependent figure: "every figure that depended on the six is restated in terms of the five: two of five available from a script, three of five carrying no information at two speakers, four of five needing timings, and five interaction quantities in section 6.2's budget rather than six" [3]. That is the design's own restatement rule, in the section that defines Layer 1, and it picks two available. So the design says two available in two places and three available in one, which is not the symmetric standoff MPN-S5 describes, and the paper's enumeration of the sites is one short.

This programme's method rule is that a negative claim reaches no further than the class enumerated. "The design counts this two ways" and "which happens twice" are claims about the class of sites, and the class was not fully enumerated.

The second half is worse than the first. Having declared it will not choose, the paper chooses. Its own section 3.4 table lists adjacency available unchanged, floor share available in a changed unit, reciprocity available with a changed window, overlap unavailable and latency unavailable, which is three available and is the section 7.2 reading. Its partiality obligation in section 3.7 and section 7.3 says "Two of five inputs are permanently absent on this material and one more arrives in a different unit", which is the same reading again. The companion paper takes the same side flatly and without flagging any discrepancy at all: MPN-S6 section 1 says "On a script, two of the five measures are unavailable outright" [2]. So the position "we record rather than choose" is not true of MPN-S5's own text, and the two papers handle the same design defect in two different ways.

**Fix.** S5-2 enumerates all three sites and says which one is the design's restatement rule. The paper then either adopts the 4.2 and 6.1 count with the disagreement noted, or states that it uses the 7.2 count throughout and why, but it stops saying it has not chosen while using one of the two counts in every table and every obligation.

### 10. The domain census is attributed to a script run that does not produce it. NOT BLOCKING

**Claim attacked.** Section 4.6: "Running `s6_bias_layer.py` gives the shape of what that detector would cover: thirty Atlas entries in four domains, Perception 8, Decision 10, Social 6 and Memory 6; thirty of thirty now naming a state coordinate ..." [1].

**Evidence.** I ran the script. Everything after the semicolon is printed. The domain census is not: the script's section 1 prints "Atlas entries 30", the device provenance split at 14 inherited and 16 drafted, and the single line "every Atlas entry carries a domain: True". It prints no breakdown by domain. The verification file does not carry the breakdown either; the string "Perception" does not occur in it. The figures are correct and their source is S3 section 4.3 and design section 5a.1, which cites them to the BL-1 draft [3], [6].

The paper's own metadata block says "Every figure here is traceable to `VERIFICATION-2026-09-14.txt` or to a run of one of the three named generators" [1]. This figure is traceable to neither, and it is traceable to a named paper, which the metadata block does not offer as a route.

**Fix.** Cite the census to [3] and [6], and widen the metadata block's traceability sentence to include the series papers, which is what MPN-S6's equivalent sentence already does.

### 11. "At or just above the ceiling" has no arithmetic above the ceiling in it. NOT BLOCKING

**Claim attacked.** Section 6.5: in B4's own unit the count is "at or just above the ceiling on the $\Phi$ staves and twice the ceiling at best on the $\Psi$ stave", and "The oversubscription survives the recount on either unit" [1].

**Evidence.** The paper's own derivation gives three moving state quantities per $\Phi$ stave and therefore six across two, against a budget of four to six. Six against a ceiling of six is at the ceiling and never above it. Nothing in the derivation reaches above; the only route to "above" is the alternative counting the design explicitly invites, where the register triple counts as three quantities rather than one, and the paper does not take it or mention it. So on the $\Phi$ staves the recount does not show oversubscription at all at B4's upper value, and the conclusion that the surface must choose is carried entirely by the $\Psi$ stave, which wants five against two to three.

The sentence is inherited verbatim from design section 6.2 [3], so the defect is shared, but MPN-S5 presents the derivation as its own arithmetic in the preceding paragraph and should not then quote a summary its own arithmetic does not support.

**Fix.** "At the ceiling at best, and above it under the counting the design invites for the register triple". The conclusion is unaffected because the $\Psi$ stave carries it.

### 12. "This paper does not contradict the design anywhere" is an unenumerated negative claim over a document of 31,000 words. NOT BLOCKING

**Claim attacked.** The metadata block: "Rests on MPN-DESIGN-01 revision 8 [6], which this paper does not contradict anywhere and which governs wherever the two could be read as disagreeing" [1].

**Evidence.** The governing clause is right and is the correct posture for a use-case paper. The negative clause is a claim over the whole of a 31,000-word document, made without an enumeration, in a programme whose stated method is that a negative claim reaches no further than the class enumerated. It is also not costless: finding 9 shows the paper departing from the design's 4.2 restatement without saying so, and finding 11 shows it presenting a derivation whose summary its own arithmetic does not reach. Neither is a contradiction of substance, which is why this finding is not blocking, but the clause promises something no draft can promise on its first issue.

**Fix.** Delete the negative clause. The governing clause does all the work it was written to do.

### 13. Reference [2] attributes to MPN-S2 an underpinning for statements the paper does not make. NOT BLOCKING

**Claim attacked.** Reference [2]: "section 6.4 supplies the reach table this paper's identifiability statements rest on through [3]" [1].

**Evidence.** MPN-S5 makes no identifiability statement. The word does not appear anywhere in the body. The reach table and the identifiability bound are real and are S3 section 6's, which credits S2 section 6.4 for them [6], but they are not consumed here, so the reference line describes a dependency the paper does not have.

**Fix.** Trim the reference line to what MPN-S5 actually takes from S2, which on my reading is nothing beyond context.

## Findings, MPN-S6

### 14. Falsifier one is a refutation already delivered, and the ruled default set is the degenerate pair. BLOCKING

**Claim attacked.** Section 10: "The measure set may be empty at the size this surface will mostly see ... That leaves latency, plus floor share as a single number ... This is the sharpest falsifier in this paper, it needs no listener panel and no $\Psi$, and it should be answered before item 7 is scheduled rather than after" [2].

**Evidence.** Trace what Expression renders. The surface is Layer 1 only, so $\Phi$ does not run and two of the three staves have no input, which is EX-R1. Of the five Layer 1 measures, EX-R3 withholds the overlap-derived measures by default and rules them not computed at all. At two speakers, which the paper names as the most likely material, design section 6.3 puts adjacency deterministic, reciprocity 1 by construction and floor share as one number and its complement [3]. So the $\Psi$ stave carries latency and one ratio.

That much the paper says. What it does not say is that the deduction is complete. Every premise is already established in the record: the layer boundary is design section 6.4, the two-speaker degeneracy is design section 6.3, and the overlap withholding is this paper's own ruling three sections earlier. Nothing is pending. The conclusion, that on its most likely material Expression renders one measure and one ratio, follows now and does not wait on an experiment. What EX-3 actually asks is a different and much softer question, which is whether one measure and one ratio carry something a reader recognises, and that is a product judgement about a rendering that does not exist rather than a falsification test. Calling a completed deduction the sharpest falsifier and scheduling it as work postpones a conclusion the paper has already reached.

And there is a consequence the paper misses entirely, which is the sharp one. EX-R1 rules the declared default set for the one stave to be **floor share and adjacency**, inherited from D69's three-stave default [2], [3]. At two speakers those are exactly the two measures that carry no information: adjacency is deterministic and floor share is one number and its complement. Latency, the single informative measure the paper's own falsifier identifies, is not in the default. So a user who opens no configuration, which D69 exists to serve, is shown the degenerate pair on the surface's most likely material, and the paper rules that default and states the degeneracy four sections apart without joining them.

**Fix.** Falsifier one is restated as a conclusion with one open sub-question, not as a falsifier. EX-R1's default set is re-derived for this surface rather than inherited from a three-stave layout, and the obvious candidate is latency, with floor share beside it as the number rather than as the stave's second quantity. If the default cannot be re-derived because $\Psi$ has no codomain, then that is the finding and it belongs in section 9.

### 15. EX-R3 and EX-R4 contradict each other over four per-person measures. BLOCKING

**Claim attacked.** EX-R3: "The overlap-derived measures are withheld by default, not computed at all". EX-R4: "no number is withheld from the user", expanded in section 5 ruling four as "None of this withholds a number. Every per-person measure is available to the user as a number with its setting and its window beside it" [2].

**Evidence.** The per-person measures the paper enumerates in section 5, from design section 7.4, are floor share, turn count, mean turn length, latency before taking the floor, overlap initiated, overlap received, backchannel given, backchannel received, and degree in the adjacency graph [2], [3]. Four of those nine are overlap-derived: overlap initiated, overlap received, backchannel given and backchannel received. EX-R3 makes all four not computed at all. EX-R4 says every per-person measure is available to the user as a number. A measure that is not computed cannot be available as a number.

Both are in the ruling table, which is the paper's stated product, and section 5 ruling four gives the universal its rhetorical weight: "Withholding the numbers from the person who asked for them would be the condescension". On four of the nine, the paper does withhold them, for a reason it argues well three sections earlier.

**Fix.** EX-R4's universal is scoped to the measures EX-R3 leaves computed, and section 5 ruling four states the exception in the same sentence as the rule. The scoping costs the paper nothing, because EX-R3's reason for withholding is stronger than EX-R4's reason for disclosing and the paper already argues it.

### 16. The surface sentence EX-R6 supplies advertises the measure EX-R3 withholds. BLOCKING

**Claim attacked.** Section 7 supplies the sentence the design requires and does not supply, carried on the surface itself: "This is a picture of the conversation's shape, who held the floor, who followed whom, **who came in over whom and how fast**, and it is not a picture of anyone in it" [2]. EX-R6 rules it.

**Evidence.** "Who came in over whom" is overlap. EX-R3, three sections earlier, rules that overlap initiated and overlap received are not computed at all by default, and section 4 specifies that the analysis must say so before it says anything else, in the words "this analysis cannot tell you whether anyone talked over anyone, because no backchannel lexicon has been established for this language" [2].

So the surface as ruled carries, on its face and in the same type as everything else, a sentence saying the picture shows who came in over whom, and then opens by saying it cannot tell you whether anyone talked over anyone. Those are the two sentences a user meets first and they contradict each other. The paper's own test for the sentence, "If the sentence reads as reassurance, it is wrong", does not catch this, because the failure is not tone.

"And how fast" has a weaker version of the same problem: latency is available on material with timings and is unavailable on a script, where section 1 records that a script has no timings [2].

This is the second contradiction inside the ruling table, and between them EX-R3, EX-R4 and EX-R6 cannot all hold as written.

**Fix.** The sentence is rewritten to name what the surface computes in its default configuration, and it gains the overlap clause only where EX-R3's release condition has been met under EX-2. Since the sentence is translated rather than transliterated under D26, a conditional clause is already within the mechanism the paper specifies.

### 17. "The one file where the top speaker does change" is false against the output the paper itself reports. BLOCKING

**Claim attacked.** Section 3: "On all three single plays the single busiest speaker is the same under both units ... The one file where the top speaker does change is the Chekhov anthology, where Irina leads by turns and Lubov by words, and an anthology figure is not a coverage figure for any play" [2].

**Evidence.** I ran `s6_floor_share_units.py`. It prints, for each of the six files, a line reading "top speaker same under both units". Three files return False, not one:

    CHERRY_ORCHARD   top speaker same under both units: False   IRINA by turns, LUBOV by words
    MISS_JULIE       top speaker same under both units: False   MAURICE by turns, ADOLPHE by words
    OEDIPUS_REX      top speaker same under both units: True

The Miss Julie file, the Strindberg anthology of five works, changes its top speaker between the units: MAURICE is rank 1 by turns and rank 4 by words, and the script prints that rank move in its own list. So the claim is false over the class the paper enumerates, which is the seven score files, and it is falsified by the output of the generator the paper introduces and reports in full.

Two things make this worse than a slip. The paper is at its most careful here, distinguishing what its new measurement establishes from what it does not, and this sentence is inside that careful passage. And the script's three assertions do not catch it, because they are written over the three single plays only and the anthology results are printed without being stored, so a corpus change that moved an anthology's top speaker would not fail the script.

The substantive claim the paper wants is unaffected and is correct: on the three single plays the top speaker is stable under both units and the disagreement is about the order below the top. That claim is the script's own and it survives.

**Fix.** "The files where the top speaker changes are the Chekhov and Strindberg anthologies", or the sentence is cut, since it adds nothing the narrower claim needs. The script's assertion set gains a line over the anthology results so that the corpus guards this too.

### 18. "An arithmetic property of what is on the screen" is contradicted by the same paper's section 5 and by its own fallback. BLOCKING

**Claim attacked.** Section 2: "Expression is the one surface where the musical rendering is not one channel among several but carries most of the informational load. An unintended affective reading of $\Psi$ is, on Studio, a distortion of one of three things on the screen, and on Expression it is a distortion of the output. That is an arithmetic property of what is on the screen" [2]. The whole of section 2's case that the required listener-test result is strictest on this surface rests on it.

**Evidence.** Expression's screen is not the score alone, on this paper's own rulings. Section 5 ruling three assigns the by-name attribution to "the graph and the numeric readout" and the exchange-level form to the stave. Section 5 ruling four says "the graph carries every speaker". Section 2 itself, eleven lines later, offers as the response to a failed test that the programme "ship the visual renderer alone", and describes that product as "the thing this paper describes minus one renderer", which means the paper describes at least two. And design section 6.4 writes the audience as anyone who finds conversational dynamics easier to read as sound **or image** [3].

So the Expression screen carries a stave, a graph and a numeric readout, which is three things, the same count section 2 attributes to Studio. The claimed arithmetic property is not a property of what is on the screen.

There is a defensible claim in the neighbourhood and the paper does not make it: that for the subset of this audience who choose sound over image, the score is the whole of what they read, so the required result is strictest for that configuration rather than for that surface. That is a claim about a configuration, it is not arithmetic, and it would need the same caveat the paper applies to everything else, which is that nobody has measured how that audience splits.

**Fix.** Section 2 states the configuration claim rather than the surface claim and drops "arithmetic". The conclusion, that the required result is demanding here, survives on the weaker ground; what does not survive is the ranking of Expression above Studio as a matter of arithmetic.

### 19. The epistemic-overwrite closure is a closure of a narrowed risk, it rests on a rule rather than a construction, and the paths into the surface were not enumerated. BLOCKING

**Claim attacked.** Section 1: "The condition of that risk is that a representation of a state is produced. On Expression none is, so the risk is closed by construction and not by care. **That is the reason this section is load-bearing.** It is also the reason the surface must never acquire a Layer 2 input by configuration: section 9 states what happens if one ever arrives" [2].

**Evidence.** The precondition the paper names is narrower than the risk the source states. The author's analysis puts it as "A person whose difficulty is precisely in identifying their own internal state, handed a confident-looking external representation of that state produced by an unvalidated mapping, may take the representation as the answer" [23]. The conjunction has three parts: a representation about the person, an unvalidated mapping, and the reader taking it as the answer. MPN-S6 isolates the first and narrows it further to a representation of a **state**, which is a term of art in this programme meaning $\Phi$'s nine-component domain, and then reports the conjunction closed. Expression does produce a confident-looking external representation about the reader, through a mapping the paper says on the same page has no specification and no listener test. Section 2's conduct reading is the same structure with "state" replaced by "conduct", and the paper concedes it in the same section: "Layer 1 only closes the claim. It does not close the reading." A risk that is closed on a definitional narrowing and live on the neighbouring reading should not be described as closed by construction.

The analysis also names its own design answer and the paper does not engage it: "The design answer is the direction reversal in use case two. A system that asks is safe in a way that a system that pronounces is not" [23]. Expression pronounces. Whether the direction reversal is available on this surface is a real question and the paper does not ask it.

Second, "by construction and not by care" is not what the sentence that follows describes. The surface "must never acquire a Layer 2 input by configuration", and section 9 clause five enforces it by ruling that "there is no setting that turns $\Phi$ on" and that a build with a toggle is a different surface. That is a rule an implementer must follow and a reviewer must check, which is care. A construction is something an implementer could not violate without the code failing. The paper is right that the rule is the correct form and right about why, that the failure mode is gradual; it is wrong that the result is closure by construction.

Third, and this is where the programme's own method bites, the paper enumerates one path into the surface and states a conclusion over all paths. The path it names is a Layer 2 rating arriving by configuration. It does not consider: the numeric readout that EX-R4 hands the user, which is a per-person quantity about them from a computation section 3 has just shown changes its answer with a setting; the graph, which carries every speaker by name; whether a shared engine that contains $\Phi$ can route a $\Phi$ rendering to a shared renderer, which MPN-S5 records the design as governing under D72 by ruling shared renderers an implementation fact rather than a licence [1], [3]; or the case where a rating exists elsewhere in the programme for the same synthetic characters. Some of those close easily. None of them is closed in the text, and a negative claim over all paths after enumerating one is the failure this programme's method rule was written against.

**Fix.** Section 1 states what is actually closed, which is that no $\Phi$ output reaches this surface because no Layer 2 input does, and says that the closure is held by a rule stated in section 9 rather than by construction. The paths are enumerated, each with its disposition. The analysis's own direction-reversal answer is either adopted, refused with a reason, or recorded as not applicable, but it is not passed over.

### 20. The rulings are made in sections 1 to 7 and the disclosure that $\Psi$ does not exist is made in section 8. BLOCKING

**Claim attacked.** Section 0 says the paper "does not specify $\Psi$, which nobody has specified, a fact section 8 states rather than works around". Section 8 states it: "this surface's central mapping is not yet a function, and everything in this paper about what $\Psi$ renders is a set of constraints on something nobody has written" [2].

**Evidence.** That sentence is the honest one and it is placed after every ruling it governs. EX-R1 through EX-R7 are in section 11, but they are made in sections 1 to 7, and sections 1 to 7 describe $\Psi$'s behaviour in the present indicative throughout. Section 1: "$\Psi$, the interaction mapping, takes the Layer 1 measures and renders the shape of the exchange." Section 5 ruling three: "$\Psi$'s stave renders shape: how concentrated the floor was, how the turn order alternated, the latency profile, the reciprocity of the window." That last is four specific codomain behaviours attributed to a function the paper's own section 8 says has no stated codomain, no channel count, no jump set and no discretisation. Section 7's surface sentence is written as a description of an existing rendering. Section 6 describes the stave as synchronous on class B.

The single sentence in section 0 does not reach a reader who has already read four sections of present-tense description, and a reader who stops at section 7, having got the surface sentence they came for, never meets section 8 at all.

Compare MPN-S5, which handles the same problem better: it states the position in section 2, and although it too says it will not repeat the hedge, it carries "$\Psi$" in the "What blocks it today" row of its section 7.2 comparison table for three of its four use cases, so a reader meeting the summary meets the blocker [1]. MPN-S6 has no equivalent row and its work-queue item EX-0 is the only place the reader meets it after section 0.

**Fix.** Section 8's sentence, or a compression of it, moves to the head of section 1 where the chain of what the tool renders is set out, and each ruling that describes $\Psi$'s output states that it constrains rather than describes. The ruling table in section 11 gains one line above it saying that EX-R1, EX-R2, EX-R5 and EX-R6 are rulings about the behaviour of a function that does not yet exist.

### 21. "Three of the five measures do not fit on the stave under any reading of B4" is wrong under one of the two readings. NOT BLOCKING

**Claim attacked.** Section 9, consequence three: "Expression has one stave against a budget of two to three, and the five Layer 1 measures want rendering on it ... three of the five measures do not fit on the stave under any reading of B4" [2].

**Evidence.** B4's range is two to three quantities per stave. Under the floor reading, three of five do not fit. Under the ceiling reading, two of five do not fit. So the number that holds under any reading is two, not three, and the sentence overstates by one in the direction that makes the case look stronger. The rest of the paragraph is right: the per-stave oversubscription is unchanged from Live and the total headroom is a third of Live's, six to nine against two to three.

**Fix.** "At least two of the five measures do not fit under any reading of B4, and three do not fit if B4's lower value holds."

### 22. Section 5 drops the ninth item from the restoration it quotes. NOT BLOCKING

**Claim attacked.** Section 5: "Design section 7.4 restores every per-person measure in full, floor share, turn count, mean turn length, latency before taking the floor, overlap initiated and received, backchannel given and received, and degree in the adjacency graph, all attributable by name on a shared display" [2].

**Evidence.** Design section 7.4's list has nine items, and the ninth is "each person's own $\Phi$ rendering where a Layer 2 rating exists" [3]. It is correct to leave it out of what Expression renders, since $\Phi$ does not run here, but the sentence is framed as a report of what the design restores, not of what this surface takes, and a reader comparing the two lists will find one short with no note saying why.

**Fix.** One clause: "and, on surfaces where a Layer 2 rating exists, each person's own $\Phi$ rendering, which does not arise here."

### 23. The new generator's figures sit outside the verification pass, and its assertions pin its own results. NOT BLOCKING

**Claim attacked.** The metadata block routes the paper's figures to `VERIFICATION-2026-09-14.txt`, to a named paper, or to `s6_floor_share_units.py`, "which is new with this paper and which section 3 reports in full including what it fails to establish" [2]. Reference [14] says it "asserts three of its own results so that a change of corpus fails the script rather than this paper".

**Evidence.** The script is well built, it is candid in its own docstring about all four things it cannot do, and section 3 carries all four limits. The figures reproduce exactly. Three things are worth recording anyway.

Its output is not in [12], which the gate treats as the only figure source, and the paper says so. That is a declared departure rather than a concealed one, but it means one table in the pair rests on a number no verification pass has seen.

Its three assertions are at `:175` to `:180` and are `results["HAMLET"]["set_same"] is False`, `all(results[p]["top_same"] for p in SINGLE_PLAYS)`, and `results["MACBETH"]["moved"] >= 10`. Each pins a result the paper reports. They guard against a change of corpus, which is what the reference line claims and is a real guard. They cannot catch an error in the computation itself, because the expected values are the computed values. That is a weaker guarantee than the phrase "asserts three of its own results" will read as.

And there is no independent recount. `s6_three_clef.py` has `s6_corpus_recount.py` beside it re-reading the CSVs from scratch, which is why [12] section C can call itself a check [25]. Nothing plays that role for the new script.

**Fix.** The reference line says what the assertions guard, which is corpus identity and not computation. If the figures are going to carry a ruling, an independent recount of the turn merge and the word count is the cheap insurance, and it is the pattern the programme already has.

## Findings, both papers

### 24. The default set is justified by a claim that both papers contradict elsewhere. BLOCKING for both

**Claim attacked.** MPN-S5 section 6.4 on D69's default set: floor share and adjacency on the $\Psi$ stave, "which are the two Layer 1 measures available on every ingest class and therefore the two that never blank" [1]. MPN-S6 section 9, consequence two, repeats it word for word for the one-stave layout [2]. Both take it from design section 6.2 [3].

**Evidence.** Neither measure is available on every ingest class, and both papers say so in their own text.

On class C, MPN-S5's own section 4.4 table gives floor share as "Available only above the declared resolution floor" and adjacency as "Available, degraded by attribution error" [1]. A below-floor difference is rendered as **unmeasured** under D28, visibly distinct from any rendering of an even exchange, which is precisely a blank in the sense the justification denies. MPN-S6 section 6 says the same of class C in its own words: "A resolution floor derived from the deployed diariser's error rate, below which differences are not reported as numbers and are rendered as unmeasured rather than as even" [2].

On a script, floor share is available only in a changed unit, which the design's own section 7.2 rule says makes it a different measurement that must not be placed beside a podcast's [3].

And at two speakers, which is finding 14, both are degenerate.

So the default set's stated ground fails on class C, is qualified on class A, and fails at the arity MPN-S6 names as its most likely. The default set may still be the right default; the justification for it is not.

**Fix.** The justification is restated as what it is, which is that these two are the measures that survive the largest number of ingest classes in some form, with the class C floor and the changed unit named. On Expression the default is re-derived for a one-stave layout and for two speakers, per finding 14.

### 25. Neither paper has a citation ledger, and four external quantitative claims have no source anywhere in the corpus. BLOCKING for both

**Claim attacked.** Both metadata blocks guarantee traceability of every figure. Neither paper has a ledger, and the programme's rolled-up citation status covers S1 to S4, the PRD and the design and not these two [18].

**Evidence.** Taking the references in turn, and separating what fails from what is merely unresolved here.

**Would fail verification.**

MPN-S5 [21] calls the table at `page.tsx:96` a "fourteen-name substitution table". [12] section H.3 corrects it: the table holds thirteen, named one by one, and records the adjacent four-entry `DISC_INSTRUMENTS` map at `:88` as the likely source of the miscount. The design's own ledger records the same correction and marks it "untouched" in the design's reference line [17]. So this is a correction that has been made twice in the record and reproduced a third time in a paper with no ledger to catch it. Nothing in either argument turns on the count, which is why [12] says so, but a first-issue paper reproducing an already-published correction is exactly what a ledger exists to prevent.

The four class C error figures have no source anywhere. MPN-S5 section 4.3 gives, as "the measured position", the best published streaming diarisation error rate on DIHARD III at 19.8 per cent, two vendors at 39.1 and 39.2 per cent, meeting-benchmark word error at 35 to 46 per cent, and a 2025 benchmark scored with overlap included finding missed speech the dominant failure. MPN-S6 section 6 carries the 35 to 46 figure. Searching the whole of `ms-drafts` for those values returns three files: the design at revision 3, the design at revision 8, and MPN-S5. The design carries them with no bracket reference, and `CITATION-LEDGER-DESIGN.md` has no row for any of them [17]. So four external quantitative claims, which are the entire evidential basis for D15, D17, D18, the resolution floor and the sequencing of live capture, and which both papers repeat as measurements, are unattributed in the programme. This is the largest citation defect in either paper and it is inherited rather than introduced.

MPN-S5 [2] attributes an underpinning the paper does not use, which is finding 13.

MPN-S5's section 4.6 domain census is attributed to a script run that does not produce it, which is finding 10.

**Unresolved here rather than wrong.**

MPN-S5 [18], `MPN-NOTE-05-blocking-numbers.md`, does not exist in `ms-drafts`, and neither does the `s7_blocking_numbers.py` the decision log cites beside it [11]. The design cites the same note at its own [16] and the decision log rests decision B on it, so the note is load-bearing for the corpus and not only for MPN-S5. [12] section H.2 establishes the precedent that a file absent from the container snapshot may be present in the author's corpus, so I report this as unresolved rather than broken, and it is the author's to resolve.

Every `05_DATA/03_generators/` prefix in both papers follows the restoration [12] section H.2 recommends, and is therefore right for the corpus and wrong for this container. That is the correct choice. It is worth recording that `CITATION-STATUS-ALL.md`, written at 18:03 on the same day, still marks a path under that directory BROKEN on the stale-snapshot reasoning that H.2 at 17:27 says was wrong [17], [18], so a reader following either paper's generator citations gets contradictory guidance from two same-day documents. That is the corpus's problem, not these papers', but a ledger in either paper would have to record it.

MPN-S5 gives working-copy paths for [10], [11] and [12] and not for [9] or [13], which are the same class of file.

MPN-S5 [19] describes MPN-S6 as "in preparation in parallel with this one". MPN-S6 is a completed draft 1 of the same date, and MPN-S6 does not cite MPN-S5 at all.

MPN-S5 [21] and MPN-S6 have commit `8a3db9f` and the implementation anchors in common with the design, and the design's ledger grades that reference VERIFIED after the repair pass with the one narrowing named above [17]. The anchors MPN-S5 uses, `play_parser.ts:254` to `:262`, `psychometric_calculus.ts:211` to `:213`, and `page.tsx:96` and `:115`, are the corrected ones and not the three that [12] section H.3 found broken. That is worth saying plainly because it is the paper getting something right that was easy to get wrong.

MPN-S6 [13] carries six claims from `THERAPY-AUTISM-ANALYSIS.md` and records in the reference line that the analysis's own citations are unledgered and that any that carries weight in a later revision should be verified first [2]. That is the correct handling and it is the only place in either paper where the ledger gap is met head on.

**Verified and worth recording as such.** MPN-S5's revision numbers for S1 through S4, the PRD and the design all match the documents. S1's B4 is at `:317` as [1] says. The PRD's 92 per cent is at `:261` as both papers say. MPN-S6 [8]'s mapping of REVIEW-DESIGN-user findings 2, 3, 4, 5 and 15 onto D27, D28, D29, D30 and section 6.4's plain statement is exact [20]. MPN-S6 [6]'s identification of change 32 with finding U9 and change 45 with the D42 scoping clause is exact [9]. MPN-S6 [16]'s "27 of 107 references verified" is exact [18]. MPN-S5 [15]'s translation census, sixteen on a dedicated stave carrying chords, ten on a single line, five on articulation and voicing and one on the between-stave relation, is exact [22].

**Fix.** Both papers get a ledger before either is issued, on the five-status pattern the programme already uses. The four class C figures are traced to their sources or are marked unsourced in the design first and in both papers after. The fourteen becomes thirteen. Reference [18] of MPN-S5 is resolved from the author's corpus or withdrawn.

### 26. The two companion papers duplicate heavily, one asserts they do not, and one defect is filed twice under two item numbers. NOT BLOCKING

**Claim attacked.** MPN-S5 section 1: MPN-S6 "is cross-referenced here and is not duplicated here, because it asks a different question of the same engine and deserves its own paper" [1].

**Evidence.** The material both papers carry independently includes: the two-speaker degeneracy of three of five measures, with the same design citation; the known-in-advance partition and the film-score comparison; the class B synchronous split and the trailing word-dependent half; the class C rules, resolution floor, uncomputed overlap and opening sentence; D66's causal window with the same worked example about a normalisation over total speaking time; the supportive-listener failure and the editable lexicon; the per-person restoration and D42's scope hole; the information budget in both units; the staleness horizon and the discontinuity marking; and the same defect in `s6_three_clef.py`. That is most of MPN-S6's sections 1, 4, 5, 6 and 9.

The defect is filed twice. MPN-S5 files it as item S5-8 and MPN-S6 as EX-8, each describing it as the kind of small defect this programme has found to be load-bearing, and neither cross-references the other's item number. Anyone working the queue will fix it once and close one of the two items.

The asymmetry is the other half. MPN-S5 cites MPN-S6 at [19] and devotes section 7.4 to what Expression renders; MPN-S6 has no reference to MPN-S5 anywhere and does not mention the four obligations that MPN-S5 section 7.4 says "reach MPN-S6 unchanged". So one paper has taken a position about the other that the other has neither adopted nor refused.

**Fix.** The non-duplication claim goes, or is narrowed to the material genuinely unique to each, which is the four use cases on one side and the seven rulings on the other. The two queue items are merged under one number. MPN-S6 says whether it adopts the four obligations.

### 27. MPN-S5's measures table carries a sixth row, which is the presentational form of the error D64 was created to stop. NOT BLOCKING

**Claim attacked.** Section 1's note on counting says the paper "says five everywhere and names backchannel where it matters" [1]. Section 4.4's table has six rows, the sixth headed "Backchannel, the overlap row's parameter".

**Evidence.** The row is labelled correctly and the paper's prose count is five throughout, so the substance is right. The presentation is the exact shape of the defect D64 diagnoses: design section 4.2 records that revision 7 "opened this section with 'four of the six', tabulated five rows" and that the document ended up "counting a measure it had not defined" [3]. A six-row table headed by the five measures is how a later reader acquires a sixth measure, whatever the sixth row is called, and MPN-S5 is the first document in the series to tabulate one since the count was settled.

**Fix.** The backchannel line moves out of the table and into the prose under the overlap row, or the table gains a visible rule separating the five measures from the one parameter.

### 28. The timbre row of MPN-S5's comparison table gives one cast size for a use case whose stated arity is a range. NOT BLOCKING

**Claim attacked.** Section 7.2, row "Timbre separation at that cast size", podcast and panel column: "6 at the square root of two, conditional on resolution in (1.0898, 1.4142]" [1]. The same table's arity row gives that use case "3 to 8".

**Evidence.** On the converged table the separation is 1.414214 at three, four, five and six, 1.089845 at seven and 1.000000 at eight [12]. The row reports the figure at six and labels it as the figure at that cast size, for a use case whose arity range includes two sizes where it is materially lower and where the whole conditional window argument changes. The play-script column handles the same problem correctly, saying "no figure exists above 14", so the table knows how to do this.

**Fix.** "1.4142 up to six, 1.0898 at seven and 1.0000 at eight, conditional on resolution", or the row scopes itself to the cast the audio renderer is given rather than to the use case's arity.

## Disposition, MPN-S5

**REVISE. Nine blocking findings: 1, 2, 3, 4, 5, 6, 7, 24 and 25.**

The paper is the strongest first issue this programme has produced on figures. Every corpus number it takes from a generator reproduces, it uses the corrected implementation anchors rather than the broken ones, it carries its own limits into the text rather than into footnotes, and the defect it found in `s6_three_clef.py` is real and I confirmed it: the script's section 4 prints "the relation 6 quantities (Psi: floor share, adjacency, latency, overlap, reciprocity, backchannel)" and "TOTAL 18 quantities", which is D64's five measures counted as six and D65's seventeen rendered parameters counted as eighteen. The paper's own arithmetic for the number it argues for is consistent: six per $\Phi$ stave times two, plus five on the $\Psi$ stave, is seventeen, and the B4-unit recount at three moving quantities per $\Phi$ stave and five on the $\Psi$ stave is the design's own and reproduces.

What blocks it is four things. One figure is wrong, the seven at a resolution of 1.0, and it is the only wrong figure in either paper. One claim, that the picture is deliverable now, is false while $\Psi$ does not exist and the paper says the opposite two sections earlier. The frame claim, that four obligations and one acceptance criterion bound the specification of $\Psi$, is a narrowing of the interface and not of the problem, and the paper's own queue concedes that the acceptance criterion has still to be written. And the coverage figure the paper puts in front of a director at the point of selection is computed in a unit the product does not offer, with a ten-point spread against a unit it does and a headline clause that fails in that unit, which the companion paper's own generator prints without either paper noticing.

REVISE and not STOP because none of the nine is a contradiction between the paper's own rulings, because the corrections are all local, and because the honest frame of section 2 is the right frame and needs its claim lowered rather than replaced.

## Disposition, MPN-S6

**STOP. Nine blocking findings: 14, 15, 16, 17, 18, 19, 20, 24 and 25.**

The paper does several things better than any document in this programme has done them. Its handling of the autism literature is disciplined to a degree the corpus has not previously reached, taking six claims and refusing to characterise the reader in either direction, and stating in terms that the existing evidence does not settle whether the general-population figure transfers. Its section 4 argument against the first branch of the backchannel disjunction is correct and is made on the design's own text. Its section 3 measurement is new, honest about seconds being uncomputable, honest about a row not being a turn, and explicit about which half of D30's premise it fails to establish. Its section 8 note that the analysis's citations are unledgered is the only place in either paper where the ledger gap is met head on.

It stops on the ruling table, which is the paper's product. EX-R3 says the overlap-derived measures are not computed at all; EX-R4 says no number is withheld from the user, over four per-person measures that are overlap-derived; EX-R6's surface sentence, carried on the face of the product in the same type as everything else, tells the user the picture shows who came in over whom, which is the measure EX-R3 withholds and which section 4 requires the surface to announce it cannot supply. Those three cannot all hold. A use-case paper whose seven rulings contain two mutual contradictions is not ready to be adopted, because the thing a later revision would attack is the rulings.

Three further things carry the disposition rather than merely adding to it. The negative claim about the top speaker changing on one file is false against the output of the generator the paper introduces, reports in full and asserts on, which is the failure mode this programme has spent two gates learning to catch. The epistemic-overwrite closure states a conclusion over all paths after enumerating one, and narrows the source's risk before closing it. And the paper's sharpest falsifier is a deduction already complete, whose conclusion contradicts the default set the paper rules three sections later, so the surface as ruled shows a user who opens no configuration the two measures that carry no information on the material the paper says the surface will mostly see.

None of that is unfixable and most of it is fixable by scoping a universal or moving a sentence. The fix is a second draft rather than a revision pass, because section 9's rulings and section 10's falsifiers have to be re-derived together once the default set is re-derived for one stave and two speakers.

## References

[1] MPN-S5, `S5-dialogue-use-cases.md`, draft revision 1, 14 September 2026.

[2] MPN-S6, `S6-expression-aid.md`, draft 1, 14 September 2026.

[3] MPN-DESIGN-01, `DESIGN-UNIFIED-FRAMEWORK-rev8.md`, revision 8. Section 4.1 the ingest classes and the class C figures; 4.2 the five measures, the count settled at five and the speech-community caution; 6.1 Studio and the two-of-five sentence; 6.2 Live, the legibility budgets, the information budget in both units and LS-1 to LS-3; 6.3 the Instrument and the two-speaker degeneracy; 6.4 Expression; 7.2 scripts have no timings; 7.4 the per-person restoration; 8a the four kinds of refusal; section 9 the decision log D1 to D74 and rejections R1 to R7; section 13 the audit of all forty-five changes.

[4] MPN-S1, `S1-mckenney-lacan-theory.md`, revision 3. Assertion B4 at `:317`, confirmed at that line.

[5] MPN-S2, `S2-mathematics.md`, revision 4.

[6] MPN-S3, `S3-mapping-phi.md`, revision 9, with `MPN-S3-AMENDMENTS-2.md`. Section 2.6 the timbre map at rank three with nullity one and profile magnitude as the null direction; section 4.3 the domain census.

[7] MPN-S4, `S4-application.md`, revision 2. Section 3.3 the King Lear parse failure; 3.5 the naming ruling; 4.3 trauma against row position at +0.9969 pooled; 4.4 the entropy floor at 72.8 per cent.

[8] MPN-PRD-01, `PRD-MPN-THERAPY.md`, draft 6. Section 7.2 at `:261`, confirmed at that line; section 7.6 the two-node case at the channel's full diameter and the audible-fraction requirement.

[9] `ARBITRATION-DESIGN-R7.md`, 14 September 2026, disposition STOP. Change 19 the moderated-exchange limit; change 32 finding U9; change 45 the D42 scoping clause; the rejection of finding U8 at section 4.

[10] `ARBITRATION-PRD.md`, 14 September 2026.

[11] `DECISION-LOG-2026-09-14.md`, 14 September 2026. Decisions A and B.

[12] `05_DATA/03_generators/VERIFICATION-2026-09-14.txt`, working copy `gen6/VERIFICATION-2026-09-14.txt`. Section C coverage; section D event density and the entropy census; section E the timbre tables including the converged table at E.7b; section F the summary; section G what is still open; section H the second-pass repairs, H.1 on `s6_three_clef.py`, H.2 on reference [7] and the generator prefix, H.3 the link check and the correction of fourteen names to thirteen.

[13] `05_DATA/03_generators/s6_three_clef.py`, working copy `gen6/s6_three_clef.py`. Run for this review, exit 0.

[14] `05_DATA/03_generators/s6_bias_layer.py`, working copy `gen6/s6_bias_layer.py`, against `s3_bias_reconciliation.json`. Run for this review, exit 0.

[15] `05_DATA/03_generators/s6_floor_share_units.py`, working copy `gen6/s6_floor_share_units.py`. Run for this review, exit 0. Assertions at `:175` to `:180`.

[16] `05_DATA/03_generators/s6_timbre_capacity.py`, working copy `gen6/s6_timbre_capacity.py`. Not run for this review. Inversion rule read at `:550` to `:558`.

[17] `CITATION-LEDGER-DESIGN.md`, 14 September 2026. Row 21 and the anchor table beneath it, including the thirteen-name narrowing at `page.tsx:96`.

[18] `CITATION-STATUS-ALL.md`, 14 September 2026. 27 of 107 verified; the BROKEN list.

[19] `REVIEW-DESIGN-R7-user.md`, 13 to 14 September 2026, disposition REVISE. Findings 8 and 9 on Expression.

[20] `REVIEW-DESIGN-user.md`, 13 September 2026, reviewing revision 3, disposition REVISE. Fifteen findings.

[21] `MPN-S3-BL2-DRAFT.md`, 14 September 2026. Option A and the partition of twenty-one and nine.

[22] `MPN-S3-BL8-OPTIONS.md`, 14 September 2026. The translation census at section 8.

[23] `THERAPY-AUTISM-ANALYSIS.md`, the author's own analysis. The epistemic-overwrite paragraph and its stated design answer.

[24] `ASSERTIONS-REGISTER.md`. B4's claim, formal content, constraint and falsification clause.

[25] `05_DATA/03_generators/s6_corpus_recount.py`, working copy `gen6/s6_corpus_recount.py`. Named here as the precedent for an independent recount.
