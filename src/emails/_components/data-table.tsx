/* eslint-disable react/no-array-index-key */
import { Column, Row, Section } from '@react-email/components';
import type { ComponentProps, ReactNode } from 'react';

type DataTableProps = {
  headers: string[];
  data: ReactNode[][];
} & ComponentProps<'table'>;

export const DataTable = ({ headers, data, ...props }: DataTableProps) => {
  const length = headers.length;

  return (
    <Section {...props}>
      <Row>
        {headers.map((header, index) => (
          <Column key={index} className="px-2 py-1 text-sm text-left font-bold" width={`${100 / length}%`}>
            {header}
          </Column>
        ))}
      </Row>
      {data.map((row, index) => (
        <Row key={index}>
          {row.map((cell, index) => {
            return (
              <Column
                key={index}
                className="px-2 py-1 text-sm text-left"
                width={`${100 / length}%`}
              >
                {cell ?? '-'}
              </Column>
            );
          })}
        </Row>
      ))}
    </Section>
  );
};
