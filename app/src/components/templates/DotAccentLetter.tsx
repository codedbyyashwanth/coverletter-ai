import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 40,
    position: 'relative',
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
    borderBottom: 2,
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
  recipient: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 15,
    lineHeight: 1.4,
  },
  date: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 15,
  },
  subject: {
    fontSize: 11,
    color: '#1F2937',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  greeting: {
    fontSize: 11,
    color: '#1F2937',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bodyText: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 12,
    textAlign: 'justify',
  },
  timelineContainer: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  timelineLine: {
    width: 12,
    alignItems: 'center',
    paddingRight: 0,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F59E0B',
    marginBottom: 8,
    marginTop: 6,
  },
  timelineVerticalLine: {
    width: 1,
    backgroundColor: '#FDE68A',
    flex: 1,
    marginLeft: 4.5,
  },
  timelineContent: {
    flex: 1,
    marginLeft: 15,
  },
  highlightTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  highlightDescription: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 15,
    lineHeight: 1.5,
  },
  closing: {
    marginTop: 25,
  },
  closingText: {
    fontSize: 11,
    color: '#1F2937',
    marginBottom: 4,
  },
  signature: {
    fontSize: 11,
    color: '#1F2937',
    fontWeight: 'bold',
    marginTop: 15,
  },
  signatureTitle: {
    fontSize: 11,
    color: '#F59E0B',
    marginTop: 2,
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
    borderTop: 1,
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

const DotAccentRealContentPDF = ({ resumeData = {} }) => {
  const name = resumeData?.name || 'Yashwanth M Y';
  const email = resumeData?.email || 'yashmy01@gmail.com';
  const phone = resumeData?.phone || '+91 9945998492';

  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Decorative Dots - Top Right */}
          <View style={styles.decorativeDots}>
            {[...Array(20)].map((_, i) => (
              <View key={i} style={styles.dot}></View>
            ))}
          </View>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.headerLeft}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.title}>Frontend Developer</Text>
              </View>
              <View style={styles.headerRight}>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactItem}>{phone}</Text>
                  <Text style={styles.contactItem}>{email}</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Company Address */}
          <View style={styles.recipient}>
            <Text>XING</Text>
            <Text>Hiring Team</Text>
          </View>
          
          {/* Date */}
          <Text style={styles.date}>May 24, 2025</Text>
          
          {/* Subject */}
          <Text style={styles.subject}>
            Application for Frontend Developer (m/w/d) Internship, takeover possible
          </Text>
          
          {/* Greeting */}
          <Text style={styles.greeting}>Dear Hiring Team,</Text>
          
          {/* Body */}
          <Text style={styles.bodyText}>
            I am excited to apply for the Frontend Developer Internship position at XING as advertised. With a solid foundation in Computer Science and proficiency in various programming languages and frameworks, I am confident in my ability to meet the requirements of this role.
          </Text>
          
          {/* Timeline Section */}
          <View style={styles.timelineContainer}>
            <View style={styles.timelineLine}>
              <View style={styles.timelineDot}></View>
              <View style={styles.timelineVerticalLine}></View>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.highlightTitle}>Technical Expertise</Text>
              <Text style={styles.highlightDescription}>
                My passion for crafting user-friendly interfaces aligns perfectly with the job description, and my understanding of responsive design, CSS frameworks, and frontend performance optimization will allow me to contribute effectively to your team.
              </Text>
              
              <Text style={styles.highlightTitle}>Professional Development</Text>
              <Text style={styles.highlightDescription}>
                My knowledge of APIs, state management, and component-driven development, along with my dedication to staying abreast of industry trends, will enable me to make valuable contributions to XING.
              </Text>
              
              <Text style={styles.highlightTitle}>Career Growth</Text>
              <Text style={styles.highlightDescription}>
                I am particularly drawn to the opportunity to work on a real-world AI-driven product and grow alongside experienced frontend engineers. The hands-on experience and potential for a full-time role after graduation are compelling reasons for me to pursue this internship.
              </Text>
            </View>
          </View>
          
          <Text style={styles.bodyText}>
            I am excited about the possibility of joining a company that values a friendly culture and offers flexibility in working hours to accommodate my university schedule.
          </Text>
          
          <Text style={styles.bodyText}>
            I would welcome the opportunity to discuss how my skills and experiences can contribute to your team's success. Thank you for considering my application, and I look forward to your response.
          </Text>
          
          {/* Closing */}
          <View style={styles.closing}>
            <Text style={styles.closingText}>Best regards,</Text>
            <Text style={styles.signature}>{name}</Text>
            <Text style={styles.signatureTitle}>Frontend Developer</Text>
          </View>
          
          {/* Decorative Dots - Bottom Left */}
          <View style={styles.bottomDecorative}>
            {[...Array(16)].map((_, i) => (
              <View key={i} style={styles.dot}></View>
            ))}
          </View>
          
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>{name} • Cover Letter</Text>
            <Text style={styles.footerText}>Page 1 of 1</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default DotAccentRealContentPDF;
