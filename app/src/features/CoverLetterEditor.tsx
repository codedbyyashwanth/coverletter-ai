// src/features/coverLetter/components/CoverLetterEditor.tsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCoverLetter } from '@/store/slices/coverLetterSlice';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Save, Copy } from 'lucide-react';

interface CoverLetterEditorProps {
  onSave: (content: string) => void;
}

export const CoverLetterEditor: React.FC<CoverLetterEditorProps> = ({ onSave }) => {
  const currentCoverLetter = useSelector(selectCurrentCoverLetter);
  const [content, setContent] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (currentCoverLetter?.content) {
      setContent(currentCoverLetter.content);
    }
  }, [currentCoverLetter]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    onSave(content);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!currentCoverLetter) {
    return null;
  }

  return (
    <Card className="p-6 shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Edit Your Cover Letter</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopy}
            className="flex items-center"
          >
            <Copy className="mr-2 h-4 w-4" />
            {isCopied ? 'Copied!' : 'Copy'}
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave}
            className="flex items-center"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Textarea
        value={content}
        onChange={handleContentChange}
        className="min-h-[400px] font-mono text-sm"
      />

      <p className="mt-3 text-sm text-gray-500">
        Tip: Edit the cover letter to personalize it further. You can add specific details about your interest in the company or highlight relevant achievements.
      </p>
    </Card>
  );
};