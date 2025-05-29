import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { 
  selectCurrentCoverLetter, 
  selectCoverLetterFields,
  selectSelectedTemplateId
} from '@/store/slices/coverLetterSlice';
import { Download, Copy, Loader } from 'lucide-react';
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
    <div className="flex gap-3 mb-4">
      <Button
        onClick={handleExportPDF}
        disabled={isExportingPdf}
        className="flex items-center cursor-pointer"
      >
        {isExportingPdf ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </>
        )}
      </Button>
      
      <Button
        onClick={handleCopyToClipboard}
        variant="outline"
        className="flex items-center cursor-pointer"
      >
        <Copy className="mr-2 h-4 w-4" />
        {isCopied ? 'Copied!' : 'Copy Text'}
      </Button>
    </div>
  );
};

export default ExportOptions;