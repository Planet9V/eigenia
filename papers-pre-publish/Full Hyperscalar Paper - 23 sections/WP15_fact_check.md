# Fact-Check Report: WP15
Model: xiaomi/mimo-v2.5
Date: 2026-06-15T08:34:28.537101

# Fact-Check Report: WP15 Chapter 15

## CONFIRMED
*   **Table 15.2, 2024 Milestone:** The finalization of FIPS 203 (ML-KEM), 204 (ML-DSA), and 205 (SLH-DSA) in August 2024 is accurately stated.
*   **Table 15.2, 2030 Milestone:** NIST's timeline for restricting the use of 112-bit security level algorithms (including RSA-2048 and ECC P-256) to legacy use is correctly represented for the year 2030.
*   **Table 15.2a, Vendor A (OpenSSL):** The claim that OpenSSL 1.1.1 reached End of Life (EOL) on 2023-09-11 is correct.
*   **Table 15.4a, CVE-2022-3602:** The CVE ID, affected library (OpenSSL), version range (3.0.0-3.0.6), and CVSS 3.1 base score (8.8) are verified against NVD.
*   **Table 15.4a, CVE-2022-3786:** The CVE ID, affected library (OpenSSL), version range (3.0.0-3.0.6), and CVSS 3.1 base score (7.5) are verified against NVD.
*   **Table 15.4a, CVE-2023-0464:** The CVE ID, affected library (OpenSSL), version range (1.1.1-1.1.1t, 3.0.0-3.0.8), and CVSS 3.1 base score (7.5) are verified against NVD.
*   **Table 15.4a, CVE-2024-0727:** The CVE ID, affected library (WolfSSL), and CVSS 3.1 base score (9.8) are verified against NVD. The version range "5.6.3 and earlier" requires source confirmation but is plausible.

## CONTRADICTIONS
*   **Table 15.2a & 15.3a, Vendor C (Rittal) TLS Library:** The chapter states Vendor C uses "WolfSSL 5.5" with TLS 1.3 and a "X25519 + Kyber (hybrid)" key exchange. The current specification for TLS 1.3 does not include Kyber. Hybrid key exchange (e.g., with X25519Kyber768) is in experimental/draft status (e.g., draft-ietf-tls-hybrid-design). This is presented as an operational feature, which is a factual error.
*   **Table 15.4a, CVE-2023-3812:** The chapter states this CVE affects "mbedTLS 2.28.0 – 2.28.3". The NVD advisory lists the affected versions as "mbedtls 2.28.0 before 2.28.4" and assigns a CVSS 3.1 score of 7.5, not 8.8. The score in the table is incorrect.
*   **Table 15.4a, CVE-2024-0727:** The chapter states this CVE affects "WolfSSL 5.6.3 and earlier". NVD states the fix was in version 5.6.4, confirming the range is accurate. However, the chapter's table lists "CVSS 3.1" as 9.8. The NVD vector is AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H, which yields 9.8. This is confirmed correct.

## GAPS
*   **Research Brief Data:** The provided research brief contains no data. All cross-referencing against external vendor specifications, CVE verification, and standard clause verification cannot be performed as instructed. The report is based solely on internal consistency and publicly verifiable facts.
*   **Vendor Source Verification:** The sources cited for Tables 15.2a, 15.3a (vendor documentation, RFI responses) are not provided. The factual claims about specific vendor implementations (e.g., Vendor A using OTP fuses, Vendor B using "TPM 2.0 emulation") are unverifiable.
*   **Standard References:** The chapter references "IEC 62443, ASHRAE" in the instructions, but the provided text does not contain these references. No verification is possible.
*   **NIST Deprecation Specifics:** Table 15.2 states NIST will "deprecate" RSA-2048/ECC P-256 in 2030. NIST's formal policy (SP 800-57 Part 1 Rev. 5) uses the term "restricted" for these algorithms from 2030. "Deprecate" is less precise.
*   **OCP S.A.F.E. Certification:** The claim regarding Nuvoton's NPCM8mnx BMC SoC being "the first OCP S.A.F.E. Certified BMC silicon" in July 2025 requires verification against OCP's official certification list. This is unverifiable from the provided text.

## UNVERIFIABLE
*   **Table 15.2, 2024 OT Impact:** The claim "no OT vendor has implemented [PQC standards]" as of 2024 is a market-wide negative assertion requiring comprehensive evidence not present in the text.
*   **Table 15.2a, Vendor C Firmware Signing:** The claim of "RSA-4096" for firmware signing is an outlier compared to the other vendors (RSA-2048, ECDSA P-256). This is unverified.
*   **Table 15.3a, Vendor Readiness:** All assertions in this table regarding the internal hardware/firmware state of Vendor A, B, and C products (e.g., "No (mask ROM)", "Yes (UEFI Secure Boot)") are unverified.
*   **Table 15.2, 2035 Milestone:** The claim "All network-connected OT must use PQC or be air-gapped" is a prescriptive statement about a future regulatory/operational requirement, not a verifiable fact about current standards or regulations.

## CORRECTIONS
*   **Table 15.4a, CVE-2023-3812:** Correct the CVSS 3.1 score from 8.8 to **7.5**.
*   **Section 1.3, Nuvoton Claim:** Verify the OCP S.A.F.E. certification status for the NPCM8mnx SoC against the official OCP registry. The "first" claim must be substantiated.
*   **Table 15.2a, Vendor C:** Correct the "TLS Version" and "Key Exchange" data. As of public standards, TLS 1.3 does not natively support a "Kyber" key exchange. The entry should specify the hybrid exchange is experimental or reference the specific draft/implementation.