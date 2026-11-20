# SOMEWHERE

> An interactive, hand-crafted 3D portfolio world that tells the story of an engineer through exploration, characters, places, and projects.

---

## 🏡 Milestone: The Living Town Experience

Transforming the miniature world into an explorable, storybook-inspired 3D town where visitors can walk through cobblestone streets, talk with charming NPC guides, and discover honest, verified engineering accomplishments.

### 🌟 Key Highlights

1. **Seamless Orbit-to-Town Transition**:
   - Clean, non-interactive miniature planet on landing with stacked `HELLO / THERE / YOU` typography and `ENTER` button.
   - Smooth camera fly-in and playful mosaic block transition bringing the visitor into the town square.
   - Continuous 60-second ambient soundtrack (`cozy-ambient.wav`) that continues playing seamlessly across the transition with zero seam pop.

2. **Explorable 3D Player Character**:
   - Stylized avatar representing Shiv Kumar with natural procedural walking kinematics, breathing idle, and direction facing.
   - Dual-input locomotion: Keyboard (WASD / Arrows) and Click/Tap-to-move ground raycasting with animated target beacon ring.
   - Real-time building collision avoidance and bounds clamping.
   - Third-person follow camera smoothly damping behind the character.

3. **Exactly 6 Primary Functional Destinations**:
   - 🏠 **The Little House** (`about`) — About Shiv Kumar: engineering background, passions, and personal philosophy.
   - 🎓 **The University** (`education`) — Techno India University: B.Tech Computer Science & Engineering with Cloud Computing specialization.
   - 🔧 **The Workshop** (`experience`) — Practical engineering: self-directed projects, systems craft, and open-source contributions (100% honest, zero fabricated employment).
   - ✨ **The Invention House** (`projects`) — Verified projects with live GitHub links:
     - **Shadow Exchange**: P2P dark pool DEX with zero-knowledge order matching.
     - **ASTRA**: Low-latency distributed RPC framework in Rust.
     - **Faultline**: Chaos engineering platform for Kubernetes and cloud clusters.
     - **ForgeFit**: AI-powered fitness workout tracking platform.
     - **VEENA**: Real-time collaborative audio synthesizer on Web Audio API.
   - 📚 **The Library** (`skills`) — Technical knowledge matrix: Cloud & Infrastructure, Systems & Backend, WebGL & 3D, and Tooling.
   - 📬 **The Post Office** (`contact`) — Verified channels: Direct email (`shivkumar6990655@gmail.com`), GitHub, LinkedIn, and Résumé download.

4. **Charming Animated NPC Guides**:
   - **Barnaby the Elder**: Town elder welcoming visitors at the central fountain.
   - **Timothy the Scholar**: Resident librarian guiding visitors toward the University and Library.
   - **Maeve the Crafter**: Artisan directing visitors toward the Workshop and Invention House.
   - **Pip the Inventor**: Energetic tinkerer celebrating open-source projects.
   - **Clara the Postmistress**: Cheerful courier offering direct postal contact with Shiv.

5. **Canonical Single Source of Truth**:
   - `CANONICAL_WORLD` defines 17 buildings, 5 NPCs, 8 terrain features, 5 paths, and 32 props.
   - Both the spherical miniature planet and the flat walkable town view consume this same manifest.

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
