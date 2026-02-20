import { notFound } from 'next/navigation';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export default async function getConjunctionUniqueEvent(short_id: string) {
  try {
    const { data } = await Api.getConjunctionEventsUniqueEventShortId(short_id, {
      next: {
        tags: [REVALIDATION_TAGS.GET_CONJUNCTION_UNIQUE_EVENT],
      },
    });
    return data;
  } catch {
    notFound();
  }
}
