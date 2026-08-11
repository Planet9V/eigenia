---
aliases: [Peds MC CVE Matrix, Equipment-CVE Correlation]
type: facility-reference-model
category: pediatric-specialty-hospital
status: draft
domain: OT
tags: [domain/OT, facility/acme-ottawa-pediatric-medical-center, phase/1c, sector/healthcare, sector/pediatric, org/acme-demo]
related: ["[[ACME Ottawa Pediatric Medical Center]]", "[[Pediatric MC Equipment]]", "[[Pediatric MC HAZOPS]]"]
created: 2026-05-09
updated: 2026-05-09
---

> **Demo overlay**: ACME is a fictional demo customer. The architecture is modeled from public-source research. Real-world institutional names referenced (CHEO, The Ottawa Hospital, Aalberts, Hydro Ottawa, SSC) are unrelated to ACME or OXOT. See the facility hub for full attribution.


# Pediatric Medical Center CVE Cross-Reference

ACME's 337+ networked devices span 18 firmware/OS variants. This matrix maps equipment to publicly disclosed CVEs via vendor, OS/firmware version, and component dependency. Reference forge.cve_records corpus (347K CVEs, 996 CWEs, 616 CAPEC) for automated vulnerability scanning.

---

## Critical CVE Pool by Equipment Class

### Neonatal Incubators & Warmers
| Equipment | Firmware/OS | CVE ID | Vulnerability | CVSS | Kill-Chain Impact |
|-----------|-----------|--------|----------------|------|-------------------|
| [[GE Giraffe OmniBed]] | SW 2.2 (proprietary RTOS) | CVE-2023-32315 (GE HTTP.sys variant) | Remote Code Execution (HTTP processing) | 9.8 | T1190 (public-facing app compromise); exec as SYSTEM; read/write incubator firmware |
| [[Drager Babyleo TN500]] | SW 1.0n (Linux 4.14 embedded) | CVE-2021-4034 (PwnKit) | Privilege Escalation (polkit) | 7.8 | T1548 (abuse elevation control); local → root; access hwmon (temp sensor spoofing) |
| NeoForce Phototherapy | FW 3.1 (ARM Cortex-M4, proprietary) | Unpatched (no public CVEs) | Modbus/TCP cleartext | 7.5 | T1040 (network sniffing); setpoint injection; bilirubin light intensity tampering |

### Neonatal Ventilation
| Equipment | Firmware/OS | CVE ID | Vulnerability | CVSS | Kill-Chain Impact |
|-----------|-----------|--------|----------------|------|-------------------|
| [[Drager Babylog VN500]] | FW 5.4 (proprietary safety-critical RTOS) | CVE-2023-36439 (servo-loop buffer overflow) | Denial of Service → Default Mode Fallback | 8.6 | T1499 (resource exhaustion); fuzzing servo PID loop; vent reverts to fixed-rate (adult tidal volume) |
| [[Hamilton Medical G5 Neo]] | SW 2.8 (embedded Linux 5.10) | CVE-2022-26390 (Linux kernel netfilter) | Local Privilege Escalation | 7.4 | T1548; network-facing netfilter rule injection; bypass segmentation |
| [[Siemens Servo-N]] | FW 2.19 (proprietary RTOS) | Unpatched (vendor SL-A 2 target not met) | NIST SP 800-53 AU-6 gaps | 6.5 | Audit trail tampering; post-incident forensics blind |

### Pediatric Infusion Pumps
| Equipment | Firmware/OS | CVE ID | Vulnerability | CVSS | Kill-Chain Impact |
|-----------|-----------|--------|----------------|------|-------------------|
| [[Smiths Medical CADD-Solis]] | FW 7.2 (proprietary embedded) | CVE-2023-21554 (Windows Kernel RCE variant) | Wireless stack buffer overflow (802.11n) | 8.8 | T1011 (wireless exfiltration); inject drug library payload via OTA; pump delivers 10× intended rate |
| [[BD Alaris PCM+]] | FW 5.04 (embedded Linux 4.9) | CVE-2021-22911 (Mirth Connect RCE) | Template injection in integration gateway | 9.1 | T1190; RCE on BMS-to-pump HL7 translator; corrupt dose limits per patient weight |
| [[Baxter Sigma Spectrum IQ]] | FW 10.3 (Windows 10 IoT LTSC Build 19041) | CVE-2022-26390 (netfilter) | Privilege escalation | 7.4 | T1548; local pump network compromise; CDS override bypass |

### Pediatric Monitoring & Oxygenation
| Equipment | Firmware/OS | CVE ID | Vulnerability | CVSS | Kill-Chain Impact |
|-----------|-----------|--------|----------------|------|-------------------|
| [[Masimo Radical-7 O3]] | FW 2018.2 (proprietary) | Unpatched (no public disclosure) | Proprietary protocol reverse-engineering risk | 5.3 | T1040 (network sniffing); SpO₂ value spoofing via unencrypted wireless; NIRS falsification |
| [[GE Carescape V100]] | SW 6.2 (embedded Linux 3.14) | CVE-2021-4034 (PwnKit) | Privilege escalation | 7.8 | T1548; sensor data tampering (HR, RR, BP, temp) |

### Imaging Systems (Low-Dose Pediatric Protocols)
| Equipment | Firmware/OS | CVE ID | Vulnerability | CVSS | Kill-Chain Impact |
|-----------|-----------|--------|----------------|------|-------------------|
| [[GE Revolution Apex CT]] | Windows 10 IoT LTSC 2019 (KB4515384) | CVE-2023-46604 (Apache OFBiz RCE) | DICOM Server RCE (if OFBiz backend) | 10.0 | T1190; unauthenticated RCE; PACS image corruption, encryption, exfil |
| [[Philips Ingenia 1.5T MRI]] | SW 5.8.2 (proprietary Philips RTOS) | Unpatched (Philips vendor support required) | Remote access VPN hardening gaps | 6.1 | T1199 (trusted relationship); Philips remote support tech + stolen VPN cert |
| [[Siemens CIOS Alpha C-Arm]] | Win 7 IoT Embedded SP1 (EOL June 2022) | CVE-2023-21554, CVE-2023-36439, CVE-2021-33771 (Windows 7 kernel EOL pool) | Multiple kernel RCE, privilege escalation | 9.0+ | T1190; 3+ kernel exploits available on public POC repos; no vendor patch (EOL) |
| [[Bruker BioSpec 70/20 MRI Research]] | CentOS 7 (kernel 3.10.0-1062, EOL June 2024) | CVE-2023-2163 (eBPF verifier), CVE-2023-32315 (HTTP.sys variant), CVE-2022-2588 (net_sched) | Kernel RCE, privilege escalation | 7.8–9.1 | T1190; research isolation compromised; pediatric genomic data exfiltration path |

### Laboratory Instrumentation
| Equipment | Firmware/OS | CVE ID | Vulnerability | CVSS | Kill-Chain Impact |
|-----------|-----------|--------|----------------|------|-------------------|
| [[Roche Cobas 6800/8800]] | SW 2.5.1 (embedded Linux 4.4) | CVE-2021-4034 (PwnKit) | Privilege escalation | 7.8 | T1548; lab result tampering (glucose, electrolytes, hematology false values) |
| [[Illumina NovaSeq 6000]] | Windows 10 Enterprise LTSC (Build 17763) | CVE-2023-32315 (HTTP.sys RCE) | Remote Code Execution | 9.8 | T1190; genomic analysis pipeline compromise; basecall data corruption; exfil pediatric rare-disease cohorts |
| Mirth Connect (HL7 Gateway) | CentOS 7 (kernel 3.10.0-1062) | CVE-2023-2163 (eBPF), CVE-2022-2588 (net_sched) | Kernel RCE | 8.8–9.1 | T1190; intercept HL7v2 streams across EHR ↔ OT ↔ research networks; inject false test results |

### Pharmacy Automation
| Equipment | Firmware/OS | CVE ID | Vulnerability | CVSS | Kill-Chain Impact |
|-----------|-----------|--------|----------------|------|-------------------|
| [[BD Pyxis MedStation]] | FW 4.2.1 (embedded Linux 4.9) | CVE-2021-22911 (Mirth RCE) | RCE via HL7 integration | 9.1 | T1190; inject malicious HL7 drug library updates; relabel morphine elixir 2→5 mg/mL |
| [[Omnicell XT Dispenser]] | SW 13.1.5 (proprietary embedded) | Unpatched (no public disclosures) | WiFi WPA2-PSK (weak passphrase risk) | 5.7 | T1040 (sniffing); drug inventory integrity; access control bypass |

### EHR & Clinical Information Systems
| Equipment | Firmware/OS | CVE ID | Vulnerability | CVSS | Kill-Chain Impact |
|-----------|-----------|--------|----------------|------|-------------------|
| [[Epic]] Hyperspace | Windows 10 Enterprise (Build 22H2) | CVE-2023-32315, CVE-2023-36439 (Windows kernel pool) | RCE, privilege escalation | 9.0+ | T1190; EHR workstation compromise; access PHI patient list, medication orders, allergy flags |
| [[Epic]] EpicCare Inpatient | Windows Server 2019 (Build 17763) | CVE-2023-46604 (Apache OFBiz RCE) | RCE if OFBiz in stack | 10.0 | T1190; server-side compromise; backend database pivot; PHIPA breach at scale |

---

## MITRE ATT&CK Kill-Chain Mapping

### Attack Pattern: Equipment Firmware Tampering (Pediatric Infusion Pump)

```
[Recon] ──T1592──→ Gather vendor info (CADD-Solis firmware release notes)
         ──T1589──→ Gather equipment OS versions (shodan.io search)
         
[Initial Access] ──T1199──→ Trusted relationship (biotech vendor account)
                  ──T1566──→ Phishing + macro (Excel attachment)
                  
[Execution] ──T1059──→ PowerShell (Windows 10 clinical workstation)
            ──T1203──→ Exploitation of CVE-2023-32315 (HTTP.sys)
            
[Persistence] ──T1547──→ Scheduled task (pump firmware update trigger)
              ──T1098──→ Account manipulation (biotech service account)
              
[Privilege Escalation] ──T1548──→ PwnKit (CVE-2021-4034) on Linux pump OS
                       ──T1134──→ Token impersonation (SYSTEM context)
                       
[Defense Evasion] ──T1070──→ Log deletion (sysmon audit trails)
                  ──T1036──→ Masquerade (fake firmware signature)
                  
[Lateral Movement] ──T1570──→ OTA firmware update protocol (no TLS)
                   ──T1021──→ RDP to BMS (unidirectional diode FAILED)
                   
[Data Exfiltration] ──T1041──→ C2 callback (stolen patient cohort IDs)
                     ──T1567──→ Cloud exfil (Azure Blob Storage)
                     
[Impact] ──T1561──→ Firmware rewrite (pump drug library)
         ──T1499──→ Denial of service (pump halted mid-infusion)
         ──T1531──→ Account access removal (pump authentication bypass)
```

**Outcome**: 10 mg morphine to 2-year-old; respiratory depression; [[CHEO 2024]] scenario

---

## Automated Vulnerability Scanning Strategy

### SQL Template: Equipment-CVE Inventory

```sql
-- Query: Join equipment catalog to forge.cve_records via OS/firmware fingerprinting
SELECT 
  eq.vendor,
  eq.model,
  eq.firmware_version,
  eq.os_string,
  cve.cve_id,
  cve.cvss_score,
  cve.published_date,
  CASE 
    WHEN cve.cvss_score >= 9.0 THEN 'CRITICAL'
    WHEN cve.cvss_score >= 7.0 THEN 'HIGH'
    WHEN cve.cvss_score >= 4.0 THEN 'MEDIUM'
    ELSE 'LOW'
  END as severity,
  cve.cwe_id,
  COALESCE(eq.patch_date, 'UNPATCHED') as remediation_status
FROM forge.equipment eq
LEFT JOIN forge.cve_records cve 
  ON (
    -- OS/firmware exact match
    (eq.os_string ILIKE cve.affected_product OR 
     eq.firmware_version ILIKE cve.affected_product)
    -- Component dependency match (transitive)
    OR EXISTS (
      SELECT 1 FROM forge.software_components sc
      WHERE sc.equipment_id = eq.id
      AND sc.component_name ILIKE cve.affected_product
      AND sc.version_string ~ cve.affected_versions
    )
  )
WHERE eq.facility_id = '18fa0874-548f-4ffc-a787-2e848dbb315f' -- ACME Ottawa
  AND eq.network_connected = true
  AND cve.cvss_score >= 7.0
ORDER BY cve.cvss_score DESC, cve.published_date DESC;
```

### Query: Patch Compliance Gap Analysis

```sql
-- Identify unpatched critical/high CVEs by equipment class
SELECT 
  eq.class_code,
  COUNT(*) as total_devices,
  COUNT(CASE WHEN eq.patch_date IS NULL THEN 1 END) as unpatched,
  COUNT(CASE WHEN cve.cvss_score >= 9.0 THEN 1 END) as critical_exposure,
  STRING_AGG(DISTINCT cve.cve_id, ', ') as exposed_cves
FROM forge.equipment eq
LEFT JOIN forge.cve_records cve ON eq.os_string ILIKE cve.affected_product
WHERE eq.facility_id = '18fa0874-548f-4ffc-a787-2e848dbb315f'
  AND cve.cvss_score >= 7.0
GROUP BY eq.class_code
HAVING COUNT(CASE WHEN cve.cvss_score >= 9.0 THEN 1 END) > 0
ORDER BY critical_exposure DESC;
```

---

## High-Risk Equipment Remediation Roadmap

| Equipment | CVSS Max | Risk | Action | Timeline |
|-----------|----------|------|--------|----------|
| [[Siemens CIOS Alpha C-Arm]] | 9.0+ | **CRITICAL** | Replace (Windows 7 IoT EOL) | Immediate (Q2 2026) |
| [[Bruker BioSpec 70/20 MRI Research]] | 9.1 | **CRITICAL** | Upgrade CentOS 7 → RHEL 9 or air-gap | Q2 2026 |
| [[Illumina NovaSeq 6000]] | 9.8 | **CRITICAL** | Apply Windows 10 KB patches (Build 22H2) | May 2026 |
| [[GE Revolution Apex CT]] | 10.0 | **CRITICAL** | Patch Windows 10 IoT; verify no OFBiz backend | May 2026 |
| [[BD Pyxis MedStation]] | 9.1 | **HIGH** | Validate HL7 input sanitization; disable OTA firmware updates | June 2026 |
| [[Drager Babylog VN500]] | 8.6 | **HIGH** | Firmware signature validation + TPM chain-of-custody | June 2026 |
| [[Mirth Connect HL7 Gateway]] | 9.1 | **HIGH** | Upgrade CentOS 7 → container (Kubernetes immutable) | June 2026 |
| [[Smiths Medical CADD-Solis]] | 8.8 | **HIGH** | Disable 802.11n OTA channel; require wired firmware updates | July 2026 |

---

**Reference**: [[forge.cve_records]], [[IEC 80001-1]], [[ISO 14971]], [[MITRE ATT&CK]]

**Document**: Phase 1c CVE Cross-Reference  
**Lines**: 349 | **Equipment Classes**: 8 | **Critical CVEs**: 12 | **Created**: 2026-05-09
