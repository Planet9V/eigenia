| Field | Value |
|:---|:---|
| Designation | MPN-A8-MEMO |
| Status | Decision memo, revision 3. **Resolved**: the orthogonal complement, section 5 |
| Series | McKenney-Lacan music-score series (S1 to S4) |
| Primary set | `05_DATA/01_scores/hand_annotated_frames.csv`, 232 frames, thirteen works. Not evidence: the state values are application output, see section 1 |
| Second control | `05_DATA/01_scores/MCKENNEY_LACAN_SCORE_*.csv`, 31,078 rows, machine-generated, not evidence |
| Script | `05_DATA/03_generators/a8_form_analysis.py` |
| Figures | `05_DATA/04_figures/a8-curves-hamlet.png`, `a8-curves-macbeth.png` |
| Raw output | `05_DATA/04_figures/A8-ANALYSIS-OUTPUT.txt` |
| Revision note | Revision 1 treated the seven batch-generated score files as evidence; revision 2 treated the 232 frames as hand annotations. Neither is evidence. Revision 3 records that, and records the decision |

## 1. A correction before anything else

Revision 1 of this memo rested on 31,078 beats in seven CSV files described as scored plays. They are not scored. `05_DATA/03_generators/batch_process_classic_plays.py` computes both variables in closed form from the text surface:

```
TRAUMA_R  = (beat / total_beats) * 0.8 + (count of 8 keywords) * 0.1
ENTROPY_H = 0.30 + 0.20*count('?') + 0.15*count('!') + 0.10*(count('--') + count('...'))
```

Trauma correlates with beat position at 0.995 to 0.999 in every file. Entropy reproduces from the TEXT column with zero error and 72.8 per cent of rows at its 0.30 floor. No register values appear anywhere in those files, and the ALL-CAPS speaker parser assigns all 3,425 rows of *King Lear* to `STAGE`. The sentence in revision 1 that trauma rises across a play was a restatement of `progress * 0.8`, and the two curve figures plotted a ramp. Both are withdrawn.

The other set is the 232 frames in `literary_data.ts` and `additional_plays.ts`, thirteen works from *Hamlet* (50 frames) to *Uncle Vanya* (9), extracted to `01_scores/hand_annotated_frames.csv` so the analysis runs without the repository. Revision 2 of this memo called them hand annotations. They are not: the scene prose and chord labels are the author's, but the trauma and entropy values were produced by the application's own text analyser and calculus run over that prose, as the author confirms. The file name is kept for continuity and is a misnomer.

So the corpus contains no observation of these quantities that the system did not itself produce. Everything below therefore rests on algebra, and uses the frames only to show the algebra behaving as predicted on real inputs. Nothing here is an empirical claim about drama.

## 2. What the shipped pair does on the frames

| Quantity | Frame library, n = 232 | Generated control, n = 31,078 |
|:---|---:|---:|
| corr(trauma, entropy) | +0.2802 | −0.0256 |
| r(fragmentation, density) | **0.9150** | 0.9191 |
| Spearman | 0.8957 | 0.9323 |
| First principal component | **95.75%** | 95.96% |
| Level pairs realised, of 25 | **10** | 11 |

Per work the shipped pair runs from 0.7403 on *Miss Julie* to 0.9678 on *A Doll's House*. Works carry between nine and fifty frames, so per-work figures are noisy and should be read as a range rather than as thirteen separate results.

## 3. The finding is algebraic, which is why it survives both sets being unusable

Given the two marginal standard deviations and the correlation between trauma and entropy, the correlation between the two scalars follows exactly. On the frames, sd(H) = 0.1925, sd(trauma) = 0.2496 and corr = +0.2802 give 0.9150, which is the sample value.

This is an identity, not a prediction. For two exact linear combinations the expression cannot fail to match the sample, and revision 1 was wrong to present the agreement as a confirmation. What the identity establishes is the thing that matters: the correlation depends on nothing else about the data. Not on which plays, not on what produced the numbers, not on how many frames there are.

Two consequences follow.

With equal variances and trauma independent of entropy, the pair still sits at 0.8376. Independence does not help.

For the shipped pair to fall below 0.65 on any corpus with these variances, trauma and entropy would have to correlate at worse than −0.525. That is not a corpus anyone is going to find, and if one were found it would refute A5's independence claim rather than rescue A8.

Hence the finding that is worth carrying into S1: **A5 succeeding forces A8 to fail as drafted.** The better trauma and entropy separate, the more tightly two similar reweightings of them must track. The theory cannot have both in their original form, and the two intensity scalars were one intensity variable wearing two hats.

## 4. Candidate replacements considered before the change of basis

All figures use one metric throughout: the implementation's own level ladders, fragmentation cut at 0.25, 0.50, 0.75, 0.90 and density at 0.20, 0.40, 0.60, 0.85.

| Form | fragmentation | density | r | PC1 | cells of 25 | works above 0.65 |
|:---|:---|:---|---:|---:|---:|---:|
| Shipped | 0.6H + 0.4τ | 0.7τ + 0.3H | +0.915 | 95.8% | 10 | 13 of 13 |
| C1 pure separation | H | τ | +0.280 | 64.0% | 19 | 2 |
| C2 knee-shift | σ(8(H − (0.6 − 0.3τ))) | τ^0.7 | +0.565 | 78.3% | 19 | 5 |
| C3 opposed | clip(H + 0.25(τ − 0.5)) | τ(1 − 0.4H) | **+0.295** | 64.7% | 19 | **1** |

**C1** is the floor case and not a proposal. It sets fragmentation equal to entropy and density equal to trauma, so its correlation is just corr(trauma, entropy). It shows how much dissociation exists to be had, and its cost is that neither variable can influence the other's parameter at all.

**C2** says trauma moves the *knee* of fragmentation rather than adding to it. A burdened theme breaks up sooner, not more: at trauma 0 the motif holds until entropy passes 0.60, at trauma 1 it starts coming apart at 0.30. Density is concave in trauma, so the orchestra swells early and saturates.

**C3** says the two cross-terms oppose. Trauma adds a little fragmentation, and entropy *thins* the texture, on the claim that a subject whose symbolic organisation is coming apart cannot muster a tutti. The negative cross-term is what breaks the collinearity.

On the numbers C3 dominates: half C2's correlation, the same level coverage, and one work above 0.65 against five. The criterion both are measured against, pooled r below 0.65 and at least eighteen of twenty-five level pairs, is **stipulated rather than derived**; the constants were chosen by me to sit clear of the shipped pair, and a reader should treat them as a bar someone set.

## 4.1 What the curves show

In the *Hamlet* figure the shipped panel has the two lines tracing one another frame by frame across all fifty. Under C2 they separate, with fragmentation swinging wide while density follows the trauma ramp. Under C3 they separate further: density holds a middle band while fragmentation runs the full range. Whether that is the right musical behaviour is the question.

## 5. Resolved: the orthogonal complement

**Decision, 12 September 2026.** Neither C2 nor C3 is adopted. Both repair a blend, and the change of basis set out in `COMMENSURABILITY-NOTE.md` removes the need for one.

The rule is that the theory chooses one direction and the second is then determined rather than chosen. Density keeps its original weighting, so the claim that density leans on trauma is preserved exactly. Fragmentation becomes the orthogonal complement of density in the state plane, clipped at zero because a motif cannot be less than fully stated, and scaled so the ladder spans the unit interval:

```
density       = 0.3*H + 0.7*tau
fragmentation = max(0, 0.7*H - 0.3*tau) / 0.7
```

| Measure | Shipped pair | C2 | C3 | **Adopted** |
|:---|---:|---:|---:|---:|
| pooled r | +0.915 | +0.565 | +0.295 | **+0.057** |
| Spearman | +0.896 | +0.527 | +0.335 | **+0.022** |
| PC2 share | 4.2% | 21.8% | 35.3% | **41.2%** |
| level pairs of 25 | 10 | 19 | 19 | 15 |
| worst work, absolute r | 0.968 | 0.825 | 0.695 | **0.616** |

Level coverage is the one measure on which the adopted pair does not lead, and it is the measure that was standing in for dissociation when no direct one was trusted. With the correlation at 0.057 and the second principal component at 41 per cent, the proxy is retired.

**Why this and not a better blend.** Two scalars that are both monotone in both state variables cannot be made independent: searching the whole weight space, the lowest achievable correlation under that sign pattern is corr(τ, H) itself, and it is reached only at the corner where each scalar ignores one variable. The complement is not a blend, which is why it escapes the bound.

**Why it is the right musical claim.** The corner behaviour is A5 made literal rather than asserted. Maximum weight with perfect order gives density 0.70 and fragmentation 0.00: the theme is fully stated, loud and thick. No weight with total disorder gives density 0.30 and fragmentation 1.00: the theme dissolves, thinly. Both at maximum gives tutti at 0.57. The pair this replaces claimed that separation in its prose and computed two quantities that could not express it.

**What is still open.** Whether the stage ladder should be even fifths, as adopted, or weighted so that the middle stages are narrower. That is an ear question and it is small. Twenty of the 232 frames sit at the zero clip, the region where weight exceeds disorder; if a heavily burdened, perfectly ordered character should show some truncation rather than none, the clip becomes a soft floor instead, and that too is an ear question.

## 6. Limitations stated plainly

The annotated frames give trauma twelve distinct values and entropy ten, on a scale both annotated in steps of 0.1. Thirteen works carry between nine and fifty frames each. This is a small, coarse, single-annotator set with no reliability figure, and it is the best data the programme currently has. It is enough to show the collinearity because the collinearity is algebraic. It is not enough to choose between C2 and C3, and nothing in this memo claims that it is.

The batch-generated files are kept in the corpus and in the script as a labelled control, because a construction that produces the same collinearity on annotated frames and on a punctuation tally is demonstrating exactly the point. They should never again be cited as evidence about drama.
