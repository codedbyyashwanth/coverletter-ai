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
import { Copy, FileText } from 'lucide-react';

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

      // Get user info
      const userName = currentCoverLetter.resumeData?.name || 'Your Name';
      const userEmail = currentCoverLetter.resumeData?.email || 'your.email@example.com';
      const userPhone = currentCoverLetter.resumeData?.phone || 'your phone';
      const companyName = currentCoverLetter.jobData?.company || 'Company Name';
      const position = currentCoverLetter.jobData?.position || 'Position';
      
      // Format today's date
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
      
      // Create content blocks from the generated letter
      const contentBlocks = currentCoverLetter.content.split('\n\n');
      
      // Extract main paragraphs
      let mainContent = '';
      if (contentBlocks.length >= 3) {
        mainContent = contentBlocks.slice(0, -1).join('\n\n');
      } else {
        mainContent = currentCoverLetter.content;
      }
      
      // Create a professional template
      const professionalTemplate = `${userName}
Street Address Line
City, State ZIP
${userPhone}
${userEmail}

${companyName}
Hiring Team
Company Location

City, ${formattedDate}

Application for ${position}

Dear Hiring Team,

${mainContent}

I would welcome the opportunity to discuss how my skills and experiences can contribute to your team's success. Thank you for considering my application, and I look forward to your response.

Best regards,
${userName}`;
      
      setLocalContent(professionalTemplate);
      // Also update Redux state
      dispatch(updateEditedContent(professionalTemplate));
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

  const addBulletPoints = () => {
    // Insert bullet points at cursor position or at the end
    const textarea = document.querySelector('textarea');
    const cursorPos = textarea?.selectionStart || localContent.length;
    
    const bulletTemplate = `
- First accomplishment or skill
- Second accomplishment or skill
- Third accomplishment or skill
`;

    const newContent = 
      localContent.substring(0, cursorPos) + 
      bulletTemplate + 
      localContent.substring(cursorPos);
    
    setLocalContent(newContent);
    dispatch(updateEditedContent(newContent));
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
            onClick={addBulletPoints}
            className="flex items-center"
          >
            <FileText className="mr-2 h-4 w-4" />
            Add Bullet Points
          </Button>
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
        className="min-h-[500px] font-mono text-sm"
      />

      <p className="mt-3 text-sm text-gray-500">
        <strong>Tip:</strong> Format your cover letter as shown in the template above. 
        Include your contact details at the top right, company details on the left, 
        and use bullet points (•) for listing accomplishments.
      </p>
    </Card>
  );
};