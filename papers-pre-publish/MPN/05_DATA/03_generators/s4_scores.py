#!/usr/bin/env python3
"""
What the 31,078 beats actually contain.

The programme cites "31,078 scored beats" across seven plays as its principal
empirical artefact. This script opens them and reports what is in them, column
by column, rather than taking the description on trust. It checks the three
derived columns against the formulas the corpus states for them, and it reports
which of the nine state components and which of the six musical parameters
appear at all.

Set MPN_SCORES to the directory holding the CSVs. Nothing here needs the
application source.
"""
import collections
import csv
import math
import os
import re
import sys

SCORES = os.environ.get(
    'MPN_SCORES',
    os.path.expanduser('~/mnt/eigenia/papers-pre-publish/MPN/05_DATA/01_scores'))

PLAYS = sorted(f for f in os.listdir(SCORES)
               if f.startswith('MCKENNEY_LACAN_SCORE_') and f.endswith('.csv'))
if not PLAYS:
    sys.exit(f'no MCKENNEY_LACAN_SCORE_*.csv under {SCORES}; set MPN_SCORES')


def load(fn):
    with open(os.path.join(SCORES, fn), encoding='utf-8', newline='') as fh:
        return list(csv.DictReader(fh))


ALL = {}
for fn in PLAYS:
    ALL[fn] = load(fn)

print('=' * 74)
print('1. THE SEVEN SCORES')
print('=' * 74)
total = 0
for fn in PLAYS:
    n = len(ALL[fn])
    total += n
    print(f'  {fn.replace("MCKENNEY_LACAN_SCORE_", "").replace(".csv", ""):16s} '
          f'{n:6,d} rows')
print(f'  {"TOTAL":16s} {total:6,d} rows')
headers = {tuple(ALL[fn][0].keys()) for fn in PLAYS}
print(f'  distinct headers across the seven: {len(headers)}')
cols = list(headers.pop())
print(f'  columns ({len(cols)}):')
for c in cols:
    print(f'    {c}')

print()
print('=' * 74)
print('2. WHAT IS AND IS NOT IN A BEAT')
print('=' * 74)
STATE = [('trauma', ['TRAUMA']), ('entropy', ['ENTROPY']),
         ('register: Real', ['REAL', 'RSI']), ('register: Symbolic', ['SYMBOLIC']),
         ('register: Imaginary', ['IMAGINARY']),
         ('DISC: D', ['DOMINANCE', 'DISC']), ('DISC: I', ['INFLUENCE']),
         ('DISC: S', ['STEADINESS']), ('DISC: C', ['CONSCIENTIOUS'])]
PARAM = [('dynamics', ['DYNAMIC', 'VELOCITY', 'MARKING']),
         ('tempo', ['TEMPO', 'BPM']), ('metre', ['METRE', 'METER', 'TIME_SIG']),
         ('mode', ['MODE', 'SCALE']),
         ('fragmentation', ['FRAGMENT']),
         ('orchestration density', ['DENSITY', 'ORCHESTRATION']),
         ('harmonic position', ['NEO_RIEMANNIAN', 'CHORD', 'TRIAD']),
         ('timbre or instrument', ['TIMBRE', 'INSTRUMENT'])]
up = [c.upper() for c in cols]


def present(keys):
    return [c for c in cols if any(k in c.upper() for k in keys)]


print("  S1's nine state components:")
for label, keys in STATE:
    hit = present(keys)
    print(f'    {label:22s} {"present as " + ", ".join(hit) if hit else "ABSENT"}')
print()
print("  S3's musical parameters:")
for label, keys in PARAM:
    hit = present(keys)
    print(f'    {label:22s} {"present as " + ", ".join(hit) if hit else "ABSENT"}')
print()
extra = [c for c in cols if not any(
    any(k in c.upper() for k in keys) for _, keys in STATE + PARAM)]
print(f'  columns matching neither list: {extra}')

print()
print('=' * 74)
print('3. THE DISTRIBUTIONS')
print('=' * 74)


def nums(col):
    out = []
    for fn in PLAYS:
        for r in ALL[fn]:
            v = (r.get(col) or '').strip()
            try:
                out.append(float(v))
            except ValueError:
                pass
    return out


for col in cols:
    vals = nums(col)
    if len(vals) > total * 0.5:
        d = sorted(set(vals))
        mean = sum(vals) / len(vals)
        sd = (sum((v - mean) ** 2 for v in vals) / len(vals)) ** 0.5
        print(f'  {col:24s} numeric, {len(d):4d} distinct, '
              f'min {min(vals):.3f} max {max(vals):.3f} mean {mean:.4f} '
              f'sd {sd:.4f}')
        if len(d) <= 12:
            print(f'{"":26s}values {d}')
    else:
        c = collections.Counter(
            (r.get(col) or '').strip() for fn in PLAYS for r in ALL[fn])
        print(f'  {col:24s} categorical, {len(c):5d} distinct')
        if len(c) <= 14:
            for k, v in c.most_common():
                print(f'{"":26s}{k!r:24s} {v:6,d}  {100*v/total:5.1f}%')
        else:
            for k, v in c.most_common(6):
                print(f'{"":26s}{k!r:24s} {v:6,d}  {100*v/total:5.1f}%')
            print(f'{"":26s}... and {len(c)-6:,} more')
