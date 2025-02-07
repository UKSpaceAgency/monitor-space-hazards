'use server';

import Api from '@/libs/Api';

export async function getEphemeris(ephemerisId: string) {
  const { data } = await Api.getEphemerisEphemerisId(ephemerisId, {
    format: 'text',
  });
  return data;
};
