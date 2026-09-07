# Design: the three-schema cyber digital twin

Date: 2026-09-07
Status: design, awaiting Jim's approval
Decisions taken: fix the foundation before building; both upstream and
practitioner audiences, split across the set; named synthetic reference assets;
three schemas including IEC 61970 CIM.

## The problem, stated precisely

Three open standards describe the same physical asset. None of them can answer
the question that matters operationally: **if this vulnerability is exploited,
what physically happens downstream?**

| Standard | Describes | Identity | Assigned by | Nature |
|:---|:---|:---|:---|:---|
| DEXPI 2.0 | process topology, P&ID and BFD/PFD | `TagName` plus ISO 15926 class | plant engineer | human, stable, semantic |
| CycloneDX | component supply chain | `bom-ref` plus `purl` or `cpe` | build system | machine, versioned, ephemeral |
| IEC 61970 CIM | electrical network topology | `mRID`, a UUID | network model tool | machine, stable, opaque |

A pump carries a tag. Its controller firmware carries a PURL. Its feeder
carries an mRID. **No identifier survives across all three.** That is why the
cyber digital twin does not exist yet, and it is a smaller and more tractable
problem than it is usually made to sound.

The contribution is a **mapping between identity systems**, explicitly not a
merge. A merge would break conformance to all three, which is the reason every
previous attempt has ended as a vendor's proprietary model.

### Why extension rather than fork

DEXPI 2.0 ships a **Standard Library** mechanism for exactly this: curated
templates that extend or restrict the specification without altering it. That
mechanism is what makes the proposal adoptable rather than merely publishable.
CycloneDX takes registered property taxonomies. CIM takes profiles, and CGMES
is the precedent for profiling a large model down to a purpose.

All three legs therefore have a sanctioned extension point. Nothing is forked,
and every file stays conformant to its own specification.

## What the corpus gets wrong today, and must fix first

Measured, not asserted.

| Defect | Evidence | Consequence if unfixed |
|:---|:---|:---|
| ISO/IEC 5962 given as the CycloneDX standard, twice, including a section heading | `WG-05-CAD-Unified-DEXPI-CycloneDX.md` lines 5 and 60 | ISO/IEC 5962:2021 is SPDX. CycloneDX is ECMA-424. A standards reader stops here. |
| CBOM means two different things | "Component BOM" in 2 documents, "Cryptography BOM" in 5 | The join keys on BOM type. An ambiguous key is not a key. |
| BOM layer count is 4, 5 or 6 | 4-BOM in 2 documents, 6 in the unified paper | All attributed to the same CycloneDX 1.6. |
| ISO 15926 part number never stated | 12 uses, 0 with a part | DEXPI's information model depends on which part. |
| `purl` appears 0 times; `mRID` 0 times | corpus-wide grep | The existing paper proposes a join without naming the identity scheme on either machine side. |
| 148 of 494 citation markers sit in documents with no bibliography | 70 percent resolvable | A citation that resolves to nothing is worse than none. |

**W0, the corrective pass, precedes every paper.** Seven new documents citing a
foundation with the wrong ISO number multiplies the defect rather than fixing it.

## The seven papers

Two upstream, one bridging, three applied, one payoff.

| # | Paper | Audience | Establishes |
|:--|:---|:---|:---|
| P1 | The Three-Identity Join | upstream | The mapping between `TagName`, `purl`/`bom-ref` and `mRID`, delivered as a DEXPI Standard Library extension, a CycloneDX property taxonomy and a CIM profile reference. |
| P2 | A CIM Profile for Cyber-Physical Assets | upstream | Which CIM subset, and why. Without a profile, "add CIM" is unbounded. CGMES is the precedent. |
| P3 | Conformance and Reference Implementation | upstream | What a conformant unified file is. Three round-trips, validation rules, test vectors. This is what separates an adopted spec from an admired one. |
| P4 | Energy: RefBESS-250MW | practitioner | Full coverage. Process systems and switchgear, the second of which two schemas could not reach. |
| P5 | Manufacturing: RefPharma-API-1 | practitioner | DEXPI home ground with a deliberately thin CIM leg, which tests that the join degrades gracefully rather than only working when all three legs are rich. |
| P6 | Rail: RefDepot-EMU-12 | practitioner | Depot process and traction power. This is the case that forced the third schema. |
| P7 | Blast Radius Across Three Ontologies | both | The payoff. A CVE traced from component, through process topology, into electrical topology. Neither the existing paper nor any single standard answers it. |

P5 earns its place by being the weak CIM case. A join that only works when every
leg is rich is not a general mechanism, and publishing it without testing that
would be a claim the corpus could not support.

## Kaizen applied

### Poka-yoke: the finding that matters most

The corpus already gates two defect classes and gates none of the four that
actually bit it.

| Defect class | Gate today |
|:---|:---|
| Prose lost between source and rendered page | `audit-rendered-completeness.js` |
| Malformed diagram shipping as a grey block | `audit-mermaid.mjs` |
| Word-count fidelity source to bundle | `audit-publications.js` |
| **Terminology inconsistency** | **none** |
| **Citation resolution** | **none** |
| **Arithmetic that does not reproduce** | **none** |
| **Epistemic labels on unsourced results** | **none** |

**19 of the 55 findings in the WG-05-CAD and WG-07-TM audit were proved by
putting two passages side by side.** Every one of them is mechanically
detectable. A terminology gate would have caught the CBOM collision, the BOM
count, and the four incompatible IEC 62443 zone schemes, on the commit that
introduced them, for the cost of one script.

This is the kaizen point. The corpus has been fixing these by hand, repeatedly,
across four sessions. The em-dash substitution was the same story: nineteen
compilers producing the same artifact, repaired by hand for weeks, until the
substitution itself was guarded. Fix the mechanism, not the output.

**Three gates to build, in this order:**

1. **`audit-terminology.mjs`** — one registry file defining each term, acronym
   and standard number once. The gate fails if a document uses a variant.
   Catches the largest single class of confirmed findings.
2. **`audit-citations.mjs`** — every `[n]` resolves to an entry n in the same
   document's bibliography; every bibliography entry is cited at least once.
   Catches orphaned markers and orphaned entries in one pass.
3. **`audit-arithmetic.mjs`** — any stated relation of the form `a op b = c` in
   a fenced block recomputes. Narrow scope on purpose; it catches the class that
   produced the 60,000 MW-seconds error and the 1.05 weight vector.

### Just-in-time: what NOT to build

- **Do not write P4 through P6 before P1 and P3 are stable.** A sector paper
  built on a join spec that then changes is rework. Sequence, do not parallelise.
- **Do not build CIM tooling before P2 fixes the profile.** Unbounded scope.
- **Do not build `audit-arithmetic.mjs` first.** It is the hardest of the three
  and catches the smallest class. Terminology first, on measured evidence.
- **Do not write the three sector papers to a uniform template.** P5 exists to
  be different; forcing symmetry would destroy the thing it tests.

### Standardised work

The reference model in `notes/2026-09-06/publication-roadmap.md` governs. Three
labels, applied without exception: **Sourced**, **Modelled**, **Novel synthesis**.
The words *verified*, *empirical*, *validated* and *we prove* are not labels for
a computed result, and the corpus-wide sweep that took 156 occurrences to 27
established the precedent.

### Continuous improvement

W0 first, one defect class at a time, each verified before the next. Then P1.
Then P3, because a spec without conformance is not adoptable. Then P2. Then the
sector papers in sequence. P7 last, because it can only be written once the
other six hold.

## Metrics

Every metric here is machine-computable, has a measured baseline, and can become
a gate. A metric that cannot be computed is an opinion.

| # | Metric | Definition | Baseline today | Target |
|:--|:---|:---|:---|:---|
| M1 | **Citation resolution** | `[n]` markers resolving to an entry in the same document, over all markers | **70%** (346 of 494) | 100% |
| M2 | **Terminology variance** | count of terms carrying more than one definition corpus-wide | CBOM 2, BOM count 3, zone schemes 4 | **0** |
| M3 | **Reproducibility** | figures a reader can recompute from inputs stated in the same document, over all quantitative figures | not yet measured | 100% of Sourced and Modelled |
| M4 | **Epistemic honesty** | unsupported uses of verified, empirical, validated, we prove | **27** (from 156) | 27 justified, 0 unjustified |
| M5 | **Gate coverage** | defect classes with an automated gate, over classes with a confirmed finding | **3 of 7** | 6 of 7 |
| M6 | **Cross-document contradiction** | pairs of passages asserting different values for the same quantity | **19 confirmed** in one audit scope | 0 |
| M7 | **Sourcing depth** | external facts carrying a primary citation, over all external facts | WG-04-CF high, WG-01-UI **0 of 41** | 100% |

**M3 is the one that matters most and is not yet measured.** A research corpus
is credible exactly to the degree a reader can recompute its numbers. Every
other metric is a proxy for it.

**M5 is the leading indicator.** Gates prevent; audits detect. Moving M5 from 3
to 6 is what stops M1, M2 and M6 regressing after they are fixed once.

### What these metrics deliberately do not measure

Word count, paper count, and diagram count are not quality. This programme has
already produced a case where the honest fix reduced a claimed return from
43.9:1 to 4.4:1, and a case where a 156-to-27 reduction in one word class was
the single highest-value change available. Volume metrics would have scored both
as regressions.

## Open questions for Jim

1. **Is DEXPI e.V. engagement in scope?** P1 is written as a contribution
   proposal. Whether it is actually submitted upstream changes how normative the
   language should be.
2. **RefBESS-250MW versus reusing RefDNSP-1.2M.** The Cascading Failure paper
   already specifies a 1.2 million customer network. A BESS site is a different
   granularity. Reuse, or specify a new asset at site scale?
3. **P7 depends on a CVE-to-physical-consequence chain.** The corpus has the
   tiered CVE matcher concept from other work. Is that available here, or does
   P7 build its own?
