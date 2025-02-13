import { useState } from 'react';

import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import { assertUnreachable } from '@/utils/Helpers';

export type DataRangeType = '7d' | '30d' | 'All';

const useDataRange = ({ initialStartDate }: { initialStartDate?: string }) => {
  const [startDate, setStartDate] = useState(initialStartDate ?? '');
  const [dataRange, setDataRange] = useState<DataRangeType>('7d');

  const handleDataRangeChange = (dataRange: DataRangeType) => {
    setDataRange(dataRange);

    switch (dataRange) {
      case '7d':
        setStartDate(TODAY_DATE_TIME.subtract(7, 'day').format(FORMAT_API_DATE_TIME));
        break;
      case '30d':
        setStartDate(TODAY_DATE_TIME.subtract(1, 'month').format(FORMAT_API_DATE_TIME));
        break;
      case 'All':
        setStartDate(TODAY_DATE_TIME.subtract(9999, 'day').format(FORMAT_API_DATE_TIME));
        break;
      default:
        assertUnreachable(dataRange);
    }
  };

  return { startDate, dataRange, handleDataRangeChange };
};

export { useDataRange };
