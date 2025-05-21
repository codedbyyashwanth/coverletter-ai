import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import type { CoverLetterData } from '../types/coverLetter';


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
    pdf.setFontSize(11);

    // Margins and spacing
    const leftMargin = 60;
    const topMargin = 60;
    const bottomMargin = 60;
    const maxWidth = pageWidth - leftMargin * 2;
    const lineHeight = 14; // fixed line height
    const paragraphGap = 7; // small gap after blank line

    // Prepare lines array
    const content = editedContent || '';
    const rawLines = content.split('\n');
    const lines: { text: string; isBullet: boolean }[] = [];

    if (coverLetterData.subject) {
      lines.push({ text: coverLetterData.subject, isBullet: false });
      lines.push({ text: '', isBullet: false });
    }
    rawLines.forEach(raw => {
      const txt = raw.trim();
      lines.push({ text: txt, isBullet: txt.startsWith('•') });
    });

    // Draw content
    let y = topMargin;
    for (const line of lines) {
      if (y > pageHeight - bottomMargin) break;
      if (!line.text) {
        // blank line
        y += paragraphGap;
        continue;
      }
      if (line.isBullet) {
        pdf.setFont('helvetica', 'normal');
        // draw bullet
        pdf.text('•', leftMargin, y);
        // wrap bullet text
        const wrapped = pdf.splitTextToSize(line.text.substring(1).trim(), maxWidth - 15);
        pdf.text(wrapped, leftMargin + 15, y);
        y += lineHeight * wrapped.length;
      } else {
        pdf.setFont('helvetica', 'normal');
        const wrapped = pdf.splitTextToSize(line.text, maxWidth);
        pdf.text(wrapped, leftMargin, y);
        y += lineHeight * wrapped.length;
      }
      // after each printed line, advance by lineHeight
      y += 0; // already moved by wrapped.length * lineHeight
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};

/**
 * Exports cover letter to Word document with professional styling.
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
          body { font-family: 'Calibri', Arial, sans-serif; margin: 1in; line-height: 1.2; font-size: 11pt; }
          .content { margin-top: 1em; }
          .bullet-list { padding-left: 1.5em; margin-bottom: 0.5em; }
          .bullet-item { margin-bottom: 0.25em; }
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
