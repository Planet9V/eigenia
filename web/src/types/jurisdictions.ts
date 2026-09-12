export interface StatutoryFramework {
  id: number;
  official_title: string;
  short_name: string;
  statute_type: string;
  legal_citation: string;
  enactment_date?: string | null;
  effective_date?: string | null;
  enforcement_deadline?: string | null;
  supervisory_authority: string;
  status: string;
  metadata?: Record<string, any>;
}

export interface CyberSecurityMandate {
  target_domain: string;
  baseline_standard_ref: string;
  mandatory_certifications: string;
  default_password_ban: boolean;
  sbom_required: boolean;
  cbom_required: boolean;
  patch_management_sla_days?: number | null;
  details: string;
}

export interface IncidentDisclosureRule {
  breach_type: string;
  notification_timeline_hours: number;
  second_stage_timeline_hours?: number | null;
  final_report_timeline_days?: number | null;
  recipient_authorities: string[];
  ransomware_payment_reporting: boolean;
  threshold_trigger_definition: string;
}

export interface PenaltyStructure {
  max_administrative_fine_fixed: number;
  fine_currency: string;
  max_turnover_percentage: number;
  criminal_liability_directors: boolean;
  market_withdrawal_sanctions: boolean;
}

export interface SectorObligation {
  sector: string;
  scope_classification: string;
  specific_obligations: string;
}

export interface CountryJurisdictionData {
  iso2: string;
  iso3: string;
  numeric_code: string;
  country_name: string;
  continent: string;
  region: string;
  sub_region: string;
  sovereign_status: string;
  capital: string;
  currency: string;
  primary_cyber_statute: string;
  primary_privacy_statute: string;
  incident_disclosure_hours: number;
  default_password_ban: boolean;
  sbom_required: boolean;
  cbom_required: boolean;
  patch_management_sla_days: number;
  data_localization_required: boolean;
  localization_scope: string;
  cross_border_transfer_mechanism: string;
  sensitive_data_categories: string[];
  supervisory_dpa: string;
  crypto_import_license_required: boolean;
  crypto_export_controls: string;
  approved_encryption_standards: string;
  post_quantum_mandate: string;
  regulatory_agency_crypto: string;
  max_administrative_fine_fixed: number;
  fine_currency: string;
  max_turnover_percentage: number;
  criminal_liability_directors: boolean;
  market_withdrawal_sanctions: boolean;
  statutory_frameworks: StatutoryFramework[];
  cyber_security_mandates: CyberSecurityMandate[];
  incident_disclosure_rules: IncidentDisclosureRule[];
  penalty_structures: PenaltyStructure[];
  sector_applicability: Record<string, SectorObligation>;
}

export interface JurisdictionMatrixDataset {
  metadata: {
    total_jurisdictions: number;
    generated_at: string;
    schema_version: string;
    source_database: string;
  };
  countries: Record<string, CountryJurisdictionData>;
  by_numeric: Record<string, string>;
  by_iso3: Record<string, string>;
}

export type MapProjectionMode = "globe" | "flat";

export type RegulatoryDimension =
  | "incident_clock"
  | "default_password"
  | "sbom_mandate"
  | "data_localization"
  | "crypto_controls"
  | "penalties";

export type SectorFilter =
  | "All"
  | "Energy"
  | "Water"
  | "Healthcare"
  | "Financial Services"
  | "Telecom"
  | "OT/Industrial"
  | "Transport";

export interface FacilityMarker {
  id: string;
  name: string;
  sector: SectorFilter;
  lat: number;
  lng: number;
  iso2: string;
  criticality: "High" | "Critical";
  details: string;
}

export interface SupplyChainCorridor {
  id: string;
  sourceFacilityId: string;
  sourceName: string;
  sourceCoords: [number, number]; // [lng, lat]
  sourceIso2?: string;
  sourceRegime?: string;
  sourceSlaHours?: number;
  targetIso2: string;
  targetCountryName: string;
  targetCoords: [number, number]; // [lng, lat]
  targetRegime?: string;
  targetSlaHours?: number;
  sector?: SectorFilter;
  corridorType: "Component Supply" | "Telemetry Relay" | "Grid Intertie" | "Subsea Transit" | "Pipeline Interconnect";
  statutoryGate: string;
  statutoryArticleRef?: string;
  activeStatus: "Operational" | "CAB Audit Pending" | "Statutory Review";
  clockDeltaHours?: number;
  customsDwellRiskDays?: number;
  preClearanceHours?: number;
  article19LiabilityEurM?: number;
  complianceParityScore?: number;
  componentClasses?: string[];
  panTokenStatus?: "VERIFIED" | "PENDING_SBOM" | "UNDER_AUDIT";
}

export interface ComplianceActionItem {
  id: string;
  priority: "High" | "Medium" | "Standard";
  title: string;
  statuteRef: string;
  timeframe: string;
  actionRequired: string;
  category: "Access Control" | "Software Assurance" | "Incident Response" | "Data Residency";
}

export interface BilateralComparisonDelta {
  dimension: string;
  label: string;
  countryAValue: string | number | boolean;
  countryBValue: string | number | boolean;
  deltaText: string;
  divergenceLevel: "Aligned" | "Moderate" | "Critical";
}

export interface TourStep {
  id: string;
  stepNumber: number;
  totalSteps: number;
  title: string;
  badge: string;
  description: string;
  targetSelector?: string;
  targetCamera?: {
    yaw: number;
    pitch: number;
    zoom: number;
  };
  simulatedAction?: {
    type: "click" | "select_dimension" | "select_facility" | "select_country" | "open_comparator";
    targetIso2?: string;
    dimension?: RegulatoryDimension;
    facilityId?: string;
    description: string;
  };
  tooltipPlacement: "bottom" | "top" | "left" | "right" | "center";
}

