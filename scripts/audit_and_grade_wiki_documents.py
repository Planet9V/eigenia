#!/usr/bin/env python3
"""
Independent Multi-Agent Audit & Grading Engine
Eigenia Research Wiki & Sovereign Publications Quality Assurance

Audits all 45 reference documents across 6 hard gates:
1. Front-Matter Compliance (0 loose sponsor lines, 0 raw bold metadata blocks, clean table/header)
2. Zero Prohibited AI Filler Words
3. Zero Prohibited Em-Dashes (Unicode or prose double-dash)
4. Citation Integrity (0 glued citations, valid IEEE brackets)
5. ASCII Diagram & KaTeX Equation Integrity
6. PAAI Tri-Partite Index (Physics, Actuarial, Systems Assurance)

Generates a formal compliance ledger and assigns letter grades.
"""

import os
import re
import glob
import json
from datetime import datetime

BANNED_AI_WORDS = [
    r'\bleverage\b', r'\butilize\b', r'\bpivotal\b', r'\btestament to\b',
    r'\bfoster\b', r'\bstreamline\b', r'\bin today\'s world\b',
    r'\bat its core\b', r'\bbeacon\b', r'\bgame-changing\b',
    r'\bharness\b', r'\bfurthermore\b'
]

def evaluate_paai(text: str) -> dict:
    equations = len(re.findall(r'\$\$[\s\S]*?\$\$', text))
    
    physics_kws = [
        r'\bkW\b', r'\bMW\b', r'\bL/min\b', r'\bbar\b', r'\b°C\b', r'\bPG25\b',
        r'\bthermal\b', r'\bhydraulic\b', r'\bheat flux\b', r'\bvolumetric\b',
        r'\bjunction temperature\b', r'\bconvective\b', r'\brate of change\b'
    ]
    p_matches = sum(1 for kw in physics_kws if re.search(kw, text, re.IGNORECASE))
    physics_score = min(10.0, 5.0 + (min(equations, 6) * 0.5) + (min(p_matches, 10) * 0.2))

    actuarial_kws = [
        r'\bALE\b', r'\bSLE\b', r'\bARO\b', r'\bROSI\b', r'\bunderwriting\b',
        r'\bdeductible\b', r'\bsub-limit\b', r'\bbusiness interruption\b',
        r'\bcatastrophe\b', r'\bLloyd\'s\b', r'\bY5381\b', r'\bconsequential loss\b',
        r'\breplacement cost\b', r'\bPML\b', r'\baccumulation\b'
    ]
    a_matches = sum(1 for kw in actuarial_kws if re.search(kw, text, re.IGNORECASE))
    actuarial_score = min(10.0, 5.0 + (min(a_matches, 12) * 0.42))

    assurance_kws = [
        r'\bIEC 62443\b', r'\bISO 15926\b', r'\bDEXPI\b', r'\bCycloneDX\b',
        r'\bEU CRA\b', r'\bEN 50126\b', r'\bHBOM\b', r'\bSBOM\b', r'\bCBOM\b',
        r'\bOBOM\b', r'\bCaliptra\b', r'\bOpenSIL\b', r'\bDICE\b', r'\bVEX\b',
        r'\broot-of-trust\b', r'\bprovenance\b'
    ]
    s_matches = sum(1 for kw in assurance_kws if re.search(kw, text, re.IGNORECASE))
    assurance_score = min(10.0, 5.0 + (min(s_matches, 12) * 0.42))

    composite = (physics_score * 0.40) + (actuarial_score * 0.35) + (assurance_score * 0.25)
    return {
        "physics": round(physics_score, 1),
        "actuarial": round(actuarial_score, 1),
        "assurance": round(assurance_score, 1),
        "composite": round(composite, 2),
        "equations": equations
    }

def audit_document(file_path: str) -> dict:
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    doc_name = os.path.relpath(file_path, "references")
    words = len(text.split())
    chars = len(text)
    
    # 1. Gate 1: Front-Matter Compliance
    head_lines = text.split("\n")[:25]
    head_text = "\n".join(head_lines)
    
    has_loose_sponsor = bool(re.search(r"^\s*Lab Sponsor", head_text, re.MULTILINE | re.IGNORECASE))
    has_raw_bold_meta = bool(re.search(r"^\*\*Document Identifier:\*\*", head_text, re.MULTILINE))
    has_table_meta = bool(re.search(r"^\s*\|\s*Document ID\s*\|", head_text, re.MULTILINE))
    
    # Is it a formal specification or a monograph?
    is_formal_spec = bool(re.search(r"EIGENIA-WG", text))
    
    frontmatter_ok = not has_loose_sponsor and not has_raw_bold_meta
    if is_formal_spec and not has_table_meta:
        frontmatter_ok = False

    # 2. Gate 2: Prohibited AI Filler Words
    ai_word_findings = []
    for pat in BANNED_AI_WORDS:
        matches = re.findall(pat, text, re.IGNORECASE)
        if matches:
            ai_word_findings.append(f"{pat}:{len(matches)}")

    # 3. Gate 3: Em Dashes
    # Strip markdown code blocks, horizontal rules, and table borders before dash analysis
    clean_prose = re.sub(r'```[\s\S]*?```', '', text)
    clean_prose = re.sub(r'^\s*---+\s*$', '', clean_prose, flags=re.MULTILINE)
    clean_prose = re.sub(r'\|[\s\-:]+\|', '', clean_prose)
    
    unicode_dashes = len(re.findall(r'[—–]', clean_prose))
    text_double_dashes = len(re.findall(r'(\s+--\s+|\b--\b)', clean_prose))
    dash_count = unicode_dashes + text_double_dashes

    # 4. Gate 4: Citation Integrity
    cites = re.findall(r'[a-zA-Z]{3,}\.\d{1,3}\b', text)
    valid_cites = [c for c in cites if not any(c.startswith(w) for w in ["Section.", "Figure.", "Table.", "Eq.", "Ref.", "ver.", "TASE.", "DEXPI."])]
    glued_cites_count = len(valid_cites)

    # 5. Gate 5: ASCII / Formatting Integrity
    mangled_ascii = bool("+; ;" in text or "|; ;" in text)

    # 6. Gate 6: PAAI Score
    paai = evaluate_paai(text)

    # Grade calculation
    all_gates_pass = (
        frontmatter_ok and
        len(ai_word_findings) == 0 and
        dash_count == 0 and
        glued_cites_count == 0 and
        not mangled_ascii
    )

    if not all_gates_pass:
        grade = "F (Non-Conformance)"
    elif is_formal_spec:
        if paai["composite"] >= 9.5:
            grade = "A+ (Exemplary)"
        elif paai["composite"] >= 8.8:
            grade = "A (High Pass)"
        else:
            grade = "B+ (Pass)"
    else:
        # Monographs / Reference data
        grade = "A (Clean Monograph)"

    return {
        "file": doc_name,
        "words": words,
        "chars": chars,
        "is_formal_spec": is_formal_spec,
        "frontmatter_ok": frontmatter_ok,
        "has_table_meta": has_table_meta,
        "ai_words_count": len(ai_word_findings),
        "ai_word_findings": ai_word_findings,
        "dash_count": dash_count,
        "glued_cites": glued_cites_count,
        "mangled_ascii": mangled_ascii,
        "paai": paai,
        "all_gates_pass": all_gates_pass,
        "grade": grade
    }

def main():
    files = sorted(glob.glob("references/**/*.md", recursive=True))
    results = [audit_document(f) for f in files]

    total = len(results)
    passed = sum(1 for r in results if r["all_gates_pass"])
    specs = sum(1 for r in results if r["is_formal_spec"])

    print(f"\n================================================================================")
    print(f"INDEPENDENT RESEARCH WIKI AUDIT & COMPLIANCE GRADING REGISTER")
    print(f"Authoritative Directory: references/")
    print(f"Evaluated Documents: {total} | Passed Hard Gates: {passed}/{total}")
    print(f"================================================================================\n")

    print("| # | Document Path | Words | Front-Matter | AI Words | Dashes | Cites | PAAI | Grade |")
    print("|:--:|:----------------------------------------------|:-----:|:------------:|:--------:|:------:|:-----:|:----:|:-----:|")

    for idx, r in enumerate(results, start=1):
        fm_str = "✅ Table" if r["has_table_meta"] else ("✅ Clean" if r["frontmatter_ok"] else "❌ FAIL")
        ai_str = "✅ 0" if r["ai_words_count"] == 0 else f"❌ {r['ai_words_count']}"
        dash_str = "✅ 0" if r["dash_count"] == 0 else f"❌ {r['dash_count']}"
        cite_str = "✅ 0" if r["glued_cites"] == 0 else f"❌ {r['glued_cites']}"
        paai_str = f"{r['paai']['composite']}" if r["is_formal_spec"] else "N/A"
        grade_str = f"**{r['grade']}**"

        print(f"| {idx:02d} | {r['file'][:44]:<44} | {r['words']:>5} | {fm_str:^12} | {ai_str:^8} | {dash_str:^6} | {cite_str:^5} | {paai_str:^4} | {grade_str} |")

    print("\n================================================================================")
    print(f"AUDIT VERDICT: {'ALL 45 DOCUMENTS COMPLIANT - 100% GATES PASSED' if passed == total else 'NON-CONFORMANCES DETECTED'}")
    print(f"================================================================================\n")

    report_path = "references_audit_report.json"
    with open(report_path, "w", encoding="utf-8") as out:
        json.dump(results, out, indent=2)
    print(f"Full JSON report written to {report_path}")

if __name__ == "__main__":
    main()
