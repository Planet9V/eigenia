#!/usr/bin/env python3
"""
Run the shipped analyzeRSI over the analysis strings of all 232 frames in the
play library, and report what the register triple actually is. This is the
instrument the theory uses to produce r, s and i, applied to the text it is
actually given. Reimplemented here exactly as it stands in
src/components/mpn-lab/psychometric_calculus.ts:242-256, including the
substring matching and the presence-not-count rule.
"""
import os
import re
import collections

REAL = ['death', 'trauma', 'drive', 'void', 'chaos', 'abject', 'blood', 'ghost',
        'prophecy', 'impossible', 'real', 'murder', 'kill', 'die']
SYMB = ['law', 'order', 'signifier', 'father', 'king', 'crown', 'word', 'name',
        'debt', 'oath', 'symbolic', 'duty', 'honor', 'prince']
IMAG = ['ego', 'mirror', 'self', 'image', 'double', 'shadow', 'love', 'ideal',
        'wholeness', 'imaginary', 'beauty', 'adore']


def analyze_rsi(text):
    t = text.lower()
    a = [sum(1 for k in REAL if k in t),
         sum(1 for k in SYMB if k in t),
         sum(1 for k in IMAG if k in t)]
    total = sum(a) or 1
    return tuple(x / total for x in a), a


# Read through s3_frames.py, the one correct reader; the regex this script
# used until 13 September 2026 truncated seven annotation strings at an escaped
# apostrophe. See s3_frames.py for the comparison.
import importlib.util as _il
_spec = _il.spec_from_file_location(
    's3_frames', os.path.join(os.path.dirname(os.path.abspath(__file__)),
                              's3_frames.py'))
_FR = _il.module_from_spec(_spec)
_spec.loader.exec_module(_FR)
frames = [(f['file'], f['analysis']) for f in _FR.load()]

print(f"frames with an analysis string: {len(frames)}")

deg = []
triples = []
for fn, text in frames:
    (r, s, i), counts = analyze_rsi(text)
    if r == s == i == 0:
        deg.append((fn, text))
    else:
        triples.append((r, s, i, text, counts))

print(f"degenerate, returning (0, 0, 0): {len(deg)}  "
      f"({100*len(deg)/len(frames):.1f} per cent)")
print(f"on the simplex: {len(triples)}")
print()

# how far from a tie
gaps = []
for r, s, i, text, c in triples:
    p = sorted((r, s, i))
    gaps.append(p[2] - p[1])
for d in (0.0, 0.01, 0.05, 0.10):
    n = sum(1 for g in gaps if g <= d)
    print(f"  frames with (largest - second largest) <= {d:.2f}: {n} "
          f"of {len(triples)}  ({100*n/len(triples):.1f} per cent)")
print()

# how coarse is the instrument
distinct = collections.Counter(tuple(round(x, 6) for x in t[:3]) for t in triples)
print(f"  distinct register triples produced over {len(triples)} frames: "
      f"{len(distinct)}")
print("  the eight most common, with their frame counts:")
for t, n in distinct.most_common(8):
    print(f"    ({t[0]:.3f}, {t[1]:.3f}, {t[2]:.3f})  x{n}")
print()

tot = collections.Counter()
for r, s, i, text, c in triples:
    tot[sum(c)] += 1
print("  number of keyword families hit, by frame count:")
for k in sorted(tot):
    print(f"    {k} hits: {tot[k]} frames")
print()

# which single words are carrying the instrument
hits = collections.Counter()
for fn, text in frames:
    t = text.lower()
    for fam, ks in (('R', REAL), ('S', SYMB), ('I', IMAG)):
        for k in ks:
            if k in t:
                hits[f"{fam}:{k}"] += 1
print("  the twelve keywords that fire most often:")
for k, n in hits.most_common(12):
    print(f"    {k:18s} {n}")
print()

# substring false positives
print("  substring matches that are not the word (the instrument uses")
print("  String.includes, not word boundaries):")
seen = set()
for fn, text in frames:
    t = text.lower()
    for fam, ks in (('R', REAL), ('S', SYMB), ('I', IMAG)):
        for k in ks:
            if k in t:
                for w in re.findall(r"[a-z']+", t):
                    if k in w and w != k and (k, w) not in seen:
                        seen.add((k, w))
                        print(f"    '{k}' inside '{w}'")
