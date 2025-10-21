import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getFragmentationEvent(
  shortId: string,
  params: RequestParams = {},
) {
  const { data } = await Api.getFragmentationEventsShortId(shortId, params);
  return data;
}
