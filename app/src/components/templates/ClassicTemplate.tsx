// Classic template with standard colors
import React from 'react';
import type { TemplateProps } from './types';

export const ClassicTemplate: React.FC<TemplateProps> = ({ 
  coverLetterData, 
  content,
  isExport = false 
}) => {
  const { resumeData } = coverLetterData;

  const styles = isExport ? {
    container: { 
      fontFamily: 'Times New Roman, serif',
      padding: '32px',
      border: '1px solid #e5e5e5',
      backgroundColor: '#ffffff',
      color: '#000000'
    },
    header: { 
      textAlign: 'center' as const,
      marginBottom: '32px' 
    },
    name: { 
      fontSize: '24px', 
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#000000'
    },
    contactInfo: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      fontSize: '14px',
      color: '#000000'
    },
    body: { 
      lineHeight: '1.8',
      textAlign: 'justify' as const,
      color: '#000000'
    }
  } : {};

  return (
    <div 
      style={isExport ? styles.container : undefined}
      className={!isExport ? "font-serif p-8 border border-gray-200" : ""}
    >
      <div 
        style={isExport ? styles.header : undefined}
        className={!isExport ? "text-center mb-8" : ""}
      >
        <h1 
          style={isExport ? styles.name : undefined}
          className={!isExport ? "text-2xl font-bold mb-2" : ""}
        >
          {resumeData?.name || 'Your Name'}
        </h1>
        <div 
          style={isExport ? styles.contactInfo : undefined}
          className={!isExport ? "flex justify-center space-x-4" : ""}
        >
          {resumeData?.email && <p>{resumeData.email}</p>}
          {resumeData?.email && resumeData?.phone && <span>•</span>}
          {resumeData?.phone && <p>{resumeData.phone}</p>}
        </div>
      </div>
      
      <div 
        style={isExport ? { ...styles.body, whiteSpace: 'pre-line' } : undefined}
        className={!isExport ? "whitespace-pre-line" : ""}
      >
        {content}
      </div>
    </div>
  );
};