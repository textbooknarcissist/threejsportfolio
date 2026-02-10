# Menoh Fredebel | Quiet Luxury Portfolio

A sophisticated, high-performance portfolio website architected with precision and designed for an immersive user experience. This project embodies the philosophy of **"Quiet Luxury"** in digital form—demonstrating technical excellence through unseen performance, refined aesthetics, and meticulous attention to detail.

Built from the vibrant tech pulse of Nigeria, this portfolio combines engineering precision with creative storytelling to architect digital systems that resonate on a global scale.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build System**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with PostCSS
- **Animation**: [Framer Motion v12](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: Integrated with [Formspree](https://formspree.io/) for high-fidelity delivery

## ✨ Key Features

- **Morphing Dock Navigation**: A fluid, Apple-inspired dock that adapts dynamically to the user's focus (Section, Project Details, Contact).
- **Infinite Marquee Tech Stack**: Smooth, dual-row horizontal scroll showcasing core expertise with optimized framerates.
- **Glassmorphism UI**: Premium "Quiet Luxury" aesthetic using theme-aware blur effects and subtle borders.
- **Magnetic Interactions**: Custom magnetic button components that respond to cursor proximity for a tactile experience.
- **Dynamic Themes**: Seamless transitions between deep obsidian dark mode and crisp gallery light mode.
- **Micro-Interactions**: Polished transitions for every user interaction, ensuring a smooth "unseen" performance.

## 🏗️ Technical Architecture

This project follows a modern, highly optimized build pipeline:

- **Modular Styles**: Tailwind CSS is integrated via a custom PostCSS pipeline, ensuring minimal bundle sizes and blazing-fast CSS-in-JS performance.
- **Component Precision**: Atomic design principles are applied to core logic, ensuring that complex interactions like the **Morphing Dock** and **Typewriter Animation** remain maintainable and performant.
- **Accessibility**: Standard-compliant markup with full ARIA support and semantic HTML.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mfredebel/quiet-luxury-portfolio.git
   cd quiet-luxury-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) (or the port specified in your console) to view it in the browser.

### Build and Deployment

To create a production-optimized build:

```bash
npm run build
```

The output will be in the `/dist` folder, ready for deployment to Vercel, Netlify, or any static hosting provider.

## 📂 Project Structure

```text
├── components/       # Reusable UI components
│   ├── MagneticButton.tsx
│   ├── MorphingDock.tsx
│   ├── ThemeToggle.tsx
│   └── ContactForm.tsx
├── hooks/            # Custom React hooks (Active sections, Scroll logic)
├── styles/          # Global index.css with PostCSS integration
├── types.ts         # Centralized TypeScript definitions
├── constants.ts     # Content configuration (Projects, Socials, Stack)
├── App.tsx          # Main application layout and routing
└── index.tsx        # React entry point
```

---

<p align="center">
  Architected with precision by <b>Menoh Fredebel</b>
</p>
