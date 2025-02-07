'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function patchConjunctionUniqueEvent(shortId: string, data: TypeUniqueEventUpdateTextFieldsIn) {
  await Api.patchConjunctionEventsUniqueEventShortId(shortId, data);
  revalidateTag(REVALIDATION_TAGS.GET_CONJUNCTION_UNIQUE_EVENT);
  redirect(`/conjunctions/${shortId}/alert`);
}
