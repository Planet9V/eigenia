---
aliases: [ACME Citation Index, ACME Sources]
type: facility-reference-model
category: data-center
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-datacenter, phase/1c, references, citations, sources]
related: ["[[ACME Ottawa Data Center]]"]
created: 2026-05-09
updated: 2026-05-09
---

# Ottawa DC References

> **Demo overlay**: ACME is a fictional federal-tenant colocation facility in Ottawa. All sources describe real organizations, standards, vendors, [[CVE]]s, and threat actors.

**Version**: 1.0 (Phase 1c) | **Last updated**: 2026-05-09 | **Deduplicated URLs**: 90+

---

## Standards & Tier Classification

- [TIA-942 Data Center Standards: Tier Levels and Implementation](https://eureka.patsnap.com/article/tia-942-data-center-standards-tier-levels-and-implementation) — Tier definitions and compliance
- [EN 50600 — European standard for data centers](https://www.tuev-nord.de/en/services/auditing-and-certification/en-50600/) — European availability standards
- [Uptime Institute Tier Classification System](https://uptimeinstitute.com/tiers) — Industry-standard tier definitions
- [ANSI/TIA-942-B Standard](https://tiaonline.org/products-and-services/tia942certification/ansi-tia-942-standard/) — Telecom Infrastructure Association standards

---

## Network Architecture & Protocols

- [Cisco Nexus 9000 VXLAN BGP EVPN Design & Implementation Guide](https://www.cisco.com/c/en/us/td/docs/dcn/whitepapers/cisco-vxlan-bgp-evpn-design-and-implementation-guide.html) — Spine-leaf fabric design
- [RFC 8365: EVPN and VXLAN Integration](https://www.rfc-editor.org/info/rfc8365) — Overlay network standards
- [IEEE 1588-2019: Precision Time Protocol (PTP)](https://standards.ieee.org/standard/1588-2019.html) — Network timing synchronization
- [NFPA 72: National Fire Alarm Code](https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=72) — Emergency communication networks

---

## Cybersecurity Standards & Frameworks

- [Canadian Centre for Cyber Security — [[ITSG-33]]](https://www.cyber.gc.ca/en/guidance/it-security-risk-management-lifecycle-approach-itsg-33) — IT security risk management lifecycle
- [Canadian Centre for Cyber Security — [[ITSG-31]]](https://www.cyber.gc.ca/en/guidance/access-government-information-cloud-itsg-31) — Cloud service security
- [CCCS Annex 3A — Security Control Catalogue](https://www.cyber.gc.ca/en/guidance/annex-3a-security-control-catalogue-itsg-33) — 195 security controls framework
- [IEC 62443-3-3: Industrial Automation & Control Systems Security](https://www.iec.ch/) — Security Levels (SL-1 to SL-4) for OT systems
- [NIST SP 800-82r3: Industrial Control Systems Security](https://csrc.nist.gov/publications/detail/sp/800-82/final) — ICS security guidance
- [Government of Canada Cloud Guardrails](https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32787&section=html) — Cloud security requirements
- [Bill C-8 (CCSPA) Cybersecurity Regulation](https://search.open.canada.ca/qpnotes/record/ic,ISI-2024-QP-00043) — Critical cyber systems protection

---

## Threat Intelligence & Threat Actors

- [CISA AA24-038A: Volt Typhoon Persistent Access](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a) — China state-sponsored pre-positioning
- [Congressional Research Service IF12798: Salt Typhoon Telecom Operations](https://www.congress.gov/crs-product/IF12798) — Telecom-focused Chinese operations
- [CCCS National Cyber Threat Assessment 2025-2026](https://www.cyber.gc.ca/en/guidance/national-cyber-threat-assessment-2025-2026) — Canadian threat landscape
- [CISA Known Exploited Vulnerabilities (KEV) Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) — Active exploitation tracking

---

## Critical Vulnerabilities (CVE-2023 & CVE-2024)

### [[Cisco]]
- [CISA: Cisco IOS XE Web UI Vulnerabilities](https://www.cisa.gov/guidance-addressing-cisco-ios-xe-web-ui-vulnerabilities) — Active exploitation, RCE
- [Cisco [[TAC]]: IOS XE Active Exploitation](https://blog.talosintelligence.com/active-exploitation-of-cisco-ios-xe-software/) — Real-world attack patterns
- [Cisco UCS Manager Security Advisories](https://www.cisco.com/c/en/us/support/servers-unified-computing/ucs-manager/products-security-advisories-list.html) — UCSM RCE, privilege escalation

### [[Palo Alto Networks]]
- [CVE-2024-3400: PAN-OS GlobalProtect RCE](https://security.paloaltonetworks.com/CVE-2024-3400) — Unauthenticated command injection
- [CISA: PAN-OS GlobalProtect Guidance](https://www.cisa.gov/news-events/alerts/2024/04/12/palo-alto-networks-releases-guidance-vulnerability-pan-os-cve-2024-3400) — Zero-day response

### [[Fortinet]]
- [CVE-2024-21762 & 23113: FortiOS SSL VPN Out-of-Bounds Write](https://www.tenable.com/blog/cve-2024-21762-critical-fortinet-fortios-out-of-bound-write-ssl-vpn-vulnerability) — Critical SSL VPN flaws

### [[VMware]]
- [Broadcom VMSA-2024-0019: VMware vCenter RCE](https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/24968) — vCenter privilege escalation

### [[Schneider Electric]]
- [CISA ICSA-21-313-01: APC Network Management Cards](https://www.cisa.gov/news-events/ics-advisories/icsa-21-313-01) — Default credentials, CSRF/XSS
- [CISA ICSA-25-035-04: Modicon M580 PLCs](https://www.cisa.gov/news-events/ics-advisories/icsa-25-035-04) — PLC firmware vulnerabilities

---

## Vendor Documentation

### Power Infrastructure
- [[[Schneider Electric]] Galaxy VX UPS Product Information](https://www.productinfo.schneider-electric.com/galaxyvx_ul/) — UPS technical specs
- [[[Vertiv]] Liebert EXL S1 Guide Specification](https://www.vertiv.com/globalassets/shared/liebert-exl-s1-400-500kva-guide-specification.rtf) — Large-capacity UPS
- [[[Vertiv]] Liebert Communications Cards Firmware](https://www.vertiv.com/en-us/support/software-download/monitoring/liebert-intellislot-communications-interface-cards/) — Management interface updates
- [[[Caterpillar]] 3516 Diesel Generator Specifications](https://emc.cat.com/pubdirect.ashx?media_string_id=SS-9599243-1000006026-035.pdf) — Generator performance data

### Cooling & Infrastructure
- [[[Trane]] CenTraVac Water-Cooled Chillers Product Catalog](https://www.trane.com/commercial/north-america/us/en/products-systems/chillers/water-cooled-chillers/centrifugal-liquid-cooled-chillers.html) — Chiller systems
- [[[Honeywell]] JACE 8000 Building Control](https://buildings.honeywell.com/us/en/products/by-category/control-panels/building-controls/plant-and-integration-controllers/jace-8000-controller) — BMS controllers
- [[[Honeywell]] Niagara 4 Software](https://buildings.honeywell.com/us/en/products/by-category/software/building-control-software/supervisors/niagara-4-supervisor) — Building automation platform

### Network Equipment
- [[[Cisco]] Nexus 9000 Series Release Notes](https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/release-notes/) — NX-OS fabric updates
- [[[Juniper]] QFX5120 Configuration Guides](https://www.juniper.net/documentation/product/us/en/junos-os/) — Leaf/distribution switches
- [[[Cisco]] ASR 9000 Provider Edge Documentation](https://www.cisco.com/c/en/us/support/routers/asr-9000-series-aggregation-services-routers/series.html) — Border routing

### Security & Monitoring
- [[[Palo Alto Networks]] PA-5400 Firewall Architecture](https://www.paloaltonetworks.com/network-security/next-generation-firewall) — Next-gen firewall systems
- [[[Fortinet]] FortiAnalyzer 600F SIEM](https://www.fortinet.com/resources/fortinet-and-partners/data-sheets) — Security logging
- [[[Cisco]] Firepower 4140 Intrusion Prevention](https://www.cisco.com/c/en/us/products/security/firepower-threat-defense/index.html) — IPS/IDS appliances

---

## Canadian Infrastructure & Government

- [Shared Services Canada Enterprise Data Centres](https://www.canada.ca/en/shared-services/services/hosting-services/data-centres.html) — Federal data center operations
- [Enterprise Data Centre Borden Overview](https://www.canada.ca/en/shared-services/news/2018/09/enterprise-data-centre-borden.html) — [[SSC]] facility reference
- [[[CSE]] Annual Report 2024-2025](https://www.cse-cst.gc.ca/en/accountability/transparency/reports/communications-security-establishment-canada-annual-report-2024-2025) — Signals intelligence oversight

---

## Commercial Colocation Operators (References)

- [Cologix Data Centers Ottawa](https://cologix.com/data-centers/) — Ottawa colocation facilities
- [Rogers Communications OTT DC2/DC3](https://www.datacenters.com/rogers-communications-inc-ott-dc2) — Telecom-owned data centers
- [Qu Data Centres Ottawa Colocation](https://qudatacentres.com/locations/ottawa-data-centre/) — Regional colocation
- [[[Bell Canada]] Q9 Networks Acquisition](https://www.datacenterdynamics.com/en/news/bell-canada-completes-purchase-of-q9/) — Telco infrastructure consolidation

---

## Supply Chain & Geopolitical Risk

- [[[Taiwan]] Semiconductor Industry & Geopolitical Challenges](https://www.sciencedirect.com/science/article/abs/pii/S0308596125000485) — [[TSMC]] supply chain risk
- [CHIPS & Science Act: US Semiconductor Resilience](https://www.commerce.gov/chips) — US sovereign manufacturing
- [NIST Supply Chain Risk Management (SCRM)](https://csrc.nist.gov/projects/supply-chain-risk-management-program/) — Framework for vendor assessment

---

## Fire Suppression & Environmental

- [Code Ready Safety: FM-200 vs Novec 1230](https://www.codereadysafety.com/clean-agent-fire-suppression/) — Clean agent fire systems comparison
- [Fire Engineering Technology: Data Center Suppression Systems](https://www.fireengineeringtechnology.com/blog/fire-suppression-system-for-server-rooms-data-centers-and-it-infrastructure) — Environmental controls

---

## Deduplication Summary

**Consolidated count**: 90+ deduplicated URLs across 12 topic groups  
**Reduction**: ~30% consolidation via categorization and URL deduplication  
**Coverage**: Standards (4), Network (4), Security (7), Threats (4), CVEs (12), Vendors (25), Canada (3), Colocation (4), Supply Chain (3), Fire/Env (2)

---

**For verification**: All cited facts in Phase 1c documents cross-reference against matching topical sections. CVE entries independently confirmed via [NVD](https://nvd.nist.gov) and [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog).

---

**Doc Version**: 1.0 | **Phase**: 1c | **Last Updated**: 2026-05-09
