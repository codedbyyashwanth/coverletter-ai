// src/features/resume/pages/ResumePage.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setResume } from '@/store/slices/resumeSlice';
import { FileUpload } from '@/components/ui/FileUpload';
import { ResumePreview } from '@/components/ResumePreview';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ResumeData } from '@/types/resume';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResumePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ResumeData | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = (file: File) => {
    setResumeFile(file);
    setError(null);
    // In a real app, we would extract data from the PDF here
    // For now, we'll use a mock extraction after a delay
    setIsExtracting(true);
    
    setTimeout(() => {
      // Mock extracted data
      const mockResumeData: ResumeData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        profile: 'Experienced software engineer with expertise in React, Node.js, and TypeScript.',
        experience: [
          {
            company: 'Tech Company',
            position: 'Senior Developer',
            startDate: '2020-01',
            endDate: 'Present',
            description: [
              'Led development of a React-based dashboard',
              'Implemented RESTful APIs using Node.js',
              'Mentored junior developers'
            ]
          },
          {
            company: 'Another Tech Company',
            position: 'Web Developer',
            startDate: '2018-05',
            endDate: '2019-12',
            description: [
              'Worked on frontend with Angular',
              'Developed backend services with Express'
            ]
          }
        ],
        skills: {
          languages: ['JavaScript', 'TypeScript', 'Python'],
          frontend: ['React', 'Angular', 'HTML/CSS'],
          backend: ['Node.js', 'Express', 'MongoDB'],
          other: ['Git', 'Docker', 'AWS']
        }
      };
      
      setExtractedData(mockResumeData);
      setIsExtracting(false);
    }, 2000);
  };

  const handleContinue = () => {
    if (extractedData) {
      dispatch(setResume(extractedData));
      navigate('/job');
    } else {
      setError('Please upload your resume to continue');
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Upload Your Resume</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
          <FileUpload 
            onFileSelected={handleFileSelected}
            accept=".pdf,.doc,.docx"
            label="Upload your resume"
          />
          {error && (
            <p className="mt-4 text-sm text-red-600">{error}</p>
          )}
        </Card>
        
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
          <ResumePreview 
            resumeData={extractedData}
            isLoading={isExtracting}
          />
        </Card>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleContinue} 
          disabled={!extractedData || isExtracting}
          className="flex items-center"
        >
          Continue to Job Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResumePage;