# Datacenter Components & GTM Sales Targeting

| Key Component | Equipment Type | Functional Category | Security & Compliance Standards | Service Providers | GTM Sales Targeting & Product Fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Programmable Logic Controllers (PLCs) | Embedded Device / Industrial Computing | Industrial Control / Energy / Monitoring | IEC 62443-4-2, IEC 62443-4-1, NIS2 | Siemens, Schneider Electric, ABB, Rockwell Automation | **Tier 2 (Supplier Gap):** Target for firmware security validation to hit SL-3/4. |
| Building Management Systems (BMS) | Automation controllers / HVAC Facility Control | HVAC / Cooling / Facility Management | IEC 62443 SL2, SL-3/SL-4 | Honeywell, Johnson Controls (Metasys), Siemens (Desigo CC), Schneider | **Tier 1b (Brownfield) / Tier 2:** JCI & Siemens are targets to push from SL2 to SL-3 via OCP S.A.F.E. |
| Cooling Systems | Precision Units (CRAH, CRAC), Chilling Units | Cooling | IEC 62443, SL-3/SL-4 | Stulz, Vertiv, Rittal, Schneider Electric | **Tier 2:** Vertiv & Schneider are prime targets for dual-certification sprints (CRA readiness). |
| Liquid Cooling | Cold plates, CDUs, Immersion tanks | Cooling / HVAC | Emerging | CoolIT Systems, Asetek, Schneider Electric, LiquidStack | **Tier 1a / Tier 2:** High-value target given AI heat density; requires strict firmware checks on CDUs. |
| Heat Rejection Systems | Evaporative fluid coolers, Dry coolers | Cooling / HVAC | | BAC, Evapco, Aidear | Monitor for firmware reliance. |
| Power Systems | Redundant Power Inputs/Supplies, PDUs | Energy / Power | IEC 62443-3-3, SL-3/SL-4 | Fortinet, ABB, Schneider Electric, Vertiv, Eaton | **Tier 2:** Target Vertiv and Eaton for unified OCP S.A.F.E. & 62443 audits. |
| Uninterruptible Power Supply (UPS) | Power Conditioning / Modular UPS / Cards | Power / Energy | IEC 62443-4-2 (Security Level 2) | ABB, Vertiv, Schneider Electric, Eaton, Delta | **Tier 2:** Critical for dual-certification. Microsoft mandate directly impacts UPS network cards. |
| Backup Generation | Diesel/Natural Gas Generators, Gas Turbines | Power Distribution (Emergency) | | Caterpillar, Cummins, Rolls-Royce, GE Vernova | Lower priority unless requested by hyperscaler. |
| Substation Systems | Gas-Insulated Switchgear (GIS), Transformers | Power Distribution | | Siemens Energy, ABB, Hitachi Energy, GE Vernova | **Tier 1b:** Typically assessed during facility-level architecture reviews. |
| Electrical Distribution | Circuit breakers, Remote power panels, ATS | Power | | ABB, Starline | **Tier 1b:** Facility-level assessment. |
| Electronic Physical Access and Control | IACS components, Sensors, Actuators | Physical Security / Automation | IEC 62443, NIS2, SOCI | Johnson Controls, Honeywell, Schneider, Siemens | **Tier 1b / Tier 2:** Important for holistic facility security. |
| Physical Security Systems | Surveillance and intrusion detection hardware | Physical Security / CCTV | IEC 62443, SL-3/SL-4 | Fortinet, Johnson Controls, Honeywell, Siemens | **Tier 2:** Component gap analysis for camera firmware. |
| Data Center Video Surveillance | Network-based Video Surveillance Cameras | Physical Security | IEC 62443 | Fortinet | |
| Fire Detection and Alarming | Fire detection and suppression systems | Physical Security / Safety | IEC 62443, SL-3/SL-4 | Johnson Controls, Honeywell, Siemens | **Tier 2:** Safety-critical; target for hazard log review. |
| RFID Key Cards | Electronic Physical Access Control | Physical Security | MIFARE Classic | Shanghai Fudan Microelectronics, NXP | |
| Emergency Lighting / Infrastructure | Electrical/Electronic systems | High/Low Voltage | IEC 61508 | | |
| Network Gateways | Network Device / Unidirectional Gateways (UGW)| Energy / Data Transfer | IEC 62443-4-2 | Cisco, Moxa, Hirschmann | **Tier 2:** High priority for firmware code review (Whitebox). |
| Network Boundary Protection | Firewalls / Network Security Hardware | Network Security (Access Control) | IEC 62443, IEC 62443-4-2 | Cisco, Fortinet | |
| Networking Infrastructure | Leaf/Spine/Core Switches, Routers | Networking / Digital Infrastructure | IEC 62443, ISA/IEC 62443-4-2 | Arista Networks, Cisco, Moxa | **Tier 2:** Target for unified audits given intersection with OCP S.A.F.E. |
| Datacenter Hardware and Firmware | Embedded systems, CPUs, GPUs, BIOS | Data Infrastructure / Security | OCP S.A.F.E., IEC 62443-4-1/2 | AMI, AMD, Intel, Microsoft, Google, Meta | **Tier 2:** Core OCP S.A.F.E. target. |
| Storage Solutions | NVMe PCIe SSD, HDD, IP Block for SoCs | Digital Infrastructure / Storage | OCP S.A.F.E., FIPS 140-3, Caliptra | SK hynix, Samsung, Dell, Google, Microsoft | **Tier 2:** Captive market via Microsoft OCP mandates. |
| Host Devices / Industrial PCs | Operator Workstations, Servers | Physical & Digital Infrastructure | ISA/IEC 62443-4-2 | Intel | |
| Hardware Security Modules | Trusted Platform Module (TPM), Root of Trust | Electronic Physical Access / Security | TCG TPM2.0, FIPS 140-2, Caliptra | Intel, CHIPS Alliance | **Tier 2:** Caliptra audits. |
| Backup and Recovery | Backup Software / Data Protection Platform | Energy / Data Centers | IEC 62443, FIPS 140-3, NIS2, GDPR | Bacula Systems | |
| Infrastructure Management | DCIM Software | Facility Management | | Schneider, Vertiv, Sunbird, Nlyte | **Tier 1b:** Critical target during brownfield architecture reviews. |
| Embedded Devices | Wired/wireless sensors, actuators, IEDs | Industrial Control / HVAC / Monitoring | ISA/IEC 62443-4-2 | | **Tier 2:** Component-level assessments. |
| Industrial Control Systems (ICS) | IACS Components / Control Infrastructure | Energy / Infrastructure | ISA/IEC 62443-4-2, NIS2 | Moxa, Cisco, Honeywell | **Tier 2:** High priority. |
| Baseboard Management Controllers (BMC)| Embedded Hardware Control | Industrial Control | OCP S.A.F.E. | OpenBMC | **Tier 2:** Core OCP target. |