import React from 'react';
import { Card } from '@/components/ui/card';
import type { CoverLetterData, Template } from '@/types/coverLetter';
import { useSelector } from 'react-redux';
import { selectTemplates } from '@/store/slices/coverLetterSlice';

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
  
  return (
    <Card className="p-6 shadow-md max-h-[800px] overflow-auto">
      <div className={`cover-letter-preview ${template.type}`}>
        {renderTemplate(coverLetterData, template)}
      </div>
    </Card>
  );
};

const renderTemplate = (coverLetterData: CoverLetterData, template: Template) => {
  const { content } = coverLetterData;
  
  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
  
  switch (template.type) {
    case 'modern':
      return (
        <div className="font-sans">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white mb-6">
            <h1 className="text-2xl font-bold">
              {coverLetterData.resumeData?.name || 'Your Name'}
            </h1>
            {coverLetterData.resumeData?.email && (
              <p>{coverLetterData.resumeData.email}</p>
            )}
            {coverLetterData.resumeData?.phone && (
              <p>{coverLetterData.resumeData.phone}</p>
            )}
          </div>
          <div className="p-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      );
      
    case 'classic':
      return (
        <div className="font-serif p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {coverLetterData.resumeData?.name || 'Your Name'}
            </h1>
            <div className="flex justify-center space-x-4">
              {coverLetterData.resumeData?.email && (
                <p>{coverLetterData.resumeData.email}</p>
              )}
              {coverLetterData.resumeData?.phone && (
                <p>{coverLetterData.resumeData.phone}</p>
              )}
            </div>
          </div>
          <div>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      );
      
    case 'creative':
      return (
        <div className="font-sans">
          <div className="flex">
            <div className="w-1/4 bg-indigo-100 p-6">
              <h1 className="text-xl font-bold mb-4">
                {coverLetterData.resumeData?.name || 'Your Name'}
              </h1>
              {coverLetterData.resumeData?.email && (
                <p className="text-sm mb-2">{coverLetterData.resumeData.email}</p>
              )}
              {coverLetterData.resumeData?.phone && (
                <p className="text-sm">{coverLetterData.resumeData.phone}</p>
              )}
            </div>
            <div className="w-3/4 p-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      );
      
    case 'minimal':
    default:
      return (
        <div className="font-sans p-8">
          <h1 className="text-2xl font-bold mb-6">
            {coverLetterData.resumeData?.name || 'Your Name'}
          </h1>
          <div className="flex space-x-4 mb-6 text-sm text-gray-600">
            {coverLetterData.resumeData?.email && (
              <p>{coverLetterData.resumeData.email}</p>
            )}
            {coverLetterData.resumeData?.phone && (
              <p>{coverLetterData.resumeData.phone}</p>
            )}
          </div>
          <div>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      );
  }
};