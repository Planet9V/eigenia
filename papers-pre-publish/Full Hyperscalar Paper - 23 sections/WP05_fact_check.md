# Fact-Check Report: WP05
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:35:05.236925

# FACT-CHECK REPORT: WP05 Chapter Content vs. Research Brief

## CONFIRMED
1. **Table 5.2a ISASecure Device List**: Chapter table matches research brief Section 1 exactly in vendor, product, type, relevance, and certifying body.
2. **Gap Statement**: Chapter's claim that UPS NMCs, BMS controllers (Schneider EBO, Siemens Desigo CC, JCI Metasys), CDU PLCs, and EPMS meters (Schneider ION, GE/Danaher) are not ISASecure CSA certified as of June 2025 is confirmed by research brief Section 1 Gap Analysis.
3. **Tier System Attributes**: Chapter's description of Uptime Tiers being outcome-based (what) versus TIA-942 prescriptive (how) is consistent with research brief's context in Sections 1.1 and 1.2.
4. **EN 50600 Independent Classification**: Chapter's claim that EN 50600 allows independent classification per subsystem is confirmed by research brief Section 5, Availability Classes table and text.
5. **ASHRAE Liquid Cooling Classes**: Chapter's Table 5.3 values (W17-W45) and descriptions match research brief Section 4, Liquid Cooling Water Temperature Classes table.

## CONTRADICTIONS
1. **ASHRAE Class Naming**: Chapter Table 5.3 refers to "Group 1 designs (dry coolers, no chillers)" in text, but research brief Section 4 uses no such grouping terminology. The chapter introduces a non-standard classification.
2. **NFPA 75 EPO Requirement**: Chapter states NFPA 75 Ch. 8 EPO is "Not universally mandatory" per AHJ. Research brief Section 6 simply lists the requirement without this qualifier, stating "Ability to disconnect power to IT equipment & dedicated HVAC."

## GAPS
1. **IEC 62443 Clause Specificity**: Chapter references IEC 62443 zone/conduit design generally. Research brief Section 2 provides the detailed ZCR process (steps ZCR1-5) and Security Level definitions (SL1-4) which are not integrated.
2. **IEC 62443-4-2 FR/SR Mapping**: Research brief Section 3 provides granular component requirement tables (CR 1.1, 1.2, etc.) per Security Level. Chapter only mentions IEC 62443-4-2 compliance as a gap.
3. **NFPA 855 Specifics**: Research brief Section 7 details NFPA 855 2026 edition changes, including LSFT mandates. Chapter does not mention NFPA 855.
4. **IEC 61850 Details**: Research brief Section 8 contains extensive data on GOOSE latency (<4ms), services, and IEC 61850 x IEC 62443 security gaps. Chapter does not reference IEC 61850.
5. **OCP S.A.F.E. Framework**: Research brief Section 9 outlines this firmware security framework. Chapter does not mention it.
6. **EN 50600 x IEC 62443 Mapping**: Research brief Section 5 provides a direct mapping between EN 50600 Protection Classes and IEC 62443 SL-T. Chapter mentions equivalence but not the mapping.

## UNVERIFIABLE
1. **Practitioner's Note Anecdote**: Chapter's claim about a specific Tier IV facility with identical firmware/default credentials on a flat VLAN is presented as a personal anecdote. No source is provided in the research brief.
2. **ISASecure CSA Registry "2025"**: Chapter Table 5.2a header specifies "(2025)". Research brief Section 1 title is "ISASecure Certified Products Registry" with no explicit date, but the content matches. The date "2025" is not verifiable from the provided research source.

## CORRECTIONS
1. **Table Numbering**: Chapter Table 5.2a is referenced in text as "Table 5.2a" but is visually presented after the "ISASecure Certified Products Gap" text. The research brief does not define this table numbering scheme.
2. **Research Brief Data Scope**: Chapter Section 1.3 mentions "ASHRAE TC 9.9 also speci..." (text is cut off). This incomplete sentence cannot be fact-checked.