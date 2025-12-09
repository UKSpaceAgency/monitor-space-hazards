'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeFragmentationEventPatch } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function patchFragmentationEvent(shortId: string, data: TypeFragmentationEventPatch) {
  await Api.patchFragmentationEventsShortId(shortId, data);
  revalidateTag(REVALIDATION_TAGS.GET_FRAGMENTATION_EVENT);
  redirect(`/fragmentations/${shortId}`);
}
