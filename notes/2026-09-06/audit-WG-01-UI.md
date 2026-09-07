# Corpus audit: WG-01-UI Underwriter and Insurance

Date: 2026-09-06
Auditor scope: `references/WG-01-UI-Underwriter-insurance/`, 12 documents, 28,243 words
Method: full read of every document, arithmetic re-derived with `python3`, citations checked against disk

All 12 documents are registered in `web/src/lib/papers.ts` (lines 114-162, 222-234), so
everything below is live on the production site.

Three of the twelve are **build artifacts**. Every defect found in them exists identically
in the compiler source, and a fix applied only to the `.md` will be reverted on the next
compiler run:

| Document | Owning compiler |
|:---|:---|
| `WG-01-UI-ALE-ROSI-Decision-Framework.md` | `scripts/compile_p08_ale_rosi.py` |
| `WG-01-UI-Quantitative-Cyber-Physical-FMECA.md` | `scripts/compile_p07_fmeca.py` |
| `WG-01-UI-RCIL-SCIL-Reinsurance.md` | `scripts/compile_p09_rcil_scil.py` |

The other nine are hand-maintained (`grep -rln "<filename>" scripts/` returns nothing).

## Summary

| Class | Confirmed | Probable | Unverifiable |
|:---|---:|---:|---:|
| Setting reported as measurement | 3 | 0 | 0 |
| Dangling citation | 0 | 0 | 0 |
| Named method, no source | 1 | 0 | 0 |
| Uncited quantitative claim | 3 | 0 | 1 |
| Internal contradiction | 5 | 1 | 0 |
| Arithmetic error | 3 | 1 | 0 |

The "named method, no source" row reads as 1 because it is one defect with one cause, not
111 separate ones: **no document in this working group contains a citation of any kind.**
Section F-UI-10 gives the counts.

The zero in the "dangling citation" row is a real result and is explained in F-UI-19. It is
not an absence of checking.

## Documents audited, and their state

| Document | Words | Findings | Verdict |
|:---|---:|---:|:---|
| WG-01-UI-ALE-ROSI-Decision-Framework.md | 2,884 | F-UI-01, 08, 10, 13, 14 | **Defective.** Abstract contradicts its own table on 3 of 3 headline figures |
| WG-01-UI-Quantitative-Cyber-Physical-FMECA.md | 3,175 | F-UI-02, 03, 08, 10, 16 | **Defective.** Abstract contradicts its own table; worked ROSI violates the paper's own definition |
| WG-01-UI-RCIL-SCIL-Reinsurance.md | 2,705 | F-UI-04, 08, 10, 15 | **Defective.** Abstract cites lead times absent from its own registers |
| WG-01-UI-1-Cyber_Risk_Underwriting.md | 4,400 | F-UI-07, 10, 11, 12, 17 | **Defective.** Highest density of uncited actionable figures in the group |
| WG-01-UI-1-COPE_detail.md | 6,407 | F-UI-05, 10, 17 | **Defective.** One arithmetic contradiction, several uncited figures |
| WG-01-UI-1-Cyber_Method.md | 4,639 | F-UI-10, 17, 18 | **Defective.** Uncited headline figures; broken image embed live in production |
| WG-01-UI-Cyber_Observations.md | 1,035 | F-UI-06, 09, 10 | **Defective.** Three sections shipped twice, verbatim |
| WG-01-UI-1-Competitive_Analysis.md | 776 | F-UI-10, 17 | Uncited product and market claims only |
| WG-01-UI-1-Overview.md | 1,052 | F-UI-10 | **Clean** on arithmetic and contradiction |
| WG-01-UI-1-COPE_summary.md | 310 | none | **Clean** |
| WG-01-UI-1-7-Industry-Value-Prop.md | 590 | none | **Clean** |
| WG-01-UI-1-Req-Improvements.md | 270 | none | **Clean** (an internal work-item note, not a paper) |

---

## Findings

### F-UI-01. The ALE-ROSI abstract contradicts its own Table 10.2 on all three headline figures. CONFIRMED.

`references/WG-01-UI-Underwriter-insurance/WG-01-UI-ALE-ROSI-Decision-Framework.md:5`
(identical text at `scripts/compile_p08_ale_rosi.py:14`):

> Using a fully worked, empirical reference case of a 100 MW high-density compute facility,
> we prove that a targeted 1.60M USD operational technology security programme mitigates
> **15.07M USD** in annual expected losses; delivering a verified programme-level Return on
> Security Investment (ROSI) of **842%**. The programme operates at **49%** of the
> Gordon-Loeb investment ceiling...

Against the paper's own tables:

- `:176` totals row: `**$1,600,000** | ... | **$2,052,750** | **$15,350,250** | **859%**`
- `:183`: `Budget Utilization Ratio = $1,600,000 / $6,402,564 = 24.99%`

All three abstract figures are wrong. **The tables are right.** Both Table 10.1 (`:152-158`)
and Table 10.2 (`:170-176`) re-derive exactly from their own stated inputs, cell for cell,
with no rounding drift:

```
$ python3 -c "
ale=[50e6*0.80*0.05,36e6*0.60*0.15,75e6*0.85*0.10,25e6*0.50*0.20,15e6*0.40*0.10,48e6*0.70*0.08]
print('pre-ALE rows',[f'{x:,.0f}' for x in ale]); print('total',f'{sum(ale):,.0f}')
sle=[40e6,21.6e6,63.75e6,12.5e6,6e6,33.6e6]; rar=[.005,.010,.005,.020,.010,.030]; cost=[180e3,220e3,450e3,350e3,120e3,280e3]
post=[s*r for s,r in zip(sle,rar)]; d=[a-p for a,p in zip(ale,post)]
print('dALE',[f'{x:,.0f}' for x in d],'sum',f'{sum(d):,.0f}')
print('node ROSI',[f'{(dd-c)/c*100:.1f}%' for dd,c in zip(d,cost)])
print('prog ROSI',f'{(sum(d)-sum(cost))/sum(cost)*100:.2f}%')
gl=0.3679*sum(ale); print('GL ceiling',f'{gl:,.0f}','util',f'{1.6e6/gl*100:.2f}%')
print('pct risk eliminated',f'{sum(d)/sum(ale)*100:.1f}%')
print('ROSI if dALE were 15.07M',f'{(15.07e6-1.6e6)/1.6e6*100:.1f}%')"

pre-ALE rows ['2,000,000', '3,240,000', '6,375,000', '2,500,000', '600,000', '2,688,000']
total 17,403,000
dALE ['1,800,000', '3,024,000', '6,056,250', '2,250,000', '540,000', '1,680,000'] sum 15,350,250
node ROSI ['900.0%', '1274.5%', '1245.8%', '542.9%', '350.0%', '500.0%']
prog ROSI 859.39%
GL ceiling 6,402,564 util 24.99%
pct risk eliminated 88.2%
ROSI if dALE were 15.07M 841.9%
```

Every stated node ROSI matches (900, 1275, 1246, 543, 350, 500). The programme total
$15,350,250 and 859% match. The Gordon-Loeb ceiling $6,402,564 and 24.99% match. The
"88.2% of total annualized risk" claim at `:185` matches.

The abstract's 842% is the ROSI that would follow from 15.07M, so the abstract is internally
self-consistent on two of its three numbers and simply carries a stale ΔALE. **15.07M is
orphaned**: it is not derivable from any combination of the paper's stated inputs, and the
correct figure is 15,350,250 (15.35M).

The 49% is orphaned separately — it is not 24.99% mis-rounded, it is almost exactly double
it, which suggests a doubled denominator or a stale ALE base rather than a typo. It is the
most damaging of the three, because §5.1 at `:185` immediately says "only 25% of the maximum
rational spending ceiling" and the abstract has already told the reader 49%.

**Fix, not applied:** in `compile_p08_ale_rosi.py:14` and the compiled `.md:5`, replace
15.07M → 15.35M, 842% → 859%, 49% → 25%. Do not touch the tables; they are correct.

### F-UI-02. The FMECA abstract's cyber-multiplier range contradicts its own master table. CONFIRMED.

`WG-01-UI-Quantitative-Cyber-Physical-FMECA.md:7` (= `compile_p07_fmeca.py:16`):

> we demonstrate that cyber-induced failure modes carry Risk Priority Numbers **3.2x to
> 13.5x** higher than their mechanical equivalents

and `:110`:

> Across empirical critical infrastructure nodes, $\mu_{\text{cyber}}$ ranges from **3.2 to 40.0**.

The 18-row master table at `:74-91` re-derives perfectly — all 18 `RPN_m`, all 18 `RPN_c`
and all 18 multipliers are exactly `S·O·D` and `RPN_c/RPN_m`, the only deviations being
5.33→5.3 and 6.67→6.7 rounding. Its actual range is **4.0x to 40.0x**:

```
$ python3 (18-row re-derivation, all cells matched)
CDU Pump  RPNm  54 RPNc 567 stated 10.50 calc 10.50
...
STS       RPNm  10 RPNc 400 stated 40.00 calc 40.00
Water dosing RPNm 72 RPNc 288 stated 4.00 calc 4.00
min mult 4.0 max 40.0
```

Two separate errors:
1. The abstract's upper bound, 13.5x, is the *second* row of the table (CDU Motorized
   Valve), not the maximum. The real maximum is the Static Transfer Switch at 40.0x. The
   abstract understates the paper's own headline result by a factor of three.
2. Both the abstract and §4.1 state a lower bound of 3.2, which appears nowhere in the
   table. The lowest multiplier is 4.0x (Water Treatment Dosing).

**Fix, not applied:** `3.2x to 13.5x` → `4.0x to 40.0x` in the abstract; `3.2 to 40.0` →
`4.0 to 40.0` in §4.1. In both the `.py` and the `.md`.

### F-UI-03. The FMECA worked ROSI example violates the paper's own definition of ARO. CONFIRMED.

`WG-01-UI-Quantitative-Cyber-Physical-FMECA.md:148` defines the bridge from RPN to money:

> $\text{ARO}_c(k) = \alpha \cdot \frac{\text{RPN}_c(k)}{1,000}$ is the calibrated
> Annualised Rate of Occurrence derived from the cyber RPN score.

ALE = SLE × ARO, and SLE does not change when a limit switch is fitted. So ALE must scale
linearly with RPN_c. Ten lines later, `:158` (= `compile_p07_fmeca.py:167`):

> reduces $\text{RPN}_c$ from $486$ to $36$, lowering annual loss expectancy from
> $1,450,000\text{ USD}$ to $18,000\text{ USD}$, delivering a verified $\text{ROSI} = 11,356\%$.

```
$ python3 -c "print('ALE ratio', round(1450000/18000,2)); print('RPN ratio', 486/36);
print('ALE_hardened implied by the paper own formula:', round(1450000*36/486));
print('ROSI as stated:', round((1450000-18000-12500)/12500*100))"
ALE ratio 80.56
RPN ratio 13.5
ALE_hardened implied by the paper own formula: 107407
ROSI as stated: 11356
```

The arithmetic of 11,356% is correct *given* 1,450,000 and 18,000. But 18,000 is not what
the paper's own ARO definition produces; that gives **$107,407**. The stated ALE reduction
is 80.6x for a 13.5x RPN reduction — a factor of six unaccounted for.

Re-deriving with the paper's own rule: ΔALE = 1,450,000 − 107,407 = 1,342,593; ROSI =
(1,342,593 − 12,500)/12,500 = **10,641%**, not 11,356%. The headline is roughly right by
accident; the intermediate number that a reader would reuse is not.

The deeper issue is that $1,450,000 itself is asserted with no SLE and no α, so the example
cannot be checked forward from the FMECA table at all. See F-UI-08.

**Fix, not applied:** either restate the example so ALE scales with RPN_c as defined, or
state the SLE and α and show the derivation. Do not leave the two mutually inconsistent.

### F-UI-04. The RCIL-SCIL abstract's two headline lead times appear nowhere in the paper. CONFIRMED.

`WG-01-UI-RCIL-SCIL-Reinsurance.md:7` (= `compile_p09_rcil_scil.py:16`):

> this paper formalizes the actuarial relationship between long-lead equipment replacement
> timelines; such as **52-week substation transformer queues** and **30-week custom Coolant
> Distribution Unit (CDU) lead times**; and unhedged business interruption loss exposure.

The paper's job is to publish the definitive registers. Neither number is in them.

```
$ grep -nE "week|Wks" WG-01-UI-RCIL-SCIL-Reinsurance.md
70:  - Replacement lead time: 28 weeks (custom titanium plate heat exchanger)
91:  RCIL-C01 ... Central Chiller Controller ... 42 Wks
141: - Custom 4.5 MW chiller compressor lead time: T = 42 weeks = 294 days
152: reduces restoration lead time from 42 weeks down to 48 hours
212: Calculated against unhedged 42-week OEM lead times
226: An inexpensive pump with a 30-week lead time is ...
```

- **52 weeks / substation transformer.** The RCIL register (`:86-97`) has no transformer row
  at all. The nearest electrical entry is RCIL-P02 Substation Protection Relay at 32 Wks.
  The longest lead time anywhere in the paper is 42 weeks. 52 is unsupported.
- **30 weeks / custom CDU.** The only CDU-adjacent lead time given is 28 weeks (`:70`). The
  30-week figure recurs at `:226` attached to "an inexpensive pump", a third component again.

Also worth correcting while in there: `:141` applies RCIL-C01's **42-week controller** lead
time to a "Custom 4.5 MW chiller **compressor**" with a $1,800,000 hardware cost. The
register's 42 Wks is the controller's; the compressor has no register row. That break makes
the flagship §5.2 calculation untraceable to the register it claims to draw on.

**Fix, not applied:** either add the transformer and CDU rows to the RCIL register with real
lead times, or restate the abstract on the numbers the registers actually carry (42 weeks
and 28 weeks).

### F-UI-05. "135 million people; more than half the U.S. population" is arithmetically false. CONFIRMED.

`WG-01-UI-1-COPE_detail.md:150`:

> Over 135 million people; more than half the U.S. population; now reside near coastlines,
> which represent the most windstorm-prone areas.

```
$ python3 -c "
for pop,yr in [(342,'2026'),(335,'2023'),(309,'2010')]: print(f'135M / {pop}M US pop ({yr}) = {135/pop*100:.1f}%')"
135M / 342M US pop (2026) = 39.5%
135M / 335M US pop (2023) = 40.3%
135M / 309M US pop (2010) = 43.7%
```

There is no US population at any census in the relevant era for which 135 million is more
than half. The paper's own number refutes its own gloss. ~40% is the figure the 135M is
conventionally paired with (coastal shoreline counties), and the appositive is the error,
not the count.

**Fix, not applied:** `more than half` → `roughly 40 percent`, and cite the source of the
135M.

### F-UI-06. Cyber_Observations ships three of its six sections twice, verbatim. CONFIRMED.

`WG-01-UI-Cyber_Observations.md` — heading structure:

```
$ grep -n "^## \|^5\. Inside-Out\|^6\. Premium" WG-01-UI-Cyber_Observations.md
4:## 1. Continuous Telemetry and Outside-In Assessment
8:## 2. Advanced Actuarial Mathematics and Loss Estimation
16:## 3. Systemic Accumulation Risk Modeling
24:## 4. Cyber Business Interruption (CBI)          <- header with no body
25:5. Inside-Out OT Risk Auditing (Captive Models)  <- orphaned outline fragment
26:6. Premium Modification and Liability Caps       <- orphaned outline fragment
28:## 1. Continuous Telemetry and Outside-In Assessment
31:## 2. Advanced Actuarial Mathematics and Loss Estimation
38:## 3. Systemic Accumulation Risk Modeling
45:## 4. Cyber Business Interruption (CBI) Focus
48:## 5. Inside-Out OT Risk Auditing (Captive Models)
51:## 6. Premium Modification and Liability Caps
```

Lines 4-22 and lines 28-43 are byte-identical prose. A draft outline was pasted above a
finished draft and neither was removed. A reader of the live page sees sections 1, 2 and 3
twice, then an empty section 4, then two bare numbered lines, then the whole thing again.
This is roughly 40% of the document's 1,035 words. The file is hand-maintained, so a
straight deletion of lines 4-27 fixes it.

**Fix, not applied:** delete lines 4 through 27.

### F-UI-07. An Uptime Institute design-availability figure is quoted as a guarantee. CONFIRMED (category), UNVERIFIABLE (provenance of 99.982%).

`WG-01-UI-1-Cyber_Risk_Underwriting.md:48`:

> A Tier III facility, which is concurrently maintainable and **guarantees 99.982% uptime**...

This is the priority-1 defect class in its purest form. Uptime Institute Tier certification
certifies **design documents, constructed facility, and operational sustainability** — what
the facility is *built to*. It does not certify, measure, or guarantee an achieved
availability percentage. The 99.982% figure circulates from a legacy availability table, not
from any certification outcome. Presenting it as something a facility "guarantees" converts a
design target into a contractual measured outcome, and it is exactly the kind of number an
underwriter would price against.

I mark the category error CONFIRMED because the mislabelling is legible from the sentence
itself. I mark the provenance UNVERIFIABLE because establishing where 99.982% actually comes
from needs the Uptime Institute source, which is not in this repo and which the working group
has never filed.

**Fix, not applied:** `guarantees 99.982% uptime` → `is designed for concurrent
maintainability` and drop the percentage, or keep it with an explicit
"design-availability, not certified or measured" qualifier plus a real Uptime citation.

### F-UI-08. Modelled parameters are presented as empirical measurement across all three quantitative papers. CONFIRMED.

This is the same defect the Cascading Failure audit recorded as F10, and it is the most
consequential finding in this working group because it applies to the numbers the papers
exist to deliver.

**ALE-ROSI**, `:5` and `:146`:

> a fully worked, **empirical** reference case ... **we prove** ...
> a **verified** programme-level Return on Security Investment (ROSI) of 842%
> Asset values reflect **empirical replacement costs** ... derived from commercial
> hyperscale operations

The paper's two decisive input columns are `EF` (0.40 to 0.85), `ARO (Cyber)` (0.05 to 0.20)
and `Residual ARO` (0.005 to 0.030). Every one of these is a value the author *chose*. No
loss dataset, no claims history, no actuarial basis is given for any of them, and every
headline output — 17.4M ALE, 15.35M ΔALE, 859% ROSI, 24.99% Gordon-Loeb utilisation — is a
pure function of them. Change ARO from 0.05 to 0.02 and the whole capital argument moves.

**FMECA**, `:7`: "Across an **empirical** eighteen-component audit ... we demonstrate".
Severity, Occurrence and Detection in FMECA are analyst-assigned ordinal judgements by
construction. Calling a set of assigned scores an empirical audit, then reporting the
products of those scores as a measured 3.2x-to-40x result, is the same category error.

**RCIL-SCIL**, `:171`: "delivering a **verified** $\text{ROSI} = 1,007\%$" — see F-UI-15;
the underlying ΔALE is asserted, never derived.

The words doing the damage are *empirical*, *verified*, and *we prove*. A modelled sensitivity
study with declared assumptions would be a legitimate and useful paper. What is published
reads as a measured result from a real facility, and a CFO or underwriter reading `:133`
("If a cyber-induced chiller failure carries an unmitigated ALE of 2,000,000 USD, investing
more than 735,800 USD ... destroys shareholder value") would act on it.

**Fix, not applied:** label the case study as a *modelled reference facility with stated
assumptions* — the same treatment RefDNSP-1.2M received in WG-04-CF. Strike "empirical",
"verified" and "we prove" from all three abstracts. State the source of each EF and ARO, or
declare them as assumptions and add a sensitivity range. Cite Dragos/Marsh-style published
control-effectiveness benchmarks where one maps onto a control, exactly as WG-04-CF F10
concluded.

### F-UI-09. An explicitly illustrative table becomes an asserted market fact one document later. CONFIRMED.

`WG-01-UI-1-Cyber_Risk_Underwriting.md:133` introduces its premium modifier matrix honestly:

> Table 1 provides an **illustrative, generalized matrix** of how underwriters apply these
> multiplicative factors...

with MFA at `0.80 - 0.85 (Discount)` and flat networks at `1.20 - 1.50 (Loading)`.

`WG-01-UI-Cyber_Observations.md:52` restates the identical numbers with the qualifier gone:

> implementing global MFA **can yield** a 15-20% discount multiplier, while maintaining a
> flat, unsegmented network **can trigger** a 20-50% surcharge.

Same figures, but "illustrative" has become "can yield". Both pages are published; a reader
arriving at Cyber_Observations has no way to know the numbers are the author's own
illustration. Credit where due: the Cyber_Risk_Underwriting version is the *correct* handling
and should be the model for the rest of the corpus.

**Fix, not applied:** add the illustrative qualifier to `Cyber_Observations.md:52`, or
source the modifier ranges properly and drop the qualifier from both.

### F-UI-10. No document in this working group contains a citation of any kind. CONFIRMED.

The `CLAUDE.md` policy is that content may present original framing but may not invoke a
named external method, model, or dataset without a traceable reference. Proof of absence:

```
$ grep -rniE "^#+ *(references|bibliography|sources|works cited|citations)" references/WG-01-UI-Underwriter-insurance/
$ echo $?
1
$ grep -rnE "\[[0-9]+\]|\[\^|https?://" references/WG-01-UI-Underwriter-insurance/
$ echo $?
1
$ ls -1 references/external-research/ | grep -i "WG-01"
$ echo $?
1
$ ls -1 references/external-research/
README.md
WG-04-CF_blackout-incidents_20260906.md
WG-04-CF_ercot-wecc-ibr-reliability_20260906.md
WG-04-CF_grid-inertia-rocof_20260906.md
WG-04-CF_outage-cost-vcr_20260906.md
WG-04-CF_remediation-cost-benchmarks_20260906.md
```

No references section, no numbered marker, no footnote, no URL, no DOI, in 28,243 words
across 12 published documents. And no `WG-01-UI_*` file exists in `references/external-research/`
— the entire external-research folder serves WG-04-CF only.

Against that, a mechanical count of named external methods, models, standards, datasets and
products invoked:

| Document | Words | Named invocations |
|:---|---:|---:|
| WG-01-UI-ALE-ROSI-Decision-Framework.md | 2,884 | 88 |
| WG-01-UI-Quantitative-Cyber-Physical-FMECA.md | 3,175 | 76 |
| WG-01-UI-1-Cyber_Risk_Underwriting.md | 4,400 | 44 |
| WG-01-UI-RCIL-SCIL-Reinsurance.md | 2,705 | 42 |
| WG-01-UI-1-Cyber_Method.md | 4,639 | 41 |
| WG-01-UI-1-COPE_detail.md | 6,407 | 29 |
| WG-01-UI-1-Competitive_Analysis.md | 776 | 29 |
| WG-01-UI-Cyber_Observations.md | 1,035 | 18 |
| WG-01-UI-1-Overview.md | 1,052 | 8 |
| WG-01-UI-1-Req-Improvements.md | 270 | 2 |
| WG-01-UI-1-COPE_summary.md | 310 | 0 |
| WG-01-UI-1-7-Industry-Value-Prop.md | 590 | 0 |

The audit brief named specific actuarial constructs to watch for. Present and unsourced:

- **Clayton copula** — `Cyber_Risk_Underwriting.md:78`: "advanced models often employ a
  **Rotated 90-degree Clayton copula** to capture the specific negative or asymmetric tail
  dependencies between breach frequency and financial severity." A specific parameterisation
  of a specific copula family, asserted as current practice, with no source.
- **Extreme Value Theory / Generalized Pareto / Fréchet domain** — `:74`, and again in
  `Cyber_Observations.md:10` and `:32`.
- **Gordon-Loeb** (16 invocations, load-bearing for the entire ALE-ROSI capital argument) —
  cited as "the Gordon-Loeb model (2002)" at `ALE-ROSI:127`, which is the closest thing to a
  citation anywhere in this working group, and is still not a reference.
- **Taleb / Extremistan / Mediocristan** (20 invocations across ALE-ROSI and RCIL-SCIL).
- **Zero-Inflated Poisson with random effects** (4), **Hawkes processes** (3),
  **Generalized Linear Mixed Models** (1), **Functional Dependency Network Analysis** (1),
  **Heterogeneous Generalized SIS model** (1), **Bayesian networks / PyMC** (2),
  **Weibull** (1), **Dirac delta mixture density** (2).
- **Named scenarios and proprietary methods**: Lloyd's **Erebos**, Munich Re/Beazley/Gallagher
  Re's **Autolycus**, **Lernaean Hydra**, **Demeter's Curse**; Aon's **CORA-OT**, **CRR-OT**,
  **CyQu**, **Find, Flatten, Finance**, **Cyber Risk Analyzer**, **DCLP**; Munich Re's
  **Location Risk Intelligence** and **Completion Bonds**; **Lloyd's Y5381** (7); **DeNexus
  DeRISK** (2); **Guidewire Cyence** (2); **BCEGS** (9) including the very specific "Class 98
  ... mandatory 1 percent premium surcharge" at `COPE_detail:179`; **ACORD 140** (2);
  **ASTM E2026 / E2557**; **CyTRICS**; **Cyber-Informed Engineering**.
- **OCEAN / Big Five / Dark Triad** — `Cyber_Method.md:74-79` builds a four-row
  psychometric-trait-to-attack-typology table on them with no source, and `:72` supports it
  with the bare assertion "**Research indicates** that an organization's exposure on dark web
  forums is highly correlated with forthcoming cyber incidents."

Not found anywhere in this working group: Gumbel copula, Frank copula, Hurst exponent,
Lévy flights, Cramér-Lundberg, Panjer recursion.

**Fix, not applied:** this is not a per-line edit, it is a sourcing programme. Highest value
first: Gordon-Loeb (2002) and the Taleb tail framework, because the ALE-ROSI paper's entire
capital argument rests on them; then the Clayton copula sentence, which is the single most
specific unsourced methodological claim in the group; then the Aon and Munich Re proprietary
method names, which borrow those firms' authority in the same way the WG-04-CF register warned
about with ENTSO-E "Project Inertia". File each in
`references/external-research/WG-01-UI_<topic>_<YYYYMMDD>.md` per the CLAUDE.md convention.

### F-UI-11. The Guy Carpenter 174% loss ratio and the "$10 billion" it is said to translate to are mutually inconsistent. PROBABLE.

`WG-01-UI-1-Cyber_Risk_Underwriting.md:113`:

> joint analytical research published by Guy Carpenter and Guidewire Cyence projects that a
> 1-in-100 year systemic event could generate a **174% U.S. industry-wide aggregate loss
> ratio**. This translates to catastrophic insured losses of **nearly $10 billion**, which is
> roughly 2.5 to 3 times the total impact of the historical NotPetya attack.

The 174% figure is real. Guy Carpenter and Guidewire Cyence's 2025 *US Cyber Industry Exposure
Database and Loss Curve* reports a 174% US industry-wide aggregate loss ratio at the 1-in-100
return period in Cyence Model 7.1, composed of a 69% attritional and a 105% single-cat-event
component, against an industry base of roughly 4.97 million US cyber policies and **$9.52
billion** estimated written premium.

The paper's own two numbers cannot both be right on that base:

```
$ python3 -c "
print('174% of \$9.52bn US cyber WP =', round(9.52*1.74,2),'bn   <- doc says ~\$10bn')
print('105% single-cat component of \$9.52bn =', round(9.52*1.05,2),'bn')
print('premium base implied by pairing 174% with \$10bn =', round(10/1.74,2),'bn')"
174% of $9.52bn US cyber WP = 16.56 bn   <- doc says ~$10bn
105% single-cat component of $9.52bn = 10.0 bn
premium base implied by pairing 174% with $10bn = 5.75 bn
```

174% of the source's own premium base is $16.6bn, not $10bn. The $10bn figure is what the
**105% single-cat-event** component produces. The paper has taken the aggregate loss ratio and
paired it with the single-event loss figure, understating the modelled 1-in-100 insured loss by
about $6.6 billion.

PROBABLE rather than CONFIRMED: the premium base comes from the Guy Carpenter/Guidewire
publication, not from the paper, so I am reconciling against an external source rather than
purely internally. The inconsistency between the two stated numbers is real either way — no
single premium base makes 174% and $10bn simultaneously true unless the US cyber market is
$5.75bn, which is well below the figure the cited study itself uses.

**Fix, not applied:** state the return period and which loss-ratio component the dollar figure
belongs to, and cite the 2025 paper.

Sources: [Guy Carpenter / Guidewire Cyence, US Cyber Industry Exposure Database and Loss Curve, Sept 2025](https://www.guycarp.com/content/dam/guycarp-rebrand/insights-images/2025/09/09_02_2025_WP-US_Cyber_Industry_Exposure_Database_Loss_Curve_EN_270825.pdf)

### F-UI-12. A $3.5 trillion figure is attached to a scenario whose published range is $243bn to $1trn. PROBABLE.

`WG-01-UI-1-Cyber_Risk_Underwriting.md:113`:

> Similarly, Lloyd's of London maintains severe systemic risk scenarios, such as the **Erebos
> cyber blackout scenario**. This model envisions a coordinated, state-sponsored attack on the
> physical power grid resulting in a sudden 10% reduction in generating capacity across two
> mutually supporting reliability regions. Catastrophe modeling indicates that major systemic
> events could ultimately expose the global economy to total economic losses upwards of **$3.5
> trillion**.

The Erebos description is accurate: Lloyd's and the Cambridge Centre for Risk Studies'
*Business Blackout* (2015) models a hypothetical Erebos trojan destroying 50 generators,
18,000 MW, which is 10% of regional generating capacity, blacking out the northeastern US.

But that study's published loss figures are **$243bn to the US economy in the median scenario,
rising above $1trn in the extreme variant**, with insured losses of $21.4bn to $71.1bn. Not
$3.5 trillion, and not global.

$3.5 trillion is the headline from a *different* Lloyd's systemic risk scenario — the 2023
global-payments-system attack, a five-year global economic loss. The paper's sentence
construction ("Similarly, Lloyd's ... Erebos ... Catastrophe modeling indicates") reads as
though $3.5tn is Erebos's number.

PROBABLE, not CONFIRMED: the sentence hedges with the generic "major systemic events" rather
than naming Erebos in the same clause, so it is arguably a topic shift rather than a
misattribution. It reads as a misattribution to any reader, and it carries no citation either
way.

**Fix, not applied:** give Erebos its own figures ($243bn median, >$1trn extreme, $21.4bn to
$71.1bn insured) and cite them, or move the $3.5tn to its own sentence naming the 2023
payments scenario.

Sources: [Lloyd's, Business Blackout](https://www.lloyds.com/insights/risk-reports/business-blackout)

### F-UI-13. The Gaussian tail-loss figure in ALE-ROSI §6.2 is not derivable, and the formula is wrong. CONFIRMED (not derivable) / PROBABLE (formula).

`WG-01-UI-ALE-ROSI-Decision-Framework.md:225-233`:

> $$\text{ES}_{0.99}^{\text{Gaussian}} \approx \text{VaR}_{0.99} + \frac{\sigma}{\sqrt{2\pi}} \approx \$28,500,000$$
> ...
> The standard Gaussian model underestimates the catastrophic tail exposure by
> **96,500,000 USD (a 4.38x undercount)**.

The two arithmetic steps that *can* be checked, check: 1.25/(1.25−1) × $25M = $125M, and
125 − 28.5 = 96.5, and 125/28.5 = 4.386. But the $28,500,000 anchor cannot be reproduced,
because σ is never stated anywhere in the paper:

```
$ python3 -c "
import math
print('sigma required for ES-VaR = 3.5M under the paper formula:', round(3.5e6*math.sqrt(2*math.pi)))
z=2.3263478740408408
print('correct Gaussian ES-VaR at 99%: phi(z)/(1-p) - z =', round(math.exp(-z*z/2)/math.sqrt(2*math.pi)/0.01 - z,4),'sigma')
print('paper multiplier 1/sqrt(2pi) =', round(1/math.sqrt(2*math.pi),4),'sigma')"
sigma required for ES-VaR = 3.5M under the paper formula: 8773199
correct Gaussian ES-VaR at 99%: 0.3389 sigma
paper multiplier 1/sqrt(2pi) = 0.3989 sigma
```

Two problems:
1. The $28.5M requires an unstated σ of $8,773,199. A reader cannot verify the number, and
   the "4.38x undercount" headline is a function of it.
2. `σ/√(2π)` is the standard normal density at *zero*, not the mean-excess above the 99th
   percentile. The correct Gaussian expected shortfall at p = 0.99 is
   `VaR + σ·(φ(z)/(1−p) − z)` = `VaR + 0.3389σ`, not `VaR + 0.3989σ`. The paper is also
   comparing a mean-*excess* formula on the Gaussian side against an absolute Pareto ES
   (`α/(α−1)·VaR`) on the fat-tail side — the two sides are not the same quantity.

I mark the formula PROBABLE because the paper writes `≈` throughout and may intend a rough
illustration; the non-derivability of $28.5M is CONFIRMED regardless.

Related, same section, `:229`: "empirical cyber-physical catastrophe claims exhibit a
power-law tail with α ≈ 1.25" is a claim about a real claims dataset, with no dataset named.
It sets the entire fat-tail multiplier.

**Fix, not applied:** state σ, use `φ(z_p)/(1−p) − z_p`, and either cite the claims study
behind α ≈ 1.25 or label it an assumed exponent with a sensitivity range.

### F-UI-14. The five-year NPV in ALE-ROSI §7.4 is not derivable from the paper's own inputs. CONFIRMED.

`WG-01-UI-ALE-ROSI-Decision-Framework.md:267-269` gives
`NPV = Σ (ΔALE_t − OPEX_t)/(1+r)^t − CAPEX_0`, then:

> For the worked 100 MW case study at a discount rate of $r = 8.5\%$, over a 5-year
> operational lifecycle, the net present value exceeds $48,200,000\text{ USD}$.

`OPEX_t` is never given a value anywhere in the paper.

```
$ python3 -c "
af=sum(1/1.085**t for t in range(1,6))
print('5y annuity factor @8.5% =', round(af,4))
print('NPV with the paper own dALE=15,350,250 and OPEX=0:', f'{15350250*af-1.6e6:,.0f}')
print('OPEX/yr required to land on exactly 48.2M:', f'{15350250-(48.2e6+1.6e6)/af:,.0f}')"
5y annuity factor @8.5% = 3.9406
NPV with the paper own dALE=15,350,250 and OPEX=0: 58,889,841
OPEX/yr required to land on exactly 48.2M: 2,712,297
```

With OPEX = 0 the paper's own ΔALE gives **$58.9M**, not $48.2M. To land on $48.2M requires
an unstated annual OPEX of ~$2.71M — which would be larger than the entire $1.6M Year-1
programme cost the paper builds its ROSI on, and would make the two sections mutually
inconsistent. Either way, $48,200,000 does not follow from anything the paper states.

"Exceeds $48,200,000" is technically satisfied by $58.9M, so this is not a false statement.
It is an unbacked one: it presents a precise figure that a reader cannot reconstruct and
that hides a material assumption.

**Fix, not applied:** state OPEX_t, or drop the NPV figure and keep the formula.

### F-UI-15. The RCIL-SCIL spares ROSI rests on an asserted ΔALE. CONFIRMED (uncited).

`WG-01-UI-RCIL-SCIL-Reinsurance.md:171` (= `compile_p09_rcil_scil.py:180`):

> For a dedicated spares depot containing two complete CDU pump assemblies and one chiller
> compressor ($C_{\text{inventory}} = 650,000\text{ USD}$), the annual expected loss
> reduction is $7,200,000\text{ USD}$, delivering a **verified** $\text{ROSI} = 1,007\%$.

The ROSI arithmetic is correct: (7,200,000 − 650,000)/650,000 = 1007.7%. The rest of the
paper is also arithmetically sound — §5.2's $132,336,000 SLE (`1,800,000 + 444,000 × 294`),
its 1.36%/98.64% split, and §5.3's reduction to $2,688,000 (`1,800,000 + 444,000 × 2`) all
re-derive exactly.

But $7,200,000 does not. The paper's own machinery gives an SLE reduction of
132,336,000 − 2,688,000 = **$129,648,000**; converting that to an annual expectation needs an
ARO, which is never stated. Working backwards, $7.2M implies an ARO of 0.0555. That number
appears nowhere.

So the one figure a reader would act on — spend $650k, save $7.2M a year — is the only one in
the section with no derivation, and it is labelled "verified".

**Fix, not applied:** state the ARO and show `ΔALE = 129,648,000 × ARO`, and strike
"verified".

### F-UI-16. An unnamed incident with specific loss figures is presented as validated field evidence. CONFIRMED (uncited) / UNVERIFIABLE (whether it occurred).

`WG-01-UI-Quantitative-Cyber-Physical-FMECA.md:164-167`, under the heading **"Industrial
Proof: Validated Cyber-Physical Failure Case Studies"** and the framing "empirical
vulnerability mechanics validated through field incident response and academic research":

> ### 5.1 The 2024 High-Density AI Colocation Colling Incident
> A 40 MW high-density compute facility in the Asia-Pacific region experienced a cluster-wide
> thermal shutdown when an adversary leveraged unauthenticated BACnet write commands ...
> Over $1,200\text{ GPUs}$ throttled compute execution simultaneously, halting distributed
> foundation model training runs and inflicting $3.8\text{M USD}$ in contractual SLA downtime
> penalties.

No operator, no month, no vendor advisory, no incident-response firm, no report. A region and
a year. Yet it carries three specific quantities (40 MW, 1,200 GPUs, $3.8M) and sits under a
heading asserting it is validated proof.

The two case studies either side of it are real and checkable: §5.2's TLStorm CVEs
(CVE-2022-22805, CVE-2022-22806, CVE-2022-0715) are correctly attributed to Armis and
Schneider APC Smart-UPS, and §5.3's CrashOverride/Industroyer description is broadly accurate.
Their presence lends §5.1 a credibility it has not earned. That is what makes this worse than
a bare unsourced number.

UNVERIFIABLE as to whether the incident happened — with no name, date, or operator there is
nothing to search on. CONFIRMED as an uncited quantitative claim presented as validated
evidence.

Minor, same file: `:170` cross-references "FMECA Row 7" for the UPS (correct — Block UPS
Module is row 7), but `:173` cross-references "Row 6 and Row 8" for *substation circuit
breakers*; row 6 is the Static Transfer Switch, a data-hall device, not a substation breaker.

**Fix, not applied:** name and cite the incident, or delete §5.1 and rest the section on §5.2
and §5.3, which are sourceable. Do not leave an anonymous incident under a "Validated" heading.

Also on the typo, since the line has to be touched anyway: "Colling" → "Cooling".

### F-UI-17. Uncited actionable quantitative claims, by document. CONFIRMED.

Beyond the findings already itemised, these are specific figures a reader could act on,
presented as established fact, with no citation and no "modelled" label. Each is quoted with
its line.

**`WG-01-UI-1-Cyber_Risk_Underwriting.md`**
- `:46` "The rising demand for specialized datacenter insurance coverage is projected to generate $10 billion in new premiums by 2026." (a market-size projection with no projector named)
- `:50` "Total Insurable Values at these hyperscale locations, which frequently reach $20 billion to $30 billion per single site"
- `:56` "the median cyber incident costs reported by manufacturing clients climbed to nearly $400,000 per event"
- `:62` "cap the local government's liability ... at a specific statutory limit, such as $200,000 per person or $300,000 per incident" (a statutory figure, no jurisdiction named)
- `:111` "combined ratios exceeding 300% for the global cyber insurance market"
- `:144` "commercial premiums that are 20% to 30% above the industry average"
- `:148-153` the entire premium-as-%-of-revenue table (0.03% to 0.30%)

**`WG-01-UI-1-Cyber_Method.md`**
- `:20` "The global cost of cybercrime is projected to escalate to $13.82 trillion by 2028, with the average cost of a data breach hovering around $4.4 million"
- `:62` "the Costa Rica ransomware attack that inflicted losses equivalent to nearly 2.4 percent of the country's GDP, or the 2017 NotPetya attack that caused supply chain disruptions four times greater than the losses faced by directly affected firms"
- `:72` "Research indicates that an organization's exposure on dark web forums is highly correlated with forthcoming cyber incidents"
- `:85` "a predictive accuracy previously unattainable in the cybersecurity domain"

**`WG-01-UI-1-COPE_detail.md`**
- `:152` "approximately 90% of the U.S. population living in seismically active areas to varying degrees" (uncited, and a figure I could not reconcile with any USGS characterisation I know of — flagged as PROBABLY overstated, not confirmed)
- `:179` "BCEGS Class 98 applies specifically to certain enforcement scenarios in Florida and carries a mandatory 1 percent premium surcharge"
- `:191` "Underwriters traditionally wasted upwards of 40% of their day manually matching specific buildings"
- `:133` fire-wall specifications: "6 to 8 inches in sheer thickness", "1.5-hour rated fire dampers", "Class A 3-hour rated fire doors" — presented as the threshold for actuarial recognition, with no code or standard cited

**`WG-01-UI-RCIL-SCIL-Reinsurance.md`** (§7 treaty table, `:212-216`)
- "Premium reduction of 34%"
- "primary layer attachment rates drop 22%"
- "Unhedged PML exceeds $150,000,000" / "Hardwired SIL-3 limits bound single-event PML below $15,000,000"

**`WG-01-UI-ALE-ROSI-Decision-Framework.md`** (§8 treaty table, `:279-282`)
- "45% capital surcharge to protect against correlated multi-site blackout"
- "$25,000,000 to $50,000,000 punitive deductible" / "$2,500,000 retention"

The §7 and §8 treaty tables are the sharpest instance of the setting-versus-outcome problem in
this working group. A deductible, a sub-limit, an attachment point and an accumulation loading
are all *settings* — terms a treaty is written to. Presenting a "34% premium reduction" and a
"22% attachment rate drop" as consequences that follow from holding an RCIL register states an
outcome, and neither is sourced or labelled modelled.

**`WG-01-UI-1-Competitive_Analysis.md`**
- `:21` "using **50,000 Monte Carlo simulations**"
- `:27` "a **3.2 million node knowledge graph**", "predictive 90-day KRONOS forecasts"

These are product claims rather than external facts, so they are a lesser problem — but they
are stated as specifications on a public page, and the 90-day predictive horizon is asserted as
a capability in `Cyber_Method.md:85` and `1-7-Industry-Value-Prop.md:16` and `:30` without any
accuracy figure or validation anywhere in the corpus.

### F-UI-18. A broken Obsidian image embed is live in production. CONFIRMED.

`WG-01-UI-1-Cyber_Method.md:91`:

```
!Pasted image 20260504124353.png
```

Missing its `[[ ]]`, so it renders as literal text mid-section-5 rather than as an image (or
as anything). The file is hand-maintained. Either restore the embed with the asset, or delete
the line.

### F-UI-19. Dangling citations: none, because there are no citations. CONFIRMED.

The brief asked me to check every reference to an Eigenia, McKenney or Seldon work against
what exists on disk. There are none to check.

```
$ grep -rniE "mckenney|seldon|eigenia (20|labs \()" references/WG-01-UI-Underwriter-insurance/
(no output)
```

The only occurrences of "Eigenia" in the working group are in `WG-01-UI-1-Competitive_Analysis.md`,
where the company is the subject of the comparison, not a cited work. No McKenney work, no
Seldon work, and no Eigenia paper is cited anywhere in WG-01-UI.

So the WG-04-CF citation-web problem — a cited work with no file behind it — does **not**
exist here. That is a genuinely clean result and the register at
`notes/2026-09-06/citation-web-register.md` can record WG-01-UI as adding zero rows.

It is worth being clear about what it does and does not mean. It is not that this working
group sources its claims to itself; it is that it does not source them at all. The
laundering failure mode the register was built to catch is absent because the prerequisite —
any citation apparatus whatsoever — is absent. See F-UI-10.

---

## Documents that are clean

Checked in full and found free of arithmetic error, internal contradiction, and
setting-reported-as-measurement:

- **`WG-01-UI-1-COPE_summary.md`** (310 words). A four-bullet definitional summary of
  Construction/Occupancy/Protection/Exposure. Contains no quantitative claim of any kind, so
  there is nothing to be wrong. Consistent with the COPE definitions in
  `WG-01-UI-1-Overview.md:67` and `WG-01-UI-1-COPE_detail.md`.
- **`WG-01-UI-1-7-Industry-Value-Prop.md`** (590 words). A research-agenda note in the first
  person. No numbers except the 90-day predictive horizon, which is framed throughout as
  something being evaluated ("We are evaluating the feasibility of predicting ... within a
  90-day window"), not as an achieved capability. That framing is correct and is exactly what
  F-UI-08 asks the quantitative papers to adopt. Typo in the H1: "Predcitive".
- **`WG-01-UI-1-Req-Improvements.md`** (270 words). An internal work-item list, not a paper.
  Sections 3, 4 and 5 are headings with no body, which makes it a poor public page, but it
  makes no claim that can be wrong. Whether it belongs on the production site at all is a
  publishing decision, not an audit finding.
- **`WG-01-UI-1-Overview.md`** (1,052 words) is clean on arithmetic and contradiction. It
  carries eight unsourced named constructs (Equivalence Principle, Standard Deviation
  Principle, PML/MFL, the four-module cat model, Monte Carlo, ALE) and so appears under
  F-UI-10, but it asserts no quantity and its definitions are internally consistent with
  `COPE_detail`. One terminology drift worth noting for a later pass rather than as a finding:
  Overview `:68` pairs PML with **Maximum Foreseeable Loss (MFL)**, while `COPE_detail:53`
  pairs it with **Maximum Possible Loss (MPL)**. Both are defensible industry usages; using
  both across two published pages in one working group is not.

Three further positives worth recording, since the reader needs to know what is sound:

- The **ALE-ROSI Tables 10.1 and 10.2** are arithmetically flawless — 12 ALE cells, 6 ΔALE
  cells, 6 node ROSIs, 3 totals, the Gordon-Loeb ceiling and the 88.2% claim all re-derive
  exactly. The defect is entirely in the abstract.
- The **FMECA 18-row master table** is arithmetically flawless — 54 cells re-derive exactly.
  The defect is entirely in the abstract and in §4.5.
- **`Cyber_Risk_Underwriting.md:133`** labels its premium-modifier table "illustrative,
  generalized" before presenting it. That is the correct handling and should be the template
  for the rest of the corpus.

---

## What I could not check, and why

**Every external fact in this working group.** With no citations anywhere (F-UI-10), verifying
the substance rather than the internal coherence of these documents means independently
sourcing 28,243 words of market, regulatory and actuarial assertion. I verified two claims
(F-UI-11, F-UI-12) because they were internally checkable once I had the source. The rest of
F-UI-17 is listed as uncited, not as wrong. I make no claim about whether "$13.82 trillion by
2028" or "$20 to $30 billion TIV per hyperscale site" are true.

**Whether the 2024 Asia-Pacific colocation incident (F-UI-16) occurred.** No operator, date,
vendor or responder is named. There is nothing to search on. Unverifiable in principle as
written, which is the point of the finding.

**The provenance of Uptime Institute's 99.982% (F-UI-07).** The category error is legible from
the sentence. Establishing where the number originates and what Uptime currently says about
availability percentages needs the Uptime source, which is not in this repo.

**The 90% seismically-active-population claim (`COPE_detail:152`).** I could not reconcile it
with any USGS or FEMA characterisation I am confident of, but I did not source it either. It is
listed under F-UI-17 as uncited and flagged as probably overstated, not as an error.

**Whether the Munich Re / Beazley / Gallagher Re scenario names (Autolycus, Lernaean Hydra,
Demeter's Curse) are real.** They are specific enough to be checkable and I did not check them.
If they are not real scenario names, that is a more serious finding than "uncited", and it
should be checked before this working group's sourcing pass closes.

**The EU CRA article references.** `RCIL-SCIL:191` says a 72-hour patch SLA is "backed by EU
CRA Article 13/14 fines", and `ALE-ROSI:250` attributes statutory fines to "EU CRA Article 64".
CRA Article 14 concerns *reporting* obligations for actively exploited vulnerabilities, not a
patch SLA, and Article 64 concerns penalties. I believe `:191` mischaracterises what Article 14
requires, but I did not open the Regulation text and am not asserting it. Flagged for the
sourcing pass.

**Whether any of this working group's content overlaps or contradicts the other eight working
groups.** My scope was WG-01-UI only. The `18,500 USD/hour` SLA burn rate, the `94.0°C` /
`4.2°C/s` / `14.8 seconds` thermal triple, the `38.5 L/min` PG25 flow, and the `RPN 567` CDU
pump figure are all used consistently *within* WG-01-UI across three papers, which is a good
sign. Whether they agree with WG-02-DT or WG-05-CAD is for the sibling auditors.
