import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut, TypeRisk, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { renderRiskTag } from '@/emails/_utils/utils';
import messages from '@/locales/en.json';
import { roundedPercent } from '@/utils/Math';

import { Link } from '../link';
import { Table } from '../table';
import { Text } from '../text';

type ConjunctionEventDetailsProps = {
  eventUrl: string;
  report: TypeConjunctionReportOut;
  event: TypeUniqueEventOut;
} & ComponentProps<'table'>;

export const ConjunctionEventDetails = ({ eventUrl, report, event, ...props }: ConjunctionEventDetailsProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_alert.Event_details',
    messages,
  });

  const objectData = [
    [t('details'), t.rich('details_content', { link: chunks => <Link href={eventUrl}>{chunks}</Link> })],
    [t('event_summary'), t.rich('event_summary_content', {
      primaryObject: report.primaryObjectCommonName,
      secondaryObject: report.secondaryObjectCommonName,
      risk: report.risk,
      probability: roundedPercent(report.collisionProbability ?? 0),
      eventUrl: chunks => <Link href={eventUrl}>{chunks}</Link>,
      tag: chunks => renderRiskTag(chunks as TypeRisk),
      p: chunks => <Text className="m-0">{chunks}</Text>,
    })],
  ];

  return (
    <Section {...props}>
      <Table data={objectData} className="mb-4" forceAlignLeft />
    </Section>
  );
};
