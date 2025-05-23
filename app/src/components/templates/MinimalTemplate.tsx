// Minimal template with standard colors
import React from 'react';
import type { TemplateProps } from './types';

export const MinimalTemplate: React.FC<TemplateProps> = ({ 
  coverLetterData, 
  content,
  isExport = false 
}) => {
  const { resumeData } = coverLetterData;

  const styles = isExport ? {
    container: { 
      fontFamily: 'Arial, sans-serif',
      padding: '32px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      color: '#000000'
    },
    header: {
      borderBottom: '2px solid #000000',
      paddingBottom: '16px',
      marginBottom: '24px'
    },
    name: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#000000'
    },
    contactRow: {
      display: 'flex',
      gap: '16px',
      fontSize: '12px',
      color: '#666666' // Gray-600 in hex
    },
    body: {
      lineHeight: '1.6',
      fontSize: '14px',
      color: '#000000'
    }
  } : {};

  return (
    <div 
      style={isExport ? styles.container : undefined}
      className={!isExport ? "font-sans p-8" : ""}
    >
      <div 
        style={isExport ? styles.header : undefined}
        className={!isExport ? "border-b-2 border-black pb-4 mb-6" : ""}
      >
        <h1 
          style={isExport ? styles.name : undefined}
          className={!isExport ? "text-2xl font-bold mb-2" : ""}
        >
          {resumeData?.name || 'Your Name'}
        </h1>
        <div 
          style={isExport ? styles.contactRow : undefined}
          className={!isExport ? "flex space-x-4 text-sm text-gray-600" : ""}
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