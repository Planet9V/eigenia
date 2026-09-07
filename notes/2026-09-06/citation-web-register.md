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

## Corpus-wide audit: RUN 2026-09-06

Four auditors read all 49 documents in full, none sampled, and returned 127
findings. Reports are committed at `notes/2026-09-06/audit-*.md`.

### Citation infrastructure, measured

| Working group | Docs | Words | `[n]` markers | Docs with a bibliography |
|:---|---:|---:|---:|---:|
| WG-01-UI Underwriter | 12 | 28,235 | **0** | **0 of 12** |
| WG-02-DT Digital Twin | 10 | 21,919 | 69 | **0 of 10** |
| WG-03-ML Behavioural | 7 | 23,067 | 43 | 3 of 7 |
| WG-04-CF Cascading | 7 | 64,144 | 375 | 5 of 7 |
| WG-05-CAD DEXPI | 6 | 19,909 | **0** | **0 of 6** |
| WG-07-TM Threat Modeling | 4 | 12,727 | **0** | **0 of 4** |
| WG-08-MO Monte Carlo | 1 | 539 | **0** | **0 of 1** |
| MP Math Physics | 2 | 4,887 | 3 | **0 of 2** |

Read the second and fourth columns together. WG-02-DT carries 69 numbered
citation markers and not one bibliography for them to resolve against. Every
marker in that working group points nowhere.

WG-01-UI is the starker case: 28,235 published words, no markers, no
bibliography, no URL, no DOI, against 41 invocations of named external work
including Gordon-Loeb sixteen times and Taleb thirteen. Nothing is
misattributed there because nothing is attributed at all.

WG-04-CF is the only working group with a functioning citation apparatus, and
that is a result of this session's work, not a pre-existing condition.

### Dangling works, verified against disk

Each is cited in exactly one document and has no file anywhere:

| Work | Cited in |
|:---|:---|
| *Topological Cyber-Physics* | `MP_Kramers_Escape_Model.md` |
| *Psychohistory and the Digital Twin* | `WG-03-ML-Mckenney-Lacanian.md` |
| *Symphonic Calculus* | `WG-03-ML-Musical-Psychometric-Notation.md` |
| *Systems Assurance in High-Entropy Industrial Complexes* | `WG-05-CAD-Frontier-AI-Hardware-Security.md` |

These are four more rows for the works-to-create list, or four citations to
strike. They are NOT the same case as the three WG-04-CF works written this
session: those were cited repeatedly and load-bearing, whereas these four are
each cited once. Striking may be the better answer for some. That is Jim's call
per work.

### Two leads that were REFUTED, and why it matters

Prior notes recorded citations to `[87]` and `[558]` as dangling. Both were
**line numbers**, not citation indices. The audit proved it: no three-digit
citation exists anywhere in that scope, and the file allegedly citing `[87]` is
86 lines long. **Zero out-of-range citations exist in WG-03-ML or MP.**

Recorded because this register is meant to be trustworthy, and two of its
original entries were wrong. A register that carries unverified leads has the
same defect as the corpus it audits.

### The finding that outranks the citation gap

Across at least three working groups, quantitative results are labelled
**"verified"** or **"empirical"** where the arithmetic is exact and the inputs
are author-chosen. WG-01-UI's three ROSI figures reproduce exactly. WG-02-DT's
three reproduce exactly. WG-03-ML's six reproduce to the digit, five labelled
verified. WG-05-CAD carries six more.

Correct arithmetic on invented inputs is worse than an arithmetic error,
because checking the sums confirms it. This is the same defect class as F10 in
`findings.md`, at corpus scale, and it is the single highest-value fix
available: one sweep over the words "verified", "empirical" and "we prove".
