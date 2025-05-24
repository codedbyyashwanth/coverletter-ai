// src/components/CoverLetterPreview.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import type { CoverLetterData } from '@/types/coverLetter';
import { PDFViewer } from '@react-pdf/renderer';
import {
  MonogramTemplate,
  DotAccentTemplate,
  BoldHeaderTemplate,
  MinimalistTemplate,
  AccentBorderTemplate,
} from '@/components/templates';

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

  const resumeData = coverLetterData.resumeData || {};

  // Render the appropriate template as a <Document />
  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <AccentBorderTemplate resumeData={resumeData} />;
      case 'classic':
        return <BoldHeaderTemplate resumeData={resumeData} />;
      case 'creative':
        return <DotAccentTemplate resumeData={resumeData} />;
      case 'monogram':
        return <MonogramTemplate resumeData={resumeData} />;
      default:
        return <MinimalistTemplate resumeData={resumeData} />;
    }
  };

  return (
    <Card className="p-6 shadow-md h-[800px]">
      <div className="h-full">
        <PDFViewer
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px'
          }}
          showToolbar={false}
        >
          {/* Ensure renderTemplate returns a <Document /> */}
          {renderTemplate()}
        </PDFViewer>
      </div>
    </Card>
  );
};

export default CoverLetterPreview;