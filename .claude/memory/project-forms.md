---
name: project-forms
description: "Form rules — positioning, field standards, auto-focus, and action placement"
metadata:
  node_type: memory
  type: project
  originSessionId: c4b41cc4-d54c-4fcd-9d4e-16d4ed5dd23b
  modified: 2026-10-27T13:27:31.511Z
---

Forms start at the top of the content area (never vertically centered). No card wrappers. Full horizontal width on mobile. Use PrimeVue components for each data type. All fields share the same height, font, border, and spacing. Labels are required (no placeholder-only labels). Auto-focus first editable field on mount via `nextTick()`.

Save/cancel/delete actions go in the page toolbar (icon-only) or in a Dialog — never in a separate button bar inside the form.

**Why:** Consistent, compact, mobile-first forms that behave predictably. Auto-focus improves UX but must not trigger unwanted keyboard or scroll on Safari.

**How to apply:** Editable fields must have computed font-size >= 16px to prevent Safari auto-zoom. Test real computed size, not just the wrapper. Validate close to the field. Destructive actions require confirmation. Related: [[project-safari-mobile]], [[project-layout-structure]].
