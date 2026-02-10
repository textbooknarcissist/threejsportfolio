import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId, Project, DockState } from '../types';
import { SOCIALS } from '../constants';
import ThemeToggle from './ThemeToggle';

interface MorphingDockProps {
  activeSection: SectionId;
  activeProject?: Project;
}

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const MediumIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c0 3.866 3.582 7 8 7s8-3.134 8-7-3.582-7-8-7-8 3.134-8 7z"/><path d="M18 12c0 3.314 1.343 6 3 6s3-2.686 3-6-1.343-6-3-6-3 2.686-3 6z"/><path d="M23 12c0 2.761.224 5 .5 5s.5-2.239.5-5-.224-5-.5-5-.5 2.239-.5 5z"/></svg>
);

const getSocialIcon = (id: string) => {
  switch(id) {
    case 'github': return <GithubIcon />;
    case 'twitter': return <XIcon />;
    case 'linkedin': return <LinkedinIcon />;
    case 'medium': return <MediumIcon />;
    default: return null;
  }
};

const MorphingDock: React.FC<MorphingDockProps> = ({ activeSection, activeProject }) => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@aurelius.dev');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const getDockState = (): DockState => {
    if (activeSection === SectionId.CONTACT) return 'CONTACT';
    if (activeSection === SectionId.PROJECTS && activeProject) return 'PROJECT';
    return 'DEFAULT';
  };

  const state = getDockState();

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
      <motion.div
        layout
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          layout: { duration: 0.4 } 
        } as any}
        className="glass rounded-full pointer-events-auto shadow-2xl overflow-hidden flex items-center h-12 sm:h-14 max-w-[95vw] sm:max-w-none"
      >
        <AnimatePresence mode="wait">
          {state === 'DEFAULT' && (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center px-2 sm:px-4 gap-0.5 sm:gap-1 h-full"
            >
              <NavItem href="#hero" label="Home" active={activeSection === SectionId.HERO} icon={<HomeIcon />} />
              <NavItem href="#about" label="Info" active={activeSection === SectionId.ABOUT} icon={<InfoIcon />} />
              <NavItem href="#projects" label="Work" active={activeSection === SectionId.PROJECTS} icon={<WorkIcon />} />
              <NavItem href="#contact" label="Hire" active={activeSection === SectionId.CONTACT} icon={<MailIcon />} />
              <div className="w-px h-6 bg-foreground/10 mx-1 sm:mx-2" />
              <ThemeToggle />
            </motion.div>
          )}

          {state === 'PROJECT' && (
            <motion.div
              key="project"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center px-3 sm:px-6 gap-3 sm:gap-6 h-full min-w-[280px] sm:min-w-[400px] md:min-w-[480px] whitespace-nowrap"
            >
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-foreground/40 font-semibold leading-none mb-1">Project</span>
                <span className="text-xs sm:text-sm font-medium text-foreground leading-none truncate max-w-[100px] sm:max-w-[200px]">
                  {activeProject?.title}
                </span>
              </div>
              
              <div className="hidden md:flex items-center gap-2">
                {activeProject?.tech.slice(0, 2).map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-foreground/5 border border-foreground/10 text-[9px] text-foreground/50 font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <ThemeToggle />
                <a 
                  href={activeProject?.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="View live project"
                  className="flex items-center gap-1.5 sm:gap-2 bg-foreground text-background px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <span className="hidden xs:inline">Live</span>
                  <ArrowUpRightIcon />
                </a>
              </div>
            </motion.div>
          )}

          {state === 'CONTACT' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center px-3 sm:px-5 gap-2 sm:gap-4 h-full relative"
            >
              <AnimatePresence>
                {emailCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.8 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 0, scale: 0.8 }}
                    className="absolute top-0 right-4 px-3 py-1 bg-foreground text-background text-[10px] font-bold rounded-lg shadow-xl"
                  >
                    Copied!
                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-1 sm:gap-2">
                {SOCIALS.map(social => (
                  <a 
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors text-foreground/40 hover:text-foreground"
                    title={social.name}
                  >
                    {getSocialIcon(social.id)}
                  </a>
                ))}
              </div>

              <div className="w-px h-6 bg-foreground/10" />

              <button
                onClick={handleCopyEmail}
                title="Copy email address"
                className="flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-[10px] sm:text-[11px] font-medium hover:bg-foreground/10 transition-all active:scale-95 group"
              >
                <span className="hidden sm:inline">hello@aurelius.dev</span>
                <span className="sm:hidden">Email</span>
                <AnimatePresence mode="wait" initial={false}>
                  {emailCopied ? <CheckIcon /> : <CopyIcon />}
                </AnimatePresence>
              </button>
              
              <div className="w-px h-6 bg-foreground/10 hidden sm:block" />
              <ThemeToggle />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const NavItem = ({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) => (
  <a 
    href={href}
    title={`Navigate to ${label}`}
    className={`group flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-300 relative ${active ? 'bg-foreground/10 text-foreground' : 'text-foreground/40 hover:text-foreground hover:bg-foreground/5'}`}
  >
    <div className="transition-colors scale-90 sm:scale-100">
      {icon}
    </div>
    <span className={`text-[10px] sm:text-[11px] font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${active ? 'max-w-[60px]' : 'max-w-0 group-hover:max-w-[60px]'} hidden xs:inline-block`}>
      {label}
    </span>
    {active && (
      <motion.div
        layoutId="dock-active-dot"
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground shadow-[0_0_8px_currentColor]"
      />
    )}
  </a>
);

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
const WorkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const ArrowUpRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
);
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

export default MorphingDock;