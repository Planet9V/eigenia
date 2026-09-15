#!/usr/bin/env python3
"""
Independent recount of the three corpus figures ruling C corrects.

Written 14 September 2026 as a CHECK on `s6_three_clef.py`, not as a
replacement for it. It reads the same seven CSVs and recomputes, from scratch:

  (a) top-two-speaker coverage on the three files that are SINGLE PLAYS,
      which S4 section 3.2 establishes are A Doll's House, Hamlet and Macbeth.
      The other three works-with-a-speaker-set are anthologies holding eight,
      five and three plays and are reported separately and labelled.
  (b) the dynamics, tempo-band and metre change rates with the King Lear file
      EXCLUDED, since S4 section 3.3 records it as a total parse failure with
      3,424 of its 3,425 rows assigned to the non-speaker STAGE. The exclusion
      is verified here rather than assumed.
  (c) the two distributional facts ruling C requires to be printed beside the
      event-density figures: that ENTROPY_H sits on its floor for most of the
      corpus, and that most tempo-band changes have the floor on one side.

The laws are S3's normative ones, restated identically to `s6_three_clef.py`
so that the two can be compared cell for cell. Nothing here is random and
nothing here is read from prose.

Set MPN_SCORES to the score directory. No other input is needed.
"""
import collections
import csv
import os

SCORES = os.environ.get(
    'MPN_SCORES',
    '/mnt/user-data/uploads/eigenia/papers-pre-publish/MPN/05_DATA/01_scores')

PLAYS = {}
for fn in sorted(os.listdir(SCORES)):
    if fn.startswith('MCKENNEY_LACAN_SCORE_') and fn.endswith('.csv'):
        with open(os.path.join(SCORES, fn), encoding='utf-8', newline='') as fh:
            PLAYS[fn[len('MCKENNEY_LACAN_SCORE_'):-4]] = list(csv.DictReader(fh))
if not PLAYS:
    raise SystemExit('no score files; set MPN_SCORES')

# S4 section 3.2: which files hold one work and which hold several.
SINGLE_PLAYS = ('A_DOLLS_HOUSE', 'HAMLET', 'MACBETH')
ANTHOLOGIES = {'CHERRY_ORCHARD': 8, 'MISS_JULIE': 5, 'OEDIPUS_REX': 3}
PARSE_FAILURE = 'KING_LEAR'

TOTAL = sum(len(v) for v in PLAYS.values())


def rule(n=78):
    print('=' * n)


def fv(row, key):
    try:
        return float(row[key])
    except (TypeError, ValueError):
        return None


rule(); print('0. THE CORPUS, NAMED AS S4 SECTION 3.5 REQUIRES'); rule()
print('  Seven score files, not seven plays and not seven thousand beats. The')
print('  word beat is reserved for the engine\'s own column name.')
for p, rows in PLAYS.items():
    kind = ('single play' if p in SINGLE_PLAYS else
            f'anthology, {ANTHOLOGIES[p]} works' if p in ANTHOLOGIES else
            'PARSE FAILURE')
    print(f'  {p:16s} {len(rows):6d} rows   {kind}')
print(f'  {"TOTAL":16s} {TOTAL:6d} rows')
assert set(PLAYS) == set(SINGLE_PLAYS) | set(ANTHOLOGIES) | {PARSE_FAILURE}, \
    'the file set is not the one S4 section 3.2 rules on'

# --- the parse failure, verified rather than assumed -----------------------
kl = PLAYS[PARSE_FAILURE]
kl_sp = collections.Counter((r.get('SPEAKER') or '').strip() for r in kl)
kl_stage = kl_sp.get('STAGE', 0)
print()
print(f'  {PARSE_FAILURE}: {len(kl)} rows, of which {kl_stage} carry the non-speaker')
print(f'  SPEAKER "STAGE". The remaining {len(kl) - kl_stage}: '
      f'{ {k: v for k, v in kl_sp.items() if k != "STAGE"} }')
print('  S4 section 3.3 and design section 4.1 both record this as a total parse')
print('  failure. Verified here, not taken on trust, and it is the ground on')
print('  which section 2 below excludes the file.')

# ---------------------------------------------------------------------------
# 1. Coverage
# ---------------------------------------------------------------------------
rule(); print('1. TOP-TWO COVERAGE, ON THE THREE FILES THAT ARE SINGLE PLAYS'); rule()
print('  Coverage is the share of rows carrying a speaker that is spoken by the')
print('  top two speakers by row count. Denominator: rows with a non-empty')
print('  SPEAKER, which is the convention s6_three_clef.py uses.')
print()


def coverage(rows):
    sp = collections.Counter((r.get('SPEAKER') or '').strip()
                             for r in rows if (r.get('SPEAKER') or '').strip())
    n = sum(sp.values())
    top = sp.most_common(3)
    c1 = top[0][1] / n
    c2 = sum(t[1] for t in top[:2]) / n
    c3 = sum(t[1] for t in top[:3]) / n
    return len(sp), c1, c2, c3, top


print('  file             | speakers | top-1  | TOP-2  | top-3  | kind')
print('  -----------------|----------|--------|--------|--------|------------------')
single = {}
for p in sorted(PLAYS):
    if p == PARSE_FAILURE:
        continue
    k, c1, c2, c3, _ = coverage(PLAYS[p])
    kind = 'SINGLE PLAY' if p in SINGLE_PLAYS else \
           f'anthology, {ANTHOLOGIES[p]} works, {k} speakers across {ANTHOLOGIES[p]} casts'
    if p in SINGLE_PLAYS:
        single[p] = c2
    print(f'  {p:16s} |   {k:4d}   | {c1:5.1%}  | {c2:5.1%}  | {c3:5.1%}  | {kind}')
print()
lo, hi = min(single.values()), max(single.values())
below = [p for p, c in single.items() if c < 0.5]
print(f'  THE FIGURE THE DESIGN MAY CITE: {hi:.1%} to {lo:.1%} over the '
      f'{len(single)} single plays,')
print(f'  with {len(below)} of {len(single)} below half ({", ".join(sorted(below))}).')
print('  Stated to one decimal, as ruling C states them: '
      + ', '.join(f'{single[p]:.1%}' for p in
                  sorted(single, key=lambda q: -single[q])) + '.')
print()
print('  WHAT IS WITHDRAWN AND WHAT REPLACES IT. The published headline was')
print('  "between 8 and 69 per cent" and "on four of the six less than half".')
_ch = coverage(PLAYS['CHERRY_ORCHARD'])
print(f'  The 8 per cent anchor is {_ch[2]:.1%}, the top-two share of a file holding')
print(f'  {ANTHOLOGIES["CHERRY_ORCHARD"]} plays with {ANTHOLOGIES["CHERRY_ORCHARD"]} '
      f'disjoint casts and {_ch[0]} speakers counted as one cast. It')
print('  measures the anthology and not any play, and it is withdrawn as a')
print(f'  coverage figure. It is replaced by the range above, {hi:.1%} to {lo:.1%}.')

# ---------------------------------------------------------------------------
# 2. Event density
# ---------------------------------------------------------------------------
rule(); print('2. EVENT DENSITY, WITH THE PARSE FAILURE EXCLUDED'); rule()
DYN = [(0.10, 'ppp'), (0.20, 'pp'), (0.35, 'p'), (0.50, 'mp'),
       (0.65, 'mf'), (0.80, 'f'), (0.90, 'ff'), (1.01, 'fff')]


def dyn(tau):
    for hi_, lab in DYN:
        if tau < hi_:
            return lab
    return 'fff'


def tempo_band(H):
    return 'slow' if H < 0.4 else ('middle' if H < 0.7 else 'fast')


def metre(H):
    for c, lab in ((0.3, 'm1'), (0.5, 'm2'), (0.6, 'm3'), (0.8, 'm4')):
        if H < c:
            return lab
    return 'm5'


def change_rate(rows, fn, col):
    vals = [fn(fv(r, col)) for r in rows if fv(r, col) is not None]
    ch = sum(1 for i in range(1, len(vals)) if vals[i] != vals[i - 1])
    return ch / (len(vals) - 1), len(set(vals)), len(vals), ch


allrows = [r for rows in PLAYS.values() for r in rows]
kept = [r for p, rows in PLAYS.items() if p != PARSE_FAILURE for r in rows]
print(f'  rows read      {len(allrows)}')
print(f'  rows excluded  {len(allrows) - len(kept)}  ({PARSE_FAILURE}, the parse failure)')
print(f'  rows retained  {len(kept)}')
print()
print('  set              | dynamics        | tempo band      | metre')
print('  -----------------|-----------------|-----------------|-----------------')
for label, rows in (('all seven files', allrows), ('SIX, KL excluded', kept)):
    d = change_rate(rows, dyn, 'TRAUMA_R')
    t = change_rate(rows, tempo_band, 'ENTROPY_H')
    m = change_rate(rows, metre, 'ENTROPY_H')
    print(f'  {label:16s} | {d[0]:6.1%}  {d[1]} levels | {t[0]:6.1%}  {t[1]} levels |'
          f' {m[0]:6.1%}  {m[1]} levels')
d, t, m = (change_rate(kept, dyn, 'TRAUMA_R'),
           change_rate(kept, tempo_band, 'ENTROPY_H'),
           change_rate(kept, metre, 'ENTROPY_H'))
print()
print(f'  THE FIGURES THE DESIGN MAY CITE: {d[0]:.1%}, {t[0]:.1%} and {m[0]:.1%},')
print('  replacing 4.5, 32.2 and 25.7 per cent measured on all seven files.')
print(f'  Full precision: {d[0]:.4%}, {t[0]:.4%}, {m[0]:.4%}.')
print()
print('  METRE REACHES FOUR OF ITS FIVE LABELS (change 16). The five are m1 to')
print('  m5 and the cuts are at 0.3, 0.5, 0.6 and 0.8 in entropy:')
_lab = collections.Counter(metre(fv(r, 'ENTROPY_H')) for r in kept
                           if fv(r, 'ENTROPY_H') is not None)
for lab in ('m1', 'm2', 'm3', 'm4', 'm5'):
    print(f'    {lab}: {_lab.get(lab, 0):6d} rows')
print(f'  m1 is common time and is the ordered end of the scale. It is never')
print('  reached, because no row carries entropy below the floor of 0.3.')
_tb = collections.Counter(tempo_band(fv(r, 'ENTROPY_H')) for r in kept
                          if fv(r, 'ENTROPY_H') is not None)
print(f'  Tempo bands reached: {dict(_tb)} - three bands, so TWO cuts and not three.')

# ---------------------------------------------------------------------------
# 3. Whose distribution this is
# ---------------------------------------------------------------------------
rule(); print('3. WHAT THESE FIGURES ARE FIGURES ABOUT'); rule()
H = [fv(r, 'ENTROPY_H') for r in allrows if fv(r, 'ENTROPY_H') is not None]
cnt = collections.Counter(H)
floor = min(cnt)
print(f'  ENTROPY_H takes {len(cnt)} distinct values over all {len(H)} rows.')
print(f'  It is exactly {floor} on {cnt[floor]} of them, {cnt[floor]/len(H):.1%}.')
seq = [fv(r, 'ENTROPY_H') for r in allrows]
tb = [tempo_band(x) if x is not None else None for x in seq]
idx = [i for i in range(1, len(tb))
       if tb[i] is not None and tb[i - 1] is not None and tb[i] != tb[i - 1]]
onfloor = sum(1 for i in idx if seq[i] == floor or seq[i - 1] == floor)
print(f'  Of the {len(idx)} tempo-band changes, {onfloor} have {floor} on one side, '
      f'{onfloor/len(idx):.1%}.')
print()
print('  S4 section 2 establishes that these columns were produced by')
print('  `mpn_engine`, which implements no psychology on the path that produced')
print('  them: TRAUMA_R is a row-position ramp with keyword bumps and ENTROPY_H')
print('  is a punctuation tally. So all three event-density figures are')
print('  properties of ONE GENERATOR\'S OUTPUT DISTRIBUTION and not of S3\'s')
print('  laws, and they must be reported as such. Ruling C, finding S19.')
print()
print('  DYNAMICS DOES NOT RATCHET ON THIS CORPUS (change 15). S3\'s trauma')
print('  cannot fall; this column can and does:')
falls = rises = raw_falls = steps = 0
_ORDER = [lab for _, lab in DYN]
for p, rows in PLAYS.items():
    if p == PARSE_FAILURE:
        continue
    by = collections.defaultdict(list)
    for r in rows:
        s = (r.get('SPEAKER') or '').strip()
        v = fv(r, 'TRAUMA_R')
        if s and v is not None:
            by[s].append(v)
    for s, vs in by.items():
        for a, b in zip(vs, vs[1:]):
            steps += 1
            ia, ib = _ORDER.index(dyn(a)), _ORDER.index(dyn(b))
            if ib < ia:
                falls += 1
            elif ib > ia:
                rises += 1
            if b < a:
                raw_falls += 1
print(f'    within-speaker steps counted: {steps}')
print(f'    within-speaker steps where the MARKING falls: {falls}, rises: {rises}')
print(f'    within-speaker steps where raw TRAUMA_R falls: {raw_falls}')
print('  S3\'s ratchet is a property of the theory\'s trauma and this column is')
print('  not it, so the design may keep neither the mechanism nor this corpus')
print('  as its evidence. Finding S6.')
