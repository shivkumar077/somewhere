# SOMEWHERE — Project Context & Architecture

## Overview
**SOMEWHERE** is an interactive, hand-crafted 3D portfolio world that tells the story of an engineer through exploration, characters, places, and projects.

- **Milestone 01**: Cinematic 3D landing page foundation with rotating miniature town and dynamic atmosphere.
- **Milestone 02**: World Architecture & Art Direction. Canonical World Manifest (`CANONICAL_WORLD`), 4 districts, 11 buildings, 32 props, and dual-rendering path architecture.
- **Prompt 04 Refinement**: Landing experience refinement:
  - Removed all public-facing project branding and large 3D typography from the opening scene.
  - Simplified the primary call to action to read `ENTER`.
  - Recreated the welcome-text composition (`HELLO / THERE / YOU`) with compact line spacing, horizontal centering directly above the planet horizon, and a playful staggered GSAP spring entrance.
  - Rendered the miniature planet non-interactive (pointer dragging, touch rotation, zoom, and panning disabled; smooth automatic rotation active).
  - Recalibrated camera framing for generous breathing room around planet edges across desktop, tablet, mobile portrait, and landscape viewports.
- **Prompt 05: Complete Painterly Anime World Redesign**:
  - Replaced the low-poly/geometric look with a soft painterly anime aesthetic inspired by 1980s-90s animated classics (Studio Ghibli, watercolor & gouache illustrations, warm countryside, organic silhouettes).
  - Defined `ANIME_PALETTE` (`src/styles/painterlyPalette.ts`): lush meadow greens, olive foliage, cream plaster, warm terracotta clay roofs, slate blue-grey, aged copper verdigris, and turquoise waters.
  - **ONE Continuous World (Critical Architectural Mandate)**: The miniature planet and close-up walkable town are now the **exact same physical 3D world** rendered through `PainterlyPlanet.tsx`.
  - Continuous camera zoom with zero scene swapping or blackout fades (`ContinuousCameraController` glides smoothly from orbit $z \approx 17.4$ down to town level $z \approx 6.2$).
  - Upgraded canonical world manifest to **v4.0.0** (`CANONICAL_WORLD`) featuring:
    - **24 unique buildings** (6 functional destinations + 18 decorative scenery buildings).
    - Topographical displacement engine (`getWorldElevation` in `src/world/projection.ts`) creating natural bluffs, ridges, and ponds.
    - 5 animated NPC guides with contextual dialogues.
    - 35 hand-crafted painterly anime props (layered foliage clumps, apple trees, weeping willows, stone fountain with water ripples, bridges, rowboats).
    - Displaced spherical mesh with custom painterly vertex colors and nested turquoise water bodies.
  - Verified 100% across the complete 16-viewport responsive test suite.

---

## Architectural Principles & Canonical World Contract

### 1. The Single Source of Truth (`src/world/worldData.ts`)
The miniature planet and the walkable exploration town derive their geometry, placement, and story metadata from one definitive manifest: `CANONICAL_WORLD` (v3.0.0).

- **World Manifest Schema (`src/world/types.ts`)**:
  - `districts`: 4 themed cultural districts with color tags and focal centers.
  - `buildings`: 17 landmark structures (6 functional destination buildings + 11 decorative buildings) with stable IDs, semantic types, categories, coordinates, rotation, scales, amenities, and story snippets.
  - `npcs`: 5 animated character guides with coordinates, dialogue trees, and destination navigation hints.
  - `terrainFeatures`: 8 topographical elements (Windmill Ridge, Stargazer Peak, Cloudcrest Knoll, Fern Slope, South Pasture, Sunrise Bluff, Whispering Pond, Azure Lagoon).
  - `paths`: 5 interconnected cobblestone highways and trails with multi-point waypoints.
  - `props`: 32 hand-crafted decorative assets (fountains, market stalls, timber carts, stone bridges, rowboats, weeping willows, apple trees, pines, fences, barrels, lanterns, flower patches).

### 2. Dual-Rendering Architecture & Synchronisation Guarantee
Both rendering paths consume the exact same `CANONICAL_WORLD` manifest:
1. **Path 1: Miniature Planet Renderer (`src/components/canvas/MiniaturePlanet.tsx`)**:
   - Uses `getSphereTransform(coords, planetRadius, rotationY)` in `src/world/projection.ts`.
   - Converts `(lat, lon, altitude)` into 3D Cartesian coordinates on the sphere ($R = 4.4$).
   - Calculates outward surface normal vectors and aligns local +Y.
   - Non-interactive pointer behavior: rotates automatically at a gentle speed ($0.055\text{ rad/s}$).
2. **Path 2: Walkable World Renderer (`src/world/WalkableWorldRenderer.tsx`)**:
   - Uses `getFlatWorldTransform(coords, rotationY)` in `src/world/projection.ts`.
   - Maps `(flatX, flatZ, altitude)` directly onto a planar terrain grid.
   - Third-person follow camera smoothly tracks player position with damping ($X, Y+4.8, Z+7.8$).
   - Raycasting ground plane for click / tap navigation with animated landing rings.
   - Shares the exact same 3D building and prop component library (`BuildingModels.tsx`, `NPCModels.tsx`, `PropModels.tsx`).

### 3. Dynamic Atmosphere System (`src/config/atmosphereConfig.ts`)
- Automatically evaluates local time into 3 atmospheric phases:
  - **Day** (06:00 – 17:00): Cerulean sky, warm sunshine, drifting white clouds.
  - **Evening / Sunset** (17:00 – 20:30): Coral/peach sunset gradient, amber golden hour lighting, lantern glows.
  - **Night** (20:30 – 06:00): Deep indigo sky, silvery moonlight, twinkling starfield, drifting fireflies, and warm window glow.
- Manual switcher allows instant toggling between Day, Sunset, Night, or System Auto.

### 4. Continuous Ambient Audio System (`src/utils/audioManager.ts`)
- 60-second seamless stereo master loop in C major / A minor pentatonic with 4.0-second equal-power crossfade (`public/audio/cozy-ambient.wav`).
- Zero pops, clicks, or seam discontinuities.
- Continuous playback across transitions: clicking `ENTER` ensures audio is playing without resetting track time or creating duplicate audio nodes.
- Accessible volume fade-in/fade-out toggle with persistent top-left control.

---

## Commands

```bash
# Start development server
npm run dev

# Run canonical manifest verification
npx vite-node test-world-manifest.mjs

# Run full 16-viewport responsive and Living Town test suite
node test-responsive.mjs

# Type check
npx tsc --noEmit

# Production build
npm run build
```
