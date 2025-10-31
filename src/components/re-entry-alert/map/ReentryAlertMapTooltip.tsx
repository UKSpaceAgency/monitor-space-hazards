import { nearestCity } from 'cityjs';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { IoCloseOutline, IoEllipseSharp } from 'react-icons/io5';

import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import { calcDistance } from '@/utils/Math';
import { countries, jsonRegionsMap } from '@/utils/Regions';

import { FlightpathColor, FragmentColor, OverflightColor } from './utils';

export type MapTooltipInfo = {
  longitude: number;
  latitude: number;
  regions?: string;
  overflight?: string;
  pass?: number | null;
  type?: 'overflight' | 'fragments' | 'flightpath';
  onClose: () => void;
};

type ReentryAlertMapTooltipProps = MapTooltipInfo;

const ReentryAlertMapTooltip = ({ latitude, longitude, regions, overflight, type, onClose }: ReentryAlertMapTooltipProps) => {
  const t = useTranslations('OverflightMap.tooltip');

  const { name, countryCode, ...city } = nearestCity({ latitude, longitude });

  const distance = calcDistance(latitude, longitude, city.latitude, city.longitude);

  const color = useMemo(() => {
    switch (type) {
      case 'flightpath':
        return FlightpathColor;
      case 'fragments':
        return FragmentColor;
      default:
        return OverflightColor;
    }
  }, [type]);

  return (
    <div className="bg-white p-4 absolute top-2 left-2 max-w-[200px] md:max-w-[300px]">
      <button type="button" className="absolute top-2 right-2" onClick={onClose}>
        <IoCloseOutline className="size-4" />
      </button>
      <div className="pr-4">
        <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
          {t(type as any)}
          {type}
          <IoEllipseSharp
            className="size-6"
            style={{
              color,
            }}
          />
        </h4>
        <ul className="govuk-list mb-0 text-sm">
          {distance < 50 && (
            <li>
              <span className="font-bold mr-1">{`${name}, ${countries[countryCode as keyof typeof countries]}`}</span>
            </li>
          )}
          {Array.isArray(regions) && regions.length > 0 && (
            <li>
              <span className="font-bold mr-1">{t('regions')}</span>
              {regions.map((el) => {
                ;
                const [_, last] = el.split('.');
                return jsonRegionsMap[last];
              }).join(', ')}
            </li>
          )}
          {overflight && (
            <li>
              <span className="font-bold mr-1">{t('date')}</span>
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
