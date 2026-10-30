---
name: project-directory-structure
description: "Required src/ directory organization — pages, shared components, composables, services, styles"
metadata:
  node_type: memory
  type: project
  originSessionId: c4b41cc4-d54c-4fcd-9d4e-16d4ed5dd23b
  modified: 2026-10-27T13:27:43.880Z
---

Each page has its own directory with a main component and a `components/` subfolder for page-exclusive components. Shared components go in `src/components/` organized by function (navigation, forms, feedback, common). Reusable logic in `src/composables/`. Business services in `src/services/`. Styles centralized in `src/styles/` (tokens.css, global.css, primevue.css). Route config centralized in `src/app/router/`. Layout in `src/app/layouts/`.

**Why:** Separation of concerns, avoid giant components, prevent duplication. Adapt to existing structure when possible — don't create empty abstractions.

**How to apply:** Never duplicate shared components for local fixes. Extract composables for reusable logic. Keep page-specific components inside the page folder. Related: [[project-stack]].
