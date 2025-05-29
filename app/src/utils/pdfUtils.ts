/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { Document, Page } from '@react-pdf/renderer';
import React from 'react';
import type { CoverLetterData } from '@/types/coverLetter';

// Import templates
import {
  MonogramTemplate,
  DotAccentTemplate,
  BoldHeaderTemplate,
  MinimalistTemplate,
  AccentBorderTemplate
} from '@/components/templates';

/**
 * Get the template component based on templateId
 */
export const getTemplateComponentById = (
  templateId: string,
  resumeData: any,
  content: string
) => {
  switch (templateId) {
    case 'modern':
      return React.createElement(AccentBorderTemplate, { resumeData });
    case 'classic':
      return React.createElement(BoldHeaderTemplate, { resumeData });
    case 'creative':
      return React.createElement(DotAccentTemplate, { resumeData });
    case 'monogram':
      return React.createElement(MonogramTemplate, { resumeData, content });
    case 'minimal':
    default:
      return React.createElement(MinimalistTemplate, { resumeData });
  }
};

/**
 * Generate a PDF and save it to file
 */
export const generatePdf = async (
  coverLetterData: CoverLetterData,
  content: string,
  filename: string,
  templateId: string
): Promise<void> => {
  try {
    const resumeData = coverLetterData.resumeData || {};
    const templateComponent = getTemplateComponentById(templateId, resumeData, content);
    
    const pdfDoc = React.createElement(
      Document,
      null,
      React.createElement(
        Page,
        { size: "A4" },
        templateComponent
      )
    );
    
    const blob = await pdf(pdfDoc).toBlob();
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again later.');
  }
};

/**
 * Export to PDF
 */
export const exportToPdf = async (
  coverLetterData: CoverLetterData,
  content: string,
  filename: string,
  templateId: string
): Promise<void> => {
  return await generatePdf(coverLetterData, content, filename, templateId);
};

/**
 * Export to Word (DOCX)
 * This is a simplified version - in a real app, you would convert HTML to DOCX
 * For now, we'll just save the plain text content
 */
export const exportToWord = async (
  _coverLetterData: CoverLetterData,
  content: string,
  filename: string
): Promise<void> => {
  try {
    // Create a Blob with the text content
    const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error exporting to Word:', error);
    throw new Error('Failed to export as Word document. Please try again later.');
  }
};

/**
 * Copy content to clipboard
 */
export const copyToClipboard = async (content: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(content);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw new Error('Failed to copy to clipboard. Please try again later.');
  }
};