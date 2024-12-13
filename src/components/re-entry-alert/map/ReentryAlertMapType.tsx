import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';

import Label from '@/ui/label/label';
import Radios from '@/ui/radios/radios';

export type MapType = 'light-v11' | 'satellite-streets-v12';

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
        inline
        small
        items={[{
          children: 'Map',
          value: 'light-v11',
          checked: value === 'light-v11',
          onChange: handleChange,
        }, {
          children: 'Satellite',
          value: 'satellite-streets-v12',
          checked: value === 'satellite-streets-v12',
          onChange: handleChange,
        }]}
        onChange={((e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value as MapType))}
      />
    </div>
  );
};

export { ReentryAlertMapType };