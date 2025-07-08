import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
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
    [t('re_entry_time'), event.decayEpoch],
    [t('object_type'), event.objectType],
    [t('norad_id'), event.noradId],
    [t('estimated_mass'), event.estimatedMass],
    [t('height'), event.objectHeight],
    [t('width'), event.objectWidth],
    [t('licensing_country'), getFullCountry(event.licenseCountry)],
    [t('expected_survivability'), `${event.survivability ? `${event.survivability}. ` : ''}${event.survivabilityComment}`],
    [t('report_number'), report.reportNumber],
  ];
  return <Table data={data} {...props} />;
};
