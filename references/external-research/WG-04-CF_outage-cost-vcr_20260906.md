# External research: outage cost and Value of Customer Reliability

External research; found via valyu, not the working group's own analysis.

Supports the rebuild of the financial analysis in
`references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md`,
which currently carries `[investment required]` placeholders where its cost
figures should be. The economics are to be rebuilt through:

    unserved energy (MWh) = customers affected x average demand (kW) x restoration hours
    direct cost           = VCR ($/kWh) x unserved energy

Read the "Gaps" section at the end before drafting any table. Two of the terms
in that relation are sourced below; the others are not.

## Source 1: AER, Values of customer reliability, Final report on VCR values

- Title: Values of customer reliability: Final report on VCR values
- URL: https://www.aer.gov.au/system/files/2024-12/2024-12-18%20AER%20-%20Final%20report%20-%202024%20VCR%20review_0.pdf
- Retrieved: 2026-09-06
- Query run: "AER Values of Customer Reliability determination dollars per kilowatt hour"
- Supports: the VCR ($/kWh) term in the direct-cost relation, and the paper's
  correction of VCR attribution from AEMO to the AER.
- Summary: The AER's December 2024 final report is the current statutory VCR
  determination. It defines VCR as "dollars per kilowatt hour ($/kWh) of
  unserved energy", which is exactly the unit the paper's relation needs.
  Residential VCR by jurisdiction, 2024 values in $2024 (Table 1): NSW $38.53,
  Victoria $49.23, Queensland $36.09, South Australia $48.52, Tasmania $35.69,
  ACT $50.70, Northern Territory $30.69, NEM $41.48. The same table gives the
  2019 values in nominal terms (NEM $24.08) and CPI-adjusted to $2024 (NEM
  $29.02), so the vintage difference is large and must be stated whenever a
  figure is used. Business VCR, $2024 (Table 2): Agriculture $22.25,
  Commercial $34.39, Industrial $33.49; the corresponding 2019 values in
  $2024 terms were $45.65, $53.66 and $76.89, so business VCR fell sharply in
  real terms. Very large business VCR, $2024 (Table 3): Services $33.10,
  Industrial $12.22, Mines $10.63, Metals $5.38. Scope matters: these are VCR
  for unplanned "standard" outages of up to 12 hours. Outages longer than 12
  hours fall outside this determination and are covered by the separate 2024
  value of network resilience (VNR) review.

## Source 2: AER on its own VCR role and the 2014 AEMO precedent

- Title: Values of customer reliability: Final report on VCR values (section
  "Our VCR role", pp. 2 and 8)
- URL: https://www.aer.gov.au/system/files/2024-12/2024-12-18%20AER%20-%20Final%20report%20-%202024%20VCR%20review_0.pdf
- Retrieved: 2026-09-06
- Query run: "AER Values of Customer Reliability determination dollars per kilowatt hour"
- Supports: the attribution correction. The paper currently credits VCR to
  AEMO; this is the regulator's own statement of who does what, and when the
  handover happened.
- Summary: The AER states that "Developing the VCR methodology has been an
  iterative process since AEMO developed the first VCR methodology for the NEM
  in 2014", and that "Under the National Electricity Rules (NER), since 2018 we
  have been responsible for developing and reviewing the VCR methodology and
  calculating and updating the VCR using that methodology." The governing
  provision is NER Part I, rule 8.12, which requires the AER to publish a
  national VCR methodology, to engage retail customers directly, to include an
  annual adjustment mechanism, and to update the VCR at least once every five
  years. The AER developed its own methodology and published values in 2019,
  annually CPI-adjusted them, and updated them by 18 December 2024. So AEMO
  2014 is a real and citable precedent, but a present-tense claim that AEMO
  determines VCR is wrong for any date after 2018.

## Source 3: AEMC final rule making the AER responsible for VCR

- Title: New rule makes AER responsible for determining values of customer reliability
- URL: https://www.aemc.gov.au/news-centre/media-releases/new-rule-makes-aer-responsible-determining-values-customer-reliability
- Retrieved: 2026-09-06
- Query run: "AER Values of Customer Reliability determination dollars per kilowatt hour"
- Supports: the date and instrument behind the attribution correction.
- Summary: The AEMC made its final rule on 5 July 2018, with commencement on 13
  July 2018, transferring responsibility for calculating VCR to the AER. The
  rule change was requested by the COAG Energy Council on 22 December 2017 and
  run under the AEMC's expedited process as non-controversial; 19 submissions
  were received. The rule requires the AER to establish VCR estimates every
  five years from consumer surveys, update them annually, and publish the first
  estimates under the new methodology by 31 December 2019. The AEMC's stated
  reason is directly relevant to the paper's argument: "The value of customer
  reliability has only been estimated a limited number of times in the NEM,
  with no single body formally responsible. This has led to variations in both
  the methodology and the resulting estimates." The companion rule change page
  is at https://www.aemc.gov.au/rule-changes/establishing-values-of-customer-reliability

## Source 4: AEMC Reliability Panel, reliability standard and settings for 2028 to 2032

- Title: Reliability Panel prioritises stability for consumers with proposed change to reliability standard for 2028-2032
- URL: https://www.aemc.gov.au/news-centre/media-releases/reliability-panel-prioritises-stability-consumers-proposed-change-reliability-standard-2028-2032
- Retrieved: 2026-09-06
- Query run: "NEM reliability standard 0.002% unserved energy AEMC Reliability Panel expected unserved energy definition"
- Supports: what counts as an acceptable quantity of unserved energy in the
  NEM, and the market price settings that bound the wholesale cost of a
  shortfall. Use this rather than the ISP for any tolerance-of-USE claim.
- Summary: The Reliability Panel's final Reliability Standard and Settings
  Review recommends relaxing the reliability standard from 0.002 per cent to
  0.003 per cent expected unserved energy for 1 July 2028 to 30 June 2032,
  which the Panel describes as moving from 99.998 per cent to 99.997 per cent
  reliability, or from a long-term average of about 10 minutes to about 16
  minutes of generation-driven outage per customer per year. Market price
  settings are unchanged: market price cap $22,800, cumulative price threshold
  $2,235,600 (both in 2022 dollars), market floor price -$1,000/MWh,
  administered price cap and floor $600/MWh and -$600/MWh. The Panel gives its
  reason in VCR terms: "the value consumers place on reliability, the 'VCR', a
  metric assessed by the Australian Energy Regulator (AER) every five years,
  has declined by an average of 18 per cent across the market." Note the
  vintage trap: this 18 per cent average decline is consistent with the
  business and very large business falls in Source 1, and inconsistent with a
  naive read of the residential rows, which rose.

## Source 5: AEMC Reliability Panel, definition of unserved energy

- Title: Definition of unserved energy (market review, final report 1 August 2019)
- URL: https://www.aemc.gov.au/market-reviews-advice/definition-unserved-energy
- Retrieved: 2026-09-06
- Query run: "NEM reliability standard 0.002% unserved energy AEMC Reliability Panel expected unserved energy definition"
- Supports: the definition of the unserved-energy term, and an important scope
  limit on it.
- Summary: In the NER, unserved energy "is a measure of the amount of customer
  demand that cannot be supplied within a region due to a shortage of
  generation, demand-side participation or interconnector capacity", and the
  reliability standard requires unserved energy to be "not be more than 0.002
  per cent of the total energy demanded in a given year" (the pre-2028 figure;
  see Source 4 for the recommended change). The scope limit matters for a
  cascading-failure paper: the NER measure is isolated to wholesale supply
  interruptions, and the Panel's review considered excluding power system
  security events from it. Distribution-network outages, which the AER says
  account for around 95 per cent of the interruptions customers actually
  experience, are not what the 0.002 per cent standard counts. Do not equate
  the paper's modelled distribution-level unserved energy with NER unserved
  energy without saying so.

## Source 6: 2016 South Australia statewide blackout, cost to business

- Title: South Australian blackout costs business $367m, fears summer outages on way, lobby group says (ABC News)
- URL: https://www.abc.net.au/news/2016-12-09/sa-blackout-costs-could-have-been-worse-business-sa-says/8106600
- Retrieved: 2026-09-06
- Query run: "economic cost of the 2016 South Australia statewide blackout"
- Supports: an observed, event-level outage cost for a real Australian
  cascading failure, usable as a sanity check against any modelled figure.
- Summary: Business SA, the state's peak business lobby, surveyed about 200
  businesses and put the cost of the 28 September 2016 statewide blackout to
  South Australian business at $367 million. The median cost across all
  businesses surveyed was $5,000, including lost production, lost trading and
  wages paid while not operating; on the Eyre Peninsula the median was about
  $10,000. Almost a third of the total, about $115 million, fell on four firms:
  Arrium, Nyrstar, BHP Billiton and Oz Minerals. Only 37 per cent of businesses
  had business interruption insurance and of those more than half were not
  covered for blackout-related costs; only 12 per cent had a backup generator.
  Provenance caveat: this is a lobby group's survey of a 200-business sample,
  not a regulator's or an official incident report's figure, and it counts
  business losses only, not residential or public-sector cost. Cite it as
  "Business SA, December 2016", not as a government estimate. Several
  secondary outlets reattribute the same $367 million to Australia's Chief
  Scientist; that reattribution is not supported by the ABC report and should
  not be repeated.

## Source 7: 2016 South Australia blackout, customers and demand at the moment of collapse

- Title: South Australia's storm caused transmission faults, but that's not the whole story (ABC News, reporting AEMO's update on the outage)
- URL: https://www.abc.net.au/news/2016-10-20/wind-power-loss-key-event-in-sa-blackout-report-finds/7947478
- Retrieved: 2026-09-06
- Query run: "economic cost of the 2016 South Australia statewide blackout"
- Supports: the "customers affected x average demand (kW)" half of the paper's
  relation, with a real observed pairing of customer count and coincident
  demand from an actual cascading failure.
- Summary: Reporting AEMO's update on the 28 September 2016 event, the ABC
  states that just before the blackout "South Australia's 850,000 electricity
  customers were consuming 1895 megawatts of energy". That pairing, 1,895 MW
  across 850,000 customers, implies roughly 2.2 kW of coincident demand per
  customer, which is a defensible order-of-magnitude anchor for the average
  demand term. The same report gives the mechanism: wind turbines at 883 MW,
  SA gas at 330 MW, 613 MW imported over the two Victorian interconnectors;
  nine wind farms reduced output in under a second at 4:18pm, shifting 445 MW
  onto the Heywood interconnector, which has a 650 MW design limit, surged to
  900 MW and tripped. Around 20 MW of wind was disconnected by overspeed trip.
  Twenty-three transmission towers were knocked over. Provenance caveat: this
  is ABC's reporting of AEMO's interim update, not AEMO's own final report.
  Before publishing the 850,000 / 1,895 MW pair, replace this citation with
  AEMO's own "Black System South Australia 28 September 2016" final report.

## Gaps: what could NOT be sourced

Record these honestly rather than filling them with an estimate. This project
exists because the corpus previously contained invented numbers.

1. **No all-customer NEM-wide aggregate VCR was retrieved.** The AER's 2024
   final report has a section 5.4, "NEM-wide and regional VCR", at page 61,
   and a section 4.4 on how those aggregates are built, but neither the section
   text nor its table could be extracted from the PDF. The `$41.48/kWh` NEM
   figure captured above is the **residential** NEM value from Table 1, not an
   all-customer blend. Do not present it as an all-customer VCR. Either use a
   segment-specific value and say which segment, or open the PDF at page 61 to
   get the aggregate before writing a blended number.
2. **No AEMO 2014 NEM-wide VCR figure was found.** The 2014 study is
   documented as existing and as the methodological precedent (Source 2), but
   no $/kWh value from it was seen. Cite AEMO 2014 for the fact of the earlier
   study, not for a number.
3. **The AEMO Integrated System Plan query produced no unserved-energy
   figure.** The query "AEMO Integrated System Plan unserved energy
   expectation" returned the 2024 ISP (published 26 June 2024,
   https://www.aemo.com.au/-/media/files/major-publications/isp/2024/2024-integrated-system-plan-isp.pdf)
   and the Draft 2026 ISP (10 December 2025), but only their front matter and
   CEO prefaces, with no expected-USE numbers. Sources 4 and 5 above carry the
   USE anchor instead. Do not cite the ISP for a USE figure on the strength of
   this file.
4. **Nothing here sources the subject network.** The ~1.2 million customers,
   185 critical substations, 54 BESS units and 270 MW are the synthetic
   network's own parameters. They are stipulated, not sourced, and the paper
   should say so.
5. **Nothing here sources restoration hours.** No distribution restoration-time
   distribution was found in this pass. Any restoration-hour input is modelled
   and must be labelled as such, or the row cut.
