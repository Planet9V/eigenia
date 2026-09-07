# External research: remediation cost benchmarks for OT and ICS security controls

External research; found via valyu, not the working group's own analysis.

Supports the rebuild of Section 9, Strategic Recommendations, in
`references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md`,
which carries 108 `[investment required]` placeholders where the price of its
recommended controls should be. This file supplies defensible cost anchors
for OT and ICS security controls in an Australian electricity distribution
network. Read the warnings below and the "Gaps" section at the end before
drafting any dollar figure into the paper.

> **WARNING 1: the only Australian regulator-quality per-entity cost figure
> found here is a Risk Management Program cost, not a pure cyber security
> cost.** Source 1's $9.2 million one-off / $4.3 million per year figure for
> "critical electricity assets" is the average cost of the whole Security of
> Critical Infrastructure Act Risk Management Program (CIRMP), covering
> cyber and information security hazard, personnel hazard, supply chain
> hazard, physical and natural hazard, and material risk together. Table 27
> of the same source puts cyber and information security hazard at only 14
> per cent of the electricity sector's ten-year regulatory burden estimate.
> Do not present $9.2 million as the cost of cyber security alone; either
> scale it by the 14 per cent share and say so, or present the full RMP
> figure under its correct, broader label.

> **WARNING 2: no AER-approved dollar figure for cyber security capex within
> a specific distribution network determination was retrieved.** Section 9's
> top-priority ask, per the task brief, was a regulator-approved cyber
> security programme figure for a named Australian DNSP. Search and two
> WebFetch attempts (one on a corrupted PDF text stream, one on a timed-out
> AER page) did not surface the specific dollar split. What was confirmed:
> the AER's 2024-29 final revenue determinations for six electricity network
> businesses (Ausgrid, Endeavour Energy, Essential Energy, Evoenergy, Power
> and Water Corporation, TasNetworks) explicitly name "cyber security and
> digitalisation measures" as a considered expenditure category, and
> Ausgrid's own published account of its approved 2024-29 plan states it
> "reduced our cyber security program through efficiency savings." Neither
> source gives the dollar amount of that program before or after the
> reduction. A later drafter needs to open the AER's Ausgrid (or other DNSP)
> final decision attachment PDFs directly, at the capex/opex line-item level,
> to get this number. See Gap 1.

> **WARNING 3: risk-reduction percentages in this file are a vendor and
> insurance-industry statistical estimate, not a dollar cost, and they do
> not match the scale of the percentages already in the paper's draft.**
> Source 4 (Dragos and Marsh McLennan, 2025) measures average risk reduction
> per control class at 12 to 18 per cent, built from a decade of insurance
> claims data. The paper's current draft assigns individual controls risk
> reductions of 60, 70, 85, 90, 95 and 98 per cent, unsourced. This file
> does not confirm or replace those figures, and it cannot be used to source
> a dollar cost, but a drafter revising Section 9's risk-reduction claims
> alongside its costs should know the two scales disagree by roughly a
> factor of five.

## Source 1: Australian Government, Impact Analysis of amendments to the SOCI Act 2018

- Title: Amendments to the Security of Critical Infrastructure Act 2018
  (Cth): Impact Analysis
- URL: https://oia.pmc.gov.au/sites/default/files/posts/2024/10/Impact%20Analysis_1.pdf
- Retrieved: 2026-09-06 (79-page PDF, extracted with pdftotext after
  WebFetch's own text conversion returned only binary structure)
- Query run: "Security of Critical Infrastructure Act regulation impact
  statement compliance cost"
- Supports: a government-estimate per-entity cost anchor for the paper's
  SOCI Act compliance recommendations (Section 9's Risk Management Program
  and audit line items), and honest scope limits on what that cost covers.
- Summary: this is the Department of Home Affairs' October 2024 Impact
  Analysis for reforms to the SOCI Act, published by the Office of Impact
  Analysis. Its cost estimates for the Critical Infrastructure Risk
  Management Program (CIRMP) obligations were built from a 2021-22 industry
  consultation and 2022 Regulation Impact Statement (RIS), then indexed to
  June 2024 dollars using ABS CPI. Two vintages of the same underlying data
  appear in the document:
  - Table 44 (2022 RIS, unindexed, 2022 base-year dollars): critical
    electricity assets, average one-off cost per entity $8.1 million,
    average annual ongoing cost per entity $3.8 million.
  - Table 19 (the same 2021-22 consultation data, indexed to June 2024):
    critical electricity assets, average one-off cost per entity $9.2
    million, average annual ongoing cost per entity $4.3 million.
  Both rows are per critical infrastructure entity (a regulated asset owner,
  not per site or per substation), for the full CIRMP obligation, one-off
  meaning the cost to stand up the systems, processes and controls needed
  for compliance, and ongoing meaning the annual cost to maintain it.
  Comparable rows for other asset classes, June-2024-indexed: critical gas
  assets $12.0m / $2.4m per year, critical water assets $16.4m / $7.0m per
  year, critical energy market operator assets $25.2m / $7.6m per year,
  critical hospitals $14.8m / $11.5m per year. Total average cost per entity
  across all 13 costed asset classes: $9.0 million one-off, $4.1 million per
  year.
- Scope of "critical electricity assets" and what the RMP actually covers:
  Table 27 breaks the electricity sector's ten-year regulatory burden
  estimate down by CIRMP rule and obligation: cyber and information
  security hazard 14 per cent, personnel hazard 9 per cent, supply chain
  hazard 25 per cent, physical and natural hazard 25 per cent, material
  risk 15 per cent, general rules 2 per cent, RMP obligations in the Act 10
  per cent. So the $9.2m/$4.3m figure is a whole-of-hazard RMP cost, not a
  cyber-only cost. See WARNING 1.
- Aggregate, industry-wide figures (Table 20 and Table 25, both June-2024
  indexed, both describing the same underlying 2021-22 data): one-off
  aggregated cost of $1,823.92 million and ongoing aggregated cost of
  $1,226.16 million per year, across all critical infrastructure assets
  nationally (all 13 costed sectors, not electricity alone). Industry did
  not dispute these figures when given the opportunity to during
  consultation.
- Measure 3 (directions power to remedy a deficient RMP) cost, all sectors
  blended: "the average cost for an entity to implement an RMP is $8.8m for
  one-off implementation costs, with $4m in on-going costs." The Department
  itself flags this $8.8m figure as skewed by one outlier submission
  claiming up to $20 million, and states its own view: "the Department
  suggests that $2 million may be a more reasonable estimate," specifically
  for the incremental cost of remedying a deficiency (not standing up a
  program from zero). Use $2 million as the Department's own lower and more
  defensible figure for a remediation-only scenario; use $8.8m/$4.0m only
  if describing full first-time RMP implementation across all sectors, not
  electricity alone (use the $9.2m/$4.3m electricity-specific row instead
  for that case).
- Real-world spend examples cited in the document as case studies, both
  telecommunications and insurance sector, not electricity, but useful as
  a sanity check against the modelled RMP figures: Optus stated it "spent
  more than $26 million in strengthening its cyber defences between October
  2022 and December 2022" following its 2022 data breach, and separately
  "Optus has indicated the company will incur costs of up to AU$142 million
  as a result of the data breach." Medibank "spent more than $26 million in
  strengthening its cyber defences" over the same kind of post-breach
  window. Both are single-company, post-incident remediation spends, not
  planned baseline programs, and neither is an electricity sector entity.
- Provenance: government estimate (Australian Government Impact Analysis,
  Office of Impact Analysis process). Vintage: underlying data from 2021-22
  industry consultation and the 2022 RIS; two dollar vintages given, 2022
  base year and June 2024 indexed (ABS CPI). Currency: AUD. Scope: per
  critical infrastructure entity (an owner/operator organisation), covering
  the full multi-hazard CIRMP obligation under the SOCI Act, not cyber
  security alone.

## Source 2: AER 2024-29 final revenue determinations, six network businesses

- Title: Regulator delivers final revenue decisions for networks (ESD News,
  reporting the AER's April 2024 final decisions); corroborated by Ausgrid's
  own "2024-29 Regulatory Reset" page
- URL: https://esdnews.com.au/regulator-delivers-final-revenue-decisions-for-networks/
  and https://www.ausgrid.com.au/about-us/regulation-and-compliance/regulatory-reset
- Retrieved: 2026-09-06
- Query run: "AER revenue determination cyber security capital expenditure
  electricity distribution" and "AER Ausgrid final decision overview
  2024-29 cyber security digitalisation expenditure step change"
- Supports: confirmation that the AER treats cyber security as a named,
  regulator-considered expenditure category in electricity distribution
  revenue determinations, which is the structural fact the paper needs to
  assert that AER-approved cyber spend is a real category. Does not supply
  the dollar figure itself. See WARNING 2 and Gap 1.
- Summary: on 30 April 2024 the AER published final revenue decisions for
  six electricity network businesses for the 2024-29 regulatory period:
  Ausgrid, Endeavour Energy, Essential Energy, Evoenergy, Power and Water
  Corporation, and TasNetworks. The AER's own framing: "Electricity
  transmission and distribution network businesses are required to submit
  revenue proposals to the AER every five years outlining how much they
  intend to recover from consumers over a five-year period to provide safe,
  reliable and secure electricity services and address important emerging
  issues such as network cybersecurity, climate resilience, integration of
  consumer energy resources, and digitalisation." AER chair Clare Savage is
  quoted confirming the businesses "proposed expenditure in important
  emerging areas such as improved network resilience... and cyber security
  and digitalisation measures," and that the AER "believe[s] there are
  efficient levels of funding in our decisions to allow the businesses to
  meet these challenges." Total approved revenue for the period (not cyber
  security specific, the whole regulated revenue allowance): Ausgrid's
  draft decision alone was $9,619.6 million over the five years (final
  decision revenue figures were not independently confirmed in this file;
  only the draft figures were retrieved with confidence).
- The one specific, electricity-DNSP-level, cyber-security-labelled fact
  found: Ausgrid's own account of its AER-approved 2024-29 plan states
  "while committed to achieving the highest level of protection, we
  reduced our cyber security program through efficiency savings." This
  confirms cyber security spend is a distinct, AER-reviewed, and
  AER-approved line item for at least one Australian DNSP, and that it can
  move down as well as up in a determination. No dollar figure accompanies
  this statement in the source retrieved.
- Provenance: the underlying fact (cyber security as a named AER expenditure
  category) is regulator-approved, since it comes from the AER's own final
  decision process and public statements. The reporting vehicle for the
  first part (ESD News) is trade journalism, not the AER's own document.
  Vintage: April 2024 (final decisions), covering the 1 July 2024 to 30
  June 2029 regulatory period. Currency: AUD, nominal terms as published.
  Scope: whole-of-business, not per-site or per-control; no dollar split is
  available for the cyber security or digitalisation component specifically.

## Source 3: AESCSF regulatory status under the enhanced CIRMP Rules

- Title: What Is the AESCSF? A Guide for Australian Energy Organisations
  (2026), corroborated by AEMO's own AESCSF programme pages and the DCCEEW
  AESCSF page
- URL: https://www.cyberpulse.com.au/2026/08/18/aescsf-framework-guide-australia/,
  https://www.aemo.com.au/initiatives/major-programs/cyber-security, and
  https://www.dcceew.gov.au/energy/security/australian-energy-sector-cyber-security-framework
- Retrieved: 2026-09-06
- Query run: "Australian Energy Sector Cyber Security Framework AESCSF
  uplift cost" and "AEMO AESCSF assessment program annual cost participant
  energy sector"
- Supports: the regulatory status and structure of the AESCSF, which the
  paper's Section 9 compliance-mapping tables (Table on Principle 2.1
  through 4.1, and the RMP/CIRMP compliance table) reference. Does not
  supply an uplift cost. See Gap 2.
- Summary: the AESCSF is AEMO's cyber security maturity framework for the
  electricity, gas and liquid fuels sub-sectors, developed with the
  Australian Cyber Security Centre and the Cyber and Infrastructure
  Security Centre, first released in 2018 and rebuilt as Version 2 in
  October 2023 (11 domains, 354 practices and anti-patterns, up from 282).
  It measures maturity on a 0 to 3 Maturity Indicator Level (MIL) scale per
  domain and sets target states through Security Profiles (SP-1 to SP-3)
  matched to an entity's criticality. Since June 2026, the enhanced CIRMP
  Rules under the SOCI Act name "the 2023 AESCSF Framework Core, met at
  Security Profile 2," as an accepted compliance pathway for critical
  electricity, gas, liquid fuel and energy market operator assets, with a
  transition grace period ending June 2028. Alternative accepted pathways
  under the same rules: the ACSC Essential Eight at Maturity Level Two, AS
  ISO/IEC 27001:2023, NIST CSF 2.0, or C2M2 v2.1 at MIL-2. AEMO states it
  "operates on a user-pays cost-recovery basis, with all operating costs
  recovered through fees paid by industry participants," meaning
  participation cost exists and is charged back to entities, but no
  breakdown of the AESCSF program's specific cost (to AEMO or as a fee to
  participants) was found in any source opened for this file.
- Provenance: government and quasi-regulatory (AEMO is industry- and
  government-owned; CIRMP Rules are subordinate legislation under the SOCI
  Act, a genuine regulatory instrument). Vintage: Version 2 October 2023;
  regulatory recognition via CIRMP Rules from June 2026, transition to June
  2028. Currency: not applicable, no dollar figure found. Scope: applies at
  the organisation (Participant) level in the electricity, gas and liquid
  fuels sub-sectors.

## Source 4: Dragos and Marsh McLennan, 2025 OT Security Financial Risk Report

- Title: 2025 OT Security Financial Risk Report
- URL: https://hub.dragos.com/hubfs/dragos-ot-security-financial-risk-report-august-2025.pdf
- Retrieved: 2026-09-06 (PDF text extracted directly)
- Query run: "Dragos SANS ICS OT security budget survey report cost per
  site" and "Dragos Marsh McLennan OT security financial risk report
  control cost investment ROI"
- Supports: a vendor and insurance-industry cross-check on the scale of
  risk reduction attributable to OT security controls, relevant to Section
  9's risk-reduction percentage claims (not its dollar costs; this source
  supplies no cost figures for any control). See WARNING 3.
- Summary: this is a joint Dragos and Marsh McLennan Cyber Risk
  Intelligence Center (CRIC) study, built from a decade of insurance claims
  and information security event data. Global headline figures: in a
  1-in-250-year tail scenario (0.4 per cent annual likelihood), total OT
  cyber risk could reach $329.5 billion, of which $172.4 billion is
  business-interruption related; in a typical year, average OT-related
  cyber risk is $31.1 billion globally, of which $12.7 billion involves
  business-interruption claims. Roughly 70 per cent of OT-impacting
  breaches involve indirect costs (abundance-of-caution shutdowns, ripple
  effects) rather than direct damage. The report maps five OT security
  controls, aligned to the SANS ICS 5 Critical Controls framework, to
  measured average risk-reduction percentages from its claims data:
  Incident Response Plan 18.46 per cent, Defensible Architecture 17.09 per
  cent, Network Visibility and Monitoring 16.47 per cent, Risk-Based
  Vulnerability Management 13.87 per cent, Secure Remote Access 12.18 per
  cent. These percentages are explicitly not additive; the report does not
  attempt to model their combined effect. A sector-specific data point:
  "for utilities, North America has a 2.17% likelihood of an event in
  electric power generation and distribution" in a given year.
- Provenance: vendor and industry survey (Dragos is a commercial OT
  security vendor; Marsh McLennan is an insurance broker and risk advisory
  firm; the underlying claims data is proprietary and not independently
  auditable from the public report). Vintage: published August 2025, built
  on the preceding decade of claims data. Currency: USD. Scope: global,
  all-sector modelled risk with one utilities-specific likelihood figure;
  no Australian-specific or electricity-distribution-specific dollar
  figures are given, and no cost of implementing any control is given, only
  its estimated risk-reduction effect.

## Source 5: general security operations centre staffing cost benchmarks

- Title: How much does it cost to build and operate a 24x7 SOC? (Expel);
  SOC Staffing Cost 2026: Tier 1-3 Salaries, 24/7 FTE Math
  (SecurityOperationsCost.com, citing BLS Occupational Employment and Wage
  Statistics)
- URL: https://expel.com/cyberspeak/cost-to-build-and-operate-a-24x7-soc/ and
  https://securityoperationscost.com/soc-staffing-cost
- Retrieved: 2026-09-06
- Query run: "network segmentation OT security operations centre cost per
  year staffing benchmark"
- Supports: a rough cost anchor for Section 9's "24/7 OT SOC Establishment
  (8 analysts)" line item. This is a general enterprise IT SOC benchmark,
  not an OT-specific one; treat it as a floor, not a like-for-like figure.
- Summary: Expel states a competent 24x7 in-house SOC "requires a minimum
  of 8-10 full-time security analysts for continuous coverage... with total
  annual costs typically exceeding $1 million even for a basic operation,"
  and that "advanced SOCs easily exceed $2-3 million per year." Technology
  costs (SIEM, EDR, threat intelligence, orchestration) add a further
  "$500K-1 million+ per year." SecurityOperationsCost.com, anchoring its
  salary bands to BLS Occupational Employment and Wage Statistics for
  Information Security Analysts (occupation 15-1212) with a 1.28x loaded
  multiplier for payroll tax and benefits, states 24/7 coverage of a single
  analyst seat needs 5 to 6 full-time-equivalent staff (due to shift
  coverage math: 8,760 hours per year of coverage against roughly 1,800
  productive hours per FTE), and prices a minimum-viable 8 to 12 person
  24/7 SOC (5-6 Tier 1 analysts, 2-3 Tier 2, 1 Tier 3/threat hunter, 1
  manager) at a total loaded cost of $1.07 million to $1.59 million
  annually, before technology or turnover costs. Turnover (cited at 20 to
  30 per cent annually, per the Ponemon SOC Performance Report) adds a
  further $80,000 to $160,000 per year in replacement and continuity cost
  for an 8-FTE SOC.
- Scope limit: both figures describe a general enterprise SOC covering
  IT-side telemetry (SIEM, EDR). Neither is scoped to OT/ICS-specific
  tooling (protocol-aware network monitoring, OT asset inventory,
  engineering-workstation telemetry), which the paper's own control list
  (OT SIEM, behavioral analytics, ICS-aware firewalls) implies is
  additional to this baseline, not included in it. Do not present this
  figure as the full cost of the "24/7 OT SOC" line item without saying so.
- Provenance: vendor content (Expel is a managed detection and response
  vendor) and industry benchmark site, the latter anchored to a genuine
  government wage series (BLS OEWS) for its salary component. Vintage: both
  pages dated 2026 (current). Currency: USD. Scope: per organisation, per
  year, ongoing operating cost; personnel only for the low end of the
  range, personnel plus technology for the high end.

## Gaps: what could NOT be sourced

1. **No AER-approved dollar figure for cyber security capex within a named
   DNSP determination.** This was the task's top-priority ask. The AER's
   2024-29 final decisions confirm cyber security is a named, considered
   expenditure category (Source 2), and Ausgrid confirms its own approved
   program moved (down, via efficiency savings), but no dollar amount was
   retrieved. The AER's determination attachments (typically an "Overview"
   document and separate capex/opex attachments per DNSP) would need to be
   opened directly at the line-item level; one such attempt here timed out
   and another returned corrupted binary text. A later drafter should
   retry against `https://www.aer.gov.au/industry/registers/determinations/ausgrid-determination-2024-29/final-decision`
   or the equivalent pages for Endeavour Energy, Essential Energy, Energex
   or Ergon Energy.
2. **No AESCSF assessment or uplift cost was found, for AEMO or for a
   participant.** AEMO states the AESCSF programme is funded on a
   user-pays, cost-recovery basis, but no fee schedule, uplift cost
   estimate, or Energy Networks Australia costing document was retrieved.
3. **No SOCI Act compliance cost specific to a single named electricity
   DNSP was found**, only the sector-average per-entity figures in Source 1
   (Table 19/44), which are averages across multiple electricity entities,
   not a single business's actual RMP spend.
4. **DERMS security hardening has no public cost anchor.** No source gave
   a cost for physics-based dispatch validation, grid-frequency and RoCoF
   telemetry integration into DERMS, or BESS command rate-limiting
   engineering, whether as a product price or an integration project cost.
5. **Modbus security gateway hardware has no public price.** The specific
   product named in the paper's draft (Moxa EDR-G903) was confirmed to
   exist and to carry IEC 62443/NERC CIP-aligned security features, but
   every retailer listing found returned "price on request," with no
   published unit price, and no installation or per-site deployment cost
   for a 5-site or 54-site pilot was found anywhere.
6. **IEC 62351-6 GOOSE authentication (MACsec-based signing) implementation
   cost has no public anchor.** Multiple technical sources describe how
   GOOSE messaging and IEC 61850 substation automation work, but none
   costed a GOOSE authentication or MACsec retrofit project.
7. **Protection relay setting review cost has no public anchor.** No
   source, technical or commercial, gave a cost for a substation-by-
   substation protection relay setting review of the kind the paper's
   Section 9 recommends at scale (15, 54 or 162 sites).
8. **OT-specific network monitoring/IDS platform pricing (Dragos, Nozomi,
   Claroty) has no reliable public anchor.** Every vendor keeps pricing
   confidential and quotes per-deployment. One informal, unverified Reddit
   thread quoted specific Nozomi appliance prices ($26,322 to $477,393 per
   year depending on appliance tier) and a Dragos CentralStore cloud
   subscription figure ($240,000 per year for up to 50 sites), but this is
   an anonymous forum post, not a vendor-published or otherwise verifiable
   price list, and it is not used as a source in this file. Treat OT
   network monitoring platform cost as unanchored.
9. **Supply chain risk management program cost, zero-trust
   microsegmentation cost, and OT asset discovery tooling cost all have no
   public anchor** specific to an electricity distribution or ICS context.
   General enterprise zero-trust and asset-management market sizing exists
   (industry analyst reports) but none gave an implementation cost for a
   program of the scale the paper describes.
10. **NERC-CIP equivalence program cost has no public anchor.** The paper's
    Section 9 NERC-CIP compliance table (CIP-005, CIP-007, CIP-010,
    CIP-013) has no sourced cost for any of its five listed controls; this
    file found none.
11. **No Australian OT cyber insurance premium data was found.** The
    paper's Section 9 insurance discussion (baseline premium, premium after
    control investment, coverage gap) has no sourced Australian premium
    figure; Source 4's global loss-modelling data is not a premium and
    should not be used as a substitute.
12. **AER search results returned an upstream availability error on the
    first attempt** ("Unable to complete web search at this time") for the
    exact query "AER revenue determination cyber security capital
    expenditure electricity distribution." The retry succeeded but returned
    only the category-level confirmation in Source 2, not a dollar figure.
