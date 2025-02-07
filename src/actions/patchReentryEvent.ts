'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeReentryEventPatch } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function patchReentryEvent(shortId: string, data: TypeReentryEventPatch) {
  await Api.patchReentryEventsShortId(shortId, data);
  revalidateTag(REVALIDATION_TAGS.GET_REENTRY_EVENT);
  redirect(`/re-entries/${shortId}/alert`);
}
