# Architectural Audit & Design System Findings

## 1. Reference Screenshots Analysis (OXOT Design Standard)

| Element | Reference Standard (OXOT Screenshot) | Current Eigenia Implementation | Gap / Action Required |
| :--- | :--- | :--- | :--- |
| **Section Backgrounds** | Multi-tone alternating section bands (`#0b0c0e`, `#121417`, `#16181d`). | Uniform pitch-black `#000000` everywhere. | Apply alternating background section bands across all page layouts. |
| **Headings (H1/H2)** | Editorial Serif font (`font-serif`, `text-3xl sm:text-5xl font-normal text-white tracking-tight`). | Uppercase Monospace (`font-mono text-3xl sm:text-5xl font-bold uppercase`). | Switch main section headings (H1, H2) to elegant `font-serif` mixed-case typography. |
| **Eyebrows (H5)** | Monospace tracking-wide orange tags (`font-mono text-dutchOrange uppercase tracking-[0.2em] text-[10px]`). | Mixed font sizes and uppercase styles. | Standardize to universal `font-mono text-[10px] tracking-[0.2em] text-dutchOrange uppercase font-medium`. |
| **Cards & Badges** | Rounded dark cards (`bg-[#131519] border border-zinc-800/50 rounded-2xl`) with small orange icon badges (`w-9 h-9 bg-dutchOrange/10 text-dutchOrange rounded-xl flex items-center justify-center`). | Frameless `bg-zinc-950/60` without icon badges or subtle borders. | Standardize card containers with subtle borders and add top-left icon badges (`bg-dutchOrange/10 text-dutchOrange`). |
| **Featured Cards** | Distinct orange border (`border-2 border-dutchOrange`) and orange CTA button (`bg-dutchOrange text-white font-medium hover:bg-dutchOrange/90`). | Inconsistent border highlights. | Standardize featured/chosen cards across pricing and research tracks. |
| **Buttons** | Solid Orange (`bg-dutchOrange text-white hover:bg-dutchOrange/90 rounded-lg px-5 py-2.5`) and Dark Outline (`border border-zinc-800 bg-[#16181d] text-white hover:bg-zinc-800 rounded-lg`). | Mixed button shapes and paddings. | Implement universal button primitives. |

## 2. Universal Typography Scale Specifications

- **H1 (Hero Main Title)**: `font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight`
- **H2 (Section Header Title)**: `font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white leading-snug`
- **H3 (Card / Module Title)**: `font-sans text-base sm:text-lg font-semibold text-white tracking-tight`
- **H4 (Sub-Card / Metric Label)**: `font-mono text-xs font-bold uppercase tracking-wider text-zinc-300`
- **H5 / Eyebrow**: `font-mono text-[10px] sm:text-xs tracking-[0.2em] text-dutchOrange uppercase font-medium inline-block mb-2`
- **Body Text**: `font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed`
