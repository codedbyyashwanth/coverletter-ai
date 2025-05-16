import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { ResumeData } from '../types/resume';
import type { JobData } from '../types/job';
import type { CoverLetterData } from '../types/coverLetter';
import { generateCoverLetter } from '../services/coverLetterService';
import {
  setCoverLetter,
  setCoverLetterLoading,
  setCoverLetterError,
} from '../store/slices/coverLetterSlice';

export const useCoverLetterGenerator = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        const coverLetterData: CoverLetterData = {
            content,
            templateId,
            resumeData,
            jobData,
            lastEdited: new Date(),
        };
        
        dispatch(setCoverLetter(coverLetterData));
        setIsLoading(false);
        return coverLetterData;
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to generate cover letter';
        setError(errorMessage);
        dispatch(setCoverLetterError(errorMessage));
        setIsLoading(false);
        return null;
        }
    };

    return { generateLetter, isLoading, error };
};