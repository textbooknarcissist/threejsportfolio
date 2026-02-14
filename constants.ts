import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'calabar-son',
    title: 'Calabar Son',
    category: 'E-commerce',
    description: 'A premium streetwear landing page demo featuring dark mode, product gallery, cart, and checkout UI.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop',
    link: 'https://calabarson.vercel.app'
  },
  {
    id: 'aether',
    title: 'Aether OS',
    category: 'Systems Design',
    description: 'A minimalist, distributed operating system built for privacy-first mesh networks.',
    tech: ['Wasm', 'TypeScript', 'Go'],
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
    link: 'https://github.com'
  },
  {
    id: 'vertex',
    title: 'Vertex Protocol',
    category: 'FinTech',
    description: 'High-frequency trading interface with sub-10ms visualization latency.',
    tech: ['React', 'D3.js', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=870&auto=format&fit=crop',
    link: 'https://github.com'
  }
];

export const SOCIALS = [
  { id: 'github', name: 'GitHub', url: 'https://github.com/textbooknarcissist' },
  { id: 'twitter', name: 'X', url: 'https://twitter.com/mfredebel' },
  { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/fredebel-m-bab914282' },
  { id: 'medium', name: 'Medium', url: 'https://medium.com/@mfredebel' }
];