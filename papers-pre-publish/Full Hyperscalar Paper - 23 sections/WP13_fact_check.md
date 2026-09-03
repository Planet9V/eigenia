# Fact-Check Report: WP13
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:35:29.067484

# Fact-Check Report: Chapter 13 (WP13) vs. Research Brief (WP01/06/07)

## CONFIRMED
*   **IEC 62443 Zone Model:** The chapter's Table 13.2 correctly maps AI applications to IEC 62443 zones (e.g., PUE optimization to Zone 1, Autonomous load management to Zone 2), consistent with the zone model defined in the research brief (Section 2).
*   **Protocol Standards:** The chapter accurately lists protocols (BACnet/IP, Modbus TCP, DNP3, IEC 61850 MMS) and their association with specific OT systems as per the research brief.
*   **ASHRAE TC 9.9 Water Classes:** The chapter's reference to "W17–W45" aligns with the naming and temperature ranges defined in the research brief (Section 4).
*   **EN 50600-2-3 Availability Class:** The chapter's use of "Availability Class 3–4" for EN 50600-2-3 matches the research brief's definitions (Section 5).
*   **IEC 62443-4-2 FR3 and FR7 Requirements:** The chapter correctly maps AI hazards to specific IEC 62443-4-2 Foundational Requirements (FR3 System Integrity, FR7 Resource Availability) and Component Requirements (CR 3.4, CR 7.2) as defined in the research brief (Section 3).
*   **Conduit C0-1 Security Requirement:** The chapter's statement that conduit C0-1 "must enforce the security controls defined in IEC 62443-3-2 Clause 5.4" is consistent with the conduit requirement table in the research brief (Section 2).
*   **AI Command Obfuscation Problem:** The chapter's assertion that DPI cannot distinguish human vs. AI BACnet commands is logically consistent with the protocol-centric security model described in the research.

## CONTRADICTIONS
*   **Predictive Maintenance Access Type:** Chapter Table 13.2 states Predictive Maintenance provides "Read only (currently)" access to OT systems. The research brief does not corroborate this "currently" limitation; it lists the application without access type constraints. This is an **unsupported temporal claim**.
*   **NFPA 855 Chapter References:** The chapter's Table 13.2 references "NFPA 855 Ch. 4–13". The research brief details that NFPA 855 covers specific chapters (4, 5, 9, 10, 11, 13) for different functions. The chapter's range **oversimplifies** the structure and misrepresents the specific clauses.
*   **Digital Twin Write Scope:** Chapter Table 13.2 claims Digital Twin simulation has "Read + selective Write" to OT, specifically "maintenance scheduling (write to CMMS)". The research brief does not define a "CMMS" as part of the OT infrastructure or its zone; this is a **scope expansion not supported by the provided research**.

## GAPS
*   **ISASecure Certification Status:** The chapter makes no mention of the ISASecure Certified Products Registry (research brief Section 1), which is a key gap analysis for datacenter OT vendors like Vertiv, Schneider Electric, and Eaton. This omission hides the procurement reality that critical components (UPS NMCs, CDU PLCs) are **not yet ISASecure certified**.
*   **NFPA 76 Requirements:** The chapter references NFPA 855 and UL 9540A for BESS but omits NFPA 76 (research brief Section 6), which contains specific 2024 requirements for **off-gas detection in battery areas**, a critical safety integration point for OT.
*   **IEC 61850 Security Gaps:** The chapter mentions IEC 61850 protocols but fails to incorporate the research brief's detailed security gaps (Section 8): **unauthenticated GOOSE messages and unencrypted MMS**, which are fundamental vulnerabilities in datacenter substation automation.
*   **Component Security Assurance (CSA) Certification:** The chapter's standards mapping lacks any reference to the IEC 62443-4-2 Component Security Assurance certification level, detailed in the research brief. This is a key metric for evaluating vendor security claims.
*   **OCP S.A.F.E. Framework:** The chapter lists "OCP S.A.F.E. Scope 1–3 for server firmware" as a relevant standard. The research brief (Section 9) provides a detailed breakdown of this framework, which the chapter fails to integrate into its discussion of AI infrastructure (e.g., GPU firmware, RoT).

## UNVERIFIABLE
*   **Google DeepMind Cooling Reduction:** The chapter's abstract states "Google's DeepMind reduced datacentre cooling energy by 40%". The citation (Evans & Gao, 2016) is not provided in the research brief, and the claim is **not validated by any vendor specification or standard in the provided research data**.
*   **Hyperscaler Conduit Security Architecture:** The chapter states: "Currently, no hyperscaler publishes their conduit security architecture for AI-OT integration." This is a **negative claim** that cannot be verified with the provided research; it represents an assumption, not a documented fact.
*   **AI PUE Optimization Savings:** The Practitioner's Note claims "AI-driven PUE optimisation can reduce energy costs by 30–40%." This is a **broad industry claim without a direct link** to a specific study, standard, or vendor data point in the research brief.
*   **Taleb Test Tables A/B:** The chapter references a "Taleb Test" with outcomes "Table A" and "Table B" without definition. These references are **internal to a prior chapter series** and are unverifiable with the supplied materials.

## CORRECTIONS
*   **IEC 62443-3-2 Clause Reference:** The chapter cites "IEC 62443-3-2 Clause 5.4" for conduit security controls. The research brief correctly identifies the relevant requirement as being under **"Conduit Requirements (IEC 62443-3-2, Clause 5.4)"**, but the chapter's phrasing "must enforce the security controls defined in" is imprecise. The standard specifies requirements for conduits, not a prescriptive control list. **Action: Rephrase to align with standard's language.**
*   **ASHRAE TC 9.9 Water Class Naming:** The chapter table lists water classes as "W17–W45". The research brief (Section 4) defines the classes as **W17, W27, W32, W40, W45, and W+**. The chapter's "W17–W45" is an incomplete range. **Action: Correct to list all defined classes.**
*   **UL 9540A Test Level Definition:** The chapter's Table 13.2 cites "UL 9540A" as a relevant standard for BESS. The research brief (Section 7) specifies UL 9540A is a **test method**, not an installation standard, and defines four distinct test levels (Cell, Module, Unit, Installation). The chapter's citation is ambiguous. **Action: Specify "UL 9540A test data" as used in the HMA context of NFPA 855.**