# Nitin Kashyap — Interactive 3D Portfolio

[![Live Demo](https://img.shields.io/badge/Live_Demo-nitinn2006.github.io%2FPortfoliooo-rose?style=for-the-badge&logo=github)](https://nitinn2006.github.io/Portfoliooo/)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-22c55e?style=for-the-badge&logo=githubactions)](https://nitinn2006.github.io/Portfoliooo/)

> 🌐 **Live Website**: [https://nitinn2006.github.io/Portfoliooo/](https://nitinn2006.github.io/Portfoliooo/)

An interactive 3D developer portfolio and workstation experience built with **React 19**, **Three.js / React Three Fiber**, **TypeScript**, and **Tailwind CSS**.

Featuring a night-time desk environment where each interactive object corresponds to a portfolio section:
- **01 PROJECTS**: High-definition developer monitor with syntax-highlighted analytics code and EDA bar chart.
- **02 ACHIEVEMENTS**: Wall-mounted pegboard with hanging certificates, Smart India Hackathon silver medal, and pendulum sway.
- **03 ABOUT**: Open desk journal displaying education at PSIT Kanpur (BCA) and core technical competencies.
- **04 CONTACT**: Smartphone on the desk with direct email and GitHub lock-screen notification.

Includes an **Accessible 2D Semantic Layer** for screen readers and SEO crawlers, two-way URL hash sync, and reduced-motion accessibility.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **3D Engine**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Camera Animation**: [GSAP](https://gsap.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Post-processing**: Selective bloom via `@react-three/postprocessing`

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Nitinn2006/Portfoliooo.git
cd Portfoliooo

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── HUD.tsx                   # Fixed HUD overlays (pill nav, badges, mode switch)
│   ├── Scene.tsx                 # 3D Canvas, lighting, bloom & hotspot orchestration
│   ├── loading/                  # Loading screen with animated progress bar
│   ├── panels/                   # Glassmorphic sliding modal panels
│   ├── scene/
│   │   ├── CameraController.tsx  # Smooth GSAP fly-to transitions & idle drift
│   │   ├── Furniture.tsx         # Desk, Monitor, Pegboard, Notebook, Phone, Lamp
│   │   ├── Hotspot.tsx           # Floating diamond indicators with clickable labels
│   │   ├── Room.tsx              # Room architecture, window mullions, parquet floor
│   │   └── Skyline.tsx           # Procedural nighttime skyscraper backdrop
│   ├── sections/                 # Shared content components (Projects, About, etc.)
│   └── semantic/                 # Semantic, SEO-crawlable 2D document fallback
├── hooks/                        # FPS fallback & prefers-reduced-motion hooks
├── utils/                        # Procedural canvas textures (certifications, monitor, notebook, phone)
├── content.ts                    # Single source of truth for all portfolio facts
├── App.tsx                       # Root view state coordinator & URL hash sync
├── main.tsx                      # Vite React entry point
└── index.css                     # Dark theme styles and Tailwind directives
```

---

## ⚡ Accessibility & Performance

- **Zero Accidental Overflow**: 3D mode locks the viewport to 100vh with zero black void scrolling.
- **prefers-reduced-motion**: Disables camera fly-throughs, sway animations, and drift for users with vestibular sensitivities.
- **Automatic 2D Fallback**: Automatically switches to the lightweight 2D semantic view on mobile viewports (<768px) or low-FPS hardware.
- **Single Source of Truth**: All resume facts, titles, and links are managed strictly in `src/content.ts`.

---

## 📄 License

MIT License. Designed and built for Nitin Kashyap.
