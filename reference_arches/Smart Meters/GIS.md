---
aliases:
  - Geographic Information System
type: system
category: smart-metering
status: draft
domain: IT
tags:
  - domain/IT/integration
  - topic/grid-operations
  - org/endeavour-energy
  - asset/software
related:
  - "[[Asset Management]]"
  - "[[ADMS]]"
created: 2026-02-12
updated: 2026-02-12
---

**Geographic Information System (GIS)** is a computerized platform that captures, stores, analyzes, and visualizes spatial data about utility assets, including meter locations, distribution network topology, and service infrastructure. In smart metering environments, GIS provides the geographic foundation for integrating meter data with network operations and planning systems.

## Overview

GIS serves as the spatial backbone of utility distribution networks, mapping the physical locations and relationships of meters, transformers, substations, and distribution lines. By combining meter locations with network topology, GIS enables utilities to understand how assets are distributed across service territory and how they relate to electrical infrastructure. This spatial perspective is essential for outage management, load analysis, and network planning. Modern utility GIS systems integrate advanced visualization capabilities, supporting real-time asset monitoring and spatial queries that connect meter data to operational systems.

## How It Works

GIS maintains a georeferenced database of utility assets, with each meter and network component assigned geographic coordinates. Integration with [[AMI Head-End|Advanced Metering Infrastructure]] systems allows real-time meter locations to be overlaid with network topology, creating a dynamic operational picture. Field crews use GIS-based mobile applications for asset verification and maintenance dispatch. Spatial analysis functions enable utilities to identify meter density patterns, calculate service coverage, and analyze outage impact by geographic area. When connected to [[ADMS|Advanced Distribution Management Systems]], GIS provides the spatial context necessary for predictive network analysis and automated dispatch recommendations.

## Relevance to Endeavour Energy

For Endeavour Energy, GIS integration enhances outage response by quickly identifying affected customers and nearby assets. Network visualization through GIS supports field crew routing and coordination during service disruptions. Spatial analysis capabilities enable grid planning teams to evaluate infrastructure investments by assessing meter density, load concentration, and service reliability metrics across geographic regions. GIS also facilitates regulatory compliance by maintaining documented asset locations and network configurations.

## Related Concepts
- [[Asset Management]]
- [[ADMS]]
- [[Smart Meters]]
- [[AMI Head-End]]
- [[Outage Management System]]

## References

- IEEE 1915-1 Standard for Distribution Management Systems - Geographic Information System Integration
- Utility Industry Standards for GIS Data Models (FERC Order 888 compliance)
