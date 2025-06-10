import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventOut, TypeReentryRisk } from '@/__generated__/data-contracts';
import { FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import InsetText from '@/ui/inset-text/inset-text';
import { getFullCountry } from '@/utils/Regions';
import { renderRiskTag } from '@/utils/Risk';

import { Markdown } from '../Markdown';
import { ReentryAlertExecutiveSummaryTable } from './tables/ReentryAlertExecutiveSummaryTable';
import { ReentryAlertRiskProbabilitiesTable } from './tables/ReentryAlertRiskProbabilitiesTable';

type ReentryAlertExecutiveSummaryProps = {
  event: TypeReentryEventOut;
  previewSummary?: string | null;
  isClosed?: boolean;
};

const ReentryAlertExecutiveSummary = async ({ event, previewSummary, isClosed }: ReentryAlertExecutiveSummaryProps) => {
  const t = await getTranslations('Reentry_alert.Executive_summary');

  const haveRiskProbabilities = isNumber(event.monteCarloProbability) || isNumber(event.fragmentsProbability) || isNumber(event.humanCasualtyProbability);

  return (
    <div data-pdf={t('title')}>
      <h2 data-anchor="information" className="govuk-heading-l">{t('title')}</h2>
      {isClosed
        ? (
            <InsetText>
              {t.rich('closed_report', {
                commonName: event.objectName ?? 'Unknown',
                date: dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME),
                riskLevel: event?.monteCarloRisk,
                riskProbability: event?.monteCarloProbability,
                licensingCountry: getFullCountry(event.licenseCountry),
                tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
              })}
            </InsetText>
          )
        : (
            <p className="govuk-body">
              {t('content')}
            </p>
          )}
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
