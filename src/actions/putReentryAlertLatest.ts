'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeReentryEventAlertIn } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function putReentryAlertLatest(shortId: string, data: TypeReentryEventAlertIn) {
  await Api.putReentryEventsShortIdAlertsLatest(shortId, data);
  revalidateTag(REVALIDATION_TAGS.GET_REENTRY_ALERT_LATEST);
  redirect(`/re-entries/${shortId}/alert/send-alert/success`);
}
