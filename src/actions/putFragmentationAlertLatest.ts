'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeFragmentationEventAlertIn } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function putFragmentationAlertLatest(short_id: string, data: TypeFragmentationEventAlertIn) {
  await Api.putFragmentationEventsShortIdAlertsLatest(short_id, data);
  revalidateTag(REVALIDATION_TAGS.GET_CONJUNCTION_ALERT_LATEST);
  redirect(`/fragmentations/${short_id}/send-alert/success`);
}
