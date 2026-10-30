---
name: project-stack
description: Core technology stack and constraints for the AppModel project
metadata:
  node_type: memory
  type: project
  originSessionId: c4b41cc4-d54c-4fcd-9d4e-16d4ed5dd23b
  modified: 2026-10-27T13:27:09.938Z
---

Vue 3 + Composition API + `<script setup>` + TypeScript. PrimeVue as the sole UI library (free components only). Vue Router with Hash History. Ionic preserved only for PWA/Capacitor infrastructure — no Ionic visual components.

**Why:** The project targets a mobile-first PWA deployed via Capacitor. PrimeVue was chosen for its free tier and component breadth. Hash History avoids server-side fallback configuration.

**How to apply:** Never introduce Vuetify, Quasar, Bootstrap, Material UI, or Tailwind. Never use PrimeVue Pro/paid components. Always use `<script setup>` with Composition API. Check license before adding any dependency. Use PrimeIcons exclusively for icons — don't mix icon libraries.
