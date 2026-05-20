'use server';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getReentryEventsByNoradId(noradId: string) {
  try {
    const { data } = await Api.getReentryEventsByNoradIdNoradId(noradId);
    return data ? [data as TypeReentryEventOut] : [];
  } catch {
    return [];
  }
}
