#!/usr/bin/env python3
"""
Everywhere the register triple is read, and what each reading reaches.

Twice now a draft of S3 has asserted a global negative about the registers on
the strength of a search that was narrower than the claim. The first time the
search was for a guessed list of function names. The second time it was for
mode names, and the conclusion drawn, that the registers reach nothing in the
build, is false: they reach the leitmotif transformation, the key and the
chord type, and only the MODE is beyond them.

This script searches for the thing the claim is about. It finds every line in
the non-test source that reads a register component, prints it, and groups the
readings by what they go on to set. A claim about register reach has to be
made against this list and not against a shorter one.
"""
import os
import re
import sys

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
SRC = os.path.join(ROOT, 'src')

FILES = {}
for dirpath, dirs, names in os.walk(SRC):
    dirs[:] = [d for d in dirs if d not in ('__tests__', 'node_modules', 'wiki')]
    for n in names:
        if n.endswith(('.ts', '.tsx')) and '.test.' not in n:
            p = os.path.join(dirpath, n)
            FILES[os.path.relpath(p, ROOT)] = open(p, encoding='utf-8').read()

READ = re.compile(r'\b(?:rsi|registers?|state\.rsi)\b[^\n]*?'
                  r'\.(?:real|symbolic|imaginary)\b'
                  r'|\.(?:real|symbolic|imaginary)\b')

print('=' * 74)
print('1. EVERY LINE THAT READS A REGISTER COMPONENT')
print('=' * 74)
print(f'  files scanned (tests and the wiki excluded): {len(FILES)}')
hits = []
for rel, text in sorted(FILES.items()):
    for ln, line in enumerate(text.splitlines(), 1):
        st = line.strip()
        if st.startswith(('//', '*', '/*')) or not st:
            continue
        if READ.search(line):
            hits.append((rel, ln, st))
for rel, ln, st in hits:
    print(f'  {rel}:{ln}')
    print(f'      {st[:104]}')
print(f'  total: {len(hits)} lines in {len({h[0] for h in hits})} files')

print()
print('=' * 74)
print('2. THE READINGS THAT REACH A RENDERED SCORE')
print('=' * 74)
CHAINS = [
    ('the leitmotif transformation, and so the pitches',
     [('score_orchestrator.ts:315',
       'const transformation = selectTransformation(trauma, entropy, rsi);'),
      ('leitmotif_generator.ts:257',
       "if (rsi.real > 0.6) return 'chromatic_descent';"),
      ('leitmotif_generator.ts:260',
       "if (rsi.imaginary > 0.6) return 'whole_tone_ascent';"),
      ('score_orchestrator.ts:316',
       'const transformedMotif = transformLeitmotif(stave.leitmotif, transformation);')]),
    ('the key, which IS on the output interface',
     [('psychometric_calculus.ts:359', "if (state.rsi.real > 0.6) key = 'C# minor';"),
      ('psychometric_calculus.ts:360',
       "else if (state.rsi.imaginary > 0.6) key = 'E Major';"),
      ('psychometric_calculus.ts:361',
       "else if (state.rsi.symbolic > 0.6) key = 'G Major';"),
      ('score_orchestrator.ts:272', 'this.globalKey = globalParams.key;')]),
    ('the tension, and through it the chord type and the harmony',
     [('psychometric_calculus.ts:320',
       'const tension = (state.rsi.real * 0.9) + (state.entropy * 0.1);'),
      ('psychometric_calculus.ts:323',
       'const chordType = tensionToChordType(tension);')]),
    ('the mode, computed and then discarded',
     [('psychometric_calculus.ts:313',
       'const mode = lookupMode(likelyEmotion, state.rsi, adjustments);'),
      ('score_orchestrator.ts:360', 'stave.musicParams = globalParams;')]),
]
ALL = '\n'.join(FILES.values())
bad = 0
for what, lines in CHAINS:
    print(f'  {what}:')
    for where, needle in lines:
        ok = needle in ALL
        bad += not ok
        print(f'    [{"ok " if ok else "GONE"}] {where:34s} {needle[:62]}')
if bad:
    sys.exit('\na cited line has changed; this script no longer describes the code.')

print()
print('=' * 74)
print('3. WHAT THE REGISTERS DO AND DO NOT REACH')
print('=' * 74)
print('  REACHED, on the live path, from the frame\'s actual triple:')
print('    the leitmotif transformation, hence every pitch in the melody')
print('    the key signature, which is on OrchestratorOutput.global')
print('    the tension, hence the chord type and the harmony readout')
print()
print('  NOT REACHED:')
print('    the mode. The printed name is a branch on trauma plus entropy;')
print('    the modal transformation inside the composer is fed a hard-coded')
print('    triple; and the one selector that reads the registers has its')
print('    answer stored on every stave and read by nothing.')
print()
print('  So the correct statement is narrow: the registers reach the score,')
print('  and they do not reach the MODE. A4 is what is untested, not the')
print('  register dimensions as a whole. Two drafts of section 3 said')
print('  otherwise and both were wrong.')

print()
print('=' * 74)
print('4. THE THRESHOLD STRUCTURE, WHICH IS ITS OWN FINDING')
print('=' * 74)
THRESH = [(w, n) for _, ls in CHAINS for w, n in ls if '0.6' in n]
LINEAR = [(w, n) for _, ls in CHAINS for w, n in ls if 'tension = ' in n]
print('  NO live register reading compares the registers against each other.')
print(f'  Every one reads a single component in isolation. {len(THRESH)} are')
print('  thresholds at 0.6:')
for where, needle in THRESH:
    print(f'    {where:34s} {needle}')
print(f'  COUNTS FOR THE PAPER: thresholds {len(THRESH)}, linear '
      f'{len(LINEAR)}, total live register readings '
      f'{len(THRESH) + len(LINEAR)}. Section 3 of S3 must use these numbers')
print('  and not a transcribed pair.')
print()
print(f'  and {len(LINEAR)} is linear in the Real alone, reaching the harmony')
print('  readout as a continuous number and the chord type through a five-way')
print('  cut:')
for where, needle in LINEAR:
    print(f'    {where:34s} {needle}')
CUTS = re.findall(r"if \(tension < ([\d.]+)\) return '(\w+)';",
                  FILES['src/components/mpn-lab/psychometric_calculus.ts'])
print(f'    tensionToChordType cuts: '
      f'{[float(c) for c, _ in CUTS]} -> {[m for _, m in CUTS]} and above')
print()
print('  The sole comparison between components anywhere in the build is')
print('  lookupMode\'s descending sort, and section 3 above shows its answer')
print('  is discarded. So a state at (0.59, 0.21, 0.20) and one at')
print('  (0.34, 0.33, 0.33) take the same branch on every threshold and')
print('  differ on the chord type only through the Real. What reaches a score')
print('  is the value of individual registers, chiefly the Real, and not')
print('  which register leads: a weaker quantity than A4 is about and a')
print('  different one from A3\'s competition.')
print()
print('  An earlier revision of this script printed only the four thresholds')
print('  here and supported a generalisation its own section 2 contradicted.')
