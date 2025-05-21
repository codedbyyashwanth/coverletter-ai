import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCurrentCoverLetter, 
  selectEditedContent,
  updateEditedContent
} from '@/store/slices/coverLetterSlice';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy } from 'lucide-react';

export const CoverLetterEditor: React.FC = () => {
  const dispatch = useDispatch();
  const currentCoverLetter = useSelector(selectCurrentCoverLetter);
  const editedContent = useSelector(selectEditedContent);
  const [localContent, setLocalContent] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  // Initialize the editor content when the cover letter changes or on first load
  useEffect(() => {
    if (currentCoverLetter?.content) {
      // If we already have edited content, use that
      if (editedContent) {
        setLocalContent(editedContent);
        return;
      }

      // Otherwise, generate the full letter from scratch
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const userName = currentCoverLetter.resumeData?.name || 'Your Name';
      const userEmail = currentCoverLetter.resumeData?.email || 'your.email@example.com';
      const userPhone = currentCoverLetter.resumeData?.phone || 'your phone';
      const companyName = currentCoverLetter.jobData?.company || 'Company Name';
      const position = currentCoverLetter.jobData?.position || 'Position';
      
      // Format the full cover letter with all elements
      const fullCoverLetter = `${formattedDate}

Hiring Manager
${companyName}
${currentCoverLetter.jobData?.location || ''}

Dear Hiring Manager,

${currentCoverLetter.content}

Sincerely,

${userName}
${userEmail}
${userPhone}`;
      
      setLocalContent(fullCoverLetter);
      // Also update Redux state
      dispatch(updateEditedContent(fullCoverLetter));
    }
  }, [currentCoverLetter, editedContent, dispatch]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    // Update Redux state with the edited content to sync with preview
    dispatch(updateEditedContent(newContent));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(localContent);
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
        </div>
      </div>

      <Textarea
        value={localContent}
        onChange={handleContentChange}
        className="min-h-[400px] font-mono text-sm"
      />

      <p className="mt-3 text-sm text-gray-500">
        Tip: Edit the cover letter to personalize it further. Any changes you make will immediately appear in the preview.
      </p>
    </Card>
  );
};