# Finding F2: Non-Destructive Extension Mechanisms Across Standards Bodies

## 1. The Thesis
Previous attempts to unify CAD, BOM, and electrical grid models failed because authors attempted to create a "unified super-schema," which required forking ISO 15926, CycloneDX, and CIM. Standards bodies categorically reject forks. G_CPDT succeeds by utilizing **sanctioned, non-breaking extension points** that allow native files to remain 100% valid against their governing specifications.

---

## 2. Triangulated Extension Architecture

| Leg | Governing Standard | Sanctioned Extension Point | Governance Body | Status & Compatibility |
|:---|:---|:---|:---|:---|
| **Physical (CAD/P&ID)** | ISO 15926 / DEXPI 2.0 | **DEXPI Profile** & `GenericAttributes` | DEXPI e.V. / ISO TC 184 | Fully valid against DEXPI 2.0 XML schema; uses DEXPI RDL sandbox [S01]. |
| **Cyber (Multi-BOM)** | CycloneDX 1.6+ (ECMA-424) | **Property Taxonomy** (`assetjoin:`) | OWASP / Ecma International TC54 | Fully valid against unmodified ECMA-424 JSON/XML schemas [S02]. |
| **Grid (Electrical)** | IEC 61970-301 CIM | **Cyber-Physical CIM Profile** | IEC TC 57 / ENTSO-E | Follows precedent of IEC 61970-600 CGMES profiles [S03]. |

---

## 3. Detailed Extension Bindings

### 1. DEXPI 2.0: The Profile & GenericAttribute Carrier
- **Attachment Rule (R-17)**: The join attribute set MUST attach directly to the equipment object carrying the `TagName`, NEVER to a symbol, line shape, or graphic element.
- **Payload**:
  ```xml
  <Equipment ID="EQ-P-101">
    <TagName>P-101</TagName>
    <ISO15926-4Class>centrifugal pump</ISO15926-4Class>
    <GenericAttributes Set="AssetJoin">
      <GenericAttribute Name="AssetReference" Value="3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2"/>
      <GenericAttribute Name="AssetReferenceRelation" Value="identity"/>
      <GenericAttribute Name="AssetReferenceAuthority" Value="https://authority.eigenia.nl/cad"/>
      <GenericAttribute Name="AssetReferenceBasis" Value="PID-COOL-004 rev D 2026-04-18"/>
    </GenericAttributes>
  </Equipment>
  ```

### 2. CycloneDX 1.6+: The `assetjoin` Registered Namespace
- **Placement Rule (R-21)**: Join properties MUST reside inside the `properties` array of a `component` (e.g. `type: "device"`, `type: "firmware"`) or `service`, NEVER at document metadata level.
- **Payload**:
  ```json
  {
    "type": "device",
    "bom-ref": "pump-vfd-drive",
    "name": "Variable Frequency Drive Controller",
    "properties": [
      { "name": "assetjoin:ref", "value": "3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2" },
      { "name": "assetjoin:relation", "value": "controls" },
      { "name": "assetjoin:authority", "value": "https://authority.eigenia.nl/sec" },
      { "name": "assetjoin:basis", "value": "BUILD-VFD-20260412 2026-04-12" }
    ]
  }
  ```

### 3. IEC 61970 CIM: The Profile Property Extension
- **Model Authority Rule (R-29)**: The CIM leg MUST state the Model Authority Set (`join:modelAuthoritySet`) alongside the asset reference.
- **Payload (RDF/XML snippet)**:
  ```xml
  <cim:ConductingEquipment rdf:ID="c81d4e2e-bcf2-11e6-869b-7df92533d2db">
    <cim:IdentifiedObject.name>Feeder-MCC3-P101</cim:IdentifiedObject.name>
    <join:assetReference>3f2a91c4-7b60-4d1e-9a55-0c8e21b4f7d2</join:assetReference>
    <join:relation>supplies</join:relation>
    <join:authority>https://authority.eigenia.nl/grid</join:authority>
    <join:basis>NM-EXPORT-2026-Q2</join:basis>
    <join:modelAuthoritySet>https://grid.operator.nl/mas/substation-west</join:modelAuthoritySet>
  </cim:ConductingEquipment>
  ```
