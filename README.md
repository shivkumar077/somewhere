# SOMEWHERE

> An interactive, hand-crafted 3D portfolio world that tells the story of an engineer through exploration, characters, places, and projects.

---

## 📬 Milestone: Messenger-Style Outlined Cel-Shaded World Redesign
### Reference: `https://messenger.abeto.co/` & Hand-Inked Anime 3D Reference

A complete visual and architectural redesign of Somewhere into an **outlined, cel-shaded 3D miniature island**, capturing the visual language, globe presentation, typography treatment, and overall experience flow of Messenger by Abeto (`https://messenger.abeto.co/`).

### 🌟 Key Highlights

1. **Messenger-Inspired Cel-Shaded Art Direction**:
   - `MESSENGER_PALETTE`: Flat turquoise ocean gradient (`#5bb8b2` to `#56b4ad`), warm stucco cream (`#ede2c8`), terracotta clay roofs (`#c85a3c`), timber dark oak (`#3d281e`), industrial pipe rust orange (`#d96b27`), moss meadow green (`#5a8c46`), off-white block faces (`#f8f8f8`), and crisp ink outlines (`#1e252b`).
   - Hand-inked line edges on all geometries powered by `EdgesGeometry` + `LineSegments` with precision normal offsets to prevent Z-fighting.
   - Stepped 3-tone cel shading via `MeshToonMaterial` and a custom discrete canvas gradient texture (`CEL_GRADIENT_TEXTURE`).
   - Industrial rust-orange pipework clusters, vents, and flanges reflecting Messenger's mechanical infrastructure.

2. **3D Modular Block Typography & Golden Yellow Button**:
   - Authentic 3D chunky modular block letters strictly reading `HELLO / THERE / YOU` with off-white front faces, extruded shaded sides, and crisp ink outlines.
   - Matched by responsive DOM typography using `Chakra Petch` geometric lettering with `-webkit-text-stroke: 2.5px #1e252b` and hard drop shadows.
   - Golden yellow block button (`#f4c430`) with a 2.5px solid border, 4px hard drop shadow, and right arrow icon, strictly reading `ENTER`.

3. **ONE Continuous World (Critical Architectural Mandate)**:
   - The miniature globe and close-up walkable town are the **exact same physical 3D world** rendered through `MessengerPlanet.tsx`.
   - Continuous physical camera zoom with zero scene swapping or blackout fades (`ContinuousCameraController` glides smoothly from orbit $z \approx 17.4$ down to town level $z \approx 6.2$).
   - The exact same models, foliage, and paths scale up naturally as the camera descends.

4. **24 Landmark Buildings (v4.0.0)**:
   - Exactly 6 primary functional destinations with verified portfolio content:
     - 🏠 **The Little House** (`about`) — About Shiv Kumar: engineering background, passions, and personal philosophy.
     - 🎓 **The Grand Academy** (`education`) — Techno India University: B.Tech Computer Science & Engineering with Cloud Computing specialization.
     - 🔧 **The Workshop** (`experience`) — Practical engineering: self-directed projects, systems craft, and open-source contributions.
     - ✨ **The Innovation House** (`projects`) — Verified projects with live GitHub links (Shadow Exchange, ASTRA, Faultline, ForgeFit, VEENA).
     - 📚 **The Library** (`skills`) — Technical knowledge matrix: Cloud & Infrastructure, Systems & Backend, WebGL & 3D, and Tooling.
     - 📬 **The Post Office** (`contact`) — Verified channels: Direct email (`shivkumar6990655@gmail.com`), GitHub, LinkedIn, and Résumé download.
   - 18 decorative scenery buildings (Town Hall & Clocktower, Bakery, Weaver's Guild, Apothecary, Windmill, Miller's House, Thatched Cottages, Barn & Hayloft, Cider Shed, Apiary Cottage, Lighthouse, Boathouse, Pier Pavilion, Harbor Office, Observatory Dome, Tea Pavilion, Greenhouse Orangery, Bookbinder's Cottage).

5. **Living Town Exploration & Characters**:
   - Stylized 3D player avatar representing Shiv Kumar with natural procedural walking kinematics, breathing idle, and direction facing.
   - Dual-input locomotion: Keyboard (WASD / Arrows) and Click/Tap-to-move ground raycasting.
   - 5 animated NPC guides (Barnaby, Timothy, Maeve, Pip, Clara) with dialogues and landmark guidance.
   - Town HUD with destination compass pills, proximity prompts (`[E] to Explore / Talk`), and "Return to Orbit" button.

6. **Exhaustive 16-Viewport Responsive Verification**:
   - 100% pass rate (16/16) across mobile (320px–430px), foldables (280px cover screen, 884px expanded), tablets, laptops, standard desktops, and ultrawide displays.

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
npx tsx test-world-manifest.mjs

# Run responsive & Messenger acceptance test suite across 16 viewports
node test-messenger-style.mjs

# Type check & production build
npm run build
```
