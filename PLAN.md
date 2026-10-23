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
- [x] **Phase 8 — Pass A: Definition (Lighting, Composition, Materials, Bug Fixes)** (Completed)
  - A1. Bug Fixes: Anchored Achievements hotspot label safely to the right (`[0.65, -0.05, 0]`) to completely avoid overlapping top-left HUD chips at any screen size; replaced permanent thick pink pegboard border with subtle dark trim that only glows on hover; shrunk hotspot diamonds by 40% with staggered pulsing rings and hover fade.
  - A2. Lighting: 3-point + practical lights setup (cool moonlight directional key light with soft shadows, hemisphere fill light for readable room visibility, warm desk lamp practical point light, cyan monitor spill, and pink rim light; added `<ContactShadows>` and low-intensity night `<Environment>`).
  - A3. Post-Processing: Selective Bloom, N8AO ambient occlusion, cinematic Vignette, and SMAA anti-aliasing with low-power quality toggle.
  - A4. Composition: Tighter overview camera framing (`pos: [0, 2.45, 4.35], look: [0, 1.35, -1.8]`) filling ~80% of viewport with room/desk; added 0.2Hz breathing motion and smooth mouse parallax.
  - A5. Materials & Geometry: `RoundedBox` beveled edges on desk, drawer, shelf, books, and monitor; dark wood floor with `MeshReflectorMaterial` night reflections; woven area rug under desk; framed architectural posters on right wall.
  - A6. Window & Skyline: 3 distinct depth layers (distant silhouettes, lit midground towers, foreground rooftops) with twinkling windows, starry night sky, glowing moon, and atmospheric fog.

## Enhancement Steps

- [x] **STEP A: Bug fixes, Pegboard, & Prop Viewport Polish** (Completed)
  - Bug 1: Two-way URL hash sync with `window.location.hash` (`#projects`, `#achievements`, `#about`, `#contact`, empty for overview) with full browser Back/Forward and direct-link support.
  - Bug 2: Hotspot markers and labels completely hidden whenever a panel is open (`activeSection !== 'overview'`); labels rendered at fixed screen pixels (no `distanceFactor` scaling).
  - Bug 3: Pegboard hotspot position lowered from 3.6 to 2.95 and overview camera reframed to `[0, 3.0, 5.8]` to ensure zero clipping on all screen edges.
  - Bug 4: Badge text moved to `content.ts` (`content.hud.statusBadge`) and updated to `"OPEN TO INTERNSHIPS"`.
  - Pegboard 5: Number of cards strictly equals `content.achievements.items.length` (3 cards, zero blank placeholders).
  - Pegboard 6: Procedural high-res canvas certificates with parchment paper, gold border, colored header bands, and gold seals; SIH 2026 card has a hanging ribbon and silver medal (2nd position).
  - Pegboard 7: Gentle pendulum sway (+/- 2 degrees, phase-offset per item) in `useFrame`, respecting `reducedMotion`.
  - Pegboard 8: Lit architectural wall panel behind the pegboard with emissive edge glow (`#f43f5e`) and a dedicated warm point light.
  - Fix (Scrolling void): Collapsed offscreen `SemanticPortfolio` to `h-0 max-h-0 overflow-hidden` and locked `App.tsx` and `html, body` to `h-screen overflow-hidden` in 3D mode, completely eliminating vertical scrollbar and empty black space below the canvas.
  - Fix (Blank props & camera framing): Added procedural 512x512 canvas textures for Monitor (IDE code & EDA bar chart), Notebook (open journal with education & skills), and Phone (lock screen with email & GitHub). Re-aimed docked camera targets so props frame in the left 40% of the screen, illuminated by dedicated local point lights and unobstructed by the right modal panel.
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
