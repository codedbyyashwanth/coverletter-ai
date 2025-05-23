// Modern template with standard colors for export compatibility
import React from 'react';
import type { TemplateProps } from './types';

export const ModernTemplate: React.FC<TemplateProps> = ({ 
  coverLetterData, 
  content,
  isExport = false 
}) => {
  const { resumeData } = coverLetterData;

  // Use standard hex colors for export to avoid oklch issues
  const styles = isExport ? {
    container: { 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      margin: 0,
      padding: 0
    },
    header: { 
      backgroundColor: '#7c3aed', // Purple color in hex
      padding: '24px', 
      color: '#ffffff',
      marginBottom: '24px'
    },
    name: { 
      fontSize: '24px', 
      fontWeight: 'bold', 
      marginBottom: '8px',
      color: '#ffffff'
    },
    contact: { 
      fontSize: '14px', 
      marginBottom: '4px',
      color: '#ffffff'
    },
    body: { 
      padding: '24px',
      color: '#000000',
      lineHeight: '1.6'
    },
    paragraph: { 
      marginBottom: '16px', 
      lineHeight: '1.6' 
    }
  } : {};

  return (
    <div style={isExport ? styles.container : undefined} className={!isExport ? "font-sans" : ""}>
      <div 
        style={isExport ? styles.header : undefined}
        className={!isExport ? "bg-violet-600 p-6 text-white mb-6" : ""}
      >
        <h1 
          style={isExport ? styles.name : undefined}
          className={!isExport ? "text-2xl font-bold" : ""}
        >
          {resumeData?.name || 'Your Name'}
        </h1>
        {resumeData?.email && (
          <p style={isExport ? styles.contact : undefined}>
            {resumeData.email}
          </p>
        )}
        {resumeData?.phone && (
          <p style={isExport ? styles.contact : undefined}>
            {resumeData.phone}
          </p>
        )}
      </div>
      
      <div 
        style={isExport ? styles.body : undefined}
        className={!isExport ? "p-6" : ""}
      >
        <div style={isExport ? { whiteSpace: 'pre-line' } : undefined} 
             className={!isExport ? "whitespace-pre-line" : ""}>
          {content}
        </div>
      </div>
    </div>
  );
};