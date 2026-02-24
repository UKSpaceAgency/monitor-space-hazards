'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeFragmentationEventPatch } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function patchFragmentationEvent(short_id: string, data: TypeFragmentationEventPatch) {
  await Api.patchFragmentationEventsShortId(short_id, data);
  revalidateTag(REVALIDATION_TAGS.GET_FRAGMENTATION_EVENT);
  redirect(`/fragmentations/${short_id}`);
}
