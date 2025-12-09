'use server';

import Api from '@/libs/Api';

export async function getFragmentationReportsLatest(shortId: string) {
  const { data } = await Api.getFragmentationReportsFragmentationEventShortIdLatest(shortId);
  return data;
}
