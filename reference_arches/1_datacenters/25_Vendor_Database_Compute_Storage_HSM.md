---
tags: [tetrel, datacenter, vendors, compute, storage, hsm, bmc, ocp-safe, caliptra, firmware]
created: 2026-04-29
source: Multi-source research (Perplexity, WebSearch, vendor documentation)
---

# Datacenter Vendor Database: Compute, Storage, HSMs & BMCs

*50+ vendors covering CPUs/GPUs, storage, servers/ODMs, HSMs, BMCs, and open silicon Root of Trust. Cross-referenced against [[09_Datacenter_Components_and_Suppliers]] and [[10_Hyperscale_Ecosystem_Deep_Dive]].*

---

## 1. CPUs, GPUs, and Accelerators

| Vendor | Product Lines | Major Customers | Revenue | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| NVIDIA | H100, H200, B100/B200 (Blackwell), Rubin (2026), DGX | AWS, Azure, Google, Meta, Oracle, CoreWeave | ~$130B (FY2025); DC $51.2B in Q3 alone | ~$4.0T | GPU dominance (92% DC GPU share) | CVE-2025-23266 (NVIDIAScape, CVSS 9.0 container escape); 57 vulns in 2025 | Not certified | None | None |
| AMD | EPYC 9004/9005 (Turin), Instinct MI300X/MI350, Pensando DPUs | Meta, Microsoft, Oracle, Google, OpenAI (6 GW GPU deal) | $25.7B total; DC $16.6B | ~$523B | CPU+GPU+DPU integrated stack | SinkClose CVE-2023-31315 (Ring-2); CVE-2024-56161 (microcode bypass, CVSS 7.2) | **Participating vendor** | None | None |
| Intel | Xeon 6, Xeon 6+ (Clearwater Forest, 288 cores), Gaudi 3 | AWS, Azure, Google, all major OEMs | $53.1B total; DC declining vs. AMD | ~$425B | Legacy x86 dominance (~70% DC CPU share) | 374 vulns patched in 2024; Branch Privilege Injection (CVE-2024-45333); Spectre variants ongoing | **Participating vendor (silicon)** | None | None |
| Ampere Computing (SoftBank) | Altra (80-core), AmpereOne (5nm, DDR5/PCIe5) | Azure, Oracle, Google, Tencent, ByteDance, Cloudflare | ~$1B est. (acquired by SoftBank for $6.5B, Nov 2025) | Private | ARM-based cloud-native CPUs; power efficiency | No major CVEs | No | None | None |
| Broadcom | Tomahawk/Jericho ASICs, custom XPUs (Google TPU, Meta MTIA) | Google, Meta, ByteDance, all major cloud | $64B (FY2025); semi ~$37B | ~$1.9T | Custom ASIC co-design; ~90% cloud switch silicon | No major DC chip CVEs | No | None | None |
| Marvell | OCTEON DPUs, Custom AI ASICs, PAM4 DSPs (400G/800G) | AWS (Trainium co-design), Microsoft (Maia) | $8.2B (FY2026); DC $4.16B | ~$90B | Custom silicon co-design; optical interconnect | No major CVEs | No | None | None |

---

## 2. Storage Solutions

| Vendor | Product Lines | Major Customers | Revenue | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Samsung Electronics | PM9D3/PM1733 SSDs, V-NAND, HBM3E, DDR5 DRAM | All hyperscalers, OpenAI, NVIDIA | ~$233B total; memory ~$100B+ | ~$350B | #1 DRAM revenue; 28% NAND share | Samsung SSD firmware bugs (historical); DRAM Rowhammer | No | None | None |
| SK hynix | HBM3E (12/16-hi), enterprise SSDs, DDR5, CXL memory | NVIDIA (sole LPDRAM for GB-series), all hyperscalers | $68B; HBM ~57% market share | ~$625B | #1 HBM supplier; NVIDIA preferred partner | No major CVEs | **Participating vendor** | None | None |
| Micron Technology | HBM3E, DDR5 RDIMMs, 9400 NVMe SSDs, CXL memory | NVIDIA, all hyperscalers | $37.4B (FY2025); DC 56% | ~$120B | DC revenue 137% YoY growth | Rowhammer-class DRAM vulns (academic) | No | None | None |
| Western Digital | Ultrastar DC HC680 (HDD), WD Gold, enterprise SSDs | Cloud hyperscalers | ~$13B (FY2024) | ~$25B | Pure-play HDD for AI data lakes; 62.8% HDD share | No major CVEs | No | None | None |
| Seagate | Exos HAMR drives (30TB+), Corvault, Lyve Cloud | Cloud hyperscalers | ~$10.5B (FY2025 est.) | ~$25B | HAMR technology leader; mass-capacity HDD | No major CVEs | No | None | None |
| Pure Storage | FlashArray//X, FlashBlade, Portworx (K8s) | 63% of Fortune 500; 14K+ customers | $3.17B (FY2025) | ~$21B | All-flash enterprise; subscription model | No major CVEs | No | None | None |
| Phison Electronics | PS5028-E28 (PCIe 5.0), enterprise NVMe controllers | SSD manufacturers, OEMs | ~$2B est.; 20%+ global SSD controller share | ~$8B | #1 independent SSD controller vendor | No major CVEs | No | None | None |

---

## 3. Servers / ODMs

| Vendor | Product Lines | Major Customers | Revenue | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Dell Technologies | PowerEdge (R760, XE9680 GPU servers), PowerScale | Enterprise, all hyperscalers | $113.5B (FY2026) | ~$95B | #1 branded server vendor (10% share) | iDRAC BMC vulns (historical) | No | None | None |
| HPE | ProLiant, Apollo (GPU), Cray (HPC), GreenLake | Enterprise, HPC/research, cloud | ~$30B (FY2025) | ~$25B | HPC leadership (Cray); GreenLake | iLO BMC vulns (historical CVEs) | No | None | None |
| Supermicro | GPU servers (SYS-421GU), liquid-cooled racks, storage | Hyperscalers, AI startups | ~$25B (FY2025 est.) | ~$30B | GPU-optimized; liquid cooling; 9%+ share | **CVE-2024-36435, CVE-2025-7937 (RoT bypass), CVE-2025-6198 (sig verification bypass)** | No | None | None |
| Foxconn/Hon Hai | GB200 NVL72 racks (for NVIDIA), custom hyperscaler servers | NVIDIA, Apple, all hyperscalers | ~$260B total; AI server ~$33B | ~$65B (TWSE) | World's largest EMS; #1 server ODM by volume | Supply chain opacity; limited firmware CVE disclosure | No | None | None |
| Quanta Computer | QuantaGrid GPU servers, custom hyperscaler designs | Meta, Microsoft, Google, Amazon | ~$50B; AI servers ~70% of revenue | ~$35B (TWSE) | Top Taiwan ODM; deep hyperscaler relationships | Limited public disclosure | No | None | None |
| Wiwynn | GPU server platforms, liquid-cooled racks, OCP-compliant | Microsoft (primary), Meta, hyperscalers | ~$15B est.; 164% revenue growth | ~$20B (TWSE) | OCP contributor; Microsoft preferred ODM | Limited public disclosure | No | None | None |
| Oxide Computer | Oxide Cloud Computer (integrated rack-scale) | Lawrence Livermore, CoreWeave, financial | Pre-revenue; $340M funding | Private | On-prem cloud; fully integrated HW+SW; open-source firmware | Security-first; no public CVEs | No | None | None |

---

## 4. Hardware Security Modules (HSM, TPM, Root of Trust)

| Vendor | Product Lines | Major Customers | Revenue | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Thales Group | Luna Network HSM 7, payShield 10K, CipherTrust | Financial, government, cloud | ~$20B total; DIS ~$5B | ~$45B | #1 HSM vendor (28% share); payment HSM leader | FIPS 140-2 L3 certified; no major HSM CVEs | No | None | None |
| Entrust | nShield Connect XC, nShield as-a-Service, CodeSafe | Financial, healthcare, government | ~$3B est. (private) | Private (Thoma Bravo) | Identity + HSM; nShield FIPS 140-2 L3 | No major CVEs | No | None | None |
| Utimaco | SecurityServer Se Gen2, CryptoServer, u.trust Anchor | Financial, telecom, government | ~$300M est. | Private | German engineering; payment + GP HSM | FIPS 140-2 L3; no major CVEs | No | None | None |
| Infineon | OPTIGA TPM 2.0 (SLB 9670/9672), OPTIGA Trust | Server OEMs, automotive, industrial | ~$16.3B total | ~$62B | #1 discrete TPM vendor | TPM firmware vulns (historical) | No | **Recommended for SL3/SL4** per IEC 62443 | None |
| Yubico | YubiKey 5 series, YubiKey Bio, YubiHSM 2 | Enterprise MFA, cloud identity | ~$220M | ~$1.2B (STO) | Hardware auth keys; FIDO2/WebAuthn | YubiKey 5 side-channel (CVE-2024-45678, ECDSA key extraction) | No | None | None |
| Lattice Semiconductor | MachXO3D (secure FPGA), Sentry (PFR), Avant | Server OEMs (platform security) | $523M; server +85% YoY | ~$10B | Low-power FPGA for platform firmware security | No major CVEs | No | None | None |

---

## 5. Baseboard Management Controllers (BMC)

| Vendor | Product Lines | Major Customers | Revenue | Market Cap | Niche | Security Issues | OCP S.A.F.E. | IEC 62443 SL | SIL |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| ASPEED Technology | AST2600 (current), AST2700 (next-gen), BMC SoCs | All server OEMs (Dell, HPE, Supermicro, Lenovo) | ~$290M; +40.6% YoY | ~$15B (TPEX) | Near-monopoly on BMC silicon | CVE-2019-6260 (memory access); attack surface for all downstream BMC firmware | No | None | None |
| Nuvoton Technology | NPCM8mnx (Arbel, quad A35), NPCM750 | Server OEMs, OCP community | Part of Winbond; ~$1B total | ~$3B (TWSE) | **First BMC chip with OCP S.A.F.E.**; PQC support; TIP security enclave | No major public CVEs for NPCM8 | **Certified (NPCM8mnx)** | None | None |
| AMI (American Megatrends) | MegaRAC BMC firmware, Aptio UEFI BIOS | All server OEMs worldwide | Private (~$500M est.) | Private | Dominant BMC firmware; **first IBV with OCP S.A.F.E.** | MegaRAC: CVE-2023-34329/34330 (auth bypass + code exec); affects 15+ OEMs | **Certified (MegaRAC)** | None | None |
| Insyde Software | InsydeH2O UEFI firmware, OpenBMC distributions | Server/PC OEMs | Private (~$100M est.) | Private | UEFI firmware for servers/embedded | LogoFAIL; PixieFail; multiple UEFI vulns | No | None | None |
| OpenBMC | Linux-based open BMC firmware (Yocto-based) | Google, Meta, Microsoft, Rackspace | Open-source | N/A | Open-source BMC; hyperscaler-driven | Depends on underlying silicon vulns | N/A | None | None |

---

## 6. Open Silicon Root of Trust

| Project | Sponsors | Status (2026) | Key Features | OCP S.A.F.E. Relationship |
|:---|:---|:---|:---|:---|
| **Caliptra** (CHIPS Alliance) | AMD, Google, Microsoft, NVIDIA; AMI, ASPEED, Marvell, Nuvoton | Caliptra 2.1 released (2025) | Open-source silicon RoT; quantum-resilient crypto; hardware key mgmt | Core enabler for OCP S.A.F.E. compliance |
| **OpenTitan** | Google (lead), lowRISC, ETH Zurich, Western Digital, Nuvoton, Seagate | Production silicon available | Standalone open-source RoT chip; RISC-V based | Complementary; discrete RoT vs. integrated |

---

## OCP S.A.F.E. Certification Status (April 2026)

| Vendor | Product | Status | Date |
|:---|:---|:---|:---|
| **AMI** | MegaRAC BMC firmware | **Certified** — first IBV | Oct 2024 |
| **Nuvoton** | NPCM8mnx BMC SoC | **Certified** — first BMC silicon | Jul 2025 |
| **AMD** | (Unspecified) | Participating vendor | Ongoing |
| **SK hynix** | (Unspecified) | Participating vendor | Ongoing |
| **Intel** | (Silicon-level) | Participating vendor | Ongoing |

> [!warning] OCP S.A.F.E. Gap
> No major server OEM (Dell, HPE, Lenovo, Supermicro, Foxconn, Quanta) has achieved OCP S.A.F.E. for server platforms. No storage vendor (Samsung, Micron, WD, Seagate) has certified DC storage. No HSM vendor has pursued S.A.F.E. This is the core of Tetrel's value proposition.

> [!warning] BMC: Highest-Risk Attack Surface
> - Supermicro: 6+ critical BMC CVEs (2024-2025) including Root of Trust bypass
> - AMI MegaRAC: CVE-2023-34329/34330 (auth bypass + RCE); affects 15+ OEMs
> - ASPEED: Near-monopoly means one chip vulnerability cascades across entire server industry
> - Cross-vendor UEFI: LogoFAIL, PixieFail affect all firmware vendors

**Research conducted April 29, 2026.**
