| Field | Value |
|:---|:---|
| Designation | MPN-NOTE-03 |
| Title | The implementation audit behind S3: every path and line |
| Author of the theory | J. McKenney |
| Status | Companion note to MPN-S3. At revision 8 the paper carries the findings AND the chains, the author having set aside the length ceiling that had forced them out; this note is now the path-and-line appendix for S4 and the record of the search method and of the one tool that failed |
| Reproduces | `05_DATA/03_generators/s3_modes.py`, `s3_dynamics.py`, `s3_tempo_metre.py`, `s3_clip.py`, `s3_frame_cells.py`, `s3_interpolate.py`, `s3_register_reach.py`, `s3_commensurability.py`, `s3_worked_frame.py` |
| Implementation claims pinned to | `mpn-conductor-standalone`, working tree of 13 September 2026, the same tree S2 section 6.5 cites |

## 1. Why this note exists

It was extracted from S3 when a length ceiling made the paper choose between carrying its findings and carrying its evidence. That ceiling was set aside by the author on 13 September 2026 and S3 revision 8 carries both, so this note's purpose has changed: it is the appendix S4 works from, holding the raw extracted passages at path and line, and it is the record of how the searches behind S3's negative claims were done and of the one tool that was built to automate them and failed.

Nothing here contradicts S3. Where the two overlap, S3 revision 8 is the current text and the extractions below are kept because they carry file and line detail in a form convenient for the repair work rather than for reading.

An earlier revision of S3 got the modal claim wrong. It searched for a guessed list of function names, found three tables, missed two decision points, and described a table that no notated mode has ever come from. The method that replaced it is in section 4 below, and it is the reason this note exists as a separate artefact rather than as a paragraph.

## 2. The modal decision points

### Extracted from S3 section 2.3, the unreachable tables

**Three further tables, unreachable.** `rsiToMode` has no caller outside its own tests, and `lookupModeName`, which it consults, is referenced only inside it. `lookupAllParams` has no caller either, and `lookupModeScale` is referenced only inside that. A `MODES` constant in `psychometric_calculus.ts` is declared and never read. S1's report of four incompatible register-to-mode tables is confirmed at path and line, with two additions: there are five decision points rather than four once the Lyapunov branch is counted, and the table the documentation describes is reachable from nothing.


### Extracted from S3 section 2.3, revision 6: the five decision points in full

**The name printed on the score.** It comes from a three-way branch on $(\tau + H - 0.5)/2$, a quantity the code calls a Lyapunov exponent and which is not one: Ionian below $\tau + H = 0.5$, Lydian to 0.7, Phrygian above. The branch is written as a fallback behind `output.global.mode`, but `OrchestratorOutput.global` declares no such field and an `as any` cast stops the type checker from saying so, so the first operand is undefined on every frame and the branch always wins [12]. S2 section 6.5 reports that the branch reaches the score [2]; what is added here is why it always wins, which is the part a repair needs. The chain is in the companion note [13].

**The mode the pitches are built from.** `composeMelody` passes a literal triple, `{ real: 0.33, symbolic: 0.33, imaginary: 0.34 }`, into `getModalTransformation` instead of the state [12]. Since 0.34 is strictly largest the dominant register is the Imaginary for every character in every play, five of the seven modes are unreachable, and the surviving row is Phrygian at $\tau \le 0.6$ and Locrian above. S2 section 6.5 reports this as well [2].

**The trauma switch, against decision 4.** That table gives all three registers a trauma partner, the Imaginary included. Decision 4 rules that the Imaginary has **no partner** [6]. The conflict is reported, not resolved: either the decision or the code is wrong, and this paper does not decide which because A4's second stage is already question 5a in the listening pack under decision 5 [6]. Nothing in this paper depends on the answer, and section 7 records it. If the synthetic raters' reading holds, that the trauma switch is a jump to a crisis mode per register rather than a dim within a pair, then the decision and the code are both wrong and A4's stated mechanism changes.

**The two disagree, measurably.** The printed name is a function of $\tau + H$ and the notated pitches of $\tau$, so a score's header and its accidentals need not describe the same mode. Over the $(\tau, H)$ square they agree on 36.0 per cent of states; on the rest a score labelled Ionian or Lydian is notated in Phrygian, or one labelled Phrygian is notated in Locrian.

**The one selector that reads the registers, and what becomes of its answer.** `lookupMode` is reached on every frame from `psychometricToMusical`, and is the only function in the application that sorts the frame's actual register triple and chooses on it. Its result is written into every stave's `musicParams` and then read by nothing: `musicParams` never appears with `.mode` anywhere else in the source [12]. The register-dependent mode is computed on every frame and discarded, which is this paper's finding rather than S2's. Two of the three strings it would emit are not mode names in any case but slash-joined pairs, `phrygian/locrian` and `lydian/whole-tone`, produced by splitting a display label on its first space.

**Three further tables, unreachable.** These are tables and not decision points, which is why section 1 counts five decision points and three unreachable tables. `rsiToMode`, `lookupAllParams` and a `MODES` constant have no caller outside tests, and `lookupModeName` and `lookupModeScale` are referenced only from inside the first two [12]. S1's report of four incompatible register-to-mode tables is confirmed at path and line, with two additions: there are five decision points once the Lyapunov branch is counted, and the table the documentation describes is reachable from nothing. The companion note carries the chains in full [13].


### Extracted from S3 section 2.3, revision 7: the chain narration

**Where the modes actually come from.** Five places in the shipped source decide a mode and the companion note traces each chain in full [13]. In summary: the name printed on a score comes from a three-way branch on $(\tau + H - 0.5)/2$, a quantity the code calls a Lyapunov exponent and which is not one, and that branch always wins because `OrchestratorOutput.global` declares no `mode` field and an `as any` cast stops the type checker from saying so [12]. The notated pitches come from `getModalTransformation` fed the literal triple `{ real: 0.33, symbolic: 0.33, imaginary: 0.34 }`, so the dominant register is the Imaginary for every character in every play and five of seven modes are unreachable. S2 section 6.5 reports both of those [2]; what is added here is why the branch wins, which is what a repair needs. `lookupMode` is the only selector that reads the frame's actual triple, and its answer is written to every stave and read by nothing. Two further tables are unreachable from any score, and a `MODES` constant is declared and never read; S1's report of four incompatible tables is confirmed at path and line, with five decision points once the Lyapunov branch is counted.


### Extracted from S3 section 2.1, revision 6: the shipped dynamics path

There is a second implementation and it is the one a rendered score passes through. `lookupDynamics` matches trauma against three dictionary entries, conditioned at 0.0 to 0.2, 0.4 to 0.6 and above 0.8, and returns a literal fallback of velocity 72 labelled mf when none matches [12]. The intervals 0.2 to 0.4 and 0.6 to 0.8 match nothing and take that fallback, which is the same mf the middle band returns, so the composed function emits three labels at three constant velocities, 30, 72 and 118. It is neither the eight-marking discretisation nor the linear velocity law. Decision 6 makes the eight-marking linear form normative and only the Python module implements it; everything else in this section describes the normative law and S4 owes the repair [13].


## 3. The scripts, and what each proves

`s3_modes.py` enumerates every line in `src/` that returns or assigns a mode name, rather than checking a list of function names, then follows each chain and reports which are reached. It prints the Lyapunov branch and the interface that makes it always win, the hard-coded register triple, the discarded `lookupMode` result, the 36.0 per cent agreement between the printed name and the notated pitches, and the perfect-fifth census. It aborts if the lines it transcribes have changed.

`s3_dynamics.py` reads the eight-marking discretisation out of `ml/psychoscore_v2/models/mckenney_lacan_calculus.py`, computes the band widths and the crossing probabilities in closed form and by enumeration, and then reads the three-entry TypeScript lookup and prints the composed staircase with its two uncovered intervals.

`s3_tempo_metre.py` parses the tempo and metre entries out of `mpn_reference_data.ts`, re-implements `checkCondition`, the two lookups and `entropyToRhythm` line for line, and reports the piecewise affine law, the two jumps, the 35 reachable tempi and the uncovered entropy interval from 0.5 to 0.6.

`s3_clip.py` reads trauma and entropy out of the two frame files and counts where the fragmentation clip binds, with the realised correlations of both the adopted and the superseded A8 pair.

`s3_frame_cells.py` enumerates the reachable output tuples over the state square under the specified laws and under the shipped laws separately, and counts the rhythmic cells.

`s3_interpolate.py` states the tie rule and checks it: determinacy, agreement with $\arg\max$ outside the margin, the Lipschitz constant, the worst-case rounding error, the measure of the region the interpolation actually touches, and the jump set.

`s3_register_reach.py` finds every line in the non-test source that reads a register component, prints all of them, and then walks the four chains those readings feed. It is the search that supports any claim about what the registers do or do not reach.

An eighth script, `s3_callgraph.py`, was written for this note and is **withdrawn**. It built a textual call graph and reported reachability per function. Its attribution of a call to the function containing it does not model class methods, so it reported five functions on the live pitch chain as unreachable and invented callers for them. An earlier draft of this note claimed its negative answers were the reliable ones. They are the ones that are wrong, and had the note been believed it would have confirmed the very conclusion it was meant to prevent. It is not cited anywhere and should not be used.

## 4. The method, stated so it can be repeated

A claim that a piece of code is dead, or that a particular table is the live one, is a claim about the whole source and cannot be established by searching for names one has thought of. The rule adopted here is: search for the **values or the data the claim is about**, not the names of functions that might touch them. For modes that means grepping for the seven mode names across every non-test file and keeping every line that returns or assigns one; for dynamics, the markings; for metre, the time signatures; for a claim about the registers, every line that reads a register component.

That last case is the one that matters most, because the second revision of S3 got the mode search right and then drew a conclusion about the **registers** from it, asserting that the registers reach nothing in the build. They reach the leitmotif transformation, the key and the chord type; only the mode is beyond them. The search has to be as wide as the claim, and a claim about a quantity is not supported by a search for one of the things that quantity might have set. Both failures were the same failure at different widths.
