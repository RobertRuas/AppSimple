---
name: project-design-system
description: "Global design tokens, visual principles, and anti-patterns for the UI"
metadata:
  node_type: memory
  type: project
  originSessionId: c4b41cc4-d54c-4fcd-9d4e-16d4ed5dd23b
  modified: 2026-10-27T13:27:17.288Z
---

Centralized CSS tokens in a single file. Neutral color palette: background #FFFFFF/#F7F7F8, text #202124/#6B7280, borders #E5E7EB, accent #374151. Compact typography scale: 12px auxiliary, 14px body, 16px section/page titles, 18px only when necessary.

**Why:** The goal is a professional, harmonious, compact mobile-first app — not a generic dashboard template. Every page must follow one unified design system.

**How to apply:** Define all colors, spacing, heights, radii, safe areas, and z-layers as CSS variables. Never hardcode arbitrary values in components. Avoid: gradients, strong shadows, borders on everything, nested cards, oversized buttons, tall headers, decorative animations, strong colors without functional purpose, empty whitespace, dashboard-like layouts. Related: [[project-safari-mobile]], [[project-layout-structure]].
