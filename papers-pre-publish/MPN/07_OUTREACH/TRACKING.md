# Tracking sheet: who was asked, and what came back

One row per person asked. This file is the only place a name sits beside a
respondent code, and it is the only join between a person and a response file in
the corpus. It does not travel with the corpus and it is not part of any
write-up.

Fill the row when the invitation goes out. Fill the right-hand columns when the
response arrives. Leave a cell blank rather than guessing.

The three roles are three professions and not three seats. There is no cap on
how many people are asked on any path, no target split between the three, and
no requirement that they come out level. The sheet grows a row per person for
as long as people are being asked, and returns arrive over weeks rather than in
one batch.

## Columns

| Column | What goes in it |
|:---|:---|
| Code | `R01` upward, assigned when the invitation is sent, never reused. Padded to two digits to `R99`, three from `R100`, and nothing already assigned is re-padded |
| Who | The person's name, as you would write it to them |
| Role | `composer`, `therapist` or `researcher`, the path the invitation pointed at. A profession, so any number of rows carry the same one |
| Asked | Date the invitation went out, ISO |
| Build | First eight characters of the `MANIFEST.json` hash on the day the link was sent |
| Wording | First eight characters of the pack HTML hash on the day the link was sent |
| Replied | `yes`, `no`, or `declined` |
| Wave | `w1` or `w2`. A wave is a build rather than a batch, so wave 2 stays open and has no size |
| Received | Date the response file arrived, ISO |
| Filed | `yes` once the file is in the wave directory and the register line is written |
| Status | `complete`, `partial`, `superseded` or `unusable`, copied from the register |
| Note | Anything that changes how the response is read |

`Build` and `Wording` are what decide pooling later, and they are the two things
the returned file does not carry, so they have to be recorded here at the moment
the link is sent. See the intake protocol, section 6.

If the path a respondent actually picked differs from the one the invitation
pointed at, the `Role` column keeps what was asked and the note records what they
chose. The file name follows what they chose, and the running count below
counts what they chose rather than what was asked.

## The running count

Update it when a row's `Replied` or `Filed` changes. It is the number that
every result is read against, because a result from two composers and a result
from twelve are different objects. `s8_intake.py` prints its own count over the
files it was given; this one covers the whole sheet, including the people who
have not answered.

| Role | Asked | Replied | Filed | Declined or no reply |
|:---|---:|---:|---:|---:|
| composer | 7 | 5 | 5 | 2 |
| therapist | 3 | 1 | 1 | 2 |
| researcher | 2 | 0 | 0 | 2 |
| **total** | **12** | **6** | **6** | **6** |

A role with nothing filed is reported as having none rather than left out of
the write-up. One return is an anecdote, three give a spread, and around ten
settle a design parameter for that profession. None of it is a citable
perceptual claim at any size.

## The sheet

The example rows below show an uneven split, which is the ordinary case rather
than an edge one.

| Code | Who | Role | Asked | Build | Wording | Replied | Wave | Received | Filed | Status | Note |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| R01 | A. Placeholder | composer | 2026-09-16 | 4b19c0d2 | 8e0a7715 | yes | w1 | 2026-09-18 | yes | complete | |
| R02 | B. Specimen | therapist | 2026-09-16 | 4b19c0d2 | 8e0a7715 | yes | w1 | 2026-09-21 | yes | partial | Stopped after part D, said so in the last box |
| R03 | C. Example-Name | researcher | 2026-09-17 | 4b19c0d2 | 8e0a7715 | no | w1 | | | | |
| R04 | D. Placeholder | composer | 2026-09-17 | 4b19c0d2 | 8e0a7715 | yes | w1 | 2026-09-19 | yes | complete | |
| R05 | E. Specimen | composer | 2026-09-22 | 4b19c0d2 | 8e0a7715 | declined | | | | | |
| R06 | F. Example-Name | composer | 2026-09-22 | 4b19c0d2 | 8e0a7715 | yes | w1 | 2026-10-02 | yes | complete | |
| R07 | G. Placeholder | therapist | 2026-09-24 | 4b19c0d2 | 8e0a7715 | no | w1 | | | | |
| R08 | H. Specimen | composer | 2026-10-05 | 4b19c0d2 | 91cc2e40 | yes | w2 | 2026-10-14 | yes | complete | Wording changed between waves, stimuli did not |
| R09 | I. Example-Name | researcher | 2026-10-05 | 4b19c0d2 | 91cc2e40 | no | w2 | | | | |
| R10 | J. Placeholder | composer | 2026-10-06 | 4b19c0d2 | 91cc2e40 | yes | w2 | 2026-11-03 | yes | complete | Arrived after the first wave 2 run. Run redone over the whole directory |
| R11 | K. Specimen | composer | 2026-10-06 | 4b19c0d2 | 91cc2e40 | declined | | | | | |
| R12 | L. Example-Name | therapist | 2026-10-09 | 4b19c0d2 | 91cc2e40 | no | w2 | | | | |
| | | | | | | | | | | | |
