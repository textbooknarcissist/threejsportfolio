# Menoh Fredebel | Quiet Luxury Portfolio

A sophisticated, high-performance portfolio website architected with precision and designed for an immersive user experience. This project embodies the philosophy of **"Quiet Luxury"** in digital form—demonstrating technical excellence through unseen performance, refined aesthetics, and meticulous attention to detail.

Built from the vibrant tech pulse of Nigeria, this portfolio combines engineering precision with creative storytelling to architect digital systems that resonate on a global scale.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build System**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with PostCSS
- **Animation**: [Framer Motion v12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Analytics**: [Supabase](https://supabase.com/) (PostgreSQL + RPC)
- **Forms**: Integrated with [Formspree](https://formspree.io/) for high-fidelity delivery

## ✨ Key Features

- **Morphing Dock Navigation**: A fluid, Apple-inspired dock that adapts dynamically to the user's focus (Section, Project Details, Contact).
- **Unique Visitor Counter**: Real-time visitor count powered by Supabase, with `localStorage` deduplication ensuring each browser counts once.
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
- **Secure Analytics**: Supabase RLS (Row Level Security) ensures only the designated RPC function can mutate analytics data.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- A [Supabase](https://supabase.com/) project (free tier is sufficient)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/textbooknarcissist/threejsportfolio.git
   cd threejsportfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root:

   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run the Supabase migration**

   Copy the contents of `supabase/migrations/20260221_site_stats.sql` and run it in your Supabase dashboard → **SQL Editor**.

5. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build and Deployment

```bash
npm run build
```

The output will be in the `/dist` folder, ready for deployment to Vercel, Netlify, or any static hosting provider.

> **Note**: Ensure your hosting provider has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set as environment variables.

## 📂 Project Structure

```text
├── components/          # Reusable UI components
│   ├── MagneticButton.tsx
│   ├── MorphingDock.tsx
│   ├── ThemeToggle.tsx
│   └── ContactForm.tsx
├── hooks/               # Custom React hooks
│   ├── useActiveSection.ts
│   └── useVisitorCount.ts
├── lib/                 # Third-party client initialization
│   └── supabase.ts
├── supabase/
│   └── migrations/      # SQL migration scripts
├── types.ts             # Centralized TypeScript definitions
├── constants.ts         # Content configuration (Projects, Socials, Stack)
├── App.tsx              # Main application layout
└── index.tsx            # React entry point
```

---

<p align="center">
  Architected with precision by <b>Menoh Fredebel</b>
</p>
