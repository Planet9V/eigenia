# Fact-Check Report: WP00
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:38:11.874010

# Fact-Check Report: WP00 Chapter Content

## CONFIRMED
1. **Internal Consistency of Hyperscale Scale Metrics:** Table 0.2 parameters (IT load, rack density, cooling type, redundancy model, build model, capital cost) are internally consistent and align with published industry ranges for hyperscale facilities.
2. **OCP/ODM Supply Chain Description:** The description of hyperscale operators using OCP specifications and ODMs (Foxconn, QCT, Wiwynn, Celestica) is correct and verifiable via OCP and company public documentation.
3. **ASHRAE A4 Classification:** The claim that ASHRAE TC 9.9 classifies high-density, liquid-cooled environments as "A4" is accurate per ASHRAE guidelines.
4. **Cyber Resilience Act (CRA) and NIS2 Scope:** The statement that physical plant OT systems fall within the scope of the EU CRA and NIS2 directive is correct per the text of both regulations.
5. **Subsystem Definition:** The five subsystems listed (electrical, thermal, BMS/controls, physical security, compute) represent a standard segmentation of datacenter infrastructure.

## CONTRADICTIONS
*No contradictions identified.* The research brief section is empty; therefore, no external data conflicts with the chapter content.

## GAPS
1. **No Vendor/Firmware/CVE Verification Data:** The research brief provides no independent vendor specifications, firmware version data, or CVE validation to cross-reference against Table 0.3. All entries in Table 0.3 (e.g., "Siemens SIPROTEC 5 v7.8," "APC Network Management Card 2 v6.9.2") remain unverified against provided research.
2. **Missing Standards Clause Specificity:** References to standards are general. No research data is provided to verify the specific clauses within IEC 62443, ISO 22237, or EN 50600 that define datacenter OT scope or classification.

## UNVERIFIABLE
1. **NERC CIP Applicability Threshold:** The claim "Where a campus includes on-site generation exceeding 75 MW, NERC CIP reliability standards may also apply" is not supported by the research brief. The 75 MW threshold requires citation from NERC CIP-002 definitions of Bulk Electric System (BES) facilities.
2. **Specific CVE Details:** While CVE IDs (e.g., CVE-2019-6260, CVE-2020-15795, CVE-2021-22681, CVE-2020-15368, CVE-2022-27226) are real, the research brief does not contain data to confirm the exact affected firmware versions, attack vectors, or confirmation of presence in the named ODM servers (Quanta, Wiwynn, Foxconn) as stated.
3. **Practitioner's Anecdote:** The claim regarding "cooling bill exceeds the salary budget for the entire operations team" is anecdotal and not verifiable with provided research data.
4. **Capital Cost Range for Hyperscale Campuses:** The "$500M – $5B+" range is plausible but lacks supporting research data (e.g., financial filings, construction permits).

## CORRECTIONS
1. **Table 0.3, Row "GIS / Switchgear":** The "Example Vendors" column lists "Hitachi Energy, Siemens Energy, ABB." ABB's energy divisions were divested and now operate as Hitachi Energy. The entry should be corrected to "Hitachi Energy, Siemens Energy."
2. **Table 0.3, Row "PDU / Power Shelves":** The "Common Firmware" entry lists "Flex ORv3 shelf firmware v2.1." Flex is a contract manufacturer. The firmware is associated with the OCP Open Rack v3 specification, not the vendor Flex. This attribute should be corrected to "OCP ORv3 Reference Firmware" or similar.
3. **Section 1.1, Paragraph 2:** The sentence "The AI training clusters within it — NVIDIA GB200 NVL72 racks at 120 kW each — generate heat densities that no air-based cooling system can manage." contains a product specification error. The NVIDIA GB200 NVL72 is a cabinet-level solution; its per-rack power consumption is not published as 120 kW. The 120 kW/rack figure in Table 0.2 is a generic hyperscale GPU cluster density, not a GB200-specific TDP. These are two separate claims and should not be conflated.