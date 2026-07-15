'use server';

import Api from '@/libs/Api';

export async function getActivityEventsByNoradId(noradId: string) {
  try {
    const { data } = await Api.getActivityEventsByNoradIdNoradId(noradId);
    return data;
  } catch {
    return [];
  }
}
