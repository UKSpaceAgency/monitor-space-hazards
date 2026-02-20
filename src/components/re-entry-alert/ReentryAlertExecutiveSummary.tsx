import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import type { RichTranslationValues } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventOut, TypeReentryEventReportOut, TypeRisk } from '@/__generated__/data-contracts';
import { FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import InsetText from '@/ui/inset-text/inset-text';
import { roundedPercentage } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';
import { renderRiskTag } from '@/utils/Tags';

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

  const haveRiskProbabilities = isNumber(event.atmospheric_probability) || isNumber(event.fragments_probability) || isNumber(event.human_casualty_probability);

  const contentVariables: RichTranslationValues = {
    commonName: event?.object_name ?? 'an unknown object',
    objectType: event?.object_type,
    date: dayjs(event.decay_epoch).format(FORMAT_FULL_DATE_TIME),
    atmosphericRisk: event?.atmospheric_risk ?? 'Low',
    atmospheric_probability: roundedPercentage(event?.atmospheric_probability ?? 0),
    fragmentsRisk: event?.fragments_risk ?? 'Low',
    fragmentsProbability: roundedPercentage(event?.fragments_probability ?? 0),
    // human_casualty_risk: event?.human_casualty_risk ?? 'Low',
    // humanCasualtyProbability: roundedPercentage(event?.human_casualty_probability ?? 0),
    riskLevel: event?.fragments_risk ?? 'Low',
    riskProbability: roundedPercentage(event?.fragments_probability ?? 0),
    licensingCountry: getFullCountry(event.license_country),
    tag: chunks => renderRiskTag(chunks as TypeRisk),
  };

  return (
    <div data-pdf={t('title')}>
      <h2 data-anchor="event-summary" className="govuk-heading-l">{t('title')}</h2>
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
