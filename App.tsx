
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useActiveSection } from './hooks/useActiveSection';
import MorphingDock from './components/MorphingDock';
import MagneticButton from './components/MagneticButton';
import ContactForm from './components/ContactForm';
import { PROJECTS, SOCIALS } from './constants';
import { SectionId, Project } from './types';

const TECH_STACK_ROW_1 = ['React', 'Next.js', 'Typescript', 'Tailwind CSS', 'Framer Motion'];
const TECH_STACK_ROW_2 = ['Git', 'Node.js', 'Three.js', 'PostgreSQL', 'WebGL'];

const MarqueeRow: React.FC<{ items: string[]; direction: 'left' | 'right' }> = ({ items, direction }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap py-2 select-none">
      <motion.div
        animate={{ x: direction === 'left' ? [0, -1000] : [-1000, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 items-center shrink-0 pr-4"
      >
        {[...items, ...items, ...items, ...items].map((tech, i) => (
          <div key={i} className="px-6 py-3 rounded-2xl glass text-xs sm:text-sm font-medium text-foreground/60 border border-foreground/5 whitespace-nowrap">
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const MediumIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c0 3.866 3.582 7 8 7s8-3.134 8-7-3.582-7-8-7-8 3.134-8 7z" /><path d="M18 12c0 3.314 1.343 6 3 6s3-2.686 3-6-1.343-6-3-6-3 2.686-3 6z" /><path d="M23 12c0 2.761.224 5 .5 5s.5-2.239.5-5-.224-5-.5-5-.5 2.239-.5 5z" /></svg>
);

const getSocialIcon = (id: string) => {
  switch (id) {
    case 'github': return <GithubIcon />;
    case 'twitter': return <XIcon />;
    case 'linkedin': return <LinkedinIcon />;
    case 'medium': return <MediumIcon />;
    default: return null;
  }
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      id={`project-${project.id}`}
      className="group relative scroll-mt-24 sm:scroll-mt-32"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 sm:gap-12 md:gap-24 items-center`}>
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          } as any}
          className="w-full md:w-3/5 overflow-hidden rounded-2xl glass aspect-video relative"
        >
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <motion.div
            style={{
              transform: "translateZ(40px)",
            } as any}
            className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>

        <div className="w-full md:w-2/5 group-hover:translate-x-1 transition-transform duration-500">
          <span className="text-indigo-500 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-3 block">0{index + 1} // {project.category}</span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display mb-6 text-foreground transition-colors group-hover:text-indigo-400">{project.title}</h3>
          <p className="text-foreground/30 mb-8 font-light leading-relaxed text-sm sm:text-base">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 rounded-full glass text-[9px] sm:text-[10px] text-foreground/40 uppercase tracking-wider group-hover:border-indigo-500/30 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const { activeSection, activeProject } = useActiveSection();
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-indigo-500/30 overflow-x-hidden">
      <MorphingDock
        activeSection={activeSection}
        activeProject={activeProject}
      />

      {/* Hero Section */}
      <section
        id={SectionId.HERO}
        className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden pt-12 pb-24 sm:pb-32"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-[120px] rounded-full animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10 w-full max-w-3xl"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-foreground/20 mb-6 sm:mb-8 block font-medium">Fredebel Menoh | Frontend Developer</span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display italic mb-6 sm:mb-8 tracking-tight leading-[1.1]">
            Crafting Digital <br />
            <span className="not-italic font-bold tracking-tighter">Experiences.</span>
          </h1>
          <p className="max-w-xl mx-auto text-foreground/30 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10 px-4">
            Building elegant, performant web applications with a focus on exceptional user experiences and modern design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16">
            <MagneticButton href="mailto:mfredebel@gmail.com" className="w-full sm:w-auto px-10 py-4 rounded-full bg-foreground text-background font-bold text-sm transition-all hover:opacity-90 active:scale-95 shadow-lg">
              Let’s build together
            </MagneticButton>
            <MagneticButton href="#" className="w-full sm:w-auto px-10 py-4 rounded-full border border-foreground/20 text-foreground font-bold text-sm transition-all hover:bg-foreground/5 active:scale-95">
              Download CV
            </MagneticButton>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center justify-center gap-8 text-foreground/40"
          >
            {SOCIALS.map((social) => (
              <a
                key={social.id}
                href={social.url}
                className="hover:text-indigo-400 transition-all duration-300 hover:scale-125 active:scale-90"
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
              >
                {getSocialIcon(social.id)}
              </a>
            ))}
          </motion.div>
        </motion.div>


      </section>

      {/* About Section */}
      <section id={SectionId.ABOUT} className="py-12 sm:py-16 px-6">
        <div className="flex flex-col gap-12 sm:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-foreground/20 mb-4 block">Manifesto</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display leading-tight mb-8 text-foreground">
              Quiet luxury in code is <br />
              <span className="italic">unseen performance.</span>
            </h2>
            <p className="text-foreground/40 text-sm sm:text-lg font-light leading-relaxed mb-6">
              I believe that true excellence in technology isn't found in flashy trends, but in the meticulous attention to detail that creates effortless user journeys.
            </p>
            <p className="text-foreground/20 text-sm sm:text-lg font-light leading-relaxed mb-12">
              Building from the vibrant tech pulse of Nigeria, I combine engineering precision with creative storytelling to architect digital systems that resonate on a global scale.
            </p>

            <div className="flex flex-col gap-2 -mx-6 overflow-hidden">
              <MarqueeRow items={TECH_STACK_ROW_1} direction="left" />
              <MarqueeRow items={TECH_STACK_ROW_2} direction="right" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id={SectionId.PROJECTS} className="pb-16 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-foreground/20 mb-4 block">Selected Works</span>
          <h2 className="text-2xl sm:text-4xl font-display text-foreground">Featured Projects</h2>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-24 sm:gap-40">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <MagneticButton onClick={() => setIsArchiveOpen(true)} className="text-foreground/40 hover:text-indigo-400 transition-colors text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium py-3 border-b border-foreground/10 hover:border-indigo-400">
            Explore Archive
          </MagneticButton>
        </div>
      </section>

      {/* Archive Modal */}
      <AnimatePresence>
        {
          isArchiveOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-background/95 backdrop-blur-2xl p-4 sm:p-8 flex items-center justify-center"
            >
              <div className="max-w-4xl w-full h-[85vh] sm:h-[80vh] overflow-y-auto custom-scrollbar px-4 sm:px-0">
                <div className="flex justify-between items-center mb-12 sm:mb-16">
                  <h2 className="text-xl sm:text-3xl font-display italic">The Archive</h2>
                  <button onClick={() => setIsArchiveOpen(false)} className="text-foreground/40 hover:text-foreground transition-colors p-2 glass rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </button>
                </div>

                <div className="flex flex-col gap-6 sm:gap-8">
                  {PROJECTS.map((p, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-foreground/5 pb-6 hover:border-indigo-400 transition-colors group">
                      <div className="flex gap-4 sm:gap-6 items-center min-w-0">
                        <span className="text-foreground/20 font-mono text-[10px] sm:text-xs">2024</span>
                        <span className="text-sm sm:text-lg font-medium text-foreground/60 group-hover:text-foreground transition-colors truncate">{p.title}</span>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-8">
                        <div className="text-foreground/20 text-[10px] hidden md:block uppercase tracking-widest">{p.category}</div>
                        <a href={p.link} target="_blank" className="text-foreground/40 group-hover:text-foreground transition-colors p-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>

      {/* Contact Section */}
      <section
        id={SectionId.CONTACT}
        className="min-h-[70vh] flex flex-col justify-center items-center px-6 pt-16 pb-16"
      >
        <div className="max-w-4xl w-full text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display mb-8 italic leading-tight text-foreground">
              Let's create something <br />
              <span className="not-italic font-bold tracking-tighter">exceptional.</span>
            </h2>
          </motion.div>
        </div>

        <ContactForm />

        <footer className="mt-12 pt-6 border-t border-foreground/5 w-full max-w-6xl flex justify-between items-center text-foreground/20 text-[8px] uppercase tracking-widest font-bold">
          <div>© 2026 Fredebel Menoh</div>
          <div className="flex items-center gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.id}
                href={social.url}
                className="hover:text-foreground transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSocialIcon(social.id)}
              </a>
            ))}
          </div>
        </footer>
      </section>
    </div>
  );
};

export default App;
