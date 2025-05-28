import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { ResumeData } from '../types/resume';
import type { JobData } from '../types/job';
import type { CoverLetterData, CoverLetterFields } from '../types/coverLetter';
import { generateCoverLetter } from '../services/coverLetterService';
import {
  setCoverLetter,
  setCoverLetterLoading,
  setCoverLetterError,
} from '@/store/slices/coverLetterSlice';

export const useCoverLetterGenerator = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createFieldsFromData = (content: string, resumeData: ResumeData, jobData: JobData): CoverLetterFields => {
        // Get current date
        const currentDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Simple approach - just use the generated content as-is
        return {
            name: resumeData.name || 'Your Name',
            email: resumeData.email || 'your.email@example.com',
            phone: resumeData.phone || 'Your Phone',
            address: '',
            companyName: jobData.company || 'Company Name',
            companyAddress: '',
            hiringManagerName: '',
            position: jobData.position || 'Position',
            date: currentDate,
            subject: `Application for ${jobData.position || 'Position'}`,
            greeting: 'Dear Hiring Manager,',
            content: content || 'Please add your cover letter content here.',
            signature: 'Sincerely'
        };
    };

    const generateLetter = async (
        resumeData: ResumeData,
        jobData: JobData,
        templateId: string
    ): Promise<CoverLetterData | null> => {
        setIsLoading(true);
        setError(null);
        dispatch(setCoverLetterLoading(true));
        
        try {
            
            const content = await generateCoverLetter(resumeData, jobData);
            const fields = createFieldsFromData(content, resumeData, jobData);
            
            const coverLetterData: CoverLetterData = {
                content,
                fields,
                templateId,
                resumeData,
                jobData,
                lastEdited: new Date(),
            };
            
            dispatch(setCoverLetter(coverLetterData));
            dispatch(setCoverLetterLoading(false));
            setIsLoading(false);
            
            return coverLetterData;
        } catch (err) {
            console.error('Error generating cover letter:', err); // Debug log
            const errorMessage = err instanceof Error ? err.message : 'Failed to generate cover letter';
            setError(errorMessage);
            dispatch(setCoverLetterError(errorMessage));
            dispatch(setCoverLetterLoading(false));
            setIsLoading(false);
            return null;
        }
    };

    return { generateLetter, isLoading, error };
};