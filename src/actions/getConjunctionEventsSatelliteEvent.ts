import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getConjunctionEventsSatelliteEventShortId(
  eventShortId: string,
  params: RequestParams = {},
) {
  const { data } = await Api.getConjunctionEventsSatelliteEventShortId(eventShortId, params);
  return data;
}
