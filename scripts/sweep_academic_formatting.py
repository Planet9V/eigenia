#!/usr/bin/env python3
"""
Repository-wide Academic Formatting & Body Sweep
Cleans up misplaced heading paragraphs, glued citations, loose front-matter, and em dashes.
"""

import os
import re
import glob

def clean_death_wobble():
    path = "references/WG-04-CF-Cascading-Failures/WG-04-CF-Death Wobble-The Grids Precarious Pulse Frequency Instability - jmckenney.md"
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    # 1. Remove loose Lab Sponsor line
    text = re.sub(r"\n\s*Lab Sponsor\s+J\.McKenney\s*\n", "\n\n", text, flags=re.IGNORECASE)

    # 2. Fix the 4 heading paragraphs
    def split_h(m):
        header_tag = m.group(1).strip()
        body = m.group(2).strip()
        # header_tag is e.g. "### 1. Protection System Misoperation (The Domino Effect Trigger)"
        return f"\n{header_tag}\n\n{body}\n"

    text = re.sub(r"\n(#{1,6}\s+\d+\.\s+[^:\n]+):\s+([^\n]+)", split_h, text)

    # 3. Clean up glued footnote numbers like "word.4" -> "word [4]."
    # Replace glued digits after word
    text = re.sub(r"([a-zA-Z]{3,})\.(\d{1,3})(\s+|$)", r"\1 [\2].\3", text)

    # Specific citation fixes
    text = re.sub(r"\bcharging\s+1,", "charging [1],", text)
    text = re.sub(r"\binfrastructure\.2\b", "infrastructure [2].", text)
    text = re.sub(r"\btechnologies\.4\b", "technologies [4].", text)
    text = re.sub(r"\bsafety\.12\b", "safety [12].", text)
    text = re.sub(r"\befficiency\s+16\b", "efficiency [16]", text)
    text = re.sub(r"\(60 Hz\)\s+6,", "(60 Hz) [6],", text)
    text = re.sub(r"50 Hz\.20\b", "50 Hz [20].", text)
    text = re.sub(r"network\.20\b", "network [20].", text)
    text = re.sub(r"pushes it up\.20\b", "pushes it up [20].", text)
    text = re.sub(r"less\s+7,", "less [7],", text)
    text = re.sub(r"10mHz\s+22\)", "10mHz [22])", text)
    text = re.sub(r"connected to the grid\.6\b", "connected to the grid [6].", text)
    text = re.sub(r"kinetic energy\.4\b", "kinetic energy [4].", text)
    text = re.sub(r"shocks\.5\b", "shocks [5].", text)
    text = re.sub(r"high-inertia system\.5\b", "high-inertia system [5].", text)
    text = re.sub(r"intervals\s+21\)", "intervals [21])", text)
    text = re.sub(r"cascading failure\.46\b", "cascading failure [46].", text)
    text = re.sub(r"grid collapse\.21\b", "grid collapse [21].", text)
    text = re.sub(r"is a standard\s+52\)\.20\b", "is a standard [52]) [20].", text)
    text = re.sub(r"computational delays\.20\b", "computational delays [20].", text)
    text = re.sub(r"fall\.21\b", "fall [21].", text)
    text = re.sub(r"in North America\s+6\)\b", "in North America [6])", text)
    text = re.sub(r"system design\.55\b", "system design [55].", text)
    text = re.sub(r"design rate\s+55\)\b", "design rate [55])", text)
    text = re.sub(r"turbine blades\s+6\)\.6\b", "turbine blades [6]) [6].", text)
    text = re.sub(r"North America\s+46\b", "North America [46]", text)
    text = re.sub(r"Europe\s+62\b", "Europe [62]", text)
    text = re.sub(r"high RoCoF\.45\b", "high RoCoF [45].", text)
    text = re.sub(r"resulting islands\.16\b", "resulting islands [16].", text)
    text = re.sub(r"both separated systems collapse\.16\b", "both separated systems collapse [16].", text)
    text = re.sub(r"frequency response adequacy\s+26\b", "frequency response adequacy [26]", text)
    text = re.sub(r"major reliability risk\.70\b", "major reliability risk [70].", text)
    text = re.sub(r"prolonged blackouts\.71\b", "prolonged blackouts [71].", text)
    text = re.sub(r"hundreds of miles away, often non-contiguously\.46\b", "hundreds of miles away, often non-contiguously [46].", text)
    text = re.sub(r"less \"braking power\"\.\s*5\b", "less \"braking power\" [5].", text)
    text = re.sub(r"remaining components\.5\b", "remaining components [5].", text)
    text = re.sub(r"destabilizing the system\.55\b", "destabilizing the system [55].", text)
    text = re.sub(r"sensitive loads\s+52\)\b", "sensitive loads [52])", text)
    text = re.sub(r"predict and control\.7\b", "predict and control [7].", text)
    text = re.sub(r"stark reminder\.6\b", "stark reminder [6].", text)
    text = re.sub(r"system actions\.6\b", "system actions [6].", text)
    text = re.sub(r"persistent threat\.6\b", "persistent threat [6].", text)
    text = re.sub(r"low inertia\.6\b", "low inertia [6].", text)

    # 4. Zero em dashes
    text = text.replace("—", "; ").replace("–", "; ").replace(" -- ", "; ")

    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Cleaned Death Wobble.")

def clean_wg02_dt1():
    path = "references/WG-02-DT-Digital-Twin/WG-02-DT-1.md"
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    out = []
    for l in lines:
        s = l.strip()
        # Remove loose Lab Sponsor
        if "Lab Sponsor" in s:
            continue
        # Split run-in headings: "## 1. Title. Narrative paragraph..."
        m = re.match(r"^##\s+(\d+\.\s+[^.]+?\.)\s+(.+)$", s)
        if m and len(m.group(2)) > 50:
            out.append(f"### {m.group(1)}\n\n{m.group(2)}\n\n")
            continue
        # Split run-in headings: "## 1. Title: Narrative..."
        m2 = re.match(r"^##\s+([^:]+):\s+(.+)$", s)
        if m2 and len(m2.group(2)) > 50:
            out.append(f"### {m2.group(1)}\n\n{m2.group(2)}\n\n")
            continue
        out.append(l)

    text = "".join(out).replace("—", "; ").replace("–", "; ").replace(" -- ", "; ")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Cleaned WG-02-DT-1.")

def clean_wg02_dt4():
    path = "references/WG-02-DT-Digital-Twin/WG-02-DT-4.md"
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    text = re.sub(r"\n\s*Lab Sponsor[^\n]+\n", "\n\n", text)
    # Split run-in headings e.g. "## 1. Feature Extraction at T=0 — Extract..."
    def split_step(m):
        title = m.group(1).strip()
        body = m.group(2).strip()
        return f"\n### {title}\n\n{body}\n"

    text = re.sub(r"\n##\s+(\d+\.\s+[^—\n]+)\s*[—–]\s+([^\n]+)", split_step, text)
    text = text.replace("—", "; ").replace("–", "; ").replace(" -- ", "; ")

    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Cleaned WG-02-DT-4.")

def clean_frontier_ai_hardware():
    path = "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Frontier-AI-Hardware-Security.md"
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    out = []
    for l in lines:
        s = l.strip()
        # Line 10: entire paragraph formatted as H1: # This document is an informal follow-up...
        if s.startswith("# This document is an informal follow-up"):
            out.append(s.replace("# ", "") + "\n\n")
            continue
        # Split headings with colons and long narratives
        m = re.match(r"^(#{1,6}\s+[^:]+):\s+(.+)$", s)
        if m and len(m.group(2)) > 60:
            out.append(f"{m.group(1)}\n\n{m.group(2)}\n\n")
            continue
        out.append(l)

    text = "".join(out).replace("—", "; ").replace("–", "; ").replace(" -- ", "; ")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Cleaned Frontier AI Hardware Security.")

def clean_general_files():
    files = sorted(glob.glob("references/**/*.md", recursive=True))
    for f in files:
        with open(f, "r", encoding="utf-8") as fh:
            text = fh.read()

        changed = False

        # 1. Clean glued citations: [a-zA-Z]{3,}\.(\d{1,3})(\s+|$)
        # Exclude known common extensions or versions like .py, .ts, etc.
        def fix_glued(m):
            w = m.group(1)
            num = m.group(2)
            trail = m.group(3)
            # Avoid decimal numbers
            if w in ["Section", "Figure", "Table", "Eq", "Ref", "v", "vol", "no", "ver"]:
                return m.group(0)
            return f"{w} [{num}].{trail}"

        new_text = re.sub(r"([a-zA-Z]{3,})\.(\d{1,3})(\s+|$)", fix_glued, text)
        if new_text != text:
            text = new_text
            changed = True

        # 2. Remove loose Lab Sponsor lines
        new_text = re.sub(r"\n\s*Lab Sponsor[^\n]+\n", "\n\n", text)
        if new_text != text:
            text = new_text
            changed = True

        # 3. Clean up loose Working Group lines in front matter
        lines = text.split("\n")
        new_lines = []
        in_front_matter = True
        for idx, l in enumerate(lines):
            if idx > 15:
                in_front_matter = False
            s = l.strip()
            if in_front_matter and s.startswith("Working Group:") and not s.startswith("**Working Group:**"):
                changed = True
                continue
            new_lines.append(l)

        text = "\n".join(new_lines)

        # 4. Zero em dashes
        new_text = text.replace("—", "; ").replace("–", "; ").replace(" -- ", "; ")
        if new_text != text:
            text = new_text
            changed = True

        if changed:
            with open(f, "w", encoding="utf-8") as fh:
                fh.write(text)
            print(f"Cleaned general: {f}")

if __name__ == "__main__":
    clean_death_wobble()
    clean_wg02_dt1()
    clean_wg02_dt4()
    clean_frontier_ai_hardware()
    clean_general_files()
    print("All sweeps completed.")
