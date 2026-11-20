# ASSET MANIFEST & DESIGN SYSTEM

## 1. Aesthetic Direction
- **Theme**: Cute, cozy, whimsical, storybook-inspired.
- **Palette**: Soft pastels (alabaster cream `#f7efe1`, terracotta coral `#d66d58`, moss pine green `#4f7d6a`, sage `#8cb33e`, buttercup `#faedcd`, peach `#fff1e6`, lavender plum `#6d597a`).
- **Form Language**: Rounded silhouettes, beveled corners, expressive chimneys, timber accents, soft matte surfaces with subtle vertex specular response.
- **Lighting**: Warm sunlight, gentle fill, glowing windows with emissive materials, soft street lanterns, fireflies at dusk.

## 2. Geometry & Asset Sources
All geometries in Milestone 01 are procedurally generated and custom-modeled in Three.js / React Three Fiber primitives:
- Eliminates external asset bloat, network latency, and broken GLB dependencies.
- Guarantees 100% stylistic cohesion across every building, prop, tree, cloud, and bird.
- Enables dynamic per-building color themes and window illumination transitions across Day, Sunset, and Night.
- Conforms to strict licensing standards.

| Asset / Entity | Implementation | License | Source / Attribution |
| :--- | :--- | :--- | :--- |
| **Fredoka & Plus Jakarta Sans Fonts** | WebFont / Open Font License | SIL OFL 1.1 | Google Fonts (Milena Brandao, Gilbert Bonfim) |
| **Town Hall, Windmill, Bakery, Observatory, Cottages, Greenhouse, Tea Pavilion, Lighthouse** | Procedural 3D Mesh Assemblies (R3F) | MIT | Original custom implementation for Somewhere |
| **Stylized Trees (Round, Pine, Blossom)** | Procedural Foliage with wind sway | MIT | Original custom implementation for Somewhere |
| **Environmental Props (Lanterns, Benches, Well, Flowers)** | Procedural Mesh Assemblies | MIT | Original custom implementation for Somewhere |
| **Atmospheric Elements (Puffy Clouds, Flapping Birds, Fireflies, Stars)** | Procedural Particle & Curved Geometries | MIT | Original custom implementation for Somewhere |
| **UI Icons (Compass, Clock, Sun, Sunset, Moon, Sparkles)** | Lucide Icons | ISC | Lucide Project |

## 3. Performance & Optimization Metrics
- **Draw Call Management**: Reusable shared geometries and procedural instancing across foliage and particles.
- **Texture Memory**: Zero multi-megabyte diffuse textures; procedural color materials and shaders keep bundle lightweight (< 500 KB gzip total).
- **Shadow Maps**: Soft PCF shadow map constrained to tight frustum around the planet core.
- **Device Support**: Dynamic DPR clamping (1.0 - 2.0), reduced-motion support, WebGL fallback detection.

