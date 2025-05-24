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
    width: '16%',
    backgroundColor: '#312E81',
    color: '#FFFFFF',
    position: 'relative',
    paddingVertical: 30,
    alignItems: 'center',
  },
  monogramCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4C1D95',
    borderWidth: 3,  // Fixed: Changed from 'border: 3'
    borderColor: '#4338CA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  monogramText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  verticalText: {
    transform: 'rotate(-90deg)',
    fontSize: 9,
    letterSpacing: 3,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 60,
  },
  mainContent: {
    width: '84%',
    padding: 30,
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactItem: {
    fontSize: 10,
    color: '#6B7280',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    width: '48%',
  },
  contentContainer: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
  },
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    borderTopWidth: 1,  // Fixed: Changed from 'borderTop: 1'
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 9,
    color: '#9CA3AF',
  },
});

const MonogramTemplate: React.FC<TemplateProps> = ({ resumeData = {}, content = '' }) => {
  const name = resumeData?.name || 'John Doe';
  const email = resumeData?.email || 'john.doe@example.com';
  const phone = resumeData?.phone || '(123) 456-7890';
  
  // Create monogram from name
  const getMonogram = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  // Process the content - ensuring we have paragraphs to display
  let paragraphs: string[] = [];
  if (content && content.trim()) {
    // Split by double newlines to get paragraphs
    paragraphs = content.split(/\n\n+/).filter(para => para.trim() !== '');
    
    // If no paragraphs were found, try splitting by single newlines
    if (paragraphs.length === 0) {
      paragraphs = content.split(/\n+/).filter(para => para.trim() !== '');
    }
    
    // If still no paragraphs, just use the whole content as one paragraph
    if (paragraphs.length === 0 && content.trim()) {
      paragraphs = [content.trim()];
    }
  }

  console.log('Content paragraphs:', paragraphs); // Debug output

  return (
    <View style={styles.container}>
      {/* Left Sidebar with Monogram */}
      <View style={styles.sidebar}>
        {/* Monogram Circle */}
        <View style={styles.monogramCircle}>
          <Text style={styles.monogramText}>{getMonogram(name)}</Text>
        </View>
        
        {/* Vertical Text */}
        <Text style={styles.verticalText}>COVER LETTER</Text>
      </View>
      
      {/* Right Column - Main Content */}
      <View style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <Text>📧 {email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>📞 {phone}</Text>
            </View>
          </View>
        </View>
        
        {/* Content */}
        <View style={styles.contentContainer}>
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <Text key={index} style={styles.paragraph}>{paragraph}</Text>
            ))
          ) : (
            <Text style={styles.paragraph}>
              No content available. Please add content to your cover letter.
            </Text>
          )}
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{name} • Cover Letter</Text>
          <Text style={styles.footerText}>Page 1 of 1</Text>
        </View>
      </View>
    </View>
  );
};

export default MonogramTemplate;