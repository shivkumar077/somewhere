# ASSET MANIFEST & DESIGN SYSTEM

## 1. Aesthetic Direction & Art Bible
- **Theme**: Soft painterly anime aesthetic inspired by 1980s and 1990s animated classics, watercolor illustrations, and dreamy nostalgic countryside environments.
- **Color Palette (`ANIME_PALETTE`)**:
  - Meadow Grass (`#5a8c46`), Shadow Grass (`#3a662e`), Highlight Meadow (`#7bb25a`)
  - Warm Plaster (`#f4ecd8`), Cream Stucco (`#ede2c8`), Weathered Timber (`#5a4032`), Dark Oak (`#3d281e`)
  - Warm Terracotta Tile (`#c85a3c`), Slate Blue-Grey (`#4a5868`), Aged Copper Verdigris (`#5c8c7c`)
  - Turquoise Water Surface (`#4ea8a0`), Deep Water Bed (`#286466`)
  - Warm Glowing Amber Windows (`#ffd166`), Hearth Smoke (`#e8ecf0`)
- **Form Language**: Organic silhouettes, hand-drawn contours, timber framing, stacked stone foundations, multi-pane casement windows with flower boxes, billowing chimney smoke puffs, layered foliage clumps, and soft atmospheric depth.
- **Single Physical World**: The miniature planet and close-up walkable town share the exact same physical Three.js environment (`PainterlyPlanet.tsx`), preserving complete visual continuity across all zoom distances.

---

## 2. Audio & Soundscapes
A gentle, peaceful ambient soundtrack with zero seam pops, playing uninterrupted across miniature and close-up views.

---

## 3. Landmark Buildings (24 Canonical Entities in v4.0.0)

Authored in Three.js / React Three Fiber procedural assemblies (`src/components/canvas/BuildingModels.tsx`):

| Building ID | Canonical Name | District | Role / Purpose |
| :--- | :--- | :--- | :--- |
| `building-little-house` | The Little House | Town Center | **About Me** (Shiv Kumar biography) |
| `building-university` | The Grand Academy | Stargazer Bluffs | **Education** (Techno India Univ, B.Tech CSE) |
| `building-workshop` | The Engineer's Workshop | Meadow Mill | **Experience** (Open Source & Systems) |
| `building-invention-house` | The Innovation House | Harbor & Lagoon | **Projects** (5 software projects) |
| `building-library` | The High Library | Stargazer Bluffs | **Skills** (Cloud, Systems, WebGL) |
| `building-post-office` | The Courier Post Office | Harbor & Lagoon | **Contact** (Email & Résumé) |
| `building-town-hall` | The Grand Town Hall & Clocktower | Town Center | Civic town centerpiece |
| `building-bakery` | Cinnamon Hearth Bakery | Town Center | Fresh artisan bread & pastries |
| `building-weaver-house` | Weaver's Guildhouse & Dye Shop | Town Center | Textiles & dye vats |
| `building-apothecary` | Rosemary Herbal Apothecary | Town Center | Botanical tonics & remedies |
| `building-windmill` | High Meadow Windmill | Meadow Mill | Grain milling with revolving sails |
| `building-miller-house` | High Meadow Miller's House | Meadow Mill | Miller residence |
| `building-cottage-gardener` | Gardener's Thatched Cottage | Meadow Mill | Garden floral cottage |
| `building-barn-hayloft` | Red Timber Barn & Hayloft | Meadow Mill | Agricultural storage |
| `building-cider-shed` | Orchard Cider Shed & Press | Meadow Mill | Fruit press & cider barrels |
| `building-apiary-cottage` | Clover Mead Apiary Cottage | Meadow Mill | Honeycomb hives & honey |
| `building-lighthouse` | Beacon Point Lighthouse | Harbor & Lagoon | Revolving marine beacon |
| `building-cottage-fisherman` | The Fisherman's Boathouse | Harbor & Lagoon | Stilts over lagoon, boat pier |
| `building-pier-pavilion` | Azure Lagoon Pier Pavilion | Harbor & Lagoon | Waterfront gazebo |
| `building-harbor-office` | Harbor Master's Customs Office | Harbor & Lagoon | Harbor ledger & navigation charts |
| `building-observatory` | Stargazer Dome & Observatory | Stargazer Bluffs | Brass celestial telescope |
| `building-tea-house` | Cloudcrest Tea Pavilion | Stargazer Bluffs | Tiered pagoda eaves & matcha tea |
| `building-greenhouse` | Botanical Orangery & Fernhouse | Stargazer Bluffs | Arched glass vaulting & ferns |
| `building-cottage-bookbinder` | Bookbinder's Gabled Cottage | Stargazer Bluffs | Parchment binding & maps |

---

## 4. Environmental Props & Foliage (35 Canonical Entities)

Authored in `src/components/canvas/PropModels.tsx`:
- Layered foliage apple trees with fruit
- Multi-tier scotch pines
- Pastel cherry/apricot blossom trees
- Cascading weeping willows over lagoon waters
- Stone town fountain with animated water ripples
- Water wells, cobblestone bridges, and moored rowboats
- Rustic timber fences, barrel stacks, benches, and flower meadows

---

## 5. Licensing & Attribution Summary

| Resource | License | Source / Author |
| :--- | :--- | :--- |
| **All 3D Buildings & Prop Geometries** | MIT | Original custom procedural models created for this project |
| **Ambient Instrumental Soundtrack** | MIT | Original procedural composition created for this project |
| **Fredoka & Plus Jakarta Sans Fonts** | SIL Open Font License 1.1 | Google Fonts (Milena Brandao, Gilbert Bonfim) |
| **Lucide React Icons** | ISC | Lucide Authors |
| **Three.js & R3F Runtime** | MIT | Three.js Authors & Poimandres |
