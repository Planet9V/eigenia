# Fact-Check Report: WP07
Model: xiaomi/mimo-v2.5
Date: 2026-06-14T21:15:27.820716

## Fact-Check Report for WP07 Chapter Content

### CONFIRMED
1.  **Vendor Identification:** Major vendors listed in chapter tables (Schneider, Vertiv, Eaton, ABB, Siemens, Johnson Controls, etc.) are corroborated as having products with known OT vulnerabilities in the CVE research.
2.  **Protocol Vulnerability Claims:** Chapter assertion that "BACnet/Modbus protocols remain insecure by design" is confirmed by Protocol-Level Vulnerabilities section in research.
3.  **Generic OT Zone Assignment:** High-level zone assignments (e.g., Z3 for field devices, Z2 for supervisory systems) align with the Purdue model referenced in research.
4.  **Criticality of Rack PDUs:** Chapter's critical observation about intelligent rack PDUs as actuators is a valid operational security concern.

### CONTRADICTIONS
1.  **Table 7.4: UPS Network Management Card Certification:**
    *   **Chapter Claim:** Schneider NMC3, Vertiv IntelliSlot/RDU120, Eaton NETWORK-M3 have "SL-2" certification.
    *   **Research Contradiction:** CVE research lists multiple critical vulnerabilities (CVE-2024-22805/06 for Schneider APC NMC, CVE-2025-46412/41426 for Vertiv cards, CVE-2025-22495 for Eaton Network-M2). No mention of SL-2 certification for these specific NMC models in the provided research. The certification data is unverified.
2.  **Table 7.5: Fuel Cell Classification:**
    *   **Chapter Claim:** Fuel cells (Bloom, Plug Power) are listed under "Renewables and Microgrids" with a zone of "Z2/Z3".
    *   **Research Contradiction:** The CVE research brief does not contain any vulnerability entries for Bloom Energy or Plug Power fuel cells, suggesting they may not be a primary OT attack vector, contradicting the implication of significant OT risk. Zone assignment is plausible but uncorroborated by vulnerability data.
3.  **Table 7.6: Centrifugal Chiller Certification:**
    *   **Chapter Claim:** York/JCI YZ/YK chillers have "SL-1" certification.
    *   **Research Contradiction:** The CVE research identifies York chillers as being integrated via Metasys, which has a critical CVE-2025-26385 (CVSS 10.0). The chapter's claim of SL-1 certification for the chiller controller itself is not supported or refuted by the research, which focuses on the BMS integration layer.

### GAPS
1.  **Critical Vulnerability Omission:** The chapter's inventory tables do not list the critical CVEs identified in the research. For example:
    *   **Metasys ADS/ADX CVE-2025-26385 (CVSS 10.0)** is a glaring omission from the BMS components in Section 2 or a dedicated BMS section.
    *   **Schneider EcoStruxure IT DCE CVEs-2025-50121 to -50125 (Critical)** are not mentioned in relation to DCIM (Z1) assets.
    *   **Vertiv UPS Management Card CVE-2025-46412 (Critical)** is absent from the UPS section.
2.  **Threat Actor Context:** The chapter does not reference the **Dark Angels ransomware attack on Johnson Controls** (2023), a critical real-world event demonstrating the risk to BMS vendors and their customers, which is detailed in Section 9 of the research.
3.  **Certification Gap Acknowledgment:** The research notes a significant gap: "UPS Network Management Cards (NMCs), dedicated datacenter BMS controllers, and EPMS meters are **not yet commonly found** in the ISASecure CSA registry." This important context is missing from the chapter's certification columns.
4.  **Specific Protocol Advisory:** The research highlights specific vulnerabilities like **Honeywell Niagara 13 CVEs** and **Siemens Desigo CC CVE-2025-47809**. The chapter's BMS vendor lists (Johnson Controls, Siemens) lack this granular, actionable data.

### UNVERIFIABLE
1.  **Table 7.3/7.4/7.6/7.7 "Certification" Column Values:** Multiple rows claim "None" or specific SL levels (e.g., "SL-1 (JCI York only)", "SL-2 (Schneider PME)") for components. The provided research does not contain an ISASecure or IEC 62443-4-2 certification registry lookup to confirm these claims. The "SL-2" claim for Schneider PME is directly contradicted by known high-severity vulnerabilities in PME 2022-2024 R2 (CVE-2025-54923 et al.).
2.  **Representative Vendor Claims for Specific Products:** While vendor names are generally correct, the exact model strings (e.g., "Schneider Galaxy VX (1.25 MW)", "Vertiv EXL S1") are not cross-referenced with vulnerability advisories to confirm these are the *specific* affected products, making the "representative" claim difficult to fully verify from the given data.

### CORRECTIONS
1.  **Table 7.3, Row 1: "None (62443-4-2)"**: The parenthetical "(62443-4-2)" is misleading. It suggests the component *should* be certified under 62443-4-2, but the "None" confirms it is not. The notation is confusing and should be clarified or removed.
2.  **Danfoss VFD Certification Claim:** The chapter's text under "Practitioner's Note" or in tables (not present in excerpt but implied by research) may overstate certification. The research clarifies that **only Danfoss VLT® VFD product line (FC 102, 202, 301, 302)** has achieved **IEC 62443-4-2 SL1 certification**. A blanket claim for "Danfoss VFD" would be inaccurate.
3.  **Johnson Controls Impact in Ransomware Attack:** The chapter, if it included the Dark Angels context, must accurately state that the attack impacted "Corporate IT infrastructure" and that "OpenBlue/Metasys digital products [were] reportedly not impacted" (per research Section 9.1). Any claim that Metasys systems were directly compromised would be incorrect based on current research.

**Recommendation:** The chapter requires significant integration of the specific vulnerability data from the research brief. The inventory tables should be augmented with a column for "Notable CVEs" to transform this from a static catalog into a living risk assessment tool. The certification claims must be validated against an authoritative source like the ISASecure registry.