/* eslint-disable react/no-array-index-key */
import { Document, Font, Image, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { kebabCase } from 'lodash';
import type { ReactNode } from 'react';

Font.register({ family: 'Arimo', fonts: [
  { src: 'http://fonts.gstatic.com/s/arimo/v9/Gpeo80g-5ji2CcyXWnzh7g.ttf' },
  { src: 'http://fonts.gstatic.com/s/arimo/v9/ZItXugREyvV9LnbY_gxAmw.ttf', fontWeight: 700 },
] });

// Create styles
// eslint-disable-next-line react-refresh/only-export-components
export const pdfStyles = StyleSheet.create({
  page: {
    fontSize: '12px',
    backgroundColor: '#ffffff',
    fontFamily: 'Arimo',
  },
  headerContainer: {
    backgroundColor: '#265c59',
    padding: '20px',
  },
  logoContainer: {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: '80px',
    height: '40px',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  contentsTitle: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  contentsLink: {
    fontSize: '12px',
    padding: '2px 0',
    color: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textDecoration: 'none',
  },
  section: {
    margin: '20px',
    fontSize: '12px',
  },
  sectionHeader: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  paragraph: {
    marginBottom: '10px',
  },
  table: {
    marginBottom: '20px',
    width: '100%',
    borderColor: '#e2e2e2',
    fontSize: '10px',
  },
  tableCellHeader: {
    backgroundColor: '#f5f8f8',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#000000',
  },
  footer: {
    margin: '20px',
    gap: '7px',
  },
});

type PdfTemplateProps = {
  title: string;
  sections: {
    title: string;
    content: ReactNode | ReactNode[];
  }[];
};

const PdfTemplate = ({ title, sections }: PdfTemplateProps) => {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page} wrap={false}>
        <View style={pdfStyles.headerContainer}>
          <View style={pdfStyles.logoContainer}>
            <Image src="http://localhost:3000/nspoclogo_white.png" style={pdfStyles.logo} />
            <Image src="http://localhost:3000/logo_white.png" style={pdfStyles.logo} />
          </View>
          <Text style={pdfStyles.headerTitle}>{title}</Text>
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.contentsTitle}>Contents</Text>
          {sections.map((section, index) => (
            <Link key={`contents-${index}`} src={`#${kebabCase(section.title)}`} style={pdfStyles.contentsLink}>
              <Text>{section.title}</Text>
              <Text>{index + 1}</Text>
            </Link>
          ))}
        </View>
        <View>
          {sections.map((section, index) => (
            <View key={`section-${index}`} id={kebabCase(section.title)} style={pdfStyles.section}>
              <Text style={pdfStyles.sectionHeader}>{section.title}</Text>
              {Array.isArray(section.content)
                ? section.content.map((content, index) => (
                    <View key={`content-${index}`}>
                      {content}
                    </View>
                  ))
                : section.content}
            </View>
          ))}
        </View>

        <View style={pdfStyles.footer}>
          <Text>
            Produced by
            {' '}
            <Text style={pdfStyles.bold}>National Space Operations Centre</Text>
            .
            {' '}
          </Text>
          <Text>
            Details are available on the Monitor Space Hazards website:
            {' '}
            <Link src="https://www.monitor-space-hazards.service.gov.uk" style={pdfStyles.link}>https://www.monitor-space-hazards.service.gov.uk</Link>
            .
          </Text>
          <Text>All content is available under the Open Government Licence v3.0, except where otherwise stated.</Text>
        </View>
      </Page>
    </Document>
  );
};

export { PdfTemplate };
