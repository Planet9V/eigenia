---
type: system
category: smart-metering
status: complete
domain: IT
tags:
  - domain/IT/portal
  - topic/smart-metering/billing
  - org/endeavour-energy
  - asset/software
related:
  - "[[Billing]]"
  - "[[Online Energy Management System]]"
  - "[[Consumption and Analysis Reporting]]"
  - "[[Smart Meters]]"
created: 2026-02-12
updated: 2026-02-12
---

# Customer Portal

## Overview

A customer portal is a web-based self-service platform that enables residential and small business consumers to access their energy consumption data, billing information, and account management functions. Smart meter integration provides near-real-time visibility into electricity usage, moving beyond traditional monthly statements.

## How It Works

Customers register and authenticate through secure login to access personalized dashboards displaying:

- **Consumption visualizations**: Hourly, daily, and monthly usage graphs revealing peak usage patterns
- **Cost tracking**: Real-time bill estimation based on current tariffs and consumption trends
- **Tariff comparison**: Analysis of alternative rate plans or time-of-use pricing opportunities
- **Service requests**: Self-service options for meter reading requests, account changes, or outage reporting
- **Meter data access**: Direct connection to [[Meter Data Management]] systems pulls interval data collected by [[Smart Meters]]

The portal integrates with customer information systems and [[Billing]] engines to provide accurate, up-to-date information synchronized with official account records.

## Technical Architecture and Integration Layers

**Authentication and Security Framework**

Customer portals implement multi-factor authentication protecting sensitive consumption data and account information. Security architecture includes:

- **OAuth 2.0 integration**: Federated identity management enabling single sign-on with retailer platforms
- **Role-based access control**: Separate permissions for residential, commercial, and administrative users
- **Data encryption**: TLS 1.3 for transport security and AES-256 for data at rest
- **Audit logging**: Comprehensive tracking of data access, export activities, and account modifications
- **Privacy compliance**: GDPR-aligned consent management and data retention policies

Integration with [[Meter Data Management]] systems requires secure API gateways managing high-volume interval data queries while protecting operational databases from direct customer access.

**Data Visualization and User Experience**

Modern portals employ responsive web design principles ensuring usability across desktop, tablet, and mobile devices. Key visualization capabilities include:

- **Interactive consumption charts**: D3.js or Chart.js libraries rendering hourly, daily, and monthly usage graphs with zoom and comparison features
- **Heat maps**: Calendar-view representations highlighting peak consumption days and seasonal patterns
- **Cost breakdowns**: Pie charts separating energy charges, network tariffs, and environmental levies
- **Forecast projections**: Trend lines estimating end-of-month bills based on current consumption trajectory
- **Peer comparison widgets**: Anonymized benchmarking against similar households using aggregated data

User experience design emphasizes progressive disclosure—presenting high-level summaries with drill-down paths to granular interval data for engaged users.

**Mobile Application Ecosystem**

Dedicated mobile applications extend portal functionality with push notifications, location-based services, and device-specific features:

- **Usage alerts**: Notifications when daily consumption exceeds thresholds or monthly bills approach budget limits
- **Outage reporting**: GPS-enabled outage submissions with photo attachments for damage documentation
- **Solar monitoring**: Real-time generation visibility for prosumer households with rooftop installations
- **EV charging optimization**: Integration with home chargers to shift consumption to off-peak periods
- **Bill payment**: Secure payment processing with saved payment methods and automatic billing

Mobile adoption significantly increases customer engagement frequency compared to web-only platforms.

## Advanced Portal Features and Customer Programs

**Tariff Comparison and Switching Tools**

Portals enable customers to model alternative pricing structures using their actual consumption patterns:

- **Time-of-use simulations**: Calculate bill impacts if switching from flat-rate to peak/off-peak tariffs
- **Demand charge analysis**: Identify bill savings from reducing peak power draw during specified windows
- **Solar feed-in optimization**: Model financial returns from different export tariff options
- **Dynamic pricing readiness**: Assess suitability for critical peak pricing or real-time rates

These tools empower informed tariff selections while supporting DNSPs and retailers in recruiting customers for demand-responsive pricing programs.

**Energy Efficiency Recommendations**

Machine learning algorithms analyze consumption patterns to deliver personalized efficiency advice:

- **Behavioral recommendations**: Suggest load-shifting opportunities based on time-of-use patterns
- **Equipment upgrades**: Identify inefficient appliances through consumption signatures and recommend replacements
- **Weatherization advice**: Correlate consumption with temperature data to suggest insulation improvements
- **Rebate eligibility**: Automatically match customers with utility efficiency programs and financial incentives

Recommendation engines learn from customer responses, improving targeting accuracy over time.

**Demand Response Program Integration**

Portals serve as recruitment and management interfaces for demand response participation:

- **Event notifications**: Alert customers to upcoming demand response events with expected incentive payments
- **Baseline visualization**: Show historical consumption during previous events to demonstrate performance
- **Earnings tracking**: Dashboard displaying accumulated incentive payments and program status
- **Opt-out capabilities**: Customer control over event participation with advance notice requirements

Integration with [[Demand Response]] platforms requires bidirectional API connections managing enrollment, event dispatch, and settlement calculations.

## Relevance to Endeavour Energy

Customer portals drive significant operational value across Endeavour Energy's 1 million customer base:

- **Engagement improvement**: Transparent usage data encourages energy awareness and conservation behaviors, reducing peak demand and deferring infrastructure investments
- **Call center reduction**: Self-service access to consumption data and bill estimates reduces routine inquiry volume by 30-40%, lowering customer service costs
- **Service efficiency**: Digital service request workflows reduce administrative overhead for account changes and service appointments, improving response times
- **Customer satisfaction**: Empowering consumers with data insights builds trust and competitive differentiation in a market where retailers compete for customer loyalty
- **Program recruitment**: Portals serve as primary recruitment channels for demand response, time-of-use tariffs, and energy efficiency initiatives

Endeavour Energy's portal integration with [[Intellihub]] smart meters enables near-real-time consumption visibility, supporting customer engagement strategies critical to network optimization and distributed energy resource integration programs.

## Related Concepts

- [[Billing]] — Account settlement and invoice generation
- [[Online Energy Management System]] — Broader digital platform ecosystem
- [[Consumption and Analysis Reporting]] — Data analytics and insights
- [[Smart Meters]] — Hardware foundation for consumption measurement
- [[In-Home Display]] — Complementary real-time display technology
- [[Meter Data Management]] — Backend data processing providing portal content
- [[Demand Response]] — Customer programs managed through portal interfaces
- [[Energy Efficiency Awareness Portal]] — Conservation program integration
- [[Tariff Optimization]] — Rate comparison and switching tools
- [[OAuth 2.0]] — Federated identity and authentication framework
- [[API Gateway]] — Secure data access layer protecting operational systems
- [[Mobile Application]] — Device-specific customer engagement channels

## References

1. [IEEE 2030.5 Smart Energy Profile - Customer Data Access](https://standards.ieee.org/standard/2030_5-2018.html)
2. [MDMS Portal Best Practices - Utility Analytics Institute](https://www.utilityanalytics.com/)
3. [Open Utilities Network Customer Experience Standards](https://www.utilitynetwork.org/)
4. [IEC 62325 Framework for Energy Market Communications](https://www.iec.ch/)
5. [NIST Smart Grid Customer Interface Guidelines](https://www.nist.gov/smartgrid)
6. [Endeavour Energy Customer Portal](https://www.endeavourenergy.com.au/)
7. [OAuth 2.0 Authorization Framework - RFC 6749](https://tools.ietf.org/html/rfc6749)
8. [Green Button Alliance - Customer Data Standards](https://www.greenbuttonalliance.org/)
9. [D3.js Data Visualization Library](https://d3js.org/)
10. [GDPR Compliance for Energy Customer Data](https://gdpr.eu/)
