import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import type { CoverLetterData } from '../types/coverLetter';

/**
 * Polyfill for oklch color parsing - replaces oklch colors with safe fallbacks
 */
const originalParseColor = window.CSS?.supports 
  ? window.CSS.supports.bind(window.CSS) 
  : () => false;

// Override the html2canvas parseColor method to handle oklch
const patchHtml2Canvas = () => {
  if (typeof window !== 'undefined' && window.html2canvas) {
    const originalParse = html2canvas.prototype.parseColor;
    html2canvas.prototype.parseColor = function(value: string) {
      // Replace oklch with safe RGB colors
      if (value.includes('oklch')) {
        // Use a safe fallback color
        return originalParse.call(this, '#000000');
      }
      return originalParse.call(this, value);
    };
  }
};

/**
 * Export cover letter to PDF using html2canvas and jsPDF
 */
export const exportToPdf = async (
  coverLetterData: CoverLetterData,
  templateId: string,
  filename: string
): Promise<void> => {
  try {
    // Find the cover letter preview element
    const element = document.getElementById('cover-letter-preview');
    if (!element) {
      throw new Error('Cover letter preview element not found');
    }

    // Patch html2canvas to handle oklch colors
    patchHtml2Canvas();

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      // Custom parse function to handle oklch colors
      onclone: (document) => {
        // Find all elements with oklch colors and replace with safe colors
        const elements = document.querySelectorAll('*');
        elements.forEach((el) => {
          const style = window.getComputedStyle(el);
          const backgroundColor = style.backgroundColor;
          const color = style.color;
          
          if (backgroundColor.includes('oklch')) {
            el.style.backgroundColor = '#ffffff';
          }
          
          if (color.includes('oklch')) {
            el.style.color = '#000000';
          }
        });
      }
    });

    // Calculate dimensions
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const imgWidth = 595; // A4 width in pixels at 72 dpi
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};

/**
 * Alternative PDF export method that doesn't rely on color parsing
 */
export const exportToPdfAlternative = async (
  coverLetterData: CoverLetterData,
  templateId: string,
  filename: string
): Promise<void> => {
  try {
    // Get the content and create a simpler version for PDF export
    const { content } = coverLetterData;
    const userName = coverLetterData.resumeData?.name || 'Your Name';
    const userEmail = coverLetterData.resumeData?.email || '';
    const userPhone = coverLetterData.resumeData?.phone || '';
    const companyName = coverLetterData.jobData?.company || 'Company Name';
    
    // Create a new PDF document
    const pdf = new jsPDF();
    
    // Add a title
    pdf.setFontSize(16);
    pdf.text('Cover Letter', 105, 15, { align: 'center' });
    
    // Add sender info
    pdf.setFontSize(12);
    pdf.text(userName, 20, 30);
    if (userEmail) pdf.text(userEmail, 20, 37);
    if (userPhone) pdf.text(userPhone, 20, 44);
    
    // Add date
    const today = new Date();
    pdf.text(today.toLocaleDateString(), 20, 55);
    
    // Add recipient
    pdf.text(`Hiring Manager`, 20, 70);
    pdf.text(companyName, 20, 77);
    
    // Add greeting
    pdf.text('Dear Hiring Manager,', 20, 90);
    
    // Add the content - split into lines to fit the page
    const splitContent = pdf.splitTextToSize(content, 170);
    pdf.text(splitContent, 20, 105);
    
    // Add signature
    const signatureY = 105 + (splitContent.length * 7) + 20;
    pdf.text('Sincerely,', 20, signatureY);
    pdf.text(userName, 20, signatureY + 10);
    
    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error with alternative PDF export:', error);
    throw error;
  }
};

/**
 * Export cover letter to Word document
 */
export const exportToWord = async (
  coverLetterData: CoverLetterData,
  filename: string
): Promise<void> => {
  try {
    const { content } = coverLetterData;
    const userName = coverLetterData.resumeData?.name || 'Your Name';
    const userEmail = coverLetterData.resumeData?.email || '';
    const userPhone = coverLetterData.resumeData?.phone || '';
    const companyName = coverLetterData.jobData?.company || 'Company Name';
    
    // Format for Word document (using HTML)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Cover Letter - ${userName}</title>
        <style>
          body { font-family: 'Calibri', sans-serif; margin: 1in; }
          .header { margin-bottom: 20px; }
          .date { margin: 20px 0; }
          .recipient { margin-bottom: 20px; }
          .greeting { margin-bottom: 20px; }
          .content { margin-bottom: 30px; line-height: 1.5; }
          .signature { margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>${userName}</div>
          ${userEmail ? `<div>${userEmail}</div>` : ''}
          ${userPhone ? `<div>${userPhone}</div>` : ''}
        </div>
        
        <div class="date">${new Date().toLocaleDateString()}</div>
        
        <div class="recipient">
          <div>Hiring Manager</div>
          <div>${companyName}</div>
        </div>
        
        <div class="greeting">Dear Hiring Manager,</div>
        
        <div class="content">${content.replace(/\n/g, '<br>')}</div>
        
        <div class="signature">
          <div>Sincerely,</div>
          <div>${userName}</div>
        </div>
      </body>
      </html>
    `;
    
    // Convert to Blob and save
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error exporting Word document:', error);
    throw error;
  }
};

/**
 * Copy cover letter text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw error;
  }
};