'use server';

import Api from '@/libs/Api';

export async function getSatellite(noradId: string) {
  try {
    const { data } = await Api.getSatellitesNoradId(noradId);
    return data;
  } catch {
    return {
      commonName: 'Unknown object',
      noradId: null,
    };
  }
};
