import { nearestCity } from 'cityjs';
import { Cancel01Icon } from 'hugeicons-react';
import { useTranslations } from 'next-intl';

import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import { calcDistance } from '@/utils/Math';
import { countries } from '@/utils/Regions';

export type MapTooltipInfo = {
  longitude: number;
  latitude: number;
  regions?: string;
  overflight?: string;
  onClose: () => void;
};

type ReentryAlertMapTooltipProps = MapTooltipInfo;

const ReentryAlertMapTooltip = ({ latitude, longitude, regions, overflight, onClose }: ReentryAlertMapTooltipProps) => {
  const t = useTranslations('OverflightMap.tooltip');

  const { name, countryCode, ...city } = nearestCity({ latitude, longitude });

  const distance = calcDistance(latitude, longitude, city.latitude, city.longitude);

  return (
    <div className="bg-white p-4 rounded-md absolute top-2 left-2 max-w-[300px]">
      <button type="button" className="absolute top-2 right-2" onClick={onClose}>
        <Cancel01Icon className="size-4" />
      </button>
      <div className="pr-4">
        <ul className="govuk-list mb-0 text-sm">
          {distance < 50 && (
            <li>
              <span className="font-bold mr-1">{`${name}, ${countries[countryCode as keyof typeof countries]}`}</span>
            </li>
          )}
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
      </div>
    </div>
  );
};

export { ReentryAlertMapTooltip };
