# SOMEWHERE — Project Context & Architecture

## Overview
**SOMEWHERE** is an interactive, hand-crafted 3D portfolio world that tells the story of an engineer through exploration, characters, places, and projects.

- **Milestone 01**: Cinematic 3D landing page foundation with rotating miniature town and dynamic atmosphere.
- **Milestone 02**: World Architecture & Art Direction. Canonical World Manifest (`CANONICAL_WORLD`), 4 districts, 11 buildings, 32 props, and dual-rendering path architecture.
- **Prompt 04 Refinement**: Landing experience refinement (removed public-facing brand titles, clean `ENTER` button, centered `HELLO / THERE / YOU`).
- **Prompt 05 Redesign: Messenger-Style Outlined Cel-Shaded World**:
  - Recreated the visual language, globe presentation, typography treatment, and overall experience flow of Messenger by Abeto (`https://messenger.abeto.co/`) and the hand-inked anime 3D reference.
  - Defined `MESSENGER_PALETTE` (`src/styles/messengerPalette.ts`): turquoise ocean (`#5bb8b2`), warm stucco cream (`#ede2c8`), brick terracotta (`#c85a3c`), timber dark oak (`#3d281e`), industrial pipe rust orange (`#d96b27`), moss meadow green (`#5a8c46`), off-white block faces (`#f8f8f8`), and crisp ink outlines (`#1e252b`).
  - **Inked Outlines & Stepped Cel-Shading**: Implemented `InkedMesh`, `EdgesGeometry` + `LineSegments`, and `MeshToonMaterial` powered by a 3-step discrete gradient texture (`createCelGradientTexture()`) for crisp hand-inked anime rendering with high performance across all mobile and desktop WebGL devices.
  - **3D Modular Block Typography**: Three lines strictly reading `HELLO / THERE / YOU` created from extruded modular block letter geometry with inked borders, positioned directly over the miniature planet horizon and matched by DOM typography with hard shadows and `-webkit-text-stroke`.
  - **Golden Yellow Block Button**: Clean, bold golden yellow block pill (`#f4c430`) with a 2.5px solid border, 4px hard drop shadow, and right arrow icon, strictly reading `ENTER`.
  - **Industrial Pipe Clusters**: Modeled decorative orange industrial piping, flange collars, and vents echoing Messenger's signature mechanical infrastructure.
  - **ONE Continuous World (Critical Architectural Mandate)**: The miniature globe and close-up walkable town remain the **exact same physical 3D world** rendered through `MessengerPlanet.tsx`.
  - Continuous camera zoom with zero scene swapping or blackout fades (`ContinuousCameraController` glides smoothly from orbit $z \approx 17.4$ down to town level $z \approx 6.2$).
  - Canonical world manifest **v4.0.0** (`CANONICAL_WORLD`) featuring:
    - **24 unique buildings** (6 functional destinations + 18 decorative scenery buildings).
    - 5 animated NPC guides with contextual dialogues.
    - 35 hand-crafted props (anime round trees, pines, apple trees, telegraph poles, stone fountain, bridges, rowboats, benches, lanterns).
  - Verified 100% PASS across the complete 16-viewport responsive test suite.

---

## Architectural Principles & Canonical World Contract

### 1. The Single Source of Truth (`src/world/worldData.ts`)
The miniature planet and the walkable exploration town derive their geometry, placement, and story metadata from one definitive manifest: `CANONICAL_WORLD` (v4.0.0).

- **World Manifest Schema (`src/world/types.ts`)**:
  - `districts`: 4 themed cultural districts with color tags and focal centers.
  - `buildings`: 24 landmark structures (6 functional destination buildings + 18 decorative buildings) with stable IDs, semantic types, categories, coordinates, rotation, scales, amenities, and story snippets.
  - `npcs`: 5 animated character guides with coordinates, dialogue trees, and destination navigation hints.
  - `terrainFeatures`: 8 topographical elements (Windmill Ridge, Stargazer Peak, Cloudcrest Knoll, Fern Slope, South Pasture, Sunrise Bluff, Whispering Pond, Azure Lagoon).
  - `paths`: 5 interconnected cobblestone highways and trails with multi-point waypoints.
  - `props`: 35 hand-crafted decorative assets.

### 2. Messenger-Inspired Cel-Shaded Rendering Pipeline
- **Material System**: Stepped toon shading using `MeshToonMaterial` paired with `CEL_GRADIENT_TEXTURE` (a procedural 4-pixel 1D canvas texture with distinct shadow, midtone, and highlight stops at 0.35, 0.70, and 1.0).
- **Ink Line Engine**: `InkedMesh` combines each Three.js geometry with an `EdgesGeometry(geom, thresholdAngle = 24)` and `LineSegments` colored `#1e252b` with slight outward bias to guarantee crisp, non-flickering ink lines without expensive post-processing passes.
- **Ocean Backdrop**: Cyan-turquoise gradient backdrop matching Messenger's observed palette (`#5bb8b2` to `#56b4ad`), with optional time-of-day illumination modulation.

### 3. Continuous Camera Controller (`src/components/canvas/ContinuousCameraController.tsx`)
- Coordinates the seamless camera zoom transition from the high miniature planet overview down to ground-level third-person follow view upon clicking `ENTER`.
- Uses cubic ease-in-out interpolation on camera position and spherical look-at target.
- Maintains complete continuity: no scene unmounting, no model swapping, and no blackout fades.
