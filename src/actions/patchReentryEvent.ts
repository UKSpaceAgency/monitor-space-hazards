'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeReentryEventPatch } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function patchReentryEvent(short_id: string, data: TypeReentryEventPatch) {
  await Api.patchReentryEventsShortId(short_id, data);
  revalidateTag(REVALIDATION_TAGS.GET_REENTRY_EVENT);
  redirect(`/re-entries/${short_id}/alert`);
}
