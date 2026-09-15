#!/usr/bin/env python3
"""
How many distinguishable frames the mapping can emit, under the theory as this
paper specifies it and under the code as it ships. These are different
numbers and revision 1 of this script conflated them, mixing the Python
module's eight dynamic markings and S1's amended ladders with the TypeScript
rhythm path and calling the result "as shipped".

Both readings are computed here and each is labelled by which laws it uses.
"""
import importlib.util
import math
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')

def load(name):
    spec = importlib.util.spec_from_file_location(
        name, os.path.join(HERE, name + '.py'))
    mod = importlib.util.module_from_spec(spec)
    out = sys.stdout
    sys.stdout = open(os.devnull, 'w')
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.stdout.close()
        sys.stdout = out
    return mod

TM = load('s3_tempo_metre')
DY = load('s3_dynamics')

# ---------------------------------------------------------------------------
# A. THE LAWS THIS PAPER SPECIFIES
# ---------------------------------------------------------------------------
CUTS, MARKS = DY.cuts, DY.marks              # from the Python module, eight
LADDER_SPEC = (0.2, 0.4, 0.6, 0.8)           # S1's amended A8, even fifths

def rung(x, ladder):
    return sum(1 for c in ladder if x >= c)

def spec_dynamic(tau):
    for c, m in zip(CUTS, MARKS):
        if tau < c:
            return m
    return MARKS[-1]

def spec_density(tau, h):
    return 0.3 * h + 0.7 * tau

def spec_frag(tau, h):
    return max(0.0, 0.7 * h - 0.3 * tau) / 0.7

# ---------------------------------------------------------------------------
# B. THE LAWS THE CODE SHIPS, read out of the source
# ---------------------------------------------------------------------------
RULES = open(os.path.join(ROOT, 'src/lib/leitmotif_transformation_rules.ts'),
             encoding='utf-8').read()
f_w = re.search(r'fragmentationScore = \(entropy \* ([\d.]+)\) \+ '
                r'\(trauma \* ([\d.]+)\)', RULES)
f_cuts = [float(x) for x in
          re.findall(r'fragmentationScore < ([\d.]+)', RULES)]
o_w = re.search(r'intensity = \(trauma \* ([\d.]+)\) \+ \(entropy \* ([\d.]+)\)',
                RULES)
o_cuts = [float(x) for x in re.findall(r'intensity < ([\d.]+)', RULES)]
assert f_w and o_w and len(f_cuts) == 4 and len(o_cuts) == 4, 'shipped A8 laws'

DATA = open(os.path.join(ROOT, 'src/components/mpn-lab/mpn_reference_data.ts'),
            encoding='utf-8').read()
DROWS = []
for b in re.split(r"\n    \{\n", DATA):
    if "subcategory: 'volume_level'" in b and 'PsychometricDimension.TRAUMA' in b:
        DROWS.append((re.search(r"musicalElement: '([^']*)'", b).group(1),
                      re.search(r"condition: '([^']*)'", b).group(1)))

def _check(cond, v):
    if '-' in cond:
        lo, hi = [float(x) for x in cond.split('-')]
        return lo <= v <= hi
    if '>' in cond:
        return v > float(cond.replace('>', ''))
    if '<' in cond:
        return v < float(cond.replace('<', ''))
    return False

def ship_dynamic(tau):
    for elem, cond in DROWS:
        if _check(cond, tau):
            return elem.split(' ')[0]
    return 'mf'                                   # the shipped fallback

def ship_frag(tau, h):
    return float(h) * float(f_w.group(1)) + float(tau) * float(f_w.group(2))

def ship_dens(tau, h):
    return float(tau) * float(o_w.group(1)) + float(h) * float(o_w.group(2))

# ---------------------------------------------------------------------------
print('=' * 74)
print('1. THE TWO SETS OF LAWS')
print('=' * 74)
print('  As this paper specifies them:')
print(f'    dynamics   {len(MARKS)} markings, cuts {CUTS}  '
      f'(ml/psychoscore_v2 module)')
print(f'    density    0.3H + 0.7tau, ladder {LADDER_SPEC}   (S1 A8 amendment)')
print(f'    frag       max(0, 0.7H - 0.3tau)/0.7, ladder {LADDER_SPEC}')
print('  As the TypeScript ships them:')
labs = sorted({ship_dynamic(k / 1000) for k in range(1001)})
print(f'    dynamics   {len(labs)} labels {labs}, three constant velocities')
print(f'    frag       {f_w.group(1)}H + {f_w.group(2)}tau, cuts {f_cuts}')
print(f'    density    {o_w.group(1)}tau + {o_w.group(2)}H, cuts {o_cuts}')
print('  The shipped pair is the SUPERSEDED A8 pair, the one S1 amends.')

N = 1201
def count(dyn, frag, fladder, dens, dladder, rhythm):
    out = set()
    for a in range(N):
        tau = a / (N - 1)
        for b in range(N):
            h = b / (N - 1)
            out.add((dyn(tau), rhythm(h), rung(frag(tau, h), fladder),
                     rung(dens(tau, h), dladder)))
    return out

spec_rhythm = lambda h: TM.entropy_to_rhythm(h)[:2]        # (bpm, metre)
band_rhythm = lambda h: (0 if h <= 0.4 else (1 if h <= 0.7 else 2),)

print()
print('=' * 74)
print('2. REACHABLE OUTPUT TUPLES OVER THE (TRAUMA, ENTROPY) SQUARE')
print('=' * 74)
print(f'  grid {N} x {N} = {N*N:,} states')
rows = [
    ('specified laws, tempo as three bands, metre ignored',
     count(spec_dynamic, spec_frag, LADDER_SPEC, spec_density, LADDER_SPEC,
           band_rhythm)),
    ('specified laws, every distinct tempo and metre',
     count(spec_dynamic, spec_frag, LADDER_SPEC, spec_density, LADDER_SPEC,
           spec_rhythm)),
    ('shipped laws, tempo as three bands, metre ignored',
     count(ship_dynamic, ship_frag, f_cuts, ship_dens, o_cuts, band_rhythm)),
    ('shipped laws, every distinct tempo and metre',
     count(ship_dynamic, ship_frag, f_cuts, ship_dens, o_cuts, spec_rhythm)),
]
print(f'  {"":54s} {"alone":>7s} {"x3 modes":>9s} {"bits":>6s}')
for label, st in rows:
    n = len(st)
    print(f'  {label:54s} {n:7,d} {3*n:9,d} {math.log2(3*n):6.2f}')
print()
print('  An earlier draft reported the product 3 x 8 x 3 x 5 x 5 = 1,800 and')
print('  about eleven bits. Every figure above is smaller, because dynamics,')
print('  fragmentation and density are three functions of the same two')
print('  coordinates and cannot vary independently.')

print()
print('=' * 74)
print('3. THE RHYTHMIC LAYER: HOW MANY CELLS')
print('=' * 74)
cells, prev = [], None
for k in range(100001):
    h = k / 100000
    bpm, metre, band = TM.entropy_to_rhythm(h)
    key = (band, metre)
    if key != prev:
        cells.append([key, h, h])
        prev = key
    else:
        cells[-1][2] = h
for (band, metre), lo, hi in cells:
    print(f'  H {lo:.5f} to {hi:.5f}   {band:12s} {metre}')
print(f'  cells: {len(cells)}')
print()
print('  The tempo boundaries are 0.4 and 0.7 and the metre boundaries are')
print('  0.3, 0.5, 0.6 and 0.8. Six boundaries partition the unit interval')
print(f'  into seven cells, not six; an earlier draft said six.')

print()
print('=' * 74)
print('4. THE CAVEAT THAT MATTERS MORE THAN ANY OF THE COUNTS')
print('=' * 74)
print('  Every figure counts what the mapping EMITS over the whole state')
print('  square, not what it emits over the states a play produces, and not')
print('  what a listener RECOVERS. The larger counts are reached only by')
print('  resolving tempo to the beat per minute, and the whole span inside')
print('  the two lower tempo bands is 8 and 6 beats per minute. No listener')
print('  has been asked, so the recoverable figure is unknown and smaller.')
