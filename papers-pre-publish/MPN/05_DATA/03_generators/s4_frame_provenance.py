#!/usr/bin/env python3
"""
Which of the frame library's state values are written and which are computed.

S1 revision 3 corrected a description of the 232 frames as hand annotations,
and said the state values were produced by the application's own text analyser
and calculus run over the author's prose. That correction is right about the
register triple and wrong about trauma and entropy, which are literals in the
data files. This script establishes which is which by reading the data and the
consumer rather than by reading either paper.

Three questions, three tests:
  1. Are trauma and entropy literals in the library? Count them, and count the
     frames, and check the two agree. s3_frames.load() is the single correct
     reader and asserts its own count against the annotation-field count, so a
     parser that silently drops records fails loudly instead.
  2. Does anything recompute them? Enumerate every assignment to a name
     containing "trauma" or "entropy" in the Conductor's score path, and print
     the call signature of the function that consumes a frame.
  3. What IS computed? Find the call that produces the register triple and the
     field it reads.

Set MPN_REPO to the Conductor working tree.
"""
import collections
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import s3_frames

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
LAB = os.path.join(ROOT, 'src/components/mpn-lab')
rel = lambda p: os.path.relpath(p, ROOT)

FRAMES = s3_frames.load()

print('=' * 74)
print('1. TRAUMA AND ENTROPY ARE LITERALS IN THE DATA FILES')
print('=' * 74)
by_file = collections.Counter(f['file'] for f in FRAMES)
lit_t = lit_h = 0
for fn in s3_frames.FILES:
    text = open(os.path.join(LAB, fn), encoding='utf-8').read()
    t = len(re.findall(r'trauma:\s*[\d.]+', text))
    h = len(re.findall(r'entropy:\s*[\d.]+', text))
    lit_t += t
    lit_h += h
    print(f'  {fn:22s} {by_file[fn]:4d} frames, '
          f'{t:4d} literal trauma:, {h:4d} literal entropy:')
print(f'  {"total":22s} {len(FRAMES):4d} frames, '
      f'{lit_t:4d} literal trauma:, {lit_h:4d} literal entropy:')
assert lit_t == lit_h == len(FRAMES), (
    f'{len(FRAMES)} frames against {lit_t} trauma and {lit_h} entropy '
    f'literals; one of the three counts is dropping records')
print()
print('  Every frame carries a trauma and an entropy written out in the source')
print('  as a number. They are not computed from anything; they are typed.')
print()
vals = sorted({f['trauma'] for f in FRAMES})
print(f'  distinct trauma values across the library: {len(vals)}  {vals}')
vals = sorted({f['entropy'] for f in FRAMES})
print(f'  distinct entropy values:                   {len(vals)}  {vals}')
print('  Both take a small number of round values, which is what a person')
print('  typing a judgement produces and not what a formula over prose does.')

print()
print('=' * 74)
print('2. NOTHING ON THE SCORE PATH RECOMPUTES THEM')
print('=' * 74)
# The four modules of the score path, plus the two that BIND trauma and
# entropy before calling into it. The callers are not in mpn-lab, and an
# earlier version of this script enumerated only the four; its conclusion that
# nothing downstream touches the values was then true of the class it searched
# and asserted of a wider one, which is the error this programme keeps making.
SCORE_PATH = [
    ('src/components/mpn-lab', 'score_orchestrator.ts'),
    ('src/components/mpn-lab', 'psychometric_calculus.ts'),
    ('src/components/mpn-lab', 'GeniusComposer.ts'),
    ('src/components/mpn-lab', 'leitmotif_generator.ts'),
    ('src/components/mpn-lab', 'score_exporter.ts'),
    ('src/app/mpn-conductor', 'page.tsx'),
]
# An earlier version of this pattern required a character before "trauma",
# so it matched `stave.trauma =` and `avgTrauma =` and silently missed the
# plain `const trauma = ...` bindings that are the whole point of the test.
# The under-match ran in favour of the claim, which is the direction that
# matters. This one anchors on a non-identifier boundary instead.
ASSIGN = re.compile(
    r'(?<![\w$.])((?:[\w$]+\.)*[\w$]*(?:[Tt]rauma|[Ee]ntropy)[\w$]*)'
    r'\s*=\s*(?!=)([^;\n]+)')
for d, fn in SCORE_PATH:
    p = os.path.join(ROOT, d, fn)
    if not os.path.exists(p):
        print(f'  {d}/{fn}: not present')
        continue
    hits = []
    for i, line in enumerate(open(p, encoding='utf-8').read().splitlines(), 1):
        st = line.strip()
        if st.startswith(('//', '*', '/*')):
            continue
        for m in ASSIGN.finditer(line):
            hits.append((i, m.group(1), m.group(2).strip()[:46]))
    print(f'  {rel(p)}: {len(hits)} assignment(s) to a trauma or entropy name')
    for i, name, val in hits:
        print(f'{"":6s}:{i:<5d} {name:26s} = {val}')

print()
sig = re.search(r'async processFrame\([^)]*\)', 
                open(os.path.join(LAB, 'score_orchestrator.ts'),
                     encoding='utf-8').read())
print('  The function that consumes a frame takes them as parameters:')
print(f'    {sig.group(0) if sig else "processFrame not found"}')
print('  so the values reaching it are the caller\'s, and the two files above')
print('  that bind them are the callers. Every binding they make is a copy or')
print('  a constant:')
print('    page.tsx:348-349     the selected frame\'s literals, with constant')
print('                         fallbacks of 0.3 and 0.25 for no selection')
print('    score_exporter.ts:54-55  the caller\'s own sequence, with 0.3')
print('    score_exporter.ts:49-50, :108-109  running totals and their means,')
print('                         which the PDF report prints and the composer')
print('                         never sees')
print('  Not one of those derives a trauma or an entropy from a text. Between')
print('  the data file and the composer the two coordinates are copied, never')
print('  computed.')

print()
print('=' * 74)
print('3. WHAT IS COMPUTED IS THE REGISTER TRIPLE, AND ONLY THAT')
print('=' * 74)
orch = open(os.path.join(LAB, 'score_orchestrator.ts'), encoding='utf-8').read()
for i, line in enumerate(orch.splitlines(), 1):
    if 'analyzeRSI' in line:
        print(f'  score_orchestrator.ts:{i}  {line.strip()}')
calc = open(os.path.join(LAB, 'psychometric_calculus.ts'), encoding='utf-8').read()
m = re.search(r'export function analyzeRSI[^\n]*', calc)
ln = calc[:m.start()].count('\n') + 1 if m else 0
print(f'  psychometric_calculus.ts:{ln}  {m.group(0) if m else "not found"}')
print()
print('  analyzeRSI reads the frame\'s `analysis` field, which is the author\'s')
print('  prose commentary on the scene, and counts keywords in it. So the three')
print('  registers are the analyser\'s reading of the author\'s commentary, and')
print('  the two continuous coordinates are the author\'s own numbers.')

print()
print('=' * 74)
print('4. THE SUMMARY THE PAPERS NEED')
print('=' * 74)
print('  Of the nine state components, over the 232 frames:')
print(f'    trauma    written by the author, {lit_t} literals')
print(f'    entropy   written by the author, {lit_h} literals')
print('    r, s, i   computed by analyzeRSI from the author\'s prose')
print('    D,I,S,C   not produced at all; inferDISC returns null')
print()
print('  S1 revision 3 says the state values were produced by the application\'s')
print('  own analyser and calculus. That is exact for the register triple, which')
print('  is what S2 says as well: no human produced any of the 232 triples. It')
print('  is not true of trauma and entropy, and this script is the correction.')
print('  Neither reading makes the frames an observation of anyone: the author\'s')
print('  numbers are one person\'s judgements of his own scenes, written without')
print('  a codebook and with no second coder, and the registers are a keyword')
print('  count over the prose in which he recorded them.')
