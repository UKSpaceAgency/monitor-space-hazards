import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';

import Radios from '@/ui/radios/radios';

export type MapType = 'light-v11' | 'satellite-streets-v12' | 'streets-v12';

type ReentryAlertMapTypeProps = {
  value: MapType;
  onChange: (value: MapType) => void;
};

const ReentryAlertMapType = ({ value, onChange }: ReentryAlertMapTypeProps) => {
  const t = useTranslations('OverflightMap');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as MapType);
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
        value: 'streets-v12',
      }, {
        id: 'map',
        children: 'Map',
        value: 'light-v11',
      }, {
        id: 'satellite',
        children: 'Satellite',
        value: 'satellite-streets-v12',
      }]}
      onChange={handleChange}
    />
  );
};

export { ReentryAlertMapType };
