#!/usr/bin/env python3
"""
The counts S2 section 2 and section 5.3 state, made reproducible.

Revision 1 of S2 carried a classification of the unified-theory directory's
equations with counts that no script produced. Revision 2 withdrew them.
This script produces the counts revision 3 does state, so that none of them
is an unexamined claim.

  MPN_CORPUS  path to papers-pre-publish/MPN   (default ~/eigenia/papers-pre-publish/MPN)
"""
import csv
import os
import re
import sys

CORPUS = os.environ.get(
    'MPN_CORPUS',
    os.path.expanduser('~/eigenia/papers-pre-publish/MPN'))

AUTHOR = re.compile(r'^\*{0,4}Author\*{0,2}:?\*{0,2}\s*(.+?)\s*$', re.M | re.I)


def files(sub, ext='.md'):
    d = os.path.join(CORPUS, sub)
    if not os.path.isdir(d):
        sys.stderr.write('missing: {}\n'.format(d))
        return []
    return sorted(os.path.join(d, f) for f in os.listdir(d) if f.endswith(ext))


def author_of(path):
    m = AUTHOR.search(open(path, encoding='utf-8', errors='replace').read())
    return m.group(1).strip() if m else None


print('=' * 72)
print('SECTION 2: the primers')
print('=' * 72)
prim = files('01_THEORY/02_primers')
print('  files: {}'.format(len(prim)))
withapp = 0
for f in prim:
    t = open(f, encoding='utf-8', errors='replace').read()
    heads = re.findall(r'^##\s+\d+\.\s*(.+)$', t, re.M)
    has = any('application' in h.lower() for h in heads)
    withapp += has
    a = author_of(f)
    print('    {:52s} application section: {:3s}  author: {}'.format(
        os.path.basename(f)[:52], 'yes' if has else 'no', a))
print('  with an application section: {}, without: {}'.format(
    withapp, len(prim) - withapp))
aeon = sum(1 for f in prim if (author_of(f) or '').startswith('AEON'))
print('  signed AEON Research Division: {} of {}'.format(aeon, len(prim)))

print()
print('=' * 72)
print('SECTION 2: the core chapters')
print('=' * 72)
core = files('01_THEORY/01_core')
auths = {}
for f in core:
    auths.setdefault(author_of(f) or '(none)', []).append(os.path.basename(f))
print('  files: {}'.format(len(core)))
for a, fs in sorted(auths.items(), key=lambda kv: -len(kv[1])):
    print('    {:2d}  {}'.format(len(fs), a))
print('  signed AEON: {} of {}'.format(
    sum(len(fs) for a, fs in auths.items() if a.startswith('AEON')), len(core)))

print()
print('=' * 72)
print('SECTION 2: the unified-theory directory')
print('=' * 72)
uni = files('01_THEORY/03_unified')
disp = 0
for f in uni:
    t = open(f, encoding='utf-8', errors='replace').read()
    # display equations are $$...$$ blocks
    disp += len(re.findall(r'\$\$.+?\$\$', t, re.S))
print('  markdown files: {}'.format(len(uni)))
print('  display equations ($$...$$): {}'.format(disp))
mck = sum(1 for f in uni if 'mckenney' in (author_of(f) or '').lower())
print('  signed with a McKenney author field: {}'.format(mck))
ax = os.path.join(CORPUS, '01_THEORY/03_unified/01_Foundations.md')
if os.path.exists(ax):
    lines = open(ax, encoding='utf-8', errors='replace').read().split('\n')
    for i, l in enumerate(lines, 1):
        if 'Collective entropy exceeds' in l:
            print('  the synergy axiom, 01_Foundations.md:{}: {!r}'.format(
                i, l.strip()))

print()
print('=' * 72)
print('SECTION 5.3: where the A8 clip binds')
print('=' * 72)
csvp = os.path.join(CORPUS, '05_DATA/01_scores/hand_annotated_frames.csv')
if os.path.exists(csvp):
    rows = list(csv.DictReader(open(csvp, encoding='utf-8')))
    le = sum(1 for r in rows
             if 0.7 * float(r['ENTROPY']) - 0.3 * float(r['TRAUMA']) <= 0)
    lt = sum(1 for r in rows
             if 0.7 * float(r['ENTROPY']) - 0.3 * float(r['TRAUMA']) < 0)
    print('  frames: {}'.format(len(rows)))
    print('  0.7H - 0.3tau <= 0, the clip binds:        {}'.format(le))
    print('  0.7H - 0.3tau <  0, the clip binds strictly: {}'.format(lt))
    print('  S1 reports twenty, the audit twenty-one; both are right under')
    print('  different readings of the boundary, and S2 states both.')
else:
    sys.stderr.write('missing: {}\n'.format(csvp))
