import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import type { RichTranslationValues } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventOut, TypeReentryEventReportOut, TypeRisk } from '@/__generated__/data-contracts';
import { FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import InsetText from '@/ui/inset-text/inset-text';
import { roundedPercentage } from '@/utils/Math';
import { getReentryFragmentsProbability, getReentryFragmentsRisk } from '@/utils/ReentryRisk';
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

  const fragmentsProbability = getReentryFragmentsProbability(event.fragments_probability, report.impact);
  const fragmentsRisk = getReentryFragmentsRisk(event.fragments_probability, event.object_name);
  const haveRiskProbabilities = isNumber(event.atmospheric_probability) || isNumber(fragmentsProbability) || isNumber(event.human_casualty_probability);
  const contentVariables: RichTranslationValues = {
    commonName: event?.object_name ?? 'an unknown object',
    objectType: event?.object_type,
    date: dayjs(event.decay_epoch).format(FORMAT_FULL_DATE_TIME),
    atmosphericRisk: event?.atmospheric_risk ?? 'Very Low',
    atmospheric_probability: roundedPercentage(event?.atmospheric_probability ?? 0),
    fragmentsRisk: event?.fragments_risk ? event.fragments_risk === 'None' ? 'No' : event.fragments_risk : 'No',
    fragmentsProbability: roundedPercentage(event?.fragments_probability ?? 0),
    // human_casualty_risk: event?.human_casualty_risk ?? 'Low',
    // humanCasualtyProbability: roundedPercentage(event?.human_casualty_probability ?? 0),
    riskLevel: fragmentsRisk === 'Pending' ? 'Very Low' : fragmentsRisk,
    riskProbability: roundedPercentage(fragmentsProbability ?? 0),
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
