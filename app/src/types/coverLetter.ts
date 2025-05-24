// Updated to ensure templateId is always included
import type { JobData } from "./job";
import type { ResumeData } from "./resume";

export interface CoverLetterData {
    content: string;
    templateId: string;  // Made required
    resumeData?: ResumeData;
    jobData?: JobData;
    lastEdited?: Date;
}

export type TemplateType = 'modern' | 'classic' | 'creative' | 'minimal' | 'monogram';

export interface Template {
    id: string;
    name: string;
    type: TemplateType;
    previewUrl: string;
}