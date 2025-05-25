import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import type { TemplateProps } from './index';

// Create styles
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
    marginBottom: 10,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 8,
  },
  contactItem: {
    fontSize: 11,
    color: '#6B7280',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    minWidth: '45%',
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

const MonogramTemplate: React.FC<TemplateProps> = ({ resumeData = {}, content = '' }) => {
  const name = resumeData?.name || 'John Doe';
  const email = resumeData?.email || 'john.doe@example.com';
  const phone = resumeData?.phone || '(123) 456-7890';
  
  // Create monogram from name
  const getMonogram = (fullName: string) => {
    const names = fullName.split(' ').filter(n => n.length > 0);
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

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
      {/* Left Sidebar with Monogram */}
      <View style={styles.sidebar}>
        {/* Monogram Circle */}
        <View style={styles.monogramCircle}>
          <Text style={styles.monogramText}>{getMonogram(name)}</Text>
        </View>
        
        {/* Vertical Text */}
        {/* <View style={styles.verticalTextContainer}>
          <Text style={styles.verticalText}>COVER LETTER</Text>
        </View> */}
      </View>
      
      {/* Right Column - Main Content */}
      <View style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <Text>{email}</Text>
            </View>
            <View style={styles.contactItem}>
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

export default MonogramTemplate;