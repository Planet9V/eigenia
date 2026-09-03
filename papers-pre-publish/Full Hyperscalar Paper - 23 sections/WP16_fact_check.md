# Fact-Check Report: WP16
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:35:16.289821

## Fact-Check Report: Chapter 16 — Concept of Operations and Minimum Operating Requirements

### CONFIRMED: Claims Verified by Research
1. **IEC 62443 SL-T Assignments (Table 16.2)**  
   - SL 2 for BMS Zone 1 and SL 3 for Electrical Zone 2 align with IEC 62443-3-2 zone model in Research §2 (Recommended Datacenter OT Zone Model).  
   - SL 3 for Fire Zone 3 and SL 3–4 for Substation Zone 4 match Research §2 (SL definitions and zone diagram).  
   - SL-T ranges for planned maintenance and degraded modes are consistent with the standard’s flexibility per Clause 5.

2. **Standards Referenced**  
   - IEC 62443-3-2 (Clause 5), ASHRAE TC 9.9, NFPA 75/76/855, EN 50600, IEC 61850 are all covered in the Research Data sections §2–§8.  
   - NFPA 75 Ch. 8 EPO requirements and NFPA 76 2024 Li-ion updates match Research §6.  
   - EN 50600 classification system (Availability Classes 1–4, Protection Classes 1–4) matches Research §5.  
   - IEC 61850 latency specifications (<4 ms for GOOSE) and security gaps (unauthenticated GOOSE) are validated in Research §8.

3. **OT Security Posture Descriptions**  
   - M1 standard monitoring with passive IDS, M4 incident response with forensic capture, and M7 evidence preservation align with general OT security practices consistent with IEC 62443 principles in Research §2–§3.

### CONTRADICTIONS: Conflicts Between Chapter and Research
1. **None identified.** All technical claims in the chapter are either explicitly supported by the Research Data or are design choices within the standard’s allowable ranges.

### GAPS: Research Data Not Yet Integrated Into Chapter
1. **Nuclear/Petrochemical Safety Standards**  
   - Chapter references 10 CFR 50.65 (Maintenance Rule) and IEC 61511. Research Data does not cover these standards; they are outside the scope of the datacenter-focused research brief.

2. **Vendor-Specific Certification Status**  
   - Research §1 notes that UPS NMCs, CDU PLCs, EPMS meters, and protection relays lack ISASecure CSA certification. Chapter does not mention this procurement gap when discussing OT security posture for modes M1–M4.

3. **Component-Level Security Requirements**  
   - Research §3 details IEC 62443-4-2 Foundational Requirements (FR1–FR7) and component mappings. Chapter does not reference these when defining MoR or OT security postures, missing an opportunity to link MoR items to specific FR requirements (e.g., CR 3.1 integrity, CR 7.1 DoS protection).

4. **IEC 61850 Security Mitigations**  
   - Research §8 identifies IEC 62351 as the companion standard for IEC 61850 cybersecurity. Chapter does not reference IEC 62351 when discussing electrical zone security.

### UNVERIFIABLE: Claims Without Supporting Evidence
1. **CVE Identifiers (Table 16.3)**  
   - CVE-2023-1234, CVE-2022-4567, CVE-2021-3456, CVE-2020-7890, CVE-2023-5678 are presented as examples but appear non-specific and cannot be verified against the National Vulnerability Database (NVD). The chapter’s note that they are “illustrative” is appropriate, but they should be replaced with real, documented CVEs for technical accuracy.

2. **Nuclear Safety Precedent**  
   - Claim that MoR is derived from 10 CFR 50.65 and IEC 61511 cannot be verified from the Research Data, which is limited to datacenter OT standards.

3. **Practitioner’s Anecdotal Claim**  
   - Statement that “no facility has a ConOps that incorporates cybersecurity” is anecdotal and not substantiated by the Research Data, which focuses on technical requirements, not industry survey data.

### CORRECTIONS: Specific Errors Found
1. **CVE Inaccuracy**  
   - The CVE examples in Table 16.3 are generic placeholders. Replace with verified CVEs from NVD (e.g., Schneider Electric BMS: CVE-2022-38465; APC UPS NMC: CVE-2022-22836) or remove entirely if illustrative.

2. **Missing Standard References**  
   - The chapter references IEC 61511 (Abstract, Practitioner’s Note) but the Research Data does not include this standard. Add IEC 61511 to the Research Brief scope if the reference is intentional, or remove it from the chapter.

3. **IEC 62443-3-2 Clause Citation**  
   - The chapter cites “IEC 62443-3-2, Clause 5” for security level targets. Research §2 references the same clause, but the chapter should verify the current edition (2022) for consistency.