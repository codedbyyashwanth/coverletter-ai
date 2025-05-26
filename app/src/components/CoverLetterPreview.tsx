import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import type { CoverLetterData } from '@/types/coverLetter';
import { useSelector } from 'react-redux';
import { selectCoverLetterFields } from '@/store/slices/coverLetterSlice';
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
  const [key, setKey] = useState<number>(0);
  
  // Get the current fields from Redux store for real-time updates
  const currentFields = useSelector(selectCoverLetterFields);
  
  // Reset error state and force re-render when template or fields change
  useEffect(() => {
    setRenderError(null);
    setKey(prev => prev + 1);
  }, [templateId, currentFields]);

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
  
  if (!coverLetterData || !currentFields) {
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
          <h3 className="text-lg font-bold mb-4">Cover Letter Preview:</h3>
          <div className="space-y-4 text-sm">
            <div><strong>Name:</strong> {currentFields.name}</div>
            <div><strong>Email:</strong> {currentFields.email}</div>
            <div><strong>Phone:</strong> {currentFields.phone}</div>
            <div><strong>Company:</strong> {currentFields.companyName}</div>
            <div><strong>Position:</strong> {currentFields.position}</div>
            <div><strong>Date:</strong> {currentFields.date}</div>
            <div><strong>Greeting:</strong> {currentFields.greeting}</div>
            <div><strong>Opening:</strong> {currentFields.openingParagraph}</div>
            {currentFields.bodyParagraphs.map((para, index) => (
              <div key={index}><strong>Body {index + 1}:</strong> {para}</div>
            ))}
            <div><strong>Closing:</strong> {currentFields.closingParagraph}</div>
            <div><strong>Signature:</strong> {currentFields.signature}</div>
          </div>
        </div>
      </Card>
    );
  }

  // Use current fields for real-time updates
  const fieldsToUse = currentFields;
  const resumeData = coverLetterData.resumeData || {};

  // Render the appropriate template
  const renderTemplate = () => {
    try {
      const commonProps = {
        fields: fieldsToUse,
        resumeData: resumeData,
      };

      switch (templateId) {
        case 'modern':
          return <AccentBorderTemplate {...commonProps} />;
        case 'classic':
          return <BoldHeaderTemplate {...commonProps} />;
        case 'creative':
          return <DotAccentTemplate {...commonProps} />;
        case 'monogram':
          return <MonogramTemplate {...commonProps} />;
        case 'minimal':
        default:
          return <MinimalistTemplate {...commonProps} />;
      }
    } catch (error) {
      console.error("Error rendering template:", error);
      setRenderError(error instanceof Error ? error.message : 'Unknown error');
      return null;
    }
  };

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