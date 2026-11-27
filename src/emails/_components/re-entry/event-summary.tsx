import { isNumber } from 'lodash';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut, TypeTIPOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME_WITH_UTC } from '@/libs/Dayjs';

import { Table } from '../table';

type ReentryEventSummaryProps = {
  event: TypeReentryEventOut;
  tip: TypeTIPOut;
  /** Prefer the values from the report being emailed when it carries them. */
  decayEpoch?: string | null;
  uncertaintyWindow?: number | null;
  showDirectionOfTravel?: boolean;
} & ComponentProps<'table'>;

export const ReentryEventSummary = ({
  event,
  tip,
  decayEpoch,
  uncertaintyWindow,
  showDirectionOfTravel = false,
  ...props
}: ReentryEventSummaryProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Event_summary' });

  const time = decayEpoch ?? event.decay_epoch;
  const window = isNumber(uncertaintyWindow) ? uncertaintyWindow : event.uncertainty_window;

  const data = [
    [t('predicted_re_entry_time'), `${dayjs(time).format(FORMAT_FULL_DATE_TIME_WITH_UTC)}`],
    [t('uncertainty_window'), isNumber(window) ? `+/- ${window} minute(s)` : '-'],
    ...(showDirectionOfTravel ? [[t('direction_of_travel'), tip.direction === 'ascending' ? 'North' : 'South']] : []),
  ];

  return <Table data={data} {...props} />;
};
