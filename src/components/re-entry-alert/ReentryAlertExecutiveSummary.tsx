import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import type { RichTranslationValues } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventOut, TypeReentryEventReportOut, TypeRisk } from '@/__generated__/data-contracts';
import { FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import InsetText from '@/ui/inset-text/inset-text';
import { roundedPercentage } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';
import { renderRiskTag } from '@/utils/Risk';

import { Markdown } from '../Markdown';
import { ReentryAlertExecutiveSummaryTable } from './tables/ReentryAlertExecutiveSummaryTable';
import { ReentryAlertRiskProbabilitiesTable } from './tables/ReentryAlertRiskProbabilitiesTable';

type ReentryAlertExecutiveSummaryProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
  executiveSummaryComment?: string | null;
  isClosed?: boolean;
};

const ReentryAlertExecutiveSummary = async ({ event, report, executiveSummaryComment, isClosed }: ReentryAlertExecutiveSummaryProps) => {
  const t = await getTranslations('Reentry_alert.Executive_summary');

  const haveRiskProbabilities = isNumber(event.atmosphericProbability) || isNumber(event.fragmentsProbability) || isNumber(event.humanCasualtyProbability);

  const contentVariables: RichTranslationValues = {
    commonName: event?.objectName ?? 'Unknown',
    objectType: event?.objectType,
    date: dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME),
    atmosphericRisk: event?.atmosphericRisk ?? 'Low',
    atmosphericProbability: roundedPercentage(event?.atmosphericProbability ?? 0),
    fragmentsRisk: event?.fragmentsRisk ?? 'Low',
    fragmentsProbability: roundedPercentage(event?.fragmentsProbability ?? 0),
    // humanCasualtyRisk: event?.humanCasualtyRisk ?? 'Low',
    // humanCasualtyProbability: roundedPercentage(event?.humanCasualtyProbability ?? 0),
    riskLevel: event?.fragmentsRisk ?? 'Low',
    riskProbability: roundedPercentage(event?.fragmentsProbability ?? 0),
    licensingCountry: getFullCountry(event.licenseCountry),
    tag: chunks => renderRiskTag(chunks as TypeRisk),
  };

  return (
    <div data-pdf={t('title')}>
      <h2 data-anchor="information" className="govuk-heading-l">{t('title')}</h2>
      {isClosed
        ? (
            <InsetText>
              {t.rich('closed_report', contentVariables)}
            </InsetText>
          )
        : (
            <p className="govuk-body">
              {t.rich('content', contentVariables)}
            </p>
          )}
      <Markdown>
        {executiveSummaryComment}
      </Markdown>
      {haveRiskProbabilities && (
        <>
          <h3 className="govuk-heading-s">{t('risk_probabilities')}</h3>
          <ReentryAlertRiskProbabilitiesTable event={event} />
        </>
      )}
      <h3 className="govuk-heading-s">{t('event_summary')}</h3>
      <ReentryAlertExecutiveSummaryTable event={event} report={report} />
    </div>
  );
};

export { ReentryAlertExecutiveSummary };
