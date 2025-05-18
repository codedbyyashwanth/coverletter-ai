import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import type { CoverLetterData } from '@/types/coverLetter';

/**
 * Export cover letter as PDF
 */

export const exportToPdf = async (elementId: string, fileName: string = 'cover-letter.pdf'): Promise<void> => {
  try {
    // Try multiple ways to find the element
    let element = document.getElementById(elementId);
    
    // If not found by ID, try data attribute
    if (!element) {
      element = document.querySelector(`[data-preview-id="${elementId}"]`);
    }
    
    // As a last resort, try to find by class
    if (!element) {
      element = document.querySelector('.cover-letter-preview');
    }
    
    if (!element) {
      console.error('Cover letter element not found. Searched for:', elementId);
      throw new Error('Cover letter element not found. Make sure the preview is visible.');
    }
    
    // Give DOM time to fully render
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: true, // Enable logging to debug
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Make sure the cloned element is visible
        const clonedElement = clonedDoc.getElementById(elementId) || 
                             clonedDoc.querySelector(`[data-preview-id="${elementId}"]`) ||
                             clonedDoc.querySelector('.cover-letter-preview');
        
        if (clonedElement) {
          clonedElement.style.height = 'auto';
          clonedElement.style.overflow = 'visible';
          clonedElement.style.position = 'absolute';
          clonedElement.style.top = '0';
          clonedElement.style.left = '0';
          clonedElement.style.visibility = 'visible';
        }
        
        // Give time for styles to apply
        return new Promise(resolve => setTimeout(resolve, 500));
      }
    });
    
    // Rest of the function remains the same...
    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF in A4 format
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate image dimensions to fit A4 while maintaining aspect ratio
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(fileName);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return Promise.reject(error);
  }
};

/**
 * Format cover letter content for Word export
 */
const formatCoverLetterForDoc = (coverLetterData: CoverLetterData): string[] => {
  // Split the content into paragraphs
  const paragraphs = coverLetterData.content.split('\n\n').filter(p => p.trim() !== '');
  
  // For a Word doc, we need to add the header (name, email, phone)
  const header = [
    coverLetterData.resumeData?.name || 'Your Name',
    coverLetterData.resumeData?.email || '',
    coverLetterData.resumeData?.phone || '',
    '', // Empty line
    'Hiring Manager',
    coverLetterData.jobData?.company || 'Company Name',
    '', // Empty line
    'Dear Hiring Manager,'
  ];
  
  return [...header, ...paragraphs];
};

/**
 * Export cover letter as Word document
 */
export const exportToWord = async (coverLetterData: CoverLetterData, fileName: string = 'cover-letter.docx'): Promise<void> => {
  try {
    // Get formatted paragraphs
    const paragraphs = formatCoverLetterForDoc(coverLetterData);
    
    // Create docx document
    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs.map((text, index) => {
          // First few paragraphs are header
          if (index === 0) {
            // Name
            return new Paragraph({
              text,
              heading: HeadingLevel.HEADING_1,
              spacing: {
                after: 200
              }
            });
          } else if (index < 3 && index > 0) {
            // Contact info
            return new Paragraph({
              children: [new TextRun(text)],
              spacing: {
                after: 100
              }
            });
          } else if (index === 4 || index === 5) {
            // Company info
            return new Paragraph({
              children: [new TextRun(text)],
              spacing: {
                after: 100
              }
            });
          } else if (index === 7) {
            // Greeting
            return new Paragraph({
              children: [new TextRun(text)],
              spacing: {
                after: 400
              }
            });
          } else if (index === paragraphs.length - 1) {
            // Closing
            return new Paragraph({
              children: [new TextRun(text)],
              spacing: {
                before: 400
              }
            });
          } else {
            // Normal paragraph
            return new Paragraph({
              children: [new TextRun(text)],
              spacing: {
                after: 200
              }
            });
          }
        })
      }]
    });
    
    // Generate the document
    const blob = await Packer.toBlob(doc);
    saveAs(blob, fileName);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error exporting to Word:', error);
    return Promise.reject(error);
  }
};

export const exportToPdfAlternative = async (coverLetterData: CoverLetterData, templateId: string, fileName: string = 'cover-letter.pdf'): Promise<void> => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Generate HTML content programmatically instead of capturing from DOM
    const content = coverLetterData.content;
    const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
    
    // Add header info
    const name = coverLetterData.resumeData?.name || 'Your Name';
    pdf.setFontSize(18);
    pdf.text(name, 20, 20);
    
    pdf.setFontSize(10);
    if (coverLetterData.resumeData?.email) {
      pdf.text(coverLetterData.resumeData.email, 20, 30);
    }
    
    if (coverLetterData.resumeData?.phone) {
      pdf.text(coverLetterData.resumeData.phone, 20, 35);
    }
    
    // Add company info
    pdf.text('Hiring Manager', 20, 50);
    pdf.text(coverLetterData.jobData?.company || 'Company Name', 20, 55);
    
    // Add greeting
    pdf.text('Dear Hiring Manager,', 20, 70);
    
    // Add paragraphs
    let yPosition = 80;
    pdf.setFontSize(11);
    
    paragraphs.forEach(paragraph => {
      const splitText = pdf.splitTextToSize(paragraph, 170);
      pdf.text(splitText, 20, yPosition);
      yPosition += 10 * splitText.length;
    });
    
    // Add signature
    yPosition += 10;
    pdf.text('Sincerely,', 20, yPosition);
    yPosition += 10;
    pdf.text(name, 20, yPosition);
    
    pdf.save(fileName);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error creating PDF:', error);
    return Promise.reject(error);
  }
};

/**
 * Copy cover letter content to clipboard
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    return Promise.resolve();
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return Promise.reject(error);
  }
};