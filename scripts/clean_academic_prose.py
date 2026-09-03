#!/usr/bin/env python3
"""
Academic Prose Polishing Script:
1. Eliminates em dashes (\u2014) replacing with appropriate academic punctuation (; or ,).
2. Substitutes prohibited AI words with precise, domain-specific terminology.
"""

import glob
import re

def clean_file(path):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    orig = text

    # 1. Em dashes
    text = text.replace(" — ", "; ")
    text = text.replace("—", "; ")
    text = text.replace(" – ", "; ")

    # 2. Prohibited AI words
    replacements = [
        (r"\butilize\b", "use"),
        (r"\butilizes\b", "uses"),
        (r"\butilized\b", "used"),
        (r"\butilizing\b", "using"),
        (r"\butilization\b", "use"),
        (r"\bleverage\b", "apply"),
        (r"\bleverages\b", "applies"),
        (r"\bleveraged\b", "applied"),
        (r"\bleveraging\b", "applying"),
        (r"\bpivotal\b", "critical"),
        (r"\btestament to\b", "demonstration of"),
        (r"\bfoster\b", "advance"),
        (r"\bfosters\b", "advances"),
        (r"\bfostered\b", "advanced"),
        (r"\bfostering\b", "advancing"),
        (r"\bstreamline\b", "optimize"),
        (r"\bstreamlines\b", "optimizes"),
        (r"\bstreamlined\b", "optimized"),
        (r"\bstreamlining\b", "optimizing"),
        (r"\bin today's world\b", "in modern operations"),
        (r"\bat its core\b", "fundamentally"),
        (r"\bbeacon\b", "model"),
        (r"\bgame-changing\b", "transformative"),
        (r"\bharness\b", "channel"),
        (r"\bharnesses\b", "channels"),
        (r"\bharnessed\b", "channeled"),
        (r"\bharnessing\b", "channeling"),
        (r"\bfurthermore\b", "in addition"),
        (r"\bFurthermore\b", "In addition"),
    ]

    for pattern, repl in replacements:
        text = re.sub(pattern, repl, text)

    if text != orig:
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
        return True
    return False

if __name__ == "__main__":
    files = sorted(glob.glob("references/**/*.md", recursive=True))
    changed_count = 0
    for f in files:
        if clean_file(f):
            changed_count += 1
    print(f"Cleaned academic prose across {changed_count} files.")
