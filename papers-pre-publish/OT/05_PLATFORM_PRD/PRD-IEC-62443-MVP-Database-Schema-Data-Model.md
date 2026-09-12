# IEC 62443 Workshop App – Database Schema & Data Model

**Version:** 1.0  
**Status:** Ready for Implementation  
**Date:** December 2024  
**Audience:** Backend Engineers, DBAs, QA  

---

## Table of Contents

1. [Schema Overview](#schema-overview)
2. [PostgreSQL Complete Schema](#postgresql-complete-schema)
3. [Neo4j Graph Model](#neo4j-graph-model)
4. [Qdrant Collections](#qdrant-collections)
5. [Data Relationships](#data-relationships)
6. [Indexing Strategy](#indexing-strategy)
7. [Migration Strategy](#migration-strategy)
8. [Query Optimization](#query-optimization)

---

## Schema Overview

### Database Layer Stack

```
┌──────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│              Next.js API (REST endpoints)                    │
└──────────────────────────────────────────────────────────────┘
  ↓                          ↓                          ↓
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   Postgres 15    │  │   Neo4j 5.x      │  │  Qdrant 1.7.x    │
│ System of Record │  │ Relationship DB  │  │  Vector Store    │
│                  │  │                  │  │                  │
│ • Projects       │  │ • Graphs         │  │ • Embeddings     │
│ • Users          │  │ • Relationships  │  │ • Semantic Search│
│ • HARA Items     │  │ • Context        │  │ • Similarity     │
│ • Documents      │  │ • Patterns       │  │                  │
│ • Graph Nodes    │  │                  │  │                  │
│ • Audit Logs     │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Sync Strategy

```
User Action (Browser)
    ↓
Postgres Write (Transactional)
    ↓
Async Job Queue (Redis)
    ↓
Neo4j Sync (Graph Mirror)
Qdrant Sync (Vector Embedding)
    ↓
Notification to Client (WebSocket/Polling)
```

---

## PostgreSQL Complete Schema

### Table: `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  password_hash VARCHAR(512) NOT NULL,  -- bcrypt
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
```

**Purpose:** Single admin user authentication  
**Constraints:**
- `username` unique globally
- `password_hash` must be bcrypt (10+ rounds)
- `is_active` for soft deactivation

---

### Table: `projects`

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  operational_criticality ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status ENUM('DRAFT', 'SUBMITTED_FOR_REVIEW', 'APPROVED') DEFAULT 'DRAFT',
  metadata JSONB DEFAULT '{}',  -- Custom fields
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP  -- Soft delete
);

CREATE INDEX idx_projects_owner_id ON projects(owner_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_deleted_at ON projects(deleted_at) WHERE deleted_at IS NULL;
```

**Purpose:** Workshop session / risk assessment boundary  
**Constraints:**
- `owner_id` must exist in `users` table
- `name` required
- Soft delete via `deleted_at` timestamp

---

### Table: `phases`

```sql
CREATE TABLE phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  phase_number SMALLINT NOT NULL,  -- 1-8
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('DRAFT', 'SUBMITTED_FOR_REVIEW', 'APPROVED') DEFAULT 'DRAFT',
  submitted_at TIMESTAMP,
  approved_at TIMESTAMP,
  submitted_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(project_id, phase_number),
  CONSTRAINT valid_phase_number CHECK (phase_number BETWEEN 1 AND 8)
);

CREATE INDEX idx_phases_project_id ON phases(project_id);
CREATE INDEX idx_phases_status ON phases(status);
```

**Purpose:** Track workflow state through IEC 62443 phases  
**Constraints:**
- `phase_number` between 1–8
- Per-project unique phase numbers
- Track submission/approval metadata

---

### Table: `impact_categories`

```sql
CREATE TABLE impact_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,  -- e.g., "Safety", "Environmental"
  severity_scale JSONB NOT NULL,  -- {1: "Negligible", 2: "Minor", ..., 5: "Catastrophic"}
  description TEXT,
  display_order SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(project_id, name)
);

CREATE INDEX idx_impact_categories_project_id ON impact_categories(project_id);
```

**Purpose:** Define severity scales for HARA assessment  
**Example `severity_scale`:**
```json
{
  "1": "Negligible",
  "2": "Minor",
  "3": "Moderate",
  "4": "Major",
  "5": "Catastrophic"
}
```

---

### Table: `hara_items`

```sql
CREATE TABLE hara_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES phases(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,  -- e.g., "Tunnel Ventilation System"
  description TEXT,
  asset_type VARCHAR(100),  -- e.g., "Subsystem", "Device", "Service"
  impact_ratings JSONB DEFAULT '{}',  -- {category_id: score_1_to_5}
  calculated_risk_level ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') GENERATED ALWAYS AS (
    CASE
      WHEN (impact_ratings->>'max_score')::INT >= 20 THEN 'CRITICAL'::text
      WHEN (impact_ratings->>'max_score')::INT >= 15 THEN 'HIGH'::text
      WHEN (impact_ratings->>'max_score')::INT >= 10 THEN 'MEDIUM'::text
      ELSE 'LOW'::text
    END
  ) STORED,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id)
);

CREATE INDEX idx_hara_items_project_id ON hara_items(project_id);
CREATE INDEX idx_hara_items_risk_level ON hara_items(calculated_risk_level);
CREATE INDEX idx_hara_items_created_at ON hara_items(created_at DESC);
```

**Purpose:** HARA workshop rows (high-level functions/assets)  
**Example `impact_ratings`:**
```json
{
  "category-uuid-1": 3,
  "category-uuid-2": 5,
  "category-uuid-3": 2,
  "max_score": 5
}
```

---

### Table: `documents`

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  filename VARCHAR(512) NOT NULL,
  file_type VARCHAR(10),  -- pdf, docx, txt, csv
  file_size_bytes BIGINT,
  file_content BYTEA,  -- Store in DB for MVP; S3 in production
  ingestion_status ENUM('QUEUED', 'PROCESSING', 'COMPLETE', 'ERROR', 'CANCELLED') DEFAULT 'QUEUED',
  ingestion_started_at TIMESTAMP,
  ingestion_completed_at TIMESTAMP,
  ingestion_error TEXT,
  extracted_entities JSONB DEFAULT '{}',  -- {ASSET: [...], ZONE: [...], HAZARD: [...]}
  entity_count SMALLINT DEFAULT 0,
  source_url VARCHAR(512),  -- If fetched from external source
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_documents_ingestion_status ON documents(ingestion_status);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);
```

**Purpose:** Store uploaded RAMS, FMEA, hazard logs; track ingestion pipeline  
**Constraints:**
- `file_content` for MVP; migrate to S3 for production
- `extracted_entities` populated after spaCy NER processing

---

### Table: `graph_nodes`

```sql
CREATE TABLE graph_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  node_type VARCHAR(50) NOT NULL,  -- ZONE, ASSET, THREAT, CONDUIT
  label VARCHAR(255) NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',  -- Type-specific: {severity, mitre_id, protocol, ...}
  position_x NUMERIC(10, 2),
  position_y NUMERIC(10, 2),
  neo4j_id BIGINT,  -- Reference to Neo4j node ID for sync
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  
  CONSTRAINT valid_node_type CHECK (node_type IN ('ZONE', 'ASSET', 'THREAT', 'CONDUIT'))
);

CREATE INDEX idx_graph_nodes_project_id ON graph_nodes(project_id);
CREATE INDEX idx_graph_nodes_type ON graph_nodes(node_type);
CREATE INDEX idx_graph_nodes_created_at ON graph_nodes(created_at DESC);
```

**Purpose:** Threat canvas nodes (zones, assets, threats, conduits)  
**Example `metadata` (by type):**
- **ZONE:** `{security_level: "SL-T-2", description: "OT Network"}`
- **ASSET:** `{asset_type: "PLC", severity: "HIGH", ip_range: "10.0.1.0/24"}`
- **THREAT:** `{mitre_id: "T1059", tactic: "Execution", technique: "Command Line Interface"}`
- **CONDUIT:** `{protocol: "Modbus", encrypted: false}`

---

### Table: `graph_edges`

```sql
CREATE TABLE graph_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  source_id UUID NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  target_id UUID NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  edge_type VARCHAR(50) NOT NULL,  -- asset-in-zone, threat-targets, conduit-connects, ...
  metadata JSONB DEFAULT '{}',
  neo4j_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT valid_edge_type CHECK (edge_type IN (
    'asset-in-zone', 'conduit-connects', 'threat-targets', 'threat-affects',
    'document-evidences', 'hazard-affects', 'asset-implements'
  )),
  CONSTRAINT no_self_loops CHECK (source_id != target_id)
);

CREATE INDEX idx_graph_edges_project_id ON graph_edges(project_id);
CREATE INDEX idx_graph_edges_source ON graph_edges(source_id);
CREATE INDEX idx_graph_edges_target ON graph_edges(target_id);
CREATE INDEX idx_graph_edges_type ON graph_edges(edge_type);
```

**Purpose:** Threat canvas relationships (graph connectivity)  
**Valid edge types:**
- `asset-in-zone` – Asset belongs to Zone
- `conduit-connects` – Conduit connects two Zones
- `threat-targets` – Threat targets Asset
- `threat-affects` – Threat affects Zone (higher-level)
- `document-evidences` – Document evidences Hazard
- `hazard-affects` – Hazard affects Asset
- `asset-implements` – Asset implements Security Requirement (future)

---

### Table: `ai_conversations`

```sql
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  conversation_topic VARCHAR(100),  -- 'graph_query', 'threat_elicit', 'standard_search', etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_conversations_project_id ON ai_conversations(project_id);
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
```

**Purpose:** Track AI conversation threads for multi-turn interactions  
**Example uses:** Follow-up questions in same context

---

### Table: `ai_messages`

```sql
CREATE TABLE ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role ENUM('user', 'assistant') NOT NULL,  -- Message source
  message_text TEXT NOT NULL,
  tokens_used SMALLINT,  -- Approximate token count
  model_used VARCHAR(100),  -- Which LLM model processed this
  sources JSONB DEFAULT '[]',  -- [{collection, document_id, relevance}]
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_messages_conversation_id ON ai_messages(conversation_id);
CREATE INDEX idx_ai_messages_role ON ai_messages(role);
```

**Purpose:** Log AI query/response pairs for debugging and audit  
**Example `sources`:**
```json
[
  {
    "collection": "iec62443_standards",
    "document_id": "SR_1.1",
    "relevance": 0.92,
    "text_snippet": "Human user identification and authentication..."
  }
]
```

---

### Table: `config`

```sql
CREATE TABLE config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  is_encrypted BOOLEAN DEFAULT FALSE,
  is_sensitive BOOLEAN DEFAULT FALSE,  -- Hide in logs
  data_type VARCHAR(50),  -- string, integer, boolean, json
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES users(id)
);

CREATE INDEX idx_config_key ON config(key);
```

**Purpose:** Centralized configuration management (DB, API keys, LLM models)  
**Example rows:**
```
key: 'openrouter_api_key', value: 'sk-...', is_encrypted: true
key: 'llm_model_chat', value: 'meta-llama/llama-3-70b-instruct', is_encrypted: false
key: 'neo4j_uri', value: 'bolt://neo4j:7687', is_encrypted: false
key: 'max_upload_size_mb', value: '50', is_encrypted: false, data_type: 'integer'
```

---

### Table: `audit_log`

```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,  -- CREATE_PROJECT, UPDATE_HARA, DELETE_NODE, etc.
  resource_type VARCHAR(50),  -- projects, hara_items, graph_nodes, etc.
  resource_id UUID,
  resource_name VARCHAR(255),  -- Human-readable name (for deleted resources)
  changes JSONB DEFAULT '{}',  -- {field: {old: ..., new: ...}}
  ip_address INET,
  user_agent VARCHAR(512),
  status VARCHAR(20) DEFAULT 'SUCCESS',  -- SUCCESS, FAILURE
  error_message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_action ON audit_log(action);
CREATE INDEX idx_audit_log_resource_type ON audit_log(resource_type);
CREATE INDEX idx_audit_log_timestamp ON audit_log(timestamp DESC);
```

**Purpose:** Immutable compliance audit trail  
**Constraints:**
- No deletes; only archive
- All state-changing actions logged
- Timestamp is server-side (not trusting client)

---

## Neo4j Graph Model

### Node Labels & Properties

#### `Project`

```cypher
CREATE CONSTRAINT project_id_unique FOR (p:Project) REQUIRE p.id IS UNIQUE;

// Example node:
CREATE (p:Project {
  id: 'proj-uuid-1',
  name: 'Tunnel Control System',
  description: 'IEC 62443 assessment',
  created_at: timestamp(),
  postgresql_id: 'uuid-in-postgres'
})
```

#### `Zone`

```cypher
CREATE INDEX idx_zone_label FOR (z:Zone) ON (z.label);

// Example node:
CREATE (z:Zone {
  id: 'zone-uuid-1',
  label: 'OT Network',
  description: 'Operational Technology network segment',
  security_level: 'SL-T-2',
  postgresql_id: 'uuid-in-postgres'
})
```

#### `Asset`

```cypher
CREATE INDEX idx_asset_label FOR (a:Asset) ON (a.label);

// Example node:
CREATE (a:Asset {
  id: 'asset-uuid-1',
  label: 'PLC-01',
  asset_type: 'Programmable Logic Controller',
  description: 'Controls tunnel ventilation',
  severity: 'HIGH',
  postgresql_id: 'uuid-in-postgres'
})
```

#### `Threat`

```cypher
CREATE INDEX idx_threat_mitre_id FOR (t:Threat) ON (t.mitre_id);

// Example node:
CREATE (t:Threat {
  id: 'threat-uuid-1',
  label: 'Command Injection',
  mitre_id: 'T1059',
  tactic: 'Execution',
  technique: 'Command Line Interface',
  description: 'Attacker executes arbitrary commands on PLC',
  postgresql_id: 'uuid-in-postgres'
})
```

#### `Conduit`

```cypher
// Example node:
CREATE (c:Conduit {
  id: 'conduit-uuid-1',
  label: 'Modbus Gateway',
  protocol: 'Modbus TCP',
  encrypted: false,
  description: 'Communication between OT and IT networks',
  postgresql_id: 'uuid-in-postgres'
})
```

#### `Document`

```cypher
// Example node:
CREATE (d:Document {
  id: 'doc-uuid-1',
  filename: 'RAMS_Analysis_v2.pdf',
  source_type: 'RAMS',
  ingestion_date: timestamp(),
  entity_count: 25,
  postgresql_id: 'uuid-in-postgres'
})
```

#### `Hazard`

```cypher
// Example node:
CREATE (h:Hazard {
  id: 'hazard-uuid-1',
  label: 'Loss of Ventilation',
  description: 'Tunnel ventilation system failure',
  severity: 'CRITICAL',
  source_document: 'RAMS_Analysis_v2.pdf',
  postgresql_id: 'uuid-in-postgres'
})
```

---

### Relationship Types

```cypher
-- Containment relationships
(p:Project)-[:HAS_ZONE]->(z:Zone)
(z:Zone)-[:HAS_ASSET]->(a:Asset)
(p:Project)-[:HAS_THREAT]->(t:Threat)
(p:Project)-[:HAS_DOCUMENT]->(d:Document)

-- Threat relationships
(t:Threat)-[:TARGETS]->(a:Asset)
(t:Threat)-[:AFFECTS_ZONE]->(z:Zone)
(h:Hazard)-[:AFFECTS]->(a:Asset)

-- Communication relationships
(z:Zone)-[:CONNECTED_VIA]->(c:Conduit)-[:CONNECTS]->(z:Zone)

-- Evidence relationships
(d:Document)-[:EVIDENCES]->(h:Hazard)
(d:Document)-[:DOCUMENTS]->(a:Asset)

-- Operational relationships
(a:Asset)-[:IMPLEMENTS]->(r:Requirement)  -- Future: Security Requirements

-- Control relationships
(t:Threat)-[:MITIGATED_BY]->(r:Requirement)  -- Future: Security Controls
```

---

### Neo4j Initialization Script

```cypher
-- Create indexes for performance
CREATE INDEX FOR (p:Project) ON (p.id);
CREATE INDEX FOR (z:Zone) ON (z.id);
CREATE INDEX FOR (a:Asset) ON (a.id);
CREATE INDEX FOR (t:Threat) ON (t.id);
CREATE INDEX FOR (c:Conduit) ON (c.id);
CREATE INDEX FOR (d:Document) ON (d.id);
CREATE INDEX FOR (h:Hazard) ON (h.id);

-- Create constraints for uniqueness
CREATE CONSTRAINT project_id_unique FOR (p:Project) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT zone_id_unique FOR (z:Zone) REQUIRE z.id IS UNIQUE;
CREATE CONSTRAINT asset_id_unique FOR (a:Asset) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT threat_id_unique FOR (t:Threat) REQUIRE t.id IS UNIQUE;
CREATE CONSTRAINT conduit_id_unique FOR (c:Conduit) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT document_id_unique FOR (d:Document) REQUIRE d.id IS UNIQUE;
CREATE CONSTRAINT hazard_id_unique FOR (h:Hazard) REQUIRE h.id IS UNIQUE;

-- Create indexes for common searches
CREATE INDEX FOR (z:Zone) ON (z.label);
CREATE INDEX FOR (a:Asset) ON (a.label);
CREATE INDEX FOR (a:Asset) ON (a.asset_type);
CREATE INDEX FOR (t:Threat) ON (t.mitre_id);
CREATE INDEX FOR (h:Hazard) ON (h.severity);
```

---

## Qdrant Collections

### Collection: `iec62443_standards`

**Purpose:** Pre-ingested IEC 62443-3-2 foundational requirements and security requirements  
**Capacity:** ~2,000 vectors  
**Update frequency:** Static (quarterly or on standard updates)

**Vector configuration:**
```json
{
  "name": "iec62443_standards",
  "vectors": {
    "size": 1536,
    "distance": "Cosine"
  },
  "optimizers_config": {
    "default": {
      "disabled": false
    },
    "indexing": {
      "disabled": false
    }
  },
  "wal_config": {
    "wal_capacity_mb": 32,
    "wal_segments_ahead": 0
  }
}
```

**Point schema:**
```json
{
  "id": 1,
  "vector": [float; 1536],
  "payload": {
    "sr_id": "SR_1.1",
    "fr_id": "FR1",
    "title": "Human user identification and authentication",
    "description": "The control system shall provide the capability to identify and authenticate...",
    "foundational_requirement": "Identification and Authentication Control",
    "security_levels": ["SL-T-1", "SL-T-2", "SL-T-3", "SL-T-4"],
    "related_srs": ["SR_1.2", "SR_1.3"],
    "text_excerpt": "..."
  }
}
```

---

### Collection: `mitre_ics`

**Purpose:** MITRE ATT&CK ICS framework (tactics, techniques, procedures)  
**Capacity:** ~400 vectors  
**Update frequency:** Monthly sync from MITRE

**Vector configuration:**
```json
{
  "name": "mitre_ics",
  "vectors": {
    "size": 1536,
    "distance": "Cosine"
  }
}
```

**Point schema:**
```json
{
  "id": 1,
  "vector": [float; 1536],
  "payload": {
    "mitre_id": "T1059",
    "tactic": "Execution",
    "technique": "Command Line Interface",
    "platform": "Windows, Linux, macOS, ICS",
    "description": "Adversaries may abuse command line interfaces to interact with systems...",
    "detection": "Monitor process creation and command line arguments...",
    "mitigation": "Restrict command line access...",
    "references": ["https://attack.mitre.org/..."]
  }
}
```

---

### Collection: `project_docs`

**Purpose:** Project-specific uploaded documents (RAMS, FMEA, hazard logs), chunked and embedded  
**Capacity:** Grows with uploads (~10-100k vectors per active project)  
**Update frequency:** On document upload

**Vector configuration:**
```json
{
  "name": "project_docs",
  "vectors": {
    "size": 1536,
    "distance": "Cosine"
  }
}
```

**Point schema:**
```json
{
  "id": "doc-uuid-1-chunk-0",
  "vector": [float; 1536],
  "payload": {
    "project_id": "proj-uuid-1",
    "document_id": "doc-uuid-1",
    "filename": "RAMS_Analysis_v2.pdf",
    "chunk_index": 0,
    "chunk_offset": 0,
    "section_title": "Hazard Analysis - Electrical Subsystem",
    "text_chunk": "The electrical subsystem includes three main hazards...",
    "page_number": 3,
    "entities": {
      "ASSET": ["Transformer", "Circuit Breaker"],
      "HAZARD": ["Electrical Shock", "Arc Flash"],
      "ZONE": ["Power Distribution"]
    },
    "confidence_scores": {
      "ASSET": 0.89,
      "HAZARD": 0.92,
      "ZONE": 0.78
    },
    "extraction_timestamp": "2024-12-09T12:34:56Z"
  }
}
```

---

## Data Relationships

### Master Data Relationships

```
User
  ├─ owns → [Projects]
  ├─ created → [HARA Items, Graph Nodes, Edges]
  └─ logged → [Audit Log Entries]

Project
  ├─ has → [Phases, HARA Items, Documents]
  ├─ has → [Graph Nodes, Graph Edges]
  ├─ has → [Impact Categories]
  └─ mirrored_in → [Neo4j Project Node]

Phase
  ├─ part_of → Project
  └─ contains → [HARA Items]

HARA Item
  ├─ part_of → Phase
  ├─ rated_by → [Impact Categories]
  └─ linked_to → [Graph Nodes (Assets)]

Impact Category
  ├─ part_of → Project
  └─ rated_in → [HARA Items]

Document
  ├─ part_of → Project
  ├─ contains → [Extracted Entities]
  └─ ingested_to → [Qdrant, Neo4j]

Graph Node
  ├─ part_of → Project
  ├─ connected_via → [Graph Edges]
  ├─ mirrored_in → [Neo4j]
  └─ may_belong_to → [Multiple Nodes (Zone→Asset relationships)]

Graph Edge
  ├─ part_of → Project
  ├─ connects → [Graph Nodes (source, target)]
  └─ mirrored_in → [Neo4j Relationships]

Config
  └─ used_by → [Application, Ingestion Pipeline]

AI Conversation
  ├─ part_of → Project
  ├─ initiated_by → User
  └─ contains → [AI Messages]

AI Message
  ├─ part_of → [AI Conversation]
  └─ sourced_from → [Qdrant Collections]

Audit Log
  ├─ performed_by → User
  └─ related_to → [Any resource: Project, HARA Item, Graph Node, etc.]
```

---

## Indexing Strategy

### PostgreSQL Indexes

```sql
-- Foreign key indexes (implicit)
CREATE INDEX idx_projects_owner_id ON projects(owner_id);
CREATE INDEX idx_phases_project_id ON phases(project_id);
CREATE INDEX idx_hara_items_project_id ON hara_items(project_id);
CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_graph_nodes_project_id ON graph_nodes(project_id);
CREATE INDEX idx_graph_edges_project_id ON graph_edges(project_id);

-- Search indexes
CREATE INDEX idx_projects_name ON projects USING GIN (to_tsvector('english', name));
CREATE INDEX idx_hara_items_name ON hara_items USING GIN (to_tsvector('english', name));
CREATE INDEX idx_graph_nodes_label ON graph_nodes(label);
CREATE INDEX idx_documents_filename ON documents(filename);

-- Status/state indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_phases_status ON phases(status);
CREATE INDEX idx_documents_ingestion_status ON documents(ingestion_status);
CREATE INDEX idx_hara_items_risk_level ON hara_items(calculated_risk_level);

-- Temporal indexes
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_hara_items_created_at ON hara_items(created_at DESC);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX idx_audit_log_timestamp ON audit_log(timestamp DESC);

-- JSONB indexes
CREATE INDEX idx_hara_items_impact_ratings ON hara_items USING GIN (impact_ratings);
CREATE INDEX idx_graph_nodes_metadata ON graph_nodes USING GIN (metadata);
CREATE INDEX idx_ai_messages_sources ON ai_messages USING GIN (sources);

-- Soft delete index
CREATE INDEX idx_projects_deleted_at ON projects(deleted_at) WHERE deleted_at IS NULL;
```

### Neo4j Indexes

```cypher
-- Property indexes
CREATE INDEX FOR (p:Project) ON (p.id);
CREATE INDEX FOR (z:Zone) ON (z.label);
CREATE INDEX FOR (a:Asset) ON (a.label);
CREATE INDEX FOR (a:Asset) ON (a.asset_type);
CREATE INDEX FOR (t:Threat) ON (t.mitre_id);
CREATE INDEX FOR (t:Threat) ON (t.tactic);
CREATE INDEX FOR (h:Hazard) ON (h.severity);
CREATE INDEX FOR (d:Document) ON (d.filename);

-- Full-text search indexes
CREATE FULLTEXT INDEX threat_search FOR (t:Threat) ON EACH [t.label, t.description];
CREATE FULLTEXT INDEX asset_search FOR (a:Asset) ON EACH [a.label, a.description];
CREATE FULLTEXT INDEX hazard_search FOR (h:Hazard) ON EACH [h.label, h.description];
```

### Qdrant Indexes

**Automatic indexing via HNSW** (Hierarchical Navigable Small World)  
- Enabled by default for collections > 10k vectors
- Tunable via `hnsw_config` in collection settings

---

## Migration Strategy

### Initial Schema (V1.0)

**File: `migrations/001_initial_schema.sql`**

Contains all tables, indexes, and constraints from Section 2.

### Migration Execution

```bash
# Using Knex.js migration tool:
npm run migrate:latest

# Specific migration:
npm run migrate:up -- 001_initial_schema

# Rollback latest:
npm run migrate:rollback

# Rollback to specific:
npm run migrate:down -- 001_initial_schema
```

### Example Future Migration

**File: `migrations/002_add_document_metadata.sql`**

```sql
-- Add new columns to documents table
ALTER TABLE documents
ADD COLUMN IF NOT EXISTS parsed_text TEXT,
ADD COLUMN IF NOT EXISTS word_count INTEGER,
ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'en';

-- Create index
CREATE INDEX idx_documents_language ON documents(language);

-- Update existing rows (async job)
UPDATE documents SET language = 'en' WHERE language IS NULL;
```

---

## Query Optimization

### Common Query Patterns

#### Pattern 1: Get Project with All Data

```sql
-- Postgres query
SELECT 
  p.*,
  COALESCE(json_agg(DISTINCT jsonb_build_object(
    'id', ph.id,
    'number', ph.phase_number,
    'status', ph.status
  )), '[]') as phases,
  COUNT(DISTINCT h.id)::INT as hara_item_count,
  COUNT(DISTINCT d.id)::INT as document_count
FROM projects p
LEFT JOIN phases ph ON p.id = ph.project_id
LEFT JOIN hara_items h ON p.id = h.project_id
LEFT JOIN documents d ON p.id = d.project_id
WHERE p.id = $1 AND p.deleted_at IS NULL
GROUP BY p.id;
```

#### Pattern 2: Get Graph Topology

```sql
-- Postgres + Neo4j hybrid
-- Postgres: fetch canonical nodes/edges
SELECT gn.id, gn.node_type, gn.label, ge.target_id, ge.edge_type
FROM graph_nodes gn
LEFT JOIN graph_edges ge ON gn.id = ge.source_id
WHERE gn.project_id = $1
ORDER BY gn.created_at;

-- Neo4j: fetch relationships and patterns
MATCH (proj:Project {id: $projectId})-[:HAS_ZONE]->(z:Zone)-[:HAS_ASSET]->(a:Asset)
OPTIONAL MATCH (a)<-[:TARGETS]-(t:Threat)
RETURN z, a, t
ORDER BY z.label;
```

#### Pattern 3: AI Search (Qdrant + Neo4j + Postgres)

```python
# Python-like pseudo-code
async def ai_search(project_id, query):
  # 1. Qdrant semantic search
  qdrant_results = await qdrant.search(
    collection='project_docs',
    query_vector=encode(query),
    limit=5,
    query_filter={'project_id': project_id}
  )
  
  # 2. Neo4j context
  neo4j_context = neo4j_driver.run('''
    MATCH (proj:Project {id: $project_id})-[:HAS_ZONE]->(z:Zone)
    OPTIONAL MATCH (z)-[:HAS_ASSET]->(a:Asset)
    RETURN collect({zone: z, assets: collect(a)})
  ''', project_id=project_id)
  
  # 3. Assemble prompt and call LLM
  prompt = f"""
    User query: {query}
    
    Project context:
    {neo4j_context}
    
    Relevant documents:
    {qdrant_results}
    
    Answer:
  """
  
  response = await openrouter.chat(prompt)
  return response
```

#### Pattern 4: Risk Level Calculation

```sql
-- Calculate risk as function of impact ratings
SELECT 
  h.id,
  h.name,
  h.impact_ratings,
  -- Maximum impact score across all categories
  MAX((h.impact_ratings->>ic.id)::INT) as max_severity,
  -- Aggregate risk score
  CASE
    WHEN MAX((h.impact_ratings->>ic.id)::INT) >= 20 THEN 'CRITICAL'
    WHEN MAX((h.impact_ratings->>ic.id)::INT) >= 15 THEN 'HIGH'
    WHEN MAX((h.impact_ratings->>ic.id)::INT) >= 10 THEN 'MEDIUM'
    ELSE 'LOW'
  END as calculated_risk
FROM hara_items h
CROSS JOIN impact_categories ic
WHERE h.project_id = $1
GROUP BY h.id, h.name, h.impact_ratings;
```

### Performance Tuning Tips

1. **Batch inserts:** Use `COPY` for bulk document loading
2. **EXPLAIN ANALYZE:** Profile slow queries
3. **Connection pooling:** 5–10 persistent connections (Postgres)
4. **Vacuum:** Regular `VACUUM ANALYZE` for table statistics
5. **Partition documents table:** If >10M rows (by project_id)
6. **Archive audit logs:** Move old logs to separate table

---

## Constraints & Validations

### Referential Integrity

- Foreign key constraints enforce parent existence
- Cascading deletes for project cleanup
- Soft deletes for audit trail preservation

### Data Type Constraints

- UUIDs for distributed, unique IDs
- ENUMs for fixed-choice fields (status, node_type)
- NUMERIC for decimal fields (positions)
- JSONB for flexible, queryable semi-structured data

### Business Logic Constraints

```sql
-- Phase number valid range
ALTER TABLE phases
ADD CONSTRAINT valid_phase_number CHECK (phase_number BETWEEN 1 AND 8);

-- No self-loops in graph
ALTER TABLE graph_edges
ADD CONSTRAINT no_self_loops CHECK (source_id != target_id);

-- Unique phase per project
ALTER TABLE phases
ADD CONSTRAINT unique_phase_per_project UNIQUE (project_id, phase_number);

-- Risk level consistency
ALTER TABLE hara_items
ADD CONSTRAINT risk_level_valid CHECK (
  calculated_risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')
);
```

---

**End of Database Schema & Data Model Document**

For questions, contact: Database Architecture Team  
Last Updated: December 2024  
Version: 1.0
