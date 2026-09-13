# Citation ledger: MPN-2 (Notation)

Paper: `/home/claude/mpn-drafts/MPN-2-notation.md`. Every `[n]` used in the paper is listed with the verification status copied from the research ledgers (`q2-sonification-science.md`, `q3-alarm-standards-human-factors.md`, `q4-psychometrics.md`, `q5-music-theory-cognition.md`, `q9-legal-ethics-precedents.md`, and, for [65] [66] [67], the MPN-1 ledger which drew on `q6`/`q8`), from the corpus, or from the repo deconstruction. Status vocabulary: VERIFIED (DOI/record confirmed on a fetched page), UNVERIFIED-canonical (standard work, cited without page numbers, coefficients or quotations beyond what the ledger lists), corpus (Eigenia working paper or series paper), code (repo path:line). Where the paper quotes a figure or a sentence, the row says which ledger line supports it. Bibliographic details (volume, pages) are transcribed from the ledger's Sources list; six references ([21], [25], [32], [50], [53], [60]) carry volume and pages supplied by the adversarial QA review (`QA-MPN-2.md`, section 5, where the reviewer marks them verified) and are flagged "pages from QA" below. Revision of 2026-09-12 after the QA review: computational conventions (round-half-to-even, first-frame instability, dispersion estimator, PLR tie-break) added to section 3.1 and N-26; channel `a_hp` added; N-27 added; both worked tables recomputed in exact rational arithmetic (`scratchpad/mpn2_check2.py`).

| [n] | Short reference | Status | Ledger source | Notes on what the paper takes from it |
|:--|:---|:---|:---|:---|
| 1 | Bradner, RFC 2119 | corpus convention | Series brief; WG-05 exemplar | Normative keywords only |
| 2 | Creative Commons, CC BY 4.0 | corpus convention | WG-05 exemplar | Licence line only |
| 3 | McKenney, MPN-1 (Paper 1 of this series) | corpus (series) | `/home/claude/mpn-drafts/MPN-1-foundations.md` | F-1 to F-14; §4.1 orbit under Z4; §4.4 registers as channels; §5 EWS; corrections table rows 10-12 |
| 4 | Eigenia, musical-psychometric-notation (MPN v1) | corpus | WG-03-ML-Musical-Psychometric-Notation.md | Header block, clefs and tempo bands (§2.1-2.2), DISC instruments, OCEAN dynamics, clinical health, P/L/R table with the "C Major → D♭ Major" PLP row (§2.7), 15-30 min warning and 22-minute lead time (§5.2) |
| 5 | Eigenia, lacanian-psychohistory-framework | corpus | WG-03-ML-Mckenney-Lacanian.md | Four-discourse threat-actor typology table (Master/State warfare, University/Espionage, Hysteric/Hacktivism, Analyst/Quiet recon) |
| 6 | Regulation (EU) 2024/1689, Art. 3(34), Art. 5(1)(f), Art. 113, Recitals 18, 44 | VERIFIED | q9 §1.1-1.5 | Prohibition; 2 Feb 2025 application; biometric definition without the identification qualifier; Recital 18 fatigue carve-out |
| 7 | Commission Guidelines C(2025) 5052 final, Section 7 | VERIFIED (q9 downloaded and read the adopted text) | q9 §1.8 | Broad reading of "emotions" (arousal, stress-based anxiety, team emotional tone); narrow safety exception; biometric modalities list; fn. 150 cites Barrett. Relationship of document numbers: the draft approved 4 February 2025 is C(2025) 884 final; the Communication adopted 29 July 2025 is C(2025) 5052 final (q9 §1.8). The QA review could not confirm the July number independently |
| 8 | Commission Guidelines C(2025) 5053 final, paras 40-47 | VERIFIED (q9 downloaded and read) | q9 §1.9 | Paras 46-47: basic data processing and systems solely for descriptive analysis and visualisation fall outside the definition; the paper says a fixed mapping "arguably" falls there and that the position is untested. The February 2025 version is C(2025) 924; the QA review could not confirm the July number independently |
| 9 | GDPR 2016/679, Art. 4(15), Art. 9, Recital 35 | VERIFIED | q9 §2.1 | Physiological data as health data |
| 10 | Wet op de ondernemingsraden, Art. 27(1)(k), (l), 27(4) | VERIFIED | q9 §2.7 | Facility "suitable for" observing behaviour or performance needs consent |
| 11 | Barrett et al. 2019, PSPI 20(1) | VERIFIED | q4 §6; q9 §1.4 | Used only for what the paper is about: no facial configuration reliably diagnostic of an emotion, and the Commission's fn. 150 citing it. The physiology-indexes-arousal claim is cited to Paper 1 §6.6 and F-10 [3], not to Barrett |
| 12 | Roma, Hursh, Mead, Nesthus 2012, FAA DOT/FAA/AM-12/12 | VERIFIED | q9 §5 | SAFTE-FAST pattern; the FAA study used actigraphy plus duty logs, whereas the notation restricts its own channel to schedule-predicted sleep opportunity with no reported or measured sleep (section 2, N-25); no R² or N quoted |
| 13 | CASA Biomathematical Fatigue Models guidance (IATA condensed) | VERIFIED | q9 §5 | Advisory, population-level, not a go/no-go criterion |
| 14 | IEC 62682:2022 | VERIFIED (webstore record, foreword, contents) | q3 §1-2 | Standard's existence, edition, date, committee; existence of rate-metric tables and of rationalised alarm priority (basis of the `a_hp` channel); no table contents quoted |
| 15 | ANSI/ISA-18.2-2016 | UNVERIFIED (not fetched; cited as a standard without benchmark figures) | q3 §1; QA §1(e) | Alarm requires a response; philosophy and lifecycle; no benchmark figures quoted. Section 5 states that public reproductions of the flood definition differ by one alarm and that the exit condition is unverified from any standard |
| 16 | HSE CHIS6, Better alarm handling, 2000 | VERIFIED | q3 §1, §3 | "no more than one every ten minutes"; "no more than ten displayed in the first ten minutes"; "275 alarms" in "the last 11 minutes"; the flood definition ≥10 in 10 min is stated as the working group's own on industry practice, per q3 §1 "Flood definition" (clause text UNVERIFIED) |
| 17 | EEMUA 191 edition 4, November 2024 | VERIFIED existence only | q3 §3 | Cited as the current edition; no content quoted |
| 18 | HSE COMAH case study, Milford Haven 1994 | VERIFIED | q3 §3 | "Excessive number of alarms in emergency situation reduced effectiveness of operator response" (paraphrased) |
| 19 | ISO 7731:2003 | VERIFIED (iso.org title) | q2 §4 | Audibility requirements for auditory danger signals; no numeric requirement quoted |
| 20 | IEC 60601-1-8 (2006; Amd 1 2012; Amd 2 2020) | VERIFIED existence; amendment content UNVERIFIED | q2 §4 | Melodic alarm signals of 2006; 2020 amendment introduced new alarm sounds (stated only as much as [22] supports) |
| 21 | Momtahan, Hétu, Tansley 1993, Ergonomics 36(10), 1159-1176 | UNVERIFIED-canonical; pages from QA | q2 §4; QA §5 | Staff identified only a minority of alarms; masking; no percentages quoted |
| 22 | AAMI News, "Updated IEC 60601-1-8 breaks new ground in development of alarm sounds" | VERIFIED title (fetch 403) | q2 §4 | Only that the amendment introduced a new set of alarm sounds |
| 23 | Loeb and Fitch 2002, Anesth Analg 94(2) | VERIFIED (PubMed abstract fetched) | q2 §3, §6 | Six variables in two streams; every event detected; 60% identification audio-only vs 88% visual |
| 24 | Watson and Sanderson 2004, Human Factors 46(3) | VERIFIED (record) | q2 §3 | Eyes-free respiratory monitoring and task time-sharing; no effect sizes quoted |
| 25 | Paterson et al. 2016, Anaesthesia 71(5), 565-572 | VERIFIED title/DOI; pages from QA | q2 §3; QA §5 | Tremolo and brightness enhancement for SpO2 ranges, laboratory; the paper now states only the rationale of the enhancement (a plain pitch tone conveys trend better than absolute range), no numbers |
| 26 | Gilfix and Couch 2000, Peep, USENIX LISA | VERIFIED (fetched) | q2 §5 | Crickets stop when the mail server dies (paraphrase of the fetched quotation) |
| 27 | Bregman 1990, Auditory Scene Analysis | UNVERIFIED-canonical | q2 §6 | Stream segregation by frequency, timbre, location, onset, regularity |
| 28 | Kim, Chang, Holland, Pentland 2008, CSCW | VERIFIED (abstract); title corrected per QA §5 to the CSCW paper's "enhancing group collaboration using sociometric feedback" | q9 §4; QA §5 | Speaking-time balance fed back to the participants themselves; the paper notes this is per-person feedback and that the notation aggregates further |
| 29 | Höner, Hermann, Grunow 2004 | VERIFIED as citation (not read) | q9 §4 | Sonification of player positions in team sport |
| 30 | Vickers 2011, Sonification Handbook ch. 18 | VERIFIED (fetched) | q2 §1, §5 | Endorses soundscape direction; no quantitative evaluation of concurrent-stream limits; no process control room study |
| 31 | Hermann, Hunt, Neuhoff (eds) 2011, Sonification Handbook | VERIFIED | q2 §1 | Field reference and taxonomy |
| 32 | Walker 2002, JEP: Applied 8(4), 211-221 | UNVERIFIED-canonical; pages from QA (PubMed 12570096) | q2 §2; QA §1(g) | Magnitude estimation for polarity and scaling; polarity depends on the data dimension; no numbers |
| 33 | Walker and Nees 2011, Sonification Handbook ch. 2 | VERIFIED existence | q2 §1-2 | Mappings must be validated with the target population |
| 34 | Kramer et al. 1999, Sonification Report (NSF/ICAD) | VERIFIED existence and title; author list UNVERIFIED (cited as "Kramer, G., et al.") | q2 §1 | Field status report; no definition quoted |
| 35 | Juslin and Laukka 2003, Psych Bull 129(5) | VERIFIED (DOI/PMID) | q5 §3-4 | Tempo the most consistent arousal cue; loudness and timbre as cues; no accuracy percentages quoted |
| 36 | Juslin and Västfjäll 2008, BBS 31(5) | VERIFIED existence; pages omitted | q5 §4 | Perceived vs induced emotion distinction |
| 37 | Eerola and Vuoskoski 2013, Music Perception 30(3) | VERIFIED record | q5 §4 | Dimensional model's prevalence and reliability |
| 38 | Hevner 1936, AJP 48(2) | UNVERIFIED-canonical | q5 §4 | Mode and tempo as strongest determinants; pages as in ledger |
| 39 | Gabrielsson and Lindström 2010, Handbook of Music and Emotion | UNVERIFIED-canonical | q5 §4 | Structure-to-emotion review; tempo dominates mode; loudness to power |
| 40 | Husain, Thompson, Schellenberg 2002, Music Perception 20(2) | UNVERIFIED-canonical | q5 §3 | Tempo affected arousal, mode affected mood |
| 41 | Fritz et al. 2009, Current Biology 19(7) | UNVERIFIED-canonical | q5 §4 | Mafa listeners recognised emotions from tempo and mode cues |
| 42 | Balkwill and Thompson 1999, Music Perception 17(1) | UNVERIFIED-canonical | q5 §4 | Cross-cultural judgement from tempo and complexity; mode less universal |
| 43 | Lerdahl 2001, Tonal Pitch Space | UNVERIFIED-canonical | q5 §2 | Multi-level pitch-space distance; fitted alternative to the fifths distance |
| 44 | Lerdahl and Krumhansl 2007, Music Perception 24(4) | VERIFIED record (end page UNVERIFIED, transcribed from ledger) | q5 §2 | Tension ratings predicted by hierarchical distance, attraction, dissonance; fits for Western tonal listeners; no coefficients quoted |
| 45 | Bigand, Parncutt, Lerdahl 1996, Perception & Psychophysics 58 | UNVERIFIED-canonical | q5 §2 | Chord-sequence tension experiment |
| 46 | Farbood 2012, Music Perception 29(4) | VERIFIED record | q5 §2 | Multi-feature time-windowed tension model with fitted weights; no weights quoted |
| 47 | Krumhansl and Kessler 1982, Psych Review 89(4) | UNVERIFIED-canonical | q5 §2 | Key profiles and key space |
| 48 | Plomp and Levelt 1965, JASA 38(4) | UNVERIFIED-canonical | q5 §2 | Roughness peaks near a quarter critical band; sums over partial pairs |
| 49 | Sethares 2005, Tuning, Timbre, Spectrum, Scale | UNVERIFIED-canonical | q5 §2 | Dissonance curve is a property of (timbre, interval) |
| 50 | McDermott et al. 2016, Nature 535, 547-550 | UNVERIFIED-canonical; pages from QA | q5 §2; QA §5 | Consonance preference culturally variable; roughness not read as valence |
| 51 | Cohn 1996, Music Analysis 15(1) | UNVERIFIED-canonical | q5 §1 | Hexatonic systems and hexatonic poles |
| 52 | Cohn 1997, JMT 41(1) | UNVERIFIED-canonical | q5 §1 | P, L, R on the consonant triad; parsimonious voice leading |
| 53 | Crans, Fiore, Satyendra 2009, Amer. Math. Monthly 116(6), 479-495 | VERIFIED (T&F record, arXiv abstract); pages from QA | q5 §1; QA §1(a) | Theorem 5.1 (PLR group generated by L and R, dihedral of order 24, with R(LR)^3 = P in the proof), Corollary 5.2 (simply transitive), Theorem 6.1 (duality). The identity P = RLRLRLR, the diameter 5 of the PLR Cayley graph, the LR chain, the non-uniqueness of shortest words and the lexicographic tie-break were verified by computation (`scratchpad/mpn2_check.py`, `mpn2_check2.py`) |
| 54 | Lewin 1987, GMIT | UNVERIFIED-canonical | q5 §1 | Transformations acting on musical objects |
| 55 | Cohn 1998, JMT 42(2) | UNVERIFIED-canonical | q5 §1 | Standard survey; pages as in ledger |
| 56 | Lerdahl and Jackendoff 1983, GTTM | UNVERIFIED-canonical | q5 §3 | Metrical well-formedness rules |
| 57 | London 2004/2012, Hearing in Time | UNVERIFIED-canonical | q5 §3 | Limits of metrical hearing; no figures quoted |
| 58 | Large and Jones 1999, Psych Review 106(1) | UNVERIFIED-canonical | q5 §3 | Dynamic attending; anticipatory attention at expected time points |
| 59 | Eerola, Ferrer, Alluri 2012, Music Perception 30(1) | UNVERIFIED-canonical | q5 §6 | Brightness and attack time predict arousal ratings |
| 60 | Hailstone et al. 2009, QJEP 62(11), 2141-2155 | UNVERIFIED-canonical; pages from QA | q5 §6; QA §5 | Timbre alone shifts perceived emotion |
| 61 | Endsley 1995, Human Factors 37(1) | UNVERIFIED-canonical | q3 §6 | Three levels of situation awareness |
| 62 | Endsley 1988, SAGAT, NAECON | UNVERIFIED-canonical | q3 §6 | Freeze-probe technique |
| 63 | Hart and Staveland 1988, NASA-TLX | UNVERIFIED-canonical | q3 §8 | Subjective workload instrument |
| 64 | Wickens 2002, TIES 3(2) | UNVERIFIED-canonical | q3 §7 | Multiple resources; reduced but non-zero cross-modal cost; interference with alarms and speech (ledger's interpretation) |
| 65 | Scheffer et al. 2009, Nature 461 | as in MPN-1 ledger [50] | MPN-1 §5.4 | Generic early-warning indicators; cited as in Paper 1 |
| 66 | Dakos et al. 2012, PLoS ONE 7(7) | as in MPN-1 ledger [51] | MPN-1 §5.4 | Rolling-window estimation, detrending, surrogates |
| 67 | Gadalla, Nikoletseas, Amazonas 2026, Frontiers in Psychology 17 | VERIFIED (as in MPN-1 ledger [39]) | MPN-1 §3.4 | Predecessor for any discourse scoring (F-13); no figures quoted here |
| 68 | Xenakis 1992, Formalized Music | UNVERIFIED-canonical | q5 §5 | Score as trace of a formal process |
| 69 | Childs, Perkins, Brooks, US Patent 7,138,575 | VERIFIED (Justia) | q5 §5 | Notation rendering of sonified market data |
| 70 | Lacan, Seminar XVII (Norton 2007) | UNVERIFIED-canonical | MPN-1 [15]; q1 | Four discourses; cited only for their existence, via Paper 1 |
| 71 | ISO 11064-7:2006 | VERIFIED existence only | q3 §4 | Evaluation framework for control centres; no clause quoted |

## Code citations (repo deconstruction, `mpn-conductor-standalone`)

| Path:line | Status | What the paper takes from it |
|:---|:---|:---|
| `src/components/mpn-lab/literary_data.ts:16` | code (IMPL, data) | Hand-authored trauma/entropy per frame; thirteen plays, ~232 frames (deconstruction §2.4) |
| `ml/psychoscore_v2/models/mckenney_lacan_calculus.py:25-51` | code (IMPL+TEST) | 9-component simulation vector (τ, H, r, s, i, D, I, S, C) |
| `ml/psychoscore_v2/models/mckenney_lacan_calculus.py:103-162` | code (IMPL+TEST) | Tempo bands (40-60, 80-100, 120-180) and the discontinuities at H = 0.4 and 0.7 (deconstruction §3.2) |
| `ml/psychoscore_v2/models/mckenney_lacan_calculus.py:281-287, 290-384, 445-454` | code (IMPL–NOTEST) | tension_score, Lyapunov scalar, crisis rule, BSI definition A (deconstruction §3.5, §3.6, §3.9) |
| `ml/psychoscore_v2/models/mckenney_lacan_calculus.py:411-416` | code (IMPL–NOTEST) | apply_L correct (C → Em) |
| `mpn_engine/core/tonnetz.py:104-107`; `mpn_engine/tests/test_tonnetz.py:74-80` | code (IMPL+TEST, wrong operation) | transform_L gives C major → B minor; test asserts root 11 (deconstruction §3.7). The map is an involution but shares one common tone, not two, so it is not the neo-Riemannian L |
| `src/components/mpn-lab/mpn_reference_lookup.ts:150-178` | code (IMPL+TEST) | Three-band dynamics table (30, 72, 118) with a default of 72 filling the gaps: monotone non-decreasing but collapsing six tenths of the range to one value, with jumps at 0.2 and 0.8 (deconstruction §3.1; corrected wording after the Paper 3 review) |
| deconstruction §2.5 | analysis | No discourse detection in code |
| deconstruction §3.9 | analysis | Three BSI formulas, two crisis thresholds, wrong L operator |

## Items deliberately not cited or not stated

- ISA-18.2 benchmark table figures (150/day, 300/day, <1% of periods in flood, 80/15/5 priority split from the ISA table) are UNVERIFIED in q3 and are not quoted; only the HSE CHIS6 endpoints are.
- The flood exit threshold "below 5" has no verified clause text, and public reproductions of the entry condition differ by one alarm (QA §1(e)); the paper states both as the working group's own rule on industry practice.
- Edworthy's work on the learnability of IEC 60601-1-8 melodies is listed in q2 without a specific citation and is not cited; the paper says only that a 2020 amendment introduced new sounds, supported by [22].
- Schwarz and Sanderson 2017 and the other Queensland enhanced-oximetry papers are not cited because their author lists are UNVERIFIED; Paterson et al. 2016 (title/DOI verified) is cited alone.
- No effect sizes, correlation coefficients or decoding accuracies from [35], [44], [46] are quoted, per the q5 Gaps section.
- Tymoczko 2011, Douthett and Steinbach 1998, Huron 2006, Cohn 2004: available in q5 but not needed; not cited.
- ISO 11064-1/-5/-6 and ISO 9241-210 years are UNVERIFIED in q3; only ISO 11064-7:2006 is cited.
