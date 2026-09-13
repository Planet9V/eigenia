-- ============================================================================
-- GLOBAL STATUTORY JURISDICTION MATRIX SCHEMA
-- Architecture: assurance_network
-- Database: oxot_v6_dev (PostgreSQL 17)
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS assurance_network;

-- 1. Jurisdictions (Sovereign States & Territories)
CREATE TABLE IF NOT EXISTS assurance_network.jurisdictions (
    id SERIAL PRIMARY KEY,
    country_name VARCHAR(150) NOT NULL,
    iso2 CHAR(2) NOT NULL UNIQUE,
    iso3 CHAR(3) NOT NULL UNIQUE,
    numeric_code CHAR(3),
    continent VARCHAR(50) NOT NULL,
    region VARCHAR(100),
    sub_region VARCHAR(100),
    sovereign_status VARCHAR(100) NOT NULL DEFAULT 'UN Member State',
    capital VARCHAR(150),
    currency VARCHAR(10),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jurisdictions_continent ON assurance_network.jurisdictions (continent);
CREATE INDEX IF NOT EXISTS idx_jurisdictions_iso2 ON assurance_network.jurisdictions (iso2);
CREATE INDEX IF NOT EXISTS idx_jurisdictions_iso3 ON assurance_network.jurisdictions (iso3);

-- 2. Statutory Frameworks (Acts, Regulations, Executive Orders, Directives)
CREATE TABLE IF NOT EXISTS assurance_network.statutory_frameworks (
    id SERIAL PRIMARY KEY,
    jurisdiction_id INT NOT NULL REFERENCES assurance_network.jurisdictions(id) ON DELETE CASCADE,
    official_title TEXT NOT NULL,
    short_name VARCHAR(150) NOT NULL,
    statute_type VARCHAR(100) NOT NULL, -- Regulation, Directive, Act, Executive Order, Ministerial Decree, National Standard
    legal_citation VARCHAR(255),
    enactment_date VARCHAR(50),
    effective_date VARCHAR(50),
    enforcement_deadline VARCHAR(50),
    supervisory_authority TEXT NOT NULL,
    status VARCHAR(150) NOT NULL DEFAULT 'In Force', -- Enacted, In Force, Pending Application, Proposed
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_statutory_frameworks_jur ON assurance_network.statutory_frameworks (jurisdiction_id);
CREATE INDEX IF NOT EXISTS idx_statutory_frameworks_short ON assurance_network.statutory_frameworks (short_name);
CREATE INDEX IF NOT EXISTS idx_statutory_frameworks_meta ON assurance_network.statutory_frameworks USING GIN (metadata);

-- 3. Sector Applicability
CREATE TABLE IF NOT EXISTS assurance_network.sector_applicability (
    id SERIAL PRIMARY KEY,
    statute_id INT NOT NULL REFERENCES assurance_network.statutory_frameworks(id) ON DELETE CASCADE,
    sector VARCHAR(100) NOT NULL, -- Energy, Water, Healthcare, Financial Services, Telecom, OT/Industrial, Public Sector, Transport
    scope_classification VARCHAR(100) NOT NULL, -- Essential Entity, Important Entity, Critical Infrastructure, General Commercial
    specific_obligations TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sector_applicability_statute ON assurance_network.sector_applicability (statute_id);
CREATE INDEX IF NOT EXISTS idx_sector_applicability_sector ON assurance_network.sector_applicability (sector);

-- 4. Cyber Security & Digital Product Assurance Mandates
CREATE TABLE IF NOT EXISTS assurance_network.cyber_security_mandates (
    id SERIAL PRIMARY KEY,
    jurisdiction_id INT NOT NULL REFERENCES assurance_network.jurisdictions(id) ON DELETE CASCADE,
    statute_id INT REFERENCES assurance_network.statutory_frameworks(id) ON DELETE CASCADE,
    target_domain VARCHAR(100) NOT NULL, -- ICS/OT, Digital Equipment, Cloud, IoT, Supply Chain, General IT
    baseline_standard_ref VARCHAR(150), -- e.g. IEC 62443, NIST SP 800-53, ISO/IEC 27001, BSI IT-Grundschutz
    mandatory_certifications TEXT, -- e.g. Module B+C CAB examination, Common Criteria EAL4+
    default_password_ban BOOLEAN NOT NULL DEFAULT FALSE,
    sbom_required BOOLEAN NOT NULL DEFAULT FALSE,
    cbom_required BOOLEAN NOT NULL DEFAULT FALSE,
    patch_management_sla_days INT,
    details TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cyber_mandates_jur ON assurance_network.cyber_security_mandates (jurisdiction_id);

-- 5. Data Privacy & Sovereignty
CREATE TABLE IF NOT EXISTS assurance_network.data_privacy_sovereignty (
    id SERIAL PRIMARY KEY,
    jurisdiction_id INT NOT NULL REFERENCES assurance_network.jurisdictions(id) ON DELETE CASCADE,
    statute_id INT REFERENCES assurance_network.statutory_frameworks(id) ON DELETE CASCADE,
    primary_privacy_law TEXT NOT NULL,
    supervisory_dpa TEXT NOT NULL,
    data_localization_required BOOLEAN NOT NULL DEFAULT FALSE,
    localization_scope TEXT, -- Strict residency, local copy required, conditional, sector-only
    cross_border_transfer_mechanism TEXT NOT NULL, -- Adequacy, SCCs, BCRs, Government Security Assessment
    sensitive_data_categories TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_data_privacy_jur ON assurance_network.data_privacy_sovereignty (jurisdiction_id);

-- 6. Cryptography & Export/Import Controls
CREATE TABLE IF NOT EXISTS assurance_network.cryptography_controls (
    id SERIAL PRIMARY KEY,
    jurisdiction_id INT NOT NULL REFERENCES assurance_network.jurisdictions(id) ON DELETE CASCADE,
    crypto_import_license_required BOOLEAN NOT NULL DEFAULT FALSE,
    crypto_export_controls TEXT NOT NULL, -- Wassenaar Category 5 Part 2, EAR, National export regime
    mandatory_government_access_or_escrow BOOLEAN NOT NULL DEFAULT FALSE,
    approved_encryption_standards TEXT NOT NULL, -- AES-256, FIPS 140-3, ShangMi (SM2/3/4), GOST
    post_quantum_mandate TEXT, -- National PQC timelines / requirements
    regulatory_agency TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crypto_controls_jur ON assurance_network.cryptography_controls (jurisdiction_id);

-- 7. Incident & Breach Disclosure Rules
CREATE TABLE IF NOT EXISTS assurance_network.incident_disclosure_rules (
    id SERIAL PRIMARY KEY,
    jurisdiction_id INT NOT NULL REFERENCES assurance_network.jurisdictions(id) ON DELETE CASCADE,
    statute_id INT REFERENCES assurance_network.statutory_frameworks(id) ON DELETE CASCADE,
    breach_type VARCHAR(100) NOT NULL, -- Personal Data Breach, Critical Infrastructure Cyber Incident, Severe Product Vulnerability
    notification_timeline_hours INT NOT NULL, -- e.g. 2, 6, 12, 24, 72
    second_stage_timeline_hours INT, -- e.g. 72 for full CRA report
    final_report_timeline_days INT, -- e.g. 14, 30
    recipient_authorities TEXT[] NOT NULL, -- National CSIRT, DPA, Sector Regulator, ENISA
    ransomware_payment_reporting BOOLEAN NOT NULL DEFAULT FALSE,
    threshold_trigger_definition TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_incident_rules_jur ON assurance_network.incident_disclosure_rules (jurisdiction_id);
CREATE INDEX IF NOT EXISTS idx_incident_rules_hours ON assurance_network.incident_disclosure_rules (notification_timeline_hours);

-- 8. Penalty & Enforcement Structures
CREATE TABLE IF NOT EXISTS assurance_network.penalty_structures (
    id SERIAL PRIMARY KEY,
    jurisdiction_id INT NOT NULL REFERENCES assurance_network.jurisdictions(id) ON DELETE CASCADE,
    statute_id INT REFERENCES assurance_network.statutory_frameworks(id) ON DELETE CASCADE,
    max_administrative_fine_fixed NUMERIC,
    fine_currency VARCHAR(10),
    max_turnover_percentage NUMERIC, -- e.g. 2.0%, 2.5%, 4.0%
    criminal_liability_directors BOOLEAN NOT NULL DEFAULT FALSE,
    market_withdrawal_sanctions BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_penalty_jur ON assurance_network.penalty_structures (jurisdiction_id);

-- 9. Complete Consolidated Country Dossiers (JSONB Document Store)
CREATE TABLE IF NOT EXISTS assurance_network.country_full_dossiers (
    iso2 CHAR(2) PRIMARY KEY,
    iso3 CHAR(3) NOT NULL UNIQUE,
    country_name VARCHAR(150) NOT NULL,
    continent VARCHAR(50) NOT NULL,
    dossier JSONB NOT NULL,
    last_enriched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_country_dossiers_gin ON assurance_network.country_full_dossiers USING GIN (dossier);
CREATE INDEX IF NOT EXISTS idx_country_dossiers_continent ON assurance_network.country_full_dossiers (continent);
