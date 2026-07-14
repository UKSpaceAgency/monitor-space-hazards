'use server';

import Api from '@/libs/Api';

export async function getFragmentationEventsByNoradId(noradId: string) {
  try {
    const { data } = await Api.getFragmentationEventsByNoradIdNoradId(noradId);
    return data;
  } catch {
    return [];
  }
}
