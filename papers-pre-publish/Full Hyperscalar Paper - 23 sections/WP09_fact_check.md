# Fact-Check Report: WP09
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:36:20.941894

# Fact-Check Report: WP09 Chapter 9 Node Analysis

## CONFIRMED Claims
1. **Table 9.4a CVE Details**: CVE-2022-22805, CVE-2022-22806, CVE-2022-0715, CVE-2025-46412, CVE-2025-41426, CVE-2025-22495, CVE-2025-59887, and CVE-2024-10511 exist with the affected products and vulnerability types listed.  
2. **TLStorm Vulnerability Context**: CVEs-2022-22805/22806/0715 affect APC Smart-UPS NMCs, are widely unpatched, and NMC2 is end-of-life. (Chapter line 77 matches research brief Section 3.1).  
3. **Vertiv CVEs**: CVE-2025-46412 and CVE-2025-41426 affect Vertiv UPS Management Cards. (Chapter line 73 matches research brief Section 6.3).  
4. **Eaton CVEs**: CVE-2025-22495 affects Eaton Network-M2 Card; CVE-2025-59887 affects Eaton UPS Companion. (Chapter lines 74-75 match research brief Section 3.5).  
5. **Schneider PowerChute CVE**: CVE-2024-10511 affects PowerChute Serial Shutdown. (Chapter line 76 matches research brief Section 3.1).  

## CONTRADICTIONS
1. **CVE-2024-10511 CVSS Score**: Chapter Table 9.4a (line 76) lists CVSS as **6.3**. Research brief Section 3.1 lists it as **5.3/6.3**. The chapter omits the lower bound score.  
2. **Standards Zone Assignment**: Chapter Standards Mapping (line 93) states Node N2 belongs to "Zone 2: Electrical" with "Recommended SL-T... SL 3 for UPS controls." The provided research brief does not contain IEC 62443-3-2 zone assignment tables or SL-T recommendations for specific zones. The claim is unverifiable from the supplied research.  

## GAPS (Research Data Not Integrated)
1. **Additional UPS Vulnerabilities**: Research brief Section 3.5 lists Eaton G4 PDU/NMC G2 vulnerabilities (CVE-2025-48394/48395) and Section 3.4 lists ASCO ATS vulnerabilities (CVE-2025-1058/1059/1060/1070). None are mentioned in Chapter 9 Node N2.  
2. **Protocol-Level Vulnerabilities**: Research brief Section 8 details BACnet/Modbus "insecure by design" properties (no authentication, encryption, integrity). This context is absent from Node N2's system description or hazard analysis.  
3. **ISASecure Certification Data**: Research brief Section 1 notes datacenter OT vendor (Schneider APC, Vertiv, Eaton) NMCs are not broadly ISASecure certified. This gap is not referenced in the chapter's safeguard or procurement recommendations.  

## UNVERIFIABLE Claims
1. **UPS Power Ratings**: Chapter System Description (line 31) specifies "multiple 1–1.25 MW modular UPS frames." The research brief does not provide power ratings for these specific UPS models.  
2. **Schneider Galaxy VX, Vertiv EXL S1, Eaton 93PM**: Chapter lists these as hyperscale-relevant distributed block UPS models. The research brief does not confirm these as typical hyperscale deployments.  
3. **CDU (Node N6) Cyber RPN 294**: Abstract (line 12) states CDU has max cyber RPN of 294. This claim is specific to the chapter's internal analysis and is not supported or contradicted by the supplied CVE or standards research.  
4. **SL-T Assignment for Node N2**: Claim of SL-2/SL-3 assignments in Tables 9.3 and 9.4. The research brief does not provide the risk rationale or standard clause mapping for these specific SL-T assignments.  

## CORRECTIONS Required
1. **Line 76 (Table 9.4a, CVE-2024-10511)**: CVSS score should be corrected from "6.3" to "5.3/6.3" to reflect the range published by the vendor and CISA (ICSA-25-322-04).  
2. **Line 93 (Standards Mapping)**: The statement "Recommended SL-T per zone: SL 3 for UPS controls and battery" cannot be verified from the provided research. This clause requires a specific reference to IEC 62443-3-2 tables or a vendor security guide. The claim should be flagged as requiring citation or removed.