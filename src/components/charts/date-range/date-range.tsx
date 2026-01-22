import { useTranslations } from 'next-intl';
import { useId } from 'react';

import type { DataRangeType } from '@/hooks/useDataRange';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

const DateRange = ({ dataRange, handleDataRangeChange, ariaLabel, name }: { dataRange: DataRangeType; ariaLabel?: string; handleDataRangeChange: (dataRange: DataRangeType) => void; name?: string }) => {
  const t = useTranslations('Charts.Actions');
  const id = useId();

  return (
    <ToggleButtons
      name={name ?? id}
      ariaLabel={ariaLabel}
      items={[
        {
          id: '7d',
          title: t('last_7_days'),
          ariaLabel: t('last_7_days'),
          value: 7,
        },
        {
          id: '30d',
          title: t('last_30_days'),
          ariaLabel: t('last_30_days'),
          value: 30,
        },
        {
          id: 'all_time',
          title: t('all_time'),
          ariaLabel: t('all_time'),
          value: 0,
        },
      ]}
      active={dataRange}
      setActive={handleDataRangeChange}
      title={t('data_range')}
    />
  );
};

export { DateRange };
