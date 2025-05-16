import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentJob, setJob } from '@/store/slices/jobSlice';
import { selectCurrentResume } from '@/store/slices/resumeSlice';
import { JobUrlInput } from '../components/JobUrlInput';
import { JobDetailsForm } from '../components/JobDetailsForm';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/Alert';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { JobData } from '@/types/job';

const JobPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentJob = useSelector(selectCurrentJob);
  const resumeData = useSelector(selectCurrentResume);
  const [error, setError] = useState<string | null>(null);

  // Redirect if no resume data
  if (!resumeData) {
    navigate('/resume');
    return null;
  }

  const handleJobScraped = (success: boolean) => {
    if (success) {
      setError(null);
    }
  };

  const handleJobDetailsSubmit = (jobData: JobData) => {
    dispatch(setJob(jobData));
    navigate('/cover-letter');
  };

  const handleBack = () => {
    navigate('/resume');
  };

  const handleContinue = () => {
    if (!currentJob) {
      setError('Please enter job details to continue');
      return;
    }
    navigate('/cover-letter');
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Job Details</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Card className="p-6 shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Paste Job Posting URL</h2>
        <p className="text-gray-600 mb-4">
          Enter the URL of the job posting to automatically extract job details.
        </p>
        <JobUrlInput onJobScraped={handleJobScraped} />
      </Card>
      
      <Card className="p-6 shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Enter Job Details</h2>
        <p className="text-gray-600 mb-4">
          Enter the job details manually or edit the automatically extracted information.
        </p>
        <JobDetailsForm 
          initialJobData={currentJob}
          onSubmit={handleJobDetailsSubmit}
        />
      </Card>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleContinue}
          className="flex items-center"
        >
          Continue to Cover Letter
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default JobPage;