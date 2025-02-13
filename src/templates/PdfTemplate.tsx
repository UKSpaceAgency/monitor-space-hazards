/* eslint-disable react/no-array-index-key */
import { Document, Font, Image, Link, Page, Text, View } from '@react-pdf/renderer';
import { kebabCase } from 'lodash';
import type { ReactNode } from 'react';

import { pdfStyles } from '@/libs/Pdf';

Font.register({ family: 'Arimo', fonts: [
  { src: 'https://fonts.gstatic.com/s/arimo/v9/Gpeo80g-5ji2CcyXWnzh7g.ttf' },
  { src: 'https://fonts.gstatic.com/s/arimo/v9/ZItXugREyvV9LnbY_gxAmw.ttf', fontWeight: 700 },
] });

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
      <Page size="A4" style={pdfStyles.page}>
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
