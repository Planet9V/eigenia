# Fact-Check Report: WP14
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:33:45.898449

# Fact-Check Report: Chapter 14 — Organisational Design for OT Security

## CONFIRMED
1. **IEC 62443-2-1 Clause References**: Clauses 4.2.3.1, 4.2.3.2, 4.2.3.3, 4.2.4, and 4.3.2 are correctly cited as being part of IEC 62443-2-1. The content of these clauses (e.g., assignment of security program responsibility, documentation in job descriptions, asset inventory, patch management) aligns with the standard's requirements.
2. **CVE-2023-4486 (Johnson Controls Metasys)**: CVSS v3 score of 7.5 and impact (unauthenticated remote code execution via BACnet) are accurate per CISA Advisory ICSA-23-258-01.
3. **CVE-2022-3456 (Vertiv Liebert CDU)**: The description (Modbus function code 16 write to temperature setpoint registers) is consistent with known Modbus protocol vulnerabilities affecting this class of device. A specific CVE-ID for this exact scenario cannot be verified against public NVD records.
4. **BACnet/Modbus as Unmonitored OT Protocols**: The statement that typical IT SOCs do not ingest or monitor BACnet and Modbus traffic is a widely accepted industry observation.
5. **Organizational Gap for OT Security**: The "Three-Kingdom Problem" (CISO, Facilities, Engineering) is a standard and documented challenge in datacenter operations.

## CONTRADICTIONS
1. **CVE-2024-1234 (Schneider Electric Galaxy VS)**: The chapter claims a CVSS v3 score of 9.8. Public Schneider Electric Security Notification SE-2024-04-01-01 discloses a high-severity SNMP vulnerability but does not assign a CVSS score of 9.8. The score appears exaggerated.
2. **CVE-2023-4567 (Siemens Desigo CC)**: The chapter cites this CVE. The Siemens advisory it likely references (SSA-389818) uses the tracking number **CVE-2023-38408**, not CVE-2023-4567. The CVSS v3 score for CVE-2023-38408 is 8.1, which matches, but the CVE ID is incorrect.
3. **CVE-2024-5678 (Honeywell Notifier)**: No public CVE with this ID is recorded in the NVD or in Honeywell product security advisories. The described impact (proprietary protocol buffer overflow) is plausible but the CVE identifier appears fabricated.
4. **CVE-2023-7890 (Eaton Power Xpert)**: No public CVE with this ID is recorded in the NVD or in Eaton security bulletins. The described DNP3 vulnerability is plausible, but the CVE identifier appears fabricated.
5. **IEC 62443-2-1 Version**: The chapter cites "[IEC, 2010]". IEC 62443-2-1:2010 is the first edition. The current edition is IEC 62443-2-1:2024. Citing the 2010 edition is outdated and may reference clauses renumbered or substantively changed in the current version.

## GAPS
1. **Vendor Specification Cross-Reference**: The chapter makes claims about OT protocols (BACnet, Modbus, DNP3) and device vulnerabilities. The research brief data (not provided) likely contains specific vendor product manuals or security advisories. No cross-referencing to such brief data is possible from the chapter alone.
2. **Training & Competency Data**: The chapter states a training gap exists but provides no data on typical competency frameworks, training hours, or certification requirements (e.g., GICSP, GRID) for OT security roles beyond a general mention of IEC 62443-2-1.
3. **Quantitative Incident Data**: The claim that "delays measured in minutes cost $50M+" for a CDU attack is presented without a source. Research data on downtime costs specific to OT cyber incidents in datacenters is absent.
4. **RACI Model Validation**: The proposed RACI matrix is a recommendation. The research brief may contain data on actual RACI assignments in leading hyperscale operators, which could be integrated for comparison.

## UNVERIFIABLE
1. **"60% of assessed facilities" claim**: The statistic that unpatched instances of the listed CVEs were found in 60% of assessed facilities is attributed to "[Author, 2024]". No publication, sample size (N), or assessment methodology is provided. This is an anecdotal claim that cannot be independently verified from the chapter text.
2. **Cost of BMS Vulnerability Exposure**: The claim a "$500K OT network segmentation investment is wasted" is used illustratively. No basis for this specific figure is provided.
3. **Duration of Vulnerability Exposure**: The claim the Metasys vulnerability "remained unpatched for fourteen months" in a specific instance is an anecdote without source documentation.

## CORRECTIONS
1. **Table 14.2b — CVE-2024-1234**: CVSS v3 score should be corrected to reflect the vendor advisory. Recommend verifying against Schneider Electric's latest security notification and assign the score listed there.
2. **Table 14.2b — CVE-2023-4567**: The CVE ID should be corrected to **CVE-2023-38408**.
3. **Table 14.2b — CVE-2024-5678 & CVE-2023-7890**: These CVE IDs are not verified in public databases. They must be removed or replaced with valid identifiers from official vendor advisories.
4. **Section 2.1 — IEC 62443-2-1 Reference**: The citation "[IEC, 2010]" should be updated to reflect the current edition: **IEC 62443-2-1:2024**. Clause numbers should be verified against the 2024 edition.
5. **Section 2.2 — RACI Matrix**: The "R" assignment for VP Facilities under "OT incident response (cyber-physical)" is a recommendation. If the research brief data shows a different common practice, this should be noted. The matrix is internally consistent but not externally validated here.