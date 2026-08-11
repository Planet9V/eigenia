---
type: system
category: smart-metering
status: draft
domain: IT
tags:
  - domain/IT/portal
  - topic/smart-metering/diagnostics
  - org/endeavour-energy
  - asset/software
related:
  - "[[Smart Meters]]"
  - "[[AMI Head-End]]"
  - "[[Operations Cockpit]]"
  - "[[Meter Data Management]]"
created: 2026-02-12
updated: 2026-02-12
---

# Smart Meter Live Monitoring

Real-time status and health monitoring of individual smart meters across the distribution network. Smart Meter Live Monitoring provides granular visibility into meter communication state, firmware versions, voltage quality, and operational anomalies, enabling proactive detection of hardware failures, communication issues, and tampering events before they impact billing accuracy or grid reliability.

## Overview

Smart Meter Live Monitoring systems track the operational status of individual [[Smart Meters|smart meters]] at the edge of the [[AMI Head-End|Advanced Metering Infrastructure (AMI)]] network. Unlike aggregated fleet health metrics displayed in the [[Operations Cockpit]], live monitoring focuses on per-meter diagnostics and historical event logs that field technicians and network engineers use to troubleshoot connectivity problems, validate firmware deployments, and investigate customer service issues. The system maintains detailed time-series data on communication attempts, response times, and meter state changes for analysis and compliance reporting.

## How It Works

**Metrics Collected**
- Communication Status: Last successful contact timestamp, polling success/failure ratios, and protocol-level responses
- Firmware Version and Status: Current firmware build, deployment date, and rollback history
- Voltage Quality: RMS voltage measurements, harmonic distortion levels, and out-of-range event counts
- Temperature and Signal Strength: Internal meter temperature, cellular/mesh signal quality for diagnostics
- Event Logs: Tamper alerts, outage notifications, time synchronization events, and configuration changes

**Anomaly Detection**
The monitoring system flags meters that exceed normal thresholds: communication silent for more than expected intervals, voltage consistently outside nominal ranges (230V +/-10%), firmware versions mismatched from deployment schedules, or repeated tamper alerts. Automated workflows categorize anomalies by severity and recommended action (diagnostic check, firmware remediation, field visit scheduling).

**Alerting and Investigation**
Operations teams receive notifications of critical anomalies with meter location, National Metering Identifier (NMI), and customer connection details. Engineers can drill into detailed meter event logs, retrieve recent waveform captures if available, and trace communication failures back to specific network segments or communication infrastructure problems.

## Relevance to Endeavour Energy

Network reliability depends on accurate, timely data collection from meters. Smart Meter Live Monitoring enables rapid identification of meter communication failures before they cascade into data gaps that compromise billing accuracy and customer service. Proactive voltage quality monitoring identifies distribution network problems (such as transformer overloads or loose connections) that degrade power quality. Tamper detection protects against meter bypass attacks and energy theft. Firmware compliance tracking ensures the meter fleet operates at supported versions with active security patches, reducing vulnerability windows for cyber incidents.

## Related Concepts

- [[Smart Meters]] — Individual meter devices and their operational architecture
- [[AMI Head-End]] — Central system coordinating meter communications and data collection
- [[Operations Cockpit]] — Fleet-level health dashboard aggregating individual meter status
- [[Meter Data Management]] — Data validation and quality assurance processing

## References

- Advanced Metering Infrastructure: Operational Monitoring and Diagnostics
- Smart Grid Monitoring: Real-Time Meter Status and Anomaly Detection Strategies
- DLMS/COSEM Event Log Standards (IEC 62056)
- Utility Field Operations: Meter Diagnostics and Troubleshooting Procedures

