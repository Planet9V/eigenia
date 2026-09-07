# Task 16: author the three cited McKenney works that do not exist

Date: 2026-09-06
Status: approved by Jim, ready to execute
Supersedes: nothing. Task 12 (bibliography merge) is deferred at Jim's instruction.

## Why

The Cascading Failure paper cites three works by J. McKenney that have no file
behind them. Verified: each is cited exactly once in the bibliography, quoted in
the body, and matches no document anywhere in `references/`.

| Cited as | Exists |
|:---|:---|
| McKenney, J. (2024, April). *Grid vulnerability analysis: The grid's unseen tremors. Frequency stability, cascading risk, and the imperative for action* | NO |
| McKenney, J. (2025, May). *The unseen current: Emerging threats to grid stability in renewable-dominated systems* | NO |
| McKenney, J. (2024). *ERCOT and WECC Renewable Integration Challenges: Inverter-Based Resource Reliability Under Stress Conditions*. Working paper | NO |

A fourth cited work, the Death Wobble paper, DOES exist and is published. The
Iberian Peninsula analysis needs no separate document; the bibliography states
the Cascading Failure paper is itself that analysis.

There were two ways to fix this. Delete the citations, which would strip real
analysis out of the paper. Or write the works. Jim chose to write them.

## The boundary this task must not cross

Writing these documents makes the citations real. It must not make them a
laundering route for claims that were never sourced.

The paper currently attributes SIX direct quotes to these works, several of
which are empirical claims about other people's grids:

1. "ERCOT's experience serves as a potential preview for other regions..."
2. "In a low-inertia system, the *same* disturbance causes the frequency to
   change *much faster* than in a high-inertia system..."
3. "Experts explicitly warn that RoCoF values above 1 Hz/s (measured over 500ms)
   may be unmanageable by current system protections..."
4. "This incident demonstrated the potential for extreme instability in very low
   inertia conditions..."
5. "Two significant inter-area oscillations in 30 minutes pre-blackout"
6. ENTSO-E "Project Inertia" studies and "global severe splits"

Plus: WECC interconnection queue times averaging 5 years, up from under 2 years
in 2008; and "unexpected tripping of inverter-based resources during faults"
attributed to NERC alerts.

**Rule: an authored document may present original framing, synthesis and
judgement under Jim's name. It may NOT be the source of record for an empirical
fact about an external system.** Where one of these documents makes a claim
about what ERCOT operated at, what NERC reported, or what ENTSO-E studied, that
document must itself carry the real external citation.

Moving an unsourced number one hop away and calling it cited is worse than
leaving it unsourced, because the second version looks defensible.

If a quoted claim cannot be supported by a real external source, the correct
outcome is to say so in the authored document and to flag the quote for removal
from the Cascading Failure paper. A shorter honest corpus beats a
self-referential one.

## What each document is

All three are Eigenia Labs working-group output, authored by J. McKenney,
following the `CLAUDE.md` sourcing policy: original framing is legitimate;
invoking a named external method, dataset or measurement without a traceable
reference is not.

### D1. `WG-04-CF-Grid-Unseen-Tremors.md`
*The Grid's Unseen Tremors: Frequency Stability, Cascading Risk, and the
Imperative for Action* (2024)

The foundational frequency-stability argument. Owns quotes 2 and 3. Establishes
the inertia-to-RoCoF relation, why inverter-based resources do not contribute
synchronous inertia, and what protection thresholds are actually set to.

### D2. `WG-04-CF-Unseen-Current.md`
*The Unseen Current: Emerging Threats to Grid Stability in Renewable-Dominated
Systems* (2025)

The forward-looking threat analysis. Owns quotes 5 and 6, the ENTSO-E Project
Inertia material and the Iberian observation. Covers what changes as penetration
rises past the point where the SA 2016 and UK 2019 events become typical rather
than exceptional.

### D3. `WG-04-CF-ERCOT-WECC-IBR-Reliability.md`
*ERCOT and WECC Renewable Integration Challenges: Inverter-Based Resource
Reliability Under Stress Conditions* (2024)

The North American comparison. Owns quotes 1 and 4, the WECC queue figures and
the NERC alert material. This one carries the highest external-fact density and
therefore the highest risk of the boundary above being crossed.

## Evidence available

Four evidence files already filed, all built from primary sources and already
adversarially checked:

- `WG-04-CF_grid-inertia-rocof_20260906.md` (9 sources: AEMO, AEMC, EirGrid,
  NERC PRC-029-1, ENA G99, swing equation)
- `WG-04-CF_blackout-incidents_20260906.md` (4 sources: AEMO final report,
  National Grid ESO, Ofgem, ENTSO-E)
- `WG-04-CF_outage-cost-vcr_20260906.md` (AER VCR determinations)
- `WG-04-CF_remediation-cost-benchmarks_20260906.md` (SOCI Act, AER, Dragos)

D1 and D2 can be built substantially from these. D3 covers ERCOT, WECC and NERC,
which none of them cover, so it needs its own research pass and its own evidence
file.

## Registration

Each document must be registered in BOTH `web/src/lib/papers.ts` and
`web/src/lib/wikiRegistry.ts`, or it is unreachable and no gate will catch it.
This is how the DEXPI position paper sat unpublished. The WG-04-CF working group
badge currently reads `CASCADING FAILURES 01-03` and becomes `01-06`.

## Gates

| # | Gate | Command |
|:--|:---|:---|
| 0 | No prose lost anywhere | `node web/scripts/audit-rendered-completeness.js` |
| 1 | Every external fact carries a real citation | adversarial fact-check, blocking |
| 2 | Both registries updated, both slugs resolve | build + registry count |
| 3 | Build and fidelity | `npm run build` -> AUDIT PASSED, 53 documents |
| 4 | Types | `npx tsc --noEmit` |
| 5 | Diagrams parse | `node web/scripts/audit-mermaid.mjs` |
| 6 | Style contract | 0 em dashes, 0 en dashes, 0 spaced semicolons, no banned words |
| 7 | No self-referential sourcing | no authored document cites another authored document as the source of an external fact |

Gate 7 is the one that matters. The rest are mechanical.
