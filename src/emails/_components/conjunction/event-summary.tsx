import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut, TypeRisk, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { renderRiskTag } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME_WITH_UTC } from '@/libs/Dayjs';
import messages from '@/locales/en.json';
import { roundedFixed, roundedPercent } from '@/utils/Math';

import { Link } from '../link';
import { Markdown } from '../markdown';
import { Table } from '../table';
import { Text } from '../text';

type ConjunctionEventSummaryProps = {
  eventUrl: string;
  report: TypeConjunctionReportOut;
  event: TypeUniqueEventOut;
  closedown?: boolean;
} & ComponentProps<'table'>;

export const ConjunctionEventSummary = ({ eventUrl, report, event, ...props }: ConjunctionEventSummaryProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_alert.Event_summary',
    messages,
  });

  const data = [
    [t('report_number'), report.reportNumber],
    [t('predicted_time_of_closest_approach'), report.tcaTime ? dayjs(report.tcaTime).format(FORMAT_FULL_DATE_TIME_WITH_UTC) : 'Unknown'],
    [t('probability_of_collision'), `${roundedFixed(report.collisionProbability ?? 0)}%`],
    [t('manoeuvre_expected'), report.manoeuvreExpected],
  ];

  return (
    <Section {...props}>
      <Table data={data} className="pb-6" />
      {t.rich('content', {
        primaryObject: report.primaryObjectCommonName,
        secondaryObject: report.secondaryObjectCommonName,
        risk: report.risk,
        probability: roundedPercent(report.collisionProbability ?? 0),
        eventUrl: chunks => <Link href={eventUrl}>{chunks}</Link>,
        tag: chunks => renderRiskTag(chunks as TypeRisk),
        p: chunks => <Text className="m-0">{chunks}</Text>,
      })}
      {event?.executiveSummaryComment && (
        <Markdown>
          {event.executiveSummaryComment}
        </Markdown>
      )}
    </Section>
  );
};
