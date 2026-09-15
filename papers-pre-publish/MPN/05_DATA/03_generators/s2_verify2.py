#!/usr/bin/env python3
"""Remaining figures for S2: the epsilon bound, and exact frame statistics."""
import collections
import math
import re

print("=" * 72)
print("A. THE EPSILON BOUND ON TWO POSITIVE SCALARISATIONS")
print("=" * 72)
# a, b in the simplex of positive weights, every weight at least eps, inputs
# uncorrelated with equal dispersion. Then corr(y1, y2) = cos(angle between a
# and b), and the angle is largest when a and b sit at opposite extremes of
# the admissible cone.
print("  With uncorrelated inputs of equal dispersion, corr(y1,y2) is the")
print("  cosine of the angle between the two weight vectors. Confining every")
print("  weight to at least eps bounds that angle, hence bounds the correlation.")
print()
print("  eps     max angle     minimum correlation")
for eps in (0.05, 0.10, 0.20, 0.30, 0.40, 0.50):
    th = math.atan2(eps, 1 - eps)
    ang = math.pi / 2 - 2 * th
    print(f"  {eps:.2f}    {math.degrees(ang):6.2f} deg      {math.cos(ang):+.4f}")
print()
print("  Check by exhaustion at eps = 0.20:")
best = 1.0
for a1 in [i / 1000 for i in range(200, 801)]:
    a = (a1, 1 - a1)
    for b1 in (0.2, 0.8):
        b = (b1, 1 - b1)
        c = ((a[0] * b[0] + a[1] * b[1])
             / math.sqrt((a[0] ** 2 + a[1] ** 2) * (b[0] ** 2 + b[1] ** 2)))
        best = min(best, c)
print(f"    exhaustive minimum = {best:+.4f}")
print()
print("  The shipped pair 0.6/0.4 against 0.3/0.7 has every weight at least")
th = math.atan2(0.3, 0.7)
print(f"  0.3, so its correlation could not have fallen below "
      f"{math.cos(math.pi/2 - 2*th):+.4f} whatever the corpus.")

print()
print("=" * 72)
print("B. THE REGISTER TRIPLE AS THE SHIPPED INSTRUMENT PRODUCES IT")
print("=" * 72)
REAL = ['death', 'trauma', 'drive', 'void', 'chaos', 'abject', 'blood', 'ghost',
        'prophecy', 'impossible', 'real', 'murder', 'kill', 'die']
SYMB = ['law', 'order', 'signifier', 'father', 'king', 'crown', 'word', 'name',
        'debt', 'oath', 'symbolic', 'duty', 'honor', 'prince']
IMAG = ['ego', 'mirror', 'self', 'image', 'double', 'shadow', 'love', 'ideal',
        'wholeness', 'imaginary', 'beauty', 'adore']
# Read through s3_frames.py, the one correct reader. The regex this script
# used until 13 September 2026 truncated seven annotation strings at an escaped
# apostrophe and misclassified three of them as carrying no register keyword,
# so the degenerate count it reported, 107, was three too high. See
# s3_frames.py, which prints the comparison.
import importlib.util as _il
import os as _os
_spec = _il.spec_from_file_location(
    's3_frames', _os.path.join(_os.path.dirname(_os.path.abspath(__file__)),
                               's3_frames.py'))
_FR = _il.module_from_spec(_spec)
_spec.loader.exec_module(_FR)
frames = [f['analysis'] for f in _FR.load()]

triples, degenerate = [], 0
for text in frames:
    t = text.lower()
    a = [sum(1 for k in fam if k in t) for fam in (REAL, SYMB, IMAG)]
    if sum(a) == 0:
        degenerate += 1
    else:
        triples.append(tuple(x / sum(a) for x in a))

n, m = len(frames), len(triples)
vertex = sum(1 for t in triples if max(t) == 1.0)
tie = sum(1 for t in triples if sorted(t)[2] - sorted(t)[1] == 0.0)
interior = sum(1 for t in triples if min(t) > 0)
distinct = len(set(tuple(round(x, 9) for x in t) for t in triples))
print(f"  frames                                   {n}")
print(f"  off the simplex, (0,0,0)                 {degenerate}  "
      f"({100*degenerate/n:.1f} per cent of all frames)")
print(f"  on the simplex                           {m}")
print(f"  of those, at a vertex (one register = 1) {vertex}  "
      f"({100*vertex/m:.1f} per cent)")
print(f"  of those, on a tie (mode undecided)      {tie}  "
      f"({100*tie/m:.1f} per cent)")
print(f"  of those, in the interior (all three > 0){interior}  "
      f"({100*interior/m:.1f} per cent)")
print(f"  distinct triples the instrument can and does emit: {distinct}")
print()
cnt = collections.Counter(tuple(round(x, 6) for x in t) for t in triples)
print("  every triple the instrument produced, with its frame count:")
for t, k in cnt.most_common():
    kind = ("vertex" if max(t) == 1.0
            else "tie" if sorted(t)[2] - sorted(t)[1] == 0.0
            else "edge" if min(t) == 0 else "interior")
    print(f"    ({t[0]:.3f}, {t[1]:.3f}, {t[2]:.3f})  x{k:<3d} {kind}")
print()
print(f"  a vertex or a tie accounts for {vertex + tie} of {m} frames "
      f"({100*(vertex+tie)/m:.1f} per cent).")
print(f"  counting the degenerate frames, the register triple is either")
print(f"  absent, pure or undecided on {degenerate + vertex + tie} of {n} "
      f"frames ({100*(degenerate+vertex+tie)/n:.1f} per cent).")
