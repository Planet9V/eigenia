# External research: blackout incident precedent

External research; found via valyu, not the working group's own analysis.

Supports the incident-precedent claims in
`references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md`,
specifically its references to the UK 9 August 2019 blackout, the South
Australia 28 September 2016 black system, and the general claim that
declining system inertia raises the risk of protection-driven cascades and
system splits (currently attributed only to unpublished "McKenney (2024,
2025)" analysis). The South Australia event itself is already fully sourced
in the sibling file `references/external-research/WG-04-CF_outage-cost-vcr_20260906.md`,
from AEMO's March 2017 final report; this file does not re-source it, except
to close the one item that file left open (see Source 1). This file's own
sources are National Grid ESO's technical report and Ofgem's investigation
report on the 9 August 2019 event, and ENTSO-E's final report on the 8
January 2021 Continental Europe system separation.

> **WARNING 1: the paper's current UK 2019 figures do not match the primary
> report and must be corrected before publication.** The paper (section 2.2,
> line ~399 of the current draft) states "660 MW gas + 740 MW wind" lost, "345
> MW of distributed generation tripped spuriously... at 0.135 Hz/s (relay
> threshold: 0.125 Hz/s)," and "System inertia: 210 GW.s at ~30% wind
> penetration." Against National Grid ESO's Technical Report (Source 2):
> Little Barford's total loss was 641 MW (244 MW steam turbine + 210 MW then
> 187 MW gas turbines, in three separate trips, not one 660 MW event);
> Hornsea's loss was 737 MW, not 740 MW; the embedded generation that tripped
> on RoCoF protection was "approximately 350MW," not 345 MW; and 0.125 Hz/s is
> the **relay disconnection threshold**, not a measured system-wide RoCoF of
> 0.135 Hz/s, a figure that does not appear anywhere in the ESO report. The
> 210 GVAs inertia figure is correctly sourced (Table 4 of the ESO report,
> for 9 August), but no wind-penetration percentage for that day appears in
> the report; do not keep "~30% wind penetration" on the strength of this
> file.

> **WARNING 2: the ENTSO-E 8 January 2021 event had a minor and almost
> entirely non-residential customer impact. Do not describe it as a mass
> blackout.** The interruptible loads disconnected in France (~1,300 MW) and
> Italy (~400 MW) are large industrial customers under standing contracts to
> be shed automatically at a frequency threshold, not the general public.
> ENTSO-E's own final report states the incident "had no major influence on
> the security of supply of European consumers" and that "only a very small
> number of private and industrial loads could not be supplied." No customer
> count is given anywhere in the report, only MW. If the paper wants an event
> that demonstrates full-scale customer-level cascade, use the UK 2019 event
> (1.15 million customers) or the already-sourced South Australia 2016 event
> (850,000 customers), not this one. This event is valuable for its
> millisecond-level causal chain, not for outage scale.

> **WARNING 3: the South Australia transmission tower count is confirmed
> absent from AEMO's final report, not merely unretrieved.** See Source 1.
> Section 2.4, Table 6, and Section 3.1.4 of AEMO's final report were all
> read in full for this file. None of them gives a count of transmission
> towers that fell. Continue treating "23 towers" as an unsourced figure that
> must not appear in the paper.

## Source 1: AEMO final report Section 2.4 and Table 6, the SA tower-count gap

- Title: Black System South Australia 28 September 2016 (final report,
  published March 2017), Section 2.4 "Transmission line faults," Table 6,
  and Section 3.1.4 "Cause of electrical faults"
- URL: https://www.aemo.com.au/-/media/Files/Electricity/NEM/Market_Notices_and_Events/Power_System_Incident_Reports/2017/Integrated-Final-Report-SA-Black-System-28-September-2016.pdf
- Retrieved: 2026-09-06 (full 273-page PDF, extracted with pdftotext; this is
  the section the sibling evidence file's Source 7 flagged as unreadable)
- Query run: direct fetch, then full-text search of the extracted document for
  "tower," "Table 6," and "2.4"
- Supports: closes the open item from
  `WG-04-CF_outage-cost-vcr_20260906.md` (its Source 7 closing note and Gap
  5).
- Summary: Table 6, "Transmission line faults in SA on 28 September 2016,"
  lists each of the faulted circuits (Brinkworth-Templers West 275 kV,
  Davenport-Belalie 275 kV twice, Davenport-Mt Lock 275 kV, Davenport-
  Brinkworth 275 kV, Port Lincoln-Yadnarie 132 kV) with out-of-service and
  in-service times and a comment column. Three of the six rows carry the note
  "Damaged towers bypassed," quoted exactly from the table. No row, no
  footnote to the table, and no sentence in Section 2.4 or Section 3.1.4
  ("Cause of electrical faults," covering lightning-strike data and the BOM
  tornado findings) gives a numeric count of towers damaged or fallen.
  Appendix V, which gives the towers' design wind-speed ratings (e.g.
  Davenport-Mt Lock/Davenport-Belalie rated to 46 m/sec, the double-circuit
  Brinkworth/Templers West and Brinkworth-Davenport lines to 28.6 m/sec),
  also carries no count.
- Finding: the transmission tower count genuinely does not exist in AEMO's
  final report. This is a confirmed gap in the primary source itself, not a
  retrieval failure. Any tower-count figure used in the paper, including "23
  towers," has no basis in the final report and should not be cited to it.

## Source 2: National Grid ESO, Technical Report on the events of 9 August 2019

- Title: Technical Report on the events of 9 August 2019 (final version filed
  with Ofgem), dated 6 September 2019
- URL: https://www.ofgem.gov.uk/sites/default/files/docs/2019/09/eso_technical_report_-_final.pdf
- Retrieved: 2026-09-06 (PDF extracted with pdftotext; WebFetch's own text
  conversion of this file was corrupted, so the binary was downloaded and
  converted locally)
- Query run: "National Grid ESO technical report 9 August 2019 power outage
  Hornsea Little Barford"
- Supports: the causal chain and figures for the UK 9 August 2019 blackout,
  the paper's central "protection operated as designed but worsened the
  outcome" argument, and the correction in WARNING 1 above.
- Summary, causal chain with exact timestamps, quoted from Section 3.3
  ("Detailed Timeline") and Section 3.2 ("Summary of the Event"):
  1. **16:52:26** - "Frequency at 50.0Hz, ESO securing for a loss of power
     infeed of 1000MW."
  2. **16:52:33** - "There were three lightning strikes detected in very
     close proximity to the Eaton Socon - Wymondley circuit," causing "a
     single (blue) Phase to Earth fault." Approximately 150 MW of embedded
     generation tripped on vector-shift protection at this instant. "The
     protection systems on the transmission system operated correctly to
     clear the lightning strike and the associated voltage disturbance was in
     line with what was expected."
  3. **16:52:33.531 to 16:52:33.835** - Hornsea offshore wind farm, which was
     generating 799 MW, "started deloading" at .728 and "stabilised at 62MW"
     at .835, a loss of 737 MW. Orsted's own investigation (quoted in the
     report) found the wind turbine controllers "reacted incorrectly due to
     an insufficiently damped electrical resonance in the sub-synchronous
     frequency range," and separately concluded that Hornsea's Dynamic
     Reactive Compensator "worked as designed and was not the cause of the
     de-load."
  4. **16:52:34** - Little Barford's steam turbine (ST1C) "trips 244MW
     instantaneously" (cumulative infeed loss 1,131 MW), coincident with, but
     independent of, the Hornsea loss. RWE attributed the trip to "a
     discrepancy between the measurements from three speed signals."
  5. **16:52:34** - "Approximately 350MW of embedded generation trips on
     RoCoF protection," bringing cumulative infeed loss to 1,481 MW. The
     report defines the relevant relay: "RoCoF... These relays disconnect the
     generators if the RoCoF is greater than 0.125Hz/s, disconnecting them
     from the system safely." This 0.125 Hz/s is the relay's trip threshold,
     not a reported system-wide RoCoF measurement (see WARNING 1).
  6. **16:52:58** - "Frequency drop is arrested at 49.1Hz due to the delivery
     of frequency response products."
  7. **16:53:31** - "Little Barford GT1A generator protection settings
     tripped and 210MW instantaneously disconnected" (cumulative infeed loss
     1,691 MW). With no further reserve, "the frequency fell to 48.8Hz."
  8. **16:53:49.398** - "Frequency breaches 48.8Hz trigger level resulting in
     LFDD. 931MW of demand is automatically disconnected." The report states
     plainly: "The Low Frequency Demand Disconnection (LFDD) scheme was
     correctly triggered at 48.8Hz and automatically disconnected c.1.1m
     customers (c. 1GW)." Table 7 gives the exact figure: 1,152,878 customers,
     931 MW.
  9. **16:53:58** - "Little Barford GT1B tripped with 187MW generation lost
     instantaneously," cumulative infeed loss 1,878 MW; "this loss was
     subsumed by the LFDD reductions."
  10. **16:57:15** - "Frequency returns to 50Hz following over 1,000MW of
      response and a further 1240MW of control room actions."
  11. **17:16 to 17:37** - Demand restoration commences and "all DNO's have
      confirmed that demand restoration has been" completed by 17:37,
      "though disruptions following demand restoration continued beyond"
      that as customers reset their own equipment.
- Protection operating as designed, at a cost, which is the paper's central
  argument: the vector-shift and RoCoF relays, and the LFDD scheme itself,
  all "operated correctly" / were "correctly triggered" by design, and the
  cost of that correct operation was the automatic disconnection of 1.15
  million customers to save the wider transmission system from a larger
  collapse. Ofgem's own report reaches the same conclusion about the
  ESO specifically: "We have not identified any failures by the ESO to meet
  its requirements which contributed to the outage."
- Counter-example, protection behaving worse than specified, which the paper
  should distinguish from the "worked as designed" cases above: the report
  states that "approximately 60 Class 700 and Class 717 trains" shut down
  when frequency dropped, of which 30 required a technician to physically
  reset. The train operator "stated this was not how the train system had
  been specified to operate," since "the technical specification for the
  trains states that the trains will continue to operate with supply
  frequency drops down to 48.5Hz." The impact: "23 train evacuations," "371
  trains cancelled, 220 part cancelled, and 873 trains" delayed. This is a
  specification failure, not a designed trip, and the report does not
  conflate the two.
- Ipswich Hospital: "internal protection operated coincident with the
  timeframe of the lightning strike," and the hospital's own backup generator
  for outpatient areas failed to start as expected, though other generators
  "kicked in as was required." The report confirms the hospital "was not
  part of their LFDD protection zone," so this was a separate, internal
  failure, not a consequence of the LFDD scheme.

## Source 3: Ofgem, 9 August 2019 power outage report

- Title: 9 August 2019 power outage report
- URL: https://www.ofgem.gov.uk/sites/default/files/docs/2020/01/9_august_2019_power_outage_report.pdf
- Retrieved: 2026-09-06 (PDF extracted with pdftotext)
- Publication date, quoted from the report's own cover page: 3 January 2020.
  This is the regulator's own investigation report, not National Grid's
  technical report (Source 2); the two are separate documents and both are
  final.
- Query run: "Ofgem investigation report 9 August 2019 power outage final
  decision"
- Supports: customer-count corroboration, and the compliance/enforcement
  outcome, which the paper should cite instead of treating this purely as an
  ESO-caused event.
- Summary: "On Friday 9 August 2019, a power outage caused interruptions to
  over 1 million consumers'" supply, and elsewhere the report gives the more
  precise figure: an event "affecting 1.15 million customers." Ofgem
  identified that "some licensees do not appear to have met their licence and
  code requirements." Hornsea 1 Limited and RWE Generation UK plc (Little
  Barford's owner) "have each acknowledged the role they respectively played
  in contributing to the outage, and agreed to make voluntary payments of
  £4.5m each to the Energy Industry Voluntary Redress Scheme." Separately,
  Eastern Power Networks plc and South Eastern Power Networks plc
  "acknowledged their technical breaches of their Grid Code requirements by
  reconnecting customers without being told to do so," a distinct failure
  from the initial cascade, and agreed to pay £1.5m in aggregate (£1.45m and
  £0.05m respectively, apportioned "in proportion to power (in MWs) that each
  disconnected prematurely"). Ofgem's finding on the system operator itself:
  "We have not identified any failures by the ESO to meet its requirements
  which contributed to the outage." Ofgem explicitly notes it "make[s] no
  formal legal determination" on the extent of any breach; the payments are
  voluntary acknowledgements, not adjudicated penalties.
- Caveat: distinguish the £4.5m/£4.5m generator payments (for contributing to
  the original cascade) from the £1.5m DNO payments (for an unrelated
  post-event restoration breach, premature reconnection). Do not present all
  four as a single "£15m fine for the blackout."

## Source 4: ENTSO-E, Continental Europe System Separation on 8 January 2021

- Title: Continental Europe Synchronous Area Separation on 08 January 2021,
  ICS Investigation Expert Panel, Final Report, 15 July 2021 (Main Report),
  Version 2.0 update published October 2021
- URL: https://eepublicdownloads.entsoe.eu/clean-documents/SOC%20documents/SOC%20Reports/Continental%20Europe%20Synchronous%20Area%20Separation%20on%2008%20January%202021%20-%20Main%20Report_updated.pdf
- Retrieved: 2026-09-06 (11.2 MB PDF, extracted with pdftotext)
- Query run: "ENTSO-E final report Continental Europe system separation 8
  January 2021 Ernestinovo Croatia"
- Note on interim vs final: ENTSO-E published preliminary updates on 8, 15
  and 26 January 2021, then a formal Interim Report on 26 February 2021, and
  finally this Expert Panel Final Report on 15 July 2021 (updated to Version
  2.0 in October 2021, the version used here). The 8/15/26 January updates
  give a rounded North-West nadir of "49.74 Hz"; the final report gives the
  more precise "49.746 Hz." Use the final report's figures.
- Supports: a second, more granular protection-cascade precedent than South
  Australia or the UK, with millisecond-resolution timestamps and an explicit
  statement that renewables were not the cause.
- Summary, root cause and pre-event condition, quoted from the report's
  Summary chapter: "That flow pattern totalled approx. 5.8 GW across the
  separation line at the time when the initial event took place. However,
  this high load flow, particularly on the busbar coupler, was not forecasted
  correctly in the different respective security calculations." The report
  also states plainly that "the incident on 8 January revealed no issue in
  relation to generation adequacy or high shares of renewables having an
  impact," attributing the cause instead to "large pan-European electric
  power flows and low stability margins."
- Causal chain, quoted and timestamped from Table 2.1 ("Sequence of events")
  and Section 2.1:
  1. **14:04:25.9** (delta 0.0s) - "400 busbar coupler overload protection"
     trips at Ernestinovo substation, Croatia (HOPS).
  2. **14:04:28.0** (delta 2.6s) - "Overload protection of both 400/110 kV
     transformers" at Ernestinovo.
  3. **14:04:48.9** (delta 23s) - Subotica-Novi Sad 400 kV line trips on
     "overload protection 20 s 2nd zone" (EMS, Serbia).
  4. **14:04:51.9 to 14:05:08.6** (delta 26 to 42.7s) - A cascade of ten
     further distance-protection trips across Romania (Transelectrica),
     Bosnia and Herzegovina (NOS BiH) and Croatia (HOPS), each logged to
     tenths of a second in Table 2.1.
  5. **14:05:08** (43 seconds after the initial trip) - "The Continental
     European Power System was divided into two asynchronous areas," with a
     5.8 GW power deficit in the North-West area and the mirrored 5.8 GW
     surplus in the South-East area.
  6. North-West area: frequency fell with "a RoCoF of 60 mHz/s (deduced from
     the frequency measured at the centre of inertia)" to a minimum of
     49.746 Hz. This was "arrested by the activation of the automatic
     frequency-dependent French system defence plan (approximately 1,300MW)
     and the automatic frequency-dependent Italian system defence plan
     (approximately 400MW)," both of which "disconnected industrial loads"
     under standing contracts (see WARNING 2 on who these customers are).
  7. South-East area: frequency rose with a RoCoF of "300 mHz/s" to a peak of
     50.6 Hz. In Turkey, synchronously connected via Bulgaria and Greece, an
     internal Special Protection Scheme in the Marmara region "activated
     which prevented an overload on the important Bandirma-Bursa corridor by
     shedding 975 MW of power generation" (570 MW at Bandirma, 405 MW at
     Icdas). A second Turkish scheme, the Hamitabat SPS, did not activate:
     "The Hamitabat SPS worked as designed and did not react as the
     conditions to trigger it were not met." This is an explicit primary-
     source example of a protection scheme correctly not firing.
  8. **14:47 CET** (Italy) and **14:48 CET** (France) - the interruptible
     industrial loads were reconnected once conditions stabilised.
  9. **15:08 CET** - "the Continental European Power System was
     resynchronised," approximately one hour after separation.
- Generation and load disconnections by MW (not customer counts; see
  WARNING 2), from Section 3.2: near the separation line, high transients
  tripped 988 MW of generation in the South-East area (388 MW Croatia, 600 MW
  Bosnia and Herzegovina) and 184 MW of load (163 MW Romania, 21 MW Croatia);
  in the North-West area, 348 MW of generation tripped in Romania and 48 MW
  of load (28 MW Romania, 20 MW Hungary). Further from the separation line,
  non-conforming disconnections triggered purely by frequency deviation
  outside the normal +/-200 mHz range removed 3,292 MW of generation in the
  South-East area (Bulgaria 187 MW, Greece 1,350 MW, Serbia 600 MW, Turkey
  1,155 MW) and 50 MW of load in Bulgaria. The report's own classification
  criterion for the largest reported load loss: "the largest loss of load was
  in the Transelectrica grid where approx. 191 MW of load was reported to
  have been disconnected."
- Overall finding, quoted from the Conclusion: "In that timespan only a very
  small number of private and industrial loads could not be supplied,
  meaning that overall the incident had no major influence on the security of
  supply of European consumers. The system separation of 08 January 2021 was
  thus severe but not as serious as the system separation of 4 November 2006,
  where millions of consumers were affected."

## Gaps: what could NOT be sourced

1. **No third incident (2021 ENTSO-E 24 July separation, 2003 Italy, or 2003
   US/Canada Northeast) was sourced.** Time was spent instead on greater
   depth for the two required incidents (UK 2019, ENTSO-E 8 January 2021),
   per the "quality over count" instruction. If the paper needs a third
   precedent, the 2003 US/Canada Northeast blackout has a well-known primary
   source (the US-Canada Power System Outage Task Force final report,
   published April 2004) that was not opened for this file.
2. **No measured system-wide RoCoF value for the UK 9 August 2019 event was
   found.** The ESO report gives the 0.125 Hz/s relay trip threshold, not a
   single measured system RoCoF figure. Do not attribute "0.135 Hz/s" to this
   event; see WARNING 1.
3. **No wind-penetration percentage for 9 August 2019 was found.** The 210
   GVAs inertia figure is sourced (Source 2, Table 4); the "~30% wind
   penetration" claim that currently accompanies it in the paper is not.
4. **No customer or population count for the ENTSO-E 8 January 2021 event was
   found**, only MW of load and generation. See WARNING 2 for why this
   matters and should not be papered over.
5. **The South Australia tower count is not a retrieval gap but a confirmed
   absence in the primary source.** See Source 1. Do not treat this as
   "still open" in future work on this paper; the report simply does not
   contain the figure.
6. **Iberian Peninsula, 28 April 2025.** The paper's current draft (section
   2.2) cites this event with figures attributed only to unpublished
   "McKenney (2024, 2025)" analysis. It was out of scope for this file (not
   listed in the incidents to source) and no official Spanish/Portuguese
   grid-operator or ENTSO-E final report on it was opened here.
