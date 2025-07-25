import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut, TypeReentryRisk, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { renderRiskTag } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import messages from '@/locales/en.json';
import { roundedFixed, roundedPercent } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';

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

export const ConjunctionEventSummary = ({ eventUrl, report, event, closedown, ...props }: ConjunctionEventSummaryProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_alert.Event_summary',
    messages,
  });

  const data = [
    [t('risk'), report.risk],
    [t('predicted_time_of_closest_approach'), report.tcaTime ? dayjs(report.tcaTime).format(FORMAT_FULL_DATE_TIME) : '-'],
    [t('probability_of_collision'), roundedFixed(report.collisionProbability ?? 0)],
    [t('manoeuvre_expected'), `${report.manoeuvreExpected ? `${report.manoeuvreExpected}. ` : ''}${event.manoeuvreAddition}`],
    [t('primary_object'), report.primaryObjectCommonName],
    [t('norad_id'), report.primaryObjectNoradId],
    [t('licensing_country'), getFullCountry(report.primaryObjectLicensingCountry)],
    [t('secondary_object'), report.secondaryObjectCommonName],
    [t('norad_id'), report.secondaryObjectNoradId],
    [t('licensing_country'), getFullCountry(report.secondaryObjectLicensingCountry)],
    [t('report_number'), report.reportNumber],
  ];

  return (
    <Section {...props}>
      <Table data={data} className="mb-4" />
      {t.rich(closedown ? 'content_closed' : 'content', {
        primaryObject: report.primaryObjectCommonName,
        secondaryObject: report.secondaryObjectCommonName,
        risk: report.risk,
        probability: roundedPercent(report.collisionProbability ?? 0),
        eventUrl: chunks => <Link href={eventUrl}>{chunks}</Link>,
        tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
        p: chunks => <Text className="m-0">{chunks}</Text>,
      })}
      {event?.execSummaryAddition && (
        <Markdown>
          {event.execSummaryAddition}
        </Markdown>
      )}
    </Section>
  );
};
