# q3 — Alarm-management standards and control-room human factors: what a system sonifying operator/team state must respect or build on

Research date: 2026-09-11. Method: 8 web searches, 6 page fetches (IEC webstore, IEC 62682:2022 sample, EEMUA news release, IChemE Hazards 25 paper, HSE COMAH case page, HSE CHIS6 information sheet). Everything not seen on a fetched page is marked UNVERIFIED; figures I could not confirm on a fetched page are stated as such even where they are widely repeated in secondary literature.

## Findings

### 1. ANSI/ISA-18.2-2016 — Management of Alarm Systems for the Process Industries

**Status and lineage.** ISA-18.2 was first issued in 2009 and revised in 2016. IEC 62682 edition 1 (2014) "was adapted from ANSI/ISA-18.2-2009", and IEC 62682 edition 2 (2022) "has incorporated some changes made in ANSI/ISA-18.2-2016" [IEC62682-2022-sample, VERIFIED, foreword]. ISA-18.2 therefore functions as the US national standard and the de facto source text for the international one; the two are intended to be substantively aligned (see §2).

**Alarm philosophy and lifecycle.** The standard is organised around an alarm-management lifecycle. IEC 62682:2022 clause 5.2 "Alarm management life cycle" covers "models, stages, entry points, and stage inputs/outputs (referenced in Table 1)" [IEC62682-2022-sample, VERIFIED]. The stage names commonly listed for ISA-18.2 (Philosophy, Identification, Rationalization, Detailed Design, Implementation, Operation, Maintenance, Monitoring & Assessment, Management of Change, Audit — stages A to J) are UNVERIFIED in this session (not seen on a fetched page). The *alarm philosophy* document is the governing artefact: it sets the site's definitions, priority scheme, HMI conventions, performance targets and roles. Any new auditory channel introduced into a control room would, under this framework, have to be (a) declared in the alarm philosophy, (b) rationalised so it is not itself an "alarm" unless it meets the definition (an alarm requires an operator response), and (c) covered by monitoring/assessment and management-of-change. [Interpretation; the philosophy-document requirement itself is UNVERIFIED as clause text.]

**Alarm-rate benchmarks.** The benchmark figures the question lists are widely reproduced as ISA-18.2 Table (2016 edition: commonly cited as Table 4/Table 5, "Recommended alarm performance metrics summary"), roughly: average annunciated alarms per operator ~150/day "very likely to be acceptable" and ~300/day "maximum manageable"; ~6/hr and ~12/hr; ~1 and ~2 per 10 minutes; peak ~10 alarms per 10 minutes; percentage of 10-minute periods containing >10 alarms ~<1%; percentage of time in flood ~<1%; priority distribution ~80% low / 15% medium / 5% high (three-priority scheme); stale alarms <5; chattering/fleeting alarms zero. **I did not see this table on any fetched page; the ISA-18.2-2016 table number, wording and every figure above are UNVERIFIED.** What *is* verified:

- IEC 62682:2022 contains "Table 5 ('Average alarm rates') at page 83 and Table 7 ('Recommended alarm performance metrics summary') at page 87" [IEC62682-2022-sample, VERIFIED, table of contents only — contents of the tables not visible].
- HSE Chemicals Information Sheet No 6, *Better alarm handling* (printed 3/00), citing EEMUA 191, states: "the long-term average alarm rate during normal operation should be no more than one every ten minutes; and no more than ten displayed in the first ten minutes following a major plant upset" and "Prioritise proportionately, eg 5% high priority, 15% medium, and 80% low." [HSE-CHIS6, VERIFIED]. The "1 per 10 minutes" and "10 in 10 minutes" figures thus trace to EEMUA/HSE guidance from 1999–2000 and were carried into ISA-18.2 and IEC 62682.

**Flood definition.** The ">10 alarms in a 10-minute period per operator" alarm-flood definition is the standard industry formulation and matches the HSE/EEMUA "ten in the first ten minutes" figure above, but the ISA-18.2 clause text defining "alarm flood" was not seen [UNVERIFIED as clause text; HSE-CHIS6 figure VERIFIED].

**Time to respond.** ISA-18.2/IEC 62682 rationalisation requires documenting, for each alarm, the consequence, the operator action, and the time available to respond (the "allowable response time" / "time to respond" concept, used to set priority together with severity of consequence). The IEC 62682:2022 sample lists Clause 3 (terms and definitions) in the contents but the definitions of "time to respond", "alarm flood", "annunciated alarm rate" and "alarm philosophy" were not in the visible excerpt [UNVERIFIED as definitions; VERIFIED that Clause 3 exists]. HSE CHIS6 says alarms should have "a simple well-defined operator response" and allow "enough time for the operator to respond" but gives no quantified timeframes [HSE-CHIS6, VERIFIED].

### 2. IEC 62682 — 2014 and 2022

- IEC 62682:2022, edition 2.0, published 2022-12-08, 168 pages, committee TC 65/SC 65A "System aspects"; scope: "specifies general principles and processes for the management of alarm systems based on controls system and human-machine interfaces (HMI) for facilities in the process industries", covering BPCS, annunciators, packaged systems and SIS across continuous, batch and discrete processes [IEC-webstore, VERIFIED].
- Foreword: "The first edition of this document was adapted from ANSI/ISA-18.2-2009 ... This second edition has incorporated some changes made in ANSI/ISA-18.2-2016." Development noted alignment with EEMUA Publication 191 and NAMUR NA 102 [IEC62682-2022-sample, VERIFIED].
- A Commented Version (CMV) exists with "significant and extensive comments explaining the main changes to the publication" [IEC-webstore, VERIFIED]. The specific technical deltas from 2014 were not visible [UNVERIFIED].
- Adoptions: BS EN IEC 62682:2022 exists [search result title, VERIFIED existence only].
- Implication: the 2022 edition supersedes 2014; a treatise should cite IEC 62682:2022 as current and ISA-18.2-2016 as the aligned US source (a further ISA-18.2 revision may be in progress — UNVERIFIED, not searched).

### 3. EEMUA 191 — *Alarm Systems: A Guide to Design, Management and Procurement*

- First published 1999; "has become the globally accepted and leading guide to good practice for alarm management"; issued "with the endorsement of the GB Health and Safety Executive"; third edition launched 05 June 2013 [EEMUA-news, VERIFIED].
- Lineage: the Alarm Usefulness Questionnaire (AUQ) "first appeared in the 1997 HSE report *The Management of Alarm Systems* by Bransby and Jenkinson" and was subsequently incorporated into EEMUA 191 (first edition 1999, second 2007, third 2013) [Atkinson-2015, VERIFIED]. EEMUA 191 ed.1 "added a target value for the weighted usefulness score generated from the AUQ of less than 2.0", described as "an 'empirical value based on industrial experience rather than fundamental theory'" [Atkinson-2015, VERIFIED, p.5].
- **Edition 4 exists (November 2024)**: EEMUA hosts a document titled "Contents – EEMUA Publication 191 Edition 4 – November 2024" [eemua.org URL title, VERIFIED existence only; contents not fetched]. A 2025 IChemE Hazards 35 paper "Alarm management – update to EEMUA 191" (abrisk.co.uk) discusses the update [search result, VERIFIED existence only]. **A treatise citing "edition 3, 2013" as current would be out of date.**
- Milford Haven origin: HSE's post-incident programme (Bransby & Jenkinson 1997 → CHIS6 2000 → EEMUA 191) is the causal chain. HSE COMAH case summary of the 24 July 1994 Texaco (Pembroke Cracking Company) event: "Excessive number of alarms in emergency situation reduced effectiveness of operator response" and "Control panel graphics did not provide necessary process overviews"; lessons include a control valve showing open when actually shut, inadequate instrument maintenance, modifications without hazard assessment, poor control-room design, and operators trying to keep the unit running when shutdown was necessary. Report: *The explosion and fires at the Texaco Refinery, Milford Haven, 24 July 1994*, HSE 1997, ISBN 0 7176 1413 1 [HSE-COMAH, VERIFIED]. The famous figure: "In the last 11 minutes before the explosion the two operators had to recognise, acknowledge and act on 275 alarms"; 26 injured; ~£48 million damage [HSE-CHIS6, VERIFIED].
- EEMUA 191's own benchmark table (average alarm rates: <1/10 min "very likely acceptable", 1–2/10 min "manageable", 2–5 "likely over-demanding", 5–10 "very likely over-demanding", >10 "unacceptable"; peak after upset <10 in 10 min) is widely reproduced but was not seen on a fetched page [UNVERIFIED; the "one every ten minutes"/"ten in first ten minutes" endpoints are VERIFIED via HSE-CHIS6].

### 4. ISO 11064 (control centres) and ISO 9241 (human-system interaction)

ISO 11064 *Ergonomic design of control centres* parts, with what I could verify:
- Part 1 Principles for the design of control centres (2000) — UNVERIFIED year.
- Part 2 Principles for the arrangement of control suites (2000) — UNVERIFIED.
- Part 3 Control room layout — ISO 11064-3:1999 [iteh catalogue title, VERIFIED existence].
- Part 4 Layout and dimensions of workstations — ISO 11064-4:2004 and revision ISO 11064-4:2013 / EN ISO 11064-4:2013 [iso.org OBP and iteh/ANSI titles, VERIFIED existence].
- Part 5 Displays and controls (2008) — UNVERIFIED.
- Part 6 Environmental requirements for control centres (2005) — UNVERIFIED.
- Part 7 Principles for the evaluation of control centres — ISO 11064-7:2006 [iteh sample title, VERIFIED existence].
- A technical report ISO/TR 11064-10 is in preparation/published (iteh "ISO PRF TR 11064-10") [VERIFIED existence only; subject not confirmed].
- Applied case study: "A case study of ISO 11064 in control centre design in the Norwegian petroleum industry", *Applied Ergonomics* (ScienceDirect S0003687010000712) [VERIFIED existence].
Relevance: Part 1 mandates a human-centred, iterative design process with operator participation and task analysis; Part 5 governs displays and controls (including auditory signals — UNVERIFIED detail); Part 6 sets environmental (acoustic, lighting, thermal) requirements — any sonification competes with the acoustic environment Part 6 regulates; Part 7 supplies the evaluation framework (verification and validation) a new modality would have to pass. [Interpretation; clause detail UNVERIFIED.]

ISO 9241 (ergonomics of human-system interaction): the relevant parts are ISO 9241-11 (usability: effectiveness, efficiency, satisfaction), ISO 9241-110 (dialogue/interaction principles) and ISO 9241-210 (human-centred design for interactive systems). None fetched [UNVERIFIED]. ISO 9241-210's human-centred design process is the generic process that ISO 11064-1 specialises for control centres.

### 5. Incident evidence of alarm floods and operator overload

- **Milford Haven 1994** — see §3: 275 alarms in 11 minutes for two operators; HSE finding that excessive alarms reduced response effectiveness and that graphics lacked overview [HSE-CHIS6 and HSE-COMAH, VERIFIED].
- **BP Texas City, 23 March 2005** — CSB final report released 20 March 2007 [Houston Public Media headline dated 2007/03/20, VERIFIED date only]. The CSB found a "broken safety culture" [OGJ headline, VERIFIED as headline]. Human-factors findings widely attributed to the report: the board operator was running the ISOM unit plus other units; operators had worked 12-hour shifts for around 29–30 consecutive days (fatigue); the tower level transmitter read incorrectly and the high-level alarm/sight glass were unreliable; the control display did not show material balance — **none of these specifics were seen on a fetched CSB page [UNVERIFIED]**. A CSB recommendation-status document for API/USW (Texas City R7a/R7b) exists at csb.gov and concerns the fatigue-standard recommendation that became API RP 755 [csb.gov URL, VERIFIED existence only]. A Substack "Chemical Safety Board Report: Alarm Flooding" discusses a CSB report on alarm flooding (possibly a later incident) [VERIFIED existence only].
- **Three Mile Island 1979** — the Kemeny Commission (1979) and the NRC's subsequent human-factors programme (NUREG-0700 guidelines, NUREG-0711 review model) are the origin of nuclear control-room HFE requirements; the commonly cited detail that over 100 alarms annunciated in the first minutes with no prioritisation, plus a misleading PORV indicator light, is UNVERIFIED in this session (not searched/fetched).

### 6. Situation awareness — Endsley (1995) and SAGAT

Endsley, M.R. (1995). "Toward a theory of situation awareness in dynamic systems." *Human Factors* 37(1), 32–64. Three levels: perception of elements, comprehension of their meaning, projection of future status; SA is distinct from workload and from performance. SAGAT (Situation Awareness Global Assessment Technique) freezes a simulation and queries operators on all three levels (Endsley 1988, NAECON). [UNVERIFIED — not fetched; standard reference.] Relevance: a sonified "team state" would be a Level-2/Level-3 aid only if it conveys *meaning* and *projection*, and its validation would naturally use SAGAT-style freeze probes in a simulator (the nuclear ISV literature already does this).

### 7. Wickens' Multiple Resource Theory (2002, 2008)

Wickens, C.D. (2002). "Multiple resources and performance prediction." *Theoretical Issues in Ergonomics Science* 3(2), 159–177. Wickens (2008). "Multiple resources and mental workload." *Human Factors* 50(3), 449–455. [UNVERIFIED — not fetched.] The 4-D model (stages, codes, modalities, visual channels) predicts that a visually loaded operator has spare auditory-modality capacity, so an auditory display can add information with less interference than a further visual display — *but* (a) auditory resources are shared with the existing alarm horn/annunciation and with verbal team communication, (b) spatial-vs-verbal code matters (a non-verbal earcon/sonification competes less with speech than a spoken message does), and (c) the model predicts time-sharing cost, not benefit, and says nothing about whether the operator will *attend*. This is the principal theoretical basis for—and the principal caveat on—sonifying state in a control room. [Interpretation of an UNVERIFIED but canonical source.]

### 8. NASA-TLX (Hart & Staveland 1988)

Hart, S.G. & Staveland, L.E. (1988). "Development of NASA-TLX (Task Load Index): results of empirical and theoretical research." In Hancock & Meshkati (eds), *Human Mental Workload*, North-Holland, pp. 139–183. Six subscales (mental, physical, temporal demand; performance; effort; frustration). Hart (2006) "NASA-TLX: 20 years later" reviews use. [UNVERIFIED — not fetched.] NASA-TLX is a *post-hoc subjective* instrument; it is the standard criterion against which physiological real-time workload measures (§11) are validated, and the nuclear MCR validation study below uses it alongside physiological measures.

### 9. IEC 62443-2-1 / ISA-62443 — personnel and organisational elements

IEC 62443-2-1:2024 *Security for industrial automation and control systems — Part 2-1: Security program requirements for IACS asset owners* exists (IEC webstore publication 62883; ANSI/ISA-62443-2-1-2024; BS EN IEC 62443-2-1:2024; EN IEC 62443-2-4:2024 is the companion for service providers) [search titles, VERIFIED existence; contents UNVERIFIED]. The 2009 first edition organised its requirements into organisational elements including personnel security, training and awareness [UNVERIFIED]. Relevance for a system that senses operator psychological state: it creates a new class of sensitive personal data inside the IACS boundary, a new network-connected sensor endpoint, and a new insider-risk signal — all of which fall under the asset owner's security program (personnel security, access control, data handling) rather than under alarm management. No fetched source addresses biometric/psychological data in IACS [gap].

### 10. Operator response time, SRK and error taxonomy

- ISA-18.2/IEC 62682 "time to respond" (allowable response time) is the alarm-level concept (see §1) [UNVERIFIED as definition text].
- Rasmussen, J. (1983). "Skills, rules, and knowledge; signals, signs, and symbols, and other distinctions in human performance models." *IEEE Trans. Systems, Man & Cybernetics* SMC-13(3), 257–266. Skill-, rule-, knowledge-based behaviour; alarms as *signs* triggering rule-based response; floods push operators into slow knowledge-based reasoning. [UNVERIFIED — canonical.]
- Reason, J. (1990). *Human Error*. Cambridge University Press. Slips/lapses (skill-based), rule-based and knowledge-based mistakes, violations; GEMS; latent vs active failures (the "Swiss cheese" model, later formalised in Reason 1997 *Managing the Risks of Organizational Accidents*). [UNVERIFIED — canonical.]
- Atkinson, T. (2015). "Measuring the human response to alarms." IChemE Hazards 25, Symposium Series 160 — discusses reliability of subjective usefulness ratings (AUQ); "contains no quantitative response-time data" [Atkinson-2015, VERIFIED]. A companion Hazards 25 paper 68 "Development of an alarm analysis process..." exists [VERIFIED existence only].

### 11. Real-time measurement of operator stress/workload in control rooms (physiological sensing)

Verified to exist (titles/venues from search results; contents not fetched unless stated):
- "Workload measurement using physiological and activity measures for validation test: A case study for the main control room of a nuclear power plant", ScienceDirect S0169814120301670 (*International Journal of Industrial Ergonomics*, 2020) — combines physiological measures with activity measures in an ISV context [VERIFIED existence].
- "Determining Cognitive Workload Using Physiological Measurements: Pupillometry and Heart-Rate Variability", *Sensors* 24(6):2010 (2024), doi:10.3390/s24062010 [VERIFIED existence].
- "Detection of Operator Fatigue in the Main Control Room of a Nuclear Power Plant Based on Eye Blink Rate, PERCLOS and Mouse Velocity", *Applied Sciences* 13(4):2718 (2023), doi:10.3390/app13042718 [VERIFIED existence].
- "Evaluating Operators' Real-Time Mental Workload with Eye Movement Analysis in Nuclear Power Plants' Operations", ASCE proceedings, doi:10.1061/9780784483893.178 [VERIFIED existence].
- Idaho National Laboratory: "Application of eye tracking for measurement and evaluation in human factors studies in control room modernization"; and INL/EXT-15-37311 (Light Water Reactor Sustainability Program report) [VERIFIED existence].
- "Systematic review of neurophysiological assessment techniques and metrics for mental workload evaluation in real-world settings", *Frontiers in Neuroergonomics* 2025, doi:10.3389/fnrgo.2025.1584736 [VERIFIED existence].
- "Workload Associated with Nuclear Power Plant Main Control Room Tasks" and "Workload from Nuclear Power Plant Task Types Across Repeated Sessions" (ResearchGate listings) [VERIFIED existence only].
- Fernandes et al. (2017), HFES Europe: "Using eye tracking to explore design features in nuclear control room interfaces" [VERIFIED existence].
Regulatory frame: NUREG-0700 (*Human-System Interface Design Review Guidelines*, Rev. 3, 2020) and NUREG-0711 (*Human Factors Engineering Program Review Model*, Rev. 3, 2012) govern nuclear HSI design/review; NUREG/CR-6947 (2008, O'Hara et al., *Human Factors Considerations with Respect to Emerging Technology in Nuclear Power Plants*) and NUREG/CR-6684 (2000, *Advanced Alarm Systems: Revision of Guidance and its Technical Basis*) are the alarm/emerging-tech technical bases — **all titles, revision numbers and years UNVERIFIED in this session** (not fetched). Chemical-sector and electricity-grid control-centre real-time physiological studies were not found in the searches run [gap].

Pattern across the verified-to-exist literature: physiological workload sensing in control rooms is used (i) offline in integrated system validation of new HSIs, (ii) in simulator research, and (iii) increasingly for fatigue detection; I found no source describing physiological or psychological state being fed back to the operating crew in real time via any modality, auditory or otherwise.

## What an engineering treatise can legitimately say

- The auditory channel in a control room is already a *regulated* channel: ISA-18.2-2016 / IEC 62682:2022 and EEMUA 191 (ed.4, Nov 2024) reserve it for annunciated alarms that require a defined operator response within a defined time, and measure its load against benchmarks whose verified endpoints are "no more than one [alarm] every ten minutes" in normal operation and "no more than ten displayed in the first ten minutes following a major plant upset" (HSE CHIS6, citing EEMUA 191). A state-sonification must be classified in the site's alarm philosophy as *not an alarm* (no required response) and must not raise the annunciated rate or mask alarm audibility.
- Alarm floods are causally implicated in real accidents: HSE's finding that at Milford Haven "the two operators had to recognise, acknowledge and act on 275 alarms" in the last 11 minutes, and that "excessive number of alarms in emergency situation reduced effectiveness of operator response". Any added auditory stream therefore has to degrade gracefully—preferably go silent—during floods, which is exactly when a stress signal would be most informative and least usable.
- Wickens' Multiple Resource Theory gives a principled reason to prefer auditory over additional visual presentation for a visually saturated operator, but the same theory predicts interference with alarm sounds and crew speech; the treatise can claim *reduced* cross-modal cost, not *zero* cost, and should distinguish non-verbal sonification (spatial/tonal code) from spoken messages (verbal code). Cite Wickens 2002/2008 as theory, not as evidence for this application.
- Endsley's three-level SA model and SAGAT provide the validation method; ISO 11064-7 provides the control-centre evaluation framework and ISO 11064-1 / ISO 9241-210 the human-centred process; NASA-TLX is the accepted subjective workload criterion. A treatise can lay out this validation stack as established practice.
- Real-time physiological workload/fatigue sensing (HRV, pupillometry, EDA, blink rate/PERCLOS, eye tracking) in nuclear main control rooms is an active published research area (IJIE 2020; Sensors 2024; Applied Sciences 2023; ASCE; INL LWRS reports; Frontiers Neuroergonomics 2025 review). The treatise can say measurement is established in simulator/validation settings; it cannot say closed-loop feedback to the crew is established.
- Alarm management standards contain no concept of operator-state signalling; ISA-18.2/IEC 62682's "time to respond", Rasmussen's SRK and Reason's taxonomy describe how operators respond to *process* signals, and the treatise should present psychological-state sonification as an extension outside current standards, subject to management-of-change and to IEC 62443-2-1 security-program obligations for the new sensor data.
- Do not cite EEMUA 191 ed.3 (2013) or IEC 62682:2014 as current; cite EEMUA 191 ed.4 (Nov 2024) and IEC 62682:2022 (ed.2, 2022-12-08, 168 pp., TC 65/SC 65A).

## Gaps

- ISA-18.2-2016 benchmark table: table number, wording and figures not verified from the standard itself (paywalled); only the HSE/EEMUA endpoints (1/10 min; 10 in first 10 min; 5/15/80 priority split) are verified. IEC 62682:2022 Tables 5 and 7 verified as existing at pp. 83/87, contents not seen.
- ISA-18.2 lifecycle stage list, alarm-flood definition, and "time to respond" definition not verified as clause text.
- EEMUA 191 ed.4 (2024) contents and any changed benchmarks: not fetched.
- CSB Texas City report specifics (fatigue days, staffing, instrumentation) not verified from csb.gov; only the 20 March 2007 release date.
- TMI human-factors findings (Kemeny/Rogovin, alarm counts) not searched.
- NUREG-0700/0711 revision numbers and NUREG/CR-6947, NUREG/CR-6684 titles/years not verified.
- Endsley 1995, Wickens 2002/2008, Hart & Staveland 1988, Rasmussen 1983, Reason 1990 DOIs not verified on a fetched page (canonical references, given from memory).
- IEC 62443-2-1:2024 content on personnel security not verified; no source found addressing biometric/psychological operator data in IACS security programs.
- No chemical-sector or electricity-grid control-centre real-time physiological studies surfaced in the searches run; no source found on auditory feedback of operator state to crews.
- ISO 11064 parts 1, 2, 5, 6 years and ISO 9241 part details not verified.

## Sources

- IEC (2022). *IEC 62682:2022, Management of alarm systems for the process industries*, ed. 2.0, 2022-12-08, 168 pp., TC 65/SC 65A. https://webstore.iec.ch/en/publication/65543 — VERIFIED [IEC-webstore]
- IEC (2022). IEC 62682:2022 Commented Version sample (foreword, contents). https://cdn.standards.iteh.ai/samples/103485/6f7b44e368fc4f4d93216f716a51771a/IEC-62682-2022.pdf — VERIFIED [IEC62682-2022-sample]
- ISA (2016). *ANSI/ISA-18.2-2016, Management of Alarm Systems for the Process Industries*. isa.org — UNVERIFIED (not fetched; benchmark table not seen)
- EEMUA (2013). "Better alarms handling: EEMUA launches new edition of industry's guidelines on alarm management", 05 Jun 2013. https://www.eemua.org/news/better-alarms-handling — VERIFIED [EEMUA-news]
- EEMUA (2024). *Publication 191 Edition 4, November 2024* — contents PDF. https://www.eemua.org/getattachment/9d3f8071-55c3-49bf-a74a-3bf6ad4a2e0f/Contents-EEMUA-Publication-191-Edition4-November-2024.pdf — VERIFIED existence only
- Health and Safety Executive (1997). *The explosion and fires at the Texaco Refinery, Milford Haven, 24 July 1994*. HSE Books, ISBN 0 7176 1413 1 — reference VERIFIED via HSE COMAH page
- Health and Safety Executive. COMAH case study: "The explosion and fires at the Texaco Refinery, Milford Haven. 24th July 1994". https://www.hse.gov.uk/Comah/sragtech/casetexaco94.htm — VERIFIED [HSE-COMAH]
- Health and Safety Executive (2000). *Better alarm handling*, Chemicals Information Sheet No 6 (CHIS6), 3/00. https://humanfactors101.com/wp-content/uploads/2016/04/better-alarm-handling.pdf (mirror of HSE document) — VERIFIED [HSE-CHIS6]
- Bransby, M.L. & Jenkinson, J. (1998/1997). *The Management of Alarm Systems*. HSE Contract Research Report 166 — cited in Atkinson 2015; UNVERIFIED as to report number
- Atkinson, T. (2015). "Measuring the Human Response to Alarms." IChemE Hazards 25, Symposium Series No. 160. https://www.icheme.org/media/8535/xxv-paper-66.pdf — VERIFIED [Atkinson-2015]
- IChemE Hazards 25 paper 68, "Development of an alarm analysis process for use within..." https://www.icheme.org/media/8537/xxv-paper-68.pdf — VERIFIED existence only
- IChemE Hazards 35 (2025). "Alarm management – update to EEMUA 191" (abrisk.co.uk). https://abrisk.co.uk/wp-content/uploads/2025/12/2025-Hazards-35-Alarm-Management-EEMUA-191-update.pdf — VERIFIED existence only
- ISO. ISO 11064-3:1999; ISO 11064-4:2004 and :2013; ISO 11064-7:2006; ISO/TR 11064-10 (PRF). https://www.iso.org/obp/ui#iso:std:iso:11064:-4:ed-1:en ; https://cdn.standards.iteh.ai/samples/22470/3fd252578510480087147e303fa4c697/ISO-11064-7-2006.pdf — VERIFIED existence only
- ISO 11064-1, -2, -5, -6; ISO 9241-11, -110, -210 — UNVERIFIED
- Applied Ergonomics. "A case study of ISO 11064 in control centre design in the Norwegian petroleum industry". https://www.sciencedirect.com/science/article/abs/pii/S0003687010000712 — VERIFIED existence only
- U.S. CSB (2007). *Investigation Report: Refinery Explosion and Fire, BP Texas City, March 23, 2005*, Report No. 2005-04-I-TX, released 20 March 2007 — release date VERIFIED via https://www.houstonpublicmedia.org/articles/news/2007/03/20/6469/csb-releases-final-report-on-2005-bp-texas-city-refinery-explosion-2/ ; report number and findings UNVERIFIED
- U.S. CSB. Recommendation status change summary, API and USW (BP Texas City R7a/R7b). https://www.csb.gov/assets/recommendation/status_change_summary_api_and_usw_(bp_texas_city_r7a_and_r7b)_c-aa.pdf — VERIFIED existence only
- Kemeny Commission (1979). *Report of the President's Commission on the Accident at Three Mile Island* — UNVERIFIED
- U.S. NRC. NUREG-0700 Rev. 3 (2020); NUREG-0711 Rev. 3 (2012); NUREG/CR-6947 (2008); NUREG/CR-6684 (2000) — UNVERIFIED
- Endsley, M.R. (1995). "Toward a theory of situation awareness in dynamic systems." *Human Factors* 37(1):32–64. doi:10.1518/001872095779049543 — UNVERIFIED
- Endsley, M.R. (1988). "Situation awareness global assessment technique (SAGAT)." Proc. NAECON — UNVERIFIED
- Wickens, C.D. (2002). "Multiple resources and performance prediction." *Theoretical Issues in Ergonomics Science* 3(2):159–177. doi:10.1080/14639220210123806 — UNVERIFIED
- Wickens, C.D. (2008). "Multiple resources and mental workload." *Human Factors* 50(3):449–455. doi:10.1518/001872008X288394 — UNVERIFIED
- Hart, S.G. & Staveland, L.E. (1988). "Development of NASA-TLX." In Hancock & Meshkati (eds), *Human Mental Workload*, North-Holland, 139–183 — UNVERIFIED
- Rasmussen, J. (1983). "Skills, rules, and knowledge..." *IEEE Trans. SMC* 13(3):257–266 — UNVERIFIED
- Reason, J. (1990). *Human Error*. Cambridge University Press — UNVERIFIED
- IEC (2024). *IEC 62443-2-1:2024, Security program requirements for IACS asset owners*. https://webstore.iec.ch/en/publication/62883 ; ANSI/ISA-62443-2-1-2024 https://www.isa.org/products/ansi-isa-62443-2-1-2024-security-industrial-automa — VERIFIED existence only
- Int. J. Industrial Ergonomics (2020). "Workload measurement using physiological and activity measures for validation test: A case study for the main control room of a nuclear power plant". https://www.sciencedirect.com/science/article/abs/pii/S0169814120301670 — VERIFIED existence only
- Sensors 24(6):2010 (2024). "Determining Cognitive Workload Using Physiological Measurements: Pupillometry and Heart-Rate Variability". https://doi.org/10.3390/s24062010 — VERIFIED existence only
- Applied Sciences 13(4):2718 (2023). "Detection of Operator Fatigue in the Main Control Room of a Nuclear Power Plant Based on Eye Blink Rate, PERCLOS and Mouse Velocity". https://doi.org/10.3390/app13042718 — VERIFIED existence only
- ASCE proceedings. "Evaluating Operators' Real-Time Mental Workload with Eye Movement Analysis in Nuclear Power Plants' Operations". https://ascelibrary.org/doi/10.1061/9780784483893.178 — VERIFIED existence only
- Idaho National Laboratory. "Application of eye tracking for measurement and evaluation in human factors studies in control room modernization". https://inl.elsevierpure.com/en/publications/application-of-eye-tracking-for-measurement-and-evaluation-in-hum-2/ ; INL/EXT-15-37311 https://inldigitallibrary.inl.gov/sites/sti/sti/6899550.pdf — VERIFIED existence only
- Frontiers in Neuroergonomics (2025). "Systematic review of neurophysiological assessment techniques and metrics for mental workload evaluation in real-world settings". https://doi.org/10.3389/fnrgo.2025.1584736 — VERIFIED existence only
- Fernandes et al. (2017). HFES Europe. https://www.hfes-europe.org/wp-content/uploads/2016/11/Fernandes2017.pdf — VERIFIED existence only
- Industry Digits. "Alarm Load Scorer: EEMUA 191 / ISA-18.2 Benchmarks". https://industrydigits.com/resources/alarm-load-scorer/ — secondary, not fetched, UNVERIFIED
- exida. "When Good Alarms Go Bad: Learning from Incidents" white paper. https://www.exida.com.sg/wp-content/uploads/2022/04/When-Good-Alarms-Go-Bad.pdf — secondary, not fetched, UNVERIFIED
- Wikipedia. "IEC 62682". https://en.wikipedia.org/wiki/IEC_62682 — secondary, not fetched
