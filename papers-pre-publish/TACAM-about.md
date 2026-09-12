Traditional threat intelligence is structurally flawed. Security operations centers (SOCs) are often flooded with flat feeds containing thousands of undifferentiated IOCs and CVE alerts that declare everything to be "critical" without providing real operational context. 

**TACAM (Threat Actor Capability & Motivation)** completely redefines this approach by moving away from simple lists to construct a **7-dimensional spectral fingerprint** of threat actor behavior. Powered under the hood by a Neo4j knowledge graph containing **79,376 intelligence edges, 555,556 EPSS trajectory records, and 182,313 embedded document chunks**, TACAM profiles **389 global threat actor groups across 77,279 pre-correlated data points**.

***

### The 7 Analytical Spectra
Just as a prism splits white light into individual wavelengths, TACAM decomposes an adversary's footprint into seven distinct, independent dimensions:

| Dimension | Scale | What It Measures & Reveals |
| :--- | :--- | :--- |
| **TTP (Tactics)** | **1,579** actor-tactic clusters | **How they attack:** Measures their preferred methods mapped directly to the 27 MITRE ATT&CK enterprise tactics. |
| **Sector Targeting** | **2,278** actor-sector clusters | **Whom they attack:** Quantifies an actor's preference for targeting any of the 17 CISA critical infrastructure sectors. |
| **Geography** | **1,074** actor-geography clusters | **Where they operate:** Tracks the physical origin regions of attack infrastructure and their preferred target geographies. |
| **Protocol** | **627** actor-protocol clusters | **What they speak:** Gauges their technical capability to parse and manipulate specialized OT/ICS protocols (e.g., Modbus, OPC-UA, DNP3, PROFINET, BACnet, EtherNet/IP). |
| **Temporal** | **173** actor-temporal profiles | **When they strike:** Tracks operational tempo, campaign recency, dormancy windows, and seasonal attack patterns. |
| **CPE (Products)** | **62,965** actor-product clusters | **What they break:** The massive heart of the model. Maps threat actors directly to the specific hardware and software products they can exploit. |
| **CWE (Weaknesses)** | **8,583** actor-weakness clusters | **How they break it:** Tracks the specific software/hardware weakness families (CWEs) their exploits target. |

***

### The Power of Cross-Dimensional Queries
The true business and technical value of TACAM emerges when these seven dimensions are crossed. A flat threat feed might generically report: *"APT28 is a Russian threat actor targeting government entities".* 

**TACAM provides a highly localized, actionable mapping:**
> **APT28** targets the **Energy sector** *(Sector)* using **T1190 Exploit Public-Facing Application** *(TTP)* against **Siemens SIMATIC S7-1500 firmware** *(CPE)* exploiting **CWE-787 Out-of-bounds Write** *(CWE)* with peak operational tempo in **Q1 and Q3** *(Temporal)*, originating from **Moscow-timezone infrastructure** *(Geography)*, communicating via **OPC-UA** *(Protocol)*.

This enables the digital twin to resolve highly strategic, multi-domain queries in milliseconds:

*   **"Which actors target MY sector with MY vendor's products?"** 
    By querying `Sector × CPE × TTP`, a utility owner running Siemens SIMATIC and Schneider Electric Modicon PLCs can bypass thousands of alerts to instantly identify that **Volt Typhoon** (ATQ 82.9), **Dragonfly** (ATQ 79.7), and **Sandworm** (ATQ 77.2) are the specific adversaries with the toolsets and targeting profiles that match their exact plant configuration.
*   **Procurement & Supply Chain Blast Radius:** 
    Before buying new equipment, engineers can run comparative delta calculations. For instance, a manufacturer deciding between a **Rockwell Automation ControlLogix 5580** or a **Siemens ET 200SP** can mathematically model the risk exposure delta, proving how the change affects the facility's vulnerability surface.

***

### How TACAM Powers the Seldon Twin
Rather than acting as an isolated dashboard, TACAM's spectral fingerprints serve as the raw data inputs for three downstream engines in the OXOT Cyber Digital Twin:

1.  **The Actor Threat Quotient (ATQ):** 
    TACAM's TTP, protocol, sector, and product reach dimensions are continuously compiled in PostgreSQL SQL views to calculate each actor's composite **ATQ score (0-100)**.
2.  **The Monte Carlo Simulation (B2 Boost Map):** 
    When the simulation engine performs its fat-tailed random walks across the knowledge graph, it pulls active **TACAM Actor Modifiers** to weight the probability of an attacker traversing network edges. If a node shares an exploit with high TACAM affinity for an active actor, its edge weight receives a significant boost—driving the simulated walkers down the most realistic attack pathways.
3.  **The Seldon Rating:** 
    The Seldon Rating engine cross-references the customer's ingested DEXPI equipment tags and SBOMs with TACAM to filter out irrelevant threat actors, modifying the organization's overarching security rating based on contemporary real-world threats rather than generic compliance checklists.

***
