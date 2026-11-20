# SOMEWHERE

> Somewhere is an interactive, hand-crafted 3D world that tells the story of an engineer through exploration, characters, places, and projects.

---

## 🌟 Milestone 01: The Cinematic 3D Landing Page

Milestone 01 establishes the foundation of the SOMEWHERE universe with a rotating miniature town, dynamic atmosphere based on local time, dimensional 3D typography, and a cinematic block transition.

### Key Features

- **Rotating Miniature Town**: A spherical illustrated planet with hand-crafted architectural landmarks:
  - *The Town Bell & Hall*: Civic center with clock tower and brass weathervane.
  - *Whispering Hill Windmill*: Rotating 4-blade canvas sail on a grassy knoll.
  - *Cinnamon Hearth Bakery*: Gabled roof, bread sign, and rising chimney smoke puffs.
  - *Stargazer Dome*: Round stone tower with copper observatory dome and telescope.
  - *Rosebriar & Cloverfold Cottages*: Cozy storybook residences with timber framing.
  - *Sunlit Orangery*: Curved glass solarium conserving delicate ferns.
  - *Cloudcrest Tea Pavilion*: Tiered pagoda gazebo with open timber deck.
  - *Beacon Lookout & Pier*: Harbor lighthouse with pulsing beacon light.
- **Single Canonical World Definition**: Both the miniature planet and the upcoming walkable exploration world (Milestone 02) read the exact same data schema in `src/world/worldData.ts`. A transformation layer (`src/world/projection.ts`) projects canonical coordinates onto the sphere with surface normal alignment.
- **Dynamic Time-Based Atmosphere**:
  - Automatically synchronizes with the visitor's local browser clock.
  - **Day** (06:00 – 17:00): Soft cerulean sky, warm sunshine, drifting white clouds.
  - **Sunset** (17:00 – 20:30): Peach and coral twilight gradient, long golden shadows, lantern lights.
  - **Night** (20:30 – 06:00): Deep midnight indigo, soft moonlight, glowing window lights, floating fireflies, and twinkling stars.
  - Interactive top-right atmosphere switcher to preview Day, Sunset, Night, or re-sync with local time.
- **Dimensional 3D Typography**: Floating "SOMEWHERE" title integrated into the 3D scene with gentle breathing animation and lighting response.
- **Animated Welcome Message**: Configurable 3-line entrance copy (`HELLO THERE YOU`) in `src/config/contentConfig.ts`.
- **Cinematic ENTER Interaction**:
  - Clicking "ENTER SOMEWHERE" triggers a playful pastel mosaic block wipe.
  - Camera swoops in gracefully with GSAP towards the Town Square.
  - Seamless arrival card previewing Milestone 02 with a "Return to Orbit" camera fly-back.
- **Responsiveness & Performance**:
  - Touch drag controls to gently spin the planet.
  - DPR clamped between 1.0 and 2.0.
  - Procedural geometries with zero heavy texture downloads.
  - Graceful WebGL fallback detection.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation & Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run type checks and linting
npm run lint

# Production build
npm run build

# Preview production build
npm run preview

# Run automated Puppeteer QA test suite
node test-qa.mjs
```

---

## 📁 Architecture Overview

```
src/
├── config/
│   ├── atmosphereConfig.ts    # Time schedules, sky palettes & lighting presets
│   └── contentConfig.ts       # Central editable copy & typography config
├── world/
│   ├── types.ts               # Core canonical world definition schemas
│   ├── projection.ts          # Spherical & planar transformation math
│   └── worldData.ts           # Canonical world definition (single source of truth)
└── components/
    ├── canvas/
    │   ├── SceneCanvas.tsx    # Canvas setup, GSAP camera controller, render loop
    │   ├── MiniaturePlanet.tsx# Spherical miniature town & terrain
    │   ├── BuildingModels.tsx # Storybook stylized 3D buildings
    │   ├── PropModels.tsx     # Stylized foliage, lanterns, benches, well
    │   ├── SkyAndAtmosphere.tsx# Clouds, flocking birds, stars, fireflies
    │   └── TextSomewhere3D.tsx# 3D dimensional typography
    └── ui/
        ├── WelcomeOverlay.tsx # Typography reveal, tooltips, ENTER CTA
        ├── AtmosphereControls.tsx# Time badge & Day/Sunset/Night selector
        ├── BlockTransition.tsx# Playful mosaic block wipe transition
        └── FallbackView.tsx   # Graceful WebGL/hardware fallback
```

---

## 📜 License & Asset Manifest
See [ASSET_MANIFEST.md](file:///C:/Users/sk699/OneDrive/Desktop/somewhere/ASSET_MANIFEST.md) for licensing, asset attribution, and design system specifications.
See [PROJECT_CONTEXT.md](file:///C:/Users/sk699/OneDrive/Desktop/somewhere/PROJECT_CONTEXT.md) for architectural notes.
