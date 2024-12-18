import { nearestCity } from 'cityjs';
import { useTranslations } from 'next-intl';
import { Popup } from 'react-map-gl';

import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import { countries } from '@/utils/Regions';

export type MapTooltipInfo = {
  longitude: number;
  latitude: number;
  regions?: string;
  overflight?: string;
};

type ReentryAlertMapTooltipProps = MapTooltipInfo;

const ReentryAlertMapTooltip = ({ latitude, longitude, regions, overflight }: ReentryAlertMapTooltipProps) => {
  const t = useTranslations('OverflightMap.tooltip');

  const { name, countryCode } = nearestCity({ latitude, longitude });

  return (
    <Popup latitude={latitude} longitude={longitude} closeButton={false}>
      <h3 className="govuk-heading-s mb-1">
        {`${name}, ${countries[countryCode as keyof typeof countries]}`}
      </h3>
      <ul className="govuk-list mb-0 text-sm">
        {regions && (
          <li>
            <span className="font-bold mr-1">{t('regions')}</span>
            {regions}
          </li>
        )}
        {overflight && (
          <li>
            <span className="font-bold mr-1">{t('overflight')}</span>
            {dayjs(overflight).format(FORMAT_DATE_TIME)}
          </li>
        )}
        <li>
          <span className="font-bold mr-1">{t('longitude')}</span>
          {longitude.toFixed(5)}
        </li>
        <li>
          <span className="font-bold mr-1">{t('latitude')}</span>
          {latitude.toFixed(5)}
        </li>
      </ul>
    </Popup>
  );
};

export { ReentryAlertMapTooltip };
