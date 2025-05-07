export interface Social {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  social: Social;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrentRole: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
}

export interface ThemeOptions {
  primaryColor: string;
  fontFamily: string;
  fontSize: string;
  darkMode: boolean;
}

export type FormStep = 'personal' | 'skills' | 'experience' | 'education' | 'projects' | 'theme';