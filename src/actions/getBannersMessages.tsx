'use server';

import Api from '@/libs/Api';

export async function getBannersMessages() {
  const { data } = await Api.getBannersMessages();
  return data;
}
