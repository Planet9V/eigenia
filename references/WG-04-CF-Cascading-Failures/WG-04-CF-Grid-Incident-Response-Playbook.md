| Working group | Document type | Companion paper | Classification |
| :--- | :--- | :--- | :--- |
| WG-04-CF Cascading Failures | Eigenia Labs operational playbook | Cascading Failure Hypothesis | Open, non-normative |

## 1. Scope and Use

This playbook holds the operational artifacts supporting the Cascading Failure Hypothesis analysis: the restoration timeline, the recovery constraints, three incident response run-books, the detection signatures and indicators of compromise, the black start and resilience procedures, and the stakeholder notification and communication protocols.

It is written for a responder. A control room engineer, a SOC analyst, an incident commander or a communications lead can work from it without reading the physics. Nothing here derives a result. Every threshold, cost band and figure in this document is derived in the paper, [Cascading Failure Hypothesis: Non-Linear Energy Grid Instability](/papers/cascading-failure-hypothesis), and that paper stays the source of record for all of them.

Where a numbered section is cited below (section 3.2, section 5, section 5.8, section 5.10, section 9.1), the number refers to the paper, not to this playbook.

The reference network is RefDNSP-1.2M, the modelled 1.2 million customer New South Wales distribution network specified in section 2 of the paper. Site counts, facility names, contact routes and phone numbers belong to that model, not to any real operator. Anyone adapting this playbook to a real network must replace them.

Sections 2 through 5 were published as section 8 and appendices J, K and L of the paper up to September 2026. They moved here unchanged, so the research argument and the operational paperwork stop competing for the same reader.

---

## 2. Recovery Procedures

### 2.1 Emergency Response Timeline

```mermaid
gantt
    title Grid Restoration Timeline Post-Attack
    dateFormat HH:mm

    section Emergency Response - T+0 to T+2h
    AEMO emergency protocols :crit, 00:00, 30m
    Black start procedures Shoalhaven :crit, 00:30, 120m

    section Damage Assessment - T+1h to T+8h
    Substation inspections 12 teams parallel : 00:45, 540m
    Equipment damage evaluation : 01:30, 240m
    Grid topology reconfiguration : 02:00, 120m
    Cyber forensics DERMS isolation : 01:00, 360m

    section Phase 1 Restoration - Critical
    Hospital feeders priority :crit, 02:30, 60m
    Water infrastructure : 03:00, 120m
    Emergency services : 03:30, 60m

    section Phase 2 Restoration - Essential
    Telecommunications : 04:30, 120m
    Data centres : 05:00, 120m
    Commercial areas : 06:00, 240m

    section Phase 3 Restoration - General
    Residential zones sequential : 08:00, 960m
    Industrial areas : 10:00, 720m

    section Phase 4 Normalization
    Full grid stability verification : 24:00, 240m
    Post-incident forensic analysis : 28:00, 480m
```

### 2.2 Key Recovery Constraints

Five constraints govern the pace of restoration:

1. **Black Start Capability:** Limited to 3 hydroelectric units at Shoalhaven Scheme, requiring 2 hours for initiation.
2. **Manual Inspection Requirement:** 54 substations require physical inspection before re-energization. Sequential inspection takes 108 hours; deploying 12 parallel inspection teams reduces this to 9 hours.
3. **Thermal Cycling Limits:** Transformers that have been thermally stressed cannot be re-energized immediately. A 4-8 hour cooling wait period is required.
4. **Sequential Restoration Limit:** A maximum of 3 substations can be re-energized simultaneously to prevent re-collapse from inrush current.
5. **Equipment Damage Probability:** 5-15% chance of transformer or switchgear damage requiring replacement. Emergency procurement: implementation period required via air freight (versus implementation period required normal lead time).

### 2.3 Incident Response Playbooks

Three playbooks address the primary attack scenarios:

**DERMS/API Compromise Playbook:**

- Detection signatures: API request volume exceeding 5 times baseline, mass device command to more than 100 devices in single call, rapid repeated commands at intervals under 15 seconds
- Immediate actions: Revoke OAuth token, enable API emergency read-only mode, isolate DERMS pods via Kubernetes network policy deny-all
- Containment: Audit all dispatch commands in the preceding 48 hours, cross-check against SCADA telemetry, manually disconnect any BESS in unsafe state
- Eradication: Forensic imaging of DERMS pods, rebuild from clean signed container images, rotate all credentials

**BESS Thermal Runaway Playbook:**

- Detection signatures: BMS alarm at cell temperature above 60 degrees Celsius, cell voltage above 4.3 V, fire suppression system activation
- Immediate actions: Emergency shutdown (open contactor), activate fire suppression, evacuate all personnel within 500 metres, call Fire and Rescue NSW HAZMAT
- Containment: Cool adjacent containers with water spray, establish toxic gas exclusion zone, begin environmental monitoring
- Recovery: Allow battery to self-extinguish over 4-12 hours (cannot be forcibly extinguished), 48-hour cooling before approach, EPA-licensed hazardous waste removal

**Kubernetes Container Escape Playbook:**

- Detection signatures: Container runtime alert for privilege escalation, unusual process execution (shell spawned in pod), host filesystem access from container
- Immediate actions: Drain workloads from compromised OpenShift node, force delete compromised pod, network isolation via deny-all egress
- Eradication: Rebuild node from golden image, re-deploy pods from clean signed images, audit all pod security and network policies

---

## 3. Attack Detection Signatures and Indicators of Compromise

This section provides concrete detection signatures for security operations center (SOC) analysts monitoring for cascading failure attacks.

**Detection Signature 1: Death Wobble Oscillation Attack**

```yaml
Detection Rule: BESS_Oscillation_Attack_Pattern

Data Sources:
  - DERMS API access logs (JSON format)
  - SCADA telemetry (BESS power setpoints, grid frequency)
  - mPrest DERMS audit logs

Logic:
  IF (
    COUNT(BESS charge/discharge commands) > 5
    AND time_window < 1800 seconds (30 minutes)
    AND same_asset_id = TRUE
    AND command_source = "retailer_api"
  )
  OR (
    COUNT(distinct BESS assets with state_change) > 10
    AND time_window < 300 seconds (5 minutes)
    AND geographic_clustering = TRUE (within 25 km radius)
  )
  OR (
    STDDEV(grid_frequency) > 0.05 Hz
    AND frequency_oscillation_period = 1.5-2.5 seconds
    AND correlation_with_BESS_commands = TRUE
  )
  THEN
    ALERT: "CRITICAL - Potential Death Wobble Oscillation Attack Detected"
    PRIORITY: P0 (immediate escalation to Control Room + CISO)
    AUTOMATED_RESPONSE: Enable DERMS emergency read-only mode (disable all API write commands)

Example Log Pattern (DERMS API):
[2026-02-15 13:00:15] POST /api/v1/dispatch {"asset_id": "BESS_Bawley_001", "mode": "CHARGE", "power_MW": 5.0}
[2026-02-15 13:02:18] POST /api/v1/dispatch {"asset_id": "BESS_Bawley_001", "mode": "DISCHARGE", "power_MW": 5.0}
[2026-02-15 13:04:22] POST /api/v1/dispatch {"asset_id": "BESS_Bawley_001", "mode": "CHARGE", "power_MW": 5.0}
[2026-02-15 13:06:25] POST /api/v1/dispatch {"asset_id": "BESS_Bawley_001", "mode": "DISCHARGE", "power_MW": 5.0}
→ Pattern: 4 state changes in 6 minutes = 0.67 changes/minute (ALERT THRESHOLD: >0.3 changes/minute)
```

**Detection Signature 2: Modbus Thermal Runaway Attack (FrostyGoop-Style)**

```yaml
Detection Rule: Modbus_Thermal_Attack_BMS

Data Sources:
  - Modbus TCP network traffic (port 502, 3111, 3113, 16500)
  - BMS telemetry (cell voltages, cell temperatures)
  - BESS alarm logs

Logic:
  IF (
    Modbus_Function_Code = 6 (Write Single Register)
    AND Register_Address IN [0x1000-0x1003] (thermal setpoint registers)
    AND New_Value > 80°C (exceeds safe limit of 60°C)
  )
  OR (
    Modbus_Function_Code = 16 (Write Multiple Registers)
    AND Register_Address IN [0x2000-0x2003] (voltage setpoint registers)
    AND New_Value > 4.0V (exceeds safe limit of 3.65V for LFP)
  )
  OR (
    BMS_Cell_Temperature > 70°C
    AND HVAC_Cooling_Status = "DISABLED"
    AND Recent_Modbus_Write_Command = TRUE (within 15 minutes)
  )
  THEN
    ALERT: "CRITICAL - Thermal Runaway Attack Detected - BMS Override"
    PRIORITY: P0 (immediate emergency shutdown)
    AUTOMATED_RESPONSE:
      1. Open BESS main contactor (disconnect from grid)
      2. Force-enable HVAC cooling (override Modbus command)
      3. Activate fire suppression pre-charge
      4. Notify Fire and Rescue NSW (potential hazmat incident)

Example Modbus Packet (Hex Dump):
00 01 00 00 00 06 01 06 10 00 00 FF
│    │    │    │    │  │  │  │    │
│    │    │    │    │  │  │  │    └─ Value: 255 (0x00FF) = 255°C ← ATTACK
│    │    │    │    │  │  │  └────── Register: 0x1000 (thermal limit)
│    │    │    │    │  │  └───────── Function Code: 06 (Write Single Register)
│    │    │    │    │  └──────────── Unit ID: 01 (BMS controller)
│    │    │    │    └─────────────── Length: 6 bytes
│    │    │    └──────────────────── Protocol ID: 0x0000 (Modbus)
│    └─────────────────────────────── Transaction ID: 0x0001
└──────────────────────────────────── Transaction ID (cont.)

Normal Operation Packet (for comparison):
00 01 00 00 00 06 01 06 10 00 00 3C
                                  └─ Value: 60 (0x003C) = 60°C ← NORMAL
```

**Detection Signature 3: Multi-Substation DNP3 Coordinated Attack (Sandworm-Style)**

```yaml
Detection Rule: DNP3_Mass_Circuit_Breaker_Trip

Data Sources:
  - DNP3 protocol traffic (port 20000)
  - SCADA protection relay alarms
  - Substation status (breaker open/closed state)

Logic:
  IF (
    DNP3_Function_Code = 5 (Direct Operate - No ACK)
    AND Object_Group = 12 (Binary Output Command)
    AND CROB_Control_Code = 0x01 (TRIP/Close)
    AND COUNT(distinct substations) > 10
    AND time_window < 60 seconds
  )
  OR (
    COUNT(circuit_breaker_open_events) > 10
    AND time_window < 120 seconds
    AND normal_statistical_rate < 2 per hour
  )
  THEN
    ALERT: "CATASTROPHIC - Coordinated Multi-Substation Attack Detected"
    PRIORITY: P0 (Board notification + AEMO + ACSC immediate)
    AUTOMATED_RESPONSE:
      1. Isolate SCADA master station (network quarantine)
      2. Disable all DNP3 write operations (read-only mode)
      3. Initiate emergency manual control procedures
      4. Activate National Coordination Center (critical infrastructure)

Statistical Baseline:
  Normal circuit breaker operations: 1-3 per hour (scheduled maintenance, fault clearing)
  Attack threshold: >10 within 2 minutes = 300x normal rate (impossible without cyber attack)

Example SCADA Log Pattern:
[13:45:12.001] Substation_Canterbury_132kV: Circuit Breaker CB-1 OPEN (DNP3 Direct Operate)
[13:45:12.045] Substation_Parramatta_132kV: Circuit Breaker CB-1 OPEN (DNP3 Direct Operate)
[13:45:12.089] Substation_Bankstown_132kV: Circuit Breaker CB-1 OPEN (DNP3 Direct Operate)
... (15 more substations within 5-second window)
→ Pattern: 18 substations trip within 5 seconds = coordinated attack signature
```

**Detection Signature 4: IEC 61850 GOOSE Injection Attack**

```yaml
Detection Rule: GOOSE_Message_Injection_Anomaly

Data Sources:
  - IEC 61850 GOOSE multicast traffic (EtherType 0x88B8)
  - Protection relay event logs
  - Station bus network captures

Logic:
  IF (
    GOOSE_Message_StNum (sequence number) != Expected_StNum + 1
    OR GOOSE_Message_SqNum (sub-sequence) > 10000 (abnormal value)
    OR GOOSE_Source_MAC_Address NOT IN Authorized_IED_List
  )
  AND (
    Protection_Relay_Trip_Event = TRUE
    AND time_correlation < 50 milliseconds
  )
  OR (
    COUNT(duplicate GOOSE messages) > 5
    AND time_window < 100 milliseconds
    AND message_content = identical
  )
  THEN
    ALERT: "CRITICAL - GOOSE Message Injection Attack Detected"
    PRIORITY: P0 (potential equipment damage, safety risk)
    AUTOMATED_RESPONSE:
      1. Log GOOSE source MAC address for forensic analysis
      2. Alert protection engineers (manual validation required)
      3. Consider IED lockout if injection confirmed (prevents spurious trips)

Example GOOSE Message (Wireshark Capture):
Ethernet II
  Destination: 01:0c:cd:01:00:01 (GOOSE multicast)
  Source: aa:bb:cc:dd:ee:ff ← UNKNOWN MAC (not in authorized IED database)
  Type: GOOSE (0x88B8)
GOOSE PDU
  gocbRef: SUBSTATION_1/LLN0$GO$gcb01
  timeAllowedtoLive: 2000 ms
  datSet: SUBSTATION_1/LLN0$dataset1
  goID: trip_signal
  t: 2026-02-15 13:45:12.123456
  stNum: 12845 ← Expected: 12844 (sequence gap = injection indicator)
  sqNum: 0
  test: FALSE
  confRev: 1
  ndsCom: FALSE
  numDatSetEntries: 1
  allData: [TRIP = TRUE] ← Malicious trip command

Correlation with Protection Relay:
[13:45:12.125] IED_RELAY_001: Received GOOSE trip signal, Circuit Breaker CB-1 OPENING
→ 2 milliseconds after GOOSE message = attack successful
```

**Detection Signature 5: Vendor Access Anomaly (Lateral Movement)**

```yaml
Detection Rule: Vendor_Access_Lateral_Movement

Data Sources:
  - Bastion Host (Citrix) access logs
  - Active Directory authentication logs
  - Network traffic from vendor VLAN to OT VLAN
  - Process execution logs (Sysmon, EDR)

Logic:
  IF (
    Vendor_Login_Time OUTSIDE [0800-1700 business hours]
    OR Vendor_Login_Day IN [Saturday, Sunday, Public Holiday]
  )
  AND (
    Network_Connection_Destination IN [SCADA_Master, RTU_Gateway, DERMS]
    OR File_Access_Pattern = "Configuration_Files" (*.cfg, *.scl, *.cid)
    OR Process_Execution IN [modbus_client.exe, dnp3_scanner.exe, goose_inject.py]
  )
  OR (
    Data_Exfiltration_Volume > 10 MB
    AND Connection_Duration > 30 minutes
    AND Connection_Destination = External_IP (non-RefDNSP-1.2M)
  )
  THEN
    ALERT: "HIGH - Vendor Account Lateral Movement / Data Exfiltration"
    PRIORITY: P1 (potential reconnaissance for future attack)
    AUTOMATED_RESPONSE:
      1. Terminate vendor session immediately
      2. Disable vendor account pending investigation
      3. Forensic imaging of accessed systems
      4. Review vendor contract for security breach clauses

Example Log Correlation:
[2026-02-14 02:34:18] Bastion_Host: Vendor_BatteryOEM_Engineer logged in from IP 203.45.67.89
[2026-02-14 02:35:42] Bastion_Host: SMB file access \\SCADA_MASTER\config\RTU_addressing.xlsx (15 MB)
[2026-02-14 02:38:15] Bastion_Host: SSH connection to 10.50.1.100 (RTU Gateway)
[2026-02-14 02:45:33] RTU_Gateway: Process execution: modbus_tcp_scanner.exe (unsigned binary)
[2026-02-14 02:58:47] Firewall: Outbound connection 10.50.1.100 → 185.220.101.47:443 (22 MB transferred)
→ Attack Pattern: After-hours login → Config file download → Tool execution → Data exfiltration
→ Conclusion: Sandworm-style reconnaissance, 8-month attack preparation timeline consistent with Industroyer2
```

**IOC (Indicators of Compromise) Summary Table:**

| IOC Type                    | Indicator                                             | Context                       | Priority | Response                    |
| :--- | :--- | :--- | :--- | :--- |
| **Network Traffic**   | Modbus TCP Write to 0x1000-0x1003 (thermal registers) | BMS thermal limit override    | P0       | Emergency BESS shutdown     |
| **Network Traffic**   | DNP3 Direct Operate to >10 substations within 60s     | Multi-substation attack       | P0       | SCADA network isolation     |
| **Network Traffic**   | IEC 61850 GOOSE from unknown MAC address              | GOOSE injection attack        | P0       | IED lockout                 |
| **API Logs**          | >5 BESS state changes within 30 minutes               | Oscillation attack            | P0       | API emergency read-only     |
| **Authentication**    | Vendor login outside business hours                   | Reconnaissance                | P1       | Session termination         |
| **File Access**       | SCADA configuration file download >10 MB              | Data exfiltration             | P1       | Account disable             |
| **Process Execution** | Unsigned Modbus/DNP3 tools                            | Lateral movement              | P1       | Forensic investigation      |
| **Telemetry**         | Grid frequency oscillation 0.3-0.8 Hz                 | Physical attack manifestation | P0       | AEMO emergency protocols    |
| **BMS Alarms**        | Cell temperature >70°C + cooling disabled            | Thermal runaway initiation    | P0       | Fire suppression activation |

### 3.1 Network-Based IoCs

**Suspicious API Traffic Patterns:**

```
### Retailer API Abuse Indicators
- Batch command size: >100 DER devices in single API call
- Command frequency: >10 requests/minute from single retailer
- Time-of-day anomaly: API calls between 02:00-05:00 local time
- Geographic anomaly: API source IP outside Australia
- Rate anomaly: Command volume 3x standard deviation above baseline
```

**ICCP Protocol Anomalies:**

```
### ICCP Manipulation Indicators
- Constraint data updates >1/minute (normal: 5-minute intervals)
- Constraint values outside physical bounds (e.g., feeder capacity >150% rated)
- ICCP session re-establishment >3 times/hour
- Unusual ICCP quality codes (suspect, test, invalid)
```

**BESS Network Traffic:**

```
### Lateral Movement in BESS Network
- Modbus TCP connections between BESS units (should be isolated)
- Modbus function code 0x10 (Write Multiple Registers) from non-DERMS source
- SNMP Set commands to BESS units (should be read-only)
- SSH/Telnet sessions to BESS controllers from non-maintenance IPs
```

**Sample Snort Rule for Death Wobble Detection:**

```
alert tcp any any -> $DERMS_API 443 (msg:"Potential Death Wobble - Rapid Charge/Discharge Commands";
  content:"POST"; http_method; content:"/api/v1/dispatch"; http_uri;
  pcre:"/\"action\":\"charge|discharge\"/";
  detection_filter:track by_src, count 10, seconds 60;
  sid:1000001; rev:1;)
```

### 3.2 Host-Based IoCs

**DERMS Platform Compromise:**

```
### Kubernetes Pod Indicators
- Unexpected privilege escalation: hostPID, hostNetwork, privileged containers
- Volume mount anomalies: /var/run/docker.sock, /etc/kubernetes, /proc
- Process execution: /bin/bash, /bin/sh spawned in DERMS application pods
- Network connections: Outbound connections to non-whitelisted IPs

### File System Changes
- /etc/shadow, /etc/passwd modifications
- Cron job creation in DERMS pods
- .ssh/authorized_keys additions
- Unexpected shared library (.so) files loaded
```

**BESS Controller Indicators:**

```
### BMS Manipulation
- Firmware version rollback or unexpected update
- Configuration file checksum mismatch
- Thermal sensor reading spoofing (static values during charge/discharge)
- SOC reporting inconsistency (SOC vs. voltage/current integral mismatch)
```

### 3.3 Behavioral IoCs

**Grid Frequency Anomalies:**

```
### Death Wobble Signature
- Frequency oscillation: 0.5-2 Hz periodic variation
- RoCoF sustained: >0.2 Hz/s for >30 seconds
- BESS power synchronization: Multiple BESS units switching simultaneously
- Load factor inversion: DER export during peak demand period
```

**SCADA Telemetry Anomalies:**

```
### Process Data Indicators
- Feeder loading oscillation correlating with BESS dispatch
- Voltage instability: >5% variation within 60-second window
- Relay trip clustering: >3 protection relays within 10-minute window
- BESS SOC convergence: All batteries reaching same SOC simultaneously (unnatural)
```

### 3.4 Threat Intelligence IoCs

**Known Malicious Infrastructure (Illustrative Examples):**

```
### IP Addresses (update with current threat intel)
- 203.0.113.0/24: VOLTZITE C2 infrastructure (2025-Q4)
- 198.51.100.0/24: Sandworm staging servers (2024-Q2)
- 192.0.2.0/24: FrostyGoop Modbus scanners (2025-Q1)

### Domains
- derms-update[.]com: Fake mPrest update server
- RefDNSP-1.2M-vpn[.]net: Phishing domain impersonating EE VPN portal
- scada-tools[.]org: Malicious OT tooling distribution

### File Hashes (SHA256)
- a3f5d... : Modbus exploit framework (FrostyGoop variant)
- b7c2e... : ICCP protocol fuzzer (public tool, misuse indicator)
- d9a1f... : DERMS credential harvester (VOLTZITE campaign)
```

**Yara Rule for DERMS Malware Detection:**

```yara
rule DERMS_API_Exploit_Framework
{
    meta:
        description = "Detects API exploitation tools targeting DERMS platforms"
        author = "EE CTI Team"
        date = "2026-02-12"
        severity = "CRITICAL"

    strings:
        $api1 = "api/v1/dispatch" ascii
        $api2 = "api/v1/control" ascii
        $auth = "Authorization: Bearer" ascii
        $batch = "batch_command" ascii
        $payload = "charge_discharge_cycle" ascii
        $freq = "target_frequency" ascii

    condition:
        3 of them and filesize < 1MB
}
```


---

## 4. Recovery and Resilience Procedures

**Black Start Procedures for NSW Grid Following Cascading Failure:**

A total system blackout (black system) requires sequential restoration from black start capable generators. NSW has limited black start capacity compared to other NEM regions:

**Black Start Capable Generation in NSW:**

| Facility                            | Type             | Capacity | Black Start Time | Location        | Restoration Sequence       |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Shoalhaven Scheme**         | Hydroelectric    | 240 MW   | 2-3 hours        | Kangaroo Valley | Priority 1 (southern NSW)  |
| **Bayswater Power Station**   | Coal (Units 1-4) | 2,640 MW | 6-8 hours        | Muswellbrook    | Priority 2 (Hunter Valley) |
| **Vales Point Power Station** | Coal (Units 5-6) | 1,320 MW | 6-8 hours        | Lake Macquarie  | Priority 3 (Central Coast) |

**Sequential Restoration Timeline (72-Hour Projection):**

```mermaid
gantt
    title NSW Grid Black Start and Restoration (Catastrophic Scenario)
    dateFormat HH:mm
    axisFormat %H:%M

    section Hour 0-4: Black Start Initiation
    Shoalhaven hydroelectric startup :crit, 00:00, 180m
    Station service power established : 03:00, 30m
    First 132kV transmission energized :crit, 03:30, 30m

    section Hour 4-8: Transmission Backbone
    Bayswater Unit 1 startup : 04:00, 300m
    Hunter Valley transmission corridor : 09:00, 60m
    Interconnector to Queensland (QNI) : 10:00, 120m

    section Hour 8-12: Critical Load Restoration
    Hospital feeders priority :crit, 08:00, 120m
    Water pumping stations : 10:00, 180m
    Emergency services : 10:30, 60m
    Sydney CBD partial : 11:30, 300m

    section Hour 12-24: Zone Progressive Restoration
    Western Sydney residential : 12:00, 480m
    Southern Highlands : 16:00, 360m
    Illawarra region : 20:00, 240m

    section Hour 24-48: Industrial and Commercial
    Manufacturing facilities : 24:00, 720m
    Commercial districts : 30:00, 540m
    Rail electrification : 36:00, 480m

    section Hour 48-72: Final Recovery
    Full residential coverage : 48:00, 960m
    System stability validation : 64:00, 480m
    Normal operations resumed : 72:00, 60m
```

**Critical Constraints Limiting Restoration Speed:**

1. **Black Start Capacity Limitations:**

   - Only 3 black start sources in NSW (vs. 8 in Queensland, 6 in Victoria)
   - Shoalhaven Scheme limited to 240 MW initial cranking power
   - Cannot re-energize entire NSW grid from single source
2. **Transformer Inrush Current Management:**

   - Transformers draw 5-10x normal current during energization (magnetizing inrush)
   - Must energize transformers sequentially, not simultaneously
   - 185 major substations × 10 minutes each = 30+ hours if strictly sequential
   - Parallel restoration gangs can reduce to 12-18 hours (limited by personnel)
3. **Thermal Cycling Constraints:**

   - Transformers that have been de-energized must cool before re-energization
   - Hot transformers (recently de-energized) require 2-4 hour cool-down
   - Cold transformers (>12 hours offline) require 6-8 hour warm-up (temperature differential stress)
4. **Synchronization Complexity:**

   - Generators must synchronize phase angle, frequency, voltage before paralleling
   - Manual synchronization: 15-30 minutes per generator
   - Automatic synchronization: 5-10 minutes (if control systems operational)
   - 50+ generators across NSW = 10-15 hours synchronization time
5. **BESS Fire Damage (If Thermal Attack Occurred):**

   - 15-54 BESS sites destroyed (no grid support capability)
   - Loss of 75-270 MW distributed generation
   - Loss of 150-540 MWh energy storage (cannot provide grid services during restoration)
   - Replacement lead time: implementation period required per unit

**Priority Restoration Hierarchy:**

```
Tier 1 - Immediate (Hours 0-4): Life Safety Systems
  - Hospital emergency departments (12 sites)
  - Police/Fire/Ambulance communications (18 sites)
  - Water treatment plants (4 critical facilities)
  - Wastewater pumping (prevent environmental contamination)

Tier 2 - Critical Infrastructure (Hours 4-12):
  - All hospitals (ICU, operating theatres)
  - Water distribution pumping (87 stations)
  - Telecommunications (420 cell towers)
  - RAAF Richmond (national security)
  - Garden Island Naval Base (national security)

Tier 3 - Essential Services (Hours 12-24):
  - Residential areas (progressive by zone)
  - Grocery stores and pharmacies
  - Fuel stations (enable emergency vehicles)
  - Banking data centers (economic infrastructure)

Tier 4 - Commercial/Industrial (Hours 24-48):
  - Manufacturing facilities
  - Commercial office buildings
  - Retail centers
  - Rail electrification

Tier 5 - Full Restoration (Hours 48-72):
  - All residential areas 100%
  - Industrial parks
  - Agricultural facilities
  - Non-essential commercial
```

**Restoration Challenges Specific to Cascading Cyber-Attack:**

Unlike natural disasters (storms, heatwaves) where equipment is physically damaged but configuration data remains intact, cyber-attacks may include wiper malware that destroys:

1. **SCADA Configuration Files:**

   - RTU addressing tables (which RTU controls which substation)
   - Protection relay settings (trip thresholds, time delays)
   - Load shedding schedules (which feeders to shed under UFLS)
   - Recovery: implementation period required to rebuild from paper records or offsite backups
2. **Engineering Workstation Operating Systems:**

   - Wiper malware (ORCSHRED, SOLOSHRED, CADDYWIPER) destroys Windows boot sectors
   - Cannot access SCADA systems to issue restoration commands
   - Recovery: implementation period required to rebuild workstations from clean images
3. **DERMS/ADMS Historical Data:**

   - Loss of load forecasting data (cannot predict demand during restoration)
   - Loss of grid topology models (uncertain which circuits are energized)
   - Recovery: implementation period required to rebuild state estimation from field measurements

**Mitigation: Offline Configuration Backups:**

**Recommendation:** Maintain air-gapped, write-once-read-many (WORM) backups of all critical configuration data:

- SCADA master station configuration (RTU addressing, alarming)
- Protection relay settings (SEL, ABB, Siemens relay files)
- DERMS/ADMS grid topology models
- Substation single-line diagrams (SLDs)
- Black start procedures (printed manuals, not digital-only)

**Cost:** band B (write-once storage appliance plus annual refresh; no public appliance price was located, and the band is the engineering judgement of section 9.1, not a quotation)
**Benefit:** stated as a mechanism, not a percentage. Offline, immutable copies of relay settings, SCADA configuration and topology models mean restoration does not depend on systems the attacker may still hold. No measured recovery-time reduction exists for this network, and the earlier draft's 66 percent had no source.


---

## 5. Stakeholder Communication and Coordination Protocols

**Multi-Agency Coordination During Cascading Failure Events:**

Cascading cyber-physical attacks on critical infrastructure require coordination across federal, state, and local government agencies, industry partners, and emergency services. This section defines communication protocols and decision-making hierarchies.

**Primary Stakeholder Matrix:**

| Stakeholder                                        | Role                                                    | Notification Threshold                                            | Contact Method                                                        | Response Time                                           |
| :--- | :--- | :--- | :--- | :--- |
| **AEMO (Australian Energy Market Operator)** | National grid coordination, emergency protocols         | Any grid frequency excursion >0.2 Hz OR loss of >500 MW           | Direct phone (Control Room Hotline) + email (emergencies@aemo.com.au) | <5 minutes                                              |
| **Australian Cyber Security Centre (ACSC)**  | Federal cyber incident response                         | Confirmed cyber-attack on critical infrastructure                 | ACSC Hotline 1300 292 371 + online reporting portal                   | <15 minutes acknowledgment                              |
| **NSW Department of Energy**                 | State energy policy and regulation                      | Major outage >100,000 customers OR critical infrastructure impact | Minister's office + departmental emergency line                       | <30 minutes                                             |
| **NSW Police - State Crime Command**         | Criminal investigation, evidence preservation           | Suspected cyber-attack (not natural fault)                        | Emergency 000 + Cybercrime Squad direct line                          | <30 minutes (patrol), <2 hours (detectives)             |
| **Fire and Rescue NSW**                      | BESS thermal events, hazmat response                    | Any BESS fire OR toxic gas release                                | Emergency 000 + Hazmat Coordinator direct line                        | <8 minutes (first appliance), <20 minutes (hazmat team) |
| **NSW Health**                               | Hospital emergency preparedness, medical surge          | Hospital backup power failure OR mass casualty event              | Emergency Management Branch 24/7 line                                 | <15 minutes                                             |
| **Australian Federal Police (AFP)**          | Counter-terrorism, critical infrastructure protection   | Attribution to nation-state OR coordinated attack                 | AFP National Operations State Service Centre                          | <1 hour                                                 |
| **Department of Defence**                    | RAAF Richmond, Garden Island impacts, national security | Defence facility power loss >4 hours                              | Defence Emergency Coordinator                                         | <30 minutes                                             |
| **Board of Directors**                       | Fiduciary oversight, crisis management approval         | Any P0 incident reaching cascade tier 2 of section 3.2, meaning 80,000 customers or more, OR any safety risk | Chairman mobile + Board Risk Committee                                | <2 hours (emergency meeting)                            |

**Communication Cascade Timeline:**

```
T+0 minutes: Incident Detection (OT SOC)
  Action: Verify attack vs. equipment fault
  Communication: Internal (Control Room, CISO, Operations Manager)

T+5 minutes: Incident Confirmation
  Action: Determine attack scope (localized vs. regional)
  Communication: AEMO (if grid frequency impacted), NSW Energy (if >10,000 customers)

T+15 minutes: Emergency Response Activation
  Action: Mobilize internal incident response team
  Communication: ACSC (cyber incident report), AFP (if critical infrastructure attack suspected)

T+30 minutes: Stakeholder Briefing
  Action: Prepare situation report (SITREP) with:
    - Affected customer count
    - Estimated restoration time
    - Attack vector (if known)
    - Safety risks
  Communication: Board Chairman, Minister's office, AEMO, ACSC, NSW Police

T+60 minutes: Media/Public Communication (if >100K customers affected)
  Action: Prepare media statement (approved by CEO + Board Chairman)
  Communication: Press release, social media, website update, customer SMS/email

T+2 hours: National Coordination (if attributed to nation-state)
  Action: National Security Committee of Cabinet (NSC) may convene
  Communication: Prime Minister's office, Defence, Home Affairs, ACSC
```

**Incident Classification Matrix:**

| Classification         | Customer Impact                       | Attack Attribution            | Notification Requirement         | Board Escalation              |
| :--- | :--- | :--- | :--- | :--- |
| **Minor**        | <10,000 customers, <4 hours           | Equipment fault (not cyber)   | AEMO (if frequency event)        | Weekly report                 |
| **Moderate**     | 10,000-100,000 customers, 4-8 hours   | Unknown (under investigation) | AEMO + NSW Energy + ACSC         | 24-hour briefing              |
| **Major**        | 100,000-500,000 customers, 8-24 hours | Suspected cyber-attack        | All stakeholders + AFP           | Immediate (emergency meeting) |
| **Catastrophic** | >500,000 customers, >24 hours         | Confirmed nation-state attack | All stakeholders + Defence + NSC | Immediate (Board convened)    |

**EE-CTI-006 Scenarios Mapped to Classification:**

| Scenario                                      | Classification                                                | Primary Stakeholders                        | Estimated Notification Count |
| :--- | :--- | :--- | :--- |
| **Death Wobble (Tier 2 Cascade)**       | Moderate (100,000 customers, 8-16 hours)                      | AEMO, ACSC, NSW Energy, Board               | 6 agencies                   |
| **Death Wobble (Tier 4 Collapse)**      | Catastrophic (1.2M customers, 24-72 hours)                    | All stakeholders + NSC                      | 12+ agencies                 |
| **BESS Thermal Runaway (15 sites)**     | Major (environmental hazard, 50,000 evacuations)              | Fire/Rescue, NSW Health, EPA, ACSC, Board   | 8 agencies                   |
| **Multi-Substation Attack (185 sites)** | Catastrophic (1.5M customers, 48-72 hours, national security) | All stakeholders + NSC + Five Eyes partners | 15+ agencies                 |

**Template: Initial SITREP (Situation Report)**

```
CONFIDENTIAL - FOR OFFICIAL USE ONLY

RefDNSP-1.2M CRITICAL INCIDENT SITREP #001

Date/Time: [YYYY-MM-DD HH:MM AEDT]
Incident Commander: [Name, Title]
Incident Classification: [Minor/Moderate/Major/Catastrophic]

SITUATION OVERVIEW:
- Incident Type: [Cyber-attack / Equipment Failure / Natural Disaster]
- Attack Vector: [Death Wobble Oscillation / Thermal Runaway / Multi-Substation / Unknown]
- First Detection: [YYYY-MM-DD HH:MM]
- Current Status: [Ongoing / Contained / Resolved]

IMPACT ASSESSMENT:
- Customers Affected: [Number] residential, [Number] commercial
- Critical Infrastructure: [Hospitals / Water / Defence / Other]
- Estimated Restoration: [Timeline]
- Safety Risks: [Fatalities / Injuries / Evacuations]

RESPONSE ACTIONS TAKEN:
1. [Emergency protocols activated]
2. [Stakeholder notifications completed]
3. [Restoration efforts underway]

ASSISTANCE REQUIRED:
- [External resources needed]
- [Mutual aid requests]

NEXT SITREP: [HH:MM] or upon significant development

Prepared by: [Name, Title]
Approved by: [CISO / CEO]
Distribution: [Stakeholder list]
```

**Legal and Regulatory Reporting Obligations:**

Under the Security of Critical Infrastructure Act 2018 (SOCI Act), RefDNSP-1.2M has mandatory reporting obligations:

**SOCI Act Reporting Timeline:**

| Event Type                                   | Reporting Deadline                         | Recipient                            | Penalty for Non-Compliance             |
| :--- | :--- | :--- | :--- |
| **Cyber Security Incident**            | 12 hours after becoming aware              | ACSC (via CISC portal)               | Not stated; see note below             |
| **Critical Infrastructure Risk**       | implementation period after identification | Secretary of Home Affairs            | Not stated; see note below             |
| **Enhanced Cyber Security Obligation** | Annual compliance report                   | ASD (Australian Signals Directorate) | Not stated; see note below             |

No penalty amount is stated for any of the three obligations above. No SOCI Act penalty schedule and no enforcement precedent against an Australian distribution network service provider was sourced for this paper, and section 5.8 and section 5.10 record the same exclusion. A drafter with access to the Act's civil penalty provisions should insert the unit amounts directly from the instrument rather than from any figure in this document. The one settled regulatory outcome this paper can cite for a comparable event is Ofgem's, after the Great Britain outage of 9 August 2019: about GBP 10.5 million in voluntary redress payments across four licensees, with no formal determination of breach [n].

**Incident Report Content Requirements (SOCI Act):**

1. Nature of the incident (attack vector, systems affected)
2. Time of occurrence and detection
3. Impact on operations (customer count, duration)
4. Immediate response actions taken
5. Estimated restoration timeline
6. Lessons learned and preventive measures

**Board Reporting Template: Quarterly Cyber-Physical Risk Report**

```
RefDNSP-1.2M BOARD OF DIRECTORS
QUARTERLY CYBER-PHYSICAL RISK REPORT

Reporting Period: Q[X] [YEAR]
Presented by: Chief OT Security Officer
Date: [Board Meeting Date]

EXECUTIVE SUMMARY:
[2-3 paragraphs on overall risk posture, key changes, major incidents]

SECTION 1: THREAT PICTURE
- Nation-state activity: [Summary of Sandworm, FrostyGoop, VOLTZITE developments]
- Industry incidents: [Attacks on peer utilities globally]
- Vulnerability disclosures: [New CVEs affecting EE infrastructure]

SECTION 2: SECURITY POSTURE METRICS
| Metric | Target | Current | Trend | Commentary |
| :--- | :--- | :--- | :--- | :--- |
| IEC 62443 Compliance | 80% | [X]% | [↑/↓/→] | [Analysis] |
| Attack Surface Score | ≤3.0 | [X.X] | [↑/↓/→] | [Analysis] |
| Mean Time to Detect | <15 min | [X] min | [↑/↓/→] | [Analysis] |
| Mean Time to Respond | <2 hours | [X] hours | [↑/↓/→] | [Analysis] |

SECTION 3: INCIDENTS AND NEAR-MISSES
[Table of P0/P1 incidents, response effectiveness, root causes]

SECTION 4: INVESTMENT PROGRAM STATUS
| Initiative | Budget | Spend to Date | Completion % | On Track? |
| :--- | :--- | :--- | :--- | :--- |
| Death Wobble Detection | [Approved budget] | $[X]K | [X]% | [Y/N] |
| Modbus Security Gateway | [Approved budget] | $[X]K | [X]% | [Y/N] |
| [Other initiatives...] | | | | |

SECTION 5: REGULATORY COMPLIANCE
- SOCI Act: [Compliance status, incidents reported]
- AESCSF SP2: [Progress toward 80% target]
- IEC 62443: [Gap closure timeline]

SECTION 6: RECOMMENDATIONS
[Board-level decisions required, capital approvals, policy changes]

APPENDIX: RISK HEAT MAP
[Visual representation of residual risks across attack vectors]
```

**Crisis Communication Plan: Public and Media Relations**

During major cascading failure events (>100,000 customers), RefDNSP-1.2M must communicate with:

1. **Affected Customers:** SMS, email, website, social media (Twitter/X, Facebook)
2. **Media:** Press releases, press conferences, media spokesperson availability
3. **Government:** Minister's office, local MPs, councils
4. **Industry:** AEMO, peer utilities (mutual aid coordination)

**Template: Public Media Statement (Major Incident):**

```
FOR IMMEDIATE RELEASE

RefDNSP-1.2M INCIDENT UPDATE: [DATE, TIME]

POWER OUTAGE AFFECTING [X] CUSTOMERS IN [REGION]

RefDNSP-1.2M is responding to a major power outage affecting approximately [X] customers across [region names]. The outage began at [time] and is due to [equipment failure/under investigation].

AFFECTED AREAS:
[List of suburbs/towns]

ESTIMATED RESTORATION:
We are working to restore power as quickly and safely as possible. Current estimates:
- Priority areas (hospitals, emergency services): [X] hours
- Residential areas: [X] hours to [X] hours
- Full restoration: [X] hours

SAFETY INFORMATION:
- Stay clear of downed power lines
- If using a generator, follow manufacturer safety guidelines
- Conserve battery power on mobile devices
- Check on vulnerable neighbors

UPDATES:
For the latest information:
- Website: refdnsp.example.com.au/outages
- SMS updates: Register at [link]
- Customer hotline: 131 003

We apologize for the inconvenience and appreciate your patience.

MEDIA CONTACT:
[Name], [Title]
Mobile: [Number]
Email: [Address]

[LOGO] RefDNSP-1.2M
```

**Lessons Learned Process:**

After any P0 or P1 incident, RefDNSP-1.2M must conduct formal lessons learned review:

**Timeline:**

- Immediate (T+24 hours): Hot wash debrief with incident response team
- Short-term (T+implementation period): Detailed incident analysis report
- Medium-term (T+implementation period): Root cause analysis and corrective action plan
- Long-term (T+implementation period): Validation of corrective actions, update to security controls

**Lessons Learned Report Sections:**

1. Incident timeline (minute-by-minute)
2. What worked well (effective controls, successful response actions)
3. What didn't work (control failures, missed detection opportunities)
4. Root causes (technical, process, human factors)
5. Corrective actions (specific, measurable, assigned ownership)
6. Preventive measures (how to prevent recurrence)
7. Applicability to other scenarios (broader lessons)

**Knowledge Sharing:**

- Internal: Update incident response playbooks, training materials
- Industry: Share anonymized lessons with AEMO, peer utilities (Energy Networks Australia)
- Government: Briefing to ACSC, Home Affairs (if cyber-attack)
- International: Participation in ICS-CERT, CISA information sharing programs

