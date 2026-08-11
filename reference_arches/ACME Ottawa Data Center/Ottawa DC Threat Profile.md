---
aliases: [ACME Threat Actors, ACME Kill Chains]
type: facility-reference-model
category: data-center
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-datacenter, phase/1c, threat-intelligence, att-ck, kill-chains, cyber]
related: ["[[ACME Ottawa Data Center]]", "[[Ottawa DC HAZOPS]]", "[[Ottawa DC CVE Cross-Reference]]"]
created: 2026-05-09
updated: 2026-05-09
---

# Ottawa DC Threat Profile

> **Demo overlay**: ACME is a fictional federal-tenant colocation facility in Ottawa. This threat model reflects real TTPs against Canadian-federal-aligned cloud infrastructure as of 2026.

## Nation-State Adversaries & ATT&CK Groups

### Tier 1: Persistent Pre-Positioning (Strategic Threat)

**[[Volt Typhoon]]** (China-nexus, [[MANDIANT]]/[[CISA]])
- **Campaign**: Multi-year pre-positioning in critical US/Canadian infrastructure
- **Objective**: Long-dwell access for potential disruptive campaigns (power overspeed, water treatment sabotage)
- **ACME Relevance**: Federal tenant co-located; high-value espionage + pre-staging target
- **TTPs**: T1199 Trusted Relationship, T1078 Valid Accounts, T1070 Indicator Removal
- **Kill Chain Entry**: Remote support vendor ([[Cisco]] TAC, [[Vertiv]] FieldCare) → Hypervisor layer → Tenant VM escape

**[[Salt Typhoon]]** (China-nexus, telecom-focused)
- **Objective**: Telecom supply-chain compromise; pivot to federal agencies via carrier networks
- **ACME Relevance**: If facility uplink is via Shaw Telecommunications or [[Bell Canada]], threat is direct
- **TTPs**: T1584 Compromise Infrastructure, T1199 Trusted Relationship
- **Kill Chain Entry**: ISP uplink edge device → Facility border firewall (if misconfigured [[BGP]]/OSPF)

**[[APT29]] / [[Cozy Bear]]** (Russia-SVR, espionage-focused)
- **Objective**: Long-term intelligence gathering; zero-days against Windows [[Active Directory]]/Exchange
- **ACME Relevance**: Federal tenants' AD trusts, email systems, SBOMs attractive
- **TTPs**: T1190 Exploit Public-Facing App, T1098 Account Manipulation, T1530 Data from Cloud Storage
- **Kill Chain Entry**: Spearphishing federal tenant → WinRM/RDP → Lateral to shared storage

**[[Sandworm]]** (Russia-GRU, destructive)
- **Objective**: Disruptive attacks (power grid sabotage, BMS destruction)
- **ACME Relevance**: Federal datacenter with [[ICS]]/[[SCADA]] tenant workloads; extremely high-value target
- **TTPs**: T1485 Data Destruction, T1565 Data Manipulation, T1499 Endpoint DoS
- **Kill Chain Entry**: Compromised managed-service account ([[Schneider Electric]] Connected Services) → BMS Ethernet access → Firmware downgrade

**[[APT41]]** (China dual-purpose, espionage + financially motivated)
- **Objective**: IP theft, ransomware-as-a-service payloads
- **ACME Relevance**: Federal IP, customer SBOMs, cryptographic material
- **TTPs**: T1195 Supply Chain Compromise, T1496 Resource Hijacking
- **Kill Chain Entry**: [[BGP]] hijack or compromised device supplier → facility edge → tenant compute

---

### Tier 2: Ransomware & Criminal Groups

**[[BlackCat]] / [[LockBit]]** (Russian-aligned criminal syndicate)
- **Objective**: Financial extortion, double-extortion (steal + encrypt)
- **ACME Relevance**: Tenant [[SCADA]] backup drives, confidential government research
- **TTPs**: T1190 Exploit Public-Facing App, T1570 Lateral Tool Transfer, T1486 Data Encrypted for Impact
- **Kill Chain Entry**: Phishing → Initial compromise → 90-day dwell → Full estate encryption

**[[NONAME057]] / [[KillNet]]** (Russia-aligned hacktivist DDoS collective)
- **Objective**: Geopolitical disruption, propaganda
- **ACME Relevance**: Canadian federal facilities = soft target for DDoS noise
- **TTPs**: T1499 Endpoint Denial of Service (volumetric L3/L4 floods on facility uplink)
- **Kill Chain Entry**: Botnet amplification → ISP edge → Facility border

---

## Kill Chains (Detailed)

### Kill Chain 1: Vendor Remote Support Compromise → Hypervisor Escape

```
Volt Typhoon → Cisco TAC Remote Session (T1199)
           ↓
Hypervisor SSH backdoor (T1547 Boot or Logon Autostart Execution)
           ↓
Guest VM escape (CVE-2024-xxxx in qemu/KVM or ESXi)
           ↓
Tenant filesystem access
           ↓
Exfiltration of SBOM, firmware, certificates
```

**Mitigations**:
- Disable SSH/console access; mandate out-of-band authentication (PIV card, U2F)
- Vendor sessions gated behind PAM (privileged access mgmt) appliance with recording
- Hypervisor isolation: strict VLAN enforcement, no cross-tenant connectivity
- CVE patch cadence: critical patches within 48h of release

### Kill Chain 2: DCIM Portal RCE → BMS Manipulation → Disruptive Sabotage

```
APT29 → Spearphish facility admin (T1566)
     ↓
DCIM portal credential harvesting
     ↓
Barracuda ESG RCE or [[Juniper]] ScreenOS hardcoded backdoor (T1190)
     ↓
BMS Modbus tunnel via facility mgmt network (T1570)
     ↓
Firmware downgrade on PDUs, CRAC units (T1601 Modify System Image)
     ↓
Power overspeed → thermal runaway → facility shutdown
```

**Mitigations**:
- DCIM portal: require MFA (TOTP + PIV), IP allowlist (facility mgmt subnet only)
- BMS network: air-gapped from facility mgmt; serial-only control links
- Firmware: signed with ECDSA; reject downgrades
- Monitoring: Modbus/DNP3 anomaly detection on current/voltage sensors

### Kill Chain 3: Supply-Chain Firmware Backdoor → Long-Dwell Access

```
Salt Typhoon / Vendor CCO → Compromise Cisco Catalyst firmware release
                       ↓
Facility orders switches with pre-loaded BGP hijack payload
                       ↓
Switch joins fabric; announces alternate ISP prefix to attract traffic
                       ↓
Silently reroutes facility uplink via attacker-controlled border router
                       ↓
All tenant traffic monitored; decryption attempted via zero-day TLS
```

**Mitigations**:
- Hardware supply-chain: trusted foundry program (US-only CPU sourcing where possible)
- Firmware signature verification: [[SBOM]] for all network gear
- [[BGP]]: [[RPKI]] ROA validation on all edge routers; reject unsigned announcements
- Span/mirror: facility egress mirror to IDS for anomaly detection

### Kill Chain 4: Compromised Managed-Service Account → BMS Takeover → Destruction

```
Sandworm → Spearphish Schneider Remote Technician (T1566)
        ↓
Golden ticket forgery (T1558) in facility's AD
        ↓
Schneider Connected Services account takeover (T1078 Valid Accounts)
        ↓
Firmware downgrade on APC Symmetra UPS (T1601)
        ↓
Disable automatic transfer switch (ATS) logic
        ↓
Generator mains cross-connection → electrical cascade failure
```

**Mitigations**:
- BMS isolation: UPS/PDU/CRAC not joined to facility AD; local authentication only
- Credential rotation: biweekly for all vendor remote-access accounts
- Backup: daily firmware extraction to offline USB; verify signatures
- Monitoring: alert on firmware upload attempts; cross-reference with change-mgmt calendar

---

## Supply-Chain Compromise Scenarios

**SolarWinds (Orion) in DCIM Stack**
- Compromise DCIM → auto-deploy malicious payload to all managed switches/UPS
- Mitigation: Air-gap Orion updates; manual manifest review; disable auto-deployment

**Kaseya VSA Backdoor ([[REvil]])**
- Compromise MSP's VSA instance → lateral move to tenant [[Active Directory]] → domain admin
- Mitigation: MSP compliance audit ([[SOC2]] Type II); network segmentation between MSP tunnel and facility core

**MOVEit / Cl0p Ransomware**
- File transfer RCE → exfil tenant SBOMs + crypto → double-extortion ransom
- Mitigation: Disable MOVEit; use SFTP with key-based auth; YARA malware scanning

**3CX Supply-Chain ([[DPRK]] [[Lazarus]] Link)**
- Compromised 3CX installer → facility IT workstation takeover → lateral move
- Mitigation: Vendor security posture assessment; immutable deployment (container image hash validation)

---

## Remote Access Vectors & Vendor Risk

| Vendor | Service | Access Method | Risk | Mitigation |
|--------|---------|---------------|------|-----------|
| [[Cisco]] | [[TAC]] Remote Session | SSH/RDP tunneling | Hypervisor compromise | PAM recording, PIV auth, session timeout 15 min |
| [[Vertiv]] | FieldCare | VPN + Out-of-band authentication | UPS firmware compromise | Offline firmware backup, signature verification |
| [[Schneider Electric]] | Connected Services | Service account in AD | BMS takeover | Local auth only, no AD join, credential rotation biweekly |
| Pure | Cloud Mediator | HTTPS tunnel to cloud | Storage data exfil | TLS cert pinning, egress filtering |
| [[VMware]] | Skyline | HTTPS + API key | Hypervisor visibility | API key rotation monthly, rate-limiting on API calls |

---

## ATT&CK Technique Grouping

**T1190: Exploit Public-Facing Application** → High-risk assets: [[Cisco]] UCS/Nexus, [[Palo Alto Networks]] PA-5450, [[APC]] NMC2  
**T1199: Trusted Relationship** → Affected: [[Cisco]] [[TAC]], [[Vertiv]] FieldCare, Pure Cloud, [[Schneider Electric]]  
**T1078: Valid Accounts** → Targets: [[Active Directory]], iLO/iDRAC, [[APC]] default creds, vCenter SSO  
**T1485: Data Destruction** → Critical: UPS, BMS, PDU, CRAC firmware manipulation  
**T1565: Data Manipulation** → DCIM sensor spoofing, false environmental alerts  
**T1530: Data from Cloud Storage** → NetApp AFF, Pure FlashArray, [[Dell]] PowerStore backups  
**T1070: Indicator Removal** → Syslog, SNMP traps, NetFlow wipe post-compromise  
**T1098: Account Manipulation** → [[Active Directory]] computer objects, golden tickets  
**T1496: Resource Hijacking** → Tenant GPU/high-compute instances, cryptojacking  
**T1499: Endpoint DoS** → Modbus/DNP3 conduit flooding, SNMP trap storms

---

## Cross-References

- [[Ottawa DC HAZOPS]] (cyber-physical convergence risks)
- [[Ottawa DC CVE Cross-Reference]] (exploit availability, EPSS scores)
- [[Ottawa DC Supply Chain]] (geopolitical threat context)

---

**Doc Version**: 1.0 | **Phase**: 1c | **Last Updated**: 2026-05-09
