# External research: outage cost and Value of Customer Reliability

External research; found via valyu, not the working group's own analysis.

Supports the rebuild of the financial analysis in
`references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md`,
which currently carries `[investment required]` placeholders where its cost
figures should be. The economics are to be rebuilt through:

    unserved energy (MWh) = customers affected x average demand (kW) x restoration hours
    direct cost           = VCR ($/kWh) x unserved energy

Read the two warnings below and the "Gaps" section at the end before drafting
any table.

> **WARNING 1: the VCR is determined for outages of up to 12 hours only.**
> The AER's 2024 VCR values cover unplanned "standard" outages of up to 12
> hours in duration. That is the domain the willingness-to-pay surveys behind
> them were run over. The paper models multi-day regional outages. Applying
> $41.48/kWh, or any other value in Source 1, across a multi-day duration
> stretches a 12-hour-bounded estimate roughly an order of magnitude outside
> its determined range. The AER's separate Value of Network Resilience (VNR)
> review is the instrument for outages longer than 12 hours, and this file
> contains no VNR figure. Any multi-day table must either use a VNR value or
> state plainly, in the paper, that VCR is being applied outside the range for
> which it was determined.

> **WARNING 2: the South Australia figures in this file are the March 2017
> final ones, not the October 2016 interim ones.** AEMO revised several
> headline numbers between its interim update and its final report. An earlier
> draft of this file carried interim values for regional demand, the
> generation reduction and the tower count; all three were wrong. If a figure
> for this event turns up anywhere in the corpus that does not match Source 7,
> it came from interim reporting and is stale.

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
  Industrial $12.22, Mines $10.63, Metals $5.38.
- Caveat, very large business values: do not publish $12.22, $10.63 or $5.38
  as stable parameters. The AER attributes the fall partly to who answered the
  survey, not only to a real change in preference: "While we have a similar
  sample size in 2024 to the 2019 sample size, the sample composition for each
  segment in 2024 is substantially different from 2019. The reported outage
  costs and consumption levels have also changed, including for the
  respondents that participated in both 2019 and 2024 surveys." Very large
  business industrial falls from $142.22 in $2024 terms to $12.22, an order of
  magnitude in five years. A parameter that moves that far on a resampling is
  not a parameter; quote it with the AER's own caveat attached or leave it out.
- Scope: these are VCR for unplanned "standard" outages of up to 12 hours.
  See WARNING 1 above.
- Also from this report, footnote 2 (p. 1), which is the AER's own figure and
  not the AEMC's: "Around 95% of the interruptions to supply experienced by
  electricity consumers are due to issues in the local distribution network",
  citing AER, State of the energy market 2024, 7 November 2024, p. 56. This
  matters when reading Source 5: the NER unserved-energy measure counts
  wholesale interruptions, which are not where most customer interruptions
  actually come from.

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

## Source 5: AEMC Reliability Panel, definition and scope of unserved energy

- Title: Definition of unserved energy (market review, final report 1 August 2019)
- URL: https://www.aemc.gov.au/market-reviews-advice/definition-unserved-energy
- Retrieved: 2026-09-06
- Query run: "NEM reliability standard 0.002% unserved energy AEMC Reliability Panel expected unserved energy definition"
- Supports: the definition of the unserved-energy term, and an important scope
  limit on it.
- Summary: In the NER, unserved energy "is a measure of the amount of customer
  demand that cannot be supplied within a region due to a shortage of
  generation, demand-side participation or interconnector capacity". The
  standard is regional and annual, not a single national number: the
  Reliability Panel's information paper (The Reliability Standard: current
  considerations, 12 March 2020, ERC0279) states that the standard "is
  currently expressed as 0.002 per cent unserved energy, which represents the
  maximum expected unmet demand for each financial year, for each region (as a
  proportion of the total energy delivered)". Both qualifiers matter: per
  region, and per financial year. See Source 4 for the recommended change to
  0.003 per cent from 1 July 2028.
- Scope limit, and it is the important part for a cascading-failure paper: the
  NER measure is isolated to wholesale supply interruptions, and the Panel's
  review considered excluding power system security events from it.
  Distribution-network outages are not what the standard counts, yet the AER
  puts around 95 per cent of the interruptions customers actually experience in
  the distribution network (see Source 1). Do not equate the paper's modelled
  distribution-level unserved energy with NER unserved energy without saying so.

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
- Provenance caveat: this is a lobby group's survey of a roughly 200-business
  sample, not a regulator's figure and not an official incident report's
  figure. Cite it as "Business SA, December 2016", not as a government
  estimate. Note also that it is a partial cost: it counts business losses
  only, and excludes residential and public-sector cost entirely, so it is a
  floor on the event's economic cost rather than a total.
- Scope distortion to avoid: at least one secondary outlet reports the same
  $367 million as falling on "businesses and households". The Business SA
  survey covered businesses only. Do not repeat the widened scope, and do not
  use this figure as an all-of-economy total.

## Source 7: AEMO, Black System South Australia 28 September 2016, final report

- Title: Black System South Australia 28 September 2016 (final report, published March 2017)
- URL: https://www.aemo.com.au/-/media/Files/Electricity/NEM/Market_Notices_and_Events/Power_System_Incident_Reports/2017/Integrated-Final-Report-SA-Black-System-28-September-2016.pdf
- Retrieved: 2026-09-06
- Query run: "AEMO Black System South Australia 28 September 2016 final report March 2017"
- Supports: the "customers affected x average demand (kW)" half of the paper's
  relation, an observed restoration-time profile, and the trigger chain of a
  real cascading failure. This is the primary source for the event and
  supersedes all interim reporting.
- Summary: AEMO's final report, published March 2017 and based on information
  available as of 23 March 2017, prepared under NER clauses 3.14 and 4.8.15.
  Customers affected: "some 850,000 SA customers lost electricity supply,
  affecting households, businesses, transport and community services, and
  major industries." Demand at the moment of collapse, from footnote 4: "The
  supply demand imbalance was in the order of 1,000 MW, for a regional demand
  of 1,826 MW." That pairing, 1,826 MW of regional demand across 850,000
  customers, gives about 2.15 kW of coincident demand per customer, which is
  the defensible anchor for the average-demand term. Use 1,826 MW, labelled as
  regional demand from the AEMO final report; do not use the 1,895 MW figure
  that appears in interim reporting, which is a total-supply number including
  embedded distribution generation, not regional demand.
- Trigger chain, quoted: "On Wednesday 28 September 2016, tornadoes with wind
  speeds in the range of 190 to 260 km/h occurred in areas of South Australia.
  Two tornadoes almost simultaneously damaged a single circuit 275 kilovolt
  (kV) transmission line and a double circuit 275 kV transmission line, some
  170 km apart. The damage to these three transmission lines caused them to
  trip, and a sequence of faults in quick succession resulted in six voltage
  dips on the SA grid over a two-minute period at around 4.16 pm."
- Cascade mechanism, quoted: "nine wind farms in the mid-north of SA exhibited
  a sustained reduction in power as a protection feature activated. For eight
  of these wind farms, the protection settings of their wind turbines allowed
  them to withstand a pre-set number of voltage dips within a two-minute
  period. Activation of this protection feature resulted in a significant
  sustained power reduction for these wind farms. A sustained generation
  reduction of 456 megawatts (MW) occurred over a period of less than seven
  seconds." Use 456 MW over less than seven seconds. Do not use 445 MW or "in
  under a second"; both are superseded interim values. The protection was a
  voltage-dip-count setting, not a fault-ride-through failure: AEMO concludes
  that "Wind turbines successfully rode through grid disturbances. It was the
  action of a control setting responding to multiple disturbances that led to
  the Black System."
- Heywood interconnector: AEMO's final report gives no MW flow or limit figure
  for Heywood in the summary sequence. It says only that "Approximately 700
  milliseconds (ms) after the reduction of output from the last of the wind
  farms, the flow on the Victoria to SA Heywood Interconnector reached such a
  level that it activated a special protection scheme that tripped the
  interconnector offline." Do not publish a Heywood MW flow or a Heywood MW
  limit on the strength of this file. Contemporaneous reporting gives a range
  for the peak and two different limits (a normal operating limit and a higher
  upgraded transfer capability), which is not precise enough to state as fact.
- Timing: the sequence ran over the 87 seconds before system shutdown at
  16:18:16; all supply to the SA region was lost at 4.18 pm.
- Restoration profile, which is the closest thing in this file to a sourced
  restoration-hours input: a system restart plan began at 4.30 pm. "The first
  customers had power restored by 7.00 pm on 28 September. About 40% of the
  load in SA capable of being restored had been restored by 8.30 pm, and 80 to
  90 % had been restored by midnight. The remaining load was gradually restored
  as fallen transmission lines were bypassed, and all customers had supply
  restored by 11 October 2016." So restoration is strongly non-uniform: most
  load back within about eight hours, the tail running thirteen days. A single
  average restoration-hours scalar will misrepresent this shape.
- Transmission tower count: deliberately omitted. An earlier draft of this file
  carried "23 transmission towers", attributed to an ABC article that does not
  contain a tower count. AEMO's executive summary and the pages that could be
  extracted from the final report give no tower count either, and section 2.4
  (Transmission line faults, p. 30) could not be retrieved. No tower figure is
  therefore available from this file, and none should be published on its
  strength. Separately, a tower count would be causally misleading here even if
  verified, because tower collapse and the line faults are not the same event
  in AEMO's account; the report's own trigger chain runs tornado damage to
  three 275 kV lines, to six voltage dips, to the wind farm protection
  response. Use the quoted chain above, not a tower count.

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
2. **No Value of Network Resilience figure was found.** The VNR is the correct
   instrument for outages longer than 12 hours (see WARNING 1), and this file
   does not contain a VNR value. The AER's VNR review page is at
   https://www.aer.gov.au/industry/registers/resources/reviews/value-network-resilience-2024
   and must be read before any multi-day cost table is drafted.
3. **No AEMO 2014 NEM-wide VCR figure was found.** The 2014 study is
   documented as existing and as the methodological precedent (Source 2), but
   no $/kWh value from it was seen. Cite AEMO 2014 for the fact of the earlier
   study, not for a number.
4. **The AEMO Integrated System Plan query produced no unserved-energy
   figure.** The query "AEMO Integrated System Plan unserved energy
   expectation" returned the 2024 ISP (published 26 June 2024,
   https://www.aemo.com.au/-/media/files/major-publications/isp/2024/2024-integrated-system-plan-isp.pdf)
   and the Draft 2026 ISP (10 December 2025), but only their front matter and
   CEO prefaces, with no expected-USE numbers. Sources 4 and 5 above carry the
   USE anchor instead. Do not cite the ISP for a USE figure on the strength of
   this file.
5. **No transmission tower count is available.** See the closing note on
   Source 7. Section 2.4 of the AEMO final report could not be retrieved.
6. **No Heywood interconnector MW flow or limit is available.** See Source 7.
7. **Nothing here sources the subject network.** The ~1.2 million customers,
   185 critical substations, 54 BESS units and 270 MW are the synthetic
   network's own parameters. They are stipulated, not sourced, and the paper
   should say so.
8. **No general distribution restoration-time distribution was found.** Source
   7 gives one observed restoration profile for one transmission-level event,
   which is a single case and a strongly non-uniform one. It is not a
   distribution. Any restoration-hours input generalised from it is modelled
   and must be labelled as such, or the row cut.
