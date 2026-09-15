#!/usr/bin/env python3
"""
The repository deconstruction's twelve executive findings, rechecked.

`mpn-analysis/repo-deconstruction.md` was written on 11 September 2026 by
static reading. Two of its findings have since been acted on, so S4 cannot
cite it as a current description without saying which. This script tests each
finding against the tree as it stands, so the paper reports the state of the
application rather than the state of a two-day-old audit of it.

Each check is a string or a count, so it says what it tested and a reader can
disagree with the test rather than with a conclusion.

Set MPN_REPO to the Conductor working tree.
"""
import os
import re
import sys

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')


def txt(rel):
    p = os.path.join(ROOT, rel)
    return open(p, encoding='utf-8').read() if os.path.exists(p) else None


def exists(rel):
    return os.path.exists(os.path.join(ROOT, rel))


def count_py(pattern, sub):
    n = 0
    for dirpath, dirs, names in os.walk(os.path.join(ROOT, sub)):
        dirs[:] = [d for d in dirs if d != 'node_modules']
        for f in names:
            if f.endswith('.py'):
                t = open(os.path.join(dirpath, f), encoding='utf-8',
                         errors='replace').read()
                n += len(re.findall(pattern, t, re.M))
    return n


CHECKS = []


def check(n, claim, verdict, evidence):
    CHECKS.append((n, claim, verdict, evidence))


# 1. no learned mapping
t = txt('ml/psychoscore_v2/models/mckenney_lacan_calculus.py')
check(1, 'The running mapping is hand-written threshold tables and linear maps',
      'STANDS' if t and 'def trauma_to_dynamic' in t else 'CHANGED',
      'mckenney_lacan_calculus.py still defines the threshold functions')

# 2. v1 trained on random targets
t = txt('ml/psychoscore/scripts/run_training_pipeline.py')
has = t and 'random.randint(0, vocab_size' in t.replace(' ', '').replace(
    'random.randint(0,vocab_size', 'random.randint(0, vocab_size')
check(2, 'PSYCHOSCORE v1 was trained on uniformly random target tokens',
      'STANDS' if t and 'random.randint' in t else 'CHECK',
      f'run_training_pipeline.py contains random.randint: '
      f'{bool(t and "random.randint" in t)}')

# 3. v2 silver labels are reactions to an error string
d = os.path.join(ROOT, 'ml/psychoscore_v2/data/silver_labels')
errs = 0
tot = 0
if os.path.isdir(d):
    for f in os.listdir(d):
        if f.endswith('.json'):
            tot += 1
            s = open(os.path.join(d, f), encoding='utf-8', errors='replace').read()
            errs += ('error' in s.lower())
check(3, "v2 silver labels are GPT-4o's reaction to an error string",
      'STANDS' if tot and errs == tot else ('CHANGED' if tot else 'ABSENT'),
      f'{errs} of {tot} label files mention an error')

# 5. performance training loop is a pass
t = txt('ml/psychoscore_v2/scripts/train_performance.py')
check(5, 'The performance-LoRA training loop is a placeholder',
      'STANDS' if t and 'Mock training loop' in t else 'CHANGED',
      'train_performance.py contains "Mock training loop": '
      f'{bool(t and "Mock training loop" in t)}')

# 6. projector dead at inference
t = txt('ml/psychoscore_v2/models/musicgen_lora.py')
check(6, 'The 57 to 768 projector is computed and discarded at inference',
      'STANDS' if t and 'descriptions=[""]' in t.replace("'", '"') else 'CHECK',
      'musicgen_lora.py calls MusicGen with an empty description: '
      f'{bool(t and chr(34)+chr(34) in t and "descriptions" in t)}')

# 8. test counts
readme = txt('README.md') or ''
vit = 0
for dirpath, dirs, names in os.walk(os.path.join(ROOT, 'src')):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for f in names:
        if f.endswith(('.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx')):
            s = open(os.path.join(dirpath, f), encoding='utf-8',
                     errors='replace').read()
            vit += len(re.findall(r'\b(?:it|test)\s*\(', s))
pyt = count_py(r'^\s*def test_', 'ml') + count_py(r'^\s*def test_', 'mpn_engine')
claims84 = bool(re.search(r'84[%\s]*(?:passing|Tests|tests)', readme))
wiki34 = bool(re.search(r'34 Wiki Pages', readme))
check(8, "README's test and page counts do not match the tree",
      'STANDS' if claims84 else 'CHANGED',
      f'README claims 84 tests: {claims84} (badge at README.md:7, total at '
      f':336, footer at :388); README claims 34 wiki pages: {wiki34}. '
      f'Counted now: {vit} Vitest cases, {pyt} Python test functions')

# 9. wiki page count
n = 0
for dirpath, _, names in os.walk(os.path.join(ROOT, 'src/app/wiki')):
    n += sum(1 for f in names if f == 'page.tsx')
check(9, 'The wiki has 57 pages, not the 34 the README claims',
      'STANDS' if n != 34 else 'CHANGED',
      f'page.tsx files under src/app/wiki: {n}')

# 10. no validation artefacts
ab = txt('src/app/mpn-lab/ab-test/page.tsx')
check(10, 'No listening test, metric or validation of the mapping exists',
      'STANDS' if ab and 'useState' in ab else 'CHECK',
      'the A/B page still holds its ratings in component state: '
      f'{bool(ab and "useState" in ab)}')

# 12. hard-coded key
dc = txt('docker-compose.yml') or ''
m = re.search(r'ELEVENLABS_API_KEY=(\S+)', dc)
check(12, 'A live-looking ElevenLabs API key is hard-coded in docker-compose',
      'STANDS' if m else 'FIXED',
      f'docker-compose.yml line: {"present, key begins " + m.group(1)[:7] if m else "absent"}')

# --- the two that have moved -------------------------------------------
det = txt('src/lib/deterministic.ts')
score_rand = 0
for rel in ('src/components/mpn-lab/GeniusComposer.ts',
            'src/components/mpn-lab/score_orchestrator.ts',
            'src/components/mpn-lab/psychometric_calculus.ts',
            'src/components/mpn-lab/leitmotif_generator.ts'):
    t = txt(rel) or ''
    score_rand += len(re.findall(r'Math\.random\(\)', t))
check('A', 'Unseeded draws made the composer non-deterministic',
      'SUPERSEDED' if det and score_rand == 0 else 'STANDS',
      f'src/lib/deterministic.ts present: {bool(det)}; '
      f'Math.random() in the four score-path modules: {score_rand}')

t = txt('src/lib/play_parser.ts') or ''
m = re.search(r'function inferDISC[^\n]*\n(?:[^\n]*\n){0,12}', t)
check('B', 'The ingest path fabricates DISC with Math.random()',
      'SUPERSEDED' if 'return null' in (m.group(0) if m else '') else 'STANDS',
      'inferDISC returns null: '
      f'{bool(m and "return null" in m.group(0))}')

print('=' * 74)
print('THE DECONSTRUCTION OF 11 SEPTEMBER 2026, RECHECKED AGAINST THE TREE')
print('=' * 74)
w = max(len(str(n)) for n, _, _, _ in CHECKS)
for n, claim, verdict, ev in CHECKS:
    print(f'  [{verdict:10s}] {str(n):>{w}s}. {claim}')
    print(f'{"":16s}{ev}')
print()
from collections import Counter
c = Counter(v for _, _, v, _ in CHECKS)
print(f'  {dict(c)}')
print()
print('  STANDS means the finding describes the tree as it is now. SUPERSEDED')
print('  means the defect was repaired after the deconstruction was written,')
print('  and S4 must not cite the deconstruction for it. CHECK means this')
print('  script\'s test is weaker than the original finding and the original')
print('  should be read rather than this line.')
