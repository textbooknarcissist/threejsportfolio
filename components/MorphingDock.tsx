
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

const MorphingDock: React.FC<MorphingDockProps> = ({ activeSection, activeProject }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mfredebel@gmail.com');
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
          damping: 32,
          layout: { duration: 0.45 }
        }}
        className="glass rounded-full pointer-events-auto shadow-2xl overflow-hidden flex items-center h-14 sm:h-16 max-w-[95vw] sm:max-w-none px-2"
      >
        <AnimatePresence mode="wait">
          {state === 'PROJECT' ? (
            <motion.div
              key="project"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center px-4 gap-4 sm:gap-8 h-full min-w-[300px] sm:min-w-[480px] whitespace-nowrap"
            >
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-[8px] uppercase tracking-[0.2em] text-foreground/40 font-bold mb-0.5">Project</span>
                <span className="text-sm font-medium text-foreground truncate max-w-[120px] sm:max-w-[200px]">
                  {activeProject?.title}
                </span>
              </div>

              <div className="hidden md:flex items-center gap-2">
                {activeProject?.tech.slice(0, 2).map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-foreground/5 border border-foreground/10 text-[9px] text-foreground/40 font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="ml-auto flex items-center gap-4">
                <ThemeToggle />
                <a
                  href={activeProject?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <span className="hidden xs:inline">Live Preview</span>
                  <ArrowUpRightIcon />
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="nav-dock"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-1 sm:gap-2 px-1 h-full"
            >
              <NavItem href="#hero" label="Home" active={activeSection === SectionId.HERO} icon={<HomeIcon />} />
              <NavItem href="#about" label="Info" active={activeSection === SectionId.ABOUT} icon={<InfoIcon />} />
              <NavItem href="#projects" label="Work" active={activeSection === SectionId.PROJECTS} icon={<WorkIcon />} />
              <NavItem href="#contact" label="Hire" active={activeSection === SectionId.CONTACT} icon={<MailIcon />} />

              {state === 'CONTACT' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 sm:gap-4 ml-2 border-l border-foreground/10 pl-2 sm:pl-4"
                >
                  <div className="hidden lg:flex items-center gap-1">
                    {SOCIALS.map(social => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-8 h-8 rounded-full flex items-center justify-center transition-colors text-foreground/40 hover:text-foreground group/social"
                        onMouseEnter={() => setHoveredSocial(social.id)}
                        onMouseLeave={() => setHoveredSocial(null)}
                      >
                        <div className="scale-75 transition-transform group-hover/social:scale-110 group-hover/social:jump-animation">
                          {getSocialIcon(social.id)}
                        </div>
                        {hoveredSocial === social.id && (
                          <motion.div
                            layoutId="social-nav-hover"
                            className="absolute inset-0 bg-foreground/5 rounded-full -z-10"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </a>
                    ))}
                  </div>

                  <motion.button
                    onClick={handleCopyEmail}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-[10px] sm:text-xs font-bold transition-all shadow-lg hover:shadow-indigo-500/20 group/email"
                  >
                    <span className="hidden sm:inline">mfredebel@gmail.com</span>
                    <span className="sm:hidden">Email</span>
                    <AnimatePresence mode="wait" initial={false}>
                      {emailCopied ? (
                        <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <CheckIcon />
                        </motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <CopyIcon />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {emailCopied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -40 }}
                        exit={{ opacity: 0, y: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[8px] font-bold rounded shadow-xl whitespace-nowrap"
                      >
                        Copied!
                        <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-foreground rotate-45" />
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              )}

              <div className="w-px h-6 bg-foreground/10 mx-1 sm:mx-2" />
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
    className={`group flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 relative ${active ? 'text-foreground' : 'text-foreground/40 hover:text-foreground'}`}
  >
    {active && (
      <motion.div
        layoutId="active-nav-pill"
        className="absolute inset-0 bg-foreground/10 rounded-full z-0"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
    <div className="relative z-10 scale-100 sm:scale-110">
      {icon}
    </div>
    <span className={`relative z-10 text-[10px] sm:text-[11px] font-bold transition-all duration-300 overflow-hidden whitespace-nowrap ${active ? 'max-w-[100px] opacity-100 ml-1.5' : 'max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-1.5'} inline-block`}>
      {label}
    </span>
    {active && (
      <motion.div
        layoutId="active-dot"
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground shadow-[0_0_8px_white]"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </a>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
);
const WorkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const ArrowUpRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
);
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

export default MorphingDock;
