import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export default async function getConjunctionUniqueEvent(shortId: string) {
  const { data } = await Api.getConjunctionEventsUniqueEventShortId(shortId, {
    next: {
      tags: [REVALIDATION_TAGS.GET_CONJUNCTION_UNIQUE_EVENT],
    },
  });
  return data;
}
