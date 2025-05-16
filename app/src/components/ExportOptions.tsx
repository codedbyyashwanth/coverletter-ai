import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { selectCurrentCoverLetter, selectSelectedTemplateId } from '@/store/slices/coverLetterSlice';
import { Download, Copy, FileText, Loader } from 'lucide-react';

export const ExportOptions: React.FC = () => {
  const currentCoverLetter = useSelector(selectCurrentCoverLetter);
  const selectedTemplateId = useSelector(selectSelectedTemplateId);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!currentCoverLetter) {
    return null;
  }

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // In a real implementation, we would use libraries like html2canvas and jspdf
      // to convert the cover letter to a PDF
      
      // Simulating PDF generation with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulating download
      alert('PDF export would happen here in a real implementation');
      
      setIsExporting(false);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (currentCoverLetter?.content) {
      navigator.clipboard.writeText(currentCoverLetter.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleExportWord = async () => {
    setIsExporting(true);
    try {
      // In a real implementation, we would use libraries to create a .docx file
      
      // Simulating Word generation with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulating download
      alert('Word export would happen here in a real implementation');
      
      setIsExporting(false);
    } catch (error) {
      console.error('Error exporting Word document:', error);
      setIsExporting(false);
    }
  };

  return (
    <Card className="p-6 shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Export Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={handleExportPDF}
          disabled={isExporting || !currentCoverLetter}
          className="flex items-center justify-center"
        >
          {isExporting ? (
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
          disabled={isExporting || !currentCoverLetter}
          variant="outline"
          className="flex items-center justify-center"
        >
          <FileText className="mr-2 h-4 w-4" />
          Export as Word
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