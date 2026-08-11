# The TACAM Matrix
## How Eigenia Fingerprints Every Threat Actor on Earth — Across 77,279 Data Points

---

*In intelligence work, the question is never "are we being targeted?" The question is "by whom, with what, and why now?"*

*TACAM answers all three.*

---

### The Problem With Threat Intelligence Today

Every major cybersecurity vendor sells "threat intelligence." What they actually sell is a feed — a river of CVEs, IOCs, and STIX bundles flowing past your SOC at 10,000 alerts per day. Your analysts drown in data that tells them *everything is dangerous* and *nothing is prioritised.*

The root cause is architectural. Traditional threat intelligence is **flat**. It maps actors to techniques and techniques to vulnerabilities in simple two-dimensional tables. APT28 uses T1566 (Phishing). T1566 exploits CVE-2023-XXXX. Your firewall has rule X.

This is like profiling a criminal by listing every tool they've ever touched without understanding their patterns, their preferred targets, their operational rhythms, or how their capability evolves under geopolitical pressure.

TACAM is different. TACAM is not a list. It is a **seven-dimensional fingerprint**.

---

### What TACAM Actually Is

**TACAM** — Threat Actor Capability & Motivation Matrix — is a proprietary analytical framework that profiles every known threat actor across seven independent dimensions simultaneously. Each dimension is stored as a cluster table in the Eigenia knowledge graph, producing a combined matrix of **77,279 data points** covering 389 threat actor groups.

Think of it as a spectral decomposition of threat actor behaviour. Just as a prism separates white light into its constituent wavelengths, TACAM separates a threat actor's observable activity into seven independent analytical spectra:

| Dimension                                  | What It Reveals                                                                                                         | Scale                          |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **TTP** (Tactics, Techniques & Procedures) | *How* they attack — which of the 27 MITRE ATT&CK enterprise tactics they prefer                                         | 1,579 actor-tactic clusters    |
| **Sector Targeting**                       | *Whom* they attack — which of the 17 CISA critical infrastructure sectors they preferentially target                    | 2,278 actor-sector clusters    |
| **Geography**                              | *Where* they operate — origin regions and target geographies                                                            | 1,074 actor-geography clusters |
| **Protocol**                               | *What they speak* — which OT/ICS protocols they can exploit (Modbus, OPC-UA, DNP3, PROFINET, BACnet, MQTT, EtherNet/IP) | 627 actor-protocol clusters    |
| **Temporal**                               | *When* they strike — campaign recency, operational tempo, dormancy windows, seasonal patterns                           | 173 actor-temporal profiles    |
| **CPE** (Products)                         | *What they break* — which specific vendor products their exploits target, by Common Platform Enumeration                | 62,965 actor-product clusters  |
| **CWE** (Weaknesses)                       | *How they break it* — which weakness families their exploits target, by Common Weakness Enumeration                     | 8,583 actor-weakness clusters  |

---

### The Power of Cross-Dimensional Queries

Each dimension alone is useful. Crossed together, they answer questions that no single dimension can.

**Traditional threat intelligence** answers:
> "APT28 is a Russian threat actor that targets government entities."

**TACAM** answers:
> "APT28 targets the Energy sector (sector cluster) using T1190 Exploit Public-Facing Application (TTP cluster) against Siemens SIMATIC S7-1500 firmware (CPE cluster) exploiting CWE-787 Out-of-bounds Write (CWE cluster) with peak operational tempo in Q1 and Q3 (temporal cluster), originating from Moscow-timezone infrastructure (geography cluster), communicating via OPC-UA (protocol cluster)."

**The difference**: The first tells you to be worried. The second tells you exactly which PLC firmware version to patch, in which quarter, against which exploit technique, from which geographic origin.

---

### Three Questions TACAM Answers That Nobody Else Can

#### 1. "Which actors target MY sector with MY vendor's products?"

**Cross-query**: Sector × CPE × TTP

A CISO at a European energy utility asks: *"I run Siemens SIMATIC and Schneider Electric Modicon PLCs. Who's coming for me?"*

TACAM returns:

| Actor | ATQ | Sector Affinity | CPE Match | Kill Chain Coverage |
|-------|-----|-----------------|-----------|-------------------|
| Volt Typhoon | 82.9 | Energy: 0.94 | SIMATIC S7: ✅ | 12/14 tactics |
| Dragonfly | 79.7 | Energy: 0.97 | Modicon M340: ✅ | 9/14 tactics |
| Sandworm | 77.2 | Energy: 0.91 | Both: ✅ | 14/14 tactics |
| CyberAv3ngers | 68.4 | Water/Energy: 0.76 | Modicon: ✅ | 6/14 tactics |

This query takes milliseconds. It draws from 62,965 CPE rows, 2,278 sector rows, and 1,579 TTP rows, all pre-computed, pre-clustered, and kept current.

#### 2. "If we deploy a new vendor, what threat exposure do we inherit?"

**Cross-query**: CPE × ATQ ranking → Vendor Blast Radius

Before a procurement decision, the engineering team asks: *"What happens to our risk profile if we add ABB Ability to our SCADA stack?"*

TACAM computes:

> **ABB Ability Vendor Blast Radius**: 7 threat actors with ATQ > 60 can exploit ABB Ability products.
> 
> - Aggregate actor ATQ: 73.4 (weighted average)
> - Most dangerous: Lazarus Group (ATQ 83.2) — 3 known CVEs in ABB Ability Symphony Plus
> - CWE concentration: CWE-787 (Out-of-bounds Write), CWE-22 (Path Traversal)
> - Kill chain gap: No actor has full 14-tactic coverage for ABB — cooperation required for complete compromise
> 
> **Risk increment**: Adding ABB Ability increases estimated fleet ALE by $2.1M (+4.4%)

No other platform can compute a procurement risk increment from a vendor name in under one second.

#### 3. "Which actors are converging on our sector this quarter?"

**Cross-query**: Temporal × Sector trend analysis

The intelligence analyst asks: *"Show me actors whose energy sector targeting is increasing."*

TACAM temporal analysis reveals:

> **Converging actors (Energy, Q2 2026)**:
> 
> - Volt Typhoon: Campaign recency 0.95 (active this month), sector affinity up 0.12 YoY
> - CyberAv3ngers: New IRGC-attributed activity against Unitronics PLCs, sector affinity up 0.31 QoQ
> - Dragonfly: Dormant since Q3 2025, but historical seasonal pattern suggests Q2 reactivation (82% confidence)
>
> **Diverging actors**:
> - APT33: Energy sector affinity declining (shifting to aerospace), temporal threat score down 0.18

---

### Why 62,965 CPE Rows Changes Everything

The CPE dimension is the largest, and it matters most for procurement decisions. With 62,965 actor-product clusters, TACAM maps exactly *which vendor products* each actor can exploit.

No competitor does this: threat quantification at the level of individual products in your supply chain.

When a food manufacturer asks "should I replace my Rockwell Automation ControlLogix 5580 with a Siemens ET 200SP?" TACAM doesn't give an opinion. It computes the delta:

```
Current CPE (Rockwell ControlLogix):
  → 4 actors with ATQ > 70 can exploit
  → 12 known CVEs, 3 in CISA KEV
  → CWE concentration: CWE-20 (Improper Input Validation)

Proposed CPE (Siemens ET 200SP):  
  → 6 actors with ATQ > 70 can exploit
  → 18 known CVEs, 5 in CISA KEV
  → CWE concentration: CWE-787 (Out-of-bounds Write)

Delta: +2 actors, +6 CVEs, +2 KEV
ALE increment: +$1.4M annually
```

This is procurement intelligence. It turns a technical decision into a financial one, with actor attribution attached.

---

### The Analytical Moat

Building a TACAM matrix from scratch requires:

- **79,376 knowledge graph edges** connecting actors to techniques, vulnerabilities, products, sectors, and geopolitical events
- **555,556 EPSS trajectory records** tracking exploit probability evolution over time
- **95,560 kill chain views** mapping technique usage to kill chain stages
- **35,341 geopolitical events** correlated to actor campaign timing
- **182,313 embedded document chunks** for semantic intelligence fusion
- **234 simulation epochs** of continuous graph enrichment

This is not a dataset you download. It is a knowledge graph built over years of ingestion, enrichment, and cross-correlation. The TACAM matrix is the hardest part of Eigenia to replicate.

---

### From TACAM to Action

TACAM is not an academic exercise. Every dimension feeds directly into three platform outputs:

1. **The ATQ Score** → TACAM dimensions are the raw inputs to the Actor Threat Quotient
2. **The Monte Carlo Engine** → TACAM actor recency modifies Boltzmann walk weights in real-time (B2 boost map)
3. **The Seldon Rating** → TACAM sector × geography × CPE determines which actors are relevant to *this* customer, modifying the per-organization risk score

The chain: TACAM fingerprints the actor. ATQ scores the danger. Monte Carlo simulates the attack. ALE puts a dollar figure on it. Gordon-Loeb tells you what to spend. The board decides.

Seven dimensions. One decision.

---

*Eigenia CDT — Endeavour Energy B.V.*
*"Know thy enemy — across seven dimensions simultaneously."*
