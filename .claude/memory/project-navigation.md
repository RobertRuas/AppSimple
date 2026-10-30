---
name: project-navigation
description: "Vue Router hash history, back behavior, and gesture navigation rules"
metadata:
  node_type: memory
  type: project
  originSessionId: c4b41cc4-d54c-4fcd-9d4e-16d4ed5dd23b
  modified: 2026-10-27T13:27:50.054Z
---

Vue Router with Hash History (`/#/route`). No HTML5 History mode. No full-page reloads for internal navigation. Back button respects internal navigation hierarchy; if no valid previous page exists, uses a predefined fallback route. Navigation must not cause layout flashes, unnecessary rebuilds, or form data loss.

Gestures (swipe-right to go back, pull-to-refresh) are planned for later phases — architecture should support them without interfering with PrimeVue interactive components.

**Why:** Hash History avoids server fallback dependencies and keeps the app in a single browser page. Gesture navigation is deferred to avoid conflicts with components.

**How to apply:** Never use `window.location.href` for internal navigation. Always use Vue Router programmatic navigation. Related: [[project-layout-structure]].
