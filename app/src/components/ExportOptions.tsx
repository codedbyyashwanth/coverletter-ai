import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { 
  selectCurrentCoverLetter, 
  selectCoverLetterFields,
  selectSelectedTemplateId
} from '@/store/slices/coverLetterSlice';
import { Download, Copy, FileText, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { pdf, Document, Page } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import type { CoverLetterFields } from '@/types/coverLetter';

// Import templates
import MonogramTemplate from './templates/MonogramTemplate';
import DotAccentTemplate from './templates/DotAccentTemplate';
import BoldHeaderTemplate from './templates/BoldHeaderTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import AccentBorderTemplate from './templates/AccentBorderTemplate';

export const ExportOptions: React.FC = () => {
  const currentCoverLetter = useSelector(selectCurrentCoverLetter);
  const fields = useSelector(selectCoverLetterFields);
  const selectedTemplateId = useSelector(selectSelectedTemplateId);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!currentCoverLetter || !fields) {
    return null;
  }

  // Generate full text content from structured fields
  const generateFullTextContent = (fields: CoverLetterFields): string => {
    const sections = [];
    
    // Header
    sections.push(fields.name);
    if (fields.email) sections.push(fields.email);
    if (fields.phone) sections.push(fields.phone);
    if (fields.address) sections.push(fields.address);
    sections.push(''); // Empty line
    
    // Date
    sections.push(fields.date);
    sections.push(''); // Empty line
    
    // Company info
    if (fields.hiringManagerName) sections.push(fields.hiringManagerName);
    sections.push(fields.companyName);
    if (fields.companyAddress) sections.push(fields.companyAddress);
    sections.push(''); // Empty line
    
    // Subject
    sections.push(`Re: ${fields.subject}`);
    sections.push(''); // Empty line
    
    // Greeting
    sections.push(fields.greeting);
    sections.push(''); // Empty line
    
    // Content
    if (fields.content) {
      sections.push(fields.content);
      sections.push(''); // Empty line
    }
    
    // Signature
    sections.push(fields.signature + ',');
    sections.push('');
    sections.push(fields.name);
    
    return sections.join('\n');
  };

  const handleExportPDF = async () => {
    setIsExportingPdf(true);
    try {
      const resumeData = currentCoverLetter.resumeData || {};
      
      let TemplateComponent;
      switch (selectedTemplateId) {
        case 'modern':
          TemplateComponent = <AccentBorderTemplate fields={fields} resumeData={resumeData} />;
          break;
        case 'classic':
          TemplateComponent = <BoldHeaderTemplate fields={fields} resumeData={resumeData} />;
          break;
        case 'creative':
          TemplateComponent = <DotAccentTemplate fields={fields} resumeData={resumeData} />;
          break;
        case 'monogram':
          TemplateComponent = <MonogramTemplate fields={fields} resumeData={resumeData} />;
          break;
        case 'minimal':
        default:
          TemplateComponent = <MinimalistTemplate fields={fields} resumeData={resumeData} />;
          break;
      }
      
      try {
        const doc = (
          <Document>
            <Page size="A4">
              {TemplateComponent}
            </Page>
          </Document>
        );
        
        const blob = await pdf(doc).toBlob();
        const fileName = `${fields.name.replace(/\s+/g, '_')}_Cover_Letter.pdf`;
        saveAs(blob, fileName);
        toast.success('Cover letter exported as PDF');
      } catch (pdfError) {
        console.error('PDF generation error:', pdfError);
        
        const textContent = generateFullTextContent(fields);
        const blob = new Blob([textContent], { type: 'text/plain' });
        const fileName = `${fields.name.replace(/\s+/g, '_')}_Cover_Letter.txt`;
        saveAs(blob, fileName);
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
      const textContent = generateFullTextContent(fields);
      const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}
\\f0\\fs24 ${textContent.replace(/\n/g, '\\par ')}}`;
      
      const blob = new Blob([rtfContent], { type: 'application/rtf' });
      const fileName = `${fields.name.replace(/\s+/g, '_')}_Cover_Letter.rtf`;
      saveAs(blob, fileName);
      toast.success('Cover letter exported as RTF document (opens in Word)');
    } catch (error) {
      console.error('Error exporting Word:', error);
      const textContent = generateFullTextContent(fields);
      const blob = new Blob([textContent], { type: 'text/plain' });
      const fileName = `${fields.name.replace(/\s+/g, '_')}_Cover_Letter.txt`;
      saveAs(blob, fileName);
      toast.success('Cover letter exported as text file');
    } finally {
      setIsExportingWord(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const textContent = generateFullTextContent(fields);
      await navigator.clipboard.writeText(textContent);
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
              Export as RTF
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
      
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Export Details:</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• <strong>PDF:</strong> Professional formatted document using your selected template</li>
          <li>• <strong>RTF:</strong> Rich text format that opens in Microsoft Word</li>
          <li>• <strong>Copy:</strong> Plain text version for pasting into applications</li>
        </ul>
      </div>
    </Card>
  );
};

export default ExportOptions;