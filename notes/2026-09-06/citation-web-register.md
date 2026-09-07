# Eigenia citation web: register of works to be created

Date opened: 2026-09-06
Owner: J. McKenney
Status: live register. Append as gaps are found; close rows as works are published.

## Purpose

Eigenia's papers cite Eigenia's papers. That is legitimate and is how a research
programme builds a body of work. It only holds together if every cited work
actually exists, is published, and is reachable.

This register is the single list of what still has to be written for that web to
close. A citation to a work that does not exist is worse than no citation: it
looks like evidence and is not.

## The rule every authored work obeys

An Eigenia paper may present original framing, synthesis and engineering
judgement under its author's name. It may **NOT** be the source of record for an
empirical fact about an external system.

Where an Eigenia paper states what AEMO measured, what NERC reported, what ERCOT
operated at, or what ENTSO-E studied, that paper carries the real external
citation itself. Moving an unsourced number one hop into our own corpus and
calling it cited is laundering, not sourcing, and it is worse than leaving the
number bare because the second version looks defensible.

Gate: no authored Eigenia work may cite another authored Eigenia work as the
source of an external fact.

## Status of every self-cited work in the corpus

Seven distinct Eigenia or McKenney works are cited across `references/`.

| Work | Cited in | State | Action |
|:---|:---|:---|:---|
| *The Grid's Precarious Pulse: Death Wobble and Frequency Instability* | WG-04-CF | **PUBLISHED** | none |
| *Death wobble: the grid's precarious pulse* (2024, April) | WG-04-CF | **PUBLISHED**, cited under a variant title | normalise the title in the bibliography |
| *Cascading Failure Analysis: SA 2016, UK 2019, Iberian 2025* | WG-04-CF | **SELF**, the bibliography marks it "(This document.)" | keep, it is not a missing work |
| *The Grid's Unseen Tremors* (2024) | WG-04-CF | **BEING WRITTEN** (Task 16, D1) | in flight |
| *The Unseen Current* (2025) | WG-04-CF | **BEING WRITTEN** (Task 16, D2) | in flight |
| *ERCOT and WECC Renewable Integration Challenges* (2024) | WG-04-CF | **SOURCED, NOT YET WRITTEN** (Task 16, D3) | evidence filed 2026-09-06; author next |
| *Project Inertia* | WG-04-CF line 636 | **TO BE WRITTEN**, see the naming problem below | W1 |

### Two entries that must NOT become real documents

`EE-CTI-004 BESS Architecture Vulnerability Assessment: Bawley Point Community
Battery` and `EE-CTI-005 DERMS Security Architecture Review: mPrest Platform`
are cited as internal reports of **RefDNSP-1.2M**, which is a specified
synthetic reference network, not a real operator. They cannot exist as real
documents and must not be written.

Action: relabel both in the bibliography as scenario artifacts of the reference
network, not as retrievable sources. A reader must not try to request them.

## The Project Inertia naming problem

**This needs Jim's decision and is flagged rather than silently resolved.**

`ENTSO-E "Project Inertia"` is how the Cascading Failure paper cites it today, at
line 636, inside a sentence attributing the finding to ENTSO-E:

> McKenney's (2024) analysis of ENTSO-E system split risks: "ENTSO-E studies
> confirm that declining inertia significantly increases the risk of system
> splits leading to high RoCoF..."

Project Inertia is a real ENTSO-E workstream name. If Eigenia publishes a paper
called *Project Inertia* and that citation is pointed at it, the paper would be
attributing **Eigenia's own conclusions to ENTSO-E**. That is precisely the
laundering the rule above forbids, and it is the most damaging version of it,
because it borrows a system operator's authority.

The fix is two separate actions, not one:

1. **Write the Eigenia paper.** Eigenia is entitled to an inertia research
   track. Published under Eigenia Labs with J. McKenney's byline and its own
   hero card, there is no ambiguity about who wrote it. Keeping the name
   *Project Inertia* is defensible on that basis, provided the paper opens by
   stating plainly what it is, and that it is not ENTSO-E's workstream of the
   same name. That statement is mandatory, not stylistic.
2. **Fix line 636 separately.** The ENTSO-E claim must either carry a real
   ENTSO-E citation or be restated as Eigenia's own analysis. It must NOT be
   repointed at the new Eigenia paper. Pointing it there would convert a
   sourcing gap into a misattribution.

If Jim would rather avoid the collision entirely, the alternative title is
*The Inertia Horizon: Synchronous Inertia Decay and System Separation Risk to
2040*. Either is workable. The naming choice does not change action 2.

## Works to create

### W1. Project Inertia
`references/WG-04-CF-Cascading-Failures/WG-04-CF-Project-Inertia.md`

Eigenia's inertia research track. Forward projection of synchronous inertia
decay and system separation risk in low-inertia grids, 2030 to 2040.

Evidence available: `WG-04-CF_grid-inertia-rocof_20260906.md` (AEMO inertia
methodology and its RoCoF-to-time table, AEMC frequency bands, EirGrid's
in-service 23,000 MVA.s minimum and plus or minus 1.0 Hz/s limit, NERC
PRC-029-1, ENA G99), plus `WG-04-CF_blackout-incidents_20260906.md` (the
ENTSO-E 8 January 2021 separation in full causal detail) and
`WG-04-CF_ercot-wecc-ibr-reliability_20260906.md` (ERCOT critical inertia
100 GW.s, four NERC IBR disturbance reports).

Must open by distinguishing itself from ENTSO-E's workstream of the same name.
Must not assert any ENTSO-E finding it cannot cite.

### W2. ERCOT and WECC Renewable Integration Challenges
`references/WG-04-CF-Cascading-Failures/WG-04-CF-ERCOT-WECC-IBR-Reliability.md`

Evidence filed 2026-09-06. Three claims in the citing paper came back wrong and
the authored work must correct rather than repeat them:

- ERCOT "43% inverter-based resource capacity": **UNSUPPORTED**. No ERCOT
  document at any date checked shows it; the bracketing values are 28.8%
  (November 2021) and 45.0% (August 2026).
- Peak renewable penetration "above 75%": **VERIFIED and made exact**, 75.67% on
  29 March 2024 at 2:13 p.m., 34,958 MW. It is a single instant, and it is not
  simultaneous with any capacity-share figure, so the two must not be paired.
- WECC queue "averaging 5 years, up from under 2 years in 2008": the quote is
  verbatim from LBNL *Queued Up* 2024, but it is a **national US figure**. LBNL
  publishes no WECC-only queue duration. Say national, or drop it.
- ERCOT critical inertia: **100 GW.s** is the System Operating Limit. The
  105 GW.s figure circulating is a separate control-room restoration trigger.
  This is the third instance in this project of an operational setting being
  reported as a measured limit; see findings F1 and F6.

### W3. Bibliography normalisation pass
Not a new work. Fold into the deferred Task 12: normalise the two Death Wobble
title variants to one, mark the two RefDNSP internal reports as scenario
artifacts, and resolve every `[n]` marker introduced in sections 5 and 9 against
a real numbered entry.

## Corpus-wide audit, not yet run

This register covers WG-04-CF, because that is where the current work is. The
same class of defect is likely present in the other eight working groups and has
not been checked. A corpus-wide pass over all 50 documents should look for:

- citations to Eigenia or McKenney works with no file behind them
- citations to external methods, models or datasets with no traceable source
  (the standing `CLAUDE.md` policy, for instance Clayton Copulas, GGNNs, Kramers
  escape models)
- uncited quantitative claims of the kind recorded as F10, which are already
  known to exist in this paper's section 7.5 and Appendix M

Until that pass runs, this register is known to be incomplete, and says so here
rather than implying it is the whole picture.
