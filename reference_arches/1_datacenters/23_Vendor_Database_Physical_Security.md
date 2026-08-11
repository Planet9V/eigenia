---
tags: [tetrel, datacenter, vendors, physical-security, cameras, access-control, fire, rfid, iec62443]
created: 2026-04-29
source: Multi-source research (Perplexity, WebSearch, vendor documentation)
---

# Datacenter Vendor Database: Physical Security

*Comprehensive vendor database for Access Control, Video Surveillance, Fire Detection/Suppression, RFID Credentials, and Emergency Lighting. Cross-referenced against [[09_Datacenter_Components_and_Suppliers]].*

---

## 1. Electronic Physical Access Control (EPACS)

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Johnson Controls (JCI) | C-CURE 9000 (Software House), iSTAR controllers, Kantech | Hyperscalers (DC growth +56%), enterprise | $23.6B rev; 87K employees | $81.9B | Full-stack building security: access, fire, BMS | No major access control CVEs | No | 62443-4-1 (process); no 4-2 product cert | SIL 2 (fire/ESD only) |
| Honeywell (LenelS2) | Pro-Watch, WIN-PAK, LenelS2 (acquired from Carrier $4.95B), Morley-IAS | Government, enterprise, critical infra | $37.4B rev; ~95K employees | $137B | Broadest portfolio post-LenelS2 acquisition | ISA/IEC 62443-4-1 certified SDLC | No | 62443-4-1 (process) | None on access |
| Siemens | SiPass Integrated, Siveillance Access | Enterprise, airports, critical infra | $87.3B rev; 303K employees | $210B | First IEC 62443-2-4 for system integration (TUV SUD) | No major SiPass CVEs | No | 62443-2-4 (integration); 62443-4-1 (process) | None |
| Schneider Electric | EcoStruxure Access Expert, NetBotz | Hyperscalers, colocation | EUR 40.2B rev; 160K employees | $164B | First DCIM vendor with IEC 62443-4-2 SL-2 | CVE-2024-0568 (NetBotz, medium) | No | **62443-4-2 SL-2** (NMC3) | None |
| Genetec | Security Center, Synergis Cloud Link, ClearID | Enterprise, government, airports | ~$400-500M rev; ~2,200 employees | Private | #2 global access control software (Omdia 2025) | No major CVEs; SOC 2 compliant | No | None | None |
| HID Global (ASSA ABLOY) | iCLASS SE, SEOS, HID Signo readers, Mobile Access | Enterprise, government, DC operators | $559M rev; ~3,700 employees | Part of ASSA ABLOY ($40.7B) | Dominant credential/reader manufacturer | **Legacy iCLASS/HID Prox: trivially clonable. SEOS is hardened.** | No | None | None |
| ASSA ABLOY | Aperio wireless locks, Yale commercial, CLIQ | Hotels, enterprise, DC (cabinet locking) | SEK 152.4B (~$14.5B) rev; 63,886 employees | $40.7B | World's largest lock manufacturer | No major electronic access CVEs | No | None | None |
| Verkada | AC62 access controller, guest management, intercom | Tech companies, schools | ~$350M ARR; $5.8B valuation | Private | Cloud-native, subscription. 2M+ devices deployed. | **March 2021 breach: 150K cameras accessed (Tesla, Cloudflare). FTC $2.95M penalty (2024).** | No | None | None |

---

## 2. Video Surveillance

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Axis Communications (Canon) | AXIS P-/Q-/M-series cameras, Camera Station, Object Analytics | Datacenters, enterprise, critical infra | ~$1.6B rev; ~4,879 employees | Private (Canon) | Premium NDAA-compliant. Market leader (Western). | Strong cybersecurity posture; references IEC 62443 in SDLC | No | References 62443; no formal 4-2 cert | None |
| Hanwha Vision | Wisenet X/P/Q/A-series, Wisenet WAVE VMS, Wisenet 7/9 SoC | Government, DC, enterprise | ~$721M rev; 1,500-2K employees | Part of Hanwha Group | **Full NDAA compliance.** Own chipset. Key beneficiary of Hikvision/Dahua bans. | No major CVEs | No | None | None |
| Avigilon (Motorola Solutions) | Avigilon Unity, H5A cameras, Appearance Search | 100K+ organizations globally | Part of Motorola ($11.7B rev); 23K employees | Part of MSI ($73.1B) | AI-powered analytics leader. NDAA compliant. | No major CVEs | No | None | None |
| Milestone Systems (Canon) | XProtect VMS, BriefCam analytics, Arcules | 500K+ sites, critical infra | $348M rev; ~1,500 employees | Private (Canon) | #1 open-platform VMS. 12,000+ device integrations. | No major CVEs | No | None | None |
| Hikvision | DS-2CD series, DeepinMind, HikCentral VMS | Massive global installed base. **BANNED.** | RMB 92.5B (~$12.95B) rev; 59,689 employees | $42.4B | Largest surveillance camera mfr globally by volume | **CVE-2021-36260 (CVSS 9.8): Unauthenticated RCE, 100M+ devices. CVE-2017-7921 (CVSS 9.8): Auth bypass. NDAA Section 889 banned. FCC ban (Oct 2025).** | No | None | None |
| Dahua Technology | WizMind IPC/NVR/PTZ, DSS Pro VMS | Global installed base. **BANNED.** | $4.52B rev; 23,891 employees | $9B | #2 globally by volume | **CVE-2021-33044 (CVSS 9.8): Auth bypass via empty password hash. CVE-2021-33045 (CVSS 9.8). NDAA/FCC banned.** | No | None | None |
| Bosch Security | FLEXIDOME/DINION cameras, BVMS, IVA | Enterprise, retail, critical infra | ~EUR 2.6B (Security & Safety div) | Private | Strong analytics (IVA Pro) | No major CVEs | No | None | None |

---

## 3. Fire Detection, Alarming & Suppression

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Johnson Controls | Simplex 4100ES/4010/4020, Tyco fire suppression, Autocall | Hyperscalers, enterprise, government | $23.6B rev | $81.9B | Simplex dominant in North America for large facilities | No major CVEs on fire panels | No | 62443-4-1 (process) | **SIL 2 on ESD/fire safety** |
| Honeywell (Notifier/VESDA) | Notifier NFS2-3030, **VESDA-E** (Xtralis), System Sensor | Hyperscalers, DC. **VESDA dominant for DC early-warning.** | $37.4B rev | $137B | **VESDA is the datacenter standard for aspirating smoke detection** | No major CVEs | No | 62443-4-1 (process) | No published SIL |
| Siemens | Cerberus PRO panels, Cerberus DMS, Sinteso detectors | Enterprise, critical infra, DC | $87.3B rev | $210B | Cerberus DMS integrates fire + access + intrusion + video | No major CVEs | No | 62443-2-4 (integration) | No published SIL |
| Kidde/Edwards (Lone Star) | FM-200/Novec 1230 clean agent, Edwards EST panels | DC, telecom. **FM-200 being phased out (AIM Act).** | Sold by Carrier to Lone Star for $3B (2024) | Private | Leading clean agent suppression for DC | FM-200 environmental phase-out is operational risk | No | None | None |
| Fike Corporation | FM-200/Novec 1230, ECS-500 (500 psi), Cheetah Xi panels | DC, telecom, military | Private; est. $300-500M; ~1,500 employees | Private | High-pressure clean agent specialist | No major CVEs | No | None | None |
| Minimax | Oxeo inert gas suppression, MX panels, aspirating detection | DC, industrial, marine | Private; ~9,000 employees (Germany) | Private | European leader in DC fire suppression | No major CVEs | No | None | SIL 1-2 typical |

> [!warning] FM-200 Phase-Out
> AIM Act mandates HFC reduction, directly impacting FM-200 (HFC-227ea) installed base. Datacenters must plan migration to Novec 1230 (FK-5-1-12) or inert gas. Consulting opportunity: fire suppression migration assessment with IEC 62443 zone/conduit review.

---

## 4. RFID Key Cards & Credentials

| Vendor | Product Lines | Customers | Revenue/Size | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL Rating |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| HID Global (ASSA ABLOY) | iCLASS SE, SEOS, HID Signo, Mobile Access, Origo | Enterprise, government, DC | $559M rev; ~3,700 employees | Part of ASSA ABLOY ($40.7B) | Dominant credential/reader mfr | **Legacy HID Prox (125 kHz): trivially clonable ($20). Legacy iCLASS: key recovery attacks. SEOS is secure.** | No | None | None |
| NXP Semiconductors | MIFARE DESFire EV2/EV3, MIFARE Plus, UCODE RFID | Card manufacturers, transit, DC | $12.27B rev; ~34K employees | $51.7B | Invented MIFARE. DESFire EV3 is current secure standard. | **MIFARE Classic (1994): CRYPTO1 completely broken. Clone in seconds. DESFire EV2/EV3: no known weaknesses.** | No | **SE050: 62443-4-2 SL-3** | None |
| Shanghai Fudan Micro | FM11RF08, FM11RF08S (MIFARE Classic clones) | Budget card mfrs, hotels globally | RMB 3.59B (~$500M); 1-5K employees | ~$6.5B | Chinese MIFARE Classic clone manufacturer | **Hardware backdoor in FM11RF08S (Quarkslab, Aug 2024): single static key allows instant cloning of ALL cards. Affects millions worldwide.** | No | None | None |
| IDEMIA | ID-One PIV cards, MorphoWave, VisionPass | US federal PIV, airports, enterprise | Private; ~$3B rev; ~15K employees | Private | Government-grade biometric identity. First FIPS 140-3 Level 2 (Jul 2025). | No major CVEs; FIPS 140-3 validated | No | None | None |
| Suprema | BioStation 3, CoreStation, BioStar 2, FaceStation F2 | Enterprise, government | ~$150M rev; ~500 employees | ~$500M | Biometric access specialist | **BioStar 2 breach (2019): 1M+ fingerprints and facial recognition data exposed** | No | None | None |

> [!warning] Legacy Credential Risk
> Any datacenter using 125 kHz HID Prox, MIFARE Classic, or Fudan FM11RF08/S cards has a critical physical security vulnerability. These are clonable in seconds with $20 tools. Recommend migration to MIFARE DESFire EV3, HID SEOS, or HID Mobile Access.

---

## Certification Gap Summary

| Category | IEC 62443-4-2 Product Certs | OCP S.A.F.E. | SIL Ratings |
|:---|:---|:---|:---|
| EPACS | Schneider NMC3 (SL-2) only | None | JCI SIL 2 (ESD only) |
| Video Surveillance | None | None | None |
| Fire Detection/Suppression | None (process certs only) | None | SIL 1-2 typical for suppression release |
| RFID/Credentials | NXP SE050 (SL-3) | None | None |
| Emergency Lighting | None | None | None |

**Research conducted April 29, 2026.**
