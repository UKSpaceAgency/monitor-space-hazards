/* eslint-disable react/no-array-index-key */
import { Column, Row, Section } from '@react-email/components';
import clsx from 'clsx';
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
          <Column key={index} className={clsx('p-2 text-sm text-center font-bold')} width={`${100 / length}%`}>
            {header}
          </Column>
        ))}
      </Row>
      {data.map((row, index) => (
        <Row
          key={index}
          className={clsx({
            'bg-[#f0f0f0]': index % 2 === 0,
          })}
        >
          {row.map((cell, index) => {
            return (
              <Column
                key={index}
                className={clsx('p-2 text-sm text-center')}
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
