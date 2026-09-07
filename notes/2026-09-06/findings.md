# Cascading Failure uplift: findings not anticipated by the plan

Date: 2026-09-06
Status: open, feeding new tasks
Source: evidence-gathering tasks 2, 3a and my own verification

The plan assumed the paper's technical layer was sound and only its financial
layer was hollow. Sourcing the technical claims disproved that. What follows
are defects in the published paper itself, found while sourcing it.

## F1. The paper contradicts itself on 49.85 Hz. CONFIRMED.

`49.85 Hz` appears 8 times. It is used two incompatible ways.

Correct, line 940:

    48.8 Hz < f < 51.2 Hz (AEMO normal operating band: 49.85-50.15 Hz)

Wrong, lines 393, 640, 721, 883:

    triggering under-frequency protection relays at the 49.85 Hz threshold
    A3 -->|RoCoF > 1.0 Hz/s| A4[Under-Frequency Relay Trip<br/>49.85 Hz Threshold]
    | T+15:00 | Protection cascade | Under-frequency relays trip at 49.85 Hz threshold |
    - UFLS Stage 1: 49.85 Hz - shed 5% of load (additional 500 MW)

49.85 Hz is the floor of the AEMC Frequency Operating Standard's NORMAL
OPERATING BAND, the range the system sits in almost all the time. It is not a
load-shedding trigger. The paper says so itself at line 940 and then treats it
as a trip point everywhere else.

This does not need an external source to establish. The paper refutes itself.
It is the single most damaging technical error in the document: a grid engineer
reading it would stop there.

Confirmed independently against the AEMC Frequency Operating Standard
(effective 1 January 2020) in
`references/external-research/WG-04-CF_grid-inertia-rocof_20260906.md`,
Source 2: normal band 49.85 to 50.15 Hz, extreme limit 47.0 to 52.0 Hz.

Fix requires finding the real NEM UFLS schedule. AEMO's Inertia Requirements
Methodology uses 49 Hz as its RoCoF-to-time reference point, a full Hz below
the paper's number, which is the right order of magnitude for shedding.

## F2. 445 MW is superseded. CONFIRMED.

4 occurrences, lines 146, 419, 2476, 2480. AEMO's March 2017 FINAL report gives
456 MW over "a period of less than seven seconds". 445 MW is October 2016
INTERIM reporting. Same root cause as the three errors already corrected in the
outage-cost evidence file: interim data that AEMO later revised.

Line 146 additionally says "9 separate faults within 7 seconds"; AEMO's final
report describes six voltage dips and eight of nine wind farms responding.
Align the whole line, not just the MW figure.

## F3. 6.1 Hz/s is unconfirmed. OPEN.

9 occurrences. Attributed variously to AEMO's final report and to McKenney
(2024, 2025). The Task 3a researcher opened AEMO's final report directly and
could not find it. It circulates widely in secondary commentary.

Note the paper presents it as measured, line 149: "With H = 2.8 seconds (actual
pre-fault inertia): 6.1 Hz/s measured".

Three ways to resolve, in order of preference:
1. Someone opens AEMO's final report RoCoF section and quotes it.
2. Derive it from the swing equation using the now-confirmed 456 MW and a
   sourced inertia figure, and label it a derivation, not a measurement.
3. Cut it and rebuild the argument on the UK 2019 event, which is fully
   documented and is a better example anyway because its protection cascade is
   the paper's actual thesis.

Do not publish it as an AEMO measurement without option 1.

## F4. The UK 1 Hz/s claim needs a qualifier. OPEN.

Great Britain still runs legacy 0.125 Hz/s relays alongside the newer 1 Hz/s
G99 setting with a 500 ms definite time delay. The retrofit programme for
existing sub-50 MW generation had a 31 August 2022 deadline. A flat "the UK
RoCoF threshold is 1 Hz/s" misdescribes a system carrying several tranches at
different settings.

## F5. 37 orphaned semicolons from em-dash stripping. CONFIRMED.

A previous em-dash removal pass replaced `—` with ` ; `, leaving a space before
the semicolon. 37 occurrences, including the second sentence of the abstract:

    Six interdependent critical infrastructure systems ; water, hospitals,
    telecommunications, transport, military, and financial services ; amplify

This is live on the site. It reads as a typographical fault on every one of the
37 lines. Correct repair is per-instance, not a blind replace: some want a
comma, some a colon, some parentheses, some a sentence break. A global
substitution would produce 37 new infelicities in place of 37 old ones.

## Sequencing consequence

F1, F2 and F5 are corrections to text the plan's later tasks will rewrite
anyway. Doing them now risks double work. Doing them late risks the rewrite
propagating the errors into new prose.

Decision: fix F1, F2 and F5 BEFORE the section rebuilds (plan tasks 5 and 6),
because those tasks rewrite the sections these errors live in and would
otherwise carry them forward. F3 and F4 are resolved during the rebuild, when
the surrounding argument is being rewritten regardless.
