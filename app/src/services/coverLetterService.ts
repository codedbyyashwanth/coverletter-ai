import apiClient from './apiClient';
import type { CoverLetterData } from '../types/coverLetter';
import type { ResumeData } from '../types/resume';
import type { JobData } from '../types/job';

export const generateCoverLetter = async (
    resumeData: ResumeData,
    jobData: JobData
    ): Promise<string> => {
    try {
        const response = await apiClient.post('/api/generate-cover-letter', {
        resume: resumeData,
        jobDescription: jobData,
        });
        return response.data.coverLetter;
    } catch (error) {
        console.error('Error generating cover letter:', error);
        throw new Error('Failed to generate cover letter');
    }
};

export const saveCoverLetter = async (coverLetter: CoverLetterData): Promise<CoverLetterData> => {
    try {
        const response = await apiClient.post('/api/cover-letters', coverLetter);
        return response.data;
    } catch (error) {
        console.error('Error saving cover letter:', error);
        throw new Error('Failed to save cover letter');
    }
};