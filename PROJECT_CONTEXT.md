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
- **Prompt 05: The Living Town Experience**:
  - Seamless cinematic transition from the rotating miniature planet into the walkable living town upon pressing `ENTER`.
  - Continuous 60-second seamless ambient soundtrack with zero seam pops, uninterrupted across transitions.
  - Stylized 3D player avatar representing Shiv Kumar with procedural walking animations, head turning, and movement kinematics.
  - Locomotion engine supporting WASD / Arrow keys, click / tap ground raycasting, building collision detection, and third-person follow camera.
  - Exactly 6 primary functional destination landmarks with custom 3D models, floating beacons, and rich storybook drawers:
    1. **Little House** (`about`) — About Shiv Kumar, background, passions, and philosophy.
    2. **University** (`education`) — Techno India University, B.Tech CSE, Cloud Computing specialization.
    3. **Workshop** (`experience`) — Practical engineering, open-source systems, and cloud craft (100% honest, zero fabricated employment).
    4. **Invention House** (`projects`) — Shadow Exchange, ASTRA, Faultline, ForgeFit, VEENA (real GitHub links, live tech stacks).
    5. **Library** (`skills`) — Cloud & Infrastructure, Systems & Backend, WebGL & 3D, Methodologies.
    6. **Post Office** (`contact`) — Direct email (`shivkumar6990655@gmail.com`), GitHub, LinkedIn, Résumé.
  - 5 animated NPC guides (Barnaby, Timothy, Maeve, Pip, Clara) with idle breathing, head tracking, speech bubble dialogues, and destination navigation assistance.
  - Richly populated terrain: 17 total buildings, 8 terrain features, 5 cobblestone paths, and 32 hand-crafted props.
  - Town HUD: Quick-travel compass bar, proximity prompts (`[E] to Explore / Talk`), controls hint pill, and "Return to Orbit" button.

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
