import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import type { CoverLetterData } from '@/types/coverLetter';
import { useSelector } from 'react-redux';
import { selectEditedContent } from '@/store/slices/coverLetterSlice';
import { Document, Page } from '@react-pdf/renderer';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Import all templates
import MonogramTemplate from './templates/MonogramTemplate';
import DotAccentTemplate from './templates/DotAccentTemplate';
import BoldHeaderTemplate from './templates/BoldHeaderTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import AccentBorderTemplate from './templates/AccentBorderTemplate';

interface CoverLetterPreviewProps {
  coverLetterData: CoverLetterData;
  templateId: string;
  isLoading?: boolean;
}

export const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  coverLetterData,
  templateId,
  isLoading = false,
}) => {
  const [renderError, setRenderError] = useState<string | null>(null);
  const [key, setKey] = useState<number>(0); // Add a key for forced re-rendering
  
  // Get the edited content from Redux store if available
  const editedContent = useSelector(selectEditedContent);
  
  // Reset error state and force re-render when template changes
  useEffect(() => {
    setRenderError(null);
    setKey(prev => prev + 1); // Force re-render on template change
  }, [templateId]);

  if (isLoading) {
    return (
      <Card className="p-6 shadow-md h-[800px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating your cover letter...</p>
        </div>
      </Card>
    );
  }
  
  if (!coverLetterData || !coverLetterData.content) {
    return (
      <Card className="p-6 shadow-md h-[800px] flex items-center justify-center">
        <p className="text-gray-500">No cover letter generated yet</p>
      </Card>
    );
  }

  if (renderError) {
    return (
      <Card className="p-6 shadow-md h-[800px]">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            Error rendering PDF preview: {renderError}
          </AlertDescription>
        </Alert>
        <div className="p-4 border rounded-md h-[700px] overflow-auto">
          <h3 className="text-lg font-bold mb-4">Cover Letter Content:</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {editedContent || coverLetterData.content || 'No content available'}
          </pre>
        </div>
      </Card>
    );
  }

  // Use edited content if available, otherwise use the original content
  const contentToRender = editedContent || coverLetterData.content || '';
  const resumeData = coverLetterData.resumeData || {};

  // Render the appropriate template
  const renderTemplate = () => {
    try {
      switch (templateId) {
        case 'modern':
          return <AccentBorderTemplate resumeData={resumeData} content={contentToRender} />;
        case 'classic':
          return <BoldHeaderTemplate resumeData={resumeData} content={contentToRender} />;
        case 'creative':
          return <DotAccentTemplate resumeData={resumeData} content={contentToRender} />;
        case 'monogram':
          return <MonogramTemplate resumeData={resumeData} content={contentToRender} />;
        case 'minimal':
        default:
          return <MinimalistTemplate resumeData={resumeData} content={contentToRender} />;
      }
    } catch (error) {
      console.error("Error rendering template:", error);
      setRenderError(error instanceof Error ? error.message : 'Unknown error');
      return null;
    }
  };

  // Use a dynamic import for the PDFViewer to prevent rendering issues
  const PDFPreview = React.lazy(() => import('./PDFPreview'));

  return (
    <Card className="p-6 shadow-md h-[800px]">
      <div className="h-full">
        <React.Suspense 
          fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }
        >
          <PDFPreview key={key}>
            <Document>
              <Page size="A4">
                {renderTemplate()}
              </Page>
            </Document>
          </PDFPreview>
        </React.Suspense>
      </div>
    </Card>
  );
};

export default CoverLetterPreview;