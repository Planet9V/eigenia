# Fact-Check Report: WP04
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:34:46.648149

## FACT-CHECK REPORT: WP04 Chapter 4

### CONFIRMED
1. **ISASecure Certification Types** (Chapter Table 4.2a vs. Research Section 1): SDLA (IEC 62443-4-1), CSA (IEC 62443-4-2), SSA (IEC 62443-3-3), and ICSA (IEC 62443-4-2) are correctly listed and mapped.
2. **Gap in Datacenter-Specific OT Product Certification** (Chapter Table 4.2a Note vs. Research Gap Analysis Table): Both documents confirm UPS NMCs, CDU PLCs, and EPMS meters are not commonly ISASecure CSA-certified, identifying a gap.
3. **Security Level Definitions** (Chapter Table 4.3 vs. Research Section 2 Table): SL-1 through SL-4 definitions and their mapping to threat actor profiles are consistent.
4. **IEC 62443-4-2 Foundational Requirements** (Chapter Section 3 vs. Research Section 3): FR1-FR7 and their objectives are accurately described.
5. **Vendor SDLA Certifications** (Chapter Table in Section 2.3 Note vs. Research SDLA Table): ABB, Schneider Electric, Honeywell, and Johnson Controls are confirmed as SDLA-certified vendors.

### CONTRADICTIONS
1. **Number of Zones** (Chapter Abstract vs. Research Section 2 Diagram):
   - Chapter Abstract: States "Eight zones and five conduits are defined."
   - Research Diagram: Shows six zones (0-6) with five conduits (C0-1, C0-2, C1-3, C2-4, C5-0). The chapter's claim of eight zones is incorrect; the research data defines six.

2. **Siemens SDLA Maturity Level** (Chapter SDLA Table Note vs. Research SDLA Table):
   - Chapter: Lists Siemens with "—" under Maturity Level.
   - Research: Lists Siemens as having "ML3" maturity for its Product Security Lifecycle. The chapter omits this detail.

### GAPS
1. **SSA-Certified Systems Detail**: The chapter's note on SSA certification lacks the specific systems (ABB Ability System 800xA, Schneider Electric EcoStruxure Foxboro DCS/Triconex, Honeywell Experion PKS) and their datacenter relevance listed in the research's SSA table.
2. **Component Type Classification**: The research provides the IEC 62443-4-2 component type classification (Embedded Device, Network Component, Host Device, Software Application) with datacenter OT examples. This detailed mapping is absent from the chapter.
3. **Detailed FR/SR Mapping Tables**: The research provides granular tables mapping specific Component Requirements (CR 1.1, CR 2.1, etc.) to Security Levels and datacenter asset types. The chapter only summarizes the FRs.
4. **Vendor SDLA Maturity Levels**: The research specifies maturity levels (ML3) for ABB, Schneider, Honeywell, and Johnson Controls. The chapter's table does not include this information.

### UNVERIFIABLE
1. **Specific CVE Claims** (Chapter Section 2.2): The chapter cites CVE-2024-9138 and CVE-2024-9140 (CVSS 9.3) for the Moxa EDS-4000/G4000 switch. The research brief contains no data on specific CVEs or CVSS scores. The validity of these specific references cannot be cross-checked against the provided research.
2. **Moxa Product Certification Status**: The chapter states the Moxa EDS-4000/G4000 holds IEC 62443-4-2 SL-2 certification (SL-A). The research lists Moxa EDR-G9010 and TN-4900 as CSA-certified but does not mention the EDS-4000/G4000 series. The chapter's specific claim about this product model is not verified by the research.

### CORRECTIONS
1. **Zone Count Error**: In the chapter Abstract, replace "Eight zones and five conduits are defined" with "Six zones and five conduits are defined" to match the research data's zone and conduit model.
2. **Missing SDLA Maturity Level**: In the chapter's note on SDLA vendors, add the maturity level "ML3" for ABB, Schneider Electric, Honeywell, and Johnson Controls, as per the research data.