import type { ComponentProps } from 'react';

import type { TypeReentryEventOut, TypeTIPOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME_WITH_UTC } from '@/libs/Dayjs';

import { Table } from '../table';

type ReentryEventSummaryProps = {
  event: TypeReentryEventOut;
  tip: TypeTIPOut;
  showDirectionOfTravel?: boolean;
} & ComponentProps<'table'>;

export const ReentryEventSummary = ({ event, tip, showDirectionOfTravel = false, ...props }: ReentryEventSummaryProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Event_summary' });

  const data = [
    [t('re_entry_time'), `${dayjs(event.decay_epoch).format(FORMAT_FULL_DATE_TIME_WITH_UTC)} +/- ${event.uncertainty_window} minute(s)`],
    ...(showDirectionOfTravel ? [[t('direction_of_travel'), tip.direction === 'ascending' ? 'North' : 'South']] : []),
  ];

  return <Table data={data} {...props} />;
};
