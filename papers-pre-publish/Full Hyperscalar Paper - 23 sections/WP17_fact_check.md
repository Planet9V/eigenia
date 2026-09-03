# Fact-Check Report: WP17
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:35:56.400650

**FACT-CHECK REPORT: WP17 Chapter Content vs. Research Brief**

### **CONFIRMED**
1.  **ISASecure Certification Gap:** Chapter claim that no datacenter-specific OT device (UPS NMC, BMS controller, CDU PLC, EPMS meter) holds ISASecure CSA (IEC 62443-4-2) certification is directly supported by the "Gap Analysis: Datacenter OT Products Not Yet Certified" table in the Research Brief (Section 1).
2.  **Vendor SDLA Certification:** Chapter reference to ISASecure SDLA certification for vendors (ABB, Schneider, Honeywell, JCI) is confirmed by the "SDLA (Secure Development Lifecycle — IEC 62443-4-1) Certified Vendors" table in the Research Brief (Section 1).
3.  **SCIL Component Vendors:** Vendor lists for SCIL-001 (Vertiv, Schneider, Eaton), SCIL-002 (ASCO, Cummins, Schneider), SCIL-003 (CoolIT, Vertiv, Motivair), SCIL-007 (Tesla, Fluence, Sungrow) are plausible for the described components and align with industry knowledge.
4.  **SCIL Safety Function Rationale:** The failure consequences listed for each SCIL item (e.g., fire for battery management, arc flash for ATS, pressurized release for CDU valve) are consistent with the engineering hazards described and the standards referenced (NFPA 855, NFPA 75, etc.).
5.  **RCIL Requirements:** Requirements for RCIL items (SL-T, procurement specs, firmware verification, OT IDS) are consistent with the guidance and standards (IEC 62443-3-2, Chapter 11, Chapter 14) referenced throughout the document.

### **CONTRADICTIONS**
1.  **SCIL-004 & SCIL-005 Standards Mapping:** The chapter incorrectly lists "ASHRAE TC 9.9 W17–W+" as the reference standard for Fire Alarm Panel and Fire Suppression Controller. The Research Brief clearly states the relevant standards are **NFPA 75** and **NFPA 76** (Sections 6.1 & 6.2). ASHRAE TC 9.9 governs thermal guidelines, not fire safety systems.
2.  **SCIL-002 ASHRAE Reference:** Similarly, SCIL-002 (ATS controller) references "EN 50600-2-2 Class 3–4," which is correct for availability classification. However, the safety function (preventing arc flash) is primarily governed by **NFPA 70 (NEC)** and **NFPA 70E**, not explicitly covered by the datacenter standard EN 50600-2-2. The Research Brief does not provide a direct NFPA reference for ATS arc flash safety, creating a standards mapping conflict.
3.  **SCIL "Table B" Reference:** The chapter states SCIL items are "Table B items." The Research Brief contains no reference to a "Table B." This appears to be an internal document reference or an error; it is not substantiated by the provided standards research.

### **GAPS**
1.  **SIL Ratings Verification:** The chapter assigns specific SIL levels (SIL-1, SIL-2, SIL-3) to SCIL items. The Research Brief provides no data to verify these assignments. SIL ratings are determined by a process hazard analysis per IEC 61511, which is not covered in the provided research.
2.  **Two-Person Rule:** The chapter requires "Dual verification for any configuration change (two-person rule)" for SCIL items. This is a common industrial safety practice but is not explicitly mandated or discussed in the provided standards research (IEC 62443, NFPA, ASHRAE).
3.  **Vendor Specifics for SCIL-004/005:** The chapter lists specific vendors for Fire Alarm Panel and Fire Suppression Controller (Honeywell, Siemens, Edwards, Viking). The Research Brief only mentions Honeywell and Siemens in the context of SDLA certification for "Fire/Life Safety" (Section 1), not as product vendors. The inclusion of Edwards and Viking is not supported by the research.
4.  **RPN (Cyber) Scores:** The chapter provides Risk Priority Number (RPN) scores for SCIL items (e.g., 140, 144). The Research Brief contains no data to verify these specific scores or the methodology used to calculate them.

### **UNVERIFIABLE**
1.  **"Table B" Designation:** The claim that SCIL items are "Table B items" cannot be verified or contradicted from the Research Brief.
2.  **Specific Hardware Descriptions:** The chapter includes precise hardware details (e.g., "Hardware overvoltage relay; opens battery contactor at Vcell > 4.25V" for SCIL-001, "Hardware thermal fuse per cell string at 80°C" for SCIL-007). While these are plausible engineering controls, the Research Brief does not contain component-level specifications to verify them.
3.  **MoR Reference Codes:** The chapter assigns specific Minimum Operating Requirement (MoR) reference codes (e.g., MoR-P03, MoR-S04) to SCIL items. The Research Brief does not define or list these MoR codes.
4.  **Rationale for SIL Assignments:** The chapter provides no justification for why a specific component requires a SIL-1, SIL-2, or SIL-3 rated safety function. The Research Brief does not supply this analysis.

### **CORRECTIONS**
1.  **SCIL-004 Standards:** Line item for Fire Alarm Panel (SCIL-004) in Table 17.2 must change the "ASHRAE/NFPA Ref" column from "ASHRAE TC 9.9 W17–W+" to **"NFPA 75 Ch.7; NFPA 76 Ch.7"**.
2.  **SCIL-005 Standards:** Line item for Fire Suppression Controller (SCIL-005) in Table 17.2 must change the "ASHRAE/NFPA Ref" column from "ASHRAE TC 9.9 W17–W+" to **"NFPA 75 Ch.7; NFPA 76 Ch.7"**.
3.  **SCIL-002 Primary Standard:** The primary safety standard for an ATS controller (SCIL-002) preventing arc flash is **NFPA 70E** (Standard for Electrical Safety in the Workplace), not the availability classification from EN 50600-2-2. The "ASHRAE/NFPA Ref" column should be updated or supplemented.