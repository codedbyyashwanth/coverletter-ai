import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentResume } from '@/store/slices/resumeSlice';
import { selectCurrentJob } from '@/store/slices/jobSlice';
import {
  selectCurrentCoverLetter,
  selectSelectedTemplateId,
  setSelectedTemplate,
} from '@/store/slices/coverLetterSlice';
import { CoverLetterEditor } from '@/features/CoverLetterEditor';
import { CoverLetterPreview } from '@/components/CoverLetterPreview';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ExportOptions } from '@/components/ExportOptions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { CoverLetterData } from '@/types/coverLetter';
import { useCoverLetterGenerator } from '@/hooks/useCoverLetterGenerator';

const CoverLetterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resumeData = useSelector(selectCurrentResume);
  const jobData = useSelector(selectCurrentJob);
  const currentCoverLetter = useSelector(selectCurrentCoverLetter);
  const selectedTemplateId = useSelector(selectSelectedTemplateId);
  const { generateLetter, isLoading, error } = useCoverLetterGenerator();
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isChangingTemplate, setIsChangingTemplate] = useState(false);

  // Redirect if no resume or job data
  useEffect(() => {
    if (!resumeData) {
      navigate('/resume');
    } else if (!jobData) {
      navigate('/job');
    }
  }, [resumeData, jobData, navigate]);

  // Generate cover letter if needed
  useEffect(() => {
    const generateInitialLetter = async () => {
      if (resumeData && jobData && !currentCoverLetter && !isLoading) {
        try {
          await generateLetter(resumeData, jobData, selectedTemplateId || 'modern');
          setGenerationError(null);
        } catch (err) {
          setGenerationError('Failed to generate cover letter. Please try again.');
        }
      }
    };
    
    generateInitialLetter();
  }, [resumeData, jobData, currentCoverLetter, selectedTemplateId, isLoading, generateLetter]);

  // Handle template change with debounce to avoid PDF rendering errors
  const handleTemplateChange = useCallback((templateId: string) => {
    // Only proceed if it's a new template
    if (templateId !== selectedTemplateId) {
      setIsChangingTemplate(true);
      
      // Use setTimeout to allow DOM to update before changing template
      setTimeout(() => {
        dispatch(setSelectedTemplate(templateId));
        
        // Use another setTimeout to allow the template to update before showing it again
        setTimeout(() => {
          setIsChangingTemplate(false);
        }, 300);
      }, 50);
    }
  }, [dispatch, selectedTemplateId]);

  const handleRegenerateLetter = async () => {
    if (resumeData && jobData) {
      try {
        await generateLetter(resumeData, jobData, selectedTemplateId || 'modern');
        setGenerationError(null);
      } catch (err) {
        setGenerationError('Failed to regenerate cover letter. Please try again.');
      }
    }
  };

  const handleBack = () => {
    navigate('/job');
  };

  if (!resumeData || !jobData) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-6 w-10/12 max-w-none">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cover Letter</h1>
      
      {(error || generationError) && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || generationError}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="mb-6 flex space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Details
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRegenerateLetter}
              disabled={isLoading}
              className="flex items-center"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Regenerate Cover Letter
            </Button>
          </div>
          
          <TemplateSelector 
            selectedTemplateId={selectedTemplateId || 'modern'}
            onSelect={handleTemplateChange}
          />
          
          <CoverLetterEditor />
        </div>
        
        <div>
          {isChangingTemplate ? (
            <div className="h-[800px] flex items-center justify-center bg-gray-50 rounded-lg border shadow-md">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <CoverLetterPreview 
              coverLetterData={currentCoverLetter as CoverLetterData}
              templateId={selectedTemplateId || 'modern'}
              isLoading={isLoading}
            />
          )}
          
          <ExportOptions />
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPage;