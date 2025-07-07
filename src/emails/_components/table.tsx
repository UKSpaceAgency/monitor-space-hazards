/* eslint-disable react/no-array-index-key */
import { Column, Row, Section } from '@react-email/components';
import clsx from 'clsx';
import type { ComponentProps } from 'react';

type TableProps = {
  data: (string | number | null | undefined)[][];
} & ComponentProps<'table'>;

export const Table = ({ data, ...props }: TableProps) => {
  return (
    <Section {...props}>
      {data.map((row, index) => (
        <Row
          key={index}
          className={clsx({
            'bg-[#f0f0f0]': index % 2 === 0,
          })}
        >
          {row.map((cell, index) => (
            <Column
              key={index}
              className={clsx('p-1.5 text-sm', {
                'w-[30%]': index === 0,
                'font-bold': index === 0,
                'text-center': index !== 0,
              })}
            >
              {cell}
            </Column>
          ))}
        </Row>
      ))}
    </Section>
  );
};
