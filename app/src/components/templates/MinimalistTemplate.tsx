import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import type { TemplateProps } from './index';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
    height: '100%',
  },
  header: {
    marginBottom: 35,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  contactInfo: {
    fontSize: 11,
    color: '#6B7280',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  contactItem: {
    marginRight: 20,
  },
  date: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 25,
  },
  companyInfo: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 25,
    lineHeight: 1.4,
  },
  companyLine: {
    marginBottom: 4,
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
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    borderTopStyle: 'solid',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

const MinimalistTemplate: React.FC<TemplateProps> = ({ fields, resumeData = {} }) => {
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

  // Split content into paragraphs
  const paragraphs = content
    .split(/\n\s*\n/) // Split by double newlines
    .filter(para => para.trim() !== '')
    .map(para => para.trim());

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{email}</Text>
          <Text style={styles.contactItem}>•</Text>
          <Text style={styles.contactItem}>{phone}</Text>
          {address && (
            <>
              <Text style={styles.contactItem}>•</Text>
              <Text style={styles.contactItem}>{address}</Text>
            </>
          )}
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
  );
};

export default MinimalistTemplate;