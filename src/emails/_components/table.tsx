/* eslint-disable react/no-array-index-key */
import { Column, Row, Section } from '@react-email/components';
import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

import { riskColours } from '../_utils/utils';

type TableProps = {
  data: ReactNode[][];
} & ComponentProps<'table'>;

export const Table = ({ data, ...props }: TableProps) => {
  return (
    <Section className="!w-full" {...props}>
      {data.map((row, index) => (
        <Row
          key={index}
          className={clsx('!w-full', {
            'bg-[#f0f0f0]': index % 2 === 0,
          })}
        >
          {row.map((cell, index) => {
            const isFirstColumn = index === 0;
            const isRisk = cell === 'High' || cell === 'Medium' || cell === 'Low';

            const riskStyle = isRisk
              ? {
                  backgroundColor: riskColours[cell as keyof typeof riskColours].background,
                  color: riskColours[cell as keyof typeof riskColours].text,
                }
              : {};

            return (
              <Column
                key={index}
                className={clsx('p-2 text-sm', {
                  'w-1/3': isFirstColumn,
                  'w-2/3': !isFirstColumn,
                  'font-bold': isFirstColumn,
                  'text-center': !isFirstColumn,
                  'text-left': isFirstColumn,
                })}
                style={{ ...riskStyle }}
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
