import { pdf, Document, Page } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import React from 'react';
import type { CoverLetterData } from '@/types/coverLetter';
import {
  MonogramTemplate,
  DotAccentTemplate,
  BoldHeaderTemplate,
  MinimalistTemplate,
  AccentBorderTemplate,
} from '@/components/templates';

export const exportToPdf = async (
  coverLetterData: CoverLetterData,
  _content: string,
  filename: string = 'cover-letter.pdf',
  templateId: string = 'minimal'
): Promise<void> => {
  try {
    const resumeData = coverLetterData.resumeData || {};
    
    // Create the document based on template ID
    let TemplateComponent;

    switch (templateId) {
      case 'modern':
        TemplateComponent = AccentBorderTemplate;
        break;
      case 'classic':
        TemplateComponent = BoldHeaderTemplate;
        break;
      case 'creative':
        TemplateComponent = DotAccentTemplate;
        break;
      case 'monogram':
        TemplateComponent = MonogramTemplate;
        break;
      default:
        TemplateComponent = MinimalistTemplate;
        break;
    }

    // Wrap the template in a Document and Page for @react-pdf/renderer
    const documentElement = React.createElement(
      Document,
      null,
      React.createElement(
        Page,
        null,
        React.createElement(TemplateComponent, { resumeData })
      )
    );

    // Generate PDF blob
    const blob = await pdf(documentElement).toBlob();
    
    // Save the file
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const copyToClipboard = async (content: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(content);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw new Error('Failed to copy to clipboard');
  }
};

export const exportToWord = async (
  _coverLetterData: CoverLetterData,
  content: string,
  filename: string = 'cover-letter.txt'
): Promise<void> => {
  try {
    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8'
    });
    
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error exporting as text:', error);
    throw new Error('Failed to export file');
  }
};