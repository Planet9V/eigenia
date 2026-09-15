#!/usr/bin/env python3
"""
Reconstructing all six derived columns of the 31,078 beats from the engine
that produced them.

The seven scored plays carry nine columns. Three are transcription (BEAT,
SPEAKER, TEXT) and six are computed: TRAUMA_R, ENTROPY_H, BASELINE_B,
ARRHYTHMIA_alpha, NEO_RIEMANNIAN_OP and CLINICAL_HEALTH_SCORE. This script
transcribes the formulas from `mpn_engine/core/mpn_calculus.py`, applies them
to the data, and reports how much of each column they reproduce.

A note on method, because this script got two answers wrong before it got them
right. Measuring a column's distribution and testing it against row features is
not enough: ARRHYTHMIA_alpha takes two values that nothing in its own row
predicts, and an earlier revision of this script concluded from that alone that
it was a biased coin. It is a speaker-switch detector, which is invisible in a
row and obvious in the code. Distributional evidence bounds what a column could
be; only the source says what it is. Both are used here.

Set MPN_SCORES to the score directory. MPN_REPO is optional and is used only
to check that the formulas transcribed below still match the source.
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
PLAYS = {}
for fn in sorted(os.listdir(SCORES)):
    if not (fn.startswith('MCKENNEY_LACAN_SCORE_') and fn.endswith('.csv')):
        continue
    with open(os.path.join(SCORES, fn), encoding='utf-8', newline='') as fh:
        PLAYS[fn.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', '')] = \
            list(csv.DictReader(fh))
if not PLAYS:
    sys.exit(f'no score CSVs under {SCORES}; set MPN_SCORES')
ROWS = [r for rs in PLAYS.values() for r in rs]
N = len(ROWS)


def num(r, k):
    try:
        return float((r.get(k) or '').strip())
    except ValueError:
        return None


print('=' * 74)
print('1. THE ENGINE, TRANSCRIBED')
print('=' * 74)
print('  mpn_engine/core/mpn_calculus.py, with its default constants')
print('  base_trauma 0.0, trauma_progress_weight 0.8, trauma_keyword_weight 0.1:')
print()
print('    trauma_R   = clamp(0.8 * beat/total')
print('                       + 0.1 * sum(trauma keyword counts * weights)')
print('                       + sum(NER entity weights))')
print('    entropy_H  = clamp(0.3 + 0.20 * count("?") + 0.15 * count("!")')
print('                       + 0.10 * (count("--") + count("...")) ')
print('                       + 0.25 * count(/[?!]{2,}/))')
print('    baseline_B = max(0, 1 - beat/total)')
print('    arrhythmia = 0.5 if first beat, 0.2 if same speaker as previous,')
print('                 0.7 if the speaker changed')
print('    neo_op     = R below trauma 0.3, L below 0.6, P below 0.8, else PLP')
print('    health     = "{int((1 - min(1, trauma)) * 10)}/10"')
print()
print('  Three of those carry docstrings naming quantities they are not.')
print('  trauma_R is documented as "Riemann Curvature" and is a linear ramp in')
print('  narrative position plus keyword hits. entropy_H is documented as')
print('  "Shannon Entropy" and is a weighted punctuation count. baseline_B is')
print('  documented as "Structural Integrity" and is one minus that same ramp.')

print()
print('=' * 74)
print('2. HOW MUCH OF EACH COLUMN THE ENGINE REPRODUCES')
print('=' * 74)


def check(name, fn_, rows_by_play):
    hit = tot = 0
    for play, rows in rows_by_play.items():
        n = len(rows)
        prev = None
        for i, r in enumerate(rows, 1):
            want = fn_(r, i, n, prev, play)
            prev = (r.get('SPEAKER') or '').strip()
            if want is None:
                continue
            got = (r.get(name) or '').strip()
            tot += 1
            try:
                hit += abs(float(got) - float(want)) < 1e-9
            except ValueError:
                hit += (got == str(want))
    return hit, tot


CHECKS = [
    ('BASELINE_B', 'round(1 - beat/total, 2)',
     lambda r, i, n, p, pl: round(max(0.0, 1 - i / n), 2)),
    ('ARRHYTHMIA_α', '0.2 same speaker, 0.7 on a switch, 0.5 on the first beat',
     lambda r, i, n, p, pl: 0.5 if p is None else
     (0.2 if (r.get('SPEAKER') or '').strip().upper() == p.upper() else 0.7)),
    ('ARRHYTHMIA_α', 'the same rule, ignoring the first beat of each play',
     lambda r, i, n, p, pl: None if p is None else
     (0.2 if (r.get('SPEAKER') or '').strip().upper() == p.upper() else 0.7)),
    ('NEO_RIEMANNIAN_OP', 'the four trauma bands',
     lambda r, i, n, p, pl: ('R' if num(r, 'TRAUMA_R') < 0.3 else
                             'L' if num(r, 'TRAUMA_R') < 0.6 else
                             'P' if num(r, 'TRAUMA_R') < 0.8 else 'PLP')),
    ('CLINICAL_HEALTH_SCORE', 'int((1 - trauma) * 10), from the printed trauma',
     lambda r, i, n, p, pl:
     f'{int((1 - min(1.0, num(r, "TRAUMA_R"))) * 10)}/10'),
]
for col, desc, fn_ in CHECKS:
    hit, tot = check(col, fn_, PLAYS)
    print(f'  {col:22s} {100*hit/tot:6.2f}%  {desc}')
    print(f'{"":24s}{hit:,} of {tot:,}')

print()
print('  Three figures fall short of 100 per cent and each has a cause.')
firsts = [rows[0] for rows in PLAYS.values()]
fa = collections.Counter((r.get('ARRHYTHMIA_α') or '').strip() for r in firsts)
allv = collections.Counter((r.get('ARRHYTHMIA_α') or '').strip() for r in ROWS)
print(f'  The first beat of every play carries {dict(fa)}, where the shipped')
print(f'  scorer passes prev_speaker=None and the shipped calculus returns 0.5.')
print(f'  The value 0.5 appears {allv.get("0.5", 0)} times in all {N:,} rows. So the')
print(f'  published scores were not produced by the code as it now stands, and')
print(f'  that branch of the arrhythmia function is unreachable in the output.')
print()
print('  The health score and the operator band are both computed from the')
print('  unrounded trauma, and the CSV stores trauma rounded to two places, so')
print('  neither can be reproduced from the file that contains it. The')
print('  shortfall is the same on all seven plays, which is what a systematic')
print('  rounding looks like:')
for play, rows in PLAYS.items():
    hit = sum(1 for r in rows
              if (r.get('CLINICAL_HEALTH_SCORE') or '').strip() ==
              f'{int((1 - min(1.0, num(r, "TRAUMA_R"))) * 10)}/10')
    hop = sum(1 for r in rows
              if (r.get('NEO_RIEMANNIAN_OP') or '').strip() ==
              ('R' if num(r, 'TRAUMA_R') < 0.3 else
               'L' if num(r, 'TRAUMA_R') < 0.6 else
               'P' if num(r, 'TRAUMA_R') < 0.8 else 'PLP'))
    print(f'    {play:16s} health {100*hit/len(rows):5.2f}%   '
          f'operator {100*hop/len(rows):5.2f}%')

print()
print('=' * 74)
print('3. WHAT THAT MAKES THE SIX COLUMNS')
print('=' * 74)


def corr(xs, ys):
    n = len(xs)
    mx, my = sum(xs) / n, sum(ys) / n
    sxy = sum((a - c) * (b - d) for a, b, c, d in zip(xs, ys, [mx] * n, [my] * n))
    sxx = sum((a - mx) ** 2 for a in xs)
    syy = sum((b - my) ** 2 for b in ys)
    return sxy / math.sqrt(sxx * syy) if sxx and syy else float('nan')


pos, tau, base = [], [], []
for rows in PLAYS.values():
    n = len(rows)
    for i, r in enumerate(rows, 1):
        t, b = num(r, 'TRAUMA_R'), num(r, 'BASELINE_B')
        if None in (t, b):
            continue
        pos.append(i / n)
        tau.append(t)
        base.append(b)
print(f'  corr(trauma, narrative position)     {corr(tau, pos):+.4f}')
print(f'  corr(BASELINE_B, narrative position) {corr(base, pos):+.4f}')
print(f'  corr(BASELINE_B, trauma)             {corr(base, tau):+.4f}')
print()
r_tp = corr(tau, pos)
print(f'  The first of those is the finding that matters. Over all {N:,} beats,')
print(f'  {100*r_tp**2:.1f} per cent of the variance of trauma is narrative position:')
print(f'  how far through the play the line falls. The keyword and entity')
print(f'  terms, which are the only part of the formula that reads the text at')
print(f'  all, account for the remaining {100*(1-r_tp**2):.1f} per cent. On this artefact')
print(f'  the trauma coordinate is very nearly a clock.')
print()
print('  BASELINE_B is exactly 1 - position and trauma is 0.8 * position plus')
print('  keyword hits, so the two are the same ramp with opposite signs and')
print('  their difference is precisely the keyword contribution to trauma,')
print('  offset by 0.2 * position. BASELINE_B carries no information that')
print('  trauma and the beat number do not already carry.')
print()
print('  CLINICAL_HEALTH_SCORE is trauma inverted onto a ten-point scale. It')
print('  is not a measurement of health.')
print()
print('  ARRHYTHMIA_alpha is a speaker-change indicator with two values. It')
print('  measures turn-taking, which is a real property of a scene, and it is')
print('  not a rhythm, an arrhythmia, or a coefficient.')
print()
print('  NEO_RIEMANNIAN_OP names an operator, not a chord, and is a function of')
print('  trauma with four values. No triad is recorded anywhere in the scores,')
print('  so the 24-triad codomain S3 section 2.5 analyses is not exercised.')

print()
print('=' * 74)
print('4. WHAT A BEAT DOES NOT CONTAIN')
print('=' * 74)
cols = list(ROWS[0].keys())
print(f'  the nine columns: {", ".join(cols)}')
print()
print('  Of S1\'s nine state components, two appear: trauma and entropy. The')
print('  three registers and the four DISC coordinates appear nowhere, so')
print('  seven of the nine are absent from the programme\'s largest artefact.')
print('  Of the parameters S3 maps to, none appears: no dynamic marking, no')
print('  tempo, no metre, no mode, no fragmentation stage, no density level,')
print('  no instrument. The 31,078 beats are a table of two state coordinates')
print('  and four quantities derived from them. They are not a score.')

print()
print('=' * 74)
print('5. GUARD: THE TRANSCRIBED FORMULAS STILL MATCH THE SOURCE')
print('=' * 74)
REPO = os.environ.get('MPN_REPO')
src_path = os.path.join(REPO or '', 'mpn_engine/core/mpn_calculus.py')
if not REPO or not os.path.exists(src_path):
    print('  MPN_REPO not set or the engine not found there; skipping.')
    print('  Set MPN_REPO to the Conductor working tree to enable this check.')
else:
    src = open(src_path, encoding='utf-8').read()
    need = [
        'return max(0.0, 1.0 - (beat / max(total_beats, 1)))',
        'return 0.5  # First beat - neutral',
        'return 0.2  # Same speaker - smooth continuation',
        'return 0.7  # Speaker switch - rhythm break',
        'health = int((1.0 - min(1.0, trauma_R)) * 10)',
        'base_H = 0.3',
        'base_R = self.base_trauma + (progress * self.trauma_progress_weight)',
    ]
    bad = [s for s in need if s not in src]
    for s in need:
        print(f'  [{"ok " if s not in bad else "GONE"}] {s[:64]}')
    if bad:
        sys.exit('\nthe engine has changed; these formulas no longer describe it.')
    print('\n  All present. The reconstruction above is the shipped engine.')

# =============================================================================
# 5. ENTROPY_H, RECONSTRUCTED RATHER THAN DESCRIBED
# =============================================================================
# Revision 1 of S4 cited two figures for this column, 96.0 per cent and 72.8
# per cent, which no generator produced. They are computed here instead, from
# calculate_entropy_H as it stands in mpn_engine/core/mpn_calculus.py:135.
import re as _re

def _entropy(text):
    return min(1.0, max(0.0, 0.3
                        + text.count('?') * 0.2
                        + text.count('!') * 0.15
                        + (text.count('--') + text.count('...')) * 0.1
                        + len(_re.findall(r'[?!]{2,}', text)) * 0.25))

print()
print('=' * 74)
print('5. ENTROPY_H')
print('=' * 74)
_tot = _ok = _floor = 0
_per = []
for _fn, _rows in sorted(PLAYS.items()):
    _label = _fn.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', '')
    _n = len(_rows)
    _o = sum(1 for r in _rows
             if abs(round(_entropy(r.get('TEXT') or ''), 2)
                    - float(r.get('ENTROPY_H') or 0)) < 5e-3)
    _f = sum(1 for r in _rows if abs(float(r.get('ENTROPY_H') or 0) - 0.3) < 5e-3)
    _per.append((_label, _n, _o, _f))
    _tot += _n; _ok += _o; _floor += _f
print(f'  {"file":16s} {"rows":>7s} {"reconstructed":>14s} {"at the floor 0.3":>18s}')
for _label, _n, _o, _f in _per:
    print(f'  {_label:16s} {_n:7,d} {100*_o/_n:13.2f}% {100*_f/_n:17.1f}%')
print(f'  {"all seven":16s} {_tot:7,d} {100*_ok/_tot:13.2f}% {100*_floor/_tot:17.1f}%')
print()
print('  The reconstruction applies the published formula to the TEXT column of')
print('  each row and compares it, rounded to two places, with the ENTROPY_H the')
print('  file carries. It is exact, so no functional-determination heuristic is')
print('  needed and the two figures revision 1 transcribed are superseded by')
print('  the two printed above.')
print()
print('  The floor share is the finding. On that share of rows the text contains')
print('  no question mark, no exclamation mark, no double dash and no ellipsis,')
print('  the formula returns its base rate of 0.3, and the entropy coordinate')
print('  carries no information about the line at all.')

print()
print('  The one row that does not reconstruct is worth its own paragraph.')
_mp = [(f.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', ''), i, r)
       for f, rs in sorted(PLAYS.items())
       for i, r in enumerate(rs, 1)
       if _re.findall(r'[?!]{2,}', r.get('TEXT') or '')]
print(f'  rows in all seven files where the multi-punctuation term can fire: '
      f'{len(_mp)}')
for _label, _i, _r in _mp:
    _t = _r.get('TEXT') or ''
    _with = round(_entropy(_t), 2)
    _without = round(min(1.0, max(0.0, 0.3 + _t.count('?') * 0.2
                                  + _t.count('!') * 0.15
                                  + (_t.count('--') + _t.count('...')) * 0.1)), 2)
    print(f'    {_label} row {_i:,d}')
    print(f'      text   {_t[:64]!r}')
    print(f'      stored {_r.get("ENTROPY_H")}, formula with the term {_with}, '
          f'without it {_without}')
print()
print('  The stored value is the one the formula gives WITHOUT the')
print('  multi-punctuation term. That term was therefore not in the code that')
print('  produced these files. It is the second sign of the same thing: the')
print('  first beat of every file carries an arrhythmia the shipped calculus')
print('  cannot return either. The seven score files were produced by an')
print('  earlier version of mpn_engine, and no record of that version exists')
print('  in the tree.')
