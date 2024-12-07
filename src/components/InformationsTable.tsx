/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import type { HTMLProps, ReactNode } from 'react';

import { Table, TableBody, TableCaption, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';

export type InformationsTableHeaderWidth = 'xs' | 'sm' | 'md';

export type InformationsTableRow<T extends object> = {
  header: ReactNode | string;
  accessorKey?: keyof T;
  renderCell?: (row: T) => ReactNode;
  cellProps?: HTMLProps<HTMLTableCellElement>;
};

type InformationsTableProps<T extends object> = {
  rows: InformationsTableRow<T>[];
  data: T | T[];
  headers?: HTMLProps<HTMLTableCellElement>[];
  caption?: string;
  headerCellWidth?: InformationsTableHeaderWidth;
  reducedFont?: true;
  className?: string;
};

const InformationsTable = <T extends object>({ rows, data, headers, caption, headerCellWidth = 'md', reducedFont, className }: InformationsTableProps<T>) => {
  const renderTableCell = ({
    data,
    accessorKey,
    renderCell,
    reducedFont,
  }: {
    data: T;
    accessorKey?: keyof T;
    renderCell?: (row: T) => ReactNode;
    reducedFont?: true;
  }) => (
    <TableCell className={`${reducedFont ? 'text-base' : ''}`}>
      {renderCell ? renderCell(data) : accessorKey ? data[accessorKey] as ReactNode : '-'}
    </TableCell>
  );

  return (
    <Table className={className}>
      {caption && <TableCaption>{caption}</TableCaption>}
      {headers && (
        <TableHead>
          <TableRow>
            {headers.map((header, index) => <TableCellHeader key={index} {...header} />)}
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {rows.map(({ header, accessorKey, renderCell, cellProps }) => {
          const { className, ...restCellPRops } = cellProps || {};
          return (
            <TableRow key={accessorKey as string}>
              <TableCellHeader
                className={clsx(`${reducedFont ? 'text-base' : ''}`, {
                  'w-6/12': headerCellWidth === 'md',
                  'w-2/5': headerCellWidth === 'sm',
                  'w-1/3': headerCellWidth === 'xs',
                }, className)}
                {...restCellPRops}
              >
                {header}
              </TableCellHeader>
              {Array.isArray(data) ? data.map(row => renderTableCell({ accessorKey, data: row, renderCell, reducedFont })) : renderTableCell({ accessorKey, data, renderCell, reducedFont })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { InformationsTable };
