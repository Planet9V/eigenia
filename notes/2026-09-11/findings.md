# Findings: working-group restructure

Everything here was measured or verified against a primary source on 2026-09-11.
Nothing is recalled. Baseline artifacts alongside this file:

| File | What it is |
|---|---|
| `census.mjs` | The measurement instrument. Parses `wikiRegistry.ts` as text, hashes every file under `references/`. |
| `baseline-census.json` | The pre-change snapshot. sha256 `48b6623b343849ed2d2d0c2defcd7fc7cee874d67bf69e24e5487580d97386ee` |

Baseline taken against `main` at `f655255`, working tree carrying the
`chore/memory-enforcement` commit `e388d03` and nothing else.

## Baseline measurements

| Measure | Value |
|---|---|
| Working groups | 9 |
| Documents | 63 |
| Total corpus characters (`references/**/*.md`) | 2,080,789 |
| Mermaid diagrams | 91 |
| Featured documents | 13 |
| Duplicate slugs / ids | 0 / 0 |
| Documents whose `workingGroupId` contradicts their group | 0 |
| Registry entries pointing at a missing file | 0 |
| Markdown on disk with no registry entry | 6, all `external-research/` |

Per-group document counts, which must reconcile after every phase:

| Group | Title today | Docs |
|---|---|---|
| WG-01-UI | Actuarial & Underwriting Foundations for Industrial Property & Cyber Risk | 12 |
| WG-02-DT | Digital Twin & Taleb Series | 14 |
| WG-03-ML | Psychometrics & Behavioral Modeling | 7 |
| WG-04-CF | Cascading Failures | 8 |
| WG-05-CAD | DEXPI 2.0 & CAD Interoperability | 14 |
| WG-07-TM | Threat Modeling & TACAM Matrix | 4 |
| WG-08-MO | Monte Carlo Engine Application | 1 |
| MP-MATH | Mathematical Physics Models | 2 |
| GOV-RES | Research Governance & Sourcing Methodology | 1 |

## F1. `workingGroupName` is not purely a copy, and my first design was wrong

I assumed `workingGroupName` was a straight denormalized copy of the group
title, and proposed deriving it away. The census says that holds for **7 of 9
groups** and not for two:

- **WG-01-UI**, all 12 documents carry `"Actuarial & Underwriting"` against a
  group title of `"Actuarial & Underwriting Foundations for Industrial Property & Cyber Risk"` (74 characters).
- **GOV-RES**, 1 document carries `"Research Governance"` against
  `"Research Governance & Sourcing Methodology"`.

So the field is doing double duty: usually a copy, sometimes a hand-made short
form for display. `web/src/app/papers/[slug]/page.tsx:210` renders it in the
paper hero, which is why someone shortened the 74-character one.

Consequence for the plan: a naive normalization would silently lengthen the
label on 13 papers. The fix needs a group-level `shortName`, or the rename has
to remove the need for one.

The instrument-and-outcome scheme removes the need. `ALE / ROSI` is 10
characters. Every proposed title is short by construction, so `shortName` never
has to exist. That is now a second, measured argument for the scheme rather
than a stylistic preference.

## F2. The sourcing treatise IS the external-research README

`GOV-RES` document `README`, slug `research-sourcing-governance`, has
`relativePath: references/external-research/README.md`. So the file documenting
the naming convention for source files is simultaneously a published treatise at
`/papers/research-sourcing-governance`.

Editing that README's conventions changes a published paper. Any PR that adds a
source file and tidies the README while it is open silently edits the corpus.
Phase 1 adds a source file, so this matters immediately.

## F3. G_CPDT is asserted on the site and defined in no paper

`web/src/app/unified-standard/page.tsx` names `Schema G_CPDT` at lines 102, 160,
587, 614 and 620. `grep -r G_CPDT references/` returns nothing.
`WG-05-CAD-Three-Identity-Join` carries the substance (DEXPI 2.0, CycloneDX 1.6,
IEC 61970 CIM) and never uses the name.

## F4. The published CRA classification is wrong

`references/WG-05-CAD-DEXPI-2/WG-05-CAD-Supply-Chain-EU-CRA.md`, lines 18 to 32,
states `Important Products with Digital Elements (Class II - Annex IV)` and files
HSMs, smart meter gateways, hypervisors and firewalls together there.

Verified structure, Regulation (EU) 2024/2847 **Articles 7, 8 and 32** and
Annexes I, III, IV, VIII, with technical descriptions in Commission Implementing
Regulation (EU) 2025/2392. First retrieved 2026-09-11 via Valyu, then
independently re-verified against the authentic OJ XHTML from
`publications.europa.eu/resource/celex/…` by QA-4, which corrected four points in
my first version. Corrections marked below.

| Designation | Annex | Named categories | Conformity routes (Art. 32) |
|---|---|---|---|
| Default (no statutory name) | not listed | n/a | Free choice of four: module A; B+C; H; or a certification scheme per Art. 27(9). Module A is available **irrespective of the technical specification used** |
| Important, class I | **III** | 19 | Module A **only** where harmonised standards, common specifications **or** a certification scheme at ≥ 'substantial' have been applied **in full**; otherwise B+C or H |
| Important, class II | **III** | 4 | B+C, H, **or** a certification scheme at ≥ 'substantial' (Art. 32(3)(c)). No module A |
| Critical | **IV** | 3 | Art. 8(1) certification scheme **first**; where its conditions are unmet, any Art. 32(3) procedure |

26 named categories total. Both important classes live in Annex III. Annex IV is
Critical, a separate designation.

**Four corrections to my first version**, all from QA-4:

1. **The classifying articles are 7 and 8, not 6.** Article 6 is "Requirements
   for products with digital elements". Article 7 creates *important* with its two
   classes, Article 8 creates *critical*.
2. **"Risk tier" is not the Regulation's vocabulary**, and the default category has
   no statutory name at all. The Commission calls it "the default category of
   products". Three named groups, **four conformity routes**.
3. **I understated every route except class I.** Default has four options, class II
   three, critical two. Only class I is genuinely conditional.
4. **The class I condition names three instruments, not one**: harmonised
   standards, common specifications, or a certification scheme at ≥ 'substantial',
   and the trigger is failure to apply them **in full**, or their non-existence.

IR 2025/2392 was adopted 28 November 2025 under Art. 7(4), in force 21 December
2025. Its Article 2 puts the technical descriptions of Annex III classes I and II
in **its own Annex I**, and those of Annex IV in **its own Annex II**.

Annex III Class II is exactly four categories: hypervisors and container
runtimes; firewalls and IDS/IPS; tamper-resistant microprocessors;
tamper-resistant microcontrollers. Annex IV is exactly three: hardware devices
with security boxes; smart meter gateways and other secure-cryptoprocessing
devices; smartcards and secure elements.

Dates, Article 71(2) verbatim: the Regulation applies from **11 December 2027**;
**Article 14 applies from 11 September 2026**; Chapter IV (Articles 35 to 51)
applies from **11 June 2026**. Entry into force was **10 December 2024**, twenty
days after OJ publication on 20 November 2024; adopted 23 October 2024.

**A fifth correction.** I wrote that conformity assessment bodies were
"designable from 2026-06-11". That is wrong framing: 11 June 2026 is when
Chapter IV *applies*, opening the notification machinery for Member States. It is
not a designation event, and QA-4 found **NANDO still listed zero CRA notified
bodies as of 9 August 2026**. The legal date and practical availability diverge.

Article 14's cadence is 24h early warning, 72h notification, then a 14-day final
report for a vulnerability or one month for an incident.

## F5. The paper is compiler-owned, so editing the markdown is a no-op

`scripts/compile_p03_supply_chain_cra.py` owns
`WG-05-CAD-Supply-Chain-EU-CRA.md`. The p-series embeds the document as a Python
string literal, so an edit to the `.md` is reverted on the next compiler run.
The correction goes in the compiler. `compile_r07` reverted a document by 183
insertions and 132 deletions this way in September.

## F6. No CRA source file exists, so the citation audit will block

`references/external-research/` holds 7 files, none for 2024/2847. Convention
from its own README: `<WG-code>_<topic-slug>_<YYYYMMDD>.md`.

## F7. Group ids are load-bearing; titles are not

`web/src/app/wiki/page.tsx:37` reads `?wg=` from the URL and resolves it with
`getWorkingGroupById`, so `/wiki?wg=WG-01-UI` is a live link people can have
saved. `web/src/app/tracks/page.tsx:25` keys `WG_ICON_MAP` on the same ids.

No route contains a group id in its path. Routes are `/papers/[slug]`,
`/theory/[slug]`, `/tracks`, `/wiki`, `/unified-standard`, `/mission`,
`/physics`, `/theory`, `/collaborate`.

So: **ids frozen forever, titles free to change, and adding a group needs an
icon-map entry.**

## F8. Re-grouping needs no file moves

`relativePath` is an independent registry field from `workingGroupId`. Moving a
paper between groups is a registry edit. The `references/` no-rename rule in
`CLAUDE.md` is not in the way of the WG-03 split or the WG-08 merge.

## F9. Both applications exist, outside this repo

`Planet9V/OXOT_Website_Conformity_Application`, proprietary: nine modelled acts,
eleven verbatim statutory corpora, Annex III/IV classification, Module A/B+C/H
routes, Article 14 PSIRT with 24h/72h clocks, ENISA submission, SBOM/CBOM vault.

`Planet9V/mpn-conductor-standalone`, MIT: v3.7, 84 tests, 34 wiki pages,
PSYCHOSCORE v2, 57-dimensional psychometric vector into 768D MusicGen. Plus
`Planet9V/psychoscore-v2-training`.

Decision of record, 2026-09-11: **Eigenia specifies the method, OXOT is never
named.** Consequence: the papers carry their own proof through synthetic
reference artifacts, following the RefBESS / RefPharma / RefDepot pattern
already in WG-05.

## Errors encountered

| Error | Attempt | Resolution |
|---|---|---|
| Assumed `workingGroupName` was a pure copy of the group title | 1 | Census proved 13 documents use a short form. Design changed: the rename removes the need rather than normalizing it away. See F1. |
| Assumed the CRA paper could be edited directly | 1 | `grep -rln` found `compile_p03_supply_chain_cra.py` owns it. The correction moves into the compiler. See F5. |

---

# Independent verification, 2026-09-11

## F10. QA-1 reproduced every baseline measure, by a different method

An independent agent was given the repository and the list of things to measure,
but **not** the expected values and not access to `notes/2026-09-11/`. It
extracted the registry literal and evaluated it in Node, then measured the
filesystem with Python. Two instruments, two methods, identical numbers:

| Measure | `census.mjs` | QA-1 | Agree |
|---|---|---|---|
| Working groups | 9 | 9 | yes |
| Documents | 63 | 63 | yes |
| Per-group counts | 12/14/7/8/14/4/1/2/1 | 12/14/7/8/14/4/1/2/1 | yes |
| Group-id mismatches | 0 | none | yes |
| Duplicate slugs / ids | 0 / 0 | none / none | yes |
| Registry entries with a missing file | 0 | none | yes |
| Unregistered `.md` | 6, all external-research | same 6 | yes |
| `.md` files under `references/` | 69 | 69 | yes |
| Total characters | 2,080,789 | 2,080,789 | yes |
| Mermaid diagrams | 91 | 91, across 29 files | yes |
| Short-form `workingGroupName` | WG-01-UI, GOV-RES | WG-01-UI, GOV-RES | yes |

QA-1 adds: 2,084,622 **bytes** against 2,080,789 characters, a 3,833-byte delta
from multibyte punctuation. The baseline measures characters. Any future check
must not compare one against the other.

The baseline is therefore trustworthy as the reference point for every phase.

## F11. `sweep_all_frontmatter.py` is a second owner of the entire corpus

The dangerous finding. `scripts/sweep_all_frontmatter.py`:

1. regex-rewrites the header block **inside every `scripts/compile_*.py`** and
   writes each script back to disk (lines 71 to 73),
2. re-runs **all 20 compilers** via subprocess (lines 154, 162),
3. then post-edits every `references/**/*.md` through two glob sweeps.

Running that one script mutates the compilers, regenerates all 20 documents and
post-edits them. Any hand edit to a reference document or a compiler header is
gone. It is a full replace, not a layered edit.

Four more scripts also write into `references/` outside the compile layer:
`sweep_academic_formatting.py`, `fix_all_academic_issues.py`,
`clean_academic_prose.py`, `enhance_manuscript_math.py`. And
`research_paper_orchestrator.py` writes whatever path is handed to it as
`sys.argv[4]`, so it can clobber anything.

Counting past the compile layer, `WG-05-CAD-Frontier-AI-Hardware-Security.md`
has **four** writers. Every reference file has at least three.

**Consequence for this programme:** the `grep -rln "<filename>" scripts/` rule in
`CLAUDE.md` finds the *compiler* but not the sweeps, because the sweeps reach
files through a glob. The rule is necessary and not sufficient. No sweep script
may be run during any phase of this work.

## F12. Right now, every compiler is byte-identical to its output

QA-1's counterpart extracted each embedded literal, applied the transform each
script applies, and compared against disk for all 17 literal-embedding scripts.
**All 17 match their published output exactly.** Nothing is sitting in a
silently-revertible state.

This materially de-risks Phase 1: a bare `python3 scripts/compile_p03_supply_chain_cra.py`
will reproduce the current file byte-for-byte apart from the intended change, so
`git diff` will show the correction and nothing else.

Corrections to what I had recorded:

- There are **20** compile scripts, not 23.
- `r01`, `r03`, `r04` genuinely read from `papers-pre-publish/` at runtime. But
  `r02`, `r05`, `r06`, `r07` carry **docstrings that claim a `papers-pre-publish/`
  source and never open it.** Editing the named manuscript for those four does
  nothing. The docstring lies; the literal is authoritative.
- `compile_p03_supply_chain_cra.py` embeds its document as a raw triple-quoted
  literal at line 12, writes at line 386, and imports only `re`. No source file.
- `p01` is the only compiler with no em-dash cleanup, and the only one that
  normalizes the trailing newline (`content.strip() + '\n'`).
- No compile script contains `datetime`, `random`, `uuid`, `time`, `glob`, or any
  unordered iteration. All 20 are deterministic. Idempotence is still verified by
  running twice, but the code says it should hold.

## F13. WG-06 was a planned id, and it is not free of history

`papers-pre-publish/PAPER_PROPOSALS_MASTER_BACKLOG.md:21` assigns proposal P-08
to `WG-01-UI` / **`WG-06-EC`**. That paper shipped into WG-01 as
`ale-rosi-decision-framework`, so no document uses `WG-06-EC` and no route
references it. The id is unused but the intent is on record.

Use a distinct suffix for the conformance group, `WG-06-SC`, and note the history
so a future session does not read the gap as a lost group.

## F14. Corpus defects found in passing, none of them in scope here

Logged so they are not lost, and deliberately **not** folded into this programme:

- **`WG-02-DT` badge reads `DIGITAL TWIN 01–10` for a group of 14 documents.**
  Every other group's badge range matches its count exactly. A wrong string is
  live on the site. Best candidate for the next small PR after Phase 1.
- `GOV-RES` has `number: "GOV-01"` against `id: "GOV-RES"`; every other group's
  number is the id minus its suffix.
- The content bundle key for the ERCOT paper is
  `WG-04-CF-ERCOT-WECC-IBR-Reliability` while the registry id is
  `WG-04-CF-ERCOT-WECC-IBR`. QA-1 reported this as breaking a lookup. **Verified
  and it does not**: `web/src/lib/wiki.ts:42` tries `relativePath` first, that key
  exists, so the id miss never surfaces. Latent fragility, not a live defect.
  Recorded because an agent claim was overstated and checking it cost one command.
- 37 of 63 slugs have no alias key in the content bundle, and 8 stale slug
  aliases remain that match no current slug. The alias layer is half-migrated;
  only the path-first fallback order hides it.
- `web/src/lib/wiki.ts:62` sets `contentNl` to the English body, so the Dutch
  locale renders Dutch chrome around English prose. Already a Someday item.
- No document carries a `hook`, though `WikiDocumentMeta` declares the field with
  a comment about homepage bands.
- The generated bundle differs from disk for 47 of 63 files, entirely in trailing
  whitespace. So `charCount` computed from the bundle will never equal the
  on-disk character count. **Do not cross-check one against the other**; the
  census measures disk only.
- Two documents carry month-only publication dates (`April 2024`, `May 2024`) and
  two are dated 2025 against 59 in 2026. `toIsoDate` in
  `web/src/app/papers/[slug]/page.tsx:20` already returns undefined for
  month-only, by design.

## F15. QA-4 found the paper is wrong in eleven more places, and three of them are outside the section Phase 1 was scoped to

The adversarial fact-check established the regulation from the authentic OJ text
*before* reading the document. It confirmed the core finding and then found that
the classification error is not isolated.

**Confirmed, my original finding.** Line 22 labels Annex IV as "Important
Products with Digital Elements (Class II)", line 29 repeats it in the table, and
**the word "critical" never appears in the document**. So the CRA's top
designation is absent and Annex III's class II has been erased.

### Inside lines 15 to 35

| | Line | Error |
|---|---|---|
| B1 | 22, 29 | Annex IV labelled "Important … Class II". Both important classes are in Annex III; Annex IV is Critical |
| B2 | 23 | The class II list fuses two tiers with two different legal routes: firewalls/IDS, tamper-resistant microprocessors and hypervisors are Annex III class II (Art. 32(3)); HSMs and smart meter gateways are Annex IV (Art. 32(4)) |
| B3 | 21 | **"programmable logic controllers (PLCs)" and "industrial automation systems" appear nowhere in the CRA or in IR 2025/2392.** A PLC is in scope but sits in the default category unless its core functionality matches a listed Annex III category |
| B4 | 30 | "Industrial Microcontrollers" is not an Annex III term (item 14 is "microcontrollers with security-related functionalities"); "Baseboards" appears nowhere in Annex III or IV |
| B5 | 16 | "Three-tier risk hierarchy" then enumerates default / class I / class II, dropping Critical |
| B6 | 19 | Default-tier self-assessment is **not** conditioned on harmonised standards. Art. 32(1) is a free choice; the class I condition has been imported into the default tier |
| B7 | 21 | The class I trigger names only harmonised standards, omitting common specifications and certification schemes, and omits the "in full" test |
| B8 | 23, 29 | The certification route is missing from both third-party tiers |
| B9 | 31 | Module A is labelled "internal production control". Annex VIII Part I is "**internal control** (based on module A)"; "internal **production** control" is Part III, **module C** |
| B10 | 27 to 31 | Three table rows for four routes. No Critical row, no Annex III class II row |

B3 is worth dwelling on: the same PLC-and-industrial-automation error circulates
in a bad secondary source that QA-4 identified and refuted. The document appears
to have inherited it.

### Outside lines 15 to 35, same factual family

| | Line | Error |
|---|---|---|
| F1 | 3 | "On September 13, 2024, the European Union published Regulation (EU) 2024/2847". No CRA milestone falls on that date. Adopted 23 October 2024, published 20 November 2024, in force 10 December 2024 |
| F2 | 3 | "full enforcement commencing on September 11, 2026". That date is Article 14 reporting only; full application is 11 December 2027 |
| F3 | 3 | "Hardware Bills of Materials (HBOMs)" described as mandated. **"Hardware bill of materials" and "HBOM" appear nowhere in the Regulation.** Only the SBOM exists: Art. 3 definition, Annex I Part II point 1, Annex VII |
| F4 | 3 | SBOM provenance said to be evidenced "to a notified body". Annex VII point 8 says on reasoned request from a **market surveillance authority** |
| F5 | 42 to 47 | **Article 64 paragraph numbers are off by one throughout.** €15m/2.5% is Art. 64(2), not 64(3); €10m/2% is 64(3), not 64(4); €5m/1% is 64(4), not 64(5). Art. 64(5) is the aggravating and mitigating factors |
| F6 | 36 | "zero-trust network boundaries" and "line-rate hardware access controls" are not CRA language |

### Defensible but misleading

- **C1.** "Mandatory third-party notified body assessment" for the Annex IV group
  is true **today** only because no Art. 8(1) delegated act exists. The document
  presents a temporary fallback as the statutory rule.
- **C2.** The class I harmonised-standards escape is presented as live. As of
  August and September 2026 **no CRA harmonised standard reference has been
  published in the OJ**, so the Art. 27 presumption, and with it module A for
  class I, is not practically available for any product category.
- **C3.** "Applies to all products with digital elements" overstates: Article 2
  carves out medical devices, civil aviation, type-approved motor vehicles, marine
  equipment, national security and defence, spare parts, and non-commercial FOSS.

### Correct claims a careless editor would break

This is the most useful part of the fact-check for the person doing the edit.

- **Leave HSMs and smart meter gateways where they are.** IR 2025/2392 Annex II
  item 1 expressly says "Hardware Devices with Security Boxes" includes "hardware
  security modules that generate and manage cryptographic elements". Only the
  **label** on that group is wrong, not its membership.
- **Do not demote hypervisors, firewalls/IDS or tamper-resistant microprocessors
  to class I.** They are correctly the higher important class.
- **Plain microprocessors with security-related functionality are class I.** Only
  **tamper-resistant** ones are class II. Tidying microprocessors into class II
  introduces an error.
- Line 16's "direct or indirect logical or physical data connection" tracks
  Art. 2(1) and Art. 3(1) almost verbatim. Do not simplify to "internet-connected".
- The module letters A, B+C, H are correct against Annex VIII Parts I to IV.
- The Annex I two-part split, product properties and vulnerability handling, is correct.
- "Minimum five years" support period is correct: Art. 13(8).
- **"Whichever is higher"** on the penalty is correct (Art. 64(2)) and is
  frequently mis-edited to "lower".

### Consequence for Phase 1

The phase was scoped to lines 18 to 32 on the assumption the error was local. It
is not. Six more errors sit at lines 3, 36 and 42 to 47, including a fabricated
mandate (HBOM), two wrong dates, and systematically wrong article citations in
the penalties section.

A correction PR that knowingly leaves "HBOMs are mandated" and the wrong
publication date standing is not a correction. These are the same defect class in
the same document, surfaced by the gate built to find them, so they are not
drive-by edits. **Recommendation: widen the Phase 1 allowlist from "lines 18 to
32" to "every CRA factual claim in this one document", still one document and one
compiler, with each change enumerated in the PR body.** Jim's call.
