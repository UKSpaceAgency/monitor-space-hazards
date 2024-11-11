import type { TypeAnalysisOut, TypeGetAnalysesParams } from '@/__generated__/data-contracts';
import { getAnalyses } from '@/actions/getAnalyses';
import InfiniteTable from '@/components/InfiniteTable';

import { columns } from './columns';

const AnalysisDataTable = async () => {
  const params: TypeGetAnalysesParams = {
    sort_by: 'cdm_external_id',
    limit: 50,
  };

  const { data } = await getAnalyses(params);

  return (
    <InfiniteTable<TypeAnalysisOut, TypeGetAnalysesParams>
      initialData={data}
      params={params}
      columns={columns}
      fetcher={getAnalyses}
    />
  );
};

export { AnalysisDataTable };
