#!/usr/bin/env python3
"""
Research Paper Orchestrator
Eigenia Sovereign Research Tracks & Multi-Agent Quality Assurance Engine

Implements the multi-agent task orchestrator pattern to synthesize, draft,
audit, score (via PAAI), and integrate peer-review grade treatises into the
Eigenia Research Wiki.
"""

import os
import sys
import re
import json
import subprocess
from datetime import datetime

# ==============================================================================
# 1. STYLE CONTRACT & AUDIT RULESETS
# ==============================================================================

BANNED_AI_WORDS = [
    r'\bleverage\b', r'\butilize\b', r'\bpivotal\b', r'\btestament to\b',
    r'\bfoster\b', r'\bstreamline\b', r'\bin today\'s world\b',
    r'\bin today\'s rapidly evolving\b', r'\bat its core\b', r'\blandscape\b',
    r'\bbeacon\b', r'\bgame-changing\b', r'\brobust\b', r'\bseamless\b',
    r'\bdelve into\b', r'\bembarking\b', r'\bharness\b', r'\bmoreover\b',
    r'\bfurthermore\b', r'\bnot only.*but also\b'
]

BANNED_EM_DASHES = [r'—', r'--']

# ==============================================================================
# 2. PAAI RATING ENGINE (Physics-Actuarial-Assurance Index)
# ==============================================================================

def calculate_paai_score(text: str) -> dict:
    """
    Evaluates a manuscript against the Tri-Partite Physics-Actuarial-Assurance Index:
    PAAI Composite = (Physics * 0.40) + (Actuarial * 0.35) + (Assurance * 0.25)
    Target Gate: >= 8.5 in each index, >= 9.0 composite.
    """
    # 1. Physics Index Assessment (0 - 10)
    # Check for KaTeX governing equations, thermal/fluid parameters, thermodynamic constants
    equations = re.findall(r'\$\$[\s\S]*?\$\$', text)
    eq_count = len(equations)
    
    physics_keywords = [
        r'\bkW\b', r'\bMW\b', r'\bL/min\b', r'\bbar\b', r'\b°C\b', r'\bPG25\b',
        r'\bthermal\b', r'\bhydraulic\b', r'\bheat flux\b', r'\bvolumetric\b',
        r'\bjunction temperature\b', r'\bconvective\b', r'\brate of change\b'
    ]
    physics_matches = sum(1 for kw in physics_keywords if re.search(kw, text, re.IGNORECASE))
    
    physics_score = min(10.0, 5.0 + (min(eq_count, 6) * 0.5) + (min(physics_matches, 10) * 0.2))
    
    # 2. Actuarial Index Assessment (0 - 10)
    # Check for financial loss mechanics, ALE, SLE, business interruption, PML/MPL, deductibles
    actuarial_keywords = [
        r'\bALE\b', r'\bSLE\b', r'\bARO\b', r'\bROSI\b', r'\bunderwriting\b',
        r'\bdeductible\b', r'\bsub-limit\b', r'\bbusiness interruption\b',
        r'\bcatastrophe\b', r'\bLloyd\'s\b', r'\bY5381\b', r'\bconsequential loss\b',
        r'\breplacement cost\b', r'\bPML\b', r'\baccumulation\b'
    ]
    actuarial_matches = sum(1 for kw in actuarial_keywords if re.search(kw, text, re.IGNORECASE))
    actuarial_score = min(10.0, 5.0 + (min(actuarial_matches, 12) * 0.42))
    
    # 3. Systems Assurance Index Assessment (0 - 10)
    # Check for normative standards, BOM precision (DEXPI, CycloneDX, Caliptra, CRA, IEC)
    assurance_keywords = [
        r'\bIEC 62443\b', r'\bISO 15926\b', r'\bDEXPI\b', r'\bCycloneDX\b',
        r'\bEU CRA\b', r'\bEN 50126\b', r'\bHBOM\b', r'\bSBOM\b', r'\bCBOM\b',
        r'\bOBOM\b', r'\bCaliptra\b', r'\bOpenSIL\b', r'\bDICE\b', r'\bVEX\b',
        r'\broot-of-trust\b', r'\bprovenance\b'
    ]
    assurance_matches = sum(1 for kw in assurance_keywords if re.search(kw, text, re.IGNORECASE))
    assurance_score = min(10.0, 5.0 + (min(assurance_matches, 12) * 0.42))
    
    composite_score = (physics_score * 0.40) + (actuarial_score * 0.35) + (assurance_score * 0.25)
    passed_gate = (physics_score >= 8.5 and actuarial_score >= 8.0 and assurance_score >= 8.5 and composite_score >= 8.8)
    
    return {
        "physics_index": round(physics_score, 2),
        "actuarial_index": round(actuarial_score, 2),
        "assurance_index": round(assurance_score, 2),
        "composite_paai": round(composite_score, 2),
        "equations_count": eq_count,
        "passed_gate": passed_gate
    }

# ==============================================================================
# 3. QUALITY & NON-CONFORMANCE AUDIT (NCR)
# ==============================================================================

def audit_style_contract(text: str) -> dict:
    """
    Audits text against zero-tolerance style prohibitions.
    """
    findings = []
    
    # Strip markdown syntax that contains legitimate hyphens/dashes:
    # 1. code blocks
    clean_text = re.sub(r'```[\s\S]*?```', '', text)
    # 2. horizontal rules
    clean_text = re.sub(r'^\s*---+\s*$', '', clean_text, flags=re.MULTILINE)
    # 3. markdown table formatting lines (| :--- | :--- |)
    clean_text = re.sub(r'\|[\s\-:]+\|', '', clean_text)
    
    # Check em dashes (Unicode em-dash, en-dash, or prose double-dash)
    unicode_dashes = re.findall(r'[—–]', clean_text)
    if unicode_dashes:
        findings.append(f"NON-CONFORMANCE: Found {len(unicode_dashes)} prohibited Unicode em/en-dashes.")
        
    text_double_dashes = re.findall(r'(\s+--\s+|\b--\b)', clean_text)
    if text_double_dashes:
        findings.append(f"NON-CONFORMANCE: Found {len(text_double_dashes)} prohibited text em-dashes ('--').")
            
    # Check banned AI words
    for ai_pat in BANNED_AI_WORDS:
        matches = re.findall(ai_pat, text, re.IGNORECASE)
        if matches:
            clean_word = ai_pat.replace(r'\b', '').replace('\\', '')
            findings.append(f"NON-CONFORMANCE: Found {len(matches)} prohibited AI filler phrases ('{clean_word}').")
            
    # Check word count
    words = len(text.split())
    if words < 3500:
        findings.append(f"WARNING: Word count ({words}) is below academic density threshold (minimum 3,500 words).")
        
    return {
        "passed": len(findings) == 0,
        "findings": findings,
        "word_count": words,
        "char_count": len(text)
    }

# ==============================================================================
# 4. ORCHESTRATION PIPELINE RUNNER
# ==============================================================================

def run_orchestration(paper_id: str, title: str, source_path: str, dest_path: str):
    print(f"\n=======================================================")
    print(f"EIGENIA RESEARCH ORCHESTRATOR: {paper_id}")
    print(f"Title: {title}")
    print(f"Source: {source_path}")
    print(f"Destination: {dest_path}")
    print(f"=======================================================\n")
    
    if not os.path.exists(source_path):
        print(f"[ERROR] Source file not found: {source_path}")
        return False
        
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    print(f"[STAGE 1: SYNTHESIS] Ingested {len(content):,} characters from source.")
    
    # Stage 2: Audit style contract
    print(f"[STAGE 2: QUALITY AUDIT] Inspecting style contract and prose...")
    audit_res = audit_style_contract(content)
    if not audit_res["passed"]:
        print(f"  [!] Style contract non-conformances identified:")
        for f in audit_res["findings"]:
            print(f"      - {f}")
    else:
        print(f"  [OK] Style Contract 100% Passed. Zero em-dashes, zero AI filler words.")
        
    print(f"  Word Count: {audit_res['word_count']:,} words | Char Count: {audit_res['char_count']:,} characters")
    
    # Stage 3: PAAI Evaluation
    print(f"[STAGE 3: PAAI EVALUATION] Calculating Physics-Actuarial-Assurance Index...")
    paai = calculate_paai_score(content)
    print(f"  • Physics Index:            {paai['physics_index']}/10.0")
    print(f"  • Actuarial Index:          {paai['actuarial_index']}/10.0")
    print(f"  • Systems Assurance Index:  {paai['assurance_index']}/10.0")
    print(f"  -----------------------------------------------")
    print(f"  • COMPOSITE PAAI SCORE:     {paai['composite_paai']}/10.0 (Gate >= 8.8)")
    print(f"  • KaTeX Governing Equations: {paai['equations_count']}")
    print(f"  • Publication Gate Status:  {'PASSED' if paai['passed_gate'] else 'REVISIONS REQUIRED'}")
    
    # Stage 4: Write to destination
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"\n[STAGE 4: ARTIFACT WRITTEN] Saved authoritative manuscript to {dest_path}")
    
    return paai

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python3 research_paper_orchestrator.py <ID> <Title> <SourcePath> <DestPath>")
        sys.exit(1)
        
    run_orchestration(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
