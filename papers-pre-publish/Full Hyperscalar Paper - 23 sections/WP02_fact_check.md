# Fact-Check Report: WP02
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:33:34.051660

## FACT-CHECK REPORT

### CONFIRMED
1.  **HAZOP Standard Reference:** The chapter correctly states that HAZOP is codified in IEC 61882. (Standards Research, Sec 1.1)
2.  **Johnson Controls Dark Angels Attack (Date):** The chapter references a "Johnson Controls Metasys compromise (September 2023)." The Research Brief confirms a Dark Angels ransomware attack on JCI with an attack window of February 1 to September 30, 2023. (Research Brief, Sec 9)
3.  **TLStorm Vulnerabilities Existence:** The chapter references "TLStorm vulnerabilities in Schneider APC UPS units." The Research Brief lists three specific CVEs for Schneider APC Smart-UPS under the TLStorm umbrella (CVE-2022-22805, CVE-2022-22806, CVE-2022-0715), all with CVSS 9.1 or 9.8. (Research Brief, Sec 3.1)
4.  **BACnet/Modbus Protocol Insecurity:** The chapter states BACnet/Modbus protocols have no native encryption or authentication. The Research Brief explicitly lists "No Authentication" and "No Encryption" as critical vulnerability classes for both protocols. (Research Brief, Sec 8)
5.  **IEC 62443-3-2 Reference:** The chapter mentions adapting HAZOP "within IEC 62443-3-2 zone and conduit risk assessments." IEC 62443-3-2 is correctly identified in the Standards Research as the standard for zone and conduit model. (Standards Research, Sec 2)

### CONTRADICTIONS
1.  **Johnson Controls Attack Timeline:** The chapter states the "Johnson Controls Metasys compromise (September 2023) demonstrated that BMS platforms are reachable." The Research Brief (Sec 9) specifies the attack had an 8-month dwell time beginning in February 2023, not that it occurred solely in September 2023. September 2023 is the month of detection/exfiltration, not the sole month of the attack.
2.  **Unitronics Compromise Details:** The chapter claims "The Unitronics PLC compromises (November 2023) demonstrated that default credentials on OT controllers are actively targeted by nation-state actors." The Research Brief contains no data on Unitronics PLCs. This claim is not supported or contradicted by the provided research, but it introduces a vendor/product not covered in the brief.

### GAPS
The following data from the Research Brief is not referenced or integrated into the provided chapter draft:
1.  **Critical CVEs in BMS Platforms:** The chapter's HAZOP example focuses on a BACnet/fire panel interface. The Research Brief identifies critical, exploitable CVEs in major BMS platforms (Johnson Controls Metasys CVE-2025-26385 CVSS 10.0; Honeywell Niagara July 2025 disclosures; Schneider EcoStruxure Building Operation CVEs). These provide concrete, high-severity causes for the "cyber-induced deviation" guide word.
2.  **Cooling Infrastructure Specific Vulnerabilities:** The chapter's cooling HAZOP table is generic. The Research Brief (Sec 4) lists specific CVEs for cooling-related components: ABB VFDs (CVE-2024-48510, CVSS 9.8), Siemens SINAMICS VFDs (CVE-2024-56336, CVSS 9.8), and Johnson Controls York chiller integration via Metasys.
3.  **Physical Security System Vulnerabilities:** The chapter does not address physical security OT nodes. The Research Brief (Sec 5) details critical CVEs in physical security systems (e.g., HID Mercury CVE-2022-31481, CVSS 10.0), which are part of a datacenter's overall OT attack surface.
4.  **Industrial Network Equipment Vulnerabilities:** The chapter's HAZOP assumes network access as an attack vector. The Research Brief (Sec 7) specifies vulnerabilities in the network equipment itself (Moxa hard-coded credentials CVE-2024-9138, CVSS 8.6), which could be the initial point of compromise.
5.  **MITRE ATT&CK for ICS Mapping:** The Research Brief (Sec 10) provides a detailed mapping of ICS attack techniques (e.g., T0878 Alarm Suppression, T0831 Manipulation of Control) directly applicable to the "cyber-induced deviations" and attack scenarios described in the chapter. This framework is not utilized in the HAZOP methodology as presented.

### UNVERIFIABLE
1.  **Field Observation Anecdote:** The specific scenario regarding a "40 MW colocation facility in ANZ" and the "$15,000" remediation cost is presented as a personal observation. No vendor specification or third-party data is provided to verify the specific BMS/fire panel interface or remediation cost.
2.  **Claim of "No Sophisticated Tooling":** The abstract states cascading attacks require "no sophisticated tooling." The Research Brief details numerous CVEs enabling remote code execution (e.g., Metasys CVE-2025-26385, Schneider EcoStruxure IT DCE CVEs), which imply the use of exploit tooling or script kiddie techniques rather than simple command-line access.
3.  **Claim of "No Zero-Day Vulnerabilities":** The abstract states attacks require "no zero-day vulnerabilities." The Research Brief catalogs numerous *known* but often *unpatched* CVEs. The claim is technically true for the described scenario but risks downplaying the challenge of patching these known vulnerabilities in operational OT environments.

### CORRECTIONS
1.  **Incomplete Chapter Draft:** The chapter draft is truncated mid-sentence at the start of Table 2.2, making it impossible to fact-check the entire table. The "Known Vulnerabilities Affecting Cooling Infrastructure" section is cut off.
2.  **Source Attribution:** The chapter references "BARR Engineering, 2022" as the source for TLStorm. The Research Brief attributes TLStorm to NVD and CISA advisories published in March 2022. The specific role of "BARR Engineering" is not confirmed in the provided brief.
3.  **CVSS Score Implied for "Major":** The HAZOP table assigns a "Major" severity rating to consequences like "GPU throttling reduces compute capacity by 40–60%." The Research Brief does not map vendor CVSS scores to facility impact severity ratings, so the equivalence between "Major" and specific CVSS ranges (e.g., 7.0-8.9) is an internal chapter definition, not an external fact.

**Recommendation:** Integrate specific, high-severity CVEs from the Research Brief (e.g., CVE-2025-26385, CVE-2022-22805) into the HAZOP table's "Cause (Cyber-Induced)" and "Existing Safeguards" columns to substantiate the analysis with verified vulnerability data. Align the methodology with the MITRE ATT&CK for ICS framework from the research for consistency in describing attack paths.