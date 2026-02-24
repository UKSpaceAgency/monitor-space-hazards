'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeReentryEventAlertIn } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function putReentryAlertLatest(short_id: string, data: TypeReentryEventAlertIn) {
  await Api.putReentryEventsShortIdAlertsLatest(short_id, data);
  revalidateTag(REVALIDATION_TAGS.GET_REENTRY_ALERT_LATEST);
  redirect(`/re-entries/${short_id}/alert/send-alert/success`);
}
