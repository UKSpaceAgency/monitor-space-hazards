import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { objectTypeIndex } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME_WITH_UTC } from '@/libs/Dayjs';
import messages from '@/locales/en.json';

import { Table } from '../table';

type ReentryEventSummaryProps = {
  event: TypeReentryEventOut;
} & ComponentProps<'table'>;

export const ReentryEventSummary = ({ event, ...props }: ReentryEventSummaryProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Reentry_alert.Event_summary',
    messages,
  });

  const data = [
    [t('object_name'), event.objectName],
    [t('object_type'), `${event.objectType ? objectTypeIndex[event.objectType as keyof typeof objectTypeIndex] : 'Unknown'}`],
    [t('estimated_mass'), `${event.estimatedMass ?? 'Unknown'} kg`],
    [t('re_entry_time'), `${dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME_WITH_UTC)} +/- ${event.uncertaintyWindow} minute(s)`],
    [t('uk_overflight_time'), event.overflightTime.length > 0 ? event.overflightTime.map(time => dayjs(time).format(FORMAT_FULL_DATE_TIME_WITH_UTC)).join(', ') : t('no_overflights')],
  ];

  return <Table data={data} {...props} />;
};
