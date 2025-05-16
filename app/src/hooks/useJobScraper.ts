import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { JobData } from '@/types/job';
import { scrapeJob } from '@/services/jobService';
import { setJob, setJobLoading, setJobError } from '@/store/slices/jobSlice';

export const useJobScraper = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const scrapeJobFromUrl = async (url: string): Promise<JobData | null> => {
        setIsLoading(true);
        setError(null);
        dispatch(setJobLoading(true));
        
        try {
        const jobData = await scrapeJob(url);
        dispatch(setJob(jobData));
        setIsLoading(false);
        return jobData;
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to scrape job posting';
        setError(errorMessage);
        dispatch(setJobError(errorMessage));
        setIsLoading(false);
        return null;
        }
    };

    return { scrapeJobFromUrl, isLoading, error };
};