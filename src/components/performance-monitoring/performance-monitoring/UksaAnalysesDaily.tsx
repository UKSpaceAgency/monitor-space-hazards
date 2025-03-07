'use client';

import { useQuery } from '@tanstack/react-query';

import type { TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { AnalysisAndManoeuvreSupportChart } from '@/components/charts/analysis-and-manoeuvre-support/AnalysisAndManoeuvreSupportChart';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';
import { useDataRange } from '@/hooks/useDataRange';
import { dayjs, FORMAT_API_DATE_TIME } from '@/libs/Dayjs';
import Spinner from '@/ui/spinner/spinner';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { uksaAnalysesDailyColumns } from './data-table/UksaAnalysessDailyDataTableColumns';

const UksaAnalysesDaily = ({ latestIngestDate }: { latestIngestDate: string }) => {
  const params: TypeGetExternalDataPerformanceAggregatedParams = {
    limit: 9999,
    sort_order: 'desc',
    max_age_days: 7,
  };

  const { startDate, dataRange, handleDataRangeChange } = useDataRange({ initialStartDate: dayjs().subtract(params.max_age_days ?? 7, 'day').format(FORMAT_API_DATE_TIME) });

  const fetchParams: TypeGetExternalDataPerformanceAggregatedParams = {
    ...params,
    max_age_days: dayjs().diff(dayjs(startDate), 'day'),
  };

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsAnalysisAndManoeuvreSupport, startDate],
    queryFn: () => getStatsAnalysisAndManoeuvreSupport(fetchParams),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isFetching || !data) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <AnalysisAndManoeuvreSupportChart data={data} dataRange={dataRange} handleDataRangeChange={handleDataRangeChange} latestIngestDate={latestIngestDate} />
      <Scrollable>
        <DataTable
          columns={uksaAnalysesDailyColumns}
          data={data}
        />
      </Scrollable>
    </div>
  );
};

export { UksaAnalysesDaily };
