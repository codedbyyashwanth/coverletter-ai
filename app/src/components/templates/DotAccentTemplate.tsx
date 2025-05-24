import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import type { TemplateProps } from './index';

// Create styles
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
    width: 80,
    height: 80,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    margin: 2,
    opacity: 0.7,
  },
  header: {
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 2,  // Fixed: Changed from 'borderBottom: 2'
    borderBottomColor: '#F59E0B',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: 'bold',
  },
  contactInfo: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
    lineHeight: 1.4,
  },
  contactItem: {
    marginBottom: 2,
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
  bottomDecorative: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 60,
    height: 60,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
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

const DotAccentTemplate: React.FC<TemplateProps> = ({ resumeData = {}, content = '' }) => {
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

  // Create array for decorative dots
  const dotsArray = Array.from({ length: 20 }, (_, i) => i);
  const bottomDotsArray = Array.from({ length: 16 }, (_, i) => i);

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
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.title}>Cover Letter</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactItem}>{phone}</Text>
              <Text style={styles.contactItem}>{email}</Text>
            </View>
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
      
      {/* Decorative Dots - Bottom Left */}
      <View style={styles.bottomDecorative}>
        {bottomDotsArray.map((i) => (
          <View key={i} style={styles.dot}></View>
        ))}
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{name} • Cover Letter</Text>
        <Text style={styles.footerText}>Page 1 of 1</Text>
      </View>
    </View>
  );
};

export default DotAccentTemplate;