import { useTranslations } from 'next-intl';
import type { HTMLProps, ReactNode } from 'react';

import { Table, TableBody, TableCaption, TableCell, TableCellHeader, TableRow } from '@/ui/table/Table';

export type InformationsTableRow<T extends object> = {
  header: ReactNode | string;
  accessorKey: keyof T;
  renderCell?: (row: T) => ReactNode;
  cellProps?: HTMLProps<HTMLTableCellElement>;
};

type InformationsTableProps<T extends object> = {
  rows: InformationsTableRow<T>[];
  data: T | T[];
  caption?: string;
  narrowerHeaderCell?: true;
  reducedFont?: true;
};

const InformationsTable = <T extends object>({ rows, data, caption, narrowerHeaderCell, reducedFont }: InformationsTableProps<T>) => {
  const t = useTranslations('Tables.Objects');

  const renderTableCell = (accessorKey: keyof T, data: T, renderCell?: (row: T) => ReactNode, reducedFont?: true) => (
    <TableCell className={`${reducedFont ? 'text-base' : ''}`}>
      {renderCell ? renderCell(data) : data[accessorKey] as ReactNode}
    </TableCell>
  );

  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      {Array.isArray(data) && (
        <TableRow>
          <TableCell className="w-80" />
          <TableCellHeader>{t('primary')}</TableCellHeader>
          <TableCellHeader>{t('secondary')}</TableCellHeader>
        </TableRow>
      )}
      <TableBody>
        {rows.map(({ header, accessorKey, renderCell, cellProps }) => {
          return (
            <TableRow key={accessorKey as string}>
              <TableCellHeader className={`${narrowerHeaderCell ? 'w-2/5' : 'w-6/12'} ${reducedFont ? 'text-base' : ''}`} {...cellProps}>{header}</TableCellHeader>
              {Array.isArray(data) ? data.map(row => renderTableCell(accessorKey, row, renderCell, reducedFont)) : renderTableCell(accessorKey, data, renderCell, reducedFont)}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { InformationsTable };
