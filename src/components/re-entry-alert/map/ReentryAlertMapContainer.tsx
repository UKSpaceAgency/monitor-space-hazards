import { getTranslations } from 'next-intl/server';

import type { TypeTIPOut } from '@/__generated__/data-contracts';

import { ReentryAlertMap } from './ReentryAlertMap';

type ReentryAlertMapContainerProps = {
  reentryId: string;
  reportId: string;
  overflightTime: string[];
  isClosed?: boolean;
  tip?: TypeTIPOut;
};

const ReentryAlertMapContainer = async ({ reentryId, reportId, overflightTime, isClosed, tip }: ReentryAlertMapContainerProps) => {
  const t = await getTranslations('Reentry_alert.Map');
  return (
    <div>
      <ReentryAlertMap
        reentryId={reentryId}
        reportId={reportId}
        overflightTime={overflightTime}
        isClosed={isClosed}
        tip={tip}
        detailsTitle={t('details.title')}
        detailsContent={t.rich('details.content')}
      />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ReentryAlertMapContainer };
