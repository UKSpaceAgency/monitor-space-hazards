'use server';

import Api from '@/libs/Api';

export async function getFragmentationReportsLatest(short_id: string) {
  const { data } = await Api.getFragmentationReportsFragmentationEventShortIdLatest(short_id);
  return data;
}
