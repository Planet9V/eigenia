# Cascading Failure paper: uplift to academic standard

Date: 2026-09-06
Status: design approved, implementation plan pending
Verification model: evidence gates, not agent self-reports

## Why

`references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md` is published
live at `/papers/cascading-failure-hypothesis`. It runs 29,995 words across 141 sections, and its
entire financial layer is redacted: **351 `[investment required]` placeholders across 110 table
rows**, including the second sentence of its abstract:

> estimated economic impact between [investment required] million and [investment required] billion

A research paper whose abstract asks the reader for money in square brackets is the most damaging
artifact on the site for the audience it targets. The 2026-09-03 multi-agent review ranked it the
worst single file in the corpus.

The paper is hand-maintained. No `compile_*.py` owns it, so edits to the `.md` are permanent.

## Decisions taken

1. **Economics rebuilt from public sources**, not invented and not merely relabelled. Every figure
   derives from a published input through a stated formula, so a reader can recompute it.
2. **`ACME Inc.` becomes `RefDNSP-1.2M`**, an explicitly specified synthetic reference network,
   following the pattern the corpus already uses with `RefFac-100MW-AI` in the Frontier paper.
3. **Split into two documents**, so the research argument stops competing with operational paperwork.

## Architecture

### Document A: the research paper (~12,000 words)

`references/WG-04-CF-Cascading-Failures/WG-04-CF-Cascading Failure Hypothesis.md`
Path unchanged, so both registry entries and the published slug keep working.

```
1  Introduction and hypothesis
2  Reference network specification (RefDNSP-1.2M)
3  Grid physics: inertia, RoCoF, protection margins
4  Attack path: DER aggregation to protection misoperation
5  Cascade propagation model
6  Economic impact, sourced
7  Mitigations and systems assurance
8  Limitations and threats to validity
9  References
```

Section 8 is new and non-negotiable. A paper that states what it cannot support is more credible
than one implying it supports everything.

### Document B: the playbook (new)

`references/WG-04-CF-Cascading-Failures/WG-04-CF-Grid-Incident-Response-Playbook.md`

Takes the SITREP formats, board reporting pack, public media statements, notification matrices and
run-books. Useful operational artifacts; not research, and they currently bury the argument. Must
be registered in **both** `web/src/lib/papers.ts` and `web/src/lib/wikiRegistry.ts`, or it is
unreachable and no gate will catch it.

## The economics rebuild

Applied to every hollowed row:

```
unserved energy (MWh) = customers affected x average demand (kW) x restoration hours
direct cost           = VCR ($/kWh) x unserved energy
```

**Precision correction to carry into the text:** VCR determination has been the AER's statutory
responsibility since the AEMC's July 2018 final rule, not AEMO's. AEMO produced the 2014 NEM-wide
study; the AER has produced determinations since, in $/kWh, on a five-year cycle. The paper
attributes VCR to AEMO in places. Fix it.

Rules for every cell:

- A figure with a public source carries a bracketed citation to it.
- A figure without one is labelled a modelled estimate, assumptions stated inline.
- No cell keeps a placeholder, and no cell gets a number that cannot be defended.
- Ranges beat false precision. `$412M to $1.6B` beats `$890,412,000`.

If a row can be neither sourced nor defensibly modelled, cut the row. A shorter honest table beats
a complete invented one.

## Sourcing

Valyu first per the vault rule; Perplexity only where Valyu falls short.

| Domain | Source |
|---|---|
| Outage cost | AER Values of Customer Reliability determinations ($/kWh) |
| System planning, inertia | AEMO Integrated System Plan; AEMO frequency risk reviews |
| Incident precedent | South Australia 2016 and UK 9 Aug 2019 official reports; ENTSO-E system separation reports |
| Standards | IEC 62443, IEC 61850, NERC CIP, AESCSF, SOCI Act |
| DER and BESS | AEMO DER register; published BESS reliability studies |

Every external source is filed in `references/external-research/` as
`WG-04-CF_<topic-slug>_<YYYYMMDD>.md` with title, the query run, URL/DOI, retrieval date, which
claim it supports, and a short summary. This is already the governance policy in the root
`CLAUDE.md`, and doing it closes the standing finding that the directory holds only its README
while the published governance document describes a per-source evidence trail.

## Diagrams

Mermaid, now that the renderer ships. Four earn their place:

1. Cascade propagation, initiating event to regional outage, as a timed sequence.
2. Attack path mapped onto Purdue levels.
3. RoCoF against system inertia, showing where protection thresholds are crossed.
4. Cross-sector dependency graph: electricity to water, telecoms, health, transport.

Themed to the site tokens. No diagram may carry a number absent from the sourced tables.

## Cross-references

The paper should stop standing alone:

- `/papers/ale-rosi-decision-framework` for loss quantification method
- `/papers/cyhazop-hyperscale-methodology` for the hazard analysis method
- `/papers/emerging-power-topologies` for BESS, SMR and inertia decay
- `/papers/death-wobble-frequency-instability` for the frequency instability groundwork
- `/papers/tacam-deep-dive` and `/papers/atq-deep-dive` for threat actor characterisation

## Voice and style

Jim's register: declarative, concrete, short sentences for impact, numbers wherever numbers exist,
blunt where bluntness is earned. Bound by constraints the repo already enforces in `CLAUDE.md`:

- No em dashes. None of `leverage`, `utilize`, `pivotal`, `robust`, `landscape`, `furthermore`.
- IEEE bracket citations, never glued to punctuation: `system inertia decreases [5].`
- Headings under 90 characters, no narrative sentence on a heading line.
- No leading H1 or H2 duplicating the title; the site renders those from its hero card.

## Orchestration

Sequential where dependencies exist, parallel where they do not.

1. **Research** (parallel, 3 agents): outage economics; grid physics and incident precedent;
   standards and regulatory. Each files evidence into `references/external-research/` and returns
   a source table. Nothing is drafted at this stage.
2. **Structure** (1 agent, blocking): builds the skeleton, writes the `RefDNSP-1.2M` specification
   table, and rules on which of the 110 rows survive, become models, or are cut.
3. **Drafting** (parallel, per section): writes to that structure, using only sourced figures.
4. **Diagrams** (1 agent): mermaid, after the numbers settle.
5. **Playbook extraction** (1 agent): moves operational content into Document B and registers it.
6. **Adversarial fact-check** (blocking): every number must trace to a citation or a stated
   assumption. Any that cannot is reported, not quietly kept.

## Verification gates

Gate 0 outranks the rest.

| # | Gate | Command |
|---|---|---|
| **0** | **No prose silently lost** | `node scripts/audit-rendered-completeness.js` -> PASSED. This paper is deliberately restructured, so the audit runs against the NEW expected content and the split must be shown to be a move, not a deletion. |
| 1 | Zero placeholders remain | `grep -c "\[investment required\]"` -> 0 |
| 2 | Every figure sourced | fact-check agent reports no unsourced number |
| 3 | Build and fidelity | `npm run build` -> AUDIT PASSED, now 47 documents |
| 4 | Types | `npx tsc --noEmit` -> exit 0 |
| 5 | Both documents reachable | present in `papers.ts` AND `wikiRegistry.ts`, both slugs return 200 |
| 6 | Diagrams render | mermaid present, no parse errors |
| 7 | Style contract | no em dashes, no banned words, no glued citations |
| 8 | External research filed | one file per external source in `references/external-research/` |

## Risks

**This is research, not editing.** Rebuilding 110 rows from public data is the bulk of the work and
the part most likely to run long. Rows with no defensible public source become labelled models or
get cut.

**Content-loss risk is structural.** Moving a large block of text into a second document is exactly
the shape of change that has previously lost content in this repo. Run the completeness audit
against both documents together and reconcile the word budget explicitly:

```
words(Document A) + words(Document B) + words(deliberately cut) = 29,995
```

The third term must be an itemised list, not a remainder. "The numbers roughly add up" is how
content disappears. Document A targets ~12,000 words; Document B takes the operational material;
the cut list captures hollowed rows that could be neither sourced nor defensibly modelled, plus
any prose that existed only to introduce them. Anything that cannot be placed in one of those
three buckets has been lost and must be recovered before the work is accepted.

**Do not let the split orphan the playbook.** An unregistered file is invisible and the build stays
green, which is how the DEXPI position paper sat unpublished.
