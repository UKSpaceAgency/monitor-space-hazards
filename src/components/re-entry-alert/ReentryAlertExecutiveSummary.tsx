import { isNumber } from 'lodash';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { getReentryFragmentsProbability } from '@/utils/ReentryRisk';

import { Markdown } from '../Markdown';
import { ReentryAlertExecutiveSummaryTable } from './tables/ReentryAlertExecutiveSummaryTable';
import { ReentryAlertRiskProbabilitiesTable } from './tables/ReentryAlertRiskProbabilitiesTable';

type ReentryAlertExecutiveSummaryProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
  executiveSummaryComment?: string | null;
  /** Preview-only: Level 1 override shown with an explicit label. */
  executiveSummaryCommentLevel1?: string | null;
  /** Preview-only: Level 2 override shown with an explicit label. */
  executiveSummaryCommentLevel2?: string | null;
  isClosed?: boolean;
};

const ReentryAlertExecutiveSummary = async ({
  event,
  report,
  executiveSummaryComment,
  executiveSummaryCommentLevel1,
  executiveSummaryCommentLevel2,
}: ReentryAlertExecutiveSummaryProps) => {
  const t = await getTranslations('Reentry_alert.Executive_summary');

  const fragmentsProbability = getReentryFragmentsProbability(event.fragments_probability, report.impact);
  const haveRiskProbabilities = isNumber(event.atmospheric_probability) || isNumber(fragmentsProbability) || isNumber(event.human_casualty_probability);

  return (
    <div data-pdf={t('title')}>
      <h2 data-anchor="event-summary" className="govuk-heading-l">{t('title')}</h2>
      {executiveSummaryComment && (
        <Markdown>
          {executiveSummaryComment}
        </Markdown>
      )}
      {executiveSummaryCommentLevel1 && (
        <div className="mt-4">
          <h3 className="govuk-heading-s">{t('level_1_label')}</h3>
          <Markdown>
            {executiveSummaryCommentLevel1}
          </Markdown>
        </div>
      )}
      {executiveSummaryCommentLevel2 && (
        <div className="mt-4">
          <h3 className="govuk-heading-s">{t('level_2_label')}</h3>
          <Markdown>
            {executiveSummaryCommentLevel2}
          </Markdown>
        </div>
      )}
      {haveRiskProbabilities && (
        <>
          <h3 className="govuk-heading-s">{t('locations_at_risk')}</h3>
          <ReentryAlertRiskProbabilitiesTable event={event} report={report} />
        </>
      )}
      <h3 className="govuk-heading-s">{t('event_summary')}</h3>
      <ReentryAlertExecutiveSummaryTable event={event} report={report} />
    </div>
  );
};

export { ReentryAlertExecutiveSummary };
