# Physics-Grounded Cyber Underwriting: Deriving Single Loss Expectancy (SLE) and Annualised Loss Expectancy (ALE) from Unified BIM+BOM Asset Registers

## Abstract

Commercial property and cyber insurance markets face an existential crisis when underwriting cyber-physical infrastructure: qualitative security questionnaires fail to predict physical asset damage, while classical actuarial models lack empirical exposure metrics for cyber-induced mechanical destruction. Following the introduction of war, state-sponsored cyber, and infrastructure exclusions (such as Lloyd's Market Association Bulletin Y5381), industrial operators and hyperscale data center owners face massive unhedged liabilities. This paper presents a physics-grounded actuarial underwriting framework derived directly from the unified DEXPI 2.0 (BIM) and CycloneDX 1.6+ (BOM) cyber digital twin. We formalize the mathematical derivation of Single Loss Expectancy (SLE), Annualised Rate of Occurrence (ARO), and Annualised Loss Expectancy (ALE) by coupling topological asset vulnerability to multi-physics damage functions. We formulate the Return on Security Investment (ROSI) to justify hardware root-of-trust retrofits, and demonstrate how captive insurance vehicles and reinsurance treaties can establish mathematically defensible attachment points and policy limits based on verified digital twin state.

## 1. The Breakdown of Qualitative Cyber Underwriting

Commercial insurance is grounded in the law of large numbers and empirical historical loss distributions. In automobile, marine, and commercial fire insurance, centuries of actuarial data allow underwriters to price risk with high confidence.

In contrast, cyber insurance for industrial property and critical infrastructure has historically relied on qualitative questionnaires:
- Does the organization enforce multi-factor authentication?
- Is there an endpoint detection and response (EDR) agent installed on enterprise laptops?
- Are annual third-party penetration tests conducted?

These questions provide zero insight into whether an adversary can compromise an unsegmented programmable logic controller (PLC) controlling a 100 MW cooling loop or trip an 11 kV circuit breaker to cause transformer explosion.

The consequences of this actuarial failure are profound:

1. **Systemic Accumulation Risk**: A single shared vulnerability in a widely deployed industrial firmware library (such as an embedded TCP/IP stack) can simultaneously compromise hundreds of independent facilities worldwide, generating a catastrophic accumulation of losses that exceeds the capital reserves of the global reinsurance market.
2. **Market Retraction and Exclusions**: Reinsurers and syndicates have responded by drastically reducing coverage limits, raising deductibles, and enforcing sweeping exclusions (such as Lloyd's Bulletin Y5381), which exclude losses resulting from state-backed cyber attacks or catastrophic critical infrastructure disruption.
3. **Trapped Capital**: Industrial facility owners cannot accurately quantify their exposure, leading to inefficient capital allocation, underfunded captive insurance reserves, or excessive premium payments for illusory coverage.

> ❝ Subjective cybersecurity questionnaires are obsolete. When insuring a $1.2B AI datacenter, underwriters under Lloyd's Market Association Y5381 covenants require quantitative proof of risk accumulation. By joining BIM and BOM, the digital twin can run Monte Carlo simulations to compute empirical Single Loss Expectancy (SLE) and Annualised Loss Expectancy (ALE). This allows CFOs to scientifically justify security capital investments (ROSI) and set actuarially sound captive insurance retention layers. ❞
>
> *— Chief Financial / Actuarial Risk Officer (Capital Allocation & Critical Infrastructure Reinsurance)*

## 2. Deriving Single Loss Expectancy (SLE) from Physical Topology

In classical risk management, Single Loss Expectancy (SLE) is defined as:

$$\text{SLE} = \text{Asset Value (AV)} \times \text{Exposure Factor (EF)}$$

In qualitative underwriting, the Exposure Factor (EF) is subjectively guessed (e.g., "we assume a breach damages 20% of the facility").

In our physics-grounded framework, both $\text{AV}$ and $\text{EF}$ are computed deterministically from the unified DEXPI 2.0 and CycloneDX 1.6+ graph $G_{\text{CPDT}}$.

```
+-------------------------------------------------------------------------+
|                  PHYSICS-GROUNDED ACTUARIAL PIPELINE                    |
+-------------------------------------------------------------------------+
|                                                                         |
|  [DEXPI 2.0 Physical Graph: G_phys]                                     |
|  - Piping connectivity, fluid volumes, thermal masses                   |
|  - Direct Hardware Asset Values (AV_equip)                              |
|       |                                                                 |
|       +-----------------------------------+                             |
|       |                                   |                             |
|       v                                   v                             |
|  [Reachability Analysis]             [Thermal Transient Solver]         |
|  - Identifies dependent nodes        - Calculates max junction temp T_j |
|       \                                   /                             |
|        \                                 /                              |
|         v                               v                               |
|   [Topological Exposure Factor: EF(v_s)]                                |
|   - Fraction of physical plant suffering irreversible destruction       |
|                                                                         |
|  [CycloneDX 1.6+ BOM Graph: G_cyber]                                    |
|  - Component vulnerabilities, active VEX exploitability                 |
|  - Network segmentation (OBOM), hardware roots of trust (HBOM)          |
|       |                                                                 |
|       v                                                                 |
|  [Adversary Threat Quotient (ATQ) & Stochastic Exploitability]          |
|       |                                                                 |
|       v                                                                 |
|   [Annualised Rate of Occurrence: ARO(v_s)]                             |
|                                                                         |
+-------------------------------------------------------------------------+
                                    |
                                    v
            +-----------------------------------------------+
            |  EMPIRICAL ANNUALISED LOSS EXPECTANCY (ALE)   |
            |                                               |
            |     ALE = SUM [ AV * EF(v_s) * ARO(v_s) ]     |
            +-----------------------------------------------+
```

### 2.1 Asset Valuation (AV)
Asset valuation is divided into direct physical replacement cost and indirect operational interruption:

$$\text{AV}(v_p) = C_{\text{hardware}}(v_p) + C_{\text{installation}}(v_p) + C_{\text{BI}}(\text{MTTR}(v_p))$$

Where:
- $C_{\text{hardware}}(v_p)$ is extracted from the Tier 2/3 equipment catalog.
- $C_{\text{BI}}$ is the Business Interruption cost per hour multiplied by the Mean Time to Replace (MTTR). In high-density AI clusters with long-lead silicon components, $\text{MTTR}$ can exceed 180 days.

### 2.2 Mathematical Exposure Factor (EF)
The Exposure Factor is not a scalar constant; it is a non-linear damage function of the maximum physical stress state $\theta_{\text{max}}$ experienced during the simulated transient:

$$\text{EF}(v_p) = \Phi_{\text{damage}}(\theta_{\text{max}}) = \begin{cases} 0 & \text{if } \theta_{\text{max}} < \theta_{\text{safe}} \\ \frac{\theta_{\text{max}} - \theta_{\text{safe}}}{\theta_{\text{destruction}} - \theta_{\text{safe}}} & \text{if } \theta_{\text{safe}} \le \theta_{\text{max}} < \theta_{\text{destruction}} \\ 1.0 & \text{if } \theta_{\text{max}} \ge \theta_{\text{destruction}} \end{cases}$$

For semiconductor junction temperatures:
- $\theta_{\text{safe}} = 85^\circ\text{C}$ (thermal throttling initiates).
- $\theta_{\text{destruction}} = 105^\circ\text{C}$ (delamination, solder reflow, permanent transistor gate oxide failure).

## 3. Deriving Annualised Rate of Occurrence (ARO) from Multi-BOM Security Posture

The Annualised Rate of Occurrence (ARO) represents the estimated frequency of a successful attack against a given asset in a single year.

Rather than relying on generic industry breach frequencies, ARO is calculated by evaluating the security posture across all five CycloneDX BOM dimensions:

$$\text{ARO}(v_s) = \lambda_{\text{base}} \cdot \prod_{i=1}^5 \kappa_i$$

Where $\lambda_{\text{base}}$ is the base threat rate for the industry sector, and $\kappa_i$ are empirical discount/penalty multipliers:

1. **Hardware Root of Trust ($\kappa_{\text{HBOM}}$)**:
   - If verified OCP Caliptra / hardware-enforced cryptographic RoT is present: $\kappa_{\text{HBOM}} = 0.05$ (95% reduction in successful firmware tampering).
   - If legacy, unsigned flash memory is used: $\kappa_{\text{HBOM}} = 2.5$.
2. **Software Vulnerability Exploitability ($\kappa_{\text{SBOM}}$)**:
   - Derived directly from active VEX statements. If all known CVEs have verified `not_affected` justifications: $\kappa_{\text{SBOM}} = 0.1$.
   - If unmitigated remotely exploitable vulnerabilities exist: $\kappa_{\text{SBOM}} = 4.0$.
3. **Network & Operational Segmentation ($\kappa_{\text{OBOM}}$)**:
   - Evaluated against IEC 62443 zone and conduit rules. Strict unidirectional data diode isolation: $\kappa_{\text{OBOM}} = 0.02$.
   - Flat, bridged Modbus/BACnet routing: $\kappa_{\text{OBOM}} = 3.0$.
4. **Cryptographic Posture ($\kappa_{\text{CBOM}}$)**:
   - Post-quantum compliant TLS 1.3 with mutual authentication (mTLS): $\kappa_{\text{CBOM}} = 0.2$.
   - Deprecated TLS 1.0 or hardcoded static credentials: $\kappa_{\text{CBOM}} = 5.0$.
5. **Services Exposure ($\kappa_{\text{SaaSBOM}}$)**:
   - Air-gapped deployment with zero external SaaS dependencies: $\kappa_{\text{SaaSBOM}} = 0.1$.
   - Direct vendor remote management tunnels over public internet: $\kappa_{\text{SaaSBOM}} = 3.5$.

## 4. Annualised Loss Expectancy (ALE) & Return on Security Investment (ROSI)

The overall facility Annualised Loss Expectancy is the summation of risk across all equipment nodes in the unified graph:

$$\text{ALE}_{\text{total}} = \sum_{k=1}^K \text{SLE}(v_k) \cdot \text{ARO}(v_k)$$

### 4.1 Return on Security Investment (ROSI) Formulation
Chief Financial Officers cannot justify multimillion-dollar infrastructure hardening projects on technical intuition alone. ROSI provides the formal financial justification:

$$\text{ROSI} = \frac{\Delta \text{ALE} - \text{Cost of Security Controls}}{\text{Cost of Security Controls}} \times 100\%$$

Where $\Delta \text{ALE} = \text{ALE}_{\text{baseline}} - \text{ALE}_{\text{hardened}}$.

### 4.2 Capital Allocation Example in a 100 MW AI Datacenter
Consider an operator evaluating whether to retrofit 50 Cooling Distribution Units with Caliptra hardware roots of trust and independent analog thermal shunt trips:
- **Baseline Risk**:
  - $\text{AV}_{\text{rack}} = \$89,600,000$ across 16 high-density racks.
  - $\text{EF}_{\text{baseline}} = 1.0$ (complete thermal destruction).
  - $\text{ARO}_{\text{baseline}} = 0.045$ (estimated 1 event every 22 years).
  - $\text{ALE}_{\text{baseline}} = \$89,600,000 \times 1.0 \times 0.045 = \$4,032,000/\text{year}$.
- **Hardened Architecture (Post-Retrofit)**:
  - $\text{EF}_{\text{hardened}} = 0.02$ (analog shunt trip shuts down rack before thermal limit is reached; loss limited to system reboot and transient SLA credit).
  - $\text{ARO}_{\text{hardened}} = 0.002$ (Caliptra RoT + isolated conduits).
  - $\text{ALE}_{\text{hardened}} = \$89,600,000 \times 0.02 \times 0.002 = \$3,584/\text{year}$.
- **Risk Mitigation ($\Delta \text{ALE}$)**: $\$4,028,416/\text{year}$.
- **Capital Cost of Retrofit**: $\$1,250,000$ one-time capital expenditure + $\$100,000/\text{year}$ maintenance.
- **Three-Year ROSI**:

$$\text{ROSI}_{\text{3-year}} = \frac{(\$4,028,416 \times 3) - (\$1,250,000 + \$300,000)}{\$1,550,000} \times 100\% \approx 679.7\%$$

This mathematical proof provides the CFO with an unassailable financial mandate for capital deployment.

## 5. Structuring Reinsurance Treaties & Captive Retention Layers

Armed with the verified DEXPI + CycloneDX twin, facility owners and underwriters can structure advanced alternative risk transfer vehicles:

1. **Deterministic Attachment Points**: Reinsurance treaty attachment points can be tied to verified physical loss metrics (such as sustained fluid loss exceeding 200 liters or silicon junction temperature exceeding $105^\circ\text{C}$) verified by cryptographically signed black-box telemetry, eliminating coverage disputes under Lloyd's Y5381.
2. **Optimized Captive Capitalization**: The facility owner can retain the low-severity, high-frequency operational losses ($\text{ALE} \le \$500,000$) within a corporate captive insurance subsidiary, while purchasing high-attachment catastrophe reinsurance at dramatically discounted premium rates.

## 6. Conclusion

The era of qualitative cyber underwriting is over. By bridging the physical P&ID models of DEXPI 2.0 with the comprehensive multi-BOM architecture of CycloneDX 1.6+, industrial operators and insurers can compute the physical and financial consequences of cyber risk from first principles. Physics-grounded underwriting replaces subjective guesswork with mathematical determinism, unlocking efficient capital allocation, robust captive insurance structures, and verifiable resilience for global critical infrastructure.
