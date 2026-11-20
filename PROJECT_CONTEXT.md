# SOMEWHERE — Project Context & Architecture

## Overview
**SOMEWHERE** is an interactive, hand-crafted 3D portfolio world that tells the story of an engineer through exploration, characters, places, and projects.

**Milestone 01** implements the cinematic 3D landing page featuring a rotating miniature town, dynamic atmosphere based on local time, dimensional 3D typography, and a cinematic block transition.

---

## Architectural Principles & Canonical World Contract

### 1. The Single Source of Truth
The miniature planet in Milestone 01 is an exact preview of the future walkable exploration world (Milestone 02). Both renderers consume the exact same canonical definition located in `src/world/worldData.ts`.

- **Canonical Definition (`src/world/types.ts` & `src/world/worldData.ts`)**:
  - Every building has a stable ID, semantic type, visual theme, coordinates, rotation, scale, and rich story metadata.
  - Every prop (trees, lanterns, benches, wells, flower patches) is recorded with coordinate and type.
  - Paths are defined by shared waypoint nodes.
  - If an item is added, moved, or deleted in `CANONICAL_WORLD`, both the spherical planet and future walkable world immediately reflect that modification.

### 2. Transformation Layer (`src/world/projection.ts`)
- **Spherical Miniature Projection**: Converts `(lat, lon, altitude)` to 3D Cartesian `(x, y, z)` on the sphere of radius $R = 4.4$, aligning the model's normal with the planet center and applying local yaw along the surface tangent.
- **Flat Walkable World Projection**: Converts the same `coordinates.flatX` and `coordinates.flatZ` to flat plane coordinates with ground alignment for the first/third-person engine.

### 3. Dynamic Atmosphere System (`src/config/atmosphereConfig.ts`)
- Evaluates the visitor's local browser clock into three atmospheric states:
  - **Day** (06:00 – 17:00): Bright daylight, soft cerulean sky, warm sun, white clouds.
  - **Evening / Sunset** (17:00 – 20:30): Peach/coral sunset gradient, amber golden-hour lighting, long soft shadows, glowing street lanterns and window lights.
  - **Night** (20:30 – 06:00): Deep indigo twilight, silvery moonlight, illuminated windows, floating fireflies, and twinkling stars.
- Includes manual override buttons (Day, Sunset, Night, Sync) allowing visitors to experience all states on demand.

### 4. 3D Typography & Central Content (`src/config/contentConfig.ts`)
- "SOMEWHERE" is rendered as dimensional 3D typography floating above the planet.
- Welcome copy (`HELLO`, `THERE`, `YOU`) is centrally configured and animated with tasteful staggered reveals.

### 5. Playful Block Transition & Fly-in (`src/components/ui/BlockTransition.tsx`)
- Clicking "ENTER SOMEWHERE" triggers a playful mosaic block wipe across the screen.
- Concurrently, the camera swoops in with GSAP toward the Town Square.
- At the transition peak, the experience smoothly resolves into the Town Square arrival state with an option to Return to Orbit.

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
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── config/
│   │   ├── atmosphereConfig.ts    # Day, Evening, Night schedules & parameters
│   │   └── contentConfig.ts       # Central editable copy & typography config
│   ├── world/
│   │   ├── types.ts               # Core canonical data schemas
│   │   ├── projection.ts          # Spherical & planar transformation math
│   │   └── worldData.ts           # Canonical world definition (single source of truth)
│   └── components/
│       ├── canvas/
│       │   ├── SceneCanvas.tsx    # Canvas, camera controls, render loop
│       │   ├── MiniaturePlanet.tsx# Spherical miniature town & terrain
│       │   ├── BuildingModels.tsx # Storybook stylized 3D buildings
│       │   ├── PropModels.tsx     # Stylized foliage, lanterns, props
│       │   ├── SkyAndAtmosphere.tsx# Clouds, flocking birds, stars, fireflies
│       │   └── TextSomewhere3D.tsx# 3D dimensional typography
│       └── ui/
│           ├── WelcomeOverlay.tsx # Typography reveal, tooltips, ENTER CTA
│           ├── AtmosphereControls.tsx# Time badge & Day/Sunset/Night selector
│           ├── BlockTransition.tsx# Playful mosaic block wipe transition
│           └── FallbackView.tsx   # Graceful WebGL/hardware fallback
```

---

## Commands

- **Start Dev Server**: `npm run dev`
- **Build Production**: `npm run build`
- **Typecheck & Lint**: `npm run lint`
- **Preview Production Build**: `npm run preview`

