| Field | Value |
|:---|:---|
| Designation | ARBITRATION-S5-S6 |
| Documents ruled on | MPN-S5, `S5-dialogue-use-cases.md`, draft revision 1 [1]; MPN-S6, `S6-expression-aid.md`, draft 1 [2] |
| Role | Arbiter. Not a fourth reviewer, not the author, not a regulatory reviewer |
| Date | 14 September 2026 |
| Reviews ruled on | `REVIEW-S5-S6-skeptic.md`, 28 findings, S5 REVISE 9 blocking, S6 STOP 9 blocking [3]; `REVIEW-S5-S6-constraints.md`, 24 findings, S5 REVISE 9 blocking, S6 REVISE 5 blocking [4]; `REVIEW-S5-S6-user.md`, 19 findings, S5 REVISE 7 blocking, S6 REVISE 10 blocking [5] |
| Findings ruled | 71 reviewer findings, deduplicated to 56 rulings |
| Read in full | Both documents under review [1], [2]; the three reviews [3], [4], [5]; `DESIGN-UNIFIED-FRAMEWORK-rev8.md` sections 4.1, 4.2, 4.3, 5a, 5b, 6.1, 6.2, 6.3, 6.4, 7.2, 7.4, 8, 8a, 9, 10 and 10a [6]; `S3-mapping-phi-rev10.md` sections 2.3, 2.5, 2.6, 4 and 7 [7]; `ASSERTIONS-REGISTER.md` entry B4 [8]; `MPN-NOTE-05-blocking-numbers.md` [9]; `DECISION-LOG-2026-09-14.md` [10]; `MPN-S3-BL8-OPTIONS.md` section 3 [11]; `ARBITRATION-DESIGN-R7.md` [12]; `ARBITRATION-PRD.md` for the house form and for its scope ruling [13]; `VERIFICATION-2026-09-14.txt` sections C, D, E, H.1, H.2 and H.3 [14] |
| Generators run before ruling | `s6_three_clef.py` [15], exit 0, 209 lines; `s6_floor_share_units.py` [16], exit 0, 112 lines; `s6_bias_layer.py` [17], exit 0, 330 lines; `s6_timbre_capacity.py` [18], its converged continuous table and its exhaustive corner table computed at the script's own defaults, 600 polished starts at seed 20260913, after installing the polish dependency the script requires and the author's machine did not have |
| Figures that did not reproduce | One, and it belongs to a reviewer and not to either paper: the Skeptic's finding 3, that the timbre inversion at a resolution of 1.0 returns eight characters. The script returns seven. Section 2.4 gives the command and the output, and section 4.1 rules on it |
| Scope, non-negotiable | The author's ruling of 13 September 2026 governs: theory, internal private use, synthetic material, no people, no regulation. No finding below is upheld on a regulatory, legal, consent, privacy, IRB, HIPAA, clinical-approval or data-protection ground, and none was offered on one. The panel is three professions and not three seats. The author's use cases define the market and no finding is entertained that says one of them is out of scope |
| Ruling counts | 33 UPHELD, 17 UPHELD-NARROWED, 6 REJECTED |
| Disposition, MPN-S5 | **REVISE**, 14 blocking |
| Disposition, MPN-S6 | **STOP**, 18 blocking |

## 1. Preamble

Every figure any ruling below turns on was recomputed on the author's machine before the ruling was written, and none was read off the review that asserted it. That discipline earned its keep once here, on the sharpest number either review produced, and it earned it in both directions: a Skeptic finding that looks decisive on the page does not survive the script, and the same run exposes a defect in the script that neither reviewer named and that is more interesting than the finding was.

Three reviewers held the scope line. Not one finding in seventy-one rests on a regulatory, legal, consent, privacy or compliance premise, and two of the three said in their own words where such a finding would have gone if they had made one. The Constraint Guardian's scope row states that the four void findings of the earlier Guardian pass were not revisited, reopened, restated or reasoned from, and reading the twenty-four findings against that claim confirms it. This is recorded because it is the second gate in this series at which no reviewer had to be corrected on scope, and because the recurring failure mode the author has named is now two gates behind rather than one. No finding below is voided.

Six findings of fifty-six rulings are rejected. Each rejection names its ground and argues it at the place where it is made, and the grounds are the ones this role is given: a figure that does not reproduce when the script is run, a claim that is wrong against the text the paper actually carries, a claim that is wrong against the text the paper's own reference line actually carries, and a preference dressed as a defect that the reviewer himself concedes is right on the substance. Seventeen more are narrowed. A rejection made to demonstrate independence would be worth less than an acceptance made out of deference, because it costs the author a real finding rather than a little of his time, and none of the six below was made for that reason. Equally, the eleven findings on which two or three reviewers converge are upheld without softening, because convergence from three different mandates on the same sentence is the strongest evidence a gate of this shape produces.

Eleven defects are filed more than once across the three reviews and are ruled once here. The three largest are the graph renderer with no specification, filed by the Advocate alone but reaching six named users across both papers; the default measure set being the degenerate pair at two speakers, filed three times; and the coverage range being quoted in a unit the product does not offer, filed twice. Where two reviewers proposed remedies that cannot both be applied, the ruling names the one that survives and says why, rather than accepting both and leaving the author to find the collision in the draft.

One thing should be said before the findings, because it does not appear in any of them. Both papers are better sourced than any first issue this programme has produced. Every corpus figure in MPN-S5, without exception, reproduced on a fresh run of the generator that produced it, at four decimal places where the paper gives four. Every cell of MPN-S6 section 3's new table reproduced. Both papers use the corrected implementation anchors rather than the three the verification pass found broken. Both carry their own limits in the body rather than in footnotes. The findings below are what is wrong with two good drafts, and the disposition on MPN-S6 is a statement about its ruling table and not about its research.

## 2. Method: what was read, what was run, and what reproduced

### 2.1 What was read

The two documents under review and the three reviews were read end to end. The governing design was read at every section either paper or any finding turns on, which is sections 4.1, 4.2, 4.3, 5a, 5b, 6.1, 6.2, 6.3, 6.4, 7.2, 7.4, 8, 8a, 9, 10 and 10a [6]. MPN-S3 was read at sections 2.3, 2.5, 2.6, 4 and 7, from the file the corpus actually holds, which is `S3-mapping-phi-rev10.md` and not the revision 9 both papers cite [7]. The assertions register was read at B4 [8]. `MPN-NOTE-05-blocking-numbers.md` and `DECISION-LOG-2026-09-14.md` were read in full [9], [10]. `MPN-S3-BL8-OPTIONS.md` was read at section 3, which is where the bias domain census both papers attribute to a script actually lives [11]. The arbitration of design revision 7 was read for its rulings on the timbre figure, on finding U8 and on change 44, all three of which findings below cite [12]. `ARBITRATION-PRD.md` was read for its form [13].

### 2.2 The corpus generators, run from the corpus

All three corpus generators were run on the author's machine from the directory the corpus holds them in, with no argument and no environment variable.

`s6_three_clef.py` exits 0 and prints 209 lines. Command and the lines that matter:

    cd .../05_DATA/03_generators && python3 s6_three_clef.py
      ROWS READ         31078 rows
      rows read      31078
      rows retained  27653
      SIX, KL EXCLUDED  4.4952%     33.8963%    26.6491%
      Four places: A_DOLLS_HOUSE 69.231%, HAMLET 50.113%, MACBETH 39.007%
      RANGE 39.0% to 69.2% over the three single plays, with 1 of 3 below half
      all seven files    churn 8.8% to 44.1%, busiest speaker 10.2% to 87.0%
      TOTAL          18 quantities

Every figure MPN-S5 takes from this script reproduces exactly: the exclusion counts, the three event densities to four places, the coverage split into three single plays and three anthologies, the dyad-churn table cell for cell, and the busiest-speaker range. The information-budget defect both papers report is real and prints as they say, listing backchannel as a sixth interaction quantity and totalling eighteen. The moderated-exchange limit is printed by the script itself and is not an editorial addition: the run prints "none of them is a moderated exchange, so neither number corroborates a claim about moderated panels".

`s6_floor_share_units.py` exits 0 and prints 112 lines. Every cell of MPN-S6 section 3's table reproduces: 64.6 and 71.0 on A Doll's House, 40.4 and 53.2 on Hamlet with Horatio second by turns and the King second by words, 30.0 and 42.3 on Macbeth, the spreads at 6.4, 12.8 and 12.3 points, the substantial-speaker counts at 7, 18 and 22 and the rank-change counts at 4, 17 and 17. The run also prints, for each of the six files, a line reading "top speaker same under both units", and it returns False on two files and not on one:

    CHERRY_ORCHARD   top speaker same under both units: False
        by turns  top two: IRINA, LUBOV      by words  top two: LUBOV, LOPAKHIN
    MISS_JULIE       top speaker same under both units: False
        by turns  top two: MAURICE, JEAN     by words  top two: ADOLPHE, JEAN
    OEDIPUS_REX      top speaker same under both units: True

That settles ruling 4.3.

`s6_bias_layer.py` exits 0 and prints 330 lines. The channel census reproduces at TEXTURE 8, HARMONY 7, MELODY 6, RHYTHM 3, DYNAMICS 3, TIMBRE 1, MODE 1 and INTERVALS 1, totalling thirty, and the locality partition reproduces at twenty-two frame-local against eight historical. The domain census MPN-S5 section 4.6 attributes to this run is not in the output. The script prints one line on the subject, "every Atlas entry carries a domain: True", and no breakdown. The census at Perception 8, Decision 10, Social 6 and Memory 6 is correct and its source is `S3-mapping-phi-rev10.md` section 4.3 and `MPN-S3-BL8-OPTIONS.md` section 3 [7], [11]. That settles ruling 4.4.

### 2.3 A dependency the corpus does not carry

`s6_timbre_capacity.py` does not run to its converged table on the author's machine as the machine stands. The script requires SciPy for its polish step and prints, when SciPy is absent, a five-line warning that the run has fallen back to the pre-14-September coordinate search whose table "is a set of LOWER BOUNDS and is NOT converged: at N = 7 it returns roughly 1.03 where the polished search returns 1.09". SciPy was not installed. It was installed for this arbitration, at version 1.15.3, and every timbre figure below was computed after that.

This is not a defect of either paper and it is worth recording anyway, because the Constraint Guardian reports running the script "clean at its default 600 polished starts" and the Skeptic reports not running it at all. One of those two runs happened somewhere the polish was available and the other did not happen, and the corpus as the author holds it today would have produced the unconverged table for either of them without either noticing, because the warning prints five lines above a table that still looks like a table. The repair is one line in the generator work queue and is given at ruling 4.1.

### 2.4 The timbre figures, and the one that did not reproduce

The converged continuous table was recomputed at the script's own defaults, 600 polished starts per N at seed 20260913 plus N, by executing the script's own machinery and calling its own `optimise`:

    N | converged max-min
    2 | 2.000000     3 | 1.512776     4 | 1.424955     5 | 1.414214
    6 | 1.414214     7 | 1.089845     8 | 1.000000     9 | 0.976561
   10 | 0.927764    11 | 0.898979    12 | 0.898979    13 | 0.866743
   14 | 0.866025

The script's inversion rule is at its own line 554 and reads `holds = max([n for n, (v, _) in curve if v >= eps] or [1])`. Applied to that table it prints:

    resolution eps | characters the channel holds
         0.80      |   14        0.90      |   10        1.00      |    7
         1.20      |    6        1.40      |    6        1.45      |    3
         1.60      |    2

Every timbre figure in MPN-S5 reproduces. Fourteen at 0.80 and ten at 0.90, which is section 3.6. The window for six at (1.0898, 1.4142], of width 0.3244, and seven at 1.0, three at 1.45 and two at 1.6, which is section 6.5. The two-character separation at 2.000000, the full diameter, which is section 5.5.

**The Skeptic's finding 3 does not reproduce.** It asserts that the inversion at 1.0 returns eight. The script returns seven, and the reason is worth stating exactly because it is the whole of the finding. Printed to six places the value at N equals eight is 1.000000. Printed as the float the optimiser actually returns it is:

    N=8  converged max-min = 0.9999999999999999   printed as 1.000000   v>=1.0 ? False

So the comparison the finding performs by hand against a six-place table returns True and the comparison the script performs against its own float returns False. The finding read the table correctly and the table is a rounding of something below the threshold.

That is not the end of it, and the rest is the reason ruling 4.1 is not a flat rejection. The script also computes an exhaustive search over all subsets of the sixteen corners of the DISC cube, which needs no seed, no polish and no optimiser, and whose values are exact:

    N | corner (exact, exhaustive over C(16,N), no seed)
    7 | 1.0     8 | 1.0     9 | 0.8660254037844386

Eight profiles drawn from the cube's corners are separated by exactly 1.0. The corners lie in the cube, so the true optimum at N equals eight is at least 1.0, and the continuous search's 0.9999999999999999 is a convergence shortfall of one part in ten thousand million million against a value an exact construction attains. The script's own assertion at its line 409, `RESULTS[n][0] >= CORNER[n][0] - 1e-9`, passes because its tolerance is 1e-9 and the shortfall is 1e-16, so nothing fails and the inversion silently reports the lower of the two tables it holds.

The Skeptic's conclusion about the mathematics is therefore right and his stated evidence is wrong, the Guardian's reproduction is right and reports an artefact, and the defect neither named is in the script. Ruling 4.1 disposes of all three.

### 2.5 What the reviewers asserted that this arbitration could not confirm

The reference implementation `mpn-conductor-standalone` is not on the author's machine at any path under the corpus. Every claim in the Constraint Guardian's section 2 that rests on a line of that tree, and the Guardian's finding 20 entirely, is therefore reported below as the reviewer's and not as confirmed here. Where a ruling turns on such a claim it says so and rules on the part that does not need the tree.

`/tmp/s6_three_clef.py`, the stale pre-repair copy the Guardian's finding 24 records, does not exist on this machine. It was the Guardian's own container that held it.

`MPN-NOTE-05-blocking-numbers.md` exists in the corpus, at `08_PAPERS/`, and `s7_blocking_numbers.py` exists at `05_DATA/03_generators/` beside `s7_listening_stimuli.py`. The Skeptic recorded both as unresolved on the strength of their absence from a container snapshot and correctly declined to call them broken. They are resolved: both are present and MPN-S5's reference [18] is sound.

Two of the Skeptic's positive verifications do not hold, and they are recorded here rather than as findings because they run in the author's favour nowhere. The first is that "MPN-S5's revision numbers for S1 through S4, the PRD and the design all match the documents". They do not match for S3. Both papers cite MPN-S3 as "revision 9, as amended by `MPN-S3-AMENDMENTS-2.md`", and the corpus holds `S3-mapping-phi-rev10.md`, revision 10, whose own status block records that the four amendments of that note "are folded into the body, so that the paper is self-contained and the amendment note becomes a record rather than a dependency". The design carries the same stale citation at its own reference [3], so this is inherited and not introduced, and it is recorded in ruling 4.7's repair. The second is the claim that the design's "at or just above the ceiling" sentence has no arithmetic above the ceiling in it, which ruling 6.11 rejects.

### 2.6 Standing rulings applied

Two are relevant and both were checked against the papers rather than assumed.

The timbre percentage-drop figure is deleted and not corrected. The design's own section 5b states the ruling in terms: "The figure revision 7 printed for the seventh character is deleted and not corrected. Revision 7 said the separation falls 28 per cent at the seventh. That value has moved four times, from 1.0123 to 1.0360 to 1.053712 to 1.089845, rising under every harder search so far" [6]. What the ruling deletes is the percentage drop, not every separation value: the design itself prints the converged table, the window and the inversion. Neither MPN-S5 nor MPN-S6 prints a percentage drop anywhere. MPN-S5 section 6.5 says "flat at the square root of two, 1.414214, from three characters to six, and strictly lower at seven", which is the corrected form and is exactly what the design permits. Both papers are already compliant, and no finding below asks for the deleted figure back. Ruling 4.1 extends the same reasoning by one cell, for the same reason, which is that no value can be printed at a resolution of exactly 1.0 that the next search will not move.

The "computed and discarded" finding of MPN-S3 stands. No finding in any of the three reviews attempts to reopen it, and none is entertained here. It is recorded because the ledger that once attacked it does not survive: `musicParams.mode` appears nowhere and `score_exporter.ts:73` writes the literal `mode: 'ionian'` with a TODO beside it, so every site carrying that finding is sound.

## 3. How to read the rulings

Rulings are numbered by group and are stable. Section 4 rules on the figures, the attributions and the citations. Section 5 rules on the honest frame and on what each paper claims for itself. Section 6 rules on MPN-S5's four surfaces. Section 7 rules on the Layer 1 measures, the arity and the counts, which reach both papers. Section 8 rules on MPN-S6's seven rulings, its backchannel disposition and its queue. Section 9 is what the author decides and this arbitration does not. Section 10 is the disposition and the tally. Section 11 is the reference list.

Each ruling carries the reviewer numbers it absorbs, written SK for the Skeptic, CG for the Constraint Guardian and UA for the User Advocate; the finding in one sentence; the verdict; the reasoning, with the text or the output that decides it; and, where the verdict is UPHELD or UPHELD-NARROWED, the repair, written so that a writer can execute it without asking a question.

## 4. The figures, the attributions and the citations

### 4.1 The timbre inversion at a resolution of 1.0

**Absorbs SK3.** The Skeptic finds that the inversion of the timbre separation curve at a perceptual resolution of 1.0 returns eight characters and that MPN-S5 section 6.5, which says seven, is therefore wrong in the only cell either paper gets wrong.

**UPHELD-NARROWED, and the blocking claim against MPN-S5 is rejected.**

MPN-S5 is not wrong against its source and is not wrong against its script. Section 6.5 says the answer holds "seven at a resolution of 1.0, three at 1.45 and two at 1.6", and the script prints seven at 1.0. The design says the same in the same words at its section 5b: "at a resolution of 1.0 the channel holds seven, at 1.45 it holds three, and at 1.6 it holds two" [6]. The paper reproduced its governing document and its generator, which is what a use-case paper is for, and the finding that it printed a wrong number is rejected on the output at section 2.4.

What survives, and it is worth more than the finding was, is that the cell is decided at the sixteenth decimal place. The converged continuous search returns 0.9999999999999999 at eight characters, which prints as 1.000000 and fails a comparison against 1.0. The exhaustive corner search, which is exact and needs no seed, returns exactly 1.0 at eight. The corners lie in the cube, so on the mathematics eight profiles are separated at a resolution of exactly 1.0 and the script's inversion reports seven because it reads only the continuous table. The script's own dominance assertion at line 409 carries a tolerance of 1e-9 and the shortfall is 1e-16, so nothing fails.

The programme's standing ruling on this curve decides the repair. The design deleted the seventh-character percentage drop rather than correcting it, on the ground that "no percentage drop can be printed that the next search will not move" [6]. The same ground reaches this cell exactly: the answer at a resolution of 1.0 turns on whether an optimiser lands on or below a value an exact construction attains, and the next search will move it. The repair is deletion and not correction, and it is emphatically not the change from seven to eight that the Skeptic asks for, which would print a number the design's own rule forbids.

**Repair, MPN-S5 section 6.5.** The sentence "outside it the answer changes rather than degrades, holding seven at a resolution of 1.0, three at 1.45 and two at 1.6" becomes "outside it the answer changes rather than degrades, holding three at a resolution of 1.45 and two at 1.6. No figure is given at a resolution of exactly 1.0, because the continuous search and the exhaustive corner search disagree there at the sixteenth decimal place and the answer at that one cell is an artefact of which table is read." The same deletion applies to the design's section 5b sentence, which is where MPN-S5 took it from, and it is the design's to make.

**Repair, generator queue, new item.** `s6_timbre_capacity.py` inverts only its continuous table while holding an exact corner table that dominates it at N equals eight. Either the inversion takes the larger of the two at each N, or the script prints, beside the inversion, the N at which the two tables disagree and by how much. The dominance assertion's tolerance of 1e-9 at line 409 is what lets the disagreement pass unnoticed and should be tightened to 0 with the corner value taken when it wins. File it as S5-10.

**Repair, generator queue, second new item.** The script requires SciPy for its polish and the corpus machine does not have it, so a re-run there silently produces the unconverged table under a five-line warning. Either the corpus pins the dependency, or the script exits non-zero when the polish is unavailable rather than printing a table it has just said is not converged. File it as S5-11.

### 4.2 The coverage range is quoted in a unit the product does not offer

**Absorbs SK4 and CG8.** Both reviewers find that the 39.0 to 69.2 per cent range MPN-S5 puts in front of a director at the point of selection is a share of lines, that lines are not one of the three units the design's settings list offers, and that the same reduction under the turn unit gives a materially different figure.

**UPHELD. Blocking on MPN-S5.**

The design's section 4.2 table gives the floor share decision as "seconds, words or turns; over what window" [6]. Lines are not on that list. The verified 69.231, 50.113 and 39.007 per cent are shares of rows, and a row in these files is a line of text, which MPN-S6 section 3 states in its own limits paragraph and MPN-S5 nowhere states. Running both generators on the same three plays gives the spread directly, and the numbers are the two papers' own:

| Work | By lines, `s6_three_clef.py` | By turns, `s6_floor_share_units.py` | By words, same |
|:---|---:|---:|---:|
| A Doll's House | 69.2 | 64.6 | 71.0 |
| Hamlet | 50.1 | 40.4 | 53.2 |
| Macbeth | 39.0 | 30.0 | 42.3 |

Two consequences follow and neither paper draws either. The headline range moves by nine points at its lower end, so a director reducing Macbeth is told two staves carry 39 per cent and the same reduction under the turn unit carries 30. And the clause "on one of the three less than half" is a property of the line unit and of the word unit and is false under the turn unit, where Hamlet at 40.4 is below half as well as Macbeth, making it two of three. MPN-S5's own item S5-1 says a dramaturg choosing between lines, words and turns "is choosing the answer", which is right and is exactly why the sorting figure cannot be quoted without its unit.

The finding is blocking because LS-2 exists to put a number in front of a director at the moment the choice is open, and a figure computed in a unit the user cannot select, shown at the point where a different unit is selected, is the defect LS-2 was created to prevent rather than an instance of it working.

**Repair, MPN-S5 section 3.5.** The sentence "**Two staves render between 39.0 and 69.2 per cent of a single play, and on one of the three less than half**" becomes "**Counted in lines, two staves render between 39.0 and 69.2 per cent of a single play. Counted in turns the same three plays give 30.0, 40.4 and 64.6 per cent, and counted in words 42.3, 53.2 and 71.0, so the unit moves the headline by up to nine points and moves Hamlet across the half-way line.**" The clause "on one of the three less than half" is deleted, and the following sentence about excluding the non-speaker token stays as it is. The table above replaces the two-column table currently in that subsection.

**Repair, MPN-S5 section 7.2.** The "Two-stave coverage" row for the play script becomes "39.0 to 69.2 per cent by lines on three single plays; 30.0 to 64.6 by turns; 42.3 to 71.0 by words".

**Repair, MPN-S5 section 3.7 and section 6.7, the LS-2 dependency.** LS-2 gains one clause: "and the coverage figure LS-2 shows is computed in whatever unit the floor-share setting currently holds, because showing a figure in one unit at the point where a different unit is selected is the defect LS-2 exists to prevent."

**Repair, MPN-S5 section 8.** Item S5-1 gains a sentence: "Until the default is fixed, every coverage figure in this paper names its unit."

### 4.3 The file where the top speaker changes

**Absorbs SK17 and CG19.** Both reviewers find that MPN-S6 section 3's claim that one file changes its top speaker between the units is false, the script printing two.

**UPHELD. Blocking on MPN-S6.**

The script prints, at section 2.2 above, "top speaker same under both units: False" on the Chekhov file and on the Strindberg file. On the Chekhov file Irina leads by turns and Lubov by words, which is what the paper says. On the Strindberg file Maurice leads by turns and Adolphe by words, and the printed rank list shows Maurice falling from rank 1 by turns to rank 4 by words. The paper's sentence is "The one file where the top speaker does change is the Chekhov anthology", and it is false over the class it enumerates, which is the six files the script reports.

Two things make this worse than a slip and both reviewers name one of them each. It sits inside the passage where the paper is at its most careful, distinguishing what its new measurement establishes from what it does not, and that passage is the best thing in the paper. And the script's three assertions are written over the three single plays only, so an anthology result that moved would fail nothing.

The substantive claim the paper draws from the table is unaffected and is correct: on the three single plays the top speaker is stable under both units and the disagreement is about the order below the top.

**Repair, MPN-S6 section 3.** The sentence "The one file where the top speaker does change is the Chekhov anthology, where Irina leads by turns and Lubov by words, and an anthology figure is not a coverage figure for any play" becomes "Two files do change their top speaker, and both are anthologies: the Chekhov file, where Irina leads by turns and Lubov by words, and the Strindberg file, where Maurice leads by turns and Adolphe by words and falls from first to fourth. An anthology figure is not a coverage figure for any play, so neither bears on the claim above."

**Repair, MPN-S6 queue, new item EX-9.** `s6_floor_share_units.py` asserts over the three single plays only. Add one assertion over the anthology block, so that a change of corpus that moved an anthology's top speaker fails the script rather than this paper.

### 4.4 Three families of figure attributed to generators that do not compute them

**Absorbs SK10 and CG18.** Both reviewers find that MPN-S5 attributes figures to script runs that do not produce them.

**UPHELD. Not blocking.**

Three attributions fail and every one of the figures is correct, which is why this is not blocking and is why it is still worth correcting in a paper whose metadata block promises that every figure is traceable to the verification file or to a run of one of three named generators.

The bias domain census at Perception 8, Decision 10, Social 6 and Memory 6 is introduced at MPN-S5 section 4.6 with "Running `s6_bias_layer.py` gives the shape of what that detector would cover". The run prints no domain breakdown. It prints one line on the subject, "every Atlas entry carries a domain: True". The census is in `S3-mapping-phi-rev10.md` section 4.3, which states it in those four numbers, and in `MPN-S3-BL8-OPTIONS.md` section 3 [7], [11].

The metre per-label counts at m1 0, m2 23,086, m3 3,229, m4 1,182 and m5 156, and the tempo band counts at 19,568, 7,517 and 568, are cited at MPN-S5 section 6.5 to references [9] and [10], which are the verification file and `s6_three_clef.py`. The verification file carries them. `s6_three_clef.py` computes the metre labels and prints only a change rate and a level count, which the run at section 2.2 confirms, so half the attribution is right and half is not. The per-label counts are printed by `s6_corpus_recount.py`, which MPN-S5 lists at its reference [13] and never cites in the body.

The within-speaker monotonicity counts at 597 falls, 827 rises and 822 raw falls over 27,416 steps are cited the same way at section 6.5. `s6_three_clef.py` performs no monotonicity test of any kind. The verification file's section D carries them and so does `s6_corpus_recount.py`.

**Repair, MPN-S5 section 4.6.** "Running `s6_bias_layer.py` gives the shape of what that detector would cover: thirty Atlas entries in four domains, Perception 8, Decision 10, Social 6 and Memory 6; thirty of thirty now naming a state coordinate" becomes "The Atlas distributes across four domains as Perception 8, Decision 10, Social 6 and Memory 6 [3], [15]. Running `s6_bias_layer.py` gives the shape of what that detector would cover: thirty of thirty now naming a state coordinate", with [3] the S3 reference and [15] the BL-8 options reference, and the rest of the sentence unchanged.

**Repair, MPN-S5 section 6.5.** The two citations carrying the metre per-label counts, the tempo band counts and the monotonicity counts change from "[9], [10]" to "[9], [13]", and reference [13] gains the sentence "Cited in section 6.5 for the metre per-label counts, the tempo band counts and the within-speaker monotonicity counts, none of which `s6_three_clef.py` prints."

**Repair, MPN-S5 metadata block.** "Every figure here is traceable to `05_DATA/03_generators/VERIFICATION-2026-09-14.txt` [9] or to a run of one of the three named generators" becomes "Every figure here is traceable to `05_DATA/03_generators/VERIFICATION-2026-09-14.txt` [9], to a run of one of the four named generators, or to a named paper in this series." Four, because `s6_corpus_recount.py` is now cited in the body.

### 4.5 The new generator's assertions and its place outside the verification pass

**Absorbs SK23.** The Skeptic finds that MPN-S6's reference line overstates what `s6_floor_share_units.py`'s three assertions guard, that its figures sit outside the verification pass, and that nothing plays the role `s6_corpus_recount.py` plays for `s6_three_clef.py`.

**REJECTED, on two of its three clauses being wrong against the reference line the finding quotes, and the third being a suggestion rather than a defect.**

The reference line reads, in full: the script "asserts three of its own results so that a change of corpus fails the script rather than this paper" [2]. That sentence already says the guard is corpus identity. The Skeptic's repair is "The reference line says what the assertions guard, which is corpus identity and not computation", which is what it says. A finding whose remedy is the text already present is not a finding.

The second clause fails for the same reason. The paper states its own departure: "These figures are new here, they are not among those `VERIFICATION-2026-09-14.txt` confirms, and the coverage column is a different computation from the verified 69.2, 50.1 and 39.0 per cent". The Skeptic concedes this in his own words, "That is a declared departure rather than a concealed one".

The third clause, that an independent recount would be cheap insurance and is the pattern the programme already has, is true and is not a defect of the paper. It is recorded here as available to the author and is not required. What is required of the script is at ruling 4.3, which is the assertion the corpus actually needs and which the Skeptic did not ask for.

### 4.6 A defect claimed as new that the cited verification file already records

**Absorbs CG17.** The Guardian finds that MPN-S5 presents the eighteen-quantity information budget as a defect its own re-run exposed, when the verification file it cites throughout already records it.

**UPHELD. Not blocking.**

The verification file's section H.1 reads "The information budget is unchanged at eighteen quantities" [14], and MPN-S5 cites that file as reference [9] for most of its figures. The paper's metadata block says "section 8 records the one defect that re-run exposed", section 6.5 says "Running it for this paper reproduces that eighteen and exposes it as a defect", and item S5-8's status reads "Found by re-running the script for this paper". MPN-S6's reference [10] gets the provenance right, saying the verification file "records that the information budget is unchanged at eighteen quantities". The defect is real, the run does reproduce it, and the novelty is not there.

**Repair, MPN-S5 metadata block.** "section 8 records the one defect that re-run exposed" becomes "section 8 carries forward the one generator defect the verification file records as outstanding".

**Repair, MPN-S5 section 6.5.** "Running it for this paper reproduces that eighteen and exposes it as a defect" becomes "Running it for this paper reproduces that eighteen, which the verification file records as unrepaired [9]".

**Repair, MPN-S5 section 8.** Item S5-8's status "Found by re-running the script for this paper" becomes "Recorded as outstanding in the verification file [9] and confirmed by re-running the script for this paper".

### 4.7 Neither paper has a citation ledger, and four external quantitative claims have no source in the programme

**Absorbs SK25.** The Skeptic finds that both metadata blocks guarantee traceability, that neither paper has a ledger, that the four class C error figures are unattributed anywhere in the corpus, and that MPN-S5 reproduces a correction already published twice.

**UPHELD-NARROWED. Blocking on both papers.**

Three of the four sub-claims hold and one resolves in the author's favour.

The four class C figures hold and this is the largest citation defect either paper carries. The design states them at its section 4.1 with no bracket reference of any kind: "The best published streaming diarisation error rate on DIHARD III is 19.8 per cent, the two vendors bundling diarisation with transcription are at 39.1 and 39.2 per cent, meeting-benchmark word error runs from 35 to 46 per cent, and a 2025 benchmark scored with overlap included finds missed speech the dominant failure across all models" [6]. `CITATION-LEDGER-DESIGN.md` has no row for any of them. MPN-S5 section 4.3 repeats all four as "the measured position" and MPN-S6 section 6 repeats the 35 to 46. Those four figures are the entire evidential basis for D15, D17, D18, the resolution floor and the sequencing of live capture. The defect is inherited and it is repeated, and a use-case paper that calls them measured is where a reader will go looking for the source.

The fourteen-name substitution table holds. MPN-S5's reference [21] calls the table at `page.tsx:96` a "fourteen-name substitution table". The verification file's section H.3 corrects it in capitals: "[21] and section 5b both call the table at page.tsx ':96' A FOURTEEN-NAME SUBSTITUTION TABLE. IT HOLDS THIRTEEN", and names all thirteen, and records the adjacent four-entry `DISC_INSTRUMENTS` map as the likely source of the miscount [14]. Nothing in the argument turns on the count, which is why the verification file says so, and a first-issue paper reproducing a correction already published twice is what a ledger exists to prevent.

The absence of a ledger for either paper holds. `CITATION-STATUS-ALL.md` covers S1 to S4, the PRD and the design, and covers neither of these.

The fourth sub-claim resolves. The Skeptic recorded MPN-S5's reference [18], `MPN-NOTE-05-blocking-numbers.md`, and the `s7_blocking_numbers.py` beside it as unresolved on the strength of their absence from a container snapshot, and correctly declined to call them broken. Both are present in the corpus, at `08_PAPERS/` and at `05_DATA/03_generators/` respectively. Reference [18] is sound and no repair is owed.

One correction to the finding is added by this arbitration and is given at section 2.5: the Skeptic's positive verification that MPN-S5's revision numbers all match is wrong for S3, which the corpus holds at revision 10 with the amendments folded in, and both papers cite revision 9 plus the amendment note. The design carries the same stale citation, so it is inherited.

**Repair, both papers.** Each gains a citation ledger on the five-status pattern the programme uses, before either is issued.

**Repair, MPN-S5 reference [21].** "the fourteen-name substitution table" becomes "the thirteen-name substitution table, corrected from fourteen at [9] section H.3".

**Repair, both papers, the class C figures.** MPN-S5 section 4.3's sentence "The measured position is this" becomes "The design's stated position is this, and it carries no reference for any of the four figures, which is recorded in this paper's ledger as unsourced". MPN-S6 section 6's "meeting-benchmark word error of 35 to 46 per cent is a recognition figure" gains ", a figure the design states without a source and which this paper's ledger records as unsourced". The tracing itself is the design's work and not either paper's, and it is filed as item S5-12: trace the four class C figures to their publications or mark them unsourced in the design first and in both papers after.

**Repair, both papers, the S3 revision.** Both reference lines for MPN-S3 change from "revision 9, as amended by `MPN-S3-AMENDMENTS-2.md`" to "`S3-mapping-phi-rev10.md`, revision 10, which folds in the four amendments of `MPN-S3-AMENDMENTS-2.md`".

### 4.8 MPN-S5's reference [2] attributes an underpinning the paper does not use

**Absorbs SK13.** The Skeptic finds that reference [2] credits MPN-S2 with supplying the reach table MPN-S5's identifiability statements rest on, and that MPN-S5 makes no identifiability statement.

**UPHELD. Not blocking.**

A search of MPN-S5 for the string returns exactly one occurrence and it is inside reference [2] itself, at line 434. The body contains none. The reach table and the identifiability bound are real and are S3 section 3's, which credits S2 section 6.4 for them, and they are not consumed here.

**Repair, MPN-S5 reference [2].** "Lemma 2, the tripod, is section 4.3; section 6.4 supplies the reach table this paper's identifiability statements rest on through [3]" becomes "Lemma 2, the tripod, is section 4.3. This paper takes nothing further from S2 directly; the reach table and the identifiability bound reach it only through [3] and are not consumed in the body."

### 4.9 The timbre row of the comparison table gives one cast size for a use case whose arity is a range

**Absorbs SK28.** The Skeptic finds that section 7.2's timbre row reports the separation at six for a use case the same table gives an arity of three to eight.

**UPHELD-NARROWED. Not blocking.**

The row is "6 at the square root of two, conditional on resolution in (1.0898, 1.4142]" and the arity row for the same column is "3 to 8". On the converged table the separation is 1.414214 at three, four, five and six, and materially lower at seven and eight. The play-script column handles the same problem correctly, saying "no figure exists above 14", so the table knows how to do this.

The narrowing is on the repair. The Skeptic asks for the row to read "1.4142 up to six, 1.0898 at seven and 1.0000 at eight, conditional on resolution", which prints the eight-character value that ruling 4.1 has just deleted as an artefact and prints the seven-character value in a summary table where it will be quoted without its history. The design's standing practice is to state the window and the kink and not the individual cells, and that is what the row should do.

**Repair, MPN-S5 section 7.2.** The podcast-and-panel cell of the "Timbre separation at that cast size" row becomes "flat at the square root of two up to a cast of six and strictly lower above it, conditional on resolution in (1.0898, 1.4142]; no figure is quoted at a cast above six".

### 4.10 A stale copy of the repaired generator

**Absorbs CG24.** The Guardian records a pre-repair copy of `s6_three_clef.py` in `/tmp` on the machine the review ran on.

**REJECTED, on the reviewer's own statement of what it is and on its not existing here.**

The finding's own text says "this is therefore a housekeeping matter rather than a defect of either paper", and it is not a defect of either paper. `/tmp/s6_three_clef.py` does not exist on the author's machine. The copy was in the Guardian's own container and is gone with it. The corpus holds one copy of the script, at `05_DATA/03_generators/s6_three_clef.py`, and it is the repaired one, which the run at section 2.2 confirms by printing the four exclusion assertions and the retained-row count.

## 5. The honest frame, and what each paper claims for itself

### 5.1 The four obligations narrow the interface and not the problem

**Absorbs SK1.** The Skeptic finds that MPN-S5's claim to turn the specification of the interaction mapping from an open job into a bounded one is not supported, three of the four obligations not being closeable and the single acceptance criterion not existing.

**UPHELD-NARROWED. Not blocking on its own, and it changes two sentences the whole paper leans on.**

The four obligations are real, they are each forced by a measured fact about a use case, and they are the most useful thing either paper produces. The User Advocate is right that section 7.3 is one of the four things that should survive every future draft. What is not supportable is the word bounded.

Test each against the question an implementer would ask, which is whether they could know they were done. Arity is closeable and is the one that is: defined at arbitrary speaker count, reduction taken outside the mapping, whole-work normalisers labelled, resolution floor a parameter. Partiality closes on its first two clauses and not its third, because the requirement that an absent measure render distinguishably from a zero one has no acceptance criterion anywhere in the corpus, which MPN-S6's own falsifier five states and closes with "The test must ask. Nobody has" [2]. Non-degeneracy at two is not an obligation at all but a disjunction between two unmade choices, and MPN-S5's own section 8 files it as item S5-5 with the status "Open, the author's or the designer's". Causality closes on its first clause, which is D66 restated, and not on its second, because "expressible in two or three quantities on one stave" is B4's estimate and the same paper records that revision 8 "produces no evidence about B4 and leaves it an unmeasured estimate carrying more weight than before".

The acceptance criterion is the sharper half. Section 7.3 says the generator of item 1 gives the question an answer and that setting the target is ordinary work. The generator does not exist, the target is not set, and the structure the mapping is to recover is undefined because the mapping has no codomain. MPN-S6 section 8 states the position without hedging: "There is no function, no acceptance criterion, no stated codomain, no channel count, no jump set and no discretisation" [2]. None of the four obligations touches a codomain, a channel count, a jump set or a discretisation. MPN-S5's own item S5-4, "Write the $\Psi$ acceptance criterion as four sub-criteria", concedes that the criterion section 7.3 announces has still to be written.

The narrowing is that the Skeptic's conclusion, that the problem has been given a boundary condition rather than a boundary, is right about the claim and wrong about the value. Four necessary conditions on the interface of a function nobody has written are worth having and are worth the section they occupy. What has to go is the claim of sufficiency, which the paper makes three times.

**Repair, MPN-S5 section 0.** "That is a stronger thing to have than four descriptions of a working product would be, because it turns specifying $\Psi$ into a bounded job with four obligations on it" becomes "That is a stronger thing to have than four descriptions of a working product would be, because it puts four necessary conditions on $\Psi$'s interface that are each forced by a measured fact rather than by preference."

**Repair, MPN-S5 section 2.** "so that specifying $\Psi$ becomes a bounded job with four stated obligations rather than an open one" becomes "so that four of the constraints on $\Psi$ are stated and forced rather than left to be discovered". The sentence two paragraphs later, "together they narrow the specification problem from 'write a mapping' to 'write a mapping satisfying four constraints and validate it against a generator that knows the answer'", gains a following sentence: "They narrow the interface and not the codomain. What musical material carries what relational quantity is untouched by all four, and it is the part that is actually open."

**Repair, MPN-S5 section 7.3.** The opening "This is what section 2 promised and it is the most useful thing this paper produces. Specifying $\Psi$ is an open job today. With these four constraints it is a bounded one" becomes "This is what section 2 promised and it is the most useful thing this paper produces. Specifying $\Psi$ is an open job today. These four constraints are necessary and are not jointly sufficient: one of them, arity, an implementer can verify structurally; two close on some of their clauses and not all; and non-degeneracy at two is a choice nobody has taken, which is item S5-5." The paragraph beginning "And one acceptance criterion serves all four" gains, as its final sentence: "That criterion does not exist yet. The generator is item 1 and is unbuilt, the target accuracy is unset, and the structure $\Psi$ is to recover is undefined while $\Psi$ has no stated codomain, so what section 7.3 supplies is the shape of the criterion and item S5-4 is the criterion itself."

### 5.2 "The author's picture is deliverable now" is false while the mapping does not exist

**Absorbs SK2.** The Skeptic finds that MPN-S5 section 6.3 says the author's picture is deliverable now, and that the same paper says the opposite two sections earlier.

**UPHELD. Blocking on MPN-S5.**

Section 6.3 reads "Generated material and recorded material are known in full before a note renders, so the score is computed ahead and played against the dialogue, and the author's picture is deliverable now on exactly the material the scope ruling makes primary". The author's picture is the three-clef running score. Two of its three staves are state staves needing a Layer 2 rating and the third is the interaction stave. The mapping does not exist. The paper's own section 2 opens with "Every use case in this paper describes a surface whose interaction mapping does not exist", and its own section 4.2 gets the sentence right for the same material two sections earlier: "the running score is available on recorded material today in principle, and what blocks it is $\Psi$ and nothing about the recording". The companion paper gets it right too: "the author's picture of a score running with the dialogue is deliverable as soon as Ψ exists" [2].

The sentence is inherited from design section 6.2, which carries the same defect, and that is a reason to correct it in both rather than to keep it in the use-case paper. A use-case paper is where a reader goes to find out what they can have, and this is the one sentence in MPN-S5 that tells a reader they can have the thing the paper is about.

It is blocking for that reason and not because the claim is subtle. The claim that survives is a real and useful one about the partition, and it is a different claim.

**Repair, MPN-S5 section 6.3.** The sentence becomes "Generated material and recorded material are known in full before a note renders, so the score is computed ahead and played against the dialogue. That removes the latency objection to the author's picture on exactly the material the scope ruling makes primary, and it removes nothing else: what blocks the picture is $\Psi$, which does not exist, and on the two state staves a Layer 2 rating, which nobody on this surface has made."

### 5.3 MPN-S6 rules in sections 1 to 7 and discloses in section 8

**Absorbs SK20 and UA15.** The Skeptic finds that every ruling MPN-S6 makes is made before the section that states its central mapping does not exist; the Advocate finds that section 1's chain of consequence and section 11's table read as settled behaviour.

**UPHELD-NARROWED. Not blocking.**

The two findings are one finding and the narrowing is the Advocate's. MPN-S6 does carry the disclosure early. Section 0's closing paragraph, headed "What this paper is not", says the paper "does not specify Ψ, which nobody has specified, a fact section 8 states rather than works around", and section 8 states it in bold. So the paper is not concealing anything and the Skeptic's framing, that the honest sentence is placed after every ruling it governs, is half right: it is placed at the front in a compressed form and in full at the back.

What survives both findings is that section 1's chain is written in the present indicative about a function that does not exist, and that the chain's rhetorical force rests on a distinction it never draws. "Φ does not run here, and the tool renders nothing about anybody's mind" is a construction argument and it is sound, because the input to the state mapping can be shown to be absent. "Ψ, the interaction mapping, takes the Layer 1 measures and renders the shape of the exchange" is the same grammatical form about a function nobody has written, and it cannot be a construction argument because there is nothing to argue about. Section 5's ruling three then attributes four specific codomain behaviours to it, "how concentrated the floor was, how the turn order alternated, the latency profile, the reciprocity of the window", which is four channel assignments in a paper whose section 8 says there is no stated codomain and no channel count.

The comparison with MPN-S5 is the Skeptic's and it is fair: MPN-S5 states the position once at the front and then carries the blocker in the "What blocks it today" row of its section 7.2 table for three of its four use cases, so a reader meeting only the summary meets the blocker. MPN-S6 has no equivalent row.

**Repair, MPN-S6 section 1.** After "Ψ, the interaction mapping, takes the Layer 1 measures and renders the shape of the exchange", insert: "That sentence is a statement of what Ψ is for and not of what it does, because Ψ has not been written; section 8 states what is missing and this section's claims about Ψ are constraints on it rather than descriptions of it. The claims boundary above, that Φ does not run here, is of the other kind and can be checked, because the input to Φ is absent and can be shown to be."

**Repair, MPN-S6 section 11.** One line is added above the rulings table: "EX-R1, EX-R2, EX-R5 and EX-R6 rule on the behaviour of a function that does not yet exist. They constrain Ψ and they do not describe it, and EX-0 is why."

### 5.4 "What the output actually is" mixes what ships with what needs the mapping

**Absorbs UA14.** The Advocate finds that MPN-S5's four subsections headed "What the output actually is" are written in the present indicative and in two of four mix an output that ships today with one that does not.

**UPHELD. Not blocking.**

The Advocate's own verdict on the paper's honesty is favourable and is adopted: section 2 is early, unhedged and unmistakable, the diagram labels the mapping NOT YET SPECIFIED in capitals, each use case closes with what it cannot do, and the decision not to re-hedge every section is correct writing rather than concealment. The residue is local and it is in one heading repeated four times.

Section 3.5 is the clearest case. Its first half describes the graph, which needs no mapping and is true today. Its second half describes the coverage figure that appears where the two principal voices are chosen, which is a step in producing a score, and a score cannot be produced. The 39.0 per cent sits in the second half and the correction arrives one subsection later. Section 5.5 has the same shape, presenting three staves of which two need a rating instrument and one needs the mapping.

**Repair, MPN-S5 sections 3.5, 4.5, 5.5 and 6.5.** Each of the four subsections headed "What the output actually is" is retitled "What the output is, and which half of it exists today", and each gains a one-line rule inside it separating the two halves, of the form "Everything above this line renders today. Everything below it waits on $\Psi$", placed where the two halves meet. In section 5.5 the line reads "Everything above this line waits on a Layer 2 rating; everything below it waits on $\Psi$ as well", because nothing in that subsection renders today.

### 5.5 "This paper does not contradict the design anywhere"

**Absorbs SK12.** The Skeptic finds that MPN-S5's metadata block makes an unenumerated negative claim over a document of thirty-one thousand words.

**UPHELD. Not blocking.**

The governing clause is right and is the correct posture for a use-case paper. The negative clause is a claim over the whole of the design made without an enumeration, in a programme whose first method rule is that a negative claim reaches no further than the class its script enumerates. It is also not costless: ruling 7.5 shows the paper departing from the design's own restatement rule without saying so, and ruling 7.6 shows the two companion papers taking different sides of a count the design states both ways.

**Repair, MPN-S5 metadata block.** "Rests on MPN-DESIGN-01 revision 8 [6], which this paper does not contradict anywhere and which governs wherever the two could be read as disagreeing" becomes "Rests on MPN-DESIGN-01 revision 8 [6], which governs wherever the two could be read as disagreeing. No enumeration of this paper against the design has been made, so no claim is made that none exists."

## 6. MPN-S5, the four surfaces

### 6.1 Every refusal, every overflow and both fallbacks route to the graph, and the graph has no specification

**Absorbs UA1.** The Advocate finds that both papers spend their whole remedial budget on a renderer nobody has specified, and that neither says so.

**UPHELD. Blocking on both papers.**

This is the largest finding in the gate and it is filed once, by one reviewer, and it reaches six named users. It was checked against the design rather than taken on the review's word.

Design section 10's inventory of what the design does not yet have runs to fourteen paragraphs and the graph is in none of them. Its only appearances in the design are three: D34 names it the primary renderer on Studio and Live, section 6.2's one sentence says it carries the full speaker set whether or not the score does, and item 2 of the implementation order lists "the graph renderer" among the shared spine's parts [6]. There is no layout, no legibility budget, no declared quantity set, no coverage statement and no entry in the inventory. The arbitration of revision 7 upheld the Advocate's earlier finding on exactly this and answered it with change 44, which reads "Schedule the evidence section 10 says decides the thesis ... no item in section 10a puts either renderer in front of a dramaturg, a director, a producer or a discourse researcher. Add the item" [12]. Scheduling a comparison is not specifying the thing compared, and revision 8 still has none.

Against that, MPN-S5 makes the graph the answer to the coverage refusal in section 3.5, to the coalition question in section 3.6, to the panel's shape in section 4.5 and to the information budget's overflow in section 6.5, where each stave declares two or three quantities "and the rest are in the graph", which on the rendered-parameter count is eleven to fourteen of seventeen. MPN-S6 makes it the destination of the per-person comparison its ruling three takes off the stave, and makes a graph-only product the honest outcome of a failed listener test, "a real product and is not a consolation". Neither paper records that nobody has written down what it draws. MPN-S5's section 8 adds nine items and none is the graph; MPN-S6's adds nine and none is the graph.

The consequence for each user is concrete. A dramaturg told to use the graph on Macbeth cannot be told what it will show for forty-nine speakers, because no legibility budget has ever been measured or estimated for it, while three have been measured for the score. A producer is told the busiest speaker's position is "visible rather than inferred", which is a claim about a layout nobody has chosen. An Expression user is offered a graph-only product with nothing to hand them.

Both papers are entitled to say the specification is the design's to write. Neither is entitled to route six users' only remaining action into it without naming the gap.

**Repair, MPN-S5 section 3.2.** After "**Studio**, and the **graph** leads", insert: "One thing has to be said here because every later section leans on it. The graph is the design's primary renderer on Studio and on Live and it has no specification anywhere in this programme: no layout, no legibility budget, no declared quantity set and no coverage statement, and design section 10's inventory of what the design lacks does not list it [6]. Item 9 schedules a comparison between the two renderers and does not specify either. Every place below where this paper sends a user to the graph is a place where it is sending them to an unspecified object, and item S5-13 is what closes that."

**Repair, MPN-S5 section 8, new item S5-13.** "Specify the graph renderer: layout, what a node and an edge carry, a legibility budget at the cast sizes section 3.5 measures, and a coverage statement. Depends on design item 2 and design section 10, which does not currently list it. Status: open, and it is the design's. This paper routes four use cases' refusals, overflows and fallbacks into it."

**Repair, MPN-S6 section 8.** The paragraph listing what the surface needs from the implementation order gains: "And item 2's graph renderer, which has no specification anywhere in this programme and which section 2 makes the whole of the product that survives a failed listener test. A visual renderer offered as the honest outcome of a failed test cannot be a renderer nobody has described, and EX-10 is what closes that."

**Repair, MPN-S6 section 11, new item EX-10.** "Specify the graph renderer for this surface, or record that section 2's fallback is a product that has not been described. Blocks: section 2's fallback and ruling three's destination for the named comparison. Status: open, and it is the design's."

### 6.2 The two use cases whose output is a state stave carry no state-mapping dependency

**Absorbs CG1 and UA13.** The Guardian finds that the interview and the live surface render state staves and that MPN-S5 names none of the eight things a state stave needs; the Advocate finds that the interview's user needs a rating instrument and the paper's queue names a rating store.

**UPHELD. Blocking on MPN-S5.**

MPN-S5 section 5.5 gives the interview an output of two state staves and one interaction stave, and section 6.5 gives the live surface the same three. The state mapping runs only where a human has rated a state and its domain is the nine-component state MPN-S3 specifies. Rendering either output needs a Layer 2 rating store, a rating instrument that produces that state for a non-clinical rater, the interpolation margin, the function inside the harmonic parameter, a register triple that is not hardcoded, the eight-marking dynamics ladder, the metre and tempo repairs, and the notation renderer's rounding declaration.

Two of those were verified against the corpus here. The design's section 10a says in terms that what it still owes is "the interpolation margin and, new today, the function $f$ inside the harmonic parameter, which the author's decision left unnamed" [6]. MPN-S3 section 7 carries the second as item S3-12: "Name $f(\text{state})$ in section 2.5's $\operatorname{round}(23 f(\text{state}))$. The decision fixes the form and the constant and leaves the function unnamed. **Open, and the author's**" [7]. MPN-S5 names neither anywhere, in its body, in its section 8 queue, or in its list of items read from the design's queues, which runs item 1 to item 9 and DC-1 and mentions no parameter of the state mapping at all. Section 6.5 counts the harmonic parameter and the mode inside its own information budget while neither has a function.

The Advocate's half is the sharper one for a use-case paper and it is upheld with it. MPN-S5 handles this correctly for the dramaturg, saying flatly at section 3.6 that the stave "cannot render a $\Phi$ stave unless the dramaturg rates a state ... and that is Layer 2 work the dramaturg has to do", and does not handle it at all for the interviewer, where section 5.5 presents the two state staves in the present indicative and section 5.7 names a dependency on "item 2's rating store". A store is a database. The interviewer does not lack somewhere to put a rating. There is no gradient definition written for anybody but a therapist, no anchors, no scale and no worked example, and the rating apparatus the programme owns belongs to the PRD and, as MPN-S5 section 7.4 correctly says, does not travel.

The Guardian's claims about the reference implementation, that no file contains the Autonomy vocabulary, that two files write a fixed register triple and that the reference data carries seven dynamic levels against eight, could not be confirmed here because the tree is not on this machine. They are not needed: the design and MPN-S3 carry the interpolation margin, the function and the rating instrument on their own record, and those three alone make the finding.

**Repair, MPN-S5 section 5.5.** The sentence "On the $\Phi$ staves, a state a person rated, with the sentence saying so on the face of the output" becomes "On the $\Phi$ staves, a state a person rated, with the sentence saying so on the face of the output. Nobody can make that rating today. Φ runs only where a human has rated a state, the rating apparatus this programme owns is the Instrument's and does not travel, and no instrument exists that would let a reader of interviews rate the nine-component state: no gradient definitions written for a non-clinical rater, no anchors, no scale and no worked example. That is item S5-14, and it is a larger obstacle on this use case than $\Psi$ is."

**Repair, MPN-S5 section 5.7 and section 6.7.** The dependency lists gain, in both: "And the state mapping's own unfixed parameters, which this paper counts in its information budget and does not otherwise name: the interpolation margin $\delta$, which blocks the mode channel and through it every $\Phi$ stave; the function $f$ inside the harmonic parameter, item S3-12, which the author's decision of 14 September 2026 left unnamed [8], [17]; and a register triple that is not fixed before a rating reaches it. Neither δ nor f is in the design's implementation order, both are in its section 10a as what it still owes, and neither is closed."

**Repair, MPN-S5 section 8, new item S5-14.** "A rating instrument for a non-clinical rater: gradient definitions, anchors, a scale and a worked example, producing the nine-component state $\Phi$'s domain requires. Depends on design item 2's rating store, which is the place to put a rating and not the thing that makes one. Status: open. It exists in no document in this programme; the Instrument's is the PRD's and does not travel, per section 7.4."

**Repair, MPN-S5 section 8, new item S5-15.** "Carry the state mapping's two unfixed parameters, $\delta$ and $f$, in this paper's dependency lists for use cases 3 and 4, which render $\Phi$ staves. Depends on design section 10a and MPN-S3 item S3-12. Status: open, and both are the author's."

### 6.3 Class C is offered as an ingest option for an arity the design forbids on class C

**Absorbs CG2.** The Guardian finds that MPN-S5 offers class C as an ingest option for a use case whose arity the design says class C cannot carry.

**UPHELD. Blocking on MPN-S5.**

Design section 4.1 states it in four words and a sentence: "**Class C does not carry a multi-party surface.** A panel of five on one microphone is precisely the material these error rates are measured on" [6]. MPN-S5 section 7.2 puts the podcast and panel at three to eight speakers and gives its ingest row as "A with timings, B, or C". Section 4.4 tabulates a full class C column for the same use case, with floor share above the floor and degraded adjacency, latency and reciprocity. Section 4.3 states the prohibition correctly in its last sentence and then advises the producer that on a mix "the engine will tell you about the floor at a stated resolution and will refuse to tell you about interruption", which describes a surface that does not exist at that arity.

So the paper states the rule once and contradicts it twice, and the contradiction is in the table and the summary row, which is where a reader looking for the ingest answer will go. Class C does not degrade this use case, it removes it.

**Repair, MPN-S5 section 4.4.** The class C column heading becomes "Class C, mixed, which carries no multi-party surface at all", and a line is added directly beneath the table: "The class C column is what a class C analysis of a two-party exchange carries. At the three to eight speakers this use case is defined by, design section 4.1 rules that class C carries no multi-party surface, so the column has no instance on this use case's own arity [6]."

**Repair, MPN-S5 section 4.3.** "The producer's practical reading of that paragraph is short. If you have the multitrack, keep it. If you have only the mix, the engine will tell you about the floor at a stated resolution and will refuse to tell you about interruption, and the refusal is the honest answer rather than a missing feature" becomes "The producer's practical reading of that paragraph is short. If you have the multitrack, keep it. If you have only the mix of a panel, there is no surface: design section 4.1 rules that class C carries no multi-party surface, and the refusal is sorted as **your ingest class** with the one action being a per-speaker capture. On a two-party mix the engine will tell you about the floor at a stated resolution and will refuse to tell you about interruption, and that refusal is the honest answer rather than a missing feature."

**Repair, MPN-S5 section 7.2.** The ingest row for the podcast and panel becomes "A with timings, or B. Class C carries no multi-party surface at this arity, per design 4.1".

### 6.4 The podcast use case is written around material the scope statement excludes

**Absorbs CG3.** The Guardian finds that MPN-S5's second use case is written around a producer with real recordings, which its own scope row excludes, and that section 7.2's summary row does not say so.

**REJECTED, on the second half being wrong against the table and the first half being an observation the paper already makes three times.**

Section 7.2's summary row says it. The "What blocks it today" cell for the podcast and panel column reads, verbatim: "$\Psi$; class B and C are future work if real audio is ever used". That is the sentence the finding says the row does not carry.

Section 4.3 says it: "**class B is future work if real audio is ever used**, which section 4.1, section 7.6 and item 6a of the implementation order all repeat, and which this paper repeats here rather than leaving to be discovered two sections away". Section 4.7 says it in the dependency list: "**Item 6a, live capture, class B first and then class C with its resolution floor and suppressed overlap measures, is future work if real audio is ever used**".

The finding's underlying observation, that within scope the podcast and the panel are generated dialogue and therefore class A by construction, is true and is not a defect the paper commits. The author's ruling puts these use cases in the market by name, and a use-case paper describing what the surface would do on a producer's real multitrack, marked three times as future work, is the paper doing its job. Ruling 6.3 disposes of the one place where the class content genuinely contradicts the design, which is the arity, and nothing further is owed.

### 6.5 The panel section's measured content, after the moderator limit is applied

**Absorbs SK5.** The Skeptic finds that once the moderated-exchange limit is applied the panel section has no measured content about panels, and that the comparison table carries the busiest-speaker range as though it had.

**UPHELD-NARROWED. Blocking on MPN-S5, on the table row alone.**

The limit is real and the script prints it: "none of them is a moderated exchange, so neither number corroborates a claim about moderated panels". MPN-S5 section 4.5 states it plainly and states it well, which is the paper at its best. What follows from it is the narrow half of the Skeptic's finding: section 4.5 bolds "**The busiest speaker sits in 10.2 to 87.0 per cent of all active pairs**" and calls it "the number this use case turns on", and section 7.2's comparison table carries the range in the podcast-and-panel column with no limit attached, so a reader meeting the table row takes it as a fact about panels, which the paper's own paragraph forbids.

The narrowing is on the wider claim. The Skeptic argues that the section's measured content specific to a panel is zero and that its quantitative weight rests entirely on drama files. That is true and it is not a defect, because the section says so and because the corpus is the corpus. What the range does corroborate is stated correctly by the paper and by the script: the general shape of the objection D10 was withdrawn on, which is that a dominant voice sits in most active pairs, so an automatic reduction would render that voice against everyone else. That is a real result about a real design decision and it should not be demoted. What must go is the phrase calling it the number the use case turns on, because the number the use case turns on is the one item S5-3 would supply.

**Repair, MPN-S5 section 4.5.** "**The busiest speaker sits in 10.2 to 87.0 per cent of all active pairs**, and that is the number this use case turns on" becomes "**The busiest speaker sits in 10.2 to 87.0 per cent of all active pairs**, measured on six Gutenberg play files, three of them anthologies and none of them a moderated exchange. It is the number decision D10 turns on and it is not the number this use case turns on, which is what a moderator does to the dyad structure of a panel and which this corpus cannot supply."

**Repair, MPN-S5 section 7.2.** The "Two-stave coverage" row's podcast-and-panel cell becomes "User's choice. The busiest speaker sits in 10.2 to 87.0 per cent of active pairs on six play files, none of them a moderated exchange, so the range corroborates D10 and says nothing about panels."

### 6.6 The producer is made responsible for a selection and is given nothing to make it with

**Absorbs UA11.** The Advocate finds that dyad selection is a user act under D10, that MPN-S5 measures what an automatic rule would discard and never says how the producer performs the act it protects, and that the quantity which would support the act is already on the screen.

**UPHELD. Blocking on MPN-S5.**

Section 4.5 is the strongest measured passage in the paper and it stops one sentence short. It establishes that in an exchange with a dominant voice an automatic active-dyad rule "renders that voice against everyone else for most of the runtime and discards the clash the producer came for", and concludes "That is why the active-dyad reduction is a **user act** and not an automatic one, which is decision D10, and its justification is now a number rather than an argument". Not one word of the section says how the producer performs it. On a panel of five there are ten pairs and on six there are fifteen, and the paper gives no ordering over them, no preview, no summary and no rule. D36's reversibility is what makes guessing affordable, not what makes it unnecessary, and the paper's own following observation, that on a panel of five or six the coverage figure is the producer's decision rather than the engine's, arrives as a reassurance where a mechanism is owed.

The Advocate's sharp half is right and is not a redesign: adjacency count over the declared window is the edge weight of the graph the same section has just drawn, and a pair that clashes is a pair whose edge weight the producer did not expect. The section draws the graph, says the busiest speaker's position in it is visible rather than inferred, and never connects the edge weights to the selection the next paragraph makes the user responsible for.

**Repair, MPN-S5 section 4.5.** After "its justification is now a number rather than an argument", insert: "What D10 does not supply is how the producer performs the act it protects. On a panel of five there are ten pairs and on six fifteen, and this paper specifies no ordering, no preview and no rule over them, so the producer selects, renders, looks and selects again. The quantity that would support the act is already computed and already drawn: adjacency count over the declared window is the edge weight of the graph above, and a pair whose weight the producer did not expect is the pair worth rendering. Turning that into a selection aid is item S5-16 and it is not proposed here, because specifying a renderer is the design's work and the graph has none, per section 3.2."

**Repair, MPN-S5 section 8, new item S5-16.** "Give the dyad selection an informed form. D10 makes the reduction a user act and supplies no ordering over the pairs; the adjacency count over the declared window already exists as the graph's edge weight and is the obvious candidate. Depends on S5-13, the graph specification. Status: open."

### 6.7 The redraw rate of the third stave has not been measured, and what is offered measures something else

**Absorbs CG9.** The Guardian finds that MPN-S5 answers "How often the third stave redraws" with dyad churn, which measures how often the stave's referent changes rather than how often its contents change.

**UPHELD. Blocking on MPN-S5.**

Section 6.5 heads a paragraph "How often the third stave redraws" and answers it with the churn table, 8.8 to 44.1 per cent, concluding "a third stave pinned to it would be a stave rather than a flicker". Dyad churn measures how often the pair the stave refers to changes. With the pair pinned for a hundred turns, floor share, latency, overlap and reciprocity all move on every one of them, so the two are different quantities and the second is unmeasured. MPN-S6 section 8 states the true position in one sentence and MPN-S5 does not carry it: "**Nothing equivalent has ever been measured for a Ψ stave, because Ψ does not exist**, so Expression has no legibility budget at all, neither measured nor estimated" [2].

The consequence is the one that makes it blocking. LS-1 is a specification problem before it is a tuning number, which MPN-S5 says correctly, and it cannot be specified for the third stave on any evidence the programme holds or can obtain before item 1 and item 3. The paper offers a measurement in the place where it says the decision will be made.

**Repair, MPN-S5 section 6.5.** The paragraph headed "**How often the third stave redraws**" is retitled "**How often the third stave's referent changes, which is not how often it redraws**", and gains as its final sentence: "That is the rate at which the pair changes and not the rate at which the stave's contents change, which with a pinned pair move on every turn. Nothing equivalent to the event-density measurement has ever been made for a $\Psi$ stave, because $\Psi$ does not exist, so the third stave has no legibility budget, measured or estimated, and LS-1 cannot be specified for it before item 3."

**Repair, MPN-S5 section 6.7.** The LS-1 dependency gains: "and LS-1's mechanism cannot be chosen for the third stave until a $\Psi$ exists to measure, which makes it strictly later than item 3 rather than part of item 6".

### 6.8 LS-3's default pair for the state staves is justified by the measurement that argues against one of them

**Absorbs CG10.** The Guardian finds that MPN-S5 states D69's default as dynamics and tempo "which are the two channels whose event densities are measured below", and that the measurement below shows the dynamic marking changing on 4.4952 per cent of rows.

**UPHELD-NARROWED. Blocking on MPN-S5, on the justification and not on the default.**

The facts are the paper's own and they reproduce: dynamics changes on 4.4952 per cent of retained rows, tempo on 33.8963 and metre on 26.6491. So the stated default pairs the least legible channel in the census with one of the two most volatile and displaces the third, and the justification offered for it is that these are the two the programme happened to measure, which is not a legibility argument at all. The design carries the same justification at its section 6.2 and the paper repeats it at section 6.4 without composing it with its own section 6.5.

The narrowing is that the default may well be right and the Guardian says so. A near-frozen channel is cheap to carry and its rare excursions may be exactly what a reader should be shown, and that is a legibility argument that would support keeping dynamics. It is not the argument D69 gives. Choosing between them is the author's and is at ruling 9.5.

**Repair, MPN-S5 section 6.4.** "**dynamics and tempo on each $\Phi$ stave**, which are the two channels whose event densities are measured below" becomes "**dynamics and tempo on each $\Phi$ stave**. The design justifies that pair as the two channels whose event densities it measures, which is a statement about what the programme measured rather than about legibility, and section 6.5's measurement cuts against half of it: the dynamic marking changes on one row in twenty-two while metre, which the pair displaces, changes on one in four. Whether a near-frozen line is the right default because its excursions are rare, or the wrong one because a reader cannot track a line that does not move, is not settled anywhere and is item S5-17."

**Repair, MPN-S5 section 8, new item S5-17.** "Re-derive LS-3's default pair for the $\Phi$ staves on a legibility ground rather than on which channels were measured. Depends on D69 and on section 6.5's event densities. Status: open, and it is the author's. The two candidate arguments are stated in section 6.4 and neither is currently made."

### 6.9 Participant mode has no reader on the material it is restored for

**Absorbs CG12 and UA17.** Both reviewers find that MPN-S5 restores participant mode on the ground that there is nobody in the room and then defines it as rendering to the exchange's own participants.

**UPHELD-NARROWED. Not blocking.**

The two sentences are in the same paragraph of section 6.1: "the participant mode renders the same surface, while the exchange is running, to the exchange's own participants", and "the design restores the participant clause in full, because the restrictions two earlier revisions placed on it rested on a premise about real people in a real room and on generated material there is nobody in the room". If there is nobody in the room the mode has nobody to render to, and the design reaches the same place from the other side, replacing PM-1 with DC-1 precisely because there are no people and what can be measured is a generator conditioned on its own display.

The narrowing is the Advocate's and is adopted: this is not an argument for removing the mode, which R3 forbids and which the Understanding Lock places with the author, and it costs the named users nothing directly. It is an argument that a use-case paper should say which of its modes has a user today. The paper already carries DC-1 and already says what DC-1 measures, so the repair is one sentence joining two things it has.

**Repair, MPN-S5 section 6.1.** After "and on generated material there is nobody in the room [6]", insert: "The same sentence is why the mode has no reader today. On the material the scope ruling makes primary the participants are generated and read nothing, so participant mode is specified, built and gated on $\Psi$ alone, and its reader within scope is the generator itself under DC-1, which section 6.6 sets out. Its human reader arrives with a live capture, which is future work if real audio is ever used."

### 6.10 The live score has one chooser and several readers

**Absorbs UA12.** The Advocate finds that D69's configuration answer is an answer about one person, that the surface has readers who did not choose, and that a mid-session change of what a stave carries is the same object as the relabel the design refuses in session.

**UPHELD. Blocking on MPN-S5.**

This is the only finding in the gate that puts two of the design's own rules against each other, and it holds.

Section 6.4 gives D69's answer: the default is preselected, the user is asked once before the session, every alternative states what it displaces, and the selection is reversible without re-ingest under D36 "so the cost of choosing wrongly is a click". Section 6.1 says participant mode renders the same surface to the exchange's own participants. So there is a chooser and there are readers, and the paper never separates them. The reader who did not choose sees the declared quantities on the output, which is D53 working, and sees nothing of what was displaced, because "states what it displaces" is a property of a configuration screen the reader never opens. Eleven to fourteen of seventeen rendered parameters are absent and the reader is told the names of the two or three present and nothing about the rest.

The second half is the collision. "The cost of choosing wrongly is a click" is a sentence about a running surface. A reader tracking two lines for four minutes, whose chooser clicks, now has two lines carrying different quantities and no way to tell the new line from the old. What the design says about the neighbouring case is at section 8a and MPN-S5 repeats it at section 6.6: mid-session speaker relabelling is rejected in session "because a relabel silently rewrites floor share for the whole elapsed window", the session is marked discontinuous when the speaker set changes, and the governing rule is that a stale or unsound reading must not be indistinguishable from a sound one. A mid-session change of which quantities a stave carries is the same object: it silently rewrites what the reader has been tracking. The design refuses one and D36 advertises the other as a convenience, and MPN-S5 quotes the convenience into a section about a surface that is running.

**Repair, MPN-S5 section 6.4.** After "the selection is reversible without re-ingest under D36 so the cost of choosing wrongly is a click [6]", insert: "That is an answer about one person at one screen and this surface has several readers. In participant mode the chooser configures and the participants read, and a reader who did not choose is shown the two or three declared quantities and nothing about the eleven to fourteen that were displaced, because the sentence naming what an alternative displaces belongs to the configuration screen. And the click is not costless mid-session: changing which quantities a stave carries while a reader is tracking it silently rewrites what they have been tracking, which is the same object as the mid-session relabel section 6.6 records the design as refusing, and for the same stated reason. This paper does not resolve it. Item S5-18 does."

**Repair, MPN-S5 section 6.6.** The paragraph that lists the three instances of the technical rule gains a fourth: "A fourth instance is owed and is not in the design. A mid-session change of the declared quantity set rewrites what a reader has been tracking exactly as a relabel rewrites floor share, so either it is refused in session as a relabel is, or the surface marks the seam as it marks a speaker-set discontinuity. Neither is specified."

**Repair, MPN-S5 section 8, new item S5-18.** "Rule on a mid-session change of LS-3's declared quantity set on a surface with readers who did not choose: refused in session as D36's relabel is, or permitted with a marked seam as a speaker-set discontinuity is. State what a non-choosing reader is told about what was displaced. Depends on D36, D53, D69 and section 8a. Status: open, and it is the design's."

### 6.11 "At or just above the ceiling"

**Absorbs SK11.** The Skeptic finds that MPN-S5's summary of the information budget says the state staves sit at or just above the ceiling and that the paper's own arithmetic never reaches above it.

**REJECTED, on the finding reading a range as a single value and on the paper's own sentence saying so.**

The finding's argument is that six moving quantities across two state staves against a ceiling of six is at the ceiling and never above it. The budget is not six. B4 puts a stave at two to three independent quantities, so two staves carry four to six, and MPN-S5's own sentence in the preceding paragraph says exactly that: "each $\Phi$ stave carries **three moving state quantities** with the profile beside them, giving **six across two staves against a budget of four to six**". Six against a budget whose lower value is four is above that budget. The design's sentence, which MPN-S5 inherits, says "the $\Phi$ staves sit at or just above their ceiling", and that tracks the two ends of B4's range precisely: at the ceiling where B4 is three, above it where B4 is two.

One word in it is loose and it is "just". At B4's lower value six against four is fifty per cent above, which is not just above anything, and an author who wants the sentence tight can write "at their ceiling on B4's upper value and half again above it on its lower". That is a tightening and not a correction, and nothing in the conclusion moves either way, because the conclusion is carried by the interaction stave at five against two to three.

The finding's second limb, that the only route above is an alternative counting the design invites where the register triple counts as three quantities rather than one, is not supported either. The design counts the register triple as one quantity, at its section 6.2, listing "three moving state quantities, trauma, entropy and the register triple", and invites no alternative.

### 6.12 "Immune" on the interview's timbre case

**Absorbs SK8.** The Skeptic finds that MPN-S5 calls the interview immune where the immunity is degenerate, and that the paper's own next paragraph names a failure at two speakers that no resolution touches.

**REJECTED, on the paper saying what the finding asks it to say, in the subsection the finding quotes.**

The paper does not claim immunity from timbre failure. It claims immunity from one thing and names it: "**So the interview is the only cast size in this paper immune to the unmeasured resolution of section 5b.5**, because any resolution finer than the diameter of the whole space suffices for two." That is exactly and only true, and it was reproduced here: the two-character separation is 2.000000, the full diameter of the reachable set, so no resolution the channel is usable at all at can fail to separate two.

The exposure the finding says the paper misses is in the same subsection, two paragraphs down, under a heading that announces it: "Two qualifications travel with it and neither is small", the second being "never assign two characters profiles that differ by a constant, because the null direction of the map is overall profile magnitude and a pair differing only in magnitude renders identically however far apart their DISC scores look on paper". The finding's own repair is to state that exposure "in the same sentence rather than the next paragraph", which is a preference about placement in a passage the finding concedes is arithmetically right.

The finding's one genuine addition is that the PRD requires the instrument to compute and show the audible fraction of every assigned pair, written for this same two-node case, and that MPN-S5 does not name it. That is true and it is a cross-reference rather than a defect, and the paper's section 7.4 already states the governing rule about what crosses from the PRD, which is D72, that shared renderers are an implementation fact and not a licence. An author who wants the cross-reference may add it. Nothing is required.

### 6.13 The staleness horizon is stated where nothing can fall behind

**Absorbs CG13.** The Guardian finds that MPN-S5 states the blanking rule unconditionally two sections after establishing that on material known in advance nothing can go stale.

**UPHELD. Not blocking.**

Section 6.6 reads "Participant mode is a delayed feedback loop by construction, and a frozen picture of a conversation that has already ended is worse than a blank one, so after a declared staleness horizon the display blanks and says it is stale". Sections 6.2 and 6.3 establish, following D52 and D67, that on material known in advance the score is computed ahead and played against the dialogue, which is a synchronisation problem with no lag at all. The horizon reaches only the live capture that section 6.3 places outside the primary material. MPN-S6 scopes it correctly at its section 6, giving the blanking and the discontinuity marking to the live class B capture alone, and MPN-S5 should adopt that scoping.

**Repair, MPN-S5 section 6.6.** "**It blanks rather than freezing.** Participant mode is a delayed feedback loop by construction" becomes "**On a live capture it blanks rather than freezing.** On material known in advance the stave is synchronous and nothing can fall behind, so the horizon has no instance there. On a live capture participant mode is a delayed feedback loop".

### 6.14 The non-duplication claim, and one defect filed under two numbers

**Absorbs SK26.** The Skeptic finds that the two companion papers duplicate heavily, that MPN-S5 asserts they do not, and that one defect is filed twice under two item numbers.

**UPHELD-NARROWED. Not blocking.**

The duplication half is narrowed close to nothing. MPN-S5's sentence is about MPN-S6's material, not about the design's: "it is cross-referenced here and is not duplicated here, because it asks a different question of the same engine and deserves its own paper". Most of what the Skeptic lists as duplicated is design material that both papers restate because both are use-case papers against the same design, and restating a governing document in two papers is not duplication of either. The four use cases and the seven rulings are genuinely disjoint, which is what the sentence claims.

Two halves survive and both are small and real. The defect is filed twice: MPN-S5 files the generator's information budget as item S5-8 and MPN-S6 files it as EX-8, neither cross-references the other, and anyone working the queue will fix it once and close one item. And the cross-reference is asymmetric: MPN-S5 cites MPN-S6 at [19] and devotes section 7.4 to it, saying "The four obligations of section 7.3 therefore reach MPN-S6 unchanged", while MPN-S6 does not cite MPN-S5 anywhere and neither adopts nor refuses the four obligations. One paper has taken a position about the other that the other has not answered, and ruling 8.8 shows that the position does not survive the trip.

**Repair, MPN-S5 section 8 and MPN-S6 section 11.** Item S5-8 and item EX-8 are the same item. MPN-S6's EX-8 is deleted and replaced by a line reading "The generator's information budget is MPN-S5 item S5-8 and is not filed twice", and MPN-S5's S5-8 gains "and is EX-8 of MPN-S6, which files it as a reference to this item".

**Repair, MPN-S6 section 0 or section 8.** One paragraph is added: "MPN-S5 collects four obligations on $\Psi$ and states that all four reach this surface unchanged [ref]. Three do. The non-degeneracy obligation does not, and section 10's falsifier one is why: MPN-S5's first admissible answer makes $\Psi$ at two speakers a function of latency and overlap alone, and section 4 of this paper withholds overlap, so it arrives here as a function of latency alone; and MPN-S5's second admissible answer removes the interaction stave, which on this surface removes the surface. This paper adopts the partiality, arity and causality obligations and refuses the third as stated."

### 6.15 The engineering hygiene rule

**Absorbs CG20.** The Guardian finds that the one hygiene rule MPN-S5 says the four use cases share exists in neither of its two mechanisms.

**UPHELD-NARROWED. Not blocking.**

The reference implementation is not on this machine, so the two mechanism claims, that no continuous integration configuration exists and that the history purge has not been done, are reported as the Guardian's and are not confirmed here. The repair does not need them. MPN-S5 section 7.1 lists among the four things the use cases share "the one engineering hygiene rule that survives the scope ruling: no credential in source or image, secret scanning in continuous integration, and a history purge if one lands", and states it in the present indicative as a thing that is shared, where every other unbuilt item in the paper is marked as unbuilt. Whatever the tree's state, the paper should say which of the three clauses is a rule and which are mechanisms, and whether the mechanisms exist. This is the design's own D23, which the design states in terms is not a rights matter, so nothing in it touches the scope ruling.

**Repair, MPN-S5 section 7.1.** "And they share the one engineering hygiene rule that survives the scope ruling: no credential in source or image, secret scanning in continuous integration, and a history purge if one lands, which is the programme's own finding S4-1 and which has bitten this programme once" becomes "And they share the one engineering hygiene rule that survives the scope ruling, which is that no credential belongs in source or image, and the two mechanisms D23 gives it, which are secret scanning in continuous integration and a history purge if one lands. The rule is shared. Whether either mechanism is built is a fact about the tree and is stated in the queue rather than assumed here, which is the same form this paper uses for every other item. This is the programme's own finding S4-1 and it has bitten this programme once."

**Repair, MPN-S5 section 8, new item S5-19.** "Record the state of D23's two mechanisms against the tree: whether secret scanning runs in continuous integration, and whether the history purge S4-1 names has been done. Depends on D23 and design section 7.3. Status: open. This is engineering hygiene and the design states that it is not a rights matter."

## 7. The Layer 1 measures, the arity and the counts

### 7.1 The declared default set is the degenerate pair at the arity both papers call most likely

**Absorbs SK14, CG6 and UA2.** All three reviewers find that D69's default set of floor share and adjacency, adopted by MPN-S5 for the live surface and by MPN-S6 for Expression's single stave, renders the two measures that carry no information at two speakers.

**UPHELD. Blocking on both papers.**

This is the finding all three reviewers reached independently from three different mandates, and it is right.

Design section 6.3 states the degeneracy: "At two speakers, adjacency is deterministic, reciprocity is 1 by construction and floor share is one number and its complement, so **three of the five Layer 1 measures carry no information** at that size; latency and overlap still do" [6]. Design section 6.2 states the default: "floor share and adjacency on the Ψ stave, which are the two Layer 1 measures available on every ingest class and therefore the two that never blank", and "A user who never opens the configuration gets a defensible score rather than an empty one" [6]. MPN-S5 section 6.4 repeats both halves of the default, MPN-S6 section 9 repeats it word for word for a one-stave layout, and MPN-S6 section 10 establishes four sections later that "a two-person conversation is the most likely material any version of this surface is pointed at".

Compose them. On the arity the papers name as most likely, the preselected default renders one degree of freedom and one constant, and omits latency, which is the one measure that is not degenerate and which MPN-S6's own falsifier one identifies as what is left. The design's central honesty rule, stated at its sections 4.1 and 4.2 and repeated three times in MPN-S6, is that a flat output from a degenerate input and a flat output from a flat conversation must never look alike. The stated default breaks that rule at two speakers by construction, in the one configuration the design guarantees every user meets at least once.

It is worst on MPN-S6, because Expression has one stave and the default fills both of its slots with the uninformative pair, leaving no room for latency at all unless the user opens a configuration the paper says they may never open. MPN-S6 had the answer in its own section 10 and did not carry it four sections back.

Neither paper can rewrite D69 and neither has to. What each owes is the composition, and the re-derivation is the author's at ruling 9.4.

**Repair, MPN-S5 section 6.4.** After "which are the two Layer 1 measures available on every ingest class and therefore the two that never blank [6]", insert: "That default set is stated for a multi-party surface and it is degenerate at two speakers, which is the arity of use case 3 and of the two principal voices on this one. At two speakers adjacency is deterministic and floor share is one number and its complement, so a user who opens no configuration is shown one degree of freedom and one constant, and latency, the one measure that is not degenerate at that size, is not in the default. Item S5-20 is who fixes it."

**Repair, MPN-S5 section 8, new item S5-20.** "Re-derive D69's default set for the $\Psi$ stave at two speakers, where floor share and adjacency are the two measures that carry no information. Depends on D69 and design section 6.3. Status: open, and it is the author's. Latency plus floor share is the obvious candidate, with adjacency reserved for arity above two."

**Repair, MPN-S6 section 9, clause two.** "**On Expression the declaration is the Ψ stave's half of it**, and the default is floor share and adjacency, which are the two Layer 1 measures available on every ingest class and therefore the two that never blank [5]. A user who opens no configuration gets a defensible score rather than an empty one" becomes "**On Expression the declaration is the Ψ stave's half of it**, and D69's default for that half is floor share and adjacency. **That default is inherited from a three-stave layout and it cannot stand here**, for the reason section 10's falsifier one gives: at two speakers, which section 10 calls the most likely material this surface will meet, adjacency is deterministic and floor share is one number and its complement, so the inherited default fills the surface's only stave with the two measures that carry no information and omits latency, which is the one that does not. Re-deriving it is EX-11 and it is the author's; latency plus floor share is the candidate this paper would put forward, with adjacency reserved for arity above two."

**Repair, MPN-S6 section 11, ruling EX-R1.** "with floor share and adjacency as the declared default" becomes "with the declared default re-derived for one stave and for two speakers under EX-11, D69's inherited pair being degenerate at that arity".

**Repair, MPN-S6 section 11, new item EX-11.** "Re-derive the declared default set for a one-stave layout at two speakers. Blocks: EX-R1's default clause and section 9's clause two. Status: open, and it is the author's."

### 7.2 "The two measures that never blank"

**Absorbs SK24 and CG11.** Both reviewers find that the justification both papers carry for the default set, that these two are available on every ingest class and therefore never blank, is false of both measures on the papers' own text.

**UPHELD. Blocking on both papers.**

On class C, MPN-S5's own section 4.4 table gives floor share as "Available only above the declared resolution floor" and adjacency as "Available, degraded by attribution error", and a below-floor difference renders as **unmeasured** under D28, visibly distinct from any rendering of an even exchange, which is a blank in the only sense that matters to a reader. MPN-S6 section 6 says the same of class C in its own words. On a script, floor share is available only in a changed unit, and the design's section 7.2 rule says a script analysis and a podcast analysis are not the same measurement. And at two speakers both are degenerate, which is ruling 7.1.

So the stated ground fails on class C, is qualified on class A, and fails at the arity MPN-S6 names as its most likely. The default set may still be right. The justification for it is not, and it is carried verbatim by both papers and by the design.

**Repair, both papers, wherever the justification appears.** "which are the two Layer 1 measures available on every ingest class and therefore the two that never blank" becomes "which are the two Layer 1 measures that need neither timings nor an overlap detector, and are therefore the two that survive the largest number of ingest classes in some form. They do not never blank: on class C a below-floor floor share renders as unmeasured under D28 and adjacency is degraded by attribution error, and at two speakers both are degenerate."

### 7.3 "No informative Layer 1 measure at all"

**Absorbs SK6.** The Skeptic finds that MPN-S5 section 5.4's sharpest sentence contradicts the table two paragraphs above it.

**UPHELD-NARROWED. Not blocking.**

The paper's own table grades floor share at two speakers as "**One degree of freedom**", with the gloss "One number and its complement, so it is a scalar rather than a distribution". A scalar that can take any value in the unit interval is not uninformative: a ninety-ten interview and a fifty-fifty interview differ in it, and the difference is the asymmetry the section says is the reader's question. The same paper makes a line-count floor share load-bearing elsewhere, section 3.5 rendering the play-script graph with "Node weight is the line-count floor share". The companion paper gets the arithmetic right and builds its sharpest falsifier on there being one measure and one ratio rather than nothing: "That leaves latency, plus floor share as a single number" [2].

The root of it is the design's own loose sentence at section 6.3, which counts floor share among the three that "carry no information" while describing it as one number and its complement. MPN-S5 inherits the looseness and presses it into an absolute.

The narrowing is that the conclusion the section wants survives the correction intact, and the section is otherwise the best passage in the paper.

**Repair, MPN-S5 section 5.4.** "**So a scripted interview, or an untimed transcript of one, yields no informative Layer 1 measure at all.** Floor share reduces to a line count and its complement, adjacency is alternation, reciprocity is 1, and the two measures that would have carried the asymmetry are absent" becomes "**So a scripted interview, or an untimed transcript of one, yields one scalar and nothing else.** Adjacency is alternation and reciprocity is 1, both carrying nothing; floor share survives as one degree of freedom in a changed unit, a line count and its complement; and the two measures that would have carried the asymmetry, latency and overlap, are absent."

### 7.4 What does not fit on one stave, and what does

**Absorbs SK21, and the third clause of CG6.** The Skeptic finds that MPN-S6's claim that three of five measures do not fit under any reading of B4 is wrong under one of the two readings; the Guardian finds that at two speakers only two measures carry information and both fit, so the stave is under-subscribed.

**UPHELD. Blocking on MPN-S6.**

Both halves hold and they are the same sentence seen from two sides. MPN-S6 section 9's clause three reads "three of the five measures do not fit on the stave under any reading of B4". B4's range is two to three quantities per stave. Under the floor reading three of five do not fit; under the ceiling reading two of five do not fit. So the number that holds under any reading is two.

And at two speakers the sentence is false in a second way. With adjacency, reciprocity and floor share degenerate and overlap withheld by EX-R3, what the stave is asked to carry is latency and one scalar, which is two quantities inside a budget of two to three. The stave is under-subscribed at the arity the paper calls most likely and over-subscribed above it, and the paper asserts the over-subscription and the degeneracy in adjacent sections without composing them.

The rest of the paragraph is right and is not touched: the per-stave over-subscription is unchanged from Live and the total headroom is a third of Live's.

**Repair, MPN-S6 section 9, clause three.** "So the oversubscription per stave is unchanged and the surface's total headroom is a third of Live's, which is why D53's rule that a surface must choose is not a formality here: three of the five measures do not fit on the stave under any reading of B4, and section 5's ruling is what says where they go, which is the graph and the numeric readout" becomes "So the oversubscription per stave is unchanged and the surface's total headroom is a third of Live's, which is why D53's rule that a surface must choose is not a formality here: at least two of the five measures do not fit on the stave under any reading of B4, and three do not fit if B4's lower value holds. Section 5's ruling is what says where they go, which is the graph and the numeric readout. **Above two speakers.** At two speakers the arithmetic inverts and section 10's falsifier one is why: with three measures degenerate and overlap withheld, the stave is asked to carry latency and one scalar, which is two quantities inside a budget of two to three, so the stave is under-subscribed rather than over-subscribed and the problem is the opposite one."

### 7.5 The count of measures available on a script has three sites, and the paper chooses while saying it has not

**Absorbs SK9.** The Skeptic finds that MPN-S5 enumerates two sites of the design's count discrepancy where there are three, that the third is normative, and that the paper then uses one of the two counts everywhere while saying it has not chosen.

**UPHELD. Not blocking.**

The third site was checked and it is there. Design section 4.2, in the paragraph that settles the measure count at five, carries the design's own restatement rule: "every figure that depended on the six is restated in terms of the five: two of five available from a script, three of five carrying no information at two speakers, four of five needing timings, and five interaction quantities in section 6.2's budget rather than six" [6]. That is in the section that defines Layer 1, it is the restatement rule for every dependent figure, and it picks two available. So the design says two available at sections 4.2 and 6.1 and three available at section 7.2, which is not the symmetric standoff MPN-S5 describes at its section 3.4 and section 1, and the enumeration is one site short. The programme's first method rule is that a claim about a class reaches no further than the class enumerated, and "the design counts this two ways" and "which happens twice" are claims about a class.

The second half also holds. Having said it will record the position rather than choose, the paper chooses: its section 3.4 table lists three available, its partiality obligation at sections 3.7 and 7.3 says "Two of five inputs are permanently absent on this material and one more arrives in a different unit", which is the same reading again, and the companion paper takes the other side flatly, MPN-S6 section 1 saying "On a script, two of the five measures are unavailable outright".

**Repair, MPN-S5 section 1.** "Where the design's own text or its own generators count differently in two places, which happens twice" becomes "Where the design's own text or its own generators count differently, which this paper records at items S5-2 and S5-8".

**Repair, MPN-S5 section 3.4.** "**The design counts this two ways and this paper names the discrepancy rather than choosing.** Section 6.1 says a play script yields two of the five measures, one of them a line count; section 7.2 says two of the five are unavailable outright, which leaves three" becomes "**The design counts this at three sites and two of the three agree.** Section 4.2's restatement rule, in the section that defines Layer 1, says two of five available from a script. Section 6.1 says the same. Section 7.2 says two of the five are unavailable outright, which leaves three." The paragraph's closing sentence, "This paper therefore records the position rather than the total", becomes "This paper uses section 7.2's reading, three available with two of them changed, because that is what its own tables and its own partiality obligation state; it records that the design's restatement rule at section 4.2 picks two, and resolving the two is item S5-2 and is the design's."

**Repair, MPN-S5 section 8.** Item S5-2's description gains "Three sites, not two: section 4.2's restatement rule and section 6.1 give two available, section 7.2 gives three. Section 4.2 is the restatement rule and is the one a reader will treat as normative."

### 7.6 The two papers state the Layer 1 setting count differently

**Absorbs CG7.** The Guardian finds that MPN-S5 says five named settings and MPN-S6 says four, that the design supports both, and that the two papers cannot go out together saying different numbers.

**UPHELD. Blocking on both papers.**

The design supports both and that was confirmed. Section 4.2 opens "Four of the five require a decision that changes the answer, and naming those decisions is what makes the layer honest", and its table gives the adjacency row's decision as "none to compute" [6]. Section 6.1 puts "five settings" in the class A header. MPN-S5 takes five, at section 3.5 and at section 7.1, "the five Layer 1 measures and the five named settings that change the answers". MPN-S6 takes four, at section 1, "four of them carrying a named setting that changes the answer and is shown on every output".

This is D64's own defect one level down, a document carrying a count of a thing that is not there, and it is downstream-relevant twice: the count is printed on the face of every output, and two of the settings are the whole of item S5-1. On the design's own table the answer is that there are five measures and four settings, adjacency having no decision to make and therefore nothing to declare. That is what both papers should say, and the author may instead name backchannel as a sixth measure, which moves both counts and is at ruling 9.6.

**Repair, MPN-S5 section 3.5.** "three parse-confidence numbers, the ingest class, the five settings, the resolution floor and the window" becomes "three parse-confidence numbers, the ingest class, the four named settings, the resolution floor where the ingest class has one, and the window". The resolution-floor clause is ruling 7.8.

**Repair, MPN-S5 section 7.1.** "They share the five Layer 1 measures and the five named settings that change the answers, declared on every output" becomes "They share the five Layer 1 measures and the four named settings that change the answers, declared on every output. Adjacency is the measure with no decision to make, per design section 4.2's table, so there are five measures and four settings and the design's own section 6.1 says five settings where it should say four."

**Repair, MPN-S5 section 8, new item S5-21.** "Correct design section 6.1's class A header from five settings to four. Depends on design section 4.2's table, where adjacency's decision is 'none to compute'. Status: open, and it is the design's. Both use-case papers state the count on the face of an output and cannot state it differently from each other."

### 7.7 The interview's only two measures are governed by settings nothing fixes

**Absorbs CG22.** The Guardian finds that the interview's whole informative Layer 1 content is latency and overlap, that four unfixed settings govern those two, and that MPN-S5's queue fixes the two that matter to a script and not these.

**UPHELD. Blocking on MPN-S5.**

MPN-S5 section 5.4 establishes that at two speakers the informative content is latency and overlap. Latency's answer is set by the turn-boundary rule and by the medium field; overlap's is set by the threshold and by whether backchannels count. None of the four has a value anywhere and the design's section 10 carries them only collectively as "the Layer 1 defaults". Item S5-1 fixes the two defaults that matter to a script, correctly, with the right reasoning that a dramaturg choosing between lines, words and turns is choosing the answer. The same reasoning applies with more force here, because on a script the unfixed defaults govern one of three surviving measures and on an interview they govern both of the two.

The Guardian's second observation is the sharper one and is adopted into the repair: the medium field on a recorded interview decides whether the latency distribution is a measurement of the exchange or of the editor, which is the question item S5-9 asks about podcasts and does not ask here.

**Repair, MPN-S5 section 5.7.** The dependency list gains: "And the four settings that decide this use case's only two answers: latency's turn-boundary rule and its medium field, and overlap's threshold and whether backchannels count. None has a value in any document, and on this use case they govern both surviving measures rather than one of three. That is item S5-22."

**Repair, MPN-S5 section 8, new item S5-22.** "Fix the latency turn-boundary rule, the latency medium field, the overlap threshold and the backchannel parameter, with the sentence saying what each changes, for the interview. The twin of S5-1 and sharper, because on a script these govern one of three surviving measures and on an interview both of two. Depends on design items 2 and 4 and the design's inventory of unfixed parameters. Status: open. It is a set of defaults, not a research question, except for the backchannel parameter, which is ruling 8.1."

### 7.8 The class A header specifies a field that has no definition on class A

**Absorbs CG23 and UA16.** Both reviewers find that MPN-S5 requires the play script's header to carry a resolution floor, which design section 4.1 defines for class C and derives from a diariser's error rate.

**UPHELD. Not blocking.**

Design section 4.1 defines the resolution floor as a minimum reportable difference declared for class C and derived from the deployed diariser's error rate. Class A has exact attribution and no diariser, so on this use case the field has no derivation, no value and no meaning. The Advocate's version adds the other half, which is that two of the settings in the same header govern measures the paper's own section 3.4 has just established are unavailable outright on a script, so roughly half the header describes machinery that did not run, on the surface the design ships first, for the user D37 is written about.

The field is inherited from design section 6.1, which lists it in the same header, so the defect is shared. The design knows how to scope a declaration to an ingest class and does so twice elsewhere.

**Repair, MPN-S5 section 3.5.** The header sentence, already changed at ruling 7.6, gains a following sentence: "Two of those four settings, the overlap threshold with its backchannel parameter and the latency turn-boundary rule with its medium field, govern measures section 3.4 has just shown are unavailable outright on a script, and the resolution floor has no definition on class A at all, being derived at design section 4.1 from a deployed diariser's error rate and class A having no diariser. The header states a setting as inapplicable where the material makes it so, and states that the ingest class has no resolution floor where it has none, which is the same distinction section 8a's four kinds already require."

**Repair, MPN-S5 section 8, new item S5-23.** "Scope the output header to the ingest class: state the resolution floor where the class has one and state that the class has none where it does not, and mark a setting inapplicable where the measure it governs is unavailable. Depends on design sections 4.1, 6.1 and 8a. Status: open, and the design carries the same field in the same header."

### 7.9 D28 is cited outside the domain in which D28 is defined

**Absorbs CG16.** The Guardian finds that MPN-S5's partiality obligation cites D28 for its sharpest clause and that D28 has no instance on a script.

**UPHELD-NARROWED. Not blocking.**

The obligation is right and is the most useful thing section 3.7 does. The authority cited for its sharpest clause is not the one that carries it. D28 is defined against a resolution floor derived from a deployed diariser's error rate, and class A has no diariser and no floor, so D28 has no instance on a script. The rule that does carry the obligation is general and the paper quotes it in the same paragraph: "a flat score from a failed parse and a flat score from a flat conversation must never look alike".

The narrowing is that D28 remains a legitimate precedent to name. What is not legitimate is the sentence "An absent overlap measure on a script is the same object and gets the same treatment", which asserts that D28 reaches it.

**Repair, MPN-S5 section 3.7.** "That last clause is not a courtesy: the design's own rule is that a flat score from a failed parse and a flat score from a flat conversation must never look alike, and decision D28 extends it to below-floor differences, which render as *unmeasured* and are visibly distinct from any rendering of an even exchange [6]. An absent overlap measure on a script is the same object and gets the same treatment" becomes "That last clause is not a courtesy: the design's own rule, which is general and is stated at section 4.1, is that a flat score from a failed parse and a flat score from a flat conversation must never look alike [6]. An absent overlap measure on a script falls under that rule. D28 is the same rule applied to below-floor differences on class C, which render as *unmeasured*, and it is named here as the precedent for how such a rendering looks rather than as authority reaching class A, where there is no diariser and therefore no floor."

### 7.10 The measures table's sixth row

**Absorbs SK27.** The Skeptic finds that MPN-S5's section 4.4 table has six rows under a five-measure count and that this is the presentational form of the error D64 was created to stop.

**REJECTED, on the finding conceding the substance and objecting to a row the paper labels correctly.**

The finding's own text says "The row is labelled correctly and the paper's prose count is five throughout, so the substance is right." D64's defect was a document counting a measure it had not defined. MPN-S5 defines backchannel as what D64 says it is, in its section 1 note on counting, made once so that it is not made four times: "backchannel a parameter of the overlap row rather than a measure in its own right". The table's sixth row is headed "Backchannel, the overlap row's parameter", which is the definition repeated in the row label. The table's own heading is "Which Layer 1 measures arrive" and the paper nowhere calls the table a table of five.

An objection to a correctly labelled row in a table that does not claim a count is a preference about presentation. If the author wants belt and braces, a horizontal rule between the five measures and the one parameter costs nothing and changes no text, and it is recorded here as available rather than required.
