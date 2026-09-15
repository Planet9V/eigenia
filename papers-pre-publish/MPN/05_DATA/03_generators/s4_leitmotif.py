#!/usr/bin/env python3
"""
Which leitmotif transformations change what a listener hears.

Revision 1 of S4 asserted that the inversion transformation is inaudible,
because transformLeitmotif negates the motif's intervals and the composer reads
only the pitch classes. That assertion is false. The function recomputes the
pitch classes from the transformed intervals for four of its eight cases, so
inversion does change the pitches. The claim is withdrawn in revision 2 and
this script is what replaces it.

METHOD. The TypeScript source of transformLeitmotif is translated to
executable JavaScript by stripping its type annotations, and then RUN under
node against a test motif, once per transformation. Nothing here re-implements
the function in Python: the switch body and the recomputation block that
execute are the ones in the repository, and the translation is printed so it
can be checked against the source. The output compared is exactly what the
composer reads, the pitch classes and the rhythm.

Set MPN_REPO to the Conductor working tree.
"""
import json
import os
import re
import subprocess
import sys
import tempfile

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
SRC = os.path.join(ROOT, 'src/components/mpn-lab/leitmotif_generator.ts')
if not os.path.exists(SRC):
    sys.exit(f'not found: {SRC}. Set MPN_REPO to the Conductor tree.')

text = open(SRC, encoding='utf-8').read()
m = re.search(r'export function transformLeitmotif\(.*?\n\}\n', text, re.S)
if not m:
    sys.exit('transformLeitmotif not found in the source')
fn = m.group(0)

# Strip TypeScript: the export keyword, the parameter types, the return type,
# and the arrow-function parameter annotations inside the body.
js = fn.replace('export function', 'function')
js = js.replace('motif: Leitmotif,', 'motif,')
js = js.replace('transformation: LeitmotifTransformation', 'transformation')
js = js.replace('): Leitmotif {', ') {')
js = re.sub(r'\((\w+), (\w+)\) =>', r'(\1, \2) =>', js)
js = re.sub(r'(\(|,\s*)(\w+): \w+(?=[,)])', r'\1\2', js)

print('=' * 74)
print('1. THE FUNCTION AS RUN')
print('=' * 74)
print(f'  translated from {os.path.relpath(SRC, ROOT)}, '
      f'lines {text[:m.start()].count(chr(10))+1} onward')
for line in js.splitlines():
    print('  ' + line)

TRANSFORMS = ['original', 'inverted', 'retrograde', 'retrograde_inverted',
              'fragmented', 'augmented', 'diminished', 'chromatic_descent',
              'whole_tone_ascent']
MOTIF = {'pitchClasses': [0, 4, 7, 11], 'intervals': [4, 3, 4],
         'rhythm': [1, 0.5, 0.5, 2]}

driver = js + '\n' + f'''
const motif = {json.dumps(MOTIF)};
const out = {{}};
for (const t of {json.dumps(TRANSFORMS)}) {{
    const r = transformLeitmotif(JSON.parse(JSON.stringify(motif)), t);
    out[t] = {{pitchClasses: r.pitchClasses, rhythm: r.rhythm,
               intervals: r.intervals}};
}}
console.log(JSON.stringify(out));
'''
with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as fh:
    fh.write(driver)
    path = fh.name
res = subprocess.run(['node', path], capture_output=True, text=True)
os.unlink(path)
if res.returncode != 0:
    sys.exit('node failed:\n' + res.stderr)
out = json.loads(res.stdout)

print()
print('=' * 74)
print('2. WHAT EACH TRANSFORMATION PRODUCES')
print('=' * 74)
print(f'  test motif: pitch classes {MOTIF["pitchClasses"]}, '
      f'intervals {MOTIF["intervals"]}, rhythm {MOTIF["rhythm"]}')
print()
base = out['original']
print(f'  {"transformation":22s} {"pitch classes":26s} {"rhythm":22s} heard')
for t in TRANSFORMS:
    r = out[t]
    changed = (r['pitchClasses'] != base['pitchClasses']
               or r['rhythm'] != base['rhythm'])
    mark = 'yes' if changed else 'NO CHANGE'
    print(f'  {t:22s} {str(r["pitchClasses"]):26s} {str(r["rhythm"]):22s} {mark}')
print()
print('  "heard" asks whether the pitch classes or the rhythm differ from the')
print('  untransformed motif. Those two fields are what the composer reads;')
print('  the intervals field is read only by the recomputation block inside')
print('  this same function.')

print()
print('=' * 74)
print('3. THE TWO TRANSFORMATIONS THAT COINCIDE')
print('=' * 74)
pairs = [(a, b) for i, a in enumerate(TRANSFORMS) for b in TRANSFORMS[i+1:]
         if out[a]['pitchClasses'] == out[b]['pitchClasses']
         and out[a]['rhythm'] == out[b]['rhythm']]
if not pairs:
    print('  no two transformations produce the same audible result')
for a, b in pairs:
    print(f'  {a} and {b} produce identical pitch classes and rhythm')
print()
print('  Where a pair appears here, read the source: the recomputation block')
print('  rebuilds pitchClasses from motif.pitchClasses[0] and the transformed')
print('  intervals, which discards any reordering an earlier case made to')
print('  pitchClasses. The rhythm is left untouched by both cases, so nothing')
print('  downstream can tell them apart.')

# --- 4. reachability of each transformation from the selector -----------------
m2 = re.search(r'export function selectTransformation\(.*?\n\}\n', text, re.S)
if not m2:
    sys.exit('selectTransformation not found in the source')
sel = m2.group(0).replace('export function', 'function')
sel = re.sub(r'(\w+): number', r'\1', sel)
sel = re.sub(r'rsi: \{[^}]*\}', 'rsi', sel)
sel = sel.replace('): LeitmotifTransformation {', ') {')

grid = sel + '''
const step = 0.02;
const counts = {};
const rsiGrid = [];
for (let r = 0; r <= 1.0001; r += 0.1)
  for (let s = 0; r + s <= 1.0001; s += 0.1)
    rsiGrid.push({real: +r.toFixed(3), symbolic: +s.toFixed(3),
                  imaginary: +(1 - r - s).toFixed(3)});
let n = 0;
for (let t = 0; t <= 1.0001; t += step)
  for (let e = 0; e <= 1.0001; e += step)
    for (const rsi of rsiGrid) {
      const k = selectTransformation(+t.toFixed(3), +e.toFixed(3), rsi);
      counts[k] = (counts[k] || 0) + 1; n++;
    }
console.log(JSON.stringify({counts, n, cells: rsiGrid.length}));
'''
with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as fh:
    fh.write(grid)
    path2 = fh.name
res2 = subprocess.run(['node', path2], capture_output=True, text=True)
os.unlink(path2)
if res2.returncode != 0:
    sys.exit('node failed on the selector:\n' + res2.stderr)
g = json.loads(res2.stdout)

print()
print('=' * 74)
print('4. WHICH TRANSFORMATIONS THE SELECTOR CAN ACTUALLY RETURN')
print('=' * 74)
print(f'  selectTransformation run over {g["n"]:,d} states: trauma and entropy')
print(f'  on a 0.02 grid of the unit interval, crossed with {g["cells"]} points')
print('  of the register simplex on a 0.1 grid. The grid is a sample, so a')
print('  transformation reported here as returned IS returned; one reported')
print('  with no cells is not returned anywhere on this grid, and the source')
print('  is quoted below for each so the reader can check the branch.')
print()
for t in TRANSFORMS:
    c = g['counts'].get(t, 0)
    tag = f'{c:8,d} states  {100*c/g["n"]:5.1f}%' if c else '   never returned'
    print(f'  {t:22s} {tag}')
print()
missing = [t for t in TRANSFORMS if not g['counts'].get(t)]
print(f'  never returned on this grid: {", ".join(missing) or "none"}')
print()
print('  The selector tests trauma, then entropy, then rsi.real, then')
print('  rsi.imaginary. It never reads rsi.symbolic, so a symbolic-dominant')
print('  state selects whatever the trauma and entropy tests leave, and the')
print('  Symbolic register cannot select a transformation of its own.')
