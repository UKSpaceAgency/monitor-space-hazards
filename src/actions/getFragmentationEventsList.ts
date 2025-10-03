'use server';

import type { TypeFragmentationEvent, TypeGetFragmentationEventsParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

const mockFragmentationEvents: TypeFragmentationEvent[] = [
  {
    id: 'mock-1',
    short_id: 'FRAG-001',
    event_epoch: new Date().toISOString(),
    risk: 'Low',
    known_fragments: 5,
    affected_regime: 'LEO',
    primary_object_common_name: 'MOCK SATELLITE 1',
    primary_object_norad_id: '12345',
    primary_object_type: 'Satellite',
    primary_object_licensing_country: 'USA',
    secondary_object_common_name: 'MOCK DEBRIS 1',
    secondary_object_norad_id: '54321',
    secondary_object_type: 'Debris',
    secondary_object_licensing_country: 'RUS',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    short_id: 'FRAG-002',
    event_epoch: new Date(Date.now() - 86400000).toISOString(),
    risk: 'High',
    known_fragments: 12,
    affected_regime: 'LEO',
    primary_object_common_name: 'MOCK SATELLITE 2',
    primary_object_norad_id: '67890',
    primary_object_type: 'Satellite',
    primary_object_licensing_country: 'CHN',
    secondary_object_common_name: 'MOCK DEBRIS 2',
    secondary_object_norad_id: '98765',
    secondary_object_type: 'Debris',
    secondary_object_licensing_country: 'IND',
    is_active: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function getFragmentationEventsList(
  queryParams?: TypeGetFragmentationEventsParams,
  params: RequestParams = {},
) {
  let query = queryParams;
  if (queryParams?.epoch === 'past' && !queryParams?.sort_by) {
    query = {
      ...query,
      epoch: 'past',
      sort_order: 'desc',
    };
  }
  const { data } = await Api.getFragmentationEvents(query, params);
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return mockFragmentationEvents;
  }
  return data;
};
