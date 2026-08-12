# Task Plan: Site-Wide Design System Transformation & Style Standard Alignment

## Goal
Transform the entire Eigenia B.V. & Eigenia Labs web application (`http://localhost:4500`) to match the clean, editorial, multi-tone section-banded Obsidian Dark style system defined from the OXOT design reference screenshots.

## Style System Definition (Target Architecture)
- **Palette**: Deep Obsidian (`#0b0c0e`), Charcoal Band (`#121417`), Elevated Slate (`#16181d`), Dutch Orange Accent (`#ff5500`).
- **Typography Scale**: Serif Headings (`font-serif` H1/H2) + Clean Sans Body (`font-sans`) + Monospace Eyebrows/Metrics (`font-mono text-dutchOrange tracking-[0.2em]`).
- **Cards**: Dark Cards (`bg-[#131519] border border-[#22252c] rounded-2xl`), Featured Cards (`border-2 border-dutchOrange`), Square Icon Badges (`bg-dutchOrange/10 text-dutchOrange w-9 h-9 rounded-xl`).
- **Section Banding**: Alternating background shades per section (`#0b0c0e` → `#121417` → `#0b0c0e` → `#16181d`).

## Phases
- [x] Phase 1: Comprehensive Styleguide Definition & Architectural Code Audit
- [x] Phase 2: Create Implementation Plan Artifact & Present to User for Review
- [x] Phase 3: Update Core Theme Config & Global Typography Standards (`index.css` / Tailwind tokens)
- [x] Phase 4: Refine Site-Wide Components (`Navbar`, `EuComplianceFooter`, Card Primitives)
- [x] Phase 5: Convert Home Page (`/`) with Alternating Section Bands & Serif Typography
- [x] Phase 6: Convert Mission Page (`/mission`)
- [x] Phase 7: Convert Research Tracks Page (`/tracks`)
- [x] Phase 8: Convert Applied Physics Page (`/physics`)
- [x] Phase 9: Convert Collaborate Page (`/collaborate`)
- [x] Phase 10: Convert Taleb Paper Reader (`/papers/[slug]`)
- [x] Phase 11: End-to-End Build & Visual Verification via Chrome DevTools MCP

## Log & Status
- **Current Phase**: COMPLETED
- **Status**: Site-wide conversion complete and verified across all 6 main routes.
