# QA report: MPN-4-MX-R (closed research environment edition)

Adversarial review of `/home/claude/mpn-drafts/MPN-4-MX-deployment-mexico.md` against `MPN-1-foundations.md`, `MPN-2-notation.md`, `MPN-3-engine.md`, `MPN-4-deployment.md` and `CITATION-LEDGER-MPN-4-MX.md`. Compiled 2026-09-12. Reviewer was not told the expected result.

Scope as instructed: citations, internal consistency and cross-references. Legal and regulatory content is out of scope and its absence is not treated as a defect anywhere below.

---

## 1. Cross-reference audit

All requirement numbers cited in the paper exist in their source papers. The table records whether the paper's characterisation matches the requirement text.

| Cited at | Req. | Requirement as written (source) | Paper's characterisation | Verdict |
|:---|:---|:---|:---|:---|
| 27 | N-1 | "A score MUST declare its input mode (operational, simulation or adversary) in the header and MUST draw only on the channels of section 2 admissible in that mode." | "Declared input mode; only that mode's channels admissible" | OK |
| 28 | N-2 | "A channel MUST NOT be a biometric of a member of staff, and a channel MUST NOT be an inferred emotion, mood, stress or arousal of a member of staff, in any mode." | "No biometric of a member of staff; no inferred emotion, mood, stress or arousal" | OK |
| 29 | N-3 | "**In operational mode** a score MUST carry no per-person data **other than the crew-level fatigue annotation of N-25**; interaction and latency channels MUST be aggregated at console level without user identity, and a console staffed by one person MUST be aggregated at unit level with at least one other console or not rendered." | "No per-person data; console-level aggregation; single-operator console rule" | PARTIAL. Drops the mode restriction and the N-25 carve-out. Harmless here (lifted in full) but the subject column is not what N-3 says. |
| 30 | N-14 | "A score MUST NOT carry more than three concurrent streams in operational mode or four in simulation and adversary mode, **each with a distinct timbre family and rhythmic figure and a register that overlaps no other stream's**, as in the table of section 3.9." | "At most three concurrent streams operational, four simulation and adversary"; relaxation "as to the count **only**" | WRONG as to scope. DM-7 (line 145) also permits two concurrent streams to share a register and timbre family when an experiment says so. That relaxes N-14's distinctness clause, which the table says is not relaxed. Also N-14 does not mention pan; pan is E-9's. |
| 31 | N-16 | "The adversary stream MUST appear only in adversary and simulation mode, and any discourse estimate claimed to be scored from text MUST satisfy F-13." | "Adversary stream only in adversary and simulation mode"; relaxed as to mode | OK. The F-13 half is left standing and section 5.6 (305) honours it by citing [19]. |
| 32, 42 | N-19 | "Early-warning observables MAY appear only as margin annotations; they MUST NOT be sonified, **enter $T$, or be reported as a lead time**." | "Early-warning observables as margin annotations, never sonified" | PARTIAL. Two of the three prohibitions are dropped from the subject. The paper never says whether observables may now enter the tension index; section 6 is silent on it. Lead time is separately covered by DM-20. |
| 33 | N-24 | "The notation MUST be silenceable by the operator with one control, without penalty and without a record of who silenced it." | "Silence control with no record of who used it"; relaxed as to the record | OK for N-24, but see E-11 below. |
| 34, 42 | N-25 | "The fatigue index MUST be rendered as a text annotation only and MUST NOT be sonified **or used as a go/no-go criterion**." | "Fatigue index as a text annotation only" | PARTIAL. The go/no-go prohibition is not in the subject and is not said to survive. |
| 35, 118 | E-3 | "In operational mode the engine MUST accept only the channels ... which excludes `delta` and `p_sim`, and MUST reject any other field at the schema boundary with a hard failure." | "Schema boundary rejecting non-admissible channels" | OK |
| 36 | E-5 | "The 57-dimensional projector, the voice, speech and personality heads, **and any language-model profile extraction** MUST NOT be present in the **operational** build in any mode." | "Projector, voice, speech and personality heads absent from the build" | PARTIAL. Omits "operational" and the language-model profile extraction. |
| 37 | E-6 | "The operational path MUST be a fixed, human-authored mapping with constants declared in the header, and MUST contain no learned component." | "Operational path fixed, human-authored, no learned component" | OK |
| 38 | E-7 | "Any learned component MUST be confined to simulation and adversary mode, MUST be packaged and built separately ... so that its removal changes no operational output." | "Learned component confined to simulation and adversary mode"; packaging retained by DM-12 | OK |
| 39 | E-9 | "The engine MUST render at most three concurrent streams in operational mode and four in simulation and adversary mode, with timbre family, register, rhythmic figure and pan position fixed per stream at configuration time." | "At most three or four rendered streams" | OK |
| 40 | E-16 | "The engine's log MUST consist of the frame table, the header constants, the rendering state and timestamps, and MUST carry no user identity and no attributed mute event." | "Lifted and replaced by DM-5, which requires the opposite: everything is logged, **including participant identifiers within the environment**" | MISMATCH. DM-5 (143) does not mention participant identifiers at all. The identifier requirement appears only in prose at line 230. DM-5 does not deliver what the relaxation row says it delivers. |
| 41 | E-17 | "The engine MUST have no export path to any human-resources, appraisal or personnel system, and its retention period MUST be declared per site." | "No export path to any personnel system; declared retention" | OK |
| 42 | E-21 | "Early-warning observables and the fatigue index MUST be rendered as text annotations only and MUST NOT be sonified." | "Early-warning observables and fatigue index as text only" | OK |
| 44 | N-27 | "The adversary discourse estimate **and the simulation vector** MUST NOT be attached to, or describe, an identifiable natural person who is a member of staff, in any mode; a suspected insider is a member of staff." | "forbids attaching a discourse estimate or a psychometric vector to an identifiable member of staff"; stands unrelaxed | OK in substance ("psychometric vector" for "simulation vector"). Not contradicted: DM-8 (146) forbids assigning a profile to a participant. |
| 44, 212 | E-4 | "In **simulation and adversary mode** the engine MAY additionally accept the simulation vector `p_sim` and the discourse estimate `delta` ..., MUST translate them by the declared rule of Paper 2 section 8.2, and MUST NOT attach either to an identifiable member of staff (N-27)." | "requires the declared translation of Paper 2 section 8.2 for scenario vectors and discourse estimates" | PARTIAL, and one cross-reference does not check out. Paper 2 section 8.2 gives a declared translation for the **nine-component simulation vector only**; it contains no translation rule for `delta`. Line 212 says the written discourse assignment "reaches it through the declared translation of Paper 2 section 8.2 (E-4)" and no such rule exists. This defect is inherited from E-4 itself, but the MX-R paper leans on it harder than MPN-3 does. |
| 13 | F-1, F-14, N-1, N-27, E-1, E-24 | all exist | cited only as range endpoints | OK |
| 141 | E-15 | "The **operational path** MUST NOT call any random-number generator; the same inputs and constants MUST produce the same score." | DM-3 restates it for "the fixed rendering path" and permits a seeded stochastic learned renderer | UNDECLARED RELAXATION. E-15 is not in the table, and E-6 is relaxed so a learned renderer "MAY drive a rendering path". Whether E-15 still binds that path is left unstated. |
| 149 | E-1, E-2 | one source of truth, twin generated or conformance-tested; frame tables bit for bit; agreement on ≥1000-frame randomised fixture | DM-11 restates both accurately | OK |
| 158 | F-8 | "Early-warning indicators MAY be proposed. They MUST carry the caveats of **section 5.4** and MUST NOT be reported as a measured lead time in the absence of data." | DM-20 attaches "the data requirements of Paper 1 **section 5.6** ... (F-8)" | IMPRECISE. Section 5.6's own closing sentence says "F-6 requires it to be written as such". F-6, not F-8, is the requirement keyed to section 5.6. F-8 is keyed to section 5.4. |
| 161, 379 | E-23 | CI must fail on any document claiming a lead time, accuracy, listener result or trained model without linked dataset, evaluation script and result file | DM-23 restates it accurately | OK |

### Requirements silently contradicted, or relied on after relaxation

1. **E-11 is contradicted and is not in the relaxation table (lines 33, 92, 154).** E-11: "The engine MUST provide one operator mute that silences audio without stopping the symbolic score, without penalty, and **without any record of who used it**." The paper relaxes N-24's identical clause but leaves E-11 unnamed, while section 2.5 requires a log row per mute (92), DM-16 requires participants to be told "that the silence control's use is recorded as a measure" (154), and DM-5 logs everything (143). Line 23's claim that MX-R "relaxes exactly the requirements named in the table below" is false here. Highest-severity cross-reference defect in the paper.
2. **E-15 (see table).** Undeclared, ambiguous.
3. **N-14's distinctness clause (see table).** Relaxed by DM-7 but declared unrelaxed.
4. **F-10 is never addressed.** "Physiological channels ... MUST NOT appear in a deployed signal chain about staff." Section 4.4 (222-230) renders a participant's own physiology back to that participant. The paper's defence is implicit (section 2.6 insists participants are study participants, not operators, and nothing is deployed) but it is never stated as the answer to F-10, and F-10 is not in the relaxation table.
5. **N-20, N-23, E-12, E-13, E-18, E-19 have no referent in a closed environment.** Line 23 says MX-R "leaves everything else as written". Each of these requires a site alarm philosophy, site alarm signals, a site-declared level ceiling, a declared measured latency, or reading from an alarm system. The paper does not say which of them it considers satisfied vacuously, discharged by the synthetic generators, or inapplicable. The ledger reasons about ISO 7731 and IEC 62443 in exactly this way (ledger line 105) but the paper does not.

---

## 2. Internal consistency findings

### DM-1 to DM-23

Contiguous, no gaps, no duplicates (definitions at lines 139-161). Count stated correctly in the scope section (line 13, "DM-1 through DM-23") and in the conclusion (line 387, "twenty-three research-protocol requirements"). The conclusion's "sixteen notation and engine requirements are relaxed" also checks out: eight N- and eight E- rows in the table at lines 27-42.

Testability: all are testable by inspection of a repository, a manifest or a run directory, with one exception.

**F-1 (line 156). DM-18 is not testable as written and states the opposite of its intent.** "No such label MUST be carried out of the environment as a finding except under DM-23, and no such label MUST be described as a measurement of an emotion". "No X MUST Y" under RFC 2119 means "it is not required that X does Y", not "X MUST NOT do Y". Two occurrences in one sentence. Compare the correct construction in DM-2 ("MUST NOT be used as evidence") and DM-23 ("MUST NOT be made").

**F-2 (lines 145 vs 30). DM-7 contradicts the N-14 relaxation row.** The row relaxes N-14 "as to the count only"; DM-7 also relaxes the requirement that concurrent streams carry distinct registers and timbre families.

**F-3 (lines 140, 58, 148). DM-2's manifest list is incomplete against three other places that depend on it.** DM-2 names generator versions, scenario file, profile sampler and parameters, notation version, engine version and date. It does not name the **seed**, which DM-3 (141) says is "recorded in the manifest" and which section 2.1 (58) lists as a manifest field. It also does not name the **constant set of Paper 2 section 3.1**, which DM-10 (148) requires "in its dataset manifests". Conversely section 2.1's manifest list omits the engine version and the profile sampler that DM-2 requires. Three overlapping, mutually inconsistent enumerations of one object.

**F-4 (lines 143, 92, 156, 228). The logging schema does not contain the affective-label record that DM-18 and section 4.4 depend on.** DM-18 requires every affective label to be recorded with "the sensor, the quantity, the window, the mapping that produced it and the identifier of the experiment in which it is under test". DM-5's enumeration (143) has no affective-label row. Section 2.5's dataset layout (92) has no affective-label file or column. Section 4.4 (228) says only that "the label is written into the log with its tier and its experiment identifier", which is two of DM-18's five fields. This is the clearest instance of the "recorded as a hypothesis" framing being asserted but not carried through by the mechanism described.

**F-5 (lines 92, 145, 155). The run configuration is not part of the dataset layout.** DM-7 requires stream parameters "declared in the run configuration and recorded in the log"; DM-17 requires evidence tiers "in the run configuration". Section 2.5's list of a run directory's contents (manifest, scenario file, generator parameter files, raw frames, index table, notation table, rendered-event log, audio, participant data) contains no run configuration file. DM-6 requires the layout to be "declared once" and identical across runs; the declared layout omits an artefact two requirements depend on.

**F-6 (lines 143, 230, 40).** DM-5 does not require participant identifiers, but the E-16 relaxation row (40) and section 4.4 (230) both say it does. See cross-reference table.

**F-7 (lines 142, 92).** DM-4 requires every rendered example to name "the frame-table hash". No frame-table hash appears in the dataset layout of section 2.5 or in DM-5's log enumeration.

**F-8 (lines 104, 157, 117, 183). The luminance channel is required but appears in no channel inventory.** Section 2.7 (104) installs "a luminance sensor beside it" and DM-19 (157) makes the luminance record mandatory for the pupillometry quality flag, and section 6 (317) turns on it. It appears in neither mermaid sensor node (117 `SIMU`, 183 `SENS`), in neither section 4.4's sensor list (222) nor DM-5's logging list (143).

**F-9 (line 173 vs section 2). "Synthetic historian" appears in section 4 and nowhere in section 2.** Node `H` at line 173 feeds operational mode. Section 2.1 describes a process model plus four generators (alarm, security-event, work, interaction) and no historian. Section 2.7's diagram node `PT` (114) lists the same four. The only other occurrence of "historian" is in DM-1's prohibition on reading from a *production* historian (139). Every other section 4 channel does appear in section 2; this one does not, and the reverse direction fails only for luminance (F-8).

**F-10 (lines 15, 224, 230). "Operator" carries two incompatible senses.** Line 15 says "the operator complies with all applicable Mexican legal requirements", using "operator" for the organisation running the environment. Everywhere else (56, 100, 224, 240, section 4.4 throughout, "synthetic operator population", "operator-state mode") "operator" is a person at a console. Nothing in the paper defines the first sense, and no entity corresponding to it appears anywhere else in the document.

### Mermaid diagrams against the prose

Diagram 1 (lines 108-133), environment overview:

- Consistent with the prose on nodes and classes; every node is class-assigned.
- `accDescr` (112) says "Everything, inputs, indices, notation, rendered events and participant responses, is written to a versioned dataset". The only path from inputs to `DS` in the diagram is through `CALC`; there is no `SB --> DS` edge, although DM-5 requires the raw frames to be logged *as received at the schema boundary*.
- No edge returns audio to the simulator. `AUD` is terminal into `DS`. The participants whose responses reach `DS` (edge `SIMU --> DS`) never hear anything in the diagram, which is the whole mechanism of sections 4.4, 5.1 and 5.2.

Diagram 2 (lines 167-196), the four modes. Three defects, all in the edges:

- **Operational mode has no path to the renderer.** Edges at 185-187 are `ADM --> REND`, `SIM --> REND`, `OSM --> REND`. `OPM` reaches `REND` only through one of the other three. Section 4.1 (198-206) describes rendering in operational mode alone, and the `accDescr` (171) says "All four feed one calculus and one renderer".
- **There is no calculus node.** The `accDescr` says all four modes "feed one calculus and one renderer"; the diagram has `REND` and nothing else.
- **No input channel reaches the dataset.** Only `POS --> LOG` and `ROOM --> LOG` exist, against the `accDescr`'s "Every channel and every rendered event is written to the versioned dataset" and against DM-5.
- Minor: the `accDescr` omits the alert and flood machines that the `OPM` node label carries (178); and node `H` is the undescribed historian of F-9.

Diagram 3 (lines 266-287), the renderer comparison: consistent with the prose at 258-264 and 289 on every node and edge. No findings.

Diagram 4 (lines 351-377), the roadmap. Two defects:

- **The gate semantics are self-contradictory and G1 is circular.** Line 349 says each milestone has "a gate that the previous milestone's recorded result opens". The `accDescr` (355) says "Six milestones in sequence, each preceded by a gate" and then "Its gate opens M2", which cannot both be true. In the diagram (370) gates precede milestones, so G1 precedes M1; but G1 reads "DM-11 satisfied, DM-2 to DM-6 in place" and DM-11 is precisely what M1 achieves ("M1: conformance and determinism; two calculi agree"). G2 is "registration filed (DM-14)", which is not "the previous milestone's recorded result" either. G3 to G6 are exit gates of the preceding milestone, which is the third semantics in one diagram.
- **The `NV` node lists three items; the prose lists four.** Node text (369): a claim about a real control room; any emotion measurement; any lead time without Paper 1 section 5.6. Prose (383) adds "a premium delta or a reduction in incident rate". The EU edition's equivalent node (MPN-4-deployment.md:289) carries all four.

### Roadmap against the defined programme

- Milestones M1 to M6 and gates G1 to G6 are all defined in the diagram; the prose at 379-383 references only those, plus E-23, DM-11 and DM-20, all of which exist. No undefined milestone or gate is referenced.
- **Section 5.6, the adversary-discourse rendering study, has no milestone.** Section 5 declares six studies (234). Section 9 declares six milestones, of which M1 is not a study at all, so only five studies are gated. 5.6's claim ("listeners can or cannot recover an authored discourse from its rendering at a stated rate", line 307) is therefore available without passing any gate, against line 349's "The claims accumulate, and none is available before its milestone".

### Other internal findings

- **Line 383 imports an undefined term from the field edition.** "No milestone licenses a premium delta or a reduction in incident rate" and "the working group's underwriting arithmetic". Neither a premium, nor underwriting, nor an incident rate is defined or discussed anywhere else in this paper; all three are field-edition concepts (MPN-4-deployment.md:15, 122, 259, 289). In a closed synthetic environment with no deployment, no milestone could license a premium delta in any case, so the sentence carries no work.
- **Line 86 says "two calculi".** MPN-3 section 2.3 documents a Python module, a TypeScript module, "a third variant in the standalone engine and ad hoc formulas in the conductor page and the server", and four distinct definitions of the stability index. "Two calculi with no relation between them" understates the finding it cites; DM-11's "The two calculi" inherits the understatement.
- **Line 44's "no vector in the environment describes a participant in a simulator study" is true of profile vectors and not of the environment.** Section 4.4 (230) carries per-participant arousal, load and affective-label indices under stable identifiers. N-27 covers discourse estimates and simulation vectors only, so the claim is technically correct, but it is stated as a general property of the environment and it is not one.

---

## 3. Citation audit

### Completeness

87 references defined, numbered [1] to [87] with no gaps and no duplicates. Every [n] used in the body (lines 1-392) is defined; every defined reference is used at least once. No orphans in either direction.

Citation placement follows the corpus pattern (`word [n].`, `word [n];`), which matches MPN-1/2/3 and the EU edition. No defect.

### Spot-check table (34 references checked by DOI resolution, publisher fetch or archive fetch)

| [n] | Checked datum | Result |
|:---|:---|:---|
| [6] Barrett 2019 | PSPI 20(1), 1-68, DOI 10.1177/1529100619832930 | OK, exact |
| [9] Goldberg 1990 | JPSP 59, 1216-1229 | OK (59(6)) |
| [11] Block 1995 | Psych Bull 117, 187-215 | OK (117(2)) |
| [12] Paulhus and Williams 2002 | JRP 36, 556-563 | OK (36(6)) |
| [13] SD4 2021 | EJPA 37(3), 208-222, DOI 10.1027/1015-5759/a000602 | OK, exact |
| [16] Hofstee 1992 | JPSP 63, 146-163 | OK (63(1)) |
| [18] Fleeson 2001 | JPSP 80, 1011-1027 | OK (80(6)) |
| [19] Gadalla 2026 | Front. Psychol. 17, 1526215, DOI 10.3389/fpsyg.2026.1526215 | OK, exact; article number present here and missing in MPN-3 and the EU edition |
| [22] Endsley 1995 | Human Factors 37(1), 32-64 | OK, exact |
| [25] Loeb and Fitch 2002 | Anesth Analg 94(2), 362-368; six variables, two streams, every event detected, 60% identified from sound alone | OK. Abstract: "Subjects detected every event"; "correctly identified events least often with the auditory display (60% versus visual 88% and combined 80%)" |
| [26] HRV Task Force 1996 | Circulation 93(5), 1043-1065 | OK, exact |
| [28] Beatty 1982 | Psych Bull 91, 276-292 | OK (91(2)) |
| [31] Cohn 1997 | J. Music Theory 41(1), 1-66 | OK |
| [32] Crans et al. 2009 | Amer. Math. Monthly 116(6), 479-495, DOI 10.1080/00029890.2009.11920965 | OK, exact |
| [33] Juslin and Laukka 2003 | Psych Bull 129(5), 770-814, DOI 10.1037/0033-2909.129.5.770 | OK, exact |
| [34] Fritz et al. 2009 | Current Biology 19(7), 2009 | OK but INCOMPLETE: page range 573-576 omitted (same omission in MPN-2 and the EU edition) |
| [37] IJIE 2020 | Int. J. Industrial Ergonomics, 2020 | OK; volume 78, article 102974, DOI 10.1016/j.ergon.2020.102974. Authors Gan, Dong, Zhang, Zhang, Jia, Liu are readily verifiable, yet the entry reads "[Authors not verified]" |
| [38] Sensors 2024 | 24(6), 2010, DOI 10.3390/s24062010 | OK, exact. Authors Ma, Monfared, Grant, Goh verifiable; entry reads "[Authors not verified]" |
| [39] Applied Sciences 2023 | 13(4), 2718, DOI 10.3390/app13042718 | OK, exact. Authors Dai, Li, Zhang verifiable; entry reads "[Authors not verified]" |
| [40] Front. Neuroergonomics 2025 | DOI 10.3389/fnrgo.2025.1584736 | OK; volume 6 omitted. Authors Diarra, Theurel, Paty verifiable; entry reads "[Authors not verified]" |
| [41] Hevner 1936 | Amer. J. Psychology 48(2), 246-268 | OK |
| [43] Husain et al. 2002 | Music Perception 20(2), 151-171 | OK, exact |
| [44] Balkwill and Thompson 1999 | Music Perception 17(1), 43-64 | OK, exact |
| [45] Large and Jones 1999 | Psych Review 106(1), 119-159 | OK, exact |
| [48] Plomp and Levelt 1965 | JASA 38(4), 548-560 | OK, exact |
| [50] Farbood 2012 | Music Perception 29(4), 387-428 | OK, exact |
| [51] Lerdahl and Krumhansl 2007 | Music Perception 24(4), 329-366 | OK, exact |
| [53] Eerola and Vuoskoski | Music Perception 30(3), 307-340, given as 2013 | OK. Crossref records the issue year as 2012 (DOI 10.1525/mp.2012.30.3.307); both are in circulation. No action. |
| [54] Walker 2002 | JEP: Applied 8(4), 211-221 | OK, exact |
| [56] Watson and Sanderson 2004 | Human Factors 46(3), 497-517, DOI 10.1518/hfes.46.3.497.50401 | OK, exact |
| [57] Wickens 2002 | Theor. Issues Ergonomics Sci. 3(2), 159-177 | OK, exact |
| [58] ISO 11064-7:2006 | number, part, title, year | OK, exact |
| [61] Scheffer et al. 2009 | Nature 461, 53-59 | OK, exact |
| [62] Dakos et al. 2012 | PLoS ONE 7(7), e41010 | OK, exact |
| [63] Kuehn 2011 | Physica D 240(12), 1020-1035 | OK, exact |
| [64] EMOPIA, ISMIR 2021 | 1,087 clips from 387 songs, about 11 hours, four annotators, listening test with 25 participants each rating 12 samples on a five-point scale | OK, verified from the ISMIR archive PDF; the paper's "on the order of a thousand clips and ten hours" and "at least twenty-five listeners" both track |
| [66] MusicRL 2024 | 300,000 pairwise preferences from deployed users; "text adherence and quality only account for a part of it" | OK, exact; the paper's "hundreds of thousands of deployed-user judgements" is accurate |
| [70] ICASSP 2025 benchmarking | venue | OK on venue (arXiv 2506.19085 states "Accepted at ICASSP 2025") but the entry carries **no authors at all**. They are Grötschla, Solak, Lanzendörfer and Wattenhofer |
| [71] Cobb and Watson 1980 | Math. Modelling 1(4), 311-317, DOI 10.1016/0270-0255(80)90041-X | OK, exact |
| [72] Grasman et al. 2009 | JSS 32(8), 1-27 | OK, exact |
| [73] Kramers 1940 | Physica 7(4), 284-304, DOI 10.1016/S0031-8914(40)90098-2 | OK, exact |
| [74] Hanggi et al. 1990 | Rev. Mod. Phys. 62(2), 251-341 | OK, exact |
| [75] Zahler and Sussmann 1977 | Nature 269(5631), 759-763, DOI 10.1038/269759a0 | OK, exact |
| [76] van der Maas and Molenaar 1992 | Psych Review 99(3), 395-417 | **WRONG TITLE.** The article is "**Stagewise** cognitive development: An application of catastrophe theory", not "**Stadium-wise** cognitive development". Volume, issue and pages are correct. The same error appears in MPN-1 [44]. |
| [77] van de Leemput et al. 2014 | PNAS 111(1), 87-92, DOI 10.1073/pnas.1312114110 | OK, exact |
| [78] Wichers et al. 2016 | Psychother. Psychosom. 85(2), 114-116 | OK, exact |
| [79] Loui et al. 2014 | Front. Hum. Neurosci. 8, 820; naive listeners at chance before training, significant improvement after | OK on existence and on "only after training". "Identified only gross discrete events" is the working group's gloss; the study is a binary seizure/non-seizure discrimination reaching 63.4% post-training |
| [80] Vickers, Sonification Handbook ch. 18 | chapter, title, author | OK, exact |
| [81] HSE CHIS6 | "In the last 11 minutes before the explosion the two operators had to recognise, acknowledge and act on 275 alarms"; refinery "injured twenty-six people and caused damage of around £48 million"; "no more than one every ten minutes"; "no more than ten displayed in the first ten minutes following a major plant upset" | OK, all four figures verbatim. Note the ledger attributes the injury and damage figures to [83] (existence-only); they are in fact in [81], which is VERIFIED |
| [82] HSE COMAH case study | "Excessive number of alarms in emergency situation reduced effectiveness of operator response"; "Control panel graphics did not provide necessary process overviews" | OK, both quoted causes verbatim |
| [84] EEMUA 191 | edition 4, 2024 | OK |
| [85] IEC 62682:2022 | edition 2.0, 8 December 2022, TC 65/SC 65A | OK, exact |

Unverifiable in this pass: [3], [4], [5], [14], [21], [87] (Eigenia corpus, no public copy); [7] and [29] (GitHub returns 403 to the proxy; existence recorded in the series ledgers).

### Bibliographic divergences from siblings

| Source | MX-R | Sibling | Divergence |
|:---|:---|:---|:---|
| Gadalla et al. | [19] "17, **1526215**, 2026" | MPN-3 [49], MPN-4 EU [33]: "17, 2026" | Article number present here, absent there |
| Copet et al. | [20] "Defossez"; no version | MPN-3 [12] "**Défossez**"; "(v3, 30 January 2024)" | Diacritic dropped; arXiv version dropped |
| Cideron et al. | [66] "Cideron, G., et al." | MPN-3 [13]: full 14-author list | Author list abbreviated |
| van de Leemput et al. | [77] "et al." | MPN-4 EU [49]: full 19-author list | Author list abbreviated |
| Juslin and Vastfjall | [52] unaccented | MPN-2 [36] "Västfjäll" | Diacritic dropped |
| Gabrielsson and Lindstrom | [42] unaccented | MPN-2 [39] "Lindström" | Diacritic dropped |
| Hanggi et al. | [74] unaccented | MPN-1 [37] "Hänggi" | Diacritic dropped |
| Walker 2002 | [54] "8(4), 211-221" | MPN-4 EU [43]: no volume or pages | MX-R is the better entry; the EU edition is deficient |
| Crans et al. | [32] "116(6), 479-495" | MPN-2 [45]: "116(6)", no pages | MX-R is the better entry |
| Boucsein; John and Srivastava | [27], [10] "2nd edition" | MPN-1 [74], [63] "2nd ed." | Abbreviation style |
| van der Maas and Molenaar | [76] "Stadium-wise" | MPN-1 [44] "Stadium-wise" | Consistent with the sibling, and **both are wrong** |

The diacritic pattern is uniform inside MX-R (no accented characters anywhere in the reference list) and therefore reads as a deliberate house style rather than an error, but it is not the style of MPN-1, MPN-2 or MPN-3 and the series should settle on one.

### Numbers and quotations the ledger does not support

1. **Line 76, "the served endpoint accepts three scalars".** WRONG, and it contradicts the paper it cites. MPN-3 line 35: "`/generate-v2/` accepts only the trauma and entropy scalars and the three register weights", that is **five**, "builds a **three-adjective** text prompt from thresholds"; MPN-3 line 56: "the served endpoint takes five". The paper has confused the count of prompt adjectives with the count of accepted scalars. The ledger's [7] note ("served endpoint") records no number and so does not catch it.
2. **Line 76, the 57-dimensional enumeration is short by two components.** The paper lists "the DISC and Big Five scores with the register weights, the dark-triad scores, physics terms and thirty-six one-hot bias indicators", which sums to 55. MPN-3 line 56 adds "trauma and entropy" and sums to 57. As written the paper's own enumeration does not reach the number it names.
3. **Line 17, "its first projector was fitted to random targets, its second to ten error strings".** Mislabels the artefacts. MPN-3 section 3.1 concerns a GPT-2 with adapters trained on uniformly random tokens; section 3.2 concerns a distilgpt2 planner trained on ten error-string labels. The 57-dimensional projector (MPN-3 section 2.4) is a third, separate component that was never trained at all. Neither trained model is a projector.
4. **Line 106, "sufficient for adapter training at the scale the programme needs [29] [30]".** The ledger records [29] as establishing "feasibility of adapter training on one accelerator; no metric reported", and MPN-3 quantifies it as 27 minutes of audio in under 15 minutes. The programme's own budget (line 260) is ten hours. "At the scale the programme needs" is a generalisation two orders of magnitude beyond the cited evidence.
5. **Line 226, the speech-stress claim is attributed to [6] and [3].** The ledger states explicitly (line 108) that "the corpus-specificity of reported speech accuracies is attributed in the paper to the working group's own reading, not to a cited review". MPN-1 section 6.6 makes the attribution correctly ("on the working group's reading of the recent reviews"). MX-R's sentence runs the speech claim and the Barrett facial-movement finding together under one trailing "[6] [3]", so the speech half reads as sourced to a review of facial expression. The ledger does not support that reading of its own paper.
6. **Line 331, "the working group has publicly committed to accepting any of them".** No citation, no requirement, no mechanism. No DM requirement obliges the working group to publish a negative result from 5.5; DM-23 governs only claims that do leave the environment. The commitment is asserted, not instituted.
7. **Line 15, "the operator complies with all applicable Mexican legal requirements, including consent".** An affirmative factual assertion about an unnamed party, with no citation and no supporting requirement anywhere in the paper. Noted here only as an unsupported claim in a claim-hygiene sense; no legal or compliance content is being recommended.

---

## 4. Claim audit

| Line | Claim | Standing |
|:---|:---|:---|
| 17 | The psychometric-to-music mapping is unvalidated; no study recovers a psychometric vector from a rendering | Supported [3] |
| 17 | The DISC-by-Big-Five tensor product has no measurement-theoretic warrant | Supported [3], F-9 |
| 17 | Physiology indexes arousal and load; discrete emotion inference from a face is not established; extended to voice by the working group | Supported [6], extension declared |
| 17 | No lead time and no classification accuracy measured anywhere in the programme | Supported [3] |
| 17 | "Its first projector was fitted to random targets, its second to ten error strings" | Mislabelled; the substance is supported [5], the artefact names are wrong |
| 17, 289 | The reference implementation is a rule-based prototype with untrained ML scaffolding | Supported [5] [7] |
| 66 | DISC has acceptable short-interval reliability, weak non-independent validity, collapses largely onto two Big Five factors | Supported, but on a tertiary source [8] plus [3]; ledger marks VERIFIED-secondary |
| 68 | SD4 has acceptable short-scale reliability, validated for between-person research, never as an operational flag | Supported [12] [13], F-9 |
| 74 | The reference implementation hand-authors profiles across thirteen literary scenarios | Supported (MPN-3 line 29) |
| 76 | The 57-dimensional projection is computed and discarded at inference | Supported [5] |
| 76 | "The served endpoint accepts three scalars" | **Unsupported and contradicted** by [5]; it accepts five |
| 76 | A trait score is not a state; within-person variability is large relative to between-person differences | Supported [17] [18] |
| 82 | No discourse detection exists in the reference implementation's code | Supported [5] |
| 82 | The only empirical precedent for quantifying the discourses is an annotation-and-reliability study with no held-out prediction | Supported [19], F-13 |
| 86 | "Two calculi with no relation between them" is the reference implementation's central defect | Supported in substance [5]; understates the count |
| 100 | "Nobody has yet shown that a person can read one usefully" (a symbolic score) | Supported as a negative-search claim [4]; but no experiment in section 5 tests it, while the sentence calls it "a claim the environment can test" |
| 106 | One accelerator suffices for adapter training at the programme's scale | **Overstated** relative to [29] [30] |
| 202 | Tempo carries the STRONG tier; fast tempo and high intensity mark high-arousal expressions; cross-cultural recognition of tempo and mode cues | Supported [33] [34]; tier matches MPN-2's table exactly |
| 204 | The best-documented multi-variable auditory display carried six variables in two rhythmic streams, every event detected, 60% identified from sound alone | Supported and independently verified [25] |
| 204 | The working group found no study establishing a larger stream count | Stated as a working-group search result; carried from MPN-2 |
| 204 | The stream budget is a hypothesis testable by 5.1 | Hypothesis under test, and 5.1 is designed to test it |
| 210 | The four voice-leading styles are the working group's own coding at CONVENTION tier | Supported [3] [4]; tier matches MPN-2's table |
| 224 | HRV, EDA and pupillometry standing (standard measures; unvalenced arousal; luminance and gaze confound) | Supported [26] [27] [28] |
| 224 | Physiological workload measurement is established for simulator validation and research | Cited to [37] [38] [39] [40], all four marked existence-only; the paper says so explicitly ("verified the existence of those studies and not their contents") |
| 224 | "Found no source in which physiological state is fed back to an operating crew in real time by any modality" | Unsupported negative, declared as a search result. No DM requirement records the search |
| 226 | Speech-stress recognition is trained on acted corpora and its accuracies fall on spontaneous data | **Working group's own reading**, presented with a citation to a facial-expression review. See citation audit item 5 |
| 228 | Mode CONVENTIONAL, metre THEORY, roughness COMPONENT, perceived kept separate from induced | Supported; all four tiers match MPN-2's mapping table verbatim |
| 228, 156 | Every affective label is "recorded as a hypothesis" with sensor, quantity, window, mapping and experiment id | **Asserted but not carried through.** DM-5 and section 2.5 provide no such record; section 4.4 provides two of the five fields |
| 260 | Paper 3's data and evaluation budget (≈1,000 clips, ten hours, held-out vectors, training-independent objective metric, ≥25 listeners, ≥5 ratings, same-protocol baseline, confidence intervals) | Supported and independently verified against [20] [64] and MPN-3 section 5.5; every element matches |
| 262 | Aligning to hundreds of thousands of deployed-user judgements is out of reach; synthetic DPO pairs are feasible | Supported [66] [67] [68] [69]; 300,000 figure verified |
| 289, 293-299 | Every outcome of 5.4 and 5.5 stated as what the study "would allow the working group to claim" | Correctly framed as hypotheses under test throughout section 5 |
| 311-319 | Early-warning indicator theory, estimation method, and the five data requirements of Paper 1 section 5.6 | Supported [61] [62] [63] [75] [76] [74]; all five requirements transcribed correctly from MPN-1 section 5.6 |
| 323 | Critical slowing down applied to human mood, with the authors' caveats | Supported [77] [78] [61] |
| 323 | Naive listeners identified only gross discrete events and only after training, in sonified EEG | Supported on "only after training" [79]; "gross discrete events" is the working group's gloss |
| 329 | "Every earlier claim in the corpus was an assertion about data nobody else could see" | Supported by MPN-1 section 8 |
| 331 | "The working group has publicly committed to accepting any of them" | **Unsupported**; no citation, no requirement, no mechanism |
| 335 | No controlled study of continuous sonification of plant state in an industrial control room exists; no standard covers continuous non-alarm sonification | Supported [80] |
| 341 | 275 alarms in eleven minutes; twenty-six injured; about £48 million; the two quoted causes; the two benchmark endpoints | Supported and independently verified verbatim [81] [82] |
| 343 | The flood rule is the one rule with a documented industrial basis | Supported [4] [81]; consistent with MPN-2 section 5 |
| 345 | "The overview finding ... is the claim the environment is best placed to test: whether a room that hears a background it can read keeps a process overview that a room reading panel graphics alone does not" | **Hypothesis with no experiment.** No study in section 5 measures process overview as an outcome; 5.2 measures SAGAT levels and TLX, and the paper never maps overview onto a SAGAT level |
| 383 | Underwriting arithmetic is a sensitivity result; the insider-monitoring ALE claim was retracted in Paper 1 | Supported [3] (MPN-1 section 8 row 4) [87]; but the concepts have no referent in this paper |
| 15 | "The operator complies with all applicable Mexican legal requirements, including consent" | **Unsupported.** No citation, no requirement, and "the operator" is undefined in this paper |

No claim in the paper presents a measurement the environment has made; the "none has been run" framing (lines 48, 234, 337) is consistently maintained. The failures above are of mechanism and attribution, not of over-claiming results.

---

## 5. Style

| Rule | Result |
|:---|:---|
| No em dashes | PASS, zero occurrences |
| No banned words (leverage, utilize, pivotal, testament to, foster, streamline, at its core, beacon, game-changing, harness, furthermore, robust) | PASS, zero occurrences |
| No leading H1 | PASS, document opens with the metadata table; all headings are H2/H3 |
| Headings under 90 characters | PASS, longest is line 258 at 66 characters |
| Citations as `word [n].` | PASS, matching the corpus pattern used by MPN-1/2/3 and the EU edition |
| Every mermaid block opens with accTitle and accDescr | PASS, four blocks at lines 108, 167, 266, 351, each with accTitle then a braced accDescr |
| No company named | PASS in the body; the refinery is "a refinery at Milford Haven" (341) and never named. "Texaco" appears only inside the HSE report titles at [82] and [83], exactly as in MPN-2, MPN-3 and the EU edition |
| No `$` inside table cells | PASS; the only `$` usages are `$W$`, `$x$` and the display equation at 311-313, all in prose |
| Prose rather than bullets in the body | PASS with one deliberate exception: the DM-1 to DM-23 list (139-161), which matches the F-, N-, E- and D- requirement lists in every sibling paper |

One non-rule style observation: DM-18 (156) contains the malformed normative construction "No such label MUST be carried" twice, which reverses the requirement's meaning. Recorded as an internal-consistency defect above rather than a style defect.

---

## 6. Weakest paragraphs

**Line 15.** A single sentence carrying an unsupported factual assertion about an unnamed party, with no citation and no anchoring requirement, in a paper whose entire thesis is that the series' besetting fault was asserting things nobody else could check. It also introduces "the operator" in a sense (the organisation) that collides with the paper's own use of the word on twenty other lines (the person at a console), and that sense appears nowhere else in the document. The sentence is severable without loss to anything around it.

**Line 44.** The paragraph that decides what is *not* relaxed, and it gets both of its two subjects partially wrong while leaving the paper's real relaxation gaps unmentioned. It describes E-4 as "the rule that makes a rendering reproducible" and omits both E-4's mode restriction and its own N-27 clause; it then relies at line 212 on an E-4 translation for `delta` that Paper 2 section 8.2 does not contain. It asserts that "no vector in the environment describes a participant in a simulator study" as a general property, which is true only of profile vectors and not of the per-participant indices and affective labels section 4.4 carries. And it is the natural place for E-11 and E-15 to have been discussed, which they are not, so the paper's strongest structural claim, that MX-R relaxes "exactly" the named requirements (23), fails here without the reader being told.

**Line 224.** The longest paragraph in the paper and the one carrying the most weight per citation. It establishes the evidential basis of the whole of operator-state mode on four sources the working group has verified only the existence of ([37] to [40]), then adds a negative literature claim ("found no source in which physiological state is fed back to an operating crew in real time by any modality") that no requirement records, no search protocol supports and no reader can check. It then concludes that rendering such an index back to its source "is an extension beyond published practice, which is why it is an experiment here and not a product", which is the right conclusion drawn from material too thin to bear it. The honesty of the disclosure ("verified the existence of those studies and not their contents") does not repair the fact that the paragraph is the load-bearing justification for section 4.4 and for milestones M2, M3 and M6.

Runners-up: line 76 (contains two verifiable factual errors, items 1 and 2 of the citation audit) and line 345 (asserts the environment is "best placed to test" an outcome no study in section 5 measures).

---

## 7. Verdict

**AFTER FIXES.**

The paper is structurally sound, its requirement set is contiguous and correctly counted, its reference apparatus is complete with no orphans in either direction, its bibliographic data survived a thirty-four-reference spot check with one wrong title, and its claim framing holds throughout: nothing is presented as measured. What it has are two verifiable factual errors that contradict its own sibling paper, one cross-reference gap that undoes its central structural claim, three mermaid edge defects, and four places where a requirement asserts a mechanism the described logging schema does not provide. None of this is a rewrite. All of it is correctable without re-planning the document.

Fix list, ordered by severity:

1. **Line 76: correct "the served endpoint accepts three scalars" to five.** MPN-3 lines 35 and 56 say the `/generate-v2/` route accepts the trauma and entropy scalars plus the three register weights and builds a *three-adjective* prompt. As written the paper states a fact about the reference implementation that the paper it cites contradicts.
2. **Lines 23, 33, 92, 154: name E-11 in the relaxation table, or remove the mute record.** E-11 forbids "any record of who used it" and is not relaxed, while three separate places in the paper require the mute to be logged as a measure. Line 23's "relaxes exactly the requirements named" is false until this is fixed.
3. **Line 76: complete the 57-dimensional enumeration.** Add trauma and entropy; as listed the components sum to 55.
4. **Lines 178-189: add `OPM --> REND`, add the calculus node, and route the input channels to `LOG`.** The section 4 diagram cannot render operational mode, has no calculus, and logs nothing but audio, against its own accDescr and against DM-5.
5. **Lines 143, 92, 156, 228: put the affective-label record into the logging schema.** DM-18 requires five fields; DM-5 and section 2.5 provide none and section 4.4 provides two. This is the mechanism the paper's honesty argument rests on.
6. **Lines 349, 355, 357: settle the gate semantics and break G1's circularity.** G1 requires DM-11, which is what M1 delivers; the accDescr says both that gates precede milestones and that M1's gate opens M2; G2 is a registration, not a recorded result.
7. **Line 76 reference [76]: correct "Stadium-wise" to "Stagewise".** Also correct in MPN-1 [44], where the same error originates.
8. **Line 30 vs 145: reconcile the N-14 relaxation with DM-7.** Either the row says "as to the count and the register and timbre distinctness", or DM-7 drops the sharing exemption.
9. **Lines 140, 58, 148: make the three manifest enumerations agree.** Add the seed and the Paper 2 section 3.1 constant set to DM-2; add the engine version and the profile sampler to section 2.1.
10. **Lines 173, 104, 117, 183: fix the channel inventories.** Either describe the synthetic historian in section 2 or delete node `H`; add the luminance channel to the sensor nodes, to section 4.4's sensor list and to DM-5.
11. **Line 106: soften the accelerator claim** to what [29] establishes (feasibility on one accelerator on a 27-minute dataset), not sufficiency "at the scale the programme needs".
12. **Line 226: re-attribute the speech-stress claim** to the working group's own reading, as the ledger (line 108) and MPN-1 section 6.2/6.6 already do; as written the trailing "[6] [3]" makes a facial-expression review appear to source it.
13. **Line 156: repair DM-18's normative language.** "No such label MUST be carried" means the opposite of what is intended; use "MUST NOT".
14. **Lines 27-42: complete the subject column for N-3, N-19, N-25 and E-5,** each of which drops a clause the reader needs to know whether it survives (the N-25 carve-out in N-3; "enter $T$" in N-19; the go/no-go prohibition in N-25; "operational" and the language-model extraction in E-5).
15. **Line 383, line 369: remove or define "premium delta" and "underwriting arithmetic",** which are undefined field-edition imports, and align the `NV` node with the four items the prose lists.
16. **Lines 349 and 301-307: gate the adversary-discourse study,** which is the sixth study and has no milestone, or say in section 9 why it is ungated.
17. **Lines 141 and 37: state whether E-15 binds the learned rendering path.** E-6 is relaxed to allow a learned renderer on a rendering path, and DM-3 permits it to be stochastic; E-15 is not in the table.
18. **Line 158: cite F-6 alongside or instead of F-8 in DM-20.** MPN-1 section 5.6 ends "F-6 requires it to be written as such"; F-8 is keyed to section 5.4.
19. **Line 212: fix the E-4 cross-reference.** Paper 2 section 8.2 declares a translation for the nine-component simulation vector only and none for `delta`. Either add the rule to Paper 2 or stop citing 8.2 for the discourse assignment.
20. **Lines 15, 331, 345: remove or support three unsupported assertions.** The compliance sentence, the "publicly committed" sentence, and the "best placed to test" claim about process overview, which no study in section 5 measures.
21. **Line 17: correct "projector" to the trained models it means** (the v1 GPT-2 and the v2 planner); the 57-dimensional projector was never trained.
22. **References [37] to [40] and [70]: supply the authors,** all of which resolve in seconds from the DOIs the entries already carry, and add volume 6 to [40] and pages 573-576 to [34].
23. **Series hygiene: settle diacritics and author-list style.** MX-R strips every accent and abbreviates author lists that MPN-3 and the EU edition give in full; MX-R also carries the Gadalla article number and the Walker and Crans page ranges that siblings omit. One convention, applied to all five papers.
