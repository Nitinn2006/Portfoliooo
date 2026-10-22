# Project Plan: Nitin Kashyap Interactive 3D Portfolio

An interactive 3D desk-room portfolio at night with smooth camera choreography, HUD navigation, and a full 2D semantic-HTML mobile/accessibility layer.

## Build Phases

- [x] **Phase 1: Vite setup, base scene, lighting, camera overview, HUD + nav pill** (Completed)
- [x] **Phase 2: Plain 2D semantic-HTML version driven by `src/content.ts`** (Completed)
- [x] **Phase 3: Room props + hotspot markers** (Completed)
- [x] **Phase 4: GSAP camera fly-to system** (Completed)
- [x] **Phase 5: 3D content panels** (Completed)
- [x] **Phase 6: Loading screen, motion & performance pass** (Completed)
- [x] **Phase 7: SEO tags, Open Graph, sitemap, robots.txt** (Completed)

## Enhancement Steps

- [x] **STEP A: Bug fixes & Pegboard upgrades** (Completed)
  - Bug 1: Two-way URL hash sync with `window.location.hash` (`#projects`, `#achievements`, `#about`, `#contact`, empty for overview) with full browser Back/Forward and direct-link support.
  - Bug 2: Hotspot markers and labels completely hidden whenever a panel is open (`activeSection !== 'overview'`); labels rendered at fixed screen pixels (no `distanceFactor` scaling).
  - Bug 3: Pegboard hotspot position lowered from 3.6 to 3.2 and overview camera reframed to `[0, 3.0, 5.8]` to ensure zero clipping on all screen edges.
  - Bug 4: Badge text moved to `content.ts` (`content.hud.statusBadge`) and updated to `"OPEN TO INTERNSHIPS"`.
  - Pegboard 5: Number of cards strictly equals `content.achievements.items.length` (3 cards, zero blank placeholders).
  - Pegboard 6: Procedural high-res canvas certificates with parchment paper, gold border, colored header bands, and gold seals; SIH 2026 card has a hanging ribbon and silver medal (2nd position).
  - Pegboard 7: Gentle pendulum sway (+/- 2 degrees, phase-offset per item) in `useFrame`, respecting `reducedMotion`.
  - Pegboard 8: Lit architectural wall panel behind the pegboard with emissive edge glow (`#f43f5e`) and a dedicated warm point light.
  - Verification: `npm run build` cleanly passed with 0 errors.

- [ ] **STEP B: Avatar and laptop** (Next)
  - Low-poly seated character built from primitives (capsules, boxes, spheres) on an office chair in 3/4 view using an open laptop.
  - Positioned so it never occludes monitor, phone, pegboard, or bookshelf camera angles.
  - Sub-40 meshes total with shared materials and geometries.
  - Subtle `useFrame` typing, breathing, head glance, and chair swivel.
  - CanvasTexture laptop screen (scrolling code + mini animated bar chart) throttled to <= 10 fps.
  - Static pose & screen when `prefers-reduced-motion` is active.

- [ ] **STEP C: Ambient life**
  - Twinkling window skyline instances (~500ms intervals).
  - Up to 150 dust motes (`Points`) drifting in lamp light.
  - Desk coffee mug with 3 fading steam sprites.
  - Full reduced-motion and 2D-fallback compliance.

## Key Decisions & Rules

1. **Content Source**: Exclusively `src/content.ts`. Zero invented metrics or technologies. No school marks. No phone numbers.
2. **CV File**: Direct link to `/Nitin_Kashyap_CV.pdf` (user provides the PDF).
3. **LinkedIn**: If empty in `content.ts`, completely hide the button (no `#` fallback links).
4. **Performance**: No external 3D models; pure procedural primitives; DPR capped at 2.
5. **Phase Gate**: Each step stops and waits for explicit user approval before proceeding to the next step.
