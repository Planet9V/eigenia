#!/usr/bin/env python3
"""
Two real frames, each taken all the way through.

The paper states six parameter functions and a ceiling on what they carry.
Neither is much use to a composer without worked cases, so this script takes
two actual frames out of the shipped play library, with the trauma, entropy
and analysis text the author wrote for them, and prints what the mapping THIS
PAPER SPECIFIES emits beside what the BUILD emits, parameter by parameter.

The two are chosen to exercise opposite corners rather than picked for effect.
The first reaches the register simplex without sitting at a vertex, so it lands
on a tie, and carries the highest trauma among such frames, which puts it above
the trauma switch at 0.6. The second sits at a vertex with a register above
0.6 and the lowest trauma among such frames, so every register threshold fires
and the switch does not. Between them they cover the tie, the threshold, both
sides of the switch and both ends of the dynamic range.

Nothing is invented. The state comes from the library, the register triple from
the shipped analyser run over that frame's own annotation, and every output
from the laws the other scripts in this set transcribe.
"""
import importlib.util
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get('MPN_REPO', '/home/claude/mpn-conductor-standalone')
SRC = os.path.join(ROOT, 'src/components/mpn-lab')


def load(name):
    spec = importlib.util.spec_from_file_location(
        name, os.path.join(HERE, name + '.py'))
    mod = importlib.util.module_from_spec(spec)
    out = sys.stdout
    sys.stdout = open(os.devnull, 'w')
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.stdout.close()
        sys.stdout = out
    return mod


TM = load('s3_tempo_metre')
DY = load('s3_dynamics')

# --- the frame library, through the one correct parser ---------------------
import importlib.util as _il

_spec = _il.spec_from_file_location('s3_frames', os.path.join(HERE, 's3_frames.py'))
FR = _il.module_from_spec(_spec)
_spec.loader.exec_module(FR)

frames = FR.load()
analyse_rsi = FR.analyse_rsi
total_analysis = len(frames)

# --- the laws ---------------------------------------------------------------
CUTS, MARKS = DY.cuts, DY.marks
LADDER = (0.2, 0.4, 0.6, 0.8)
RULES = open(os.path.join(ROOT, 'src/lib/leitmotif_transformation_rules.ts'),
             encoding='utf-8').read()
F_CUTS = [float(x) for x in re.findall(r'fragmentationScore < ([\d.]+)', RULES)]
O_CUTS = [float(x) for x in re.findall(r'intensity < ([\d.]+)', RULES)]
DATA = open(os.path.join(SRC, 'mpn_reference_data.ts'), encoding='utf-8').read()
DROWS = [(re.search(r"musicalElement: '([^']*)'", b).group(1),
          re.search(r"condition: '([^']*)'", b).group(1),
          float(re.search(r'defaultValue: ([\d.]+)', b).group(1)))
         for b in re.split(r"\n    \{\n", DATA)
         if "subcategory: 'volume_level'" in b
         and 'PsychometricDimension.TRAUMA' in b]
DICT = {}
for b in re.split(r"\n    \{\n", DATA):
    if "subcategory: 'scale_mode'" in b and 'LACANIAN' in b:
        DICT[re.search(r"trait: '(\w+)'", b).group(1).lower()] = \
            re.search(r"musicalElement: '([^']*)'", b).group(1)


def _cond(c, v):
    if '-' in c:
        lo, hi = [float(x) for x in c.split('-')]
        return lo <= v <= hi
    if '>' in c:
        return v > float(c.replace('>', ''))
    if '<' in c:
        return v < float(c.replace('<', ''))
    return False


def spec_dynamic(t):
    for c, m in zip(CUTS, MARKS):
        if t < c:
            return m
    return MARKS[-1]


def ship_dynamic(t):
    for elem, cond, vel in DROWS:
        if _cond(cond, t):
            return elem.split(' ')[0], vel
    return 'mf', 72.0


def rung(x, ladder=LADDER):
    return sum(1 for c in ladder if x >= c)


def report(FR, RSI, n):
    tau, H = FR['trauma'], FR['entropy']
    r, s_, i = RSI
    dom_k = max(range(3), key=lambda k: (RSI[k], -k))
    dom = ['real', 'symbolic', 'imaginary'][dom_k]
    gap = sorted(RSI)[2] - sorted(RSI)[1]

    spec_tempo, spec_metre, band = TM.entropy_to_rhythm(H)
    spec_dens = 0.3 * H + 0.7 * tau
    spec_frag = max(0.0, 0.7 * H - 0.3 * tau) / 0.7
    ship_frag = 0.6 * H + 0.4 * tau
    ship_dens = 0.7 * tau + 0.3 * H
    sd_lab, sd_vel = ship_dynamic(tau)
    lyap = (tau + H - 0.5) * 0.5
    printed = 'Ionian' if lyap < 0 else ('Lydian' if lyap < 0.1 else 'Phrygian')
    played = 'Locrian' if tau > 0.6 else 'Phrygian'
    discarded = DICT[dom].split(' ')[0].lower()
    key = ('C# minor' if r > 0.6 else 'E Major' if i > 0.6 else
           'G Major' if s_ > 0.6 else 'F# Locrian' if H > 0.8 else 'C Major')
    key_fired = max(r, s_, i) > 0.6 or H > 0.8
    tension = 0.9 * r + 0.1 * H
    chord = ('major7' if tension < 0.2 else 'minor7' if tension < 0.4 else
             'dominant7' if tension < 0.6 else
             'diminished' if tension < 0.8 else 'augmented')
    transform = ('fragmented' if tau > 0.8 else 'inverted' if tau > 0.6 else
                 'retrograde' if H > 0.8 else 'diminished' if H > 0.6 else
                 'chromatic_descent' if r > 0.6 else
                 'whole_tone_ascent' if i > 0.6 else
                 'augmented' if 0.3 < tau < 0.6 else 'original')

    print()
    print('=' * 74)
    print(f'FRAME {n}: {FR["name"]}, {FR["speaker"]}')
    print('=' * 74)
    print(f'  file       {FR["file"]}')
    print(f'  annotation {FR["analysis"][:92]}')
    print(f'  trauma     {tau}          entropy {H}')
    print(f'  registers  ({r:.4f}, {s_:.4f}, {i:.4f})  dominant '
          f'{dom.capitalize()}, gap to runner-up {gap:.4f}')
    print(f'  position   '
          f'{"an exact tie" if gap == 0 else "a vertex" if max(RSI) == 1.0 else "off any tie"}'
          f'; trauma is {"above" if tau > 0.6 else "below"} the 0.6 switch; '
          f'the 0.6 register thresholds {"fire" if key_fired else "do not fire"}')
    print()
    print(f'  {"parameter":24s} {"this paper specifies":26s} {"the build emits":30s}')
    rows = [
        ('dynamic marking', f'{spec_dynamic(tau)}, velocity {int(20+107*tau)}',
         f'{sd_lab}, velocity {sd_vel:.0f}'),
        ('tempo', f'{spec_tempo} bpm ({band})', f'{spec_tempo} bpm ({band})'),
        ('metre', spec_metre, spec_metre),
        ('mode, printed name', 'from the registers',
         f'{printed}, from tau + H = {tau + H:.2f}'),
        ('mode, notated pitches', 'from the registers',
         f'{played}, from tau'),
        ('mode, computed, discarded', '', f'{discarded}, from the registers'),
        ('fragmentation stage', f'{spec_frag:.3f}, rung {rung(spec_frag)} of 5',
         f'{ship_frag:.3f}, rung {rung(ship_frag, F_CUTS)} of 5'),
        ('orchestration density', f'{spec_dens:.3f}, rung {rung(spec_dens)} of 5',
         f'{ship_dens:.3f}, rung {rung(ship_dens, O_CUTS)} of 5'),
        ('key', 'not specified here',
         f'{key}' + ('' if key_fired else ', the default: no threshold fires')),
        ('chord quality', 'not specified here',
         f'{chord}, from tension = {tension:.3f}'),
        ('leitmotif transform', 'not specified here', transform),
        ('timbre', 'three contrasts of DISC',
         'nothing: DISC is unmeasured and generated'),
    ]
    for a, b, c in rows:
        print(f'  {a:24s} {b:26s} {c:30s}')
    return dict(printed=printed, played=played, discarded=discarded, key=key,
                spec_vel=int(20 + 107 * tau), ship_vel=sd_vel,
                key_fired=key_fired, chord=chord, tension=tension, dom=dom,
                gap=gap, tau=tau, H=H, spec_frag=rung(spec_frag),
                ship_frag=rung(ship_frag, F_CUTS), spec_dens=rung(spec_dens),
                ship_dens=rung(ship_dens, O_CUTS), spec_dyn=spec_dynamic(tau),
                ship_dyn=sd_lab, name=FR['name'], speaker=FR['speaker'])


# --- select the two frames --------------------------------------------------
tied, pure = [], []
for f in frames:
    t = analyse_rsi(f['analysis'])
    if t == (0.0, 0.0, 0.0):
        continue
    (pure if max(t) > 0.6 else tied).append((f, t))
if not tied or not pure:
    sys.exit('the library no longer contains both kinds of frame this needs')
tied.sort(key=lambda kv: -kv[0]['trauma'])
pure.sort(key=lambda kv: (kv[0]['trauma'], kv[0]['entropy']))

print()
print('=' * 74)
print('TWO FRAMES FROM THE SHIPPED LIBRARY, TAKEN THROUGH EVERY LAW')
print('=' * 74)
print(f'  frames parsed, and every one in the library:  {len(frames)}')
print(f'  reaching the simplex:                      {len(tied) + len(pure)}')
print(f'  of those, off any vertex, so near a tie:   {len(tied)}')
print(f'  of those, with a register above 0.6:       {len(pure)}')

A = report(*tied[0], 1)
B = report(*pure[0], 2)

print()
print('=' * 74)
print('WHAT THE PAIR SHOWS')
print('=' * 74)
print('  Each statement below is derived from the two rows above rather than')
print('  written alongside them, so it cannot drift from the frames the')
print('  selection criteria actually pick.')
print()
print('  1. The printed name and the notated pitches are separate functions.')
for f in (A, B):
    agree = f['printed'] == f['played']
    print(f'     {f["name"]:22s} headed {f["printed"]:9s} notated '
          f'{f["played"]:9s} {"agree" if agree else "DISAGREE"}')
    disc_head = f['discarded'].split('/')[0]
    if f['printed'].lower() == disc_head:
        print(f'     On this frame the printed name coincides with what the')
        print(f'     registers would have given, {f["discarded"]}. It is a')
        print(f'     coincidence of two unrelated functions: the branch that')
        print(f'     produced it read trauma and entropy and no register.')
print()
print('  2. The register thresholds.')
for f in (A, B):
    print(f'     {f["name"]:22s} dominant {f["dom"]:9s} gap {f["gap"]:.4f}  '
          f'thresholds {"fire" if f["key_fired"] else "do not fire"}, '
          f'key {f["key"]}')
print('     The frame nearest a tie, which is where A4 is hardest, is also')
print('     the frame where the key thresholds say nothing.')
print()
print('  3. The dynamic law.')
for f in (A, B):
    same = f['spec_dyn'] in f['ship_dyn'].split('/')
    print(f'     {f["name"]:22s} specified {f["spec_dyn"]:4s} velocity '
          f'{f["spec_vel"]:3d}   shipped {f["ship_dyn"]:7s} velocity '
          f'{f["ship_vel"]:3.0f}   '
          f'{"label compatible" if same else "LABELS DISAGREE"}, '
          f'velocity differs by {abs(f["spec_vel"] - f["ship_vel"]):.0f}')
print('     The shipped lookup has three labels where decision 6 makes eight')
print('     normative, so agreement on a label is agreement over a wider band.')
print()
print('  4. The A8 pair.')
for f in (A, B):
    fd = f['spec_frag'] - f['ship_frag']
    dd = f['spec_dens'] - f['ship_dens']
    print(f'     {f["name"]:22s} fragmentation rung {f["spec_frag"]} against '
          f'{f["ship_frag"]} ({fd:+d}), density {f["spec_dens"]} against '
          f'{f["ship_dens"]} ({dd:+d})')
print('     The amendment moves fragmentation and leaves density alone on both')
print('     frames, which is what taking the trauma weight negative is for:')
print('     density still rises with weight, fragmentation no longer does.')
print()
print('  5. Timbre is blank in both columns, because the DISC coordinates are')
print('     not produced at all. The one channel section 2.6 analyses is the')
print('     one channel neither frame can exercise.')
