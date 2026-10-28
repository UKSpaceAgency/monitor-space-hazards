'use server';

import Api from '@/libs/Api';

export async function getTips(noradId: string) {
  try {
    const { data } = await Api.getTipsNoradId({ noradId });
    return data;
  } catch {
    return [];
  }
};
