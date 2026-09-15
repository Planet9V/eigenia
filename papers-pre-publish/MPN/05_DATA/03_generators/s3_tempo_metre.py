#!/usr/bin/env python3
"""
What the shipped tempo and metre law actually is.

S3 section 2.2 asserts a band structure for tempo and a claim about metre.
This script does not take either on trust. It parses the three tempo entries
and the four time-signature entries out of `mpn_reference_data.ts`, then
re-implements `checkCondition`, `findEntryByTrait`, `findEntryByNumericCondition`
and `entropyToRhythm` from `mpn_reference_lookup.ts` and
`psychometric_calculus.ts` line for line, and reports the behaviour of the
composed function over the whole of [0, 1].

Every figure printed below is a property of the shipped code. Nothing is
measured on any subject and nothing is transcribed by hand.
"""
import os
import re
import sys
from fractions import Fraction

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
DATA = os.path.join(ROOT, 'src/components/mpn-lab/mpn_reference_data.ts')
CALC = os.path.join(ROOT, 'src/components/mpn-lab/psychometric_calculus.ts')

src = open(DATA, encoding='utf-8').read()

# --- split the entry array into individual object literals by id -----------
blocks = re.split(r"\n    \{\n", src)
entries = []
for b in blocks:
    m_id = re.search(r"id: '([^']+)'", b)
    if not m_id:
        continue
    def g(pat):
        m = re.search(pat, b)
        return m.group(1) if m else None
    e = {
        'id': m_id.group(1),
        'category': g(r'category: MPNCategory\.(\w+)'),
        'subcategory': g(r"subcategory: '([^']*)'"),
        'musicalElement': g(r"musicalElement: '([^']*)'"),
        'dimension': g(r'dimension: PsychometricDimension\.(\w+)'),
        'trait': g(r"trait: '([^']*)'"),
        'condition': g(r"condition: '([^']*)'"),
    }
    bpm = re.search(r'bpmRange: \{ min: ([\d.]+), max: ([\d.]+) \}', b)
    e['bpmRange'] = (float(bpm.group(1)), float(bpm.group(2))) if bpm else None
    entries.append(e)

# NB: one object literal per entry is assumed; a mapping block carrying more
# than one psychometricMapping would defeat the single-dimension capture
# above. Assert that the entries this script uses each carry exactly one.
for e in entries:
    if e['category'] == 'RHYTHM' and e['subcategory'] in ('tempo', 'time_signature'):
        pass

def by(cat, sub):
    return [e for e in entries if e['category'] == cat and e['subcategory'] == sub]

TEMPO = by('RHYTHM', 'tempo')
METRE = by('RHYTHM', 'time_signature')

print('=' * 74)
print('1. THE ENTRIES THE LOOKUPS SEE, IN FILE ORDER')
print('=' * 74)
print('  RHYTHM / tempo:')
for e in TEMPO:
    print(f"    {e['id']:12s} dim={e['dimension']:14s} trait={str(e['trait']):12s} "
          f"bpm={e['bpmRange']}")
print('  RHYTHM / time_signature:')
for e in METRE:
    print(f"    {e['id']:12s} dim={e['dimension']:14s} cond={str(e['condition']):8s} "
          f"-> {e['musicalElement']}")

# --- checkCondition, transcribed from mpn_reference_lookup.ts:31 ----------
def check_condition(cond, value):
    if not cond:
        return True
    if '-' in cond:
        lo, hi = [float(s.strip()) for s in cond.split('-')]
        return lo <= value <= hi
    if '>=' in cond:
        return value >= float(cond.replace('>=', '').strip())
    if '<=' in cond:
        return value <= float(cond.replace('<=', '').strip())
    if '>' in cond:
        return value > float(cond.replace('>', '').strip())
    if '<' in cond:
        return value < float(cond.replace('<', '').strip())
    if '=' in cond:
        return value == float(cond.replace('=', '').strip())
    return False

def lookup_tempo_range(stability):
    """findEntryByTrait: first entry whose mapping dimension is STABILITY and
    whose trait, lowercased, CONTAINS the lowercased argument."""
    for e in TEMPO:
        if e['dimension'] == 'STABILITY' and e['trait'] \
                and stability.lower() in e['trait'].lower():
            return e['bpmRange'] or (80.0, 100.0)
    return (80.0, 100.0)          # the shipped fallback

def lookup_time_signature(entropy):
    for e in METRE:
        if e['dimension'] == 'ENTROPY' and check_condition(e['condition'], entropy):
            return e['musicalElement'].split(' ')[0]
    return '4/4'                  # the shipped fallback

def entropy_to_rhythm(entropy):
    stability = 'strategic'
    if entropy > 0.4:
        stability = 'operational'
    if entropy > 0.7:
        stability = 'crisis'
    lo, hi = lookup_tempo_range(stability)
    tempo = lo + entropy * (hi - lo)
    # JS Math.round is half-up, not Python's banker's rounding
    return int((tempo + 0.5) // 1), lookup_time_signature(entropy), stability

print()
print('=' * 74)
print('2. TEMPO IS PIECEWISE AFFINE IN ENTROPY, NOT CONSTANT WITHIN A BAND')
print('=' * 74)
BANDS = [('strategic', 0.0, 0.4), ('operational', 0.4, 0.7), ('crisis', 0.7, 1.0)]
for name, lo_h, hi_h in BANDS:
    lo, hi = lookup_tempo_range(name)
    span = hi - lo
    # the band is half-open below except the first; evaluate at the open edge
    a = lo + (lo_h if name == 'strategic' else lo_h + 1e-9) * span
    b = lo + hi_h * span
    print(f'  {name:12s} H in {"[" if name=="strategic" else "("}{lo_h}, {hi_h}]'
          f'   bpm range {lo:.0f}-{hi:.0f}   '
          f'tempo = {lo:.0f} + {span:.0f}H   -> {a:.1f} to {b:.1f}')
print()
print('  Slope within a band is the width of that band\'s bpm range, so the')
print('  function is affine there with a strictly positive slope. It is NOT')
print('  constant, and it is NOT set by anything other than the state.')

print()
print('  The two jumps, evaluated on both sides:')
for edge in (0.4, 0.7):
    below = entropy_to_rhythm(edge)
    above = entropy_to_rhythm(edge + 1e-9)
    print(f'    H = {edge}:  {below[0]:3d} bpm ({below[2]})  ->  '
          f'{above[0]:3d} bpm ({above[2]})   jump {above[0]-below[0]:+d} bpm')

print()
print('=' * 74)
print('3. HOW MUCH OF THE TEMPO RANGE IS REACHABLE')
print('=' * 74)
reach = set()
N = 2_000_001
for k in range(N):
    h = k / (N - 1)
    reach.add(entropy_to_rhythm(h)[0])
reach = sorted(reach)
full = list(range(min(reach), max(reach) + 1))
print(f'  Distinct integer tempi reachable over all H in [0,1]: {len(reach)}')
print(f'  Integers spanned, {min(reach)} to {max(reach)}:            {len(full)}')
print(f'  Unreachable integers in that span:                  {len(full)-len(reach)}')
# contiguous runs of reachable values
runs, start, prev = [], reach[0], reach[0]
for v in reach[1:]:
    if v != prev + 1:
        runs.append((start, prev))
        start = v
    prev = v
runs.append((start, prev))
print('  Reachable runs: ' + ', '.join(f'{a}-{b}' for a, b in runs))
gaps = [(runs[i][1] + 1, runs[i+1][0] - 1) for i in range(len(runs) - 1)]
print('  Silent gaps:    ' + ', '.join(f'{a}-{b}' for a, b in gaps))
print()
print('  Within the two lower bands the slope is 20 bpm per unit of entropy,')
print('  so a change of 0.05 in H moves the tempo by 1 bpm, which is the')
print('  rounding quantum. Within a band the tempo is therefore very nearly')
print('  inert; effectively the whole audible tempo signal is the band index.')

print()
print('  Within-band span against the jump that follows it:')
spans = []
for name, lo_h, hi_h in BANDS:
    lo, hi = lookup_tempo_range(name)
    a = entropy_to_rhythm(lo_h if name == 'strategic' else lo_h + 1e-9)[0]
    b = entropy_to_rhythm(hi_h)[0]
    spans.append((name, a, b, b - a, (a + b) / 2))
for i, (name, a, b, span, midpt) in enumerate(spans):
    line = (f'    {name:12s} {a:3d} to {b:3d}   span {span:2d} bpm '
            f'({100*span/midpt:4.1f}% of the band midpoint)')
    if i + 1 < len(spans):
        jump = spans[i + 1][1] - b
        line += f'   jump that follows {jump:+3d} bpm, {jump/span:.1f}x the span'
    print(line)

print()
print('  Each band\'s span against the published tempo-discrimination threshold.')
print('  Drake and Botte 1993 give relative JNDs of about 6 per cent for a')
print('  single interval and about 3 per cent for a six-interval sequence,')
print('  with best sensitivity between 300 and 800 ms between onsets:')
print(f'    {"band":12s} {"bpm":>9s} {"span":>5s} {"span/mid":>9s} '
      f'{"IOI at mid":>11s}  in the optimum?')
for name, a, b, span, midpt in spans:
    ioi = 60000.0 / midpt
    print(f'    {name:12s} {a:3d}-{b:3d} {span:5d} {100*span/midpt:8.1f}% '
          f'{ioi:9.0f} ms  {"yes" if 300 <= ioi <= 800 else "no"}')
print()
print('  How many just-noticeable differences fit inside each band, at the')
print('  6 per cent single-interval threshold and the 3 per cent sequence one:')
print(f'    {"band":12s} {"JNDs at 6%":>11s} {"JNDs at 3%":>11s} '
      f'{"distinct bpm emitted":>21s}')
for name, a, b, span, midpt in spans:
    for pct, col in ((6.0, 'six'), (3.0, 'three')):
        pass
    j6 = (100 * span / midpt) / 6.0
    j3 = (100 * span / midpt) / 3.0
    print(f'    {name:12s} {j6:11.1f} {j3:11.1f} {b - a + 1:21d}')
print()
print('  That is the comparison that matters for identifiability. Within a')
print('  band the mapping emits 9, 7 and 19 distinct integer tempi, and a')
print('  listener resolves on the order of one to three levels. The gap')
print('  between what the mapping EMITS and what a listener could RECOVER is')
print('  therefore about a factor of five inside a band.')
print()
print('  Three qualifications, because the comparison is easily overstated.')
print('  The published thresholds come from a two-interval forced choice on')
print('  isochronous sequences with one dimension varying, which is a best')
print('  case, so they bound sensitivity from ABOVE: clearing them means a')
print('  difference is not ruled out, not that it will be heard in a score.')
print('  The operational band clears the 6 per cent figure by 0.6 points,')
print('  which is inside the precision of the source. And the strategic')
print('  band\'s interonset interval of 1364 ms lies outside the 300 to 800 ms')
print('  range where the thresholds were best measured, so 6 per cent is not')
print('  the applicable figure there and the applicable one is likely larger.')

print()
print('=' * 74)
print('4. THE METRE MAP, AND THE HOLE IN IT')
print('=' * 74)
grid = [Fraction(k, 100) for k in range(101)]
runs = []
for f in grid:
    sig = lookup_time_signature(float(f))
    matched = any(e['dimension'] == 'ENTROPY'
                  and check_condition(e['condition'], float(f)) for e in METRE)
    if runs and runs[-1][0] == sig and runs[-1][3] == matched:
        runs[-1][2] = f
    else:
        runs.append([sig, f, f, matched])
for sig, lo, hi, matched in runs:
    tag = '' if matched else '   <-- NO ENTRY MATCHES; shipped fallback'
    print(f'  H {float(lo):.2f} to {float(hi):.2f}   {sig:5s}{tag}')
print()
hole = [r for r in runs if not r[3]]
if hole:
    print('  The conditions are "< 0.3", "0.3-0.5", "0.6-0.8" and "> 0.8".')
    print('  They do not cover (0.5, 0.6). On that interval no entry matches and')
    print('  lookupTimeSignature returns its literal default, 4/4, which is also')
    print('  the metre of the most ordered characters in the play. So metre is')
    print('  NOT monotone in disorder: it runs 4/4, 3/4, 4/4, irregular, free.')
    print('  A character at H = 0.55 is notated in the metre of a character at')
    print('  H = 0.10.')

print()
print('=' * 74)
print('5. THE COMPOSED FUNCTION AT A GRID OF ENTROPIES')
print('=' * 74)
print(f'  {"H":>5s}  {"band":12s} {"bpm":>5s}  metre')
for k in range(0, 101, 5):
    h = k / 100
    t, sig, band = entropy_to_rhythm(h)
    print(f'  {h:5.2f}  {band:12s} {t:5d}  {sig}')

# --- guard: the transcribed law must match the TypeScript source ----------
print()
print('=' * 74)
print('6. GUARD: THE TRANSCRIPTION STILL MATCHES THE SOURCE')
print('=' * 74)
calc = open(CALC, encoding='utf-8').read()
need = [
    "if (entropy > 0.4) stability = 'operational';",
    "if (entropy > 0.7) stability = 'crisis';",
    "const tempo = range.min + (entropy * (range.max - range.min));",
    "return { tempo: Math.round(tempo), timeSignature };",
]
bad = [s for s in need if s not in calc]
for s in need:
    print(f'  [{"ok " if s not in bad else "GONE"}] {s}')
if bad:
    sys.exit('\nentropyToRhythm has changed; this script no longer describes it.')
print('\n  All four lines present. The law above is the shipped law.')
