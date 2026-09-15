#!/usr/bin/env python3
"""
The dynamics law, and what its unequal bands cost in resolution.

Reads the eight-marking discretisation out of the shipped Python module
rather than transcribing it, checks the linear velocity law against the same
module, and computes exactly how often a given step in trauma changes the
marking, band by band.
"""
import os
import re
import sys

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
MOD = os.path.join(ROOT, 'ml/psychoscore_v2/models/mckenney_lacan_calculus.py')
src = open(MOD, encoding='utf-8').read()

body = src[src.index('def trauma_to_dynamic'):]
body = body[:body.index('\n\n\n')]
pairs = re.findall(r"tau < ([\d.]+):\s*\n\s*return '(\w+)'", body)
last = re.findall(r"else:\s*\n\s*return '(\w+)'", body)
assert pairs and last, 'trauma_to_dynamic no longer has the shape this script parses'
cuts = [float(c) for c, _ in pairs]
marks = [m for _, m in pairs] + [last[0]]

vmin, vmax = re.search(r'v_min, v_max = (\d+), (\d+)', src).groups()
vmin, vmax = int(vmin), int(vmax)

print('=' * 74)
print('1. THE LAW, READ FROM THE SHIPPED MODULE')
print('=' * 74)
print(f'  velocity v(tau) = {vmin} + {vmax - vmin} tau,  floored to an integer')
print(f'  markings: {", ".join(marks)}   ({len(marks)} of them)')
print(f'  cuts:     {", ".join(f"{c:.2f}" for c in cuts)}')
assert len(marks) == 8, marks

print()
print('=' * 74)
print('2. THE BANDS ARE UNEQUAL, AND BY EXACTLY HOW MUCH')
print('=' * 74)
edges = [0.0] + cuts + [1.0]
bands = []
for k, m in enumerate(marks):
    lo, hi = edges[k], edges[k + 1]
    bands.append((m, lo, hi, hi - lo))
print(f'  {"mark":5s} {"from":>5s} {"to":>5s} {"width":>7s}  '
      f'{"velocity interval":>18s}  {"P(step 0.05 crosses)":>21s}')
for m, lo, hi, w in bands:
    vlo = int(vmin + lo * (vmax - vmin))
    vhi = int(vmin + hi * (vmax - vmin)) - (0 if hi == 1.0 else 1)
    p = min(1.0, 0.05 / w) if hi < 1.0 else 0.0
    cell = f'{p:.4f}' + ('' if hi < 1.0 else ' (terminal band)')
    print(f'  {m:5s} {lo:5.2f} {hi:5.2f} {w:7.2f}  {vlo:8d} to {vhi:6d}  '
          f'{cell:>21s}')

widths = sorted({round(w, 10) for _, _, _, w in bands})
print()
print(f'  Distinct widths: {widths}. The four bands at the extremes are '
      f'{widths[0]:.2f} wide,')
print(f'  the four in the middle {widths[1]:.2f}. The ratio is '
      f'{widths[1]/widths[0]:.1f} to 1, so the instrument resolves trauma half')
print('  again as finely at the ends of the range as it does in the middle.')

print()
print('=' * 74)
print('3. CHECK: THE CROSSING PROBABILITIES, BY DIRECT ENUMERATION')
print('=' * 74)
print('  For a character placed uniformly at random inside a band, how often')
print('  does adding 0.05 to trauma change the marking? Closed form is')
print('  min(1, 0.05 / width) for every band but the topmost, which a step')
print('  up cannot leave. Enumerated on a fine grid:')

def mark(t):
    for c, m in zip(cuts, marks):
        if t < c:
            return m
    return marks[-1]

STEP = 0.05
N = 200_000
for m, lo, hi, w in bands:
    hits = tot = 0
    for k in range(N):
        t = lo + (hi - lo) * (k + 0.5) / N
        if t + STEP > 1.0:
            continue                 # clipped at the ceiling; not a crossing
        tot += 1
        if mark(t + STEP) != m:
            hits += 1
    if tot == 0:
        print(f'  {m:5s} entire band is within {STEP} of the ceiling')
        continue
    # the top band has nothing above it: a step up cannot leave it
    closed = min(1.0, STEP / w) if hi < 1.0 else 0.0
    emp = hits / tot
    flag = 'ok' if abs(emp - closed) < 2e-3 else 'MISMATCH'
    print(f'  {m:5s} enumerated {emp:.4f}   closed form {closed:.4f}   {flag}')

print()
print('=' * 74)
print('4. MONOTONICITY')
print('=' * 74)
prev = None
mono = True
for k in range(100_001):
    t = k / 100_000
    cur = marks.index(mark(t))
    if prev is not None and cur < prev:
        mono = False
    prev = cur
print(f'  The marking is non-decreasing in trauma over [0,1]: {mono}')
print('  Trauma ratchets, so the marking of a character cannot fall.')


# ===========================================================================
# 5. THE OTHER IMPLEMENTATION, WHICH IS THE ONE A SCORE PASSES THROUGH
# ===========================================================================
import re as _re
ROOT2 = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
DATA = open(os.path.join(ROOT2, 'src/components/mpn-lab/mpn_reference_data.ts'),
            encoding='utf-8').read()
LOOKUP = open(os.path.join(ROOT2, 'src/components/mpn-lab/mpn_reference_lookup.ts'),
              encoding='utf-8').read()

print()
print('=' * 74)
print('5. THE TYPESCRIPT PATH, WHICH IS THE ONE A SCORE PASSES THROUGH')
print('=' * 74)
rows = []
for b in _re.split(r"\n    \{\n", DATA):
    if "subcategory: 'volume_level'" not in b:
        continue
    if 'PsychometricDimension.TRAUMA' not in b:
        continue
    rows.append((_re.search(r"id: '([^']+)'", b).group(1),
                 _re.search(r"musicalElement: '([^']*)'", b).group(1),
                 _re.search(r"condition: '([^']*)'", b).group(1),
                 float(_re.search(r'defaultValue: ([\d.]+)', b).group(1))))
print('  lookupDynamics matches the trauma-conditioned volume_level entries:')
for i, e, c, d in rows:
    print(f'    {i:14s} {e:22s} condition {c:10s} velocity {d:.0f}  '
          f'label {e.split(" ")[0]!r}')

fb = _re.search(r"return \{ velocity: (\d+), label: '(\w+)' \};", LOOKUP)
fv, fl = int(fb.group(1)), fb.group(2)
print(f'  and on no match returns the literal fallback velocity {fv}, '
      f'label {fl!r}.')

def check(cond, v):
    if '-' in cond:
        lo, hi = [float(x) for x in cond.split('-')]
        return lo <= v <= hi
    if '>' in cond:
        return v > float(cond.replace('>', ''))
    if '<' in cond:
        return v < float(cond.replace('<', ''))
    return False

print()
print('  The composed function over trauma:')
runs = []
for k in range(1001):
    t = k / 1000
    hit = next(((i, e, c, d) for i, e, c, d in rows if check(c, t)), None)
    out = (hit[1].split(' ')[0], hit[3]) if hit else (fl, float(fv))
    tag = bool(hit)
    if runs and runs[-1][0] == out and runs[-1][3] == tag:
        runs[-1][2] = t
    else:
        runs.append([out, t, t, tag])
for (lab, vel), lo, hi, matched in runs:
    note = '' if matched else '   <-- NO ENTRY MATCHES; fallback'
    print(f'    tau {lo:.3f} to {hi:.3f}   {lab:8s} velocity {vel:5.0f}{note}')
labels = {r[0][0] for r in runs}
print()
print(f'  distinct labels emitted: {len(labels)} {sorted(labels)}')
print(f'  distinct velocities emitted: '
      f'{sorted({r[0][1] for r in runs})}')
print()
print('  So the path a score takes emits three labels, not eight, at three')
print('  constant velocities, not v = 20 + 107 tau; the two intervals that')
print('  match no entry return the same mf as the band that does. Decision 6')
print('  makes the eight-marking linear form normative and only the Python')
print('  module implements it.')
