import React from 'react';
import { Card } from '@/components/ui/card';
import type { CoverLetterData, Template } from '@/types/coverLetter';
import { useSelector } from 'react-redux';
import { 
  selectTemplates, 
  selectEditedContent 
} from '@/store/slices/coverLetterSlice';

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
  
  return (
    <Card className="p-6 shadow-md max-h-[800px] overflow-auto">
      <div 
        id="cover-letter-preview" 
        data-preview-id="cover-letter-preview" 
        className={`cover-letter-preview ${template.type}`}
      >
        {renderTemplate(coverLetterData, template, editedContent)}
      </div>
    </Card>
  );
};

const renderTemplate = (
  coverLetterData: CoverLetterData, 
  template: Template, 
  editedContent: string | null
) => {
  // Use the editable content if we have it
  if (editedContent) {
    // Split paragraphs from the edited content to format them properly
    const paragraphs = editedContent.split('\n').filter(p => p.trim() !== '');
    
    switch (template.type) {
      case 'modern':
        return (
          <div className="font-sans">
            {/* Header stays consistent */}
            <div className="bg-violet-600 p-6 text-white mb-6">
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
            
            {/* Content area displays the edited text with preserved formatting */}
            <div className="p-6">
              <div className="whitespace-pre-line">
                {editedContent}
              </div>
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
            
            <div className="whitespace-pre-line">
              {editedContent}
            </div>
          </div>
        );
        
      case 'creative':
        return (
          <div className="font-sans">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 bg-indigo-100 p-6">
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
              <div className="w-full md:w-3/4 p-6">
                <div className="whitespace-pre-line">
                  {editedContent}
                </div>
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
            
            <div className="whitespace-pre-line">
              {editedContent}
            </div>
          </div>
        );
    }
  }
  
  // If no edited content is available, use the original content with standard formatting
  const { content } = coverLetterData;
  
  // Get today's date for the letter
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
  
  // Get company name for salutation
  const companyName = coverLetterData.jobData?.company || 'the Company';
  
  switch (template.type) {
    case 'modern':
      return (
        <div className="font-sans">
          {/* Header with user information - matched to your image */}
          <div className="bg-violet-600 p-6 text-white mb-6">
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
            {/* Date */}
            <p className="mb-4">{formattedDate}</p>
            
            {/* Recipient */}
            <p className="mb-1">Hiring Manager</p>
            <p className="mb-4">{companyName}</p>
            
            {/* Greeting */}
            <p className="mb-6">Dear Hiring Manager,</p>
            
            {/* Body Content - from backend */}
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
            
            {/* Signature */}
            <p className="mt-6 mb-2">Sincerely,</p>
            <p>{coverLetterData.resumeData?.name || 'Your Name'}</p>
          </div>
        </div>
      );
      
    case 'classic':
      return (
        <div className="font-serif p-8 border border-gray-200">
          {/* Header with user info */}
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
            {/* Date */}
            <p className="mb-4">{formattedDate}</p>
            
            {/* Recipient */}
            <p className="mb-1">Hiring Manager</p>
            <p className="mb-4">{companyName}</p>
            
            {/* Greeting */}
            <p className="mb-6">Dear Hiring Manager,</p>
            
            {/* Body Content */}
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
            
            {/* Signature */}
            <p className="mt-6 mb-2">Sincerely,</p>
            <p>{coverLetterData.resumeData?.name || 'Your Name'}</p>
          </div>
        </div>
      );
      
    case 'creative':
      return (
        <div className="font-sans">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 bg-indigo-100 p-6">
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
            <div className="w-full md:w-3/4 p-6">
              <p className="mb-4">{formattedDate}</p>
              <p className="mb-1">Hiring Manager</p>
              <p className="mb-4">{companyName}</p>
              <p className="mb-6">Dear Hiring Manager,</p>
              
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              
              <p className="mt-6 mb-2">Sincerely,</p>
              <p>{coverLetterData.resumeData?.name || 'Your Name'}</p>
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
          
          <p className="mb-4">{formattedDate}</p>
          <p className="mb-1">Hiring Manager</p>
          <p className="mb-4">{companyName}</p>
          <p className="mb-6">Dear Hiring Manager,</p>
          
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
          
          <p className="mt-6 mb-2">Sincerely,</p>
          <p>{coverLetterData.resumeData?.name || 'Your Name'}</p>
        </div>
      );
  }
};

export default CoverLetterPreview;