# MPN working group (WG-09): series plan, fold-in to the restructure, and registration checklist

Written 2026-09-12 in the Cowork session, from the research and QA files delivered alongside it. This document extends `notes/2026-09-11/task_plan.md`; it does not replace it. Nothing here has been committed; nothing under `references/` has been touched. All four treatises live in `papers-pre-publish/MPN/` until they pass the gate procedure.

## 0. Decisions of record taken in this session

| Decision | Chosen | Alternative rejected | Where recorded |
|---|---|---|---|
| Legal framing of MPN | Lawful-by-design: sonify plant state, alarm load, task and interaction tempo, and adversary discourse from threat intelligence; no biometric or inferred emotional state of staff; person-level psychology only in adversary modelling, simulation/training/crisis-game, and an advisory roster-based fatigue channel | Argue the Art. 5(1)(f) safety exception; or pure theory with a no-deployment note | Jim, 2026-09-11 (AskUserQuestion); MPN-1 §1, MPN-4 §2-3 |
| MPN phases | Foundations, Notation, Engine, Outcome (one treatise each) | Assess/Specify/Implement/Validate per paper | Default taken 2026-09-11 after no answer; Jim to confirm |
| WG-06 group id | `WG-06-SC` per `task_plan.md` F13 | `WG-06-CRA` as on disk | Default taken; Jim to confirm |
| WG-09 subtitle | Recommend "The McKenney-Lacan notation: the state of the socio-technical link made audible" | "operator state made audible" (implies person-state inference) | MPN-4 §1; Jim to decide before Phase 3 retitle |

The subtitle question matters for Phase 3: `task_plan.md` retitles WG-09 as "MPN / The McKenney-Lacan notation: operator state made audible". Under the lawful-by-design decision "operator state" is the one thing the system does not infer. Change it before the retitle commit so the NL string is translated once.

## 1. What was delivered

| File | What it is | Status |
|---|---|---|
| `papers-pre-publish/MPN/MPN-1-foundations.md` | Paper 1, "The Discrete Lacan". F-1 to F-14. 86 refs. Corrections table for six earlier WG papers | Drafted, adversarially reviewed, revised; corpus audits pass |
| `papers-pre-publish/MPN/MPN-2-notation.md` | Paper 2, MPN second edition (normative). N-1 to N-27. 71 refs. Worked examples reproduce by script | Same |
| `papers-pre-publish/MPN/MPN-3-engine.md` | Paper 3, audit of `Planet9V/mpn-conductor-standalone` and engine spec. E-1 to E-24. 50 refs. All 73 code citations opened by the QA pass | Same |
| `papers-pre-publish/MPN/MPN-4-deployment.md` | Paper 4, lawful deployment, validation stack, roadmap. D-1 to D-20. 57 refs. Legal quotations checked word for word against EUR-Lex and wetten.overheid.nl | Same |
| `papers-pre-publish/MPN/CITATION-LEDGER-MPN-{1..4}.md` | Per-paper ledger: every [n] with VERIFIED / UNVERIFIED-canonical / corpus / code status | For the citation audit and the external-research files |
| `papers-pre-publish/MPN/QA-MPN-{1..4}.md` | The independent adversarial reviews (independence rule applied: reviewers were not told the expected answers) | Evidence; all findings applied or recorded as declined |
| `papers-pre-publish/MPN/RESEARCH-SYNTHESIS-2026-09-11.md` | The deep-dive synthesis: nine themes, open questions, 353 deduplicated sources | Source of the external-research files (§5) |
| `notes/2026-09-12/research/q1..q9-*.md` | The nine research ledgers | Evidence |
| `notes/2026-09-12/repo-deconstruction.md` | The MPN Conductor deconstruction, 509 lines, path:line | Evidence for MPN-3 |
| `notes/2026-09-12/wg05-wg06-review.md` | Review of the six WG-05/WG-06 files on the Mac | Input to §3 below |

Corpus audits run on the four papers inside a scratch copy of the repo: mermaid (105 diagrams parse, all with accTitle/accDescr), ASCII art, terminology, citations: all pass. Vitest `registry.test.ts` is not affected because the papers are not registered yet.

## 2. The four phases of WG-09 and what each allows the working group to claim

| Phase | Paper | Claim permitted after the phase's gate | Gate |
|---|---|---|---|
| 1 Foundations | MPN-1 | Lacan's four discourses and three registers are adopted as a labelled engineering ontology with the working group's own semantics; the stochastic cusp and Kramers escape are one SDE stated as a conditional hypothesis; the psychometric feature space has no measurement-theoretic warrant and is used only where lawful | Corrections table accepted by Jim; earlier papers amended or annotated (§4) |
| 2 Notation | MPN-2 | A normative grammar exists whose inputs are lawful, whose mappings carry evidence tiers, and whose worked examples reproduce | Reproduction script run in CI (M1 below) |
| 3 Engine | MPN-3 | The Conductor is a rule-based reference implementation; the calculi are reconciled and conformance-tested; the ML stack is a proposal with a data budget | M1 tests green; security remediation done (key rotated, history purged) |
| 4 Outcome | MPN-4 | Deployment is lawful by construction; validation follows ISO 11064-7, SAGAT, NASA-TLX; every performance claim is a transfer from anaesthesia until M3 | Works-council consent and DPIA before any field trial; no lead-time claim before M3 data |

Milestones (from MPN-4 §9): M1 conformance tests and calculi reconciliation; M2 listener study (MPN-2 §9 protocol); M3 simulator trial with SAGAT; M4 shadow-mode field trial after consent and DPIA; M5 two-dimensional learned renderer in simulation mode only.

## 3. Fold-in to `task_plan.md`

### 3.1 Phase 3 (rename and re-cut) amendments

Add to the WG-09 block: the five re-parented papers (`lacanian-psychohistory-framework`, `calculus-of-the-subject`, `loman-operator-topology-of-an-act`, `morphogenesis-signifying-chain-ggnn`, `musical-psychometric-notation`) keep their files and slugs (INV-7, INV-8). The four new papers join WG-09 only after their own PR each (one PR per paper, like Phase 4), so the Phase 3 arithmetic stays 12/12/4/8/14/4/0/5/3/1 = 63 and the WG-09 count rises to 9 in four later PRs. Decide the subtitle (§0) before the retitle commit.

### 3.2 New Phase 5: WG-09 publication

Branch per paper: `feat/wg09-mpn-1` to `feat/wg09-mpn-4`, in order (each paper cites the previous by slug; MPN-2's reference [3] currently cites MPN-1 without a URL because no slug exists yet, and needs the slug once MPN-1 is registered). Allowlist per PR: one new file under `references/WG-09-MPN/` (new folder, never renamed afterwards), one wikiRegistry block, papers.ts entry, the NL title/subtitle strings, the census re-baseline (+1 document, +N chars, +k mermaid), and the external-research files in §5. Nothing else. QA-1, QA-2, QA-3 and, for MPN-1 and MPN-4, QA-4 (adversarial fact check) as already run; the QA reports delivered here count as the first QA-4 pass and must be re-run after any further edit.

Suggested registry values (EN; NL to be written in the same commit):

| Paper | id | slug | badge |
|---|---|---|---|
| MPN-1 | `WG-09-MPN-Foundations` | `discrete-lacan-foundations` | Foundations |
| MPN-2 | `WG-09-MPN-Notation` | `mpn-second-edition` | Notation |
| MPN-3 | `WG-09-MPN-Engine` | `mpn-conductor-reference-implementation` | Engine |
| MPN-4 | `WG-09-MPN-Deployment` | `audible-control-room` | Deployment |

### 3.3 Corrections to earlier papers (from MPN-1 §8)

MPN-1's corrections table lists thirteen claims across six earlier papers (the 22-minute lead time and Seldon crisis detection in `musical-psychometric-notation`; the 18-second escape time and "threat temperature" Arrhenius rule in `MP_Kramers_Escape_Model`; the Hilbert-space psychometric tensor; the free-energy equivocation in the gGNN paper; and others). Each needs one of: an erratum note at the top of the earlier paper, a rewrite, or a retraction line in the paper's metadata table. Every one of those files must be checked for a compiler owner before editing (`grep -rln "<basename>" scripts/`); `MP_Kramers_Escape_Model.md` is under `MP-Math-Physics-Formula/`, which the r-series may own. This is a Phase 6 unit, one PR, allowlist "tail80 and chars may change for the six named files; nothing else".

### 3.4 The six WG-05/WG-06 files on the Mac (from `wg05-wg06-review.md`)

| File | Verdict | Where it goes in the plan |
|---|---|---|
| `WG-05-CAD-Multigraph-Engine.md` | NEEDS REWRITE (designation P4 already taken by the Energy paper; vocabulary contradicts P1 R-4 and its own five-label closure; three inconsistent edge models; Q-3 cannot return its isolated result; invented benchmark contradicting RefBESS's 100 tagged objects; "E-1 through E-20" with 13 written; leading H1) | On-plan for WG-05 as the G_CPDT engine paper. Give it the next free designation, fix against P1's vocabulary, source or delete every number, then it becomes the "G_CPDT defining paper" that Phase 4 paper 3 is blocked on (F3) |
| `WG-05-CAD-Kinetic-Blast-Radius.md` | OFF-PLAN, NEEDS REWRITE (straddles MP-MATH/WG-05/WG-01; every case number invented; Y5381 and TACAM misdescribed against five corpus papers; contradicts P7's refusal to state time or cost; KaTeX break at line 155) | Split: §2 (saddle-node normal form) as an MP-MATH note with sourced examples; the actuarial section dropped or moved to WG-01 with real figures |
| `WG-06-CRA-Product-Assurance.md` | NEEDS REWRITE (compresses four of the six planned WG-06-SC papers; reintroduces the HBOM/Annex VII error corrected in Phase 1; cites CVE-2024-55321, which does not exist in MITRE or NVD; "three named designations"; EC-type instead of EU-type; unreproducible field data violating F9) | Re-scope to WG-06-SC papers 4 (CycloneDX/VEX as Annex I Part II evidence) and 5 (Article 14 mechanics); folder renamed to `WG-06-SC-...` before first commit (INV-7 makes it permanent). The CRA timeline, classification table and CISA VEX-state mapping paragraphs are correct and reusable |
| P1, P2, P3 G_CPDT edits | DO NOT SHIP AS-IS (diagrams contradict the papers' own normative text: `AssetReferenceBinding`, `cim:AssetCyberLink`, `feeds` do not exist in P1 §5.1/§6.1, R-27, C-1; H1 replaces the metadata table; outside every allowlist; G_CPDT now defined five different ways) | Revert the three edits from the Phase 1 branch (`git checkout -- <three files>`); open a dedicated unit "G_CPDT term" that adds one definition sentence to P1 §1.2 only, and let the rewritten Multigraph paper carry the full definition |

The registry test `registry.test.ts:84` fails on the Mac now (papers.ts 66 slugs vs wikiRegistry 63) because `papers.ts` was edited ahead of `wikiRegistry.ts`. `npm run verify` will stay red until the three papers.ts entries are removed or registered.

## 4. Repository hygiene the series depends on

The `mpn-conductor-standalone` repository is public and is cited by URL in MPN-3 and MPN-4. Before the papers are published: rotate the ElevenLabs key found at `docker-compose.yml:26`; purge it from history (`git filter-repo`) and force-push, or archive the repository and re-publish a cleaned one; enable secret scanning; remove the non-resolving Zenodo-prefixed DOI from `public/theory/.../README.md`; fix or remove the `tonnetz.py` L operator and its test; reconcile the four BSI formulas and three crisis thresholds to the single tension index and alert rule of MPN-2 §4. MPN-3 §7 has the full checklist. MPN-3 cannot be published while the key is in the history: the paper names the line.

## 5. External-research files the citation rule requires

`CLAUDE.md` requires one file per external source under `references/external-research/`, named `<WG-code>_<topic-slug>_<YYYYMMDD>.md`, with source, URL/DOI, retrieval date, which paper uses it, and a summary. The four ledgers list 264 distinct references; the synthesis lists 353 sources. Not every reference needs a file (canonical books cited without figures do not), but every source from which a number, a quotation or a legal text was taken does. The minimum set, by paper:

MPN-1: Hänggi, Talkner & Borkovec 1990 (Kramers formula); Grasman, van der Maas & Wagenmakers 2009 (cusp SDE); Zahler & Sussmann 1977; Gadalla, Nikoletseas & Amazonas 2026; Paulhus et al. 2021 (SD4); Barrett et al. 2019; Miller 1966/1977 (Suture); Crans, Fiore & Satyendra 2009.
MPN-2: Loeb & Fitch 2002; Watson & Sanderson 2004; Juslin & Laukka 2003; Walker 2002; Lerdahl & Krumhansl 2007; Farbood 2012; Eerola & Vuoskoski 2013; HSE CHIS6 (alarm endpoints); the ISA-18.2 public reproductions (exida, Siemens, ISA Ireland); ISO 7731.
MPN-3: Copet et al. 2023 (MusicGen); Hung et al. 2021 (EMOPIA); Cideron et al. 2024 (MusicRL); Majumder et al. 2024 (Tango 2); Wu et al. 2023 (CLAP); Hu et al. 2021 (LoRA); Rafailov et al. 2023 (DPO); IEC 62443-2-1:2024.
MPN-4: Regulation (EU) 2024/1689 (CELEX 32024R1689); Regulation (EU) 2026/1744 (Digital Omnibus on AI); Commission Guidelines C(2025) 5052 and C(2025) 5053; GDPR (CELEX 32016R0679); WOR (BWBR0002715); UAVG (BWBR0040940) and the AP DPIA list (BWBR0042812); WP 249 and WP 248; FAA AM-12/12 (SAFTE-FAST validation); FRA 2022 fatigue rule; HSE Milford Haven report page; ISO 11064 parts 1, 4, 7; Endsley 1995.

The ledgers give the URL and retrieval status for each. Writing these files is mechanical and is a good first task for the CLI session once the branch is open; the naming prefix is `WG-09-MPN_`.

## 6. TASKS.md entries (proposed; add under Active when the Mac session picks this up)

- [ ] **Decide the WG-09 subtitle** before the Phase 3 retitle: "operator state made audible" vs "the state of the socio-technical link made audible" (MPN-4 §1 recommends the latter under the lawful-by-design decision)
- [ ] **Rotate the ElevenLabs key** in `Planet9V/mpn-conductor-standalone` `docker-compose.yml:26`, purge history, enable secret scanning (blocks MPN-3 publication)
- [ ] **Revert the P1/P2/P3 G_CPDT diagram edits** from `fix/cra-product-classification`; open a separate "G_CPDT term" unit (wg05-wg06-review §3)
- [ ] **Remove or register the three papers.ts entries** so `registry.test.ts` and `npm run verify` go green
- [ ] **Rename `references/WG-06-CRA-Product-Assurance/` to `WG-06-SC-...`** before any commit touches it (INV-7)
- [ ] **Phase 5, WG-09 publication**: four PRs in order, allowlists per §3.2, external-research files per §5
- [ ] **Phase 6, corrections to six earlier papers** per MPN-1 §8; check compiler ownership first
- [ ] **Valyu**: set `VALYU_API_KEY` on the Mac (`valyu setup <key>`) if the CLAUDE.md sourcing rule's valyu step is to be followed literally; this session used WebSearch, WebFetch on primary sources, and Perplexity instead

## 7. What this session did not do

It did not commit, push, or edit anything under `references/`, `web/`, `scripts/` or `notes/2026-09-11/` on the Mac. It did not run `npm run verify` on the Mac. It did not write the NL translations. It did not write the external-research files. It did not re-run the QA agents after the revisions (each writer re-ran the style checks and, for MPN-2, the reproduction script; a second adversarial pass is the gate before any PR).
