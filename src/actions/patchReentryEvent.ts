'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import Api from '@/libs/Api';
import { mapReentryEditFormToPatch, type ReentryAlertEditFormValues } from '@/utils/reentryEditForm';

import { REVALIDATION_TAGS } from './tags';

export async function patchReentryEvent(short_id: string, data: ReentryAlertEditFormValues | Record<string, string>) {
  await Api.patchReentryEventsShortId(short_id, mapReentryEditFormToPatch(data));
  revalidateTag(REVALIDATION_TAGS.GET_REENTRY_EVENT);
  redirect(`/re-entries/${short_id}/alert`);
}
