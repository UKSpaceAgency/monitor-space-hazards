import { isNumber } from 'lodash';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { getReentryFragmentsProbability } from '@/utils/ReentryRisk';

import { ReentryAlertExecutiveSummaryTable } from './tables/ReentryAlertExecutiveSummaryTable';
import { ReentryAlertRiskProbabilitiesTable } from './tables/ReentryAlertRiskProbabilitiesTable';

type ReentryAlertExecutiveSummaryProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
  executiveSummaryComment?: string | null;
  isClosed?: boolean;
};

const ReentryAlertExecutiveSummary = async ({ event, report }: ReentryAlertExecutiveSummaryProps) => {
  const t = await getTranslations('Reentry_alert.Executive_summary');

  const fragmentsProbability = getReentryFragmentsProbability(event.fragments_probability, report.impact);
  const haveRiskProbabilities = isNumber(event.atmospheric_probability) || isNumber(fragmentsProbability) || isNumber(event.human_casualty_probability);

  return (
    <div data-pdf={t('title')}>
      <h2 data-anchor="event-summary" className="govuk-heading-l">{t('title')}</h2>
      {/* {isClosed
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
      </Markdown> */}
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
