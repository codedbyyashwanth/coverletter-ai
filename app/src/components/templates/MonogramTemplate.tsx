import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import type { TemplateProps } from './index';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: 120,
    backgroundColor: '#312E81',
    color: '#FFFFFF',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  monogramCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4C1D95',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 20,
  },
  monogramText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  verticalTextContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  verticalText: {
    fontSize: 10,
    letterSpacing: 4,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    transform: 'rotate(-90deg)',
  },
  mainContent: {
    flex: 1,
    padding: 40,
    paddingTop: 50,
  },
  header: {
    marginBottom: 25,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 1.4,
  },
  contactLine: {
    marginBottom: 3,
  },
  date: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 20,
  },
  companyInfo: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 20,
    lineHeight: 1.4,
  },
  companyLine: {
    marginBottom: 3,
  },
  subjectLine: {
    fontSize: 11,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 15,
  },
  contentContainer: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.7,
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: 'justify',
  },
  signature: {
    fontSize: 11,
    color: '#374151',
    marginTop: 20,
  },
});

const MonogramTemplate: React.FC<TemplateProps> = ({ fields, resumeData = {} }) => {
  // Use structured fields if available, otherwise fall back to resumeData
  const name = fields?.name || resumeData?.name || 'John Doe';
  const email = fields?.email || resumeData?.email || 'john.doe@example.com';
  const phone = fields?.phone || resumeData?.phone || '(123) 456-7890';
  const address = fields?.address || '';
  
  const companyName = fields?.companyName || 'Company Name';
  const companyAddress = fields?.companyAddress || '';
  const hiringManagerName = fields?.hiringManagerName || '';
  const position = fields?.position || 'Position';
  
  const date = fields?.date || new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const subject = fields?.subject || `Application for ${position}`;
  const greeting = fields?.greeting || 'Dear Hiring Manager,';
  const content = fields?.content || '';
  const signature = fields?.signature || 'Sincerely';
  
  // Create monogram from name
  const getMonogram = (fullName: string) => {
    const names = fullName.split(' ').filter(n => n.length > 0);
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  // Split content into paragraphs
  const paragraphs = content
    .split(/\n\s*\n/) // Split by double newlines
    .filter(para => para.trim() !== '')
    .map(para => para.trim());

  return (
    <View style={styles.container}>
      {/* Left Sidebar with Monogram */}
      <View style={styles.sidebar}>
        <View style={styles.monogramCircle}>
          <Text style={styles.monogramText}>{getMonogram(name)}</Text>
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Header with contact info */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLine}>{email}</Text>
            <Text style={styles.contactLine}>{phone}</Text>
            {address && <Text style={styles.contactLine}>{address}</Text>}
          </View>
        </View>
        
        {/* Date */}
        <Text style={styles.date}>{date}</Text>
        
        {/* Company Information */}
        <View style={styles.companyInfo}>
          {hiringManagerName && <Text style={styles.companyLine}>{hiringManagerName}</Text>}
          <Text style={styles.companyLine}>{companyName}</Text>
          {companyAddress && <Text style={styles.companyLine}>{companyAddress}</Text>}
        </View>
        
        {/* Subject line */}
        <Text style={styles.subjectLine}>{subject}</Text>
        
        {/* Greeting */}
        <Text style={styles.greeting}>{greeting}</Text>
        
        {/* Content */}
        <View style={styles.contentContainer}>
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <Text key={index} style={styles.paragraph}>{paragraph}</Text>
            ))
          ) : (
            <Text style={styles.paragraph}>
              Please add your cover letter content in the editor.
            </Text>
          )}
        </View>
        
        {/* Signature */}
        <Text style={styles.signature}>
          {signature},{'\n\n'}{name}
        </Text>
      </View>
    </View>
  );
};

export default MonogramTemplate;