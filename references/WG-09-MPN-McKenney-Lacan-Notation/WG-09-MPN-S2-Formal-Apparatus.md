# The Formal Apparatus of the McKenney-Lacan Psychometric Calculus: State Space, Simplex, Scalarisation, and the Dynamics the Theory Is Building

**J. McKenney.** Licensed CC BY 4.0. 15 September 2026.

*Paper 2 of the music and score path of the McKenney-Lacan series. S1 states the theory; this paper states the mathematics of the theory's claims; S3 gives the mapping from state to musical material; S4 audits the reference implementation.*

## Executive Abstract

A theory of musical representation for psychological state proposes that a dramatic character's condition can be carried by nine bounded numbers, that three of those numbers compete on a simplex, and that a total, deterministic, decomposable function carries the state to musical material. This paper asks what that construction is, mathematically, and what it supports.

Four findings follow from the construction alone and need no data:

- **The state space has eight dimensions, carried in nine named coordinates.** The simplex constraint $r+s+i=1$ removes one degree of freedom. Nine numbers are coordinates; eight are dimensions. Any covariance estimate over the nine is singular by construction.
- **The simplex constraint manufactures the negative correlation that is offered as evidence of competition between the three registers.** Lemma 1 shows that three quantities summing to one trade against one another, on average, exactly and distribution-free. Section 4.2 therefore restates the test the theory proposes, in the two-part form that answers the question A3 is asking.
- **The simplex and the Borromean link are incompatible formalisations of the same three registers.** A Borromean link is Brunnian: every pairwise linking number is zero. On the simplex, pairwise independence of the registers is possible only for a point mass. The theory must choose between two things it takes from Lacan.
- **The shipped register instrument returns the triple $(0,0,0)$, which lies off the state space, on 44.8 per cent of the frames the corpus has**, and four components of the system then disagree, in four different ways, about what to do with it.

Four results are proved: a distribution-free identity on the simplex covariances (Lemma 1); the exact discontinuity set of the dominant-register map, a tripod rather than the three full medians, with the closed-form measure $2d - d^2$ of the states within $d$ of it (Lemma 2); a closed-form positive lower bound on the correlation of two positively weighted scalarisations of the same two variables (Theorem 1); and an exact identity for the sample lag-1 autocorrelation showing that the undetrended early-warning indicator is uninformative on any series carrying a trend (Theorem 2). The transformation is given an explicit codomain, together with the property it satisfies, piecewise continuity with a declared jump set, and the first identifiability bound on what a listener could in principle recover from a cue.

One distinction runs through the paper and is the most useful thing it can tell a reader. Every theorem here is a theorem about a construction and holds whether or not the construction describes anything. The theory's assertions about what a listener hears are a separate matter, and section 10 says explicitly which results fall on which side of that line.

## Abstract

This paper states the mathematics of the McKenney-Lacan psychometric calculus. It establishes that the state space is $\mathcal{P} = [0,1]^6 \times \Delta^2$ of dimension eight rather than nine; that the scale type of the coordinates must be declared as interval before any weighted sum is licensed; that the simplex constraint forces the covariance identity $\operatorname{Cov}(r,s) + \operatorname{Cov}(s,i) + \operatorname{Cov}(r,i) = -\tfrac12(\operatorname{Var}(r)+\operatorname{Var}(s)+\operatorname{Var}(i))$, so that negative correlation among the registers is arithmetic rather than evidence; that the dominant-register map is discontinuous exactly on a tripod joining the barycentre to the three edge midpoints, with $P(\text{gap} < d) = 2d - d^2$ under the uniform distribution; and that the simplex and the Borromean link are incompatible formalisations of the registers, since pairwise independence on the simplex holds only for a point mass.

On scalarisation, an exact correlation identity is given for two linear functionals of the same state sub-vector, and Theorem 1 bounds the correlation of two positively weighted scalarisations below by $\sin(2\arctan(\varepsilon/(1-\varepsilon))) > 0$ when every weight is at least $\varepsilon$, so that the collinearity of the shipped pair was bounded away from zero by its definition before any corpus existed. The transformation $\Phi$ is given an explicit codomain, and the continuity property it can satisfy is fixed as piecewise continuity with a declared jump set; three of the four jump sets are identified. An identifiability bound of at most 4,032 distinguishable frames, about twelve bits, is derived, together with the finding that on the composer path as shipped the recoverable state is one-dimensional. Theorem 2 gives an exact identity for the sample lag-1 autocorrelation which shows that the undetrended early-warning indicator returns a high value on any trended series, so that a monotone quantity such as trauma reports a near-unit value at every frame of every play, calm or not.

A register instrument audit over all 232 frames of the play library finds 104 frames, 44.8 per cent, returning the triple $(0,0,0)$, which lies off the simplex; of the 128 that do land, 101 are at a vertex and 21 are exactly on a tie, so that the mode selector is either trivially or arbitrarily determined on 97.4 per cent of frames. The dynamics apparatus is developed as far as the present apparatus reaches, and the development establishes that three of its seven pieces wait on one object, an evolution equation, and that writing it is the largest theoretical commitment outstanding in the programme.

The results of sections 3 to 8 that are theorems about the construction are unaffected by any listening result, now or ever. The theory's assertions about what a listener hears are of the other kind, and the listening study is what tests them. Section 10 states which is which.

---

## 1. Introduction

### 1.1 What this paper does

S1 states a theory [16]: that a character's psychological state can be carried by nine bounded numbers, that three of them compete on a simplex, and that a total, deterministic, decomposable function carries the state to musical material. This paper states the mathematics of those claims. It asks what kind of object the state space is, what the simplex constraint entails, what a weighted sum of state coordinates does, what the transformation is as a mathematical object, and what the theory needs in order to say that its state moves.

The paper is addressed to a reader who wants to know whether the formal apparatus holds. Where it holds, the paper proves it. Where it fails, the paper says exactly what fails and what repairs it. Where a question is open, the paper says that it is open and names what settles it.

### 1.2 Four findings

Four findings bear on what the theory may assert.

**The state space has eight dimensions, carried in the nine coordinates A1 names.** The simplex constraint removes a degree of freedom, so the nine numbers are coordinates and one of them is redundant. Section 3.1.

**The simplex constraint manufactures the negative correlation A3 offers as evidence of competition**, so section 4.2 restates the test A3 names in the form that answers its question. Section 4.2.

**The simplex and the Borromean link are incompatible formalisations of the same three registers**, and the theory must choose between two things S1 takes from Lacan. Section 4.5.

**The shipped register instrument returns the triple $(0,0,0)$, which lies off the state space, on 44.8 per cent of the frames the corpus has**, where four components of the system then disagree about what to do with it. Section 4.4.

Section 10 sets out the five questions these put to the reader and to the theory.

### 1.3 What is new, and what is sharpened

What is new in this paper is stated exactly, so that it can be told apart from what the corpus already held.

**New.** Theorem 1, a closed-form lower bound on the correlation of two positively weighted scalarisations of the same two variables, which makes the A8 collinearity computable from the weights before any corpus exists. Section 4.5, the simplex against the Borromean link. Section 4.4, the register instrument audit. Section 6.4, the first identifiability bound on the mapping.

**Sharpened, not new.** That three magnitudes summing to a constant have a singular correlation matrix, with the strength of their mutual negative correlation bounded by arithmetic, is already established in the corpus [20], and it has already amended S1's section 10; what Lemma 1 adds is an exact distribution-free form. That the correlation of two linear combinations is an identity fixed by the weights and the two dispersions alone is the central point of the A8 memo [21], including the figure 0.8376. That trauma ratchets is S1's own. That the state space has eight dimensions is an observation, not a theorem.

### 1.4 Scope

This is a paper about form. The modal table is S3's business and the author's, and this paper leaves the musical claims where it finds them. It does amend five assertions of the register [17], and the replacement text is carried in a companion artefact [25] so that the register can be updated from a document rather than from a reading of this prose.

### 1.5 A note on the standing of the quantities

The quantity this paper calls trauma is a dramatic quantity, defined in S1 as the difference between a character in the first scene and the same character after the event the play is about. The instrument discussed in sections 3.2 and 4.2 annotates dramatic texts: its raters are annotators and its subjects are characters. A paper addressed to music therapists is one the series takes up later, and S1 records what such a paper would owe. The question in section 7.3, whether trauma should be allowed to resolve, is a question about dramatic form.

### 1.6 What governs the reading below

This is a theory paper, offered for review and improvement. The listening study described in MPN-S3 is how its open empirical questions get settled, and the corpus as it stands is the system's own output for trauma, entropy and the registers.

That is stated here, before the mathematics, because it governs how the mathematics should be read. Lemma 1, Lemma 2, Theorem 1 and Theorem 2 are theorems about a construction. They would hold if no play had ever been scored, and they stand independently of any listening result. Everything in this paper that concerns what a listener hears, what a mode connotes, or whether a character's state is the state the theory says it is, is settled by the listening study. Section 10 separates the two classes explicitly and lists what the programme builds in order to carry a claim of the second kind into evidence.

---

## 2. The material the apparatus can be built on

The plan for this paper named its sources: ten mathematical primers and a set of core theory chapters. A source pass over that material, read end to end, established what each source supplies, and the detail is in a companion note [26]. In summary: the ten primers are competent statements of standard mathematics carrying an author field of the form "AEON Research Division (Agent 1 - The Tensor)", and what they supply is that standard mathematics rather than the nine-component state, the registers as magnitudes, the transformation or any musical object. Twenty-one of the twenty-two core chapters are signed by named AEON swarms; they state the transverse-field Ising Hamiltonian, the Langevin equation, Granovetter's rule and the early-warning indicators correctly, and the mapping from a component of the state into a variable of any of those models is the piece this series supplies. The sixty-one files of the unified-theory directory are built on a six-component vector distinct from the nine-component state, and one of their stated axioms inverts a standard result: `01_Foundations.md:195` asserts that collective entropy exceeds the sum of individual entropies, where subadditivity gives the reverse inequality.

That material stands beside this series and remains useful as vocabulary; this theory's foundation is the narrower set named next, and the vocabulary should be cited as vocabulary.

What this paper can build on is narrower and it is enough: the state definition and the simplex constraint from S1; the scalarisation algebra the A8 amendment turns on; the neo-Riemannian group as a codomain for the harmonic operator, which the sister series has already set out in full [2]; and a collection of named dynamical models, correctly stated somewhere in the corpus and awaiting attachment. Section 7 develops that last collection as apparatus, including where it is only partly useful [18], on the view that an apparatus whose attachment conditions are written down is more useful than one whose availability is merely asserted.

---

## 3. The state space

### 3.1 It has eight dimensions

S1 gives the state as

$$\vec{p} = (\tau,\; H,\; r,\; s,\; i,\; D,\; I_d,\; S_d,\; C) \in [0,1]^9$$

and A1 asserts that the state is nine-dimensional. The simplex constraint $r + s + i = 1$ removes one degree of freedom, so the state space is

$$\mathcal{P} = [0,1]^6 \times \Delta^2, \qquad \Delta^2 = \{(r,s,i) \in [0,1]^3 : r+s+i=1\},$$

and $\dim \mathcal{P} = 6 + 2 = 8$. The nine numbers are coordinates, not dimensions, and one is redundant.

Three consequences matter. Any covariance estimate over the nine coordinates is singular, because the three register columns are linearly dependent by construction, so a routine that inverts it fails or silently returns a generalised inverse. Any volume or density computed as though the space were a nine-cube is wrong, since $\mathcal{P}$ has zero nine-dimensional measure. And any protocol that asks a rater for nine independent judgements is asking for one too many; what it should ask for instead is the first of the open questions in section 10.

A1 should read that the state has eight degrees of freedom carried in nine named coordinates, with the ninth fixed by the constraint. That restatement is compatible with the split the S1 constraint review recommends on cost grounds, and the two apply together: assert the five frame-level components as A1, testable inside the annotation pass at no marginal cost, and carry the four DISC coordinates as a separate character-level assertion with its own instrument [23]. Applied together the two give A1 five frame-level coordinates carrying four degrees of freedom, with DISC's four asserted separately. A1's failure condition needs amending too, since it is now analytically satisfied for one coordinate; the replacement text is in [25].

### 3.2 The scale, which the theory must declare

Each coordinate is bounded to the unit interval. The bound is a normalisation, and the unit it carries is fixed by the declaration below: what a trauma of 0.6 is 0.6 of is settled by the endpoint anchors of the elicitation instrument.

The scale type has to be declared before section 5 is licensed, because on an ordinal scale the admissible transformations are all strictly increasing maps, and a monotone recoding of $H$ changes the value of $0.6H + 0.4\tau$; invariance under the admissible group is what licenses a weighted sum.

**Declaration.** The state coordinates are treated as interval-scaled, with unit and origin fixed by the endpoint anchors of the elicitation instrument: 0 is the anchor for the absence of the quantity and 1 the anchor for its dramatic maximum. The admissible transformation group is the positive affine group $x \mapsto ax + b$ with $a > 0$, and every formula must be invariant under it up to a corresponding change in its own output scale. Weighted sums are invariant in that sense; products, powers and quotients carry the origins with them, because the product of two interval-scaled quantities depends on both. The cost is that the endpoint anchors are written into the codebook and held fixed across annotators, which is what makes the scale interval and licenses section 5. Until the instrument is built this is a commitment rather than a fact. It is new theory and it belongs in S1 section 4.1 and in A1's formal content as well as forward in this series [25]. Section 7.4 is where the products bite.

Trauma carries a further property S1 states and section 7.3 takes up: it accumulates and ratchets, so along a trajectory $\tau_{t+1} \ge \tau_t$. That is the constraint on the state's motion the theory currently carries.

---

## 4. The simplex

### 4.1 What kind of object it is

$\Delta^2$ is a two-dimensional convex polytope, a filled triangle. Its three vertices are the pure registers, its three edges are the states in which one register falls to zero, its interior is the states in which all three are present, and its barycentre is perfect balance. The coordinates are barycentric and they are what a competition between three exhaustive alternatives looks like written down.

Distances on it follow from a choice of geometry. Compositional data have a natural geometry in which the meaningful quantity is a ratio rather than a difference, so that moving from $(0.01, 0.98, 0.01)$ to $(0.02, 0.96, 0.02)$ is a larger change than moving from $(0.33, 0.34, 0.33)$ to $(0.34, 0.33, 0.33)$, although the Euclidean distances are comparable [1]. Whether that is the right geometry has a musical answer: it asks whether doubling a small Imaginary investment is a bigger event than nudging a balanced one. The choice becomes forced the moment a parameter is made a function of how far the registers moved, which is the point at which S3 records the geometry it assumes.

### 4.2 The constraint manufactures the competition

A3 asserts that the registers compete, and offers the constraint as the encoding: investment in fantasy is bought at the cost of investment in rule. The natural test is to elicit the three magnitudes and look for negative correlations, and that test works in the two-part form set out below.

**Lemma 1.** Let $r, s, i$ have finite second moments and satisfy $r+s+i=1$ almost surely. Then

$$\operatorname{Cov}(r,s) + \operatorname{Cov}(s,i) + \operatorname{Cov}(r,i) = -\tfrac{1}{2}\big(\operatorname{Var}(r) + \operatorname{Var}(s) + \operatorname{Var}(i)\big).$$

*Proof.* The sum is constant, so $\operatorname{Var}(r+s+i)=0$. Expanding and rearranging gives the result. $\square$

In plain terms: three quantities that must add to one trade against one another, so on average they move in opposite directions, and exactly how far is fixed by arithmetic rather than by anything about registers.

The lemma holds for every distribution on the simplex and is exact. At least one covariance is negative, and if the three variances are equal the three correlations average exactly $-1/2$. Closed forms confirm it without simulation: for a Dirichlet with parameters $\alpha$, $\operatorname{corr}(i,j) = -\sqrt{\alpha_i\alpha_j / ((\alpha_0-\alpha_i)(\alpha_0-\alpha_j))}$, exactly $-1/2$ on every pair in the uniform case, and $-0.8133$, $-0.1111$, $-0.4880$ for a lopsided $\alpha = (5, 1, 0.4)$, quite unequal, with the covariance sum still exactly $-1/2$ of the variance sum.

Negative correlation among the registers is therefore a theorem about anything summing to one, holding equally of budget shares, vote shares and mineral proportions, and evidence of competition has to come from the unconstrained ratings described below. The observation is Pearson's and it is the problem compositional data analysis exists to solve [1]. The same conclusion is reached in the corpus from the correlation matrix of the constrained triple, and has already amended S1's section 10 accordingly [20].

**What the test must therefore be.** It has two parts and both are needed. Rate the three registers on unconstrained anchored scales, in the cube, and test the raw correlation matrix against a null of independence; that is the question A3 is actually asking, and zero is the right null for it. Then renormalise the same ratings to the simplex and compare the resulting correlations with the compositional baseline Lemma 1 forces, to see how much of the constraint's negative coupling is arithmetic and how much survived the raw ratings. A study that reports only the second is reporting Lemma 1.

What the first part asks is settled and it is narrower than A3's wording suggests: whether the three registers are negatively coupled at all against a null of independence, on unconstrained ratings whose correlation matrix is non-singular. Strong mutual negative correlation on the constrained triple is close to arithmetically excluded, which is why the question takes the narrower form [20].

The shipped instrument sharpens the point, because it creates the constraint out of data that arrives without it. The analyser counts keyword hits in three families and divides each by their total. Three independent and exchangeable counts have zero correlation before the division; after it, symmetry makes the three pairwise correlations equal and Lemma 1 then forces each to be exactly $-1/2$. Simulation over four hundred thousand draws returns $-0.502$, $-0.498$ and $-0.499$, which is the check rather than the figure. The competition A3 asserts appears at the moment of division.

### 4.3 The dominant register map is discontinuous, and the mode flickers

A4 selects the mode from $\arg\max(r,s,i)$.

**Lemma 2.** The map $\arg\max : \Delta^2 \to \{r,s,i\}$ is discontinuous precisely on the three segments joining the barycentre to the three edge midpoints, a tripod, and every neighbourhood of a point of that set contains points assigned to two different registers.

*Proof.* The map is discontinuous exactly where two coordinates are equal and at least as large as the third. Two coordinates being equal defines a full median of the triangle, but on the half of that median running from the barycentre to the opposite vertex the third coordinate is strictly the largest and the map is locally constant there. The discontinuity set is therefore the other half of each median, from the barycentre to the edge midpoint. On either side of such a segment the maximising index differs, and both regions are open with the segment in their closure. $\square$

The tripod, and not the three full medians, is the discontinuity set, and the difference is worth stating because the wrong version is the natural one to reach for. On the full-median statement the point $(0.2, 0.2, 0.6)$ would be a discontinuity, since its first two coordinates are equal; but the third coordinate is the unique maximum there and the map is continuous in a neighbourhood of it. Half of each median is a locus of ties between the two smaller coordinates, which the third coordinate decides.

The measure of the states near the tripod has a closed form. For $(r,s,i)$ uniform on $\Delta^2$, the set where a given coordinate exceeds both others by at least $d$ is a kite with vertices at that coordinate's vertex, the two points where it leads by exactly $d$ on each edge, and the point where all three are within $d$; each kite has area fraction $(1-d)^2/3$, and the three are disjoint, so

$$P(\text{gap} \ge d) = (1-d)^2, \qquad P(\text{gap} < d) = 2d - d^2,$$

giving $0.0975$ at $d = 0.05$ and $0.1900$ at $d = 0.10$. The derivative at zero is 2, so the measure vanishes linearly rather than quadratically: on the uniform distribution one state in ten sits within a tenth of a mode change, and every one of those is a place where a rater moving one point on a scale changes the key.

Musically this is mode flicker. A character whose registers are nearly balanced, which is the ordinary condition of being pulled three ways, has their mode reassigned by an arbitrarily small change in the text, and Phrygian to Ionian is a different scale rather than a shading; since the published listener ordering of the modes departs from the brightness ordering [19], predicting how the substitution is heard takes an argument that goes beyond brightness.

Three remedies exist: hysteresis, a dead band, and interpolation between the two modes' characteristic alterations. The first two make $f_{\text{mode}}$ a function of the current and previous state, which costs the decomposability A11 asserts; the third is a musical proposal rather than a patch, because interpolating between two modes that differ in one degree means bending that degree, and a composer can hear that. Section 4.4 narrows the choice, and section 10 carries what is left of it. The sister series met the same difficulty on its own rounding boundaries and put a dead band of 0.02 on them [2]; specifying the behaviour inside the band is the part that remains, and it is the part that decides what a listener hears.

These figures are computed on the uniform distribution. The distribution the system realises is concentrated at the extremes, as section 4.4 shows.

### 4.4 What the instrument produces: a value off the state space on 44.8 per cent of frames

The figures here come from running the shipped `analyzeRSI` (`psychometric_calculus.ts:236-250` at the pinned commit) over the analysis text of all 232 frames of the play library, reimplemented exactly, including its substring matching and its presence-not-count rule.

Of the 232 frames, **104, or 44.8 per cent, return $(0,0,0)$**. That triple lies off the simplex: it sums to zero, and its three entries are equal.

This paper first reported 107 and instructed that the commensurability audit's 104 be corrected to match it [3]. That instruction was backwards and is withdrawn: the audit was right and this paper was wrong. The figure 107 came from a parser that matched the annotation field with a pattern stopping at the first quote character and reading backslash escapes literally, which truncated seven of the 232 annotations and removed the only register keyword from three of them, so the analyser was handed a short string and returned $(0,0,0)$ where it should have returned a triple. The defect and its corrected figures are recorded in the S3 amendments [27], and `s3_frames.py` is now the single reader of the library and asserts its own record count against the annotation count, so that a parser dropping records fails rather than reports. The four proofs, the tie count of 21 and every argument in this paper stand independently of the figures that moved.

Four consumers then do four different things with the degenerate triple, and only three of them are tie-breaks. `rsiToMode` (`psychometric_calculus.ts:191-198`) initialises its dominant register to Symbolic and guards with strict inequalities, so it returns the Symbolic. `getModalTransformation` (`leitmotif_transformation_rules.ts:67-76`) sorts and returns the Real. `getDominantRegister` (`psychometric_instrument_mapper.ts:183-187`) falls through to the Imaginary. And the key selector (`psychometric_calculus.ts:348-351`) is a threshold at 0.6 on a register magnitude rather than a tie-break; on the realised distribution it clears at a vertex and there alone, so the key is a function of the registers on 101 of 232 frames and constant on the other 131.

What comes out on those frames is worth stating in musical terms, because the disagreement is audible. The key is set from one resolution of the degenerate triple, the modal transformation applied to the pitches from a second, and the mode written into the notation from a fourth quantity computed from trauma and entropy, as section 6.5 sets out. A degenerate frame still produces a cue, and that cue is internally consistent by coincidence, since its key, its pitches and its written mode come from three different resolutions of one triple. The first of the three repairs below is what puts a register behind the cue.

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

The per-triple counts in that table are the ones recorded before the parser correction, and they sum to 125 rather than 128. The three frames the correction restores are vertex frames, which is why the vertex total is 101 against the 98 the three vertex rows give; which vertex each of the three belongs to is in [27].

Counting the degenerate frames, the register triple is degenerate, pure or tied on 226 of 232 frames, 97.4 per cent. The figure `s2-figure-simplex.svg` draws it: the triangle, the tripod on which the mode is decided by tie-break, and the ten realised triples sized by frame count.

This reframes section 4.3 rather than confirming it. Under the uniform distribution the worry is that a tenth of states sit near a discontinuity. Under the realised distribution the mass sits at the extremes: 78 per cent at a vertex, maximally far from any boundary, and 17 per cent exactly on a boundary, where the mode is decided by insertion order in a dictionary. **The theory's mode selector, on the corpus the theory has, is trivially determined on 78 per cent of frames and decided by tie-break on 17 per cent, and it is decided by a margin on the remaining 5 per cent.**

It also settles part of the choice section 4.3 left open. Hysteresis and a dead band are both defined by a gap; on an exact tie the gap is zero, so each holds whatever value it was last given, and on a scene's first frame each needs a prior register supplied to it. Of the three remedies interpolation is the one that returns a determinate value on a tie, and ties are 17 per cent of the frames that reach the simplex at all. S3 still chooses, but against a narrower set than section 4.3 offered.

Three repairs follow and all three are uncontentious: the analyser should return an explicit unresolved result on text with zero keyword hits, with a declared path for the four consumers to take on it; the keyword match should be on word boundaries rather than substrings, since at present "king" fires inside "knocking", "masking" and "ticking", and "self" inside "himself"; and the presence-not-count rule, which is why every fraction is a unit fraction, is either a design choice about salience or a defect, and stating which of the two it is stands as an action in [25].

The three keywords that fire most often across the library are "real" with 29 hits, "symbolic" with 25 and "death" with 17, so the instrument's most reliable signal is the analyst's own Lacanian vocabulary read back out of the analyst's own commentary. These are figures about a keyword counter. All 232 triples are that counter's output, and the elicitation study of section 10 is what reports the values a human annotator returns.

### 4.5 The simplex and the Borromean link are incompatible

S1 names two things the theory takes from Lacan: the tripartite division, and the topological insistence that the three registers are interdependent in the way a Borromean link is, so that cutting any one ring frees all three [16]. The theory then formalises the registers on a simplex. Those are two formalisations of the same object and they disagree.

The defining property of a Borromean link is that it is Brunnian: **every pairwise linking number is zero**, and what is non-zero is the triple invariant. Read as a claim about dependence, which is how the corpus reads it, the figure says that each pair of registers is free and that the three together are bound.

Lemma 1 says the opposite. On the simplex the three covariances sum to $-1/2$ of the sum of the variances, so pairwise coupling is forced: three zero covariances would drive the three variances to sum to zero, leaving every register constant. **The only distribution on the simplex with pairwise-independent registers is a point mass.** A subject whose registers vary at all has pairwise-coupled registers, by construction.

So the theory chooses one of the two. The simplex encodes exhaustive pairwise competition; the link encodes pairwise freedom with collective dependence. Choosing the simplex, which the theory has done in every formula it has written, makes the Borromean figure a picture in the prose, and S1 should say so where it cites the figure. Choosing the link means leaving the constraint and working in the cube with a three-way interaction term, which is a different and considerably harder theory, and one whose musical mapping would have to be written from the start.

The choice reaches further than S1's prose, because the corpus computes a quantity named for the link. The Borromean stability index has four incompatible definitions in the implementation [3], it is an input to the composite stability score, and on the only path that score has it contributes a constant, because the register triple it reads is hard-coded. A quantity named for a figure the formalism sets aside, computed four ways, carrying a published weight of sixty per cent while holding constant, needs addressing whichever way the choice goes. Section 7.1 names it; section 10 states it as the first of the open questions.

---

## 5. Scalarisation, and the limits of weighted sums

### 5.1 The identity

Several quantities in the theory are a weighted sum of two state coordinates used to select a level: fragmentation and orchestration density in A7 and A8, and the quantity the code calls a Lyapunov exponent. For two linear functionals on a state sub-vector $x$ with covariance $\Sigma$,

$$\operatorname{corr}(a^{\mathsf T}x,\; b^{\mathsf T}x) \;=\; \frac{a^{\mathsf T}\Sigma b}{\sqrt{(a^{\mathsf T}\Sigma a)(b^{\mathsf T}\Sigma b)}}.$$

In plain terms: if two quantities are both built by mixing the same two ingredients in similar proportions, they must move together, and how tightly is fixed by the recipe rather than by the data. The A8 memo makes this point and draws the right conclusion, that the correlation is fixed by the weights and the two dispersions alone, whichever plays supplied the numbers, whatever produced them and however many frames there are [21].

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

The practical reading is what makes the theorem worth having. The shipped pair gave every weight at least 0.3, so **its correlation stood at $+0.7241$ or above whatever any corpus contained**. The collinearity S1 reports at $+0.9150$ is an identity once the dispersions are known, and it was bounded away from zero by the two lines of the definition, before any dispersion was measured and before a frame was scored.

**Corollary.** Any two quantities in the theory that are strictly increasing in both trauma and entropy are yoked: turning one turns the other. A theory that wants two knobs accepts that yoking, gives one knob a minus sign, or takes the second quantity out of the plane. The theory has taken the minus sign, and section 5.3 is what it looks like.

### 5.3 The adopted form, geometrically

The A8 amendment S1 adopts is the orthogonal complement construction:

$$\text{density} = 0.3H + 0.7\tau, \qquad \text{fragmentation} = \frac{\max(0,\; 0.7H - 0.3\tau)}{0.7}.$$

Density keeps the weight vector $(0.3, 0.7)$, whose effective split at the library dispersions is 24.8 per cent entropy to 75.2 per cent trauma; fragmentation takes, before clipping and scaling, the vector $(0.7, -0.3)$, whose effective split is 64.3 to 35.7 [3]. Geometrically the second is the first rotated by a quarter turn.

At equal dispersion with uncorrelated inputs their correlation is exactly zero. At the library's dispersions with uncorrelated inputs it is $-0.1869$, and at the library's input correlation of $+0.2802$ it is $+0.0031$. S1 reports $+0.0571$ on the library itself; the difference is the clip, which binds on 21 of the 232 frames and binds strictly on 20, and which breaks the exact orthogonality where weight exceeds disorder. The theory should say that the orthogonality is exact away from the clip and approximate at the floor, rather than quoting one correlation as a property of the pair; A8's replacement text is in [25].

The geometric content is that weight and disorder become the two axes of a rotated frame, and the musical claim, that a burdened but ordered subject sounds thick and whole while an unburdened but scattered subject sounds thin and broken, is exactly the statement that those are the two axes.

### 5.4 Nominal weights and effective weights

A weight buys influence in proportion to the product of the weight and the dispersion of the variable it multiplies. Coefficients of 0.6 and 0.4 on variables of dispersion 0.1925 and 0.2496 split influence 53.6 to 46.4 rather than 60 to 40; the density pair, nominally 30 to 70, splits 24.8 to 75.2.

The audit over the whole corpus found thirty-four weighted combinations. Six are degenerate, with one input holding constant; eight are misleading, the nominal and effective splits differing once both dispersions are measured; one agrees; and **nineteen are undetermined, and measuring the dispersions of the quantities they weight is what determines them** [3].

The nineteen are the important number. Each is closed by measurement rather than by argument: each needs the dispersion of its inputs measured on a corpus, and for most of them that corpus is still to be assembled. Three of the nineteen are the indices on which the sister series' deployment papers rest, which means those papers quote weights whose effective split is still to be measured. The minimum step is to list the nineteen with the data each would need, and to mark the three so that the deployment papers can carry the qualification until the measurement is made [25]. It is the largest item in this paper still to be scoped.

Following S1, every coefficient in S2, S3 and S4 appears with its effective contribution beside it, and any table of weights carries the dispersions it was computed against.

---

## 6. The transformation as a mathematical object

### 6.1 The codomain, defined

S1 writes $\Phi : \mathcal{P} \to \mathcal{M}$, and this paper supplies $\mathcal{M}$, because most of its components are categorical and the difference governs what can be asked of $\Phi$. Taking S1's own list, and the eight-marking form of the dynamics, which is normative for this series [18]:

$$\mathcal{M} = \underbrace{[t_{\min}, t_{\max}]}_{\text{tempo}} \times \underbrace{D_8}_{\text{dynamics}} \times \underbrace{M_7}_{\text{mode}} \times \underbrace{T}_{\text{timbre}} \times \underbrace{\mathcal{T}_{24}}_{\text{harmony}}$$

with $D_8$ the eight conventional dynamic markings, $M_7$ the seven diatonic modes, $T$ the timbre space, which S3 specifies, and $\mathcal{T}_{24}$ the 24 consonant triads. Note that $v(\tau) = 20 + 107\tau$ is the intermediate quantity and the marking is what $\Phi$ emits, so the velocity interval $[20,127]$ is the pre-image and not the output.

**The continuity property.** Four of the five factors are discrete, so the property available to $\Phi$ is piecewise continuity. The property this paper adopts, and to which S3 and S4 are held, is **piecewise continuity with a declared jump set**: each component must be continuous on the interior of each cell of a stated partition of $\mathcal{P}$, and the partition must be written down.

Three of the four jump sets are known. The mode's is the tripod of Lemma 2. Tempo's is the band boundaries of `entropyToRhythm`, which steps at $H = 0.4$ and $H = 0.7$, so tempo is a stepped factor as well and the interval above describes its range rather than its behaviour. The dynamics jump set is the eight marking boundaries [18]. The harmonic jump set is every state change that moves the chain position. S3 owes the partition for timbre, and that one completes the set.

The harmonic factor has the useful structure and the sister series is where it is developed: the sister series sets out the neo-Riemannian transition algebra in full, and independent verification over all 24 triads confirms every group-theoretic statement in it [2], [5], [6], [7], [9]. What this paper adds is why it matters to $\mathcal{M}$. The Cayley graph distance is a genuine metric on the 24 triads, the only thing in the theory that makes "how far did the harmony move" a number rather than a judgement; the diameter is five, so a harmonic displacement is a number between zero and five. That metric is what gives $f_{\text{harmony}}$ a scaled codomain. The affective reading of the individual generators remains a convention, and the listening work that would support it is separate from the group theory [8], whose rigour belongs to the algebra.

### 6.2 The three asserted properties

**Totality** requires $\Phi$ to be defined at every point of $\mathcal{P}$, and so far as anyone can tell it is. The work falls upstream and downstream of it. The state estimator maps into a larger set than $\mathcal{P}$: it returns $(0,0,0)$ on 44.8 per cent of frames, and that triple lies outside the state space. And the four consumers of section 4.4 each extend $\Phi$ over that larger domain in a different way, so what runs is four inconsistent extensions of one total function. The distinction matters because it locates the repair: $\Phi$ stands as it is, and the estimator is what changes.

**Determinism** requires $\Phi$ to be a function of the state alone. S1 records the unseeded draws in the composer and the calculus, and the listening studies that follow from closing them. The patch that closes it derives every draw from a key built from the work, the character and the frame index, so each draw is a pure function of its own coordinates and the output is independent of call order [4]. Order independence and change locality then hold structurally rather than by discipline, which is what a programme needs if rendered stimuli are to stay citable across code changes.

**Decomposability** requires each musical parameter to be a function of the state in its own right. This is the property most at risk, and section 4.3 named the risk: two of the three flicker remedies make $f_{\text{mode}}$ a function of the current and previous state, turning $\Phi$ into a function on $\mathcal{P} \times \mathcal{P}$ and breaking the decomposition the theory advertises as its advantage over a learned system.

### 6.3 A11's noun

A11 says the whole composes: it is a calculus. The three adjectives are checked above, and the noun is checked here, because a calculus is an algebraic claim.

There are two readings. On the first, $\Phi$ composes across frames: a scene is $\Phi$ applied to a sequence of states, the algebra is the monoid of state sequences under concatenation, and the score of a concatenation is the concatenation of the scores. That fails as soon as hysteresis or a dead band is introduced, and it already fails for the leitmotif transformations, which are composed across frames and form a monoid rather than a group: the implemented inversion rebuilds the pitch array from the root plus the intervals and changes its length, so applying it twice returns a different array, and the chromatic-descent and whole-tone-ascent transformations destroy interval content irrecoverably.

On the second, $\Phi$ composes across parameters: the calculus is the product of five functions computed separately and assembled. That is decomposability restated, and it is the reading the theory should adopt, because it does the work S1's Proposition 4 needs [16]. If the theory means the first as well, it owes an identity element, an associativity check and an account of the transformations that run one way only.

### 6.4 Identifiability: what survives into a score

The question every listening study depends on is how much of an eight-dimensional state a listener could in principle recover from a cue. This section asks it of this mapping, and a coarse bound is available now from section 6.1, ahead of S3.

Count the information in $\mathcal{M}$ at one frame: three reachable tempo bands, eight dynamic markings, seven modes, 24 triads, and timbre held aside until S3 specifies $T$. Ignoring timbre that is at most $3 \times 8 \times 7 \times 24 = 4{,}032$ distinguishable frames, about twelve bits, an upper bound on what any listener could recover however good their ear.

The binding constraint is reach rather than capacity. Of the eight state dimensions, trauma reaches dynamics and the harmonic coordinate; entropy reaches tempo; the two register degrees of freedom reach mode; and **the four DISC coordinates reach timbre alone**, which is the factor S3 specifies. So four of the eight dimensions currently survive into that one channel, and specifying $T$ is what makes the fibre structure of $\Phi$ computable. What can be said ahead of it is that on the composer path of section 6.5 the registers are hard-coded, so the two register dimensions are constant there, and the melody routine takes its entropy default, so the recoverable state on that path is one-dimensional: everything audible is a function of trauma.

That is the number the programme needs and it should be in front of any listening study. A study that asks listeners to recover a register from a cue produced on that path is asking them to recover a constant. The completion of this analysis falls to S3, once $T$ exists.

### 6.5 Where $\Phi$ takes inputs beside the state

Three findings in the shipped tree, pinned to commit `28c04ec`, bear on whether $\Phi$ is a function in the mathematical sense, and all three are S4's to repair; the detail with file and line is in [25]. The composer hard-codes the register triple, so the dominant register is always the Imaginary and two of the seven modes are reachable in it. The mode written into the rendered score comes from a three-way branch on $(\tau + H - 0.5)/2$ rather than from any of the modal selectors; the code calls that quantity a Lyapunov exponent, and section 7.1 renames it the imbalance index. And the melody routine is called with five arguments against a signature whose entropy parameter defaults to 0.5, so the composer takes that default and the two A8 selectors reduce to $0.7\tau + 0.15$ and $0.3 + 0.4\tau$, both affine in trauma, correlated at exactly 1. That last is the finding S1 reports at the end of its section 8.2, and it is the worst case of the collinearity rather than an instance of it; the seeding patch repairs it [4].

---

## 7. The dynamics apparatus

The dynamics apparatus is developed here as apparatus, and kept available even where it is only partly useful [18]. Doing that honestly means beginning with the object the whole apparatus attaches to.

### 7.1 One name for one quantity

The corpus used "free energy" for three objects: the Gibbs free energy $G = H - TS$; a potential well in a model of collapse, elsewhere called the bias well; and, in the applied appendices, a per-subject quantity that reads as the variational free energy of the predictive-processing literature [10] and that the naming table below retires. One name for three objects is how a reader comes to credit a theory with a result that belongs to another field. The term is retired. S1 promises that a naming table does the same job for every other borrowed or multiply-defined term [16], and the commensurability audit names six quantities with irreconcilable definitions [3], so the table below covers all of them.

| Retired or disputed term | Adopted term | What it is | Status |
|:---|:---|:---|:---|
| free energy, variational sense | **surprise bound** | a variational upper bound on negative log evidence [10] | named, and used once a generative model is written for it to bound |
| free energy, dynamical sense | **stability potential** | a scalar whose minima are the states a trajectory settles into | apparatus, section 7.4 |
| free energy, Gibbs sense | **Gibbs free energy** | the thermodynamic quantity | retired from this corpus, along with the analogy |
| Lyapunov exponent, as implemented | **imbalance index** | $(\tau + H - 0.5)/2$, effective split trauma 56.5 to entropy 43.5 [3] | keep the quantity, drop the name; it is a weighted sum of trauma and entropy |
| psychometric Reynolds number | withdrawn | a ratio of four normalised quantities, each of them unitless | withdrawn: a Reynolds number is a dimensionless group formed from dimensioned quantities |
| emergence | **total correlation** | $\sum_i \mathcal{H}(\Psi_i) - \mathcal{H}(\Gamma) \ge 0$ | the quantity is non-negative; the corpus states the reverse inequality and calls it an axiom, at the line section 2 gives |
| tension, five definitions | **withdrawn as a single term** | three disjoint weighted combinations, a chord lookup and trauma itself [3] | S3 names and defines each separately, or keeps one |
| Borromean stability index, four definitions | **register spread**, on the first definition only | one minus the largest pairwise register difference | contributes a constant on the only path it has, because the triple it reads is hard-coded; see section 4.5 |
| fragmentation, two live definitions | **fragmentation**, the A8 adopted form | $\max(0, 0.7H - 0.3\tau)/0.7$ | the adopted form replaces the shipped form in the code |
| intensity, two definitions | **orchestration density** | $0.3H + 0.7\tau$ | the word "intensity" is retired; section 6.5 relies on this |
| entropy, three definitions | **entropy**, the state coordinate $H$ | the disorder of the subject's symbolic organisation | the parser's lexical-diversity formula and the style-density formula are estimators of it, and are labelled as estimators |
| trauma, three definitions | **trauma**, the state coordinate $\tau$ | accumulated and unresolved weight | as for entropy: the beat-position formula and the keyword tally are estimators of the coordinate, and are labelled as such |

A hazard belongs with the table. The symbol $H$ carries four meanings across the corpus: enthalpy, Hamiltonian, Shannon entropy and homology group. The state uses $H$ for entropy, so $G = H - TS$ reads on this theory's conventions as entropy minus temperature times entropy. From here, $H$ is the state's entropy coordinate throughout. Shannon entropy is written out in words wherever it appears in this corpus. A Hamiltonian is $\mathcal{E}$. Homology groups carry their degree as $H_n$.

### 7.2 The evolution equation the apparatus attaches to

The apparatus of dynamical systems applies to a state that moves according to a rule, and writing that rule is the work this section sets out. What the corpus carries today is the form $d\vec{p}/dt = F(\vec{p}, u)$ with $F$ still to be specified. The unified volumes write $\partial\Psi/\partial t = F(\Psi, \text{Input}, \text{Context})$ and leave $F$ to be written (`01_Foundations.md:236`); the predictive volume names the state evolution model as the place where the physics lives and leaves it to the same work (`08_Vol_07_Predictive_Mechanics.md:56`). In the reference implementation the state at frame $t+1$ is read from annotation, which is what an evolution equation would replace.

This is the load-bearing commitment and everything below is conditional on making it. A stability potential needs a flow to have minima of; a bifurcation is a qualitative change in a flow; a critical-slowing indicator estimates the leading eigenvalue of a linearisation. Writing $F$ is what makes each of these a quantity about this theory.

### 7.3 The early-warning indicator reports a trend, and trauma always carries one

The standard early-warning apparatus rests on critical slowing down: approaching a fold, the leading eigenvalue of the linearised dynamics approaches zero, the return time diverges, and two statistics on the fluctuations rise, the variance and the lag-1 autocorrelation [11], [12]. Both are computed on residuals after detrending.

**Theorem 2.** For a series $x_1, \dots, x_n$ with mean $m$, write $S = \sum_t (x_t - m)^2$ and $Q = \sum_{t<n} (x_{t+1} - x_t)^2$. Then the sample lag-1 autocorrelation satisfies

$$\mathrm{AC}_1 \;=\; 1 \;-\; \frac{Q}{2S} \;-\; \frac{(x_1 - m)^2 + (x_n - m)^2}{2S}.$$

Consequently $\mathrm{AC}_1 \to 1$ whenever the total squared step and the two endpoint terms are small against the total variation, which holds for any series carrying a smooth trend, whatever dynamics generate the increments.

*Proof.* Expand $Q = \sum_{t<n}[(x_{t+1}-m)-(x_t-m)]^2$ and collect against $S$; the cross term is twice the lag-1 autocovariance and the remainder is the two endpoint squares. $\square$

Monotonicity is sufficient and not necessary, and the identity says which quantity governs: a trend, of either sign. The identity reproduces the sample $\mathrm{AC}_1$ exactly on every test series. A rising linear ramp of 200 points gives $+0.9850$; **a falling ramp gives $+0.9850$ too**, which is what shows the trend, of either sign, to be the operative quantity; a step at the midpoint gives $+0.9850$; the rising ramp with independent noise of dispersion 0.02 gives $+0.9785$; independent noise with no trend gives $+0.0648$. At the length of a short act the effect is already large: a 30-point series gives $+0.9000$ and a 12-point series $+0.7500$.

The consequence for this theory should be stated at its true size. Trauma as defined ratchets, so a trauma series always carries a trend, so the **undetrended** indicator computed on it reports a high value at every frame of every play, including a calm one. The early-warning literature detrends, and the sister series already requires detrending and surrogate significance testing [22]. What this theory owes is a detrending model of its own before it computes the indicator, and that model is a substantial piece of work, because on a monotone bounded quantity the trend is most of the signal.

Three ways forward, at three different costs: supply a detrending model, which is real statistical work; move the indicators to entropy, which is free to move in both directions, which costs nothing and narrows the claim honestly; or give trauma a resolution term, the largest change, since it amends A1's definition of trauma and every parameter monotone in it, and probably the one the drama wants, because plays contain relief. Section 10 states this as an open question with all three routes and their costs.

### 7.4 The stability potential

A stability potential is the standard way to write down a system that sits in one state, resists small pushes, and then flips suddenly, which is what happens to a character at a turning point. Formally, a one-dimensional overdamped flow in a potential $V$, $\gamma \dot{x} = -V'(x) + \xi(t)$, has stable states at the minima of $V$, a return rate proportional to $V''$ there, and a transition when a minimum and a maximum annihilate. The cusp form

$$V(y) = \tfrac{1}{4}y^4 - \tfrac{1}{2}\beta y^2 - \alpha y$$

is the normal form for the simplest case producing hysteresis and sudden jumps [13], and it is the one genuine potential-well model in the corpus, correctly stated, in an unsigned survey document, and awaiting attachment.

To attach it the theory must supply the scalar playing $y$, two functions of the state playing $\alpha$ and $\beta$, a damping $\gamma$ with a time unit, and a noise amplitude. **A candidate for $y$ already exists in the corpus, and this section proposes it as one.** The commensurability note rotates the state plane and takes $u = (\tau + H)/\sqrt{2}$ as the intensity axis and $v = (\tau - H)/\sqrt{2}$ as its complement [24]. Both carry effective contributions of trauma 56.5 to entropy 43.5 at the library dispersions, the same split as the imbalance index, because all three weight the two coordinates equally in magnitude. The second is exactly the quantity a bistable subject would be bistable in: it is positive when weight exceeds disorder, which is the burdened but ordered character, and negative when disorder exceeds weight, which is the scattered one, and a character's turn is a passage from one to the other. Proposing $y = v$ makes the cusp's two wells those two conditions and makes $\alpha$, which tilts the potential, the natural home for whatever the scene does to the character. This is a proposal and not a result; it is offered because an apparatus becomes usable at the point where it has a candidate order parameter.

The caution of section 3.2 applies with full force. A quartic carries the origin and unit of $y$ into its shape, since the positive affine group changes a quartic's form: changing what 0 and 1 mean changes the model's predictions. Adopting the cusp means adopting a statement of what fixes that scale, which is why section 3.2's anchors matter here more than anywhere.

### 7.5 The ensemble layer

Two further models are addressed to a group rather than a subject: the Ising Hamiltonian $\mathcal{E}(\sigma) = -\sum_{\langle i,j\rangle} J_{ij}\sigma_i\sigma_j - \sum_i h_i \sigma_i$, which the corpus states in two mutually inconsistent versions under one name [14], and Granovetter's threshold rule, in which the aggregate turns on the whole distribution of thresholds rather than its mean [15]. Both belong to the dialogue papers rather than to the single-subject calculus, and both also wait on the evolution equation of section 7.2. Their attachment conditions are in the table below so that they are on record.

### 7.6 What each piece would cost to attach

| Apparatus | Correct statement exists | What the theory must supply | Waits on |
|:---|:---|:---|:---|
| Stability potential, cusp form | yes [13] | two control functions, damping with a time unit, noise amplitude, and a scale for $y$; $y = (\tau - H)/\sqrt{2}$ proposed in 7.4 | an evolution equation |
| Early-warning indicators | yes [11], [12] | a detrending model, or a move to entropy, or a resolution term on trauma | Theorem 2 |
| Bifurcation analysis | yes | a flow to linearise | an evolution equation |
| Ising ensemble | yes [14] | binary variable, coupling, field | the dialogue papers |
| Threshold cascade | yes [15] | a threshold per character, and an ensemble | the dialogue papers |
| Lyapunov exponent | yes | a trajectory, a linearisation and a limit; the implemented quantity is the imbalance index of section 7.1 | an evolution equation |
| Surprise bound | yes [10] | a generative model to be surprised by | a generative model |

Developing the apparatus as apparatus has established one thing worth stating on its own. Three of the seven pieces wait on a single object, and writing that object is the largest theoretical commitment outstanding in the programme. The author may reasonably conclude that the evolution equation is worth writing, in which case three pieces attach at once, or that it is better left, in which case those three are retired from the corpus rather than carried as available. Either answer settles all three, and section 10 states the choice as the last of the open questions.

---

## 8. The wider vector and the reduction to twenty-four

The factor reduction is set at twenty-four [18]. The wider personality space is four DISC dimensions, five Big Five dimensions, three Dark Triad dimensions and the thirty entries of the Cognitive Bias Atlas, giving forty-two coordinates, reduced to twenty-four factors.

The mathematics of that sentence is weaker than it looks. A factor reduction is a hypothesis about a covariance matrix: to say forty-two reduce to twenty-four is to say the population covariance of the forty-two has a twenty-four factor structure capturing a stated share of variance, and data settles that. The data in question is a sample scored on all forty-two, which supplies the covariance matrix a factor structure would be a structure of, and assembling it is the work named next.

Turning the choice into a result takes a sample scored on all forty-two of a size supporting a forty-two variable covariance estimate, the largest single piece of empirical work in the programme; commensurable instruments, where the present set ranges from a replicated taxonomy to a catalogue whose loadings are still to be estimated; and a criterion for the number of factors, stated in advance.

Until then the twenty-four is a chosen dimensionality for an engineered parameterisation, with the rationale S1 gives: it was the size of the wider vector before the bias count was settled at thirty, so the reduction keeps the personality space the size it has always been while carrying the whole bias catalogue behind it. That is a legitimate engineering decision and an illegitimate empirical claim, and the corpus writes it in the first form throughout.

Three further points belong here. **S1 still closes its section 4.3 on "reduced by principal or independent component analysis to roughly eight factors said to capture the large majority of variance, and normalised to the unit sphere"**, four sentences after restating the target as twenty-four. That sentence carries the superseded eight and the illegitimate empirical form, and it should be struck [25]. Separately, principal and independent component analysis are different operations, and "roughly eight factors capturing the large majority of variance" is a statement about principal components, since independent components come unordered by variance [23]. And the unit-sphere normalisation discards the magnitude that DISC and the Big Five contribute, which is a modelling decision that owes an argument.

One structural point is worth recording: the forty-two divide into twelve trait coordinates and thirty bias coordinates, the two blocks sit on different measurement footings, and a reduction respecting that split would be easier to interpret than one that mixes them.

---

## 9. What is proved

Four results in this paper are theorems about the construction, and they are stated together here because a reader who wants only the mathematics can take them and leave the rest.

**Lemma 1**, section 4.2. For any three quantities with finite second moments summing to one almost surely, the three covariances sum to $-\tfrac12$ of the sum of the three variances. The lemma is exact and distribution-free. It entails that at least one covariance is negative, that equal variances force the three correlations to average exactly $-1/2$, and that pairwise independence on the simplex is possible only for a point mass.

**Lemma 2**, section 4.3. The map $\arg\max$ on $\Delta^2$ is discontinuous precisely on the tripod joining the barycentre to the three edge midpoints, which is half of each median and not the whole of it. Under the uniform distribution the measure of the states within $d$ of the tripod is $2d - d^2$, from the kite computation, so that measure vanishes linearly at zero and a tenth of all states sit within $0.1$ of a mode change.

**Theorem 1**, section 5.2, with its corollary. Two weight vectors with non-negative entries summing to one, each entry at least $\varepsilon$, produce scalarisations of the same equally dispersed uncorrelated pair whose correlation is at least $\sin(2\arctan(\varepsilon/(1-\varepsilon)))$, which is strictly positive. Any two quantities strictly increasing in both trauma and entropy are yoked.

**Theorem 2**, section 7.3. The sample lag-1 autocorrelation is exactly $1 - Q/2S$ minus the two endpoint terms, so it tends to one on any series whose total squared step is small against its total variation. A trend of either sign suffices, and the trend rather than monotone increase is the operative quantity.

These four hold whether or not a play has ever been scored, and they stand independently of any answer a listener could give. Sections 3.1, 4.5, 6.1 and 6.4 add four results of the same kind that are observations or derivations rather than theorems: that the state space has eight dimensions; that the simplex and the Borromean link are incompatible; that $\Phi$'s codomain is the product of one interval and four discrete factors, so the property it can satisfy is piecewise continuity with a declared jump set; and that at most 4,032 frames, about twelve bits, are distinguishable in that codomain, falling to a single dimension on the composer path as shipped.

---

## 10. Open questions and further work

### 10.1 What governs the reading above

The open questions below are the ones a reader is best placed to help with, and the distinction that matters most is the one this paper has drawn throughout: which results are settled by the mathematics and which wait on a listener.

The theory's empirical claims wait on the listening study, and a reader should read the numbers above with that in mind. The 232 triples of section 4.4 were produced by a keyword counter reading an analyst's own commentary, and the elicitation study is what supplies rater values. The dispersions of section 5 are dispersions of system output. The register instrument audit is an audit of a program, and the elicitation study is what reports the values a human annotator returns.

### 10.2 Which results are mathematical, and which depend on the empirical claims

This is the distinction a reader most needs, and it is sharp in this paper.

**Unaffected by any listening result, now or ever.** Lemma 1 and its consequences for A3's test, including the result that registers varying on the simplex are pairwise coupled. Lemma 2, the tripod, and the closed form $2d - d^2$. Theorem 1, its table, and the corollary that two positively weighted scalarisations of the same pair are yoked. Theorem 2 and the conclusion that an undetrended lag-1 indicator on a trended series is uninformative. The dimension count of section 3.1. The incompatibility of section 4.5. The codomain and the jump sets of section 6.1, and the counting bound of section 6.4. The statement that the state space is $[0,1]^6 \times \Delta^2$ and that a covariance estimate over the nine coordinates is singular. Each of these is a fact about a construction. If every empirical claim in the series turned out false tomorrow, each would still be true, and would still constrain any repaired version of the theory that kept the simplex.

The audit of section 4.4 belongs here too, with one qualification: its figures are facts about a program run over a fixed corpus, reproducible from the named scripts, and they are facts about that program. They stand independently of any listening result, and a listening result is a separate report.

**Dependent on the empirical claims, and settled by the annotation pass and the listening study.** That the nine coordinates are the right coordinates for a character's state. That the registers admit magnitudes at all. That the simplex rather than the cube is their domain. That the coordinates are interval-scaled, which section 3.2 declares as a commitment and which the annotation instrument's endpoint anchors support once it is built. That a mode carries the connotation A4 gives it; the one published listener ordering of the modes departs from the brightness ordering [19], which is a reason to expect the question to be hard rather than an answer to it. That the affective reading of the neo-Riemannian generators means anything to a listener, which remains a convention awaiting its experiment [8]. That a burdened but ordered subject sounds thick and whole and a scattered one thin and broken, which is the musical content of section 5.3. That trauma ratchets in the dramatic sense S1 gives it, which is a claim about plays and not a theorem. And every claim about what a listener recovers, which section 6.4 bounds from above, leaving the study to report what is recovered.

The practical reading of the split is this. The formal apparatus can be criticised now, on its own terms, by any reader. Confirming the theory is the listening study's work.

### 10.3 Assumed and not established, and still to be built

**Assumed and not established.** The six items listed under the second heading of section 10.2, and with them the assumption that Euclidean distance is the right metric on the simplex, and that the state moves in any way the theory could write down.

**Still to be built.** An evolution equation. A detrending model. A generative model. A timbre space. A covariance matrix for the wider vector. The dispersions behind nineteen weighted combinations. And a measurement instrument for the state coordinates, supplying values from outside the system.

That last governs the rest, and S1 states it plainly. The instrument that would change it is the annotation protocol, and its cost is settled: **about eleven thousand dollars and 176 hours of the author's time over roughly seven months**, after which four of the nine live assertions become testable, namely A1 as restated, A2, A3 and A5 [23]. Figures elsewhere in the corpus of "a term" and "six of nine" are superseded by that review.

This paper could prove things because theorems about a construction need no data about the world. That is also the extent of their reach: each says what the construction is, and the listening study says what it describes.

### 10.4 Five open questions

Five questions follow from the sections above, and each is settled by a decision or a study rather than by more mathematics. They are set out with their options, their costs, and the cost of leaving each unanswered, in a companion artefact [25], together with the replacement text for the five register entries this paper changes, A1, A3, A4, A8 and A11 [17].

**One. Simplex or Borromean link.** Section 4.5 shows the two to be incompatible. Keeping the simplex makes the Borromean figure a picture in the prose; keeping the link means leaving the constraint for the cube with a three-way interaction term, whose musical mapping would have to be written from the start. The question reaches the implementation as well as the prose, because a stability index named for the link, defined four ways, carries a published weight of sixty per cent while holding constant.

**Two. How the registers are elicited.** Section 3.1 shows that a protocol asking for nine independent judgements asks for one too many, and section 4.2 shows that a study reporting only the constrained correlations is reporting Lemma 1. How A3 is tested turns on this.

**Three. What the mode does at a tie.** Section 4.3 gives three remedies and section 4.4 rules out two of them on the realised distribution, where ties are 17 per cent of the frames that reach the simplex at all. Interpolation is the only one of the three that returns a determinate value on a tie, and it is a musical proposal that a composer would have to accept.

**Four. Whether trauma is allowed to resolve.** Section 7.3 shows that the monotonicity of trauma, on its own, makes the undetrended early-warning indicator report a high value at every frame of every play. The three routes are a detrending model, a move to entropy, or a resolution term on trauma; the third is the largest change and probably the one the drama wants, because plays contain relief.

**Five. Whether to write an evolution equation.** Section 7.6 shows that three of the seven pieces of dynamics apparatus wait on this single object. Writing it attaches three pieces at once; leaving it unwritten retires those three from the corpus rather than carrying them as available. Either answer settles all three, and section 7.6 gives the cost of each.

---

## 11. Reproduction

Every figure quoted in this paper, and the figure itself, is produced by named scripts: `05_DATA/03_generators/s2_verify.py` (the simplex correlations, the scalarisation identity, the group verification), `s2_verify2.py` (the bound table and the frame statistics), `s2_verify3.py` (the closed forms and the lag-1 identity), `s2_rsi.py` (the register instrument over the 232 frames) and `s2_census.py` (the corpus counts of section 2 and the clip counts of section 5.3). Group-theoretic statements attributed to [2] are verified by `s2_verify.py` over all 24 triads and are cited rather than claimed. The figure is `s2-figure-simplex.svg`, generated by `make_simplex_figure.py`, which reads its ten triples from `s2_verify2.py` rather than carrying them as literals, so the picture stays in step with the instrument. Implementation claims are pinned to `mpn-conductor-standalone` at commit `28c04ec`.

---

## 12. References

**On the paths in these entries.** An entry that gives a path in backticks names an artefact in the MPN working corpus rather than a page on this site. That corpus is held privately, so such a path resolves inside the working corpus rather than from this page. The citations are kept as they stand because each names a real artefact and each entry says what the artefact is and what it establishes, which lets a reader see what a claim rests on and ask for the artefact by name. Keeping the citation is what discloses the dependency.

A citation of the form `psychometric_calculus.ts:211` names a file and a line in the MPN Conductor source tree, read at the revision this paper pins its implementation claims to.

The rest of the series is published in this working group: [MPN-S1](/papers/mpn-s1-psychometric-calculus-theory), the theory; [MPN-S3](/papers/mpn-s3-mapping-state-to-musical-material), the mapping; [MPN-S5](/papers/mpn-s5-dialogue-use-cases), the dialogue use cases; and [MPN-S6](/papers/mpn-s6-expression-aid), the expression aid. Where an entry below also gives a working filename such as `S1-mckenney-lacan-theory.md`, that is the corpus copy of the same document.

[1] J. Aitchison, "The statistical analysis of compositional data," *Journal of the Royal Statistical Society, Series B*, vol. 44, no. 2, pp. 139-177, 1982. The observation that ratios to a common total induce spurious negative correlation is Pearson's, of 1897; Aitchison says so, and founds the methodology that addresses it.

[2] "Musical psychometric notation: the notation system," MPN-2, `08_PAPERS/MPN-2-notation.md`, section 3.6. Cited for the neo-Riemannian transition algebra in full, including the group properties, the LR chain, the Cayley diameter of five, the hexatonic pole, the non-uniqueness of shortest words and both implementation errors with file and line; and separately for the dead band on the harmonic coordinate. That series addresses a different application and carries a different state vector, and the group theory is application-independent and was written there first.

[3] "Commensurability audit," MPN-AUDIT-01, `08_PAPERS/COMMENSURABILITY-AUDIT.md`, 12 September 2026. Thirty-four weighted combinations: six degenerate, eight misleading, one agreeing, nineteen undetermined; and six quantities with irreconcilable definitions.

[4] "Determinism, and the end of fabricated state," MPN-PATCH-01, `08_PAPERS/SEEDING-PATCH-NOTE.md`, revision 2, 13 September 2026.

[5] R. Cohn, "Neo-Riemannian operations, parsimonious trichords, and their Tonnetz representations," *Journal of Music Theory*, vol. 41, no. 1, pp. 1-66, 1997. Cited through [2].

[6] D. Lewin, *Generalized Musical Intervals and Transformations*, Yale University Press, 1987. Cited through [2].

[7] A. S. Crans, T. M. Fiore and R. Satyendra, "Musical actions of dihedral groups," *American Mathematical Monthly*, vol. 116, no. 6, pp. 479-495, 2009. Cited through [2].

[8] "Musical psychometric notation: foundations," MPN-1, `08_PAPERS/MPN-1-foundations.md`, correction 12. Cited for the statement that the affective reading of the PLR operators is a convention awaiting experimental evidence.

[9] R. Cohn, "Maximally smooth cycles, hexatonic systems, and the analysis of late-Romantic triadic progressions," *Music Analysis*, vol. 15, no. 1, pp. 9-40, 1996. Cited through [2] for the hexatonic pole.

[10] K. Friston, "The free-energy principle: a unified brain theory?", *Nature Reviews Neuroscience*, vol. 11, pp. 127-138, 2010. Cited for the variational quantity this corpus renames the surprise bound, and for that alone; writing a generative model is what would let the theory draw a result from this literature.

[11] M. Scheffer et al., "Early-warning signals for critical transitions," *Nature*, vol. 461, pp. 53-59, 2009.

[12] V. Dakos et al., "Methods for detecting early warnings of critical transitions in time series," *PLoS ONE*, vol. 7, no. 7, e41010, 2012.

[13] R. Thom, *Structural Stability and Morphogenesis*, W. A. Benjamin, 1975. Cited for the cusp normal form. The corpus bibliography gives the author as "R. Thorn"; the name is Thom.

[14] E. Ising, "Beitrag zur Theorie des Ferromagnetismus," *Zeitschrift fur Physik*, vol. 31, pp. 253-258, 1925.

[15] M. Granovetter, "Threshold models of collective behavior," *American Journal of Sociology*, vol. 83, no. 6, pp. 1420-1443, 1978.

[16] J. McKenney, "The McKenney-Lacan psychometric calculus: a theory of musical representation for psychological state," MPN-S1, `08_PAPERS/S1-mckenney-lacan-theory.md`, revision 3.

[17] J. McKenney, "The McKenney assertions: a register for examination," `08_PAPERS/ASSERTIONS-REGISTER.md`.

[18] "Decision log, 12 September 2026," MPN-DECISIONS-01, `08_PAPERS/DECISION-LOG-2026-09-12.md`. Cited for the factor reduction at twenty-four, for the development of the dynamics apparatus as apparatus, and for the eight-marking form of the dynamics.

[19] D. Temperley and D. Tan, "Emotional connotations of diatonic modes," *Music Perception*, vol. 30, no. 3, pp. 237-257, 2013. Cited only for the fact that the published listener ordering of the modes departs from the brightness ordering, so predicting how a mode change is heard takes an argument that goes beyond brightness.

[20] "Block A review," `08_PAPERS/ARBITRATION-S1.md`. Cited for the observation that three magnitudes summing to a constant have a singular correlation matrix, that equicorrelation at $-1/2$ is the boundary of the positive semi-definite cone, and that the test must ask whether the registers are negatively coupled at all against a null of independence.

[21] "A8 decision memo," `08_PAPERS/A8-DECISION-MEMO.md`, revision 3. Cited for the identity of section 5.1 and for the figure 0.8376.

[22] "Musical psychometric notation: foundations," MPN-1, `08_PAPERS/MPN-1-foundations.md`, at `:234`, which states the requirement as item (d) of a numbered list: "For early-warning signals, rolling-window autocorrelation and variance with detrending and surrogate-data significance tests", with the method set out at `:215`. **The requirement is MPN-1's rather than MPN-3's.** The terms detrend, surrogate and autocorrelation occur in MPN-1 alone; `MPN-3-engine.md` carries one early-warning sentence, E-21 at `:226`, requiring early-warning observables to be rendered as text annotations rather than sonified, which is a separate requirement from the one cited here.

[23] "Constraint review of S1," `08_PAPERS/REVIEW-S1-constraints.md`. Cited for the annotation instrument's cost and for the four assertions it makes testable, for the recommended split of A1 into frame-level and character-level assertions, and for the distinction between principal and independent component analysis in the reduction.

[24] "Commensurability, scalarisation and the second dimension," MPN-NOTE-01, `08_PAPERS/COMMENSURABILITY-NOTE.md`. Cited for the rotated state plane whose second axis section 7.4 proposes as the order parameter.

[25] "What S2 puts to the author," MPN-S2-DECISIONS, `08_PAPERS/MPN-S2-DECISIONS.md`. The five open questions of section 10.4 with their options and costs, ten actions each with an owner, and replacement text for the five assertions register entries this paper changes.

[26] "What the corpus supplies to S2, and who wrote it," MPN-NOTE-02, `08_PAPERS/MPN-NOTE-02-corpus-provenance.md`. The source pass behind section 2, with its counts reproduced by `s2_census.py`.

[27] "Register and audit amendments arising from S3," MPN-S3-AMENDMENTS, `08_PAPERS/MPN-S3-AMENDMENTS.md`. Section 3 carries the parser defect, the three misread annotations and the corrected counts of section 4.4.
