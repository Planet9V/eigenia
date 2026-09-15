#!/usr/bin/env python3
"""
How often the fragmentation clip binds.

S3 section 2.4 asserts that the adopted A8 pair is exactly orthogonal away
from the clip and that the clip binds on a stated number of the 232 annotated
frames. This script reads trauma and entropy out of the two frame files and
counts, rather than taking the figure from a neighbouring section that happens
to report a similar number.
"""
import os
import re

import importlib.util as _il

_spec = _il.spec_from_file_location(
    's3_frames', os.path.join(os.path.dirname(os.path.abspath(__file__)),
                              's3_frames.py'))
FR = _il.module_from_spec(_spec)
_spec.loader.exec_module(FR)

# Read through the one correct parser. Nothing in this script depends on the
# annotation strings, only on trauma and entropy, which are numeric fields the
# superseded regex read correctly; every figure below is therefore unchanged by
# the parser correction. It goes through s3_frames.py anyway so that there is
# one reader of the library and not five.
frames = [(f['file'], f['trauma'], f['entropy']) for f in FR.load()]

n = len(frames)
print('=' * 74)
print('1. THE FRAME LIBRARY')
print('=' * 74)
print(f'  frames carrying both trauma and entropy: {n}')
for fn in FR.FILES:
    print(f'    {fn:24s} {sum(1 for f in frames if f[0] == fn)}')

def frag_raw(tau, h):
    return 0.7 * h - 0.3 * tau

clipped = [(t, h) for _, t, h in frames if frag_raw(t, h) <= 0]
strict = [(t, h) for _, t, h in frames if frag_raw(t, h) < 0]
print()
print('=' * 74)
print('2. WHERE THE CLIP BINDS')
print('=' * 74)
print('  fragmentation = max(0, 0.7H - 0.3tau) / 0.7, so the clip binds where')
print('  0.7H - 0.3tau <= 0, that is tau >= (7/3) H.')
print(f'  frames with 0.7H - 0.3tau <  0 (strictly clipped): {len(strict):3d} '
      f'of {n}  ({100*len(strict)/n:.1f} per cent)')
print(f'  frames with 0.7H - 0.3tau <= 0 (clipped or at 0):  {len(clipped):3d} '
      f'of {n}  ({100*len(clipped)/n:.1f} per cent)')

# correlation on the whole library, and off the clip
def corr(xs, ys):
    m = len(xs)
    mx, my = sum(xs) / m, sum(ys) / m
    sxy = sum((a - mx) * (b - my) for a, b in zip(xs, ys))
    sxx = sum((a - mx) ** 2 for a in xs)
    syy = sum((b - my) ** 2 for b in ys)
    return sxy / (sxx * syy) ** 0.5 if sxx and syy else float('nan')

dens = [0.3 * h + 0.7 * t for _, t, h in frames]
frag = [max(0.0, frag_raw(t, h)) / 0.7 for _, t, h in frames]
un = [frag_raw(t, h) / 0.7 for _, t, h in frames]
keep = [k for k, (_, t, h) in enumerate(frames) if frag_raw(t, h) > 0]

print()
print('=' * 74)
print('3. WHAT THE PAIR ACTUALLY CORRELATES AT ON THIS LIBRARY')
print('=' * 74)
print(f'  adopted pair, clip applied, all {n} frames:      '
      f'r = {corr(dens, frag):+.4f}')
print(f'  same pair, clip removed (signed fragmentation):  '
      f'r = {corr(dens, un):+.4f}')
print(f'  restricted to the {len(keep)} frames off the clip:    '
      f'r = {corr([dens[k] for k in keep], [frag[k] for k in keep]):+.4f}')
print()
print('  The exact orthogonality S2 proves holds for uncorrelated inputs of')
print('  equal dispersion. This library supplies neither, so the realised')
print('  figure is a property of the library and not a check on the theorem.')
sx = (sum((t - sum(f[1] for f in frames)/n) ** 2 for _, t, _ in frames) / n) ** .5
sy = (sum((h - sum(f[2] for f in frames)/n) ** 2 for _, _, h in frames) / n) ** .5
print(f'  sd(trauma) = {sx:.4f}   sd(entropy) = {sy:.4f}   '
      f'corr(trauma, entropy) = '
      f'{corr([f[1] for f in frames], [f[2] for f in frames]):+.4f}')

# the superseded pair, for the contrast S1 rests on
old_f = [0.6 * h + 0.4 * t for _, t, h in frames]
old_d = [0.7 * t + 0.3 * h for _, t, h in frames]
print()
print(f'  superseded pair on the same {n} frames:           '
      f'r = {corr(old_d, old_f):+.4f}')
