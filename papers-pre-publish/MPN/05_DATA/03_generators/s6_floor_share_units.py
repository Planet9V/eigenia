#!/usr/bin/env python3
"""
s6_floor_share_units.py  --  MPN-S6, section 3.

WHAT THIS ANSWERS. Design section 6.4 and D30 rest on the premise that the
three floor-share units, seconds, words and turns, "genuinely disagree about
who dominated a conversation". That premise had never been computed anywhere in
this programme. This script computes it on the only material available, which
is the seven score files, and reports the two units that material can carry.

WHAT IT CANNOT DO, STATED BEFORE ANY NUMBER.
  1. SECONDS IS UNAVAILABLE. Design section 7.2: a script yields no timings, so
     floor share in seconds cannot be computed on this corpus at all. Every
     figure below is therefore a LOWER BOUND on the disagreement between the
     three units, because the unit most unlike the other two is missing.
  2. A ROW IS NOT A TURN. The score files are one row per line of text, so the
     turn count below merges consecutive rows carrying the same SPEAKER. That
     is the nearest approximation the material allows and it is not exact.
  3. NONE OF THESE FILES IS A CONVERSATION. They are seven Project Gutenberg
     play texts and none is a moderated exchange, which is change 19's limit on
     every corpus figure in this programme. These numbers show that the units
     CAN disagree. They do not say how often two speakers in a dialogue would.
  4. THESE FIGURES ARE NOT IN VERIFICATION-2026-09-14.txt. They are new with
     MPN-S6 and are reproduced by running this file. The coverage figures that
     ARE verified there, 69.2 / 50.1 / 39.0 per cent, count rows and include
     the non-speaker token STAGE; this script excludes STAGE and merges turns,
     so its coverage column is a DIFFERENT computation and is not a correction
     of the verified one.

THE EXCLUSIONS, which are the design's own rules applied to its own evidence.
  KING_LEAR is excluded entirely: design section 4.1 makes the product refuse
  it, 3,424 of its 3,425 rows carrying the non-speaker token STAGE.
  The three anthology files are excluded from the headline: design section 8
  and ruling C hold that a top-two share over a file of several plays with
  disjoint casts measures the anthology and not any play. They are printed
  below the line, labelled, so the reader can see what they do.
  The non-speaker token STAGE is dropped wherever it appears, which is design
  section 8's non-dialogue exclusion.

No randomness of any kind. No network. Reads the score files only.
"""

import collections
import csv
import os
import sys

SINGLE_PLAYS = ("A_DOLLS_HOUSE", "HAMLET", "MACBETH")
ANTHOLOGIES = (("CHERRY_ORCHARD", 8), ("MISS_JULIE", 5), ("OEDIPUS_REX", 3))
REFUSED = ("KING_LEAR",)
NON_SPEAKER = "STAGE"
PROBE = "MCKENNEY_LACAN_SCORE_HAMLET.csv"

CANDIDATES = (
    "/mnt/user-data/uploads/eigenia/papers-pre-publish/MPN/05_DATA/01_scores",
    os.path.expanduser("~/mnt/eigenia/papers-pre-publish/MPN/05_DATA/01_scores"),
    os.path.expanduser("~/eigenia/papers-pre-publish/MPN/05_DATA/01_scores"),
    "/home/claude/mpn-scores",
)


def resolve_scores():
    """Same resolver pattern the other s6 generators use. MPN_SCORES overrides."""
    env = os.environ.get("MPN_SCORES")
    if env:
        if os.path.exists(os.path.join(env, PROBE)):
            return env
        sys.exit(
            "MPN_SCORES is set to %s but that folder does not contain %s. It must be "
            "the folder holding the seven MCKENNEY_LACAN_SCORE_*.csv score files." % (env, PROBE)
        )
    for cand in CANDIDATES:
        if os.path.exists(os.path.join(cand, PROBE)):
            return cand
    sys.exit(
        "the score files were not found. This script needs the folder holding the seven "
        "MCKENNEY_LACAN_SCORE_*.csv files, identified by %s. It looked, in order, in: %s. "
        "Set MPN_SCORES to that folder." % (PROBE, ", ".join(CANDIDATES))
    )


def read_file(scores, name):
    path = os.path.join(scores, "MCKENNEY_LACAN_SCORE_%s.csv" % name)
    with open(path, encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def tally(rows):
    """Return (turns, words, lines) counters over named speakers, STAGE dropped.

    A turn is a maximal run of consecutive rows carrying the same SPEAKER, which
    is the nearest thing to a turn the material allows.
    """
    turns, words, lines = collections.Counter(), collections.Counter(), collections.Counter()
    previous = None
    for row in rows:
        speaker = (row.get("SPEAKER") or "").strip()
        if not speaker or speaker == NON_SPEAKER:
            previous = None
            continue
        text = row.get("TEXT") or ""
        lines[speaker] += 1
        words[speaker] += len(text.split())
        if speaker != previous:
            turns[speaker] += 1
        previous = speaker
    return turns, words, lines


def share(counter, keys):
    total = sum(counter.values())
    return sum(counter[k] for k in keys) / total if total else 0.0


def report(name, rows, works=None):
    turns, words, lines = tally(rows)
    order_t = [k for k, _ in turns.most_common()]
    order_w = [k for k, _ in words.most_common()]
    rank_t = {k: i for i, k in enumerate(order_t)}
    rank_w = {k: i for i, k in enumerate(order_w)}
    n_t, n_w = sum(turns.values()), sum(words.values())

    substantial = set(k for k in turns if turns[k] / n_t >= 0.01)
    substantial |= set(k for k in words if words[k] / n_w >= 0.01)
    moved = sorted(
        (k for k in substantial if rank_t[k] != rank_w[k]), key=lambda k: rank_t[k]
    )

    top2_t, top2_w = share(turns, order_t[:2]), share(words, order_w[:2])
    label = "" if works is None else "   ANTHOLOGY of %d works, NOT a coverage figure" % works
    print("  %-16s speakers %3d   turns %5d   words %6d%s"
          % (name, len(turns), n_t, n_w, label))
    print("      by turns  top two: %-28s %5.1f%%" % (", ".join(order_t[:2]), 100 * top2_t))
    print("      by words  top two: %-28s %5.1f%%" % (", ".join(order_w[:2]), 100 * top2_w))
    print("      top speaker same under both units: %s" % (order_t[0] == order_w[0]))
    print("      top TWO SET same under both units: %s" % (set(order_t[:2]) == set(order_w[:2])))
    print("      speakers at 1%% or more by either unit: %d;  changing rank between units: %d"
          % (len(substantial), len(moved)))
    for k in moved[:6]:
        print("         %-20s rank %2d by turns  ->  rank %2d by words"
              % (k, rank_t[k] + 1, rank_w[k] + 1))
    print("      coverage spread between the two units: %.1f points"
          % abs(100 * top2_t - 100 * top2_w))
    return {
        "top_same": order_t[0] == order_w[0],
        "set_same": set(order_t[:2]) == set(order_w[:2]),
        "moved": len(moved),
        "substantial": len(substantial),
        "top2_t": top2_t,
        "top2_w": top2_w,
    }


def main():
    scores = resolve_scores()
    print("=" * 78)
    print("FLOOR SHARE UNDER TWO UNITS.  Seconds is not computable on this material.")
    print("=" * 78)
    print("  Read from %s" % scores)
    print("  Excluded outright: %s (design section 4.1 refuses it)." % ", ".join(REFUSED))
    print("  The non-speaker token %s is dropped wherever it appears." % NON_SPEAKER)
    print()
    print("  BLOCK ONE, THE THREE SINGLE PLAYS. These are the headline.")
    results = {}
    for name in SINGLE_PLAYS:
        results[name] = report(name, read_file(scores, name))
        print()

    print("  BLOCK TWO, THE THREE ANTHOLOGIES, printed and labelled, not headlined.")
    for name, works in ANTHOLOGIES:
        report(name, read_file(scores, name), works=works)
        print()

    # Assertions, so that a change of corpus fails this script and not the paper.
    assert results["HAMLET"]["set_same"] is False, \
        "MPN-S6 section 3 states that HAMLET's second principal voice changes with the unit"
    assert all(results[p]["top_same"] for p in SINGLE_PLAYS), \
        "MPN-S6 section 3 states that the single top speaker does NOT change on these three"
    assert results["MACBETH"]["moved"] >= 10, \
        "MPN-S6 section 3 states that most of MACBETH's substantial speakers change rank"

    print("=" * 78)
    print("WHAT THIS ESTABLISHES, AND WHAT IT DOES NOT")
    print("=" * 78)
    print("""
  ESTABLISHED. The two computable units disagree, and on one of the three
  single plays they disagree about WHICH SPEAKER IS SECOND, which is the pair a
  two-stave reduction renders. They also disagree about how much of the work
  that pair covers, by 6.4 to 12.8 points across the three. So D30's premise
  holds on this material for everything below the single busiest voice.

  NOT ESTABLISHED, and it is the half a reader will assume. On these three the
  SINGLE BUSIEST SPEAKER IS THE SAME UNDER BOTH UNITS. The disagreement is
  about the order below the top, not about who dominated. A design sentence
  saying the units disagree about who dominated a conversation is stronger than
  what this material shows, and MPN-S6 section 3 states the narrower claim.

  AND THE MISSING UNIT IS THE ONE THAT WOULD MOVE MOST. Seconds is unavailable
  here because scripts have no timings, and a speaker with few long turns and a
  speaker with many short ones are exactly the pair that seconds separates from
  turns. Every number above is a lower bound for that reason.
""")


if __name__ == "__main__":
    main()
