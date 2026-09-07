# Corpus audit: WG-05-CAD, WG-07-TM, WG-08-MO

Date: 2026-09-06
Auditor scope: 11 documents across three directories
Method: full read, standard clauses catalogued, arithmetic re-derived, citations checked against disk

## Scope

| Directory | Documents |
|:---|:---|
| `references/WG-05-CAD-DEXPI-2/` | 6: DEXPI Introduction, DEXPI Open Standard Position Paper, IEC 62443 SFAIRP/SecRACS, Supply Chain EU CRA, Unified DEXPI-CycloneDX, Frontier AI Hardware Security |
| `references/WG-07-TM-Threat-Modeling/` | 4: ATQ, CyHAZOP Methodology, CyHAZOP Node Registers, TACAM |
| `references/WG-08-MO-Monte-Carlo-Application/` | 1: Monte Carlo Engine |

All 11 were read in full, line by line. None was sampled or skimmed. The
915-line `atq-card-terminal.html` in the WG-07 directory is not one of the 11
registered documents; it was inspected only far enough to confirm its BibTeX
block and that its link target `/terminals/atq-card-terminal.html` resolves to
`web/public/terminals/atq-card-terminal.html` (it does; that link is not a
defect).

Every arithmetic claim in this report was recomputed with `python3 -c`. The
commands and their output are reproduced inside the findings.

## Method note on severity

I have no web access. Accordingly:

- **CONFIRMED** means verified from files on disk: an internal contradiction, a
  recomputed number, an absent file, a row count. No external source needed.
- **PROBABLE** means strong external knowledge plus corroborating on-disk
  evidence, but the standard text itself was not opened.
- **UNVERIFIABLE** means the claim needs a document I do not have.

I have not written CONFIRMED against any statement of the form "this clause
does not exist in that standard". Those are all PROBABLE or UNVERIFIABLE, and
each says what would settle it.

## Summary

| Class | Confirmed | Probable | Unverifiable |
|:---|---:|---:|---:|
| Standard clause misattributed or unstated edition | 8 | 10 | 6 |
| Requirement reported as achieved state | 5 | 5 | 1 |
| Dangling citation | 3 | 0 | 2 |
| Named method, no source | 4 | 2 | 1 |
| Arithmetic or probability error | 29 | 6 | 2 |
| Uncited quantitative claim | 10 | 0 | 0 |

## Contrast with the sibling audits

This scope is materially better sourced than WG-01-UI and WG-02-DT, and
materially worse in one specific way.

Better: this scope contains real, specific, correctly-typed standard clause
citations. `WG-05-CAD-IEC62443-SFAIRP-SecRACS.md` cites CR 1.1, CR 1.2, CR 3.1,
CR 3.14 and CR 7.1 and correctly labels them as **component** requirements of
IEC 62443-**4-2**, not as SRs of -3-3. That is the exact error class this audit
was told to hunt, and the document does not make it. Likewise the EU CRA
penalty tiers are cited to Article 64(3)/(4)/(5) with the correct
"whichever is higher" construction, and the regulation number 2024/2847 is
used consistently in five places across three documents. One document,
`WG-05-CAD-Frontier-AI-Hardware-Security.md`, carries a genuine 24-entry IEEE
bibliography — the only bibliography in all 11 documents.

Worse: that bibliography is **orphaned**. Across all 11 documents there are
**zero** `[n]` citation markers:

```
$ for f in <11 files>; do echo "$(basename $f): $(grep -oE '\[[0-9]+\]' "$f" | wc -l)"; done
WG-05-CAD-DEXPI-Introduction.md: 0
WG-05-CAD-DEXPI-Open-Standard-Position-Paper.md: 0
WG-05-CAD-Frontier-AI-Hardware-Security.md: 0
WG-05-CAD-IEC62443-SFAIRP-SecRACS.md: 0
WG-05-CAD-Supply-Chain-EU-CRA.md: 0
WG-05-CAD-Unified-DEXPI-CycloneDX.md: 0
WG-07-TM-ATQ.md: 0
WG-07-TM-CyHAZOP-Methodology.md: 0
WG-07-TM-CyHAZOP-Node-Registers.md: 0
WG-07-TM-TACAM.md: 0
WG-08-MO-Monte Carlo Engine.md: 0
```

So the check the brief asked for — `[n]` indices exceeding the bibliography
length — cannot fire, because no document invokes its bibliography at all. Not
one of the 24 Frontier references is cited from the body. Three of them
(Taleb *Antifragile*, Granovetter *Threshold Models*, Kramers 1940) support no
sentence anywhere in that document.

The dominant defect in this scope is different from the siblings'. It is not
absent citation. It is **internal contradiction**: the same standard, the same
acronym, the same physical constant and the same threat actor are given
different values in different documents of the same working group, and often
within one document. Nineteen of the findings below are proved purely by
setting two passages of the corpus side by side.

## Note on em dashes

`WG-05-CAD-DEXPI-Open-Standard-Position-Paper.md` carries 3 em dashes, at lines
21, 135 and 155, all three in the attribution line of a pull quote
(`> *— Mechanical Engineer / Piping Specialist ...*`). Noted once, as
instructed, and not pursued. No other style observations appear in this report.

---

## Standard clauses cited, for later verification

Document short names: **INTRO** = WG-05-CAD-DEXPI-Introduction, **POS** =
WG-05-CAD-DEXPI-Open-Standard-Position-Paper, **SFAIRP** =
WG-05-CAD-IEC62443-SFAIRP-SecRACS, **CRA** = WG-05-CAD-Supply-Chain-EU-CRA,
**UNI** = WG-05-CAD-Unified-DEXPI-CycloneDX, **FRONT** =
WG-05-CAD-Frontier-AI-Hardware-Security, **ATQ** = WG-07-TM-ATQ, **CYH** =
WG-07-TM-CyHAZOP-Methodology, **NREG** = WG-07-TM-CyHAZOP-Node-Registers,
**TAC** = WG-07-TM-TACAM, **MO** = WG-08-MO-Monte Carlo Engine.

"Checkable" states what a later pass must open to settle the row.

| Standard | Clause | Document | Line | Stated edition | Checkable |
|:---|:---|:---|---:|:---|:---|
| IEC 62443 (general) | SL 1 to SL 4 | SFAIRP | 3 | none | Yes — 62443-3-3 §5; note the standard also defines SL 0 |
| IEC 62443 (general) | SL-1 through SL-4 | FRONT | 9 | none | Yes |
| IEC 62443-3-2 | risk assessment / zone-conduit | SFAIRP | 19, 28, 103 | none | Yes — clause numbers never given |
| IEC 62443-3-2 | "Zone and Conduit Partitioning" | UNI | 391 | none | Yes — see F-CAD-11 |
| IEC 62443-3-2 | zone and conduit partitioning | CYH | 280, 288 | none | Yes — see F-CAD-11 |
| IEC 62443-3-2 | risk assessment zones, SL-T 1–4 | ATQ | 312 | none | Yes |
| IEC 62443-3-3 | "System Specs" | SFAIRP | 28 | none | Yes |
| IEC 62443-3-3 | "highest protection tier" (SL 4) | FRONT | 211 | none | Yes — SL 4 definition |
| IEC 62443-3-3 | full title, bibliography ref 1 | FRONT | 511 | **2018** | Yes — **F-CAD-07**, believed 2013 |
| IEC 62443-3-3 | OBOM verification standard | UNI | 118 | 1.6-era, no ed. | Yes |
| IEC 62443-4-2 | CR 1.1 Human Identification & Authentication | SFAIRP | 80, 126 | none | Yes — correctly typed as a CR |
| IEC 62443-4-2 | CR 1.2 Software Process & Device Identification | SFAIRP | 80, 127 | none | Yes — correctly typed |
| IEC 62443-4-2 | CR 3.1 Communication Integrity | SFAIRP | 80, 128 | none | Yes — correctly typed |
| IEC 62443-4-2 | CR 3.14 Integrity of Boot Process | SFAIRP | 129 | none | Yes — correctly typed |
| IEC 62443-4-2 | CR 7.1 Denial of Service Protection | SFAIRP | 80, 130 | none | Yes — correctly typed |
| IEC 62443-4-2 | "Technical Security Requirements for Components" | UNI | 392 | none | Yes |
| IEC 62443-4-2 | "SL-3" command signing | CYH | 141 | none | Yes |
| IEC 62443-4-2 | "SL-3" protocol modernization | NREG | 226 | none | Yes |
| IEC 62443 (unspecified part) | SL-T modifiers | MO | 56 | none | No part number given |
| IEC 61508 | SIL 1 to SIL 4 | SFAIRP | 152; POS 99 | none | Yes |
| IEC 61508 | source of SecRACs | SFAIRP | 143 | none | Yes — **F-CAD-10**, believed EN 50129 |
| IEC 61508 | PFD_avg for a SIF | CYH | 222 | none | Yes — Part 6 Annex B |
| IEC 61508 | bibliography ref 20, Parts 1-7 | FRONT | 530 | 2010 | Yes — edition plausible |
| IEC 61511 | PFD_avg for a SIF | CYH | 222 | none | Yes |
| IEC 61511 | "analog safety instrumented systems" | POS | 133 | none | Yes |
| IEC 61882 | HAZOP guide words | CYH | 3, 25, 114 | none | Yes — guide-word list, see F-TM-17b |
| IEC 61850 | "SIPROTEC" over-frequency relay | CYH | 154 | none | Yes — SIPROTEC is a Siemens product line, not part of IEC 61850 |
| IEC 61850 | GOOSE synchrocheck spoofing | CYH | 156 | none | Yes — plausible |
| IEC 61158 | claimed standard for Modbus TCP | NREG | 15 | none | Yes — Modbus is CPF 15 of IEC 61158; "Modbus TCP" specifically is unconfirmed |
| ISO 15926 | DEXPI 2.0 semantic base | POS 29, 31, 166; UNI 3, 17, 102; SFAIRP 51; CYH 44, 69; NREG 42; ATQ 313; INTRO 4 | many | none in body | Yes — which part is never stated |
| ISO 15926-1 | bibliography ref 21 | FRONT | 531 | **2004** | Yes — edition plausible |
| ISO 15926 | "equipment taxonomies" for a Component BOM | FRONT | 334 | none | Yes — ISO 15926 is process-plant lifecycle data, not a materials taxonomy |
| ISO 10628-2 | PipingNetworkSegment taxonomy | POS | 36 | none | Yes |
| ISO/IEC 5962 | given as **the CycloneDX standard** | UNI | 5, 60 | none | Yes — **F-CAD-01**, believed to be the SPDX standard |
| ISO 20243 | MBOM verification standard | UNI | 117 | none | Yes — O-TTPS, plausible |
| ISO 27001 | OBOM verification standard | UNI | 118 | none | Yes |
| CycloneDX | version 1.6 / "1.6+" | INTRO 10, 24; SFAIRP 11, 51, 136; CRA 7, 133, 251, 267, 273, 326; UNI 5, 61, 112, 171; FRONT 322, 506; CYH 7, 38, 50; NREG 42, 65; ATQ 314 | many | **1.6 stated** | Yes — version is stated everywhere, good practice |
| CycloneDX 1.6 | "4-BOM" as a standard construct | INTRO 10; FRONT 322 | 10, 322 | 1.6 / 1.6+ | Yes — **F-CAD-12** |
| CycloneDX 1.6 | six BOM layers | UNI | 82, 112-120 | 1.6 | Yes — **F-CAD-12** |
| CycloneDX 1.6 | VEX justification enum `vulnerable_code_cannot_be_controlled_by_adversary` | CRA | 303 | 1.6 | Yes — believed a valid enum value |
| SPDX | listed as SBOM verification standard alongside CycloneDX | UNI | 115 | none | Yes — contradicts UNI 5/60, see F-CAD-01 |
| EU CRA Reg. (EU) 2024/2847 | publication date 13 Sep 2024 | CRA | 3 | Reg. 2024/2847 | Yes — **F-CAD-04** |
| EU CRA | "full enforcement commencing on September 11, 2026" | CRA | 3 | — | Yes — **F-CAD-04** |
| EU CRA | Article 10 / Annex I | UNI | 387 | — | Yes |
| EU CRA | Article 13, Article 14, Annex I | CRA | 3 | — | Yes |
| EU CRA | Article 14, 24-hour ENISA/CSIRT report | CRA | 227 | — | Yes — CRA uses a 24h early-warning then 72h notification cascade |
| EU CRA | Article 64(3) — 15M EUR / 2.5% | CRA | 3, 50, 141 | — | Yes — internally consistent, "whichever is higher" correct |
| EU CRA | Article 64(4) — 10M EUR / 2.0% | CRA | 52 | — | Yes |
| EU CRA | Article 64(5) — 5M EUR / 1.0% | CRA | 54 | — | Yes |
| EU CRA | "Articles 64 through 68" penalty tiers | CRA | 46 | — | Yes |
| EU CRA | Article 64 fines as contractual backstop | SFAIRP 138, 242; ATQ 276, 299; CRA 329 | — | — | Yes |
| EU CRA | Annex III = "Important Class I" | CRA | 20, 32 | — | Yes — **F-CAD-03** |
| EU CRA | Annex IV = "Important Class II" | CRA | 22, 29 | — | Yes — **F-CAD-03**, Annex IV is believed to be *critical* products |
| EU CRA | Annex VII technical documentation | CRA | 126, 343 | — | Yes — plausible |
| EU CRA | Annex I minimum 5-year support period | CRA | 44 | — | Yes |
| EN 50126 | RAMS lifecycle / V-model | FRONT 175, 219, 221; UNI 394; CYH 3, 82; ATQ 320; SFAIRP 143 | many | none in body | Yes |
| EN 50126 | "every failure mode categorized into a SIL" | FRONT | 224 | — | Yes — SIL allocation is believed to sit in EN 50126-2 / EN 50129 |
| EN 50126-1 | bibliography ref 3 | FRONT | 513 | **2017** | Yes — edition believed correct |
| CLC/TS 50701 | railway cybersecurity | FRONT 8, 175, 219, 221; SFAIRP 9, 155 | — | 2021 (ref 2, FRONT 512) | Yes — edition believed correct |
| ISA TR 84.00.09 | source of the SIL-to-SL formula | SFAIRP | 9, 155 | none | **No clause given** — see F-CAD-19 |
| ANSI/ASHRAE 135 | BACnet/IP object model | NREG | 25 | none | Yes |
| NIST SP 800-30 Rev. 1 | "SLE = AV x EF" | FRONT | 457, 534 | Rev. 1, 2012 | Yes — **F-CAD-08** |
| NIST SP 800-193 | bibliography ref 4 | FRONT | 514 | 2018 | Yes — believed correct |
| NIST SP 800-208 | LMS stateful hash signatures | FRONT 279, 518; UNI 116 | — | 2020 | Yes — believed correct |
| NSA CNSA 2.0 | PQC algorithm suite | FRONT 41, 278, 519; UNI 116 | — | 2022 | Yes — believed correct |
| FIPS 140-3 | "Level 4" HSM validation | CRA | 128, 181 | 140-3 | Yes |
| IEEE 1680 | HBOM verification standard | UNI | 114 | none | Yes — **F-CAD-09**, IEEE 1680 is believed to be EPEAT environmental assessment |
| IEEE 1619 | storage encryption | FRONT | 77, 97 | none | Yes — plausible (XTS-AES) |
| IEEE 802.1AE | MACsec | FRONT | 78 | none | Yes |
| IEEE 802.1AR | DevID, cited for CR 1.2 | SFAIRP | 127 | none | Yes |
| DMTF DSP0274 | SPDM 1.3.0 | FRONT | 29, 271, 516 | 1.3.0, 2023 | Yes |
| PCI-SIG | PCIe IDE v1.0 | FRONT | 517 | 1.0, 2020 | Yes |
| OCP | Caliptra specification | FRONT | 515 | **Version 1.0, 2023** | Yes — **F-CAD-06**, body says Caliptra 2.0 throughout |
| MITRE ATT&CK for ICS | T0814 Denial of Service | SFAIRP | 225, 231 | none | Yes — name believed correct |
| MITRE ATT&CK for ICS | T0836 Modify Parameter | SFAIRP | 226, 229, 232 | none | Yes — name believed correct |
| MITRE ATT&CK for ICS | T0858 Change Operating Mode | SFAIRP | 227 | none | Yes — name believed correct |
| MITRE ATT&CK for ICS | T0837 "Defeat Indicator" | SFAIRP | 228 | none | Yes — **F-TM-03**, believed to be "Loss of Protection" |
| MITRE ATT&CK for ICS | T0869 "Manipulate State" | SFAIRP | 230 | none | Yes — **F-TM-03**, believed to be "Standard Application Layer Protocol" |
| MITRE ATT&CK | "14 Tactics" saturation cap | ATQ | 71, 136, 367 | Enterprise implied | Yes — Enterprise has 14; ICS has 12 |
| MITRE ATT&CK | "27 MITRE ATT&CK enterprise tactics" | TAC | 23 | Enterprise | Yes — **F-TM-01** |
| MITRE ATT&CK | "120 Techniques" saturation cap | ATQ | 74, 142 | none | Yes — threshold uncited |
| CISA critical infrastructure sectors | "15 Sectors" | ATQ | 76, 146 | none | Yes — **F-TM-02** |
| CISA critical infrastructure sectors | "17 CISA critical infrastructure sectors" | TAC | 24 | none | Yes — **F-TM-02**, believed to be 16 |
| CISA KEV | KEV counts in a worked example | TAC | 110, 115 | none | No — illustrative figures, no source |
| CISA ICS-CERT | VEX advisory feed | SFAIRP 71; INTRO 24 | — | none | Yes |
| CISA AA (INCONTROLLER/PIPEDREAM) | advisory, 2022 | NREG | 214-215 | 2022 | Yes — no advisory number given (AA22-103A) |
| CVE-2022-22805 / CVE-2022-22806 | TLStorm, unsigned firmware | CYH | 268-269 | none | Yes — **F-TM-05**, unsigned firmware is believed to be CVE-2022-0715 |
| FIRST EPSS | daily feed, v3 implied | ATQ | 73, 80 | none in body | Yes — version only in the HTML BibTeX note |
| CVSS v3.1 | base score 8.8, vector AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H | CRA | 297-298 | **CVSSv31** | Yes — **recomputes exactly**, see F-CAD-31 |
| Lloyd's Y5381 | "Lloyd's Market Association Y5381 covenants" | POS | 153 | none | Yes — **F-CAD-02** |
| Lloyd's Y5381 | "Lloyd's Market Association Bulletin Y5381 mandates ... exclude ... war and state-backed" | CRA | 339 | none | Yes — **F-CAD-02** |
| Lloyd's Y5381 | "LMA Bulletin Y5381 (Cyber Physical Damage and Consequential Loss Clauses)" | FRONT | 502 | none | Yes — **F-CAD-02** |
| Lloyd's Y5381 | bibliography ref 22, "LMA5381 / Y5381 Guidelines, London" | FRONT | 532 | **2019** | Yes — **F-CAD-02** |
| Lloyd's Y5381 | "Lloyd's Market Association Bulletin Y5381" | CYH | 315 | none | Yes |
| LMA5529 – LMA5533 | clause range mandating affirmative physical damage boundaries | ATQ | 292 | none | **No** — needs the LMA clause register. UNVERIFIABLE |
| Purdue / PERA | Levels 0-4 | POS | 131 | none | Yes |
| Purdue | `dexpi:zone:purdueLevel`, "Zone 5/4/2/0" | UNI | 190, 391 | none | Yes — **F-CAD-11** |
| NERC | — | — | — | — | **Not cited anywhere in this scope** |
| NIST CSF / RMF | — | — | — | — | **Not cited anywhere in this scope** |

---

## Findings

### F-TM-17. The known lead: CyHAZOP "18-step" versus a 15-row table. CONFIRMED.

`references/WG-07-TM-Threat-Modeling/WG-07-TM-CyHAZOP-Methodology.md` line 82:

> The CyHAZOP study is executed by a multidisciplinary team ... through an
> **18-step** structured lifecycle governed by the EN 50126 V-model

The table immediately below it, lines 95-111, contains exactly 15 data rows,
numbered 1 through 15, with no gaps and no step above 15.

```
$ sed -n '97,111p' WG-07-TM-CyHAZOP-Methodology.md | grep -c '^|'
15
$ sed -n '97,111p' WG-07-TM-CyHAZOP-Methodology.md | grep -oE '\| [0-9]+ \|' | tr -d '| '
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
```

Phase distribution: Phase 1 steps 1-3 (lines 97-99), Phase 2 steps 4-7 (lines
100-103), Phase 3 steps 8-11 (lines 104-107), Phase 4 steps 12-15 (lines
108-111). 3 + 4 + 4 + 4 = 15.

The lead **holds**. The prose claims 18 steps; the methodology it describes has
15. A reader counting the table will find three steps missing and cannot know
whether the table is incomplete or the number is wrong.

Fix (not applied): change "18-step" to "15-step" at line 82, or add the three
missing steps to the table. Determine which by checking whether any step
referenced elsewhere is absent — Stage 4 of the SFAIRP paper (line 104) calls
for a "dual-RPN" score that appears nowhere in this 15-step lifecycle, which
suggests the table may genuinely be short. See F-CAD-18.

#### F-TM-17b. The same document gives three different guide-word lists. CONFIRMED.

Abstract, line 3, and the §3.1 lexicon table, lines 118-124, both give **seven**
guide words: NO, LESS, MORE, REVERSE, AS WELL AS, PART OF, OTHER THAN.

Step 5 of the lifecycle table, line 101, gives **six**, dropping PART OF:

> | | 5 | Apply Guide Word (NO, LESS, MORE, REVERSE, AS WELL AS, OTHER THAN) |

Principle 2 of the conclusions, line 332, gives **five**, dropping AS WELL AS
and PART OF:

> it demands the structured application of NO, LESS, MORE, REVERSE, and OTHER
> THAN across every operational node.

PART OF is not decorative: the Node 2 matrix at line 156 uses it for the
out-of-phase-transfer hazard, rated Catastrophic. The step that tells the
analyst which guide words to apply omits the one that produces the paper's own
worst electrical hazard.

Fix (not applied): make lines 101 and 332 list all seven.

---

### F-CAD-02. Lloyd's Y5381 is cited five times with two incompatible identities. CONFIRMED.

The same identifier is given two different subjects, two different issuing
bodies, and a date that only one instance carries.

| Where | Text | Issuer | Subject | Date |
|:---|:---|:---|:---|:---|
| CRA line 339 | "Lloyd's **Market Association** Bulletin Y5381 mandates that cyber policies **exclude losses arising from war and state-backed cyber attacks**" | LMA | state-backed exclusion | none |
| FRONT line 502 | "the Lloyd's Market Association (LMA) Bulletin **Y5381** (**Cyber Physical Damage and Consequential Loss Clauses**)" | LMA | physical damage / consequential loss | none |
| FRONT line 532 (bibliography ref 22) | "**Lloyd's Market Association (LMA).** *Cyber Physical Damage and Consequential Loss Endorsement.* **LMA5381 / Y5381** Guidelines, London, **2019**." | LMA | physical damage / consequential loss | **2019** |
| POS line 153 | "underwriters under **Lloyd's Market Association Y5381 covenants**" | LMA | unspecified | none |
| CYH line 315 | "Under Lloyd's Market Association Bulletin Y5381" | LMA | state-backed exclusion | none |

And outside my scope, for corroboration, `references/MP-Math-Physics-Formula/MP_Mathematical_Models.md`
line 563 gives a **third** issuer:

> Lloyd's Market Bulletin Y5381 state-backed loss attribution.

Three things are wrong here and one is CONFIRMED without any external source:
a single document identifier cannot simultaneously be a state-backed-attack
exclusion bulletin and a cyber-physical-damage-and-consequential-loss
endorsement. The corpus contradicts itself.

Two further points are PROBABLE: "Y5381" is a *Lloyd's* market bulletin number
(Y-series), not a *Lloyd's Market Association* clause number (LMA-series), so
"LMA5381 / Y5381" at line 532 fuses two distinct numbering schemes; and Y5381
is believed to be the August 2022 state-backed cyber-attack exclusion bulletin,
not a 2019 physical damage endorsement.

Fix (not applied): settle on one identity. If the intended reference is the
state-backed exclusion, cite it as "Lloyd's Market Bulletin Y5381, 16 August
2022" and delete the "Cyber Physical Damage and Consequential Loss" title from
FRONT 502 and 532. If a physical-damage endorsement is separately intended, it
needs its own real LMA clause number. What would settle the date and title: the
Lloyd's market bulletin register.

---

### F-CAD-14. Y5381 is described as a mandated exclusion in one place and as waivable in four. CONFIRMED.

This is the "requirement reported as achieved state" class applied to an
insurance mandate. CRA line 339 states plainly that Y5381 **mandates** that
cyber policies exclude state-backed losses. Four other passages then present
that exclusion as something a well-audited facility gets lifted:

- SFAIRP line 254: "**war exclusion waived**"
- UNI line 408: "**waiver of sovereign attack exclusions** for certified assets"
- CRA line 345: "Policyholders maintain affirmative coverage; **war exclusion waivers granted**"
- NREG line 253: "Affirmative cyber-physical coverage granted with **zero state-actor exclusions**"
- CYH line 321: "Affirmative cyber-physical coverage granted with clear indemnity triggers"

A market-wide mandate binding on the underwriter is not waivable by the
policyholder's engineering posture. The corpus states the mandate and then, in
the benefits column of five separate tables, reports it as removed. Whatever
the real commercial mechanism is (affirmative cyber-physical property cover
written outside the standalone-cyber class, most likely), it is not a waiver of
Y5381, and the papers do not say what it is.

CONFIRMED as an internal contradiction. The underlying insurance question is
UNVERIFIABLE without the bulletin and a broker's read of it.

Fix (not applied): replace every "waived"/"waiver"/"zero exclusions" phrasing
with the actual mechanism, or state that the benefit is improved attachment and
pricing within the exclusion rather than removal of it.

---

### F-CAD-11. Four mutually incompatible zone-numbering schemes, all attributed to IEC 62443. CONFIRMED.

Every one of these is presented as an IEC 62443 zone model. They cannot all be
right, and a reader moving between two documents in the same directory will
invert the trust hierarchy.

| Document | Line | Scheme |
|:---|---:|:---|
| SFAIRP | 58 | Zone 1 = BMS/HVAC, Zone 2 = Electrical, **Zone 6 = BESS** |
| FRONT | 179-211 | **Zone 1 = facility plant (SL-2)** → Zone 2 = chassis mgmt → Zone 3 = host → **Zone 4 = silicon (SL-4)** |
| CYH | 283-306 | **Zone 0 = silicon (SL-T 4)** → Zone 1 = field → Zone 2 = facility OT → **Zone 3 = enterprise (SL-T 2)** |
| UNI | 391 | "enterprise networks (**Zone 5**), facility OT (**Zone 4**), chassis management (**Zone 2**), accelerator execution (**Zone 0**)" |

FRONT and CYH are exact inversions of each other: in FRONT the silicon enclave
is Zone 4 and the facility plant is Zone 1; in CYH the silicon is Zone 0 and the
enterprise is Zone 3. Both label the diagram "IEC 62443 zones and conduits".

UNI is a separate error on top of that. Its numbering (5/4/2/0) is the **Purdue
level** scale, and the property carrying it is literally named
`dexpi:zone:purdueLevel` — yet §6.2 line 391 files it under "IEC 62443-3-2
(Zone and Conduit Partitioning)". Purdue levels and IEC 62443 zones are
different constructs; 62443 zones are defined by shared security requirements
and are not numbered by the standard at all. The same document then stores
`"dexpi:zone:purdueLevel"` with the value `"Zone-1"` (line 190) — a property
named for a Purdue level holding a zone string.

The POS paper, line 131, uses Purdue correctly ("Digital twin models operate at
Level 3 ... controlled at Level 1 ... protected at Level 0/1"), which shows the
corpus knows the distinction elsewhere.

Fix (not applied): pick one zone numbering for the whole working group, state
that IEC 62443 does not itself number zones, and stop labelling Purdue levels
as 62443 zones in UNI §6.2.

---

### F-TM-06 / F-CAD-12. CBOM has two incompatible expansions, and "CycloneDX 1.6" is given 4, 5 and 6 BOM layers. CONFIRMED.

**CBOM.** Two irreconcilable definitions of the same CycloneDX acronym, across
six in-scope documents:

*Component* BOM — physical materials:
- INTRO line 19: "**4. Component BOM (CBOM)** | Valves, actuators, heat exchangers, physical piping"
- FRONT line 329: "**Component BOM (CBOM)** | Liquid cold plate alloys; quick-disconnect seals (EPDM/FKM); manifold welds and piping metals"
- FRONT line 334: "**Component Bill of Materials (CBOM)**: Catalogs physical, mechanical, and hydraulic materials"

*Cryptography* BOM — keys and certificates:
- UNI line 65: "**Cryptography Bills of Materials (CBOM):** On-die asymmetric key pairs, DICE certificate hierarchies, post-quantum signing keys"
- UNI line 116: CBOM mapped to CycloneDX component type `cryptographic-asset`
- ATQ line 317: "**CBOM (Cryptographic Bill of Materials):** Mutual TLS certificates, hardware root-of-trust identity keys, and DICE credentials"
- SFAIRP line 69: "CBOM: Mutual TLS 1.3 Keys, DICE Device Attestation Certificate"
- NREG line 68, CYH line 72: same cryptographic sense

UNI line 116 settles it internally: it binds CBOM to the CycloneDX
`cryptographic-asset` component type. Under that binding, INTRO and FRONT are
using the acronym for something CycloneDX does not mean by it.

**Layer count.** All of these are attributed to the same version:

- INTRO line 10: "CycloneDX 1.6 **4-BOM** Attestations" — SBOM, HBOM, OTBOM, CBOM
- FRONT line 322: "the **CycloneDX 1.6+ Four-Dimensional Bill of Materials (4-BOM) standard**" — SBOM, HBOM, OTBOM, CBOM
- SFAIRP line 66-71, NREG line 65-70, CYH line 50-55: **five** — HBOM, SBOM, CBOM, OBOM, VEX
- UNI line 82: "we integrate **six** distinct BOM layers" — HBOM, SBOM, CBOM, MBOM, OBOM, SaaSBOM (plus VEX in the diagram at line 94, making seven rows)

"OTBOM" appears only in INTRO and FRONT and is not a CycloneDX construct;
FRONT line 333 half-admits this by writing "**OTBOM / OBOM**". Calling a
four-layer Eigenia arrangement "the CycloneDX 1.6+ ... standard" (FRONT 322)
attributes an in-house scheme to an external specification.

Fix (not applied): reserve CBOM for Cryptography BOM throughout, rename the
physical-materials layer (Materials BOM would not collide), and state plainly
that the 4-BOM / OTBOM arrangement is Eigenia's composition **over** CycloneDX
1.6 rather than a part of it.

---

### F-CAD-01. ISO/IEC 5962 is given as the CycloneDX standard. PROBABLE.

`WG-05-CAD-Unified-DEXPI-CycloneDX.md` line 5 and the §1.2 heading, line 60:

> cybersecurity and platform security engineers operate through Bills of
> Materials under the **CycloneDX 1.6+ (ISO/IEC 5962)** standard.

> ### 1.2 The Platform and Cybersecurity View (CycloneDX 1.6+ / ISO/IEC 5962)

ISO/IEC 5962:2021 is believed to be the **SPDX** specification (SPDX 2.2.1),
not CycloneDX. CycloneDX's formal standardisation is believed to be ECMA-424.

Confirmed on-disk corroboration: the same document, 55 lines later at line 115,
lists the SBOM verification standard as "**CycloneDX 1.6, SPDX**" — treating
the two as distinct specifications. If ISO/IEC 5962 were CycloneDX, that row
would be listing the same standard twice under two names. And FRONT
bibliography ref 11 (line 521) attributes CycloneDX v1.6 to the **OWASP
Foundation**, not to ISO/IEC. No document in the corpus repeats the ISO/IEC
5962 attribution.

Grading: the internal inconsistency is CONFIRMED; the identification of
ISO/IEC 5962 as SPDX is PROBABLE. What would settle it: the ISO catalogue entry
for ISO/IEC 5962:2021.

Fix (not applied): strike "ISO/IEC 5962" from lines 5 and 60. If a standards
anchor is wanted, cite ECMA-424 and check the edition.

---

### F-CAD-04. The CRA publication date and the "full enforcement" date. PROBABLE.

`WG-05-CAD-Supply-Chain-EU-CRA.md` line 3:

> On **September 13, 2024**, the European Union published Regulation (EU)
> 2024/2847, the Cyber Resilience Act (CRA) ... With **full enforcement
> commencing on September 11, 2026**, the era of voluntary cybersecurity
> questionnaires ... is definitively closed.

Two separate problems, both PROBABLE:

1. Regulation (EU) 2024/2847 is believed to have been adopted 23 October 2024
   and published in the Official Journal on 20 November 2024, entering into
   force 10 December 2024. 13 September 2024 matches none of those. The nearest
   real September date in the CRA's history is 15 September **2022**, the date
   of the Commission proposal.
2. 11 September 2026 is believed to be the date the **Article 14 reporting
   obligations** begin to apply — not full application, which is believed to be
   11 December 2027. Describing a single early-applying obligation as "full
   enforcement" is the compliance-deadline-as-compliance-date error the brief
   asked for.

On-disk corroboration is thin, which is why this is PROBABLE and not CONFIRMED:
the date appears exactly once in the whole corpus. `grep -rn "2024/2847"
references/` returns eight hits across four documents, and only CRA line 3
carries a date, so there is no second passage to contradict it.

FRONT bibliography ref 10 (line 520) cites the CRA as "COM(2022) 454 final,
Brussels, 2022" — the proposal — which is a separate defect, F-CAD-05.

Fix (not applied): replace with "adopted 23 October 2024, published in the
Official Journal 20 November 2024, in force 10 December 2024", and split the
application dates: Article 14 reporting from 11 September 2026, full
application from 11 December 2027. What would settle it: the OJ L citation for
Regulation (EU) 2024/2847 and its Article 71.

---

### F-CAD-05. The only CRA bibliography entry cites the 2022 proposal, not the regulation. CONFIRMED.

`WG-05-CAD-Frontier-AI-Hardware-Security.md` line 520, bibliography ref 10:

> 10. **European Commission.** *Regulation of the European Parliament and of
> the Council on horizontal cybersecurity requirements for products with
> digital elements (Cyber Resilience Act).* **COM(2022) 454 final**, Brussels,
> **2022**.

The same document's body, line 343, cites the adopted instrument:

> the binding essential cybersecurity requirements of the EU Cyber Resilience
> Act (**Regulation (EU) 2024/2847**).

COM(2022) 454 final is a Commission proposal. It is not binding and its article
numbering does not survive into the adopted text — which matters directly,
because five documents in this corpus depend on "Article 64" being the penalty
article of the *adopted* regulation. The one bibliography in the scope points
at a document in which that article number is not the one being relied on.

Fix (not applied): replace ref 10 with the adopted regulation and its OJ
citation.

---

### F-CAD-06. The Caliptra bibliography entry is v1.0; the body says Caliptra 2.0 throughout. CONFIRMED.

`WG-05-CAD-Frontier-AI-Hardware-Security.md` line 515, bibliography ref 5:

> 5. **Open Compute Project (OCP).** *Caliptra: Open Source Silicon Root of
> Trust Specification.* **Version 1.0**, OCP Security Project, **2023**.

The body of the same document and four others specify **Caliptra 2.0** and rely
on capabilities that are 2.0-specific:

- FRONT line 41: "PQC Engine (CNSA 2.0 / ML-DSA-87)" inside the Caliptra RoT layer
- FRONT line 244: crypto accelerator "SHA384 / ECC384 / **ML-DSA-87** / LMS"
- SFAIRP line 129: "CR 3.14 (Integrity of Boot Process): **Caliptra 2.0** Silicon RoT"
- UNI line 198: `"name": "Caliptra 2.0 Silicon Root of Trust", "version": "2.0.1"`
- CYH line 178, line 283, line 306; NREG line 237: "Caliptra 2.0"

The post-quantum signing the framework mandates is a 2.0-era capability. The
only citation offered supports the 1.0 specification.

Fix (not applied): cite the Caliptra 2.0 specification and its date, or drop
the version-specific claims back to what 1.0 supports.

---

### F-CAD-16. A cited McKenney work has no file. CONFIRMED.

`WG-05-CAD-Frontier-AI-Hardware-Security.md` line 523, bibliography ref 13:

> 13. **McKenney, J.** *Systems Assurance in High-Entropy Industrial Complexes:
> Mathematical Modeling of Boundary Failures and Cognitive Distortion.*
> Eigenia Labs Monograph Series, WG-05-CAD, 2026.

Proof of absence:

```
$ grep -rl "High-Entropy" --include='*.md' --include='*.html' --include='*.json' . | grep -v node_modules
references/WG-05-CAD-DEXPI-2/WG-05-CAD-Frontier-AI-Hardware-Security.md
web/src/lib/generatedReferencesContent.json

$ find . -iname '*entropy*' -not -path './web/node_modules/*' -not -path './.git/*'
./papers-pre-publish/Research_equations/RSCH-05-SHANNON_ENTROPY.md
```

The only two hits are the citing document itself and the generated site content
built from it. There is no such work anywhere under `references/`, and the
`find` returns only an unrelated Shannon-entropy equation sheet. The full
inventory of `references/` (51 files) contains no WG-05-CAD document other than
the six in this scope.

This is a new row for `notes/2026-09-06/citation-web-register.md`, which
currently tracks seven self-cited works, all in WG-04-CF. This is the eighth,
and the first outside WG-04-CF.

Fix (not applied): either write the monograph, or strike ref 13. It is cited by
no `[n]` marker (see F-CAD-17), so striking it costs nothing in the body text.

---

### F-CAD-17. A 24-entry bibliography that nothing cites, containing three references the paper never uses. CONFIRMED.

`WG-05-CAD-Frontier-AI-Hardware-Security.md` §10, lines 509-534, is the only
bibliography in all 11 documents. Its body contains zero `[n]` markers, so not
one of the 24 entries is invoked anywhere:

```
$ grep -oE '\[[0-9]+\]' references/WG-05-CAD-DEXPI-2/WG-05-CAD-Frontier-AI-Hardware-Security.md | wc -l
0
```

Three entries support no sentence in the document at all. The paper never
mentions antifragility, threshold models of collective behaviour, or a Kramers
escape-rate model:

- ref 14 (line 524): Taleb, *Antifragile*, Random House, 2012
- ref 18 (line 528): Granovetter, *Threshold Models of Collective Behavior*, AJS 83(6), 1978
- ref 19 (line 529): Kramers, *Brownian motion in a field of force*, Physica 7(4), 1940

Kramers is the exact construct
`notes/2026-09-06/citation-web-register.md` flags in its "corpus-wide audit, not
yet run" section as a named external model to look for. Here it is, cited but
unused. (`references/MP-Math-Physics-Formula/MP_Kramers_Escape_Model.md` exists
and is presumably where it belongs; it is outside my scope.)

Two further entries are journal/conference articles I cannot check and which
have the shape of fabrications — precise volume, issue and page ranges for
papers on very narrow topics:

- ref 12 (line 522): Ashok, A., et al., *Cyber-Physical Threat Analysis for Critical Liquid-Cooled Infrastructure*, IEEE Trans. Industrial Informatics, vol. 19, no. 4, pp. 4120-4131, 2023 — **UNVERIFIABLE**
- ref 15 (line 525): Sethi, P., et al., *Power Glitch and Resonant Induction Vulnerabilities in Modern Accelerator Silicon*, IEEE S&P, pp. 1024-1039, 2024 — **UNVERIFIABLE**

What would settle refs 12 and 15: IEEE Xplore, or a DOI.

Fix (not applied): add `[n]` markers to the body so the bibliography is load-
bearing, strike refs 14, 18 and 19 unless the argument is extended to use them,
and produce DOIs for refs 12 and 15 or strike them.

---

### F-XD-02. Ten of eleven documents have no bibliography and no citation of any kind. CONFIRMED.

The `grep` in the Contrast section above is the evidence. Only FRONT has a
bibliography; no document has a single `[n]` marker.

This matters most in the two documents that make the strongest external claims.
`WG-05-CAD-Supply-Chain-EU-CRA.md` is 359 lines of statutory interpretation —
fine tiers, annex classifications, conformity assessment modules, notification
deadlines — with no reference list at all. `WG-05-CAD-IEC62443-SFAIRP-SecRACS.md`
is 268 lines built on IEC 62443, IEC 61508, IEC 61511, ISA TR 84.00.09,
CENELEC TS 50701, EN 50126, MITRE ATT&CK for ICS, EMB3D and the EU CRA, and
cites none of them formally.

Fix (not applied): the standard-clause table above is the input to this. Every
row in it needs a bibliography entry in its own document.

---

### F-CAD-13. SL-C is called "achieved security capability" in a document that knows SL-A exists. CONFIRMED.

`WG-05-CAD-IEC62443-SFAIRP-SecRACS.md` §5.2, lines 178 and 180:

> - $P_{\text{cyber\_exploit}}(t) = 1 - \exp(-\lambda_{\text{exploit}} \cdot t \cdot [1 - \text{SL-C} / \text{SL-T}])$.
>
> If the **achieved security capability** $\text{SL-C}$ is zero (unauthenticated
> Modbus TCP), $P_{\text{cyber\_exploit}} \to 1.0$

IEC 62443 distinguishes three: SL-T (target, what is required), SL-C
(capability, what a component or system can provide as designed) and SL-A
(achieved, what is actually delivered in the installed plant). SL-C is not
"achieved". Calling it that collapses the very distinction that makes the
SFAIRP argument work: a component with a high SL-C that is misconfigured on
site has a low SL-A, and that gap is exactly what the paper's stage gates
exist to close.

Confirmed on-disk, because the same document uses SL-A correctly 72 lines
earlier. Stage 6 of Table 18.1, line 106, lists as a primary deliverable:

> FAT/SAT Test Reports; **SL-A Verification Matrix**

So the document has all three terms and mislabels one of them in the formula
that carries its central safety-security coupling claim.

There is a second-order consequence: `[1 - SL-C/SL-T]` divides one ordinal
security level by another. SL levels are ordinal categories, not ratio-scale
quantities; SL-2/SL-4 = 0.5 has no defined meaning in the standard. That is a
modelling choice the paper does not declare.

Fix (not applied): change "achieved security capability" to "security level
capability" at line 180, and state explicitly that the SL-C/SL-T ratio is a
modelling device with no basis in the standard's ordinal scale.

---

### F-TM-07. CyHAZOP §7.1 states SL **targets** and then lists them as enforced. CONFIRMED.

`WG-07-TM-CyHAZOP-Methodology.md` lines 283-286 and the table at 301-306. Line
283:

> - **Zone 0 (Physical Silicon & Process):** ... Security Level **Target**:
> **SL-T 4**. **Enforces** Caliptra 2.0 Silicon Root of Trust, immutable boot
> ROM, DICE certificate provenance, and hardwired physical overrides.

The table header at line 301 makes it explicit: column 2 is "Security Level
**Target**", column 3 is "Control **asserted** inside the zone". A target is
what the risk assessment demands; an asserted control is what is deployed. The
table presents the two as one fact per zone, with no column for whether the
control was verified present.

The same pattern at line 321: "**Verified** SIL-3 physical safety interlocks
prove exploit containment"; and NREG line 253: "**Formally verified** SIL-3
physical interlocks satisfy statutory due diligence standards". SIL-3 is a
target integrity level requiring proof-test evidence; neither document presents
any.

Fix (not applied): split the table into SL-T (required) and SL-C or SL-A
(provided / verified), and cite the proof-test evidence behind every "verified
SIL-3".

---

### F-CAD-15. An "empirical" ARO with no source, and six "verified" ROSIs whose inputs are all uncited. CONFIRMED.

`WG-05-CAD-Frontier-AI-Hardware-Security.md` line 472:

> Given an **empirical** Annualised Rate of Occurrence (ARO) for severe facility
> disturbances, grid instabilities, and targeted cyber-physical attacks of
> $\text{ARO} = 0.12\text{ events/year}$

No source. "Empirical" asserts a measurement that the document does not
possess. The same for EF = 0.85 (line 468) and EF = 0.05 (line 480).

Six ROSI figures across five documents are labelled "verified" or "delivering a
verified". Every one of them is arithmetically correct and every one of them
takes uncited inputs:

| Document | Line | Claim | Recomputed | Inputs |
|:---|---:|:---|:---|:---|
| SFAIRP | 209 | "a **verified** ROSI = 872%" | 872.06% ✓ | ALE 17.403M → 1.85M, C 1.6M — all uncited |
| CRA | 221 | "delivering a **verified** ROSI = 907%" | 906.67% ✓ | ALE 48.5M → 3.2M, C 4.5M — all uncited |
| FRONT | 492 | "ROSI ... ≈ 1316.7%" | 1316.69% ✓ | ARO 0.12, EF 0.85/0.05 — all uncited |
| CYH | 257 | "achieving a ROSI > 12,000%" | 12,086.7% ✓ | ALE 1.85M → 22k, C 15k — all uncited |
| NREG | 203 | "achieving a **verified** ROSI = 9,177%" | 9,177.78% ✓ | ALE 4.2M → 25k, C 45k — all uncited |
| ATQ | 303 | "delivering a **verified** Return on Security Investment ... = 7,312%" | 7,312.5% ✓ | ALE 18.2M → 410k, C 240k — all uncited |

```
$ python3 -c "
print(((17403000-1850000)-1600000)/1600000*100)   # 872.0625
print(((48.5-3.2)-4.5)/4.5*100)                   # 906.6666...
print(((12876480-126240)-900000)/900000*100)      # 1316.6933...
print(((1850000-22000)-15000)/15000*100)          # 12086.666...
print(((4200000-25000)-45000)/45000*100)          # 9177.777...
print(((18200000-410000)-240000)/240000*100)      # 7312.5
"
```

The arithmetic is not the problem. The word "verified" is. A ratio computed
from two assumed numbers is not verified by being computed correctly. This is
the same defect class as F10 in `notes/2026-09-06/findings.md` — an uncited
percentage in a cost-benefit table that reads as a measured result.

Fix (not applied): delete "verified" from all six, label each ALE and ARO as
modelled, and state the assumption behind each.

---

### F-CAD-20. The heat exchanger duty is 6.4x the value stated beside it. CONFIRMED.

`WG-05-CAD-Unified-DEXPI-CycloneDX.md` §4.2, lines 285-295. The document gives
the LMTD equation and then five parameters:

> - $\dot{Q}_{\text{thermal}}$ is the total heat transfer rate in kilowatts (**120.0 kW** per rack).
> - $U$ is the overall heat transfer coefficient ($U \approx$ **4,200** W/(m²·K)).
> - $A$ is the active plate surface area ($A =$ **12.8** m²).
> - $T_{h,\text{in}}$ ... (**45.0°C**) ... $T_{h,\text{out}}$ ... (**32.0°C**)
> - $T_{c,\text{in}}$ and $T_{c,\text{out}}$ ... (**20.0°C → 28.0°C**)

Substituting the document's own numbers into the document's own equation:

```
$ python3 -c "
import math
d1, d2 = 45.0-28.0, 32.0-20.0
lmtd = (d1-d2)/math.log(d1/d2)
print('LMTD =', round(lmtd,4), 'K')
print('Q = U*A*LMTD =', round(4200*12.8*lmtd/1000,2), 'kW')
print('A required for 120 kW =', round(120000/(4200*lmtd),3), 'm2')
"
LMTD = 14.3552 K
Q = U*A*LMTD = 771.73 kW
A required for 120 kW = 1.99 m2
```

The stated U, A and terminal temperatures produce **771.7 kW**, not 120 kW.
To deliver 120 kW at that LMTD the plate area would be **1.99 m²**, not 12.8 m².

The 120 kW figure is load-bearing elsewhere — it is the rack duty in ATQ line
240, CYH line 146 and FRONT line 461 — so the parameter that is wrong is
almost certainly A, or U, or both. As written the exchanger is oversized by a
factor of 6.4, which silently destroys the paper's next sentence: "If cyber
tampering elevates primary chilled water supply ... ΔT_lm collapses. The heat
exchanger fails to reject 120 kW." An exchanger with 6.4x margin does not fail
that way.

Fix (not applied): recompute A from the intended duty (1.99 m² at U = 4,200),
or state the real U and A and let Q follow. Then re-derive the collapse
argument against the corrected margin.

---

### F-TM-15. The CyHAZOP trip-time formula takes the logarithm of a negative number. CONFIRMED.

`WG-07-TM-CyHAZOP-Methodology.md` §5.2, lines 204-210:

> $$t_{\text{trip}} = \tau_{\text{th}} \cdot \ln\left( \frac{P_{\text{die}} \cdot R_{\theta,\text{jc}} + T_{\text{inlet}} - T_{j,0}}{P_{\text{die}} \cdot R_{\theta,\text{jc}} + T_{\text{inlet}} - T_{\text{trip}}} \right)$$
>
> - $\tau_{\text{th}} \approx 8.4$ s. - $P_{\text{die}}$ ... 1,200 W.
> - $R_{\theta,\text{jc}}$ ... 0.035 K/W.
> - For nominal starting conditions ($T_{j,0} = 65°C$, $T_{\text{inlet}} = 30°C$),
> $t_{\text{trip}} = 14.8$ **seconds**.

```
$ python3 -c "
P,R,Ti,Tj0,Ttrip,tau = 1200,0.035,30.0,65.0,94.0,8.4
print('P*R =', P*R, 'K -> steady-state Tj = P*R + T_inlet =', P*R+Ti, 'C')
print('numerator   =', P*R+Ti-Tj0)
print('denominator =', P*R+Ti-Ttrip)
"
P*R = 42.0 K -> steady-state Tj = P*R + T_inlet = 72.0 C
numerator   = 7.0
denominator = -22.0
```

ln(7 / −22) is undefined over the reals. The formula returns no value at all
for the parameters the document supplies.

The physical reading is worse than the algebraic one. With R_θjc = 0.035 K/W
and P = 1,200 W, the junction settles at T_inlet + 42 = **72 °C**. It never
reaches the 94 °C trip point, at 14.8 seconds or ever. And the scenario is
titled "When coolant flow is arrested (guide word NO FLOW)" — under arrested
flow the junction-to-ambient thermal resistance rises without bound; holding it
at the nominal junction-to-case value of 0.035 K/W models a cold plate that is
still being cooled.

14.8 seconds is not derived here. It is asserted, and it recurs verbatim in
four other places (SFAIRP 202, CRA 84 and 199, NREG 172, CYH 140) with
different and mutually inconsistent premises each time — see F-XD-03.

Fix (not applied): the correct treatment of NO FLOW is the adiabatic one the
FRONT paper already gets right at lines 377-385. Replace §5.2 with
ΔT/Δt = P_die/C_th and state C_th. Then reconcile the answer with the four
other documents.

---

### F-TM-16. The CyHAZOP NO-FLOW row contradicts its own design intent by a factor of 7. CONFIRMED.

Same document, §4.1. Line 133, design intent:

> maintaining silicon junction temperatures $T_j \le$ **85.0°C** under 10.5 kW
> compute dissipation.

Line 140, the NO/Flow row of the matrix immediately below:

> Silicon junction $T_j$ surges at **4.5°C/s**, exceeding **94°C** in
> **< 14.8 s**.

```
$ python3 -c "
print('from the stated 85 C ceiling:', (94-85)/4.5, 's')
print('start implied by 14.8 s at 4.5 C/s:', 94-4.5*14.8, 'C')
"
from the stated 85 C ceiling: 2.0 s
start implied by 14.8 s at 4.5 C/s: 27.4 C
```

If the die is at or below 85 °C when flow stops and rises at 4.5 °C/s, it
crosses 94 °C in **2.0 seconds**. For 14.8 seconds to be right the die must
start at **27.4 °C** — below the document's own 30.0 °C coolant supply
temperature (line 133), which is thermodynamically impossible for a part
dissipating 1.2 kW into that coolant.

The engineering consequence is not cosmetic. The paper's recommended safeguard
in that row is a bi-metallic thermal interlock, and §4.2 line 225 specifies an
SIF that acts "within 500 milliseconds". A 2-second budget and a 14.8-second
budget imply very different protection designs.

Fix (not applied): recompute the row from the 85 °C design ceiling and publish
the real budget. If it is ~2 seconds, say so — it strengthens the paper's own
"sub-second physical realities" principle (line 334).

---

### F-CAD-29 / F-CAD-28. The same 14.8 seconds appears in two more documents with impossible starting temperatures. CONFIRMED.

**SFAIRP §5.4, line 202:**

> silicon heat flux exceeding 120 W/cm² drives a junction temperature rate of
> change exceeding **4.2°C/s** and temperature rise **past 45 °C**. The
> **94.0°C** destruction limit is breached within **14.8 seconds**.

```
$ python3 -c "
print('start implied by 4.2 C/s over 14.8 s:', 94-4.2*14.8, 'C')
print('from the stated 45 C:', (94-45)/4.2, 's')
"
start implied by 4.2 C/s over 14.8 s: 31.84 C
from the stated 45 C: 11.67 s
```

The sentence contains its own refutation: if the junction passes 45 °C on the
way up, then at 4.2 °C/s it reaches 94 °C in **11.7 s**, not 14.8 s. For 14.8 s
the run must start at 31.8 °C, at or below the 32.0 °C coolant inlet used
throughout the corpus (UNI line 159).

**CRA §2.2 line 84 and §4.4 lines 193-199:**

> The rate of change of silicon junction temperature exceeds **4.5°C/s**.
> ... Silicon junction temperature $T_j$ surges beyond the physical trip
> threshold of **94.0°C** within **14.8 seconds**
>
> - $P_{\text{die}}$ ... (**1,200 W**). - $C_{\text{thermal}}$ ... (**≈ 142 J/K**).

```
$ python3 -c "print('adiabatic dTj/dt = P/C =', round(1200/142,3), 'C/s')"
adiabatic dTj/dt = P/C = 8.451 C/s
```

The document's own P and C give 8.45 °C/s as the **maximum possible** rate with
zero cooling; 4.5 °C/s is attainable, but only with residual cooling, and the
same 14.8 s again implies a 27.4 °C start against a coolant stated as 32 °C
(UNI 159) or 35 °C (CRA line 196, the Prandtl reference temperature).

Fix (not applied): pick one thermal model — P_die, C_th, T_0 and T_crit — and
derive the time from it once. Every document then quotes the derivation.

---

### F-TM-14. The ATQ paper's "45-second thermal trip cliff" implies a starting temperature of −95 °C. CONFIRMED.

`WG-07-TM-ATQ.md` §5.2, lines 247-253:

> - $P_{\text{die}} = 1,200$ W dissipation per accelerator tray.
> - $C_{\text{thermal}} = 142$ J/K thermal capacitance.
>
> When flow halts, junction temperature surges at **4.2°C/s**. Silicon
> delamination occurs when $T_j > 94.0°C$, establishing a strict **45-second
> thermal trip cliff**.

```
$ python3 -c "
print('P/C =', round(1200/142,3), 'C/s   (paper says 4.2)')
print('rise over 45 s at 4.2 C/s =', 4.2*45, 'K -> start =', 94-4.2*45, 'C')
"
P/C = 8.451 C/s   (paper says 4.2)
rise over 45 s at 4.2 C/s = 189.0 K -> start = -95.0 C
```

Two errors compounding. The stated rate contradicts the document's own P and C
by a factor of two. And 45 seconds at 4.2 °C/s is a 189 K rise, which from a
94 °C endpoint means starting at **−95 °C**.

The provenance of "45 seconds" is visible in the corpus: FRONT line 123 is
headed "The 45-Second Thermal Runaway Window" and line 130 gives
"**12 and 45 seconds**" for a *different* threshold (105-115 °C) and a
*different* capacitance (450 J/°C). The ATQ paper has taken the upper bound of
a range computed under other parameters, dropped the lower bound, and
re-labelled it a "strict cliff" under parameters that do not produce it.

It is also load-bearing: line 283 uses it in the underwriting case study
("inducing physical cooling stagnation ($T_j > 94.0°C$ in 45 seconds)") that
drives the ALE from 2.4M to 18.2M and the Gordon-Loeb capital allocation.

Fix (not applied): derive the time from the ATQ paper's own P and C
(94 °C from a stated T_0 at 8.45 °C/s), or cite the FRONT derivation and adopt
its parameters wholesale, including the 12-second lower bound.

---

### F-TM-21. The Node Registers spoofing model asymptotes at 33.25 °C and is claimed to reach 94 °C. CONFIRMED.

`WG-07-TM-CyHAZOP-Node-Registers.md` §4.2, lines 170-172:

> $$T_{\text{phys}}(t) = T_{\text{inlet}} + \frac{P_{\text{die}}}{\dot{m}(t) \cdot C_p} \left(1 - \exp\left(-\frac{t}{\tau_{\text{th}}}\right)\right)$$
>
> ... while $T_{\text{phys}}(t)$ surges past the physical threshold of
> **94.0°C** at $t =$ **14.8 seconds**.

The expression is bounded above by T_inlet + P/(ṁ·Cp), reached only as t → ∞:

```
$ python3 -c "
Pd, Ti, cp = 1200, 30.0, 3700
for lpm in (5.8, 7.7, 38.5):
    mdot = lpm/60000*1032
    print(f'{lpm:5} L/min -> P/(mdot*cp) = {Pd/(mdot*cp):6.3f} K -> asymptote {Ti+Pd/(mdot*cp):6.2f} C')
"
  5.8 L/min -> P/(mdot*cp) =  3.251 K -> asymptote  33.25 C
  7.7 L/min -> P/(mdot*cp) =  2.449 K -> asymptote  32.45 C
 38.5 L/min -> P/(mdot*cp) =  0.490 K -> asymptote  30.49 C
```

At the throttled flow the model's ceiling is **33.25 °C**. It cannot reach
94 °C at 14.8 seconds or at any time. The formula is also the wrong one for the
job: P/(ṁ·Cp) is the bulk **coolant** temperature rise across the cold plate,
not a junction temperature — it contains no junction-to-fluid thermal
resistance, so it cannot represent T_j at all.

Fix (not applied): replace with a junction model (T_j = T_fluid + P·R_θ, plus a
transient term), state R_θ, and re-derive the time.

---

### F-TM-19. A 74% heat-transfer collapse that exceeds the model's own asymptotic maximum. CONFIRMED.

`WG-07-TM-CyHAZOP-Node-Registers.md` §4.1, lines 153-163. The document sets up
a first-order VFD lag, correctly applies the pump affinity law, then states an
outcome that its own equations forbid:

> $\tau_{\text{VFD}} \approx$ **2.5 s** ... $\dot{Q}_{\text{final}} = 38.5 \cdot (12/60) =$ **7.7 L/min**
>
> $$h_{\text{conv}}(t) = 0.023 \cdot \text{Re}^{0.8} \cdot \text{Pr}^{0.4} \cdot k/D_h$$
>
> Within **3.2 seconds**, convective heat transfer collapses by **74%**

Dittus-Boelter makes h ∝ Re^0.8 ∝ Q^0.8, so the collapse is fully determined:

```
$ python3 -c "
import math
Q0, Qf, tau = 38.5, 7.7, 2.5
Qt = Qf + (Q0-Qf)*math.exp(-3.2/tau)
print('Q(3.2 s) =', round(Qt,3), 'L/min ; ratio =', round(Qt/Q0,4))
print('h drop at 3.2 s =', round((1-(Qt/Q0)**0.8)*100,1), '%')
print('h drop at t -> inf (Q=7.7) =', round((1-(Qf/Q0)**0.8)*100,1), '% <- maximum attainable')
print('h drop at Q=5.8 =', round((1-(5.8/Q0)**0.8)*100,1), '%')
"
Q(3.2 s) = 16.264 L/min ; ratio = 0.4224
h drop at 3.2 s = 49.8 %
h drop at t -> inf (Q=7.7) = 72.4 % <- maximum attainable
h drop at Q=5.8 = 78.0 %
```

At 3.2 seconds the collapse is **49.8%**. The asymptotic maximum for this
scenario is **72.4%**, so 74% is unreachable at any finite time.

The origin of the wrong number is traceable. 78.0% is the exact
Dittus-Boelter answer for a flow of **5.8 L/min**, and 78% is the figure used
in CYH line 141 and CRA line 199 for the *valve-throttle* case. The Node
Registers paper has imported the valve case's answer into the VFD case and
rounded it down.

Fix (not applied): state 49.8% at 3.2 s, or 72.4% at steady state, and say
which. Keep 78% only where the flow is genuinely 5.8 L/min.

---

### F-TM-20. The VFD register row states a flow the paper's own affinity law contradicts. CONFIRMED.

`WG-07-TM-CyHAZOP-Node-Registers.md` line 92, register 40102:

> | **40102** | `CDU-VFD-01` | 16-bit uint (0.1 Hz) | VFD Inverter Speed Setpoint |
> 600 (60.0 Hz) | 120 (12.0 Hz) | Volumetric delivery drops to **5.8 L/min**.
> Heat transfer coefficient drops 78%. |

```
$ python3 -c "
print('affinity law, 12/60 Hz:', 38.5*12/60, 'L/min')
print('valve at 15% open   :', round(38.5*0.15,3), 'L/min')
"
affinity law, 12/60 Hz: 7.7 L/min
valve at 15% open   : 5.775 L/min
```

The same document derives **7.7 L/min** for this exact register change 61 lines
later, at line 157, showing the arithmetic:

> $\dot{Q}_{\text{final}} = \dot{Q}_0 \cdot (N_{\text{final}}/N_0) = 38.5 \cdot (12/60) = 7.7$ L/min

5.8 L/min is the *valve* case, from a different row of a different table
(register 40104, 15% open). Two rows of the register map have been crossed, and
the 78% figure travelled with it.

The scale annotations on the same register are correct and worth noting as
clean: 600 × 0.1 Hz = 60.0 Hz, 120 × 0.1 Hz = 12.0 Hz, and register 30201's
385 × 0.1 L/min = 38.5 L/min all check out.

Fix (not applied): change 5.8 to 7.7 L/min and 78% to 72.4% in row 40102.

---

### F-TM-23. Register 40015 labels 50.00 Hz as 60.0 Hz. CONFIRMED.

`WG-07-TM-CyHAZOP-Node-Registers.md` line 110:

> | **40015** | `UPS-INV-FREQ` | Modbus uint (**0.01 Hz**) | Inverter Output
> Frequency | **5000 / 6000 (60.0 Hz)** | 6500 (65.0 Hz) |

At the stated 0.01 Hz scale, 6000 = 60.00 Hz and 6500 = 65.00 Hz — both
correct. But 5000 = **50.00 Hz**, and the row annotates the pair "5000 / 6000"
with the single value "(60.0 Hz)". Presumably 50 Hz and 60 Hz regional variants
were intended; as published, an engineer reading the register map is told that
raw value 5000 means 60.0 Hz, which would make every derived frequency reading
20% high.

Fix (not applied): write "5000 (50.0 Hz) / 6000 (60.0 Hz)".

---

### F-TM-22. An 8.4 kV "insulation-punching" surge on an 11 kV feed is below that feed's own normal peak. CONFIRMED.

`WG-07-TM-CyHAZOP-Node-Registers.md` §4.3, lines 183-187:

> Across medium-voltage distribution switchgear (**11 kV** feed with
> $L_{\text{transformer}} \approx 4.5$ mH and $\Delta I = 15,000$ A) ...
>
> $$V_{\text{surge}} = 4.5 \times 10^{-3} \times \frac{15,000}{8.0 \times 10^{-3}} = 8,437.5\text{ V}$$
>
> This **8.4 kV** inductive surge **punches through transformer insulation
> barriers**, creating catastrophic arc flash explosion and transformer oil fires.

The arithmetic is right — 4.5e-3 × 15,000 / 8.0e-3 = 8,437.5 V exactly. The
conclusion drawn from it is not:

```
$ python3 -c "
import math
print('11 kV phase-to-neutral peak =', round(11000*math.sqrt(2)/math.sqrt(3),0), 'V')
"
11 kV phase-to-neutral peak = 8981.0 V
```

An 11 kV system's conductors already see **8,981 V** peak phase-to-neutral,
every half cycle, in normal operation. An 8,437 V transient is *smaller* than
the voltage the insulation is designed to withstand continuously. This is
confirmable entirely from the document's own two numbers — 8,437.5 V and 11 kV
— without opening any standard.

PROBABLE addition, needing an external source: 11 kV switchgear is normally
specified to a basic insulation level in the 75-95 kV range, an order of
magnitude above the calculated surge.

The 48 V case at line 181 is fine and correctly unremarkable: 12 µH × 2,500 A /
4 ms = 7.5 V.

Fix (not applied): either state a realistic Δt_open (a fast interruption of
15 kA in microseconds, not 8 ms, is what generates a damaging transient) or
drop the insulation-failure conclusion. As written the paragraph proves the
opposite of what it claims.

---

### F-TM-10. The ATQ's twelve weights sum to 1.05, so the "[0, 100]" score can reach 105. CONFIRMED.

`WG-07-TM-ATQ.md` states the constraint at line 57:

> $$\sum_{k=1}^{12} w_k = 1.0, \quad w_k > 0 \quad \forall k \in \{1, \dots, 12\}$$

The weight column of the §2.1 table, lines 70-81, is 0.18, 0.14, 0.13, 0.10,
0.10, 0.10, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05.

```
$ python3 -c "
w=[0.18,0.14,0.13,0.10,0.10,0.10,0.05,0.05,0.05,0.05,0.05,0.05]
print('n =', len(w), ' sum =', round(sum(w),4))
print('SQL max points =', sum(x*100 for x in w))
"
n = 12  sum = 1.05
SQL max points = 105.0
```

The production SQL at lines 188-200 reproduces the same weights as point values
— 18.0 + 14.0 + 13.0 + 10.0 + 10.0 + 10.0 + 5.0×6 — so `composite_atq` is
bounded by **105**, not 100.

This breaks three claims in the same document. Line 5: "a continuous, cardinal
metric normalized on the closed interval $[0, 100]$". Line 53: the formula
multiplies a weighted sum of σ ∈ [0,1] by 100. Line 386: "Multi-factor cardinal
scalar ($[0, 100]$)". A saturated actor scores 105.

It also silently reweights every dimension by 1/1.05 relative to its stated
share: the EIC dimension is documented as 18% and actually contributes 17.1%.

Fix (not applied): either renormalise (0.171, 0.133, 0.124, 0.095 ×3,
0.048 ×6), or change one weight so the twelve sum to 1.00, or restate the range
as [0, 105]. Whichever is chosen must change the SQL at lines 175-200 too, and
every published ATQ score moves.

---

### F-TM-11. "3.7x expansion" is restated two lines later as "365%". CONFIRMED.

`WG-07-TM-ATQ.md` lines 43 and 45:

> Variance across the top band: 10.6 points, a **3.7x** expansion.
>
> ... expands the top-decile score variance by **365%**

```
$ python3 -c "
v1, v2 = 83.2-80.3, 78.6-68.0
print('V1 range', round(v1,2), ' V2 range', round(v2,2), ' ratio', round(v2/v1,4))
print('increase =', round((v2/v1-1)*100,1), '%')
"
V1 range 2.9  V2 range 10.6  ratio 3.6552
increase = 265.5 %
```

3.66x is an increase of **265.5%**, not 365%. "Expands by 365%" would mean
4.65x. The two sentences describe different magnitudes; one of them is the
familiar ratio-versus-increase slip.

Two further problems with the same comparison, both CONFIRMED from the tables
at lines 21-27 and 34-41:

- "Variance" is used for **range** (max − min). Neither number is a variance.
- The V1 band lists **four** actors and the V2 band lists **six**. Range grows
  with sample size by construction, so part of the 3.66x is an artefact of
  comparing a 4-row band with a 6-row band. Restricting the V2 band to its top
  four (78.6 − 73.6 = 5.0) gives 1.72x, less than half the claimed expansion.

Fix (not applied): say "a 3.7-fold increase in the top-band range", drop
"365%", drop the word "variance", and compare equal numbers of actors.

---

### F-TM-12. The effective-temperature ratio does not follow from the stated exponent. CONFIRMED.

`WG-07-TM-ATQ.md` lines 222-228:

> $$\mathcal{T}_{\text{eff}}(a) = \mathcal{T}_0 \cdot (\text{ATQ}_a(t)/100)^{\gamma} \cdot \prod_{s} \mu_s(a)$$
>
> - $\gamma \approx$ **1.85** ...
>
> an actor with an ATQ of **78.6** ... exhibits an effective temperature
> **2.8x** higher than an actor with an ATQ of **42.0**.

```
$ python3 -c "print('(78.6/42.0)**1.85 =', round((78.6/42.0)**1.85,4))"
(78.6/42.0)**1.85 = 3.188
```

The stated γ gives **3.19x**, not 2.8x. (2.8x would require γ ≈ 1.63.) The
sentence attributes the ratio to ATQ alone, so the μ_s sector multipliers do
not rescue it.

Related, and PROBABLE rather than confirmed because μ_s is left free: the table
at lines 236-237 gives ATQ 38.2 → T_eff 1.2 and ATQ 78.6 → T_eff 4.8, a ratio
of 4.0, where the formula gives (78.6/38.2)^1.85 = **3.80**. The Volt Typhoon
row is annotated "(energy-sector affinity)", so μ_s ≈ 1.05 would close the gap
— but μ_s is never given a value anywhere, so the row is not reproducible.

Fix (not applied): recompute line 228 as 3.19x, and publish the μ_s value used
in the table at 236-237 so the row can be checked.

---

### F-TM-13. The Boltzmann walk mixes electron-volts with a dimensionless temperature and Boltzmann's constant. CONFIRMED.

`WG-07-TM-ATQ.md` line 216 gives the transition probability with an explicit
Boltzmann constant:

> $$P(u \to v \mid a) = \frac{\exp\left( -\frac{\Delta E(u, v)}{k_B \cdot \mathcal{T}_{\text{eff}}(a)} \right)}{\sum_{w \in \mathcal{N}(u)} \exp\left( -\frac{\Delta E(u, w)}{k_B \cdot \mathcal{T}_{\text{eff}}(a)} \right)}$$

and the table at lines 236-237 supplies units: ΔE = **8.4 eV**, T_eff = 1.2 and
4.8, P = 0.012 and 0.684.

```
$ python3 -c "
import math
kB = 8.617333e-5   # eV/K
print('exp(-8.4/(kB*1.2))      =', math.exp(-8.4/(kB*1.2)))
print('exp(-8.4/1.2)  (kB = 1) =', round(math.exp(-8.4/1.2),8))
print('exp(-8.4/4.8)  (kB = 1) =', round(math.exp(-8.4/4.8),8))
print('unnormalised ratio      =', round(math.exp(-8.4/4.8)/math.exp(-8.4/1.2),2))
print('doc ratio 0.684/0.012   =', round(0.684/0.012,2))
"
exp(-8.4/(kB*1.2))      = 0.0
exp(-8.4/1.2)  (kB = 1) = 0.00091188
exp(-8.4/4.8)  (kB = 1) = 0.17377394
unnormalised ratio      = 190.57
doc ratio 0.684/0.012   = 57.0
```

With ΔE genuinely in eV and k_B in eV/K, the exponent is −8.4/(8.617e-5 × 1.2)
= −81,200 and the probability underflows to zero. The formula as written cannot
produce 0.012.

T_eff is defined at line 222 as T_0 × (ATQ/100)^1.85, a dimensionless
construction. There is no temperature in kelvin anywhere. So k_B does not
belong in the denominator and ΔE is not in eV — it is an arbitrary barrier
score. Writing both is dimensional theatre: it borrows the authority of
statistical mechanics for a softmax over edge weights.

Note also that the WG-08 Monte Carlo document, which is the engine this
formula is said to parameterise, writes the same thing correctly and without
either flourish. MO line 33: "`P(e) ∝ exp(weight / T)`", and MO lines 40-42
implement the numerically-stable form. The engine has no k_B and no eV.

Fix (not applied): drop k_B, drop "eV", and state that ΔE is a unitless
barrier score on whatever scale the engine uses. Then republish the two
probabilities from the actual neighbour set.

---

### F-MO-04. Raising the Boltzmann temperature makes an attacker *less* selective, not more capable. PROBABLE.

The ATQ paper's causal claim, line 228:

> Consequently, high-ATQ adversaries **overcome substantial cyber-physical
> security barriers ($\Delta E$) with high probability**, penetrating deep into
> Layer 1/Layer 2 control networks.

The WG-08 document describes the same parameter, line 34:

> **Temperature (T)**: Controls the **randomness** of the walk. Higher T = more
> exploration (Black Swan mode).

MO has it right and ATQ has it backwards. In a softmax, T → ∞ drives the
distribution toward **uniform** over the neighbourhood. If the SCADA edge is
the highest-barrier option out of node u, its probability rises only toward
1/|N(u)|. It never approaches 1. Raising T does not make a hard edge easy; it
makes the walker indifferent between a hard edge and an easy one.

For the table at lines 236-237 to give P = 0.684 for the same 8.4 eV edge that
another actor sees at 0.012, the SCADA edge would have to be **below** the mean
barrier of its neighbourhood — that is, one of the easier options — which
contradicts the row's own framing of it as the defended boundary where
"Defenses hold" for the weaker actor.

Graded PROBABLE rather than CONFIRMED because the neighbour set N(u) is never
published, so I cannot pin the exact bound. What would settle it: the edge list
out of the Corporate DMZ node in the simulated graph.

Fix (not applied): model adversary capability as a reduction in ΔE (the
attacker's cost of crossing a barrier), not as an increase in T. That preserves
the paper's intent and is consistent with the engine MO describes.

---

### F-TM-24. The ATQ paper overstates two corpus counts that TACAM states exactly. CONFIRMED.

`WG-07-TM-ATQ.md` line 5:

> the ATQ synthesizes **over 100,000** Threat Actor Capability & Asset Matching
> (TACAM) records, **600,000** Exploit Prediction Scoring System (EPSS)
> trajectory data points, **80,000** knowledge graph edges, and **35,000**
> geopolitical conflict events.

`WG-07-TM-TACAM.md` line 17 and lines 128-131 give the underlying figures:

> producing a combined matrix of **77,279** data points covering 389 threat
> actor groups
>
> - **79,376** knowledge graph edges ... - **555,556** EPSS trajectory records
> ... - **35,341** geopolitical events

TACAM's own total is internally exact, which is worth recording as a clean
result:

```
$ python3 -c "
d=[1579,2278,1074,627,173,62965,8583]
print('sum of the 7 dimension counts =', sum(d), ' TACAM line 17 states 77,279 ->', sum(d)==77279)
"
sum of the 7 dimension counts = 77279  TACAM line 17 states 77,279 -> True
```

Against that baseline:

| Quantity | TACAM | ATQ | Verdict |
|:---|---:|---:|:---|
| TACAM records | 77,279 | "over 100,000" | **overstated by 22,721 (29%)** |
| EPSS trajectory points | 555,556 | "600,000" | **overstated by 8.0%** |
| Knowledge graph edges | 79,376 | "80,000" | fair rounding |
| Geopolitical events | 35,341 | "35,000" | fair rounding |

Two of the four round in the right direction and two do not. "Over 100,000" is
not a rounding of 77,279 in any convention.

Fix (not applied): quote TACAM's exact figures in the ATQ abstract, or round
all four consistently downward.

---

### F-TM-25. TACAM publishes the deprecated V1 scores under the label "ATQ". CONFIRMED.

`WG-07-TM-ATQ.md` §1 exists to argue that the legacy three-factor V1 model is
degenerate and must be replaced. Its two tables, lines 21-27 (V1) and 34-41
(V2 ATQ):

| Actor | V1 score (ATQ L21-27) | V2 ATQ (ATQ L34-41) | Quoted in TACAM |
|:---|---:|---:|---:|
| Lazarus Group | **83.2** | 76.0 | **83.2** (TACAM L74) |
| Volt Typhoon | **82.9** | 78.6 | **82.9** (TACAM L56) |
| Dragonfly | — | 76.2 | 79.7 (TACAM L57) |

TACAM line 56 and line 74 report the exact **V1** values, under the column
heading "ATQ":

> | Volt Typhoon | **82.9** | Energy: 0.94 | SIMATIC S7: ✅ | 12/14 tactics |
>
> - Most dangerous: Lazarus Group (**ATQ 83.2**); 3 known CVEs in ABB Ability

83.2 and 82.9 are, to the decimal, the two numbers the ATQ paper prints in its
"legacy three-factor model (V1)" table and then spends a section discrediting
for "pervasive ceiling saturation". TACAM's line 141 nevertheless asserts the
dependency runs the other way:

> 1. **The ATQ Score** → TACAM dimensions are the raw inputs to the Actor Threat
> Quotient

A reader comparing the two documents sees Volt Typhoon at 78.6 in one and 82.9
in the other, with no indication that one is a superseded model.

Fix (not applied): reissue TACAM's tables with V2 ATQ values (Volt Typhoon
78.6, Lazarus 76.0, Dragonfly 76.2), or label the column "V1 (legacy)".

---

### F-TM-01. TACAM says MITRE ATT&CK Enterprise has 27 tactics; the ATQ paper uses 14. CONFIRMED.

`WG-07-TM-TACAM.md` line 23:

> | **TTP** (Tactics, Techniques & Procedures) | *How* they attack; which of the
> **27 MITRE ATT&CK enterprise tactics** they prefer | 1,579 actor-tactic clusters |

`WG-07-TM-ATQ.md` uses 14 in three places — the saturation threshold at line
71 ("**14 Tactics**", σ = x/14.0), the production SQL at line 136
(`LEAST(1.0, kc.tactics_count::numeric / 14.0)`), and the terminal output at
line 367 ("Kill Chain: **12/14** tactics"). TACAM's own table at line 56 also
writes "12/14 tactics", contradicting its own line 23 nine rows earlier.

The contradiction is CONFIRMED without any external source: 27 and 14 cannot
both be the number of Enterprise tactics, and TACAM asserts both.

PROBABLE, needing the ATT&CK matrix to settle: 14 is correct for Enterprise.
There is a live second question the corpus never addresses — this is an ICS
corpus, ATT&CK for **ICS** has a different tactic count (believed 12), and the
ATQ paper's dimension 8 is explicitly "OT/ICS Protocols". A kill-chain
completeness score capped at the Enterprise count may be the wrong denominator
throughout.

Fix (not applied): correct TACAM line 23 to 14, and state explicitly whether
the denominator is the Enterprise or the ICS matrix. If ICS, every published
kill-chain figure changes.

---

### F-TM-02. The CISA critical infrastructure sector count is given as 17 in one document and 15 in another. CONFIRMED.

`WG-07-TM-TACAM.md` line 24:

> *Whom* they attack; which of the **17 CISA critical infrastructure sectors**
> they preferentially target

`WG-07-TM-ATQ.md` line 76, and the SQL at line 146:

> | 7 | **Sector Reach** | ... | **CISA Critical Sectors Targeted** | **15 Sectors** | $\min(1.0, x_{a,7} / 15.0)$ |

`LEAST(1.0, COALESCE(sr.sector_count, 0)::numeric / 15.0) AS dim_sector_reach`

Both name CISA. They cannot both be right. CONFIRMED as a contradiction.

PROBABLE, needing PPD-21 / the CISA sector list to settle: the number is 16, so
both are wrong, in opposite directions.

This is not cosmetic for the ATQ. Dimension 7's normalisation divides by 15, so
if the true count is 16 an actor targeting every sector scores 16/15 > 1 before
`LEAST` clamps it — the dimension saturates one sector early, which is the
precise failure mode §3 of that paper exists to eliminate.

Fix (not applied): set both to the CISA figure and adjust θ₇ in the table at
line 76 and the SQL at line 146 together.

---

### F-TM-03. Two MITRE ATT&CK for ICS technique IDs carry names that do not appear to be theirs. PROBABLE.

`WG-05-CAD-IEC62443-SFAIRP-SecRACS.md` Table 18.2, lines 223-232, maps five
technique IDs. Three are believed correct — T0814 (Denial of Service, lines 225
and 231), T0836 (Modify Parameter, lines 226, 229, 232), T0858 (Change
Operating Mode, line 227). Two are not:

> | **HAZ-004** | N1 | Substation Relay | **MORE (Delay)** | **T0837 (Defeat Indicator)** | Protection Blindness | **SL-3** |
>
> | **HAZ-006** | N8 | BMS Supervisory | **CORRUPTED** | **T0869 (Manipulate State)** | SCADA Ransomware | **SL-2** |

T0837 is believed to be **Loss of Protection**, and T0869 is believed to be
**Standard Application Layer Protocol**. "Defeat Indicator" and "Manipulate
State" do not appear to be technique names in the ICS matrix at all; the
nearest real names are T0831 Manipulation of Control and T0832 Manipulation of
View.

There is a second problem which holds even under the correct names, and which
is CONFIRMED from the table's own structure: T0837 Loss of Protection sits in
the **Impact** tactic. It is a consequence, not something an adversary
executes. The column it occupies is headed "MITRE ATT&CK" alongside a
"Deviation Mode" and an "EMB3D Property", i.e. it is being used as the attack
technique for the hazard. A consequence cannot be the technique that produces
it.

These five IDs are the only MITRE identifiers in the entire corpus:

```
$ grep -rhoE 'T0[0-9]{3} \([^)]*\)' references/ | sort | uniq -c | sort -rn
   3 T0836 (Modify Parameter)
   2 T0814 (Denial of Service)
   1 T0869 (Manipulate State)
   1 T0858 (Change Operating Mode)
   1 T0837 (Defeat Indicator)
```

so there is no second passage in the corpus to cross-check against, which is
why this is PROBABLE. What would settle it: attack.mitre.org/techniques/T0837/
and /T0869/.

Fix (not applied): verify all five IDs against the ICS matrix and replace T0837
with a technique from a pre-Impact tactic that actually defeats a protection
indicator.

---

### F-TM-05. The TLStorm mechanism described is not the one the cited CVEs cover. PROBABLE.

`WG-07-TM-CyHAZOP-Methodology.md` §6.2, lines 268-269:

> ### 6.2 TLStorm: Cloud-Connected UPS Firmware (**CVE-2022-22805 / CVE-2022-22806**)
>
> Security researchers demonstrated that Schneider Electric APC Smart-UPS units
> featuring cloud connectivity could be remotely updated with **unsigned,
> malicious firmware**.

TLStorm comprised three vulnerabilities. CVE-2022-22805 and CVE-2022-22806 are
believed to be the two **TLS** flaws (a buffer overflow in packet reassembly
and an authentication bypass). The **unsigned firmware upgrade** issue — the
exact mechanism the paragraph describes and the one that carries its physical
consequence — is believed to be **CVE-2022-0715**, which the document does not
cite.

Fix (not applied): add CVE-2022-0715, or restate the mechanism as the TLS
compromise that the two cited CVEs actually cover. What would settle it: the
NVD entries for all three.

---

### F-TM-04. The Unitronics attack is placed on port 502. PROBABLE.

`WG-07-TM-CyHAZOP-Node-Registers.md` §5.1, lines 211-212:

> ### 5.1 Unitronics Vision PLC Water Sector Compromises (November 2023)
> Nation-state adversaries compromised municipal water boosting stations by
> connecting directly to **port 502** across the public internet. The attackers
> leveraged default administrative credentials (**PIN 1111**) to write to
> holding registers

The default password 1111 and the November 2023 dating are believed correct.
The port is not: Unitronics Vision series PLCs are believed to expose the
PCOM protocol on **TCP 20256**, which is what the CISA advisory on those
intrusions identifies. Port 502 is Modbus.

The distinction matters here more than it usually would, because the whole
section is a register-level port-and-protocol reference intended for defenders
to write firewall rules against.

Fix (not applied): change to TCP 20256 and cite the CISA advisory number.
What would settle it: CISA AA23-335A.

---

### F-CAD-03. CRA Annex IV is labelled "Important Products Class II". PROBABLE.

`WG-05-CAD-Supply-Chain-EU-CRA.md` lines 20-23 and the diagram at 29-32:

> 2. **Important Products with Digital Elements (Class I - Annex III):** ...
> 3. **Important Products with Digital Elements (Class II - Annex IV):**
>    Reserved for highest-criticality assets: firewalls, intrusion detection
>    systems, hardware security modules, smart meter gateways, tamper-resistant
>    microprocessors, and hypervisors.

The CRA is believed to place **both** Class I and Class II important products
in Annex III, and to reserve **Annex IV** for a separate category called
**critical** products with digital elements. On that reading, the paper's Class
II list is a merge of two different annexes: firewalls, IDS and hypervisors are
believed to be Annex III Class II important products, while HSMs, smart meter
gateways and tamper-resistant microprocessors are believed to be Annex IV
critical products.

The consequence is a conformity-assessment error, which is the operative part
for a reader: the paper tells manufacturers that everything in its "Class II"
list requires mandatory notified-body assessment. Under the annex split, only
the Annex IV critical products carry the stricter regime, and Annex III Class II
products retain the harmonised-standards route.

Fix (not applied): split the list into Annex III Class II (important) and
Annex IV (critical), and give each its correct conformity route.
What would settle it: Annexes III and IV of Regulation (EU) 2024/2847.

---

### F-CAD-07 to F-CAD-10. Four further standard attributions. PROBABLE.

**F-CAD-07 — IEC 62443-3-3 dated 2018.** FRONT line 511, bibliography ref 1:
"*IEC 62443-3-3 ...* International Standard, **2018**." IEC 62443-3-3 is
believed to be a 2013 edition. Settled by the IEC catalogue.

**F-CAD-08 — SLE = AV × EF attributed to NIST SP 800-30 Rev. 1.** FRONT line
457: "The Single Loss Expectancy (SLE) ... is **defined per NIST SP 800-30
Rev. 1** as: SLE = Asset Value (AV) × Exposure Factor (EF)". Rev. 1 (2012) is
believed to have moved away from the SLE/ARO/ALE quantitative model; the
AV × EF formulation belongs to the older 2002 edition and to CISSP-lineage
material. Note the corpus is not consistent about this either: ATQ line 272
defines ALE as Σ ARO(a)·s(a)·SLE(a), a three-factor form that FRONT's cited
source would not support. Settled by opening SP 800-30 Rev. 1.

**F-CAD-09 — IEEE 1680 as an HBOM verification standard.** UNI line 114 lists
the HBOM row's "Verification Standard" as "**OCP SAFE, IEEE 1680**". IEEE 1680
is believed to be the environmental assessment standard behind EPEAT — a
sustainability rating, not a hardware security or provenance standard. OCP SAFE
in the same cell is apposite; IEEE 1680 is not. Settled by the IEEE standard's
scope statement.

**F-CAD-10 — SRACs attributed to EN 50126 / IEC 61508.** SFAIRP line 143:
"**Derived from functional safety practice (EN 50126 / IEC 61508)**,
Security-Related Application Conditions (SecRACs)". Safety-Related Application
Conditions are believed to be defined in **EN 50129** (and EN 50128), not in
EN 50126, which covers the RAMS lifecycle. Settled by EN 50129's definitions
clause. FRONT line 224 makes a related attribution — "Under **EN 50126**, every
potential failure mode ... is categorized into a Safety Integrity Level" — where
SIL allocation is believed to sit in EN 50126-2 / EN 50129 rather than
EN 50126-1, the only part the same document cites (ref 3, line 513).

---

### F-CAD-19 / F-CAD-18. Named methods presented without a traceable source. CONFIRMED and PROBABLE.

**F-CAD-18 — "dual-RPN" is invoked and never defined. CONFIRMED.**
`WG-05-CAD-IEC62443-SFAIRP-SecRACS.md` Table 18.1, line 104, Stage 4:

> Execute CyHAZOP workshop; **score dual-RPN**; execute SIL-to-SL convergence
> mapping.

"dual-RPN" appears nowhere else in the document, and nowhere in the CyHAZOP
Methodology paper, the Node Registers paper, or any other file in my scope. The
SFAIRP paper's own §5.1 defines a **single** RPN_c = S · O_c · D_c (line 161),
and Table 18.2 has one RPN column. A stage gate mandates the production of an
artefact the corpus never specifies.

This is also circumstantial support for the F-TM-17 verdict: a 15-step
lifecycle that omits a step the sibling paper's Stage 4 requires.

**F-CAD-19 — the SIL-to-SL formula is attributed but not located. PROBABLE.**
SFAIRP line 9 and line 155:

> **SIL-to-SL Convergence:** A mathematical formulation; **adapted from ISA
> TR 84.00.09 and CENELEC TS 50701**; that formally couples Safety Integrity
> Levels ... to Cybersecurity Security Levels
>
> **Under ISA TR 84.00.09 and CENELEC TS 50701**, a safety-critical component
> cannot maintain its functional safety rating if its cyber attack surface is
> undefended. The required Security Level Target SL-T(k) ... is formulated as:
>
> $$\text{SL-T}(k) = \min\left(4, \max\left(1, \text{SIL}(k) + \left\lfloor \frac{\text{RPN}_c(k) - 100}{150} \right\rfloor \right)\right)$$

No clause number is given in either place. "Adapted from" at line 9 is honest;
"Under ISA TR 84.00.09 and CENELEC TS 50701 ... is formulated as" at line 155
reads as though the two standards contain this equation. The magic constants
100 and 150 are stated nowhere else and cited to nothing.

Worth recording, because the corpus has a correct precedent: the vault's own
`10_workpapers_references/iec62443_basis/CRL-SEC-TVA_BASIS_004_SIL_SLT.md`
documents a different SL-T = IC + AC − 1 derivation. Neither this paper nor
that workpaper references the other.

The worked example is arithmetically clean, and I record that:

```
$ python3 -c "
import math
print('floor((567-100)/150) =', math.floor((567-100)/150))
print('min(4, max(1, 2+3))  =', min(4, max(1, 2+3)))
"
floor((567-100)/150) = 3
min(4, max(1, 2+3))  = 4
```

Fix (not applied): give the clause numbers, or relabel the formula as an
Eigenia construction informed by those standards, and justify 100 and 150.

**Related, PROBABLE: Table 18.2 is not reproducible from the formula.** Lines
223-232 assign SL-T per hazard but publish no SIL column, and the ordering is
not monotone in RPN_c — HAZ-006 (RPN 336) gets SL-2 while HAZ-007 (RPN 315)
gets SL-3. Each row is *satisfiable* with some unstated SIL, so this is not a
contradiction, but no reader can check any row. All eight RPN products
themselves are correct:

```
$ python3 -c "
rows=[('HAZ-001',9,7,9,567),('HAZ-002',9,6,9,486),('HAZ-003',9,6,8,432),('HAZ-004',10,4,9,360),
      ('HAZ-005',8,5,7,280),('HAZ-006',8,7,6,336),('HAZ-007',9,5,7,315),('HAZ-008',10,3,7,210)]
for n,s,o,d,st in rows: print(n, s*o*d, st, 'OK' if s*o*d==st else 'MISMATCH')
"
HAZ-001 567 567 OK   HAZ-005 280 280 OK
HAZ-002 486 486 OK   HAZ-006 336 336 OK
HAZ-003 432 432 OK   HAZ-007 315 315 OK
HAZ-004 360 360 OK   HAZ-008 210 210 OK
```

Fix (not applied): add a SIL column to Table 18.2.

---

### F-CAD-22. "Eight primary property bindings", nine properties in the JSON. CONFIRMED.

`WG-05-CAD-Unified-DEXPI-CycloneDX.md` §3.1, line 152:

> The `dexpi:` namespace defines **eight** primary property bindings:

Lines 154-161 then list eight. The reference JSON at lines 182-190 emits
**nine**, the ninth being one the specification section never defines:

> { "name": "dexpi:zone:purdueLevel", "value": "Zone-1" }

For a document whose thesis is that the value of the schema lies in being
machine-checkable, a normative property list that its own reference document
violates is a substantive defect: a validator built to §3.1 rejects the
paper's own example.

Fix (not applied): add `dexpi:zone:purdueLevel` to §3.1 as a ninth binding,
change "eight" to "nine", and fix its value (see F-CAD-11 — a property named
for a Purdue level should hold a level, not the string "Zone-1").

---

### F-CAD-21. A SHA-384 hash with a 256-bit digest. CONFIRMED.

`WG-05-CAD-Unified-DEXPI-CycloneDX.md` lines 211-216, in the reference
CycloneDX document for the Caliptra ROM firmware component:

> "hashes": [ { "alg": "**SHA-384**",
> "content": "4a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b" } ]

```
$ python3 -c "
h='4a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b'
print('hex chars =', len(h), '-> bits =', len(h)*4)
print('SHA-384 requires 96 hex chars / 384 bits')
"
hex chars = 64 -> bits = 256
SHA-384 requires 96 hex chars / 384 bits
```

The declared algorithm and the digest length disagree. A CycloneDX validator
would reject this document, and the surrounding text (line 130) specifically
instructs implementers that firmware components "must provide authoritative
cryptographic hashes (SHA-384 or SHA-512)". The example contradicts the rule it
illustrates.

The same document's PQC block at lines 226-229 is correct and worth noting —
ML-DSA-87 with `nistQuantumSecurityLevel: 5` is the right category.

Fix (not applied): replace with a 96-hex-character placeholder, or change
`"alg"` to `"SHA-256"`.

---

### F-CAD-23. The Frontier PML sums a 1,024-accelerator row with a 2,048-accelerator loss. CONFIRMED.

`WG-05-CAD-Frontier-AI-Hardware-Security.md` §9.1, lines 461-466:

> For a standardized 120 kW AI Rack Envelope containing **eight compute trays
> (64 accelerator modules** ...)
>
> 2. ... A frontier model training run employing **2,048 accelerators** ...
> forces a four-week rollback ... induces consequential business interruption
> losses exceeding **$80,640,000**.
>
> 3. **Probable Maximum Loss (PML)**: Under an uncontained facility
> cyber-physical event affecting a **16-rack row (1,024 accelerators)**, the
> total exposed asset valuation is:
>
> $$\text{PML} = 16 \times 2{,}850{,}000 + 80{,}640{,}000 = 126{,}240{,}000$$

```
$ python3 -c "
print('16 racks x 64 accelerators =', 16*64)
print('BI figure is scoped to 2,048 accelerators; scale mismatch =', 2048/(16*64), 'x')
print('16*2850000 + 80640000 =', 16*2850000+80640000)
"
16 racks x 64 accelerators = 1024
BI figure is scoped to 2,048 accelerators; scale mismatch = 2.0 x
16*2850000 + 80640000 = 126240000
```

The addition is right and every downstream figure follows correctly from it
(SLE 107,304,000; ALE 12,876,480; ROSI 1316.7%; Gordon-Loeb ceiling 4,738,545;
900,000/4,738,545 = 18.99% ≈ "19%" — all recomputed and all exact). The defect
is upstream: the direct-damage term covers 1,024 accelerators and the
consequential term covers a training run twice that size. The hardware and the
business interruption are scoped to different events.

Everything the section concludes rides on this: the ALE that justifies the
$900,000 annual control spend, and the Gordon-Loeb ceiling that the spend is
declared "mathematically and financially sound" against.

Fix (not applied): scope both terms to the same event. Either halve the BI term
to the 1,024 accelerators actually in the row, or state that the row's failure
stalls a cluster twice its size and justify why.

---

### F-CAD-24. The stated coolant flow removes half the stated rack heat. CONFIRMED.

`WG-05-CAD-Frontier-AI-Hardware-Security.md` line 119 and line 365:

> Operating at **100 kW to 140 kW per rack** ... Secondary loops circulate
> coolant at volumetric flow rates between **40 L/min and 80 L/min per rack
> frame**

```
$ python3 -c "
for lpm in (40,80):
    mdot = lpm/60000*1032          # PG25, rho = 1032 kg/m3 (UNI L278)
    print(lpm, 'L/min at dT=13 K removes', round(mdot*3700*13/1000,1), 'kW')
print('flow needed for 120 kW at dT=13 K:', round(120000/(3700*13)/1032*60000,1), 'L/min')
"
40 L/min at dT=13 K removes 33.1 kW
80 L/min at dT=13 K removes 66.2 kW
flow needed for 120 kW at dT=13 K: 145.0 L/min
```

Using the corpus's own PG25 density (UNI line 278) and its own supply/return
temperatures of 32 °C → 45 °C (UNI lines 291-292, ΔT = 13 K), the stated flow
range removes **33 to 66 kW**. A 120 kW rack needs about **145 L/min**.

The corpus contains the right order of magnitude elsewhere and contradicts
itself: UNI line 47 gives a manifold `DesignFlowRate` of **385.0 L/min**, and
UNI line 157 gives **38.5 L/min per tray**, which across the 8 to 16 trays per
rack that FRONT line 49 specifies is 308 to 616 L/min — four to eight times
FRONT's own 40-80 L/min figure.

Fix (not applied): reconcile per-tray flow, per-rack flow and rack duty into
one consistent set. 38.5 L/min/tray × 8 trays ≈ 308 L/min at ΔT 13 K removes
about 255 kW, so at least two of the three numbers need to move.

---

### F-CAD-25. The Markov generator matrix has a row that does not sum to zero. CONFIRMED.

`WG-05-CAD-Frontier-AI-Hardware-Security.md` §8.3, lines 428-433:

> $$\mathbf{Q} = \begin{bmatrix}
> -(\lambda_p + \lambda_c) & \lambda_p + \lambda_c & 0 & 0 \\
> \mu_r & -(\mu_r + \lambda_{sis} + \lambda_{fail}) & \lambda_{sis} & \lambda_{fail} \\
> 0 & 0 & -\mu_{rec} & 0 \\
> 0 & 0 & 0 & 0
> \end{bmatrix}$$

Every row of a CTMC generator must sum to zero. Row-by-row:

- Row 1: −(λp+λc) + (λp+λc) = 0 ✓
- Row 2: μr − (μr+λsis+λfail) + λsis + λfail = 0 ✓
- Row 3: 0 + 0 − μ_rec + 0 = **−μ_rec ≠ 0** ✗
- Row 4: 0 (absorbing state S₃) ✓

Row 3 leaks probability. The document defines μ_rec at line 441 as "the
facility recovery rate from safe zeroized state back to operational baseline",
so the missing entry belongs in **column 1**: row 3 should read
`[μ_rec, 0, −μ_rec, 0]`. As printed, the chain loses mass from S₂ at rate μ_rec
and Σᵢ Pᵢ(t) is not conserved, so d**P**/dt = **PQ** at line 424 does not
integrate to a probability vector.

Fix (not applied): put μ_rec in position (3,1).

---

### F-CAD-30. The ±18 V resonance figure needs a damping ratio the paper never states. PROBABLE.

`WG-05-CAD-Frontier-AI-Hardware-Security.md` §8.2, lines 405-411:

> $$v_{peak} = \frac{\Delta I \cdot \omega_0 L_{eff}}{2\zeta}$$
>
> For high-current 48V distribution bars where $L_{eff} \approx$ **12 nH**,
> $C_{eff} \approx$ **800 µF**, and $\Delta I \approx$ **1,500 A**, the induced
> resonance creates voltage spikes exceeding **±18 V**

```
$ python3 -c "
import math
L, C, dI = 12e-9, 800e-6, 1500
w0 = 1/math.sqrt(L*C)
print('w0 =', round(w0,1), 'rad/s  f0 =', round(w0/(2*math.pi)/1000,2), 'kHz')
print('Z0 = sqrt(L/C) =', round(math.sqrt(L/C),6), 'ohm ; undamped step dI*Z0 =', round(dI*math.sqrt(L/C),3), 'V')
print('zeta needed for 18 V =', round(dI*w0*L/(2*18),4), '(never stated)')
"
w0 = 322748.6 rad/s  f0 = 51.37 kHz
Z0 = sqrt(L/C) = 0.003873 ohm ; undamped step dI*Z0 = 5.809 V
zeta needed for 18 V = 0.1614 (never stated)
```

±18 V is attainable, but only at ζ ≈ 0.16 (Q ≈ 3.1). ζ appears in the formula
at line 405 and is never given a value, so the headline number is not
reproducible from the published parameters. Without ζ the derivable figure is
the 5.8 V step response.

A second, CONFIRMED inconsistency sits alongside it: the stated L and C put the
PDN resonance at **51.4 kHz**, while line 147 describes the attack as toggling
"at **kilohertz** frequencies". An attacker who must hit ω₀ to get any
amplification needs to be at 51 kHz, not "kilohertz".

Fix (not applied): publish ζ, and change "kilohertz" at line 147 to the
resonance the parameters imply.

---

### F-CAD-26. "Asymptotically approaches 1.0 (100% certainty of compromise)" with the driving parameter unstated. CONFIRMED.

`WG-05-CAD-Supply-Chain-EU-CRA.md` §4.3, lines 175-183:

> $$P_{\text{chain}} = 1 - \prod_{j=1}^M \prod_{k=1}^{N_j} \left( 1 - \theta_{j,k} \cdot (1 - \alpha_{\text{assurance},j,k}) \right)$$
>
> When an operator relies on static PDF questionnaires ($\alpha \le 0.15$)
> across **150 components**, $P_{\text{chain}}$ **asymptotically approaches
> $1.0$ (100% certainty of compromise)**.

P_chain depends on θ, the per-supplier baseline compromise probability, and θ is
never given a value anywhere in the document.

```
$ python3 -c "
for th in (0.001, 0.01, 0.05):
    print('theta =', th, '-> P_chain =', round(1-(1-th*0.85)**150, 4))
"
theta = 0.001 -> P_chain = 0.1198
theta = 0.01  -> P_chain = 0.7221
theta = 0.05  -> P_chain = 0.9985
```

The result spans 12% to 99.85% across three plausible values of θ. The claim is
not derivable; it is asserted.

Two distinct probability errors are stacked here. "Asymptotically approaches
1.0" describes a limit as N → ∞, and the paper then reports it as a value at
N = 150. And "100% certainty of compromise" converts a limit into a certainty —
P_chain < 1 for any finite N and any θ < 1. The sentence is also the setup for
the paper's commercial claim two clauses later ("elevates α → 0.98"), so the
overstatement is load-bearing.

Fix (not applied): state θ, compute P_chain at N = 150, and report the number.
Replace "100% certainty of compromise" with the computed probability.

---

### F-CAD-27. A section headed "24-Hour" requires twelve hours in its own sentence. CONFIRMED.

`WG-05-CAD-Supply-Chain-EU-CRA.md` §6.1, line 328:

> 3. **24-Hour Vulnerability Escalation SLA:** Suppliers must contractually
> commit to notifying the buyer within **twelve hours** of discovering any
> critical vulnerability or active exploit affecting delivered hardware or
> firmware.

The heading and the obligation differ by a factor of two, in one line. This is
a contract clause template; both numbers would be copied into a real
procurement agreement.

The 24-hour figure elsewhere in the document is the regulatory one — line 227,
"Article 14 ... within 24 hours". A supplier-to-buyer SLA of 12 hours would be
a deliberate choice (it gives the manufacturer margin against its own 24-hour
regulatory clock), and if so the heading is simply wrong.

Fix (not applied): decide which, and make the heading and the sentence agree.
If 12 hours is intended, say why — the margin argument is a good one and the
document does not make it.

---

### F-MO-02. The Monte Carlo engine claims reproducibility and describes a wall-clock fallback that defeats it. CONFIRMED.

`references/WG-08-MO-Monte-Carlo-Application/WG-08-MO-Monte Carlo Engine.md`.

Line 93:

> The engine uses **Mulberry32** for **deterministic PRNG**, allowing
> researchers to **reproduce "Black Swan" events by sharing the `rngSeed`**.

Line 12:

> - **SLA Fallback**: If scoring takes **>3s**, it falls back to a **uniform
> BFS** to ensure system responsiveness.

A seeded PRNG fixes the random draws. It does not fix which subgraph those
draws are applied to. Under load, or on a slower machine, or on a larger graph,
the 3-second timer fires and the engine samples an importance-weighted subgraph
in one run and a uniform-BFS subgraph in the next — from the same seed. The
document records no flag indicating which mode produced a given result, so a
researcher handed an `rngSeed` cannot tell whether they have reproduced the run
or silently substituted a different one.

This is the reproducibility claim in the document that supplies every
simulation number the ATQ paper quotes: ATQ line 283's "**68.4% of trials**",
which drives the ALE from $2.4M to $18.2M and the Gordon-Loeb allocation at
line 287.

Fix (not applied): record the mode in the result payload alongside the seed, or
make the fallback deterministic (a node-count threshold rather than a wall-clock
one).

---

### F-MO-03. Degree is stated to be a proxy for betweenness centrality. CONFIRMED.

Same file, line 11:

> - **Anchor Nodes**: The top-20 nodes by **degree (proxy for betweenness
> centrality)** are guaranteed to be included in the subgraph.

Degree and betweenness are different measures and are not interchangeable. The
canonical counterexample is exactly the topology this engine models: a single
firewall or data diode bridging two OT zones has degree 2 and maximal
betweenness, because every path between the zones runs through it. Under a
degree-ranked anchor rule, that node is not anchored. A busy switch inside one
zone, with high degree and low betweenness, is.

For an attack-path simulator on a segmented industrial network, the nodes that
matter most for path enumeration are precisely the low-degree, high-betweenness
bridges the rule discards. The document offers no justification and no
citation; it asserts the equivalence parenthetically.

Note the same file computes eigenvector centrality properly at line 28 (top-50
by `eigen_rank` from `seldon.spectral_analysis`), so the engine has real
centrality machinery available and does not use it for anchoring.

Fix (not applied): compute betweenness on the candidate subgraph, or drop the
parenthetical and describe the rule honestly as degree-based anchoring with its
known blind spot.

---

### F-MO-01. Seven named quantitative constructs, no definitions, no citations, no sample size. CONFIRMED.

`WG-08-MO-Monte Carlo Engine.md` is 93 lines and has no bibliography, no
citation of any kind, and no URL. §"Risk Metrics", lines 84-93, names seven
constructs and defines none:

> - **VaR/CVaR (95/99)**: Value at Risk and Conditional Value at Risk.
> - **Gaussian vs Pareto**: A ratio comparing standard predictions to fat-tail reality.
> - **Antifragility**: Scoring nodes based on how they respond to increased simulation temperature.
> - **Barbell Score**: Measures the efficiency of defense budget concentration.
>
> The engine uses **Mulberry32** for deterministic PRNG

Plus **eigenvector centrality** (line 28) and **importance score** (line 10),
the latter given as a formula with three magic constants —
`degree × (0.3 + EPSS) × (1 + SpectralBoost)` — and no derivation for the 0.3.

"Antifragility" and "Barbell" are Taleb's terms, used here as scored metrics.
Taleb is cited once in this corpus, as FRONT bibliography ref 14 — in a
different working group, in a bibliography nothing invokes (F-CAD-17). "Pareto"
is invoked as a fat-tail comparator with no tail index α, no threshold, and no
fitting method, so the "Gaussian vs Pareto" ratio has no definition at all.

**The most serious omission in this document is what is absent: N.** This is
the Monte Carlo engine paper. It reports VaR and CVaR at the 95th and 99th
percentiles. It never states the number of trials, never gives a standard error
or a confidence interval, and never mentions convergence. A CVaR-99 estimate is
an average over the worst 1% of draws; at N = 1,000 that is ten samples, and
from a fat-tailed distribution ten samples give an estimate with enormous
variance. Without N, no percentile claim in this document — or in the ATQ paper
that consumes it — can be assigned a precision.

The ATQ paper inherits the gap directly. Line 283: "Monte Carlo simulations
revealed that Volt Typhoon's effective threat temperature breached perimeter
defenses in **68.4% of trials**". No N, no interval. 0.684 is then used as the
vulnerability parameter *s* in Gordon-Loeb at line 287 and as the breach
probability at line 301, carried to three significant figures throughout.

Fix (not applied): state N, publish a confidence interval for every percentile,
define each of the seven constructs with its formula, and cite Taleb, Gordon-
Loeb, Artzner et al. (for coherent risk measures) and the Mulberry32 reference
implementation.

---

### F-TM-26. The probability 0.012 is used for two different quantities. PROBABLE.

`WG-07-TM-ATQ.md` line 236, in the Boltzmann propagation table, defines 0.012
as a **different actor's** per-edge transition probability:

> | Low-ATQ actor | 38.2 | Corporate DMZ to SCADA DMZ | 8.4 eV | 1.2 (baseline) | **0.012** | Defenses hold |

Line 301 then uses the same number as **the same actor's post-control** breach
probability:

> deploying deterministic SIL-3 physical trip controls ($C_{\text{controls}} =
> 240,000$), the insured **reduces breach probability from 0.684 to 0.012**.

0.684 is Volt Typhoon's transition probability from line 237. So the "after
controls" figure is not computed from the hardened topology; it is the number
that a *weaker adversary* scored against the *unhardened* one. Hardening a
facility against Volt Typhoon and downgrading the adversary to a low-ATQ actor
are different interventions, and the paper's own model would give them
different answers.

Graded PROBABLE because the paper does not explicitly say the two are the same
quantity — but there is no second derivation offered for 0.012, and the
coincidence to three decimal places across two tables is not plausible as
independent.

The ROSI that follows is arithmetically exact — ((18.2M − 410k) − 240k)/240k =
7,312.5% — so this defect is in the input, not the calculation.

Fix (not applied): re-run the walk against the hardened graph and publish the
resulting probability, or state that the hardened case is modelled by
substituting a weaker adversary and justify that.

---

### F-XD-03. One physical scenario, five destruction thresholds, four heating rates, three rack costs. CONFIRMED.

The same cyber-induced cooling-loss event is modelled in seven documents.
Nothing about it is stated consistently.

**Silicon destruction / trip threshold:**

| Value | Where |
|:---|:---|
| **85.0 °C** | CYH 133 (design intent Tj ≤ 85.0); NREG 96 (hardware trip setpoint 850 = 85.0 °C) |
| **90 °C** | NREG 233 (bi-metallic cutout "if Tj > 90 °C") |
| **94.0 °C** | SFAIRP 202; CRA 84, 199; UNI 365; CYH 140, 202; NREG 69, 172; ATQ 253, 283 |
| **105 to 115 °C** | FRONT 126 ("silicon destruction threshold (105 °C to 115 °C)") |
| **115 °C** | FRONT 383 ("critical destruction threshold (T_crit = 115 °C)") |

**Junction heating rate under lost cooling:**

| Value | Where | Consistent with its own P/C? |
|:---|:---|:---|
| **2.67 °C/s** | FRONT 381 (P=1200 W, C_th=450 J/°C) | **Yes** — 1200/450 = 2.667 ✓ |
| **4.2 °C/s** | SFAIRP 202; UNI 365; ATQ 253 | No — ATQ 251 gives C=142 J/K → 8.45 °C/s |
| **4.5 °C/s** | CRA 83; CYH 140; NREG 91 | No — CRA 197 gives C=142 J/K → 8.45 °C/s |
| **8.45 °C/s** | (implied by CRA 193/197 and ATQ 247/251) | — |

**Thermal capacitance:** 142 J/K (CRA 197, ATQ 251) vs 450 J/°C (FRONT 379).
A factor of 3.2 for the same copper cold plate assembly.

**Die heat flux:** >100 W/cm² (FRONT 119, CRA 84, UNI 364) vs 120 W/cm²
(SFAIRP 202) vs 140 W/cm² (ATQ 250).

**Time to destruction:** 14.8 s (five documents) vs "12 and 45 seconds"
(FRONT 130) vs 16.85 s (FRONT 385) vs 45 s (ATQ 253).

**Rack hardware replacement cost:**

| Value | Where |
|:---|:---|
| **$2,850,000 per rack** | FRONT 462 (64 accelerators at $35k plus chassis) |
| **$120,000 per rack** | ATQ 297 ("$14,400,000 per 120-rack compute hall") |
| **$120,000 per tray** | NREG 196 (= $960,000/rack at 8 trays) |

FRONT and ATQ differ by **23.75x** for the same asset.

**Business interruption rate:** $18,500/hour (UNI 375, NREG 196) vs
$24,000/hour (ATQ 298) vs $120,000/hour (FRONT 463).

Only FRONT's thermal block is internally self-consistent. Every other document
states a rate that its own capacitance and power contradict, and the 14.8-second
figure that five documents share is derived in none of them (F-TM-15, F-TM-16,
F-TM-21, F-CAD-28, F-CAD-29).

Fix (not applied): this needs one shared parameter sheet for the working group —
P_die, C_th, R_θjc, T_coolant, T_crit, flow, ΔT, rack cost, BI rate — with one
derivation of the trip time. Every paper then cites the sheet. Nine of the
findings in this report collapse into that one change.

---

### F-XD-04. Eight uncited insurance percentages, no two agreeing. CONFIRMED.

Every benefits column in every underwriting table carries a specific percentage
with no source. This is the F10 defect from `notes/2026-09-06/findings.md`,
reproduced across a second working group.

| Claim | Document | Line |
|:---|:---|---:|
| "PML reduced by **42%**" | CRA | 344 |
| "premium credits up to **28%**" | CRA | 347 |
| "premium rates decrease by **18% to 32%**" | UNI | 405 |
| "Probable Maximum Loss reduced by **35% to 50%**" | CYH | 320 |
| "premium credits up to **32%**" | CYH | 323 |
| "rate reductions of **22% to 35%**" | NREG | 252 |
| "**40%** capital surcharge ... **0%** accumulation surcharge" | SFAIRP | 255 |
| "**87% confidence**" / "**82% confidence**" forecasts | ATQ 372 / TAC 94 | — |

Four separate PML-or-premium reduction ranges for the same control set: 42%,
18-32%, 35-50%, 22-35%. None cites anything. `notes/2026-09-06/findings.md`
F10 records the only benchmark located anywhere in this project — Dragos and
Marsh McLennan 2025, 12 to 18 percent risk reduction per control — against
which all four ranges are two to four times high.

Nine further uncited quantitative claims of the same character:

- "In **over 95%** of deployed operational facilities, these industrial control protocols lack cryptographic authentication" — NREG 5
- "This process consumes an average of **60 to 180 days**" (PSIRT triage) — FRONT 288
- "**3.2M** Multigraph Network" — UNI 436
- "detects Phase 2 within **180 milliseconds**" — UNI 378
- "**$4.2M** direct damage and **$18,500/hour** SLA penalty" — UNI 375
- "**10,000 alerts per day**" and "**389 threat actor groups**" — TAC 7, 17
- "increases estimated fleet ALE by **$2.1M (+4.4%)**" and "ALE increment: **+$1.4M** annually" — TAC 78, 119
- "$P(x \ge 3) = 0.942$" and "$P(x < 20) = 0.850$" (the empirical incident distribution behind θ₉) — ATQ 97, 101
- Every ATQ saturation threshold θ_k — 14, 0.20, 120, 50, 15, 10, 20, 365, 0.01 — ATQ 71-81

And every physical constant in the thermal and hydraulic models: U = 4,200
W/m²K, A = 12.8 m² (UNI 289-290), C_th = 142 J/K (CRA 197), C_th = 450 J/°C
(FRONT 379), τ_th = 8.4 s and R_θjc = 0.035 K/W (CYH 207-209), c = 1,350 m/s in
PG25 (UNI 306), Pr = 18.5 at 35 °C (CRA 196), τ_VFD = 2.5 s (NREG 153).

Fix (not applied): label every one as modelled with its assumption stated, or
cite it. Where a benchmark exists, use the benchmark's number even though it is
smaller.

---

### F-CAD-31. Things that check out exactly, and are worth recording as clean.

Not defects. Recorded so a later pass does not re-derive them.

**The CVSS v3.1 base score in the VEX example is exactly right.** CRA lines
292-298 give score 8.8, severity "high", method CVSSv31, vector
`CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H`:

```
$ python3 -c "
import math
ISS = 1-(1-0.56)**3
imp = 6.42*ISS
exp_ = 8.22*0.85*0.77*0.62*0.85
print('ISS', round(ISS,6), 'Impact', round(imp,4), 'Exploitability', round(exp_,4))
print('Base =', math.ceil(min(imp+exp_,10)*10)/10)
"
ISS 0.914816 Impact 5.8731 Exploitability 2.8353
Base = 8.8
```

8.8 is correct for that vector, and 8.8 falls in the High band (7.0-8.9). The
document also labels it correctly as a base score sourced to NVD, not as an
observed exploitation severity — which is exactly the distinction the brief
warned about, and this document does not fall into it. The CVE identifier
(CVE-2026-44012) is fictional but the surrounding text says "illustrates", so
it is labelled.

**Other exact checks:**

```
$ python3 -c "
import math
print('Joukowsky (UNI 306): 1032*1350*1.8 =', 1032*1350*1.8, 'Pa =', round(1032*1350*1.8/1e5,2), 'bar  [doc: 2.5 MPa / 25 bar]')
Q=38.5/60000
print('Reynolds (UNI 278):', round(4*1032*Q/(math.pi*0.050*2.45e-3),0), ' [doc: ~6,850]')
print('CRA fine (CRA 152): max(15e6, 0.025*24e9) =', max(15e6,0.025*24e9))
print('SFAIRP DF (L193): 450000/14380000 =', round(450000/14380000*100,3), '%  [doc: less than 3.2%]')
print('Frontier (L385): (115-70)/(1200/450) =', round(45/(1200/450),3), 's  [doc: 16.85 s]')
print('Node-Reg (L181): 12e-6*2500/4e-3 =', 12e-6*2500/4e-3, 'V  [doc: 7.5 V]')
print('Node-Reg (L143): 1.25/0.85 - 1 =', round((1.25/0.85-1)*100,1), '%  [doc: +47%]')
print('ATQ terminal (L349-360) component sum:', sum([14.7,12.0,12.4,7.3,6.8,8.0,4.2,3.4,4.2,4.8,0.4,0.3]), ' [displayed ATQ 78.6]')
"
Joukowsky (UNI 306): 1032*1350*1.8 = 2507760.0 Pa = 25.08 bar  [doc: 2.5 MPa / 25 bar]
Reynolds (UNI 278): 6883.0  [doc: ~6,850]
CRA fine (CRA 152): max(15e6, 0.025*24e9) = 600000000.0
SFAIRP DF (L193): 450000/14380000 = 3.129 %  [doc: less than 3.2%]
Frontier (L385): (115-70)/(1200/450) = 16.875 s  [doc: 16.85 s]
Node-Reg (L181): 12e-6*2500/4e-3 = 7.5 V  [doc: 7.5 V]
Node-Reg (L143): 1.25/0.85 - 1 = 47.1 %  [doc: +47%]
ATQ terminal (L349-360) component sum: 78.5  [displayed ATQ 78.6]
```

All within rounding. The ATQ terminal's twelve components sum to 78.5 against a
displayed 78.6, a 0.1 discrepancy fully explained by per-component rounding to
one decimal — **not** a finding.

Also clean and worth stating: **TACAM's 77,279 is exact** (F-TM-24); the
**Stuxnet frequencies** at CYH 272 (1,410 Hz / 1,064 Hz / 2 Hz) match the
Symantec dossier figures; **Modbus Security on TCP port 802** at NREG 227 is
correct; the **IEC 62443-4-2 CR numbers** in SFAIRP are correctly typed as CRs
of -4-2; the **CycloneDX version is stated** ("1.6" or "1.6+") in every one of
its 25 mentions; and **ML-DSA-87 at NIST quantum security level 5** (UNI 229)
is right.

---

## Documents that are clean

Two of the eleven, named individually.

**`references/WG-05-CAD-DEXPI-2/WG-05-CAD-DEXPI-Introduction.md`** (24 lines).
Carries one defect and it is not its own: it defines CBOM as "Component BOM"
(line 19), which contradicts the cryptographic sense used in six other
documents (F-TM-06). Beyond that it makes no numerical claim, cites no clause,
and states the CycloneDX version. It is a scope note, not a paper, and it does
not overreach. The one thing it should carry and does not is a statement that
"4-BOM" is Eigenia's composition rather than a CycloneDX construct.

**`references/WG-05-CAD-DEXPI-2/WG-05-CAD-DEXPI-Open-Standard-Position-Paper.md`**
(166 lines). The cleanest full paper in the scope. Its Purdue usage at line 131
is correct where three other documents get it wrong (F-CAD-11). Its ISO 15926
and ISO 10628-2 attributions are plausible and appropriately scoped. Its two
equations — the Darcy-Weisbach form at line 83 and the property vector at line
79 — are correct as stated and are not used to generate an unsupported number.
It makes no ROSI claim, no ALE claim and no percentage claim.

Its one real defect is the Lloyd's Y5381 reference at line 153 (F-CAD-02), and
that arrives inside a pull quote attributed to an unnamed "Chief Financial /
Actuarial Risk Officer". Which raises the one thing I would flag about this
document that is not in the finding list: all three of its pull quotes (lines
19, 133, 153) are attributed to anonymous role descriptions rather than named
people — "Mechanical Engineer / Piping Specialist (Industrial Process Systems
Review)". They read as sourced testimony and are not attributable to anyone. I
have not graded that as a finding because it is an editorial convention
question rather than a factual defect, but it is the mechanism by which the only
unsupported claim in an otherwise sound paper got in.

**Partially clean, worth recording:**
`WG-05-CAD-Frontier-AI-Hardware-Security.md` §8.1 (lines 349-387) is the only
thermal derivation in the corpus that is internally consistent: P_diss = 1,200 W,
C_th = 450 J/°C, dT/dt = 2.67 °C/s, T_0 = 70 °C, T_crit = 115 °C, Δt = 16.85 s.
Every step follows. It should be the template the other six documents adopt
(F-XD-03).

---

## What I could not check, and why

**1. Every standard clause, as a clause.** I have no web access and no copy of
IEC 62443, IEC 61508, IEC 61511, IEC 61882, ISO 15926, EN 50126, EN 50129,
CLC/TS 50701, ISA TR 84.00.09, or Regulation (EU) 2024/2847. The standard-clause
table above is built so a later pass can settle each row against the actual
text. Nothing in this report claims CONFIRMED for "this clause does not exist".

Specifically unresolved and needing the source document:
- Whether IEC 62443-3-3 has a 2018 edition (F-CAD-07)
- Whether CRA Annex IV covers "critical" rather than "important Class II" products (F-CAD-03)
- The CRA's real publication and application dates (F-CAD-04)
- Whether ISO/IEC 5962 is SPDX (F-CAD-01)
- Whether IEEE 1680 is EPEAT environmental assessment (F-CAD-09)
- Whether SRACs are defined in EN 50129 rather than EN 50126 (F-CAD-10)
- Whether NIST SP 800-30 Rev. 1 defines SLE = AV × EF (F-CAD-08)
- Whether ISA TR 84.00.09 contains anything resembling the SL-T formula (F-CAD-19)
- The correct names for MITRE ATT&CK for ICS T0837 and T0869 (F-TM-03)
- Whether CVE-2022-0715 is the unsigned-firmware TLStorm CVE (F-TM-05)
- Whether Unitronics Vision PLCs listen on TCP 20256 (F-TM-04)
- The MITRE ATT&CK Enterprise tactic count and the CISA sector count (F-TM-01, F-TM-02 — both CONFIRMED as internal contradictions, but which value is right is unverified)

**2. Lloyd's and LMA clause numbering.** Y5381's real title, issuer and date
(F-CAD-02), and whether LMA5529 through LMA5533 exist as a range (ATQ line
292). Needs the Lloyd's market bulletin register and the LMA clause register.
The internal contradiction in F-CAD-02 is CONFIRMED without them; the correct
identity is not.

**3. Two bibliography entries that may be fabricated.** FRONT refs 12 (Ashok
et al., IEEE Trans. Industrial Informatics 19(4):4120-4131, 2023) and 15 (Sethi
et al., IEEE S&P pp. 1024-1039, 2024). Both have the precise-volume-and-pages
shape of invented citations, and neither topic is one I recognise from the
literature. Needs IEEE Xplore or a DOI. Marked UNVERIFIABLE, not asserted.

**4. Whether the ATQ's empirical distributions exist.** ATQ §3 rests on
P(x ≥ 3) = 0.942 and an 85th percentile at θ₉ = 20 over "the empirical incident
distribution". The distribution is in a database
(`seldon.incident_corpus`) I cannot query. I checked the arithmetic that
follows from those numbers and it is internally consistent; I could not check
the numbers.

**5. Whether the SQL matches the published scores.** `seldon.seldon_score_v2`
is reproduced in full at ATQ lines 124-205 and I read it line by line — the
weights in the SQL match the weights in the §2.1 table exactly, which is how
F-TM-10 was confirmed. But I cannot run it, so I cannot check whether the
published ATQ values (78.6, 76.2, 76.0, 73.6, 73.4, 68.0) are what it emits.

**6. Physical constants I took at face value.** The speed of sound in PG25
(1,350 m/s, UNI 306), the Prandtl number of PG25 at 35 °C (18.5, CRA 196), and
the specific heat I used in my own recomputations (3,700 J/kg·K for PG25, taken
from standard tables rather than from the corpus, which never states it). My
flow-versus-duty and asymptote calculations (F-CAD-24, F-TM-21) depend on that
c_p. If the intended fluid is water rather than PG25 the numbers shift by about
13%, which is not enough to change any conclusion — the F-CAD-24 shortfall is
2x and the F-TM-21 shortfall is 60 K — but it should be stated.

**7. Whether ζ, μ_s, θ, N and the neighbour set exist somewhere.** Five
findings (F-CAD-30, F-TM-12, F-CAD-26, F-MO-01, F-MO-04) turn on parameters the
documents use and never publish. They may be in the codebase. I checked only
`references/`, as scoped.

**8. The ATQ HTML terminal.** `atq-card-terminal.html` is 915 lines and is not
one of the 11 registered documents. I confirmed its BibTeX block and its link
target and read no further. It is published — it is served from
`web/public/terminals/atq-card-terminal.html` — and it renders the same
twelve-weight model that F-TM-10 shows sums to 105. It should be checked in a
later pass, because a published interactive calculator carrying the same
normalisation error is a worse defect than the paper.

**9. WG-08 rendering.** `WG-08-MO-Monte Carlo Engine.md` has three code blocks
(lines 14-20, 36-50, 68-82) introduced by a bare word `typescript` on its own
line, with no opening fence. Lines 40-48 are individually backtick-wrapped
instead. Whether this renders as intended on the site depends on the content
pipeline in `web/src/lib/generatedReferencesContent.json`, which I did not
trace. Noting it as a possible publication defect rather than a finding.
