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
import { parseResume } from '@/services/resumeService';
import { toast } from 'sonner';

const ResumePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setResumeFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ResumeData | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (file: File | null) => {
    setResumeFile(file);
    setError(null);
    
    if (!file) {
      // Reset all data when file is removed
      setExtractedData(null);
      setIsExtracting(false);
      return;
    }
    
    // Perform real resume parsing using our service
    setIsExtracting(true);
    
    try {
      // Call the actual resume parsing service
      const parsedData = await parseResume(file);
      setExtractedData(parsedData);
      toast.success('Resume parsed successfully');
    } catch (err) {
      console.error('Resume parsing failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to parse resume';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleContinue = () => {
    if (extractedData) {
      dispatch(setResume(extractedData));
      navigate('/job');
    } else {
      setError('Please upload your resume to continue');
      toast.error('Please upload your resume to continue');
    }
  };

  return (
    <div className="container mx-auto py-8 px-6">
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
          className="flex items-center cursor-pointer"
        >
          Continue to Job Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResumePage;