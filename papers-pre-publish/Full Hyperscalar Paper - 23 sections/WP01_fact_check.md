# Fact-Check Report: WP01
Model: xiaomi/mimo-v2.5
Date: 2026-06-14T19:49:56.024511

# Fact-Check Report: WP01 Chapter 1 Content vs. Research Data

## CONFIRMED
*Claims verified by research data*

1. **UPS Vendor Certifications (Section 2.2, Table 1.3):**
   - Schneider Electric NMC3 AP9641/AP9643 IEC 62443-4-2 SL-2 certified (TÜV Rheinland) ✅ Confirmed by Research Section 2.1
   - Vertiv IntelliSlot RDU120 IEC 62443-4-2 certification ✅ Confirmed by Research Section 2.2 (applies to communication card only)
   - Eaton Gigabit Network Card/Industrial Gateway Card IEC 62443-4-2 certification ✅ Confirmed by Research Section 2.3

2. **Power Conversion Electronics Uncertified (Section 2.2):** The chapter correctly notes that UPS power conversion stages (rectifiers, inverters, battery management) hold no IEC 62443-4-2 certification. ✅ Supported by Research Cross-Cutting Note.

3. **48V DC Power Shelf Specifications (Section 2.3):** Delta HPR 33kW ORv3 power shelf details match Research Section 1.1 specifications. ✅ Confirmed.

4. **ATS Certification Gap (Section 2.4):** No ATS product holds IEC 62443-4-2 certification. ✅ Confirmed by Research Sections 3.1-3.3 (no certifications listed).

5. **Generator Controller Interfaces (Section 2.5):** Woodward easYgen-3500XT and ComAp InteliGen NT support Modbus RTU/TCP, confirming Modbus/IP exposure. ✅ Confirmed by Research Sections 5.1-5.2.

6. **Protection Relay Protocols (Section 2.1):** Siemens SIPROTEC and SEL relays support concurrent IEC 61850 with Modbus TCP/DNP3. ✅ Confirmed by Research Sections 4.1-4.2.

7. **OCP ORv3 48V DC Standard (Section 2.3):** Delta Electronics OCP-compliant power shelf exists. ✅ Confirmed by Research Section 1.1.

## CONTRADICTIONS
*Direct conflicts between chapter and research*

1. **Abstract "Fewer than 10 products" Claim:**
   - **Chapter:** "fewer than 10 products across 200+ vendors in 18 categories hold any cybersecurity certification"
   - **Research:** Lists at least 6 distinct certified components from 3 vendors (Schneider NMC3, Vertiv RDU120, Eaton Gigabit/Industrial Gateway cards, Schneider EBO - mentioned in CVE section). This contradicts "fewer than 10 products." **Potential fabrication or outdated data.**

2. **Vertiv Certification Year:**
   - **Chapter Table 1.3:** Lists Vertiv certification as "(2025)"
   - **Research:** No specific year provided for Vertiv certification. **Unsupported date.**

3. **Eaton Certification Scope:**
   - **Chapter:** Implies certification applies to entire UPS ("SL-2 certified")
   - **Research:** Clarifies certification applies only to communication cards, not power electronics. **Misleading scope in chapter.**

## GAPS
*Research data not integrated into chapter*

1. **Eaton UL 2900-1 Certification:** Research shows Eaton cards hold UL 2900-1 certification alongside IEC 62443-4-2. Chapter omits UL certification. **Missing compliance information.**

2. **Schneider ISASecure SDLA:** Research notes Schneider NMC3 development is ISASecure SDLA compliant. Chapter omits this process certification. **Missing development process certification.**

3. **Specific Model Numbers:**
   - Research provides specific model numbers for protection relays (Siemens SIPROTEC 5 7SJ/7SA/7SD, SEL-400 series/SEL-735, ABB Relion 670). Chapter mentions families but not specific models. **Missing granularity.**

4. **Transfer Time Details for ATS:**
   - Research provides specific transfer times (ASCO 7000: <100ms open transition, LayerZero eSTS: 2-4ms). Chapter only mentions "millisecond-level." **Missing specific performance data.**

5. **Generator Controller Specifics:**
   - Research details Woodward easYgen-3500XT Modbus register maps and ComAp InteliGen NT protocols. Chapter only mentions Modbus/IP generically. **Missing implementation details.**

6. **Medium Voltage Switchgear Specifications:**
   - Research provides detailed specs for Hitachi GIS (voltage range up to 1,200 kV), Siemens NXPLUS C (up to 36 kV), and Schneider PIX. Chapter only mentions vendors generically. **Missing technical specifications.**

## UNVERIFIABLE
*Claims without supporting evidence in research*

1. **CDU Certification Status (Abstract):** Chapter claims "CDU has zero certified products from any vendor." Research brief does not cover cooling infrastructure or CDU certifications. **Cannot verify.**

2. **"200+ vendors in 18 categories" (Abstract):** No research data supports this specific count. **Unsupported claim.**

3. **Design Parameter "Six Nines" Availability (Table 1.2):** No research data verifies 99.9999% availability claim for the described design. **Industry standard claim without specific verification.**

4. **"Contemporary hyperscale design" practices (Section 1):** Chapter claims design reflects Microsoft, Google, Meta, AWS practices. No research data confirms this specific design represents those operators' actual architectures. **Unverified claim.**

## CORRECTIONS
*Specific errors identified*

1. **Vendor Listing Inconsistency (Section 2.1):**
   - **Chapter:** Lists "GE Multilin" as a protection relay vendor
   - **Research:** Only covers Siemens SIPROTEC, SEL-400 series, and ABB Relion 670. GE Multilin not mentioned. **Potential error or missing research.**

2. **Table 1.3 Format Error:**
   - **Chapter:** Lists Eaton certification as "SL-2 certified (UL Solutions, Jan 2020)"
   - **Research:** Eaton certifications are for Gigabit Network Card and Industrial Gateway Card, not specified as SL-2, and certifying body not specified as UL Solutions. **Incorrect certification level and certifier attribution.**

3. **LayerZero eSTS Classification (Section 2.4):**
   - **Chapter:** Lists "LayerZero (eSTS)" under ATS category
   - **Research:** LayerZero eSTS is specifically a Static Transfer Switch (STS), not an Automatic Transfer Switch (ATS). **Misclassification.**

4. **ABB Product Line (Section 2.1):**
   - **Chapter:** Lists "ABB" as protection relay vendor under "Siemens SIPROTEC / SEL-700"
   - **Research:** ABB/Hitachi Energy Relion 670 is a separate product line from Siemens SEL-700. **Incorrect grouping in chapter figure.**

5. **Generator Control Interface (Section 2.5):**
   - **Chapter:** "Generator Electronic Control Units (ECUs) expose Modbus/IP interfaces"
   - **Research:** Woodward easYgen-3500XT supports multiple protocols including Ethernet, CAN, RS-485, USB. **Oversimplification; Modbus is not the only IP-exposed protocol.**