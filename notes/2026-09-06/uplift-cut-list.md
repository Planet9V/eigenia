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

Net so far: **+2,576 words**. Nothing has been shortened. Every task has been
gated on the word count not falling.

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

To be appended when the task reports.

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
