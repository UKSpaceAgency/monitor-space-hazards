/* eslint-disable react/no-array-index-key */
import { Table, TD, TR } from '@ag-media/react-pdf-table';
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { ReactElement, ReactNode } from 'react';

export const pdfStyles = StyleSheet.create({
  page: {
    fontSize: '12px',
    backgroundColor: '#ffffff',
    fontFamily: 'Arimo',
    padding: '20px 0',
  },
  headerContainer: {
    margin: '0 20px',
    padding: '0 0 10px',
    borderBottom: '1px solid #006EBB',
  },
  logoContainer: {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nspocLogo: {
    width: '113px',
    height: '50px',
  },
  uksaLogo: {
    width: '113px',
    height: '31px',
  },
  headerTitle: {
    color: '#000000',
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
    paddingBottom: '10px',
    marginBottom: '10px',
    borderBottom: '1px solid #006EBB',
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
    fontSize: '10px',
    border: '0px',
  },
  tableCellHeader: {
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#006EBB',
  },
  footer: {
    margin: '20px',
    gap: '7px',
  },
  uksaLogoContainer: {
    marginTop: '5px',
  },
});

const generatePdfTable = (table: HTMLElement) => {
  const headers = table.querySelector('.govuk-table__head tr')?.children ?? [];
  const caption = table.querySelector('.govuk-table__caption')?.innerHTML;
  const captionObject = <Text style={pdfStyles.subHeader}>{caption}</Text>;

  const rows = [...(table.querySelector('tbody')?.children || [])].filter(
    elm => !elm.closest('[data-table-subcomponent]'),
  );

  const colsNumber = rows[0]?.children?.length || 1;
  const colWeight = 1 / colsNumber;

  return (
    <View>
      {captionObject}
      <Table style={pdfStyles.table} tdStyle={{ padding: '0.2cm' }} weightings={Array.from({ length: colsNumber }, () => colWeight)}>
        {headers.length > 0 && (
          <TR wrap={false}>
            {[...headers].map((header, index: number) => {
              const colSpan = header.getAttribute('colSpan');
              return (
                <TD key={index} style={pdfStyles.tableCellHeader} weighting={colSpan ? Math.round((Number.parseInt(colSpan) / colsNumber) * 10) / 10 : colWeight}>
                  {header.textContent}
                </TD>
              );
            })}
          </TR>
        )}
        {rows.map((row: { children: any }, rowIndex: number) => (
          <TR key={rowIndex} style={{ flexWrap: 'wrap', backgroundColor: rowIndex % 2 === 0 ? '#f0f0f0' : 'transparent' }} wrap={false}>
            {[...row.children].map((cell: HTMLElement, cellIndex: number) => {
              const tagClassList = (cell.firstChild as HTMLElement)?.classList;
              const cellStyle = {
                color: '#000000',
                backgroundColor: 'transparent',
              };
              if (tagClassList?.contains('govuk-tag')) {
                if (tagClassList.contains('govuk-tag--turquoise')) {
                  cellStyle.color = '#104040';
                  cellStyle.backgroundColor = '#d4ecea';
                };
                if (tagClassList.contains('govuk-tag--green')) {
                  cellStyle.color = '#005a30';
                  cellStyle.backgroundColor = '#cce2d8';
                };
                if (tagClassList.contains('govuk-tag--yellow')) {
                  cellStyle.color = '#594d00';
                  cellStyle.backgroundColor = '#fff6bf';
                };
                if (tagClassList.contains('govuk-tag--red')) {
                  cellStyle.color = '#8a0000';
                  cellStyle.backgroundColor = '#fde6e6';
                };
              }
              if (cell.dataset.pdf === 'no') {
                return null;
              }
              const innerHTML = cell.innerHTML;
              const textContent = innerHTML
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]*>/g, '');
              return (
                <TD key={cellIndex} style={cell.tagName === 'TH' ? pdfStyles.tableCellHeader : { ...cellStyle }}>
                  {textContent}
                </TD>
              );
            })}
          </TR>
        ))}
      </Table>
    </View>
  );
};

const generatePdfList = (list: HTMLElement) => {
  const listItems = [...list.children].map(item => (
    <View key={item.textContent} style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{ marginRight: 5 }}>•</Text>
      <Text>{item.textContent}</Text>
    </View>
  ));

  return (
    <View style={{ marginLeft: 10, marginBottom: 10 }}>
      {listItems}
    </View>
  );
};

const generatePdfContent = (node: Element) => {
  const content: ReactElement[] = [];

  const elements = [...node.querySelectorAll('*')].filter(
    elm => !elm.closest('[data-pdf-ignore]'),
  );

  Array.from(elements).forEach(async (el) => {
    switch (el.nodeName) {
      case 'TABLE':
        content.push(generatePdfTable(el as HTMLElement));
        break;
      case 'H3':
      case 'H4':
        content.push(<Text style={pdfStyles.subHeader}>{el.textContent}</Text>);
        break;
      case 'P':
        content.push(<Text style={pdfStyles.paragraph}>{el.textContent}</Text>);
        break;
      case 'UL': {
        content.push(generatePdfList(el as HTMLElement));
        break;
      }
      case 'DIV':
        if ((el as HTMLElement).dataset.type === 'chart') {
          const chart = (node as HTMLElement).querySelector('canvas') as HTMLCanvasElement;
          if (chart) {
            content.push(<Image src={chart.toDataURL('image/png', 1.0)} />);
          }
        }

        if ((el as HTMLElement).dataset.type === 'map') {
          const chart = (node as HTMLElement).querySelector('.mapboxgl-canvas') as HTMLCanvasElement;
          if (chart) {
            content.push(<Image src={chart.toDataURL('image/png', 1.0)} />);
          }
        }
        break;
    }
  });
  return content;
};

export const generatePdfSections = () => {
  const exportables = document.querySelectorAll('[data-pdf]');

  const sections: {
    title: string;
    content: ReactNode | ReactNode[];
  }[] = [];

  exportables.forEach((exportable) => {
    if (exportable instanceof HTMLElement && exportable.dataset.pdf) {
      sections.push({
        title: exportable.dataset.pdf,
        content: generatePdfContent(exportable),
      });
    }
  });

  return sections;
};
