import type { TypeGetConjunctionEventsEventIdDataSourcesParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getConjunctionEventsEventIdDataSources(
  query: TypeGetConjunctionEventsEventIdDataSourcesParams,
) {
  const { data } = await Api.getConjunctionEventsEventIdDataSources(query);
  return data;
}
