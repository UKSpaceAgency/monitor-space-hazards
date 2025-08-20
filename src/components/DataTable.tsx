'use client';

import type {
  Header,
  OnChangeFn,
  Row,
  RowData,
  SortingState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import type { MessageKeys } from 'next-intl';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Fragment, useMemo } from 'react';

import type { TranslatedColumnDef } from '@/types';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';

export type DataTableProps<T extends RowData> = {
  data: T[];
  columns: TranslatedColumnDef<T>[];
  // Sorting
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  // Subcomponents
  renderSubComponent?: (props: { row: Row<T> }) => ReactNode;
  // Extra
  stickyHeader?: true;
  largerText?: true;
  emptyLabel?: string;
  manualSorting?: boolean;
};

const DataTable = <T extends RowData>({ data, columns, stickyHeader, largerText, sorting, emptyLabel = 'No data', manualSorting = true, onSortingChange, renderSubComponent }: DataTableProps<T>) => {
  const t = useTranslations('Tables');

  const translatedColumns = useMemo(() => {
    const translateColumn = (column: TranslatedColumnDef<T>) => {
      const clonedColumn = { ...column };

      if ('columns' in clonedColumn) {
        if (clonedColumn.columns) {
          clonedColumn.columns = clonedColumn.columns.map(translateColumn);
        }
      }
      if (column.header) {
        const header = column.header as MessageKeys<IntlMessages, 'Tables'>;
        clonedColumn.header = t.has(header) ? t(header) : header;
      }
      return clonedColumn;
    };
    return columns.map(translateColumn);
  }, [columns, t]);

  const table = useReactTable({
    data,
    columns: translatedColumns,
    state: {
      sorting,
    },
    manualSorting,
    onSortingChange,
    getRowCanExpand: () => (!!renderSubComponent),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const renderHeaderCell = (header: Header<T, unknown>, stickyHeader?: true) => {
    return header.isPlaceholder
      ? (
          <TableCell
            key={header.id}
            scope="col"
            colSpan={header.colSpan}
            className={clsx('govuk-table__header', {
              'border-0': stickyHeader,
            })}
            style={{ width: 350 }}
          />
        )
      : (
          <TableCellHeader
            key={header.id}
            scope="col"
            colSpan={header.colSpan}
            style={{ minWidth: header.column.columnDef.minSize, width: `${header.getSize()}px`, maxWidth: header.column.columnDef.maxSize }}
            className={clsx('govuk-table__header', {
              'border-0': stickyHeader,
            })}
            aria-sort={
              header.column.getCanSort()
                ? header.column.getNextSortingOrder() === 'asc'
                  ? 'ascending'
                  : header.column.getNextSortingOrder() === 'desc'
                    ? 'descending'
                    : 'none'
                : 'none'
            }
          >
            {header.column.getCanSort()
              ? (
                  <button type="button" className="relative w-full pt-1 pr-3 font-bold text-blue text-left border-b-4 border-transparent focus:bg-yellow focus:text-black focus:border-black" onClick={header.column.getToggleSortingHandler()}>
                    <span className="flex-1">{flexRender(header.column.columnDef.header, header.getContext())}</span>
                    <span className="absolute top-0 right-0 h-full flex items-center">
                      {{
                        clear: (
                          <span className="flex flex-col text-xxs" aria-hidden>
                            <span>▲</span>
                            <span>▼</span>
                          </span>
                        ),
                        asc: <span className="text-xs" aria-hidden>▲</span>,
                        desc: <span className="text-xs" aria-hidden>▼</span>,
                      }[header.column.getIsSorted() as string || 'clear']}
                    </span>
                  </button>
                )
              : (
                  <div className="py-1">{flexRender(header.column.columnDef.header, header.getContext())}</div>
                )}
          </TableCellHeader>
        );
  };

  if (!data.length) {
    return (
      <p className="govuk-body" role="status">
        <span className="govuk-visually-hidden">Alert: </span>
        {emptyLabel}
      </p>
    );
  }

  return (
    <Table className={`${largerText ? 'govuk-table' : 'govuk-!-font-size-16'}`} data-type="data">
      <TableHead className={clsx({
        'sticky top-0 bg-white': stickyHeader,
      })}
      >
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => renderHeaderCell(header, stickyHeader))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <Fragment key={row.id}>
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
            {row.getIsExpanded() && renderSubComponent && (
              <TableRow data-table-subcomponent>
                {/* 2nd row is a custom 1 cell row */}
                <TableCell colSpan={row.getVisibleCells().length}>
                  {renderSubComponent({ row })}
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export { DataTable };
