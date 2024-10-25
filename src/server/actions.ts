'use server';

import Api from '@/libs/Api';

export async function getEvents(params?: Record<string, unknown>) {
  const { data } = await Api.getEventListV1ConjunctionEventsGet(params);
  return { data };
};
