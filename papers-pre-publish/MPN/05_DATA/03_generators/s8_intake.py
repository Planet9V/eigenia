#!/usr/bin/env python3
"""
s8_intake.py

Reads returned listening pack files (version 2), joins each answer to
ANSWER-KEY-v2.json, and writes one summary per respondent plus a panel summary
that reports every part per profession, with the count of returns from that
profession beside it.

The three paths are three professions, not three seats. Any number of people
can answer on any path. Part A is the only part built to pool across the
professions, so it is reported pooled and per profession, which is what lets
the pooling be checked. Parts B, C and D are reported per profession only. A
profession with no returns is reported as having none.

The pack exports one line per answer in the form

      key = value

with continuation lines for multi-line free text indented by six spaces, and
section headers in square brackets. This script parses that format against a
catalogue of the keys the pack can emit, so a line inside a free-text answer
that happens to contain an equals sign is not mistaken for a new answer.

Scored, because there is a right answer:
    Part D    same or different, against the true separations
    Part C    rated distance, against the true Cayley distance, with correlations
    Part B    the identical pair that the rounding rule produces

Tallied, because there is no right answer:
    Part A, part T, part R, the six voices, and every free-text box.

No random numbers are drawn anywhere. The output is a pure function of the
response files and the key.

Usage:
    python3 s8_intake.py --responses DIR [--key PATH] [--out DIR]
    python3 s8_intake.py --responses ONE-FILE.txt --out DIR
"""

import argparse
import json
import math
import os
import re
import sys
import textwrap
from datetime import datetime, timezone

# ----------------------------------------------------------------------------
# The catalogue of keys the pack can emit.
# ----------------------------------------------------------------------------

LABELS_A = ["A", "B", "C", "D", "E", "F", "G"]
RANKABLE_A = ["A", "B", "C", "D", "E", "F"]
LABELS_B = ["B%d" % i for i in range(1, 8)]
LABELS_C = ["C%d" % i for i in range(1, 11)]
LABELS_D = ["D%d" % i for i in range(1, 9)]
LABELS_V = ["V%d" % i for i in range(1, 7)]
SITUATIONS = [1, 2, 3, 4]

IDENTITY_KEYS = [
    "who.whoname", "who.whorole", "who.whotrain", "who.whokit", "who.path",
]

PART_KEYS = {
    "A": (
        ["A1.order", "A1.ties"]
        + ["A2.%d.%s" % (n, s) for n in SITUATIONS
           for s in ("pick", "confidence", "why", "extreme")]
    ),
    "B": (
        ["B1.%s" % l for l in LABELS_B]
        + ["B2.identical", "B2.near", "B3.pick", "B3.why"]
    ),
    "C": ["C.%s.distance" % l for l in LABELS_C] + ["C.note"],
    "D": (
        ["D.%s.%s" % (l, s) for l in LABELS_D for s in ("same", "confidence")]
        + ["V.keepapart", "V.confusable", "V.note"]
    ),
    "T": [
        "T1.pick", "T1.note", "T2.pick", "T2.note", "T3.pick", "T3.note",
        "T4.harm", "T5.use",
    ],
    "R": [
        "R1.pick", "R1.why", "R2.n", "R2.stat", "R2.note", "R3.missing",
        "R4.pick", "R4.note",
    ],
    "Z": ["Z.freeform", "who.zcredit", "who.zback"],
}

PATHS = {
    "composer": ["A", "B", "C", "Z"],
    "therapist": ["A", "D", "T", "Z"],
    "researcher": ["B", "C", "D", "R", "Z"],
}

# The three paths are three professions, not three seats. Any number of people
# can answer on any path, the split between them is whatever it turns out to be,
# and a profession with no returns is a result about the panel rather than an
# error. Every summary reports the count per profession, because a result from
# two composers and a result from twelve are different objects.
PROFESSIONS = ["composer", "therapist", "researcher"]

PROFESSION_TITLE = {
    "composer": "Composers and music directors",
    "therapist": "Music therapists",
    "researcher": "Researchers and methodologists",
    "unknown": "Path not established",
}

# Which professions are asked each part at all.
PART_ASKED_OF = {
    part: [p for p in PROFESSIONS if part in PATHS[p]]
    for part in ("A", "B", "C", "D", "T", "R", "Z")
}

# The prose boxes. These are tallied, never scored.
FREE_TEXT_KEYS = set(
    ["A1.ties", "C.note", "V.note", "B3.why", "Z.freeform", "T4.harm", "T5.use",
     "T1.note", "T2.note", "T3.note", "R1.why", "R2.note", "R3.missing",
     "R4.note"]
    + ["A2.%d.why" % n for n in SITUATIONS]
)

KNOWN_KEYS = set(IDENTITY_KEYS)
for _part, _keys in PART_KEYS.items():
    KNOWN_KEYS.update(_keys)

CONFIDENCE_KEYS = set(
    ["D.%s.confidence" % l for l in LABELS_D]
    + ["A2.%d.confidence" % n for n in SITUATIONS]
)

NEGATIVE_TEXT = {"", "none", "no", "n/a", "na", "nil", "nothing", "-", "none.",
                 "no pairs", "not any", "no none"}


# ----------------------------------------------------------------------------
# Parsing
# ----------------------------------------------------------------------------

KEY_RE = re.compile(r"^([A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)+)\s*=\s*(.*)$")
SECTION_RE = re.compile(r"^\[[A-Za-z0-9_]+\]$")
QUOTE_RE = re.compile(r"^(?:\s*>)+\s?")


def strip_quotes(line):
    """Remove email quote markers from the front of a line."""
    prev = None
    out = line
    while prev != out:
        prev = out
        out = QUOTE_RE.sub("", out, count=1)
    return out


def parse_response(text):
    """Parse one returned file. Returns (answers, meta)."""
    text = text.replace("﻿", "")
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    lines = text.split("\n")

    answers = {}
    meta = {
        "header_seen": False,
        "completed_stamp": None,
        "stray_lines": 0,
        "duplicate_keys": [],
        "trailer_seen": False,
    }

    current = None
    pending_blanks = []

    for raw in lines:
        line = strip_quotes(raw).rstrip()
        bare = line.strip()

        if not meta["header_seen"] and bare.upper().startswith(
                "MPN LISTENING PACK"):
            meta["header_seen"] = True
            current = None
            continue
        if bare.lower().startswith("completed ") and meta["completed_stamp"] is None:
            meta["completed_stamp"] = bare[len("completed "):].strip()
            current = None
            continue

        m = KEY_RE.match(bare)
        if m and m.group(1) in KNOWN_KEYS:
            key, value = m.group(1), m.group(2).strip()
            if key in answers:
                meta["duplicate_keys"].append(key)
            answers[key] = value
            current = key
            pending_blanks = []
            meta["trailer_seen"] = False
            continue

        if SECTION_RE.match(bare):
            current = None
            pending_blanks = []
            continue

        if bare == "---":
            meta["trailer_seen"] = True
            current = None
            pending_blanks = []
            continue

        if bare == "":
            if current is not None:
                pending_blanks.append("")
            continue

        if current is not None and not meta["trailer_seen"]:
            # continuation of a multi-line free-text answer
            answers[current] = "\n".join(
                [answers[current]] + pending_blanks + [bare]
            ).strip("\n")
            pending_blanks = []
            continue

        if not meta["trailer_seen"]:
            meta["stray_lines"] += 1

    # blank out empty values
    answers = {k: v for k, v in answers.items() if str(v).strip() != ""}
    return answers, meta


def as_int(value):
    try:
        return int(str(value).strip())
    except (TypeError, ValueError):
        try:
            return int(round(float(str(value).strip())))
        except (TypeError, ValueError):
            return None


def is_negative(value):
    return str(value).strip().lower().rstrip(".") in {
        s.rstrip(".") for s in NEGATIVE_TEXT}


# ----------------------------------------------------------------------------
# The key, and the truths derived from it
# ----------------------------------------------------------------------------

def load_key(path):
    with open(path, "r", encoding="utf-8") as fh:
        raw = json.load(fh)
    return raw.get("key", raw)


def derive_truth(key):
    """Everything the scorer needs, derived from the key rather than hardcoded."""
    truth = {"B": {}, "C": {}, "D": {}, "V": {}}

    for label, entry in key.items():
        if label in LABELS_B and "scale" in entry:
            truth["B"][label] = {
                "source_id": entry.get("source_id"),
                "scale": [float(x) for x in entry["scale"]],
                "state": entry.get("state"),
            }
        elif label in LABELS_C and "cayley_distance" in entry:
            truth["C"][label] = {
                "source_id": entry.get("source_id"),
                "cayley": int(entry["cayley_distance"]),
                "from": entry.get("from_triad"),
                "to": entry.get("to_triad"),
            }
        elif label in LABELS_D and "same" in entry:
            truth["D"][label] = {
                "source_id": entry.get("source_id"),
                "same": bool(entry["same"]),
                "separation": float(entry.get("separation_actual", 0.0)),
                "axis": entry.get("axis"),
            }
        elif label in LABELS_V:
            truth["V"][label] = {
                "source_id": entry.get("source_id"),
                "profile": entry.get("profile"),
            }

    # which part B items carry a scale that could be written on a keyboard
    for label, info in truth["B"].items():
        info["integral"] = all(
            abs(x - round(x)) < 1e-6 for x in info["scale"])

    # the identical pairs, and the closest non-identical pair
    labels = sorted(truth["B"], key=lambda s: int(s[1:]))
    identical = []
    separations = {}
    for i, a in enumerate(labels):
        for b in labels[i + 1:]:
            sa, sb = truth["B"][a]["scale"], truth["B"][b]["scale"]
            if len(sa) != len(sb):
                continue
            gap = max(abs(x - y) for x, y in zip(sa, sb))
            separations[(a, b)] = gap
            if gap < 1e-6:
                identical.append((a, b))
    nonzero = {p: g for p, g in separations.items() if g > 1e-6}
    closest = min(nonzero, key=lambda p: nonzero[p]) if nonzero else None

    # The two interpolation margins. They are the pair of items that share the
    # near-tie state, which is the state carried by exactly two items; the tie
    # state is carried by the rest. Their separation is what delta is worth.
    by_state = {}
    for label in labels:
        st = truth["B"][label].get("state")
        if st is None:
            continue
        by_state.setdefault(tuple(round(float(x), 6) for x in st), []).append(label)
    margin = None
    for st, members in sorted(by_state.items()):
        if len(members) == 2:
            margin = tuple(sorted(members, key=lambda s: int(s[1:])))
            break

    truth["B_identical_pairs"] = identical
    truth["B_separations_semitones"] = separations
    truth["B_closest_pair"] = closest
    truth["B_closest_cents"] = (
        round(nonzero[closest] * 100.0, 2) if closest else None)
    truth["B_margin_pair"] = margin
    truth["B_margin_cents"] = (
        round(separations[margin] * 100.0, 2)
        if margin and margin in separations else None)
    return truth


# ----------------------------------------------------------------------------
# Small statistics, all deterministic
# ----------------------------------------------------------------------------

def pearson(xs, ys):
    n = len(xs)
    if n < 3:
        return None
    mx, my = sum(xs) / n, sum(ys) / n
    sxx = sum((x - mx) ** 2 for x in xs)
    syy = sum((y - my) ** 2 for y in ys)
    if sxx <= 0 or syy <= 0:
        return None
    sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    return sxy / math.sqrt(sxx * syy)


def ranks(values):
    order = sorted(range(len(values)), key=lambda i: values[i])
    out = [0.0] * len(values)
    i = 0
    while i < len(order):
        j = i
        while j + 1 < len(order) and values[order[j + 1]] == values[order[i]]:
            j += 1
        avg = (i + j) / 2.0 + 1.0
        for k in range(i, j + 1):
            out[order[k]] = avg
        i = j + 1
    return out


def spearman(xs, ys):
    if len(xs) < 3:
        return None
    return pearson(ranks(xs), ranks(ys))


def binomial_two_sided(k, n, p=0.5):
    """Exact two-sided binomial test. Deterministic, no library needed."""
    if n == 0:
        return None
    def pmf(i):
        return math.comb(n, i) * (p ** i) * ((1 - p) ** (n - i))
    observed = pmf(k)
    total = 0.0
    for i in range(n + 1):
        if pmf(i) <= observed + 1e-12:
            total += pmf(i)
    return min(1.0, total)


# ----------------------------------------------------------------------------
# Free-text pair extraction
# ----------------------------------------------------------------------------

PAIR_LABEL_RE = re.compile(r"\bB([1-7])\b", re.IGNORECASE)
V_LABEL_RE = re.compile(r"\bV([1-6])\b", re.IGNORECASE)


def extract_pairs(text, label_re, prefix):
    """Pull labels out of a free-text box and group them into consecutive pairs.

    The pack asks for pairs in a plain text box, so this is a convention rather
    than a parse: labels are taken in the order they appear and grouped two at a
    time. Anything left over, or more than one pair, is flagged for a human.
    """
    if text is None or is_negative(text):
        return [], [], False
    found = [prefix + m.group(1) for m in label_re.finditer(text)]
    pairs = []
    for i in range(0, len(found) - 1, 2):
        pairs.append(tuple(sorted([found[i], found[i + 1]],
                                  key=lambda s: int(s[1:]))))
    leftover = found[-1:] if len(found) % 2 else []
    needs_review = len(found) == 0 or len(found) % 2 == 1 or len(pairs) > 1
    return pairs, leftover, needs_review


# ----------------------------------------------------------------------------
# Scoring one respondent
# ----------------------------------------------------------------------------

def declared_or_inferred_path(answers):
    declared = (answers.get("who.path") or "").strip().lower()
    if declared in PATHS:
        return declared, "declared"
    touched = parts_attempted(answers)
    best, best_score = None, -1
    for name, parts in PATHS.items():
        listening = [p for p in parts if p != "Z"]
        score = len(set(listening) & touched) - len(touched - set(parts))
        if score > best_score:
            best, best_score = name, score
    if not touched:
        return None, "unknown"
    return best, "inferred"


def parts_attempted(answers):
    out = set()
    for part, keys in PART_KEYS.items():
        if any(k in answers for k in keys):
            out.add(part)
    return out


def score_part_d(answers, truth):
    rows = []
    for label in LABELS_D:
        t = truth["D"].get(label)
        if t is None:
            continue
        given = answers.get("D.%s.same" % label)
        conf = as_int(answers.get("D.%s.confidence" % label))
        correct = None
        if given in ("same", "different"):
            correct = ((given == "same") == t["same"])
        rows.append({
            "label": label, "source_id": t["source_id"],
            "separation": t["separation"], "axis": t["axis"],
            "true_same": t["same"], "answer": given,
            "confidence": conf, "correct": correct,
        })
    judged = [r for r in rows if r["correct"] is not None]
    hits = [r for r in judged if r["correct"]]
    floor = [r for r in judged if r["true_same"]]
    floor_hits = [r for r in floor if r["correct"]]

    # the smallest separation at or above which every judged item was correct
    diff_rows = sorted((r for r in judged if not r["true_same"]),
                       key=lambda r: r["separation"], reverse=True)
    threshold = None
    for r in diff_rows:
        if r["correct"]:
            threshold = r["separation"]
        else:
            break

    design = 2 ** 0.5
    at_design = [r for r in judged
                 if not r["true_same"] and abs(r["separation"] - design) < 1e-3]

    return {
        "rows": rows,
        "judged": len(judged),
        "cannot_tell": sum(1 for r in rows if r["answer"] == "cannot tell"),
        "blank": sum(1 for r in rows if r["answer"] is None),
        "correct": len(hits),
        "accuracy": (len(hits) / len(judged)) if judged else None,
        "identical_floor": "%d of %d" % (len(floor_hits), len(floor)),
        "identical_floor_clean": bool(floor) and len(floor_hits) == len(floor),
        "resolution_threshold": threshold,
        "correct_at_design_threshold": (
            all(r["correct"] for r in at_design) if at_design else None),
    }


def score_part_c(answers, truth):
    rows = []
    for label in LABELS_C:
        t = truth["C"].get(label)
        if t is None:
            continue
        raw = answers.get("C.%s.distance" % label)
        rating = as_int(raw) if raw not in (None, "cannot tell") else None
        rows.append({
            "label": label, "source_id": t["source_id"],
            "from": t["from"], "to": t["to"], "cayley": t["cayley"],
            "answer": raw, "rating": rating,
        })
    used = [r for r in rows if r["rating"] is not None]
    xs = [r["cayley"] for r in used]
    ys = [r["rating"] for r in used]
    by_distance = {}
    for r in used:
        by_distance.setdefault(r["cayley"], []).append(r["rating"])
    return {
        "rows": rows,
        "n_rated": len(used),
        "cannot_tell": sum(1 for r in rows if r["answer"] == "cannot tell"),
        "blank": sum(1 for r in rows if r["answer"] is None),
        "pearson": pearson(xs, ys),
        "spearman": spearman(xs, ys),
        "flat": bool(used) and len(set(ys)) == 1,
        "mean_rating_by_distance": {
            d: round(sum(v) / len(v), 2) for d, v in sorted(by_distance.items())
        },
        "pairs": list(zip(xs, ys)),
    }


def score_part_b(answers, truth):
    true_pairs = set(truth["B_identical_pairs"])
    named, leftover, review = extract_pairs(
        answers.get("B2.identical"), PAIR_LABEL_RE, "B")
    named_set = set(named)
    near_named, near_left, near_review = extract_pairs(
        answers.get("B2.near"), PAIR_LABEL_RE, "B")

    judgements = []
    for label in LABELS_B:
        t = truth["B"].get(label)
        if t is None:
            continue
        judgements.append({
            "label": label, "source_id": t["source_id"],
            "writable_scale": t["integral"],
            "answer": answers.get("B1.%s" % label),
        })

    tally = {"a scale": 0, "out of tune": 0, "cannot tell": 0, "blank": 0}
    split = {True: dict(tally), False: dict(tally)}
    for j in judgements:
        a = j["answer"]
        bucket = split[j["writable_scale"]]
        if a in bucket:
            bucket[a] += 1
        else:
            bucket["blank"] += 1

    return {
        "true_identical_pairs": sorted(true_pairs),
        "named_identical_pairs": sorted(named_set),
        "found_identical_pair": bool(true_pairs & named_set),
        "false_identical_pairs": sorted(named_set - true_pairs),
        "identical_box_answered": "B2.identical" in answers,
        "identical_needs_review": review and bool(answers.get("B2.identical"))
                                  and not is_negative(answers.get("B2.identical", "")),
        "leftover_labels": leftover,
        "closest_pair": truth["B_closest_pair"],
        "closest_pair_cents": truth["B_closest_cents"],
        "margin_pair": truth["B_margin_pair"],
        "margin_pair_cents": truth["B_margin_cents"],
        "named_near_pairs": sorted(set(near_named)),
        "named_the_margin_pair": (
            truth["B_margin_pair"] in set(near_named)
            if truth["B_margin_pair"] else None),
        "near_needs_review": near_review and bool(answers.get("B2.near"))
                             and not is_negative(answers.get("B2.near", "")),
        "judgements": judgements,
        "judgement_tally_writable": split[True],
        "judgement_tally_blended": split[False],
        "blend_preference": answers.get("B3.pick"),
    }


def tally_part_a(answers):
    order_raw = answers.get("A1.order")
    letters = []
    problem = None
    if order_raw:
        letters = [c.upper() for c in re.findall(r"[A-Ga-g]", order_raw)]
        if len(letters) != 6:
            problem = "does not have six letters, %d were found" % len(letters)
        elif len(set(letters)) != 6:
            problem = "repeats a letter"
        elif not set(letters) <= set(RANKABLE_A):
            problem = "contains a letter outside A to F"
    situations = {}
    for n in SITUATIONS:
        situations[n] = {
            "pick": answers.get("A2.%d.pick" % n),
            "confidence": as_int(answers.get("A2.%d.confidence" % n)),
            "extreme": answers.get("A2.%d.extreme" % n),
            "why_words": len((answers.get("A2.%d.why" % n) or "").split()),
        }
    return {
        "rank_given": letters,
        "rank_problem": problem,
        "ties_note": answers.get("A1.ties"),
        "situations": situations,
    }


def tally_free_text(answers, path):
    parts = PATHS.get(path, list(PART_KEYS))
    out = {}
    for part in parts:
        for k in PART_KEYS[part]:
            if k in FREE_TEXT_KEYS:
                v = answers.get(k)
                out[k] = {
                    "answered": bool(v and str(v).strip()),
                    "words": len(str(v).split()) if v else 0,
                }
    return out


def find_contradictions(answers, path, path_source, b, d, a):
    out = []

    if path_source == "inferred":
        out.append("No path was declared. Inferred as %s from the parts that "
                   "carry answers." % path)
    elif path_source == "unknown":
        out.append("No path was declared and no part carries an answer.")

    touched = parts_attempted(answers)
    if path in PATHS:
        extra = sorted(touched - set(PATHS[path]) - {"Z"})
        if extra:
            out.append("Answers present for part %s, which is not on the %s "
                       "path." % (", ".join(extra), path))

    for label in LABELS_D:
        same = answers.get("D.%s.same" % label)
        conf = as_int(answers.get("D.%s.confidence" % label))
        if conf is not None and same is None:
            out.append("D %s: a confidence was set but the same or different "
                       "question was left blank." % label)
        if same == "cannot tell" and conf is not None and conf >= 70:
            out.append("D %s: answered cannot tell with a confidence of %d."
                       % (label, conf))

    for n in SITUATIONS:
        pick = answers.get("A2.%d.pick" % n)
        conf = as_int(answers.get("A2.%d.confidence" % n))
        if conf is not None and pick is None:
            out.append("A2 situation %d: a confidence was set but no item was "
                       "picked." % n)
        if pick in ("cannot tell", "none of them fits") and conf is not None \
                and conf >= 70:
            out.append("A2 situation %d: answered %s with a confidence of %d."
                       % (n, pick, conf))

    if b is not None:
        ident = set(b["named_identical_pairs"])
        near = set(b["named_near_pairs"])
        both = sorted(ident & near)
        for pair in both:
            out.append("B2: %s and %s are named as identical and also as "
                       "differing only just." % pair)
        judged = {j["label"]: j["answer"] for j in b["judgements"]}
        for pair in ident:
            x, y = judged.get(pair[0]), judged.get(pair[1])
            if x and y and x != y and "cannot tell" not in (x, y):
                out.append("B1 and B2: %s and %s are named as identical but "
                           "one is marked %s and the other %s."
                           % (pair[0], pair[1], x, y))

    keep = answers.get("V.keepapart")
    conf_box = answers.get("V.confusable")
    if keep == "all six" and conf_box and not is_negative(conf_box):
        v_found = V_LABEL_RE.findall(conf_box)
        if v_found:
            out.append("Six voices: all six were reported as keepable apart, "
                       "and a confusable pair was also named.")

    if a is not None and a["rank_problem"]:
        out.append("A1: the ranking %s." % a["rank_problem"])

    return out


def unanswered_for_path(answers, path):
    if path not in PATHS:
        return {}
    out = {}
    missing_id = [k for k in IDENTITY_KEYS if k not in answers]
    if missing_id:
        out["identity"] = missing_id
    for part in PATHS[path]:
        missing = [k for k in PART_KEYS[part] if k not in answers]
        if missing:
            out[part] = missing
    return out


def analyse(name, answers, meta, truth):
    path, path_source = declared_or_inferred_path(answers)
    touched = parts_attempted(answers)

    b = score_part_b(answers, truth) if "B" in touched else None
    c = score_part_c(answers, truth) if "C" in touched else None
    d = score_part_d(answers, truth) if "D" in touched else None
    a = tally_part_a(answers) if "A" in touched else None

    expected = list(IDENTITY_KEYS)
    for part in PATHS.get(path, []):
        expected.extend(PART_KEYS[part])
    answered_expected = [k for k in expected if k in answers]

    return {
        "name": name,
        "path": path,
        "path_source": path_source,
        "identity": {k: answers.get(k) for k in IDENTITY_KEYS},
        "completed_stamp": meta["completed_stamp"],
        "header_seen": meta["header_seen"],
        "stray_lines": meta["stray_lines"],
        "duplicate_keys": meta["duplicate_keys"],
        "parts_attempted": sorted(touched),
        "parts_on_path": PATHS.get(path, []),
        "parts_missing": [p for p in PATHS.get(path, []) if p not in touched],
        "answered": len(answered_expected),
        "expected": len(expected),
        "answers_off_path": sorted(
            k for k in answers if k not in expected and k in KNOWN_KEYS),
        "unanswered": unanswered_for_path(answers, path),
        "part_a": a,
        "part_b": b,
        "part_c": c,
        "part_d": d,
        "free_text": tally_free_text(answers, path),
        "opinion_picks": {
            k: answers.get(k) for k in
            ["B3.pick", "V.keepapart", "T1.pick", "T2.pick", "T3.pick",
             "R1.pick", "R4.pick", "R2.n", "R2.stat", "who.zcredit"]
            if k in answers
        },
        "contradictions": find_contradictions(answers, path, path_source, b, d, a),
        "status": "partial" if (
            not touched or [p for p in PATHS.get(path, []) if p not in touched]
        ) else "complete",
    }


# ----------------------------------------------------------------------------
# The panel, counted by profession
# ----------------------------------------------------------------------------

def group_by_profession(reports):
    """Every profession, including the ones with no returns."""
    out = {p: [] for p in PROFESSIONS}
    for r in reports:
        key = r["path"] if r["path"] in out else "unknown"
        out.setdefault(key, []).append(r)
    for key in out:
        out[key].sort(key=lambda r: r["name"])
    return out


def profession_order(groups):
    """The three professions in a fixed order, then anything else that turned up."""
    extra = [k for k in sorted(groups) if k not in PROFESSIONS and groups[k]]
    return PROFESSIONS + extra


def what_the_count_supports(n):
    """What a count of returns from one profession will carry."""
    if n == 0:
        return "no returns"
    if n == 1:
        return "one return, which is an anecdote"
    if n == 2:
        return "two returns, which are two anecdotes rather than a spread"
    if n <= 5:
        return "%d returns, which give a spread rather than a rate" % n
    if n < 10:
        return ("%d returns, short of the ten or so that settle a design "
                "parameter for one profession" % n)
    return ("%d returns, which settle a design parameter for this profession "
            "and nothing wider" % n)


STANDING_CAVEAT = (
    "One return is an anecdote, three give a spread, and around ten settle a "
    "design parameter for that profession. None of it is a citable perceptual "
    "claim at any size reached this way, because the panel is not sampled, not "
    "pre-registered and not powered.")

NOT_POOLED_ACROSS_PROFESSIONS = (
    "Reported per profession and not pooled across them. Nothing in the design "
    "makes one profession's judgement on this part and another's the same "
    "measurement: the paths differ in which parts come before it, training "
    "differs between the professions and is recorded as a covariate rather than "
    "controlled, and the pack states no comparability argument for this part "
    "across paths. Part A is the only part for which that argument is made.")


def counts_line(groups):
    return ", ".join("%s %d" % (p, len(groups.get(p, [])))
                     for p in profession_order(groups))


# ----------------------------------------------------------------------------
# Rendering
# ----------------------------------------------------------------------------

def yesno(x):
    if x is None:
        return "not answered"
    return "yes" if x else "no"


def words(n):
    return "%d word%s" % (n, "" if n == 1 else "s")


def fmt(x, places=3):
    if x is None:
        return "not available"
    if isinstance(x, float):
        return ("%." + str(places) + "f") % x
    return str(x)


def render_respondent(rep, groups):
    L = []
    w = L.append
    prof = rep["path"] if rep["path"] in groups else "unknown"
    peers = groups.get(prof, [])
    position = None
    for i, r in enumerate(peers):
        if r is rep:
            position = i + 1
    w("LISTENING PACK VERSION 2, RESPONSE SUMMARY")
    w("file            %s" % rep["name"])
    w("path            %s (%s)" % (rep["path"] or "unknown", rep["path_source"]))
    w("completed       %s" % (rep["completed_stamp"] or "not stated"))
    w("status          %s" % rep["status"])
    w("")
    w("THE PANEL AT THIS RUN")
    for p in profession_order(groups):
        w("  %-12s %d" % (p, len(groups.get(p, []))))
    if position is not None and peers:
        w("  this file is %d of %d on the %s path"
          % (position, len(peers), prof))
    if prof in PROFESSIONS:
        w("  This summary is one return. What the count on its path carries: %s."
          % what_the_count_supports(len(peers)))
    else:
        w("  This return is on no path, so it is counted under no profession.")
    for line in textwrap.wrap(STANDING_CAVEAT, 74):
        w("  " + line)
    w("")
    w("IDENTITY BLOCK")
    for k in IDENTITY_KEYS:
        w("  %-16s %s" % (k.split(".", 1)[1], rep["identity"].get(k) or "blank"))
    w("")
    w("COVERAGE")
    w("  parts attempted   %s" % (", ".join(rep["parts_attempted"]) or "none"))
    w("  parts on path     %s" % (", ".join(rep["parts_on_path"]) or "unknown"))
    if rep["parts_missing"]:
        w("  parts not begun   %s" % ", ".join(rep["parts_missing"]))
    w("  questions         %d answered of %d on this path"
      % (rep["answered"], rep["expected"]))
    if rep["answers_off_path"]:
        w("  off path          %s" % ", ".join(rep["answers_off_path"]))
    if rep["duplicate_keys"]:
        w("  repeated keys     %s" % ", ".join(sorted(set(rep["duplicate_keys"]))))
    if rep["stray_lines"]:
        w("  unparsed lines    %d" % rep["stray_lines"])
    w("")
    w("  left unanswered")
    if rep["unanswered"]:
        for part, keys in rep["unanswered"].items():
            head = "identity block" if part == "identity" else ("part " + part)
            w("    %-15s %s" % (head, ", ".join(keys)))
    else:
        w("    nothing")
    w("")

    w("CONTRADICTIONS")
    if rep["contradictions"]:
        for line in rep["contradictions"]:
            w("  %s" % line)
    else:
        w("  none found")
    w("")

    d = rep["part_d"]
    if d:
        w("PART D, SCORED against the true separations")
        w("  %-6s %-10s %-28s %-10s %-10s %-5s %s"
          % ("item", "separation", "axis", "truth", "answer", "ok", "sure"))
        for r in d["rows"]:
            w("  %-6s %-10s %-28s %-10s %-10s %-5s %s"
              % (r["label"], fmt(r["separation"], 4), r["axis"] or "",
                 "same" if r["true_same"] else "different",
                 r["answer"] or "blank",
                 "" if r["correct"] is None else ("yes" if r["correct"] else "no"),
                 "" if r["confidence"] is None else str(r["confidence"])))
        w("  judged %d of %d, correct %d, accuracy %s"
          % (d["judged"], len(d["rows"]), d["correct"], fmt(d["accuracy"])))
        w("  cannot tell %d, blank %d" % (d["cannot_tell"], d["blank"]))
        w("  identical pairs called same: %s%s"
          % (d["identical_floor"],
             "" if d["identical_floor_clean"] else "  (reliability floor not clean)"))
        w("  correct at every judged separation at or above: %s"
          % fmt(d["resolution_threshold"], 4))
        w("  correct at the design threshold, root two: %s"
          % ("not tested" if d["correct_at_design_threshold"] is None
             else ("yes" if d["correct_at_design_threshold"] else "no")))
        w("")

    c = rep["part_c"]
    if c:
        w("PART C, SCORED against the true Cayley distance")
        w("  %-6s %-22s %-8s %s" % ("item", "move", "cayley", "rated"))
        for r in c["rows"]:
            w("  %-6s %-22s %-8s %s"
              % (r["label"], "%s to %s" % (r["from"], r["to"]),
                 r["cayley"], r["answer"] or "blank"))
        w("  rated %d of %d, cannot tell %d, blank %d"
          % (c["n_rated"], len(c["rows"]), c["cannot_tell"], c["blank"]))
        w("  pearson r  %s" % fmt(c["pearson"]))
        w("  spearman   %s" % fmt(c["spearman"]))
        if c["flat"]:
            w("  every rating is the same value, so no correlation is defined")
        w("  mean rating by true distance  %s"
          % ", ".join("%s:%s" % (k, v)
                      for k, v in c["mean_rating_by_distance"].items()))
        w("")

    b = rep["part_b"]
    if b:
        w("PART B, SCORED on the identical pair the rounding produces")
        w("  true identical pair   %s"
          % ", ".join("%s and %s" % p for p in b["true_identical_pairs"]))
        w("  named as identical    %s"
          % (", ".join("%s and %s" % p for p in b["named_identical_pairs"])
             or ("box left blank" if not b["identical_box_answered"] else "none")))
        w("  found it              %s" % ("yes" if b["found_identical_pair"] else "no"))
        if b["false_identical_pairs"]:
            w("  also named            %s"
              % ", ".join("%s and %s" % p for p in b["false_identical_pairs"]))
        if b["identical_needs_review"]:
            w("  the identical box did not resolve into clean pairs, read it by hand")
        if b["margin_pair"]:
            w("  the two margins       %s and %s, %s cents apart"
              % (b["margin_pair"][0], b["margin_pair"][1],
                 fmt(b["margin_pair_cents"], 1)))
        w("  named as near         %s"
          % (", ".join("%s and %s" % p for p in b["named_near_pairs"]) or "none"))
        w("  named the two margins %s" % yesno(b["named_the_margin_pair"]))
        if b["closest_pair"]:
            w("  smallest gap in the set is %s and %s at %s cents, which is not "
              "the margin question"
              % (b["closest_pair"][0], b["closest_pair"][1],
                 fmt(b["closest_pair_cents"], 1)))
        if b["near_needs_review"]:
            w("  the near box did not resolve into clean pairs, read it by hand")
        w("  TALLY, scale or out of tune")
        w("    items whose scale could be written down: %s"
          % ", ".join("%s %d" % (k, v)
                      for k, v in b["judgement_tally_writable"].items()))
        w("    items that sit between the keys:         %s"
          % ", ".join("%s %d" % (k, v)
                      for k, v in b["judgement_tally_blended"].items()))
        w("  would rather hear: %s" % (b["blend_preference"] or "no answer"))
        w("")

    a = rep["part_a"]
    if a:
        w("PART A, TALLIED, no objective answer")
        w("  ranking happiest first  %s"
          % (" ".join(a["rank_given"]) or "not given"))
        if a["rank_problem"]:
            w("  ranking problem         %s" % a["rank_problem"])
        if a["ties_note"]:
            w("  ties or refusals        %s" % a["ties_note"])
        for n in SITUATIONS:
            s = a["situations"][n]
            w("  situation %d  pick %-18s sure %-5s extreme %-10s why %d words"
              % (n, s["pick"] or "blank",
                 "" if s["confidence"] is None else str(s["confidence"]),
                 s["extreme"] or "blank", s["why_words"]))
        w("")

    if rep["opinion_picks"]:
        w("OPINION ANSWERS, TALLIED, no objective answer")
        for k, v in rep["opinion_picks"].items():
            w("  %-14s %s" % (k, v))
        w("")

    w("FREE TEXT, TALLIED")
    any_text = False
    for k, v in rep["free_text"].items():
        if v["answered"]:
            any_text = True
            w("  %-16s %s" % (k, words(v["words"])))
    if not any_text:
        w("  nothing written in any free-text box")
    w("")
    w("Part A, the free-text boxes and the opinion questions have no right "
      "answer and are reported as a tally only.")
    return "\n".join(L) + "\n"


def and_list(items):
    items = list(items)
    if not items:
        return ""
    if len(items) == 1:
        return items[0]
    return ", ".join(items[:-1]) + " and " + items[-1]


def part_d_tables(w, subset):
    """Part D for one set of returns. Never pooled across professions."""
    d_reports = [r for r in subset if r["part_d"]]
    if not d_reports:
        w("No return on this path attempted part D.")
        w("")
        return
    agg = {}
    for r in d_reports:
        for row in r["part_d"]["rows"]:
            if row["correct"] is None:
                continue
            k = (row["separation"], row["axis"], row["true_same"])
            a = agg.setdefault(k, {"n": 0, "hit": 0, "items": set()})
            a["n"] += 1
            a["hit"] += 1 if row["correct"] else 0
            a["items"].add(row["label"])
    if agg:
        w("| Separation | Axis | Truth | Items | Correct of judged | "
          "Two-sided exact p against chance |")
        w("|---:|:---|:---|:---|---:|---:|")
        for k in sorted(agg):
            sep, axis, same = k
            a = agg[k]
            p = binomial_two_sided(a["hit"], a["n"])
            w("| %s | %s | %s | %s | %d of %d | %s |"
              % (fmt(sep, 4), axis, "same" if same else "different",
                 ", ".join(sorted(a["items"])), a["hit"], a["n"], fmt(p, 4)))
        w("")
    else:
        w("Part D was opened but no item was judged same or different.")
        w("")
    w("| File | Accuracy | Identical pairs called same | Correct above |")
    w("|:---|---:|:---|---:|")
    for r in d_reports:
        d = r["part_d"]
        w("| `%s` | %s | %s | %s |"
          % (r["name"], fmt(d["accuracy"]), d["identical_floor"],
             fmt(d["resolution_threshold"], 4)))
    w("")


def part_c_tables(w, subset):
    """Part C for one set of returns. Items are pooled within the profession."""
    c_reports = [r for r in subset if r["part_c"]]
    if not c_reports:
        w("No return on this path attempted part C.")
        w("")
        return
    w("| File | Items rated | Pearson r | Spearman rho |")
    w("|:---|---:|---:|---:|")
    all_pairs = []
    for r in c_reports:
        c = r["part_c"]
        all_pairs.extend(c["pairs"])
        w("| `%s` | %d | %s | %s |"
          % (r["name"], c["n_rated"], fmt(c["pearson"]), fmt(c["spearman"])))
    w("")
    xs = [p[0] for p in all_pairs]
    ys = [p[1] for p in all_pairs]
    w("Over every rated item from the %d return%s on this path, n = %d ratings: "
      "pearson r = %s, spearman rho = %s. The items are pooled within the "
      "profession and not across professions."
      % (len(c_reports), "" if len(c_reports) == 1 else "s", len(all_pairs),
         fmt(pearson(xs, ys)), fmt(spearman(xs, ys))))
    by_d = {}
    for x, y in all_pairs:
        by_d.setdefault(x, []).append(y)
    if by_d:
        w("")
        w("| True Cayley distance | Ratings | Mean rating |")
        w("|---:|---:|---:|")
        for k in sorted(by_d):
            w("| %d | %d | %s |" % (k, len(by_d[k]),
                                    fmt(sum(by_d[k]) / len(by_d[k]), 2)))
    w("")


def part_b_tables(w, subset, truth):
    """Part B for one set of returns."""
    b_reports = [r for r in subset if r["part_b"]]
    if not b_reports:
        w("No return on this path attempted part B.")
        w("")
        return
    found = sum(1 for r in b_reports if r["part_b"]["found_identical_pair"])
    w("Named in %d of %d return%s on this path that attempted part B."
      % (found, len(b_reports), "" if len(b_reports) == 1 else "s"))
    w("")
    w("| File | Named identical | Found it | False pairs | "
      "Named the two margins as near |")
    w("|:---|:---|:---|:---|:---|")
    for r in b_reports:
        b = r["part_b"]
        w("| `%s` | %s | %s | %s | %s |"
          % (r["name"],
             ", ".join("%s+%s" % p for p in b["named_identical_pairs"]) or "none",
             "yes" if b["found_identical_pair"] else "no",
             ", ".join("%s+%s" % p for p in b["false_identical_pairs"]) or "none",
             yesno(b["named_the_margin_pair"])))
    w("")
    tally_w = {}
    tally_b = {}
    for r in b_reports:
        for k, v in r["part_b"]["judgement_tally_writable"].items():
            tally_w[k] = tally_w.get(k, 0) + v
        for k, v in r["part_b"]["judgement_tally_blended"].items():
            tally_b[k] = tally_b.get(k, 0) + v
    if tally_w:
        w("Tally, scale or out of tune, over the %d return%s on this path."
          % (len(b_reports), "" if len(b_reports) == 1 else "s"))
        w("")
        w("| Item kind | " + " | ".join(sorted(tally_w)) + " |")
        w("|:---|" + "---:|" * len(tally_w))
        w("| Scale could be written down | "
          + " | ".join(str(tally_w[k]) for k in sorted(tally_w)) + " |")
        w("| Sits between the keys | "
          + " | ".join(str(tally_b.get(k, 0)) for k in sorted(tally_w)) + " |")
        w("")


def part_a_tables(w, subset):
    """Part A for one set of returns, or for the pool of every profession."""
    a_reports = [r for r in subset if r["part_a"]]
    if not a_reports:
        w("No return in this group attempted part A.")
        w("")
        return
    borda = {l: [] for l in RANKABLE_A}
    for r in a_reports:
        letters = r["part_a"]["rank_given"]
        if (len(letters) == len(set(letters)) == 6
                and set(letters) <= set(RANKABLE_A)):
            for i, l in enumerate(letters):
                if l in borda:
                    borda[l].append(i + 1)
    usable = max([len(v) for v in borda.values()] + [0])
    w("Mean position in the happiest-first ranking, over %d usable ranking%s "
      "from the %d return%s here that attempted part A. A lower number is "
      "happier. A ranking that is not six distinct letters from A to F is left "
      "out."
      % (usable, "" if usable == 1 else "s", len(a_reports),
         "" if len(a_reports) == 1 else "s"))
    w("")
    w("| Item | Rankings | Mean position |")
    w("|:---|---:|---:|")
    for l in RANKABLE_A:
        v = borda[l]
        w("| %s | %d | %s |" % (l, len(v),
                                fmt(sum(v) / len(v), 2) if v else "none"))
    w("")
    w("| Situation | Picks |")
    w("|:---|:---|")
    for n in SITUATIONS:
        counts = {}
        for r in a_reports:
            p = r["part_a"]["situations"][n]["pick"]
            if p:
                counts[p] = counts.get(p, 0) + 1
        w("| %d | %s |" % (n, ", ".join("%s %d" % kv
                                        for kv in sorted(counts.items()))
                           or "no answers"))
    w("")


def profession_heading(w, prof, n, part=None):
    """One heading per profession, with the count and what it carries."""
    w("### %s, %s"
      % (PROFESSION_TITLE.get(prof, prof),
         "no returns" if n == 0 else
         ("1 return" if n == 1 else "%d returns" % n)))
    w("")
    if n == 0:
        w("No return on this path. Nothing in this section is about %s, and the "
          "absence is a fact about the panel rather than a number of zero."
          % PROFESSION_TITLE.get(prof, prof).lower())
        w("")
        return False
    w("%s." % what_the_count_supports(n).capitalize())
    w("")
    return True


def render_panel(reports, truth, responses_dir):
    L = []
    w = L.append
    groups = group_by_profession(reports)
    order = profession_order(groups)

    w("# Listening pack version 2, panel summary")
    w("")
    w("| Field | Value |")
    w("|:---|:---|")
    w("| Responses read | %d |" % len(reports))
    for p in order:
        w("| %s | %d |" % (PROFESSION_TITLE.get(p, p), len(groups[p])))
    w("| Source directory | `%s` |" % responses_dir)
    w("| Written | %s |" % datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"))
    w("| Randomness | none drawn |")
    w("")

    w("## The panel at this run")
    w("")
    w("The three paths are three professions and not three seats. Any number of "
      "people can answer on any path, the split between them is whatever it "
      "turns out to be, and it is not balanced by design. Everything below is "
      "reported per profession with the count beside it, because a result from "
      "two composers and a result from twelve are different objects and the "
      "output should not let anyone forget which one they are reading.")
    w("")
    w("| Profession | Returns | What this count supports |")
    w("|:---|---:|:---|")
    for p in order:
        n = len(groups[p])
        w("| %s | %d | %s |"
          % (PROFESSION_TITLE.get(p, p), n,
             ("counted under no profession, because the path could not be "
              "established") if p not in PROFESSIONS
             else what_the_count_supports(n)))
    w("")
    w(STANDING_CAVEAT)
    w("")
    zero = [p for p in PROFESSIONS if not groups[p]]
    if zero:
        w("No returns at all on the %s path%s. Every part %s asked says so "
          "below in place of a number."
          % (and_list(zero), "" if len(zero) == 1 else "s",
             "it is" if len(zero) == 1 else "they are"))
        w("")
    if groups.get("unknown"):
        w("%d return%s could not be put on a path at all and %s counted under "
          "none of the three."
          % (len(groups["unknown"]),
             "" if len(groups["unknown"]) == 1 else "s",
             "is" if len(groups["unknown"]) == 1 else "are"))
        w("")

    w("## Who answered")
    w("")
    w("| File | Profession | Status | Answered of expected | Contradictions |")
    w("|:---|:---|:---|---:|---:|")
    for p in order:
        for r in groups[p]:
            w("| `%s` | %s | %s | %d of %d | %d |"
              % (r["name"], r["path"] or "unknown", r["status"], r["answered"],
                 r["expected"], len(r["contradictions"])))
    w("")

    # ---- Part A, the one part built to pool ----
    w("## Part A, tallied, no objective answer")
    w("")
    w("Part A is the only part built to pool across professions. Composers and "
      "music therapists hear the same seven items in the same order, and only "
      "the wording of the four situations differs, from a director's "
      "description to a colleague's. The pooled tally is given first and the "
      "per-profession tallies under it, so the pooling can be checked rather "
      "than assumed. If the professions converge separately on different items, "
      "the pooled tally is hiding it and the per-profession tallies are where "
      "that shows.")
    w("")
    a_all = [r for r in reports if r["part_a"]]
    w("### Pooled over every profession asked part A, %d return%s"
      % (len(a_all), "" if len(a_all) == 1 else "s"))
    w("")
    if a_all:
        w("In the pool: %s."
          % and_list(["%s %d" % (p, len([r for r in groups[p] if r["part_a"]]))
                      for p in order
                      if any(r["part_a"] for r in groups[p])]))
        w("")
    part_a_tables(w, reports)
    for p in profession_order(groups):
        if p not in PART_ASKED_OF["A"] and not any(
                r["part_a"] for r in groups[p]):
            continue
        n = len(groups[p])
        if profession_heading(w, p, n):
            part_a_tables(w, groups[p])
    w("Convergence is the question here, and it is read off the spread of those "
      "picks rather than off any key. The key holds no row for part A.")
    w("")

    # ---- Parts that are not built to pool ----
    for part, title, note, tables in (
        ("B", "Part B, scored on the identical pair",
         "Asked of composers and researchers. A composer reaches part B after "
         "part A; a researcher reaches it first.", "b"),
        ("C", "Part C, scored against the true Cayley distance",
         "Asked of composers and researchers. A composer reaches part C after "
         "parts A and B; a researcher after part B.", "c"),
        ("D", "Part D, scored against the true separations",
         "Asked of music therapists and researchers. A therapist reaches part D "
         "after part A; a researcher after parts B and C.", "d"),
    ):
        w("## %s" % title)
        w("")
        w(note)
        w("")
        w(NOT_POOLED_ACROSS_PROFESSIONS)
        w("")
        if part == "B":
            w("The identical pair is %s."
              % ", ".join("%s and %s" % p for p in truth["B_identical_pairs"]))
            w("")
            if truth.get("B_margin_pair"):
                w("The two interpolation margins are %s and %s, %s cents apart. "
                  "Whether they are told apart is what decides delta, and it is "
                  "reported rather than scored, because near is a judgement."
                  % (truth["B_margin_pair"][0], truth["B_margin_pair"][1],
                     fmt(truth["B_margin_cents"], 1)))
                w("")
        key = "part_" + part.lower()
        for p in profession_order(groups):
            if p not in PART_ASKED_OF[part] and not any(
                    r[key] for r in groups[p]):
                continue
            n = len(groups[p])
            if not profession_heading(w, p, n):
                continue
            if part == "B":
                part_b_tables(w, groups[p], truth)
            elif part == "C":
                part_c_tables(w, groups[p])
            else:
                part_d_tables(w, groups[p])

    # ---- opinions and free text, per profession ----
    w("## Opinion questions, tallied")
    w("")
    w("Per profession. The instrument questions are asked of therapists only "
      "and the method questions of researchers only, so most of these have one "
      "profession behind them and pooling them would say nothing.")
    w("")
    for p in profession_order(groups):
        n = len(groups[p])
        if not profession_heading(w, p, n):
            continue
        op = {}
        for r in groups[p]:
            for k, v in r["opinion_picks"].items():
                op.setdefault(k, {}).setdefault(v, 0)
                op[k][v] += 1
        if op:
            w("| Question | Answers |")
            w("|:---|:---|")
            for k in sorted(op):
                w("| `%s` | %s |" % (k, ", ".join("%s %d" % kv
                                                  for kv in sorted(op[k].items()))))
        else:
            w("No opinion question was answered on this path.")
        w("")

    w("## Free text, tallied")
    w("")
    for p in profession_order(groups):
        n = len(groups[p])
        if not profession_heading(w, p, n):
            continue
        ft = {}
        for r in groups[p]:
            for k, v in r["free_text"].items():
                if v["answered"]:
                    ft[k] = ft.get(k, 0) + 1
        if ft:
            w("| Box | Returns with something in it |")
            w("|:---|---:|")
            for k in sorted(ft):
                w("| `%s` | %d of %d |" % (k, ft[k], n))
        else:
            w("No free-text box was filled on this path.")
        w("")

    w("## Contradictions and coverage")
    w("")
    any_c = False
    for p in profession_order(groups):
        for r in groups[p]:
            if r["contradictions"]:
                any_c = True
                w("**`%s`**, %s" % (r["name"], r["path"] or "path unknown"))
                w("")
                for line in r["contradictions"]:
                    w("- %s" % line)
                w("")
    if not any_c:
        w("None found in any response.")
        w("")

    w("## What this run is")
    w("")
    w("Read every number above against the count of the profession it came "
      "from, which is %s." % counts_line(groups))
    w("")
    w(STANDING_CAVEAT)
    w("")
    w("Part A, the free-text boxes and the opinion questions carry no right "
      "answer and are reported as a tally. Parts B, C and D are scored against "
      "`ANSWER-KEY-v2.json`. A return that arrives after this run was written "
      "does not amend it. The run is redone over the whole directory and the "
      "counts in the table above change with it, which is why they are stamped "
      "on every summary this script writes.")
    return "\n".join(L) + "\n"


# ----------------------------------------------------------------------------
# Entry point
# ----------------------------------------------------------------------------

def collect_files(target):
    if os.path.isfile(target):
        return [target]
    if os.path.isdir(target):
        out = []
        for name in sorted(os.listdir(target)):
            if name.startswith("."):
                continue
            if name.lower().endswith((".txt", ".text", ".md")):
                out.append(os.path.join(target, name))
        return out
    return None


def main(argv=None):
    here = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser(
        description="Score returned listening pack responses against the key.")
    ap.add_argument("--responses", required=True,
                    help="directory of returned response files, or one file")
    ap.add_argument("--key", default=os.path.join(here, "stimuli",
                                                  "ANSWER-KEY-v2.json"),
                    help="path to ANSWER-KEY-v2.json")
    ap.add_argument("--out", default=os.path.join(here, "results"),
                    help="directory to write the summaries into")
    args = ap.parse_args(argv)

    if not os.path.exists(args.key):
        sys.stderr.write(
            "s8_intake: cannot find the answer key.\n"
            "  looked for: %s\n"
            "  it needs ANSWER-KEY-v2.json, which is held with the study and is\n"
            "  not shipped inside the pack. Pass its path with --key.\n"
            % args.key)
        return 2

    files = collect_files(args.responses)
    if files is None:
        sys.stderr.write(
            "s8_intake: cannot find the responses.\n"
            "  looked for: %s\n"
            "  it needs either a directory of returned response files or one\n"
            "  such file. Pass it with --responses.\n" % args.responses)
        return 2
    if not files:
        sys.stderr.write(
            "s8_intake: no response files in %s\n"
            "  it needs at least one file ending .txt, .text or .md, holding the\n"
            "  text the pack exports. Nothing was written.\n" % args.responses)
        return 2

    key = load_key(args.key)
    truth = derive_truth(key)
    missing = [p for p in ("B", "C", "D") if not truth[p]]
    if missing:
        sys.stderr.write(
            "s8_intake: the key at %s carries no rows for part %s, so that part\n"
            "  cannot be scored. It needs a key with entries labelled B1 to B7,\n"
            "  C1 to C10 and D1 to D8.\n" % (args.key, ", ".join(missing)))
        return 2

    os.makedirs(args.out, exist_ok=True)

    # First pass: read everything, because the count per profession belongs on
    # every summary and is not known until the whole directory has been read.
    reports = []
    parsed = []
    for path in files:
        with open(path, "r", encoding="utf-8", errors="replace") as fh:
            text = fh.read()
        answers, meta = parse_response(text)
        rep = analyse(os.path.basename(path), answers, meta, truth)
        reports.append(rep)
        parsed.append((path, answers, rep))

    groups = group_by_profession(reports)

    # Second pass: write.
    for path, answers, rep in parsed:
        stem = os.path.splitext(os.path.basename(path))[0]
        with open(os.path.join(args.out, stem + ".summary.txt"), "w",
                  encoding="utf-8") as fh:
            fh.write(render_respondent(rep, groups))
        with open(os.path.join(args.out, stem + ".parsed.json"), "w",
                  encoding="utf-8") as fh:
            json.dump({"answers": answers, "report": rep}, fh, indent=1,
                      sort_keys=True, default=str)

        print("%-34s path %-11s %s, %d of %d answered, %d contradiction%s"
              % (os.path.basename(path), rep["path"] or "unknown", rep["status"],
                 rep["answered"], rep["expected"], len(rep["contradictions"]),
                 "" if len(rep["contradictions"]) == 1 else "s"))

    panel = render_panel(reports, truth, os.path.abspath(args.responses))
    with open(os.path.join(args.out, "PANEL-SUMMARY.md"), "w",
              encoding="utf-8") as fh:
        fh.write(panel)
    with open(os.path.join(args.out, "panel.json"), "w",
              encoding="utf-8") as fh:
        json.dump({"by_profession": {p: [r["name"] for r in groups[p]]
                                     for p in groups},
                   "counts": {p: len(groups[p]) for p in groups},
                   "reports": reports},
                  fh, indent=1, sort_keys=True, default=str)

    print("")
    print("returns by profession: %s" % counts_line(groups))
    for p in profession_order(groups):
        print("  %-12s %s" % (p, what_the_count_supports(len(groups[p]))))
    print("")
    for line in textwrap.wrap(STANDING_CAVEAT, 76):
        print(line)
    print("")
    print("wrote %d per-respondent summaries and PANEL-SUMMARY.md to %s"
          % (len(reports), os.path.abspath(args.out)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
