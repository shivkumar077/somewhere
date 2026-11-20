# SOMEWHERE

> Somewhere is an interactive, hand-crafted 3D world that tells the story of an engineer through exploration, characters, places, and projects.

---

## 🌟 Milestone 02: World Architecture & Art Direction (Target Progress: ~30%)

Milestone 02 transforms the initial rotating miniature planet into a cohesive, storybook-inspired miniature town with an enforced single source of truth (`CANONICAL_WORLD`) powering dual future-compatible rendering paths.

### 🏛️ Key Milestone 02 Accomplishments

- **Canonical World Manifest (`src/world/worldData.ts`)**:
  - Definitive single source of truth for the entire town.
  - 4 Cultural Districts:
    - *Town Center & Market Plaza*: Grand Town Hall, Cinnamon Hearth Bakery, Weaver's Guildhouse, Central Fountain, Market Stalls, Timber Cart, Cobblestone High Street.
    - *Meadow Mill & Allotments*: High Meadow Windmill with animated rotating sails, Gardener's Thatched Cottage, Apple Orchards, Fenced Vegetable Allotment.
    - *Harbor & Azure Lagoon*: Beacon Point Lighthouse, Fisherman's Boathouse on Stilts, Stone Arch Bridge, Moored Rowboat, Whispering Pond, Azure Lagoon with ripple animations.
    - *Stargazer Bluffs & Tea Terraces*: Stargazer Dome Observatory with celestial telescope, Cloudcrest Tea Pavilion, Botanical Orangery Greenhouse, Bookbinder's Gabled Cottage, Cherry Blossom Groves.
- **Dual-Rendering Pipeline Architecture**:
  - **Path 1 — Miniature Planet Renderer (`MiniaturePlanet.tsx`)**: Maps `(lat, lon, altitude)` via `getSphereTransform` onto a 3D sphere of radius 4.4, automatically orienting models along outward surface normals with local yaw.
  - **Path 2 — Walkable World Renderer (`src/world/WalkableWorldRenderer.tsx`)**: Maps `(flatX, flatZ, altitude)` via `getFlatWorldTransform` onto a planar terrain grid with Catmull-Rom extruded cobblestone roads.
  - *Proof of Sync*: Modifying or adding any building or prop in `CANONICAL_WORLD` automatically updates both the spherical miniature and walkable world.
- **Art Bible & Storybook Aesthetic**:
  - Hand-crafted pastel palette (alabaster cream, terracotta coral, moss pine green, sage, seafoam slate, azure lagoon, copper patina, cherry blossom pink).
  - Rounded silhouettes, soft chamfers, timber trim, smoking chimneys, glowing window panes.
  - Absolutely zero cyberpunk, neon grids, generic SaaS dashboards, or glossy plastic shaders.
- **Interactive Storybook Cards**:
  - Real-time hover and selection of town landmarks displaying district badges, resident identities, story snippets, and amenities.
- **Dual View Mode Switcher**:
  - Toggle seamlessly between **Spherical Island** and **Walkable Grid** views to inspect the architectural synchronisation live in browser.
- **100% Universal Responsive Design**:
  - Fully tested across 16 viewports from 280px foldable narrow cover to 2560px ultrawide displays.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation & Commands

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000/)
npm run dev

# Run canonical world manifest integrity verification
npx vite-node test-world-manifest.mjs

# Run automated 16-viewport responsive test suite
node test-responsive.mjs

# Capture multi-angle visual screenshots
node capture-milestone-02.mjs

# Build production bundle
npm run build

# Run TypeScript typechecks
npm run lint
```

---

## 🧪 Testing & Verification Results

1. **Canonical Manifest Integrity Test (`test-world-manifest.mjs`)**:
   - `CANONICAL_WORLD` v2.0.0 passed with 100% integrity.
   - 11 Landmark Buildings & 32 Props verified with unique IDs and valid coordinate bounds.
   - Dual transform math (`getSphereTransform` & `getFlatWorldTransform`) verified with zero NaN values.
   - Single Source of Truth synchronization verified across simulated building mutations.

2. **Universal Responsive Test Suite (`test-responsive.mjs`)**:
   - **16 of 16 Viewports Passed (100%)**:
     - 320px, 360px, 375px, 390px, 430px mobile widths (portrait & landscape)
     - 280px narrow foldable cover & 884px expanded foldable layouts
     - 600px, 768px, 1024px tablets (portrait & landscape)
     - 1280px laptop, 1440px standard desktop, 1920px large desktop, 2560px ultrawide
     - Orientation flip (portrait -> landscape) and `prefers-reduced-motion`

---

## 🗺️ Progress & Roadmap

- [x] **Milestone 01**: Cinematic 3D Landing Page (~15%)
- [x] **Milestone 02**: World Architecture & Art Direction (~30%)
- [ ] **Milestone 03**: Character & Exploration Mechanics (~50%)
- [ ] **Milestone 04**: Interactive Buildings & Content System (~70%)
- [ ] **Milestone 05**: Polish, Soundscapes & Production Release (~100%)
