| Field | Value |
|:---|:---|
| Designation | MPN-S2 |
| Title | The formal apparatus of the McKenney-Lacan psychometric calculus: state space, simplex, scalarisation, and what the dynamics apparatus is waiting for |
| Author of the theory | J. McKenney |
| Series | Paper 2 of 4, the music and score path. S1 states the theory, S3 the mapping from state to musical parameter, S4 the Conductor implementation |
| Licence | CC BY 4.0 |
| Length | 8,732 words of body text, excluding tables and references. The series convention is 4,500 to 7,000. The arbitration of the review gate ruled a ceiling of 7,500 and directed that the overrun be paid out of the decision list, the corpus inventory and the paper's litigation of its own earlier revisions, all three of which have been extracted or removed. What remains is four proofs with their verification, the register instrument audit, the identifiability bound and the attachment table, and it stands at 16 per cent over the ceiling. Closing that gap means cutting adjudicated content, so it is put to the author as an open condition rather than taken by the editor |
| Status | Draft, revision 4, after Skeptic, Constraint Guardian and User Advocate reviews and the arbitration of 13 September 2026. Eleven of the arbitration's twelve conditions are applied; the twelfth, the word ceiling, is open and is the last line of the length field |
| Post-acceptance correction | 13 September 2026. Section 4.4's degenerate-frame figures are corrected from 107 to 104, from 46.1 to 44.8 per cent, from 125 to 128 on-simplex and from 98 to 101 at a vertex, and this paper's instruction that the commensurability audit be corrected to match its own 107 is withdrawn. The cause is a parser defect found while writing S3 and recorded in the S3 amendments [27]; the audit was right and this paper was wrong. Nothing in the four proofs, the tie count of 21, or any argument in this paper depends on the figures that moved |
| Decisions implemented | 1, 2, 3 and 6 of the decision log of 12 September 2026 |
| Decisions raised | Five, listed in section 10, with eight actions that need no decision |
| Companion artefacts | `MPN-S2-DECISIONS` [25] carries the decisions, the actions and the register replacement text; `MPN-NOTE-02` [26] carries the corpus source pass |
| Revision note | Revision 1 claimed priority for four results, three of which are already in the corpus at named locations, and restated MPN-2's neo-Riemannian section as its own verification; both are corrected. Two tables of simulated figures are replaced by the closed forms they estimated, one wrong at the stated precision. Lemma 2 was false as stated and is restated. Theorem 2 had a circular proof and an overstated consequence, and is reproved from an identity. Revision 3 added the decision list, the clinical scope note, the identifiability bound and the figure, and corrected the cost and gating figures, which revision 2 took from a superseded sentence in S1. Revision 4 applies the arbitration: totality is no longer asserted false, since what fails is the state estimator and not the transformation; A3's statistic is restated as the arbitration settled it rather than as a rank test; the naming table covers entropy and trauma; the manufactured-competition figure is given exactly rather than by simulation; the region whose measure is $2d-d^2$ is correctly described as a kite; and the decision list and the corpus inventory are extracted to their own artefacts |
| Reproduces | `05_DATA/03_generators/s2_verify.py`, `s2_verify2.py`, `s2_verify3.py`, `s2_rsi.py`, `s2_census.py` and `make_simplex_figure.py`. Every figure quoted in the body, and the figure itself, is produced by them |
| Implementation claims pinned to | `mpn-conductor-standalone` at commit `28c04ec`, the tree before MPN-PATCH-01 |

## Contents

1. What this paper is, and what in it is new
2. What the corpus supplies
3. The state space
4. The simplex
5. Scalarisation, and the limits of weighted sums
6. The transformation as a mathematical object
7. The dynamics apparatus
8. The wider vector and the reduction to twenty-four
9. What is proved, what is sharpened, what is absent
10. What this paper puts to the author
11. References

## 1. What this paper is, and what in it is new

S1 states a theory [16]: that a character's psychological state can be carried by nine bounded numbers, that three of them compete on a simplex, and that a total, deterministic, decomposable function carries the state to musical material. This paper states the mathematics of those claims.

Four findings bear on what the theory may assert. **The state space has eight dimensions and not the nine A1 claims.** **The simplex constraint manufactures the negative correlation A3 offers as evidence of competition**, so the test A3 names cannot be run in the form it suggests. **The simplex and the Borromean link are incompatible formalisations of the same three registers**, and the theory must choose between two things S1 takes from Lacan. And **the shipped register instrument returns a value that is not on the state space on 44.8 per cent of the frames the corpus has**, where four components of the system then disagree about what to do with it. Section 10 lists the five decisions these put to the author and the eight actions that need no decision.

What is new here is stated exactly, because revision 1 claimed more. **New:** Theorem 1, a closed-form lower bound on the correlation of two positively weighted scalarisations of the same two variables, which makes the A8 collinearity computable from the weights before any corpus exists; section 4.5, the simplex against the Borromean link; section 4.4, the register instrument audit; and section 6.4, the first identifiability bound on the mapping. **Sharpened, not new:** that three magnitudes summing to a constant have a singular correlation matrix and cannot be strongly mutually negatively correlated is the Constraint Guardian's finding in the S1 arbitration [20], which already amended S1's section 10; Lemma 1 gives it an exact distribution-free form. That the correlation of two linear combinations is an identity depending on nothing else about the data is the A8 memo's central point [21], including the figure 0.8376. That trauma ratchets is S1's own. That the state space has eight dimensions is an observation, not a theorem.

**Scope.** This is a paper about form. It does not choose the modal table, which is S3's business and the author's, and it proposes no new musical claim. It does amend five assertions, and section 10 gives the replacement text so the register can be updated from it rather than from a reading of the prose.

**A note for a clinical reader.** The quantity this paper calls trauma is a dramatic quantity, defined in S1 as the difference between a character in the first scene and the same character after the event the play is about. It is not a clinical measure, this paper does not treat it as one, and the instrument discussed in sections 3.2 and 4.2 is an instrument for annotating dramatic texts, not people: its raters are annotators and its subjects are characters. No paper in this series is yet addressed to music therapists; S1 records what such a paper would owe and that it does not exist. Nothing here is safe to build on clinically, and the question in section 7.3 about whether trauma should be allowed to resolve is a question about dramatic form, not about how trauma behaves in a person.

## 2. What the corpus supplies

The plan for this paper named its sources: ten mathematical primers and a set of core theory chapters. A source pass over that material, read end to end, found that none of it can carry the apparatus, and the detail is in a companion note [26]. In summary: the ten primers are competent statements of standard mathematics carrying an author field of the form "AEON Research Division (Agent 1 - The Tensor)", and none contains the nine-component state, the registers as magnitudes, the transformation, or any musical object. Twenty-one of the twenty-two core chapters are signed by named AEON swarms; they state the transverse-field Ising Hamiltonian, the Langevin equation, Granovetter's rule and the early-warning indicators correctly, and in not one is any component of the state mapped into any variable of any of those models. The sixty-one files of the unified-theory directory are built on a six-component vector that is not the nine-component state, and one of their stated axioms is false: `01_Foundations.md:195` asserts that collective entropy exceeds the sum of individual entropies, which is the negation of subadditivity.

That material is not superseded by this series and remains useful as vocabulary; it is simply not this theory's foundation, and it should not be cited as a result anywhere, because none of it contains a component of the state. What this paper can build on is the state definition and the simplex constraint from S1, the scalarisation algebra the A8 amendment turns on, the neo-Riemannian group as a codomain for the harmonic operator, which the sister series has already set out [2], and a collection of named dynamical models correctly stated somewhere and attached to nothing. Decision 2 of the log of 12 September [18] asks that the dynamics apparatus be developed as apparatus even where only partly useful, and section 7 does that.

## 3. The state space

### 3.1 It has eight dimensions

S1 gives the state as

$$\vec{p} = (\tau,\; H,\; r,\; s,\; i,\; D,\; I_d,\; S_d,\; C) \in [0,1]^9$$

and A1 asserts that the state is nine-dimensional. The simplex constraint $r + s + i = 1$ removes one degree of freedom, so the state space is

$$\mathcal{P} = [0,1]^6 \times \Delta^2, \qquad \Delta^2 = \{(r,s,i) \in [0,1]^3 : r+s+i=1\},$$

and $\dim \mathcal{P} = 6 + 2 = 8$. The nine numbers are coordinates, not dimensions, and one is redundant.

Three consequences matter. Any covariance estimate over the nine coordinates is singular, because the three register columns are linearly dependent by construction, so a routine that inverts it fails or silently returns a generalised inverse. Any volume or density computed as though the space were a nine-cube is wrong, since $\mathcal{P}$ has zero nine-dimensional measure. And any protocol that asks a rater for nine independent judgements is asking for one too many; decision D2 settles what it asks for instead.

A1 should read that the state has eight degrees of freedom carried in nine named coordinates, with the ninth fixed by the constraint. That restatement is compatible with, and does not replace, the split the S1 constraint review recommends on cost grounds: assert the five frame-level components as A1, testable inside the annotation pass at no marginal cost, and carry the four DISC coordinates as a separate character-level assertion with its own instrument [23]. Applied together the two give A1 five frame-level coordinates carrying four degrees of freedom, with DISC's four asserted separately. A1's failure condition needs amending too, since it is now analytically satisfied for one coordinate; section 10 gives the text.

### 3.2 The scale, which the theory must declare

Each coordinate is bounded to the unit interval. The bound is a normalisation and carries no unit: nothing says what a trauma of 0.6 is 0.6 of.

The scale type has to be declared before section 5 is licensed, because on an ordinal scale the admissible transformations are all strictly increasing maps, and a weighted sum is not invariant under them: $0.6H + 0.4\tau$ is not preserved by a monotone recoding of $H$.

**Declaration.** The state coordinates are treated as interval-scaled, with unit and origin fixed by the endpoint anchors of the elicitation instrument: 0 is the anchor for the absence of the quantity and 1 the anchor for its dramatic maximum. The admissible transformation group is the positive affine group $x \mapsto ax + b$ with $a > 0$, and every formula must be invariant under it up to a corresponding change in its own output scale. Weighted sums are invariant in that sense; products, powers and quotients are not, because the product of two interval-scaled quantities depends on both origins. The cost is that the endpoint anchors must be written into the codebook and held fixed across annotators, or the scale is not interval and section 5 is not licensed. Until an instrument exists this is a commitment rather than a fact. It is new theory and it belongs in S1 section 4.1 and in A1's formal content, not only forward in this series; section 10 carries it as action T9. Section 7.4 is where the products bite.

Trauma carries a further property S1 states and section 7.3 takes up: it accumulates and does not resolve, so along a trajectory $\tau_{t+1} \ge \tau_t$. That is the only constraint on the state's motion the theory currently has.

## 4. The simplex

### 4.1 What kind of object it is

$\Delta^2$ is a two-dimensional convex polytope, a filled triangle. Its three vertices are the pure registers, its three edges are the states in which one register is absent, its interior is the states in which all three are present, and its barycentre is perfect balance. The coordinates are barycentric and they are what a competition between three exhaustive alternatives looks like written down.

Distances on it are not automatically Euclidean. Compositional data have a natural geometry in which the meaningful quantity is a ratio rather than a difference, so that moving from $(0.01, 0.98, 0.01)$ to $(0.02, 0.96, 0.02)$ is a larger change than moving from $(0.33, 0.34, 0.33)$ to $(0.34, 0.33, 0.33)$, although the Euclidean distances are comparable [1]. Whether that is the right geometry has a musical answer: it asks whether doubling a small Imaginary investment is a bigger event than nudging a balanced one. Nothing in the current mapping computes a distance on the simplex, so the choice is not yet forced; it becomes forced the moment any parameter is made a function of how far the registers moved, and S3 should record which geometry it assumes when it does.

### 4.2 The constraint manufactures the competition

A3 asserts that the registers compete, and offers the constraint as the encoding: investment in fantasy is bought at the cost of investment in rule. The natural test is to elicit the three magnitudes and look for negative correlations. That test cannot work in the form it suggests.

**Lemma 1.** Let $r, s, i$ have finite second moments and satisfy $r+s+i=1$ almost surely. Then

$$\operatorname{Cov}(r,s) + \operatorname{Cov}(s,i) + \operatorname{Cov}(r,i) = -\tfrac{1}{2}\big(\operatorname{Var}(r) + \operatorname{Var}(s) + \operatorname{Var}(i)\big).$$

*Proof.* The sum is constant, so $\operatorname{Var}(r+s+i)=0$. Expanding and rearranging gives the result. $\square$

In plain terms: three quantities that must add to one cannot all rise together, so on average they must move against each other, and exactly how much is fixed by arithmetic rather than by anything about registers.

The lemma holds for every distribution on the simplex and is exact. At least one covariance is negative, and if the three variances are equal the three correlations average exactly $-1/2$. Closed forms confirm it without simulation: for a Dirichlet with parameters $\alpha$, $\operatorname{corr}(i,j) = -\sqrt{\alpha_i\alpha_j / ((\alpha_0-\alpha_i)(\alpha_0-\alpha_j))}$, exactly $-1/2$ on every pair in the uniform case, and $-0.8133$, $-0.1111$, $-0.4880$ for a lopsided $\alpha = (5, 1, 0.4)$, quite unequal, with the covariance sum still exactly $-1/2$ of the variance sum.

Negative correlation among the registers is therefore not evidence of competition; it is a theorem about anything summing to one, holding equally of budget shares, vote shares and mineral proportions. The observation is Pearson's and it is the problem compositional data analysis exists to solve [1]. The S1 arbitration reached the same place from the correlation matrix [20] and already amended S1's section 10 accordingly.

**What the test must therefore be.** It has two parts and neither alone is informative. Rate the three registers on unconstrained anchored scales, in the cube, and test the raw correlation matrix against a null of independence; that is the question A3 is actually asking, and zero is the right null for it. Then renormalise the same ratings to the simplex and compare the resulting correlations with the compositional baseline Lemma 1 forces, to see how much of the constraint's negative coupling is arithmetic and how much survived the raw ratings. A study that reports only the second is reporting Lemma 1. The arbitration has already settled what the first part asks: not whether the three registers are strongly mutually negatively correlated, which on the constrained triple is close to arithmetically impossible, but whether they are negatively coupled at all against a null of independence, on unconstrained ratings whose correlation matrix is not singular [20].

It is worse than a null result, because the shipped instrument creates the constraint out of data that does not have it. The analyser counts keyword hits in three families and divides each by their total. Three independent and exchangeable counts have zero correlation before the division; after it, symmetry makes the three pairwise correlations equal and Lemma 1 then forces each to be exactly $-1/2$. Simulation over four hundred thousand draws returns $-0.502$, $-0.498$ and $-0.499$, which is the check rather than the figure. The competition A3 asserts appears at the moment of division.

### 4.3 The dominant register map is discontinuous, and the mode flickers

A4 selects the mode from $\arg\max(r,s,i)$.

**Lemma 2.** The map $\arg\max : \Delta^2 \to \{r,s,i\}$ is discontinuous precisely on the three segments joining the barycentre to the three edge midpoints, a tripod, and every neighbourhood of a point of that set contains points assigned to two different registers.

*Proof.* The map is discontinuous exactly where two coordinates are equal and at least as large as the third. Two coordinates being equal defines a full median of the triangle, but on the half of that median running from the barycentre to the opposite vertex the third coordinate is strictly the largest and the map is locally constant there. The discontinuity set is therefore the other half of each median, from the barycentre to the edge midpoint. On either side of such a segment the maximising index differs, and both regions are open with the segment in their closure. $\square$

Revision 1 stated this lemma for the three full medians, which is false: at $(0.2, 0.2, 0.6)$ the first two coordinates are equal, yet the third is the unique maximum and the map is continuous nearby. Anyone who acted on the earlier version should note the correction.

The measure of the states near the tripod has a closed form. For $(r,s,i)$ uniform on $\Delta^2$, the set where a given coordinate exceeds both others by at least $d$ is a kite with vertices at that coordinate's vertex, the two points where it leads by exactly $d$ on each edge, and the point where all three are within $d$; each kite has area fraction $(1-d)^2/3$, and the three are disjoint, so

$$P(\text{gap} \ge d) = (1-d)^2, \qquad P(\text{gap} < d) = 2d - d^2,$$

giving $0.0975$ at $d = 0.05$ and $0.1900$ at $d = 0.10$. The derivative at zero is 2, so the measure vanishes linearly rather than quadratically: on the uniform distribution one state in ten sits within a tenth of a mode change, and every one of those is a place where a rater moving one point on a scale changes the key.

Musically this is mode flicker. A character whose registers are nearly balanced, which is the ordinary condition of being pulled three ways, has their mode reassigned by an arbitrarily small change in the text, and Phrygian to Ionian is not a shading but a different scale; since the published listener ordering of the modes is not monotone in brightness [19], no argument from brightness alone will predict how the substitution is heard.

Three remedies exist: hysteresis, a dead band, and interpolation between the two modes' characteristic alterations. The first two make $f_{\text{mode}}$ a function of the current and previous state, which costs the decomposability A11 asserts; the third is a musical proposal rather than a patch, because interpolating between two modes that differ in one degree means bending that degree, and a composer can hear that. Section 4.4 narrows the choice and decision D3 carries it. The sister series met the same difficulty on its own rounding boundaries and put a dead band of 0.02 on them [2] without specifying the behaviour inside the band, which is the part that has to be specified.

These figures are computed on the uniform distribution. The distribution the system realises is nothing like uniform.

### 4.4 What the instrument produces: a value off the state space on 44.8 per cent of frames

The figures here come from running the shipped `analyzeRSI` (`psychometric_calculus.ts:236-250` at the pinned commit) over the analysis text of all 232 frames of the play library, reimplemented exactly, including its substring matching and its presence-not-count rule.

Of the 232 frames, **104, or 44.8 per cent, return $(0,0,0)$**. That triple is not on the simplex: it does not sum to one and has no maximum. This paper first reported 107 and instructed that the commensurability audit's 104 be corrected to match it [3]. That instruction was backwards and is withdrawn: the audit was right. The figure 107 came from a parser that matched the annotation field with a pattern stopping at the first quote character and not honouring backslash escapes, which truncated seven of the 232 annotations and removed the only register keyword from three of them, so the analyser was handed a short string and returned $(0,0,0)$ where it should have returned a triple. The defect and its corrected figures areecorded in the S3 amendments [27], and `s3_frames.py` is now the single reader of the library and asserts its own record count against the annotation count so that a parser dropping records fails rather than reports.

Four consumers then do four different things with the degenerate triple, and only three of them are tie-breaks. `rsiToMode` (`psychometric_calculus.ts:191-198`) initialises its dominant register to Symbolic and guards with strict inequalities, so it returns the Symbolic. `getModalTransformation` (`leitmotif_transformation_rules.ts:67-76`) sorts and returns the Real. `getDominantRegister` (`psychometric_instrument_mapper.ts:183-187`) falls through to the Imaginary. And the key selector (`psychometric_calculus.ts:348-351`) is not a tie-break at all but a threshold at 0.6 on a register magnitude, which no degenerate triple clears; on the realised distribution it clears only at a vertex, so the key is a function of the registers on 98 of 232 frames and constant on the other 134.

What comes out on those frames is worth stating in musical terms, because the disagreement is audible. The key is set from one resolution of the degenerate triple, the modal transformation applied to the pitches from a second, and the mode written into the notation from a fourth quantity that consults no register at all, as section 6.5 sets out. A frame with no state still produces a cue, and the cue is internally consistent only by coincidence. Nothing in it was caused by a register, because there was no register.

Of the 128 frames that do land on the simplex, 101 land on a vertex, 21 land exactly on a tie, and 6 land on an edge with all three coordinates distinct. The single point in the interior is the barycentre, itself a three-way tie, counted among the 21. The instrument emits ten distinct triples in all.

| Triple | Frames | Position |
|:---|---:|:---|
| $(1, 0, 0)$ | 44 | vertex |
| $(0, 1, 0)$ | 36 | vertex |
| $(0, 0, 1)$ | 18 | vertex |
| $(0.5, 0.5, 0)$ | 12 | tie, on an edge |
| $(0.5, 0, 0.5)$ | 6 | tie, on an edge |
| $(0.333, 0.667, 0)$ | 3 | edge |
| $(0.667, 0.333, 0)$ | 2 | edge |
| $(0, 0.5, 0.5)$ | 2 | tie, on an edge |
| $(0, 0.333, 0.667)$ | 1 | edge |
| $(0.333, 0.333, 0.333)$ | 1 | tie, the barycentre |

Counting the degenerate frames, the register triple is absent, pure or undecided on 226 of 232 frames, 97.4 per cent. The figure `s2-figure-simplex.svg` draws it: the triangle, the tripod on which the mode is undefined, and the ten realised triples sized by frame count.

This reframes section 4.3 rather than confirming it. Under the uniform distribution the worry is that a tenth of states sit near a discontinuity. Under the realised distribution nothing sits near one: 78 per cent sit at a vertex, maximally far from any boundary, and 17 per cent sit exactly on a boundary, where the mode is decided by insertion order in a dictionary. **The theory's mode selector, on the corpus the theory has, is either trivially determined or arbitrarily determined, and almost never determined by a margin.**

It also settles part of the choice section 4.3 left open. Hysteresis and a dead band are both defined by a gap; on an exact tie the gap is zero, so neither releases, and on a scene's first frame neither has a previous register to hold. Of the three remedies only interpolation returns a determinate value on a tie, and ties are 17 per cent of the frames that reach the simplex at all. S3 still chooses, but against a narrower set than section 4.3 offered.

Three repairs follow and none needs a decision: the analyser should decline on text it cannot read rather than return zeros, with a defined no-state path for the four consumers; the keyword match should be on word boundaries rather than substrings, since at present "king" fires inside "knocking", "masking" and "ticking", and "self" inside "himself"; and the presence-not-count rule, which is why every fraction is a unit fraction, is either a design choice about salience or a defect, and has never been stated as either. They are actions T2, T3 and T4 of [25].

The three keywords that fire most often across the library are "real" with 29 hits, "symbolic" with 25 and "death" with 17, so the instrument's most reliable signal is the analyst's own Lacanian vocabulary read back out of the analyst's own commentary. These are figures about a keyword counter, not about raters. No human produced any of the 232 triples, and nothing here says what a human elicitation would yield.

### 4.5 The simplex and the Borromean link cannot both hold

S1 names two things the theory takes from Lacan: the tripartite division, and the topological insistence that the three registers are interdependent in the way a Borromean link is, so that cutting any one ring frees all three [16]. The theory then formalises the registers on a simplex. Those are two formalisations of the same object and they disagree.

The defining property of a Borromean link is that it is Brunnian: **every pairwise linking number is zero**, and what is non-zero is the triple invariant. Read as a claim about dependence, which is how the corpus reads it, the figure says no two registers constrain one another; only all three together are bound.

Lemma 1 says the opposite. On the simplex the three covariances sum to $-1/2$ of the sum of the variances, so pairwise independence is impossible: if all three covariances were zero the variances would sum to zero and every register would be constant. **The only distribution on the simplex with pairwise-independent registers is a point mass.** A subject whose registers vary at all has pairwise-coupled registers, by construction.

So the theory cannot have both. The simplex encodes exhaustive pairwise competition; the link encodes pairwise freedom with collective dependence. Choosing the simplex, which the theory has done in every formula it has written, means the Borromean figure is a picture in the prose and not a claim the formalism makes, and S1 should say so where it cites the figure. Choosing the link would mean abandoning the constraint and working in the cube with a three-way interaction term, which is a different and considerably harder theory, for which no musical mapping exists.

The choice reaches further than S1's prose, because the corpus computes a quantity named for the link. The Borromean stability index has four incompatible definitions in the implementation [3], it is an input to the composite stability score, and on the only path that score has it contributes nothing at all because the register triple it reads is a constant. A quantity named for a figure the formalism does not assert, computed four ways, carrying a published weight of sixty per cent while varying not at all, cannot stand unaddressed whichever way the decision goes. Section 7.1 names it; section 10 carries it as decision D1.

## 5. Scalarisation, and the limits of weighted sums

### 5.1 The identity

Several quantities in the theory are a weighted sum of two state coordinates used to select a level: fragmentation and orchestration density in A7 and A8, and the quantity the code calls a Lyapunov exponent. For two linear functionals on a state sub-vector $x$ with covariance $\Sigma$,

$$\operatorname{corr}(a^{\mathsf T}x,\; b^{\mathsf T}x) \;=\; \frac{a^{\mathsf T}\Sigma b}{\sqrt{(a^{\mathsf T}\Sigma a)(b^{\mathsf T}\Sigma b)}}.$$

In plain terms: if two quantities are both built by mixing the same two ingredients in similar proportions, they must move together, and how tightly is fixed by the recipe rather than by the data. The A8 decision memo makes this point and draws the right conclusion, that the correlation depends on nothing else about the data, not on which plays, not on what produced the numbers, not on how many frames there are [21].

Worked for the shipped pair, fragmentation $0.6H + 0.4\tau$ against density $0.3H + 0.7\tau$: with equal dispersion and uncorrelated inputs the correlation is $+0.8376$; at the frame library's dispersions, $\operatorname{sd}(H)=0.1925$ and $\operatorname{sd}(\tau)=0.2496$, still uncorrelated, $+0.8583$; and at the library's input correlation of $+0.2802$, $+0.9150$. S1 quotes that last figure from the frame library, which is itself system output; it is a fact about two formulae applied to one body of prose, and the identity is what makes it worth quoting.

### 5.2 The positivity bound

**Theorem 1.** Let $x = (H, \tau)$ have uncorrelated components of equal dispersion, and let $a$, $b$ be weight vectors with non-negative entries summing to one, each entry at least $\varepsilon > 0$. Then

$$\operatorname{corr}(a^{\mathsf T}x,\; b^{\mathsf T}x) \;\ge\; \sin\!\left(2\arctan\frac{\varepsilon}{1-\varepsilon}\right) \;>\; 0.$$

*Proof.* With $\Sigma = \sigma^2 I$ the correlation is the cosine of the angle between $a$ and $b$. Confining every entry to $[\varepsilon, 1-\varepsilon]$ confines each weight vector to the cone between the rays at angle $\arctan(\varepsilon/(1-\varepsilon))$ from each axis, so the angle between any two admissible vectors is at most $\pi/2 - 2\arctan(\varepsilon/(1-\varepsilon))$, whose cosine is the stated sine. The bound is attained at the two extreme rays. $\square$

| $\varepsilon$ | greatest angle | least correlation |
|---:|---:|---:|
| 0.05 | 83.97 deg | +0.1050 |
| 0.10 | 77.32 deg | +0.2195 |
| 0.20 | 61.93 deg | +0.4706 |
| 0.30 | 43.60 deg | +0.7241 |
| 0.40 | 22.62 deg | +0.9231 |
| 0.50 | 0 deg | +1.0000 |

A numerical check at $\varepsilon = 0.20$, sweeping 601 values of the first weight against both extreme values of the second, returns $+0.4706$, the bound.

The practical reading is what makes the theorem worth having. The shipped pair gave every weight at least 0.3, so **its correlation could not have fallen below $+0.7241$ whatever any corpus contained**. The collinearity S1 reports at $+0.9150$ was not merely an identity once the dispersions were known; it was bounded away from zero by the two lines of the definition, before any dispersion was measured and before a frame was scored.

**Corollary.** No two quantities in the theory that are strictly increasing in both trauma and entropy can be independently controllable. If the theory wants two knobs it must accept that one turns the other, give one knob a minus sign, or take the second quantity out of the plane. The theory has taken the second of these, and section 5.3 is what it looks like.

### 5.3 The adopted form, geometrically

The A8 amendment S1 adopts is the orthogonal complement construction:

$$\text{density} = 0.3H + 0.7\tau, \qquad \text{fragmentation} = \frac{\max(0,\; 0.7H - 0.3\tau)}{0.7}.$$

Density keeps the weight vector $(0.3, 0.7)$, whose effective split at the library dispersions is 24.8 per cent entropy to 75.2 per cent trauma; fragmentation takes, before clipping and scaling, the vector $(0.7, -0.3)$, whose effective split is 64.3 to 35.7 [3]. Geometrically the second is the first rotated by a quarter turn.

At equal dispersion with uncorrelated inputs their correlation is exactly zero. At the library's dispersions with uncorrelated inputs it is $-0.1869$, and at the library's input correlation of $+0.2802$ it is $+0.0031$. S1 reports $+0.0571$ on the library itself; the difference is the clip, which binds on 21 of the 232 frames and binds strictly on 20, and which breaks the exact orthogonality where weight exceeds disorder. The theory should say that the orthogonality is exact away from the clip and approximate at the floor, rather than quoting one correlation as a property of the pair; section 10 gives A8's replacement text.

The geometric content is that weight and disorder become the two axes of a rotated frame, and the musical claim, that a burdened but ordered subject sounds thick and whole while an unburdened but scattered subject sounds thin and broken, is exactly the statement that those are the two axes.

### 5.4 Nominal weights are not effective weights

A weight buys influence in proportion to the product of the weight and the dispersion of the variable it multiplies. Coefficients of 0.6 and 0.4 on variables of dispersion 0.1925 and 0.2496 do not split influence 60 to 40 but 53.6 to 46.4; the density pair, nominally 30 to 70, splits 24.8 to 75.2.

The audit over the whole corpus found thirty-four weighted combinations. Six are degenerate, one input carrying no variation at all; eight are misleading, the nominal and effective splits differing once both dispersions are measured; one agrees; and **nineteen are undetermined, meaning nobody has measured the dispersions of the quantities they weight** [3].

The nineteen are the important number. They cannot be closed by argument: each needs the dispersion of its inputs measured on some corpus, and for most of them no corpus exists. Three of the nineteen are the indices on which the sister series' deployment papers rest, which means those papers currently quote weights whose effective split is unknown. The minimum action is to list the nineteen with the data each would need, and to mark the three so that the deployment papers can carry the qualification until the measurement is made; section 10 carries it as T5, and it is the largest unscoped item in this paper.

Following S1, no coefficient appears in S2, S3 or S4 without its effective contribution beside it, and any table of weights carries the dispersions it was computed against.

## 6. The transformation as a mathematical object

### 6.1 The codomain, which the theory has never defined

S1 writes $\Phi : \mathcal{P} \to \mathcal{M}$ and never says what $\mathcal{M}$ is. It should, because most of its components are categorical and the difference governs what can be asked of $\Phi$. Taking S1's own list, and decision 6, which makes the eight-marking form normative [18]:

$$\mathcal{M} = \underbrace{[t_{\min}, t_{\max}]}_{\text{tempo}} \times \underbrace{D_8}_{\text{dynamics}} \times \underbrace{M_7}_{\text{mode}} \times \underbrace{T}_{\text{timbre}} \times \underbrace{\mathcal{T}_{24}}_{\text{harmony}}$$

with $D_8$ the eight conventional dynamic markings, $M_7$ the seven diatonic modes, $T$ the timbre space, which the theory has not specified and which S3 owes, and $\mathcal{T}_{24}$ the 24 consonant triads. Note that $v(\tau) = 20 + 107\tau$ is the intermediate quantity and the marking is what $\Phi$ emits, so the velocity interval $[20,127]$ is the pre-image and not the output.

**The continuity decision, which this paper was asked to make.** Four of the five factors are discrete, so $\Phi$ cannot be continuous and no useful claim survives asking for it. The property this paper adopts, and which S3 and S4 are held to, is **piecewise continuity with a declared jump set**: each component must be continuous on the interior of each cell of a stated partition of $\mathcal{P}$, and the partition must be written down. Two jump sets are known. The mode's is the tripod of Lemma 2. Tempo's is the band boundaries of `entropyToRhythm`, which steps at $H = 0.4$ and $H = 0.7$, so tempo is not in fact a continuous factor either and the interval above describes its range rather than its behaviour. The dynamics jump set is the eight marking boundaries, which decision 6 fixes. The harmonic jump set is every state change that moves the chain position. S3 owes the partition for timbre; nothing else is outstanding.

The harmonic factor has the useful structure and it is not this paper's to develop: the sister series sets out the neo-Riemannian transition algebra in full, and independent verification over all 24 triads confirms every group-theoretic statement in it [2], [5], [6], [7], [9]. What this paper adds is why it matters to $\mathcal{M}$. The Cayley graph distance is a genuine metric on the 24 triads, the only thing in the theory that makes "how far did the harmony move" a number rather than a judgement; the diameter is five, so a harmonic displacement is a number between zero and five. Without it $f_{\text{harmony}}$ has a codomain with no scale. The affective reading of the individual generators remains a convention with no experimental support [8], and the group's rigour does not transfer to it.

### 6.2 The three asserted properties

**Totality** requires $\Phi$ to be defined at every point of $\mathcal{P}$, and so far as anyone can tell it is. What fails is upstream and downstream of it. The state estimator is not a map into $\mathcal{P}$: it returns $(0,0,0)$ on 46 per cent of frames, and that triple is not a state. And the four consumers of section 4.4 each extend $\Phi$ over that larger domain in a different way, so what runs is not one total function on $\mathcal{P}$ but four inconsistent extensions of one. The distinction matters because the repair is different: nothing about $\Phi$ needs changing, and the estimator does.

**Determinism** requires $\Phi$ to be a function of the state alone. S1 records that it was not, because of unseeded draws in the composer and the calculus, and that this blocks every listening study. The patch that closes it derives every draw from a key built from the work, the character and the frame index, so each draw is a pure function of its own coordinates and no global stream can make the output depend on call order [4]. Order independence and change locality then hold structurally rather than by discipline, which is what a programme needs if rendered stimuli are to stay citable across code changes.

**Decomposability** requires each musical parameter to be a function of the state in its own right. This is the property most at risk, and section 4.3 named the risk: two of the three flicker remedies make $f_{\text{mode}}$ a function of the current and previous state, turning $\Phi$ into a function on $\mathcal{P} \times \mathcal{P}$ and breaking the decomposition the theory advertises as its advantage over a learned system.

### 6.3 A11's noun

A11 says the whole composes: it is a calculus. The three adjectives are checked above; the noun is not, and a calculus is an algebraic claim.

There are two readings. On the first, $\Phi$ composes across frames: a scene is $\Phi$ applied to a sequence of states, the algebra is the monoid of state sequences under concatenation, and the score of a concatenation is the concatenation of the scores. That fails as soon as hysteresis or a dead band is introduced, and it already fails for the leitmotif transformations, which are composed across frames and do not form a group: the implemented inversion is not an involution, since it rebuilds the pitch array from the root plus the intervals and changes its length, and the chromatic-descent and whole-tone-ascent transformations destroy interval content irrecoverably.

On the second, $\Phi$ composes across parameters: the calculus is the product of five functions computed separately and assembled. That is decomposability restated, and it is the reading the theory should adopt, because it does the work Proposition 4 needs. If the theory means the first as well, it owes an identity element, an associativity check and an account of the transformations that have no inverse.

### 6.4 Identifiability: what survives into a score

The question every listening study depends on is how much of an eight-dimensional state a listener could in principle recover from a cue. Nobody has asked it of this mapping. A coarse bound is available now from section 6.1 and does not wait on S3.

Count the information in $\mathcal{M}$ at one frame: three reachable tempo bands, eight dynamic markings, seven modes, 24 triads, and timbre unspecified. Ignoring timbre that is at most $3 \times 8 \times 7 \times 24 = 4{,}032$ distinguishable frames, about twelve bits, an upper bound on what any listener could recover however good their ear.

The binding constraint is not capacity but reach. Of the eight state dimensions, trauma reaches dynamics and the harmonic coordinate; entropy reaches tempo; the two register degrees of freedom reach mode; and **the four DISC coordinates reach only timbre**, which is the one factor the theory has not specified. So four of the eight dimensions currently survive into an unspecified channel, and the fibre structure of $\Phi$ cannot be computed until $T$ is. What can be said without it is that on the composer path of section 6.5 the registers are hard-coded, so the two register dimensions reach nothing at all, and entropy does not arrive, so the recoverable state on that path is one-dimensional: everything audible is a function of trauma.

That is the number the programme needs and it should be in front of any listening study. A study that asks listeners to recover a register from a cue produced on that path is asking them to recover a constant. Section 10 carries the completion of this analysis as an action on S3, once $T$ exists.

### 6.5 Where $\Phi$ is not a function of the state at all

Three findings in the shipped tree, pinned to commit `28c04ec`, bear on whether $\Phi$ is a function in the mathematical sense, and all three are S4's to repair; the detail with file and line is in [25]. The composer hard-codes the register triple, so the dominant register is always the Imaginary and five of the seven modes are unreachable in it. The mode written into the rendered score comes from none of the modal selectors but from a three-way branch on $(\tau + H - 0.5)/2$, a quantity the code calls a Lyapunov exponent and which is not one. And the melody routine is called with five arguments against a signature whose entropy parameter defaults to 0.5, so entropy never reaches the composer and the two A8 selectors degenerate to $0.7\tau + 0.15$ and $0.3 + 0.4\tau$, both affine in trauma, correlated at exactly 1. That last is the finding S1 reports at the end of its section 8.2, and it is the worst case of the collinearity rather than an instance of it; the seeding patch repairs it [4].

## 7. The dynamics apparatus

Decision 2 records that the dynamics apparatus is to be developed here as apparatus, and kept available even where only partly useful. Doing that honestly means beginning with what is not there.

### 7.1 The naming table, per decision 3

The corpus used "free energy" for three objects: the Gibbs free energy $G = H - TS$; a potential well in a model of collapse, elsewhere called the bias well; and, in the applied appendices, a patient-level quantity that reads as the variational free energy of the predictive-processing literature [10] and is never defined. One name for three objects is how a reader comes to believe a theory has borrowed a result it has not. The term is retired. S1 promises that this table does the same job for every other borrowed or multiply-defined term [16], and the commensurability audit names six quantities with irreconcilable definitions [3], so the table covers all of them.

| Retired or disputed term | Adopted term | What it is | Status |
|:---|:---|:---|:---|
| free energy, variational sense | **surprise bound** | a variational upper bound on negative log evidence [10] | named, not used; no generative model exists for it to bound |
| free energy, dynamical sense | **stability potential** | a scalar whose minima are the states a trajectory settles into | apparatus, section 7.4 |
| free energy, Gibbs sense | **Gibbs free energy** | the thermodynamic quantity | not used; the analogy is retired with the term |
| Lyapunov exponent, as implemented | **imbalance index** | $(\tau + H - 0.5)/2$, effective split trauma 56.5 to entropy 43.5 [3] | keep the quantity, drop the name; it measures no divergence |
| psychometric Reynolds number | withdrawn | a ratio of four quantities none of which has a unit | not dimensionless, therefore not a Reynolds number |
| emergence | **total correlation** | $\sum_i \mathcal{H}(\Psi_i) - \mathcal{H}(\Gamma) \ge 0$ | the corpus states its negation and calls it an axiom |
| tension, five definitions | **withdrawn as a single term** | three disjoint weighted combinations, a chord lookup and trauma itself [3] | S3 must name and define each separately or keep one |
| Borromean stability index, four definitions | **register spread**, on the first definition only | one minus the largest pairwise register difference | contributes zero on the only path it has, because the triple it reads is constant; see section 4.5 and decision D1 |
| fragmentation, two live definitions | **fragmentation**, the A8 adopted form | $\max(0, 0.7H - 0.3\tau)/0.7$ | the shipped form is superseded and must be removed from the code |
| intensity, two definitions | **orchestration density** | $0.3H + 0.7\tau$ | the word "intensity" is retired; section 6.5 relies on this |
| entropy, three definitions | **entropy**, the state coordinate $H$ | the disorder of the subject's symbolic organisation | the parser's lexical-diversity formula and the style-density formula are estimators of it, not definitions of it, and must be labelled as such |
| trauma, three definitions | **trauma**, the state coordinate $\tau$ | accumulated and unresolved weight | as for entropy: the beat-position formula and the keyword tally are estimators, and neither is the quantity |

A hazard belongs with the table. The symbol $H$ carries four meanings across the corpus: enthalpy, Hamiltonian, Shannon entropy and homology group. The state uses $H$ for entropy, so $G = H - TS$ reads on this theory's conventions as entropy minus temperature times entropy. From here, $H$ is the state's entropy coordinate and nothing else. Shannon entropy is written out in words and never abbreviated in this corpus. A Hamiltonian is $\mathcal{E}$. Homology groups carry their degree as $H_n$ and appear nowhere in this series.

### 7.2 There is no evolution equation

The apparatus of dynamical systems applies to a state that moves according to a rule. This theory has a state and no rule. Nothing in the corpus supplies $d\vec{p}/dt = F(\vec{p}, u)$ with $F$ specified. The unified volumes write $\partial\Psi/\partial t = F(\Psi, \text{Input}, \text{Context})$ and never give $F$ (`01_Foundations.md:236`); the predictive volume names the state evolution model as the place where the physics lives and never writes it down (`08_Vol_07_Predictive_Mechanics.md:56`). In the reference implementation the state at frame $t+1$ is read from annotation, not computed from the state at frame $t$.

This is the load-bearing gap and everything below is conditional on closing it. A stability potential needs a flow to have minima of; a bifurcation is a qualitative change in a flow; a critical-slowing indicator estimates the leading eigenvalue of a linearisation. Without $F$, none of these is a quantity about this theory.

### 7.3 The undetrended early-warning indicator is uninformative here

The standard early-warning apparatus rests on critical slowing down: approaching a fold, the leading eigenvalue of the linearised dynamics approaches zero, the return time diverges, and two statistics on the fluctuations rise, the variance and the lag-1 autocorrelation [11], [12]. Both are computed on residuals after detrending.

**Theorem 2.** For a series $x_1, \dots, x_n$ with mean $m$, write $S = \sum_t (x_t - m)^2$ and $Q = \sum_{t<n} (x_{t+1} - x_t)^2$. Then the sample lag-1 autocorrelation satisfies

$$\mathrm{AC}_1 \;=\; 1 \;-\; \frac{Q}{2S} \;-\; \frac{(x_1 - m)^2 + (x_n - m)^2}{2S}.$$

Consequently $\mathrm{AC}_1 \to 1$ whenever the total squared step and the two endpoint terms are small against the total variation, which holds for any series carrying a smooth trend, whatever dynamics generate the increments.

*Proof.* Expand $Q = \sum_{t<n}[(x_{t+1}-m)-(x_t-m)]^2$ and collect against $S$; the cross term is twice the lag-1 autocovariance and the remainder is the two endpoint squares. $\square$

Monotonicity is sufficient and not necessary, and the identity says which quantity governs: a trend, of either sign. The identity reproduces the sample $\mathrm{AC}_1$ exactly on every test series. A rising linear ramp of 200 points gives $+0.9850$; **a falling ramp gives $+0.9850$ too**, which is what shows monotone increase is not the operative hypothesis; a step at the midpoint gives $+0.9850$; the rising ramp with independent noise of dispersion 0.02 gives $+0.9785$; independent noise with no trend gives $+0.0648$. At the length of a short act the effect is already large: a 30-point series gives $+0.9000$ and a 12-point series $+0.7500$.

The consequence for this theory should be stated at its true size. Trauma as defined ratchets, so a trauma series always carries a trend, so the **undetrended** indicator computed on it reports a high value at every frame of every play, including a calm one. That is not an indictment of the early-warning literature, which detrends, and the sister series already requires detrending and surrogate significance testing [22]. It is a statement that this theory owes a detrending model before it may compute the indicator at all, and that the model is not trivial, because on a monotone bounded quantity the trend is most of the signal.

Three ways forward and they do not cost the same: supply a detrending model, which is real statistical work; move the indicators to entropy, which is not defined as monotone, which is free and narrows the claim honestly; or give trauma a resolution term, the largest change, since it amends A1's definition of trauma and every parameter monotone in it, and probably the one the drama wants, because plays contain relief. Decision D4 carries all three with their costs.

### 7.4 The stability potential

A stability potential is the standard way to write down a system that sits in one state, resists small pushes, and then flips suddenly, which is what happens to a character at a turning point. Formally, a one-dimensional overdamped flow in a potential $V$, $\gamma \dot{x} = -V'(x) + \xi(t)$, has stable states at the minima of $V$, a return rate proportional to $V''$ there, and a transition when a minimum and a maximum annihilate. The cusp form

$$V(y) = \tfrac{1}{4}y^4 - \tfrac{1}{2}\beta y^2 - \alpha y$$

is the normal form for the simplest case producing hysteresis and sudden jumps [13], and it is the one genuine potential-well model in the corpus, correctly stated, in an unsigned survey document, attached to nothing.

To attach it the theory must supply the scalar playing $y$, two functions of the state playing $\alpha$ and $\beta$, a damping $\gamma$ with a time unit, and a noise amplitude. **A candidate for $y$ already exists in the corpus and has not been proposed as one.** The commensurability note rotates the state plane and takes $u = (\tau + H)/\sqrt{2}$ as the intensity axis and $v = (\tau - H)/\sqrt{2}$ as its complement [24]. Both carry effective contributions of trauma 56.5 to entropy 43.5 at the library dispersions, the same split as the imbalance index, because all three weight the two coordinates equally in magnitude. The second is exactly the quantity a bistable subject would be bistable in: it is positive when weight exceeds disorder, which is the burdened but ordered character, and negative when disorder exceeds weight, which is the scattered one, and a character's turn is a passage from one to the other. Proposing $y = v$ makes the cusp's two wells those two conditions and makes $\alpha$, which tilts the potential, the natural home for whatever the scene does to the character. This is a proposal and not a result; it is offered because decision 2 asks for apparatus that can be used, and an apparatus with no candidate order parameter cannot be.

The caution of section 3.2 applies with full force. A quartic is not invariant under the positive affine group, so its shape depends on the origin and unit of $y$: changing what 0 and 1 mean changes the model's predictions. Adopting the cusp means adopting a statement of what fixes that scale, which is why section 3.2's anchors matter here more than anywhere.

### 7.5 The ensemble layer

Two further models are addressed to a group rather than a subject: the Ising Hamiltonian $\mathcal{E}(\sigma) = -\sum_{\langle i,j\rangle} J_{ij}\sigma_i\sigma_j - \sum_i h_i \sigma_i$, which the corpus states in two mutually inconsistent versions under one name [14], and Granovetter's threshold rule, in which the aggregate turns on the whole distribution of thresholds rather than its mean [15]. Both belong to the dialogue papers rather than to the single-subject calculus, and both also wait on the evolution equation of section 7.2. Their attachment conditions are in the table below so that they are on record.

### 7.6 What each piece would cost to attach, and a report back on decision 2

| Apparatus | Correct statement exists | What the theory must supply | Blocks on |
|:---|:---|:---|:---|
| Stability potential, cusp form | yes [13] | two control functions, damping with a time unit, noise amplitude, and a scale for $y$; $y = (\tau - H)/\sqrt{2}$ proposed in 7.4 | an evolution equation |
| Early-warning indicators | yes [11], [12] | a detrending model, or a move to entropy, or a resolution term on trauma | Theorem 2 |
| Bifurcation analysis | yes | a flow to linearise | an evolution equation |
| Ising ensemble | yes [14] | binary variable, coupling, field | the dialogue papers |
| Threshold cascade | yes [15] | a threshold per character, and an ensemble | the dialogue papers |
| Lyapunov exponent | yes | a trajectory, a linearisation and a limit; the implemented quantity is none of these | an evolution equation |
| Surprise bound | yes [10] | a generative model to be surprised by | nothing proposes one |

Decision 2 was taken before this section was written, and it is worth reporting back on. Developing the apparatus as apparatus has established that three of the seven pieces wait on a single object the theory does not have, and that writing that object is the largest theoretical commitment outstanding in the programme. The author may reasonably conclude that the evolution equation is worth writing, in which case three pieces attach at once, or that it is not, in which case those three should be retired from the corpus rather than carried as available. What should not continue is the present state, in which they are described as apparatus and cannot be attached. Section 10 carries this as decision D5.

## 8. The wider vector and the reduction to twenty-four

Decision 1 settles the factor reduction at twenty-four. The wider personality space is four DISC dimensions, five Big Five dimensions, three Dark Triad dimensions and the thirty entries of the Cognitive Bias Atlas, giving forty-two coordinates, reduced to twenty-four factors.

The mathematics of that sentence is weaker than it looks. A factor reduction is a hypothesis about a covariance matrix: to say forty-two reduce to twenty-four is to say the population covariance of the forty-two has a twenty-four factor structure capturing a stated share of variance, and data can settle that. No such data exists. There is no sample scored on all forty-two, hence no covariance matrix, hence nothing for a factor structure to be a structure of.

Turning the choice into a result would require a sample scored on all forty-two of a size supporting a forty-two variable covariance estimate, the largest single piece of empirical work in the programme; commensurable instruments, which these are not, ranging from a replicated taxonomy to a catalogue with no loadings; and a criterion for the number of factors, stated in advance.

Until then the twenty-four is a chosen dimensionality for an engineered parameterisation, with the rationale S1 gives: it was the size of the wider vector before the bias count was settled at thirty, so the reduction keeps the personality space the size it has always been while carrying the whole bias catalogue behind it. That is a legitimate engineering decision and an illegitimate empirical claim, and the corpus must never write it in the second form.

Three further points belong here because decision 1 was meant to end them. **S1 still closes its section 4.3 on "reduced by principal or independent component analysis to roughly eight factors said to capture the large majority of variance, and normalised to the unit sphere"**, four sentences after restating the target as twenty-four. That sentence carries the superseded eight and the illegitimate empirical form, and it should be struck; section 10 carries it as T8. Separately, principal and independent component analysis are different operations, and "roughly eight factors capturing the large majority of variance" has no meaning under the second, since independent components are not ordered by variance [23]. And the unit-sphere normalisation discards the magnitude that DISC and the Big Five contribute, which is a modelling decision nobody has argued for.

One structural point survives from the drafting: the forty-two divide into twelve trait coordinates and thirty bias coordinates, the two blocks sit on different measurement footings, and a reduction respecting that split would be easier to interpret than one that mixes them.

## 9. What is proved, what is sharpened, what is absent

Section 1 lists what is proved and what is sharpened; [25] lists what follows for the author. What belongs here is the other half of the ledger.

**Assumed and not established.** That the nine coordinates are the right coordinates; that the registers admit magnitudes at all; that the simplex rather than the cube is their domain; that Euclidean distance is the right metric on it; that the coordinates are interval-scaled, which section 3.2 declares and no instrument yet supports; and that the state moves in any way the theory could write down.

**Absent.** An evolution equation. A detrending model. A generative model. A timbre space. A covariance matrix for the wider vector. The dispersions behind nineteen weighted combinations. And any measurement instrument for any state coordinate that the system does not itself produce.

That last governs the rest, and S1 states it plainly: the corpus contains no observation of trauma, entropy or the registers that the system did not produce about itself. The instrument that would change it is the annotation protocol, and its cost is now settled: **about eleven thousand dollars and 176 hours of the author's time over roughly seven months, gating four of the nine live assertions**, namely A1 as restated, A2, A3 and A5 [23]. The earlier figures of "a term" and "six of nine" were superseded by the S1 constraint review and the arbitration, and revision 2 of this paper repeated them in error.

This paper could prove things because theorems about a construction need no data about the world; Lemma 1, Lemma 2, Theorem 1 and Theorem 2 would hold if no play had ever been scored. That is also their limit. None says whether the theory describes anything.

## 10. What this paper puts to the author

The decisions and actions this paper generates are set out in a companion artefact, `MPN-S2-DECISIONS` [25], so that the assertions register can be updated from a document rather than from a paper's penultimate section. It carries five decisions with their options, their costs and the cost of leaving each undecided; ten actions that need no decision, each with an owner; and replacement text for the five entries of the assertions register [17] this paper changes, A1, A3, A4, A8 and A11.

The five decisions, in one line each. **D1**, simplex or Borromean link, which section 4.5 shows cannot both hold. **D2**, how the registers are elicited, which settles whether A3 can be tested at all. **D3**, what the mode does at a tie, which section 4.4 narrows to one workable option. **D4**, whether trauma is allowed to resolve, which section 7.3 shows governs the whole early-warning apparatus. **D5**, whether to write an evolution equation, on which three of the seven pieces of dynamics apparatus depend.

## 11. References

**On the paths in these entries.** An entry that gives a path in backticks names an artefact in the MPN working corpus rather than a page on this site. That corpus is not published, so such a path does not resolve from here. The citations are kept as they stand because each names a real artefact and each entry says what the artefact is and what it establishes, which lets a reader see what a claim rests on and ask for the artefact by name. A citation removed to spare a reader a path they cannot open would hide the dependency rather than disclose it.

A citation of the form `psychometric_calculus.ts:211` names a file and a line in the MPN Conductor source tree, read at the revision this paper's metadata table pins its implementation claims to.

The rest of the series is published in this working group: [MPN-S1](/papers/mpn-s1-psychometric-calculus-theory), the theory; [MPN-S3](/papers/mpn-s3-mapping-state-to-musical-material), the mapping; [MPN-S4](/papers/mpn-s4-conductor-implementation-audit), the application audit; [MPN-S5](/papers/mpn-s5-dialogue-use-cases), the dialogue use cases; and [MPN-S6](/papers/mpn-s6-expression-aid), the expression aid. Where an entry below also gives a working filename such as `S1-mckenney-lacan-theory.md`, that is the corpus copy of the same document.

[1] J. Aitchison, "The statistical analysis of compositional data," *Journal of the Royal Statistical Society, Series B*, vol. 44, no. 2, pp. 139-177, 1982. The observation that ratios to a common total induce spurious negative correlation is Pearson's, of 1897; Aitchison says so, and founds the methodology that addresses it.

[2] "Musical psychometric notation: the notation system," MPN-2, `08_PAPERS/MPN-2-notation.md`, section 3.6. Cited for the neo-Riemannian transition algebra in full, including the group properties, the LR chain, the Cayley diameter of five, the hexatonic pole, the non-uniqueness of shortest words and both implementation errors with file and line; and separately for the dead band on the harmonic coordinate. That series addresses a different application and its state vector is not the nine-component state, but the group theory is not application-specific and was written there first.

[3] "Commensurability audit," MPN-AUDIT-01, `08_PAPERS/COMMENSURABILITY-AUDIT.md`, 12 September 2026. Thirty-four weighted combinations: six degenerate, eight misleading, one agreeing, nineteen undetermined; and six quantities with irreconcilable definitions.

[4] "Determinism, and the end of fabricated state," MPN-PATCH-01, `08_PAPERS/SEEDING-PATCH-NOTE.md`, revision 2, 13 September 2026.

[5] R. Cohn, "Neo-Riemannian operations, parsimonious trichords, and their Tonnetz representations," *Journal of Music Theory*, vol. 41, no. 1, pp. 1-66, 1997. Cited through [2].

[6] D. Lewin, *Generalized Musical Intervals and Transformations*, Yale University Press, 1987. Cited through [2].

[7] A. S. Crans, T. M. Fiore and R. Satyendra, "Musical actions of dihedral groups," *American Mathematical Monthly*, vol. 116, no. 6, pp. 479-495, 2009. Cited through [2].

[8] "Musical psychometric notation: foundations," MPN-1, `08_PAPERS/MPN-1-foundations.md`, correction 12. Cited for the statement that the affective reading of the PLR operators is a convention without experimental evidence.

[9] R. Cohn, "Maximally smooth cycles, hexatonic systems, and the analysis of late-Romantic triadic progressions," *Music Analysis*, vol. 15, no. 1, pp. 9-40, 1996. Cited through [2] for the hexatonic pole.

[10] K. Friston, "The free-energy principle: a unified brain theory?", *Nature Reviews Neuroscience*, vol. 11, pp. 127-138, 2010. Cited for the variational quantity this corpus renames the surprise bound, and for nothing else; the theory contains no generative model and claims no result from this literature.

[11] M. Scheffer et al., "Early-warning signals for critical transitions," *Nature*, vol. 461, pp. 53-59, 2009.

[12] V. Dakos et al., "Methods for detecting early warnings of critical transitions in time series," *PLoS ONE*, vol. 7, no. 7, e41010, 2012.

[13] R. Thom, *Structural Stability and Morphogenesis*, W. A. Benjamin, 1975. Cited for the cusp normal form. The corpus bibliography gives the author as "R. Thorn"; the name is Thom.

[14] E. Ising, "Beitrag zur Theorie des Ferromagnetismus," *Zeitschrift fur Physik*, vol. 31, pp. 253-258, 1925.

[15] M. Granovetter, "Threshold models of collective behavior," *American Journal of Sociology*, vol. 83, no. 6, pp. 1420-1443, 1978.

[16] J. McKenney, "The McKenney-Lacan psychometric calculus: a theory of musical representation for psychological state," MPN-S1, `08_PAPERS/S1-mckenney-lacan-theory.md`, revision 3.

[17] J. McKenney, "The McKenney assertions: a register for examination," `08_PAPERS/ASSERTIONS-REGISTER.md`.

[18] "Decision log, 12 September 2026," MPN-DECISIONS-01, `08_PAPERS/DECISION-LOG-2026-09-12.md`. Decisions 1, 2, 3 and 6 are implemented in this paper; decision 4 constrains section 6.5.

[19] D. Temperley and D. Tan, "Emotional connotations of diatonic modes," *Music Perception*, vol. 30, no. 3, pp. 237-257, 2013. Cited only for the fact that the published listener ordering of the modes is not monotone in brightness, so an argument from brightness alone cannot predict how a mode change will be heard.

[20] "Block A arbitration," `08_PAPERS/ARBITRATION-S1.md`. Cited for the Constraint Guardian's observation that three magnitudes summing to a constant have a singular correlation matrix, that equicorrelation at $-1/2$ is the boundary of the positive semi-definite cone, and that the test must ask whether the registers are negatively coupled at all against a null of independence.

[21] "A8 decision memo," `08_PAPERS/A8-DECISION-MEMO.md`, revision 3. Cited for the identity of section 5.1 and for the figure 0.8376.

[22] "Musical psychometric notation: foundations," MPN-1, `08_PAPERS/MPN-1-foundations.md`, at `:234`, which states the requirement as item (d) of a numbered list: "For early-warning signals, rolling-window autocorrelation and variance with detrending and surrogate-data significance tests", with the method set out at `:215`. **The requirement is MPN-1's and not MPN-3's.** An earlier revision of this line put MPN-3 first; `MPN-3-engine.md` contains no occurrence of detrend, surrogate or autocorrelation, and its only early-warning sentence is E-21 at `:226`, that early-warning observables must be rendered as text annotations and must not be sonified, which is a different requirement and is not what is cited here.

[23] "Constraint Guardian review of S1," `08_PAPERS/REVIEW-S1-constraints.md`. Cited for the annotation instrument's cost and gating, for the recommended split of A1 into frame-level and character-level assertions, and for the distinction between principal and independent component analysis in the reduction.

[24] "Commensurability, scalarisation and the second dimension," MPN-NOTE-01, `08_PAPERS/COMMENSURABILITY-NOTE.md`. Cited for the rotated state plane whose second axis section 7.4 proposes as the order parameter.

[25] "What S2 puts to the author," MPN-S2-DECISIONS, `08_PAPERS/MPN-S2-DECISIONS.md`. Five decisions, ten actions, and replacement text for the five assertions register entries this paper changes.

[26] "What the corpus supplies to S2, and who wrote it," MPN-NOTE-02, `08_PAPERS/MPN-NOTE-02-corpus-provenance.md`. The source pass behind section 2, with its counts reproduced by `s2_census.py`.

[27] "Register and audit amendments arising from S3," MPN-S3-AMENDMENTS, `08_PAPERS/MPN-S3-AMENDMENTS.md`. Section 3 carries the parser defect, the three misread annotations, the corrected counts and the replacement text this paper's post-acceptance correction applies.

Every figure in this paper is produced by `05_DATA/03_generators/s2_verify.py` (the simplex correlations, the scalarisation identity, the group verification), `s2_verify2.py` (the bound table and the frame statistics), `s2_verify3.py` (the closed forms and the lag-1 identity), `s2_rsi.py` (the register instrument over the 232 frames) and `s2_census.py` (the corpus counts of section 2 and the clip counts of section 5.3). Group-theoretic statements attributed to [2] are verified by `s2_verify.py` over all 24 triads and are cited rather than claimed. The figure is `s2-figure-simplex.svg`, generated by `make_simplex_figure.py`, which reads its ten triples from `s2_verify2.py` rather than carrying them as literals, so the picture cannot drift from the instrument.
