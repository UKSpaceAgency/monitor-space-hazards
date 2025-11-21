import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getFragmentationEvent(
  shortId: string,
  params: RequestParams = {},
) {
  const { data } = await Api.getFragmentationEventsShortId(shortId, {
    next: { tags: [REVALIDATION_TAGS.GET_FRAGMENTATION_EVENT] },
    ...params,
  });
  return data;
}
