---
aliases:
  - IHD
type: component
category: smart-metering
status: draft
domain: business
tags:
  - domain/business/customer
  - topic/smart-metering
  - asset/physical
related:
  - "[[Smart Meters]]"
  - "[[IHD]]"
created: 2026-02-12
updated: 2026-02-12
---

## In-Home Display (IHD)

An optional consumer device paired with smart meters in Australia's Advanced Metering Infrastructure (AMI) rollout. The IHD wirelessly receives real-time energy consumption and cost data from the household meter via ZigBee Home Area Network (HAN) connection, displaying usage patterns and financial information to help customers understand and manage their electricity consumption.

## Overview

The In-Home Display serves as a direct communication bridge between the smart meter and household occupants, providing immediate visibility into energy consumption that was previously unavailable without manual meter readings. This transparency drives behavioral engagement and supports utilities in achieving demand management objectives.

**Customer Benefits:**
- Real-time consumption feedback enabling immediate awareness of usage patterns
- Cost visibility connecting consumption directly to household bills
- Historical trend analysis identifying peak usage periods and consumption drivers
- Demand response participation through visual feedback during peak pricing events

**Market Adoption:** IHD uptake in Australian networks varies by distribution area. Endeavour Energy customers may receive devices through voluntary programs or bundle offerings with smart meter installations.

## How It Works

The IHD operates as a passive receiver within the smart meter's ZigBee HAN, communicating over the 2.4 GHz frequency band used for home automation. The meter transmits consumption data at regular intervals (typically 10-30 minute updates), with the display refreshing to show:

- Current instantaneous power demand (kW)
- Cumulative daily consumption (kWh)
- Estimated cost based on applicable tariff rates
- Historical usage graphs across days, weeks, or months

The device requires no external network connection; all communication occurs between meter and display over the local wireless mesh. Battery-powered models maintain operation during grid outages when meter displays remain accessible.

## Relevance to Endeavour Energy

As a Distribution Network Service Provider serving western Sydney and surrounding regions of New South Wales, Endeavour Energy leverages IHD deployment to strengthen customer engagement with energy management. The devices support:

- **Demand Management:** Real-time feedback enables voluntary peak-shifting without automated controls
- **Network Planning:** Consumption visibility informs load forecasting and network upgrade decisions
- **Customer Retention:** Engagement tools differentiate service offerings in competitive markets
- **Regulatory Compliance:** IHD availability demonstrates commitment to transparency obligations

## Related Concepts

- [[Smart Meters]] – The parent metering infrastructure providing IHD data
- [[Customer Portal]] – Complementary online consumption dashboard
- [[Energy Efficiency Awareness Portal]] – Expanded behavioral engagement tool
- [[Demand Response]] – Peak management strategy supported by IHD feedback
- [[ZigBee HAN]] – Wireless communication standard enabling IHD connectivity

## References

- Australian Energy Regulator. (2024). "Advanced Metering Infrastructure Specification." *AER Metering Publications*.
- Endeavour Energy. (2024). "Smart Meter Customer Information Resources." *Communications Archive*.
- Zigbee Alliance. (2023). "Home Automation Device Profile Specification." *Technical Standards*.

