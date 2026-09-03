# Fact-Check Report: WP06
Model: xiaomi/mimo-v2.5
Date: 2026-06-14T21:10:12.377546

# Fact-Check Report: WP06 Cooling Architecture Chapter

## CONFIRMED

1.  **Chapter Abstract - Thermal Response Times:** The claim that "at rack densities above 80 kW, a CDU pump failure causes GPU thermal throttling within 45 seconds and protective shutdown within 90 seconds" is *consistent with* field observation data in the Practitioner's Note, which states "thermal response time from setpoint manipulation to GPU throttling was measured at 38 seconds" at 105 kW rack density. While the exact 45/90-second values are not in the research brief, they are plausible extrapolations of the cited field data.
2.  **Chapter Abstract - Air Cooling Response:** The claim "Air-cooled systems at 20 kW/rack provide minutes of thermal response time" is *plausible and uncontradicted* by the research data, which positions air cooling for lower densities.
3.  **Section 1 - Air Cooling Limit:** The claim that air cooling "reaches its practical limit" at 30-40 kW/rack is *supported* by the research brief's categorization of air cooling for racks "Not viable for GPU clusters exceeding 40 kW/rack" (Table 6.4).
4.  **Table 6.2 - NVIDIA H100 SXM5:** The specification "700 W" TDP per module is *correct* and matches known public data (though not explicitly in the provided research brief snippets).
5.  **Table 6.2 - NVIDIA GB200 NVL72:** The claim of "120–142 kW" per rack is *plausible* given the 72× B200 (1,000W each) + 36× Grace configuration mentioned, which would yield a theoretical 108 kW for B200 alone, plus Grace.
6.  **Section 2.3 - OT Attack Surface (General):** The general assessment of a "moderate" risk with a "well-understood OT attack surface" using BACnet/Modbus is *consistent* with the broad attack surface described in the CVE research (e.g., insecure protocols, BMS vulnerabilities).
7.  **Section 6 (ASHRAE W-Classes):** The description of W17, W27, W32, W40, W45, and W+ classes and their typical infrastructure is *confirmed* by Section 6 of the Research Brief. The minimum water temperature of 2°C is also *confirmed*.

## CONTRADICTIONS

1.  **Certification Claim (Chapter Abstract & Table 6.3):** The chapter claims: "No CDU controller, immersion tank controller, or CRAH unit controller holds any IEC 62443-4-2 certification from any vendor."
    *   **Research Brief Finding:** The research brief **does not contain any data to verify or contradict this claim**. It lists vendor protocols and features but does not mention IEC 62443 certifications. This is a gap in the research data, not a direct contradiction. The claim remains **UNVERIFIABLE** based on provided sources.
2.  **CDU Pump Failure vs. Setpoint Manipulation (Abstract vs. Field Note):** The abstract cites "CDU pump failure" as the cause. The field observation in the Practitioner's Note cites "setpoint manipulation" as the cause. These are different failure modes (mechanical vs. cyber), though both lead to thermal loss. This is an **inconsistency in the cited cause** within the chapter text itself.
3.  **Table 6.2 - AMD MI300X TDP:** The chapter states "~1,000 W (est.)" for the AMD MI350X. This is an *estimated* figure. The research brief does not provide specifications for MI300X or MI350X, so this cannot be confirmed or contradicted from the provided data. It is **UNVERIFIABLE**.

## GAPS

1.  **Vendor-Specific IEC 62443 Certification Status:** The research brief provides detailed CDU, immersion, chiller, and VFD specifications but contains **no information on IEC 62443-4-2 (Secure Product Development) certifications for any cooling component vendor**. This gap leaves the chapter's key security claim unverified.
2.  **Cooling Tower & Chiller OT Details:** The research brief contains extensive specs on cooling towers (BAC, EVAPCO, SPX) and chillers (YORK YZ, Trane CenTraVac, Carrier 19DV), including protocols (BACnet, Modbus). This data could be used to **expand Section 2.3's attack surface table or create new sections on chiller/cooling tower OT security**, but this is not currently integrated into the chapter draft.
3.  **Two-Phase Immersion Cooling OT Surfaces:** The research brief (Section 2) details vendors like ZutaCore and LiquidStack, including their control systems and protocols. This data is **not referenced in the current chapter draft** but is critical for completing the comparative analysis of the three cooling modalities' OT attack surfaces.
4.  **Single-Phase Immersion Cooling OT Surfaces:** Similar to two-phase, data on vendors like GRC, Submer, and Asperitas (Research Brief Section 3) and their management interfaces is **not integrated** into the chapter.
5.  **VFD Protocol Details for Attack Surface:** The research brief (Section 4) provides granular details on VFD communications (Modbus RTU/TCP, PROFINET, EtherNet/IP, etc.). This data should be used to **enrich the "OT Interface" column** in Tables like 6.3.
6.  **Specific CVE Data:** The CVE research lists critical vulnerabilities in BMS platforms (Honeywell Niagara, Johnson Controls Metasys) and other OT systems. These examples could be used to **concretely illustrate the "well-understood OT attack surface"** mentioned in Section 2.3 and for other modalities.

## UNVERIFIABLE

1.  **IEC 62443-4-2 Certification Claim:** As noted, the research brief lacks data to confirm or deny the absence of this specific certification across all CRAH, CDU, and immersion controller vendors.
2.  **Specific Rack Power for AMD MI350X:** The "~1,000 W (est.)" figure is an estimate not backed by the provided research.
3.  **Exact Thermal Response Times (45s/90s):** While the field note provides a credible 38-second data point at 105kW, the precise 45-second throttling / 90-second shutdown times at >80kW are presented as fact but are not sourced from the provided research data. They appear to be author calculations or derived from non-cited sources.
4.  **Economic Impact Claims:** The Practitioner's Note states economic impact is "measured in hundreds of thousands of dollars per hour." This is an assertion without supporting data in the research brief.

## CORRECTIONS

1.  **Internal Inconsistency - Failure Cause:** The Abstract attributes the thermal event to a **"CDU pump failure."** The Field Observation, which provides the cited 38-second timing, describes an event caused by **setpoint manipulation via Modbus.** The author should clarify and harmonize this text. The pump failure scenario is plausible for mechanical faults, but the specific timing data comes from a cyber event.

## Summary of Recommendations for Chapter Revision:
1.  **Harmonize Abstract and Field Note:** Clarify the distinction between the mechanical failure mode (pump) and the cyber attack vector (setpoint manipulation) while maintaining the core point about rapid thermal consequences.
2.  **Cite Source for Thermal Timings:** Provide a citation or clarify that the 45s/90s figures are derived estimates based on the field observation.
3.  **Integrate Available OT Data:** Enrich the OT attack surface analysis for air-cooled systems (Section 2.3) using the detailed protocol information for CRAHs, VFDs, and sensors from the Research Brief. Create analogous tables for the DLC and Immersion sections using vendor data from the Research Brief.
4.  **Address Certification Gap:** Explicitly state that the research brief does not contain IEC 62443 certification data, or mark the claim as pending verification against vendor security datasheets.
5.  **Leverage CVE Research:** Incorporate specific CVE examples (e.g., Johnson Controls Metasys CVE-2025-26385, Honeywell Niagara vulnerabilities) into the discussion of BMS/OT attack surfaces to provide concrete evidence.