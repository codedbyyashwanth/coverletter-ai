import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import type { TemplateProps } from './index';

// Create styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    height: '100%',
  },
  header: {
    backgroundColor: '#1E3A8A',
    color: '#FFFFFF',
    padding: 30,
  },
  headerName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 15,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  contactItem: {
    fontSize: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    marginLeft: 4,
  },
  mainContent: {
    padding: 30,
    flex: 1,
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

const BoldHeaderTemplate: React.FC<TemplateProps> = ({ resumeData = {}, content = '' }) => {
  const name = resumeData?.name || 'John Doe';
  const email = resumeData?.email || 'john.doe@example.com';
  const phone = resumeData?.phone || '(123) 456-7890';

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

  return (
    <View style={styles.container}>
      {/* Bold Header */}
      <View style={styles.header}>
        <Text style={styles.headerName}>{name}</Text>
        <Text style={styles.headerTitle}>Cover Letter</Text>
        
        <View style={styles.contactGrid}>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{phone}</Text>
          </View>
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.mainContent}>
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
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{name} • Cover Letter</Text>
        <Text style={styles.footerText}>Page 1 of 1</Text>
      </View>
    </View>
  );
};

export default BoldHeaderTemplate;