import { getTranslations } from 'next-intl/server';

import { regionLocations } from '@/utils/RegionLocations';

import { ReentryAlertMap } from './ReentryAlertMap';

type ReentryAlertMapContainerProps = {
  reentryId: string;
  reportId: string;
  overflightTime: string[];
  locationWithHighestRisk?: string;
};

const ReentryAlertMapContainer = async ({ reentryId, reportId, overflightTime, locationWithHighestRisk }: ReentryAlertMapContainerProps) => {
  const t = await getTranslations('Reentry_alert.Map');

  const regionWithHighestRisk = regionLocations[locationWithHighestRisk as keyof typeof regionLocations];

  const center = regionWithHighestRisk
    ? {
        latitude: regionWithHighestRisk.latitude,
        longitude: regionWithHighestRisk.longitude,
        zoom: 5,
      }
    : {
        latitude: 54.0,
        longitude: -2.0,
        zoom: 4,
      };

  return (
    <div>
      <ReentryAlertMap
        reentryId={reentryId}
        reportId={reportId}
        overflightTime={overflightTime}
        center={center}
        detailsTitle={t('details.title')}
        detailsContent={t.rich('details.content')}
      />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ReentryAlertMapContainer };
