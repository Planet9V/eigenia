---
type: concept
category: smart-metering
status: complete
domain: OT
tags:
  - domain/OT/substation
  - topic/networking/protocols
  - asset/physical
related:
  - "[[Smart Meters]]"
  - "[[Plug-in Communication Module]]"
  - "[[AMI Head-End]]"
  - "[[Intellihub]]"
created: 2026-02-12
updated: 2026-02-12
---

## Field Communication

Field communication refers to the wireless and wired transmission protocols that enable [[Smart Meters]] to transmit consumption data, receive remote commands, and maintain grid connectivity with [[AMI Head-End]] systems. For Australian networks like [[Intellihub]], this encompasses cellular, mesh, and Wi-Fi technologies operating under the DLMS/COSEM standard.

## Overview

Australian Advanced Metering Infrastructure (AMI) networks must support real-time data collection from thousands of meters while maintaining security, reliability, and redundancy across geographically dispersed service areas. Field communication architecture addresses three critical challenges: coverage in remote regions, latency requirements for demand response, and resilience against network interruptions.

[[Intellihub]] Type 4 meters employ multiple communication pathways—LTE-Cat M for wide-area coverage, Wi-SUN mesh for local area reliability, and Wi-Fi as tertiary backup. This multi-protocol approach ensures meters can reach head-end systems even when primary connectivity fails.

## How It Works

Meter data collection follows a hierarchical flow: meters encode readings in DLMS/COSEM format, transmit via available communication channels, and repeat across mesh networks until reaching a concentrator. Concentrators aggregate multiple meter streams and forward consolidated data to [[AMI Head-End]] systems over cellular networks. [[Plug-in Communication Module]] hardware interfaces enable meter retrofitting with upgraded communication capabilities without full meter replacement.

Remote services depend on this bidirectional channel: head-end systems send time-of-use tariff updates, firmware patches, and service commands downstream to individual meters.

## Multi-Technology Communication Architecture

**LTE-Cat M1 Wide Area Networks**

Cellular connectivity provides primary wide-area coverage for [[Intellihub]] meters across Endeavour Energy's 25,000 square kilometer service territory. LTE-Cat M1 (LTE Category M1) optimizes for low-power, low-bandwidth IoT applications:

- **Coverage advantages**: Leverages existing cellular infrastructure with extended range (10-15km from towers) reaching remote substations
- **Power efficiency**: Sleep modes and optimized signaling reduce battery consumption for backup power scenarios
- **Bandwidth sufficiency**: 1 Mbps downlink supports interval data transmission, firmware updates, and remote commands
- **Security framework**: Native SIM-based authentication and AES encryption protecting metering data
- **Carrier redundancy**: Multi-carrier SIM cards enable automatic failover between Telstra, Optus, and Vodafone networks

Cellular communication eliminates reliance on distribution network infrastructure (which may fail during outages), ensuring meters report fault conditions even when grid power collapses.

**Wi-SUN Mesh Networks for Local Area Coverage**

Wi-SUN (Wireless Smart Ubiquitous Network) mesh topology provides redundant communication paths in dense urban deployments:

- **Multi-hop routing**: Meters relay messages through neighboring devices, creating self-healing networks resistant to individual node failures
- **IEEE 802.15.4g physical layer**: Sub-GHz frequencies (915-928 MHz in Australia) penetrate buildings and foliage better than 2.4 GHz Wi-Fi
- **Scalability**: Thousands of meters can join mesh networks without bandwidth degradation through frequency hopping and time-division multiplexing
- **Cost efficiency**: Shared mesh infrastructure reduces per-meter communication costs compared to individual cellular connections

Mesh networks excel in high-density residential areas where meters cluster within radio range, while cellular handles dispersed rural deployments.

**Wi-Fi as Tertiary Backup**

Consumer-grade Wi-Fi (IEEE 802.11 b/g/n) provides opportunistic connectivity where customer broadband networks permit:

- **Zero infrastructure cost**: Leverages existing home/business wireless networks
- **High bandwidth**: Supports rapid firmware updates and diagnostic data collection
- **Customer opt-in**: Requires explicit permission and network credential sharing
- **Limited deployment**: Applicable to <5% of meters due to customer privacy concerns and network accessibility

## DLMS/COSEM Application Protocol

**Standardized Metering Data Model**

IEC 62056 DLMS/COSEM defines a vendor-neutral object model for smart meter data exchange:

- **OBIS codes**: Standardized addressing for meter registers (e.g., 1.8.0 = total active energy import, 2.8.0 = active energy export for solar)
- **Data classes**: Abstract representations of measurements, profiles, registers, and configuration parameters
- **Security layers**: DLMS Application Layer Security encrypts payloads and authenticates commands
- **Interoperability**: Enables multi-vendor deployments where head-end systems communicate with different meter manufacturers

This standardization protects investments—Endeavour Energy can replace individual meter models without modifying backend systems.

**Remote Service Capabilities**

Bidirectional communication enables remote meter management eliminating truck rolls:

- **Tariff updates**: Push new time-of-use pricing schedules to meters without site visits
- **Firmware patches**: Remotely deploy security updates and bug fixes across the fleet
- **Service switching**: Connect/disconnect supply for new/departing customers via software commands
- **Demand limits**: Configure export restrictions for [[Flexible Exports Program]] participants
- **Diagnostic retrieval**: Query detailed power quality logs, event histories, and communication statistics

Remote service capabilities reduce operational costs by 60-80% compared to manual meter operations.

## Communication Network Security

**Encryption and Authentication**

Field communication channels implement defense-in-depth security:

- **Transport layer**: TLS 1.3 encrypting cellular and IP-based data streams
- **Application layer**: DLMS Application Layer Security with AES-128 GCM encryption
- **Device authentication**: Mutual TLS certificates validating meter and head-end identities
- **Key management**: Centralized key distribution systems rotating encryption keys periodically

[[AESCSF]] compliance requires segmentation between metering networks and corporate IT, with firewalls controlling data flows to [[AMI Head-End]] systems.

**Intrusion Detection and Anomaly Monitoring**

Network monitoring systems track communication patterns identifying security incidents:

- **Unauthorized access attempts**: Failed authentication events triggering alerts
- **Abnormal traffic volumes**: Sudden spikes suggesting compromised meters or coordinated attacks
- **Geographic anomalies**: Meters reporting from unexpected locations indicating physical tampering
- **Protocol violations**: Malformed DLMS messages revealing exploitation attempts

## Relevance to Endeavour Energy

Real-time field communication enables Endeavour Energy to monitor distribution network performance across 700,000+ meters, implement demand-side response programs, and detect power quality incidents at granular visibility levels previously impossible with monthly manual meter reading. Remote reconnection/disconnection capability optimizes customer service and reduces dispatch costs, with service switching operations completing in minutes versus hours/days for truck roll-based processes.

Multi-technology communication architecture ensures network resilience—when cellular networks fail during disasters, mesh networks maintain local connectivity enabling outage detection and restoration coordination. This redundancy protects revenue (accurate billing during communication disruptions) and operational visibility (grid monitoring during emergency conditions).

Field communication reliability directly affects [[Meter Data Management]] data quality, [[Billing]] accuracy, and [[ADMS]] situational awareness—making communication infrastructure as critical as the meters themselves.

## Related Concepts

- [[Smart Meters]] - Endpoint devices with integrated communication modules
- [[Plug-in Communication Module]] - Retrofittable communication hardware
- [[AMI Head-End]] - Central data collection and command dispatch systems
- [[Intellihub]] - Smart meter platform deployed by Endeavour Energy
- [[DLMS COSEM]] - IEC 62056 application protocol for metering
- [[Wi-SUN]] - Wireless mesh networking standard for smart grid
- [[LTE-Cat M1]] - Cellular IoT connectivity optimized for low power
- [[AESCSF]] - Australian cyber security framework for energy sector
- [[Meter Data Management]] - Backend systems consuming communication data
- [[Flexible Exports Program]] - Programs requiring remote meter configuration
- [[Network Security]] - Encryption and authentication protecting communication channels
- [[Remote Service Switching]] - Customer connect/disconnect via software commands

## References

- [Australian Energy Market Commission - Smart Meter Guidelines](https://www.aemc.gov.au/)
- [IEC 62056 DLMS/COSEM Specification](https://www.dlms.com/)
- [Intellihub Technical Documentation](https://www.intellihub.com.au/)
- [Wi-SUN Alliance - IEEE 802.15.4g Mesh Networking](https://www.wi-sun.org/)
- [LTE-Cat M1 for IoT Applications - 3GPP Technical Specifications](https://www.3gpp.org/)
- [AESCSF Security Framework](https://www.energy.gov.au/government-priorities/energy-security/australian-energy-sector-cyber-security-framework)
- [IEEE 802.11 Wireless LAN Standards](https://standards.ieee.org/)
- [TLS 1.3 RFC 8446 - Transport Security](https://tools.ietf.org/html/rfc8446)
- [Endeavour Energy AMI Communication Architecture](https://www.endeavourenergy.com.au/)
- [NIST Smart Grid Communication Standards](https://www.nist.gov/smartgrid)