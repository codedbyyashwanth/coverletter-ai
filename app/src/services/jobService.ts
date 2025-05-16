import apiClient from './apiClient';
import type { JobData } from '@/types/job';

export const scrapeJob = async (url: string): Promise<JobData> => {
    try {
        const response = await apiClient.post('/api/scrape-job', { url });
        return response.data;
    } catch (error) {
        console.error('Error scraping job:', error);
        throw new Error('Failed to scrape job posting');
    }
};

export const getJobDetails = async (jobId: string): Promise<JobData> => {
    try {
        const response = await apiClient.get(`/api/jobs/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job details:', error);
        throw new Error('Failed to fetch job details');
    }
};

export const saveJobDetails = async (jobData: JobData): Promise<JobData> => {
    try {
        const response = await apiClient.post('/api/jobs', jobData);
        return response.data;
    } catch (error) {
        console.error('Error saving job details:', error);
        throw new Error('Failed to save job details');
    }
};