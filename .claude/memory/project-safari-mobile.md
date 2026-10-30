---
name: project-safari-mobile
description: "Safari/iPhone-specific rules — viewport, zoom, safe areas, keyboard behavior"
metadata:
  node_type: memory
  type: project
  originSessionId: c4b41cc4-d54c-4fcd-9d4e-16d4ed5dd23b
  modified: 2026-10-27T13:27:38.286Z
---

Correct viewport config. All editable elements >= 16px computed font on iPhone to prevent auto-zoom. Never use `user-scalable=no` or `maximum-scale=1` as the zoom fix — manual zoom must be preserved for accessibility. Use `100dvh` with fallback instead of `100vh`. Respect `env(safe-area-inset-*)`. Prevent horizontal scroll. Ensure keyboard doesn't cover active field or essential actions.

**Why:** Safari on iPhone has unique zoom-on-focus behavior and viewport quirks that break mobile UX if not explicitly handled.

**How to apply:** Check the actual focused element's computed font-size, not just the outer component. Test with keyboard open. The app must work both in Safari and as a home-screen PWA. Never claim iPhone-tested if only inspected in code or emulator. Related: [[project-forms]], [[project-design-system]].
