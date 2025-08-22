import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';

import Radios from '@/ui/radios/radios';

export type MapView = 'globe' | 'equirectangular';

type ReentryAlertMapViewProps = {
  value: MapView;
  onChange: (value: MapView) => void;
};

const ReentryAlertMapView = ({ value, onChange }: ReentryAlertMapViewProps) => {
  const t = useTranslations('OverflightMap');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as MapView);
  };

  return (
    <Radios
      small
      legend={t('map_view')}
      items={[{
        children: 'Globe',
        value: 'globe',
        checked: value === 'globe',
        onChange: handleChange,
      }, {
        children: 'Map',
        value: 'equirectangular',
        checked: value === 'equirectangular',
        onChange: handleChange,
      }]}
    />
  );
};

export { ReentryAlertMapView };
