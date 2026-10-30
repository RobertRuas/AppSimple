---
name: project-layout-structure
description: "Fixed two-bar layout architecture — global header + page toolbar, shared components"
metadata:
  node_type: memory
  type: project
  originSessionId: c4b41cc4-d54c-4fcd-9d4e-16d4ed5dd23b
  modified: 2026-10-27T13:27:24.308Z
---

All pages share one global layout with two fixed bars and a scrollable content area:

1. **Global header (AppHeader):** fixed top, title left, up to 3 icon-only global actions right. No page-specific actions here.
2. **Page toolbar (PageToolbar):** fixed below header, back-icon left, up to 3 icon-only page actions right. Hidden on the home page only.
3. **Main content area:** starts below both bars, independent scroll, full-width on mobile.

**Why:** Structural consistency across all pages. Bars are shared components — pages never implement their own bars. Title, actions, and back behavior come from route config or centralized state.

**How to apply:** Never create a third bar. Never put save/cancel in the global header. Never duplicate the back button inside content. Home page = no toolbar. Forms and lists use full available width. Related: [[project-design-system]], [[project-forms]].
