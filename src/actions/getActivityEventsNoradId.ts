'use server';

import Api from '@/libs/Api';

export async function getActivityEventsByNoradId(noradId: string) {
  const { data } = await Api.getActivityEventsByNoradIdNoradId(noradId);
  return data;
}
