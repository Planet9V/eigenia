# Fact-Check Report: WP12
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:34:54.376595

## Fact-Check Report for WP12 Chapter Draft

### CONFIRMED
- **Table 12.2 Functions:** The described functions for utility-scale BESS (Grid interconnection bridge, Demand response, UPS augmentation, Renewable integration) are standard industry use cases. The research data does not contradict these.
- **Table 12.3 - Certification Gap:** The claim that no datacenter-specific BESS components from major vendors (Tesla, Fluence, etc.) hold ISASecure CSA certification is confirmed by the research's "Gap Analysis" table (Section 1, Research Brief).
- **Table 12.3 - Certified Products:** The listed certified products (Moxa EDR-G9010, TN-4900; Honeywell ControlEdge, Safety Manager; ABB System 800xA; Schneider Foxboro DCS) are accurately sourced from the ISASecure registry table in the research.
- **Table 12.3a:** The specific certified components and vendors listed are directly supported by the research data.

### CONTRADICTIONS
- **Table 12.2 - Key Vendors:** The chapter lists **BYD Cube, Samsung SDI, CATL EnerOne** as key vendors. The research data does not list these three vendors anywhere, including in the vendor lists for certifications or gap analysis. The research's BESS-related vendor mentions are limited to references in context (e.g., Tesla in the note on datacenter-specific products).
- **IEC 62443 Zone Mapping for BESS:** The chapter states Zone 6 is defined per "IEC 62443-3-2, Clause 5." The research data's Section 2 defines the zone model and references Clause 5 for Security Level definitions, not for the zone definitions themselves. The specific zone model shown is a proposed "Recommended Datacenter OT Zone Model," not a direct citation from a clause.
- **Table 12.3 - Datacenter-Specific Certification Status:** The chapter's column "Datacenter-Specific Certification" states "None" for all BESS components. The research data confirms the gap but does not state that a specific "datacenter-specific certification" scheme exists; it states these products are not in the general ISASecure registry.

### GAPS
- **Table 12.2 - Scale Ranges:** The research data provides no specific scale ranges (MWh) for BESS functions. The chapter's ranges are presented without supporting data from the brief.
- **Practitioner's Note - 200 MWh Example:** The research data contains no information about a specific 200 MWh lithium-ion BESS installation, its network configuration (Modbus TCP on same VLAN as chillers), or vendor awareness of IEC 62443.
- **Table 12.3 - Thermal Management System Protocol:** The chapter specifies "BACnet or proprietary." The research data does not specify the OT interface protocols for BESS thermal management systems.
- **Table 12.3 - Fire Detection Gases:** The chapter lists "(HF, CO, VOC)." The research data (NFPA 76 section) mentions gas detection for Li-ion as "H₂, CO, HF." Hydrogen (H₂) is listed in the research but omitted in the chapter.
- **Table 12.4 - RPN Scores:** The research data contains no Risk Priority Number (RPN) calculations or scores for CyHAZOPs scenarios.
- **Table 12.4 - MITRE Technique IDs:** The research data does not map threats to MITRE ATT&CK for ICS technique IDs (T0836, T0831, etc.).
- **Zone Model SL-T for Zone 3:** The chapter's zone model diagram assigns Zone 3 (Fire & Life Safety) an SL-T of "3". The research's zone model diagram does not specify an SL-T for Zone 3.

### UNVERIFIABLE
- **Practitioner's Note - Vendor Response:** The claim that the BESS vendor equated their system to a "transformer" and considered it an "electrical installation" is an anecdote with no corroboration in the research data.
- **Practitioner's Note - Network Configuration:** The claim of "default credentials" on the 200 MWh BESS is unverifiable from the provided research.
- **Table 12.4 - Consequence Descriptions:** Specific consequences like "toxic gas (HF, CO)" and "fire suppression depleted" are not found in the research data for BESS scenarios.

### CORRECTIONS
- **Line/Reference Error:** The chapter's footnote for Table 12.3 states "Zone mapping: All BESS OT components... reside in Zone 6... per the IEC 62443-3-2 zone model defined in the standards research [IEC 62443-3-2, Clause 5]." The research's Section 2 states that Clause 5 defines "Security Level Definitions," not the zone model. The zone model is presented as a "Recommended Datacenter OT Zone Model" derived from the standard's process, not cited from a specific clause.
- **Incomplete Vendor List:** Based on the research data, the "Key vendors" list in Table 12.2 is incomplete and potentially inaccurate. The research does not support the inclusion of BYD, Samsung SDI, or CATL as key vendors in this context. The verifiable vendors from the research are Tesla, Fluence, and Schneider Electric (in SDLA context).
- **Omission from Table 12.3a:** Table 12.3a, titled for comparison, omits certified products from the research that are relevant to datacenter infrastructure. Specifically, it is missing **InHand Networks Edge Gateways (IIoT Gateway, CSA certified)** and **Schneider Electric Triconex SIS (SSA certified)** from the research's Section 1 tables.