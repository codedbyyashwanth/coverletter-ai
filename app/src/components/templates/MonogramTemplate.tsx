import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
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
    border: 3,
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
  quote: {
    marginVertical: 15,
    paddingLeft: 20,
    borderLeft: 3,
    borderLeftColor: '#312E81',
    backgroundColor: '#F8FAFC',
    padding: 12,
  },
  quoteText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#312E81',
    fontWeight: 'bold',
    lineHeight: 1.5,
  },
  strengthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: 15,
  },
  strengthBox: {
    width: '47%',
    border: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#F9FAFB',
  },
  strengthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  strengthSquare: {
    width: 12,
    height: 12,
    backgroundColor: '#4338CA',
    marginRight: 6,
  },
  strengthTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  strengthDescription: {
    fontSize: 9,
    color: '#6B7280',
    lineHeight: 1.4,
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
    color: '#4338CA',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
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

const MonogramTemplate = ({ resumeData = {} }) => {
  const name = resumeData?.name || 'Yashwanth M Y';
  const email = resumeData?.email || 'yashmy01@gmail.com';
  const phone = resumeData?.phone || '+91 9945998492';
  
  // Create monogram from name
  const getMonogram = (fullName) => {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Left Sidebar with Monogram */}
          <View style={styles.sidebar}>
            {/* Monogram Circle */}
            <View style={styles.monogramCircle}>
              <Text style={styles.monogramText}>{getMonogram(name)}</Text>
            </View>
            
            {/* Vertical Text */}
            <Text style={styles.verticalText}>FRONTEND DEVELOPER</Text>
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
            
            <View style={styles.quote}>
              <Text style={styles.quoteText}>
                "My passion for crafting user-friendly interfaces aligns perfectly with the job description, and my understanding of responsive design, CSS frameworks, and frontend performance optimization will allow me to contribute effectively to your team."
              </Text>
            </View>
            
            <Text style={styles.bodyText}>
              Throughout my career, I have consistently demonstrated the following strengths:
            </Text>
            
            <View style={styles.strengthsGrid}>
              <View style={styles.strengthBox}>
                <View style={styles.strengthHeader}>
                  <View style={styles.strengthSquare}></View>
                  <Text style={styles.strengthTitle}>Technical Skills</Text>
                </View>
                <Text style={styles.strengthDescription}>
                  APIs, state management, and component-driven development
                </Text>
              </View>
              <View style={styles.strengthBox}>
                <View style={styles.strengthHeader}>
                  <View style={styles.strengthSquare}></View>
                  <Text style={styles.strengthTitle}>Learning Mindset</Text>
                </View>
                <Text style={styles.strengthDescription}>
                  Curiosity and eagerness to learn in startup environments
                </Text>
              </View>
              <View style={styles.strengthBox}>
                <View style={styles.strengthHeader}>
                  <View style={styles.strengthSquare}></View>
                  <Text style={styles.strengthTitle}>Industry Awareness</Text>
                </View>
                <Text style={styles.strengthDescription}>
                  Dedication to staying abreast of industry trends
                </Text>
              </View>
              <View style={styles.strengthBox}>
                <View style={styles.strengthHeader}>
                  <View style={styles.strengthSquare}></View>
                  <Text style={styles.strengthTitle}>AI Interest</Text>
                </View>
                <Text style={styles.strengthDescription}>
                  Excited to work on real-world AI-driven products
                </Text>
              </View>
            </View>
            
            <Text style={styles.bodyText}>
              I am particularly drawn to the opportunity to work on a real-world AI-driven product and grow alongside experienced frontend engineers. The hands-on experience and potential for a full-time role after graduation are compelling reasons for me to pursue this internship.
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
  );
};

export default MonogramTemplate;
