import clsx from 'clsx';
import { round } from 'lodash';
import { useTranslations } from 'next-intl';
import { type HTMLProps, useMemo } from 'react';

import type { TypeOverflightProbability } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import { Table, TableBody, TableCaption, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { jsonRegionsMap } from '@/utils/Regions';

type ReentryAlertImpactTableProps = {
  caption?: string;
  impact: Record<string, TypeOverflightProbability>;
};

const ReentryAlertImpactTable = ({ caption, impact }: ReentryAlertImpactTableProps) => {
  const t = useTranslations('Tables.ReentryAlertImpact');

  const overflightsNumber = useMemo(() => impact ? Object.values(impact).reduce((acc, value) => value.overflight_time && value.overflight_time.length > acc ? value.overflight_time.length : acc, 0) : 0, [impact]);

  const headers: HTMLProps<HTMLTableCellElement>[] = [{
    children: t('probability_of_reentry'),
  }, ...Array.from({ length: overflightsNumber }, (_, i) => ({
    children: t('time_of_overflight', { number: i + 1 }),
  }))];

  return (
    <Table>
      {caption && <TableCaption className="govuk-heading-m mb-0">{caption}</TableCaption>}
      {headers && (
        <TableHead>
          <TableRow>
            <TableCell />
            {headers.map((header, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableCellHeader key={index} {...header} />
            ))}
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {Object.entries(impact).map(([key, value]) => (
          <TableRow key={key}>
            <TableCellHeader
              className={clsx('w-6/12')}
            >
              {jsonRegionsMap[key] ?? key}
            </TableCellHeader>
            <TableCell>
              {value.probability ? `${round(value.probability * 100, 3)}%` : '-'}
            </TableCell>
            {...Array.from({ length: overflightsNumber }, (_, i) => (
              <TableCell key={i}>
                {value.overflight_time && value?.overflight_time[i] ? dayjs(value.overflight_time[i]).format(FORMAT_DATE_TIME) : '-'}
              </TableCell>
            ))}
          </TableRow>
        ),
        )}
      </TableBody>
    </Table>
  );
};

export { ReentryAlertImpactTable };
