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
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import type { MessageKeys } from 'next-intl';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Fragment, useMemo } from 'react';

import type { TranslatedColumnDef } from '@/types';

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
};

const DataTable = <T extends RowData>({ data, columns, stickyHeader, sorting, onSortingChange, renderSubComponent }: DataTableProps<T>) => {
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
    onSortingChange,
    manualSorting: true,
    getRowCanExpand: () => (!!renderSubComponent),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const renderHeaderCell = (header: Header<T, unknown>, stickyHeader?: true) => {
    return header.isPlaceholder
      ? (
          <td
            key={header.id}
            colSpan={header.colSpan}
            className={clsx('govuk-table__header', {
              'border-0': stickyHeader,
            })}
            style={{ width: 350 }}
          />
        )
      : (
          <th
            key={header.id}
            colSpan={header.colSpan}
            style={{ minWidth: header.column.columnDef.minSize, width: `${header.getSize()}px` }}
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
                          <span className="flex flex-col text-xxs">
                            <span>▲</span>
                            <span>▼</span>
                          </span>
                        ),
                        asc: <span className="text-xs">▲</span>,
                        desc: <span className="text-xs">▼</span>,
                      }[header.column.getIsSorted() as string || 'clear']}
                    </span>
                  </button>
                )
              : (
                  <div className="py-1">{flexRender(header.column.columnDef.header, header.getContext())}</div>
                )}
          </th>
        );
  };

  return (
    <table className="govuk-table text-base">
      <thead className={clsx('govuk-table__head', {
        'sticky top-0 bg-white': stickyHeader,
      })}
      >
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className="govuk-table__row">
            {headerGroup.headers.map(header => renderHeaderCell(header, stickyHeader))}
          </tr>
        ))}
      </thead>
      <tbody className="govuk-table__body">
        {table.getRowModel().rows.map(row => (
          <Fragment key={row.id}>
            <tr key={row.id} className="govuk-table__row">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="govuk-table__cell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {row.getIsExpanded() && renderSubComponent && (
              <tr className="govuk-table__row">
                {/* 2nd row is a custom 1 cell row */}
                <td className="govuk-table__cell" colSpan={row.getVisibleCells().length}>
                  {renderSubComponent({ row })}
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export { DataTable };
