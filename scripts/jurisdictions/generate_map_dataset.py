#!/usr/bin/env python3
"""
GENERATE CLIENT-OPTIMIZED JURISDICTION MATRIX DATASET FOR INTERACTIVE MAP
Extracts data from PostgreSQL 17 (oxot_v6_dev, assurance_network schema)
and compiles:
  1. web/src/data/jurisdictions-matrix.json (Full indexed dataset)
  2. web/src/data/jurisdiction-summary.json (Lightweight lookup for fast choropleth)
"""

import os
import json
import psycopg2
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
OUTPUT_FILE = BASE_DIR / "web" / "src" / "data" / "jurisdictions-matrix.json"
SUMMARY_FILE = BASE_DIR / "web" / "src" / "data" / "jurisdiction-summary.json"

def export_matrix():
    print("Connecting to PostgreSQL 17 (oxot_v6_dev on localhost:5434)...")
    conn = psycopg2.connect(
        host="localhost",
        port=5434,
        dbname="oxot_v6_dev",
        user="oxot",
        password="oxot_dev_local_only"
    )
    cur = conn.cursor()

    # 1. Fetch jurisdictions
    cur.execute("""
        SELECT id, country_name, iso2, iso3, numeric_code, continent, region, sub_region,
               sovereign_status, capital, currency
        FROM assurance_network.jurisdictions
        ORDER BY country_name ASC;
    """)
    jur_rows = cur.fetchall()
    print(f"Loaded {len(jur_rows)} jurisdictions.")

    # 2. Fetch statutory frameworks
    cur.execute("""
        SELECT jurisdiction_id, id, official_title, short_name, statute_type, legal_citation,
               enactment_date, effective_date, enforcement_deadline, supervisory_authority, status, metadata
        FROM assurance_network.statutory_frameworks
        ORDER BY id ASC;
    """)
    statutes_by_jur = {}
    statute_id_to_record = {}
    for r in cur.fetchall():
        j_id = r[0]
        st_id = r[1]
        st_obj = {
            "id": st_id,
            "official_title": r[2],
            "short_name": r[3],
            "statute_type": r[4],
            "legal_citation": r[5],
            "enactment_date": r[6],
            "effective_date": r[7],
            "enforcement_deadline": r[8],
            "supervisory_authority": r[9],
            "status": r[10],
            "metadata": r[11] if r[11] else {}
        }
        statutes_by_jur.setdefault(j_id, []).append(st_obj)
        statute_id_to_record[st_id] = st_obj

    # 3. Fetch cyber security mandates
    cur.execute("""
        SELECT jurisdiction_id, target_domain, baseline_standard_ref, mandatory_certifications,
               default_password_ban, sbom_required, cbom_required, patch_management_sla_days, details
        FROM assurance_network.cyber_security_mandates;
    """)
    cyber_by_jur = {}
    for r in cur.fetchall():
        cyber_by_jur.setdefault(r[0], []).append({
            "target_domain": r[1],
            "baseline_standard_ref": r[2],
            "mandatory_certifications": r[3],
            "default_password_ban": r[4],
            "sbom_required": r[5],
            "cbom_required": r[6],
            "patch_management_sla_days": r[7],
            "details": r[8]
        })

    # 4. Fetch data privacy & sovereignty
    cur.execute("""
        SELECT jurisdiction_id, primary_privacy_law, supervisory_dpa, data_localization_required,
               localization_scope, cross_border_transfer_mechanism, sensitive_data_categories
        FROM assurance_network.data_privacy_sovereignty;
    """)
    privacy_by_jur = {}
    for r in cur.fetchall():
        privacy_by_jur[r[0]] = {
            "primary_privacy_law": r[1],
            "supervisory_dpa": r[2],
            "data_localization_required": r[3],
            "localization_scope": r[4],
            "cross_border_transfer_mechanism": r[5],
            "sensitive_data_categories": r[6] if r[6] else []
        }

    # 5. Fetch cryptography controls
    cur.execute("""
        SELECT jurisdiction_id, crypto_import_license_required, crypto_export_controls,
               mandatory_government_access_or_escrow, approved_encryption_standards,
               post_quantum_mandate, regulatory_agency
        FROM assurance_network.cryptography_controls;
    """)
    crypto_by_jur = {}
    for r in cur.fetchall():
        crypto_by_jur[r[0]] = {
            "crypto_import_license_required": r[1],
            "crypto_export_controls": r[2],
            "mandatory_government_access_or_escrow": r[3],
            "approved_encryption_standards": r[4],
            "post_quantum_mandate": r[5],
            "regulatory_agency": r[6]
        }

    # 6. Fetch incident disclosure rules
    cur.execute("""
        SELECT jurisdiction_id, breach_type, notification_timeline_hours, second_stage_timeline_hours,
               final_report_timeline_days, recipient_authorities, ransomware_payment_reporting,
               threshold_trigger_definition
        FROM assurance_network.incident_disclosure_rules
        ORDER BY notification_timeline_hours ASC;
    """)
    incident_by_jur = {}
    for r in cur.fetchall():
        incident_by_jur.setdefault(r[0], []).append({
            "breach_type": r[1],
            "notification_timeline_hours": r[2],
            "second_stage_timeline_hours": r[3],
            "final_report_timeline_days": r[4],
            "recipient_authorities": r[5] if r[5] else [],
            "ransomware_payment_reporting": r[6],
            "threshold_trigger_definition": r[7]
        })

    # 7. Fetch penalty structures
    cur.execute("""
        SELECT jurisdiction_id, max_administrative_fine_fixed, fine_currency, max_turnover_percentage,
               criminal_liability_directors, market_withdrawal_sanctions
        FROM assurance_network.penalty_structures;
    """)
    penalty_by_jur = {}
    for r in cur.fetchall():
        penalty_by_jur.setdefault(r[0], []).append({
            "max_administrative_fine_fixed": float(r[1]) if r[1] is not None else 0.0,
            "fine_currency": r[2],
            "max_turnover_percentage": float(r[3]) if r[3] is not None else 0.0,
            "criminal_liability_directors": r[4],
            "market_withdrawal_sanctions": r[5]
        })

    # 8. Fetch sector applicability
    cur.execute("""
        SELECT statute_id, sector, scope_classification, specific_obligations
        FROM assurance_network.sector_applicability;
    """)
    sectors_by_statute = {}
    for r in cur.fetchall():
        sectors_by_statute.setdefault(r[0], []).append({
            "sector": r[1],
            "scope_classification": r[2],
            "specific_obligations": r[3]
        })

    # Compile output structure
    countries_dict = {}
    summary_list = []

    for r in jur_rows:
        j_id = r[0]
        name = r[1]
        iso2 = r[2]
        iso3 = r[3]
        num = r[4]
        cont = r[5]
        reg = r[6]
        sub_reg = r[7]
        status = r[8]
        cap = r[9]
        curr = r[10]

        statutes = statutes_by_jur.get(j_id, [])
        cyber = cyber_by_jur.get(j_id, [])
        privacy = privacy_by_jur.get(j_id, {})
        crypto = crypto_by_jur.get(j_id, {})
        incidents = incident_by_jur.get(j_id, [])
        penalties = penalty_by_jur.get(j_id, [])

        # Gather sector obligations from all statutes of this jurisdiction
        sectors_dict = {}
        for st in statutes:
            st_id = st["id"]
            sec_list = sectors_by_statute.get(st_id, [])
            for s in sec_list:
                s_name = s["sector"]
                if s_name not in sectors_dict:
                    sectors_dict[s_name] = s

        # Min incident hours
        min_hours = None
        for inc in incidents:
            h = inc.get("notification_timeline_hours")
            if h is not None:
                if min_hours is None or h < min_hours:
                    min_hours = h

        # Default password ban
        default_pwd_banned = any(c.get("default_password_ban") for c in cyber)
        sbom_req = any(c.get("sbom_required") for c in cyber)
        cbom_req = any(c.get("cbom_required") for c in cyber)
        min_patch_sla = None
        for c in cyber:
            sla = c.get("patch_management_sla_days")
            if sla:
                if min_patch_sla is None or sla < min_patch_sla:
                    min_patch_sla = sla

        # Penalties max
        max_turnover = 0.0
        max_fixed = 0.0
        fine_curr = curr
        director_crim = False
        market_with = False
        for p in penalties:
            if p["max_turnover_percentage"] > max_turnover:
                max_turnover = p["max_turnover_percentage"]
            if p["max_administrative_fine_fixed"] > max_fixed:
                max_fixed = p["max_administrative_fine_fixed"]
            if p["fine_currency"]:
                fine_curr = p["fine_currency"]
            if p["criminal_liability_directors"]:
                director_crim = True
            if p["market_withdrawal_sanctions"]:
                market_with = True

        primary_cyber = statutes[0]["short_name"] if statutes else f"{iso2} Cyber Law"
        primary_priv = privacy.get("primary_privacy_law", f"{iso2} Privacy Act")

        country_data = {
            "iso2": iso2,
            "iso3": iso3,
            "numeric_code": num,
            "country_name": name,
            "continent": cont,
            "region": reg,
            "sub_region": sub_reg,
            "sovereign_status": status,
            "capital": cap,
            "currency": curr,
            "primary_cyber_statute": primary_cyber,
            "primary_privacy_statute": primary_priv,
            "incident_disclosure_hours": min_hours if min_hours is not None else 72,
            "default_password_ban": default_pwd_banned,
            "sbom_required": sbom_req,
            "cbom_required": cbom_req,
            "patch_management_sla_days": min_patch_sla if min_patch_sla is not None else 30,
            "data_localization_required": privacy.get("data_localization_required", False),
            "localization_scope": privacy.get("localization_scope", "None"),
            "cross_border_transfer_mechanism": privacy.get("cross_border_transfer_mechanism", "Adequacy / Standard Clauses"),
            "sensitive_data_categories": privacy.get("sensitive_data_categories", []),
            "supervisory_dpa": privacy.get("supervisory_dpa", "National DPA"),
            "crypto_import_license_required": crypto.get("crypto_import_license_required", False),
            "crypto_export_controls": crypto.get("crypto_export_controls", "National Regime"),
            "approved_encryption_standards": crypto.get("approved_encryption_standards", "AES-256"),
            "post_quantum_mandate": crypto.get("post_quantum_mandate", "Standard Roadmap"),
            "regulatory_agency_crypto": crypto.get("regulatory_agency", "National Authority"),
            "max_administrative_fine_fixed": max_fixed,
            "fine_currency": fine_curr,
            "max_turnover_percentage": max_turnover,
            "criminal_liability_directors": director_crim,
            "market_withdrawal_sanctions": market_with,
            "statutory_frameworks": statutes,
            "cyber_security_mandates": cyber,
            "incident_disclosure_rules": incidents,
            "penalty_structures": penalties,
            "sector_applicability": sectors_dict
        }

        countries_dict[iso2] = country_data
        summary_list.append({
            "iso2": iso2,
            "iso3": iso3,
            "numeric_code": num,
            "country_name": name,
            "continent": cont,
            "incident_disclosure_hours": min_hours if min_hours is not None else 72,
            "default_password_ban": default_pwd_banned,
            "sbom_required": sbom_req,
            "cbom_required": cbom_req,
            "data_localization_required": privacy.get("data_localization_required", False),
            "max_turnover_percentage": max_turnover,
            "max_administrative_fine_fixed": max_fixed,
            "fine_currency": fine_curr
        })

    # Save full matrix
    full_output = {
        "metadata": {
            "total_jurisdictions": len(countries_dict),
            "generated_at": "2026-09-12T04:00:00Z",
            "schema_version": "1.0.0",
            "source_database": "PostgreSQL 17 / assurance_network"
        },
        "countries": countries_dict,
        "by_numeric": {c["numeric_code"]: c["iso2"] for c in countries_dict.values()},
        "by_iso3": {c["iso3"]: c["iso2"] for c in countries_dict.values()}
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(full_output, f, indent=2, ensure_ascii=False)
    print(f"[OK] Wrote full matrix to {OUTPUT_FILE} ({os.path.getsize(OUTPUT_FILE) / 1024:.1f} KB)")

    with open(SUMMARY_FILE, "w", encoding="utf-8") as f:
        json.dump(summary_list, f, indent=2, ensure_ascii=False)
    print(f"[OK] Wrote summary to {SUMMARY_FILE} ({os.path.getsize(SUMMARY_FILE) / 1024:.1f} KB)")

    conn.close()

if __name__ == "__main__":
    export_matrix()
