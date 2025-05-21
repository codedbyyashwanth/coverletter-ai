import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import type { CoverLetterData } from '../types/coverLetter';

/**
 * Creates a professional cover letter PDF with left-aligned text,
 * vertically centered block and consistent spacing on a single page.
 */
export const exportToPdf = async (
  coverLetterData: CoverLetterData,
  editedContent: string | null,
  filename: string
): Promise<void> => {
  try {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);

    // Parse lines
    const content = editedContent || '';
    const rawLines = content.split('\n');
    const lines: { text: string; style?: 'bold'; isBullet?: boolean }[] = [];

    // Include subject if provided
    if (coverLetterData.subject) {
      lines.push({ text: coverLetterData.subject, style: 'bold' });
      lines.push({ text: '' });
    }

    rawLines.forEach(raw => {
      const txt = raw.trim();
      if (!txt) {
        lines.push({ text: '' });
      } else if (txt.startsWith('•')) {
        lines.push({ text: txt, isBullet: true });
      } else {
        lines.push({ text: txt });
      }
    });

    // Layout
    const lineHeight = 18;
    const totalHeight = lines.length * lineHeight;
    const startY = (pageHeight - totalHeight) / 2; // vertical centering
    const leftMargin = 60;

    let y = startY;
    for (const line of lines) {
      if (y + lineHeight > pageHeight) break;
      // Set style
      pdf.setFont('helvetica', line.style === 'bold' ? 'bold' : 'normal');
      pdf.setFontSize(12);

      if (line.isBullet) {
        // Draw bullet then text
        pdf.text('•', leftMargin, y);
        const bulletText = line.text.substring(1).trim();
        const maxWidth = pageWidth - leftMargin * 2;
        const wrapped = pdf.splitTextToSize(bulletText, maxWidth - 15);
        pdf.text(wrapped, leftMargin + 15, y);
        y += lineHeight * wrapped.length;
      } else {
        // Regular text with wrap
        const maxWidth = pageWidth - leftMargin * 2;
        const wrapped = pdf.splitTextToSize(line.text, maxWidth);
        pdf.text(wrapped, leftMargin, y);
        y += lineHeight * wrapped.length;
      }
      y += 4; // small extra spacing
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};

/**
 * Exports cover letter to Word document with professional styling.
 * (No horizontal centering applied here.)
 */
export const exportToWord = async (
  coverLetterData: CoverLetterData,
  editedContent: string | null,
  filename: string
): Promise<void> => {
  try {
    const content = editedContent || '';
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Cover Letter</title>
        <style>
          body { font-family: 'Calibri', Arial, sans-serif; margin: 1in; line-height: 1.15; font-size: 11pt; }
          .content { margin-top: 1em; }
          .bullet-list { padding-left: 1.5em; }
          .bullet-item { margin-bottom: 0.5em; }
        </style>
      </head>
      <body>
        ${coverLetterData.subject ? `<h2>${coverLetterData.subject}</h2>` : ''}
        <div class="content">
          ${formatWordDocument(content)}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/msword' });
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error exporting Word document:', error);
    throw error;
  }
};

function formatWordDocument(content: string): string {
  const lines = content.split('\n');
  let html = '';
  let inList = false;
  lines.forEach(raw => {
    const text = raw.trim();
    if (!text) {
      if (inList) { html += '</ul>'; inList = false; }
      html += '<p>&nbsp;</p>';
    } else if (text.startsWith('•')) {
      if (!inList) { html += '<ul class="bullet-list">'; inList = true; }
      html += `<li class="bullet-item">${text.substring(1).trim()}</li>`;
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<p>${text}</p>`;
    }
  });
  if (inList) html += '</ul>';
  return html;
}

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw error;
  }
};