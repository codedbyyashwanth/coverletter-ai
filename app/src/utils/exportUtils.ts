import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import type { CoverLetterData } from '../types/coverLetter';

/**
 * Creates a professional cover letter PDF with proper formatting
 */
export const exportToPdf = async (
  coverLetterData: CoverLetterData,
  editedContent: string | null,
  filename: string
): Promise<void> => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });
    
    // Set font
    pdf.setFont("helvetica");
    
    // Parse the edited content
    const content = editedContent || '';
    const lines = content.split('\n');
    
    // Set initial position and line height
    let y = 40;
    const lineHeight = 14;
    const leftMargin = 60;
    const rightColStart = 350;
    
    // Function to add a line of text
    const addLine = (text: string, x: number, currentY: number, fontStyle?: string) => {
      if (fontStyle) pdf.setFont("helvetica", fontStyle);
      else pdf.setFont("helvetica", "normal");
      
      pdf.setFontSize(11);
      pdf.text(text, x, currentY);
      return currentY + lineHeight;
    };
    
    // Determine if we should process content as blocks or individual lines
    let inContactBlock = true;
    let inCompanyBlock = false;
    let inBodyBlock = false;
    let isSubjectLine = false;
    let isDate = false;
    
    // Contact info coordinates
    const contactX = rightColStart;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines but add spacing
      if (line === '') {
        y += lineHeight;
        
        // Empty line might indicate transition between blocks
        if (inContactBlock && i > 3) {
          inContactBlock = false;
          inCompanyBlock = true;
          y = 150; // Reset position for company block
        } else if (inCompanyBlock && !inBodyBlock && i > 7) {
          inCompanyBlock = false;
          isDate = true;
        }
        continue;
      }
      
      // Process contact information (right-aligned)
      if (inContactBlock) {
        y = addLine(line, contactX, y);
        continue;
      }
      
      // Process company information (left-aligned)
      if (inCompanyBlock) {
        y = addLine(line, leftMargin, y);
        continue;
      }
      
      // Process date line (right-aligned)
      if (isDate) {
        y = addLine(line, rightColStart, y);
        isDate = false;
        isSubjectLine = true;
        y += lineHeight * 2; // Add space after date
        continue;
      }
      
      // Process subject line (bold, left-aligned)
      if (isSubjectLine) {
        y = addLine(line, leftMargin, y, "bold");
        isSubjectLine = false;
        inBodyBlock = true;
        y += lineHeight * 2; // Add space after subject
        continue;
      }
      
      // Process body text (with special handling for bullet points)
      if (inBodyBlock) {
        if (line.startsWith('•')) {
          // Handle bullet points with indentation
          const parts = line.split('•');
          const bulletText = parts[1] ? parts[1].trim() : '';
          
          // Split long bullet points to fit the page
          const maxWidth = pdf.internal.pageSize.width - 140;
          const bulletLines = pdf.splitTextToSize(bulletText, maxWidth);
          
          pdf.text('•', leftMargin, y);
          pdf.text(bulletLines, leftMargin + 15, y);
          
          // Move down by the height of all wrapped lines
          y += lineHeight * bulletLines.length;
        } else {
          // Regular paragraph text
          const maxWidth = pdf.internal.pageSize.width - 120;
          const textLines = pdf.splitTextToSize(line, maxWidth);
          
          pdf.text(textLines, leftMargin, y);
          y += lineHeight * textLines.length;
        }
        
        // Add space after paragraphs
        y += lineHeight * 0.5;
      }
    }
    
    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};

/**
 * Export cover letter to Word document with professional formatting
 */
export const exportToWord = async (
  coverLetterData: CoverLetterData,
  editedContent: string | null,
  filename: string
): Promise<void> => {
  try {
    // Use edited content directly
    const content = editedContent || '';
    
    // Format for Word document (using HTML with professional styling)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Cover Letter</title>
        <style>
          body {
            font-family: 'Calibri', Arial, sans-serif;
            margin: 1in;
            line-height: 1.15;
            font-size: 11pt;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.5em;
          }
          .contact-info {
            text-align: right;
          }
          .recipient {
            margin-bottom: 1em;
          }
          .date {
            text-align: right;
            margin: 2em 0;
          }
          .subject {
            font-weight: bold;
            margin-bottom: 1.5em;
          }
          .content {
            margin-bottom: 1.5em;
          }
          .bullets {
            padding-left: 1.5em;
          }
          .bullet-point {
            margin-bottom: 0.5em;
          }
          .signature {
            margin-top: 2em;
          }
        </style>
      </head>
      <body>
        <div class="document">
          ${formatWordDocument(content)}
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
 * Helper function to format content for Word export
 */
function formatWordDocument(content: string): string {
  const lines = content.split('\n');
  let html = '';
  
  let inContactBlock = true;
  let inCompanyBlock = false;
  let inBodyBlock = false;
  let isSubjectLine = false;
  let isDate = false;
  
  let contactHtml = '<div class="contact-info">';
  let companyHtml = '<div class="recipient">';
  let contentHtml = '<div class="content">';
  let dateHtml = '';
  let subjectHtml = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (line === '') {
      // Empty line might indicate transition between blocks
      if (inContactBlock && i > 3) {
        inContactBlock = false;
        inCompanyBlock = true;
      } else if (inCompanyBlock && !inBodyBlock && i > 7) {
        inCompanyBlock = false;
        isDate = true;
      }
      continue;
    }
    
    // Process contact information
    if (inContactBlock) {
      contactHtml += `${line}<br>`;
      continue;
    }
    
    // Process company information
    if (inCompanyBlock) {
      companyHtml += `${line}<br>`;
      continue;
    }
    
    // Process date line
    if (isDate) {
      dateHtml = `<div class="date">${line}</div>`;
      isDate = false;
      isSubjectLine = true;
      continue;
    }
    
    // Process subject line
    if (isSubjectLine) {
      subjectHtml = `<div class="subject">${line}</div>`;
      isSubjectLine = false;
      inBodyBlock = true;
      continue;
    }
    
    // Process body text
    if (inBodyBlock) {
      if (line.startsWith('•')) {
        // Start a bullet list if not already started
        if (!contentHtml.includes('<ul class="bullets">')) {
          contentHtml += '<ul class="bullets">';
        }
        
        // Add bullet point
        const bulletText = line.substring(1).trim();
        contentHtml += `<li class="bullet-point">${bulletText}</li>`;
      } else {
        // Close the bullet list if one was open
        if (contentHtml.includes('<ul class="bullets">') && !contentHtml.includes('</ul>')) {
          contentHtml += '</ul>';
        }
        
        // Add paragraph
        contentHtml += `<p>${line}</p>`;
      }
    }
  }
  
  // Close any open tags
  if (contentHtml.includes('<ul class="bullets">') && !contentHtml.includes('</ul>')) {
    contentHtml += '</ul>';
  }
  
  contactHtml += '</div>';
  companyHtml += '</div>';
  contentHtml += '</div>';
  
  // Combine all sections
  html = `
    <div class="header">
      ${companyHtml}
      ${contactHtml}
    </div>
    ${dateHtml}
    ${subjectHtml}
    ${contentHtml}
  `;
  
  return html;
}

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