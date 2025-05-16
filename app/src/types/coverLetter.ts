import type { JobData } from "./job";
import type { ResumeData } from "./resume";

export interface CoverLetterData {
    content: string;
    templateId?: string;
    resumeData?: ResumeData;
    jobData?: JobData;
    lastEdited?: Date;
}

export type TemplateType = 'modern' | 'classic' | 'creative' | 'minimal';

export interface Template {
    id: string;
    name: string;
    type: TemplateType;
    previewUrl: string;
}