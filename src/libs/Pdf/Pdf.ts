import pdfMake from 'pdfmake/build/pdfmake';

import { Footer } from './footer';
import { Header } from './header';
import { pdfStyles } from './styles';

const createTable = (table: HTMLElement, isDataTable = false) => {
  const tableHead: Array<string | Record<string, unknown>> = [];

  const headers = table.querySelector('.govuk-table__head tr')?.children ?? [];

  for (const header of headers) {
    tableHead.push({ text: header.textContent, bold: true });
  }

  const tableBody: Array<unknown> = [];

  const rows = [...(table.querySelector('tbody')?.children || [])].filter(
    elm => !elm.closest('[data-table-subcomponent]'),
  );

  for (const row of rows) {
    const tableRow = [];
    const cells = row.children;

    for (const cell of cells) {
      if (cell.tagName === 'TH') {
        tableRow.push({
          text: cell.textContent,
          bold: true,
        });
      } else {
        if ((cell as HTMLElement).dataset.pdf !== 'no') {
          tableRow.push(cell.textContent);
        }
      }
    }
    if (tableRow.length > 0) {
      tableBody.push(tableRow);
    }
  }

  if (tableHead?.length > 0) {
    return {
      table: {
        widths: isDataTable
          ? ['*', ...Array(tableHead.length - 1).fill('*')]
          : [...Array(tableHead.length).fill('*')],
        body: [tableHead, ...tableBody],
      },
      style: 'table',
    };
  } else {
    return {
      table: {
        body: tableBody,
      },
      style: 'table',
    };
  }
};

const createContent = (title: string, node: Element) => {
  const content: Array<string | Record<string, unknown>> = [
    { text: title, style: 'h2', tocItem: true },
  ];

  const elements = [...node.querySelectorAll('*')].filter(
    elm => !elm.closest('[data-pdf-ignore]'),
  );

  Array.from(elements).forEach(async (el) => {
    switch (el.nodeName) {
      case 'TABLE':
        content.push(
          createTable(
            el as HTMLElement,
            (el as HTMLElement).dataset.type === 'data',
          ),
        );
        break;
      case 'H3':
        content.push({
          text: el.textContent,
          bold: true,
          style: 'h3',
        });
        break;
      case 'H4':
        content.push({
          text: el.textContent,
          bold: true,
          style: 'h4',
        });
        break;
      case 'P':
        content.push({
          text: el.textContent,
          style: 'paragraph',
        });
        break;
      case 'UL': {
        content.push({
          ul: Array.from(el.childNodes)
            .filter(node => node.nodeName === 'LI' || node.nodeName === 'OL')
            .map((node) => {
              if (node.nodeName === 'OL') {
                return Array.from(node.childNodes)
                  .filter(node => node.nodeName === 'LI')
                  .map(node => node.textContent);
              }
              return node.textContent;
            }),
          style: 'paragraph',
        });
        break;
      }
      case 'CAPTION':
        content.push({
          text: el.textContent,
          bold: true,
          style: 'h4',
        });
        break;
      case 'DIV':
        if ((el as HTMLElement).dataset.type === 'chart') {
          const chart = (node as HTMLElement).querySelector('canvas');
          if (chart) {
            content.push({
              image: chart.toDataURL(),
              fit: [500, 500],
            });
          }
        }

        if ((el as HTMLElement).dataset.type === 'map') {
          const chart = (node as HTMLElement).querySelector('.mapboxgl-canvas');
          if (chart) {
            content.push({
              image: (chart as HTMLCanvasElement).toDataURL(),
              fit: [500, 500],
            });
          }
        }
        break;
    }
  });
  return content;
};

type Stack = {
  stack: (string | Record<string, unknown>)[];
};

export const generatePdf = (
  title: string,
  _pathname: string,
) => {
  const exportables = document.querySelectorAll('[data-pdf]');

  const stacks: Stack[] = [];

  exportables.forEach((exportable) => {
    if (exportable instanceof HTMLElement && exportable.dataset.pdf) {
      stacks.push({
        stack: createContent(exportable.dataset.pdf, exportable),
      });
    }
  });

  const docDefinition = {
    content: [
      Header(),
      {
        toc: {
          title: { text: title, style: 'h1' },
        },
        style: 'stack',
      },
      ...stacks.map(stack => ({
        ...stack,
        style: 'stack',
      })),
      Footer(),
    ],
    ...pdfStyles,
  };

  //   gaEvent({
  //     action: 'download',
  //     format: 'pdf',
  //     page_path: pathname,
  //     table_name: 'reentry-alert',
  //   });

  pdfMake.fonts = {
    Arial: {
      normal: `${origin}/fonts/arial.ttf`,
      bold: `${origin}/fonts/arial-bold.ttf`,
      italics: `${origin}/fonts/arial-italic.ttf`,
    },
  };

  pdfMake.createPdf(docDefinition as any).download(`${title}.pdf`);
};
