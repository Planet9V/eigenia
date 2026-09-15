#!/usr/bin/env python3
"""
WITHDRAWN, 13 September 2026. Do not cite the output of this script.

It compares the frame library against the seven score files by aligning both on
normalised position. They do not share that index. The frame library's position
is a position within a play; the engine's is a position within a whole file,
and s4_score_provenance.py establishes that three of the seven files are
Gutenberg anthologies in which the named work occupies between a fifth and a
third of the rows, while a fourth contains no dialogue at all. A correlation
between two differently indexed curves is not a measurement of agreement.

S4 revision 1 drew a table from this script and concluded from it that the
frame library is the better instrument. S4 revision 2 withdraws both the table
and the conclusion, in section 4.5, and gives a second reason: the contrast the
table was drawn to show does not exist, because the frame library's trauma and
entropy are the author's own literals and its register triples are a keyword
count over his prose, so there is no rater to set against a machine. See
s4_frame_provenance.py.

The file is kept rather than deleted so that the withdrawal has something to
point at. Correcting it means re-scoring from single-work texts, which is item
S4-3 of the S4 work queue, not editing this script.
"""
import csv
import importlib.util
import math
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
SCORES = os.environ.get(
    'MPN_SCORES',
    os.path.expanduser('~/mnt/eigenia/papers-pre-publish/MPN/05_DATA/01_scores'))

# --- the hand annotations, through the one correct reader ------------------
spec = importlib.util.spec_from_file_location(
    's3_frames', os.path.join(HERE, 's3_frames.py'))
if spec is None or not os.path.exists(os.path.join(HERE, 's3_frames.py')):
    sys.exit('s3_frames.py must sit beside this script; it is the only '
             'sanctioned reader of the frame library')
FR = importlib.util.module_from_spec(spec)
spec.loader.exec_module(FR)

SRC = os.path.join(ROOT, 'src/components/mpn-lab')


def hand_by_play():
    """Frames grouped by the play they belong to, in file order."""
    out, cur = {}, None
    for fn in ('literary_data.ts', 'additional_plays.ts'):
        text = open(os.path.join(SRC, fn), encoding='utf-8').read()
        for m in re.finditer(r"id: '([a-z_]+)'|trauma:\s*([\d.]+), entropy:\s*([\d.]+)",
                             text):
            if m.group(1):
                cur = m.group(1)
                out.setdefault(cur, [])
            elif cur is not None:
                out[cur].append((float(m.group(2)), float(m.group(3))))
    return {k: v for k, v in out.items() if v}


HAND = hand_by_play()
MAP = {'dolls_house': 'A_DOLLS_HOUSE', 'hamlet': 'HAMLET',
       'king_lear': 'KING_LEAR', 'macbeth': 'MACBETH',
       'miss_julie': 'MISS_JULIE', 'oedipus': 'OEDIPUS_REX'}

print('=' * 74)
print('1. THE TWO CORPORA')
print('=' * 74)
scored = sorted(f.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', '')
                for f in os.listdir(SCORES)
                if f.startswith('MCKENNEY_LACAN_SCORE_'))
print(f'  hand annotated, {len(HAND)} works: {", ".join(sorted(HAND))}')
print(f'  machine scored,  {len(scored)} works: {", ".join(scored)}')
print(f'  in both, {len(MAP)}: {", ".join(sorted(MAP))}')
only_hand = sorted(set(HAND) - set(MAP))
only_score = sorted(s for s in scored if s not in MAP.values())
print(f'  annotated but not scored: {", ".join(only_hand)}')
print(f'  scored but not annotated: {", ".join(only_score)}')
print()
print(f'  frames in the hand library: {sum(len(v) for v in HAND.values()):,}')


def load_scored(name):
    with open(os.path.join(SCORES, f'MCKENNEY_LACAN_SCORE_{name}.csv'),
              encoding='utf-8', newline='') as fh:
        return list(csv.DictReader(fh))


def corr(xs, ys):
    n = len(xs)
    if n < 3:
        return float('nan')
    mx, my = sum(xs) / n, sum(ys) / n
    sxy = sum((a - mx) * (b - my) for a, b in zip(xs, ys))
    sxx = sum((a - mx) ** 2 for a in xs)
    syy = sum((b - my) ** 2 for b in ys)
    return sxy / math.sqrt(sxx * syy) if sxx and syy else float('nan')


def resample(pairs, k=20):
    """Mean value in each of k equal bins of normalised position."""
    n = len(pairs)
    bins = [[] for _ in range(k)]
    for i, v in enumerate(pairs):
        bins[min(k - 1, int(k * i / n))].append(v)
    return [sum(b) / len(b) if b else None for b in bins]


print()
print('=' * 74)
print('2. TRAUMA AGAINST NARRATIVE POSITION, BOTH READINGS')
print('=' * 74)
print(f'  {"work":14s} {"frames":>7s} {"beats":>7s} '
      f'{"hand r":>8s} {"engine r":>9s} {"curves r":>9s}')
rows = []
for key, name in sorted(MAP.items()):
    h = HAND[key]
    s = load_scored(name)
    hp = [i / len(h) for i in range(len(h))]
    ht = [t for t, _ in h]
    sp = [i / len(s) for i in range(len(s))]
    st = [float(r['TRAUMA_R']) for r in s]
    hb = resample(ht)
    sb = resample(st)
    both = [(a, b) for a, b in zip(hb, sb) if a is not None and b is not None]
    rows.append((key, len(h), len(s), corr(ht, hp), corr(st, sp),
                 corr([a for a, _ in both], [b for _, b in both])))
    print(f'  {key:14s} {len(h):7d} {len(s):7,d} '
          f'{rows[-1][3]:+8.4f} {rows[-1][4]:+9.4f} {rows[-1][5]:+9.4f}')
mh = sum(r[3] for r in rows) / len(rows)
me = sum(r[4] for r in rows) / len(rows)
mc = sum(r[5] for r in rows) / len(rows)
print(f'  {"mean":14s} {"":7s} {"":7s} {mh:+8.4f} {me:+9.4f} {mc:+9.4f}')
print()
print('  "hand r" is the correlation between the author\'s trauma and position.')
print('  "engine r" is the same for the engine. "curves r" compares the two')
print('  readings to each other after resampling both onto twenty equal bins')
print('  of the play.')

print()
print('=' * 74)
print('3. WHAT THE THREE COLUMNS SAY')
print('=' * 74)
print(f'  The engine is a ramp by construction and its column shows it: '
      f'{me:+.4f}.')
print(f'  The author\'s annotation is not: {mh:+.4f} on average, and it varies')
print('  widely between works, which is what a reading of a play looks like')
print('  rather than a clock.')
print()
print(f'  The two readings agree with each other at {mc:+.4f} on the resampled')
print('  curves. Whether that is agreement is a judgement, and the figure is')
print('  printed rather than characterised. What can be said without judgement')
print('  is that the engine\'s reading is almost entirely predicted by position')
print('  and the author\'s is not, so where they agree it is because plays tend')
print('  to darken, and where they disagree the engine cannot be right for a')
print('  reason that has anything to do with the text.')

print()
print('=' * 74)
print('4. ENTROPY, THE SAME COMPARISON')
print('=' * 74)
print(f'  {"work":14s} {"hand sd":>8s} {"engine sd":>10s} '
      f'{"hand floor":>11s} {"engine floor":>13s}')
for key, name in sorted(MAP.items()):
    h = HAND[key]
    s = load_scored(name)
    he = [e for _, e in h]
    se = [float(r['ENTROPY_H']) for r in s]

    def sd(v):
        m = sum(v) / len(v)
        return (sum((x - m) ** 2 for x in v) / len(v)) ** 0.5
    hf = sum(1 for x in he if x == min(he)) / len(he)
    sf = sum(1 for x in se if x == 0.3) / len(se)
    print(f'  {key:14s} {sd(he):8.4f} {sd(se):10.4f} '
          f'{100*hf:10.1f}% {100*sf:12.1f}%')
print()
print('  "floor" is the share of frames or beats sitting at the lowest value')
print('  the reading takes. The engine parks most lines at its floor of 0.3,')
print('  because a line with no question mark, exclamation mark, dash or')
print('  ellipsis scores the base rate and most lines have none of those.')
