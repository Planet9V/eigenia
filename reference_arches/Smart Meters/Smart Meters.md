---
aliases:
  - Smart Meter
  - Advanced Meter
type: concept
category: smart-metering
status: draft
domain: OT
tags:
  - domain/OT
  - topic/smart-metering/AMI
  - org/endeavour-energy
  - asset/physical
related:
  - "[[AMI Head-End]]"
  - "[[Meter Controller]]"
  - "[[Intellihub]]"
  - "[[Field Communication]]"
created: 2026-02-12
updated: 2026-02-12
---

**Smart Meters** are advanced electricity meters that record energy consumption data at 30-minute or shorter intervals and communicate that data remotely to the utility and other authorized parties. They replace traditional accumulation meters with two-way digital communication capability.

## Overview

Smart meters form the edge layer of the [[AMI Head-End|Advanced Metering Infrastructure (AMI)]] network, connecting approximately 700,000 monitoring points across Endeavour Energy's western Sydney service territory. In Australia, Type 4 meters with remote communication capability became mandatory for all new connections and replacements from December 2017 under National Electricity Rules (NER). These devices enable time-of-use billing, remote service connection/disconnection, and real-time grid monitoring without manual meter reading.

The dominant smart meter provider in New South Wales is [[Intellihub]], which supplies modular meters supporting multiple communication protocols (LTE Cat-M1, Wi-SUN mesh networking, Wi-Fi). Each meter receives a unique [[National Metering Identifiers|National Metering Identifier (NMI)]] of 10-11 digits that identifies the connection point in the National Electricity Market. Under NER Rule 7.3, a [[Metering Coordinator]] manages the meter lifecycle, data collection, and validation on behalf of retailers and network operators.

Smart meters differ from earlier meter types: Type 5 meters record 30-minute interval data but require manual reading, while Type 6 meters are basic accumulation devices being phased out. Type 4 meters provide automated interval data collection and bidirectional communication with the [[AMI Head-End]], enabling dynamic grid management and customer services through the [[Customer Portal]].

## How It Works

### Hardware Components

The smart meter consists of a primary metering element (measuring voltage, current, power factor), a [[Metering Module]] containing interval data registers and event logs, and a [[Meter Controller]] that manages communication protocols and security functions. [[Intellihub]] meters use a modular architecture where the communication module can be swapped without replacing the entire meter, extending device lifecycle and enabling technology upgrades (such as migrating from 3G to LTE Cat-M1 networks).

The metering element measures Active Power (kW), Reactive Power (kVAr), voltage (V), and current (A) at sub-second intervals, then aggregates these measurements into 30-minute interval records stored in non-volatile memory. The device maintains at least 90 days of interval data locally, with automated daily uploads to the [[AMI Head-End]] via the [[Field Communication]] network.

### Communication Protocols

Smart meters implement the DLMS/COSEM (IEC 62056) protocol suite for meter data exchange, providing standardized object modeling for registers, load profiles, and configuration parameters. The [[Meter Controller]] establishes secure sessions using authentication and encryption (typically AES-128) before allowing data reads or configuration changes. Communication occurs over multiple physical layers depending on deployment scenario: LTE Cat-M1 cellular for remote or difficult-to-reach sites, Wi-SUN mesh networking for dense urban deployments, or Wi-Fi for customer-owned networks.

The [[Field Communication]] network handles both scheduled data collection (daily interval data uploads) and event-driven messaging (power outage notifications, tamper alerts, voltage quality events). The [[AMI Head-End]] system polls meters on regular schedules and processes incoming alarm messages in near real-time, forwarding relevant events to network operations systems and retailers.

### Data Collection and Services

The [[Metering Coordinator]] configures collection schedules and data validation rules in the [[AMI Head-End]]. Interval data flows from meters through the communication network to the head-end system, where it undergoes validation (checking for gaps, suspect readings, time synchronization errors) before being made available to retailers and network operators. Validated data appears in the [[Customer Portal]] typically within 24 hours, enabling customers to monitor consumption patterns and respond to price signals.

Remote service operations leverage the bidirectional communication channel. In New South Wales, smart meters include a remotely operable service switch that enables connection and disconnection without a field visit. The [[AMI Head-End]] queues service orders received from retailers, dispatches commands to specific meters via their [[National Metering Identifiers|NMI]], and confirms successful execution. This capability reduces service connection times from days to hours and eliminates truck rolls for routine operations.

## Relevance to Endeavour Energy

Endeavour Energy uses smart meter data from 700,000 monitoring points to manage distribution network stability and optimize grid operations. The 30-minute interval data reveals localized demand patterns, voltage fluctuations, and power quality issues that inform network planning and real-time operations decisions. This granular visibility extends to low-voltage network segments previously operating without instrumentation.

The deployment of Type 4 meters enables Endeavour Energy's [[Flexible Exports]] program, which allows residential solar systems to export 5kW as a base allocation with dynamic increases up to 10kW based on real-time grid conditions. Smart meters measure bidirectional power flow (import and export) at 30-minute intervals, providing the data foundation for dynamic export limit calculations. The [[AMI Head-End]] system integrates with [[DERMS]] to coordinate export limits based on transformer capacity and local network constraints.

Remote disconnect capability in NSW smart meters supports faster customer service delivery. When a retailer authorizes reconnection after payment or contract establishment, the [[Metering Coordinator]] sends a remote connect command through the [[AMI Head-End]] rather than dispatching a field technician. This automation reduces customer wait times and operational costs while maintaining safety interlocks that prevent reconnection under unsafe conditions (such as detected wiring faults).

Smart meter data feeds Endeavour Energy's network planning models by revealing actual load diversity, peak demand timing, and power factor characteristics at granular geographic levels. This empirical data replaces assumed load profiles, improving accuracy of capacity assessments and infrastructure investment decisions. The interval data also enables post-event analysis of outages, voltage events, and power quality disturbances across the distribution network.

## Related Concepts

- [[AMI Head-End]] - Central system managing communication with deployed smart meters and processing interval data
- [[Meter Controller]] - Internal component managing meter communication protocols and security functions
- [[Metering Module]] - Registers and memory storing interval data and event logs within the smart meter
- [[Field Communication]] - Communication networks (LTE Cat-M1, Wi-SUN, Wi-Fi) connecting meters to head-end systems
- [[Intellihub]] - Primary smart meter provider in New South Wales with modular meter architecture
- [[National Metering Identifiers]] - Unique 10-11 digit identifiers for electricity connection points (NMI)
- [[Flexible Exports]] - Dynamic solar export management program using smart meter bidirectional power flow data
- [[Customer Portal]] - Web interface providing customers access to their interval consumption data
- [[Metering Coordinator]] - Party responsible for meter lifecycle management per NER Rule 7.3
- [[DERMS]] - Distributed Energy Resource Management System integrating with AMI for grid coordination
- [[DLMS/COSEM]] - International standard protocol (IEC 62056) for meter data exchange and configuration

## References

- National Electricity Rules (NER), Chapter 7 - Metering
- IEC 62056 (DLMS/COSEM) - Electricity metering data exchange protocol suite
- Intellihub technical specifications for modular smart meter architecture
- Endeavour Energy Flexible Exports program documentation
- Australian Energy Market Operator (AEMO) NMI structure guidelines
