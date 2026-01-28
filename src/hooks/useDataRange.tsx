import { useState } from 'react';

import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import { assertUnreachable } from '@/utils/Helpers';

export type DataRangeType = 0 | 7 | 30;

const useDataRange = ({ initialStartDate }: { initialStartDate?: string }) => {
  const [startDate, setStartDate] = useState(initialStartDate ?? '');
  const [dataRange, setDataRange] = useState<DataRangeType>(7);

  const handleDataRangeChange = (dataRange: DataRangeType) => {
    setDataRange(dataRange);

    switch (dataRange) {
      case 7:
        setStartDate(TODAY_DATE_TIME.subtract(7, 'day').format(FORMAT_API_DATE_TIME));
        break;
      case 30:
        setStartDate(TODAY_DATE_TIME.subtract(1, 'month').format(FORMAT_API_DATE_TIME));
        break;
      case 0:
        setStartDate(TODAY_DATE_TIME.subtract(9999, 'day').format(FORMAT_API_DATE_TIME));
        break;
      default:
        assertUnreachable(dataRange);
    }
  };

  return { startDate, dataRange, handleDataRangeChange };
};

export { useDataRange };
