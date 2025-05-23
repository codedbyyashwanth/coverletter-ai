// Updated to use the new template components
import React from 'react';
import { Card } from '@/components/ui/card';
import type { CoverLetterData } from '@/types/coverLetter';
import { useSelector } from 'react-redux';
import { 
  selectTemplates, 
  selectEditedContent 
} from '@/store/slices/coverLetterSlice';
import {
  ModernTemplate,
  ClassicTemplate,
  CreativeTemplate,
  MinimalTemplate
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
  const templates = useSelector(selectTemplates);
  const editedContent = useSelector(selectEditedContent);
  const template = templates.find(t => t.id === templateId) || templates[0];
  
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

  // Use edited content or original content
  const displayContent = editedContent || coverLetterData.content;
  
  return (
    <Card className="p-6 shadow-md max-h-[800px] overflow-auto">
      <div 
        id="cover-letter-preview" 
        data-preview-id="cover-letter-preview" 
        className={`cover-letter-preview ${template.type}`}
      >
        {renderTemplate(coverLetterData, template.type, displayContent)}
      </div>
    </Card>
  );
};

const renderTemplate = (
  coverLetterData: CoverLetterData, 
  templateType: string, 
  content: string
) => {
  const props = { coverLetterData, content, isExport: false };

  switch (templateType) {
    case 'modern':
      return <ModernTemplate {...props} />;
    case 'classic':
      return <ClassicTemplate {...props} />;
    case 'creative':
      return <CreativeTemplate {...props} />;
    case 'minimal':
    default:
      return <MinimalTemplate {...props} />;
  }
};

export default CoverLetterPreview;