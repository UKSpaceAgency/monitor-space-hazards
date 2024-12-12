import { useTranslations } from 'next-intl';
import { Popup } from 'react-map-gl';

import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

export type MapTooltipInfo = {
  longitude: number;
  latitude: number;
  regions?: string;
  overflight?: string;
};

type ReentryAlertMapTooltipProps = MapTooltipInfo;

const ReentryAlertMapTooltip = ({ latitude, longitude, regions, overflight }: ReentryAlertMapTooltipProps) => {
  const t = useTranslations('OverflightMap.tooltip');
  return (
    <Popup latitude={latitude} longitude={longitude} closeButton={false}>
      {regions && (
        <h4 className="govuk-heading-s mb-1">{regions.split(',').map(region => <span key={region} className="block">{region}</span>)}</h4>
      )}
      <ul className="govuk-list mb-0 text-sm">
        {overflight && (
          <li>
            {t.rich('overflight', { overflight: dayjs(overflight).format(FORMAT_DATE_TIME) })}
          </li>
        )}
        <li>
          {t('longitude', { longitude: longitude.toFixed(5) })}
        </li>
        <li>
          {t('latitude', { latitude: latitude.toFixed(5) })}
        </li>
      </ul>
    </Popup>
  );
};

export { ReentryAlertMapTooltip };
