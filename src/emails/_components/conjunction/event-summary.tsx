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
    [t('report_number'), report.report_number],
    [t('predicted_time_of_closest_approach'), report.tca_time ? dayjs(report.tca_time).format(FORMAT_FULL_DATE_TIME_WITH_UTC) : 'Unknown'],
    [t('probability_of_collision'), `${roundedFixed(report.collision_probability ?? 0)}%`],
    [t('manoeuvre_expected'), report.manoeuvre_expected],
  ];

  return (
    <Section {...props}>
      <Table data={data} className="pb-6" />
      {t.rich('content', {
        primaryObject: report.primary_object_common_name,
        secondaryObject: report.secondary_object_common_name,
        risk: report.risk,
        probability: roundedPercent(report.collision_probability ?? 0),
        eventUrl: chunks => <Link href={eventUrl}>{chunks}</Link>,
        tag: chunks => renderRiskTag(chunks as TypeRisk),
        p: chunks => <Text className="m-0">{chunks}</Text>,
      })}
      {event?.executive_summary_comment && (
        <Markdown>
          {event.executive_summary_comment}
        </Markdown>
      )}
    </Section>
  );
};
