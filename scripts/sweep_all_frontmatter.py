#!/usr/bin/env python3
"""
Master Front-Matter Sweep Script
Eigenia Systems Assurance & Academic Publishing Standard

Updates all compiler scripts and reference documents to enforce the clean
specification table format, eliminating raw bold metadata walls, redundant
titles/subtitles, and loose Lab Sponsor lines across all 45 files.
"""

import os
import re
import glob
import subprocess

def clean_compiler_script(path):
    with open(path, "r", encoding="utf-8") as f:
        code = f.read()

    # Pattern for compilers where header is defined in content = """... or academic_header = """...
    # We look for the block containing **Document Identifier:**
    pat = re.compile(
        r"(content\s*=\s*(?:r?\"\"\"|r?\x27\x27\x27)|academic_header\s*=\s*\"\"\")\s*"
        r"(?:#\s+[^\n]+\n+)?(?:##\s+[^\n]+\n+)?"
        r"\*\*Document Identifier:\*\*\s*(.+?)\n+"
        r"\*\*Classification:\*\*\s*(.+?)\n+"
        r"(?:\*\*Working Group:\*\*\s*(.+?)\n+)?"
        r"\*\*Standard Equivalents:\*\*\s*(.+?)\n+"
        r"\*\*Author:\*\*\s*(.+?)\n+"
        r"\*\*Affiliation:\*\*\s*(.+?)\n+"
        r"(?:\*\*Interactive Reference:\*\*\s*(.+?)\n+)?"
        r"(?:\s*---\s*\n+)?",
        re.MULTILINE
    )

    m = pat.search(code)
    if not m:
        return False

    prefix = m.group(1)
    doc_id = m.group(2).strip()
    classification = m.group(3).strip()
    wg_explicit = m.group(4).strip() if m.group(4) else None
    standards = m.group(5).strip()
    author = m.group(6).strip()
    affiliation = m.group(7).strip()
    interactive_ref = m.group(8).strip() if m.group(8) else None

    if wg_explicit:
        wg = wg_explicit
    else:
        wg_m = re.search(r"(WG-?\d+-[A-Z]+)", doc_id)
        wg = wg_m.group(1).replace("WG", "WG-") if wg_m else "WG-05-CAD"
        if not wg.startswith("WG-"):
            wg = "WG-" + wg

    table_lines = [
        f"{prefix}| Document ID | Working Group | Normative Equivalents | Classification |",
        "| :--- | :--- | :--- | :--- |",
        f"| {doc_id} | {wg} | {standards} | {classification} |",
        "",
        "**Authors:** Multi-Agent Deliberation Panel (Alpha-Physics, Beta-Assurance, Gamma-Actuarial, Delta-Agentic, Epsilon-Implementation)  ",
        f"**Lead Systems Assurance Architect:** {author}  ",
        f"**Affiliation:** {affiliation}  "
    ]
    if interactive_ref:
        table_lines.append(f"**Interactive Reference:** {interactive_ref}  ")
    table_lines.append("")

    new_header = "\n".join(table_lines) + "\n"
    new_code = code[:m.start()] + new_header + code[m.end():].lstrip()

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_code)
    return True

def clean_older_reference_doc(path):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    # Strip loose Lab Sponsor line
    sponsor_pat = re.compile(r"^\s*Lab Sponsor\s*(?:Resident\s*)?[^\n]*\n+", re.MULTILINE | re.IGNORECASE)
    if sponsor_pat.search(text):
        new_text = sponsor_pat.sub("", text)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_text)
        return True
    return False

def clean_spec_reference_doc(path):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    if "| Document ID |" in text[:200]:
        return False

    pat = re.compile(
        r"^(?:#\s+[^\n]+\n+)?(?:##\s+[^\n]+\n+)?"
        r"\*\*Document Identifier:\*\*\s*(.+?)\n+"
        r"\*\*Classification:\*\*\s*(.+?)\n+"
        r"(?:\*\*Working Group:\*\*\s*(.+?)\n+)?"
        r"\*\*Standard Equivalents:\*\*\s*(.+?)\n+"
        r"\*\*Author:\*\*\s*(.+?)\n+"
        r"\*\*Affiliation:\*\*\s*(.+?)\n+"
        r"(?:\*\*Interactive Reference:\*\*\s*(.+?)\n+)?"
        r"(?:\s*---\s*\n+)?",
        re.MULTILINE
    )

    m = pat.search(text)
    if not m:
        return False

    doc_id = m.group(1).strip()
    classification = m.group(2).strip()
    wg_explicit = m.group(3).strip() if m.group(3) else None
    standards = m.group(4).strip()
    author = m.group(5).strip()
    affiliation = m.group(6).strip()
    interactive_ref = m.group(7).strip() if m.group(7) else None

    if wg_explicit:
        wg = wg_explicit
    else:
        wg_m = re.search(r"(WG-?\d+-[A-Z]+)", doc_id)
        wg = wg_m.group(1).replace("WG", "WG-") if wg_m else "WG-05-CAD"
        if not wg.startswith("WG-"):
            wg = "WG-" + wg

    table_lines = [
        "| Document ID | Working Group | Normative Equivalents | Classification |",
        "| :--- | :--- | :--- | :--- |",
        f"| {doc_id} | {wg} | {standards} | {classification} |",
        "",
        "**Authors:** Multi-Agent Deliberation Panel (Alpha-Physics, Beta-Assurance, Gamma-Actuarial, Delta-Agentic, Epsilon-Implementation)  ",
        f"**Lead Systems Assurance Architect:** {author}  ",
        f"**Affiliation:** {affiliation}  "
    ]
    if interactive_ref:
        table_lines.append(f"**Interactive Reference:** {interactive_ref}  ")
    table_lines.append("")

    new_header = "\n".join(table_lines) + "\n"
    new_text = new_header + text[m.end():].lstrip()

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_text)
    return True

if __name__ == "__main__":
    print("=== EXECUTING MASTER FRONT-MATTER SWEEP ===")
    
    # 1. Update Compiler Scripts
    compiler_scripts = sorted(glob.glob("scripts/compile_*.py"))
    comp_updated = 0
    for cs in compiler_scripts:
        if clean_compiler_script(cs):
            comp_updated += 1
            print(f"[COMPILER UPDATED] {os.path.basename(cs)}")
            
    # 2. Run all compiler scripts to ensure perfect generation
    print("\n--- Running Compilers ---")
    for cs in compiler_scripts:
        res = subprocess.run(["python3", cs], capture_output=True, text=True)
        if res.returncode == 0:
            print(f"[COMPILED OK] {os.path.basename(cs)}")
        else:
            print(f"[COMPILE ERR] {os.path.basename(cs)}: {res.stderr}")

    # 3. Clean direct references files
    print("\n--- Cleaning Reference Files ---")
    all_refs = sorted(glob.glob("references/**/*.md", recursive=True))
    specs_cleaned = 0
    older_cleaned = 0
    
    for r in all_refs:
        if clean_spec_reference_doc(r):
            specs_cleaned += 1
            print(f"[SPEC CONVERTED TO TABLE] {os.path.basename(r)}")
        if clean_older_reference_doc(r):
            older_cleaned += 1
            print(f"[LOOSE SPONSOR STRIPPED] {os.path.basename(r)}")

    print(f"\nSweep Complete: {comp_updated} compilers updated, {specs_cleaned} specs converted, {older_cleaned} older docs cleaned.")
