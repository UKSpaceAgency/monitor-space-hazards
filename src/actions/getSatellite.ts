'use server';

import Api from '@/libs/Api';

export async function getSatellite(norad_id: string) {
  try {
    const { data } = await Api.getSatellitesNoradId(norad_id);
    return data;
  } catch {
    return {
      common_name: 'Unknown object',
      norad_id: null,
    };
  }
};
