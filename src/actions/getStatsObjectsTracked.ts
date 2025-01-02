'use server';

import Api from '@/libs/Api';

export async function getStatsObjectsTracked() {
  const { data } = await Api.getStatsObjectsTracked();
  return data;
};
