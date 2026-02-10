
export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  PROJECTS = 'projects',
  CONTACT = 'contact'
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

export type DockState = 'DEFAULT' | 'PROJECT' | 'CONTACT';

export interface ActiveSectionContext {
  activeSection: SectionId;
  activeProject?: Project;
}
