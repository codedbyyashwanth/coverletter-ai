import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { 
  selectCurrentCoverLetter, 
  selectEditedContent,
  selectSelectedTemplateId
} from '@/store/slices/coverLetterSlice';
import { Download, Copy, FileText, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { pdf, Document, Page } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Import templates
import MonogramTemplate from './templates/MonogramTemplate';
import DotAccentTemplate from './templates/DotAccentTemplate';
import BoldHeaderTemplate from './templates/BoldHeaderTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import AccentBorderTemplate from './templates/AccentBorderTemplate';

export const ExportOptions: React.FC = () => {
  const currentCoverLetter = useSelector(selectCurrentCoverLetter);
  const editedContent = useSelector(selectEditedContent);
  const selectedTemplateId = useSelector(selectSelectedTemplateId);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!currentCoverLetter || !editedContent) {
    return null;
  }

  const handleExportPDF = async () => {
    setIsExportingPdf(true);
    try {
      // Get template component based on selected template
      const content = editedContent || '';
      const resumeData = currentCoverLetter.resumeData || {};
      
      let TemplateComponent;
      switch (selectedTemplateId) {
        case 'modern':
          TemplateComponent = <AccentBorderTemplate resumeData={resumeData} content={content} />;
          break;
        case 'classic':
          TemplateComponent = <BoldHeaderTemplate resumeData={resumeData} content={content} />;
          break;
        case 'creative':
          TemplateComponent = <DotAccentTemplate resumeData={resumeData} content={content} />;
          break;
        case 'monogram':
          TemplateComponent = <MonogramTemplate resumeData={resumeData} content={content} />;
          break;
        case 'minimal':
        default:
          TemplateComponent = <MinimalistTemplate resumeData={resumeData} content={content} />;
          break;
      }
      
      try {
        // Create PDF document
        const doc = (
          <Document>
            <Page size="A4">
              {TemplateComponent}
            </Page>
          </Document>
        );
        
        // Generate PDF blob
        const blob = await pdf(doc).toBlob();
        
        // Save file
        saveAs(blob, 'cover-letter.pdf');
        toast.success('Cover letter exported as PDF');
      } catch (pdfError) {
        console.error('PDF generation error:', pdfError);
        
        // Fallback to text export if PDF generation fails
        const blob = new Blob([editedContent], { type: 'text/plain' });
        saveAs(blob, 'cover-letter.txt');
        toast.success('Cover letter exported as text (PDF generation failed)');
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export as PDF');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportWord = async () => {
    setIsExportingWord(true);
    try {
      // Create a blob with the text content
      const blob = new Blob([editedContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, 'cover-letter.docx');
      toast.success('Cover letter exported as Word document');
    } catch (error) {
      console.error('Error exporting Word:', error);
      toast.error('Failed to export as Word document');
    } finally {
      setIsExportingWord(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editedContent);
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
          disabled={isExportingPdf}
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
          disabled={isExportingWord}
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
          variant="outline"
          className="flex items-center justify-center"
        >
          <Copy className="mr-2 h-4 w-4" />
          {isCopied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
      </div>
      
      <p className="mt-6 text-sm text-gray-600">
        Your exported document will use the selected template with professional formatting.
      </p>
    </Card>
  );
};

export default ExportOptions;