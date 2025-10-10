import type { TypeFragmentationEvent } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

const mockFragmentationEvent: TypeFragmentationEvent = {
  id: 'mock-fragmentation-event',
  short_id: 'FRAG-MOCK-001',
  event_epoch: new Date().toISOString(),
  risk: 'Medium',
  known_fragments: 8,
  affected_regime: 'LEO',
  primary_object_common_name: 'MOCK SATELLITE',
  primary_object_norad_id: '12345',
  primary_object_type: 'Satellite',
  primary_object_licensing_country: 'USA',
  secondary_object_common_name: 'MOCK DEBRIS',
  secondary_object_norad_id: '54321',
  secondary_object_type: 'Debris',
  secondary_object_licensing_country: 'RUS',
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  conjunction_commentary: 'Mock fragmentation event for testing purposes',
  object_history: 'Mock object history data',
  report_number: 1,
  closed_comment: null,
};

export async function getFragmentationEvent(
  shortId: string,
  params: RequestParams = {},
) {
  try {
    const { data } = await Api.getFragmentationEventsShortId(shortId, params);
    if (!data) {
      return mockFragmentationEvent;
    }
    return data;
  } catch {
    return mockFragmentationEvent;
  }
}
