#!/usr/bin/env python3
"""
Surgical Fix for all Academic Publication Formatting Issues:
1. Replaces isolated '; -' divider artifacts with proper markdown '---'
2. Normalizes all remaining glued citations ([a-zA-Z]{3,}\.(\d{1,3})) to '[N].'
3. Decouples narrative prose from headings in WG-02-DT-4, WG-02-DT-5, and WG-05-CAD-Frontier-AI-Hardware-Security.
"""

import os
import re
import glob

def fix_dash_artifacts():
    files = sorted(glob.glob("references/**/*.md", recursive=True))
    for f in files:
        with open(f, "r", encoding="utf-8") as fh:
            text = fh.read()
        
        # Replace lines that are only '; -' with '---'
        new_text = re.sub(r"^\s*;\s*-\s*$", "---", text, flags=re.MULTILINE)
        if new_text != text:
            with open(f, "w", encoding="utf-8") as fh:
                fh.write(new_text)
            print(f"Fixed divider artifacts in {f}")

def fix_glued_citations_in_lacanian():
    lacanian_files = [
        "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Calculus-of-the-Subject.md",
        "references/WG-03-ML-Behaviorial_Modeling/WG-03-ML-Morphogenesis-Signifying-Chain-gGNN.md"
    ]
    for path in lacanian_files:
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()

        def repl(m):
            w = m.group(1)
            num = m.group(2)
            if w in ["Section", "Figure", "Table", "Eq", "Ref", "ver", "TASE", "DEXPI"]:
                return m.group(0)
            return f"{w} [{num}]."

        # Match word.digits followed by space or punctuation or end of line
        new_text = re.sub(r"\b([a-zA-Z]{3,})\.(\d{1,3})(?=\s|[,\)\]]|$)", repl, text)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_text)
        print(f"Normalized citations in {path}")

def fix_specific_headings():
    # 1. WG-02-DT-4.md
    p_dt4 = "references/WG-02-DT-Digital-Twin/WG-02-DT-4.md"
    if os.path.exists(p_dt4):
        with open(p_dt4, "r", encoding="utf-8") as f:
            t = f.read()
        
        t = re.sub(
            r"## 1\. Feature Extraction at T=0[;:]\s*(.+)",
            r"### Stage 1: Feature Extraction at $T=0$\n\n\1",
            t
        )
        t = re.sub(
            r"## 2\. Trajectory Sampling \(Simulation\)[;:]\s*(.+)",
            r"### Stage 2: Trajectory Sampling (Simulation)\n\n\1",
            t
        )
        t = re.sub(
            r"## 3\. Ensemble Aggregation at T\+Δt[;:]\s*(.+)",
            r"### Stage 3: Ensemble Aggregation at $T+\\Delta t$\n\n\1",
            t
        )
        with open(p_dt4, "w", encoding="utf-8") as f:
            f.write(t)
        print("Fixed headings in WG-02-DT-4.md")

    # 2. WG-02-DT-5.md
    p_dt5 = "references/WG-02-DT-Digital-Twin/WG-02-DT-5.md"
    if os.path.exists(p_dt5):
        with open(p_dt5, "r", encoding="utf-8") as f:
            t = f.read()
        
        t = re.sub(
            r"## The compelling buyer takeaway: Cyber Digital Twins don’t sell “coverage”[—–-]it sells anti-fragile truth",
            r"## Strategic Takeaway: Anti-Fragile Systems Truth\n\nCyber Digital Twins do not sell static \"coverage\"; they deliver anti-fragile, empirically tested truth.",
            t
        )
        with open(p_dt5, "w", encoding="utf-8") as f:
            f.write(t)
        print("Fixed heading in WG-02-DT-5.md")

    # 3. WG-05-CAD-Frontier-AI-Hardware-Security.md
    p_cad = "references/WG-05-CAD-DEXPI-2/WG-05-CAD-Frontier-AI-Hardware-Security.md"
    if os.path.exists(p_cad):
        with open(p_cad, "r", encoding="utf-8") as f:
            t = f.read()
        
        # Line 10: # This document is an informal follow-up... -> standard paragraph
        t = re.sub(r"^# (This document is an informal follow-up[^\n]+)", r"\1", t, flags=re.MULTILINE)
        
        # Line 162: Strategic Partnership
        t = re.sub(
            r"## Strategic Partnership between Frontier AI Model Operators and Semiconductor Silicon Manufacturers requires a framework[^\n]+",
            r"## Strategic Partnership Framework\n\nStrategic partnership between Frontier AI model operators and semiconductor silicon manufacturers requires a framework that bridges platform firmware, accelerator silicon, and physical datacenter engineering into a unified zero-trust architecture. This unified view ensures consolidation of all current-state audits, platform baselines, and verification protocols in a single authoritative source of truth for all parties to reference.",
            t
        )
        with open(p_cad, "w", encoding="utf-8") as f:
            f.write(t)
        print("Fixed headings in WG-05-CAD-Frontier-AI-Hardware-Security.md")

if __name__ == "__main__":
    fix_dash_artifacts()
    fix_glued_citations_in_lacanian()
    fix_specific_headings()
    print("Completed surgical fixes.")
