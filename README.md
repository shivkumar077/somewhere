# SOMEWHERE

> An interactive, hand-crafted 3D portfolio world that tells the story of an engineer through exploration, characters, places, and projects.

---

## 🏡 Milestone: Soft Painterly Anime World Redesign
### One Continuous World — From Miniature Planet to Explorable Town

A complete visual and architectural transformation of Somewhere into a **soft painterly anime world**, inspired by nostalgic 1980s and 1990s animated classics (Studio Ghibli), hand-painted watercolor & gouache illustrations, and dreamy countryside environments.

### 🌟 Key Highlights

1. **ONE Continuous World (Critical Architectural Mandate)**:
   - The miniature planet and close-up walkable town are now the **exact same physical 3D world** rendered through `PainterlyPlanet.tsx`.
   - Continuous physical camera zoom with zero scene swapping or blackout fades (`ContinuousCameraController` glides smoothly from orbit $z \approx 17.4$ down to town level $z \approx 6.2$).
   - The exact same models, foliage, and paths scale up naturally as the camera descends.

2. **Soft Painterly Anime Aesthetic**:
   - `ANIME_PALETTE`: Lush meadow greens, olive foliage, cream plaster stucco, warm terracotta clay roofs, slate blue-grey, aged copper verdigris, and turquoise waters.
   - Organic silhouettes, timber framing, stacked stone foundations, glowing multi-pane casement windows with flower boxes, and billowing chimney smoke puffs.
   - Topographical elevation engine (`getWorldElevation`) displacing terrain into natural bluffs, ridges, and ponds.

3. **24 Landmark Buildings (v4.0.0)**:
   - Exactly 6 primary functional destinations with verified portfolio content:
     - 🏠 **The Little House** (`about`) — About Shiv Kumar: engineering background, passions, and personal philosophy.
     - 🎓 **The University** (`education`) — Techno India University: B.Tech Computer Science & Engineering with Cloud Computing specialization.
     - 🔧 **The Workshop** (`experience`) — Practical engineering: self-directed projects, systems craft, and open-source contributions (100% honest, zero fabricated employment).
     - ✨ **The Invention House** (`projects`) — Verified projects with live GitHub links (Shadow Exchange, ASTRA, Faultline, ForgeFit, VEENA).
     - 📚 **The Library** (`skills`) — Technical knowledge matrix: Cloud & Infrastructure, Systems & Backend, WebGL & 3D, and Tooling.
     - 📬 **The Post Office** (`contact`) — Verified channels: Direct email (`shivkumar6990655@gmail.com`), GitHub, LinkedIn, and Résumé download.
   - 18 decorative scenery buildings (Town Hall & Clocktower, Bakery, Weaver's Guild, Apothecary, Windmill, Miller's House, Thatched Cottages, Barn & Hayloft, Cider Shed, Apiary Cottage, Lighthouse, Boathouse, Pier Pavilion, Harbor Office, Observatory Dome, Tea Pavilion, Greenhouse Orangery, Bookbinder's Cottage).

4. **Living Town Exploration & Characters**:
   - Stylized 3D player avatar representing Shiv Kumar with natural procedural walking kinematics, breathing idle, and direction facing.
   - Dual-input locomotion: Keyboard (WASD / Arrows) and Click/Tap-to-move ground raycasting.
   - 5 animated NPC guides (Barnaby, Timothy, Maeve, Pip, Clara) with dialogues and landmark guidance.
   - Town HUD with destination compass pills, proximity prompts (`[E] to Explore / Talk`), and "Return to Orbit" button.

5. **Exhaustive 16-Viewport Responsive Verification**:
   - 100% pass rate across mobile (320px–430px), foldables (280px cover screen, 884px expanded), tablets, laptops, standard desktops, and ultrawide displays.

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

# Run automated 16-viewport responsive & Living Town test suite
node test-responsive.mjs

# TypeScript validation
npx tsc --noEmit

# Build production bundle
npm run build
```

---

## 📱 Responsive Coverage
Tested and validated across 16 canonical viewports including compact mobile (320px, 360px, 390px, 430px), foldables (280px cover screen & 884px expanded), tablets, standard desktop (1440px), large desktop (1920px), and ultrawide displays (2560px).
