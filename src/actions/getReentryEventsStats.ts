'use server';

import Api from '@/libs/Api';

export async function getReentryEventsStats() {
  const { data } = await Api.getReentryEventsStats();
  return data;
};
