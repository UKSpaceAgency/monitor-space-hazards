import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';

import Radios from '@/ui/radios/radios';

import { MapTypes } from './utils';

type ReentryAlertMapTypeProps = {
  value: MapTypes;
  onChange: (value: MapTypes) => void;
};

const ReentryAlertMapType = ({ value, onChange }: ReentryAlertMapTypeProps) => {
  const t = useTranslations('OverflightMap');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as MapTypes);
  };

  return (
    <Radios
      small
      id="map_type"
      aria-label="Map Type"
      legend={t('map_type')}
      value={value}
      items={[{
        id: 'street',
        children: 'Street',
        value: MapTypes.streets,
      }, {
        id: 'map',
        children: 'Map',
        value: MapTypes.light,
      }, {
        id: 'satellite',
        children: 'Satellite',
        value: MapTypes.satellite,
      }]}
      onChange={handleChange}
    />
  );
};

export { ReentryAlertMapType };
