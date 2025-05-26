import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import type { TemplateProps } from './index';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 40,
    position: 'relative',
    height: '100%',
  },
  decorativeDots: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 100,
    height: 100,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    margin: 2,
    opacity: 0.8,
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#F59E0B',
    borderBottomStyle: 'solid',
    paddingRight: 120, // Add padding to avoid decorative dots
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 1.5,
  },
  contactItem: {
    marginBottom: 4,
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
    paddingBottom: 80, // Add padding to avoid bottom decorative dots
  },
  bottomDecorative: {
    position: 'absolute',
    bottom: 20,
    right: 30, // Moved to right side instead of left
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 60,  // Made smaller
    height: 40, // Made smaller
  },
});

const DotAccentTemplate: React.FC<TemplateProps> = ({ fields, resumeData = {} }) => {
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

  // Create array for decorative dots
  const dotsArray = Array.from({ length: 25 }, (_, i) => i);
  const bottomDotsArray = Array.from({ length: 12 }, (_, i) => i); // Reduced number of dots

  return (
    <View style={styles.container}>
      {/* Decorative Dots - Top Right */}
      <View style={styles.decorativeDots}>
        {dotsArray.map((i) => (
          <View key={i} style={styles.dot}></View>
        ))}
      </View>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{email}</Text>
          <Text style={styles.contactItem}>{phone}</Text>
          {address && <Text style={styles.contactItem}>{address}</Text>}
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
      
      {/* Decorative Dots - Bottom Right */}
      <View style={styles.bottomDecorative}>
        {bottomDotsArray.map((i) => (
          <View key={i} style={styles.dot}></View>
        ))}
      </View>
    </View>
  );
};

export default DotAccentTemplate;