'use server';

import { notFound } from 'next/navigation';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getReentryEvent(short_id: string) {
  try {
    const { data } = await Api.getReentryEventsShortId(short_id, {
      next: { tags: [REVALIDATION_TAGS.GET_REENTRY_EVENT] },
    });
    return data;
  } catch {
    notFound();
  }
};
