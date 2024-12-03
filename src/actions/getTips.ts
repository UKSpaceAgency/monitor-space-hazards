'use server';

import Api from '@/libs/Api';

export async function getTips(noradId: string) {
  const { data } = await Api.getTipsNoradId({ noradId });
  return data;
};
