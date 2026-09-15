#!/usr/bin/env python3
"""
The stimuli the listening pack needs and did not have.

The existing pack (Sets 1 and 2, seven files each) puts A4's register-to-mode
question to composers. Three further questions are answerable by ear and are
not in it:

  Set 3  The interpolation margin and the rounding rule. S3 names this
         experiment in one sentence, "one blended pair at delta = 0.05 against
         delta = 0.20 on a synthesiser that takes cents", and four documents
         wait on it. The set also carries the rounding question, because the
         rounded blend is a stimulus like any other.

  Set 4  Timbre resolution. The six canonical DISC profiles of the design's
         section 5b, synthesised on the three perceptual dimensions the
         scaling literature agrees on, plus a same-or-different ladder that
         finds the separation at which listeners reach chance.

  Set 5  The Cayley metric. S3's stated falsification test for the harmonic
         channel: do listeners rank pairs of chords by the graph distance
         between them. Ten pairs, five distances, two each.

Everything is synthesised here rather than sampled, deterministically, with no
random number drawn anywhere. S4 makes it a condition that a stimulus set be
published as audio rather than as a promise to regenerate it, so the manifest
carries a SHA-256 for every file.
"""
import hashlib
import json
import math
import os
import subprocess
import wave

import numpy as np

OUT = os.environ.get('MPN_STIM', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'stimuli'))
os.makedirs(OUT, exist_ok=True)
SR = 44100

MODES = {
    'Ionian':     (0, 2, 4, 5, 7, 9, 11), 'Dorian':   (0, 2, 3, 5, 7, 9, 10),
    'Phrygian':   (0, 1, 3, 5, 7, 8, 10), 'Lydian':   (0, 2, 4, 6, 7, 9, 11),
    'Mixolydian': (0, 2, 4, 5, 7, 9, 10), 'Aeolian':  (0, 2, 3, 5, 7, 8, 10),
    'Locrian':    (0, 1, 3, 5, 6, 8, 10),
}
# the same eight-bar melody the existing pack uses, in scale degrees
MELODY = [(1,1),(2,1),(3,2),(4,1),(3,1),(2,2),(5,1),(4,1),(3,1),(2,1),(3,4),
          (5,1),(6,1),(7,2),(8,1),(7,1),(6,2),(5,1),(4,1),(3,1),(2,1),(1,4)]
BPM = 100
QS = 60.0 / BPM

def hz(semitones_from_a4):
    return 440.0 * 2 ** (semitones_from_a4 / 12.0)

def env_adsr(n, attack_s, dur_s, decay=2.2):
    t = np.arange(n) / SR
    e = np.ones(n)
    a = max(1, int(SR * attack_s))
    r = max(1, int(SR * min(0.30, dur_s * 0.5)))
    e[:a] = np.linspace(0, 1, a)
    e[-r:] *= np.linspace(1, 0, r)
    return e * (np.exp(-decay * t / max(dur_s, 1e-6)) * 0.65 + 0.35)

def tone(f, dur, amp=0.22, harm=(1, .45, .28, .14, .07), attack=0.01):
    n = int(SR * dur)
    t = np.arange(n) / SR
    y = sum(a * np.sin(2 * np.pi * f * (k + 1) * t) for k, a in enumerate(harm))
    return amp * y * env_adsr(n, attack, dur)

def save(buf, name):
    buf = buf / max(1e-9, np.abs(buf).max() / 0.92)
    p = os.path.join(OUT, name + '.wav')
    w = wave.open(p, 'w'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((buf * 32767).astype('<i2').tobytes()); w.close()
    mp3 = os.path.join(OUT, name + '.mp3')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', p,
                    '-codec:a', 'libmp3lame', '-b:a', '96k', '-ac', '1', mp3],
                   check=True)
    os.remove(p)
    h = hashlib.sha256(open(mp3, 'rb').read()).hexdigest()
    return {'file': name + '.mp3', 'bytes': os.path.getsize(mp3), 'sha256': h}

MANIFEST = {}

# ---------------------------------------------------------------------------
# SET 3: the interpolation margin and the rounding rule
# ---------------------------------------------------------------------------
def weights(x, delta):
    m = max(x)
    w = [max(0.0, 1.0 - (m - xk) / delta) for xk in x]
    s = sum(w)
    return [wi / s for wi in w]

# the live pitch table below tau = 0.6: Real Dorian, Symbolic Lydian, Imaginary Phrygian
TBL = ('Dorian', 'Lydian', 'Phrygian')

def blend(x, delta):
    w = weights(x, delta)
    return [sum(w[k] * MODES[TBL[k]][d] for k in range(3)) for d in range(7)]

def render_melody(scale_semis, name, attack=0.01):
    """scale_semis: seven floats, semitones above the tonic. Exact, not rounded."""
    total = sum(q for _, q in MELODY) * QS
    buf = np.zeros(int(SR * (total + 1.3)))
    for bar in range(8):                       # a low C pedal, one per bar
        st = int(SR * bar * 4 * QS)
        s = tone(hz(36 - 69), 4 * QS, amp=0.16, harm=(1, .3, .12))   # C2, midi 36
        buf[st:st + len(s)] += s
    pos = 0.0
    for d, q in MELODY:
        sem = 12.0 if d == 8 else scale_semis[d - 1]
        st = int(SR * pos)
        s = tone(hz(72 + sem - 69), q * QS, attack=attack)
        buf[st:st + len(s)] += s
        pos += q * QS
    return save(buf, name)

TIE  = (0.45, 0.45, 0.10)      # an EXACT two-way tie, Real against Symbolic
NEAR = (0.46, 0.43, 0.11)      # a NEAR tie: gap 0.03, inside both margins
half_up = lambda v: math.floor(v + 0.5)

# At an exact tie the two deltas give identical weights, so the tie cannot
# answer the delta question and the near tie cannot answer the rounding one.
# The set carries both states for that reason.
SET3 = {}
b_tie   = blend(TIE, 0.20)
b_n05   = blend(NEAR, 0.05)
b_n20   = blend(NEAR, 0.20)
cents   = max(abs(a - b) * 100 for a, b in zip(b_n05, b_n20))
plans = [
    ('Set-3-A', list(MODES['Dorian']), TIE,  'pure Dorian, what argmax would choose'),
    ('Set-3-B', b_tie,                 TIE,  'exact tie, blended, exact cents. Both deltas give this'),
    ('Set-3-C', b_n05,                 NEAR, 'near tie, delta = 0.05, exact cents'),
    ('Set-3-D', b_n20,                 NEAR, 'near tie, delta = 0.20, exact cents'),
    ('Set-3-E', [half_up(v) for v in b_tie], TIE, 'exact tie, blended, rounded half up'),
    ('Set-3-F', [round(v) for v in b_tie],   TIE, 'exact tie, blended, bankers rounding'),
    ('Set-3-G', list(MODES['Lydian']), TIE,  'pure Lydian, the other input'),
]
for nm, sc, st, why in plans:
    rec = render_melody([float(v) for v in sc], nm)
    rec.update(scale=[round(float(v), 4) for v in sc], state=st, note=why)
    SET3[nm] = rec
MANIFEST['set3_margin_and_rounding'] = {
    'tie_state': TIE, 'near_tie_state': NEAR, 'table': TBL,
    'delta_separation_cents': round(cents, 1),
    'question': 'whether the blend is heard as a third scale or as a mistuned '
                'version of an input; whether the two margins are '
                'distinguishable; and whether either rounding of the blend is '
                'distinguishable from the pure modes',
    'note': 'Set-3-E and Set-3-G carry the SAME scale. Rounding half up at an '
            'exact tie returns one of the two inputs exactly, which makes that '
            'pair a built-in catch trial as well as a result.',
    'items': SET3,
}

# ---------------------------------------------------------------------------
# SET 4: timbre, the six canonical profiles and a resolution ladder
# ---------------------------------------------------------------------------
H1 = (0.5,  0.5, -0.5, -0.5)
H2 = (0.5, -0.5,  0.5, -0.5)
H3 = (0.5, -0.5, -0.5,  0.5)

def contrasts(p):
    return tuple(sum(r[i] * p[i] for i in range(4)) for r in (H1, H2, H3))

def timbre_tone(c, dur=1.6, f=hz(60 - 69)):
    """c: the three contrasts in [-1, 1], mapped to the three perceptual
    dimensions the scaling literature agrees on.
      c1 -> log attack time, 3 ms at +1 to 150 ms at -1
      c2 -> spectral centroid, via the harmonic rolloff exponent
      c3 -> spectrum fine structure, as even-harmonic attenuation in dB"""
    c1, c2, c3 = c
    attack = 10 ** (np.interp(c1, [-1, 1], [np.log10(0.150), np.log10(0.003)]))
    rolloff = float(np.interp(c2, [-1, 1], [2.4, 0.7]))
    even_db = float(np.interp(c3, [-1, 1], [-18.0, 0.0]))
    n = int(SR * dur); t = np.arange(n) / SR
    y = np.zeros(n)
    for k in range(1, 17):
        if f * k > SR / 2.2:
            break
        a = k ** (-rolloff)
        if k % 2 == 0:
            a *= 10 ** (even_db / 20.0)
        y += a * np.sin(2 * np.pi * f * k * t)
    return 0.5 * y * env_adsr(n, attack, dur, decay=1.4)

CANON = {
    'DI-high': (1, 1, 0, 0), 'DS-high': (1, 0, 1, 0), 'DC-high': (1, 0, 0, 1),
    'IS-high': (0, 1, 1, 0), 'IC-high': (0, 1, 0, 1), 'SC-high': (0, 0, 1, 1),
}
SET4 = {}
for i, (nm, p) in enumerate(CANON.items()):
    c = contrasts(p)
    rec = save(timbre_tone(c), f'Set-4-{chr(ord("A")+i)}')
    rec.update(profile=nm, disc=p, contrasts=[round(v, 4) for v in c])
    SET4[f'Set-4-{chr(ord("A")+i)}'] = rec

# Separation is placed symmetrically about the origin so that every point stays
# inside the reachable set, and the AXIS rotates across trials so the ladder
# tests the whole three-dimensional space rather than attack time alone.
LADDER = [(0.00, 0), (0.00, 1), (0.25, 0), (0.50, 1), (0.75, 2),
          (1.00, 0), (1.4142, 1), (2.00, 2)]
SET4L = {}
AXIS_NAME = {0: 'c1 attack time', 1: 'c2 spectral centroid',
             2: 'c3 spectrum fine structure'}
for i, (sep, ax) in enumerate(LADDER):
    a = [0.0, 0.0, 0.0]; b = [0.0, 0.0, 0.0]
    a[ax] = -sep / 2.0
    b[ax] = +sep / 2.0
    a, b = tuple(a), tuple(b)
    actual = math.dist(a, b)
    gap = np.zeros(int(SR * 0.5))
    buf = np.concatenate([timbre_tone(a), gap, timbre_tone(b)])
    nm = f'Set-4-L{i+1}'
    rec = save(buf, nm)
    rec.update(separation_requested=sep, separation_actual=round(actual, 4),
               axis=AXIS_NAME[ax], same=bool(actual < 1e-9))
    SET4L[nm] = rec
MANIFEST['set4_timbre'] = {
    'dimensions': {'c1': 'log attack time, 3 ms to 150 ms',
                   'c2': 'spectral centroid, via harmonic rolloff exponent 0.7 to 2.4',
                   'c3': 'even-harmonic attenuation, 0 dB to -18 dB'},
    'canonical': SET4, 'ladder': SET4L,
    'question': 'the separation in contrast units at which same and different '
                'reach chance, which closes the capacity table of design 5b.3',
}

# ---------------------------------------------------------------------------
# SET 5: the Cayley metric
# ---------------------------------------------------------------------------
TRIADS = [(r, m) for m in (0, 1) for r in range(12)]
def Pop(t): r, m = t; return (r, 1 - m)
def Lop(t): r, m = t; return (((r + 4) % 12, 1) if m == 0 else ((r + 8) % 12, 0))
def Rop(t): r, m = t; return (((r + 9) % 12, 1) if m == 0 else ((r + 3) % 12, 0))
import collections
def dists(s):
    d = {s: 0}; q = collections.deque([s])
    while q:
        u = q.popleft()
        for g in (Pop, Lop, Rop):
            v = g(u)
            if v not in d:
                d[v] = d[u] + 1; q.append(v)
    return d
D0 = dists((0, 0))
by_dist = collections.defaultdict(list)
for t, d in D0.items():
    by_dist[d].append(t)

def triad_audio(t, dur=1.8):
    root, minor = t
    third = 3 if minor else 4
    pcs = [root, (root + third) % 12, (root + 7) % 12]
    midi = [48 + pcs[0], 48 + pcs[0] + third, 48 + pcs[0] + 7]
    n = int(SR * dur)
    buf = np.zeros(n)
    for m in midi:
        s = tone(hz(m - 69), dur, amp=0.18, attack=0.02)
        buf[:len(s)] += s
    return buf

PC = 'C C# D D# E F F# G G# A A# B'.split()
def tname(t):
    return f'{PC[t[0]]} {"minor" if t[1] else "major"}'

# From any triad there is exactly ONE triad at distance 5, so the second trial
# at each distance starts from a different chord rather than repeating the pair.
SET5 = {}
i = 0
for d in (1, 2, 3, 4, 5):
    for src in ((0, 0), (7, 0)):          # C major, then G major
        dd = dists(src)
        cands = sorted([t for t, v in dd.items() if v == d])
        tgt = cands[0]
        gap = np.zeros(int(SR * 0.35))
        buf = np.concatenate([triad_audio(src), gap, triad_audio(tgt)])
        nm = f'Set-5-{i+1:02d}'
        rec = save(buf, nm)
        rec.update(from_triad=tname(src), to_triad=tname(tgt), cayley_distance=d)
        SET5[nm] = rec
        i += 1
MANIFEST['set5_cayley'] = {
    'question': 'do listeners rank pairs of chords by the Cayley distance '
                'between them, which is S3 section 2.5 stated falsification test',
    'items': SET5,
}

MANIFEST['provenance'] = {
    'generator': 's7_listening_stimuli.py',
    'randomness': 'none drawn anywhere; the set is a pure function of this script',
    'sample_rate': SR, 'bpm': BPM, 'encoding': 'mp3, 96 kbps mono',
    'melody_degrees': MELODY,
}
json.dump(MANIFEST, open(os.path.join(OUT, 'MANIFEST.json'), 'w'), indent=1)

n_files = sum(len(v.get('items', v.get('canonical', {}))) for v in MANIFEST.values()
              if isinstance(v, dict)) 
print(f'wrote {len([f for f in os.listdir(OUT) if f.endswith(".mp3")])} mp3 files to {OUT}')
tot = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print(f'total {tot/1e6:.2f} MB including the manifest')
for k in ('set3_margin_and_rounding', 'set4_timbre', 'set5_cayley'):
    print(' ', k)
