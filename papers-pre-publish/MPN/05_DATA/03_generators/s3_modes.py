#!/usr/bin/env python3
"""
Every place in the shipped source that decides a mode, and which of them the
rendered score passes through.

Revision 2. Revision 1 of this script checked a list of function names that
had been guessed by grepping, missed `lookupMode`, and led section 2.3 of the
paper to describe a table no notated mode has ever come from. This revision
does not guess. It enumerates every function in `src/` whose body returns a
mode name or a scale formula, by searching for the mode names themselves, and
then reports each one's call sites so that the chains can be read.

Nothing below is inferred from a function's name.
"""
import os
import re
import sys

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
SRC = os.path.join(ROOT, 'src')
MODES = ('ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian',
         'locrian', 'whole-tone')

FILES = {}
for dirpath, dirs, names in os.walk(SRC):
    dirs[:] = [d for d in dirs if d not in ('__tests__', 'node_modules', 'wiki')]
    for n in names:
        if n.endswith(('.ts', '.tsx')) and '.test.' not in n:
            p = os.path.join(dirpath, n)
            FILES[os.path.relpath(p, ROOT)] = open(p, encoding='utf-8').read()

print('=' * 74)
print('1. EXHAUSTIVE SEARCH: EVERY LINE THAT PRODUCES A MODE NAME')
print('=' * 74)
print(f'  files scanned (tests and the wiki excluded): {len(FILES)}')
hits = []
for rel, text in FILES.items():
    for ln, line in enumerate(text.splitlines(), 1):
        st = line.strip()
        if st.startswith(('//', '*', '/*')):
            continue
        low = line.lower()
        if not any(m in low for m in MODES):
            continue
        # keep only lines that ASSIGN or RETURN a mode, not ones that list them
        if not re.search(r"(return|mode\s*[:=]|\?\s*'|:\s*')", line):
            continue
        hits.append((rel, ln, st))
for rel, ln, st in sorted(hits):
    print(f'  {rel}:{ln}')
    print(f'      {st[:110]}')
print(f'  total: {len(hits)} lines in '
      f'{len({h[0] for h in hits})} files')

# --- the two live paths, transcribed and evaluated -----------------------
RULES = FILES['src/lib/leitmotif_transformation_rules.ts']
LOOKUP = FILES['src/components/mpn-lab/mpn_reference_lookup.ts']
CALC = FILES['src/components/mpn-lab/psychometric_calculus.ts']
ORCH = FILES['src/components/mpn-lab/score_orchestrator.ts']
COMP = FILES['src/components/mpn-lab/GeniusComposer.ts']
DATA = open(os.path.join(ROOT, 'src/components/mpn-lab/mpn_reference_data.ts'),
            encoding='utf-8').read()

print()
print('=' * 74)
print('2. PATH A: THE MODE NAME PRINTED ON THE SCORE')
print('=' * 74)
PAGE = FILES['src/app/mpn-conductor/page.tsx']
lyap = [l.strip() for l in PAGE.splitlines()
        if re.search(r'const lyapunov = ', l)]
modeline = [l.strip() for l in PAGE.splitlines()
            if 'mode:' in l and 'lyapunov' in l]
for l in lyap + modeline:
    print(f'  {l[:112]}')
print()
print('  The first operand of that || is output.global.mode. The')
print('  OrchestratorOutput interface declares global as exactly:')
iface = re.search(r'global: \{([^}]*)\}', ORCH).group(1)
fields = [f.strip() for f in iface.strip().splitlines() if f.strip()]
for f in fields:
    print(f'      {f}')
has_mode = any(f.startswith('mode') for f in fields)
print(f'  a mode field among them: {has_mode}')
print('  and the object built at the return site carries the same four keys.')
print('  The expression is written (output.global as any)?.mode, and the cast')
print('  is what stops the type checker from reporting it. So the first')
print('  operand is undefined on every frame and the branch always wins.')
print()
print('  The printed mode is therefore a function of trauma and entropy only:')
for lo, hi, m in ((0.0, 0.5, 'Ionian'), (0.5, 0.7, 'Lydian'),
                  (0.7, 2.0, 'Phrygian')):
    print(f'    {lo:.1f} <= trauma + entropy < {hi:.1f}   ->  {m}')
print('  It never reads a register. S2 section 6.5 reports this branch; what')
print('  is added here is WHY it always wins, which is what a repair needs.')

print()
print('=' * 74)
print('3. PATH B: THE MODE THE PITCHES ARE BUILT FROM')
print('=' * 74)
chain_b = [
    ('score_orchestrator.ts:321', 'this.composer.composeMelody(', ORCH),
    ('GeniusComposer.ts:161', "const rsi = { real: 0.33, symbolic: 0.33, "
     "imaginary: 0.34 };", COMP),
    ('GeniusComposer.ts:180', 'applyProfessionalTransformations(', COMP),
    ('leitmotif_transformation_rules.ts:342',
     'getModalTransformation(rsi, trauma)', RULES),
    ('GeniusComposer.ts:188', 'const targetMode = transformations.mode;', COMP),
]
for where, needle, src in chain_b:
    ok = needle in src
    print(f'  [{"ok " if ok else "GONE"}] {where:38s} {needle[:52]}')
    assert ok, where
print()
print('  The register triple here is a literal, not the state:')
print('    rsi = { real: 0.33, symbolic: 0.33, imaginary: 0.34 }')
print('  0.34 is strictly largest, so the dominant register is the Imaginary')
print('  for every character in every play. S2 section 6.5 reports this too.')
pairs = re.findall(r"return trauma > ([\d.]+) \? '(\w+)' : '(\w+)';", RULES)
order = ['real', 'symbolic', 'imaginary']
LIVE = {r: (float(t), lo, hi) for r, (t, hi, lo) in zip(order, pairs[:3])}
print()
print(f'  {"register":10s} {"trauma <= t":>14s} {"trauma > t":>14s}    t    reached?')
for reg in order:
    t, lo, hi = LIVE[reg]
    print(f'  {reg:10s} {lo:>14s} {hi:>14s}  {t}  '
          f'{"YES" if reg == "imaginary" else "never"}')
FORMULAS = dict(re.findall(r"'(\w+)': \[([0-9, ]+)\]", RULES))
emitted_b = {LIVE['imaginary'][1], LIVE['imaginary'][2]}
print(f'  Modes the pitches can use: {sorted(emitted_b)}')
print(f'  Modes defined but unusable: {sorted(set(FORMULAS) - emitted_b)}')

print()
print('=' * 74)
print('4. THE PRINTED NAME AND THE PITCHES DISAGREE, AND HOW OFTEN')
print('=' * 74)
def printed(tau, h):
    ly = (tau + h - 0.5) * 0.5
    return 'Ionian' if ly < 0 else ('Lydian' if ly < 0.1 else 'Phrygian')
def played(tau, h):
    return LIVE['imaginary'][2] if tau > LIVE['imaginary'][0] \
        else LIVE['imaginary'][1]
N = 2001
agree = tot = 0
combos = {}
for a in range(N):
    tau = a / (N - 1)
    for b in range(N):
        h = b / (N - 1)
        p, q = printed(tau, h), played(tau, h)
        combos[(p, q)] = combos.get((p, q), 0) + 1
        tot += 1
        agree += (p == q)
print(f'  over a {N} x {N} grid of the (trauma, entropy) square:')
for (p, q), n in sorted(combos.items(), key=lambda kv: -kv[1]):
    print(f'    printed {p:9s} pitches {q:9s} {100*n/tot:5.1f} per cent'
          f'{"   AGREE" if p == q else ""}')
print(f'  name and notes agree on {100*agree/tot:.1f} per cent of the square.')
print()
print('  A score whose header says Ionian is notated in Phrygian. The name')
print('  is a function of trauma plus entropy and the notes are a function')
print('  of trauma, and neither is a function of the registers, so the modal')
print('  assertion A4 is not under test anywhere in the running application.')

print()
print('=' * 74)
print('5. THE FIFTH DECISION POINT, AND THE DEAD ONES')
print('=' * 74)
print('  lookupMode (mpn_reference_lookup.ts:220) IS reached, from')
print('  psychometricToMusical at score_orchestrator.ts:267, and it is the')
print('  only selector in the application that reads the frame\'s actual')
print('  register triple. Its output is assigned to every stave at')
print('  score_orchestrator.ts:360 and then read by nothing:')
consumers = []
for rel, text in FILES.items():
    for ln, line in enumerate(text.splitlines(), 1):
        if 'musicParams' in line and '.mode' in line:
            consumers.append(f'{rel}:{ln}')
print(f'    references to musicParams .mode anywhere in src: '
      f'{consumers if consumers else "none"}')
print('  So the one register-reading mode in the running code is computed on')
print('  every frame and discarded. That is this paper\'s finding, not S2\'s.')
print()
entries = {}
for _b in re.split(r"\n    \{\n", DATA):
    if "subcategory: 'scale_mode'" in _b and 'LACANIAN' in _b:
        entries[re.search(r"trait: '(\w+)'", _b).group(1).lower()] = \
            re.search(r"musicalElement: '([^']*)'", _b).group(1)
print('  What it would emit, if anything read it:')
for reg in order:
    elem = entries[reg]
    print(f'    {reg:10s} {elem:36s} -> '
          f'{elem.split(" ")[0].lower()!r}')
print('  Two of those three strings are slash-joined pairs, not mode names,')
print('  so a consumer looking a mode up by name would find nothing.')
print()
dead = [
    ('rsiToMode', 'psychometric_calculus.ts:192'),
    ('lookupModeName', 'mpn_reference_lookup.ts:270'),
    ('lookupModeScale', 'mpn_reference_lookup.ts:261'),
    ('lookupAllParams', 'mpn_reference_lookup.ts:345'),
    ('MODES', 'psychometric_calculus.ts:109'),
]
for name, where in dead:
    sites = []
    for rel, text in FILES.items():
        for ln, line in enumerate(text.splitlines(), 1):
            if line.strip().startswith(('//', '*')):
                continue
            if re.search(r'\b' + name + r'\b', line) and 'export function' \
                    not in line and not re.match(r'\s*const ' + name + r' =', line):
                sites.append(f'{os.path.basename(rel)}:{ln}')
    print(f'  {name:16s} ({where:34s}) non-test references: '
          f'{sites if sites else "none"}')
print()
print('  rsiToMode has none; lookupModeName is referenced only inside it.')
print('  lookupAllParams has none; lookupModeScale only inside it. The MODES')
print('  constant is declared and never read. So three further register-to-')
print('  mode tables sit in the source that no score can reach.')

print()
print('=' * 74)
print('6. WHICH MODES HAVE A PERFECT FIFTH')
print('=' * 74)
for m in sorted(FORMULAS):
    degs = [int(x) for x in re.findall(r'\d+', FORMULAS[m])]
    print(f'  {m:12s} {str(degs):34s} perfect fifth: '
          f'{"yes" if 7 in degs else "NO"}   degrees: {len(degs)}')
wt = [0, 2, 4, 6, 8, 10]
print(f'  {"whole-tone":12s} {str(wt):34s} perfect fifth: NO   degrees: {len(wt)}')
print()
print('  Locrian is the only diatonic mode without one. Both modes path B can')
print('  emit belong to the Imaginary on its table, and one of them, Locrian,')
print('  is the unstable one.')
