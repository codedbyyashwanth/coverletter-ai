// Fixed export utilities with proper color handling and template styling
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import type { CoverLetterData } from '@/types/coverLetter';
import ReactDOMServer from 'react-dom/server';
import {
  ModernTemplate,
  ClassicTemplate,
  CreativeTemplate,
  MinimalTemplate
} from '@/components/templates';
import React from 'react';

// Helper to get template component based on type
const getTemplateComponent = (templateType: string) => {
  switch (templateType) {
    case 'modern':
      return ModernTemplate;
    case 'classic':
      return ClassicTemplate;
    case 'creative':
      return CreativeTemplate;
    case 'minimal':
    default:
      return MinimalTemplate;
  }
};

export const exportToPdf = async (
  coverLetterData: CoverLetterData,
  editedContent: string,
  filename: string = 'cover-letter.pdf'
): Promise<void> => {
  try {
    const templateId = coverLetterData.templateId || 'modern';
    const TemplateComponent = getTemplateComponent(templateId);
    
    // Create a temporary div to render the template
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '794px'; // A4 width in pixels at 96 DPI
    tempDiv.style.minHeight = '1123px'; // A4 height in pixels at 96 DPI
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(tempDiv);

    // Render the template with export styles
    const templateHtml = ReactDOMServer.renderToString(
      React.createElement(TemplateComponent, {
        coverLetterData,
        content: editedContent,
        isExport: true
      })
    );
    
    tempDiv.innerHTML = templateHtml;

    // Wait for render to complete
    await new Promise(resolve => setTimeout(resolve, 100));

    // Convert to canvas with specific options to avoid color issues
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      useCORS: true,
      windowWidth: 794,
      windowHeight: 1123
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [794, 1123] // A4 size in pixels
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123);
    pdf.save(filename);

    // Clean up
    document.body.removeChild(tempDiv);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const exportToWord = async (
  coverLetterData: CoverLetterData,
  editedContent: string,
  filename: string = 'cover-letter.docx'
): Promise<void> => {
  try {
    const { resumeData } = coverLetterData;
    const templateId = coverLetterData.templateId || 'modern';
    const paragraphs: Paragraph[] = [];

    // Apply template-specific styling
    switch (templateId) {
      case 'modern':
        // Modern template - bold header with background
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData?.name || 'Your Name',
                bold: true,
                size: 32,
                color: '7C3AED' // Purple color
              })
            ],
            alignment: AlignmentType.LEFT,
            spacing: { after: 100 },
            shading: {
              fill: 'F3F4F6' // Light background
            }
          })
        );
        break;

      case 'classic':
        // Classic template - centered serif style
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData?.name || 'Your Name',
                bold: true,
                size: 32,
                font: 'Times New Roman'
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
          })
        );
        break;

      case 'creative':
        // Creative template - modern with accent
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData?.name || 'Your Name',
                bold: true,
                size: 28,
                color: '4F46E5' // Indigo color
              })
            ],
            alignment: AlignmentType.LEFT,
            spacing: { after: 100 },
            border: {
              left: {
                color: '4F46E5',
                space: 10,
                value: BorderStyle.SINGLE,
                size: 24
              }
            }
          })
        );
        break;

      case 'minimal':
        // Minimal template - clean with underline
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData?.name || 'Your Name',
                bold: true,
                size: 32
              })
            ],
            alignment: AlignmentType.LEFT,
            spacing: { after: 100 },
            border: {
              bottom: {
                color: '000000',
                space: 5,
                value: BorderStyle.SINGLE,
                size: 6
              }
            }
          })
        );
        break;
    }

    // Add contact info
    if (resumeData?.email || resumeData?.phone) {
      const contactInfo = [resumeData.email, resumeData.phone]
        .filter(Boolean)
        .join(' • ');
      
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: contactInfo,
              size: 20,
              color: templateId === 'minimal' ? '666666' : '000000'
            })
          ],
          alignment: templateId === 'classic' ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: { after: 400 }
        })
      );
    }

    // Parse and add content paragraphs
    const contentLines = editedContent.split('\n');
    
    contentLines.forEach(line => {
      if (line.trim()) {
        // Check if it's a bullet point
        if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line.trim().substring(1).trim(),
                  size: 24
                })
              ],
              bullet: { level: 0 },
              spacing: { after: 100 }
            })
          );
        } else {
          // Regular paragraph
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 24,
                  font: templateId === 'classic' ? 'Times New Roman' : 'Arial'
                })
              ],
              spacing: { after: 200 },
              alignment: templateId === 'classic' ? AlignmentType.JUSTIFIED : AlignmentType.LEFT
            })
          );
        }
      } else {
        // Empty line for spacing
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: ' ', size: 24 })],
            spacing: { after: 100 }
          })
        );
      }
    });

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: paragraphs
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error generating Word document:', error);
    throw error;
  }
};

export const copyToClipboard = async (content: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(content);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = content;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (err) {
      throw new Error('Failed to copy text');
    } finally {
      document.body.removeChild(textArea);
    }
  }
};