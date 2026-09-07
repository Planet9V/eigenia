# External research: grid inertia, RoCoF, and protection margins

External research; found via valyu, not the working group's own analysis.

Supports the rebuild of the grid physics claims in
`references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md`,
specifically Section 2.1 ("Grid Inertia Depletion Mechanics"), the RoCoF
threshold table in Section "RoCoF Threshold Analysis," and the repeated
citations of a 6.1 Hz/s South Australia RoCoF, a 0.125 Hz/s to 1 Hz/s United
Kingdom relay change, and a 49.85 Hz under-frequency load shedding (UFLS)
trip point. Read the three warnings below before touching any of those
numbers.

> **WARNING 1: no source opened in this research confirms the paper's 6.1
> Hz/s South Australia RoCoF figure.** The paper attributes "6.1 Hz/s" to
> AEMO's Black System South Australia final report (March 2017) in three
> places. I opened that final report directly in this session and could not
> locate this figure in the retrievable text. The number appears widely in
> secondary and tertiary commentary about the event, not in AEMO's own report
> text as retrieved here. Do not publish 6.1 Hz/s as an AEMO figure until
> someone opens the report's own RoCoF section (the passage that could be
> retrieved covered generation reduction and interconnector tripping, not a
> RoCoF value) and quotes it directly. Separately, a companion evidence file
> in this series (`WG-04-CF_outage-cost-vcr_20260906.md`, Source 7) already
> established from the same final report that the sustained wind generation
> reduction was 456 MW over less than seven seconds, not the paper's "445 MW"
> "in under a second." That file is the authority on the generation-loss
> figure; this file does not reopen it, but both instances in the paper need
> the same correction together.

> **WARNING 2: the UK 0.125 Hz/s to 1 Hz/s RoCoF relay change is real and in
> service, but it did not remove every 0.125 Hz/s relay from the GB system.**
> Great Britain's most sensitive RoCoF protection setting is still 0.125 Hz/s
> on legacy equipment that predates the change. The 1 Hz/s setting with a 500
> millisecond definite time delay applies to generation covered by Engineering
> Recommendation G99 and by the retrospective compliance programme for
> existing small generation, with a compliance deadline of 31 August 2022. A
> statement that "the UK RoCoF threshold is 1 Hz/s" without that qualifier
> misrepresents a system that still carries multiple tranches of relays at
> different settings, some legacy and more sensitive.

> **WARNING 3: 49.85 Hz is not a UFLS trip point in the paper's own
> jurisdiction (the NEM).** The paper's Mermaid diagrams and its "RoCoF
> Threshold Analysis" section both cite "49.85 Hz Threshold" as the point
> where under-frequency relays trip. Under the AEMC Reliability Panel's
> Frequency Operating Standard, 49.85 to 50.15 Hz is the bottom of the
> **normal operating frequency band**, the range the system is expected to sit
> in almost all the time, not a load-shedding trigger. AEMO's own Inertia
> Requirements Methodology treats 49 Hz, a full Hz below the paper's number,
> as the reference point for its RoCoF-to-time table. Do not use 49.85 Hz as a
> UFLS or relay-trip figure in any jurisdiction without checking that
> jurisdiction's own standard first.

## Source 1: AEMO, Inertia Requirements Methodology (final, effective 1 July 2018)

- Title: Inertia Requirements & Shortfalls (Inertia Requirements Methodology)
- URL: https://www.aemo.com.au/-/media/Files/Electricity/NEM/Security_and_Reliability/System-Security-Market-Frameworks-Review/2018/Inertia_Requirements_Methodology_PUBLISHED.pdf
- Retrieved: 2026-09-06
- Query run: "AEMO power system frequency risk review inertia requirements"
- Supports: claim 1 (what inertia is and how it is measured), claim 2 (the
  RoCoF relation), and claim 5 (why inverter-based resources do not
  contribute inertia). This is AEMO's own methodology document, status
  FINAL, version 1.0, effective 1 July 2018, approved by AEMO's Executive
  General Manager, Operations.
- Summary: AEMO defines inertia by quoting the National Electricity Rules
  (NER): "Contribution to the capability of the power system to resist
  changes in frequency by means of an inertial response from a generating
  unit, network element or other equipment that is electro-magnetically
  coupled with the power system and synchronised to the frequency of the
  power system." The document's own glossary defines the unit: "MWs
  Megawatt-second." AEMO calculates two thresholds per region ("inertia
  sub-network"): "the minimum threshold level of inertia, being the minimum
  level of inertia required to operate an inertia sub-network in a
  satisfactory operating state when the inertia sub-network is islanded; and
  the secure operating level of inertia, being the minimum level of inertia
  required to operate an inertia sub-network in a secure operating state when
  the inertia sub-network is islanded." AEMO's own RoCoF-to-time table (Table
  1, "RoCoF and Time to reach 49Hz," starting from 50 Hz):

  | RoCoF (Hz/s) | Time to reach 49 Hz (seconds) |
  |---|---|
  | 4 | 0.25 |
  | 2 | 0.5 |
  | 1 | 1 |
  | 0.5 | 2 |

  On why inverter-based resources do not provide inertia, AEMO states:
  "asynchronous generation technologies, such as modern wind turbines, solar
  inverters and batteries, are connected to the power system via a power
  electronic interface and do not bring any inertia naturally to the power
  system because they are electrically decoupled from the power system," and
  "Because of a lack of inherent inertia, these technologies are currently
  limited in their ability to reduce a change in power system frequency
  immediately after an imbalance between supply and demand." By contrast,
  synchronous plant is described as "typically heavy, weighing in the tens
  and hundreds of tonnes," and because it "spin[s] synchronously with the
  power system, they inherently slow down a change in power system frequency
  immediately after an imbalance between supply and demand."
- Gap inside this source: Appendices A through E give per-region minimum
  threshold and secure operating levels of inertia in MWs for Queensland, New
  South Wales, Victoria, South Australia, and Tasmania. The appendix tables
  did not extract in this search. Do not publish a specific NEM regional MWs
  figure on the strength of this file; a direct fetch of those appendix pages
  is needed first.

## Source 2: AEMC Reliability Panel, Frequency Operating Standard (effective 1 January 2020)

- Title: A Frequency Operating Standard
- URL: https://www.aemc.gov.au/sites/default/files/2019-04/Frequency%20operating%20standard%20%E2%80%93%20effective%201%20January%202020.pdf
- Retrieved: 2026-09-06
- Query run: "AEMO frequency operating standard under-frequency load shedding Hz thresholds NEM"
- Supports: the correction in WARNING 3 above, and the general definition of
  frequency bands referenced by claim 6.
- Summary: The mainland NEM frequency bands, effective 1 January 2020: the
  "normal operating frequency band" is 49.85 to 50.15 Hz; the "normal
  operating frequency excursion band" is 49.75 to 50.25 Hz; the "operational
  frequency tolerance band" is 49.0 to 51.0 Hz; the "extreme frequency
  excursion tolerance limit" is 47.0 to 52.0 Hz. Following a generation event
  or load event, frequency must return to the normal operating frequency band
  within 5 minutes; following a network event, frequency must stay within the
  operational frequency tolerance band and return to normal within 5 to 10
  minutes depending on event type. None of these bands is itself a UFLS relay
  setting; UFLS is a separate mechanism operated by individual Network
  Service Providers under AEMO coordination, and this standard does not
  publish a single national relay set point.

## Source 3: EirGrid, Inertia Management on the Power Systems of Ireland and Northern Ireland (March 2024)

- Title: Inertia Management on the Power Systems of Ireland and Northern
  Ireland (G-PST Future of Inertia Summit, presented by Simon Tweed, EirGrid)
- URL: https://globalpst.org/wp-content/uploads/EIRGRID-G-PST-Inertia-Management-on-the-Power-Systems-of-Ireland-and-Northern-Ireland.pdf
- Retrieved: 2026-09-06
- Query run: "EirGrid minimum inertia requirement GWs system non-synchronous penetration limit"
- Supports: claim 4 (a minimum-inertia requirement a system operator actually
  publishes, and one that is in force now, not proposed), and claim 5
  (synthetic inertia timescale).
- Summary: This is EirGrid's own operating slide deck, dated March 2024,
  stating its current operational requirements for the Ireland and Northern
  Ireland synchronous area:
  - "Minimum Synchronous Area Inertia: 23,000 MVA.s"
  - "Maximum Rate of Change of Frequency (RoCoF): +/- 1.0 Hz/s"
  - "Frequency Nadir / Zenith limits: 49.0 Hz / 51.0 Hz"
  - "Minimum number of large synchronous units that must be synchronised: 7
    (currently under trial)"
  - "System Non-Synchronous Penetration limit: 75%"
  EirGrid states its logic directly: "The current inertia floor allows us to
  maintain the theoretical RoCoF below 0.6 Hz/s for loss of the largest
  generation infeed (which is approx. 450 MW / 4000 MVA.s)." Note the unit is
  MVA.s (megavolt-ampere seconds), not MW.s; EirGrid's own slide states
  "Inertia is monitored in real time by summing the inertial contribution
  (Unit MVA rating x H constant) of all on-line synchronous units." On
  synthetic response speed, the deck's own service-timing diagram places
  "FFR" starting "from 150 ms" after the disturbance, ahead of primary
  operating reserve.
- Scope: this is Ireland and Northern Ireland's single synchronous area
  (all-island), current as of March 2024. Do not apply the 23,000 MVA.s
  figure, the 75% SNSP limit, or the 7-unit minimum to any other grid.

## Source 4: NERC, Reliability Standard PRC-029-1 (approved 8 October 2024)

- Title: PRC-029-1, Frequency and Voltage Ride-through Requirements for
  Inverter-based Resources
- URL: https://www.nerc.com/globalassets/standards/approved-standards/prc/prc-029-1.pdf
- Retrieved: 2026-09-06
- Query run: "NERC PRC-029-1 frequency ride-through requirement RoCoF 5 Hz/s inverter-based resources standard text"
- Supports: claim 3 (an actual RoCoF withstand requirement in service, and
  the standard that sets it) and claim 5 (why inverter-based resources need a
  wider tolerance than synchronous plant).
- Summary: Requirement R3 of the approved standard: "Each Generator Owner
  shall ensure the design and operation is such that each IBR meets or
  exceeds Ride-through requirements during a frequency excursion event
  whereby the System frequency remains within the must Ride-through zone
  according to Attachment 2 and the absolute rate of change of frequency
  (RoCoF) magnitude is less than or equal to 5 Hz/second, unless a documented
  hardware limitation exists." A footnote defines the calculation: "Rate of
  change of frequency (RoCoF) is calculated as the average rate of change for
  multiple calculated system frequencies for a time period of greater than or
  equal to 0.1 second. RoCoF is not calculated during the fault occurrence
  and clearance." Attachment 2's frequency ride-through table (Table 3):
  above 61.8 Hz, may trip; 58.8 to 61.2 Hz, continuous operation; below 57.0
  Hz, may trip; between 58.8 and 61.2 Hz on either side of that band, a
  minimum ride-through time of 299 seconds applies. This is a mandatory,
  approved reliability standard (Board of Trustees approval 8 October 2024),
  not a proposal, though the technical rationale document (a companion
  filing) notes phased compliance dates for existing versus new resources.
- Scope: this is a North American Bulk Electric System standard for
  inverter-based resources specifically (wind, solar PV, battery storage,
  fuel cells). It does not set a RoCoF requirement for synchronous
  generators, and it is not the standard cited elsewhere in the paper for
  Australia or the United Kingdom.

## Source 5: ENA Engineering Recommendation G99 and UK distribution network operator compliance pages

- Title: Engineering Recommendation G99, Issue 2 (amendment history); "A
  year since the last blackout, National Grid tells small generators to
  act" (theenergyst.com); "Loss of Mains protection requirements" (UK
  Power Networks)
- URL: https://dcode.org.uk/assets/250307ena-erec-g99-issue-2-(2025).pdf ;
  https://theenergyst.com/a-year-since-the-last-blackout-national-grid-tells-small-generators-to-act/ ;
  https://www.ukpowernetworks.co.uk/new-electricity-connections/distributed-energy-resources-der-generation/loss-of-mains-protection-requirements
- Retrieved: 2026-09-06
- Query run: "UK National Grid RoCoF loss of mains relay setting change 0.125 Hz/s to 1 Hz/s"; "Engineering Recommendation G99 RoCoF setting 1 Hz/s vector shift National Grid ESO"
- Supports: claim 3, with the correction in WARNING 2.
- Summary: G99's own amendment log (Issue 2, 10 March 2025) records: "G99/1-1
  23 Jul 2018 Housekeeping modification. 1. To implement the Authority's
  decision on DC0079, ie to disallow the use of VS protection and to provide
  new RoCoF requirements for type tested generation." The industry account
  (theenergyst.com, August 2020, reporting National Grid ESO's own public
  statements) states: "Rules around loss of mains protection state that
  vector shift protection systems can no longer be used by small generators.
  Systems must be changed to Rate of Change of Frequency (RoCoF) protection.
  Meanwhile, RoCoF protection requirements have been changed from 0.125 Hz/s
  to 1 Hz/s with a definite time delay of 500 milliseconds, buying time and
  improving resilience during frequency deviations." UK Power Networks, a
  distribution network operator, states the retrofit deadline for existing
  plant: "(RoCoF) setting of 1 HZ/s with a definite time delay of 0.5s
  retrospectively to all generation <50MW. Generation owners were given 3
  years to check their Loss of Mains (LoM) protection settings and where not
  compliant, take action to meet compliance by 31 August 2022." This is a
  completed, in-service retrofit for the covered population (small
  generation, under 50 MW), not a pending proposal, and the 31 August 2022
  date is the compliance deadline, so the change should be described as in
  service from that date, not from the original 2018 rule change date.

## Source 6: legacy 0.125 Hz/s relays still on the GB system

- Title: Security & Quality of Supply Standards, Frequency Risk and Control
  Policy (National Grid ESO / NESO); "The Power of Commitment: System Rate of
  Change of Frequency" (AEMC)
- URL: https://www.neso.energy/document/183426/download ; https://www.aemc.gov.au/media/100483
- Retrieved: 2026-09-06
- Query run: "Engineering Recommendation G99 RoCoF setting 1 Hz/s vector shift National Grid ESO"
- Supports: WARNING 2 directly.
- Summary: The GB system operator's own policy document states: "The most
  sensitive RoCoF protection on the GB system is set at 0.125Hz/s, with
  little to no minimum duration threshold. There are further tranches of
  RoCoF relays at other thresholds." This is not a description of a fully
  superseded setting; it describes relays still in service. The AEMC's own
  November 2022 report on RoCoF corroborates the same point from the other
  side of the requirement: "generation is required to ride through RoCoF
  events provided the RoCoF does not exceed 1 Hz/s over a 500 ms period.
  However, National Grid ESO notes that some legacy wind farms have lower
  RoCoF ride through capability." Read together with Source 5, the accurate
  statement is: new and retrofitted small generation in Great Britain must
  withstand 1 Hz/s for 500 ms, but the GB system as a whole still carries
  older protection, including relays as sensitive as 0.125 Hz/s, that has not
  been universally changed.
- Retrieval note: the NESO document would not extract directly through a URL
  fetch in this session; the quoted text above is the passage returned by the
  search tool's own full-text extraction of that document, which I read and
  am reporting as retrieved, not as a paraphrase of a snippet I did not see.

## Source 7: Basakarad et al., "ROCOF importance in electric power systems with high renewables share" (2020)

- Title: ROCOF importance in electric power systems with high renewables
  share: A simulation case for Croatia
- URL: https://windlips.com/wp-content/uploads/2021/04/ROCOF_final.pdf
- Retrieved: 2026-09-06
- Query run: "swing equation RoCoF formula df/dt power imbalance system inertia H"
- Supports: claim 2, the RoCoF relation itself, with symbol definitions from
  a real, citable academic source (Faculty of Electrical Engineering and
  Computing, University of Zagreb, with the Croatian transmission system
  operator HOPS as a co-author affiliation).
- Summary: the paper gives the theoretical maximum RoCoF following a
  disturbance as:

      ROCOF_max (at t = 0+) = df/dt = Pk / (2 * sum(Hi * Si, i=1..N, i != k) / fn)

  where "fn is the nominal frequency [Hz], Pk is the size of disturbance
  [MW], Hi is the inertia constant of the ith generator [s], Si is the
  nominal power of the ith generator [MVA]. Pk represents the disconnection
  of either a generator or load." This is the same relation the paper under
  revision states informally as "RoCoF = (dP x f0) / (2 x H x S)"; this
  source gives it with a real derivation and named variables, and states
  plainly that measured RoCoF is usually lower than this theoretical maximum
  because "frequency measurement inevitably involves a signal filtering
  process," and that measured RoCoF depends heavily on the measurement window
  length used.

## Source 8: AEMO, Fast Frequency Response in the NEM (2017); AEMO, Quantifying Synthetic Inertia of a Grid-forming BESS (September 2024)

- Title: Fast Frequency Response in the NEM, Working Paper (Future Power
  System Security Program); Quantifying Synthetic Inertia of a Grid-forming
  Battery Energy Storage System, Technical Note
- URL: https://www.aemo.com.au/-/media/files/electricity/nem/security_and_reliability/reports/2017/ffr-working-paper.pdf ; https://www.aemo.com.au/-/media/files/initiatives/engineering-framework/2024/quantifying-synthetic-inertia-from-gfm-bess.pdf
- Retrieved: 2026-09-06
- Query run: "AEMO fast frequency response synthetic inertia response time seconds battery"
- Supports: claim 5, the response-time part.
- Summary: AEMO's own working definition of fast frequency response (FFR):
  "FFR generally refers to the delivery of a rapid active power increase or
  decrease by generation or load in a timeframe of two seconds or less, to
  correct a supply-demand imbalance and assist in managing power system
  frequency." The 2024 technical note distinguishes synthetic inertia from
  FFR by mechanism rather than only by speed: "Unlike synchronous inertial
  response, which is the inertial response from stored kinetic energy in the
  rotating mass of a machine that is electro-magnetically coupled to the
  power system, synthetic inertial response from a GFM BESS is dependent on
  the control system logic, inverter design and configuration," and states
  the methodology is "based on the power system swing equation." I did not
  extract a single AEMO-stated millisecond figure for synthetic inertia
  response time from these two documents; the closest sourced figure for
  sub-second response in this file is EirGrid's FFR service starting "from
  150 ms" (Source 3), which is a different grid and a different service
  definition, so do not merge the two numbers.

## Source 9: AEMO letter to ESCOSA on RoCoF ride-through standards for South Australian wind farms (December 2016)

- Title: AEMO letter to ESCOSA (Essential Services Commission of South
  Australia), Inquiry into Wind Farm and Inverter Generation, initial advice
- URL: https://www.escosa.sa.gov.au/ArticleDocuments/1046/20161202-Inquiry-InitialAdvice_WindFarmAndInverterGeneration-AEMOLetter.pdf.aspx
- Retrieved: 2026-09-06
- Query run: "South Australia 2016 blackout RoCoF value measured Torrens Island 4.16pm frequency trace"
- Supports: corroborates Source 1's RoCoF-to-time table with the actual
  registration standard applied to the wind farms involved in the 2016 event.
- Summary: AEMO's letter, dated in the period immediately following the
  event, states the two applicable National Electricity Rules ride-through
  standards for connected generation: "automatic standard, the RoCoF is
  outside the range of -4 Hz to 4 Hz per second for more than 0.25 seconds or
  for the minimum standard, -1 Hz to 1 Hz per second for more than one
  second." These durations, 0.25 seconds at 4 Hz/s and 1 second at 1 Hz/s,
  match exactly the "Time to reach 49 Hz" values in AEMO's 2018 Inertia
  Requirements Methodology Table 1 (Source 1), which is a useful internal
  consistency check: the standard and the planning table agree with each
  other.
- Scope: this letter concerns the automatic access standard and minimum
  access standard that applied to specific South Australian wind farms under
  the NER at the time, not a general NEM-wide relay setting.

## Gaps: what could NOT be sourced

1. **AEMO's own stated 6.1 Hz/s RoCoF for the 2016 South Australia event was
   not found.** See WARNING 1. The AEMO final report's RoCoF-specific
   passage did not extract in this session; someone needs to open the report
   directly (or its section on frequency performance) and quote whatever
   figure, if any, appears there.
2. **Per-region minimum threshold and secure operating levels of inertia in
   MWs for the NEM were not extracted.** AEMO's Inertia Requirements
   Methodology contains these in Appendices A through E (Source 1), but the
   appendix pages did not extract. A more recent AEMO Inertia Report (2022 or
   later) likely restates current figures and should be opened directly.
3. **ERCOT's critical inertia figure is contested between secondary
   sources and was not confirmed against ERCOT's own document text.** One
   secondary source states ERCOT's critical inertia is 100 GWs; an academic
   paper citing ERCOT states 105 GWs. ERCOT's own 2018 whitepaper URL was
   fetched but the specific numeric passage did not return in this session.
   Do not publish either number as ERCOT's own figure without opening
   ERCOT's current inertia methodology document directly.
4. **No single, national, NEM-wide UFLS relay setting in Hz was found.**
   AEMO coordinates UFLS but individual Network Service Providers set the
   actual relay thresholds and stages for their networks; no consolidated
   national table was located. The one concrete staged UFLS schedule found
   in this research is Germany's ENTSO-E-area FNN standard: 49.0 Hz shed
   about 12.5% of load, 48.8 Hz a further 12.5%, 48.6 Hz a further 12.5%,
   48.4 Hz a further 12.5%, and 47.5 Hz separates generation from the grid
   entirely. That is Germany's continental European synchronous area, not
   the NEM, the GB system, or ERCOT, and must not be presented as any of
   those systems' figures if it is used at all.
5. **AEMO's own millisecond figure for synthetic inertia or fast frequency
   response delivery speed was not found.** See Source 8. AEMO defines FFR's
   outer bound as two seconds or less but no AEMO-stated lower-bound response
   time comparable to EirGrid's 150 ms figure was located.
6. **The paper's generic claim that "the AEMO standard for RoCoF tolerance is
   1.0 Hz/s" was not independently verified as a single stated NEM-wide
   figure.** Source 9 shows two different standards (4 Hz/s automatic, 1
   Hz/s minimum) applying to specific connected plant, not one uniform
   system-wide tolerance value. Treat "1.0 Hz/s" as the minimum access
   standard specifically, not as AEMO's only RoCoF figure.
