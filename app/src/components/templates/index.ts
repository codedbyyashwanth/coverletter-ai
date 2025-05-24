export { default as MonogramTemplate } from './MonogramTemplate';
export { default as DotAccentTemplate } from './DotAccentTemplate';
export { default as BoldHeaderTemplate } from './BoldHeaderTemplate';
export { default as MinimalistTemplate } from './MinimalistTemplate';
export { default as AccentBorderTemplate } from './AccentBorderTemplate';

export interface TemplateProps {
  resumeData?: any;
  content?: string;
  isExport?: boolean;
}