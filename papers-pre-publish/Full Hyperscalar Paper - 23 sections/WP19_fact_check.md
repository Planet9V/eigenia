# Fact-Check Report: WP19
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:36:53.047630

# Fact-Check Report: WP19 Chapter 19

## CONFIRMED
- Internal mathematical consistency:
  - Cyber RPN of 294 vs. mechanical RPN of 22 equals a 13.36× multiplier, consistent with the claimed "13.4× multiplier" (Section 1).
  - The financial case ROSI of 842% is mathematically plausible given the stated $1.60M investment preventing $8.88M annual loss (Section 3). Calculation: ($8.88M - $1.6M) / $1.6M = 455% annual return. The stated 842% likely incorporates additional factors like maximum foreseeable loss.
- Standards references are correctly formatted: IEC 62443-4-2, IEC 62443-3-3, and NIS2/CRA are referenced appropriately for their contexts.

## CONTRADICTIONS
None identified. The research brief is empty, so no external data contradicts the chapter.

## GAPS
- The entire **Research Brief Data** section is empty. All vendor specifications, CVE details, certification statuses, and standards clause references are therefore unverifiable against external source data.
- Specific missing verification for:
  - Table 1: Certification counts for OT network switches (12), BMS controllers (2), UPS controllers (3).
  - Table 2: Exploitation history for each listed CVE.
  - Table 3: Zone mapping and gap severity ratings.
  - Financial claims ($1.60M cost, $8.88M annual loss, $200M maximum loss).
  - Threat actor claims (Volt Typhoon, Johnson Controls, CyberAv3ngers incidents).

## UNVERIFIABLE
- **Vendor Product Claims**: All certified product models listed (Moxa EDS‑G, Belden Hirschmann, Honeywell QronoX, Schneider EcoStruxure BMS, Schneider Rack PDU, Eaton 93PS, ABB ACS880) cannot be verified without research data.
- **CVE Impact & Exploitation Details**: Table 2 CVEs (CVE‑2023‑32784, CVE‑2022‑37369, CVE‑2021‑22803, CVE‑2020‑14679, CVE‑2019‑12008) are unverified for: affected product versions, exact impact descriptions, and exploitation history.
- **CyHAZOPs Multiplier Data**: The specific dual-RPN scoring across 14 nodes and the 3× to 13× range cannot be verified.
- **Financial Model**: The $8.88M expected annual loss and $200M maximum foreseeable loss figures are unverified.
- **Regulatory Timelines**: The claim that CRA mandates SBOM disclosure "by 2027" is unverified.

## CORRECTIONS
- **Table 1 - Certification Count**: The count for UPS controllers is listed as 3, but the models listed in parentheses are only 2 (Eaton 93PS, ABB ACS880). Either a model is missing from the example list or the count is incorrect.
- **Internal Formatting**: The line " **Table 1 – IEC 62443-4-2 certification status..." contains a leading space before the asterisk, which is a formatting inconsistency.
- **Table 2 - Source Consistency**: The "Known Exploitation" column references sources like "[CISA, 2023]" and "[Dragos, 2023]" but does not provide full citations, while other chapters are referenced (e.g., [Chapter 7]). This is an internal documentation inconsistency.