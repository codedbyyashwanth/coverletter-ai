import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
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

const BoldHeaderRealContentPDF = ({ resumeData = {} }) => {
  const name = resumeData?.name || 'Yashwanth M Y';
  const email = resumeData?.email || 'yashmy01@gmail.com';
  const phone = resumeData?.phone || '+91 9945998492';

  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Bold Header */}
          <View style={styles.header}>
            <Text style={styles.headerName}>{name}</Text>
            <Text style={styles.headerTitle}>Frontend Developer</Text>
            
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
              I am excited to apply for the Frontend Developer Internship position at XING as advertised. With a solid foundation in Computer Science and proficiency in various programming languages and frameworks, I am confident in my ability to meet the requirements of this role. My passion for crafting user-friendly interfaces aligns perfectly with the job description, and my understanding of responsive design, CSS frameworks, and frontend performance optimization will allow me to contribute effectively to your team. Additionally, my curiosity and eagerness to learn make me well-suited for a startup environment where taking initiative and experimentation are valued.
            </Text>
            
            <Text style={styles.bodyText}>
              I believe that my knowledge of APIs, state management, and component-driven development, along with my dedication to staying abreast of industry trends, will enable me to make valuable contributions to XING. I am particularly drawn to the opportunity to work on a real-world AI-driven product and grow alongside experienced frontend engineers. The hands-on experience and potential for a full-time role after graduation are compelling reasons for me to pursue this internship. I am excited about the possibility of joining a company that values a friendly culture and offers flexibility in working hours to accommodate my university schedule.
            </Text>
            
            <Text style={styles.bodyText}>
              I would welcome the opportunity to discuss how my skills and experiences can contribute to your team's success. Thank you for considering my application, and I look forward to your response.
            </Text>
            
            {/* Closing */}
            <View style={styles.closing}>
              <Text style={styles.closingText}>Best regards,</Text>
              <Text style={styles.signature}>{name}</Text>
            </View>
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

export default BoldHeaderRealContentPDF;
