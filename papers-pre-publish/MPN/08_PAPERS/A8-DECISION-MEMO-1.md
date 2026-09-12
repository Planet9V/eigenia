| Field | Value |
|:---|:---|
| Designation | MPN-A8-MEMO |
| Status | Decision memo, awaiting author's choice of form |
| Series | McKenney-Lacan music-score series (S1 to S4) |
| Evidence | `05_DATA/01_scores/` seven plays, 31,078 beats |
| Script | `05_DATA/03_generators/a8_form_analysis.py` |
| Figures | `05_DATA/04_figures/a8-curves-hamlet.png`, `a8-curves-oedipus_rex.png` |
| Raw output | `05_DATA/04_figures/A8-ANALYSIS-OUTPUT.txt` |

## 1. What was measured

A8 as shipped selects the fragmentation stage by `0.6H + 0.4τ` and the orchestration density level by `0.7τ + 0.3H`. Across the seven scored plays these two quantities correlate at **r = 0.9191** pooled, from **0.8667** (Cherry Orchard) to **0.9512** (Hamlet). The first principal component carries **95.96 per cent** of the joint variance, and only **11 of the 25** possible fragmentation-by-density level pairs are ever realised.

## 2. The finding is about the formulae, not about the plays

The correlation can be computed from three numbers alone: the standard deviation of entropy (0.1023), the standard deviation of trauma (0.2317), and the correlation between them (-0.0256). Doing so gives **0.9191**, the empirical value to four decimal places, without consulting a single beat.

Holding the two standard deviations fixed and sweeping the correlation between trauma and entropy across its whole range, the lowest value the shipped pair can take is **r = 0.841**, at corr(τ, H) = -0.757. There is no corpus that rescues it. Two convex combinations of the same two variables with weights this close are near-collinear as a matter of algebra, and the theory has, in its present form, one intensity variable wearing two hats.

This is also why A5 and A8 cannot both stand as written: the better trauma and entropy separate, the more tightly two similar reweightings of them must track.

## 3. Candidate replacements tested

| Form | fragmentation | density | r pooled | per play | PC1 | cells (fixed) | cells (quintile) |
|:---|:---|:---|---:|:---|---:|---:|---:|
| Shipped | 0.6H + 0.4τ | 0.7τ + 0.3H | +0.919 | 0.867 to 0.951 | 96.0% | 11 / 25 | 17 / 25 |
| C1 pure separation | H | τ | -0.026 | -0.201 to 0.143 | 51.3% | 18 / 25 | 10 / 25 |
| C2 knee-shift | σ(8(H - (0.6 - 0.3τ))) | τ^0.7 | +0.485 | 0.310 to 0.602 | 74.3% | **24 / 25** | 19 / 25 |
| C3 opposed | clip(H + 0.25(τ - 0.5)) | τ(1 - 0.4H) | +0.404 | 0.180 to 0.569 | 70.2% | 18 / 25 | **20 / 25** |

**C1** is the floor case, not a proposal: it sets fragmentation equal to entropy and density equal to trauma, so the correlation is just corr(τ, H). It shows how much dissociation is available at all, and it shows the cost of the cross-term being zero: neither variable can influence the other's parameter, and the quintile coverage collapses because entropy in this corpus has only fourteen distinct values.

**C2** says trauma moves the *knee* of fragmentation rather than adding to it. A burdened theme breaks up sooner, not more: at τ = 0 the motif holds until entropy passes 0.60, at τ = 1 it starts coming apart at 0.30. Density is concave in trauma, so the orchestra swells quickly and then saturates. This reaches almost the whole level grid.

**C3** says the two cross-terms oppose. Trauma adds a little fragmentation, and entropy *thins* the texture: a subject whose symbolic organisation is coming apart cannot muster a tutti. The negative cross-term is what breaks the collinearity, and it is the most musically loaded of the three claims.

## 4. What the curves show

In the Hamlet figure the shipped panel has two lines lying on top of each other for the whole play. Under C2 and C3 they part: density climbs steadily while fragmentation moves in the local shape of the scene.

One property of the corpus is visible in every panel and belongs in the paper. Trauma is accumulated unresolved weight, so it ratchets upward across a play and never recovers. Density therefore behaves as a ramp under any form that is monotone in trauma, and fragmentation is the quantity that actually articulates the drama. If density is meant to fall as well as rise, trauma needs a decay term, which is a separate question from A8.

## 5. What is needed from you

Both C2 and C3 meet a criterion that the shipped pair fails: pooled correlation below 0.65, no single play above 0.65, and at least eighteen of the twenty-five level pairs realised. The numbers do not choose between them, and they should not.

The question is which claim you want to make:

- **C2**: burden makes a theme break up *earlier*. Fragmentation is a threshold crossing whose threshold trauma lowers.
- **C3**: burden thickens the texture and disorder thins it, and the two pull against each other.

The way to settle it is to hear them. Once you choose, S1 states the amended A8 with that form, and S3 carries the thresholds.

## 6. Limitation stated plainly

Entropy in this corpus takes fourteen distinct values with a floor at 0.30 and a standard deviation of 0.102, against trauma's ninety-three values and 0.232. Every figure here is limited by that resolution. The asymmetry is itself part of why the shipped pair correlates so highly: the combination is dominated by the higher-variance variable in both cases.
