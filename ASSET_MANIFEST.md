# ASSET MANIFEST & DESIGN SYSTEM

## 1. Aesthetic Direction & Art Bible
- **Theme**: Cute, cozy, whimsical, storybook-inspired miniature world.
- **Color Palette**:
  - Alabaster Cream (`#f7efe1`), Buttercream (`#faedcd`), Warm Sandstone (`#dedbd2`)
  - Terracotta Coral (`#d66d58`), Toasted Clay (`#bf573f`), Warm Russet (`#9c6644`)
  - Moss Green (`#4f7d6a`), Olive Sage (`#8cb33e`), Spring Leaf (`#52b788`), Forest Pine (`#1b4332`)
  - Seafoam Slate (`#52796f`), Azure Water (`#38bdf8`), Deep Lagoon (`#0ea5e9`)
  - Copper Patina (`#588157`), Lavender Plum (`#7b2cbf`), Cherry Blossom Pink (`#ff758f`)
  - Warm Lantern Ember (`#f4a261`), Window Glow Gold (`#ffe57f`)
- **Form Language**: Rounded silhouettes, soft chamfers, beveled corners, expressive chimney pots, wooden eaves and timber brackets, tactile matte finishes with soft specular response. Absolutely zero neon cyberpunk, futuristic HUDs, or glossy plastic shaders.
- **Lighting**: Three dynamic time-of-day states (Day, Sunset, Night) with real-time soft shadows, ambient spherical bounce, and warm emissive materials on window panes and lanterns.

---

## 2. Audio & Soundscapes (Prompt 04 Refinement)

A gentle, peaceful, organic instrumental soundtrack designed specifically to complement the illustrated miniature world without dominating the atmosphere.

| Attribute | Details |
| :--- | :--- |
| **Asset Path** | `public/audio/cozy-ambient.wav` |
| **Duration & Format** | 32.0s seamless loop, 44.1 kHz, 16-bit Stereo PCM WAV (lossless) |
| **Musical Composition** | Peaceful ambient Rhodes/music-box chords in C major / A minor pentatonic (`Cmaj9`, `Fmaj7#11`, `Am9`, `Gsus4`) with delicate crystalline chime accents. No vocals, no harsh percussion, no aggressive melodies. |
| **Playback & Controls** | Managed via `src/utils/audioManager.ts` with exponential/linear volume fade-in (1.4s) and fade-out (0.8s). Starts playback only after user gesture to conform to browser autoplay policies. |
| **Licensing & Origin** | **Original Composition (MIT License)** — Procedurally synthesized and composed specifically for this project. 100% royalty-free, copyright-free, no external unverified downloads. |

---

## 3. Landmark Buildings (11 Canonical Entities)

Authored natively in Three.js / React Three Fiber procedural assemblies (`src/components/canvas/BuildingModels.tsx`), ensuring zero load time, 100% stylistic cohesion, and dynamic color theme reactivity:

| Building ID | Canonical Name | District | Category | Asset Key | Key Visual Features |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `building-town-hall` | The Grand Town Hall & Clocktower | Town Center | `civic` | `mesh-town-hall-grand` | 3-tier clocktower, brass weathervane, arched portico, bell spire, glowing clock face |
| `building-bakery` | Cinnamon Hearth Bakery | Town Center | `commercial` | `mesh-bakery-hearth` | Steep pitched roof, pastry display window, warm chimney with billowing puff smoke particles |
| `building-weaver-house` | Weaver's Guildhouse & Dye Shop | Town Center | `commercial` | `mesh-weaver-guild` | Timber-framed second-story overhang, indigo pitched roof, colorful dye cloth hanging rack |
| `building-windmill` | High Meadow Windmill | Meadow Mill | `agriculture` | `mesh-windmill-timber` | Octagonal stone base, conical thatched roof, 4 rotating slatted timber sails |
| `building-cottage-gardener` | Gardener's Thatched Cottage | Meadow Mill | `residential` | `mesh-cottage-gardener` | Rounded organic thatched roof, timber porch, blossoming stone planter flower boxes |
| `building-lighthouse` | Beacon Point Lighthouse | Harbor & Lagoon | `landmark` | `mesh-lighthouse-beacon` | Tapered cylindrical tower, red-and-white bands, gallery catwalk, revolving lamp dome |
| `building-cottage-fisherman` | The Fisherman's Boathouse | Harbor & Lagoon | `coastal` | `mesh-cottage-fisherman` | Weathered cedar shingles, raised timber stilts over lagoon, boat pier mooring |
| `building-observatory` | Stargazer Dome & Observatory | Stargazer Bluffs | `landmark` | `mesh-observatory-dome` | Cylindrical ashlar stone drum, copper patina hemisphere dome, brass celestial telescope |
| `building-tea-house` | Cloudcrest Tea Pavilion | Stargazer Bluffs | `sanctuary` | `mesh-tea-pavilion` | Tiered pagoda eaves with gentle upward sweep, open veranda pillars, paper lantern |
| `building-greenhouse` | Botanical Orangery & Fernhouse | Stargazer Bluffs | `landmark` | `mesh-greenhouse-glass` | Low brick foundation wall, arched translucent glass vaulting, visible lush internal plants |
| `building-cottage-bookbinder` | Bookbinder's Gabled Cottage | Stargazer Bluffs | `residential` | `mesh-cottage-bookbinder` | Steep cross-gable roofline, timber overhang, attic reading dormer, chimney |

---

## 4. Environmental Props & Foliage (32 Canonical Entities)

Authored in `src/components/canvas/PropModels.tsx`:

| Prop Type | Asset Key | Quantity in Town | Description |
| :--- | :--- | :---: | :--- |
| `fountain` | `prop-stone-fountain` | 1 | Octagonal stepped stone basin with central column and layered water discs |
| `market-stall` | `prop-market-stall` | 2 | Wooden timber trestle stall with scalloped striped cloth awning |
| `cart` | `prop-timber-cart` | 1 | Two-wheeled wooden pushcart with spoke wheels and vegetable cargo |
| `bridge` | `prop-stone-bridge` | 1 | Arched cobblestone bridge with safety parapets spanning the lagoon channel |
| `rowboat` | `prop-rowboat` | 1 | Wooden clinker-built skiff moored with twin oars resting on gunwales |
| `tree-apple` | `prop-tree-apple` | 2 | Rounded fluffy canopy studded with ruby-red apples |
| `tree-pine` | `prop-tree-pine` | 5 | 3-tiered stylized storybook pine with snow-dipped or moss tips |
| `tree-blossom` | `prop-tree-blossom` | 3 | Pastel pink cherry blossom trees with clustered spherical foliage |
| `tree-willow` | `prop-tree-willow` | 1 | Slender drooping boughs framing the lagoon edge |
| `tree-round` | `prop-tree-round` | 2 | Classic storybook puff tree with contoured foliage clusters |
| `garden-plot` | `prop-garden-plot` | 1 | Raised timber garden bed with mounded soil and leafy carrot/cabbage greens |
| `fence` | `prop-timber-fence` | 1 | Charming rustic post-and-rail wooden fence |
| `barrel-stack` | `prop-barrels` | 2 | Stacks of coopered wooden storage barrels with iron hoops |
| `bench` | `prop-bench` | 3 | Slatted wooden garden benches with cast armrests |
| `lantern` | `prop-lantern-iron` | 5 | Wrought-iron lamp posts with warm amber emissive point lights |
| `flower-patch` | `prop-flower-patch` | 2 | Clusters of magenta, lavender, and buttercup blossoms |

---

## 5. Licensing & Attribution Summary

| Resource | License | Source / Author |
| :--- | :--- | :--- |
| **All 3D Buildings & Prop Geometries** | MIT | Original custom procedural models created for this project |
| **Ambient Instrumental Soundtrack** | MIT | Original procedural composition created for this project |
| **Fredoka & Plus Jakarta Sans Fonts** | SIL Open Font License 1.1 | Google Fonts (Milena Brandao, Gilbert Bonfim) |
| **Lucide React Icons** | ISC | Lucide Authors |
| **Three.js & R3F Runtime** | MIT | Three.js Authors & Poimandres |
