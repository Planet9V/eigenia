# Fact-Check Report: WP10
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:33:45.213505

# FACT-CHECK REPORT: Chapter 10 — Annualised Loss Expectancy, ROSI, and the CFO's Decision Framework

## CONFIRMED: Claims Verified by Research

1.  **ISASecure Certification Gap:** The chapter's statement that UPS Network Management Cards (NMCs), CDU PLCs, and EPMS meters are not commonly ISASecure CSA certified is confirmed by the research brief's "Gap Analysis" table. The vendors (Vertiv, APC, Eaton) and product types match.
2.  **Vendor SDLA Status:** The chapter's notation that BMS controllers (e.g., from JCI, Honeywell) hold Secure Development Lifecycle Assurance (SDLA) only is confirmed by the research brief's SDLA certified vendor list.
3.  **IEC 62443 Zone Mapping:** The general zone assignments (e.g., UPS in Zone 2, BMS/Chillers/CDUs in Zone 1, Fire/Life Safety in Zone 3) are consistent with the recommended datacenter OT zone model in the research brief.
4.  **ASHRAE TC 9.9 Envelope Reference:** The chapter's reference to the ASHRAE A1 allowable envelope (15–32°C) for the N5 (Chiller) scenario is confirmed by the thermal guideline table in the research brief.
5.  **NIST SP 800-30 Reference:** The chapter's citation of NIST SP 800-30 (2012) as the source for ALE is standard and verifiable.

## CONTRADICTIONS: Conflicts Between Chapter and Research

1.  **CVE Citations and Certification Status:**
    *   **Chapter Claim (Table after 2.2):** N2 (UPS) has known CVEs CVE-2021-36222, CVE-2022-3865 (Schneider APC UPS). N5 (Chiller) has CVE-2023-3381 (Johnson Controls Metasys). N10 (Fire) has CVE-2022-3971 (Honeywell Fire Alarm).
    *   **Research Brief Data:** The ISASecure gap analysis confirms Schneider, JCI, and Honeywell hold SDLA certifications but not product-level CSA for these specific device types. The CVEs themselves are plausible and can be verified via ICS-CERT, but the research does not provide them. The contradiction lies in presenting unverified CVE IDs alongside a standards certification narrative without cross-referencing.
    *   **Conclusion:** The CVE IDs are presented as fact but are not sourced from the provided research. Their inclusion requires independent verification via ICS-CERT or NVD. The contradiction is not in the certification status, which is supported, but in the sourcing of vulnerability data.

2.  **Revenue Calculation Basis:**
    *   **Chapter Claim:** A 100 MW facility generates $12.5M per hour ($1.095B annual). This is based on a blended rate of "$12.50 per kWh."
    *   **Research Brief Data:** The research brief contains no data on datacenter revenue models, $/kWh pricing, or GPU-hour costs. This claim is entirely absent from the research.
    *   **Conclusion:** The financial claim is unsupported by the provided research and appears to be an external assumption. The "blended rate" of $12.50/kWh is orders of magnitude higher than typical datacenter colocation rates, suggesting a potential error or a mislabeling of units (perhaps $/MWh?).

## GAPS: Research Data Not Yet Integrated into Chapter

1.  **NFPA 855 (2026 Edition):** The research brief details significant updates in NFPA 855 (2026), including Large-Scale Fire Testing (LSFT) mandates and ventilation requirements for battery gases. Chapter 10 mentions NFPA 855 in the standards baseline but does not incorporate these specific, newer requirements into risk or cost assumptions for BESS-related nodes.
2.  **EN 50600 Protection Classes (PC 1-4):** The research brief provides a detailed mapping between EN 50600 Protection Classes and IEC 62443 Security Levels (SL). The chapter references EN 50600 availability classes for EF assignment but does not integrate the physical security dimension (PC) or its cyber implications for zone-specific risk.
3.  **IEC 62443-4-2 Component Type Mapping:** The research brief maps IEC 62443-4-2 Foundational Requirements (FRs) and Component Requirements (CRs) to specific datacenter asset types (e.g., CR 7.1 DoS protection for UPS NMCs). This granular mapping could directly inform and validate the "Control Cost" assumptions that are referenced but not detailed in Chapter 10.
4.  **OCP S.A.F.E. Scope Details:** The research brief describes OCP S.A.F.E.'s Scope 1 (External Attack Surface) focus on BMCs and NICs. Chapter 10 references OCP S.A.F.E. certification for BMCs (Node N14) but does not leverage the scope definitions to differentiate risk between, for example, a BMC (Scope 1) and a BMS controller (not covered by S.A.F.E.).

## UNVERIFIABLE: Claims Without Supporting Evidence

1.  **Gordon-Loeb "Best Investment" Model Application:** The chapter states the programme operates at "49% of the Gordon-Loeb best ceiling." The Gordon & Loeb (2002) model is cited, but the research brief contains no data on optimal investment calculations, loss magnitudes, or threat probabilities required to verify this specific percentage.
2.  **Programme ROSI of 842%:** The Return on Security Investment calculation is presented as fact. The research provides no data on the $1.60M programme cost or the specific mitigation rates used to derive the $15.07M mitigated loss figure. This is an internal calculation without supporting evidence in the provided research.
3.  **Specific ARO Values:** The Annualised Rate of Occurrence values (e.g., 0.05, 0.10) are stated to be "informed by" Dragos and Verizon reports. The research brief does not contain or reference these threat intelligence reports, so the basis for these specific frequencies is unverifiable within the given materials.
4.  **Fat-Tail Correction Magnitude:** The chapter claims standard ALE underestimates risk "by an order of magnitude" for Table B events after applying a Taleb fat-tail correction. No data, model, or reference is provided in the research to support this specific quantitative correction factor.

## CORRECTIONS: Specific Errors Found

1.  **Incorrect Standards Clause Reference for EF Assignment (Section 2.2, "Standards basis" note):** The note states the N5 (Chiller) EF assumes "a Class 2 cooling topology (N+1 redundancy per EN 50600-2-3)". **EN 50600-2-3 defines Availability Classes 1-4 for environmental control, not "Class 2 topology".** The correct reference is to **Availability Class 2** (N+1 redundancy). This is a terminology error.
2.  **Inconsistent CVE Reference for N5 (Chiller):** The chapter lists CVE-2023-3381 for Johnson Controls Metasys. **Research indicates JCI holds only SDLA for secure development, not product-level CSA for Metasys.** While a CVE for Metasys is plausible, citing it in a context implying product certification is misleading. The chapter should clarify this is an independent vulnerability, not a failure of a non-existent CSA certification.
3.  **Revenue Rate Plausibility Error (Section 2.2, "Revenue basis"):** The claimed rate of **"$12.50 per kWh"** is a major error. Typical hyperscale colocation rates are in the range of $0.05 - $0.15 per kWh. The figure may be a conflation of **GPU-hour pricing** (cited as $2.00–$3.50/GPU-hour) with facility power draw. The $12.5M/hour calculation is therefore unsound as presented.
4.  **Omission of Critical Conduit/Protocol Detail:** The chapter's Table 10.2 does not reference the conduit security requirements (e.g., industrial firewalls, data diodes) defined in the research brief (IEC 62443-3-2, Clause 5.4). The risk and cost models should implicitly account for these control costs, but the explicit link is missing.