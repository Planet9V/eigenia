---
aliases:
  - Meter Billing
  - Meter-to-Cash
  - Interval Billing
type: concept
category: smart-metering
status: complete
domain: business
tags:
  - domain/business/customer
  - topic/smart-metering/billing
  - topic/time-of-use-tariffs
  - org/endeavour-energy
  - asset/software
related:
  - "[[Meter Data Management]]"
  - "[[Customer Portal]]"
  - "[[Retailer API]]"
  - "[[National Metering Identifiers]]"
  - "[[Time-of-Use Tariffs]]"
created: 2026-02-12
updated: 2026-02-12
---

# Billing

Smart meter billing transforms half-hourly interval data into accurate customer invoices, enabling time-of-use pricing and market settlement through the National Electricity Market (NEM).

## Overview

Smart meters generate interval consumption data every 30 minutes rather than monthly readings. This granularity enables dynamic tariff structures where prices vary by time of use, reflecting actual network demand patterns. In New South Wales, peak, shoulder, and off-peak periods command different rates, incentivizing demand shifting and reducing infrastructure strain.

The [[National Metering Identifiers|NMI]] serves as the unique identifier linking physical meters to market settlement processes managed by [[AEMO]] (Australian Energy Market Operator). Retailers—not distribution network service providers like Endeavour Energy—set tariff rates and generate customer bills based on interval data provided by the network.

## How It Works

**Data Flow**: Smart meters transmit consumption data to field communication networks, then to a meter data management system (MDMS). The MDMS aggregates, validates, and stores interval data, making it available for billing system consumption.

**Tariff Application**: Billing systems apply retailer-defined rates to validated interval consumption, calculating charges for each time period. Time-of-use tariffs multiply consumption volumes by corresponding period rates. Daily demand charges or network charges may apply based on peak consumption.

**Invoice Generation**: Monthly invoices aggregate charges, apply taxes, and include consumption graphs and comparisons. Customer portals provide self-service access to detailed interval breakdowns, enabling consumption awareness.

## Time-of-Use Tariff Structures

**Peak, Shoulder, and Off-Peak Pricing Windows**

NSW electricity retailers implement time-differentiated pricing structures reflecting actual network demand patterns. Typical residential time-of-use tariffs distinguish between:

- **Peak periods** (2pm-8pm weekdays): Highest rates during maximum demand, typically $0.40-0.50/kWh
- **Shoulder periods** (7am-2pm, 8pm-10pm weekdays, 7am-10pm weekends): Moderate rates around $0.25-0.30/kWh
- **Off-peak periods** (10pm-7am all days): Lowest rates at $0.12-0.18/kWh, encouraging demand shifting

These price signals incentivize customers to defer discretionary consumption (laundry, dishwashing, electric vehicle charging) to off-peak windows, reducing strain on distribution infrastructure during peak hours. Smart meter interval data enables precise tariff application impossible with traditional accumulation meters.

**Demand Charges and Network Tariffs**

Beyond consumption charges, some tariffs include demand components based on maximum power draw (measured in kW) during specified windows. A residential customer might pay a monthly demand charge of $15-20 per kW of peak demand, creating strong financial incentives to reduce simultaneous appliance usage.

Network charges (Distribution Use of System - DUOS) appear separately on bills, reflecting infrastructure costs independent of retail energy prices. These charges fund [[DNSP]] capital investment and operational expenses determined through [[Regulatory Bodies|AER revenue determinations]].

## Billing System Architecture

**Integration with Market Settlement**

The National Electricity Market operates on 5-minute dispatch intervals, with financial settlement occurring at 30-minute trading intervals. Smart meter data flows from Endeavour Energy's [[Meter Data Management]] system to the Market Settlement and Transfer Solution (MSATS) managed by [[AEMO]]. MSATS assigns meter readings to responsible retailers based on [[National Metering Identifiers]], ensuring accurate market participant invoicing.

Retailers access validated interval data through MSATS file transfers (typically CSV or XML formats following AEMO specifications), then import this data into billing platforms. Automated validation checks identify consumption anomalies, missing intervals, and meter faults before invoice generation.

**Billing Cycle Automation**

Monthly billing cycles involve coordinated data exchange between Endeavour Energy (as Metering Data Provider), AEMO (as Market Operator), and retailers (as customer billing agents). Key process steps include:

1. Smart meters transmit interval data to [[AMI Head-End]] systems (daily or more frequently)
2. [[Meter Data Management]] systems validate, estimate missing intervals, and prepare data sets
3. Validated data exports to MSATS within regulatory timeframes (typically 1-2 business days)
4. Retailers retrieve consumption data and apply tariff rates
5. Billing systems generate invoices with consumption graphs and cost breakdowns
6. [[Customer Portal]] platforms provide self-service access to detailed interval analysis

## Relevance to Endeavour Energy

Endeavour Energy operates the distribution network and [[Meter Data Management]] system across its NSW service territory. While the DNSP collects, validates, and manages interval data, customer billing responsibility belongs to retailers who compete for customers within Endeavour's network area. Accurate, timely data delivery to retailers through MSATS integration is critical for billing accuracy, customer trust, and regulatory compliance.

Poor data quality—missing intervals, incorrect timestamps, meter communication failures—creates billing disputes, customer dissatisfaction, and retailer complaints. Endeavour Energy's operational performance directly affects end-customer billing accuracy despite having no direct billing relationship. This separation of responsibilities (DNSP as infrastructure operator, retailer as customer billing agent) defines the competitive electricity market structure established under the [[National Electricity Rules]].

## Related Concepts

- [[Meter Data Management]] — Systems managing interval data collection and validation
- [[Customer Portal]] — Self-service access to consumption data and billing details
- [[Retailer API]] — Integration channels for billing system data consumption
- [[National Metering Identifiers]] — Unique identifiers for market settlement
- [[Time-of-Use Tariffs]] — Dynamic pricing reflecting network demand

## Related Concepts

- [[AEMO]] - Market operator managing settlement and MSATS
- [[DNSP]] - Distribution network service providers operating MDMS
- [[Regulatory Bodies]] - AER oversight of billing accuracy and consumer protections
- [[ADMS]] - Advanced distribution management integrating with metering systems
- [[Smart Meters]] - Interval data collection foundation
- [[Distribution Use of System]] - Network tariff structures on customer bills
- [[Demand Response]] - Programs leveraging time-of-use pricing signals
- [[Market Settlement and Transfer Solution]] - AEMO's metering data exchange platform

## References

- [AEMO Market Settlement and Transfer Solution (MSATS)](https://www.aemo.com.au/energy-systems/electricity/national-electricity-market-nem/participate-in-the-market/market-settlements-and-transfers)
- [AER Metering Code of Practice](https://www.aer.gov.au/networks-pipelines/guidelines-schemes-models-reviews/metering-installation-data-storage-guideline)
- [National Electricity Rules - Chapter 7 Metering](https://www.aemc.gov.au/regulation/energy-rules/national-electricity-rules/current)
- [Time-of-Use Tariff Structures - Energy Australia](https://www.energyaustralia.com.au/home/electricity-and-gas/plans/time-of-use)
- [Endeavour Energy Metering Data Services](https://www.endeavourenergy.com.au/connections-and-meters/meters/smart-meters)
- [AEMO 5-Minute Settlement Implementation](https://www.aemo.com.au/initiatives/major-programs/nem-five-minute-settlement-program)
- [AER Network Tariff Structure Statement Guidelines](https://www.aer.gov.au/networks-pipelines/guidelines-schemes-models-reviews/tariff-structure-statement-guidelines)
- [Interval Data Validation Standards - AEMO](https://www.aemo.com.au/energy-systems/electricity/national-electricity-market-nem/participate-in-the-market/market-settlements-and-transfers/metering)
