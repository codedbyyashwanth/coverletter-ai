/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentResume } from '@/store/slices/resumeSlice';
import { selectCurrentJob } from '@/store/slices/jobSlice';
import {
  selectCurrentCoverLetter,
  selectSelectedTemplateId,
  selectCoverLetterFields,
  selectCoverLetterLoading,
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
  const coverLetterFields = useSelector(selectCoverLetterFields);
  const isLoadingFromStore = useSelector(selectCoverLetterLoading);
  const { generateLetter, isLoading: isGenerating, error } = useCoverLetterGenerator();
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isChangingTemplate, setIsChangingTemplate] = useState(false);
  const [hasTriedGeneration, setHasTriedGeneration] = useState(false);

  // Redirect if no resume or job data
  useEffect(() => {
    if (!resumeData) {
      navigate('/resume');
      return;
    }
    if (!jobData) {
      navigate('/job');
      return;
    }
  }, [resumeData, jobData, navigate]);

  // Generate cover letter if needed - only once
  useEffect(() => {
    const shouldGenerate = resumeData && 
                          jobData && 
                          !currentCoverLetter && 
                          !isGenerating && 
                          !isLoadingFromStore && 
                          !hasTriedGeneration;

    if (shouldGenerate) {
      setHasTriedGeneration(true);
      
      generateLetter(resumeData, jobData, selectedTemplateId || 'modern')
        .then((result) => {
          if (result) {
            setGenerationError(null);
          } else {
            setGenerationError('Failed to generate cover letter. Please try again.');
          }
        })
        .catch((err) => {
          console.error('Generation error:', err);
          setGenerationError('Failed to generate cover letter. Please try again.');
        });
    }
  }, [resumeData, jobData, currentCoverLetter, selectedTemplateId, isGenerating, isLoadingFromStore, hasTriedGeneration, generateLetter]);

  // Handle template change with debounce to avoid PDF rendering errors
  const handleTemplateChange = useCallback((templateId: string) => {
    if (templateId !== selectedTemplateId) {
      setIsChangingTemplate(true);
      
      setTimeout(() => {
        dispatch(setSelectedTemplate(templateId));
        
        setTimeout(() => {
          setIsChangingTemplate(false);
        }, 300);
      }, 50);
    }
  }, [dispatch, selectedTemplateId]);

  const handleRegenerateLetter = async () => {
    if (resumeData && jobData) {
      setHasTriedGeneration(false); // Reset the flag
      try {
        const result = await generateLetter(resumeData, jobData, selectedTemplateId || 'modern');
        if (result) {
          setGenerationError(null);
        } else {
          setGenerationError('Failed to regenerate cover letter. Please try again.');
        }
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

  // Show loading state while generating initial cover letter
  const isLoading = isGenerating || isLoadingFromStore;
  
  if (!currentCoverLetter && isLoading) {
    return (
      <div className="container mx-auto py-8 px-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"></div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Generating Your Cover Letter</h2>
            <p className="text-gray-600">Please wait while we create your personalized cover letter...</p>
            {isLoading && (
              <p className="text-sm text-gray-500 mt-2">This usually takes 10-20 seconds</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show error state if generation failed
  if (!currentCoverLetter && (error || generationError) && hasTriedGeneration) {
    return (
      <div className="container mx-auto py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>
              {error || generationError}
            </AlertDescription>
          </Alert>
          
          <div className="flex space-x-4 justify-center">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center cursor-pointer"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Details
            </Button>
            
            <Button 
              onClick={handleRegenerateLetter}
              disabled={isLoading}
              className="flex items-center cursor-pointer"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto lg:py-8 lg:px-6 lg:w-10/12 max-w-none">
      <h1 className="text-3xl font-</div>bold mb-8 text-center">Your Cover Letter</h1>
      
      {(error || generationError) && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || generationError}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-6 flex flex-col lg:flex-row space-y-2 lg:space-y-0 items-center lg:space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBack}
              className="flex items-center cursor-pointer"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Details
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRegenerateLetter}
              disabled={isLoading}
              className="flex items-center cursor-pointer"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Regenerate Cover Letter
            </Button>
          </div>
          
          <TemplateSelector 
            selectedTemplateId={selectedTemplateId || 'modern'}
            onSelect={handleTemplateChange}
          />
          
          {coverLetterFields ? (
            <CoverLetterEditor />
          ) : (
            <div className="p-6 text-center text-gray-500">
              No cover letter data available
            </div>
          )}
        </div>
        
        <div className="h-[100vh] flex flex-col">
          <ExportOptions />
          
          <div className="flex-1">
            {isChangingTemplate ? (
              <div className="h-full flex items-center justify-center bg-gray-50 border">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  <p className="mt-4 text-gray-600">Updating template...</p>
                </div>
              </div>
            ) : (
              <CoverLetterPreview 
                coverLetterData={currentCoverLetter as CoverLetterData}
                templateId={selectedTemplateId || 'modern'}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPage;