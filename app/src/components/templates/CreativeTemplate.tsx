// Creative template with standard colors
import React from 'react';
import type { TemplateProps } from './types';

export const CreativeTemplate: React.FC<TemplateProps> = ({ 
  coverLetterData, 
  content,
  isExport = false 
}) => {
  const { resumeData } = coverLetterData;

  const styles = isExport ? {
    container: { 
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      minHeight: '100%',
      backgroundColor: '#ffffff'
    },
    sidebar: {
      width: '200px',
      backgroundColor: '#e0e7ff', // Light indigo in hex
      padding: '24px',
      minHeight: '100%'
    },
    mainContent: {
      flex: 1,
      padding: '24px',
      color: '#000000'
    },
    name: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#4f46e5' // Indigo in hex
    },
    contact: {
      fontSize: '12px',
      marginBottom: '8px',
      color: '#374151' // Gray-700 in hex
    },
    body: {
      lineHeight: '1.6',
      color: '#000000'
    }
  } : {};

  return (
    <div 
      style={isExport ? styles.container : undefined}
      className={!isExport ? "font-sans flex" : ""}
    >
      <div 
        style={isExport ? styles.sidebar : undefined}
        className={!isExport ? "w-1/4 bg-indigo-100 p-6" : ""}
      >
        <h1 
          style={isExport ? styles.name : undefined}
          className={!isExport ? "text-xl font-bold mb-4" : ""}
        >
          {resumeData?.name || 'Your Name'}
        </h1>
        {resumeData?.email && (
          <p 
            style={isExport ? styles.contact : undefined}
            className={!isExport ? "text-sm mb-2" : ""}
          >
            {resumeData.email}
          </p>
        )}
        {resumeData?.phone && (
          <p 
            style={isExport ? styles.contact : undefined}
            className={!isExport ? "text-sm" : ""}
          >
            {resumeData.phone}
          </p>
        )}
      </div>
      
      <div 
        style={isExport ? styles.mainContent : undefined}
        className={!isExport ? "w-3/4 p-6" : ""}
      >
        <div 
          style={isExport ? { ...styles.body, whiteSpace: 'pre-line' } : undefined}
          className={!isExport ? "whitespace-pre-line" : ""}
        >
          {content}
        </div>
      </div>
    </div>
  );
};