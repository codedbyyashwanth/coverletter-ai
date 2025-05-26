import type { JobData } from "./job";
import type { ResumeData } from "./resume";

export interface CoverLetterFields {
    // Personal Information
    name: string;
    email: string;
    phone: string;
    address?: string;
    
    // Company Information  
    companyName: string;
    companyAddress?: string;
    hiringManagerName?: string;
    position: string;
    
    // Letter Content
    date: string;
    subject: string; // New subject field
    greeting: string; // e.g., "Dear Hiring Manager" or "Dear Mr. Smith"
    content: string; // Single content field for the entire letter body
    signature: string; // e.g., "Sincerely" or "Best regards"
}

export interface CoverLetterData {
    content: string; // Generated full content (for backwards compatibility)
    fields: CoverLetterFields; // Structured fields
    templateId: string;
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