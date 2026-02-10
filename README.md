# Fredebel | Quiet Luxury Portfolio

A sophisticated, high-performance portfolio website architected with precision and designed for an immersive user experience. This project embodies the philosophy of "quiet luxury" in digital form—demonstrating technical excellence through unseen performance and refined aesthetics.

## 🚀 Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build System**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion v12](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## ✨ Key Features

- **Morphing Dock Navigation**: A fluid, Apple-inspired dock that adapts to context (Section, Project, Contact).
- **Magnetic Interactions**: Custom magnetic button components that respond to cursor proximity.
- **Micro-Interactions**: Subtle, polished animations for every user interaction.
- **Dark/Light Mode**: Seamless theme switching with persistent state.
- **Responsive Design**: Mobile-first approach ensuring perfect rendering on all devices.
- **Performance Optimized**: Lazy loading, optimized assets, and best-practice rendering patterns.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/aurelius-portfolio.git
   cd aurelius-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

To create a production-ready build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```
├── components/       # Reusable UI components
│   ├── MagneticButton.tsx
│   ├── MorphingDock.tsx
│   ├── ThemeToggle.tsx
│   ├── ErrorBoundary.tsx
│   └── ThemeProvider.tsx
├── hooks/            # Custom React hooks
│   └── useActiveSection.ts
├── styles/          # Global styles and Tailwind configuration
├── types.ts         # TypeScript definitions
├── constants.ts     # Configuration constants (content, links)
├── App.tsx          # Main application component
└── main.tsx         # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by Aurelius Studio
</p>
