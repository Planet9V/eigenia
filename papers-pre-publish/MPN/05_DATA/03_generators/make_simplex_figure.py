#!/usr/bin/env python3
"""
Draw the register simplex: the discontinuity tripod, and the ten triples the
shipped instrument actually produces, sized by frame count. Emits SVG for
S2 section 4.4.
"""
import math
import os
import re
import subprocess
import sys

W, H = 620, 560
CX, CY, R = 310, 305, 218  # centroid and circumradius of the triangle

# vertices: Real top, Symbolic bottom-left, Imaginary bottom-right
def vert(k):
    a = math.radians(-90 + 120 * k)
    return (CX + R * math.cos(a), CY + R * math.sin(a))

VR, VS, VI = vert(0), vert(1), vert(2)


def bary(r, s, i):
    return (r * VR[0] + s * VS[0] + i * VI[0],
            r * VR[1] + s * VS[1] + i * VI[1])


def mid(a, b):
    return ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)


C = bary(1 / 3, 1 / 3, 1 / 3)
M_SI, M_RI, M_RS = mid(VS, VI), mid(VR, VI), mid(VR, VS)

def realised_triples():
    """Read every triple and its count from s2_verify2.py, which enumerates
    all of them, rather than transcribing them here, so the figure cannot
    drift from the instrument. s2_rsi.py prints only the eight commonest."""
    here = os.path.dirname(os.path.abspath(__file__))
    cand = [os.path.join(here, n) for n in ('s2_verify2.py', 's2-verify2.py')]
    script = next((c for c in cand if os.path.exists(c)), None)
    if script is None:
        sys.exit('neither s2_verify2.py nor s2-verify2.py is beside this file')
    r = subprocess.run([sys.executable, script], capture_output=True, text=True)
    out = r.stdout
    if not out.strip():
        sys.exit('the verification script printed nothing:\n' + r.stderr)
    rows = []
    for m in re.finditer(
            r'\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)\s+x(\d+)', out):
        r, s_, i, n = float(m[1]), float(m[2]), float(m[3]), int(m[4])
        rows.append(((r, s_, i), n, None))
    if not rows:
        sys.exit(f'{os.path.basename(script)} produced no triples; run it directly to see why')
    return rows


TRIPLES = realised_triples()

INK, DIM, HOT = "#f5f3f0", "#7c7a76", "#E05A10"
p = []
p.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
         f'width="{W}" height="{H}" role="img" '
         f'aria-labelledby="figTitle figDesc">')
p.append('<title id="figTitle">The register simplex, its discontinuity tripod, '
         'and the ten triples the shipped instrument produces</title>')
p.append('<desc id="figDesc">A triangle whose corners are the pure Real, '
         'Symbolic and Imaginary registers. Three short segments run from the '
         'centre to the midpoint of each side; together they form a tripod, '
         'and that tripod is the set on which the dominant register, and '
         'therefore the mode, is undefined. Marked on the figure are the ten '
         'register triples the shipped instrument actually emitted over the '
         '232 frames of the play library, with the area of each mark '
         'proportional to its frame count. One hundred and one frames sit at '
         'the three corners, twenty one sit on the tripod or at the centre, '
         'six sit elsewhere on the edges, and exactly one point lies in the '
         'interior, the centre, which is itself a three way tie. A further '
         'one hundred and four frames are not on the triangle at all, '
         'because the instrument returned zero for all three registers.'
         '</desc>')
p.append(f'<rect width="{W}" height="{H}" fill="#1a1c1f"/>')

# the triangle
tri = " ".join(f"{x:.1f},{y:.1f}" for x, y in (VR, VS, VI))
p.append(f'<polygon points="{tri}" fill="none" stroke="{DIM}" '
         f'stroke-width="1.5"/>')

# the medians, dotted on the continuous half, solid on the discontinuous half
for v, m in ((VR, M_SI), (VS, M_RI), (VI, M_RS)):
    p.append(f'<line x1="{v[0]:.1f}" y1="{v[1]:.1f}" x2="{C[0]:.1f}" '
             f'y2="{C[1]:.1f}" stroke="{DIM}" stroke-width="1" '
             f'stroke-dasharray="3 5"/>')
for m in (M_SI, M_RI, M_RS):
    p.append(f'<line x1="{C[0]:.1f}" y1="{C[1]:.1f}" x2="{m[0]:.1f}" '
             f'y2="{m[1]:.1f}" stroke="{HOT}" stroke-width="3.5" '
             f'stroke-linecap="round"/>')

# the realised triples
for (r, s, i), n, lab in TRIPLES:
    x, y = bary(r, s, i)
    rad = 3.4 * math.sqrt(n)
    p.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rad:.1f}" '
             f'fill="{INK}" fill-opacity="0.82"/>')
    # counts sit toward the centroid so they never collide with the axis labels
    ux, uy = C[0] - x, C[1] - y
    d = math.hypot(ux, uy) or 1.0
    lx, ly = x + ux / d * (rad + 14), y + uy / d * (rad + 14) + 4
    if n == 1 and abs(x - C[0]) < 1 and abs(y - C[1]) < 1:
        lx, ly = x + 16, y + 5  # the barycentre: no direction to move toward
    p.append(f'<text x="{lx:.1f}" y="{ly:.1f}" fill="{INK}" '
             f'font-family="system-ui,sans-serif" font-size="13" '
             f'text-anchor="middle">{n}</text>')

# vertex labels
for (vx, vy), lab, dy in ((VR, "Real", -30), (VS, "Symbolic", 42),
                          (VI, "Imaginary", 42)):
    p.append(f'<text x="{vx:.1f}" y="{vy + dy:.1f}" fill="{INK}" '
             f'font-family="system-ui,sans-serif" font-size="15" '
             f'text-anchor="middle">{lab}</text>')

p.append(f'<text x="{CX:.1f}" y="{H - 44:.1f}" fill="{HOT}" '
         f'font-family="system-ui,sans-serif" font-size="13" '
         f'text-anchor="middle">The three solid segments are the tripod: '
         f'the mode is undefined on them</text>')
p.append(f'<text x="{CX:.1f}" y="{H - 24:.1f}" fill="{DIM}" '
         f'font-family="system-ui,sans-serif" font-size="13" '
         f'text-anchor="middle">Marks are the ten triples the instrument '
         f'emitted, by frame count. 104 further frames are off the '
         f'triangle.</text>')
p.append('</svg>')

svg = "\n".join(p)
dest = (sys.argv[1] if len(sys.argv) > 1
        else os.path.join(os.path.dirname(os.path.abspath(__file__)),
                          's2-figure-simplex.svg'))
open(dest, 'w').write(svg + "\n")
print("wrote {}, {} bytes".format(dest, len(svg)))
print("centroid", [round(v, 1) for v in C])
for (r, s, i), n, _ in TRIPLES:
    print(f"  ({r:.3f},{s:.3f},{i:.3f}) n={n:2d} -> "
          f"{tuple(round(v,1) for v in bary(r,s,i))}")
