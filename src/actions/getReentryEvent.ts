'use server';

import { notFound } from 'next/navigation';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getReentryEvent(shortId: string) {
  try {
    const { data } = await Api.getReentryEventsShortId(shortId, {
      next: { tags: [REVALIDATION_TAGS.GET_REENTRY_EVENT] },
    });
    return data;
  } catch {
    notFound();
  }
};
