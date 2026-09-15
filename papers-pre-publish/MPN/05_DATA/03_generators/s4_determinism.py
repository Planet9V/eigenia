#!/usr/bin/env python3
"""
Where the application is deterministic and where it is not.

A11 asserts that the mapping is deterministic, and S1 records that it was not
because of unseeded draws. A patch replaced the draws on the score path with a
keyed generator. This script establishes what that patch covers and what it
does not, by enumerating every unseeded draw in the source and classifying each
by whether a rendered score passes through it.

The classification rule is stated rather than assumed: a file is on the score
path if it is reachable from the score orchestrator or the composer, and it is
not if it is a visualisation component, a demo, a wizard preview or a test.
That rule is applied by file, which is coarse; the per-call detail is printed
so the classification can be checked line by line.

Set MPN_REPO to the Conductor working tree.
"""
import collections
import os
import re
import sys

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
SRC = os.path.join(ROOT, 'src')
if not os.path.isdir(SRC):
    sys.exit(f'no src/ under {ROOT}; set MPN_REPO')

FILES = {}
for dirpath, dirs, names in os.walk(SRC):
    dirs[:] = [d for d in dirs if d not in ('__tests__', 'node_modules')]
    for n in names:
        if n.endswith(('.ts', '.tsx')) and '.test.' not in n and '.spec.' not in n:
            p = os.path.join(dirpath, n)
            FILES[os.path.relpath(p, ROOT)] = open(p, encoding='utf-8').read()

print('=' * 74)
print('1. THE KEYED GENERATOR')
print('=' * 74)
det = FILES.get('src/lib/deterministic.ts')
if not det:
    sys.exit('src/lib/deterministic.ts is absent; the patch is not applied')
ex = re.findall(r'^export (?:function|const) (\w+)', det, re.M)
print(f'  src/lib/deterministic.ts exports: {", ".join(ex)}')
m = re.search(r'SEED_ALGORITHM_VERSION = (\d+)', det)
print(f'  seed algorithm version: {m.group(1) if m else "?"}')
print('  Keys are built from the work, the character and the frame index, so a')
print('  draw is a pure function of its own coordinates and no global stream')
print('  can reorder it.')
users = sorted(f for f, t in FILES.items()
               if re.search(r"from '@/lib/deterministic'", t))
print(f'  files importing it: {len(users)}')
for f in users:
    draws = len(re.findall(r'\b(?:rand|randInt|randRange|chance|pick)\s*\(',
                           FILES[f]))
    keys = len(re.findall(r'\b(?:characterKey|frameKey)\s*\(', FILES[f]))
    print(f'    {f:58s} {draws:3d} draws, {keys:2d} key constructions')

print()
print('=' * 74)
print('2. EVERY UNSEEDED DRAW LEFT IN THE SOURCE')
print('=' * 74)
SCORE_PATH = ('score_orchestrator', 'GeniusComposer', 'psychometric_calculus',
              'leitmotif_generator', 'leitmotif_transformation_rules',
              'mpn_reference_lookup', 'score_exporter', 'midi_writer',
              'playback_engine', 'MPNSynthesizer')
# Three files needed resolving by reading rather than by filename, and the
# reason for each is recorded so the classification can be checked:
#   BackgroundEffect.tsx        imported only by TerminalFrame, a page chrome
#                               component; draws particle positions
#   dialectic_graph_data.ts     imported only by MPNExperiment_DialecticGraph
#   api/regenerate/route.ts     the draw builds a job identifier string, not a
#                               musical quantity
NOT_SCORE = ('MPNExperiment_', 'Demo', 'ab-test', 'wizard/', 'play-library',
             'visual', 'Visual', 'BackgroundEffect', 'dialectic_graph_data',
             'api/regenerate')
rows = []
for f, t in sorted(FILES.items()):
    hits = [(i, l.strip()) for i, l in enumerate(t.splitlines(), 1)
            if 'Math.random()' in l and not l.strip().startswith(('//', '*'))]
    if not hits:
        continue
    base = os.path.basename(f)
    on = any(k in f for k in SCORE_PATH)
    off = any(k in f for k in NOT_SCORE)
    cls = 'SCORE PATH' if on and not off else ('not on the score path' if off
                                               else 'unclassified')
    rows.append((cls, f, hits))
by = collections.Counter(c for c, _, _ in rows)
tot = sum(len(h) for _, _, h in rows)
print(f'  {tot} unseeded draws in {len(rows)} files')
for cls in ('SCORE PATH', 'unclassified', 'not on the score path'):
    sel = [r for r in rows if r[0] == cls]
    n = sum(len(h) for _, _, h in sel)
    print(f'  {cls:24s} {n:3d} draws in {len(sel):2d} files')
print()
for cls in ('SCORE PATH', 'unclassified'):
    sel = [r for r in rows if r[0] == cls]
    if not sel:
        continue
    print(f'  {cls}:')
    for _, f, hits in sel:
        print(f'    {f}')
        for i, l in hits[:6]:
            print(f'      :{i}  {l[:78]}')
        if len(hits) > 6:
            print(f'      ... and {len(hits)-6} more')
print()
print('  Files not on the score path, with their counts:')
for _, f, hits in rows:
    if any(k in f for k in NOT_SCORE):
        print(f'    {len(hits):3d}  {f}')

print()
print('=' * 74)
print('3. WHAT THIS MEANS FOR A11')
print('=' * 74)
score_n = sum(len(h) for c, _, h in rows if c == 'SCORE PATH')
unc_n = sum(len(h) for c, _, h in rows if c == 'unclassified')
print(f'  Unseeded draws reachable from a rendered score: {score_n}')
print(f'  Unseeded draws this script cannot classify by filename: {unc_n}')
print('  (three files were resolved by reading their importers; see the')
print('   comment beside NOT_SCORE in this script for each reason)')
print()
if score_n == 0:
    print('  So determinism holds where A11 needs it: two runs of the same work')
    print('  produce the same score. It does not hold for the visualisations,')
    print('  the demos or the wizard previews, and those are what a reader sees')
    print('  first. A screenshot of a visualisation is not reproducible even')
    print('  though the score under it is.')
else:
    print('  Determinism does NOT hold on the score path and A11 is open.')
print()
print('  One consequence for a listening study. The stimuli are reproducible,')
print('  which is what S1 said was blocking; the figures in the interface are')
print('  not, so a participant shown a visualisation alongside a cue is shown')
print('  something that will differ on the next run.')
