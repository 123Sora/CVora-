export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  summary: string;
  profilePhoto?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
  bulletPoints: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  description: string;
}

export interface Volunteering {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  description: string;
  bulletPoints: string[];
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  level: string;
  category: 'Technical' | 'Soft Skills' | 'Tools';
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface SocialMedia {
  id: string;
  platform: string;
  url: string;
  username: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  volunteering: Volunteering[];
  skills: Skill[];
  languages: Language[];
  references: Reference[];
  socialMedia: SocialMedia[];
  hobbies: string[];
  projects: Project[];
}

export type CVTemplate = 'modern' | 'classic' | 'creative' | 'minimal' | 'professional' | 'executive' | 'tech' | 'academic' | 'designer' | 'corporate';