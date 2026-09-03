# Fact-Check Report: WP08
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:35:38.980070

# FACT-CHECK REPORT: CyHAZOPs Chapter 8

## CONFIRMED
1. **Johnson Controls Dark Angels Ransomware Attack (Sep 2023)**  
   - Chapter reference: Section 1.1 Table 8.3, Row 1.  
   - Research verification: Section 9 confirms attack date (Sep 2023), $27M+ cost, 27TB exfiltrated, 76M households affected.  
   - Consistency: Research provides specific financial impact ($27M+) but chapter uses hypothetical $50M GPU damage example (not from research).

2. **IEC 62443-3-2 Outputs**  
   - Chapter reference: Abstract states "zone/conduit models, SL-T assignments."  
   - Research verification: Standards Section 2 title confirms "IEC 62443-3-2 — Zone & Conduit Model for Datacenters."  
   - Consistency: Research does not contradict; chapter accurately describes framework outputs.

3. **MITRE ATT&CK for ICS Usage**  
   - Chapter reference: Abstract, Section 1.1 Table 8.3 Row 2 cites "CISA AA24-038A."  
   - Research verification: CVE Research Section 10 maps techniques; Section 9 confirms Volt Typhoon reference (AA24-038A is CISA advisory for Volt Typhoon).  
   - Consistency: Research confirms threat actor context.

4. **BACnet/Modbus Insecure by Design**  
   - Chapter reference: Implicit in Section 1.1 Table 8.3 Row 3 (BMS spoofing scenario).  
   - Research verification: CVE Research Section 8 explicitly lists "No Authentication," "No Encryption" for BACnet/Modbus.  
   - Consistency: Research confirms protocol weaknesses.

5. **Honeywell Niagara Vulnerabilities (July 2025)**  
   - Chapter reference: Section 1.1 Table 8.3 Row 3 mentions "Johnson Controls, Sep 2023" but not Niagara.  
   - Research verification: CVE Research Section 2.1 lists 13 Niagara CVEs disclosed July 2025.  
   - Consistency: Chapter does not reference Niagara; research provides new data not in chapter.

## CONTRADICTIONS
1. **Johnson Controls Attack Date vs. Notification Delay**  
   - Chapter reference: Section 1.1 Table 8.3 Row 1 states "Sep 2023" attack.  
   - Research verification: Section 9 states "Notification Delay: 22 months (Jul 2025 notification for Sep 2023 breach)."  
   - Conflict: Research adds notification timeline not in chapter; no direct contradiction but chapter omits key detail about delayed disclosure.

2. **IEC 62443-3-2 Role**  
   - Chapter reference: Foreword states "IEC 62443 bridges these domains structurally, but it is a requirements framework, not a hazard identification methodology."  
   - Research verification: Standards Section 2 describes IEC 62443-3-2 as "Zone & Conduit Model for Datacenters."  
   - Conflict: Chapter implies IEC 62443 does not identify hazards; research does not address this distinction. Potential misalignment on methodology scope.

## GAPS
1. **ASPEED BMC Monoculture Vulnerabilities**  
   - Chapter reference: Section 1.1 Table 8.3 Row 3 claims "ASPEED monoculture creates single point."  
   - Research verification: CVE Research lists no ASPEED BMC CVEs. Appendix shows 15 critical CVEs but none attributed to ASPEED.  
   - Gap: Chapter asserts risk without supporting CVE data from research.

2. **IEC 62443-3-2 Clause Specifics**  
   - Chapter reference: Abstract references "IEC 62443-3-2."  
   - Research verification: Standards Section 2 title only; no clause numbers (e.g., 6.2, 6.3) provided.  
   - Gap: Research lacks detailed clause mapping required for "zone/conduit models, SL-T assignments."

3. **Financial Quantification Sources**  
   - Chapter reference: Abstract claims "$1.60M in targeted OT controls prevents $8.88M in expected annual loss."  
   - Research verification: No financial data in CVE Research or Standards Research.  
   - Gap: Chapter financial claims lack supporting research data.

4. **14-Node Reference Architecture**  
   - Chapter reference: Abstract mentions "application to a 14-node hyperscale datacentre reference architecture."  
   - Research verification: No architecture details in provided research.  
   - Gap: Research does not define the reference architecture nodes.

## UNVERIFIABLE
1. **Verizon DBIR 2024 Citation**  
   - Chapter reference: Section 1.2 mentions "Verizon DBIR 2024 finds that 74% of all breaches involve the human element."  
   - Research verification: Not referenced in CVE Research or Standards Research.  
   - Status: External source not provided; cannot verify.

2. **Exact Financial Figures**  
   - Chapter reference: Abstract states "ROSI: 842%," "$50M in GPUs" (Section 1.1).  
   - Research verification: No ROI calculations or GPU damage figures in research.  
   - Status: Figures appear hypothetical; not supported by provided research.

3. **Specific Standards Clauses**  
   - Chapter reference: Chapter cites "IEC 62443-3-2," "IEC 61882 HAZOP."  
   - Research verification: Standards Research lists titles only (e.g., "IEC 62443-3-2 — Zone & Conduit Model"). No clause-level validation.  
   - Status: Clause accuracy cannot be confirmed from provided research.

## CORRECTIONS
1. **Johnson Controls Attack Impact**  
   - Error: Chapter Table 8.3 Row 1 implies $50M GPU damage from attack.  
   - Correction: Research Section 9 states actual financial impact was "$27M+ in incident response, remediation, lost revenue." GPU damage is hypothetical.  
   - Line Reference: Chapter Section 1.1, Table 8.3 Row 1.

2. **Honeywell Niagara Disclosure Timeline**  
   - Error: Chapter does not mention Niagara vulnerabilities (July 2025).  
   - Correction: Research Section 2.1 lists 13 Niagara CVEs disclosed July 2025 (CVSS 9.8). Should be integrated into threat landscape.  
   - Line Reference: Research CVE Table 2.1.

3. **IEC 62443-3-2 Output Prescription**  
   - Error: Chapter Abstract claims IEC 62443-3-2 "produces" zone/conduit models.  
   - Correction: Research Standards Section 2 describes IEC 62443-3-2 as a "model" framework, not a process that "produces" outputs. CyHAZOPs methodology produces outputs per the framework.  
   - Line Reference: Chapter Abstract; Research Standards Section 2 title.

4. **ASPEED BMC Vulnerability Claim**  
   - Error: Chapter Table 8.3 Row 3 implies documented ASPEED CVEs ("ASPEED monoculture creates single point").  
   - Correction: CVE Research Appendix shows 15 critical CVEs; none listed for ASPEED. Claim is unsupported by provided data.  
   - Line Reference: Chapter Section 1.1, Table 8.3 Row 3; Research Appendix severity distribution.