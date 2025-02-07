import { getTranslations } from 'next-intl/server';

import { getReentryAlertMapData } from '@/actions/getReentryAlertMapData';

import { ReentryAlertMap } from './ReentryAlertMap';

type ReentryAlertMapContainerProps = {
  presignedUrl: string;
};

const ReentryAlertMapContainer = async ({ presignedUrl }: ReentryAlertMapContainerProps) => {
  const t = await getTranslations('Reentry_alert.Map');
  const { overflightTime, flightpathCollection, fragmentsCollection, overflightCollection } = await getReentryAlertMapData(presignedUrl);
  return (
    <div>
      <ReentryAlertMap overflightTime={overflightTime} flightpathCollection={flightpathCollection} fragmentsCollection={fragmentsCollection} overflightCollection={overflightCollection} />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ReentryAlertMapContainer };
