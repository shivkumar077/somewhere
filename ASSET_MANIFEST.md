# ASSET MANIFEST & DESIGN SYSTEM — MESSENGER REDESIGN

## 1. Aesthetic Direction & Art Bible
- **Reference**: Live Messenger website (`https://messenger.abeto.co/`) and hand-inked anime 3D reference.
- **Color Palette (`MESSENGER_PALETTE`)**:
  - Turquoise Ocean: `#5bb8b2` (deep: `#3a8a85`, shallow: `#72cac4`)
  - Stucco Cream: `#ede2c8` (warm plaster: `#f4ecd8`, dark oak: `#3d281e`)
  - Roof Terracotta: `#c85a3c` (slate blue-grey: `#4a5868`, copper verdigris: `#5c8c7c`)
  - Industrial Pipe Rust Orange: `#d96b27` (flange dark rust: `#9e4511`, pipe steel: `#485460`)
  - Meadow Moss: `#5a8c46` (dark shade: `#3a662e`, highlight: `#7bb25a`)
  - Title Block Face: `#f8f8f8`, Shadow Extrusion: `#94a3b8`
  - Ink Outline: `#1e252b`
  - Enter Button Gold: `#f4c430` (hover: `#ffd54f`, active: `#e0ab18`, text: `#1e252b`)
- **Form Language**: Outlined cel-shaded architecture with hand-inked edges (`EdgesGeometry` + `LineSegments`), discrete 3-tone toon lighting (`MeshToonMaterial`), modular chunky 3D block typography, and industrial pipework.
- **Single Physical World**: The miniature planet and close-up walkable town share the exact same physical Three.js environment (`MessengerPlanet.tsx`), preserving complete visual continuity across all zoom distances.

---

## 2. Landmark Buildings (24 Canonical Entities in v4.0.0)

Authored in Three.js / React Three Fiber procedural assemblies (`src/components/canvas/MessengerBuildingModels.tsx`):

| Building ID | Canonical Name | District | Role / Purpose | Inked Architectural Features |
| :--- | :--- | :--- | :--- | :--- |
| `building-little-house` | The Little House | Town Center | **About Me** (Shiv Kumar biography) | Cream stucco, terracotta gables, brick chimney with puffing smoke |
| `building-university` | The Grand Academy | Stargazer Bluffs | **Education** (Techno India Univ, B.Tech CSE) | Arched portico, grand columns, academic cupola with copper dome |
| `building-workshop` | The Engineer's Workshop | Meadow Mill | **Experience** (Open Source & Systems) | Clerestory roof, industrial rust-orange pipes, anvil & workbenches |
| `building-invention-house` | The Innovation House | Harbor & Lagoon | **Projects** (5 software projects) | Glass skylights, mechanical cogwork, brass antenna array |
| `building-library` | The High Library | Stargazer Bluffs | **Skills** (Cloud, Systems, WebGL) | Tiered book gables, arched stained casements, stone foundation |
| `building-post-office` | The Courier Post Office | Harbor & Lagoon | **Contact** (Email & Résumé) | Postal clock, blue mail dispatch box, telegraph pole connections |
| `building-town-hall` | The Grand Town Hall & Clocktower | Town Center | Civic centerpiece | Grand 3-tier clocktower, arched entrance, civic balcony |
| `building-bakery` | Cinnamon Hearth Bakery | Town Center | Commercial bakery | Curved display window, baker's awning, stone hearth oven |
| `building-weaver-house` | Weaver's Guildhouse & Dye Shop | Town Center | Artisan shop | Hanging banners, exterior dye vats, timber frame |
| `building-apothecary` | Rosemary Herbal Apothecary | Town Center | Botanical shop | Bay window with glass alembics, hanging herb bunches |
| `building-windmill` | High Meadow Windmill | Meadow Mill | Agriculture | Tapered stone round tower, rotating 4-blade lattice sails |
| `building-miller-house` | High Meadow Miller's House | Meadow Mill | Residential | Thatched eave, flour loading winch, timber siding |
| `building-cottage-gardener` | Gardener's Thatched Cottage | Meadow Mill | Residential | Rose trellis, terracotta plant pots, stone path |
| `building-barn-hayloft` | Red Timber Barn & Hayloft | Meadow Mill | Agriculture | Red timber plank siding, open loft door, weather vane |
| `building-cider-shed` | Orchard Cider Shed & Press | Meadow Mill | Production | Timber apple press, wooden cider casks, lean-to roof |
| `building-apiary-cottage` | Clover Mead Apiary Cottage | Meadow Mill | Agriculture | Cedar beehive boxes, floral garden beds |
| `building-lighthouse` | Beacon Point Lighthouse | Harbor & Lagoon | Maritime | Tapered striped masonry tower, revolving fresnel light beam |
| `building-cottage-fisherman` | The Fisherman's Boathouse | Harbor & Lagoon | Maritime | Timber piles over lagoon, rowboat dock, drying fish nets |
| `building-pier-pavilion` | Azure Lagoon Pier Pavilion | Harbor & Lagoon | Civic | Octagonal pavilion, overwater boardwalk, lifebuoys |
| `building-harbor-office` | Harbor Master's Customs Office | Harbor & Lagoon | Maritime | Signal mast, weather instruments, brass tide clock |
| `building-observatory` | Stargazer Dome & Observatory | Stargazer Bluffs | Science | Slotted rotating hemispherical copper dome, brass telescope |
| `building-tea-house` | Cloudcrest Tea Pavilion | Stargazer Bluffs | Cultural | Tiered pagoda eaves, cedar sliding screens, zen garden |
| `building-greenhouse` | Botanical Orangery & Fernhouse | Stargazer Bluffs | Botanical | Arched iron-and-glass vaulting, lush tropical plant silhouettes |
| `building-cottage-bookbinder` | Bookbinder's Gabled Cottage | Stargazer Bluffs | Artisan | Stepped stone gables, arched book press entrance, stained glass |

---

## 3. Environmental Props & Foliage (35 Canonical Entities)

Authored in `src/components/canvas/MessengerPropModels.tsx`:
- Cel-shaded anime round trees with foliage billow contours
- Multi-tier anime scotch pines with jagged inked boughs
- Flowering apple trees with red fruit dots
- Cascading weeping willows over lagoon waters
- Blossom trees with soft coral petal crowns
- Telegraph poles with crossarms and inked ceramic insulators
- Stone village fountain with tiered basin and animated water ripples
- Arched stone bridges spanning the canal
- Wooden rowboats moored at the lagoon shoreline
- Timber village benches with cast-iron ends
- Cast-iron street lanterns with glowing amber lanterns
