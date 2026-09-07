# Corpus audit: WG-03-ML Behavioural Modeling and MP Math Physics

Date: 2026-09-06
Auditor scope: 9 documents across two directories
Method: full read, citation indices checked against bibliographies, mathematics re-derived

All 9 documents were read in full. None was sampled. Every mathematical claim that
could be checked from the numbers printed in the document was recomputed with
`python3` / `sympy`; the commands and their output are reproduced inline.

## Summary

| Class | Confirmed | Probable | Unverifiable |
|:---|---:|---:|---:|
| Named method, no citation | 7 | 0 | 0 |
| Citation index out of range | 0 | 0 | 0 |
| Cited work with no file | 3 | 0 | 0 |
| Mathematical error | 11 | 3 | 0 |
| Parameter reported as result | 5 | 0 | 0 |
| Uncited quantitative claim | 6 | 0 | 1 |

Headline: **no document in this scope contains a dangling `[n]` citation.** All three
"dangling citation" leads were line-number confusions and are refuted below. The real
defect in this scope is different and larger: **five of the nine documents carry no
bibliography at all**, and the three that do carry one have an unsourced, un-numbered
"Applied Systems Assurance" block appended *after* the bibliography containing every
dollar figure in the paper.

## Citation integrity table

| Document | Bibliography entries | Highest index cited | Out of range | Verdict |
|:---|---:|---:|---:|:---|
| `WG-03-ML-Autonomous-OT-Trust-Boundary.md` | 0 | — (no markers) | 0 | No bibliography. ~55 named external constructs, none cited. |
| `WG-03-ML-Calculus-of-the-Subject.md` | 39 | 32 | 0 | Body sound. §8, appended after "Works cited", has 0 citations. |
| `WG-03-ML-Cognitive-Bias-Catalog.md` | 0 | — (author-date only) | 0 | No bibliography. 6 author-date attributions resolve to nothing. |
| `WG-03-ML-Loman-Operator-Topology-of-an-Act.md` | 0 | — (no markers) | 0 | No bibliography. |
| `WG-03-ML-Mckenney-Lacanian.md` | 3 | 3 | 0 | In range. `[3]` resolves to no file. |
| `WG-03-ML-Morphogenesis-Signifying-Chain-gGNN.md` | 20 | 20 | 0 | In range. `[1]`/`[2]` attributions swapped. §9 post-bibliography, 0 citations. |
| `WG-03-ML-Musical-Psychometric-Notation.md` | 4 (author-date, unnumbered) | — | 0 | Entry 1 resolves to no file. §10 post-bibliography, 0 citations. |
| `MP_Kramers_Escape_Model.md` | 3 | 3 | 0 | In range. `[3]` resolves to no file. |
| `MP_Mathematical_Models.md` | 0 | — (author-date only) | 0 | No bibliography. ~143 named-construct mentions, 6 author-date attributions. |

Note on the two large humanities bibliographies. `Calculus-of-the-Subject` (39 entries)
and `Morphogenesis` (20 entries) are Google-Deep-Research export lists: Wikipedia,
Fiveable, Scribd, dokumen.pub, ResearchGate PDF mirrors, all stamped
"accessed November 27, 2025". They are traceable, so they satisfy the `CLAUDE.md`
sourcing rule as written. They are not high-quality sources. That is a separate
editorial judgement and I am not scoring it as a defect.

---

## Verdict on the three known leads

### Lead 1. `MP_Kramers_Escape_Model.md` self-cites a work that does not exist. **CONFIRMED.**

```
$ grep -n "Topological Cyber-Physics" references/MP-Math-Physics-Formula/MP_Kramers_Escape_Model.md
45:- [3] **McKenney, J. (2025)**: *Topological Cyber-Physics: Foundations of the Digital Twin*. Eigenia Labs working paper.

$ grep -rl "Topological Cyber-Physics" references/
references/MP-Math-Physics-Formula/MP_Kramers_Escape_Model.md
```

The only file in `references/` containing the string is the file that cites it. There is
no such document. See F-ML-08.

### Lead 2. `WG-03-ML-Mckenney-Lacanian.md` cites reference 87 with no entry. **REFUTED as stated.**

```
$ grep -n '\[[0-9]\{2,\}\]' references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Mckenney-Lacanian.md
(no match: no two-or-more-digit citation exists in this file)

$ wc -l < references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Mckenney-Lacanian.md
86
```

The file is 86 lines. There is no `[87]`. The report was a **line number**, not a
citation index: line 87 of a `cat -n` listing (the file has no trailing newline, so
`wc -l` reads 86) is the bibliography entry

    - [3] **Mckenney, J. (2022)**: *Psychohistory and the Digital Twin: Modeling the Adversary*

The document cites `[1]`, `[2]`, `[3]` against a 3-entry bibliography. Zero out of range.
**However**, the lead points at a real defect by accident: entry `[3]` is a cited
McKenney work with no file anywhere in the repository. See F-ML-08.

### Lead 3. `WG-03-ML-Musical-Psychometric-Notation.md` cites reference 558. **REFUTED as stated.**

```
$ grep -n '\[[0-9]\{3,\}\]' .../WG-03-ML-Musical-Psychometric-Notation.md
(no match: no three-digit citation exists in this file)
```

The only bracketed numbers in the whole file are `x[1]` and `[0]` at lines 158-159,
which are Python list indices inside `assign_instrument()`. Again a **line number**:
line 558 is the first bibliography entry.

```
$ sed -n '556,560p'
## References

McKenney, J. (2025). McKenney-Lacan Symphonic Calculus: Glossary & Briefing. *AEON Research Division*.
```

The bibliography has **4 entries**, not 558. The paper uses unnumbered author-date
references, so no index can be out of range. And again the lead lands on a real defect:
that first entry is a cited McKenney work with no file. See F-ML-08.

**Conclusion on the leads: all three "dangling citation" reports are artefacts of reading
line numbers as citation indices. There are zero out-of-range citations in this scope.
Two of the three nevertheless pointed at genuine phantom-self-citation defects.**

---

## Findings

### F-ML-01. `MP_Mathematical_Models.md` invokes twenty-plus named external methods and datasets with no bibliography of any kind. CONFIRMED.

File: `references/MP-Math-Physics-Formula/MP_Mathematical_Models.md`, whole document,
820 lines, zero reference entries.

The document names, as established external work: Boltzmann distributions (F2), Pareto
sampling (F3), the Hill estimator (F4), CVaR (F5), Hawkes self-exciting processes (F14),
the basic reproduction number (F15), the Generalized Pareto Distribution (F16), the
Ogata thinning algorithm (F17), the SIR model (F19), "Pearl's do-calculus" (§5), the
Leontief input-output model (F24), the Kolmogorov-Smirnov test (F32), Mulberry32 (F1)
and `xoshiro128**` (F37).

Four of these carry an author-date attribution and nothing else:

| Line | Text | Status |
|---:|:---|:---|
| 511 | ``0.25`` is the reporting bias factor (Romanosky 2016, Advisen) | no entry |
| 529 | P-value approximation (Marsaglia et al. 2003, simplified with Stephens correction) | no entry |
| 544 | Based on Gordon & Loeb (2002) | no entry |
| 587 | Sources: Advisen cyber loss data, NetDiligence claims studies (2020-2025) | no entry |

Line 587 is the worst of the four. It sits under a five-row table of Loss Development
Factors — twenty numbers presented as actuarial fact — attributed to two named
commercial claims datasets with no citation, no year, no page and no table reference.
A reader has no way to check any of the twenty numbers.

Fix (not applied): add a reference list. Where a figure came from Advisen or
NetDiligence, cite the specific study. Where it did not, label the table modelled.

### F-ML-02. Two named models are invoked as the label for formulas that do not implement them. CONFIRMED.

File: `references/MP-Math-Physics-Formula/MP_Mathematical_Models.md`.

**Line 174, §5 heading:** "Pearl's do-calculus implemented as layer-specific causal
mechanisms." What follows (F20-F27) is a forward simulation of structural equations with
exogenous noise. That is a structural causal model, which is legitimate. **Do-calculus is
a specific set of three rewrite rules for identifying interventional distributions from
observational data. None of the three appears anywhere in the document.** The name is
doing authority work the content does not support.

**Line 403, F24 heading:** "L4 ; Geopolitical Propagation (Leontief Input-Output)". The
formula given is

    P_cascade = 0.6 + U x 0.3   if production_loss > 50%
              = prod_loss/100 x 0.4   otherwise
    geo_amplifier = g_risk x (1 + P_cascade x 0.5)

A Leontief input-output model requires a technical coefficients matrix `A` and the
Leontief inverse `(I - A)^-1`. Neither appears. Nothing in F24 is an input-output model.

Fix: drop both names, or implement them.

### F-ML-03. `WG-03-ML-Autonomous-OT-Trust-Boundary.md` has no bibliography and opens on an uncited, misdescribed empirical claim. CONFIRMED.

File: `references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Autonomous-OT-Trust-Boundary.md`,
264 lines, zero citations.

Line 3, the first sentence of the abstract:

> In 2016, landmark demonstrations revealed that reinforcement learning algorithms could
> reduce data center cooling energy by up to 40% when granted real-time write access to
> chiller setpoints and pump speeds.

Two problems. First, the 40% figure is uncited. Second, and more serious: the 2016 result
this is unmistakably referring to was a **recommendation** system whose outputs were
applied by human operators. Direct algorithmic control came later and under a human-
approved, bounds-checked safety envelope. The paper's entire thesis is that write access
is the hazard, and it opens by asserting that the canonical 2016 demonstration *had*
write access. That is the paper's own claim turned against itself, exactly as F1 in
`findings.md` describes for 49.85 Hz. I have no web access, so I mark the "40% is real"
half **UNVERIFIABLE** and the "no citation" half **CONFIRMED**; the write-access
mischaracterisation I rate **PROBABLE** on the strength of the argument above.

Line 13: "Energy costs account for over 60% of the operational expense of running
high-density AI clusters." Uncited. Specific. Load-bearing for §1.

Also invoked as established with no citation: Nassim Taleb's Mediocristan/Extremistan
(§3, the whole section), Lyapunov stability theory (§5.2), Lipschitz continuity (§5.2),
the Shannon-Hartley capacity theorem (§5.3, written out as
`C = B log2(1 + S/N)` without attribution), the Reynolds transition criterion
`Re < 2,300` (§4), CyHAZOP (§4), IEC 61508/61511/61131-3, EN 50126, IEC 62443,
Lloyd's Y5381, EU NIS2 and the EU CRA.

### F-ML-04. The Lyapunov instability argument commits the converse error. CONFIRMED.

File: `WG-03-ML-Autonomous-OT-Trust-Boundary.md`, lines 158-166.

The derivation up to line 160 is correct. For `V(x) = ½ xᵀPx` and
`ẋ = A x + B π_θ(x)`:

    V̇ = xᵀPẋ = ½ xᵀ(AᵀP + PA)x + xᵀPB π_θ(x)

That is exactly what the document writes. ✓

Line 164 then states, with `Q = -(AᵀP + PA)`:

    ∃ x* ∈ X_operational such that ||∇_x π_θ(x*)|| > λ_min(Q) / (2||PB||)

and line 166 concludes: "In the neighborhood of `x*`, the system enters a self-exciting
limit cycle or divergent oscillation."

The inequality is the **negation of a sufficient condition for stability**, derived from
the bound `|xᵀPBπ(x)| ≤ ||PB|| ||x|| ||π(x)||` together with
`½xᵀQx ≥ ½λ_min(Q)||x||²`. Failing a sufficient condition establishes nothing about
instability. The system may be perfectly stable with a different Lyapunov certificate
`P`. Concluding divergence from it is a converse error.

There is a second, smaller slip: the sufficient condition constrains the **global
Lipschitz constant** `sup ||∇π||`, not the gradient norm at one point `x*`. A large
gradient at a single point is a lower bound on the Lipschitz constant only, and the
document has already conceded on line 162 that `π_θ` is not globally Lipschitz.

Fix: restate as "the standard quadratic Lyapunov certificate fails to establish
stability", which is true, defensible and still supports the paper's argument. Do not
claim it establishes instability.

### F-ML-05. The 45-second thermal cliff is arithmetically impossible on the document's own numbers. CONFIRMED. This is the F1-class error in this scope.

Files, all sharing one thermal model:
- `WG-03-ML-Cognitive-Bias-Catalog.md` §5, lines 224-246 (timeline at 236-243)
- `WG-03-ML-Loman-Operator-Topology-of-an-Act.md` §6, lines 216-238
- `WG-03-ML-Morphogenesis-Signifying-Chain-gGNN.md` §9.2, lines 384-392
- `WG-03-ML-Calculus-of-the-Subject.md` §8.2, lines 337-346
- `WG-03-ML-Musical-Psychometric-Notation.md` §10.2, lines 589-591 (claim at 591)

Stated parameters (`Cognitive-Bias-Catalog.md` lines 229-231, repeated verbatim in
`Loman` lines 221-223):

    P_die       = 1,200 W
    C_thermal   = 142 J/K
    heat flux   > 140 W/cm²

Stated timeline (`Loman` lines 230-234, the fullest version):

    T =  0.0s: Primary pump trips. Volumetric flow collapses to zero.
    T = 12.0s: Die temperature rate of change exceeds 4.2°C/s.
    T = 20.0s: Operator notices alarm.
    T = 38.0s: Thermal throttling threshold (85°C) breached.
    T = 45.0s: Irreversible silicon package delamination (> 94°C).

```
$ python3 -c "
P=1200.0; C=142.0
print('adiabatic dT/dt = P/C =', round(P/C,2),'C/s')
print('12s(45C)->38s(85C) implied rate:', round((85-45)/(38-12),3),'C/s')
print('38s(85C)->45s(94C) implied rate:', round((94-85)/(45-38),3),'C/s')
print('T(45) if 4.2 C/s held from t=12 with T(12)=45C:', round(45+4.2*33,1),'C')
print('T(12) required for 85C at t=38 at 4.2 C/s:', round(85-4.2*26,1),'C')
print('time 45C->94C at the adiabatic rate:', round((94-45)/(P/C),2),'s')
"
adiabatic dT/dt = P/C = 8.45 C/s
12s(45C)->38s(85C) implied rate: 1.538 C/s
38s(85C)->45s(94C) implied rate: 1.286 C/s
T(45) if 4.2 C/s held from t=12 with T(12)=45C: 183.6 C
T(12) required for 85C at t=38 at 4.2 C/s: -24.2 C
time 45C->94C at the adiabatic rate: 5.8 s
```

(45 °C is the documents' own `T <= 45°C` OBOM operating ceiling, used as the most
favourable starting point. Any lower start makes the contradiction worse.)

Four separate contradictions, from the documents' own numbers:

1. With flow collapsed to zero at `T=0`, the rate is `P/C = 8.45 °C/s`, not 4.2 °C/s.
2. If the stated 4.2 °C/s held from `t=12 s`, the die would be at **183.6 °C at 45 s**,
   not 94 °C. To be at 85 °C at 38 s it would have to have started at **-24.2 °C**.
3. The two temperature checkpoints imply **1.54 °C/s then 1.29 °C/s** — the rise
   *decelerates* — while the prose asserts an accelerating runaway above 4.2 °C/s with
   cooling at zero. A runaway cannot decelerate.
4. At the document's own adiabatic rate, 94 °C arrives at **5.8 s**, not 45 s. The
   "45-second cliff" is roughly eight times too long, and the entire operator-latency
   argument (`Cognitive-Bias` §5: "If cognitive bias induces a decision latency > 35
   seconds, the physical facility crosses the 45-second thermal trip cliff") is sized
   against a window that does not exist.

This is precisely the class of error described in the brief: a term dropped from a
standard equation and nobody re-derived it. Here the convective term
`h_conv·A_die·(T_j - T_coolant)` is written into the equation and then ignored when the
timeline is authored, while the timeline is simultaneously incompatible with the
convective term being *retained*. Neither reading closes.

Fix: pick one. Either the rate (8.45 °C/s adiabatic, cliff ≈ 6 s) or the window (45 s,
which requires `C_thermal ≈ 1,100 J/K` or substantial residual cooling). Then rebuild
the operator-latency argument against whichever survives. Do not publish both.

### F-ML-06. The Neo-Riemannian PLP transformation is wrong. CONFIRMED.

File: `WG-03-ML-Musical-Psychometric-Notation.md`, §2.7, line 215.

| Register State | Operation | Harmonic Movement | Meaning |
|---|---|---|---|
| **Crisis Threshold** | PLP (Compound) | C Major → D♭ Major | Extreme shift, Seldon Crisis |

The three primitive rows above it (R: C major → A minor; L: C major → E minor;
P: C major → C minor) are all correct. The compound is not.

```
$ python3 -c "
NAMES={0:'C',1:'Db',2:'D',3:'Eb',4:'E',5:'F',6:'Gb',7:'G',8:'Ab',9:'A',10:'Bb',11:'B'}
def maj(r): return (frozenset({r%12,(r+4)%12,(r+7)%12}),'major',r%12)
def mnr(r): return (frozenset({r%12,(r+3)%12,(r+7)%12}),'minor',r%12)
def show(t): return NAMES[t[2]]+' '+t[1]
def P(t): return mnr(t[2]) if t[1]=='major' else maj(t[2])
def L(t): return mnr((t[2]+4)%12) if t[1]=='major' else maj((t[2]+8)%12)
c=maj(0); x=P(c); x=L(x); x=P(x)
print('PLP(C major) =', show(x), sorted(x[0]))
print('doc claims   = Db major', sorted(maj(1)[0]))
print('match?', x[0]==maj(1)[0])
"
PLP(C major) = Ab minor [3, 8, 11]
doc claims   = Db major [1, 5, 8]
match? False
```

`PLP(C major) = A♭ minor` — the hexatonic pole, which is the single most famous result in
the literature the paper cites (Cohn 1998 is entry 2 in its own reference list). A♭ minor
and D♭ major share exactly one pitch class. The error is not a near miss.

Fix: `C Major → A♭ minor (hexatonic pole)`. The "extreme shift" reading survives intact —
the hexatonic pole is the maximally distant triadic relation, which is a *better* fit for
the paper's crisis semantics than D♭ major was.

### F-ML-07. The control-room acoustic wave equation adds a vector to a scalar. CONFIRMED.

File: `WG-03-ML-Musical-Psychometric-Notation.md`, §10.2.1, line 596.

    ∇²p(r,t) - (1/c_s²) ∂²p(r,t)/∂t² = -ρ₀ ∂q(r,t)/∂t - μ ∇p(r,t)

The left side and the first right-hand term are the standard inhomogeneous acoustic wave
equation and are correct: `ρ₀ ∂q/∂t` has units kg·m⁻³·s⁻² = Pa·m⁻², matching `∇²p`. The
constants are also right — `c_s = 343 m/s` and `ρ₀ = 1.204 kg/m³` are both correct for
air at 20 °C.

The final term is not. `∇p` is a **vector field**; every other term in the equation is a
**scalar**. The equation as written is not well-formed. Separately, damping in acoustics
enters as a term in `∂p/∂t` (or `∇²(∂p/∂t)` for thermoviscous loss), never as a
first-order spatial gradient — a `∇p` term is advective, not dissipative, and would
describe a moving medium, not absorptive baffles.

Fix: `- μ ∂p/∂t` on the right, with `μ` in units of s·m⁻² (or fold absorption into a
complex wavenumber and drop the term).

### F-ML-08. Three cited McKenney works have no file anywhere in the repository. CONFIRMED.

```
$ for t in "Topological Cyber-Physics" "Psychohistory and the Digital Twin" "Symphonic Calculus: Glossary"; do
    grep -rl "$t" . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.next; done

Topological Cyber-Physics:
  references/MP-Math-Physics-Formula/MP_Kramers_Escape_Model.md
  web/src/content/references/Kramers_Escape_Model.md          <- same doc, web copy
  web/src/lib/generatedReferencesContent.json                 <- same doc, build artefact
Psychohistory and the Digital Twin:
  references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Mckenney-Lacanian.md
  web/src/content/references/Lacanian_Psychohistory_Framework.md   <- same doc, web copy
  notes/2026-09-03/site-critical-review.md                         <- an audit note
Symphonic Calculus: Glossary:
  references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Musical-Psychometric-Notation.md
  papers-pre-publish/Research_equations/RSCH-39-...md               <- unpublished draft
  papers-pre-publish/Research_equations/RSCH-37-...md               <- unpublished draft
```

| Cited work | Cited in | Line | Any file behind it |
|:---|:---|---:|:---|
| McKenney, J. (2025). *Topological Cyber-Physics: Foundations of the Digital Twin*. Eigenia Labs working paper. | `MP_Kramers_Escape_Model.md` `[3]` | 45 | **none** |
| Mckenney, J. (2022). *Psychohistory and the Digital Twin: Modeling the Adversary* | `WG-03-ML-Mckenney-Lacanian.md` `[3]` | 87 | **none** |
| McKenney, J. (2025). *McKenney-Lacan Symphonic Calculus: Glossary & Briefing*. AEON Research Division. | `WG-03-ML-Musical-Psychometric-Notation.md` | 558 | **none** (two `papers-pre-publish/` drafts mention the name; neither is this work, neither is published) |

All three are the only self-citation in their document. `Topological Cyber-Physics` is
the more serious of the three because it is the sole source offered for the paper's
central move — the mapping of a physical-chemistry rate law onto graph topology. Strip it
and the mapping is unsourced.

These are three new rows for `notes/2026-09-06/citation-web-register.md`, which currently
lists seven self-cited works and states that it covers WG-04-CF only. That register is
now known to be incomplete by at least three.

Fix: per the register's own rule, either write the works or relabel the citations as the
present authors' own synthesis. Do not leave a citation pointing at nothing.

### F-ML-09. `MP_Kramers_Escape_Model.md` states a Mean Time to Compromise that has no time units. CONFIRMED.

File: `references/MP-Math-Physics-Formula/MP_Kramers_Escape_Model.md`, lines 12-33.

    k = A exp(-ΔE / k_B T)                      (line 12)
    A  = "connectivity density of the actor's neighborhood in the graph"  (line 16)
    ΔE = "function of the shortest path distance and edge weight sum"     (line 23)
    k_B T = "Threat Temperature ... APT = 1.5, Nation-State = 2.0"        (line 18)
    MTTC = 1/k                                  (line 31)
    "This metric provides a temporal forecast of how long a specific actor
     will take to breach a specific segment."   (line 33)

`ΔE` and `k_B T` are both dimensionless graph quantities, so the exponential is
dimensionless. `A` is a connectivity density — a count per node, dimensionless. Therefore
`k` is dimensionless and `MTTC = 1/k` is dimensionless. **No unit of time enters the model
at any point**, yet the output is asserted to be a temporal forecast, and downstream
consumers ("how long ... to breach") will read it as hours or days.

In Kramers' actual theory the prefactor carries the units: for overdamped dynamics
`k = ω_a ω_b / (2πγ) · exp(-ΔE/k_BT)`, where the friction coefficient γ supplies s⁻¹.
Replacing that prefactor with a dimensionless graph statistic removes the clock.

Note also line 6: the model is introduced as "Kramers' Transition State Theory". Kramers
1940 and transition state theory (Eyring, Evans and Polanyi, 1935) are two different
results with different prefactors; the document's `[1]` and `[2]` are correct and real,
but the phrase conflates them. Line 10 does honestly say "Arrhenius-like", which is the
accurate description of what is actually written.

Fix: either state the calibration that converts `k` into a rate per unit time and cite
it, or rename `MTTC` to an ordinal ranking and stop describing it as temporal.

### F-ML-10. `MP_Mathematical_Models.md` F6 compares a CVaR against a VaR and calls both CVaR. CONFIRMED.

File: `MP_Mathematical_Models.md`, F6, lines 130-143.

    GvP Ratio = CVaR_99^actual / (μ + 2.33σ)
    const gaussianCvar99 = gaussianMean + 2.33 * gaussianStddev;

`μ + 2.33σ` is the Gaussian **VaR** at 99% (`z_0.99 = 2.3263`). The Gaussian **CVaR** at
99% is `μ + σ·φ(z)/0.01 = μ + 2.665σ`.

```
$ python3 -c "
from statistics import NormalDist
nd=NormalDist(); z=nd.inv_cdf(0.99)
print('z_0.99                      =', round(z,4))
print('Gaussian CVaR99 multiplier  =', round(nd.pdf(z)/0.01,4))
print('inflation of the ratio for mu=0 =', round((nd.pdf(z)/0.01)/2.33,3),'x')
"
z_0.99                      = 2.3263
Gaussian CVaR99 multiplier  = 2.6652
inflation of the ratio for mu=0 = 1.144 x
```

The metric's stated purpose is to "measure how wrong a Gaussian assumption would be", with
"values > 2.0 indicate the Gaussian model is dangerously inadequate". Dividing a tail
*mean* by a tail *quantile* inflates that ratio by about 14% for `μ = 0` before any real
fat-tail effect is measured, and moves values across the stated 2.0 decision threshold.

Fix: `gaussianCvar99 = gaussianMean + 2.665 * gaussianStddev`, or rename the metric to
compare like with like.

### F-ML-11. `MP_Mathematical_Models.md` F30 claims a clamp guarantees finite variance. It guarantees a finite mean. CONFIRMED.

File: `MP_Mathematical_Models.md`, F30, lines 493-502.

> Clamped to `[1.5, 3.0]` to guarantee finite variance.

A Pareto distribution has finite variance iff `α > 2` and finite mean iff `α > 1`. A
clamp with a **lower bound of 1.5** permits `α = 1.5`, whose variance is infinite. The
clamp guarantees a finite mean, not a finite variance.

This matters downstream. F28 draws severities from `Pareto(α, x_min)` with this `α`, and
F5/F6 compute a sample CVaR and a standard deviation from those draws. With `α ≤ 2` the
sample standard deviation does not converge and `gaussianStddev` in F6 is not estimating
anything.

The estimator itself is correct. I verified it recovers `α` exactly from exact quantiles:

```
$ python3 -c "
from math import log
for alpha in (1.2,1.8,2.5,3.7):
    xmin=100000.0
    P75=xmin*(1-0.75)**(-1/alpha); P90=xmin*(1-0.90)**(-1/alpha)
    print(f'  true alpha={alpha}  doc-formula estimate={log(0.25/0.10)/log(P90/P75):.6f}')
"
  true alpha=1.2  doc-formula estimate=1.200000
  true alpha=1.8  doc-formula estimate=1.800000
  true alpha=2.5  doc-formula estimate=2.500000
  true alpha=3.7  doc-formula estimate=3.700000
```

Fix: change the sentence to "to guarantee a finite mean", or raise the lower clamp to
2.0 if finite variance is actually required.

### F-ML-12. `MP_Mathematical_Models.md` F39 contains a dead term and an unreachable clamp, and the prose describes behaviour the formula does not produce. CONFIRMED.

File: `MP_Mathematical_Models.md`, F39, lines 510-525 of §8.

    P_detect = min(0.95, (SL-T/4) x 0.5 x Z_cross x G_penalty)
    G_penalty = 0.05 if SL-T = 0 ("unprotected zone, 95% detection reduction"), else 1.0

```
$ python3 -c "
for slt in (0,1,2,3,4):
    for zc in (1.3,1.0):
        gp = 0.05 if slt==0 else 1.0
        print(f'  SL-T={slt} Z={zc}: {min(0.95,(slt/4)*0.5*zc*gp):.4f}')
"
  SL-T=0 Z=1.3: 0.0000
  SL-T=0 Z=1.0: 0.0000
  ...
  SL-T=4 Z=1.3: 0.6500
  SL-T=4 Z=1.0: 0.5000
```

Two defects:

1. When `SL-T = 0` the leading factor `SL-T/4` is already zero, so `P_detect = 0` exactly.
   `G_penalty = 0.05` multiplies zero and has no effect whatsoever. The prose's "95%
   detection reduction" describes an intent the arithmetic does not implement — the actual
   behaviour is 100% detection failure, which is a materially different modelling claim
   and silently makes unprotected zones perfectly undetectable in every Monte Carlo walk.
2. The maximum attainable value is `0.65`, so the `min(0.95, ...)` cap can never bind.

Fix: if the intent is a floor plus a penalty, write `P_detect = min(0.95, (0.1 + SL-T/4 x
0.5) x Z_cross x G_penalty)` or similar, and re-check the cap. As written the cap is
decoration.

### F-ML-13. `MP_Mathematical_Models.md` F10 is titled "14-Dimension" but states an 11-factor product, and two of the 14 rows are the same formula. CONFIRMED.

File: `MP_Mathematical_Models.md`, F10, lines 192-220.

The stated equation is

    w = w_base x M_EPSS x M_CVSS x M_KEV x M_SLT x M_TACAM x M_ERIKA
        x M_ΔEPSS x M_CMS x M_GPR x M_Born

which is a base weight plus **10** modifiers, 11 factors in total. The table below it
lists **14** rows. The equation omits rows 12 (Layer CPT), 13 (EPSS velocity boost) and
14 (Spectral boost).

Rows 8 and 13 are character-for-character the same formula:

    #8  | EPSS delta 30d           | 1.0 + min(delta_30d * 3.0, 0.5)
    #13 | EPSS velocity boost (B1) | 1.0 + min(delta_30d * 3.0, 0.5)

§10 (line 767) confirms these are the same signal applied twice: "The boost is applied
both during edge weight computation (F10, dimension 8) and as a per-walk overlay (F11,
dimension 13)." One signal applied at two stages is not two dimensions, and if both
multiply into the same walk weight, a rising-EPSS CVE is boosted up to `1.5² = 2.25x`,
not the `1.5x` the table's stated range implies.

Row 12 also misstates its own range: it gives `0.15 ; 0.90`, but the maximum value in the
`LAYER_CPT` dictionary at line 179-184 is `0.85` (`L3->L5`).

Fix: write the equation with all 14 factors or retitle to 11 dimensions; merge rows 8 and
13, or state explicitly that the boost compounds and give the compounded range; correct
row 12's upper bound to 0.90 → 0.85.

### F-ML-14. The Kolmogorov-Smirnov test is applied with parameters estimated from the same sample. PROBABLE.

File: `MP_Mathematical_Models.md`, F32, lines 519-534.

    D_n = max_i | F_emp(x_i) - F_Pareto(x_i) |
    F_Pareto(x) = 1 - (x_min/x)^α
    Good fit if D_n < 1.36 / sqrt(n) at alpha=0.05.

The `λ = (√n + 0.12 + 0.11/√n)·D_n` Stephens transform and the
`p ≈ 2(e^{-2λ²} - e^{-8λ²} + e^{-18λ²})` series are both stated correctly, and
`1.36/√n` is the correct 5% critical value **for a fully specified null distribution**.

But `α` comes from F30 and `x_min` from F31, both estimated from the same data the test
is applied to. Estimated parameters make the empirical CDF fit better than chance, `D_n`
is biased downward, and the tabulated critical values are anticonservative — the test
will accept Pareto fits it should reject. The standard remedies are a Lilliefors-type
table or a parametric bootstrap of the null distribution.

I rate this PROBABLE rather than CONFIRMED because I cannot inspect `ale-engine.ts` to
confirm the same rows feed both the fit and the test; the document says they do
(F30 and F31 both cite `ale-engine.ts` line ranges inside the same engine as F32) but I
have only the document.

Fix: bootstrap the null, or state plainly that the reported p-value is anticonservative.

### F-ML-15. F33 states Gordon-Loeb as an equality; its own prose states it as a bound. CONFIRMED.

File: `MP_Mathematical_Models.md`, F33, lines 536-544.

    Heading:  "Maximum economically rational security spend"
    Formula:  I* = ALE / e ≈ ALE x 0.368
    Prose:    "Based on Gordon & Loeb (2002): optimal investment never exceeds 1/e of expected loss."

The Gordon-Loeb result is an **upper bound** on optimal investment across their two
classes of security breach probability functions — the optimum is `≤ v·L/e`, and for most
parameter values it is strictly below. Writing `I* = ALE/e` converts a ceiling into a
recommendation. A reader taking `I*` as the optimum will systematically over-recommend
spend, in a document whose stated purpose is insurance pricing.

Fix: `I*_max = ALE/e` and rename the variable, so the formula agrees with the sentence
below it.

### F-ML-16. `WG-03-ML-Morphogenesis-Signifying-Chain-gGNN.md` swaps the attributions of its two GGNN references, and the appendix that should define the discourse permutations is empty. CONFIRMED.

File: `references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Morphogenesis-Signifying-Chain-gGNN.md`.

**Attribution swap, line 18:**

> The gGNN, as detailed by Li et al. 1 and further explored in sequential modeling by
> Microsoft Research 2, provides a substrate where...

Against the works cited (lines 350-351):

    1. Gated Graph Neural Networks ; Graph4NLP v0.4.1 documentation - GitHub Pages
    2. GATED GRAPH SEQUENCE NEURAL NETWORKS - Microsoft, .../1511.05493.pdf

Entry 2 **is** Li et al. (arXiv 1511.05493, *Gated Graph Sequence Neural Networks*),
hosted on a Microsoft domain. Entry 1 is third-party library documentation. So "Li et al.
[1]" points at the library docs and "Microsoft Research [2]" points at Li et al. The two
are exactly transposed, and the effect is to credit a corporate lab for a named-author
paper the same sentence already names. The canonical reference the brief asked me to
check for — Li, Tarlow, Brockschmidt and Zemel 2015 — **is present**, so this is a
mis-pointing, not a missing source.

**Empty appendix, lines 297-300 (A.1):**

    * Master: X_M =^T
    * University: X_U =^T
    * Hysteric: X_H =^T
    * Analyst: X_A =^T

The section is titled "Adjacency Permutations for Discourses" and promises "the
permutation matrices `P_σ` corresponding to the quarter turn". Every one of the four
definitions is empty — the LaTeX content between `=` and `^T` is gone. The technical
appendix therefore defines none of the four permutations the entire simulation section
depends on. A reader cannot reproduce Simulations A, B or C.

**Uncited named method, line 79:** the `S_2` matheme is specified as a "Dense Semantic
Embedding ... (e.g., Word2Vec average)". Word2Vec is a named external method and does not
appear in the works cited.

**Everything else in this document's citation apparatus checks out.** The bracketed
markers run `[1]`, `[6]`, `[7]`, `[10]`, `[12]`, `[16]`, `[17]`, `[18]`, `[20]` against a
20-entry bibliography; the unbracketed markers fused into prose (`Li et al. 1`,
`CB5T.3`, `.9`, `Standard GRUs 14`, `.11`) all resolve within range. Highest cited index
20, bibliography 20 entries, zero out of range. GGNN, GRU, CB5T, Psychological Entropy,
Friston's free energy principle and the cusp catastrophe are each cited.

### F-ML-17. The Lacanian formalisations are the working group's own and are not labelled as such. CONFIRMED, and it is the smallest of the citation findings.

The brief flagged this class specifically. My reading is that the corpus is closer to
compliant here than expected, and I am not going to inflate it.

`Morphogenesis` is honest about authorship: "This treatise establishes the **Lacanian
Gated Graph Neural Network (L-gGNN)**", "The core innovation of this model is the
modification of the standard Gated Recurrent Unit". The Lacanian source material is cited
to real intellectual history; the *formalisation* is claimed, correctly, as new.
`Calculus-of-the-Subject` is a survey of other people's mathematics-of-Lacan with 39
citations and does not claim the formalisations as its own.

Two constructs do read as established when they are not:

- **`WG-03-ML-Mckenney-Lacanian.md`, line 30:** "The foundational mathematical object of
  L4 is the **Psychometric Tensor**", followed by `P_i = [DISC] ⊗ [OCEAN]`. Presented as
  a definition of a standing object rather than a proposal. There is no source for the
  claim that a Kronecker product of a DISC matrix and a Big Five vector is a meaningful
  psychometric space, and DISC and the Big Five are not commensurable measurement scales.
  The dimension arithmetic itself is correct: a 2×2 DISC matrix ⊗ a 1×5 OCEAN vector gives
  a 2×10 array, 20 elements, matching the stated "20-dimensional object".

- **`WG-03-ML-Loman-Operator-Topology-of-an-Act.md`, line 38:** "Traditional engineering
  reliability models (e.g., MIL-HDBK-217F) model humans as static error probabilities
  (HEPs)." MIL-HDBK-217F is *Reliability Prediction of Electronic Equipment*. It models
  component failure rates. It contains no human error model; HEPs come from THERP
  (NUREG/CR-1278) or HEART. The document sets up its whole thesis by knocking down a
  claim the named standard does not make. I rate this **PROBABLE** rather than CONFIRMED
  because I have no web access to open the handbook, but I am confident in the
  characterisation.

Fix: label the Psychometric Tensor "novel synthesis" per `CLAUDE.md`; replace
MIL-HDBK-217F with THERP or HEART, or drop the parenthetical.

### F-ML-18. `WG-03-ML-Musical-Psychometric-Notation.md` §5.2 reports a fabricated empirical study. CONFIRMED. This is the most serious uncited quantitative claim in the scope.

File: `WG-03-ML-Musical-Psychometric-Notation.md`, §5.2 "Lead Time Analysis", lines
490-495.

> In retrospective analysis of 15 Seldon Crisis events:
> - Average lead time from dissonance spike to cascade onset: **22 minutes**
> - Minimum lead time: 8 minutes
> - Maximum lead time: 47 minutes
>
> This provides actionable early warning for intervention.

This is written as an empirical result: a sample size, a mean and a range. There is no
dataset, no method, no period, no organisations, no citation. "Seldon Crisis" is the
paper's own construct, named after Asimov (also uncited); no corpus of fifteen such
events exists to have been analysed retrospectively.

It is also the sole support for the paper's headline claim, which appears twice at the
top of the document:

- line 14 (executive abstract): "MPN provides defensive teams with a **15 to 30 minute**
  early warning of organizational collapse"
- line 18 (abstract): "dissonance detection providing **15-30 minute** early warning"

Those two abstracts state a range that does not match the study directly below them:
mean 22 with a range of 8 to 47. The abstract's interval is neither the study's range nor
any interval derivable from a mean of 22 and n = 15 without a standard deviation the
document does not give. So the claim is uncited *and* internally inconsistent with the
only evidence offered for it.

Fix: strike §5.2 or label it a design target. If MPN has never been run against a real
incident — and nothing in the document suggests it has — the abstract must say
"designed to provide", not "provides".

Two further uncited named methods in this document, both real and both absent from its
four-entry reference list:

- line 585, "**Plomp-Levelt** psychoacoustic curves" — Plomp & Levelt 1965 is a real and
  citable paper on tonal consonance and critical bandwidth. It is the entire basis of the
  document's dissonance metric and it is not in the references.
- line 14, "**Isaac Asimov's** 'Seldon Crisis'" — the source of the paper's central
  detection concept, uncited.

Also, minor but concrete: the live dashboard mock at line 423 reads
`DISSONANCE: 0.42 (Mild Tension)`, while §2.8's own table at lines 245-246 places
0.4-0.6 in the "Dissonant (Minor 2nd) / Stress, conflict" band and 0.2-0.4 in "Mild
tension". The worked example contradicts its own scale.

### F-ML-19. The "Applied Systems Assurance" appendix appears in three documents, after the bibliography, with no citations and mutually contradictory numbers. CONFIRMED.

```
$ grep -rn "Applied Systems Assurance" references/WG-03-ML-Behaviorial_Modeling/ references/MP-Math-Physics-Formula/
Calculus-of-the-Subject.md:318      ## 8. Applied Systems Assurance: Threat Modeling and Actuarial Formalism
Morphogenesis-...-gGNN.md:372       ## 9. Applied Systems Assurance: Cyber-Physical Threat Modeling and Actuarial Formalism
Musical-Psychometric-Notation.md:568 ## 10. Applied Systems Assurance: Cyber-Physical Grounding and Actuarial Underwriting
```

In all three cases the section sits **after** the document's `#### Works cited` /
`## References` heading, so nothing in it can be covered by the bibliography above it,
and a reader scrolling to the references will believe they have reached the end.

Each instance names, with zero citations: DEXPI 2.0 (ISO 15926), CycloneDX 1.6+, HBOM /
SBOM / CBOM / OBOM / VEX, Caliptra 2.0, OpenSIL, DICE, IEC 62443, EN 50126,
**Lloyd's Y5381**, **EU CRA Article 64**, and SFAIRP. Lloyd's Y5381 and EU CRA Article 64
are the two that most need a citation: both are specific legal instruments being invoked
to make an underwriting argument, and a reader has no way to verify either.

The same block, with the same structure and different numbers, also appears in
`Autonomous-OT-Trust-Boundary.md` §5.4-5.5, `Cognitive-Bias-Catalog.md` §7 and
`Loman-Operator.md` §8. Six of my seven WG-03-ML documents carry it. (`grep -rn "ROSI"`
shows the same pattern across WG-01, WG-02, WG-04 and WG-05, which are other auditors'
scope.)

The numbers do not agree with each other, which is the proof that they are not
measurements of anything:

| Quantity | Autonomous-OT | Calculus §8 | Cognitive-Bias §7 | Loman §8 | Morphogenesis §9 | Musical §10 |
|:---|---:|---:|---:|---:|---:|---:|
| ALE unmitigated | $14,200,000 | $12,400,000 | $9,200,000 | $9,850,000 | $11,800,000 | $8,900,000 |
| ALE hardened | $45,000 | $920,000 | $310,000 | $310,000 | $420,000 | $280,000 |
| Control cost | $65,000 | $350,000 | $180,000 | $220,000 | $380,000 | $195,000 |
| BI loss rate | $18,500/h | $18,500/h | $24,000/h | $24,000/h | $24,000/h | $24,000/h |
| $120,000 is the cost of | one tray | one accelerator tray | — | — | one **blade** | — |
| Silicon threshold | 94.0 °C (trip 90.0) | 94.0 °C | 94.0 °C (trip 85.0) | 94.0 / 85.0 °C | 94.0 °C | 94.0 °C |
| dT_j/dt | 4.5 °C/s | — | 4.2 °C/s | 4.2 °C/s | 4.2 °C/s | — |
| Heat flux | > 100 W/cm² | > 140 W/cm² | > 140 W/cm² | > 140 W/cm² | > 140 W/cm² | > 140 W/cm² |

The same modelled 100 MW facility has a die heating rate of both 4.2 and 4.5 °C/s, a heat
flux of both >100 and >140 W/cm², and a SIL-3 trip at both 85.0 and 90.0 °C. None of the
seven quantities carries a citation or a "modelled" label anywhere.

**The arithmetic inside each block is correct.** I checked all six:

```
$ python3 -c "
cases=[('Calculus',12_400_000,920_000,350_000,'3,180%'),
('CognitiveBias',9_200_000,310_000,180_000,'4,838%'),
('Loman',9_850_000,310_000,220_000,'4,236%'),
('Morphogenesis',11_800_000,420_000,380_000,'2,895%'),
('Musical',8_900_000,280_000,195_000,'4,320%'),
('AutonomousOT',14_200_000,45_000,65_000,'>21,000%')]
for n,u,h,c,claim in cases:
    print(f'{n:15s} ROSI={((u-h)-c)/c*100:10.2f}%   doc says {claim}')
"
Calculus        ROSI=   3180.00%   doc says 3,180%
CognitiveBias   ROSI=   4838.89%   doc says 4,838%
Loman           ROSI=   4236.36%   doc says 4,236%
Morphogenesis   ROSI=   2894.74%   doc says 2,895%
Musical         ROSI=   4320.51%   doc says 4,320%
AutonomousOT    ROSI=  21676.92%   doc says >21,000%
```

Every one is right to the digit. That is the point: correct arithmetic on invented inputs
produces a number that looks derived. Five of the six then describe the output as a
"**verified** Return on Security Investment". Nothing has been verified. This is the F10
error class from `findings.md` — fabricated precision beside a real calculation — at six
times the scale.

Fix: label the whole block modelled, state the reference facility the parameters describe
(as `findings.md` does for RefDNSP-1.2M), reconcile the seven contradictory physical
constants to one set, and delete the word "verified" from all six.

### F-ML-20. Two unit-accounting errors inside the actuarial blocks. CONFIRMED.

**(a) `Morphogenesis` line 402:**

> `C_replacement` is the capital asset replacement cost ($120,000 USD per server blade;
> $14,400,000 USD per 120-rack hall).

```
$ python3 -c "print('14,400,000 / 120 racks =', 14_400_000/120, 'USD per RACK')"
14,400,000 / 120 racks = 120000.0 USD per RACK
```

The two figures in the same parenthesis are only consistent if a 120 kW rack contains
exactly **one** blade. Across the corpus the identical $120,000 is called a tray
(`Autonomous-OT` line 183), an accelerator tray (`Calculus` line 356) and a blade
(`Morphogenesis` line 402), while the hall arithmetic requires it to be a rack.

**(b) `Cognitive-Bias-Catalog` §7.1, line 294:**

> In hyperscale campus environments containing **800 liquid-cooled racks across four
> contiguous halls** ... The Probable Maximum Loss escalates from $14,400,000 USD for a
> single hall to $57,600,000 USD in hardware damage

```
$ python3 -c "
print('4 halls x 14.4M =', 4*14.4e6)
print('800 racks / 4 halls =', 800/4, 'racks per hall, vs the defined 120-rack hall')
print('800 racks x 120,000/rack =', 800*120000)
"
4 halls x 14.4M = 57600000.0
800 racks / 4 halls = 200.0 racks per hall, vs the defined 120-rack hall
800 racks x 120,000/rack = 96000000
```

$57.6M is `4 × $14.4M`, which is 480 racks. The sentence says 800 racks. On the
document's own $120,000-per-rack unit cost, 800 racks is **$96,000,000** — the stated PML
understates its own premise by $38.4M, inside a paragraph whose whole purpose is
reinsurance attachment-point sizing.

The 800-rack figure is itself internally consistent elsewhere: `Musical` line 605 says
"a 100 MW campus facility containing 800 liquid-cooled racks operating at 120 kW per
rack", and 800 × 120 kW = 96 MW ≈ 100 MW. So 800 is the right rack count and the
four-halls-of-120 accounting is what breaks.

Fix: 800 racks across four halls means 200-rack halls at $24,000,000 each, PML
$96,000,000. Or keep 120-rack halls and say "six halls".

### F-ML-21. Model hyperparameters are presented as measured human-factors constants. CONFIRMED.

File: `WG-03-ML-Cognitive-Bias-Catalog.md`, §3 lines 79-86 and §5 lines 218-222.

    gamma ≈ 1.85     "the stress amplification coefficient"
    tau_0 = 8.5 s    "the baseline reaction time of an alert, unbiased operator"
    kappa = 2.45     "the cognitive distortion coefficient"
    w_b              seven "Threat Weight" values, 0.20 down to 0.09

`τ₀ = 8.5 seconds` is stated as a property of human operators, to one decimal place, with
no citation, no study and no measurement protocol. `κ = 2.45` and `γ = 1.85` are likewise
named as coefficients of a real phenomenon rather than as chosen constants. The seven
`w_b` weights are described as "threat relevance weighting" and do sum correctly to 1.000
(verified), but nothing says who assigned them or from what.

They are not innocuous. The paper's central operational conclusion depends on their exact
values:

```
$ python3 -c "
import math
print('tau(BSS) = 8.5*exp(2.45*BSS)')
for b in (0.0,0.5,0.5777,1.0): print(f'  BSS={b:.4f} -> tau={8.5*math.exp(2.45*b):6.2f} s')
print('BSS at which tau crosses the 35 s threshold:', round(math.log(35/8.5)/2.45,4))
"
tau(BSS) = 8.5*exp(2.45*BSS)
  BSS=0.0000 -> tau=  8.50 s
  BSS=0.5000 -> tau= 28.94 s
  BSS=0.5777 -> tau= 35.00 s
  BSS=1.0000 -> tau= 98.50 s
BSS at which tau crosses the 35 s threshold: 0.5777
```

§5 concludes "If cognitive bias induces a decision latency τ_delay > 35 seconds, the
physical facility crosses the 45-second thermal trip cliff." That threshold sits at
`BSS = 0.578`, a value determined entirely by the two uncited constants. Change `κ` from
2.45 to 2.0 and the threshold moves to `BSS = 0.708`. The conclusion is a restatement of
the chosen parameters, and it is anchored to a 45-second window that F-ML-05 shows does
not exist.

Related, same document: the §3 formula `BSS = Σ w_b·S_b·[1 + γ·Stress]` has range
`[0, 2.85]` given `Σw_b = 1`, `S_b ∈ [0,1]`, `Stress ∈ [0,1]` and `γ = 1.85`. The Python
at line 200 silently applies `np.clip(amplified, 0.0, 1.0)`. The clip is a material
modelling decision — it saturates a large fraction of the stressed population at exactly
1.0 — and it appears only in the code, never in the mathematics. **PROBABLE** as a defect
rather than a deliberate choice, since the document never mentions it.

Two more in this class:

- `MP_Kramers_Escape_Model.md` line 18: "`k_B T`: the **Threat Temperature** ... (e.g.,
  APT = 1.5, Nation-State = 2.0)". Two assigned constants presented as calibrated actor
  properties, feeding an exponential and then an "MTTC" quoted as a temporal forecast.
- `MP_Mathematical_Models.md` F9, line 174: "Modifies edge weight when crossing between
  CDT layers using **pre-calibrated** transition probabilities", followed by sixteen
  hardcoded numbers. "Pre-calibrated" asserts an unstated calibration. Also F38a
  (line 553), where `σ = max(2, ATQ·(1-confidence)·0.3)` — a heuristic spread with no
  sampling model behind it — is used to publish `CI_95% = [ATQ - 1.96σ, ATQ + 1.96σ]`.
  A 1.96 multiplier implies a normal sampling distribution that has not been established.

---

## Mathematics that checks out

Reported because a clean result is a result. Each of these was recomputed, not eyeballed.

**`Morphogenesis` cusp catastrophe bifurcation set. CORRECT.** Line 213 gives
`V(b) = ¼b⁴ - ½βb² - αb` with bifurcation set `27α² - 4β³ = 0`.

```
$ python3 -c "
from sympy import *
b,al,be = symbols('b alpha beta', real=True)
V = Rational(1,4)*b**4 - Rational(1,2)*be*b**2 - al*b
print('discriminant of V\'(b) =', factor(discriminant(Poly(diff(V,b),b))))
"
discriminant of V'(b) = -27*alpha**2 + 4*beta**3
```

The double root occurs exactly where the document says it does.

**Kramers rate and escape time, both statements. CONSISTENT.** `Calculus` §8.2 line 340
writes `r_escape = sqrt(U''(x_min)·|U''(x_barrier)|)/(2π) · exp(-ΔU/β⁻¹)` and `Loman`
§5.1 line 208 writes the reciprocal for the mean escape time. Both omit the friction
coefficient γ that appears in the textbook overdamped Kramers rate — but both documents
also write the driving Langevin equation as `dx = -∇U dt + sqrt(2β⁻¹) dW`
(`Calculus` line 331, `Loman` line 199), which sets `γ = 1`. Under that convention the
prefactor is right and the units close. I looked for the dropped-term error here and did
not find one.

**All six ROSI computations. CORRECT to the digit.** See F-ML-19.

**`MP_Mathematical_Models` F3 Pareto inverse CDF, F4 Hill estimator, F16 GPD inverse CDF
and its ξ→0 exponential limit, F28 Poisson inverse-CDF sampling loop, F30 percentile tail
estimator, F32 Stephens transform and the `2Σ(-1)^{k-1}e^{-2k²λ²}` series, F34 premium
loading (`1.25 × 1.15 = 1.4375`, matching the stated CI multiplier), F7 antifragility
mapping (SL-T 0/2/4 → -1/0/+1).** All correct as stated.

**`MP_Mathematical_Models` F14/F15 Hawkes defaults. CORRECT.**
`1/μ = 1/0.05 = 20 h` matches "~1 event per 20 hours"; `ln2/β = ln2/0.3 = 2.31 h` matches
"half-life ~2.3 hours"; `R₀ = α/β = 0.8/0.3 = 2.667` matches "2.67". The branching ratio
for an exponential Hawkes kernel is indeed α/β, and 2.67 > 1 is correctly described as
supercritical.

**`MP_Mathematical_Models` F38 ATQ sigmoid. CORRECT.** The eight weights sum to exactly
8.0, so the -4.0 intercept centres `Z` on `[-4, +4]`; weighted sum 4.0 → `Z = 0` → ATQ 50
and weighted sum 6.0 → `Z = 2` → ATQ 88.08, both as the document states.

**`MP_Mathematical_Models` F37. CORRECT.** The code labelled `xoshiro128**` genuinely is
xoshiro128** — `rotl(s1*5, 7)*9` with the correct state update and the `rotl(s3, 11)`
finaliser.

**`Autonomous-OT` §5.1 PUE arithmetic. CONSISTENT.** `PUE = 1 + (P_cooling + P_losses)/P_IT`;
a 90% drop from a baseline PUE of 1.18 gives `1 + 0.018 = 1.018 ≈ 1.02`, exactly as
claimed (with `P_losses ≈ 0`). Water hammer `2.5 MPa = 25 bar` is also correct.

**`Musical` §10.2.1 acoustic constants and campus scale. CORRECT.** `c_s = 343 m/s` and
`ρ₀ = 1.204 kg/m³` are both right for air at 20 °C; `800 racks × 120 kW = 96 MW`, which
is the stated ~100 MW campus. (The wave equation those constants sit in is not — see
F-ML-07.)

**`Mckenney-Lacanian` Psychometric Tensor dimension count. CORRECT.** A 2×2 DISC matrix
Kronecker a 1×5 OCEAN vector gives 20 elements, matching the stated "20-dimensional
object". Whether the object means anything is F-ML-17; the arithmetic is right.

**`Calculus-of-the-Subject` §4 Boolean claim. CORRECT.** "In numerical algebra `x² = x` is
true only for `x=0` and `x=1`" is right, and the Frege/Miller zero-to-one derivation in
§4 is faithfully reported.

---

## Documents that are clean

**None of the nine is fully clean.** The closest is:

- **`WG-03-ML-Calculus-of-the-Subject.md`, lines 1-313 (everything up to and including
  "Works cited").** 39 traceable references, highest index cited 32, zero out of range,
  no quantitative claims, no invented mathematics. It is a survey of other people's
  formalisations of Lacan and it is honest about that throughout. Its only defect is §8,
  which was appended after the bibliography and is covered by F-ML-19.

- **`WG-03-ML-Mckenney-Lacanian.md`** is the shortest and structurally the tidiest: three
  citations, all in range, no dollar figures, no thermal model, no actuarial appendix.
  Its two defects are the phantom `[3]` (F-ML-08) and the unlabelled Psychometric Tensor
  (F-ML-17). Fixing those two would make it clean.

---

## What I could not check, and why

**1. Whether any named external method actually exists in the literature.** I have no web
access. Every "this method is real" judgement in this report is from my own knowledge and
is stated as such. What I *have* established, and what the report actually claims, is the
narrower and fully checkable proposition: **the document invokes X and provides no
traceable source for X.** Where I have gone further — the DeepMind 2016 write-access
characterisation (F-ML-03), MIL-HDBK-217F's contents (F-ML-17) — I have marked it
PROBABLE and shown my reasoning.

**2. The code the `MP_Mathematical_Models.md` formulas are extracted from.** The document
opens with "All formulas below are extracted directly from the production codebase" and
cites 47 specific file-and-line ranges in `mc-engine.ts`, `mc-weights.ts`, `mc-hawkes.ts`,
`mc-scm.ts`, `ale-engine.ts` and `atq-migration.sql`. None of those files is in this
repository. I audited the document as a mathematical text; I could not verify that any
formula matches the code it claims to come from, that the line numbers are current, or
that F-ML-10 through F-ML-13 are defects in the document rather than faithful
transcriptions of defects in the code. **If the code is the source of truth, these four
findings are bug reports against the engine, not the paper.** Somebody with access should
check.

**3. Whether `Lloyd's Y5381` and `EU CRA Article 64` are correctly cited.** Both are
named repeatedly across six of my nine documents as the legal basis for the underwriting
argument, always without a citation. Y5381 in particular is load-bearing: `MP_Mathematical
_Models` F35 builds a whole exclusion formula on it. I cannot open either instrument.
Flagged as needing a sourcing pass, not scored as an error.

**4. The empirical basis, if any, for the 15 Seldon Crisis events.** F-ML-18 establishes
that the document provides none. I cannot rule out that a dataset exists somewhere
outside this repository. If one does, it needs to be cited; if it does not, the passage
is fabricated. Somebody should ask the author directly rather than inferring.

**5. `C_thermal` for `Calculus` §8.2, `Morphogenesis` §9.2 and `Musical` §10.2.** Those
three restate the thermal ODE without giving `C_thermal`, so F-ML-05's contradiction is
proved only against `Cognitive-Bias` and `Loman`, which do give it (142 J/K). The other
three assert the same "94.0 °C in under 45 seconds" conclusion, so they inherit the
problem, but I could not close the arithmetic in those three from their own numbers alone.

**6. Whether the "Applied Systems Assurance" blocks in WG-01, WG-02, WG-04 and WG-05 have
the same defect.** `grep -rn "ROSI" references/` returns hits in eight files outside my
scope. The pattern in F-ML-19 is almost certainly corpus-wide. That is for the sibling
auditors and for the corpus-wide pass the citation-web register says has not yet run.
