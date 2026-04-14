import { type ComponentProps, Fragment } from 'react';

import type { TypeReentryEventOut, TypeTIPOut } from '@/__generated__/data-contracts';
import { createEmailTranslator, objectTypeIndex } from '@/emails/_utils/utils';
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
    [t('object_name'), event.object_name],
    [t('object_type'), `${event.object_type ? objectTypeIndex[event.object_type as keyof typeof objectTypeIndex] : 'Unknown'}`],
    [t('estimated_mass'), `${event.estimated_mass ?? 'Unknown'} kg`],
    [t('re_entry_time'), `${dayjs(event.decay_epoch).format(FORMAT_FULL_DATE_TIME_WITH_UTC)} +/- ${event.uncertainty_window} minute(s)`],
    ...(showDirectionOfTravel ? [[t('direction_of_travel'), tip.direction === 'ascending' ? 'North' : 'South']] : []),
    [
      t('uk_overflight_time'),
      event.overflight_time.length > 0
        ? event.overflight_time
            .map((time, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={idx}>
                {dayjs(time).format(FORMAT_FULL_DATE_TIME_WITH_UTC)}
                {idx !== event.overflight_time.length - 1 && <br />}
              </Fragment>
            ))
        : t('no_overflights'),
    ],
  ];

  return <Table data={data} {...props} />;
};
