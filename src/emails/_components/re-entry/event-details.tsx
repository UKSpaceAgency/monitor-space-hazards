import dayjs from 'dayjs';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { objectTypeIndex } from '@/emails/_utils/utils';
import { FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
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
    [t('re_entry_time'), `${dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME)} +/- ${event.uncertaintyWindow} minute(s)`],
    [t('object_type'), `${event.objectName} ${objectTypeIndex[event.objectType as keyof typeof objectTypeIndex] ?? ''}`],
    [t('norad_id'), event.noradId],
    [t('estimated_mass'), event.estimatedMass ?? '-'],
    [t('height'), event.objectHeight ?? '-'],
    [t('width'), event.objectWidth ?? '-'],
    [t('licensing_country'), getFullCountry(event.licenseCountry) ?? '-'],
    [t('expected_survivability'), `${event.survivability ? `${event.survivability}. ` : ''}${event.survivabilityComment}`],
    [t('report_number'), report.reportNumber],
  ];
  return <Table data={data} {...props} />;
};
