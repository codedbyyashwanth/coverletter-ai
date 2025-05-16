import React from 'react';
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
  
  return (
    <Card className="p-6 shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={template.id === selectedTemplateId}
            onSelect={() => onSelect(template.id)}
          />
        ))}
      </div>
    </Card>
  );
};

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`cursor-pointer rounded-md overflow-hidden transition-all ${
        isSelected
          ? 'ring-2 ring-primary ring-offset-2'
          : 'hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <div className="aspect-[3/4] relative bg-gray-100">
        {/* Use template preview image if available, otherwise use a colored div */}
        {template.previewUrl ? (
          <img
            src={template.previewUrl}
            alt={template.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${getTemplateColor(template.type)}`}>
            <span className="text-white font-medium">Preview</span>
          </div>
        )}
      </div>
      <div className="py-2 px-3 bg-white border-t">
        <p className="text-sm font-medium text-center">{template.name}</p>
      </div>
    </div>
  );
};

// Helper function to get background color for template preview
const getTemplateColor = (templateType: string): string => {
  switch (templateType) {
    case 'modern':
      return 'bg-gradient-to-r from-purple-600 to-indigo-600';
    case 'classic':
      return 'bg-gradient-to-r from-gray-700 to-gray-900';
    case 'creative':
      return 'bg-gradient-to-r from-blue-500 to-teal-400';
    case 'minimal':
    default:
      return 'bg-gradient-to-r from-gray-400 to-gray-600';
  }
};