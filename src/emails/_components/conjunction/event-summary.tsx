import { Section } from '@react-email/components';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeConjunctionReportOut, TypeReentryRisk, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { renderRiskTag } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME_WITH_UTC } from '@/libs/Dayjs';
import messages from '@/locales/en.json';
import { roundedFixed, roundedPercent } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';

import { Link } from '../link';
import { Markdown } from '../markdown';
import { Separator } from '../separator';
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

  const objectData = [
    [t('object_name'), report.primaryObjectCommonName, report.secondaryObjectCommonName],
    [t('object_type'), report.primaryObjectType, report.secondaryObjectType],
    [t('norad_id'), report.primaryObjectNoradId, report.secondaryObjectNoradId],
    [t('licensing_country'), getFullCountry(report.primaryObjectLicensingCountry), getFullCountry(report.secondaryObjectLicensingCountry)],
  ];

  return (
    <Section {...props}>
      <Table data={data} className="mb-2" />
      <Separator />
      <Table data={objectData} className="mt-2 mb-4" />
      {t.rich('content', {
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
