import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'lumina',
    title: 'Lumina Engine',
    category: 'Spatial Computing',
    description: 'An AI-driven real-time global illumination engine for architectural visualization.',
    tech: ['C++', 'DirectX 12', 'Rust'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    link: 'https://github.com'
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
    image: 'https://images.unsplash.com/photo-1611974715853-26d305b986c1?q=80&w=2070&auto=format&fit=crop',
    link: 'https://github.com'
  }
];

export const SOCIALS = [
  { id: 'github', name: 'GitHub', url: 'https://github.com/textbooknarcissist' },
  { id: 'twitter', name: 'X', url: 'https://twitter.com/mfredebel' },
  { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/fredebel-m-bab914282' },
  { id: 'medium', name: 'Medium', url: 'https://medium.com/@mfredebel' }
];