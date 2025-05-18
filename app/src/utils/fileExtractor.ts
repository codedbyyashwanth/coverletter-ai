import pdfToText from 'react-pdftotext';
import * as mammoth from 'mammoth';


interface PDFExtractResult {
  text: string;
  pageCount: number;
  isLoading: boolean;
  error?: string;
}

/**
 * Extract text from a PDF file
 */
export const extractTextFromPdf = async (file: File): Promise<PDFExtractResult> => {
  try {
    const extractedText = await pdfToText(file);
    
    return {
      text: extractedText,
      pageCount: 1, // This is approximate as pdfToText doesn't return page count
      isLoading: false
    };
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return {
      text: '',
      pageCount: 0,
      isLoading: false,
      error: 'Failed to extract text from PDF'
    };
  }
};

/**
 * Validate PDF file (size, type)
 */
export const validatePdfFile = (file: File): { valid: boolean; error?: string } => {
  // Check if it's a PDF
  if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
    return { valid: false, error: 'Please upload a PDF file' };
  }
  
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size should not exceed 5MB' };
  }
  
  return { valid: true };
};

/**
 * Extract text from DOCX files using mammoth
 */
export const extractTextFromDocx = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from DOCX');
  }
};

/**
 * Extract text from various file types
 */
export async function extractTextFromFile(file: File): Promise<string> {
  try {
    const fileType = file.type;
    
    // PDF files
    if (fileType === 'application/pdf' || file.name.endsWith('.pdf')) {
      // First validate the PDF
      const validation = validatePdfFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }
      
      // Then extract text
      const result = await extractTextFromPdf(file);
      if (result.error) {
        throw new Error(result.error);
      }
      
      return result.text;
    }
    
    // DOCX files
    else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
             file.name.endsWith('.docx')) {
      return await extractTextFromDocx(file);
    }
    
    // DOC files - less reliable, try to convert text
    else if (fileType === 'application/msword' || file.name.endsWith('.doc')) {
      // Basic text extraction for DOC files
      const text = await readAsText(file);
      return text;
    }
    
    throw new Error('Unsupported file type. Please upload a PDF or Word document.');
  } catch (error) {
    console.error('Error extracting text from file:', error);
    throw error;
  }
}

// Helper function to read file as text
function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}