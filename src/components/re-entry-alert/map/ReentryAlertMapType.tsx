import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';

import Label from '@/ui/label/label';
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
    <div>
      <Label className="font-bold">{t('map_type')}</Label>
      <Radios
        small
        value={value}
        items={[{
          children: 'Street',
          value: 'streets-v12',
        }, {
          children: 'Map',
          value: 'light-v11',
        }, {
          children: 'Satellite',
          value: 'satellite-streets-v12',
        }]}
        onChange={handleChange}
      />
    </div>
  );
};

export { ReentryAlertMapType };
