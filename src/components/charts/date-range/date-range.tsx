import { useTranslations } from 'next-intl';

import type { DataRangeType } from '@/hooks/useDataRange';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

const DateRange = ({ dataRange, handleDataRangeChange, ariaLabel }: { dataRange: DataRangeType; ariaLabel?: string; handleDataRangeChange: (dataRange: DataRangeType) => void }) => {
  const t = useTranslations('Charts.Actions');

  return (
    <ToggleButtons
      name="notifications-send-days"
      ariaLabel={ariaLabel}
      items={[
        {
          id: '7d',
          title: t('7_days'),
          ariaLabel: '7 days',
          value: '7d',
        },
        {
          id: '30d',
          title: t('30_days'),
          ariaLabel: '30 days',
          value: '30d',
        },
        {
          id: 'all_time',
          title: t('all_time'),
          ariaLabel: 'All time',
          value: 'All',
        },
      ]}
      active={dataRange}
      setActive={handleDataRangeChange}
      title={t('data_range')}
    />
  );
};

export { DateRange };
