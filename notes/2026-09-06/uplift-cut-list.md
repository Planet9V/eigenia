# Cascading Failure uplift: cut list

Date opened: 2026-09-06
Status: open, appended to as tasks complete
Purpose: the third term of the word-budget reconciliation required by the spec

    words(Document A) + words(Document B) + words(deliberately cut) = baseline

The spec is explicit that this third term must be an itemised list, not a
remainder. "The numbers roughly add up" is how content disappears. Anything
that cannot be placed in one of those three buckets has been LOST and must be
recovered before the work is accepted.

Baseline at Task 1: **29,995 words**, 351 placeholder occurrences, 41 ACME
mentions.

## Running word count

| After task | Words | Delta | Note |
|:---|---:|---:|:---|
| Baseline (4af270a) | 29,995 | | |
| T4 RefDNSP-1.2M | 30,120 | +125 | new section 2 spec table |
| Media-statement URL fix | 30,120 | 0 | one-line repair |
| Figure corrections | 30,383 | +263 | SA, UFLS, UK 2019 restated |
| RoCoF mechanism rebuild | 30,941 | +558 | new derivations in 2.2 and Appendix A |
| Appendix A formula, UFLS wrap | 30,945 | +4 | |
| Semicolon repair | 30,946 | +1 | 43 artifacts, no net loss |
| T5 section 5 economics | 32,571 | +1,625 | derivations, caveats, cut-list table |
| T6 section 9 recommendations | 38,088 | +5,517 | cost basis, bands, ROI rebuild, removal notes |

Net so far: **+8,093 words**, from a 29,995 baseline. Nothing has been
shortened. Every task has been gated on the word count not falling.

## Cuts made, with reasons

### Task 5, section 5 Economic Impact

All eight recorded IN THE PAPER as a new table, section 5.10 "Categories Not
Quantified", so a reader sees what was removed and why rather than finding a
silently shorter section.

| # | Cut | Reason |
|:--|:---|:---|
| 1 | Direct Grid Damage row, plus the 6-row equipment table (66 kV transformers, 11 kV switchgear, BESS modules, BESS inverters, emergency restoration labour, expediting) | no sourced unit cost and no sourced failure probability |
| 2 | "3 to 5 times normal cost" air-freight claim | unsourced multiplier |
| 3 | Regulatory penalties and litigation as a forecast | no SOCI Act penalty schedule, no Australian DNSP precedent. Replaced by the sourced Ofgem outcome for UK 2019 |
| 4 | Civil litigation quantum (5 to 15 wrongful death, 50 to 120 personal injury, class action) | no sourced quantum |
| 5 | Reputational damage, 24 month | no sourced valuation method |
| 6 | Insurance claims and premiums | no sourced premium elasticity |
| 7 | Opportunity costs | no basis, and it double-counted the direct customer cost |
| 8 | Per-customer and per-business detail tiers (food spoilage, hotel costs, 8,500 retail, 1,200 manufacturing, 12,000 professional services, 45 food, 12 pharma, 8 mining) | unsourced. Replaced by the VCR relation over the whole customer base, with the segment bias direction stated |
| 9 | The 5.5 NPV block (`x 20% x 0.85 discount factor`) | the discount factor had no stated basis and the arithmetic conflated probability with discounting |

### Task 6, section 9 Strategic Recommendations

Six rows cut. Each carries an in-text paragraph naming what was removed and
why, so a reader meets the absence and its reason together.

| # | Cut | Reason |
|:--|:---|:---|
| 1 | `0.375% of regulated asset base` | no RAB stipulated for RefDNSP-1.2M and none sourced for any Australian DNSP. Replaced with the nearest non-substitute, clearly labelled: Ausgrid's draft-decision revenue allowance of AUD 9,619.6M over five years, which is a revenue allowance for a different, real business |
| 2 | `0.6% of total BESS program cost` | the denominator does not exist. No BESS capital programme cost is stipulated or sourced |
| 3 | Per-site FrostyGoop loss avoided | no per-site financial loss sourced for the January 2024 Lviv incident; section 5.10 already excludes per-facility industrial loss |
| 4 | SOCI penalty maximum, and the 3.7:1 penalty-avoidance ratio | no penalty schedule and no Australian DNSP precedent sourced |
| 5 | APRA capital charge line | no instrument identified, and APRA's remit does not obviously reach a DNSP |
| 6 | Insurance ROI block, 47.3:1 | two of three benefit terms unsourced; the third double-counted section 9.5's avoided loss |

### Task 6, uncited percentages removed rather than replaced

These were not cost cuts but claim cuts. Recorded here because each removed a
number a reader could have relied on.

| Removed | Reason |
|:---|:---|
| `95% / 99% / 99%` cumulative control effectiveness | risk reductions are not additive; the paper modelled no combined effect |
| `73%` cumulative for quick wins | same |
| `90%` plus a `115:1` critical-path ratio | two of four cost lines unbounded, so no ratio is computable |
| `15 to 25%` insurance premium reduction | no Australian OT cyber premium data of any kind exists in the evidence base |
| `90%`, `47.3:1`, `5%` loss ratio, `8%` capital charge, `6%` cost of capital, `8.5` discount factor | the whole insurance economics block rested on six unsourced parameters |
| `85%` inside the proposed BOARD RESOLUTION | a director would have relied on it. Replaced with the control mechanism and the statement that no measured figure exists, the nearest benchmark being 12 percent |

### Rows converted to relative bands rather than cut

21 controls had no public cost anchor and became bands against the sourced
AUD 1.29M one-off / AUD 0.60M per year CIRMP cyber envelope (A under 10%,
B 10 to 40%, C 40 to 100%, D over 100%, R recurring):

DERMS hardening, Modbus gateway at 5 and at 54 sites, BMS firmware, fire
suppression, OT protocol DPI, protection anomaly detection, IEC 62351-6 GOOSE,
container runtime security, 24/7 OT SOC, OT incident response retainer, ICS
firewalls, ICCP parser, UEBA and NDR platform, supply chain risk management,
zero-trust microsegmentation, Phase 3 ongoing lines, BESS pre-commissioning
validation, four audit workstreams, asset discovery tooling, and five NERC-CIP
lines.

The band boundaries are engineering judgement, stated as such in the paper.

## Corrections that removed a false claim without removing content

Recorded here because a reviewer comparing versions will see the text change
and should find the reason.

| Claim removed | Replaced with | Authority |
|:---|:---|:---|
| 445 MW SA generation loss | 456 MW over less than seven seconds | AEMO final report, March 2017 |
| "23 transmission towers" | AEMO's actual trigger chain; no tower count exists in the final report | AEMO final report sections 2.4, 3.1.4, Table 6, Appendix V |
| 49.85 Hz as a relay trip point | RoCoF tripping on rate of change; 49.85 Hz restated as the normal band floor | AEMC Frequency Operating Standard |
| 0.135 Hz/s "measured" UK RoCoF | 0.125 Hz/s relay disconnection threshold | National Grid ESO Technical Report, 9 August 2019 |
| 660 MW gas, 740 MW wind, 345 MW DER, ~30% wind penetration | 641 MW in three trips, 737 MW, approximately 350 MW, claim dropped | same |
| Critical imbalance 60,000 "MW-seconds", attack 2.7% | 1,200 MW, attack 45% | swing equation, term restored |
| 43.9:1 strategic value on 90% risk reduction | rebuilt on SOCI-derived cost and Dragos risk reduction | pending Task 6 report |

Note that several of these corrections made the paper's case STRONGER, not
weaker: 45% of critical imbalance rather than 2.7%, and a UK 2019 cascade
restated on figures that actually support the protection-maloperation argument.

### Post-T7: the Appendix E multiplicative likelihood model

Cut on Jim's instruction, 2026-09-06, after the T7 agent flagged it.

**What was removed.** A model compounding four uncited threat factors
(1.5 x 2.0 x 1.3 x 1.5) onto an uncited 5 percent base rate, producing
0.29 per year, a 96 percent ten-year attack-attempt probability, and a
48 percent overall ten-year risk after an uncited 50 percent success
probability. Plus the four risk-driver weights (40/30/20/10 percent) and the
reconciliation paragraph that existed only to disclaim the model.

**Why.** Five uncited inputs producing a figure that contradicted the one the
body of the paper actually uses. Section 5.9 and section 9.5 both use 15 to 30
percent over ten years, midpoint 22.5. A decomposition that looks like a
derivation is more misleading than no derivation, because the arithmetic checks
out and the reader has no way to see that the inputs were chosen.

This is the same defect class as F10, and as the corpus-wide finding that
quantitative results are labelled "verified" where the arithmetic is exact and
the inputs are author-chosen.

**What replaced it.** A statement of what was removed and why, the paper's
actual stated likelihood with a pointer to the two sections that derive from it,
and the four factors retained as an ORDERED list with no weights, because no
weight is measured. Quantifying their contribution needs incident data the
working group does not hold, and Appendix M records that as an open limitation.

**Word budget.** 276 words removed, 263 added, net **-13**. The only net
reduction in the entire uplift, and it is itemised here.

### T11: promote the limitations into the body, fix the duplicate section numbers

Date: 2026-09-07. File: `WG-04-CF-Cascading Failure Hypothesis.md`.

**Word budget.** 38,680 before, 38,870 after, net **+190**. Nothing was
shortened. The reconciliation is exact and every term is listed below.

| Term | Words |
|:---|---:|
| Lead-in sentence added to the promoted section | +34 |
| South Australia 6.1 Hz/s correction paragraph (F3) | +160 |
| Table of contents entry `10. Limitations and Threats to Validity` | +6 |
| One `---` rule added between the new section 10 and the conclusion | +1 |
| Heading `### Appendix J: Methodological Transparency and Uncertainty Quantification` becomes `## 10. Limitations and Threats to Validity` | -1 |
| REMOVED: `1. Executive Summary` from the table of contents | -3 |
| REMOVED: `---` rule that separated 1.3 from the reference network block | -1 |
| REMOVED: `(6.1 Hz/s RoCoF)` from the international precedent line | -3 |
| `Section 12, Appendix J, records` becomes `Section 10 records` | -2 |
| `and Appendix J of this document` becomes `and 10 of this document` | -1 |
| **Net** | **+190** |

**Three removals, itemised.**

1. `1. Executive Summary` from the table of contents. The body has no section
   called Executive Summary. The contents list was numbered one ahead of the
   body all the way down: it called Background and Context item 2 when the body
   heads it `## 1.` The list now matches the body heading for heading. No prose
   was removed; a phantom entry was.
2. One `---` horizontal rule between section 1.3 and the reference network
   specification. The rule marked a top-level section boundary. The reference
   network is now `### 1.4`, the closing subsection of section 1, so the rule
   marked a boundary that no longer exists.
3. `(6.1 Hz/s RoCoF)` from item 2 of the promoted section, replaced by a
   160-word paragraph stating what the figure is and is not. See below.

**The 6.1 Hz/s correction (finding F3).** The precedent was not deleted; the
claim about it was corrected. Item 2 previously read
`South Australia 2016 (6.1 Hz/s RoCoF)` inside a list of precedents, in an
appendix that carries a heading reading "Research Gaps Requiring Empirical
Validation". The figure is not in AEMO's March 2017 final report. A researcher
opened the report and could not locate it, and it circulates only in secondary
commentary. The replacement states it as unconfirmed, states that no argument in
the paper should rest on it, and re-founds the South Australian precedent on the
two figures AEMO's final report does carry: 456 MW lost over a period of less
than seven seconds, against 1,826 MW of regional demand. The protection
behaviour the precedent exists to illustrate, eight of nine wind farms
disconnecting on a voltage-dip-count setting rather than on the fault, survives
intact and is now the stated basis.

Note that 6.1 Hz/s still appears elsewhere in the paper, including section 2.3,
where it is bolded as a peak measurement. Correcting those occurrences was
outside this task's scope and is recorded here as open.

**Structural changes, no content moved or lost.**

- Appendix J moved whole into the body as `## 10. Limitations and Threats to
  Validity`, immediately before the conclusion. Every word of the appendix
  travelled with it. One phrase inside it, "an earlier draft of this appendix",
  became "an earlier draft of this section", because it is no longer an
  appendix.
- The duplicate `## 2.` was resolved by making the reference network
  specification `### 1.4` under Background and Context, not by pushing every
  later section up one. That keeps the top-level sequence at 1 to 13 as
  specified, and it leaves sections 2 through 9 numbered exactly as they were,
  so the roughly 140 in-body `section N.M` references and the seven references
  in the Grid Incident Response Playbook all still resolve.
- The duplicate `### 2.3` was resolved by renumbering BESS Thermal Runaway
  Cascading Scenarios to 2.4, with 2.3.1 to 2.3.3 becoming 2.4.1 to 2.4.3.
- Appendices re-lettered to close the gap the promotion opened: References and
  Bibliography K to J, Glossary L to K. Neither is cross-referenced from the
  body.

**Open, not fixed here.** Line 13 of the Grid Incident Response Playbook says
the reference network is "specified in section 2 of the paper". It is now
section 1.4. That file was not modifiable under this task's file lock.
