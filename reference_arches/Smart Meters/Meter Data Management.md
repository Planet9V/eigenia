---
aliases:
  - MDM
type: system
category: smart-metering
status: complete
domain: IT
tags:
  - domain/IT/integration
  - topic/smart-metering/data-management
  - org/endeavour-energy
  - asset/software
related:
  - "[[Head-End]]"
  - "[[Billing]]"
  - "[[Meter Data Storage]]"
created: 2026-02-12
updated: 2026-02-12
---

# Meter Data Management System (MDMS)

A Meter Data Management System serves as the critical processing engine that transforms raw [[Smart Meters|smart meter]] data into validated, actionable information for [[Billing|billing]], [[Network Operations|network operations]], and market settlement. MDMS platforms collect interval data from the [[AMI Head-End|AMI head-end]], apply sophisticated validation rules, and distribute processed data to downstream enterprise systems.

## Overview

The MDMS sits at the center of the [[AMI Architecture|AMI data chain]], receiving consumption data from the [[Head-End|head-end system]] and preparing it for multiple business applications. For [[Type 4 Meters|Type 4 meters]] in Australia, this involves processing 5-minute to 30-minute interval data collected via [[DLMS COSEM|DLMS/COSEM protocol]]. Under [[National Electricity Rules|NER Rule 7.3]], the [[Metering Coordinator]] holds responsibility for ensuring data collection and processing meet regulatory standards.

The system manages data flows to billing platforms, network planning tools, [[Advanced Distribution Management System|ADMS]] for grid operations, and [[AEMO]] for wholesale market settlement. This multi-directional data distribution requires robust integration capabilities and real-time processing performance.

## How It Works

MDMS platforms employ Validation, Estimation, and Editing (VEE) processes to ensure data quality. Validation identifies missing intervals, consumption anomalies, and communication failures. Estimation algorithms fill data gaps using historical patterns, weather correlations, and similar customer profiles. Editing functions allow authorized corrections while maintaining full audit trails for regulatory compliance.

Data processing pipelines typically operate on hourly or daily cycles, though critical applications may require near-real-time processing. The system applies business rules for tariff calculations, demand response events, and outage detection before routing processed data to appropriate consumers.

## Validation, Estimation, and Editing (VEE) Engine

**Validation Rules and Quality Checks**

MDMS platforms employ comprehensive validation logic detecting data anomalies before downstream distribution. Validation rules identify:

- **Missing intervals**: Gaps in expected 5-minute or 30-minute data sequences
- **Consumption spikes**: Readings exceeding historical patterns by configurable thresholds (e.g., >200% of average)
- **Zero consumption anomalies**: Extended periods of zero usage suggesting meter faults or communication failures
- **Reverse energy flow**: Negative consumption indicating solar export without proper configuration
- **Timestamp inconsistencies**: Clock drift or daylight saving transition errors
- **Communication failures**: Extended periods without successful meter polling

Failed validation triggers automated workflows: retry collection attempts, escalate to field technicians for physical meter inspection, or flag for manual review by metering coordinators.

**Estimation Algorithms for Missing Data**

When validation identifies missing intervals, estimation algorithms fill gaps using statistical methods:

- **Historical pattern matching**: Compare to same customer's usage on equivalent days (e.g., prior Tuesday with similar weather)
- **Weather normalization**: Adjust estimates based on temperature correlation with heating/cooling loads
- **Similar customer profiles**: Use aggregated patterns from comparable households (size, location, tariff type)
- **Linear interpolation**: For short gaps (1-2 intervals), interpolate between surrounding valid readings

Estimation quality varies with gap duration. Short outages (1-4 hours) achieve high accuracy through interpolation. Multi-day communication failures require broader pattern matching with reduced confidence. All estimates carry quality flags indicating estimation method and confidence level for downstream systems.

**Editing and Manual Corrections**

Authorized personnel can manually correct validated data when automated processes fail or special circumstances arise (meter swap-outs, customer-reported billing disputes, detected meter malfunction). All edits maintain complete audit trails recording:

- Original value, corrected value, and reason code
- Timestamp and user credentials of the editing action
- Supporting documentation (photos, field notes, customer correspondence)

This audit capability satisfies regulatory requirements for billing dispute resolution and ensures data integrity for market settlement.

## Integration Architecture and Data Distribution

**Upstream Connections to AMI Head-End**

MDMS platforms receive continuous data streams from [[AMI Head-End]] systems managing field area networks (FAN). For Endeavour Energy's [[Intellihub]] deployment, this involves DLMS/COSEM protocol translation, bulk file transfers (typically CSV or XML), and real-time data push for near-real-time monitoring applications. Connection reliability requires redundant communication paths and automated failover mechanisms.

**Downstream Distribution to Enterprise Systems**

Validated meter data feeds multiple business applications:

- **[[Billing]] systems**: Interval data export to MSATS for retailer consumption
- **[[ADMS]] platforms**: Real-time load profiles for distribution circuit monitoring
- **[[Customer Portal]]**: Self-service consumption visualization and tariff comparison tools
- **Network planning tools**: Historical demand analysis for infrastructure investment decisions
- **[[Demand Response]] programs**: Participant performance measurement and baseline calculation
- **Regulatory reporting**: Aggregated statistics for [[AEMO]] and [[AER]] compliance obligations

Each downstream system requires specific data formats, refresh frequencies, and quality thresholds. MDMS platforms manage these diverse integration requirements through configurable export schedulers and protocol adapters.

## Relevance to Endeavour Energy

For Endeavour Energy's network with 700,000 grid monitoring points spanning residential, commercial, and industrial customer segments, MDMS provides the essential processing layer transforming raw meter readings into trusted business intelligence. The platform supports billing accuracy affecting customer satisfaction, enables demand response programs reducing peak infrastructure strain, and feeds validated consumption patterns into the [[Advanced Distribution Management System|ADMS]] for real-time network optimization.

Endeavour Energy's MDMS implementation must handle peak data volumes exceeding 50 million interval reads per day while maintaining sub-second processing latency for real-time applications. System reliability directly impacts billing accuracy, regulatory compliance, and operational visibility—making MDMS one of the most business-critical platforms in the digital infrastructure portfolio.

## Related Concepts

- [[AMI Head-End]] - upstream data collection system
- [[Collection]] - meter reading and data gathering processes
- [[Meter Data Storage]] - long-term data retention and archiving
- [[Billing]] - downstream consumption billing systems
- [[Head-End]] - communication infrastructure for meter networks
- [[DLMS COSEM]] - protocol for meter communication
- [[Type 4 Meters]] - Australian interval metering classification
- [[Metering Coordinator]] - regulatory role for data management

## Related Concepts

- [[Intellihub]] - Smart meter platform deployed by Endeavour Energy
- [[ADMS]] - Advanced distribution management consuming validated meter data
- [[Demand Response]] - Programs requiring accurate baseline measurement
- [[Customer Portal]] - Self-service consumption visualization
- [[Network Planning]] - Historical demand analysis for infrastructure investment
- [[MSATS]] - Market settlement data exchange managed by AEMO
- [[Validation Estimation Editing]] - Core MDMS data quality processes
- [[Metering Coordinator]] - Regulatory role responsible for data management

## References

- [National Electricity Rules (NER) Rule 7.3 - Metering Coordinator Responsibilities](https://www.aemc.gov.au/regulation/energy-rules/national-electricity-rules/current)
- [AEMO Metering Data Validation Procedures](https://www.aemo.com.au/energy-systems/electricity/national-electricity-market-nem/participate-in-the-market/market-settlements-and-transfers/metering)
- [IEC 62056 DLMS/COSEM Application Layer Standards](https://www.iec.ch/homepage)
- [Oracle Utilities Meter Data Management - Product Documentation](https://www.oracle.com/utilities/)
- [SEL RTAC SCADA and Metering Integration](https://selinc.com/)
- [AER Metering Installation Data Storage Guidelines](https://www.aer.gov.au/networks-pipelines/guidelines-schemes-models-reviews/metering-installation-data-storage-guideline)
- [Endeavour Energy Smart Meter Deployment](https://www.endeavourenergy.com.au/connections-and-meters/meters/smart-meters)
- [MDMS Best Practices - Utility Analytics Institute](https://www.utilityanalytics.com/)
