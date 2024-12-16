import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';

import { Markdown } from '../Markdown';
import { ReentryAlertExecutiveSummaryTable } from './tables/ReentryAlertExecutiveSummaryTable';

type ReentryAlertExecutiveSummaryProps = {
  event: TypeReentryEventOut;
  previewSummary?: string | null;
};

const ReentryAlertExecutiveSummary = async ({ event, previewSummary }: ReentryAlertExecutiveSummaryProps) => {
  const t = await getTranslations('ReentryAlert.ExecutiveSummary');

  return (
    <div>
      <h2 data-anchor="information" data-pdf className="govuk-heading-l">{t('title')}</h2>
      <p className="govuk-body">
        {t('content')}
      </p>
      <Markdown>
        {previewSummary ?? event?.execSummary}
      </Markdown>
      <ReentryAlertExecutiveSummaryTable event={event} />
    </div>
  );
};

export { ReentryAlertExecutiveSummary };
