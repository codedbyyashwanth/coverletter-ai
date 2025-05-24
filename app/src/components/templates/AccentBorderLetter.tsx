import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  accentBorder: {
    width: 40,
    backgroundColor: '#059669',
  },
  mainContent: {
    flex: 1,
    padding: 30,
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#059669',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 15,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  contactItem: {
    fontSize: 10,
    color: '#6B7280',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '45%',
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
  strengthsList: {
    marginLeft: 20,
    marginBottom: 15,
  },
  strengthItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  strengthNumber: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#059669',
    color: '#FFFFFF',
    fontSize: 9,
    textAlign: 'center',
    marginRight: 8,
    paddingTop: 2,
  },
  strengthContent: {
    flex: 1,
  },
  strengthTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  strengthDescription: {
    fontSize: 10,
    color: '#6B7280',
  },
  closing: {
    marginTop: 20,
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
    color: '#059669',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 70,
    right: 30,
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

const AccentBorderRealContentPDF = ({ resumeData = {} }) => {
  const name = resumeData?.name || 'Yashwanth M Y';
  const email = resumeData?.email || 'yashmy01@gmail.com';
  const phone = resumeData?.phone || '+91 9945998492';

  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Left Accent Border */}
          <View style={styles.accentBorder}></View>
          
          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.title}>Frontend Developer</Text>
              
              <View style={styles.separator}></View>
              
              <View style={styles.contactGrid}>
                <View style={styles.contactItem}>
                  <Text>📧 {email}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Text>📞 {phone}</Text>
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
            
            <Text style={styles.bodyText}>
              My key strengths include:
            </Text>
            
            <View style={styles.strengthsList}>
              <View style={styles.strengthItem}>
                <Text style={styles.strengthNumber}>1</Text>
                <View style={styles.strengthContent}>
                  <Text style={styles.strengthTitle}>Frontend Technologies:</Text>
                  <Text style={styles.strengthDescription}>Responsive design, CSS frameworks, and performance optimization</Text>
                </View>
              </View>
              <View style={styles.strengthItem}>
                <Text style={styles.strengthNumber}>2</Text>
                <View style={styles.strengthContent}>
                  <Text style={styles.strengthTitle}>Development Skills:</Text>
                  <Text style={styles.strengthDescription}>APIs, state management, and component-driven development</Text>
                </View>
              </View>
              <View style={styles.strengthItem}>
                <Text style={styles.strengthNumber}>3</Text>
                <View style={styles.strengthContent}>
                  <Text style={styles.strengthTitle}>Professional Attitude:</Text>
                  <Text style={styles.strengthDescription}>Curiosity, eagerness to learn, and startup mindset</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.bodyText}>
              I believe that my knowledge of APIs, state management, and component-driven development, along with my dedication to staying abreast of industry trends, will enable me to make valuable contributions to XING. I am particularly drawn to the opportunity to work on a real-world AI-driven product and grow alongside experienced frontend engineers.
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
            
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>{name} • Cover Letter</Text>
              <Text style={styles.footerText}>Page 1 of 1</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default AccentBorderRealContentPDF;
