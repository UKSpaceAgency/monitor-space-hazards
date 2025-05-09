import { isNumber } from 'lodash';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';

import { Markdown } from '../Markdown';
import { ReentryAlertExecutiveSummaryTable } from './tables/ReentryAlertExecutiveSummaryTable';
import { ReentryAlertRiskProbabilitiesTable } from './tables/ReentryAlertRiskProbabilitiesTable';

type ReentryAlertExecutiveSummaryProps = {
  event: TypeReentryEventOut;
  previewSummary?: string | null;
};

const ReentryAlertExecutiveSummary = async ({ event, previewSummary }: ReentryAlertExecutiveSummaryProps) => {
  const t = await getTranslations('Reentry_alert.Executive_summary');

  const haveRiskProbabilities = isNumber(event.monteCarloProbability) || isNumber(event.fragmentsProbability) || isNumber(event.humanCasualtyProbability);

  return (
    <div data-pdf={t('title')}>
      <h2 data-anchor="information" className="govuk-heading-l">{t('title')}</h2>
      <p className="govuk-body">
        {t('content')}
      </p>
      <Markdown>
        {previewSummary ?? event?.execSummary}
      </Markdown>
      {haveRiskProbabilities && (
        <>
          <h3 className="govuk-heading-s">{t('risk_probabilities')}</h3>
          <ReentryAlertRiskProbabilitiesTable event={event} />
        </>
      )}
      <h3 className="govuk-heading-s">{t('event_summary')}</h3>
      <ReentryAlertExecutiveSummaryTable event={event} />
    </div>
  );
};

export { ReentryAlertExecutiveSummary };
