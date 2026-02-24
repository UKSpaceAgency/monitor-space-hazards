import dayjs from 'dayjs';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { objectTypeIndex } from '@/emails/_utils/utils';
import { FORMAT_FULL_DATE_TIME_WITH_UTC } from '@/libs/Dayjs';
import messages from '@/locales/en.json';
import { getFullCountry } from '@/utils/Regions';

import { Table } from '../table';

type ReentryEventDetailsProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
} & ComponentProps<'table'>;

export const ReentryEventDetails = ({ event, report, ...props }: ReentryEventDetailsProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Reentry_alert.Event_details',
    messages,
  });

  const data = [
    [t('re_entry_time'), `${dayjs(event.decay_epoch).format(FORMAT_FULL_DATE_TIME_WITH_UTC)} +/- ${event.uncertainty_window} minute(s)`],
    [t('object_name'), event.object_name],
    [t('object_type'), `${event.object_type ? objectTypeIndex[event.object_type as keyof typeof objectTypeIndex] : 'Unknown'}`],
    [t('norad_id'), event.norad_id],
    [t('estimated_mass'), `${event.estimated_mass ?? 'Unknown'} kg`],
    [t('height'), `${event.object_height ?? 'Unknown'} m`],
    [t('width'), `${event.object_width ?? 'Unknown'} m`],
    [t('licensing_country'), getFullCountry(event.license_country) ?? 'Unknown'],
    [t('expected_survivability'), `${event.survivability ? `${event.survivability}. ` : ''}${event.survivability_comment ?? 'Unknown'}`],
    [t('report_number'), report.report_number],
  ];
  return <Table data={data} {...props} />;
};
