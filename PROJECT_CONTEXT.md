# SOMEWHERE — Project Context & Architecture

## Overview
**SOMEWHERE** is an interactive, hand-crafted 3D portfolio world that tells the story of an engineer through exploration, characters, places, and projects.

- **Milestone 01**: Cinematic 3D landing page featuring rotating miniature town, dynamic atmosphere based on local time, dimensional 3D typography, responsive viewport adaptation, and playful block transition.
- **Milestone 02**: The Miniature World: World Architecture & Art Direction (Target Progress: ~30%). Transforms the planet into a coherent, storybook-inspired town with 4 distinct districts, 11 landmark buildings, 32 decorative props, interconnected cobblestone paths, water bodies, hills, and a verified dual-rendering path architecture.

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
   - Calculates outward surface normal vectors $\vec{n} = \frac{\vec{p}}{\|\vec{p}\|}$ and aligns local +Y.
   - Applies local yaw rotation around the surface normal.
2. **Path 2: Walkable World Renderer (`src/world/WalkableWorldRenderer.tsx`)**:
   - Uses `getFlatWorldTransform(coords, rotationY)` in `src/world/projection.ts`.
   - Maps `(flatX, flatZ, altitude)` directly onto a planar terrain grid.
   - Renders planar extruded cobblestone roads via `THREE.TubeGeometry` on Catmull-Rom curves.
   - Shares the exact same 3D building and prop component library (`BuildingModels.tsx`, `PropModels.tsx`).

> **Architectural Guarantee**: If a building is added, repositioned, or removed from `CANONICAL_WORLD`, both the spherical planet and the walkable town reflect the change automatically. Automated verification is enforced via `test-world-manifest.mjs`.

### 3. The 4 Distinct Storybook Districts
- **District 1: Town Center & Market Plaza (`#d66d58`)**
  - Grand Town Hall & 3-Tier Clocktower with brass weathervane and arched portico.
  - Cinnamon Hearth Bakery with smoking chimney and warm pastry shopfront.
  - Weaver Guildhouse with timber overhang and indigo eaves.
  - Central stone fountain, market stalls with striped awnings, flower boxes, timber cart, and cobblestone lanes.
- **District 2: Meadow Mill & Allotments (`#4f7d6a`)**
  - Timber Windmill with rotating sails on grassy Windmill Ridge.
  - Gardener's Thatched Cottage with flowering stone planter boxes.
  - Fenced vegetable allotment garden with rows of carrots and cabbages, apple trees with red fruit, and timber fences.
- **District 3: Harbor & Azure Lagoon (`#0ea5e9`)**
  - Beacon Point Lighthouse with revolving lantern dome on coastal cliff.
  - Fisherman's Boathouse raised on timber stilts at the water's edge.
  - Whispering Pond and Azure Lagoon with translucent water shaders and soft waves.
  - Stone arch bridge, moored wooden rowboat, weeping willows, and dock barrels.
- **District 4: Stargazer Bluffs & Tea Terraces (`#7b2cbf`)**
  - Stargazer Dome Observatory with brass celestial telescope pointing heavenward.
  - Cloudcrest Tea Pavilion with curved Japanese-inspired pagoda eaves and lantern.
  - Botanical Orangery Greenhouse with rounded translucent arched glass roof.
  - Bookbinder's Steep-Gabled Cottage with reading loft.
  - Pink cherry blossom trees, alpine pines, and mountain stone trail.

### 4. Dynamic Atmosphere System (`src/config/atmosphereConfig.ts`)
- Evaluates visitor's local browser clock into 3 atmospheric states:
  - **Day** (06:00 – 17:00): Soft blue sky, warm sunlight, fluffy cumulus clouds.
  - **Evening / Sunset** (17:00 – 20:30): Coral/peach sunset gradient, amber golden hour lighting, illuminated windows, and glowing street lanterns.
  - **Night** (20:30 – 06:00): Deep indigo sky, silvery moonlight, twinkling starfield, drifting bioluminescent fireflies, and warm window glow.
- Manual switcher allows instant toggling between Day, Sunset, Night, or System Auto.

### 5. Responsive Design & Inspection UX
- Camera framing automatically adjusts distance $z$ inversely with viewport aspect ratio.
- On hover or selection of any building, the UI displays rich storybook cards with building name, district tag, resident/purpose, story snippet, and civic amenities.
- A seamless "Switch to Walkable Grid / Switch to Spherical Island" view toggle lets visitors explore both architectural projections.

---

## Directory Structure

```
somewhere/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── PROJECT_CONTEXT.md
├── ASSET_MANIFEST.md
├── test-world-manifest.mjs       # Canonical manifest integrity test
├── test-responsive.mjs           # Universal 16-viewport automation test
├── capture-milestone-02.mjs      # Visual multi-angle capture suite
├── src/
│   ├── main.tsx
│   ├── App.tsx                   # View mode state ('miniature' | 'walkable')
│   ├── index.css
│   ├── config/
│   │   ├── atmosphereConfig.ts   # Day, Evening, Night schedules & parameters
│   │   └── contentConfig.ts      # Central editable copy & typography config
│   ├── hooks/
│   │   └── useResponsive.ts      # Viewport classification, camera math, debouncing
│   ├── world/
│   │   ├── types.ts              # Canonical schemas (WorldDefinition, BuildingItem, etc.)
│   │   ├── projection.ts         # Spherical & planar transformation math
│   │   ├── worldData.ts          # Canonical world manifest (v2.0.0 single source of truth)
│   │   └── WalkableWorldRenderer.tsx # Proof of Path 2 consuming CANONICAL_WORLD
│   └── components/
│       ├── canvas/
│       │   ├── SceneCanvas.tsx   # Dual-mode canvas, camera controls, lighting
│       │   ├── MiniaturePlanet.tsx # Spherical miniature renderer (Path 1)
│       │   ├── BuildingModels.tsx# 11 Storybook 3D buildings (R3F procedural)
│       │   ├── PropModels.tsx    # 18 Foliage & prop models (trees, lanterns, etc.)
│       │   ├── SkyAndAtmosphere.tsx # Clouds, flocking birds, stars, fireflies
│       │   └── TextSomewhere3D.tsx# Dimensional 3D typography
│       └── ui/
│           ├── WelcomeOverlay.tsx# Storybook cards, CTA, view mode switcher
│           ├── AtmosphereControls.tsx # Time badge & Day/Sunset/Night selector
│           ├── BlockTransition.tsx # Mosaic wipe transition
│           └── FallbackView.tsx  # Graceful WebGL fallback
```

---

## Commands

- **Start Dev Server**: `npm run dev` (Runs on `http://localhost:3000/`)
- **Build Production**: `npm run build`
- **Lint & Typecheck**: `npm run lint`
- **Test Canonical World**: `npx vite-node test-world-manifest.mjs`
- **Test Responsive Matrix**: `node test-responsive.mjs`
- **Capture Screenshots**: `node capture-milestone-02.mjs`
