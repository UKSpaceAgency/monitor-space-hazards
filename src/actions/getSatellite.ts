'use server';

import Api from '@/libs/Api';

export async function getSatellite(noradId: string) {
  const { data } = await Api.getSatellitesNoradId(noradId);
  return data;
};
