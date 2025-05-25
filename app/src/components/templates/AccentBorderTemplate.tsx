import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import type { TemplateProps } from './index';

// Create styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    height: '100%',
  },
  accentBorder: {
    width: 8,
    backgroundColor: '#059669',
  },
  mainContent: {
    flex: 1,
    padding: 40,
    paddingTop: 50,
  },
  header: {
    marginBottom: 35,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#059669',
    borderBottomStyle: 'solid',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#059669',
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 25,
    marginTop: 15,
  },
  contactItem: {
    fontSize: 11,
    color: '#6B7280',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    minWidth: '40%',
  },
  contactIcon: {
    fontSize: 12,
    marginRight: 8,
    color: '#059669',
  },
  dateSection: {
    marginBottom: 25,
  },
  date: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 15,
  },
  recipient: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 5,
  },
  contentContainer: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.7,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: 'justify',
  },
  signature: {
    marginTop: 25,
    fontSize: 11,
    color: '#374151',
  },
});

const AccentBorderTemplate: React.FC<TemplateProps> = ({ resumeData = {}, content = '' }) => {
  const name = resumeData?.name || 'John Doe';
  const email = resumeData?.email || 'john.doe@example.com';
  const phone = resumeData?.phone || '(123) 456-7890';

  // Process the content - split into structured sections
  let processedContent = '';
  if (content && content.trim()) {
    // Clean up the content and format it properly
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    // Find the main content (skip header info, date, company info)
    let contentStart = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (line.includes('dear') || line.includes('application') || 
          line.includes('hiring') || line.includes('position')) {
        contentStart = i;
        break;
      }
    }
    
    // Join the main content
    const mainLines = lines.slice(contentStart);
    processedContent = mainLines.join('\n\n');
  }

  // Split content into paragraphs
  const paragraphs = processedContent
    .split(/\n\n+/)
    .filter(para => para.trim() !== '')
    .map(para => para.trim());

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <View style={styles.container}>
      {/* Left Accent Border */}
      <View style={styles.accentBorder}></View>
      
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>Cover Letter</Text>
          
          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>✉</Text>
              <Text>{email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>☎</Text>
              <Text>{phone}</Text>
            </View>
          </View>
        </View>
        
        {/* Date */}
        <View style={styles.dateSection}>
          <Text style={styles.date}>{currentDate}</Text>
        </View>
        
        {/* Content */}
        <View style={styles.contentContainer}>
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <Text key={index} style={styles.paragraph}>{paragraph}</Text>
            ))
          ) : (
            <>
              <Text style={styles.paragraph}>
                Dear Hiring Manager,
              </Text>
              <Text style={styles.paragraph}>
                I am writing to express my strong interest in joining your team. 
                My background and skills align well with your requirements, and I am 
                excited about the opportunity to contribute to your organization.
              </Text>
              <Text style={styles.paragraph}>
                Thank you for your time and consideration. I look forward to hearing from you.
              </Text>
            </>
          )}
          
          <Text style={styles.signature}>
            Sincerely,{'\n'}{name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AccentBorderTemplate;