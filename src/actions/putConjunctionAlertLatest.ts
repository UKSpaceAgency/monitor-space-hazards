'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeConjunctionEventAlertIn } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function putConjunctionAlertLatest(short_id: string, data: TypeConjunctionEventAlertIn) {
  await Api.putConjunctionEventsShortIdAlertsLatest(short_id, data);
  revalidateTag(REVALIDATION_TAGS.GET_CONJUNCTION_ALERT_LATEST);
  redirect(`/conjunctions/${short_id}/alert/send-alert/success`);
}
