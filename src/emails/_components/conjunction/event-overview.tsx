import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import messages from '@/locales/en.json';
import { getFullCountry } from '@/utils/Regions';

import { Table } from '../table';

type ConjunctionEventOverviewProps = {
  eventUrl: string;
  report: TypeConjunctionReportOut;
  event: TypeUniqueEventOut;
} & ComponentProps<'table'>;

export const ConjunctionEventOverview = ({ eventUrl, report, event, ...props }: ConjunctionEventOverviewProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_alert.Event_summary',
    messages,
  });

  const objectData = [
    [t('object_name'), report.primaryObjectCommonName, report.secondaryObjectCommonName],
    [t('norad_id'), report.primaryObjectNoradId, report.secondaryObjectNoradId],
    [t('licensing_country'), getFullCountry(report.primaryObjectLicensingCountry), getFullCountry(report.secondaryObjectLicensingCountry)],
  ];

  return (
    <Section {...props}>
      <Table data={objectData} />
    </Section>
  );
};
