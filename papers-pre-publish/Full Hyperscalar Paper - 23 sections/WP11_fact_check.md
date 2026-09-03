# Fact-Check Report: WP11
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:34:26.548272

# Fact-Check Report: Chapter 11 — The Twenty-Year Attack Surface

## CONFIRMED
*Claims verified by research data.*

1.  **Lifecycle Phase Durations (Table 11.2):** The "12–24 months of construction" claim in the abstract is consistent with the 12–36 month range specified for Phase 2 in Table 11.2.
2.  **ISASecure Certified Product Claims (Section 2.3):** The chapter's listing of Moxa EDR-G9010, Moxa TN-4900, Honeywell ControlEdge PLC, and InHand Networks as CSA-certified products is confirmed by the ISASecure registry data in the Standards Research.
3.  **IEC 62443-4-2 Certification Requirement (Table 11.3):** The requirement for IEC 62443-4-2 Component Security Assurance certification at a specified Security Level (SL) is a valid application of the standard, as confirmed by the Standards Research describing CSA certification scope.
4.  **SBOM Requirement Reference (Table 11.3):** The reference to EU CRA Article 13(7) for software bill of materials is a valid legal citation external to the IEC 62443 framework.

## CONTRADICTIONS
*Direct conflicts between chapter claims and research data.*

1.  **Missing Critical Vendor/Protocol Vulnerability Context:** The chapter's procurement and lifecycle examples focus on standards gaps but do not incorporate the high-severity, actively exploited vulnerabilities documented in the CVE Research. For example:
    *   **Honeywell Niagara (CVE Research 2.1):** The chapter's Section 2.3 mentions Honeywell ControlEdge PLC but omits the 13 critical vulnerabilities (five at CVSS 9.8) in the widely deployed Niagara Framework disclosed in July 2025, which directly impacts BMS controllers.
    *   **Johnson Controls Metasys (CVE Research 2.2):** The chapter does not reference the CVSS 10.0 vulnerability (CVE-2025-26385) affecting core Metasys components, which is highly relevant to procurement specification and lifecycle risk discussions.
    *   **Schneider Electric EcoStruxure IT DCE (CVE Research 6.1):** The chapter's discussion of DCIM/OT monitoring in Phase 4 omits the five critical CVEs in EcoStruxure IT Data Center Expert ≤8.3, which is a common DCIM platform.
2.  **ISASecure Registry Gap Overstated:** The chapter claims datacenter-specific OT products like "UPS Network Management Cards" are not commonly found in the ISASecure registry. The Standards Research confirms this for UPS NMCs but notes that dedicated datacenter BMS controllers and EPMS meters are also absent. The chapter's claim is valid but incomplete; it does not acknowledge that entire product categories critical to datacenter OT, not just individual products, are missing certification.

## GAPS
*Relevant research data not integrated into the chapter.*

1.  **Concrete Exploit Examples for Risk Justification:** The chapter establishes the theoretical risk of compromised equipment in construction (Practitioner's Note) but does not integrate specific CVE examples from the research brief to illustrate the consequences during operations or decommissioning. Examples include:
    *   The Siemens SINAMICS S200 unlocked bootloader (CVE-2024-56336, CVSS 9.8) as a firmware integrity failure.
    *   The Moxa hard-coded credentials (CVE-2024-9138) as an example of why default credential elimination in procurement is critical.
    *   The HID Mercury controller vulnerabilities (CVE-2022-31481, CVSS 10.0) as an example of decommissioning risk for physical security systems.
2.  **Protocol-Level Vulnerability Data:** The chapter's decommissioning section mentions retired controllers carrying "network configurations." The CVE Research (Section 8) documents the fundamental lack of authentication/encryption in BACnet/Modbus, which makes any configuration data exfiltrated during decommissioning or present on the secondary market extremely high-risk. This context is absent.
3.  **Vendor-Specific Lifecycle Advisory References:** The chapter discusses patch support commitments generically. The research brief provides specific vendor advisory portals (Section 11) and recent advisories with patch timelines (e.g., Schneider SEVD-2026-041-02), which could be used to evaluate vendor claims in procurement.

## UNVERIFIABLE
*Claims lacking evidence in the provided research data.*

1.  **"Most organisations... ignore Part 2-4 entirely" (Section 1):** This assertion about widespread organizational practice is not substantiated by the provided research data, which only describes the standard's contents.
2.  **"The 200 construction workers... could have accessed those controllers" (Practitioner's Note):** This specific risk scenario is plausible but is an anecdotal claim without corroborating data in the research brief.
3.  **Minimum Threshold Percentages (Section 2.2):** The "60% aggregate" and "40%" thresholds for risk acceptance are presented as prescriptive guidance. The research data provides no validation for these specific figures.

## CORRECTIONS
*Specific errors found.*

1.  **Incorrect IEC 62443 Standard Reference (Section 1):** The chapter states "Most organisations implement Parts 3-2 and 3-3... and ignore Part 2-4." IEC 62443-2-4 is titled *Security program requirements for IACS service providers*. IEC 62443-3-2 is *Security risk assessment and system design* and IEC 62443-3-3 is *System security requirements and security levels*. The chapter incorrectly conflates the service provider process standard (2-4) with the design and system requirement standards (3-2, 3-3). The corrected statement should reference that organizations often focus on the technical design standards (3-2, 3-3) and neglect the service provider process standard (2-4).
2.  **Incomplete Vendor Product Naming (Table 11.3, IEC 62443-4-2 Reference):** The IEC 62443-4-2:2019 standard is cited for the "Firmware update mechanism" requirement. The specific clause is 10.3.4, which is correct. However, the requirement language references "CR 3.4 — Software application integrity," which is not standard IEC 62443-4-2 terminology. The standard uses "Requirement" (e.g., R3.4) or "System Requirement" (SR3.4) within its requirement families (FR, SR, EV). The chapter uses a non-standard abbreviation "CR."

---
**Summary:** The chapter's core lifecycle framework and procurement specification principles are valid. The primary deficiency is a lack of integration with the detailed, contemporary vulnerability data (2024-2026) in the research brief, which should be used to strengthen arguments for specific requirements and to provide concrete examples of risk. A minor standards reference error in Section 1 requires correction.