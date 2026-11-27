/* eslint-disable react/no-array-index-key */
import { Column, Row, Section } from '@react-email/components';
import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

import { riskColours } from '../_utils/utils';

type TableProps = {
  data: ReactNode[][];
  striped?: boolean;
} & ComponentProps<'table'>;

export const Table = ({ data, striped, ...props }: TableProps) => {
  const cellsLength = data[0]?.length ?? 2;
  return (
    <Section className="!w-full" {...props}>
      {data.map((row, index) => (
        <Row
          key={index}
          className={clsx('!w-full', {
            'bg-[#f2f2f2]': striped && index % 2 === 0,
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
                className={clsx('px-2 py-1 text-sm w-1/3', {
                  'w-2/3': !isFirstColumn && cellsLength === 2,
                  'font-bold': isFirstColumn,
                  'align-top': !isFirstColumn,
                  'text-center': isRisk,
                  'text-left': !isRisk,
                })}
                style={{ ...riskStyle }}
              >
                {cell ?? 'Unknown'}
              </Column>
            );
          })}
        </Row>
      ))}
    </Section>
  );
};
