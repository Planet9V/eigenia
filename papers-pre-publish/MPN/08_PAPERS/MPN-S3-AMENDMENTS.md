| Field | Value |
|:---|:---|
| Designation | MPN-S3-AMENDMENTS |
| Title | Register and audit amendments arising from S3 |
| Status | Issued under condition C9 of ARBITRATION-S3 |
| Applies to | `08_PAPERS/ASSERTIONS-REGISTER.md`, `08_PAPERS/COMMENSURABILITY-AUDIT.md`, `08_PAPERS/S2-mathematics.md` and the register simplex figure |
| Reproduces | `05_DATA/03_generators/s3_frames.py`, `s3_commensurability.py`, `s3_timbre.py`, `s3_clip.py`, `s3_interpolate.py`, `s3_harmony.py` |

## 1. What this is

S3 adds content to three assertions, corrects a parser defect that moves figures in S2 and in the register simplex figure, and amends one row of the commensurability audit while withdrawing a correction an earlier revision of S3 had issued against another. On the model of `MPN-S2-DECISIONS`, the replacement text is issued here rather than left implicit in the paper, so that the register and the audit can be amended without rereading S3.

## 2. Register replacement text

**A4.** Append to the existing entry:

> *Added by S3:* two standing constraints on any table chosen under this assertion. First, cardinality: the tie rule S3 defines interpolates degree by degree, so every mode in a table must have the same number of degrees; the reference dictionary's six-degree whole-tone entry for the Imaginary is inadmissible against seven-degree modes elsewhere. Second, decision 4: the Imaginary takes no trauma partner, so the shipped pitch table, which gives all three registers one, is outside the admissible space as the decision log stands. That conflict is reported and not resolved, because resolving it would pre-empt question 5a of the listening pack under decision 5. *Also added:* the assertion is currently untestable rather than merely untested. No mode that reaches a score reads a register: the printed name is a branch on trauma plus entropy and the notated pitches come from a selector fed a literal register triple. Items S3-1 and S3-2 of S3 section 7 are the repair, and no listening study on A4 should be commissioned before they land.

**A8.** Append to the existing entry:

> *Added by S3:* the off-clip conditional figure. Restricted to the 211 frames where the clip does not bind, the adopted pair correlates at $+0.2072$ against $+0.0571$ over all 232 and $+0.0031$ with the clip removed. The conditional figure is not a property of the pair: conditioning on being off the clip is conditioning on a half-plane defined by both variables, so it induces the association it reports. Orthogonality is a property of the pair over the whole state space. *Also added:* the amendment is not implemented. The shipped code computes the superseded pair, `0.6H + 0.4τ` with cuts at 0.25, 0.5, 0.75, 0.9, and `0.7τ + 0.3H` with cuts at 0.2, 0.4, 0.6, 0.85, on two ladders that are neither even fifths nor equal to each other; item S3-4.

**B4.** Append to the existing entry:

> *Added by S3:* a measured bound on one channel, not a discharge of the estimate. Multidimensional scaling of musical timbre returns three perceptual dimensions across both cited studies, which disagree only about the acoustic correlate of the third. That gives an upper bound of three on the independent quantities the **timbre channel alone** can carry. B4 counts independent state quantities carried by a **stave**, of which timbre is one channel among several, so the two are different quantities and the numerical agreement between "two to three" and "three" is a coincidence. The estimate and the recovery study both stand. *Separately:* the DISC-to-timbre map has rank three against a domain of dimension four, so its nullity is exactly one and its null direction is profile magnitude; a study asking a listener to recover a DISC profile from a cue is asking for what the channel cannot carry.

## 3. A parser defect, and the figures it moves in S2 and in the register simplex figure

This is the largest correction in this document and it is not a correction to anyone's reasoning. Every script in this programme that read the 232-frame library matched the annotation field with a non-greedy pattern that stops at the first occurrence of the quote character and does not honour backslash escapes. Seven annotations contain an escaped apostrophe. On those seven the pattern returned a truncated string, and on three of them the truncation removed the only register keyword the annotation carried, so the shipped analyser was handed a short string and returned $(0,0,0)$ where it should have returned a register triple.

The three misread annotations, with what they become when read in full:

| Truncated to | Read in full | Triple |
|:---|:---|:---|
| "Comparison of authenticity. The actor" | "Comparison of authenticity. The actor's fake emotion feels more Real than Hamlet's true drive." | pure Real |
| "He unknowingly repeats the Witches" | "He unknowingly repeats the Witches' signifier. Infection." | pure Symbolic |
| "The Act (Passage a l" | "The Act (Passage a l'acte). Irreversible rupture. Her confession about her father reveals the Other's desire." | pure Symbolic |

The corrected counts:

| Figure | As reported in S2 and in S3 revisions 1 to 7 | Corrected | Moves? |
|:---|---:|---:|:---|
| frames returning $(0,0,0)$ | 107, 46.1 per cent | **104, 44.8 per cent** | yes |
| frames on the simplex | 125 | **128** | yes |
| of those, at a vertex | 98, 78.4 per cent | **101, 78.9 per cent** | yes |
| of those, on an exact tie | 21, 16.8 per cent | 21, **16.4** per cent | count unchanged, proportion moves |
| of those, in the interior | 1 | 1 | no |
| distinct triples emitted | 10 | 10 | no |

**What this does and does not disturb.** The tie count is unchanged at 21, so decision D3, the tie analysis in S3 section 2.3, and every property of the interpolation rule stand untouched. The three additional on-simplex frames are all at vertices, so they do not create new ties and do not move the simplex geometry. Lemma 1, Lemma 2, Theorem 1 and Theorem 2 are distribution-free or closed-form and do not depend on the library at all. What moves is every proportion computed against 107 or 125, and the register simplex figure, whose marks and caption are regenerated.

**Replacement text for S2.** In S2 section 6.4 and section 6.5, and wherever else the figures appear, 107 becomes 104, 46 per cent becomes 44.8 per cent, and 125 becomes 128. S2's sentence that the estimator "is not a map into $\mathcal{P}$, returning $(0,0,0)$ on 46 per cent of frames" becomes "on 44.8 per cent of frames"; the argument is unaffected, since 44.8 per cent is not materially different from 46 and the defect is qualitative.

**Replacement caption for the register simplex figure.** "Ninety eight frames sit at the three corners" becomes "One hundred and one frames sit at the three corners", and "A further one hundred and seven frames are not on the triangle at all" becomes "A further one hundred and four frames". The figure has been regenerated from the corrected data and the marks have moved accordingly.

**The fix.** `s3_frames.py` is now the single reader of the library. It reads string literals honouring escapes, finds frame records by brace balancing rather than by a fixed layout, handles all three JavaScript quote characters, and asserts that the number of records it parses equals the number of annotation fields present, so a parser that silently drops records fails instead. `s2_verify2.py`, `s2_rsi.py`, `s3_clip.py`, `s3_commensurability.py`, `s3_worked_frame.py` and `make_simplex_figure.py` all call it. Run directly it prints the comparison between the old figures and the new.

**A note on how this was found.** It was not found by inspection. It surfaced because a worked-frame script was made to assert that it had parsed every frame the annotation count says exists, and the assertion failed. Before that assertion existed, a parser that saw 109 of 232 frames had been reporting superlatives over the library, and the figures it produced looked entirely ordinary. That is the argument for putting a count assertion in every parser, and it is now in `s3_frames.py`.

## 4. Commensurability audit corrections

With the parser corrected, the audit needs less amendment than S3 revision 7 claimed, and one of the two corrections that revision issued is withdrawn.

| Row | Audit states | Standing |
|:---|:---|:---|
| 4 | "the Real is exactly zero on **104 of the 232** shipped frames (44.8 per cent)" | **The numbers are right and the label is wrong.** 104 and 44.8 per cent are the frames on which the analyser returns $(0,0,0)$ entirely, which is what the audit computed and which the corrected parser confirms exactly. The frames on which the **Real specifically** is zero number **163**, 70.3 per cent, a larger set that additionally includes frames carrying only Symbolic or Imaginary keywords. Amend the label, not the figure. The consequence the audit draws, that tension reduces to $0.1H$ and the chord quality is `major7` by arithmetic, holds on the larger set |
| 15 | sd of the Real $= 0.3993$ | **Correct as stated.** Recomputed with the corrected parser it is 0.3993. S3 revision 7 reported 0.3965 and issued that as a correction to the audit; that was an artefact of the faulty parser and the correction is withdrawn |

Every other audit figure S3 uses reproduces exactly: 53.6 / 46.4 for `0.6H + 0.4τ`, 24.8 / 75.2 for `0.7τ + 0.3H`, 24.8 / 75.2 and 64.3 / 35.7 for the adopted pair, and the rule that both the effective share and the composer-path qualification must be printed together. The audit comes out of this well: on the two figures where it and a later script disagreed, the audit was right both times.

## 5. What is not amended

No cost figure appears in S3 and none is amended here. A1, A3, A7 and A11 are cited by S3 and not added to. The four incompatible register-to-mode tables remain a documentation defect of S1's, now confirmed at path and line, with the count corrected from four tables to five decision points.

One further item is recorded rather than amended, because it is a defect in S3's own proposal rather than in any register entry. Section 2.5 of S3 revision 8 shows that the harmonic mapping it proposes, which moves a chord $\operatorname{round}(k_{\max}\delta)$ positions along the alternating chain, is **not monotone in the Cayley metric it cites**: four chain positions cost four generator steps, five cost three, and twenty-three cost one. A larger change in trauma can therefore produce a smaller harmonic move. That is new at revision 8, it is against the proposal's own interest, and it is carried as work-queue items S3-9 and S3-10 rather than as an amendment, because until the author chooses between defining the move on the chain and defining it in the metric there is nothing settled to amend into the register.
