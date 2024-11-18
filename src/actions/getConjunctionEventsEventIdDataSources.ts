import type { TypeGetConjunctionEventsEventIdDataSourcesParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getConjunctionEventsEventIdDataSources(
  { eventId, ...query }: TypeGetConjunctionEventsEventIdDataSourcesParams,
  params: RequestParams = {},
) {
  const { data } = await Api.getConjunctionEventsEventIdDataSources({ eventId, ...query }, params);
  return data;
}
