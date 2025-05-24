export { default as MonogramTemplate } from './MonogramTemplate';
export { default as DotAccentTemplate } from './DotAccentTemplate';
export { default as BoldHeaderTemplate } from './BoldHeaderTemplate';
export { default as MinimalistTemplate } from './MinimalistTemplate';
export { default as AccentBorderTemplate } from './AccentBorderTemplate';

export interface TemplateProps {
  resumeData?: {
    name?: string;
    email?: string;
    phone?: string;
    profile?: string;
    experience?: Array<{
      company: string;
      position: string;
      description: string[];
      startDate?: string;
      endDate?: string;
    }>;
    skills?: {
      languages?: string[];
      frontend?: string[];
      backend?: string[];
      other?: string[];
      all?: string[];
    };
  };
  content?: string;
}