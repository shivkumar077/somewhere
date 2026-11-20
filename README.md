# SOMEWHERE

> An interactive, hand-crafted 3D world that tells the story of an engineer through exploration, characters, places, and projects.

---

## 🌟 Landing Experience Refinement (Prompt 04)

Building upon the Milestone 02 architecture, this update refines the visitor experience to closely match the atmosphere, typography balance, and serene charm of the reference design:

### 🎨 Key Refinements

1. **Branding Removal**:
   - Removed the internal project name and large 3D typography from the opening scene.
   - Primary button simplified to read simply `ENTER`.
   - Clean, uncluttered storybook aesthetic without distracting taglines or logos.
2. **Recreated Welcome-Text Composition**:
   - Compact stacked typography: `HELLO / THERE / YOU`.
   - Horizontally centered directly above the planet horizon.
   - Tight line-height (0.88) with playful staggered spring entrance via GSAP (`y: 28 -> 0`, `opacity: 0 -> 1`).
   - Completely responsive without colliding or overflowing on mobile, tablet, or ultrawide screens.
3. **Non-Interactive Rotating Planet**:
   - Planet rotates automatically and gently with constant smooth angular velocity.
   - Dragging, cursor rotating, touch gestures, wheel zooming, and camera panning are completely disabled on the landing page.
   - `ENTER` remains the focal, primary landing interaction.
4. **Recalibrated Camera Framing**:
   - Camera position and responsive distance scaled adaptively to give the miniature planet generous breathing room around all edges.
   - Planet is comfortably visible on initial load across 16 tested viewports.
5. **Soothing Ambient Soundtrack**:
   - Original, peaceful ambient music box / Rhodes instrumental loop (`public/audio/cozy-ambient.wav`).
   - Discreet `AudioControl` button with warm volume fade-in and fade-out.
   - 100% compliant with browser autoplay policies.

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

# Run automated 16-viewport responsive & refinement test suite
node test-responsive.mjs

# Capture visual screenshots
node capture-refinement.mjs

# Build production bundle
npm run build

# Run TypeScript typechecks
npm run lint
```

---

## 🧪 Testing & Verification Results

1. **Canonical Manifest Integrity Test (`test-world-manifest.mjs`)**:
   - **100% PASS**: 11 Landmark Buildings & 32 Props verified with unique IDs and valid coordinate bounds.
2. **Universal Responsive & Refinement Test Suite (`test-responsive.mjs`)**:
   - **16 of 16 Viewports Passed (100%)**:
     - No public-facing SOMEWHERE heading or logo.
     - Primary button reads exactly `ENTER`.
     - Welcome lines `HELLO / THERE / YOU` centered and in bounds.
     - Planet drag/zoom disabled; automatic rotation confirmed.
     - Audio toggle active with graceful fallback.
     - 0 horizontal or vertical overflow across all 16 screen sizes.
3. **Production Build (`tsc && vite build`)**:
   - Clean bundle built in 12.69s.

---

## 🗺️ Progress & Roadmap

- [x] **Milestone 01**: Cinematic 3D Landing Page Foundation (~15%)
- [x] **Milestone 02**: World Architecture & Art Direction (~30%)
- [x] **Refinement**: Landing Experience, Audio & Composition (~35%)
- [ ] **Milestone 03**: Character & Exploration Mechanics (~55%)
- [ ] **Milestone 04**: Interactive Buildings & Content System (~75%)
- [ ] **Milestone 05**: Polish, Soundscapes & Production Release (~100%)
