import { getTranslations } from 'next-intl/server';

import { ReentryAlertMap } from './ReentryAlertMap';

type ReentryAlertMapContainerProps = {
  reentryId: string;
  reportId: string;
  overflightTime: string[];
};

const ReentryAlertMapContainer = async ({ reentryId, reportId, overflightTime }: ReentryAlertMapContainerProps) => {
  const t = await getTranslations('Reentry_alert.Map');
  return (
    <div>
      <ReentryAlertMap
        reentryId={reentryId}
        reportId={reportId}
        overflightTime={overflightTime}
        detailsTitle={t('details.title')}
        detailsContent={t.rich('details.content')}
      />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ReentryAlertMapContainer };
