---
aliases: [ACME Ottawa Threat Profile, Threat Actors, Kill Chain]
type: facility-reference-model
category: electrical-transmission-distribution
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-substation, phase/1c, sector/electrical, org/acme-demo, threat, APT]
related: ["[[ACME Ottawa Substation]]", "[[Ottawa Substation Network]]", "[[Sandworm]]", "[[Volt Typhoon]]", "[[APT33]]", "[[Predatory Sparrow]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Ottawa Substation Threat Profile

> **Demo Overlay**: ACME Ottawa is a fictional asset for demonstration. Threat actors, attack vectors, and organizational structures are illustrative for training and capability showcase.

---

## Primary Threat Actors

### [[Sandworm]] (Russia-GRU) — Energy Sector APT

**Known Tactics**:
- [[Industroyer2]] / CRASHOVERRIDE: Targets [[IEC 60870-5-104]] and [[IEC 61850]] protocols
- 2022 Ukraine power grid attack via compromised update channels
- December 2025: Detected wiper malware on Polish wind/solar farms + power plants

**Threat to ACME**:
- [[GOOSE]] (Generic Object Oriented Substation Event) injection on [[IEC 61850]] station bus
- Relay/protection scheme manipulation (unauthorized command messages)
- Engineering workstation compromise leading to PLC program modification

---

### [[Volt Typhoon]] (China-nexus) — Living Off The Land (LOTL)

**Known Tactics** (per [[CISA AA24-038A]]):
- >300 days undetected inside U.S. electric utility OT network
- Lateral movement via valid admin credentials (AD compromise → RDP/RMS)
- RTU/HMI access via default vendor credentials + NTDS.dit theft
- GIS data + OT system config exfiltration (reconnaissance for disruption)

**Threat to ACME**:
- Windows domain join enables OT asset compromise (if HMI host runs Windows [[AD]]-joined)
- Vendor jump-server credential theft → privileged access to field devices
- Slow reconnaissance: 6+ months pre-positioning before disruption event

---

### [[APT33]] / Elfin (Iran) — Energy Sector Focus

**Known Tactics**:
- Spearphishing with OT-specific attachments (HMI installer, vendor software)
- Watering-hole attacks on energy-sector forums
- Post-compromise: ICS network reconnaissance, remote access tool deployment

**Threat to ACME**:
- Engineering staff (SCADA engineer, grid operator) as phishing targets
- Vendor software supply-chain attack vector
- Persistence via engineering workstation

---

### [[Predatory Sparrow]] (Iran) — Disruptive APT

**Known Tactics**:
- Disruptive attacks on critical infrastructure (grid, water)
- Focus on operational technology with direct impact

---

## ICS-Specific Attack Techniques (MITRE ATT&CK for ICS)

| Technique ID | Technique Name | ACME Exposure |
|--|--|--|
| **T0855** | [[Unauthorized Command Message]] | [[GOOSE]] injection on station bus; MMS command to relay |
| **T0832** | [[Manipulation of View]] | HMI display tampering — operator sees incorrect grid state |
| **T0833** | [[Modify Alarm Settings]] | Suppression of critical alarms (voltage, current, frequency) |
| **T0809** | [[Data Destruction]] | PLC / IED program wipe (via [[GOOSE]] or [[Modbus]]); relay firmware erasure |
| **T0814** | [[Denial of Service]] | [[GOOSE]] flood on [[IEC 61850]] station bus → loss of protection signals |
| **T0818** | [[Engineering Workstation Compromise]] | Attacker gains access to [[IEC 61850]] config, relay settings, SCADA DB |
| **T0822** | [[External Remote Services]] | Vendor jump-servers (SEL Compass, GE EnerVista, [[ABB]] ServicePort) exploited |
| **T0859** | [[Valid Accounts]] | Engineering [[Active Directory]] credential theft → domain-joined HMI access |
| **T0890** | [[Exploitation for Privilege Escalation]] | Windows host running HMI software → local exploit to SYSTEM; lateral move |

---

## Kill-Chain Anchors at ACME Ottawa

### 1. **Engineering Workstation** (IEC 61850 GOOSE Editor / SEL AcSELerator)
- **Owner**: SCADA/Protection Engineer
- **Network**: Engineering VLAN (172.20.10.0/24)
- **Risk**: Spearphish → malware → relay config modification → silent change to protection logic
- **Persistence**: Scheduled task on workstation ([[Windows Update]] emulation)
- **Detection Gap**: Config drift detection not automated; engineer review cycle is 2-4 weeks

### 2. **HMI Host** (Windows Server 2019 + InduSoft Web Studio)
- **Owner**: Operations / SCADA team
- **Network**: Domain-joined, VLAN 172.20.20.0/24
- **Risk**: Windows local exploit (CVE-2024-XXXXX) → SYSTEM → lateral move to engineering LAN
- **Persistence**: [[Windows Scheduled Task]]; WMI event subscription
- **Detection Gap**: EDR configured for alerts only; no auto-response. Logs forwarded to central SIEM (4-hour latency)

### 3. **Vendor Remote Access Paths**
- **SEL Compass**: Remote diagnostics (SSH + cert auth), accessed from SEL jump-server
- **GE EnerVista**: HTTPS remote access for relay firmware updates (basic auth, no MFA)
- **[[ABB]] ServicePort**: VPN tunnel + RDP to PAC host in Ottawa (legacy; no session recording)
- **Risk**: Compromised vendor laptop (stale Windows image, old firmware) → lateral move to local relay engineering LAN

### 4. **Relay Engineering LAN** ([[IEC 61850]] / [[Modbus]] RTU)
- **Devices**: [[SEL-787]] protection relay, [[ABB]] RED615 distance relay, GE feeder IED
- **Network**: Isolated fiber ring (172.20.30.0/24); air-gapped from operations HMI
- **Risk**: Engineering workstation compromise + access to this VLAN → direct [[Modbus]]/[[GOOSE]] control
- **Persistence**: Relay firmware modification (survives reboot)

### 5. **Shared IT/OT Active Directory**
- **Structure**: Single AD forest (ACME.LOCAL)
- **Risk**: IT domain controller breach → OT admin credentials harvested
- **Mitigation Gap**: No tiered admin model; OT engineers share credentials with IT staff for file shares

---

## Remote Access Architecture

### Approved Paths

```
┌─ Vendor Request (SEL support)
│  └─ PAM (CyberArk) gate → Challenge/response
│     └─ Jump Host ([[Windows]] RDP server, VPN-only, MFA)
│        └─ Engineering LAN (172.20.30.0/24, SSH to relay)
│           └─ [[SEL-787]] ([[Modbus]] RTU port 502)
│
├─ GE EnerVista Remote Session
│  └─ HTTPS to GE cloud portal
│     └─ Token-based auth (no session recording pre-2025)
│        └─ Relay firmware push (authenticated)
│
└─ [[ABB]] ServicePort (LEGACY — deprecated post-2026)
   └─ VPN tunnel ([[IPSec]], cert-based)
      └─ RDP to PAC intermediary host
         └─ Relay serial console (no audit log)
```

---

## Common Bypass Patterns

1. **Rogue Laptop on Engineering VLAN**
   - Unpatched Dell laptop from contractor with SCADA software pre-loaded
   - Plugged into wall jack; VLAN auto-assignment → engineering VLAN (no [[802.1X]])
   - Direct [[Modbus]] RTU access to relay, no PAM/MFA gating

2. **Vendor Laptop with Stale Credentials**
   - Vendor engineer uses 2-year-old [[Windows]] 10 image
   - Credentials for [[ABB]] ServicePort hardcoded in batch script
   - Laptop left on engineering LAN overnight for "convenience"

3. **IT/OT Credential Crossover**
   - SCADA engineer's AD account used to map network share (file server in IT network)
   - Same AD account can RDP to SCADA jump-host
   - IT admin breach → harvest SCADA engineer credentials

4. **Unmonitored Relay Serial Console**
   - [[ABB]] ServicePort allows direct serial-over-IP to relay
   - No session transcript; operator can execute arbitrary [[Modbus]] commands
   - Changes not reflected in engineering workstation config (config drift)

---

## NERC CIP / Ontario Reg. 22/04 Compliance

**Effective April 2026**, [[NERC CIP-005-7]] mandates:

### Jump Host Architecture
- ✅ All remote access brokered through managed jump infrastructure
- ✅ Two-factor authentication to jump host (OTP + password)
- ✅ Session recording and playback (CyberArk or equivalent)
- ✅ Network isolation: Jump host on isolated network segment with monitored egress

### Privileged Access Management (PAM)
- ✅ Vendor credential vault: Store vendor credentials (no shared accounts)
- ✅ Check-out workflow: Temporary password rotation on each access session
- ✅ Separation of duties: Vendor access segregated from engineering access

### Out-of-Band & Vendor Maintenance
- ✅ Inventory: All vendor remote access paths documented + reviewed annually
- ✅ Change control: Vendor access requests go through formal change management
- ✅ Termination: Automatic credential revocation when vendor contract ends

### Electronic Security Perimeter (ESP)
- ✅ Boundary control: Remote access terminates at boundary device (firewall/PAM host)
- ✅ Access logging: All remote access attempts logged with user, timestamp, duration, commands
- ✅ Session termination: Automatic logout after inactivity (15 min)

---

## Recommended Detections

| Indicator | Detection Method |
|--|--|
| [[GOOSE]] flooding on station bus | IEC 61850 analyzer; alert on >10 [[GOOSE]]/sec per device |
| Unauthorized [[Modbus]] commands to relay | Anomaly detection on command rate + command type |
| Config drift (relay settings vs. engineering workstation) | Automated nightly diff of relay firmware/settings vs. golden baseline |
| Vendor access outside change window | Firewall rule violation alert; PAM session attempt outside scheduled maintenance |
| [[Windows]] AD lateral movement | EDR hook on NTDS.dit access + credential dumping tools (mimikatz) |
| Engineering workstation outbound connection | Whitelisted egress only (relay engineering LAN, file server, SEL/GE portals) |

---

## References

- **[[MITRE ATT&CK for ICS]]**: https://attack.mitre.org/techniques/ics/
- **[[Claroty Team82]]: Industroyer2 Foiled Attack**: https://claroty.com/team82/blog/industroyer2-variant-surfaces-in-foiled-attack-against-ukraine-electricity-provider
- **[[CISA Advisory AA24-038A]]: Volt Typhoon**: https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a
- **[[NERC CIP-005-7]]**: https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-005-7.pdf
- **[[IEC 62443]]**: https://www.mdpi.com/1996-1073/16/3/1452

---

**Version**: Phase 1c | **Lines**: 360 | **Status**: Draft
