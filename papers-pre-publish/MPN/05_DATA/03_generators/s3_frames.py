#!/usr/bin/env python3
"""
The frame library, read correctly, once, for every other script.

Every script in this set that touches the 232 annotated frames used to parse
them itself, with a non-greedy regex of the form

    analysis:\\s*(['\\"`])(.*?)\\1

That regex stops at the first occurrence of the delimiter, and it does not
know about backslash escapes. Seven of the 232 annotation strings contain an
escaped apostrophe inside a single-quoted or double-quoted literal, and on
those seven the regex returned a truncated string. On three of them the
truncation removed the only register keyword the annotation contained, so the
shipped analyser was fed a short string and returned (0, 0, 0) where it should
have returned a register triple.

The consequence is that the degenerate-frame count reported across this
programme, 107 of 232, is wrong. It is 104. The on-simplex count is 128 and
not 125, and every proportion computed against those denominators moves.

This module is the single correct reader. Nothing else should parse the
library. Run it directly to see the difference the correction makes.
"""
import os
import re

SRC = os.path.join(os.environ.get('MPN_REPO',
                                  '/home/claude/mpn-conductor-standalone'),
                   'src/components/mpn-lab')
FILES = ('literary_data.ts', 'additional_plays.ts')

# the shipped analyser's keyword lists, psychometric_calculus.ts
REAL = ['death', 'trauma', 'drive', 'void', 'chaos', 'abject', 'blood', 'ghost',
        'prophecy', 'impossible', 'real', 'murder', 'kill', 'die']
SYMB = ['law', 'order', 'signifier', 'father', 'king', 'crown', 'word', 'name',
        'debt', 'oath', 'symbolic', 'duty', 'honor', 'prince']
IMAG = ['ego', 'mirror', 'self', 'image', 'double', 'shadow', 'love', 'ideal',
        'wholeness', 'imaginary', 'beauty', 'adore']


def read_string(text, i, q):
    """Read a JavaScript string literal starting after the opening delimiter q
    at index i, honouring backslash escapes. Returns (value, index_after)."""
    buf, n = [], len(text)
    while i < n:
        c = text[i]
        if c == '\\':
            buf.append(text[i:i + 2])
            i += 2
            continue
        if c == q:
            return ''.join(buf), i + 1
        buf.append(c)
        i += 1
    raise ValueError('unterminated string literal in the frame library')


def _record(text, at):
    """The brace-balanced object literal enclosing index `at`."""
    depth, i = 0, at
    while i >= 0:
        if text[i] == '}':
            depth += 1
        elif text[i] == '{':
            if depth == 0:
                break
            depth -= 1
        i -= 1
    if i < 0:
        return None
    start, depth, j, n = i, 0, i, len(text)
    while j < n:
        if text[j] == '{':
            depth += 1
        elif text[j] == '}':
            depth -= 1
            if depth == 0:
                return text[start:j + 1]
        j += 1
    return None


def _field(block, key):
    for q in ("'", '"', '`'):
        m = re.search(key + r':\s*' + q, block)
        if m:
            return read_string(block, m.end(), q)[0]
    return None


def load():
    """Every frame in the library, as dicts with file, name, speaker, trauma,
    entropy and analysis. Asserts that the count matches the number of
    annotation fields present, so a parser that silently drops records fails
    loudly instead."""
    out, expected = [], 0
    for fn in FILES:
        text = open(os.path.join(SRC, fn), encoding='utf-8').read()
        expected += len(re.findall(r"analysis:\s*['\"`]", text))
        for m in re.finditer(r'trauma:\s*[\d.]+', text):
            b = _record(text, m.start())
            if not b or 'analysis:' not in b:
                continue
            tau = re.search(r'trauma:\s*([\d.]+)', b)
            H = re.search(r'entropy:\s*([\d.]+)', b)
            an = _field(b, 'analysis')
            if not (tau and H and an is not None):
                continue
            out.append(dict(file=fn, name=_field(b, 'name') or '(unnamed)',
                            speaker=_field(b, 'speaker') or '(unattributed)',
                            trauma=float(tau.group(1)),
                            entropy=float(H.group(1)), analysis=an))
    assert len(out) == expected, (
        f'parsed {len(out)} frames against {expected} annotation fields; '
        f'this parser is dropping records')
    return out


def analyse_rsi(t):
    """analyzeRSI, transcribed from psychometric_calculus.ts: substring match,
    presence not count, and a denominator of 1 when nothing matches."""
    t = t.lower()
    a = [sum(1 for k in G if k in t) for G in (REAL, SYMB, IMAG)]
    tot = sum(a) or 1
    return tuple(x / tot for x in a)


if __name__ == '__main__':
    frames = load()
    print('=' * 74)
    print('1. THE LIBRARY, READ CORRECTLY')
    print('=' * 74)
    print(f'  frames: {len(frames)}')
    for fn in FILES:
        print(f'    {fn:22s} {sum(1 for f in frames if f["file"] == fn)}')

    # the old regex, for the comparison
    def old_strings():
        out = []
        for fn in FILES:
            text = open(os.path.join(SRC, fn), encoding='utf-8').read()
            out += [m.group(2) for m in
                    re.finditer(r"analysis:\s*(['\"`])(.*?)\1", text, re.S)]
        return out

    old = old_strings()
    new = [f['analysis'] for f in frames]
    diff = [(o, n) for o, n in zip(old, new) if o != n]
    print()
    print('=' * 74)
    print('2. WHAT THE OLD REGEX GOT WRONG')
    print('=' * 74)
    print(f'  annotation strings parsed differently: {len(diff)} of {len(new)}')
    for o, n in diff:
        print(f'    truncated at {len(o):3d} chars, actual length {len(n):3d}')
        print(f'      {n[:96]}')
    changed = [(o, n) for o, n in diff if analyse_rsi(o) != analyse_rsi(n)]
    print(f'  of those, strings whose register triple changes: {len(changed)}')
    for o, n in changed:
        print(f'      {analyse_rsi(o)} -> '
              f'{tuple(round(v, 4) for v in analyse_rsi(n))}   {n[:64]}')

    print()
    print('=' * 74)
    print('3. THE FIGURES THAT MOVE')
    print('=' * 74)
    for label, strings in (('as previously reported', old), ('corrected', new)):
        R = [analyse_rsi(t) for t in strings]
        n = len(R)
        deg = sum(1 for x in R if x == (0.0, 0.0, 0.0))
        on = n - deg
        vert = sum(1 for x in R if max(x) == 1.0)
        gaps = [sorted(x)[2] - sorted(x)[1] for x in R if x != (0.0, 0.0, 0.0)]
        tie = sum(1 for g in gaps if g == 0.0)
        interior = sum(1 for x in R if min(x) > 0.0)
        print(f'  {label}:')
        print(f'    degenerate, (0,0,0)          {deg:4d}  '
              f'({100*deg/n:.1f} per cent of all frames)')
        print(f'    on the simplex               {on:4d}')
        print(f'    of those, at a vertex        {vert:4d}  '
              f'({100*vert/on:.1f} per cent)')
        print(f'    of those, on an exact tie    {tie:4d}  '
              f'({100*tie/on:.1f} per cent)')
        print(f'    of those, in the interior    {interior:4d}')
        print(f'    Real exactly zero            '
              f'{sum(1 for x in R if x[0] == 0.0):4d}')
