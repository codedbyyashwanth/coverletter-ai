import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { selectCurrentCoverLetter, selectSelectedTemplateId } from '@/store/slices/coverLetterSlice';
import { Download, Copy, FileText, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { exportToPdf, exportToWord, copyToClipboard, exportToPdfAlternative } from '@/utils/exportUtils';

export const ExportOptions: React.FC = () => {
  const currentCoverLetter = useSelector(selectCurrentCoverLetter);
  const selectedTemplateId = useSelector(selectSelectedTemplateId);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!currentCoverLetter) {
    return null;
  }


const handleExportPDF = async () => {
  if (!currentCoverLetter) return;
  
  setIsExportingPdf(true);
  try {
    // Try the alternative direct PDF generation method
    await exportToPdfAlternative(currentCoverLetter, selectedTemplateId || 'modern', 'cover-letter.pdf');
    toast.success('Cover letter exported as PDF');
  } catch (error) {
    console.error('Error exporting PDF:', error);
    toast.error('Failed to export as PDF');
  } finally {
    setIsExportingPdf(false);
  }
};

  const handleExportWord = async () => {
    if (!currentCoverLetter) return;
    
    setIsExportingWord(true);
    try {
      // Export the cover letter to Word document
      await exportToWord(currentCoverLetter, 'cover-letter.docx');
      toast.success('Cover letter exported as Word document');
    } catch (error) {
      console.error('Error exporting Word:', error);
      toast.error('Failed to export as Word document');
    } finally {
      setIsExportingWord(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!currentCoverLetter?.content) return;
    
    try {
      await copyToClipboard(currentCoverLetter.content);
      setIsCopied(true);
      toast.success('Cover letter copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Card className="p-6 shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Export Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={handleExportPDF}
          disabled={isExportingPdf || !currentCoverLetter}
          className="flex items-center justify-center"
        >
          {isExportingPdf ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </>
          )}
        </Button>
        
        <Button
          onClick={handleExportWord}
          disabled={isExportingWord || !currentCoverLetter}
          variant="outline"
          className="flex items-center justify-center"
        >
          {isExportingWord ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Export as Word
            </>
          )}
        </Button>
        
        <Button
          onClick={handleCopyToClipboard}
          disabled={!currentCoverLetter}
          variant="outline"
          className="flex items-center justify-center"
        >
          <Copy className="mr-2 h-4 w-4" />
          {isCopied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
      </div>
      
      <p className="mt-6 text-sm text-gray-600">
        Tip: Customize your cover letter before exporting for the best results.
        The {selectedTemplateId} template will be used for export.
      </p>
    </Card>
  );
};