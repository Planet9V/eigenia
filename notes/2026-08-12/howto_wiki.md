Here is a complete technical breakdown of how the **Documentation Engine** and sliding left sidebar work in the codebase for developers.

---

## 1. High-Level Architecture & Component Stack

The documentation wiki is implemented as a **Next.js 16 React Client Component** (`'use client'`) located at:
📁 [`frontend/src/app/(dashboard)/documentation/page.tsx`](file:///Users/jimmcknney/notebook_tetrel/frontend/src/app/(dashboard)/documentation/page.tsx)

### Core Libraries & Dependencies:
* **Next.js 16 (App Router) + React 19:** Functional client component with `useState`, `useMemo`, `useRef`.
* **Tailwind CSS v4:** Utility-first styling with HSL dark-mode design tokens and smooth transitions (`transition-all`, `backdrop-blur-md`).
* **shadcn/ui (Radix Primitives):** `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardContent>`, `<Badge>`, `<Button>`.
* **Lucide Icons (`lucide-react`):** Icon set (`BookOpen`, `Layers`, `Workflow`, `Scale`, `FileCode`, `Shield`, `ChevronDown`, `ChevronRight`, `Download`, `Search`).

---

## 2. How the Sliding Left Table of Contents (TOC) Works

The layout is built as a **2-Column Responsive Flexbox Container**:

```tsx
<div className="flex h-screen overflow-hidden bg-slate-950">
  {/* Left Sidebar (Sliding Accordion TOC) */}
  <aside className="w-72 border-r border-white/5 bg-slate-950/80 hidden lg:flex flex-col">
    {/* Navigation Items */}
  </aside>

  {/* Main Content Viewport */}
  <div ref={contentRef} className="flex-1 overflow-y-auto">
    {/* Hero Header & Rendered Articles */}
  </div>
</div>
```

### A. Accordion & Active Section State
The sidebar tracks active sections and expanded subsections using React state sets:

```typescript
const [activeSection, setActiveSection] = useState<string>('overview')
const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']))
const [expandedSubsections, setExpandedSubsections] = useState<Set<string>>(new Set())
```

### B. Smooth Scroll-into-View Execution
When a user clicks any section or article link in the left TOC sidebar, the `scrollToSection` handler is triggered:

```typescript
const scrollToSection = (sectionId: string) => {
  setActiveSection(sectionId)
  setExpandedSections(prev => new Set([...prev, sectionId]))
  
  // Finds target DOM element by ID
  const el = document.getElementById(`doc-${sectionId}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
```

Every main section header in the right viewport is assigned a matching DOM ID with Tailwind's `scroll-mt-20` (scroll margin top offset), ensuring the sticky top header bar never overlaps the section title when scrolling.

### C. HSL Color Mapping & Active Glow Effects
Each category is assigned a color scheme key (`cyan`, `violet`, `emerald`, `amber`, `rose`). A dynamic dictionary maps these colors to Tailwind CSS classes:

```typescript
const COLOR_MAP: Record<string, { border: string; bg: string; text: string; glow: string; badge: string }> = {
  cyan:    { border: 'border-cyan-500/20', bg: 'bg-cyan-500/5', text: 'text-cyan-400', glow: 'from-cyan-500/30', badge: '...' },
  violet:  { border: 'border-violet-500/20', bg: 'bg-violet-500/5', text: 'text-violet-400', glow: 'from-violet-500/30', badge: '...' },
  emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', text: 'text-emerald-400', glow: 'from-emerald-500/30', badge: '...' },
  // ...
}
```

---

## 3. Data Schema & Multi-Document Model

The documentation content is structured in TypeScript data models (`DocSection[]`):

```typescript
interface DocSection {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose'
  badge: string
  description: string
  subsections: DocSubsection[]
}

interface DocSubsection {
  id: string
  title: string
  content: string
  items?: DocItem[]
  table?: { headers: string[]; rows: string[][] }
  code?: string
}

interface DocItem {
  label: string
  description: string
  badge?: string
  badgeColor?: string
}
```

---

## 4. Markdown & Formula Support (How to Extend to Raw `.md` Files)

### Current Implementation:
The `content` property uses template literal strings supporting whitespace formatting, list bullet points (`•`), code fences (````` `` `````), and mathematical formulas ($\mathbf{v}_{\text{blended}} = w\mathbf{v}_a + (1-w)\mathbf{v}_b$).

### Extending to Raw `.md` File Rendering:
To parse external `.md` files dynamically from the filesystem or API endpoints, developers can integrate `react-markdown` with the following plugins:

1. **`react-markdown`:** Parses raw Markdown string into React AST elements.
2. **`remark-gfm`:** Adds GitHub-Flavored Markdown (tables, task lists, strikethrough).
3. **`remark-math` + `rehype-katex`:** Renders KaTeX LaTeX mathematical formulas ($E=mc^2$ or $\mathbf{v}_{\text{blend}}$).
4. **`rehype-highlight`:** Adds syntax highlighting for YAML, TypeScript, Python, and Shell blocks.
5. **`mermaid.js`:** Dynamically renders Mermaid C4 diagrams (`C4Context`, `C4Container`, `C4Component`) inside a `useEffect` canvas wrapper.

---

## 5. Live Search Engine & Filtering Performance

Searching is powered by a high-performance `useMemo` filter:

```typescript
const filteredSections = useMemo(() => {
  if (!searchQuery.trim()) return DOCUMENTATION
  const q = searchQuery.toLowerCase()
  return DOCUMENTATION.map(section => {
    const sectionMatch = section.title.toLowerCase().includes(q) || section.description.toLowerCase().includes(q)
    const filteredSubs = section.subsections.filter(sub => {
      const subMatch = sub.title.toLowerCase().includes(q) || sub.content.toLowerCase().includes(q)
      const itemMatch = sub.items?.some(i => i.label.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
      const tableMatch = sub.table?.rows.some(r => r.some(c => c.toLowerCase().includes(q)))
      return subMatch || itemMatch || tableMatch
    })
    if (sectionMatch || filteredSubs.length > 0) {
      return { ...section, subsections: filteredSubs.length > 0 ? filteredSubs : section.subsections }
    }
    return null
  }).filter(Boolean) as DocSection[]
}, [searchQuery])
```

This updates the UI instantly as users type in the search bar, filtering across titles, article descriptions, bullet lists, and table rows simultaneously.