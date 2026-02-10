
import { useState, useEffect, useCallback } from 'react';
import { SectionId, Project } from '../types';
import { PROJECTS } from '../constants';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);
  const [activeProject, setActiveProject] = useState<Project | undefined>();

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        
        if (id === SectionId.HERO) {
          setActiveSection(SectionId.HERO);
          setActiveProject(undefined);
        } else if (id === SectionId.ABOUT) {
          setActiveSection(SectionId.ABOUT);
          setActiveProject(undefined);
        } else if (id === SectionId.CONTACT) {
          setActiveSection(SectionId.CONTACT);
          setActiveProject(undefined);
        } else if (id.startsWith('project-')) {
          setActiveSection(SectionId.PROJECTS);
          const projectId = id.replace('project-', '');
          const project = PROJECTS.find(p => p.id === projectId);
          setActiveProject(project);
        }
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3, // Slightly lower threshold for better reactivity
    });

    const sections = [
      document.getElementById(SectionId.HERO),
      document.getElementById(SectionId.ABOUT),
      document.getElementById(SectionId.CONTACT),
      ...PROJECTS.map(p => document.getElementById(`project-${p.id}`))
    ];

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [observerCallback]);

  return { activeSection, activeProject };
};
