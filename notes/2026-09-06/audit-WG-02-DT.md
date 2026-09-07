# Corpus audit: WG-02-DT Digital Twin

Date: 2026-09-06
Auditor scope: `references/WG-02-DT-Digital-Twin/`, 10 documents, 21,924 words
Method: full read of every document, physics re-derived with `python3`, citations
checked against disk

All ten files are registered in `web/src/lib/papers.ts` and are live. Three are
build artifacts and must be fixed in the compiler as well as the `.md`:

| File | Owner |
|:---|:---|
| `WG-02-DT-Cognitive-Digital-Twin.md` | `scripts/compile_r07_cognitive_twin.py` |
| `WG-02-DT-High-Density-Liquid-Cooling.md` | `scripts/compile_p11_liquid_cooling.py` |
| `WG-02-DT-Seven-Staff-Fugue.md` | `scripts/compile_r05_seven_staff_fugue.py` |
| `WG-02-DT-1.md`, `-4.md`, `-5.md` | `sweep_academic_formatting.py` / `fix_all_academic_issues.py` (formatting sweeps only) |
| `-2.md`, `-3.md`, `Applied-Physics.md`, `Paradigm-Library.md` | hand-maintained |

## Summary

| Class | Confirmed | Probable | Unverifiable |
|:---|---:|---:|---:|
| Setting or rating reported as measurement | 3 | 1 | 0 |
| Dangling citation | 2 | 0 | 0 |
| Named method, no source | 5 | 1 | 1 |
| Physics or arithmetic error | 9 | 2 | 0 |
| Uncited quantitative claim | 2 | 1 | 0 |
| Internal contradiction | 5 | 0 | 0 |
| **Total** | **26** | **5** | **1** |

## Documents audited, and their state

| Document | Words | Findings | Verdict |
|:---|---:|---:|:---|
| WG-02-DT-1.md | 3,781 | 4 | 63 dangling citation markers; Granovetter cascade condition inverted |
| WG-02-DT-2.md | 1,845 | 2 | Unedited LLM paste: 22 source stubs, mangled inline LaTeX |
| WG-02-DT-3.md | 2,907 | 1 | 8 source stubs; otherwise prose only, no checkable quantities |
| WG-02-DT-4.md | 2,601 | 5 | Hamiltonian double-counts pairs and is falsely called conserved; Granovetter inverted |
| WG-02-DT-5.md | 1,617 | 2 | 6 dangling markers; escaped quotes and broken bold shipped to production |
| WG-02-DT-Applied-Physics.md | 1,385 | 3 | Section 1 duplicated verbatim; SIR tipping point set 15x above the model's own threshold |
| WG-02-DT-Cognitive-Digital-Twin.md | 2,412 | 13 | Published code does not implement the published model; timeline physically impossible |
| WG-02-DT-High-Density-Liquid-Cooling.md | 2,701 | 13 | Thermal balance does not close; flow rate cannot carry the stated load |
| WG-02-DT-Paradigm-Library.md | 327 | 0 | Clean within what is checkable here |
| WG-02-DT-Seven-Staff-Fugue.md | 2,348 | 9 | Topology claim mathematically impossible; counterpoint history reversed |

---

# Findings

## Class 1. A setting, limit or specification reported as a measurement

### F-DT-01. A fitting pressure rating is reported as the operating pressure, and the relief valve is set below it. CONFIRMED.

`WG-02-DT-High-Density-Liquid-Cooling.md:147` establishes 6.0 bar as a
component **rating**:

> Standard quick-disconnect fittings and flexible rack hoses are rated for an
> operating pressure of $6.0\text{ bar}$ and proof tested to $12.0\text{ bar}$.

Two sibling papers then report the same number as the plant's actual operating
pressure:

- `WG-02-DT-Cognitive-Digital-Twin.md:194` — "Operating pressure is $6.0\text{ bar}$ with $38.5\text{ L/min}$ PG25 coolant."
- `WG-02-DT-Seven-Staff-Fugue.md:180` — "Coolant flow rate Q_vol >= 35 L/min PG25, P_operating <= 6.0 bar."
- `WG-02-DT-Seven-Staff-Fugue.md:101` — "supply pressure $6.0\text{ bar}$" listed as the nominal baseline.

Meanwhile the cooling paper's own OBOM envelope gives a different number:

- `WG-02-DT-High-Density-Liquid-Cooling.md:61` — "Operational envelopes: flow >= 35 L/min, temp <= 45°C, **4.5 bar**"

The engineering consequence is concrete. Gate 3
(`WG-02-DT-High-Density-Liquid-Cooling.md:176` and `:185`) specifies:

> Spring-loaded mechanical pressure relief valves calibrated to 5.5 bar on
> bypass piping

A relief valve must be set **above** the maximum operating pressure and below
the component rating. At the 4.5 bar OBOM figure, 5.5 bar is correct. At the
6.0 bar figure that two of the three papers state as the operating pressure, a
5.5 bar relief valve sits **0.5 bar below normal running pressure** and would
vent continuously from the moment the plant is commissioned; the secondary loop
could never hold pressure. The corpus asserts both, so at least one of the two
is wrong, and one of the two makes the specified control inoperable.

Fix: state 4.5 bar as the operating pressure in all three papers, reserve 6.0
bar for the fitting rating with that word attached, and check the 5.5 bar
relief setting against the corrected operating pressure. Not applied.

### F-DT-02. An administrative envelope limit is used as the physical law in the published simulation. CONFIRMED.

`WG-02-DT-Cognitive-Digital-Twin.md:268`, inside the paper's published Python
engine:

```python
temp_rate = 0.0 if incident.coolant_flow_l_min >= 35.0 else 4.2
```

35.0 L/min is the OBOM **operational envelope bound** declared at
`WG-02-DT-Cognitive-Digital-Twin.md:63` and
`WG-02-DT-High-Density-Liquid-Cooling.md:61`. It is a contractual alarm limit,
not a physical transition. The code turns it into a step function: at 35.0
L/min the die does not heat at all, and at 34.9 L/min it heats at the full
stagnation rate.

The companion paper's own physics says otherwise. Convective coefficient scales
as the 0.8 power of flow through the Dittus-Boelter form printed at
`WG-02-DT-High-Density-Liquid-Cooling.md:125`:

```
$ python3 -c "print('h ratio for a 9% flow reduction:', round((35.0/38.5)**0.8,4))"
h ratio for a 9% flow reduction: 0.9284
```

A 9% flow loss costs 7% of the heat transfer coefficient, not 100% of it. The
simulation that the paper offers as "empirical evidence to justify automated
safety interlocks" (`:284`) contains no thermal physics at all below the
envelope limit.

Fix: drive `temp_rate` from the h(Q) relation the sibling paper already states,
not from the alarm setpoint. Not applied.

### F-DT-03. An ASIC throttle setpoint is reused as a hardwired breaker trip setpoint. CONFIRMED.

`WG-02-DT-High-Density-Liquid-Cooling.md:109` establishes 85.0°C as the
**silicon's own throttling threshold**:

> Thermal throttling threshold breached (85°C) | ASIC internal thermal
> management cuts clock frequencies by 50%.

`WG-02-DT-Cognitive-Digital-Twin.md:298` then makes that same number the
setpoint of an independent hardwired protection device:

> Hardwired snap-action thermal switches and flow sensors trigger breaker
> shunt trips at 85.0°C, completely bypassing human defender approval.

A hardwired breaker trip set at the value the ASIC reaches during ordinary
throttling would cut facility power on every normal thermal excursion. The
companion paper's own Gate 1 puts the switch at a different value —
`WG-02-DT-High-Density-Liquid-Cooling.md:179`: "If die temperature breaches
$88.0^\circ\text{C}$, the switch physically opens". The two papers specify two
different setpoints for the same control, and one of them is the ASIC's
throttle point.

Fix: pick one setpoint, put it above the throttle threshold and below the 94.0°C
destruction limit, and state it identically in both papers and in
`compile_r07_cognitive_twin.py` and `compile_p11_liquid_cooling.py`. Not applied.

### F-DT-04. PUE targets are presented as facility parameters, and are not reconcilable with the stated chilled-water plant. PROBABLE.

`WG-02-DT-High-Density-Liquid-Cooling.md:25`, in a table headed "Parameter at
120 kW per rack":

> < 1.8 kW pumping power per rack, **PUE < 1.08**

and `:77`, Table 6.1: "Typical Facility PUE | 1.30 to 1.50 | 1.05 to 1.15 |
1.02 to 1.08". No source, no measurement, no "modelled" label.

The paper also specifies the primary loop at `:55` as "Primary chilled water
loop, 12°C to 18°C", which requires mechanical refrigeration. Those two
statements do not close:

```
$ python3 -c "
IT=120.0
print('PUE 1.08 non-IT budget:', IT*0.08, 'kW ; minus 1.8 kW pumping leaves', IT*0.08-1.8, 'kW')
for cop in (3,5,7): print(f'  chiller COP {cop}: draw {IT/cop:5.1f} kW -> PUE floor {1+(IT/cop+1.8)/IT:5.3f}')"
PUE 1.08 non-IT budget: 9.600000000000001 kW ; minus 1.8 kW pumping leaves 7.800000000000001 kW
  chiller COP 3: draw  40.0 kW -> PUE floor 1.348
  chiller COP 5: draw  24.0 kW -> PUE floor 1.215
  chiller COP 7: draw  17.1 kW -> PUE floor 1.158
```

Even at an optimistic COP of 7, and before counting UPS/PDU losses, lighting or
the primary distribution pumps, a plant making 12–18°C water cannot reach PUE
1.08. PUE below 1.1 is achievable, but only with warm-water DLC on free
cooling — which is a different plant from the one specified at `:55`.

Marked PROBABLE because an annualised PUE with heavy economiser hours could
approach the figure; what is certain is that it is asserted without a source or
a stated basis, and it is inconsistent with the chilled-water temperatures the
same paper specifies.

Fix: label the PUE figures as design targets, and either raise the primary loop
temperature or raise the PUE. Not applied.

---

## Class 2. Dangling citations

### F-DT-05. 69 numbered citation markers with no bibliography anywhere in the working group. CONFIRMED.

```
$ for f in references/WG-02-DT-Digital-Twin/*.md; do \
    echo "$(grep -o '\[[0-9]\]' "$f" | wc -l | tr -d ' ')  $(basename $f)"; done
63  WG-02-DT-1.md
6   WG-02-DT-5.md
0   (all others)

$ grep -rn -i "^#\+ *\(references\|bibliography\|sources\|works cited\|citations\)" \
    references/WG-02-DT-Digital-Twin/
$ echo $?
1
```

Empty output, exit 1. `WG-02-DT-1.md` uses markers `[1]` through `[9]`,
`WG-02-DT-5.md` uses `[1]`, `[2]`, `[6]`. Neither file, and no other file in
the folder, carries a reference list. Marker `[6]` in `WG-02-DT-1.md` alone
appears 12 times and carries every load-bearing claim about the Eigenia
architecture. A reader cannot resolve a single one.

Note against the register's own gate: I found **no** citation to an Eigenia,
McKenney or Seldon *work* in this folder that lacks a file. The only internal
cross-reference is at `WG-02-DT-Applied-Physics.md:70`, "See CDT Mathematical
Models for the full barrier formula", and it resolves:

```
$ grep -rn "CDT Mathematical Models" references/ | head -1
references/MP-Math-Physics-Formula/MP_Mathematical_Models.md:1:# CDT Mathematical Models; Complete Formula Reference
```

The defect here is the opposite shape from WG-04-CF: not works that do not
exist, but 69 pointers that point nowhere at all.

Fix: build the two bibliographies, or strip the markers. Note `WG-02-DT-1.md`
and `-5.md` are touched by `sweep_academic_formatting.py` and
`fix_all_academic_issues.py`; check whether either sweep introduced or would
strip the markers before editing the `.md`. Not applied.

### F-DT-06. 31 orphaned search-engine source stubs left in published prose. CONFIRMED.

```
$ grep -rnoE '[a-z][a-z0-9.-]*\+[0-9]' references/WG-02-DT-Digital-Twin/*.md \
    | grep -v 'j+1\|t+1' | wc -l
      31
```

By file: `WG-02-DT-2.md` 22, `WG-02-DT-3.md` 8, `WG-02-DT-4.md` 1. They are
Perplexity-style attribution fragments concatenated onto the last word of a
sentence, e.g. `WG-02-DT-2.md:9`:

> ...who followed the same strategy and went bankrupt or disappeared.**fs+1**

and `WG-02-DT-3.md:18`:

> ...completely reframe what the winning streak means.**jamesclear+2**

Distinct stubs: `fs`, `wikipedia`, `tylerdevries`, `martinaf`,
`thecompoundingtortoise.substack`, `acquirersmultiple`, `magnusross.github`,
`sive`, `thepowermoves`, `jamesclear`. These are live on the site. They read as
citations, resolve to nothing, and identify the drafting tool.

`WG-02-DT-4.md:166` carries the last one: "The Eigenia system satisfies this
demand at every layer:**wikipedia+1**".

Fix: strip all 31 and, where the claim needs support, cite Taleb's book by
edition and page. Not applied.

---

## Class 3. Named external methods with no traceable source

### F-DT-07. 168 invocations of 43 distinct named external methods, models and standards; zero references. CONFIRMED.

```
$ grep -h -o -E "Dittus-Boelter|Joukowsky|Darcy-Weisbach|Gated Graph Neural Network|GGNN|\
Kramers|Granovetter|Ising|Vietoris-Rips|[Pp]ersistent [Hh]omology|Betti|Feynman [Pp]ath [Ii]ntegral|\
Schenker(ian)?|Ursatz|Urlinie|Bassbrechung|Gradus ad Parnassum|Art of Fugue|Yerkes-Dodson|\
Cognitive Load Theory|Sweller|Recognition-Primed Decision|SIR [Cc]ompartmental|saddle-node bifurcation|\
spectral radius|Kronecker product|Y5381|LMA55[0-9]+|EU CRA Article 64|EN 50126|SFAIRP|Caliptra|\
OpenSIL|DEXPI|ISO 15926|CycloneDX|SPDX|EPSS|MITRE ATT&CK|BERT|Volt Typhoon" \
    references/WG-02-DT-Digital-Twin/*.md | wc -l
     168
```

Per document: Seven-Staff-Fugue 47, High-Density-Liquid-Cooling 29,
Cognitive-Digital-Twin 28, Applied-Physics 26, DT-4 20, DT-1 13, DT-5 5.

This is the standing `CLAUDE.md` policy, verbatim: content "can't cite or
invoke a named external method, model, or dataset ... without that reference
existing somewhere traceable." Kramers escape and GGNNs are the two examples
named in the policy text itself; both are invoked here, seven times and five
times respectively, unsourced.

The highest-priority subset, because a reader would try to look them up and act
on them: Dittus-Boelter, Joukowsky, Vietoris-Rips persistent homology, Feynman
path integrals, Yerkes-Dodson, Sweller's Cognitive Load Theory, Klein's RPD,
Schenkerian reduction, EN 50126, SFAIRP, Lloyd's Y5381, LMA5529–LMA5533, EU CRA
Article 64.

Fix: source each, or state it as the working group's own framing. Not applied.

### F-DT-08. The Dittus-Boelter result cannot be reproduced from the paper, and the value implies a header pipe rather than a microchannel. CONFIRMED.

`WG-02-DT-High-Density-Liquid-Cooling.md:123-127`:

> The convective heat transfer coefficient inside the microchannels is
> evaluated via the Dittus-Boelter correlation:
> $$h_{\text{conv}}(\dot{Q}) = 0.023 \cdot \left(\frac{4 \rho \dot{Q}}{\pi D_h \mu}\right)^{0.8} \cdot \text{Pr}^{0.4} \cdot \frac{k_{\text{fluid}}}{D_h}$$
> Yielding $h_{\text{conv}} \approx 18,500\text{ W/(m}^2\cdot\text{K)}$.

The expression has five inputs. The paper supplies one ($\dot{Q}$). $D_h$,
$\mu$, $\text{Pr}$ and $k_{\text{fluid}}$ appear nowhere in the document. The
stated result is therefore not checkable as printed.

Supplying standard PG25 properties at 35°C and back-solving:

```
$ python3 -c "
import math
rho,mu,k,cp=1042.0,1.8e-3,0.45,3770.0; Pr=mu*cp/k; Q=38.5/60000.0
f=lambda D: 0.023*(4*rho*Q/(math.pi*D*mu))**0.8*Pr**0.4*k/D
lo,hi=0.001,0.05
for _ in range(80):
    mid=(lo+hi)/2
    lo,hi=(mid,hi) if f(mid)>18500 else (lo,mid)
print('D_h reproducing h=18,500 with the full 38.5 L/min: %.2f mm'%(lo*1000))
print('Reynolds at that diameter: %.0f'%(4*rho*Q/(math.pi*lo*mu)))"
D_h reproducing h=18,500 with the full 38.5 L/min: 9.49 mm
Reynolds at that diameter: 49843
```

Two problems. First, 9.5 mm is a distribution header bore, not a microchannel;
microchannel cold plates run 0.2–1.0 mm. Second, the printed Reynolds
expression puts the **whole rack flow** through a single hydraulic diameter. A
microchannel cold plate splits the flow among N parallel channels, so the
per-channel Reynolds number is smaller by a factor of N and the correlation has
to be evaluated per channel. As written, the formula is a single-tube
expression applied to an array.

Dittus-Boelter is also stated for fully developed turbulent flow in smooth
circular tubes; applying it to a microchannel cold plate needs an explicit
justification and a citation, and has neither.

Fix: publish $D_h$, $N$, $\mu$, $\text{Pr}$ and $k_{\text{fluid}}$, evaluate
per channel, and cite the correlation. Note this is a compiled file —
`scripts/compile_p11_liquid_cooling.py`. Not applied.

### F-DT-09. Section 4.2 names Darcy-Weisbach for an equation that is Joukowsky. CONFIRMED.

`WG-02-DT-High-Density-Liquid-Cooling.md:135-138`:

> ### 4.2 Darcy-Weisbach Hydraulic Pressure Surge (Water Hammer)
> ... induces violent hydraulic pressure spikes governed by the Joukowsky equation:
> $$\Delta P_{\text{surge}} = \rho \cdot c_{\text{sonic}} \cdot \Delta v$$

Darcy-Weisbach is the steady-flow friction head loss relation
($h_f = f \frac{L}{D}\frac{v^2}{2g}$). It has no role in water hammer. The
equation printed is Joukowsky's, correctly, and the body text says so one line
later. The heading contradicts its own section.

Fix: rename the heading to "Joukowsky Hydraulic Pressure Surge". Not applied.

### F-DT-10. EN 50126, a railway RAMS standard, is invoked as a data-centre provenance standard. CONFIRMED.

`WG-02-DT-High-Density-Liquid-Cooling.md:210`:

> Full compliance with EN 50126 and IEC 62443 guarantees verified provenance,
> while Caliptra 2.0 silicon roots of trust, DICE identities, and OpenSIL
> initializers eliminate common-cause firmware exploitation.

EN 50126 is *Railway Applications — The Specification and Demonstration of
Reliability, Availability, Maintainability and Safety (RAMS)*. It is scoped to
railway systems and it specifies a lifecycle process for demonstrating RAMS
targets. It says nothing about supply-chain provenance and does not apply to a
hyperscale cooling plant. "Guarantees verified provenance" is not a claim any
RAMS standard makes.

Caliptra 2.0, DICE and OpenSIL in the same sentence are three further named
external technologies with no reference.

Fix: strike EN 50126 or replace it with the standard actually intended
(IEC 61508 for the SIL claims, IEC 62443-4-1 for provenance). Not applied.

### F-DT-11. The attribution of counterpoint to Bach and Fux is chronologically reversed. CONFIRMED.

`WG-02-DT-Seven-Staff-Fugue.md:51`:

> In traditional Western counterpoint (codified by Johann Sebastian Bach in
> *The Art of Fugue* and formalized by Johann Joseph Fux in *Gradus ad
> Parnassum*)...

Fux published *Gradus ad Parnassum* in 1725. Bach's *Die Kunst der Fuge* was
composed in the 1740s and published posthumously in 1751. Fux's formalisation
precedes Bach's work by roughly a quarter century, so "formalized by ... Fux"
cannot follow "codified by ... Bach". Fux codified species counterpoint,
abstracting Palestrina; *The Art of Fugue* is a compositional cycle, not a
codification. Both halves of the sentence are wrong, and they are wrong in
opposite directions.

Fix: "formalised by Fux in *Gradus ad Parnassum* (1725) and exemplified by Bach
in *The Art of Fugue*". Compiled file — `scripts/compile_r05_seven_staff_fugue.py`.
Not applied.

### F-DT-12. Lloyd's Y5381, LMA5529–LMA5533, EU CRA Article 64 and SFAIRP. UNVERIFIABLE.

Nine invocations of Lloyd's Y5381 across four papers, always as the frame for
the actuarial sections; three of EU CRA Article 64 as the source of the
regulatory fine term $\Phi_{\text{regulatory}}$; one of LMA5529–LMA5533; two of
SFAIRP. None carries a citation.

I have no offline access to Lloyd's market bulletins or the CRA text and cannot
confirm that Y5381 is the bulletin the papers think it is, that LMA5529–5533 is
the correct range, or that Article 64 is the CRA's penalties article. Flagged
rather than asserted either way. These carry the entire underwriting argument
in three papers and should be verified against primary sources before the next
publication pass.

### F-DT-13 (naming). "7 +/- 2 chunk working memory threshold". PROBABLE.

`WG-02-DT-Cognitive-Digital-Twin.md:26`:

> Cognitive load breaches the 7 +/- 2 chunk working memory threshold.

Miller (1956) concerns the span of immediate memory for *items*, and modern
working-memory capacity estimates put the figure nearer four chunks. Presenting
7±2 as "the working memory threshold" uses the superseded figure without saying
so. Marked PROBABLE: I am confident of the literature but cannot cite it from
this environment.

---

## Class 4. Physics that does not check out

### F-DT-14. The steady-state thermal balance does not close. The stated cold plate removes 40% of the stated die power. CONFIRMED.

`WG-02-DT-High-Density-Liquid-Cooling.md:118-127` gives every input:

- $P_{\text{die}} = 1,200\text{ W}$
- $A_{\text{die}} = 0.00081\text{ m}^2$
- $h_{\text{conv}} \approx 18,500\text{ W/(m}^2\cdot\text{K)}$
- "junction temperature stabilizes comfortably at $T_j = 64.2^\circ\text{C}$"

and `:131` fixes the coolant at 32°C by using $(T_j - T_{\text{coolant}}) = 32$.

At steady state $P_{\text{die}} = h A (T_j - T_{\text{coolant}})$:

```
$ python3 -c "
P,A,h,dT=1200.0,0.00081,18500.0,32.2
print('heat the cold plate can remove:', round(h*A*dT,1),'W  vs  P_die =',P,'W')
print('dT required to reject 1200 W:', round(P/(h*A),1),'K  -> Tj =', round(32+P/(h*A),1),'C')
print('h required to hold Tj=64.2 C:', round(P/(A*dT)),'W/(m2.K)  = ', round(P/(A*dT)/h,2),'x the stated value')"
heat the cold plate can remove: 482.5 W  vs  P_die = 1200.0 W
dT required to reject 1200 W: 80.1 K  -> Tj = 112.1 C
h required to hold Tj=64.2 C: 46009 W/(m2.K)  =  2.49 x the stated value
```

With the paper's own numbers the die sits at 112°C in *normal operation* —
18°C above the 94.0°C "irreversible destruction limit" the same section
defines. The claimed 64.2°C steady state requires an h of 46,000 W/(m²·K),
2.5x the value the paper derives from Dittus-Boelter.

One of $h$, $A_{\text{die}}$, $P_{\text{die}}$ or $T_j$ is wrong. The heat flux
cross-check confirms $P$ and $A$ are mutually consistent
($1200/0.00081/10^4 = 148.1\text{ W/cm}^2$, matching `:121`), so the error is in
$h$ or in $T_j$. This is the load-bearing number for the whole paper: every
timing claim descends from the 64.2°C starting point.

Fix: recompute $h$ with a real microchannel geometry (see F-DT-08) and republish
$T_j$. Not applied.

### F-DT-15. 38.5 L/min cannot carry 120 kW. The implied return temperature violates the paper's own envelope by 34 K. CONFIRMED.

The corpus states, in three papers, a rack load of 120 kW and a coolant flow of
38.5 L/min PG25 (`High-Density:23`, `:123`; `Cognitive:194`; `Fugue:203`), with
a TCS secondary supply of 32°C (`High-Density:56`) and an OBOM envelope of
temp ≤ 45°C (`High-Density:61`, `Cognitive:63`). Volumetric heat capacity of
PG25 is given as 3,950 kJ/(m³·K) at `High-Density:79`.

$Q = \rho c_p \dot{V} \Delta T$:

```
$ python3 -c "
rhocp=3950.0; Q=38.5/60000.0
for frac,lab in ((1.0,'all rack heat to liquid'),(0.85,'85% capture, paper line 86'),(0.80,'80% capture')):
    load=120*frac; dT=load/(rhocp*Q)
    print(f'{lab:32s} {load:6.1f} kW -> dT = {dT:5.1f} K, return = {32+dT:5.1f} C')
print('flow needed for 120 kW inside the 45 C envelope (dT<=13 K):',
      round(120/(rhocp*13)*60000,1),'L/min')"
all rack heat to liquid            120.0 kW -> dT =  47.3 K, return =  79.3 C
85% capture, paper line 86         102.0 kW -> dT =  40.2 K, return =  72.2 C
80% capture                         96.0 kW -> dT =  37.9 K, return =  69.9 C
flow needed for 120 kW inside the 45 C envelope (dT<=13 K): 140.2 L/min
```

Even on the paper's own most favourable assumption — DLC captures only 80% of
rack heat (`High-Density:86`) — the coolant leaves the rack at 70°C, 25 K above
the stated operational envelope. It also makes the 64.2°C junction temperature
of F-DT-14 impossible on its own terms: the die cannot be cooler than the fluid
leaving it.

The flow is understated by roughly a factor of 3.6. 140 L/min is the correct
order for a 120 kW DLC rack.

For contrast, the air-side arithmetic in the same section **is** right:

```
$ python3 -c "
m3s=16000*0.0004719474
print('16,000 CFM =', round(m3s,3),'m3/s   (paper line 17 says 7.55)')
print('implied air dT for 130 kW at 1.2 kJ/m3K:', round(130/(1.2*m3s),1),'K')"
16,000 CFM = 7.551 m3/s   (paper line 17 says 7.55)
implied air dT for 130 kW at 1.2 kJ/m3K: 14.3 K
```

Both correct. The unit conversion and the implied 14 K air rise are sound. The
liquid side is where it breaks.

Fix: raise the flow to ~140 L/min, or state a higher supply temperature and
raise the envelope. Compiled file. Not applied.

### F-DT-16. The 45-second thermal timeline contradicts its own rate of rise, in all three papers, by factors of 3 to 6. CONFIRMED.

`WG-02-DT-High-Density-Liquid-Cooling.md:131` computes the stagnation rate and
the arithmetic is correct:

$$\frac{dT_j}{dt} \approx \frac{1,200 - (450 \cdot 0.00081 \cdot 32)}{142} = \frac{1,200 - 11.6}{142} \approx 8.37^\circ\text{C/s}$$

`:133` then floors it at "exceeding $4.2^\circ\text{C/s}$" and asserts three
timings. The Mermaid diagram at `:101` and the table at `:104-110` assert two
more. Every one of them is incompatible with both rates:

```
$ python3 -c "
T0,Tthr,Tdes=64.2,85.0,94.0
for r in (8.37,4.2):
    print(f'at {r} C/s: 85 C at t={(Tthr-T0)/r:5.2f} s ; 94 C at t={(Tdes-T0)/r:5.2f} s')
print('paper 4.1 says 85 C at t=14.8 s -> implied rate', round((Tthr-T0)/14.8,2),'C/s')
print('paper timeline says 85 C at t=38 s -> implied rate', round((Tthr-T0)/38,2),'C/s')
print('paper timeline says 94 C at t=45 s -> implied rate', round((Tdes-T0)/45,2),'C/s')
print('timeline segment 85 C@38 s to 94 C@45 s -> rate', round((Tdes-Tthr)/7,2),'C/s')"
at 8.37 C/s: 85 C at t= 2.49 s ; 94 C at t= 3.56 s
at 4.2 C/s: 85 C at t= 4.95 s ; 94 C at t= 7.10 s
paper 4.1 says 85 C at t=14.8 s -> implied rate 1.41 C/s
paper timeline says 85 C at t=38 s -> implied rate 0.55 C/s
paper timeline says 94 C at t=45 s -> implied rate 0.66 C/s
timeline segment 85 C@38 s to 94 C@45 s -> rate 1.29 C/s
```

Four mutually exclusive rates in one section: 8.37, 4.2, 1.41 and 0.55 °C/s.
The abstract adds a fifth framing — `:5`, "reaches thermal throttling limits
within 38 seconds and breaches irreversible package destruction thresholds
($>94.0^\circ\text{C}$) in less than 90 seconds" — against §4's 45.0 s.

`WG-02-DT-Cognitive-Digital-Twin.md:201-204` is worse, because there the
contradiction is self-contained and the implied start temperature is physically
impossible:

> T = 12.0s: Volumetric flow drops; die temperature surges at 4.2°C/s.
> T = 45.0s: Silicon junction temperature reaches 94.0°C. DELAMINATION.

```
$ python3 -c "
print('rise over 33 s at 4.2 C/s =', 4.2*33, 'K')
print('implied starting temperature =', round(94.0-4.2*33,1),'C')
print('rate required from 64.2 C at t=12 s to 94.0 C at t=45 s:', round((94.0-64.2)/33,2),'C/s')"
rise over 33 s at 4.2 C/s = 138.6 K
implied starting temperature = -44.6 C
rate required from 64.2 C at t=12 s to 94.0 C at t=45 s: 0.9 C/s
```

A die starting at minus 44.6°C. `WG-02-DT-Seven-Staff-Fugue.md:207-209` repeats
the same pair of anchors (4.2 °C/s at t=12 s; 85.0°C at t=38 s; 94.0°C at
t=45 s) and inherits the same contradiction.

This is the defect class F1 and F6 identified in WG-04-CF, in a different
domain: a number that is not what the paper says it is. Here the 45 seconds is
the *title* of the mechanism — "The 45-Second Thermal Trip Cliff" — and the
paper's own physics gives 3.6 seconds.

The honest resolution is probably that the lumped capacitance is far larger
than the 142 J/K stated, or that the transient is not lumped at all (the die
has a capacitance near 1 J/K; the copper block near 140 J/K; the TIM between
them cannot pass 1,200 W without a large temperature drop, so they do not rise
together). Either way the section needs re-deriving, not patching.

Fix: re-derive the transient with a two-node model (die, cold plate) and
publish one timeline. All three papers, two of them compiled. Not applied.

### F-DT-17. The Granovetter cascade condition is stated backwards in two papers. CONFIRMED.

`WG-02-DT-4.md:137`:

> The cascade condition; self-sustaining attack propagation; occurs when the
> curve y=F(x) crosses y=x **from above**. Below this intersection, the attack
> dies out naturally. Above it, it becomes self-sustaining with no further
> adversary input required.

`WG-02-DT-1.md:140` repeats it: "The cascade condition is geometric: the CDF
curve must cross the identity line from above."

The second and third sentences of the DT-4 passage describe a **repelling**
fixed point. A crossing from above is an **attracting** one. The two halves of
the sentence describe opposite objects:

```
$ python3 -c "
def it(F,x0,n=500):
    x=x0
    for _ in range(n): x=min(1.0,max(0.0,F(x)))
    return x
FA=lambda x: 0.30+0.40*x          # crosses y=x from ABOVE at x*=0.5, F'=0.4
FB=lambda x: max(0.0,-0.30+1.60*x) # crosses y=x from BELOW at x*=0.5, F'=1.6
for F,lab in ((FA,'FROM ABOVE'),(FB,'FROM BELOW')):
    print(lab, [f'x0={x0:.2f}->{it(F,x0):.3f}' for x0 in (0.10,0.49,0.51,0.90)])"
FROM ABOVE ['x0=0.10->0.500', 'x0=0.49->0.500', 'x0=0.51->0.500', 'x0=0.90->0.500']
FROM BELOW ['x0=0.10->0.000', 'x0=0.49->0.000', 'x0=0.51->1.000', 'x0=0.90->1.000']
```

A crossing from above is a stable attractor: the cascade converges *to* x* from
both directions and **stops there**. It is the condition under which a cascade
is bounded, not the condition under which it runs away. The behaviour the paper
describes in words — dies out below, self-sustains above — is the signature of
a crossing from **below**, where $F'(x^*) > 1$.

The next sentence in DT-4 then compounds it: "identifies ... which high-threshold
nodes ... could be inserted to move the intersection point such that no cascade
is geometrically possible below a chosen contamination fraction" — that
remediation only makes sense against a repelling threshold, i.e. against a
crossing from below. The prose is consistent with itself and inconsistent with
the geometric label.

Fix: "from below" in both files, and check `MP_Mathematical_Models.md` for the
same wording. Not applied.

### F-DT-18. The Interaction Hamiltonian double-counts every interaction, and is declared conserved in a sentence that describes dissipation. CONFIRMED.

`WG-02-DT-4.md:99`:

$$H = \sum_i \frac{1}{2} m_i v_i^2 + \sum_{i,j} V_{ij}(x_i, x_j)$$

The pair term sums over **ordered** pairs. Every interaction appears twice, plus
n spurious self-terms $V_{ii}$:

```
$ python3 -c "
n=6
print(f'{n} responders: distinct pairs={n*(n-1)//2}; sum over (i,j) enumerates {n*n} ordered terms')
print('-> each interaction counted twice, plus', n, 'self-interaction terms V_ii')"
6 responders: distinct pairs=15; sum over (i,j) enumerates 36 ordered terms
-> each interaction counted twice, plus 6 self-interaction terms V_ii
```

The corpus knows the right form: `WG-02-DT-Seven-Staff-Fugue.md:164` writes the
same object correctly as $\sum_{j<k} V_{\text{dissonance}}(x_j, x_k)$.

Second, `WG-02-DT-4.md:105`:

> The Hamiltonian is conserved: total "energy" is neither created nor
> destroyed, only transformed. An organization with high internal dissonance
> does not expend less total energy; it converts more of its response energy
> into **friction heat** rather than effective action.

Those two sentences are contradictory. Conversion to friction heat is
dissipation; a system with dissipation is precisely one whose Hamiltonian is
**not** conserved. Conservation also requires a closed system with no explicit
time dependence, and the model at `:157` is explicitly driven by external
shocks ("a new zero-day, a regulatory event, a staff departure") and damped by
"resilience damping factors". A driven, damped system does not conserve H.

Third, minor but real: a Hamiltonian is a function of canonical momenta,
$\sum p_i^2/2m_i$; $\tfrac12 mv^2$ is the Lagrangian kinetic term. And
$H = T + V$ is classical mechanics, not, as `:97` says, "the central object of
quantum mechanics".

Fix: write $\sum_{i<j}$, drop the conservation claim, and describe the model as
what it is — a driven damped energy functional. Not applied.

### F-DT-19. An "infinite-persistence H_1 cycle" cannot exist in a finite Vietoris-Rips filtration. CONFIRMED.

`WG-02-DT-Seven-Staff-Fugue.md:211`:

> The persistent homology barcode detects the emergence of an
> **infinite-persistence $H_1$ cycle** at $t = 8.5\text{s}$; fully 36.5 seconds
> before irreversible physical destruction.

The point cloud is defined at `:114-116` as seven points, one per stave, and the
complex at `:118` as $\mathcal{VR}(X,\epsilon)$. In a Vietoris-Rips filtration
on a finite point set, once $\epsilon \ge \operatorname{diam}(X)$ every subset
is a simplex, so the complex is the full 6-simplex on seven vertices, which is
contractible: $H_1 = 0$. Every $H_1$ bar therefore dies at or before
$\epsilon = \operatorname{diam}(X)$. Only $H_0$ carries an essential (infinite)
bar. An infinite-persistence $H_1$ class is impossible by construction.

Two further errors in the same mechanism:

**Units.** Persistence length is measured in units of the filtration parameter
$\epsilon$, which the paper defines at `:120` as a dissonance magnitude
$|x_j - x_k|$. `:224-225` then trips a breaker on it in seconds:

> If the persistent homology persistence length ell_i of any cross-layer $H_1$
> cycle exceeds **1.8 seconds**, hardwired SIL-3 relays trip the main circuit
> breakers

A dissonance magnitude is not a time. The safety function as specified compares
incommensurable quantities.

**Three incompatible criteria for the same trip.** `:138` "exceeds critical
threshold tau_crit"; `:143` "$\ell_i = d_i - b_i > 2.5\sigma$"; `:225`
"exceeds 1.8 seconds". A threshold, a standard-deviation multiple and a
duration, all offered as the trigger for the same autonomous breaker trip.

Fix: state the filtration parameter and its units, pick one criterion, and
replace "infinite-persistence" with a finite persistence threshold. Compiled
file. Not applied.

### F-DT-20. The actuarial identity equates a per-year rate to a dimensionless probability, and SLE to PML, in three papers. CONFIRMED.

`WG-02-DT-Seven-Staff-Fugue.md:245`:

$$\text{ALE}_{\text{fugue}} = \text{SLE}_{\text{catastrophe}} \times \text{ARO}_{\text{path}} = \text{PML}_{\text{facility}} \times \int_{\text{collapse paths}} \mathcal{D}[\mathbf{x}] \, |\psi(\mathbf{x})|^2$$

ARO is an annualised rate of occurrence, with units of yr⁻¹. The right-hand
factor is a path integral of a squared amplitude, which is dimensionless (and,
if the amplitude were normalised over all paths, would be 1). The equation
cannot be dimensionally balanced. ALE, in USD/yr, is being computed from
USD × dimensionless.

Second, all three actuarial sections set SLE = PML:

- `High-Density:196` — $\text{ALE} = \text{SLE} \times \text{ARO} = \text{PML} \times \text{ARO}$
- `Cognitive:316` — $\text{ALE} = \text{SLE} \times \text{ARO} = \text{PML}_{\text{hall}} \times (\dots)$
- `Fugue:245` — as above

Single Loss Expectancy is the expected loss per event. Probable Maximum Loss is
the worst credible loss. They are different constructs and are not equal in any
actuarial framework. Setting SLE = PML makes ALE the product of the *maximum*
loss and the event frequency, which systematically overstates the expected
annual loss and inflates every ROSI figure downstream.

Fix: keep SLE and PML distinct; state ARO explicitly with units; replace the
path-integral term with a rate. Two compiled files. Not applied.

### F-DT-21. The replacement-cost model prices one accelerator tray per 120 kW rack, against the paper's own die power. CONFIRMED.

`WG-02-DT-Cognitive-Digital-Twin.md:321` and
`WG-02-DT-Seven-Staff-Fugue.md:250`:

> $C_{\text{replacement}}$ is the capital asset replacement cost
> ($14,400,000\text{ USD}$ per 120-rack compute hall).

`WG-02-DT-High-Density-Liquid-Cooling.md:201` gives the unit price:

> $120,000\text{ USD}$ per ruined accelerator tray

```
$ python3 -c "
print('accelerators per rack = 120 kW / 1.2 kW =', 120000/1200)
print('14,400,000 / 120,000 =', 14400000//120000, 'trays for a 120-rack hall = 1 tray per rack')
for n in (2,4,8,18):
    t=120*(100/n); print(f'  at {n:2d} accelerators/tray: {t:6.0f} trays -> {t*120000/1e6:7.1f} M USD')"
accelerators per rack = 120 kW / 1.2 kW = 100.0
14,400,000 / 120,000 = 120 trays for a 120-rack hall = 1 tray per rack
  at  2 accelerators/tray:   6000 trays ->   720.0 M USD
  at  4 accelerators/tray:   3000 trays ->   360.0 M USD
  at  8 accelerators/tray:   1500 trays ->   180.0 M USD
  at 18 accelerators/tray:    667 trays ->    80.0 M USD
```

The corpus's own $P_{\text{die}} = 1,200\text{ W}$ and 120 kW rack density put
100 accelerators in each rack. At any plausible tray population the hall holds
667 to 6,000 trays, not 120. The stated PML is understated by between 5x and
50x. `Cognitive:206` confirms the intended reading — "120 accelerator trays
permanently ruined" for the whole hall, i.e. one tray per rack.

Every downstream figure — SLE, ALE, ROSI, the $75,000,000 affirmative limit,
the attachment points — rests on this number.

Fix: state accelerators per tray and trays per rack, recompute. Two compiled
files. Not applied.

### F-DT-22. The hardened ALE does not follow from the paper's own formula. CONFIRMED.

`WG-02-DT-Cognitive-Digital-Twin.md:316` makes ALE strictly proportional to
$P_{\text{cognitive collapse}}$ with all other terms held fixed. `:325` then
states both the probability change and the ALE change:

> reduces the probability of human-induced thermal destruction
> $P_{\text{cognitive collapse}}$ from $0.42$ to $0.015$, mitigating annualized
> loss expectancy from $9,600,000\text{ USD}$ to $290,000\text{ USD}$

```
$ python3 -c "
print('9,600,000 x 0.015/0.42 =', round(9600000*0.015/0.42), 'USD ; paper states 290,000')
print('P implied by 290,000  =', round(0.42*290000/9600000,5), '; paper states 0.015')"
9,600,000 x 0.015/0.42 = 342857 USD ; paper states 290,000
P implied by 290,000  = 0.01269 ; paper states 0.015
```

An 18% discrepancy between the two stated numbers under the paper's own
identity. The ROSI arithmetic itself is correct given the inputs — I checked
all three:

```
$ python3 -c "
for lab,u,h,c,claim in (('cooling',8450000,125000,180000,'4,525%'),
                        ('cognitive',9600000,290000,240000,'3,779%'),
                        ('fugue',10500000,340000,310000,'3,177%')):
    print(f'{lab:10s} {((u-h)-c)/c*100:8.1f}%  (paper: {claim})')"
cooling      4525.0%  (paper: 4,525%)
cognitive    3779.2%  (paper: 3,779%)
fugue        3177.4%  (paper: 3,177%)
```

The formula is applied correctly. The inputs are the problem (see F-DT-21 and
F-DT-26).

Fix: make ALE_hardened $342,857, or restate $P$. Compiled file. Not applied.

### F-DT-23. The SIR tipping point is set 15x above the model's own critical value. PROBABLE.

`WG-02-DT-Applied-Physics.md:8` and `:39` (the duplicated block):

> How fast a vulnerability "infects" connected systems across the OT/IT
> network. **R0 > 15 triggers a "TIPPING" status.**

and `:19`: `modelRisk("sir_r0") = min(1, sir_r0 / 50.0)`.

In the SIR compartmental model the epidemic threshold is $R_0 = 1$ by
construction: below it an outbreak dies out, above it, it grows. There is no
second critical point at 15. The dashboard's risk mapping saturates at
$R_0 = 50$, which places the entire supercritical range from 1 to 15 in
"non-tipping" and the range 1 to 50 below maximum risk.

`WG-02-DT-4.md:113` states the network form of the same threshold correctly —
$R_0 = \frac{\beta}{\gamma}\lambda_{\max}(A)$, with the standard reading that
the topology sets the threshold — and then does not connect it to the 15.

Marked PROBABLE rather than CONFIRMED because the 15 may be a calibrated
operational trigger for a modified model rather than a claim about SIR's
critical point. As published there is nothing that says so, and the section is
headed "SIR Compartmental Model".

Fix: state the basis for 15, or key the status to $R_0 = 1$. Not applied.

### F-DT-24. The Joukowsky wave speed is mislabelled and no closure-time test is applied. PROBABLE.

`WG-02-DT-High-Density-Liquid-Cooling.md:142`:

> $c_{\text{sonic}} \approx 1,280\text{ m/s}$ (acoustic wave speed in stainless
> steel piping).

In the Joukowsky relation $c$ is the pressure-wave celerity **in the fluid,
corrected for pipe wall elasticity**, not the speed of sound in the pipe metal
(which is roughly 5,000 m/s in steel). The value 1,280 m/s is a reasonable
celerity for a glycol mix in a stiff pipe; the parenthetical describes a
different quantity.

The arithmetic is right:

```
$ python3 -c "print(1042*1280*1.85, 'Pa =', round(1042*1280*1.85/1e5,2),'bar  (paper: 24.67 bar)')"
2467456.0 Pa = 24.67 bar  (paper: 24.67 bar)
```

Two further gaps. $\Delta v = 1.85\text{ m/s}$ is described as "initial fluid
velocity" but `:107` gives the microchannel velocity as 1.8 m/s; the Joukowsky
$\Delta v$ is the velocity change in the pipe at the closing valve, a different
location. And full Joukowsky applies only to closure faster than $2L/c$; for a
50 m loop that is 78 ms. `:136` says the valve is "commanded rapidly closed",
but a motorised isolation valve typically strokes in seconds, in which case
24.67 bar is an upper bound and not the surge.

Marked PROBABLE: the number is defensible as a worst case, the label and the
missing closure-time test are not.

Fix: correct the parenthetical to "pressure wave celerity in PG25 within the
piping", state the pipe velocity, and add the $2L/c$ test. Compiled file.
Not applied.

---

## Class 5. Uncited quantitative claims

### F-DT-25. Every input to three actuarial models is uncited and three outputs are called "verified". CONFIRMED.

No document in this folder carries a source for any of the following:

| Claim | Where |
|:---|:---|
| $120,000 per accelerator tray; $18,500/hour BI | `High-Density:201-202` |
| $14,400,000 per 120-rack hall; $24,000/hour BI | `Cognitive:321-322`, `Fugue:250-251` |
| ALE $8,450,000 → $125,000; $C=180,000$ | `High-Density:210` |
| ALE $9,600,000 → $290,000; $C=240,000$; $P$ 0.42 → 0.015 | `Cognitive:325` |
| ALE $10,500,000 → $340,000; $C=310,000$ | `Fugue:254` |
| "40% capital surcharge", "$25,000,000 deductible", "$75,000,000" limits | `High-Density:214-217` |
| "reduces extraneous cognitive load $C_{\text{extraneous}}$ by 72%" | `Cognitive:302` |
| "probability of transitioning ... surges by 840%" | `Cognitive:180` |
| "3.2M-node AEON digital twin" | `Fugue:10` |
| "acoustic sound pressure levels exceeding 95 dBA" | `High-Density:17` |
| "captures 80% to 85% of total rack heat" | `High-Density:86` |
| "$h_{\text{conv}}$ plummets by 95%" | `High-Density:107` |

Three of the outputs are then labelled as established fact:
"delivering a **verified** ROSI = 4,525%" (`High-Density:210`), "delivering a
**verified** Return on Security Investment" (`Cognitive:325`), "yielding a
**verified** Return on Security Investment" (`Fugue:254`). Nothing was
verified. This is the F10 defect class from WG-04-CF, one hop further along:
not merely an uncited percentage in a cost-benefit table, but an uncited
percentage described as verified, inside a document aimed at underwriters.

"MPN" at `Cognitive:302`, the named mechanism credited with the 72% reduction,
is an undefined acronym that appears once in the corpus.

Fix: label everything in these sections as modelled with stated assumptions, or
cite it. Strike "verified" in all three places. Not applied.

### F-DT-26. An absolute negative claim about four named vendors, uncited. CONFIRMED as uncited; the claim itself is UNVERIFIABLE.

`WG-02-DT-High-Density-Liquid-Cooling.md:153` and `:157`:

> Commercial Coolant Distribution Units manufactured by leading OEMs (CoolIT,
> Vertiv, Motivair, Schneider) represent the single highest-consequence attack
> surface in hyperscale infrastructure
> ...
> **Zero ISASecure / IEC 62443 certification.** Not a single commercial CDU
> controller holds IEC 62443-4-2 component-level certification. Firmware lacks
> secure boot and crypto signatures.

Repeated in Table 6.1 at `:82` as "Zero certified CRAH controllers / Zero
certified CDU controllers / Zero certified immersion controllers".

This names four real companies and asserts a security deficiency in their
products as established fact. The ISASecure certification registry is public
and the claim is checkable, but not from here. Whatever its truth, publishing
it without the registry query and its retrieval date is indefensible for a
claim of this shape.

Fix: query the ISASecure registry, cite it with a date, and narrow the claim to
what the query supports. Compiled file. Not applied.

### F-DT-27. Simulation outputs presented without a modelled label. PROBABLE.

`WG-02-DT-1.md:98`:

> It tells you: in 73% of simulated campaigns, the adversary reaches your Level
> 2 network. In 31%, they achieve persistence in the OT zone. In 8.4%, they
> reach a safety-critical system. In 2.1% ... The 95% confidence interval for
> that 2.1% is [1.4%, 3.2%]. [6]

Repeated at `:186` inside a table row describing what the product "tells the
board". The framing ("It tells you") reads as illustrative, which is why this
is PROBABLE not CONFIRMED, but a reader encountering 8.4% twice with a
confidence interval attached will take it as a result. Marker `[6]` resolves to
nothing (F-DT-05).

Fix: prefix with "for example" or make the illustrative status explicit. Not applied.

---

## Class 6. Internal contradictions

### F-DT-28. Section 1 of the Applied Physics paper is duplicated verbatim. CONFIRMED.

```
$ diff <(sed -n '4,21p'  references/WG-02-DT-Digital-Twin/WG-02-DT-Applied-Physics.md) \
       <(sed -n '35,52p' references/WG-02-DT-Digital-Twin/WG-02-DT-Applied-Physics.md) \
  && echo "IDENTICAL"
IDENTICAL
```

Eighteen lines, including the heading `## 1. SIR Compartmental Model (Epidemic
Spreading)`, appear twice with the summary table wedged between them. The
document has two sections numbered 1 and no section between 1 and 2. This is
live on the site.

Minor, same file: the column at `:197` is labelled `epcs_score` and described as
"EPSS composite score" — a transposition, worth checking against the real schema
before correcting either way.

The rest of this document checks out. The dashboard weights sum correctly
(0.20 + 0.20 + 0.20 + 0.20 + 0.10 + 0.10 = 1.00), the EPSS boost range
[1.15, 1.5] is consistent with the `delta_30d > 0.05` filter and the
`1 + min(delta*3, 0.5)` formula, and the spectral boost mapping
(`1.8 - eigen_rank*7.0`, giving 1.8 at 0 and 1.1 at 0.1) is arithmetically
correct.

Fix: delete lines 35-52. Hand-maintained file. Not applied.

### F-DT-29. Six quantities disagree between papers that describe the same facility. CONFIRMED.

| Quantity | Value A | Value B |
|:---|:---|:---|
| Heat flux | 148 W/cm² (`High-Density:121`) | 140 W/cm² (`Cognitive:193`, `Fugue:201`) |
| Coolant temperature envelope | ≤ 45°C (`High-Density:61`, `Cognitive:63`) | ≤ 35°C (`Fugue:101`) |
| Operating pressure | 4.5 bar (`High-Density:61`) | 6.0 bar (`Cognitive:194`, `Fugue:101`, `:180`) |
| Gate 1 trip setpoint | 88.0°C (`High-Density:179`) | 85.0°C (`Cognitive:298`) |
| Unmitigated deductible / attachment | $25,000,000 (`High-Density:214`) | $10,000,000 (`Cognitive:334`) |
| Water vs air volumetric heat capacity | "approximately 3,000x" (`High-Density:3`) | "3,486-fold" (`High-Density:16`) |

148 W/cm² is the one that is derivable: $1200\text{ W} / 8.1\text{ cm}^2 =
148.1$. The 140 in the two sibling papers is simply wrong.

3,486 is likewise the derivable one: $4184/1.2 = 3486.7$. The abstract's
"approximately 3,000x" understates the body of its own paper by 14%.

One more inside a single paper. `High-Density:17` says fans "consume over 25% of
total rack electrical power"; the table at `:25` says "28 kW fan power per rack,
eating 20% of facility power" for a 120 kW rack:

```
$ python3 -c "
print('28 kW on a 120 kW rack =', round(28/120*100,1),'% of rack IT power ;', round(28/148*100,1),'% of rack total')
print('>25% of a 130 kW rack would be >', 0.25*130,'kW')"
28 kW on a 120 kW rack = 23.3 % of rack IT power ; 18.9 % of rack total
>25% of a 130 kW rack would be > 32.5 kW
```

Neither 23.3% nor 18.9% is 25%, and neither denominator is "facility power".

Fix: one canonical parameter set, applied across all three papers and their
three compilers. Not applied.

### F-DT-30. The published Python does not implement the published model. CONFIRMED.

`WG-02-DT-Cognitive-Digital-Twin.md` states a model in §3 and ships code in §6.
They differ in five ways:

| Stated model | Code at `:250-269` |
|:---|:---|
| $\frac{dA_d}{dt} = \alpha \frac{N_{\text{alarms}}}{N_{\max}} - \beta A_d$ (`:86`) | No differential equation; arousal is set algebraically each step |
| Alarm flood threshold 200/min (`:19`, `:180`) | `alarm_rate / 150.0` |
| $\eta \approx 1.25$ sharpness exponent (`:93`) | absent; `performance = 4*A*(1-A)` |
| $\xi \approx 0.45$ fatigue degradation (`:94`) | absent; $F_d(t)$ never appears |
| "When $A_d(t) < 0.20$, the defender suffers from under-arousal" (`:95`) | `arousal = clip(0.3 + 0.7*p + 0.2*n, 0, 1)`, floor 0.3 — the regime is unreachable |
| RPD match "Delay: 8-12s" (`:144`); novel "over 65.0 seconds" (`:156`) | match `8 + (1-p)*10` → 8 to 18 s; novel `25 + (1-p)*35` → 25 to 60 s |

The under-arousal regime is the clearest: the code's arousal floor is 0.3, so
the $A < 0.20$ branch the text describes can never execute. And §3.1 says
performance "collapses toward zero" above $A = 0.80$, but $4(0.8)(0.2) = 0.64$,
64% of maximum.

Fix: make the code the model or the model the code. Compiled file —
`scripts/compile_r07_cognitive_twin.py`. Not applied.

### F-DT-31. The generator matrix forbids the transition the text quantifies. CONFIRMED.

`WG-02-DT-Cognitive-Digital-Twin.md:168-174` defines a tridiagonal
birth-and-death generator over $\{S_0 \dots S_4\}$. Row 2 (state $S_1$) is:

```
q_{10}   -(q_{10}+q_{12})   q_{12}   0   0
```

The $(S_1, S_3)$ entry is **zero**. `:180` then states:

> When alarm rates breach $200\text{ alerts/minute}$, the probability of
> transitioning from Focused Investigation ($S_1$) **directly** into Panic
> Misconfiguration ($S_3$) surges by $840\%$

A direct $S_1 \to S_3$ transition has rate zero in the model the paper has just
printed; the chain can only reach $S_3$ from $S_1$ through $S_2$. The generator
is otherwise well formed (every row sums to zero, off-diagonals non-negative),
and $\mathbf{P}(t) = \exp(\mathbf{Q}t)$ is the correct relation. The word
"directly" is what makes this a contradiction rather than a loose phrasing.
840% is also uncited (F-DT-25).

Fix: either add the $q_{13}$ entry to $\mathbf{Q}$ or drop "directly". Compiled
file. Not applied.

### F-DT-32. Rendering defects shipped to production. CONFIRMED.

**Mangled inline LaTeX**, from an editor that concatenated the rendered and
source forms. `WG-02-DT-2.md:137`:

> A simple coin toss: `Pr(X=1)=0.5\text{Pr}(X=1) = 0.5Pr(X=1)=0.5, Pr(X=−1)=0.5\text{Pr}(X=-1) = 0.5Pr(X=−1)=0.5`.

and `:150`:

> Expected value: `E^[Y]=1N∑i=1Nyi\hat{E}[Y] = \frac{1}{N} \sum_{i=1}^N y_iE^[Y]=N1∑i=1Nyi`.

`WG-02-DT-2.md` also carries `P(X)P(X)P(X)`, `XXX`, `AAA`, `yi=f(xi)y_i =
f(x_i)yi=f(xi)`. `WG-02-DT-4.md` carries eleven of the same pattern —
`⊗\otimes⊗`, `PiP_iPi`, `iii`, `∑i12mivi2\sum_i \frac{1}{2} m_i v_i^2∑i21mivi2`,
`R0R_0R0`, `HHH`, `λmax⁡(A)`. Since KaTeX is called directly from
`MarkdownViewer.tsx` with no remark/rehype pipeline, none of this renders as
maths; it renders as the literal characters.

**Escaped quotes.** `WG-02-DT-5.md:136`:

> Cyber Digital Twins do not sell static `\"coverage\"`; they deliver
> anti-fragile, empirically tested truth.

**Broken bold.** `WG-02-DT-5.md:11`:

> `Our core claim is Talebian:** the goal is not to tell a better security story`

**Product name collision.** `WG-02-DT-1.md`, `-3.md` and `-4.md` call the system
"the Eigenia Cyber Digital Twin" and "the Eigenia AEON engine".
`WG-02-DT-5.md:50`, `:71`, `:78` calls the same system "OXOT" and "the CBER
Cyber Digital Twin". `WG-02-DT-4.md:24` uses "CBER" once, undefined, in a
sentence about the L0/L1 gap. A reader moving between the five papers meets
three names for one product, one of which is another company's.

**Structural.** `Cognitive-Digital-Twin.md` jumps from §4 to §4.2 with no §4.1.
`High-Density-Liquid-Cooling.md:72` labels a table "Table 6.1" inside §3.

Fix: re-run the KaTeX pass over `-2.md` and `-4.md`; unescape `-5.md:136`;
close the bold at `-5.md:11`; settle the product name. `-5.md` and `-4.md` are
touched by `fix_all_academic_issues.py`, so check the compiler before editing.
Not applied.

---

## Documents that are clean

**`WG-02-DT-Paradigm-Library.md`** (327 words). A module catalogue. No
citations to dangle, no arithmetic to check, no external method invoked beyond
naming conventions ("Pareto Severity", "Fat-Tail Analysis") that are descriptive
rather than load-bearing. The only claims are about components and tables in
another repository, which I cannot reach from here — see below. Nothing wrong
with it that I can see from this vantage.

No other document in the folder is clean.

Two things I checked and found **correct**, recorded so they are not re-audited:

- `WG-02-DT-1.md:28` and `:30`, the coin-flipping illustration:
  $10{,}000 \times 0.5^5 = 312.5 \to 313$ survivors, $10{,}000 - 313 = 9{,}687$
  losers. Both right.
- `WG-02-DT-4.md:74-82`, the Psychometric Tensor: DISC (4) $\otimes$ OCEAN (5)
  gives 20 dimensions. Right. The saddle-node normal form at `:141-145` is also
  stated correctly (two fixed points for $\mu<0$, collision at $\mu=0$, runaway
  for $\mu>0$).
- `WG-02-DT-High-Density-Liquid-Cooling.md`: the CFM conversion (16,000 CFM =
  7.551 m³/s), the heat flux (148.1 W/cm²), the 23-fold conductivity ratio
  (0.60/0.026 = 23.08), the 3,486-fold volumetric ratio (4184/1.2), the
  Joukowsky arithmetic (24.67 bar) and all three ROSI computations are
  arithmetically correct. The errors in this paper are in the physics inputs and
  the timeline, not in the sums.

---

## What I could not check, and why

1. **Lloyd's Y5381, LMA5529–LMA5533, EU CRA Article 64, ISASecure registry.**
   No offline access to Lloyd's market bulletins, the CRA text or the ISASecure
   certification database. These carry the entire actuarial and certification
   argument in four papers (F-DT-12, F-DT-26). They need a Valyu or WebSearch
   pass and an entry in `references/external-research/`.

2. **The 63 unresolved `[n]` markers in `WG-02-DT-1.md` and 6 in `-5.md`.** I can
   prove no bibliography exists. I cannot tell what they were meant to point at,
   so I cannot say whether any of them would have been a dangling *work*
   citation under the register's rule. Someone with the drafting history has to
   reconstruct them.

3. **Everything in `WG-02-DT-Applied-Physics.md` and `-Paradigm-Library.md` that
   refers to a live system.** `seldon.psychohistory_state`,
   `seldon.epss_trajectory` ("555,556 rows"), `seldon.spectral_analysis`,
   `atq_c8_kramers()`, `ConsequenceEngine.tsx`, `demo.ts`, `mc-weights.ts`,
   `mc-engine.ts`, the four API endpoints. These live in a different repository.
   I checked the internal consistency of the formulas and weights quoted and
   they hold, but whether the columns, row counts, endpoints and components
   exist as described is not checkable from `eigenia`.

4. **PG25 thermophysical properties.** F-DT-08 and F-DT-15 use $\rho = 1042$,
   $c_p = 3770$, $k = 0.45$, $\mu = 1.8\times10^{-3}$ at 35°C from standard
   tables held from training, not from a cited source. The paper supplies only
   $\rho$ (`:141`) and $\rho c_p$ (`:79`); F-DT-15 uses the paper's own
   $\rho c_p = 3950$, so that finding does not depend on my assumed values.
   F-DT-08's back-solved 9.5 mm does depend on assumed $\mu$, $k$ and $c_p$, and
   would shift somewhat with a sourced property set — not enough to turn a
   9.5 mm bore into a microchannel, but the number should be regenerated against
   a cited property table.

5. **Whether the compilers would revert any fix.** I confirmed which script owns
   each file with `grep -rln "<filename>" scripts/` but did not read the three
   compilers to see whether the defective text is embedded as a Python string
   literal (p-series) or produced by regex cleanup of a manuscript in
   `papers-pre-publish/` (r-series). Whoever applies these fixes must check
   `compile_p11_liquid_cooling.py`, `compile_r05_seven_staff_fugue.py` and
   `compile_r07_cognitive_twin.py` first, and check whether
   `sweep_academic_formatting.py` or `fix_all_academic_issues.py` created the
   mangled LaTeX in F-DT-32 before hand-editing `-2.md` and `-4.md`.

6. **Rendering.** I did not run the dev server. The KaTeX claims in F-DT-32 are
   inferred from the source text and the `MarkdownViewer.tsx` architecture noted
   in `CLAUDE.md`, not observed in a browser.
