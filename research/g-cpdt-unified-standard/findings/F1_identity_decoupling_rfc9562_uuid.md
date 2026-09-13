# Finding F1: The Identity Decoupling Principle and The Asset Reference (RFC 9562 UUID)

## 1. The Thesis
Promoting any single native identifier from DEXPI (`TagName`), CycloneDX (`purl`), or IEC 61970 CIM (`mRID`) to serve as the unified join key inevitably causes system failure across industrial lifecycles. G_CPDT must enforce **Identity Decoupling**: introducing a neutral, immutable, 128-bit canonical UUID Asset Reference (RFC 9562) that binds native objects without ever injecting foreign identifiers into native files (Requirement R-9).

---

## 2. Triangulated Evidence

### 1. TagName Failures (DEXPI / ISO 15926)
- **Collisions & Local Scope**: A `TagName` (e.g. `P-101`, `V-204`) is scoped exclusively to a single plant or unit [S01, S06]. Across an enterprise portfolio of 50 refineries or wind farms, `P-101` exists 50 times.
- **Semantic Mismatch with Software**: Build systems, firmware compilers, and package registries have zero awareness of the facility or drawing where an artifact will run [S02]. A compiler building OpenBMC firmware cannot mint a P&ID TagName.
- **Physical Lifecycle Disconnect**: Under ISO 15926-14, a `TagName` designates a *Functional Location* [S01, S09]. When a pump wears out after 5 years and is replaced with a different model, the `TagName` stays `P-101`, but the physical equipment serial number, firmware revision, and hardware bill of materials change completely.

### 2. Package URL Failures (CycloneDX / ECMA-427)
- **Version Volatility**: A `purl` (e.g., `pkg:generic/vfd-firmware@4.2.1`) identifies a specific release package in a registry [S02]. Upgrading firmware to `@4.2.2` generates a brand-new `purl`. If `purl` were the primary key, a security patch would sever all physical plant piping and electrical graph connections [S06].
- **Category Inapplicability**: Physical process equipment (vessels, bursting discs, piping manifolds, manual valves) contains zero silicon and executes zero software. Forcing a `purl` onto an autoclave is impossible.

### 3. Master Resource Identifier Failures (IEC 61970 CIM)
- **Boundary Restriction**: `mRID` is unique only within a specific *Model Authority Set* (MAS) [S03].
- **Domain Blindness**: Most plant assets (heat exchangers, distillation columns, cooling towers) are non-conducting process elements and never appear in a power network EMS model [S03, S06].

---

## 3. The Normative Solution in G_CPDT
G_CPDT formalizes the **Asset Reference** ($UUID_{AR}$):
$$\text{Asset Reference} \in \text{UUIDv4 / UUIDv7 (RFC 9562)}$$
Each domain asserts its relationship to this reference independently:
- **DEXPI**: `<GenericAttribute Name="AssetReference" Value="$UUID_{AR}$"/>`
- **CycloneDX**: `{"name": "assetjoin:ref", "value": "$UUID_{AR}"}`
- **CIM**: `join:assetReference "$UUID_{AR}"`

**Invariant (Requirement R-9)**: No native file is ever permitted to hold an identifier belonging to another leg (e.g., no `TagName` in CycloneDX, no `purl` in DEXPI XML). This preserves native schema validity ($R\text{-}10$) and eliminates cascading updates when software versions or CAD drawings change.
