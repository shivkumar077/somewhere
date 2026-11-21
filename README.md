# SOMEWHERE

> An interactive, hand-crafted 3D storybook portfolio world by **Shiv Kumar**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 🌟 Overview

**Somewhere** is an explorable 3D portfolio experience designed as a vibrant, living miniature island town. Blending storybook art direction with modern real-time WebGL graphics, Somewhere transforms traditional portfolio browsing into an immersive journey across land, architecture, and interactive landmarks.

---

## ✨ Key Features

### 🏘️ Living Explorable 3D World
- **Hand-Inked Cel-Shaded Aesthetics**: Outlined geometries, custom discrete toon shaders, warm terracotta roofs, and lush greenery.
- **One Continuous Universe**: A miniature planet overview seamlessly transitioning into an explorable ground-level town with zero blackout fades.
- **Dynamic Atmosphere**: Soft sunlight, drifting clouds, flowing water surfaces, and ambient environmental particles.

### 🚶 Character & Locomotion
- **Free-Roam Avatar**: Play as a stylized 3D avatar with natural procedural walking kinematics, idle breathing, and directional facing.
- **Dual-Input Movement**: Full keyboard locomotion (`W`, `A`, `S`, `D` / Arrow keys) and intuitive click/tap-to-move ground navigation.
- **Wardrobe Customization**: Built-in clothing drawer to customize shirts, pants, footwear, and styles in real-time.

### 🧭 Minimalist Navigation Menu
- **Responsive Section Drawer**: Accessible via the top-right button, featuring sleek numbered portfolio destinations:
  - `01 ABOUT` — Engineering background, story, and technical philosophy.
  - `02 EDUCATION` — Computer Science & Engineering foundations and academic journey.
  - `03 EXPERIENCE` — Distributed systems, cloud architecture, and real-time WebGL engineering.
  - `04 PROJECTS` — Flagship open-source projects, interactive experiments, and applications.
  - `05 SKILLS` — Cloud infrastructure, systems programming, 3D graphics, and frontend craft.
  - `06 CONTACT` — Direct communication channels and social profiles.
- **Universal Responsiveness**: Fluid typography and comfortable touch targets tailored for Mobile, Tablet, and Desktop displays.

### 🎵 Immersive Audio Experience
- Integrated Web Audio soundscape featuring peaceful spatial ambient audio, interactive UI feedback, and a one-click audio mute toggle.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Core 3D Engine** | [Three.js](https://threejs.org/), WebGL, Custom GLSL Shaders |
| **Asset Pipeline** | Draco Mesh Compression, KTX2 Texture Streaming |
| **Frontend Framework** | [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Build & Tooling** | [Vite](https://vitejs.dev/) |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), Google Fonts (`Chakra Petch`, `Fredoka`, `Plus Jakarta Sans`) |
| **Audio** | Web Audio API |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shivkumar077/somewhere.git

# 2. Navigate to the project root
cd somewhere

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Visit **`http://localhost:3000`** in your browser to explore the world.

### Production Build

```bash
# Compile TypeScript and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
somewhere/
├── public/                 # Static assets, 3D models, textures, and audio
│   └── assets/             # Compressed geometries, shaders, and sound effects
├── src/
│   ├── components/         # React canvas and UI components
│   │   ├── canvas/         # 3D canvas, atmosphere, and terrain renderers
│   │   └── ui/             # Destination modals, controls, and sound toggles
│   ├── config/             # Canonical portfolio data and content configuration
│   ├── styles/             # Global styles, palette variables, and theme tokens
│   ├── world/              # Canonical world manifest and building data
│   ├── App.tsx             # Main application orchestrator & portfolio menu
│   └── main.tsx            # React application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 👤 Author

**Shiv Kumar**
- **GitHub**: [@shivkumar077](https://github.com/shivkumar077)
- **LinkedIn**: [in/shivkumar077](https://linkedin.com/in/shivkumar077)
- **Email**: [shivkumar6990655@gmail.com](mailto:shivkumar6990655@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
