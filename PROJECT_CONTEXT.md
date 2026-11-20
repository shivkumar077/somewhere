# SOMEWHERE — Project Context & Architecture

## Overview
**SOMEWHERE** is an interactive, hand-crafted 3D portfolio world that tells the story of an engineer through exploration, characters, places, and projects.

- **Milestone 01**: Cinematic 3D landing page foundation with rotating miniature town and dynamic atmosphere.
- **Milestone 02**: World Architecture & Art Direction (Target Progress: ~30%). Canonical World Manifest (`CANONICAL_WORLD`), 4 districts, 11 buildings, 32 props, and dual-rendering path architecture.
- **Prompt 04 Refinement**: Landing experience refinement:
  - Removed all public-facing project branding and large 3D typography from the opening scene.
  - Simplified the primary call to action to read `ENTER`.
  - Recreated the welcome-text composition (`HELLO / THERE / YOU`) with compact line spacing, horizontal centering directly above the planet horizon, and a playful staggered GSAP spring entrance.
  - Rendered the miniature planet non-interactive (pointer dragging, touch rotation, zoom, and panning disabled; smooth automatic rotation active).
  - Recalibrated camera framing for generous breathing room around planet edges across desktop, tablet, mobile portrait, and landscape viewports.
  - Introduced soothing, organic, loopable background ambient soundtrack (`public/audio/cozy-ambient.wav`) with volume fade-in/fade-out and discreet `AudioControl` toggle button.

---

## Architectural Principles & Canonical World Contract

### 1. The Single Source of Truth (`src/world/worldData.ts`)
The miniature planet and the walkable exploration town derive their geometry, placement, and story metadata from one definitive manifest: `CANONICAL_WORLD`.

- **World Manifest Schema (`src/world/types.ts`)**:
  - `districts`: 4 themed cultural districts with color tags and focal centers.
  - `buildings`: 11 landmark structures with stable IDs, semantic types, categories (`civic`, `commercial`, `landmark`, `coastal`, `residential`, `agriculture`, `craft`), visual themes (wall, roof, trim, accent, window glow), coordinates, rotation, scales, amenities, and story snippets.
  - `terrainFeatures`: 8 topographical elements (Windmill Ridge, Stargazer Peak, Cloudcrest Knoll, Fern Slope, South Pasture, Sunrise Bluff, Whispering Pond, Azure Lagoon).
  - `paths`: 5 interconnected cobblestone highways and trails with multi-point waypoints.
  - `props`: 32 hand-crafted decorative assets (fountains, market stalls, timber carts, stone bridges, rowboats, weeping willows, apple trees, pines, fences, barrels, lanterns, flower patches).

### 2. Dual-Rendering Architecture & Synchronisation Guarantee
Both rendering paths consume the exact same `CANONICAL_WORLD` manifest:
1. **Path 1: Miniature Planet Renderer (`src/components/canvas/MiniaturePlanet.tsx`)**:
   - Uses `getSphereTransform(coords, planetRadius, rotationY)` in `src/world/projection.ts`.
   - Converts `(lat, lon, altitude)` into 3D Cartesian coordinates on the sphere ($R = 4.4$).
   - Calculates outward surface normal vectors and aligns local +Y.
   - Applies local yaw rotation around the surface normal.
   - Non-interactive pointer behavior: rotates automatically at a gentle speed ($0.055\text{ rad/s}$).
2. **Path 2: Walkable World Renderer (`src/world/WalkableWorldRenderer.tsx`)**:
   - Uses `getFlatWorldTransform(coords, rotationY)` in `src/world/projection.ts`.
   - Maps `(flatX, flatZ, altitude)` directly onto a planar terrain grid.
   - Renders planar extruded cobblestone roads via `THREE.TubeGeometry` on Catmull-Rom curves.
   - Shares the exact same 3D building and prop component library (`BuildingModels.tsx`, `PropModels.tsx`).

### 3. Dynamic Atmosphere System (`src/config/atmosphereConfig.ts`)
- Automatically evaluates local time into 3 atmospheric phases:
  - **Day** (06:00 – 17:00): Cerulean sky, warm sunshine, drifting white clouds.
  - **Evening / Sunset** (17:00 – 20:30): Coral/peach sunset gradient, amber golden hour lighting, lantern glows.
  - **Night** (20:30 – 06:00): Deep indigo sky, silvery moonlight, twinkling starfield, drifting fireflies, and warm window glow.
- Manual switcher allows instant toggling between Day, Sunset, Night, or System Auto.

### 4. Background Audio Architecture (`src/utils/audioManager.ts`)
- Original 32-second seamless ambient loop in C major / A minor pentatonic.
- Managed via `audioManager` with 1.4s smooth fade-in and 0.8s fade-out.
- Complies strictly with browser autoplay policies: starts playback only after explicit user interaction.
- Handled gracefully with fallback if audio loading is blocked or file is missing.

---

## Commands

- **Start Dev Server**: `npm run dev` (Runs on `http://localhost:3000/`)
- **Build Production**: `npm run build`
- **Lint & Typecheck**: `npm run lint`
- **Test Canonical World**: `npx vite-node test-world-manifest.mjs`
- **Test Responsive Matrix & Refinements**: `node test-responsive.mjs`
- **Capture Screenshots**: `node capture-refinement.mjs`
