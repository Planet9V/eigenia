#!/usr/bin/env python3
"""Two-persona floor share under two units, and the participant's own star.
Reads the score files only. No randomness, no network."""
import csv, os, itertools
BASE = os.path.expanduser("~/mnt/eigenia/papers-pre-publish/MPN/05_DATA/01_scores")
FILES = {"A_DOLLS_HOUSE":"MCKENNEY_LACAN_SCORE_A_DOLLS_HOUSE.csv",
         "HAMLET":"MCKENNEY_LACAN_SCORE_HAMLET.csv",
         "MACBETH":"MCKENNEY_LACAN_SCORE_MACBETH.csv"}
def load(p):
    rows=[]
    with open(p, newline='', encoding='utf-8-sig') as f:
        for r in csv.DictReader(f):
            sp=(r.get("SPEAKER") or "").strip()
            if not sp or sp=="STAGE": continue
            rows.append((sp,(r.get("TEXT") or "")))
    return rows
print("="*78); print("TWO-PERSONA FLOOR SHARE, THE PAIR RENORMALISED TO ITSELF"); print("="*78)
for name,fn in FILES.items():
    rows=load(os.path.join(BASE,fn))
    turns={}; words={}
    prev=None
    for sp,tx in rows:
        if sp!=prev: turns[sp]=turns.get(sp,0)+1; prev=sp
        words[sp]=words.get(sp,0)+len(tx.split())
    top2=sorted(turns,key=lambda s:-turns[s])[:2]
    a,b=top2
    tt=turns[a]+turns[b]; tw=words[a]+words[b]
    print(f"\n  {name}: pair = {a} and {b}")
    print(f"    by turns  {a} {100*turns[a]/tt:.1f}%   {b} {100*turns[b]/tt:.1f}%   (turns {turns[a]} / {turns[b]})")
    print(f"    by words  {a} {100*words[a]/tw:.1f}%   {b} {100*words[b]/tw:.1f}%   (words {words[a]} / {words[b]})")
    print(f"    swing on the leader between the two units: {abs(100*turns[a]/tt - 100*words[a]/tw):.1f} points")
print()
print("="*78); print("THE RELATION SEEN FROM OUTSIDE AND FROM INSIDE"); print("="*78)
print("  Observer chooses among all unordered pairs, N(N-1)/2.")
print("  A participant's own star is the pairs they are in, N-1.")
print("  N | pairs | own star | ratio N/2")
for N in (2,3,4,5,6,7,8,10,12,14):
    print(f"  {N:2d} | {N*(N-1)//2:5d} | {N-1:8d} | {N/2:.1f}")
print()
print("  Checked by enumeration:")
for N in (2,3,4,6,8,10,12,14):
    P=list(itertools.combinations(range(N),2))
    star=[p for p in P if 0 in p]
    assert len(P)==N*(N-1)//2 and len(star)==N-1
    print(f"    N={N:2d}  enumerated pairs {len(P):3d}  enumerated star {len(star):3d}  OK")
