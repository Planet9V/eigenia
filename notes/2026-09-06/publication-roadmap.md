# Eigenia publication roadmap and reference model

Date: 2026-09-06
Author: corpus planning pass
Status: proposal. Nothing in it has been applied. Several items need Jim's decision before anyone starts.
Inputs: the four audits at `notes/2026-09-06/audit-*.md` (127 findings, 49 documents), `notes/2026-09-06/citation-web-register.md`, `notes/2026-09-06/findings.md`, `notes/2026-09-06/uplift-cut-list.md`, `notes/2026-09-06/orchestration-registry.md`, and the binding rules in `CLAUDE.md`.

This is a plan, not a fifth audit. Where it states a number, the command that produced it is shown.

## 0. Measured starting position, recounted

Run at the time of writing. The Cascading Failure paper was locked and under edit by another agent, so its rows are a snapshot.

```
$ find references -name '*.md' -not -path '*external-research*' | wc -l        # 49
$ find references -name '*.md' -not -path '*external-research*' -print0 \
    | xargs -0 wc -w | tail -1                                                 # 180,155 words
$ grep -rhoE '\[[0-9]+\]' references --include='*.md' | wc -l                  # 490 markers
$ grep -rniE '^#+ .*(references|bibliography|works cited)' references \
    --include='*.md' | grep -v external-research                               # 10 documents
```

Four things follow that the working-group table in the register does not show on its face.

1. **All 49 published documents are registered and reachable.** `papers.ts` and `wikiRegistry.ts` each resolve 50 paths; the 50th is `references/external-research/README.md`. Nothing on disk is orphaned from the site, and no registered path is missing from disk. Every defect below is live in production.
2. **The corpus's largest single document carries no in-text citations.** `WG-04-CF-Cascading Failure Hypothesis.md` is 42,687 words with 0 `[n]` markers and four separate reference-section headings (`## 11. References`, `## Primary Sources`, `## Appendix N: References and Bibliography`, `## Primary Sources - McKenney Research`). The group's 375 markers all sit in its six sibling documents.
3. **The register's W1 and W2 are closed.** `WG-04-CF-Project-Inertia.md` (5,486 words, 105 markers, `## 8. Bibliography`) and `WG-04-CF-ERCOT-WECC-IBR-Reliability.md` (4,892 words, 81 markers, `## 8. Bibliography`) now exist on disk and are registered, as do *Grid-Unseen-Tremors* and *Unseen-Current*. Four of the seven works the register tracked have been written.
4. **24 of 49 documents are compiler-owned.** 20 `compile_*.py` scripts each own exactly one file; four more files are touched only by `sweep_academic_formatting.py`, `fix_all_academic_issues.py` or `enhance_manuscript_math.py`. Every repair to those 24 must be applied to the `.py` in the same commit or the next run reverts it. The ownership map is in section 7.

## 1. The reference model

This makes concrete what `CLAUDE.md` already fixes. It does not replace it. Where this document and `CLAUDE.md` disagree, `CLAUDE.md` wins, and the fix is to amend its managed block rather than keep a second scheme here.

### 1.1 In-text citation

- IEEE numeric brackets only: `[5]`, `[3], [7]`, `[3]-[6]`.
- Never glued to a word or to trailing punctuation. `frequency decreases [5].` is correct; `decreases.5` is not.
- Numbered in ascending order of first appearance.
- No marker without a matching numbered entry in the same document. No entry that no marker invokes.
- Author-date is not an alternative. Where a document uses it today (`WG-03-ML-Cognitive-Bias-Catalog.md`, `MP_Mathematical_Models.md`, `WG-03-ML-Musical-Psychometric-Notation.md`), conversion to brackets happens in the same pass that builds its bibliography.

### 1.2 Bibliography

One section, the last numbered section of the document, headed `## N. References`. A numbered list whose indices match the markers exactly. In a compiler-owned document the list lives in the `.py` as well.

| Source type | Entry form |
|:---|:---|
| Standard | Body. *Title*, part, edition and year. Publisher. The clause goes in the text, not the entry: "IEC 62443-4-2, CR 3.14 [4]". |
| Regulation | Instrument name, official number, article or annex, Official Journal citation, date of entry into force and date of application. |
| Journal or conference paper | Authors. "Title," *Venue*, vol., no., pp., year. **DOI required.** No DOI and no stable URL means no entry. |
| Operator or agency report | Body. *Title*. Final or version, date. URL. Retrieved date. Interim editions labelled interim. |
| Book | Author. *Title*, edition. Publisher, year. Page or chapter where a specific claim is drawn. |
| Dataset or feed | Provider. *Name*, version. Retrieved date. The query or endpoint used. |
| Market instrument (Lloyd's bulletin, LMA clause) | Issuer, exact identifier, title, date. Issuer and numbering scheme are never fused; "LMA5381 / Y5381" is not a citation. |
| Eigenia work | McKenney, J. *Title*. Eigenia Labs, WG-code, year. Site slug. The work must be published and reachable before the citation ships. |

### 1.3 Citing an Eigenia work

An Eigenia work may be cited as the source of Eigenia's own framing, model, method or parameter set. It may **never** be the source of record for an empirical fact about an external system. This is the register's rule and it is the one that matters most.

The test before writing an Eigenia citation: if the sentence says what AEMO measured, what NERC reported, what Lloyd's mandates, or what a standard requires, the citation goes to that body, not to us. If the sentence says what our model assumes or produces, the Eigenia citation is correct and the sentence must carry the word "modelled".

A scenario artifact of a synthetic reference network is labelled as such and marked non-retrievable, so a reader does not try to request it. `EE-CTI-004` and `EE-CTI-005` are the existing instances.

### 1.4 Marking synthesis against external fact

Three labels, used explicitly, one per claim.

- **Sourced.** Carries `[n]`. The number came from the cited document.
- **Modelled.** The words "modelled" or "assumed" appear in the sentence, the parameter's origin is named, and the parameter sheet is cited. `RefDNSP-1.2M` is the working precedent.
- **Novel synthesis.** The sentence says so: "This is the working group's own synthesis; no external analogue was found." `CLAUDE.md` already names this as legitimate.

Banned as labels for a computed result: **verified**, **empirical**, **validated**, **we prove**, unless a named external measurement is cited in the same sentence. Correct arithmetic on author-chosen inputs is not verification, and checking the sums confirms the wrong thing.

### 1.5 Evidence files

`references/external-research/<WG-code>_<topic-slug>_<YYYYMMDD>.md`, one file per topic, numbered `## Source N` blocks inside. Header line: *"External research; found via valyu, not the working group's own analysis."* Each source carries Title, URL or DOI, Retrieved date, the Query run, Supports (which paper and which claim), Summary, and an explicit Gaps section.

Two rules the five existing WG-04-CF files got right and which are now standing:

- **Record negative results.** A figure that was searched for and not found is written down as absent, with what was read. F7 in `findings.md` closed a gap in the negative, with certainty, because of this.
- **Warn at the top, not in a footnote.** Where a source is being applied outside its determined range, the warning goes above the sources. `WG-04-CF_outage-cost-vcr_20260906.md` is the model.

### 1.6 Shared parameters

A parameter used by more than one document lives in one sheet and is cited, never restated. Restating is how the corpus arrived at five destruction thresholds for one scenario.

### 1.7 Formatting invariants that bind every entry

From `CLAUDE.md`, unchanged: no leading `# H1` or `## H2` duplicating the hero-card title or subtitle; headings under 90 characters; no narrative sentence on a heading line; zero em dashes; zero banned filler words.

## 2. Works to create, prioritised

Priority is by published words unblocked. Compiler ownership is flagged because it doubles the edit surface.

### 2.1 Load-bearing works that must be written

**P1. Reference facility specification: the modelled 100 MW AI campus.**
Owner WG-02-DT. New file, hand-maintained, cited by seven working groups.
Must establish: `P_die`, `C_thermal`, `R_theta,jc`, junction start temperature, throttle setpoint, destruction threshold, coolant supply and return, flow per tray and per rack, rack duty, accelerators per tray, trays per rack, rack hardware replacement cost, business-interruption rate, and **one derivation** of time-to-threshold from those values.
Depends on it: 13 documents, 39,886 words, use the 94.0 °C scenario; the ROSI chain in 23 documents rests on the rack cost and the BI rate.
Evidence available: none required. This is Eigenia's own model and may be its own source of record under 1.3, provided every citing sentence says "modelled". The one external input needed is a cited PG25 property table, because F-DT-08 and F-CAD-24 both back-solve against assumed properties.
Still needs: Jim's decision on the six contested rows (section 4, A1).

**P2. Actuarial method note: ALE, SLE, PML, ARO, ROSI and the Gordon-Loeb bound.**
Owner WG-01-UI. New file.
Must establish: that SLE and PML are distinct and are not equal; that ARO carries units of yr⁻¹; that ROSI is a modelled ratio, not a measurement; that Gordon-Loeb gives an **upper bound**, `I* <= ALE/e`, not a recommended spend; and the single rule for how a control's benefit is expressed when no published benchmark maps onto it.
Depends on it: 23 documents, 80,131 words, mention ROSI. Every "verified ROSI" in WG-01-UI, WG-02-DT, WG-03-ML, WG-05-CAD and WG-07-TM resolves against this note.
Evidence available: `WG-04-CF_remediation-cost-benchmarks_20260906.md` already carries the Dragos and Marsh McLennan 2025 range of 12 to 18 percent per control, the only control-effectiveness benchmark located anywhere in this project.
Still needs: Gordon-Loeb (2002) filed as an evidence file, and a decision on whether the corpus adopts the smaller benchmark numbers or drops percentages for qualitative statements.

**P3. Bill-of-materials layer specification.**
Owner WG-05-CAD. New file.
Must establish: that CBOM means **Cryptography** Bill of Materials, bound to the CycloneDX `cryptographic-asset` component type, throughout; a different name for the physical-materials layer; and that the 4-BOM, five-layer and six-layer arrangements are Eigenia's composition **over** CycloneDX 1.6, not part of it.
Depends on it: 23 documents, 74,508 words, mention CycloneDX; seven use CBOM in one of the two senses.
Evidence available: none filed. Needs the CycloneDX 1.6 specification and the correct standards anchor.

**P4. Zone, conduit and security-level model.**
Owner WG-05-CAD. New file.
Must establish: one zone numbering for the corpus; that IEC 62443 does not itself number zones; that Purdue levels are a different construct and are not IEC 62443 zones; and the SL-T, SL-C, SL-A distinction, with SL-C named correctly as capability rather than achieved.
Depends on it: four mutually incompatible schemes across SFAIRP, FRONT, CYH and UNI; 23 documents, 119,713 words, mention IEC 62443.
Evidence available: none filed. Needs IEC 62443-3-2 and -3-3 clause text.

**P5. WG-08-MO Monte Carlo engine, expanded to publication length.**
Owner WG-08-MO. Existing file, 539 words, hand-maintained. **This is an expansion. Nothing in the current text is proposed for removal.**
Must establish: N; a confidence interval for every reported percentile; convergence behaviour under a fat tail; a definition and formula for each of VaR, CVaR, the Gaussian-Pareto ratio, antifragility, the barbell score, eigenvector centrality and the importance score; the derivation of the 0.3 constant; and how the wall-clock fallback is recorded so that a shared `rngSeed` reproduces a run.
Depends on it: the ATQ paper's "68.4% of trials", which drives an ALE from $2.4M to $18.2M and a Gordon-Loeb allocation.
Evidence available: none. Needs Taleb, Gordon-Loeb, Artzner et al. on coherent risk measures, and the Mulberry32 reference implementation.

### 2.2 The four dangling works: write or strike

Each is cited exactly once, which is the distinction the register drew. None is the case that justified writing three papers today.

| Work | Cited in | Recommendation | Why |
|:---|:---|:---|:---|
| *Topological Cyber-Physics: Foundations of the Digital Twin* | `MP_Kramers_Escape_Model.md` `[3]` | **Strike now; write later on its merits** | It is the only source offered for the paper's central move, the mapping of a rate law onto graph topology. That mapping is Eigenia's own, so the honest repair is one line: relabel it novel synthesis per 1.4. Writing the paper does not fix the citing document, because `MP_Kramers_Escape_Model.md` has no unit of time anywhere in its model (F-ML-09) and an Eigenia paper cannot supply one. Fix the model first. |
| *Psychohistory and the Digital Twin: Modeling the Adversary* | `WG-03-ML-Mckenney-Lacanian.md` `[3]` | **Strike** | One citation, in an 899-word note, supporting the Psychometric Tensor, which the audit independently says should be labelled novel synthesis (F-ML-17). Writing a paper to justify one sentence is the wrong trade. The strike plus the label makes that document clean. |
| *McKenney-Lacan Symphonic Calculus: Glossary & Briefing* | `WG-03-ML-Musical-Psychometric-Notation.md`, entry 1 of 4 | **Strike the citation. Publishing the glossary is a separate decision** | It sources a glossary, not a fact. Two drafts exist at `papers-pre-publish/Research_equations/RSCH-37` and `RSCH-39`, so publication is cheap if Jim wants it, but the citing paper's real problem is the fabricated 15-event study in §5.2 (F-ML-18), which no glossary fixes. |
| *Systems Assurance in High-Entropy Industrial Complexes* | `WG-05-CAD-Frontier-AI-Hardware-Security.md`, bibliography ref 13 | **Strike** | It is invoked by no `[n]` marker, because that document has zero markers against a 24-entry bibliography. Striking costs nothing in the body text. |

Three strikes and one deferred write. That is the correct ratio for works cited once.

### 2.3 Not a work: the register's remaining row

**W3, bibliography normalisation for WG-04-CF**, stays open in the register, and it now has more to do than when it was written: the flagship 42,687-word paper has four reference sections and no markers, so normalisation there means building the apparatus, not tidying it.

## 3. Sourcing backfill, prioritised

Ordered by published words unblocked. Counts exclude `references/external-research/`.

```
$ grep -rli '<pattern>' references --include='*.md' | grep -v external-research \
    | tr '\n' '\0' | xargs -0 wc -w | tail -1
```

| # | Source to find | Docs | Words | Closes |
|--:|:---|---:|---:|:---|
| 1 | **Lloyd's Market Bulletin Y5381**: real issuer, number scheme, title, date, and whether it mandates or permits an exclusion | 24 | 77,452 | F-CAD-02, F-CAD-14, F-DT-12, and the "war exclusion waived" claim in five benefit tables |
| 2 | **IEC 62443-3-2, -3-3, -4-2**: editions, SL definitions, CR numbers, whether the standard numbers zones | 23 | 119,713 | F-CAD-07, F-CAD-11, F-CAD-13, the SL-T formula in F-CAD-19 |
| 3 | **CycloneDX 1.6 and its standards anchor**; SPDX and ISO/IEC 5962; IEEE 1680's actual scope | 23 | 74,508 | F-CAD-01, F-CAD-09, F-CAD-12 |
| 4 | **Caliptra 2.0, OCP SAFE, SPDM 1.3, NIST SP 800-193 and 800-208, CNSA 2.0** | 16 | 60,045 | F-CAD-06, part of F-DT-10 |
| 5 | **Taleb**, *The Black Swan* and *Antifragile*, edition and page | 15 | 41,928 | the 25 unattributed Extremistan and Mediocristan invocations in WG-01-UI, and WG-08-MO's barbell and antifragility metrics |
| 6 | **EN 50126, EN 50129, CLC/TS 50701, ISA TR 84.00.09** | 10 | 42,014 | F-DT-10, F-CAD-10, F-CAD-19 |
| 7 | **Regulation (EU) 2024/2847**: real dates, Annex III against Annex IV, Articles 13, 14 and 64 | 12 | 39,613 | F-CAD-03, F-CAD-04, F-CAD-05 |
| 8 | **MITRE ATT&CK for ICS**: T0837 and T0869 names, Enterprise against ICS tactic count; **CISA** sector count | 8 | 63,907 | F-TM-01, F-TM-02, F-TM-03 |
| 9 | **Gordon-Loeb (2002)** | 6 | 22,283 | F-ML-15, and the 17 invocations that carry the whole WG-01-UI capital argument |
| 10 | **ISASecure certification registry**, queried and dated | 3 | 7,461 | F-DT-26, a named negative claim about CoolIT, Vertiv, Motivair and Schneider |

Ranks 9 and 10 sit below their word count deliberately. Gordon-Loeb is the cheapest item on the list, one paper with a DOI, and it is a prerequisite for P2, so it runs early despite ranking ninth. Rank 10 is the corpus's only published negative assertion about named commercial products; it carries a risk the word count does not express and should be settled or struck before anything else in WG-02-DT ships.

Three further items are unranked because they are single-document but immediately actionable:

- **Guy Carpenter and Guidewire Cyence, 2025 loss curve**, and **Lloyd's and Cambridge, *Business Blackout*, 2015**. Both URLs are already recorded in `audit-WG-01-UI.md` under F-UI-11 and F-UI-12. These can be filed as `WG-01-UI_*` evidence files today with no new searching.
- **FRONT bibliography refs 12 and 15** (Ashok et al.; Sethi et al.). Both have the shape of fabricated citations. Produce a DOI or strike. Until that is settled, nothing else in that bibliography is trustworthy.
- **Uptime Institute** on what Tier certification does and does not certify (F-UI-07).

Named methods that need a source but no judgement, and can be batched one evidence file per working group: Dittus-Boelter, Joukowsky, Darcy-Weisbach, Vietoris-Rips persistent homology, Granovetter (1978), Kramers (1940), Plomp and Levelt (1965), Miller (1956) with the modern working-memory correction, Sweller, Klein's RPD, Yerkes-Dodson, Schenker, Fux (1725) and Bach. Two are already in the corpus and merely mis-pointed: Li et al. (2015) is entry 2 of the Morphogenesis bibliography under a Microsoft attribution, and Cohn (1998) is entry 2 of the Musical bibliography while that paper's PLP result contradicts it.

## 4. Shared artifacts that fix cross-document defects

These cannot be fixed one document at a time. Each is a single artifact plus one sweep against it.

**A1. Reference facility parameter sheet** (= P1).
Closes: F-XD-03, part of F-XD-04, F-DT-01, F-DT-03, F-DT-14, F-DT-15, F-DT-16, F-DT-21, F-DT-29, F-ML-05, F-ML-20, part of F-ML-21, F-TM-14, F-TM-15, F-TM-16, F-TM-21, F-CAD-20, F-CAD-23, F-CAD-24, F-CAD-28, F-CAD-29. Twenty-one findings collapse into one decision table.
Contested rows: destruction threshold (85, 90, 94, 105 to 115, 115 °C); heating rate (2.67, 4.2, 4.5, 8.45 °C/s); thermal capacitance (142 or 450 J/K); heat flux (100, 120, 140, 148 W/cm²); rack cost ($120,000 against $2,850,000, a factor of 23.75); BI rate ($18,500, $24,000 or $120,000 per hour); flow (38.5, 40 to 80, 140, 385 L/min).
The only internally consistent thermal block in the corpus is `WG-05-CAD-Frontier-AI-Hardware-Security.md` §8.1, where P, C, rate, start and threshold all agree. It is the natural template.

**A2. Actuarial method note** (= P2).
Closes: F-UI-08, F-UI-13, F-UI-14, F-UI-15, F-DT-20, F-DT-22, F-DT-25, F-ML-15, F-ML-19, F-CAD-15, F-CAD-26.

**A3. BOM layer specification** (= P3). Closes F-TM-06 / F-CAD-12, F-CAD-22, and part of F-CAD-01.

**A4. Zone, conduit and security-level model** (= P4). Closes F-CAD-11, F-CAD-13, F-TM-07.

**A5. Threat-corpus counts register.** One table giving the authoritative value for the MITRE tactic count and which matrix it comes from; the CISA sector count; the TACAM record, edge, EPSS and geopolitical counts; the twelve ATQ weights and their sum; and which ATQ version each published actor score belongs to.
Closes: F-TM-01, F-TM-02, F-TM-10, F-TM-11, F-TM-12, F-TM-24, F-TM-25.
Consequence Jim must accept before this starts: renormalising the ATQ weights from 1.05 to 1.00 moves every published ATQ score, in the papers, in the SQL at `WG-07-TM-ATQ.md:124-205`, and in the published interactive terminal at `web/public/terminals/atq-card-terminal.html`.

**A6. The "verified" sweep.** Not a document. One mechanical pass applying the decision rule in 1.4.

```
$ grep -roiE '\bverified\b|\bempirical(ly)?\b|we prove|\bvalidated\b' references \
    --include='*.md' | grep -v external-research | wc -l     # 136 occurrences
$ ... | cut -d: -f1 | sort -u | wc -l                        # 32 documents
```

136 occurrences across 32 documents totalling **157,050 words, 87 percent of the published corpus**. It closes the F10 defect class corpus-wide, needs no external source, and no other single action touches as much text.

**A7. Front-matter and heading conformance pass.** 26 of 49 documents open with a leading `# H1` that the hero card already renders; 13 headings run to 90 characters or more; 33 spaced-semicolon artifacts remain in 3 documents; 1 document still carries an em dash. Each H1 must be checked against its hero-card title before removal, because not every leading H1 is a duplicate.

**A8. Citation apparatus build, per working group.** Two opposite failures need opposite fixes. WG-02-DT has 69 markers and no bibliography anywhere, so every marker in that working group points nowhere; they cannot be resolved without the drafting history, and if that history is gone the honest options are to reconstruct or to strip. `WG-05-CAD-Frontier-AI-Hardware-Security.md` is the inverse, 24 entries and zero markers, so its bibliography must be wired into the body or reduced to the entries the argument actually uses.

## 5. Sequencing

**Gate 0. Decisions only Jim can make.** Nothing downstream of a row here should start.

1. The six contested parameter rows in A1.
2. Write or strike, per work, for the four in 2.2.
3. Whether the 15 "Seldon Crisis" events exist. If they do not, `WG-03-ML-Musical-Psychometric-Notation.md` §5.2 is fabricated and must go, and the paper's headline 15-to-30-minute early-warning claim goes with it.
4. Whether `MP_Mathematical_Models.md` or the production engine is the source of truth. If the engine is, F-ML-10 through F-ML-13 are bug reports against `mc-weights.ts` and `ale-engine.ts`, not paper edits, and they belong in a different repository.
5. Whether the ISASecure claim about four named vendors stands, is narrowed, or is struck.
6. ATQ renormalisation, accepting that every published score moves.
7. Whether `WG-01-UI-1-Req-Improvements.md`, an internal work-item list with three empty sections, belongs on a public site.
8. Whether line 636 of the Cascading Failure paper, which attributes an inertia finding to ENTSO-E, was repaired separately from the writing of *Project Inertia*. The register is explicit that repointing it at the new Eigenia paper would convert a sourcing gap into a misattribution. The file was locked during this pass and could not be checked.

**Stage 1, in parallel, no dependencies.** A6, the verified sweep. The three strikes from 2.2. Filing the two WG-01-UI evidence files whose URLs the audit already carries. Resolving FRONT refs 12 and 15.

**Stage 2, blocked on Gate 0.** A1 and A2 written. These are prerequisites for every arithmetic repair, because the repairs are recomputations against them.

**Stage 3, blocked on stage 2.** Per-document recomputation against A1 and A2. This is where the 29 arithmetic findings in WG-05, WG-07 and WG-08 and the 11 in WG-02-DT are actually fixed.

**Stage 4, in parallel with stage 3.** Sourcing backfill in section 3 order. Ranks 1 and 9 first, because Y5381 unblocks the most text and Gordon-Loeb is a prerequisite for A2.

**Stage 5, blocked on stage 4.** A3, A4 and A5. Each needs the standard text stage 4 supplies.

**Stage 6, blocked on stages 3 and 5.** A8, bibliographies and marker resolution. A bibliography cannot be built before its sources exist.

**Stage 7, last.** A7, formatting conformance. It runs last because every earlier stage rewrites text and would reintroduce violations.

**Standing constraint across all stages.** Content is never truncated. Where a repair removes text, the removal is itemised in a cut list in the form `notes/2026-09-06/uplift-cut-list.md` already uses: what went, why, and what replaced it, with the replacement's authority named. Four proposals here remove text: the three citation strikes in 2.2; the strike of FRONT refs 12, 14, 18 and 19; the de-duplication of the verbatim repeats in `WG-01-UI-Cyber_Observations.md` lines 4 to 27 and `WG-02-DT-Applied-Physics.md` lines 35 to 52; and, if Gate 0 item 3 resolves against it, §5.2 of the Musical paper. Each needs its own cut-list row. P5 is an expansion and removes nothing.

## 6. What this roadmap does not cover

- **Rendering.** No dev server was run and `npm run build` was not executed. Every KaTeX, mermaid and image-embed claim here is inherited from the audits, which also rendered nothing. `CLAUDE.md` requires a browser check in both themes before any content change is called done. That check has not happened for anything in this plan.
- **The compiler bodies.** Ownership was mapped by filename match. None of the 20 `compile_*.py` scripts was read. Whether a defect sits in a Python string literal (p-series) or is produced by regex cleanup of a manuscript in `papers-pre-publish/` (r-series) changes the repair, and for the r-series it may mean the real edit belongs to a source manuscript this plan never looked at.
- **`papers-pre-publish/`**, 169 files, including the two *Symphonic Calculus* drafts. Not assessed.
- **`web/src/content/`** and `generatedReferencesContent.json`. The legacy archive and the build artifact both carry copies of defective text. Not assessed, and out of scope by `CLAUDE.md`.
- **`web/public/terminals/atq-card-terminal.html`**, 915 lines, published, carrying the same twelve-weight model that sums to 1.05. Not read beyond what the CAD audit recorded.
- **The truth of any external claim.** No external source was opened during this pass. The backfill list derives entirely from the audits' own gradings, and a large share of those are marked PROBABLE or UNVERIFIABLE by auditors who also had no external access. Any of them may resolve the other way.
- **The Cascading Failure paper's current state.** It was locked and being edited while its rows were measured. The 0-marker, four-reference-section reading is a snapshot and may already be stale.
- **Bilingual content.** Whether the Dutch renderings carry the same defects was not examined.
- **Effort and calendar.** This plan gives an order, not durations, and does not say how many people it needs.
- **Cross-repository overlap.** `WG-05-CAD-IEC62443-SFAIRP-SecRACS.md` publishes an SL-T formula that differs from the SL-T derivation in the vault at `10_workpapers_references/iec62443_basis/CRL-SEC-TVA_BASIS_004_SIL_SLT.md`, and neither references the other. Reconciling them is outside this repository and outside this plan.

## 7. Compiler ownership map

Every repair to a document below must be applied to its `.py` in the same commit.

| Document | Owner |
|:---|:---|
| WG-01-UI-ALE-ROSI-Decision-Framework.md | compile_p08_ale_rosi.py |
| WG-01-UI-Quantitative-Cyber-Physical-FMECA.md | compile_p07_fmeca.py |
| WG-01-UI-RCIL-SCIL-Reinsurance.md | compile_p09_rcil_scil.py |
| WG-02-DT-Cognitive-Digital-Twin.md | compile_r07_cognitive_twin.py |
| WG-02-DT-High-Density-Liquid-Cooling.md | compile_p11_liquid_cooling.py |
| WG-02-DT-Seven-Staff-Fugue.md | compile_r05_seven_staff_fugue.py |
| WG-02-DT-1.md | sweep_academic_formatting.py |
| WG-02-DT-4.md | sweep_academic_formatting.py, fix_all_academic_issues.py |
| WG-02-DT-5.md | fix_all_academic_issues.py |
| WG-03-ML-Autonomous-OT-Trust-Boundary.md | compile_p06_autonomous_ot.py |
| WG-03-ML-Calculus-of-the-Subject.md | compile_r01_calculus_subject.py, fix_all_academic_issues.py |
| WG-03-ML-Cognitive-Bias-Catalog.md | compile_r06_cognitive_bias.py |
| WG-03-ML-Loman-Operator-Topology-of-an-Act.md | compile_r02_loman_operator.py |
| WG-03-ML-Morphogenesis-Signifying-Chain-gGNN.md | compile_r03_morphogenesis_ggnn.py, fix_all_academic_issues.py |
| WG-03-ML-Musical-Psychometric-Notation.md | compile_r04_musical_psychometric.py |
| WG-04-CF-Emerging-Power-Topologies.md | compile_p10_emerging_power.py |
| WG-04-CF-Death Wobble ... jmckenney.md | sweep_academic_formatting.py |
| WG-05-CAD-Frontier-AI-Hardware-Security.md | compile_p01_frontier_hardware_security.py, sweep_academic_formatting.py, fix_all_academic_issues.py, enhance_manuscript_math.py |
| WG-05-CAD-IEC62443-SFAIRP-SecRACS.md | compile_p12_iec62443.py |
| WG-05-CAD-Supply-Chain-EU-CRA.md | compile_p03_supply_chain_cra.py |
| WG-05-CAD-Unified-DEXPI-CycloneDX.md | compile_p02_dexpi_cyclonedx.py |
| WG-07-TM-ATQ.md | compile_atq_academic.py |
| WG-07-TM-CyHAZOP-Methodology.md | compile_p04_cyhazop.py |
| WG-07-TM-CyHAZOP-Node-Registers.md | compile_p05_node_registers.py |

The remaining 25 documents under `references/` are hand-maintained. Confirm before editing:

```
$ grep -rlF "<filename>" scripts/
```
