import apiClient from './apiClient';
import type { ResumeData } from '@/types/resume';
import { extractTextFromFile } from '@/utils/fileExtractor';

export const parseResume = async (file: File): Promise<ResumeData> => {
  try {
    // Step 1: Extract text from the file in the browser
    const extractedText = await extractTextFromFile(file);
    
    if (!extractedText || extractedText.length < 100) {
      throw new Error('Could not extract sufficient text from the resume file');
    }
    
    // Step 2: Send the extracted text to the backend for AI processing
    const response = await apiClient.post('/api/parse-resume-text', { 
      text: extractedText 
    });
    
    // Step 3: Process the response from the backend
    const data = response.data;
    
    // Step 4: Transform to match our application's data structure
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      profile: data.profile,
      experience: data.experience,
      skills: {
        all: data.skills.all || []
      }
    };
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw new Error('Failed to parse resume. Please try a different file or format.');
  }
};