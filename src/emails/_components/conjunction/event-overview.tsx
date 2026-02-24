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
    namespace: 'Emails.Conjunction_alert.Objects',
    messages,
  });

  const objectData = [
    [t('object_name'), report.primary_object_common_name, report.secondary_object_common_name],
    [t('norad_id'), report.primary_object_norad_id, report.secondary_object_norad_id],
    [t('licensing_country'), getFullCountry(report.primary_object_licensing_country), getFullCountry(report.secondary_object_licensing_country)],
  ];

  return (
    <Section {...props}>
      <Table data={objectData} />
    </Section>
  );
};
