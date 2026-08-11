---
type: system
category: smart-metering
status: draft
domain: IT
tags:
  - domain/IT/portal
  - topic/smart-metering/operations
  - org/endeavour-energy
  - asset/software
related:
  - "[[AMI Head-End]]"
  - "[[Meter Data Management]]"
  - "[[Smart Meter Live Monitoring]]"
created: 2026-02-12
updated: 2026-02-12
---

# Operations Cockpit

Real-time operational dashboard providing visibility into the health, status, and performance of the AMI meter fleet. The Operations Cockpit enables network monitoring teams to detect issues proactively, dispatch field crews efficiently, and maintain system reliability across the distribution network.

## Overview

The Operations Cockpit serves as the central command center for AMI operations, aggregating data from thousands of smart meters and network infrastructure. It displays critical metrics that indicate network health, identifies communication failures, flags firmware inconsistencies, and alerts to outage events. Field operations teams use the dashboard to prioritize maintenance activities and respond to network anomalies before they escalate into service disruptions.

## How It Works

**Key Performance Indicators**
- Communication Success Rate: percentage of meters successfully contacted within reporting intervals
- Firmware Version Compliance: distribution of firmware versions across the fleet with alerts for unsupported versions
- Meter Status Health: online/offline counts and trending analysis
- Data Quality Metrics: missing or corrupted reading counts indicating potential meter or communication issues

**Alerting and Escalation**
The cockpit generates alerts when success rates drop below thresholds, firmware falls out of sync, or meter clusters go offline. Automated workflows escalate critical events to operations teams with geographic information and meter details, enabling targeted field dispatch.

**Integration Points**
The Operations Cockpit connects with the [[AMI Head-End]] for real-time meter communications data, receives processed consumption records from [[Meter Data Management]], and incorporates detailed meter status information from [[Smart Meter Live Monitoring]] systems.

## Relevance to Endeavour Energy

Network reliability is fundamental to Endeavour Energy's service delivery. The Operations Cockpit provides the visibility needed to maintain consistent communication with the meter fleet, ensuring accurate billing data collection and enabling rapid response to network degradation. Proactive identification of communication issues supports preventive maintenance strategies that reduce emergency dispatch costs.

## Related Concepts

- [[AMI Head-End]] — Network communications platform and meter management
- [[Meter Data Management]] — Data validation and consumption processing
- [[Smart Meter Live Monitoring]] — Individual meter status tracking and diagnostics

## References

- Advanced Metering Infrastructure: Industry Standards and Operational Best Practices
- Utility Operations: Real-Time Monitoring and Fleet Management Strategies

