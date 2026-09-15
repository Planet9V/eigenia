#!/usr/bin/env python3
"""
The two implementations, side by side.

The programme has two programs. The MPN Conductor is a TypeScript application
under `src/`; `mpn_engine/` is a standalone Python package. Neither imports the
other and no file is shared: a search of `src/` for "mpn_engine" and of
`mpn_engine/` for any Conductor module returns nothing. They implement the same
named quantities differently, and the programme's largest empirical artefact,
the 31,078 scored beats, comes from the Python one while the theory papers
describe the TypeScript one.

This script sets the two against each other on every quantity both name, and
computes the consequences of the differences rather than listing them.

Set MPN_REPO to the Conductor working tree.
"""
import collections
import itertools
import os
import re
import sys

ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')


def read(rel):
    p = os.path.join(ROOT, rel)
    if not os.path.exists(p):
        sys.exit(f'not found: {p}. Set MPN_REPO to the Conductor tree.')
    return open(p, encoding='utf-8').read()


ENGINE_CALC = read('mpn_engine/core/mpn_calculus.py')
ENGINE_DYN = read('mpn_engine/core/dynamics_mapper.py')
ENGINE_TON = read('mpn_engine/core/tonnetz.py')
TS_CALC = read('src/components/mpn-lab/psychometric_calculus.ts')
TS_RULES = read('src/lib/leitmotif_transformation_rules.ts')
PY_CALC = read('ml/psychoscore_v2/models/mckenney_lacan_calculus.py')

print('=' * 74)
print('1. THEY SHARE NO CODE')
print('=' * 74)
hits = []
for dirpath, dirs, names in os.walk(os.path.join(ROOT, 'src')):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for n in names:
        if n.endswith(('.ts', '.tsx')):
            t = open(os.path.join(dirpath, n), encoding='utf-8').read()
            if 'mpn_engine' in t:
                hits.append(os.path.relpath(os.path.join(dirpath, n), ROOT))
print(f'  files under src/ mentioning mpn_engine: {hits or "none"}')
back = []
for dirpath, _, names in os.walk(os.path.join(ROOT, 'mpn_engine')):
    for n in names:
        if n.endswith('.py'):
            t = open(os.path.join(dirpath, n), encoding='utf-8').read()
            for mod in ('psychometric_calculus', 'score_orchestrator',
                        'GeniusComposer', 'mpn_reference_data'):
                if mod in t:
                    back.append((os.path.relpath(os.path.join(dirpath, n), ROOT), mod))
print(f'  files under mpn_engine/ mentioning a Conductor module: '
      f'{back or "none"}')
print()
print('  So the 31,078 beats and the application are separate programs. A')
print('  reader who takes the scores as evidence about the Conductor is taking')
print('  the output of one implementation as evidence about another.')

print()
print('=' * 74)
print('2. THEY TAKE DIFFERENT PSYCHOLOGIES AS INPUT')
print('=' * 74)
print('  The theory, S1 through S3, and the Conductor use the nine-component')
print('  state p = (tau, H, r, s, i, D, I, S, C): trauma, entropy, the three')
print('  Lacanian registers and the four DISC coordinates.')
print()
ocean = re.search(r'class OceanProfile.*?(?=\n@|\nclass |\Z)', ENGINE_DYN, re.S)
fields = re.findall(r'^\s{4}(\w+): float', ocean.group(0), re.M) if ocean else []
print(f'  mpn_engine drives its music from OceanProfile{tuple(fields)}, the')
print('  Big Five. Not one of those five is a component of the state the')
print('  theory defines, and the state the theory defines reaches none of the')
print('  musical parameters mpn_engine computes:')
for label, pat in (('dynamic marking', r'dynamic_marking = "mf".*?profile\.(\w)'),
                   ('articulation', r'if profile\.(\w) > 0\.7'),
                   ('velocity', r'base_velocity = int\(profile\.(\w)'),
                   ('modulation', r'modulation = int\(profile\.(\w)'),
                   ('tempo style', r'tempo_style = .*?profile\.(\w)')):
    m = re.search(pat, ENGINE_DYN, re.S)
    print(f'    {label:18s} <- OCEAN {m.group(1) if m else "?"}')
m = re.search(r'trauma_boost = int\(trauma_R \* (\d+)\)', ENGINE_DYN)
print(f'    trauma enters once, as a velocity boost of at most '
      f'{m.group(1) if m else "?"} out of 127.')

# CORRECTION, 13 September 2026. The table above describes what
# dynamics_mapper.py and instrument_mapper.py WOULD do. Neither is ever called.
# s4_dead_paths.py enumerates every public definition in the package from the
# parse tree and finds zero use sites for get_dynamics, get_ensemble, both
# infer_profile_from_text and both set_speaker_profile. BatchScorer constructs
# the two mappers at batch_scorer.py:34-35 and never touches them again, and
# the nine columns export_csv writes hold no dynamic, no instrument and no Big
# Five value. This block is left in place rather than deleted because S4
# revision 1 cited it; S4 revision 2 section 2.1 states the corrected finding.
print()
print('  CORRECTION. Neither mapper is ever called: see s4_dead_paths.py, which')
print('  finds zero use sites for every entry point of both. BatchScorer builds')
print('  them at batch_scorer.py:34-35 and never touches them again, and the')
print('  nine columns it writes hold no dynamic, no instrument and no Big Five')
print('  value. The table above is a reading of dead code, and on the path that')
print('  produced the score files mpn_engine implements no psychology at all.')

print()
print('=' * 74)
print('3. THE OCEAN PROFILE CANNOT GO BELOW THE MIDPOINT')
print('=' * 74)
body = re.search(r'def infer_profile_from_text.*?return OceanProfile\(.*?\)',
                 ENGINE_DYN, re.S).group(0)
words = {k: re.findall(r"'([a-z]+)'", m.group(1))
         for k, m in ((k, re.search(rf"{k}_words = \[([^\]]*)\]", body))
                      for k in 'ocean') if m}
print('  infer_profile_from_text starts every factor at 0.5 and only adds:')
for k in 'ocean':
    m = re.search(rf"{k}_words = \[([^\]]*)\]", body)
    ws = re.findall(r"'([a-z]+)'", m.group(1)) if m else []
    extra = []
    if re.search(rf"{k}_score \+= all_text\.count\('!'\)", body):
        extra.append("plus 0.02 per '!'")
    if re.search(rf"{k}_score \+= all_text\.count\('\?'\)", body):
        extra.append("plus 0.01 per '?'")
    print(f'    {k.upper()}: 0.5 + 0.05 for each of {len(ws)} words '
          f'{ws}' + (('  ' + '; '.join(extra)) if extra else ''))
print()
print('  Every factor is therefore confined to [0.5, 1.0]. No character in any')
print('  play can score below the midpoint on any Big Five factor, whatever')
print('  they say or do. The instrument has no lower half.')
marks = re.findall(r'\(([\d.]+), "(\w+)"\)', ENGINE_DYN)
reach = [mk for th, mk in marks if float(th) >= 0.5]
unreach = [mk for th, mk in marks if float(th) < 0.5]
print(f'  Dynamic markings are chosen from Extraversion against thresholds')
print(f'  {[(float(t), m_) for t, m_ in marks]}.')
print(f'  With E confined to [0.5, 1.0] the reachable markings are {reach}')
print(f'  and {unreach} are unreachable for every character in every play.')
print()
print('  CORRECTION. get_dynamics, the only function that reads DYNAMIC_MARKINGS,')
print('  has no caller, so ALL EIGHT markings are unreachable and the split')
print('  above is what would obtain if the module were connected. The bound on')
print('  the estimator is real and would survive connection: it lives in')
print('  infer_profile_from_text, not in the table.')

print()
print('=' * 74)
print('4. THE ENGINE\'S LEADING-TONE OPERATOR IS NOT THE LEADING-TONE OPERATOR')
print('=' * 74)
L = re.search(r'def transform_L.*?(?=\n    @staticmethod)', ENGINE_TON, re.S).group(0)
doc = re.search(r'C Major → (\w+) minor \(root C→(\w)\)', L)
print(f'  Its docstring says: "C Major -> {doc.group(1)} minor '
      f'(root C->{doc.group(2)})", which is already two')
print('  different claims: E minor has root E, not B.')
print('  The code moves the root by a semitone:')
for line in L.splitlines():
    if 'new_root' in line:
        print(f'    {line.strip()}')
print()
print('  The published leading-tone operator sends a major triad to the minor')
print('  triad a major third above, C major to E minor, keeping two common')
print('  tones. A semitone move keeps none.')


def mk(root, q):
    return (root % 12, q)


def P(c):
    return (c[0], 'min' if c[1] == 'maj' else 'maj')


def L_correct(c):
    return ((c[0] + 4) % 12, 'min') if c[1] == 'maj' else ((c[0] - 4) % 12, 'maj')


def L_engine(c):
    return ((c[0] - 1) % 12, 'min') if c[1] == 'maj' else ((c[0] + 1) % 12, 'maj')


def R(c):
    return ((c[0] + 9) % 12, 'min') if c[1] == 'maj' else ((c[0] + 3) % 12, 'maj')


TRIADS = [(r, q) for q in ('maj', 'min') for r in range(12)]
NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
name = lambda c: NAMES[c[0]] + ('' if c[1] == 'maj' else 'm')


def common_tones(a, b):
    def pcs(c):
        return {(c[0] + i) % 12 for i in ((0, 4, 7) if c[1] == 'maj' else (0, 3, 7))}
    return len(pcs(a) & pcs(b))


C = (0, 'maj')
print(f'    correct L: {name(C)} -> {name(L_correct(C))}, '
      f'{common_tones(C, L_correct(C))} common tones')
print(f'    engine  L: {name(C)} -> {name(L_engine(C))}, '
      f'{common_tones(C, L_engine(C))} common tones')
print(f'    P:         {name(C)} -> {name(P(C))}, '
      f'{common_tones(C, P(C))} common tones')
print(f'    R:         {name(C)} -> {name(R(C))}, '
      f'{common_tones(C, R(C))} common tones')
print()
print('  The three neo-Riemannian operators are defined by preserving two')
print('  common tones. The engine\'s L preserves none, so it is not a')
print('  neo-Riemannian operator and the group it generates is a different')
print('  group.')


def graph(Lfn):
    adj = {t: [P(t), Lfn(t), R(t)] for t in TRIADS}
    import collections as _c
    def bfs(s):
        d = {s: 0}
        q = _c.deque([s])
        while q:
            u = q.popleft()
            for v in adj[u]:
                if v not in d:
                    d[v] = d[u] + 1
                    q.append(v)
        return d
    ds = {t: bfs(t) for t in TRIADS}
    reach = {len(d) for d in ds.values()}
    diam = max(max(d.values()) for d in ds.values())
    return reach, diam


def dists(Lfn):
    adj = {t: [P(t), Lfn(t), R(t)] for t in TRIADS}
    import collections as _c

    def bfs(s):
        d = {s: 0}
        q = _c.deque([s])
        while q:
            u = q.popleft()
            for v in adj[u]:
                if v not in d:
                    d[v] = d[u] + 1
                    q.append(v)
        return d
    return {t: bfs(t) for t in TRIADS}


DA, DB = dists(L_correct), dists(L_engine)
for label, D in (('published P, L, R', DA), ("mpn_engine's P, L, R", DB)):
    reach = {len(d) for d in D.values()}
    diam = max(max(d.values()) for d in D.values())
    print(f'  {label:22s} reaches {reach} triads, diameter {diam}')
print()
print('  The two graphs have the same size and the same diameter, so a count')
print('  of either would not have caught this. They are not the same graph:')
same = sum(1 for a in TRIADS for b in TRIADS if DA[a][b] == DB[a][b])
tot = len(TRIADS) ** 2
print(f'    ordered pairs whose distance agrees: {same:,} of {tot:,} '
      f'({100*same/tot:.1f} per cent)')
worst = max(((abs(DA[a][b] - DB[a][b]), a, b) for a in TRIADS for b in TRIADS))
print(f'    largest disagreement: {name(worst[1])} to {name(worst[2])}, '
      f'{DA[worst[1]][worst[2]]} steps published against '
      f'{DB[worst[1]][worst[2]]} in the engine')
print()
print('  S3 section 2.5 computes the Cayley metric of the published group and')
print('  uses its diameter and its distances. A harmonic distance computed in')
print(f'  mpn_engine agrees with that metric on only {100*same/tot:.0f} per cent of pairs,')
print('  so the two are not interchangeable, and the PLP the scores emit 114')
print('  times is not the PLP S3 discusses.')

tests = read('mpn_engine/tests/test_tonnetz.py')
m = re.search(r'def test_[^\n]*[lL]eading[^\n]*\n(?:.*?\n)*?.*?assert[^\n]*\n', tests)
print()
print('  The engine\'s own test suite fixes the wrong behaviour in place:')
for line in tests.splitlines():
    if 'transform_L' in line or ("'B'" in line and 'assert' in line):
        print(f'    {line.strip()[:88]}')
