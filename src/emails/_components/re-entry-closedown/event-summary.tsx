import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import messages from '@/locales/en.json';

import { Table } from '../table';

type EventSummaryProps = {
  event: TypeReentryEventOut;
} & ComponentProps<'table'>;

export const EventSummary = ({ event, ...props }: EventSummaryProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Tables.Reentry_alert_executive_summary',
    messages,
  });

  const data = [
    [t('object'), event.objectName],
    [t('estimated_mass'), event.estimatedMass],
    [t('time_window_world'), `${dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME)} +/- ${event.uncertaintyWindow} minute(s)`],
    [t('overflight_time'), event.overflightTime[0] ? dayjs(event.overflightTime[0]).format(FORMAT_FULL_DATE_TIME) : '-'],
  ];

  return <Table data={data} {...props} />;
};
