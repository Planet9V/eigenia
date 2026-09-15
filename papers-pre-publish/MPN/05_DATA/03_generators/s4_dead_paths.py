#!/usr/bin/env python3
"""
Which of mpn_engine's public definitions are reachable, and which are not.

Revision 1 of S4 read the OCEAN-to-dynamics mapper and the DISC-to-instrument
mapper as the psychology mpn_engine implements. Both modules exist and both are
imported by the scorer. The question revision 1 did not ask is whether anything
calls them.

METHOD, AND ITS LIMITS. Every .py file under mpn_engine/ is parsed. Every
top-level function and every non-dunder method of every class is enumerated
from the parse tree rather than from a guessed list of names. Use sites are
then collected from the same parse trees: a method or function counts as used
if its bare name appears as the attribute of a call (self.x.score_beat(...)),
as the function of a call (score_beat(...)), or, for a @property, as an
attribute load (chord.pitches). Matching is by bare name and ignores the
receiver, so the count is an OVER-count wherever two classes share a method
name: a definition reported with uses may still be dead, but a definition
reported with NO use has none anywhere in the package. The negative is the
claim this script is for, and its class is exactly "the Python package
mpn_engine". A call from TypeScript is impossible because no TypeScript file
mentions mpn_engine, which s4_two_engines establishes separately.

An earlier version of this script matched call sites with a regular expression
carrying a negative lookbehind for '.', which excluded every method call made
on an object and reported MPNCalculus.score_beat as uncalled. It is called, at
batch_scorer.py:79. That version is not the one here, and the failure is the
reason this one parses instead of matching.

Set MPN_REPO to the Conductor working tree.
"""
import ast
import collections
import os
import re
import sys

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
PKG = os.path.join(ROOT, 'mpn_engine')
if not os.path.isdir(PKG):
    sys.exit(f'not found: {PKG}. Set MPN_REPO to the Conductor tree.')

FILES = []
for dirpath, dirnames, filenames in os.walk(PKG):
    dirnames[:] = [d for d in dirnames if d != '__pycache__']
    for f in sorted(filenames):
        if f.endswith('.py'):
            FILES.append(os.path.join(dirpath, f))
SRC = {p: open(p, encoding='utf-8').read() for p in FILES}
TREE = {p: ast.parse(t, filename=p) for p, t in SRC.items()}
rel = lambda p: os.path.relpath(p, ROOT)

def is_property(node):
    for d in node.decorator_list:
        n = d.id if isinstance(d, ast.Name) else getattr(d, 'attr', '')
        if n == 'property':
            return True
    return False

DEFS = []   # (qualified, bare, file, line, kind)
for p, tree in TREE.items():
    for node in tree.body:
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            DEFS.append((node.name, node.name, p, node.lineno, 'function'))
        elif isinstance(node, ast.ClassDef):
            for sub in node.body:
                if isinstance(sub, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    if sub.name.startswith('__'):
                        continue
                    kind = 'property' if is_property(sub) else 'method'
                    DEFS.append((f'{node.name}.{sub.name}', sub.name, p,
                                 sub.lineno, kind))

# Use sites, from the parse trees. CALLS maps a bare name to every (file, line)
# where something of that name is called; LOADS the same for attribute reads.
CALLS = collections.defaultdict(list)
LOADS = collections.defaultdict(list)
for p, tree in TREE.items():
    for node in ast.walk(tree):
        if isinstance(node, ast.Call):
            f = node.func
            if isinstance(f, ast.Attribute):
                CALLS[f.attr].append((p, node.lineno))
            elif isinstance(f, ast.Name):
                CALLS[f.id].append((p, node.lineno))
        elif isinstance(node, ast.Attribute) and isinstance(node.ctx, ast.Load):
            LOADS[node.attr].append((p, node.lineno))

def uses(bare, own_file, own_line, kind):
    pool = CALLS[bare] + (LOADS[bare] if kind == 'property' else [])
    return [(f, l) for f, l in pool
            if not (f == own_file and abs(l - own_line) <= 1)]

print('=' * 74)
print('1. EVERY PUBLIC DEFINITION IN mpn_engine AND ITS USE SITES')
print('=' * 74)
print(f'  {len(DEFS)} definitions across {len(FILES)} files under mpn_engine/')
print()
UNUSED = []
for qual, bare, p, line, kind in sorted(DEFS):
    u = uses(bare, p, line, kind)
    if not u:
        UNUSED.append((qual, p, line, kind))
    print(f'  {qual:42s} {kind:8s} {len(u):3d} use(s)  {rel(p)}:{line}')

print()
print('=' * 74)
print('2. THE DEFINITIONS WITH NO USE SITE ANYWHERE IN THE PACKAGE')
print('=' * 74)
for qual, p, line, kind in UNUSED:
    print(f'  {qual:42s} {kind:8s} {rel(p)}:{line}')
print()
print(f'  {len(UNUSED)} of {len(DEFS)} public definitions are never used.')
print()
print('  That headline number needs splitting, because a test method has no')
print('  caller by design: pytest collects it by name. Excluding everything')
print('  under mpn_engine/tests/:')
t_def = sum(1 for d in DEFS if os.sep + 'tests' + os.sep in d[2])
t_un = sum(1 for u in UNUSED if os.sep + 'tests' + os.sep in u[1])
print(f'    definitions outside the test suite:        {len(DEFS)-t_def:4d}')
print(f'    of those, never used anywhere:             {len(UNUSED)-t_un:4d}')
print(f'    test methods, collected by pytest by name: {t_def:4d}')
print('  A non-test definition listed above is unreachable from every entry')
print('  point in the package, the test suite included.')

print()
print('=' * 74)
print('3. THE TWO PSYCHOMETRIC MAPPERS, AND THE SCORING PATH FOR CONTRAST')
print('=' * 74)
WATCH = ['DynamicsMapper.get_dynamics',
         'DynamicsMapper.infer_profile_from_text',
         'DynamicsMapper.set_speaker_profile',
         'InstrumentMapper.get_instrument',
         'InstrumentMapper.get_ensemble',
         'InstrumentMapper.infer_profile_from_text',
         'InstrumentMapper.set_speaker_profile',
         'MPNCalculus.score_beat',
         'BatchScorer.score_beats',
         'BatchScorer.export_csv']
by_qual = {d[0]: d for d in DEFS}
for w in WATCH:
    if w not in by_qual:
        print(f'  {w:42s} not defined in the package')
        continue
    q, b, p, ln, k = by_qual[w]
    u = uses(b, p, ln, k)
    print(f'  {w:42s} {len(u):3d} use(s)  {rel(p)}:{ln}')
    for f, l in u:
        print(f'{"":6s}used at {rel(f)}:{l}  {SRC[f].splitlines()[l-1].strip()[:60]}')

print()
print('=' * 74)
print('4. EVERY MENTION OF THE MAPPERS, OF ANY KIND')
print('=' * 74)
for token in ['InstrumentMapper', 'DynamicsMapper', 'OceanProfile',
              'DISCProfile']:
    print(f'  {token}:')
    for p in FILES:
        for i, line in enumerate(SRC[p].splitlines(), 1):
            if token in line:
                print(f'{"":6s}{rel(p)}:{i}  {line.strip()[:62]}')

print()
print('=' * 74)
print('5. THE EIGHT DYNAMIC MARKINGS AND WHAT READS THEM')
print('=' * 74)
dm = os.path.join(PKG, 'core', 'dynamics_mapper.py')
marks = re.findall(r'\(([0-9.]+),\s*"([a-z]+)"\)', SRC[dm])
print(f'  DynamicsMapper.DYNAMIC_MARKINGS declares {len(marks)} markings:')
print('   ', ', '.join(f'{m} at {t}' for t, m in marks))
readers = [(rel(p), i, line.strip())
           for p in FILES
           for i, line in enumerate(SRC[p].splitlines(), 1)
           if 'DYNAMIC_MARKINGS' in line]
print(f'  lines that read DYNAMIC_MARKINGS: {len(readers)}')
for r_, i, line in readers:
    print(f'{"":6s}{r_}:{i}  {line[:62]}')

print()
print('=' * 74)
print('6. WHAT THE SCORING PATH CALLS, AND WHAT IT WRITES')
print('=' * 74)
bs = os.path.join(PKG, 'text', 'batch_scorer.py')
called = sorted({(n.func.attr if isinstance(n.func, ast.Attribute)
                  else n.func.id)
                 for n in ast.walk(TREE[bs]) if isinstance(n, ast.Call)
                 and isinstance(n.func, (ast.Attribute, ast.Name))})
print('  every name called anywhere in batch_scorer.py:')
print('   ', ', '.join(called))
print()
fields = re.search(r'fieldnames = \[(.*?)\]', SRC[bs], re.S)
print('  the fieldnames BatchScorer.export_csv writes:')
print('   ', ' '.join(fields.group(1).split()) if fields else 'not found')
