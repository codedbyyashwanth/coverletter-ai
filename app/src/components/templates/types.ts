// Shared types for all templates
import type { CoverLetterData } from '@/types/coverLetter';

export interface TemplateProps {
  coverLetterData: CoverLetterData;
  content: string;
  isExport?: boolean;
}