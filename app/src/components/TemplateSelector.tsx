import React, { useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { selectTemplates } from '@/store/slices/coverLetterSlice';
import type { Template } from '@/types/coverLetter';

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onSelect: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplateId,
  onSelect,
}) => {
  const templates = useSelector(selectTemplates);
  
  // Use useCallback to prevent unnecessary re-renders
  const handleTemplateSelect = useCallback((templateId: string) => {
    // Only trigger selection if it's actually changing
    if (templateId !== selectedTemplateId) {
      onSelect(templateId);
    }
  }, [selectedTemplateId, onSelect]);
  
  return (
    <Card className="pt-5 px-6 pb-3 shadow-md mb-6 gap-0">
      <h2 className="text-lg font-semibold">Choose a Template</h2>
      <div className="overflow-x-auto px-2">
        <div className="flex gap-6 pb-4 min-w-max px-2">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={template.id === selectedTemplateId}
              onSelect={() => handleTemplateSelect(template.id)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}

// Memoize the TemplateCard component to prevent unnecessary re-renders
const TemplateCard: React.FC<TemplateCardProps> = React.memo(({
  template,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`cursor-pointer rounded-lg transition-all flex-shrink-0 pt-6 ${
        isSelected
          ? 'scale-105'
          : 'hover:scale-105'
      }`}
      onClick={onSelect}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect();
          e.preventDefault();
        }
      }}
    >
      <div className={`w-28 h-36 relative bg-gray-100 rounded-lg shadow-sm border-3 transition-all ${
        isSelected 
          ? 'border-primary shadow-lg' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}>
        {/* Use template preview image if available, otherwise use a colored div */}
        {template.previewUrl ? (
          <img
            src={template.previewUrl}
            alt={template.name}
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center rounded-md ${getTemplateColor(template.type)}`}>
            <span className="text-white text-xs font-medium">Preview</span>
          </div>
        )}
        
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <svg 
              className="w-3 h-3 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className="py-3 text-center">
        <p className={`text-sm font-medium text-center truncate w-28 ${
          isSelected ? 'text-primary font-semibold' : 'text-gray-700'
        }`}>
          {template.name}
        </p>
      </div>
    </div>
  );
});

TemplateCard.displayName = 'TemplateCard';

// Helper function to get background color for template preview
const getTemplateColor = (templateType: string): string => {
  switch (templateType) {
    case 'modern':
      return 'bg-gradient-to-r from-purple-600 to-indigo-600';
    case 'classic':
      return 'bg-gradient-to-r from-gray-700 to-gray-900';
    case 'creative':
      return 'bg-gradient-to-r from-blue-500 to-teal-400';
    case 'monogram':
      return 'bg-gradient-to-r from-indigo-500 to-purple-600';
    case 'minimal':
    default:
      return 'bg-gradient-to-r from-gray-400 to-gray-600';
  }
};