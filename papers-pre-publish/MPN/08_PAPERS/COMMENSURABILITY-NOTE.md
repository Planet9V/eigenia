| Field | Value |
|:---|:---|
| Designation | MPN-NOTE-01 |
| Title | Commensurability, scalarisation and the second dimension: why weighted combinations in the calculus do not mean what they say |
| Author of the theory | J. McKenney |
| Status | Technical note, for decision. Feeds S1 section 8.2, S2 and S3 |
| Data | `05_DATA/01_scores/hand_annotated_frames.csv`, 232 frames, 13 works, system-produced |
| Script | `05_DATA/03_generators/a8_form_analysis.py` and the commensurability section added to it |

## 1. The question

A convex combination of two variables is dominated by whichever has the larger dispersion, regardless of the weights written on it. The calculus writes weights on raw quantities in the unit interval as though those quantities were commensurable. They are not. This note establishes what that costs, separates it from the collinearity problem it is usually confused with, and proposes the structural change that fixes both.

Four results follow. The first is a measurement defect, the second is a negative result that clears away an obvious wrong fix, the third is an impossibility statement about the theory's own design, and the fourth is the way out, which turns out to be the theory's own distinction recovered from its own data.

## 2. The nominal weights are not the actual weights

A weight multiplies a variable; the influence it buys is the weight times the variable's dispersion. Write $\text{frag} = aH + (1-a)\tau$. Entropy's share of the resulting variation is not $a$ but

$$\frac{a\,\sigma_H}{a\,\sigma_H + (1-a)\,\sigma_\tau}$$

On the 232 frames, where $\sigma_H = 0.1925$ and $\sigma_\tau = 0.2496$:

| Quantity | Nominal | Effective |
|:---|:---|:---|
| fragmentation $= 0.6H + 0.4\tau$ | H 60%, τ 40% | H 54%, τ 46% |
| density $= 0.3H + 0.7\tau$ | H 30%, τ 70% | H 25%, τ 75% |

On the batch-generated control, where entropy is more impoverished still at $\sigma_H = 0.1023$:

| Quantity | Nominal | Effective |
|:---|:---|:---|
| fragmentation $= 0.6H + 0.4\tau$ | H 60%, τ 40% | **H 40%, τ 60%** |

The scalar named for entropy, and written with a majority weight on entropy, is there majority-driven by trauma. That is not a rounding error in a coefficient; it is the coefficient meaning the opposite of what it says.

The disease is not confined to A8. The same audit applied to the tension term, $\text{tension} = 0.9\,r + 0.1H$, gives a sharper case. On the composer path the register triple is a hard-coded constant, so the variable carrying the 0.9 weight has zero dispersion, and the effective composition of a quantity named for the Real is **100 per cent entropy plus a constant**. On the score path, where the registers do vary, the nominal and effective figures roughly agree. One quantity, two paths, two entirely different meanings, and nothing in the source says so.

**Recommendation 1.** Every weighted combination in the calculus is restated with its effective contribution alongside its nominal weight, against a declared reference dispersion for each input. A weight written on a raw variable is an implicit claim about that variable's dispersion, and the theory should make the claim explicit rather than inherit whatever the current instrument happens to produce. This is a day's work across the corpus and it is a prerequisite for S2 and S3 stating any coefficient at all.

## 3. Fixing the dispersion does not fix the collinearity

The obvious repair is to put the variables on a common footing before combining. Two ways, and neither works, which is worth knowing before anyone spends a week on it.

| Repair | $r(\text{frag}, \text{dens})$ | level pairs of 25 |
|:---|---:|---:|
| As shipped | 0.9150 | 10 |
| Entropy rescaled from its 0.30 floor to the full unit interval | 0.9075 | 12 |
| Both inputs standardised before combining | 0.9046 | 11 |

Rescaling entropy raises its dispersion from 0.1925 to 0.2543, which is the single largest instrument improvement available, and it moves the correlation by seven thousandths.

**This separates two problems that have been treated as one.** Commensurability is a problem about what the weights mean. Collinearity is a problem about what the operator is. Equalising the dispersions makes the weights honest and leaves the two scalars as collinear as they were, because the collinearity never came from the dispersions. It came from taking two monotone blends of the same pair.

Standardisation has a further cost worth recording. It makes each frame's music depend on the dispersion of the corpus the frame sits in, so the same character in the same scene scores differently depending on what else is in the library. That breaks the locality of $\Phi$ and should be declined for that reason independently of its ineffectiveness here.

## 4. The impossibility result

Let $f(H,\tau)$ select the fragmentation stage and $g(H,\tau)$ the density level. Searching the weight space numerically on the 232 frames, under three sign regimes:

| Regime | Minimum achievable $\lvert r(f,g) \rvert$ |
|:---|---:|
| Both weakly increasing in both inputs | 0.283 |
| Density insensitive to entropy | 0.281 |
| Density **decreasing** in entropy | 0.000 |

The first floor, 0.283, is $\mathrm{corr}(\tau, H)$ itself, 0.280, and it is attained only at the degenerate corner where each scalar reads one input and ignores the other. Every interior point, every genuine blend, sits well above it.

Stated as a constraint on the design, and this is the useful form:

> **Three properties cannot hold together.** (i) Both musical parameters are influenced by both state variables. (ii) Both respond monotonically to both. (iii) The two parameters are independently controllable. Any two are available; all three are not.

The shipped design took (i) and (ii) and therefore could not have (iii), which is what the correlation of 0.915 is reporting. C1 takes (ii) and (iii) and gives up (i): each parameter reads one variable. C3 takes (i) and (iii) and gives up (ii): entropy thins the texture, which is a non-monotone response in the pair and is precisely what buys the dissociation. C2 sits between, weakening (ii) to an interaction rather than reversing it, and lands between the two in correlation, as it should.

So the candidate space is not an open field of functional forms. It is a small taxonomy indexed by the sign pattern of the four partial derivatives, and the question in front of the author is which sign pattern is musically true, not which formula fits.

## 5. The second dimension, and where it goes

Here is the finding that reframes the rest.

| Object | PC1 | PC2 |
|:---|---:|---:|
| The state itself, $(H, \tau)$ | 68.6% | **31.4%** |
| The two scalars, (fragmentation, density) | 95.8% | **4.2%** |

The state has a real second dimension carrying almost a third of its variance. The pair of scalars retains 13.2 per cent of it. **The combination step discards 87 per cent of the second dimension of the state before the music is written.**

That is the defect in its most compact form, and it says the problem is not the weights and not even the collinearity. It is that two monotone projections of a two-dimensional object onto nearly parallel axes throw away the part of the object that is not along the common direction, and the part thrown away is the part that distinguishes one kind of disturbance from another.

The repair is to project onto axes that are orthogonal rather than nearly parallel. Take

$$u = \frac{\tau + H}{\sqrt 2}, \qquad v = \frac{\tau - H}{\sqrt 2}$$

and drive the intensive parameter from $u$ and the qualitative one from $v$. On the frames this gives $r = -0.264$ and seventeen of twenty-five level pairs, against 0.915 and ten. Using the empirical principal axes instead of the fixed rotation gives $r$ of order $10^{-16}$, exactly uncorrelated by construction, with the same seventeen pairs; the fixed rotation is preferable because it is local, declared in advance, and does not make one character's music depend on the corpus.

**What makes this more than a statistical trick is what the two axes mean.**

$u$ is total disturbance: how much is wrong, from any source. It is the right driver for the intensive parameters, orchestration density and dynamics, because those are what a listener reads as amount.

$v$ is the balance between weight and disorder: whether what is wrong is accumulated unresolved burden or the coming apart of symbolic organisation. That is not a statistical residual. **It is the theory's own Real-versus-Symbolic distinction, recovered as the second principal direction of its own state space.** Trauma-dominant disturbance is the Real pressing through; entropy-dominant disturbance is the Symbolic failing to hold. The theory has had this distinction in its vocabulary from the start and has been averaging it away at the last step before the music.

Fragmentation is the natural parameter for $v$, and on the theory's own reading it should be: a theme that comes apart is a theme whose symbolic organisation has failed, which is an entropy-dominant disturbance, not a heavy one. A heavy one should be slow, low and thick, not broken.

**Recommendation 2.** Replace the two near-parallel projections with the orthogonal pair. Density and dynamics take $u$. Fragmentation takes $v$. The five ordered stages of A7 survive unchanged; only the selector changes, and it changes to a quantity the theory can name.

## 6. Adopted

**Decision, 12 September 2026.** The rotation is adopted, in the form that preserves the theory's existing statement about density. Density keeps its weighting; fragmentation becomes the orthogonal complement:

$$\text{density} = 0.3H + 0.7\tau, \qquad \text{fragmentation} = \frac{\max(0,\; 0.7H - 0.3\tau)}{0.7}$$

On the frame library: $r = +0.0571$ against $+0.9150$, second principal component 41.2 per cent against 4.2, worst work 0.616 in absolute value against 0.968.

Two things fall out of the choice of $a = 0.3$ rather than the symmetric $a = 0.5$. The symmetric rotation is exactly orthogonal when the two inputs have matched dispersion, which the current instrument does not give; $a = 0.3$ preserves the theory's density claim and, on the present data, happens to land at essentially zero correlation anyway. That coincidence is a property of the current instrument and will drift if the instrument changes, so the guarantee to rely on is the perpendicularity of the construction, not the particular value 0.057.

## 7. What this still asks of the author

Three decisions, in increasing order of consequence.

**The commensurability audit.** Uncontroversial and cheap. Restate every weighted combination with its effective contribution. Nothing in the theory changes; several coefficients will turn out to mean something other than what they say, and the tension term will turn out to mean nothing at all on one path.

**The sign pattern.** If two scalars are kept, one of them must be non-monotone in one input, and the live question is whether entropy thins the texture. That is a musical claim and it is C3's claim.

**The rotation.** Adopted, section 6. What follows is the reasoning as it stood before the decision, kept because it is the argument the decision rests on. It says the pair of quantities the theory should be computing is not fragmentation and density as separately weighted blends, but amount of disturbance and kind of disturbance, and that the second of those is the Real-Symbolic balance the theory already holds. If that is right, A7 and A8 are restated on a better basis rather than patched, and S3's mapping section is built on two orthogonal quantities instead of two collinear ones.

Against it: the theory has said that fragmentation is selected by a scalar weighted toward entropy and density by one weighted toward trauma, and the rotation replaces both statements. It is not a small edit to the theory. It is, on the evidence here, the correct one.

## 7. Caveats

Every figure in this note is computed on 232 frames that the application produced from the author's prose, so they describe the behaviour of the formulae rather than a property of drama. That does not weaken the argument, because the argument is about the formulae: the impossibility result in section 4 holds for any inputs, the variance-budget result in section 5 would hold in the same direction for any data in which the two state variables are not already strongly anti-correlated, and the commensurability result in section 2 is arithmetic. What the frames cannot do is tell anyone whether $v$ is musically the right selector for fragmentation. That needs an ear, and then it needs the annotation instrument.
