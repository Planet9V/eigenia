# Citation ledger: MPN-4-MX (Mexico edition of the deployment paper)

Compiled 2026-09-12, revised the same day after the QA review `QA-MPN-4-MX.md` (references renumbered: the UMA source is [11] and every former [n] at or above 11 is now [n+1]), from `/home/claude/mpn-research/q10-mexico-legal-frame.md` (Mexican law), `q2`, `q3`, `q4`, `q6`, `q9` (science and EU law) and the EU edition `MPN-4-deployment.md` (carried references). Status keys: VERIFIED (research ledger fetched and read the text), VERIFIED-secondary (a secondary source was read; the primary was not), UNVERIFIED-canonical (canonical work cited without page numbers or figures), UNVERIFIED (existence or content not confirmed; cited with that caveat in the paper), existence-only (title and DOI/venue confirmed, content not read), corpus (Eigenia working paper), code (repository path).

| [n] | Source | Status | Notes on use |
|:---|:---|:---|:---|
| [1] | RFC 2119 | UNVERIFIED-canonical | Normative keywords only |
| [2] | CC BY 4.0 legal code | UNVERIFIED-canonical | Licence only |
| [3] | MPN-1 (this series) | corpus | F-requirements, data requirements of section 5.6, retractions |
| [4] | MPN-2 (this series) | corpus | N-requirements, state vector, worked examples, validation protocol |
| [5] | MPN-3 (this series) | corpus | E-requirements, reference-implementation findings |
| [6] | MPN-4 EU edition (this series) | corpus | D-1 to D-20, EU legal analysis carried by reference |
| [7] | Regulation (EU) 2024/1689 (AI Act) | Art. 3(34), 3(39), 5(1)(f), Recital 18: VERIFIED (EU edition, q9); Art. 2(1)(a), (c): UNVERIFIED (q10, EUR-Lex fetch blocked) | Paper says Art. 2 is read from knowledge and not re-verified |
| [8] | Commission Guidelines C(2025) 5052 | VERIFIED (q9, EU edition) | Wide reading of "emotions" including arousal |
| [9] | GDPR 2016/679 | Art. 9, 35: VERIFIED (EU edition); Art. 3(1), 3(2), 28, 32: UNVERIFIED (cited from knowledge) | Paper flags these as read from knowledge; controller and processor roles distinguished per QA item 4 |
| [10] | LFPDPPP, DOF 20-03-2025, última reforma 14-11-2025 | VERIFIED (q10; diputados.gob.mx texto vigente) | Spanish quotations of Art. 2 fr. V, VI; Art. 8; Art. 5; Art. 12; Art. 15, 16 fragments; Art. 26 fr. II; Art. 18 fragment; Art. 59 fragments; transitory articles as reported. In-force date 21-03-2025 from KPMG [17]. UMA value NOT verified; no peso figure given |
| [11] | KPMG México, Flash INEGI UMA 2026 (INEGI communiqué 1/26) | VERIFIED-secondary (QA report, section 1) | Daily UMA 117.31 MXN from 1 Feb 2026; 320,000 UMA = 37,539,200 MXN |
| [12] | NOM-035-STPS-2018, DOF 23-10-2018 | VERIFIED (q10; DOF text) | Quotations of objective, 5.6, Guía II/III confidentiality clause; numerals 7.4 to 7.9, 8, 10, 11, 13 as read |
| [13] | Ley Federal del Trabajo, texto vigente reformas al 14-05-2026 | VERIFIED (q10 and QA report; Arts. 2, 3, 3 Bis, 47, 132, 133, 134, 291-J, 305 Bis, 330-I, 423-425, 475 Bis, 994) | Word-absence claim corrected: "inteligencia artificial" occurs in Art. 305 Bis (DOF 14-05-2026, performers' image and voice). Arts. 423 fr. VI, VIII; 424 fr. I, II; 425 cited for the reglamento interior procedure per QA. Art. 992 not used |
| [14] | Barrett et al. 2019, PSPI | VERIFIED (q4; APS page fetched) | Scientific limit on emotion inference; no coefficients quoted |
| [15] | Loeb & Fitch 2002 | VERIFIED (q2; PubMed abstract with numbers) | 10.4 s / 12.8 s / 13.0 s; 60% / 88% identification |
| [16] | Watson & Sanderson 2004 | VERIFIED (q2; SAGE/PubMed record) | Eyes-free monitoring; no effect sizes quoted |
| [17] | KPMG México 2025 flash | VERIFIED-secondary (q10) | Entry into force 21-03-2025 |
| [18] | Chambers Data Protection & Privacy 2026, Mexico | VERIFIED-secondary (q10) | Reglamento gap as of Feb 2026; biometric practice; transfers; no adequacy; cybersecurity status; no AI framework |
| [19] | Sharkit practitioner note, upd. 9 Jul 2026 | VERIFIED-secondary (q10; low-authority blog, so labelled) | Reglamento still unpublished July 2026; 2011 Reglamento supletorio |
| [20] | Reglamento LFPDPPP 2011; Lineamientos Aviso de Privacidad 2013 | UNVERIFIED (dates from knowledge per q10) | Cited as applying supletoriamente per [19]; paper says dates not verified |
| [21] | INAI, Guía para el Tratamiento de Datos Biométricos, 2018 | VERIFIED (q10) | Three sensitivity tests; biometric definition; "pulsación cardíaca"; EIPD recommendation |
| [22] | CPEUM texto vigente, reformas al 02-06-2026 | VERIFIED (q10; Art. 6 A-II, Art. 16) | Art. 16 para. 2 quoted; Art. 73 full text NOT read (paper says header only); horizontal-effect doctrine UNVERIFIED (no tesis fetched; paper says so) |
| [23] | Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados, DOF 20-03-2025 | VERIFIED (QA report read Arts. 1, 2, 3 fr. X, XXVI, XXVII, 15, 68-72) | Art. 3 fr. XXVII sujetos obligados (CENACE covered; CFE/PEMEX flagged as inference); Art. 15 consent; Arts. 68, 69 fr. II, 71 impact evaluation filed 30 days before operation |
| [24] | Ley del Sector Eléctrico, DOF 18-03-2025 | VERIFIED (q10 and QA report; Art. 2 XII, Art. 123, Transitorio Tercero) | Spanish quotations; Transitorio Tercero scoped to the wholesale market's operation per QA |
| [25] | Decreto promulgatorio Convenio 190, DOF 19-06-2023 | VERIFIED (q10; QA could not re-fetch the DOF page, confirmed dates from secondary sources) | Art. 1(1)(a), 9(b) quoted; treaty hierarchy UNVERIFIED; the 15-01-2026 LFT reform is flagged as the working group's inference, not a named C190 implementation |
| [26] | Cadena Política, 23-07-2026 | VERIFIED-secondary (q10) | Senate closed session without floor vote; sectoral laws; the 14-05-2026 performers' reform now VERIFIED in the primary via LFT Art. 305 Bis [13] |
| [27] | Observatorio IA México, rev. 06-09-2026 | VERIFIED-secondary (q10) | LGIA v1 structure; SECIHTI/ATDT; Monreal initiative; Deputies initiatives; observatory's own caveat repeated |
| [28] | Político.mx, 20-04-2026 | VERIFIED-secondary (q10) | Draft reached Senate April 2026 |
| [29] | El Informador/SUN, 07-05-2026 | VERIFIED-secondary (q10) | Chair still arguing for rules in May 2026 |
| [30] | Ley de la Comisión Nacional de Energía, DOF 18-03-2025 | VERIFIED (q10 and QA report; Art. 2, Transitorios Segundo, Tercero) | SCJN invalidity DOF 26-12-2025 identified as Art. 22 fr. III per QA |
| [31] | Reglamento LSE, DOF 03-10-2025 | UNVERIFIED (q10; listed on CENACE site, not read) | Cited as not read |
| [32] | Código de Red 2.0, RES/550/2021, DOF 31-12-2021 | UNVERIFIED (q10) | Cited as not read; no claim about its contents beyond "to the working group's knowledge" |
| [33] | ASEA SASISOPA lineamientos, DOF 13-05-2016 | UNVERIFIED (q10) | MoC implication stated as the working group's unverified understanding |
| [34] | Reyes Gutiérrez, INEEL Transición Energética | VERIFIED (q10) | ISA-18.2 "10 fases"; EEMUA "menos de una (1) alarma por operador cada diez (10) minutos" |
| [35] | ANSI/ISA-18.2-2016 | UNVERIFIED-canonical (q3; benchmark table not read) | Practice reference only; no clause text |
| [36] | IEC 62682:2022 | VERIFIED existence (q3; edition, date, TC); contents not read | Rate metrics by name only |
| [37] | EEMUA 191 ed. 4, Nov 2024 | VERIFIED existence (q3); contents not read | Benchmarks taken from HSE CHIS6 [77] |
| [38] | DPL News 2023 | VERIFIED-secondary (q10) | Ciberseguridad bill contents |
| [39] | OXM Tech 2026 | VERIFIED-secondary, low authority (q10) | Bill still pending 2026 |
| [40] | Regulation (EU) 2026/1744 (Digital Omnibus on AI) | VERIFIED (EU edition) | Did not alter Art. 5(1)(f) |
| [41] | EEAS, modernised Global Agreement, Jan 2025 | UNVERIFIED (q10; not fetched) | Cited as not verified; no adequacy claim |
| [42] | USMCA/T-MEC Ch. 19 | UNVERIFIED (q10) | Cited as the working group's unverified understanding |
| [43] | ISO 7731:2003 | VERIFIED existence (q2; iso.org record) | Audibility requirement by name; no numeric values quoted |
| [44] | Gilfix & Couch 2000, Peep | VERIFIED (q2; fetched) | Soundscape rationale |
| [45] | Lacan in the Control Room (Eigenia) | corpus | Symbolic severance; Imaginary reading withdrawn in MPN-1 |
| [46] | The 20-Second Deficit (Eigenia) | corpus | Interlocks vs human loop; figures illustrative |
| [47] | Lacanian psychohistory framework (Eigenia) | corpus | Discourse-to-threat-actor typology |
| [48] | Gadalla, Nikoletseas & Amazonas 2026, Frontiers in Psychology | VERIFIED (EU edition ledger) | Annotation-reliability precedent; no held-out prediction |
| [49] | NUREG-0711 | UNVERIFIED (q3; revision and clause text not verified) | Observer-rated crew evaluation practice; paper says clause text not verified |
| [50] | Task Force ESC/NASPE 1996, HRV standards | UNVERIFIED-canonical (q4; citation via PubMed record, content not read) | Definitions of standard measures only; no coefficients |
| [51] | Boucsein 2012, Electrodermal Activity | UNVERIFIED-canonical (q4) | EDA indexes sympathetic arousal, unvalenced |
| [52] | Beatty 1982, Psychological Bulletin | UNVERIFIED-canonical (q4; not fetched) | Pupil dilation as load index; luminance confound |
| [53] | IJIE 2020, workload measurement NPP MCR (authors not verified) | existence-only (q3) | Used in simulator validation |
| [54] | Applied Sciences 13(4):2718, 2023, PERCLOS fatigue | existence-only (q3; DOI verified) | Fatigue detection research |
| [55] | Sensors 24(6):2010, 2024, pupillometry and HRV | existence-only (q3; DOI verified) | Cognitive workload research |
| [56] | Frontiers in Neuroergonomics 2025 systematic review | existence-only (q3; DOI verified) | Real-world workload assessment review |
| [57] | Kazi et al. 2021, Human Factors | VERIFIED (EU edition ledger) | Team physiological synchrony heterogeneous and inconsistent |
| [58] | Roma et al. 2012, FAA DOT/FAA/AM-12/12 | VERIFIED (EU edition ledger) | SAFTE field validation, cited by reference to EU edition; no figures repeated here |
| [59] | CASA biomathematical fatigue models guidance (IATA condensed) | VERIFIED (EU edition ledger, condensed version) | Advisory, population-level, not go/no-go |
| [60] | FRA final rule, 87 FR 35660, 13 June 2022 | VERIFIED (EU edition ledger) | No physiological monitoring mandated |
| [61] | ISO 11064-7:2006 | UNVERIFIED-canonical (q3; year not verified) | Evaluation principles by name |
| [62] | ISO 11064-1:2000 | UNVERIFIED-canonical (q3) | Design principles by name |
| [63] | ISO 9241-210 | UNVERIFIED-canonical (q3) | Human-centred design by name |
| [64] | Endsley 1995, Human Factors | UNVERIFIED-canonical (q3; DOI not verified) | SA construct |
| [65] | Endsley 1988, NAECON, SAGAT | UNVERIFIED-canonical (q3) | SAGAT method |
| [66] | Hart & Staveland 1988, NASA-TLX | UNVERIFIED-canonical (q3) | Workload criterion |
| [67] | Wickens 2002, TIES | UNVERIFIED-canonical (q3) | Multiple-resource theory as theory, not evidence |
| [68] | Walker 2002, JEP: Applied | UNVERIFIED (q2) | Magnitude estimation; polarity is empirical |
| [69] | Vickers 2011, Sonification Handbook ch. 18 | VERIFIED (q2; fetched) | No control-room evidence; oximeter tone |
| [70] | Scheffer et al. 2009, Nature | UNVERIFIED-canonical (q6; DOI from memory) | Early-warning indicators and caveats |
| [71] | Dakos et al. 2012, PLoS ONE | VERIFIED (q6 method reference; EU edition ledger) | Estimation method |
| [72] | Kuehn 2011, Physica D | VERIFIED (EU edition ledger) | Indicators and fold lines |
| [73] | van de Leemput et al. 2014, PNAS | VERIFIED DOI (q6); abstract from memory, no numbers quoted | Applied to mood |
| [74] | Wichers et al. 2016, Psychother Psychosom | UNVERIFIED-canonical (q6) | Single-case application |
| [75] | Loui et al. 2014, Frontiers in Human Neuroscience | VERIFIED (EU edition ledger) | Sonified EEG identification only after training |
| [76] | ALE/ROSI Decision Framework (Eigenia) | corpus | Sensitivity result, not measurement |
| [77] | HSE CHIS6, Better alarm handling | VERIFIED (q3) | 275 alarms in 11 minutes; benchmark endpoints |
| [78] | HSE COMAH case study, Texaco Milford Haven | VERIFIED (q3) | Causes quoted |
| [79] | HSE 1997 report, ISBN 0 7176 1413 1 | VERIFIED existence (q3) | Injuries and damage figures |

## Items deliberately not cited or not quoted

- LFT Art. 992 (per-worker fine multiplication): not read; omitted.
- 2011 Reglamento LFPDPPP article numbers for the encargado regime: not read; the paper names the Reglamento without article numbers.
- GDPR Art. 3(2) as applied to the Mexican controller: named as not analysed.
- SCJN jurisprudence on workplace monitoring and horizontal effect: no tesis fetched; stated as the working group's understanding without citation.
- INAI "Recomendaciones para el tratamiento de datos personales en el entorno laboral": not fetched; not cited.
- LGIA v1 Título Décimo contents (whether emotion recognition is listed): not fetched; the paper says so.
- NOM-030-STPS-2009, NOM-036-1-STPS-2018, Reglamento Federal de Seguridad y Salud en el Trabajo, Reglamento General de Inspección: not fetched; NOM-030 is mentioned only as the cross-reference in NOM-035 numeral 7.6 and none is given a reference entry.
- Ley de Seguridad Nacional Art. 5 fr. XII and CPEUM Art. 28 strategic-area status: not verified; the paper refers to "strategic-infrastructure status" on the strength of LSE Art. 2 XII (verified) only.
- EU-Mexico Global Agreement data-flow clause text: not fetched; no claim made beyond "would not create adequacy" flagged as unverified.
- IEC 62443-2-1: cited by name in DM-10 without a reference entry, as in the EU edition (content on personnel security not verified per q3).
- Speech-stress systematic reviews (PMC12289014; Frontiers in Computer Science 2021): existence verified but unreadable; not cited; the paper attributes the vocal extension of Barrett et al. [14] and the corpus-specificity of speech accuracies to the working group's own reading, not to [14].
- Hogervorst, Brouwer & van Erp 2014 (EEG workload): not cited; EEG is excluded from the deployed chain on the working group's own grounds.
