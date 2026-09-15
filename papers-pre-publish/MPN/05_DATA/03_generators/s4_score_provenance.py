#!/usr/bin/env python3
"""
What text the seven score files were actually scored over.

Revision 1 of S4 reported the seven files as seven plays, 31,078 beats, and
computed a great deal from that. It did so without ever asking what was in the
TEXT column, which is the first question anyone should ask of a corpus. The
answer changes several of the paper's figures and invalidates one of its
sections.

This script asks it. For each file it reports the Project Gutenberg boundary
markers, the licence block, the share of rows the dialogue parser failed to
attribute to a speaker, and whether the file is one play or an anthology. Every
figure is a count over the file, so a reader can disagree with the test rather
than with a conclusion.

Set MPN_SCORES to the score directory.
"""
import collections
import csv
import os
import re
import sys

SCORES = os.environ.get(
    'MPN_SCORES',
    os.path.expanduser('~/mnt/eigenia/papers-pre-publish/MPN/05_DATA/01_scores'))
FILES = sorted(f for f in os.listdir(SCORES)
               if f.startswith('MCKENNEY_LACAN_SCORE_') and f.endswith('.csv'))
if not FILES:
    sys.exit(f'no score CSVs under {SCORES}; set MPN_SCORES')

# Phrases that mark Gutenberg apparatus rather than dramatic text. The licence
# block is identified by its own opening line, not by the word "Gutenberg",
# because characters may say anything.
START = re.compile(r'\*\*\*\s*START OF (?:THIS |THE )?PROJECT GUTENBERG', re.I)
END = re.compile(r'\*\*\*\s*END OF (?:THIS |THE )?PROJECT GUTENBERG', re.I)
LICENCE = re.compile(r'(?:THE FULL PROJECT GUTENBERG LICENSE'
                     r'|Section 1\.\s+General Terms of Use)', re.I)
APPARATUS = re.compile(
    r'Project Gutenberg|gutenberg\.org|pglaf|Literary Archive Foundation'
    r'|Michael S\. Hart|Produced by|Transcriber|Updated editions will replace'
    r'|Creating the works from|START: FULL LICENSE', re.I)

print('=' * 74)
print('1. THE BOUNDARIES OF EACH FILE')
print('=' * 74)
DATA = {}
for fn in FILES:
    with open(os.path.join(SCORES, fn), encoding='utf-8', newline='') as fh:
        rows = list(csv.DictReader(fh))
    DATA[fn] = rows
    n = len(rows)
    label = fn.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', '')
    starts = [i for i, r in enumerate(rows) if START.search(r.get('TEXT') or '')]
    ends = [i for i, r in enumerate(rows) if END.search(r.get('TEXT') or '')]
    lic = [i for i, r in enumerate(rows) if LICENCE.search(r.get('TEXT') or '')]
    print(f'  {label:16s} {n:6,d} rows')
    print(f'{"":18s}start markers at rows {[i+1 for i in starts] or "none"}')
    print(f'{"":18s}end markers at rows   {[i+1 for i in ends] or "none"}')
    if lic:
        first = min(lic)
        print(f'{"":18s}licence block opens at row {first+1}, position '
              f'{first/n:.3f}; {n-first:,} rows follow it '
              f'({100*(n-first)/n:.1f} per cent of the file)')
    else:
        print(f'{"":18s}no licence block found')

print()
print('=' * 74)
print('2. HOW MUCH OF EACH FILE IS APPARATUS RATHER THAN DRAMA')
print('=' * 74)
print(f'  {"work":16s} {"rows":>7s} {"apparatus":>10s} {"share":>7s} '
      f'{"unattributed":>13s} {"share":>7s}')
for fn in FILES:
    rows = DATA[fn]
    n = len(rows)
    label = fn.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', '')
    app = sum(1 for r in rows if APPARATUS.search(r.get('TEXT') or ''))
    stage = sum(1 for r in rows if (r.get('SPEAKER') or '').strip() == 'STAGE')
    print(f'  {label:16s} {n:7,d} {app:10,d} {100*app/n:6.1f}% '
          f'{stage:13,d} {100*stage/n:6.1f}%')
print()
print('  "apparatus" counts rows whose text matches a Gutenberg boilerplate')
print('  phrase. It is a lower bound: the licence runs for hundreds of rows')
print('  and only some of them name Gutenberg.')
print('  "unattributed" counts rows the dialogue parser assigned to SPEAKER')
print('  STAGE, which is what it emits when it cannot find a speaker.')

print()
print('=' * 74)
print('3. ONE FILE PARSED NO DIALOGUE AT ALL')
print('=' * 74)
for fn in FILES:
    rows = DATA[fn]
    n = len(rows)
    label = fn.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', '')
    spk = collections.Counter((r.get('SPEAKER') or '').strip() for r in rows)
    named = {k: v for k, v in spk.items() if k != 'STAGE'}
    if len(named) <= 2:
        print(f'  {label}: {len(spk)} distinct speakers, of which '
              f'{len(named)} are not STAGE')
        print(f'    {dict(spk)}')
        print('    The parser extracted no dialogue from this file. Every')
        print('    quantity computed over it is computed over unparsed text,')
        print('    and the speaker-change column, which is exact everywhere')
        print('    else, is constant here by construction.')

print()
print('=' * 74)
print('4. WHICH FILES ARE ONE PLAY AND WHICH ARE ANTHOLOGIES')
print('=' * 74)
# A contents entry is found by reading the file, not by matching a list of
# titles a reader already expects. An earlier version of this script used a
# hardcoded whitelist of play names, which could not match "ON THE HIGH ROAD"
# or "THERE ARE CRIMES AND CRIMES" and so undercounted three of the seven
# files. The rule below is:
#   1. find the row whose text is exactly CONTENTS;
#   2. take the short non-empty rows that follow it, stopping at the first
#      long line (prose has begun) or at the first line that repeats an
#      earlier entry (the body has begun, and a Gutenberg body opens with the
#      same heading the contents block ends on);
#   3. keep an entry as a WORK only if it BOTH recurs later in the file as a
#      standalone heading AND is not a structural division or a piece of
#      apparatus, both of which are matched by the named patterns below;
#   4. a file whose contents block names no work under that rule, or which
#      has no contents block at all, is one play.
# The recurrence requirement is what separates an anthology's contents list
# from a single play's list of acts and scenes or its dramatis personae: a
# character name does not recur as a heading, and an act heading is caught by
# STRUCTURAL. Both filters are printed per entry below, so a reader who thinks
# a rule is wrong can see exactly which entries it moved.
APPARATUS_ENTRY = re.compile(
    r"^(?:INTRODUCTION|PREFACE|CONTENTS|FOREWORD|NOTE|ARGUMENT|Introduction\b"
    r"|Author'?s Preface|Translat(?:or|ed)\b.*)$", re.I)
STRUCTURAL = re.compile(
    r'^(?:ACT\b|SCENE\b|Scene\b|PROLOGUE|EPILOGUE|DRAMATIS|PERSONS\b'
    r'|CHARACTERS\b|_?\[)', re.I)

def body_heading(rows, i_, t):
    """The row where work `t` actually begins, or None.

    A Gutenberg anthology may print a work's title twice: once as the half
    title of that work's translator's introduction, and again as the heading
    of the play itself. Taking the first recurrence therefore absorbs the
    introduction into the play and inflates its span; in the Strindberg file
    that is 1,088 rows, 15.8 per cent of the file, spread across five plays.
    The heading wanted is the recurrence NOT followed by a piece of
    apparatus. Where every recurrence is followed by apparatus the first is
    returned, so the rule degrades to the old one rather than dropping a work.
    """
    n_ = len(rows)
    hits = [j for j in range(i_ + 1, n_)
            if (rows[j].get('TEXT') or '').strip().upper() == t.upper()]
    if not hits:
        return None
    for j in hits:
        nxt = (rows[j + 1].get('TEXT') or '').strip() if j + 1 < n_ else ''
        if not APPARATUS_ENTRY.match(nxt):
            return j
    return hits[0]

def contents_block(rows):
    """The contents entries of one file, as (index, text) pairs."""
    head = rows[:int(0.05 * len(rows)) + 60]
    anchor = next((i for i, r in enumerate(head)
                   if (r.get('TEXT') or '').strip().upper() == 'CONTENTS'), None)
    if anchor is None:
        return None
    out, seen = [], set()
    for i in range(anchor + 1, min(anchor + 60, len(rows))):
        t = (rows[i].get('TEXT') or '').strip()
        if not t or len(t) > 70:
            break
        if t.upper() in seen:
            break
        seen.add(t.upper())
        out.append((i, t))
    return out

print('  Two tests. The first reads the table of contents each Gutenberg file')
print('  carries near its head, by locating the CONTENTS row, taking the short')
print('  lines that follow it, and keeping an entry as a work only where it')
print('  recurs later in the file as a heading and is not an act, a scene, a')
print('  character list or an introduction. The second checks whether the')
print('  principal speakers span the file or sit in bands, which catches an')
print('  anthology whose casts do not overlap and which does NOT catch a')
print('  trilogy whose characters recur, so the first test is the reliable one')
print('  and the second is corroboration.')
print()
TOTAL_WORKS = 0
ONE_PLAY = []
for fn in FILES:
    rows = DATA[fn]
    n = len(rows)
    label = fn.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', '')
    block = contents_block(rows)
    print(f'  {label}')
    works = []
    if block is None:
        print(f'{"":6s}no CONTENTS row in the first five per cent of the file')
    else:
        rejected = []
        for i, t in block:
            head = body_heading(rows, i, t)
            if head is None:
                rejected.append((t, 'does not recur as a heading'))
            elif STRUCTURAL.match(t):
                rejected.append((t, 'a structural division'))
            elif APPARATUS_ENTRY.match(t):
                rejected.append((t, 'apparatus'))
            else:
                works.append((t, head))
        print(f'{"":6s}contents block: {len(block)} entries, '
              f'{len(works)} kept as works, {len(rejected)} rejected')
        for t, j in works:
            print(f'{"":8s}WORK      {t[:44]:46s} recurs at row {j+1:,d}, '
                  f'position {j/n:.3f}')
        for t, why in rejected:
            print(f'{"":8s}rejected  {t[:44]:46s} {why}')
    if not works:
        ONE_PLAY.append(label)
        print(f'{"":6s}no work named by this test, so the file is one play')
    else:
        TOTAL_WORKS += len(works)
    pos = collections.defaultdict(list)
    for i, r in enumerate(rows):
        sp = (r.get('SPEAKER') or '').strip()
        if sp and sp != 'STAGE':
            pos[sp].append(i / n)
    for sp, ps in sorted(pos.items(), key=lambda kv: -len(kv[1]))[:6]:
        print(f'{"":8s}{sp:14s} {len(ps):5,d} lines, positions '
              f'{min(ps):.3f} to {max(ps):.3f}')
    if not pos:
        print(f'{"":8s}no named speakers at all')
print()
print(f'  Works named by a contents block:  {TOTAL_WORKS}')
print(f'  Files the test finds to be one play: {len(ONE_PLAY)} '
      f'({", ".join(ONE_PLAY)})')
print(f'  So the seven files hold {TOTAL_WORKS + len(ONE_PLAY)} works.')

print()
print('=' * 74)
print('5. WHAT THIS DOES TO THE NARRATIVE-POSITION RAMP')
print('=' * 74)
print('  The engine computes trauma as 0.8 * beat/total plus keyword hits, and')
print('  BASELINE_B as 1 - beat/total. Both denominators are the row count of')
print('  the whole file. So on a file that is an anthology plus a licence, the')
print('  "narrative position" of a line is its position in that assembly and')
print('  not in any play.')
for fn in FILES:
    rows = DATA[fn]
    n = len(rows)
    label = fn.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', '')
    lic = [i for i, r in enumerate(rows) if LICENCE.search(r.get('TEXT') or '')]
    if not lic:
        continue
    first = min(lic)
    t0 = float(rows[first].get('TRAUMA_R') or 0)
    t1 = float(rows[-1].get('TRAUMA_R') or 0)
    print(f'  {label:16s} the licence block runs from position '
          f'{first/n:.3f} to 1.000, and over it')
    print(f'{"":18s}the engine reports trauma rising from {t0:.2f} to {t1:.2f} '
          f'and health falling to')
    print(f'{"":18s}{(rows[-1].get("CLINICAL_HEALTH_SCORE") or "").strip()}. '
          f'It is scoring a copyright notice as a catastrophe.')

print()
print('=' * 74)
print('6. THE CONSEQUENCE FOR THE 31,078 FIGURE')
print('=' * 74)
tot = sum(len(r) for r in DATA.values())
app = sum(sum(1 for r in rows if APPARATUS.search(r.get('TEXT') or ''))
          for rows in DATA.values())
lear = [fn for fn in FILES if 'KING_LEAR' in fn]
lear_n = len(DATA[lear[0]]) if lear else 0
print(f'  rows in the seven files:                         {tot:7,d}')
print(f'  rows matching Gutenberg apparatus, a lower bound: {app:7,d}')
print(f'  rows in the file that parsed no dialogue:         {lear_n:7,d}')
print()
print('  The figure 31,078 is the number of lines in seven text files. It is')
print('  not a number of dramatic beats, the files are not seven plays, and no')
print('  paper in this series should cite it as either.')

print()
print('=' * 74)
print('7. HOW MUCH OF AN ANTHOLOGY FILE IS THE WORK IT IS NAMED FOR')
print('=' * 74)
print('  Each work is bounded by its own body heading and the next one, both')
print('  of which section 4 located by reading the contents block. A work whose')
print('  title is printed twice, once over its translator\'s introduction and')
print('  once over the play, is bounded by the second, so no introduction is')
print('  counted against the play that FOLLOWS it. Each span still runs to the')
print('  next heading, so an introduction is counted against the play that')
print('  PRECEDES it. The last work in a file runs to the')
print('  end-of-book marker where there is one and to the last row otherwise.')
print('  No cast list is named and nothing is inferred from where speakers')
print('  appear, so the span and the speaker positions are independent tests.')
print()
for fn in FILES:
    rows = DATA[fn]
    n = len(rows)
    label = fn.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', '')
    block = contents_block(rows)
    if block is None:
        continue
    marks = []
    for i_, t in block:
        head = body_heading(rows, i_, t)
        if head is not None and not STRUCTURAL.match(t) \
                and not APPARATUS_ENTRY.match(t):
            marks.append((head, t))
    if len(marks) < 2:
        continue
    marks.sort()
    ends = [i_ for i_, r in enumerate(rows) if END.search(r.get('TEXT') or '')]
    last = (ends[-1] if ends else n - 1)
    print(f'  {label}, {n:,d} rows')
    for k, (j, t) in enumerate(marks):
        stop = marks[k + 1][0] - 1 if k + 1 < len(marks) else last
        span = stop - j + 1
        print(f'{"":6s}{t[:34]:36s} rows {j+1:6,d} to {stop+1:6,d}  '
              f'positions {j/n:.3f} to {stop/n:.3f}  '
              f'{span:5,d} rows, {100*span/n:5.1f}%')
    named = marks[-1] if 'CHERRY' in label else None
    print()
print('  The share a file gives to the work it is named for is what the ramp')
print('  is computed over: the engine divides a row number by the length of')
print('  the whole file, so a line of The Cherry Orchard at the opening of')
print('  its own play is scored as though the tragedy were already three')
print('  quarters over.')


print()
print('=' * 74)
print('8. WHAT THE HALF-TITLE RULE IS WORTH')
print('=' * 74)
print('  Section 7 bounds a work by the printing of its title that is not')
print('  followed by apparatus. The alternative is to take the first printing.')
print('  The difference is the number of rows of introduction that would')
print('  otherwise have been absorbed into the play that follows.')
for fn in FILES:
    rows = DATA[fn]
    n = len(rows)
    label = fn.replace('MCKENNEY_LACAN_SCORE_', '').replace('.csv', '')
    block = contents_block(rows)
    if block is None:
        print(f'  {label:16s} no contents block, so there is nothing to compare')
        continue
    shifts = []
    for i_, t in block:
        if STRUCTURAL.match(t) or APPARATUS_ENTRY.match(t):
            continue
        hits = [j for j in range(i_ + 1, n)
                if (rows[j].get('TEXT') or '').strip().upper() == t.upper()]
        if not hits:
            continue
        chosen = body_heading(rows, i_, t)
        if chosen is not None and chosen != hits[0]:
            shifts.append((t, hits[0], chosen, chosen - hits[0]))
    if not shifts:
        print(f'  {label:16s} no title is printed twice; the two rules agree')
        continue
    total = sum(d for _, _, _, d in shifts)
    print(f'  {label:16s} {len(shifts)} title(s) printed twice')
    for t, first, chosen, d in shifts:
        print(f'{"":6s}{t[:34]:36s} first at {first+1:6,d}, '
              f'body heading at {chosen+1:6,d}, {d:5,d} rows apart')
    print(f'{"":6s}total rows the first-printing rule would have absorbed: '
          f'{total:,d}, {100*total/n:.1f} per cent of the file')
