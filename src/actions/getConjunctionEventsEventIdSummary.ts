import type { TypeGetConjunctionEventsEventIdSummaryParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getConjunctionEventsEventIdSummary(
  { eventId, ...query }: TypeGetConjunctionEventsEventIdSummaryParams,
  params: RequestParams = {},
) {
  const { data } = await Api.getConjunctionEventsEventIdSummary({ eventId, ...query }, params);
  return data;
}
