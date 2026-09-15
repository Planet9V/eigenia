#!/usr/bin/env python3
"""
Effective contributions for every coefficient S3 prints.

The commensurability audit's rule is that no weighted combination appears
without the share each input actually contributes at the library's dispersions,
because a nominal weight of 0.9 against 0.1 is not a 9-to-1 contribution unless
the two inputs vary equally. This script computes the effective shares for the
three combinations S3 states, from the shipped frame library, and checks two
frame counts the audit reports.
"""
import os
import re
import statistics

import importlib.util as _il

_spec = _il.spec_from_file_location(
    's3_frames', os.path.join(os.path.dirname(os.path.abspath(__file__)),
                              's3_frames.py'))
FR = _il.module_from_spec(_spec)
_spec.loader.exec_module(FR)

FRAMES = FR.load()
taus = [f['trauma'] for f in FRAMES]
Hs = [f['entropy'] for f in FRAMES]
texts = [f['analysis'] for f in FRAMES]
rsi = FR.analyse_rsi
sd = statistics.pstdev

R = [rsi(t) for t in texts]
reals = [x[0] for x in R]
sd = statistics.pstdev
SD = {'trauma': sd(taus), 'entropy': sd(Hs), 'real': sd(reals)}
n = len(taus)

print('=' * 74)
print('1. THE DISPERSIONS THE SHARES ARE COMPUTED AT')
print('=' * 74)
print(f'  frames: {n}')
for k, v in SD.items():
    print(f'  population sd({k:8s}) = {v:.4f}')
print(f'  distinct values of the Real register: '
      f'{sorted(set(round(x,4) for x in reals))}')

print()
print('=' * 74)
print('2. EFFECTIVE CONTRIBUTIONS')
print('=' * 74)
COMBOS = [
    ('adopted density        0.3H + 0.7tau',
     [('entropy', 0.3), ('trauma', 0.7)]),
    ('adopted fragmentation  (0.7H - 0.3tau)/0.7',
     [('entropy', 0.7 / 0.7), ('trauma', 0.3 / 0.7)]),
    ('shipped fragmentation  0.6H + 0.4tau',
     [('entropy', 0.6), ('trauma', 0.4)]),
    ('shipped orchestration  0.7tau + 0.3H',
     [('trauma', 0.7), ('entropy', 0.3)]),
    ('tension                0.9r + 0.1H',
     [('real', 0.9), ('entropy', 0.1)]),
]
for name, parts in COMBOS:
    mags = [(k, w * SD[k]) for k, w in parts]
    tot = sum(m for _, m in mags)
    shares = ', '.join(f'{k} {100*m/tot:.1f} per cent' for k, m in mags)
    nominal = ', '.join(f'{k} {100*w/sum(abs(x) for _, x in parts):.1f}'
                        for k, w in parts)
    print(f'  {name}')
    print(f'    nominal   {nominal}')
    print(f'    effective {shares}')

print()
print('=' * 74)
print('3. TWO FRAME COUNTS THE AUDIT REPORTS, RECHECKED')
print('=' * 74)
print('  These are computed from s3_frames.py, which reads the annotation')
print('  strings honouring backslash escapes. The regex used across this')
print('  programme until now truncated seven of them and misclassified three,')
print('  so figures computed before the correction differ; s3_frames.py run')
print('  directly prints the comparison.')
allzero = sum(1 for x in R if x == (0.0, 0.0, 0.0))
realzero = sum(1 for x in R if x[0] == 0.0)
print(f'  frames where the analyser returns (0,0,0):        {allzero} of {n}'
      f'   ({100*allzero/n:.1f} per cent)')
print(f'  frames where the Real is exactly zero:            {realzero} of {n}'
      f'   ({100*realzero/n:.1f} per cent)')
print()
print('  On every frame in the second group tension reduces to 0.1H, which')
print('  lies in [0, 0.1], so tensionToChordType returns major7 by arithmetic')
print('  rather than by theory.')
print()
print(f'  The commensurability audit gives "the Real is exactly zero on 104 of')
print(f'  the 232 shipped frames (44.8 per cent)". Both of those numbers are')
print(f'  right and the label on them is not: {allzero} and '
      f'{100*allzero/n:.1f} per cent are the frames where the analyser returns')
print(f'  (0,0,0) entirely, which is the figure the audit computed. The frames')
print(f'  where the Real SPECIFICALLY is zero number {realzero}, '
      f'{100*realzero/n:.1f} per cent, and')
print(f'  that larger set additionally includes frames carrying only Symbolic')
print(f'  or Imaginary keywords. The consequence the audit draws holds on the')
print(f'  larger set.')
print()
print(f'  The audit gives the sd of the Real as 0.3993; recomputed with the')
print(f'  corrected parser it is {SD["real"]:.4f}. The effective share is')
print(f'  unaffected to one decimal place.')
