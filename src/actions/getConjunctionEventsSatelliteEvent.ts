import { notFound } from 'next/navigation';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getConjunctionEventsSatelliteEventShortId(
  eventShortId: string,
  params: RequestParams = {},
) {
  try {
    const { data } = await Api.getConjunctionEventsSatelliteEventShortId(eventShortId, params);
    return data;
  } catch {
    notFound();
  }
}
