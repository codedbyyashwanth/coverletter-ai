/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useJobScraper } from '@/hooks/useJobScraper';
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from '@/components/ui/alert';
import { AlertCircle, Loader, Link as LinkIcon } from 'lucide-react';

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
        <div className="relative flex-1">
          <Input
            placeholder="Paste job posting URL here"
            value={url}
            onChange={handleUrlChange}
            className="pr-10 flex-1"
            disabled={isLoading}
          />
          {url && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <LinkIcon size={16} />
            </div>
          )}
        </div>
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
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Scraping Failed</AlertTitle>
          <AlertDescription>
            {error && error.includes('blocking') 
              ? (
                <>
                  {error} 
                  <p className="mt-2 text-sm">Common issues include:</p>
                  <ul className="list-disc ml-5 mt-1 text-sm">
                    <li>The site has anti-scraping protection</li>
                    <li>The URL structure is not supported</li>
                    <li>The job posting requires authentication</li>
                  </ul>
                </>
              ) 
              : error
            }
          </AlertDescription>
        </Alert>
      )}
      
      <p className="text-sm text-gray-500 italic">
        Tip: If scraping fails, you can manually enter the job details below.
      </p>
    </div>
  );
};