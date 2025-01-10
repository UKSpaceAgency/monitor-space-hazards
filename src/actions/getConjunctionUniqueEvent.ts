import { notFound } from 'next/navigation';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export default async function getConjunctionUniqueEvent(shortId: string) {
  try {
    const { data } = await Api.getConjunctionEventsUniqueEventShortId(shortId, {
      next: {
        tags: [REVALIDATION_TAGS.GET_CONJUNCTION_UNIQUE_EVENT],
      },
    });
    return data;
  } catch {
    notFound();
  }
}
