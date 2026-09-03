# Fact-Check Report: WP03
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:34:12.031570

# Fact-Check Report: WP03 Chapter vs. Research Data

## CONFIRMED

1. **CDU Pump VFD CVEs (Chapter Table 3.3a):**
   *   CVE-2024-48510 (ABB Drive Composer, CVSS 9.8) is confirmed in Research Section 4.1.
   *   CVE-2024-56336 (Siemens SINAMICS S200, CVSS 9.8) is confirmed in Research Section 4.2.

2. **BMS Controller CVEs (Chapter Table 3.3a):**
   *   CVE-2025-3936 (Honeywell Niagara, CVSS 9.8) is confirmed in Research Section 2.1.
   *   CVE-2026-1226 (Schneider EBO, CVSS "High") is confirmed in Research Section 2.4.

3. **Chiller Controller CVE (Chapter Table 3.3a):**
   *   CVE-2025-26385 (Metasys ADS/ADX, CVSS 10.0) is confirmed in Research Section 2.2 and Section 4.4.

4. **Cooling Tower VFD Certification (Chapter Table 3.3a):**
   *   The claim "Danfoss VLT FC series... IEC 62443-4-2 SL1 certified; no critical CVEs on core firmware" is confirmed by Research Section 4.3.

5. **Protocol Weaknesses (Chapter Section 1.2):**
   *   The claim that BACnet/IP and Modbus TCP lack native authentication, encryption, and integrity checking is confirmed by Research Section 8.

6. **Johnson Controls Attack (Chapter Not Present, but Research Section 9 is relevant):**
   *   The research provides detailed context on the 2023 Dark Angels ransomware attack against Johnson Controls, which is not covered in the current chapter text.

## CONTRADICTIONS

1.  **CDU Pump VFD Vendor (Chapter Table 3.3a vs. Research):**
    *   **Chapter (Line ~Table 3.3a):** Lists only ABB and Siemens VFDs for the CDU Pump Assembly.
    *   **Research (Section 4.1):** Identifies ABB ACS880 drives as affected by CODESYS runtime vulnerabilities (CVEs not assigned, tracked as AV25-169). This represents an additional affected product line not acknowledged in the chapter's simplified table.

2.  **Chiller Controller Attribution (Chapter Table 3.3a vs. Research):**
    *   **Chapter (Table 3.3a):** Attributes CVE-2025-26385 to "Chiller Controller (JCI York via Metasys)".
    *   **Research (Section 4.4):** Explicitly states "No York-chiller-specific CVEs identified" and that York chillers are affected via integration with the BMS (Metasys). The CVE targets the Metasys ADS/ADX platform, not a York-specific controller. The chapter's phrasing incorrectly implies a York controller CVE.

3.  **PDU Outlet Controller RPN Gap (Chapter Table 3.4 vs. Calculation):**
    *   **Chapter (Table 3.4):** Shows the PDU Outlet Controller RPN (Mech) as **28** and RPN (Cyber) as **280**, yielding a Gap of **10×**.
    *   **Calculation:** S=7, O(Mech)=2, D(Mech)=2 → RPN(Mech) = 7*2*2 = 28. Correct. S=7, O(Cyber)=7, D(Cyber)=6 → RPN(Cyber) = 7*7*6 = 294. The stated RPN(Cyber) of 280 is arithmetically incorrect. The correct Gap is 294/28 = 10.5×.

4.  **Missing ASHOA/EN 50600 Claims (Chapter Abstract/Standards Research):**
    *   **Chapter Abstract (Line ~Abstract):** States the analysis is grounded in IEC 62443 standards mapping. It does not mention ASHRAE or EN 50600.
    *   **Standards Research:** Sections 4 and 5 cover ASHRAE TC 9.9 and EN 50600, respectively, providing detailed clause-level mappings relevant to datacenter infrastructure. This research is not integrated into the chapter.

## GAPS

1.  **Critical CVEs Omitted from Chapter:**
    *   **Schneider EcoStruxure IT Data Center Expert:** Research Section 6.1 lists 5 critical CVEs (CVE-2025-50121 to 50125) and 1 high CVE for a core DCIM platform. This is not covered in the chapter.
    *   **Vertiv UPS Management Cards:** Research Section 6.3 lists 2 critical CVEs (CVE-2025-46412, CVE-2025-41426). Not covered.
    *   **Moxa Industrial Switches:** Research Section 7.1 lists CVE-2024-9138 (hard-coded credentials) and CVE-2024-9140 (command injection) as critical/high. Not covered.
    *   **HID Mercury Access Control:** Research Section 5.3 references a set of 8 critical/high CVEs from 2022 (e.g., CVE-2022-31481, CVE-2022-31479). Not covered.

2.  **Additional ABB and Siemens VFD Vulnerabilities:** Research Sections 4.1 and 4.2 list multiple CVEs (e.g., CVE-2025-2595, CVE-2025-41659 for ABB; CVE-2024-54678, CVE-2024-52051 for Siemens) beyond those cited in Chapter Table 3.3a.

3.  **ISASecure Certification Gap Data:** The Standards Research (Section 1) explicitly states that datacenter-specific OT components (UPS NMCs, dedicated BMS controllers, EPMS meters) are "not yet commonly found" in the ISASecure CSA registry. This contextualizes the chapter's claim of "zero IEC 62443 certification" but is not referenced.

4.  **Standards Mapping Detail:** The Standards Research provides detailed clause mappings for IEC 62443-3-2 (Section 2) and IEC 62443-4-2 (Section 3) to datacenter subsystems. The chapter only references IEC 62443 in general terms.

## UNVERIFIABLE

1.  **"Zero IEC 62443 certification" for Specific Components (Chapter Abstract):**
    *   **Claim:** The four highest-priority components (CDU pump, CDU isolation valve, BMS controller, ATS) have "zero IEC 62443 certification."
    *   **Evidence Status:** The Standards Research (Section 1) confirms a general gap for datacenter OT products in ISASecure registries. It does not provide definitive, product-level certification status for the exact components named (e.g., a specific CDU pump model, a specific motorized isolation valve model, a generic ATS). The claim cannot be fully verified with the provided research without product-specific certification lookups.

## CORRECTIONS

1.  **PDU Outlet Controller RPN (Chapter Table 3.4):**
    *   **Error:** The RPN(Cyber) is listed as **280**.
    *   **Correction:** Based on the provided ratings (S=7, O(Cyber)=7, D(Cyber)=6), the correct RPN(Cyber) is 7 * 7 * 6 = **294**.
    *   **Resulting Error:** The "Gap" column shows 10×. The corrected Gap is 294 / 28 = **10.5×**.

2.  **Chiller Controller CVE Attribution (Chapter Table 3.3a):**
    *   **Error:** The "Component" column states "Chiller Controller (JCI York via Metasys)".
    *   **Correction:** This implies a CVE exists for a York chiller controller. The research (Section 4.4) clarifies that CVE-2025-26385 affects the **Metasys ADS/ADX** platform, which *integrates* York chillers. The component in the FMECA matrix should be the BMS controller (Metasys ADS/ADX) that issues commands to the chiller, or the cyber vector should be described as "via compromised BMS."