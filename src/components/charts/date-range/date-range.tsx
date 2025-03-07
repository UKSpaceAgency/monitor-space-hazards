import { useTranslations } from 'next-intl';

import type { DataRangeType } from '@/hooks/useDataRange';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

const DateRange = ({ dataRange, handleDataRangeChange }: { dataRange: DataRangeType; handleDataRangeChange: (dataRange: DataRangeType) => void }) => {
  const t = useTranslations('Charts.Actions');

  return (
    <ToggleButtons
      name="notifications-send-days"
      items={[
        {
          title: t('7_days'),
          ariaLabel: '7 days',
          value: '7d',
        },
        {
          title: t('30_days'),
          ariaLabel: '30 days',
          value: '30d',
        },
        {
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
