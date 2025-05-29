/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useJobScraper } from '../../hooks/useJobScraper';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader } from 'lucide-react';

interface JobUrlInputProps {
  onJobScraped: (success: boolean) => void;
}

export const JobUrlInput: React.FC<JobUrlInputProps> = ({ onJobScraped }) => {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const { scrapeJobFromUrl, isLoading, error } = useJobScraper();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setValidationError(null);
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleScrape = async () => {
    if (!url.trim()) {
      setValidationError('Please enter a job posting URL');
      return;
    }

    if (!validateUrl(url)) {
      setValidationError('Please enter a valid URL');
      return;
    }

    const jobData = await scrapeJobFromUrl(url);
    onJobScraped(!!jobData);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Paste job posting URL here"
          value={url}
          onChange={handleUrlChange}
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          onClick={handleScrape} 
          disabled={isLoading}
          className="whitespace-nowrap cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Scraping...
            </>
          ) : (
            'Extract Job Details'
          )}
        </Button>
      </div>

      {validationError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Scraping Failed</AlertTitle>
          <AlertDescription>
            {error}. Please try again or input the job details manually.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};