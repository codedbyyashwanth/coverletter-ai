import type { CoverLetterData } from '@/types/coverLetter';

// Function to render template as HTML string for export
const renderTemplateForExport = (
  coverLetterData: CoverLetterData,
  templateId: string,
  content: string
): string => {
  const { resumeData } = coverLetterData;
  const userName = resumeData?.name || 'Your Name';
  const userEmail = resumeData?.email || '';
  const userPhone = resumeData?.phone || '';

  // Generate template-specific HTML based on selected template
  switch (templateId) {
    case 'modern':
      return `
        <div style="font-family: Arial, sans-serif; background-color: #ffffff; margin: 0; padding: 0; width: 100%; min-height: 100vh;">
          <div style="background-color: #000000; padding: 24px; color: #ffffff; margin-bottom: 24px;">
            <h1 style="font-size: 28px; font-weight: bold; margin: 0 0 8px 0; color: #ffffff;">${userName}</h1>
            ${userEmail ? `<p style="font-size: 14px; margin: 0 0 4px 0; color: #ffffff;">${userEmail}</p>` : ''}
            ${userPhone ? `<p style="font-size: 14px; margin: 0 0 4px 0; color: #ffffff;">${userPhone}</p>` : ''}
          </div>
          <div style="padding: 24px; color: #000000; line-height: 1.6; font-size: 14px; white-space: pre-line;">
            ${content}
          </div>
        </div>
      `;

    case 'classic':
      return `
        <div style="font-family: 'Times New Roman', serif; padding: 32px; border: 1px solid #e5e5e5; background-color: #ffffff; color: #000000;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 8px 0; color: #000000;">${userName}</h1>
            <div style="display: flex; justify-content: center; gap: 16px; font-size: 14px; color: #000000;">
              ${userEmail ? `<span>${userEmail}</span>` : ''}
              ${userEmail && userPhone ? '<span>•</span>' : ''}
              ${userPhone ? `<span>${userPhone}</span>` : ''}
            </div>
          </div>
          <div style="line-height: 1.8; text-align: justify; color: #000000; white-space: pre-line;">
            ${content}
          </div>
        </div>
      `;

    case 'creative':
      return `
        <div style="font-family: Arial, sans-serif; display: flex; min-height: 100%; background-color: #ffffff;">
          <div style="width: 200px; background-color: #e0e7ff; padding: 24px; min-height: 100%;">
            <h1 style="font-size: 20px; font-weight: bold; margin: 0 0 16px 0; color: #4f46e5;">${userName}</h1>
            ${userEmail ? `<p style="font-size: 12px; margin: 0 0 8px 0; color: #374151;">${userEmail}</p>` : ''}
            ${userPhone ? `<p style="font-size: 12px; margin: 0 0 8px 0; color: #374151;">${userPhone}</p>` : ''}
          </div>
          <div style="flex: 1; padding: 24px; color: #000000; line-height: 1.6; white-space: pre-line;">
            ${content}
          </div>
        </div>
      `;

    case 'minimal':
    default:
      return `
        <div style="font-family: Arial, sans-serif; padding: 32px; max-width: 800px; margin: 0 auto; background-color: #ffffff; color: #000000;">
          <div style="border-bottom: 2px solid #000000; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 8px 0; color: #000000;">${userName}</h1>
            <div style="display: flex; gap: 16px; font-size: 12px; color: #666666;">
              ${userEmail ? `<span>${userEmail}</span>` : ''}
              ${userEmail && userPhone ? '<span>•</span>' : ''}
              ${userPhone ? `<span>${userPhone}</span>` : ''}
            </div>
          </div>
          <div style="line-height: 1.6; font-size: 14px; color: #000000; white-space: pre-line;">
            ${content}
          </div>
        </div>
      `;
  }
};

// Export as PDF using html2pdf
export const exportToPdf = async (
  coverLetterData: CoverLetterData,
  content: string,
  filename: string
): Promise<void> => {
  try {
    // Dynamic import to avoid SSR issues
    const html2pdf = (await import('html2pdf.js')).default;
    
    const templateId = coverLetterData.templateId || 'modern';
    const htmlContent = renderTemplateForExport(coverLetterData, templateId, content);
    
    // Create a temporary div with the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.width = '8.5in';
    tempDiv.style.minHeight = '11in';
    tempDiv.style.margin = '0';
    tempDiv.style.backgroundColor = '#ffffff';
    
    // Temporarily add to body for rendering
    document.body.appendChild(tempDiv);
    
    const options = {
      margin: 0.5,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait' 
      }
    };

    await html2pdf().set(options).from(tempDiv).save();
    
    // Clean up
    document.body.removeChild(tempDiv);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Failed to export as PDF. Please try a different format.');
  }
};

// Export as Word document with template formatting
export const exportToWord = async (
  coverLetterData: CoverLetterData,
  content: string,
  filename: string
): Promise<void> => {
  try {
    // Dynamic import to avoid SSR issues
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import('docx');
    
    const { resumeData } = coverLetterData;
    const templateId = coverLetterData.templateId || 'modern';
    
    // Parse the content into sections
    const lines = content.split('\n').filter(line => line.trim());
    const paragraphs: any[] = [];
    
    // Template-specific styling
    const getTemplateStyles = (templateId: string) => {
      switch (templateId) {
        case 'modern':
          return {
            nameSize: 32,
            nameColor: '000000',
            contactSize: 22,
            bodySize: 22,
            headerSpacing: 400
          };
        case 'classic':
          return {
            nameSize: 28,
            nameColor: '000000',
            contactSize: 20,
            bodySize: 24,
            headerSpacing: 600
          };
        case 'creative':
          return {
            nameSize: 26,
            nameColor: '4f46e5',
            contactSize: 20,
            bodySize: 22,
            headerSpacing: 400
          };
        case 'minimal':
        default:
          return {
            nameSize: 28,
            nameColor: '000000',
            contactSize: 20,
            bodySize: 22,
            headerSpacing: 400
          };
      }
    };

    const styles = getTemplateStyles(templateId);
    
    // Add name as header
    if (resumeData?.name) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: resumeData.name,
              bold: true,
              size: styles.nameSize,
              color: styles.nameColor
            })
          ],
          heading: HeadingLevel.HEADING_1,
          alignment: templateId === 'classic' ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: { after: 200 }
        })
      );
    }
    
    // Add contact info
    const contactInfo = [];
    if (resumeData?.email) contactInfo.push(resumeData.email);
    if (resumeData?.phone) contactInfo.push(resumeData.phone);
    
    if (contactInfo.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: contactInfo.join(' • '),
              size: styles.contactSize
            })
          ],
          alignment: templateId === 'classic' ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: { after: styles.headerSpacing }
        })
      );
    }
    
    // Add content paragraphs
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip name and contact info lines that are already added
      if (resumeData?.name && line.includes(resumeData.name)) continue;
      if (resumeData?.email && line.includes(resumeData.email)) continue;
      if (resumeData?.phone && line.includes(resumeData.phone)) continue;
      
      // Handle bullet points
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${line.replace(/^[•\-*]\s*/, '')}`,
                size: styles.bodySize
              })
            ],
            spacing: { after: 120 }
          })
        );
      } else if (line.length > 0) {
        // Regular paragraph
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line,
                size: styles.bodySize
              })
            ],
            spacing: { after: 240 }
          })
        );
      }
    }
    
    // Create the document
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: '1in',
              right: '1in',
              bottom: '1in',
              left: '1in'
            }
          }
        },
        children: paragraphs
      }]
    });
    
    // Generate and download
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting Word:', error);
    throw new Error('Failed to export as Word document.');
  }
};

// Copy to clipboard
export const copyToClipboard = async (content: string): Promise<void> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw new Error('Failed to copy to clipboard.');
  }
};